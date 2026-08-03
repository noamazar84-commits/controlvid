import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
  getFirestore,
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy 
} from "firebase/firestore";
import { DbUser, DbFinancials, DbUsageLog, DbAffiliate, DbReferral, DbDMAutomationRule, DbSupportTicket, DbEnterpriseRequest } from "../types";
import firebaseConfig from "../../firebase-applet-config.json";

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);

// Initialize Firestore with specific database ID from configuration
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || "(default)");

// -----------------------------------------------------------------------------
// Offline-First / LocalStorage Fallback System
// -----------------------------------------------------------------------------

const LOCAL_USERS_KEY = "viralflow_fallback_users";
const LOCAL_FIN_KEY = "viralflow_fallback_financials";
const LOCAL_LOGS_KEY = "viralflow_fallback_logs";

const defaultUsers: DbUser[] = [
  {
    id: "user_1",
    serialId: 1,
    email: "alex@creator.co",
    whop_customer_id: "whop_cust_7x12",
    subscription_tier: "Spark",
    credit_balance: 50.00,
    created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    role: "USER"
  },
  {
    id: "user_2",
    serialId: 2,
    email: "sophia@viralbrands.com",
    whop_customer_id: "whop_cust_9a44",
    subscription_tier: "Enterprise",
    credit_balance: 150.00,
    created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    role: "admin"
  },
  {
    id: "user_3",
    serialId: 3,
    email: "marcus@shortsfactory.io",
    whop_customer_id: "whop_cust_3b88",
    subscription_tier: "Free",
    credit_balance: 5.00,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    role: "USER"
  }
];

const defaultFinancials: DbFinancials[] = [
  {
    id: "fin_1",
    user_id: 1,
    user_email: "alex@creator.co",
    total_revenue: 29.00,
    total_api_cost: 0.1245,
    net_profit: 29.00 - 0.1245
  },
  {
    id: "fin_2",
    user_id: 2,
    user_email: "sophia@viralbrands.com",
    total_revenue: 199.00,
    total_api_cost: 0.4582,
    net_profit: 199.00 - 0.4582
  },
  {
    id: "fin_3",
    user_id: 3,
    user_email: "marcus@shortsfactory.io",
    total_revenue: 0.00,
    total_api_cost: 0.0240,
    net_profit: 0.00 - 0.0240
  }
];

const defaultLogs: DbUsageLog[] = [
  {
    id: "log_1",
    serialId: 1,
    user_id: 1,
    user_email: "alex@creator.co",
    action_type: "Script Generation (TikTok)",
    cost: 0.0015,
    created_at: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "log_2",
    serialId: 2,
    user_id: 1,
    user_email: "alex@creator.co",
    action_type: "Script Edit & Export",
    cost: 0.0002,
    created_at: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "log_3",
    serialId: 3,
    user_id: 2,
    user_email: "sophia@viralbrands.com",
    action_type: "Bulk Campaign Generation (YouTube Shorts)",
    cost: 0.0150,
    created_at: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "log_4",
    serialId: 4,
    user_id: 2,
    user_email: "sophia@viralbrands.com",
    action_type: "Studio Workspace Sync",
    cost: 0.0042,
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "log_5",
    serialId: 5,
    user_id: 3,
    user_email: "marcus@shortsfactory.io",
    action_type: "Script Generation (Instagram Reels)",
    cost: 0.0015,
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  }
];

function getLocalUsers(): DbUser[] {
  if (typeof window === "undefined") return defaultUsers;
  const data = localStorage.getItem(LOCAL_USERS_KEY);
  if (!data) {
    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(defaultUsers));
    return defaultUsers;
  }
  return JSON.parse(data);
}

function saveLocalUsers(users: DbUser[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
  }
}

function getLocalFinancials(): DbFinancials[] {
  if (typeof window === "undefined") return defaultFinancials;
  const data = localStorage.getItem(LOCAL_FIN_KEY);
  if (!data) {
    localStorage.setItem(LOCAL_FIN_KEY, JSON.stringify(defaultFinancials));
    return defaultFinancials;
  }
  return JSON.parse(data);
}

function saveLocalFinancials(fins: DbFinancials[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_FIN_KEY, JSON.stringify(fins));
  }
}

function getLocalLogs(): DbUsageLog[] {
  if (typeof window === "undefined") return defaultLogs;
  const data = localStorage.getItem(LOCAL_LOGS_KEY);
  if (!data) {
    localStorage.setItem(LOCAL_LOGS_KEY, JSON.stringify(defaultLogs));
    return defaultLogs;
  }
  return JSON.parse(data);
}

function saveLocalLogs(logs: DbUsageLog[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_LOGS_KEY, JSON.stringify(logs));
  }
}

// Helper to seed database with realistic records if it is empty
export async function seedDbIfEmpty() {
  try {
    const usersCol = collection(db, "users");
    const usersSnapshot = await getDocs(usersCol);
    
    if (usersSnapshot.empty) {
      console.log("[Firebase Seeder] Seeding database with initial relational SaaS data...");
      
      for (const u of defaultUsers) {
        const userRef = doc(usersCol, `user_${u.serialId}`);
        await setDoc(userRef, {
          serialId: u.serialId,
          email: u.email,
          whop_customer_id: u.whop_customer_id,
          subscription_tier: u.subscription_tier,
          credit_balance: u.credit_balance,
          created_at: u.created_at,
          role: u.role || "USER"
        });
      }

      const finCol = collection(db, "financials");
      for (const f of defaultFinancials) {
        const finRef = doc(finCol, `fin_${f.user_id}`);
        await setDoc(finRef, {
          user_id: f.user_id,
          user_email: f.user_email,
          total_revenue: f.total_revenue,
          total_api_cost: f.total_api_cost,
          net_profit: f.net_profit
        });
      }

      const logsCol = collection(db, "usage_logs");
      for (const l of defaultLogs) {
        const logRef = doc(logsCol, `log_${l.serialId}`);
        await setDoc(logRef, {
          serialId: l.serialId,
          user_id: l.user_id,
          user_email: l.user_email,
          action_type: l.action_type,
          cost: l.cost,
          created_at: l.created_at
        });
      }

      const affiliatesCol = collection(db, "affiliates");
      for (const a of defaultAffiliates) {
        await setDoc(doc(affiliatesCol, a.id), {
          name: a.name,
          email: a.email,
          signupDate: a.signupDate,
          totalReferrals: a.totalReferrals,
          totalEarnings: a.totalEarnings,
          payoutsDue: a.payoutsDue,
          status: a.status,
          payoutStatus: a.payoutStatus,
          trafficSource: a.trafficSource,
          paymentMethod: a.paymentMethod || "",
          paymentDetail: a.paymentDetail || "",
          paymentSaved: a.paymentSaved || false
        });
      }

      const referralsCol = collection(db, "referrals");
      const seededRefs = generateDefaultReferrals();
      for (const r of seededRefs) {
        await setDoc(doc(referralsCol, r.id), {
          affiliateId: r.affiliateId,
          customerEmail: r.customerEmail,
          revenue: r.revenue,
          commission: r.commission,
          createdAt: r.createdAt,
          status: r.status
        });
      }
      
      console.log("[Firebase Seeder] Seeding completed successfully!");
    }
  } catch (err) {
    console.warn("[Firebase Seeder] Permission restricted or offline. Database seed falling back to LocalStorage.", err);
    // Ensure localStorage has data
    getLocalUsers();
    getLocalFinancials();
    getLocalLogs();
    getLocalAffiliates();
    getLocalReferrals();
  }
}

