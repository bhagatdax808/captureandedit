import React from 'react';
import { portfolioWorks } from '../data/portfolioData';

export default function Portfolio() {
  return (
    <section className="section-portfolio" id="portfolio">
      <div className="portfolio-container">
        {/* Staggered Masonry Grid matching screenshot */}
        <div className="portfolio-grid">
          {portfolioWorks.map((item, index) => {
            let colSpanClass = 'col-span-7';
            if (index === 1) colSpanClass = 'col-span-5';
            if (index === 2) colSpanClass = 'col-span-6';
            if (index === 3) colSpanClass = 'col-span-6';

            return (
              <div key={item.id} className={'portfolio-item ' + colSpanClass}>
                <div className="portfolio-card">
                  <div className="portfolio-media-wrapper">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="portfolio-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="portfolio-item-caption">
                    <h3 className="portfolio-caption-title">{item.title}</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}