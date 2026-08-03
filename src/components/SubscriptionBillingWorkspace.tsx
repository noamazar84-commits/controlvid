import React from "react";
import { CreditCard, Calendar, ShieldCheck, Zap, CheckCircle2 } from "lucide-react";

interface SubscriptionBillingWorkspaceProps {
  activeUser: any;
  isSubscriptionCancelled: boolean;
  setIsSubscriptionCancelled: (val: boolean) => void;
  setShowCancelModal: (val: boolean) => void;
  onUpgradeClick: (planName?: string) => void;
  setRecentToast: (toast: { message: string; sub: string }) => void;
}

export interface SubscriptionTier {
  name: string;
  price: number;
  annualPrice: number;
  credits: string;
  shadowChannelsCount: number;
  shadowChannelsLabel: string;
  analyticsLabel: string;
  supportLabel: string;
  features: string[];
  popular?: boolean;
}

export const ALL_TIERS: SubscriptionTier[] = [
  {
    name: "Spark",
    price: 39,
    annualPrice: 35,
    credits: "60 Credits/video/minutes",
    shadowChannelsCount: 1,
    shadowChannelsLabel: "1 Shadow Channel",
    analyticsLabel: "Basic Analytics: Video Views Tracking",
    supportLabel: "Self-service support",
    features: [
      "60 Credits/video/minutes limit",
      "1 Shadow Channel broadcaster",
      "Bulk Scheduler & One-Click Generation",
      "Basic Video Analytics",
      "Self-service support"
    ],
    popular: false
  },
  {
    name: "Growth",
    price: 79,
    annualPrice: 70,
    credits: "120 Credits/video/minutes",
    shadowChannelsCount: 4,
    shadowChannelsLabel: "4 Shadow Channels",
    analyticsLabel: "Advanced Analytics: Retention & Drop-off",
    supportLabel: "Knowledge base support",
    features: [
      "120 Credits/video/minutes limit",
      "4 Shadow Channels broadcaster",
      "Bulk Scheduler & One-Click Generation",
      "Advanced Video Analytics",
      "Knowledge base support"
    ],
    popular: false
  },
  {
    name: "Velocity",
    price: 119,
    annualPrice: 105,
    credits: "190 Credits/video/minutes",
    shadowChannelsCount: 5,
    shadowChannelsLabel: "5 Shadow Channels",
    analyticsLabel: "Detailed Analytics: CTR & Conversions",
    supportLabel: "Extended automation support",
    features: [
      "190 Credits/video/minutes limit",
      "5 Shadow Channels broadcaster",
      "Bulk Scheduler & One-Click Generation",
      "Detailed Analytics Suite",
      "Extended automation support"
    ],
    popular: true
  },
  {
    name: "Empire",
    price: 219,
    annualPrice: 200,
    credits: "300 Credits/video/minutes",
    shadowChannelsCount: 8,
    shadowChannelsLabel: "8 Shadow Channels",
    analyticsLabel: "Premium Analytics: Heatmaps & Performance",
    supportLabel: "Priority automation desk",
    features: [
      "300 Credits/video/minutes limit",
      "8 Shadow Channels broadcaster",
      "Bulk Scheduler & One-Click Generation",
      "Premium Analytics Suite",
      "Priority automation desk"
    ],
    popular: false
  }
];

export default function SubscriptionBillingWorkspace({
  activeUser,
  isSubscriptionCancelled,
  setIsSubscriptionCancelled,
  setShowCancelModal,
  onUpgradeClick,
  setRecentToast
}: SubscriptionBillingWorkspaceProps) {
  const rawUserTier = activeUser?.subscription_tier || "Spark";
  
  // Default to Spark tier ($39/mo, 60 credits limit) unless explicitly matching another tier
  const activeTierObj = ALL_TIERS.find(
    t => rawUserTier.toLowerCase().includes(t.name.toLowerCase()) || t.name.toLowerCase().includes(rawUserTier.toLowerCase())
  ) || ALL_TIERS[0]; // Default Spark ($39)

  const planTier = activeTierObj.name;
  const userEmail = activeUser?.email || "creator@viralflow.ai";

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-[fadeIn_0.2s_ease-out] text-left font-sans">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#18181C] border border-white/10 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#38bdf8]/15 border border-[#38bdf8]/30 text-[#38bdf8]">
            <CreditCard className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white uppercase tracking-wider">
              Subscription & Billing
            </h1>
            <p className="text-xs text-slate-400 font-sans">
              Account: <strong className="text-slate-200">{userEmail}</strong>
            </p>
          </div>
        </div>

        <div className={`px-3 py-1.5 rounded-xl border text-xs font-black uppercase tracking-wider flex items-center gap-2 self-start sm:self-auto ${
          isSubscriptionCancelled 
            ? "bg-amber-500/15 text-amber-400 border-amber-500/30" 
            : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
        }`}>
          <span className={`h-2 w-2 rounded-full ${isSubscriptionCancelled ? "bg-amber-400 animate-pulse" : "bg-emerald-400"}`} />
          {isSubscriptionCancelled ? "Cancellation Pending" : "Payment Status: Active"}
        </div>
      </div>

      {/* Main Active Plan Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#18181C] border border-white/10 space-y-6 shadow-2xl">
        {/* Tier Header & Pricing */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#38bdf8]" />
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Current Active Plan</span>
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-wider">
              {planTier} Tier
            </h2>
          </div>

          <div className="text-left sm:text-right">
            <div className="text-3xl font-black font-mono text-[#38bdf8]">
              ${activeTierObj.price}.00<span className="text-xs font-sans text-slate-400 font-normal">/month</span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              Includes {activeTierObj.credits.split("-")[0].trim()}
            </span>
          </div>
        </div>

        {/* Renewal & Billing Info */}
        <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-[#38bdf8]">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                {isSubscriptionCancelled ? "Access Expiration Date" : "Next Renewal Date"}
              </span>
              <span className="text-sm font-bold font-mono text-white">
                August 22, 2026
              </span>
            </div>
          </div>

          <div className="text-xs text-slate-300 font-mono">
            {isSubscriptionCancelled ? (
              <span className="text-amber-400">Retain full access until Aug 22, 2026</span>
            ) : (
              <span>Auto-renewing at ${activeTierObj.price}.00/mo</span>
            )}
          </div>
        </div>

        {/* Included Core Features */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            Plan Features & Limits
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {activeTierObj.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-medium text-slate-200">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Core Actions Only */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={() => onUpgradeClick(planTier)}
            className="w-full sm:flex-1 py-3 px-5 bg-[#38bdf8] hover:bg-[#0284c7] text-black font-black rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-[#38bdf8]/20 flex items-center justify-center gap-2"
          >
            <Zap className="h-4 w-4 fill-black" />
            <span>Upgrade Plan</span>
          </button>

          {!isSubscriptionCancelled ? (
            <button
              type="button"
              onClick={() => setShowCancelModal(true)}
              className="w-full sm:w-auto py-3 px-5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-xl text-xs font-bold transition-all cursor-pointer uppercase tracking-wider text-center"
            >
              Cancel Subscription
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setIsSubscriptionCancelled(false);
                setRecentToast({
                  message: "Subscription Reactivated",
                  sub: `Your ${planTier} plan auto-renewal is active for August 22, 2026.`
                });
              }}
              className="w-full sm:w-auto py-3 px-5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40 rounded-xl text-xs font-black transition-all cursor-pointer uppercase tracking-wider text-center"
            >
              Reactivate Plan
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
