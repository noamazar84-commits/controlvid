import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';

// ==========================================
// 1. REPLICATE API (Stable Video Diffusion)
// ==========================================
export async function generateVideoWithReplicate(imageUrl: string, prompt?: string) {
  const apiKey = process.env.REPLICATE_API_KEY;
  if (!apiKey || apiKey.trim() === '') {
    throw new Error('REPLICATE_API_KEY is missing from environment variables. Please configure it in your secrets/environment.');
  }

  try {
    const response = await axios.post(
      'https://api.replicate.com/v1/predictions',
      {
        version: "stability-ai/sdv-xt:3f0457e4619daac51203dedb472816fd4ef51f3149ba9a929ce53f5d4821f43f", // SVD XT version
        input: {
          input_image: imageUrl,
          prompt: prompt || "",
          motion_bucket_id: 127,
          fps: 6
        }
      },
      {
        headers: {
          Authorization: `Token ${apiKey.trim()}`,
          'Content-Type': 'application/json',
        },
        timeout: 60000, // 60 seconds connection timeout
      }
    );
    return response.data;
  } catch (error: any) {
    const detail = error.response?.data?.detail || error.response?.data?.error || error.response?.data || error.message;
    console.error('Replicate API Error:', detail);
    throw new Error(`Replicate API call failed: ${typeof detail === 'object' ? JSON.stringify(detail) : detail}`);
  }
}

// ==========================================
// 2. ELEVENLABS API (Voice Generation)
// ==========================================
export async function generateVoiceWithElevenLabs(text: string, voiceId: string = '21m00Tcm4TlvDq8ikWAM') {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey || apiKey.trim() === '') {
    throw new Error('ELEVENLABS_API_KEY is missing from environment variables. Please configure it in your secrets/environment.');
  }

  try {
    // Exclusively using eleven_turbo_v2_5 as requested
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        text: text,
        model_id: 'eleven_turbo_v2_5',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75
        }
      },
      {
        headers: {
          'xi-api-key': apiKey.trim(),
          'Content-Type': 'application/json',
          'Accept': 'audio/mpeg',
        },
        responseType: 'arraybuffer', // Binary audio file response
        timeout: 45000, // 45 seconds timeout
      }
    );
    return response.data;
  } catch (error: any) {
    let parsedMsg = error.message;
    if (error.response?.data) {
      try {
        // Since responseType is arraybuffer, convert error buffer to JSON string
        const bufferText = Buffer.isBuffer(error.response.data) 
          ? error.response.data.toString('utf-8') 
          : error.response.data;
        const errJson = typeof bufferText === 'string' ? JSON.parse(bufferText) : bufferText;
        parsedMsg = errJson.detail?.message || errJson.detail || errJson.message || bufferText;
      } catch (e) {
        parsedMsg = error.response.data.toString?.('utf-8') || error.message;
      }
    }
    console.error('ElevenLabs API Error:', parsedMsg);
    throw new Error(`ElevenLabs API call failed: ${parsedMsg}`);
  }
}

// ==========================================
// 3. WHISPER ASR (Self-Hosted Docker large-v3 & Cloud API)
// ==========================================

export interface WhisperAsrOptions {
  model?: string;
  task?: 'transcribe' | 'translate';
  language?: string;
  output?: 'json' | 'text' | 'srt' | 'vtt' | 'verbose_json';
  encode?: boolean;
  endpoint?: string;
  preferLocalAsr?: boolean;
}

export interface WhisperAsrResponse {
  text: string;
  language?: string;
  segments?: Array<{
    id?: number;
    start?: number;
    end?: number;
    text: string;
    [key: string]: any;
  }>;
  model?: string;
  source: 'self-hosted-whisper-asr' | 'openai-whisper-api';
  raw?: any;
}

function normalizeWhisperAsrResponse(
  data: any, 
  modelUsed: string, 
  source: 'self-hosted-whisper-asr' | 'openai-whisper-api'
): WhisperAsrResponse {
  if (typeof data === 'string') {
    return {
      text: data.trim(),
      language: 'auto',
      model: modelUsed,
      source
    };
  }
  if (data && typeof data === 'object') {
    const text = data.text || data.transcription || (Array.isArray(data.segments) ? data.segments.map((s: any) => s.text).join(' ') : '');
    return {
      text: String(text || '').trim(),
      language: data.language || 'auto',
      segments: Array.isArray(data.segments) ? data.segments : [],
      model: modelUsed,
      source,
      raw: data
    };
  }
  return {
    text: String(data || '').trim(),
    model: modelUsed,
    source
  };
}

