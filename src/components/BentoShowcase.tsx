import React from 'react';
import { 
  Sliders, 
  Cpu, 
  Globe, 
  Bot, 
  BarChart3, 
  ArrowRight, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';

interface BentoShowcaseProps {
  onStartGenerating: () => void;
  setSelectedWorkflowStep?: (step: number) => void;
  setIsWorkflowModalOpen?: (isOpen: boolean) => void;
}

export default function BentoShowcase({ 
  onStartGenerating 
}: BentoShowcaseProps) {
  const steps = [
    {
      id: 1,
      step: "STAGE 01",
      title: "1. Niche & Bulk",
      description: "Select niche & video duration. Queue up to 10 automated batch videos.",
      image: `data:image/svg+xml;utf8,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 960" width="100%" height="100%">
          <defs>
            <radialGradient id="bgRoom" cx="50%" cy="20%" r="90%">
              <stop offset="0%" stop-color="#0c192c" />
              <stop offset="50%" stop-color="#060c18" />
              <stop offset="100%" stop-color="#020409" />
            </radialGradient>
            <linearGradient id="lightStrip" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95" />
              <stop offset="100%" stop-color="#bae6fd" stop-opacity="0.8" />
            </linearGradient>
            <linearGradient id="metalDesk" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#334155" />
              <stop offset="25%" stop-color="#1e293b" />
              <stop offset="60%" stop-color="#0f172a" />
              <stop offset="100%" stop-color="#020617" />
            </linearGradient>
            <linearGradient id="glassBody" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#00f0ff" stop-opacity="0.15" />
              <stop offset="50%" stop-color="#3b82f6" stop-opacity="0.08" />
              <stop offset="100%" stop-color="#a855f7" stop-opacity="0.18" />
            </linearGradient>
            <filter id="neonGlowCyan" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur1" />
              <feGaussianBlur stdDeviation="10" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="neonGlowPurple" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <!-- Dark Room Background -->
          <rect width="540" height="960" fill="url(#bgRoom)" />

          <!-- Ceiling Light Panels -->
          <polygon points="100,0 280,0 250,60 120,60" fill="url(#lightStrip)" filter="url(#neonGlowCyan)" />
          <polygon points="320,0 490,0 440,60 350,60" fill="url(#lightStrip)" filter="url(#neonGlowCyan)" />

          <!-- Ceiling / Wall Arch Frames -->
          <path d="M 0,140 L 540,140 M 0,200 L 540,200" stroke="#1e293b" stroke-width="3" opacity="0.7" />
          <path d="M 35,0 L 35,460 M 505,0 L 505,460" stroke="#0f172a" stroke-width="5" />

          <!-- Metallic Curved Desk Workstation Console -->
          <polygon points="0,500 540,460 540,960 0,960" fill="url(#metalDesk)" />
          <path d="M 0,500 Q 270,470 540,460 L 540,550 Q 270,570 0,610 Z" fill="#1e293b" />
          <path d="M 0,500 Q 270,470 540,460" stroke="#00f0ff" stroke-width="5" filter="url(#neonGlowCyan)" fill="none" />
          <path d="M 0,550 Q 270,570 540,550" stroke="#38bdf8" stroke-width="3" opacity="0.6" fill="none" />

          <!-- Glass Stand Slot on Desk -->
          <polygon points="30,555 485,505 490,520 25,570" fill="#020617" stroke="#00f0ff" stroke-width="1.5" />

          <!-- Glass Panel with Perspective Curved Frame -->
          <g id="glassScreen">
            <!-- Outer Glass Frame with Cyan & Purple Neon Contour -->
            <path d="M 28,150 Q 270,170 505,230 L 485,525 Q 260,495 32,555 Z" 
                  fill="url(#glassBody)" 
                  stroke="#00f0ff" 
                  stroke-width="3.5" 
                  filter="url(#neonGlowCyan)" />

            <!-- Inner Purple Accent Border -->
            <path d="M 34,158 Q 270,177 499,236 L 480,518 Q 260,488 38,548 Z" 
                  fill="none" 
                  stroke="#c084fc" 
                  stroke-width="2" 
                  opacity="0.85" 
                  filter="url(#neonGlowPurple)" />

            <!-- Header Item 1: NICHE SELECTION: GAMING -->
            <g transform="translate(52, 205) rotate(2)">
              <rect x="0" y="0" width="185" height="85" rx="10" fill="#020617" fill-opacity="0.85" stroke="#38bdf8" stroke-width="1.5" />
              <text x="12" y="26" font-family="monospace" font-weight="900" font-size="11" fill="#93c5fd" letter-spacing="0.5">NICHE SELECTION:</text>
              <text x="12" y="58" font-family="sans-serif" font-weight="900" font-size="22" fill="#00f0ff" letter-spacing="1">GAMING</text>
              <path d="M 158,50 L 165,57 L 172,50" stroke="#00f0ff" stroke-width="2.5" fill="none" />
            </g>

            <!-- Header Item 2: SUB-NICHE: RETRO REVIEWS -->
            <g transform="translate(250, 228) rotate(3)">
              <rect x="0" y="0" width="140" height="85" rx="10" fill="#020617" fill-opacity="0.85" stroke="#a855f7" stroke-width="1.5" />
              <text x="10" y="25" font-family="monospace" font-weight="900" font-size="10" fill="#e9d5ff" letter-spacing="0.5">SUB-NICHE:</text>
              <text x="10" y="54" font-family="sans-serif" font-weight="900" font-size="12" fill="#ffffff" letter-spacing="0.5">RETRO REVIEWS</text>
              <path d="M 116,47 L 121,53 L 126,47" stroke="#c084fc" stroke-width="2" fill="none" />
            </g>

            <!-- Header Item 3: BATCH QUEUE: 10 ITEMS -->
            <g transform="translate(400, 268) rotate(4)">
              <rect x="0" y="0" width="80" height="125" rx="10" fill="#020617" fill-opacity="0.9" stroke="#38bdf8" stroke-width="1.5" />
              <text x="40" y="22" font-family="monospace" font-weight="900" font-size="7.5" fill="#a5f3fc" text-anchor="middle">BATCH QUEUE:</text>
              <text x="40" y="60" font-family="sans-serif" font-weight="900" font-size="34" fill="#00f0ff" text-anchor="middle">10</text>
              <text x="40" y="78" font-family="sans-serif" font-weight="800" font-size="10" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">ITEMS</text>
              <rect x="10" y="88" width="60" height="22" rx="5" fill="#0f172a" stroke="#38bdf8" stroke-width="1" />
              <path d="M 35,97 L 40,103 L 45,97" stroke="#00f0ff" stroke-width="2" fill="none" />
            </g>

            <!-- Sliders Container -->
            <g transform="translate(60, 320) rotate(2)">
              <!-- Slider 1 -->
              <text x="0" y="20" font-family="monospace" font-weight="900" font-size="13" fill="#ffffff" letter-spacing="0.5">DURATION 1:</text>
              <line x1="0" y1="32" x2="230" y2="32" stroke="#1e293b" stroke-width="8" stroke-linecap="round" />
              <line x1="0" y1="32" x2="105" y2="32" stroke="#00f0ff" stroke-width="8" stroke-linecap="round" filter="url(#neonGlowCyan)" />
              <circle cx="105" cy="32" r="9" fill="#ffffff" stroke="#00f0ff" stroke-width="3" />
              <text x="248" y="36" font-family="monospace" font-weight="900" font-size="13" fill="#00f0ff">15s</text>

              <!-- Slider 2 -->
              <text x="0" y="70" font-family="monospace" font-weight="900" font-size="13" fill="#ffffff" letter-spacing="0.5">DURATION 2:</text>
              <line x1="0" y1="82" x2="230" y2="82" stroke="#1e293b" stroke-width="8" stroke-linecap="round" />
              <line x1="0" y1="82" x2="155" y2="82" stroke="#00f0ff" stroke-width="8" stroke-linecap="round" filter="url(#neonGlowCyan)" />
              <circle cx="155" cy="82" r="9" fill="#ffffff" stroke="#00f0ff" stroke-width="3" />
              <text x="238" y="86" font-family="monospace" font-weight="900" font-size="13" fill="#00f0ff">5m 30s</text>

              <!-- Slider 3 -->
              <text x="0" y="120" font-family="monospace" font-weight="900" font-size="13" fill="#ffffff" letter-spacing="0.5">DURATION 3:</text>
              <line x1="0" y1="132" x2="230" y2="132" stroke="#1e293b" stroke-width="8" stroke-linecap="round" />
              <line x1="0" y1="132" x2="200" y2="132" stroke="#a855f7" stroke-width="8" stroke-linecap="round" filter="url(#neonGlowPurple)" />
              <circle cx="200" cy="132" r="9" fill="#ffffff" stroke="#c084fc" stroke-width="3" />
              <text x="238" y="136" font-family="monospace" font-weight="900" font-size="13" fill="#c084fc">10m 00s</text>
            </g>
          </g>
        </svg>
      `)}`,
      icon: Sliders,
      badge: "BATCH READY"
    },
    {
      id: 2,
      step: "STAGE 02",
      title: "2. Viral Video",
      description: "Auto-generate viral scripts, hooks, voiceover, kinetic captions & audio.",
      image: `data:image/svg+xml;utf8,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 960" width="100%" height="100%">
          <defs>
            <radialGradient id="chamberBg" cx="50%" cy="50%" r="85%">
              <stop offset="0%" stop-color="#0d081e" />
              <stop offset="50%" stop-color="#05030f" />
              <stop offset="100%" stop-color="#020106" />
            </radialGradient>
            <linearGradient id="neonCyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#00f0ff" />
              <stop offset="100%" stop-color="#3b82f6" />
            </linearGradient>
            <linearGradient id="neonMagenta" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#f43f5e" />
              <stop offset="50%" stop-color="#ec4899" />
              <stop offset="100%" stop-color="#a855f7" />
            </linearGradient>
            <filter id="glowC" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="b1" />
              <feMerge>
                <feMergeNode in="b1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glowM" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="b2" />
              <feMerge>
                <feMergeNode in="b2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <!-- Background Chamber -->
          <rect width="540" height="960" fill="url(#chamberBg)" />

          <!-- Circular Mechanical Portals & Rings on Right Wall -->
          <g opacity="0.6">
            <ellipse cx="480" cy="480" rx="200" ry="420" fill="none" stroke="#1e1b4b" stroke-width="25" />
            <ellipse cx="480" cy="480" rx="170" ry="360" fill="none" stroke="#00f0ff" stroke-width="4" filter="url(#glowC)" />
            <ellipse cx="480" cy="480" rx="140" ry="300" fill="none" stroke="#c084fc" stroke-width="3" filter="url(#glowM)" />
          </g>

          <!-- Optical Glowing Fiber Cables -->
          <path d="M 120,850 C 180,720 220,600 320,530" fill="none" stroke="#00f0ff" stroke-width="3" filter="url(#glowC)" />
          <path d="M 140,860 C 200,740 240,610 330,550" fill="none" stroke="#c084fc" stroke-width="2" filter="url(#glowM)" />
          <path d="M 160,870 C 220,760 260,620 340,570" fill="none" stroke="#38bdf8" stroke-width="2" />

          <!-- CENTRAL CYLINDER CORE (NEURAL QUANTUM CHAMBER) -->
          <g id="centralCore">
            <rect x="300" y="400" width="160" height="180" rx="20" fill="#030712" fill-opacity="0.8" stroke="#00f0ff" stroke-width="2" filter="url(#glowC)" />
            <ellipse cx="380" cy="400" rx="80" ry="20" fill="#0f172a" stroke="#c084fc" stroke-width="2" />
            <ellipse cx="380" cy="580" rx="80" ry="20" fill="#0f172a" stroke="#00f0ff" stroke-width="2" />

            <!-- Constellation Neural Nodes Inside Cylinder -->
            <line x1="330" y1="450" x2="380" y2="490" stroke="#f43f5e" stroke-width="1.5" />
            <line x1="380" y1="490" x2="430" y2="440" stroke="#00f0ff" stroke-width="1.5" />
            <line x1="380" y1="490" x2="380" y2="540" stroke="#c084fc" stroke-width="1.5" />
            <line x1="330" y1="530" x2="380" y2="490" stroke="#38bdf8" stroke-width="1.5" />
            <line x1="430" y1="530" x2="380" y2="490" stroke="#ec4899" stroke-width="1.5" />

            <circle cx="380" cy="490" r="12" fill="#00f0ff" filter="url(#glowC)" />
            <circle cx="330" cy="450" r="6" fill="#f43f5e" filter="url(#glowM)" />
            <circle cx="430" cy="440" r="6" fill="#00f0ff" />
            <circle cx="380" cy="540" r="7" fill="#c084fc" />
            <circle cx="330" cy="530" r="5" fill="#38bdf8" />
            <circle cx="430" cy="530" r="6" fill="#ec4899" />
          </g>

          <!-- TOP CONTROL SCREEN 1: VIRAL SCRIPT GENERATION -->
          <g transform="translate(40, 80)">
            <rect x="0" y="0" width="280" height="110" rx="12" fill="#020617" fill-opacity="0.9" stroke="#38bdf8" stroke-width="1.5" filter="url(#glowC)" />
            <text x="15" y="28" font-family="monospace" font-weight="900" font-size="11" fill="#38bdf8" letter-spacing="1">VIRAL SCRIPT GENERATION</text>
            <text x="15" y="48" font-family="monospace" font-weight="900" font-size="14" fill="#ffffff">PROGRESS: 98%</text>
            <rect x="15" y="60" width="250" height="12" rx="6" fill="#0f172a" stroke="#1e293b" stroke-width="1" />
            <rect x="15" y="60" width="245" height="12" rx="6" fill="url(#neonCyan)" />
            <text x="15" y="92" font-family="sans-serif" font-size="9" fill="#94a3b8">Hooks &amp; CTAs generated automatically...</text>
          </g>

          <!-- TOP CONTROL SCREEN 2: KINETIC TYPOGRAPHY PREVIEW -->
          <g transform="translate(40, 210)">
            <rect x="0" y="0" width="280" height="160" rx="12" fill="#020617" fill-opacity="0.9" stroke="#ec4899" stroke-width="1.5" filter="url(#glowM)" />
            <text x="15" y="25" font-family="monospace" font-weight="900" font-size="10" fill="#ec4899" letter-spacing="0.5">KINETIC TYPOGRAPHY PREVIEW</text>
            <rect x="15" y="38" width="250" height="105" rx="8" fill="#090514" />
            <text x="140" y="70" font-family="sans-serif" font-weight="900" font-size="20" fill="#f43f5e" text-anchor="middle" letter-spacing="2">MUST-SEE</text>
            <text x="140" y="98" font-family="sans-serif" font-weight="900" font-size="22" fill="#00f0ff" text-anchor="middle" letter-spacing="2">GAME-CHANGER</text>
            <text x="140" y="122" font-family="sans-serif" font-weight="800" font-size="11" fill="#c084fc" text-anchor="middle" letter-spacing="3">VIRAL HOOK READY</text>
          </g>

          <!-- MAIN SCREEN 3: AUTOMATED VOICEOVER WAVEFORM -->
          <g transform="translate(40, 620)">
            <rect x="0" y="0" width="360" height="160" rx="14" fill="#020617" fill-opacity="0.92" stroke="#00f0ff" stroke-width="2" filter="url(#glowC)" />
            <text x="15" y="26" font-family="monospace" font-weight="900" font-size="11" fill="#00f0ff" letter-spacing="1">AUTOMATED VOICEOVER WAVEFORM</text>

            <!-- Audio Waveform Visualization Bars -->
            <g transform="translate(20, 42)">
              <rect x="0" y="15" width="4" height="30" fill="#00f0ff" />
              <rect x="8" y="5" width="4" height="50" fill="#00f0ff" />
              <rect x="16" y="25" width="4" height="20" fill="#38bdf8" />
              <rect x="24" y="0" width="4" height="60" fill="#00f0ff" />
              <rect x="32" y="10" width="4" height="40" fill="#c084fc" />
              <rect x="40" y="20" width="4" height="25" fill="#00f0ff" />
              <rect x="48" y="5" width="4" height="50" fill="#f43f5e" />
              <rect x="56" y="18" width="4" height="32" fill="#00f0ff" />
              <rect x="64" y="2" width="4" height="56" fill="#38bdf8" />
              <rect x="72" y="12" width="4" height="38" fill="#00f0ff" />
              <rect x="80" y="22" width="4" height="20" fill="#c084fc" />
              <rect x="88" y="8" width="4" height="46" fill="#00f0ff" />
            </g>

            <!-- 3D AI Voice Mesh Head Silhouette Icon -->
            <g transform="translate(240, 40)">
              <circle cx="45" cy="40" r="35" fill="#0f172a" stroke="#00f0ff" stroke-width="1.5" />
              <path d="M 30,25 C 40,15 55,15 65,25 C 75,40 65,65 45,70 C 25,65 15,40 30,25 Z" fill="none" stroke="#38bdf8" stroke-width="2" />
              <circle cx="35" cy="35" r="3" fill="#00f0ff" />
              <circle cx="55" cy="35" r="3" fill="#00f0ff" />
              <path d="M 38,52 Q 45,58 52,52" stroke="#f43f5e" stroke-width="2" fill="none" />
            </g>

            <!-- Sub Status -->
            <text x="15" y="142" font-family="monospace" font-weight="700" font-size="10" fill="#a5f3fc">VOICE: ElevenLabs AI Ultra-Realistic HD</text>
          </g>

          <!-- BOTTOM SCREEN 4: DYNAMIC RETENTION HOOKS PREVIEW -->
          <g transform="translate(40, 800)">
            <rect x="0" y="0" width="360" height="120" rx="12" fill="#020617" fill-opacity="0.9" stroke="#c084fc" stroke-width="1.5" filter="url(#glowM)" />
            <text x="15" y="24" font-family="monospace" font-weight="900" font-size="10" fill="#c084fc" letter-spacing="1">DYNAMIC RETENTION HOOKS PREVIEW</text>

            <!-- Retention Line Graph -->
            <path d="M 20,90 Q 80,40 140,55 T 260,35 T 330,25" fill="none" stroke="#00f0ff" stroke-width="3" filter="url(#glowC)" />
            <circle cx="330" cy="25" r="5" fill="#f43f5e" />
            <text x="240" y="105" font-family="monospace" font-weight="800" font-size="9" fill="#00f0ff">RETENTION: 94.2%</text>
          </g>
        </svg>
      `)}`,
      icon: Cpu,
      badge: "ZERO EDIT"
    },
    {
      id: 3,
      step: "STAGE 03",
      title: "3. Shadow Channels",
      description: "Multi-platform auto dispatch across 8 Shadow Channels with proxies.",
      image: `data:image/svg+xml;utf8,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 960" width="100%" height="100%">
          <defs>
            <radialGradient id="spaceBg" cx="50%" cy="50%" r="85%">
              <stop offset="0%" stop-color="#0a1528" />
              <stop offset="60%" stop-color="#040a15" />
              <stop offset="100%" stop-color="#010308" />
            </radialGradient>
            <radialGradient id="globeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#00f0ff" stop-opacity="0.4" />
              <stop offset="70%" stop-color="#3b82f6" stop-opacity="0.15" />
              <stop offset="100%" stop-color="#000000" stop-opacity="0" />
            </radialGradient>
            <linearGradient id="neonCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#00f0ff" />
              <stop offset="100%" stop-color="#38bdf8" />
            </linearGradient>
            <filter id="glowCyan" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glowPurple" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <!-- Dark Space Chamber Background -->
          <rect width="540" height="960" fill="url(#spaceBg)" />

          <!-- Ceiling Lighting Rig -->
          <polygon points="120,0 260,0 230,50 140,50" fill="#ffffff" opacity="0.9" filter="url(#glowCyan)" />
          <polygon points="300,0 440,0 400,50 320,50" fill="#ffffff" opacity="0.9" filter="url(#glowCyan)" />

          <!-- Metallic Console Surface Base -->
          <path d="M 0,580 Q 270,540 540,530 L 540,960 L 0,960 Z" fill="#0b1329" />
          <path d="M 0,580 Q 270,540 540,530" stroke="#00f0ff" stroke-width="4" filter="url(#glowCyan)" fill="none" />

          <!-- TOP HEADER PANEL: SHADOW CHANNELS PROXY DISPATCH -->
          <g transform="translate(40, 70)">
            <rect x="0" y="0" width="460" height="70" rx="12" fill="#020617" fill-opacity="0.92" stroke="#00f0ff" stroke-width="2" filter="url(#glowCyan)" />
            <text x="20" y="32" font-family="monospace" font-weight="900" font-size="13" fill="#00f0ff" letter-spacing="1">SHADOW CHANNELS PROXY DISPATCH</text>
            <text x="20" y="52" font-family="monospace" font-weight="700" font-size="10" fill="#a5f3fc">AUTOMATED MULTI-PLATFORM DISTRIBUTED DISPATCH ENGINE</text>
            <circle cx="430" cy="35" r="8" fill="#10b981" filter="url(#glowCyan)" />
          </g>

          <!-- CENTERPIECE: 3D HOLOGRAPHIC GLOBE & NETWORK CONNECTIONS -->
          <g id="holographicGlobe" transform="translate(290, 360)">
            <!-- Globe Glow Halo -->
            <circle cx="0" cy="0" r="160" fill="url(#globeGlow)" />

            <!-- Latitude & Longitude Mesh Circles -->
            <ellipse cx="0" cy="0" rx="130" ry="130" fill="none" stroke="#00f0ff" stroke-width="2" stroke-dasharray="8 4" opacity="0.8" filter="url(#glowCyan)" />
            <ellipse cx="0" cy="0" rx="130" ry="50" fill="none" stroke="#38bdf8" stroke-width="1.5" opacity="0.8" />
            <ellipse cx="0" cy="0" rx="130" ry="90" fill="none" stroke="#c084fc" stroke-width="1.5" opacity="0.7" filter="url(#glowPurple)" />
            <ellipse cx="0" cy="0" rx="50" ry="130" fill="none" stroke="#00f0ff" stroke-width="1.5" opacity="0.8" />
            <ellipse cx="0" cy="0" rx="90" ry="130" fill="none" stroke="#38bdf8" stroke-width="1.5" opacity="0.7" />

            <!-- Orbital Ring Systems -->
            <ellipse cx="0" cy="0" rx="170" ry="35" fill="none" stroke="#00f0ff" stroke-width="2" transform="rotate(-25)" filter="url(#glowCyan)" />
            <ellipse cx="0" cy="0" rx="180" ry="45" fill="none" stroke="#f43f5e" stroke-width="1.5" transform="rotate(35)" opacity="0.8" filter="url(#glowPurple)" />

            <!-- Proxy Hub Nodes across the Globe -->
            <!-- North America Node -->
            <line x1="-70" y1="-40" x2="-140" y2="-90" stroke="#00f0ff" stroke-width="1.5" />
            <circle cx="-70" cy="-40" r="6" fill="#00f0ff" filter="url(#glowCyan)" />
            <circle cx="-140" cy="-90" r="4" fill="#38bdf8" />

            <!-- Europe Node -->
            <line x1="20" y1="-60" x2="80" y2="-120" stroke="#c084fc" stroke-width="1.5" />
            <circle cx="20" cy="-60" r="6" fill="#c084fc" filter="url(#glowPurple)" />
            <circle cx="80" cy="-120" r="4" fill="#e9d5ff" />

            <!-- Asia Node -->
            <line x1="70" y1="-20" x2="140" y2="-50" stroke="#00f0ff" stroke-width="1.5" />
            <circle cx="70" cy="-20" r="6" fill="#00f0ff" filter="url(#glowCyan)" />

            <!-- South America Node -->
            <line x1="-50" y1="50" x2="-110" y2="100" stroke="#38bdf8" stroke-width="1.5" />
            <circle cx="-50" cy="50" r="6" fill="#38bdf8" />

            <!-- Africa Node -->
            <circle cx="20" cy="30" r="6" fill="#f43f5e" filter="url(#glowPurple)" />

            <!-- Australia Node -->
            <circle cx="80" cy="60" r="6" fill="#00f0ff" filter="url(#glowCyan)" />

            <!-- Orbiting Satellites -->
            <rect x="145" y="-60" width="10" height="6" fill="#ffffff" />
            <line x1="135" y1="-57" x2="165" y2="-57" stroke="#00f0ff" stroke-width="2" />

            <rect x="-160" y="20" width="10" height="6" fill="#ffffff" />
            <line x1="-170" y1="23" x2="-140" y2="23" stroke="#f43f5e" stroke-width="2" />
          </g>

          <!-- LEFT PANEL: 8 SHADOW CHANNELS LIST WITH RESIDENTIAL PROXIES -->
          <g transform="translate(30, 160)">
            <rect x="0" y="0" width="220" height="380" rx="14" fill="#020617" fill-opacity="0.9" stroke="#38bdf8" stroke-width="1.5" filter="url(#glowCyan)" />
            <text x="15" y="26" font-family="monospace" font-weight="900" font-size="11" fill="#38bdf8" letter-spacing="0.5">ACTIVE CHANNELS (8/8)</text>

            <!-- Channel Item 1: TikTok -->
            <g transform="translate(12, 42)">
              <rect x="0" y="0" width="196" height="36" rx="6" fill="#0f172a" stroke="#00f0ff" stroke-width="1" />
              <circle cx="18" cy="18" r="8" fill="#f43f5e" />
              <text x="34" y="16" font-family="sans-serif" font-weight="800" font-size="10" fill="#ffffff">1. TikTok Shorts</text>
              <text x="34" y="28" font-family="monospace" font-size="8" fill="#10b981">Proxy #104 - 192.168.1.84</text>
            </g>

            <!-- Channel Item 2: Instagram Reels -->
            <g transform="translate(12, 83)">
              <rect x="0" y="0" width="196" height="36" rx="6" fill="#0f172a" stroke="#c084fc" stroke-width="1" />
              <circle cx="18" cy="18" r="8" fill="#ec4899" />
              <text x="34" y="16" font-family="sans-serif" font-weight="800" font-size="10" fill="#ffffff">2. Instagram Reels</text>
              <text x="34" y="28" font-family="monospace" font-size="8" fill="#10b981">Proxy #105 - 192.168.1.85</text>
            </g>

            <!-- Channel Item 3: YouTube Shorts -->
            <g transform="translate(12, 124)">
              <rect x="0" y="0" width="196" height="36" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1" />
              <circle cx="18" cy="18" r="8" fill="#ef4444" />
              <text x="34" y="16" font-family="sans-serif" font-weight="800" font-size="10" fill="#ffffff">3. YouTube Shorts</text>
              <text x="34" y="28" font-family="monospace" font-size="8" fill="#10b981">Proxy #106 - 192.168.1.86</text>
            </g>

            <!-- Channel Item 4: Facebook Reels -->
            <g transform="translate(12, 165)">
              <rect x="0" y="0" width="196" height="36" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1" />
              <circle cx="18" cy="18" r="8" fill="#3b82f6" />
              <text x="34" y="16" font-family="sans-serif" font-weight="800" font-size="10" fill="#ffffff">4. Facebook Reels</text>
              <text x="34" y="28" font-family="monospace" font-size="8" fill="#10b981">Proxy #107 - 192.168.1.87</text>
            </g>

            <!-- Channel Item 5: X / Twitter -->
            <g transform="translate(12, 206)">
              <rect x="0" y="0" width="196" height="36" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1" />
              <circle cx="18" cy="18" r="8" fill="#38bdf8" />
              <text x="34" y="16" font-family="sans-serif" font-weight="800" font-size="10" fill="#ffffff">5. X / Twitter Clips</text>
              <text x="34" y="28" font-family="monospace" font-size="8" fill="#10b981">Proxy #108 - 192.168.1.88</text>
            </g>

            <!-- Channel Item 6: Snapchat Spotlight -->
            <g transform="translate(12, 247)">
              <rect x="0" y="0" width="196" height="36" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1" />
              <circle cx="18" cy="18" r="8" fill="#eab308" />
              <text x="34" y="16" font-family="sans-serif" font-weight="800" font-size="10" fill="#ffffff">6. Snapchat Spotlight</text>
              <text x="34" y="28" font-family="monospace" font-size="8" fill="#10b981">Proxy #109 - 192.168.1.89</text>
            </g>

            <!-- Channel Item 7: Pinterest Idea Pin -->
            <g transform="translate(12, 288)">
              <rect x="0" y="0" width="196" height="36" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1" />
              <circle cx="18" cy="18" r="8" fill="#e11d48" />
              <text x="34" y="16" font-family="sans-serif" font-weight="800" font-size="10" fill="#ffffff">7. Pinterest Idea Pin</text>
              <text x="34" y="28" font-family="monospace" font-size="8" fill="#10b981">Proxy #110 - 192.168.1.90</text>
            </g>

            <!-- Channel Item 8: Threads Clips -->
            <g transform="translate(12, 329)">
              <rect x="0" y="0" width="196" height="36" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1" />
              <circle cx="18" cy="18" r="8" fill="#a855f7" />
              <text x="34" y="16" font-family="sans-serif" font-weight="800" font-size="10" fill="#ffffff">8. Threads Video</text>
              <text x="34" y="28" font-family="monospace" font-size="8" fill="#10b981">Proxy #111 - 192.168.1.91</text>
            </g>
          </g>

          <!-- BOTTOM STATUS PANEL: RESIDENTIAL PROXY SHIELD TELEMETRY -->
          <g transform="translate(30, 560)">
            <rect x="0" y="0" width="480" height="120" rx="14" fill="#020617" fill-opacity="0.92" stroke="#10b981" stroke-width="2" filter="url(#glowCyan)" />
            <text x="20" y="30" font-family="monospace" font-weight="900" font-size="12" fill="#10b981" letter-spacing="1">RESIDENTIAL PROXY SHIELD: ACTIVE</text>

            <rect x="20" y="45" width="440" height="10" rx="5" fill="#0f172a" />
            <rect x="20" y="45" width="440" height="10" rx="5" fill="#10b981" filter="url(#glowCyan)" />

            <text x="20" y="80" font-family="monospace" font-weight="800" font-size="10" fill="#ffffff">ANTI-BAN PROTECTION: 100% SECURE</text>
            <text x="20" y="98" font-family="monospace" font-weight="700" font-size="9" fill="#38bdf8">AUTO-ROTATE IP INTERVAL: EVERY 15 MINUTES | ZERO FOOTPRINT</text>
          </g>
        </svg>
      `)}`,
      icon: Globe,
      badge: "PROXY SHIELD"
    },
    {
      id: 4,
      step: "STAGE 04",
      title: "4. DM Automation",
      description: "Keyword-triggered lead bots send instant links directly in DMs.",
      image: `data:image/svg+xml;utf8,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 960" width="100%" height="100%">
          <defs>
            <radialGradient id="serverBg" cx="50%" cy="40%" r="85%">
              <stop offset="0%" stop-color="#121829" />
              <stop offset="60%" stop-color="#080c17" />
              <stop offset="100%" stop-color="#020409" />
            </radialGradient>
            <linearGradient id="phoneBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#1e293b" />
              <stop offset="50%" stop-color="#0f172a" />
              <stop offset="100%" stop-color="#020617" />
            </linearGradient>
            <linearGradient id="phoneScreenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#0a0f1d" />
              <stop offset="50%" stop-color="#060913" />
              <stop offset="100%" stop-color="#03050a" />
            </linearGradient>
            <filter id="glowCyanBot" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glowGreenBot" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <!-- Background Server Room Chamber -->
          <rect width="540" height="960" fill="url(#serverBg)" />

          <!-- Background Glass Server Cabinets (Right Side) -->
          <g opacity="0.35">
            <rect x="360" y="40" width="160" height="380" rx="12" fill="#030712" stroke="#38bdf8" stroke-width="1.5" />
            <!-- Server Units -->
            <line x1="370" y1="90" x2="510" y2="90" stroke="#1e293b" stroke-width="2" />
            <line x1="370" y1="140" x2="510" y2="140" stroke="#1e293b" stroke-width="2" />
            <line x1="370" y1="190" x2="510" y2="190" stroke="#1e293b" stroke-width="2" />
            <line x1="370" y1="240" x2="510" y2="240" stroke="#1e293b" stroke-width="2" />
            <!-- Server LED Indicators -->
            <circle cx="380" cy="70" r="3" fill="#10b981" />
            <circle cx="390" cy="70" r="3" fill="#10b981" />
            <circle cx="400" cy="70" r="3" fill="#00f0ff" />
            <circle cx="380" cy="120" r="3" fill="#10b981" />
            <circle cx="390" cy="120" r="3" fill="#00f0ff" />
            <circle cx="380" cy="170" r="3" fill="#10b981" />
            <circle cx="390" cy="170" r="3" fill="#10b981" />
          </g>

          <!-- Bottom Futuristic Circuit Board Platform -->
          <g opacity="0.45">
            <polygon points="0,720 540,680 540,960 0,960" fill="#080e1b" />
            <!-- Circuit Microchip -->
            <rect x="30" y="770" width="140" height="110" rx="8" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5" />
            <!-- Circuit Traces -->
            <path d="M 0,820 L 30,820 M 170,820 L 250,820 M 100,770 L 100,720 M 100,880 L 100,940" stroke="#00f0ff" stroke-width="2" />
            <path d="M 170,850 L 320,850 M 170,790 L 280,790" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="4 4" />
          </g>

          <!-- Hand Holding Phone Silhouette Contour -->
          <path d="M 80,520 C 60,540 50,600 110,640 C 130,650 160,630 180,680 C 200,720 280,820 400,880 C 480,920 540,880 540,780 C 540,600 480,480 380,420 C 330,390 280,420 250,470 Z" fill="#1e293b" opacity="0.3" />

          <!-- SMARTPHONE DEVICE CONTAINER (Slight Angle Tilt) -->
          <g id="smartphone" transform="translate(100, 160) rotate(-4)">
            <!-- Outer Phone Chassis & Bezel -->
            <rect x="0" y="0" width="340" height="660" rx="42" fill="url(#phoneBodyGrad)" stroke="#475569" stroke-width="4" filter="url(#glowCyanBot)" />
            <rect x="8" y="8" width="324" height="644" rx="36" fill="url(#phoneScreenGrad)" stroke="#00f0ff" stroke-width="1.5" opacity="0.8" />

            <!-- Dynamic Island / Notch -->
            <rect x="110" y="22" width="120" height="26" rx="13" fill="#020617" />
            <circle cx="205" cy="35" r="5" fill="#1e293b" />

            <!-- Phone Header Status Bar -->
            <text x="35" y="40" font-family="sans-serif" font-weight="800" font-size="12" fill="#ffffff">9:41</text>
            <!-- Wifi & Battery Icons -->
            <path d="M 280,30 Q 290,24 300,30 M 284,34 Q 290,30 296,34 M 288,38 A 2 2 0 1 0 292,38" stroke="#ffffff" stroke-width="1.5" fill="none" />

            <!-- Screen Header Button: AUTOMATED CHATBOT FLOW -->
            <g transform="translate(25, 75)">
              <rect x="0" y="0" width="220" height="34" rx="17" fill="#0f172a" stroke="#334155" stroke-width="1.5" />
              <path d="M 18,17 L 24,11 M 18,17 L 24,23" stroke="#94a3b8" stroke-width="2" fill="none" />
              <text x="38" y="21" font-family="monospace" font-weight="900" font-size="10" fill="#ffffff" letter-spacing="0.5">AUTOMATED CHATBOT FLOW</text>
            </g>

            <!-- FLOW CHART VERTICAL CONNECTORS & NODES -->
            <g transform="translate(30, 135)">
              <!-- 1. COMMENT RECEIVED NODE -->
              <g transform="translate(35, 0)">
                <rect x="0" y="0" width="210" height="46" rx="23" fill="#091322" stroke="#00f0ff" stroke-width="1.8" filter="url(#glowCyanBot)" />
                <path d="M 24,23 C 24,18 28,15 33,15 L 41,15 C 46,15 50,18 50,23 C 50,28 46,31 41,31 L 33,31 Z" fill="none" stroke="#00f0ff" stroke-width="1.5" />
                <text x="60" y="28" font-family="monospace" font-weight="900" font-size="11" fill="#38bdf8" letter-spacing="0.5">COMMENT RECEIVED</text>
              </g>

              <!-- Arrow 1 -> 2 -->
              <path d="M 140,46 L 140,80" stroke="#00f0ff" stroke-width="2" stroke-dasharray="4 3" />
              <polygon points="136,78 140,85 144,78" fill="#00f0ff" />

              <!-- 2. KEYWORD DETECTED NODE (GLOWING GREEN) -->
              <g transform="translate(25, 85)">
                <rect x="0" y="0" width="230" height="50" rx="25" fill="#042114" stroke="#10b981" stroke-width="2.5" filter="url(#glowGreenBot)" />
                <!-- Cursor Click Icon -->
                <path d="M 26,18 L 38,30 L 32,32 L 36,40 L 32,42 L 28,34 L 22,38 Z" fill="#10b981" />
                <text x="52" y="30" font-family="sans-serif" font-weight="900" font-size="12" fill="#34d399" letter-spacing="0.5">KEYWORD DETECTED</text>
              </g>

              <!-- Arrow 2 -> 3 -->
              <path d="M 140,135 L 140,170" stroke="#10b981" stroke-width="2" />
              <polygon points="136,168 140,175 144,168" fill="#10b981" />

              <!-- 3. AI REPLY SENT NODE -->
              <g transform="translate(45, 175)">
                <rect x="0" y="0" width="190" height="44" rx="22" fill="#091322" stroke="#38bdf8" stroke-width="1.5" />
                <circle cx="25" cy="22" r="8" fill="#00f0ff" opacity="0.8" />
                <text x="44" y="27" font-family="monospace" font-weight="900" font-size="11" fill="#ffffff">AI REPLY SENT</text>
              </g>

              <!-- Arrow Split 3 -> 4 -->
              <path d="M 140,219 L 140,235 Q 140,245 120,245 L 80,245 Q 60,245 60,255 L 60,265" fill="none" stroke="#00f0ff" stroke-width="1.5" />
              <path d="M 140,219 L 140,235 Q 140,245 160,245 L 200,245 Q 220,245 220,255 L 220,265" fill="none" stroke="#10b981" stroke-width="2" />

              <!-- 4. HIGH-TICKET LEAD QUALIFIED NODE (GLOWING GREEN) -->
              <g transform="translate(10, 265)">
                <rect x="0" y="0" width="260" height="52" rx="26" fill="#042114" stroke="#10b981" stroke-width="2.5" filter="url(#glowGreenBot)" />
                <!-- Checkmark Icon -->
                <circle cx="28" cy="26" r="10" fill="#10b981" />
                <path d="M 23,26 L 27,30 L 33,22" stroke="#020617" stroke-width="2.5" fill="none" />
                <text x="46" y="31" font-family="sans-serif" font-weight="900" font-size="11" fill="#34d399" letter-spacing="0.5">HIGH-TICKET LEAD QUALIFIED</text>
              </g>

              <!-- Arrow 4 -> 5 -->
              <path d="M 140,317 L 140,345" stroke="#10b981" stroke-width="2" />
              <polygon points="136,343 140,350 144,343" fill="#10b981" />

              <!-- 5. DM POP-UP ACTIVATED NODE -->
              <g transform="translate(35, 350)">
                <rect x="0" y="0" width="210" height="46" rx="23" fill="#091322" stroke="#00f0ff" stroke-width="1.8" filter="url(#glowCyanBot)" />
                <!-- Megaphone Icon -->
                <path d="M 22,23 L 30,18 L 30,28 Z M 30,21 L 36,21 L 36,25 L 30,25 Z" fill="#00f0ff" />
                <text x="44" y="28" font-family="monospace" font-weight="900" font-size="10" fill="#00f0ff" letter-spacing="0.5">DM POP-UP ACTIVATED</text>
              </g>
            </g>

            <!-- Bottom Home Indicator Bar -->
            <rect x="100" y="628" width="140" height="5" rx="2.5" fill="#ffffff" opacity="0.8" />
          </g>

          <!-- FLOATING 3D NOTIFICATION BADGES OVERLAY -->
          <!-- Top Left Popup: New High-Ticket Lead! -->
          <g transform="translate(15, 260)">
            <rect x="0" y="0" width="165" height="45" rx="22" fill="#020617" fill-opacity="0.95" stroke="#38bdf8" stroke-width="2" filter="url(#glowCyanBot)" />
            <text x="20" y="27" font-family="sans-serif" font-weight="800" font-size="11" fill="#ffffff">New High-Ticket Lead!</text>
          </g>

          <!-- Top Right Popup: New High-Ticket Lead! -->
          <g transform="translate(330, 240)">
            <rect x="0" y="0" width="165" height="45" rx="22" fill="#020617" fill-opacity="0.95" stroke="#38bdf8" stroke-width="2" filter="url(#glowCyanBot)" />
            <text x="20" y="27" font-family="sans-serif" font-weight="800" font-size="11" fill="#ffffff">New High-Ticket Lead!</text>
          </g>

          <!-- Middle Right Popup: Conversion Alert! -->
          <g transform="translate(360, 480)">
            <rect x="0" y="0" width="145" height="42" rx="21" fill="#042114" fill-opacity="0.95" stroke="#10b981" stroke-width="2" filter="url(#glowGreenBot)" />
            <text x="18" y="26" font-family="sans-serif" font-weight="900" font-size="11" fill="#34d399">Conversion Alert!</text>
          </g>

          <!-- Bottom Left Popup: Conversion Alert! -->
          <g transform="translate(25, 620)">
            <rect x="0" y="0" width="145" height="42" rx="21" fill="#020617" fill-opacity="0.95" stroke="#00f0ff" stroke-width="2" filter="url(#glowCyanBot)" />
            <text x="18" y="26" font-family="sans-serif" font-weight="900" font-size="11" fill="#00f0ff">Conversion Alert!</text>
          </g>
        </svg>
      `)}`,
      icon: Bot,
      badge: "INSTANT BOT"
    },
    {
      id: 5,
      step: "STAGE 05",
      title: "5. Live Analytics",
      description: "Real-time telemetry tracking views, audience retention & lead conversions.",
      image: `data:image/svg+xml;utf8,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 960" width="100%" height="100%">
          <defs>
            <radialGradient id="analyticsBg" cx="50%" cy="30%" r="90%">
              <stop offset="0%" stop-color="#0c1729" />
              <stop offset="55%" stop-color="#050a14" />
              <stop offset="100%" stop-color="#020308" />
            </radialGradient>
            <linearGradient id="chartFill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#00f0ff" stop-opacity="0.45" />
              <stop offset="60%" stop-color="#3b82f6" stop-opacity="0.15" />
              <stop offset="100%" stop-color="#00f0ff" stop-opacity="0" />
            </linearGradient>
            <linearGradient id="metalConsole" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#2d3748" />
              <stop offset="30%" stop-color="#1a202c" />
              <stop offset="100%" stop-color="#080c14" />
            </linearGradient>
            <filter id="glowCyanLive" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="b1" />
              <feMerge>
                <feMergeNode in="b1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glowRedLive" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="b2" />
              <feMerge>
                <feMergeNode in="b2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glowPurpleLive" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="b3" />
              <feMerge>
                <feMergeNode in="b3" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <!-- Dark Sci-Fi Chamber Background -->
          <rect width="540" height="960" fill="url(#analyticsBg)" />

          <!-- Ceiling Structure & Overhead Neon Lights -->
          <polygon points="110,0 270,0 230,45 130,45" fill="#ffffff" opacity="0.9" filter="url(#glowCyanLive)" />
          <polygon points="310,0 460,0 420,45 330,45" fill="#ffffff" opacity="0.9" filter="url(#glowCyanLive)" />
          <path d="M 0,110 L 540,110 M 0,160 L 540,160" stroke="#1e293b" stroke-width="2" opacity="0.6" />

          <!-- SIDE MONITOR LEFT: 3D WIREFRAME MESH TERRAIN -->
          <g transform="translate(-50, 240) rotate(8)">
            <rect x="0" y="0" width="150" height="320" rx="10" fill="#020617" fill-opacity="0.88" stroke="#38bdf8" stroke-width="1.5" filter="url(#glowCyanLive)" />
            <text x="12" y="24" font-family="monospace" font-weight="900" font-size="8" fill="#38bdf8">3D MESH TOPOLOGY</text>
            <!-- Wireframe Topographical Grid -->
            <g transform="translate(15, 40)" opacity="0.85">
              <polygon points="10,60 60,10 110,60 60,110" fill="none" stroke="#00f0ff" stroke-width="1" />
              <polygon points="20,60 60,20 100,60 60,100" fill="none" stroke="#c084fc" stroke-width="1" />
              <polygon points="35,60 60,35 85,60 60,85" fill="none" stroke="#f43f5e" stroke-width="1" />
              <line x1="10" y1="60" x2="110" y2="60" stroke="#00f0ff" stroke-width="1" />
              <line x1="60" y1="10" x2="60" y2="110" stroke="#00f0ff" stroke-width="1" />
            </g>
            <!-- Lower 3D Wave Grid -->
            <path d="M 10,180 Q 35,160 60,190 T 110,170 T 140,200" fill="none" stroke="#00f0ff" stroke-width="1.5" />
            <path d="M 10,200 Q 35,180 60,210 T 110,190 T 140,220" fill="none" stroke="#38bdf8" stroke-width="1" />
            <path d="M 10,220 Q 35,200 60,230 T 110,210 T 140,240" fill="none" stroke="#c084fc" stroke-width="1" />
          </g>

          <!-- SIDE MONITOR RIGHT: VERTICAL TELEMETRY STREAM -->
          <g transform="translate(450, 130) rotate(-6)">
            <rect x="0" y="0" width="130" height="480" rx="10" fill="#020617" fill-opacity="0.88" stroke="#00f0ff" stroke-width="1.5" filter="url(#glowCyanLive)" />
            <text x="10" y="24" font-family="monospace" font-weight="900" font-size="8" fill="#00f0ff">ANALYTICS DATA</text>
            <text x="10" y="40" font-family="monospace" font-weight="800" font-size="9" fill="#ffffff">GLOBAL VIEWS</text>
            <!-- Bar Chart Telemetry -->
            <rect x="10" y="55" width="80" height="6" fill="#00f0ff" />
            <rect x="10" y="68" width="95" height="6" fill="#38bdf8" />
            <rect x="10" y="81" width="60" height="6" fill="#c084fc" />
            <rect x="10" y="94" width="105" height="6" fill="#f43f5e" />
            <!-- 3D Mesh Snapshot -->
            <polygon points="10,200 60,150 110,200 60,250" fill="none" stroke="#00f0ff" stroke-width="1" />
            <path d="M 10,300 Q 60,260 110,310" fill="none" stroke="#c084fc" stroke-width="1.5" />
          </g>

          <!-- MAIN CENTRAL HUD SCREEN: SCI-FI TELEMETRY DASHBOARD -->
          <g id="mainDashboard" transform="translate(85, 140)">
            <!-- Outer Curved Glass Frame -->
            <rect x="0" y="0" width="370" height="420" rx="14" fill="#030712" fill-opacity="0.9" stroke="#00f0ff" stroke-width="2.5" filter="url(#glowCyanLive)" />
            <rect x="3" y="3" width="364" height="414" rx="11" fill="none" stroke="#c084fc" stroke-width="1.5" opacity="0.8" filter="url(#glowPurpleLive)" />

            <!-- Dashboard Title bar -->
            <text x="16" y="24" font-family="monospace" font-weight="900" font-size="10" fill="#38bdf8" letter-spacing="1">ANALYTICS &amp; METRICS</text>

            <!-- SECTION 1: GLOBAL VIEW COUNT (MAIN EXPONENTIAL VIRAL GRAPH) -->
            <g transform="translate(14, 38)">
              <rect x="0" y="0" width="210" height="230" rx="8" fill="#020617" fill-opacity="0.95" stroke="#1e293b" stroke-width="1" />
              <text x="10" y="18" font-family="monospace" font-weight="900" font-size="9" fill="#00f0ff" letter-spacing="0.5">GLOBAL VIEW COUNT</text>

              <!-- Grid Lines -->
              <line x1="10" y1="40" x2="200" y2="40" stroke="#0f172a" stroke-width="1" stroke-dasharray="2 2" />
              <line x1="10" y1="80" x2="200" y2="80" stroke="#0f172a" stroke-width="1" stroke-dasharray="2 2" />
              <line x1="10" y1="120" x2="200" y2="120" stroke="#0f172a" stroke-width="1" stroke-dasharray="2 2" />
              <line x1="10" y1="160" x2="200" y2="160" stroke="#0f172a" stroke-width="1" stroke-dasharray="2 2" />
              <line x1="10" y1="200" x2="200" y2="200" stroke="#0f172a" stroke-width="1" stroke-dasharray="2 2" />

              <!-- Y-Axis Labels -->
              <text x="12" y="44" font-family="monospace" font-size="6" fill="#64748b">2.0M</text>
              <text x="12" y="84" font-family="monospace" font-size="6" fill="#64748b">1.5M</text>
              <text x="12" y="124" font-family="monospace" font-size="6" fill="#64748b">1.0M</text>
              <text x="12" y="164" font-family="monospace" font-size="6" fill="#64748b">500K</text>

              <!-- Filled Area Under Curve -->
              <path d="M 20,200 Q 80,198 120,185 T 160,140 T 180,90 L 195,35 L 195,200 Z" fill="url(#chartFill)" />

              <!-- Main Exponential Line Graph Path -->
              <path d="M 20,200 Q 70,198 100,190 T 130,175 T 150,150 T 165,120 T 178,80 L 195,35" fill="none" stroke="#00f0ff" stroke-width="2.5" filter="url(#glowCyanLive)" />

              <!-- Peak Dot & Metric Callout -->
              <circle cx="195" cy="35" r="5" fill="#ffffff" stroke="#00f0ff" stroke-width="2" filter="url(#glowCyanLive)" />
              <text x="145" y="30" font-family="monospace" font-weight="900" font-size="9" fill="#00f0ff">38,100 /s</text>

              <!-- X-Axis Timestamps -->
              <text x="30" y="215" font-family="monospace" font-size="6" fill="#64748b">12:00</text>
              <text x="80" y="215" font-family="monospace" font-size="6" fill="#64748b">18:00</text>
              <text x="130" y="215" font-family="monospace" font-size="6" fill="#64748b">22:00</text>
              <text x="170" y="215" font-family="monospace" font-size="6" fill="#00f0ff">NOW</text>
            </g>

            <!-- SECTION 2: UPPER RIGHT AUDIENCE RETENTION -->
            <g transform="translate(232, 38)">
              <rect x="0" y="0" width="124" height="110" rx="8" fill="#020617" fill-opacity="0.95" stroke="#1e293b" stroke-width="1" />
              <text x="8" y="15" font-family="monospace" font-weight="900" font-size="7.5" fill="#a5f3fc">AUDIENCE RETENTION</text>

              <!-- Decay Curve (Cyan) -->
              <path d="M 12,30 Q 22,80 60,82 T 112,85" fill="none" stroke="#00f0ff" stroke-width="2" filter="url(#glowCyanLive)" />
              <path d="M 12,30 Q 30,65 70,72 T 112,78" fill="none" stroke="#38bdf8" stroke-width="1.5" opacity="0.7" />

              <text x="10" y="102" font-family="monospace" font-size="6" fill="#64748b">0s        12s        36s       55s</text>
            </g>

            <!-- SECTION 3: MIDDLE RIGHT AUDIENCE RETENTION -->
            <g transform="translate(232, 158)">
              <rect x="0" y="0" width="124" height="110" rx="8" fill="#020617" fill-opacity="0.95" stroke="#1e293b" stroke-width="1" />
              <text x="8" y="15" font-family="monospace" font-weight="900" font-size="7.5" fill="#f43f5e">AUDIENCE RETENTION</text>

              <!-- Decay Curve (Red/Magenta) -->
              <path d="M 12,30 Q 25,75 65,82 T 112,86" fill="none" stroke="#f43f5e" stroke-width="2" filter="url(#glowRedLive)" />
              <path d="M 12,30 Q 20,50 60,65 T 112,72" fill="none" stroke="#00f0ff" stroke-width="1.5" opacity="0.8" />

              <text x="10" y="102" font-family="monospace" font-size="6" fill="#64748b">0s        12s        36s       55s</text>
            </g>

            <!-- SECTION 4: LOWER LEFT AUDIENCE RETENTION (SMALL 1) -->
            <g transform="translate(14, 278)">
              <rect x="0" y="0" width="100" height="125" rx="8" fill="#020617" fill-opacity="0.95" stroke="#1e293b" stroke-width="1" />
              <text x="6" y="14" font-family="monospace" font-weight="800" font-size="6.5" fill="#f43f5e">AUDIENCE RETENTION</text>
              <path d="M 10,30 Q 20,70 50,80 T 90,88" fill="none" stroke="#f43f5e" stroke-width="1.8" filter="url(#glowRedLive)" />
            </g>

            <!-- SECTION 5: LOWER MIDDLE AUDIENCE RETENTION (SMALL 2) -->
            <g transform="translate(122, 278)">
              <rect x="0" y="0" width="102" height="125" rx="8" fill="#020617" fill-opacity="0.95" stroke="#1e293b" stroke-width="1" />
              <text x="6" y="14" font-family="monospace" font-weight="800" font-size="6.5" fill="#38bdf8">AUDIENCE RETENTION</text>
              <path d="M 10,30 Q 18,55 45,72 T 92,80" fill="none" stroke="#00f0ff" stroke-width="1.8" filter="url(#glowCyanLive)" />
              <path d="M 10,30 Q 30,80 60,88 T 92,92" fill="none" stroke="#f43f5e" stroke-width="1.5" />
            </g>

            <!-- SECTION 6: LOWER RIGHT VIRAL SCORE DUAL DENSITY GAUGES -->
            <g transform="translate(232, 278)">
              <rect x="0" y="0" width="124" height="125" rx="8" fill="#020617" fill-opacity="0.95" stroke="#f43f5e" stroke-width="1.5" filter="url(#glowRedLive)" />
              <text x="8" y="16" font-family="sans-serif" font-weight="900" font-size="8" fill="#ffffff">VIRAL SCORE: <tspan fill="#f43f5e">CRITICAL</tspan></text>
              <text x="8" y="27" font-family="monospace" font-size="6" fill="#94a3b8">REAL-TIME VIRALITY ENGINE</text>

              <!-- Left Dial Gauge (Red) -->
              <g transform="translate(30, 72)">
                <circle cx="0" cy="0" r="22" fill="none" stroke="#1e293b" stroke-width="5" />
                <circle cx="0" cy="0" r="22" fill="none" stroke="#f43f5e" stroke-width="5" stroke-dasharray="100 38" stroke-linecap="round" filter="url(#glowRedLive)" />
                <line x1="0" y1="0" x2="12" y2="-12" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" />
                <circle cx="0" cy="0" r="4" fill="#f43f5e" />
              </g>

              <!-- Right Dial Gauge (Cyan) -->
              <g transform="translate(90, 72)">
                <circle cx="0" cy="0" r="22" fill="none" stroke="#1e293b" stroke-width="5" />
                <circle cx="0" cy="0" r="22" fill="none" stroke="#00f0ff" stroke-width="5" stroke-dasharray="115 25" stroke-linecap="round" filter="url(#glowCyanLive)" />
                <line x1="0" y1="0" x2="14" y2="-10" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" />
                <circle cx="0" cy="0" r="4" fill="#00f0ff" />
              </g>
            </g>
          </g>

          <!-- METALLIC WORKSTATION DESK SURFACE & PLUGGED CABLE WIRES -->
          <g id="metallicDeskConsole">
            <polygon points="0,640 540,590 540,960 0,960" fill="url(#metalConsole)" />
            <path d="M 0,640 Q 270,610 540,590" stroke="#00f0ff" stroke-width="3" filter="url(#glowCyanLive)" fill="none" />

            <!-- Cable Connectors / Patch Sockets on Desk -->
            <rect x="250" y="625" width="80" height="25" rx="4" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5" />
            <circle cx="265" cy="637" r="5" fill="#020617" stroke="#00f0ff" stroke-width="1" />
            <circle cx="290" cy="637" r="5" fill="#020617" stroke="#00f0ff" stroke-width="1" />
            <circle cx="315" cy="637" r="5" fill="#020617" stroke="#00f0ff" stroke-width="1" />

            <!-- Curved Optical Data Cables Across Desk -->
            <path d="M 160,720 C 220,680 250,640 265,637" fill="none" stroke="#020617" stroke-width="6" />
            <path d="M 160,720 C 220,680 250,640 265,637" fill="none" stroke="#00f0ff" stroke-width="2.5" filter="url(#glowCyanLive)" />

            <path d="M 180,750 C 240,710 270,650 290,637" fill="none" stroke="#020617" stroke-width="6" />
            <path d="M 180,750 C 240,710 270,650 290,637" fill="none" stroke="#c084fc" stroke-width="2.5" filter="url(#glowPurpleLive)" />

            <path d="M 200,780 C 260,730 290,660 315,637" fill="none" stroke="#020617" stroke-width="6" />
            <path d="M 200,780 C 260,730 290,660 315,637" fill="none" stroke="#f43f5e" stroke-width="2.5" filter="url(#glowRedLive)" />

            <!-- FOREGROUND STUDIO MIXER DECK (Angle Perspective) -->
            <g transform="translate(240, 710) rotate(-12)">
              <rect x="0" y="0" width="280" height="180" rx="12" fill="#0f172a" stroke="#334155" stroke-width="2" />
              <!-- Mixer Knobs -->
              <circle cx="240" cy="30" r="12" fill="#1e293b" stroke="#00f0ff" stroke-width="2" />
              <line x1="240" y1="30" x2="240" y2="20" stroke="#00f0ff" stroke-width="3" />

              <circle cx="240" cy="70" r="12" fill="#1e293b" stroke="#f43f5e" stroke-width="2" />
              <line x1="240" y1="70" x2="248" y2="64" stroke="#f43f5e" stroke-width="3" />

              <!-- Illuminated Screen on Control Surface -->
              <rect x="30" y="30" width="170" height="100" rx="8" fill="#020617" stroke="#00f0ff" stroke-width="1.5" />
              <path d="M 40,80 Q 80,40 120,60 T 180,50" fill="none" stroke="#f43f5e" stroke-width="2" />
              <path d="M 40,100 Q 80,70 120,90 T 180,70" fill="none" stroke="#00f0ff" stroke-width="2" />
            </g>
          </g>
        </svg>
      `)}`,
      icon: BarChart3,
      badge: "LIVE SYNC"
    }
  ];

  return (
    <section 
      id="how-it-works-workflow" 
      className="relative z-10 py-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#121212]"
    >
      {/* Header Title Section */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h2 className="text-2xl sm:text-4xl font-black text-[#38bdf8] uppercase tracking-tight font-mono drop-shadow-[0_0_20px_rgba(56,189,248,0.4)]">
          How The Engine Works
        </h2>
        <p className="mt-2 text-sm sm:text-base text-white font-bold max-w-xl mx-auto">
          A 5-stage automated pipeline to scale your faceless channels effortlessly.
        </p>
      </div>

      {/* 5-CARD GALLERY WITH ENLARGED AI IMAGES AND HUGE BOLD TYPOGRAPHY */}
      <div className="py-2 w-full">
        <div 
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "16px",
            width: "100%",
            maxWidth: "1150px",
            margin: "0 auto"
          }}
          className="max-lg:grid-cols-3 max-sm:grid-cols-1"
        >
          {steps.map((button) => {
            const IconComponent = button.icon;
            return (
              <div 
                key={button.id}
                onClick={onStartGenerating}
                style={{ 
                  minHeight: "390px",
                  background: "#121212",
                  border: "2px solid rgba(56, 189, 248, 0.45)",
                  borderRadius: "16px",
                  display: "flex",
                  flexDirection: "column",
                  padding: "12px",
                  overflow: "hidden"
                }}
                className="relative group transition-all duration-300 cursor-pointer hover:-translate-y-1.5 hover:border-[#38bdf8] hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] bg-[#121212]"
              >
                {/* Header Title Bar */}
                <div 
                  className="relative z-10 w-full shrink-0 flex items-center justify-center gap-2 mb-2.5"
                >
                  <div className="p-1.5 rounded-md bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                    <IconComponent className="h-4 w-4 text-cyan-300" />
                  </div>
                  <h3 
                    className="text-[10px] sm:text-[11px] font-black text-white uppercase tracking-tight font-mono truncate group-hover:text-[#38bdf8] transition-colors"
                  >
                    {button.title}
                  </h3>
                </div>

                {/* Dominated AI Visual Image Header Banner */}
                <div 
                  className="relative w-full h-48 sm:h-52 rounded-xl overflow-hidden shrink-0 border border-cyan-400/50 group-hover:border-cyan-300 transition-colors shadow-lg"
                >
                  <img 
                    src={button.image} 
                    alt={button.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />

                  {/* Stage Tag Overlay */}
                  <div className="absolute top-2 left-2 z-10">
                    <span className="text-[9.5px] font-mono font-black text-white bg-blue-600 px-2 py-0.5 rounded-md border border-cyan-300 uppercase tracking-widest shadow-md">
                      {button.step}
                    </span>
                  </div>

                  {/* Badge Overlay */}
                  <div className="absolute bottom-2 left-2 z-10">
                    <span className="text-[9px] font-mono font-black text-cyan-300 bg-slate-950/90 px-2 py-0.5 rounded-md border border-cyan-400/60 uppercase tracking-wider flex items-center gap-1 shadow">
                      <Sparkles className="w-2.5 h-2.5 text-cyan-300" />
                      {button.badge}
                    </span>
                  </div>
                </div>

                {/* Massive Bold White Text & CTA Area */}
                <div 
                  className="relative z-10 flex-1 flex flex-col justify-between pt-3 space-y-3"
                >
                  <p className="text-xs sm:text-sm font-extrabold text-white leading-snug drop-shadow">
                    {button.description}
                  </p>

                  {/* Bottom Action CTA link */}
                  <div className="pt-2.5 border-t border-white/20 flex items-center justify-between text-xs font-mono font-black text-cyan-300 group-hover:text-white transition-colors">
                    <span className="uppercase tracking-wider">Get Started</span>
                    <ArrowRight className="w-4 h-4 text-cyan-300 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Pipeline Ribbon */}
      <div className="mt-6 max-w-[1150px] mx-auto rounded-xl border border-cyan-400/30 bg-[#121212] px-5 py-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-white shadow-lg">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4.5 h-4.5 text-cyan-300" />
          <span className="font-extrabold uppercase tracking-wider text-white text-xs sm:text-sm">End-to-End Faceless Channel Pipeline</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-bold text-white">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" /> 10x Batch</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" /> Zero Editing</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" /> Proxies</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" /> DM Bot</span>
        </div>
      </div>
    </section>
  );
}
