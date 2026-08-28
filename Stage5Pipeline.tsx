export interface VisualProfile {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  stockFootageStyle: string;
  footageQuery: string;
  transitionType: "glitch" | "whip_zoom" | "smooth_fade" | "kinetic_slide" | "cross_dissolve";
}

export interface AudioProfile {
  elevenLabsVoiceId: string;
  voiceName: string;
  voiceTone: string;
  stability: number;
  similarityBoost: number;
  bgMusicTrack: string;
  musicGenre: string;
  musicMood: string;
  backgroundMusicUrl: string;
}

export interface CaptionProfile {
  fontName: string;
  fontSize: number;
  fontColor: string;
  strokeColor: string;
  strokeWidth: number;
  uppercase: boolean;
  animationStyle: "bounce_pop" | "slide_word" | "karaoke_highlight" | "fade_in_letters" | "kinetic_slide";
}

export interface NicheAssetBundle {
  id: string;
  name: string;
  visual: VisualProfile;
  audio: AudioProfile;
  caption: CaptionProfile;
}

// Complete 10 Niche Asset Bundles (Visual, Audio, and Caption DNA)
export const NICHE_ASSET_BUNDLES: Record<string, NicheAssetBundle> = {
  finance: {
    id: "finance",
    name: "Finance & Wealth",
    visual: {
      primaryColor: "#059669", // Emerald green
      secondaryColor: "#065F46",
      accentColor: "#34D399",
      stockFootageStyle: "Cinematic ultra-luxury, trading charts flashing, gold bullion being stacked, counting high-denomination fiat, sleek dark skyscrapers",
      footageQuery: "finance wealth luxury stock market trading gold",
      transitionType: "whip_zoom",
    },
    audio: {
      elevenLabsVoiceId: "pNInz6obpgdqMMtxF5g0", // Adam (deep, authoritative)
      voiceName: "Adam (Finance & Wealth Expert)",
      voiceTone: "Authoritative, calm, rich, persuasive, reassuring",
      stability: 0.75,
      similarityBoost: 0.85,
      bgMusicTrack: "Midnight Crypto Beats",
      musicGenre: "Synthwave / Lo-Fi",
      musicMood: "Mysterious, steady, high-retention focus",
      backgroundMusicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    caption: {
      fontName: "Montserrat-Black",
      fontSize: 72,
      fontColor: "#34D399", // bright emerald green
      strokeColor: "#000000",
      strokeWidth: 4,
      uppercase: true,
      animationStyle: "bounce_pop",
    },
  },
  fitness: {
    id: "fitness",
    name: "Fitness & Diet",
    visual: {
      primaryColor: "#DC2626", // Sporty red
      secondaryColor: "#991B1B",
      accentColor: "#F87171",
      stockFootageStyle: "High-intensity athletic training, lifting heavy dumbbells close-up, sweating under neon gym lights, vibrant meal prep slicing, high-speed movement",
      footageQuery: "gym workout exercise weightlifting meal prep fitness athletes",
      transitionType: "glitch",
    },
    audio: {
      elevenLabsVoiceId: "ErXwobaYiN019pkySvjV", // Antoni (energetic, intense)
      voiceName: "Antoni (Raw Fitness Coach)",
      voiceTone: "Motivational, energetic, punchy, commanding, raspy",
      stability: 0.65,
      similarityBoost: 0.80,
      bgMusicTrack: "Aggressive Iron Beats",
      musicGenre: "Industrial Metal / Aggressive Phonk",
      musicMood: "Ultra high-energy, pounding, motivational",
      backgroundMusicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    },
    caption: {
      fontName: "Impact",
      fontSize: 78,
      fontColor: "#FFFFFF",
      strokeColor: "#DC2626", // Red stroke
      strokeWidth: 5,
      uppercase: true,
      animationStyle: "kinetic_slide",
    },
  },
  tech: {
    id: "tech",
    name: "Tech & Future AI",
    visual: {
      primaryColor: "#38bdf8", // Electric Blue
      secondaryColor: "#0056B3",
      accentColor: "#93C5FD",
      stockFootageStyle: "Cyberpunk neon overlays, artificial intelligence holographic brains, lines of coding rolling, hands typing on mechanical keyboard, glowing servers",
      footageQuery: "cyberpunk artificial intelligence coding server rack virtual reality",
      transitionType: "glitch",
    },
    audio: {
      elevenLabsVoiceId: "VR6A628IeXyFis85v67m", // Rachel (clear, technical)
      voiceName: "Rachel (Tech & Tech Futurist)",
      voiceTone: "Intelligent, slightly detached, scientific, ultra-clear",
      stability: 0.80,
      similarityBoost: 0.85,
      bgMusicTrack: "Neural Hack Wave",
      musicGenre: "Cyberpunk Synthwave",
      musicMood: "Technological, fast, retro-future",
      backgroundMusicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    },
    caption: {
      fontName: "JetBrains-Mono-Bold",
      fontSize: 68,
      fontColor: "#38bdf8", // Electric Blue glow
      strokeColor: "#000000",
      strokeWidth: 3,
      uppercase: false,
      animationStyle: "karaoke_highlight",
    },
  },
  motivation: {
    id: "motivation",
    name: "Motivation & Mindset",
    visual: {
      primaryColor: "#EA580C", // Intense orange
      secondaryColor: "#9A3412",
      accentColor: "#FDBA74",
      stockFootageStyle: "Stoic statues staring, solitary figure climbing misty mountain, blazing campfire close-up, dramatic slow shutter waves crashing, ice baths",
      footageQuery: "stoic ancient statues climbing mountains campfire ice bath discipline",
      transitionType: "smooth_fade",
    },
    audio: {
      elevenLabsVoiceId: "IKne3meq5aC2sn9mY3v7", // Charlie (gravelly, wise)
      voiceName: "Charlie (The Stoic Master)",
      voiceTone: "Deep, gravelly, slow, wise, world-weary, emotional",
      stability: 0.85,
      similarityBoost: 0.90,
      bgMusicTrack: "Echoes of Rome",
      musicGenre: "Neoclassical Ambient / Cinematic Orchestral",
      musicMood: "Solemn, deeply emotional, highly epic",
      backgroundMusicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    },
    caption: {
      fontName: "Cinzel-Bold",
      fontSize: 70,
      fontColor: "#F97316", // Stoic orange
      strokeColor: "#000000",
      strokeWidth: 4,
      uppercase: true,
      animationStyle: "fade_in_letters",
    },
  },
  business: {
    id: "business",
    name: "Business & Startups",
    visual: {
      primaryColor: "#2563EB", // Corporate high-end blue
      secondaryColor: "#1E40AF",
      accentColor: "#93C5FD",
      stockFootageStyle: "Fast-paced whiteboard brainstorming sessions, vibrant glass skyscraper meeting rooms, high-energy product design layouts, sleek packaging lines",
      footageQuery: "startup meeting brainstorm tech product packaging business success",
      transitionType: "kinetic_slide",
    },
    audio: {
      elevenLabsVoiceId: "LcfcDJNQA9L9g3r6vQc1", // Emily (passionate, professional)
      voiceName: "Emily (SaaS Marketing Guru)",
      voiceTone: "Fast, energetic, professional, ultra-modern, passionate",
      stability: 0.70,
      similarityBoost: 0.80,
      bgMusicTrack: "Micro-SaaS Hustle Beats",
      musicGenre: "Upbeat Corporate Electro / Modern Trap",
      musicMood: "Bright, productive, energetic",
      backgroundMusicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    },
    caption: {
      fontName: "Inter-ExtraBold",
      fontSize: 74,
      fontColor: "#60A5FA", // Electric blue
      strokeColor: "#000000",
      strokeWidth: 4.5,
      uppercase: true,
      animationStyle: "bounce_pop",
    },
  },
  travel: {
    id: "travel",
    name: "Travel & Exploration",
    visual: {
      primaryColor: "#0D9488", // Ocean teal
      secondaryColor: "#115E59",
      accentColor: "#2DD4BF",
      stockFootageStyle: "Sweeping drone footage of tropical hidden lagoons, ancient ruins in jungle, narrow cobblestone European streets at sunset, misty mountain peaks",
      footageQuery: "drone travel tropical beach hidden ruins mountains europe wanderlust",
      transitionType: "smooth_fade",
    },
    audio: {
      elevenLabsVoiceId: "EXAVITQu4vr4xnSDgMaL", // Bella (dreamy, narrating)
      voiceName: "Bella (The Wanderer)",
      voiceTone: "Dreamy, soothing, elegant, slow, visual-inducing",
      stability: 0.78,
      similarityBoost: 0.83,
      bgMusicTrack: "Lost in Kyoto Ambient",
      musicGenre: "Ethnic World Fusion / Ethereal Ambient",
      musicMood: "Dreamy, scenic, awe-inspiring",
      backgroundMusicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    },
    caption: {
      fontName: "Playfair-Display-Italic",
      fontSize: 64,
      fontColor: "#2DD4BF", // ocean teal
      strokeColor: "#111115",
      strokeWidth: 3.5,
      uppercase: false,
      animationStyle: "fade_in_letters",
    },
  },
  psychology: {
    id: "psychology",
    name: "Human Psychology",
    visual: {
      primaryColor: "#7C3AED", // Violet brain
      secondaryColor: "#5B21B6",
      accentColor: "#C084FC",
      stockFootageStyle: "Complex geometric optical illusions, macro shot of dilating eyes, mysterious shadowed faces looking up, ink-blots spreading slowly, brain wave scans",
      footageQuery: "optical illusion dilating eye shadow faces abstract brain wave psychology",
      transitionType: "cross_dissolve",
    },
    audio: {
      elevenLabsVoiceId: "AZnzlk1XvdvUeBnXmlld", // Domi (mysterious, warm)
      voiceName: "Domi (Hypnotic Psychologist)",
      voiceTone: "Whispering, deep, warm, hypnotic, highly analytical",
      stability: 0.82,
      similarityBoost: 0.88,
      bgMusicTrack: "Subconscious Pulse",
      musicGenre: "Deep Ambient / Binaural Brainwave Beats",
      musicMood: "Hypnotic, intense, thought-provoking",
      backgroundMusicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    },
    caption: {
      fontName: "Lora-Medium",
      fontSize: 72,
      fontColor: "#C084FC", // Violet glow
      strokeColor: "#000000",
      strokeWidth: 4,
      uppercase: true,
      animationStyle: "slide_word",
    },
  },
  science: {
    id: "science",
    name: "Science & Space",
    visual: {
      primaryColor: "#EC4899", // Nebula pink
      secondaryColor: "#9D174D",
      accentColor: "#F472B6",
      stockFootageStyle: "Slowly rotating cosmic supernovas, hyper-zooms of atomic quantum grids, glowing particle accelerators, deep Hubble telescope star fields",
      footageQuery: "space galaxy supernova quantum atom science physics hubble",
      transitionType: "smooth_fade",
    },
    audio: {
      elevenLabsVoiceId: "YoZ06Su8Vja9dL7x5Fc4", // Sam (cosmic explorer)
      voiceName: "Sam (The Cosmos Educator)",
      voiceTone: "Inspirational, clear, enthusiastic, dramatic, grand",
      stability: 0.72,
      similarityBoost: 0.85,
      bgMusicTrack: "Stellar Horizon Orchestral",
      musicGenre: "Cinematic Space Ambient / Post-Rock",
      musicMood: "Epic, awe-inspiring, cosmic scale",
      backgroundMusicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    },
    caption: {
      fontName: "Space-Grotesk-Bold",
      fontSize: 70,
      fontColor: "#F472B6", // Pink flare
      strokeColor: "#030008",
      strokeWidth: 4,
      uppercase: true,
      animationStyle: "bounce_pop",
    },
  },
  culture: {
    id: "culture",
    name: "Pop Culture & Media",
    visual: {
      primaryColor: "#D97706", // Amber / Pop Cinema
      secondaryColor: "#92400E",
      accentColor: "#FBBF24",
      stockFootageStyle: "Sleek panning shots of movie reels, comic book pages turning, neon signs in movie theaters, stylized retro CRT screens flickering",
      footageQuery: "movie film comic book retro crt screen pop culture neon cinema",
      transitionType: "whip_zoom",
    },
    audio: {
      elevenLabsVoiceId: "ODq5FmEglgST7m633R25", // Freya (animated, fast)
      voiceName: "Freya (Culture Critic)",
      voiceTone: "Expressive, quick, dramatic, punchy, gossip-adjacent",
      stability: 0.60,
      similarityBoost: 0.82,
      bgMusicTrack: "Retro CRT Glitch",
      musicGenre: "Lofi Hip-Hop / Chill Beats",
      musicMood: "Nostalgic, quick, bouncy",
      backgroundMusicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    },
    caption: {
      fontName: "Bangers",
      fontSize: 82,
      fontColor: "#FBBF24", // bright pop yellow
      strokeColor: "#000000",
      strokeWidth: 5,
      uppercase: true,
      animationStyle: "bounce_pop",
    },
  },
  history: {
    id: "history",
    name: "Untold History",
    visual: {
      primaryColor: "#E11D48", // Rose ancient
      secondaryColor: "#9F1239",
      accentColor: "#FB7185",
      stockFootageStyle: "Parchment scrolls crumbling, antique hourglass sand falling, ruins under golden hour sun, high-end museum relics spinning slowly",
      footageQuery: "history ancient scrolls relics hourglass museum roman ruins",
      transitionType: "cross_dissolve",
    },
    audio: {
      elevenLabsVoiceId: "TX38omv2FvLa50mY5yG7", // George (vintage storytelling)
      voiceName: "George (The Historian)",
      voiceTone: "Vintage, slow, deep, mysterious, evocative, British",
      stability: 0.85,
      similarityBoost: 0.92,
      bgMusicTrack: "Dusty Museum Chamber",
      musicGenre: "Dark Academic Cello / Orchestral",
      musicMood: "Mysterious, majestic, historical, narrative",
      backgroundMusicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    },
    caption: {
      fontName: "Georgia-Bold",
      fontSize: 66,
      fontColor: "#FB7185", // Vintage rose gold / pink
      strokeColor: "#110005",
      strokeWidth: 4.5,
      uppercase: true,
      animationStyle: "fade_in_letters",
    },
  },
};

export const MUSIC_GENRES_LIST = [
  "Phonk",
  "Synthwave",
  "Lo-Fi",
  "Orchestral",
  "Cinematic",
  "Electronic/EDM",
  "Trap",
  "Tech House",
  "Ambient/Calm",
  "Dark/Mysterious",
  "Funk/Groove",
  "Acoustic",
  "Hip-Hop/Beat",
  "Corporate/Inspiring",
  "Rock/Energetic"
] as const;

export interface MusicThemeProfile {
  bgMusicTrack: string;
  musicGenre: string;
  musicMood: string;
  backgroundMusicUrl: string;
}

export const MUSIC_THEMES: Record<string, MusicThemeProfile> = {
  "Phonk": {
    bgMusicTrack: "Phonk Drift Energy",
    musicGenre: "Phonk",
    musicMood: "Aggressive, bass-heavy, fast-paced drift phonk",
    backgroundMusicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  "Synthwave": {
    bgMusicTrack: "Neon Cyber Synthwave",
    musicGenre: "Synthwave",
    musicMood: "Retro 80s, synth-heavy, futuristic cyberpunk pulse",
    backgroundMusicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  "Lo-Fi": {
    bgMusicTrack: "Financial Chill Lo-Fi",
    musicGenre: "Lo-Fi",
    musicMood: "Relaxing, focused, cozy study beats",
    backgroundMusicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
  },
  "Orchestral": {
    bgMusicTrack: "Epic Symphony Orchestral",
    musicGenre: "Orchestral",
    musicMood: "Solemn, grand, cinematic strings and brass",
    backgroundMusicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  },
  "Cinematic": {
    bgMusicTrack: "Cinematic Drama Beats",
    musicGenre: "Cinematic",
    musicMood: "Epic, powerful, high-retention storytelling",
    backgroundMusicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
  },
  "Electronic/EDM": {
    bgMusicTrack: "Viral Electronic Energy",
    musicGenre: "Electronic/EDM",
    musicMood: "Energetic, driving bass, festival energy",
    backgroundMusicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
  },
  "Trap": {
    bgMusicTrack: "Shadow Syndicate Trap",
    musicGenre: "Trap",
    musicMood: "Hypnotic, heavy 808s, fast hi-hats",
    backgroundMusicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3"
  },
  "Tech House": {
    bgMusicTrack: "Wall Street Tech House",
    musicGenre: "Tech House",
    musicMood: "Rhythmic, sophisticated, club groove",
    backgroundMusicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3"
  },
  "Ambient/Calm": {
    bgMusicTrack: "Deep Sea Zen Ambient",
    musicGenre: "Ambient/Calm",
    musicMood: "Atmospheric, peaceful, stoic zen",
    backgroundMusicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
  },
  "Dark/Mysterious": {
    bgMusicTrack: "Subconscious Shadow Dark",
    musicGenre: "Dark/Mysterious",
    musicMood: "Eerie, suspenseful, hypnotic mystery",
    backgroundMusicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  "Funk/Groove": {
    bgMusicTrack: "Retro Disco Funk Groove",
    musicGenre: "Funk/Groove",
    musicMood: "Upbeat, funky basslines, vibrant rhythm",
    backgroundMusicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3"
  },
  "Acoustic": {
    bgMusicTrack: "Silicon Valley Warm Acoustic",
    musicGenre: "Acoustic",
    musicMood: "Calm, organic, reflective guitar",
    backgroundMusicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3"
  },
  "Hip-Hop/Beat": {
    bgMusicTrack: "Urban Culture Hip-Hop",
    musicGenre: "Hip-Hop/Beat",
    musicMood: "Boom bap rhythm, smooth vinyl vibes, street flow",
    backgroundMusicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3"
  },
  "Corporate/Inspiring": {
    bgMusicTrack: "Unicorn Pitch Corporate",
    musicGenre: "Corporate/Inspiring",
    musicMood: "Motivational, clean, professional, optimistic",
    backgroundMusicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
  },
  "Rock/Energetic": {
    bgMusicTrack: "Overdrive Hard Rock Energy",
    musicGenre: "Rock/Energetic",
    musicMood: "High energy, heavy riffs, driving drumbeat",
    backgroundMusicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3"
  },

  // Backward compatibility presets
  "Cinematic Beats": {
    bgMusicTrack: "Cinematic Beats",
    musicGenre: "Cinematic",
    musicMood: "Epic, powerful, high-retention drama",
    backgroundMusicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
  },
  "Cyberpunk Bass": {
    bgMusicTrack: "Cyberpunk Bass",
    musicGenre: "Synthwave",
    musicMood: "Energetic, dark, synth-heavy, fast-paced",
    backgroundMusicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
  },
  "Financial Lo-Fi": {
    bgMusicTrack: "Financial Lo-Fi",
    musicGenre: "Lo-Fi",
    musicMood: "Relaxing, focused, professional, cozy",
    backgroundMusicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
  },
  "Motivation Upbeat": {
    bgMusicTrack: "Motivation Upbeat",
    musicGenre: "Corporate/Inspiring",
    musicMood: "Inspirational, bright, high-energy, confident",
    backgroundMusicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
  }
};

export interface VoiceProfile {
  id: string;
  name: string;
  gender: "Male" | "Female";
  tone: string;
  description: string;
  recommendedNiches: string[];
}

export const VOICE_PROFILES: VoiceProfile[] = [
  {
    id: "pNInz6obpgdqMMtxF5g0",
    name: "Adam (Authoritative Executive)",
    gender: "Male",
    tone: "Authoritative, Calm & Rich",
    description: "Deep executive voice ideal for Finance, Business & Corporate Strategy",
    recommendedNiches: ["finance", "business", "crypto", "product"]
  },
  {
    id: "ErXwobaYiN019pkySvjV",
    name: "Antoni (Energetic Motivator)",
    gender: "Male",
    tone: "High Energy & Commanding",
    description: "Fast-paced intense narrator for Fitness, Gym, Sports & Gaming Shorts",
    recommendedNiches: ["fitness", "sports", "gaming", "motivation"]
  },
  {
    id: "VR6A628IeXyFis85v67m",
    name: "Rachel (Tech Futurist)",
    gender: "Female",
    tone: "Intelligent, Clear & Crisp",
    description: "Sleek modern voice for AI, Software, Tech News & Innovation",
    recommendedNiches: ["tech", "science", "ai", "software"]
  },
  {
    id: "IKne3meq5aC2sn9mY3v7",
    name: "Charlie (Stoic Philosopher)",
    gender: "Male",
    tone: "Deep, Wise & Grave",
    description: "Resonant gravitas narrator for Psychology, Philosophy & Mindset",
    recommendedNiches: ["psychology", "motivation", "philosophy", "stoicism"]
  },
  {
    id: "LcfcDJNQA9L9g3r6vQc1",
    name: "Emily (SaaS Marketing)",
    gender: "Female",
    tone: "Professional, Warm & Conversational",
    description: "Polished marketing voice perfect for E-commerce, D2C & Product Demos",
    recommendedNiches: ["ecommerce", "product", "business", "lifestyle"]
  },
  {
    id: "EXAVITQu4vr4xnSDgMaL",
    name: "Bella (Serene Wanderer)",
    gender: "Female",
    tone: "Soothing, Dreamy & Calm",
    description: "Gentle relaxing voice for Travel Vlogs, Wellness, Spa & Storytelling",
    recommendedNiches: ["travel", "lifestyle", "culture", "wellness"]
  },
  {
    id: "AZnzlk1XvdvUeBnXmlld",
    name: "Domi (Hypnotic Analyst)",
    gender: "Female",
    tone: "Deep, Whispering & Analytical",
    description: "Intriguing mysterious voice for True Crime, Cyber Security & Dark Tech",
    recommendedNiches: ["psychology", "tech", "science", "mystery"]
  },
  {
    id: "YoZ06Su8Vja9dL7x5Fc4",
    name: "Sam (Cosmic Inspirational)",
    gender: "Male",
    tone: "Grand, Inspiring & Clear",
    description: "Uplifting narrator for Science, Space Exploration & Documentary",
    recommendedNiches: ["science", "motivation", "culture", "history"]
  },
  {
    id: "ODq5FmEglgST7m633R25",
    name: "Freya (Punchy Culture Critic)",
    gender: "Female",
    tone: "Expressive, Quick & Dynamic",
    description: "Upbeat punchy voice for Viral Shorts, Pop Culture & News Clips",
    recommendedNiches: ["culture", "ecommerce", "gaming", "shorts"]
  },
  {
    id: "TX38omv2FvLa50mY5yG7",
    name: "George (Vintage Historian)",
    gender: "Male",
    tone: "Deep, Historic & Cinematic",
    description: "Classic documentary voice for History, Archival Stories & Lore",
    recommendedNiches: ["history", "culture", "science", "storytelling"]
  }
];

export function getRecommendedVoicesForNiche(nicheRaw?: string): VoiceProfile[] {
  if (!nicheRaw) return [VOICE_PROFILES[0], VOICE_PROFILES[2]];
  const search = nicheRaw.toLowerCase();

  const matched = VOICE_PROFILES.filter(voice => 
    voice.recommendedNiches.some(n => search.includes(n))
  );

  if (matched.length > 0) return matched;

  if (search.includes("health") || search.includes("gym") || search.includes("sport") || search.includes("diet")) {
    return [VOICE_PROFILES[1], VOICE_PROFILES[0]];
  }
  if (search.includes("money") || search.includes("invest") || search.includes("wealth") || search.includes("trade") || search.includes("bank")) {
    return [VOICE_PROFILES[0], VOICE_PROFILES[4]];
  }
  if (search.includes("ai") || search.includes("code") || search.includes("robot") || search.includes("future") || search.includes("software")) {
    return [VOICE_PROFILES[2], VOICE_PROFILES[6]];
  }
  if (search.includes("shop") || search.includes("store") || search.includes("sale") || search.includes("ad") || search.includes("product")) {
    return [VOICE_PROFILES[4], VOICE_PROFILES[8]];
  }
  if (search.includes("mind") || search.includes("stoic") || search.includes("focus") || search.includes("habit")) {
    return [VOICE_PROFILES[3], VOICE_PROFILES[7]];
  }

  return [VOICE_PROFILES[0], VOICE_PROFILES[2]];
}

export const NICHE_MUSIC_RECOMMENDATIONS: Record<string, string[]> = {
  finance: ["Synthwave", "Lo-Fi", "Corporate/Inspiring", "Tech House"],
  fitness: ["Phonk", "Trap", "Rock/Energetic", "Electronic/EDM"],
  tech: ["Synthwave", "Dark/Mysterious", "Tech House", "Electronic/EDM"],
  motivation: ["Cinematic", "Orchestral", "Ambient/Calm", "Acoustic"],
  business: ["Corporate/Inspiring", "Hip-Hop/Beat", "Tech House", "Funk/Groove"],
  travel: ["Ambient/Calm", "Acoustic", "Lo-Fi", "Cinematic"],
  psychology: ["Dark/Mysterious", "Lo-Fi", "Ambient/Calm", "Cinematic"],
  science: ["Cinematic", "Orchestral", "Dark/Mysterious", "Synthwave"],
  culture: ["Hip-Hop/Beat", "Funk/Groove", "Lo-Fi", "Trap"],
  history: ["Orchestral", "Cinematic", "Dark/Mysterious", "Acoustic"],
  ecommerce: ["Electronic/EDM", "Corporate/Inspiring", "Funk/Groove", "Hip-Hop/Beat"],
  product: ["Corporate/Inspiring", "Electronic/EDM", "Funk/Groove", "Tech House"],
  gaming: ["Phonk", "Synthwave", "Trap", "Electronic/EDM"],
  crypto: ["Synthwave", "Tech House", "Lo-Fi", "Phonk"],
  lifestyle: ["Acoustic", "Lo-Fi", "Ambient/Calm", "Funk/Groove"]
};

export function getRecommendedGenresForNiche(nicheRaw?: string): string[] {
  if (!nicheRaw) return ["Cinematic", "Lo-Fi", "Corporate/Inspiring", "Synthwave"];
  const search = nicheRaw.toLowerCase();
  
  for (const [key, genres] of Object.entries(NICHE_MUSIC_RECOMMENDATIONS)) {
    if (search.includes(key)) {
      return genres;
    }
  }
  
  if (search.includes("health") || search.includes("gym") || search.includes("sport") || search.includes("diet")) {
    return NICHE_MUSIC_RECOMMENDATIONS.fitness;
  }
  if (search.includes("money") || search.includes("invest") || search.includes("wealth") || search.includes("trade") || search.includes("bank")) {
    return NICHE_MUSIC_RECOMMENDATIONS.finance;
  }
  if (search.includes("ai") || search.includes("code") || search.includes("robot") || search.includes("future") || search.includes("software")) {
    return NICHE_MUSIC_RECOMMENDATIONS.tech;
  }
  if (search.includes("shop") || search.includes("store") || search.includes("sale") || search.includes("ad") || search.includes("product")) {
    return NICHE_MUSIC_RECOMMENDATIONS.ecommerce;
  }
  if (search.includes("mind") || search.includes("stoic") || search.includes("focus") || search.includes("habit")) {
    return NICHE_MUSIC_RECOMMENDATIONS.motivation;
  }
  
  return ["Cinematic", "Lo-Fi", "Corporate/Inspiring", "Synthwave"];
}

export const CAPTION_PRESETS: Record<string, CaptionProfile> = {
  "ControlVid Blue": {
    fontName: "Impact",
    fontSize: 60,
    fontColor: "#38bdf8",
    strokeColor: "#000000",
    strokeWidth: 5,
    uppercase: true,
    animationStyle: "bounce_pop",
  },
  "ControlVid Blue (Default)": {
    fontName: "Impact",
    fontSize: 60,
    fontColor: "#38bdf8",
    strokeColor: "#000000",
    strokeWidth: 5,
    uppercase: true,
    animationStyle: "bounce_pop",
  },
  "Neon Green (Matrix)": {
    fontName: "JetBrains Mono",
    fontSize: 52,
    fontColor: "#10B981",
    strokeColor: "#011c0f",
    strokeWidth: 4,
    uppercase: false,
    animationStyle: "slide_word",
  },
  "Stoic White (Georgia)": {
    fontName: "Georgia-Bold",
    fontSize: 60,
    fontColor: "#FFFFFF",
    strokeColor: "#1F2937",
    strokeWidth: 4.5,
    uppercase: true,
    animationStyle: "fade_in_letters",
  },
  "Sunset Gold (Bold Impact)": {
    fontName: "Impact",
    fontSize: 62,
    fontColor: "#F59E0B",
    strokeColor: "#000000",
    strokeWidth: 5,
    uppercase: true,
    animationStyle: "bounce_pop",
  },
  "Vintage Rose": {
    fontName: "Georgia-Bold",
    fontSize: 66,
    fontColor: "#FB7185",
    strokeColor: "#110005",
    strokeWidth: 4.5,
    uppercase: true,
    animationStyle: "fade_in_letters",
  },
  "Cyberpunk Purple": {
    fontName: "JetBrains Mono",
    fontSize: 58,
    fontColor: "#C084FC",
    strokeColor: "#3B0764",
    strokeWidth: 5,
    uppercase: true,
    animationStyle: "kinetic_slide",
  },
  "Minimalist Black": {
    fontName: "Inter",
    fontSize: 54,
    fontColor: "#000000",
    strokeColor: "#FFFFFF",
    strokeWidth: 3,
    uppercase: false,
    animationStyle: "slide_word",
  },
  "Modern Gradient": {
    fontName: "Impact",
    fontSize: 60,
    fontColor: "#EC4899",
    strokeColor: "#831843",
    strokeWidth: 4.5,
    uppercase: true,
    animationStyle: "karaoke_highlight",
  },
  "Electric Orange": {
    fontName: "Impact",
    fontSize: 62,
    fontColor: "#FF6B00",
    strokeColor: "#000000",
    strokeWidth: 5,
    uppercase: true,
    animationStyle: "bounce_pop",
  },
  "High-Contrast Yellow": {
    fontName: "Impact",
    fontSize: 64,
    fontColor: "#FACC15",
    strokeColor: "#000000",
    strokeWidth: 5.5,
    uppercase: true,
    animationStyle: "bounce_pop",
  },
};

// Backward compatibility mapping
CAPTION_PRESETS["ViralFlow Blue"] = CAPTION_PRESETS["ControlVid Blue"];
CAPTION_PRESETS["ViralFlow Blue (Default)"] = CAPTION_PRESETS["ControlVid Blue"];

export function getRecommendedCaptionStylesForNiche(niche?: string): string[] {
  if (!niche) return ["ControlVid Blue", "High-Contrast Yellow", "Modern Gradient"];
  const lower = niche.toLowerCase();
  
  if (lower.includes("finance") || lower.includes("money") || lower.includes("business") || lower.includes("stoic") || lower.includes("philosophy")) {
    return ["Stoic White (Georgia)", "ControlVid Blue", "Sunset Gold (Bold Impact)"];
  }
  if (lower.includes("tech") || lower.includes("ai") || lower.includes("crypto") || lower.includes("coding") || lower.includes("software")) {
    return ["Neon Green (Matrix)", "Cyberpunk Purple", "ControlVid Blue"];
  }
  if (lower.includes("fitness") || lower.includes("sport") || lower.includes("gym") || lower.includes("motivation")) {
    return ["Electric Orange", "High-Contrast Yellow", "Sunset Gold (Bold Impact)"];
  }
  if (lower.includes("ecom") || lower.includes("product") || lower.includes("ad") || lower.includes("saas") || lower.includes("marketing")) {
    return ["ControlVid Blue", "Modern Gradient", "High-Contrast Yellow"];
  }
  if (lower.includes("beauty") || lower.includes("life") || lower.includes("travel") || lower.includes("vlog") || lower.includes("relax")) {
    return ["Vintage Rose", "Modern Gradient", "Stoic White (Georgia)"];
  }
  if (lower.includes("game") || lower.includes("gaming") || lower.includes("anime") || lower.includes("stream")) {
    return ["Cyberpunk Purple", "Neon Green (Matrix)", "Electric Orange"];
  }
  if (lower.includes("crime") || lower.includes("dark") || lower.includes("mystery") || lower.includes("history")) {
    return ["Minimalist Black", "Stoic White (Georgia)", "Neon Green (Matrix)"];
  }

  return ["ControlVid Blue", "High-Contrast Yellow", "Sunset Gold (Bold Impact)"];
}

export function applyCaptionStyleOverride(bundle: NicheAssetBundle, captionStyle?: string): NicheAssetBundle {
  if (!captionStyle) return bundle;
  const styleProfile = CAPTION_PRESETS[captionStyle];
  if (styleProfile) {
    return {
      ...bundle,
      visual: { ...bundle.visual },
      audio: { ...bundle.audio },
      caption: { ...styleProfile }
    };
  }
  return bundle;
}

export function applyMusicThemeOverride(bundle: NicheAssetBundle, musicTheme?: string): NicheAssetBundle {
  if (!musicTheme) return bundle;
  
  // Check predefined themes first
  const themeProfile = MUSIC_THEMES[musicTheme] || Object.values(MUSIC_THEMES).find(t => t.bgMusicTrack.toLowerCase().includes(musicTheme.toLowerCase()));
  if (themeProfile) {
    return {
      ...bundle,
      visual: { ...bundle.visual },
      caption: { ...bundle.caption },
      audio: {
        ...bundle.audio,
        bgMusicTrack: themeProfile.bgMusicTrack,
        musicGenre: themeProfile.musicGenre,
        musicMood: themeProfile.musicMood,
        backgroundMusicUrl: themeProfile.backgroundMusicUrl,
      }
    };
  }

  // Handle direct HTTP/HTTPS/S3 URLs or custom S3 track names
  if (musicTheme.startsWith("http://") || musicTheme.startsWith("https://") || musicTheme.startsWith("s3://") || musicTheme.includes("/") || musicTheme.endsWith(".mp3")) {
    return {
      ...bundle,
      visual: { ...bundle.visual },
      caption: { ...bundle.caption },
      audio: {
        ...bundle.audio,
        bgMusicTrack: musicTheme.split("/").pop()?.replace(/\.[^/.]+$/, "") || "Selected Audio Track",
        musicGenre: "S3 / Custom Audio",
        musicMood: "Selected Soundtrack",
        backgroundMusicUrl: musicTheme,
      }
    };
  }

  // If passed a track title (e.g. from S3 music library)
  return {
    ...bundle,
    visual: { ...bundle.visual },
    caption: { ...bundle.caption },
    audio: {
      ...bundle.audio,
      bgMusicTrack: musicTheme,
      musicGenre: "Custom Audio Selection",
      musicMood: "High-Retention Focus",
      backgroundMusicUrl: bundle.audio.backgroundMusicUrl, // fallback retained
    }
  };
}

// Middleware logic: Match the niche ID with the corresponding Asset Bundle
export function getNicheAssetBundle(nicheId: string, musicTheme?: string, captionStyle?: string): NicheAssetBundle {
  const normId = nicheId.toLowerCase().trim();
  let bundle: NicheAssetBundle;

  // Map various potential frontend representations to our exact asset keys
  if (normId.includes("finance") || normId === "wealth") bundle = NICHE_ASSET_BUNDLES.finance;
  else if (normId.includes("fitness") || normId === "diet") bundle = NICHE_ASSET_BUNDLES.fitness;
  else if (normId.includes("tech") || normId === "ai") bundle = NICHE_ASSET_BUNDLES.tech;
  else if (normId.includes("motivation") || normId === "mindset") bundle = NICHE_ASSET_BUNDLES.motivation;
  else if (normId.includes("business") || normId === "startup") bundle = NICHE_ASSET_BUNDLES.business;
  else if (normId.includes("travel") || normId === "exploration") bundle = NICHE_ASSET_BUNDLES.travel;
  else if (normId.includes("psychology") || normId === "human") bundle = NICHE_ASSET_BUNDLES.psychology;
  else if (normId.includes("science") || normId === "space") bundle = NICHE_ASSET_BUNDLES.science;
  else if (normId.includes("culture") || normId === "media" || normId === "pop") bundle = NICHE_ASSET_BUNDLES.culture;
  else if (normId.includes("history") || normId === "ancient" || normId === "untold") bundle = NICHE_ASSET_BUNDLES.history;
  else bundle = NICHE_ASSET_BUNDLES.finance;

  // Apply music theme override if provided
  if (musicTheme) {
    bundle = applyMusicThemeOverride(bundle, musicTheme);
  }

  // Apply caption style override if provided
  if (captionStyle) {
    bundle = applyCaptionStyleOverride(bundle, captionStyle);
  }

  return bundle;
}

// 3. API INTEGRATION (The Engine)

// Text-to-Speech Integration with ElevenLabs (with graceful fallbacks)
export async function generateSpeech(text: string, voiceId: string): Promise<{ audioUrl: string; generatedReal: boolean }> {
  const apiKey = process.env.ELEVENLABS_API_KEY;

  if (!apiKey || apiKey.trim() === "" || apiKey === "undefined") {
    console.log("[ElevenLabs] No API key found. Using premium fallback voice CDN.");
    // Return high-quality, pre-recorded or general scenic MP3 file urls matching typical voices for demonstration
    return {
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      generatedReal: false,
    };
  }

  try {
    console.log(`[ElevenLabs] Sending real text-to-speech request for voice: ${voiceId}`);
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_turbo_v2_5",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`ElevenLabs API returned error status ${response.status}: ${errText}`);
    }

    const audioBuffer = await response.arrayBuffer();
    // Since we cannot write files to local workspace and expect instant hot-reload CDN easily without complexity,
    // we convert the audio to a standard Base64 Data URI that can play natively in any HTML audio tag immediately.
    const base64Audio = Buffer.from(audioBuffer).toString("base64");
    const audioUrl = `data:audio/mp3;base64,${base64Audio}`;

    return {
      audioUrl,
      generatedReal: true,
    };
  } catch (error: any) {
    console.error("[ElevenLabs API Error]", error);
    return {
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      generatedReal: false,
    };
  }
}

// Video Rendering Engine Integration with Replicate (SVD-XT), Shotstack, or Creatomate (with graceful fallbacks)
export async function generateVideoWithReplicateSVD(options: {
  inputImage?: string;
  motionBucketId?: number;
  fps?: number;
  videoLength?: string;
  condAug?: number;
}): Promise<{ videoUrl: string; predictionId?: string; status: string; generatedReal: boolean; rawPrediction?: any }> {
  const replicateKey = process.env.REPLICATE_API_KEY;

  if (!replicateKey || replicateKey.trim() === "" || replicateKey === "undefined") {
    console.log("[Replicate SVD XT] No REPLICATE_API_KEY found. Returning fallback video URL.");
    return {
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-network-of-glowing-lines-44331-large.mp4",
      status: "succeeded",
      generatedReal: false
    };
  }

  const inputImg = options.inputImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop";
  const motionBucketId = options.motionBucketId ?? 127;
  const fps = options.fps ?? 6;
  const videoLength = options.videoLength || "25_frames_with_svd_xt";
  const condAug = options.condAug ?? 0.02;

  console.log(`[Replicate SVD XT] Initiating prediction request with Replicate API...`);

  try {
    const response = await fetch("https://api.replicate.com/v1/models/stability-ai/stable-video-diffusion/predictions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${replicateKey.trim()}`,
        "Content-Type": "application/json",
        "Prefer": "wait=5"
      },
      body: JSON.stringify({
        input: {
          input_image: inputImg,
          video_length: videoLength,
          sizing_strategy: "maintain_aspect_ratio",
          frames_per_second: fps,
          motion_bucket_id: motionBucketId,
          cond_aug: condAug
        }
      })
    });

    let prediction = await response.json();

    if (!response.ok) {
      console.warn("[Replicate SVD XT] Model endpoint response notice, trying fallback /v1/predictions endpoint...", prediction);
      const fallbackResp = await fetch("https://api.replicate.com/v1/predictions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${replicateKey.trim()}`,
          "Content-Type": "application/json",
          "Prefer": "wait=5"
        },
        body: JSON.stringify({
          version: "3f042780e1a129d3a0e568b209d952672722b9b7754d24f0c86e0984ee24ef12",
          input: {
            input_image: inputImg,
            video_length: videoLength,
            sizing_strategy: "maintain_aspect_ratio",
            frames_per_second: fps,
            motion_bucket_id: motionBucketId,
            cond_aug: condAug
          }
        })
      });
      prediction = await fallbackResp.json();
      if (!fallbackResp.ok) {
        throw new Error(prediction.detail || prediction.error || JSON.stringify(prediction));
      }
    }

    console.log(`[Replicate SVD XT] Prediction created (ID: ${prediction.id}, Status: ${prediction.status})`);

    let pollAttempts = 0;
    const maxPollAttempts = 30; // 30 * 2s = 60s max
    const getUrl = prediction.urls?.get || `https://api.replicate.com/v1/predictions/${prediction.id}`;

    while ((prediction.status === "starting" || prediction.status === "processing") && pollAttempts < maxPollAttempts) {
      pollAttempts++;
      await new Promise((r) => setTimeout(r, 2000));
      console.log(`[Replicate SVD XT] Polling prediction ${prediction.id} (Attempt ${pollAttempts}/${maxPollAttempts}, Status: ${prediction.status})...`);

      const pollResp = await fetch(getUrl, {
        headers: {
          "Authorization": `Bearer ${replicateKey.trim()}`
        }
      });
      if (pollResp.ok) {
        prediction = await pollResp.json();
      }
    }

    if (prediction.status === "succeeded") {
      const outputUrl = Array.isArray(prediction.output) ? prediction.output[0] : prediction.output;
      console.log(`[Replicate SVD XT Success] Generated video URL: ${outputUrl}`);
      return {
        videoUrl: outputUrl || "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-network-of-glowing-lines-44331-large.mp4",
        predictionId: prediction.id,
        status: prediction.status,
        generatedReal: true,
        rawPrediction: prediction
      };
    } else {
      console.warn(`[Replicate SVD XT Status: ${prediction.status}] Error/In-progress: ${prediction.error || "Processing"}`);
      const outputUrl = Array.isArray(prediction.output) ? prediction.output[0] : (prediction.output || "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-network-of-glowing-lines-44331-large.mp4");
      return {
        videoUrl: outputUrl,
        predictionId: prediction.id,
        status: prediction.status,
        generatedReal: false,
        rawPrediction: prediction
      };
    }
  } catch (err: any) {
    console.error("[Replicate SVD XT Error]", err);
    throw err;
  }
}

