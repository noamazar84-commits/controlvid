import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, X, Type, Flame, Layers, RefreshCw, MessageSquare, Sliders } from "lucide-react";
import { ScriptResponse } from "../types";

interface TeleprompterProps {
  script: ScriptResponse;
  onClose: () => void;
}

export default function Teleprompter({ script, onClose }: TeleprompterProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(3); // 1 to 10 scale
  const [fontSize, setFontSize] = useState(32); // px
  const [elapsedTime, setElapsedTime] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<any>(null);

  // Unified full script block
  const fullTextLines = [
    { type: "HOOK", title: "HOOK (0-5s)", text: script.hook.audio, icon: Flame, color: "text-brand-cyan bg-brand-cyan/15" },
    { type: "BODY", title: "BODY (5-25s)", text: script.body.audio, icon: Layers, color: "text-zinc-300 bg-zinc-800/50" },
    { type: "TWIST", title: "TWIST (25-50s)", text: script.twist.audio, icon: RefreshCw, color: "text-brand-cyan bg-brand-cyan/15" },
    { type: "CTA", title: "CTA (50-60s)", text: script.cta.audio, icon: MessageSquare, color: "text-zinc-300 bg-zinc-800/50" },
  ];

  // Auto Scroll Effect
  useEffect(() => {
    if (!isPlaying) return;

    let lastTime = performance.now();
    let animationFrameId: number;

    const scroll = (currentTime: number) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;

      if (containerRef.current) {
        // scrollSpeed maps to pixel movement rate
        const speedMultiplier = scrollSpeed * 0.04;
        containerRef.current.scrollTop += speedMultiplier * delta;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, scrollSpeed]);

  // Elapsed Timer Effect
  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPlaying]);

  const handleReset = () => {
    setIsPlaying(false);
    setElapsedTime(0);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  };

  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div id="teleprompter-overlay" className="flex flex-col h-full min-h-[500px] bg-[#0A0A0A] text-white rounded-xs overflow-hidden border border-slate-850">
      
      {/* Top Teleprompter Controls / Status */}
      <div className="p-4 border-b border-slate-850 flex items-center justify-between bg-[#0E0E10] gap-3">
        <div className="flex items-center space-x-3">
          <div className="px-3 py-1 bg-brand-cyan text-[#0A0A0A] rounded-2xs text-[10px] font-mono font-black tracking-widest uppercase">
            Teleprompter
          </div>
          <div className="font-mono text-xs text-slate-400 uppercase tracking-wider">
            EST. DURATION: <span className="text-brand-cyan font-black">60 SECONDS</span>
          </div>
        </div>

        {/* Floating Timer Display */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">Elapsed</span>
            <span className={`font-mono text-lg font-black px-3 py-0.5 rounded-2xs border ${
              elapsedTime > 60 
                ? "text-red-500 bg-red-950/20 border-red-900/50" 
                : "text-brand-cyan bg-brand-cyan/10 border-brand-cyan/30"
            }`}>
              {formatTime(elapsedTime)}
            </span>
          </div>

          <button
            id="exit-prompter-btn"
            onClick={onClose}
            className="p-1.5 rounded-xs hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Exit Prompter"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Readable Text Display area */}
      <div className="relative flex-1 bg-[#0A0A0A] flex flex-col justify-center">
        {/* Scroll helper overlays */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
        
        {/* Prompter Text container */}
        <div
          ref={containerRef}
          id="teleprompter-text-container"
          className="flex-1 overflow-y-auto px-6 sm:px-12 md:px-24 py-36 space-y-20 scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          {fullTextLines.map((line, index) => {
            const IconComponent = line.icon;
            return (
              <div key={index} className="space-y-4 border-l-2 border-slate-800 pl-6 hover:border-brand-cyan transition-colors">
                <div className="flex items-center space-x-2 text-[10px] font-mono tracking-wider font-bold text-slate-500 uppercase">
                  <span className={`p-1 rounded-2xs ${line.color}`}>
                    <IconComponent className="h-3 w-3" />
                  </span>
                  <span>{line.title}</span>
                </div>
                <p
                  className="teleprompter-active text-white font-semibold leading-relaxed antialiased font-display"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {line.text}
                </p>
              </div>
            );
          })}

          {/* Spacer at the bottom so the last line can scroll past the center */}
          <div className="h-64" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
        
        {/* Visual Reading Target Line Indicator */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-20 border-y border-brand-cyan/25 bg-brand-cyan/5 pointer-events-none z-0 flex items-center justify-between px-4">
          <span className="text-[9px] font-mono font-black text-brand-cyan tracking-widest uppercase opacity-80">READING_ZONE_ACTIVE</span>
          <span className="text-[9px] font-mono font-black text-brand-cyan tracking-widest uppercase opacity-80">READING_ZONE_ACTIVE</span>
        </div>
      </div>

      {/* Bottom Adjustment Controls */}
      <div className="p-5 border-t border-slate-850 bg-[#0E0E10] grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Play Pause / Reset Buttons */}
        <div className="md:col-span-4 flex items-center justify-center md:justify-start space-x-4">
          <button
            id="prompter-play-btn"
            onClick={() => setIsPlaying(!isPlaying)}
            className={`w-14 h-14 rounded-xs flex items-center justify-center transition-transform hover:scale-102 cursor-pointer shadow-md ${
              isPlaying ? "bg-amber-500 text-slate-950 hover:bg-amber-400" : "bg-brand-cyan text-[#0A0A0A] hover:bg-brand-cyan/85"
            }`}
          >
            {isPlaying ? <Pause className="h-6 w-6 fill-current text-[#0A0A0A]" /> : <Play className="h-6 w-6 fill-current text-[#0A0A0A] translate-x-0.5" />}
          </button>
          <button
            id="prompter-reset-btn"
            onClick={handleReset}
            className="w-10 h-10 rounded-xs bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700 transition-colors cursor-pointer"
            title="Restart from top"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>

        {/* Speed Adjustment Slider */}
        <div className="md:col-span-4 flex items-center space-x-3">
          <Sliders className="h-4 w-4 text-slate-400 shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex justify-between text-[11px] font-mono text-slate-450 mb-1.5 uppercase">
              <span>SCROLL_SPEED</span>
              <span className="font-black text-brand-cyan">{scrollSpeed}x</span>
            </div>
            <input
              id="prompter-speed-slider"
              type="range"
              min="1"
              max="10"
              step="0.5"
              value={scrollSpeed}
              onChange={(e) => setScrollSpeed(parseFloat(e.target.value))}
              className="w-full accent-brand-cyan bg-slate-800 h-1.5 rounded-none appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Font Size Adjustment Slider */}
        <div className="md:col-span-4 flex items-center space-x-3">
          <Type className="h-4 w-4 text-slate-400 shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex justify-between text-[11px] font-mono text-slate-450 mb-1.5 uppercase">
              <span>TEXT_SIZE</span>
              <span className="font-black text-brand-cyan">{fontSize}px</span>
            </div>
            <input
              id="prompter-font-slider"
              type="range"
              min="20"
              max="50"
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value))}
              className="w-full accent-brand-cyan bg-slate-800 h-1.5 rounded-none appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
