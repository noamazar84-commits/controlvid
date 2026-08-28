import { useState, useEffect, FormEvent, MouseEvent } from "react";
import { Sparkles, MessageSquare, Trash2, History, RotateCw, AlertCircle, TrendingUp, Lightbulb, Compass, LayoutDashboard, X, Zap, DollarSign, Percent, ArrowRight, ShieldCheck, CheckCircle, Link, BarChart3, Wallet, Users, Check, Copy, Mail, AlertTriangle, Settings, Bell, ShieldAlert, Send, Terminal, Eye, Search, Filter, Ban, Award, CheckCircle2, ShoppingBag, Sliders, Layers, Lock, Calendar, Clock, Video, Menu, ChevronLeft, ChevronRight, ChevronDown, CreditCard, Smartphone, LifeBuoy, Share2 } from "lucide-react";
import ScriptCard from "./components/ScriptCard";
import Teleprompter from "./components/Teleprompter";
import LandingPage from "./components/LandingPage";
import LivePreview from "./components/LivePreview";
import SaaSDatabaseDashboard from "./components/SaaSDatabaseDashboard";
import PricingPage from "./components/PricingPage";
import VideoWizard from "./components/VideoWizard";
import Stage5Pipeline from "./components/Stage5Pipeline";
import DMAutomationWorkspace from "./components/DMAutomationWorkspace";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import AutoSupportLayer from "./components/AutoSupportLayer";
import TalkToUsEnterprise from "./components/TalkToUsEnterprise";
import CampaignScheduler from "./components/CampaignScheduler";
import VideoCreationWorkspace from "./components/VideoCreationWorkspace";
import AuthHandler from "./components/auth/AuthHandler";
import MagicMode from "./components/workflow/magic/MagicMode";
import CustomMode from "./components/workflow/custom/CustomMode";
import EcommerceMode from "./components/workflow/ecommerce/EcommerceMode";
import SubscriptionBillingWorkspace from "./components/SubscriptionBillingWorkspace";
import SocialViralCloner from "./components/SocialViralCloner";
import { auth } from "./lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ScriptResponse, SavedScript, ScriptTone, ShortFormPlatform } from "./types";

