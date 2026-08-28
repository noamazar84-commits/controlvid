import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import MagicMode from "./magic/MagicMode";
import CustomMode from "./custom/CustomMode";
import AnalyticsDashboard from "../AnalyticsDashboard";

interface WorkflowLayoutProps {
  activeUser?: any;
}

export default function WorkflowLayout({ activeUser }: WorkflowLayoutProps) {
  const [activeMode, setActiveMode] = useState("magic");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "") || "magic";
      setActiveMode(hash);
    };
    // Sync initial hash
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div className="workflow-layout-full-page min-h-screen bg-[#121212] text-white flex flex-col md:flex-row">
      <style>{`
        .sidebar-item {
          display: block;
          padding: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        #magic-mode-container {
          display: ${activeMode === "magic" ? "block" : "none"};
        }
        #custom-mode-container {
          display: ${activeMode === "custom" ? "block" : "none"};
        }
      `}</style>

      {/* Side Control panel */}
      <aside className="w-full md:w-64 border-r border-white/10 p-4 shrink-0 bg-[#1E1E1E] flex flex-col gap-4">
        <div className="flex items-center space-x-2 px-2 py-1">
          <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-black uppercase tracking-widest text-white">Workflow Controller</span>
        </div>
        
        <Sidebar activeItem={activeMode} onSelect={(item) => setActiveMode(item)} />
        
        <div className="mt-auto p-3.5 rounded-xl border border-white/5 bg-white/[0.01] text-[11px] text-neutral-500">
          Logged as <span className="text-white font-mono font-bold break-all">{activeUser?.email || "Anonymous User"}</span>
        </div>
      </aside>

      {/* Main workspace container rendering dynamically based on URL hash / selection */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        <div id="magic-mode-container" className="animate-[fadeIn_0.2s_ease-out]">
          <MagicMode 
            onBack={() => {
              window.location.hash = "";
              window.location.pathname = "/";
            }}
          />
        </div>

        <div id="custom-mode-container" className="animate-[fadeIn_0.2s_ease-out]">
          <CustomMode 
            onBack={() => {
              window.location.hash = "";
              window.location.pathname = "/";
            }}
          />
        </div>

        {activeMode === "analytics" && (
          <div className="animate-[fadeIn_0.2s_ease-out] space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h1 className="text-2xl font-black text-white uppercase tracking-tight">System Performance Metrics</h1>
                <p className="text-xs text-neutral-400">Detailed analytics for compiled media channels</p>
              </div>
            </div>
            <AnalyticsDashboard 
              userEmail={activeUser?.email || "user@example.com"} 
              userTier={activeUser?.subscription_tier || "Growth"} 
            />
          </div>
        )}

        {activeMode !== "magic" && activeMode !== "custom" && activeMode !== "analytics" && (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 max-w-md mx-auto">
            <div className="p-4 bg-white/5 border border-white/10 rounded-full animate-bounce">
              ⚙️
            </div>
            <h2 className="text-lg font-bold text-white uppercase tracking-tight">Active Module: {activeMode}</h2>
            <p className="text-xs text-neutral-400">
              The selected controller module is executing internally in autopilot mode. All telemetry logs are synchronizing with your channel nodes securely.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
