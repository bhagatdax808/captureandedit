import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import StaggerTitle from './StaggerTitle';

const faqItems = [
  {
    id: '01',
    question: 'How far in advance should I book?',
    answer: 'I recommend booking at least 3-4 weeks in advance for portrait sessions, and 3-6 months in advance for weddings and editorial campaigns to secure your preferred date and allow adequate planning time.'
  },
  {
    id: '02',
    question: 'What type of photography do you specialize in?',
    answer: 'I specialize in cinematic editorial portraits, fashion lookbooks, personal brand stories, and documentary wedding captures that focus on authentic moments, natural emotion, and refined lighting.'
  },
  {
    id: '03',
    question: 'How long will it take to receive my photos?',
    answer: 'A curated sneak peek gallery of 5–10 photos is delivered within 48 hours. Your complete high-resolution collection, fully retouched and color-graded, is delivered within 10 to 14 business days.'
  },
  {
    id: '04',
    question: 'How many edited photos will I get?',
    answer: 'Depending on your customized package, a typical 1–2 hour session yields between 45 and 65 carefully curated, individually retouched images delivered in a private web gallery with download permissions.'
  },
  {
    id: '05',
    question: 'What happens if the weather is bad on the shoot day?',
    answer: 'For outdoor sessions, we closely track local weather reports 48 hours prior. If conditions are unfavorable, we can reschedule to the nearest available open date at no extra charge or shift into an artistic indoor studio setting.'
  }
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="faq-section">
      <div className="container">
        {/* FAQ Header with Aperture Badge */}
        <div className="faq-header-center">
          <div className="faq-pill-badge">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="10" />
              <path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94" />
            </svg>
            <span>FAQ</span>
          </div>

          <StaggerTitle as="h2" className="faq-title">
            Frequently<br />
            <span className="serif-italic">asked question</span>
          </StaggerTitle>
        </div>

        {/* FAQ Accordion List */}
        <div className="faq-list">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.id}
                className={"faq-accordion-item " + (isOpen ? "active" : "")}
                onClick={() => toggleItem(idx)}
              >
                <div className="faq-question-row">
                  <span className="faq-question-text">
                    {item.question}{' '}
                    <span className="faq-tag-index">&#123;{item.id}&#125;</span>
                  </span>
                  <button
                    className={"faq-toggle-btn " + (isOpen ? "open" : "")}
                    aria-label="Toggle answer"
                  >
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </button>
                </div>

                <div className={"faq-answer-collapse " + (isOpen ? "show" : "")}>
                  <p className="faq-answer-text">{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