// -----------------------------------------------------------------------------
// Database Operations with Automatic Failover
// -----------------------------------------------------------------------------

// USERS TABLE API
export async function getUsers(): Promise<DbUser[]> {
  try {
    const usersCol = collection(db, "users");
    const q = query(usersCol, orderBy("serialId", "asc"));
    const snapshot = await getDocs(q);
    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as DbUser));
    
    if (users.length > 0) {
      saveLocalUsers(users);
    }
    return users.length > 0 ? users : getLocalUsers();
  } catch (err) {
    console.warn("[Firebase] Falling back to LocalStorage for getUsers", err);
    return getLocalUsers();
  }
}

export async function createUser(email: string, whopCustomerId: string, subscriptionTier: string): Promise<DbUser> {
  const users = await getUsers();
  const nextSerialId = users.reduce((max, u) => Math.max(max, u.serialId), 0) + 1;
  const newUser: Omit<DbUser, "id"> = {
    serialId: nextSerialId,
    email,
    whop_customer_id: whopCustomerId || `whop_cust_${Math.random().toString(36).substring(2, 6)}`,
    subscription_tier: subscriptionTier,
    credit_balance: subscriptionTier === "Enterprise" ? 150.00 : subscriptionTier === "Pro" ? 50.00 : 5.00,
    created_at: new Date().toISOString(),
    role: "USER"
  };

  try {
    const usersCol = collection(db, "users");
    const docRef = await addDoc(usersCol, newUser);
    
    // Create associated financials row
    const finCol = collection(db, "financials");
    const initialRevenue = subscriptionTier === "Pro" ? 29.00 : subscriptionTier === "Enterprise" ? 199.00 : 0.00;
    const newFinancials = {
      user_id: nextSerialId,
      user_email: email,
      total_revenue: initialRevenue,
      total_api_cost: 0.0,
      net_profit: initialRevenue
    };
    await setDoc(doc(finCol, `fin_${nextSerialId}`), newFinancials);

    // Log usage action
    await createUsageLog(nextSerialId, email, "Account Registered / Subscribed", 0.0);

    const created = {
      id: docRef.id,
      ...newUser
    };
    
    // Sync local
    const localUsers = getLocalUsers();
    localUsers.push(created);
    saveLocalUsers(localUsers);

    return created;
  } catch (err) {
    console.warn("[Firebase] Falling back to LocalStorage for createUser", err);
    
    const createdId = `user_${nextSerialId}`;
    const created: DbUser = {
      id: createdId,
      ...newUser
    };

    const localUsers = getLocalUsers();
    localUsers.push(created);
    saveLocalUsers(localUsers);

    // Associated financials
    const localFins = getLocalFinancials();
    const initialRevenue = subscriptionTier === "Pro" ? 29.00 : subscriptionTier === "Enterprise" ? 199.00 : 0.00;
    localFins.push({
      id: `fin_${nextSerialId}`,
      user_id: nextSerialId,
      user_email: email,
      total_revenue: initialRevenue,
      total_api_cost: 0.0,
      net_profit: initialRevenue
    });
    saveLocalFinancials(localFins);

    // Usage log
    const localLogs = getLocalLogs();
    localLogs.unshift({
      id: `log_${localLogs.length + 1}`,
      serialId: localLogs.length + 1,
      user_id: nextSerialId,
      user_email: email,
      action_type: "Account Registered / Subscribed (Local)",
      cost: 0.0,
      created_at: new Date().toISOString()
    });
    saveLocalLogs(localLogs);

    return created;
  }
}

export async function updateUser(id: string, serialId: number, email: string, whopCustomerId: string, subscriptionTier: string) {
  try {
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, {
      email,
      whop_customer_id: whopCustomerId,
      subscription_tier: subscriptionTier
    });

    const finRef = doc(db, "financials", `fin_${serialId}`);
    await updateDoc(finRef, {
      user_email: email
    }).catch(() => {});
  } catch (err) {
    console.warn("[Firebase] Falling back to LocalStorage for updateUser", err);
  }

  // Always update local cache
  const localUsers = getLocalUsers();
  const updatedUsers = localUsers.map(u => u.serialId === serialId ? {
    ...u,
    email,
    whop_customer_id: whopCustomerId,
    subscription_tier: subscriptionTier
  } : u);
  saveLocalUsers(updatedUsers);

  const localFins = getLocalFinancials();
  const updatedFins = localFins.map(f => f.user_id === serialId ? { ...f, user_email: email } : f);
  saveLocalFinancials(updatedFins);
}

export async function deleteUser(id: string, serialId: number) {
  try {
    await deleteDoc(doc(db, "users", id));
    await deleteDoc(doc(db, "financials", `fin_${serialId}`)).catch(() => {});
  } catch (err) {
    console.warn("[Firebase] Falling back to LocalStorage for deleteUser", err);
  }

  // Always delete in local cache
  const localUsers = getLocalUsers().filter(u => u.serialId !== serialId);
  saveLocalUsers(localUsers);

  const localFins = getLocalFinancials().filter(f => f.user_id !== serialId);
  saveLocalFinancials(localFins);
}

// FINANCIALS TABLE API
export async function getFinancials(): Promise<DbFinancials[]> {
  try {
    const finCol = collection(db, "financials");
    const q = query(finCol, orderBy("user_id", "asc"));
    const snapshot = await getDocs(q);
    const financials = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as DbFinancials));

    if (financials.length > 0) {
      saveLocalFinancials(financials);
    }
    return financials.length > 0 ? financials : getLocalFinancials();
  } catch (err) {
    console.warn("[Firebase] Falling back to LocalStorage for getFinancials", err);
    return getLocalFinancials();
  }
}

export async function updateFinancials(userId: number, totalRevenue: number, totalApiCost: number) {
  const netProfit = totalRevenue - totalApiCost;
  try {
    const finRef = doc(db, "financials", `fin_${userId}`);
    await updateDoc(finRef, {
      total_revenue: totalRevenue,
      total_api_cost: totalApiCost,
      net_profit: netProfit
    });
  } catch (err) {
    console.warn("[Firebase] Falling back to LocalStorage for updateFinancials", err);
  }

  const localFins = getLocalFinancials();
  const updatedFins = localFins.map(f => f.user_id === userId ? {
    ...f,
    total_revenue: totalRevenue,
    total_api_cost: totalApiCost,
    net_profit: netProfit
  } : f);
  saveLocalFinancials(updatedFins);
}

// USAGE LOGS TABLE API
export async function getUsageLogs(): Promise<DbUsageLog[]> {
  try {
    const logsCol = collection(db, "usage_logs");
    const q = query(logsCol, orderBy("created_at", "desc"));
    const snapshot = await getDocs(q);
    const logs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as DbUsageLog));

    if (logs.length > 0) {
      saveLocalLogs(logs);
    }
    return logs.length > 0 ? logs : getLocalLogs();
  } catch (err) {
    console.warn("[Firebase] Falling back to LocalStorage for getUsageLogs", err);
    return getLocalLogs();
  }
}

