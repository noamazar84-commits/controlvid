import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Layers, 
  Cpu, 
  MessageCircle, 
  FileText, 
  Rocket, 
  Volume2, 
  TrendingUp, 
  Compass, 
  DollarSign, 
  X,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Play
} from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  category: string;
  iconName: string;
  excerpt: string;
  content: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 101,
    title: "Mastering Fake Text & Story POV",
    category: "Workflow Scale",
    iconName: "FileText",
    excerpt: "Unlock the exact script structures used by top channels for Fake Text scenarios and immersive Story POV narratives to hook viewers instantly.",
    content: `Creating realistic dialogue streams is the secret behind viral texting videos and immersive first-person Story POV content. With ControlVid’s dedicated Fake Text and Story POV options within the Magic Mode engine, generating these is simpler than ever. The system automatically structures responsive chat timelines and realistic perspective stories, optimizing character pacing, emotional triggers, and dramatic pauses.

To achieve maximum retention, high-performing creators structure fake text dialogues into three phases:
1. The Hook Message: A shocking text notification delivered in the first 2 seconds that immediately forces the viewer to read.
2. The Escalation Sequence: Fast-paced back-and-forth messages that build tension, conflict, or comedic suspense.
3. The Unexpected Twist: A dramatic reveal or cliffhanger that drives massive comment section engagement.

By letting AI auto-generate character avatars, typing indicators, and sound effects, you can produce 10+ completed Fake Text shorts every single hour with zero manual editing required.`,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 102,
    title: "Split Screen Secrets",
    category: "Automation",
    iconName: "Layers",
    excerpt: "Discover how to capture modern short attention spans by pairing your narration with highly engaging visual split-screens.",
    content: `Double the visual stimuli, double the attention. Split-screen videos—such as pairing an AI narrator with satisfying kinetic gameplay or visual loops below—are dominating algorithmic feeds. ControlVid makes split-screen production seamless.

Within our engine, you can select 'Split Screen' to instantly render dual-pane media layouts. Choose from our curated catalog of high-retention background tracks or upload your own, and watch the platform sync your primary script audio with perfect sub-screen gameplay alignments automatically.

Key Split-Screen Optimization Strategies:
• Visual Contrast: Match serious or mystery narration with soothing, rhythmic bottom visuals (e.g., ASMR, cutting kinetic sand, or subway surfers).
• Caption Placement: Position primary captions directly on the horizontal dividing line so the viewer's eyes capture both panes simultaneously.
• Audio Pacing: Ensure background game sounds stay at 10-15% volume so the primary AI voiceover remains 100% crystal clear.`,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 103,
    title: "Long-form to Auto-Clips",
    category: "Workflow Scale",
    iconName: "Rocket",
    excerpt: "Learn the high-speed strategy of turning a single 10-minute master video into highly viral, automated short-form clips.",
    content: `Why settle for one upload when you can launch dozens of automated clips from a single master project? Scaling your workflow from 10-minute videos to bite-sized shorts has never been easier.

The ControlVid script engine natively supports both Long-form Video templates and a 2-10 Minute Auto-Clips parser. Simply write or import your complete master script, and our engine will dynamically slice key moments into sub-60-second segments, each complete with custom-calibrated voice talents, kinetic captions, and royalty-free soundtracks.

Repurposing Workflow Step-by-Step:
1. Master Generation: Produce a full-length 10-minute analytical or story video in Magic Mode.
2. Automated Clip Slicing: Trigger the Auto-Clips parser to extract the top 5 highest-retention hooks automatically.
3. Multi-Channel Distribution: Push the extracted clips directly to your connected Shadow Channels for maximum reach.`,
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 1,
    title: "Viral Shorts: Scaling Niche Content",
    category: "Automation",
    iconName: "Sparkles",
    excerpt: "Discover how to leverage fully autonomous hierarchical AI to generate, edit, and publish high-converting short-form videos.",
    content: `By offloading the entire creative cycle to our multi-tiered AI models, creators can deploy hundreds of niche-targeted videos in minutes. Magic Mode handles everything from raw conceptualization and high-impact hook writing to dynamic visual synthesis, custom backing music selection, and final video rendering.

This automated velocity is the ultimate hack for driving continuous algorithmic discovery on modern, fast-paced vertical feeds like TikTok, YouTube Shorts, and Instagram Reels.

Why Volume Wins in Short-Form Algorithms:
• Data Acceleration: Publishing 3-5 shorts per day provides 10x faster feedback on what titles, hooks, and voices resonate with your target demographic.
• Algorithmic Multipliers: Every new video acts as a perpetual traffic entry point into your channel's funnel.
• Zero Burnout: AI generation handles scriptwriting, voiceover, and captions, freeing you to focus entirely on high-level growth strategy.`,
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "The Creative Stack: Masterclass in Custom Mode Production",
    category: "Production",
    iconName: "Layers",
    excerpt: "Take granular control of your video parameters by optimizing voices, custom soundtrack loops, and distinct visual themes.",
    content: `While fully automated production is ideal for volume, Custom Mode lets you refine every layer of the 'Creative Stack'. Perfect your brand voice with custom-calibrated speech engines, set the ideal emotional backdrop with mood-matched royalty-free audio, and select stylized caption presets that align with your brand's unique aesthetic.

Mastering the Creative Stack:
• Voice & Tone Precision: Match energetic narrators with fast-paced viral news, or select warm, deep tones for stoicism and motivation.
• Kinetic Typography: Customize subtitle colors, word highlights, and animation speed to maximize viewer reading retention.
• Visual Theme Cohesion: Keep background visuals consistent across video series to establish an instantly recognizable brand identity.`,
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "DM Automation: Converting Passive Comments into Active Sales",
    category: "Conversions",
    iconName: "MessageCircle",
    excerpt: "Turn viral attention into direct revenue streams using automated comment responders and customized inbox funnels.",
    content: `Traffic alone doesn't pay the bills. With ControlVid's lead-nurturing engines, every interaction is a potential sale. Set up active monitoring that watches comment sections for trigger keywords 24/7.

When a prospect engages by typing keywords like 'BLUEPRINT', 'GUIDE', or 'SECRET', the system instantly sends an automated, high-context reply and delivers a tailored digital asset directly to their DMs, moving cold traffic to active buyers with zero manual overhead.

The Ideal 3-Step Lead Funnel:
1. Call-to-Action Hook: End your video with 'Comment GUIDE below to get the full step-by-step checklist instantly!'
2. Instant Bot Dispatch: The moment a comment is posted, your automated workflow replies to the comment and fires a direct message.
3. Value Delivery & Conversion: The DM delivers the free guide alongside a high-converting link to your product or service.`,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Shadow Channels: The Blueprint for Multi-Platform Dominance",
    category: "Multi-Platform",
    iconName: "Compass",
    excerpt: "Multiply your organic reach and bypass algorithm rate-limits by deploying a decentralized network of automated profile streams.",
    content: `Relying on a single profile leaves your distribution vulnerable to algorithmic volatility. Multi-channel networks, or 'Shadow Channels', solve this by distributing content variants across multiple accounts.

By applying slight styling, hook, and background variation, shadow accounts tap into different viewer demographics and search queries without incurring duplicate content penalties, resulting in absolute dominance of platform feeds.

Shadow Channel Architecture:
• Main Account: Acts as the primary flagship brand for high-production master assets.
• Network Satellites (3-8 Channels): Niche-focused secondary channels that test different hook variations and syndicate content automatically.
• Proxy & Safety Shields: Platform-safe scheduling protocols that prevent multi-account shadow banning or spam detection.`,
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Scheduler 2.0: Optimizing Content Velocity for Peak Engagement",
    category: "Velocity",
    iconName: "Rocket",
    excerpt: "Automate your publishing calendar with predictive scheduling to drop highly optimized video assets at peak traffic hours.",
    content: `Perfect content is wasted if it's published when your audience is asleep. Scheduler 2.0 uses automated time-windowing to release your content assets precisely when engagement density is highest.

Synchronize complex multi-platform campaigns across YouTube Shorts, Instagram Reels, and TikTok automatically. All queueing, tag inclusion, and platform publication are managed continuously from a unified workspace.

Automated Publishing Best Practices:
• Peak Hour Staggering: Post during audience commute windows (7:30 AM, 12:15 PM, 6:45 PM local audience time).
• Bulk Pre-Scheduling: Batch 30 days of automated content in a single 15-minute creation session.
• Cross-Platform Rotation: Never post the exact same video file at the exact same minute across all platforms; stagger uploads by 30-60 minutes.`,
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Data-Driven Growth: Decoding your Analytics Dashboard",
    category: "Analytics",
    iconName: "TrendingUp",
    excerpt: "Move past vanity metrics and dive deep into real conversion loops, audience retention gradients, and subscriber growth.",
    content: `True scale requires deep measurement. Analyze real-time retention profiles to pinpoint where viewers drop off, decode hook effectiveness to find which titles capture attention, and map specific visual themes to high click-through rates.

By aligning production strategies directly with raw dashboard metrics, you replace creative guesswork with an engineering-grade model for viral content creation.

Key Metrics to Track Daily:
• 3-Second View Rate: Measures hook strength. Aim for >65% of viewers staying past the 3-second mark.
• Average Watch Time / Completion Rate: If completion rate exceeds 85%, algorithms will aggressively push your video to broader audiences.
• Share & Save Ratio: The ultimate signal for algorithmic recommendation engines.`,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 7,
    title: "E-Commerce Loops: Automated Video Pipelines for Physical Products",
    category: "E-Commerce",
    iconName: "DollarSign",
    excerpt: "Integrate Shopify and WooCommerce stores directly with video creation templates to automatically showcase hot products.",
    content: `E-commerce success belongs to the brands that tell the best stories. Our automated product pipelines sync your store's inventory metadata with dynamic text overlays, visual b-roll triggers, and custom voice calls-to-action.

Generate hundreds of product-centric short-form videos dynamically whenever stock updates, driving constant buyer traffic straight to your digital storefront.

E-Commerce Video Playbook:
• Problem / Solution Structure: Show a relatable everyday problem in the first 2 seconds, then introduce your product as the instant solution.
• Social Proof Overlay: Embed real customer reviews and star ratings inside kinetic caption overlays.
• Scarcity Call-To-Action: Use countdown timers and limited-stock alerts to drive immediate impulse buys.`,
    image: "https://images.unsplash.com/photo-1522204538344-922f76ecc041?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 8,
    title: "SEO Mastery: How ControlVid Automates Search Ranking",
    category: "Optimization",
    iconName: "Cpu",
    excerpt: "Optimize titles, descriptions, and tag-clouds dynamically with algorithmic keyword maps to capture high-intent searchers.",
    content: `Social platforms are increasingly used as search engines. ControlVid leverages automated keyword mapping to embed highly relevant query terms within your subtitles, closed captions, and video descriptions.

By matching exact conversational searches, your content ranks higher, stays relevant longer, and captures continuous high-intent traffic weeks after publishing.

3 Rules for Short-Form Video SEO:
1. On-Screen Text Integration: Include your primary keyword in the first caption frame so video AI OCR algorithms index your topic accurately.
2. Spoken Keyword Audio: Speak your main target keywords in the voiceover audio script.
3. Optimized Description Tag Clouds: Include 3 high-volume search hashtags and a concise 2-sentence keyword-rich summary.`,
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 9,
    title: "Viral Hooks: Using AI to Capture Attention in 3 Seconds",
    category: "Copywriting",
    iconName: "FileText",
    excerpt: "Learn the psychological patterns behind high-retention titles and how AI optimizes early-frame engagement.",
    content: `The first three seconds of a vertical video dictate its success. Utilizing tested psychological hooks—such as curiosity gaps, pattern-interrupt statements, and micro-animations—our engine builds high-retention structures.

Analyze hook engagement curves across millions of historic runs, letting AI automatically select the optimal combination of visual style, text speed, and text style to hook viewers instantly.

Top 3 Viral Hook Formulas:
• The Negative Call-Out: 'Stop doing [common action] if you want to achieve [desired result]!'
• The Confidential Disclosure: 'Here is the secret framework that [industry experts] don't want you to know...'
• The Shocking Counter-Intuitive Claim: 'Why 99% of people fail at [topic] (and the 3-second fix).'`,
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 10,
    title: "The Future of Content: Building Your Fully Autonomous Media Empire",
    category: "Philosophy",
    iconName: "Sparkles",
    excerpt: "Synthesize autonomous creative loops, lead qualification pipelines, and e-commerce integrations to build a self-sustaining asset engine.",
    content: `The ultimate objective of content automation is complete operational independence. By joining autonomous niche research, high-velocity script writing, direct product syncs, and fully automated social scheduling, you build a digital media enterprise that scales indefinitely.

Discover how top creators are using these systems to step away from daily production and manage scalable, multi-brand media empires.

Building an Autonomous Empire:
1. Systemize Creation: Rely 100% on AI script synthesis and automated rendering templates.
2. Automate Lead Capture: Connect 24/7 DM keyword bots to convert video views directly into email leads and sales.
3. Reinvest in Channel Expansion: Scale from 1 channel to 8 Shadow Channels to compound traffic exponentially across multiple platforms.`,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop"
  }
];

