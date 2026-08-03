import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { 
  processWhopWebhookPayment, 
  deductUserCredits, 
  handleRegenerateBilling, 
  saveLeadEmail,
  getSupportTickets,
  saveSupportTicket,
  getEnterpriseRequests,
  saveEnterpriseRequest,
  getDMAutomationRules,
  saveDMAutomationRule,
  deleteDMAutomationRule,
  getUsers,
  createUsageLog,
  getAffiliates,
  getReferrals,
  updateAffiliateStatus,
  triggerPayout
} from "./src/lib/firebase";
import { getNicheAssetBundle, generateSpeech, renderVideoWithEngine, NicheAssetBundle, NICHE_ASSET_BUNDLES, applyMusicThemeOverride, applyCaptionStyleOverride } from "./src/lib/videoEngine";

dotenv.config();

const app = express();
const PORT = 3000;

// Admin emails list for server-side permission checks & subscription bypass
const ADMIN_EMAILS: string[] = ["noamazar84@gmail.com"];

app.use(express.json());

// Lazy-initialized Gemini client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required. Please set it in the Secrets panel.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Dynamically generate high-retention Asset Bundle DNA profiles for custom niches
async function generateCustomNicheAssetBundle(nicheName: string, ai: GoogleGenAI): Promise<NicheAssetBundle> {
  const systemInstruction = `You are a high-end AI video designer. Given a custom niche name, you must dynamically generate a fully integrated visual, audio, and caption style profile (Asset Bundle DNA) that perfectly matches the theme and vibe of the niche.

VALID CHOICES & MAPPINGS:
- transitionType: must be one of: "glitch", "whip_zoom", "smooth_fade", "kinetic_slide", "cross_dissolve"
- animationStyle: must be one of: "bounce_pop", "slide_word", "karaoke_highlight", "fade_in_letters", "kinetic_slide"
- elevenLabsVoiceId & voiceTone mapping:
  Select the most fitting combination from this list of 10 voices:
  1. "pNInz6obpgdqMMtxF5g0" (Adam, Authoritative, calm, rich, persuasive)
  2. "ErXwobaYiN019pkySvjV" (Antoni, Motivational, energetic, commanding)
  3. "VR6A628IeXyFis85v67m" (Rachel, Tech Futurist, clear, intelligent)
  4. "IKne3meq5aC2sn9mY3v7" (Charlie, Stoic Master, deep, wise, grave)
  5. "LcfcDJNQA9L9g3r6vQc1" (Emily, SaaS Marketing, professional, modern)
  6. "EXAVITQu4vr4xnSDgMaL" (Bella, Wanderer, dreamy, soothing, slow)
  7. "AZnzlk1XvdvUeBnXmlld" (Domi, Hypnotic, whispering, deep, analytical)
  8. "YoZ06Su8Vja9dL7x5Fc4" (Sam, Cosmic, inspirational, clear, grand)
  9. "ODq5FmEglgST7m633R25" (Freya, Culture Critic, expressive, quick, punchy)
  10. "TX38omv2FvLa50mY5yG7" (George, Historian, vintage, slow, deep)

- backgroundMusicUrl & bgMusicTrack mapping:
  Select one of these SoundHelix tracks based on mood:
  - Song 1: "Midnight Crypto Beats" (Synthwave / Lo-Fi, mood: Mysterious, URL: https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3)
  - Song 2: "Aggressive Iron Beats" (Industrial, mood: Ultra high-energy, URL: https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3)
  - Song 3: "Neural Hack Wave" (Cyberpunk, mood: Technological, URL: https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3)
  - Song 4: "Echoes of Rome" (Orchestral, mood: Solemn/Epic, URL: https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3)
  - Song 5: "Micro-SaaS Hustle Beats" (Corporate electro, mood: Productive, URL: https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3)
  - Song 6: "Lost in Kyoto Ambient" (Ethnic fusion, mood: Dreamy, URL: https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3)
  - Song 7: "Subconscious Pulse" (Binaural, mood: Hypnotic, URL: https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3)
  - Song 8: "Stellar Horizon" (Space ambient, mood: Cosmic scale, URL: https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3)
  - Song 9: "Retro CRT Glitch" (Lo-Fi hip-hop, mood: Nostalgic, URL: https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3)
  - Song 10: "Dusty Museum Chamber" (Classical cello, mood: Majestic, URL: https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3)

Ensure all colors are high-contrast hex values (e.g. #00FFCC, #FF3366, #FFFFFF) and readable over dark backgrounds.`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: `Design a high-retention video styling profile for custom niche: "${nicheName}"`,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        required: ["primaryColor", "secondaryColor", "accentColor", "stockFootageStyle", "footageQuery", "transitionType", "elevenLabsVoiceId", "voiceName", "voiceTone", "bgMusicTrack", "musicGenre", "musicMood", "backgroundMusicUrl", "fontName", "fontSize", "fontColor", "strokeColor", "strokeWidth", "uppercase", "animationStyle"],
        properties: {
          primaryColor: { type: Type.STRING, description: "Main theme color hex (e.g. #00FFCC)" },
          secondaryColor: { type: Type.STRING, description: "Secondary brand color hex" },
          accentColor: { type: Type.STRING, description: "Brighter accent color hex" },
          stockFootageStyle: { type: Type.STRING, description: "Detailed description of Stock footage style suitable for B-roll" },
          footageQuery: { type: Type.STRING, description: "Space-separated Pexels search keywords (3-5 words)" },
          transitionType: { type: Type.STRING, description: "Must be exactly one of: glitch, whip_zoom, smooth_fade, kinetic_slide, cross_dissolve" },
          elevenLabsVoiceId: { type: Type.STRING, description: "ElevenLabs voice ID from the valid list" },
          voiceName: { type: Type.STRING, description: "Descriptive name for the voice" },
          voiceTone: { type: Type.STRING, description: "Emotional delivery tone description" },
          bgMusicTrack: { type: Type.STRING, description: "Custom track title" },
          musicGenre: { type: Type.STRING, description: "Genre description" },
          musicMood: { type: Type.STRING, description: "Mood description" },
          backgroundMusicUrl: { type: Type.STRING, description: "The matching SoundHelix URL from the list" },
          fontName: { type: Type.STRING, description: "Elegant font name (e.g. Montserrat-Black, Impact, Georgia-Bold)" },
          fontSize: { type: Type.INTEGER, description: "Font size in px (e.g. 64-80)" },
          fontColor: { type: Type.STRING, description: "Readable caption font color hex" },
          strokeColor: { type: Type.STRING, description: "Caption outline stroke color hex (e.g. #000000)" },
          strokeWidth: { type: Type.NUMBER, description: "Caption outline stroke thickness (e.g. 3-5)" },
          uppercase: { type: Type.BOOLEAN, description: "Whether to force uppercase" },
          animationStyle: { type: Type.STRING, description: "Must be exactly one of: bounce_pop, slide_word, karaoke_highlight, fade_in_letters, kinetic_slide" }
        }
      }
    }
  });

  const d = JSON.parse(response.text || "{}");
  const cleanId = "custom_" + nicheName.toLowerCase().replace(/[^a-z0-9]/g, "_");
  
  return {
    id: cleanId,
    name: nicheName,
    visual: {
      primaryColor: d.primaryColor || "#00FFCC",
      secondaryColor: d.secondaryColor || "#0056B3",
      accentColor: d.accentColor || "#93C5FD",
      stockFootageStyle: d.stockFootageStyle || `Cinematic views about ${nicheName}`,
      footageQuery: d.footageQuery || nicheName,
      transitionType: d.transitionType || "smooth_fade"
    },
    audio: {
      elevenLabsVoiceId: d.elevenLabsVoiceId || "pNInz6obpgdqMMtxF5g0",
      voiceName: d.voiceName || "Adam (Voice Over AI)",
      voiceTone: d.voiceTone || "Professional, engaging",
      stability: 0.75,
      similarityBoost: 0.85,
      bgMusicTrack: d.bgMusicTrack || "Synthwave Lo-Fi",
      musicGenre: d.musicGenre || "Synthwave",
      musicMood: d.musicMood || "Focused",
      backgroundMusicUrl: d.backgroundMusicUrl || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    caption: {
      fontName: d.fontName || "Montserrat-Black",
      fontSize: d.fontSize || 70,
      fontColor: d.fontColor || "#FFFFFF",
      strokeColor: d.strokeColor || "#000000",
      strokeWidth: d.strokeWidth || 4,
      uppercase: d.uppercase !== undefined ? d.uppercase : true,
      animationStyle: d.animationStyle || "bounce_pop"
    }
  };
}