export async function createUsageLog(userId: number, userEmail: string, actionType: string, cost: number): Promise<DbUsageLog> {
  const localLogs = getLocalLogs();
  const nextSerialId = localLogs.length + 1;

  const newLog: Omit<DbUsageLog, "id"> = {
    serialId: nextSerialId,
    user_id: userId,
    user_email: userEmail,
    action_type: actionType,
    cost,
    created_at: new Date().toISOString()
  };

  try {
    const logsCol = collection(db, "usage_logs");
    const docRef = await addDoc(logsCol, newLog);

    // Automatically increment the user's total api cost in the financials record
    const finSnapshot = await getDocs(query(collection(db, "financials")));
    const userFinDoc = finSnapshot.docs.find(d => d.data().user_id === userId);
    
    if (userFinDoc) {
      const data = userFinDoc.data();
      const newApiCost = (data.total_api_cost || 0) + cost;
      const newRevenue = data.total_revenue || 0;
      await updateDoc(doc(db, "financials", userFinDoc.id), {
        total_api_cost: newApiCost,
        net_profit: newRevenue - newApiCost
      });
    }

    const created = {
      id: docRef.id,
      ...newLog
    };

    localLogs.unshift(created);
    saveLocalLogs(localLogs);

    return created;
  } catch (err) {
    console.warn("[Firebase] Falling back to LocalStorage for createUsageLog", err);
    const created: DbUsageLog = {
      id: `log_${nextSerialId}`,
      ...newLog
    };

    localLogs.unshift(created);
    saveLocalLogs(localLogs);

    // Associated financials increment
    const localFins = getLocalFinancials();
    const updatedFins = localFins.map(f => {
      if (f.user_id === userId) {
        const newCost = f.total_api_cost + cost;
        return {
          ...f,
          total_api_cost: newCost,
          net_profit: f.total_revenue - newCost
        };
      }
      return f;
    });
    saveLocalFinancials(updatedFins);

    return created;
  }
}

// Manual Whop Sync and Payment Update
export async function syncWhopPayment(email: string, amount: number) {
  const users = await getUsers();
  let user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  let userId;
  let currentCredit = 0;

  if (!user) {
    user = await createUser(email, `whop_cust_${Math.random().toString(36).substring(2, 6)}`, amount >= 199 ? "Enterprise" : "Pro");
    userId = user.serialId;
    currentCredit = 0;
  } else {
    userId = user.serialId;
    currentCredit = user.credit_balance || 0;
  }

  const creditIncrement = amount / 10;
  const newCreditBalance = currentCredit + creditIncrement;

  try {
    // Try updating users in Firestore
    const usersCol = collection(db, "users");
    const snapshot = await getDocs(query(usersCol));
    const userDoc = snapshot.docs.find(d => d.data().email.toLowerCase() === email.toLowerCase());
    if (userDoc) {
      await updateDoc(doc(db, "users", userDoc.id), {
        credit_balance: newCreditBalance
      });
    }

    const finSnapshot = await getDocs(query(collection(db, "financials")));
    const userFinDoc = finSnapshot.docs.find(d => d.data().user_id === userId);

    if (userFinDoc) {
      const data = userFinDoc.data();
      const newRevenue = (data.total_revenue || 0) + amount;
      const apiCost = data.total_api_cost || 0;
      await updateDoc(doc(db, "financials", userFinDoc.id), {
        total_revenue: newRevenue,
        net_profit: newRevenue - apiCost
      });
    } else {
      const finCol = collection(db, "financials");
      await setDoc(doc(finCol, `fin_${userId}`), {
        user_id: userId,
        user_email: email,
        total_revenue: amount,
        total_api_cost: 0.0,
        net_profit: amount
      });
    }
  } catch (err) {
    console.warn("[Firebase] Falling back to LocalStorage for syncWhopPayment", err);
  }

  // Sync to local state
  const localUsers = getLocalUsers();
  const updatedUsers = localUsers.map(u => u.serialId === userId ? {
    ...u,
    credit_balance: newCreditBalance
  } : u);
  saveLocalUsers(updatedUsers);

  const localFins = getLocalFinancials();
  let finExists = false;
  const updatedFins = localFins.map(f => {
    if (f.user_id === userId) {
      finExists = true;
      const newRev = f.total_revenue + amount;
      return {
        ...f,
        total_revenue: newRev,
        net_profit: newRev - f.total_api_cost
      };
    }
    return f;
  });
  if (!finExists) {
    updatedFins.push({
      id: `fin_${userId}`,
      user_id: userId,
      user_email: email,
      total_revenue: amount,
      total_api_cost: 0.0,
      net_profit: amount
    });
  }
  saveLocalFinancials(updatedFins);

  await createUsageLog(userId, email, `Manual Whop Payment Synced (+$${amount.toFixed(2)})`, 0.0);

  return {
    userId,
    newCreditBalance,
    amountSynced: amount
  };
}

// Autopilot Whop Webhook Handler for automated payment.succeeded events
export async function processWhopWebhookPayment(email: string, amount: number) {
  const users = await getUsers();
  let user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  let userId;
  let currentCredit = 0;

  if (!user) {
    user = await createUser(email, `whop_cust_${Math.random().toString(36).substring(2, 6)}`, amount >= 199 ? "Enterprise" : "Pro");
    userId = user.serialId;
    currentCredit = 0;
  } else {
    userId = user.serialId;
    currentCredit = user.credit_balance || 0;
  }

  const creditIncrement = amount / 10;
  const newCreditBalance = currentCredit + creditIncrement;

  try {
    const usersCol = collection(db, "users");
    const snapshot = await getDocs(query(usersCol));
    const userDoc = snapshot.docs.find(d => d.data().email.toLowerCase() === email.toLowerCase());
    if (userDoc) {
      await updateDoc(doc(db, "users", userDoc.id), {
        credit_balance: newCreditBalance
      });
    }

    const finSnapshot = await getDocs(query(collection(db, "financials")));
    const userFinDoc = finSnapshot.docs.find(d => d.data().user_id === userId);

    if (userFinDoc) {
      const data = userFinDoc.data();
      const newRevenue = (data.total_revenue || 0) + amount;
      const apiCost = data.total_api_cost || 0;
      await updateDoc(doc(db, "financials", userFinDoc.id), {
        total_revenue: newRevenue,
        net_profit: newRevenue - apiCost
      });
    } else {
      const finCol = collection(db, "financials");
      await setDoc(doc(finCol, `fin_${userId}`), {
        user_id: userId,
        user_email: email,
        total_revenue: amount,
        total_api_cost: 0.0,
        net_profit: amount
      });
    }
  } catch (err) {
    console.warn("[Firebase] Falling back to LocalStorage for processWhopWebhookPayment", err);
  }

  // Sync to local state
  const localUsers = getLocalUsers();
  const updatedUsers = localUsers.map(u => u.serialId === userId ? {
    ...u,
    credit_balance: newCreditBalance
  } : u);
  saveLocalUsers(updatedUsers);

  const localFins = getLocalFinancials();
  let finExists = false;
  const updatedFins = localFins.map(f => {
    if (f.user_id === userId) {
      finExists = true;
      const newRev = f.total_revenue + amount;
      return {
        ...f,
        total_revenue: newRev,
        net_profit: newRev - f.total_api_cost
      };
    }
    return f;
  });
  if (!finExists) {
    updatedFins.push({
      id: `fin_${userId}`,
      user_id: userId,
      user_email: email,
      total_revenue: amount,
      total_api_cost: 0.0,
      net_profit: amount
    });
  }
  saveLocalFinancials(updatedFins);

  await createUsageLog(userId, email, "WHOP_SYNC_SUCCESS", 0.0);

  return {
    userId,
    creditIncrement,
    newCreditBalance,
    amountSynced: amount
  };
}

