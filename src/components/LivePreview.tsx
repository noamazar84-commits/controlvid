import { useState, useEffect, useRef } from "react";
import { checkGatekeeperBarrier } from "./workflow/Gatekeeper";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Heart, 
  MessageCircle, 
  Share2, 
  Music, 
  Sparkles, 
  RotateCw, 
  Smartphone, 
  Check, 
  ExternalLink,
  Flame,
  Award,
  Cpu,
  Tv,
  Type as FontIcon,
  Mic,
  Loader2,
  Download,
  Film,
  Youtube,
  Instagram,
  Facebook,
  UploadCloud,
  Image as ImageIcon,
  Linkedin,
  Twitter
} from "lucide-react";
import { ScriptResponse } from "../types";

const YouTubeIcon = () => (
  <svg className="h-4 w-4 shrink-0 text-white fill-current" viewBox="0 0 24 24" style={{ width: '16px', height: '16px' }}>
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.388.507 9.388.507s7.517 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg className="h-4 w-4 shrink-0 text-white fill-current" viewBox="0 0 24 24" style={{ width: '16px', height: '16px' }}>
    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.92-1.31 1.83-3.58 2.81-5.8 2.72-2.18-.04-4.3-1.16-5.4-3.05-1.15-1.92-1.15-4.48-.02-6.41C5.2 11.24 7.07 9.94 9.25 9.75c.02 1.33.01 2.66.01 3.98-1.22.12-2.43.87-2.91 2.01-.48 1.09-.27 2.45.54 3.32.74.83 1.91 1.22 3 1.05 1.17-.13 2.19-.94 2.54-2.07.13-.38.16-.79.16-1.19-.02-5.59-.01-11.18-.01-16.77-.02-.02-.04-.04-.05-.06z"/>
  </svg>
);