// Generate context-aware niche-specific viral growth pro-tip
async function generateViralTip(nicheName: string, scriptTitle: string, ai: GoogleGenAI): Promise<string> {
  try {
    const systemInstruction = `You are a world-class short-form content growth strategist.
Your task is to analyze the chosen niche and current script to produce a highly specific, context-aware, scroll-stopping "Viral Tip" (1 to 2 sentences max).
Avoid general tips; reference specific content hooks, aesthetic details, pacing, or viewer psychology triggers that are active for the niche: "${nicheName}".`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Generate a context-aware viral tip for niche: "${nicheName}" with script topic/title: "${scriptTitle}"`,
      config: { systemInstruction }
    });

    return response.text?.trim() || "Pro-Tip: Ensure the hook text-overlay remains visible for exactly 4.2 seconds to maximize mental loop completion.";
  } catch (error) {
    console.error("[Viral Tip Generation Error]", error);
    return "Pro-Tip: Use high-contrast color highlights on key action verbs in your subtitles to increase overall reading speed and retention.";
  }
}

// POST /api/custom-niche/analyze - Dynamic Custom Niche analysis layer
app.post("/api/custom-niche/analyze", async (req, res) => {
  const { nicheName } = req.body;
  try {
    if (!nicheName || typeof nicheName !== "string" || nicheName.trim() === "") {
      res.status(400).json({ error: "Niche name is required." });
      return;
    }

    const ai = getGeminiClient();
    const systemInstruction = `You are an elite short-form video optimization engine.
Analyze the user's custom niche and generate:
1. An incredibly catchy, hyper-viral example topic for this niche (e.g. "The shocking truth about...", "This one simple pattern...").
2. The perfect emotional tone for this niche, selected strictly from: "Controversial", "Mysterious", "Educational", "Motivational".`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Analyze this custom niche: "${nicheName}"`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["exampleTopic", "recommendedTone"],
          properties: {
            exampleTopic: {
              type: Type.STRING,
              description: "A hook-driven, scroll-stopping video topic idea.",
            },
            recommendedTone: {
              type: Type.STRING,
              description: "Must be exactly one of: Controversial, Mysterious, Educational, Motivational",
            },
          }
        }
      }
    });

    const data = JSON.parse(response.text || "{}");
    res.json({
      success: true,
      exampleTopic: data.exampleTopic || `How to master ${nicheName} in 30 seconds...`,
      recommendedTone: data.recommendedTone || "Educational",
    });
  } catch (error: any) {
    console.error("[Custom Niche Analyze Error]", error);
    res.json({
      success: true,
      exampleTopic: `How to master ${nicheName} in 30 seconds...`,
      recommendedTone: "Educational",
    });
  }
});

// ============================================================================
// AFFILIATE SYSTEM SECURITY CONFIGURATION & PROTECTION LAYER
// ============================================================================

// Backend verification middleware on every API request to affiliate data / admin features
function verifyAdminRole(req: express.Request, res: express.Response, next: express.NextFunction) {
  const isDevOrPreview = process.env.NODE_ENV !== "production";
  const userEmail = (
    req.headers["x-user-email"] || 
    req.query.email || 
    req.body?.email || 
    ""
  ).toString().trim().toLowerCase();

  const isExplicitAdmin = ADMIN_EMAILS.map(e => e.toLowerCase()).includes(userEmail);

  if (!isDevOrPreview && !isExplicitAdmin) {
    console.warn(`[Security Guard] Unauthorized admin/affiliate data access attempt blocked. Email parsed: ${userEmail}`);
    return res.status(403).json({
      error: "Forbidden: Access restricted to Admin (noamazar84@gmail.com) only.",
      code: "ADMIN_ACCESS_REQUIRED"
    });
  }
  next();
}

// Secure GET endpoint for listing affiliates
app.get("/api/admin/affiliates", verifyAdminRole, async (req, res) => {
  try {
    const list = await getAffiliates();
    res.json({ success: true, data: list });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to retrieve affiliates" });
  }
});

// Secure GET endpoint for listing referrals
app.get("/api/admin/referrals", verifyAdminRole, async (req, res) => {
  try {
    const list = await getReferrals();
    res.json({ success: true, data: list });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to retrieve referrals" });
  }
});

// Secure POST endpoint for updating affiliate status
app.post("/api/admin/affiliate/status", verifyAdminRole, async (req, res) => {
  try {
    const { id, status } = req.body;
    if (!id || !status) {
      return res.status(400).json({ error: "Missing id or status in request body" });
    }
    await updateAffiliateStatus(id, status);
    res.json({ success: true, message: `Status updated to ${status}` });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to update affiliate status" });
  }
});

// Secure POST endpoint for triggering a payout
app.post("/api/admin/affiliate/payout", verifyAdminRole, async (req, res) => {
  try {
    const { affiliateId } = req.body;
    if (!affiliateId) {
      return res.status(400).json({ error: "Missing affiliateId in request body" });
    }
    await triggerPayout(affiliateId);
    res.json({ success: true, message: `Payout completed for ${affiliateId}` });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to trigger payout" });
  }
});

// Whop Webhook Autopilot Endpoint (listens for payment.succeeded events)
app.post("/api/webhooks/whop", async (req, res) => {
  try {
    const payload = req.body;
    console.log("[Webhook Autopilot] Received Whop Webhook payload:", payload);

    // Extract event name (e.g., payment.succeeded)
    const event = payload.event || payload.action || payload.type || "payment.succeeded";
    
    // We strictly listen for 'payment.succeeded'
    if (event !== "payment.succeeded") {
      res.json({ success: true, message: `Ignored unhandled event: ${event}` });
      return;
    }

    // Extract email and amount
    const email = payload.email || payload.user_email || payload.data?.email || payload.data?.user?.email;
    const amountStr = payload.amount || payload.price || payload.data?.amount || payload.data?.amount_paid;
    const amount = amountStr ? parseFloat(amountStr) : 29.00; // Default or parsed amount

    if (!email) {
      res.status(400).json({ error: "Missing user email in webhook payload." });
      return;
    }

    // Process webhook autopilot sync in Firestore
    const result = await processWhopWebhookPayment(email, amount);

    // Immediately trigger MailerLite conditional stop for paid user
    await syncMailerLitePaidStatus(email, amount >= 199 ? "Enterprise" : "Pro").catch(err => {
      console.warn("[Whop Webhook MailerLite Sync Warning]", err);
    });

    res.json({
      success: true,
      message: "WHOP_SYNC_SUCCESS",
      data: result
    });
  } catch (error: any) {
    console.error("[Webhook Error] Failed to process Whop Webhook:", error);
    res.status(500).json({ error: error.message || "Failed to process Whop Webhook" });
  }
});

