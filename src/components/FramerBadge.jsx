import React from 'react';

export default function FramerBadge() {
  return (
    <div className="framer-badge-affiliate">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M2.5 2.5H11.5V6H7L2.5 2.5Z" fill="black" />
        <path d="M2.5 6H7V9.5H2.5V6Z" fill="black" />
        <path d="M7 9.5H11.5L7 13.5V9.5Z" fill="black" />
      </svg>
      <span>Made in Framer</span>
    </div>
  );
}