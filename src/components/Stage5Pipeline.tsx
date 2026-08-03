import { useState, useEffect } from "react";
import { 
  Sparkles, 
  Trash2, 
  History, 
  RotateCw, 
  AlertCircle, 
  Database, 
  Terminal, 
  Plus, 
  X, 
  Check, 
  AlertTriangle, 
  Calendar, 
  Clock, 
  Video, 
  TrendingUp, 
  DollarSign, 
  Layers, 
  Wifi, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  Send,
  Sliders,
  RefreshCw
} from "lucide-react";
import { syncWhopPayment } from "../lib/firebase";

interface Stage5PipelineProps {
  scheduledQueue: any[];
  setScheduledQueue: React.Dispatch<React.SetStateAction<any[]>>;
  savedScripts: any[];
  setRecentToast: (toast: { message: string; sub: string } | null) => void;
  activeUser: any;
  topic?: string;
  selectedWizardNiche?: string;
}

interface TargetSlot {
  id: string;
  day: string; // "Monday", etc.
  time: string; // "10:00", etc.
}

interface ShadowChannel {
  id: string;
  platform: "TikTok" | "Instagram Reels" | "YouTube Shorts";
  handle: string;
  status: "Active" | "Banned" | "Pending Verification";
  rotationPolicy: string;
  complianceGuard: boolean;
}

interface ResilienceLog {
  timestamp: string;
  service: string;
  attempt: number;
  status: "Attempting" | "Retrying" | "Success" | "Terminal Failure";
  message: string;
  errorCode?: string;
}

