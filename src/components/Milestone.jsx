import React from 'react';

export default function Milestone({ onOpenChat }) {
  const brandLogos = [
    { id: 'zenzap-1', name: 'ZenZap', type: 'zenzap' },
    { id: 'spark-1', name: 'spark', type: 'spark' },
    { id: 'zenzap-2', name: 'ZenZap', type: 'zenzap' },
    { id: 'spark-2', name: 'spark', type: 'spark' },
    { id: 'zenzap-3', name: 'ZenZap', type: 'zenzap' },
    { id: 'spark-3', name: 'spark', type: 'spark' },
  ];

  const repeatedLogos = [...brandLogos, ...brandLogos, ...brandLogos];

  return (
    <section className="section-milestone" id="milestone">
      <div className="milestone-container">
        {/* Infinite Partner Logo Marquee with Original Logos */}
        <div className="marquee-wrapper" aria-hidden="true">
          <div className="marquee-track">
            {repeatedLogos.map((item, index) => (
              <div key={index} className="partner-logo-item">
                {item.type === 'zenzap' ? (
                  <div className="brand-zenzap">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="brand-icon"
                    >
                      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                    </svg>
                    <span className="brand-name">ZenZap</span>
                  </div>
                ) : (
                  <div className="brand-spark">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="brand-icon"
                    >
                      <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
                    </svg>
                    <span className="brand-name">spark</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Milestone Main Heading */}
        <div className="milestone-heading-container">
          <h2 className="milestone-heading">
            More than 1,000 projects complete<br />
            &ndash; <span className="serif-italic">clients keep coming back</span>
          </h2>
          <div className="milestone-cta-row">
            <button
              type="button"
              className="milestone-chat-pill-btn"
              onClick={onOpenChat}
            >
              Let's chat
            </button>
          </div>
        </div>

        {/* Dual Showcase Photo Cards - ONLY photos shown, no text content */}
        <div className="milestone-grid">
          <div className="milestone-photo-card">
            <img
              src="/photos/ZbIHQ4En9g1fFVY4ihQ8XwHYdu4.webp"
              alt="Editorial shoot on snowy mountain trail"
              className="milestone-card-img"
              loading="lazy"
            />
          </div>

          <div className="milestone-photo-card">
            <img
              src="/photos/5WjX1vJg991GRNOY7QwweeYhYUA.webp"
              alt="Golden hour portrait in classic car"
              className="milestone-card-img"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}