@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800;900&family=Heebo:wght@300;400;500;700;800;900&family=Rubik:wght@300;400;500;600;700;800;900&family=Assistant:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Inter", system-ui, -apple-system, sans-serif;
  --font-display: "Inter", system-ui, -apple-system, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;

  --color-brand-cyan: #0055FF;
  --color-brand-blue: #0055FF;
  --color-brand-bg: #0f172a;
  --color-brand-gray: #f1f5f9;
}

/* Global Typography Wipe & Unification */
body, html, * {
  font-family: "Inter", system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Code elements use true monospace */
code, pre, .font-mono, [class*="font-mono"] {
  font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace !important;
}

/* Base Typographic Hierarchy Defaults */
h1, h2, .text-display-gradient {
  font-family: "Inter", system-ui, -apple-system, sans-serif !important;
  font-weight: 800 !important;
  letter-spacing: -0.03em !important;
  background: linear-gradient(90deg, #FFFFFF, #0055FF) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  display: inline-block;
}

h3, h4, h5, h6 {
  font-family: "Inter", system-ui, -apple-system, sans-serif !important;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: #FFFFFF !important;
}

/* Dreamy Tech Layout and Theme Globals */
body, html {
  background: radial-gradient(circle at 50% 0%, #1e293b 0%, #0f172a 50%, #020617 100%) !important;
  background-attachment: fixed !important;
  background-size: cover !important;
  color: #f1f5f9;
}

/* Scrollbar Style Rebuild with Dreamy Glow */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: rgba(7, 10, 19, 0.5);
}
::-webkit-scrollbar-thumb {
  background: rgba(0, 85, 255, 0.25);
  border-radius: 9999px;
  box-shadow: 0 0 10px rgba(0, 85, 255, 0.2);
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 85, 255, 0.5);
}

/* Teleprompter scrolling utility */
.teleprompter-active {
  font-family: var(--font-display);
}

/* Background grid utility */
.grid-bg {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(0, 85, 255, 0.05) 1.2px, transparent 1.2px);
  background-size: 24px 24px;
  z-index: 0;
  opacity: 0.75;
  pointer-events: none;
}

/* Primary Gradient Background & Glowing Shadows */
.dreamy-gradient {
  background: linear-gradient(135deg, #0055FF, #FFFFFF) !important;
}

.dreamy-glow {
  box-shadow: 0 0 15px rgba(0, 85, 255, 0.5) !important;
}

/* Checkout Button Styling */
.checkout-btn, a.checkout-btn {
  background-color: #0070f3 !important;
  background: linear-gradient(135deg, #0070f3, #00c6ff) !important;
  color: #ffffff !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 12px 24px !important;
  border-radius: 8px !important;
  text-decoration: none !important;
  font-weight: bold !important;
}

/* Restoring the size of the plan buttons on pricing pages to normal */
.plan-selector-btn, 
.spark-plan, .growth-plan, .velocity-plan, .empire-plan {
    max-width: 100% !important;
    padding: 10px 16px !important;
    font-size: 14px !important;
    box-sizing: border-box !important;
}

/* Compact and small plan buttons inside scheduler and analytics plan cards */
.plan-card-button,
.plan-cards-grid .plan-card-button,
.plan-card a.checkout-btn,
.plan-cards-grid a.checkout-btn {
    padding: 4px 8px !important;
    font-size: 10px !important;
    font-weight: 800 !important;
    height: 24px !important;
    max-height: 24px !important;
    border-radius: 6px !important;
    box-sizing: border-box !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    line-height: 1 !important;
    letter-spacing: 0.05em !important;
}

/* Fixing the Admin Mode button display in analytics and scheduler so it doesn't blend into the black background when not hovered */
.admin-mode-btn, 
[class*="admin-mode"],
#admin-dropdown-toggle {
    background-color: #1e293b !important;
    color: #ffffff !important;
    border: 1px solid #3b82f6 !important;
    opacity: 1 !important;
    visibility: visible !important;
}

.admin-mode-btn:hover, 
[class*="admin-mode"]:hover,
#admin-dropdown-toggle:hover {
    background-color: #3b82f6 !important;
    color: #ffffff !important;
}

