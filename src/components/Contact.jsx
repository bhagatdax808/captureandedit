import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StaggerTitle from './StaggerTitle';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 55, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        {/* Top Avatar Badge */}
        <div className="contact-top-badge-wrapper">
          <div className="contact-badge-pill">
            <img
              src="photos/y6nsXyFCXVHybL6AG2drPt8Xug.webp"
              alt="Professional photographer"
              className="contact-photographer-thumb"
            />
            <span>Professional photographer</span>
          </div>
        </div>

        {/* Section Heading */}
        <div className="contact-heading-container">
          <StaggerTitle as="h2" className="contact-title">
            Have questions or want to book?<br />
            <span className="serif-italic">I'm here for you.</span>
          </StaggerTitle>
        </div>

        {/* Contact Form Card */}
        <div className="contact-card" ref={cardRef}>
          <div className="contact-email-header">
            <span className="email-label">E-mail me at</span>
            <a href="mailto:capture@mail.com" className="email-address-link">
              capture@mail.com
            </a>
          </div>

          <div className="contact-divider" />

          <p className="contact-subtext">
            Or simply leave your details, and I'll get back to you shortly.
          </p>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row-dual">
              <div className="form-group">
                <label htmlFor="name-input">Name</label>
                <input
                  id="name-input"
                  type="text"
                  placeholder="Jane Smith"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email-input">Email</label>
                <input
                  id="email-input"
                  type="email"
                  placeholder="jane@framer.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message-input">Message</label>
              <textarea
                id="message-input"
                rows="4"
                placeholder="Leave your message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <button type="submit" className="contact-submit-btn">
              {submitted ? "Message sent! Thank you." : "Send message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
