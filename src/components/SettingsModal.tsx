import React, { useState, useEffect } from "react";
import { Settings, Key, CheckCircle2, AlertCircle, RefreshCw, Eye, EyeOff, Save, ExternalLink, Zap, ShieldCheck, Mail } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [mailerliteKey, setMailerliteKey] = useState<string>("");
  const [showKey, setShowKey] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [testing, setTesting] = useState<boolean>(false);
  const [apiKeyConfigured, setApiKeyConfigured] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchSettings();
    }
  }, [isOpen]);

  const fetchSettings = async () => {
    try {
      // Check localStorage first
      const storedKey = localStorage.getItem("MAILERLITE_API_KEY");
      if (storedKey) {
        setMailerliteKey(storedKey);
      }

      const res = await fetch("/api/settings/mailerlite");
      const data = await res.json();
      if (data.success) {
        setApiKeyConfigured(data.apiKeyConfigured);
        if (data.apiKeyMasked && !storedKey) {
          setMailerliteKey(data.apiKeyMasked);
        }
      }
    } catch (err) {
      console.warn("Could not fetch MailerLite settings:", err);
    }
  };

  const handleSaveSettings = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    const trimmedKey = mailerliteKey.trim();

    try {
      // 1. Save to localStorage
      if (trimmedKey) {
        localStorage.setItem("MAILERLITE_API_KEY", trimmedKey);
      } else {
        localStorage.removeItem("MAILERLITE_API_KEY");
      }

      // 2. Save to server backend
      const res = await fetch("/api/settings/mailerlite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: trimmedKey })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setApiKeyConfigured(data.apiKeyConfigured);
        setStatusMessage({
          type: "success",
          text: "MailerLite API Key saved successfully! Automated signup sync is active."
        });
      } else {
        setStatusMessage({
          type: "error",
          text: data.error || "Failed to save MailerLite API Key."
        });
      }
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err.message || "Connection error while saving settings."
      });
    } finally {
      setSaving(false);
    }
  };

  const handleTestConnection = async () => {
    setTesting(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/settings/mailerlite/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: mailerliteKey.trim() })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setApiKeyConfigured(true);
        setStatusMessage({
          type: "success",
          text: `Connection verified! MailerLite API response: ${data.message || "OK"}`
        });
      } else {
        setStatusMessage({
          type: "error",
          text: `MailerLite API Test Warning: ${data.error || data.message || "Invalid API Token or permission denied."}`
        });
      }
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: `MailerLite API Test Failed: ${err.message}`
      });
    } finally {
      setTesting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]">
      <div className="w-full max-w-2xl bg-[#141418] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-white/10 bg-black/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/20">
              <Settings className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-white uppercase tracking-wider">
                Dashboard Settings & Integrations
              </h2>
              <p className="text-xs text-slate-400">
                Manage external API connections, email marketing automation, and credentials.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar text-left font-sans">
          
          {/* MailerLite Integration Card */}
          <div className="p-5 rounded-2xl bg-black/50 border border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">
                    MailerLite Automation Integration
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Connect your MailerLite account to automatically sync new signups with custom fields.
                  </p>
                </div>
              </div>

              <span className={`self-start sm:self-auto px-2.5 py-1 rounded text-[10px] font-mono font-bold flex items-center gap-1.5 border ${
                apiKeyConfigured 
                  ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" 
                  : "bg-amber-500/15 text-amber-400 border-amber-500/30"
              }`}>
                <span className={`h-2 w-2 rounded-full ${apiKeyConfigured ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
                {apiKeyConfigured ? "Active & Connected" : "Not Configured"}
              </span>
            </div>

            {/* Form Input */}
            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Key className="h-3.5 w-3.5 text-[#38bdf8]" />
                    <span>MAILERLITE_API_KEY</span>
                  </label>
                  <a
                    href="https://dashboard.mailerlite.com/integrations/api"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-[#38bdf8] hover:underline flex items-center gap-1"
                  >
                    <span>Get Token from MailerLite</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                <div className="relative flex items-center">
                  <input
                    type={showKey ? "text" : "password"}
                    value={mailerliteKey}
                    onChange={(e) => setMailerliteKey(e.target.value)}
                    placeholder="Paste your API Token here (e.g. p.eyJ1c...)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder-slate-500 text-xs font-mono focus:outline-none focus:border-[#38bdf8] transition-all pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-3 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Status Alert */}
              {statusMessage && (
                <div className={`p-3 rounded-xl border text-xs flex items-start gap-2 animate-[fadeIn_0.15s_ease-out] ${
                  statusMessage.type === "success" 
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                    : statusMessage.type === "error"
                    ? "bg-rose-500/10 border-rose-500/30 text-rose-300"
                    : "bg-blue-500/10 border-blue-500/30 text-blue-300"
                }`}>
                  {statusMessage.type === "success" ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <span>{statusMessage.text}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  disabled={testing || !mailerliteKey.trim()}
                  onClick={handleTestConnection}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/15 text-xs font-bold transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
                >
                  {testing ? (
                    <RefreshCw className="h-3.5 w-3.5 animate-spin text-[#38bdf8]" />
                  ) : (
                    <Zap className="h-3.5 w-3.5 text-amber-400" />
                  )}
                  <span>Test Connection</span>
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-[#38bdf8] hover:bg-[#0284c7] text-black font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-[#38bdf8]/20 disabled:opacity-50"
                >
                  {saving ? (
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Save className="h-3.5 w-3.5" />
                  )}
                  <span>Save MAILERLITE_API_KEY</span>
                </button>
              </div>
            </form>
          </div>

          {/* Automated POST Workflow Explanation */}
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Automated Signup Integration Specifications</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              When a user signs up on ViralFlow via Google, Facebook, or Email/Password:
            </p>
            <div className="p-3 rounded-xl bg-black/60 border border-white/5 font-mono text-[11px] text-slate-300 space-y-1 overflow-x-auto">
              <p className="text-emerald-400 font-bold">// Automatic POST Request to MailerLite</p>
              <p>POST https://connect.mailerlite.com/api/subscribers</p>
              <p>Headers: Authorization: Bearer &#123;MAILERLITE_API_KEY&#125;</p>
              <p>Body Payload:</p>
              <pre className="text-slate-400 text-[10px] pl-2">
{`{
  "email": "newuser@example.com",
  "fields": {
    "name": "Alex",
    "account_status": "Free"
  },
  "status": "active"
}`}
              </pre>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/10 bg-black/40 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