export const FakeText3DPreview: React.FC<{ isCompact?: boolean }> = ({ isCompact = false }) => {
  return (
    <div className={`relative w-full h-full overflow-hidden bg-gradient-to-br from-[#02050b] via-[#051424] to-[#0f091c] flex items-center justify-center p-2 ${isCompact ? 'scale-100 origin-center' : ''}`}>
      {/* Glossy Reflective Grid Backing */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#0ea5e9_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e9_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Ambient Lighting Glows */}
      <div className="absolute -left-1/4 bottom-0 w-[250px] h-[200px] bg-cyan-500/20 rounded-full blur-[70px]" />
      <div className="absolute -right-1/4 top-0 w-[250px] h-[200px] bg-emerald-500/20 rounded-full blur-[70px]" />

      {/* Modern Dark Mode Smartphone Container */}
      <div className="relative w-full max-w-[280px] h-[95%] rounded-2xl bg-[#070b14] border-2 border-cyan-500/30 p-2 shadow-[0_0_25px_rgba(6,182,212,0.25)] flex flex-col justify-between overflow-hidden">
        {/* Phone Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-1 text-[8px] font-mono">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-white tracking-wide">@viral_story_pov</span>
          </div>
          <span className="text-cyan-400 font-extrabold text-[7px] bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20">LIVE CHAT</span>
        </div>

        {/* Chat Stream Bubbles */}
        <div className="flex-1 flex flex-col justify-center space-y-2 py-1 overflow-hidden">
          
          {/* Message Bubble 1: Incoming (Glowing Blue) */}
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="self-start max-w-[85%]"
          >
            <div className="bg-[#081b2c] border border-cyan-400/50 shadow-[0_0_12px_rgba(6,182,212,0.25)] p-2 rounded-xl rounded-bl-none text-left">
              <div className="text-[7px] font-mono font-black text-cyan-400 uppercase tracking-widest mb-0.5">USER_01</div>
              <p className="text-white text-[10px] font-bold leading-tight">"Don't look behind you..."</p>
            </div>
          </motion.div>

          {/* Message Bubble 2: Viewer POV Reply (Glowing Neon Emerald Green) */}
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="self-end max-w-[88%]"
          >
            <div className="bg-[#052518] border border-emerald-400/60 shadow-[0_0_15px_rgba(16,185,129,0.3)] p-2 rounded-xl rounded-br-none text-left">
              <div className="text-[7px] font-mono font-black text-emerald-400 uppercase tracking-widest mb-0.5">POV NARRATOR</div>
              <p className="text-white text-[10.5px] font-black leading-tight">"POV: It's already too late."</p>
            </div>
          </motion.div>

          {/* Message Bubble 3: Incoming Reply (Glowing Blue) */}
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="self-start max-w-[80%]"
          >
            <div className="bg-[#081b2c] border border-cyan-400/50 shadow-[0_0_10px_rgba(6,182,212,0.2)] p-1.5 rounded-xl rounded-bl-none text-left">
              <p className="text-cyan-200 text-[9px] font-bold leading-tight">"Wait, where are you?!"</p>
            </div>
          </motion.div>

        </div>

        {/* Footer Input Bar */}
        <div className="flex items-center gap-1.5 bg-[#03060d] border border-white/10 p-1 rounded-xl mt-1">
          <div className="flex-1 text-[8px] font-mono text-white/40 pl-1">Type message...</div>
          <div className="w-4 h-4 rounded-lg bg-emerald-500 flex items-center justify-center text-black font-extrabold text-[9px]">
            ➔
          </div>
        </div>
      </div>
    </div>
  );
};

export const SplitScreenPreview: React.FC<{ isCompact?: boolean }> = ({ isCompact = false }) => {
  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#030712] flex flex-col ${isCompact ? 'scale-100 origin-center' : ''}`}>
      {/* Top half: Primary A-Roll Video / Narrator Preview */}
      <div className="relative h-1/2 w-full bg-gradient-to-br from-[#0a152d] via-[#040d21] to-[#01040a] flex flex-col items-center justify-center overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] bg-[size:16px_16px]" />
        
        {/* Story hook overlay */}
        <div className="z-10 bg-black/80 px-2.5 py-1 rounded-lg border border-yellow-400/50 text-[9px] font-black text-yellow-300 tracking-wider uppercase text-center shadow-[0_0_10px_rgba(234,179,8,0.2)]">
          "3 SECRETS TO DOUBLE RETENTION"
        </div>

        {/* Primary Audio Waveform */}
        <div className="absolute bottom-2 inset-x-4 flex items-center justify-center gap-0.5">
          {[40, 70, 100, 60, 90, 40, 80, 50, 90, 100, 60, 40].map((h, i) => (
            <div 
              key={i} 
              className="w-1 bg-blue-400 rounded-full animate-pulse" 
              style={{ height: `${h * 0.15}px`, animationDelay: `${i * 0.1}s` }} 
            />
          ))}
        </div>

        <span className="absolute left-2 top-2 text-[6px] font-mono font-extrabold bg-blue-500/20 text-blue-400 border border-blue-500/40 px-1.5 py-0.5 rounded uppercase">
          PRIMARY A-ROLL NARRATION
        </span>
      </div>

      {/* Middle Split Divider Bar */}
      <div className="relative z-20 h-1 bg-gradient-to-r from-cyan-500 via-emerald-400 to-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.8)] flex items-center justify-center">
        <span className="bg-black border border-cyan-400 text-cyan-300 text-[6px] font-mono font-black px-2 py-0.2 rounded-full uppercase tracking-widest shadow">
          SYNCED DUAL-STREAM
        </span>
      </div>

      {/* Bottom half: Secondary B-Roll Satisfying Gameplay Loop */}
      <div className="relative h-1/2 w-full bg-gradient-to-tr from-[#160421] via-[#0d0218] to-[#04010a] flex items-center justify-center overflow-hidden">
        {/* Neon wireframe matrix */}
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#d946ef_1px,transparent_1px)] bg-[size:12px_12px]" />
        
        {/* Satisfying kinetic animation */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/40 flex items-center justify-center shadow-[0_0_15px_rgba(217,70,239,0.2)]"
        >
          <div className="w-5 h-5 rounded-full border-2 border-dashed border-fuchsia-400 animate-spin" />
        </motion.div>

        <span className="absolute left-2 top-2 text-[6px] font-mono font-extrabold bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/40 px-1.5 py-0.5 rounded uppercase">
          SECONDARY B-ROLL LOOP
        </span>
        
        <div className="absolute bottom-2 right-2 flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[6px] font-mono font-extrabold text-emerald-400 uppercase">SYNC ACTIVE</span>
        </div>
      </div>
    </div>
  );
};

export const CreativeStackPreview: React.FC<{ isCompact?: boolean }> = ({ isCompact = false }) => {
  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#040711] flex flex-col p-2 justify-between ${isCompact ? 'scale-100 origin-center' : ''}`}>
      {/* Top half: Studio Preview Monitor & Inspector Pane */}
      <div className="flex gap-2 h-[55%] w-full overflow-hidden">
        {/* 4K Video Preview Monitor */}
        <div className="relative flex-1 bg-[#02040a] rounded-lg border border-cyan-500/30 flex flex-col justify-between p-1.5 overflow-hidden shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <div className="flex items-center justify-between text-[6px] font-mono text-cyan-400">
            <span className="font-extrabold">4K MULTI-LAYER PREVIEW</span>
            <span className="bg-cyan-500/20 px-1 py-0.2 rounded border border-cyan-500/30">00:00:24:12</span>
          </div>

          {/* Central Playhead Icon */}
          <div className="flex items-center justify-center">
            <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.3)]">
              <Play className="h-3.5 w-3.5 text-cyan-300 fill-cyan-300 ml-0.5" />
            </div>
          </div>

          <div className="w-full bg-white/10 h-1 rounded overflow-hidden">
            <div className="bg-cyan-400 h-full w-[40%]" />
          </div>
        </div>

        {/* Inspector Control Pane */}
        <div className="w-[42%] bg-[#080d1a] rounded-lg border border-white/15 p-1.5 flex flex-col justify-between text-[6px] font-mono">
          <div className="space-y-1">
            <div className="text-[7px] font-black text-white border-b border-white/10 pb-0.5 uppercase tracking-wider">
              INSPECTOR STACK
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/50">Voice AI:</span>
              <span className="text-emerald-400 font-bold">Aria (24kHz)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/50">Music:</span>
              <span className="text-blue-400 font-bold">Cyber Synth</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/50">Subtitles:</span>
              <span className="text-yellow-400 font-bold">Viral Glow</span>
            </div>
          </div>
          <div className="bg-emerald-500/15 border border-emerald-500/30 p-0.5 rounded text-center text-emerald-400 font-bold text-[5px] uppercase">
            CALIBRATION OK
          </div>
        </div>
      </div>

      {/* Bottom half: Multi-Track Timeline */}
      <div className="h-[42%] bg-[#060a14] rounded-lg border border-white/15 p-1.5 flex flex-col justify-between overflow-hidden">
        <div className="flex items-center justify-between text-[6px] font-mono text-white/50 border-b border-white/10 pb-0.5">
          <span className="font-extrabold text-white uppercase">TIMELINE TRACKS</span>
          <span className="text-cyan-400">60 FPS SYNC</span>
        </div>

        {/* 4 Media Tracks */}
        <div className="space-y-1 flex-1 flex flex-col justify-center mt-1">
          {/* Track 1: Captions */}
          <div className="flex gap-1 items-center">
            <span className="w-12 text-[5px] font-mono text-yellow-400 font-bold truncate">CAPTIONS</span>
            <div className="flex-1 h-2 rounded bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-around px-1">
              <div className="w-3 h-1 bg-yellow-400 rounded" />
              <div className="w-4 h-1 bg-yellow-400 rounded" />
              <div className="w-3 h-1 bg-yellow-400 rounded" />
            </div>
          </div>

          {/* Track 2: Voice AI */}
          <div className="flex gap-1 items-center">
            <span className="w-12 text-[5px] font-mono text-cyan-400 font-bold truncate">VOICE.AI</span>
            <div className="flex-1 h-2 rounded bg-cyan-500/20 border border-cyan-500/40 flex items-center px-1">
              <div className="w-full h-1 bg-cyan-400/80 rounded animate-pulse" />
            </div>
          </div>

          {/* Track 3: B-Roll Loop */}
          <div className="flex gap-1 items-center">
            <span className="w-12 text-[5px] font-mono text-fuchsia-400 font-bold truncate">B-ROLL</span>
            <div className="flex-1 h-2 rounded bg-fuchsia-500/20 border border-fuchsia-500/40 flex items-center justify-between px-1">
              <div className="w-full h-1 bg-fuchsia-400/80 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BrandIcon: React.FC<{ brand: "youtube" | "instagram" | "tiktok" | "facebook" | "twitter"; className?: string }> = ({ brand, className = "h-6 w-6" }) => {
  switch (brand) {
    case "youtube":
      return (
        <div className={`flex items-center justify-center rounded-lg bg-red-600/10 border border-red-500/30 p-1.5 shadow-[0_0_10px_rgba(239,68,68,0.2)] ${className}`}>
          <svg className="w-full h-full fill-red-500" viewBox="0 0 24 24">
            <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </div>
      );
    case "instagram":
      return (
        <div className={`flex items-center justify-center rounded-lg bg-pink-600/10 border border-pink-500/30 p-1.5 shadow-[0_0_10px_rgba(236,72,153,0.2)] ${className}`}>
          <svg className="w-full h-full stroke-pink-500 fill-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </div>
      );
    case "tiktok":
      return (
        <div className={`flex items-center justify-center rounded-lg bg-teal-600/10 border border-teal-500/30 p-1.5 shadow-[0_0_10px_rgba(20,184,166,0.2)] ${className}`}>
          <svg className="w-full h-full fill-teal-400 stroke-teal-400" viewBox="0 0 24 24" strokeWidth="0.5">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.54-4.06-1.41-.65-.48-1.19-1.12-1.59-1.83v7.07c0 1.88-.6 3.79-1.86 5.16-1.57 1.73-4.04 2.65-6.34 2.27-2.3-.38-4.41-1.99-5.18-4.24-1.04-3.03.35-6.72 3.19-8.19.88-.45 1.85-.69 2.84-.71v4.06c-.66.01-1.33.19-1.89.55-1.01.65-1.56 1.95-1.34 3.13.23 1.25 1.35 2.21 2.63 2.15 1.55-.07 2.68-1.51 2.49-3.03V0h.05z" />
          </svg>
        </div>
      );
    case "facebook":
      return (
        <div className={`flex items-center justify-center rounded-lg bg-blue-600/10 border border-blue-500/30 p-1.5 shadow-[0_0_10px_rgba(59,130,246,0.2)] ${className}`}>
          <svg className="w-full h-full fill-blue-500" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </div>
      );
    case "twitter":
      return (
        <div className={`flex items-center justify-center rounded-lg bg-neutral-800/60 border border-neutral-600/30 p-1.5 shadow-[0_0_10px_rgba(255,255,255,0.1)] ${className}`}>
          <svg className="w-full h-full fill-white" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </div>
      );
  }
};

