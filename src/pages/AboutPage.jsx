import React, { useState, useEffect, useRef } from 'react';
import { Camera, Film, Sun, Award, Play, Pause, Maximize2, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const quoteWords = [
  { text: "“I", italic: false },
  { text: "don't", italic: false },
  { text: "simply", italic: false },
  { text: "click", italic: false },
  { text: "pictures", italic: true },
  { text: "I", italic: false },
  { text: "preserve", italic: false },
  { text: "genuine", italic: false },
  { text: "emotions,", italic: true },
  { text: "fleeting", italic: false },
  { text: "memories,", italic: false },
  { text: "and", italic: false },
  { text: "hidden", italic: false },
  { text: "stories", italic: false },
  { text: "that", italic: false },
  { text: "bring", italic: true },
  { text: "life", italic: true },
  { text: "to", italic: false },
  { text: "every", italic: false },
  { text: "shot.”", italic: false }
];

export default function AboutPage({ onOpenChat }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeGearTab, setActiveGearTab] = useState('bodies');
  const quoteRef = useRef(null);

  useEffect(() => {
    const quoteEl = quoteRef.current;
    if (!quoteEl) return;

    const ctx = gsap.context(() => {
      const words = quoteEl.querySelectorAll('.reveal-word');
      if (words.length) {
        gsap.fromTo(
          words,
          {
            opacity: 0,
            y: 28,
            filter: 'blur(8px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.85,
            ease: 'power3.out',
            stagger: 0.038,
            scrollTrigger: {
              trigger: quoteEl,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const gearData = {
    bodies: [
      { name: 'Leica M11 Monochrom', desc: 'Pure black and white rangefinder with 60MP sensor for uncompromising documentary grit.', tag: 'Primary Rangefinder' },
      { name: 'Hasselblad 907X 50C', desc: 'Medium format digital back for expansive tonal transitions and hyper-detailed portraiture.', tag: 'Medium Format' },
      { name: 'Leica MP 35mm (Film)', desc: 'Mechanical film body loaded with Kodak Tri-X 400 for authentic silver halide grain.', tag: 'Analog 35mm' }
    ],
    lenses: [
      { name: 'Leica 35mm Summilux-M f/1.4', desc: 'The documentary master lens — intimate environmental portraits with cinematic falloff.', tag: 'Documentary Prime' },
      { name: 'Leica 50mm Noctilux-M f/0.95', desc: 'Dreamlike subject separation and ultra low-light performance without artificial flash.', tag: 'Atmospheric Prime' },
      { name: 'Hasselblad XCD 80mm f/1.9', desc: 'Razor-sharp medium format portrait lens with cream-smooth out-of-focus highlights.', tag: 'Studio Portrait' }
    ],
    lighting: [
      { name: 'Profoto B10X Plus (500W)', desc: 'Cordless battery strobes mimicking high-noon desert sun or gentle window spill.', tag: 'Strobe Rig' },
      { name: 'Nanlite Pavotube II 30X', desc: 'Continuous RGB tube lights for subtle moody rim lighting in twilight shoots.', tag: 'Continuous Light' },
      { name: 'Matthews C-Stands and Silks', desc: 'Cinema-grade diffusion flags softening hard natural sunlight outdoors.', tag: 'Grip and Diffusion' }
    ],
    film: [
      { name: 'Kodak Portra 400 (120 & 35mm)', desc: 'Legendary skin tone rendition with subtle pastel warmth under golden hour rays.', tag: 'Color Negative' },
      { name: 'Kodak Tri-X 400 Monochrome', desc: 'High-contrast monochrome film with deep blacks and unmistakable vintage grain structure.', tag: 'Classic B&W' },
      { name: 'CineStill 800Tungsten', desc: 'Cinema movie film with unique red halation around high-contrast night street lamps.', tag: 'Night & Neon' }
    ]
  };

  const timeline = [
    { year: '2018', title: 'Brooklyn Darkroom Roots', desc: 'Began hand-developing 35mm street rolls in a Bushwick loft, learning to read natural light without meters.' },
    { year: '2021', title: 'Vogue & Editorial Recognition', desc: 'Commissioned for high-fashion lookbooks and published in international contemporary photography journals.' },
    { year: '2024', title: 'Global Documentary Studio', desc: 'Covered 100+ private weddings and architectural campaigns spanning Zurich, Kyoto, Paris, and Big Sur.' },
    { year: '2026', title: 'Capture Atelier Launch', desc: 'Full-service visual studio delivering heirloom print albums, 4K behind-the-scenes film, and private galleries.' }
  ];

  return (
    <div className="page-wrapper about-detail-page">
      {/* Dedicated Page Hero Header */}
      <section className="page-header-hero">
        <div className="page-container">
          <div className="page-eyebrow-pill">
            <Award size={15} />
            <span>Documentary & Editorial Atelier</span>
          </div>
          <h1 className="page-hero-title">
            Preserving genuine <span className="serif-italic">emotions</span>,<br />
            fleeting memories & untold stories.
          </h1>
          <p className="page-hero-subtitle">
            Alex Rivera is an international documentary photographer specializing in raw, unposed weddings,
            cinematic editorial spreads, and brand storytelling across the globe.
          </p>
        </div>
      </section>

      {/* Philosophy & Video HUD Section */}
      <section className="about-core-section">
        <div className="page-container">
          <div className="about-header-grid">
            <div className="about-badge-col">
              <div className="aperture-badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94" />
                </svg>
                <span>The Philosophy</span>
              </div>
            </div>
            <div className="about-quote-col">
              <h2 className="about-quote" ref={quoteRef}>
                {quoteWords.map((item, idx) => (
                  <React.Fragment key={idx}>
                    <span
                      className={`reveal-word ${item.italic ? 'serif-italic' : ''}`}
                      style={{ display: 'inline-block', willChange: 'transform, opacity, filter' }}
                    >
                      {item.text}
                    </span>{' '}
                  </React.Fragment>
                ))}
              </h2>
            </div>
          </div>

          <div className="about-content-grid">
            <div className="about-video-box">
              <img
                src="/photos/ATfEhhE5N93aBRRVAnYeNawpHVA.webp"
                alt="Alex Rivera with camera"
                className="about-video-img"
              />
              <div className="video-player-bar">
                <button
                  type="button"
                  className="video-play-btn"
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                >
                  {isPlaying ? (
                    <Pause size={13} fill="white" color="white" />
                  ) : (
                    <Play size={13} fill="white" color="white" style={{ marginLeft: '1px' }} />
                  )}
                </button>
                <span className="video-timer">0:00 / 0:09</span>
                <div className="video-scrubber">
                  <div
                    className="video-scrubber-progress"
                    style={{ width: isPlaying ? '65%' : '0%' }}
                  />
                </div>
                <button type="button" className="video-icon-btn" aria-label="Fullscreen">
                  <Maximize2 size={13} />
                </button>
              </div>
            </div>

            <div className="about-narrative-box">
              <p className="about-description">
                Photography for me has never been about rigid poses or artificial smiles. It is about the subtle pause between breaths, the unscripted teardrop during private vows, and the raw, electric energy of two souls who forgot the camera even existed.
              </p>
              <p className="about-description" style={{ marginTop: '-16px' }}>
                Every assignment is treated with deep editorial reverence. Whether shooting on 35mm film or high-fidelity medium format digital, the goal is always singular: crafting photographs that still take your breath away three decades from today.
              </p>
              <div className="about-chat-row">
                <button
                  type="button"
                  className="about-chat-text-btn"
                  onClick={onOpenChat}
                >
                  Let's chat &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Gear Bag Section */}
      <section className="about-gear-section">
        <div className="page-container">
          <div className="gear-header-center">
            <span className="section-sublabel">THE TOOLKIT</span>
            <h2 className="section-title">
              Inside the <span className="serif-italic">Camera Bag</span>
            </h2>
            <p className="section-subtext">
              Precision optics and analog mechanics chosen specifically for their rendering of skin, shadow, and natural atmosphere.
            </p>
          </div>

          <div className="gear-tabs-nav">
            <button
              className={'gear-tab-btn ' + (activeGearTab === 'bodies' ? 'active' : '')}
              onClick={() => setActiveGearTab('bodies')}
            >
              <Camera size={16} /> Bodies
            </button>
            <button
              className={'gear-tab-btn ' + (activeGearTab === 'lenses' ? 'active' : '')}
              onClick={() => setActiveGearTab('lenses')}
            >
              <Sun size={16} /> Prime Lenses
            </button>
            <button
              className={'gear-tab-btn ' + (activeGearTab === 'lighting' ? 'active' : '')}
              onClick={() => setActiveGearTab('lighting')}
            >
              <Award size={16} /> Studio Lighting
            </button>
            <button
              className={'gear-tab-btn ' + (activeGearTab === 'film' ? 'active' : '')}
              onClick={() => setActiveGearTab('film')}
            >
              <Film size={16} /> Film Stocks
            </button>
          </div>

          <div className="gear-grid">
            {gearData[activeGearTab].map((item, idx) => (
              <div key={idx} className="gear-card">
                <div className="gear-card-top">
                  <span className="gear-tag">{item.tag}</span>
                  <span className="gear-number">{idx + 1 < 10 ? '0' + (idx + 1) : idx + 1}</span>
                </div>
                <h3 className="gear-name">{item.name}</h3>
                <p className="gear-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Creative Journey Timeline */}
      <section className="about-timeline-section">
        <div className="page-container">
          <div className="timeline-header-center">
            <span className="section-sublabel">JOURNEY</span>
            <h2 className="section-title">
              Milestones & <span className="serif-italic">Evolution</span>
            </h2>
          </div>

          <div className="timeline-list">
            {timeline.map((step, idx) => (
              <div key={idx} className="timeline-row">
                <div className="timeline-year-col">
                  <span className="timeline-year-badge">{step.year}</span>
                </div>
                <div className="timeline-content-col">
                  <h4 className="timeline-step-title">{step.title}</h4>
                  <p className="timeline-step-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Booking CTA Banner */}
      <section className="page-cta-banner">
        <div className="page-container">
          <div className="cta-banner-card">
            <h3 className="cta-banner-title">
              Have an upcoming project, wedding, or lookbook?
            </h3>
            <p className="cta-banner-subtext">
              Available worldwide for private commissions and commercial assignments.
            </p>
            <button type="button" className="cta-banner-btn" onClick={onOpenChat}>
              <span>Book a Consultation</span>
              <ArrowUpRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}