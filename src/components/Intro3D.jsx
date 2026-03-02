import React, { useEffect, useState, useMemo, useCallback } from 'react';
import '../styles/Intro3D.css';

const Intro3D = ({ onFinish }) => {
  const [folding, setFolding] = useState(false);

  const handleFinish = useCallback(() => {
    onFinish();
  }, [onFinish]);

  useEffect(() => {
    // Start the page-fold after the intro content has displayed
    const foldTimer = setTimeout(() => setFolding(true), 4200);
    // Remove intro from DOM after the fold animation completes
    const doneTimer = setTimeout(() => handleFinish(), 5500);
    return () => {
      clearTimeout(foldTimer);
      clearTimeout(doneTimer);
    };
  }, [handleFinish]);

  // Sparkle particles
  const sparkles = useMemo(() =>
    Array.from({ length: 16 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      bottom: Math.random() * 60,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 4,
      duration: 2.5 + Math.random() * 2.5,
    })), []);

  // HelloKitty background icons — bigger, more visible
  const kitties = useMemo(() => {
    const items = [];
    const cols = 5;
    const rows = 4;
    let id = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const baseLeft = (c / cols) * 100 + (100 / cols) * 0.2;
        const baseTop = (r / rows) * 100 + (100 / rows) * 0.2;
        items.push({
          id: id++,
          left: baseLeft + (Math.random() - 0.5) * (100 / cols) * 0.4,
          top: baseTop + (Math.random() - 0.5) * (100 / rows) * 0.4,
          size: 58 + Math.random() * 22,
          delay: Math.random() * 5,
          duration: 4 + Math.random() * 3,
          opacity: 0.15 + Math.random() * 0.1,
        });
      }
    }
    return items;
  }, []);

  return (
    <div className="intro-perspective-wrapper">
      <div className={`intro-container ${folding ? 'intro-fold' : ''}`}>
        {/* Radial glow */}
        <div className="intro-glow" />

        {/* HelloKitty background */}
        <div className="kitty-bg-layer">
          {kitties.map((k) => (
            <img
              key={k.id}
              src="/hellokitty.png"
              alt=""
              className="kitty-bg-icon"
              style={{
                left: `${k.left}%`,
                top: `${k.top}%`,
                width: `${k.size}px`,
                height: `${k.size}px`,
                animationDelay: `${k.delay}s`,
                animationDuration: `${k.duration}s`,
                opacity: k.opacity,
              }}
            />
          ))}
        </div>

        {/* Rising sparkles */}
        <div className="sparkles-layer">
          {sparkles.map((s) => (
            <div
              key={s.id}
              className="sparkle"
              style={{
                left: `${s.left}%`,
                bottom: `${s.bottom}%`,
                width: `${s.size}px`,
                height: `${s.size}px`,
                animationDelay: `${s.delay}s`,
                animationDuration: `${s.duration}s`,
              }}
            />
          ))}
        </div>

        {/* Center content */}
        <div className="intro-content">
          <div className="intro-name-wrapper">
            <h1 className="intro-title">Sneha Neupane</h1>
            <div className="intro-title-shimmer" />
          </div>
          <p className="intro-subtitle">Full Stack Developer & Creative Coder</p>
        </div>

        {/* Decorative rings */}
        <div className="deco-ring ring-1" />
        <div className="deco-ring ring-2" />
        <div className="deco-ring ring-3" />

        {/* Fold shadow edge (appears during fold) */}
        <div className="fold-shadow" />
      </div>
    </div>
  );
};

export default Intro3D;