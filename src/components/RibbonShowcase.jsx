import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const carouselPhotos = [
  { id: 1, src: 'photos/33MV0IZmK3REFJalk6IMW9hZ8.webp', title: 'Street Cafe Culture', tag: 'Editorial' },
  { id: 2, src: 'photos/PtOmfIDqFPfLwMMucdVIw0jwKwk.webp', title: 'Essence & Fragrance', tag: 'Commercial' },
  { id: 3, src: 'photos/5QD4gq8SXUlDrEqPWmWKw4gsB0Y.webp', title: 'Boutique Storefront', tag: 'Architecture' },
  { id: 4, src: 'photos/hiM3zaIkU1aeGXRL1RdbneKe1os.webp', title: 'Autumn Forest Floor', tag: 'Nature' },
  { id: 5, src: 'photos/WNLmA9eUN1dEBUPu6SMcwSAn05A.webp', title: 'Kinetic Movement', tag: 'Fashion' },
  { id: 6, src: 'photos/vBbp3UFXMUZNQ4RfI3RjS3iDmPE.webp', title: 'Halo of Light', tag: 'Portrait' },
  { id: 7, src: 'photos/ZSyMpL8lvnOJDsnLpJIpYhAEoY.webp', title: 'Modern Editorial', tag: 'Studio' },
  { id: 8, src: 'photos/uZATchhlmCzRZorlIrEqVvh7bc.webp', title: 'Mystic Meadow', tag: 'Landscape' },
  { id: 9, src: 'photos/EDjXZUxH9PUJ4Sc3htDzn89mi0.webp', title: 'Crimson Horizon', tag: 'Sunset' },
  { id: 10, src: 'photos/atJSGWOSmoPWXD4zqFDhjEhPltc.webp', title: 'Timeless Bond', tag: 'Wedding' },
  { id: 11, src: 'photos/Y2OvZnk4qxbxW0miBtWc6m8g.webp', title: 'Golden Hour Portrait', tag: 'Portrait' },
  { id: 12, src: 'photos/y6nsXyFCXVHybL6AG2drPt8Xug.webp', title: 'Behind The Lens', tag: 'Documentary' },
  { id: 13, src: 'photos/0wAQnSK8HJ1PqWcUHPNg7r4fQ.webp', title: 'Cinematic Portrait', tag: 'Editorial' },
  { id: 14, src: 'photos/GBnQnQd8wzM0iTfsxo2Ry3g6CQ.webp', title: 'Fashion Silhouette', tag: 'Fashion' },
  { id: 15, src: 'photos/ZbIHQ4En9g1fFVY4ihQ8XwHYdu4.webp', title: 'Alpine Snow Trail', tag: 'Adventure' },
  { id: 16, src: 'photos/5WjX1vJg991GRNOY7QwweeYhYUA.webp', title: 'Vintage Convertible', tag: 'Lifestyle' }
];

