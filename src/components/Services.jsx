import React, { useState } from 'react';
import { servicesData } from '../data/portfolioData';

export default function Services({ onOpenChat }) {
  const [activeServiceId, setActiveServiceId] = useState('weddings');
  const [isTransitioning, setIsTransitioning] = useState(false);

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
    <section className="section-services-dark" id="services">
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