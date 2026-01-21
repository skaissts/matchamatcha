import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './Hero.css';

function Hero() {
    const heroRef = useRef();
    const logoRef = useRef();

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Breathing animation for logo - ENHANCED
            gsap.to(logoRef.current, {
                scale: 1.15, // Increased from 1.06
                opacity: 1,
                y: -25, // Increased movement
                duration: 4, // Slower, deeper breath
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="section section--hero" id="hero">
            <div className="hero__logo-container">
                <div className="hero__glow"></div>
                <img
                    ref={logoRef}
                    src="/logo.png"
                    alt="MATCHA MATCHA"
                    className="hero__logo"
                    loading="eager"
                    decoding="async"
                    style={{
                        filter: 'drop-shadow(0 0 40px rgba(245, 209, 216, 0.6))'
                    }}
                />
            </div>
        </section>
    );
}

export default Hero;