// Dynamic structure configuration conforming to the ViralFlow Core Engine Spec:
// - "15s": {"hook": "0-3s", "value": "3-12s", "cta": "12-15s"}
// - "30s": {"hook": "0-3s", "story": "3-25s", "cta": "25-30s"}
// - "45s": {"hook": "0-3s", "story": "3-35s", "cta": "35-45s"}
// - "60s": {"hook": "0-3s", "story": "3-50s", "cta": "50-60s"}
function getSystemInstruction(tone: string, platform: string, duration: number): string {
  const d = Number(duration) || 60;
  let structurePrompt = "";
  let wordCountGuideline = "";
  
  if (d <= 15) {
    structurePrompt = `
- HOOK (0-3s): A controversial, shocking, or deeply surprising opening sentence that stops the scroll immediately.
- BODY / VALUE (3-12s): Highly concentrated niche-specific value segment. (Note: Output the main value here under the 'body' property. Since this is a 15s video, there is no separate twist section; write a very brief 1-sentence or empty string for the 'twist' property).
- CTA (12-15s): A specific, high-converting call to action to comment or follow.`;
    wordCountGuideline = "strictly between 35 and 45 words";
  } else if (d <= 30) {
    structurePrompt = `
- HOOK (0-3s): A controversial, shocking, or deeply surprising opening sentence that stops the scroll immediately.
- BODY / STORY (3-15s): High-retention story segment (Part 1).
- TWIST / STORY (15-25s): A counter-intuitive story twist or mind-blowing payoff (Part 2 of the story).
- CTA (25-30s): A specific, high-converting call to action to comment or follow.`;
    wordCountGuideline = "strictly between 75 and 90 words";
  } else if (d <= 45) {
    structurePrompt = `
- HOOK (0-3s): A controversial, shocking, or deeply surprising opening sentence that stops the scroll immediately.
- BODY / STORY (3-20s): High-retention story segment (Part 1).
- TWIST / STORY (20-35s): A counter-intuitive story twist or mind-blowing payoff (Part 2 of the story).
- CTA (35-45s): A specific, high-converting call to action to comment or follow.`;
    wordCountGuideline = "strictly between 110 and 135 words";
  } else {
    // 60s default
    structurePrompt = `
- HOOK (0-3s): A controversial, shocking, or deeply surprising opening sentence that stops the scroll immediately.
- BODY / STORY (3-25s): High-retention story segment (Part 1).
- TWIST / STORY (25-50s): A counter-intuitive story twist or mind-blowing payoff (Part 2 of the story).
- CTA (50-60s): A specific, high-converting call to action to comment or follow.`;
    wordCountGuideline = "strictly between 150 and 180 words";
  }

  return `You are an elite viral content expert who specializes in copywriting for short-form video formats.
Your task is to write a highly engaging script based on the user's topic.
The script MUST follow this structure and timing breakdown strictly:
${structurePrompt}

STYLE & LANGUAGE GUIDELINES:
- Use the selected tone: ${tone}.
- Optimize for the platform: ${platform}.
- Use simple, punchy, rhythmic language. Speak directly to the viewer (use "you" and "your").
- No unnecessary filler words.
- The total spoken word count of all sections combined must be ${wordCountGuideline}.
- Provide a brief, engaging visual cue/direction for each section so the creator knows what to show on screen.`;
}

// API endpoint to generate viral script with real-time credit deduction
app.post("/api/generate", async (req, res) => {
  try {
    const { topic, tone = "Controversial", platform = "TikTok", email, duration = 60, engineType } = req.body;

    if (!topic || typeof topic !== "string" || topic.trim() === "") {
      res.status(400).json({ error: "Topic is required and must be a valid string." });
      return;
    }

    // Server-side Authentication & Admin Bypass check
    const normalizedEmail = (email || "").trim().toLowerCase();
    const isAdmin = ADMIN_EMAILS.map(e => e.toLowerCase()).includes(normalizedEmail);

    if (isAdmin) {
      console.log(`[Admin Bypass] Bypassing subscription check for admin email: ${email}`);
    } else {
      if (!email) {
        res.status(401).json({ error: "Authentication required. To generate your video, please sign up for a plan.", requiresSubscription: true });
        return;
      }

      // Real-time API Credit / Subscription Deduction
      try {
        const cost = 0.0015; // standard Gemini API cost per call
        const billing = await deductUserCredits(email, cost, undefined, duration, engineType);
        console.log(`[Real-time Billing] Processed credit deduction for ${email}. Overage applied: ${billing.overageApplied}, Charge: $${billing.overageCharge}`);
      } catch (deductErr: any) {
        console.error(`[Real-time Billing Error] Insufficient credits/subscription for ${email}:`, deductErr.message);
        res.status(402).json({ error: `Payment Required: ${deductErr.message}`, requiresSubscription: true });
        return;
      }
    }

    const ai = getGeminiClient();

    const systemInstruction = getSystemInstruction(tone, platform, duration);

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Write a viral video script about the topic: "${topic}"`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["title", "hook", "body", "twist", "cta", "wordCount", "targetTone", "targetPlatform", "viralRatingReason", "hashtags"],
          properties: {
            title: {
              type: Type.STRING,
              description: "A short, extremely catchy working title for this script.",
            },
            hook: {
              type: Type.OBJECT,
              required: ["visual", "audio"],
              properties: {
                visual: {
                  type: Type.STRING,
                  description: "Visual guidelines or action for the HOOK section as defined in the system instructions.",
                },
                audio: {
                  type: Type.STRING,
                  description: "The spoken words for the HOOK segment. Must match the specified timing precisely.",
                },
              },
            },
            body: {
              type: Type.OBJECT,
              required: ["visual", "audio"],
              properties: {
                visual: {
                  type: Type.STRING,
                  description: "Visual guidelines or B-roll ideas for the BODY/STORY section.",
                },
                audio: {
                  type: Type.STRING,
                  description: "The spoken words for the BODY/STORY segment.",
                },
              },
            },
            twist: {
              type: Type.OBJECT,
              required: ["visual", "audio"],
              properties: {
                visual: {
                  type: Type.STRING,
                  description: "Visual guidelines or suggestions for the TWIST section.",
                },
                audio: {
                  type: Type.STRING,
                  description: "The spoken words for the TWIST segment (leave empty or brief transition if duration is 15s).",
                },
              },
            },
            cta: {
              type: Type.OBJECT,
              required: ["visual", "audio"],
              properties: {
                visual: {
                  type: Type.STRING,
                  description: "Visual guidelines for the CTA section like text overlays or animations.",
                },
                audio: {
                  type: Type.STRING,
                  description: "The spoken words for the CTA segment. Must match the final seconds.",
                },
              },
            },
            wordCount: {
              type: Type.INTEGER,
              description: "The exact total spoken word count of all sections combined.",
            },
            targetTone: {
              type: Type.STRING,
              description: "The requested tone.",
            },
            targetPlatform: {
              type: Type.STRING,
              description: "The requested platform.",
            },
            viralRatingReason: {
              type: Type.STRING,
              description: "A 1-2 sentence breakdown of why this script is engineered to go viral (psychological triggers, retention).",
            },
            hashtags: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
              description: "3 to 5 highly relevant viral hashtags (without the hash symbol).",
            },
          },
        },
      },
    });

    const scriptText = response.text;
    if (!scriptText) {
      throw new Error("Empty response received from the AI model.");
    }

    const scriptData = JSON.parse(scriptText);
    res.json(scriptData);
  } catch (error: any) {
    console.error("Error generating script:", error);
    res.status(500).json({
      error: error.message || "Failed to generate viral script. Please check your setup and try again.",
    });
  }
});

// Section 1-B, 1-E, 1-F: API endpoint to regenerate script with 1:1 credit deduction or overage billing
app.post("/api/regenerate", async (req, res) => {
  try {
    const { topic, tone = "Controversial", platform = "TikTok", email, duration = 60, engineType } = req.body;

    if (!topic || typeof topic !== "string" || topic.trim() === "") {
      res.status(400).json({ error: "Topic is required and must be a valid string." });
      return;
    }

    if (!email) {
      res.status(400).json({ error: "User email is required for credit calculation." });
      return;
    }

    // 1-B & 1-F: 'Regenerate' credit deduction (1:1) and 'Overage Billing' ($0.06 per unit)
    const billingResult = await handleRegenerateBilling(email, duration, engineType);

    const ai = getGeminiClient();

    const systemInstruction = getSystemInstruction(tone, platform, duration);

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Write a viral video script about the topic: "${topic}"`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["title", "hook", "body", "twist", "cta", "wordCount", "targetTone", "targetPlatform", "viralRatingReason", "hashtags"],
          properties: {
            title: {
              type: Type.STRING,
              description: "A short, extremely catchy working title for this script.",
            },
            hook: {
              type: Type.OBJECT,
              required: ["visual", "audio"],
              properties: {
                visual: {
                  type: Type.STRING,
                  description: "Visual guidelines or action for the HOOK section as defined in the system instructions.",
                },
                audio: {
                  type: Type.STRING,
                  description: "The spoken words for the HOOK segment. Must match the specified timing precisely.",
                },
              },
            },
            body: {
              type: Type.OBJECT,
              required: ["visual", "audio"],
              properties: {
                visual: {
                  type: Type.STRING,
                  description: "Visual guidelines or B-roll ideas for the BODY/STORY section.",
                },
                audio: {
                  type: Type.STRING,
                  description: "The spoken words for the BODY/STORY segment.",
                },
              },
            },
            twist: {
              type: Type.OBJECT,
              required: ["visual", "audio"],
              properties: {
                visual: {
                  type: Type.STRING,
                  description: "Visual guidelines or suggestions for the TWIST section.",
                },
                audio: {
                  type: Type.STRING,
                  description: "The spoken words for the TWIST segment (leave empty or brief transition if duration is 15s).",
                },
              },
            },
            cta: {
              type: Type.OBJECT,
              required: ["visual", "audio"],
              properties: {
                visual: {
                  type: Type.STRING,
                  description: "Visual guidelines for the CTA section like text overlays or animations.",
                },
                audio: {
                  type: Type.STRING,
                  description: "The spoken words for the CTA segment. Must match the final seconds.",
                },
              },
            },
            wordCount: {
              type: Type.INTEGER,
              description: "The exact total spoken word count of all sections combined.",
            },
            targetTone: {
              type: Type.STRING,
              description: "The requested tone.",
            },
            targetPlatform: {
              type: Type.STRING,
              description: "The requested platform.",
            },
            viralRatingReason: {
              type: Type.STRING,
              description: "A 1-2 sentence breakdown of why this script is engineered to go viral (psychological triggers, retention).",
            },
            hashtags: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
              description: "3 to 5 highly relevant viral hashtags (without the hash symbol).",
            },
          },
        },
      },
    });

    const scriptText = response.text;
    if (!scriptText) {
      throw new Error("Empty response received from the AI model.");
    }

    const scriptData = JSON.parse(scriptText);
    res.json({
      ...scriptData,
      billing: billingResult
    });
  } catch (error: any) {
    console.error("Error regenerating script:", error);
    res.status(500).json({
      error: error.message || "Failed to regenerate viral script.",
    });
  }
});