export const ViralShortsPreview: React.FC<{ isCompact?: boolean }> = ({ isCompact = false }) => {
  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#02050a] flex items-center justify-center p-2 gap-2 ${isCompact ? 'scale-100 origin-center' : ''}`}>
      {/* Dynamic engaging vertical video snippet */}
      <div className="relative w-[45%] h-[95%] rounded-lg border border-white/10 bg-gradient-to-tr from-[#0b0c16] via-[#120f26] to-[#040e16] overflow-hidden flex flex-col justify-between p-1 shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
        <div className="absolute inset-0 bg-fuchsia-500/5 pointer-events-none" />
        
        {/* Video progress indicator top */}
        <div className="w-full flex gap-0.5 h-0.5">
          <div className="flex-1 bg-white/20 rounded" />
          <div className="flex-1 bg-white/70 rounded" />
          <div className="flex-1 bg-white/20 rounded" />
        </div>

        {/* Text Overlay (Kinetic Caption) */}
        <div className="flex-1 flex items-center justify-center text-center px-0.5">
          <motion.div 
            animate={{ scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-[8px] font-black tracking-tighter leading-none text-yellow-400 text-shadow uppercase"
          >
            SICK OF<br/>LOW VIEWS?
          </motion.div>
        </div>

        {/* User Info */}
        <div className="space-y-0.5 text-left">
          <div className="text-[5px] font-extrabold text-white">@viralniche</div>
          <div className="text-[5px] font-medium text-white/60 truncate flex items-center gap-0.5">
            <Volume2 className="h-1 w-1 text-emerald-400" />
            Original Audio
          </div>
        </div>

        {/* Engagement icons right */}
        <div className="absolute right-0.5 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-1 z-10 bg-black/40 px-0.5 py-1 rounded-full border border-white/5">
          <span className="text-[4px] text-white">❤️</span>
          <span className="text-[4px] text-white">💬</span>
          <span className="text-[4px] text-white">🔄</span>
        </div>
      </div>

      {/* Allowed Social Networks (YouTube, Instagram, TikTok, Facebook, Twitter) */}
      <div className="flex-1 flex flex-col justify-center space-y-1">
        <div className="text-[6px] font-extrabold text-emerald-400 tracking-wider text-center border-b border-emerald-500/10 pb-0.5 uppercase">
          PUBLISH NETWORKS
        </div>
        <div className="grid grid-cols-3 gap-1">
          <BrandIcon brand="youtube" className="h-6 w-6 mx-auto" />
          <BrandIcon brand="instagram" className="h-6 w-6 mx-auto" />
          <BrandIcon brand="tiktok" className="h-6 w-6 mx-auto" />
          <BrandIcon brand="facebook" className="h-6 w-6 mx-auto" />
          <BrandIcon brand="twitter" className="h-6 w-6 mx-auto" />
        </div>
      </div>
    </div>
  );
};

export const ShadowChannelsPreview: React.FC<{ isCompact?: boolean }> = ({ isCompact = false }) => {
  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#030610] flex flex-col items-center justify-center p-2 gap-1.5 ${isCompact ? 'scale-100 origin-center' : ''}`}>
      {/* Central Source Content Node */}
      <div className="relative z-10 flex items-center justify-center gap-1 bg-emerald-500/10 border border-emerald-400/30 px-2 py-0.5 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.15)]">
        <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[7px] font-mono font-black text-emerald-400 uppercase tracking-widest">MASTER SOURCE</span>
      </div>

      {/* Branching Grid showing the 5 allowed social networks */}
      <div className="grid grid-cols-5 gap-1 w-full mt-1 relative z-10">
        <div className="flex flex-col items-center space-y-0.5">
          <BrandIcon brand="youtube" className="h-6 w-6" />
          <span className="text-[5px] font-bold text-white/50 tracking-wide font-mono uppercase">YOUTUBE</span>
        </div>
        <div className="flex flex-col items-center space-y-0.5">
          <BrandIcon brand="instagram" className="h-6 w-6" />
          <span className="text-[5px] font-bold text-white/50 tracking-wide font-mono uppercase">INSTA</span>
        </div>
        <div className="flex flex-col items-center space-y-0.5">
          <BrandIcon brand="tiktok" className="h-6 w-6" />
          <span className="text-[5px] font-bold text-white/50 tracking-wide font-mono uppercase">TIKTOK</span>
        </div>
        <div className="flex flex-col items-center space-y-0.5">
          <BrandIcon brand="facebook" className="h-6 w-6" />
          <span className="text-[5px] font-bold text-white/50 tracking-wide font-mono uppercase">META</span>
        </div>
        <div className="flex flex-col items-center space-y-0.5">
          <BrandIcon brand="twitter" className="h-6 w-6" />
          <span className="text-[5px] font-bold text-white/50 tracking-wide font-mono uppercase">TWITTER</span>
        </div>
      </div>

      {/* Connecting pipeline SVG representation */}
      <div className="absolute inset-x-0 top-[35%] bottom-[35%] opacity-15 flex justify-around pointer-events-none">
        <div className="w-[1px] h-full bg-gradient-to-b from-emerald-500 to-pink-500" />
        <div className="w-[1px] h-full bg-gradient-to-b from-emerald-500 to-teal-500" />
        <div className="w-[1px] h-full bg-gradient-to-b from-emerald-500 to-red-500" />
        <div className="w-[1px] h-full bg-gradient-to-b from-emerald-500 to-blue-500" />
      </div>

      <div className="text-[5px] font-bold font-mono text-emerald-400/80 tracking-widest text-center mt-0.5 bg-emerald-500/5 px-1 rounded border border-emerald-500/10">
        5X MULTI-CHANNEL SYNCED
      </div>
    </div>
  );
};