/**
 * Direct request to Self-Hosted Whisper ASR Service (e.g. Docker container running large-v3 at http://localhost:9000/asr)
 */
export async function transcribeAudioWithSelfHostedWhisper(
  filePath: string,
  options: WhisperAsrOptions = {}
): Promise<WhisperAsrResponse> {
  const endpoint = options.endpoint || process.env.WHISPER_ASR_ENDPOINT || 'http://localhost:9000/asr';
  const model = options.model || process.env.WHISPER_ASR_MODEL || 'large-v3';
  const task = options.task || process.env.WHISPER_ASR_TASK || 'transcribe';
  const output = options.output || process.env.WHISPER_ASR_OUTPUT_FORMAT || 'json';
  const encode = options.encode !== undefined ? options.encode : true;

  if (!fs.existsSync(filePath)) {
    throw new Error(`Audio file not found at path: ${filePath}`);
  }

  try {
    const form = new FormData();
    // Multi-key compatibility for Whisper Docker containers (audio_file vs file)
    form.append('audio_file', fs.createReadStream(filePath));
    form.append('file', fs.createReadStream(filePath));
    form.append('model', model);
    form.append('task', task);
    form.append('output', output);
    if (options.language) {
      form.append('language', options.language);
    }

    const queryParams = new URLSearchParams({
      encode: String(encode),
      task,
      output,
    });
    if (options.language) {
      queryParams.append('language', options.language);
    }

    const requestUrl = `${endpoint.replace(/\/$/, '')}?${queryParams.toString()}`;

    const response = await axios.post(requestUrl, form, {
      headers: {
        ...form.getHeaders(),
      },
      timeout: 120000, // 120 seconds timeout for large-v3 model
    });

    return normalizeWhisperAsrResponse(response.data, model, 'self-hosted-whisper-asr');
  } catch (error: any) {
    const detail = error.response?.data?.detail || error.response?.data?.error || error.response?.data || error.message;
    console.error('Self-Hosted Whisper ASR Error:', detail);
    throw new Error(`Self-Hosted Whisper ASR failed (${endpoint}): ${typeof detail === 'object' ? JSON.stringify(detail) : detail}`);
  }
}

/**
 * Direct buffer request to Self-Hosted Whisper ASR Service
 */
export async function transcribeAudioBufferWithSelfHostedWhisper(
  buffer: Buffer,
  filename: string = 'audio.mp3',
  options: WhisperAsrOptions = {}
): Promise<WhisperAsrResponse> {
  const endpoint = options.endpoint || process.env.WHISPER_ASR_ENDPOINT || 'http://localhost:9000/asr';
  const model = options.model || process.env.WHISPER_ASR_MODEL || 'large-v3';
  const task = options.task || process.env.WHISPER_ASR_TASK || 'transcribe';
  const output = options.output || process.env.WHISPER_ASR_OUTPUT_FORMAT || 'json';
  const encode = options.encode !== undefined ? options.encode : true;

  try {
    const form = new FormData();
    form.append('audio_file', buffer, { filename });
    form.append('file', buffer, { filename });
    form.append('model', model);
    form.append('task', task);
    form.append('output', output);
    if (options.language) {
      form.append('language', options.language);
    }

    const queryParams = new URLSearchParams({
      encode: String(encode),
      task,
      output,
    });
    if (options.language) {
      queryParams.append('language', options.language);
    }

    const requestUrl = `${endpoint.replace(/\/$/, '')}?${queryParams.toString()}`;

    const response = await axios.post(requestUrl, form, {
      headers: {
        ...form.getHeaders(),
      },
      timeout: 120000,
    });

    return normalizeWhisperAsrResponse(response.data, model, 'self-hosted-whisper-asr');
  } catch (error: any) {
    const detail = error.response?.data?.detail || error.response?.data?.error || error.response?.data || error.message;
    console.error('Self-Hosted Whisper Buffer ASR Error:', detail);
    throw new Error(`Self-Hosted Whisper Buffer ASR failed (${endpoint}): ${typeof detail === 'object' ? JSON.stringify(detail) : detail}`);
  }
}

/**
 * Main Transcription entry point: Tries Self-Hosted Whisper ASR (large-v3 container) first when available,
 * with seamless fallback to OpenAI Whisper cloud API if configured.
 */