// GET /api/niches/:id/bundle - Retrieve a niche's high-retention Asset Bundle DNA profile
app.get("/api/niches/:id/bundle", (req, res) => {
  try {
    const { id } = req.params;
    const bundle = getNicheAssetBundle(id);
    res.json({ success: true, bundle });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to retrieve asset bundle profile." });
  }
});

// POST /api/generate-video - Perform stage 3 video orchestration and middleware logic
app.post("/api/generate-video", async (req, res) => {
  try {
    const { nicheId, script, musicTheme, captionStyle } = req.body;

    if (!nicheId) {
      res.status(400).json({ error: "Niche ID is required to fetch target asset bundles." });
      return;
    }

    if (!script || !script.hook || !script.body || !script.twist || !script.cta) {
      res.status(400).json({ error: "A complete script object with hook, body, twist, and cta is required." });
      return;
    }

    console.log(`[Middleware Orchestrator] Matching niche "${nicheId}", musicTheme "${musicTheme || 'default'}", captionStyle "${captionStyle || 'default'}" with corresponding Asset Bundle...`);
    const ai = getGeminiClient();

    let bundle: NicheAssetBundle;
    // Check if the niche is custom (has custom_ prefix or does not exist in standard bundles)
    const normalizedNicheId = nicheId.toLowerCase().trim();
    const isCustom = normalizedNicheId.startsWith("custom_") || normalizedNicheId === "custom" || !NICHE_ASSET_BUNDLES[normalizedNicheId];

    if (isCustom) {
      console.log(`[Middleware Orchestrator] Custom niche detected: "${nicheId}". Dynamically adapting style & music DNA on the fly...`);
      // Clean up display name
      let displayName = nicheId;
      if (displayName.toLowerCase().startsWith("custom_")) {
        displayName = displayName.substring(7);
      }
      displayName = displayName.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
      
      try {
        const rawBundle = await generateCustomNicheAssetBundle(displayName, ai);
        let tempBundle = applyMusicThemeOverride(rawBundle, musicTheme);
        bundle = applyCaptionStyleOverride(tempBundle, captionStyle);
      } catch (err) {
        console.error("[Custom Niche Adaptation Error] Falling back to default bundle:", err);
        bundle = getNicheAssetBundle("finance", musicTheme, captionStyle);
      }
    } else {
      bundle = getNicheAssetBundle(nicheId, musicTheme, captionStyle);
    }

    // Generate niche-specific 'Viral Tip' via Viral Insight Agent (3-C)
    console.log(`[Middleware Orchestrator] Triggering Viral Insight Agent for "${bundle.name}"...`);
    const viralTip = await generateViralTip(bundle.name, script.title || "Untitled Viral Video", ai);

    // 1. ElevenLabs Speech Generation: convert text to high-retention audio narration
    const fullNarrationText = `${script.hook.audio} ${script.body.audio} ${script.twist.audio} ${script.cta.audio}`;
    console.log(`[Middleware Orchestrator] Sending narration to ElevenLabs voice over engine...`);
    const speechResult = await generateSpeech(fullNarrationText, bundle.audio.elevenLabsVoiceId);

    // 2. Video API Rendering: send timeline/templates to Shotstack or Creatomate
    console.log(`[Middleware Orchestrator] Initiating video rendering pipeline...`);
    const renderResult = await renderVideoWithEngine(script, bundle);

    // 3. Return the fully orchestrated response back to the client
    res.json({
      success: true,
      message: "STAGE_3_ORCHESTRATION_SUCCESS",
      nicheId: bundle.id,
      nicheName: bundle.name,
      assetBundle: bundle,
      viralTip,
      audio: {
        voiceOverUrl: speechResult.audioUrl,
        bgMusicName: bundle.audio.bgMusicTrack,
        bgMusicUrl: bundle.audio.backgroundMusicUrl,
        elevenLabsVoiceId: bundle.audio.elevenLabsVoiceId,
        generatedReal: speechResult.generatedReal,
      },
      video: {
        renderedVideoUrl: renderResult.videoUrl,
        duration: renderResult.duration,
        generatedReal: renderResult.generatedReal,
        apiUsed: renderResult.apiUsed,
      },
      captions: {
        styling: bundle.caption,
      },
    });
  } catch (error: any) {
    console.error("[Video Generation Middleware Error]", error);
    res.status(500).json({
      error: error.message || "Failed to orchestrate niche video generation pipeline.",
    });
  }
});

