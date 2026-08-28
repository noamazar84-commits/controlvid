import { useState, useEffect } from "react";
import { 
  ChevronDown, 
  Shield, 
  Check, 
  ArrowUpRight, 
  Lock, 
  Clock, 
  Calendar,
  AlertCircle
} from "lucide-react";

interface CampaignSchedulerProps {
  userEmail: string;
  userTier: string;
  onUpgradeClick?: (planName?: string) => void;
  scheduledQueue: any[];
  onUpdateQueue: (updated: any[]) => void;
  getQuotaStatus: (additionalRequested?: number) => { 
    createdCount: number; 
    scheduledCount: number; 
    totalUsed: number; 
    limit: number; 
    remaining: number; 
    isExceeded: boolean; 
  };
  getShadowChannelsLimit: (tier: string) => number;
}

interface ScheduleConfig {
  channelId: string;
  slotTime: string;
  socialNetwork: string;
  contentId: string;
  status: "Pending Configuration" | "Scheduled" | "Published";
}

export default function CampaignScheduler({
  userEmail,
  userTier,
  onUpgradeClick,
  scheduledQueue,
  onUpdateQueue,
  getQuotaStatus,
  getShadowChannelsLimit
}: CampaignSchedulerProps) {
  const isAdmin = true; // Unconditional admin access to all scheduler packages
  
  // Normalize tier name capitalization
  const formatTierName = (t: string) => {
    if (!t) return "Spark";
    return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
  };

  const [activeTier, setActiveTier] = useState<string>("Spark");
  const [showAdminDropdown, setShowAdminDropdown] = useState<boolean>(false);

  // Load configured channel schedules from local storage for reliable state preservation
  const [schedules, setSchedules] = useState<Record<string, ScheduleConfig>>(() => {
    try {
      const saved = localStorage.getItem("controlvid_channel_schedules") || localStorage.getItem("viralflow_channel_schedules");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Save changes to local storage
  useEffect(() => {
    localStorage.setItem("controlvid_channel_schedules", JSON.stringify(schedules));
  }, [schedules]);

  // Keep simulated active tier set to Spark by default as requested
  useEffect(() => {
    setActiveTier("Spark");
  }, [userTier]);

  const getTierRank = (tierName: string): number => {
    const t = tierName.toLowerCase();
    if (t.includes("empire")) return 4;
    if (t.includes("velocity")) return 3;
    if (t.includes("growth")) return 2;
    return 1; // Spark
  };

  const rank = getTierRank(activeTier);

  const isPlanAccessible = (tierName: string): boolean => {
    if (isAdmin) return true;
    return getTierRank(userTier) >= getTierRank(tierName);
  };

  const getQuotaForTier = (tierName: string): number => {
    const t = tierName.toLowerCase();
    if (t.includes("empire")) return 8;
    if (t.includes("velocity")) return 5;
    if (t.includes("growth")) return 4;
    return 3; // Spark
  };

  const activeLimit = getQuotaForTier(activeTier);

  const selectTier = (tier: string) => {
    setActiveTier(tier);
    setShowAdminDropdown(false);
  };

  // Set Schedule Modal state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedChannelId, setSelectedChannelId] = useState<string>("");
  const [modalNetwork, setModalNetwork] = useState<string>("TikTok");
  const [modalTime, setModalTime] = useState<string>("12:00");
  const [modalContentId, setModalContentId] = useState<string>("");

  const openScheduleModal = (channelId: string) => {
    setSelectedChannelId(channelId);
    const existing = schedules[channelId];
    if (existing) {
      setModalNetwork(existing.socialNetwork);
      setModalTime(existing.slotTime);
      setModalContentId(existing.contentId);
    } else {
      setModalNetwork("TikTok");
      setModalTime("12:00");
      setModalContentId("");
    }
    setIsModalOpen(true);
  };

  const handleSaveSchedule = () => {
    const channelId = selectedChannelId;
    const finalContentId = modalContentId.trim() || `CID-${Math.floor(1000 + Math.random() * 9000)}`;
    const finalTime = modalTime || "12:00";

    setSchedules(prev => ({
      ...prev,
      [channelId]: {
        channelId,
        slotTime: finalTime,
        socialNetwork: modalNetwork,
        contentId: finalContentId,
        status: "Scheduled"
      }
    }));

    setIsModalOpen(false);
  };

  const handlePublishChannel = (channelId: string) => {
    setSchedules(prev => {
      if (!prev[channelId]) return prev;
      return {
        ...prev,
        [channelId]: {
          ...prev[channelId],
          status: "Published"
        }
      };
    });
  };

  const handleResetChannel = (channelId: string) => {
    setSchedules(prev => {
      const copy = { ...prev };
      delete copy[channelId];
      return copy;
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-[#121212] text-white p-6 rounded-2xl border border-[#38bdf8]/20 space-y-6 pt-0 shadow-2xl relative font-sans">
      
      {/* HEADER SECTION WITH ADMIN CONTROLLER */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 pt-4">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-[#38bdf8] animate-pulse shadow-[0_0_8px_#38bdf8]" />
          <h2 className="text-sm font-black uppercase tracking-widest text-white">
            SYSTEM SCHEDULER
          </h2>
          {isAdmin && (
            <span className="text-[10px] font-sans font-black uppercase bg-[#38bdf8] text-black px-2 py-0.5 rounded shadow-[0_0_8px_rgba(56, 189, 248, 0.3)]">
              Admin Mode Active
            </span>
          )}
        </div>

        {/* Admin Switcher Dropdown - Clean & Standard in the header */}
        {isAdmin && (
          <div className="relative">
            <button
              onClick={() => setShowAdminDropdown(!showAdminDropdown)}
              id="admin-dropdown-toggle"
              className="admin-mode-btn px-4 py-2 rounded-lg bg-[#1e293b] border border-[#3b82f6] text-white font-sans text-xs font-black tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_12px_rgba(56,189,248,0.25)]"
            >
              Admin Mode <ChevronDown className="h-2.5 w-2.5" />
            </button>

            {showAdminDropdown && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg bg-[#121212] border border-[#38bdf8]/30 shadow-2xl overflow-hidden z-50">
                <div className="p-2 bg-black border-b border-white/5 font-sans text-[9px] text-white uppercase tracking-widest text-center font-bold">
                  Toggle Plan Simulation
                </div>
                {["Spark", "Growth", "Velocity", "Empire"].map((tier) => (
                  <button
                    key={tier}
                    onClick={() => selectTier(tier)}
                    className={`w-full text-left px-4 py-3 font-sans text-xs font-bold transition-colors cursor-pointer block border-none focus:outline-none ${
                      activeTier.toLowerCase() === tier.toLowerCase()
                        ? "bg-[#38bdf8] text-black font-black"
                        : "text-white hover:bg-white/5"
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* FOUR PLAN CARDS - SEQUENTIAL FROM BASIC TO HIGH */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 plan-cards-grid">
        {/* Spark Card */}
        <div 
          className={`plan-card rounded-xl border transition-all relative overflow-hidden bg-[#121212] ${
            activeTier === "Spark" 
              ? "active-card" 
              : "border-white/15"
          }`}
        >
          <div className="flex flex-col">
            <span className="plan-card-title">
              SPARK PLAN
            </span>
            <span className="plan-card-subtitle">
              3 CHANNELS
            </span>
          </div>
          {activeTier === "Spark" ? (
            <div className="plan-card-button w-full bg-white/5 text-white/50 border border-white/10 font-sans uppercase">
              <Check className="h-2.5 w-2.5 text-[#38bdf8]" /> Active
            </div>
          ) : (
            <a 
              href="https://whop.com/checkout/plan_lh462BuLhpo6m"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setActiveTier("Spark");
                onUpgradeClick?.("Spark");
              }}
              className="checkout-btn plan-card-button w-full bg-[#38bdf8] text-black hover:bg-white hover:text-black font-sans uppercase cursor-pointer border-none focus:outline-none flex items-center justify-center gap-1 no-underline"
            >
              SELECT SPARK <ArrowUpRight className="h-2.5 w-2.5" />
            </a>
          )}
        </div>

        {/* Growth Card */}
        <div 
          className={`plan-card rounded-xl border transition-all relative overflow-hidden bg-[#121212] ${
            activeTier === "Growth" 
              ? "active-card" 
              : "border-white/15"
          }`}
        >
          <div className="flex flex-col">
            <span className="plan-card-title">
              GROWTH PLAN
            </span>
            <span className="plan-card-subtitle">
              4 CHANNELS
            </span>
          </div>
          {activeTier === "Growth" ? (
            <div className="plan-card-button w-full bg-white/5 text-white/50 border border-white/10 font-sans uppercase">
              <Check className="h-2.5 w-2.5 text-[#38bdf8]" /> Active
            </div>
          ) : (
            <a 
              href="https://whop.com/checkout/plan_WcQG0RIqzkwGH"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setActiveTier("Growth");
                onUpgradeClick?.("Growth");
              }}
              className="checkout-btn plan-card-button w-full bg-[#38bdf8] text-black hover:bg-white hover:text-black font-sans uppercase cursor-pointer border-none focus:outline-none flex items-center justify-center gap-1 no-underline"
            >
              SELECT GROWTH <ArrowUpRight className="h-2.5 w-2.5" />
            </a>
          )}
        </div>

        {/* Velocity Card */}
        <div 
          className={`plan-card rounded-xl border transition-all relative overflow-hidden bg-[#121212] ${
            activeTier === "Velocity" 
              ? "active-card" 
              : "border-white/15"
          }`}
        >
          <div className="flex flex-col">
            <span className="plan-card-title">
              VELOCITY PLAN
            </span>
            <span className="plan-card-subtitle">
              5 CHANNELS
            </span>
          </div>
          {activeTier === "Velocity" ? (
            <div className="plan-card-button w-full bg-white/5 text-white/50 border border-white/10 font-sans uppercase">
              <Check className="h-2.5 w-2.5 text-[#38bdf8]" /> Active
            </div>
          ) : (
            <a 
              href="https://whop.com/checkout/plan_V2MSLJErUBhu9"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setActiveTier("Velocity");
                onUpgradeClick?.("Velocity");
              }}
              className="checkout-btn plan-card-button w-full bg-[#38bdf8] text-black hover:bg-white hover:text-black font-sans uppercase cursor-pointer border-none focus:outline-none flex items-center justify-center gap-1 no-underline"
            >
              SELECT VELOCITY <ArrowUpRight className="h-2.5 w-2.5" />
            </a>
          )}
        </div>

        {/* Empire Card */}
        <div 
          className={`plan-card rounded-xl border transition-all relative overflow-hidden bg-[#121212] ${
            activeTier === "Empire" 
              ? "active-card" 
              : "border-white/15"
          }`}
        >
          <div className="flex flex-col">
            <span className="plan-card-title">
              EMPIRE PLAN
            </span>
            <span className="plan-card-subtitle">
              8 CHANNELS
            </span>
          </div>
          {activeTier === "Empire" ? (
            <div className="plan-card-button w-full bg-white/5 text-white/50 border border-white/10 font-sans uppercase">
              <Check className="h-2.5 w-2.5 text-[#38bdf8]" /> Active
            </div>
          ) : (
            <a 
              href="https://whop.com/checkout/plan_3Czt0BQqCnhzr"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setActiveTier("Empire");
                onUpgradeClick?.("Empire");
              }}
              className="checkout-btn plan-card-button w-full uppercase cursor-pointer border-none focus:outline-none flex items-center justify-center gap-1 no-underline"
            >
              SELECT EMPIRE &rarr;
            </a>
          )}
        </div>
      </div>

      {/* DISTINCT TABLE RENDERING */}
      <div className="bg-[#121212] border border-white/10 rounded-xl p-5 shadow-[0_4px_30px_rgba(56, 189, 248, 0.01)] space-y-4">
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-sans table-auto">
            <thead>
              <tr className="border-b border-white/10 text-white font-sans uppercase text-[11px] tracking-wider font-black">
                <th className="py-3.5 pr-4 border-b border-white/10 text-white font-black">Social Media</th>
                <th className="py-3.5 px-3 border-b border-white/10 text-white font-black">Slot Time</th>
                <th className="py-3.5 px-3 text-center border-b border-white/10 text-white font-black">Status</th>
                <th className="py-3.5 px-3 border-b border-white/10 text-white font-black">Content ID</th>
                <th className="py-3.5 pl-4 text-right border-b border-white/10 text-white font-black">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {Array.from({ length: activeLimit }).map((_, i) => {
                const channelId = `Shadow Channel #${i + 1}`;
                const config = schedules[channelId];
                return (
                  <tr key={channelId} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 pr-4 text-white font-bold">{channelId}</td>
                    
                    {config && config.slotTime ? (
                      <td className="py-4 px-3 text-white">
                        <div className="flex items-center gap-2">
                          <span className="font-mono bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg text-white font-bold">
                            {config.slotTime}
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold bg-[#38bdf8]/5 border border-[#38bdf8]/15 px-2 py-0.5 rounded uppercase font-sans">
                            {config.socialNetwork}
                          </span>
                        </div>
                      </td>
                    ) : (
                      <td className="py-4 px-3 text-slate-500 font-mono">—</td>
                    )}

                    <td className="py-4 px-3 text-center">
                      {!config ? (
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-sans font-bold uppercase tracking-wider bg-white/5 border border-white/5 text-slate-400">
                          Pending Configuration
                        </span>
                      ) : config.status === "Scheduled" ? (
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-sans font-bold uppercase tracking-wider bg-[#38bdf8]/10 border border-[#38bdf8]/20 text-[#38bdf8]">
                          Scheduled
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-sans font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/15 text-emerald-400">
                          Published
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-3 text-white">
                      {config ? (
                        <span className="text-[#38bdf8] font-mono font-bold">{config.contentId}</span>
                      ) : (
                        <span className="text-slate-500 font-mono">—</span>
                      )}
                    </td>

                    <td className="py-4 pl-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openScheduleModal(channelId)}
                          className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-sans font-black uppercase tracking-wider text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer transition-all focus:outline-none"
                        >
                          {config ? "Update" : "Set Schedule"}
                        </button>
                        
                        {config && config.status === "Scheduled" && (
                          <button
                            onClick={() => handlePublishChannel(channelId)}
                            className="px-3 py-1.5 bg-[#38bdf8]/10 border border-[#38bdf8]/20 hover:bg-[#38bdf8] hover:text-black rounded-lg text-[10px] font-sans font-black uppercase tracking-wider text-[#38bdf8] cursor-pointer transition-all focus:outline-none"
                          >
                            Publish
                          </button>
                        )}

                        {config && (
                          <button
                            onClick={() => handleResetChannel(channelId)}
                            className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 rounded-lg text-[10px] font-sans font-black uppercase tracking-wider cursor-pointer transition-all focus:outline-none"
                          >
                            Reset
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Capacity Secured Footer Status Indicator */}
        <div className="flex items-center justify-between text-[10px] font-sans text-white mt-4 pt-3 border-t border-white/10 uppercase font-black tracking-widest">
          <span className="flex items-center gap-1.5 text-white">
            <Shield className="h-4 w-4 text-[#38bdf8]" /> Capacity Secured
          </span>
          <span className="text-[#38bdf8] font-black">
            {activeTier.toUpperCase()} STRUCTURE RENDERED
          </span>
        </div>
      </div>

      {/* SET SCHEDULE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#121212] border border-[#38bdf8]/30 rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl relative animate-[fadeIn_0.15s_ease-out]">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-black uppercase text-white tracking-wider">
                Configure Schedule Node
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-neutral-400 hover:text-white transition-colors border-none bg-transparent cursor-pointer font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Channel Name (Readonly) */}
              <div className="space-y-1">
                <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider text-left">
                  Social Media Channel
                </label>
                <div className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-300 font-bold font-sans text-left">
                  {selectedChannelId}
                </div>
              </div>

              {/* Social Network Selection */}
              <div className="space-y-2">
                <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider text-left">
                  Select Social Network
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["TikTok", "YouTube Shorts", "Instagram Reels"].map((net) => {
                    const isNetSelected = modalNetwork === net;
                    return (
                      <button
                        key={net}
                        type="button"
                        onClick={() => setModalNetwork(net)}
                        className={`py-2 px-1 rounded-xl border text-center transition-all duration-150 cursor-pointer text-[10px] font-sans font-bold uppercase tracking-wider ${
                          isNetSelected
                            ? "bg-[#38bdf8] text-black border-[#38bdf8] font-black shadow-[0_0_8px_rgba(56, 189, 248, 0.3)]"
                            : "bg-white/5 border-white/[0.04] text-slate-400 hover:border-white/10"
                        }`}
                      >
                        {net}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Input */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider text-left">
                  Slot Time
                </label>
                <input 
                  type="time"
                  value={modalTime}
                  onChange={(e) => setModalTime(e.target.value)}
                  className="w-full bg-[#1e1e1e] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#38bdf8] font-mono text-left"
                />
              </div>

              {/* Content ID */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider text-left">
                  Content ID
                </label>
                <input 
                  type="text"
                  value={modalContentId}
                  onChange={(e) => setModalContentId(e.target.value)}
                  placeholder="e.g., CID-8294 (Leave blank to auto-generate)"
                  className="w-full bg-[#1e1e1e] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#38bdf8] placeholder-neutral-600 font-mono text-left"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-3 border-t border-white/10">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white rounded-xl text-xs font-bold uppercase transition-all border-none cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSchedule}
                className="flex-1 py-2.5 bg-[#38bdf8] hover:bg-white text-black font-black uppercase text-xs tracking-wider rounded-xl cursor-pointer transition-all border-none shadow-[0_0_12px_rgba(56, 189, 248, 0.3)]"
              >
                Save Schedule
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