export const SEOMasteryPreview: React.FC<{ isCompact?: boolean }> = ({ isCompact = false }) => {
  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#030712] flex flex-col p-2 justify-between ${isCompact ? 'scale-100 origin-center' : ''}`}>
      {/* Dynamic SEO Audit Dashboard metrics */}
      <div className="flex justify-between items-center w-full relative z-10">
        <div className="flex items-center gap-0.5">
          <div className="h-3 w-3 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
            <span className="text-[5px] font-mono text-emerald-400 font-extrabold">A+</span>
          </div>
          <span className="text-[6px] font-mono font-bold text-white/80">SCORE: 98/100</span>
        </div>
        <span className="text-[5px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1 py-0.2 rounded">
          TRAFFIC +420%
        </span>
      </div>

      {/* Organic search results chart (high-ranking upward curve) */}
      <div className="relative flex-1 h-[40%] w-full flex items-end justify-center px-2 mt-1 mb-1 overflow-hidden border border-white/5 rounded bg-[#070b14]/60">
        {/* Chart grid background */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] bg-[size:12px_12px]" />

        {/* Upward climbing trend line */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGlowFeed" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path 
            d="M0,35 Q20,32 40,20 T80,8 T100,2" 
            fill="none" 
            stroke="#10b981" 
            strokeWidth="1.2" 
          />
          <path 
            d="M0,35 Q20,32 40,20 T80,8 T100,2 L100,40 L0,40 Z" 
            fill="url(#chartGlowFeed)" 
          />
        </svg>

        {/* Floating Rank Indicator */}
        <div className="absolute top-1 right-2 bg-[#10b981] text-[#030712] font-mono font-black text-[6px] px-1 py-0.2 rounded shadow">
          #1 RANK
        </div>
      </div>

      {/* Targeted keywords & query map */}
      <div className="flex justify-between gap-0.5 relative z-10 w-full">
        <span className="flex-1 text-[5px] font-mono font-bold bg-[#0f172a] border border-blue-500/20 rounded px-0.5 text-center py-0.5 text-blue-400 truncate">
          🔍 "viral shorts"
        </span>
        <span className="flex-1 text-[5px] font-mono font-bold bg-[#0f172a] border border-emerald-500/20 rounded px-0.5 text-center py-0.5 text-emerald-400 truncate">
          📈 "ai tools"
        </span>
        <span className="flex-1 text-[5px] font-mono font-bold bg-[#0f172a] border border-fuchsia-500/20 rounded px-0.5 text-center py-0.5 text-fuchsia-400 truncate">
          🔥 "retention"
        </span>
      </div>
    </div>
  );
};

