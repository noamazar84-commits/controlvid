import { useState, useEffect } from "react";
import { 
  Award, 
  Send, 
  RotateCw, 
  CheckCircle, 
  DollarSign, 
  Building2, 
  Cpu, 
  Sparkles,
  Layers,
  Video
} from "lucide-react";
import { DbEnterpriseRequest } from "../types";

interface TalkToUsEnterpriseProps {
  userEmail: string;
}

export default function TalkToUsEnterprise({ userEmail }: TalkToUsEnterpriseProps) {
  const [companyName, setCompanyName] = useState("");
  const [customRequirements, setCustomRequirements] = useState("");
  const [videoVolume, setVideoVolume] = useState<number>(500); // default 500 videos/mo
  const [shadowNodes, setShadowNodes] = useState<number>(10);   // default 10 nodes
  const [customDomains, setCustomDomains] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [pastRequests, setPastRequests] = useState<DbEnterpriseRequest[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Live contract calculation logic (ACV Estimation)
  const basePricePerVideo = 0.50; // $0.50 per enterprise video
  const basePricePerNode = 120.00; // $120/yr per shadow node active
  const videoCostAnnual = videoVolume * 12 * basePricePerVideo;
  const nodeCostAnnual = shadowNodes * basePricePerNode;
  const domainPremium = customDomains ? 1500 : 0;
  const estimatedACV = videoCostAnnual + nodeCostAnnual + domainPremium;

  const loadPastRequests = async () => {
    setLoadingHistory(true);
    try {
      const response = await fetch(`/api/enterprise/requests?email=${encodeURIComponent(userEmail)}`);
      if (response.ok) {
        const data = await response.json();
        setPastRequests(data);
      }
    } catch (err) {
      console.error("Failed to load requests", err);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    loadPastRequests();
  }, [userEmail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !customRequirements.trim()) return;
    setSubmitting(true);
    setStatusMsg(null);

    try {
      const response = await fetch("/api/enterprise/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: companyName.trim(),
          email: userEmail,
          targetVolume: videoVolume,
          customRequirements: `[Live Shadow Nodes: ${shadowNodes}, Custom Brand Domains: ${customDomains}] - ` + customRequirements.trim()
        })
      });

      if (response.ok) {
        setCompanyName("");
        setCustomRequirements("");
        setStatusMsg({
          type: "success",
          text: "🚀 Enterprise contract proposal submitted successfully! Our Accounts Director will email you within 2 business hours."
        });
        loadPastRequests();
      } else {
        throw new Error("Failed to submit custom request.");
      }
    } catch (err: any) {
      setStatusMsg({
        type: "error",
        text: err.message || "Failed to submit enterprise consultation. Please try again."
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 p-4">
      {/* Upper row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/[0.08] pb-4 gap-4">
        <div>
          <h2 className="text-lg font-black font-sans text-white uppercase tracking-tight flex items-center gap-2">
            <Award className="h-5 w-5 text-brand-cyan animate-pulse" />
            ControlVid.ai Enterprise Consultation
          </h2>
          <p className="text-[11px] text-slate-400">
            Tailor-made custom content pipelines, dedictated rendering clusters, and custom multi-brand shadow channel compliance.
          </p>
        </div>
        <div className="px-3 py-1 bg-[#38bdf8]/10 border border-[#38bdf8]/20 rounded-full text-brand-cyan font-mono text-[10px] font-bold uppercase tracking-wider">
          Enterprise Tier Active Proposal
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Estimation and Form */}
        <div className="lg:col-span-7 bg-[#0A0A0C] border border-white/[0.06] rounded-xl p-5 space-y-5">
          <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-white/[0.04] pb-2">
            <Building2 className="h-4 w-4 text-brand-cyan" />
            Build Custom SLA Contract
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[9px] font-mono font-bold text-slate-500 uppercase">Registered Company Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Corporation"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-[#050507] border border-white/[0.08] focus:border-brand-cyan/40 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-mono font-bold text-slate-500 uppercase">Consulting Email</label>
                <input
                  type="email"
                  disabled
                  value={userEmail}
                  className="w-full bg-[#040405] border border-white/[0.03] rounded-lg px-3 py-2 text-xs text-slate-500 outline-none cursor-not-allowed"
                />
              </div>
            </div>

            {/* Contract Sliders */}
            <div className="space-y-4 bg-black/40 p-4 rounded-xl border border-white/[0.03]">
              
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-slate-400 uppercase font-bold flex items-center gap-1">
                    <Video className="h-3.5 w-3.5 text-brand-cyan" />
                    Target Videos / Month
                  </span>
                  <span className="text-white font-bold">{videoVolume} scripts / mo</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={5000}
                  step={50}
                  value={videoVolume}
                  onChange={(e) => setVideoVolume(parseInt(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-cyan"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-slate-400 uppercase font-bold flex items-center gap-1">
                    <Layers className="h-3.5 w-3.5 text-purple-400" />
                    Shadow Account Nodes
                  </span>
                  <span className="text-white font-bold">{shadowNodes} linked accounts</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={100}
                  step={1}
                  value={shadowNodes}
                  onChange={(e) => setShadowNodes(parseInt(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-cyan"
                />
              </div>

              {/* Checkbox Brand Domain */}
              <label className="flex items-center gap-2.5 pt-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={customDomains}
                  onChange={(e) => setCustomDomains(e.target.checked)}
                  className="w-3.5 h-3.5 rounded bg-black border-white/20 text-brand-cyan focus:ring-0 outline-none"
                />
                <span className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-wide">
                  Include Custom White-Label Ad Domains (+$1,500/yr)
                </span>
              </label>

            </div>

            {/* Custom description */}
            <div className="space-y-1">
              <label className="block text-[9px] font-mono font-bold text-slate-500 uppercase">Specific SLA Compliance / Custom Integrations Requirements</label>
              <textarea
                required
                rows={3}
                placeholder="Describe your creative flow, required ERP/Shopify API integrations, customized watermarks, or dedicated compliance teams..."
                value={customRequirements}
                onChange={(e) => setCustomRequirements(e.target.value)}
                className="w-full bg-[#050507] border border-white/[0.08] focus:border-brand-cyan/40 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none resize-none font-sans"
              />
            </div>

            {statusMsg && (
              <div className={`p-3 rounded-lg text-[10px] flex items-center gap-1.5 ${
                statusMsg.type === "success" 
                  ? "bg-emerald-950/20 text-emerald-450 border border-emerald-900/30" 
                  : "bg-rose-950/20 text-rose-450 border border-rose-900/30"
              }`}>
                <CheckCircle className="h-4 w-4 shrink-0" />
                <span>{statusMsg.text}</span>
              </div>
            )}

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                disabled={submitting}
                className="py-2.5 px-6 bg-brand-cyan hover:bg-brand-cyan/85 text-black font-mono text-xs font-bold uppercase rounded-lg transition-all cursor-pointer flex items-center gap-1.5 border-none outline-none"
              >
                {submitting ? <RotateCw className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                Submit SLA Request
              </button>
            </div>

          </form>
        </div>

        {/* Dynamic Cost Estimate & History */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Estimation card */}
          <div className="bg-gradient-to-br from-brand-cyan/15 to-[#38bdf8]/5 border border-brand-cyan/30 rounded-xl p-5 space-y-4">
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-brand-cyan animate-pulse" />
              SLA Estimated Contract (ACV)
            </h3>
            
            <div className="space-y-1">
              <div className="text-[28px] font-black font-mono text-[#38bdf8] leading-none flex items-center">
                <DollarSign className="h-7 w-7 text-[#38bdf8] -ml-1" />
                {estimatedACV.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                <span className="text-[11px] font-sans text-slate-400 font-bold ml-1">/ year</span>
              </div>
              <p className="text-[9px] text-slate-400 leading-snug font-sans">
                This is an on-the-fly calculated contract pricing based on bulk rendering volume and Shadow Channel nodes.
              </p>
            </div>

            <div className="space-y-2 border-t border-white/[0.08] pt-3.5 font-mono text-[9px] text-slate-400">
              <div className="flex justify-between">
                <span>Annual Video Generation Cost:</span>
                <span className="text-white font-bold">${videoCostAnnual.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Annual Node Management Cost:</span>
                <span className="text-white font-bold">${nodeCostAnnual.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Domain Premium Surcharge:</span>
                <span className="text-white font-bold">${domainPremium.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Consultation Requests History */}
          <div className="bg-[#0A0A0C] border border-white/[0.06] rounded-xl p-5 flex-1 min-h-[150px] overflow-y-auto custom-scrollbar">
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-3">
              Consultation Pipeline ({pastRequests.length})
            </h3>

            {loadingHistory ? (
              <div className="py-8 text-center text-slate-500 font-mono text-[10px] animate-pulse">
                Loading contract pipeline...
              </div>
            ) : pastRequests.length === 0 ? (
              <div className="py-8 text-center text-slate-600 font-sans text-xs">
                No active enterprise requests submitted.
              </div>
            ) : (
              <div className="space-y-3">
                {pastRequests.map((req) => (
                  <div key={req.id} className="p-3 bg-black/40 border border-white/[0.04] rounded-lg space-y-1">
                    <div className="flex items-center justify-between font-mono text-[9px]">
                      <span className="text-slate-400 font-bold uppercase truncate max-w-[120px]">{req.companyName}</span>
                      <span className={`px-1 rounded text-[8px] font-bold uppercase ${
                        req.status === "approved" 
                          ? "bg-emerald-950/40 border border-emerald-900 text-emerald-400" 
                          : req.status === "rejected"
                          ? "bg-rose-950/40 border border-rose-900 text-rose-400"
                          : "bg-blue-950/45 border border-blue-900 text-blue-400"
                      }`}>
                        {req.status || "pending"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono font-bold text-brand-cyan">
                      <span>Estimated Contract:</span>
                      <span>${req.estimatedValue?.toLocaleString(undefined, { minimumFractionDigits: 2 })} / yr</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
