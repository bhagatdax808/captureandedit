import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Check, ArrowUpRight, Calculator, Clock, Film, ShieldCheck } from 'lucide-react';
import StaggerTitle from '../components/StaggerTitle';
import PageHeroStage from '../components/PageHeroStage';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesPage({ onOpenChat }) {
  const [selectedService, setSelectedService] = useState('wedding');
  const [shootDuration, setShootDuration] = useState('full');
  const [includeFilm, setIncludeFilm] = useState(true);
  const [includeAlbum, setIncludeAlbum] = useState(false);

  const packagesRef = useRef(null);
  const calcRef = useRef(null);
  const processRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Staggered reveal for Package Cards
      if (packagesRef.current) {
        const cards = packagesRef.current.querySelectorAll('.package-card');
        if (cards.length) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 50, scale: 0.97 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              stagger: 0.12,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: packagesRef.current,
                start: 'top 85%',
              },
            }
          );
        }
      }

      // 2. Reveal for Calculator Card
      if (calcRef.current) {
        gsap.fromTo(
          calcRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: calcRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // 3. Staggered reveal for Process Timeline Steps
      if (processRef.current) {
        const steps = processRef.current.querySelectorAll('.process-step-card');
        if (steps.length) {
          gsap.fromTo(
            steps,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.1,
              duration: 0.85,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: processRef.current,
                start: 'top 85%',
              },
            }
          );
        }
      }
    });

    return () => ctx.revert();
  }, []);

  const baseRates = {
    wedding: { half: 3200, full: 5400, multi: 8800, name: 'Documentary Wedding' },
    editorial: { half: 2800, full: 4600, multi: 7600, name: 'Fashion & Lookbook' },
    portrait: { half: 1400, full: 2400, multi: 4200, name: 'Executive & Founder Portrait' },
    architecture: { half: 2200, full: 3800, multi: 6400, name: 'Architectural Spatial' }
  };

  const currentBase = baseRates[selectedService][shootDuration];
  const filmAddon = includeFilm ? 450 : 0;
  const albumAddon = includeAlbum ? 850 : 0;
  const totalEstimate = currentBase + filmAddon + albumAddon;

  const detailedPackages = [
    {
      id: '01',
      name: 'Documentary Weddings',
      tagline: 'Unscripted human emotion and cinematic heirloom captures.',
      starting: '$4,500',
      features: [
        'Up to 10 hours of continuous documentary coverage',
        'Lead photographer Alex Rivera + dedicated assistant',
        '500+ hand-retouched, high-resolution master images',
        'Sneak peek delivery within 48 hours for social sharing',
        'Full private cloud gallery with unmetered family downloads',
        '3 rolls of authentic 35mm film developed and scanned'
      ]
    },
    {
      id: '02',
      name: 'Editorial & Fashion Lookbooks',
      tagline: 'Cinematic campaign visuals crafted for brands with a bold voice.',
      starting: '$3,800',
      features: [
        'Full day studio or on-location production shoot',
        'Creative moodboard curation & lighting schematics',
        '60+ master retouched editorial plates for print & digital',
        'Full worldwide commercial advertising buyout licensing',
        'Tethered live iPad preview during shoot for art director',
        'Color grading tailored to your brand identity'
      ]
    },
    {
      id: '03',
      name: 'Executive & Creator Portraits',
      tagline: 'Authentic presence and subtle authority for modern leaders.',
      starting: '$1,800',
      features: [
        '2 to 3 hours in studio or environmental workplace setting',
        'Multiple wardrobe styling and lighting transitions',
        '35 individually retouched high-res monochrome & color portraits',
        'Press-ready crop formats (1:1, 4:5, 16:9, banner)',
        'Complete commercial usage rights for PR and book jackets'
      ]
    },
    {
      id: '04',
      name: 'Architectural & Interior Stories',
      tagline: 'Spatial light studies honoring materials, balance, and craft.',
      starting: '$2,900',
      features: [
        'Sunrise to twilight environmental spatial documentation',
        'Shift-tilt perspective correction for straight vertical lines',
        'Interior detail vignettes and wide cinematic architectural plates',
        'High dynamic range compositing without artificial glare',
        'Published portfolio usage licensing for architects & builders'
      ]
    }
  ];

  const processSteps = [
    { step: '01', title: 'Initial Consultation', desc: 'A 30-minute video call to discuss your vision, location logistics, timeline, and aesthetic preferences.' },
    { step: '02', title: 'Creative Moodboard', desc: 'We build a curated visual treatment defining color palettes, lighting direction, and shot composition.' },
    { step: '03', title: 'The Shoot Day', desc: 'A relaxed, collaborative environment where unscripted moments and genuine emotion take center stage.' },
    { step: '04', title: 'Bespoke Color Grade', desc: 'Every frame is individually color-graded and balanced for authentic skin tones and natural silver grain.' },
    { step: '05', title: 'Heirloom Delivery', desc: 'Private web gallery delivery with 48h sneak peeks, followed by handcrafted linen print boxes.' }
  ];

  return (
    <div className="page-wrapper services-detail-page">
      {/* Home Screen Type Stage Frame (Clean without feature preview card) */}
      <PageHeroStage
        titleMain="services®"
        titleTag="Offerings & Rates"
        description="Tailored visual commissions for discerning couples and commercial brands across documentary photography, calibrated DaVinci color grading, and archival printing."
        bgImage="/photos/eS4Rwaq0KdMka7YC0Lt7QwVvpk.webp"
      />

      {/* Detailed Package Cards Grid */}
      <section className="packages-grid-section" ref={packagesRef}>
        <div className="page-container">
          <div className="packages-cards-grid">
            {detailedPackages.map((pkg) => (
              <div key={pkg.id} className="package-card">
                <div className="package-card-header">
                  <span className="package-index-badge">{pkg.id}</span>
                  <span className="package-price-tag">Starting at {pkg.starting}</span>
                </div>
                <h2 className="package-name">{pkg.name}</h2>
                <p className="package-tagline">{pkg.tagline}</p>
                <div className="package-divider"></div>
                <ul className="package-features-list">
                  {pkg.features.map((feat, i) => (
                    <li key={i} className="feature-item">
                      <Check size={16} className="feature-check-icon" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="package-inquire-btn"
                  onClick={onOpenChat}
                >
                  <span>Inquire About {pkg.name}</span>
                  <ArrowUpRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Price Estimator & Calculator */}
      <section className="pricing-calculator-section">
        <div className="page-container">
          <div className="calculator-wrapper-card" ref={calcRef}>
            <div className="calculator-info-pane">
              <div className="calculator-badge">
                <Calculator size={15} />
                <span>Interactive Estimator</span>
              </div>
              <h3 className="calculator-title">
                Tailor your session & <br />
                <span className="serif-italic">calculate your investment</span>
              </h3>
              <p className="calculator-desc">
                Select your service type, duration, and heirloom deliverables to see an immediate estimated investment quote.
              </p>

              <div className="calculator-guarantees">
                <div className="guarantee-row">
                  <ShieldCheck size={18} className="guarantee-icon" />
                  <span>Transparent pricing with no hidden travel fees</span>
                </div>
                <div className="guarantee-row">
                  <Clock size={18} className="guarantee-icon" />
                  <span>48-Hour sneak peek delivery guaranteed</span>
                </div>
                <div className="guarantee-row">
                  <Film size={18} className="guarantee-icon" />
                  <span>Archival quality master prints and digital RAW archives</span>
                </div>
              </div>
            </div>

            <div className="calculator-controls-pane">
              <div className="control-group">
                <label className="control-label">1. Select Commission Type</label>
                <div className="control-buttons-row">
                  <button
                    className={'control-pill ' + (selectedService === 'wedding' ? 'active' : '')}
                    onClick={() => setSelectedService('wedding')}
                  >
                    Wedding
                  </button>
                  <button
                    className={'control-pill ' + (selectedService === 'editorial' ? 'active' : '')}
                    onClick={() => setSelectedService('editorial')}
                  >
                    Editorial
                  </button>
                  <button
                    className={'control-pill ' + (selectedService === 'portrait' ? 'active' : '')}
                    onClick={() => setSelectedService('portrait')}
                  >
                    Portrait
                  </button>
                  <button
                    className={'control-pill ' + (selectedService === 'architecture' ? 'active' : '')}
                    onClick={() => setSelectedService('architecture')}
                  >
                    Architecture
                  </button>
                </div>
              </div>

              <div className="control-group">
                <label className="control-label">2. Coverage Duration</label>
                <div className="control-buttons-row">
                  <button
                    className={'control-pill ' + (shootDuration === 'half' ? 'active' : '')}
                    onClick={() => setShootDuration('half')}
                  >
                    Half Day (4h)
                  </button>
                  <button
                    className={'control-pill ' + (shootDuration === 'full' ? 'active' : '')}
                    onClick={() => setShootDuration('full')}
                  >
                    Full Day (8-10h)
                  </button>
                  <button
                    className={'control-pill ' + (shootDuration === 'multi' ? 'active' : '')}
                    onClick={() => setShootDuration('multi')}
                  >
                    Weekend / Multi-Day
                  </button>
                </div>
              </div>

              <div className="control-group">
                <label className="control-label">3. Heirloom Deliverables</label>
                <div className="checkbox-options-grid">
                  <label className="checkbox-card-option">
                    <input
                      type="checkbox"
                      checked={includeFilm}
                      onChange={(e) => setIncludeFilm(e.target.checked)}
                    />
                    <span>35mm Analog Film Rolls (+)</span>
                  </label>
                  <label className="checkbox-card-option">
                    <input
                      type="checkbox"
                      checked={includeAlbum}
                      onChange={(e) => setIncludeAlbum(e.target.checked)}
                    />
                    <span>Linen Handcrafted Heirloom Album (+)</span>
                  </label>
                </div>
              </div>

              <div className="calculator-total-bar">
                <div className="total-text-group">
                  <span className="total-label">Estimated Investment</span>
                  <span className="total-amount">{"$" + totalEstimate.toLocaleString()}</span>
                </div>
                <button
                  type="button"
                  className="total-inquire-btn"
                  onClick={onOpenChat}
                >
                  <span>Inquire with this Package</span>
                  <ArrowUpRight size={17} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Process Timeline */}
      <section className="process-timeline-section">
        <div className="page-container">
          <div className="process-header-center">
            <span className="section-sublabel">THE WORKFLOW</span>
            <h2 className="section-title">
              From Consultation to <span className="serif-italic">Heirloom Gallery</span>
            </h2>
          </div>

          <div className="process-steps-grid" ref={processRef}>
            {processSteps.map((s) => (
              <div key={s.step} className="process-step-card">
                <span className="step-number">{s.step}</span>
                <h4 className="step-title">{s.title}</h4>
                <p className="step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}