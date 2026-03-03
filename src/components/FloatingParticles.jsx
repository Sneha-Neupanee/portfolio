import React, { useMemo } from 'react';
import '../styles/FloatingParticles.css';

const FloatingParticles = () => {
    const particles = useMemo(() => {
        return Array.from({ length: 25 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            size: 3 + Math.random() * 6,
            delay: Math.random() * 15,
            duration: 15 + Math.random() * 15,
            opacity: 0.15 + Math.random() * 0.2,
        }));
    }, []);

    return (
        <div className="global-particles-container" aria-hidden="true">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="global-particle"
                    style={{
                        left: `${p.left}%`,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        animationDelay: `${p.delay}s`,
                        animationDuration: `${p.duration}s`,
                        '--base-opacity': p.opacity,
                    }}
                />
            ))}
        </div>
    );
};

export default FloatingParticles;
