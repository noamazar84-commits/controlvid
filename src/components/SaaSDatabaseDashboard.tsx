import { useState, useEffect } from "react";
import { 
  Users, 
  DollarSign, 
  Cpu, 
  TrendingUp, 
  Database, 
  Terminal, 
  Plus, 
  Trash2, 
  Edit2, 
  Play, 
  Search, 
  RefreshCw, 
  FileCode, 
  Check, 
  X,
  AlertCircle,
  HelpCircle,
  PiggyBank
} from "lucide-react";
import { DbUser, DbFinancials, DbUsageLog, DbSupportTicket, DbEnterpriseRequest } from "../types";
import { 
  getUsers, 
  getFinancials, 
  getUsageLogs, 
  createUser, 
  updateUser, 
  deleteUser, 
  updateFinancials, 
  createUsageLog, 
  seedDbIfEmpty,
  syncWhopPayment,
  getSupportTickets,
  getEnterpriseRequests
} from "../lib/firebase";

interface SaaSDatabaseDashboardProps {
  onClose: () => void;
  activeUserSerialId: number | null;
  onSetActiveUserSerialId: (serialId: number) => void;
  adminBypassActive?: boolean;
  setAdminBypassActive?: (active: boolean) => void;
}

export default function SaaSDatabaseDashboard({ 
  onClose,
  activeUserSerialId,
  onSetActiveUserSerialId,
  adminBypassActive,
  setAdminBypassActive
}: SaaSDatabaseDashboardProps) {
  // Database States
  const [users, setUsers] = useState<DbUser[]>([]);
  const [financials, setFinancials] = useState<DbFinancials[]>([]);
  const [usageLogs, setUsageLogs] = useState<DbUsageLog[]>([]);
  const [supportTickets, setSupportTickets] = useState<DbSupportTicket[]>([]);
  const [enterpriseRequests, setEnterpriseRequests] = useState<DbEnterpriseRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // View States
  const [activeTab, setActiveTab] = useState<"users" | "financials" | "usage_logs" | "support" | "enterprise">("users");
  const [searchTerm, setSearchTerm] = useState("");
  const [sqlQuery, setSqlQuery] = useState("SELECT * FROM users;");
  const [sqlResult, setSqlResult] = useState<any[] | null>(null);
  const [sqlError, setSqlError] = useState<string | null>(null);
  const [sqlSuccess, setSqlSuccess] = useState<string | null>(null);

  // Modal / Form States
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isAddLogOpen, setIsAddLogOpen] = useState(false);
  const [isUpdateFinOpen, setIsUpdateFinOpen] = useState(false);

  // Form Fields
  const [userEmail, setUserEmail] = useState("");
  const [userWhopId, setUserWhopId] = useState("");
  const [userTier, setUserTier] = useState("Pro");
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editingUserSerialId, setEditingUserSerialId] = useState<number | null>(null);

  const [logUserId, setLogUserId] = useState<string>("");
  const [logAction, setLogAction] = useState("Generate Script (AI)");
  const [logCost, setLogCost] = useState("0.0015");

  const [finUserId, setFinUserId] = useState<number>(1);
  const [finRevenue, setFinRevenue] = useState("29.00");
  const [finApiCost, setFinApiCost] = useState("0.15");

  // Admin Command Center States
  const [operatorRole, setOperatorRole] = useState<"admin" | "user">("admin");
  const [adminCommand, setAdminCommand] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "SYS_INIT: Admin Command Center Ready.",
    "Available Commands:",
    "  1. Show Financial Summary",
    "  2. Get User Report [user_email]",
    "  3. Sync Whop Payment [email] [amount]",
    "Try clicking the preset buttons or typing commands directly."
  ]);

  // Execute administrative reporting commands
  const executeAdminCommand = async (commandText: string) => {
    const cmd = commandText.trim();
    if (!cmd) return;

    // Add command to history
    setTerminalHistory(prev => [...prev, `\n$ ${cmd}`]);

    const lowerCmd = cmd.toLowerCase();

    // Custom Backdoor: ENTER_ADMIN_MODE & EXIT_ADMIN_MODE
    if (lowerCmd === "enter_admin_mode") {
      if (setAdminBypassActive) {
        setAdminBypassActive(true);
        setTerminalHistory(prev => [
          ...prev,
          "----------------------------------------",
          "🔓 CEO BACKDOOR ACTIVATED (SYSTEM BYPASS)",
          "----------------------------------------",
          "Dashboard pricing & payment gate has been bypassed.",
          "Special 'CEO DASHBOARD ACCESS' override button active.",
          "----------------------------------------"
        ]);
      } else {
        setTerminalHistory(prev => [...prev, "❌ Error: Backdoor controls unavailable in current context."]);
      }
      return;
    }

    if (lowerCmd === "exit_admin_mode") {
      if (setAdminBypassActive) {
        setAdminBypassActive(false);
        setTerminalHistory(prev => [
          ...prev,
          "----------------------------------------",
          "🔒 CEO BACKDOOR DEACTIVATED",
          "----------------------------------------",
          "Standard user funnel & payment gatekeeper active.",
          "----------------------------------------"
        ]);
      } else {
        setTerminalHistory(prev => [...prev, "❌ Error: Backdoor controls unavailable in current context."]);
      }
      return;
    }

    // 1. Show Financial Summary
    if (lowerCmd === "show financial summary") {
      if (operatorRole !== "admin") {
        setTerminalHistory(prev => [
          ...prev,
          "❌ PERMISSION DENIED: This command is restricted to the ADMIN role only.",
          "Please select 'Operator Role: ADMIN' above to run this command."
        ]);
        return;
      }

      try {
        // Fetch fresh financials
        const fins = await getFinancials();
        const totalRev = fins.reduce((sum, f) => sum + (f.total_revenue || 0), 0);
        const totalApi = fins.reduce((sum, f) => sum + (f.total_api_cost || 0), 0);
        const netProf = totalRev - totalApi;

        setTerminalHistory(prev => [
          ...prev,
          "----------------------------------------",
          " FINANCIAL SUMMARY (ADMIN REPORTING)",
          "----------------------------------------",
          `Total Platform Revenue : $${totalRev.toFixed(2)}`,
          `Total Gemini API Costs : $${totalApi.toFixed(4)}`,
          `Net Operating Profit   : $${netProf.toFixed(4)}`,
          "----------------------------------------",
          "SECURE REPORT GENERATED SUCCESSFULLY."
        ]);
      } catch (err: any) {
        setTerminalHistory(prev => [...prev, `❌ Error: ${err.message || err}`]);
      }
      return;
    }

    // 2. Get User Report [user_email]
    const userReportMatch = cmd.match(/^get user report\s+(.+)$/i);
    if (userReportMatch) {
      const emailInput = userReportMatch[1].trim();
      try {
        const allUsers = await getUsers();
        const targetUser = allUsers.find(u => u.email.toLowerCase() === emailInput.toLowerCase());

        if (!targetUser) {
          setTerminalHistory(prev => [...prev, `❌ Error: User with email "${emailInput}" not found in database.`]);
          return;
        }

        // Fetch user's usage logs
        const allLogs = await getUsageLogs();
        const userLogs = allLogs.filter(l => l.user_id === targetUser.serialId);

        setTerminalHistory(prev => [
          ...prev,
          "----------------------------------------",
          ` USER REPORT: ${targetUser.email}`,
          "----------------------------------------",
          `User Serial ID    : #${targetUser.serialId}`,
          `Whop Customer ID  : ${targetUser.whop_customer_id || "N/A"}`,
          `Subscription Tier : ${targetUser.subscription_tier}`,
          `Signup Date       : ${new Date(targetUser.created_at).toLocaleString()}`,
          `Current Credits   : ${targetUser.credit_balance !== undefined ? targetUser.credit_balance.toFixed(2) : "0.00"} credits`,
          "----------------------------------------",
          "Recent Usage Logs:",
          userLogs.length === 0 
            ? "  (No action logs recorded for this user)" 
            : userLogs.slice(0, 5).map(l => `  • [${new Date(l.created_at).toLocaleTimeString()}] ${l.action_type} (Cost: $${l.cost.toFixed(4)})`).join("\n"),
          "----------------------------------------"
        ]);
      } catch (err: any) {
        setTerminalHistory(prev => [...prev, `❌ Error: ${err.message || err}`]);
      }
      return;
    }

    // 3. Sync Whop Payment [email] [amount]
    const whopSyncMatch = cmd.match(/^sync whop payment\s+(\S+)\s+(\d+(?:\.\d+)?)$/i);
    if (whopSyncMatch) {
      const emailInput = whopSyncMatch[1].trim();
      const amountInput = parseFloat(whopSyncMatch[2]);

      try {
        setTerminalHistory(prev => [...prev, `Initiating Whop Payment synchronization...`]);
        const result = await syncWhopPayment(emailInput, amountInput);
        
        // Reload dashboard state to show updated totals in tables/KPIs
        await loadData();

        setTerminalHistory(prev => [
          ...prev,
          `✅ SUCCESS: Manual Webhook Fallback Complete!`,
          `  • Synchronized User Email : ${emailInput}`,
          `  • Added to Total Revenue  : +$${amountInput.toFixed(2)}`,
          `  • Updated Credit Balance  : ${result.newCreditBalance.toFixed(2)} credits`,
          `Relational databases and financials synced successfully in Firestore.`
        ]);
      } catch (err: any) {
        setTerminalHistory(prev => [...prev, `❌ Error: ${err.message || err}`]);
      }
      return;
    }

    // Command unrecognized
    setTerminalHistory(prev => [
      ...prev,
      `❌ Command unrecognized: "${cmd}"`,
      `Supported syntax:`,
      `  • Show Financial Summary`,
      `  • Get User Report [user_email]`,
      `  • Sync Whop Payment [email] [amount]`
    ]);
  };

  // Fetch all records
  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      await seedDbIfEmpty();
      const u = await getUsers();
      const f = await getFinancials();
      const l = await getUsageLogs();
      try {
        const tkts = await getSupportTickets();
        const ents = await getEnterpriseRequests();
        setSupportTickets(tkts);
        setEnterpriseRequests(ents);
      } catch (err2) {
        console.warn("Error fetching tickets or enterprise requests", err2);
      }
      setUsers(u);
      setFinancials(f);
      setUsageLogs(l);

      // Set default active user if none is selected
      if (u.length > 0 && !activeUserSerialId) {
        onSetActiveUserSerialId(u[0].serialId);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load relational database collections from Firestore.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Form handlers
  const handleAddUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail || !userEmail.includes("@")) {
      alert("Please provide a valid email.");
      return;
    }
    setLoading(true);
    try {
      await createUser(userEmail, userWhopId, userTier);
      setUserEmail("");
      setUserWhopId("");
      setUserTier("Pro");
      setIsAddUserOpen(false);
      await loadData();
    } catch (err: any) {
      alert("Error adding user: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditUserClick = (user: DbUser) => {
    setEditingUserId(user.id);
    setEditingUserSerialId(user.serialId);
    setUserEmail(user.email);
    setUserWhopId(user.whop_customer_id);
    setUserTier(user.subscription_tier);
    setIsEditUserOpen(true);
  };

  const handleEditUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUserId || !editingUserSerialId) return;
    setLoading(true);
    try {
      await updateUser(editingUserId, editingUserSerialId, userEmail, userWhopId, userTier);
      setEditingUserId(null);
      setEditingUserSerialId(null);
      setUserEmail("");
      setUserWhopId("");
      setIsEditUserOpen(false);
      await loadData();
    } catch (err: any) {
      alert("Error updating user: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUserClick = async (user: DbUser) => {
    if (!confirm(`Are you sure you want to delete user #${user.serialId} (${user.email})? This will cascade-delete their financial accounts.`)) {
      return;
    }
    setLoading(true);
    try {
      await deleteUser(user.id, user.serialId);
      if (activeUserSerialId === user.serialId) {
        onSetActiveUserSerialId(1);
      }
      await loadData();
    } catch (err: any) {
      alert("Error deleting user: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddLogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const selectedU = users.find(u => u.id === logUserId);
    if (!selectedU) {
      alert("Please select a valid user.");
      return;
    }
    setLoading(true);
    try {
      await createUsageLog(selectedU.serialId, selectedU.email, logAction, parseFloat(logCost));
      setLogAction("Generate Script (AI)");
      setLogCost("0.0015");
      setIsAddLogOpen(false);
      await loadData();
    } catch (err: any) {
      alert("Error logging action: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateFinClick = (fin: DbFinancials) => {
    setFinUserId(fin.user_id);
    setFinRevenue(fin.total_revenue.toString());
    setFinApiCost(fin.total_api_cost.toString());
    setIsUpdateFinOpen(true);
  };

  const handleUpdateFinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateFinancials(finUserId, parseFloat(finRevenue), parseFloat(finApiCost));
      setIsUpdateFinOpen(false);
      await loadData();
    } catch (err: any) {
      alert("Error updating financials: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // SQL Compiler Emulator
  const handleRunSQL = () => {
    setSqlError(null);
    setSqlResult(null);
    setSqlSuccess(null);

    const queryClean = sqlQuery.trim().replace(/;$/, "").toLowerCase();

    // 1. SELECT * FROM users
    if (queryClean === "select * from users") {
      setSqlResult(users);
      setSqlSuccess(`Query executed successfully: returned ${users.length} rows.`);
      return;
    }

    // 2. SELECT * FROM financials
    if (queryClean === "select * from financials") {
      setSqlResult(financials);
      setSqlSuccess(`Query executed successfully: returned ${financials.length} rows.`);
      return;
    }

    // 3. SELECT * FROM usage_logs
    if (queryClean === "select * from usage_logs" || queryClean === "select * from usage_logs order by created_at desc") {
      setSqlResult(usageLogs);
      setSqlSuccess(`Query executed successfully: returned ${usageLogs.length} rows.`);
      return;
    }

    // 4. WHERE filter emulator on users
    if (queryClean.startsWith("select * from users where")) {
      const matchTier = queryClean.match(/subscription_tier\s*=\s*['"]([^'"]+)['"]/);
      if (matchTier) {
        const tier = matchTier[1];
        const filtered = users.filter(u => u.subscription_tier.toLowerCase() === tier.toLowerCase());
        setSqlResult(filtered);
        setSqlSuccess(`Query executed successfully: returned ${filtered.length} rows filtering tier='${tier}'.`);
        return;
      }
      const matchEmail = queryClean.match(/email\s*=\s*['"]([^'"]+)['"]/);
      if (matchEmail) {
        const email = matchEmail[1];
        const filtered = users.filter(u => u.email.toLowerCase() === email.toLowerCase());
        setSqlResult(filtered);
        setSqlSuccess(`Query executed successfully: returned ${filtered.length} rows filtering email='${email}'.`);
        return;
      }
    }

    // 5. WHERE filter emulator on financials
    if (queryClean.startsWith("select * from financials where")) {
      const matchNetProfit = queryClean.match(/net_profit\s*>\s*([0-9.]+)/);
      if (matchNetProfit) {
        const val = parseFloat(matchNetProfit[1]);
        const filtered = financials.filter(f => f.net_profit > val);
        setSqlResult(filtered);
        setSqlSuccess(`Query executed successfully: returned ${filtered.length} rows with net_profit > ${val}.`);
        return;
      }
    }

    // Default error
    setSqlError("SQL Compilation Error: Table or condition not recognized. Currently supported presets are listed above.");
  };

  // Calculations for KPIs
  const totalSaaSUsers = users.length;
  const totalSaaSRevenue = financials.reduce((sum, f) => sum + (f.total_revenue || 0), 0);
  const totalSaaSApiCost = financials.reduce((sum, f) => sum + (f.total_api_cost || 0), 0);
  const totalSaaSNetProfit = totalSaaSRevenue - totalSaaSApiCost;
  const averageLTV = totalSaaSUsers > 0 ? (totalSaaSRevenue / totalSaaSUsers) : 0;

  // Filter records based on search term
  const filteredUsers = users.filter(u => 
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.subscription_tier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.whop_customer_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFinancials = financials.filter(f => 
    f.user_email.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.user_id.toString().includes(searchTerm)
  );

  const filteredUsageLogs = usageLogs.filter(l => 
    l.user_email.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.action_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.user_id.toString().includes(searchTerm)
  );

  const filteredSupportTickets = supportTickets.filter(t => 
    t.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (t.status || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredEnterpriseRequests = enterpriseRequests.filter(e => 
    e.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.customRequirements.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (e.status || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleResolveTicket = async (ticketId: string) => {
    try {
      const response = await fetch("/api/support/tickets/resolve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: ticketId })
      });
      if (response.ok) {
        setSupportTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: "resolved" as const } : t));
      }
    } catch (err) {
      console.error("Failed to resolve ticket", err);
    }
  };

  const handleApproveEnterprise = async (reqId: string, status: "approved" | "rejected") => {
    try {
      setEnterpriseRequests(prev => prev.map(r => r.id === reqId ? { ...r, status } : r));
      const { saveEnterpriseRequest } = await import("../lib/firebase");
      const target = enterpriseRequests.find(r => r.id === reqId);
      if (target) {
        await saveEnterpriseRequest({ ...target, status });
      }
    } catch (err) {
      console.error("Failed to update enterprise status", err);
    }
  };

  const activeAppUserObj = users.find(u => u.serialId === activeUserSerialId);

  return (
    <div className="w-full min-h-screen bg-[#121212] text-slate-100 p-4 sm:p-8 flex flex-col gap-8 font-sans">
      
      {/* Upper Title Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-900 pb-5 gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center">
            <Database className="h-5 w-5 text-brand-cyan" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              SaaS Database & Finances Admin
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              PROVISIONED FIRESTORE INSTANCE // SQL COMPLIANCE INTEGRATION
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {activeAppUserObj && (
            <div className="bg-[#242424] border border-slate-900 px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-slate-400">Simulation Actor:</span>
              <span className="text-white font-bold">{activeAppUserObj.email}</span>
            </div>
          )}
          <button
            onClick={loadData}
            className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Reload database tables"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-brand-cyan text-black font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-brand-cyan/85 transition-all cursor-pointer"
          >
            Back to Studio
          </button>
        </div>
      </div>

      {/* SQL SCHEMA PANEL & KPI HIGHLIGHTS */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* SQL Schema Inspector Sidebar (3 Cols) */}
        <div className="xl:col-span-4 bg-black/40 border border-slate-900 rounded-2xl p-5 flex flex-col gap-4">
          <div className="flex items-center space-x-2 border-b border-slate-900 pb-3">
            <FileCode className="h-4 w-4 text-brand-cyan" />
            <h2 className="text-xs font-mono font-black text-white uppercase tracking-wider">
              Requested SQL Schema
            </h2>
          </div>
          <div className="bg-[#1E1E1E] p-4 rounded-xl border border-slate-950 max-h-[300px] overflow-y-auto font-mono text-[10px] text-[#38bdf8] leading-relaxed scrollbar-none">
            <span className="text-slate-500">-- Tables defined by user request</span><br />
            <span className="text-pink-400">CREATE TABLE</span> <span className="text-white">users</span> (<br />
            &nbsp;&nbsp;id <span className="text-yellow-400">SERIAL PRIMARY KEY</span>,<br />
            &nbsp;&nbsp;email <span className="text-purple-400">VARCHAR(255) UNIQUE</span>,<br />
            &nbsp;&nbsp;whop_customer_id <span className="text-purple-400">VARCHAR(255)</span>,<br />
            &nbsp;&nbsp;subscription_tier <span className="text-purple-400">VARCHAR(50)</span>,<br />
            &nbsp;&nbsp;created_at <span className="text-yellow-400">TIMESTAMP</span><br />
            );<br /><br />

            <span className="text-pink-400">CREATE TABLE</span> <span className="text-white">financials</span> (<br />
            &nbsp;&nbsp;user_id <span className="text-yellow-400">INTEGER REFERENCES</span> users(id),<br />
            &nbsp;&nbsp;total_revenue <span className="text-yellow-400">DECIMAL(10,2)</span>,<br />
            &nbsp;&nbsp;total_api_cost <span className="text-yellow-400">DECIMAL(10,2)</span>,<br />
            &nbsp;&nbsp;net_profit <span className="text-yellow-400">GENERATED ALWAYS AS</span> (total_revenue - total_api_cost) <span className="text-yellow-400">STORED</span><br />
            );<br /><br />

            <span className="text-pink-400">CREATE TABLE</span> <span className="text-white">usage_logs</span> (<br />
            &nbsp;&nbsp;id <span className="text-yellow-400">SERIAL PRIMARY KEY</span>,<br />
            &nbsp;&nbsp;user_id <span className="text-yellow-400">INTEGER REFERENCES</span> users(id),<br />
            &nbsp;&nbsp;action_type <span className="text-purple-400">VARCHAR(100)</span>,<br />
            &nbsp;&nbsp;cost <span className="text-yellow-400">DECIMAL(10,4)</span>,<br />
            &nbsp;&nbsp;created_at <span className="text-yellow-400">TIMESTAMP</span><br />
            );
          </div>
          <div className="text-[11px] text-slate-400 space-y-2 font-mono leading-relaxed bg-brand-cyan/[0.02] border border-brand-cyan/10 p-3.5 rounded-xl">
            <span className="font-bold text-brand-cyan block">⚡ FIRESTORE ENGINE MAP:</span>
            Mapped to document collections with dynamic triggers. Creating/deleting a User automatically manages and configures their `financials` record and logs the event, perfectly maintaining relational integrity on Firestore.
          </div>
        </div>

        {/* Top KPI Analytics (8 Cols) */}
        <div className="xl:col-span-8 grid grid-cols-2 md:grid-cols-5 gap-4">
          
          <div className="bg-[#242424]/45 border border-slate-900 p-5 rounded-2xl flex flex-col justify-between">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider">SaaS Customers</span>
              <Users className="h-4 w-4 text-brand-cyan" />
            </div>
            <div className="mt-4">
              <span className="text-2xl font-black text-white">{totalSaaSUsers}</span>
              <span className="block text-[9px] text-slate-500 font-mono mt-1">active signups</span>
            </div>
          </div>

          <div className="bg-[#242424]/45 border border-slate-900 p-5 rounded-2xl flex flex-col justify-between">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Total Revenue</span>
              <DollarSign className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="mt-4">
              <span className="text-2xl font-black text-white">${totalSaaSRevenue.toFixed(2)}</span>
              <span className="block text-[9px] text-emerald-500/80 font-mono mt-1">from Whop checkout</span>
            </div>
          </div>

          <div className="bg-[#242424]/45 border border-slate-900 p-5 rounded-2xl flex flex-col justify-between">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider">API Hardware Cost</span>
              <Cpu className="h-4 w-4 text-rose-500" />
            </div>
            <div className="mt-4">
              <span className="text-2xl font-black text-white">${totalSaaSApiCost.toFixed(4)}</span>
              <span className="block text-[9px] text-rose-400/80 font-mono mt-1">Gemini tokens burned</span>
            </div>
          </div>

          <div className="bg-[#242424]/45 border border-slate-900 p-5 rounded-2xl flex flex-col justify-between shadow-[0_0_20px_rgba(56, 189, 248, 0.02)]">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Net Profit</span>
              <TrendingUp className="h-4 w-4 text-[#38bdf8]" />
            </div>
            <div className="mt-4">
              <span className="text-2xl font-black text-[#38bdf8]">${totalSaaSNetProfit.toFixed(4)}</span>
              <span className="block text-[9px] text-brand-cyan/80 font-mono mt-1">Stored calculated profit</span>
            </div>
          </div>

          <div className="bg-[#242424]/45 border border-slate-900 p-5 rounded-2xl col-span-2 md:col-span-1 flex flex-col justify-between">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Average LTV</span>
              <PiggyBank className="h-4 w-4 text-purple-400" />
            </div>
            <div className="mt-4">
              <span className="text-2xl font-black text-white">${averageLTV.toFixed(2)}</span>
              <span className="block text-[9px] text-purple-400/80 font-mono mt-1">revenue per signup</span>
            </div>
          </div>

        </div>
      </div>

      {/* INTERACTIVE SQL COMPILER EMULATOR */}
      <div className="bg-[#242424]/50 border border-slate-900 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-4">
          <div className="flex items-center space-x-2">
            <Terminal className="h-4 w-4 text-brand-cyan" />
            <h2 className="text-xs font-mono font-black text-white uppercase tracking-wider">
              SQL Shell Console Emulator
            </h2>
          </div>
          <div className="flex gap-2 text-[9px] font-mono text-slate-400">
            <span>Query Quick Presets:</span>
            <button 
              onClick={() => { setSqlQuery("SELECT * FROM users;"); }} 
              className="hover:text-brand-cyan underline bg-transparent border-none cursor-pointer"
            >
              [users]
            </button>
            <button 
              onClick={() => { setSqlQuery("SELECT * FROM financials;"); }} 
              className="hover:text-brand-cyan underline bg-transparent border-none cursor-pointer"
            >
              [financials]
            </button>
            <button 
              onClick={() => { setSqlQuery("SELECT * FROM usage_logs ORDER BY created_at DESC;"); }} 
              className="hover:text-brand-cyan underline bg-transparent border-none cursor-pointer"
            >
              [usage_logs]
            </button>
            <button 
              onClick={() => { setSqlQuery("SELECT * FROM financials WHERE net_profit > 10;"); }} 
              className="hover:text-brand-cyan underline bg-transparent border-none cursor-pointer"
            >
              [where_profit]
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8 flex flex-col gap-2">
            <div className="relative">
              <textarea
                rows={2}
                value={sqlQuery}
                onChange={(e) => setSqlQuery(e.target.value)}
                className="w-full bg-[#1E1E1E] border border-slate-900 focus:border-brand-cyan/60 rounded-xl p-3 font-mono text-xs text-brand-cyan focus:outline-none transition-all resize-none"
                placeholder="Write your raw SQL query here..."
              />
              <button
                onClick={handleRunSQL}
                className="absolute right-3 bottom-3 py-1.5 px-3 bg-brand-cyan hover:bg-brand-cyan/85 text-black font-black font-mono text-[10px] rounded flex items-center gap-1.5 cursor-pointer shadow-lg shadow-brand-cyan/15 transition-all"
              >
                <Play className="h-3 w-3 fill-current" />
                RUN QUERY
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 bg-black/60 border border-slate-900 rounded-xl p-4 flex flex-col justify-center font-mono text-[11px] text-slate-400">
            {sqlError && (
              <div className="text-rose-400 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>{sqlError}</span>
              </div>
            )}
            {sqlSuccess && (
              <div className="text-emerald-400 flex items-start gap-2 mb-2">
                <Check className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>{sqlSuccess}</span>
              </div>
            )}
            {!sqlResult && !sqlError && !sqlSuccess && (
              <span className="text-slate-500 leading-relaxed text-center">
                Enter your select queries and hit "Run" to test relational lookups from the Firestore DB tables instantly!
              </span>
            )}

            {sqlResult && (
              <div className="max-h-[120px] overflow-y-auto bg-[#030304] p-2 rounded border border-slate-950 text-[9px] text-[#00FFFF]">
                <pre>{JSON.stringify(sqlResult, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ADMIN COMMAND CENTER */}
      <div className="bg-[#242424]/50 border border-slate-900 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-900 pb-3 mb-4 gap-2">
          <div className="flex items-center space-x-2">
            <Terminal className="h-4 w-4 text-emerald-400" />
            <h2 className="text-xs font-mono font-black text-white uppercase tracking-wider">
              Administrative Command Control Board
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">OPERATOR ROLE:</span>
            <select
              value={operatorRole}
              onChange={(e) => setOperatorRole(e.target.value as any)}
              className="bg-black/80 border border-slate-800 text-xs text-brand-cyan px-3 py-1 rounded-lg font-mono focus:outline-none focus:border-brand-cyan/40"
            >
              <option value="admin">ADMIN (noamazar84@gmail.com)</option>
              <option value="user">USER (alex@creator.co)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Quick presets left side */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-bold">
              Command Quick Presets (Click to Execute):
            </span>
            
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setAdminCommand("Show Financial Summary");
                  executeAdminCommand("Show Financial Summary");
                }}
                className="w-full text-left bg-[#1E1E1E] hover:bg-[#111116] border border-slate-900 hover:border-brand-cyan/30 rounded-xl p-3 transition-all text-xs flex justify-between items-center group cursor-pointer"
              >
                <div>
                  <span className="font-mono text-brand-cyan group-hover:text-cyan-300 font-black">Show Financial Summary</span>
                  <p className="text-[10px] text-slate-500 mt-0.5 font-sans">Run a total platform financials report</p>
                </div>
                <span className="text-[9px] font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/15 font-bold">Admin Role</span>
              </button>

              <button
                onClick={() => {
                  setAdminCommand("Get User Report alex@creator.co");
                  executeAdminCommand("Get User Report alex@creator.co");
                }}
                className="w-full text-left bg-[#1E1E1E] hover:bg-[#111116] border border-slate-900 hover:border-brand-cyan/30 rounded-xl p-3 transition-all text-xs flex justify-between items-center group cursor-pointer"
              >
                <div>
                  <span className="font-mono text-slate-300 group-hover:text-white font-black">Get User Report alex@creator.co</span>
                  <p className="text-[10px] text-slate-500 mt-0.5 font-sans">Retrieve signup date, credits & activity logs</p>
                </div>
                <span className="text-[9px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">Audit</span>
              </button>

              <button
                onClick={() => {
                  setAdminCommand("Get User Report sophia@viralbrands.com");
                  executeAdminCommand("Get User Report sophia@viralbrands.com");
                }}
                className="w-full text-left bg-[#1E1E1E] hover:bg-[#111116] border border-slate-900 hover:border-brand-cyan/30 rounded-xl p-3 transition-all text-xs flex justify-between items-center group cursor-pointer"
              >
                <div>
                  <span className="font-mono text-slate-300 group-hover:text-white font-black">Get User Report sophia@viralbrands.com</span>
                  <p className="text-[10px] text-slate-500 mt-0.5 font-sans">Audit Sophia's current credits and metrics</p>
                </div>
                <span className="text-[9px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">Audit</span>
              </button>

              <button
                onClick={() => {
                  setAdminCommand("Sync Whop Payment alex@creator.co 29.00");
                  executeAdminCommand("Sync Whop Payment alex@creator.co 29.00");
                }}
                className="w-full text-left bg-[#1E1E1E] hover:bg-[#111116] border border-slate-900 hover:border-emerald-500/30 rounded-xl p-3 transition-all text-xs flex justify-between items-center group cursor-pointer"
              >
                <div>
                  <span className="font-mono text-emerald-400 group-hover:text-emerald-300 font-black">Sync Whop Payment alex@creator.co 29.00</span>
                  <p className="text-[10px] text-slate-500 mt-0.5 font-sans">Recover failed checkout (+$29.00 Revenue & Credits)</p>
                </div>
                <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/15 font-bold">Sync Webhook</span>
              </button>

              <button
                onClick={() => {
                  setAdminCommand("Sync Whop Payment sophia@viralbrands.com 199.00");
                  executeAdminCommand("Sync Whop Payment sophia@viralbrands.com 199.00");
                }}
                className="w-full text-left bg-[#1E1E1E] hover:bg-[#111116] border border-slate-900 hover:border-emerald-500/30 rounded-xl p-3 transition-all text-xs flex justify-between items-center group cursor-pointer"
              >
                <div>
                  <span className="font-mono text-emerald-400 group-hover:text-emerald-300 font-black">Sync Whop Payment sophia@viralbrands.com 199.00</span>
                  <p className="text-[10px] text-slate-500 mt-0.5 font-sans">Recover failed checkout (+$199.00 Revenue & Credits)</p>
                </div>
                <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/15 font-bold">Sync Webhook</span>
              </button>
            </div>
          </div>

          {/* Interactive Shell Output on right */}
          <div className="lg:col-span-7 bg-[#030304] border border-slate-900 rounded-xl p-4 flex flex-col justify-between h-[410px]">
            <div className="overflow-y-auto font-mono text-[11px] text-slate-300 leading-relaxed scrollbar-none flex-1 max-h-[340px] mb-3 space-y-1">
              {terminalHistory.map((line, idx) => (
                <div key={idx} className="whitespace-pre-wrap select-text selection:bg-brand-cyan/25 selection:text-white">{line}</div>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                executeAdminCommand(adminCommand);
                setAdminCommand("");
              }}
              className="flex gap-2 border-t border-slate-900/60 pt-3"
            >
              <span className="text-brand-cyan font-mono text-xs self-center font-bold">$</span>
              <input
                type="text"
                value={adminCommand}
                onChange={(e) => setAdminCommand(e.target.value)}
                className="bg-transparent flex-1 focus:outline-none font-mono text-xs text-white placeholder-slate-600"
                placeholder="Enter administrative command (e.g. Show Financial Summary)..."
              />
              <button
                type="button"
                onClick={() => setTerminalHistory(["SYS_INIT: Terminal Cleared."])}
                className="text-[9px] font-mono text-slate-500 hover:text-white px-2 py-1 bg-slate-900 border border-slate-800 rounded transition-all cursor-pointer"
              >
                CLEAR
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-brand-cyan hover:bg-brand-cyan/85 text-black font-black font-mono text-[10px] rounded-lg transition-all cursor-pointer"
              >
                EXECUTE
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* DATABASE TABLES CONTAINER */}
      <div className="bg-black/30 border border-slate-900 rounded-2xl p-5 flex flex-col gap-6">
        
        {/* Search and Table Navigation Tab Bar */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between border-b border-slate-900 pb-4 gap-4">
          <div className="flex flex-wrap bg-[#1E1E1E] p-1 rounded-xl border border-slate-900 max-w-4xl w-full">
            <button
              onClick={() => setActiveTab("users")}
              className={`flex-1 min-w-[90px] py-2 text-[10px] sm:text-xs font-mono font-bold uppercase rounded-lg border transition-all cursor-pointer ${
                activeTab === "users" 
                  ? "bg-brand-cyan/10 border-brand-cyan/30 text-brand-cyan shadow-sm" 
                  : "bg-transparent border-transparent text-slate-500 hover:text-white"
              }`}
            >
              1. Users Table
            </button>
            <button
              onClick={() => setActiveTab("financials")}
              className={`flex-1 min-w-[90px] py-2 text-[10px] sm:text-xs font-mono font-bold uppercase rounded-lg border transition-all cursor-pointer ${
                activeTab === "financials" 
                  ? "bg-brand-cyan/10 border-brand-cyan/30 text-brand-cyan shadow-sm" 
                  : "bg-transparent border-transparent text-slate-500 hover:text-white"
              }`}
            >
              2. Financials
            </button>
            <button
              onClick={() => setActiveTab("usage_logs")}
              className={`flex-1 min-w-[90px] py-2 text-[10px] sm:text-xs font-mono font-bold uppercase rounded-lg border transition-all cursor-pointer ${
                activeTab === "usage_logs" 
                  ? "bg-brand-cyan/10 border-brand-cyan/30 text-brand-cyan shadow-sm" 
                  : "bg-transparent border-transparent text-slate-500 hover:text-white"
              }`}
            >
              3. Usage Logs
            </button>
            <button
              onClick={() => setActiveTab("support")}
              className={`flex-1 min-w-[90px] py-2 text-[10px] sm:text-xs font-mono font-bold uppercase rounded-lg border transition-all cursor-pointer ${
                activeTab === "support" 
                  ? "bg-brand-cyan/10 border-brand-cyan/30 text-brand-cyan shadow-sm" 
                  : "bg-transparent border-transparent text-slate-500 hover:text-white"
              }`}
            >
              4. Support ({supportTickets.length})
            </button>
            <button
              onClick={() => setActiveTab("enterprise")}
              className={`flex-1 min-w-[90px] py-2 text-[10px] sm:text-xs font-mono font-bold uppercase rounded-lg border transition-all cursor-pointer ${
                activeTab === "enterprise" 
                  ? "bg-brand-cyan/10 border-brand-cyan/30 text-brand-cyan shadow-sm" 
                  : "bg-transparent border-transparent text-slate-500 hover:text-white"
              }`}
            >
              5. Enterprise ({enterpriseRequests.length})
            </button>
          </div>

          <div className="flex items-center gap-3 w-full xl:w-auto">
            {/* Table Action Trigger Buttons */}
            {activeTab === "users" && (
              <button
                onClick={() => setIsAddUserOpen(true)}
                className="py-2 px-3 bg-[#111115] hover:bg-[#15151b] border border-slate-800 text-slate-200 hover:text-white text-xs font-mono font-bold rounded-lg flex items-center gap-1.5 cursor-pointer ml-auto transition-all"
              >
                <Plus className="h-3.5 w-3.5 text-brand-cyan" />
                CREATE USER
              </button>
            )}

            {activeTab === "usage_logs" && (
              <button
                onClick={() => setIsAddLogOpen(true)}
                className="py-2 px-3 bg-[#111115] hover:bg-[#15151b] border border-slate-800 text-slate-200 hover:text-white text-xs font-mono font-bold rounded-lg flex items-center gap-1.5 cursor-pointer ml-auto transition-all"
              >
                <Plus className="h-3.5 w-3.5 text-brand-cyan" />
                INSERT ACTION LOG
              </button>
            )}

            {/* General Filter input bar */}
            <div className="relative max-w-xs w-full flex-shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#1E1E1E] border border-slate-900 focus:border-brand-cyan/40 rounded-lg pl-9 pr-4 py-2 text-xs font-sans text-slate-300 focus:outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* LOADING & DATA DISPLAY PORTAL */}
        {loading ? (
          <div className="p-20 text-center flex flex-col items-center justify-center gap-3">
            <RefreshCw className="h-8 w-8 text-brand-cyan animate-spin" />
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest animate-pulse">
              Syncing tables on Firestore database...
            </span>
          </div>
        ) : error ? (
          <div className="bg-rose-950/20 border border-rose-900/30 p-8 rounded-2xl text-center text-rose-200 text-xs flex flex-col items-center gap-3 max-w-md mx-auto my-12 shadow-lg shadow-rose-950/5">
            <AlertCircle className="h-8 w-8 text-rose-500" />
            <div className="font-mono uppercase font-black tracking-wider text-rose-400">Database Connection Error</div>
            <p className="font-sans leading-relaxed text-slate-300">{error}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            {/* ACTIVE TAB IS: USERS */}
            {activeTab === "users" && (
              <table className="w-full text-left font-mono text-[11px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-900 text-slate-500 uppercase tracking-wider text-[9px] font-bold bg-[#040406]/50">
                    <th className="py-3 px-4">id (SERIAL)</th>
                    <th className="py-3 px-4">email</th>
                    <th className="py-3 px-4">whop_customer_id</th>
                    <th className="py-3 px-4">subscription_tier</th>
                    <th className="py-3 px-4">credit_balance</th>
                    <th className="py-3 px-4">created_at</th>
                    <th className="py-3 px-4">App Actor</th>
                    <th className="py-3 px-4 text-right">actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/40">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-slate-550 font-sans">
                        No user accounts matched the search criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-900/10 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-white">#{user.serialId}</td>
                        <td className="py-3.5 px-4 font-sans font-semibold text-slate-200">{user.email}</td>
                        <td className="py-3.5 px-4 text-slate-400">{user.whop_customer_id || "N/A"}</td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold ${
                            user.subscription_tier === "Enterprise" 
                              ? "bg-purple-500/15 text-purple-400 border border-purple-500/20" 
                              : user.subscription_tier === "Empire" 
                              ? "bg-rose-500/15 text-rose-400 border border-rose-500/20" 
                              : user.subscription_tier === "Velocity" 
                              ? "bg-amber-500/15 text-amber-400 border border-amber-500/20" 
                              : user.subscription_tier === "Growth" 
                              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20" 
                              : user.subscription_tier === "Spark" 
                              ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/20"
                              : user.subscription_tier === "Pro" 
                              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20" 
                              : "bg-slate-800/40 text-slate-400 border border-slate-800"
                          }`}>
                            {user.subscription_tier}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-[#00FFFF] font-bold">
                          {user.credit_balance !== undefined ? user.credit_balance.toFixed(2) : "0.00"}
                        </td>
                        <td className="py-3.5 px-4 text-slate-400">{new Date(user.created_at).toLocaleDateString()}</td>
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => onSetActiveUserSerialId(user.serialId)}
                            className={`px-2 py-1 text-[9px] font-bold uppercase rounded border transition-all cursor-pointer ${
                              activeUserSerialId === user.serialId
                                ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                                : "bg-transparent border-slate-900 text-slate-500 hover:text-white"
                            }`}
                          >
                            {activeUserSerialId === user.serialId ? "Selected" : "Use Actor"}
                          </button>
                        </td>
                        <td className="py-3.5 px-4 text-right flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEditUserClick(user)}
                            className="p-1.5 hover:bg-slate-900 text-slate-400 hover:text-white rounded border border-transparent hover:border-slate-800 transition-all cursor-pointer"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteUserClick(user)}
                            className="p-1.5 hover:bg-red-950/20 text-slate-400 hover:text-red-400 rounded border border-transparent hover:border-red-950/30 transition-all cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}

            {/* ACTIVE TAB IS: FINANCIALS */}
            {activeTab === "financials" && (
              <table className="w-full text-left font-mono text-[11px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-900 text-slate-500 uppercase tracking-wider text-[9px] font-bold bg-[#040406]/50">
                    <th className="py-3 px-4">user_id (REFERENCES users)</th>
                    <th className="py-3 px-4">email profile</th>
                    <th className="py-3 px-4">total_revenue</th>
                    <th className="py-3 px-4">total_api_cost</th>
                    <th className="py-3 px-4">net_profit (STORED GENERATED)</th>
                    <th className="py-3 px-4 text-right">actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/40">
                  {filteredFinancials.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-550 font-sans">
                        No financial records found.
                      </td>
                    </tr>
                  ) : (
                    filteredFinancials.map((fin) => (
                      <tr key={fin.id} className="hover:bg-slate-900/10 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-400">#{fin.user_id}</td>
                        <td className="py-3.5 px-4 font-sans text-slate-200">{fin.user_email}</td>
                        <td className="py-3.5 px-4 text-emerald-400 font-bold">${fin.total_revenue?.toFixed(2)}</td>
                        <td className="py-3.5 px-4 text-rose-400">${fin.total_api_cost?.toFixed(4)}</td>
                        <td className={`py-3.5 px-4 font-bold ${
                          fin.net_profit >= 0 ? "text-[#38bdf8]" : "text-rose-500"
                        }`}>
                          ${fin.net_profit?.toFixed(4)}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => handleUpdateFinClick(fin)}
                            className="py-1 px-2.5 bg-[#121215] hover:bg-[#18181f] border border-slate-800 text-slate-300 hover:text-white text-[10px] font-bold uppercase rounded-md transition-all cursor-pointer"
                          >
                            Update Balances
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}

            {/* ACTIVE TAB IS: USAGE LOGS */}
            {activeTab === "usage_logs" && (
              <table className="w-full text-left font-mono text-[11px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-900 text-slate-500 uppercase tracking-wider text-[9px] font-bold bg-[#040406]/50">
                    <th className="py-3 px-4">log_id (SERIAL)</th>
                    <th className="py-3 px-4">user_id (REFERENCES)</th>
                    <th className="py-3 px-4">user_email</th>
                    <th className="py-3 px-4">action_type</th>
                    <th className="py-3 px-4">action_cost</th>
                    <th className="py-3 px-4">created_at</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/40">
                  {filteredUsageLogs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-550 font-sans">
                        No activity / usage logs available.
                      </td>
                    </tr>
                  ) : (
                    filteredUsageLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-900/10 transition-colors">
                        <td className="py-3.5 px-4 text-slate-500">#{log.serialId}</td>
                        <td className="py-3.5 px-4 font-bold text-slate-400">#{log.user_id}</td>
                        <td className="py-3.5 px-4 font-sans text-slate-300">{log.user_email}</td>
                        <td className="py-3.5 px-4 text-slate-200">{log.action_type}</td>
                        <td className="py-3.5 px-4 text-rose-400/90 font-bold">${log.cost?.toFixed(4)}</td>
                        <td className="py-3.5 px-4 text-slate-450">{new Date(log.created_at).toLocaleString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}

            {/* ACTIVE TAB IS: SUPPORT */}
            {activeTab === "support" && (
              <table className="w-full text-left font-mono text-[11px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-900 text-slate-500 uppercase tracking-wider text-[9px] font-bold bg-[#040406]/50">
                    <th className="py-3 px-4">ticket_id</th>
                    <th className="py-3 px-4">customer</th>
                    <th className="py-3 px-4">message</th>
                    <th className="py-3 px-4">ai_bot_reply</th>
                    <th className="py-3 px-4">status</th>
                    <th className="py-3 px-4 text-right">actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/40">
                  {filteredSupportTickets.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-550 font-sans">
                        No support tickets submitted.
                      </td>
                    </tr>
                  ) : (
                    filteredSupportTickets.map((tkt) => (
                      <tr key={tkt.id} className="hover:bg-slate-900/10 transition-colors">
                        <td className="py-3.5 px-4 text-slate-500 text-[10px] select-all max-w-[80px] truncate">{tkt.id}</td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-300">{tkt.fullName}</div>
                          <div className="text-slate-500 text-[10px] font-mono">{tkt.email}</div>
                        </td>
                        <td className="py-3.5 px-4 font-sans text-slate-300 max-w-xs break-words">{tkt.message}</td>
                        <td className="py-3.5 px-4 font-sans text-slate-400 max-w-xs break-words italic bg-black/10 p-2 rounded border border-slate-900/55">
                          {tkt.chatbotReply || <span className="text-slate-600 font-mono">No AI Response</span>}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            tkt.status === "resolved" 
                              ? "bg-emerald-950/40 border border-emerald-900 text-emerald-400" 
                              : "bg-amber-950/40 border border-amber-900 text-amber-400"
                          }`}>
                            {tkt.status || "active"}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          {tkt.status !== "resolved" && (
                            <button
                              onClick={() => handleResolveTicket(tkt.id)}
                              className="py-1 px-2 bg-emerald-500 hover:bg-emerald-650 text-black text-[10px] font-bold uppercase rounded transition-all cursor-pointer"
                            >
                              Resolve
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}

            {/* ACTIVE TAB IS: ENTERPRISE */}
            {activeTab === "enterprise" && (
              <table className="w-full text-left font-mono text-[11px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-900 text-slate-500 uppercase tracking-wider text-[9px] font-bold bg-[#040406]/50">
                    <th className="py-3 px-4">request_id</th>
                    <th className="py-3 px-4">company</th>
                    <th className="py-3 px-4">contact</th>
                    <th className="py-3 px-4">requirements</th>
                    <th className="py-3 px-4">estimated_value (acv)</th>
                    <th className="py-3 px-4">status</th>
                    <th className="py-3 px-4 text-right">actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/40">
                  {filteredEnterpriseRequests.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-550 font-sans">
                        No enterprise requests submitted.
                      </td>
                    </tr>
                  ) : (
                    filteredEnterpriseRequests.map((req) => (
                      <tr key={req.id} className="hover:bg-slate-900/10 transition-colors">
                        <td className="py-3.5 px-4 text-slate-500 text-[10px] max-w-[80px] truncate">{req.id}</td>
                        <td className="py-3.5 px-4 font-bold text-slate-300">{req.companyName}</td>
                        <td className="py-3.5 px-4 font-sans">
                          <div className="text-slate-300">{req.email}</div>
                        </td>
                        <td className="py-3.5 px-4 font-sans text-slate-300 max-w-xs break-words">{req.customRequirements}</td>
                        <td className="py-3.5 px-4 text-brand-cyan font-bold font-mono">
                          ${req.estimatedValue?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "0.00"}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            req.status === "approved" 
                              ? "bg-emerald-950/40 border border-emerald-900 text-emerald-400"
                              : req.status === "rejected"
                              ? "bg-rose-950/40 border border-rose-900 text-rose-400"
                              : "bg-blue-950/40 border border-blue-900 text-blue-400"
                          }`}>
                            {req.status || "pending"}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-1.5">
                          {req.status !== "approved" && (
                            <button
                              onClick={() => handleApproveEnterprise(req.id, "approved")}
                              className="py-1 px-2.5 bg-brand-cyan hover:bg-brand-cyan/85 text-black text-[10px] font-bold uppercase rounded transition-all cursor-pointer"
                            >
                              Approve
                            </button>
                          )}
                          {req.status !== "rejected" && (
                            <button
                              onClick={() => handleApproveEnterprise(req.id, "rejected")}
                              className="py-1 px-2 bg-rose-950 hover:bg-rose-900 text-rose-200 border border-rose-800 text-[10px] font-bold uppercase rounded transition-all cursor-pointer"
                            >
                              Reject
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {/* -----------------------------------------------------------------------
          MODALS / FORMS FOR WRITE OPERATIONS (Standard SaaS SQL Logic)
          ----------------------------------------------------------------------- */}
      
      {/* 1. Add User Modal */}
      {isAddUserOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-[#0c0c0e] border border-slate-900 rounded-2xl w-full max-w-md p-6 relative">
            <button 
              onClick={() => setIsAddUserOpen(false)}
              className="absolute right-4 top-4 text-slate-500 hover:text-white bg-transparent border-none cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Plus className="h-4 w-4 text-brand-cyan" />
              SQL: INSERT INTO users
            </h3>
            <form onSubmit={handleAddUserSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                  email address
                </label>
                <input
                  type="email"
                  required
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="e.g. client@agency.com"
                  className="w-full bg-[#111113] border border-slate-900 focus:border-brand-cyan/60 rounded-xl p-3 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                  whop_customer_id
                </label>
                <input
                  type="text"
                  value={userWhopId}
                  onChange={(e) => setUserWhopId(e.target.value)}
                  placeholder="e.g. whop_cust_xxxx (optional)"
                  className="w-full bg-[#111113] border border-slate-900 focus:border-brand-cyan/60 rounded-xl p-3 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                  subscription_tier
                </label>
                <select
                  value={userTier}
                  onChange={(e) => setUserTier(e.target.value)}
                  className="w-full bg-[#111113] border border-slate-900 focus:border-brand-cyan/60 rounded-xl p-3 text-xs text-white focus:outline-none"
                >
                  <option value="Free">Free ($0.00)</option>
                  <option value="Spark">Spark ($39.00)</option>
                  <option value="Growth">Growth ($79.00)</option>
                  <option value="Velocity">Velocity ($119.00)</option>
                  <option value="Empire">Empire ($219.00)</option>
                  <option value="Enterprise">Enterprise (Custom)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-cyan hover:bg-brand-cyan/90 text-black font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer mt-2 shadow-lg shadow-brand-cyan/15"
              >
                EXECUTE INSERTION
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 2. Edit User Modal */}
      {isEditUserOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-[#0c0c0e] border border-slate-900 rounded-2xl w-full max-w-md p-6 relative">
            <button 
              onClick={() => {
                setIsEditUserOpen(false);
                setEditingUserId(null);
                setEditingUserSerialId(null);
              }}
              className="absolute right-4 top-4 text-slate-500 hover:text-white bg-transparent border-none cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Edit2 className="h-4 w-4 text-brand-cyan" />
              SQL: UPDATE users
            </h3>
            <form onSubmit={handleEditUserSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                  email address
                </label>
                <input
                  type="email"
                  required
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full bg-[#111113] border border-slate-900 focus:border-brand-cyan/60 rounded-xl p-3 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                  whop_customer_id
                </label>
                <input
                  type="text"
                  value={userWhopId}
                  onChange={(e) => setUserWhopId(e.target.value)}
                  className="w-full bg-[#111113] border border-slate-900 focus:border-brand-cyan/60 rounded-xl p-3 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                  subscription_tier
                </label>
                <select
                  value={userTier}
                  onChange={(e) => setUserTier(e.target.value)}
                  className="w-full bg-[#111113] border border-slate-900 focus:border-brand-cyan/60 rounded-xl p-3 text-xs text-white focus:outline-none"
                >
                  <option value="Free">Free</option>
                  <option value="Spark">Spark</option>
                  <option value="Growth">Growth</option>
                  <option value="Velocity">Velocity</option>
                  <option value="Empire">Empire</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-cyan hover:bg-brand-cyan/90 text-black font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer mt-2"
              >
                EXECUTE UPDATE
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 3. Insert Usage Log Modal */}
      {isAddLogOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-[#0c0c0e] border border-slate-900 rounded-2xl w-full max-w-md p-6 relative">
            <button 
              onClick={() => setIsAddLogOpen(false)}
              className="absolute right-4 top-4 text-slate-500 hover:text-white bg-transparent border-none cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Plus className="h-4 w-4 text-brand-cyan" />
              SQL: INSERT INTO usage_logs
            </h3>
            <form onSubmit={handleAddLogSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                  Select User (FOREIGN KEY user_id REFERENCES users)
                </label>
                <select
                  required
                  value={logUserId}
                  onChange={(e) => setLogUserId(e.target.value)}
                  className="w-full bg-[#111113] border border-slate-900 focus:border-brand-cyan/60 rounded-xl p-3 text-xs text-white focus:outline-none"
                >
                  <option value="">-- Choose User Profile --</option>
                  {users.map(u => (
                    <option key={u.id} value={u.id}>#{u.serialId} // {u.email}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                  action_type
                </label>
                <input
                  type="text"
                  required
                  value={logAction}
                  onChange={(e) => setLogAction(e.target.value)}
                  placeholder="e.g. Generate Script (TikTok)"
                  className="w-full bg-[#111113] border border-slate-900 focus:border-brand-cyan/60 rounded-xl p-3 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                  action_cost (USD)
                </label>
                <input
                  type="number"
                  step="0.0001"
                  required
                  value={logCost}
                  onChange={(e) => setLogCost(e.target.value)}
                  placeholder="0.0015"
                  className="w-full bg-[#111113] border border-slate-900 focus:border-brand-cyan/60 rounded-xl p-3 text-xs text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-cyan hover:bg-brand-cyan/90 text-black font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer mt-2"
              >
                EXECUTE ACTION INSERTION
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 4. Update Financial Balances Modal */}
      {isUpdateFinOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-[#0c0c0e] border border-slate-900 rounded-2xl w-full max-w-md p-6 relative">
            <button 
              onClick={() => setIsUpdateFinOpen(false)}
              className="absolute right-4 top-4 text-slate-500 hover:text-white bg-transparent border-none cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Edit2 className="h-4 w-4 text-brand-cyan" />
              SQL: UPDATE financials
            </h3>
            <form onSubmit={handleUpdateFinSubmit} className="space-y-4">
              <div className="bg-[#1E1E1E] p-3 rounded border border-slate-950 text-[10px] font-mono text-slate-400">
                Editing financials for User ID <span className="text-white">#{finUserId}</span>.<br />
                Net profit will automatically update using the expression:<br />
                <span className="text-brand-cyan font-bold">total_revenue - total_api_cost</span>.
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                  total_revenue ($ USD)
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={finRevenue}
                  onChange={(e) => setFinRevenue(e.target.value)}
                  className="w-full bg-[#111113] border border-slate-900 focus:border-brand-cyan/60 rounded-xl p-3 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                  total_api_cost ($ USD)
                </label>
                <input
                  type="number"
                  step="0.0001"
                  required
                  value={finApiCost}
                  onChange={(e) => setFinApiCost(e.target.value)}
                  className="w-full bg-[#111113] border border-slate-900 focus:border-brand-cyan/60 rounded-xl p-3 text-xs text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-cyan hover:bg-brand-cyan/90 text-black font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer mt-2"
              >
                EXECUTE BALANCES UPDATE
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