const InstagramIconComponent = () => (
  <svg className="h-4 w-4 shrink-0 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const FacebookIconComponent = () => (
  <svg className="h-4 w-4 shrink-0 text-white fill-current" viewBox="0 0 24 24" style={{ width: '16px', height: '16px' }}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const PinterestIconComponent = () => (
  <svg className="h-4 w-4 shrink-0 text-white fill-current" viewBox="0 0 24 24" style={{ width: '16px', height: '16px' }}>
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.204 0 1.031.397 2.138.893 2.738.1.12.115.226.085.345-.094.393-.305 1.243-.347 1.417-.055.225-.183.272-.421.161-1.572-.731-2.553-3.027-2.553-4.87 0-3.966 2.883-7.611 8.309-7.611 4.364 0 7.757 3.11 7.757 7.268 0 4.336-2.731 7.824-6.525 7.824-1.275 0-2.474-.662-2.885-1.446l-.784 2.992c-.285 1.085-1.057 2.446-1.572 3.284 1.125.348 2.316.536 3.537.536 6.62 0 12-5.367 12-11.987C24 5.367 18.636 0 12.017 0z"/>
  </svg>
);

const XIconComponent = () => (
  <svg className="h-4 w-4 shrink-0 text-white fill-current" viewBox="0 0 24 24" style={{ width: '16px', height: '16px' }}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedInIconComponent = () => (
  <svg className="h-4 w-4 shrink-0 text-white fill-current" viewBox="0 0 24 24" style={{ width: '16px', height: '16px' }}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const SnapchatIconComponent = () => (
  <svg className="h-4 w-4 shrink-0 text-white fill-current" viewBox="0 0 24 24" style={{ width: '16px', height: '16px' }}>
    <path d="M11.996 2.004c-3.14 0-5.69 2.55-5.69 5.69 0 .285.023.565.065.838a1.597 1.597 0 0 0-.585 1.258c0 .723.492 1.346 1.18 1.528.14.733.456 1.4.92 1.954-1.59.566-2.62 2.053-2.31 3.738a1.134 1.134 0 0 0 1.127.93h.273c.473.666 1.168 1.144 1.986 1.32-.423.864-.171 1.921.606 2.482a4.428 4.428 0 0 0 4.636 0c.777-.56 1.029-1.618.606-2.482.818-.176 1.513-.654 1.986-1.32h.273a1.134 1.134 0 0 0 1.127-.93c.31-1.685-.72-3.172-2.31-3.738.464-.554.78-1.221.92-1.954.688-.182 1.18-.805 1.18-1.528 0-.568-.31-.1-.585-1.258a5.556 5.556 0 0 0 .065-.838c0-3.14-2.55-5.69-5.69-5.69z"/>
  </svg>
);

interface LivePreviewProps {
  script: ScriptResponse | null;
  isGenerating: boolean;
  onGenerate?: () => void;
  onUpdateScript?: (updated: ScriptResponse) => void;
  activeUser?: any;
  setIsPricingOpen?: (open: boolean) => void;
}

export default function LivePreview({ 
  script, 
  isGenerating, 
  onGenerate, 
  onUpdateScript,
  activeUser,
  setIsPricingOpen
}: LivePreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(14200);
  const [commentCount, setCommentCount] = useState(892);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeSection, setActiveSection] = useState<"hook" | "body" | "twist" | "cta" >("hook");

  // Stage 3 Orchestrated Media States
  const [orchestratedMedia, setOrchestratedMedia] = useState<any>(null);
  const [isOrchestrating, setIsOrchestrating] = useState(false);
  const [orchestrationError, setOrchestrationError] = useState<string | null>(null);
  const [compilationStep, setCompilationStep] = useState<string>("");

  // Post-generation download pipeline states
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadStep, setDownloadStep] = useState("");
  const [downloadProgress, setDownloadProgress] = useState(0);

  // --- GRANULAR THUMBNAIL SELECTOR STATES FOR ALL 8 MODELS / PLATFORMS ---
  const [studioTab, setStudioTab] = useState<'storyboard' | 'thumbnails'>('storyboard');
  const [selectedThumbnailPlatform, setSelectedThumbnailPlatform] = useState<string>('tiktok');
  
  const [thumbnailConfigs, setThumbnailConfigs] = useState<Record<string, {
    mode: 'smart' | 'upload';
    smartFrameId: string;
    uploadedFile: string | null;
    uploadedFileUrl?: string | null;
    isUploading: boolean;
    uploadProgress: number;
  }>>({
    tiktok: { mode: 'smart', smartFrameId: 'frame-1', uploadedFile: null, uploadedFileUrl: null, isUploading: false, uploadProgress: 0 },
    youtube_shorts: { mode: 'smart', smartFrameId: 'frame-2', uploadedFile: null, uploadedFileUrl: null, isUploading: false, uploadProgress: 0 },
    instagram_reels: { mode: 'smart', smartFrameId: 'frame-1', uploadedFile: null, uploadedFileUrl: null, isUploading: false, uploadProgress: 0 },
    facebook_reels: { mode: 'smart', smartFrameId: 'frame-3', uploadedFile: null, uploadedFileUrl: null, isUploading: false, uploadProgress: 0 },
    snapchat: { mode: 'smart', smartFrameId: 'frame-1', uploadedFile: null, uploadedFileUrl: null, isUploading: false, uploadProgress: 0 },
    pinterest: { mode: 'smart', smartFrameId: 'frame-4', uploadedFile: null, uploadedFileUrl: null, isUploading: false, uploadProgress: 0 },
    linkedin: { mode: 'smart', smartFrameId: 'frame-2', uploadedFile: null, uploadedFileUrl: null, isUploading: false, uploadProgress: 0 },
    x_media: { mode: 'smart', smartFrameId: 'frame-3', uploadedFile: null, uploadedFileUrl: null, isUploading: false, uploadProgress: 0 },
  });

  const thumbnailPlatforms = [
    { id: 'youtube_shorts', name: 'YouTube', icon: YouTubeIcon, color: 'text-red-500', bannerColor: 'bg-red-500/10 border-red-500/20' },
    { id: 'tiktok', name: 'TikTok', icon: TikTokIcon, color: 'text-cyan-400', bannerColor: 'bg-cyan-500/10 border-cyan-500/20' },
    { id: 'instagram_reels', name: 'Instagram', icon: InstagramIconComponent, color: 'text-pink-500', bannerColor: 'bg-pink-500/10 border-pink-500/20' },
    { id: 'facebook_reels', name: 'Facebook', icon: FacebookIconComponent, color: 'text-blue-600', bannerColor: 'bg-blue-600/10 border-blue-600/20' },
    { id: 'pinterest', name: 'Pinterest', icon: PinterestIconComponent, color: 'text-red-600', bannerColor: 'bg-red-600/10 border-red-600/20' },
    { id: 'x_media', name: 'X / Twitter', icon: XIconComponent, color: 'text-white', bannerColor: 'bg-white/10 border-white/20' },
    { id: 'linkedin', name: 'LinkedIn', icon: LinkedInIconComponent, color: 'text-blue-500', bannerColor: 'bg-blue-500/10 border-blue-500/20' },
    { id: 'snapchat', name: 'Snapchat', icon: SnapchatIconComponent, color: 'text-yellow-400', bannerColor: 'bg-yellow-500/10 border-yellow-500/20' }
  ];

  const smartFrames = [
    { id: 'frame-1', name: 'Scroll-Stopping Hook (0.4s)', desc: 'Frame with highlighted hook text "THE SECRET THEY HIDE"', bg: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=350&q=80")' },
    { id: 'frame-2', name: 'Curiosity Peak Climax (26.5s)', desc: 'Emotional peak face with glowing visual subtitle', bg: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=350&q=80")' },
    { id: 'frame-3', name: 'High-Retention Frame (12.2s)', desc: 'High contrast graphic with bold captions applied', bg: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=350&q=80")' },
    { id: 'frame-4', name: 'Call-To-Action Spike (54.8s)', desc: 'Direct arrow with button frame prompting comment link', bg: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=350&q=80")' },
  ];

  const handleRealUpload = (platformId: string, file: File) => {
    if (!file) return;
    setThumbnailConfigs(prev => ({
      ...prev,
      [platformId]: {
        ...prev[platformId],
        isUploading: true,
        uploadProgress: 0,
      }
    }));

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      let progress = 0;
      const interval = setInterval(() => {
        progress += 25;
        setThumbnailConfigs(prev => ({
          ...prev,
          [platformId]: {
            ...prev[platformId],
            uploadProgress: progress,
          }
        }));

        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setThumbnailConfigs(prev => ({
              ...prev,
              [platformId]: {
                ...prev[platformId],
                isUploading: false,
                uploadedFile: file.name,
                uploadedFileUrl: dataUrl,
              }
            }));
          }, 150);
        }
      }, 100);
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = async () => {
    if (!script) return;

    // Premium Wall: Free users are gated on download actions using the central Gatekeeper
    if (checkGatekeeperBarrier("stage_6", activeUser, setIsPricingOpen || (() => {}))) {
      return;
    }

    setIsDownloading(true);
    setDownloadProgress(0);
    
    const steps = [
      "Initializing Stage 3 high-res rendering pipeline...",
      "Extracting voice synthesis stems and sound profiles...",
      "Aligning hardcoded subtitle text markers...",
      "Merging background visual dynamics (1080x1920 MP4)...",
      "Injecting high-authority audio soundscapes...",
      "Exporting completed media package directly to device..."
    ];

    for (let i = 0; i < steps.length; i++) {
      setDownloadStep(steps[i]);
      const targetProgress = Math.floor(((i + 1) / steps.length) * 100);
      
      // Smoothly animate progress bar
      for (let p = downloadProgress; p <= targetProgress; p += 4) {
        setDownloadProgress(p);
        await new Promise(r => setTimeout(r, 20));
      }
      setDownloadProgress(targetProgress);
      await new Promise(r => setTimeout(r, 450));
    }

    // Now trigger a real file download of the script data as a .txt file!
    const fileContent = `
=========================================
VIRALFLOW HIGH-RETENTION SCRIPT PACKAGE
=========================================
CAMPAIGN TITLE: ${script.title}
DURATION: 60 Seconds
NICHE: ${orchestratedMedia?.nicheName || "Custom High-Discovery Niche"}

-----------------------------------------
1. SCROLL-STOPPING HOOK (0-5s)
-----------------------------------------
VISUAL SCENE: 
${script.hook.visual}

VOICEOVER AUDIO: 
${script.hook.audio}

-----------------------------------------
2. CORE VALUE & RETENTION (5-25s)
-----------------------------------------
VISUAL SCENE: 
${script.body.visual}

VOICEOVER AUDIO: 
${script.body.audio}

-----------------------------------------
3. POLARIZING TWIST / CURIOSITY (25-50s)
-----------------------------------------
VISUAL SCENE: 
${script.twist.visual}

VOICEOVER AUDIO: 
${script.twist.audio}

-----------------------------------------
4. CONVERSION CALL-TO-ACTION (50-60s)
-----------------------------------------
VISUAL SCENE: 
${script.cta.visual}

VOICEOVER AUDIO: 
${script.cta.audio}

=========================================
VIRAL HASHTAGS:
${script.hashtags.map(t => "#" + t).join(" ")}
=========================================
`;

    const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${script.title.toLowerCase().replace(/[^a-z0-9]+/g, "_")}_viralflow_package.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setIsDownloading(false);
  };

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const voiceOverRef = useRef<HTMLAudioElement | null>(null);

  // Auto-detect niche based on script metadata or session storage
  const getSelectedNicheId = () => {
    const savedNicheId = sessionStorage.getItem("wizard_selected_niche_id");
    if (savedNicheId) return savedNicheId;

    if (!script) return "finance";
    const text = (script.title + " " + script.hashtags.join(" ")).toLowerCase();
    if (text.includes("fitness") || text.includes("diet") || text.includes("gym")) return "fitness";
    if (text.includes("tech") || text.includes("ai") || text.includes("software")) return "tech";
    if (text.includes("motivation") || text.includes("stoic") || text.includes("mindset")) return "motivation";
    if (text.includes("business") || text.includes("startup") || text.includes("capital")) return "business";
    if (text.includes("travel") || text.includes("europe") || text.includes("destination")) return "travel";
    if (text.includes("psychology") || text.includes("mind") || text.includes("casinos")) return "psychology";
    if (text.includes("science") || text.includes("space") || text.includes("galaxy")) return "science";
    if (text.includes("culture") || text.includes("movie") || text.includes("cartoon")) return "culture";
    if (text.includes("history") || text.includes("ancient") || text.includes("civilization")) return "history";

    return "finance";
  };

  // 1. Fetch Orchestrated Video/Audio/Caption Assets on script change
  useEffect(() => {
    if (!script) {
      setOrchestratedMedia(null);
      return;
    }

    const loadOrchestratedMedia = async () => {
      setIsOrchestrating(true);
      setOrchestrationError(null);
      setIsPlaying(false);
      setCurrentTime(0);

      const nicheId = getSelectedNicheId();

      try {
        setCompilationStep("Initializing Niche Asset Bundle DNA...");
        await new Promise(r => setTimeout(r, 600));

        setCompilationStep("Synthesizing narration with ElevenLabs...");
        await new Promise(r => setTimeout(r, 600));

        setCompilationStep("Pulling cinematic background assets & compiling timelines...");
        
        const musicTheme = sessionStorage.getItem("wizard_selected_music_theme") || undefined;
        const captionStyle = sessionStorage.getItem("wizard_selected_caption_style") || "ViralFlow Blue";

        const response = await fetch("/api/generate-video", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nicheId,
            script,
            musicTheme,
            captionStyle,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to compile niche assets.");
        }

        const data = await response.json();
        setOrchestratedMedia(data);
      } catch (err: any) {
        console.error("Orchestration error:", err);
        setOrchestrationError("Failed to trigger Stage 3 video engine pipeline. Using realistic fallback view.");
      } finally {
        setIsOrchestrating(false);
      }
    };

    loadOrchestratedMedia();
  }, [script]);

  // Sync HTML Video and Voice-over playbacks
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
    if (voiceOverRef.current) {
      if (isPlaying) {
        voiceOverRef.current.play().catch(() => {});
      } else {
        voiceOverRef.current.pause();
      }
    }
  }, [isPlaying, orchestratedMedia]);

  // Sync mute state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
    if (voiceOverRef.current) {
      voiceOverRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Reset playback if script changes
  useEffect(() => {
    setCurrentTime(0);
    setIsPlaying(false);
    setActiveSection("hook");
  }, [script]);

  // Handle active section based on current timestamp
  useEffect(() => {
    if (currentTime < 5) {
      setActiveSection("hook");
    } else if (currentTime < 25) {
      setActiveSection("body");
    } else if (currentTime < 50) {
      setActiveSection("twist");
    } else {
      setActiveSection("cta");
    }
  }, [currentTime]);

  // Handle timer interval
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= 60) {
            setIsPlaying(false);
            if (videoRef.current) videoRef.current.currentTime = 0;
            if (voiceOverRef.current) voiceOverRef.current.currentTime = 0;
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
    }
  };

  const handleShare = () => {
    setCopiedLink(true);
    if (navigator.clipboard) {
      navigator.clipboard.writeText("https://viralflow.ai/v/simulation");
    }
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleJumpToSection = (section: "hook" | "body" | "twist" | "cta") => {
    let targetSecTime = 0;
    if (section === "hook") targetSecTime = 0;
    if (section === "body") targetSecTime = 5;
    if (section === "twist") targetSecTime = 25;
    if (section === "cta") targetSecTime = 50;

    setCurrentTime(targetSecTime);
    
    if (videoRef.current) {
      videoRef.current.currentTime = targetSecTime;
    }
    if (voiceOverRef.current) {
      voiceOverRef.current.currentTime = targetSecTime;
    }
    setIsPlaying(true);
  };

  const getActiveAudioText = () => {
    if (!script) return "";
    switch (activeSection) {
      case "hook":
        return script.hook.audio;
      case "body":
        return script.body.audio;
      case "twist":
        return script.twist.audio;
      case "cta":
        return script.cta.audio;
    }
  };

  // Custom visual feedback color styling based on dynamic asset bundle
  const getPrimaryColor = () => {
    return orchestratedMedia?.assetBundle?.visual?.primaryColor || "#38bdf8";
  };

  const getAccentColor = () => {
    return orchestratedMedia?.assetBundle?.visual?.accentColor || "#A5F3FC";
  };

  if (script || isGenerating) {
    return (
      <div className="w-full h-full flex flex-col space-y-4 animate-[fadeIn_0.3s_ease-out]">
        {/* Upper Header of the Studio Workspace */}
        <div className="flex items-center justify-between border-b border-white/[0.04] pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: getPrimaryColor() }} />
            <span className="font-mono text-xs font-black tracking-widest uppercase" style={{ color: getPrimaryColor() }}>
              STUDIO // ENGINE CORE SELECTION
            </span>
          </div>
          {script && (
            <div className="flex items-center space-x-3 text-slate-400 font-mono text-[10px]">
              <span className="px-2 py-0.5 rounded-md font-bold uppercase" style={{ backgroundColor: `${getPrimaryColor()}15`, border: `1px solid ${getPrimaryColor()}30`, color: getPrimaryColor() }}>
                {orchestratedMedia?.nicheName || "CUSTOM"} ENGINE LOADED
              </span>
              <span>{currentTime}s / 60s</span>
            </div>
          )}
        </div>

        {/* Studio Workspace Layout */}
        <div className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch min-h-0">
          
          {/* Left Panel of Canvas: Live Edit Textareas & Platform Thumbnail Studio */}
          <div className="xl:col-span-7 flex flex-col bg-black/45 border border-white/[0.03] rounded-2xl p-5 space-y-4 overflow-y-auto max-h-[620px] scrollbar-none relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.04] pb-3">
              <div className="flex bg-black/40 p-1 rounded-xl border border-white/[0.04] shrink-0">
                <button
                  type="button"
                  onClick={() => setStudioTab('storyboard')}
                  className={`px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-lg border-none focus:outline-none transition-all cursor-pointer flex items-center gap-1.5 ${
                    studioTab === 'storyboard'
                      ? "bg-white/5 text-white border border-white/10"
                      : "text-slate-400 hover:text-slate-300 bg-transparent"
                  }`}
                >
                  <Film className="h-3.5 w-3.5" style={{ color: getPrimaryColor() }} />
                  <span>Interactive Storyboard</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStudioTab('thumbnails')}
                  className={`px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-lg border-none focus:outline-none transition-all cursor-pointer flex items-center gap-1.5 ${
                    studioTab === 'thumbnails'
                      ? "bg-white/5 text-white border border-white/10"
                      : "text-slate-400 hover:text-slate-300 bg-transparent"
                  }`}
                >
                  <ImageIcon className="h-3.5 w-3.5 text-amber-400" />
                  <span>Platform Thumbnail Studio</span>
                </button>
              </div>
              {script && (
                <span className="text-[9px] font-mono bg-white/5 px-2 py-1 rounded border border-white/10 uppercase font-bold text-slate-400 tracking-wider">
                  {studioTab === 'storyboard' ? "REAL-TIME STORY SYNC" : "8 NETWORKS RUNNING"}
                </span>
              )}
            </div>

            {isGenerating ? (
              /* Glowing pulse skeleton editor */
              <div className="space-y-4 animate-pulse">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-900/30 border border-slate-900/40 space-y-3">
                    <div className="h-3 w-20 bg-slate-800 rounded-md" />
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                      <div className="md:col-span-4 h-14 bg-slate-850 rounded-lg" />
                      <div className="md:col-span-8 h-14 bg-slate-850 rounded-lg" />
                    </div>
                  </div>
                ))}
              </div>
            ) : script ? (
              studioTab === 'storyboard' ? (
                <div className="space-y-4 text-left">
                  {/* BRAND NEW POST-GENERATION MANAGEMENT COMMAND BAR */}
                  <div className="p-4 rounded-xl bg-[#0e0e11] border border-white/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <div>
                        <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest block">
                          Pipeline: Active Preview
                        </span>
                        <span className="text-[9px] text-slate-400 font-sans block">
                          Live playback synced with real-time storyboard edits.
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2">
                      {/* REGENERATE BUTTON */}
                      <button
                        type="button"
                        onClick={() => onGenerate?.()}
                        disabled={isGenerating || isDownloading}
                        className="px-3 py-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer border border-white/[0.08] transition-all disabled:opacity-50"
                        title="Re-run the script writer and video pipeline (consumes 1 generation credit)"
                      >
                        <RotateCw className={`h-3 w-3 ${isGenerating ? "animate-spin" : ""}`} />
                        <span>Regenerate (-1 Cr.)</span>
                      </button>
                      
                      {/* DOWNLOAD BUTTON */}
                      <button
                        type="button"
                        onClick={handleDownload}
                        disabled={isDownloading || isGenerating}
                        className="px-3 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-sans font-black uppercase text-[10px] tracking-wider flex items-center gap-1.5 rounded-lg cursor-pointer transition-all border-none disabled:opacity-50"
                      >
                        {isDownloading ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <Download className="h-3 w-3" />
                        )}
                        <span>Download HD MP4</span>
                      </button>
                    </div>
                  </div>

                  {/* Inline download progress indicator */}
                  {isDownloading && (
                    <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 space-y-2 animate-[fadeIn_0.15s_ease-out]">
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="text-amber-400 font-bold uppercase">{downloadStep}</span>
                        <span className="text-slate-400">{downloadProgress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-300" 
                          style={{ width: `${downloadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Script title input */}
                  <div className="space-y-1">
                    <label className="block text-[8px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                      Campaign Heading / Title
                    </label>
                    <input
                      type="text"
                      value={script.title}
                      onChange={(e) => {
                        if (onUpdateScript) {
                          onUpdateScript({ ...script, title: e.target.value });
                        }
                      }}
                      className="w-full bg-[#121215] border border-slate-850 hover:border-slate-800 focus:ring-1 rounded-xl p-3 text-sm text-white font-sans font-bold focus:outline-none transition-all"
                      style={{ borderColor: "#1E293B" }}
                    />
                  </div>

                  {/* Individual segment blocks */}
                  {[
                    { id: "hook", label: "0-5s // Scroll Stopping Hook", data: script.hook },
                    { id: "body", label: "5-25s // Core Value & Retention", data: script.body },
                    { id: "twist", label: "25-50s // Polarizing Twist / Curiosity", data: script.twist },
                    { id: "cta", label: "50-60s // Conversion Call-to-Action", data: script.cta },
                  ].map((sec) => (
                    <div 
                      key={sec.id}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        activeSection === sec.id 
                          ? "bg-white/[0.01]" 
                          : "bg-black/20 border-slate-900 hover:border-slate-850"
                      }`}
                      style={{ 
                        borderColor: activeSection === sec.id ? `${getPrimaryColor()}40` : "rgba(255,255,255,0.03)",
                        boxShadow: activeSection === sec.id ? `0 0 20px ${getPrimaryColor()}05` : "none"
                      }}
                      onClick={() => setActiveSection(sec.id as any)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider" style={{ color: activeSection === sec.id ? getPrimaryColor() : "#64748B" }}>
                          {sec.label}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mt-1">
                        {/* Visual instructions */}
                        <div className="md:col-span-4 space-y-1">
                          <span className="block text-[8px] font-mono font-semibold text-slate-500 uppercase tracking-wider">
                            Visual Scene Action
                          </span>
                          <textarea
                            rows={2}
                            value={sec.data.visual}
                            onChange={(e) => {
                              if (onUpdateScript) {
                                const updatedSection = { ...sec.data, visual: e.target.value };
                                onUpdateScript({ ...script, [sec.id]: updatedSection });
                              }
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full bg-[#121215] border border-slate-900 focus:border-white/20 focus:ring-0 rounded-lg p-2 text-xs text-slate-300 font-sans leading-relaxed focus:outline-none transition-all resize-none italic"
                          />
                        </div>

                        {/* Voiceover lines */}
                        <div className="md:col-span-8 space-y-1">
                          <span className="block text-[8px] font-mono font-semibold text-slate-500 uppercase tracking-wider">
                            Voiceover Text / Audio Script
                          </span>
                          <textarea
                            rows={2}
                            value={sec.data.audio}
                            onChange={(e) => {
                              if (onUpdateScript) {
                                const updatedSection = { ...sec.data, audio: e.target.value };
                                onUpdateScript({ ...script, [sec.id]: updatedSection });
                              }
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full bg-[#121215] border border-slate-900 focus:border-white/20 focus:ring-0 rounded-lg p-2 text-xs text-slate-100 font-sans font-semibold leading-relaxed focus:outline-none transition-all resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Hashtags input */}
                  <div className="space-y-1 pt-2 border-t border-slate-900">
                    <label className="block text-[8px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                      Viral Hashtag Optimization
                    </label>
                    <input
                      type="text"
                      value={script.hashtags.join(", ")}
                      onChange={(e) => {
                        if (onUpdateScript) {
                          const tags = e.target.value.split(",").map(t => t.trim().replace(/^#/, "")).filter(Boolean);
                          onUpdateScript({ ...script, hashtags: tags });
                        }
                      }}
                      className="w-full bg-[#121215] border border-slate-850 hover:border-slate-800 rounded-xl p-3 text-xs font-mono focus:outline-none transition-all"
                      style={{ color: getPrimaryColor() }}
                    />
                  </div>

                  {/* Viral Insight Agent high-retention tip (Section 3-C) */}
                  {orchestratedMedia?.viralTip && (
                    <div className="mt-4 p-4 rounded-xl bg-amber-400/5 border border-amber-400/10 text-left relative overflow-hidden shadow-[0_4px_15px_rgba(245,158,11,0.05)]">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Flame className="h-4 w-4 text-amber-400 animate-pulse" />
                        <span className="text-[9px] font-mono font-black text-amber-400 uppercase tracking-widest">
                          Viral Insight Agent // Growth Tip
                        </span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed italic">
                        "{orchestratedMedia.viralTip}"
                      </p>
                      <div className="absolute right-0 bottom-0 top-0 w-16 opacity-5 pointer-events-none bg-[radial-gradient(circle_at_bottom_right,#f59e0b,transparent_70%)]" />
                    </div>
                  )}
                </div>
              ) : (
                /* GRANULAR THUMBNAIL SELECTOR VIEW ACROSS ALL 8 NETWORKS */
                <div className="space-y-6 text-left animate-[fadeIn_0.2s_ease-out]">
                  
                  {/* Explanation banner */}
                  <div className="p-5 rounded-2xl bg-[#0e0e11] border border-white/[0.08]">
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block">
                      Multi-Platform Cover Optimization
                    </span>
                    <p className="text-xs text-slate-400 font-sans leading-relaxed mt-2">
                      Configure high-CTR covers separately for all 8 major short-form networks. Choose between auto-extracted optimal video frames or manual high-res image uploads.
                    </p>
                  </div>

                  {/* 8 Networks Tab Grid Selector */}
                  <div className="space-y-3">
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">
                      Select Target Social Platform (8 Models)
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {thumbnailPlatforms.map((plat) => {
                        const Icon = plat.icon;
                        const isSelected = selectedThumbnailPlatform === plat.id;
                        return (
                          <button
                            key={plat.id}
                            type="button"
                            onClick={() => setSelectedThumbnailPlatform(plat.id)}
                            className={`py-2 px-2 flex items-center justify-center rounded-xl border transition-all cursor-pointer w-full ${
                              isSelected
                                ? "bg-amber-400/15 border-amber-400 text-amber-400 ring-2 ring-amber-400/25"
                                : "bg-[#121215] border-slate-800 text-slate-300 hover:border-slate-700 hover:text-slate-100"
                            }`}
                          >
                            <div className="flex items-center gap-1.5 justify-center">
                              <Icon />
                              <span className="text-[9px] sm:text-[10px] tracking-tight sm:tracking-wider font-bold font-mono uppercase whitespace-nowrap">
                                {plat.name}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Mode switcher for the selected network */}
                  <div className="p-5 rounded-2xl bg-black/40 border border-white/[0.06] space-y-4">
                    <div className="flex items-center justify-between border-b border-white/[0.08] pb-3.5">
                      <div className="flex items-center gap-2.5">
                        <span className={`text-sm font-mono font-bold text-amber-400 uppercase`}>
                          {thumbnailPlatforms.find(p => p.id === selectedThumbnailPlatform)?.name} Cover Settings
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold bg-white/5 px-2 py-0.5 rounded">
                        PLATFORM_SPECIFIC_MODEL
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setThumbnailConfigs(prev => ({
                          ...prev,
                          [selectedThumbnailPlatform]: { ...prev[selectedThumbnailPlatform], mode: 'smart' }
                        }))}
                        className={`p-4 rounded-xl border flex flex-col items-center text-center cursor-pointer transition-all ${
                          thumbnailConfigs[selectedThumbnailPlatform]?.mode === 'smart'
                            ? "bg-amber-400/10 border-amber-400 text-amber-400 shadow-lg shadow-amber-400/5"
                            : "bg-[#121215] border-slate-800 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        <Sparkles className="h-5 w-5 mb-1.5 text-amber-400" />
                        <span className="text-xs font-mono font-black uppercase">Smart Frame Selector</span>
                        <span className="text-[10px] text-slate-400 mt-1 leading-tight">System-extracted high CTR frame</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setThumbnailConfigs(prev => ({
                          ...prev,
                          [selectedThumbnailPlatform]: { ...prev[selectedThumbnailPlatform], mode: 'upload' }
                        }))}
                        className={`p-4 rounded-xl border flex flex-col items-center text-center cursor-pointer transition-all ${
                          thumbnailConfigs[selectedThumbnailPlatform]?.mode === 'upload'
                            ? "bg-amber-400/10 border-amber-400 text-amber-400 shadow-lg shadow-amber-400/5"
                            : "bg-[#121215] border-slate-800 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        <UploadCloud className="h-5 w-5 mb-1.5 text-amber-400" />
                        <span className="text-xs font-mono font-black uppercase">Manual Custom Upload</span>
                        <span className="text-[10px] text-slate-400 mt-1 leading-tight">Upload custom image file</span>
                      </button>
                    </div>
                  </div>

                  {/* Mode Content area */}
                  {thumbnailConfigs[selectedThumbnailPlatform]?.mode === 'smart' ? (
                    <div className="space-y-4">
                      <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">
                        Select System-Extracted Smart Frame
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {smartFrames.map((frame) => {
                          const isSelected = thumbnailConfigs[selectedThumbnailPlatform]?.smartFrameId === frame.id;
                          return (
                            <button
                              key={frame.id}
                              type="button"
                              onClick={() => setThumbnailConfigs(prev => ({
                                ...prev,
                                [selectedThumbnailPlatform]: { ...prev[selectedThumbnailPlatform], smartFrameId: frame.id }
                              }))}
                              className={`relative rounded-xl overflow-hidden aspect-[9/16] border transition-all cursor-pointer group h-40 flex flex-col justify-end p-3.5 text-left ${
                                isSelected ? "border-amber-400 ring-2 ring-amber-400/30 scale-[1.02] shadow-xl shadow-amber-400/10" : "border-slate-800 hover:border-slate-600"
                              }`}
                              style={{ background: frame.bg, backgroundSize: 'cover', backgroundPosition: 'center' }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent transition-opacity group-hover:opacity-95" />
                              
                              <div className="relative z-10 space-y-1.5">
                                <div className="flex items-center justify-between">
                                  <span className="text-[9px] font-mono bg-amber-400 text-black px-1.5 py-0.5 rounded font-black uppercase">
                                    {frame.id.replace('frame-', 'Frame ')}
                                  </span>
                                  {isSelected && <Check className="h-3.5 w-3.5 text-amber-400 font-bold" />}
                                </div>
                                <p className="text-xs font-sans text-white font-bold leading-tight">
                                  {frame.name}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">
                        Upload Custom Cover File
                      </span>
                      
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          id={`live-file-upload-${selectedThumbnailPlatform}`}
                          style={{ display: 'none' }}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleRealUpload(selectedThumbnailPlatform, file);
                            }
                          }}
                        />
                        <div 
                          onClick={() => {
                            if (!thumbnailConfigs[selectedThumbnailPlatform]?.isUploading) {
                              document.getElementById(`live-file-upload-${selectedThumbnailPlatform}`)?.click();
                            }
                          }}
                          className="border-2 border-dashed border-amber-400/30 hover:border-amber-400 bg-[#121215] rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-3 group"
                        >
                          {thumbnailConfigs[selectedThumbnailPlatform]?.isUploading ? (
                            <div className="space-y-3 w-full max-w-[240px] py-3">
                              <Loader2 className="h-8 w-8 animate-spin text-amber-400 mx-auto" />
                              <span className="text-xs font-mono text-slate-300 block font-bold">Uploading Custom Frame...</span>
                              <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-amber-400 rounded-full transition-all duration-150" 
                                  style={{ width: `${thumbnailConfigs[selectedThumbnailPlatform]?.uploadProgress}%` }}
                                />
                              </div>
                            </div>
                          ) : thumbnailConfigs[selectedThumbnailPlatform]?.uploadedFile ? (
                            <div className="space-y-3 py-2">
                              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto">
                                <Check className="h-6 w-6 text-emerald-400" />
                              </div>
                              <div>
                                <span className="text-sm text-emerald-400 font-mono font-bold block">Upload Completed</span>
                                <p className="text-xs text-slate-300 truncate max-w-[280px] font-sans mt-1">
                                  {thumbnailConfigs[selectedThumbnailPlatform]?.uploadedFile}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setThumbnailConfigs(prev => ({
                                    ...prev,
                                    [selectedThumbnailPlatform]: { ...prev[selectedThumbnailPlatform], uploadedFile: null, uploadedFileUrl: null }
                                  }));
                                }}
                                className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-red-400 hover:text-red-300 font-mono text-[10px] uppercase tracking-wider border border-white/10"
                              >
                                Remove and re-upload
                              </button>
                            </div>
                          ) : (
                            <div className="py-3">
                              <UploadCloud className="h-10 w-10 text-slate-400 group-hover:text-amber-400 transition-colors mx-auto mb-3" />
                              <div className="space-y-1.5">
                                <span className="text-sm text-slate-100 font-bold block group-hover:text-amber-400 transition-colors">
                                  Drag & drop or Click to upload custom cover
                                </span>
                                <span className="text-xs text-slate-500 block leading-normal">
                                  Support JPEG/PNG files up to 5MB. Aspect ratio must be 9:16 vertical.
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Dynamic Native Cover Mockup */}
                  <div className="p-5 rounded-2xl bg-[#09090c] border border-white/[0.06] space-y-4">
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">
                      Live Cover Mockup Representation
                    </span>
                    
                    <div className="flex gap-5 items-center">
                      {/* Miniature feed cover card */}
                      <div 
                        className="w-[110px] aspect-[9/16] rounded-xl relative overflow-hidden border border-white/10 shadow-2xl shrink-0 flex flex-col justify-end p-3"
                        style={{ 
                          backgroundImage: thumbnailConfigs[selectedThumbnailPlatform]?.mode === 'upload' && thumbnailConfigs[selectedThumbnailPlatform]?.uploadedFileUrl
                            ? `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.75)), url(${thumbnailConfigs[selectedThumbnailPlatform]?.uploadedFileUrl})`
                            : thumbnailConfigs[selectedThumbnailPlatform]?.mode === 'upload' && thumbnailConfigs[selectedThumbnailPlatform]?.uploadedFile
                            ? `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.75)), url("https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=350&q=80")`
                            : smartFrames.find(f => f.id === thumbnailConfigs[selectedThumbnailPlatform]?.smartFrameId)?.bg || `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.75))`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                        
                        {/* Simulated network watermark overlays */}
                        {selectedThumbnailPlatform === 'tiktok' && (
                          <>
                            <div className="absolute top-2 left-2 text-[8px] font-sans font-bold text-white flex items-center gap-1 bg-black/45 px-1.5 py-0.5 rounded-sm">
                              <span>TikTok Grid</span>
                            </div>
                            <div className="relative z-10 text-white space-y-1">
                              <p className="text-[10px] font-sans font-black truncate">@user_growth</p>
                              <p className="text-[9px] font-sans text-slate-300 leading-none truncate">{script?.title}</p>
                            </div>
                          </>
                        )}
                        
                        {selectedThumbnailPlatform === 'youtube_shorts' && (
                          <>
                            <div className="absolute top-2 left-2 text-[8px] font-mono font-bold bg-red-600 text-white px-1.5 py-0.5 rounded-sm">
                              SHORTS
                            </div>
                            <div className="relative z-10 text-white space-y-1">
                              <p className="text-[10px] font-sans font-black truncate">{script?.title}</p>
                              <p className="text-[9px] font-sans text-slate-300 leading-none">1.2M views</p>
                            </div>
                          </>
                        )}

                        {selectedThumbnailPlatform === 'instagram_reels' && (
                          <>
                            <div className="absolute top-2 right-2">
                              <Instagram className="h-4.5 w-4.5 text-white/90 drop-shadow" />
                            </div>
                            <div className="relative z-10 text-white space-y-1">
                              <p className="text-[10px] font-sans font-black truncate">Instagram Cover</p>
                              <p className="text-[9px] font-sans text-slate-300 leading-none truncate">{script?.title}</p>
                            </div>
                          </>
                        )}

                        {selectedThumbnailPlatform === 'facebook_reels' && (
                          <>
                            <div className="absolute top-2 left-2 bg-blue-600 text-white px-1.5 py-0.5 rounded-sm text-[8px] font-sans font-bold uppercase">
                              Reels
                            </div>
                            <div className="relative z-10 text-white space-y-1">
                              <p className="text-[10px] font-sans font-black truncate">{script?.title}</p>
                            </div>
                          </>
                        )}

                        {/* Generic short covers */}
                        {!['tiktok', 'youtube_shorts', 'instagram_reels', 'facebook_reels'].includes(selectedThumbnailPlatform) && (
                          <>
                            <div className="absolute top-2 left-2 text-[8px] font-mono bg-white/20 text-white px-1.5 rounded-sm uppercase">
                              {selectedThumbnailPlatform.split('_').join(' ')}
                            </div>
                            <div className="relative z-10 text-white space-y-1">
                              <p className="text-[10px] font-sans font-black truncate">{script?.title}</p>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Meta/CTR stats of that platform cover */}
                      <div className="flex-1 space-y-3.5 text-left pt-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
                            HIGH-CTR COVER REPORT
                          </span>
                          <Flame className="h-4 w-4 text-amber-500 animate-pulse" />
                        </div>
                        
                        <div className="space-y-2 text-xs font-sans text-slate-300 leading-normal">
                          <div className="flex justify-between border-b border-white/[0.05] pb-1.5">
                            <span>Image Format:</span>
                            <span className="text-slate-100 font-bold font-mono text-[10px]">9:16 VERTICAL HD</span>
                          </div>
                          <div className="flex justify-between border-b border-white/[0.05] pb-1.5">
                            <span>Platform Sync:</span>
                            <span className="text-emerald-400 font-bold font-mono text-[10px]">READY FOR QUEUE</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Auto-Overlay Check:</span>
                            <span className="text-emerald-400 font-bold font-mono text-[10px]">COMPLIANT</span>
                          </div>
                        </div>

                        <div className="pt-1.5">
                          <div className="p-3.5 rounded-xl bg-amber-400/5 border border-amber-400/10 text-[11px] text-amber-300 leading-normal font-sans">
                            "The thumbnail will publish automatically on next queue cycle."
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              )
            ) : null}
          </div>

          {/* Right Panel of Canvas: Real-time Video Player synced with script */}
          <div className="xl:col-span-5 flex flex-col items-center bg-black/20 border border-white/[0.03] rounded-2xl p-4 relative justify-between min-h-[580px]">
            
            {/* STAGE 3 PIPELINE COMPILER SCREEN */}
            {isOrchestrating ? (
              <div className="w-[280px] h-[480px] bg-[#050507] border-2 rounded-[32px] flex flex-col justify-center items-center p-6 text-center relative overflow-hidden shadow-2xl" style={{ borderColor: `${getPrimaryColor()}40` }}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.01)_0,transparent_100%)]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-[60px] animate-pulse" style={{ backgroundColor: `${getPrimaryColor()}10` }} />
                
                <div className="relative z-10 flex flex-col items-center justify-center gap-5">
                  <div className="w-16 h-16 rounded-full border flex items-center justify-center relative" style={{ borderColor: `${getPrimaryColor()}30` }}>
                    <Loader2 className="h-6 w-6 animate-spin text-white" />
                    <Sparkles className="h-4 w-4 absolute -top-1 -right-1 animate-pulse" style={{ color: getPrimaryColor() }} />
                  </div>
                  <div className="space-y-2 text-center">
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase" style={{ color: getPrimaryColor() }}>
                      Compiling Media DNA
                    </span>
                    <p className="text-[10px] text-slate-400 font-sans leading-relaxed max-w-[190px] mx-auto min-h-[32px]">
                      {compilationStep}
                    </p>
                    <div className="h-1 w-24 bg-slate-900 rounded-full mx-auto overflow-hidden mt-2">
                      <div className="h-full rounded-full animate-[shimmer_1.5s_infinite]" style={{ backgroundColor: getPrimaryColor(), width: "65%" }} />
                    </div>
                  </div>
                </div>
              </div>
            ) : script ? (
              /* Synchronized Phone Video player */
              <div className="flex flex-col items-center space-y-4 w-full">
                {/* Phone Frame */}
                <div className="relative w-[280px] h-[480px] bg-[#0A0A0C] rounded-[32px] border-4 border-slate-850 shadow-2xl overflow-hidden group select-none">
                  {/* Phone notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-3 bg-slate-850 rounded-b-lg z-30" />

                  {/* HTML Audio for ElevenLabs voice narration */}
                  {orchestratedMedia?.audio?.voiceOverUrl && (
                    <audio 
                      ref={voiceOverRef} 
                      src={orchestratedMedia.audio.voiceOverUrl} 
                      preload="auto"
                    />
                  )}

                  {/* HTML Video dynamically rendered / loaded */}
                  {orchestratedMedia?.video?.renderedVideoUrl ? (
                    <video
                      ref={videoRef}
                      src={orchestratedMedia.video.renderedVideoUrl}
                      className="absolute inset-0 w-full h-full object-cover z-0"
                      loop
                      playsInline
                      preload="auto"
                    />
                  ) : (
                    /* Dynamic static visual fallback */
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-black flex flex-col justify-center items-center p-6 text-center overflow-hidden">
                      <div className="absolute w-48 h-48 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: `${getPrimaryColor()}15` }} />
                      <div className="relative z-10 space-y-4">
                        <span className="inline-block text-[9px] font-mono font-black tracking-widest px-2.5 py-1 rounded-full uppercase border" style={{ backgroundColor: `${getPrimaryColor()}20`, color: getAccentColor(), borderColor: `${getPrimaryColor()}40` }}>
                          FALLBACK_CANVAS_{activeSection.toUpperCase()}
                        </span>
                        <h3 className="text-xs font-black font-sans text-white tracking-tight leading-snug uppercase max-w-[200px] mx-auto">
                          "{script.title}"
                        </h3>
                        <p className="text-[10px] text-slate-400 font-mono italic max-w-[190px] mx-auto leading-relaxed">
                          "{script[activeSection]?.visual}"
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Dark overlay to ensure subtitles remain ultra-legible */}
                  <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none z-10" />

                  {/* Captions Overlay (Dynamic caption profile styling applied!) */}
                  <div className="absolute bottom-14 left-3 right-11 z-20 pointer-events-none text-center">
                    <div className="px-2.5 py-1.5 rounded-md text-center max-w-[210px] mx-auto">
                      <p 
                        className="font-sans leading-snug tracking-wide inline-block drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)] animate-pulse"
                        style={{
                          color: orchestratedMedia?.assetBundle?.caption?.fontColor || "#FFFFFF",
                          fontFamily: orchestratedMedia?.assetBundle?.caption?.fontName === "Impact" ? "Impact" : '"Almoni Tzair", "Almoni DL", "Almoni", "Heebo", "Rubik", "Assistant", "Inter", sans-serif',
                          fontWeight: "900",
                          textTransform: orchestratedMedia?.assetBundle?.caption?.uppercase ? "uppercase" : "none",
                          fontSize: "12px",
                        }}
                      >
                        "{getActiveAudioText()}"
                      </p>
                    </div>
                  </div>

                  {/* Simulated background music indicator */}
                  <div className="absolute top-5 left-3 z-20 flex items-center space-x-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[8px] font-mono text-slate-300 border border-white/5">
                    <Music className="h-2.5 w-2.5 animate-spin" style={{ color: getPrimaryColor() }} />
                    <span className="truncate max-w-[80px]">{orchestratedMedia?.audio?.bgMusicName || "Dynamic Track"}</span>
                  </div>

                  {/* Short form interactive side bar buttons */}
                  <div className="absolute right-2 bottom-16 z-20 flex flex-col items-center space-y-3.5">
                    <div className="w-7 h-7 rounded-full border flex items-center justify-center text-[9px] font-black text-black" style={{ borderColor: `${getPrimaryColor()}60`, background: `linear-gradient(135deg, ${getPrimaryColor()}, ${getAccentColor()})` }}>
                      VF
                    </div>

                    <button 
                      onClick={toggleLike}
                      className="flex flex-col items-center space-y-0.5 bg-transparent border-none cursor-pointer focus:outline-none"
                    >
                      <div className={`p-1 rounded-full ${isLiked ? "text-red-500" : "text-white"} hover:bg-white/10 transition-all`}>
                        <Heart className={`h-4.5 w-4.5 ${isLiked ? "fill-current" : ""}`} />
                      </div>
                      <span className="text-[8px] font-mono text-slate-300 font-bold">
                        {(likeCount / 1000).toFixed(1)}k
                      </span>
                    </button>

                    <button 
                      onClick={() => setCommentCount((prev) => prev + 1)}
                      className="flex flex-col items-center space-y-0.5 bg-transparent border-none cursor-pointer focus:outline-none"
                    >
                      <div className="p-1 rounded-full text-white hover:bg-white/10 transition-all">
                        <MessageCircle className="h-4.5 w-4.5" />
                      </div>
                      <span className="text-[8px] font-mono text-slate-300 font-bold">{commentCount}</span>
                    </button>

                    <button 
                      onClick={handleShare}
                      className="flex flex-col items-center space-y-0.5 bg-transparent border-none cursor-pointer focus:outline-none"
                    >
                      <div className="p-1 rounded-full text-white hover:bg-white/10 transition-all">
                        {copiedLink ? <Check className="h-4.5 w-4.5 text-emerald-400" /> : <Share2 className="h-4.5 w-4.5" />}
                      </div>
                      <span className="text-[8px] font-mono text-slate-300 font-bold">
                        {copiedLink ? "COPIED" : "SHARE"}
                      </span>
                    </button>
                  </div>

                  {/* Video Timeline controls overlay bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-11 bg-black/80 border-t border-slate-900/40 px-3 flex items-center justify-between z-20">
                    <button 
                      onClick={togglePlay}
                      className="p-1 rounded-full bg-white/5 hover:bg-white/10 border-none cursor-pointer focus:outline-none transition-all"
                      style={{ color: getPrimaryColor() }}
                    >
                      {isPlaying ? <Pause className="h-3 w-3 fill-current" /> : <Play className="h-3 w-3 fill-current" />}
                    </button>

                    <div className="flex-1 mx-2.5 h-1 bg-slate-800 rounded-full relative overflow-hidden">
                      <div 
                        className="absolute top-0 bottom-0 left-0 rounded-full transition-all duration-300" 
                        style={{ width: `${(currentTime / 60) * 100}%`, backgroundColor: getPrimaryColor() }}
                      />
                    </div>

                    <button 
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-1 rounded-full text-slate-400 hover:text-white bg-transparent border-none cursor-pointer focus:outline-none transition-all"
                    >
                      {isMuted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                    </button>
                  </div>
                </div>

                {/* Section Quick Jump Timeline */}
                <div className="w-full max-w-[280px] p-2.5 bg-slate-950/40 border border-white/[0.03] rounded-xl">
                  <div className="grid grid-cols-4 gap-1">
                    {[
                      { id: "hook", label: "Hook" },
                      { id: "body", label: "Body" },
                      { id: "twist", label: "Twist" },
                      { id: "cta", label: "CTA" },
                    ].map((btn) => (
                      <button
                        key={btn.id}
                        onClick={() => handleJumpToSection(btn.id as any)}
                        className={`py-1 text-[9px] font-mono font-bold uppercase rounded border transition-colors cursor-pointer ${
                          activeSection === btn.id 
                            ? "bg-white/5 border-white/20 text-white" 
                            : "bg-[#121215] border-slate-850 text-slate-500 hover:text-white"
                        }`}
                        style={{
                          borderColor: activeSection === btn.id ? getPrimaryColor() : "rgba(255,255,255,0.03)",
                          color: activeSection === btn.id ? getPrimaryColor() : ""
                        }}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* STAGE 3 MIDDLEWARE DNA PROFILE VIEW */}
                {orchestratedMedia?.assetBundle && (
                  <div className="w-full max-w-[280px] p-3 bg-white/[0.01] border border-white/[0.04] rounded-xl text-left font-mono text-[9px] space-y-2 mt-1">
                    <div className="flex items-center gap-1.5 border-b border-white/[0.04] pb-1.5 text-white font-bold uppercase tracking-wider">
                      <Cpu className="h-3.5 w-3.5 text-slate-400" style={{ color: getPrimaryColor() }} />
                      <span>{orchestratedMedia.nicheName} Asset DNA</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-slate-400">
                      <div>
                        <span className="text-[8px] text-slate-550 block uppercase">ElevenLabs Voice</span>
                        <div className="flex items-center gap-1 text-slate-200 mt-0.5 font-bold truncate">
                          <Mic className="h-2.5 w-2.5" style={{ color: getPrimaryColor() }} />
                          <span className="truncate">{orchestratedMedia.assetBundle.audio.voiceName.split("(")[0]}</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-[8px] text-slate-550 block uppercase">Rendering Engine</span>
                        <div className="flex items-center gap-1 text-slate-200 mt-0.5 font-bold">
                          <Tv className="h-2.5 w-2.5" style={{ color: getPrimaryColor() }} />
                          <span>{orchestratedMedia.video.apiUsed}</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-[8px] text-slate-550 block uppercase">Captions Style</span>
                        <div className="flex items-center gap-1 text-slate-200 mt-0.5 font-bold truncate">
                          <FontIcon className="h-2.5 w-2.5" style={{ color: getPrimaryColor() }} />
                          <span className="truncate">{orchestratedMedia.assetBundle.caption.fontName}</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-[8px] text-slate-550 block uppercase">Transition Mode</span>
                        <div className="flex items-center gap-1 text-slate-200 mt-0.5 font-bold">
                          <RotateCw className="h-2.5 w-2.5" style={{ color: getPrimaryColor() }} />
                          <span className="capitalize">{orchestratedMedia.assetBundle.visual.transitionType.replace("_", " ")}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-1.5 border-t border-white/[0.04]">
                      <span className="text-[7px] text-slate-550 block uppercase">Pexels Stock footage Style</span>
                      <p className="text-[8px] text-slate-300 italic mt-0.5 leading-normal">
                        "{orchestratedMedia.assetBundle.visual.stockFootageStyle}"
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col justify-between space-y-6">
      {/* Upper header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-sans font-bold text-slate-200 flex items-center gap-2">
          <Smartphone className="h-4 w-4 text-slate-400" />
          <span>Studio Preview</span>
        </h3>
      </div>

      {/* Main smartphone visualizer block */}
      <div className="flex-1 flex items-center justify-center py-2">
        <div className="w-[300px] h-[533px] bg-[#050507] border border-white/[0.03] rounded-[36px] flex flex-col justify-center items-center p-6 text-center relative overflow-hidden group shadow-2xl transition-all duration-500 hover:border-white/10">
          {/* Background glowing grid lines */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.01)_0,transparent_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0d0d11_1px,transparent_1px),linear-gradient(to_bottom,#0d0d11_1px,transparent_1px)] bg-[size:16px_16px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-white/[0.01] blur-[80px] animate-pulse" />

          {/* Phone notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-4 bg-slate-850 rounded-b-xl z-20" />

          <div className="relative z-10 flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-600 transition-all group-hover:text-slate-400 group-hover:border-white/20">
              <Smartphone className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-mono tracking-widest text-slate-600 uppercase group-hover:text-slate-400 transition-colors">
              Studio Preview
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
