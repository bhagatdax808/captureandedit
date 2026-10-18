import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Compass, MessageCircle } from 'lucide-react';

export default function NotFoundPage({ onOpenChat }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top when 404 mounts
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="not-found-page-stage">
      {/* Ambient Radial Lights */}
      <div className="not-found-ambient-glow" aria-hidden="true" />
      <div className="not-found-grid-lines" aria-hidden="true">
        <span className="grid-line line-v1" />
        <span className="grid-line line-v2" />
        <span className="grid-line line-h1" />
      </div>

      <div className="not-found-container">
        {/* Camera Viewfinder Framing Corners */}
        <div className="viewfinder-frame" aria-hidden="true">
          <span className="vf-corner corner-tl" />
          <span className="vf-corner corner-tr" />
          <span className="vf-corner corner-bl" />
          <span className="vf-corner corner-br" />
          <span className="vf-badge">AF-L • 404_ERR</span>
          <span className="vf-iso">ISO 800 • f/1.4</span>
        </div>

        {/* Central 404 Hero Content */}
        <div className="not-found-content">
          <div className="not-found-tag-wrap">
            <span className="not-found-tag">
              <span className="tag-dot" />
              OUT OF FOCUS
            </span>
          </div>

          <h1 className="not-found-glitch-number" data-text="404">
            404
          </h1>

          <h2 className="not-found-title">
            Lost in the Frame
          </h2>

          <p className="not-found-description">
            The shot you're looking for doesn't exist, has been moved, or hasn't been captured yet. Let's get you back on track.
          </p>

          {/* Quick Action Navigation Buttons */}
          <div className="not-found-actions">
            <Link to="/" className="nf-btn nf-btn-primary">
              <Home size={18} strokeWidth={2.2} />
              <span>Back to Home</span>
            </Link>

            <Link to="/projects" className="nf-btn nf-btn-secondary">
              <Compass size={18} strokeWidth={2} />
              <span>View Projects</span>
            </Link>

            {onOpenChat && (
              <button
                type="button"
                className="nf-btn nf-btn-ghost"
                onClick={onOpenChat}
              >
                <MessageCircle size={18} strokeWidth={2} />
                <span>Contact Us</span>
              </button>
            )}
          </div>

          {/* Quick Return Link */}
          <div className="not-found-back-link-wrap">
            <button
              type="button"
              className="nf-back-prev-btn"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={15} />
              <span>Go back to previous page</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