const renderPostPreview = (postId: number, isCompact: boolean = false) => {
  switch (postId) {
    case 101:
      return <FakeText3DPreview isCompact={isCompact} />;
    case 102:
      return <SplitScreenPreview isCompact={isCompact} />;
    case 1:
      return <ViralShortsPreview isCompact={isCompact} />;
    case 2:
      return <CreativeStackPreview isCompact={isCompact} />;
    case 4:
      return <ShadowChannelsPreview isCompact={isCompact} />;
    case 8:
      return <SEOMasteryPreview isCompact={isCompact} />;
    default:
      return null;
  }
};

interface BlogFeedProps {
  onClose: () => void;
  onLaunchEngine: () => void;
}

export default function BlogFeed({ onClose, onLaunchEngine }: BlogFeedProps) {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const selectedPost = blogPosts.find(p => p.id === selectedPostId);

  const getIcon = (iconName: string) => {
    const iconClass = "h-5 w-5 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300";
    switch (iconName) {
      case "Sparkles": return <Sparkles className={iconClass} />;
      case "Layers": return <Layers className={iconClass} />;
      case "Cpu": return <Cpu className={iconClass} />;
      case "MessageCircle": return <MessageCircle className={iconClass} />;
      case "FileText": return <FileText className={iconClass} />;
      case "Rocket": return <Rocket className={iconClass} />;
      case "Volume2": return <Volume2 className={iconClass} />;
      case "TrendingUp": return <TrendingUp className={iconClass} />;
      case "Compass": return <Compass className={iconClass} />;
      case "DollarSign": return <DollarSign className={iconClass} />;
      default: return <Sparkles className={iconClass} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-[#121212]/95 backdrop-blur-xl font-sans overflow-hidden">
      {/* Dynamic Cosmic Backing */}
      <div className="absolute inset-0 bg-[#121212] pointer-events-none">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px]" />
        <div className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-full max-w-7xl h-screen sm:h-[95vh] bg-[#0b0f19] border-0 sm:border sm:border-blue-500/20 sm:rounded-2xl flex flex-col overflow-hidden shadow-[0_0_60px_rgba(59,130,246,0.15)] z-10"
      >
        <AnimatePresence mode="wait">
          {selectedPost ? (
            <motion.div
              key="standalone-article"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col md:grid md:grid-cols-12 h-full overflow-y-auto md:overflow-hidden bg-[#070a13]"
            >
              {/* Left Column: Cover Image taking full height on desktop, compact on mobile */}
              <div className="relative w-full h-[220px] md:h-full md:col-span-5 flex-shrink-0 overflow-hidden">
                {renderPostPreview(selectedPost.id) ? (
                  <div className="absolute inset-0 z-0">
                    {renderPostPreview(selectedPost.id)}
                  </div>
                ) : (
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `linear-gradient(to bottom, rgba(7, 10, 19, 0.4), rgba(7, 10, 19, 1)), url('${selectedPost.image}')` }}
                  />
                )}
                
                {/* Floating Back Button */}
                <button
                  onClick={() => setSelectedPostId(null)}
                  className="blueprint-back-btn absolute top-4 left-4 sm:top-6 sm:left-6 px-4 py-2 rounded-full text-white flex items-center gap-2 text-xs uppercase tracking-wider font-bold transition-all cursor-pointer focus:outline-none z-20"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Blueprints</span>
                </button>

                {/* Floating Close Button for the whole feed */}
                <button
                  onClick={onClose}
                  className="blueprint-close-btn absolute top-4 right-4 sm:top-6 sm:right-6 p-2 sm:p-2.5 rounded-full text-[#FFFFFF] hover:text-white transition-all cursor-pointer focus:outline-none z-20"
                  aria-label="Close"
                >
                  <X className="h-4 sm:h-5 w-4 sm:w-5" />
                </button>

                {/* Banner Info */}
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <span className="text-[10px] font-mono font-black text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full inline-block mb-2">
                    {selectedPost.category}
                  </span>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight text-shadow-md">
                    {selectedPost.title}
                  </h1>
                </div>
              </div>

              {/* Right Column: Article Text & Info, scrollable container with clear typography */}
              <div className="md:col-span-7 h-full flex flex-col justify-between overflow-y-auto scrollbar-none p-4 sm:p-6 md:p-8 border-t md:border-t-0 md:border-l border-white/5 bg-[#070a13]">
                <div className="flex-1 flex flex-col justify-start space-y-5 max-w-2xl mx-auto w-full py-2">
                  {/* Excerpt / Overview - PURE WHITE */}
                  <div className="border-l-4 border-emerald-500 pl-4 py-1.5 bg-emerald-500/5 rounded-r-lg">
                    <p className="text-sm sm:text-base md:text-lg text-[#FFFFFF] font-sans font-extrabold leading-relaxed italic">
                      {selectedPost.excerpt}
                    </p>
                  </div>

                  {/* Main Content - PURE WHITE MULTI-PARAGRAPH RENDER */}
                  <div className="text-xs sm:text-sm md:text-base text-[#FFFFFF] font-sans font-semibold leading-relaxed space-y-4">
                    {selectedPost.content.split("\n\n").map((para, pIdx) => (
                      <p 
                        key={pIdx} 
                        className={`whitespace-pre-line ${pIdx === 0 ? "first-letter:text-3xl first-letter:font-bold first-letter:text-emerald-400 first-letter:float-left first-letter:mr-2.5" : ""}`}
                      >
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* Key Implementation Blueprint - text and list are pure white */}
                  <div className="p-4 bg-slate-900/40 border border-white/5 rounded-xl space-y-2">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5" />
                      Key Implementation Blueprint
                    </h3>
                    <ul className="space-y-1 text-[11px] sm:text-xs text-[#FFFFFF] list-disc list-inside font-bold">
                      <li>Deploy automated audience loops triggered directly by viewer comments and tags.</li>
                      <li>Incorporate dynamic narrative structure pacing tailored to algorithm-retention patterns.</li>
                      <li>Analyze drop-off points continuously using real-time telemetry metrics.</li>
                    </ul>
                  </div>
                </div>

                {/* Bottom Sticky Action Bar */}
                <div className="pt-4 border-t border-white/5 bg-[#070a13] flex flex-col sm:flex-row gap-4 items-center justify-between flex-shrink-0">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs text-[#FFFFFF] font-sans font-bold uppercase tracking-wider">
                      Ready to deploy this blueprint?
                    </span>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => setSelectedPostId(null)}
                      className="blueprint-back-btn flex-1 sm:flex-none px-5 py-2 rounded-full font-sans text-xs uppercase tracking-wider transition-all cursor-pointer focus:outline-none font-bold"
                    >
                      Back to Grid
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        onLaunchEngine();
                      }}
                      className="launch-engine-btn flex-1 sm:flex-none px-5 py-2 rounded-full font-sans font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border-none flex items-center justify-center gap-1.5"
                    >
                      <span>Apply Strategy In Engine</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="grid-view"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col h-full overflow-hidden"
            >
              {/* Close Button top-right */}
              <button
                onClick={onClose}
                className="blueprint-close-btn absolute top-6 right-6 p-2 sm:p-2.5 rounded-full text-[#FFFFFF] hover:text-white transition-all cursor-pointer focus:outline-none z-30"
                aria-label="Close"
              >
                <X className="h-4 sm:h-5 w-4 sm:w-5" />
              </button>

              {/* The main scrollable feed container */}
              <div className="strategy-feed-container scrollbar-none flex-1">
                <div className="feed-header">
                  <h2>PUBLISHING & STRATEGY BLUEPRINTS</h2>
                  <p>In-depth strategies, professional playbooks, and blueprints for absolute content dominance. Click any card to read the full-screen master article.</p>
                </div>

                <div className="blueprints-grid">
                  {blogPosts.map((post, idx) => {
                    const customPreview = renderPostPreview(post.id, true);
                    return (
                      <motion.div
                        key={post.id}
                        layout
                        onClick={() => setSelectedPostId(post.id)}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.03, ease: "easeInOut" }}
                        className="blueprint-card group relative overflow-hidden flex flex-col justify-end rounded-xl border border-blue-500/30 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
                        style={{
                          height: "220px",
                          minHeight: "220px",
                          cursor: "pointer"
                        }}
                      >
                        {customPreview ? (
                          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none transition-transform duration-500 group-hover:scale-105">
                            {customPreview}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                          </div>
                        ) : (
                          <div 
                            className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                            style={{
                              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.9) 100%), url('${post.image}')`,
                            }}
                          />
                        )}
                        
                        <div className="relative z-10 flex flex-col justify-end w-full p-4">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-[9px] font-mono font-black text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                              {post.category}
                            </span>
                          </div>
                          <h3 className="text-white font-bold text-[16px] leading-tight tracking-wide text-shadow">
                            {post.title}
                          </h3>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Action / Launch Footer */}
              <div className="p-6 border-t border-blue-500/10 bg-[#0b0f19] flex flex-col sm:flex-row gap-4 items-center justify-between z-20">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs text-[#FFFFFF] font-sans font-bold">
                    Latest Strategies Published Daily
                  </span>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <button
                    onClick={onClose}
                    className="flex-1 sm:flex-none px-6 py-2.5 rounded-full border border-white/10 hover:border-white/20 text-[#FFFFFF] hover:text-white font-sans text-xs uppercase tracking-wider transition-all cursor-pointer bg-transparent focus:outline-none font-bold"
                  >
                    Close Feed
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      onLaunchEngine();
                    }}
                    className="launch-engine-btn flex-1 sm:flex-none px-6 py-2.5 rounded-full font-sans font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border-none flex items-center justify-center gap-1.5"
                  >
                    <span>Launch Engine</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
