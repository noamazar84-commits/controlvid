import { useState } from "react";
import { ChevronDown, Shield, Check, ArrowUpRight, Eye, Activity, TrendingUp, Zap, BarChart3, Layers, Sparkles, Filter, Calendar } from "lucide-react";

interface AnalyticsDashboardProps {
  userEmail: string;
  userTier: string;
  onUpgradeClick?: (planName?: string) => void;
}

interface ChannelMetric {
  id: string;
  name: string;
  platform: "TikTok" | "Instagram Reels" | "YouTube Shorts";
  status: "Active" | "Optimizing" | "Scaling";
  views: number;
  engagement: string;
  score: number;
  ctr: string;
  retention: string;
  monthlyRevenue: string;
  topHook: string;
}

const MOCK_CHANNELS: ChannelMetric[] = [
  {
    id: "ch-1",
    name: "Dark Psychology Loop",
    platform: "TikTok",
    status: "Active",
    views: 1420500,
    engagement: "14.2%",
    score: 96,
    ctr: "9.8%",
    retention: "88%",
    monthlyRevenue: "$3,420.00",
    topHook: "If someone looks at your lips during a conversation..."
  },
  {
    id: "ch-2",
    name: "Wealth Secrets Unlocked",
    platform: "YouTube Shorts",
    status: "Scaling",
    views: 980200,
    engagement: "11.6%",
    score: 92,
    ctr: "8.4%",
    retention: "82%",
    monthlyRevenue: "$2,850.00",
    topHook: "The 1% never use savings accounts, here is what they do..."
  },
  {
    id: "ch-[#38bdf8]",
    name: "Biohacking Playbook",
    platform: "Instagram Reels",
    status: "Active",
    views: 745000,
    engagement: "9.8%",
    score: 88,
    ctr: "7.9%",
    retention: "79%",
    monthlyRevenue: "$1,940.00",
    topHook: "Drink this within 15 minutes of waking up to double cortisol response..."
  },
  {
    id: "ch-4",
    name: "Toxic Boss Stories",
    platform: "TikTok",
    status: "Optimizing",
    views: 620100,
    engagement: "15.8%",
    score: 90,
    ctr: "11.2%",
    retention: "85%",
    monthlyRevenue: "$1,620.00",
    topHook: "My boss threatened to fire me unless I signed this agreement..."
  },
  {
    id: "ch-5",
    name: "Stoic Mindset Clips",
    platform: "YouTube Shorts",
    status: "Active",
    views: 510400,
    engagement: "8.4%",
    score: 84,
    ctr: "6.8%",
    retention: "74%",
    monthlyRevenue: "$1,150.00",
    topHook: "Marcus Aurelius wrote this private note in his tent..."
  },
  {
    id: "ch-6",
    name: "Cyber Security Leaks",
    platform: "TikTok",
    status: "Active",
    views: 430900,
    engagement: "10.5%",
    score: 86,
    ctr: "7.4%",
    retention: "78%",
    monthlyRevenue: "$980.00",
    topHook: "Check if your email is on this hidden database right now..."
  },
  {
    id: "ch-7",
    name: "AI Tool Reviews",
    platform: "Instagram Reels",
    status: "Scaling",
    views: 390200,
    engagement: "12.1%",
    score: 89,
    ctr: "8.9%",
    retention: "81%",
    monthlyRevenue: "$890.00",
    topHook: "Stop paying $20/month for ChatGPT, use this free alternative..."
  },
  {
    id: "ch-8",
    name: "E-Com Product Viral",
    platform: "TikTok",
    status: "Active",
    views: 310800,
    engagement: "13.4%",
    score: 91,
    ctr: "10.5%",
    retention: "86%",
    monthlyRevenue: "$2,100.00",
    topHook: "I spent $500 testing this weird Amazon gadget so you don't have to..."
  }
];

