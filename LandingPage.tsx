import { useState } from "react";
import { Copy, Check, Sparkles, Layers, RefreshCw, MessageSquare, Flame, Smartphone, Video, Youtube, Eye } from "lucide-react";
import { ScriptResponse, ScriptSection } from "../types";

interface ScriptCardProps {
  script: ScriptResponse;
  onSendToTeleprompter: () => void;
}

export default function ScriptCard({ script, onSendToTeleprompter }: ScriptCardProps) {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hook");

  const handleCopyText = (text: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {
        fallbackCopyText(text);
      });
    } else {
      fallbackCopyText(text);
    }
  };

  const fallbackCopyText = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("Fallback copy failed:", err);
    }
    document.body.removeChild(textArea);
  };

  const copyToClipboard = (text: string, id: string) => {
    handleCopyText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const copyFullScript = () => {
    const fullText = `TITLE: ${script.title}
PLATFORM: ${script.targetPlatform}
TONE: ${script.targetTone}

[0-5s] HOOK
Visual: ${script.hook.visual}
Voiceover: "${script.hook.audio}"

[5-25s] BODY
Visual: ${script.body.visual}
Voiceover: "${script.body.audio}"

[25-50s] TWIST
Visual: ${script.twist.visual}
Voiceover: "${script.twist.audio}"

[50-60s] CALL TO ACTION
Visual: ${script.cta.visual}
Voiceover: "${script.cta.audio}"

HASHTAGS: ${script.hashtags.map(t => `#${t}`).join(" ")}`;

    handleCopyText(fullText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const getPlatformIcon = (platform: string) => {
    if (platform.includes("TikTok")) return <Smartphone className="h-3.5 w-3.5 mr-1" />;
    if (platform.includes("Reels")) return <Video className="h-3.5 w-3.5 mr-1" />;
    return <Youtube className="h-3.5 w-3.5 mr-1" />;
  };

  const sections: { id: string; name: string; tag: string; time: string; data: ScriptSection; icon: any }[] = [
    {
      id: "hook",
      name: "Scroll Stopper",
      tag: "[HOOK]",
      time: "00:00",
      data: script.hook,
      icon: Flame,
    },
    {
      id: "body",
      name: "Focused Value",
      tag: "[BODY]",
      time: "00:05",
      data: script.body,
      icon: Layers,
    },
    {
      id: "twist",
      name: "Retaining Twist",
      tag: "[TWIST]",
      time: "00:25",
      data: script.twist,
      icon: RefreshCw,
    },
    {
      id: "cta",
      name: "Conversion Action",
      tag: "[CTA]",
      time: "00:50",
      data: script.cta,
      icon: MessageSquare,
    },
  ];

  return (
    <div id="script-workspace" className="space-y-6">
      {/* Top Header details */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center text-[10px] font-bold font-mono px-2 py-0.5 rounded-xs bg-[#121215] text-brand-cyan border border-slate-900 uppercase">
              {getPlatformIcon(script.targetPlatform)}
              {script.targetPlatform}
            </span>
            <span className="inline-flex items-center text-[10px] font-bold font-mono px-2 py-0.5 rounded-xs bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20 uppercase">
              {script.targetTone} TONE
            </span>
            <span className="inline-flex items-center text-[10px] font-bold font-mono px-2 py-0.5 rounded-xs bg-[#121215] text-[#A3A3A3] border border-slate-900 uppercase">
              {script.wordCount} WORDS
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white font-display">
            {script.title}
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            id="copy-full-script-btn"
            onClick={copyFullScript}
            className="inline-flex items-center px-4 py-2 text-xs font-mono font-bold tracking-wider uppercase rounded-xs bg-[#121215] hover:bg-[#18181C] text-slate-300 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
          >
            {copiedAll ? (
              <>
                <Check className="h-3.5 w-3.5 mr-2 text-brand-cyan" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 mr-2" />
                Copy Script
              </>
            )}
          </button>

          <button
            id="send-to-prompter-btn"
            onClick={onSendToTeleprompter}
            className="inline-flex items-center px-4 py-2 text-xs font-mono font-bold tracking-wider uppercase rounded-xs bg-brand-cyan hover:bg-brand-cyan/85 text-[#0A0A0A] shadow-md shadow-brand-cyan/10 transition-colors cursor-pointer"
          >
            <Eye className="h-3.5 w-3.5 mr-2 text-[#0A0A0A]" />
            Teleprompter
          </button>
        </div>
      </div>

      {/* Why it works / Virality Strategy breakdown */}
      <div className="p-4 rounded-xs bg-brand-cyan/5 border border-brand-cyan/15 flex gap-3">
        <Sparkles className="h-4 w-4 text-brand-cyan shrink-0 mt-1 animate-pulse" />
        <div className="text-xs">
          <strong className="text-brand-cyan uppercase font-mono tracking-wider font-bold block mb-1">Viral Strategy: </strong>
          <span className="text-slate-300 leading-relaxed font-sans">
            {script.viralRatingReason}
          </span>
        </div>
      </div>

      {/* Script Sections Layout */}
      <div className="space-y-4 pt-2">
        {sections.map((sect) => {
          const isActive = activeSection === sect.id;
          return (
            <div
              key={sect.id}
              id={`script-section-${sect.id}`}
              onClick={() => setActiveSection(sect.id)}
              className={`relative pl-8 sm:pl-16 pr-4 py-4 border-l-4 transition-all duration-150 cursor-pointer group ${
                isActive
                  ? "border-brand-cyan bg-brand-cyan/5"
                  : "border-slate-800 bg-transparent hover:border-slate-700 hover:bg-[#18181C]"
              }`}
            >
              {/* Static / Absolute Timestamp left column */}
              <div
                className={`absolute left-0 sm:left-4 top-4 font-mono font-black text-xs sm:text-sm tracking-tight w-6 sm:w-10 text-right ${
                  isActive ? "text-brand-cyan" : "text-slate-500 group-hover:text-slate-400"
                }`}
              >
                {sect.time}
              </div>

              {/* Tag header */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs font-black uppercase text-brand-cyan tracking-wider">
                    {sect.tag}
                  </span>
                  <span className="text-[10px] text-slate-550 font-mono font-semibold uppercase hidden sm:inline">
                    // {sect.name}
                  </span>
                </div>

                <button
                  id={`copy-btn-${sect.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(sect.data.audio, sect.id);
                  }}
                  className="p-1 rounded-xs hover:bg-slate-900 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                  title="Copy this voiceover segment"
                >
                  {copiedSection === sect.id ? (
                    <span className="text-[10px] font-mono font-bold text-brand-cyan">COPIED</span>
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mt-2">
                {/* Visual block */}
                <div className="md:col-span-4 p-3 rounded-2xs bg-[#121215] border border-slate-900">
                  <span className="block text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1 font-mono">
                    SCENE / VISUAL_ACTION
                  </span>
                  <p className="text-xs text-[#A3A3A3] font-sans leading-relaxed italic">
                    {sect.data.visual}
                  </p>
                </div>

                {/* Audio voiceover text block */}
                <div className="md:col-span-8">
                  <span className="block text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1 font-mono">
                    VOICEOVER / AUDIO_SCRIPT
                  </span>
                  <p className={`text-sm sm:text-base font-sans font-semibold leading-relaxed ${
                    sect.id === "twist" ? "text-brand-cyan italic" : "text-slate-100"
                  }`}>
                    "{sect.data.audio}"
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Suggested Hashtags */}
      <div className="flex flex-wrap gap-2 items-center pt-3 border-t border-slate-800">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">
          HASHTAG_OPTIMIZATION:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {script.hashtags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono font-bold px-2 py-0.5 rounded-2xs bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan uppercase"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