/* Enforcing Theme Gradient and Glow on all buttons (including plan, standard, and auth buttons) */
button, 
.glow-btn, 
.plan-card-button, 
.plan-button, 
.get-started-button,
[role="button"].glow {
  background: linear-gradient(135deg, #0055FF, #FFFFFF) !important;
  color: #000000 !important;
  font-weight: 800 !important;
  text-shadow: none !important;
  border: none !important;
  outline: none !important;
  box-shadow: 0 4px 15px rgba(0, 85, 255, 0.3) !important;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

button:hover, 
.glow-btn:hover, 
.plan-card-button:hover, 
.plan-button:hover,
.get-started-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(0, 85, 255, 0.5) !important;
  opacity: 0.95;
  background: linear-gradient(135deg, #0055FF, #FFFFFF) !important;
  color: #000000 !important;
}

button:active, 
.glow-btn:active, 
.plan-card-button:active, 
.plan-button:active,
.get-started-button:active {
  transform: translateY(1px);
  box-shadow: 0 0 10px rgba(0, 85, 255, 0.3) !important;
}

/* Specific resets for secondary/neutral/ghost/icon buttons to let them look clean and not fully gradient-filled */
button.secondary-btn,
button.bg-transparent,
button.bg-neutral-900,
button.border-white\/10,
.secondary-button,
.sidebar-nav-item,
[role="tab"] {
  background: rgba(255, 255, 255, 0.02) !important;
  color: #f1f5f9 !important;
  box-shadow: none !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
}

button.secondary-btn:hover,
button.bg-transparent:hover,
button.bg-neutral-900:hover,
.secondary-button:hover,
.sidebar-nav-item:hover,
[role="tab"]:hover {
  background: rgba(0, 85, 255, 0.08) !important;
  border-color: rgba(0, 85, 255, 0.4) !important;
  box-shadow: 0 0 15px rgba(0, 85, 255, 0.15) !important;
}

/* Active tab state */
[role="tab"][aria-selected="true"],
.active-tab,
.sidebar-nav-item-active {
  background: rgba(0, 85, 255, 0.12) !important;
  border-color: #0055FF !important;
  color: #0055FF !important;
  box-shadow: 0 0 15px rgba(0, 85, 255, 0.2) !important;
}

/* Accents, borders, and input fields */
.glow-border, .border-techblue {
  border-color: rgba(0, 85, 255, 0.3) !important;
  box-shadow: 0 0 15px rgba(0, 85, 255, 0.15) !important;
}

.glow-text, .text-techblue {
  color: #0055FF !important;
  text-shadow: 0 0 10px rgba(0, 85, 255, 0.4) !important;
}

/* Text Gradients mapping */
.text-gradient {
  background: linear-gradient(90deg, #0055FF, #3b82f6) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
}

/* Glassmorphism styling with soft cyan glow border */
.glass-card {
  background: rgba(15, 23, 42, 0.45) !important;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(0, 85, 255, 0.12);
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
}

.glass-card:hover {
  background: rgba(15, 23, 42, 0.7) !important;
  border-color: rgba(0, 85, 255, 0.35);
  box-shadow: 0 0 25px rgba(0, 85, 255, 0.2), 0 4px 30px rgba(0, 0, 0, 0.5);
}

/* Forced Dark-Mode Gallery Layout styles */
.magic-container {
  background: transparent !important;
  color: #f1f5f9 !important;
}

.gallery-grid {
  display: grid !important;
  grid-template-columns: repeat(2, 1fr) !important;
  gap: 20px !important;
}

@media (min-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(5, 1fr) !important;
  }
}

.card-dark {
  background: rgba(15, 23, 42, 0.5) !important;
  border: 1px solid rgba(0, 85, 255, 0.1) !important;
  color: #f1f5f9 !important;
  padding: 20px !important;
  border-radius: 12px !important;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.card-dark:hover {
  border-color: rgba(0, 85, 255, 0.45) !important;
  box-shadow: 0 0 20px rgba(0, 85, 255, 0.3);
  transform: translateY(-2px);
}

/* Compact and sleek Pricing Plan Cards styling */
.plan-card {
  height: 80px !important;
  max-height: 80px !important;
  padding: 8px !important;
  background-color: rgba(15, 23, 42, 0.5) !important;
  border: 1px solid rgba(0, 85, 255, 0.15) !important;
  border-radius: 8px !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: space-between !important;
  box-sizing: border-box !important;
  overflow: hidden !important;
  transition: all 0.25s ease !important;
}

.plan-card.active-card {
  border-color: #0055FF !important;
  box-shadow: 0 0 15px rgba(0, 85, 255, 0.3) !important;
  background-color: rgba(0, 85, 255, 0.05) !important;
}

.plan-card:hover {
  border-color: rgba(0, 85, 255, 0.45) !important;
  box-shadow: 0 0 15px rgba(0, 85, 255, 0.15) !important;
}

.plan-card-title {
  color: #ffffff !important;
  font-size: 10px !important;
  font-weight: 800 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.05em !important;
  line-height: 1.1 !important;
}

.plan-card-subtitle {
  color: rgba(255, 255, 255, 0.8) !important;
  font-size: 9px !important;
  font-weight: 500 !important;
  text-transform: uppercase !important;
  line-height: 1.1 !important;
  margin-top: 1px !important;
}

/* Standalone Google Auth buttons */
.google-auth-button, .google-sign-in-button, .sign-in-button {
  display: inline-flex !important;
  flex-direction: row !important;
  flex-wrap: nowrap !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 8px !important;
  padding: 6px 14px !important;
  border-radius: 9999px !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  outline: none !important;
  background: rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  color: #FFFFFF !important;
  font-weight: 700 !important;
  font-size: 13px !important;
  transition: all 0.2s ease !important;
  box-shadow: none !important;
  cursor: pointer !important;
  width: auto !important;
  height: auto !important;
  min-height: 36px !important;
  max-width: 100% !important;
  box-sizing: border-box !important;
  overflow: hidden !important;
  flex-shrink: 0 !important;
}

.google-auth-button:hover, .google-sign-in-button:hover, .sign-in-button:hover {
  background: rgba(255, 255, 255, 0.12) !important;
  border-color: rgba(255, 255, 255, 0.25) !important;
  color: #FFFFFF !important;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2) !important;
}

.google-auth-button span, .google-sign-in-button span, .sign-in-button span {
  color: #FFFFFF !important;
  font-weight: 700 !important;
  display: inline-flex !important;
  align-items: center !important;
  white-space: nowrap !important;
  max-width: 100% !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}

/* HIGH-CONTRAST RENDERING FOR GOOGLE AUTH LOGO */
.google-icon-container {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    visibility: visible !important;
    opacity: 1 !important;
    background: transparent !important;
    border-radius: 0 !important;
    filter: none !important;
    box-shadow: none !important;
    width: 16px !important;
    height: 16px !important;
    min-width: 16px !important;
    min-height: 16px !important;
    transform: none !important;
    margin: 0 !important;
    flex-shrink: 0 !important;
    padding: 0 !important;
}

.g-logo {
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    background: transparent !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    transform: none !important;
    filter: none !important;
    width: 18px !important;
    height: 18px !important;
    margin: 0 !important;
    padding: 0 !important;
    flex-shrink: 0 !important;
}


/* Animations */
@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}

.animate-marquee {
  display: flex;
  animation: marquee 35s linear infinite;
}

@keyframes logo-pulse {
  0%, 100% {
    transform: scale(1);
    filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.3));
  }
  50% {
    transform: scale(1.03);
    filter: drop-shadow(0 0 18px rgba(56, 189, 248, 0.7));
  }
}