// API endpoint for Contact Us form submission with automated AI Chatbot response
app.post("/api/contact", async (req, res) => {
  try {
    const { fullName, email, message } = req.body;

    if (!fullName || typeof fullName !== "string" || fullName.trim() === "") {
      res.status(400).json({ error: "Full Name is required." });
      return;
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      res.status(400).json({ error: "A valid email address is required." });
      return;
    }
    if (!message || typeof message !== "string" || message.trim() === "") {
      res.status(400).json({ error: "Message is required." });
      return;
    }

    // Database logging simulation
    console.log(`[Database Sync & Webhook Triggered] Contact Submission:`, {
      fullName,
      email,
      message,
      timestamp: new Date().toISOString(),
    });

    // Generate automated custom AI response
    const ai = getGeminiClient();
    const systemInstruction = `You are 'ViralFlow AI Support', an elite automated helper for ViralFlow.ai.
Your role is to read a user's contact form message and output a concise, premium, highly professional support auto-response.
Guidelines:
- Always greet the user using their first name: "${fullName.split(" ")[0]}".
- Gently acknowledge their core message or question: "${message}".
- Offer a helpful, specific suggestion related to their inquiry.
- Keep the tone clean, minimalist, professional, and elite (SaaS support).
- Ensure it is brief, no more than 3 short sentences.
- Conclude with a supportive sign-off: 'ViralFlow Support AI'.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Generate an auto-response to the following user message: "${message}" from "${fullName}" (${email})`,
      config: {
        systemInstruction,
      },
    });

    const chatbotReply = response.text || "Thank you for reaching out! Our team has received your message and is processing it immediately.";

    res.json({
      success: true,
      message: "Form submitted successfully. Automation hook triggered.",
      data: {
        id: `tkt_${Math.random().toString(36).substring(2, 11)}`,
        fullName,
        email,
        message,
        timestamp: new Date().toISOString(),
      },
      chatbotReply,
    });
  } catch (error: any) {
    console.error("Error in contact form automation:", error);
    res.status(500).json({
      error: error.message || "Failed to submit contact form. Please try again.",
    });
  }
});

// POST /api/leads - Lead Generation capture endpoint
app.post("/api/leads", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || typeof email !== "string" || !email.includes("@")) {
      res.status(400).json({ error: "A valid email address is required to register." });
      return;
    }

    console.log(`[Lead DB Sync] Capturing high-intent lead email: ${email}`);
    await saveLeadEmail(email);
    res.json({
      success: true,
      message: "Congratulations! Access secured successfully. Get ready to explode your growth.",
    });
  } catch (error: any) {
    console.error("[Lead Capture Error]", error);
    res.status(500).json({
      error: error.message || "Failed to capture lead. Please try again.",
    });
  }
});

// -----------------------------------------------------------------------------
// MAILERLITE AUTOMATION & EMAIL SEQUENCE INTEGRATION MODULE
// -----------------------------------------------------------------------------

// MailerLite Automation Sequence Schema Definition (5 Emails sent 24h apart + Conditional Stop)
export const MAILERLITE_AUTOMATION_SEQUENCE = {
  sequenceName: "ViralFlow Onboarding Nurture & Conversion Sequence",
  totalEmails: 5,
  scheduleInterval: "24 hours apart",
  conditionalStopRule: {
    ruleType: "Goal / Condition Check",
    condition: "Subscriber Field 'account_status' EQUALS 'Paid' OR Group EQUALS 'Paid Subscribers'",
    action: "Stop Automation Immediately for Subscriber",
    description: "When a subscriber is marked as Paid in database/Firebase, MailerLite instantly halts all remaining emails in this sequence."
  },
  emails: [
    {
      step: 1,
      delay: "Immediate (Day 0)",
      title: "Email 1: Welcome & Getting Started",
      subject: "Welcome to ViralFlow AI 👋 Start your first viral project today!",
      focus: "Introduction + direct link to start their first project",
      previewText: "Your account is active. Here is how to create your first viral short-form video in under 60 seconds...",
      ctaText: "Start Your First Project",
      ctaUrl: "/#magic?utm_source=mailerlite&utm_medium=email&utm_campaign=onboarding_seq_e1",
      pricingCtaUrl: "/#pricing?utm_source=mailerlite&utm_medium=email&utm_campaign=onboarding_seq_e1_pricing"
    },
    {
      step: 2,
      delay: "24 Hours (Day 1)",
      title: "Email 2: Fake Text & Story POV Strategy",
      subject: "The 'Fake Text & Story POV' strategy driving 10M+ views 📱",
      focus: "Deep dive into the Fake Text & Story POV format that hooks short-form audiences",
      previewText: "Chat history videos are exploding on TikTok and Reels. Here is the secret blueprint to master this format...",
      ctaText: "Try Fake Text POV Generator",
      ctaUrl: "/#magic?utm_source=mailerlite&utm_medium=email&utm_campaign=onboarding_seq_e2",
      pricingCtaUrl: "/#pricing?utm_source=mailerlite&utm_medium=email&utm_campaign=onboarding_seq_e2_pricing"
    },
    {
      step: 3,
      delay: "48 Hours (Day 2)",
      title: "Email 3: Split Screen Secrets",
      subject: "Split Screen Secrets: How to double audience retention ⚡",
      focus: "Focus on 'Split Screen Secrets' + Call to Action to upgrade for 4K dual-stream exports",
      previewText: "Dual-stream gameplay + story overlays increase 60s watch time by 240%. Learn how to combine visual streams...",
      ctaText: "Unlock Split Screen Engine",
      ctaUrl: "/#pricing?utm_source=mailerlite&utm_medium=email&utm_campaign=onboarding_seq_e3_pricing",
      pricingCtaUrl: "/#pricing?utm_source=mailerlite&utm_medium=email&utm_campaign=onboarding_seq_e3_pricing"
    },
    {
      step: 4,
      delay: "72 Hours (Day 3)",
      title: "Email 4: Social Proof & Case Study",
      subject: "Case Study: How Alex gained 140k followers in 14 days 🚀",
      focus: "Social proof/Case study showing real creator ROI + Call to Action to upgrade",
      previewText: "See how Alex scaled from zero to 140,000 TikTok followers using ViralFlow AI automation and shadow channels...",
      ctaText: "Upgrade to Pro Pass",
      ctaUrl: "/#pricing?utm_source=mailerlite&utm_medium=email&utm_campaign=onboarding_seq_e4_pricing",
      pricingCtaUrl: "/#pricing?utm_source=mailerlite&utm_medium=email&utm_campaign=onboarding_seq_e4_pricing"
    },
    {
      step: 5,
      delay: "96 Hours (Day 4)",
      title: "Email 5: Final Urgency & Discount Offer",
      subject: "⏰ Final Opportunity: Claim 30% OFF Pro Plan (Expires Tonight)",
      focus: "Final urgency + limited-time discount offer to convert subscriber to paid plan",
      previewText: "This is your last chance to claim a 30% discount on ViralFlow Pro. Lock in unlimited video generations now...",
      ctaText: "Claim 30% Discount Now",
      ctaUrl: "/#pricing?utm_source=mailerlite&utm_medium=email&utm_campaign=onboarding_seq_e5_pricing&discount=SPECIAL30",
      pricingCtaUrl: "/#pricing?utm_source=mailerlite&utm_medium=email&utm_campaign=onboarding_seq_e5_pricing&discount=SPECIAL30"
    }
  ]
};

// Runtime stored MailerLite API Key fallback (set via Dashboard Settings)
let runtimeMailerLiteApiKey: string = "";

function getEffectiveMailerLiteApiKey(): string {
  const key = runtimeMailerLiteApiKey || process.env.MAILERLITE_API_KEY || "";
  return key.trim();
}

