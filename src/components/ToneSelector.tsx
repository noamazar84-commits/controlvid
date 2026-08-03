import { Flame, Brain, Zap, Laugh, Sparkles, HelpCircle } from "lucide-react";
import { ScriptTone } from "../types";

interface ToneSelectorProps {
  selected: ScriptTone;
  onChange: (tone: ScriptTone) => void;
}

export default function ToneSelector({ selected, onChange }: ToneSelectorProps) {
  const tones: { value: ScriptTone; label: string; description: string; icon: any }[] = [
    {
      value: "Controversial",
      label: "Controversial",
      description: "Shock-value hook, polarizes to spark debate",
      icon: Flame,
    },
    {
      value: "Educational",
      label: "Educational",
      description: "Crisp, dense value packed into brief tips",
      icon: Brain,
    },
    {
      value: "Motivational",
      label: "Motivational",
      description: "High energy, direct call to self-improvement",
      icon: Zap,
    },
    {
      value: "Humorous",
      label: "Humorous",
      description: "Witty, playful, and loaded with dry sarcasm",
      icon: Laugh,
    },
    {
      value: "Mysterious",
      label: "Mysterious",
      description: "Intriguing curiosity-gaps that keep people looping",
      icon: HelpCircle,
    },
    {
      value: "Inspiring",
      label: "Inspiring",
      description: "Aesthetic storytelling with resonant insight",
      icon: Sparkles,
    },
  ];

  return (
    <div id="tone-selector-container" className="space-y-2">
      <span className="label text-[10px] uppercase tracking-[2px] text-slate-400 font-mono block">
        TONE_SETTINGS
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {tones.map((tone) => {
          const IconComponent = tone.icon;
          const isActive = selected === tone.value;
          return (
            <button
              key={tone.value}
              id={`tone-btn-${tone.value.toLowerCase()}`}
              type="button"
              onClick={() => onChange(tone.value)}
              className={`p-3 rounded-xs border text-left transition-all duration-150 group flex items-start space-x-2.5 cursor-pointer ${
                isActive
                  ? "bg-brand-cyan/10 border-brand-cyan text-brand-cyan ring-1 ring-brand-cyan/20"
                  : "bg-[#121215] border-slate-900 text-slate-300 hover:border-slate-700 hover:bg-[#18181C]"
              }`}
            >
              <div
                className={`p-1.5 rounded-2xs shrink-0 mt-0.5 ${
                  isActive
                    ? "bg-brand-cyan text-[#0A0A0A]"
                    : "bg-slate-900 text-slate-400 group-hover:bg-slate-850"
                }`}
              >
                <IconComponent className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className={`block text-xs font-bold font-display uppercase tracking-tight ${isActive ? "text-brand-cyan" : "text-slate-200"}`}>
                  {tone.label}
                </span>
                <span className={`block text-[11px] mt-1 leading-normal font-sans ${isActive ? "text-brand-cyan/85" : "text-slate-400"}`}>
                  {tone.description}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