export async function transcribeAudioWithWhisper(
  filePath: string,
  options: WhisperAsrOptions = {}
): Promise<WhisperAsrResponse> {
  const isSelfHostedEnabled = process.env.WHISPER_ASR_ENABLED !== 'false';
  const hasSelfHostedEndpoint = !!(options.endpoint || process.env.WHISPER_ASR_ENDPOINT);

  // 1. Attempt Self-Hosted Whisper ASR if enabled or explicitly requested
  if (isSelfHostedEnabled || hasSelfHostedEndpoint || options.preferLocalAsr) {
    try {
      console.log(`[Whisper ASR] Attempting self-hosted transcription (Endpoint: ${options.endpoint || process.env.WHISPER_ASR_ENDPOINT || 'http://localhost:9000/asr'}, Model: ${options.model || process.env.WHISPER_ASR_MODEL || 'large-v3'})...`);
      return await transcribeAudioWithSelfHostedWhisper(filePath, options);
    } catch (localErr: any) {
      console.warn(`[Whisper ASR] Self-hosted transcription failed or container unreachable: ${localErr.message}`);
      // Fallback to cloud API if OpenAI API key is present
      if (!process.env.OPENAI_API_KEY) {
        throw new Error(`Self-hosted Whisper ASR error: ${localErr.message}. (Cloud fallback unavailable: OPENAI_API_KEY is not set)`);
      }
      console.log('[Whisper ASR] Falling back to OpenAI Whisper Cloud API...');
    }
  }

  // 2. OpenAI Cloud Whisper API Fallback
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey.trim() === '') {
    throw new Error('No transcription engine available. Please ensure self-hosted Whisper ASR Docker container is running (http://localhost:9000/asr) or set OPENAI_API_KEY.');
  }

  if (!fs.existsSync(filePath)) {
    throw new Error(`Audio file not found at path: ${filePath}`);
  }

  try {
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));
    form.append('model', 'whisper-1');
    if (options.language) {
      form.append('language', options.language);
    }

    const response = await axios.post(
      'https://api.openai.com/v1/audio/transcriptions',
      form,
      {
        headers: {
          Authorization: `Bearer ${apiKey.trim()}`,
          ...form.getHeaders(),
        },
        timeout: 60000,
      }
    );
    return normalizeWhisperAsrResponse(response.data, 'whisper-1', 'openai-whisper-api');
  } catch (error: any) {
    const detail = error.response?.data?.error?.message || error.response?.data || error.message;
    console.error('OpenAI Whisper Cloud API Error:', detail);
    throw new Error(`Whisper Transcription failed: ${typeof detail === 'object' ? JSON.stringify(detail) : detail}`);
  }
}

/**
 * Buffer Transcription entry point with Self-Hosted ASR support and Cloud fallback
 */
export async function transcribeAudioBufferWithWhisper(
  buffer: Buffer, 
  filename: string = 'audio.mp3',
  options: WhisperAsrOptions = {}
): Promise<WhisperAsrResponse> {
  const isSelfHostedEnabled = process.env.WHISPER_ASR_ENABLED !== 'false';
  const hasSelfHostedEndpoint = !!(options.endpoint || process.env.WHISPER_ASR_ENDPOINT);

  if (isSelfHostedEnabled || hasSelfHostedEndpoint || options.preferLocalAsr) {
    try {
      return await transcribeAudioBufferWithSelfHostedWhisper(buffer, filename, options);
    } catch (localErr: any) {
      console.warn(`[Whisper ASR] Self-hosted buffer transcription failed: ${localErr.message}`);
      if (!process.env.OPENAI_API_KEY) {
        throw new Error(`Self-hosted Whisper Buffer ASR error: ${localErr.message}. (Cloud fallback unavailable: OPENAI_API_KEY is not set)`);
      }
    }
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey.trim() === '') {
    throw new Error('No transcription engine available. Please ensure self-hosted Whisper ASR Docker container is running or set OPENAI_API_KEY.');
  }

  try {
    const form = new FormData();
    form.append('file', buffer, { filename });
    form.append('model', 'whisper-1');
    if (options.language) {
      form.append('language', options.language);
    }

    const response = await axios.post(
      'https://api.openai.com/v1/audio/transcriptions',
      form,
      {
        headers: {
          Authorization: `Bearer ${apiKey.trim()}`,
          ...form.getHeaders(),
        },
        timeout: 60000,
      }
    );
    return normalizeWhisperAsrResponse(response.data, 'whisper-1', 'openai-whisper-api');
  } catch (error: any) {
    const detail = error.response?.data?.error?.message || error.response?.data || error.message;
    console.error('OpenAI Whisper Buffer Transcription Error:', detail);
    throw new Error(`Whisper Transcription failed: ${typeof detail === 'object' ? JSON.stringify(detail) : detail}`);
  }
}

