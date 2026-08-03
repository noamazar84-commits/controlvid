import { useState } from "react";
import { ChevronDown, Shield, Check, ArrowUpRight, Eye, Activity, Lock } from "lucide-react";

interface AnalyticsDashboardProps {
  userEmail: string;
  userTier: string;
  onUpgradeClick?: (planName?: string) => void;
}

export default function AnalyticsDashboard({ userEmail, userTier, onUpgradeClick }: AnalyticsDashboardProps) {
  const isAdmin = true; // Unconditional admin access to all analytics packages
  
  // Default to Spark plan view as requested
  const [activeTier, setActiveTier] = useState<string>("Spark");
  const [showAdminDropdown, setShowAdminDropdown] = useState<boolean>(false);

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

  const selectTier = (tier: string) => {
    setActiveTier(tier);
    setShowAdminDropdown(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-[#121212] text-white p-6 rounded-2xl border border-[#38bdf8]/20 space-y-6 pt-0 shadow-2xl relative font-sans">
      
      {/* HEADER SECTION WITH ADMIN CONTROLLER */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 pt-4">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-[#38bdf8] animate-pulse shadow-[0_0_8px_#38bdf8]" />
          <h2 className="text-sm font-black uppercase tracking-widest text-white">
            System Analytics
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
              BASIC ANALYTICS
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
              ADVANCE ANALYTICS
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
              DETAILED ANALYTICS
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
              PREMIUM ANALYTICS
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

      {/* DISTINCT TABLE RENDERING blocks based on selected tier to prevent layout reuse */}
      <div className="bg-[#121212] border border-white/10 rounded-xl p-5 shadow-[0_4px_30px_rgba(56, 189, 248, 0.01)] space-y-4">
        
        {rank === 1 && <SparkTable />}
        {rank === 2 && <GrowthTable />}
        {rank === 3 && <Table_Velocity />}
        {rank === 4 && <EmpireTable />}
        
        <div className="flex items-center justify-between text-[10px] font-sans text-white mt-4 pt-3 border-t border-white/10 uppercase font-black tracking-widest">
          <span className="flex items-center gap-1.5 text-white">
            <Shield className="h-4 w-4 text-[#38bdf8]" /> Capacity Secured
          </span>
          <span className="text-[#38bdf8] font-black">
            {activeTier.toUpperCase()} STRUCTURE RENDERED
          </span>
        </div>
      </div>

    </div>
  );
}

/* A. SPARK_TABLE (Base: 1 Row, 5 standard columns) */
function SparkTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse text-xs font-sans">
        <thead>
          <tr className="border-b border-white/10 text-white font-sans uppercase text-[11px] tracking-wider font-black">
            <th className="py-3.5 pr-4 border-b border-white/10 text-white font-black">Channel Name</th>
            <th className="py-3.5 px-3 border-b border-white/10 text-white font-black">Platform</th>
            <th className="py-3.5 px-3 text-center border-b border-white/10 text-white font-black">Status</th>
            <th className="py-3.5 px-3 text-right border-b border-white/10 text-white font-black">Views</th>
            <th className="py-3.5 pl-4 text-right border-b border-white/10 text-white font-black">Engagement</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          <tr className="hover:bg-white/5 transition-colors">
            <td className="py-4 pr-4 text-white font-bold">—</td>
            <td className="py-4 px-3 text-white">—</td>
            <td className="py-4 px-3 text-center">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-sans font-bold uppercase tracking-wider bg-white/5 border border-white/5 text-white">
                —
              </span>
            </td>
            <td className="py-4 px-3 text-right text-[#38bdf8] font-bold">—</td>
            <td className="py-4 pl-4 text-right text-[#38bdf8] font-bold">—</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/* B. GROWTH_TABLE (Base + Performance Score, 4 Rows) */
function GrowthTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse text-xs font-sans">
        <thead>
          <tr className="border-b border-white/10 text-white font-sans uppercase text-[11px] tracking-wider font-black">
            <th className="py-3.5 pr-4 border-b border-white/10 text-white font-black">Channel Name</th>
            <th className="py-3.5 px-3 border-b border-white/10 text-white font-black">Platform</th>
            <th className="py-3.5 px-3 text-center border-b border-white/10 text-white font-black">Status</th>
            <th className="py-3.5 px-3 text-right border-b border-white/10 text-white font-black">Views</th>
            <th className="py-3.5 px-3 text-right border-b border-white/10 text-white font-black">Engagement</th>
            <th className="py-3.5 pl-4 text-right border-b border-white/10 text-white font-black">Performance Score</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {Array.from({ length: 4 }).map((_, i) => (
            <tr key={i} className="hover:bg-white/5 transition-colors">
              <td className="py-4 pr-4 text-white font-bold">—</td>
              <td className="py-4 px-3 text-white">—</td>
              <td className="py-4 px-3 text-center">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-sans font-bold uppercase tracking-wider bg-white/5 border border-white/5 text-white">
                  —
                </span>
              </td>
              <td className="py-4 px-3 text-right text-[#38bdf8] font-bold">—</td>
              <td className="py-4 px-3 text-right text-[#38bdf8] font-bold">—</td>
              <td className="py-4 pl-4 text-right text-white font-bold">—</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* C. VELOCITY_TABLE (Base + Performance Score + CTR %, 5 Rows) */
function Table_Velocity() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse text-xs font-sans">
        <thead>
          <tr className="border-b border-white/10 text-white font-sans uppercase text-[11px] tracking-wider font-black">
            <th className="py-3.5 pr-4 border-b border-white/10 text-white font-black">Channel Name</th>
            <th className="py-3.5 px-3 border-b border-white/10 text-white font-black">Platform</th>
            <th className="py-3.5 px-3 text-center border-b border-white/10 text-white font-black">Status</th>
            <th className="py-3.5 px-3 text-right border-b border-white/10 text-white font-black">Views</th>
            <th className="py-3.5 px-3 text-right border-b border-white/10 text-white font-black">Engagement</th>
            <th className="py-3.5 px-3 text-right border-b border-white/10 text-white font-black">Performance Score</th>
            <th className="py-3.5 pl-4 text-right border-b border-white/10 text-white font-black">CTR %</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {Array.from({ length: 5 }).map((_, i) => (
            <tr key={i} className="hover:bg-white/5 transition-colors">
              <td className="py-4 pr-4 text-white font-bold">—</td>
              <td className="py-4 px-3 text-white">—</td>
              <td className="py-4 px-3 text-center">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-sans font-bold uppercase tracking-wider bg-white/5 border border-white/5 text-white">
                  —
                </span>
              </td>
              <td className="py-4 px-3 text-right text-[#38bdf8] font-bold">—</td>
              <td className="py-4 px-3 text-right text-[#38bdf8] font-bold">—</td>
              <td className="py-4 px-3 text-right text-white font-bold">—</td>
              <td className="py-4 pl-4 text-right text-[#38bdf8] font-bold">—</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* D. EMPIRE_TABLE (Base + Performance Score + CTR % + HEATMAPS, 8 Rows) */
function EmpireTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse text-xs font-sans table-auto">
        <thead>
          <tr className="border-b border-white/10 text-white font-sans uppercase text-[11px] tracking-wider font-black">
            <th className="py-3.5 pr-4 border-b border-white/10 text-white font-black">Channel Name</th>
            <th className="py-3.5 px-3 border-b border-white/10 text-white font-black">Platform</th>
            <th className="py-3.5 px-3 text-center border-b border-white/10 text-white font-black">Status</th>
            <th className="py-3.5 px-3 text-right border-b border-white/10 text-white font-black">Views</th>
            <th className="py-3.5 px-3 text-right border-b border-white/10 text-white font-black">Engagement</th>
            <th className="py-3.5 px-3 text-right border-b border-white/10 text-white font-black">Performance Score</th>
            <th className="py-3.5 px-3 text-right border-b border-white/10 text-white font-black">CTR %</th>
            <th className="py-3.5 pl-4 text-right border-b border-white/10 text-white font-black">Heatmaps</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {Array.from({ length: 8 }).map((_, i) => (
            <tr key={i} className="hover:bg-white/5 transition-colors">
              <td className="py-4 pr-4 text-white font-bold">—</td>
              <td className="py-4 px-3 text-white">—</td>
              <td className="py-4 px-3 text-center">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-sans font-bold uppercase tracking-wider bg-white/5 border border-white/5 text-white">
                  —
                </span>
              </td>
              <td className="py-4 px-3 text-right text-[#38bdf8] font-bold">—</td>
              <td className="py-4 px-3 text-right text-[#38bdf8] font-bold">—</td>
              <td className="py-4 px-3 text-right text-white font-bold">—</td>
              <td className="py-4 px-3 text-right text-[#38bdf8] font-bold">—</td>
              <td className="py-4 pl-4 text-right text-white font-bold">—</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
