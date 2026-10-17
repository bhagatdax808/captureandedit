import React, { useState } from 'react';
import { HelpCircle, Search, Plus, Minus, ArrowUpRight, MessageCircle } from 'lucide-react';

export default function FaqPage({ onOpenChat }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openIds, setOpenIds] = useState(['01', '02']);

  const categories = [
    { id: 'all', label: 'All Topics (10)' },
    { id: 'booking', label: 'Booking & Retainers' },
    { id: 'prep', label: 'Shoot Preparation' },
    { id: 'delivery', label: 'Turnaround & Delivery' },
    { id: 'travel', label: 'Travel & Rights' }
  ];

  const faqData = [
    {
      id: '01',
      category: 'booking',
      question: 'How far in advance should I book my session or wedding?',
      answer: 'For destination weddings and commercial lookbooks, we recommend reserving 4 to 9 months in advance to ensure calendar availability and allow adequate pre-production time. For private portraits, 3 to 5 weeks is typically sufficient.'
    },
    {
      id: '02',
      category: 'delivery',
      question: 'How long will it take to receive my final edited photographs?',
      answer: 'A curated sneak peek gallery of 10 to 15 signature images is delivered within 48 hours of your shoot. The complete high-resolution collection, individually retouched and graded, is delivered via your private web gallery in 10 to 14 business days.'
    },
    {
      id: '03',
      category: 'prep',
      question: 'What happens if the weather is inclement on our outdoor shoot date?',
      answer: 'We track micro-climate weather forecasts 48 hours in advance. For non-wedding sessions, we can reschedule to the nearest available open date at no extra charge or pivot to an artistic indoor studio setting. For weddings, rainy twilight light often yields stunning cinematic frames with umbrellas and reflections.'
    },
    {
      id: '04',
      category: 'delivery',
      question: 'Do you provide unedited RAW camera files?',
      answer: 'RAW files represent unfinished negative material before our signature color grading, grain formulation, and dynamic tonal curve are applied. To guarantee consistent museum-grade artistry, we deliver finished, high-resolution JPEG and TIFF master exports.'
    },
    {
      id: '05',
      category: 'travel',
      question: 'Do you travel for destination weddings and international campaigns?',
      answer: 'Yes, absolutely. Over 60% of our assignments are destination-based across Europe, North America, and Asia. All travel logistics (flights, lodging, and local transit) are booked by our studio and invoiced transparently at flat direct cost with zero markup.'
    },
    {
      id: '06',
      category: 'booking',
      question: 'What is your retainer and payment schedule?',
      answer: 'A 30% non-refundable retainer and signed commission agreement secures your date exclusively on our studio calendar. The remaining balance is split into an interim installment and a final payment due two weeks prior to the shoot date.'
    },
    {
      id: '07',
      category: 'prep',
      question: 'Can you help with wardrobe styling and location permits?',
      answer: 'Yes! During pre-production, we curate a customized digital moodboard with styling recommendations, color palettes that complement your setting, and assist in securing commercial location permits where required.'
    },
    {
      id: '08',
      category: 'delivery',
      question: 'How many total photos will I receive in my collection?',
      answer: 'For full-day weddings, we deliver between 550 and 850 meticulously retouched images. For half-day editorial and portrait sessions, collections average between 45 and 75 individually graded frames.'
    },
    {
      id: '09',
      category: 'travel',
      question: 'What commercial usage rights and copyright permissions are included?',
      answer: 'All private wedding and portrait clients receive unrestricted personal printing and social sharing rights forever. Commercial brand campaigns receive standard worldwide digital and print advertising buyout licenses specified in your contract.'
    },
    {
      id: '10',
      category: 'prep',
      question: 'Do you shoot on analog 35mm film or digital cameras?',
      answer: 'We shoot a hybrid setup: cutting-edge high-resolution Leica and Hasselblad digital bodies alongside mechanical 35mm film rangefinders loaded with Kodak Portra 400 and Tri-X 400 for authentic silver halide grain.'
    }
  ];

  const toggleAccordion = (id) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter(item => item !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  const filtered = faqData.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesQuery = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="page-wrapper faq-detail-page">
      {/* Hero Header */}
      <section className="page-header-hero">
        <div className="page-container">
          <div className="page-eyebrow-pill">
            <HelpCircle size={15} />
            <span>Knowledge Base & Shoot Guide</span>
          </div>
          <h1 className="page-hero-title">
            Frequently asked questions & <br />
            <span className="serif-italic">commission guide</span>.
          </h1>
          <p className="page-hero-subtitle">
            Everything you need to know about the creative workflow, booking procedures, deliverables, and on-location policies.
          </p>

          {/* Live Search Bar */}
          <div className="faq-search-wrapper">
            <Search size={18} className="faq-search-icon" />
            <input
              type="text"
              placeholder="Search keywords (e.g., booking, film, weather, turnaround)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="faq-search-input"
            />
            {searchQuery && (
              <button className="clear-search-btn" onClick={() => setSearchQuery('')}>Clear</button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="projects-filter-bar" style={{ marginTop: '32px' }}>
            {categories.map((c) => (
              <button
                key={c.id}
                className={'filter-pill-btn ' + (activeCategory === c.id ? 'active' : '')}
                onClick={() => setActiveCategory(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Accordion Questions List */}
      <section className="faq-accordion-section">
        <div className="page-container">
          {filtered.length === 0 ? (
            <div className="no-results-box">
              <p>No questions matched your search query. Feel free to message us directly!</p>
              <button className="cta-banner-btn" onClick={onOpenChat}>Chat with Alex</button>
            </div>
          ) : (
            <div className="faq-list">
              {filtered.map((item) => {
                const isOpen = openIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className={'faq-accordion-item ' + (isOpen ? 'active' : '')}
                    onClick={() => toggleAccordion(item.id)}
                  >
                    <div className="faq-question-row">
                      <span className="faq-question-text">
                        {item.question}
                        <span className="faq-tag-index" style={{ marginLeft: '8px' }}>&#123;{item.id}&#125;</span>
                      </span>
                      <button
                        className={'faq-toggle-btn ' + (isOpen ? 'open' : '')}
                        aria-label="Toggle answer"
                      >
                        {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                      </button>
                    </div>
                    <div className={'faq-answer-collapse ' + (isOpen ? 'show' : '')}>
                      <p className="faq-answer-text">{item.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions Floating Banner */}
      <section className="page-cta-banner">
        <div className="page-container">
          <div className="cta-banner-card">
            <div className="cta-icon-wrapper">
              <MessageCircle size={28} />
            </div>
            <h3 className="cta-banner-title">
              Still have an unanswered question?
            </h3>
            <p className="cta-banner-subtext">
              We are always here to help brainstorm locations, discuss custom ideas, or clarify logistics.
            </p>
            <button type="button" className="cta-banner-btn" onClick={onOpenChat}>
              <span>Message the Studio</span>
              <ArrowUpRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}