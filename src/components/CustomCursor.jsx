import React, { useEffect, useRef } from 'react';
import '../styles/CustomCursor.css';

/**
 * CustomCursor
 * Replaces the system cursor with Hello Kitty image on desktop (devices with hover capability).
 * Uses requestAnimationFrame and direct DOM manipulation for 60fps performance without React re-renders.
 */
const CustomCursor = () => {
    const cursorRef = useRef(null);

    useEffect(() => {
        // Only run on devices that support hover (not mobile/touch)
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            return;
        }

        const cursor = cursorRef.current;
        if (!cursor) return;

        let mouseX = 0;
        let mouseY = 0;
        let isMoving = false;

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (!isMoving) {
                requestAnimationFrame(updateCursor);
            }
            isMoving = true;
        };

        const updateCursor = () => {
            // Offset by half the width/height (16px) to center the 32x32 image exactly on the pointer tip
            cursor.style.transform = `translate3d(${mouseX - 16}px, ${mouseY - 16}px, 0)`;
            isMoving = false;
        };

        // Listen on the document to track everywhere
        document.addEventListener('mousemove', onMouseMove, { passive: true });

        // Handle cursor leaving the window
        const onMouseLeave = () => {
            cursor.style.opacity = 0;
        };
        const onMouseEnter = () => {
            cursor.style.opacity = 1;
        };

        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('mouseenter', onMouseEnter);

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mouseenter', onMouseEnter);
        };
    }, []);

    return (
        <div className="custom-cursor" ref={cursorRef} aria-hidden="true">
            <img src="/hellokitty.png" alt="" className="custom-cursor-img" />
        </div>
    );
};

export default CustomCursor;
