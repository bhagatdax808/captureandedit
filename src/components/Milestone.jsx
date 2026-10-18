import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StaggerTitle from './StaggerTitle';

gsap.registerPlugin(ScrollTrigger);

export default function Milestone({ onOpenChat }) {
  const showcaseGridRef = useRef(null);
  const rowTopRef = useRef(null);
  const rowBottomRef = useRef(null);

  const topProjects = [
    {
      id: 1,
      title: 'Morning field trip',
      date: '1/10/26',
      category: 'Lifestyle',
      image: '/photos/uZATchhlmCzRZorlIrEqVvh7bc.webp',
      alt: 'Kinetic morning editorial field trip',
    },
    {
      id: 2,
      title: 'Posing on a chair',
      date: '1/9/26',
      category: 'Studio & Editorial',
      image: '/photos/EDjXZUxH9PUJ4Sc3htDzn89mi0.webp',
      alt: 'Model posing in crimson editorial setting',
    },
    {
      id: 3,
      title: 'Kinetic Echoes',
      date: '1/8/26',
      category: 'Contemporary Movement',
      image: '/photos/fqbzCqmxwVrEstVQLw80EJWI.webp',
      alt: 'Experimental motion blur choreography',
    },
  ];

  const bottomProjects = [
    {
      id: 4,
      title: 'Annie and her dog Star',
      date: '1/7/26',
      category: 'Intimate Documentary',
      image: '/photos/eS4Rwaq0KdMka7YC0Lt7QwVvpk.webp',
      alt: 'Woman warmly embracing her companion',
    },
    {
      id: 5,
      title: 'Bride and Groom',
      date: '1/5/26',
      category: 'Destination Wedding',
      image: '/photos/atJSGWOSmoPWXD4zqFDhjEhPltc.webp',
      alt: 'Bride and groom romantic intimate vows',
    },
    {
      id: 6,
      title: 'Nocturne Solitude',
      date: '1/3/26',
      category: 'Cinematic Fashion',
      image: '/photos/5WjX1vJg991GRNOY7QwweeYhYUA.webp',
      alt: 'Cinematic midnight portrait in vintage coupe',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isDesktop = window.innerWidth > 768;

      // 1. Initial Card Entrance Reveal Stagger
      if (showcaseGridRef.current) {
        const items = showcaseGridRef.current.querySelectorAll('.portfolio-showcase-item');
        if (items.length) {
          gsap.fromTo(
            items,
            {
              opacity: 0,
              y: 50,
              scale: 0.98,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              stagger: 0.08,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: showcaseGridRef.current,
                start: 'top 85%',
              },
            }
          );
        }
      }

      // 2. Smooth Opposing Horizontal & Vertical Scrolling Parallax
      if (isDesktop && showcaseGridRef.current) {
        // First row (3 images): glides smoothly from right to left as user scrolls down
        if (rowTopRef.current) {
          gsap.fromTo(
            rowTopRef.current,
            { x: 220 },
            {
              x: -420,
              ease: 'none',
              scrollTrigger: {
                trigger: rowTopRef.current,
                start: 'top 95%',
                end: 'bottom 10%',
                scrub: 1.2,
              },
            }
          );

          // Staggered vertical floating parallax for cards in Row 1
          const topCards = rowTopRef.current.querySelectorAll('.portfolio-showcase-item');
          const verticalOffsets = [-40, -110, -60];
          topCards.forEach((card, idx) => {
            gsap.to(card, {
              y: verticalOffsets[idx % verticalOffsets.length],
              ease: 'none',
              scrollTrigger: {
                trigger: rowTopRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            });
          });
        }

        // Second row (3 images): glides smoothly from left to right as user scrolls down
        if (rowBottomRef.current) {
          gsap.fromTo(
            rowBottomRef.current,
            { x: -420 },
            {
              x: 220,
              ease: 'none',
              scrollTrigger: {
                trigger: rowBottomRef.current,
                start: 'top 95%',
                end: 'bottom 10%',
                scrub: 1.2,
              },
            }
          );

          // Staggered vertical floating parallax for cards in Row 2
          const bottomCards = rowBottomRef.current.querySelectorAll('.portfolio-showcase-item');
          const verticalOffsets = [-50, -120, -70];
          bottomCards.forEach((card, idx) => {
            gsap.to(card, {
              y: verticalOffsets[idx % verticalOffsets.length],
              ease: 'none',
              scrollTrigger: {
                trigger: rowBottomRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            });
          });
        }

        // Inner image vertical parallax on scroll for smooth dimensional depth
        const images = showcaseGridRef.current.querySelectorAll('.item-img');
        images.forEach((img) => {
          gsap.fromTo(
            img,
            { yPercent: -8, scale: 1.1 },
            {
              yPercent: 8,
              scale: 1.1,
              ease: 'none',
              scrollTrigger: {
                trigger: img.closest('.portfolio-showcase-item') || showcaseGridRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            }
          );
        });
      } else if (!isDesktop && showcaseGridRef.current) {
        // Mobile responsive vertical scroll reveal
        const mobileItems = showcaseGridRef.current.querySelectorAll('.portfolio-showcase-item');
        mobileItems.forEach((item) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 90%',
              },
            }
          );
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="section-milestone framer-portfolio-redesign" id="milestone">
      <div className="milestone-container">
        {/* Top Hairline Header Bar with Section Label */}
        <div className="milestone-top-bar">
          <span className="milestone-section-label">Portfolio</span>
        </div>

        {/* 3-Column Header Grid */}
        <div className="milestone-hero-grid">
          {/* Column 1: Massive Headline in Two Rows */}
          <div className="milestone-title-col">
            <h2 className="milestone-main-heading">
              <span className="milestone-heading-line">
                <StaggerTitle as="span">See the magic</StaggerTitle>
              </span>
              <span className="milestone-heading-line">
                <StaggerTitle as="span">for yourself</StaggerTitle>
              </span>
            </h2>
          </div>

          {/* Column 2: Curated Statement */}
          <div className="milestone-desc-col">
            <p className="milestone-curated-text">
              Browse a curated collection of moments that have made their way into the hearts of clients.
            </p>
          </div>

          {/* Column 3: Style Statement */}
          <div className="milestone-style-col">
            <h4 className="milestone-style-title">What's my style?</h4>
            <p className="milestone-style-text">
              Natural, emotive, and storytelling-focused. I aim to capture the real you.
            </p>
          </div>
        </div>

        {/* Curated Showcase Grid with Opposing Smooth Scrolling Rows */}
        <div className="portfolio-showcase-grid" ref={showcaseGridRef}>
          {/* Row 1: Top 3 Images (glides right to left) */}
          <div className="showcase-row showcase-row-top" ref={rowTopRef}>
            {topProjects.map((item) => (
              <article key={item.id} className="portfolio-showcase-item">
                <div className="item-meta-header">
                  <div className="item-meta-left">
                    <h3 className="item-title">{item.title}</h3>
                    <span className="item-category">{item.category}</span>
                  </div>
                  <span className="item-date">{item.date}</span>
                </div>

                <div className="item-image-frame">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="item-img"
                    loading="lazy"
                  />
                  <div className="item-viewfinder-overlay" aria-hidden="true">
                    <span className="viewfinder-corner corner-tl" />
                    <span className="viewfinder-corner corner-tr" />
                    <span className="viewfinder-corner corner-bl" />
                    <span className="viewfinder-corner corner-br" />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Row 2: Bottom 3 Images (glides left to right) */}
          <div className="showcase-row showcase-row-bottom" ref={rowBottomRef}>
            {bottomProjects.map((item) => (
              <article key={item.id} className="portfolio-showcase-item">
                <div className="item-meta-header">
                  <div className="item-meta-left">
                    <h3 className="item-title">{item.title}</h3>
                    <span className="item-category">{item.category}</span>
                  </div>
                  <span className="item-date">{item.date}</span>
                </div>

                <div className="item-image-frame">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="item-img"
                    loading="lazy"
                  />
                  <div className="item-viewfinder-overlay" aria-hidden="true">
                    <span className="viewfinder-corner corner-tl" />
                    <span className="viewfinder-corner corner-tr" />
                    <span className="viewfinder-corner corner-bl" />
                    <span className="viewfinder-corner corner-br" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}