import { Check, Sparkles, Zap, ShieldAlert, Key, ArrowRight, ArrowLeft, Lock, ShieldCheck, TrendingUp, Rocket, Crown, Network, Clock, CheckCircle2, ShoppingBag } from "lucide-react";
import { useState } from "react";

interface PricingPageProps {
  onClose: () => void;
  adminBypassActive?: boolean;
  onCEOAccess?: () => void;
  gatedNotice?: boolean;
  activeUserEmail?: string;
  initialPlanName?: string;
  initialStep?: 1 | 2 | 3;
}

export default function PricingPage({
  onClose,
  adminBypassActive,
  onCEOAccess,
  gatedNotice = false,
  activeUserEmail,
  initialPlanName,
  initialStep,
}: PricingPageProps) {
  // Check URL query parameters or initial props for direct routing
  const isDMAutomationRoute = 
    initialPlanName === "dm_automation" || 
    initialStep === 2 || 
    (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("plan") === "dm_automation");

  // Wizard steps: 1 = select_main_tier, 2 = offer_dm_automation_add_on, 3 = checkout
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(isDMAutomationRoute ? 2 : (initialStep || 1));
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [selectedPlanName, setSelectedPlanName] = useState<string>(
    initialPlanName && initialPlanName !== "dm_automation" ? initialPlanName : "Velocity"
  );
  const [selectedAddOnKey, setSelectedAddOnKey] = useState<"starter_dm" | "pro_dm" | null>(
    isDMAutomationRoute ? "starter_dm" : null
  );

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [purchasing, setPurchasing] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);

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

  const isAdmin = isPreviewEnvironment || (activeUserEmail?.toLowerCase() === "noamazar84@gmail.com");

  // Load user info from DB/local cache on mount
  useState(() => {
    if (activeUserEmail) {
      import("../lib/firebase").then(({ getUsers }) => {
        getUsers().then(users => {
          const user = users.find(u => u.email.toLowerCase() === activeUserEmail.toLowerCase());
          if (user) {
            setCurrentUser(user);
          }
        });
      }).catch(err => {
        console.error("Failed to load users:", err);
      });
    }
  });

  interface Plan {
    name: string;
    checkoutUrl?: string;
    annualCheckoutUrl?: string;
    monthlyPrice: number | string;
    annualMonthlyRate: number | string;
    videosCredits: string;
    annualVideosCredits?: string;
    shadowChannels: number | string;
    analytics: string;
    analyticsLabel: string;
    support: string;
    supportLabel: string;
    features: string[];
    annualFeatures?: string[];
    color: string;
    iconType: string;
    popular?: boolean;
  }

  const plans: Plan[] = [
    {
      name: "Spark",
      checkoutUrl: "https://whop.com/checkout/plan_lh462BuLhpo6m",
      annualCheckoutUrl: "https://whop.com/checkout/plan_3kvmMHUrbRMlU",
      monthlyPrice: 49,
      annualMonthlyRate: 44,
      videosCredits: "70 Credits/video/minutes - Viral/E-commerce/Long-form Video",
      annualVideosCredits: "840 Credits/year - Viral/E-commerce/Long-form Video",
      shadowChannels: 3,
      analytics: "Basic Analytics: Video Views Tracking",
      analyticsLabel: "Basic Analytics: Video Views Tracking",
      support: "self_service",
      supportLabel: "Self-service support",
      features: [
        "70 Credits/video/minutes - Viral/E-commerce/Long-form Video",
        "3 shadow_channels",
        "Bulk Scheduler",
        "Bulk One-Click Generation & Posting",
        "Basic Analytics: Video Views Tracking",
        "Facebook & Instagram DM Automation (Optional Add-on)",
        "Self-service support"
      ],
      annualFeatures: [
        "840 Credits/year - Viral/E-commerce/Long-form Video",
        "3 shadow_channels",
        "Bulk Scheduler",
        "Bulk One-Click Generation & Posting",
        "Basic Analytics: Video Views Tracking",
        "Facebook & Instagram DM Automation (Optional Add-on)",
        "Self-service support"
      ],
      color: "border-slate-800",
      iconType: "floating_sparkle_animation"
    },
    {
      name: "Growth",
      checkoutUrl: "https://whop.com/checkout/plan_WcQG0RIqzkwGH",
      annualCheckoutUrl: "https://whop.com/checkout/plan_q1JwIoMunMoLp",
      monthlyPrice: 89,
      annualMonthlyRate: 80,
      videosCredits: "130 Credits/video/minutes - Viral/E-commerce/Long-form Video",
      annualVideosCredits: "1,560 Credits/year - Viral/E-commerce/Long-form Video",
      shadowChannels: 4,
      analytics: "Advanced Analytics: Retention & Drop-off",
      analyticsLabel: "Advanced Analytics: Retention & Drop-off",
      support: "knowledge_base_bot",
      supportLabel: "Knowledge base support",
      features: [
        "130 Credits/video/minutes - Viral/E-commerce/Long-form Video",
        "4 shadow_channels",
        "Bulk Scheduler",
        "Bulk One-Click Generation & Posting",
        "Advanced Analytics: Retention & Drop-off",
        "Facebook & Instagram DM Automation (Optional Add-on)",
        "Knowledge base support"
      ],
      annualFeatures: [
        "1,560 Credits/year - Viral/E-commerce/Long-form Video",
        "4 shadow_channels",
        "Bulk Scheduler",
        "Bulk One-Click Generation & Posting",
        "Advanced Analytics: Retention & Drop-off",
        "Facebook & Instagram DM Automation (Optional Add-on)",
        "Knowledge base support"
      ],
      color: "border-slate-800",
      iconType: "glassmorphism_growth_graph"
    },
    {
      name: "Velocity",
      checkoutUrl: "https://whop.com/checkout/plan_V2MSLJErUBhu9",
      annualCheckoutUrl: "https://whop.com/checkout/plan_JEG54J9VVMKXo",
      monthlyPrice: 129,
      annualMonthlyRate: 115,
      videosCredits: "200 Credits/video/minutes - Viral/E-commerce/Long-form Video",
      annualVideosCredits: "2,400 Credits/year - Viral/E-commerce/Long-form Video",
      shadowChannels: 5,
      analytics: "Detailed Analytics: CTR & Conversions",
      analyticsLabel: "Detailed Analytics: CTR & Conversions",
      support: "extended_automation",
      supportLabel: "Extended automation support",
      features: [
        "200 Credits/video/minutes - Viral/E-commerce/Long-form Video",
        "5 shadow_channels",
        "Bulk Scheduler",
        "Bulk One-Click Generation & Posting",
        "Detailed Analytics: CTR & Conversions",
        "Facebook & Instagram DM Automation (Optional Add-on)",
        "Extended automation support"
      ],
      annualFeatures: [
        "2,400 Credits/year - Viral/E-commerce/Long-form Video",
        "5 shadow_channels",
        "Bulk Scheduler",
        "Bulk One-Click Generation & Posting",
        "Detailed Analytics: CTR & Conversions",
        "Facebook & Instagram DM Automation (Optional Add-on)",
        "Extended automation support"
      ],
      color: "border-[#38bdf8] shadow-[0_0_25px_rgba(56, 189, 248, 0.15)] bg-slate-900/10",
      popular: true,
      iconType: "dynamic_rocket"
    },
    {
      name: "Empire",
      checkoutUrl: "https://whop.com/checkout/plan_3Czt0BQqCnhzr",
      annualCheckoutUrl: "https://whop.com/checkout/plan_3Czt0BQqCnhzr",
      monthlyPrice: 229,
      annualMonthlyRate: 208,
      videosCredits: "310 Credits/video/minutes - Viral/E-commerce/Long-form Video",
      annualVideosCredits: "3,720 Credits/year - Viral/E-commerce/Long-form Video",
      shadowChannels: 8,
      analytics: "Premium Analytics: Heatmaps & Performance",
      analyticsLabel: "Premium Analytics: Heatmaps & Performance",
      support: "priority_automation_desk",
      supportLabel: "Priority automation desk",
      features: [
        "310 Credits/video/minutes - Viral/E-commerce/Long-form Video",
        "8 shadow_channels",
        "Bulk Scheduler",
        "Bulk One-Click Generation & Posting",
        "Premium Analytics: Heatmaps & Performance",
        "Facebook & Instagram DM Automation (Optional Add-on)",
        "Priority automation desk"
      ],
      annualFeatures: [
        "3,720 Credits/year - Viral/E-commerce/Long-form Video",
        "8 shadow_channels",
        "Bulk Scheduler",
        "Bulk One-Click Generation & Posting",
        "Premium Analytics: Heatmaps & Performance",
        "Facebook & Instagram DM Automation (Optional Add-on)",
        "Priority automation desk"
      ],
      color: "border-slate-800",
      iconType: "glowing_crown_diamond"
    },
    {
      name: "Enterprise",
      monthlyPrice: "Custom",
      annualMonthlyRate: "Custom",
      videosCredits: "Custom tailored solution for all requirements",
      shadowChannels: "Custom",
      analytics: "Custom tailored solution for all requirements",
      analyticsLabel: "Custom tailored solution for all requirements",
      support: "dedicated_engineer_sla",
      supportLabel: "Custom tailored solution for all requirements",
      features: [
        "Custom tailored solution for all requirements"
      ],
      color: "border-slate-800",
      iconType: "complex_organizational_structure"
    }
  ];

  const addOns = {
    starter_dm: { 
      name: "Facebook & Instagram Automation - Starter Booster", 
      price: 29, 
      credits: 500, 
      description: "500 Lead Interaction Credits ($29) - Applies strictly to Successful Lead Interactions (keyword triggers). Subsequent conversation messages consume 0 additional credits." 
    },
    pro_dm: { 
      name: "Facebook & Instagram Automation - Pro Booster", 
      price: 129, 
      credits: 3000, 
      description: "3,000 Lead Interaction Credits ($129) - Built for massive viral loops. Applies strictly to Successful Lead Interactions (keyword triggers). Subsequent conversation messages consume 0 additional credits." 
    }
  };

  const selectedPlan = plans.find(p => p.name === selectedPlanName) || plans[2];

  // Helper to calculate pricing breakdown
  const getSubtotalPrice = () => {
    const pricePerMonth = billingCycle === "annual" ? selectedPlan.annualMonthlyRate : selectedPlan.monthlyPrice;
    if (typeof pricePerMonth === "string") return pricePerMonth;
    return billingCycle === "annual" ? (pricePerMonth as number) * 12 : (pricePerMonth as number);
  };

  const getAddOnPrice = () => {
    if (!selectedAddOnKey) return 0;
    return addOns[selectedAddOnKey].price;
  };

  const getTotalPrice = () => {
    const sub = getSubtotalPrice();
    if (typeof sub === "string") return sub;
    return sub + getAddOnPrice();
  };

  // Move forward in funnel
  const handleSelectPlanNext = (planName: string) => {
    setSelectedPlanName(planName);
    setPurchaseError(null);
    setSuccessMessage(null);
    if (planName === "Enterprise") {
      setSelectedAddOnKey(null);
      setCurrentStep(3);
    } else {
      setCurrentStep(2);
    }
  };

  // Complete simulated purchase and write parameters to DB
  const handleCompleteCheckout = async () => {
    if (!activeUserEmail) {
      setPurchaseError("No active account detected. Select a mock profile from the user switcher before purchasing.");
      return;
    }

    setPurchasing(true);
    setPurchaseError(null);
    setSuccessMessage(null);

    try {
      const { upgradeUserTier, purchaseDMAutomationAddOn, getUsers, trackAffiliateSale } = await import("../lib/firebase");

      // 1. Upgrade core subscription tier
      await upgradeUserTier(activeUserEmail, selectedPlan.name);

      // 2. If an optional add-on was selected, purchase and add those credits!
      if (selectedAddOnKey) {
        const addOn = addOns[selectedAddOnKey];
        await purchaseDMAutomationAddOn(activeUserEmail, addOn.credits, addOn.price);
      }

      // 3. Track Affiliate Referral Sale if an affiliate ID is active
      const trackedAffId = localStorage.getItem("controlvid_tracked_affiliate_id") || localStorage.getItem("viralflow_tracked_affiliate_id");
      if (trackedAffId) {
        const subVal = getSubtotalPrice();
        const subtotal = typeof subVal === "number" ? subVal : (subVal === "Custom" ? 0 : parseFloat(subVal));
        await trackAffiliateSale(trackedAffId, activeUserEmail, subtotal);
        console.log(`[Affiliate System] Captured affiliate ID: ${trackedAffId} during checkout. Split-revenue transaction logged.`);
      }

      setSuccessMessage(`🎉 Welcome to ${selectedPlan.name}! Your transaction was successfully processed. Your subscription is active and credits have been provisioned.`);
      
      // Refresh local user state
      const users = await getUsers();
      const user = users.find(u => u.email.toLowerCase() === activeUserEmail.toLowerCase());
      if (user) {
        setCurrentUser(user);
      }
    } catch (err: any) {
      console.error("Purchase execution error:", err);
      setPurchaseError(err.message || "Checkout failed. Please try again.");
    } finally {
      setPurchasing(false);
    }
  };

  return (
    <div id="pricing-plans-view" className="min-h-screen bg-[#121212] text-white flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none">
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col items-center justify-center">
        
        {/* Gated Alert Notice */}
        {gatedNotice && currentStep === 1 && (
          <div className="w-full max-w-3xl mb-10 bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-start gap-4">
            <ShieldAlert className="h-6 w-6 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold font-mono text-red-200 uppercase tracking-wider">
                Access Gated: Active Subscription Required
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                You currently do not have an active subscription tier configured. Select one of our professional pricing plans below to proceed directly into the ControlVid suite!
              </p>
            </div>
          </div>
        )}

        {/* Success Page/Banner */}
        {successMessage ? (
          <div className="w-full max-w-2xl bg-[#242424] border border-emerald-500/20 rounded-3xl p-8 text-center space-y-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 h-24 w-24 bg-emerald-500/5 rounded-bl-full" />
            <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black uppercase font-display text-white tracking-tight">Checkout Completed</h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto font-sans leading-relaxed">
                {successMessage}
              </p>
            </div>

            <div className="p-4 bg-[#242424]/40 rounded-2xl border border-slate-900 text-left space-y-3 max-w-md mx-auto">
              <div className="flex justify-between items-center border-b border-slate-900 pb-2.5">
                <span className="text-[10px] font-mono text-slate-500 uppercase">Configured Tier</span>
                <span className="text-xs font-black text-white uppercase">{selectedPlan.name}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-900 pb-2.5">
                <span className="text-[10px] font-mono text-slate-500 uppercase">Billing Cycle</span>
                <span className="text-xs font-black text-white uppercase">{billingCycle}</span>
              </div>
              {selectedAddOnKey && (
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Optional Booster</span>
                  <span className="text-xs font-black text-[#38bdf8] uppercase">
                    +{addOns[selectedAddOnKey].credits} DM Credits
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3.5 bg-gradient-to-r from-[#38bdf8] to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-mono text-xs font-black uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-lg hover:shadow-[#38bdf8]/25 active:scale-98"
            >
              Enter ControlVid Workspace
            </button>
          </div>
        ) : (
          <>
            {/* Absolute Close/Back button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-slate-400 hover:text-white flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider bg-slate-900/60 hover:bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg transition-all cursor-pointer select-none z-[100]"
            >
              <span>Close</span>
              <span className="text-sm">×</span>
            </button>

            {/* Transaction Errors */}
            {purchaseError && (
              <div className="w-full max-w-3xl mb-8 bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 flex items-start gap-4">
                <ShieldAlert className="h-6 w-6 text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold font-mono text-rose-200 uppercase tracking-wider">
                    Transaction Blocked
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {purchaseError}
                  </p>
                </div>
              </div>
            )}

            {/* =======================================================
                STEP 1: SELECT MAIN TIER (select_main_tier)
                ======================================================= */}
            {currentStep === 1 && (
              <div className="w-full space-y-12">
                
                {/* Titles */}
                <div className="text-center max-w-3xl mx-auto">
                  <span className="text-[11px] font-mono font-black uppercase bg-[#38bdf8]/10 border border-[#38bdf8]/15 px-3 py-1 rounded-full tracking-widest" style={{ color: "#FFFFFF" }}>
                    ControlVid subscription plans
                  </span>
                  <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight uppercase leading-tight" style={{ color: "#FFFFFF" }}>
                    Transparent, Performance-Driven Tiers
                  </h1>
                  <p className="mt-4 text-sm font-sans leading-relaxed max-w-xl mx-auto" style={{ color: "#FFFFFF" }}>
                    Scale your faceless channel script engine. All plans natively support Viral Shorts (15s-60s) and Long-form Video creation (2-10 minutes)!
                  </p>

                  {/* Billing Cycle Toggle */}
                  <div className="mt-8 flex items-center justify-center gap-4">
                    <span className="text-xs font-bold uppercase tracking-wider transition-colors" style={{ color: "#FFFFFF" }}>
                      Monthly Billing
                    </span>
                    <button
                      onClick={() => setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")}
                      className="h-6 w-11 bg-slate-800 hover:bg-slate-700 rounded-full relative p-0.5 transition-all focus:outline-none cursor-pointer border border-slate-700"
                    >
                      <div className={`h-4.5 w-4.5 bg-[#38bdf8] rounded-full shadow-md transition-all ${billingCycle === "annual" ? "translate-x-5" : "translate-x-0"}`} />
                    </button>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold uppercase tracking-wider transition-colors" style={{ color: "#FFFFFF" }}>
                        Annual Billing
                      </span>
                      <span className="bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono font-black px-2 py-0.5 rounded-full uppercase" style={{ color: "#FFFFFF" }}>
                        Save ~10%
                      </span>
                    </div>
                  </div>

                  {/* Video Lengths rows */}
                  <div className="mt-6 flex flex-col items-center gap-3">
                    {/* Row 1: Viral Shorts */}
                    <div className="flex flex-wrap justify-center items-center gap-2">
                      <span className="text-xs font-mono font-black uppercase tracking-widest" style={{ color: "#FFFFFF" }}>
                        Viral Shorts:
                      </span>
                      {["15s", "30s", "45s", "60s"].map((len) => (
                        <span key={len} className="inline-flex items-center gap-1 bg-slate-900 border border-slate-800 text-xs font-mono font-bold px-2.5 py-1 rounded-lg" style={{ color: "#FFFFFF" }}>
                          <Clock className="h-3 w-3 text-[#38bdf8]" />
                          {len}
                        </span>
                      ))}
                    </div>
                    {/* Row 2: Long-form */}
                    <div className="flex justify-center items-center gap-2">
                      <span className="text-xs font-mono font-black uppercase tracking-widest" style={{ color: "#FFFFFF" }}>
                        Long-form:
                      </span>
                      <span className="inline-flex items-center gap-1 bg-slate-900 border border-slate-800 text-xs font-mono font-bold px-2.5 py-1 rounded-lg" style={{ color: "#FFFFFF" }}>
                        <Clock className="h-3 w-3 text-[#38bdf8]" />
                        2-10 Minutes
                      </span>
                    </div>
                  </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-stretch w-full max-w-7xl mx-auto">
                  {plans.map((plan, idx) => {
                    const displayPrice = plan.monthlyPrice === "Custom"
                      ? "Custom"
                      : billingCycle === "annual" 
                        ? `$${plan.annualMonthlyRate}` 
                        : `$${plan.monthlyPrice}`;

                    return (
                      <div
                        key={idx}
                        className={`bg-[#111113]/90 backdrop-blur-md rounded-2xl p-5 border ${plan.color} flex flex-col justify-between relative transition-all duration-300 hover:translate-y-[-4px]`}
                      >
                        {plan.popular && (
                          <span className="absolute top-0 right-1/2 translate-x-1/2 translate-y-[-50%] bg-[#38bdf8] text-white font-mono text-[9px] font-black uppercase tracking-widest px-4 py-1 rounded-full whitespace-nowrap">
                            MOST POPULAR
                          </span>
                        )}

                        <div>
                          {/* Header */}
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-sm sm:text-base font-black font-display text-white uppercase tracking-wider" style={{ color: "#FFFFFF" }}>
                                {plan.name}
                              </h3>
                            </div>
                            
                            {/* Icon Wrappers */}
                            <div className="flex items-center justify-center">
                              {plan.iconType === "floating_sparkle_animation" && (
                                <div className="text-cyan-400 animate-bounce p-1 bg-cyan-400/10 rounded-full">
                                  <Sparkles className="h-4 w-4" />
                                </div>
                              )}
                              {plan.iconType === "glassmorphism_growth_graph" && (
                                <div className="text-emerald-400 p-1.5 bg-white/5 border border-white/10 backdrop-blur-md rounded-lg shadow-md">
                                  <TrendingUp className="h-4 w-4" />
                                </div>
                              )}
                              {plan.iconType === "dynamic_rocket" && (
                                <div className="text-rose-500 -rotate-12 transition-transform hover:scale-110 p-1 bg-rose-500/10 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                                  <Rocket className="h-4 w-4" />
                                </div>
                              )}
                              {plan.iconType === "glowing_crown_diamond" && (
                                <div className="text-amber-400 p-1 bg-amber-400/15 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                                  <Crown className="h-4 w-4" />
                                </div>
                              )}
                              {plan.iconType === "complex_organizational_structure" && (
                                <div className="text-purple-400 p-1 bg-purple-500/10 rounded-full">
                                  <Network className="h-4 w-4" />
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Pricing Area */}
                          <div className="flex items-baseline text-white mb-6 border-b border-slate-900/60 pb-5">
                            <span className="text-4xl sm:text-5xl font-black tracking-tight font-display text-[#38bdf8]">
                              {displayPrice}
                            </span>
                            {plan.monthlyPrice !== "Custom" && (
                              <span className="ml-1 text-sm font-semibold font-sans" style={{ color: "#FFFFFF" }}>
                                /mo
                              </span>
                            )}
                          </div>

                          {/* Features List */}
                          <ul className="space-y-3 mb-6 text-left">
                            {(billingCycle === "annual" && plan.annualFeatures ? plan.annualFeatures : plan.features).map((feature, fIdx) => (
                              <li key={fIdx} className="flex items-start gap-2 text-xs font-sans leading-tight">
                                <Check className="h-4 w-4 text-[#38bdf8] flex-shrink-0 mt-0.5" />
                                <span 
                                  style={{
                                    fontWeight: fIdx === 0 ? "bold" : "normal",
                                    color: fIdx === 0 ? "#F8F9FA" : "#FFFFFF"
                                  }}
                                  className={fIdx === 0 ? "font-sans" : ""}
                                >
                                  {feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Action Button */}
                        <div>
                          {(() => {
                            const targetUrl = (billingCycle === "annual" && plan.annualCheckoutUrl) ? plan.annualCheckoutUrl : plan.checkoutUrl;
                            const isAnnual = billingCycle === "annual";
                            return targetUrl ? (
                              <a
                                href={targetUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="checkout-btn w-full py-3 rounded-xl text-center text-xs font-mono font-black uppercase tracking-widest transition-all cursor-pointer select-none active:scale-97 flex items-center justify-center gap-2 no-underline"
                                onClick={() => {
                                  handleSelectPlanNext(plan.name);
                                }}
                              >
                                <span>SELECT {plan.name.toUpperCase()} {isAnnual ? "ANNUAL" : ""} &rarr;</span>
                              </a>
                            ) : (
                              <button
                                onClick={() => handleSelectPlanNext(plan.name)}
                                style={{
                                  backgroundColor: plan.popular ? "#38bdf8" : "transparent",
                                  color: plan.popular ? "#000000" : "#FFFFFF"
                                }}
                                className={`w-full py-3 rounded-xl text-center text-xs font-mono font-black uppercase tracking-widest transition-all cursor-pointer select-none active:scale-97 border ${
                                  plan.popular
                                    ? "border-[#38bdf8] hover:bg-[#38bdf8]/85 hover:shadow-[0_0_20px_rgba(56, 189, 248, 0.2)] text-black"
                                    : "border-slate-800 hover:border-slate-600 bg-white/[0.02] hover:bg-white/[0.05]"
                                } flex items-center justify-center gap-2`}
                              >
                                <span>SELECT {plan.name.toUpperCase()} {isAnnual ? "ANNUAL" : ""} &rarr;</span>
                              </button>
                            );
                          })()}
                        </div>
                      </div>
                    );
                  })}
                </div>


              </div>
            )}

            {/* =======================================================
                STEP 2: OFFER OPTIONAL DM AUTOMATION ADD-ON (offer_dm_automation_add_on)
                ======================================================= */}
            {currentStep === 2 && selectedPlanName !== "Enterprise" && (
              <div className="w-full max-w-4xl mx-auto text-center space-y-10">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 bg-[#38bdf8]/10 border border-[#38bdf8]/20 px-3 py-1 rounded-full text-[10px] font-mono uppercase text-[#38bdf8] tracking-wider font-bold">
                    {isDMAutomationRoute ? "⚡ FACEBOOK & INSTAGRAM AUTOMATION CREDIT PACKAGES" : "⚡ STEP 2: FACEBOOK & INSTAGRAM AUTOMATION ADD-ON"}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight uppercase">
                    {isDMAutomationRoute ? "Facebook & Instagram DM Automation Credit Packages" : "Optional Facebook & Instagram DM Automation Credits"}
                  </h2>
                  <p className="text-xs text-slate-400 max-w-xl mx-auto font-sans leading-relaxed">
                    {isDMAutomationRoute 
                      ? "Select a high-capacity Facebook & Instagram DM automation credit booster package to scale your inbound auto-responder loops."
                      : <>You have selected the <strong className="text-[#38bdf8]">{selectedPlan.name} Plan</strong>. Would you like to supercharge your conversion loops with optional one-time Facebook & Instagram automated direct-message response credits?</>}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                  {/* Option 1: starter_dm */}
                  <div 
                    onClick={() => setSelectedAddOnKey(selectedAddOnKey === "starter_dm" ? null : "starter_dm")}
                    className={`bg-[#0A0A0C] border p-6 rounded-2xl flex flex-col justify-between items-center text-center transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                      selectedAddOnKey === "starter_dm" ? "border-[#38bdf8] shadow-[0_0_20px_rgba(56, 189, 248, 0.1)] bg-[#0C0F15]" : "border-slate-900 hover:border-slate-800"
                    }`}
                  >
                    <div className="absolute top-3 right-3 h-5 w-5 rounded-full border flex items-center justify-center transition-all">
                      {selectedAddOnKey === "starter_dm" ? (
                        <div className="h-2.5 w-2.5 bg-[#38bdf8] rounded-full" />
                      ) : (
                        <div className="h-2.5 w-2.5 rounded-full bg-transparent" />
                      )}
                    </div>

                    <div className="space-y-4 pt-4">
                      <span className="text-[9px] font-mono font-black text-[#38bdf8] bg-[#38bdf8]/10 border border-[#38bdf8]/20 px-2 py-0.5 rounded uppercase tracking-widest inline-block">
                        Facebook & Instagram Automation
                      </span>
                      <h3 className="text-xl font-black font-display text-white uppercase tracking-tight">500 Lead Interaction Credits</h3>
                      <p className="text-xs text-slate-300 font-sans leading-relaxed">
                        {addOns.starter_dm.description}
                      </p>
                      <div className="text-4xl font-black text-[#38bdf8]">
                        $29 <span className="text-xs text-slate-500 font-sans font-normal uppercase tracking-wide">one-time</span>
                      </div>
                    </div>
                  </div>

                  {/* Option 2: pro_dm */}
                  <div 
                    onClick={() => setSelectedAddOnKey(selectedAddOnKey === "pro_dm" ? null : "pro_dm")}
                    className={`bg-[#0A0A0C] border p-6 rounded-2xl flex flex-col justify-between items-center text-center transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                      selectedAddOnKey === "pro_dm" ? "border-[#38bdf8] shadow-[0_0_20px_rgba(56, 189, 248, 0.1)] bg-[#0C0F15]" : "border-slate-900 hover:border-slate-800"
                    }`}
                  >
                    <div className="absolute top-0 left-0 bg-amber-400 text-black text-[8px] font-mono font-black uppercase px-3 py-1 rounded-br-xl tracking-wider">
                      Best Value
                    </div>

                    <div className="absolute top-3 right-3 h-5 w-5 rounded-full border flex items-center justify-center transition-all">
                      {selectedAddOnKey === "pro_dm" ? (
                        <div className="h-2.5 w-2.5 bg-[#38bdf8] rounded-full" />
                      ) : (
                        <div className="h-2.5 w-2.5 rounded-full bg-transparent" />
                      )}
                    </div>

                    <div className="space-y-4 pt-4">
                      <span className="text-[9px] font-mono font-black text-[#38bdf8] bg-[#38bdf8]/10 border border-[#38bdf8]/20 px-2 py-0.5 rounded uppercase tracking-widest inline-block">
                        Facebook & Instagram Automation
                      </span>
                      <h3 className="text-xl font-black font-display text-white uppercase tracking-tight">3,000 Lead Interaction Credits</h3>
                      <p className="text-xs text-slate-300 font-sans leading-relaxed">
                        {addOns.pro_dm.description}
                      </p>
                      <div className="text-4xl font-black text-[#38bdf8]">
                        $129 <span className="text-xs text-slate-500 font-sans font-normal uppercase tracking-wide">one-time</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Explicit Credit Consumption Notice */}
                <div className="max-w-2xl mx-auto p-3.5 bg-slate-900/60 border border-white/10 rounded-xl text-center text-[11px] font-sans text-slate-300">
                  <span className="font-bold text-[#38bdf8]">💡 How Interaction Credits Work:</span> 1 credit is consumed <strong>ONLY when a new lead triggers a successful interaction (via keyword match)</strong>. All subsequent follow-up messages in the same conversation do <u>NOT</u> consume any additional credits.
                </div>

                {/* Continue/Skip Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto pt-6">
                  <button
                    onClick={() => {
                      setSelectedAddOnKey(null);
                      setCurrentStep(3);
                    }}
                    className="w-full py-3 bg-transparent hover:bg-white/5 border border-slate-800 text-slate-400 hover:text-white font-mono text-[10px] uppercase font-black rounded-xl transition-all cursor-pointer"
                  >
                    Skip Add-Ons
                  </button>

                  <button
                    onClick={() => setCurrentStep(3)}
                    className="w-full py-3 bg-[#38bdf8] hover:bg-[#38bdf8]/85 text-white font-mono text-[10px] uppercase font-black rounded-xl transition-all cursor-pointer shadow-lg hover:shadow-[#38bdf8]/20 flex items-center justify-center gap-2 font-bold"
                  >
                    <span>Continue to Checkout</span>
                    <ArrowRight className="h-3.5 w-3.5 text-white" />
                  </button>
                </div>
              </div>
            )}

            {/* =======================================================
                STEP 3: SECURE CHECKOUT (checkout)
                ======================================================= */}
            {currentStep === 3 && (
              <div className="w-full max-w-2xl mx-auto space-y-10">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-[10px] font-mono uppercase text-emerald-400 tracking-wider font-bold">
                    🔒 STEP 3: SECURE CHECKOUT
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight uppercase">
                    Review and Confirm
                  </h2>
                  <p className="text-xs text-slate-400 font-sans">
                    Your sandbox environment will simulate a live secure Whop checkout transition.
                  </p>
                </div>

                {selectedPlanName === "Enterprise" ? (
                  /* Enterprise Custom Checkout Spec */
                  <div className="bg-[#111113]/90 border border-slate-900 rounded-3xl p-8 space-y-6">
                    <div className="flex items-center gap-3 border-b border-slate-900 pb-5">
                      <div className="h-10 w-10 bg-purple-500/10 border border-purple-500/25 rounded-xl flex items-center justify-center text-purple-400">
                        <Network className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-black">Plan Selected</span>
                        <h3 className="text-base font-black text-white font-display uppercase tracking-tight">Enterprise Custom</h3>
                      </div>
                    </div>

                    <div className="text-left space-y-4 text-xs font-sans text-slate-300">
                      <p>
                        Our specialized engineering team coordinates with fast-growing brands to design custom script workflows, custom SLA response parameters, and raw logs exporting routines.
                      </p>
                      <div className="p-4 bg-[#242424]/50 border border-slate-900 rounded-2xl flex flex-col gap-2 font-mono">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Contact Email:</span>
                          <span className="text-amber-400 font-bold">{activeUserEmail || "No logged-in user"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Video Credits:</span>
                          <span className="text-white">Custom / Unlimited</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Support concept:</span>
                          <span className="text-white">Dedicated SLA engineer</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleCompleteCheckout}
                      disabled={purchasing}
                      className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-mono text-xs font-black uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-600/20 active:scale-98 disabled:opacity-50 font-black"
                    >
                      {purchasing ? (
                        <span className="flex items-center gap-1.5">
                          <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          SENDING ENQUIRY...
                        </span>
                      ) : (
                        <>
                          <span>SUBMIT CUSTOM ENTERPRISE REQUEST</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  /* Standard Subscription Checkout Spec */
                  <div className="bg-[#111113]/90 border border-slate-900 rounded-3xl p-6 sm:p-8 space-y-6">
                    {/* Invoice Receipt Header */}
                    <div className="flex items-center justify-between border-b border-slate-900 pb-5">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-[#38bdf8]/10 border border-[#38bdf8]/25 rounded-xl flex items-center justify-center text-[#38bdf8]">
                          <ShoppingBag className="h-5 w-5" />
                        </div>
                        <div className="text-left">
                          <span className="text-[10px] font-mono text-slate-500 uppercase block font-black">Plan Breakdown</span>
                          <h3 className="text-base font-black text-white font-display uppercase tracking-tight">{selectedPlan.name} Plan</h3>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] font-mono text-slate-500 uppercase block">Billing Mode</span>
                        <span className="text-xs font-black text-cyan-400 uppercase tracking-wide bg-cyan-950/20 border border-cyan-900/30 px-2 py-0.5 rounded-md">
                          {billingCycle}
                        </span>
                      </div>
                    </div>

                    {/* Receipt Items */}
                    <div className="space-y-4 text-xs font-sans text-slate-300">
                      {/* Plan Row */}
                      <div className="flex justify-between items-center bg-[#242424]/40 p-3 rounded-xl border border-slate-900">
                        <div className="text-left">
                          <p className="font-bold text-white uppercase font-mono tracking-tight text-xs">{selectedPlan.name} Subscription</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">
                            {billingCycle === "annual" && selectedPlan.annualVideosCredits
                              ? selectedPlan.annualVideosCredits
                              : `${selectedPlan.videosCredits} / mo`}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-white">${getSubtotalPrice()}</p>
                          {billingCycle === "annual" && (
                            <p className="text-[9px] text-emerald-400 font-mono">Billed annually as ${getSubtotalPrice()}</p>
                          )}
                        </div>
                      </div>

                      {/* Add-On Row */}
                      {selectedAddOnKey ? (
                        <div className="flex justify-between items-center bg-[#242424]/40 p-3 rounded-xl border border-slate-900">
                          <div className="text-left">
                            <p className="font-bold text-[#38bdf8] uppercase font-mono tracking-tight text-xs">{addOns[selectedAddOnKey].name}</p>
                            <p className="text-[10px] text-slate-500 mt-0.5">+{addOns[selectedAddOnKey].credits} automated response credits</p>
                          </div>
                          <div className="text-right">
                            <p className="font-black text-white">${addOns[selectedAddOnKey].price}</p>
                            <p className="text-[9px] text-slate-500 font-mono">One-time add-on</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center p-3 text-slate-500 font-mono text-[10px]">
                          <span>No additional booster add-ons selected</span>
                          <span>—</span>
                        </div>
                      )}

                      {/* Line Separator */}
                      <div className="border-t border-slate-900 pt-4 flex justify-between items-center font-display">
                        <span className="text-sm font-black text-white uppercase tracking-wider">Total Due Now:</span>
                        <span className="text-2xl font-black text-[#38bdf8]">${getTotalPrice()}</span>
                      </div>
                    </div>

                    {/* Submit Checkout Button */}
                    <button
                      onClick={handleCompleteCheckout}
                      disabled={purchasing}
                      className="w-full py-4 bg-[#38bdf8] hover:bg-[#38bdf8]/90 text-black font-mono text-xs font-black uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg hover:shadow-[#38bdf8]/25 active:scale-98 disabled:opacity-50 font-black border-none focus:outline-none"
                    >
                      {purchasing ? (
                        <span className="flex items-center gap-1.5">
                          <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          PROCESSING TRANSACTION...
                        </span>
                      ) : (
                        <>
                          <span>COMPLETE SECURE DEMO CHECKOUT</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* Security / Trust Badges */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-xs font-mono text-white border-t border-white/[0.04] pt-8 w-full max-w-3xl font-bold">
          <div className="flex items-center gap-1.5">
            <Lock className="h-4 w-4 text-emerald-500" />
            <span className="text-white">SECURE 256-BIT WHOP CHECKOUT</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span className="text-white">100% SATISFACTION GUARANTEED</span>
          </div>
        </div>

      </div>

      <footer className="w-full text-center mt-12 text-[10px] text-white font-mono tracking-wider uppercase">
        ControlVid.ai © 2026. All Rights Reserved.
      </footer>
    </div>
  );
}
