import React, { useState, useEffect } from "react";
import { auth } from "../lib/firebase";
import { 
  Sparkles, 
  Calendar, 
  History, 
  Trash2, 
  Clock, 
  Layers, 
  AlertCircle,
  X,
  Sliders,
  Check,
  Loader2,
  Plus,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCw,
  ArrowRight,
  Instagram,
  Youtube,
  Facebook
} from "lucide-react";
import VideoWizard from "./VideoWizard";
import LivePreview from "./LivePreview";
import Stage5Pipeline from "./Stage5Pipeline";
import MagicMode from "./workflow/magic/MagicMode";
import CustomMode from "./workflow/custom/CustomMode";
import { checkGatekeeperBarrier } from "./workflow/Gatekeeper";
import { ShortFormPlatform, ScriptTone } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface VideoCreationWorkspaceProps {
  creationStep: number;
  setCreationStep: any;
  workspaceMode: "magic" | "custom";
  setWorkspaceMode: (mode: "magic" | "custom") => void;
  isGenerating: boolean;
  generatedScript: any;
  setGeneratedScript: (script: any) => void;
  topic: string;
  setTopic: (topic: string) => void;
  wizardDuration: number;
  setWizardDuration: (duration: number) => void;
  selectedWizardNiche: string;
  setSelectedWizardNiche: (niche: string) => void;
  customStep: number | null;
  setCustomStep: any;
  customWorkflowData: {
    tone: string;
    hookType: string;
    retentionElement: string;
    pacing: string;
    ctaFormulation: string;
  };
  setCustomWorkflowData: (data: any) => void;
  handleWorkflowSelected: any;
  handleGenerate: (e?: React.FormEvent, customTopic?: string, customDuration?: number) => void;
  error: string | null;
  setError: (error: string | null) => void;
  savedScripts: any[];
  setSavedScripts: (scripts: any[]) => void;
  scheduledQueue: any[];
  setScheduledQueue: any;
  dashboardSidebarTab: "library" | "queue" | "pipeline";
  setDashboardSidebarTab: (tab: "library" | "queue" | "pipeline") => void;
  handleOpenScheduler: (title: string) => void;
  selectHistoryItem: (item: any) => void;
  deleteHistoryItem: (id: string, e: React.MouseEvent) => void;
  activeUser: any;
  setIsPricingOpen: (open: boolean) => void;
  set_current_session_niche: (niche: string | null) => void;
  isAdvancedOpen: boolean;
  setIsAdvancedOpen: (open: boolean) => void;
  selectedPlatform: ShortFormPlatform;
  setSelectedPlatform: (platform: ShortFormPlatform) => void;
  selectedTone: ScriptTone;
  setSelectedTone: (tone: ScriptTone) => void;
  setRecentToast: any;
  isLoggedIn?: boolean;
}

interface ShadowChannel {
  id: string;
  name: string;
  platform: string;
  handle: string;
  iconColor: string;
}