.animate-logo-pulse {
  animation: logo-pulse 2.8s ease-in-out infinite;
}

/* Logo white-to-blue gradient and glow */
.logo-gradient-text {
  background: linear-gradient(135deg, #FFFFFF, #0055FF) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  text-shadow: 0 0 10px rgba(0, 85, 255, 0.4) !important;
}

.logo-icon-glow {
  color: #0055FF !important;
  filter: drop-shadow(0 0 8px rgba(0, 85, 255, 0.6)) !important;
}

/* ==========================================
   CRITICAL GLOBAL BORDER & OUTLINE PURGE
   ========================================== */
* {
  outline: none !important;
}

/* Specific resets targeting Nav-links, Pricing, Affiliate, and Footer items to force border: none and clean text */
header a, 
nav a, 
footer a, 
.nav-link, 
.footer-link, 
.pricing-link, 
.affiliate-link, 
.menu-item,
a {
  border: none !important;
  border-width: 0px !important;
  border-color: transparent !important;
  outline: none !important;
  background: transparent !important;
  background-color: transparent !important;
  box-shadow: none !important;
}

header, 
nav, 
footer, 
header *, 
nav *, 
footer *, 
button:not(.google-sign-in-button):not(.google-auth-button):not(.get-started-button):not(.glow-btn):not(.plan-card-button):not(.plan-button) {
  border: none !important;
  border-width: 0px !important;
  border-color: transparent !important;
  outline: none !important;
}

/* Enforcing absolute border removal on Pricing & Affiliate cards/structures to eliminate weird frames */
.pricing-card, 
.plan-card, 
.affiliate-card, 
.affiliate-item, 
.pricing-item,
.pricing-table,
.pricing-table *,
[class*="pricing-"],
[class*="affiliate-"],
#exit-intent-modal,
#exit-intent-icon {
  border: none !important;
  border-width: 0px !important;
  border-color: transparent !important;
  outline: none !important;
}

/* ==========================================
   UNIFY HARSH FLAT BACKGROUNDS TO DEEP SPACE
   ========================================== */