// Admin emails list for credit deduction bypass
const ADMIN_EMAILS: string[] = ["noamazar84@gmail.com"];

// Real-time API Credit Deduction Helper with Section 1-F Overage Billing & Section 1-E Real-time Realized Profit
export async function deductUserCredits(
  email: string,
  costInDollars: number,
  creditsToDeduct?: number,
  duration?: number,
  engineType?: string
) {
  if (email && ADMIN_EMAILS.map(e => e.toLowerCase()).includes(email.trim().toLowerCase())) {
    console.log(`[Admin Bypass] Bypassing credit deduction for admin email: ${email}`);
    return {
      overageApplied: false,
      overageCharge: 0,
      adminBypass: true
    };
  }

  const users = await getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    throw new Error(`User with email "${email}" not found.`);
  }

  const currentCredit = user.credit_balance || 0;
  
  // Determine deduction amount based on 'Engine Type' checking
  let deduction = 1;
  const resolvedEngineType = engineType || (duration && duration >= 120 ? "long_form" : "shorts");

  if (resolvedEngineType === "long_form") {
    const activeDuration = duration || 60;
    deduction = Math.ceil(activeDuration / 60);
  } else if (resolvedEngineType === "shorts") {
    deduction = 1;
  } else {
    // Fallback/backward compatibility logic
    if (creditsToDeduct !== undefined) {
      deduction = creditsToDeduct;
    } else {
      deduction = costInDollars / 10;
    }
  }

  let newCreditBalance = currentCredit;
  let overageApplied = false;
  let overageCharge = 0.0;

  if (currentCredit >= deduction) {
    newCreditBalance = currentCredit - deduction;
  } else {
    // Section 1-F: Overage Billing ($0.06 per unit)
    const missingCredits = deduction - currentCredit;
    overageApplied = true;
    overageCharge = missingCredits * 0.06;
    newCreditBalance = 0;
  }

  try {
    const usersCol = collection(db, "users");
    const snapshot = await getDocs(query(usersCol));
    const userDoc = snapshot.docs.find(d => d.data().email.toLowerCase() === email.toLowerCase());
    if (userDoc) {
      await updateDoc(doc(db, "users", userDoc.id), {
        credit_balance: newCreditBalance
      });
    }
  } catch (err) {
    console.warn("[Firebase] Falling back to LocalStorage for deductUserCredits", err);
  }

  // Always update local cache
  const localUsers = getLocalUsers();
  const updatedUsers = localUsers.map(u => u.email.toLowerCase() === email.toLowerCase() ? {
    ...u,
    credit_balance: newCreditBalance
  } : u);
  saveLocalUsers(updatedUsers);

  // Update financials record: add costInDollars to total_api_cost, and overageCharge to total_revenue
  let newRevenue = 0.0;
  let newApiCost = 0.0;
  let netProfit = 0.0;

  try {
    const finCol = collection(db, "financials");
    const finSnapshot = await getDocs(query(finCol));
    const userFinDoc = finSnapshot.docs.find(d => d.data().user_id === user.serialId);

    if (userFinDoc) {
      const data = userFinDoc.data();
      newRevenue = (data.total_revenue || 0) + overageCharge;
      newApiCost = (data.total_api_cost || 0) + costInDollars;
      // 1-E: Real-time realized profit calculation
      netProfit = newRevenue - newApiCost;
      
      await updateDoc(doc(db, "financials", userFinDoc.id), {
        total_revenue: newRevenue,
        total_api_cost: newApiCost,
        net_profit: netProfit
      });
    } else {
      newRevenue = overageCharge;
      newApiCost = costInDollars;
      netProfit = newRevenue - newApiCost;
      
      await setDoc(doc(finCol, `fin_${user.serialId}`), {
        user_id: user.serialId,
        user_email: email,
        total_revenue: newRevenue,
        total_api_cost: newApiCost,
        net_profit: netProfit
      });
    }
  } catch (err) {
    console.warn("[Firebase] Falling back to LocalStorage for financials update in deductUserCredits", err);
  }

  // Sync to local financials cache
  const localFins = getLocalFinancials();
  let finExists = false;
  const updatedFins = localFins.map(f => {
    if (f.user_id === user.serialId) {
      finExists = true;
      newRevenue = f.total_revenue + overageCharge;
      newApiCost = f.total_api_cost + costInDollars;
      netProfit = newRevenue - newApiCost;
      return {
        ...f,
        total_revenue: newRevenue,
        total_api_cost: newApiCost,
        net_profit: netProfit
      };
    }
    return f;
  });

  if (!finExists) {
    newRevenue = overageCharge;
    newApiCost = costInDollars;
    netProfit = newRevenue - newApiCost;
    updatedFins.push({
      id: `fin_${user.serialId}`,
      user_id: user.serialId,
      user_email: email,
      total_revenue: newRevenue,
      total_api_cost: newApiCost,
      net_profit: netProfit
    });
  }
  saveLocalFinancials(updatedFins);

  return {
    newCreditBalance,
    overageApplied,
    overageCharge,
    realizedProfit: netProfit,
    totalRevenue: newRevenue,
    totalApiCost: newApiCost
  };
}

