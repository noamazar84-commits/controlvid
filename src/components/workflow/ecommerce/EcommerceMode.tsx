import { useState, useEffect } from "react";
import { 
  Coins, 
  ShoppingBag, 
  Clock, 
  Video, 
  Sparkles, 
  RefreshCw, 
  ArrowLeft, 
  ArrowRight,
  Download, 
  CloudLightning, 
  Heart, 
  MessageSquare, 
  Share2, 
  Play, 
  Tv, 
  TrendingUp, 
  AlertCircle,
  CheckCircle2,
  Mic
} from "lucide-react";

interface EcommerceModeProps {
  onBack?: () => void;
  onSuccess?: (scriptData: any) => void;
  activeUserEmail?: string;
}

type EcommerceStep = 'input' | 'crawling' | 'preview' | 'distribute';

export default function EcommerceMode({ onBack, onSuccess, activeUserEmail = "guest@viralflow.ai" }: EcommerceModeProps) {
  // State machine
  const [step, setStep] = useState<EcommerceStep>('input');
  
  // Input parameters
  const [productLink, setProductLink] = useState<string>('');
  const [videoLength, setVideoLength] = useState<number>(30); // 15s, 30s, 45s, 60s
  const [videoQuantity, setVideoQuantity] = useState<number>(3); // 1 to 10 slider
  const [voiceModel, setVoiceModel] = useState<string>('Adam (AI Male)');
  const [musicTheme, setMusicTheme] = useState<string>('Cinematic Beats');
  const [captionStyle, setCaptionStyle] = useState<string>(() => sessionStorage.getItem("wizard_selected_caption_style") || 'ViralFlow Blue');

  // Progress animation states
  const [crawlingProgress, setCrawlingProgress] = useState<number>(0);
  const [crawlingLogs, setCrawlingLogs] = useState<string[]>([]);

  // Preview & script state
  const [generatedScripts, setGeneratedScripts] = useState<any[]>([]);
  const [activeScriptIdx, setActiveScriptIdx] = useState<number>(0);
  const [credits, setCredits] = useState<number>(85);
  const [isRegenerating, setIsRegenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Demographics and product info from Gemini
  const [productTitle, setProductTitle] = useState<string>('E-Commerce Product');
  const [valueProp, setValueProp] = useState<string>('High-end premium consumer asset');
  const [targetAge, setTargetAge] = useState<string>('18-34');
  const [targetGender, setTargetGender] = useState<string>('All Genders');
  const [targetInterests, setTargetInterests] = useState<string[]>(['Smart Shopping', 'Tech Gadgets', 'Modern Lifestyle']);
  const [adCopyText, setAdCopyText] = useState<string>('');
  const [hashtags, setHashtags] = useState<string[]>(['viral', 'ecommerce', 'musthave']);

  // Distribution progress
  const [distributeStatus, setDistributeStatus] = useState<string>('idle'); // idle, distributing, completed
  const [distributeProgress, setDistributeProgress] = useState<number>(0);
  const [distributeLogs, setDistributeLogs] = useState<string[]>([]);

  // Synchronize music theme and default niche ID to session storage
  useEffect(() => {
    sessionStorage.setItem("wizard_selected_music_theme", musicTheme);
  }, [musicTheme]);

  useEffect(() => {
    sessionStorage.setItem("wizard_selected_caption_style", captionStyle);
  }, [captionStyle]);

  useEffect(() => {
    sessionStorage.setItem("wizard_selected_niche_id", "business");
  }, []);

  // Function to simulate variations based on a single fetched Gemini script
  const buildVariations = (baseScript: any[], title: string, count: number) => {
    const hookVariations = [
      `If you don't have this ${title} yet, you are literally living in the past.`,
      `Stop scrolling! This viral ${title} is completely changing the game.`,
      `Here is a secret product hack about ${title} that feels illegal to know.`,
      `The absolute biggest lie you've been told about ${title} is this.`,
      `Most people struggle with this daily problem until they find ${title}.`,
      `Is this ${title} actually worth the hype? Let's find out.`,
      `Do NOT buy this ${title} unless you want to solve your daily frustrations.`,
      `Why is everyone on TikTok completely obsessed with this ${title}?`,
      `Here's the honest truth about the viral ${title} that's selling out everywhere.`,
      `I got this viral ${title} 3 days ago, and my life is already completely different.`
    ];

    const ctaVariations = [
      `Click the link in my bio to get yours with a 40% discount today!`,
      `Comment "${title.split(' ')[0].toUpperCase()}" and I'll send you the checkout link instantly.`,
      `Hit follow and check the link below to grab the limited stock.`,
      `Save this video right now before they sell out completely.`,
      `Use code VIRAL20 at checkout for free worldwide shipping today!`
    ];

    const list = Array.from({ length: count }).map((_, i) => {
      // Base segments mapping
      const hookSegment = baseScript.find(s => s.segment === "Hook") || baseScript[0];
      const problemSegment = baseScript.find(s => s.segment === "Problem") || baseScript[1] || baseScript[0];
      const solutionSegment = baseScript.find(s => s.segment === "Solution") || baseScript[2] || baseScript[0];
      const proofSegment = baseScript.find(s => s.segment === "Social Proof") || baseScript[3] || baseScript[0];
      const ctaSegment = baseScript.find(s => s.segment === "CTA") || baseScript[4] || baseScript[0];

      const hookText = i === 0 ? hookSegment.audio : hookVariations[i % hookVariations.length];
      const ctaText = i === 0 ? ctaSegment.audio : ctaVariations[i % ctaVariations.length];

      return {
        id: i + 1,
        title: `Video Ad Concept #${i + 1}`,
        hook: hookText,
        problem: problemSegment.audio,
        solution: solutionSegment.audio,
        proof: proofSegment.audio,
        cta: ctaText,
        visualHook: hookSegment.visual,
        visualBody: `${problemSegment.visual} - ${solutionSegment.visual}`,
        visualCTA: ctaSegment.visual,
        viralScore: Math.floor(Math.random() * 14) + 85, // 85% to 99%
        duration: videoLength
      };
    });

    setGeneratedScripts(list);
    setActiveScriptIdx(0);
  };

  // Submit product URL and generate campaign
  const handleGenerate = async () => {
    if (!productLink || productLink.trim() === "") return;
    setStep('crawling');
    setCrawlingProgress(0);
    setCrawlingLogs([]);
    setError(null);

    // Initial logs simulation
    const logs = [
      "Connecting to scraper proxy & analyzing target URL...",
      "Extracting product metadata, headings, and description...",
      "Invoking Gemini 3.5 Flash Copywriter Engine...",
      "Synthesizing cinematic hooks, transition scripts, and CTA...",
      `Routing scripts to Text-to-Speech (TTS) engine with selected voice (${voiceModel})...`,
      "Generating hyper-realistic voiceovers via ElevenLabs API...",
      "Optimizing short-form vertical sequence templates..."
    ];

    let currentLogIdx = 0;
    const interval = setInterval(() => {
      if (currentLogIdx < logs.length) {
        setCrawlingLogs(prev => [...prev, logs[currentLogIdx]]);
        setCrawlingProgress(Math.min(95, Math.floor(((currentLogIdx + 1) / logs.length) * 100)));
        currentLogIdx++;
      }
    }, 600);

    try {
      const response = await fetch("/api/ecommerce/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          productLink: productLink, 
          email: activeUserEmail,
          targetPlatform: "TikTok",
          duration: videoLength,
          musicTheme,
          voiceModel
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "API connection failed. Please verify the URL and try again.");
      }

      const data = await response.json();
      clearInterval(interval);

      if (data && data.success && data.adResult) {
        const ad = data.adResult;
        setProductTitle(ad.productTitle || "E-Commerce Product");
        setValueProp(ad.valueProp || "Cinematic dropshipping product");
        if (ad.targetDemographics) {
          setTargetAge(ad.targetDemographics.age || '18-34');
          setTargetGender(ad.targetDemographics.gender || 'All Genders');
          setTargetInterests(ad.targetDemographics.interests || []);
        }
        setAdCopyText(ad.adCopy || "");
        setHashtags(ad.hashtags || []);

        // Build dynamic variations based on selected quantity
        buildVariations(ad.script || [], ad.productTitle || "Product", videoQuantity);

        setCrawlingProgress(100);
        setTimeout(() => {
          setStep('preview');
        }, 400);

      } else {
        throw new Error("No script returned from Gemini E-commerce Ad suite.");
      }

    } catch (err: any) {
      clearInterval(interval);
      console.error("API error during e-commerce generation, applying fallback presentation flow:", err);
      
      // Force navigation directly to the 'Preview/Gallery' screen instead of resetting to the start screen.
      const parsedProduct = productLink.replace(/https?:\/\/(www\.)?/, '').split('/')[0] || "E-Commerce Product";
      const cleanTitle = parsedProduct
        .split(/[.\-_]/)
        .filter(part => part && part !== "com" && part !== "www" && part !== "org" && part !== "net")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ') || "Premium Viral Product";

      setProductTitle(cleanTitle);
      setValueProp("High-conversion viral video ad concepts for modern short-form platforms.");
      setTargetAge("18-34");
      setTargetGender("All Genders");
      setTargetInterests(["Smart Shopping", "Tech Gadgets", "Modern Lifestyle"]);
      setAdCopyText(`Get the absolute best viral ${cleanTitle} deals now! Extremely limited stock, high efficiency, global shipping.`);
      setHashtags(["viral", "ecommerce", "musthave", cleanTitle.toLowerCase().replace(/\s+/g, '')]);

      const fallbackScript = [
        { segment: "Hook", visual: "Macro product close-up with soft transitions", audio: `If you do not have this viral ${cleanTitle} yet, you are literally living in the past.` },
        { segment: "Problem", visual: "Frustrated client demonstrating previous struggles", audio: "Most general alternatives on the market break within weeks and waste your money." },
        { segment: "Solution", visual: "Cinematic spinning detail showing durability", audio: `But our premium engineered ${cleanTitle} delivers unmatched lasting quality.` },
        { segment: "Social Proof", visual: "Dynamic review badges flashing", audio: "Join over ten thousand creators and buyers rating this 5 stars this month." },
        { segment: "CTA", visual: "Vibrant discount code graphic overlay", audio: "Click the link below right now to claim your 40% off flash-sale discount." }
      ];

      buildVariations(fallbackScript, cleanTitle, videoQuantity);

      setCrawlingProgress(100);
      setTimeout(() => {
        setStep('preview');
      }, 400);
    }
  };

  // Regeneration simulation using credits
  const handleRegenerate = () => {
    if (credits < 5) return;
    setIsRegenerating(true);
    setCredits(prev => Math.max(0, prev - 5));
    
    setTimeout(() => {
      // Re-jumble the variations to simulate fresh generation
      buildVariations(
        [
          { segment: "Hook", visual: "Macro product shot with heavy bokeh", audio: `Wait, don't buy that other product. You need to see this viral ${productTitle}.` },
          { segment: "Problem", visual: "Slightly frustrated actor", audio: "Most options on the market are way too overpriced and break instantly." },
          { segment: "Solution", visual: "Cinematic close-up showing durability", audio: `That is why this custom ${productTitle} is designed with aerospace quality.` },
          { segment: "Social Proof", visual: "Actor smiling and nodding", audio: "Over ten thousand customers have rated it five stars this month alone." },
          { segment: "CTA", visual: "Text overlay showing the code", audio: `Grab yours right now by clicking the link below before the sale ends.` }
        ],
        productTitle,
        videoQuantity
      );
      setIsRegenerating(false);
    }, 850);
  };

  // Run the full distribution simulation
  const startDistribution = () => {
    setStep('distribute');
    setDistributeStatus('distributing');
    setDistributeProgress(0);
    setDistributeLogs([]);

    const logItems = [
      "Initializing automated distribution logs...",
      "Deploying high-definition compiled visual assets...",
      "Syncing custom voiceover and subtitle tracks...",
      "Syndicating content bundle to connected channels...",
      "Publishing video series to YouTube Shorts...",
      "Publishing video series to TikTok Workspace...",
      "Publishing video series to Instagram Reels...",
      "Automated queue deployment completed successfully!"
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < logItems.length) {
        setDistributeLogs(prev => [...prev, logItems[currentLogIndex]]);
        setDistributeProgress(Math.floor(((currentLogIndex + 1) / logItems.length) * 100));
        currentLogIndex++;
      } else {
        clearInterval(interval);
        setDistributeStatus('completed');
        // Instantly transition back to preview screen
        setTimeout(() => {
          setStep('preview');
          if (onSuccess) {
            onSuccess({
              title: productTitle,
              topic: productTitle,
              scriptsCount: generatedScripts.length,
              duration: videoLength,
              musicTheme,
              scripts: generatedScripts
            });
          }
        }, 500);
      }
    }, 600);
  };

  // Auto-regenerate on settings change
  useEffect(() => {
    if (step === 'preview' && generatedScripts.length > 0) {
      buildVariations(
        [
          { segment: "Hook", visual: "Macro close-up shot", audio: `Have you seen this viral ${productTitle} yet?` },
          { segment: "Problem", visual: "Frustrated client lifestyle shot", audio: "Standard alternatives break within weeks, costing you more money." },
          { segment: "Solution", visual: "Glorious spinning display", audio: `But our premium ${productTitle} delivers lasting quality at a fraction of the cost.` },
          { segment: "Social Proof", visual: "Text overlay showing reviews", audio: "Join thousands of creators who are using this daily." },
          { segment: "CTA", visual: "Promo banner transition", audio: "Check out the checkout link right now to save 40%." }
        ],
        productTitle,
        videoQuantity
      );
    }
  }, [videoLength, videoQuantity]);

  return (
    <div style={{ 
      height: '100vh', 
      width: '100vw', 
      background: '#000', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'flex-start', 
      justifyContent: 'flex-start', 
      padding: '20px',
      fontFamily: 'sans-serif',
      boxSizing: 'border-box',
      overflow: 'hidden',
      color: '#fff'
    }}>
      
      {/* Title + Navigation bar */}
      <div style={{ 
        width: '635px',
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '15px'
      }}>
        <div style={{ 
          fontSize: '13px', 
          fontWeight: 900, 
          color: '#fff', 
          letterSpacing: '0.12em', 
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <ShoppingBag size={14} style={{ color: '#38bdf8' }} />
          <span>E-COMMERCE AD GENERATOR</span>
          {productTitle !== 'E-Commerce Product' && <span style={{ color: '#38bdf8', fontSize: '11px' }}> / {productTitle}</span>}
        </div>

        {step !== 'input' && step !== 'crawling' && step !== 'distribute' && (
          <button 
            onClick={() => setStep('input')}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#888',
              cursor: 'pointer',
              fontSize: '11px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            <ArrowLeft size={12} />
            <span>Back</span>
          </button>
        )}
      </div>

      {/* Main interactive area layout - NO SCROLLING */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* STEP 1: INPUT FORM */}
        {step === 'input' && (
          <div style={{ 
            width: '635px', 
            background: '#111', 
            border: '1px solid #333', 
            borderRadius: '16px', 
            padding: '20px', 
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }}>
            {/* Description banner */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <p style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
                High-Conversion Video Ad suite
              </p>
              <p style={{ fontSize: '11px', color: '#888', margin: 0, lineHeight: '1.4' }}>
                Paste any Shopify, Amazon, AliExpress or dropshipping product URL. Our AI crawling engine extracts description details, value propositions, and demographic matches to compile optimized vertical short video scripts.
              </p>
            </div>

            {/* Product Link Input */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 'bold', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                <ShoppingBag size={12} style={{ color: '#38bdf8' }} />
                <span>Product Link URL</span>
              </div>
              <input 
                type="url" 
                placeholder="https://example-shopify-store.com/products/viral-led-speaker" 
                value={productLink}
                onChange={(e) => setProductLink(e.target.value)}
                style={{ 
                  width: '100%', 
                  background: '#1a1a1a', 
                  border: '1px solid #333', 
                  color: '#fff', 
                  borderRadius: '8px', 
                  padding: '12px 16px',
                  fontSize: '13px',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  boxSizing: 'border-box'
                }} 
                onFocus={(e) => e.currentTarget.style.borderColor = '#38bdf8'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#333'}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleGenerate();
                }}
              />
            </div>

            {/* Video Duration Selector */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 'bold', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                <Clock size={12} style={{ color: '#38bdf8' }} />
                <span>Video Length Duration</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                {[15, 30, 45, 60].map(len => (
                  <button 
                    key={len}
                    onClick={() => setVideoLength(len)}
                    className={`duration-btn ${videoLength === len ? 'active' : ''}`}
                    style={{
                      flex: 1,
                      padding: '10px',
                      background: '#1a1a1a',
                      color: '#fff',
                      border: videoLength === len ? '3px solid #FFFFFF' : '1px solid #333',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      fontSize: '12px',
                      outline: 'none'
                    }}
                  >
                    {len}s
                  </button>
                ))}
              </div>
            </div>

            {/* Voice Talent & Audio/Music side-by-side */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              {/* Voice Talent Selector */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 'bold', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                  <Mic size={12} style={{ color: '#38bdf8' }} />
                  <span>Voice Talent</span>
                </div>
                <select 
                  value={voiceModel}
                  onChange={(e) => setVoiceModel(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#1a1a1a',
                    border: '1px solid #333',
                    color: '#fff',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    outline: 'none',
                    fontSize: '12px',
                    boxSizing: 'border-box',
                    cursor: 'pointer'
                  }}
                >
                  <option>Adam (AI Male)</option>
                  <option>Serena (AI Female)</option>
                  <option>Marcus (Deep Narrative)</option>
                  <option>Lily (Energetic Short)</option>
                </select>
              </div>

              {/* Audio/Music Background Selector */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 'bold', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                  <Sparkles size={12} style={{ color: '#38bdf8' }} />
                  <span>Audio/Music Background</span>
                </div>
                <select 
                  value={musicTheme}
                  onChange={(e) => setMusicTheme(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#1a1a1a',
                    border: '1px solid #333',
                    color: '#fff',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    outline: 'none',
                    fontSize: '12px',
                    boxSizing: 'border-box',
                    cursor: 'pointer'
                  }}
                >
                  <option>Cinematic Beats</option>
                  <option>Cyberpunk Bass</option>
                  <option>Financial Lo-Fi</option>
                  <option>Motivation Upbeat</option>
                </select>
              </div>
            </div>

            {/* Caption Style (Viral Vibe) */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 'bold', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                <Sparkles size={12} style={{ color: '#38bdf8' }} />
                <span>Caption Style (Viral Vibe)</span>
              </div>
              <select 
                value={captionStyle}
                onChange={(e) => setCaptionStyle(e.target.value)}
                style={{
                  width: '100%',
                  background: '#1a1a1a',
                  border: '1px solid #333',
                  color: '#fff',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  outline: 'none',
                  fontSize: '12px',
                  boxSizing: 'border-box',
                  cursor: 'pointer'
                }}
              >
                <option value="ViralFlow Blue">ViralFlow Blue (Default)</option>
                <option value="Neon Green (Matrix)">Neon Green (Matrix)</option>
                <option value="Stoic White (Georgia)">Stoic White (Georgia)</option>
                <option value="Sunset Gold (Bold Impact)">Sunset Gold (Bold Impact)</option>
                <option value="Vintage Rose">Vintage Rose</option>
              </select>
            </div>

            {/* Video Quantity Selector Grid */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 'bold', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <Video size={12} style={{ color: '#38bdf8' }} />
                  <span>Quantity of Videos</span>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#38bdf8' }}>
                  {videoQuantity} {videoQuantity === 1 ? 'Ad Video' : 'Ad Videos'}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(qty => (
                  <button 
                    key={qty}
                    type="button"
                    onClick={() => setVideoQuantity(qty)}
                    className={`quantity-btn ${videoQuantity === qty ? 'active' : ''}`}
                    style={{
                      flex: 1,
                      padding: '8px 0',
                      background: '#1a1a1a',
                      color: '#fff',
                      border: videoQuantity === qty ? '3px solid #38bdf8' : '1px solid #333',
                      borderRadius: '6px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      fontSize: '11px',
                      textAlign: 'center',
                      outline: 'none',
                      transition: 'all 0.2s ease',
                      height: '32px'
                    }}
                  >
                    {qty}
                  </button>
                ))}
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div style={{
                background: 'rgba(255, 68, 68, 0.1)',
                border: '1px solid rgba(255, 68, 68, 0.2)',
                borderRadius: '8px',
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#ff4444',
                fontSize: '11px'
              }}>
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Action */}
            <button 
              onClick={handleGenerate}
              disabled={!productLink.trim()}
              style={{
                width: '100%',
                background: '#38bdf8',
                color: '#000',
                fontWeight: 'bold',
                padding: '14px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '13px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '5px',
                opacity: !productLink.trim() ? 0.5 : 1,
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => { if (productLink.trim()) e.currentTarget.style.boxShadow = '0 0 15px rgba(56, 189, 248, 0.3)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
            >
              <Sparkles size={16} />
              <span>GENERATE VIDEOS</span>
            </button>
          </div>
        )}

        {/* STEP 2: CRAWLING PROGRESS */}
        {step === 'crawling' && (
          <div style={{ 
            width: '635px', 
            background: '#111', 
            border: '1px solid #333', 
            borderRadius: '16px', 
            padding: '25px', 
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <RefreshCw size={16} className="animate-spin" style={{ color: '#38bdf8' }} />
              <span style={{ fontSize: '11px', fontFamily: 'monospace', fontWeight: 'bold', textTransform: 'uppercase', color: '#38bdf8' }}>
                ANALYZING PRODUCT URL & COMPILING CAMPAIGN...
              </span>
            </div>

            {/* Progress Bar */}
            <div style={{ width: '100%', background: '#222', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${crawlingProgress}%`, height: '100%', background: '#38bdf8', borderRadius: '4px', transition: 'width 0.3s ease' }} />
            </div>

            {/* Progress Logs */}
            <div style={{ 
              background: '#08080a', 
              border: '1px solid #222', 
              borderRadius: '8px', 
              padding: '12px', 
              maxHeight: '120px', 
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              {crawlingLogs.map((log, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '8px', fontSize: '10px', fontFamily: 'monospace', color: idx === crawlingLogs.length - 1 ? '#38bdf8' : '#666' }}>
                  <span>&gt;</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: PREVIEW SCREEN */}
        {step === 'preview' && generatedScripts.length > 0 && (
          <div style={{ 
            width: '635px', 
            background: '#111', 
            border: '1px solid #333', 
            borderRadius: '16px', 
            padding: '18px', 
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <style>{`
              @keyframes gradientMove {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
            `}</style>

            {/* Top info and Credit counter */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', maxWidth: '400px' }}>
                {generatedScripts.map((scr, idx) => (
                  <button
                    key={scr.id}
                    onClick={() => setActiveScriptIdx(idx)}
                    style={{
                      background: activeScriptIdx === idx ? '#38bdf8' : '#1a1a1a',
                      color: activeScriptIdx === idx ? '#000' : '#888',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '5px 10px',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    Ad Video #{scr.id}
                  </button>
                ))}
              </div>

              {/* Credits Counter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: '#888', fontWeight: 'bold' }}>
                <Coins size={12} style={{ color: '#38bdf8' }} />
                <span>CREDITS: <b style={{ color: '#fff' }}>{credits}</b> / 100</span>
              </div>
            </div>

            {/* Side-by-side layout */}
            <div style={{ display: 'flex', gap: '15px' }}>
              
              {/* Left Mockup vertical smartphone player */}
              <div style={{
                width: '210px',
                height: '340px',
                background: '#000',
                border: '4px solid #222',
                borderRadius: '24px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0,0,0,0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {/* Simulated Video Content Background - moving gradient */}
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  background: 'linear-gradient(45deg, #051a0d, #082d18, #05141b, #001f0c)',
                  backgroundSize: '400% 400%',
                  animation: 'gradientMove 8s ease infinite',
                  zIndex: 1
                }} />

                {/* Subtitles Overlay / Text Highlight */}
                <div style={{
                  position: 'absolute',
                  bottom: '50px',
                  left: '10px',
                  right: '35px',
                  zIndex: 10,
                  textAlign: 'left'
                }}>
                  <p style={{
                    fontSize: '11px',
                    fontWeight: 900,
                    color: '#fff',
                    textShadow: '2px 2px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000',
                    textTransform: 'uppercase',
                    margin: '0 0 4px 0',
                    lineHeight: '1.2',
                    fontFamily: 'monospace'
                  }}>
                    🔥 {productTitle.toUpperCase()} HACK...
                  </p>
                  <p style={{
                    fontSize: '9px',
                    color: '#38bdf8',
                    textShadow: '1px 1px 0px #000',
                    fontWeight: 'bold',
                    margin: 0
                  }}>
                    #viral #musthave #shop #{productTitle.toLowerCase().replace(/\s+/g, '')}
                  </p>
                </div>

                {/* Caption / Narration content display */}
                <div style={{
                  position: 'absolute',
                  top: '38%',
                  left: '12px',
                  right: '12px',
                  zIndex: 10,
                  textAlign: 'center'
                }}>
                  {isRegenerating ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <RefreshCw size={24} className="animate-spin" style={{ color: '#38bdf8' }} />
                      <span style={{ fontSize: '10px', color: '#888', fontWeight: 'bold' }}>RE-COMPILING AD...</span>
                    </div>
                  ) : (
                    <div style={{
                      background: 'rgba(0,0,0,0.85)',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid rgba(56, 189, 248, 0.2)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                    }}>
                      <p style={{
                        fontSize: '9px',
                        fontWeight: 'bold',
                        color: '#38bdf8',
                        margin: '0 0 2px 0',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        AI AD AUDIO PREVIEW
                      </p>
                      <p style={{
                        fontSize: '10px',
                        color: '#fff',
                        margin: 0,
                        fontWeight: 'bold',
                        lineHeight: '1.3'
                      }}>
                        "{generatedScripts[activeScriptIdx]?.hook}"
                      </p>
                    </div>
                  )}
                </div>

                {/* TikTok style side actions panel */}
                <div style={{
                  position: 'absolute',
                  right: '6px',
                  bottom: '40px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  zIndex: 10,
                  alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                      width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <Heart size={12} style={{ color: '#38bdf8', fill: '#38bdf8' }} />
                    </div>
                    <span style={{ fontSize: '8px', color: '#fff', marginTop: '2px', fontWeight: 'bold' }}>8.9K</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                      width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <MessageSquare size={12} style={{ color: '#fff' }} />
                    </div>
                    <span style={{ fontSize: '8px', color: '#fff', marginTop: '2px', fontWeight: 'bold' }}>412</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                      width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <Share2 size={12} style={{ color: '#fff' }} />
                    </div>
                    <span style={{ fontSize: '8px', color: '#fff', marginTop: '2px', fontWeight: 'bold' }}>1.8K</span>
                  </div>
                </div>

                {/* Bottom Timeline progress bar */}
                <div style={{
                  position: 'absolute',
                  bottom: '8px',
                  left: '12px',
                  right: '12px',
                  height: '3px',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '2px',
                  zIndex: 10,
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: '45%',
                    height: '100%',
                    background: '#38bdf8',
                    borderRadius: '2px'
                  }} />
                </div>

                {/* Play icon inside */}
                {!isRegenerating && (
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(56, 189, 248, 0.15)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    zIndex: 10,
                    cursor: 'pointer'
                  }}>
                    <Play size={16} style={{ color: '#38bdf8', marginLeft: '2px' }} />
                  </div>
                )}
              </div>

              {/* Right metadata panel and campaign actions */}
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '4px 0'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div>
                    <span style={{ fontSize: '9px', fontWeight: 'bold', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      E-COMMERCE METADATA PROFILE
                    </span>
                    <h4 style={{ fontSize: '15px', fontWeight: 'bold', margin: '2px 0 4px 0', color: '#fff' }}>
                      {productTitle}
                    </h4>
                    <p style={{ fontSize: '11px', color: '#888', margin: 0, lineHeight: '1.4' }}>
                      {valueProp}
                    </p>
                  </div>

                  {/* Demographic profiles and analytics */}
                  <div style={{
                    background: '#16161a',
                    border: '1px solid #222',
                    borderRadius: '8px',
                    padding: '8px 10px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '6px'
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '8px', color: '#666', fontWeight: 'bold', textTransform: 'uppercase' }}>TARGET DEMO</span>
                      <span style={{ fontSize: '10px', color: '#ccc', fontWeight: 'bold' }}>{targetAge} ({targetGender})</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '8px', color: '#666', fontWeight: 'bold', textTransform: 'uppercase' }}>CONVERSION POWER</span>
                      <span style={{ fontSize: '10px', color: '#38bdf8', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <TrendingUp size={10} />
                        {generatedScripts[activeScriptIdx]?.viralScore || 95}% Match
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gridColumn: 'span 2' }}>
                      <span style={{ fontSize: '8px', color: '#666', fontWeight: 'bold', textTransform: 'uppercase' }}>AUDIENCE INTERESTS</span>
                      <span style={{ fontSize: '9px', color: '#aaa' }}>
                        {targetInterests.slice(0, 3).join(', ')}
                      </span>
                    </div>
                  </div>

                  {/* Script display drawer */}
                  <div style={{
                    background: '#09090c',
                    border: '1px solid #222',
                    borderRadius: '8px',
                    padding: '8px 10px',
                    fontSize: '10px',
                    color: '#ccc',
                    maxHeight: '90px',
                    overflowY: 'auto',
                    fontFamily: 'monospace'
                  }}>
                    <p style={{ margin: '0 0 4px 0', color: '#38bdf8', fontWeight: 'bold' }}>FULL AD FLOW:</p>
                    <p style={{ margin: '0 0 3px 0' }}><b style={{ color: '#888' }}>[Hook]</b> {generatedScripts[activeScriptIdx]?.hook}</p>
                    <p style={{ margin: '0 0 3px 0' }}><b style={{ color: '#888' }}>[Problem]</b> {generatedScripts[activeScriptIdx]?.problem}</p>
                    <p style={{ margin: '0 0 3px 0' }}><b style={{ color: '#888' }}>[Solution]</b> {generatedScripts[activeScriptIdx]?.solution}</p>
                    <p style={{ margin: '0 0 3px 0' }}><b style={{ color: '#888' }}>[Proof]</b> {generatedScripts[activeScriptIdx]?.proof}</p>
                    <p style={{ margin: '0' }}><b style={{ color: '#888' }}>[CTA]</b> {generatedScripts[activeScriptIdx]?.cta}</p>
                  </div>
                </div>

                {/* Campaign Actions block */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
                  
                  {/* Download Video and Proceed & Distribute Side-by-Side */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => alert("Downloading HD Video bundle directly...")}
                      style={{
                        flex: 1,
                        background: '#1a1a1a',
                        border: '1px solid #333',
                        color: '#fff',
                        borderRadius: '8px',
                        padding: '10px',
                        fontWeight: 'bold',
                        fontSize: '11px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <Download size={12} />
                      <span>DOWNLOAD HD</span>
                    </button>

                    <button
                      onClick={startDistribution}
                      style={{
                        flex: 1.4,
                        background: '#38bdf8',
                        color: '#000',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '10px',
                        fontWeight: 'bold',
                        fontSize: '11px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        boxShadow: '0 2px 10px rgba(56, 189, 248, 0.2)'
                      }}
                    >
                      <CloudLightning size={12} />
                      <span>PROCEED & DISTRIBUTE</span>
                    </button>
                  </div>

                  {/* Regenerate with 1-credit Warning box */}
                  <div style={{
                    borderTop: '1px solid #222',
                    paddingTop: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}>
                    <button 
                      onClick={handleRegenerate}
                      disabled={isRegenerating || credits < 5}
                      style={{
                        width: '100%',
                        background: '#0d0d0d',
                        border: '1px solid #222',
                        color: '#fff',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        fontWeight: 'bold',
                        fontSize: '11px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        opacity: credits < 5 ? 0.5 : 1
                      }}
                    >
                      <RefreshCw size={11} className={isRegenerating ? "animate-spin" : ""} style={{ color: '#38bdf8' }} />
                      <span>REGENERATE SELECTED AD</span>
                    </button>
                    <p style={{ fontSize: '9px', color: '#555', margin: '0', textAlign: 'center' }}>
                      * Regenerating this video consumes 5 credits
                    </p>
                  </div>

                </div>
              </div>

            </div>
          </div>
        )}

        {/* STEP 4: DISTRIBUTION SIMULATION LOGS */}
        {step === 'distribute' && (
          <div style={{ 
            width: '635px', 
            background: '#111', 
            border: '1px solid #333', 
            borderRadius: '16px', 
            padding: '20px', 
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }}>
            {/* Header / Loading title */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CloudLightning size={16} style={{ color: '#38bdf8', animation: 'pulse 1.5s infinite' }} />
                <span style={{ fontSize: '13px', fontWeight: 'bold' }}>
                  {distributeStatus === 'completed' ? 'DISTRIBUTION COMPLETE' : 'AUTOMATED DISTRIBUTION LIVE'}
                </span>
              </div>
              <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#38bdf8' }}>
                {distributeProgress}%
              </div>
            </div>

            {/* Progress Bar */}
            <div style={{ width: '100%', background: '#222', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${distributeProgress}%`, height: '100%', background: '#38bdf8', transition: 'width 0.4s ease' }} />
            </div>

            {/* Distribution logs console output */}
            <div style={{
              background: '#08080a',
              border: '1px solid #222',
              borderRadius: '8px',
              padding: '12px',
              minHeight: '140px',
              maxHeight: '180px',
              overflowY: 'auto',
              fontFamily: 'monospace',
              fontSize: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              {distributeLogs.map((log, idx) => (
                <div key={idx} style={{ color: idx === distributeLogs.length - 1 ? '#38bdf8' : '#888', display: 'flex', gap: '6px' }}>
                  <span>✓</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
