import React, { useMemo } from 'react';
import '../styles/KittyAccent.css';

/**
 * Subtle Hello Kitty background accents scattered across a page.
 * Renders a handful of tiny, low-opacity kitty icons that gently float.
 * Completely non-interactive (pointer-events: none).
 */
const KittyAccent = () => {
    const kitties = useMemo(() => {
        const positions = [
            { left: 5, top: 12 },
            { left: 88, top: 8 },
            { left: 15, top: 55 },
            { left: 92, top: 45 },
            { left: 50, top: 85 },
            { left: 75, top: 25 },
            { left: 8, top: 78 },
            { left: 82, top: 70 },
        ];

        return positions.map((pos, i) => ({
            id: i,
            left: pos.left + (Math.random() - 0.5) * 6,
            top: pos.top + (Math.random() - 0.5) * 8,
            size: 40 + Math.random() * 25,          // 40–65px
            opacity: 0.06 + Math.random() * 0.06,   // 0.06–0.12
            delay: Math.random() * 10,
            duration: 12 + Math.random() * 8,       // 12–20s
            rotation: -15 + Math.random() * 30,       // -15° to +15°
        }));
    }, []);

    return (
        <div className="kitty-accent-layer" aria-hidden="true">
            {kitties.map((k) => (
                <img
                    key={k.id}
                    src="/hellokitty.png"
                    alt=""
                    className="kitty-accent-icon"
                    style={{
                        left: `${k.left}%`,
                        top: `${k.top}%`,
                        width: `${k.size}px`,
                        height: `${k.size}px`,
                        opacity: k.opacity,
                        animationDelay: `${k.delay}s`,
                        animationDuration: `${k.duration}s`,
                        transform: `rotate(${k.rotation}deg)`,
                    }}
                />
            ))}
        </div>
    );
};

export default KittyAccent;