// Purchase DM Automation Add-On credits and sync to database and financials
export async function purchaseDMAutomationAddOn(email: string, creditsToAdd: number, costInDollars: number) {
  const users = await getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    throw new Error(`User with email "${email}" not found.`);
  }

  const currentCredit = user.credit_balance || 0;
  const newCreditBalance = currentCredit + creditsToAdd;

  try {
    const usersCol = collection(db, "users");
    const snapshot = await getDocs(query(usersCol));
    const userDoc = snapshot.docs.find(d => d.data().email.toLowerCase() === email.toLowerCase());
    if (userDoc) {
      await updateDoc(doc(db, "users", userDoc.id), {
        credit_balance: newCreditBalance
      });
    }
  } catch (err) {
    console.warn("[Firebase] Falling back to LocalStorage for purchaseDMAutomationAddOn", err);
  }

  // Always update local cache
  const localUsers = getLocalUsers();
  const updatedUsers = localUsers.map(u => u.email.toLowerCase() === email.toLowerCase() ? {
    ...u,
    credit_balance: newCreditBalance
  } : u);
  saveLocalUsers(updatedUsers);

  // Update financials record: add costInDollars to total_revenue
  let newRevenue = 0.0;
  let newApiCost = 0.0;
  let netProfit = 0.0;

  try {
    const finCol = collection(db, "financials");
    const finSnapshot = await getDocs(query(finCol));
    const userFinDoc = finSnapshot.docs.find(d => d.data().user_id === user.serialId);

    if (userFinDoc) {
      const data = userFinDoc.data();
      newRevenue = (data.total_revenue || 0) + costInDollars;
      newApiCost = data.total_api_cost || 0;
      netProfit = newRevenue - newApiCost;
      
      await updateDoc(doc(db, "financials", userFinDoc.id), {
        total_revenue: newRevenue,
        net_profit: netProfit
      });
    } else {
      newRevenue = costInDollars;
      newApiCost = 0;
      netProfit = newRevenue - newApiCost;
      
      await setDoc(doc(finCol, `fin_${user.serialId}`), {
        user_id: user.serialId,
        user_email: email,
        total_revenue: newRevenue,
        total_api_cost: newApiCost,
        net_profit: netProfit
      });
    }
  } catch (err) {
    console.warn("[Firebase] Falling back to LocalStorage for financials update in purchaseDMAutomationAddOn", err);
  }

  // Sync to local financials cache
  const localFins = getLocalFinancials();
  let finExists = false;
  const updatedFins = localFins.map(f => {
    if (f.user_id === user.serialId) {
      finExists = true;
      newRevenue = f.total_revenue + costInDollars;
      newApiCost = f.total_api_cost;
      netProfit = newRevenue - newApiCost;
      return {
        ...f,
        total_revenue: newRevenue,
        net_profit: netProfit
      };
    }
    return f;
  });

  if (!finExists) {
    newRevenue = costInDollars;
    newApiCost = 0;
    netProfit = newRevenue - newApiCost;
    updatedFins.push({
      id: `fin_${user.serialId}`,
      user_id: user.serialId,
      user_email: email,
      total_revenue: newRevenue,
      total_api_cost: newApiCost,
      net_profit: netProfit
    });
  }
  saveLocalFinancials(updatedFins);

  // Log usage log for the add-on purchase
  try {
    await createUsageLog(user.serialId, email, `DM Add-On Purchase ($${costInDollars})`, -costInDollars);
  } catch (err) {
    console.warn("[Firebase] Failed to create usage log for add-on purchase:", err);
  }

  return {
    newCreditBalance,
    totalRevenue: newRevenue
  };
}

// Upgrade user subscription tier instantly within the sandbox environment
export async function upgradeUserTier(email: string, newTier: string) {
  const users = await getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    throw new Error(`User with email "${email}" not found.`);
  }
  
  // Find Doc ID from firestore
  try {
    const usersCol = collection(db, "users");
    const snapshot = await getDocs(query(usersCol));
    const userDoc = snapshot.docs.find(d => d.data().email.toLowerCase() === email.toLowerCase());
    if (userDoc) {
      await updateDoc(doc(db, "users", userDoc.id), {
        subscription_tier: newTier
      });
    }
  } catch (err) {
    console.warn("[Firebase] Falling back to LocalStorage for upgradeUserTier", err);
  }

  // Update local cache
  const localUsers = getLocalUsers();
  const updatedUsers = localUsers.map(u => u.email.toLowerCase() === email.toLowerCase() ? {
    ...u,
    subscription_tier: newTier
  } : u);
  saveLocalUsers(updatedUsers);

  // Log usage log
  try {
    await createUsageLog(user.serialId, email, `Tier Upgrade to ${newTier}`, 0);
  } catch (e) {}

  return { success: true, tier: newTier };
}

// Section 1-B, 1-E, 1-F: Unified Regenerate credit deduction (1:1) & Overage Billing ($0.06 per unit)
export async function handleRegenerateBilling(email: string, duration = 60, engineType?: string) {
  const users = await getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    throw new Error(`User with email "${email}" not found.`);
  }

  const currentCredit = user.credit_balance || 0;
  let newCreditBalance = currentCredit;
  let overageApplied = false;
  let overageCharge = 0.0;
  let description = "";

  // Check 'Engine Type' before applying the calculation formula
  const resolvedEngineType = engineType || (duration >= 120 ? "long_form" : "shorts");
  const creditsToDeduct = resolvedEngineType === "long_form" ? Math.ceil(duration / 60) : 1;

  // 1-B: 'Regenerate' credit deduction logic (1:1 per unit credit, linked to video duration)
  if (currentCredit >= creditsToDeduct) {
    newCreditBalance = currentCredit - creditsToDeduct;
    description = `Regenerate Script (Deducted ${creditsToDeduct} Credits for ${resolvedEngineType === "long_form" ? (duration / 60) + "m" : duration + "s"} video)`;
  } else {
    // 1-F: 'Overage Billing' interaction logic ($0.06 per unit)
    const missingCredits = creditsToDeduct - currentCredit;
    overageApplied = true;
    overageCharge = missingCredits * 0.06;
    newCreditBalance = 0;
    description = `Regenerate Script (Overage Billing Charged $${overageCharge.toFixed(2)} for ${missingCredits} missing credits, ${resolvedEngineType === "long_form" ? (duration / 60) + "m" : duration + "s"} video)`;
  }

  // Update user's credit balance in database
  try {
    const usersCol = collection(db, "users");
    const snapshot = await getDocs(query(usersCol));
    const userDoc = snapshot.docs.find(d => d.data().email.toLowerCase() === email.toLowerCase());
    if (userDoc) {
      await updateDoc(doc(db, "users", userDoc.id), {
        credit_balance: newCreditBalance
      });
    }
  } catch (err) {
    console.warn("[Firebase] Falling back to LocalStorage for user credit update", err);
  }

  // Always update local cache for users
  const localUsers = getLocalUsers();
  const updatedUsers = localUsers.map(u => u.email.toLowerCase() === email.toLowerCase() ? {
    ...u,
    credit_balance: newCreditBalance
  } : u);
  saveLocalUsers(updatedUsers);

  // Update financials record: 
  // If overage applied, we increase platform's total_revenue by $0.06
  // Also, add standard API cost ($0.0015) to total_api_cost
  const apiCost = 0.0015;
  let newRevenue = 0.0;
  let newApiCost = 0.0;
  let netProfit = 0.0;

  try {
    const finCol = collection(db, "financials");
    const finSnapshot = await getDocs(query(finCol));
    const userFinDoc = finSnapshot.docs.find(d => d.data().user_id === user.serialId);

    if (userFinDoc) {
      const data = userFinDoc.data();
      newRevenue = (data.total_revenue || 0) + overageCharge;
      newApiCost = (data.total_api_cost || 0) + apiCost;
      // 1-E: 'Realized Profit' calculation logic (real-time)
      netProfit = newRevenue - newApiCost;
      
      await updateDoc(doc(db, "financials", userFinDoc.id), {
        total_revenue: newRevenue,
        total_api_cost: newApiCost,
        net_profit: netProfit
      });
    } else {
      newRevenue = overageCharge;
      newApiCost = apiCost;
      netProfit = newRevenue - newApiCost;
      
      await setDoc(doc(finCol, `fin_${user.serialId}`), {
        user_id: user.serialId,
        user_email: email,
        total_revenue: newRevenue,
        total_api_cost: newApiCost,
        net_profit: netProfit
      });
    }
  } catch (err) {
    console.warn("[Firebase] Falling back to LocalStorage for financials update", err);
  }

  // Always sync to local financials cache
  const localFins = getLocalFinancials();
  let finExists = false;
  const updatedFins = localFins.map(f => {
    if (f.user_id === user.serialId) {
      finExists = true;
      newRevenue = f.total_revenue + overageCharge;
      newApiCost = f.total_api_cost + apiCost;
      netProfit = newRevenue - newApiCost;
      return {
        ...f,
        total_revenue: newRevenue,
        total_api_cost: newApiCost,
        net_profit: netProfit
      };
    }
    return f;
  });

  if (!finExists) {
    newRevenue = overageCharge;
    newApiCost = apiCost;
    netProfit = newRevenue - newApiCost;
    updatedFins.push({
      id: `fin_${user.serialId}`,
      user_id: user.serialId,
      user_email: email,
      total_revenue: newRevenue,
      total_api_cost: newApiCost,
      net_profit: netProfit
    });
  }
  saveLocalFinancials(updatedFins);

  // Log usage activity in usage_logs
  await createUsageLog(user.serialId, email, description, apiCost);

  return {
    success: true,
    email,
    previousCredit: currentCredit,
    newCreditBalance,
    overageApplied,
    overageCharge,
    realizedProfit: netProfit,
    totalRevenue: newRevenue,
    totalApiCost: newApiCost
  };
}

