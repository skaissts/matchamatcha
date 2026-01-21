import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './SectionDivider.css';

// Infinite Marquee Divider (Ticker)
function SectionDivider({ direction = 'left' }) {
    const stripRef = useRef();

    // Use a longer array to ensure seamless looping on wide screens
    // 30 cups should be enough for 4k screens
    const cups = Array.from({ length: 30 }, (_, i) => (
        <img
            key={i}
            src="/matcha3.png"
            alt=""
            className="divider__cup"
            loading="lazy"
        />
    ));

    useEffect(() => {
        // Simple continuous ticker animation
        const ctx = gsap.context(() => {
            const totalWidth = stripRef.current.scrollWidth / 2; // Half because we double the content

            gsap.to(stripRef.current, {
                x: direction === 'left' ? -totalWidth : 0,
                // Start from 0 if left, start from -totalWidth if right to move right
                startAt: { x: direction === 'left' ? 0 : -totalWidth },
                duration: 40, // Slower, smoother ticker
                ease: 'none',
                repeat: -1,
            });
        }, stripRef);

        return () => ctx.revert();
    }, [direction]);

    return (
        <div className="section-divider">
            <div ref={stripRef} className="divider__strip">
                {cups}
                {cups} {/* Duplicate for seamless loop */}
            </div>
        </div>
    );
}

export default SectionDivider;
