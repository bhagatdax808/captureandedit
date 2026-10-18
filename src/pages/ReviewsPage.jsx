import React, { useState } from 'react';
import { Star, MessageSquare, CheckCircle, ArrowUpRight, Play, Heart } from 'lucide-react';
import StaggerTitle from '../components/StaggerTitle';
import PageHeroStage from '../components/PageHeroStage';

export default function ReviewsPage({ onOpenChat }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Reviews (142)' },
    { id: 'weddings', label: 'Weddings (84)' },
    { id: 'commercial', label: 'Commercial Brands (38)' },
    { id: 'portraits', label: 'Private Portraits (20)' }
  ];

  const reviews = [
    {
      id: 1,
      category: 'commercial',
      author: 'Elena Rostova',
      role: 'Creative Director, Lumina Labs',
      location: 'Stockholm, Sweden',
      image: '/photos/vLEsMK3fGOYhOVUMV0xti7bThh8.webp',
      quote: 'Working with Capture was one of the smoothest creative collaborations we have ever experienced. Every single frame was composed with intention, and the editorial lighting completely elevated our international autumn campaign across all print and digital channels.'
    },
    {
      id: 2,
      category: 'commercial',
      author: 'Daniel Carter',
      role: 'Brand Strategist, Horizon Studio',
      location: 'London, UK',
      image: '/photos/y6nsXyFCXVHybL6AG2drPt8Xug.webp',
      quote: 'I wanted photos that represented our brand — minimal, bold, and unapologetically human. The results were far beyond what I had in mind. The lighting, composition, and natural silver grain all came together so flawlessly that we didn\'t need a single re-shoot.'
    },
    {
      id: 3,
      category: 'weddings',
      author: 'Sophia & Liam Montgomery',
      role: 'Destination Wedding Clients',
      location: 'Lake Como, Italy',
      image: '/photos/eS4Rwaq0KdMka7YC0Lt7QwVvpk.webp',
      quote: 'The photos captured the true soul of our wedding day without any forced, awkward poses. Our family and friends still cannot stop talking about how breathtaking and deeply emotional each frame turned out. We will treasure these heirlooms forever.'
    },
    {
      id: 4,
      category: 'commercial',
      author: 'Julian Hayes',
      role: 'Senior Fashion Editor, Mode Magazine',
      location: 'Paris, France',
      image: '/photos/PtOmfIDqFPfLwMMucdVIw0jwKwk.webp',
      quote: 'Alex has an innate sense of cinematic timing. He captured the backstage kinetic energy of fashion week with the intimacy of a fine art painting. The turnaround was blistering, delivering high-res color graded files within 36 hours of the finale.'
    },
    {
      id: 5,
      category: 'weddings',
      author: 'Camilla & Mateo Rossi',
      role: 'Tuscan Countryside Wedding',
      location: 'Florence, Italy',
      image: '/photos/atJSGWOSmoPWXD4zqFDhjEhPltc.webp',
      quote: 'From our first consultation call, Alex made us feel so deeply relaxed. On the day, he blended seamlessly into the crowd and caught the candid glances, tears during toasts, and golden hour light that we didn\'t even notice happening.'
    },
    {
      id: 6,
      category: 'portraits',
      author: 'Marcus Vance',
      role: 'Managing Partner, Vantage Ventures',
      location: 'New York, NY',
      image: '/photos/0wAQnSK8HJ1PqWcUHPNg7r4fQ.webp',
      quote: 'I usually dread having my picture taken. Alex created an environment that felt completely natural and unforced. The resulting executive portraits have a quiet, magnetic presence that has become the visual cornerstone of our firm.'
    }
  ];

  const filtered = selectedCategory === 'all' ? reviews : reviews.filter(r => r.category === selectedCategory);

  return (
    <div className="page-wrapper reviews-detail-page">
      {/* Home Screen Type Stage Frame */}
      <PageHeroStage
        titleMain="praise®"
        titleTag="Client Words"
        description="Over 1,000 completed assignments spanning 12 countries. Unfiltered feedback reflecting authentic emotion, quiet elegance, and heirloom memories."
        bgImage="/photos/vLEsMK3fGOYhOVUMV0xti7bThh8.webp"
      />

      {/* Stats & Filter Bar Section */}
      <section className="reviews-meta-section">
        <div className="page-container">
          <div className="reviews-stats-strip">
            <div className="stat-strip-box">
              <div className="stat-strip-val">5.0</div>
              <div className="stat-strip-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#eab308" color="#eab308" />
                ))}
              </div>
              <span className="stat-strip-sub">Over 140+ verified 5-star reviews</span>
            </div>
            <div className="stat-strip-box">
              <div className="stat-strip-val">99.4%</div>
              <span className="stat-strip-label">Client Recommendation Rate</span>
              <span className="stat-strip-sub">Based on post-session feedback</span>
            </div>
            <div className="stat-strip-box">
              <div className="stat-strip-val">30%</div>
              <span className="stat-strip-label">Annual Repeat Booking</span>
              <span className="stat-strip-sub">Couples & brands returning yearly</span>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="projects-filter-bar" style={{ marginTop: '40px' }}>
            {categories.map((c) => (
              <button
                key={c.id}
                className={'filter-pill-btn ' + (selectedCategory === c.id ? 'active' : '')}
                onClick={() => setSelectedCategory(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="reviews-grid-section">
        <div className="page-container">
          <div className="reviews-masonry-grid">
            {filtered.map((r) => (
              <div key={r.id} className="review-card-item">
                <div className="review-card-top">
                  <div className="review-author-meta">
                    <img src={r.image} alt={r.author} className="review-avatar-img" />
                    <div className="review-author-info">
                      <div className="author-name-row">
                        <h4 className="review-author-name">{r.author}</h4>
                        <CheckCircle size={15} className="verified-badge-icon" />
                      </div>
                      <span className="review-author-role">{r.role}</span>
                      <span className="review-author-loc">{r.location}</span>
                    </div>
                  </div>
                  <div className="card-stars-row">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="#111111" color="#111111" />
                    ))}
                  </div>
                </div>
                <p className="review-quote-body">&ldquo;{r.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Booking CTA Banner */}
      <section className="page-cta-banner">
        <div className="page-container">
          <div className="cta-banner-card">
            <h3 className="cta-banner-title">
              Ready to create your own lasting visual story?
            </h3>
            <p className="cta-banner-subtext">
              Let\'s discuss dates, destination logistics, and creative vision.
            </p>
            <button type="button" className="cta-banner-btn" onClick={onOpenChat}>
              <span>Start a Conversation</span>
              <ArrowUpRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}