// -----------------------------------------------------------------------------
// Lead Generation / Exit Intent Email Capture
// -----------------------------------------------------------------------------
export async function saveLeadEmail(email: string): Promise<{ success: boolean; message: string }> {
  try {
    const leadsCol = collection(db, "leads");
    await addDoc(leadsCol, {
      email,
      created_at: new Date().toISOString()
    });
    console.log(`[Firebase] Lead email ${email} successfully written to Firestore 'leads' collection.`);
  } catch (err) {
    console.warn("[Firebase] Falling back to LocalStorage for saving lead email", err);
  }

  // Fallback to LocalStorage
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    try {
      const fallbackLeads = localStorage.getItem("viralflow_fallback_leads");
      const currentLeads = fallbackLeads ? JSON.parse(fallbackLeads) : [];
      currentLeads.push({
        email,
        created_at: new Date().toISOString()
      });
      localStorage.setItem("viralflow_fallback_leads", JSON.stringify(currentLeads));
    } catch (localStorageErr) {
      console.warn("[LocalStorage] Failed to save fallback lead:", localStorageErr);
    }
  } else {
    console.log(`[Server Offline Fallback] Captured lead email: ${email}`);
  }


  return { success: true, message: "Lead captured successfully" };
}

// -----------------------------------------------------------------------------
// Affiliate Engine & Referrals DB Management
// -----------------------------------------------------------------------------
const LOCAL_AFFILIATES_KEY = "viralflow_fallback_affiliates";
const LOCAL_REFERRALS_KEY = "viralflow_fallback_referrals";

export const defaultAffiliates: DbAffiliate[] = [
  {
    id: "aff_1",
    name: "Jordan Sparks",
    email: "jordan@sparksmedia.io",
    signupDate: "2026-05-12",
    totalReferrals: 118,
    totalEarnings: 4280.00,
    payoutsDue: 150.00,
    status: "Active",
    payoutStatus: "Unpaid",
    trafficSource: "YouTube Channel",
    paymentMethod: "paypal",
    paymentDetail: "jordan@sparksmedia.io",
    paymentSaved: true
  },
  {
    id: "aff_2",
    name: "Taylor Swift",
    email: "taylor@swiftscripts.com",
    signupDate: "2026-05-20",
    totalReferrals: 55,
    totalEarnings: 1925.00,
    payoutsDue: 0.00,
    status: "Active",
    payoutStatus: "Paid",
    trafficSource: "TikTok Creator Pool",
    paymentMethod: "stripe",
    paymentDetail: "acct_1Swift",
    paymentSaved: true
  },
  {
    id: "aff_3",
    name: "Morgan Lee",
    email: "morgan.lee@faceless.net",
    signupDate: "2026-06-01",
    totalReferrals: 8,
    totalEarnings: 280.00,
    payoutsDue: 280.00,
    status: "Pending",
    payoutStatus: "Unpaid",
    trafficSource: "Instagram DM Automation",
    paymentMethod: "wise",
    paymentDetail: "morgan@faceless.net",
    paymentSaved: true
  },
  {
    id: "aff_4",
    name: "Casey Miller",
    email: "casey@scamclick.com",
    signupDate: "2026-06-15",
    totalReferrals: 152,
    totalEarnings: 5320.00,
    payoutsDue: 5320.00,
    status: "Suspended",
    payoutStatus: "Unpaid",
    trafficSource: "Reddit spam bot net",
    paymentMethod: "",
    paymentDetail: "",
    paymentSaved: false
  }
];

export function generateDefaultReferrals(): DbReferral[] {
  const refs: DbReferral[] = [];
  
  // Jordan Sparks (aff_1): total Referrals 118, total Earnings 4280.00, payouts due 150.00
  // 115 paid referrals of $71.826 each (com = $35.913)
  for (let i = 0; i < 115; i++) {
    refs.push({
      id: `ref_1_paid_${i}`,
      affiliateId: "aff_1",
      customerEmail: `spark_customer_${i}@gmail.com`,
      revenue: 71.826,
      commission: 35.913,
      createdAt: new Date(Date.now() - (20 - (i % 20)) * 24 * 60 * 60 * 1000).toISOString(),
      status: "Paid",
      userSource: "YouTube Channel",
      netProfit: 71.826 * 0.5
    });
  }
  // 3 unpaid referrals of $100.00 each (com = $50.00)
  for (let i = 0; i < 3; i++) {
    refs.push({
      id: `ref_1_unpaid_${i}`,
      affiliateId: "aff_1",
      customerEmail: `spark_unpaid_${i}@gmail.com`,
      revenue: 100.00,
      commission: 50.00,
      createdAt: new Date(Date.now() - i * 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: "Unpaid",
      userSource: "YouTube Channel",
      netProfit: 100.00 * 0.5
    });
  }

  // Taylor Swift (aff_2): total Referrals 55, total Earnings 1925.00, payouts due 0
  for (let i = 0; i < 55; i++) {
    refs.push({
      id: `ref_2_paid_${i}`,
      affiliateId: "aff_2",
      customerEmail: `swift_customer_${i}@swift.com`,
      revenue: 70.00,
      commission: 35.00,
      createdAt: new Date(Date.now() - (15 - (i % 15)) * 24 * 60 * 60 * 1000).toISOString(),
      status: "Paid",
      userSource: "TikTok Creator Pool",
      netProfit: 70.00 * 0.5
    });
  }

  // Morgan Lee (aff_3): total Referrals 8, total Earnings 280.00, payouts due 280.00
  for (let i = 0; i < 8; i++) {
    refs.push({
      id: `ref_3_unpaid_${i}`,
      affiliateId: "aff_3",
      customerEmail: `morgan_customer_${i}@lee.com`,
      revenue: 70.00,
      commission: 35.00,
      createdAt: new Date(Date.now() - i * 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: "Unpaid",
      userSource: "Instagram DM Automation",
      netProfit: 70.00 * 0.5
    });
  }

  // Casey Miller (aff_4): total Referrals 152, total Earnings 5320.00, payouts due 5320.00
  for (let i = 0; i < 152; i++) {
    refs.push({
      id: `ref_4_unpaid_${i}`,
      affiliateId: "aff_4",
      customerEmail: `casey_customer_${i}@scam.com`,
      revenue: 70.00,
      commission: 35.00,
      createdAt: new Date(Date.now() - (30 - (i % 30)) * 24 * 60 * 60 * 1000).toISOString(),
      status: "Unpaid",
      userSource: "Reddit spam bot net",
      netProfit: 70.00 * 0.5
    });
  }

  return refs;
}

export function getLocalAffiliates(): DbAffiliate[] {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(LOCAL_AFFILIATES_KEY);
    if (data) return JSON.parse(data);
    localStorage.setItem(LOCAL_AFFILIATES_KEY, JSON.stringify(defaultAffiliates));
    return defaultAffiliates;
  }
  return defaultAffiliates;
}

export function saveLocalAffiliates(affiliates: DbAffiliate[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_AFFILIATES_KEY, JSON.stringify(affiliates));
  }
}