// ==========================================
// 4. DIAGNOSTIC HEALTH CHECK FUNCTION
// ==========================================
export async function checkExternalApisHealth() {
  const results = {
    replicate: { status: 'UNKNOWN', keyPresent: false, message: '' },
    elevenlabs: { status: 'UNKNOWN', keyPresent: false, message: '' },
    openai: { status: 'UNKNOWN', keyPresent: false, message: '' },
    selfHostedWhisper: { status: 'UNKNOWN', endpoint: '', model: '', enabled: false, message: '' }
  };

  // 1. Replicate Check
  const replicateKey = process.env.REPLICATE_API_KEY?.trim();
  results.replicate.keyPresent = !!replicateKey;
  if (!replicateKey) {
    results.replicate.status = 'MISSING_KEY';
    results.replicate.message = 'REPLICATE_API_KEY environment variable is missing.';
  } else {
    try {
      const res = await axios.get('https://api.replicate.com/v1/account', {
        headers: { Authorization: `Token ${replicateKey}` },
        timeout: 8000
      });
      results.replicate.status = 'ACTIVE';
      results.replicate.message = `Authenticated successfully as ${res.data?.username || 'user'}.`;
    } catch (err: any) {
      results.replicate.status = 'ERROR';
      results.replicate.message = err.response?.data?.detail || err.response?.data || err.message;
    }
  }

  // 2. ElevenLabs Check
  const elevenKey = process.env.ELEVENLABS_API_KEY?.trim();
  results.elevenlabs.keyPresent = !!elevenKey;
  if (!elevenKey) {
    results.elevenlabs.status = 'MISSING_KEY';
    results.elevenlabs.message = 'ELEVENLABS_API_KEY environment variable is missing.';
  } else {
    try {
      const res = await axios.get('https://api.elevenlabs.io/v1/user', {
        headers: { 'xi-api-key': elevenKey },
        timeout: 8000
      });
      results.elevenlabs.status = 'ACTIVE';
      results.elevenlabs.message = `Authenticated successfully (Tier: ${res.data?.subscription?.tier || 'active'}).`;
    } catch (err: any) {
      results.elevenlabs.status = 'ERROR';
      results.elevenlabs.message = err.response?.data?.detail?.message || err.response?.data?.detail || err.message;
    }
  }

  // 3. OpenAI Check
  const openAIKey = process.env.OPENAI_API_KEY?.trim();
  results.openai.keyPresent = !!openAIKey;
  if (!openAIKey) {
    results.openai.status = 'MISSING_KEY';
    results.openai.message = 'OPENAI_API_KEY environment variable is missing.';
  } else {
    try {
      const res = await axios.get('https://api.openai.com/v1/models', {
        headers: { Authorization: `Bearer ${openAIKey}` },
        timeout: 8000
      });
      results.openai.status = 'ACTIVE';
      results.openai.message = `Authenticated successfully (${res.data?.data?.length || 0} models available).`;
    } catch (err: any) {
      results.openai.status = 'ERROR';
      results.openai.message = err.response?.data?.error?.message || err.response?.data || err.message;
    }
  }

  // 4. Self-Hosted Whisper ASR Container Check
  const asrEndpoint = process.env.WHISPER_ASR_ENDPOINT || 'http://localhost:9000/asr';
  const asrEnabled = process.env.WHISPER_ASR_ENABLED !== 'false';
  const asrModel = process.env.WHISPER_ASR_MODEL || 'large-v3';

  results.selfHostedWhisper = {
    status: 'UNKNOWN',
    endpoint: asrEndpoint,
    model: asrModel,
    enabled: asrEnabled,
    message: ''
  };

  if (!asrEnabled) {
    results.selfHostedWhisper.status = 'DISABLED';
    results.selfHostedWhisper.message = 'Self-hosted Whisper ASR service is disabled via WHISPER_ASR_ENABLED=false.';
  } else {
    try {
      const parsedUrl = new URL(asrEndpoint);
      const hostOrigin = `${parsedUrl.protocol}//${parsedUrl.host}`;
      await axios.get(hostOrigin, { timeout: 3000 });
      results.selfHostedWhisper.status = 'ACTIVE';
      results.selfHostedWhisper.message = `Self-hosted Whisper ASR Docker service reachable at ${asrEndpoint} (Model: ${asrModel}).`;
    } catch (err: any) {
      results.selfHostedWhisper.status = 'READY_WHEN_CONTAINER_UP';
      results.selfHostedWhisper.message = `Self-hosted Whisper ASR configured for ${asrEndpoint} (Model: ${asrModel}). Container will be queried when transcription requests arrive.`;
    }
  }

  return results;
}

