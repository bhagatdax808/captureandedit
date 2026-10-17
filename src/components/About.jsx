import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Maximize2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const quoteWords = [
  { text: "“I", italic: false },
  { text: "don't", italic: false },
  { text: "simply", italic: false },
  { text: "click", italic: false },
  { text: "pictures", italic: true },
  { text: "I", italic: false },
  { text: "preserve", italic: false },
  { text: "genuine", italic: false },
  { text: "emotions,", italic: true },
  { text: "fleeting", italic: false },
  { text: "memories,", italic: false },
  { text: "and", italic: false },
  { text: "hidden", italic: false },
  { text: "stories", italic: false },
  { text: "that", italic: false },
  { text: "bring", italic: true },
  { text: "life", italic: true },
  { text: "to", italic: false },
  { text: "every", italic: false },
  { text: "shot.”", italic: false }
];

const descParagraph = "I capture raw emotions, subtle moments, and untold stories that make life beautiful. Every image I create is more than just a picture; it's a reflection of genuine feelings, fleeting expressions, and connections that deserve to be remembered.";
const descWords = descParagraph.split(' ');

export default function About({ onOpenChat }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const quoteRef = useRef(null);
  const descRef = useRef(null);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    const quoteEl = quoteRef.current;
    const descEl = descRef.current;
    if (!quoteEl) return;

    const ctx = gsap.context(() => {
      // 1. GSAP Stagger Animation for Quote
      const quoteSpans = quoteEl.querySelectorAll('.reveal-word');
      if (quoteSpans.length) {
        gsap.fromTo(
          quoteSpans,
          {
            opacity: 0,
            y: 28,
            filter: 'blur(8px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.85,
            ease: 'power3.out',
            stagger: 0.038,
            scrollTrigger: {
              trigger: quoteEl,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 2. GSAP Stagger Animation for Description
      if (descEl) {
        const descSpans = descEl.querySelectorAll('.desc-word');
        if (descSpans.length) {
          gsap.fromTo(
            descSpans,
            {
              opacity: 0,
              y: 16,
              filter: 'blur(5px)',
            },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.75,
              ease: 'power2.out',
              stagger: 0.016,
              scrollTrigger: {
                trigger: descEl,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="section-about" id="about">
      <div className="about-container">
        {/* Top Header: Badge on the left, Huge Editorial Quote on the right */}
        <div className="about-header-grid">
          <div className="about-badge-col">
            <div className="aperture-badge">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="aperture-icon"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94" />
              </svg>
              <span>About me</span>
            </div>
          </div>

          <div className="about-quote-col">
            <h2 className="about-quote" ref={quoteRef}>
              {quoteWords.map((item, idx) => (
                <React.Fragment key={idx}>
                  <span
                    className={`reveal-word ${item.italic ? 'serif-italic' : ''}`}
                    style={{ display: 'inline-block', willChange: 'transform, opacity, filter' }}
                  >
                    {item.text}
                  </span>{' '}
                </React.Fragment>
              ))}
            </h2>
          </div>
        </div>

        {/* Lower Content Grid: Left Video Card, Right Narrative + Let's chat */}
        <div className="about-content-grid">
          {/* Left Column: Video Player Card with Alex Rivera */}
          <div className="about-video-box">
            <img
              src="/photos/ATfEhhE5N93aBRRVAnYeNawpHVA.webp"
              alt="Alex Rivera documentary photographer"
              className="about-video-img"
            />
            <div className="video-player-bar">
              <button
                type="button"
                className="video-play-btn"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? (
                  <Pause size={13} fill="white" color="white" />
                ) : (
                  <Play size={13} fill="white" color="white" style={{ marginLeft: '1px' }} />
                )}
              </button>
              <span className="video-timer">0:00 / 0:09</span>
              <div className="video-scrubber">
                <div
                  className="video-scrubber-progress"
                  style={{ width: isPlaying ? '65%' : '0%' }}
                />
              </div>
              <button type="button" className="video-icon-btn" aria-label="Fullscreen">
                <Maximize2 size={13} />
              </button>
              <button type="button" className="video-icon-btn" aria-label="More options">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="5" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="12" cy="19" r="2" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Column: Editorial Paragraph + Let's chat */}
          <div className="about-narrative-box">
            <p className="about-description" ref={descRef}>
              {descWords.map((word, idx) => (
                <React.Fragment key={idx}>
                  <span
                    className="desc-word"
                    style={{ display: 'inline-block', willChange: 'transform, opacity, filter' }}
                  >
                    {word}
                  </span>{' '}
                </React.Fragment>
              ))}
            </p>
            <div className="about-chat-row">
              <button
                type="button"
                className="about-chat-text-btn"
                onClick={onOpenChat}
              >
                Let's chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}