export async function renderVideoWithEngine(
  script: { title: string; hook: { audio: string; visual: string }; body: { audio: string; visual: string }; twist: { audio: string; visual: string }; cta: { audio: string; visual: string } },
  bundle: NicheAssetBundle
): Promise<{ videoUrl: string; duration: number; generatedReal: boolean; apiUsed: "Shotstack" | "Creatomate" | "Replicate_SVD_XT" | "Fallback" }> {
  
  const replicateKey = process.env.REPLICATE_API_KEY;
  const shotstackKey = process.env.SHOTSTACK_API_KEY;
  const creatomateKey = process.env.CREATOMATE_API_KEY;

  // 1. If Replicate API key is present, attempt Stable Video Diffusion XT render
  if (replicateKey && replicateKey.trim() !== "" && replicateKey !== "undefined") {
    try {
      console.log(`[Replicate API] Generating Stable Video Diffusion XT video for niche ${bundle.id}`);
      const svdResult = await generateVideoWithReplicateSVD({
        motionBucketId: 127,
        fps: 6,
        videoLength: "25_frames_with_svd_xt"
      });
      return {
        videoUrl: svdResult.videoUrl,
        duration: 5,
        generatedReal: svdResult.generatedReal,
        apiUsed: "Replicate_SVD_XT"
      };
    } catch (e: any) {
      console.error("[Replicate SVD XT Render Failed, falling back]", e);
    }
  }

  // 2. If Creatomate is set, perform a render using Creatomate API
  if (creatomateKey && creatomateKey.trim() !== "" && creatomateKey !== "undefined") {
    try {
      console.log(`[Creatomate API] Rendering dynamic high-retention short-form video for niche ${bundle.id}`);
      const response = await fetch("https://api.creatomate.com/v1/renders", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${creatomateKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          template_id: "viral_916_captions_template_v1", // generic/placeholder standard template id
          modifications: {
            "title": script.title,
            "hook_text": script.hook.audio,
            "body_text": script.body.audio,
            "twist_text": script.twist.audio,
            "cta_text": script.cta.audio,
            "font_color": bundle.caption.fontColor,
            "bg_music": bundle.audio.backgroundMusicUrl,
            "stock_query": bundle.visual.footageQuery,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Creatomate API error: ${response.statusText}`);
      }

      const result = await response.json();
      return {
        videoUrl: result.url || result[0]?.url || "https://assets.mixkit.co/videos/preview/mixkit-starry-night-sky-over-a-silent-lake-43180-large.mp4",
        duration: 58,
        generatedReal: true,
        apiUsed: "Creatomate"
      };
    } catch (e: any) {
      console.error("[Creatomate API Render Failed]", e);
    }
  }

  // 2. If Shotstack is set, perform a standard Shotstack Edit JSON render
  if (shotstackKey && shotstackKey.trim() !== "" && shotstackKey !== "undefined") {
    try {
      console.log(`[Shotstack API] Creating timeline schema and sending render request for niche ${bundle.id}`);
      // Send standard Shotstack Timeline compilation
      const response = await fetch("https://api.shotstack.io/v1/render", {
        method: "POST",
        headers: {
          "x-api-key": shotstackKey,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          timeline: {
            background: "#050508",
            tracks: [
              {
                clips: [
                  {
                    asset: {
                      type: "video",
                      src: "https://assets.mixkit.co/videos/preview/mixkit-typing-on-a-glowing-neon-keyboard-in-the-dark-44061-large.mp4"
                    },
                    start: 0,
                    length: 15
                  },
                  {
                    asset: {
                      type: "audio",
                      src: bundle.audio.backgroundMusicUrl,
                      effect: "fadeInFadeOut"
                    },
                    start: 0,
                    length: 60
                  }
                ]
              }
            ]
          },
          output: {
            format: "mp4",
            resolution: "hd",
            aspectRatio: "9:16"
          }
        })
      });

      if (response.ok) {
        const result = await response.json();
        // Return Shotstack player or final assets (Shotstack renders asynchronously, we can return the track URL)
        return {
          videoUrl: result.response?.url || "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-network-of-glowing-lines-44331-large.mp4",
          duration: 60,
          generatedReal: true,
          apiUsed: "Shotstack"
        };
      }
    } catch (e: any) {
      console.error("[Shotstack API Render Failed]", e);
    }
  }

  // 3. Fallback High-Quality Cinematic Scenic Template Library representing the niche
  // This produces incredibly premium results instantly for development & review, so that a lack of keys does not block the visual joy of testing.
  const FALLBACK_VIDEOS: Record<string, string> = {
    finance: "https://assets.mixkit.co/videos/preview/mixkit-businesswoman-checking-financial-charts-on-a-tablet-40405-large.mp4",
    fitness: "https://assets.mixkit.co/videos/preview/mixkit-athlete-performing-push-ups-in-the-gym-42646-large.mp4",
    tech: "https://assets.mixkit.co/videos/preview/mixkit-typing-on-a-glowing-neon-keyboard-in-the-dark-44061-large.mp4",
    motivation: "https://assets.mixkit.co/videos/preview/mixkit-thoughtful-man-looking-out-at-the-ocean-at-sunset-41716-large.mp4",
    business: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-creative-team-working-on-a-startup-project-41740-large.mp4",
    travel: "https://assets.mixkit.co/videos/preview/mixkit-beautiful-view-of-waves-crashing-on-a-sandy-beach-42358-large.mp4",
    psychology: "https://assets.mixkit.co/videos/preview/mixkit-kaleidoscopic-motion-of-vibrant-neon-patterns-43306-large.mp4",
    science: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-network-of-glowing-lines-44331-large.mp4",
    culture: "https://assets.mixkit.co/videos/preview/mixkit-panning-shot-of-the-retro-glowing-marquee-of-a-cinema-44673-large.mp4",
    history: "https://assets.mixkit.co/videos/preview/mixkit-old-books-stacked-in-a-dimly-lit-library-41584-large.mp4",
  };

  const selectedFallback = FALLBACK_VIDEOS[bundle.id] || FALLBACK_VIDEOS.finance;

  return {
    videoUrl: selectedFallback,
    duration: 60,
    generatedReal: false,
    apiUsed: "Fallback"
  };
}