// Helper: Sync Subscriber to MailerLite on Signup (Google, Facebook, Email)
async function syncMailerLiteSubscriber(data: {
  email: string;
  firstName?: string;
  authProvider?: string;
}) {
  const { email, firstName = "", authProvider = "email" } = data;
  const apiKey = getEffectiveMailerLiteApiKey();

  console.log(`[MailerLite Sync] Adding new subscriber: ${email} (First Name: ${firstName}, Provider: ${authProvider})`);

  // Extracted first name fallback
  const parsedFirstName = firstName.trim() || email.split("@")[0] || "Creator";

  if (apiKey && apiKey !== "INSERT_YOUR_NEW_TOKEN_HERE" && apiKey.trim() !== "") {
    try {
      const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          email: email,
          fields: {
            name: parsedFirstName,
            auth_provider: authProvider,
            account_status: "Free",
            signup_date: new Date().toISOString()
          },
          status: "active"
        })
      });

      if (response.ok) {
        const resData = await response.json();
        console.log(`[MailerLite API Success] Subscriber ${email} added to MailerLite onboarding automation!`);
        return { success: true, apiConnected: true, data: resData };
      } else {
        const errText = await response.text();
        console.warn(`[MailerLite API Warning] HTTP ${response.status}: ${errText}`);
        return { success: true, apiConnected: false, warning: `MailerLite API returned ${response.status}: ${errText}` };
      }
    } catch (err: any) {
      console.error("[MailerLite API Error] Connection failed:", err);
      return { success: true, apiConnected: false, warning: `MailerLite connection error: ${err.message}` };
    }
  } else {
    console.log(`[MailerLite Sandbox Mode] Token not configured. Simulated subscriber registration for ${email} with name '${parsedFirstName}'.`);
    return {
      success: true,
      apiConnected: false,
      message: `Simulated MailerLite subscriber registration for ${email} (${parsedFirstName}). Set MAILERLITE_API_KEY in Settings to go live.`
    };
  }
}

// Helper: Sync Paid Status to MailerLite (Triggers CRITICAL Conditional Stop)
async function syncMailerLitePaidStatus(email: string, tier: string = "Pro") {
  const apiKey = getEffectiveMailerLiteApiKey();

  console.log(`[MailerLite Conditional Stop Trigger] Marking subscriber ${email} as Paid ('${tier}')...`);

  if (apiKey && apiKey !== "INSERT_YOUR_NEW_TOKEN_HERE" && apiKey.trim() !== "") {
    try {
      const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          email: email,
          fields: {
            account_status: "Paid",
            subscription_tier: tier,
            upgrade_date: new Date().toISOString()
          },
          status: "active"
        })
      });

      if (response.ok) {
        const resData = await response.json();
        console.log(`[MailerLite Goal Reached] Subscriber ${email} field 'account_status' updated to Paid. Automation halted immediately!`);
        return { success: true, apiConnected: true, automationHalted: true, data: resData };
      } else {
        const errText = await response.text();
        console.warn(`[MailerLite Paid Sync Warning] HTTP ${response.status}: ${errText}`);
        return { success: true, apiConnected: false, automationHalted: true, warning: errText };
      }
    } catch (err: any) {
      console.error("[MailerLite Paid Sync Error]:", err);
      return { success: true, apiConnected: false, automationHalted: true, warning: err.message };
    }
  } else {
    console.log(`[MailerLite Sandbox Mode] Simulated conditional stop for subscriber ${email}. Account status updated to Paid (${tier}). Automation sequence halted.`);
    return {
      success: true,
      apiConnected: false,
      automationHalted: true,
      message: `Simulated conditional stop in MailerLite for ${email} (${tier} tier).`
    };
  }
}

// POST /api/mailerlite/subscribe - Register new signup from Google, Facebook, or Email
app.post("/api/mailerlite/subscribe", async (req, res) => {
  try {
    const { email, firstName, authProvider } = req.body;
    if (!email || typeof email !== "string" || !email.includes("@")) {
      res.status(400).json({ error: "A valid email address is required for MailerLite signup integration." });
      return;
    }

    // Save as lead email in database
    await saveLeadEmail(email);

    // Call MailerLite subscriber integration helper
    const result = await syncMailerLiteSubscriber({ email, firstName, authProvider });
    res.json(result);
  } catch (error: any) {
    console.error("[MailerLite Subscribe Endpoint Error]", error);
    res.status(500).json({ error: error.message || "Failed to process MailerLite subscription." });
  }
});

// GET /api/settings/mailerlite - Get status of MailerLite settings
app.get("/api/settings/mailerlite", (req, res) => {
  const apiKey = getEffectiveMailerLiteApiKey();
  const configured = Boolean(apiKey && apiKey !== "INSERT_YOUR_NEW_TOKEN_HERE" && apiKey.trim() !== "");
  let masked = "";
  if (configured) {
    masked = apiKey.length > 8 ? `${apiKey.substring(0, 6)}...${apiKey.substring(apiKey.length - 4)}` : "••••••••";
  }
  res.json({
    success: true,
    apiKeyConfigured: configured,
    apiKeyMasked: masked
  });
});

// POST /api/settings/mailerlite - Save MAILERLITE_API_KEY from Settings UI
app.post("/api/settings/mailerlite", (req, res) => {
  const { apiKey } = req.body;
  if (typeof apiKey === "string") {
    runtimeMailerLiteApiKey = apiKey.trim();
    console.log(`[Settings] Updated runtime MAILERLITE_API_KEY (Length: ${runtimeMailerLiteApiKey.length})`);
    const configured = Boolean(runtimeMailerLiteApiKey && runtimeMailerLiteApiKey !== "INSERT_YOUR_NEW_TOKEN_HERE");
    res.json({
      success: true,
      apiKeyConfigured: configured,
      message: configured ? "MailerLite API Key saved successfully!" : "MailerLite API Key cleared."
    });
  } else {
    res.status(400).json({ error: "Invalid API key format provided." });
  }
});

