import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Target,
  Lightbulb,
  Clock,
  Feather,
  Zap,
  HeartHandshake,
} from 'lucide-react';
import StaggerTitle from '../components/StaggerTitle';
import PageHeroStage from '../components/PageHeroStage';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage({ onOpenChat }) {
  const trioContainerRef = useRef(null);
  const cardCol1Ref = useRef(null);
  const cardCol2Ref = useRef(null);
  const cardCol3Ref = useRef(null);

  const whySectionRef = useRef(null);
  const whyBgCanvasRef = useRef(null);
  const whyGridRef = useRef(null);

  useEffect(() => {
    // 1. Fixed Background Canvas for Why Choose Section (Home screen type vertical frame scrolling)
    const whyEl = whySectionRef.current;
    const whyCanvas = whyBgCanvasRef.current;

    let ticking = false;

    const handleWhyScroll = () => {
      if (!whyEl || !whyCanvas) return;
      const scrollY = window.scrollY || window.pageYOffset;
      const rect = whyEl.getBoundingClientRect();

      if (rect.top <= window.innerHeight + 100 && rect.bottom >= -150) {
        const offset = scrollY - (whyEl.offsetTop || 0);
        whyCanvas.style.transform = `translate3d(0, ${offset}px, 0)`;
      }
      ticking = false;
    };

    const onWhyScroll = () => {
      if (!ticking) {
        requestAnimationFrame(handleWhyScroll);
        ticking = true;
      }
    };

    handleWhyScroll();
    window.addEventListener('scroll', onWhyScroll, { passive: true });
    window.addEventListener('resize', onWhyScroll, { passive: true });
    if (window.__lenis) {
      window.__lenis.on('scroll', onWhyScroll);
    }

    // 2. GSAP Animations for Trio Parallax & Why Choose Cards
    const ctx = gsap.context(() => {
      const isDesktop = window.innerWidth > 768;

      const trioCards = [cardCol1Ref.current, cardCol2Ref.current, cardCol3Ref.current].filter(Boolean);
      if (trioCards.length && trioContainerRef.current) {
        gsap.fromTo(
          trioCards,
          { opacity: 0, y: 60, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.15,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: trioContainerRef.current,
              start: 'top 85%',
            },
          }
        );

        if (isDesktop) {
          gsap.to(cardCol1Ref.current, {
            y: -50,
            ease: 'none',
            scrollTrigger: {
              trigger: trioContainerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          });

          gsap.to(cardCol2Ref.current, {
            y: -110,
            ease: 'none',
            scrollTrigger: {
              trigger: trioContainerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          });

          gsap.to(cardCol3Ref.current, {
            y: -65,
            ease: 'none',
            scrollTrigger: {
              trigger: trioContainerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          });
        }
      }

      if (whyGridRef.current) {
        const cards = whyGridRef.current.querySelectorAll('.why-choose-card');
        if (cards && cards.length) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 45, scale: 0.97 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              stagger: 0.09,
              duration: 0.85,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: whyGridRef.current,
                start: 'top 80%',
              },
            }
          );
        }
      }
    });

    return () => {
      window.removeEventListener('scroll', onWhyScroll);
      window.removeEventListener('resize', onWhyScroll);
      if (window.__lenis) {
        window.__lenis.off('scroll', onWhyScroll);
      }
      ctx.revert();
    };
  }, []);

  const clientLogos = [
    { name: 'EOS', icon: '✦' },
    { name: 'Cooperative', icon: '❖' },
    { name: '45 Degrees°', icon: '↗' },
    { name: 'LaunchSimple', icon: '◬' },
    { name: 'Frequencii', icon: '◈' },
    { name: 'Vogue Atelier', icon: '●' },
  ];

  const trioShowcase = [
    {
      id: 1,
      image: '/photos/atJSGWOSmoPWXD4zqFDhjEhPltc.webp',
      tag: 'Documentary Wedding',
      title: 'Lake Como Nuptials',
      ref: cardCol1Ref,
      customClass: 'trio-col-1',
    },
    {
      id: 2,
      image: '/photos/EDjXZUxH9PUJ4Sc3htDzn89mi0.webp',
      tag: 'Cinematic Fashion',
      title: 'Crimson Desert Horizon',
      ref: cardCol2Ref,
      customClass: 'trio-col-2',
    },
    {
      id: 3,
      image: '/photos/5WjX1vJg991GRNOY7QwweeYhYUA.webp',
      tag: '4K Cinema Still',
      title: 'Milan Twilight Cruise',
      ref: cardCol3Ref,
      customClass: 'trio-col-3',
    },
  ];

  const whyChooseFeatures = [
    {
      num: '01',
      title: 'One-Stop Solution',
      desc: 'Comprehensive visual services for both high-resolution Photography and 4K Cinema Video Editing under one roof, ensuring complete stylistic harmony.',
      icon: Target,
    },
    {
      num: '02',
      title: 'Innovative Budget Designs',
      desc: 'Creative production and post-production solutions tailored to fit within your specified budget without compromising on editorial caliber.',
      icon: Lightbulb,
    },
    {
      num: '03',
      title: 'Consistent Delivery',
      desc: 'Timely and disciplined turnaround schedules with sneak peek delivery within 48 hours, backed by strict color-grading pipeline management.',
      icon: Clock,
    },
    {
      num: '04',
      title: 'Proven Experience',
      desc: 'Successfully documented over 300 spaces and 1,000+ projects across 18 years in luxury weddings, international fashion, and commercial spaces.',
      icon: Feather,
    },
    {
      num: '05',
      title: 'Latest Technology',
      desc: 'Tech-integrated editing suites featuring calibrated DaVinci color grading, Apple ProRes 4444 master exports, and custom audio foley scoring.',
      icon: Zap,
    },
    {
      num: '06',
      title: 'Post-Project Service',
      desc: 'Dedicated archival support and maintenance services even after your project is completed and handed over, including private cloud access forever.',
      icon: HeartHandshake,
    },
  ];

  const clientReviews = [
    {
      id: 1,
      quote:
        '""Unlike many beiges, this color has undertones of gray that can give your space a warm, snug feel. Pair it with earthy tones for a balanced and natural look.""',
      name: 'Runa Long',
      role: 'Painter & Fine Artist',
      initial: 'R',
    },
    {
      id: 2,
      quote:
        '"We felt heard and understood at every step. Their design and video editing choices not only impressed—but told our story in ways we never could with words alone."',
      name: 'Sophie Lang',
      role: 'AI Engineer & Studio Founder',
      initial: 'S',
    },
    {
      id: 3,
      quote:
        '"Their work brought our entire brand to life—subtle, thoughtful, and timeless. Every element felt carefully crafted, both visually and emotionally."',
      name: 'Amelia Hart',
      role: 'Vale Studio Director',
      initial: 'A',
    },
  ];

  const scrollToLeadership = () => {
    const el = document.querySelector('.about-leadership-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="page-wrapper about-detail-page">
      {/* =========================================================
          SECTION 1: HOME SCREEN HERO STAGE WITH FIXED VERTICAL SCROLLING FRAME
          ========================================================= */}
      <PageHeroStage
        titleMain="about®"
        titleTag="Vision & Heritage"
        description="A leading team of photographers, cinematographers, and colorists providing superior visual space-planning, heirloom installations, and cinematic storytelling worldwide since 2003."
        bgImage="/photos/atJSGWOSmoPWXD4zqFDhjEhPltc.webp"
        cardImage="/photos/y6nsXyFCXVHybL6AG2drPt8Xug.webp"
        cardTitle={"Mr. Alex Rivera\nManaging Director & Lead Editor"}
        cardSubtitle="Over 18 Years Legacy"
        cardButtonText="Meet Founder"
        onCardButtonClick={scrollToLeadership}
        badgeText="Documenting Spaces Since 2003"
      />

      {/* Brand Partners Strip & 3-Photo Vertical Parallax Showcase */}
      <section className="about-hero-reference">
        <div className="page-container">
          <div className="about-client-strip" aria-label="Brand Partners">
            {clientLogos.map((brand, idx) => (
              <div key={idx} className="client-strip-logo">
                <span>{brand.icon}</span>
                <span>{brand.name}</span>
              </div>
            ))}
          </div>

          <div className="about-trio-showcase" ref={trioContainerRef}>
            {trioShowcase.map((card) => (
              <div
                key={card.id}
                ref={card.ref}
                className={`trio-col-wrap ${card.customClass}`}
              >
                <div className="trio-card">
                  <img src={card.image} alt={card.title} className="trio-img" loading="lazy" />
                  <div className="trio-card-overlay">
                    <span className="trio-card-tag">{card.tag}</span>
                    <h3 className="trio-card-title">{card.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 2: THE LEADERSHIP / PRINCIPAL
          ========================================================= */}
      <section className="about-leadership-section">
        <div className="leadership-watermark" aria-hidden="true">
          PRINCIPAL
        </div>

        <div className="page-container">
          <div className="leadership-grid">
            {/* Left Column: Rounded Founder Portrait */}
            <div className="leadership-photo-card">
              <img
                src="/photos/y6nsXyFCXVHybL6AG2drPt8Xug.webp"
                alt="Founder Alex Rivera"
                className="leadership-photo-img"
              />
            </div>

            {/* Right Column: Founder Bio & Expertise Card */}
            <div className="leadership-info-col">
              <span className="leadership-eyebrow">THE LEADERSHIP</span>

              <StaggerTitle as="h2" className="leadership-name">
                Mr. Alex Rivera
              </StaggerTitle>

              <span className="leadership-role">MANAGING DIRECTOR & FOUNDER &bull; LEAD VIDEO EDITOR</span>

              <p className="leadership-bio-text">
                An alumnus of <strong>L S Raheja</strong> and the visionary founder of <strong>capture&reg; and Edit</strong>,
                Alex leads our studio with a focus on resourcing and team excellence across photography, cinematography,
                and post-production video editing.
              </p>

              <p className="leadership-bio-text">
                He meticulously oversees the narrative pacing, audio mastering, and color timing of the organization,
                ensuring every project is supported by the best artistic talent and highest technical fidelity.
              </p>

              {/* Black Rounded Expertise Card */}
              <div className="leadership-expertise-box">
                <span className="expertise-label">EXPERTISE</span>
                <p className="expertise-statement">
                  Over <strong>18 years</strong> of creating unique identities through signature color timing,
                  narrative editing, and architectural precision.
                </p>
              </div>

              {/* Quote Underneath */}
              <blockquote className="leadership-quote">
                &ldquo;Detailing is not just a part of the process—it's the identity of the space and the soul of the memory.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 3: WHY CHOOSING CAPTURE & EDIT? WITH HOME SCREEN FRAME ANIMATION
          ========================================================= */}
      <section className="why-choose-dark-section" ref={whySectionRef}>
        {/* Fixed Background Canvas for Vertical Window-Frame Scrolling */}
        <div className="why-choose-bg-fixed-canvas hero-bg-fixed-canvas" ref={whyBgCanvasRef}>
          <img
            src="/photos/PtOmfIDqFPfLwMMucdVIw0jwKwk.webp"
            alt="Cinematic background atmosphere"
            className="why-choose-bg-media hero-bg-media"
          />
          <div className="why-choose-overlay hero-overlay" />
        </div>

        {/* Decorative Crosshair Row matching home screen */}
        <div className="hero-crosshair-row" aria-hidden="true">
          <span className="cross-mark">+</span>
          <span className="cross-mark">+</span>
          <span className="cross-dot" />
          <span className="cross-mark">+</span>
          <span className="cross-mark">+</span>
        </div>

        <div className="page-container why-choose-container">
          <div className="why-choose-header">
            <div>
              <StaggerTitle as="h2" className="why-choose-title">
                Why choosing CAN Designs?
              </StaggerTitle>
            </div>
            <p className="why-choose-sub">
              A synergy of two decades of heritage and future-ready innovation.
            </p>
          </div>

          {/* 6-Grid Feature Cards with Entrance Stagger and Static Frame Inset */}
          <div className="why-choose-grid" ref={whyGridRef}>
            {whyChooseFeatures.map((feat) => {
              const IconComp = feat.icon;
              return (
                <div key={feat.num} className="why-choose-card">
                  <div>
                    <div className="card-icon-num-row">
                      <IconComp className="card-feature-icon" strokeWidth={1.8} />
                      <span className="card-num-watermark">{feat.num}</span>
                    </div>
                    <h3 className="card-feature-title">{feat.title}</h3>
                  </div>
                  <p className="card-feature-desc">{feat.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Bottom Legacy Stats Banner */}
          <div className="why-choose-bottom-stats">
            <div>
              <span className="stat-dot-separator">&#9679;</span>
              <span>18 YEARS OF LEGACY</span>
            </div>
            <div>
              <span>300+ RESIDENTIAL & CORPORATE PROJECTS</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 4: CLIENT VOICES
          ========================================================= */}
      <section className="client-voices-section">
        <div className="page-container">
          <div className="client-voices-header">
            <StaggerTitle as="h2" className="client-voices-title">
              Client Voices
            </StaggerTitle>
            <p className="client-voices-sub">
              Real feedback from the people we've had the pleasure to design for. Their words reflect the impact of our work.
            </p>
          </div>

          {/* 3 Review Cards */}
          <div className="client-voices-grid">
            {clientReviews.map((rev) => (
              <div key={rev.id} className="voice-card">
                <div>
                  <div className="voice-stars-row">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>&#9733;</span>
                    ))}
                  </div>
                  <p className="voice-quote-text">{rev.quote}</p>
                </div>

                <div className="voice-author-row">
                  <div className="voice-avatar-initial">{rev.initial}</div>
                  <div className="voice-author-info">
                    <span className="voice-author-name">{rev.name}</span>
                    <span className="voice-author-role">{rev.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Collaborative Statement */}
          <p className="client-voices-closing-note">
            Exceptional design is a team effort. We collaborate closely to bring aligned, thoughtful results that not only meet but transcend expectations.
          </p>
        </div>
      </section>
    </div>
  );
}