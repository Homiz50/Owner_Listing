import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const BackgroundAnimation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create floating elements
    const shapes = [];
    const icons = ['🏠', '🏢', '🏡', '🔑', '🏗️', '🏘️', '🛋️', '🌆']; // Real Estate Icons
    const colors = ['#6366f1', '#8b5cf6', '#3b82f6', '#10b981']; // Indigo, Violet, Blue, Emerald

    for (let i = 0; i < 20; i++) { // Increased count slightly
      const shape = document.createElement('div');
      
      shape.innerText = icons[Math.floor(Math.random() * icons.length)];
      shape.style.fontSize = `${Math.random() * 30 + 20}px`; // Random size
      shape.style.position = 'absolute';
      shape.style.color = colors[Math.floor(Math.random() * colors.length)];
      shape.style.opacity = '0.08'; // Slightly clearer than shapes
      shape.style.left = `${Math.random() * 100}%`;
      shape.style.top = `${Math.random() * 100}%`;
      shape.style.zIndex = '0';
      shape.style.userSelect = 'none'; // Prevent selection
      
      container.appendChild(shape);
      shapes.push(shape);
    }

    // Animate shapes
    shapes.forEach((shape) => {
      gsap.to(shape, {
        x: 'random(-100, 100)',
        y: 'random(-100, 100)',
        rotation: 'random(0, 360)',
        duration: 'random(10, 20)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      
      gsap.to(shape, {
        opacity: 'random(0.02, 0.08)',
        duration: 'random(3, 8)',
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    });

    return () => {
      shapes.forEach(shape => shape.remove());
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none overflow-hidden -z-10 bg-slate-50"
    />
  );
};

export default BackgroundAnimation;