export default function VideoCreationWorkspace({
  creationStep,
  setCreationStep,
  workspaceMode,
  setWorkspaceMode,
  isGenerating,
  generatedScript,
  setGeneratedScript,
  topic,
  setTopic,
  wizardDuration,
  setWizardDuration,
  selectedWizardNiche,
  setSelectedWizardNiche,
  customStep,
  setCustomStep,
  customWorkflowData,
  setCustomWorkflowData,
  handleWorkflowSelected,
  handleGenerate,
  error,
  setError,
  savedScripts,
  setSavedScripts,
  scheduledQueue,
  setScheduledQueue,
  dashboardSidebarTab,
  setDashboardSidebarTab,
  handleOpenScheduler,
  selectHistoryItem,
  deleteHistoryItem,
  activeUser,
  setIsPricingOpen,
  set_current_session_niche,
  isAdvancedOpen,
  setIsAdvancedOpen,
  selectedPlatform,
  setSelectedPlatform,
  selectedTone,
  setSelectedTone,
  setRecentToast,
  isLoggedIn = false,
}: VideoCreationWorkspaceProps) {

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

  const userEmail = (
    activeUser?.email || 
    auth.currentUser?.email || 
    localStorage.getItem("userEmail") || 
    localStorage.getItem("viralflow_user_email") || 
    ""
  ).trim().toLowerCase();

  const isAdmin = isPreviewEnvironment || (userEmail === "noamazar84@gmail.com");

  // --- STATE FOR VOLUME & LINKED CHANNELS ---
  const [videoQuantity, setVideoQuantity] = useState<number>(3);
  const [linkedChannels, setLinkedChannels] = useState<ShadowChannel[]>([
    { id: "tiktok_faceless_stoic", name: "Stoic Thoughts", platform: "TikTok", handle: "@stoic.thoughts", iconColor: "text-[#38bdf8]" },
    { id: "ig_ai_tech_hacks", name: "AI Tech Hacks", platform: "Instagram", handle: "@aitech.hacks", iconColor: "text-pink-500" },
    { id: "yt_wealth_secrets", name: "Wealth Secrets", platform: "YouTube Shorts", handle: "@wealthsecrets", iconColor: "text-red-500" },
    { id: "fb_daily_mindset", name: "Daily Mindset", platform: "Facebook Reels", handle: "@dailymindset", iconColor: "text-blue-500" }
  ]);
  const [selectedChannels, setSelectedChannels] = useState<string[]>(["tiktok_faceless_stoic", "ig_ai_tech_hacks"]);
  
  // Custom channel creation states
  const [isLinkingChannel, setIsLinkingChannel] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const [newChannelPlatform, setNewChannelPlatform] = useState("TikTok");
  const [newChannelHandle, setNewChannelHandle] = useState("");

  // Distribution engine animation states
  const [isDistributing, setIsDistributing] = useState(false);
  const [distributeProgress, setDistributeProgress] = useState<Record<string, number>>({});
  const [distributeStatus, setDistributeStatus] = useState<Record<string, "idle" | "uploading" | "success">>({});
  const [distributionCompleted, setDistributionCompleted] = useState(false);

  // Suggested topics database
  const suggestedTopicsByNiche: Record<string, string[]> = {
    "Finance & Wealth": [
      "The 3 money rules that the top 1% use to keep their wealth",
      "How inflation is secretly eating your savings (and how to stop it)",
      "The lazy investing strategy that beats 90% of hedge funds",
      "Why buying a house might be the worst financial decision you make",
      "The truth about index funds they don't want you to know",
      "3 assets you can buy for under $100 that pay you passive income",
      "How credit cards can make you rich if you play the system",
      "The difference between assets and liabilities explained in 45 seconds",
      "How to start investing in the stock market with just $10 a week",
      "The tax loophole that billionaires use to pay $0 in taxes",
      "Why a high salary won't make you rich (but this one thing will)",
      "3 financial habits you must build before turning 30",
      "The truth about cryptocurrency: scam or future of finance?",
      "How to build a $10,000 emergency fund in 6 months",
      "The worst money advice you've ever received (and why it's wrong)"
    ],
    "Fitness & Diet": [
      "The truth about keto: why you're not losing weight",
      "3 simple morning habits to boost your metabolism instantly",
      "Why cardio is ruining your muscle gains (do this instead)",
      "The perfect 10-minute home workout for busy people",
      "How to lose fat without counting a single calorie",
      "The dangerous diet myth you still believe in 2026",
      "How sleeping 8 hours a night can accelerate fat loss",
      "3 cheap high-protein foods you're not eating enough of",
      "Why stretching after a workout is actually hurting you",
      "How to build visible abs in 3 easy steps",
      "The raw truth about supplements: which ones actually work?",
      "How to stay hydrated: why 8 glasses of water is a lie",
      "The one exercises that will fix your bad posture forever",
      "How to overcome workout laziness with the 2-minute rule",
      "What happens to your body when you stop eating sugar for 14 days"
    ],
    "Tech & Future AI": [
      "3 free AI tools that feel illegal to know in 2026",
      "How to automate 90% of your business using simple AI agents",
      "The hidden Google Chrome extension that will save you hours of work",
      "Why coding is dead (and what you should learn instead)",
      "How to build a profitable mobile app with zero coding skills",
      "The future of AI: what the next 5 years will actually look like",
      "3 tech skills that will pay you over $100k without a degree",
      "How to protect your digital privacy from hackers in 60 seconds",
      "The best productivity setup: 3 gadgets that will upgrade your desk",
      "How AI is secretly changing the job market (and how to adapt)",
      "The ultimate smart home guide: 3 devices you actually need",
      "How a high schooler built a SaaS startup in a weekend using AI",
      "3 cybersecurity settings you need to change on your phone right now",
      "Why you should stop using ChatGPT and start using these instead",
      "How block-chain technology is quietly revolutionizing supply chains"
    ],
    "Motivation & Mindset": [
      "The brutal Stoic truth about why you're still unhappy",
      "How to build unbeatable discipline using the 5-second rule",
      "Why motivation is a lie (and why habits are everything)",
      "The daily routine of Marcus Aurelius for mental toughness",
      "How to overcome the fear of failure in 3 simple steps",
      "Why comfortable lives are secretly destroying your potential",
      "How to rewire your brain to love doing hard things",
      "The one question that will instantly cure your procrastination",
      "How to practice mindfulness when you don't have time to meditate",
      "Why you should stop caring about other people's opinions",
      "The psychology of focus: how to enter deep work in 5 minutes",
      "3 books that will completely change how you view life",
      "How to handle extreme stress: the Navy SEAL breathing technique",
      "Why saying 'NO' is the ultimate superpower for productivity",
      "What happens when you isolate yourself from social media for 30 days"
    ],
    "Business & Startups": [
      "How to start a highly profitable side hustle with $0 capital",
      "The secret marketing trick that top brands use to control you",
      "Why most startups fail in the first 12 months (and how to avoid it)",
      "How to find high-paying freelance clients in less than a week",
      "The ultimate guide to bootstrapping your first micro-business",
      "Why you don't need a business degree to build a profitable company",
      "How to write a copy that sells anything to anyone in 30 seconds",
      "The power of pricing: how to double your revenue overnight",
      "How to build a personal brand that attracts opportunities on autopilot",
      "3 digital business models you can start from your bedroom",
      "How to negotiate a higher salary or deal with confidence",
      "Why you should stop focusing on ideas and start focusing on execution",
      "The secret structure of viral TikTok ads that convert",
      "How to build a remote team that actually gets work done",
      "The one business skill that will guarantee you never go broke"
    ],
    "Travel & Exploration": [
      "3 gorgeous hidden islands in Europe you've never heard of",
      "How to travel the world for free using credit card points",
      "The cheapest travel destinations with 5-star luxury vibes",
      "Why you should stop visiting tourist traps (and go here instead)",
      "How to packing everything you need in a single carry-on bag",
      "The best travel hacks that will save you hundreds on flights",
      "How to survive a 15-hour flight: the ultimate checklist",
      "3 secret booking websites that hotels don't want you to know",
      "The most dangerous cities for solo travelers (and how to stay safe)",
      "How to find cheap flights on Google Flights using this one trick",
      "Why traveling solo is the ultimate self-discovery hack",
      "3 breathtaking road trips you need to take before you die",
      "How to work remotely from any beach in the world",
      "The hidden cost of digital nomad life that nobody talks about",
      "How to experience Japan like a local (not a tourist)"
    ],
    "Human Psychology": [
      "3 dark psychology tricks to instantly read anyone's mind",
      "How to tell if someone is lying to you in 3 seconds",
      "The Benjamin Franklin effect: how to make anyone like you",
      "Why your brain is secretly hardwired to make bad decisions",
      "How to use silent pauses to win any debate or argument",
      "The halo effect: why attractive people get away with everything",
      "How to build instant trust with strangers using body language",
      "Why we love gossip (and what it says about your personality)",
      "The psychology of color: how brands control your emotions",
      "How to cure imposter syndrome with cognitive reframing",
      "Why we get addicted to notifications (the dopamine loop)",
      "How to spot a toxic person before they ruin your life",
      "The power of active listening: how to make people feel heard",
      "Why your memories are actually 50% fake (and how memory works)",
      "How to use positive reinforcement to change anyone's behavior"
    ],
    "Science & Space": [
      "What actually happens if you fall into a black hole?",
      "3 terrifying space facts that will keep you awake at night",
      "How close are we actually to finding alien life?",
      "The quantum mechanics trick that explains telepathy (or does it?)",
      "Why time dilation is the closest thing we have to time travel",
      "What is dark matter? The mystery that makes up 85% of our universe",
      "How a single solar flare could wipe out the internet forever",
      "The scale of the universe: how small we actually are",
      "Could we survive a trip to Mars? The scientific truth",
      "Why the ocean is more mysterious than outer space",
      "The speed of light: why it's the absolute speed limit of physics",
      "How stars are born and die: the beautiful cycle of cosmic life",
      "What is the multiverse theory? The science of infinite realities",
      "How quantum computers will change the world in your lifetime",
      "The secret science behind sleep: what your brain does at night"
    ],
    "Pop Culture & Media": [
      "The dark unreleased ending of your favorite childhood movie",
      "How anime is secretly taking over global pop culture",
      "Why Marvel movies are losing their magic (and how to fix them)",
      "The hidden messages in Disney films you definitely missed",
      "How streaming platforms are quietly changing how stories are told",
      "The real-world history that inspired Game of Thrones",
      "Why vinyl records are making a massive comeback in the digital age",
      "The psychological reason why we are obsessed with true crime",
      "How meme culture is quietly shaping modern political campaigns",
      "The greatest plot twist in television history explained",
      "Why movie theater popcorn is priced so high (the business of cinema)",
      "The evolution of video game graphics: from pixels to reality",
      "How music streaming algorithms decide what you listen to next",
      "The secret theory that connects all Pixar movies into one timeline",
      "Why retro fashion and aesthetics are dominating Gen-Z trends"
    ],
    "Untold History": [
      "The brilliant ancient strategist who defeated an army with smoke",
      "3 terrifying historical events that feel like science fiction",
      "The truth about the Library of Alexandria: what was actually lost?",
      "How a single translation error almost started a world war",
      "The secret societies of ancient Rome you've never heard of",
      "The richest person in history (no, it wasn't Elon Musk)",
      "How ancient Egyptians actually built the Pyramids (the latest science)",
      "The mystery of the Roanoke colony: what happened to the settlers?",
      "The bizarre dancing plague of 1518 that killed dozens",
      "How a pirate queen ruled the South China Sea with 80,000 men",
      "The secret history of the Trojan Horse: was it actually a boat?",
      "Why ancient Romans used urine as mouthwash (the history of hygiene)",
      "The samurai who traveled to Rome in the 17th century",
      "How coffee houses in Europe started the Age of Enlightenment",
      "The real-world city of Atlantis: where historians are looking"
    ]
  };

  // --- PROGRESSIVE METRIC GENERATOR ---
  const [overallProgress, setOverallProgress] = useState(0);
  const [pipelineMetrics, setPipelineMetrics] = useState({
    script: 0,
    voiceover: 0,
    music: 0,
    captions: 0,
    visuals: 0
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isGenerating) {
      setOverallProgress(0);
      setPipelineMetrics({ script: 0, voiceover: 0, music: 0, captions: 0, visuals: 0 });
      
      const updateMetrics = () => {
        setOverallProgress((prev) => {
          if (prev >= 100) return 100;
          const next = prev + 1;
          
          // Partition metrics
          setPipelineMetrics({
            script: Math.min(100, Math.floor(next * 4)),
            voiceover: Math.min(100, Math.floor(Math.max(0, (next - 15) * 3))),
            music: Math.min(100, Math.floor(Math.max(0, (next - 35) * 2.5))),
            captions: Math.min(100, Math.floor(Math.max(0, (next - 55) * 3))),
            visuals: Math.min(100, Math.floor(Math.max(0, (next - 75) * 4)))
          });
          
          return next;
        });
      };
      
      timer = setInterval(updateMetrics, 80);
    }
    return () => clearInterval(timer);
  }, [isGenerating]);

  // Handle adding a new mock channel
  const handleAddChannel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChannelName || !newChannelHandle) return;
    
    const formattedHandle = newChannelHandle.startsWith("@") ? newChannelHandle : `@${newChannelHandle}`;
    const newChan: ShadowChannel = {
      id: `custom_channel_${Date.now()}`,
      name: newChannelName,
      platform: newChannelPlatform,
      handle: formattedHandle,
      iconColor: newChannelPlatform === "TikTok" ? "text-[#38bdf8]" :
                 newChannelPlatform === "Instagram" ? "text-pink-500" :
                 newChannelPlatform === "YouTube" ? "text-red-500" : "text-blue-500"
    };

    setLinkedChannels([...linkedChannels, newChan]);
    setSelectedChannels([...selectedChannels, newChan.id]);
    
    // Reset form
    setNewChannelName("");
    setNewChannelHandle("");
    setIsLinkingChannel(false);
    
    setRecentToast({
      message: "Channel Synced Successfully",
      sub: `${newChannelPlatform} channel ${formattedHandle} is now securely integrated.`
    });
  };

  // Handle Channel checkbox selection
  const toggleChannelSelection = (id: string) => {
    if (selectedChannels.includes(id)) {
      setSelectedChannels(selectedChannels.filter(c => c !== id));
    } else {
      setSelectedChannels([...selectedChannels, id]);
    }
  };

  // Run Distribution Engine publisher animation
  const runDistribution = async () => {
    if (selectedChannels.length === 0) return;

    // Premium Wall: Free users are gated on publishing actions using the central Gatekeeper
    if (checkGatekeeperBarrier("stage_7", activeUser, setIsPricingOpen)) {
      return;
    }

    setIsDistributing(true);
    setDistributionCompleted(false);
    
    const initialProgress: Record<string, number> = {};
    const initialStatus: Record<string, "idle" | "uploading" | "success"> = {};
    
    selectedChannels.forEach(cId => {
      initialProgress[cId] = 0;
      initialStatus[cId] = "idle";
    });
    setDistributeProgress(initialProgress);
    setDistributeStatus(initialStatus);

    for (let i = 0; i < selectedChannels.length; i++) {
      const cId = selectedChannels[i];
      const channel = linkedChannels.find(c => c.id === cId);
      if (!channel) continue;

      // Mark uploading
      setDistributeStatus(prev => ({ ...prev, [cId]: "uploading" }));

      // Progress bar simulation
      for (let p = 0; p <= 100; p += 10) {
        setDistributeProgress(prev => ({ ...prev, [cId]: p }));
        await new Promise(r => setTimeout(r, 120));
      }

      // Mark success
      setDistributeStatus(prev => ({ ...prev, [cId]: "success" }));
      await new Promise(r => setTimeout(r, 200));
    }

    setIsDistributing(false);
    setDistributionCompleted(true);
    setRecentToast({
      message: "Campaign Distributed!",
      sub: `Successfully synchronized ${selectedChannels.length} shadow channels.`
    });
  };

  const hasActiveSession = isGenerating || generatedScript;

  // Determine Niche-based topics
  const suggestedTopicsList = suggestedTopicsByNiche[selectedWizardNiche] || [
    `Unlocking the secrets of ${selectedWizardNiche || "this niche"} that they keep hidden...`,
    `How to master ${selectedWizardNiche || "this niche"} in under 30 days...`,
    `Why standard advice about ${selectedWizardNiche || "this niche"} is completely wrong...`
  ];

  const [activeHashMode, setActiveHashMode] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHashMode(window.location.hash);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const DefaultDashboard = () => {
    return (
      <div className="space-y-6 flex-1 flex flex-col font-sans">
      
      {/* Progress Stepper (Only visible during setup/compilation) */}
      {!hasActiveSession && (
        <div className="w-full max-w-2xl mx-auto mb-2 bg-[#0A0A0C]/80 border border-white/[0.04] p-4 rounded-2xl">
          <div className="flex items-center justify-between relative px-4">
            <div className="absolute left-10 right-10 top-5 h-[2px] bg-white/[0.03] z-0" />
            <div 
              className="absolute left-10 top-5 h-[2px] bg-gradient-to-r from-[#38bdf8] to-blue-500 transition-all duration-500 z-0" 
              style={{ 
                width: workspaceMode === "magic" 
                  ? `${((creationStep - 1) / 3) * 82}%` 
                  : `${((creationStep - 1) / 2) * 82}%`
              }}
            />

            {(workspaceMode === "magic" ? [
              { step: 1, label: "Niche" },
              { step: 2, label: "Volume" },
              { step: 3, label: "Topics" },
              { step: 4, label: "Compile" }
            ] : [
              { step: 1, label: "Niche" },
              { step: 2, label: "Configure" },
              { step: 3, label: "Compile" }
            ]).map((item) => (
              <button
                key={item.step}
                type="button"
                disabled={item.step > (selectedWizardNiche ? (workspaceMode === "magic" ? 3 : 2) : 1) || isGenerating}
                onClick={() => {
                  if (item.step === 1) {
                    set_current_session_niche(null);
                    setSelectedWizardNiche("");
                    setCustomStep(null);
                    setCreationStep(1);
                  } else if (item.step === 2) {
                    setCustomStep(1);
                    setCreationStep(2);
                  } else if (item.step === 3) {
                    setCreationStep(3);
                  }
                }}
                className="relative z-10 flex flex-col items-center group cursor-pointer focus:outline-none border-none bg-transparent"
              >
                <div className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-mono font-black border transition-all duration-300 ${
                  creationStep === item.step
                    ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                    : creationStep > item.step
                    ? "bg-[#38bdf8] text-black border-[#38bdf8]"
                    : "bg-[#050508] border-white/10 text-slate-500"
                }`}>
                  {item.step}
                </div>
                <span className={`text-[9px] font-mono font-bold uppercase tracking-wider mt-2 transition-colors ${
                  creationStep === item.step ? "text-white" : "text-slate-500 group-hover:text-slate-400"
                }`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 1: NICHE SELECTION */}
      {creationStep === 1 && !hasActiveSession && (
        <VideoWizard 
          onNicheSelected={(nicheName) => {
            setSelectedWizardNiche(nicheName);
            set_current_session_niche(nicheName);
            setCreationStep(2);
            if (workspaceMode === "custom") {
              setCustomStep(1);
            }
          }}
        />
      )}

      {/* STEP 2: CONFIGURATION */}
      {creationStep === 2 && !hasActiveSession && (
        workspaceMode === "magic" ? (
          /* MAGIC MODE STEP 2: VOLUME & CHANNELS */
          <div className="space-y-6 max-w-2xl mx-auto w-full text-left animate-[fadeIn_0.15s_ease-out]">
            <div className="border-b border-white/[0.04] pb-4 flex justify-between items-center">
              <div>
                <span className="text-[9px] font-mono font-bold text-brand-cyan bg-[#38bdf8]/5 border border-[#38bdf8]/15 px-2.5 py-0.5 rounded uppercase tracking-widest">
                  Step 2 of 4
                </span>
                <h2 className="text-lg sm:text-xl font-black font-sans text-white mt-2 uppercase tracking-tight">
                  Configure Campaign Volume & Channels
                </h2>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">
                  Define series duration, campaign video quantity, and select which shadow channels the execution engine targets.
                </p>
              </div>
            </div>

            {/* DURATION SELECTOR */}
            <div className="p-4 rounded-xl bg-[#08080A] border border-white/[0.03] space-y-3.5">
              <h3 className="text-xs font-mono font-bold text-[#38bdf8] uppercase tracking-wider">
                1. Campaign Duration
              </h3>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { value: 15, label: "15s", desc: "Micro hook" },
                  { value: 30, label: "30s", desc: "Retention" },
                  { value: 45, label: "45s", desc: "Paced" },
                  { value: 60, label: "60s", desc: "Deep story" }
                ].map((d) => (
                  <button
                    key={d.value}
                    type="button"
                    onClick={() => setWizardDuration(d.value)}
                    className={`p-3 rounded-lg border text-left transition-all cursor-pointer focus:outline-none flex flex-col justify-between ${
                      wizardDuration === d.value
                        ? "border-[#38bdf8] bg-[#38bdf8]/5 shadow-[0_0_12px_rgba(56, 189, 248, 0.1)]"
                        : "border-white/5 bg-slate-950/40 hover:border-white/10 hover:bg-slate-950/80"
                    }`}
                  >
                    <span className={`text-[11px] font-black uppercase ${
                      wizardDuration === d.value ? "text-[#38bdf8]" : "text-white"
                    }`}>
                      {d.label}
                    </span>
                    <span className="text-[9px] text-slate-500 block mt-0.5">{d.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* VIDEO QUANTITY */}
            <div className="p-4 rounded-xl bg-[#08080A] border border-white/[0.03] space-y-3.5">
              <h3 className="text-xs font-mono font-bold text-[#38bdf8] uppercase tracking-wider">
                2. Video Series Volume
              </h3>
              <p className="text-[10px] text-slate-500 leading-normal">
                Determine the total volume of customized video scripts to auto-generate for this campaign topic. 1 video = 1 credit flat rate.
              </p>
              <div className="grid grid-cols-4 gap-3">
                {[1, 3, 5, 10].map((qty) => (
                  <button
                    key={qty}
                    type="button"
                    onClick={() => setVideoQuantity(qty)}
                    className={`py-3 px-4 rounded-lg border text-center transition-all cursor-pointer font-sans font-black text-xs uppercase tracking-wider focus:outline-none ${
                      videoQuantity === qty
                        ? "border-[#38bdf8] bg-[#38bdf8]/5 text-[#38bdf8] shadow-[0_0_12px_rgba(56, 189, 248, 0.1)]"
                        : "border-white/5 bg-slate-950/40 text-slate-400 hover:text-white hover:border-white/10 hover:bg-slate-950/80"
                    }`}
                  >
                    {qty} {qty === 1 ? "Video" : "Videos"}
                  </button>
                ))}
              </div>
            </div>

            {/* SHADOW CHANNELS */}
            <div className="p-4 rounded-xl bg-[#08080A] border border-white/[0.03] space-y-3.5">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-mono font-bold text-[#38bdf8] uppercase tracking-wider">
                  3. Connected Shadow Channels
                </h3>
                <button
                  type="button"
                  onClick={() => setIsLinkingChannel(true)}
                  className="px-2.5 py-1 rounded border border-white/10 hover:border-[#38bdf8]/40 text-slate-400 hover:text-[#38bdf8] font-mono text-[9px] font-bold uppercase tracking-wider bg-transparent cursor-pointer flex items-center gap-1 focus:outline-none"
                >
                  <Plus className="h-3 w-3" />
                  <span>Link Channel</span>
                </button>
              </div>

              {/* Linking dialog/form */}
              {isLinkingChannel && (
                <form onSubmit={handleAddChannel} className="p-3 border border-white/5 bg-black/60 rounded-lg space-y-3.5 animate-[fadeIn_0.15s_ease-out]">
                  <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Secure Link Shadow Channel</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-slate-500 uppercase block">Channel Nickname</span>
                      <input
                        type="text"
                        placeholder="Stoic Thoughts"
                        required
                        value={newChannelName}
                        onChange={(e) => setNewChannelName(e.target.value)}
                        className="w-full bg-slate-950 border border-white/5 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#38bdf8]"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-slate-500 uppercase block">Platform</span>
                      <select
                        value={newChannelPlatform}
                        onChange={(e) => setNewChannelPlatform(e.target.value)}
                        className="w-full bg-slate-950 border border-white/5 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#38bdf8]"
                      >
                        <option value="TikTok">TikTok</option>
                        <option value="Instagram">Instagram Reels</option>
                        <option value="YouTube">YouTube Shorts</option>
                        <option value="Facebook">Facebook Reels</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-slate-500 uppercase block">Handle / Username</span>
                      <input
                        type="text"
                        placeholder="@stoic.thoughts"
                        required
                        value={newChannelHandle}
                        onChange={(e) => setNewChannelHandle(e.target.value)}
                        className="w-full bg-slate-950 border border-white/5 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#38bdf8]"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-1 border-t border-white/[0.03]">
                    <button
                      type="button"
                      onClick={() => setIsLinkingChannel(false)}
                      className="px-2.5 py-1.5 rounded text-[9px] font-mono uppercase font-bold text-slate-500 hover:text-white bg-transparent border-none cursor-pointer focus:outline-none"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 rounded text-[9px] font-mono uppercase font-black bg-[#38bdf8] text-black hover:bg-[#38bdf8]/90 border-none cursor-pointer focus:outline-none"
                    >
                      Link Account
                    </button>
                  </div>
                </form>
              )}

              {/* Channels Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {linkedChannels.map((chan) => (
                  <div
                    key={chan.id}
                    onClick={() => toggleChannelSelection(chan.id)}
                    className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                      selectedChannels.includes(chan.id)
                        ? "border-[#38bdf8]/40 bg-[#38bdf8]/2"
                        : "border-white/[0.03] bg-transparent hover:border-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`h-8 w-8 rounded-full bg-white/[0.02] border border-white/[0.05] flex items-center justify-center ${chan.iconColor}`}>
                        {chan.platform === "Instagram" ? <Instagram className="h-4 w-4" /> :
                         chan.platform === "YouTube" ? <Youtube className="h-4 w-4" /> :
                         chan.platform === "Facebook" ? <Facebook className="h-4 w-4" /> :
                         <span className="text-[10px] font-black font-sans">TT</span>}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white leading-normal">{chan.name}</h4>
                        <span className="text-[9px] font-mono text-slate-500 leading-normal">{chan.handle}</span>
                      </div>
                    </div>
                    <div className={`h-4.5 w-4.5 rounded-md border flex items-center justify-center transition-all ${
                      selectedChannels.includes(chan.id)
                        ? "border-[#38bdf8] bg-[#38bdf8] text-black"
                        : "border-white/15 bg-slate-950"
                    }`}>
                      {selectedChannels.includes(chan.id) && <Check className="h-3 w-3" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CONTINUE */}
            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setCreationStep(3)}
                className="group px-7 py-3 rounded-xl text-xs font-sans font-black uppercase tracking-wider bg-white text-black hover:bg-neutral-200 transition-all cursor-pointer flex items-center gap-1.5 border-none outline-none"
              >
                <span>Continue to Topics</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        ) : (
          /* CUSTOM MODE STEP 2: 6-STEP CONFIGURATION */
          <div className="space-y-6 flex-1 flex flex-col justify-start py-4">
            <div className="flex items-center justify-between border-b border-white/[0.04] pb-4">
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-bold text-amber-400 bg-amber-400/5 border border-amber-400/15 px-2.5 py-0.5 rounded uppercase tracking-widest">
                    Custom Manual Mode
                  </span>
                  <span className="text-[9px] font-mono font-bold text-brand-cyan bg-[#38bdf8]/5 border border-[#38bdf8]/15 px-2.5 py-0.5 rounded uppercase tracking-widest">
                    Niche: {selectedWizardNiche}
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-black font-sans text-white mt-1.5 uppercase tracking-tight font-sans">
                  Step {customStep || 1} of 6: {
                    customStep === 1 ? "Select Viral Tone" :
                    customStep === 2 ? "Hook Strategy" :
                    customStep === 3 ? "Retention Triggers" :
                    customStep === 4 ? "Video Pacing" :
                    customStep === 5 ? "Interactive Call-to-Action" :
                    "Review & Compile Pipeline"
                  }
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setCustomStep(null);
                  setCreationStep(1);
                }}
                className="px-3 py-1.5 text-[10px] font-mono font-bold text-slate-400 hover:text-white border border-slate-850 hover:border-slate-800 rounded-lg bg-transparent transition-all cursor-pointer uppercase focus:outline-none"
              >
                ← Back to Niche
              </button>
            </div>

            {/* Step Visual Progress Track */}
            <div className="flex items-center justify-between px-2 max-w-md mx-auto w-full py-2">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div key={num} className="flex items-center flex-1 last:flex-none">
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-mono font-bold border transition-all ${
                      (customStep || 1) === num
                        ? "bg-amber-400 border-amber-400 text-black shadow-[0_0_12px_rgba(251,191,36,0.3)]"
                        : (customStep || 1) > num
                        ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                        : "bg-slate-950 border-white/5 text-slate-500"
                    }`}
                  >
                    {num}
                  </div>
                  {num < 6 && (
                    <div
                      className={`h-[2px] flex-1 mx-2 transition-all ${
                        (customStep || 1) > num ? "bg-emerald-500/30" : "bg-white/5"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step Contents */}
            <div className="bg-[#09090C] border border-white/[0.04] rounded-2xl p-6 flex-1 flex flex-col justify-between min-h-[300px]">
              
              {(customStep === 1 || !customStep) && (
                <div className="space-y-4 text-left animate-[fadeIn_0.15s_ease-out]">
                  <p className="text-xs text-slate-400">
                    Select the overall emotional and intellectual delivery style of your short-form video script.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {[
                      { id: "Controversial", title: "Controversial Debate", desc: "Bold, scroll-stopping openings that challenge standard thinking." },
                      { id: "Mysterious", title: "Mysterious Lore", desc: "Intriguing, secret-revealing storytelling that keeps viewers on edge." },
                      { id: "Educational", title: "Educational Hack", desc: "Clear, authoritative, and direct high-value hacks or tips." },
                      { id: "Motivational", title: "Disruptive Motivation", desc: "Intense energy, stoicism, and no-excuses discipline triggers." }
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setCustomWorkflowData({ ...customWorkflowData, tone: item.id });
                          setSelectedTone(item.id as ScriptTone);
                        }}
                        className={`p-4 rounded-xl border text-left cursor-pointer transition-all focus:outline-none ${
                          customWorkflowData.tone === item.id
                            ? "border-amber-400 bg-amber-400/5 shadow-[0_0_15px_rgba(251,191,36,0.08)]"
                            : "border-white/5 bg-slate-950/40 hover:border-white/10 hover:bg-slate-950/80"
                        }`}
                      >
                        <span className="text-xs font-black text-white uppercase tracking-wider block">{item.title}</span>
                        <span className="text-[10px] text-slate-400 leading-normal block mt-1.5">{item.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {customStep === 2 && (
                <div className="space-y-4 text-left animate-[fadeIn_0.15s_ease-out]">
                  <p className="text-xs text-slate-400">
                    Choose the psychological vector of your first 5 seconds to guarantee maximum scroll retention.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {[
                      { id: "Negative Hook", title: "The Negative Counter-Hook", desc: "\"Stop wasting time on X...\" or \"You've been lied to about...\"" },
                      { id: "Story Hook", title: "The Instant Curiosity Story", desc: "\"This one simple pattern changed my life in 48 hours...\"" },
                      { id: "Secret Reveal Hook", title: "The Confidential Disclosure", desc: "\"Here is the secret blueprint that the 1% actively hides...\"" },
                      { id: "Authority Call Hook", title: "Targeted Audience Summon", desc: "\"If you are a builder with $0 capital, stop scrolling now...\"" }
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setCustomWorkflowData({ ...customWorkflowData, hookType: item.id })}
                        className={`p-4 rounded-xl border text-left cursor-pointer transition-all focus:outline-none ${
                          customWorkflowData.hookType === item.id
                            ? "border-amber-400 bg-amber-400/5 shadow-[0_0_15px_rgba(251,191,36,0.08)]"
                            : "border-white/5 bg-slate-950/40 hover:border-white/10 hover:bg-slate-950/80"
                        }`}
                      >
                        <span className="text-xs font-black text-white uppercase tracking-wider block">{item.title}</span>
                        <span className="text-[10px] text-slate-400 leading-normal block mt-1.5">{item.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {customStep === 3 && (
                <div className="space-y-4 text-left animate-[fadeIn_0.15s_ease-out]">
                  <p className="text-xs text-slate-400">
                    Add interactive visual retention pacing tricks to maintain focus throughout the video duration.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {[
                      { id: "Quick-cut pattern", title: "Dynamic Sound Effects & Cuts", desc: "High kinetic editing tempo with custom audio transitions." },
                      { id: "Visual loops", title: "Visual Loops & Zoom Effects", desc: "Subtle continuous focal zooming with smooth loop templates." },
                      { id: "Dual narrative", title: "Split-Screen Narrative Sync", desc: "Dual complementary streams synced together for maximized focus density." },
                      { id: "Interactive widgets", title: "Polls & Micro Interactive Stems", desc: "In-flow callouts encouraging active comments and engagement hooks." }
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setCustomWorkflowData({ ...customWorkflowData, retentionElement: item.id })}
                        className={`p-4 rounded-xl border text-left cursor-pointer transition-all focus:outline-none ${
                          customWorkflowData.retentionElement === item.id
                            ? "border-amber-400 bg-amber-400/5 shadow-[0_0_15px_rgba(251,191,36,0.08)]"
                            : "border-white/5 bg-slate-950/40 hover:border-white/10 hover:bg-slate-950/80"
                        }`}
                      >
                        <span className="text-xs font-black text-white uppercase tracking-wider block">{item.title}</span>
                        <span className="text-[10px] text-slate-400 leading-normal block mt-1.5">{item.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {customStep === 4 && (
                <div className="space-y-4 text-left animate-[fadeIn_0.15s_ease-out]">
                  <p className="text-xs text-slate-400">
                    Define the speech speed and text display rhythm of the generated video captions.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {[
                      { id: "Fast", title: "Aggressive (160 BPM)", desc: "High intensity kinetic typography & word-by-word flashing." },
                      { id: "Balanced", title: "Balanced (120 BPM)", desc: "Natural conversational rhythm with aesthetic highlighted focus groups." },
                      { id: "Chill", title: "Chill/Lo-Fi (90 BPM)", desc: "Relaxed editorial spacing with continuous cinematic font lines." }
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setCustomWorkflowData({ ...customWorkflowData, pacing: item.id })}
                        className={`p-4 rounded-xl border text-left cursor-pointer transition-all focus:outline-none ${
                          customWorkflowData.pacing === item.id
                            ? "border-amber-400 bg-amber-400/5 shadow-[0_0_15px_rgba(251,191,36,0.08)]"
                            : "border-white/5 bg-slate-950/40 hover:border-white/10 hover:bg-slate-950/80"
                        }`}
                      >
                        <span className="text-xs font-black text-white uppercase tracking-wider block">{item.title}</span>
                        <span className="text-[10px] text-slate-400 leading-normal block mt-1.5">{item.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {customStep === 5 && (
                <div className="space-y-4 text-left animate-[fadeIn_0.15s_ease-out]">
                  <p className="text-xs text-slate-400">
                    Choose how the video closes to trigger automated DM replies and absolute algorithmic traction.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {[
                      { id: "Controversial debate", title: "The Comment Debate", desc: "\"Comment your opinion below: Is this the ultimate hack or a lie?\"" },
                      { id: "Lead generation", title: "Keyword Lead Magnet", desc: "\"Comment BLUEPRINT below and my AI will auto-DM you the full link...\"" },
                      { id: "Algorithmic mystery", title: "Algorithmic Curio Loop", desc: "\"Wait for part 2, or click the bio link to unlock the raw dataset immediately...\"" },
                      { id: "Authoritative CTA", title: "Direct Value Command", desc: "\"Save this clip immediately so you can reference these steps tomorrow.\"" }
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setCustomWorkflowData({ ...customWorkflowData, ctaFormulation: item.id })}
                        className={`p-4 rounded-xl border text-left cursor-pointer transition-all focus:outline-none ${
                          customWorkflowData.ctaFormulation === item.id
                            ? "border-amber-400 bg-amber-400/5 shadow-[0_0_15px_rgba(251,191,36,0.08)]"
                            : "border-white/5 bg-slate-950/40 hover:border-white/10 hover:bg-slate-950/80"
                        }`}
                      >
                        <span className="text-xs font-black text-white uppercase tracking-wider block">{item.title}</span>
                        <span className="text-[10px] text-slate-400 leading-normal block mt-1.5">{item.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {customStep === 6 && (
                <div className="space-y-4 text-left animate-[fadeIn_0.15s_ease-out]">
                  <p className="text-xs text-slate-400">
                    Review your custom high-retention parameters, specify your script idea/hook, and compile your final production pipeline.
                  </p>

                  <div className="space-y-1.5 mt-2 bg-[#121215] border border-white/[0.04] p-4 rounded-xl">
                    <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                      Your Custom Script Idea or Hook:
                    </label>
                    <textarea
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="e.g. The secret atomic habit that separates the wealthy..."
                      className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-650 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 transition-all resize-none min-h-[50px]"
                    />
                  </div>

                  <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-white/[0.04] space-y-3">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Pipeline Metadata:</span>
                    <div className="grid grid-cols-2 gap-4 text-[10px] font-mono text-slate-300">
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-slate-500 uppercase block">Video Duration:</span>
                        <strong className="text-white">{wizardDuration} Seconds</strong>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-slate-500 uppercase block">Script Tone:</span>
                        <strong className="text-white">{customWorkflowData.tone}</strong>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-slate-500 uppercase block">Hook Strategy:</span>
                        <strong className="text-white">{customWorkflowData.hookType}</strong>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-slate-500 uppercase block">Retention Trigger:</span>
                        <strong className="text-white">{customWorkflowData.retentionElement}</strong>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-slate-500 uppercase block">Audio Pacing:</span>
                        <strong className="text-white">{customWorkflowData.pacing}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between border-t border-white/[0.04] pt-4 mt-6">
                <button
                  type="button"
                  disabled={!customStep || customStep === 1}
                  onClick={() => (setCustomStep as any)((prev: any) => (prev ? prev - 1 : null))}
                  className="px-4 py-2 rounded-lg text-[10px] font-mono font-bold uppercase text-slate-500 hover:text-white disabled:text-slate-800 bg-transparent border border-white/5 hover:border-white/15 transition-all cursor-pointer focus:outline-none"
                >
                  ← Previous
                </button>

                {customStep && customStep < 6 ? (
                  <button
                    type="button"
                    onClick={() => (setCustomStep as any)((prev: any) => (prev ? prev + 1 : null))}
                    className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-amber-400 text-black hover:bg-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.15)] transition-all cursor-pointer focus:outline-none border-none"
                  >
                    Next Step →
                  </button>
                ) : (
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        console.log("Auth status:", isLoggedIn);

                        if (isLoggedIn === false) {
                          alert("To generate your video, please sign up for a plan. Would you like to continue to pricing?");
                          if (setIsPricingOpen) {
                            setIsPricingOpen(true);
                          } else {
                            window.location.href = "/pricing";
                          }
                          return; // Prevent generation function from executing
                        }

                        setCreationStep(3);
                        handleGenerate(undefined, topic, wizardDuration);
                      }}
                      className="px-6 py-2.5 rounded-xl text-xs font-sans font-black uppercase tracking-wider bg-amber-400 text-black hover:bg-amber-350 shadow-[0_0_20px_rgba(251,191,36,0.2)] transition-all cursor-pointer flex items-center gap-1.5 focus:outline-none border-none animate-pulse"
                    >
                      <span>Generate AI Video</span>
                      <Sparkles className="h-4 w-4" />
                    </button>

                    {isAdmin && (
                      <button
                        type="button"
                        onClick={() => {
                          setCreationStep(3);
                          handleGenerate(undefined, topic, wizardDuration);
                        }}
                        className="px-6 py-2.5 rounded-xl text-xs font-sans font-black uppercase tracking-wider bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-purple-400 transition-all cursor-pointer flex items-center gap-1.5 focus:outline-none"
                      >
                        <span>Admin Bypass (Generate Video)</span>
                        <Sparkles className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>

            </div>
          </div>
        )
      )}

      {/* STEP 3: TOPIC SELECTION (MAGIC MODE ONLY) */}
      {creationStep === 3 && workspaceMode === "magic" && !hasActiveSession && (
        <div className="space-y-6 max-w-2xl mx-auto w-full text-left animate-[fadeIn_0.15s_ease-out]">
          <div className="border-b border-white/[0.04] pb-4">
            <span className="text-[9px] font-mono font-bold text-brand-cyan bg-[#38bdf8]/5 border border-[#38bdf8]/15 px-2.5 py-0.5 rounded uppercase tracking-widest">
              Step 3 of 4
            </span>
            <h2 className="text-lg sm:text-xl font-black font-sans text-white mt-2 uppercase tracking-tight">
              Select Your Viral Topic
            </h2>
            <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">
              Select one of our 15 AI-suggested, high-discovery viral topics generated specifically for your chosen niche (<strong className="text-slate-400">{selectedWizardNiche}</strong>) or type in your custom input below.
            </p>
          </div>

          {/* 15 SUGGESTED TOPICS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
            {suggestedTopicsList.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setTopic(item)}
                className={`p-3.5 rounded-xl border text-left transition-all text-xs cursor-pointer focus:outline-none flex items-start gap-2.5 ${
                  topic === item
                    ? "border-[#38bdf8] bg-[#38bdf8]/5 shadow-[0_0_12px_rgba(56, 189, 248, 0.1)]"
                    : "border-white/[0.03] bg-slate-950/40 hover:border-white/10 hover:bg-slate-950/80"
                }`}
              >
                <div className={`h-4.5 w-4.5 rounded-full border shrink-0 flex items-center justify-center text-[9px] font-mono font-bold mt-0.5 ${
                  topic === item ? "border-[#38bdf8] bg-[#38bdf8] text-black" : "border-white/15 text-slate-500"
                }`}>
                  {idx + 1}
                </div>
                <p className={`leading-normal ${topic === item ? "text-[#38bdf8] font-bold" : "text-slate-300"}`}>
                  {item}
                </p>
              </button>
            ))}
          </div>

          {/* CUSTOM TOPIC INPUT */}
          <form onSubmit={(e) => { e.preventDefault(); if (topic.trim()) { setCreationStep(4); handleGenerate(undefined, topic, wizardDuration); } }} className="space-y-4 pt-2">
            <div className="relative">
              <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-[#09090C] border border-white/[0.05] hover:border-slate-800 focus-within:border-[#38bdf8] rounded-2xl p-1.5 transition-all shadow-[0_4px_30px_rgba(0,0,0,0.6)] focus-within:shadow-[0_0_30px_rgba(56, 189, 248, 0.06)] gap-2">
                <textarea
                  id="topic-input"
                  rows={2}
                  required
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Or refine custom script topic idea here..."
                  className="flex-1 bg-transparent border-none text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-0 text-xs font-sans px-3 resize-none py-2"
                />
                <button
                  id="generate-script-btn"
                  type="submit"
                  disabled={!topic.trim()}
                  className="px-6 py-3 rounded-xl bg-[#38bdf8] hover:bg-[#38bdf8]/90 text-black font-sans text-xs font-black uppercase tracking-wider transition-all duration-150 cursor-pointer disabled:bg-slate-900 disabled:text-slate-700 shrink-0 flex items-center justify-center space-x-1.5 border-none focus:outline-none"
                >
                  <Sparkles className="h-4 w-4 animate-pulse" />
                  <span>Execute Pipeline</span>
                </button>
                {isAdmin && (
                  <button
                    type="button"
                    disabled={!topic.trim()}
                    onClick={() => {
                      if (topic.trim()) {
                        setCreationStep(4);
                        handleGenerate(undefined, topic, wizardDuration);
                      }
                    }}
                    className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-sans text-xs font-black uppercase tracking-wider transition-all duration-150 cursor-pointer disabled:bg-slate-900 disabled:text-slate-700 shrink-0 flex items-center justify-center space-x-1.5 border border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)] focus:outline-none"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>Admin Bypass</span>
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      )}

      {/* STEP 4/BUILD SUITE: PIPELINE EXECUTION ENGINE & RESULTS */}
      {((workspaceMode === "magic" && creationStep === 4) || (workspaceMode === "custom" && creationStep === 3) || hasActiveSession) && (
        <div className="space-y-6 flex-1 flex flex-col animate-[fadeIn_0.15s_ease-out]">
          
          {/* STAGE 5 EXECUTION PIPELINE SCREEN (Visible during active generation) */}
          {isGenerating && (
            <div className="max-w-2xl mx-auto w-full p-6 rounded-2xl border border-white/[0.05] bg-[#08080A]/80 shadow-2xl text-left space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-[#38bdf8]/10 border border-[#38bdf8]/20 text-[#38bdf8] flex items-center justify-center">
                    <Loader2 className="h-4.5 w-4.5 animate-spin" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black font-sans uppercase tracking-tight text-white">Execution Engine Processing</h3>
                    <span className="text-[9px] font-mono text-[#38bdf8] bg-[#38bdf8]/5 border border-[#38bdf8]/10 px-2 py-0.5 rounded uppercase tracking-wider">
                      Volume: {workspaceMode === "magic" ? videoQuantity : 1} Video Series Active
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[20px] font-sans font-black text-[#38bdf8] leading-none">{overallProgress}%</span>
                  <span className="text-[9px] font-mono text-slate-500 block">Overall Build</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 w-full bg-white/[0.02] border border-white/[0.04] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#38bdf8] to-blue-500 transition-all" style={{ width: `${overallProgress}%` }} />
              </div>

              {/* Sub-stages checklists */}
              <div className="space-y-3 pt-2 border-t border-white/[0.03]">
                {[
                  { id: "script", label: "AI Script Compiler", desc: "Synthesizing custom attention-driving hooks & viral retention stems.", progress: pipelineMetrics.script },
                  { id: "voiceover", label: "Neural Voiceover Synthesis", desc: "Modeling text-to-speech vocoder dynamics with emotional depth.", progress: pipelineMetrics.voiceover },
                  { id: "music", label: "Audio Overlay & Beatmix", desc: "Overlaying high-authority soundtracks, sidechaining, & EQ.", progress: pipelineMetrics.music },
                  { id: "captions", label: "Closed Captioning Aligner", desc: "Extracting timeline transcription markers & kinetic key highlights.", progress: pipelineMetrics.captions },
                  { id: "visuals", label: "Visual Renderer Assembly", desc: "Compiling 1080x1920 MP4 templates & viewport crop layers.", progress: pipelineMetrics.visuals }
                ].map((st) => (
                  <div key={st.id} className="p-3.5 rounded-xl border border-white/[0.03] bg-black/40 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center transition-colors ${
                          st.progress === 100 
                            ? "bg-emerald-500 border-emerald-500 text-black" 
                            : st.progress > 0 
                            ? "border-[#38bdf8] text-[#38bdf8]" 
                            : "border-white/10 text-slate-600"
                        }`}>
                          {st.progress === 100 ? <Check className="h-3 w-3" /> :
                           st.progress > 0 ? <Loader2 className="h-2.5 w-2.5 animate-spin" /> :
                           <Clock className="h-2.5 w-2.5" />}
                        </div>
                        <h4 className="text-xs font-bold text-white leading-none">{st.label}</h4>
                      </div>
                      <p className="text-[9px] text-slate-500 mt-1 leading-normal pl-6">{st.desc}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className={`text-[11px] font-mono font-bold ${st.progress === 100 ? "text-emerald-400" : st.progress > 0 ? "text-[#38bdf8]" : "text-slate-600"}`}>
                        {st.progress === 100 ? "Completed" : st.progress > 0 ? `${st.progress}%` : "Pending"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RESULTS PREVIEW & ADAPTIVE DISTRIBUTION (Visible when script is ready) */}
          {!isGenerating && generatedScript && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
              
              {/* Preview Column (Left) */}
              <div className="lg:col-span-2 space-y-4">
                <div className="border border-white/[0.08] rounded-2xl bg-[#08080A] p-4 sm:p-5 shadow-2xl">
                  <LivePreview 
                    script={generatedScript} 
                    isGenerating={isGenerating} 
                    onGenerate={() => handleGenerate(undefined, topic, wizardDuration)}
                    onUpdateScript={setGeneratedScript}
                    activeUser={activeUser}
                    setIsPricingOpen={setIsPricingOpen}
                  />
                </div>
              </div>

              {/* Controls and Distribution Column (Right) */}
              <div className="space-y-4">
                
                {/* Reset button */}
                <button
                  type="button"
                  onClick={() => {
                    setGeneratedScript(null);
                    setError(null);
                    setCreationStep(1);
                    setSelectedWizardNiche("");
                    set_current_session_niche(null);
                    setDistributionCompleted(false);
                    setIsDistributing(false);
                  }}
                  className="w-full py-2.5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] text-slate-400 hover:text-white font-mono text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 focus:outline-none"
                >
                  ← Reset & New Campaign
                </button>

                {/* DISTRIBUTION PANEL */}
                <div className="p-4.5 rounded-xl border border-white/[0.04] bg-[#08080A] space-y-4 shadow-xl">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[#38bdf8] animate-pulse" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">Adaptive Distribution Engine</span>
                  </div>
                  
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    Deploy your completed Campaign Video Series ({workspaceMode === "magic" ? videoQuantity : 1} Clips) directly to your linked shadow channels instantly.
                  </p>

                  {/* Active Platforms Status */}
                  <div className="space-y-2 pt-1">
                    {selectedChannels.map((cId) => {
                      const chan = linkedChannels.find(c => c.id === cId);
                      if (!channel_id_matches(chan)) return null;
                      
                      const progress = distributeProgress[cId] || 0;
                      const status = distributeStatus[cId] || "idle";

                      return (
                        <div key={cId} className="p-3 rounded-lg border border-white/[0.03] bg-black/40 space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className={`text-[11px] font-mono font-bold ${chan.iconColor}`}>
                                {chan.platform}
                              </span>
                              <span className="text-[9px] font-sans text-slate-400">{chan.handle}</span>
                            </div>
                            <div>
                              {status === "uploading" && <Loader2 className="h-3.5 w-3.5 animate-spin text-[#38bdf8]" />}
                              {status === "success" && <Check className="h-3.5 w-3.5 text-emerald-400" />}
                              {status === "idle" && <span className="text-[8px] font-mono text-slate-600 uppercase">Awaiting</span>}
                            </div>
                          </div>
                          {status === "uploading" && (
                            <div className="space-y-1">
                              <div className="h-1 w-full bg-white/[0.02] rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-[#38bdf8] to-blue-500 transition-all" style={{ width: `${progress}%` }} />
                              </div>
                              <div className="flex justify-between text-[8px] font-mono text-slate-500">
                                <span>Uploading assets...</span>
                                <span>{progress}%</span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Distribute Button */}
                  {selectedChannels.length > 0 && !distributionCompleted && (
                    <button
                      type="button"
                      disabled={isDistributing}
                      onClick={runDistribution}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-[#38bdf8] to-blue-500 hover:from-[#38bdf8]/90 hover:to-blue-500/90 text-black font-sans text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-[#38bdf8]/10 flex items-center justify-center gap-1.5 border-none focus:outline-none disabled:opacity-50"
                    >
                      {isDistributing ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          <span>Syncing Channels...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-3.5 w-3.5" />
                          <span>Publish and Distribute Series</span>
                        </>
                      )}
                    </button>
                  )}

                  {/* Distribution Success Celebration */}
                  {distributionCompleted && (
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-1.5 animate-[fadeIn_0.2s_ease-out]">
                      <h4 className="text-xs font-black text-emerald-400 uppercase tracking-wider">Sync Successful! 🎉</h4>
                      <p className="text-[9px] text-slate-400 font-sans leading-normal">
                        Your completed Campaign series has been queued & distributed to your connected Shadow Channels.
                      </p>
                    </div>
                  )}
                </div>

                {/* SCHEDULER INTEGRATION */}
                <div className="p-4.5 rounded-xl border border-white/[0.04] bg-[#08080A] space-y-3 shadow-xl">
                  <div className="flex items-center gap-2 text-amber-400">
                    <Calendar className="h-4 w-4" />
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider">Time-Slot Planner</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-normal">
                    Schedule automated calendar drops or parallel rotation cycles on your Connected Shadow Channels.
                  </p>
                  <button
                    type="button"
                    onClick={() => handleOpenScheduler(topic || generatedScript?.title || "Campaign Series")}
                    className="w-full py-2.5 rounded-xl border border-amber-500/10 bg-amber-500/5 hover:bg-amber-400 hover:text-black hover:border-transparent text-amber-400 font-sans text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 focus:outline-none"
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Schedule Series</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="p-4 rounded-xs border border-red-900 bg-red-950/20 text-red-400 text-xs flex gap-3 text-left">
              <AlertCircle className="h-4.5 w-4.5 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block uppercase tracking-wider font-mono mb-0.5">Generation Error</strong>
                <span className="font-sans leading-relaxed">{error}</span>
              </div>
            </div>
          )}

          {/* Saved Library and Queue Log (Bottom Section) */}
          <div className="space-y-6 flex-1 flex flex-col pt-6 border-t border-white/[0.04]">
            <div className="flex items-center justify-between bg-black/40 border border-white/[0.05] p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setDashboardSidebarTab("library")}
                className={`flex-1 py-2 text-[10px] font-mono font-bold uppercase tracking-wider rounded-lg border-none focus:outline-none transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  dashboardSidebarTab === "library"
                    ? "bg-white/5 text-white border border-white/10"
                    : "text-slate-500 hover:text-slate-300 bg-transparent"
                }`}
              >
                <History className="h-3.5 w-3.5" />
                <span>Saved ({savedScripts.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setDashboardSidebarTab("queue")}
                className={`flex-1 py-2 text-[10px] font-mono font-bold uppercase tracking-wider rounded-lg border-none focus:outline-none transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  dashboardSidebarTab === "queue"
                    ? "bg-white/5 text-white border border-white/10"
                    : "text-slate-500 hover:text-slate-300 bg-transparent"
                }`}
              >
                <Calendar className="h-3.5 w-3.5" />
                <span>Queue ({scheduledQueue.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setDashboardSidebarTab("pipeline")}
                className={`flex-1 py-2 text-[10px] font-mono font-bold uppercase tracking-wider rounded-lg border-none focus:outline-none transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  dashboardSidebarTab === "pipeline"
                    ? "bg-white/5 text-white border border-white/10"
                    : "text-slate-500 hover:text-slate-300 bg-transparent"
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                <span>Pipeline</span>
              </button>
            </div>

            {dashboardSidebarTab === "library" ? (
              <div className="flex-1 flex flex-col space-y-4 text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.04] pb-3">
                  <span className="text-[10px] uppercase tracking-[1px] font-mono text-slate-400 font-bold flex items-center">
                    <History className="h-3.5 w-3.5 mr-1.5 text-slate-500" />
                    Custom Video Library
                  </span>
                  {savedScripts.length > 0 && (
                    <button
                      type="button"
                      onClick={() => handleOpenScheduler("Bulk Video Library Series")}
                      className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-400 hover:text-black border border-amber-500/30 text-amber-400 font-mono text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 focus:outline-none"
                    >
                      <Calendar className="h-3 w-3" />
                      <span>Schedule Series</span>
                    </button>
                  )}
                </div>

                {savedScripts.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border border-white/[0.04] rounded-xl bg-transparent text-slate-655 min-h-[140px]">
                    <span className="text-[10px] font-mono tracking-wider uppercase mb-1 text-slate-500">No scripts yet</span>
                    <p className="text-[10px] max-w-xs font-sans leading-normal text-slate-500">
                      Configure your campaign parameters and hit generate to create your first script.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 overflow-y-auto max-h-[350px]">
                    {savedScripts.map((item) => (
                      <div
                        key={item.id}
                        id={`history-item-${item.id}`}
                        onClick={() => selectHistoryItem(item)}
                        className="p-4 rounded-xl bg-[#121215]/80 hover:bg-[#18181C]/90 border border-slate-900 hover:border-brand-cyan/40 text-left transition-all duration-150 flex flex-col justify-between gap-3 group cursor-pointer shadow-md"
                      >
                        <div className="flex-1 min-w-0 w-full">
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-1.5">
                              <span className="inline-block text-[9px] font-mono text-brand-cyan uppercase font-bold bg-brand-cyan/5 px-1.5 py-0.5 rounded border border-brand-cyan/10">
                                {item.targetPlatform}
                              </span>
                              <span className="inline-block text-[9px] font-mono text-slate-500 uppercase">
                                {item.targetTone}
                              </span>
                            </div>
                            <button
                              id={`delete-btn-${item.id}`}
                              onClick={(e) => deleteHistoryItem(item.id, e)}
                              className="p-1 text-slate-600 hover:text-red-400 rounded-lg bg-black/20 hover:bg-black/40 transition-colors cursor-pointer shrink-0 border-none focus:outline-none"
                              title="Delete record"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                          <h4 className="text-xs font-bold text-[#FFFFFF] mt-2 truncate font-display group-hover:text-brand-cyan">
                            {item.title}
                          </h4>
                          <p className="text-[10px] text-slate-500 mt-1 truncate italic">
                            "{item.topic}"
                          </p>
                        </div>
                        <div className="flex items-center gap-2 pt-1 border-t border-white/[0.02]">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenScheduler(item.title);
                            }}
                            className="px-2.5 py-1 text-[9px] font-mono font-bold uppercase text-amber-400 bg-amber-400/5 hover:bg-amber-400 hover:text-black rounded border border-amber-400/20 hover:border-transparent transition-all cursor-pointer flex items-center gap-1"
                          >
                            <Calendar className="h-2.5 w-2.5" />
                            <span>Schedule Series</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : dashboardSidebarTab === "queue" ? (
              <div className="flex-1 flex flex-col space-y-4 text-left">
                <div className="flex items-center justify-between border-b border-white/[0.04] pb-3">
                  <span className="text-[10px] uppercase tracking-[1px] font-mono text-slate-400 font-bold flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1.5 text-slate-500" />
                    Automated Queue & Shadow Channels
                  </span>
                  <span className="font-mono text-[9px] font-bold text-amber-400 bg-amber-400/5 border border-amber-400/15 px-2 py-0.5 rounded uppercase tracking-wider">
                    {scheduledQueue.filter(q => q.status === "Scheduled").length} Pending
                  </span>
                </div>

                {scheduledQueue.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border border-white/[0.04] rounded-xl bg-transparent text-slate-650 min-h-[140px]">
                    <Calendar className="h-6 w-6 text-slate-600 mb-2" />
                    <span className="text-[10px] font-mono tracking-wider uppercase mb-1 text-slate-500">Queue is empty</span>
                    <p className="text-[10px] max-w-xs font-sans leading-normal text-slate-500">
                      Use the Schedule Series button above or complete Step 4 to push multi-clip campaigns onto your queue.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                    {scheduledQueue.map((item) => (
                      <div key={item.id} className="p-3.5 rounded-xl border border-white/[0.03] bg-slate-950/60 flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase ${
                              item.status === "Published" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            }`}>
                              {item.status}
                            </span>
                            <span className="text-[9px] font-mono text-slate-500">
                              {item.scheduledTime ? new Date(item.scheduledTime).toLocaleDateString() : ""} {item.scheduledTime ? new Date(item.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                            </span>
                          </div>
                          <h4 className="text-xs font-bold text-white mt-1.5 truncate">{item.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            {(item.platforms || []).map((p: string, idx: number) => (
                              <span key={idx} className="text-[8px] font-mono text-slate-400 bg-white/5 px-1.5 py-0.5 rounded">
                                {p}
                              </span>
                            ))}
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-400">{item.channel}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Pipeline Tab */
              <div className="flex-1 flex flex-col space-y-4 text-left">
                <Stage5Pipeline
                  scheduledQueue={scheduledQueue}
                  setScheduledQueue={setScheduledQueue}
                  savedScripts={savedScripts}
                  setRecentToast={setRecentToast}
                  activeUser={activeUser}
                  topic={topic}
                  selectedWizardNiche={selectedWizardNiche}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
    );
  };

  const currentMode = window.location.hash;

  return (
    <div className='flex-1 w-full h-full'>
      {currentMode === '#magic' ? (
        <MagicMode 
          onBack={() => {
            setWorkspaceMode("magic");
            window.location.hash = "";
          }}
          onSuccess={(scriptData) => {
            setTopic(scriptData.title || scriptData.topic || "");
            setRecentToast({
              message: "🚀 Sequence Compiled",
              sub: "Magic Mode generated script successfully!"
            });
          }}
        />
      ) : currentMode === '#custom' ? (
        <CustomMode 
          onBack={() => {
            setWorkspaceMode("custom");
            window.location.hash = "";
          }}
          onSuccess={(scriptData) => {
            setTopic(scriptData.topic || "");
            setRecentToast({
              message: "✨ Framework Mapped",
              sub: "Custom Mode validated precision variables!"
            });
          }}
        />
      ) : (
        <DefaultDashboard />
      )}
    </div>
  );
}

// Helper to check if a channel is valid and selected
function channel_id_matches(chan: any): chan is ShadowChannel {
  return chan && typeof chan.id === "string" && typeof chan.platform === "string" && typeof chan.handle === "string";
}
