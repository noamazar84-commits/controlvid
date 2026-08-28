import React, { useState, useEffect } from "react";
import { Sparkles, Sliders, BarChart3, Calendar, MessageSquare, Share2 } from "lucide-react";

interface SidebarProps {
  activeItem?: string;
  onSelect?: (item: string) => void;
}

export default function Sidebar({ activeItem, onSelect }: SidebarProps) {
  const [currentHash, setCurrentHash] = useState(window.location.hash.replace("#", "") || "magic");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "") || "magic";
      setCurrentHash(hash);
      if (onSelect) {
        onSelect(hash);
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [onSelect]);

  const items = [
    { id: "magic", label: "Magic Mode", icon: Sparkles, color: "text-[#38bdf8]" },
    { id: "custom", label: "Custom Mode", icon: Sliders, color: "text-amber-400" },
    { id: "social-viral-cloner", label: "Social Viral Cloner", icon: Share2, color: "text-emerald-400" },
    { id: "analytics", label: "Analytics", icon: BarChart3, color: "text-blue-400" },
    { id: "scheduler", label: "Scheduler", icon: Calendar, color: "text-purple-400" },
    { id: "dm-automation", label: "Facebook & Instagram DM Automation", icon: MessageSquare, color: "text-[#38bdf8]" },
  ];

  const active = activeItem || currentHash;

  const handleItemClick = (id: string) => {
    // Force a fresh state on navigation by clearing hash momentarily
    window.location.hash = "";
    setTimeout(() => {
      window.location.hash = `#${id}`;
      setCurrentHash(id);
      if (onSelect) {
        onSelect(id);
      }
    }, 1);
  };

  return (
    <div className="flex flex-col gap-1 w-full p-2 bg-[#0C0C10] border border-white/[0.05] rounded-xl">
      <div className="px-3 py-2 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
        Control Panel
      </div>
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            id={`sidebar-item-${item.id}`}
            onClick={() => handleItemClick(item.id)}
            className={`sidebar-item w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-bold rounded-lg transition-all border-none focus:outline-none cursor-pointer ${
              isActive
                ? "bg-white text-black font-black shadow-[0_0_10px_rgba(255,255,255,0.15)]"
                : "text-slate-400 hover:text-white bg-transparent hover:bg-white/[0.02]"
            }`}
          >
            <Icon className={`h-4 w-4 shrink-0 ${item.color}`} />
            <span className="truncate text-left">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
