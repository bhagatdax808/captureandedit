import React, { useState, useEffect } from 'react';

export default function InitialLoader({ onComplete }) {
  const [stage, setStage] = useState('entering'); // 'entering' -> 'expanding' -> 'done'
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Disable body scrolling while loading
    document.body.style.overflow = 'hidden';

    // Counter animation: 0 to 100
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 24);

    // Sequence timing:
    // 0ms - 1200ms: 3 images slide & fade in
    // 1400ms: Center image grows big (scales up and expands to full screen)
    const expandTimer = setTimeout(() => {
      setStage('expanding');
    }, 1450);

    // 2400ms: Reveal home page and complete
    const completeTimer = setTimeout(() => {
      setStage('done');
      document.body.style.overflow = '';
      if (onComplete) onComplete();
    }, 2450);

    return () => {
      clearInterval(interval);
      clearTimeout(expandTimer);
      clearTimeout(completeTimer);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  if (stage === 'done') return null;

  return (
    <div
      className={`initial-loader-overlay ${stage === 'expanding' ? 'is-expanding' : ''}`}
      aria-label="Loading animation"
    >
      {/* Top Bar with Brand & Progress */}
      <div className="loader-hud-header">
        <div className="loader-brand-title">
          <span className="brand-dot" />
          <span>CAPTURE &amp; EDITS</span>
        </div>
        <div className="loader-counter">
          <span>{String(counter).padStart(3, '0')}%</span>
        </div>
      </div>

      {/* 3-Image Triptych Stage */}
      <div className="loader-triptych-stage">
        {/* Left Image Card */}
        <div className="loader-image-card card-left">
          <div className="card-media-box">
            <img
              src="/photos/EDjXZUxH9PUJ4Sc3htDzn89mi0.webp"
              alt="Editorial Frame"
              className="loader-frame-img"
            />
            <span className="card-badge">01 &bull; EDITORIAL</span>
          </div>
        </div>

        {/* Center Image Card (Grows Big into Home Hero) */}
        <div className="loader-image-card card-center">
          <div className="card-media-box center-media-box">
            <img
              src="/photos/firstpage.webp"
              alt="Signature Master Frame"
              className="loader-frame-img center-frame-img"
            />
            <div className="center-card-crosshair" aria-hidden="true">
              <span className="cross-mark">+</span>
              <span className="cross-mark">+</span>
            </div>
            <span className="card-badge center-badge">02 &bull; SIGNATURE</span>
          </div>
        </div>

        {/* Right Image Card */}
        <div className="loader-image-card card-right">
          <div className="card-media-box">
            <img
              src="/photos/atJSGWOSmoPWXD4zqFDhjEhPltc.webp"
              alt="Heirloom Portrait"
              className="loader-frame-img"
            />
            <span className="card-badge">03 &bull; HEIRLOOM</span>
          </div>
        </div>
      </div>

      {/* Bottom Status Indicator */}
      <div className="loader-hud-footer">
        <div className="loader-status-text">
          <span>INITIALIZING FRAMEWORK &bull; 4K MASTER GRADE</span>
        </div>
        <div className="loader-progress-bar">
          <div className="progress-fill" style={{ width: `${counter}%` }} />
        </div>
      </div>
    </div>
  );
}
