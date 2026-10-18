import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { servicesData } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function Services({ onOpenChat }) {
  const [activeServiceId, setActiveServiceId] = useState('weddings');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const pane = el.querySelector('.service-display-pane');
      const list = el.querySelector('.service-items-list');
      if (pane && list) {
        gsap.fromTo(
          pane,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            },
          }
        );
        gsap.fromTo(
          list.children,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.08,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const activeService = servicesData.find((s) => s.id === activeServiceId) || servicesData[2];

  const handleSelectService = (id) => {
    if (id === activeServiceId) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveServiceId(id);
      setIsTransitioning(false);
    }, 180);
  };

  return (
    <section className="section-services-dark" id="services" ref={sectionRef}>
      {/* Top Header Services */}
      <div className="services-header-top">
        <span className="services-tag-pill">Services</span>
        <h2 className="services-headline">
          <span>Tailored Creative</span> <span className="serif-italic">Services</span>
        </h2>
        <p className="services-lead-text">
          Comprehensive photography &amp; film post-production services designed to capture real emotions and heirloom moments.
        </p>
      </div>

      <div className="services-layout">
        {/* Left Column: Dynamic Updating Card + Quote + CTA */}
        <div className="service-display-pane">
          <div className="service-preview-card">
            <img
              src={activeService.image}
              alt={activeService.alt}
              style={{
                opacity: isTransitioning ? 0 : 1,
                transform: isTransitioning ? 'scale(0.98)' : 'scale(1)',
              }}
            />
          </div>
          <p
            className="service-quote"
            style={{
              opacity: isTransitioning ? 0 : 1,
            }}
          >
            {activeService.quote}
          </p>
          <button className="service-chat-btn" type="button" onClick={onOpenChat}>
            Let's chat
          </button>
        </div>

        {/* Right Column: Service Items List */}
        <ul className="service-items-list" role="list">
          {servicesData.map((service) => {
            const isActive = service.id === activeServiceId;
            return (
              <li
                key={service.id}
                className={`service-item-row ${isActive ? 'active' : ''}`}
                onMouseEnter={() => handleSelectService(service.id)}
                onClick={() => handleSelectService(service.id)}
              >
                <span className="service-item-name">
                  <span>{service.name}</span>
                  <span className="active-dot-glyph" aria-hidden="true" />
                </span>
                <span className="service-index">{service.index}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}