export default function RibbonShowcase() {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);

  const [isDragging, setIsDragging] = useState(false);

  const rotRef = useRef(0);
  const dragStartRef = useRef({ x: 0, rot: 0, lastX: 0, lastTime: 0 });
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);

  const total = carouselPhotos.length;
  const angleStep = 360 / total;
  const centerIdx = Math.floor(total / 2);
  const autoPlaySpeed = 0.14;
  const archY = 0;

  const getSettings = useCallback(() => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
    if (w < 600) {
      return { radiusZ: -420, trackZ: -160 };
    } else if (w < 900) {
      return { radiusZ: -520, trackZ: -190 };
    } else {
      return { radiusZ: -630, trackZ: -220 };
    }
  }, []);

  const update = useCallback((currentRot) => {
    if (!trackRef.current) return;
    const { radiusZ, trackZ } = getSettings();

    // Apply negative track translation and rotation
    trackRef.current.style.transform = `translateZ(${trackZ}px) rotateY(${currentRot}deg)`;

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const offset = i - centerIdx;
      const angle = offset * angleStep;
      const yOffset = Math.pow(offset, 2) * (archY / 9);

      // Negative Z curvature pushes side elements back (or amphitheater arc)
      card.style.transform = `rotateY(${angle}deg) translateZ(${radiusZ}px) translateY(${yOffset}px)`;

      // Strict Dynamic math Z-Index
      const normAngle = (((angle + currentRot) % 360) + 540) % 360 - 180;
      const absAngle = Math.abs(normAngle);
      const zIndex = Math.round(100 - (absAngle / 180) * 85);
      card.style.zIndex = zIndex;

      // Depth atmospheric shading
      const depthRatio = Math.min(absAngle / 90, 1);
      card.style.filter = `brightness(${1 - depthRatio * 0.4}) blur(${depthRatio * 1.5}px)`;

      // Half-circular visibility: cards in front arc (absAngle <= 98) are visible with soft edge fade
      if (absAngle <= 98) {
        card.style.visibility = 'visible';
        const edgeFade = Math.max(0, Math.min(1, (98 - absAngle) / 20));
        card.style.opacity = String(edgeFade);
        card.style.pointerEvents = absAngle < 35 ? 'auto' : 'none';
      } else {
        card.style.visibility = 'hidden';
        card.style.opacity = '0';
        card.style.pointerEvents = 'none';
      }
    });
  }, [angleStep, centerIdx, archY, getSettings]);

  useEffect(() => {
    let animId;
    let lastTime = performance.now();

    const loop = (currentTime) => {
      const delta = (currentTime - lastTime) / 16.666;
      lastTime = currentTime;

      if (!isDraggingRef.current) {
        if (Math.abs(velocityRef.current) > 0.02) {
          rotRef.current += velocityRef.current * delta;
          velocityRef.current *= Math.pow(0.93, delta);
        } else if (!isHoveredRef.current) {
          // Infinite continuous auto-scrolling
          rotRef.current -= autoPlaySpeed * delta;
        }
      }

      update(rotRef.current);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [update, autoPlaySpeed]);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    isDraggingRef.current = true;
    velocityRef.current = 0;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    dragStartRef.current = {
      x: clientX,
      rot: rotRef.current,
      lastX: clientX,
      lastTime: performance.now(),
    };
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = clientX - dragStartRef.current.x;
    const now = performance.now();
    const dt = now - dragStartRef.current.lastTime;

    if (dt > 10) {
      velocityRef.current = (clientX - dragStartRef.current.lastX) * 0.14 / (dt / 16.666);
      dragStartRef.current.lastX = clientX;
      dragStartRef.current.lastTime = now;
    }

    rotRef.current = dragStartRef.current.rot + deltaX * 0.14;
    update(rotRef.current);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    isDraggingRef.current = false;
  };

  const rotateByStep = (direction) => {
    velocityRef.current = direction * 2.6;
  };

  return (
    <section className="ribbon-showcase-section" id="gallery-3d">
      <div className="ribbon-outer-header">
        <h3 className="ribbon-subheading">Visual Journey &mdash; 3D Convex Gallery</h3>
        <p className="ribbon-drag-hint">Negative-Z Convex Arc &bull; Drag to rotate or use navigation arrows</p>
      </div>

      <div
        className={"ribbon-convex-viewport " + (isDragging ? "grabbing" : "grab")}
        ref={viewportRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
          if (isDraggingRef.current) {
            setIsDragging(false);
            isDraggingRef.current = false;
          }
        }}
      >
        {/* Navigation Arrow Left */}
        <button
          className="ribbon-arrow-btn ribbon-arrow-left"
          onClick={(e) => {
            e.stopPropagation();
            rotateByStep(1);
          }}
          aria-label="Previous photo"
          type="button"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Navigation Arrow Right */}
        <button
          className="ribbon-arrow-btn ribbon-arrow-right"
          onClick={(e) => {
            e.stopPropagation();
            rotateByStep(-1);
          }}
          aria-label="Next photo"
          type="button"
        >
          <ChevronRight size={22} />
        </button>

        {/* Negative-Z Convex Track */}
        <div className="ribbon-convex-track" ref={trackRef}>
          {carouselPhotos.map((item, idx) => (
            <div
              key={item.id}
              className="ribbon-convex-card"
              ref={(el) => (cardRefs.current[idx] = el)}
            >
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                draggable="false"
              />
              <div className="ribbon-card-overlay">
                <span className="ribbon-card-tag">{item.tag}</span>
                <span className="ribbon-card-title">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
