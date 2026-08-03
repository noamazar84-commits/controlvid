import { useState } from "react";
import { ArrowRight } from "lucide-react";

interface VideoWizardProps {
  onNicheSelected: (nicheName: string) => void;
}

export default function VideoWizard({ onNicheSelected }: VideoWizardProps) {
  const [customNicheInput, setCustomNicheInput] = useState<string>("");

  const niches = [
    { id: "finance", name: "FINANCE & WEALTH", emoji: "💰" },
    { id: "fitness", name: "FITNESS & DIET", emoji: "💪" },
    { id: "tech", name: "TECH & FUTURE AI", emoji: "🤖" },
    { id: "motivation", name: "MOTIVATION & MINDSET", emoji: "🔥" },
    { id: "business", name: "BUSINESS & STARTUPS", emoji: "💼" },
    { id: "travel", name: "TRAVEL & EXPLORATION", emoji: "✈️" },
    { id: "psychology", name: "HUMAN PSYCHOLOGY", emoji: "🧠" },
    { id: "science", name: "SCIENCE & SPACE", emoji: "🚀" },
    { id: "culture", name: "POP CULTURE & MEDIA", emoji: "🎬" },
    { id: "history", name: "UNTOLD HISTORY", emoji: "📜" }
  ];

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customNicheInput.trim()) {
      onNicheSelected(customNicheInput.trim());
    }
  };

  return (
    <div className="w-full space-y-6 font-sans text-left animate-[fadeIn_0.2s_ease-out]">
      <style>{`
        .niches-container {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          padding: 20px;
          box-sizing: border-box;
          background: #0b0f19;
          text-align: center;
          border-radius: 16px;
        }

        .niches-container h2 {
          color: #ffffff;
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .niches-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          width: 100%;
        }

        @media (min-width: 640px) {
          .niches-grid {
            grid-template-columns: repeat(5, 1fr);
          }
        }

        .niche-card {
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
          border-radius: 12px;
          padding: 20px 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          transition: transform 0.2s ease, border-color 0.2s ease;
          cursor: pointer;
          height: 110px;
          box-sizing: border-box;
        }

        .niche-card:hover {
          transform: translateY(-3px);
          border-color: #60a5fa;
        }

        .niche-icon {
          font-size: 28px;
          margin-bottom: 10px;
        }

        .niche-card span {
          color: #ffffff;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          text-align: center;
        }
      `}</style>

      {/* Steps Header & Top Badge */}
      <div className="border-b border-white/[0.04] pb-2">
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-mono font-bold text-brand-green bg-[#38bdf8]/5 border border-[#38bdf8]/15 px-2.5 py-0.5 rounded uppercase tracking-widest">
            Step 1 of 4
          </span>
          <span className="text-[9px] font-mono font-bold text-amber-400 bg-amber-400/5 border border-amber-400/15 px-2.5 py-0.5 rounded uppercase tracking-widest animate-pulse">
            Niche Targeter
          </span>
        </div>
      </div>

      {/* User Requested HTML Container */}
      <div className="niches-container">
        <h2>AI VIRAL SHORTS AUTOPILOT</h2>
        <div className="niches-grid">
          {niches.map((niche) => (
            <div 
              key={niche.id} 
              className="niche-card"
              onClick={() => onNicheSelected(niche.name)}
            >
              <div className="niche-icon">{niche.emoji}</div>
              <span>{niche.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Custom input */}
      <div className="max-w-md mx-auto pt-4">
        <form onSubmit={handleCustomSubmit} className="relative flex items-center bg-[#09090C] border border-white/[0.06] hover:border-slate-800 rounded-xl p-1.5 transition-all">
          <input
            type="text"
            value={customNicheInput}
            onChange={(e) => setCustomNicheInput(e.target.value)}
            placeholder="Or type custom niche... e.g. Vintage Watches"
            className="flex-1 bg-transparent border-none text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-0 px-3 py-1.5"
          />
          <button
            type="submit"
            disabled={!customNicheInput.trim()}
            className="px-4 py-2 rounded-lg bg-[#38bdf8] hover:bg-[#38bdf8]/85 text-black text-[10px] font-mono font-black uppercase tracking-wider transition-all cursor-pointer disabled:bg-slate-900 disabled:text-slate-650 shrink-0 flex items-center gap-1 focus:outline-none"
          >
            <span>Proceed</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </form>
      </div>
    </div>
  );
}