export function getLocalReferrals(): DbReferral[] {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(LOCAL_REFERRALS_KEY);
    if (data) return JSON.parse(data);
    const defRefs = generateDefaultReferrals();
    localStorage.setItem(LOCAL_REFERRALS_KEY, JSON.stringify(defRefs));
    return defRefs;
  }
  return generateDefaultReferrals();
}

export function saveLocalReferrals(referrals: DbReferral[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_REFERRALS_KEY, JSON.stringify(referrals));
  }
}

export async function getAffiliates(): Promise<DbAffiliate[]> {
  try {
    const affiliatesCol = collection(db, "affiliates");
    const snapshot = await getDocs(affiliatesCol);
    if (!snapshot.empty) {
      const list: DbAffiliate[] = [];
      snapshot.forEach(doc => {
        list.push({ id: doc.id, ...doc.data() } as DbAffiliate);
      });
      saveLocalAffiliates(list);
      return list;
    }
  } catch (err) {
    console.warn("[Firebase] Failed to fetch affiliates, using local storage fallback", err);
  }
  return getLocalAffiliates();
}

export async function getReferrals(): Promise<DbReferral[]> {
  try {
    const referralsCol = collection(db, "referrals");
    const snapshot = await getDocs(referralsCol);
    if (!snapshot.empty) {
      const list: DbReferral[] = [];
      snapshot.forEach(doc => {
        list.push({ id: doc.id, ...doc.data() } as DbReferral);
      });
      saveLocalReferrals(list);
      return list;
    }
  } catch (err) {
    console.warn("[Firebase] Failed to fetch referrals, using local storage fallback", err);
  }
  return getLocalReferrals();
}

export async function saveAffiliatesList(list: DbAffiliate[]): Promise<void> {
  saveLocalAffiliates(list);
  try {
    const affiliatesCol = collection(db, "affiliates");
    for (const a of list) {
      await setDoc(doc(affiliatesCol, a.id), {
        name: a.name,
        email: a.email,
        signupDate: a.signupDate,
        totalReferrals: a.totalReferrals,
        totalEarnings: a.totalEarnings,
        payoutsDue: a.payoutsDue,
        status: a.status,
        payoutStatus: a.payoutStatus,
        trafficSource: a.trafficSource,
        paymentMethod: a.paymentMethod || "",
        paymentDetail: a.paymentDetail || "",
        paymentSaved: a.paymentSaved || false
      });
    }
  } catch (err) {
    console.warn("[Firebase] Failed to write affiliates to Firestore, synced to local only", err);
  }
}

export async function saveReferralsList(list: DbReferral[]): Promise<void> {
  saveLocalReferrals(list);
  try {
    const referralsCol = collection(db, "referrals");
    for (const r of list) {
      await setDoc(doc(referralsCol, r.id), {
        affiliateId: r.affiliateId,
        customerEmail: r.customerEmail,
        revenue: r.revenue,
        commission: r.commission,
        createdAt: r.createdAt,
        status: r.status
      });
    }
  } catch (err) {
    console.warn("[Firebase] Failed to write referrals to Firestore, synced to local only", err);
  }
}

export async function createAffiliate(name: string, email: string, source: string): Promise<DbAffiliate> {
  const affiliates = await getAffiliates();
  const existingAff = affiliates.find(a => a.email.toLowerCase() === email.toLowerCase());
  if (existingAff) {
    return existingAff;
  }

  const id = `aff_user_${Math.random().toString(36).substring(2, 11)}`;
  const newAffiliate: DbAffiliate = {
    id,
    name,
    email,
    signupDate: new Date().toISOString().split("T")[0],
    totalReferrals: 0,
    totalEarnings: 0,
    payoutsDue: 0,
    status: "Active",
    payoutStatus: "Unpaid",
    trafficSource: source,
    paymentMethod: "",
    paymentDetail: "",
    paymentSaved: false
  };

  const updated = [newAffiliate, ...affiliates];
  await saveAffiliatesList(updated);
  return newAffiliate;
}

export async function updateAffiliateStatus(id: string, status: "Active" | "Pending" | "Suspended"): Promise<void> {
  const affiliates = await getAffiliates();
  const updated = affiliates.map(a => {
    if (a.id === id) {
      return { ...a, status };
    }
    return a;
  });
  await saveAffiliatesList(updated);
}

export async function updateAffiliatePayoutDetails(email: string, method: "paypal" | "stripe" | "wise" | "", detail: string): Promise<void> {
  const affiliates = await getAffiliates();
  const updated = affiliates.map(a => {
    if (a.email.toLowerCase() === email.toLowerCase()) {
      return { ...a, paymentMethod: method, paymentDetail: detail, paymentSaved: true };
    }
    return a;
  });
  await saveAffiliatesList(updated);
}

export async function triggerPayout(affiliateId: string): Promise<void> {
  // Update status of all unpaid referrals to Paid
  const referrals = await getReferrals();
  const updatedReferrals = referrals.map(r => {
    if (r.affiliateId === affiliateId && r.status === "Unpaid") {
      return { ...r, status: "Paid" as const, paidAt: new Date().toISOString() };
    }
    return r;
  });
  await saveReferralsList(updatedReferrals);

  // Update affiliate payout fields
  const affiliates = await getAffiliates();
  const updatedAffiliates = affiliates.map(a => {
    if (a.id === affiliateId) {
      return { ...a, payoutsDue: 0, payoutStatus: "Paid" as const };
    }
    return a;
  });
  await saveAffiliatesList(updatedAffiliates);
}

