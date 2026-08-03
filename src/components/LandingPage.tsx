import { useState, useEffect, useRef } from "react";
import { motion, useInView, animate } from "motion/react";
import { 
  Cpu, 
  Activity, 
  TrendingUp, 
  Brain, 
  Home, 
  Utensils, 
  Compass, 
  Sparkles, 
  Gamepad2, 
  BookOpen,
  Zap,
  Rocket,
  Play,
  Instagram,
  Youtube,
  Smartphone,
  Search,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Lock,
  HelpCircle,
  Accessibility,
  Check,
  CreditCard,
  X,
  Scale,
  FileText,
  ShieldAlert,
  ShoppingBag,
  ArrowLeft,
  ArrowUpRight,
  ArrowRight,
  Calendar,
  Clock,
  DollarSign,
  Dumbbell,
  Flame,
  Briefcase,
  Orbit,
  Film,
  Volume2,
  LineChart,
  Layers,
  MessageCircle,
  MessageSquare,
  Eye,
  Video,
  Sliders,
  Share2,
  Wand2
} from "lucide-react";
import BlogFeed from "./BlogFeed";
import BentoShowcase from "./BentoShowcase";

interface LandingPageProps {
  onStartGenerating: () => void;
}

// Sub-component for high-performance animated counters using motion/react
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2.2,
        ease: "easeOut",
        onUpdate: (latest) => {
          setDisplayValue(Math.floor(latest));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <span ref={ref} id={`counter-val-${value}`}>
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

// Compact Social Proof Counter Section sitting underneath Hero/Niche
function SocialProofCounterSection() {
  return (
    <div className="relative z-10 w-full max-w-2xl mx-auto px-4 py-6 flex items-center justify-center font-sans border-t border-white/[0.04]">
      <div className="flex items-center space-x-12 sm:space-x-20">
        {/* Column 1: Channels Automated */}
        <div className="flex flex-col items-center text-center">
          <div className="text-[32px] sm:text-4xl font-black text-white tracking-tight leading-none">
            <Counter value={4200} suffix="+" />
          </div>
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 mt-2.5">
            channels automated
          </span>
        </div>

        {/* Thin vertical line divider */}
        <div className="h-10 w-[1px] bg-white/[0.08]" />

        {/* Column 2: Videos Autoposted */}
        <div className="flex flex-col items-center text-center">
          <div className="text-[32px] sm:text-4xl font-black text-white tracking-tight leading-none">
            <Counter value={100000} suffix="+" />
          </div>
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 mt-2.5">
            videos autoposted
          </span>
        </div>
      </div>
    </div>
  );
}

// Infinite technical trust marquee scrolling horizontally at bottom
function TechnicalTrustMarquee() {
  const trustItems = [
    "TikTok Algorithm Optimized",
    "AI-Driven Retention Hooks",
    "Automated Publishing Pipeline",
    "Cross-Platform Sync",
    "High-Retention Pacing Algorithms",
  ];

  // Repeat items to establish a continuous infinite scrolling track
  const duplicatedItems = [...trustItems, ...trustItems, ...trustItems, ...trustItems];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative z-10 w-full py-5 overflow-hidden bg-[#121212] border-t border-white/[0.04]">
      {/* Side fades for premium depth */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-20 pointer-events-none" />

      <div className="w-full overflow-hidden flex">
        <motion.div
          animate={isHovered ? {} : { x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 25,
            repeat: Infinity,
          }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className="flex gap-4 pr-4 whitespace-nowrap cursor-pointer"
        >
          {duplicatedItems.map((item, idx) => (
            <div
              key={idx}
              className="inline-flex items-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-neutral-900/40 backdrop-blur-md border border-[#38bdf8]/15 text-[#38bdf8] text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-wider shadow-[0_0_15px_rgba(56, 189, 248, 0.02)] transition-all duration-300 hover:border-[#38bdf8]/45 hover:bg-neutral-900/80 hover:scale-[1.01] select-none"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#38bdf8] mr-2.5 animate-pulse" />
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default function LandingPage({ onStartGenerating }: LandingPageProps) {
  const [gridPage, setGridPage] = useState(1);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const [showExitIntentModal, setShowExitIntentModal] = useState(false);
  const [exitEmail, setExitEmail] = useState("");
  const [exitSubmitStatus, setExitSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [exitErrorMessage, setExitErrorMessage] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);
  const [selectedWorkflowStep, setSelectedWorkflowStep] = useState(0);

  // Step 1 Simulation States
  const [simTopic, setSimTopic] = useState("dark_psychology");
  const [simTone, setSimTone] = useState("eerie");
  const [simHook, setSimHook] = useState("warning");
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  const [generatedScriptText, setGeneratedScriptText] = useState("");

  // Step 2 Simulation States
  const [simVoice, setSimVoice] = useState("Jordan");
  const [simSubtitleStyle, setSimSubtitleStyle] = useState("hyper_yellow");
  const [simBgm, setSimBgm] = useState("phonk");
  const [isRenderingVideo, setIsRenderingVideo] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);
  const [renderLogs, setRenderLogs] = useState<string[]>([]);

  // Step 3 Simulation States
  const [simPlatforms, setSimPlatforms] = useState<string[]>(["YouTube", "TikTok", "Instagram"]);
  const [simProxy, setSimProxy] = useState("chicago");
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastLogs, setBroadcastLogs] = useState<string[]>([]);

  // Step 4 Simulation States
  const [simKeyword, setSimKeyword] = useState("BLUEPRINT");
  const [simUserComment, setSimUserComment] = useState("");
  const [commentsList, setCommentsList] = useState<Array<{ id: string, user: string, text: string, reply?: string, captured?: boolean }>>([
    { id: "1", user: "niche_hunter_99", text: "Is this blueprint free? Send it to me!", reply: "Sent the full dark psychology blueprint master plan directly to your DMs inbox! Check your inbox requests 📬", captured: true }
  ]);
  const [isReplyingComment, setIsReplyingComment] = useState(false);

  // Step 1: Prompt/Script Compiler Simulation
  const handleGenerateScript = () => {
    setIsGeneratingScript(true);
    setGeneratedScriptText("");
    
    let fullText = "";
    if (simTopic === "dark_psychology") {
      if (simTone === "eerie") {
        if (simHook === "warning") {
          fullText = "🚨 WARNING: If they look away when you speak, they are using the Gaze Neglect rule. They want to trigger your obsession. Here is exactly how you turn the tables instantly: First, match their silence. Second, lower your chin and smile slowly. It sounds wild, but researchers found this breaks the mental control cycle in 3 seconds flat. 👇 COMMENT 'GUIDE' to get the full dark psychology blueprints directly to your inbox.";
        } else if (simHook === "secret") {
          fullText = "🤫 THE DEEPEST TRICK: Why the silent treatment is actually a confession. Most people fall for this, but here is exactly how to disable it. When a narcissist goes silent, they are testing your emotional battery. The minute you stop reacting, they lose all power. 👇 COMMENT 'GUIDE' and I will send the stealth survival code immediately.";
        } else {
          fullText = "🤯 THE ADVISOR TRAP: Most relationship experts tell you to 'communicate' more. That is a massive trap. When dealing with toxic controllers, communication is weaponized against you. Here is why absolute silence is the ultimate power play. 👇 COMMENT 'GUIDE' to receive the master strategy.";
        }
      } else if (simTone === "clinical") {
        if (simHook === "warning") {
          fullText = "📋 CLINICAL DIAGNOSIS: Gaze Neglect is a documented neuro-manipulative pattern. Peer-reviewed studies indicate it activates identical brain pain receptors as physical wounds. To offset this, employ direct passive disengagement. 👇 COMMENT 'GUIDE' to read the full clinical paper.";
        } else if (simHook === "secret") {
          fullText = "🔬 THE COGNITIVE LOCK: Here is the raw neuro-data behind the rejection-induction loop. When access is denied, dopamine levels spike, forcing obsessive pursuit. You can bypass this loop with simple emotional grounding. 👇 COMMENT 'GUIDE' for the raw scientific charts.";
        } else {
          fullText = "📊 CONTRARIAN STUDIES: Communicating during active psychological silent games actually reinforces the controller's behavioral pathways. The data shows that dynamic avoidance is 3.5x more effective at resetting relation equality. 👇 COMMENT 'GUIDE' to review the workflow.";
        }
      } else { // high_energy
        if (simHook === "warning") {
          fullText = "🔥 STOP FALLING FOR THIS TRASH! When they look away, they are playing a garbage mind game with you. Do NOT text them. Do NOT call them. Lower your head, grin, and watch them absolutely lose their minds! 👇 COMMENT 'GUIDE' right now for the cheat sheet!";
        } else if (simHook === "secret") {
          fullText = "⚡ THIS IS THE ULTIMATE CHEAT CODE! The silent treatment is NOT about you—it is their absolute biggest fear! Here is the exact phrase that shatters their little toxic game in 3 seconds flat! 👇 COMMENT 'GUIDE' and I will dispatch it to your inbox!";
        } else {
          fullText = "💀 EVERYTHING YOU KNOW IS WRONG! Stop trying to 'talk it out' with toxic bosses or partners! That is exactly what they want! Going ghost is your absolute best strategy. 👇 COMMENT 'GUIDE' to get the absolute system blueprint!";
        }
      }
    } else if (simTopic === "wealth_secrets") {
      fullText = "🚨 THE DEEPEST WEALTH TRAP: Why working a 9-to-5 is actually designed to keep your cognitive levels completely drained. Here is the quiet quitting system they don't want you to know. First, automate your daily tasks with simple local prompt files. Second, collect checks from multiple channels simultaneously. 👇 COMMENT 'BLUEPRINT' to secure the cheat sheet.";
    } else if (simTopic === "biohacking") {
      fullText = "🚨 ADRENAL FATIGUE TRAP: That morning coffee is permanently down-regulating your dopamine receptors. Here is the exact cold exposure protocol to reset your energy instantly. First, jump in cold water for 120 seconds. Second, supplement with L-Tyrosine to optimize adrenal pathways. 👇 COMMENT 'SECRET' to unlock the daily checklist.";
    } else { // corporate / survival_hacks
      fullText = "🚨 TOXIC BOSS ALARM: If your employer demands constant status updates, they are installing stealth monitoring agents on your local terminal. Here is the script to lock your corporate privacy and secure 3 high-paying automated jobs simultaneously. 👇 COMMENT 'BLUEPRINT' for the full guide.";
    }

    let current = "";
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        current += fullText.slice(0, i + 6);
        setGeneratedScriptText(current);
        i += 6;
      } else {
        setGeneratedScriptText(fullText);
        setIsGeneratingScript(false);
        clearInterval(interval);
      }
    }, 15);
  };

  // Step 2: AI Video & Production Rendering Simulation
  const handleRenderVideo = () => {
    setIsRenderingVideo(true);
    setRenderProgress(0);
    setRenderLogs([]);
    
    let progress = 0;
    const logsList = [
      "Spinning up Docker vertical media renderer container...",
      `Parsing vocal tract audio assets with voice profile: ${simVoice}...`,
      "De-noising vocal frequencies and running peak-matching normalizers...",
      `Syncing backing frequencies to BPM with backing track: ${simBgm}...`,
      `Generating keyframe subtitle tags in style: ${simSubtitleStyle}...`,
      "Applying multi-pass H.264 rendering with 1080x1920 vertical format...",
      "Video compiled successfully! Codec format verified."
    ];

    const interval = setInterval(() => {
      progress += 5;
      setRenderProgress(progress);
      
      if (progress === 15) setRenderLogs(prev => [...prev, logsList[0]]);
      if (progress === 35) setRenderLogs(prev => [...prev, logsList[1], logsList[2]]);
      if (progress === 55) setRenderLogs(prev => [...prev, logsList[3]]);
      if (progress === 75) setRenderLogs(prev => [...prev, logsList[4]]);
      if (progress === 90) setRenderLogs(prev => [...prev, logsList[5]]);
      if (progress >= 100) {
        setRenderProgress(100);
        setRenderLogs(prev => [...prev, logsList[6]]);
        setIsRenderingVideo(false);
        clearInterval(interval);
      }
    }, 80);
  };

  // Step 3: Shadow Channel Broadcaster Simulation
  const handleBroadcastNetwork = () => {
    setIsBroadcasting(true);
    setBroadcastLogs([]);
    
    let step = 0;
    const proxyMap: Record<string, string> = {
      chicago: "198.51.100.45 (US-Midwest)",
      frankfurt: "203.0.113.82 (EU-Central)",
      tokyo: "192.0.2.144 (AP-East)"
    };

    const runLogs = [
      `Initializing secure proxy rotation... Handshake with rotating residential node: ${proxyMap[simProxy] || proxyMap.chicago}`,
      "Validating account tokens and clearing shadowban trackers...",
      "Injecting SEO titles, hashtags, and description block...",
      "Distributing media streams simultaneously to destination channels..."
    ];

    const interval = setInterval(() => {
      if (step < runLogs.length) {
        setBroadcastLogs(prev => [...prev, runLogs[step]]);
        step += 1;
      } else {
        simPlatforms.forEach(p => {
          setBroadcastLogs(prev => [...prev, `✅ [${p}] Published Successfully! Live Views Tracking: Online`]);
        });
        setBroadcastLogs(prev => [...prev, "🎉 Broadcast complete! All channels fully synchronized with zero captcha blocks."]);
        setIsBroadcasting(false);
        clearInterval(interval);
      }
    }, 600);
  };

  // Step 4: Lead Capture & Conversion Bot Simulation
  const handlePostComment = (customText?: string) => {
    const textToPost = customText || simUserComment;
    if (!textToPost.trim()) return;

    const newCommentId = (commentsList.length + 1).toString();
    const newComment = {
      id: newCommentId,
      user: "watcher_" + Math.floor(Math.random() * 900 + 100),
      text: textToPost,
    };

    setCommentsList(prev => [...prev, newComment]);
    setSimUserComment("");
    setIsReplyingComment(true);

    setTimeout(() => {
      const hasKeyword = textToPost.toUpperCase().includes(simKeyword.toUpperCase());
      let replyText = "";
      let captured = false;

      if (hasKeyword) {
        replyText = `Sent the full ${simKeyword.toLowerCase()} blueprint master plan directly to your DMs inbox! Check your inbox requests 📬`;
        captured = true;
      } else {
        replyText = `Thanks for watching! Comment the word "${simKeyword}" and our automated system will immediately dispatch the secure program guide to your inbox! 🚀`;
      }

      setCommentsList(prev => prev.map(c => {
        if (c.id === newCommentId) {
          return { ...c, reply: replyText, captured };
        }
        return c;
      }));
      setIsReplyingComment(false);
    }, 1200);
  };

  // Function to send abandonment lead to MailerLite
  const sendAbandonmentLead = async (userEmail: string) => {
    const API_KEY = 'INSERT_YOUR_NEW_TOKEN_HERE'; // Replace with your actual token
    const endpoint = 'https://connect.mailerlite.com/api/subscribers';

    try {
      const response = await fetch('/api/mailerlite/abandonment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: userEmail,
          apiKey: API_KEY
        })
      });

      if (response.ok) {
        console.log('Lead sent successfully!');
      } else {
        console.error('Error sending lead:', await response.text());
      }
    } catch (error) {
      console.error('Communication error:', error);
    }
  };

  useEffect(() => {
    // Clear trigger status on page load to ensure fresh capturing capability
    sessionStorage.removeItem("exit_intent_triggered");

    const handleMouseLeave = (e: MouseEvent) => {
      const userEmail = localStorage.getItem('userEmail') || localStorage.getItem('viralflow_user_email');
      if (userEmail) {
        sendAbandonmentLead(userEmail);
      }

      // Trigger when cursor leaves the window viewport or approaches tab bar (clientY < 20)
      if (e.clientY < 20 || e.clientY === undefined) {
        const alreadyTriggered = sessionStorage.getItem("exit_intent_triggered");
        if (!alreadyTriggered) {
          setShowExitIntentModal(true);
          sessionStorage.setItem("exit_intent_triggered", "true");
        }
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Tab Engagement Attention Grabber: Favicon Toggle on Visibility Change
  useEffect(() => {
    let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    const originalHref = link.href || "/favicon.ico";
    const fireFavicon = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>🔥</text></svg>";
    let intervalId: any = null;
    let isOriginal = true;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        intervalId = setInterval(() => {
          const currentLink = document.querySelector("link[rel~='icon']") as HTMLLinkElement || link;
          if (currentLink) {
            currentLink.href = isOriginal ? fireFavicon : originalHref;
            isOriginal = !isOriginal;
          }
        }, 500);
      } else {
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
        const currentLink = document.querySelector("link[rel~='icon']") as HTMLLinkElement || link;
        if (currentLink) {
          currentLink.href = originalHref;
        }
        isOriginal = true;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (intervalId) {
        clearInterval(intervalId);
      }
      const currentLink = document.querySelector("link[rel~='icon']") as HTMLLinkElement || link;
      if (currentLink && originalHref) {
        currentLink.href = originalHref;
      }
    };
  }, []);

  const handleExitIntentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!exitEmail || !exitEmail.includes("@")) {
      setExitErrorMessage("Please enter a valid email address.");
      return;
    }

    setExitSubmitStatus("submitting");
    setExitErrorMessage("");

    try {
      localStorage.setItem("userEmail", exitEmail);
      localStorage.setItem("viralflow_user_email", exitEmail);
      sendAbandonmentLead(exitEmail);

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: exitEmail })
      });

      if (response.ok) {
        setExitSubmitStatus("success");
      } else {
        const errorData = await response.json();
        setExitErrorMessage(errorData.error || "Something went wrong. Please try again.");
        setExitSubmitStatus("error");
      }
    } catch (err) {
      console.error("[Exit Intent Submission Error]", err);
      setExitErrorMessage("Network error. Please try again.");
      setExitSubmitStatus("error");
    }
  };
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Accessibility States with localStorage persistence
  const [accessibilityMenuOpen, setAccessibilityMenuOpen] = useState(false);
  const [textSize, setTextSize] = useState<"normal" | "large" | "xlarge">(() => {
    return (localStorage.getItem("a11y_text_size") as "normal" | "large" | "xlarge") || "normal";
  });
  const [contrast, setContrast] = useState<"normal" | "high">(() => {
    return (localStorage.getItem("a11y_contrast") as "normal" | "high") || "normal";
  });
  const [screenReaderOpt, setScreenReaderOpt] = useState<boolean>(() => {
    return localStorage.getItem("a11y_screen_reader") === "true";
  });

  // Sync settings to localStorage and body element
  useEffect(() => {
    localStorage.setItem("a11y_text_size", textSize);
    localStorage.setItem("a11y_contrast", contrast);
    localStorage.setItem("a11y_screen_reader", String(screenReaderOpt));

    // Update body class list for global accessibility application
    document.body.classList.remove("accessibility-text-large", "accessibility-text-xlarge", "accessibility-high-contrast");
    if (textSize === "large") document.body.classList.add("accessibility-text-large");
    if (textSize === "xlarge") document.body.classList.add("accessibility-text-xlarge");
    if (contrast === "high") document.body.classList.add("accessibility-high-contrast");
  }, [textSize, contrast, screenReaderOpt]);

  // Screen Reader Speech Synthesis logic
  useEffect(() => {
    if (!screenReaderOpt) {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      return;
    }

    console.log("Voice Reader: Activated");

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const textToRead = target.getAttribute('aria-label') || target.innerText || target.textContent;
      
      if (textToRead && textToRead.trim().length > 0 && textToRead.trim().length < 200) {
        if (target.getAttribute("data-sr-read") === "true") return;
        target.setAttribute("data-sr-read", "true");
        setTimeout(() => target.removeAttribute("data-sr-read"), 1200);

        if (window.speechSynthesis) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(textToRead.trim());
          utterance.lang = 'en-US';
          window.speechSynthesis.speak(utterance);
        }
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      console.log("Voice Reader: Deactivated");
    };
  }, [screenReaderOpt]);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    card.style.setProperty("--x", `${x / (box.width / 2)}`);
    card.style.setProperty("--y", `${y / (box.height / 2)}`);
  };

  const handleCardMouseLeave = (cardId: number) => (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty("--x", "0");
    card.style.setProperty("--y", "0");
    setHoveredCard(null);
  };

  const niches = [
    {
      title: "Finance & Wealth",
      icon: DollarSign,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-emerald-950/20",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-businesswoman-checking-financial-charts-on-a-tablet-40405-large.mp4",
      initialViews: 128400
    },
    {
      title: "Fitness & Diet",
      icon: Dumbbell,
      color: "text-red-400 bg-red-500/10 border-red-500/20 shadow-red-950/20",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-athlete-performing-push-ups-in-the-gym-42646-large.mp4",
      initialViews: 94300
    },
    {
      title: "Tech & Future AI",
      icon: Cpu,
      color: "text-[#38bdf8] bg-[#38bdf8]/10 border-[#38bdf8]/20 shadow-cyan-950/20",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-typing-on-a-glowing-neon-keyboard-in-the-dark-44061-large.mp4",
      initialViews: 241000
    },
    {
      title: "Motivation & Mindset",
      icon: Flame,
      color: "text-orange-400 bg-orange-500/10 border-orange-500/20 shadow-orange-950/20",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-thoughtful-man-looking-out-at-the-ocean-at-sunset-41716-large.mp4",
      initialViews: 185000
    },
    {
      title: "Business & Startups",
      icon: Briefcase,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20 shadow-blue-950/20",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-creative-team-working-on-a-startup-project-41740-large.mp4",
      initialViews: 112000
    },
    {
      title: "Travel & Exploration",
      icon: Compass,
      color: "text-teal-400 bg-teal-500/10 border-teal-500/20 shadow-teal-950/20",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-beautiful-view-of-waves-crashing-on-a-sandy-beach-42358-large.mp4",
      initialViews: 304000
    },
    {
      title: "Human Psychology",
      icon: Brain,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20 shadow-purple-950/20",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-kaleidoscopic-motion-of-vibrant-neon-patterns-43306-large.mp4",
      initialViews: 219000
    },
    {
      title: "Science & Space",
      icon: Orbit,
      color: "text-pink-400 bg-pink-500/10 border-pink-500/20 shadow-pink-950/20",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-network-of-glowing-lines-44331-large.mp4",
      initialViews: 153000
    },
    {
      title: "Pop Culture & Media",
      icon: Film,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20 shadow-amber-950/20",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-panning-shot-of-the-retro-glowing-marquee-of-a-cinema-44673-large.mp4",
      initialViews: 88500
    },
    {
      title: "Untold History",
      icon: BookOpen,
      color: "text-rose-400 bg-rose-500/10 border-rose-500/20 shadow-rose-950/20",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-old-books-stacked-in-a-dimly-lit-library-41584-large.mp4",
      initialViews: 172000
    }
  ];

  const workflowButtons = [
    {
      id: "viral_shorts",
      title: "Viral Shorts",
      icon: Sparkles,
      previewType: "shorts",
      glowColor: "rgba(56,189,248,0.3)",
      glowClass: "shadow-[0_0_15px_rgba(56,189,248,0.06)] hover:shadow-[0_0_30px_rgba(56,189,248,0.35)]",
      borderColor: "border-[#38bdf8]/15 hover:border-[#38bdf8]/60",
      bgImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80"
    },
    {
      id: "fake_text",
      title: "Fake Text",
      icon: MessageSquare,
      previewType: "text",
      glowColor: "rgba(236,72,153,0.3)",
      glowClass: "shadow-[0_0_15px_rgba(236,72,153,0.06)] hover:shadow-[0_0_30px_rgba(236,72,153,0.35)]",
      borderColor: "border-[#ec4899]/15 hover:border-[#ec4899]/60",
      bgImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80"
    },
    {
      id: "story_pov",
      title: "Story POV",
      icon: Eye,
      previewType: "pov",
      glowColor: "rgba(139,92,246,0.3)",
      glowClass: "shadow-[0_0_15px_rgba(139,92,246,0.06)] hover:shadow-[0_0_30px_rgba(139,92,246,0.35)]",
      borderColor: "border-[#8b5cf6]/15 hover:border-[#8b5cf6]/60",
      bgImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&q=80"
    },
    {
      id: "split_screen",
      title: "Split-screen",
      icon: Layers,
      previewType: "split",
      glowColor: "rgba(16,185,129,0.3)",
      glowClass: "shadow-[0_0_15px_rgba(16,185,129,0.06)] hover:shadow-[0_0_30px_rgba(16,185,129,0.35)]",
      borderColor: "border-[#10b981]/15 hover:border-[#10b981]/60",
      bgImage: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&q=80"
    },
    {
      id: "ecommerce_ads",
      title: "E-commerce Ads",
      icon: ShoppingBag,
      previewType: "ads",
      glowColor: "rgba(245,158,11,0.3)",
      glowClass: "shadow-[0_0_15px_rgba(245,158,11,0.06)] hover:shadow-[0_0_30px_rgba(245,158,11,0.35)]",
      borderColor: "border-[#f59e0b]/15 hover:border-[#f59e0b]/60",
      bgImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80"
    },
    {
      id: "long_form",
      title: "Long-form",
      icon: Video,
      previewType: "long",
      glowColor: "rgba(99,102,241,0.3)",
      glowClass: "shadow-[0_0_15px_rgba(99,102,241,0.06)] hover:shadow-[0_0_30px_rgba(99,102,241,0.35)]",
      borderColor: "border-[#6366f1]/15 hover:border-[#6366f1]/60",
      bgImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80"
    },
    {
      id: "long_to_shorts",
      title: "Long-to-shorts",
      icon: Zap,
      previewType: "crop",
      glowColor: "rgba(20,184,166,0.3)",
      glowClass: "shadow-[0_0_15px_rgba(20,184,166,0.06)] hover:shadow-[0_0_30px_rgba(20,184,166,0.35)]",
      borderColor: "border-[#14b8a6]/15 hover:border-[#14b8a6]/60",
      bgImage: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&q=80"
    },
    {
      id: "custom_mode",
      title: "Custom Mode",
      icon: Sliders,
      previewType: "audio",
      glowColor: "rgba(168,85,247,0.3)",
      glowClass: "shadow-[0_0_15px_rgba(168,85,247,0.06)] hover:shadow-[0_0_30px_rgba(168,85,247,0.35)]",
      borderColor: "border-[#a855f7]/15 hover:border-[#a855f7]/60",
      bgImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80"
    }
  ];

  const stepsData = [
    {
      title: "Script & Concept",
      subtitle: "Choose concepts and generate precise viral scripts instantly with a single click.",
      label: "SCRIPTING",
      icon: Wand2
    },
    {
      title: "AI Production",
      subtitle: "Smart video generation, automated editing, and high-end visual asset creation.",
      label: "PRODUCTION",
      icon: Video
    },
    {
      title: "Shadow Channels",
      subtitle: "Manage shadow channels and execute simultaneous automated publishing across top networks.",
      label: "SHADOWING",
      icon: Share2
    },
    {
      title: "Lead Automation",
      subtitle: "Smart chat response automation and precise keyword-based lead hunting.",
      label: "ENGAGEMENT",
      icon: MessageSquare
    }
  ];

  return (
    <div 
      id="landing-container" 
      className={`relative bg-[#121212] text-slate-300 flex-1 flex flex-col font-sans overflow-x-hidden min-h-screen ${
        textSize === "large" ? "accessibility-text-large" : textSize === "xlarge" ? "accessibility-text-xlarge" : ""
      } ${
        contrast === "high" ? "accessibility-high-contrast" : ""
      }`}
    >
      
      {/* High-End Hero Section */}
      <section id="hero-section" className="relative z-10 min-h-[calc(100vh-5rem)] w-full px-4 sm:px-6 text-center flex flex-col items-center justify-center pt-2 pb-10">
        {/* Glow effect backdrops */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-[#38bdf8]/5 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center pt-2 pb-56">
          {/* Social Proof Badge */}
          <div className="flex items-center space-x-2.5 mb-8 px-4.5 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] shadow-md hover:border-white/[0.12] transition-colors">
            <div className="flex -space-x-1.5">
              <div className="w-4.5 h-4.5 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 border border-neutral-950" />
              <div className="w-4.5 h-4.5 rounded-full bg-gradient-to-tr from-[#38bdf8] to-blue-500 border border-neutral-950" />
              <div className="w-4.5 h-4.5 rounded-full bg-gradient-to-tr from-emerald-400 to-green-500 border border-neutral-950" />
              <div className="w-4.5 h-4.5 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 border border-neutral-950" />
            </div>
            <span className="text-[15.5px] font-semibold text-slate-200 tracking-wide font-sans">
              Trusted by <strong className="text-white font-black">2,000+</strong> creators
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#38bdf8] tracking-tight uppercase leading-[1.15] max-w-4xl font-sans">
            BUILD YOUR VIRAL CONTENT EMPIRE &<br className="hidden sm:inline" /> AUTOMATE LEAD GENERATION ON AUTO-PILOT.
          </h1>

          {/* Subheadline (Pure White, readable text, compact font size) */}
          <p className="mt-4 text-xs sm:text-sm md:text-base font-bold text-white max-w-3xl leading-relaxed font-sans">
            Your all-in-one AI engine: master Viral Shorts, Fake Text, POV, Split-screen, Full Long-form (2-10 min) Creation, Long-form to Auto-Clips, and E-commerce Ads. Scale 60-300 videos/credits per month, automate DM lead generation, schedule bulk content across Shadow Channels with one click, and track real-time growth analytics.
          </p>
        </div>

        {/* Bottom section of the viewport within hero container */}
        <div className="absolute bottom-[80px] left-0 right-0 z-20 flex flex-col items-center justify-center px-4">
          
          {/* Social Platforms Row (Arranged on a single clean line directly ABOVE the CTA button) */}
          <div className="mb-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 select-none">
            <span className="text-white uppercase tracking-widest text-[11px] font-sans font-bold shrink-0">Perfect for</span>
            
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              {/* YouTube */}
              <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200 cursor-pointer group">
                <div className="p-1.5 bg-[#FF0000]/10 rounded-lg flex items-center justify-center transition-colors">
                  <svg className="w-[30px] h-[30px] text-[#FF0000] fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.002 3.002 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837z" />
                    <polygon points="9.545 15.568 15.818 12 9.545 8.432 9.545 15.568" fill="white" />
                  </svg>
                </div>
                <span className="text-[12px] font-bold tracking-wide text-white font-sans transition-colors group-hover:text-[#FF0000]">YouTube</span>
              </div>

              {/* Instagram */}
              <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200 cursor-pointer group">
                <div className="p-1.5 bg-gradient-to-tr from-[#f9ce34]/10 via-[#ee2a7b]/10 to-[#6228d7]/10 rounded-lg flex items-center justify-center transition-colors">
                  <svg className="w-[30px] h-[30px]" viewBox="0 0 24 24" fill="none" stroke="url(#ig-grad-hero-new-redesign)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <defs>
                      <linearGradient id="ig-grad-hero-new-redesign" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f9ce34" />
                        <stop offset="50%" stopColor="#ee2a7b" />
                        <stop offset="100%" stopColor="#6228d7" />
                      </linearGradient>
                    </defs>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </div>
                <span className="text-[12px] font-bold tracking-wide text-white font-sans transition-colors group-hover:text-[#ee2a7b]">Instagram</span>
              </div>
              
              {/* TikTok */}
              <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200 cursor-pointer group">
                <div className="p-1.5 bg-black rounded-lg flex items-center justify-center transition-colors">
                  <svg className="w-[30px] h-[30px] text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.17.94 1.13 2.29 1.83 3.74 2.05V10.1c-1.63-.04-3.23-.55-4.57-1.49-.19-.13-.37-.28-.55-.42V17.07c0 1.27-.24 2.55-.83 3.68-1.07 2.06-3.32 3.32-5.63 3.23-2.61-.1-4.94-1.85-5.66-4.35-.87-3.03.87-6.38 3.93-7.14.77-.19 1.57-.2 2.35-.04v3.96c-.49-.11-.99-.12-1.48-.04-1.25.19-2.22 1.25-2.27 2.51-.07 1.76 1.48 3.19 3.24 3.08 1.37-.09 2.44-1.19 2.47-2.56.01-3.01.01-6.02.01-9.03C12.51 6.37 12.54 3.19 12.525.02z" />
                  </svg>
                </div>
                <span className="text-[12px] font-bold tracking-wide text-white font-sans transition-colors group-hover:text-[#00F2FE]">TikTok</span>
              </div>

              {/* Facebook */}
              <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200 cursor-pointer group">
                <div className="p-1.5 bg-[#1877F2]/10 rounded-lg flex items-center justify-center transition-colors">
                  <svg className="w-[30px] h-[30px]" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="12" fill="#1877F2" />
                    <path d="M16 12h-3v8h-3v-8H8.5V9.5H10V8c0-2.3 1.4-3.5 3.5-3.5 1 0 1.8.1 2 .1v2.3h-1.4c-1.1 0-1.3.5-1.3 1.3v1.3h3.1L16 12z" fill="white" />
                  </svg>
                </div>
                <span className="text-[12px] font-bold tracking-wide text-white font-sans transition-colors group-hover:text-[#1877F2]">Facebook</span>
              </div>
            </div>
          </div>

          {/* Hero Call to Action Section */}
          <div className="flex flex-col items-center">
            <button
              onClick={onStartGenerating}
              className="create-video-button px-12 text-base font-sans font-extrabold uppercase tracking-widest rounded-full cursor-pointer flex items-center justify-center space-x-3 active:scale-[0.98] group"
            >
              <span className="text-black font-extrabold font-sans">CREATE YOUR FIRST VIDEO</span>
              <Rocket className="h-5.5 w-5.5 text-black fill-current transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </button>
            
            {/* Pure White subtle footer text */}
            <span className="mt-4 text-[11px] sm:text-xs font-semibold text-white tracking-wide font-sans select-none opacity-90">
              Get your generated video in less than 5 minutes.
            </span>
          </div>

        </div>

        {/* Subtle, small, and non-intrusive Accessibility Widget */}
        <div className="absolute bottom-[80px] left-[20px] z-30 flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setAccessibilityMenuOpen(!accessibilityMenuOpen)}
              aria-label="Accessibility Settings Menu"
              title="Accessibility Controls"
              style={{ backgroundColor: "#38bdf8", color: "#FFFFFF" }}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg shadow-[#38bdf8]/30 hover:bg-[#38bdf8]/85 group active:scale-95"
            >
              <Accessibility className="w-4.5 h-4.5 transition-transform group-hover:scale-110 text-white" />
            </button>

            {accessibilityMenuOpen && (
              <div className="absolute bottom-11 left-0 mb-2 w-72 bg-[#242424]/95 backdrop-blur-md border border-white/[0.08] shadow-2xl rounded-2xl p-4 text-left font-sans z-50">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
                  <div className="flex items-center space-x-2">
                    <Accessibility className="w-4.5 h-4.5 text-[#38bdf8]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white">Accessibility Menu</span>
                  </div>
                  <button
                    onClick={() => setAccessibilityMenuOpen(false)}
                    className="p-1 rounded-lg hover:bg-white/[0.06] text-slate-400 hover:text-white transition-colors cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Text Size Controls */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[11px] font-semibold text-slate-300">Text Size</span>
                    <span className="text-[10px] font-mono text-[#38bdf8] uppercase font-bold">{textSize}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      onClick={() => setTextSize("normal")}
                      className={`py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                        textSize === "normal"
                          ? "bg-[#38bdf8] text-white border-transparent shadow-sm shadow-[#38bdf8]/20"
                          : "bg-white/[0.02] border-white/[0.06] text-slate-400 hover:bg-white/[0.05] hover:text-white"
                      }`}
                    >
                      A (Default)
                    </button>
                    <button
                      onClick={() => setTextSize("large")}
                      className={`py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                        textSize === "large"
                          ? "bg-[#38bdf8] text-white border-transparent shadow-sm shadow-[#38bdf8]/20"
                          : "bg-white/[0.02] border-white/[0.06] text-slate-400 hover:bg-white/[0.05] hover:text-white"
                      }`}
                    >
                      A+ (Large)
                    </button>
                    <button
                      onClick={() => setTextSize("xlarge")}
                      className={`py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                        textSize === "xlarge"
                          ? "bg-[#38bdf8] text-white border-transparent shadow-sm shadow-[#38bdf8]/20"
                          : "bg-white/[0.02] border-white/[0.06] text-slate-400 hover:bg-white/[0.05] hover:text-white"
                      }`}
                    >
                      A++ (X-Large)
                    </button>
                  </div>
                </div>

                {/* Contrast Controls */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[11px] font-semibold text-slate-300">Contrast Mode</span>
                    <span className="text-[10px] font-mono text-[#38bdf8] uppercase font-bold">{contrast === "high" ? "High" : "Standard"}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => setContrast("normal")}
                      className={`py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                        contrast === "normal"
                          ? "bg-[#38bdf8] text-white border-transparent shadow-sm shadow-[#38bdf8]/20"
                          : "bg-white/[0.02] border-white/[0.06] text-slate-400 hover:bg-white/[0.05] hover:text-white"
                      }`}
                    >
                      Standard
                    </button>
                    <button
                      onClick={() => setContrast("high")}
                      className={`py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                        contrast === "high"
                          ? "bg-[#38bdf8] text-white border-transparent shadow-sm shadow-[#38bdf8]/20"
                          : "bg-white/[0.02] border-white/[0.06] text-slate-400 hover:bg-white/[0.05] hover:text-white"
                      }`}
                    >
                      High Contrast
                    </button>
                  </div>
                </div>

                {/* Screen Reader Optimization Toggle */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[11px] font-semibold text-slate-300">Screen Reader Assistant</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase ${
                      screenReaderOpt ? "bg-emerald-500/10 text-emerald-400" : "bg-white/5 text-slate-500"
                    }`}>
                      {screenReaderOpt ? "On" : "Off"}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mb-2 leading-tight">
                    Speaks the labels of buttons and sections automatically as you hover over them.
                  </p>
                  <button
                    onClick={() => {
                      const newState = !screenReaderOpt;
                      setScreenReaderOpt(newState);
                      if (newState && window.speechSynthesis) {
                        window.speechSynthesis.cancel();
                        const utterance = new SpeechSynthesisUtterance("Screen reader optimization activated. Hover any text or buttons to hear them.");
                        window.speechSynthesis.speak(utterance);
                      }
                    }}
                    className={`w-full py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                      screenReaderOpt
                        ? "bg-[#38bdf8] text-white border-transparent"
                        : "bg-white/[0.02] border-white/[0.06] text-slate-400 hover:bg-white/[0.05]"
                    }`}
                  >
                    {screenReaderOpt ? "Disable Assistant" : "Enable Voice Reader"}
                  </button>
                </div>

                {/* Reset Buttons */}
                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
                  <button
                    onClick={() => {
                      setTextSize("normal");
                      setContrast("normal");
                      setScreenReaderOpt(false);
                      if (window.speechSynthesis) {
                        window.speechSynthesis.cancel();
                      }
                    }}
                    className="text-[10px] font-bold text-[#38bdf8] hover:text-white transition-colors cursor-pointer"
                  >
                    Reset Settings
                  </button>
                  <span className="text-[9px] text-slate-500 font-mono">WCAG 2.1 Compliant</span>
                </div>
              </div>
            )}
          </div>

          {screenReaderOpt && (
            <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full animate-pulse select-none">
              Reader Active
            </span>
          )}
        </div>
      </section>





      {/* Redesigned Premium Master Control Center Section */}
      <section id="master-control-center" className="relative z-10 pb-6 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#121212]">
        {/* Section Header with tighter spacing */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-[#38bdf8] uppercase tracking-tight">
            Master Control Center
          </h2>
          <p className="mt-1 text-xs text-white/80">
            Select an automated workflow mode below to preview and launch your pipeline.
          </p>
        </div>

        {/* Compact 4x2 Grid layout with tall, vertical 9:16 cards */}
        <div className="py-2 w-full">
          <div 
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "15px",
              width: "100%",
              maxWidth: "700px",
              margin: "0 auto"
            }}
          >
            {workflowButtons.map((button) => {
              const IconComponent = button.icon;
              return (
                <div 
                  key={button.id}
                  onClick={onStartGenerating}
                  style={{ 
                    height: "260px",
                    aspectRatio: "9 / 16",
                    background: "#121212",
                    border: "1px solid rgba(56, 189, 248, 0.3)",
                    borderRadius: "12px",
                    display: "flex",
                    flexDirection: "column",
                    padding: "8px",
                    overflow: "hidden"
                  }}
                  className="relative group transition-all duration-300 cursor-pointer hover:-translate-y-0.5 hover:border-[#3b82f6]/80 hover:shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                >
                  {/* Title: Centered at top */}
                  <div 
                    style={{
                      margin: "2px 0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px"
                    }}
                    className="relative z-10 w-full"
                  >
                    <div className="p-0.5 rounded bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <IconComponent className="h-3 w-3 text-white" />
                    </div>
                    <h3 
                      style={{
                        fontSize: "10px",
                        textAlign: "center",
                        color: "#fff",
                        textTransform: "uppercase",
                        fontWeight: 600
                      }}
                      className="tracking-wider group-hover:text-[#38bdf8] transition-colors duration-200 truncate"
                    >
                      {button.title}
                    </h3>
                  </div>

                  {/* Video Placeholder: Takes remaining space */}
                  <div 
                    style={{
                      flexGrow: 1,
                      width: "100%",
                      background: "#000",
                      borderRadius: "6px",
                      marginTop: "5px"
                    }}
                    className="relative overflow-hidden flex items-center justify-center"
                  >
                    {/* Background thumbnail image placeholder */}
                    <img 
                      src={button.bgImage} 
                      alt={button.title}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover opacity-15 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                    />

                    {/* Dark gradient scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/50 pointer-events-none z-5" />

                    {/* Centered Compact Play icon inside subtle glowing ring */}
                    <div className="relative z-10 w-8 h-8 rounded-full bg-black/60 border border-white/15 flex items-center justify-center backdrop-blur-xs group-hover:bg-white group-hover:border-transparent group-hover:scale-105 transition-all duration-300 shadow-sm">
                      <Play className="w-2.5 h-2.5 text-white fill-current ml-[0.5px] group-hover:text-black transition-colors" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

       <BentoShowcase 
        onStartGenerating={onStartGenerating} 
        setSelectedWorkflowStep={setSelectedWorkflowStep} 
        setIsWorkflowModalOpen={setIsWorkflowModalOpen} 
      />

        {/* Dynamic Workflow Sandbox Terminal Modal */}
        {isWorkflowModalOpen && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-neutral-900 border border-white/[0.08] shadow-[0_0_60px_rgba(56,189,248,0.15)] max-w-4xl w-full rounded-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Top Control Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06] bg-black/40">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-xs font-mono text-slate-400">neural_pipeline_sim_v1.0.4.sh</span>
                </div>

                <div className="flex items-center gap-4">
                  {/* Miniature step selector tabs in modal */}
                  <div className="hidden sm:flex bg-neutral-950/60 border border-white/[0.04] p-1 rounded-lg">
                    {[
                      { id: 0, label: "01" },
                      { id: 1, label: "02" },
                      { id: 2, label: "03" },
                      { id: 3, label: "04" }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedWorkflowStep(tab.id)}
                        className={`text-xs px-2.5 py-1 rounded font-mono font-bold transition-all ${
                          selectedWorkflowStep === tab.id 
                            ? "bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/20" 
                            : "text-slate-500 hover:text-slate-300"
                        }`}
                      >
                        Step {tab.label}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setIsWorkflowModalOpen(false)}
                    className="p-1.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-slate-400 hover:text-white hover:border-white/[0.12] transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Core Body Content split layout */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden min-h-0">
                
                {/* Left Side: Parameters / Settings Console (5 Columns) */}
                <div className="md:col-span-5 bg-[#141414] border-r border-white/[0.04] p-6 space-y-6 overflow-y-auto text-left">
                  {selectedWorkflowStep === 0 && (
                    <div className="space-y-5">
                      <div>
                        <span className="text-[10px] font-mono font-bold tracking-wider text-[#38bdf8] bg-[#38bdf8]/10 px-2 py-0.5 rounded border border-[#38bdf8]/20">STEP 01 MODULE</span>
                        <h4 className="text-base font-black text-white mt-1.5 uppercase">Script Prompt Compiler</h4>
                        <p className="text-xs text-slate-400 mt-1">Configure target keywords and viral tone strategies.</p>
                      </div>

                      {/* Topic selection */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Target Concept Niche</label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { id: "dark_psychology", name: "Dark Psych" },
                            { id: "wealth_secrets", name: "Wealth Loop" },
                            { id: "biohacking", name: "Biohacking" },
                            { id: "survival_hacks", name: "Toxic Boss" }
                          ].map(t => (
                            <button
                              key={t.id}
                              onClick={() => { setSimTopic(t.id); setGeneratedScriptText(""); }}
                              className={`text-xs p-2.5 rounded-lg border font-bold text-center transition-all ${
                                simTopic === t.id 
                                  ? "bg-[#38bdf8]/10 border-[#38bdf8]/35 text-[#38bdf8]" 
                                  : "bg-black/30 border-white/[0.03] hover:border-white/[0.1] text-slate-400"
                              }`}
                            >
                              {t.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Tone select */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Engine Tone Accent</label>
                        <div className="grid grid-cols-3 gap-1.5">
                          {[
                            { id: "eerie", name: "Eerie" },
                            { id: "clinical", name: "Clinical" },
                            { id: "high_energy", name: "Aggressive" }
                          ].map(to => (
                            <button
                              key={to.id}
                              onClick={() => { setSimTone(to.id); setGeneratedScriptText(""); }}
                              className={`text-[10px] py-2 rounded-md border font-mono font-bold text-center transition-all ${
                                simTone === to.id 
                                  ? "bg-[#38bdf8]/10 border-[#38bdf8]/30 text-[#38bdf8]" 
                                  : "bg-black/20 border-white/[0.03] hover:border-white/[0.08] text-slate-400"
                              }`}
                            >
                              {to.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Hook select */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Viral Retention Hook</label>
                        <div className="space-y-2">
                          {[
                            { id: "warning", label: "🚨 Extreme Warning Alarm" },
                            { id: "secret", label: "🤫 Stealth Secret Blueprint" },
                            { id: "contrarian", label: "🤯 Contrarian Myth Buster" }
                          ].map(ho => (
                            <button
                              key={ho.id}
                              onClick={() => { setSimHook(ho.id); setGeneratedScriptText(""); }}
                              className={`w-full text-xs text-left p-2.5 rounded-lg border font-bold flex items-center justify-between transition-all ${
                                simHook === ho.id 
                                  ? "bg-[#38bdf8]/10 border-[#38bdf8]/30 text-[#38bdf8]" 
                                  : "bg-black/20 border-white/[0.03] hover:border-white/[0.08] text-slate-400"
                              }`}
                            >
                              <span>{ho.label}</span>
                              {simHook === ho.id && <Check className="w-3.5 h-3.5 text-[#38bdf8]" />}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={handleGenerateScript}
                        disabled={isGeneratingScript}
                        className="w-full mt-2 py-3 rounded-xl bg-[#38bdf8] text-black font-black text-xs uppercase tracking-wider hover:bg-white hover:scale-[1.01] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        <Wand2 className="w-4 h-4" />
                        {isGeneratingScript ? "Compiling Script..." : "Trigger Neural Prompt Compile"}
                      </button>
                    </div>
                  )}

                  {selectedWorkflowStep === 1 && (
                    <div className="space-y-5">
                      <div>
                        <span className="text-[10px] font-mono font-bold tracking-wider text-[#38bdf8] bg-[#38bdf8]/10 px-2 py-0.5 rounded border border-[#38bdf8]/20">STEP 02 MODULE</span>
                        <h4 className="text-base font-black text-white mt-1.5 uppercase">AI Video & Audio Studio</h4>
                        <p className="text-xs text-slate-400 mt-1">Select voice actors, typography layouts, and audio backing track.</p>
                      </div>

                      {/* Voice selection */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Voiceover Actor</label>
                        <div className="space-y-2">
                          {[
                            { id: "Jordan", desc: "Dr. Jordan - Deep Cinematic Whisper (Male)" },
                            { id: "Sophia", desc: "Sophia - High Energy Retention Coach (Female)" },
                            { id: "Alex", desc: "Alex - Intense Investigative Journalist (Male)" }
                          ].map(v => (
                            <button
                              key={v.id}
                              onClick={() => setSimVoice(v.id)}
                              className={`w-full text-xs text-left p-2.5 rounded-lg border font-bold flex items-center justify-between transition-all ${
                                simVoice === v.id 
                                  ? "bg-[#38bdf8]/10 border-[#38bdf8]/30 text-[#38bdf8]" 
                                  : "bg-black/20 border-white/[0.03] hover:border-white/[0.08] text-slate-400"
                              }`}
                            >
                              <span>{v.desc}</span>
                              {simVoice === v.id && <Check className="w-3.5 h-3.5 text-[#38bdf8]" />}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Caption style */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Kinetic Caption Styles</label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: "hyper_yellow", name: "Hyper Yellow" },
                            { id: "neon_green", name: "Emerald Box" },
                            { id: "minimalist", name: "Clean Minimal" }
                          ].map(sty => (
                            <button
                              key={sty.id}
                              onClick={() => setSimSubtitleStyle(sty.id)}
                              className={`text-[10px] p-2 rounded-lg border font-mono font-bold text-center transition-all ${
                                simSubtitleStyle === sty.id 
                                  ? "bg-[#38bdf8]/10 border-[#38bdf8]/30 text-[#38bdf8]" 
                                  : "bg-black/20 border-white/[0.03] hover:border-white/[0.08] text-slate-400"
                              }`}
                            >
                              {sty.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Background music selection */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">BGM Atmosphere Beat</label>
                        <div className="space-y-2">
                          {[
                            { id: "phonk", desc: "🎧 Cyberpunk Phonk (120BPM Sync)" },
                            { id: "dark_ambient", desc: "🛸 Dark Frequency Drone Subwoofer" },
                            { id: "orchestral", desc: "🎻 Suspenseful Orchestral String Run" }
                          ].map(b => (
                            <button
                              key={b.id}
                              onClick={() => setSimBgm(b.id)}
                              className={`w-full text-xs text-left p-2.5 rounded-lg border font-bold flex items-center justify-between transition-all ${
                                simBgm === b.id 
                                  ? "bg-[#38bdf8]/10 border-[#38bdf8]/30 text-[#38bdf8]" 
                                  : "bg-black/20 border-white/[0.03] hover:border-white/[0.08] text-slate-400"
                              }`}
                            >
                              <span>{b.desc}</span>
                              {simBgm === b.id && <Check className="w-3.5 h-3.5 text-[#38bdf8]" />}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={handleRenderVideo}
                        disabled={isRenderingVideo}
                        className="w-full mt-2 py-3 rounded-xl bg-[#38bdf8] text-black font-black text-xs uppercase tracking-wider hover:bg-white hover:scale-[1.01] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        <Video className="w-4 h-4" />
                        {isRenderingVideo ? "Rendering Vertical Stream..." : "Trigger High-Fidelity Render"}
                      </button>
                    </div>
                  )}

                  {selectedWorkflowStep === 2 && (
                    <div className="space-y-5">
                      <div>
                        <span className="text-[10px] font-mono font-bold tracking-wider text-[#38bdf8] bg-[#38bdf8]/10 px-2 py-0.5 rounded border border-[#38bdf8]/20">STEP 03 MODULE</span>
                        <h4 className="text-base font-black text-white mt-1.5 uppercase">Shadow Network Dispatcher</h4>
                        <p className="text-xs text-slate-400 mt-1">Select proxy rotation endpoints and multi-platform broad targets.</p>
                      </div>

                      {/* Active platforms checks */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Target Channels Network</label>
                        <div className="space-y-2">
                          {["YouTube Shorts", "TikTok Shadow", "Instagram Reels", "Facebook Reels"].map(plat => {
                            const isChecked = simPlatforms.includes(plat);
                            return (
                              <button
                                key={plat}
                                onClick={() => {
                                  if (isChecked) {
                                    setSimPlatforms(prev => prev.filter(p => p !== plat));
                                  } else {
                                    setSimPlatforms(prev => [...prev, plat]);
                                  }
                                }}
                                className={`w-full text-xs text-left p-2.5 rounded-lg border font-bold flex items-center justify-between transition-all ${
                                  isChecked 
                                    ? "bg-[#38bdf8]/10 border-[#38bdf8]/30 text-[#38bdf8]" 
                                    : "bg-black/20 border-white/[0.03] hover:border-white/[0.08] text-slate-400"
                                }`}
                              >
                                <span>{plat}</span>
                                <div className={`w-4 h-4 rounded border flex items-center justify-center ${isChecked ? "bg-[#38bdf8] border-[#38bdf8] text-black" : "border-white/20 bg-transparent"}`}>
                                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Proxies list */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">IP Proxy Rotator</label>
                        <div className="space-y-2">
                          {[
                            { id: "chicago", desc: "🇺🇸 Chicago Residential (US-Midwest)" },
                            { id: "frankfurt", desc: "🇩🇪 Frankfurt Secure Datacenter (EU-Central)" },
                            { id: "tokyo", desc: "🇯🇵 Tokyo Private Node (AP-East)" }
                          ].map(pr => (
                            <button
                              key={pr.id}
                              onClick={() => setSimProxy(pr.id)}
                              className={`w-full text-xs text-left p-2.5 rounded-lg border font-bold flex items-center justify-between transition-all ${
                                simProxy === pr.id 
                                  ? "bg-[#38bdf8]/10 border-[#38bdf8]/30 text-[#38bdf8]" 
                                  : "bg-black/20 border-white/[0.03] hover:border-white/[0.08] text-slate-400"
                              }`}
                            >
                              <span>{pr.desc}</span>
                              {simProxy === pr.id && <Check className="w-3.5 h-3.5 text-[#38bdf8]" />}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={handleBroadcastNetwork}
                        disabled={isBroadcasting || simPlatforms.length === 0}
                        className="w-full mt-2 py-3 rounded-xl bg-[#38bdf8] text-black font-black text-xs uppercase tracking-wider hover:bg-white hover:scale-[1.01] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        <Share2 className="w-4 h-4" />
                        {isBroadcasting ? "Executing Multi-Dispatch..." : "Execute Automated Dispatch"}
                      </button>
                    </div>
                  )}

                  {selectedWorkflowStep === 3 && (
                    <div className="space-y-5">
                      <div>
                        <span className="text-[10px] font-mono font-bold tracking-wider text-[#38bdf8] bg-[#38bdf8]/10 px-2 py-0.5 rounded border border-[#38bdf8]/20">STEP 04 MODULE</span>
                        <h4 className="text-base font-black text-white mt-1.5 uppercase">AI Lead Capture Bot</h4>
                        <p className="text-xs text-slate-400 mt-1">Configure automation trigger tags and post simulated test comments.</p>
                      </div>

                      {/* Keyword triggers selection */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Detection trigger Tag</label>
                        <div className="grid grid-cols-3 gap-2">
                          {["GUIDE", "BLUEPRINT", "SECRET"].map(key => (
                            <button
                              key={key}
                              onClick={() => setSimKeyword(key)}
                              className={`text-[10px] py-2 rounded-lg border font-mono font-bold text-center transition-all ${
                                simKeyword === key 
                                  ? "bg-[#38bdf8]/10 border-[#38bdf8]/35 text-[#38bdf8]" 
                                  : "bg-black/20 border-white/[0.03] hover:border-white/[0.08] text-slate-400"
                              }`}
                            >
                              "{key}"
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Preset comment templates */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Quick Test Comment Presets</label>
                        <div className="space-y-1.5">
                          {[
                            `"This is crazy. Where is the link to the ${simKeyword.toLowerCase()}?"`,
                            `"Can you send me the free ${simKeyword.toLowerCase()}? I am stuck"`,
                            `"Is this free? Reply the ${simKeyword.toLowerCase()} guide folder"`
                          ].map((commentText, i) => (
                            <button
                              key={i}
                              onClick={() => handlePostComment(commentText)}
                              className="w-full text-[10px] text-slate-400 hover:text-white bg-black/30 border border-white/[0.04] hover:border-white/[0.1] text-left px-3 py-2 rounded-lg truncate transition-all font-mono"
                            >
                              {commentText}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Custom comments block */}
                      <div className="space-y-2 pt-1">
                        <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Custom Comment Sandbox</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={simUserComment}
                            onChange={(e) => setSimUserComment(e.target.value)}
                            placeholder={`Type a comment containing "${simKeyword}"...`}
                            className="flex-1 bg-black/40 border border-white/[0.06] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#38bdf8]/60 placeholder-slate-600 font-mono"
                          />
                          <button
                            onClick={() => handlePostComment()}
                            className="bg-[#38bdf8] text-black px-4.5 rounded-lg text-xs font-black uppercase hover:bg-white transition-colors"
                          >
                            Post
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Side: Real-Time Code Execution Monitor & Output Visualizer (7 Columns) */}
                <div className="md:col-span-7 bg-[#0A0A0A] p-6 flex flex-col justify-between overflow-y-auto relative text-left">
                  {/* Glowing background grid */}
                  <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
                  
                  {selectedWorkflowStep === 0 && (
                    <div className="flex flex-col justify-between h-full relative z-10">
                      <div>
                        <div className="flex justify-between items-center pb-3 border-b border-white/[0.06] mb-4">
                          <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Typewriter prompt output</span>
                          <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold">READY</span>
                        </div>

                        {/* Compiler log screen */}
                        <div className="p-4 rounded-xl bg-black/60 border border-white/[0.05] font-mono text-xs leading-relaxed min-h-[180px] flex flex-col justify-between">
                          {generatedScriptText ? (
                            <p className="text-slate-300">
                              <span className="text-[#38bdf8] font-bold">SCRIPT_OUT:</span> {generatedScriptText}
                            </p>
                          ) : (
                            <div className="text-slate-600 flex flex-col items-center justify-center py-12 text-center">
                              <Sparkles className="w-8 h-8 text-slate-700 animate-pulse mb-2" />
                              <span>Console Idle. Click "Trigger Neural Prompt Compile" to compile on sandbox.</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Step 1 Analytical Metrics */}
                      <div className="grid grid-cols-3 gap-3 mt-4">
                        <div className="p-3 rounded-lg bg-[#141414] border border-white/[0.04]">
                          <div className="text-[8px] text-slate-500 font-mono uppercase">Retention score</div>
                          <div className="text-base font-black text-emerald-400 font-mono mt-0.5">98.2%</div>
                        </div>
                        <div className="p-3 rounded-lg bg-[#141414] border border-white/[0.04]">
                          <div className="text-[8px] text-slate-500 font-mono uppercase">Hook Strength</div>
                          <div className="text-base font-black text-[#38bdf8] font-mono mt-0.5">Grade A+</div>
                        </div>
                        <div className="p-3 rounded-lg bg-[#141414] border border-white/[0.04]">
                          <div className="text-[8px] text-slate-500 font-mono uppercase">Target Niche</div>
                          <div className="text-xs font-black text-amber-400 font-mono mt-1.5 uppercase truncate">{simTopic.replace("_", " ")}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedWorkflowStep === 1 && (
                    <div className="flex flex-col justify-between h-full relative z-10">
                      <div>
                        <div className="flex justify-between items-center pb-3 border-b border-white/[0.06] mb-4">
                          <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">AV Rendering Terminal</span>
                          {isRenderingVideo ? (
                            <span className="text-[9px] bg-[#38bdf8]/10 text-[#38bdf8] px-2.5 py-0.5 rounded font-mono font-bold animate-pulse">RENDERING {renderProgress}%</span>
                          ) : (
                            <span className="text-[9px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono font-bold">STANDBY</span>
                          )}
                        </div>

                        {/* Rendering progress logs display */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                          {/* Mini render screen player */}
                          <div className="md:col-span-5 h-48 rounded-xl border border-white/10 bg-black relative overflow-hidden flex flex-col justify-between p-3.5 shadow-inner">
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 z-10" />
                            
                            {/* Abstract render visualization */}
                            <img 
                              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80" 
                              alt="Production Render Background" 
                              referrerPolicy="no-referrer"
                              className="absolute inset-0 w-full h-full object-cover opacity-40 z-0"
                            />

                            <div className="relative z-20 flex justify-between">
                              <span className="text-[7px] bg-red-600 text-white px-1 rounded uppercase font-bold font-mono">SIM_PLAY</span>
                              <span className="text-[7px] text-white/50 font-mono">1080x1920</span>
                            </div>

                            {/* Captions synced highlight */}
                            <div className="relative z-20 text-center">
                              <span className="text-xs font-black text-yellow-400 bg-black/80 px-1 py-0.5 rounded border border-yellow-400/20 uppercase tracking-wider">
                                {simSubtitleStyle === "hyper_yellow" ? "NEVER TRUST THEM" : simSubtitleStyle === "neon_green" ? "EMERALD PIPELINE" : "MINIMAL REVELATION"}
                              </span>
                            </div>

                            {/* Timeline indicators */}
                            <div className="relative z-20">
                              <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
                                <div className="h-full bg-[#38bdf8]" style={{ width: `${renderProgress}%` }} />
                              </div>
                            </div>
                          </div>

                          {/* Render step action logging */}
                          <div className="md:col-span-7 bg-black/50 p-3 rounded-xl border border-white/[0.04] font-mono text-[10px] space-y-1.5 h-48 overflow-y-auto">
                            {renderLogs.length > 0 ? (
                              renderLogs.map((log, lIdx) => (
                                <p key={lIdx} className="text-slate-400 flex items-start gap-1">
                                  <span className="text-slate-600">[{lIdx + 1}]</span>
                                  <span>{log}</span>
                                </p>
                              ))
                            ) : (
                              <div className="text-slate-600 flex flex-col items-center justify-center h-full text-center">
                                <Activity className="w-6 h-6 text-slate-800 mb-1" />
                                <span>No rendering task in progress.</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Render control metadata bar */}
                      <div className="p-3 rounded-lg bg-[#141414] border border-white/[0.04] flex items-center justify-between text-[10px] font-mono text-slate-400 mt-4">
                        <span>Voice Model: {simVoice}</span>
                        <span>Subtitle Style: {simSubtitleStyle}</span>
                        <span className="text-[#38bdf8] font-bold">H.264 MP4</span>
                      </div>
                    </div>
                  )}

                  {selectedWorkflowStep === 2 && (
                    <div className="flex flex-col justify-between h-full relative z-10">
                      <div>
                        <div className="flex justify-between items-center pb-3 border-b border-white/[0.06] mb-4">
                          <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Shadow Broadcaster Network Log</span>
                          {isBroadcasting ? (
                            <span className="text-[9px] bg-amber-500/10 text-amber-400 px-2.5 py-0.5 rounded font-mono font-bold animate-pulse">DISPATCHING STREAM</span>
                          ) : (
                            <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold">ALL PLATFORMS SAFE</span>
                          )}
                        </div>

                        {/* Broadcast status logs */}
                        <div className="p-4 rounded-xl bg-black/60 border border-white/[0.05] font-mono text-xs leading-relaxed min-h-[180px] space-y-2 max-h-[220px] overflow-y-auto">
                          {broadcastLogs.length > 0 ? (
                            broadcastLogs.map((log, bIdx) => (
                              <p key={bIdx} className="text-slate-300">
                                <span className="text-slate-600">#</span> {log}
                              </p>
                            ))
                          ) : (
                            <div className="text-slate-600 flex flex-col items-center justify-center py-12 text-center">
                              <Layers className="w-8 h-8 text-slate-700 animate-pulse mb-2" />
                              <span>Dispatcher Ready. Choose active platforms on the left and dispatch.</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Broadcaster detail counters */}
                      <div className="grid grid-cols-2 gap-3 mt-4">
                        <div className="p-3 rounded-lg bg-[#141414] border border-white/[0.04] flex items-center justify-between">
                          <span className="text-[9px] text-slate-500 font-mono uppercase">Rotating Node IP</span>
                          <span className="text-[10px] font-mono font-black text-[#38bdf8] uppercase">{simProxy}</span>
                        </div>
                        <div className="p-3 rounded-lg bg-[#141414] border border-white/[0.04] flex items-center justify-between">
                          <span className="text-[9px] text-slate-500 font-mono uppercase">Target Channels</span>
                          <span className="text-[10px] font-mono font-black text-emerald-400">{simPlatforms.length} Platforms</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedWorkflowStep === 3 && (
                    <div className="flex flex-col justify-between h-full relative z-10">
                      <div>
                        <div className="flex justify-between items-center pb-3 border-b border-white/[0.06] mb-4">
                          <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Funnel bot monitor feed</span>
                          <span className="text-[9px] bg-[#38bdf8]/10 text-[#38bdf8] px-2.5 py-0.5 rounded font-mono font-bold tracking-widest uppercase">
                            KEYWORD: "{simKeyword}"
                          </span>
                        </div>

                        {/* Interactive comment thread feed */}
                        <div className="space-y-3 max-h-[200px] overflow-y-auto pr-1">
                          {commentsList.map((c) => (
                            <div key={c.id} className="space-y-2 border-b border-white/[0.03] pb-3 last:border-0 text-left">
                              <div className="flex gap-2 items-start">
                                <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white font-mono uppercase">
                                  {c.user.charAt(0)}
                                </div>
                                <div className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.04] text-xs text-white max-w-[85%]">
                                  <span className="font-bold text-[#38bdf8]">@{c.user}:</span> {c.text}
                                </div>
                              </div>

                              {c.reply && (
                                <div className="flex gap-2 items-start justify-end pl-10">
                                  <div className="p-2 rounded-xl bg-[#38bdf8]/10 border border-[#38bdf8]/15 text-xs text-slate-200 text-right">
                                    <div className="text-[8px] text-[#38bdf8] font-bold uppercase font-mono mb-0.5">Automated Neural Reply</div>
                                    {c.reply}
                                  </div>
                                  <div className="w-6 h-6 rounded-full bg-[#38bdf8] flex items-center justify-center text-[9px] text-black shrink-0 font-bold">
                                    🤖
                                  </div>
                                </div>
                              )}

                              {c.captured && (
                                <div className="ml-8 mt-1 inline-flex items-center gap-1.5 text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                                  Lead details successfully secured & catalogued to core Firestore.
                                </div>
                              )}
                            </div>
                          ))}

                          {isReplyingComment && (
                            <div className="flex gap-2 items-center justify-end pl-10 text-[10px] font-mono text-slate-500 animate-pulse">
                              <span>Bot compiling instant contextual response...</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* captured leads counter widget */}
                      <div className="p-3.5 rounded-xl bg-black/50 border border-white/[0.04] flex items-center justify-between text-xs mt-4">
                        <span className="text-slate-500 font-mono uppercase text-[9px]">Captured Leads Database</span>
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-400 font-mono font-bold">{commentsList.filter(c => c.captured).length} Leads Secured</span>
                          <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono font-black">+1 token added</span>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

              </div>

              {/* Modal footer information bar */}
              <div className="px-6 py-4.5 border-t border-white/[0.06] bg-black/40 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px]">
                <div className="text-slate-500">
                  Secure pipeline synchronized with Cloud-hosted Firestore and rotating residential server proxies.
                </div>
                <div className="text-[#38bdf8] font-bold">
                  PROTOTYPE SANDBOX SECURE
                </div>
              </div>

            </motion.div>
          </div>
        )}

      {/* Dynamic Counter Section (Social Proof Counter Section) sitting below Niche Grid */}
      <div className="relative z-10 border-b border-white/[0.03] bg-neutral-950/10">
        <SocialProofCounterSection />
      </div>

      {/* "Why Creators Choose Us" Comparison Section */}
      <section id="why-creators-choose-us" className="relative z-10 py-16 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#121212]">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 flex flex-col items-center justify-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight text-center mx-auto w-full">
            Stop Relying on Manual Stress
          </h2>
          <p className="mt-2 text-sm text-[#FFFFFF] text-center mx-auto max-w-2xl">
            How automated scripts engineered directly for algorithm retention compare against traditional slow solutions.
          </p>
        </div>

        {/* 3-Column Comparative Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch font-sans">
          
          {/* Column 1: Traditional Video Editors */}
          <div className="relative flex flex-col justify-between rounded-2xl bg-[#1E1E1E]/40 border border-white/[0.04] p-6 sm:p-8 transition-all duration-300 hover:border-white/[0.08]">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1">The Old Way</span>
                <h3 className="text-lg font-black text-white uppercase tracking-tight">HIRING VIDEO EDITORS</h3>
                <p className="mt-2 text-xs text-red-400/80 leading-relaxed min-h-[32px]">
                  Expensive, slow, creates coordination bottlenecks.
                </p>
              </div>

              <div className="h-[1px] bg-white/[0.04]" />

              <ul className="space-y-4 text-xs text-slate-400">
                <li className="flex items-start space-x-3">
                  <span className="text-slate-600 mt-0.5 select-none">—</span>
                  <span><strong>Viral Short-form Engine:</strong> Fragmented, slow, and uninspired production.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-slate-600 mt-0.5 select-none">—</span>
                  <span><strong>Full Long-form Creation:</strong> No native long-form production capability.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-slate-600 mt-0.5 select-none">—</span>
                  <span><strong>Auto-Clips Engine:</strong> Manual, agonizing process to clip long-form into shorts.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-slate-600 mt-0.5 select-none">—</span>
                  <span><strong>E-commerce Ad Powerhouse:</strong> Missed sales due to manual, outdated ad creation.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-slate-600 mt-0.5 select-none">—</span>
                  <span><strong>One-Click Bulk Scheduler:</strong> Manual bottlenecking that limits your reach across platforms.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-slate-600 mt-0.5 select-none">—</span>
                  <span><strong>AI-Driven Analytics:</strong> Flying blind without any real-time performance insights.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-slate-600 mt-0.5 select-none">—</span>
                  <span><strong>Automated DM Engagement:</strong> Missing every conversation and potential lead.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 2: Self-Creation */}
          <div className="relative flex flex-col justify-between rounded-2xl bg-[#1E1E1E]/40 border border-white/[0.04] p-6 sm:p-8 transition-all duration-300 hover:border-white/[0.08]">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1">The Time-Killer</span>
                <h3 className="text-lg font-black text-white uppercase tracking-tight">DIY CONTENT CREATION</h3>
                <p className="mt-2 text-xs text-red-400/80 leading-relaxed min-h-[32px]">
                  Time-consuming, non-scalable, kills creative focus.
                </p>
              </div>

              <div className="h-[1px] bg-white/[0.04]" />

              <ul className="space-y-4 text-xs text-slate-400">
                <li className="flex items-start space-x-3">
                  <span className="text-slate-600 mt-0.5 select-none">—</span>
                  <span><strong>Viral Short-form Engine:</strong> Endless hours of tweaking for mediocre engagement.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-slate-600 mt-0.5 select-none">—</span>
                  <span><strong>Full Long-form Creation:</strong> Drowning in complex software to create long-form videos.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-slate-600 mt-0.5 select-none">—</span>
                  <span><strong>Auto-Clips Engine:</strong> Hours of manual work clipping long-form into smaller segments.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-slate-600 mt-0.5 select-none">—</span>
                  <span><strong>E-commerce Ad Powerhouse:</strong> Leaving money on the table; manual ad creation is a trap.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-slate-600 mt-0.5 select-none">—</span>
                  <span><strong>One-Click Bulk Scheduler:</strong> Soul-crushing, manual posting to each channel separately.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-slate-600 mt-0.5 select-none">—</span>
                  <span><strong>AI-Driven Analytics:</strong> Guesswork that leads to stalled channel growth.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-slate-600 mt-0.5 select-none">—</span>
                  <span><strong>Automated DM Engagement:</strong> Zero response capability, losing followers by the minute.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: The Winner - ViralFlow.ai */}
          <div 
            onClick={onStartGenerating}
            className="relative flex flex-col justify-between rounded-2xl bg-[#121212] border-2 border-[#38bdf8]/30 p-6 sm:p-8 shadow-[0_0_30px_rgba(56, 189, 248, 0.08)] transition-all duration-300 hover:border-[#38bdf8]/60 hover:shadow-[0_0_40px_rgba(56, 189, 248, 0.12)] cursor-pointer"
          >
            <div className="absolute -top-3 right-4">
              <span className="text-[9px] font-mono font-bold uppercase text-[#0A0A0A] bg-[#38bdf8] px-2.5 py-0.5 rounded-full tracking-wider shadow-[0_2px_10px_rgba(56, 189, 248, 0.3)]">
                Best Choice
              </span>
            </div>
            
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono text-[#38bdf8] uppercase tracking-wider block mb-1 font-bold">The Future</span>
                <h3 className="text-lg font-black text-white uppercase tracking-tight font-sans">VIRALFLOW.AI</h3>
                <p className="mt-2 text-xs text-[#38bdf8] leading-relaxed min-h-[32px] font-semibold">
                  Fully automated, high-retention, 100% hands-free.
                </p>
              </div>

              <div className="h-[1px] bg-[#38bdf8]/15" />

              <ul className="space-y-4 text-xs text-white">
                <li className="flex items-start space-x-3">
                  <span className="text-[#38bdf8] font-black mt-0.5 select-none text-sm leading-none">√</span>
                  <span className="font-semibold"><strong>Viral Short-form Engine:</strong> Master the algorithm with automated Viral Shorts, Fake Text, Story POV & Split-screen perfection.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#38bdf8] font-black mt-0.5 select-none text-sm leading-none">√</span>
                  <span className="font-semibold"><strong>Full Long-form Creation:</strong> Professional, end-to-end production, 2-10 minutes video.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#38bdf8] font-black mt-0.5 select-none text-sm leading-none">√</span>
                  <span className="font-semibold"><strong>Auto-Clips Engine:</strong> Effortlessly transform long-form into viral short clips.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#38bdf8] font-black mt-0.5 select-none text-sm leading-none">√</span>
                  <span className="font-semibold"><strong>E-commerce Ad Powerhouse:</strong> Convert product links to high-converting ads instantly with our dedicated Ad Engine.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#38bdf8] font-black mt-0.5 select-none text-sm leading-none">√</span>
                  <span className="font-semibold"><strong>One-Click Bulk Scheduler:</strong> Dominate 8+ social platforms with our powerful One-Click Bulk Scheduler.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#38bdf8] font-black mt-0.5 select-none text-sm leading-none">√</span>
                  <span className="font-semibold"><strong>AI-Driven Analytics:</strong> Skyrocket your growth with deep, real-time AI performance analytics.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-[#38bdf8] font-black mt-0.5 select-none text-sm leading-none">√</span>
                  <span className="font-semibold"><strong>Automated DM Engagement:</strong> Turn every comment into a conversion with AI-automated DM lead-nurturing.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* Technical Trust Marquee at the bottom of the page structure */}
      <div className="py-6 mt-6">
        <TechnicalTrustMarquee />
      </div>

      {/* Footer Section */}
      <footer className="relative z-10 py-12 border-t border-white/[0.05] bg-[#121212] text-center mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Horizontal and well-spaced links */}
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 mb-6 text-xs sm:text-sm font-sans font-medium text-white">
            <button
              onClick={() => setIsContactOpen(true)}
              className="hover:text-[#38bdf8] transition-colors cursor-pointer bg-transparent border-none focus:outline-none"
            >
              Contact Us
            </button>
            <button
              onClick={() => setIsTermsOpen(true)}
              className="hover:text-[#38bdf8] transition-colors cursor-pointer bg-transparent border-none focus:outline-none"
            >
              Terms of Use
            </button>
            <button
              onClick={() => setIsPrivacyOpen(true)}
              className="hover:text-[#38bdf8] transition-colors cursor-pointer bg-transparent border-none focus:outline-none"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setIsFaqOpen(true)}
              className="hover:text-[#38bdf8] transition-colors cursor-pointer bg-transparent border-none focus:outline-none"
            >
              FAQ
            </button>
            <button
              onClick={() => {
                setIsBlogOpen(true);
              }}
              className="hover:text-[#38bdf8] transition-colors cursor-pointer bg-transparent border-none focus:outline-none"
            >
              Blog
            </button>
          </div>

          {/* Branding & Copyright centered directly below */}
          <p className="text-[11px] sm:text-xs text-white font-sans tracking-wide">
            © 2026 ViralFlow.ai. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Terms of Use Modal */}
      {isTermsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-[#242424] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl overflow-y-auto max-h-[85vh] text-left">
            <button
              onClick={() => setIsTermsOpen(false)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white transition-colors rounded-full hover:bg-white/5 cursor-pointer focus:outline-none bg-transparent border-none"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-8 flex items-center space-x-3 border-b border-white/5 pb-4">
              <Scale className="h-6 w-6 text-[#38bdf8]" />
              <div>
                <h2 className="text-xl font-black text-white uppercase tracking-tight">Terms of Use</h2>
                <p className="text-[10px] text-neutral-500 uppercase font-mono tracking-widest mt-0.5">Effective Date: June 29, 2026</p>
              </div>
            </div>

            <div className="space-y-6 font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed max-h-[50vh] overflow-y-auto pr-2">
              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">1. Agreement to Terms</h3>
                <p>
                  Welcome to ViralFlow.ai (the "Service", "Platform", "Software"). By accessing or using our automated faceless video generation and publishing tool, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the Service.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">2. STRICT NO-REFUND POLICY</h3>
                <div className="p-4 bg-[#FF0055]/5 border border-[#FF0055]/20 rounded-lg text-neutral-300 flex items-start space-x-3">
                  <ShieldAlert className="h-5 w-5 text-[#FF0055] flex-shrink-0 mt-0.5" />
                  <p className="text-xs">
                    <strong>CRITICAL AGREEMENT:</strong> All digital subscription fees, platform license charges, and credit purchases are strictly non-refundable and final. Because the computational cost of AI generation model processing and automated publishing pipeline resources is consumed immediately upon your command, we enforce an absolute no-refund policy, with the sole exception of the specific usage conditions explicitly outlined under our support refund procedures.
                  </p>
                </div>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">3. USER CONTENT RESPONSIBILITY</h3>
                <p>
                  You represent, warrant, and agree that you are solely and entirely responsible for all content, including but not limited to scripts, topics, visual templates, sound effects, voiceovers, and rendered videos generated or published through your account. ViralFlow.ai operates solely as a passive software-as-a-service conduit. You must guarantee that any generated materials do not violate third-party intellectual property, privacy rights, local laws, global regulations, or the specific developer guidelines of YouTube, TikTok, and Instagram.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">4. LIMITATION OF LIABILITY & DISCLAIMERS</h3>
                <p>
                  VIRALFLOW.AI, ITS AFFILIATES, OFFICERS, AND EMPLOYEES SHALL NOT BE LIABLE UNDER ANY CIRCUMSTANCES FOR ANY DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR EXEMPLARY DAMAGES. This exclusion includes, without limitation, account suspensions, platform flags, shadowbans, content takedowns, revenue losses, copyright strikes, or network limitations imposed by external platforms (such as TikTok, YouTube, or Instagram) as a result of using this automated software. The Service is provided entirely on an "AS IS" and "AS AVAILABLE" basis with no warranties of any kind.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">5. ACCOUNT AND SECURITY</h3>
                <p>
                  You are responsible for safeguarding your credentials and any API tokens connected to the platform. We reserve the absolute right to suspend or terminate accounts that engage in platform abuse, spamming, copyright violations, or malicious activity that degrades network performance.
                </p>
              </section>
            </div>

            <div className="mt-8 border-t border-white/5 pt-4 flex justify-end">
              <button
                onClick={() => setIsTermsOpen(false)}
                className="bg-white text-black hover:bg-neutral-200 font-bold uppercase tracking-widest text-xs py-3 px-6 rounded-lg transition-all cursor-pointer focus:outline-none"
              >
                Acknowledge & Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {isPrivacyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-[#242424] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl overflow-y-auto max-h-[85vh] text-left">
            <button
              onClick={() => setIsPrivacyOpen(false)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white transition-colors rounded-full hover:bg-white/5 cursor-pointer focus:outline-none bg-transparent border-none"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-8 flex items-center space-x-3 border-b border-white/5 pb-4">
              <FileText className="h-6 w-6 text-[#38bdf8]" />
              <div>
                <h2 className="text-xl font-black text-white uppercase tracking-tight">Privacy Policy</h2>
                <p className="text-[10px] text-neutral-500 uppercase font-mono tracking-widest mt-0.5">Effective Date: June 29, 2026</p>
              </div>
            </div>

            <div className="space-y-6 font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed max-h-[50vh] overflow-y-auto pr-2">
              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">1. Data Collection & Usage</h3>
                <p>
                  We collect user account information (such as email addresses, billing preferences, and security authorization tokens) to securely provision and manage your automated video pipeline. We only process data required to execute video rendering, schedule uploads, and verify subscription limits.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">2. API and Third-Party Integrations</h3>
                <p>
                  To deliver automation, ViralFlow.ai safely routes encrypted video assets to official developer APIs (including YouTube Data API, TikTok Graph API, and Instagram Content Publishing API). By connecting your channels, you agree that your data is handled in strict compliance with each respective platform's privacy policy. Additionally, raw prompts and script messages are handled securely through enterprise Google GenAI APIs to prevent local leaks.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">3. Security & Data Protection</h3>
                <p>
                  We maintain advanced administrative, physical, and technical safeguard barriers to block unauthorized access, modification, or disclosure of user data. All active integration tokens and API credentials are kept highly encrypted at rest and in transit.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">4. STRICT REFUND ALIGNMENT NOTICE</h3>
                <div className="p-4 bg-neutral-900 border border-white/10 rounded-lg text-neutral-400">
                  <p className="text-xs">
                    Our billing, subscription tracking, and user data metrics are tightly synchronized to verify software resource consumption. Because computing credits are allocated instantly to prevent service interruptions, digital license agreements maintain a strict no-refund policy, alignment with which is validated by automated usage monitoring logs.
                  </p>
                </div>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">5. Contact and Inquiries</h3>
                <p>
                  If you have queries regarding data deletion, account data retrieval, or compliance questions, please contact our privacy compliance officer via the Contact Us support form.
                </p>
              </section>
            </div>

            <div className="mt-8 border-t border-white/5 pt-4 flex justify-end">
              <button
                onClick={() => setIsPrivacyOpen(false)}
                className="bg-white text-black hover:bg-neutral-200 font-bold uppercase tracking-widest text-xs py-3 px-6 rounded-lg transition-all cursor-pointer focus:outline-none"
              >
                Acknowledge & Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Us Modal */}
      <ContactSection isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* FAQ Modal */}
      {isFaqOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-[#242424] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl overflow-y-auto max-h-[85vh] text-left">
            <button
              onClick={() => setIsFaqOpen(false)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white transition-colors rounded-full hover:bg-white/5 cursor-pointer focus:outline-none bg-transparent border-none"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-8 flex items-center space-x-3 border-b border-white/5 pb-4">
              <HelpCircle className="h-6 w-6 text-[#38bdf8]" />
              <div>
                <h2 className="text-xl font-black text-white uppercase tracking-tight">Frequently Asked Questions</h2>
                <p className="text-[10px] text-neutral-500 uppercase font-mono tracking-widest mt-0.5">ViralFlow.ai Support & Knowledge Base</p>
              </div>
            </div>

            <div className="max-h-[50vh] overflow-y-auto pr-2">
              <FAQAccordion />
            </div>

            <div className="mt-8 border-t border-white/5 pt-4 flex justify-end">
              <button
                onClick={() => setIsFaqOpen(false)}
                className="bg-white text-black hover:bg-neutral-200 font-bold uppercase tracking-widest text-xs py-3 px-6 rounded-lg transition-all cursor-pointer focus:outline-none"
              >
                Close FAQ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BlogFeed Modal */}
      {isBlogOpen && (
        <BlogFeed 
          onClose={() => setIsBlogOpen(false)} 
          onLaunchEngine={onStartGenerating} 
        />
      )}

      {/* Exit Intent Capture Modal (Section 4-B) */}
      {showExitIntentModal && (
        <div 
          id="exit-intent-modal-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div 
            id="exit-intent-modal-card"
            className="relative w-full max-w-[450px] bg-[#121212]/95 border border-blue-500/40 rounded-[24px] pt-8 px-6 pb-6 shadow-[0_0_50px_rgba(59,130,246,0.3)] backdrop-blur-xl text-center flex flex-col items-center overflow-hidden h-auto"
          >
            {/* Close Button */}
            <button
              id="exit-intent-close-btn"
              onClick={() => setShowExitIntentModal(false)}
              className="absolute top-3.5 right-3.5 p-2 text-white/50 hover:text-white hover:bg-white/10 transition-all rounded-full cursor-pointer focus:outline-none bg-transparent border-none z-20"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Glowing Backdrop Accents */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-[35px] pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-blue-500/10 rounded-full blur-[35px] pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 text-center mb-5 flex flex-col items-center w-full">
              <p className="text-sm sm:text-base font-extrabold text-white tracking-tight leading-relaxed font-sans">
                Don't miss the future of your business: Join the elite users currently scaling with viral AI automation.
              </p>
            </div>

            {/* CTA/Form Section */}
            <div className="relative z-10 w-full">
              {exitSubmitStatus === "success" ? (
                <div id="exit-intent-success-view" className="text-center py-4 space-y-3 animate-fade-in flex flex-col items-center w-full">
                  <h3 className="text-base font-bold text-white uppercase tracking-wide font-sans">
                    Access Secured Successfully!
                  </h3>
                  <p className="text-xs text-white font-normal leading-relaxed max-w-sm mx-auto font-sans">
                    Welcome to the future of content. Check your inbox shortly for your custom fast-track onboarding resources.
                  </p>
                  <button
                    id="exit-intent-continue-btn"
                    onClick={() => {
                      setShowExitIntentModal(false);
                      onStartGenerating();
                    }}
                    className="mt-2 w-full h-12 bg-gradient-to-r from-[#38bdf8] to-[#00D2FF] hover:from-blue-600 hover:to-blue-400 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer border-none shadow-[0_4px_12px_rgba(56, 189, 248, 0.25)] flex items-center justify-center font-sans"
                  >
                    Enter Dashboard
                  </button>
                </div>
              ) : (
                <form id="exit-intent-email-form" onSubmit={handleExitIntentSubmit} className="space-y-4 text-center flex flex-col items-center w-full">
                  <div className="space-y-1.5 w-full">
                    <label htmlFor="exit-intent-email-input" className="block text-[11px] font-bold text-white uppercase tracking-wider font-sans text-left pl-1">
                      Enter your best email to unlock VIP access
                    </label>
                    <div className="relative">
                      <input
                        id="exit-intent-email-input"
                        type="email"
                        required
                        value={exitEmail}
                        onChange={(e) => setExitEmail(e.target.value)}
                        placeholder="yourname@domain.com"
                        className="w-full bg-[#121212]/90 border border-blue-500/35 hover:border-blue-500/60 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-sm text-white text-left placeholder-white/40 outline-none transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] h-14 font-sans"
                        disabled={exitSubmitStatus === "submitting"}
                      />
                    </div>
                    {exitErrorMessage && (
                      <p id="exit-intent-error" className="text-xs text-rose-400 font-medium mt-1 font-sans text-left pl-1">
                        {exitErrorMessage}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-center space-y-2.5 w-full">
                    <button
                      id="exit-intent-submit-btn"
                      type="submit"
                      disabled={exitSubmitStatus === "submitting"}
                      className="w-full h-13 bg-gradient-to-r from-[#38bdf8] to-[#00D2FF] hover:from-blue-600 hover:to-blue-400 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-[0_4px_15px_rgba(56, 189, 248, 0.25)] hover:shadow-[0_0_20px_rgba(56, 189, 248, 0.4)] disabled:opacity-50 cursor-pointer flex items-center justify-center space-x-2 font-sans duration-200"
                    >
                      <span>{exitSubmitStatus === "submitting" ? "Securing Access..." : "Unlock My Viral Lead Machine"}</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface ContactSectionProps {
  isOpen: boolean;
  onClose: () => void;
}

function ContactSection({ isOpen, onClose }: ContactSectionProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    id: string;
    fullName: string;
    email: string;
    message: string;
    timestamp: string;
    reply: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Basic Validation
    if (!fullName.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (!message.trim()) {
      setErrorMsg("Please enter your message.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, message }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setSuccessData({
        id: data.data.id,
        fullName: data.data.fullName,
        email: data.data.email,
        message: data.data.message,
        timestamp: data.data.timestamp,
        reply: data.chatbotReply,
      });

      // Clear fields
      setFullName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#242424] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-y-auto max-h-[85vh] text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white transition-colors rounded-full hover:bg-white/5 cursor-pointer focus:outline-none bg-transparent border-none"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Subtle Glow Backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-white/[0.01] rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10">
          {/* Section Header */}
          <div className="text-center mb-8">
            <span className="text-[10px] font-mono font-bold uppercase text-white bg-white/10 border border-white/20 px-3 py-1 rounded-sm tracking-widest">
              CONNECT
            </span>
            <h2 className="mt-4 text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              Contact Us
            </h2>
            <p className="mt-1 text-xs text-neutral-400">
              Have questions or feedback? Drop us a line and test our automated support response engine.
            </p>
          </div>

          {/* Form and Success Container */}
          <div className="bg-[#121212] border border-white/10 rounded-xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
            {/* Subtle Accent Line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            
            {!successData ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMsg && (
                  <div className="p-3 bg-neutral-950 border border-red-500/50 rounded-lg text-xs text-red-400 flex items-center space-x-2 animate-pulse">
                    <span className="font-bold uppercase tracking-wider text-[9px] bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20">Error</span>
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name input */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="fullName" className="text-[10px] font-bold uppercase tracking-wider text-neutral-300">
                      Full Name <span className="text-white/40">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="John Doe"
                      disabled={isSubmitting}
                      className="w-full bg-black border border-white/10 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors disabled:opacity-50 font-sans"
                      required
                    />
                  </div>

                  {/* Email Address input */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wider text-neutral-300">
                      Email Address <span className="text-white/40">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      disabled={isSubmitting}
                      className="w-full bg-black border border-white/10 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors disabled:opacity-50 font-sans"
                      required
                    />
                  </div>
                </div>

                {/* Message Input */}
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-wider text-neutral-300">
                    Message <span className="text-white/40">*</span>
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help you?"
                    rows={4}
                    disabled={isSubmitting}
                    className="w-full bg-black border border-white/10 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors disabled:opacity-50 font-sans resize-none"
                    required
                  />
                </div>

                {/* Action Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-black hover:bg-neutral-200 font-bold uppercase tracking-widest text-[10px] sm:text-xs py-3.5 px-6 rounded-lg transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 focus:outline-none"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>TRANSMITTING...</span>
                    </>
                  ) : (
                    <>
                      <span>SEND MESSAGE</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="space-y-5">
                {/* Success Info */}
                <div className="flex flex-col items-center text-center py-2">
                  <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center mb-3 bg-white/5">
                    <svg className="w-4 h-4 text-white animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">TRANSMISSION SECURED</h3>
                  <p className="mt-1 text-[11px] text-neutral-400">
                    Form verified. Database log synced and Webhook triggered successfully.
                  </p>
                </div>

                {/* Webhook & AI Live dialogue feed */}
                <div className="border border-white/10 rounded-lg bg-black overflow-hidden shadow-inner font-mono text-left">
                  {/* Simulated Header */}
                  <div className="bg-neutral-900 border-b border-white/10 px-4 py-2 flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
                    </div>
                    <span className="text-[8px] font-bold text-neutral-500 uppercase tracking-widest">
                      AI AUTOMATION HOOK LIVE RESPONSE
                    </span>
                    <div className="w-6" />
                  </div>

                  <div className="p-4 space-y-3 text-[11px]">
                    {/* Status Lines */}
                    <div className="space-y-0.5 text-neutral-500 text-[9px]">
                      <div>&gt; STATUS: <span className="text-white font-bold">200 SUCCESS</span></div>
                      <div>&gt; TRANSACTION_ID: <span className="text-white">{successData.id}</span></div>
                      <div>&gt; AUTORESPONSE STATE: <span className="text-white">TRIGGERED</span></div>
                    </div>

                    {/* Divider */}
                    <div className="h-[1px] bg-white/10" />

                    {/* Dialogue response */}
                    <div className="space-y-1.5">
                      <div className="flex items-center space-x-2 text-[9px] font-bold text-white uppercase tracking-wider">
                        <span className="bg-white text-black px-1.5 py-0.5 rounded text-[7px] font-black">AI AGENT</span>
                        <span>ViralFlow Assistant</span>
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed border-l-2 border-white/30 pl-3 py-1 italic">
                        "{successData.reply}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Reset Form */}
                <button
                  onClick={() => setSuccessData(null)}
                  className="w-full bg-neutral-900 hover:bg-neutral-800 text-white border border-white/10 hover:border-white/20 font-bold uppercase tracking-widest text-[10px] py-2.5 rounded-lg transition-all cursor-pointer focus:outline-none"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQAccordion() {
  const [activeTab, setActiveTab] = useState<"technical" | "billing" | "legal">("technical");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const categories = {
    technical: {
      title: "Technical & Platform",
      icon: HelpCircle,
      items: [
        {
          question: "Magic vs Custom Mode?",
          answer: "'Magic Mode' utilizes our hierarchical AI engine for autonomous creation from niche selection to rendering. 'Custom Mode' provides granular control over the 'Creative Stack' (voice-over, music, visual style, subtitles) for bespoke content."
        },
        {
          question: "What specific video formats and features are supported?",
          answer: "Our script and video engines explicitly support advanced, high-performing video styles including Fake Text, Story POV, Split Screen, Long-form Video, and 2-10 Minute Auto-Clips."
        },
        {
          question: "DM Automation?",
          answer: "Our Lead-Nurturing Engine monitors 'Shadow Channels' 24/7. It tracks 'Trigger Keywords' in comments/DMs and executes an automated sales flow, delivering information to leads instantly to maximize conversions without manual intervention."
        },
        {
          question: "Multi-platform distribution?",
          answer: "Our centralized 'Shadow Channel' infrastructure enables simultaneous, optimized publishing via the Scheduler. It synchronizes content delivery to peak engagement times across all channels, managed from one dashboard."
        }
      ]
    },
    billing: {
      title: "Software & Billing",
      icon: CreditCard,
      items: [
        {
          question: "How do the new credit/video/minutes work?",
          answer: "Each credit is flexible: use it for 1 Short-form video (Viral/E-commerce) OR 1 minute of Long-form video (up to 10 minutes)."
        },
        {
          question: "Which plan is right for me?",
          answer: "Choose based on your needs: Spark (60 credits), Growth (120 credits), Velocity (190 credits), or Empire (300 credits). Each plan covers all our formats: Fake Text, Story POV, Split Screen, and Long-form/Auto-Clips."
        },
        {
          question: "How does the 'Auto-Pilot' credit system work?",
          answer: "Our credit system is straightforward and usage-based: 1 automated video creation consumes exactly 1 video credit. These credits cover script writing, dynamic subtitle rendering, visual generation, voiceovers, and auto-publishing queues. Unused credits rollover or renew depending on your subscription cycle."
        },
        {
          question: "What are the subscription tiers available?",
          answer: "We offer four highly optimized subscription tiers: Starter (perfect for beginners looking to automate a single channel), Pro (our most popular tier designed for growing creators), Agency (built for multi-account managers and agencies requiring bulk creation and publishing), and the specialized 'TalkToUs Enterprise' plan for high-volume custom corporate needs."
        },
        {
          question: "How are excess interactions billed?",
          answer: "If your automated channels generate interaction volumes beyond your plan's standard monthly limits, excess DM deliveries or automated interactions are billed transparently at a low rate of exactly $0.06 per unit. This ensures your campaigns never get cut off mid-launch."
        },
        {
          question: "How do I manage my subscription and API payments?",
          answer: "All billing management, payment receipts, and plan upgrades are handled via our official integration with the Whop payment platform. You can update your payment methods, check invoices, or adjust your subscriptions safely and securely with a single click."
        }
      ]
    },
    legal: {
      title: "Legal & Compliance",
      icon: ShieldCheck,
      items: [
        {
          question: "Is my account safe when using ViralFlow’s automation tools?",
          answer: "Yes. Your account security is our top priority. We strictly comply with official platform developer API terms and implement rate-limiting protections. This prevents excessive actions and ensures all automation looks natural and fully compliant to completely prevent account flags, temporary limits, or bans."
        },
        {
          question: "How does ViralFlow handle user data and privacy?",
          answer: "We utilize a secure Firestore database with robust server-side security rules to protect user information. Your social media API tokens, video assets, scripts, and personal data are fully encrypted in transit and at rest, adhering to strict industry data protection standards."
        },
        {
          question: "What is the policy regarding spam and platform usage limits?",
          answer: "We enforce built-in safeguards to ensure compliance with platform usage terms. Users are prohibited from using the platform to generate repetitive or low-quality bulk spam. By limiting the frequency of automated posts and interactions, we help creators build legitimate, high-engagement networks while respecting the platforms' community guidelines."
        }
      ]
    }
  };

  const handleToggle = (idx: number) => {
    setExpandedId(expandedId === idx ? null : idx);
  };

  const activeCategory = categories[activeTab];

  return (
    <div className="w-full">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {(Object.keys(categories) as Array<keyof typeof categories>).map((catId) => {
          const cat = categories[catId];
          const Icon = cat.icon;
          const isActive = activeTab === catId;
          return (
            <button
              key={catId}
              onClick={() => {
                setActiveTab(catId);
                setExpandedId(null);
              }}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-full border text-xs sm:text-sm font-sans font-medium transition-all duration-200 cursor-pointer focus:outline-none ${
                isActive
                  ? "border-[#38bdf8]/30 bg-[#38bdf8]/5 text-[#38bdf8] shadow-[0_0_15px_rgba(56, 189, 248, 0.05)]"
                  : "border-white/[0.03] bg-neutral-900/40 text-slate-400 hover:text-white hover:border-white/[0.08]"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{cat.title}</span>
            </button>
          );
        })}
      </div>

      {/* Accordion Questions List */}
      <div className="space-y-3.5 max-w-3xl mx-auto">
        {activeCategory.items.map((item, idx) => {
          const isExpanded = expandedId === idx;
          return (
            <div
              key={idx}
              className="rounded-xl bg-[#242424]/30 border border-white/[0.03] overflow-hidden transition-colors duration-200 hover:border-white/[0.06]"
            >
              {/* Question Header Button */}
              <button
                onClick={() => handleToggle(idx)}
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none bg-transparent"
              >
                <div className="flex items-center space-x-3.5 pr-4">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
                  <span className="text-sm sm:text-base font-bold text-white tracking-tight">{item.question}</span>
                </div>
                <div className="flex-shrink-0">
                  <ChevronDown
                    className={`h-4.5 w-4.5 text-slate-400 transition-transform duration-300 ${
                      isExpanded ? "rotate-180 text-[#38bdf8]" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Answer Body */}
              <div
                className={`transition-all duration-300 ease-in-out ${
                  isExpanded ? "max-h-[250px] opacity-100 border-t border-white/[0.02]" : "max-h-0 opacity-0 pointer-events-none"
                } overflow-hidden`}
              >
                <div className="p-5 text-xs sm:text-sm text-[#FFFFFF] leading-relaxed bg-[#1E1E1E]/25">
                  {item.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// RE-ENGINEERED VIRAL SHOWCASE GALLERY SPECIFICATION
// ---------------------------------------------------------
// - "ui_specs": ["Glassmorphism frame", "Auto-play on hover", "Live API data feed"]
// ---------------------------------------------------------
interface NicheShowcaseCardProps {
  niche: {
    title: string;
    icon: React.ComponentType<any>;
    color: string;
    videoUrl?: string;
    initialViews: number;
  };
  onStartGenerating: () => void;
}

function NicheShowcaseCard({ niche, onStartGenerating }: NicheShowcaseCardProps) {
  const Icon = niche.icon;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [views, setViews] = useState(niche.initialViews);
  const [isPlaying, setIsPlaying] = useState(false);

  // Live API Data Feed Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setViews((prev) => prev + Math.floor(Math.random() * 6) + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleMouseEnter = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Auto-play blocked or waiting for user interaction:", err);
      });
    }
  };

  const handleMouseLeave = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      onClick={onStartGenerating}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col justify-between items-center text-center p-3 rounded-2xl bg-white/[0.01] hover:bg-white/[0.02] border border-white/[0.05] hover:border-[#38bdf8]/45 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_24px_rgba(56, 189, 248, 0.12)] cursor-pointer focus:outline-none aspect-[9/16] w-full overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl"
    >
      {/* Dynamic 9:16 video thumbnail backdrop */}
      <div className="absolute inset-0 w-full h-full z-0 transition-opacity duration-500 opacity-20 group-hover:opacity-60 overflow-hidden bg-neutral-950">
        {niche.videoUrl && (
          <video
            ref={videoRef}
            src={niche.videoUrl}
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Subtle 9:16 mobile viewfinder crop guides */}
      <div className="absolute inset-1.5 border border-white/[0.012] rounded-lg pointer-events-none group-hover:border-[#38bdf8]/10 transition-colors duration-300 z-10" />
      <div className="absolute top-2.5 left-2.5 w-1 h-1 border-t border-l border-white/20 group-hover:border-[#38bdf8]/40 transition-colors z-10" />
      <div className="absolute top-2.5 right-2.5 w-1 h-1 border-t border-r border-white/20 group-hover:border-[#38bdf8]/40 transition-colors z-10" />
      <div className="absolute bottom-2.5 left-2.5 w-1 h-1 border-b border-l border-white/20 group-hover:border-[#38bdf8]/40 transition-colors z-10" />
      <div className="absolute bottom-2.5 right-2.5 w-1 h-1 border-b border-r border-white/20 group-hover:border-[#38bdf8]/40 transition-colors z-10" />

      {/* Ticker / Live API Feed Stats Overlay */}
      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between w-[calc(100%-1.75rem)] z-10 font-mono text-[8px] sm:text-[9px] text-slate-400 select-none">
        <div className="flex items-center space-x-1 shrink-0">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
          </span>
          <span className="text-red-400 font-bold uppercase tracking-wider text-[7px] sm:text-[8px]">LIVE FEED</span>
        </div>
        <span className="font-semibold text-neutral-300 shrink-0">
          {views.toLocaleString()} views
        </span>
      </div>

      {/* Play Icon/Label overlay in center on hover */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <div className="h-8 w-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
          <svg className="w-3.5 h-3.5 text-[#38bdf8] fill-current ml-0.5" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <span className="mt-1 text-[7px] sm:text-[8px] font-bold text-white uppercase tracking-widest bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-sm">
          HOVER PLAYING
        </span>
      </div>

      {/* Compact icon centered prominently in upper section */}
      <div className="flex-1 flex flex-col items-center justify-center pt-8 w-full z-10">
        <div className={`h-10 w-10 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110 shrink-0 ${niche.color} shadow-[0_4px_12px_rgba(0,0,0,0.6)]`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      
      {/* Full Title centered at the bottom */}
      <div className="w-full mt-auto pt-2 pb-2.5 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent rounded-b-2xl">
        <h3 className="text-[9.5px] sm:text-[10.5px] font-black font-sans text-white uppercase tracking-wider group-hover:text-[#38bdf8] transition-colors leading-snug px-0.5 text-center">
          {niche.title}
        </h3>
        <p className="text-[7.5px] sm:text-[8px] text-slate-400 uppercase tracking-widest mt-0.5">
          {niche.videoUrl ? "Blueprint Ready" : "Auto-Adaptive"}
        </p>
      </div>

      {/* Accent border glow effect */}
      <div className="absolute top-0 right-0 h-[1px] w-0 bg-gradient-to-r from-transparent to-[#38bdf8] group-hover:w-full transition-all duration-300 z-10" />
      <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-[#38bdf8] to-transparent group-hover:w-full transition-all duration-300 z-10" />
    </div>
  );
}
