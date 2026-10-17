import React from 'react';
import { clientAvatars } from '../data/portfolioData';

export default function WhyChooseMe() {
  const streamRow1 = [
    'photos/5QD4gq8SXUlDrEqPWmWKw4gsB0Y.webp',
    'photos/hMH3wtZnELIRTERjHWcZy4tHu0.webp',
    'photos/fqbzCqmxwVrEstVQLw80EJWI.webp',
    'photos/y6nsXyFCXVHybL6AG2drPt8Xug.webp',
    'photos/OPlEwXTCExFA6XWSSCcAd08s8o.webp',
  ];

  const streamRow2 = [
    'photos/PtOmfIDqFPfLwMMucdVIw0jwKwk.webp',
    'photos/Y2OvZnk4qxbxW0miBtWc6m8g.webp',
    'photos/33MV0IZmK3REFJalk6IMW9hZ8.webp',
    'photos/ZSyMpL8lvnOJDsnLpJIpYhAEoY.webp',
    'photos/vBbp3UFXMUZNQ4RfI3RjS3iDmPE.webp',
  ];

  const streamRow3 = [
    'photos/0wAQnSK8HJ1PqWcUHPNg7r4fQ.webp',
    'photos/GBnQnQd8wzM0iTfsxo2Ry3g6CQ.webp',
    'photos/WNLmA9eUN1dEBUPu6SMcwSAn05A.webp',
    'photos/PZYfFvZVyilvFHwmkx9JUpJbUI.webp',
    'photos/ZbIHQ4En9g1fFVY4ihQ8XwHYdu4.webp',
  ];

  return (
    <section id="why-choose-me" className="why-section">
      <div className="container">
        {/* Section Heading */}
        <div className="why-heading-container">
          <h2 className="why-main-title">
            Why choose me as your -<br />
            <span className="serif-italic">Personal Photographer</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="bento-container">
          {/* Row 1: Fan Card + 10-Photo Collage */}
          <div className="bento-row-top">
            {/* Card 1: Fan Card (3,699+ Photos) */}
            <div className="bento-card bento-fan-card">
              <div className="fan-watermark">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" stroke="#d5d5d5" />
                  <path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94" stroke="#d5d5d5" />
                </svg>
              </div>

              {/* Fanned Photos Stack */}
              <div className="fan-stack-wrapper">
                <div className="fan-photo fan-photo-1">
                  <img src="photos/0wAQnSK8HJ1PqWcUHPNg7r4fQ.webp" alt="Story portrait 1" />
                </div>
                <div className="fan-photo fan-photo-2">
                  <img src="photos/GBnQnQd8wzM0iTfsxo2Ry3g6CQ.webp" alt="Story portrait 2" />
                </div>
                <div className="fan-photo fan-photo-3">
                  <img src="photos/WNLmA9eUN1dEBUPu6SMcwSAn05A.webp" alt="Story portrait 3" />
                </div>
                <div className="fan-photo fan-photo-4">
                  <img src="photos/PZYfFvZVyilvFHwmkx9JUpJbUI.webp" alt="Story portrait 4" />
                </div>
              </div>

              <div className="fan-text-footer">
                <div className="fan-stat-number">3,699+</div>
                <p className="fan-stat-label">Photos taken, each telling a unique story</p>
              </div>
            </div>

            {/* Card 2: 3-Stream Photography Infinite Marquee (Right, Left, Right) */}
            <div className="bento-card bento-streams-card" aria-hidden="true">
              {/* Row 1: Infinite to Right */}
              <div className="bento-stream-row">
                <div className="bento-stream-track stream-track-right">
                  {[...streamRow1, ...streamRow1].map((src, idx) => (
                    <div key={'r1-' + idx} className="bento-stream-thumb">
                      <img src={src} alt="" loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 2: Infinite to Left */}
              <div className="bento-stream-row">
                <div className="bento-stream-track stream-track-left">
                  {[...streamRow2, ...streamRow2].map((src, idx) => (
                    <div key={'r2-' + idx} className="bento-stream-thumb">
                      <img src={src} alt="" loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 3: Infinite to Right */}
              <div className="bento-stream-row">
                <div className="bento-stream-track stream-track-right stream-track-right-alt">
                  {[...streamRow3, ...streamRow3].map((src, idx) => (
                    <div key={'r3-' + idx} className="bento-stream-thumb">
                      <img src={src} alt="" loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: 3 Columns */}
          <div className="bento-row-bottom">
            {/* Col 1: Photographer Insta Card */}
            <div className="bento-col bento-col-insta">
              <div className="insta-card">
                <img
                  src="photos/y6nsXyFCXVHybL6AG2drPt8Xug.webp"
                  alt="Photographer with camera"
                  className="insta-bg-image"
                />
                <div className="insta-top-badge">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
                <div className="insta-bottom-content">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="insta-link"
                  >
                    Check my insta
                  </a>
                </div>
              </div>
            </div>

            {/* Col 2: High Resolution Focus Card + Satisfaction Card */}
            <div className="bento-col bento-col-middle">
              <div className="bento-card focus-card">
                <img
                  src="photos/hMH3wtZnELIRTERjHWcZy4tHu0.webp"
                  alt="High resolution detail"
                  className="focus-bg-image"
                />
                <div className="focus-reticle">
                  <div className="bracket bracket-tl"></div>
                  <div className="bracket bracket-tr"></div>
                  <div className="bracket bracket-bl"></div>
                  <div className="bracket bracket-br"></div>
                  <div className="reticle-center-dot"></div>
                </div>
                <div className="focus-overlay-text">
                  <p>Enjoy high-resolution photos that capture every detail and emotion beautifully.</p>
                </div>
              </div>

              {/* 100+ Satisfaction Clients Card */}
              <div className="bento-card satisfaction-card">
                <div className="satisfaction-info">
                  <div className="satisfaction-number">100+</div>
                  <p className="satisfaction-label">Satisfaction client's</p>
                </div>
                <div className="satisfaction-avatars">
                  {clientAvatars.map((av, idx) => (
                    <img
                      key={idx}
                      src={av.src || av}
                      alt={"Client avatar " + (idx + 1)}
                      className="satisfaction-avatar-img"
                      style={{ zIndex: 10 - idx }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Col 3: 30% Return Rate + Reel to Reel Tape Deck */}
            <div className="bento-col bento-col-right">
              <div className="bento-card return-stat-card">
                <div className="return-stat-number">30%</div>
                <p className="return-stat-label">
                  Clients book another session <span className="highlight-word">within</span> a year
                </p>
              </div>

              <div className="bento-card vintage-tape-card">
                <img
                  src="photos/O5zBxpFSElG3tg3rPxJNqC0hOSs.webp"
                  alt="Vintage reel-to-reel tape machine"
                  className="vintage-tape-img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