export default function AnalyticsDashboard({ userEmail, userTier, onUpgradeClick }: AnalyticsDashboardProps) {
  const isAdmin = true; // Unconditional admin access to all analytics packages
  
  // Default to Empire plan view to show everything
  const [activeTier, setActiveTier] = useState<string>("Empire");
  const [showAdminDropdown, setShowAdminDropdown] = useState<boolean>(false);
  const [timeframe, setTimeframe] = useState<"7d" | "30d" | "90d" | "all">("30d");

  const getTierRank = (tierName: string): number => {
    const t = tierName.toLowerCase();
    if (t.includes("empire")) return 4;
    if (t.includes("velocity")) return 3;
    if (t.includes("growth")) return 2;
    return 1; // Spark
  };

  const rank = getTierRank(activeTier);

  const selectTier = (tier: string) => {
    setActiveTier(tier);
    setShowAdminDropdown(false);
  };

  // KPI Calculations
  const visibleChannelsCount = rank === 1 ? 3 : rank === 2 ? 4 : rank === 3 ? 5 : MOCK_CHANNELS.length;
  const activeChannels = MOCK_CHANNELS.slice(0, visibleChannelsCount);
  const totalViews = activeChannels.reduce((sum, c) => sum + c.views, 0);
  const avgCtr = (activeChannels.reduce((sum, c) => sum + parseFloat(c.ctr), 0) / activeChannels.length).toFixed(1);
  const avgScore = Math.round(activeChannels.reduce((sum, c) => sum + c.score, 0) / activeChannels.length);

  return (
    <div className="w-full max-w-7xl mx-auto bg-[#121212] text-white p-4 sm:p-6 rounded-2xl border border-[#38bdf8]/20 space-y-6 pt-0 shadow-2xl relative font-sans overflow-x-hidden">
      
      {/* HEADER SECTION WITH ADMIN CONTROLLER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 pt-4 gap-3">
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-[#38bdf8] animate-pulse shadow-[0_0_8px_#38bdf8]" />
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-2">
              <span>System Analytics & Viral CTR Dashboard</span>
              {isAdmin && (
                <span className="text-[9px] font-mono font-black uppercase bg-[#38bdf8] text-black px-2 py-0.5 rounded shadow-[0_0_8px_rgba(56,189,248,0.3)]">
                  Admin Full View
                </span>
              )}
            </h2>
            <p className="text-[11px] text-slate-400 font-sans mt-0.5">
              Live automated performance tracking across short-form video channels
            </p>
          </div>
        </div>

        {/* Right side controls: Timeframe filter & Admin Tier Switcher */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="bg-[#18181b] border border-white/10 rounded-lg p-1 flex items-center gap-1">
            {(["7d", "30d", "90d", "all"] as const).map(tf => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded transition-all cursor-pointer ${
                  timeframe === tf ? "bg-[#38bdf8] text-black font-black" : "text-slate-400 hover:text-white"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {isAdmin && (
            <div className="relative">
              <button
                onClick={() => setShowAdminDropdown(!showAdminDropdown)}
                id="admin-dropdown-toggle"
                className="admin-mode-btn px-3 py-1.5 rounded-lg bg-[#1e293b] border border-[#38bdf8]/40 text-white font-sans text-xs font-black tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_12px_rgba(56,189,248,0.25)]"
              >
                <span>Plan: {activeTier}</span>
                <ChevronDown className="h-3 w-3 text-[#38bdf8]" />
              </button>

              {showAdminDropdown && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg bg-[#121212] border border-[#38bdf8]/30 shadow-2xl overflow-hidden z-50">
                  <div className="p-2 bg-black border-b border-white/5 font-sans text-[9px] text-slate-400 uppercase tracking-widest text-center font-bold">
                    Toggle Plan Level View
                  </div>
                  {["Spark", "Growth", "Velocity", "Empire"].map((tier) => (
                    <button
                      key={tier}
                      onClick={() => selectTier(tier)}
                      className={`w-full text-left px-4 py-2.5 font-sans text-xs font-bold transition-colors cursor-pointer block border-none focus:outline-none ${
                        activeTier.toLowerCase() === tier.toLowerCase()
                          ? "bg-[#38bdf8] text-black font-black"
                          : "text-white hover:bg-white/5"
                      }`}
                    >
                      {tier} {tier === "Empire" ? "(Full Suite)" : ""}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* TOP KPI CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-[#18181b]/80 border border-white/10 p-4 rounded-xl flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="font-mono font-bold uppercase tracking-wider text-[10px]">Total Organic Views</span>
            <Eye className="h-4 w-4 text-[#38bdf8]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
            {(totalViews * (timeframe === "7d" ? 0.35 : timeframe === "90d" ? 2.4 : timeframe === "all" ? 4.1 : 1)).toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono mt-1">
            <TrendingUp className="h-3 w-3" />
            <span>+24.8% vs last period</span>
          </div>
        </div>

        <div className="bg-[#18181b]/80 border border-white/10 p-4 rounded-xl flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="font-mono font-bold uppercase tracking-wider text-[10px]">Avg Click-Through (CTR)</span>
            <Zap className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
            {avgCtr}%
          </div>
          <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono mt-1">
            <TrendingUp className="h-3 w-3" />
            <span>High Retention Hook Active</span>
          </div>
        </div>

        <div className="bg-[#18181b]/80 border border-white/10 p-4 rounded-xl flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="font-mono font-bold uppercase tracking-wider text-[10px]">Active Channels</span>
            <Layers className="h-4 w-4 text-purple-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
            {visibleChannelsCount} <span className="text-xs text-slate-500 font-normal">/ {MOCK_CHANNELS.length}</span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-1">
            Tier: <span className="text-[#38bdf8] font-bold">{activeTier}</span>
          </div>
        </div>

        <div className="bg-[#18181b]/80 border border-white/10 p-4 rounded-xl flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="font-mono font-bold uppercase tracking-wider text-[10px]">Avg Retention Score</span>
            <Activity className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 tracking-tight">
            {avgScore}/100
          </div>
          <div className="text-[10px] text-emerald-400/80 font-mono mt-1">
            Viral Threshold Passed (80+)
          </div>
        </div>
      </div>

      {/* PLAN SELECTOR CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 plan-cards-grid">
        {/* Spark Card */}
        <div 
          onClick={() => setActiveTier("Spark")}
          className={`p-3 rounded-xl border transition-all cursor-pointer relative overflow-hidden bg-[#18181b] ${
            activeTier === "Spark" 
               ? "border-[#38bdf8] bg-[#38bdf8]/10 shadow-[0_0_15px_rgba(56,189,248,0.2)]" 
               : "border-white/10 hover:border-white/20"
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono font-black uppercase text-[#38bdf8]">
              Spark Plan
            </span>
            {activeTier === "Spark" && <Check className="h-3.5 w-3.5 text-[#38bdf8]" />}
          </div>
          <div className="text-xs font-bold text-white">Basic Analytics (3 Channels)</div>
        </div>

        {/* Growth Card */}
        <div 
          onClick={() => setActiveTier("Growth")}
          className={`p-3 rounded-xl border transition-all cursor-pointer relative overflow-hidden bg-[#18181b] ${
            activeTier === "Growth" 
               ? "border-[#38bdf8] bg-[#38bdf8]/10 shadow-[0_0_15px_rgba(56,189,248,0.2)]" 
               : "border-white/10 hover:border-white/20"
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono font-black uppercase text-[#38bdf8]">
              Growth Plan
            </span>
            {activeTier === "Growth" && <Check className="h-3.5 w-3.5 text-[#38bdf8]" />}
          </div>
          <div className="text-xs font-bold text-white">Advance Analytics (4 Channels)</div>
        </div>

        {/* Velocity Card */}
        <div 
          onClick={() => setActiveTier("Velocity")}
          className={`p-3 rounded-xl border transition-all cursor-pointer relative overflow-hidden bg-[#18181b] ${
            activeTier === "Velocity" 
               ? "border-[#38bdf8] bg-[#38bdf8]/10 shadow-[0_0_15px_rgba(56,189,248,0.2)]" 
               : "border-white/10 hover:border-white/20"
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono font-black uppercase text-[#38bdf8]">
              Velocity Plan
            </span>
            {activeTier === "Velocity" && <Check className="h-3.5 w-3.5 text-[#38bdf8]" />}
          </div>
          <div className="text-xs font-bold text-white">Detailed CTR Analytics (5 Channels)</div>
        </div>

        {/* Empire Card */}
        <div 
          onClick={() => setActiveTier("Empire")}
          className={`p-3 rounded-xl border transition-all cursor-pointer relative overflow-hidden bg-[#18181b] ${
            activeTier === "Empire" 
               ? "border-[#38bdf8] bg-[#38bdf8]/10 shadow-[0_0_15px_rgba(56,189,248,0.2)]" 
               : "border-white/10 hover:border-white/20"
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono font-black uppercase text-[#38bdf8] flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> Empire (Full)
            </span>
            {activeTier === "Empire" && <Check className="h-3.5 w-3.5 text-[#38bdf8]" />}
          </div>
          <div className="text-xs font-bold text-white">Premium Suite + Heatmaps (Unlimited)</div>
        </div>
      </div>

      {/* DISTINCT TABLE RENDERING blocks based on selected tier */}
      <div className="bg-[#18181b] border border-white/10 rounded-xl p-4 sm:p-6 shadow-[0_4px_30px_rgba(56,189,248,0.01)] space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-[#38bdf8]" />
            <h3 className="text-xs font-black uppercase tracking-wider text-white">
              {activeTier.toUpperCase()} CHANNEL PERFORMANCE METRICS
            </h3>
          </div>
          <span className="text-[10px] font-mono font-bold text-slate-400">
            Showing {activeChannels.length} of {MOCK_CHANNELS.length} connected channels
          </span>
        </div>

        {rank === 1 && <SparkTable channels={activeChannels} />}
        {rank === 2 && <GrowthTable channels={activeChannels} />}
        {rank === 3 && <Table_Velocity channels={activeChannels} />}
        {rank === 4 && <EmpireTable channels={activeChannels} />}
        
        <div className="flex items-center justify-between text-[10px] font-sans text-white mt-4 pt-3 border-t border-white/10 uppercase font-black tracking-widest">
          <span className="flex items-center gap-1.5 text-white">
            <Shield className="h-4 w-4 text-[#38bdf8]" /> Real-Time Analytics Telemetry Active
          </span>
          <span className="text-[#38bdf8] font-black">
            {activeTier.toUpperCase()} TIRED DASHBOARD ACTIVE
          </span>
        </div>
      </div>

    </div>
  );
}

/* A. SPARK_TABLE (Base: 1 Row, 5 standard columns) */
function SparkTable({ channels }: { channels: ChannelMetric[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse text-xs font-sans">
        <thead>
          <tr className="border-b border-white/10 text-slate-400 font-sans uppercase text-[10px] tracking-wider font-bold">
            <th className="py-3 pr-4">Channel Name</th>
            <th className="py-3 px-3">Platform</th>
            <th className="py-3 px-3 text-center">Status</th>
            <th className="py-3 px-3 text-right">Views</th>
            <th className="py-3 pl-4 text-right">Engagement</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {channels.map((ch) => (
            <tr key={ch.id} className="hover:bg-white/5 transition-colors">
              <td className="py-3.5 pr-4 text-white font-bold">{ch.name}</td>
              <td className="py-3.5 px-3 text-slate-300">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10">
                  {ch.platform}
                </span>
              </td>
              <td className="py-3.5 px-3 text-center">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-sans font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  {ch.status}
                </span>
              </td>
              <td className="py-3.5 px-3 text-right text-[#38bdf8] font-mono font-bold">
                {ch.views.toLocaleString()}
              </td>
              <td className="py-3.5 pl-4 text-right text-[#38bdf8] font-mono font-bold">
                {ch.engagement}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* B. GROWTH_TABLE (Base + Performance Score, 4 Rows) */
function GrowthTable({ channels }: { channels: ChannelMetric[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse text-xs font-sans">
        <thead>
          <tr className="border-b border-white/10 text-slate-400 font-sans uppercase text-[10px] tracking-wider font-bold">
            <th className="py-3 pr-4">Channel Name</th>
            <th className="py-3 px-3">Platform</th>
            <th className="py-3 px-3 text-center">Status</th>
            <th className="py-3 px-3 text-right">Views</th>
            <th className="py-3 px-3 text-right">Engagement</th>
            <th className="py-3 pl-4 text-right">Performance Score</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {channels.map((ch) => (
            <tr key={ch.id} className="hover:bg-white/5 transition-colors">
              <td className="py-3.5 pr-4 text-white font-bold">{ch.name}</td>
              <td className="py-3.5 px-3 text-slate-300">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10">
                  {ch.platform}
                </span>
              </td>
              <td className="py-3.5 px-3 text-center">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-sans font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  {ch.status}
                </span>
              </td>
              <td className="py-3.5 px-3 text-right text-[#38bdf8] font-mono font-bold">
                {ch.views.toLocaleString()}
              </td>
              <td className="py-3.5 px-3 text-right text-[#38bdf8] font-mono font-bold">
                {ch.engagement}
              </td>
              <td className="py-3.5 pl-4 text-right font-mono font-black text-emerald-400">
                {ch.score}/100
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* C. VELOCITY_TABLE (Base + Performance Score + CTR %, 5 Rows) */
function Table_Velocity({ channels }: { channels: ChannelMetric[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse text-xs font-sans">
        <thead>
          <tr className="border-b border-white/10 text-slate-400 font-sans uppercase text-[10px] tracking-wider font-bold">
            <th className="py-3 pr-4">Channel Name</th>
            <th className="py-3 px-3">Platform</th>
            <th className="py-3 px-3 text-center">Status</th>
            <th className="py-3 px-3 text-right">Views</th>
            <th className="py-3 px-3 text-right">Engagement</th>
            <th className="py-3 px-3 text-right">Performance Score</th>
            <th className="py-3 pl-4 text-right">CTR %</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {channels.map((ch) => (
            <tr key={ch.id} className="hover:bg-white/5 transition-colors">
              <td className="py-3.5 pr-4 text-white font-bold">{ch.name}</td>
              <td className="py-3.5 px-3 text-slate-300">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10">
                  {ch.platform}
                </span>
              </td>
              <td className="py-3.5 px-3 text-center">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-sans font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  {ch.status}
                </span>
              </td>
              <td className="py-3.5 px-3 text-right text-[#38bdf8] font-mono font-bold">
                {ch.views.toLocaleString()}
              </td>
              <td className="py-3.5 px-3 text-right text-[#38bdf8] font-mono font-bold">
                {ch.engagement}
              </td>
              <td className="py-3.5 px-3 text-right font-mono font-black text-emerald-400">
                {ch.score}/100
              </td>
              <td className="py-3.5 pl-4 text-right text-amber-400 font-mono font-black">
                {ch.ctr}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* D. EMPIRE_TABLE (Base + Performance Score + CTR % + HEATMAPS + TOP HOOK, 8 Rows) */
function EmpireTable({ channels }: { channels: ChannelMetric[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse text-xs font-sans min-w-[700px]">
        <thead>
          <tr className="border-b border-white/10 text-slate-400 font-sans uppercase text-[10px] tracking-wider font-bold">
            <th className="py-3 pr-3">Channel / Top Hook</th>
            <th className="py-3 px-2">Platform</th>
            <th className="py-3 px-2 text-center">Status</th>
            <th className="py-3 px-2 text-right">Views</th>
            <th className="py-3 px-2 text-right">Engagement</th>
            <th className="py-3 px-2 text-right">Score</th>
            <th className="py-3 px-2 text-right">CTR %</th>
            <th className="py-3 px-2 text-right">Est. Rev</th>
            <th className="py-3 pl-3 text-right">Retention Heatmap</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {channels.map((ch) => (
            <tr key={ch.id} className="hover:bg-white/5 transition-colors">
              <td className="py-3.5 pr-3">
                <div className="font-bold text-white text-xs">{ch.name}</div>
                <div className="text-[10px] text-slate-400 truncate max-w-[220px] font-sans italic">
                  "{ch.topHook}"
                </div>
              </td>
              <td className="py-3.5 px-2 text-slate-300">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 whitespace-nowrap">
                  {ch.platform}
                </span>
              </td>
              <td className="py-3.5 px-2 text-center">
                <span className="px-2 py-0.5 rounded text-[9px] font-sans font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 whitespace-nowrap">
                  {ch.status}
                </span>
              </td>
              <td className="py-3.5 px-2 text-right text-[#38bdf8] font-mono font-bold whitespace-nowrap">
                {ch.views.toLocaleString()}
              </td>
              <td className="py-3.5 px-2 text-right text-slate-200 font-mono font-bold whitespace-nowrap">
                {ch.engagement}
              </td>
              <td className="py-3.5 px-2 text-right font-mono font-black text-emerald-400 whitespace-nowrap">
                {ch.score}/100
              </td>
              <td className="py-3.5 px-2 text-right text-amber-400 font-mono font-black whitespace-nowrap">
                {ch.ctr}
              </td>
              <td className="py-3.5 px-2 text-right text-emerald-400 font-mono font-bold whitespace-nowrap">
                {ch.monthlyRevenue}
              </td>
              <td className="py-3.5 pl-3 text-right">
                <div className="flex items-center justify-end gap-2">
                  <span className="text-[10px] font-mono font-bold text-slate-300">{ch.retention}</span>
                  <div className="w-16 bg-slate-800 rounded-full h-2 overflow-hidden border border-white/10">
                    <div 
                      className="bg-gradient-to-r from-[#38bdf8] to-emerald-400 h-full rounded-full"
                      style={{ width: ch.retention }}
                    />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

