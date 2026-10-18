import React, { useState } from 'react';
import { ArrowUpRight, Filter, X, Sliders, Eye } from 'lucide-react';
import StaggerTitle from '../components/StaggerTitle';
import PageHeroStage from '../components/PageHeroStage';

export default function ProjectsPage({ onOpenChat }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [sliderPos, setSliderPos] = useState(50);

  const categories = [
    { id: 'all', label: 'All Works' },
    { id: 'editorial', label: 'Editorial & Fashion' },
    { id: 'weddings', label: 'Weddings' },
    { id: 'portraits', label: 'Portraits' },
    { id: 'commercial', label: 'Commercial' }
  ];

  const projects = [
    { id: 1, title: 'Mystic Meadow', category: 'editorial', client: 'Vogue Scandinavia', year: '2026', image: '/photos/uZATchhlmCzRZorlIrEqVvh7bc.webp', exif: '50mm &bull; f/1.4 &bull; 1/2000s &bull; ISO 50', span: 'col-span-7', desc: 'High-speed kinetic alpine fashion editorial shot at dawn in the Swiss Engadin valley.' },
    { id: 2, title: 'Bride and Groom', category: 'weddings', client: 'Private Wedding', year: '2025', image: '/photos/atJSGWOSmoPWXD4zqFDhjEhPltc.webp', exif: '85mm &bull; f/1.8 &bull; 1/500s &bull; ISO 100', span: 'col-span-5', desc: 'Intimate heirloom jewelry and vow exchange capturing genuine emotion in Lake Como.' },
    { id: 3, title: 'Crimson Horizon', category: 'editorial', client: 'Harper\'s Bazaar', year: '2025', image: '/photos/EDjXZUxH9PUJ4Sc3htDzn89mi0.webp', exif: '35mm &bull; f/2.0 &bull; 1/1600s &bull; ISO 200', span: 'col-span-5', desc: 'Dramatic wind-swept crimson silk against the stark desert horizon outside Marrakech.' },
    { id: 4, title: 'Kinetic Echoes', category: 'portraits', client: 'Dance Theatre New York', year: '2026', image: '/photos/fqbzCqmxwVrEstVQLw80EJWI.webp', exif: '50mm &bull; f/2.8 &bull; 1/30s &bull; ISO 400', span: 'col-span-7', desc: 'Experimental motion blur choreography exploring rhythm and stillness in shadows.' },
    { id: 5, title: 'Alpine Ascents', category: 'commercial', client: 'Moncler Campaign', year: '2025', image: '/photos/ZbIHQ4En9g1fFVY4ihQ8XwHYdu4.webp', exif: '28mm &bull; f/4.0 &bull; 1/1000s &bull; ISO 100', span: 'col-span-6', desc: 'Outdoor documentary expedition tracking high-altitude mountain guides in Zermatt.' },
    { id: 6, title: 'Nocturne Solitude', category: 'portraits', client: 'L\'Officiel Hommes', year: '2026', image: '/photos/5WjX1vJg991GRNOY7QwweeYhYUA.webp', exif: '85mm &bull; f/1.4 &bull; 1/125s &bull; ISO 800', span: 'col-span-6', desc: 'Cinematic midnight portrait captured inside a vintage 1972 coupe in Milan.' },
    { id: 7, title: 'Golden Reverie', category: 'weddings', client: 'Private Wedding', year: '2025', image: '/photos/eS4Rwaq0KdMka7YC0Lt7QwVvpk.webp', exif: '35mm &bull; f/1.4 &bull; 1/2500s &bull; ISO 100', span: 'col-span-7', desc: 'Sunset ceremony vows overlooking the olive groves of Tuscany with unscripted tears.' },
    { id: 8, title: 'Architectural Light', category: 'commercial', client: 'Studio Kengo', year: '2026', image: '/photos/5QD4gq8SXUlDrEqPWmWKw4gsB0Y.webp', exif: '24mm &bull; f/5.6 &bull; 1/250s &bull; ISO 64', span: 'col-span-5', desc: 'Minimalist spatial documentation of concrete, warm cedar, and raking natural light.' }
  ];

  const filtered = selectedCategory === 'all' ? projects : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="page-wrapper projects-archive-page">
      {/* Home Screen Type Stage Frame */}
      <PageHeroStage
        titleMain="archive®"
        titleTag="Selected Works"
        description="Documentary commissions & visual explorations from destination weddings in Lake Como to high-fashion campaigns in Milan, preserved in authentic grain and timeless emotion."
        bgImage="/photos/uZATchhlmCzRZorlIrEqVvh7bc.webp"
        cardImage="/photos/EDjXZUxH9PUJ4Sc3htDzn89mi0.webp"
        cardTitle={"Fine Art & Documentary\nPortfolio"}
        cardSubtitle="© 2026 Archive"
        cardButtonText="Let's chat"
        onCardButtonClick={onOpenChat}
        badgeText="1,000+ Projects Completed"
      />

      {/* Category Filter Bar */}
      <section className="projects-filter-section">
        <div className="page-container">
          <div className="projects-filter-bar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={'filter-pill-btn ' + (selectedCategory === cat.id ? 'active' : '')}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Before & After RAW vs Grade Slider */}
      <section className="color-grading-section">
        <div className="page-container">
          <div className="grading-header-center">
            <span className="section-sublabel">THE CRAFT</span>
            <h2 className="section-title">
              Raw Sensor vs. <span className="serif-italic">Film Emulation</span>
            </h2>
            <p className="section-subtext">
              Drag the slider to compare uncorrected digital RAW capture with our custom Kodak Portra grain grade.
            </p>
          </div>

          <div className="slider-comparison-box">
            <div className="comparison-container">
              {/* Clean Graded Layer */}
              <img
                src="/photos/YXpKW5QZVYj5CA2vlrmyeVbUyQ.webp"
                alt="Graded signature image"
                className="comparison-img graded-img"
              />
              <span className="comparison-badge badge-graded">Signature Grade</span>

              {/* RAW Monochromatic / Flat Layer Clipped */}
              <div
                className="comparison-raw-clip"
                style={{ width: sliderPos + '%' }}
              >
                <img
                  src="/photos/YXpKW5QZVYj5CA2vlrmyeVbUyQ.webp"
                  alt="RAW sensor flat"
                  className="comparison-img raw-img"
                />
                <span className="comparison-badge badge-raw">Camera RAW</span>
              </div>

              {/* Draggable Divider Handle */}
              <div
                className="comparison-handle"
                style={{ left: sliderPos + '%' }}
              >
                <div className="handle-line"></div>
                <div className="handle-button">
                  <Sliders size={16} />
                </div>
              </div>

              {/* Native range slider for accessibility and drag */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="comparison-range-input"
                aria-label="Before and after comparison slider"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Masonry Grid */}
      <section className="projects-grid-section">
        <div className="page-container">
          <div className="portfolio-grid">
            {filtered.map((item) => (
              <div key={item.id} className={'portfolio-item ' + item.span}>
                <div
                  className="portfolio-card interactive-project-card"
                  onClick={() => setActiveModalItem(item)}
                >
                  <div className="portfolio-media-wrapper">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="portfolio-img"
                      loading="lazy"
                    />
                    <div className="portfolio-hover-overlay">
                      <span className="overlay-zoom-btn">
                        <Eye size={18} /> View Details
                      </span>
                    </div>
                  </div>
                  <div className="portfolio-item-meta-expanded">
                    <div className="meta-left">
                      <h3 className="portfolio-caption-title">{item.title}</h3>
                      <span className="meta-client-tag">{item.client} &bull; {item.year}</span>
                    </div>
                    <span
                      className="meta-exif-tag"
                      dangerouslySetInnerHTML={{ __html: item.exif }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fullscreen Photo Lightbox Modal */}
      {activeModalItem && (
        <div className="lightbox-modal-backdrop" onClick={() => setActiveModalItem(null)}>
          <div className="lightbox-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-close-btn"
              onClick={() => setActiveModalItem(null)}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
            <div className="lightbox-media-container">
              <img src={activeModalItem.image} alt={activeModalItem.title} className="lightbox-img" />
            </div>
            <div className="lightbox-details-pane">
              <span className="lightbox-category">{activeModalItem.category.toUpperCase()}</span>
              <h2 className="lightbox-title">{activeModalItem.title}</h2>
              <p className="lightbox-desc">{activeModalItem.desc}</p>
              <div className="lightbox-exif-row">
                <span className="exif-badge">Metadata</span>
                <span
                  className="exif-text"
                  dangerouslySetInnerHTML={{ __html: activeModalItem.exif }}
                />
              </div>
              <button
                type="button"
                className="lightbox-inquire-btn"
                onClick={() => { setActiveModalItem(null); onOpenChat(); }}
              >
                Inquire about this style &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}