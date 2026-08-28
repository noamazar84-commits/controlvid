import { useState, useEffect, useRef } from "react";
import { 
  Send, 
  Plus, 
  RotateCw, 
  CheckCircle, 
  AlertCircle, 
  MessageSquare, 
  LifeBuoy,
  User,
  Sparkles,
  Zap,
  BookOpen,
  Cpu,
  Crown,
  ShieldCheck,
  Bot,
  X,
  Minimize2,
  ChevronDown
} from "lucide-react";
import { DbSupportTicket } from "../types";
import { getFallbackFaqResponse, supportFaqsByTier, TierFaq } from "../config/supportFaqs";

interface AutoSupportLayerProps {
  userEmail: string;
  userTier?: string;
  isFloatingWidget?: boolean;
}

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  isFallback?: boolean;
}

export default function AutoSupportLayer({ userEmail, userTier = "Spark", isFloatingWidget = false }: AutoSupportLayerProps) {
  const [selectedTier, setSelectedTier] = useState<string>(() => {
    const raw = (userTier || "Spark").toString();
    return raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
  });

  // Floating widget states
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "faqs" | "tickets">("chat");
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  const botConfigByTier: Record<string, {
    title: string;
    level: string;
    price: string;
    badgeColor: string;
    borderColor: string;
    icon: any;
    description: string;
    initialGreeting: string;
  }> = {
    Spark: {
      title: "Spark Self-Service Bot",
      level: "Self-service support bot",
      price: "$49/mo",
      badgeColor: "bg-sky-500/10 text-sky-400 border-sky-500/30",
      borderColor: "border-sky-500/40",
      icon: Zap,
      description: "Self-service automated assistance for platform navigation, generation credits & script workflows.",
      initialGreeting: "Hello! I am your Spark Self-Service Bot. I can assist with standard platform navigation, credits, and basic script generation FAQs."
    },
    Growth: {
      title: "Growth Knowledge Base Bot",
      level: "Knowledge base support bot",
      price: "$89/mo",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      borderColor: "border-emerald-500/40",
      icon: BookOpen,
      description: "Knowledge base indexed bot providing deep feature guides, troubleshooting & content strategy.",
      initialGreeting: "Hello! I am your Growth Knowledge Base Bot. Ask me anything about our feature guides, retention optimization, or account workflows."
    },
    Velocity: {
      title: "Velocity Extended Automation Bot",
      level: "Extended automation support bot",
      price: "$129/mo",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      borderColor: "border-amber-500/40",
      icon: Cpu,
      description: "Extended automation bot with webhook diagnostics, campaign scheduling support & channel sync assistance.",
      initialGreeting: "Welcome to Velocity Automation Support! I am equipped to diagnose webhooks, campaign scheduler tasks, and Shadow Channel syncing."
    },
    Empire: {
      title: "Empire Priority Automation Desk",
      level: "Priority automation desk",
      price: "$229/mo",
      badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
      borderColor: "border-purple-500/40",
      icon: Crown,
      description: "Priority automation desk with instant ticket escalation, revenue strategy AI & fast-lane dispatch.",
      initialGreeting: "Empire VIP Desk active. How can I assist with your high-volume scaling, retention heatmaps, or fast-lane ticket escalation today?"
    },
    Enterprise: {
      title: "Enterprise Dedicated Routing",
      level: "Dedicated tailormade routing",
      price: "Custom",
      badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/30",
      borderColor: "border-rose-500/40",
      icon: ShieldCheck,
      description: "Tailormade routing bot with direct SLA routing, custom enterprise integration support & dedicated queueing.",
      initialGreeting: "Enterprise Dedicated Support Node connected. Direct SLA routing enabled for custom integrations and dedicated infrastructure."
    }
  };

  const activeBotConfig = botConfigByTier[selectedTier] || botConfigByTier["Spark"];

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      sender: "bot",
      text: activeBotConfig.initialGreeting,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  // Update initial message when tier changes
  useEffect(() => {
    setChatHistory([
      {
        sender: "bot",
        text: activeBotConfig.initialGreeting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [selectedTier]);

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
    if (isOpen || !isFloatingWidget) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory, chatLoading, isOpen, isFloatingWidget]);

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

  const handleSendChat = async (msgText?: string) => {
    const userMsg = (msgText || chatInput).trim();
    if (!userMsg || chatLoading) return;

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
        body: JSON.stringify({ 
          message: userMsg, 
          userEmail,
          userTier: selectedTier 
        })
      });
      if (response.ok) {
        const data = await response.json();
        setChatHistory(prev => [
          ...prev,
          {
            sender: "bot",
            text: data.reply || getFallbackFaqResponse(userMsg, selectedTier).text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isFallback: data.isFallback
          }
        ]);
      } else {
        throw new Error("Chatbot server unavailable");
      }
    } catch (err: any) {
      const fallbackResult = getFallbackFaqResponse(userMsg, selectedTier);
      setChatHistory(prev => [
        ...prev,
        {
          sender: "bot",
          text: fallbackResult.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isFallback: true
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

  const BotIconComponent = activeBotConfig.icon;

  const quickPrompts = [
    "How do Shadow Channels work?",
    "What are Spark tier limits?",
    "How does DM Automation overage work?",
    "I need human support"
  ];

  // ==========================================
  // FLOATING WIDGET RENDER MODE
  // ==========================================
  if (isFloatingWidget) {
    return (
      <>
        {/* Floating Toggle Launcher Button - Bottom-Right Fixed Positioning */}
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 lg:bottom-8 lg:right-8 z-[99999] pointer-events-auto">
          <button
            onClick={() => {
              setIsOpen(!isOpen);
              setIsMinimized(false);
            }}
            aria-label="Toggle AI Support Chat"
            className="group relative flex items-center gap-2.5 px-4 py-3 bg-[#38bdf8] hover:bg-white text-black font-sans font-black text-xs uppercase tracking-wider rounded-full shadow-[0_0_25px_rgba(56,189,248,0.45)] hover:shadow-[0_0_35px_rgba(56,189,248,0.7)] transition-all duration-200 transform hover:scale-105 active:scale-95 border-none outline-none cursor-pointer"
          >
            <div className="relative flex items-center justify-center">
              {isOpen ? (
                <X className="h-5 w-5 text-black" />
              ) : (
                <LifeBuoy className="h-5 w-5 text-black animate-spin-slow" />
              )}
              {!isOpen && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#38bdf8] animate-ping" />
              )}
            </div>

            <span className="hidden sm:inline font-black tracking-wide">
              {isOpen ? "Close Support" : "AI Support"}
            </span>

            {!isOpen && (
              <span className="px-1.5 py-0.5 text-[9px] font-mono font-black bg-black text-[#38bdf8] rounded-full border border-[#38bdf8]/30">
                24/7
              </span>
            )}
          </button>
        </div>

        {/* Floating Chat Panel - Fixed Positioning anchored to bottom-right viewport */}
        {isOpen && (
          <div 
            className={`fixed z-[99999] transition-all duration-300 ease-out flex flex-col bg-[#0b0c0e]/98 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden ${
              isMinimized 
                ? "bottom-20 right-4 sm:bottom-22 sm:right-6 md:bottom-24 md:right-8 w-80 h-16" 
                : "inset-x-3 bottom-20 top-16 sm:inset-auto sm:bottom-22 sm:right-6 sm:w-[450px] sm:max-h-[82vh] sm:h-[610px] md:bottom-24 md:right-8 md:top-auto md:left-auto md:w-[480px] md:max-h-[80vh] md:h-[620px]"
            }`}
          >
            {/* Header */}
            <div className="p-3.5 bg-neutral-950/90 border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className={`p-1.5 rounded-lg border ${activeBotConfig.badgeColor}`}>
                  <BotIconComponent className="h-4 w-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black font-sans text-white uppercase tracking-wider">
                      {activeBotConfig.title}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">
                    {selectedTier} Tier • {activeBotConfig.price}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Switch view tab */}
                <div className="flex items-center gap-1 bg-white/5 p-0.5 rounded-lg border border-white/10">
                  <button
                    onClick={() => setActiveTab("chat")}
                    className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase transition-all cursor-pointer border ${
                      activeTab === "chat" 
                        ? "bg-[#38bdf8] text-black border-[#38bdf8]" 
                        : "bg-transparent text-slate-400 hover:text-white border-transparent"
                    }`}
                  >
                    Chat
                  </button>
                  <button
                    onClick={() => setActiveTab("faqs")}
                    className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase transition-all cursor-pointer border ${
                      activeTab === "faqs" 
                        ? "bg-emerald-500 text-black border-emerald-500" 
                        : "bg-transparent text-slate-400 hover:text-white border-transparent"
                    }`}
                  >
                    FAQs
                  </button>
                  <button
                    onClick={() => setActiveTab("tickets")}
                    className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase transition-all cursor-pointer border ${
                      activeTab === "tickets" 
                        ? "bg-purple-500 text-black border-purple-500" 
                        : "bg-transparent text-slate-400 hover:text-white border-transparent"
                    }`}
                  >
                    Tickets ({tickets.length})
                  </button>
                </div>

                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 text-slate-400 hover:text-white bg-transparent border-none cursor-pointer focus:outline-none"
                  title={isMinimized ? "Expand" : "Minimize"}
                >
                  <Minimize2 className="h-3.5 w-3.5" />
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white bg-transparent border-none cursor-pointer focus:outline-none"
                  title="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Minimized bar body */}
            {isMinimized ? (
              <div className="p-3 flex items-center justify-between text-xs text-slate-300 font-mono">
                <span>AI Support Bot active</span>
                <button 
                  onClick={() => setIsMinimized(false)}
                  className="text-[#38bdf8] font-bold underline cursor-pointer bg-transparent border-none"
                >
                  Expand
                </button>
              </div>
            ) : activeTab === "chat" ? (
              /* CHAT TAB BODY */
              <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                {/* Tier Selector Chips */}
                <div className="px-3 py-2 bg-black/40 border-b border-white/5 flex items-center justify-between gap-1 overflow-x-auto shrink-0 custom-scrollbar">
                  <span className="text-[9px] font-mono text-slate-400 uppercase shrink-0">Bot Tier:</span>
                  <div className="flex items-center gap-1">
                    {["Spark", "Growth", "Velocity", "Empire", "Enterprise"].map((tName) => {
                      const isSelected = selectedTier === tName;
                      return (
                        <button
                          key={tName}
                          onClick={() => setSelectedTier(tName)}
                          className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase transition-all cursor-pointer border whitespace-nowrap ${
                            isSelected
                              ? "bg-[#38bdf8] text-black font-black border-[#38bdf8]"
                              : "bg-white/5 text-slate-400 border-white/5 hover:text-white"
                          }`}
                        >
                          {tName}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Messages Container */}
                <div className="flex-1 p-3.5 overflow-y-auto space-y-3.5 custom-scrollbar bg-black/20">
                  {chatHistory.map((msg, i) => (
                    <div 
                      key={i} 
                      className={`flex gap-2.5 max-w-[88%] ${
                        msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] shrink-0 ${
                        msg.sender === "user" 
                          ? "bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/20" 
                          : "bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/40"
                      }`}>
                        {msg.sender === "user" ? <User className="h-3 w-3" /> : <BotIconComponent className="h-3 w-3" />}
                      </div>

                      <div className="space-y-0.5">
                        <div className={`p-2.5 rounded-2xl text-[11px] leading-relaxed font-sans ${
                          msg.sender === "user"
                            ? "bg-[#38bdf8] text-black font-medium rounded-tr-none"
                            : "bg-[#141418] border border-white/[0.08] text-slate-200 rounded-tl-none"
                        }`}>
                          {msg.isFallback && (
                            <div className="mb-1.5 inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              <Sparkles className="h-2.5 w-2.5" />
                              Local Knowledge Base
                            </div>
                          )}
                          <div className="whitespace-pre-wrap">{msg.text}</div>
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
                    <div className="flex gap-2.5 max-w-[85%] mr-auto items-center">
                      <div className="w-6 h-6 rounded-full bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/20 flex items-center justify-center">
                        <RotateCw className="h-3 w-3 animate-spin" />
                      </div>
                      <div className="bg-[#141418] border border-white/5 text-slate-400 text-[10px] p-2.5 rounded-2xl rounded-tl-none font-mono animate-pulse uppercase tracking-wider">
                        Formulating reply...
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Prompts */}
                <div className="px-3 py-1.5 bg-black/40 border-t border-white/5 flex items-center gap-1.5 overflow-x-auto shrink-0 custom-scrollbar">
                  {quickPrompts.map((qp, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendChat(qp)}
                      disabled={chatLoading}
                      className="px-2 py-1 bg-white/5 hover:bg-white/10 text-[9px] font-mono text-slate-300 hover:text-white rounded-lg border border-white/5 whitespace-nowrap cursor-pointer transition-all shrink-0"
                    >
                      {qp}
                    </button>
                  ))}
                </div>

                {/* Form Input */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendChat();
                  }} 
                  className="p-3 bg-neutral-950 border-t border-white/10 flex items-center gap-2 shrink-0"
                >
                  <input
                    type="text"
                    placeholder={`Ask ${activeBotConfig.title}...`}
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-1 bg-[#050507] border border-white/[0.1] focus:border-[#38bdf8]/40 rounded-xl px-3 py-2 text-xs text-slate-100 outline-none"
                  />
                  <button
                    type="submit"
                    disabled={chatLoading || !chatInput.trim()}
                    className="p-2 bg-[#38bdf8] hover:bg-[#38bdf8]/85 disabled:bg-slate-900 disabled:text-slate-600 rounded-xl text-black transition-all cursor-pointer border-none flex items-center justify-center shrink-0"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </form>
              </div>
            ) : activeTab === "faqs" ? (
              /* FAQS TAB BODY */
              <div className="flex-1 p-3.5 overflow-y-auto space-y-3 custom-scrollbar bg-black/20">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <div>
                    <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen className="h-3.5 w-3.5 text-emerald-400" />
                      {selectedTier} Fallback Knowledge Base
                    </h4>
                    <p className="text-[9px] text-slate-400 font-sans">
                      Pre-defined FAQs loaded directly from local config.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 overflow-x-auto py-1 custom-scrollbar">
                  {["Spark", "Growth", "Velocity", "Empire", "Enterprise"].map((tName) => (
                    <button
                      key={tName}
                      onClick={() => setSelectedTier(tName)}
                      className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase transition-all cursor-pointer border whitespace-nowrap ${
                        selectedTier === tName
                          ? "bg-emerald-500 text-black font-black border-emerald-500"
                          : "bg-white/5 text-slate-400 border-white/5 hover:text-white"
                      }`}
                    >
                      {tName}
                    </button>
                  ))}
                </div>

                <div className="space-y-2 pt-1">
                  {(supportFaqsByTier[selectedTier] || supportFaqsByTier["Spark"]).map((faq) => {
                    const isExpanded = expandedFaqId === faq.id;
                    return (
                      <div key={faq.id} className="p-3 bg-black/60 border border-white/10 rounded-xl space-y-2">
                        <button
                          onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                          className="w-full text-left flex items-start justify-between gap-2 bg-transparent border-none cursor-pointer text-slate-200 hover:text-white"
                        >
                          <span className="text-xs font-sans font-medium leading-snug">
                            {faq.question}
                          </span>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 bg-white/5 rounded text-emerald-400 border border-white/5 shrink-0">
                            {faq.category}
                          </span>
                        </button>

                        {isExpanded && (
                          <div className="pt-2 border-t border-white/5 space-y-2">
                            <p className="text-[11px] font-sans text-slate-300 leading-relaxed">
                              {faq.answer}
                            </p>
                            <div className="flex justify-end">
                              <button
                                onClick={() => {
                                  setActiveTab("chat");
                                  handleSendChat(faq.question);
                                }}
                                className="px-2.5 py-1 bg-[#38bdf8]/15 hover:bg-[#38bdf8]/30 text-[#38bdf8] text-[9px] font-mono font-bold rounded-md border border-[#38bdf8]/30 cursor-pointer transition-all"
                              >
                                Ask Chatbot
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* TICKETS TAB BODY */
              <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar bg-black/30">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Support Tickets ({tickets.length})
                  </h4>
                  <button
                    onClick={() => setIsNewTicketOpen(true)}
                    className="py-1 px-2.5 bg-[#38bdf8] text-black text-[10px] font-black uppercase rounded-md flex items-center gap-1 border-none cursor-pointer"
                  >
                    <Plus className="h-3 w-3" />
                    New Ticket
                  </button>
                </div>

                {ticketsLoading ? (
                  <div className="py-12 text-center text-slate-500 font-mono text-[10px] animate-pulse">
                    LOADING TICKETS...
                  </div>
                ) : tickets.length === 0 ? (
                  <div className="py-12 text-center text-slate-500 font-sans text-xs">
                    No tickets open. Use the button above to escalate an issue to human support.
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {tickets.map((tkt) => (
                      <div key={tkt.id} className="p-3 bg-black/50 border border-white/5 rounded-xl space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-mono text-slate-500">
                            {new Date(tkt.createdAt).toLocaleDateString()}
                          </span>
                          <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-black uppercase ${
                            tkt.status === "resolved" 
                              ? "bg-emerald-950/40 text-emerald-400 border border-emerald-900" 
                              : "bg-amber-950/40 text-amber-400 border border-amber-900"
                          }`}>
                            {tkt.status || "open"}
                          </span>
                        </div>
                        <p className="text-xs font-sans text-slate-300 leading-normal">
                          {tkt.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* New Ticket Modal */}
        {isNewTicketOpen && (
          <div className="fixed inset-0 bg-black/85 z-[100000] flex items-center justify-center p-4 backdrop-blur-xs">
            <div className="bg-[#0c0c0e] border border-white/15 rounded-2xl w-full max-w-md p-6 relative shadow-[0_25px_60px_rgba(0,0,0,0.95)]">
              <button 
                onClick={() => setIsNewTicketOpen(false)}
                className="absolute right-4 top-4 text-slate-500 hover:text-white bg-transparent border-none cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
              <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                <LifeBuoy className="h-4.5 w-4.5 text-[#38bdf8]" />
                Escalate to Operator Support
              </h3>
              <p className="text-[10px] text-slate-400 mb-4 font-sans">
                Provide your details below to open a ticket in our persistent tracking engine.
              </p>

              <form onSubmit={handleCreateTicketSubmit} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#050507] border border-white/10 focus:border-[#38bdf8]/40 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase">Support Email (Registered)</label>
                  <input
                    type="email"
                    disabled
                    value={userEmail}
                    className="w-full bg-[#030304] border border-white/5 rounded-lg px-3 py-2 text-xs text-slate-500 outline-none cursor-not-allowed"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase">Describe your Issue / Requirements</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about custom integrations, API requests, or specific account issues..."
                    value={ticketMessage}
                    onChange={(e) => setTicketMessage(e.target.value)}
                    className="w-full bg-[#050507] border border-white/10 focus:border-[#38bdf8]/40 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none resize-none font-sans"
                  />
                </div>

                {ticketStatusMsg && (
                  <div className={`p-3 rounded-lg text-[10px] flex items-center gap-1.5 ${
                    ticketStatusMsg.type === "success" 
                      ? "bg-emerald-950/20 text-emerald-400 border border-emerald-900/30" 
                      : "bg-rose-950/20 text-rose-400 border border-rose-900/30"
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
                    className="py-2 px-5 bg-[#38bdf8] hover:bg-[#38bdf8]/85 text-black font-mono text-xs font-bold uppercase rounded-lg transition-all cursor-pointer flex items-center gap-1.5 border-none outline-none"
                  >
                    {submittingTicket ? <RotateCw className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                    Submit Ticket
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </>
    );
  }

  // ==========================================
  // EMBEDDED DASHBOARD WORKSPACE VIEW MODE
  // ==========================================
  return (
    <div className="space-y-6 p-2 sm:p-4">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/[0.08] pb-4 gap-4">
        <div>
          <h2 className="text-lg font-black font-sans text-white uppercase tracking-tight flex items-center gap-2">
            <LifeBuoy className="h-5 w-5 text-[#38bdf8]" />
            AI Support Desk & Ticket Escalation
          </h2>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Gated support bot engine tailored specifically to your active subscription tier capabilities.
          </p>
        </div>
        <button
          onClick={() => setIsNewTicketOpen(true)}
          className="py-2 px-4 bg-[#38bdf8] hover:bg-[#38bdf8]/85 font-mono text-xs font-bold uppercase rounded-lg text-black transition-all cursor-pointer flex items-center gap-1.5 border-none outline-none self-start shrink-0"
        >
          <Plus className="h-4 w-4" />
          Open Support Ticket
        </button>
      </div>

      {/* Support Bot Tier Selector Bar */}
      <div className="bg-[#18181b] border border-white/10 rounded-xl p-3.5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Bot className="h-3.5 w-3.5 text-[#38bdf8]" />
            Active Subscription Support Level:
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 custom-scrollbar">
            {["Spark", "Growth", "Velocity", "Empire", "Enterprise"].map((tName) => {
              const isSelected = selectedTier === tName;
              return (
                <button
                  key={tName}
                  onClick={() => setSelectedTier(tName)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? "bg-[#38bdf8] text-black font-black shadow-[0_0_10px_rgba(56,189,248,0.3)]"
                      : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5"
                  }`}
                >
                  {tName}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Bot Card Banner */}
        <div className={`p-3 rounded-lg border bg-black/40 flex items-start gap-3 ${activeBotConfig.borderColor}`}>
          <div className={`p-2 rounded-lg shrink-0 border ${activeBotConfig.badgeColor}`}>
            <BotIconComponent className="h-4 w-4" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-white font-sans uppercase tracking-wide">
                {activeBotConfig.title}
              </span>
              <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase border ${activeBotConfig.badgeColor}`}>
                {activeBotConfig.level} ({activeBotConfig.price})
              </span>
            </div>
            <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
              {activeBotConfig.description}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Chatbot Column */}
        <div className="lg:col-span-7 bg-[#0A0A0C] border border-white/[0.06] rounded-xl flex flex-col h-[440px] overflow-hidden">
          
          {/* Header */}
          <div className="bg-black/45 border-b border-white/[0.04] p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-[10px] font-mono font-bold text-slate-200 uppercase tracking-widest flex items-center gap-1.5">
                <BotIconComponent className="h-3.5 w-3.5 text-[#38bdf8]" />
                {activeBotConfig.title}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab(activeTab === "faqs" ? "chat" : "faqs")}
                className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase transition-all border cursor-pointer ${
                  activeTab === "faqs" 
                    ? "bg-emerald-500 text-black border-emerald-500" 
                    : "bg-white/5 text-slate-400 border-white/10 hover:text-white"
                }`}
              >
                {activeTab === "faqs" ? "Show Chat" : "Browse FAQs"}
              </button>
              <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase border ${activeBotConfig.badgeColor}`}>
                {selectedTier} Bot Tier
              </span>
            </div>
          </div>

          {/* Body view (Chat vs FAQs) */}
          {activeTab === "faqs" ? (
            <div className="flex-1 p-4 overflow-y-auto space-y-3 custom-scrollbar bg-black/10">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-emerald-400" />
                  {selectedTier} Fallback Knowledge Base FAQs
                </h4>
                <span className="text-[9px] font-mono text-slate-400">Offline Config</span>
              </div>
              <div className="space-y-2">
                {(supportFaqsByTier[selectedTier] || supportFaqsByTier["Spark"]).map((faq) => {
                  const isExpanded = expandedFaqId === faq.id;
                  return (
                    <div key={faq.id} className="p-3 bg-black/40 border border-white/[0.06] rounded-xl space-y-2">
                      <button
                        onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                        className="w-full text-left flex items-start justify-between gap-2 bg-transparent border-none cursor-pointer text-slate-200 hover:text-white"
                      >
                        <span className="text-xs font-sans font-medium leading-snug">
                          {faq.question}
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 bg-white/5 rounded text-emerald-400 border border-white/5 shrink-0">
                          {faq.category}
                        </span>
                      </button>

                      {isExpanded && (
                        <div className="pt-2 border-t border-white/5 space-y-2">
                          <p className="text-xs font-sans text-slate-300 leading-relaxed">
                            {faq.answer}
                          </p>
                          <div className="flex justify-end">
                            <button
                              onClick={() => {
                                setActiveTab("chat");
                                handleSendChat(faq.question);
                              }}
                              className="px-2.5 py-1 bg-[#38bdf8]/15 hover:bg-[#38bdf8]/30 text-[#38bdf8] text-[9px] font-mono font-bold rounded-md border border-[#38bdf8]/30 cursor-pointer transition-all"
                            >
                              Ask Chatbot
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <>
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
                    : "bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/40"
                }`}>
                  {msg.sender === "user" ? <User className="h-3.5 w-3.5" /> : <BotIconComponent className="h-3.5 w-3.5" />}
                </div>

                <div className="space-y-1">
                  <div className={`p-3 rounded-2xl text-xs leading-relaxed font-sans ${
                    msg.sender === "user"
                      ? "bg-[#38bdf8] text-black font-medium rounded-tr-none"
                      : "bg-[#111115] border border-white/[0.06] text-slate-200 rounded-tl-none"
                  }`}>
                    {msg.isFallback && (
                      <div className="mb-1.5 inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        <Sparkles className="h-2.5 w-2.5" />
                        Local Knowledge Base
                      </div>
                    )}
                    <div className="whitespace-pre-wrap">{msg.text}</div>
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
                <div className="w-7 h-7 rounded-full bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/20 flex items-center justify-center">
                  <RotateCw className="h-3.5 w-3.5 animate-spin" />
                </div>
                <div className="bg-[#111115] border border-white/[0.04] text-slate-400 text-xs p-3 rounded-2xl rounded-tl-none font-mono animate-pulse uppercase tracking-wider">
                  {activeBotConfig.title} formulating advice...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-3 py-2 bg-black/40 border-t border-white/5 flex items-center gap-1.5 overflow-x-auto shrink-0 custom-scrollbar">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSendChat(qp)}
                disabled={chatLoading}
                className="px-2.5 py-1 bg-white/5 hover:bg-white/10 text-[10px] font-mono text-slate-300 hover:text-white rounded-lg border border-white/5 whitespace-nowrap cursor-pointer transition-all shrink-0"
              >
                {qp}
              </button>
            ))}
          </div>

          {/* Form input */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendChat();
            }} 
            className="p-3 bg-black/45 border-t border-white/[0.04] flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={`Ask ${activeBotConfig.title}...`}
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 bg-[#050507] border border-white/[0.08] focus:border-[#38bdf8]/40 rounded-xl px-4 py-2.5 text-xs text-slate-100 outline-none"
            />
            <button
              type="submit"
              disabled={chatLoading || !chatInput.trim()}
              className="p-2.5 bg-[#38bdf8] hover:bg-[#38bdf8]/85 disabled:bg-slate-900 disabled:text-slate-600 rounded-xl text-black transition-all cursor-pointer border-none flex items-center justify-center"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          </>
        )}
        </div>

        {/* Existing Tickets Column */}
        <div className="lg:col-span-5 bg-[#0A0A0C] border border-white/[0.06] rounded-xl p-5 flex flex-col justify-between h-[440px]">
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
                      <div className="bg-black/35 border border-white/[0.02] p-2 rounded text-[10px] font-sans text-slate-400 italic">
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
              <X className="h-4 w-4" />
            </button>
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
              <LifeBuoy className="h-4.5 w-4.5 text-[#38bdf8]" />
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
                  className="w-full bg-[#050507] border border-white/[0.08] focus:border-[#38bdf8]/40 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
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
                  className="w-full bg-[#050507] border border-white/[0.08] focus:border-[#38bdf8]/40 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none resize-none font-sans"
                />
              </div>

              {ticketStatusMsg && (
                <div className={`p-3 rounded-lg text-[10px] flex items-center gap-1.5 ${
                  ticketStatusMsg.type === "success" 
                    ? "bg-emerald-950/20 text-emerald-400 border border-emerald-900/30" 
                    : "bg-rose-950/20 text-rose-400 border border-rose-900/30"
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
                  className="py-2 px-5 bg-[#38bdf8] hover:bg-[#38bdf8]/85 text-black font-mono text-xs font-bold uppercase rounded-lg transition-all cursor-pointer flex items-center gap-1.5 border-none outline-none"
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

