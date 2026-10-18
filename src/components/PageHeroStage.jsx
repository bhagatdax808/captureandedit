import React, { useEffect, useRef } from 'react';
import StaggerTitle from './StaggerTitle';

export default function PageHeroStage({
  titleMain = 'capture®',
  titleTag = 'and Edit',
  description = '',
  bgImage = '/photos/firstpage.webp',
  extraAction,
}) {
  const heroRef = useRef(null);
  const bgCanvasRef = useRef(null);

  useEffect(() => {
    const heroEl = heroRef.current;
    const bgCanvas = bgCanvasRef.current;
    if (!heroEl || !bgCanvas) return;

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
    <section className="hero-stage page-hero-stage" ref={heroRef}>
      {/* Fixed Background Canvas for Vertical Window-Frame Scrolling */}
      <div className="hero-bg-fixed-canvas" ref={bgCanvasRef}>
        <img
          src={bgImage}
          alt={typeof titleMain === 'string' ? titleMain : 'Page Hero Background'}
          className="hero-bg-media"
        />
        <div className="hero-overlay" />
      </div>

      {/* Decorative Crosshair Row */}
      <div className="hero-crosshair-row" aria-hidden="true">
        <span className="cross-mark">+</span>
        <span className="cross-mark">+</span>
        <span className="cross-dot" />
        <span className="cross-mark">+</span>
        <span className="cross-mark">+</span>
      </div>

      {/* Bottom Information Block firmly anchored to the left-side bottom */}
      <div className="hero-bottom-grid page-hero-bottom-single">
        <div className="hero-brand-block">
          <div className="hero-title-group">
            <h1 className="hero-huge-title">
              <StaggerTitle as="span">
                {titleMain}
              </StaggerTitle>
            </h1>
            <div className="hero-lens-tag">{titleTag}</div>
          </div>
          {description && (
            <p className="hero-description">
              &mdash; {description}
            </p>
          )}
          {extraAction}
        </div>
      </div>
    </section>
  );
}