export default function App() {
  const [currentView, setCurrentView] = useState<"landing" | "dashboard" | "saas-db" | "pricing">("landing");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [activeUserSerialId, setActiveUserSerialId] = useState<number>(1);
  const [activeUser, setActiveUser] = useState<any>(null);
  const [adminBypassActive, setAdminBypassActive] = useState<boolean>(true);
  const ADMIN_EMAILS = ["alex@creator.co", "noamazar84@gmail.com", "admin@controlvid.ai"];
  const isUserAdmin = !activeUser?.email || ADMIN_EMAILS.includes(activeUser.email.toLowerCase()) || activeUser.email.toLowerCase().includes("admin") || adminBypassActive;

  const [topic, setTopic] = useState("");
  const [creationMode, setCreationMode] = useState<"viral" | "dropshipping">("viral");
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<ShortFormPlatform>("TikTok");
  const [selectedTone, setSelectedTone] = useState<ScriptTone>("Controversial");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedScript, setGeneratedScript] = useState<ScriptResponse | null>(null);
  const [savedScripts, setSavedScripts] = useState<SavedScript[]>([]);
  const [workspaceMode, setWorkspaceMode] = useState<string>("magic");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [productLink, setProductLink] = useState("");
  const [isFetchingProduct, setIsFetchingProduct] = useState(false);
  const [productFetchStep, setProductFetchStep] = useState("");
  const [showTeleprompter, setShowTeleprompter] = useState(false);
  const [isAffiliateOpen, setIsAffiliateOpen] = useState(false);
  const [isAffiliateRegistered, setIsAffiliateRegistered] = useState(false);
  const [affiliateLinkCopied, setAffiliateLinkCopied] = useState(false);
  const [affiliatePayoutRequested, setAffiliatePayoutRequested] = useState(false);
  const [affiliateHowItWorksOpen, setAffiliateHowItWorksOpen] = useState(false);
  const [affiliateName, setAffiliateName] = useState("");
  const [affiliateEmail, setAffiliateEmail] = useState("");
  const [affiliateTrafficSource, setAffiliateTrafficSource] = useState("TikTok Shorts / Reels Channel");
  const [affiliateOnboardingStep, setAffiliateOnboardingStep] = useState<"pitch" | "register" | "risk_check" | "email_sent">("pitch");
  const [affiliateRiskScore, setAffiliateRiskScore] = useState<number>(12); // Safe (12/100)
  const [affiliateTrafficVolume, setAffiliateTrafficVolume] = useState<"normal" | "high">("normal");
  const [affiliateTrafficVerified, setAffiliateTrafficVerified] = useState(false);
  const [affiliateDashboardTab, setAffiliateDashboardTab] = useState<"overview" | "payment" | "webhooks" | "email">("overview");
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  const [preSelectedPlan, setPreSelectedPlan] = useState<string | undefined>(undefined);
  const [preSelectedStep, setPreSelectedStep] = useState<1 | 2 | 3 | undefined>(undefined);
  const [isSubscriptionCancelled, setIsSubscriptionCancelled] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isSubscriptionPanelExpanded, setIsSubscriptionPanelExpanded] = useState(false);
  const [mobileAccordionOpen, setMobileAccordionOpen] = useState<string | null>(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const renderWorkspaceContent = (mode: string) => {
    switch (mode) {
      case "subscription":
        return (
          <SubscriptionBillingWorkspace
            activeUser={activeUser}
            isSubscriptionCancelled={isSubscriptionCancelled}
            setIsSubscriptionCancelled={setIsSubscriptionCancelled}
            setShowCancelModal={setShowCancelModal}
            onUpgradeClick={(plan) => {
              if (plan) setPreSelectedPlan(plan);
              setCurrentView("pricing");
            }}
            setRecentToast={setRecentToast}
          />
        );
      case "social_viral_cloner":
      case "social-viral-cloner":
        return (
          <SocialViralCloner
            activeUserEmail={activeUser?.email}
            onSendToGenerator={(hookText, duration) => {
              setTopic(hookText);
              setWizardDuration(duration);
              setWorkspaceMode("magic");
              setCreationStep(3);
              setRecentToast({
                message: "⚡ Viral Cloned Script Loaded!",
                sub: "Script sent to Magic Mode autopilot generator."
              });
            }}
          />
        );
      case "custom":
      case "long_form_clips":
        return <CustomMode modeType={mode} onBack={() => setMobileAccordionOpen(null)} />;
      case "ecommerce":
        return <EcommerceMode onBack={() => setMobileAccordionOpen(null)} activeUserEmail={activeUser?.email} />;
      case "analytics":
        return (
          <AnalyticsDashboard
            userEmail={activeUser?.email || "creator@controlvid.ai"}
            userTier={activeUser?.subscription_tier || "Empire"}
            onUpgradeClick={(plan) => {
              if (plan) setPreSelectedPlan(plan);
              setCurrentView("pricing");
            }}
          />
        );
      case "scheduler":
        return (
          <CampaignScheduler
            userEmail={activeUser?.email || "creator@controlvid.ai"}
            userTier={activeUser?.subscription_tier || "Empire"}
            onUpgradeClick={(plan) => {
              if (plan) setPreSelectedPlan(plan);
              setCurrentView("pricing");
            }}
            scheduledQueue={scheduledQueue}
            onUpdateQueue={setScheduledQueue}
            getQuotaStatus={getQuotaStatus}
            getShadowChannelsLimit={getShadowChannelsLimit}
          />
        );
      case "dm_automation":
        return (
          <DMAutomationWorkspace
            userEmail={activeUser?.email || "creator@controlvid.ai"}
            userTier={activeUser?.subscription_tier || "Empire"}
            onUpgradeClick={(plan = "dm_automation", step = 2) => {
              setPreSelectedPlan(plan);
              setPreSelectedStep(step);
              setCurrentView("pricing");
            }}
          />
        );
      case "support":
        return (
          <AutoSupportLayer
            userEmail={activeUser?.email || "creator@controlvid.ai"}
            userTier={activeUser?.subscription_tier || "Empire"}
          />
        );
      case "magic":
      case "viral_shorts":
      case "fake_text":
      case "story_pov":
      case "split_screen":
      case "long_form":
      default:
        return <MagicMode modeType={mode} />;
    }
  };
  
  // Video Wizard configurations
  const [selectedWizardNiche, setSelectedWizardNiche] = useState<string>("");
  const [current_session_niche, set_current_session_niche] = useState<string | null>(null);
  const [active_video_process, set_active_video_process] = useState<any>(null);
  const [wizardDuration, setWizardDuration] = useState<number>(60);
  const [creationStep, setCreationStep] = useState<1 | 2 | 3 | 4>(1);
  const [customStep, setCustomStep] = useState<number | null>(null);
  const [customWorkflowData, setCustomWorkflowData] = useState<any>({
    tone: "Controversial",
    hookType: "Negative Hook",
    retentionElement: "Quick-cut pattern",
    pacing: "Fast",
    ctaFormulation: "Controversial debate"
  });
  
  // Payment config
  const [affiliatePaymentMethod, setAffiliatePaymentMethod] = useState<"paypal" | "stripe" | "wise" | "">("");
  const [affiliatePaymentDetail, setAffiliatePaymentDetail] = useState("");
  const [affiliatePaymentSaved, setAffiliatePaymentSaved] = useState(false);
  const [affiliatePayoutError, setAffiliatePayoutError] = useState<string | null>(null);

  // Sales and Milestones
  const [affiliateSalesCount, setAffiliateSalesCount] = useState<number>(3); // start at 3 sales
  const [affiliateClicksCount, setAffiliateClicksCount] = useState<number>(45);
  const [affiliateRevenue, setAffiliateRevenue] = useState<number>(142.50);
  const [webhookLogs, setWebhookLogs] = useState<{ id: string; timestamp: string; event: string; payload: string; status: number }[]>([]);
  const [recentToast, setRecentToast] = useState<{ message: string; sub: string } | null>(null);

  // Affiliate Admin / Owner State
  const [affiliateRole, setAffiliateRole] = useState<"partner" | "admin">("partner");
  const [adminSearchQuery, setAdminSearchQuery] = useState("");
  const [adminStatusFilter, setAdminStatusFilter] = useState<"All" | "Active" | "Pending" | "Suspended">("All");
  
  const ADMIN_EMAIL = "noamazar84@gmail.com";

  // Check if running in Preview/Editor environment (development / AI Studio runner / localhost)
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

  // Active logged in user admin check
  const currentUserEmail = (
    activeUser?.email || 
    auth.currentUser?.email || 
    localStorage.getItem("userEmail") || 
    localStorage.getItem("controlvid_user_email") || 
    localStorage.getItem("viralflow_user_email") || 
    ""
  ).trim().toLowerCase();

  // In Preview/Editor environment: Admin & Affiliate tabs/portals are fully open & functional for testing.
  // In Production: Only visible/accessible if user's email is "noamazar84@gmail.com".
  const isAdmin = isPreviewEnvironment || (currentUserEmail === ADMIN_EMAIL.toLowerCase());

  // Real-time database states
  const [affiliatesList, setAffiliatesList] = useState<any[]>([]);
  const [referralsList, setReferralsList] = useState<any[]>([]);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Sync currentPath periodically or when window location changes
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handleLocationChange);
    const interval = setInterval(() => {
      if (window.location.pathname !== currentPath) {
        setCurrentPath(window.location.pathname);
      }
    }, 1000);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      clearInterval(interval);
    };
  }, [currentPath]);

  // Sync URL hash with workspaceMode to allow deep-linking & direct dashboard navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "") || "magic";
      const validModes = ["magic", "custom", "ecommerce", "analytics", "scheduler", "dm-automation", "social-viral-cloner", "social_viral_cloner"];
      if (validModes.includes(hash)) {
        const mappedMode = hash === "dm-automation" ? "dm_automation" : hash === "social-viral-cloner" ? "social_viral_cloner" : hash;
        if (workspaceMode !== mappedMode) {
          setWorkspaceMode(mappedMode as any);
        }
      }
    };
    // Initialize from current hash on load
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [workspaceMode]);

  const loadAffiliatesAndReferrals = async () => {
    try {
      const { getAffiliates, getReferrals, seedDbIfEmpty } = await import("./lib/firebase");
      await seedDbIfEmpty();

      if (isAdmin) {
        const affsRes = await fetch(`/api/admin/affiliates?email=${encodeURIComponent(currentUserEmail)}`, {
          headers: { 
            "x-user-role": activeUser?.role || "admin",
            "x-user-email": currentUserEmail 
          }
        });
        const refsRes = await fetch(`/api/admin/referrals?email=${encodeURIComponent(currentUserEmail)}`, {
          headers: { 
            "x-user-role": activeUser?.role || "admin",
            "x-user-email": currentUserEmail 
          }
        });

        if (affsRes.ok && refsRes.ok) {
          const affsData = await affsRes.json();
          const refsData = await refsRes.json();
          setAffiliatesList(affsData.data);
          setReferralsList(refsData.data);
          return;
        }
      }

      const affs = await getAffiliates();
      const refs = await getReferrals();
      setAffiliatesList(affs);
      setReferralsList(refs);
    } catch (err) {
      console.error("Failed to load affiliates/referrals from DB:", err);
    }
  };

  // Capture active affiliate ID from URL query parameters (e.g. ?aff=partner_jordan) and store in localStorage
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const aff = params.get("aff");
    if (aff) {
      console.log("[Affiliate System] Captured affiliate ID on mount:", aff);
      localStorage.setItem("controlvid_tracked_affiliate_id", aff);
      localStorage.setItem("viralflow_tracked_affiliate_id", aff);
    }
  }, []);

  useEffect(() => {
    loadAffiliatesAndReferrals();
  }, []);

  // Dynamically calculate affiliate metrics based on real-time referrals list!
  const dbAffiliates = affiliatesList.map(aff => {
    const affReferrals = referralsList.filter(ref => ref.affiliateId === aff.id);
    const totalReferrals = affReferrals.length;
    const totalEarnings = affReferrals.reduce((sum, ref) => sum + ref.commission, 0);
    const payoutsDue = affReferrals
      .filter(ref => ref.status === "Unpaid")
      .reduce((sum, ref) => sum + ref.commission, 0);
      
    return {
      ...aff,
      totalReferrals,
      totalEarnings,
      payoutsDue
    };
  });

  const adminAffiliates = dbAffiliates;

  // Find current active user's affiliate profile from the database
  const currentAffiliateProfile = dbAffiliates.find(a => a.email.toLowerCase() === (activeUser?.email || "").toLowerCase());

  // Derive active partner stats from the profile to ensure isolated, real-time database-linked values
  const partnerSalesCount = currentAffiliateProfile ? currentAffiliateProfile.totalReferrals : affiliateSalesCount;
  const partnerRevenue = currentAffiliateProfile ? currentAffiliateProfile.totalEarnings : affiliateRevenue;
  const partnerPayoutsDue = currentAffiliateProfile ? currentAffiliateProfile.payoutsDue : affiliateRevenue;
  const partnerStatus = currentAffiliateProfile ? currentAffiliateProfile.status : "Active";
  const partnerPayoutStatus = currentAffiliateProfile ? currentAffiliateProfile.payoutStatus : "Unpaid";
  const partnerPaymentMethod = currentAffiliateProfile ? (currentAffiliateProfile.paymentMethod || "") : affiliatePaymentMethod;
  const partnerPaymentDetail = currentAffiliateProfile ? (currentAffiliateProfile.paymentDetail || "") : affiliatePaymentDetail;
  const partnerPaymentSaved = currentAffiliateProfile ? (currentAffiliateProfile.paymentSaved || false) : affiliatePaymentSaved;
  const hasRegisteredAffiliate = currentAffiliateProfile ? true : isAffiliateRegistered;

  const [adminOverallPlatformRevenue, setAdminOverallPlatformRevenue] = useState(58220.00);
  const [showExitModal, setShowExitModal] = useState<boolean>(false);

  // Automated series scheduler and quota states
  const [scheduledQueue, setScheduledQueue] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem("controlvid_scheduled_queue") || localStorage.getItem("viralflow_scheduled_queue");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("controlvid_scheduled_queue", JSON.stringify(scheduledQueue));
  }, [scheduledQueue]);

  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [schedulerCampaignName, setSchedulerCampaignName] = useState("");
  const [scheduleQuantity, setScheduleQuantity] = useState(3);
  const [scheduleFrequency, setScheduleFrequency] = useState("daily");
  const [scheduleTime, setScheduleTime] = useState("12:00");
  const [scheduleChannelSelect, setScheduleChannelSelect] = useState("All Channels");
  const [dashboardSidebarTab, setDashboardSidebarTab] = useState<"library" | "queue" | "pipeline">("library");

  const getMonthlyPlanLimit = (tier: string): number => {
    const t = (tier || "").toLowerCase();
    if (t.includes("spark")) return 50;
    if (t.includes("growth")) return 100;
    if (t.includes("velocity")) return 160;
    if (t.includes("empire")) return 270;
    if (t.includes("enterprise")) return 1000;
    if (t.includes("starter")) return 50;
    if (t.includes("pro")) return 100;
    if (t.includes("agency")) return 270;
    if (t.includes("active_verified") || t.includes("active")) return 250;
    return 100; // default Growth/Pro
  };

  const getShadowChannelsLimit = (tier: string): number => {
    const t = (tier || "").toLowerCase();
    if (t.includes("spark")) return 3;
    if (t.includes("growth")) return 4;
    if (t.includes("velocity")) return 5;
    if (t.includes("empire")) return 8;
    if (t.includes("enterprise")) return 20;
    if (t.includes("starter")) return 3;
    if (t.includes("pro")) return 4;
    if (t.includes("agency")) return 8;
    if (t.includes("active_verified") || t.includes("active")) return 4;
    return 4; // default Growth
  };

  const getQuotaStatus = (additionalRequested = 0) => {
    const createdCount = savedScripts.length;
    const scheduledCount = scheduledQueue.length;
    const totalUsed = createdCount + scheduledCount;
    const tier = activeUser?.subscription_tier || "Growth";
    const limit = getMonthlyPlanLimit(tier);
    const remaining = Math.max(0, limit - totalUsed);
    const isExceeded = (totalUsed + additionalRequested) > limit;

    return {
      createdCount,
      scheduledCount,
      totalUsed,
      limit,
      remaining,
      isExceeded
    };
  };

  const handleOpenScheduler = (campaignName: string) => {
    setSchedulerCampaignName(campaignName);
    const { remaining } = getQuotaStatus();
    setScheduleQuantity(Math.max(1, Math.min(3, remaining)));
    setIsSchedulerOpen(true);
  };

  const handleConfirmSchedule = () => {
    const { remaining, isExceeded } = getQuotaStatus(scheduleQuantity);
    if (isExceeded) {
      setRecentToast({
        message: "❌ Quota Limit Exceeded",
        sub: "Please upgrade your subscription to schedule additional video series."
      });
      setCurrentView("pricing"); // Auto-upsell trigger
      return;
    }

    const newItems: any[] = [];
    const now = new Date();

    for (let i = 0; i < scheduleQuantity; i++) {
      const scheduledDate = new Date();
      if (scheduleFrequency === "twice_daily") {
        scheduledDate.setHours(now.getHours() + (i * 12));
      } else if (scheduleFrequency === "hourly") {
        scheduledDate.setHours(now.getHours() + (i * 12));
      } else if (scheduleFrequency === "weekly") {
        scheduledDate.setDate(now.getDate() + (i * 7));
      } else {
        scheduledDate.setDate(now.getDate() + i);
      }

      if (scheduleTime) {
        const [hours, minutes] = scheduleTime.split(":").map(Number);
        scheduledDate.setHours(hours);
        scheduledDate.setMinutes(minutes);
        scheduledDate.setSeconds(0);
      }

      let targetChannel = "Shadow Channel #1";
      if (scheduleChannelSelect === "All Channels") {
        const totalChannels = getShadowChannelsLimit(activeUser?.subscription_tier || "Growth");
        const channelNum = (i % totalChannels) + 1;
        targetChannel = `Shadow Channel #${channelNum}`;
      } else if (scheduleChannelSelect !== "All Channels") {
        const selectedNum = scheduleChannelSelect === "Channel 2" ? 2 : scheduleChannelSelect === "Channel 3" ? 3 : scheduleChannelSelect === "Channel 4" ? 4 : scheduleChannelSelect === "Channel 5" ? 5 : scheduleChannelSelect === "Channel 8" ? 8 : 1;
        targetChannel = `Shadow Channel #${selectedNum}`;
      }

      newItems.push({
        id: `sched-${Date.now()}-${i}-${Math.random().toString(36).substr(2, 5)}`,
        title: `${schedulerCampaignName} - Part ${i + 1}`,
        topic: topic || "Dynamic automated sequence",
        niche: selectedWizardNiche || "Viral Short-Form",
        scheduledTime: scheduledDate.toISOString(),
        status: "Scheduled",
        channel: targetChannel
      });
    }

    setScheduledQueue((prev) => [...prev, ...newItems]);
    setIsSchedulerOpen(false);

    setRecentToast({
      message: `📅 ${scheduleQuantity} Videos Scheduled Successfully!`,
      sub: `Pushed into queue for automated distribution across ${scheduleChannelSelect}.`
    });

    setDashboardSidebarTab("queue");
  };

  // Automated background scheduler loop simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      let queueUpdated = false;

      const updatedQueue = scheduledQueue.map((item) => {
        if (item.status === "Scheduled" && new Date(item.scheduledTime) <= now) {
          queueUpdated = true;
          return { ...item, status: "Published" };
        }
        return item;
      });

      if (queueUpdated) {
        setScheduledQueue(updatedQueue);
        setRecentToast({
          message: "🚀 Video Published Natively!",
          sub: "Pushed from scheduling queue to active Shadow Channels successfully."
        });
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [scheduledQueue]);

  // Function to send abandonment lead to MailerLite
  async function sendAbandonmentLead(userEmail: string) {
    if (!userEmail || !userEmail.includes("@")) return;

    try {
      if (typeof navigator !== "undefined" && navigator.sendBeacon) {
        const payload = JSON.stringify({ email: userEmail });
        const blob = new Blob([payload], { type: "application/json" });
        navigator.sendBeacon("/api/mailerlite/abandonment", blob);
        return;
      }

      await fetch("/api/mailerlite/abandonment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: userEmail }),
        keepalive: true
      }).catch((err) => {
        console.warn("[MailerLite Abandonment Notice]", err?.message || err);
      });
    } catch (error) {
      console.warn("[MailerLite Abandonment Notice]", error);
    }
  }

  // Trigger exit intent modal and send abandonment lead on mouse exit
  useEffect(() => {
    const handleMouseLeave = (e: any) => {
      const userEmail = localStorage.getItem('userEmail') || localStorage.getItem('controlvid_user_email') || localStorage.getItem('viralflow_user_email') || activeUser?.email;
      if (userEmail) {
        sendAbandonmentLead(userEmail);
      }

      // Only trigger if mouse moves above viewport (clientY < 5)
      // and we haven't shown it in this session yet.
      if (e.clientY < 5 && !sessionStorage.getItem("controlvid-exit-intent-shown")) {
        setShowExitModal(true);
        sessionStorage.setItem("controlvid-exit-intent-shown", "true");
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [activeUser?.email]);

  // Auto-clear toast after 5 seconds
  useEffect(() => {
    if (recentToast) {
      const timer = setTimeout(() => {
        setRecentToast(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [recentToast]);

  // Firebase Auth state sync
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  // Load active user from Firestore on activeUserSerialId change
  useEffect(() => {
    let active = true;
    const fetchActiveUser = async () => {
      try {
        const { getUsers } = await import("./lib/firebase");
        const allUsers = await getUsers();
        if (active) {
          const user = allUsers.find(u => u.serialId === activeUserSerialId);
          setActiveUser(user || null);
          if (user?.email) {
            localStorage.setItem("userEmail", user.email);
            localStorage.setItem("controlvid_user_email", user.email);
          }
        }
      } catch (err) {
        console.error("Failed to load active user from database:", err);
      }
    };
    fetchActiveUser();
    return () => {
      active = false;
    };
  }, [activeUserSerialId]);

  // Global CEO Backdoor keyboard listener
  useEffect(() => {
    let typedBuffer = "";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key && e.key.length === 1) {
        typedBuffer += e.key;
        if (typedBuffer.endsWith("ENTER_ADMIN_MODE")) {
          setAdminBypassActive(true);
          setRecentToast({
            message: "🔓 ADMIN BYPASS ACTIVATED",
            sub: "Bypassing pricing gates for system testing."
          });
          typedBuffer = "";
        } else if (typedBuffer.endsWith("EXIT_ADMIN_MODE")) {
          setAdminBypassActive(false);
          setRecentToast({
            message: "🔒 ADMIN BYPASS DEACTIVATED",
            sub: "Normal funnel and pricing gatekeeper rules restored."
          });
          typedBuffer = "";
        }
        if (typedBuffer.length > 50) {
          typedBuffer = typedBuffer.substring(typedBuffer.length - 30);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Simulated Risk Compliance Assessment Auto-Transition
  useEffect(() => {
    if (affiliateOnboardingStep === "risk_check") {
      const timer = setTimeout(() => {
        setAffiliateOnboardingStep("email_sent");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [affiliateOnboardingStep]);

  // Handle Video Wizard Workflow Selection
  const handleWorkflowSelected = async (nicheName: string, workflowType: "autopilot" | "custom", duration: number) => {
    setSelectedWizardNiche(nicheName);
    setWizardDuration(duration);
    set_current_session_niche(nicheName);
    set_active_video_process({ workflowType, duration, status: "building" });

    // Determine tone and topic based on niche
    let matchedTone: ScriptTone = "Controversial";
    let viralTopic = "";

    const isCustomNiche = ![
      "Finance & Wealth",
      "Fitness & Diet",
      "Tech & Future AI",
      "Motivation & Mindset",
      "Business & Startups",
      "Travel & Exploration",
      "Human Psychology",
      "Science & Space",
      "Pop Culture & Media",
      "Untold History"
    ].includes(nicheName);

    if (isCustomNiche) {
      setRecentToast({
        message: `🤖 AI Analyzing Niche...`,
        sub: `Dynamically adapting style, pacing, and music DNA for ${nicheName}...`
      });
      try {
        const analyzeRes = await fetch("/api/custom-niche/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nicheName })
        });
        if (analyzeRes.ok) {
          const resData = await analyzeRes.json();
          viralTopic = resData.exampleTopic;
          matchedTone = resData.recommendedTone;
        } else {
          throw new Error("Analysis failed");
        }
      } catch (err) {
        console.warn("AI custom niche analysis failed, using fallback:", err);
        viralTopic = `The most shocking secrets of ${nicheName} that they don't want you to know...`;
        matchedTone = "Educational";
      }
    } else {
      if (nicheName.includes("Finance")) {
        matchedTone = "Educational";
      } else if (nicheName.includes("Motivation")) {
        matchedTone = "Motivational";
      } else if (nicheName.includes("Psychology")) {
        matchedTone = "Mysterious";
      } else {
        matchedTone = "Controversial";
      }

      // Set sample viral topic
      if (nicheName.includes("Finance")) {
        viralTopic = "The 3 critical money habits that separate the wealthy from the middle class...";
      } else if (nicheName.includes("Fitness")) {
        viralTopic = "The perfect 4-minute morning mobility routine for high energy...";
      } else if (nicheName.includes("Tech")) {
        viralTopic = "How a high-schooler used 3 free AI agents to build a profitable software business in 48 hours...";
      } else if (nicheName.includes("Motivation")) {
        viralTopic = "The brutal truth about discipline that motivational speakers will never tell you...";
      } else if (nicheName.includes("Business")) {
        viralTopic = "The micro-saas blueprint: How to launch a micro-enterprise with $0 capital...";
      } else if (nicheName.includes("Travel")) {
        viralTopic = "3 gorgeous European villages that are completely free of tourists...";
      } else if (nicheName.includes("Psychology")) {
        viralTopic = "The dangerous psychological trick casinos use to make you lose track of time...";
      } else if (nicheName.includes("Science")) {
        viralTopic = "What actually happens to your atomic structure if you fall into a black hole...";
      } else if (nicheName.includes("Culture")) {
        viralTopic = "The dark, unreleased alternate ending of your favorite childhood cartoon...";
      } else {
        viralTopic = "The brilliant military strategist from ancient history who defeated a whole legion with smoke...";
      }
    }

    setSelectedTone(matchedTone);
    setTopic(viralTopic);

    if (workflowType === "autopilot") {
      // Section 2-C: Auto-Pilot mode (One-click creation)
      // Switch to magic and go to Step 3 for clean input focus
      setWorkspaceMode("magic");
      setCreationStep(3);
      setRecentToast({
        message: `🚀 Magic Mode Active`,
        sub: `Customize your script idea for ${nicheName} (${duration}s) below.`
      });
    } else {
      // Section 2-D: Custom mode (6-step workflow)
      // Set to step 1 of the manual wizard configuration
      setWorkspaceMode("custom");
      setCreationStep(3);
      setCustomStep(1);
      setCustomWorkflowData({
        tone: matchedTone,
        hookType: "Negative Hook",
        retentionElement: "Quick-cut pattern",
        pacing: "Fast",
        ctaFormulation: "Controversial debate"
      });
      setRecentToast({
        message: `⚙ Custom Mode Active`,
        sub: `Configure your 6-step high-retention variables.`
      });
    }
  };

  // Sidebar navigation reset logic
  const handleNavigation = (mode: string) => {
    // 1. Session Reset to exit active video/e-commerce flow
    setGeneratedScript(null);
    setIsGenerating(false);
    setSelectedWizardNiche("");
    setCustomStep(null);
    setProductLink("");
    setIsFetchingProduct(false);
    setProductFetchStep("");
    setTopic("");
    setError(null);

    // 2. Clear current_session_niche and active_video_process states
    set_current_session_niche(null);
    set_active_video_process(null);

    // 3. Update view routing to re-render the main content area completely
    setWorkspaceMode(mode);
    setCreationStep(1);
  };

  // Admin Dashboard Actions
  const handleUpdateStatus = async (id: string, status: "Active" | "Suspended" | "Pending") => {
    try {
      if (isAdmin) {
        const res = await fetch("/api/admin/affiliate/status", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-user-role": activeUser?.role || "admin",
            "x-user-email": currentUserEmail
          },
          body: JSON.stringify({ id, status, email: currentUserEmail })
        });
        if (!res.ok) {
          throw new Error("Backend verification failed: Unauthorized or invalid admin.");
        }
      } else {
        const { updateAffiliateStatus } = await import("./lib/firebase");
        await updateAffiliateStatus(id, status);
      }
      
      await loadAffiliatesAndReferrals();
      
      const target = dbAffiliates.find(a => a.id === id);
      setRecentToast({
        message: `Affiliate ${status === "Active" ? "Activated" : "Suspended"}`,
        sub: `${target?.name || "Partner"}'s partnership status has been updated to ${status}.`
      });
    } catch (err) {
      console.error("Failed to update affiliate status:", err);
    }
  };

  const handleTriggerPayout = async (id: string) => {
    try {
      const target = dbAffiliates.find(a => a.id === id);
      if (!target) return;
      
      if (isAdmin) {
        const res = await fetch("/api/admin/affiliate/payout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-user-role": activeUser?.role || "admin",
            "x-user-email": currentUserEmail
          },
          body: JSON.stringify({ affiliateId: id, email: currentUserEmail })
        });
        if (!res.ok) {
          throw new Error("Backend verification failed: Unauthorized or invalid admin.");
        }
      } else {
        const { triggerPayout } = await import("./lib/firebase");
        await triggerPayout(id);
      }
      
      await loadAffiliatesAndReferrals();
      
      setRecentToast({
        message: "Payout Marked Paid",
        sub: `Successfully marked $${target.payoutsDue.toFixed(2)} as paid to ${target.name} via Stripe/PayPal/Wise.`
      });
    } catch (err) {
      console.error("Failed to trigger payout:", err);
    }
  };

  // Load history on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("viral_scripts_history");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSavedScripts(parsed);
        } else {
          setSavedScripts([]);
        }
      }
    } catch (e) {
      console.error("Failed to read history from local storage:", e);
      setSavedScripts([]);
    }
  }, []);

  // Save history to localStorage
  const saveToHistory = (newScript: ScriptResponse, originalTopic: string) => {
    try {
      const entry: SavedScript = {
        ...newScript,
        id: Math.random().toString(36).substring(2, 9),
        topic: originalTopic,
        createdAt: new Date().toISOString(),
      };
      setSavedScripts((prev) => {
        const updated = [entry, ...prev];
        localStorage.setItem("viral_scripts_history", JSON.stringify(updated));
        return updated;
      });
    } catch (e) {
      console.error("Failed to save history:", e);
    }
  };

  // Delete history item
  const deleteHistoryItem = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    setSavedScripts((prev) => {
      const filtered = prev.filter((item) => item.id !== id);
      localStorage.setItem("viral_scripts_history", JSON.stringify(filtered));
      return filtered;
    });
  };

  // Select item from history
  const selectHistoryItem = (item: SavedScript) => {
    setGeneratedScript({
      title: item.title,
      hook: item.hook,
      body: item.body,
      twist: item.twist,
      cta: item.cta,
      wordCount: item.wordCount,
      targetTone: item.targetTone,
      targetPlatform: item.targetPlatform,
      viralRatingReason: item.viralRatingReason,
      hashtags: item.hashtags,
    });
    setTopic(item.topic);
    setSelectedPlatform(item.targetPlatform as ShortFormPlatform);
    setSelectedTone(item.targetTone as ScriptTone);
    setShowTeleprompter(false);
  };

  const handleEcommerceSubmit = async () => {
    if (!productLink || productLink.trim() === "") return;
    setIsFetchingProduct(true);
    setError(null);
    setProductFetchStep("Connecting to scraper proxy & analyzing target URL...");

    try {
      const email = activeUser?.email || "guest@controlvid.ai";
      const response = await fetch("/api/ecommerce/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: productLink, email })
      });
      
      setProductFetchStep("Extracting product metadata, headings, and description...");
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "API connection failed. Please verify the URL and try again.");
      }

      setProductFetchStep("Invoking Gemini 3.5 Flash Copywriter Engine...");
      const result = await response.json();
      
      setProductFetchStep("Synthesizing cinematic hooks, transition scripts, and CTA...");
      
      if (result && result.script) {
        setGeneratedScript(result.script);
        setTopic(result.script.title || "E-Commerce Product");
        setRecentToast({
          message: "🛍️ AD CAMPAIGN GENERATED",
          sub: `Successfully generated a high-converting video ad for ${result.script.title}`
        });
      } else {
        throw new Error("No script returned from Gemini E-commerce Ad suite.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to analyze product link. Please check your internet connection.");
    } finally {
      setIsFetchingProduct(false);
      setProductLink("");
    }
  };

  // Form Submission
  const handleGenerate = async (e?: FormEvent, overrideTopic?: string, overrideDuration?: number) => {
    if (e) e.preventDefault();
    const activeTopic = overrideTopic || topic;
    const activeDuration = overrideDuration || wizardDuration || 60;
    if (!activeTopic || activeTopic.trim() === "") {
      setError("Please input a valid topic before generating.");
      return;
    }
    
    // Check if subscription limits have been exceeded to trigger auto-upsell
    const { isExceeded, limit } = getQuotaStatus(1);
    if (isExceeded && !adminBypassActive) {
      setRecentToast({
        message: "⚠️ Subscription Limit Exceeded",
        sub: `You have exhausted your video quota of ${limit} videos. Please upgrade to continue!`
      });
      setCurrentView("pricing"); // Automatically open the pricing sheet to trigger upsell
      return;
    }

    if (overrideTopic) {
      setTopic(overrideTopic);
    }

    setIsGenerating(true);
    setCreationStep(4);
    setError(null);
    setGeneratedScript(null);
    setShowTeleprompter(false);

    try {
      // Get active user's email dynamically from auth state or storage
      let userEmail = activeUser?.email || auth.currentUser?.email || localStorage.getItem("userEmail") || localStorage.getItem("controlvid_user_email") || localStorage.getItem("viralflow_user_email") || "";
      if (!userEmail) {
        try {
          const { getUsers } = await import("./lib/firebase");
          const allUsers = await getUsers();
          const foundUser = allUsers.find(u => u.serialId === activeUserSerialId);
          if (foundUser?.email) {
            userEmail = foundUser.email;
          }
        } catch (dbErr) {
          console.warn("Could not retrieve active user email:", dbErr);
        }
      }

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: activeTopic,
          tone: selectedTone,
          platform: selectedPlatform,
          email: userEmail,
          duration: activeDuration,
          engineType: workspaceMode === "long_form" ? "long_form" : "shorts",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Server responded with an error status.");
      }

      const scriptData: ScriptResponse = await response.json();
      setGeneratedScript(scriptData);
      saveToHistory(scriptData, activeTopic);

      // Relational database usage log sync on Firestore
      try {
        const { createUsageLog, getUsers } = await import("./lib/firebase");
        const allUsers = await getUsers();
        const activeUser = allUsers.find(u => u.serialId === activeUserSerialId) || allUsers[0];
        if (activeUser) {
          await createUsageLog(
            activeUser.serialId,
            activeUser.email,
            `Generate Script (${selectedPlatform})`,
            0.0015 // simulated API generation cost
          );
          console.log(`[Firestore Sync] Logged script generation cost of $0.0015 for user #${activeUser.serialId}`);
        }
      } catch (dbErr) {
        console.warn("Could not sync script generation log to Firestore:", dbErr);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to generate viral script. Please check your network and API credentials.");
    } finally {
      setIsGenerating(false);
    }
  };

  const trendingTopics = [
    { title: "The 3PM Coffee Fallacy", prompt: "Why morning coffee is a trap and afternoon caffeine resets your sleep cycle incorrectly" },
    { title: "Buy Expensive Shoes", prompt: "Why buying cheap shoes actually costs you thousands of dollars in medical and repair bills" },
    { title: "Sleep is for the Rich", prompt: "The physiological lie that sleep deprivation makes you a productive founder" },
  ];

  const scrollToFAQ = () => {
    if (currentView !== "landing") {
      setCurrentView("landing");
    }
    setTimeout(() => {
      const element = document.getElementById("faq-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 120);
  };

  const scrollToContact = () => {
    if (currentView !== "landing") {
      setCurrentView("landing");
    }
    setTimeout(() => {
      const element = document.getElementById("contact-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 120);
  };

  // Compute filtered affiliates for Admin Dashboard dynamically
  const filteredAffiliates = adminAffiliates.filter(aff => {
    const matchesSearch =
      aff.name.toLowerCase().includes(adminSearchQuery.toLowerCase()) ||
      aff.email.toLowerCase().includes(adminSearchQuery.toLowerCase());
    const matchesStatus =
      adminStatusFilter === "All" || aff.status === adminStatusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="relative min-h-screen bg-[#121212] text-slate-200 flex flex-col font-sans overflow-x-hidden">
      {/* Background Dot Matrix pattern */}
      <div className="grid-bg pointer-events-none" />

      {/* Main Navigation Bar */}
      {currentView !== "saas-db" && (
        <header className="relative z-20 h-20 border-b border-slate-900 bg-[#121212]/90 backdrop-blur-md flex flex-row flex-nowrap items-center justify-between px-4 sm:px-8 md:px-12 sticky top-0 shadow-lg shadow-[#38bdf8]/5 whitespace-nowrap overflow-x-auto scrollbar-none md:overflow-visible">
          {/* Left Section: Logo */}
          <div className="flex-1 flex items-center justify-start whitespace-nowrap flex-shrink-0">
            <button 
              id="nav-logo-toggle-btn"
              onClick={() => {
                if (isPreviewEnvironment) {
                  // In preview/editor environment, retain quick-switch between landing and main workspace/admin dashboards
                  setCurrentView(prev => prev === "landing" ? "dashboard" : "landing");
                } else {
                  // In production, function as standard navigation link to public landing page or user dashboard
                  if (currentPath === "/admin/affiliates") {
                    window.history.pushState({}, "", "/");
                    setCurrentPath("/");
                  }
                  setCurrentView(isLoggedIn ? "dashboard" : "landing");
                }
              }}
              className="flex items-center space-x-3 bg-transparent border-none p-0 cursor-pointer text-left focus:outline-none whitespace-nowrap"
            >
              <div className="relative w-8 h-8 flex items-center justify-center flex-shrink-0 animate-logo-pulse">
                <div className="absolute inset-0 bg-[#38bdf8]/20 rounded-full blur-sm" />
                <svg className="w-7 h-7 text-[#38bdf8] logo-icon-glow relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                  <polygon points="10 8 15 12 10 16 10 8" fill="currentColor" className="text-[#38bdf8] logo-icon-glow" />
                </svg>
              </div>
              <span className="text-xl sm:text-2xl font-black tracking-tight logo-gradient-text font-sans whitespace-nowrap">
                ControlVid
              </span>
            </button>
          </div>

          {/* Center & Right Navigation Sections - Hidden on Dashboard view */}
          {currentView === "landing" || currentView === "pricing" ? (
            <>
              {/* Center Section: Menu links 'Pricing', 'Affiliate' */}
              <nav className="flex flex-row flex-nowrap items-center justify-center space-x-6 sm:space-x-12 flex-1 whitespace-nowrap">
                <button
                  onClick={() => setCurrentView("pricing")}
                  className="text-[14px] sm:text-[16px] font-sans font-bold text-[#FFFFFF] hover:text-[#38bdf8] tracking-wider transition-colors cursor-pointer bg-transparent border-none focus:outline-none whitespace-nowrap"
                >
                  Pricing
                </button>
                <button
                  onClick={() => setIsAffiliateOpen(true)}
                  className="text-[14px] sm:text-[16px] font-sans font-bold text-[#FFFFFF] hover:text-[#38bdf8] tracking-wider transition-colors cursor-pointer bg-transparent border-none focus:outline-none whitespace-nowrap"
                >
                  Affiliate
                </button>
              </nav>

              {/* Right Section: Sign In and Get Started */}
              <div className="flex-1 flex flex-row flex-nowrap items-center justify-end space-x-2 sm:space-x-4 whitespace-nowrap flex-shrink-0">
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="google-sign-in-button sign-in-button inline-flex flex-row flex-nowrap items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold font-sans text-white bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.15] hover:border-white/[0.25] rounded-full transition-all cursor-pointer focus:outline-none whitespace-nowrap flex-shrink-0"
                >
                  <svg className="g-logo w-4 h-4 min-w-[16px] min-h-[16px] flex-shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span className="whitespace-nowrap font-bold text-white text-xs sm:text-sm">Sign in with Google</span>
                </button>
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  style={{ background: "linear-gradient(135deg, #38bdf8, #FFFFFF)", color: "#020617", boxShadow: "0 0 15px rgba(56, 189, 248, 0.5)" }}
                  className="get-started-button px-4 sm:px-6 py-2 sm:py-2.5 font-sans font-bold text-xs sm:text-sm tracking-wider rounded-full hover:bg-[#38bdf8]/85 transition-all cursor-pointer shadow-lg shadow-[#38bdf8]/15 whitespace-nowrap flex-shrink-0"
                >
                  Get Started
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-row items-center justify-end space-x-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{activeUser?.email || "Creator Account Active"}</span>
              </div>
            </div>
          )}
        </header>
      )}

      {/* Main content conditional viewports */}
      {currentPath === "/admin/affiliates" ? (
        isAdmin ? (
          /* FULL PAGE STANDALONE OWNER ADMIN DASHBOARD */
          <div className="min-h-screen bg-[#121212] text-white flex flex-col p-6 sm:p-12 font-sans overflow-y-auto">
            <div className="max-w-7xl w-full mx-auto space-y-8 animate-[fadeIn_0.2s_ease-out]">
              
              {/* Back Link & Navigation Breadcrumb */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-amber-500 bg-amber-500/10 border border-amber-500/15 mb-3">
                    <ShieldCheck className="h-4 w-4" />
                    <span>SECURE_AFFILIATE_ADMIN</span>
                  </div>
                  <h1 className="text-3xl font-black text-white uppercase tracking-tight leading-none">Affiliate Admin Console</h1>
                  <p className="text-sm text-neutral-400 mt-1.5">Standalone Route: /admin/affiliates — Access Level: Verified OWNER Account Only</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      window.history.pushState({}, "", "/");
                      setCurrentPath("/");
                      setCurrentView("landing");
                    }}
                    className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-neutral-300 hover:text-white hover:bg-white/10 cursor-pointer transition-all uppercase tracking-wider"
                  >
                    Return to Terminal
                  </button>
                  <button
                    onClick={() => {
                      setCurrentView("saas-db");
                    }}
                    className="px-5 py-2.5 bg-[#38bdf8] hover:bg-[#38bdf8]/80 text-black font-extrabold rounded-xl text-xs uppercase tracking-wider cursor-pointer transition-all border-none"
                  >
                    Open Identity System
                  </button>
                </div>
              </div>

              {/* Render Admin Dashboard Content */}
              <div className="p-8 rounded-2xl bg-black/60 border border-white/10 shadow-2xl space-y-8 backdrop-blur-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 relative group">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Active Partners</span>
                      <Users className="h-4 w-4 text-amber-500" />
                    </div>
                    <span className="text-3xl font-black text-white">{dbAffiliates.filter(a => a.status === "Active").length}</span>
                    <span className="block text-xs text-neutral-400 mt-1">Across all campaigns</span>
                  </div>
                  <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 relative group">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Pending Registrations</span>
                      <Sliders className="h-4 w-4 text-amber-400" />
                    </div>
                    <span className="text-3xl font-black text-white">{dbAffiliates.filter(a => a.status === "Pending").length}</span>
                    <span className="block text-xs text-neutral-400 mt-1">Awaiting compliance screening</span>
                  </div>
                  <div className="p-6 rounded-xl bg-amber-500/5 border border-amber-500/10 relative group">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">Total Payouts Due</span>
                      <Wallet className="h-4 w-4 text-amber-400" />
                    </div>
                    <span className="text-3xl font-black text-amber-400">
                      ${dbAffiliates.reduce((sum, a) => sum + a.payoutsDue, 0).toFixed(2)}
                    </span>
                    <span className="block text-xs text-amber-300/60 mt-1">Real-time database sum</span>
                  </div>
                </div>

                {/* Main Filter & Table Area */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="relative flex-1 w-full">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                      <input
                        type="text"
                        placeholder="Filter database by partner name or email..."
                        value={adminSearchQuery}
                        onChange={(e) => setAdminSearchQuery(e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500/50 transition-colors"
                      />
                    </div>
                    
                    <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto py-1">
                      {(["All", "Active", "Pending", "Suspended"] as const).map(f => (
                        <button
                          key={f}
                          onClick={() => setAdminStatusFilter(f)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors whitespace-nowrap cursor-pointer ${
                            adminStatusFilter === f
                              ? "bg-amber-500 text-black font-black"
                              : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border-none focus:outline-none"
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto border border-white/5 rounded-xl bg-black/40">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                      <thead>
                        <tr className="border-b border-white/5 bg-white/[0.01] text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                          <th className="p-3">Partner Identity</th>
                          <th className="p-3">Compliance Source</th>
                          <th className="p-3 text-right">Referrals</th>
                          <th className="p-3 text-right">Payout Due</th>
                          <th className="p-3 text-center">Status</th>
                          <th className="p-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-xs text-neutral-300">
                        {dbAffiliates
                          .filter(a => {
                            const matchesSearch = a.name.toLowerCase().includes(adminSearchQuery.toLowerCase()) || 
                                                  a.email.toLowerCase().includes(adminSearchQuery.toLowerCase());
                            const matchesFilter = adminStatusFilter === "All" || a.status === adminStatusFilter;
                            return matchesSearch && matchesFilter;
                          }).length === 0 ? (
                          <tr>
                            <td colSpan={6} className="p-8 text-center text-neutral-500 font-mono">
                              No affiliate records found matching query filter.
                            </td>
                          </tr>
                        ) : (
                          dbAffiliates
                            .filter(a => {
                              const matchesSearch = a.name.toLowerCase().includes(adminSearchQuery.toLowerCase()) || 
                                                    a.email.toLowerCase().includes(adminSearchQuery.toLowerCase());
                              const matchesFilter = adminStatusFilter === "All" || a.status === adminStatusFilter;
                              return matchesSearch && matchesFilter;
                            })
                            .map(aff => (
                              <tr key={aff.id} className="hover:bg-white/[0.01] transition-colors">
                                <td className="p-3">
                                  <div className="font-bold text-white text-sm">{aff.name}</div>
                                  <div className="text-neutral-400 font-mono text-[11px] mt-0.5">{aff.email}</div>
                                  <div className="text-[10px] text-neutral-500 mt-1">Joined: {aff.signupDate}</div>
                                </td>
                                <td className="p-3">
                                  <span className="font-semibold text-neutral-300 block">{aff.trafficSource || "Organic"}</span>
                                  <span className="text-[10px] font-mono text-neutral-500">Method: {aff.paymentMethod?.toUpperCase() || "UNCONFIGURED"}</span>
                                </td>
                                <td className="p-3 text-right font-mono font-bold text-neutral-200">
                                  {aff.totalReferrals}
                                </td>
                                <td className="p-3 text-right">
                                  <div className="font-mono font-black text-amber-400 text-sm">
                                    ${aff.payoutsDue.toFixed(2)}
                                  </div>
                                  {aff.payoutsDue > 0 ? (
                                    <div className="mt-1">
                                      <button
                                        disabled={aff.status === "Suspended"}
                                        onClick={() => handleTriggerPayout(aff.id)}
                                        style={{ backgroundColor: aff.status === "Suspended" ? "transparent" : "#10B981" }}
                                        className={`text-[9px] text-black font-extrabold uppercase px-2 py-1 rounded transition-colors cursor-pointer border-none focus:outline-none ${
                                          aff.status === "Suspended"
                                            ? "text-neutral-600 bg-neutral-900 border border-white/5 cursor-not-allowed"
                                            : "hover:bg-emerald-400 text-black font-black"
                                        }`}
                                      >
                                        Mark as Paid
                                      </button>
                                    </div>
                                  ) : (
                                    <span className="text-emerald-400 font-mono font-bold flex items-center justify-end gap-1 text-[10px] mt-1">
                                      <CheckCircle2 className="h-3 w-3" /> Fully Paid
                                    </span>
                                  )}
                                </td>
                                <td className="p-3 text-center">
                                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                    aff.status === "Active"
                                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/15"
                                      : aff.status === "Pending"
                                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/15"
                                      : "bg-rose-500/10 text-rose-400 border border-rose-500/15"
                                  }`}>
                                    {aff.status}
                                  </span>
                                </td>
                                <td className="p-3 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    {aff.status === "Pending" && (
                                      <button
                                        onClick={() => handleUpdateStatus(aff.id, "Active")}
                                        className="text-[10px] bg-emerald-500 text-black font-bold uppercase px-2 py-1 rounded hover:bg-emerald-400 transition-colors cursor-pointer focus:outline-none border-none"
                                      >
                                        Approve
                                      </button>
                                    )}
                                    {aff.status === "Active" ? (
                                      <button
                                        onClick={() => handleUpdateStatus(aff.id, "Suspended")}
                                        className="text-[10px] bg-rose-950/40 text-rose-400 border border-rose-800/30 font-bold uppercase px-2 py-1 rounded hover:bg-rose-900/30 transition-colors cursor-pointer focus:outline-none"
                                      >
                                        Suspend
                                      </button>
                                    ) : (
                                      aff.status === "Suspended" && (
                                        <button
                                          onClick={() => handleUpdateStatus(aff.id, "Active")}
                                          className="text-[10px] bg-emerald-950/40 text-emerald-400 border border-emerald-800/30 font-bold uppercase px-2 py-1 rounded hover:bg-emerald-900/30 transition-colors cursor-pointer focus:outline-none"
                                        >
                                          Reactivate
                                        </button>
                                      )
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

            </div>
          </div>
        ) : (
          /* NOT RENDERED FOR NON-ADMIN USERS - 404 */
          <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center p-6 text-center text-slate-400 font-mono text-sm space-y-4">
            <div className="text-4xl font-black text-slate-600">404</div>
            <div>Page Not Found</div>
            <button
              onClick={() => {
                window.history.pushState({}, "", "/");
                setCurrentPath("/");
                setCurrentView("landing");
              }}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-sans text-white hover:bg-white/10 cursor-pointer"
            >
              Back to Home
            </button>
          </div>
        )
      ) : currentView === "landing" ? (
        <LandingPage 
          onStartGenerating={() => setIsAuthModalOpen(true)} 
          onOpenAffiliate={() => setIsAffiliateOpen(true)}
        />
      ) : (currentView === "saas-db" && isAdmin) ? (
        <SaaSDatabaseDashboard 
          onClose={() => {
            const activeTiers = ["spark", "growth", "velocity", "empire", "enterprise", "pro", "active", "active_verified", "agency", "starter", "free"];
            const isUserActiveInDb = activeUser && activeTiers.includes((activeUser.subscription_tier || "").toLowerCase());
            if (isUserActiveInDb || adminBypassActive) {
              setCurrentView("dashboard");
            } else {
              setCurrentView("pricing");
            }
          }} 
          activeUserSerialId={activeUserSerialId}
          onSetActiveUserSerialId={setActiveUserSerialId}
          adminBypassActive={adminBypassActive}
          setAdminBypassActive={setAdminBypassActive}
        />
      ) : currentView === "pricing" ? (
        <PricingPage 
          onClose={() => {
            setCurrentView(activeUser ? "dashboard" : "landing");
            setPreSelectedPlan(undefined);
            setPreSelectedStep(undefined);
          }}
          adminBypassActive={adminBypassActive}
          onCEOAccess={() => setCurrentView("dashboard")}
          activeUserEmail={activeUser?.email}
          initialPlanName={preSelectedPlan}
          initialStep={preSelectedStep}
        />
      ) : (activeUser && !["spark", "growth", "velocity", "empire", "enterprise", "pro", "active", "active_verified", "agency", "starter", "free"].includes((activeUser.subscription_tier || "").toLowerCase()) && !adminBypassActive) ? (
        // Enforce strict gatekeeper funnel: redirect to pricing if they try to bypass or select inactive user actor
        <PricingPage 
          onClose={() => {
            setCurrentView(activeUser ? "dashboard" : "landing");
            setPreSelectedPlan(undefined);
            setPreSelectedStep(undefined);
          }}
          adminBypassActive={adminBypassActive}
          onCEOAccess={() => setCurrentView("dashboard")}
          gatedNotice={true}
          activeUserEmail={activeUser?.email}
          initialPlanName={preSelectedPlan}
          initialStep={preSelectedStep}
        />
      ) : (
        <main className="relative z-10 flex-1 flex flex-col md:flex-row min-h-0 w-full overflow-hidden">

          {/* ========================================== */}
          {/* DESKTOP & TABLET LAYOUT (>= 768px / md:)  */}
          {/* Side-by-side sidebar and workspace (UNTOUCHED) */}
          {/* ========================================== */}
          <div className="hidden md:flex flex-row flex-1 min-h-0 w-full">
            {/* COLLAPSIBLE SIDEBAR */}
            <aside className={`border-r border-white/[0.08] bg-[#1E1E1E] transition-all duration-300 flex flex-col justify-between shrink-0 z-30 ${isSidebarCollapsed ? "w-16" : "w-64"}`}>
              {/* Sidebar Content */}
              <div className="flex flex-col gap-6 p-4">
                {/* Sidebar Header with Toggle button */}
                <div className="flex items-center justify-between border-b border-white/[0.04] pb-4">
                  {!isSidebarCollapsed && (
                    <span className="text-xs font-black font-sans text-white tracking-widest uppercase">
                      ControlVid
                    </span>
                  )}
                  <button
                    onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer transition-all outline-none"
                    title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                  >
                    <Menu className="h-4 w-4" />
                  </button>
                </div>

                {/* Sections & Items */}
                <div className="space-y-6">
                  {/* Creation Section */}
                  <div className="space-y-2">
                    {!isSidebarCollapsed ? (
                      <span className="text-[9px] font-sans font-bold text-white uppercase tracking-widest block">
                        Creation
                      </span>
                    ) : (
                      <div className="border-b border-white/[0.04] my-2" />
                    )}
                    <div className="space-y-1">
                      {/* 1. Long-Form */}
                      <button
                        onClick={() => {
                          handleNavigation("long_form");
                          window.location.hash = "#long-form";
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-bold rounded-lg transition-all focus:outline-none cursor-pointer ${
                          workspaceMode === "long_form"
                            ? "bg-[#38bdf8]/15 text-white font-black shadow-[0_0_12px_rgba(56,189,248,0.25)] ring-1 ring-[#38bdf8]/30"
                            : "text-slate-400 hover:text-white hover:bg-white/5 bg-transparent"
                        }`}
                        title="AI Long-Form Scripting & Storytelling"
                      >
                        <Video className="h-4 w-4 shrink-0 text-[#38bdf8]" />
                        {!isSidebarCollapsed && <span className="truncate text-left font-sans font-bold">Long-Form</span>}
                      </button>

                      {/* 2. Viral Shorts */}
                      <button
                        onClick={() => {
                          handleNavigation("magic");
                          window.location.hash = "#magic";
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-bold rounded-lg transition-all focus:outline-none cursor-pointer ${
                          (workspaceMode === "magic" || workspaceMode === "viral_shorts")
                            ? "bg-[#38bdf8]/15 text-white font-black shadow-[0_0_12px_rgba(56,189,248,0.25)] ring-1 ring-[#38bdf8]/30"
                            : "text-slate-400 hover:text-white hover:bg-white/5 bg-transparent"
                        }`}
                        title="Viral Shorts (AI Video Autopilot)"
                      >
                        <Sparkles className="h-4 w-4 shrink-0 text-[#38bdf8]" />
                        {!isSidebarCollapsed && <span className="truncate text-left font-sans font-bold">Viral Shorts</span>}
                      </button>

                      {/* 3. Fake Text */}
                      <button
                        onClick={() => {
                          handleNavigation("fake_text");
                          window.location.hash = "#fake-text";
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-bold rounded-lg transition-all focus:outline-none cursor-pointer ${
                          workspaceMode === "fake_text"
                            ? "bg-[#38bdf8]/15 text-white font-black shadow-[0_0_12px_rgba(56,189,248,0.25)] ring-1 ring-[#38bdf8]/30"
                            : "text-slate-400 hover:text-white hover:bg-white/5 bg-transparent"
                        }`}
                        title="Fake Text Chat Stories"
                      >
                        <MessageSquare className="h-4 w-4 shrink-0 text-[#38bdf8]" />
                        {!isSidebarCollapsed && <span className="truncate text-left font-sans font-bold">Fake Text</span>}
                      </button>

                      {/* 4. Story/POV */}
                      <button
                        onClick={() => {
                          handleNavigation("story_pov");
                          window.location.hash = "#story-pov";
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-bold rounded-lg transition-all focus:outline-none cursor-pointer ${
                          workspaceMode === "story_pov"
                            ? "bg-[#38bdf8]/15 text-white font-black shadow-[0_0_12px_rgba(56,189,248,0.25)] ring-1 ring-[#38bdf8]/30"
                            : "text-slate-400 hover:text-white hover:bg-white/5 bg-transparent"
                        }`}
                        title="Story POV Immersive Experience"
                      >
                        <Eye className="h-4 w-4 shrink-0 text-[#38bdf8]" />
                        {!isSidebarCollapsed && <span className="truncate text-left font-sans font-bold">Story/POV</span>}
                      </button>

                      {/* 5. Split-Screen */}
                      <button
                        onClick={() => {
                          handleNavigation("split_screen");
                          window.location.hash = "#split-screen";
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-bold rounded-lg transition-all focus:outline-none cursor-pointer ${
                          workspaceMode === "split_screen"
                            ? "bg-[#38bdf8]/15 text-white font-black shadow-[0_0_12px_rgba(56,189,248,0.25)] ring-1 ring-[#38bdf8]/30"
                            : "text-slate-400 hover:text-white hover:bg-white/5 bg-transparent"
                        }`}
                        title="Split-Screen Dual Camera Compiler"
                      >
                        <Layers className="h-4 w-4 shrink-0 text-[#38bdf8]" />
                        {!isSidebarCollapsed && <span className="truncate text-left font-sans font-bold">Split-Screen</span>}
                      </button>

                      {/* 6. Social Viral Cloner */}
                      <button
                        onClick={() => {
                          handleNavigation("social_viral_cloner");
                          window.location.hash = "#social-viral-cloner";
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-bold rounded-lg transition-all focus:outline-none cursor-pointer ${
                          (workspaceMode === "social_viral_cloner" || workspaceMode === "social-viral-cloner")
                            ? "bg-[#38bdf8]/15 text-white font-black shadow-[0_0_12px_rgba(56,189,248,0.25)] ring-1 ring-[#38bdf8]/30"
                            : "text-slate-400 hover:text-white hover:bg-white/5 bg-transparent"
                        }`}
                        title="Social Viral Cloner"
                      >
                        <Share2 className="h-4 w-4 shrink-0 text-emerald-400" />
                        {!isSidebarCollapsed && <span className="truncate text-left font-sans font-bold">Social Viral Cloner</span>}
                      </button>

                      {/* 7. E-commerce Ads Video */}
                      <button
                        onClick={() => {
                          handleNavigation("ecommerce");
                          window.location.hash = "#ecommerce";
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-bold rounded-lg transition-all focus:outline-none cursor-pointer ${
                          workspaceMode === "ecommerce"
                            ? "bg-[#38bdf8]/15 text-white font-black shadow-[0_0_12px_rgba(56,189,248,0.25)] ring-1 ring-[#38bdf8]/30"
                            : "text-slate-400 hover:text-white hover:bg-white/5 bg-transparent"
                        }`}
                        title="E-commerce Ads Video Studio"
                      >
                        <ShoppingBag className="h-4 w-4 shrink-0 text-[#38bdf8]" />
                        {!isSidebarCollapsed && <span className="truncate text-left font-sans font-bold">E-commerce Ads Video</span>}
                      </button>

                      {/* 8. Long-Form to Auto-Clips */}
                      <button
                        onClick={() => {
                          handleNavigation("long_form_clips");
                          window.location.hash = "#long-form-clips";
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-bold rounded-lg transition-all focus:outline-none cursor-pointer ${
                          workspaceMode === "long_form_clips"
                            ? "bg-[#38bdf8]/15 text-white font-black shadow-[0_0_12px_rgba(56,189,248,0.25)] ring-1 ring-[#38bdf8]/30"
                            : "text-slate-400 hover:text-white hover:bg-white/5 bg-transparent"
                        }`}
                        title="Long-Form to Auto-Clips Cutter"
                      >
                        <Zap className="h-4 w-4 shrink-0 text-[#38bdf8]" />
                        {!isSidebarCollapsed && <span className="truncate text-left font-sans font-bold">Long-Form to Auto-Clips</span>}
                      </button>

                      {/* 9. Custom Mode */}
                      <button
                        onClick={() => {
                          handleNavigation("custom");
                          window.location.hash = "#custom";
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-bold rounded-lg transition-all focus:outline-none cursor-pointer ${
                          workspaceMode === "custom"
                            ? "bg-[#38bdf8]/15 text-white font-black shadow-[0_0_12px_rgba(56,189,248,0.25)] ring-1 ring-[#38bdf8]/30"
                            : "text-slate-400 hover:text-white hover:bg-white/5 bg-transparent"
                        }`}
                        title="Custom Mode (Manual Retention Flow)"
                      >
                        <Sliders className="h-4 w-4 shrink-0 text-[#38bdf8]" />
                        {!isSidebarCollapsed && <span className="truncate text-left font-sans font-bold">Custom Mode</span>}
                      </button>
                    </div>
                  </div>

                  {/* Automation Section */}
                  <div className="space-y-2">
                    {!isSidebarCollapsed ? (
                      <span className="text-[9px] font-sans font-bold text-white uppercase tracking-widest block">
                        Automations
                      </span>
                    ) : (
                      <div className="border-b border-white/[0.04] my-2" />
                    )}
                    <div className="space-y-1">
                      <button
                        onClick={() => {
                          handleNavigation("analytics");
                          window.location.hash = "#analytics";
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-bold rounded-lg transition-all focus:outline-none cursor-pointer ${
                          workspaceMode === "analytics"
                            ? "bg-[#38bdf8]/15 text-white font-black shadow-[0_0_12px_rgba(56,189,248,0.25)] ring-1 ring-[#38bdf8]/30"
                            : "text-slate-400 hover:text-white hover:bg-white/5 bg-transparent"
                        }`}
                        title="Analytics"
                      >
                        <BarChart3 className="h-4 w-4 shrink-0 text-[#38bdf8]" />
                        {!isSidebarCollapsed && <span className="truncate text-left font-sans font-bold">Analytics</span>}
                      </button>

                      <button
                        onClick={() => {
                          handleNavigation("scheduler");
                          window.location.hash = "#scheduler";
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-bold rounded-lg transition-all focus:outline-none cursor-pointer ${
                          workspaceMode === "scheduler"
                            ? "bg-[#38bdf8]/15 text-white font-black shadow-[0_0_12px_rgba(56,189,248,0.25)] ring-1 ring-[#38bdf8]/30"
                            : "text-slate-400 hover:text-white hover:bg-white/5 bg-transparent"
                        }`}
                        title="Scheduler"
                      >
                        <Calendar className="h-4 w-4 shrink-0 text-[#38bdf8]" />
                        {!isSidebarCollapsed && <span className="truncate text-left font-sans font-bold">Scheduler</span>}
                      </button>

                      <button
                        onClick={() => {
                          handleNavigation("dm_automation");
                          window.location.hash = "#dm-automation";
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-bold rounded-lg transition-all focus:outline-none cursor-pointer ${
                          workspaceMode === "dm_automation"
                            ? "bg-[#38bdf8]/15 text-white font-black shadow-[0_0_12px_rgba(56,189,248,0.25)] ring-1 ring-[#38bdf8]/30"
                            : "text-slate-400 hover:text-white hover:bg-white/5 bg-transparent"
                        }`}
                        title="Facebook & Instagram DM Automation"
                      >
                        <Send className="h-4 w-4 shrink-0 text-[#38bdf8]" />
                        {!isSidebarCollapsed && <span className="truncate text-left font-sans font-bold">Facebook & Instagram DM Automation</span>}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Account & Subscription Billing Navigation Tab */}
              <div className="p-3 border-t border-white/[0.08] bg-[#16161A]">
                {isSidebarCollapsed ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="relative" title={`${activeUser?.email || "creator@controlvid.ai"}`}>
                      <div className="h-8 w-8 rounded-full bg-amber-400 text-black flex items-center justify-center font-black text-xs uppercase shadow-md">
                        {(activeUser?.email || "U")[0]}
                      </div>
                      <span className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-[#1E1E1E] ${isSubscriptionCancelled ? "bg-amber-500" : "bg-emerald-500"}`} />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        handleNavigation("subscription");
                        window.location.hash = "#subscription";
                      }}
                      className={`p-2 rounded-lg transition-all cursor-pointer border outline-none ${
                        workspaceMode === "subscription"
                          ? "bg-[#38bdf8]/20 text-white border-[#38bdf8]/40 shadow-[0_0_12px_rgba(56,189,248,0.25)]"
                          : "bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border-white/10"
                      }`}
                      title="Subscription & Billing"
                    >
                      <CreditCard className="h-4 w-4 text-[#38bdf8]" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2 text-left font-sans">
                    {/* User Avatar & Status Bar */}
                    <div className="flex items-center justify-between gap-2 px-1">
                      <div className="flex items-center gap-2 truncate">
                        <div className="h-6 w-6 rounded-full bg-amber-400 text-black flex items-center justify-center font-black text-[10px] shrink-0 uppercase shadow">
                          {(activeUser?.email || "U")[0]}
                        </div>
                        <span className="text-[11px] font-bold text-slate-200 block truncate leading-tight">
                          {activeUser?.email || "creator@controlvid.ai"}
                        </span>
                      </div>
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider shrink-0 border ${
                        isSubscriptionCancelled 
                          ? "bg-amber-500/15 text-amber-400 border-amber-500/30" 
                          : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                      }`}>
                        {isSubscriptionCancelled ? "CANCELING" : "ACTIVE"}
                      </span>
                    </div>

                    {/* Clean Link Button for Subscription & Billing View */}
                    <button
                      type="button"
                      onClick={() => {
                        handleNavigation("subscription");
                        window.location.hash = "#subscription";
                      }}
                      className={`w-full p-2.5 flex items-center justify-between rounded-xl transition-all cursor-pointer outline-none border ${
                        workspaceMode === "subscription"
                          ? "bg-[#38bdf8]/20 text-white border-[#38bdf8]/50 shadow-[0_0_15px_rgba(56,189,248,0.25)]"
                          : "bg-white/[0.04] hover:bg-white/[0.08] text-white border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-[#38bdf8] shrink-0" />
                        <span className="text-xs font-black text-white tracking-wide">
                          Subscription & Billing
                        </span>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-white shrink-0" />
                    </button>
                  </div>
                )}
              </div>
            </aside>

            {/* MAIN WORKSPACE SECTION */}
            <div className="flex-1 flex flex-col min-h-0 bg-[#121212] overflow-y-auto custom-scrollbar">
              {/* Header displaying details of current active mode */}
              <div className="border-b border-white/[0.04] p-4 sm:p-5 flex items-center justify-between bg-black/20">
                <div className="flex items-center gap-3">
                  {isSidebarCollapsed && (
                    <button
                      onClick={() => setIsSidebarCollapsed(false)}
                      className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer transition-all outline-none"
                      title="Expand Sidebar"
                    >
                      <Menu className="h-4 w-4" />
                    </button>
                  )}
                  <span className="text-xs font-black font-sans text-white uppercase tracking-wider">
                    {workspaceMode === "subscription" ? "Subscription & Billing Portal" :
                     workspaceMode === "magic" || workspaceMode === "viral_shorts" ? "Viral Shorts (AI Video Autopilot)" :
                     workspaceMode === "fake_text" ? "Fake Text Chat Stories" :
                     workspaceMode === "story_pov" ? "Story POV Immersive Experience" :
                     workspaceMode === "split_screen" ? "Split-Screen Dual Camera Compiler" :
                     workspaceMode === "ecommerce" ? "E-Commerce Ads Video Studio" :
                     workspaceMode === "long_form_clips" ? "Long-Form to Auto-Clips" :
                     workspaceMode === "long_form" ? "AI Long-Form Scripting" :
                     workspaceMode === "custom" ? "Custom Mode (Manual Control)" :
                     workspaceMode === "social_viral_cloner" || workspaceMode === "social-viral-cloner" ? "Social Viral Cloner" :
                     workspaceMode === "analytics" ? "Performance & CTR Analytics" :
                     workspaceMode === "scheduler" ? "Bulk Campaign Scheduler" :
                     "Lead-Nurturing DM Auto-responder"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-1.5 bg-white/[0.02] border border-white/[0.05] rounded-lg px-2.5 py-1 text-[10px] font-mono text-slate-400 font-bold">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Actor Node: {activeUser?.email || "Anonymous"}</span>
                  </div>
                </div>
              </div>

              <section className={`w-full ${
                workspaceMode === "analytics" || workspaceMode === "scheduler" || workspaceMode === "subscription" || workspaceMode === "social_viral_cloner" || workspaceMode === "social-viral-cloner" ? "max-w-7xl" : "max-w-4xl"
              } mx-auto p-4 sm:p-8 flex flex-col gap-6 flex-1`}>
                
                {/* Render Workspace Mode Component */}
                {renderWorkspaceContent(workspaceMode)}

              </section>
            </div>
          </div>

          {/* ========================================== */}
          {/* MOBILE ONLY ACCORDION LAYOUT (< 768px / max-width: 768px) */}
          {/* Full-width main menu homepage & expanded tool accordions */}
          {/* ========================================== */}
          <div className="flex md:hidden flex-col w-full flex-1 bg-[#121212] overflow-y-auto p-4 space-y-6 pb-24 custom-scrollbar">
            
            {/* Mobile Header Account Bar */}
            <div className="flex items-center justify-between p-3.5 bg-[#1e293b]/60 border border-white/10 rounded-xl">
              <div className="flex items-center gap-2.5 truncate">
                <div className="h-8 w-8 rounded-full bg-amber-400 text-black flex items-center justify-center font-black text-xs uppercase shadow">
                  {(activeUser?.email || "U")[0]}
                </div>
                <div className="truncate">
                  <span className="text-xs font-bold text-white block truncate">
                    {activeUser?.email || "creator@controlvid.ai"}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Plan: <span className="text-[#38bdf8] font-bold uppercase">{activeUser?.subscription_tier || "Empire"}</span>
                  </span>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider shrink-0 border ${
                isSubscriptionCancelled 
                  ? "bg-amber-500/15 text-amber-400 border-amber-500/30" 
                  : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
              }`}>
                {isSubscriptionCancelled ? "CANCELING" : "ACTIVE"}
              </span>
            </div>

            {/* SECTION 1: CREATION TOOLS */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <Sparkles className="h-4 w-4 text-[#38bdf8]" />
                <span className="text-xs font-black font-sans text-white uppercase tracking-widest">
                  Creation Tools
                </span>
              </div>

              <div className="space-y-2.5">
                {[
                  {
                    id: "long_form",
                    title: "Long-Form",
                    description: "AI Long-Form Scripting & Storytelling",
                    icon: <Video className="h-5 w-5 text-[#38bdf8]" />
                  },
                  {
                    id: "magic",
                    title: "Viral Shorts",
                    description: "AI Video Autopilot & Short Clips",
                    icon: <Sparkles className="h-5 w-5 text-[#38bdf8]" />
                  },
                  {
                    id: "fake_text",
                    title: "Fake Text",
                    description: "Fake Text Chat Story Generator",
                    icon: <MessageSquare className="h-5 w-5 text-[#38bdf8]" />
                  },
                  {
                    id: "story_pov",
                    title: "Story/POV",
                    description: "Immersive Story POV Experience",
                    icon: <Eye className="h-5 w-5 text-[#38bdf8]" />
                  },
                  {
                    id: "split_screen",
                    title: "Split-Screen",
                    description: "Dual Camera Compiler & Split View",
                    icon: <Layers className="h-5 w-5 text-[#38bdf8]" />
                  },
                  {
                    id: "social_viral_cloner",
                    title: "Social Viral Cloner",
                    description: "Extract secret sauce & clone viral URL success",
                    icon: <Share2 className="h-5 w-5 text-emerald-400" />
                  },
                  {
                    id: "ecommerce",
                    title: "E-Commerce Ads Video",
                    description: "High-Converting Product Ads Studio",
                    icon: <ShoppingBag className="h-5 w-5 text-[#38bdf8]" />
                  },
                  {
                    id: "long_form_clips",
                    title: "Long-Form to Auto-Clips",
                    description: "Auto-Clips Cutter & Viral Extractor",
                    icon: <Zap className="h-5 w-5 text-[#38bdf8]" />
                  },
                  {
                    id: "custom",
                    title: "Custom Mode",
                    description: "Manual Retention Flow & Variable Control",
                    icon: <Sliders className="h-5 w-5 text-[#38bdf8]" />
                  }
                ].map((tool) => {
                  const isOpen = mobileAccordionOpen === tool.id;
                  return (
                    <div key={tool.id} className="w-full rounded-xl border border-white/10 bg-[#1A1A1E] overflow-hidden transition-all shadow-md">
                      <button
                        type="button"
                        onClick={() => {
                          setWorkspaceMode(tool.id);
                          window.location.hash = `#${tool.id}`;
                          setMobileAccordionOpen(isOpen ? null : tool.id);
                        }}
                        className={`w-full p-4 flex items-center justify-between transition-all cursor-pointer text-left border-none outline-none ${
                          isOpen 
                            ? "bg-[#38bdf8]/20 border-b border-[#38bdf8]/40 text-white shadow-[0_0_15px_rgba(56,189,248,0.2)]" 
                            : "bg-transparent text-slate-200 hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <div className={`p-2.5 rounded-lg transition-colors ${isOpen ? "bg-[#38bdf8] text-black" : "bg-white/5 text-[#38bdf8]"}`}>
                            {tool.icon}
                          </div>
                          <div>
                            <div className="text-sm font-black font-sans text-white tracking-wide">{tool.title}</div>
                            <div className="text-[11px] text-slate-400 font-sans mt-0.5">{tool.description}</div>
                          </div>
                        </div>
                        <div className={`p-1.5 rounded-full ${isOpen ? "bg-[#38bdf8]/20 text-[#38bdf8]" : "text-slate-400"}`}>
                          {isOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                        </div>
                      </button>

                      {/* Expanded Full-Width Accordion Workspace Container */}
                      {isOpen && (
                        <div className="mobile-accordion-workspace p-2 sm:p-4 bg-[#121212] border-t border-white/10 w-full overflow-x-hidden">
                          {renderWorkspaceContent(tool.id)}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SECTION 2: AUTOMATIONS */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 px-1">
                <Zap className="h-4 w-4 text-[#38bdf8]" />
                <span className="text-xs font-black font-sans text-white uppercase tracking-widest">
                  Automations
                </span>
              </div>

              <div className="space-y-2.5">
                {[
                  {
                    id: "analytics",
                    title: "Analytics",
                    description: "Performance, CTR & Heatmap Tracking",
                    icon: <BarChart3 className="h-5 w-5 text-[#38bdf8]" />
                  },
                  {
                    id: "scheduler",
                    title: "Scheduler",
                    description: "Bulk Campaign Multi-Channel Scheduler",
                    icon: <Calendar className="h-5 w-5 text-[#38bdf8]" />
                  },
                  {
                    id: "dm_automation",
                    title: "Facebook & Instagram DM Automation",
                    description: "Lead-Nurturing Auto-responder & Funnels",
                    icon: <Send className="h-5 w-5 text-[#38bdf8]" />
                  }
                ].map((tool) => {
                  const isOpen = mobileAccordionOpen === tool.id;
                  return (
                    <div key={tool.id} className="w-full rounded-xl border border-white/10 bg-[#1A1A1E] overflow-hidden transition-all shadow-md">
                      <button
                        type="button"
                        onClick={() => {
                          setWorkspaceMode(tool.id);
                          window.location.hash = `#${tool.id}`;
                          setMobileAccordionOpen(isOpen ? null : tool.id);
                        }}
                        className={`w-full p-4 flex items-center justify-between transition-all cursor-pointer text-left border-none outline-none ${
                          isOpen 
                            ? "bg-[#38bdf8]/20 border-b border-[#38bdf8]/40 text-white shadow-[0_0_15px_rgba(56,189,248,0.2)]" 
                            : "bg-transparent text-slate-200 hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <div className={`p-2.5 rounded-lg transition-colors ${isOpen ? "bg-[#38bdf8] text-black" : "bg-white/5 text-[#38bdf8]"}`}>
                            {tool.icon}
                          </div>
                          <div>
                            <div className="text-sm font-black font-sans text-white tracking-wide">{tool.title}</div>
                            <div className="text-[11px] text-slate-400 font-sans mt-0.5">{tool.description}</div>
                          </div>
                        </div>
                        <div className={`p-1.5 rounded-full ${isOpen ? "bg-[#38bdf8]/20 text-[#38bdf8]" : "text-slate-400"}`}>
                          {isOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                        </div>
                      </button>

                      {/* Expanded Full-Width Accordion Workspace Container */}
                      {isOpen && (
                        <div className="mobile-accordion-workspace p-2 sm:p-4 bg-[#121212] border-t border-white/10 w-full overflow-x-hidden">
                          {renderWorkspaceContent(tool.id)}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SECTION 3: ACCOUNT & BILLING */}
            <div className="space-y-3 pt-2 pb-6">
              <div className="flex items-center gap-2 px-1">
                <CreditCard className="h-4 w-4 text-[#38bdf8]" />
                <span className="text-xs font-black font-sans text-white uppercase tracking-widest">
                  Account & Billing
                </span>
              </div>

              <div className="w-full rounded-xl border border-white/10 bg-[#1A1A1E] overflow-hidden transition-all shadow-md">
                <button
                  type="button"
                  onClick={() => {
                    setWorkspaceMode("subscription");
                    window.location.hash = "#subscription";
                    setMobileAccordionOpen(mobileAccordionOpen === "subscription" ? null : "subscription");
                  }}
                  className={`w-full p-4 flex items-center justify-between transition-all cursor-pointer text-left border-none outline-none ${
                    mobileAccordionOpen === "subscription" 
                      ? "bg-[#38bdf8]/20 border-b border-[#38bdf8]/40 text-white shadow-[0_0_15px_rgba(56,189,248,0.2)]" 
                      : "bg-transparent text-slate-200 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`p-2.5 rounded-lg transition-colors ${mobileAccordionOpen === "subscription" ? "bg-[#38bdf8] text-black" : "bg-white/5 text-[#38bdf8]"}`}>
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-black font-sans text-white tracking-wide">Subscription & Billing</div>
                      <div className="text-[11px] text-slate-400 font-sans mt-0.5">Manage plan tier & account billing settings</div>
                    </div>
                  </div>
                  <div className={`p-1.5 rounded-full ${mobileAccordionOpen === "subscription" ? "bg-[#38bdf8]/20 text-[#38bdf8]" : "text-slate-400"}`}>
                    {mobileAccordionOpen === "subscription" ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                  </div>
                </button>

                {/* Expanded Full-Width Accordion Workspace Container */}
                {mobileAccordionOpen === "subscription" && (
                  <div className="mobile-accordion-workspace p-2 sm:p-4 bg-[#121212] border-t border-white/10 w-full overflow-x-hidden">
                    {renderWorkspaceContent("subscription")}
                  </div>
                )}
              </div>
            </div>

          </div>

        </main>
      )}


      {/* Auth Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative">
            {/* Close Button */}
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute -top-3 -right-3 z-50 p-1.5 text-slate-400 hover:text-white transition-colors rounded-full bg-neutral-900 border border-white/10 cursor-pointer shadow-lg focus:outline-none"
            >
              <X className="h-4 w-4" />
            </button>
            <AuthHandler 
              onSuccessRedirect={(path) => {
                if (path === "/dashboard") {
                  setCurrentView("dashboard");
                }
                setIsAuthModalOpen(false);
              }}
              onUserAuthenticated={(serialId) => {
                setActiveUserSerialId(serialId);
              }}
              onClose={() => setIsAuthModalOpen(false)}
            />
          </div>
        </div>
      )}



      {/* Affiliate Modal */}
      {isAffiliateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className={`relative w-full ${affiliateRole === "admin" ? "max-w-5xl" : "max-w-3xl"} bg-[#242424] border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar text-left font-sans transition-all duration-300`}>
            {/* Close Button */}
            <button
              onClick={() => setIsAffiliateOpen(false)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white transition-colors rounded-full hover:bg-white/5 cursor-pointer focus:outline-none bg-transparent border-none"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Role Switcher Tabs (For demo evaluation) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4 mb-6 gap-3">
              <div className="flex bg-neutral-900 p-1 rounded-lg border border-white/5 self-start">
                <button
                  onClick={() => setAffiliateRole("partner")}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all cursor-pointer focus:outline-none ${
                    affiliateRole === "partner"
                      ? "bg-[#38bdf8] text-[#000000]"
                      : "text-neutral-400 hover:text-white bg-transparent"
                  }`}
                >
                  Partner Portal
                </button>
                <button
                  onClick={() => setAffiliateRole("admin")}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all cursor-pointer focus:outline-none flex items-center gap-1.5 ${
                    affiliateRole === "admin"
                      ? "bg-amber-500 text-black font-extrabold"
                      : "text-neutral-400 hover:text-white bg-transparent"
                  }`}
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Owner Admin Dashboard
                </button>
              </div>
              <span className="text-[10px] font-mono text-neutral-500 tracking-wider">
                PORTAL_MODE: <span className={affiliateRole === "admin" ? "text-amber-500 font-bold" : "text-[#38bdf8] font-bold"}>
                  {affiliateRole === "admin" ? "ADMIN_SYS" : "PARTNER_SYS"}
                </span>
              </span>
            </div>

            {affiliateRole === "admin" ? (
              /* OWNER ADMIN DASHBOARD VIEW */
              <div className="space-y-6 animate-[fadeIn_0.15s_ease-out]">
                {/* Dashboard Header */}
                <div>
                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest text-amber-500 bg-amber-500/10 border border-amber-500/15 mb-2">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>SECURE_AFFILIATE_ADMIN</span>
                  </div>
                  <h2 className="text-xl font-black text-white uppercase tracking-tight">Affiliate Admin Dashboard</h2>
                  <p className="text-xs text-neutral-400 mt-0.5">Global commission system management, risk control auditing, and manual payout override panel.</p>
                </div>

                {/* Alerts & Notifications Panel (Milestone Tracking) */}
                {adminAffiliates.some(a => a.totalReferrals >= 50) && (
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex flex-col space-y-2.5">
                    <div className="flex items-center space-x-2 text-amber-500">
                      <Award className="h-4 w-4 animate-pulse" />
                      <span className="text-xs font-bold uppercase tracking-wider font-mono">High-Performance Milestones (Action Recommended)</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {adminAffiliates
                        .filter(a => a.totalReferrals >= 50)
                        .map(aff => (
                          <div key={aff.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-black/40 px-3 py-2 rounded border border-white/5 text-xs">
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-amber-500/20 text-amber-500 font-bold font-mono text-[10px]">
                                50+
                              </span>
                              <div>
                                <span className="text-white font-bold">{aff.name}</span>{" "}
                                <span className="text-neutral-400">({aff.email}) has reached</span>{" "}
                                <span className="text-amber-400 font-bold font-mono">{aff.totalReferrals} referrals</span>{" "}
                                <span className="text-neutral-500 font-mono">(${aff.totalEarnings.toFixed(2)} total earnings)</span>
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                setRecentToast({
                                  message: "VIP Outreach Drafted",
                                  sub: `A private outreach email has been drafted to ${aff.name} (${aff.email}) with VIP incentives.`
                                });
                              }}
                              className="text-[10px] bg-amber-500 text-black font-bold uppercase px-2.5 py-1 rounded hover:bg-amber-400 transition-colors cursor-pointer self-start sm:self-auto focus:outline-none border-none"
                            >
                              Personal Outreach
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Financial Overview (The Money) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Total Payouts Due */}
                  <div className="bg-white/[0.02] border border-white/5 p-5 rounded-xl flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-2 text-neutral-400 mb-2">
                        <Wallet className="h-4 w-4 text-emerald-400" />
                        <span className="text-xs font-bold uppercase tracking-wider font-mono">Total Payouts Due</span>
                      </div>
                      <div className="text-3xl font-black text-white font-mono">
                        ${adminAffiliates.reduce((sum, a) => a.payoutStatus === "Unpaid" && a.status !== "Suspended" ? sum + a.payoutsDue : sum, 0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                      </div>
                    </div>
                    <p className="text-[10px] text-neutral-500 mt-2 font-sans">
                      * Combined sum of commissions marked as "Unpaid" for approved partners.
                    </p>
                  </div>

                  {/* Monthly Revenue tracking vs total */}
                  <div className="bg-white/[0.02] border border-white/5 p-5 rounded-xl flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-2 text-neutral-400 mb-2">
                        <BarChart3 className="h-4 w-4 text-[#38bdf8]" />
                        <span className="text-xs font-bold uppercase tracking-wider font-mono">Monthly Affiliate Contribution</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-white font-mono">
                          ${(adminAffiliates.reduce((sum, a) => sum + (a.totalEarnings * 2), 0)).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </span>
                        <span className="text-xs font-bold text-slate-500">
                          / ${adminOverallPlatformRevenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} Platform Total
                        </span>
                      </div>
                    </div>
                    <p className="text-[10px] text-neutral-400 mt-2 font-mono">
                      Affiliate program generates <span className="text-[#38bdf8] font-bold">{((adminAffiliates.reduce((sum, a) => sum + (a.totalEarnings * 2), 0) / adminOverallPlatformRevenue) * 100).toFixed(1)}%</span> of total monthly subscription sales.
                    </p>
                  </div>
                </div>

                {/* Affiliate Management Filter & Table Controls */}
                <div className="space-y-4 pt-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <h3 className="text-sm font-black text-white uppercase tracking-wider font-mono flex items-center gap-2">
                      <Users className="h-4 w-4 text-[#38bdf8]" />
                      Registered Partners ({filteredAffiliates.length})
                    </h3>
                    
                    {/* Search & Status Filters */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-neutral-500" />
                        <input
                          type="text"
                          placeholder="Search name or email..."
                          value={adminSearchQuery}
                          onChange={(e) => setAdminSearchQuery(e.target.value)}
                          className="pl-8 pr-3 py-1.5 w-full sm:w-48 bg-neutral-900 border border-white/10 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#38bdf8] transition-colors"
                        />
                      </div>
                      
                      <select
                        value={adminStatusFilter}
                        onChange={(e: any) => setAdminStatusFilter(e.target.value)}
                        className="bg-neutral-900 border border-white/10 rounded-lg text-xs text-white px-2.5 py-1.5 focus:outline-none focus:border-[#38bdf8] transition-colors cursor-pointer"
                      >
                        <option value="All">All Statuses</option>
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                        <option value="Suspended">Suspended</option>
                      </select>
                    </div>
                  </div>

                  {/* High Quality Affiliate Table */}
                  <div className="border border-white/5 rounded-xl overflow-hidden bg-black/20 overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-white/5 bg-white/[0.02] text-neutral-400 font-mono text-[10px] uppercase tracking-wider">
                          <th className="p-3">Partner Details</th>
                          <th className="p-3">Signup Date</th>
                          <th className="p-3 text-right">Referrals</th>
                          <th className="p-3 text-right font-mono">Commission</th>
                          <th className="p-3 text-right">Payouts Due / Action</th>
                          <th className="p-3 text-center">Status</th>
                          <th className="p-3 text-right">Action Controls</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredAffiliates.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="p-8 text-center text-neutral-500 font-sans">
                              No affiliate records match your query or filters.
                            </td>
                          </tr>
                        ) : (
                          filteredAffiliates.map((aff) => (
                            <tr key={aff.id} className="hover:bg-white/[0.01] transition-colors">
                              <td className="p-3">
                                <div className="font-bold text-white flex items-center gap-1.5">
                                  {aff.name}
                                  {aff.totalReferrals >= 50 && (
                                    <span className="inline-block px-1.5 py-0.5 text-[8px] font-black uppercase text-amber-500 bg-amber-500/10 rounded border border-amber-500/20">
                                      VIP
                                    </span>
                                  )}
                                </div>
                                <div className="text-[10px] text-neutral-400 font-mono mt-0.5">{aff.email}</div>
                                <div className="text-[10px] text-neutral-500 font-mono mt-0.5 flex items-center gap-1">
                                  <span>Source:</span>
                                  <span className="text-emerald-500">{aff.trafficSource}</span>
                                </div>
                              </td>
                              <td className="p-3 text-neutral-400 font-mono">{aff.signupDate}</td>
                              <td className="p-3 text-right font-mono font-bold text-white text-[13px]">{aff.totalReferrals}</td>
                              <td className="p-3 text-right font-mono text-white text-[13px]">${aff.totalEarnings.toFixed(2)}</td>
                              <td className="p-3 text-right">
                                {aff.payoutsDue > 0 && aff.payoutStatus === "Unpaid" ? (
                                  <div className="flex flex-col items-end">
                                    <span className="text-amber-500 font-bold font-mono text-[13px]">${aff.payoutsDue.toFixed(2)} Due</span>
                                    <button
                                      disabled={aff.status === "Suspended"}
                                      onClick={() => handleTriggerPayout(aff.id)}
                                      style={{ backgroundColor: aff.status === "Suspended" ? "transparent" : "#10B981" }}
                                      className={`text-[9px] text-black font-extrabold uppercase px-2 py-1 rounded mt-1.5 transition-colors cursor-pointer border-none focus:outline-none ${
                                        aff.status === "Suspended"
                                          ? "text-neutral-600 bg-neutral-900 border border-white/5 cursor-not-allowed"
                                          : "hover:bg-emerald-400 text-black font-black"
                                      }`}
                                    >
                                      Mark as Paid
                                    </button>
                                  </div>
                                ) : (
                                  <span className="text-emerald-400 font-mono font-bold flex items-center justify-end gap-1">
                                    <CheckCircle2 className="h-3 w-3" /> Fully Paid
                                  </span>
                                )}
                              </td>
                              <td className="p-3 text-center">
                                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                  aff.status === "Active"
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/15"
                                    : aff.status === "Pending"
                                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/15"
                                    : "bg-rose-500/10 text-rose-400 border border-rose-500/15"
                                }`}>
                                  {aff.status}
                                </span>
                              </td>
                              <td className="p-3 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  {aff.status === "Pending" && (
                                    <button
                                      onClick={() => handleUpdateStatus(aff.id, "Active")}
                                      className="text-[10px] bg-emerald-500 text-black font-bold uppercase px-2 py-1 rounded hover:bg-emerald-400 transition-colors cursor-pointer focus:outline-none border-none"
                                    >
                                      Approve
                                    </button>
                                  )}
                                  {aff.status === "Active" ? (
                                    <button
                                      onClick={() => handleUpdateStatus(aff.id, "Suspended")}
                                      className="text-[10px] bg-rose-950/40 text-rose-400 border border-rose-800/30 font-bold uppercase px-2 py-1 rounded hover:bg-rose-900/30 transition-colors cursor-pointer focus:outline-none"
                                    >
                                      Suspend
                                    </button>
                                  ) : (
                                    aff.status === "Suspended" && (
                                      <button
                                        onClick={() => handleUpdateStatus(aff.id, "Active")}
                                        className="text-[10px] bg-emerald-950/40 text-emerald-400 border border-emerald-800/30 font-bold uppercase px-2 py-1 rounded hover:bg-emerald-900/30 transition-colors cursor-pointer focus:outline-none"
                                      >
                                        Reactivate
                                      </button>
                                    )
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Section 4-B: Complete Financial Transparency Ledger */}
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-black text-white uppercase tracking-wider font-mono flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-emerald-400" />
                        Complete Financial Transparency Ledger
                      </h3>
                      <p className="text-[10px] text-neutral-400 mt-0.5">Real-time payment split verification logs synced with the Whop API listener.</p>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-500 font-bold bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/15">
                      ✓ Auto-Calculating 50% commission split active
                    </span>
                  </div>

                  <div className="border border-white/5 rounded-xl overflow-hidden bg-black/20 overflow-x-auto">
                    <table className="w-full text-left border-collapse text-[11px] font-sans">
                      <thead>
                        <tr className="border-b border-white/5 bg-white/[0.02] text-neutral-400 font-mono text-[10px] uppercase tracking-wider">
                          <th className="p-3">Transaction Date</th>
                          <th className="p-3">Customer Email</th>
                          <th className="p-3">Affiliate Partner</th>
                          <th className="p-3">User Source</th>
                          <th className="p-3 text-right">Gross Revenue</th>
                          <th className="p-3 text-right">Net Profit</th>
                          <th className="p-3 text-right text-emerald-400">Commission split</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 font-mono">
                        {referralsList.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="p-6 text-center text-neutral-500 font-sans text-xs">
                              No financial referral transaction logs present.
                            </td>
                          </tr>
                        ) : (
                          referralsList.slice(0, 15).map((ref) => {
                            const partner = affiliatesList.find(a => a.id === ref.affiliateId);
                            const grossRev = ref.revenue || 0.00;
                            const comm = ref.commission || (grossRev * 0.5);
                            const netProf = ref.netProfit || (grossRev - comm);
                            const src = ref.userSource || partner?.trafficSource || "Direct Web Referral";
                            
                            return (
                              <tr key={ref.id} className="hover:bg-white/[0.01] transition-colors">
                                <td className="p-3 text-neutral-400">
                                  {new Date(ref.createdAt).toLocaleString(undefined, {
                                    year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit'
                                  })}
                                </td>
                                <td className="p-3 text-white font-sans font-medium">{ref.customerEmail}</td>
                                <td className="p-3 text-[#38bdf8] font-sans">{partner ? partner.name : `ID: ${ref.affiliateId}`}</td>
                                <td className="p-3 text-neutral-400 font-sans">{src}</td>
                                <td className="p-3 text-right text-white font-bold">${grossRev.toFixed(2)}</td>
                                <td className="p-3 text-right text-neutral-300">${netProf.toFixed(2)}</td>
                                <td className="p-3 text-right text-emerald-400 font-bold">
                                  50% (${comm.toFixed(2)})
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                  {referralsList.length > 15 && (
                    <p className="text-[9px] text-neutral-500 text-center font-sans">
                      Showing latest 15 transactions. Total transactions in database: {referralsList.length}.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              /* PARTNER VIEW (Original flow) */
              !hasRegisteredAffiliate ? (
              /* ONBOARDING FLOW STEPS */
              affiliateOnboardingStep === "pitch" ? (
                /* 1. HERO PITCH STEP */
                <div className="space-y-8 animate-[fadeIn_0.15s_ease-out]">
                  {/* Hero */}
                  <div className="text-center max-w-2xl mx-auto space-y-4">
                    <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#38bdf8] bg-[#38bdf8]/10 border border-[#38bdf8]/15">
                      <Percent className="h-3 w-3" />
                      <span>Affiliate Partnership</span>
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight leading-tight">
                      Partner with ControlVid.ai:<br />
                      <span style={{ color: "#38bdf8" }}>Earn 50% Lifetime Commission.</span>
                    </h2>
                    <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                      The most aggressive affiliate program in the AI video space. Earn 50% on every subscription—recurring monthly or upfront annual—with zero caps.
                    </p>
                  </div>

                  {/* Profit Advantage */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 border-b border-white/5 pb-2">
                      <DollarSign className="h-5 w-5 text-[#38bdf8]" />
                      <h3 className="text-sm font-black text-white uppercase tracking-wider font-mono">The Profit Advantage</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-[#38bdf8]/10 flex items-center justify-center text-[#38bdf8] mb-3">
                          <RotateCw className="h-4 w-4" />
                        </div>
                        <h4 className="text-sm font-bold text-white mb-1.5">50% Recurring Revenue</h4>
                        <p className="text-xs text-neutral-400 leading-relaxed">
                          Earn every month as long as your referred users remain active.
                        </p>
                      </div>

                      <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-[#38bdf8]/10 flex items-center justify-center text-[#38bdf8] mb-3">
                          <Sparkles className="h-4 w-4" />
                        </div>
                        <h4 className="text-sm font-bold text-white mb-1.5">Upfront Annual Payouts</h4>
                        <p className="text-xs text-neutral-400 leading-relaxed">
                          Close an annual plan and collect your 50% share immediately.
                        </p>
                      </div>

                      <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-[#38bdf8]/10 flex items-center justify-center text-[#38bdf8] mb-3">
                          <TrendingUp className="h-4 w-4" />
                        </div>
                        <h4 className="text-sm font-bold text-white mb-1.5">High-Conversion Funnel</h4>
                        <p className="text-xs text-neutral-400 leading-relaxed">
                          Our landing page is optimized for one-click signups, maximizing your referral conversions.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* How it Works Section (Expandable Guide) */}
                  {affiliateHowItWorksOpen && (
                    <div className="p-6 rounded-xl bg-[#141419] border border-white/10 space-y-4 animate-[fadeIn_0.2s_ease-out]">
                      <h4 className="text-xs font-mono font-bold text-[#38bdf8] uppercase tracking-widest">3-Step Partner Blueprint</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-neutral-400 leading-relaxed">
                        <div>
                          <span className="block text-white font-bold text-sm mb-1">01. Generate URL</span>
                          Activate your partnership and generate your unique tracking links instantly in one click.
                        </div>
                        <div>
                          <span className="block text-white font-bold text-sm mb-1">02. Share & Promote</span>
                          Recommend ControlVid.ai inside newsletters, YouTube descriptions, short form clips, or courses.
                        </div>
                        <div>
                          <span className="block text-white font-bold text-sm mb-1">03. Withdraw 50%</span>
                          Collect automated payouts to PayPal, Stripe, or Wise on the 1st of every month.
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Call to Action */}
                  <div className="flex flex-col items-center justify-center space-y-4 pt-4 border-t border-white/5">
                    <button
                      onClick={() => setAffiliateOnboardingStep("register")}
                      style={{ background: "linear-gradient(135deg, #38bdf8, #FFFFFF)", color: "#020617", boxShadow: "0 0 15px rgba(56, 189, 248, 0.5)" }}
                      className="w-full sm:w-auto px-10 py-4 text-sm font-bold uppercase tracking-wider rounded-xl hover:bg-[#38bdf8]/85 hover:scale-102 transition-all cursor-pointer text-center shadow-lg shadow-[#38bdf8]/15 font-sans"
                    >
                      Start Earning Now
                    </button>
                    <button
                      onClick={() => setAffiliateHowItWorksOpen(!affiliateHowItWorksOpen)}
                      className="text-xs font-semibold text-neutral-400 hover:text-white transition-colors cursor-pointer bg-transparent border-none focus:outline-none"
                    >
                      {affiliateHowItWorksOpen ? "Hide how it works" : "How it works →"}
                    </button>
                  </div>

                  {/* Trust Signals */}
                  <div className="pt-4 border-t border-white/5 space-y-3">
                    <div className="flex items-center space-x-2 text-xs text-neutral-400">
                      <ShieldCheck className="h-4 w-4 text-[#38bdf8] shrink-0" />
                      <span><strong className="text-white">Payout Transparency:</strong> Reliable, transparent, and prompt monthly payouts.</span>
                    </div>
                    <div className="p-4 rounded-lg bg-white/[0.01] border border-white/5 text-[11px] text-neutral-500 leading-normal">
                      <strong className="text-neutral-400 block mb-1">Partnership Terms Snapshot:</strong>
                      Commission cookies remain active for 60 days. Self-referrals are strictly forbidden. Payouts are generated monthly with a minimum threshold of $50.00.
                    </div>
                  </div>
                </div>
              ) : affiliateOnboardingStep === "register" ? (
                /* 2. REGISTRATION FORM STEP */
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!affiliateName || !affiliateEmail) return;
                    setAffiliateOnboardingStep("risk_check");
                  }}
                  className="space-y-6 animate-[fadeIn_0.15s_ease-out]"
                >
                  <div className="border-b border-white/5 pb-4">
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">Onboarding & Registration</h3>
                    <p className="text-xs text-neutral-400 mt-1">Activate your 50% commission account in seconds. Instant approval engine active.</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400 mb-1.5">Full Name / Creator Name</label>
                      <input 
                        type="text" 
                        required
                        value={affiliateName}
                        onChange={(e) => setAffiliateName(e.target.value)}
                        placeholder="e.g. Alex Rivera"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#38bdf8]/50 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400 mb-1.5">Business / Partner Email</label>
                      <input 
                        type="email" 
                        required
                        value={affiliateEmail}
                        onChange={(e) => setAffiliateEmail(e.target.value)}
                        placeholder="e.g. noamazar84@gmail.com"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#38bdf8]/50 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400 mb-1.5">Primary Traffic Channel / Audience Source</label>
                      <select
                        value={affiliateTrafficSource}
                        onChange={(e) => setAffiliateTrafficSource(e.target.value)}
                        className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#38bdf8]/50 transition-colors"
                      >
                        <option value="TikTok Shorts / Reels Channel">TikTok Shorts / Reels Channel</option>
                        <option value="Tech Newsletter / Blog">Tech Newsletter / Blog</option>
                        <option value="YouTube Long Form Content">YouTube Long Form Content</option>
                        <option value="Online Course / Discord Group">Online Course / Discord Group</option>
                        <option value="Other / Personal Recommendation">Other / Personal Recommendation</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-[#38bdf8]/5 border border-[#38bdf8]/10 text-xs text-neutral-300 leading-normal flex gap-2.5">
                    <ShieldCheck className="h-5 w-5 text-[#38bdf8] shrink-0 mt-0.5" />
                    <p>
                      <strong>Automatic Welcome Kit:</strong> Upon registration, our automated outreach integration dispatches a Welcome Bundle including custom copy templates, visual creatives, and instructions directly to your email.
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    <button
                      type="button"
                      onClick={() => setAffiliateOnboardingStep("pitch")}
                      className="text-xs font-semibold text-neutral-400 hover:text-white transition-colors cursor-pointer bg-transparent border-none focus:outline-none"
                    >
                      ← Back to Benefits
                    </button>
                    <button
                      type="submit"
                      style={{ background: "linear-gradient(135deg, #38bdf8, #FFFFFF)", color: "#020617", boxShadow: "0 0 15px rgba(56, 189, 248, 0.5)" }}
                      className="px-6 py-3 text-xs font-bold uppercase tracking-widest rounded-lg transition-all hover:bg-[#38bdf8]/85 cursor-pointer font-sans border-none focus:outline-none"
                    >
                      Activate My Partnership
                    </button>
                  </div>
                </form>
              ) : affiliateOnboardingStep === "risk_check" ? (
                /* 3. SIMULATED RISK ASSESSMENT */
                <div className="space-y-6 py-8 text-center animate-[fadeIn_0.15s_ease-out]">
                  <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                    <div className="absolute inset-0 border-2 border-[#38bdf8]/20 rounded-full" />
                    <div className="absolute inset-0 border-2 border-t-[#38bdf8] rounded-full animate-spin" />
                    <ShieldCheck className="h-8 w-8 text-[#38bdf8] animate-pulse" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-white uppercase tracking-tight">Assessing Channel Compliance</h3>
                    <p className="text-xs text-neutral-400 max-w-sm mx-auto">Evaluating partnership criteria and calculating automated brand risk scoring index...</p>
                  </div>

                  {/* Pseudo terminal log output */}
                  <div className="w-full bg-black/60 border border-white/5 rounded-xl p-4 font-mono text-[10px] text-neutral-400 text-left space-y-1 max-w-md mx-auto">
                    <div className="text-neutral-500">[INFO] Triggering compliance audit loop...</div>
                    <div className="text-neutral-300">✓ Traffic: {affiliateTrafficSource}</div>
                    <div className="text-neutral-300">✓ Security Signature: Verified (Clear)</div>
                    <div className="text-emerald-400">✓ Risk Score: 12/100 (Safe / Low Risk Profile)</div>
                    <div className="text-[#38bdf8] animate-pulse">⚙ Generating custom referral link hash...</div>
                  </div>
                </div>
              ) : (
                /* 4. ONBOARDING EMAIL DISPATCH SUCCESS */
                <div className="space-y-6 animate-[fadeIn_0.15s_ease-out]">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto">
                      <Mail className="h-6 w-6 animate-bounce" />
                    </div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">Partnership Approved!</h3>
                    <p className="text-xs text-neutral-400 max-w-md mx-auto">
                      We have synchronized with our email automation integration and dispatched your Partner Welcome Bundle to <strong className="text-white font-mono">{affiliateEmail}</strong>.
                    </p>
                  </div>

                  {/* Mailbox Simulator */}
                  <div className="bg-[#121216] border border-white/10 rounded-xl overflow-hidden shadow-xl text-left">
                    <div className="bg-white/[0.02] border-b border-white/5 px-4 py-3 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                        <span className="pl-2 text-neutral-500">Inbox Outbox Sim v1.0</span>
                      </div>
                      <span className="bg-emerald-500/10 text-emerald-400 text-[9px] px-1.5 py-0.5 rounded font-bold">AUTOMATION DISPATCHED</span>
                    </div>

                    <div className="p-5 space-y-4">
                      <div className="space-y-1.5 text-xs border-b border-white/5 pb-3">
                        <div><span className="text-neutral-500 font-mono">From:</span> partnership@controlvid.ai</div>
                        <div><span className="text-neutral-500 font-mono">To:</span> {affiliateEmail}</div>
                        <div><span className="text-neutral-500 font-mono">Subject:</span> Welcome to the ControlVid.ai Affiliate Family! 🚀</div>
                      </div>

                      <div className="space-y-3 text-xs text-neutral-300 leading-relaxed max-h-[220px] overflow-y-auto pr-2 custom-scrollbar animate-[fadeIn_0.15s_ease-out]">
                        <p>Hey {affiliateName},</p>
                        
                        <p>Welcome on board! Your affiliate application has been <strong>instantly approved</strong> by our safety gateway.</p>

                        <div className="p-3 bg-neutral-900 border border-white/5 rounded-lg font-mono text-[11px] space-y-1">
                          <div className="text-[#38bdf8] font-bold">🔗 YOUR UNIQUE REFERRAL LINK:</div>
                          <div className="text-white select-all select-text font-semibold break-all">
                            https://controlvid.ai/?aff=partner_{affiliateName.toLowerCase().replace(/\s+/g, '') || "id"}
                          </div>
                        </div>

                        <div className="space-y-1.5 pt-2">
                          <div className="font-bold text-[#38bdf8] uppercase tracking-wider font-mono text-[10px]">💡 QUICK START GUIDE (3 Conversion Tips):</div>
                          <ul className="space-y-2 list-none pl-0">
                            <li className="flex items-start gap-2">
                              <span className="text-[#38bdf8] font-bold font-mono">01.</span>
                              <div><strong>Hook with Controversial Scripts:</strong> Place your unique referral link inside comments on posts showing ControlVid script results.</div>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-[#38bdf8] font-bold font-mono">02.</span>
                              <div><strong>Highlight Automated Speed:</strong> Remind creators that ControlVid creates optimized, platform-safe retention scripts in under 2 minutes.</div>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-[#38bdf8] font-bold font-mono">03.</span>
                              <div><strong>Utilize Bios Constantly:</strong> Keep your link visible at the top of your Linktree or TikTok bio for steady passive clicks.</div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center pt-4">
                    <button
                      onClick={async () => {
                        try {
                          const { createAffiliate } = await import("./lib/firebase");
                          await createAffiliate(affiliateName || "Test User", affiliateEmail || "test@controlvid.ai", affiliateTrafficSource);
                          await loadAffiliatesAndReferrals();
                        } catch (err) {
                          console.error("Failed to write affiliate registration to database:", err);
                        }
                        setIsAffiliateRegistered(true);
                        // Add initial log
                        setWebhookLogs([
                          {
                            id: `web_log_init`,
                            timestamp: new Date().toLocaleTimeString(),
                            event: "affiliate.registered",
                            payload: JSON.stringify({
                              event: "affiliate.registered",
                              timestamp: new Date().toISOString(),
                              affiliate: {
                                name: affiliateName,
                                email: affiliateEmail,
                                source: affiliateTrafficSource,
                                risk_score: 12
                              },
                              welcome_email: {
                                status: "Dispatched",
                                template: "onboarding_welcome_v1",
                                trigger_id: "trg_outreach_" + Math.random().toString(36).substr(2, 9)
                              }
                            }, null, 2),
                            status: 200
                          }
                        ]);
                      }}
                      style={{ background: "linear-gradient(135deg, #38bdf8, #FFFFFF)", color: "#020617", boxShadow: "0 0 15px rgba(56, 189, 248, 0.5)" }}
                      className="w-full sm:w-auto px-10 py-4 text-sm font-bold uppercase tracking-wider rounded-xl hover:bg-[#38bdf8]/85 hover:scale-102 transition-all cursor-pointer font-sans shadow-lg shadow-[#38bdf8]/15 border-none focus:outline-none text-center"
                    >
                      Enter Partner Dashboard
                    </button>
                  </div>
                </div>
              )
            ) : (
              /* ACTIVE DASHBOARD VIEW (The 'Pro' Interface) */
              <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-4">
                  <div>
                    <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest text-[#38bdf8] bg-[#38bdf8]/10 border border-[#38bdf8]/15 mb-2">
                      <LayoutDashboard className="h-3.5 w-3.5" />
                      <span>PRO_PARTNER_PORTAL</span>
                    </div>
                    <h2 className="text-xl font-black text-white uppercase tracking-tight">Partner Dashboard</h2>
                    <p className="text-xs text-neutral-400 mt-0.5">Welcome back, {affiliateName || "Partner"} ({affiliateEmail || "partner@controlvid.ai"})</p>
                  </div>

                  <button
                    onClick={() => {
                      setIsAffiliateRegistered(false);
                      setAffiliateOnboardingStep("pitch");
                      setAffiliatePayoutRequested(false);
                      setAffiliatePaymentSaved(false);
                      setAffiliatePaymentMethod("");
                      setAffiliatePaymentDetail("");
                      setAffiliateTrafficVolume("normal");
                      setAffiliateRiskScore(12);
                    }}
                    className="text-[10px] font-mono font-bold uppercase px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-400 hover:text-white transition-colors self-start sm:self-center cursor-pointer focus:outline-none border-none"
                  >
                    Reset Demo
                  </button>
                </div>

                {/* TAB SELECTOR */}
                <div className="flex border-b border-white/5 gap-1.5 pb-px overflow-x-auto scrollbar-none">
                  <button
                    onClick={() => setAffiliateDashboardTab("overview")}
                    className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap focus:outline-none bg-transparent ${
                      affiliateDashboardTab === "overview"
                        ? "border-[#38bdf8] text-[#38bdf8]"
                        : "border-transparent text-neutral-400 hover:text-white"
                    }`}
                  >
                    Overview & Performance
                  </button>
                  <button
                    onClick={() => setAffiliateDashboardTab("payment")}
                    className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap focus:outline-none bg-transparent ${
                      affiliateDashboardTab === "payment"
                        ? "border-[#38bdf8] text-[#38bdf8]"
                        : "border-transparent text-neutral-400 hover:text-white"
                    }`}
                  >
                    Payment Settings
                  </button>
                  <button
                    onClick={() => setAffiliateDashboardTab("webhooks")}
                    className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap focus:outline-none bg-transparent ${
                      affiliateDashboardTab === "webhooks"
                        ? "border-[#38bdf8] text-[#38bdf8]"
                        : "border-transparent text-neutral-400 hover:text-white"
                    }`}
                  >
                    Milestone Webhooks
                  </button>
                  <button
                    onClick={() => setAffiliateDashboardTab("email")}
                    className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap focus:outline-none bg-transparent ${
                      affiliateDashboardTab === "email"
                        ? "border-[#38bdf8] text-[#38bdf8]"
                        : "border-transparent text-neutral-400 hover:text-white"
                    }`}
                  >
                    Welcome Kit
                  </button>
                </div>

                {/* TAB CONTENT: OVERVIEW */}
                {affiliateDashboardTab === "overview" && (
                  <div className="space-y-6 animate-[fadeIn_0.15s_ease-out]">
                    {/* RISK ALERT BANNER */}
                    {affiliateTrafficVolume === "high" && (
                      <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/10 text-red-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-pulse">
                        <div className="flex items-start gap-2.5">
                          <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                          <div>
                            <strong className="block text-white font-bold uppercase tracking-wide">⚠️ Risk Alert: Traffic Anomalies Flagged</strong>
                            Abnormal click-frequency spike detected. Withdrawal requests and URL updates have been temporarily restricted to protect platform integrity.
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setAffiliateTrafficVolume("normal");
                            setAffiliateRiskScore(15);
                            setAffiliateTrafficVerified(true);
                            setRecentToast({
                              message: "🛡️ Compliance Cleared",
                              sub: "Manual explanation approved. Security flag resolved."
                            });
                          }}
                          className="px-3.5 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold uppercase text-[10px] tracking-widest rounded transition-colors shrink-0 focus:outline-none border-none cursor-pointer"
                        >
                          Verify Traffic Source
                        </button>
                      </div>
                    )}

                    {affiliateTrafficVerified && affiliateTrafficVolume === "normal" && (
                      <div className="p-3.5 rounded-lg border border-emerald-950 bg-emerald-950/20 text-emerald-400 text-xs flex gap-2">
                        <CheckCircle className="h-4.5 w-4.5 shrink-0" />
                        <div>
                          <strong>Compliance Verified:</strong> Thank you for validating your channel. Your Traffic Explanation ("Tech Newsletter blast") has been approved. Risk cleared.
                        </div>
                      </div>
                    )}

                    {/* STATS + RISK LEVEL */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Left: General Info & Risk */}
                      <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-3 md:col-span-1">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400 block">Security Gate Status</span>
                        
                        <div className="flex items-center justify-between border-b border-white/5 pb-2">
                          <span className="text-xs text-neutral-400">Account status</span>
                          <span className="text-xs font-bold text-emerald-400">Instant Approved</span>
                        </div>

                        <div className="flex items-center justify-between border-b border-white/5 pb-2">
                          <span className="text-xs text-neutral-400">Compliance score</span>
                          <span className={`text-xs font-mono font-bold ${affiliateTrafficVolume === "high" ? "text-red-500" : "text-emerald-400"}`}>
                            {100 - affiliateRiskScore}/100
                          </span>
                        </div>

                        <div className="flex items-center justify-between pb-1">
                          <span className="text-xs text-neutral-400">Traffic Risk rating</span>
                          <span className={`text-xs font-bold uppercase tracking-wider ${affiliateTrafficVolume === "high" ? "text-red-500" : "text-emerald-400"}`}>
                            {affiliateTrafficVolume === "high" ? "🚨 Critical Risk" : "✓ Low Risk"}
                          </span>
                        </div>
                      </div>

                      {/* Right: Metrics */}
                      <div className="grid grid-cols-2 gap-4 md:col-span-2">
                        <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 text-center flex flex-col justify-center">
                          <span className="block text-[10px] font-mono text-neutral-500 uppercase">Total clicks</span>
                          <span className="block text-xl font-bold text-white mt-1">{affiliateClicksCount}</span>
                        </div>
                        <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 text-center flex flex-col justify-center">
                          <span className="block text-[10px] font-mono text-neutral-500 uppercase">Referral Sales</span>
                          <span className="block text-xl font-bold text-[#38bdf8] mt-1">{partnerSalesCount}</span>
                        </div>
                        <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 text-center flex flex-col justify-center">
                          <span className="block text-[10px] font-mono text-neutral-500 uppercase">Conversion Rate</span>
                          <span className="block text-xl font-bold text-white mt-1">
                            {((partnerSalesCount / affiliateClicksCount) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 text-center flex flex-col justify-center">
                          <span className="block text-[10px] font-mono text-neutral-500 uppercase">Total revenue (50%)</span>
                          <span className="block text-xl font-bold text-emerald-400 mt-1">${partnerRevenue.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* UNIQUE URL SECTION */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">Your Referral URL</span>
                        <span className="text-[10px] font-mono text-[#38bdf8]">50% Commission Tracker Live</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-[#121215] border border-white/10 rounded-lg px-4 py-3 text-sm text-neutral-300 font-mono truncate select-all">
                          https://controlvid.ai/?aff=partner_{affiliateName.toLowerCase().replace(/\s+/g, '') || "id"}
                        </div>
                        <button
                          onClick={() => {
                            if (affiliateTrafficVolume === "high") {
                              setRecentToast({
                                message: "⚠️ Clipboard Locked",
                                sub: "Resolve traffic flag to copy referral tracking links."
                              });
                              return;
                            }
                            navigator.clipboard.writeText(`https://controlvid.ai/?aff=partner_${affiliateName.toLowerCase().replace(/\s+/g, '') || "id"}`);
                            setAffiliateLinkCopied(true);
                            setTimeout(() => setAffiliateLinkCopied(false), 2000);
                          }}
                          style={{
                            backgroundColor: affiliateLinkCopied ? "#22C55E" : affiliateTrafficVolume === "high" ? "rgba(255,255,255,0.05)" : "#38bdf8",
                            color: affiliateLinkCopied ? "#FFFFFF" : affiliateTrafficVolume === "high" ? "#6B7280" : "#000000"
                          }}
                          disabled={affiliateTrafficVolume === "high"}
                          className="px-4 py-3.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center space-x-1.5 shrink-0 focus:outline-none border-none disabled:cursor-not-allowed"
                        >
                          {affiliateLinkCopied ? (
                            <>
                              <Check className="h-3.5 w-3.5 stroke-[3]" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              <span>Copy Link</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* INTEGRATION SANDBOX SIMULATORS */}
                    <div className="p-5 rounded-xl border border-white/10 bg-white/[0.01] space-y-4">
                      <div>
                        <h4 className="text-xs font-mono font-bold text-[#38bdf8] uppercase tracking-wider flex items-center gap-1.5">
                          <Terminal className="h-4 w-4" />
                          Interactive Partner Sandboxes
                        </h4>
                        <p className="text-[11px] text-neutral-400 mt-1">Simulate real-world traffic to test Webhook Triggers, Risk Safety scoring, and Automated Onboarding.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <button
                          onClick={() => {
                            const prevSales = affiliateSalesCount;
                            const nextSales = affiliateSalesCount + 1;
                            const nextClicks = affiliateClicksCount + Math.floor(Math.random() * 5) + 2;
                            const nextRevenue = affiliateRevenue + 47.50;

                            setAffiliateSalesCount(nextSales);
                            setAffiliateClicksCount(nextClicks);
                            setAffiliateRevenue(nextRevenue);

                            setRecentToast({
                              message: "🎉 Referral Sale Completed!",
                              sub: `Commission of $47.50 added. Total Sales: ${nextSales}`
                            });

                            const checkMilestones = (p: number, n: number) => {
                              if (p < 10 && n >= 10) return { tier: "Bronze", count: 10 };
                              if (p < 50 && n >= 50) return { tier: "Silver", count: 50 };
                              if (p < 100 && n >= 100) return { tier: "Gold", count: 100 };
                              return null;
                            };

                            const crossed = checkMilestones(prevSales, nextSales);
                            if (crossed) {
                              setRecentToast({
                                message: "🚀 Webhook Dispatched!",
                                sub: `Milestone Crossed: ${crossed.count} sales. Slack/Discord notified.`
                              });

                              const newLog = {
                                id: `web_log_${Date.now()}`,
                                timestamp: new Date().toLocaleTimeString(),
                                event: "affiliate.milestone_reached",
                                payload: JSON.stringify({
                                  event: "affiliate.milestone_reached",
                                  timestamp: new Date().toISOString(),
                                  affiliate: {
                                    id: `aff_` + (affiliateName.toLowerCase().replace(/\s+/g, '') || "partner2026"),
                                    name: affiliateName || "Partner",
                                    email: affiliateEmail || "partner@controlvid.ai"
                                  },
                                  metrics: {
                                    clicks: nextClicks,
                                    sales: nextSales,
                                    revenue: `$${nextRevenue.toFixed(2)}`
                                  },
                                  milestone: {
                                    tier: crossed.tier,
                                    sales_threshold: crossed.count,
                                    bonus_incentive: crossed.tier === "Bronze" ? "$50.00 Boost" : crossed.tier === "Silver" ? "$250.00 Boost" : "$1,000.00 Match"
                                  },
                                  webhook_delivery: {
                                    slack_channel: "#affiliate-alerts",
                                    discord_status: "200 OK",
                                    latency_ms: 120
                                  }
                                }, null, 2),
                                status: 200
                              };
                              setWebhookLogs(prev => [newLog, ...prev]);
                            }
                          }}
                          className="px-4 py-3 bg-neutral-900 hover:bg-neutral-800 border border-white/10 rounded-lg text-xs font-bold text-white flex items-center justify-center space-x-2 cursor-pointer transition-colors focus:outline-none"
                        >
                          <Sparkles className="h-4 w-4 text-[#38bdf8]" />
                          <span>Simulate Referral Sale (+1)</span>
                        </button>

                        <button
                          onClick={() => {
                            setAffiliateTrafficVolume("high");
                            setAffiliateRiskScore(94);
                            setAffiliateClicksCount(prev => prev + 500);
                            setRecentToast({
                              message: "⚠️ Anomalous Spike Generated",
                              sub: "High-volume bot traffic triggered. Risk engine active."
                            });
                          }}
                          className="px-4 py-3 bg-neutral-900 hover:bg-neutral-800 border border-white/10 rounded-lg text-xs font-bold text-white flex items-center justify-center space-x-2 cursor-pointer transition-colors focus:outline-none"
                        >
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          <span>Simulate High-Volume Bots</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <button
                          onClick={() => {
                            const prevSales = affiliateSalesCount;
                            const nextSales = affiliateSalesCount + 10;
                            const nextClicks = affiliateClicksCount + 55;
                            const nextRevenue = affiliateRevenue + 475.00;

                            setAffiliateSalesCount(nextSales);
                            setAffiliateClicksCount(nextClicks);
                            setAffiliateRevenue(nextRevenue);

                            setRecentToast({
                              message: "🎉 Bulked +10 Referral Sales!",
                              sub: `Total Sales: ${nextSales}`
                            });

                            const checkMilestones = (p: number, n: number) => {
                              if (p < 10 && n >= 10) return { tier: "Bronze", count: 10 };
                              if (p < 50 && n >= 50) return { tier: "Silver", count: 50 };
                              if (p < 100 && n >= 100) return { tier: "Gold", count: 100 };
                              return null;
                            };

                            const crossed = checkMilestones(prevSales, nextSales);
                            if (crossed) {
                              setRecentToast({
                                message: "🚀 Webhook Dispatched!",
                                sub: `Milestone Crossed: ${crossed.count} sales. Slack/Discord notified.`
                              });

                              const newLog = {
                                id: `web_log_${Date.now()}`,
                                timestamp: new Date().toLocaleTimeString(),
                                event: "affiliate.milestone_reached",
                                payload: JSON.stringify({
                                  event: "affiliate.milestone_reached",
                                  timestamp: new Date().toISOString(),
                                  affiliate: {
                                    id: `aff_` + (affiliateName.toLowerCase().replace(/\s+/g, '') || "partner2026"),
                                    name: affiliateName || "Partner",
                                    email: affiliateEmail || "partner@controlvid.ai"
                                  },
                                  metrics: {
                                    clicks: nextClicks,
                                    sales: nextSales,
                                    revenue: `$${nextRevenue.toFixed(2)}`
                                  },
                                  milestone: {
                                    tier: crossed.tier,
                                    sales_threshold: crossed.count,
                                    bonus_incentive: crossed.tier === "Bronze" ? "$50.00 Boost" : crossed.tier === "Silver" ? "$250.00 Boost" : "$1,000.00 Match"
                                  },
                                  webhook_delivery: {
                                    slack_channel: "#affiliate-alerts",
                                    discord_status: "200 OK",
                                    latency_ms: 120
                                  }
                                }, null, 2),
                                status: 200
                              };
                              setWebhookLogs(prev => [newLog, ...prev]);
                            }
                          }}
                          className="px-4 py-3 bg-[#38bdf8]/10 hover:bg-[#38bdf8]/15 border border-[#38bdf8]/25 rounded-lg text-xs font-bold text-[#38bdf8] flex items-center justify-center space-x-2 cursor-pointer transition-colors focus:outline-none"
                        >
                          <Zap className="h-4 w-4" />
                          <span>Simulate +10 Bulk Sales</span>
                        </button>

                        <div className="text-[10px] text-neutral-400 flex items-center justify-center leading-relaxed text-center px-4">
                          Fires real-time webhook payloads when you cross sales count thresholds (10, 50, 100).
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB CONTENT: PAYMENT SETTINGS */}
                {affiliateDashboardTab === "payment" && (
                  <div className="space-y-6 animate-[fadeIn_0.15s_ease-out]">
                    <div className="border-b border-white/5 pb-4">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">Payment Withdrawal Settings</h3>
                      <p className="text-xs text-neutral-400 mt-1">Configure your payout account info. In order to mitigate micro-transaction costs, a minimum threshold of $50.00 is strictly enforced.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-2 space-y-4">
                        <div className="space-y-3">
                          <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">Withdrawal Method</label>
                          <div className="grid grid-cols-3 gap-2.5">
                            {["paypal", "stripe", "wise"].map((m) => (
                              <button
                                key={m}
                                type="button"
                                onClick={() => {
                                  setAffiliatePaymentMethod(m as any);
                                  setAffiliatePaymentSaved(false);
                                }}
                                className={`px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer bg-transparent focus:outline-none ${
                                  affiliatePaymentMethod === m
                                    ? "border-[#38bdf8] text-[#38bdf8] bg-[#38bdf8]/5"
                                    : "border-white/10 text-neutral-400 hover:border-white/20 hover:text-white"
                                }`}
                              >
                                {m}
                              </button>
                            ))}
                          </div>
                        </div>

                        {affiliatePaymentMethod && (
                          <div className="space-y-3 animate-[fadeIn_0.1s_ease-out]">
                            <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">
                              {affiliatePaymentMethod === "paypal" ? "PayPal Email Address" : affiliatePaymentMethod === "stripe" ? "Stripe Connected Email" : "Wise Account Email / ID"}
                            </label>
                            <input
                              type="text"
                              value={affiliatePaymentDetail}
                              onChange={(e) => {
                                setAffiliatePaymentDetail(e.target.value);
                                setAffiliatePaymentSaved(false);
                              }}
                              placeholder={affiliatePaymentMethod === "paypal" ? "e.g. partner-withdraw@paypal.com" : affiliatePaymentMethod === "stripe" ? "e.g. acct_stripe_994" : "e.g. wise-recipient@email.co"}
                              className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#38bdf8]/50 transition-colors"
                            />

                            <button
                              type="button"
                              onClick={async () => {
                                if (!affiliatePaymentDetail) return;
                                try {
                                  const { updateAffiliatePayoutDetails } = await import("./lib/firebase");
                                  const emailToSave = affiliateEmail || activeUser?.email || "test@controlvid.ai";
                                  await updateAffiliatePayoutDetails(emailToSave, affiliatePaymentMethod, affiliatePaymentDetail);
                                  await loadAffiliatesAndReferrals();
                                } catch (err) {
                                  console.error("Failed to update payout details in DB:", err);
                                }
                                setAffiliatePaymentSaved(true);
                                setAffiliatePayoutError(null);
                                setRecentToast({
                                  message: "✓ Credentials Saved",
                                  sub: `Your payout destination via ${affiliatePaymentMethod.toUpperCase()} has been verified.`
                                });

                                setWebhookLogs(prev => [
                                  {
                                    id: `web_log_${Date.now()}`,
                                    timestamp: new Date().toLocaleTimeString(),
                                    event: "affiliate.payment_configured",
                                    payload: JSON.stringify({
                                      event: "affiliate.payment_configured",
                                      timestamp: new Date().toISOString(),
                                      affiliate_email: affiliateEmail,
                                      payment_config: {
                                        method: affiliatePaymentMethod,
                                        identifier: "••••••••" + affiliatePaymentDetail.substr(Math.max(0, affiliatePaymentDetail.length - 4)),
                                        status: "Active_Verified"
                                      }
                                    }, null, 2),
                                    status: 200
                                  },
                                  ...prev
                                ]);
                              }}
                              style={{ background: "linear-gradient(135deg, #38bdf8, #FFFFFF)", color: "#020617", boxShadow: "0 0 15px rgba(56, 189, 248, 0.5)" }}
                              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#38bdf8]/85 cursor-pointer transition-all border-none focus:outline-none"
                            >
                              Save Credentials
                            </button>
                          </div>
                        )}

                        {partnerPaymentSaved && (
                          <div className="p-3 bg-emerald-950/20 border border-emerald-900/30 rounded-lg text-xs text-emerald-400 flex items-center gap-2">
                            <CheckCircle className="h-4.5 w-4.5" />
                            <span>Payout routing active. Destination verified: <strong className="text-white">{partnerPaymentDetail}</strong> ({partnerPaymentMethod.toUpperCase()})</span>
                          </div>
                        )}
                      </div>

                      {/* Right panel: Available Balance withdrawal trigger */}
                      <div className="p-5 rounded-xl bg-white/[0.01] border border-white/5 space-y-4 self-start">
                        <div>
                          <span className="block text-[10px] font-mono text-neutral-500 uppercase">Available Payout Balance</span>
                          <span className="block text-2xl font-black text-white mt-1">${partnerRevenue.toFixed(2)}</span>
                        </div>

                        <div>
                          <span className="block text-[10px] font-mono text-neutral-500 uppercase">Minimum Payout threshold</span>
                          <span className="block text-xs font-bold text-neutral-400 mt-0.5">$50.00</span>
                        </div>

                        {affiliatePayoutError && (
                          <div className="p-3 rounded-lg bg-red-950/20 border border-red-900 text-red-400 text-xs flex gap-2">
                            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                            <span>{affiliatePayoutError}</span>
                          </div>
                        )}

                        {affiliatePayoutRequested ? (
                          <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900 text-emerald-400 text-xs flex gap-2">
                            <CheckCircle className="h-4.5 w-4.5 shrink-0 mt-0.5" />
                            <span>Your withdrawal request is being processed. Expected arrival: 1-2 business days.</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              if (!partnerPaymentSaved) {
                                setAffiliatePayoutError("Payment settings missing. Please save your credentials under the payment method form first.");
                                return;
                              }
                              if (partnerRevenue < 50) {
                                setAffiliatePayoutError(`Withdrawal denied. Your available balance ($${partnerRevenue.toFixed(2)}) is below the required $50.00 minimum threshold.`);
                                return;
                              }
                              if (affiliateTrafficVolume === "high") {
                                setAffiliatePayoutError("Withdrawal blocked. Account flagged for high-volume anomalous clicks. Please resolve the compliance alert first.");
                                return;
                              }
                              
                              setAffiliatePayoutRequested(true);
                              setAffiliatePayoutError(null);
                              setRecentToast({
                                message: "💸 Payout Dispatched!",
                                sub: `Withdrawal request of $${partnerRevenue.toFixed(2)} submitted.`
                              });

                              setWebhookLogs(prev => [
                                {
                                  id: `web_log_${Date.now()}`,
                                  timestamp: new Date().toLocaleTimeString(),
                                  event: "affiliate.payout_requested",
                                  payload: JSON.stringify({
                                    event: "affiliate.payout_requested",
                                    timestamp: new Date().toISOString(),
                                    affiliate_email: affiliateEmail || activeUser?.email || "test@controlvid.ai",
                                    payout: {
                                      amount: partnerRevenue,
                                      currency: "USD",
                                      method: partnerPaymentMethod,
                                      destination: partnerPaymentDetail,
                                      tracking_id: "trx_pay_" + Math.random().toString(36).substr(2, 9),
                                      payout_status: "Pending_Review_Complete"
                                    }
                                  }, null, 2),
                                  status: 200
                                },
                                ...prev
                              ]);
                            }}
                            style={{ background: "linear-gradient(135deg, #38bdf8, #FFFFFF)", color: "#020617", boxShadow: "0 0 15px rgba(56, 189, 248, 0.5)" }}
                            className="w-full py-3 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-[#38bdf8]/85 transition-all cursor-pointer border-none focus:outline-none"
                          >
                            Request Withdrawal Now
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB CONTENT: MILESTONE WEBHOOKS */}
                {affiliateDashboardTab === "webhooks" && (
                  <div className="space-y-6 animate-[fadeIn_0.15s_ease-out]">
                    <div className="border-b border-white/5 pb-4">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">Milestone Webhook Alerts & Logs</h3>
                      <p className="text-xs text-neutral-400 mt-1">Configure Slack/Discord webhook dispatches that alert you instantly whenever referral performance milestones are completed.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-1 space-y-4">
                        <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-3.5">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400 block">System Alerts Status</span>

                          <div className="space-y-3">
                            <div className="flex items-start gap-2.5">
                              <CheckCircle className={`h-4.5 w-4.5 shrink-0 mt-0.5 ${affiliateSalesCount >= 10 ? "text-emerald-400" : "text-neutral-600"}`} />
                              <div>
                                <span className="block text-xs font-bold text-white">Bronze Milestone (10)</span>
                                <span className="block text-[10px] text-neutral-400 font-mono">Bonus: $50.00 Boost</span>
                              </div>
                            </div>

                            <div className="flex items-start gap-2.5">
                              <CheckCircle className={`h-4.5 w-4.5 shrink-0 mt-0.5 ${affiliateSalesCount >= 50 ? "text-emerald-400" : "text-neutral-600"}`} />
                              <div>
                                <span className="block text-xs font-bold text-white">Silver Milestone (50)</span>
                                <span className="block text-[10px] text-neutral-400 font-mono">Bonus: $250.00 Boost</span>
                              </div>
                            </div>

                            <div className="flex items-start gap-2.5">
                              <CheckCircle className={`h-4.5 w-4.5 shrink-0 mt-0.5 ${affiliateSalesCount >= 100 ? "text-emerald-400" : "text-neutral-600"}`} />
                              <div>
                                <span className="block text-xs font-bold text-white">Gold Milestone (100)</span>
                                <span className="block text-[10px] text-neutral-400 font-mono">Bonus: VIP Match & Bonus</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-lg border border-white/5 bg-white/[0.01] text-[10px] text-neutral-400 leading-normal">
                          <strong className="text-white block mb-0.5">Note on Webhooks:</strong>
                          Whenever you achieve these sale levels, a raw HTTP POST payload dispatches to Slack and our VIP team for immediate partner bonuses.
                        </div>
                      </div>

                      <div className="md:col-span-2 space-y-3">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400 block">Automation & Webhook Log Feed</span>
                        
                        <div className="bg-black/80 border border-white/5 rounded-xl p-4 font-mono text-[10px] space-y-3 max-h-[280px] overflow-y-auto custom-scrollbar">
                          {webhookLogs.length === 0 ? (
                            <div className="text-neutral-500 py-6 text-center">
                              No automation logs generated yet.<br />
                              Generate sales on the Overview tab to trigger webhooks.
                            </div>
                          ) : (
                            webhookLogs.map((log) => (
                              <div key={log.id} className="border-b border-white/5 pb-3 last:border-0 last:pb-0">
                                <div className="flex items-center justify-between text-[9px] text-neutral-400 mb-1.5">
                                  <div className="flex items-center space-x-1.5">
                                    <span className="bg-emerald-500/10 text-emerald-400 px-1 py-0.5 rounded font-bold">HTTP POST</span>
                                    <span className="text-[#38bdf8] font-bold">{log.event}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <span>{log.timestamp}</span>
                                    <span className="bg-white/10 text-white px-1 py-0.5 rounded">status: {log.status}</span>
                                  </div>
                                </div>
                                <pre className="text-neutral-300 break-all bg-white/[0.02] p-2.5 rounded border border-white/5 overflow-x-auto whitespace-pre-wrap">{log.payload}</pre>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB CONTENT: WELCOME KIT */}
                {affiliateDashboardTab === "email" && (
                  <div className="space-y-4 animate-[fadeIn_0.15s_ease-out]">
                    <div className="border-b border-white/5 pb-2">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">Automated Welcome Packet</h3>
                      <p className="text-xs text-neutral-400 mt-1">Review the welcome instructions dispatched to your partner inbox upon approval.</p>
                    </div>

                    <div className="bg-[#121216] border border-white/10 rounded-xl overflow-hidden shadow-xl text-left">
                      <div className="bg-white/[0.02] border-b border-white/5 px-4 py-3 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                        <span>Inbox Viewer</span>
                        <span className="text-[#38bdf8] font-bold">AUTOMATION ARCHIVE</span>
                      </div>

                      <div className="p-5 space-y-4 text-xs text-neutral-300 leading-relaxed max-h-[300px] overflow-y-auto custom-scrollbar">
                        <div className="space-y-1 text-xs border-b border-white/5 pb-3 text-neutral-400">
                          <div><span className="text-neutral-500">From:</span> partnership@controlvid.ai</div>
                          <div><span className="text-neutral-500">Subject:</span> Welcome to the ControlVid.ai Affiliate Family! 🚀</div>
                        </div>

                        <p>Hey {affiliateName || "Partner"},</p>
                        
                        <p>We are absolutely thrilled to welcome you to the ControlVid.ai Partnership Family! Your credentials have cleared our verification queue.</p>

                        <div className="p-3 bg-neutral-900 border border-white/5 rounded-lg font-mono text-[11px] space-y-1">
                          <div className="text-[#38bdf8] font-bold">🔗 YOUR ASSIGNED COMMISSION URL:</div>
                          <div className="text-white break-all">
                            https://controlvid.ai/?aff=partner_{affiliateName.toLowerCase().replace(/\s+/g, '') || "id"}
                          </div>
                        </div>

                        <div className="space-y-1.5 pt-2">
                          <div className="font-bold text-[#38bdf8] uppercase tracking-wider font-mono text-[10px]">💡 3 TIPS FOR GUARANTEED COMMISSIONS:</div>
                          <ul className="space-y-2 list-none pl-0">
                            <li className="flex items-start gap-2">
                              <span className="text-[#38bdf8] font-bold font-mono">01.</span>
                              <div><strong>Publish Controversial Script Breakdowns:</strong> Point out how creators double retention using our controversial tones. Always paste your link inside comments.</div>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-[#38bdf8] font-bold font-mono">02.</span>
                              <div><strong>Promote Speed:</strong> Focus-oriented creators hate waiting. Emphasize that our engine renders 5 customized scripts in under 2 minutes.</div>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-[#38bdf8] font-bold font-mono">03.</span>
                              <div><strong>Direct Link Bios:</strong> Embed your tracking URL into short link directories (Beacons, Linktree, etc.) for high click-through rates.</div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          )}
          </div>
        </div>
      )}
      
      {/* Sleek Automated Series Scheduler Modal */}
      {isSchedulerOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[9999] p-4 animate-[fadeIn_0.2s_use-out]">
          <div className="bg-[#242424] border border-white/10 rounded-2xl w-full max-w-md p-6 sm:p-8 space-y-6 text-left shadow-2xl relative">
            <button
              onClick={() => setIsSchedulerOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer border-none focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-amber-400">
                <Calendar className="h-5 w-5" />
                <h3 className="text-base font-black font-sans uppercase tracking-tight">Schedule Automated Series</h3>
              </div>
              <p className="text-[11px] text-slate-400">
                Bulk schedule hands-free video assets dynamically published to your active Shadow Channels.
              </p>
            </div>

            {/* Campaign Metadata */}
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1">
              <span className="text-[8px] text-slate-500 font-mono uppercase block">Active Campaign Topic / Title:</span>
              <strong className="text-xs text-white truncate block">"{schedulerCampaignName}"</strong>
            </div>

            {/* Quota Progress Tracker */}
            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono text-[9px] font-bold">
                <span className="text-slate-400 uppercase">MONTHLY PLAN QUOTA GUARD:</span>
                <span className={`${getQuotaStatus(scheduleQuantity).isExceeded ? "text-red-400" : "text-brand-cyan"}`}>
                  {getQuotaStatus().totalUsed + scheduleQuantity} / {getQuotaStatus().limit} VIDEOS USED
                </span>
              </div>
              
              <div className="h-2 bg-slate-900 rounded-full border border-white/[0.03] overflow-hidden relative">
                {/* Created & Scheduled bar */}
                <div 
                  className="absolute top-0 bottom-0 left-0 bg-slate-700 transition-all duration-300" 
                  style={{ width: `${(getQuotaStatus().totalUsed / getQuotaStatus().limit) * 100}%` }}
                />
                {/* Projected additions */}
                <div 
                  className="absolute top-0 bottom-0 bg-amber-400 transition-all duration-300" 
                  style={{ 
                    left: `${(getQuotaStatus().totalUsed / getQuotaStatus().limit) * 100}%`, 
                    width: `${Math.min(100 - (getQuotaStatus().totalUsed / getQuotaStatus().limit) * 100, (scheduleQuantity / getQuotaStatus().limit) * 100)}%` 
                  }}
                />
              </div>

              <div className="flex justify-between items-center text-[8px] font-mono text-slate-500 mt-1">
                <span>Created: {getQuotaStatus().createdCount}</span>
                <span>Scheduled: {getQuotaStatus().scheduledCount}</span>
                <span>Requested: +{scheduleQuantity}</span>
              </div>
            </div>

            {/* Selector Fields */}
            <div className="space-y-4 pt-1">
              {/* Quantity */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                    Series Quantity
                  </label>
                  <span className="text-xs font-black text-white bg-white/5 px-2 py-0.5 rounded border border-white/10 font-mono">
                    {scheduleQuantity} Videos
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max={Math.max(1, getQuotaStatus().limit - getQuotaStatus().totalUsed)}
                  value={scheduleQuantity}
                  onChange={(e) => setScheduleQuantity(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <p className="text-[9px] text-slate-500">
                  Select up to the remaining {getQuotaStatus().remaining} monthly plan quota.
                </p>
              </div>

              {/* Frequency / Time */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                    Publishing Frequency
                  </label>
                  <select
                    value={scheduleFrequency}
                    onChange={(e) => setScheduleFrequency(e.target.value)}
                    className="w-full bg-[#121215] border border-slate-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/25 rounded-lg p-2 text-xs text-slate-200 focus:outline-none cursor-pointer"
                  >
                    <option value="daily">Once Daily</option>
                    <option value="twice_daily">Twice Daily</option>
                    <option value="hourly">Every 12 Hours</option>
                    <option value="weekly">Once Weekly</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                    Start publishing time
                  </label>
                  <input
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="w-full bg-[#121215] border border-slate-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/25 rounded-lg p-2 text-xs text-slate-200 focus:outline-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Target Shadow Channel Select */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Shadow Channel Target
                </label>
                <select
                  value={scheduleChannelSelect}
                  onChange={(e) => setScheduleChannelSelect(e.target.value)}
                  className="w-full bg-[#121215] border border-slate-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/25 rounded-lg p-2 text-xs text-slate-200 focus:outline-none cursor-pointer"
                >
                  <option value="All Channels">Distribute Across All Shadow Channels</option>
                  <option value="Channel 1 font-sans">Primary Shadow Channel #1</option>
                  {getQuotaStatus().limit >= 100 && <option value="Channel 2">Secondary Shadow Channel #2</option>}
                  {getQuotaStatus().limit >= 100 && <option value="Channel 3">Tertiary Shadow Channel #3</option>}
                </select>
              </div>
            </div>

            {/* Quota Warning or Confirmation Buttons */}
            {getQuotaStatus(scheduleQuantity).isExceeded ? (
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-550/30 text-red-400 space-y-1.5 font-sans">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-400" />
                    <strong className="text-xs font-bold uppercase tracking-wider">Quota Guard Triggered</strong>
                  </div>
                  <p className="text-[10px] leading-relaxed">
                    You have selected {scheduleQuantity} videos, which exceeds your remaining monthly subscription limit.
                  </p>
                </div>
                
                {/* Disabled Schedule button with Upgrade message */}
                <button
                  type="button"
                  onClick={() => {
                    setIsSchedulerOpen(false);
                    setCurrentView("pricing");
                  }}
                  className="w-full py-3 rounded-xl bg-[#38bdf8] hover:bg-[#38bdf8]/90 text-black font-sans text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 border-none focus:outline-none shadow-lg shadow-[#38bdf8]/20"
                >
                  <Sparkles className="h-4 w-4 fill-current" />
                  <span>Upgrade to Unlock More</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsSchedulerOpen(false)}
                  className="flex-1 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-slate-400 hover:text-white border border-white/5 hover:border-white/10 bg-transparent transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmSchedule}
                  className="flex-1 py-3 rounded-xl text-xs font-sans font-black uppercase tracking-wider bg-amber-400 text-black hover:bg-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.2)] transition-all cursor-pointer border-none focus:outline-none"
                >
                  Confirm Schedule
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Subscription Cancellation Confirmation Modal */}
      {showCancelModal && (
        <div id="cancel-subscription-backdrop" className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div id="cancel-subscription-modal" className="relative w-full max-w-md bg-[#1C1C22] border border-white/10 p-6 rounded-2xl shadow-2xl text-left animate-[fadeIn_0.2s_ease-out] flex flex-col space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5 text-rose-400">
                <AlertTriangle className="h-5 w-5 shrink-0" />
                <h3 className="text-base font-black text-white uppercase tracking-wider font-sans">
                  Cancel Subscription
                </h3>
              </div>
              <button
                onClick={() => setShowCancelModal(false)}
                className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer border-none"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Are you sure you want to cancel your <strong className="text-[#38bdf8] uppercase">{activeUser?.subscription_tier || "Growth Pro"}</strong> subscription? 
            </p>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-mono text-[11px]">Active Plan:</span>
                <span className="font-bold text-white uppercase">{activeUser?.subscription_tier || "Growth Pro"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-mono text-[11px]">Access Retained Until:</span>
                <span className="font-bold text-emerald-400 font-mono">August 22, 2026</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <span className="text-slate-400 font-mono text-[11px]">Add-ons Impacted:</span>
                <span className="text-[10px] font-bold text-amber-400 uppercase">Social Media Automation</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-normal">
              If canceled, your account will not be charged on <strong className="text-white">August 22, 2026</strong>. You can reactivate your plan at any time before then with 1-click.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-slate-200 hover:text-white transition-all cursor-pointer uppercase tracking-wider"
              >
                Keep My Plan
              </button>
              <button
                onClick={() => {
                  setIsSubscriptionCancelled(true);
                  setShowCancelModal(false);
                  setRecentToast({
                    message: "Subscription Cancellation Pending",
                    sub: "Your subscription will officially end on August 22, 2026. All features remain unlocked until then."
                  });
                }}
                className="flex-1 py-2.5 px-4 bg-rose-600/80 hover:bg-rose-600 text-white font-black rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer border-none shadow-lg shadow-rose-600/20"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exit Intent Modal */}
      {showExitModal && (
        <div id="exit-intent-modal-backdrop" className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div id="exit-intent-modal" className="relative w-full max-w-md bg-[#242424] border border-[#38bdf8]/30 p-8 rounded-2xl shadow-2xl shadow-[#38bdf8]/10 text-center animate-[fadeIn_0.2s_ease-out] flex flex-col items-center">
            {/* Elegant glowing background element */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-[#38bdf8]/20 rounded-full blur-xl pointer-events-none" />
            
            {/* Illustrative glowing icon */}
            <div id="exit-intent-icon" className="relative w-14 h-14 bg-[#38bdf8]/10 rounded-full border border-[#38bdf8]/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(56, 189, 248, 0.15)]">
              <Sparkles className="h-7 w-7 text-[#38bdf8]" />
            </div>

            {/* Title */}
            <h2 id="exit-intent-title" className="text-2xl font-black text-white tracking-tight font-sans uppercase mb-3 leading-tight">
              Are you really leaving your channels to chance?
            </h2>

            {/* Subtitle with high authority and outcome focus */}
            <p id="exit-intent-subtitle" className="text-sm text-neutral-400 font-sans leading-relaxed mb-8 px-2">
              2,000+ creators are already scaling with automated AI workflows. While you're hesitating, they’re capturing the traffic you're missing.
            </p>

            {/* CTA Button */}
            <button
              id="exit-intent-cta"
              onClick={() => {
                setShowExitModal(false);
                setCurrentView("pricing");
              }}
              className="w-full py-4 bg-[#38bdf8] hover:bg-[#38bdf8]/85 text-white font-sans font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-[#38bdf8]/20 hover:shadow-[#38bdf8]/45 transition-all cursor-pointer active:scale-98 border-none focus:outline-none mb-4"
            >
              Claim My Competitive Advantage 🚀
            </button>

            {/* Secondary Close Link */}
            <button
              id="exit-intent-close"
              onClick={() => setShowExitModal(false)}
              className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 hover:text-white transition-colors cursor-pointer bg-transparent border-none focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Global Floating AI Auto-Support Layer */}
      <AutoSupportLayer 
        userEmail={activeUser?.email || "creator@controlvid.ai"} 
        userTier={activeUser?.subscription_tier || "Spark"} 
        isFloatingWidget={true} 
      />

      {/* Floating Webhook & Safety Notifier Toast */}
      {recentToast && (
        <div className="fixed bottom-20 right-5 sm:bottom-22 sm:right-6 z-[9980] max-w-sm bg-[#242424] border border-[#38bdf8]/30 p-4 rounded-xl shadow-2xl flex items-start space-x-3 text-left animate-[slideUp_0.2s_ease-out]">
          <div className="w-8 h-8 rounded-lg bg-[#38bdf8]/10 flex items-center justify-center text-[#38bdf8] shrink-0 mt-0.5">
            <Bell className="h-4 w-4 animate-bounce" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">{recentToast.message}</h4>
            <p className="text-[11px] text-neutral-400 mt-1 leading-normal">{recentToast.sub}</p>
          </div>
          <button
            onClick={() => setRecentToast(null)}
            className="p-1 text-neutral-500 hover:text-white transition-colors bg-transparent border-none cursor-pointer focus:outline-none"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
