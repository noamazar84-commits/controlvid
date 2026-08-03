import { useState, useEffect, useRef } from "react";
import { 
  HelpCircle, 
  Send, 
  Plus, 
  RotateCw, 
  CheckCircle, 
  AlertCircle, 
  MessageSquare, 
  LifeBuoy,
  User,
  Sparkles
} from "lucide-react";
import { DbSupportTicket } from "../types";

interface AutoSupportLayerProps {
  userEmail: string;
}

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

export default function AutoSupportLayer({ userEmail }: AutoSupportLayerProps) {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      sender: "bot",
      text: "Hello! I am your 24/7 ViralFlow.ai self-service chatbot. Ask me anything about script generation, scheduling, Shadow Channels, or billing!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [tickets, setTickets] = useState<DbSupportTicket[]>([]);
  const [ticketsLoading, setTicketsLoading] = useState(false);
  
  // Ticket Modal/Form
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [ticketMessage, setTicketMessage] = useState("");
  const [submittingTicket, setSubmittingTicket] = useState(false);
  const [ticketStatusMsg, setTicketStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, chatLoading]);

  const loadTickets = async () => {
    setTicketsLoading(true);
    try {
      const response = await fetch(`/api/support/tickets?email=${encodeURIComponent(userEmail)}`);
      if (response.ok) {
        const data = await response.json();
        setTickets(data);
      }
    } catch (err) {
      console.error("Failed to load support tickets", err);
    } finally {
      setTicketsLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, [userEmail]);

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userMsg = chatInput.trim();
    setChatInput("");
    setChatHistory(prev => [
      ...prev,
      {
        sender: "user",
        text: userMsg,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setChatLoading(true);

    try {
      const response = await fetch("/api/support/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, userEmail })
      });
      if (response.ok) {
        const data = await response.json();
        setChatHistory(prev => [
          ...prev,
          {
            sender: "bot",
            text: data.reply || "I apologize, but I could not formulate a response at this time. Please open a support ticket.",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else {
        throw new Error("Chatbot failed to respond.");
      }
    } catch (err: any) {
      setChatHistory(prev => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ Offline Support Mode: It seems there was an API disruption. Would you like to escalate this issue to a human by opening a support ticket below?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleCreateTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketMessage.trim() || !fullName.trim()) return;
    setSubmittingTicket(true);
    setTicketStatusMsg(null);

    // Grab chatbot reply fallback if available
    const lastBotReply = chatHistory.filter(m => m.sender === "bot").pop()?.text || "";

    try {
      const response = await fetch("/api/support/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email: userEmail,
          message: ticketMessage.trim(),
          chatbotReply: lastBotReply
        })
      });

      if (response.ok) {
        setTicketMessage("");
        setFullName("");
        setTicketStatusMsg({
          type: "success",
          text: "🎫 Support ticket submitted successfully! Our operators have been notified."
        });
        loadTickets();
        setTimeout(() => {
          setIsNewTicketOpen(false);
          setTicketStatusMsg(null);
        }, 2000);
      } else {
        throw new Error("Failed to create ticket.");
      }
    } catch (err: any) {
      setTicketStatusMsg({
        type: "error",
        text: err.message || "Could not save support ticket. Please check your network connection."
      });
    } finally {
      setSubmittingTicket(false);
    }
  };

  return (
    <div className="space-y-6 p-4">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/[0.08] pb-4 gap-4">
        <div>
          <h2 className="text-lg font-black font-sans text-white uppercase tracking-tight flex items-center gap-2">
            <LifeBuoy className="h-5 w-5 text-brand-cyan" />
            AI Auto-Support Center
          </h2>
          <p className="text-[11px] text-slate-400">
            Get instant support via our self-service chatbot, or escalate directly to human operators.
          </p>
        </div>
        <button
          onClick={() => setIsNewTicketOpen(true)}
          className="py-2 px-4 bg-brand-cyan hover:bg-brand-cyan/85 font-mono text-xs font-bold uppercase rounded-lg text-black transition-all cursor-pointer flex items-center gap-1.5 border-none outline-none self-start"
        >
          <Plus className="h-4 w-4" />
          Open Support Ticket
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Chatbot Column */}
        <div className="lg:col-span-7 bg-[#0A0A0C] border border-white/[0.06] rounded-xl flex flex-col h-[400px] overflow-hidden">
          
          {/* Header */}
          <div className="bg-black/45 border-b border-white/[0.04] p-3.5 flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-slate-350 uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-brand-cyan" />
              Gemini Self-Service Bot
            </span>
          </div>

          {/* Messages view */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar bg-black/10">
            {chatHistory.map((msg, i) => (
              <div 
                key={i} 
                className={`flex gap-3 max-w-[85%] ${
                  msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${
                  msg.sender === "user" 
                    ? "bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/20" 
                    : "bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20"
                }`}>
                  {msg.sender === "user" ? <User className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
                </div>

                <div className="space-y-1">
                  <div className={`p-3 rounded-2xl text-xs leading-relaxed font-sans ${
                    msg.sender === "user"
                      ? "bg-[#38bdf8] text-black font-medium rounded-tr-none"
                      : "bg-[#111115] border border-white/[0.04] text-slate-200 rounded-tl-none"
                  }`}>
                    {msg.text}
                  </div>
                  <div className={`text-[8px] font-mono text-slate-500 ${
                    msg.sender === "user" ? "text-right" : "text-left"
                  }`}>
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {chatLoading && (
              <div className="flex gap-3 max-w-[85%] mr-auto items-center">
                <div className="w-7 h-7 rounded-full bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20 flex items-center justify-center">
                  <RotateCw className="h-3.5 w-3.5 animate-spin" />
                </div>
                <div className="bg-[#111115] border border-white/[0.04] text-slate-400 text-xs p-3 rounded-2xl rounded-tl-none font-mono animate-pulse uppercase tracking-wider">
                  Gemini formulating advice...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Form input */}
          <form onSubmit={handleSendChat} className="p-3 bg-black/45 border-t border-white/[0.04] flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask support bot (e.g. How do shadow channels work?)..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 bg-[#050507] border border-white/[0.08] focus:border-brand-cyan/40 rounded-xl px-4 py-2.5 text-xs text-slate-100 outline-none"
            />
            <button
              type="submit"
              disabled={chatLoading || !chatInput.trim()}
              className="p-2.5 bg-brand-cyan hover:bg-brand-cyan/85 disabled:bg-slate-900 disabled:text-slate-600 rounded-xl text-black transition-all cursor-pointer border-none flex items-center justify-center"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* Existing Tickets Column */}
        <div className="lg:col-span-5 bg-[#0A0A0C] border border-white/[0.06] rounded-xl p-5 flex flex-col justify-between h-[400px]">
          <div className="space-y-4 overflow-y-auto flex-1 custom-scrollbar pr-1">
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare className="h-4 w-4 text-purple-400" />
              Your Support Tickets ({tickets.length})
            </h3>

            {ticketsLoading ? (
              <div className="py-16 text-center text-slate-500 font-mono text-[10px] animate-pulse uppercase">
                Loading support records...
              </div>
            ) : tickets.length === 0 ? (
              <div className="py-16 text-center text-slate-600 font-sans text-xs">
                No tickets submitted yet. If you have any inquiries, escalate using the button above.
              </div>
            ) : (
              <div className="space-y-3">
                {tickets.map((tkt) => (
                  <div key={tkt.id} className="p-3 bg-black/40 border border-white/[0.04] rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono text-slate-500">
                        {new Date(tkt.createdAt).toLocaleDateString()}
                      </span>
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-black uppercase ${
                        tkt.status === "resolved" 
                          ? "bg-emerald-950/40 border border-emerald-900 text-emerald-400" 
                          : "bg-amber-950/40 border border-amber-900 text-amber-400"
                      }`}>
                        {tkt.status || "open"}
                      </span>
                    </div>
                    <p className="text-xs font-sans text-slate-300 leading-relaxed">
                      {tkt.message}
                    </p>
                    {tkt.chatbotReply && (
                      <div className="bg-black/35 border border-white/[0.02] p-2 rounded text-[10px] font-sans text-slate-450 italic">
                        <strong>AI Bot Reply:</strong> {tkt.chatbotReply}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* New Ticket Modal */}
      {isNewTicketOpen && (
        <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-[#0c0c0e] border border-white/[0.08] rounded-2xl w-full max-w-md p-6 relative shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
            <button 
              onClick={() => setIsNewTicketOpen(false)}
              className="absolute right-4 top-4 text-slate-500 hover:text-white bg-transparent border-none cursor-pointer"
            >
              ✕
            </button>
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
              <LifeBuoy className="h-4.5 w-4.5 text-brand-cyan" />
              Escalate to Operator Support
            </h3>
            <p className="text-[10px] text-slate-500 mb-4 font-sans">
              Provide your details below to open a ticket in our persistent tracking engine.
            </p>

            <form onSubmit={handleCreateTicketSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-[9px] font-mono font-bold text-slate-500 uppercase">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#050507] border border-white/[0.08] focus:border-brand-cyan/40 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-mono font-bold text-slate-500 uppercase">Support Email (Registered)</label>
                <input
                  type="email"
                  disabled
                  value={userEmail}
                  className="w-full bg-[#030304] border border-white/[0.03] rounded-lg px-3 py-2 text-xs text-slate-500 outline-none cursor-not-allowed"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-mono font-bold text-slate-500 uppercase">Describe your Issue / Requirements</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about custom integrations, api requests, or specific account issues..."
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  className="w-full bg-[#050507] border border-white/[0.08] focus:border-brand-cyan/40 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none resize-none font-sans"
                />
              </div>

              {ticketStatusMsg && (
                <div className={`p-3 rounded-lg text-[10px] flex items-center gap-1.5 ${
                  ticketStatusMsg.type === "success" 
                    ? "bg-emerald-950/20 text-emerald-450 border border-emerald-900/30" 
                    : "bg-rose-950/20 text-rose-450 border border-rose-900/30"
                }`}>
                  {ticketStatusMsg.type === "success" ? <CheckCircle className="h-3.5 w-3.5" /> : <AlertCircle className="h-3.5 w-3.5" />}
                  <span>{ticketStatusMsg.text}</span>
                </div>
              )}

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewTicketOpen(false)}
                  className="py-2 px-4 bg-transparent hover:bg-white/5 text-slate-400 hover:text-white text-xs font-mono rounded-lg transition-all border-none cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingTicket}
                  className="py-2 px-5 bg-brand-cyan hover:bg-brand-cyan/85 text-black font-mono text-xs font-bold uppercase rounded-lg transition-all cursor-pointer flex items-center gap-1.5 border-none outline-none"
                >
                  {submittingTicket ? <RotateCw className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
