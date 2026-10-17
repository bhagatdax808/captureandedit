import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const testimonials = [
  {
    id: '01',
    stars: 5,
    quote: "“Working with Capture was one of the smoothest creative collaborations we've had. Every single frame was composed with intention, and the editorial style completely elevated our visual presence across all channels.”",
    author: "Elena Rostova",
    role: "Creative Director",
    image: "photos/vLEsMK3fGOYhOVUMV0xti7bThh8.webp"
  },
  {
    id: '02',
    stars: 5,
    quote: "“I wanted photos that represented our brand — minimal, bold, and human. The results were beyond what I had in mind. The lighting, composition, and tone all came together so perfectly that we used the visuals across our entire campaign. It felt like working with someone who just gets it without needing to explain too much.”",
    author: "Daniel Carter",
    role: "Brand Strategist",
    image: "photos/y6nsXyFCXVHybL6AG2drPt8Xug.webp"
  },
  {
    id: '03',
    stars: 5,
    quote: "“The photos captured the soul of our wedding day without any forced poses. Our family and friends still cannot stop talking about how breathtaking and emotional each frame turned out.”",
    author: "Sophia & Liam",
    role: "Wedding Clients",
    image: "photos/eS4Rwaq0KdMka7YC0Lt7QwVvpk.webp"
  },
  {
    id: '04',
    stars: 5,
    quote: "“The attention to light and raw emotion is unmatched. We had tight deadlines for our lookbook and the final delivery exceeded every expectation with cinematic precision.”",
    author: "Julian Hayes",
    role: "Fashion Editor",
    image: "photos/PtOmfIDqFPfLwMMucdVIw0jwKwk.webp"
  }
];

export default function Testimonial() {
  const [currentIdx, setCurrentIdx] = useState(1);
  const [isFading, setIsFading] = useState(false);

  const switchSlide = (newIndex) => {
    if (isFading || newIndex === currentIdx) return;
    setIsFading(true);
    setTimeout(() => {
      setCurrentIdx(newIndex);
      setIsFading(false);
    }, 220);
  };

  const handlePrev = () => {
    const prev = currentIdx === 0 ? testimonials.length - 1 : currentIdx - 1;
    switchSlide(prev);
  };

  const handleNext = () => {
    const next = currentIdx === testimonials.length - 1 ? 0 : currentIdx + 1;
    switchSlide(next);
  };

  const current = testimonials[currentIdx];

  return (
    <section id="testimonial" className="testimonial-section">
      <div className="container">
        {/* Header with Aperture badge */}
        <div className="testimonial-header">
          <div className="testimonial-pill-badge">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="10" />
              <path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94" />
            </svg>
            <span>Testimonial</span>
          </div>

          <h2 className="testimonial-title">
            Why client's<br />
            trust me <span className="serif-italic">here</span>
          </h2>
        </div>

        {/* 2-Column Card Grid */}
        <div className="testimonial-grid">
          {/* Left: Quote Card */}
          <div className={"testimonial-quote-card " + (isFading ? "card-fading" : "card-visible")}>
            <div className="star-rating">
              {[...Array(current.stars)].map((_, i) => (
                <span key={i} className="star">★</span>
              ))}
            </div>

            <p className="quote-text">{current.quote}</p>

            <div className="quote-footer">
              <div className="author-details">
                <h4 className="author-name">{current.author}</h4>
                <p className="author-role">{current.role}</p>
              </div>

              <div className="quote-nav-group">
                <div className="carousel-dot-indicators">
                  {testimonials.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      className={"carousel-dot " + (dotIdx === currentIdx ? "active" : "")}
                      onClick={() => switchSlide(dotIdx)}
                      aria-label={"Slide " + (dotIdx + 1)}
                    />
                  ))}
                </div>
                <div className="quote-index">&#123;{current.id}&#125;</div>
              </div>
            </div>
          </div>

          {/* Right: Photo Card with Nav Arrows */}
          <div className="testimonial-photo-card">
            <img
              src={current.image}
              alt={current.author}
              className={"testimonial-photo-img " + (isFading ? "card-fading" : "card-visible")}
            />
            <div className="testimonial-nav-arrows">
              <button
                className="nav-arrow-btn"
                onClick={handlePrev}
                aria-label="Previous testimonial"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                className="nav-arrow-btn"
                onClick={handleNext}
                aria-label="Next testimonial"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
