import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';

export default function Navbar({ onOpenChat }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Auto-close menu when navigating
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/projects', label: 'Projects' },
    { to: '/services', label: 'Services' },
  ];

  const handleContactClick = () => {
    setIsOpen(false);
    if (onOpenChat) {
      onOpenChat();
    }
  };

  return (
    <>
      {/* Top Header: Left = capture & edits logo (Home page only), Right = 3-Line Hamburger */}
      <header className="nav-topbar" aria-label="Main Navigation">
        <Link to="/" className="nav-can-logo-link" aria-label="Capture & Edits Home">
          <svg
            width="44"
            height="28"
            viewBox="0 0 50 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="can-brand-svg-mark"
            aria-hidden="true"
          >
            {/* Left 'c' circle */}
            <circle cx="15" cy="15" r="10" stroke="#1c2024" strokeWidth="4.8" />
            {/* Overlap orange arc connecting both */}
            <path
              d="M 15 5 A 10 10 0 0 1 25 15 A 10 10 0 0 1 15 25"
              stroke="#fa8232"
              strokeWidth="4.8"
              strokeLinecap="round"
            />
            {/* Right 'a' circle */}
            <circle cx="29" cy="15" r="10" stroke="#b0b5be" strokeWidth="4.8" />
            {/* Right 'a' vertical stem */}
            <path
              d="M 39 15 L 39 25"
              stroke="#b0b5be"
              strokeWidth="4.8"
              strokeLinecap="round"
            />
          </svg>
          <div className="can-brand-text-group">
            <div className="can-brand-primary-name">
              <span className="can-name-orange">capture</span>{' '}
              <span className="can-name-dark">&amp; edits</span>
            </div>
            <div className="can-brand-tagline">
              PHOTOGRAPHY &amp; FILM PRODUCTION
            </div>
          </div>
        </Link>

        <button
          type="button"
          className="nav-minimal-hamburger"
          onClick={() => setIsOpen(true)}
          aria-label="Open Navigation Menu"
        >
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
        </button>
      </header>

      {/* Fullscreen Navigation Modal Overlay */}
      <div
        className={`nav-fullscreen-overlay ${isOpen ? 'is-open' : ''}`}
        aria-hidden={!isOpen}
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button at Top-Right */}
        <button
          type="button"
          className="overlay-close-btn"
          onClick={() => setIsOpen(false)}
          aria-label="Close navigation menu"
        >
          <X size={28} strokeWidth={1.8} />
        </button>

        <div className="overlay-content-wrapper">
          {/* Left Column: Rounded Brand Visual Card */}
          <div className="overlay-visual-card">
            <div className="visual-card-header">
              <div className="can-brand-logo-lockup">
                <svg
                  width="44"
                  height="28"
                  viewBox="0 0 50 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="can-brand-svg-mark"
                  aria-hidden="true"
                >
                  <circle cx="15" cy="15" r="10" stroke="#1c2024" strokeWidth="4.8" />
                  <path
                    d="M 15 5 A 10 10 0 0 1 25 15 A 10 10 0 0 1 15 25"
                    stroke="#fa8232"
                    strokeWidth="4.8"
                    strokeLinecap="round"
                  />
                  <circle cx="29" cy="15" r="10" stroke="#b0b5be" strokeWidth="4.8" />
                  <path
                    d="M 39 15 L 39 25"
                    stroke="#b0b5be"
                    strokeWidth="4.8"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="can-brand-text-group">
                  <div className="can-brand-primary-name">
                    <span className="can-name-orange">capture</span>{' '}
                    <span className="can-name-dark">&amp; edits</span>
                  </div>
                  <div className="can-brand-tagline">
                    PHOTOGRAPHY &amp; FILM PRODUCTION
                  </div>
                </div>
              </div>
            </div>

            <div className="visual-card-footer">
              <div className="visual-card-spark" aria-hidden="true">❖</div>
              <h3 className="visual-card-quote">
                Timeless captures, modern storytelling
              </h3>
              <div className="visual-card-tag">
                Inspiring
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Navigation Links */}
          <div className="overlay-details-panel">
            <div className="details-main-content">
              <h2 className="details-hero-title">GET IN TOUCH</h2>

              <a
                href="mailto:hello@captureandedit.com"
                className="details-email-anchor"
              >
                hello@captureandedit.com
              </a>

              <div className="details-nav-block">
                <p className="details-nav-heading">Navigation:</p>
                <nav className="details-nav-grid" aria-label="Overlay Navigation">
                  {navLinks.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="details-nav-link"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <button
                    type="button"
                    className="details-nav-link details-nav-btn-link"
                    onClick={handleContactClick}
                  >
                    Contact
                  </button>
                </nav>
              </div>
            </div>

            <div className="details-footer-row">
              <span className="details-copyright">
                &copy; {new Date().getFullYear()}. All rights reserved
              </span>
              <span className="details-decor-cross" aria-hidden="true">❖</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}