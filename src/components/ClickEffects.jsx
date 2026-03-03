import React, { useEffect, useState, useCallback } from 'react';
import '../styles/ClickEffects.css';

/**
 * ClickEffects
 * Spawns a small burst of subtle sparkles wherever the user clicks or taps.
 * Works globally across the entire app. Highly optimized.
 */
const ClickEffects = () => {
    const [sparkles, setSparkles] = useState([]);

    // Use useCallback to keep the reference stable
    const handleClick = useCallback((e) => {
        // Determine exact coordinates
        const x = e.clientX;
        const y = e.clientY;

        // Generate 4-6 small sparkles for a single click
        const numSparkles = Math.floor(Math.random() * 3) + 4; // 4 to 6
        const newSparkles = [];
        const timestamp = Date.now();

        for (let i = 0; i < numSparkles; i++) {
            // Randomize trajectory and rotation
            const angle = Math.random() * Math.PI * 2;
            const velocity = 15 + Math.random() * 25; // 15px to 40px spread

            newSparkles.push({
                id: `${timestamp}-${i}`,
                x,
                y,
                tx: Math.cos(angle) * velocity,
                ty: Math.sin(angle) * velocity,
                rotation: Math.random() * 360,
                size: 6 + Math.random() * 8, // 6px to 14px
            });
        }

        setSparkles((prev) => [...prev, ...newSparkles]);

        // Clean up sparkles exactly after the CSS animation finishes (600ms)
        // to prevent DOM bloat and memory leaks.
        setTimeout(() => {
            setSparkles((prev) => prev.filter(s => !newSparkles.find(ns => ns.id === s.id)));
        }, 600);

    }, []);

    useEffect(() => {
        // Listen to global click events
        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, [handleClick]);

    return (
        <div className="click-effects-container" aria-hidden="true">
            {sparkles.map(sparkle => (
                <div
                    key={sparkle.id}
                    className="click-sparkle"
                    style={{
                        left: `${sparkle.x}px`,
                        top: `${sparkle.y}px`,
                        width: `${sparkle.size}px`,
                        height: `${sparkle.size}px`,
                        '--tx': `${sparkle.tx}px`,
                        '--ty': `${sparkle.ty}px`,
                        '--rot': `${sparkle.rotation}deg`,
                    }}
                >
                    {/* A simple SVG star for elegance */}
                    <svg viewBox="0 0 24 24" fill="#FFB6C1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                    </svg>
                </div>
            ))}
        </div>
    );
};

export default ClickEffects;
