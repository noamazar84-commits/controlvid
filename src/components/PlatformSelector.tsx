import { Smartphone, Clapperboard, Youtube } from "lucide-react";
import { ShortFormPlatform } from "../types";

interface PlatformSelectorProps {
  selected: ShortFormPlatform;
  onChange: (platform: ShortFormPlatform) => void;
}

export default function PlatformSelector({ selected, onChange }: PlatformSelectorProps) {
  const platforms: { value: ShortFormPlatform; label: string; description: string; icon: any }[] = [
    {
      value: "TikTok",
      label: "TIKTOK",
      description: "Fast-paced, raw, high-hook emphasis",
      icon: Smartphone,
    },
    {
      value: "Instagram Reels",
      label: "REELS",
      description: "Aesthetic, high production, educational",
      icon: Clapperboard,
    },
    {
      value: "YouTube Shorts",
      label: "SHORTS",
      description: "Direct, keyword-rich, value loops",
      icon: Youtube,
    },
  ];

  return (
    <div id="platform-selector-container" className="space-y-2">
      <span className="label text-[10px] uppercase tracking-[2px] text-slate-400 font-mono block">
        PLATFORM_SELECT
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {platforms.map((plat) => {
          const IconComponent = plat.icon;
          const isActive = selected === plat.value;
          return (
            <button
              key={plat.value}
              id={`platform-btn-${plat.value.replace(/\s+/g, "-").toLowerCase()}`}
              type="button"
              onClick={() => onChange(plat.value)}
              className={`p-4 rounded-xs border text-left transition-all duration-150 group flex flex-col justify-between h-28 cursor-pointer ${
                isActive
                  ? "bg-brand-cyan/10 border-brand-cyan text-brand-cyan ring-1 ring-brand-cyan/20"
                  : "bg-[#121215] border-slate-900 text-slate-300 hover:border-slate-700 hover:bg-[#18181C]"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <IconComponent className={`h-4 w-4 ${isActive ? "text-brand-cyan" : "text-slate-400"}`} />
                {isActive && (
                  <span className="text-[9px] font-mono font-bold bg-brand-cyan text-[#0A0A0A] px-1.5 py-0.5 rounded-2xs shadow-sm shadow-brand-cyan/20">
                    ACTIVE
                  </span>
                )}
              </div>
              <div className="mt-3">
                <span className="block text-sm font-bold font-display tracking-tight leading-none uppercase text-white">
                  {plat.label}
                </span>
                <span className={`block text-[10px] mt-1 leading-normal font-sans ${isActive ? "text-brand-cyan/90" : "text-slate-400"}`}>
                  {plat.description}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

