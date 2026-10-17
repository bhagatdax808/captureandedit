import React, { useState } from 'react';

export default function ChatModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div
      className={`modal-overlay ${isOpen ? 'open' : ''}`}
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-card">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          &times;
        </button>
        <h3 className="modal-title">Let's Create Together</h3>
        <p className="modal-sub">Tell us about your upcoming project, wedding, or session.</p>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>✦</div>
            <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Thank You!</h4>
            <p style={{ color: '#9ca3af' }}>Your inquiry has been received. We will contact you shortly.</p>
          </div>
        ) : (
          <form className="modal-form" onSubmit={handleSubmit}>
            <input className="modal-input" type="text" placeholder="Your Name" required />
            <input className="modal-input" type="email" placeholder="Your Email Address" required />
            <select className="modal-input" required defaultValue="">
              <option value="" disabled>
                Select Session Type
              </option>
              <option value="weddings">Weddings</option>
              <option value="headshots">Professional Headshots</option>
              <option value="events">Events & Galas</option>
              <option value="family">Family Sessions</option>
              <option value="lifestyle">Lifestyle & Fashion</option>
            </select>
            <textarea
              className="modal-input"
              rows="4"
              placeholder="Tell us about your vision..."
              required
            ></textarea>
            <button className="modal-submit" type="submit">
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}