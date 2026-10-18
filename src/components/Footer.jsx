import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top-brand">
        <Link to="/" className="footer-brand-link">
          capture&reg;
        </Link>
      </div>
      <ul className="footer-links-row">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/projects">Portfolio</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/reviews">Reviews</Link></li>
        <li><Link to="/faq">FAQ</Link></li>
        <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
      </ul>
      <p>&copy; 2026 Capture&reg; Photography Atelier. All rights reserved. Documentary & editorial commissions worldwide.</p>
    </footer>
  );
}