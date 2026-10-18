import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StaggerTitle({
  children,
  as: Tag = 'h2',
  className = '',
  stagger = 0.04,
  duration = 0.85,
  y = 28,
  triggerStart = 'top 88%',
  style = {},
  ...props
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const words = el.querySelectorAll('.stagger-word');
      if (words && words.length > 0) {
        gsap.fromTo(
          words,
          {
            opacity: 0,
            y: y,
            filter: 'blur(7px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: duration,
            ease: 'power3.out',
            stagger: stagger,
            scrollTrigger: {
              trigger: el,
              start: triggerStart,
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [stagger, duration, y, triggerStart]);

  const renderTokens = (node, keyPrefix = 'st') => {
    if (typeof node === 'string') {
      const parts = node.split(/(\s+)/);
      return parts.map((part, i) => {
        if (/^\s+$/.test(part)) {
          return ' ';
        }
        if (!part) return null;
        return (
          <span key={`${keyPrefix}-${i}`} className="stagger-word">
            {part}
          </span>
        );
      });
    }

    if (React.isValidElement(node)) {
      if (node.type === 'br') {
        return node;
      }
      return React.cloneElement(
        node,
        { key: node.key || keyPrefix },
        React.Children.map(node.props.children, (child, idx) =>
          renderTokens(child, `${keyPrefix}-${idx}`)
        )
      );
    }

    if (Array.isArray(node)) {
      return node.map((child, idx) => renderTokens(child, `${keyPrefix}-${idx}`));
    }

    return node;
  };

  return (
    <Tag ref={containerRef} className={className} style={style} {...props}>
      {renderTokens(children)}
    </Tag>
  );
}