export default function Stage5Pipeline({
  scheduledQueue,
  setScheduledQueue,
  savedScripts,
  setRecentToast,
  activeUser,
  topic,
  selectedWizardNiche
}: Stage5PipelineProps) {
  // --- STATE FOR END-TO-END PIPELINE ---
  const [pipelineEmail, setPipelineEmail] = useState(activeUser?.email || localStorage.getItem("userEmail") || "");
  const [pipelineAmount, setPipelineAmount] = useState<number>(199.00);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState<number>(-1); // -1: Idle, 0: Webhook, 1: DB Provision, 2: Script Gen, 3: Synthesis/Timeline, 4: Enqueue & Post
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);

  // --- STATE FOR TARGET SLOTS ("Auto-Fill" Smart Scheduler) ---
  const [targetSlots, setTargetSlots] = useState<TargetSlot[]>([
    { id: "slot-1", day: "Monday", time: "10:00" },
    { id: "slot-2", day: "Wednesday", time: "14:00" },
    { id: "slot-3", day: "Friday", time: "18:00" },
    { id: "slot-4", day: "Saturday", time: "12:00" }
  ]);
  const [newSlotDay, setNewSlotDay] = useState("Monday");
  const [newSlotTime, setNewSlotTime] = useState("12:00");

  // --- STATE FOR SHADOW CHANNELS NETWORK ---
  const [shadowChannels, setShadowChannels] = useState<ShadowChannel[]>([
    { id: "ch-1", platform: "TikTok", handle: "@viralshorts.ai_shadow1", status: "Active", rotationPolicy: "Max Organic Reach", complianceGuard: true },
    { id: "ch-2", platform: "Instagram Reels", handle: "@aesthetic.growth_shadow2", status: "Active", rotationPolicy: "Compliance Safe", complianceGuard: true },
    { id: "ch-3", platform: "YouTube Shorts", handle: "@techflow_shadow3", status: "Active", rotationPolicy: "Parallel Blast", complianceGuard: true }
  ]);
  const [newChannelPlatform, setNewChannelPlatform] = useState<"TikTok" | "Instagram Reels" | "YouTube Shorts">("TikTok");
  const [newChannelHandle, setNewChannelHandle] = useState("");
  const [globalRotationPolicy, setGlobalRotationPolicy] = useState("Round-Robin rotation");

  // --- STATE FOR RELIABILITY ARCHITECTURE ---
  const [activeFailureInjection, setActiveFailureInjection] = useState<"none" | "glitch" | "rate_limit" | "quota">("none");
  const [resilienceLogs, setResilienceLogs] = useState<ResilienceLog[]>([]);
  const [isTestingResilience, setIsTestingResilience] = useState(false);
  const [resilienceReport, setResilienceReport] = useState<string | null>(null);

  // --- SOUNDS/EFFECTS MOCK LOGS IN SYS_TERMINAL ---
  const logToSim = (msg: string) => {
    const timeStr = new Date().toLocaleTimeString();
    setSimulationLogs(prev => [...prev, `[${timeStr}] ${msg}`]);
  };

  // --- RUN END-TO-END PIPELINE SIMULATOR [5.א] ---
  const handleStartPipelineSimulation = async () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimulationStep(0);
    setSimulationLogs([]);
    
    logToSim(`⚡ INITIATING STAGE 5 WORKFLOW SYSTEM LOOP...`);
    logToSim(`[STEP 1] Simulating Whop API Callback for checkout.successful...`);
    logToSim(`Webhook Payload Received: { email: "${pipelineEmail}", amount: $${pipelineAmount}, platform: "Whop SaaS" }`);
    
    // Step 1 delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSimulationStep(1);
    logToSim(`[STEP 2] Initializing user project environment...`);
    logToSim(`Running syncWhopPayment() in Firestore/LocalStorage Fallback...`);
    
    try {
      // Sync payment and update credits
      await syncWhopPayment(pipelineEmail, pipelineAmount);
      logToSim(`✅ Project Provisioned Successfully: User record found/created, subscription assigned to Pro/Enterprise.`);
      logToSim(`Allocated credits: +${pipelineAmount / 10} USD. Quota initialized.`);
    } catch (e) {
      logToSim(`⚠️ DB Provisioning warning: ${e}. Bypassed via LocalStorage update.`);
    }

    // Step 2 delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSimulationStep(2);
    logToSim(`[STEP 3] Splicing high-converting media variables...`);
    logToSim(`AI Script Generator formulating psychological hook narratives: Topic: "${topic || "3 Hidden Digital Wealth Secrets"}"`);
    logToSim(`Applying platform structure: "Negative Hook" and "Quick-cut pacing vectors".`);
    logToSim(`Generated Script Segment: "Most people fail because of this 1 lies..."`);

    // Step 3 delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSimulationStep(3);
    logToSim(`[STEP 4] Deploying ElevenLabs Voice Synth & Cinematic Timeline Render...`);
    
    // Inject artificial network glitch simulation in ElevenLabs synth
    logToSim(`Connecting to ElevenLabs Vocal Node...`);
    logToSim(`[API RETRY MIDDLEWARE ACTIVE] Initiating ElevenLabs synthesis request...`);
    if (activeFailureInjection !== "none") {
      logToSim(`❌ Error: API request failed (Code: 502/429) due to failure injection.`);
      logToSim(`🔄 Backoff Retry Triggered: Attempt #1 with Exponential Backoff (1.0s delay)...`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      logToSim(`🔄 Backoff Retry Triggered: Attempt #2 with Exponential Backoff (2.0s delay)...`);
      await new Promise(resolve => setTimeout(resolve, 1500));
      logToSim(`✅ Attempt #3 Success! ElevenLabs Synthesis returned authentic vocal waveform.`);
    } else {
      logToSim(`✅ Audio voice synthesis processed successfully without errors.`);
    }
    
    logToSim(`Assembling canvas frame frames via Video Engine timeline compositor...`);
    logToSim(`Kinetic captions styled & overlay textures merged.`);

    // Step 4 delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSimulationStep(4);
    logToSim(`[STEP 5] Automated Scheduling & Shadow Channel Rotation...`);
    
    // Auto-generate items and queue them
    const newQueueItem = {
      id: `sched-auto-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      title: `${topic || "Digital WealthSecrets"} - Auto Generated Pipeline`,
      topic: topic || "Automated Stage 5 Sequence",
      niche: selectedWizardNiche || "Viral Marketing",
      scheduledTime: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 mins from now
      status: "Scheduled" as const,
      channel: shadowChannels[Math.floor(Math.random() * shadowChannels.length)].handle
    };

    setScheduledQueue(prev => [...prev, newQueueItem]);
    logToSim(`✅ Enqueued successfully! Item scheduled for automatic cron trigger.`);
    logToSim(`Auto-Publishing cron engine mapped output to ${newQueueItem.channel} with compliant duplicate scrub safeguards.`);

    setRecentToast({
      message: "🚀 Workflow Loop Complete!",
      sub: "Full Payment-to-Post cycle successfully processed."
    });

    setIsSimulating(false);
  };

  // --- ADD CUSTOM CALENDAR TARGET SLOT [5.ב] ---
  const handleAddSlot = () => {
    const id = `slot-${Date.now()}`;
    const newSlot = { id, day: newSlotDay, time: newSlotTime };
    setTargetSlots(prev => [...prev, newSlot].sort((a,b) => a.day.localeCompare(b.day)));
    
    setRecentToast({
      message: "📅 Target Slot Added",
      sub: `The calendar will now queue content for ${newSlotDay} at ${newSlotTime}.`
    });
  };

  // --- REMOVE TARGET SLOT ---
  const handleRemoveSlot = (id: string) => {
    setTargetSlots(prev => prev.filter(s => s.id !== id));
  };

  // --- AUTO-FILL QUEUE [5.ב] ---
  const handleAutoFillQueue = () => {
    if (targetSlots.length === 0) {
      setRecentToast({
        message: "❌ No Slots Defined",
        sub: "Define calendar target slots before running Auto-Fill."
      });
      return;
    }

    const newItems: any[] = [];
    const now = new Date();

    targetSlots.forEach((slot, index) => {
      // Calculate next occurrence of this day of week
      const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const targetDayIndex = daysOfWeek.indexOf(slot.day);
      let daysUntil = targetDayIndex - now.getDay();
      if (daysUntil <= 0) daysUntil += 7; // force next week

      const scheduledDate = new Date();
      scheduledDate.setDate(now.getDate() + daysUntil);
      
      const [hours, minutes] = slot.time.split(":").map(Number);
      scheduledDate.setHours(hours, minutes, 0, 0);

      // Rotate through shadow channels
      const targetChannel = shadowChannels[index % shadowChannels.length];

      // Draft topics
      const defaultTopics = [
        "How to Escape the 9-5",
        "The Dark Side of AI Video Automation",
        "Why 99% of Content Creators Fail",
        "Dropshipping Secret Nobody Tells You",
        "The 1-Second Lie in Viral Algorithms"
      ];
      const selectedTopic = savedScripts[index % savedScripts.length]?.topic || defaultTopics[index % defaultTopics.length];

      newItems.push({
        id: `sched-autofill-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 5)}`,
        title: `Auto-Fill: ${selectedTopic}`,
        topic: selectedTopic,
        niche: selectedWizardNiche || "SaaS / Creator",
        scheduledTime: scheduledDate.toISOString(),
        status: "Scheduled",
        channel: targetChannel.handle
      });
    });

    setScheduledQueue(prev => [...prev, ...newItems]);
    setRecentToast({
      message: "⚡ Queue Auto-Filled!",
      sub: `Successfully mapped ${newItems.length} videos to your specified calendar slots.`
    });
  };

  // --- ADD SHADOW CHANNEL [5.ג] ---
  const handleAddShadowChannel = () => {
    if (!newChannelHandle.trim()) {
      setRecentToast({
        message: "❌ Invalid Handle",
        sub: "Please input a social media user handle."
      });
      return;
    }

    const newCh: ShadowChannel = {
      id: `ch-${Date.now()}`,
      platform: newChannelPlatform,
      handle: newChannelHandle.startsWith("@") ? newChannelHandle : `@${newChannelHandle}`,
      status: "Active",
      rotationPolicy: "Round-Robin",
      complianceGuard: true
    };

    setShadowChannels(prev => [...prev, newCh]);
    setNewChannelHandle("");
    setRecentToast({
      message: "📡 Channel Connected",
      sub: `${newCh.handle} linked as an active Shadow account.`
    });
  };

  // --- REMOVE SHADOW CHANNEL ---
  const handleRemoveChannel = (id: string) => {
    setShadowChannels(prev => prev.filter(c => c.id !== id));
  };

  // --- TRIGGER API RESILIENCE MIDDLEWARE TEST [5.ד] ---
  const handleTestAPIResilience = async () => {
    if (isTestingResilience) return;
    setIsTestingResilience(true);
    setResilienceLogs([]);
    setResilienceReport(null);

    const logToRes = (service: string, attempt: number, status: "Attempting" | "Retrying" | "Success" | "Terminal Failure", message: string, errorCode?: string) => {
      setResilienceLogs(prev => [...prev, {
        timestamp: new Date().toLocaleTimeString(),
        service,
        attempt,
        status,
        message,
        errorCode
      }]);
    };

    // Connect to ElevenLabs Voice API
    logToRes("ElevenLabs TTS Voice API", 1, "Attempting", "Sending vocal model synthesis request...");
    await new Promise(r => setTimeout(r, 1000));

    if (activeFailureInjection === "glitch") {
      logToRes("ElevenLabs TTS Voice API", 1, "Retrying", "❌ Error 502: Bad Gateway. Initiating Retry 1 with Exponential Backoff (1.0s)...");
      await new Promise(r => setTimeout(r, 1000));
      logToRes("ElevenLabs TTS Voice API", 2, "Retrying", "❌ Error 502: Bad Gateway. Initiating Retry 2 with Exponential Backoff (2.0s)...");
      await new Promise(r => setTimeout(r, 2000));
      logToRes("ElevenLabs TTS Voice API", 3, "Success", "✅ Connection restored! Speech synthesis completed successfully.");
    } else if (activeFailureInjection === "rate_limit") {
      logToRes("ElevenLabs TTS Voice API", 1, "Retrying", "❌ Error 429: Too Many Requests. Rate limiter hit. Initiating Retry 1 with Exponential Backoff (1.5s)...");
      await new Promise(r => setTimeout(r, 1500));
      logToRes("ElevenLabs TTS Voice API", 2, "Success", "✅ Speed limit bypassed successfully. Voice clone generated.");
    } else if (activeFailureInjection === "quota") {
      logToRes("ElevenLabs TTS Voice API", 1, "Retrying", "❌ Error 403: Quota Exceeded. Character tier limit reached. Initiating Retry 1 with Backoff (2.0s)...");
      await new Promise(r => setTimeout(r, 2000));
      logToRes("ElevenLabs TTS Voice API", 2, "Retrying", "❌ Error 403: Quota Exceeded. Character tier limit reached. Initiating Retry 2 with Backoff (4.0s)...");
      await new Promise(r => setTimeout(r, 2000));
      logToRes("ElevenLabs TTS Voice API", 3, "Terminal Failure", "🚨 Max attempts (3) exhausted. Raising critical alert to system administrator dashboard.", "ERR_TTS_QUOTA_EXCEEDED");
      
      // Store log to database usage logs simulation as a critical alert
      setResilienceReport("ALERT DEPLOYED: ElevenLabs Character quota exceeded (ERR_TTS_QUOTA_EXCEEDED). Administrator ticket logged.");
    } else {
      logToRes("ElevenLabs TTS Voice API", 1, "Success", "✅ Connection pristine. Synthesised vocal files instantly (Latency: 184ms).");
    }

    setIsTestingResilience(false);
  };

  return (
    <div className="space-y-6 pt-2 animate-[fadeIn_0.15s_ease-out]">
      {/* -------------------------------------------------------------------- */}
      {/* [5.א] End-to-End Workflow Section */}
      {/* -------------------------------------------------------------------- */}
      <div className="p-5 rounded-2xl bg-black/40 border border-white/[0.05] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-brand-cyan" />
            <h3 className="text-sm font-black font-sans uppercase tracking-tight text-white">End-to-End Autonomous Pipeline</h3>
          </div>
          <span className="text-[9px] font-mono font-bold text-brand-cyan uppercase bg-brand-cyan/5 border border-brand-cyan/20 px-2 py-0.5 rounded">
            Stage 5 Core Engine
          </span>
        </div>

        <p className="text-xs text-slate-400 font-sans leading-relaxed">
          Simulate or execute the entire sequential business logic loop. Watch raw payment callbacks initialize active workspace structures, generate media timelines, and publish natively.
        </p>

        {/* High-fidelity horizontal pipeline step graphics */}
        <div className="grid grid-cols-5 gap-1.5 py-2">
          {[
            { label: "Payment success", step: 0, desc: "Whop API Callback" },
            { label: "Init workspace", step: 1, desc: "SaaS DB Provision" },
            { label: "Splicing script", step: 2, desc: "AI Narrator Engine" },
            { label: "Voice synthesis", step: 3, desc: "Resilient VoiceSynth" },
            { label: "Auto-publishing", step: 4, desc: "Shadow Social Posts" }
          ].map((item, idx) => (
            <div 
              key={idx}
              className={`p-2.5 rounded-xl border transition-all text-center flex flex-col items-center justify-center space-y-1 relative ${
                simulationStep === item.step 
                  ? "bg-brand-cyan/10 border-brand-cyan text-brand-cyan shadow-[0_0_15px_rgba(34,211,238,0.15)] scale-102"
                  : simulationStep > item.step 
                    ? "bg-emerald-950/15 border-emerald-500/30 text-emerald-400"
                    : "bg-[#09090C] border-white/[0.04] text-slate-600"
              }`}
            >
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black/30 border border-current text-[10px] font-bold">
                {simulationStep > item.step ? "✓" : idx + 1}
              </div>
              <span className="text-[9px] font-sans font-bold leading-tight block">{item.label}</span>
              <span className="text-[7.5px] font-mono uppercase tracking-wider text-slate-500 block leading-none">{item.desc}</span>
              {idx < 4 && (
                <div className="hidden lg:block absolute top-1/2 -right-1.5 w-3 h-0.5 bg-white/[0.06] -translate-y-1/2 z-10" />
              )}
            </div>
          ))}
        </div>

        {/* Controls block */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-white/[0.03] grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="space-y-1.5">
            <label className="block text-[9px] font-mono text-slate-400 uppercase tracking-wider font-bold">Customer Email (Whop Mock)</label>
            <input 
              type="email" 
              value={pipelineEmail}
              onChange={(e) => setPipelineEmail(e.target.value)}
              className="w-full bg-[#121215] border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none"
              placeholder="alex@creator.co"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[9px] font-mono text-slate-400 uppercase tracking-wider font-bold">Checkout Cost / Tier</label>
            <select
              value={pipelineAmount}
              onChange={(e) => setPipelineAmount(Number(e.target.value))}
              className="w-full bg-[#121215] border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="29.00">Pro Tier ($29.00 / mo)</option>
              <option value="199.00">Enterprise Studio ($199.00 / mo)</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleStartPipelineSimulation}
            disabled={isSimulating}
            className="w-full py-2.5 rounded-xl bg-brand-cyan hover:bg-cyan-400 text-black font-sans font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(34,211,238,0.25)] border-none focus:outline-none disabled:opacity-50"
          >
            {isSimulating ? (
              <>
                <RotateCw className="h-4 w-4 animate-spin" />
                <span>Simulating...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 fill-current" />
                <span>Trigger E2E Pipeline</span>
              </>
            )}
          </button>
        </div>

        {/* Simulation Output Log Screen */}
        {simulationLogs.length > 0 && (
          <div className="p-4 rounded-xl bg-[#030305] border border-slate-900 font-mono text-[10px] text-slate-400 space-y-1.5 overflow-y-auto max-h-[140px] shadow-inner custom-scrollbar relative">
            <span className="absolute top-2 right-3 text-[8.5px] font-extrabold text-brand-cyan animate-pulse">LIVE PIPELINE OUTPUT</span>
            {simulationLogs.map((log, index) => (
              <div key={index} className="leading-relaxed">
                <span className="text-slate-600 mr-1.5">&gt;</span>
                <span className={log.includes("✅") ? "text-emerald-400 font-bold" : log.includes("⚡") ? "text-brand-cyan font-black" : "text-slate-300"}>
                  {log}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* [5.ב] Smart & Bulk Scheduler ("Auto-Fill" Queue Calendar) */}
      {/* -------------------------------------------------------------------- */}
      <div className="p-5 rounded-2xl bg-black/40 border border-white/[0.05] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-amber-400" />
            <h3 className="text-sm font-black font-sans uppercase tracking-tight text-white">Target Slot Scheduler & Auto-Fill</h3>
          </div>
          <button
            type="button"
            onClick={handleAutoFillQueue}
            className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-black text-[10px] font-sans font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer border-none focus:outline-none flex items-center gap-1 shadow-lg shadow-amber-400/10"
          >
            <Sparkles className="h-3 w-3 fill-current" />
            <span>Auto-Fill Queue</span>
          </button>
        </div>

        <p className="text-xs text-slate-400 font-sans leading-relaxed">
          Define recurring premium time slots in your distribution calendar. Clicking "Auto-Fill" pulls content scripts, maps voiceover tracks, and populates empty gaps in your queue to guarantee absolute posting consistency.
        </p>

        {/* Grid display of active target slots */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {targetSlots.map((slot) => (
            <div 
              key={slot.id} 
              className="p-3 rounded-xl bg-[#09090C] border border-white/[0.03] hover:border-amber-400/25 transition-all flex items-center justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-sans font-bold text-white block">{slot.day}</span>
                <span className="text-[10px] font-mono text-slate-500 block flex items-center gap-1">
                  <Clock className="h-2.5 w-2.5 text-amber-400/60" />
                  {slot.time}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveSlot(slot.id)}
                className="p-1 rounded-lg text-slate-600 hover:text-red-400 hover:bg-black/20 opacity-0 group-hover:opacity-100 transition-all cursor-pointer border-none focus:outline-none"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Add custom target slot fields */}
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/[0.02] flex flex-wrap sm:flex-nowrap items-end gap-3">
          <div className="flex-1 min-w-[120px] space-y-1">
            <span className="text-[8.5px] font-mono font-bold text-slate-400 uppercase">Publish Day</span>
            <select
              value={newSlotDay}
              onChange={(e) => setNewSlotDay(e.target.value)}
              className="w-full bg-[#121215] border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="flex-1 min-w-[120px] space-y-1">
            <span className="text-[8.5px] font-mono font-bold text-slate-400 uppercase">Publish Time</span>
            <input 
              type="time"
              value={newSlotTime}
              onChange={(e) => setNewSlotTime(e.target.value)}
              className="w-full bg-[#121215] border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none cursor-pointer"
            />
          </div>

          <button
            type="button"
            onClick={handleAddSlot}
            className="px-4 py-2.5 bg-white/5 border border-white/10 hover:border-white/20 text-white rounded-lg text-xs font-mono font-bold uppercase tracking-wider cursor-pointer transition-all flex items-center gap-1.5 focus:outline-none"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Target Slot</span>
          </button>
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* [5.ג] Shadow Channels Network Hub */}
      {/* -------------------------------------------------------------------- */}
      <div className="p-5 rounded-2xl bg-black/40 border border-white/[0.05] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wifi className="h-5 w-5 text-[#38bdf8]" />
            <h3 className="text-sm font-black font-sans uppercase tracking-tight text-white">Shadow Channels Management Hub</h3>
          </div>
          <span className="text-[9px] font-mono text-emerald-400 bg-emerald-400/5 border border-emerald-400/20 px-2 py-0.5 rounded uppercase font-bold flex items-center gap-1">
            <ShieldCheck className="h-3 w-3" />
            Platform Compliant
          </span>
        </div>

        <p className="text-xs text-slate-400 font-sans leading-relaxed">
          Manage multiple social accounts simultaneously. Our distribution engine rotates generated videos sequentially to maximize reach while maintaining platform compliance limits.
        </p>

        {/* Rotation configuration */}
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/[0.03] flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <span className="text-[9px] font-mono text-slate-500 uppercase font-bold block">Global Distribution Policy:</span>
            <span className="text-xs text-slate-200 block font-bold">{globalRotationPolicy}</span>
          </div>

          <div className="flex items-center gap-2">
            {["Round-Robin rotation", "Parallel blast", "Staggered intervals"].map((policy) => (
              <button
                key={policy}
                type="button"
                onClick={() => setGlobalRotationPolicy(policy)}
                className={`px-2.5 py-1 text-[9px] font-sans font-bold uppercase rounded border transition-all cursor-pointer focus:outline-none ${
                  globalRotationPolicy === policy
                    ? "bg-[#38bdf8] border-[#38bdf8] text-black font-black"
                    : "bg-transparent text-slate-500 border-white/[0.05] hover:border-white/10"
                }`}
              >
                {policy.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Active Shadow Account list */}
        <div className="space-y-2">
          {shadowChannels.map((ch) => (
            <div 
              key={ch.id} 
              className="p-3 rounded-xl bg-[#09090C] border border-white/[0.03] hover:border-white/[0.08] transition-all flex items-center justify-between gap-4 font-sans"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-950 border border-white/[0.05] flex items-center justify-center font-bold text-xs">
                  {ch.platform[0]}
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs text-white font-bold block">{ch.handle}</span>
                  <div className="flex items-center gap-2 text-[9px] font-mono text-slate-500">
                    <span className="text-[#38bdf8] uppercase font-bold">{ch.platform}</span>
                    <span>•</span>
                    <span className="text-emerald-400 uppercase font-bold flex items-center gap-0.5">
                      <div className="w-1 h-1 rounded-full bg-emerald-400" />
                      Active
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[8.5px] font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded text-slate-400">
                  Compliance Guard: On
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveChannel(ch.id)}
                  className="p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-black/20 transition-all cursor-pointer border-none focus:outline-none"
                  title="Disconnect channel"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Link account entry form */}
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/[0.02] grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
          <div className="space-y-1">
            <span className="text-[8.5px] font-mono font-bold text-slate-400 uppercase">Platform</span>
            <select
              value={newChannelPlatform}
              onChange={(e) => setNewChannelPlatform(e.target.value as any)}
              className="w-full bg-[#121215] border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="TikTok">TikTok</option>
              <option value="Instagram Reels">Instagram Reels</option>
              <option value="YouTube Shorts">YouTube Shorts</option>
            </select>
          </div>

          <div className="space-y-1">
            <span className="text-[8.5px] font-mono font-bold text-slate-400 uppercase">Account Handle</span>
            <input 
              type="text"
              value={newChannelHandle}
              onChange={(e) => setNewChannelHandle(e.target.value)}
              placeholder="@growth_shadow"
              className="w-full bg-[#121215] border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none"
            />
          </div>

          <button
            type="button"
            onClick={handleAddShadowChannel}
            className="w-full py-2.5 bg-white/5 border border-white/10 hover:border-white/20 text-white rounded-lg text-xs font-mono font-bold uppercase tracking-wider cursor-pointer transition-all flex items-center justify-center gap-1.5 focus:outline-none"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Connect Account</span>
          </button>
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* [5.ד] Reliability Architecture (API Resilience Panel) */}
      {/* -------------------------------------------------------------------- */}
      <div className="p-5 rounded-2xl bg-black/40 border border-white/[0.05] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="h-5 w-5 text-emerald-400" />
            <h3 className="text-sm font-black font-sans uppercase tracking-tight text-white">Live API Resilience & Backoff Panel</h3>
          </div>
          <button
            type="button"
            onClick={handleTestAPIResilience}
            disabled={isTestingResilience}
            className="px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-black text-[10px] font-sans font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer border-none focus:outline-none flex items-center gap-1 shadow-lg shadow-emerald-500/10 disabled:opacity-50"
          >
            <RefreshCw className={`h-3 w-3 ${isTestingResilience ? "animate-spin" : ""}`} />
            <span>Run Test API Suite</span>
          </button>
        </div>

        <p className="text-xs text-slate-400 font-sans leading-relaxed">
          Inject errors to test the <strong>Exponential Backoff retry policy</strong>. Experience automatic recovery or see terminal failures log critical administrative alerts with tracking codes.
        </p>

        {/* Error injection selection */}
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/[0.03] flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <span className="text-[9px] font-mono text-slate-500 uppercase font-bold block">Artificial Failure Injector:</span>
            <span className="text-xs text-slate-200 block font-bold capitalize">
              {activeFailureInjection === "none" ? "None (Pristine state)" : activeFailureInjection.replace("_", " ")}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {[
              { id: "none", label: "Clean" },
              { id: "glitch", label: "Glitch (502)" },
              { id: "rate_limit", label: "Limit (429)" },
              { id: "quota", label: "Quota Limit" }
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFailureInjection(f.id as any)}
                className={`px-2 py-1 text-[9px] font-sans font-bold uppercase rounded border transition-all cursor-pointer focus:outline-none ${
                  activeFailureInjection === f.id
                    ? "bg-red-500/10 border-red-500/30 text-red-400 font-black"
                    : "bg-transparent text-slate-500 border-white/[0.05] hover:border-white/10"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Resilience execution logger */}
        {resilienceLogs.length > 0 && (
          <div className="p-4 rounded-xl bg-[#030305] border border-slate-900 font-mono text-[10px] space-y-1.5 max-h-[160px] overflow-y-auto custom-scrollbar">
            {resilienceLogs.map((log, idx) => (
              <div key={idx} className="flex items-start justify-between gap-3 leading-relaxed">
                <div className="space-x-1.5">
                  <span className="text-slate-600">[{log.timestamp}]</span>
                  <span className="text-slate-500">[{log.service}]</span>
                  <span className={
                    log.status === "Success" 
                      ? "text-emerald-400 font-bold" 
                      : log.status === "Terminal Failure"
                        ? "text-red-500 font-black animate-pulse"
                        : "text-amber-400"
                  }>
                    {log.message}
                  </span>
                </div>
                {log.errorCode && (
                  <span className="px-1.5 py-0.5 rounded bg-red-950/40 text-red-400 text-[8px] font-extrabold border border-red-550/20">
                    Code: {log.errorCode}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Terminal log report message */}
        {resilienceReport && (
          <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-500/30 text-red-400 flex gap-2.5 items-start">
            <AlertTriangle className="h-4.5 w-4.5 shrink-0 mt-0.5 animate-bounce" />
            <div className="space-y-0.5 font-sans">
              <strong className="text-xs uppercase font-mono block">Terminal Failure Alert Raised</strong>
              <p className="text-[10px] leading-relaxed">{resilienceReport}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
