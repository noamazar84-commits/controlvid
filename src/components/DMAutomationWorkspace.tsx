import { useState, useEffect } from "react";
import { Send, Plus, Trash2, Cpu, RotateCw, Sparkles, MessageSquare, ShoppingCart } from "lucide-react";
import { DbDMAutomationRule } from "../types";

interface DMAutomationWorkspaceProps {
  userEmail: string;
  userTier: string;
  onUpgradeClick?: () => void;
}

export default function DMAutomationWorkspace({ userEmail, userTier, onUpgradeClick }: DMAutomationWorkspaceProps) {
  const [rules, setRules] = useState<DbDMAutomationRule[]>([]);
  const [keyword, setKeyword] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [testMessage, setTestMessage] = useState("");
  const [simulating, setSimulating] = useState(false);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([
    "SYS_INIT: DM Automation Engine Online.",
    "Ready to auto-reply to inbound campaign leads."
  ]);

  // Clean state: Load remaining interaction balance, defaulting to a healthy simulation start of 1,250 credits
  const [interactionBalance, setInteractionBalance] = useState<number>(() => {
    const saved = localStorage.getItem("viralflow_interaction_balance_v2");
    return saved !== null ? parseInt(saved, 10) : 1250;
  });

  useEffect(() => {
    localStorage.setItem("viralflow_interaction_balance_v2", interactionBalance.toString());
  }, [interactionBalance]);

  // Hard Reset: Purge legacy/stale checkout/booster variables
  useEffect(() => {
    localStorage.removeItem("viralflow_interaction_balance"); // legacy key
  }, []);

  const fetchRules = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/automation/rules?email=${encodeURIComponent(userEmail)}`);
      if (response.ok) {
        const data = await response.json();
        setRules(data);
      }
    } catch (err) {
      console.error("Failed to load rules", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRules();
  }, [userEmail]);

  const handleAddRule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim() || !replyMessage.trim()) return;
    setSaving(true);
    try {
      const response = await fetch("/api/automation/rules/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_email: userEmail,
          keyword: keyword.trim().toLowerCase(),
          replyMessage: replyMessage.trim()
        })
      });
      if (response.ok) {
        setKeyword("");
        setReplyMessage("");
        fetchRules();
        setSimulationLogs(prev => [
          ...prev,
          `[RULE CONFIG] Added trigger rule for keyword "${keyword.toLowerCase()}"`
        ]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteRule = async (ruleId: string, kw: string) => {
    try {
      const response = await fetch("/api/automation/rules/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: ruleId })
      });
      if (response.ok) {
        setRules(prev => prev.filter(r => r.id !== ruleId));
        setSimulationLogs(prev => [
          ...prev,
          `[RULE CONFIG] Deleted rule for keyword "${kw}"`
        ]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSimulateDM = async () => {
    if (!testMessage.trim()) return;
    if (interactionBalance <= 0) {
      setSimulationLogs(prev => [
        ...prev,
        `[WARNING] Interaction credits fully depleted. Please upgrade to unlock more responses.`
      ]);
      return;
    }

    setSimulating(true);
    setSimulationLogs(prev => [
      ...prev,
      `[INCOMING DM] User says: "${testMessage}"`
    ]);

    try {
      const response = await fetch("/api/automation/trigger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          messageText: testMessage
        })
      });

      const data = await response.json();
      if (response.ok && data.matched) {
        const nextBalance = Math.max(0, interactionBalance - 1);
        setInteractionBalance(nextBalance);

        setSimulationLogs(prev => [
          ...prev,
          `[MATCH FOUND] Keyword: "${data.keyword}" matched!`,
          `[AUTO REPLY] Dispatching message: "${data.replyMessage}"`,
          `[BALANCE TRIGGER] Deducted 1 Interaction. (Remaining: ${nextBalance})`
        ]);
        fetchRules();
      } else {
        setSimulationLogs(prev => [
          ...prev,
          `[NO MATCH] Incoming message did not contain any trigger keywords.`
        ]);
      }
    } catch (err) {
      setSimulationLogs(prev => [...prev, `[ERROR] Failed to run trigger process: ${err}`]);
    } finally {
      setSimulating(false);
      setTestMessage("");
    }
  };

  return (
    <div className="space-y-6 p-4 bg-black min-h-[70vh] relative">
      
      {/* Header Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/[0.08] pb-4 gap-4">
        <div>
          <h2 className="text-lg font-black font-sans text-white uppercase tracking-tight flex items-center gap-2">
            <Cpu className="h-5 w-5 text-[#38bdf8] animate-pulse" />
            Lead-Nurturing DM Automation
          </h2>
          <p className="text-[11px] text-white opacity-100 font-bold">
            Auto-responder engine active. Converts comments & DMs into sales seamlessly.
          </p>
        </div>
        
        {/* Real-time Interaction Count and DIRECT Upgrade trigger */}
        <div className="flex items-center gap-3 self-start sm:self-center">
          <div className="px-3 py-1.5 bg-black border border-[#38bdf8] rounded-lg text-[#38bdf8] font-sans text-xs font-black uppercase tracking-wide">
            Remaining Interactions: <span className="text-white ml-1">{interactionBalance}</span>
          </div>
          
          <button 
            onClick={() => onUpgradeClick?.()}
            className="px-3.5 py-1.5 bg-[#38bdf8] hover:bg-[#38bdf8] text-black font-sans text-xs font-black uppercase tracking-wide rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(56, 189, 248, 0.2)] border-none"
            style={{ WebkitTextStroke: "0.4px #000000" }}
          >
            + Add Interactions
          </button>
        </div>
      </div>

      {/* Body: Keyword Triggers and Live Simulator */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Keyword Triggers Column */}
        <div className="md:col-span-7 bg-[#121212] border border-white/[0.08] rounded-xl p-5 space-y-4">
          <h3 className="text-xs font-sans font-bold text-white uppercase tracking-wider flex items-center gap-1.5 opacity-100">
            <MessageSquare className="h-4 w-4 text-[#38bdf8]" />
            Keyword Triggers ({rules.length})
          </h3>

          {/* Form to add a keyword trigger */}
          <form onSubmit={handleAddRule} className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-black p-3 rounded-lg border border-white/[0.1]">
            <div className="sm:col-span-4 space-y-1">
              <label className="text-[10px] font-sans font-bold text-white uppercase tracking-wider block opacity-100">Trigger Keyword</label>
              <input
                type="text"
                required
                placeholder="e.g. promo"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full bg-black border border-white/[0.15] focus:border-[#38bdf8] rounded px-2.5 py-1.5 text-xs text-white outline-none font-bold"
              />
            </div>
            <div className="sm:col-span-6 space-y-1">
              <label className="text-[10px] font-sans font-bold text-white uppercase tracking-wider block opacity-100">Auto-Reply Message</label>
              <input
                type="text"
                required
                placeholder="e.g. Here is your link..."
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                className="w-full bg-black border border-white/[0.15] focus:border-[#38bdf8] rounded px-2.5 py-1.5 text-xs text-white outline-none font-bold"
              />
            </div>
            <div className="sm:col-span-2 flex items-end">
              <button
                type="submit"
                disabled={saving}
                className="plan-button w-full h-[32px] bg-[#38bdf8] hover:bg-[#38bdf8] text-black font-black text-xs uppercase rounded transition-all cursor-pointer flex items-center justify-center border-none"
                style={{ WebkitTextStroke: "0.4px #000000" }}
              >
                {saving ? <RotateCw className="h-3.5 w-3.5 animate-spin text-black" /> : <Plus className="h-4 w-4 text-black" />}
              </button>
            </div>
          </form>

          {/* Rules list */}
          {loading ? (
            <div className="py-12 text-center text-white font-mono text-[11px] font-bold animate-pulse">
              Syncing automation triggers...
            </div>
          ) : rules.length === 0 ? (
            <div className="py-8 text-center text-white opacity-100 font-bold font-sans text-xs">
              No keyword trigger rules configured yet.
            </div>
          ) : (
            <div className="space-y-2.5">
              {rules.map((rule) => (
                <div key={rule.id} className="flex items-center justify-between p-3 bg-black border border-white/[0.08] rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-[#38bdf8] bg-[#38bdf8]/10 border border-[#38bdf8]/20 px-2 py-0.5 rounded uppercase">
                        keyword: {rule.keyword}
                      </span>
                      <span className="text-[9px] font-mono text-white opacity-100 font-bold uppercase">
                        {rule.triggerCount || 0} hits
                      </span>
                    </div>
                    <p className="text-xs font-sans text-white opacity-100 leading-relaxed font-bold">
                      {rule.replyMessage}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => handleDeleteRule(rule.id, rule.keyword)}
                    className="p-1.5 bg-rose-950/40 hover:bg-rose-950/80 border border-rose-900/40 rounded text-rose-400 hover:text-rose-300 transition-all cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Live Simulator & Logs Column */}
        <div className="md:col-span-5 bg-[#121212] border border-white/[0.08] rounded-xl p-5 flex flex-col justify-between min-h-[350px]">
          <div className="space-y-4">
            <h3 className="text-xs font-sans font-bold text-white uppercase tracking-wider flex items-center gap-1.5 opacity-100">
              <Sparkles className="h-4 w-4 text-[#38bdf8]" />
              Auto-Reply Live Simulator
            </h3>
            
            {/* Input simulator */}
            <div className="space-y-2">
              <div className="relative flex items-center bg-black border border-white/[0.15] rounded-lg p-1.5 focus-within:border-[#38bdf8]">
                <input
                  type="text"
                  placeholder="Type test message (e.g. send me the secret!)..."
                  value={testMessage}
                  onChange={(e) => setTestMessage(e.target.value)}
                  className="flex-1 bg-transparent border-none text-white font-bold placeholder-white/30 focus:outline-none text-xs px-2.5 py-1.5"
                />
                <button
                  onClick={handleSimulateDM}
                  disabled={!testMessage.trim() || simulating}
                  className="plan-button h-[28px] bg-[#38bdf8] hover:bg-[#38bdf8] disabled:bg-slate-900 disabled:text-slate-600 font-sans font-black text-[10px] uppercase rounded px-3.5 text-black transition-all cursor-pointer flex items-center gap-1 border-none"
                  style={{ WebkitTextStroke: "0.4px #000000" }}
                >
                  {simulating ? <RotateCw className="h-3 w-3 animate-spin text-black" /> : <Send className="h-3 w-3 text-black" />}
                  Simulate
                </button>
              </div>
              <p className="text-[9px] text-white opacity-100 font-bold italic leading-snug">
                Tests how the engine processes inbound traffic. Triggers increment lead analytics and deducts from your remaining interaction balance.
              </p>
            </div>
          </div>

          {/* Log Window */}
          <div className="mt-4 bg-black border border-white/[0.08] rounded-lg p-3.5 font-mono text-[9px] space-y-1.5 max-h-[180px] overflow-y-auto custom-scrollbar flex-1">
            {simulationLogs.map((log, i) => {
              let color = "text-white";
              if (log.includes("[INCOMING DM]")) color = "text-blue-400 font-bold";
              if (log.includes("[MATCH FOUND]")) color = "text-emerald-400 font-bold";
              if (log.includes("[AUTO REPLY]")) color = "text-[#38bdf8] font-extrabold";
              if (log.includes("[BALANCE TRIGGER]")) color = "text-amber-400 font-extrabold";
              if (log.includes("[NO MATCH]")) color = "text-rose-400 font-bold";
              if (log.includes("[WARNING]")) color = "text-amber-500 font-extrabold";
              
              return (
                <div key={i} className={`${color} leading-relaxed border-b border-white/[0.02] pb-1 last:border-none`}>
                  {log}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Unified Direct Purchase Banner (Locks to system-wide Pricing Page) */}
      <div className="bg-[#121212] border border-[#38bdf8]/30 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 mt-6">
        <div className="space-y-1.5 text-left">
          <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
            <ShoppingCart className="h-4 w-4 text-[#38bdf8]" />
            Scale Inbound DM Loops Without Limits
          </h4>
          <p className="text-xs text-white opacity-80 leading-relaxed max-w-2xl">
            Power up your automated reply loops with unlimited credits. Unlock the high-capacity auto-response engine, dedicated server priority, and deep customer sentiment tracking with our full tier plans.
          </p>
        </div>
        <button
          onClick={() => onUpgradeClick?.()}
          className="plan-button whitespace-nowrap h-[44px] px-6 bg-[#38bdf8] hover:bg-[#38bdf8] text-black font-black text-xs uppercase rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 border-none shadow-[0_0_20px_rgba(56, 189, 248, 0.25)]"
          style={{ WebkitTextStroke: "0.5px #000000" }}
        >
          Purchase DM Credits / Upgrade
        </button>
      </div>

    </div>
  );
}