export async function trackAffiliateSale(affiliateId: string, customerEmail: string, revenue: number): Promise<void> {
  const referrals = await getReferrals();
  const id = `ref_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  
  // Rule: Automatic 50% commission split on subscription payments
  const commission = revenue * 0.5;
  const netProfit = revenue - commission;

  const affiliates = await getAffiliates();
  // Find match by ID or by custom user referral tag (e.g. partner_jordan -> aff_1)
  let matchedAff = affiliates.find(a => a.id === affiliateId);
  if (!matchedAff && affiliateId.startsWith("partner_")) {
    const pureName = affiliateId.replace("partner_", "").toLowerCase();
    matchedAff = affiliates.find(a => a.name.toLowerCase().replace(/\s+/g, "") === pureName);
  }

  const actualAffId = matchedAff ? matchedAff.id : affiliateId;
  const userSource = matchedAff ? matchedAff.trafficSource : "Direct Web Referral";

  const newReferral: DbReferral = {
    id,
    affiliateId: actualAffId,
    customerEmail,
    revenue,
    commission,
    createdAt: new Date().toISOString(),
    status: "Unpaid",
    userSource,
    netProfit
  };

  await saveReferralsList([newReferral, ...referrals]);

  // Whop API Webhook dispatch simulation logging
  console.log(`[Whop API Listener] Dispatching affiliate.event_triggered webhook. Payload:`, {
    event: "affiliate.sale_completed",
    timestamp: new Date().toISOString(),
    affiliate: matchedAff ? { id: matchedAff.id, name: matchedAff.name, email: matchedAff.email } : { id: actualAffId },
    metrics: {
      customer: customerEmail,
      gross_revenue: revenue,
      commission_payout: commission,
      calculation_rule: "50% lifetime commission split"
    }
  });
}

// -----------------------------------------------------------------------------
// DM Automation Firestore Helpers [6.ב]
// -----------------------------------------------------------------------------

export async function getDMAutomationRules(userEmail?: string): Promise<DbDMAutomationRule[]> {
  try {
    const col = collection(db, "dm_automation");
    const snapshot = await getDocs(query(col));
    const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as DbDMAutomationRule));
    if (userEmail) {
      return list.filter(r => r.user_email.toLowerCase() === userEmail.toLowerCase());
    }
    return list;
  } catch (err) {
    console.warn("[Firebase] getDMAutomationRules fallback:", err);
  }

  // Local storage fallback
  const fallback = typeof localStorage !== "undefined" ? localStorage.getItem("viralflow_fallback_dm_automation") : null;
  const list: DbDMAutomationRule[] = fallback ? JSON.parse(fallback) : [
    {
      id: "rule_1",
      user_email: "alex@creator.co",
      keyword: "SCALE",
      replyMessage: "Get 50% off ViralFlow Pro today! Use code SCALE50 at checkout.",
      enabled: true,
      triggerCount: 84,
      createdAt: new Date().toISOString()
    },
    {
      id: "rule_2",
      user_email: "sophia@viralbrands.com",
      keyword: "ECOM",
      replyMessage: "Here is your VIP link to generate high-converting e-commerce ad scripts: https://viralflow.ai/ecom",
      enabled: true,
      triggerCount: 156,
      createdAt: new Date().toISOString()
    }
  ];
  if (userEmail) {
    return list.filter(r => r.user_email.toLowerCase() === userEmail.toLowerCase());
  }
  return list;
}

export async function saveDMAutomationRule(rule: DbDMAutomationRule): Promise<void> {
  try {
    const col = collection(db, "dm_automation");
    await setDoc(doc(db, "dm_automation", rule.id), rule);
  } catch (err) {
    console.warn("[Firebase] saveDMAutomationRule fallback:", err);
  }

  // Update fallback list
  const current = await getDMAutomationRules();
  const index = current.findIndex(r => r.id === rule.id);
  if (index !== -1) {
    current[index] = rule;
  } else {
    current.push(rule);
  }
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("viralflow_fallback_dm_automation", JSON.stringify(current));
  }
}

export async function deleteDMAutomationRule(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, "dm_automation", id));
  } catch (err) {
    console.warn("[Firebase] deleteDMAutomationRule fallback:", err);
  }

  const current = await getDMAutomationRules();
  const filtered = current.filter(r => r.id !== id);
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("viralflow_fallback_dm_automation", JSON.stringify(filtered));
  }
}

// -----------------------------------------------------------------------------
// Auto-Support Tickets & AI Chatbot Helpers [6.ו]
// -----------------------------------------------------------------------------

export async function getSupportTickets(): Promise<DbSupportTicket[]> {
  try {
    const col = collection(db, "support_tickets");
    const snapshot = await getDocs(query(col));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as DbSupportTicket));
  } catch (err) {
    console.warn("[Firebase] getSupportTickets fallback:", err);
  }

  const fallback = typeof localStorage !== "undefined" ? localStorage.getItem("viralflow_fallback_tickets") : null;
  return fallback ? JSON.parse(fallback) : [
    {
      id: "tkt_1",
      fullName: "Michael Smith",
      email: "mike@ecomstores.io",
      message: "My ManyChat integration isn't triggering on my Reels. How do I fix this?",
      status: "open",
      chatbotReply: "Please verify that your Reels comment keyword matches case-sensitively in ManyChat and that you have connected the correct shadow page account.",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];
}

export async function saveSupportTicket(ticket: DbSupportTicket): Promise<void> {
  try {
    const col = collection(db, "support_tickets");
    await setDoc(doc(db, "support_tickets", ticket.id), ticket);
  } catch (err) {
    console.warn("[Firebase] saveSupportTicket fallback:", err);
  }

  const current = await getSupportTickets();
  const index = current.findIndex(t => t.id === ticket.id);
  if (index !== -1) {
    current[index] = ticket;
  } else {
    current.push(ticket);
  }
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("viralflow_fallback_tickets", JSON.stringify(current));
  }
}

// -----------------------------------------------------------------------------
// TalkToUs Enterprise Requests [6.ז]
// -----------------------------------------------------------------------------

export async function getEnterpriseRequests(): Promise<DbEnterpriseRequest[]> {
  try {
    const col = collection(db, "enterprise_requests");
    const snapshot = await getDocs(query(col));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as DbEnterpriseRequest));
  } catch (err) {
    console.warn("[Firebase] getEnterpriseRequests fallback:", err);
  }

  const fallback = typeof localStorage !== "undefined" ? localStorage.getItem("viralflow_fallback_enterprise") : null;
  return fallback ? JSON.parse(fallback) : [
    {
      id: "req_1",
      companyName: "Acme Corp Media",
      email: "contact@acme.com",
      targetVolume: 5000,
      customRequirements: "We need custom API integrations, dedicated high-volume rendering clusters, and custom ElevenLabs voice clones for our 12 brand presenters.",
      estimatedValue: 12500,
      status: "pending",
      createdAt: new Date().toISOString()
    }
  ];
}

export async function saveEnterpriseRequest(req: DbEnterpriseRequest): Promise<void> {
  try {
    const col = collection(db, "enterprise_requests");
    await setDoc(doc(db, "enterprise_requests", req.id), req);
  } catch (err) {
    console.warn("[Firebase] saveEnterpriseRequest fallback:", err);
  }

  const current = await getEnterpriseRequests();
  const index = current.findIndex(r => r.id === req.id);
  if (index !== -1) {
    current[index] = req;
  } else {
    current.push(req);
  }
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("viralflow_fallback_enterprise", JSON.stringify(current));
  }
}

