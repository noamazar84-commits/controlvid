import { useState, useEffect } from "react";
import { auth } from "../../../lib/firebase";
import { 
  ArrowLeft, 
  RefreshCw, 
  Sparkles, 
  Clock, 
  Video, 
  Heart, 
  MessageSquare, 
  Share2, 
  Play, 
  Download, 
  CloudLightning, 
  AlertCircle,
  TrendingUp,
  Tv,
  CheckCircle2,
  Youtube,
  Chrome,
  Instagram,
  Mic,
  ChevronDown,
  Layers,
  Check
} from "lucide-react";

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

interface CustomModeProps {
  onBack?: () => void;
  onSuccess?: (scriptData: any) => void;
  modeType?: string;
  isLoggedIn?: boolean;
  onNavigatePricing?: () => void;
  activeUser?: any;
}

type CustomStep = 'input' | 'compilation' | 'validation' | 'generation' | 'preview' | 'distribute';

export default function CustomMode({ onBack, onSuccess, modeType, isLoggedIn, onNavigatePricing, activeUser }: CustomModeProps) {
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
    localStorage.getItem("viralflow_user_email") || 
    ""
  ).trim().toLowerCase();

  const isAdmin = isPreviewEnvironment || (currentUserEmail === "noamazar84@gmail.com");

  // State machine
  const [step, setStep] = useState<CustomStep>('input');
  
  // Custom prompt & settings states
  const [customTopic, setCustomTopic] = useState<string>('');
  const [videoFramework, setVideoFramework] = useState<string>('Long-Form (2m to 10m deep structured content)'); 
  const [isVideoStyleOpen, setIsVideoStyleOpen] = useState<boolean>(false);

  const videoStyleOptions = [
    {
      title: "Long-Form",
      desc: "2m to 10m deep structured content",
      frameworkValue: "Long-Form (2m to 10m deep structured content)",
      defaultDuration: "2m"
    },
    {
      title: "Viral Shorts",
      desc: "15s - 60s high-retention vertical clips",
      frameworkValue: "Viral Shorts (15s - 60s high-retention vertical clips)",
      defaultDuration: "60s"
    },
    {
      title: "Fake Text",
      desc: "Chat conversation visual storytelling",
      frameworkValue: "Fake Text Stories (chat conversation visual storytelling)",
      defaultDuration: "45s"
    },
    {
      title: "Story / POV",
      desc: "First-person narrative scripts",
      frameworkValue: "Story/POV (first-person narrative scripts)",
      defaultDuration: "60s"
    },
    {
      title: "Split-Screen",
      desc: "Dual-frame engagement content",
      frameworkValue: "Split-Screen (dual-frame engagement content)",
      defaultDuration: "60s"
    },
    {
      title: "E-commerce Ads",
      desc: "Product conversion video frameworks",
      frameworkValue: "E-commerce Ads (product conversion video frameworks)",
      defaultDuration: "30s"
    }
  ];
  const [customHook, setCustomHook] = useState<string>('');
  const [customCTA, setCustomCTA] = useState<string>('');
  const [videoLength, setVideoLength] = useState<string | number>(30); // 15, 30, 45, 60, 2m, 3m, 5m, 8m, 10m
  const [videoQuantity, setVideoQuantity] = useState<number>(3); // 1 to 10 slider
  const [musicTheme, setMusicTheme] = useState<string>('Cinematic Beats');
  const [voiceModel, setVoiceModel] = useState<string>('Adam (AI Male)');
  const [captionStyle, setCaptionStyle] = useState<string>(() => sessionStorage.getItem("wizard_selected_caption_style") || 'ViralFlow Blue');

  // Thumbnail state
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

  // Broadcaster Multi-Platform Selected Networks State (8 Networks)
  const [selectedBroadcasters, setSelectedBroadcasters] = useState<string[]>([
    'youtube', 'tiktok', 'instagram', 'facebook', 'pinterest', 'twitter', 'linkedin', 'snapchat'
  ]);

  const toggleBroadcaster = (networkId: string) => {
    setSelectedBroadcasters(prev => 
      prev.includes(networkId) 
        ? prev.filter(id => id !== networkId) 
        : [...prev, networkId]
    );
  };

  // Preview & script generation
  const [generatedScripts, setGeneratedScripts] = useState<any[]>([]);
  const [activeScriptIdx, setActiveScriptIdx] = useState<number>(0);
  const [credits, setCredits] = useState<number>(85);
  const [isRegenerating, setIsRegenerating] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  // Compilation progress
  const [compilationProgress, setCompilationProgress] = useState<number>(0);
  const [compilationLogs, setCompilationLogs] = useState<string[]>([]);

  // Video Generation progress
  const [generationProgress, setGenerationProgress] = useState<number>(0);
  const [generationLogs, setGenerationLogs] = useState<string[]>([]);

  // Distribution step progress
  const [distributeStatus, setDistributeStatus] = useState<string>('idle'); // idle, distributing, completed
  const [distributeProgress, setDistributeProgress] = useState<number>(0);
  const [distributeLogs, setDistributeLogs] = useState<string[]>([]);

  // Synchronize music theme and custom topic/niche to session storage for the video generator
  useEffect(() => {
    sessionStorage.setItem("wizard_selected_music_theme", musicTheme);
  }, [musicTheme]);

  useEffect(() => {
    sessionStorage.setItem("wizard_selected_caption_style", captionStyle);
  }, [captionStyle]);

  useEffect(() => {
    if (customTopic) {
      let nicheId = "finance";
      const norm = customTopic.toLowerCase();
      if (norm.includes("finance") || norm.includes("wealth") || norm.includes("money") || norm.includes("crypto") || norm.includes("invest")) nicheId = "finance";
      else if (norm.includes("fitness") || norm.includes("diet") || norm.includes("gym") || norm.includes("workout") || norm.includes("health")) nicheId = "fitness";
      else if (norm.includes("tech") || norm.includes("ai") || norm.includes("software") || norm.includes("code") || norm.includes("computer")) nicheId = "tech";
      else if (norm.includes("motivation") || norm.includes("mindset") || norm.includes("stoic") || norm.includes("discipline")) nicheId = "motivation";
      else if (norm.includes("business") || norm.includes("startup") || norm.includes("hustle") || norm.includes("saas")) nicheId = "business";
      else if (norm.includes("travel") || norm.includes("exploration") || norm.includes("trip") || norm.includes("world")) nicheId = "travel";
      else if (norm.includes("psychology") || norm.includes("human") || norm.includes("mind") || norm.includes("behavior")) nicheId = "psychology";
      else if (norm.includes("science") || norm.includes("space") || norm.includes("galaxy") || norm.includes("physics")) nicheId = "science";
      else if (norm.includes("culture") || norm.includes("media") || norm.includes("pop") || norm.includes("movie")) nicheId = "culture";
      else if (norm.includes("history") || norm.includes("ancient") || norm.includes("untold") || norm.includes("past")) nicheId = "history";
      else nicheId = "custom_" + norm.trim().replace(/[^a-z0-9]+/g, "_"); // clean custom niche name!

      sessionStorage.setItem("wizard_selected_niche_id", nicheId);
    }
  }, [customTopic]);

  const frameworks = [
    "Long-Form (2m to 10m deep structured content)",
    "Viral Shorts (15s - 60s high-retention vertical clips)",
    "Fake Text Stories (chat conversation visual storytelling)",
    "Story/POV (first-person narrative scripts)",
    "Split-Screen (dual-frame engagement content)",
    "E-commerce Ads (product conversion video frameworks)"
  ];

  // Handler for script validation text change
  const handleScriptChange = (field: 'hook' | 'body' | 'cta', value: string) => {
    setGeneratedScripts(prev => prev.map((scr, idx) => {
      if (idx === activeScriptIdx) {
        return { ...scr, [field]: value };
      }
      return scr;
    }));
  };

  // Section-specific Rewrite generator
  const handleSectionRewrite = (field: 'hook' | 'body' | 'cta') => {
    if (modeType === "long_form_clips") {
      const hookRewrites = [
        "This is the single most important lesson from the entire podcast, and almost everyone gets it wrong.",
        "When asked about the future of automation, here is exactly what the speaker warned us about.",
        "Most people completely overlook this 30-second breakthrough advice regarding leverage.",
        "If you only watch one minute of this video, make sure it is this exact clip.",
        "Here is the absolute raw truth about building systems that the gurus won't tell you.",
        "The moment they started discussing the compound interest of attention, everything clicked."
      ];

      const bodyRewrites = [
        "Instead of trying to do everything at once, isolate the one constraint holding you back. Build a loop around it, master it, and let it run. Once you have that momentum, the rest is easy.",
        "In this segment, they detail how vertical media has fundamentally changed attention. It is no longer about high budget production, but high-density value in the first five seconds.",
        "They explained that attention compounds just like capital. When you publish high-value, optimized loops daily, you are building an asset that grows in value even while you sleep."
      ];

      const ctaRewrites = [
        "What are your thoughts on this lesson? Drop a comment below and let's discuss!",
        "Save this clip for later and follow for more high-value insights from top voices.",
        "Comment 'CLIPS' below and I'll send you the full transcript and resource pack instantly."
      ];

      let rewriteOptions = hookRewrites;
      if (field === 'body') {
        rewriteOptions = bodyRewrites;
      } else if (field === 'cta') {
        rewriteOptions = ctaRewrites;
      }

      const currentVal = generatedScripts[activeScriptIdx]?.[field] || '';
      const filteredOptions = rewriteOptions.filter(opt => opt !== currentVal);
      const finalOptions = filteredOptions.length > 0 ? filteredOptions : rewriteOptions;
      const randomRewrite = finalOptions[Math.floor(Math.random() * finalOptions.length)];

      handleScriptChange(field, randomRewrite);
      return;
    }

    const finalTopic = customTopic.trim() || "Viral AI Automation";
    
    const hookRewrites = [
      `Wait, don't scroll! Here is how you actually master ${finalTopic} in seconds.`,
      `Most people are completely wrong about ${finalTopic}. Here is the real secret.`,
      `This 15-second checklist will change how you think about ${finalTopic} forever.`,
      `If you're still struggling with ${finalTopic}, stop everything and watch this.`,
      `Here is the exact framework I used to automate ${finalTopic} with zero effort.`
    ];

    const ctaRewrites = [
      `Comment "${finalTopic.split(' ')[0].toUpperCase()}" and I'll DM you the raw templates immediately!`,
      `Save this video and comment "${finalTopic.split(' ')[0].toUpperCase()}" to get instant beta access.`,
      `Drop a comment with "${finalTopic.split(' ')[0].toUpperCase()}" and my AI assistant will send you the guide!`,
      `Want the full system? Just comment "${finalTopic.split(' ')[0].toUpperCase()}" below and I'll send it over.`,
      `Comment "${finalTopic.split(' ')[0].toUpperCase()}" and let's get you set up today!`
    ];

    const longFormBodyRewrites = [
      `We need to go deep into why most modern systems fail. In the next few minutes, we will break down the structural architecture of scalable content loops. First, let's look at the underlying mechanics. Second, we examine the compounding retention curves. Finally, we establish the distribution protocols.`,
      `This is a comprehensive deep dive into high-retention frameworks. Let's analyze the exact sequence: we begin by defining search intent, then we map out the complete psychological engagement points, and we conclude by automating the post-production rendering queues.`,
      `Let's unpack the reality of organic growth. Over the next ten minutes, we're dissecting the complete pipeline. Most creators look at vanity metrics, but the real leverage lies in deep, structured content loops.`
    ];

    const viralShortsBodyRewrites = [
      `Instead of following outdated guides, focus on what actually works for high retention. Everything boils down to single-loop momentum. Once I automated this step, everything changed.`,
      `Here is the raw truth. Most creators overcomplicate their vertical systems. When you strip away the noise and implement daily leverage, your conversion rates skyrocket instantly.`,
      `It started as a simple experiment. I isolated our three highest-converting short assets and automated them. Within 48 hours, engagement increased by 140%.`
    ];

    const fakeTextBodyRewrites = [
      `Hey, are you seeing this text? Yeah, why? You won't believe what just happened with our automated video setup. Let me send you the screenshot. This changes everything.`,
      `Please tell me you didn't click that link. I did, why? Because it literally activates a fully automated high-converting template system that does 90% of the work.`,
      `Did you check the dashboard today? No, is everything ok? We just scaled to 10,000 views in under two hours using the custom loop. Check the group chat now.`
    ];

    const storyPOVBodyRewrites = [
      `POV: You're sitting at your desk, spending hours writing scripts, while your competitor is using an advanced AI stack to generate high-retention content in seconds. It's time to adapt.`,
      `I remember when I used to work 60-hour weeks trying to format videos manually. I was exhausted, burned out, and ready to quit. Then, I realized everything could be automated.`,
      `Imagine waking up, opening your analytics, and seeing your channel grow completely on autopilot. That's the power of having a structured narrative framework working for you 24/7.`
    ];

    const splitScreenBodyRewrites = [
      `Look at the top half of your screen. That's the raw engagement. Now look at the bottom half. That's the system that powers it. When you pair dual-frame visuals with a robust script, retention doubles.`,
      `We are combining satisfying ASMR gameplay with a high-value breakdown of content systems. Keep watching the dual-frame to see exactly how retention curves stay above eighty percent.`,
      `Why does split-screen content dominate the algorithm? It's simple: dual-stimulation. While your eyes are locked on the visual loop, your brain is absorbing this high-conversion framework.`
    ];

    const ecommerceAdsBodyRewrites = [
      `This is the exact sequence we use to sell out our inventory daily. First, isolate the primary pain point. Second, demonstrate the immediate physical solution. Third, offer an exclusive launch discount.`,
      `Stop wasting money on traditional ad campaigns. This conversion-optimized video template does 90% of the heavy lifting. Get yours today and watch your sales scale overnight.`,
      `This is a limited-time offer to completely streamline your ad creative workflow. Follow our product framework, launch your ad sequence, and dominate your market instantly.`
    ];

    let bodyOptions = viralShortsBodyRewrites;
    if (videoFramework.includes("Long-Form")) {
      bodyOptions = longFormBodyRewrites;
    } else if (videoFramework.includes("Viral Shorts")) {
      bodyOptions = viralShortsBodyRewrites;
    } else if (videoFramework.includes("Fake Text")) {
      bodyOptions = fakeTextBodyRewrites;
    } else if (videoFramework.includes("Story/POV")) {
      bodyOptions = storyPOVBodyRewrites;
    } else if (videoFramework.includes("Split-Screen")) {
      bodyOptions = splitScreenBodyRewrites;
    } else if (videoFramework.includes("E-commerce Ads")) {
      bodyOptions = ecommerceAdsBodyRewrites;
    }

    let rewriteOptions = hookRewrites;
    if (field === 'body') {
      rewriteOptions = bodyOptions;
    } else if (field === 'cta') {
      rewriteOptions = ctaRewrites;
    }

    // Select a random variation that is different from current if possible
    const currentVal = generatedScripts[activeScriptIdx]?.[field] || '';
    const filteredOptions = rewriteOptions.filter(opt => opt !== currentVal);
    const finalOptions = filteredOptions.length > 0 ? filteredOptions : rewriteOptions;
    const randomRewrite = finalOptions[Math.floor(Math.random() * finalOptions.length)];

    handleScriptChange(field, randomRewrite);
  };

  // Generate ultra high fidelity realistic short-form video scripts based on user prompt, custom hook, CTA, and framework
  const generateInitialScripts = (topic: string, hookVal: string, ctaVal: string, frameworkVal: string) => {
    if (modeType === "long_form_clips") {
      const clipHooks = [
        "This is the single most important lesson from the entire podcast, and almost everyone gets it wrong.",
        "When asked about the future of automation, here is exactly what the speaker warned us about.",
        "Most people completely overlook this 30-second breakthrough advice regarding leverage.",
        "If you only watch one minute of this video, make sure it is this exact clip.",
        "Here is the absolute raw truth about building systems that the gurus won't tell you.",
        "The moment they started discussing the compound interest of attention, everything clicked."
      ];

      const clipBodies = [
        "Instead of trying to do everything at once, isolate the one constraint holding you back. Build a loop around it, master it, and let it run. Once you have that momentum, the rest is easy.",
        "In this segment, they detail how vertical media has fundamentally changed attention. It is no longer about high budget production, but high-density value in the first five seconds.",
        "They explained that attention compounds just like capital. When you publish high-value, optimized loops daily, you are building an asset that grows in value even while you sleep."
      ];

      const clipCtas = [
        "What are your thoughts on this lesson? Drop a comment below and let's discuss!",
        "Save this clip for later and follow for more high-value insights from top voices.",
        "Comment 'CLIPS' below and I'll send you the full transcript and resource pack instantly."
      ];

      const list = Array.from({ length: videoQuantity }).map((_, i) => {
        const hook = clipHooks[i % clipHooks.length];
        const body = clipBodies[i % clipBodies.length];
        const cta = clipCtas[i % clipCtas.length];
        return {
          id: i + 1,
          title: `AI Clip #${i + 1} (${typeof videoLength === 'number' || !videoLength.toString().endsWith('m') ? videoLength + 's' : videoLength})`,
          hook,
          body,
          cta,
          viralScore: Math.floor(Math.random() * 12) + 87, // 87% to 99%
          duration: videoLength
        };
      });

      setGeneratedScripts(list);
      setActiveScriptIdx(0);
      return;
    }

    const finalTopic = topic.trim() || "Viral AI Automation";
    const finalHook = hookVal.trim() || `Stop scrolling if you want to master ${finalTopic} in under 15 seconds.`;
    const finalCta = ctaVal.trim() || `Comment "${finalTopic.split(' ')[0].toUpperCase()}" and I'll send you the exact template.`;
    
    // Custom frameworks content patterns
    const longFormBodies = [
      `We need to go deep into why most modern systems fail. In the next few minutes, we will break down the structural architecture of scalable content loops. First, let's look at the underlying mechanics. Second, we examine the compounding retention curves. Finally, we establish the distribution protocols.`,
      `This is a comprehensive deep dive into high-retention frameworks. Let's analyze the exact sequence: we begin by defining search intent, then we map out the complete psychological engagement points, and we conclude by automating the post-production rendering queues.`,
      `Let's unpack the reality of organic growth. Over the next ten minutes, we're dissecting the complete pipeline. Most creators look at vanity metrics, but the real leverage lies in deep, structured content loops.`
    ];

    const viralShortsBodies = [
      `Instead of following outdated guides, focus on what actually works for high retention. Everything boils down to single-loop momentum. Once I automated this step, everything changed.`,
      `Here is the raw truth. Most creators overcomplicate their vertical systems. When you strip away the noise and implement daily leverage, your conversion rates skyrocket instantly.`,
      `It started as a simple experiment. I isolated our three highest-converting short assets and automated them. Within 48 hours, engagement increased by 140%.`
    ];

    const fakeTextBodies = [
      `Hey, are you seeing this text? Yeah, why? You won't believe what just happened with our automated video setup. Let me send you the screenshot. This changes everything.`,
      `Please tell me you didn't click that link. I did, why? Because it literally activates a fully automated high-converting template system that does 90% of the work.`,
      `Did you check the dashboard today? No, is everything ok? We just scaled to 10,000 views in under two hours using the custom loop. Check the group chat now.`
    ];

    const storyPOVBodies = [
      `POV: You're sitting at your desk, spending hours writing scripts, while your competitor is using an advanced AI stack to generate high-retention content in seconds. It's time to adapt.`,
      `I remember when I used to work 60-hour weeks trying to format videos manually. I was exhausted, burned out, and ready to quit. Then, I realized everything could be automated.`,
      `Imagine waking up, opening your analytics, and seeing your channel grow completely on autopilot. That's the power of having a structured narrative framework working for you 24/7.`
    ];

    const splitScreenBodies = [
      `Look at the top half of your screen. That's the raw engagement. Now look at the bottom half. That's the system that powers it. When you pair dual-frame visuals with a robust script, retention doubles.`,
      `We are combining satisfying ASMR gameplay with a high-value breakdown of content systems. Keep watching the dual-frame to see exactly how retention curves stay above eighty percent.`,
      `Why does split-screen content dominate the algorithm? It's simple: dual-stimulation. While your eyes are locked on the visual loop, your brain is absorbing this high-conversion framework.`
    ];

    const ecommerceAdsBodies = [
      `This is the exact sequence we use to sell out our inventory daily. First, isolate the primary pain point. Second, demonstrate the immediate physical solution. Third, offer an exclusive launch discount.`,
      `Stop wasting money on traditional ad campaigns. This conversion-optimized video template does 90% of the heavy lifting. Get yours today and watch your sales scale overnight.`,
      `This is a limited-time offer to completely streamline your ad creative workflow. Follow our product framework, launch your ad sequence, and dominate your market instantly.`
    ];

    let bodyTemplates = viralShortsBodies;
    if (frameworkVal.includes("Long-Form")) {
      bodyTemplates = longFormBodies;
    } else if (frameworkVal.includes("Viral Shorts")) {
      bodyTemplates = viralShortsBodies;
    } else if (frameworkVal.includes("Fake Text")) {
      bodyTemplates = fakeTextBodies;
    } else if (frameworkVal.includes("Story/POV")) {
      bodyTemplates = storyPOVBodies;
    } else if (frameworkVal.includes("Split-Screen")) {
      bodyTemplates = splitScreenBodies;
    } else if (frameworkVal.includes("E-commerce Ads")) {
      bodyTemplates = ecommerceAdsBodies;
    }

    const list = Array.from({ length: videoQuantity }).map((_, i) => {
      const hook = i === 0 ? finalHook : `${finalHook} (Variation #${i + 1})`;
      const body = bodyTemplates[i % bodyTemplates.length];
      const cta = i === 0 ? finalCta : `${finalCta} (Alt CTA #${i + 1})`;
      return {
        id: i + 1,
        title: `Custom Video #${i + 1}`,
        hook,
        body,
        cta,
        viralScore: Math.floor(Math.random() * 12) + 87, // 87% to 99%
        duration: videoLength
      };
    });

    setGeneratedScripts(list);
    setActiveScriptIdx(0);
  };

  // Regeneration simulation using 1 credit
  const handleRegenerate = () => {
    if (credits < 1) return;
    setIsRegenerating(true);
    setCredits(prev => Math.max(0, prev - 1));
    setTimeout(() => {
      generateInitialScripts(customTopic, customHook, customCTA, videoFramework);
      setIsRegenerating(false);
    }, 800);
  };

  // Run the full compilation (Step 4-7: Auto-generate with SEO optimization)
  const startCompilation = () => {
    setStep('compilation');
    setCompilationProgress(0);
    setCompilationLogs([]);

    const clipLogItems = [
      "Initializing AI Long-Form to Clips Clipper...",
      "Analyzing source video audio stream & scene changes...",
      "Detecting viral engagement peaks & key-phrase spikes...",
      "Extracting top highlighted segments of interest...",
      "Generating dynamic vertical reframing and zoom sequences...",
      "Applying optimal aspect ratios & active tracking elements...",
      "Syncing high-impact caption timestamps for selected clips...",
      "Compiling individual vertical HD clips..."
    ];

    const defaultLogItems = [
      "Initializing Custom AI compilation engine...",
      "Parsing free-text prompt and keyword hierarchy...",
      "Analyzing Video Framework structure...",
      "Optimizing narrative flow using custom Hook...",
      "Injecting SEO keywords and search-friendly hashtags...",
      "Formatting caption scripts with customized Call to Action...",
      "Rendering visual vertical timeline templates...",
      "Compiling 9:16 vertical HD sequences..."
    ];

    const logItems = modeType === "long_form_clips" ? clipLogItems : defaultLogItems;

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < logItems.length) {
        setCompilationLogs(prev => [...prev, logItems[currentLogIndex]]);
        setCompilationProgress(Math.floor(((currentLogIndex + 1) / logItems.length) * 100));
        currentLogIndex++;
      } else {
        clearInterval(interval);
        generateInitialScripts(customTopic, customHook, customCTA, videoFramework);
        // Transition to interactive Script Editor Validation step
        setStep('validation');
      }
    }, 500);
  };

  // Run the full video generation from validated/edited scripts
  const startVideoGeneration = () => {
    setStep('generation');
    setGenerationProgress(0);
    setGenerationLogs([]);

    const logItems = [
      "Initializing high fidelity video rendering pipeline...",
      "Syncing approved narration scripts with vocal profile...",
      "Synthesizing customized caption timestamps and text overlays...",
      "Generating dynamic 9:16 background visual assets...",
      "Applying layout frame templates & transition effects...",
      "Compiling final vertical video sequences..."
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < logItems.length) {
        setGenerationLogs(prev => [...prev, logItems[currentLogIndex]]);
        setGenerationProgress(Math.floor(((currentLogIndex + 1) / logItems.length) * 100));
        currentLogIndex++;
      } else {
        clearInterval(interval);
        // Transition to final Preview screen
        setStep('preview');
      }
    }, 400);
  };

  // Run the distribution simulation
  const startDistribution = () => {
    setStep('distribute');
    setDistributeStatus('distributing');
    setDistributeProgress(0);
    setDistributeLogs([]);

    const logItems = [
      "Initializing automated distribution logs...",
      "Deploying high-definition compiled visual assets...",
      "Syncing custom voiceover and subtitle tracks...",
      "Syndicating content bundle to connected channels...",
      "Publishing video series to YouTube Shorts...",
      "Publishing video series to TikTok Workspace...",
      "Publishing video series to Instagram Reels...",
      "Automated queue deployment completed successfully!"
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
        if (onSuccess) {
          onSuccess({
            title: customTopic || "Custom Precision Video",
            topic: customTopic || "Custom Precision Video",
            scriptsCount: generatedScripts.length,
            duration: videoLength,
            musicTheme,
            scripts: generatedScripts
          });
        }
      }
    }, 600);
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
      <div style={{ 
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
            modeType === "long_form_clips" ? "AI LONG-FORM TO CLIPS CUTTER" :
            modeType === "long_form" ? "AI LONG-FORM SCRIPT MAKER" :
            "AI VIDEO CUSTOM MODE"
          }</span>
          {customTopic && <span style={{ color: '#666', fontSize: '11px' }}>/ {customTopic.slice(0, 18)}...</span>}
        </div>

        {step !== 'compilation' && step !== 'generation' && step !== 'distribute' && (
          <button 
            onClick={() => {
              if (step === 'preview') {
                setStep('validation');
              } else if (step === 'validation') {
                setStep('input');
              } else {
                if (onBack) onBack();
                else window.location.hash = "";
              }
            }}
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
        
        {/* STEP 1: CONSOLIDATED INPUT FORM CARD */}
        {step === 'input' && (
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
            {modeType === "long_form_clips" ? (
              // STREAMLINED CLIPPING ENGINE UI (Stripped and Cleaned)
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {/* 1. Long-Form Video URL Link */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 'bold', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                    <Tv size={12} style={{ color: '#38bdf8' }} />
                    <span>Long-Form Video URL Link</span>
                  </div>
                  <input 
                    type="text"
                    placeholder="E.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    value={customTopic}
                    onChange={(e) => setCustomTopic(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#1a1a1a',
                      border: '1px solid #333',
                      color: '#fff',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      outline: 'none',
                      fontSize: '13px',
                      boxSizing: 'border-box',
                      fontFamily: 'sans-serif'
                    }}
                  />
                </div>

                {/* Video Length Duration */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 'bold', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                    <Clock size={12} style={{ color: '#38bdf8' }} />
                    <span>Custom Video Length Duration (10 Minutes Maximum)</span>
                  </div>
                  <input 
                    type="text"
                    placeholder="10 Minutes Maximum"
                    value={videoLength}
                    onChange={(e) => setVideoLength(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#1a1a1a',
                      border: '1px solid #333',
                      color: '#fff',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      outline: 'none',
                      fontSize: '12px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* Voice Talent & Audio/Music side-by-side */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '15px'
                }}>
                  {/* Voice Talent Selector */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 'bold', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                      <Mic size={12} style={{ color: '#38bdf8' }} />
                      <span>Voice Talent</span>
                    </div>
                    <select 
                      value={voiceModel}
                      onChange={(e) => setVoiceModel(e.target.value)}
                      style={{
                        width: '100%',
                        background: '#1a1a1a',
                        border: '1px solid #333',
                        color: '#fff',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        outline: 'none',
                        fontSize: '12px',
                        boxSizing: 'border-box',
                        cursor: 'pointer',
                        height: '38px'
                      }}
                    >
                      <option>Adam (AI Male)</option>
                      <option>Serena (AI Female)</option>
                      <option>Marcus (Deep Narrative)</option>
                      <option>Lily (Energetic Short)</option>
                    </select>
                  </div>

                  {/* Audio/Music Background */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 'bold', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                      <Sparkles size={12} style={{ color: '#38bdf8' }} />
                      <span>Audio/Music Background</span>
                    </div>
                    <select 
                      value={musicTheme}
                      onChange={(e) => setMusicTheme(e.target.value)}
                      style={{
                        width: '100%',
                        background: '#1a1a1a',
                        border: '1px solid #333',
                        color: '#fff',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        outline: 'none',
                        fontSize: '12px',
                        boxSizing: 'border-box',
                        cursor: 'pointer',
                        height: '38px'
                      }}
                    >
                      <option>Cinematic Beats</option>
                      <option>Cyberpunk Bass</option>
                      <option>Financial Lo-Fi</option>
                      <option>Motivation Upbeat</option>
                    </select>
                  </div>
                </div>

                {/* Caption Style (Viral Vibe) - Full Width */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 'bold', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                    <Sparkles size={12} style={{ color: '#38bdf8' }} />
                    <span>Caption Style (Viral Vibe)</span>
                  </div>
                  <select 
                    value={captionStyle}
                    onChange={(e) => setCaptionStyle(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#1a1a1a',
                      border: '1px solid #333',
                      color: '#fff',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      outline: 'none',
                      fontSize: '12px',
                      boxSizing: 'border-box',
                      cursor: 'pointer',
                      height: '38px'
                    }}
                  >
                    <option value="ViralFlow Blue">ViralFlow Blue (Default)</option>
                    <option value="Neon Green (Matrix)">Neon Green (Matrix)</option>
                    <option value="Stoic White (Georgia)">Stoic White (Georgia)</option>
                    <option value="Sunset Gold (Bold Impact)">Sunset Gold (Bold Impact)</option>
                    <option value="Vintage Rose">Vintage Rose</option>
                  </select>
                </div>

                {/* Broadcaster Platforms */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 'bold', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                    <Share2 size={12} style={{ color: '#38bdf8' }} />
                    <span>Broadcaster Platforms ({selectedBroadcasters.length}/8 Active)</span>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                    {[
                      { id: 'youtube', label: 'YOUTUBE', icon: YouTubeIcon },
                      { id: 'tiktok', label: 'TIKTOK', icon: TikTokIcon },
                      { id: 'instagram', label: 'INSTAGRAM', icon: InstagramIconComponent },
                      { id: 'facebook', label: 'FACEBOOK', icon: FacebookIconComponent },
                      { id: 'pinterest', label: 'PINTEREST', icon: PinterestIconComponent },
                      { id: 'twitter', label: 'X / TWITTER', icon: XIconComponent },
                      { id: 'linkedin', label: 'LINKEDIN', icon: LinkedInIconComponent },
                      { id: 'snapchat', label: 'SNAPCHAT', icon: SnapchatIconComponent }
                    ].map(net => {
                      const isSelected = selectedBroadcasters.includes(net.id);
                      const IconComp = net.icon;
                      return (
                        <button
                          key={net.id}
                          type="button"
                          onClick={() => toggleBroadcaster(net.id)}
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '10px 10px',
                            height: '42px',
                            background: isSelected 
                              ? 'linear-gradient(135deg, #2563eb 0%, #3b82f6 35%, #93c5fd 80%, #dbeafe 100%)' 
                              : '#1a1a1a',
                            border: isSelected ? '1px solid rgba(255,255,255,0.4)' : '1px solid #333',
                            borderRadius: '14px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            outline: 'none',
                            gap: '8px',
                            boxShadow: isSelected ? '0 2px 10px rgba(37, 99, 235, 0.3)' : 'none'
                          }}
                        >
                          <IconComp />
                          <span style={{ 
                            fontSize: '11px', 
                            fontWeight: 900, 
                            color: isSelected ? '#000000' : '#888888', 
                            whiteSpace: 'nowrap',
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase'
                          }}>
                            {net.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              // EXISTING CUSTOM VIDEO ENGINE UI
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {/* Collapsible Video Style Accordion Tab */}
                <div style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '10px', overflow: 'hidden' }}>
                  <button
                    type="button"
                    onClick={() => setIsVideoStyleOpen(!isVideoStyleOpen)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: 'rgba(255,255,255,0.02)',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      outline: 'none',
                      color: '#fff'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Layers size={14} style={{ color: '#38bdf8' }} />
                      <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Video Style (Optional)
                      </span>
                      <span style={{ fontSize: '10px', background: 'rgba(56,189,248,0.15)', color: '#38bdf8', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold', border: '1px solid rgba(56,189,248,0.3)' }}>
                        {videoFramework.split('(')[0].trim()}
                      </span>
                    </div>
                    <ChevronDown size={14} style={{ color: '#888', transition: 'transform 0.2s ease', transform: isVideoStyleOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                  </button>

                  {isVideoStyleOpen && (
                    <div style={{ padding: '12px', borderTop: '1px solid #2a2a2a', background: '#111', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                      {videoStyleOptions.map((opt) => {
                        const isSelected = videoFramework.startsWith(opt.title);
                        return (
                          <button
                            key={opt.title}
                            type="button"
                            onClick={() => {
                              setVideoFramework(opt.frameworkValue);
                              if (opt.defaultDuration) {
                                setVideoLength(opt.defaultDuration);
                              }
                            }}
                            style={{
                              padding: '10px 12px',
                              borderRadius: '8px',
                              border: isSelected ? '1px solid #38bdf8' : '1px solid #2a2a2a',
                              background: isSelected ? 'rgba(56,189,248,0.12)' : '#181818',
                              color: '#fff',
                              textAlign: 'left',
                              cursor: 'pointer',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '4px',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '6px' }}>
                              <span style={{ fontSize: '11px', fontWeight: 'bold', color: isSelected ? '#38bdf8' : '#fff' }}>
                                {opt.title}
                              </span>
                              {isSelected && <Check size={12} style={{ color: '#38bdf8' }} />}
                            </div>
                            <span style={{ fontSize: '10px', color: '#ffffff', opacity: 0.95, lineHeight: '1.2' }}>
                              {opt.desc}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '18px'
                }}>
                  {/* Left Column: Text Inputs */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 'bold', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                        <Tv size={12} style={{ color: '#38bdf8' }} />
                        <span>Open-Ended Video Prompt / Script Outline</span>
                      </div>
                      <textarea 
                        rows={4}
                        placeholder="Type any open-ended prompt, video concept, detailed outline, or target script ideas here... E.g. 'Create a high-energy video detailing 3 secret habits of self-made millionaires, starting with an intense hook about time audit...'"
                        value={customTopic}
                        onChange={(e) => setCustomTopic(e.target.value)}
                        style={{
                          width: '100%',
                          background: '#1a1a1a',
                          border: '1px solid #333',
                          color: '#fff',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          outline: 'none',
                          fontSize: '12px',
                          boxSizing: 'border-box',
                          fontFamily: 'sans-serif',
                          resize: 'vertical',
                          minHeight: '85px'
                        }}
                      />
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 'bold', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                        <Sparkles size={12} style={{ color: '#38bdf8' }} />
                        <span>Custom Hook (Optional)</span>
                      </div>
                      <input 
                        type="text"
                        placeholder="E.g., I'm sharing the absolute truth about..."
                        value={customHook}
                        onChange={(e) => setCustomHook(e.target.value)}
                        style={{
                          width: '100%',
                          background: '#1a1a1a',
                          border: '1px solid #333',
                          color: '#fff',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          outline: 'none',
                          fontSize: '12px',
                          boxSizing: 'border-box',
                          fontFamily: 'sans-serif'
                        }}
                      />
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 'bold', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                        <ArrowLeft size={12} style={{ color: '#38bdf8', transform: 'rotate(180deg)' }} />
                        <span>Custom Call to Action (CTA)</span>
                      </div>
                      <input 
                        type="text"
                        placeholder="E.g., Comment 'GROW' below for my exact guide"
                        value={customCTA}
                        onChange={(e) => setCustomCTA(e.target.value)}
                        style={{
                          width: '100%',
                          background: '#1a1a1a',
                          border: '1px solid #333',
                          color: '#fff',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          outline: 'none',
                          fontSize: '12px',
                          boxSizing: 'border-box',
                          fontFamily: 'sans-serif'
                        }}
                      />
                    </div>

                    {/* Full Thumbnail Upload & Preview Component */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 'bold', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                        <Video size={12} style={{ color: '#38bdf8' }} />
                        <span>Custom Thumbnail Cover (Upload or Auto-Generate)</span>
                      </div>
                      <div style={{
                        background: '#1a1a1a',
                        border: '1px dashed #444',
                        borderRadius: '8px',
                        padding: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px'
                      }}>
                        {thumbnailUrl ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%' }}>
                            <img 
                              src={thumbnailUrl} 
                              alt="Thumbnail Preview" 
                              style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #38bdf8' }} 
                            />
                            <div style={{ flex: 1 }}>
                              <span style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 'bold', display: 'block' }}>Custom Cover Attached</span>
                              <span style={{ fontSize: '10px', color: '#888' }}>Ready for multi-platform render</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => setThumbnailUrl(null)}
                              style={{ background: '#333', color: '#fff', border: 'none', borderRadius: '4px', padding: '4px 8px', fontSize: '10px', cursor: 'pointer' }}
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <Download size={16} style={{ color: '#888' }} />
                              <div>
                                <span style={{ fontSize: '11px', color: '#fff', fontWeight: 'bold', display: 'block' }}>Upload Thumbnail Image</span>
                                <span style={{ fontSize: '10px', color: '#666' }}>PNG, JPG or WEBP up to 5MB</span>
                              </div>
                            </div>
                            <label style={{
                              background: '#38bdf8',
                              color: '#000',
                              fontWeight: 'bold',
                              fontSize: '10px',
                              padding: '6px 10px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              textTransform: 'uppercase'
                            }}>
                              Browse
                              <input 
                                type="file" 
                                accept="image/*" 
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const url = URL.createObjectURL(file);
                                    setThumbnailUrl(url);
                                  }
                                }} 
                                style={{ display: 'none' }} 
                              />
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Selectors, Duration & Quantity */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 'bold', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                          <Mic size={12} style={{ color: '#38bdf8' }} />
                          <span>Voice Model</span>
                        </div>
                        <select 
                          value={voiceModel}
                          onChange={(e) => setVoiceModel(e.target.value)}
                          style={{
                            width: '100%',
                            background: '#1a1a1a',
                            border: '1px solid #333',
                            color: '#fff',
                            padding: '10px 12px',
                            borderRadius: '8px',
                            outline: 'none',
                            fontSize: '12px',
                            boxSizing: 'border-box',
                            cursor: 'pointer'
                          }}
                        >
                          <option>Adam (AI Male)</option>
                          <option>Serena (AI Female)</option>
                          <option>Marcus (Deep Narrative)</option>
                          <option>Lily (Energetic Short)</option>
                        </select>
                      </div>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 'bold', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                          <Sparkles size={12} style={{ color: '#38bdf8' }} />
                          <span>Audio Track</span>
                        </div>
                        <select 
                          value={musicTheme}
                          onChange={(e) => setMusicTheme(e.target.value)}
                          style={{
                            width: '100%',
                            background: '#1a1a1a',
                            border: '1px solid #333',
                            color: '#fff',
                            padding: '10px 12px',
                            borderRadius: '8px',
                            outline: 'none',
                            fontSize: '12px',
                            boxSizing: 'border-box',
                            cursor: 'pointer'
                          }}
                        >
                          <option>Cinematic Beats</option>
                          <option>Cyberpunk Bass</option>
                          <option>Financial Lo-Fi</option>
                          <option>Motivation Upbeat</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 'bold', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                        <Sparkles size={12} style={{ color: '#38bdf8' }} />
                        <span>Caption Style (Viral Vibe)</span>
                      </div>
                      <select 
                        value={captionStyle}
                        onChange={(e) => setCaptionStyle(e.target.value)}
                        style={{
                          width: '100%',
                          background: '#1a1a1a',
                          border: '1px solid #333',
                          color: '#fff',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          outline: 'none',
                          fontSize: '12px',
                          boxSizing: 'border-box',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="ViralFlow Blue">ViralFlow Blue (Default)</option>
                        <option value="Neon Green (Matrix)">Neon Green (Matrix)</option>
                        <option value="Stoic White (Georgia)">Stoic White (Georgia)</option>
                        <option value="Sunset Gold (Bold Impact)">Sunset Gold (Bold Impact)</option>
                        <option value="Vintage Rose">Vintage Rose</option>
                      </select>
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 'bold', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                        <Clock size={12} style={{ color: '#38bdf8' }} />
                        <span>Custom Video Length Duration (10 Minutes Maximum)</span>
                      </div>
                      <input 
                        type="text"
                        placeholder="10 Minutes Maximum"
                        value={videoLength}
                        onChange={(e) => setVideoLength(e.target.value)}
                        style={{
                          width: '100%',
                          background: '#1a1a1a',
                          border: '1px solid #333',
                          color: '#fff',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          outline: 'none',
                          fontSize: '12px',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 'bold', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                        <Share2 size={12} style={{ color: '#38bdf8' }} />
                        <span>Broadcaster Platforms ({selectedBroadcasters.length}/8 Active)</span>
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                        {[
                          { id: 'youtube', label: 'YOUTUBE', icon: YouTubeIcon },
                          { id: 'tiktok', label: 'TIKTOK', icon: TikTokIcon },
                          { id: 'instagram', label: 'INSTAGRAM', icon: InstagramIconComponent },
                          { id: 'facebook', label: 'FACEBOOK', icon: FacebookIconComponent },
                          { id: 'pinterest', label: 'PINTEREST', icon: PinterestIconComponent },
                          { id: 'twitter', label: 'X / TWITTER', icon: XIconComponent },
                          { id: 'linkedin', label: 'LINKEDIN', icon: LinkedInIconComponent },
                          { id: 'snapchat', label: 'SNAPCHAT', icon: SnapchatIconComponent }
                        ].map(net => {
                          const isSelected = selectedBroadcasters.includes(net.id);
                          const IconComp = net.icon;
                          return (
                            <button
                              key={net.id}
                              type="button"
                              onClick={() => toggleBroadcaster(net.id)}
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '10px 10px',
                                height: '42px',
                                background: isSelected 
                                  ? 'linear-gradient(135deg, #2563eb 0%, #3b82f6 35%, #93c5fd 80%, #dbeafe 100%)' 
                                  : '#1a1a1a',
                                border: isSelected ? '1px solid rgba(255,255,255,0.4)' : '1px solid #333',
                                borderRadius: '14px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                outline: 'none',
                                gap: '8px',
                                boxShadow: isSelected ? '0 2px 10px rgba(37, 99, 235, 0.3)' : 'none'
                              }}
                            >
                              <IconComp />
                              <span style={{ 
                                fontSize: '11px', 
                                fontWeight: 900, 
                                color: isSelected ? '#000000' : '#888888', 
                                whiteSpace: 'nowrap',
                                letterSpacing: '0.04em',
                                textTransform: 'uppercase'
                              }}>
                                {net.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Compile Scripts Button */}
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

                if (!customTopic.trim()) {
                  if (modeType === "long_form_clips") {
                    alert("Please enter a long-form video URL link first.");
                  } else {
                    alert("Please enter a custom video topic first.");
                  }
                  return;
                }
                startCompilation();
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
                marginTop: '10px'
              }}
            >
              <span>{modeType === "long_form_clips" ? "EXTRACT AUTO-CLIPS WITH AI" : "Generate AI Video"}</span>
              <Sparkles size={16} />
            </button>

            {isAdmin && (
              <button 
                type="button"
                onClick={() => {
                  if (!customTopic.trim()) {
                    if (modeType === "long_form_clips") {
                      alert("Please enter a long-form video URL link first.");
                    } else {
                      alert("Please enter a custom video topic first.");
                    }
                    return;
                  }
                  startCompilation();
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
                <span>Admin Bypass (Generate Video)</span>
                <Sparkles size={16} />
              </button>
            )}
          </div>
        )}

        {/* STEP 2: CONSOLE/GENERATION LOADING STATE */}
        {step === 'compilation' && (
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CloudLightning size={16} style={{ color: '#38bdf8', animation: 'pulse 1.5s infinite' }} />
                <span style={{ fontSize: '13px', fontWeight: 'bold' }}>
                  AUTO-GENERATING WITH SEO OPTIMIZATION
                </span>
              </div>
              <span style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 'bold' }}>{compilationProgress}%</span>
            </div>

            {/* Custom progress bar */}
            <div style={{ width: '100%', height: '4px', background: '#222', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: `${compilationProgress}%`, height: '100%', background: '#38bdf8', transition: 'width 0.3s ease' }} />
            </div>

            {/* Live compilation logs */}
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
              {compilationLogs.map((log, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  color: index === compilationLogs.length - 1 ? '#38bdf8' : '#888',
                  animation: 'fadeIn 0.2s ease-out'
                }}>
                  <span style={{ color: '#38bdf8' }}>&gt;</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: INTERACTIVE SCRIPT EDITOR SCREEN */}
        {step === 'validation' && generatedScripts.length > 0 && (
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
            {/* Top Selector & Info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                {generatedScripts.map((scr, idx) => (
                  <button 
                    key={scr.id}
                    onClick={() => setActiveScriptIdx(idx)}
                    style={{
                      background: activeScriptIdx === idx ? '#38bdf8' : '#1a1a1a',
                      color: activeScriptIdx === idx ? '#000' : '#fff',
                      border: activeScriptIdx === idx ? '1px solid #38bdf8' : '1px solid #333',
                      borderRadius: '6px',
                      padding: '4px 10px',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    Script #{scr.id}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '4px 10px', borderRadius: '8px' }}>
                <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  VALIDATION STAGE
                </span>
              </div>
            </div>

            {/* Editor Textareas with Rewrite buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Hook Section */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    1. Video Hook
                  </span>
                  <button 
                    onClick={() => handleSectionRewrite('hook')}
                    style={{
                      background: 'rgba(56, 189, 248, 0.1)',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      color: '#38bdf8',
                      borderRadius: '4px',
                      padding: '2px 8px',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <RefreshCw size={10} />
                    <span>Rewrite Hook</span>
                  </button>
                </div>
                <textarea 
                  value={generatedScripts[activeScriptIdx]?.hook || ''}
                  onChange={(e) => handleScriptChange('hook', e.target.value)}
                  style={{
                    width: '100%',
                    height: '42px',
                    background: '#1a1a1a',
                    border: '1px solid #333',
                    color: '#fff',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    outline: 'none',
                    fontSize: '12px',
                    boxSizing: 'border-box',
                    fontFamily: 'sans-serif',
                    resize: 'none'
                  }}
                />
              </div>

              {/* Body Section */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    2. Content Body
                  </span>
                  <button 
                    onClick={() => handleSectionRewrite('body')}
                    style={{
                      background: 'rgba(56, 189, 248, 0.1)',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      color: '#38bdf8',
                      borderRadius: '4px',
                      padding: '2px 8px',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <RefreshCw size={10} />
                    <span>Rewrite Body</span>
                  </button>
                </div>
                <textarea 
                  value={generatedScripts[activeScriptIdx]?.body || ''}
                  onChange={(e) => handleScriptChange('body', e.target.value)}
                  style={{
                    width: '100%',
                    height: '68px',
                    background: '#1a1a1a',
                    border: '1px solid #333',
                    color: '#fff',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    outline: 'none',
                    fontSize: '12px',
                    boxSizing: 'border-box',
                    fontFamily: 'sans-serif',
                    resize: 'none'
                  }}
                />
              </div>

              {/* CTA Section */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    3. Call to Action (CTA)
                  </span>
                  <button 
                    onClick={() => handleSectionRewrite('cta')}
                    style={{
                      background: 'rgba(56, 189, 248, 0.1)',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      color: '#38bdf8',
                      borderRadius: '4px',
                      padding: '2px 8px',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <RefreshCw size={10} />
                    <span>Rewrite CTA</span>
                  </button>
                </div>
                <textarea 
                  value={generatedScripts[activeScriptIdx]?.cta || ''}
                  onChange={(e) => handleScriptChange('cta', e.target.value)}
                  style={{
                    width: '100%',
                    height: '42px',
                    background: '#1a1a1a',
                    border: '1px solid #333',
                    color: '#fff',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    outline: 'none',
                    fontSize: '12px',
                    boxSizing: 'border-box',
                    fontFamily: 'sans-serif',
                    resize: 'none'
                  }}
                />
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
              <button 
                onClick={() => setStep('input')}
                style={{
                  flex: 1,
                  background: '#222',
                  border: '1px solid #333',
                  color: '#fff',
                  borderRadius: '8px',
                  padding: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                Back to Settings
              </button>
              <button 
                onClick={startVideoGeneration}
                style={{
                  flex: 2,
                  background: '#38bdf8',
                  color: '#000',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                <span>Approve & Generate Video</span>
                <Sparkles size={14} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: VIDEO GENERATION LOADING STATE */}
        {step === 'generation' && (
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CloudLightning size={16} style={{ color: '#38bdf8', animation: 'pulse 1.5s infinite' }} />
                <span style={{ fontSize: '13px', fontWeight: 'bold' }}>
                  RENDERING 9:16 VERTICAL HD VIDEO
                </span>
              </div>
              <span style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 'bold' }}>{generationProgress}%</span>
            </div>

            {/* Custom progress bar */}
            <div style={{ width: '100%', height: '4px', background: '#222', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: `${generationProgress}%`, height: '100%', background: '#38bdf8', transition: 'width 0.3s ease' }} />
            </div>

            {/* Live generation logs */}
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
              {generationLogs.map((log, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  color: index === generationLogs.length - 1 ? '#38bdf8' : '#888',
                  animation: 'fadeIn 0.2s ease-out'
                }}>
                  <span style={{ color: '#38bdf8' }}>&gt;</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5: PREVIEW & GALLERY SCREEN */}
        {step === 'preview' && generatedScripts.length > 0 && (
          <div style={{ 
            width: '635px', 
            background: '#111', 
            border: '1px solid #333', 
            borderRadius: '16px', 
            padding: '20px', 
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
                      color: activeScriptIdx === idx ? '#000' : '#fff',
                      border: activeScriptIdx === idx ? '1px solid #38bdf8' : '1px solid #333',
                      borderRadius: '6px',
                      padding: '4px 10px',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    Video #{scr.id}
                  </button>
                ))}
              </div>

              {/* Credit Balance */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '4px 10px', borderRadius: '8px' }}>
                <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Credits:
                </span>
                <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#fff' }}>{credits}</span>
              </div>
            </div>

            {/* Main side-by-side Video Player layout */}
            <div style={{ display: 'flex', gap: '15px' }}>
              
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
                  {/* Dynamic Subtitles matching framework and topic */}
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
                    💥 {videoFramework.toUpperCase()}: {customTopic.slice(0, 15).toUpperCase()}...
                  </p>
                  <p style={{
                    fontSize: '9px',
                    color: '#38bdf8',
                    textShadow: '1px 1px 0px #000',
                    fontWeight: 'bold',
                    margin: 0
                  }}>
                    #viral #{videoFramework.toLowerCase().replace(/[^a-z0-9]/g, '')} #custom
                  </p>
                </div>

                {/* Subtitles animation */}
                <div style={{
                  position: 'absolute',
                  top: '38%',
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
                        fontSize: '9px',
                        fontWeight: 'bold',
                        color: '#fff',
                        margin: '0 0 2px 0',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        LIVE CAPTION PREVIEW
                      </p>
                      <p style={{
                        fontSize: '11px',
                        color: '#38bdf8',
                        margin: 0,
                        fontWeight: 'bold',
                        lineHeight: '1.3'
                      }}>
                        "{generatedScripts[activeScriptIdx]?.hook}"
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
                padding: '4px 0'
              }}>
                {/* Channel Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div>
                    <span style={{ fontSize: '9px', fontWeight: 'bold', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      GENERATION COMPLETE
                    </span>
                    <h4 style={{ fontSize: '14px', fontWeight: 'bold', margin: '2px 0 4px 0', color: '#fff', textTransform: 'capitalize' }}>
                      {customTopic.slice(0, 28)}
                    </h4>
                    <p style={{ fontSize: '11px', color: '#888', margin: 0, lineHeight: '1.3' }}>
                      Custom AI series optimized with {videoFramework} framework.
                    </p>
                  </div>

                  {/* Metadata Grid */}
                  <div style={{
                    background: '#16161a',
                    border: '1px solid #222',
                    borderRadius: '8px',
                    padding: '8px 10px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '6px'
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '8px', color: '#555', fontWeight: 'bold', textTransform: 'uppercase' }}>FRAMEWORK</span>
                      <span style={{ fontSize: '10px', color: '#ccc', fontWeight: 'bold' }}>{videoFramework}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '8px', color: '#555', fontWeight: 'bold', textTransform: 'uppercase' }}>DURATION</span>
                      <span style={{ fontSize: '10px', color: '#ccc', fontWeight: 'bold' }}>{typeof videoLength === 'number' || !videoLength.toString().endsWith('m') ? videoLength + 's' : videoLength} Series</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '8px', color: '#555', fontWeight: 'bold', textTransform: 'uppercase' }}>FORMAT</span>
                      <span style={{ fontSize: '10px', color: '#ccc', fontWeight: 'bold' }}>9:16 Vertical HD</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '8px', color: '#555', fontWeight: 'bold', textTransform: 'uppercase' }}>VIRAL MATCH</span>
                      <span style={{ fontSize: '10px', color: '#38bdf8', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <TrendingUp size={10} />
                        {generatedScripts[activeScriptIdx]?.viralScore || 92}% Score
                      </span>
                    </div>
                  </div>

                  {/* Hook and CTA preview */}
                  <div style={{
                    background: '#0d0d0d',
                    border: '1px solid #222',
                    borderRadius: '8px',
                    padding: '8px 10px',
                    fontSize: '11px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}>
                    <div>
                      <strong style={{ color: '#38bdf8', fontSize: '9px' }}>ACTIVE HOOK:</strong>
                      <div style={{ color: '#ccc', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        "{generatedScripts[activeScriptIdx]?.hook}"
                      </div>
                    </div>
                    <div>
                      <strong style={{ color: '#38bdf8', fontSize: '9px' }}>ACTIVE CTA:</strong>
                      <div style={{ color: '#ccc', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        "{generatedScripts[activeScriptIdx]?.cta}"
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions Block */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
                  
                  {/* Download Video and Proceed & Distribute Side by Side */}
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
                      onClick={startDistribution}
                      style={{
                        flex: 1.3,
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
                      <span>PROCEED & DISTRIBUTE</span>
                    </button>
                  </div>

                  {/* Regenerate with 1 Credit Warning Box */}
                  <div style={{
                    borderTop: '1px solid #222',
                    paddingTop: '6px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}>
                    <button 
                      onClick={() => setShowConfirm(true)}
                      disabled={isRegenerating || credits < 1}
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
                        opacity: credits < 1 ? 0.5 : 1
                      }}
                    >
                      <RefreshCw size={11} className={isRegenerating ? "animate-spin" : ""} style={{ color: '#38bdf8' }} />
                      <span>REGENERATE SELECTED VIDEO</span>
                    </button>
                    <p style={{ fontSize: '9px', color: '#555', margin: '0', textAlign: 'center' }}>
                      * Regenerating this video consumes 1 credit
                    </p>
                  </div>

                  {/* New Session Button */}
                  <button
                    onClick={() => {
                      setStep('input');
                      setCustomTopic('');
                      setCustomHook('');
                      setCustomCTA('');
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
                    START NEW CUSTOM SESSION
                  </button>

                </div>
              </div>

            </div>
          </div>
        )}

        {/* STEP 4: DISTRIBUTION PROCESS & CHANNEL SYNDICATE INDICATORS */}
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

            {/* Back to Custom Mode Setup */}
            {distributeStatus === 'completed' && (
              <button
                onClick={() => {
                  setStep('input');
                  setCustomTopic('');
                  setCustomHook('');
                  setCustomCTA('');
                }}
                style={{
                  width: '100%',
                  background: '#38bdf8',
                  color: '#000',
                  fontWeight: 'bold',
                  padding: '12px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '12px',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  marginTop: '10px'
                }}
              >
                <CheckCircle2 size={14} />
                <span>START NEW CUSTOM SESSION</span>
              </button>
            )}
          </div>
        )}

      </div>

      {/* Credit warning popup confirmation modal */}
      {showConfirm && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
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
              Are you sure? This action will use <strong style={{ color: '#38bdf8' }}>1 credit</strong>.
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
  );
}
