import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { clientAvatars } from '../data/portfolioData';
import StaggerTitle from './StaggerTitle';

export default function Hero({ onOpenChat }) {
  const heroRef = useRef(null);
  const bgCanvasRef = useRef(null);

  useEffect(() => {
    const heroEl = heroRef.current;
    const bgCanvas = bgCanvasRef.current;
    if (!heroEl || !bgCanvas) return;

    // Entrance animation for the bottom frame card and brand block
    const featureCard = heroEl.querySelector('.hero-feature-card');
    const brandBlock = heroEl.querySelector('.hero-brand-block');
    if (featureCard) {
      gsap.fromTo(
        featureCard,
        { opacity: 0, y: 35, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: 'power3.out', delay: 0.15 }
      );
    }
    if (brandBlock) {
      gsap.fromTo(
        brandBlock,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.05 }
      );
    }

    let ticking = false;

    const handleScroll = () => {
      // Prevent mobile touch scroll stutter/jitter
      if (window.innerWidth <= 768) {
        if (bgCanvas.style.transform && bgCanvas.style.transform !== 'none') {
          bgCanvas.style.transform = 'none';
        }
        ticking = false;
        return;
      }

      const scrollY = window.scrollY || window.pageYOffset;
      const heroHeight = heroEl.offsetHeight;

      // Keep background image in its place while the hero frame scrolls naturally
      if (scrollY <= heroHeight + 150) {
        bgCanvas.style.transform = 'translate3d(0, ' + scrollY + 'px, 0)';
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
        <div className="hero-brand-block">
          <div className="hero-title-group">
            <h1 className="hero-huge-title">
              capture&reg;
            </h1>
            <div className="hero-lens-tag">and Edit</div>
          </div>
          <p className="hero-description">
            &mdash; Capture real emotions and turn fleeting moments-weddings, family bonds, or shared laughter into lasting memories.
          </p>
        </div>

        <div className="hero-feature-card">
          <img
            src="/photos/YXpKW5QZVYj5CA2vlrmyeVbUyQ.webp"
            alt="Creative portraiture preview"
            className="card-bg-media"
          />
          <div className="card-bg-overlay" />

          <div className="card-top-content">
            <StaggerTitle as="h3" className="card-title-text" triggerStart="top 95%">
              Professional creative<br />photography
            </StaggerTitle>
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