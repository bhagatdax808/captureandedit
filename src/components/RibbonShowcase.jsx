import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const carouselPhotos = [
  { id: 1, src: 'photos/33MV0IZmK3REFJalk6IMW9hZ8.webp', title: 'Street Cafe Culture' },
  { id: 2, src: 'photos/PtOmfIDqFPfLwMMucdVIw0jwKwk.webp', title: 'Essence & Fragrance' },
  { id: 3, src: 'photos/5QD4gq8SXUlDrEqPWmWKw4gsB0Y.webp', title: 'Boutique Storefront' },
  { id: 4, src: 'photos/hiM3zaIkU1aeGXRL1RdbneKe1os.webp', title: 'Autumn Forest Floor' },
  { id: 5, src: 'photos/WNLmA9eUN1dEBUPu6SMcwSAn05A.webp', title: 'Kinetic Movement' },
  { id: 6, src: 'photos/vBbp3UFXMUZNQ4RfI3RjS3iDmPE.webp', title: 'Halo of Light' },
  { id: 7, src: 'photos/ZSyMpL8lvnOJDsnLpJIpYhAEoY.webp', title: 'Modern Editorial' },
  { id: 8, src: 'photos/uZATchhlmCzRZorlIrEqVvh7bc.webp', title: 'Mystic Meadow' },
  { id: 9, src: 'photos/EDjXZUxH9PUJ4Sc3htDzn89mi0.webp', title: 'Crimson Horizon' },
  { id: 10, src: 'photos/atJSGWOSmoPWXD4zqFDhjEhPltc.webp', title: 'Timeless Bond' },
  { id: 11, src: 'photos/Y2OvZnk4qxbxW0miBtWc6m8g.webp', title: 'Golden Hour Portrait' },
  { id: 12, src: 'photos/y6nsXyFCXVHybL6AG2drPt8Xug.webp', title: 'Behind The Lens' }
];

export default function RibbonShowcase() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollPos, setScrollPos] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dragStartRef = useRef({ x: 0, scroll: 0 });
  const velocityRef = useRef(0);
  const animFrameRef = useRef(null);
  const autoPlaySpeed = 0.65;

  const cardWidth = 240;
  const gap = 16;
  const totalItemWidth = cardWidth + gap;
  const totalWidth = totalItemWidth * carouselPhotos.length;

  const tripleItems = [...carouselPhotos, ...carouselPhotos, ...carouselPhotos];

  useEffect(() => {
    let lastTime = performance.now();

    const loop = (currentTime) => {
      const delta = (currentTime - lastTime) / 16.666;
      lastTime = currentTime;

      if (!isDragging) {
        if (Math.abs(velocityRef.current) > 0.05) {
          setScrollPos((prev) => {
            let next = prev + velocityRef.current * delta;
            if (next >= totalWidth) next -= totalWidth;
            if (next < 0) next += totalWidth;
            return next;
          });
          velocityRef.current *= Math.pow(0.92, delta);
        } else if (!isHovered) {
          setScrollPos((prev) => {
            let next = prev + autoPlaySpeed * delta;
            if (next >= totalWidth) next -= totalWidth;
            return next;
          });
        }
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isDragging, isHovered, totalWidth]);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    velocityRef.current = 0;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    dragStartRef.current = {
      x: clientX,
      scroll: scrollPos,
      lastX: clientX,
      lastTime: performance.now()
    };
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = clientX - dragStartRef.current.x;
    const now = performance.now();
    const dt = now - dragStartRef.current.lastTime;

    if (dt > 10) {
      velocityRef.current = -(clientX - dragStartRef.current.lastX) / (dt / 16.666);
      dragStartRef.current.lastX = clientX;
      dragStartRef.current.lastTime = now;
    }

    let next = dragStartRef.current.scroll - deltaX;
    while (next < 0) next += totalWidth;
    while (next >= totalWidth) next -= totalWidth;
    setScrollPos(next);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const scrollByDelta = (direction) => {
    velocityRef.current = direction * 14;
  };

  return (
    <section className="ribbon-showcase-section">
      <div className="ribbon-outer-header">
        <h3 className="ribbon-subheading">Visual Journey — 3D Gallery</h3>
        <p className="ribbon-drag-hint">Interactive 3D amphitheater carousel &bull; Drag to navigate</p>
      </div>

      <div
        className={"ribbon-cylinder-stage " + (isDragging ? "grabbing" : "grab")}
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          if (isDragging) setIsDragging(false);
        }}
      >
        <button
          className="ribbon-arrow-btn ribbon-arrow-left"
          onClick={(e) => {
            e.stopPropagation();
            scrollByDelta(-1);
          }}
          aria-label="Scroll left"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          className="ribbon-arrow-btn ribbon-arrow-right"
          onClick={(e) => {
            e.stopPropagation();
            scrollByDelta(1);
          }}
          aria-label="Scroll right"
        >
          <ChevronRight size={22} />
        </button>

        <div className="ribbon-cylinder-viewport">
          <div
            className="ribbon-3d-track"
            ref={trackRef}
            style={{
              transform: "translate3d(" + -scrollPos + "px, 0, 0)"
            }}
          >
            {tripleItems.map((item, index) => {
              const itemX = index * totalItemWidth - scrollPos;
              const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
              const centerOffset = (itemX + cardWidth / 2 - viewportWidth / 2) / (viewportWidth / 2);
              const clampedOffset = Math.max(-1.5, Math.min(1.5, centerOffset));
              const absOffset = Math.abs(clampedOffset);

              // ENHANCED CAMERA PERSPECTIVE & DEEPER NEGATIVE Z:
              // Center card: pushed deep back into -380px Z-depth, compact scale (~0.56)
              // Outer cards: brought forward in Z, towering scale (~1.25), rotated sharply inward (38deg)
              const translateZ = (absOffset - 1) * 380; // Deep negative Z at center (-380px)!
              const rotateY = clampedOffset * 38;      // Steep inward angle towards center
              const scale = 0.56 + absOffset * 0.56;   // Center is ~0.56, edges are ~1.28
              const zIndex = Math.round(absOffset * 100) + 1;

              return (
                <div
                  key={index}
                  className="ribbon-card-wrapper"
                  style={{
                    transform: "perspective(750px) rotateY(" + rotateY + "deg) translateZ(" + translateZ + "px) scale(" + scale + ")",
                    width: cardWidth + "px",
                    zIndex: zIndex
                  }}
                >
                  <div className="ribbon-card-inner">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="ribbon-card-img"
                      loading="lazy"
                      draggable="false"
                    />
                    <div className="ribbon-card-overlay">
                      <span className="ribbon-card-title">{item.title}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
