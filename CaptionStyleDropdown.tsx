import { useState, useEffect } from "react";
import { S3MusicLibraryModal } from "../../S3MusicLibraryModal";
import { MUSIC_GENRES_LIST } from "../../../lib/videoEngine";
import { MusicGenreDropdown } from "../../MusicGenreDropdown";
import { VoiceTalentDropdown } from "../../VoiceTalentDropdown";
import { CaptionStyleDropdown } from "../../CaptionStyleDropdown";
import { auth } from "../../../lib/firebase";
import { calculateRequiredCredits, formatCreditText } from "../../../lib/credits";
import { 
  ArrowLeft,
  Settings,
  Tv,
  Sparkles,
  CloudLightning,
  RefreshCw,
  TrendingUp,
  Award,
  Video,
  Clock,
  Youtube,
  Chrome,
  Instagram,
  CheckCircle2,
  AlertCircle,
  Play,
  Download,
  Share2,
  Mic,
  MessageSquare,
  Coins,
  Heart,
  Smartphone,
  Facebook,
  Flame,
  UploadCloud,
  Check,
  Loader2,
  Film
} from "lucide-react";
import {
  SolidCoins,
  SolidDumbbell,
  SolidCpu,
  SolidFlame,
  SolidBriefcase,
  SolidCompass,
  SolidBrain,
  SolidTelescope,
  SolidFilm,
  SolidScroll,
  SolidRings,
  SolidSkull,
  SolidDetective,
  SolidCrown,
  SolidGraduationCap,
  SolidBiohazard,
  SolidGamepad,
  SolidRobot,
  getNicheIcon
} from "../../NicheIcons";
import { NicheMatrix } from "../../../data/nicheMatrix";

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '13px', height: '13px', color: '#ffffff', flexShrink: 0 }}>
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.388.507 9.388.507s7.517 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '13px', height: '13px', color: '#ffffff', flexShrink: 0 }}>
    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.92-1.31 1.83-3.58 2.81-5.8 2.72-2.18-.04-4.3-1.16-5.4-3.05-1.15-1.92-1.15-4.48-.02-6.41C5.2 11.24 7.07 9.94 9.25 9.75c.02 1.33.01 2.66.01 3.98-1.22.12-2.43.87-2.91 2.01-.48 1.09-.27 2.45.54 3.32.74.83 1.91 1.22 3 1.05 1.17-.13 2.19-.94 2.54-2.07.13-.38.16-.79.16-1.19-.02-5.59-.01-11.18-.01-16.77-.02-.02-.04-.04-.05-.06z"/>
  </svg>
);

const InstagramIconComponent = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '13px', height: '13px', color: '#ffffff', flexShrink: 0 }}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const FacebookIconComponent = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '13px', height: '13px', color: '#ffffff', flexShrink: 0 }}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const PinterestIconComponent = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '13px', height: '13px', color: '#ffffff', flexShrink: 0 }}>
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.204 0 1.031.397 2.138.893 2.738.1.12.115.226.085.345-.094.393-.305 1.243-.347 1.417-.055.225-.183.272-.421.161-1.572-.731-2.553-3.027-2.553-4.87 0-3.966 2.883-7.611 8.309-7.611 4.364 0 7.757 3.11 7.757 7.268 0 4.336-2.731 7.824-6.525 7.824-1.275 0-2.474-.662-2.885-1.446l-.784 2.992c-.285 1.085-1.057 2.446-1.572 3.284 1.125.348 2.316.536 3.537.536 6.62 0 12-5.367 12-11.987C24 5.367 18.636 0 12.017 0z"/>
  </svg>
);

const XIconComponent = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '13px', height: '13px', color: '#ffffff', flexShrink: 0 }}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedInIconComponent = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '13px', height: '13px', color: '#ffffff', flexShrink: 0 }}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const SnapchatIconComponent = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '13px', height: '13px', color: '#ffffff', flexShrink: 0 }}>
    <path d="M11.996 2.004c-3.14 0-5.69 2.55-5.69 5.69 0 .285.023.565.065.838a1.597 1.597 0 0 0-.585 1.258c0 .723.492 1.346 1.18 1.528.14.733.456 1.4.92 1.954-1.59.566-2.62 2.053-2.31 3.738a1.134 1.134 0 0 0 1.127.93h.273c.473.666 1.168 1.144 1.986 1.32-.423.864-.171 1.921.606 2.482a4.428 4.428 0 0 0 4.636 0c.777-.56 1.029-1.618.606-2.482.818-.176 1.513-.654 1.986-1.32h.273a1.134 1.134 0 0 0 1.127-.93c.31-1.685-.72-3.172-2.31-3.738.464-.554.78-1.221.92-1.954.688-.182 1.18-.805 1.18-1.528 0-.568-.31-.1-.585-1.258a5.556 5.556 0 0 0 .065-.838c0-3.14-2.55-5.69-5.69-5.69z"/>
  </svg>
);

interface MagicModeProps {
  onBack?: () => void;
  onSuccess?: (scriptData: any) => void;
  modeType?: string;
  isLoggedIn?: boolean;
  onNavigatePricing?: () => void;
  activeUser?: any;
}

type MagicStep = 'niche' | 'subniche' | 'settings' | 'preview' | 'distribute';

