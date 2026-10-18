import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  useEffect(() => {
    // Scroll to top
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="can-404-stage">
      <div className="can-404-card">
        <h1 className="can-404-number">404</h1>
        <h2 className="can-404-title">Page Not Found</h2>
        <p className="can-404-description">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="can-404-btn">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