// POST /api/settings/mailerlite/test - Test MailerLite API Key Connection
app.post("/api/settings/mailerlite/test", async (req, res) => {
  try {
    const { apiKey: keyOverride } = req.body;
    const keyToUse = keyOverride?.trim() || getEffectiveMailerLiteApiKey();

    if (!keyToUse || keyToUse === "INSERT_YOUR_NEW_TOKEN_HERE") {
      res.status(400).json({ error: "No MailerLite API Key provided or configured." });
      return;
    }

    // Ping MailerLite subscribers API
    const response = await fetch("https://connect.mailerlite.com/api/subscribers?limit=1", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${keyToUse}`,
        "Content-Type": "application/json"
      }
    });

    if (response.ok) {
      res.json({
        success: true,
        message: "Successfully authenticated with MailerLite API!"
      });
    } else {
      const errText = await response.text();
      res.status(400).json({
        error: `MailerLite API authentication failed (HTTP ${response.status}): ${errText}`
      });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to reach MailerLite API." });
  }
});

// POST /api/mailerlite/sync-paid - Update subscriber to Paid and trigger conditional stop
app.post("/api/mailerlite/sync-paid", async (req, res) => {
  try {
    const { email, tier = "Pro" } = req.body;
    if (!email || typeof email !== "string" || !email.includes("@")) {
      res.status(400).json({ error: "A valid email address is required." });
      return;
    }

    const result = await syncMailerLitePaidStatus(email, tier);
    res.json(result);
  } catch (error: any) {
    console.error("[MailerLite Sync Paid Error]", error);
    res.status(500).json({ error: error.message || "Failed to sync paid status to MailerLite." });
  }
});

// GET /api/mailerlite/sequence - Return sequence workflow details and connection status
app.get("/api/mailerlite/sequence", (req, res) => {
  const apiKey = process.env.MAILERLITE_API_KEY;
  const isKeyConfigured = Boolean(apiKey && apiKey !== "INSERT_YOUR_NEW_TOKEN_HERE" && apiKey.trim() !== "");

  res.json({
    success: true,
    apiKeyConfigured: isKeyConfigured,
    sequence: MAILERLITE_AUTOMATION_SEQUENCE
  });
});

// POST /api/mailerlite/test-trigger - Test email sequence or conditional stop trigger from dashboard
app.post("/api/mailerlite/test-trigger", async (req, res) => {
  try {
    const { actionType, email = "test_user@example.com", firstName = "Alex", authProvider = "google", tier = "Pro" } = req.body;

    if (actionType === "SUBSCRIBER_ADDED") {
      const result = await syncMailerLiteSubscriber({ email, firstName, authProvider });
      res.json({
        success: true,
        actionType,
        message: `Subscriber '${firstName}' (${email}) successfully registered via ${authProvider} in MailerLite onboarding sequence!`,
        result
      });
    } else if (actionType === "CONDITIONAL_STOP") {
      const result = await syncMailerLitePaidStatus(email, tier);
      res.json({
        success: true,
        actionType,
        message: `Subscriber '${email}' marked as Paid (${tier}) in MailerLite. Conditional stop goal achieved - sequence halted!`,
        result
      });
    } else {
      res.status(400).json({ error: "Invalid actionType. Must be SUBSCRIBER_ADDED or CONDITIONAL_STOP." });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Test trigger failed." });
  }
});

// POST /api/mailerlite/abandonment - Send abandonment lead to MailerLite & save lead
app.post("/api/mailerlite/abandonment", async (req, res) => {
  try {
    const { email, apiKey: clientApiKey } = req.body;
    if (!email || typeof email !== "string" || !email.includes("@")) {
      res.status(400).json({ error: "A valid email address is required." });
      return;
    }

    console.log(`[Abandonment Lead] Capturing lead email: ${email}`);
    // Save to Firestore lead database
    await saveLeadEmail(email);

    const apiKey = process.env.MAILERLITE_API_KEY || clientApiKey;

    if (apiKey && apiKey !== "INSERT_YOUR_NEW_TOKEN_HERE") {
      try {
        const mlResponse = await fetch("https://connect.mailerlite.com/api/subscribers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            email: email,
            status: "active"
          })
        });

        if (mlResponse.ok) {
          console.log(`[MailerLite API] Lead ${email} sent successfully!`);
          res.json({ success: true, message: "Lead sent successfully to MailerLite!" });
          return;
        } else {
          const errText = await mlResponse.text();
          console.error("[MailerLite API Error]", errText);
          res.json({ success: true, warning: "Saved to lead database; MailerLite status: " + errText });
          return;
        }
      } catch (mlErr: any) {
        console.error("[MailerLite Communication Error]", mlErr);
        res.json({ success: true, warning: "Saved to lead database; MailerLite connection error." });
        return;
      }
    } else {
      console.log(`[MailerLite API] Token not configured yet. Saved lead ${email} to Firestore/LocalStorage.`);
      res.json({ success: true, message: "Lead captured successfully in database." });
    }
  } catch (error: any) {
    console.error("[Abandonment Lead Handler Error]", error);
    res.status(500).json({ error: error.message || "Failed to process abandonment lead." });
  }
});


// -----------------------------------------------------------------------------
// STAGE 6 CORE ENGINE ENDPOINTS
// -----------------------------------------------------------------------------

// [6.ג] E-commerce Ad Suite - Convert product link into ad copy/script using Gemini API
app.post("/api/ecommerce/generate", async (req, res) => {
  try {
    const { productLink, targetPlatform, audienceAngle, visualVibe, email } = req.body;
    if (!productLink || typeof productLink !== "string") {
      res.status(400).json({ error: "Product link URL is required." });
      return;
    }

    console.log(`[E-commerce Ad Suite] Analyzing product link: ${productLink} for target platform: ${targetPlatform}`);
    
    // Server-side Authentication & Admin Bypass check
    const normalizedEmail = (email || "").trim().toLowerCase();
    const isAdmin = ADMIN_EMAILS.map(e => e.toLowerCase()).includes(normalizedEmail);

    if (isAdmin) {
      console.log(`[Admin Bypass] Bypassing subscription check for admin email in e-commerce ad suite: ${email}`);
    } else {
      if (!email) {
        res.status(401).json({ error: "Authentication required. To generate video ads, please sign up for a plan.", requiresSubscription: true });
        return;
      }
      try {
        await deductUserCredits(email, 0.0025);
      } catch (deductErr: any) {
        console.error(`[Real-time Billing Error] E-commerce ad generation failed for ${email}:`, deductErr.message);
        res.status(402).json({ error: `Payment Required: ${deductErr.message}`, requiresSubscription: true });
        return;
      }
    }

    const ai = getGeminiClient();
    const prompt = `You are a world-class E-commerce Short-form Ad Copywriter.
Analyze the following product link and generate high-converting ad campaign assets:
Product Link: ${productLink}
Platform: ${targetPlatform || "TikTok"}
Audience Angle: ${audienceAngle || "Problem-Solution"}
Visual Vibe: ${visualVibe || "Minimalist Tech"}

Generate:
1. Product Title & Value Proposition.
2. Target Demographics (Age Range, Gender, Core Interests).
3. Script with 5 segments (Hook, Problem, Solution, Social Proof, CTA). Each segment MUST have a visual description (cues for B-roll video, styling, pacing) and audio script (voiceover text).
4. 3 alternative high-impact scroll-stopping comment keywords or hooks.
5. Optimized ad copy text and trending hashtags.

Respond strictly in valid JSON matching this schema:
{
  "productTitle": "string",
  "valueProp": "string",
  "targetDemographics": {
    "age": "string",
    "gender": "string",
    "interests": "string[]"
  },
  "script": [
    { "segment": "Hook", "visual": "string", "audio": "string" },
    { "segment": "Problem", "visual": "string", "audio": "string" },
    { "segment": "Solution", "visual": "string", "audio": "string" },
    { "segment": "Social Proof", "visual": "string", "audio": "string" },
    { "segment": "CTA", "visual": "string", "audio": "string" }
  ],
  "hookIdeas": ["string", "string", "string"],
  "adCopy": "string",
  "hashtags": ["string"]
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            productTitle: { type: Type.STRING },
            valueProp: { type: Type.STRING },
            targetDemographics: {
              type: Type.OBJECT,
              properties: {
                age: { type: Type.STRING },
                gender: { type: Type.STRING },
                interests: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["age", "gender", "interests"]
            },
            script: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  segment: { type: Type.STRING },
                  visual: { type: Type.STRING },
                  audio: { type: Type.STRING }
                },
                required: ["segment", "visual", "audio"]
              }
            },
            hookIdeas: { type: Type.ARRAY, items: { type: Type.STRING } },
            adCopy: { type: Type.STRING },
            hashtags: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["productTitle", "valueProp", "targetDemographics", "script", "hookIdeas", "adCopy", "hashtags"]
        }
      }
    });

    const adResultText = response.text;
    if (!adResultText) {
      throw new Error("Failed to generate ad content from Gemini.");
    }

    const adResult = JSON.parse(adResultText);

    if (email) {
      try {
        await deductUserCredits(email, 0.0025); // Simulated API cost
        const allUsers = await getUsers();
        const user = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (user) {
          await createUsageLog(user.serialId, user.email, "E-Commerce Ad Generation", 0.0025);
        }
      } catch (dedErr) {
        console.warn("Could not deduct credit for e-commerce ad generation:", dedErr);
      }
    }

    res.json({
      success: true,
      adResult
    });
  } catch (error: any) {
    console.error("[E-commerce Ad Suite Generation Error]", error);
    res.status(500).json({ error: error.message || "Failed to generate e-commerce ad scripts." });
  }
});