export default function MagicMode({ onBack, onSuccess, modeType, isLoggedIn, onNavigatePricing, activeUser }: MagicModeProps) {
  // Check if current user is admin noamazar84@gmail.com or in preview environment
  const isPreviewEnvironment = 
    Boolean((import.meta as any).env?.DEV) || 
    process.env.NODE_ENV !== "production" ||
    (typeof window !== "undefined" && (
      window.location.hostname.includes("ais-dev") || 
      window.location.hostname.includes("ais-pre") || 
      window.location.hostname.includes("localhost") || 
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname.endsWith(".run.app")
    ));

  const currentUserEmail = (
    activeUser?.email || 
    auth.currentUser?.email || 
    localStorage.getItem("userEmail") || 
    localStorage.getItem("controlvid_user_email") || 
    localStorage.getItem("viralflow_user_email") || 
    ""
  ).trim().toLowerCase();

  const isAdmin = isPreviewEnvironment || (currentUserEmail === "noamazar84@gmail.com");

  // State machine
  const [step, setStep] = useState<MagicStep>('niche');
  const [selectedNiche, setSelectedNiche] = useState<string>('');
  const [selectedSubNiche, setSelectedSubNiche] = useState<string>('');
  
  // Custom input states
  const [customNiche, setCustomNiche] = useState("");
  const [customSubNiche, setCustomSubNiche] = useState("");

  // Settings states
  const [videoLength, setVideoLength] = useState<number>(30); // 15, 30, 45, 60
  const [videoQuantity, setVideoQuantity] = useState<number>(3); // 1 to 10
  const [voiceModel, setVoiceModel] = useState<string>('Adam (Authoritative Executive)'); // Voice options
  const [musicTheme, setMusicTheme] = useState<string>('Cinematic Beats');
  const [isMusicModalOpen, setIsMusicModalOpen] = useState<boolean>(false);
  const [captionStyle, setCaptionStyle] = useState<string>(() => sessionStorage.getItem("wizard_selected_caption_style") || 'ControlVid Blue (Default)');

  // Preview & script generation
  const [generatedScripts, setGeneratedScripts] = useState<any[]>([]);
  const [activeScriptIdx, setActiveScriptIdx] = useState<number>(0);
  const [activeSubTab, setActiveSubTab] = useState<'script' | 'seo' | 'thumbnail'>('script');
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
  const [credits, setCredits] = useState<number>(85);
  const [isRegenerating, setIsRegenerating] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  // Initialize correct duration for long-form mode
  useEffect(() => {
    if (modeType === "long_form") {
      setVideoLength(120);
    } else {
      setVideoLength(30);
    }
  }, [modeType]);

  // Distribution step
  const [distributeStatus, setDistributeStatus] = useState<string>('idle'); // idle, distributing, completed
  const [distributeProgress, setDistributeProgress] = useState<number>(0);
  const [distributeLogs, setDistributeLogs] = useState<string[]>([]);

  const isSpecialEngine = modeType && ["fake_text", "story_pov", "split_screen"].includes(modeType);

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

  const specialNicheMatrix: Record<string, string[]> = {
    "Relationships": [
      "Cheating partner gets exposed", "Toxic ex returns", "Secret admirer", "Long-distance relationship drama", "Love triangle", "Gold digger stories", "Fake pregnancy prank", "Marriage proposal gone wrong", "Jealous best friend", "Breakup revenge"
    ],
    "Horror": [
      "Haunted hotel", "Unknown phone number", "Stalker stories", "Paranormal encounters", "Creepy neighbors", "Dark web messages", "Midnight challenges", "Haunted dolls", "Sleep paralysis", "Urban legends"
    ],
    "Crime & Mystery": [
      "Missing person cases", "Bank robberies", "Serial killer stories", "Detective investigations", "Prison escape stories", "Identity theft", "Famous unsolved mysteries", "Kidnapping survivor", "FBI interrogations", "Scammer revenge"
    ],
    "Wealth & Luxury": [
      "Billionaire tests strangers", "Hidden millionaire", "Lottery winner stories", "Rich vs poor", "CEO undercover", "Luxury lifestyle", "Old money families", "Inheritance drama", "Private jet lifestyle", "Supercar collections"
    ],
    "School & College": [
      "Mean teacher", "Strict principal", "School bully revenge", "Exam cheating", "Prom drama", "College roommate stories", "Secret crush", "School prank wars", "Teacher favoritism", "Graduation stories"
    ],
    "Workplace": [
      "Toxic boss", "Office romance", "Getting fired", "Employee revenge", "Crazy customers", "Startup founder life", "Job interview fails", "Coworker betrayal", "Promotion drama", "Work-from-home disasters"
    ],
    "Survival & Apocalypse": [
      "Zombie outbreak", "Nuclear war", "Alien invasion", "Last person alive", "Survival island", "AI takes over", "Global blackout", "Pandemic survival", "World ends tomorrow", "Bunker life"
    ],
    "Gaming": [
      "GTA roleplay", "Minecraft survival", "Fortnite moments", "Roblox stories", "Horror game POV", "Speedrun fails", "Mobile gaming", "Streamer drama", "Gaming challenges", "Esports stories"
    ],
    "Psychology & Mind Games": [
      "Dark psychology", "Manipulation tactics", "Narcissist behavior", "Human behavior facts", "Body language secrets", "High IQ puzzles", "Social experiments", "Reverse psychology", "Lie detection", "Emotional intelligence"
    ],
    "AI & Technology": [
      "AI becomes sentient", "Chatbot conversations", "Time-travel app", "Hacker stories", "Smart home gone wrong", "Deepfake drama", "Future technology", "Secret government AI", "Robot friendships", "Virtual reality gone wrong"
    ]
  };

  const specialNiches = [
    { id: "relationships", name: "Relationships", emoji: "❤️" },
    { id: "horror", name: "Horror", emoji: "👻" },
    { id: "crime_mystery", name: "Crime & Mystery", emoji: "🔍" },
    { id: "wealth_luxury", name: "Wealth & Luxury", emoji: "💎" },
    { id: "school_college", name: "School & College", emoji: "🎓" },
    { id: "workplace", name: "Workplace", emoji: "💼" },
    { id: "survival_apocalypse", name: "Survival & Apocalypse", emoji: "☢️" },
    { id: "gaming", name: "Gaming", emoji: "🎮" },
    { id: "psychology_mind", name: "Psychology & Mind Games", emoji: "𝚿🧠" },
    { id: "ai_tech", name: "AI & Technology", emoji: "🤖" }
  ];

  const standardNiches = [
    { id: "finance_wealth", name: "FINANCE & WEALTH", emoji: "💰" },
    { id: "fitness_diet", name: "FITNESS & DIET", emoji: "💪" },
    { id: "tech_ai", name: "TECH & FUTURE AI", emoji: "🤖" },
    { id: "motivation_mindset", name: "MOTIVATION & MINDSET", emoji: "🔥" },
    { id: "business_startups", name: "BUSINESS & STARTUPS", emoji: "💼" },
    { id: "travel_exploration", name: "TRAVEL & EXPLORATION", emoji: "✈️" },
    { id: "human_psychology", name: "HUMAN PSYCHOLOGY", emoji: "🧠" },
    { id: "science_space", name: "SCIENCE & SPACE", emoji: "🚀" },
    { id: "pop_culture", name: "POP CULTURE & MEDIA", emoji: "🎬" },
    { id: "untold_history", name: "UNTOLD HISTORY", emoji: "📜" }
  ];

  const niches = isSpecialEngine ? specialNiches : standardNiches;
  const currentMatrix = isSpecialEngine ? specialNicheMatrix : NicheMatrix;

  // Handler for custom Niche
  const handleApplyCustomNiche = () => {
    if (customNiche.trim()) {
      const nicheUpper = customNiche.trim().toUpperCase();
      setSelectedNiche(nicheUpper);
      setStep('subniche');
    }
  };

  // Handler for custom Sub-Niche
  const handleApplyCustomSubNiche = () => {
    if (customSubNiche.trim()) {
      setSelectedSubNiche(customSubNiche.trim());
      generateInitialScripts(customSubNiche.trim());
      setStep('settings');
    }
  };

  const handleNicheSelect = (nicheName: string) => {
    setSelectedNiche(nicheName);
    setStep('subniche');
  };

  const handleSubNicheSelect = (subNicheName: string) => {
    setSelectedSubNiche(subNicheName);
    generateInitialScripts(subNicheName);
    setStep('settings');
  };

  // Generate ultra high fidelity realistic short-form video scripts
  const generateInitialScripts = (subNiche: string) => {
    const hookTemplates = [
      `The absolute biggest lie you've been told about ${subNiche} is this.`,
      `If you are still doing this in ${subNiche}, you are losing instantly.`,
      `Here is a secret hack about ${subNiche} that feels illegal to know.`,
      `Most people fail at ${subNiche} because they ignore this one simple rule.`,
      `Stop scrolling if you want to master ${subNiche} in under 30 seconds.`
    ];

    const bodyTemplates = [
      `Instead of following the crowd, you need to shift your focus to what actually works. Here is step one: automate the mundane. Step two: build a high-leverage feedback loop. Step three: double down on consistency before optimizing.`,
      `Here is the blueprint. First, analyze the baseline variables. Second, isolate the bottleneck holding you back. Third, apply a daily compound routine. When you combine these three, results accelerate by 10x almost overnight.`,
      `It boils down to a fundamental cognitive shift. Quit trying to master everything. Isolate the 20% of effort that generates 80% of the return. Implement a clean tracking system, iterate every 48 hours, and let time work for you.`,
    ];

    const ctaTemplates = [
      `Comment "${subNiche.split(' ')[0].toUpperCase()}" and I'll send you my personal automated checklist.`,
      `Hit follow for daily high-signal breakdowns just like this.`,
      `Save this video right now so you don't lose this blueprint forever.`
    ];

    const list = Array.from({ length: videoQuantity }).map((_, i) => {
      const hook = hookTemplates[i % hookTemplates.length];
      const body = bodyTemplates[i % bodyTemplates.length];
      const cta = ctaTemplates[i % ctaTemplates.length];
      return {
        id: i + 1,
        title: `${subNiche} - Hook Concept #${i + 1}`,
        hook,
        body,
        cta,
        viralScore: Math.floor(Math.random() * 15) + 84, // 84% to 98%
        duration: videoLength
      };
    });

    setGeneratedScripts(list);
    setActiveScriptIdx(0);
  };

  const regenerationCredits = modeType === "long_form" ? Math.ceil(videoLength / 60) : 1;

  // Regeneration simulation
  const handleRegenerate = () => {
    if (credits < regenerationCredits) return;
    setIsRegenerating(true);
    setCredits(prev => Math.max(0, prev - regenerationCredits));
    setTimeout(() => {
      generateInitialScripts(selectedSubNiche);
      setIsRegenerating(false);
    }, 800);
  };

  // Run the full simulation of distribution
  const startDistribution = () => {
    setStep('distribute');
    setDistributeStatus('distributing');
    setDistributeProgress(0);
    setDistributeLogs([]);

    const logItems = [
      "Initializing AI Video compiler...",
      "Rendering dynamic short-form canvas...",
      "Injecting realistic Voiceover track...",
      "Aligning active auto-subtitles...",
      "Syncing background cinematic tracks...",
      "Uploading video sequence to YouTube Shorts...",
      "Syndicating upload stream to TikTok...",
      "Publishing to Instagram Reels...",
      "Deploying to YouTube main workspace..."
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < logItems.length) {
        setDistributeLogs(prev => [...prev, logItems[currentLogIndex]]);
        setDistributeProgress(Math.floor(((currentLogIndex + 1) / logItems.length) * 100));
        currentLogIndex++;
      } else {
        clearInterval(interval);
        setDistributeStatus('completed');
        // Instantly transition to final preview screen
        setStep('preview');
        // Instantly trigger success payload
        if (onSuccess) {
          onSuccess({
            title: selectedSubNiche,
            topic: selectedSubNiche,
            scriptsCount: generatedScripts.length,
            duration: videoLength,
            scripts: generatedScripts
          });
        }
      }
    }, 600);
  };

  // Synchronize music theme to session storage
  useEffect(() => {
    sessionStorage.setItem("wizard_selected_music_theme", musicTheme);
  }, [musicTheme]);

  // Synchronize caption style to session storage
  useEffect(() => {
    sessionStorage.setItem("wizard_selected_caption_style", captionStyle);
  }, [captionStyle]);

  // Synchronize niche to session storage
  useEffect(() => {
    if (selectedNiche) {
      let nicheId = "finance";
      const norm = selectedNiche.toLowerCase();
      if (norm.includes("finance") || norm.includes("wealth")) nicheId = "finance";
      else if (norm.includes("fitness") || norm.includes("diet")) nicheId = "fitness";
      else if (norm.includes("tech") || norm.includes("ai")) nicheId = "tech";
      else if (norm.includes("motivation") || norm.includes("mindset")) nicheId = "motivation";
      else if (norm.includes("business") || norm.includes("startup")) nicheId = "business";
      else if (norm.includes("travel") || norm.includes("exploration")) nicheId = "travel";
      else if (norm.includes("psychology") || norm.includes("human")) nicheId = "psychology";
      else if (norm.includes("science") || norm.includes("space")) nicheId = "science";
      else if (norm.includes("culture") || norm.includes("media") || norm.includes("pop")) nicheId = "culture";
      else if (norm.includes("history") || norm.includes("ancient") || norm.includes("untold")) nicheId = "history";
      else nicheId = norm.replace(/\s+/g, "_"); // fallback to custom niche name!

      sessionStorage.setItem("wizard_selected_niche_id", nicheId);
    }
  }, [selectedNiche]);

  // Auto-regeneration when settings update
  useEffect(() => {
    if (selectedSubNiche) {
      generateInitialScripts(selectedSubNiche);
    }
  }, [videoLength, videoQuantity]);

  // Back navigation handler
  const handleBackStep = () => {
    if (step === 'subniche') setStep('niche');
    else if (step === 'settings') setStep('subniche');
    else if (step === 'preview') setStep('settings');
  };

  return (
    <div style={{ 
      height: 'auto', 
      width: '100%', 
      background: 'transparent', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'flex-start', 
      justifyContent: 'flex-start', 
      padding: '0px',
      fontFamily: '"Inter", sans-serif',
      boxSizing: 'border-box',
      overflow: 'visible',
      color: '#fff'
    }}>
      
      {/* Title + Navigation bar */}
      <div className="magic-title-bar" style={{ 
        width: '635px',
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '15px'
      }}>
        <div style={{ 
          fontSize: '13px', 
          fontWeight: 900, 
          color: '#fff', 
          letterSpacing: '0.12em', 
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Sparkles size={14} style={{ color: '#38bdf8' }} />
          <span>{
            modeType === "fake_text" ? "AI FAKE TEXT STORY MODE" :
            modeType === "story_pov" ? "AI STORY POV MAKER" :
            modeType === "split_screen" ? "AI SPLIT-SCREEN MAKER" :
            modeType === "long_form_clips" ? "AI LONG-FORM TO CLIPS" :
            modeType === "long_form" ? "AI LONG-FORM GENERATOR" :
            "AI VIRAL SHORTS AUTOPILOT"
          }</span>
          {selectedNiche && <span style={{ color: '#666', fontSize: '11px' }}>/ {selectedNiche}</span>}
          {selectedSubNiche && <span style={{ color: '#38bdf8', fontSize: '11px' }}> / {selectedSubNiche}</span>}
        </div>

        {step !== 'niche' && step !== 'distribute' && (
          <button 
            onClick={handleBackStep}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#888',
              cursor: 'pointer',
              fontSize: '11px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            <ArrowLeft size={12} />
            <span>Back</span>
          </button>
        )}
      </div>

      {/* Main interactive area replacement logic - NO SCROLLING */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* STEP 1: NICHE SELECTION */}
        {step === 'niche' && (
          <>
            <div className="magic-niche-grid" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(5, 115px)', 
              gridTemplateRows: 'repeat(2, 115px)', 
              gap: '15px',
              marginBottom: '15px'
            }}>
              {niches.map(n => {
                const isSelected = selectedNiche === n.name;
                const IconComponent = (n as any).icon;
                const emoji = (n as any).emoji;
                return (
                  <button 
                    key={n.id}
                    onClick={() => handleNicheSelect(n.name)}
                    className={`magic-niche-card niche-card ${isSelected ? 'active' : ''}`}
                    style={{ 
                      background: '#16161a', 
                      border: isSelected ? '3px solid #FFFFFF' : '1px solid #333', 
                      borderRadius: '12px', 
                      color: '#fff',
                      width: '115px',
                      height: '115px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      cursor: 'pointer',
                      padding: '8px',
                      boxSizing: 'border-box',
                      outline: 'none'
                    }}
                  >
                    {emoji ? (
                      <span style={{ fontSize: '28px', marginBottom: '4px', display: 'inline-block' }}>{emoji}</span>
                    ) : (
                      <IconComponent 
                        size={24} 
                        className="niche-tile-icon"
                        style={{ 
                          marginBottom: '4px'
                        }} 
                      />
                    )}
                    <span style={{ letterSpacing: '0.02em', lineHeight: '1.2' }}>{n.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Input area */}
            <div className="magic-input-container" style={{ width: '635px', display: 'flex', gap: '10px', boxSizing: 'border-box' }}>
              <input 
                type='text' 
                placeholder='Or type your custom niche...' 
                value={customNiche}
                onChange={(e) => setCustomNiche(e.target.value)}
                style={{ 
                  flex: 1, 
                  background: '#0F172A', 
                  border: '1px solid rgba(0, 85, 255, 0.3)', 
                  color: '#fff', 
                  borderRadius: '8px', 
                  padding: '12px 16px',
                  fontSize: '13px',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  fontFamily: '"Inter", sans-serif'
                }} 
                onFocus={(e) => e.currentTarget.style.borderColor = '#0055FF'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(0, 85, 255, 0.3)'}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleApplyCustomNiche();
                }}
              />
              <button 
                onClick={handleApplyCustomNiche}
                style={{ 
                  background: '#0055FF', 
                  color: '#fff', 
                  borderRadius: '8px', 
                  padding: '0 24px', 
                  fontWeight: 'bold',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#3377FF'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#0055FF'}
              >
                APPLY
              </button>
            </div>
          </>
        )}

        {/* STEP 2: SUB-NICHE SELECTION */}
        {step === 'subniche' && (
          <>
            <div className="magic-niche-grid" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(5, 115px)', 
              gridTemplateRows: 'repeat(2, 115px)', 
              gap: '15px',
              marginBottom: '15px'
            }}>
              {(currentMatrix[selectedNiche] || [
                `${selectedNiche} Strategy`, `${selectedNiche} Growth`, `${selectedNiche} Ideas`, 
                `${selectedNiche} Future`, `${selectedNiche} Secrets`, `${selectedNiche} Systems`, 
                `${selectedNiche} Methods`, `${selectedNiche} Blueprint`, `${selectedNiche} Hacks`, 
                `${selectedNiche} Mastery`
              ]).slice(0, 10).map((subNiche, idx) => {
                const isSelected = selectedSubNiche === subNiche;
                const subNicheEmojiMap: Record<string, string> = {
                  "Dividend Growth Investing": "📈",
                  "High-Income Side Hustles": "💸",
                  "Real Estate Investing": "🏠",
                  "ETF Investing for Beginners": "📊",
                  "AI Personal Investing Tools": "🤖",
                  "Crypto": "₿",
                  "Financial Freedom (FIRE)": "🏖️",
                  "Tax Saving Strategies": "💵",
                  "Passive Income (Digital Products)": "📦",
                  "Millionaire Money Habits": "👑",
                  "Weight Loss for Men Over 35": "🧔‍♂️",
                  "Natural Testosterone Optimization": "⚡",
                  "High-Protein Meal Prep": "🥩",
                  "Home Workouts (No Equipment)": "🏠",
                  "Muscle Building After 40": "🏋️‍♂️",
                  "Intermittent Fasting for Fat Loss": "⏳",
                  "Longevity & Healthy Aging": "🧬",
                  "Walking for Fat Loss": "🚶‍♂️",
                  "Biohacking for Better Health": "🧪",
                  "Sleep Optimization & Recovery": "🛌",
                  "AI Tools for Business Owners": "🛠️",
                  "AI Automation Workflows": "⚡",
                  "ChatGPT for Productivity": "💬",
                  "AI Side Hustles": "💰",
                  "AI Agents for Small Businesses": "🤖",
                  "No-Code AI App Development": "📱",
                  "AI Video Creation": "🎬",
                  "Cybersecurity in the AI Era": "🛡️",
                  "Humanoid Robots & Robotics": "🦾",
                  "Future AI Jobs & Careers": "👔",
                  "Stoicism for Modern Men": "🏛️",
                  "Self-Discipline Systems": "⏳",
                  "Morning Routines of Millionaires": "🌅",
                  "Deep Work & Focus": "🧠",
                  "Mental Toughness Training": "⚡",
                  "Building Unshakable Confidence": "🦁",
                  "Breaking Bad Habits": "🛑",
                  "Productivity Systems": "⚙️",
                  "Goal Achievement Frameworks": "🏆",
                  "Resilience After Failure": "🌱",
                  "AI SaaS Startup Ideas": "🔮",
                  "One-Person Businesses": "🧑‍💻",
                  "B2B Lead Generation Systems": "🧲",
                  "Sales Funnels That Convert": "🌪️",
                  "High-Ticket Consulting Businesses": "💼",
                  "Shopify Brand Growth": "🛒",
                  "Subscription Business Models": "🔄",
                  "LinkedIn Personal Branding": "👔",
                  "Agency Growth Strategies": "🏢",
                  "Startup Case Studies": "💡",
                  "Hidden European Destinations": "🗺️",
                  "Luxury Travel on a Budget": "✨",
                  "Digital Nomad Cities": "🌐",
                  "National Parks Adventures": "🌲",
                  "Solo Travel Safety": "🧓",
                  "Food Tourism Around the World": "🍜",
                  "Remote Islands & Secret Beaches": "🏝️",
                  "Budget Backpacking": "🎒",
                  "Scenic Road Trips": "🚗",
                  "Adventure Travel Experiences": "🧗‍♂️",
                  "Dark Psychology Explained": "🕳️",
                  "Body Language Analysis": "👁️",
                  "Cognitive Biases in Daily Life": "🌀",
                  "Emotional Intelligence": "🎭",
                  "Persuasion & Influence": "♟️",
                  "Psychology of Attraction": "💘",
                  "Habit Formation Science": "🧬",
                  "Social Status & Human Behavior": "👑",
                  "Manipulation Tactics (Educational)": "🪤",
                  "Decision-Making Psychology": "⚖️",
                  "James Webb Space Discoveries": "🔭",
                  "Black Holes Explained": "🕳️",
                  "Mars Colonization": "🪐",
                  "Quantum Computing": "⚛️",
                  "Neuroscience & the Brain": "💡",
                  "Longevity Research": "🧬",
                  "Fusion Energy": "⚡",
                  "Search for Alien Life": "👽",
                  "Future Space Missions": "🛸",
                  "Ancient Mysteries Explained by Science": "🗿",
                  "YouTube Algorithm Secrets": "▶️",
                  "Creator Economy Trends": "💸",
                  "Celebrity Business Empires": "🤵",
                  "Streaming Platform Wars": "📺",
                  "Viral Marketing Campaigns": "📢",
                  "Movie Easter Eggs & Hidden Details": "🔍",
                  "Music Industry Business": "🎵",
                  "Internet Culture & Memes": "📱",
                  "Social Media Growth Strategies": "🏢",
                  "Brand Success Stories": "♛",
                  "Lost Civilizations (Atlantis, Göbekli Tepe, etc.)": "🗿",
                  "Secret Military Projects": "🎖️",
                  "Cold War Spy Stories": "🕵️‍♂️",
                  "Ancient Engineering Mysteries": "📐",
                  "Forgotten Empires": "🏛️",
                  "History's Greatest Heists": "🗝️",
                  "Hidden Treasure Legends": "💰",
                  "Archaeological Discoveries": "🏺",
                  "Historical Conspiracies (Evidence-Based)": "🧩",
                  "Unsolved Historical Mysteries": "❓",
                  "Cheating partner gets exposed": "🚨",
                  "Toxic ex returns": "😈",
                  "Secret admirer": "💌",
                  "Long-distance relationship drama": "✈️",
                  "Love triangle": "👥",
                  "Gold digger stories": "💅",
                  "Fake pregnancy prank": "🤰",
                  "Marriage proposal gone wrong": "💍",
                  "Jealous best friend": "👀",
                  "Breakup revenge": "🗡️",
                  "Haunted hotel": "🏨",
                  "Unknown phone number": "📱",
                  "Stalker stories": "👁️",
                  "Paranormal encounters": "👻",
                  "Creepy neighbors": "🦹‍♂️",
                  "Dark web messages": "💻",
                  "Midnight challenges": "🕛",
                  "Haunted dolls": "🤡",
                  "Sleep paralysis": "🛏️",
                  "Urban legends": "📖",
                  "Missing person cases": "👤",
                  "Bank robberies": "💰",
                  "Serial killer stories": "🔪",
                  "Detective investigations": "🔎",
                  "Prison escape stories": "⛓️",
                  "Identity theft": "🦹🏻‍♂️",
                  "Famous unsolved mysteries": "❓",
                  "Kidnapping survival": "🔫",
                  "Kidnapping survivor": "🔫",
                  "FBI interrogations": "🕵️‍♂️",
                  "Scammer revenge": "📵",
                  "Billionaire tests strangers": "🤵‍♂️",
                  "Hidden millionaire": "🤫",
                  "Lottery winner stories": "🎟️",
                  "Rich vs poor": "⚖️",
                  "CEO undercover": "🕶️",
                  "Luxury lifestyle": "🛥️",
                  "Old money families": "🏛️",
                  "Inheritance drama": "📜",
                  "Private jet lifestyle": "✈️",
                  "Supercar collections": "🏎️",
                  "Mean teacher": "🪓",
                  "Strict principal": "👔",
                  "School bully revenge": "🥊",
                  "Exam cheating": "📝",
                  "Prom drama": "💃",
                  "College roommate stories": "🛏️",
                  "Secret crush": "💌",
                  "School prank wars": "🤼",
                  "Teacher favoritism": "🧑‍🎓",
                  "Graduation stories": "🎓",
                  "Toxic boss": "🤬",
                  "Office romance": "💌",
                  "Getting fired": "📦",
                  "Employee revenge": "⚖️",
                  "Crazy customers": "🤪",
                  "Startup founder life": "👨‍💻",
                  "Job interview fails": "🚪",
                  "Coworker betrayal": "👥",
                  "Promotion drama": "📈",
                  "Work-from-home disasters": "🔨",
                  "Zombie outbreak": "🧟",
                  "Nuclear war": "☢️",
                  "Alien invasion": "👽",
                  "Last person alive": "👤",
                  "Survival island": "🏝️",
                  "AI takes over": "🤖",
                  "Global blackout": "🌑",
                  "Pandemic survival": "☣️",
                  "World ends tomorrow": "⏳",
                  "Bunker life": "🏚️",
                  "GTA roleplay": "🚗",
                  "Minecraft survival": "🧱",
                  "Fortnite moments": "🎯",
                  "Roblox stories": "🧱",
                  "Horror game POV": "😱",
                  "Speedrun fails": "⏱️",
                  "Mobile gaming": "📱",
                  "Streamer drama": "🎧",
                  "Gaming challenges": "🏆",
                  "Esports stories": "🏟️",
                  "Dark psychology": "🧠⃤",
                  "Manipulation tactics": "🤹",
                  "Narcissist behavior": "🙇",
                  "Human behavior facts": "👥",
                  "Body language secrets": "🧘🏻♀️",
                  "High IQ puzzles": "🧩",
                  "Social experiments": "🧪",
                  "Reverse psychology": "🔄",
                  "Lie detection": "🔍",
                  "Emotional intelligence": "💖",
                  "AI becomes sentient": "👾",
                  "Chatbot conversations": "💬",
                  "Time-travel app": "⏳",
                  "Hacker stories": "👨🏼‍💻",
                  "Smart home gone wrong": "🏠",
                  "Deepfake drama": "🎥",
                  "Future technology": "🌐",
                  "Secret government AI": "🕵️‍♂️",
                  "Robot friendships": "🦾🤖",
                  "Virtual reality gone wrong": "🥽"
                };
                const emoji = subNicheEmojiMap[subNiche];
                const SubNicheIcon = getNicheIcon(subNiche);
                return (
                  <button 
                    key={idx}
                    onClick={() => handleSubNicheSelect(subNiche)}
                    className={`magic-subniche-card sub-niche-card ${isSelected ? 'active' : ''}`}
                    style={{ 
                      background: '#16161a', 
                      border: isSelected ? '3px solid #FFFFFF' : '1px solid #333', 
                      borderRadius: '12px', 
                      color: '#fff',
                      width: '115px',
                      height: '115px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      cursor: 'pointer',
                      padding: '10px',
                      boxSizing: 'border-box',
                      outline: 'none'
                    }}
                  >
                    {emoji ? (
                      <span style={{ fontSize: '28px', marginBottom: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>{emoji}</span>
                    ) : (
                      <SubNicheIcon 
                        size={24} 
                        className="niche-tile-icon"
                        style={{ 
                          marginBottom: '4px'
                        }} 
                      />
                    )}
                    <span style={{ letterSpacing: '0.02em', lineHeight: '1.2' }}>{subNiche}</span>
                  </button>
                );
              })}
            </div>

            {/* Custom Sub-niche input */}
            <div className="magic-input-container" style={{ width: '635px', display: 'flex', gap: '10px', boxSizing: 'border-box' }}>
              <input 
                type='text' 
                placeholder='Or type your custom sub-niche topic...' 
                value={customSubNiche}
                onChange={(e) => setCustomSubNiche(e.target.value)}
                style={{ 
                  flex: 1, 
                  background: '#0F172A', 
                  border: '1px solid rgba(0, 85, 255, 0.3)', 
                  color: '#fff', 
                  borderRadius: '8px', 
                  padding: '12px 16px',
                  fontSize: '13px',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  fontFamily: '"Inter", sans-serif'
                }} 
                onFocus={(e) => e.currentTarget.style.borderColor = '#0055FF'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(0, 85, 255, 0.3)'}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleApplyCustomSubNiche();
                }}
              />
              <button 
                onClick={handleApplyCustomSubNiche}
                style={{ 
                  background: '#0055FF', 
                  color: '#fff', 
                  borderRadius: '8px', 
                  padding: '0 24px', 
                  fontWeight: 'bold',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#3377FF'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#0055FF'}
              >
                APPLY
              </button>
            </div>
          </>
        )}

        {/* STEP 3: SETTINGS FORM */}
        {step === 'settings' && (
          <div className="magic-settings-container" style={{ 
            width: '635px', 
            background: '#0F172A', 
            border: '1px solid rgba(0, 85, 255, 0.3)', 
            borderRadius: '16px', 
            padding: '20px', 
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }}>
            {/* Length parameter */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 'bold', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                <Clock size={12} style={{ color: '#38bdf8' }} />
                <span>Video Length Duration</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {(modeType === "long_form" ? [120, 180, 240, 300, 360, 420, 480, 540, 600] : [15, 30, 45, 60]).map(len => (
                  <button 
                    key={len}
                    onClick={() => setVideoLength(len)}
                    className={`duration-btn ${videoLength === len ? 'active' : ''}`}
                    style={{
                      flex: modeType === "long_form" ? '0 0 calc(20% - 8px)' : 1,
                      minWidth: '60px',
                      padding: '10px 6px',
                      background: '#1a1a1a',
                      color: '#fff',
                      border: videoLength === len ? '3px solid #FFFFFF' : '1px solid #333',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      fontSize: '11px',
                      outline: 'none'
                    }}
                  >
                    {modeType === "long_form" ? `${len / 60}m` : `${len}s`}
                  </button>
                ))}
              </div>
            </div>

            {/* Voice Talent & Audio/Music side-by-side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Voice Talent Selector */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 'bold', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                  <Mic size={12} style={{ color: '#38bdf8' }} />
                  <span>Voice Talent</span>
                </div>
                <VoiceTalentDropdown
                  value={voiceModel}
                  onChange={(val) => setVoiceModel(val)}
                  niche={selectedNiche}
                />
              </div>

              {/* Audio/Music Background Selector */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', fontSize: '11px', fontWeight: 'bold', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={12} style={{ color: '#38bdf8' }} />
                    <span>Audio/Music Background</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMusicModalOpen(true)}
                    style={{
                      background: 'rgba(56, 189, 248, 0.15)',
                      border: '1px solid rgba(56, 189, 248, 0.4)',
                      color: '#38bdf8',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      textTransform: 'uppercase'
                    }}
                  >
                    🎵 Browse 100+ S3 Tracks
                  </button>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full">
                  <MusicGenreDropdown
                    value={musicTheme}
                    onChange={(val) => setMusicTheme(val)}
                    niche={selectedNiche}
                  />
                  <button
                    type="button"
                    onClick={() => setIsMusicModalOpen(true)}
                    style={{
                      background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                      border: 'none',
                      color: '#fff',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                    className="shrink-0 text-center"
                  >
                    S3 Library
                  </button>
                </div>
              </div>

              <S3MusicLibraryModal
                isOpen={isMusicModalOpen}
                onClose={() => setIsMusicModalOpen(false)}
                onSelectTrack={(trackName, trackUrl) => {
                  setMusicTheme(trackName);
                  sessionStorage.setItem("wizard_selected_music_theme", trackName);
                  if (trackUrl) {
                    sessionStorage.setItem("wizard_selected_music_url", trackUrl);
                  }
                }}
                selectedTrackName={musicTheme}
                niche={selectedNiche}
              />
            </div>

            {/* Caption Style (Viral Vibe) */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 'bold', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                <Sparkles size={12} style={{ color: '#38bdf8' }} />
                <span>Caption Style (ControlVid Vibe)</span>
              </div>
              <CaptionStyleDropdown
                value={captionStyle}
                onChange={(val) => setCaptionStyle(val)}
                niche={selectedNiche || customNiche}
              />
            </div>

            {/* Quantity selection */}
            <div style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 'bold', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                <Video size={12} style={{ color: '#38bdf8' }} />
                <span>Quantity to Generate</span>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(qty => (
                  <button 
                    key={qty}
                    onClick={() => setVideoQuantity(qty)}
                    className={`quantity-btn ${videoQuantity === qty ? 'active' : ''}`}
                    style={{
                      flex: 1,
                      padding: '8px 0',
                      background: '#1a1a1a',
                      color: '#fff',
                      border: videoQuantity === qty ? '3px solid #FFFFFF' : '1px solid #333',
                      borderRadius: '6px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      fontSize: '11px',
                      textAlign: 'center',
                      outline: 'none'
                    }}
                  >
                    {qty}
                  </button>
                ))}
              </div>
            </div>

            {/* Proceed Action */}
            <button 
              onClick={() => {
                console.log("Auth status:", isLoggedIn);

                if (isLoggedIn === false) {
                  alert("To generate your video, please sign up for a plan. Would you like to continue to pricing?");
                  if (onNavigatePricing) {
                    onNavigatePricing();
                  } else {
                    window.location.href = '/pricing';
                  }
                  return;
                }

                generateInitialScripts(selectedSubNiche);
                startDistribution();
              }}
              style={{
                width: '100%',
                background: '#38bdf8',
                color: '#000',
                fontWeight: 'bold',
                padding: '14px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '13px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '5px'
              }}
            >
              <Sparkles size={16} />
              <span>Generate AI Video ({formatCreditText(modeType, videoLength, videoQuantity)})</span>
            </button>

            {isAdmin && (
              <button 
                type="button"
                onClick={() => {
                  generateInitialScripts(selectedSubNiche);
                  startDistribution();
                }}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
                  color: '#ffffff',
                  fontWeight: 'bold',
                  padding: '14px',
                  borderRadius: '8px',
                  border: '1px solid #c084fc',
                  cursor: 'pointer',
                  fontSize: '13px',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '8px',
                  boxShadow: '0 0 15px rgba(168,85,247,0.4)'
                }}
              >
                <Sparkles size={16} />
                <span>Admin Bypass (Generate Video)</span>
              </button>
            )}
          </div>
        )}

        {/* STEP 4: PREVIEW & REGENERATE SCREEN */}
        {step === 'preview' && generatedScripts.length > 0 && (
          <div className="magic-preview-container" style={{ 
            width: '635px', 
            background: '#111', 
            border: '1px solid #333', 
            borderRadius: '16px', 
            padding: '18px', 
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <style>{`
              @keyframes gradientMove {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
            `}</style>

            {/* Top info and Credit counter */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                {generatedScripts.map((scr, idx) => (
                  <button
                    key={scr.id}
                    onClick={() => setActiveScriptIdx(idx)}
                    style={{
                      background: activeScriptIdx === idx ? '#38bdf8' : '#1a1a1a',
                      color: activeScriptIdx === idx ? '#000' : '#888',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '5px 10px',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    Video #{scr.id}
                  </button>
                ))}
              </div>

              {/* Credits */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: '#888', fontWeight: 'bold' }}>
                <Coins size={12} style={{ color: '#38bdf8' }} />
                <span>CREDITS: <b style={{ color: '#fff' }}>{credits}</b> / 100</span>
              </div>
            </div>

            {/* Main side-by-side Video Player layout */}
            <div className="magic-preview-flex" style={{ display: 'flex', gap: '15px' }}>
              
              {/* Left Column: Vertical Smartphone Mockup Video Player */}
              <div style={{
                width: '210px',
                height: '340px',
                background: '#000',
                border: '4px solid #222',
                borderRadius: '24px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0,0,0,0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {/* Simulated Video Content Background - nice glowing moving gradient */}
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  background: 'linear-gradient(45deg, #050515, #11052C, #0F051D, #001A10)',
                  backgroundSize: '400% 400%',
                  animation: 'gradientMove 8s ease infinite',
                  zIndex: 1
                }} />
                
                {/* Subtitles Overlay / Text Highlight */}
                <div style={{
                  position: 'absolute',
                  bottom: '50px',
                  left: '10px',
                  right: '35px',
                  zIndex: 10,
                  textAlign: 'left'
                }}>
                  {/* Dynamic Subtitles matching selected sub-niche */}
                  <p style={{
                    fontSize: '11px',
                    fontWeight: 900,
                    color: '#fff',
                    textShadow: '2px 2px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000',
                    textTransform: 'uppercase',
                    margin: '0 0 4px 0',
                    lineHeight: '1.2',
                    fontFamily: 'monospace'
                  }}>
                    💥 {selectedSubNiche.toUpperCase()} SECRET REVEALED...
                  </p>
                  <p style={{
                    fontSize: '9px',
                    color: '#38bdf8',
                    textShadow: '1px 1px 0px #000',
                    fontWeight: 'bold',
                    margin: 0
                  }}>
                    #viral #education #{selectedSubNiche.toLowerCase().replace(/\s+/g, '')}
                  </p>
                </div>

                {/* Subtitles animation */}
                <div style={{
                  position: 'absolute',
                  top: '40%',
                  left: '12px',
                  right: '12px',
                  zIndex: 10,
                  textAlign: 'center'
                }}>
                  {isRegenerating ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <RefreshCw size={24} className="animate-spin" style={{ color: '#38bdf8' }} />
                      <span style={{ fontSize: '10px', color: '#888', fontWeight: 'bold' }}>RE-COMPILING...</span>
                    </div>
                  ) : (
                    <div style={{
                      background: 'rgba(0,0,0,0.7)',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                    }}>
                      <p style={{
                        fontSize: '10px',
                        fontWeight: 'bold',
                        color: '#fff',
                        margin: '0 0 2px 0',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        AI CAPTION STREAM
                      </p>
                      <p style={{
                        fontSize: '11px',
                        color: '#38bdf8',
                        margin: 0,
                        fontWeight: 'bold',
                        lineHeight: '1.3'
                      }}>
                        "This is a preview of the generated viral video flow. Click export to sync to your social channels."
                      </p>
                    </div>
                  )}
                </div>

                {/* Side interactive icons (TikTok/Reels style) */}
                <div style={{
                  position: 'absolute',
                  right: '6px',
                  bottom: '40px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  zIndex: 10,
                  alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                      width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <Heart size={12} style={{ color: '#ff0055', fill: '#ff0055' }} />
                    </div>
                    <span style={{ fontSize: '8px', color: '#fff', marginTop: '2px', fontWeight: 'bold' }}>12.4K</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                      width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <MessageSquare size={12} style={{ color: '#fff' }} />
                    </div>
                    <span style={{ fontSize: '8px', color: '#fff', marginTop: '2px', fontWeight: 'bold' }}>348</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                      width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <Share2 size={12} style={{ color: '#fff' }} />
                    </div>
                    <span style={{ fontSize: '8px', color: '#fff', marginTop: '2px', fontWeight: 'bold' }}>1.2K</span>
                  </div>
                </div>

                {/* Bottom Timeline Progress Bar */}
                <div style={{
                  position: 'absolute',
                  bottom: '8px',
                  left: '12px',
                  right: '12px',
                  height: '3px',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '2px',
                  zIndex: 10,
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: '65%',
                    height: '100%',
                    background: '#38bdf8',
                    borderRadius: '2px'
                  }} />
                </div>

                {/* Subtle glass play icon in center */}
                {!isRegenerating && (
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255,255,255,0.2)',
                    zIndex: 10,
                    cursor: 'pointer'
                  }}>
                    <Play size={16} style={{ color: '#fff', marginLeft: '2px' }} />
                  </div>
                )}
              </div>

              {/* Right Column: Metadata and Actions */}
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '4px 0',
                gap: '8px'
              }}>
                {/* Channel Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div>
                    <span style={{ fontSize: '9px', fontWeight: 'bold', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      GENERATION COMPLETE
                    </span>
                    <h4 style={{ fontSize: '15px', fontWeight: 'bold', margin: '2px 0 4px 0', color: '#fff' }}>
                      {selectedSubNiche}
                    </h4>
                    <p style={{ fontSize: '11px', color: '#888', margin: 0 }}>
                      Custom AI script & assets compiled successfully and optimized for viral loops.
                    </p>
                  </div>

                  {/* Custom Tab Selector */}
                  <div style={{ display: 'flex', borderBottom: '1px solid rgba(56, 189, 248, 0.2)', marginBottom: '4px' }}>
                    {(['script', 'seo', 'thumbnail'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveSubTab(tab)}
                        style={{
                          flex: 1,
                          background: 'transparent',
                          border: 'none',
                          borderBottom: activeSubTab === tab ? '2px solid #38bdf8' : '2px solid transparent',
                          color: activeSubTab === tab ? '#fff' : '#666',
                          padding: '6px 0',
                          fontSize: '10px',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {tab === 'script' ? 'AI Script' : tab === 'seo' ? 'SEO Suite' : 'Thumbnail Studio'}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <div style={{ minHeight: '135px' }}>
                    {activeSubTab === 'script' && (
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                        background: '#0F172A',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px solid rgba(56, 189, 248, 0.25)',
                        fontSize: '11px',
                        height: '135px',
                        overflowY: 'auto'
                      }}>
                        <div>
                          <span style={{ fontSize: '8px', color: '#ff0055', fontWeight: 'bold' }}>HOOK (0-5s)</span>
                          <p style={{ color: '#fff', margin: '2px 0 0 0', fontStyle: 'italic', lineHeight: '1.3' }}>"{generatedScripts[activeScriptIdx]?.hook}"</p>
                        </div>
                        <div>
                          <span style={{ fontSize: '8px', color: '#38bdf8', fontWeight: 'bold' }}>BODY (5-50s)</span>
                          <p style={{ color: '#fff', margin: '2px 0 0 0', lineHeight: '1.4' }}>{generatedScripts[activeScriptIdx]?.body}</p>
                        </div>
                        <div>
                          <span style={{ fontSize: '8px', color: '#00cc66', fontWeight: 'bold' }}>CTA (50-60s)</span>
                          <p style={{ color: '#fff', margin: '2px 0 0 0', fontStyle: 'italic', lineHeight: '1.3' }}>"{generatedScripts[activeScriptIdx]?.cta}"</p>
                        </div>
                      </div>
                    )}

                    {activeSubTab === 'seo' && (
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        background: '#0F172A',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px solid rgba(56, 189, 248, 0.25)',
                        fontSize: '11px',
                        height: '135px',
                        overflowY: 'auto'
                      }}>
                        <div>
                          <span style={{ fontSize: '8px', color: '#38bdf8', fontWeight: 'bold' }}>AUTOMATED YOUTUBE TITLE</span>
                          <p style={{ color: '#fff', margin: '2px 0 0 0', fontWeight: 'bold', lineHeight: '1.3' }}>
                            {selectedSubNiche.toUpperCase()} - This Strategy Changes Everything!
                          </p>
                        </div>
                        <div>
                          <span style={{ fontSize: '8px', color: '#38bdf8', fontWeight: 'bold' }}>SEO DESCRIPTION</span>
                          <p style={{ color: '#aaa', margin: '2px 0 0 0', lineHeight: '1.3', fontSize: '10px' }}>
                            Learn how to master {selectedSubNiche} step-by-step. Discover the exact frameworks, secrets, and daily routines that drive maximum compound progress in minimum time.
                          </p>
                        </div>
                        <div>
                          <span style={{ fontSize: '8px', color: '#38bdf8', fontWeight: 'bold' }}>SEARCH TAGS & HASHTAGS</span>
                          <p style={{ color: '#38bdf8', margin: '2px 0 0 0', fontFamily: 'monospace', fontSize: '9px', lineHeight: '1.3' }}>
                            #{selectedSubNiche.toLowerCase().replace(/\s+/g, '')}, #shorts, #viral, #growth, #blueprint, #trends, #education, #marketing
                          </p>
                        </div>
                      </div>
                    )}

                    {activeSubTab === 'thumbnail' && (() => {
                      const thumbnailPlatforms = [
                        { id: 'youtube_shorts', name: 'YouTube', icon: YouTubeIcon, color: '#ef4444' },
                        { id: 'tiktok', name: 'TikTok', icon: TikTokIcon, color: '#22d3ee' },
                        { id: 'instagram_reels', name: 'Instagram', icon: InstagramIconComponent, color: '#ec4899' },
                        { id: 'facebook_reels', name: 'Facebook', icon: FacebookIconComponent, color: '#3b82f6' },
                        { id: 'pinterest', name: 'Pinterest', icon: PinterestIconComponent, color: '#dc2626' },
                        { id: 'x_media', name: 'X / Twitter', icon: XIconComponent, color: '#ffffff' },
                        { id: 'linkedin', name: 'LinkedIn', icon: LinkedInIconComponent, color: '#0077b5' },
                        { id: 'snapchat', name: 'Snapchat', icon: SnapchatIconComponent, color: '#facc15' }
                      ];

                      const smartFrames = [
                        { id: 'frame-1', name: 'Hook (0.4s)', desc: 'Frame with highlighted hook text "THE SECRET THEY HIDE"', bg: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.75)), url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=350&q=80")' },
                        { id: 'frame-2', name: 'Climax (26.5s)', desc: 'Emotional peak face with glowing visual subtitle', bg: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.75)), url("https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=350&q=80")' },
                        { id: 'frame-3', name: 'Retention (12.2s)', desc: 'High contrast graphic with bold captions applied', bg: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.75)), url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=350&q=80")' },
                        { id: 'frame-4', name: 'CTA Spike (54.8s)', desc: 'Direct arrow with button frame prompting comment link', bg: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.75)), url("https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=350&q=80")' },
                      ];

                      const selectedPlatformConfig = thumbnailConfigs[selectedThumbnailPlatform] || {
                        mode: 'smart',
                        smartFrameId: 'frame-1',
                        uploadedFile: null,
                        isUploading: false,
                        uploadProgress: 0
                      };

                      const activeFrame = smartFrames.find(f => f.id === selectedPlatformConfig.smartFrameId) || smartFrames[0];

                      return (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', background: '#0b1120', padding: '22px', borderRadius: '14px', border: '1px solid rgba(56, 189, 248, 0.25)', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)' }}>
                          
                          {/* Section Title */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
                            <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#38bdf8', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <Film size={16} /> Multi-Platform Cover Suite
                            </span>
                            <span style={{ fontSize: '11px', color: '#64748b', fontFamily: 'monospace', fontWeight: 'bold', background: 'rgba(255,255,255,0.04)', padding: '3px 8px', borderRadius: '4px' }}>
                              8 ACTIVE NETWORKS
                            </span>
                          </div>

                          {/* 8 Social network platform grid selectors */}
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '6px' }}>
                            {thumbnailPlatforms.map((plat) => {
                              const IconComponent = plat.icon;
                              const isSelected = selectedThumbnailPlatform === plat.id;
                              return (
                                <button
                                  key={plat.id}
                                  type="button"
                                  onClick={() => setSelectedThumbnailPlatform(plat.id)}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '4px',
                                    padding: '8px 4px',
                                    borderRadius: '8px',
                                    border: isSelected ? `2px solid ${plat.color}` : '1px solid rgba(255,255,255,0.08)',
                                    background: isSelected ? 'rgba(56, 189, 248, 0.12)' : '#111827',
                                    color: isSelected ? plat.color : '#cbd5e1',
                                    fontSize: '8.5px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    textTransform: 'uppercase',
                                    transition: 'all 0.15s ease',
                                    whiteSpace: 'nowrap'
                                  }}
                                >
                                  <IconComponent />
                                  <span style={{ fontSize: '8.5px', letterSpacing: '0.01em' }}>{plat.name}</span>
                                </button>
                              );
                            })}
                          </div>

                          {/* Mode settings switcher */}
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', background: '#111827', padding: '5px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <button
                              type="button"
                              onClick={() => setThumbnailConfigs(prev => ({
                                ...prev,
                                [selectedThumbnailPlatform]: { ...prev[selectedThumbnailPlatform], mode: 'smart' }
                              }))}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px',
                                padding: '10px 0',
                                borderRadius: '6px',
                                border: 'none',
                                background: selectedPlatformConfig.mode === 'smart' ? '#1f2937' : 'transparent',
                                color: selectedPlatformConfig.mode === 'smart' ? '#fff' : '#94a3b8',
                                fontSize: '12px',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                cursor: 'pointer',
                                transition: 'all 0.15s'
                              }}
                            >
                              <Sparkles size={12} style={{ color: selectedPlatformConfig.mode === 'smart' ? '#ffd700' : '#475569' }} />
                              <span>Smart Frame</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setThumbnailConfigs(prev => ({
                                ...prev,
                                [selectedThumbnailPlatform]: { ...prev[selectedThumbnailPlatform], mode: 'upload' }
                              }))}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px',
                                padding: '10px 0',
                                borderRadius: '6px',
                                border: 'none',
                                background: selectedPlatformConfig.mode === 'upload' ? '#1f2937' : 'transparent',
                                color: selectedPlatformConfig.mode === 'upload' ? '#fff' : '#94a3b8',
                                fontSize: '12px',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                cursor: 'pointer',
                                transition: 'all 0.15s'
                              }}
                            >
                              <UploadCloud size={12} style={{ color: selectedPlatformConfig.mode === 'upload' ? '#22d3ee' : '#475569' }} />
                              <span>Manual Upload</span>
                            </button>
                          </div>

                          {/* Dynamic content depending on mode */}
                          {selectedPlatformConfig.mode === 'smart' ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Extract optimal video scene for cover:
                              </span>
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '8px' }}>
                                {smartFrames.map((frame) => {
                                  const isFrameSelected = selectedPlatformConfig.smartFrameId === frame.id;
                                  return (
                                    <button
                                      key={frame.id}
                                      type="button"
                                      onClick={() => setThumbnailConfigs(prev => ({
                                        ...prev,
                                        [selectedThumbnailPlatform]: { ...prev[selectedThumbnailPlatform], smartFrameId: frame.id }
                                      }))}
                                      style={{
                                        position: 'relative',
                                        aspectRatio: '9/16',
                                        height: '140px',
                                        borderRadius: '8px',
                                        border: isFrameSelected ? '3px solid #38bdf8' : '1px solid rgba(255,255,255,0.08)',
                                        backgroundImage: frame.bg,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        padding: '4px',
                                        boxSizing: 'border-box',
                                        boxShadow: isFrameSelected ? '0 0 12px rgba(56, 189, 248, 0.4)' : 'none',
                                        transition: 'transform 0.15s ease'
                                      }}
                                    >
                                      <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: isFrameSelected ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.5)',
                                        borderRadius: '6px'
                                      }} />
                                      <span style={{
                                        position: 'relative',
                                        zIndex: 1,
                                        fontSize: '9.5px',
                                        fontWeight: 'bold',
                                        color: '#fff',
                                        background: 'rgba(0,0,0,0.75)',
                                        padding: '3px 4px',
                                        borderRadius: '4px',
                                        width: '100%',
                                        textAlign: 'center',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis'
                                      }}>
                                        {frame.name}
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          ) : (
                            <div className="relative" style={{ width: '100%' }}>
                              <input
                                type="file"
                                accept="image/*"
                                id={`magic-file-upload-${selectedThumbnailPlatform}`}
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
                                  if (!selectedPlatformConfig.isUploading) {
                                    document.getElementById(`magic-file-upload-${selectedThumbnailPlatform}`)?.click();
                                  }
                                }}
                                style={{
                                  border: '2px dashed rgba(56, 189, 248, 0.5)',
                                  background: '#111827',
                                  padding: '24px 16px',
                                  borderRadius: '10px',
                                  textAlign: 'center',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '8px',
                                  transition: 'all 0.15s ease'
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#38bdf8'; e.currentTarget.style.background = '#1e293b'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.5)'; e.currentTarget.style.background = '#111827'; }}
                              >
                                {selectedPlatformConfig.isUploading ? (
                                  <div style={{ width: '100%', maxWidth: '160px' }}>
                                    <Loader2 size={24} className="animate-spin" style={{ color: '#38bdf8', margin: '0 auto 8px auto' }} />
                                    <span style={{ fontSize: '11px', color: '#cbd5e1', fontWeight: 'bold', display: 'block' }}>Uploading Cover... {selectedPlatformConfig.uploadProgress}%</span>
                                    <div style={{ height: '4px', background: '#000', borderRadius: '2px', overflow: 'hidden', marginTop: '6px' }}>
                                      <div style={{ height: '100%', width: `${selectedPlatformConfig.uploadProgress}%`, background: '#38bdf8', transition: 'width 0.15s ease' }} />
                                    </div>
                                  </div>
                                ) : selectedPlatformConfig.uploadedFile ? (
                                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                                    <Check size={28} style={{ color: '#10b981' }} />
                                    <span style={{ fontSize: '13px', color: '#10b981', fontWeight: 'bold' }}>UPLOAD COMPLETE</span>
                                    <span style={{ fontSize: '11px', color: '#94a3b8', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                      {selectedPlatformConfig.uploadedFile}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setThumbnailConfigs(prev => ({
                                          ...prev,
                                          [selectedThumbnailPlatform]: { ...prev[selectedThumbnailPlatform], uploadedFile: null, uploadedFileUrl: null }
                                        }));
                                      }}
                                      style={{
                                        marginTop: '6px',
                                        padding: '4px 10px',
                                        fontSize: '11px',
                                        fontWeight: 'bold',
                                        background: 'rgba(239, 68, 68, 0.15)',
                                        color: '#ef4444',
                                        border: '1px solid rgba(239, 68, 68, 0.3)',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                      }}
                                    >
                                      Remove & Re-upload
                                    </button>
                                  </div>
                                ) : (
                                  <>
                                    <UploadCloud size={28} style={{ color: '#38bdf8' }} />
                                    <span style={{ fontSize: '13px', color: '#f1f5f9', fontWeight: 'bold' }}>CLICK TO UPLOAD CUSTOM COVER IMAGE</span>
                                    <span style={{ fontSize: '11px', color: '#64748b' }}>JPEG or PNG up to 5MB (Vertical 9:16 aspect ratio)</span>
                                  </>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Dynamic live feed mockup */}
                          <div style={{
                            display: 'flex',
                            gap: '14px',
                            background: 'rgba(0,0,0,0.4)',
                            padding: '14px',
                            borderRadius: '10px',
                            border: '1px solid rgba(255,255,255,0.08)',
                            alignItems: 'center'
                          }}>
                            {/* Feed Mini Cover view */}
                            <div style={{
                              width: '80px',
                              aspectRatio: '9/16',
                              borderRadius: '6px',
                              backgroundImage: selectedPlatformConfig.mode === 'upload' && selectedPlatformConfig.uploadedFileUrl
                                ? `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.75)), url(${selectedPlatformConfig.uploadedFileUrl})`
                                : selectedPlatformConfig.mode === 'upload' && selectedPlatformConfig.uploadedFile
                                ? 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.75)), url("https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=350&q=80")'
                                : activeFrame.bg,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              position: 'relative',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'flex-end',
                              padding: '6px',
                              boxSizing: 'border-box',
                              flexShrink: 0,
                              border: '1px solid rgba(255,255,255,0.15)',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
                            }}>
                              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }} />
                              <span style={{
                                position: 'relative',
                                zIndex: 1,
                                fontSize: '8.5px',
                                fontWeight: 'bold',
                                color: '#ffd700',
                                textShadow: '1px 1px 1px #000',
                                textTransform: 'uppercase',
                                lineHeight: '1.1',
                                textAlign: 'center',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis'
                              }}>
                                {selectedSubNiche ? selectedSubNiche.split(' ')[0] : 'LIVE'}
                              </span>
                            </div>

                            {/* CTR & model prediction details */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Flame size={14} style={{ color: '#f59e0b' }} />
                                <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                  CTR Prediction & Margins
                                </span>
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#cbd5e1' }}>
                                  <span>Predicted CTR:</span>
                                  <span style={{ color: '#10b981', fontWeight: 'bold' }}>
                                    {selectedPlatformConfig.mode === 'smart' ? '12.4% (Ultra High)' : '9.8% (Optimal)'}
                                  </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#cbd5e1' }}>
                                  <span>Auto-Overlays check:</span>
                                  <span style={{ color: '#10b981', fontWeight: 'bold' }}>Compliant</span>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => alert(`Synchronized thumbnail setup for ${thumbnailPlatforms.find(p => p.id === selectedThumbnailPlatform)?.name} successfully!`)}
                                style={{
                                  background: 'rgba(56, 189, 248, 0.15)',
                                  color: '#38bdf8',
                                  border: '1px solid rgba(56, 189, 248, 0.3)',
                                  padding: '8px 12px',
                                  fontSize: '11px',
                                  fontWeight: 'bold',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  textTransform: 'uppercase',
                                  marginTop: '4px',
                                  borderStyle: 'solid',
                                  transition: 'all 0.15s ease'
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(56, 189, 248, 0.25)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(56, 189, 248, 0.15)'; }}
                              >
                                Commit Cover to Queue
                              </button>
                            </div>
                          </div>

                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* Actions Block */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                  
                  {/* Download Video and Export Side by Side */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => alert("Downloading HD Video bundle directly...")}
                      style={{
                        flex: 1,
                        background: '#1a1a1a',
                        border: '1px solid #333',
                        color: '#fff',
                        borderRadius: '8px',
                        padding: '10px',
                        fontWeight: 'bold',
                        fontSize: '11px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <Download size={12} />
                      <span>DOWNLOAD HD</span>
                    </button>

                    <button
                      onClick={() => alert("Exporting sequence directly to linked YouTube, TikTok and Instagram accounts...")}
                      style={{
                        flex: 1.2,
                        background: '#38bdf8',
                        color: '#000',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '10px',
                        fontWeight: 'bold',
                        fontSize: '11px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <CloudLightning size={12} />
                      <span>EXPORT CHANNELS</span>
                    </button>
                  </div>

                  {/* Regenerate with Credit Warning Box */}
                  <div style={{
                    borderTop: '1px solid #222',
                    paddingTop: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}>
                    <button 
                      onClick={() => setShowConfirm(true)}
                      disabled={isRegenerating || credits < regenerationCredits}
                      style={{
                        width: '100%',
                        background: '#0d0d0d',
                        border: '1px solid #222',
                        color: '#fff',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        fontWeight: 'bold',
                        fontSize: '11px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        opacity: credits < regenerationCredits ? 0.5 : 1
                      }}
                    >
                      <RefreshCw size={11} className={isRegenerating ? "animate-spin" : ""} style={{ color: '#38bdf8' }} />
                      <span>REGENERATE SELECTED VIDEO</span>
                    </button>
                    <p style={{ fontSize: '9px', color: '#555', margin: '0', textAlign: 'center' }}>
                      * Regenerating this video consumes {regenerationCredits} credits
                    </p>
                  </div>

                  {/* New Session Button */}
                  <button
                    onClick={() => {
                      setStep('niche');
                      setSelectedNiche('');
                      setSelectedSubNiche('');
                      setCustomNiche('');
                      setCustomSubNiche('');
                    }}
                    style={{
                      width: '100%',
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      color: '#888',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      marginTop: '4px'
                    }}
                  >
                    START NEW AUTO-SESSION
                  </button>

                </div>
              </div>

            </div>
          </div>
        )}

        {/* STEP 5: DISTRIBUTION SIMULATION LOGS */}
        {step === 'distribute' && (
          <div style={{ 
            width: '635px', 
            background: '#111', 
            border: '1px solid #333', 
            borderRadius: '16px', 
            padding: '20px', 
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }}>
            {/* Header / Loading title */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CloudLightning size={16} style={{ color: '#38bdf8', animation: 'pulse 1.5s infinite' }} />
                <span style={{ fontSize: '13px', fontWeight: 'bold' }}>
                  {distributeStatus === 'completed' ? 'DISTRIBUTION COMPLETE' : 'AUTOMATED DISTRIBUTION LIVE'}
                </span>
              </div>
              <span style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 'bold' }}>{distributeProgress}%</span>
            </div>

            {/* Custom progress bar */}
            <div style={{ width: '100%', height: '4px', background: '#222', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: `${distributeProgress}%`, height: '100%', background: '#38bdf8', transition: 'width 0.4s ease' }} />
            </div>

            {/* Simulated Live Terminal Logs */}
            <div style={{ 
              background: '#000', 
              border: '1px solid #222', 
              borderRadius: '10px', 
              padding: '12px 15px', 
              height: '140px', 
              overflowY: 'auto',
              fontFamily: 'monospace',
              fontSize: '11px',
              color: '#888',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              {distributeLogs.map((log, index) => (
                <div key={index} style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <span style={{ color: '#38bdf8' }}>&gt;</span>
                  <span style={{ color: index === distributeLogs.length - 1 ? '#fff' : '#888' }}>{log}</span>
                  {index < distributeLogs.length - 1 && <CheckCircle2 size={11} style={{ color: '#38bdf8', marginLeft: 'auto' }} />}
                </div>
              ))}
              {distributeStatus !== 'completed' && (
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <span style={{ color: '#38bdf8' }} className="animate-pulse">&gt;</span>
                  <span style={{ color: '#fff' }} className="animate-pulse">Processing...</span>
                </div>
              )}
            </div>

            {/* Channels Syndicate Indicators */}
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'space-between', padding: '0 5px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: distributeProgress > 50 ? 1 : 0.4 }}>
                <Youtube size={14} style={{ color: '#ff0000' }} />
                <span style={{ fontSize: '10px', fontWeight: 'bold' }}>YOUTUBE SHORTS</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: distributeProgress > 65 ? 1 : 0.4 }}>
                <Chrome size={14} style={{ color: '#38bdf8' }} />
                <span style={{ fontSize: '10px', fontWeight: 'bold' }}>TIKTOK SYNC</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: distributeProgress > 80 ? 1 : 0.4 }}>
                <Instagram size={14} style={{ color: '#e1306c' }} />
                <span style={{ fontSize: '10px', fontWeight: 'bold' }}>INSTAGRAM REELS</span>
              </div>
            </div>
          </div>
        )}

      {showConfirm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '20px'
        }}>
          <div style={{
            background: '#111',
            border: '1px solid #333',
            borderRadius: '16px',
            padding: '24px',
            width: '100%',
            maxWidth: '360px',
            boxSizing: 'border-box',
            textAlign: 'center',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
              <AlertCircle size={40} style={{ color: '#38bdf8' }} />
            </div>
            <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#fff', margin: '0 0 8px 0' }}>Confirm Action</h3>
            <p style={{ fontSize: '12px', color: '#aaa', margin: '0 0 20px 0', lineHeight: '1.5' }}>
              Are you sure? This action will use <strong style={{ color: '#38bdf8' }}>{regenerationCredits} credits</strong>.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setShowConfirm(false)}
                style={{
                  flex: 1,
                  background: '#222',
                  border: '1px solid #333',
                  color: '#fff',
                  borderRadius: '8px',
                  padding: '10px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                CANCEL
              </button>
              <button
                onClick={() => {
                  setShowConfirm(false);
                  handleRegenerate();
                }}
                style={{
                  flex: 1,
                  background: '#38bdf8',
                  color: '#000',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                YES, REGENERATE
              </button>
            </div>
          </div>
        </div>
      )}

      </div>
    </div>
  );
}
