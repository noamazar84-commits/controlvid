export interface ScriptSection {
  visual: string;
  audio: string;
}

export interface ScriptResponse {
  title: string;
  hook: ScriptSection;
  body: ScriptSection;
  twist: ScriptSection;
  cta: ScriptSection;
  wordCount: number;
  targetTone: string;
  targetPlatform: string;
  viralRatingReason: string;
  hashtags: string[];
  pacingInstructions?: string;
  seoMetadata?: {
    caption: string;
    keywordInjectedTranscript: string;
    hashtagStrategy: string;
  };
}

export interface SavedScript extends ScriptResponse {
  id: string;
  topic: string;
  createdAt: string;
}

export type ScriptTone = "Controversial" | "Educational" | "Motivational" | "Humorous" | "Mysterious" | "Inspiring";

export type ShortFormPlatform = "TikTok" | "Instagram Reels" | "YouTube Shorts";

export interface DbUser {
  id: string; // Firestore Document ID
  serialId: number; // id SERIAL PRIMARY KEY
  email: string;
  whop_customer_id: string;
  subscription_tier: string;
  created_at: string;
  credit_balance?: number; // Added for manual credit tracking and whop syncing
  role?: "OWNER" | "USER" | "admin"; // Added for Role-Based Access Control (RBAC)
}

export interface DbFinancials {
  id: string; // Firestore Document ID
  user_id: number; // REFERENCES users(id)
  user_email: string;
  total_revenue: number;
  total_api_cost: number;
  net_profit: number; // total_revenue - total_api_cost
}

export interface DbUsageLog {
  id: string; // Firestore Document ID
  serialId: number; // id SERIAL PRIMARY KEY
  user_id: number; // REFERENCES users(id)
  user_email: string;
  action_type: string;
  cost: number;
  created_at: string;
}

export interface DbAffiliate {
  id: string;
  name: string;
  email: string;
  signupDate: string;
  totalReferrals: number;
  totalEarnings: number;
  payoutsDue: number;
  status: "Active" | "Pending" | "Suspended";
  payoutStatus: "Paid" | "Unpaid";
  trafficSource: string;
  paymentMethod?: "paypal" | "stripe" | "wise" | "";
  paymentDetail?: string;
  paymentSaved?: boolean;
}

export interface DbReferral {
  id: string;
  affiliateId: string;
  customerEmail: string;
  revenue: number;
  commission: number;
  createdAt: string;
  status: "Paid" | "Unpaid";
  userSource?: string;
  netProfit?: number;
}

export interface DbDMAutomationRule {
  id: string;
  user_email: string;
  keyword: string;
  replyMessage: string;
  enabled: boolean;
  triggerCount: number;
  createdAt: string;
}

export interface DbSupportTicket {
  id: string;
  fullName: string;
  email: string;
  message: string;
  status: "open" | "resolved";
  chatbotReply?: string;
  createdAt: string;
}

export interface DbEnterpriseRequest {
  id: string;
  companyName: string;
  email: string;
  targetVolume: number;
  customRequirements: string;
  estimatedValue: number;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