// [6.ב] & [6.ד] DM Automation - Trigger interaction and process overage logic ($0.06/trigger)
app.post("/api/automation/trigger", async (req, res) => {
  try {
    const { email, keyword } = req.body;
    if (!email || !keyword) {
      res.status(400).json({ error: "Email and keyword are required." });
      return;
    }

    const allUsers = await getUsers();
    const user = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    const rules = await getDMAutomationRules(email);
    const activeRule = rules.find(r => r.enabled && r.keyword.toLowerCase() === keyword.toLowerCase());
    
    if (!activeRule) {
      res.json({
        success: false,
        message: `No active DM automation rule found for keyword "${keyword}" under email "${email}".`
      });
      return;
    }

    activeRule.triggerCount = (activeRule.triggerCount || 0) + 1;
    await saveDMAutomationRule(activeRule);

    const tier = (user.subscription_tier || "Spark").toLowerCase();
    let freeLimit = 10;
    if (tier.includes("spark") || tier.includes("starter")) {
      freeLimit = 30;
    } else if (tier.includes("pro") || tier.includes("growth")) {
      freeLimit = 100;
    } else if (tier.includes("velocity")) {
      freeLimit = 200;
    } else if (tier.includes("agency") || tier.includes("empire") || tier.includes("enterprise")) {
      freeLimit = 500;
    }

    const totalTriggers = rules.reduce((acc, r) => acc + (r.triggerCount || 0), 0);
    
    let overageApplied = false;
    let chargeAmount = 0.0;

    if (totalTriggers > freeLimit) {
      overageApplied = true;
      chargeAmount = 0.06; // Overage fee

      try {
        await deductUserCredits(email, 0.0, chargeAmount);
        console.log(`[DM Automation Overage] Applied $0.06 overage fee to ${email} (total triggers: ${totalTriggers} > limit: ${freeLimit})`);
      } catch (err) {
        console.warn("Could not deduct overage credits for DM automation:", err);
      }
    }

    res.json({
      success: true,
      message: "DM automation trigger processed successfully.",
      replySent: activeRule.replyMessage,
      overageApplied,
      chargeAmount,
      totalTriggers,
      freeLimit
    });
  } catch (error: any) {
    console.error("[DM Automation Trigger Error]", error);
    res.status(500).json({ error: error.message || "Failed to trigger DM automation." });
  }
});

// DM Automation Rules Configuration
app.get("/api/automation/rules", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email || typeof email !== "string") {
      res.status(400).json({ error: "Email query param is required." });
      return;
    }
    const rules = await getDMAutomationRules(email);
    res.json(rules);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/automation/rules/save", async (req, res) => {
  try {
    const { rule } = req.body;
    if (!rule || !rule.id || !rule.user_email) {
      res.status(400).json({ error: "Valid rule object is required." });
      return;
    }
    await saveDMAutomationRule(rule);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/automation/rules/delete", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      res.status(400).json({ error: "Rule id is required." });
      return;
    }
    await deleteDMAutomationRule(id);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// [6.ו] Auto-Support Chatbot & Ticket Escalation
app.post("/api/support/chat", async (req, res) => {
  try {
    const { message, email, fullName, submitTicket } = req.body;
    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "Message text is required." });
      return;
    }

    const ai = getGeminiClient();
    const systemPrompt = `You are "ViralFlow Assistant", a highly specialized, self-service AI chatbot designed to help users of ViralFlow.ai (the ultimate AI Short-form Video, E-Commerce Ad Suite, and Shadow Channel automated distribution network).

Be helpful, concise, professional, and slightly energetic. Answer customer queries with precise product details:
- We have three tiers: Starter ($29/mo, 40 videos, 1 Shadow Channel), Pro ($79/mo, 100 videos, 3 Shadow Channels, 24/7 Creator support), Agency ($129/mo, 170 videos, 8 Shadow Channels, account manager).
- We also offer a "TalkToUs Enterprise" plan for custom high-volume corporate needs.
- Our "Shadow Channels" feature automatically publishes and rotates content across linked social channels to amplify organic reach compliant with TikTok/Reels algorithms.
- We support fully automated DM comment nurturing. Comment keywords like "SCALE" trigger custom direct message delivery.
- DM Automation has a free tier limits based on plans (starter: 10, Pro/Growth: 100, Agency/Empire: 500). Additional DM interactions beyond this limit trigger our **Automated Overage Logic of exactly $0.06 per interaction fee**, which is automatically deducted from active credits.

Keep your answer below 3 sentences. If the question cannot be resolved or if the user asks for human/email support, tell them they can escalate and open a dedicated support ticket instantly.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: message,
      config: {
        systemInstruction: systemPrompt,
        maxOutputTokens: 250
      }
    });

    const chatbotReply = response.text || "I am here to help. If you need complex troubleshooting, please let me escalate this to our support desk.";

    if (submitTicket && email) {
      const ticketId = "tkt_" + Math.random().toString(36).substring(2, 9);
      const ticket = {
        id: ticketId,
        fullName: fullName || "Anonymous User",
        email: email,
        message: message,
        status: "open" as const,
        chatbotReply,
        createdAt: new Date().toISOString()
      };
      await saveSupportTicket(ticket);
    }

    res.json({
      success: true,
      reply: chatbotReply
    });
  } catch (error: any) {
    console.error("[Support Chatbot Error]", error);
    res.status(500).json({ error: error.message || "Failed to process chat response." });
  }
});

app.get("/api/support/tickets", async (req, res) => {
  try {
    let tickets = await getSupportTickets();
    const { email } = req.query;
    if (email && typeof email === "string") {
      tickets = tickets.filter(t => t.email.toLowerCase() === email.toLowerCase());
    }
    res.json(tickets);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/support/tickets", async (req, res) => {
  try {
    const { fullName, email, message, chatbotReply } = req.body;
    if (!email || !message) {
      res.status(400).json({ error: "Email and message are required." });
      return;
    }
    const ticketId = "tkt_" + Math.random().toString(36).substring(2, 9);
    const ticket = {
      id: ticketId,
      fullName: fullName || "Anonymous User",
      email: email,
      message: message,
      status: "open" as const,
      chatbotReply: chatbotReply || "",
      createdAt: new Date().toISOString()
    };
    await saveSupportTicket(ticket);
    res.json({ success: true, ticketId });
  } catch (error: any) {
    console.error("[Support Ticket Save Error]", error);
    res.status(500).json({ error: error.message || "Failed to submit support ticket." });
  }
});

app.post("/api/support/tickets/resolve", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      res.status(400).json({ error: "Ticket ID is required." });
      return;
    }
    const tickets = await getSupportTickets();
    const target = tickets.find(t => t.id === id);
    if (target) {
      target.status = "resolved";
      await saveSupportTicket(target);
    }
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// [6.ז] TalkToUs Enterprise Requests
app.post("/api/enterprise/request", async (req, res) => {
  try {
    const { companyName, email, targetVolume, customRequirements } = req.body;
    if (!companyName || !email || !targetVolume) {
      res.status(400).json({ error: "Company name, email, and target video volume are required." });
      return;
    }

    const volume = parseInt(targetVolume) || 1000;
    const baseACV = volume * 1.5;
    const customComplexityFactor = customRequirements && customRequirements.length > 100 ? 1.25 : 1.0;
    const estimatedValue = Math.round(baseACV * customComplexityFactor);

    const reqId = "ent_" + Math.random().toString(36).substring(2, 9);
    const enterpriseReq = {
      id: reqId,
      companyName,
      email,
      targetVolume: volume,
      customRequirements: customRequirements || "Custom corporate short-form media expansion.",
      estimatedValue,
      status: "pending" as const,
      createdAt: new Date().toISOString()
    };

    await saveEnterpriseRequest(enterpriseReq);
    res.json({
      success: true,
      message: "Custom Enterprise specification processed successfully.",
      estimatedValue,
      reqId
    });
  } catch (error: any) {
    console.error("[Enterprise Request Error]", error);
    res.status(500).json({ error: error.message || "Failed to process custom enterprise request." });
  }
});

app.get("/api/enterprise/requests", async (req, res) => {
  try {
    let list = await getEnterpriseRequests();
    const { email } = req.query;
    if (email && typeof email === "string") {
      list = list.filter(r => r.email.toLowerCase() === email.toLowerCase());
    }
    res.json(list);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});


// Serve frontend assets
if (process.env.NODE_ENV !== "production") {
  const { createServer: createViteServer } = await import("vite");
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);
} else {
  const distPath = path.join(process.cwd(), "dist");
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
