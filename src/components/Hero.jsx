import React from 'react';
import { clientAvatars } from '../data/portfolioData';

export default function Hero({ onOpenChat }) {
  return (
    <section className="hero-stage" id="hero">
      {/* Background Media: Visor Model from firstpage.webp (Clean, no border, no shadow) */}
      <img
        src="/photos/firstpage.webp"
        alt="Creative photography of model with light visor"
        className="hero-bg-media"
      />
      <div className="hero-overlay" />

      {/* Crosshair Marks */}
      <div className="hero-crosshair-row" aria-hidden="true">
        <span className="cross-mark">+</span>
        <span className="cross-mark">+</span>
        <span className="cross-dot" />
        <span className="cross-mark">+</span>
        <span className="cross-mark">+</span>
      </div>

      {/* Top Right: Happy Clients Widget */}
      <div className="hero-top-right">
        <div className="avatar-stack">
          {clientAvatars.map((avatar) => (
            <img key={avatar.id} src={avatar.src} alt={avatar.alt} />
          ))}
        </div>
        <span className="clients-caption">Happy clients worldwide</span>
      </div>

      {/* Bottom Grid: Huge Brand Typography & Floating Card */}
      <div className="hero-bottom-grid">
        <div className="hero-brand-block">
          <div className="hero-title-group">
            <h1 className="hero-huge-title">
              capture&reg;
            </h1>
            <div className="hero-lens-tag">through my lens</div>
          </div>
          <p className="hero-description">
            &mdash; Capture real emotions and turn fleeting moments-weddings, family bonds, or shared
            laughter into lasting memories.
          </p>
        </div>

        {/* Floating Card Bottom Right: Image in Background, Text Cleanly Overlaid */}
        <div className="hero-feature-card">
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
