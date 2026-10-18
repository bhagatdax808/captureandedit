import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Footer({ onOpenChat }) {
  const footerRef = useRef(null);
  const bgCanvasRef = useRef(null);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/projects', label: 'Projects' },
    { to: '/services', label: 'Services' },
    { to: '#contact', label: 'Contact', isAction: true },
  ];

  const socialLinks = [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'x.com', href: 'https://x.com' },
  ];

  const handleContactClick = (e) => {
    e.preventDefault();
    if (onOpenChat) {
      onOpenChat();
    }
  };

  useEffect(() => {
    const footerEl = footerRef.current;
    const bgCanvas = bgCanvasRef.current;
    if (!footerEl || !bgCanvas) return;

    let ticking = false;

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const rect = footerEl.getBoundingClientRect();

      // Static image frame effect: keeps background image static while frame scrolls over it
      if (rect.top <= window.innerHeight + 100 && rect.bottom >= -150) {
        const offset = scrollY - (footerEl.offsetTop || 0);
        bgCanvas.style.transform = `translate3d(0, ${offset}px, 0)`;
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
    <footer className="framer-editorial-footer" id="site-footer" ref={footerRef}>
      {/* Background Fixed Window Canvas for Static Parallax Frame Scrolling */}
      <div className="footer-bg-fixed-canvas" ref={bgCanvasRef} aria-hidden="true">
        <img
          src="/photos/firstpage.webp"
          alt=""
          className="footer-bg-portrait"
          loading="lazy"
        />
        <div className="footer-backdrop-gradient" />
        <div className="footer-grid-guides">
          <span className="guide-line guide-1" />
          <span className="guide-line guide-2" />
          <span className="guide-line guide-3" />
        </div>
      </div>

      <div className="footer-inner-container">
        {/* Main 3-Column Content Flow */}
        <div className="footer-main-grid">
          {/* Column 1: Left CTA */}
          <div className="footer-col-left">
            <div className="footer-cta-block">
              <p className="footer-cta-sub">
                Ready to capture the moments that matter most?
              </p>
              <h3
                className="footer-cta-heading"
                onClick={handleContactClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleContactClick(e)}
              >
                Let's make it happen.
                <span className="heading-subline">Contact me today!</span>
              </h3>
            </div>
          </div>


          {/* Column 3: Right Nav Links & Socials */}
          <div className="footer-col-right">
            <nav className="footer-primary-nav" aria-label="Footer Navigation">
              <ul className="footer-nav-list">
                {navLinks.map((item, idx) => (
                  <li key={idx} className="footer-nav-item">
                    {item.isAction ? (
                      <button
                        type="button"
                        onClick={handleContactClick}
                        className="footer-nav-link footer-nav-btn"
                      >
                        {item.label}
                      </button>
                    ) : (
                      <Link to={item.to} className="footer-nav-link">
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="footer-socials-group">
              <ul className="footer-socials-list">
                {socialLinks.map((soc, idx) => (
                  <li key={idx}>
                    <a
                      href={soc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-social-link"
                    >
                      <span>{soc.label}</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="arrow-glyph"
                        aria-hidden="true"
                      >
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Giant Brand Typography & Legal Bar */}
        <div className="footer-bottom-stage">
          <div className="footer-hero-brand-wrap">
            <div className="footer-hero-brand-name">
              <span className="brand-line">CAPTURE</span>
              <span className="brand-line">& EDITS.</span>
            </div>
          </div>

          <div className="footer-copyright-note">
            <span>&copy; {new Date().getFullYear()} Capture&reg;. All rights reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
}