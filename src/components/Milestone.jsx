import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const milestoneLine1Words = ["More", "than", "1,000", "projects", "complete"];
const milestoneLine2Words = [
  { text: "–", italic: false },
  { text: "clients", italic: true },
  { text: "keep", italic: true },
  { text: "coming", italic: true },
  { text: "back", italic: true }
];

export default function Milestone({ onOpenChat }) {
  const sectionRef = useRef(null);
  const headingBoxRef = useRef(null);
  const gridRef = useRef(null);

  const brandLogos = [
    { id: 'zenzap-1', name: 'ZenZap', type: 'zenzap' },
    { id: 'spark-1', name: 'spark', type: 'spark' },
    { id: 'zenzap-2', name: 'ZenZap', type: 'zenzap' },
    { id: 'spark-2', name: 'spark', type: 'spark' },
    { id: 'zenzap-3', name: 'ZenZap', type: 'zenzap' },
    { id: 'spark-3', name: 'spark', type: 'spark' },
  ];

  const repeatedLogos = [...brandLogos, ...brandLogos, ...brandLogos];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial word entrance stagger
      const words = headingBoxRef.current?.querySelectorAll('.milestone-word');
      if (words && words.length) {
        gsap.fromTo(
          words,
          {
            opacity: 0,
            y: 28,
            filter: 'blur(6px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.85,
            ease: 'power3.out',
            stagger: 0.04,
            scrollTrigger: {
              trigger: headingBoxRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 2. Smooth 2-way scrubbed 3D parallax
      // Text recedes back into depth while photos glide from bottom to top, reversing on scroll up
      if (sectionRef.current && headingBoxRef.current && gridRef.current) {
        const scrubTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 15%',
            scrub: 1.2,
          },
        });

        scrubTl.fromTo(
          headingBoxRef.current,
          {
            scale: 1,
            y: 0,
            opacity: 1,
            transformOrigin: '50% 40%',
          },
          {
            scale: 0.87,
            y: 45,
            opacity: 0.75,
            ease: 'none',
          },
          0
        );

        scrubTl.fromTo(
          gridRef.current,
          {
            y: 95,
          },
          {
            y: -35,
            ease: 'none',
          },
          0
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="section-milestone" id="milestone" ref={sectionRef}>
      <div className="milestone-container">
        {/* Infinite Partner Logo Marquee with Original Logos */}
        <div className="marquee-wrapper" aria-hidden="true">
          <div className="marquee-track">
            {repeatedLogos.map((item, index) => (
              <div key={index} className="partner-logo-item">
                {item.type === 'zenzap' ? (
                  <div className="brand-zenzap">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="brand-icon"
                    >
                      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                    </svg>
                    <span className="brand-name">ZenZap</span>
                  </div>
                ) : (
                  <div className="brand-spark">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="brand-icon"
                    >
                      <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
                    </svg>
                    <span className="brand-name">spark</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Milestone Main Heading with GSAP Stagger and 3D Depth */}
        <div className="milestone-heading-container" ref={headingBoxRef}>
          <h2 className="milestone-heading">
            <span className="milestone-line-block" style={{ display: 'block' }}>
              {milestoneLine1Words.map((word, idx) => (
                <React.Fragment key={idx}>
                  <span
                    className="milestone-word"
                    style={{ display: 'inline-block', willChange: 'transform, opacity, filter' }}
                  >
                    {word}
                  </span>{' '}
                </React.Fragment>
              ))}
            </span>
            <span className="milestone-line-block" style={{ display: 'block' }}>
              {milestoneLine2Words.map((item, idx) => (
                <React.Fragment key={idx}>
                  <span
                    className={`milestone-word ${item.italic ? 'serif-italic' : ''}`}
                    style={{ display: 'inline-block', willChange: 'transform, opacity, filter' }}
                  >
                    {item.text}
                  </span>{' '}
                </React.Fragment>
              ))}
            </span>
          </h2>
          <div className="milestone-cta-row">
            <button
              type="button"
              className="milestone-chat-pill-btn"
              onClick={onOpenChat}
            >
              Let's chat
            </button>
          </div>
        </div>

        {/* Dual Showcase Photo Cards - gliding bottom-to-top with scrubbed parallax */}
        <div className="milestone-grid" ref={gridRef}>
          <div className="milestone-photo-card">
            <img
              src="/photos/ZbIHQ4En9g1fFVY4ihQ8XwHYdu4.webp"
              alt="Editorial shoot on snowy mountain trail"
              className="milestone-card-img"
              loading="lazy"
            />
          </div>

          <div className="milestone-photo-card">
            <img
              src="/photos/5WjX1vJg991GRNOY7QwweeYhYUA.webp"
              alt="Golden hour portrait in classic car"
              className="milestone-card-img"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}