.bg-\[\#121212\],
[class*="bg-[#121212]"],
.bg-neutral-900,
.bg-neutral-950,
.bg-black,
.bg-black\/90,
[class*="bg-black"],
header[class*="bg-[#121212]"],
footer[class*="bg-[#121212]"] {
  background-color: transparent !important;
  background: transparent !important;
}

/* Ensure the app main layout is fully transparent to let the body gradient show */
#root, 
#root > div, 
.min-h-screen, 
.flex-1 {
  background-color: transparent !important;
  background: transparent !important;
}

/* Let the glassmorphic and panel containers have a subtle unified translucent styling so they pop beautifully */
.bg-black\/20,
.bg-black\/30,
.bg-black\/40,
.bg-black\/45,
.bg-black\/50,
.bg-black\/60,
.bg-black\/80,
.bg-black\/85,
.bg-neutral-950\/30,
[class*="bg-black/"] {
  background-color: rgba(15, 23, 42, 0.45) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
}

/* Also override headers & footers to have a beautiful modern frosted backdrop instead of solid blocks */
header, 
footer {
  background: rgba(15, 23, 42, 0.35) !important;
  backdrop-filter: blur(20px) !important;
  -webkit-backdrop-filter: blur(20px) !important;
}

/* Active/Hover State Logic for all Creation Engines */
.niche-card, .sub-niche-card, .duration-btn, .quantity-btn, .card-element {
    transition: all 0.2s ease-in-out !important;
}

.niche-card:hover, .niche-card.active,
.sub-niche-card:hover, .sub-niche-card.active,
.duration-btn:hover, .duration-btn.active,
.quantity-btn:hover, .quantity-btn.active,
.card-element:hover, .card-element.active {
    border: 3px solid #FFFFFF !important;
    box-shadow: 0 0 15px 2px #0055FF !important;
    transform: scale(1.02) !important;
    transition: all 0.2s ease-in-out !important;
    outline: none !important;
    position: relative;
}

/* FORCE UI CRITICAL UPDATE: NICHE ICONS VISIBILITY & CONTRAST */
.niche-tile-icon {
    stroke: none !important;
    fill: #FFFFFF !important;
    opacity: 1 !important;
    background-color: transparent !important;
    filter: drop-shadow(0 0 5px rgba(0,0,0,0.5)) !important;
}

.niche-tile-icon path {
    fill: #FFFFFF !important;
    stroke: none !important;
}

/* Custom taller and highly premium style for the main CTA button */
.create-video-button {
  padding-top: 26px !important;
  padding-bottom: 26px !important;
  min-height: 76px !important;
  font-size: 16px !important;
  background: linear-gradient(135deg, #38bdf8, #FFFFFF) !important;
  color: #020617 !important;
  box-shadow: 0 0 25px rgba(56, 189, 248, 0.6) !important;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.create-video-button:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 0 35px rgba(56, 189, 248, 0.8) !important;
}

.create-video-button:active {
  transform: translateY(1px) !important;
}

/* WIDE SCROLL AREA FOR BLOG STRATEGY FEED */
.strategy-feed-container {
  width: 95% !important;
  max-width: 1250px !important;
  height: 75vh !important;
  margin: 15px auto !important;
  padding: 24px !important;
  background: #0b0f19 !important;
  border-radius: 16px !important;
  border: 1px solid rgba(59, 130, 246, 0.3) !important;
  overflow-y: auto !important;
  box-sizing: border-box !important;
}

@media (max-width: 640px) {
  .strategy-feed-container {
    width: 100% !important;
    padding: 14px 10px !important;
    margin: 5px auto !important;
    height: auto !important;
    max-height: calc(100vh - 130px) !important;
    border-radius: 12px !important;
  }
}

.feed-header {
  text-align: center !important;
  margin-bottom: 25px !important;
}

@media (max-width: 640px) {
  .feed-header {
    margin-bottom: 16px !important;
  }
}

.feed-tag {
  color: #10b981 !important;
  font-size: 12px !important;
  font-weight: 700 !important;
  text-transform: uppercase !important;
  letter-spacing: 1px !important;
}

.feed-header h2 {
  color: #ffffff !important;
  font-size: 32px !important;
  font-weight: 900 !important;
  letter-spacing: -0.02em !important;
  margin: 12px 0 !important;
  text-shadow: 0 0 20px rgba(59, 130, 246, 0.4) !important;
  line-height: 1.2 !important;
}

@media (max-width: 640px) {
  .feed-header h2 {
    font-size: 20px !important;
    margin: 6px 0 !important;
  }
}

.feed-header p {
  color: #cbd5e1 !important;
  font-size: 15px !important;
  max-width: 800px !important;
  margin: 0 auto !important;
  line-height: 1.5 !important;
}

@media (max-width: 640px) {
  .feed-header p {
    font-size: 12.5px !important;
    line-height: 1.4 !important;
  }
}

.blueprints-grid {
  display: grid !important;
  grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  gap: 20px !important;
  width: 100% !important;
}

@media (max-width: 640px) {
  .blueprints-grid {
    grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
    gap: 12px !important;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .blueprints-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 16px !important;
  }
}

.blueprint-content-card, .blueprint-card {
  position: relative !important;
  height: 220px !important;
  background-size: cover !important;
  background-position: center !important;
  border-radius: 12px !important;
  border: 1px solid rgba(59, 130, 246, 0.4) !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: flex-end !important;
  padding: 16px !important;
  box-sizing: border-box !important;
  transition: transform 0.2s ease, border-color 0.2s ease !important;
}

@media (max-width: 640px) {
  .blueprint-content-card, .blueprint-card {
    height: 180px !important;
    min-height: 180px !important;
    padding: 14px !important;
  }
}

.blueprint-card:hover {
  transform: translateY(-3px) !important;
  border-color: rgba(59, 130, 246, 0.8) !important;
}

.card-badge {
  position: absolute !important;
  top: 15px !important;
  left: 15px !important;
  background: rgba(16, 185, 129, 0.2) !important;
  color: #10b981 !important;
  padding: 4px 10px !important;
  border-radius: 6px !important;
  font-size: 11px !important;
  font-weight: 600 !important;
  border: 1px solid rgba(16, 185, 129, 0.3) !important;
  z-index: 20 !important;
}

.blueprint-card h3 {
  color: #ffffff !important;
  font-size: 16px !important;
  font-weight: 700 !important;
  margin: 0 !important;
  line-height: 1.35 !important;
  word-break: normal !important;
  overflow-wrap: break-word !important;
  text-shadow: 0 2px 4px rgba(0,0,0,0.9) !important;
}

@media (max-width: 640px) {
  .blueprint-card h3 {
    font-size: 15px !important;
    line-height: 1.3 !important;
  }
}

/* LAUNCH ENGINE BUTTON - PRESERVE THEME COLORS BY DEFAULT */
.launch-engine-btn {
  background: linear-gradient(135deg, #0055FF, #00d2ff) !important;
  color: #FFFFFF !important;
  font-weight: 800 !important;
  box-shadow: 0 0 20px rgba(0, 85, 255, 0.4) !important;
  border: none !important;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.launch-engine-btn:hover {
  background: linear-gradient(135deg, #0033CC, #0099ff) !important;
  color: #FFFFFF !important;
  box-shadow: 0 0 30px rgba(0, 85, 255, 0.6) !important;
  transform: translateY(-1px) !important;
}

.launch-engine-btn:active {
  transform: translateY(1px) !important;
}

/* BLUEPRINT READER BUTTONS - GLASSMORPHISM / BLUE GLOW STYLE */
.blueprint-back-btn {
  background: rgba(0, 85, 255, 0.25) !important;
  border: 1px solid rgba(0, 150, 255, 0.6) !important;
  color: #FFFFFF !important;
  box-shadow: 0 0 15px rgba(0, 85, 255, 0.3) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.blueprint-back-btn:hover {
  background: rgba(0, 85, 255, 0.45) !important;
  border-color: rgba(0, 180, 255, 1) !important;
  box-shadow: 0 0 25px rgba(0, 85, 255, 0.6) !important;
  transform: translateY(-1px) !important;
}

.blueprint-back-btn:active {
  transform: translateY(1px) !important;
}

.blueprint-close-btn {
  background: rgba(0, 85, 255, 0.25) !important;
  border: 1px solid rgba(0, 150, 255, 0.6) !important;
  color: #FFFFFF !important;
  box-shadow: 0 0 15px rgba(0, 85, 255, 0.3) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.blueprint-close-btn:hover {
  background: rgba(0, 85, 255, 0.45) !important;
  border-color: rgba(0, 180, 255, 1) !important;
  box-shadow: 0 0 25px rgba(0, 85, 255, 0.6) !important;
  transform: translateY(-1px) !important;
}

.blueprint-close-btn:active {
  transform: translateY(1px) !important;
}

/* Accessibility Widget Utility Styles & WCAG 2.1 Enhancements */

/* Text Sizing Overrides */
.accessibility-text-large,
.accessibility-text-large p,
.accessibility-text-large span,
.accessibility-text-large a,
.accessibility-text-large button,
.accessibility-text-large li,
.accessibility-text-large label,
.accessibility-text-large input {
  font-size: 115% !important;
  line-height: 1.6 !important;
}

.accessibility-text-large h1 { font-size: 120% !important; }
.accessibility-text-large h2 { font-size: 120% !important; }
.accessibility-text-large h3 { font-size: 120% !important; }

.accessibility-text-xlarge,
.accessibility-text-xlarge p,
.accessibility-text-xlarge span,
.accessibility-text-xlarge a,
.accessibility-text-xlarge button,
.accessibility-text-xlarge li,
.accessibility-text-xlarge label,
.accessibility-text-xlarge input {
  font-size: 130% !important;
  line-height: 1.7 !important;
}

.accessibility-text-xlarge h1 { font-size: 135% !important; }
.accessibility-text-xlarge h2 { font-size: 135% !important; }
.accessibility-text-xlarge h3 { font-size: 135% !important; }

/* High Contrast Mode (WCAG AAA / High Contrast) */
.accessibility-high-contrast {
  background-color: #000000 !important;
  color: #FFFFFF !important;
}

.accessibility-high-contrast * {
  border-color: #FFFF00 !important;
}

.accessibility-high-contrast p,
.accessibility-high-contrast span,
.accessibility-high-contrast li,
.accessibility-high-contrast label,
.accessibility-high-contrast div {
  color: #FFFFFF !important;
}

.accessibility-high-contrast h1,
.accessibility-high-contrast h2,
.accessibility-high-contrast h3,
.accessibility-high-contrast h4,
.accessibility-high-contrast h5,
.accessibility-high-contrast h6 {
  color: #FFFF00 !important;
  background: none !important;
  -webkit-text-fill-color: initial !important;
}

.accessibility-high-contrast button,
.accessibility-high-contrast a {
  background-color: #000000 !important;
  color: #FFFF00 !important;
  border: 2px solid #FFFF00 !important;
  font-weight: 700 !important;
}

.accessibility-high-contrast button:hover,
.accessibility-high-contrast a:hover {
  background-color: #FFFF00 !important;
  color: #000000 !important;
}

.accessibility-high-contrast input,
.accessibility-high-contrast select,
.accessibility-high-contrast textarea {
  background-color: #000000 !important;
  color: #FFFFFF !important;
  border: 2px solid #FFFF00 !important;
}


/* WCAG Focus Indicators */
.accessibility-high-contrast *:focus-visible,
:focus-visible {
  outline: 3px solid #38bdf8 !important;
  outline-offset: 3px !important;
}

/* ==========================================
   GLOBAL LANDING & HERO ZERO-GAP OVERRIDES
   ========================================== */
#landing-container, #hero-section, .hero-section,
#master-control-center, #how-it-works-workflow, #why-creators-choose-us {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  padding-top: 0 !important;
}

#hero-section > div, .hero-section > div {
  margin-top: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

/* ==========================================
   MOBILE RESPONSIVE FLEX/GRID MEDIA QUERIES
   ========================================== */
@media screen and (max-width: 768px) {
  /* 1. Global Viewport, Spacing & Box-Sizing Reset */
  *, *:before, *:after {
    box-sizing: border-box !important;
  }

  html, body, #root, main, #landing-container {
    width: 100% !important;
    max-width: 100vw !important;
    min-width: 0 !important;
    overflow-x: hidden !important;
    margin: 0 !important;
    padding: 0 !important;
    box-sizing: border-box !important;
    zoom: 1 !important;
    transform: none !important;
  }

  /* 2. Header & Top Bar: Proper vertical order and natural proportions */
  header, .header-container {
    height: auto !important;
    min-height: auto !important;
    padding: 6px 12px 2px 12px !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 4px !important;
    position: relative !important;
    top: auto !important;
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
    overflow: visible !important;
    background: #0d0d12 !important;
    margin: 0 !important;
  }

  /* Logo container in header */
  header > div:first-child {
    width: 100% !important;
    display: flex !important;
    justify-content: center !important;
    margin: 0 !important;
  }

  /* Navigation links: 'Pricing', 'Affiliate' inline (side-by-side) */
  header nav, nav {
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: nowrap !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 16px !important;
    width: auto !important;
    margin: 2px 0 !important;
  }

  header nav button, nav button {
    font-size: 13px !important;
    font-weight: 700 !important;
    padding: 2px 6px !important;
    white-space: nowrap !important;
    width: auto !important;
    background: transparent !important;
    border: none !important;
  }

  /* Right Section: Sign In & Get Started buttons placed side-by-side directly beneath Pricing/Affiliate */
  header > div:last-child {
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: nowrap !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 8px !important;
    width: auto !important;
    max-width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    box-sizing: border-box !important;
  }

  .google-sign-in-button, .sign-in-button {
    position: static !important;
    width: auto !important;
    max-width: 100% !important;
    height: 34px !important;
    min-height: 34px !important;
    padding: 4px 12px !important;
    font-size: 12px !important;
    white-space: nowrap !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex-shrink: 0 !important;
    margin: 0 !important;
    border-radius: 9999px !important;
    background: rgba(255, 255, 255, 0.05) !important;
    border: 1px solid rgba(255, 255, 255, 0.15) !important;
    box-sizing: border-box !important;
    overflow: hidden !important;
  }

  .get-started-button {
    position: static !important;
    width: auto !important;
    max-width: 100% !important;
    height: 34px !important;
    min-height: 34px !important;
    padding: 4px 14px !important;
    font-size: 12px !important;
    white-space: nowrap !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex-shrink: 0 !important;
    margin: 0 !important;
    border-radius: 9999px !important;
    box-sizing: border-box !important;
  }

  /* 3. Hero Section & Content Flow: Pulled immediately upward with zero dead space */
  .min-h-screen, div.min-h-screen {
    min-height: 0 !important;
    height: auto !important;
  }

  #landing-container {
    padding-top: 0 !important;
    margin-top: 0 !important;
    padding-bottom: 0 !important;
    margin-bottom: 0 !important;
  }

  #hero-section, .hero-section {
    min-height: 0 !important;
    height: auto !important;
    padding-top: 0 !important;
    padding-bottom: 4px !important;
    padding-left: 12px !important;
    padding-right: 12px !important;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: flex-start !important;
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
    position: relative !important;
  }

  /* Remove absolute positioning inside Hero for content containers and pull all content up */
  #hero-section > div:not(.pointer-events-none), .hero-section > div:not(.pointer-events-none) {
    position: relative !important;
    top: 0 !important;
    bottom: auto !important;
    left: auto !important;
    right: auto !important;
    transform: none !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    margin-top: 0 !important;
    margin-bottom: 2px !important;
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
  }

  /* Keep decorative background glow elements hidden/out of flow on mobile */
  #hero-section > div.pointer-events-none, .hero-section > div.pointer-events-none {
    display: none !important;
  }

  /* 4. Social Icons: Horizontal row directly below description and above primary CTA */
  .social-icons, [class*="social"] {
    position: static !important;
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: wrap !important;
    justify-content: center !important;
    align-items: center !important;
    gap: 12px !important;
    width: 100% !important;
    margin-top: 12px !important;
    margin-bottom: 16px !important;
  }

  /* Primary CTA Button */
  .create-video-button, [class*="create-video"] {
    position: static !important;
    width: auto !important;
    max-width: 100% !important;
    padding: 12px 24px !important;
    font-size: 13px !important;
    font-weight: 800 !important;
    margin: 0 auto !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    white-space: normal !important;
    text-align: center !important;
  }

  /* 5. Containers & Text Handling */
  .container, section, footer,
  [class*="container"], [class*="wrapper"], [class*="section"] {
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
    padding-left: 12px !important;
    padding-right: 12px !important;
  }

  h1, h2, h3, h4, h5, h6, p, span, label, input, textarea, select {
    max-width: 100% !important;
    box-sizing: border-box !important;
    word-break: normal !important;
    overflow-wrap: break-word !important;
  }

  /* Prevent card titles, headings, and labels from wrapping vertically letter-by-letter */
  .truncate, [class*="card"] h3, [class*="card"] span, [class*="card"] div, [class*="title"] {
    word-break: normal !important;
  }

  img, video, iframe, svg {
    max-width: 100% !important;
    height: auto !important;
  }

  /* Force zero-gap flow to close all dead black zones on mobile */
  #master-control-center,
  #how-it-works-workflow,
  #why-creators-choose-us,
  footer {
    padding-top: 12px !important;
    padding-bottom: 12px !important;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }

  /* ========================================================
     CRITICAL MOBILE ACCORDION EXPANSION OVERRIDES (<= 768px)
     ======================================================== */
  /* Mobile Accordion Workspace Container Limits */
  .mobile-accordion-workspace {
    width: 100% !important;
    max-width: 100% !important;
    overflow-x: hidden !important;
    box-sizing: border-box !important;
    padding: 12px 10px !important;
  }

  .mobile-accordion-workspace * {
    max-width: 100% !important;
    box-sizing: border-box !important;
  }

  /* Global Width & Min-Width Overrides for Accordion Children */
  .mobile-accordion-workspace form,
  .mobile-accordion-workspace input,
  .mobile-accordion-workspace select,
  .mobile-accordion-workspace textarea,
  .mobile-accordion-workspace .magic-title-bar,
  .mobile-accordion-workspace .magic-input-container,
  .mobile-accordion-workspace .magic-settings-container,
  .mobile-accordion-workspace .magic-preview-container,
  .mobile-accordion-workspace div[style*="width"],
  .mobile-accordion-workspace div[style*="min-width"],
  .mobile-accordion-workspace div[style*="minWidth"] {
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    box-sizing: border-box !important;
  }

  /* Force Flex Wrapping on Row Containers */
  .mobile-accordion-workspace .flex,
  .mobile-accordion-workspace [style*="display: flex"],
  .mobile-accordion-workspace [style*="display:flex"] {
    flex-wrap: wrap !important;
    max-width: 100% !important;
  }

  /* Single-column vertical stack for multi-column form grids in Custom Mode & Auto-Clips */
  .custom-form-grid,
  .mobile-accordion-workspace div[style*="gridTemplateColumns: '1fr 1fr'"],
  .mobile-accordion-workspace div[style*="grid-template-columns: 1fr 1fr"] {
    display: flex !important;
    flex-direction: column !important;
    width: 100% !important;
    gap: 12px !important;
  }

  /* Video Style Accordion Grid -> Single Column on Mobile */
  .custom-video-style-grid,
  .mobile-accordion-workspace div[style*="repeat(3, 1fr)"] {
    display: flex !important;
    flex-direction: column !important;
    width: 100% !important;
    gap: 8px !important;
  }

  /* Broadcaster Platform Buttons Grid -> Clean 2-Column Mobile Grid */
  .custom-platform-grid,
  .mobile-accordion-workspace div[style*="repeat(4, 1fr)"],
  .mobile-accordion-workspace div[style*="repeat(4,1fr)"] {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    width: 100% !important;
    gap: 6px !important;
  }

  .custom-platform-grid button,
  .mobile-accordion-workspace div[style*="repeat(4, 1fr)"] button {
    width: 100% !important;
    padding: 8px 6px !important;
    height: auto !important;
    min-height: 38px !important;
    gap: 4px !important;
    box-sizing: border-box !important;
    justify-content: center !important;
  }

  .custom-platform-grid button span,
  .mobile-accordion-workspace div[style*="repeat(4, 1fr)"] button span {
    font-size: 10px !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }

  /* 1. Force Niche and Sub-niche Card Grids into a 2-Column Mobile Grid */
  .magic-niche-grid,
  .mobile-accordion-workspace div[style*="repeat(5"] {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    grid-template-rows: auto !important;
    width: 100% !important;
    max-width: 100% !important;
    gap: 8px !important;
    margin-bottom: 12px !important;
  }

  /* 2. Scale Niche & Sub-Niche Cards Down for Mobile Screen */
  .magic-niche-card,
  .magic-subniche-card,
  .niche-card,
  .sub-niche-card,
  .mobile-accordion-workspace button[style*="width: 115px"],
  .mobile-accordion-workspace button[style*="width:115px"],
  .mobile-accordion-workspace button[style*="height: 115px"],
  .mobile-accordion-workspace button[style*="height:115px"] {
    width: 100% !important;
    height: 80px !important;
    min-height: 80px !important;
    padding: 6px 4px !important;
    margin: 0 !important;
    font-size: 10px !important;
    gap: 4px !important;
    box-sizing: border-box !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
  }

  .magic-niche-card span,
  .magic-subniche-card span,
  .niche-card span,
  .sub-niche-card span {
    font-size: 10px !important;
    line-height: 1.1 !important;
    white-space: normal !important;
    overflow: hidden !important;
  }

  .magic-niche-card svg,
  .magic-subniche-card svg,
  .niche-card svg,
  .sub-niche-card svg {
    width: 20px !important;
    height: 20px !important;
    margin-bottom: 2px !important;
  }

  /* 3. Ensure Vertical Flow and Clean 16px Padding for Outer Containers */
  .magic-title-bar,
  .magic-input-container,
  .magic-settings-container,
  .magic-preview-container {
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
    padding: 16px !important;
  }

  .magic-input-container {
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: wrap !important;
    gap: 6px !important;
  }

  .magic-input-container input {
    font-size: 11px !important;
    padding: 8px 10px !important;
    width: 100% !important;
    flex: 1 1 100% !important;
  }

  .magic-input-container button {
    padding: 8px 12px !important;
    font-size: 11px !important;
    white-space: nowrap !important;
    width: 100% !important;
  }

  .magic-preview-flex {
    flex-direction: column !important;
    align-items: center !important;
    gap: 12px !important;
    width: 100% !important;
  }

  /* 4. Duration & Quantity Buttons Mobile Fit */
  .mobile-accordion-workspace .duration-btn,
  .mobile-accordion-workspace .quantity-btn,
  .mobile-accordion-workspace button {
    min-width: 0 !important;
    box-sizing: border-box !important;
  }

  /* Prevent text, tables, code blocks from overflowing */
  .mobile-accordion-workspace table,
  .mobile-accordion-workspace pre,
  .mobile-accordion-workspace code {
    max-width: 100% !important;
    overflow-x: auto !important;
    display: block !important;
    white-space: pre-wrap !important;
    word-break: break-word !important;
  }
}

/* ==========================================
   TABLET BREAKPOINT FIX (768px to 1024px)
   ========================================== */
@media (min-width: 768px) and (max-width: 1024px) {
  /* 1. Force Side-by-Side Tool Sections (Keyword Triggers & Auto-Reply Simulator) into Single Column Stack */
  .dm-automation-grid,
  .tablet-stack-grid,
  .mobile-accordion-workspace .grid-cols-12,
  .mobile-accordion-workspace .md\:grid-cols-12 {
    display: flex !important;
    flex-direction: column !important;
    width: 100% !important;
    max-width: 100% !important;
    gap: 20px !important;
  }

  .dm-automation-grid > div,
  .tablet-stack-grid > div,
  .mobile-accordion-workspace .md\:col-span-7,
  .mobile-accordion-workspace .md\:col-span-5,
  .mobile-accordion-workspace .md\:col-span-6,
  .mobile-accordion-workspace .lg\:col-span-7,
  .mobile-accordion-workspace .lg\:col-span-5 {
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
  }

  /* 2. Container Width & Padding Adjustments for Tablet */
  .dm-automation-container,
  .tablet-container,
  .mobile-accordion-workspace {
    width: 100% !important;
    max-width: 100% !important;
    padding: 18px 16px !important;
    box-sizing: border-box !important;
    overflow-x: hidden !important;
  }

  /* 3. Form Input & Button Stacking inside Tablet Containers */
  .dm-automation-container form,
  .dm-automation-container input,
  .dm-automation-container button {
    max-width: 100% !important;
    box-sizing: border-box !important;
  }

  /* 4. Force multi-column tool options into clean 2-column or 1-column layouts on Tablet */
  .custom-form-grid,
  .custom-platform-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 10px !important;
    width: 100% !important;
  }
}








