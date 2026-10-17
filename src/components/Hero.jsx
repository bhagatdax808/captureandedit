import React, { useEffect, useRef } from 'react';
import { clientAvatars } from '../data/portfolioData';

export default function Hero({ onOpenChat }) {
  const heroRef = useRef(null);
  const bgCanvasRef = useRef(null);
  const brandRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const heroEl = heroRef.current;
    const bgCanvas = bgCanvasRef.current;
    if (!heroEl || !bgCanvas) return;

    let ticking = false;

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const heroHeight = heroEl.offsetHeight;

      if (scrollY <= heroHeight + 100) {
        bgCanvas.style.transform = 'translate3d(0, ' + scrollY + 'px, 0)';

        const progress = Math.min(1, Math.max(0, scrollY / (heroHeight * 0.8)));
        const fadeVal = String(1 - progress * 0.55);
        if (brandRef.current) {
          brandRef.current.style.transform = 'translate3d(0, -' + (scrollY * 0.12) + 'px, 0)';
          brandRef.current.style.opacity = fadeVal;
        }
        if (cardRef.current) {
          cardRef.current.style.transform = 'translate3d(0, -' + (scrollY * 0.2) + 'px, 0)';
          cardRef.current.style.opacity = fadeVal;
        }
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    handleScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    if (window.__lenis) {
      window.__lenis.on('scroll', onScroll);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (window.__lenis) {
        window.__lenis.off('scroll', onScroll);
      }
    };
  }, []);

  return (
    <section className="hero-stage" id="hero" ref={heroRef}>
      <div className="hero-bg-fixed-canvas" ref={bgCanvasRef}>
        <img
          src="/photos/firstpage.webp"
          alt="Creative photography of model with light visor"
          className="hero-bg-media"
        />
        <div className="hero-overlay" />
      </div>

      <div className="hero-crosshair-row" aria-hidden="true">
        <span className="cross-mark">+</span>
        <span className="cross-mark">+</span>
        <span className="cross-dot" />
        <span className="cross-mark">+</span>
        <span className="cross-mark">+</span>
      </div>

      <div className="hero-top-right">
        <div className="avatar-stack">
          {clientAvatars.map((avatar) => (
            <img key={avatar.id} src={avatar.src} alt={avatar.alt} />
          ))}
        </div>
        <span className="clients-caption">Happy clients worldwide</span>
      </div>

      <div className="hero-bottom-grid">
        <div className="hero-brand-block" ref={brandRef}>
          <div className="hero-title-group">
            <h1 className="hero-huge-title">
              capture&reg;
            </h1>
            <div className="hero-lens-tag">through my lens</div>
          </div>
          <p className="hero-description">
            &mdash; Capture real emotions and turn fleeting moments-weddings, family bonds, or shared laughter into lasting memories.
          </p>
        </div>

        <div className="hero-feature-card" ref={cardRef}>
          <img
            src="/photos/YXpKW5QZVYj5CA2vlrmyeVbUyQ.webp"
            alt="Creative portraiture preview"
            className="card-bg-media"
          />
          <div className="card-bg-overlay" />

          <div className="card-top-content">
            <h3 className="card-title-text">
              Professional creative<br />photography
            </h3>
          </div>

          <div className="card-footer-row">
            <span className="card-year">&copy; 2026</span>
            <button className="card-chat-btn" type="button" onClick={onOpenChat}>
              Let's chat
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}