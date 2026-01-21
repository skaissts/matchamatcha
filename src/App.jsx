import { useState, useEffect, createContext, useContext } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from './components/Navigation';
import LiquidBackground from './components/LiquidBackground';
import Loader from './components/Loader';
import SectionDivider from './components/SectionDivider';
import Hero from './sections/Hero';
import BrandStatement from './sections/BrandStatement';
import Menu from './sections/Menu';
import Ingredients from './sections/Ingredients';
import Reviews from './sections/Reviews';
import Location from './sections/Location';

import './index.css';

gsap.registerPlugin(ScrollTrigger);

// Language Context
export const LanguageContext = createContext();

export function useLanguage() {
    return useContext(LanguageContext);
}

function App() {
    const [language, setLanguage] = useState('de');
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);

    // Initialize Lenis smooth scroll
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 0.8,
            touchMultiplier: 1.5,
        });

        // Throttled scroll update
        let ticking = false;
        lenis.on('scroll', () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(() => {
                    ScrollTrigger.update();
                    ticking = false;
                });
            }
        });

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        // Loading simulation
        let progress = 0;
        const loadInterval = setInterval(() => {
            progress += Math.random() * 20;
            if (progress >= 100) {
                progress = 100;
                setLoadProgress(100);
                setTimeout(() => setIsLoaded(true), 400);
                clearInterval(loadInterval);
            } else {
                setLoadProgress(progress);
            }
        }, 150);

        return () => {
            lenis.destroy();
            clearInterval(loadInterval);
        };
    }, []);

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'de' ? 'en' : 'de');
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            <div className="app">
                {!isLoaded && <Loader progress={loadProgress} />}

                {/* Canvas 2D Background - NOT WebGL */}
                <LiquidBackground />

                <Navigation />

                <div className="content-layer">
                    <Hero />
                    <SectionDivider />
                    <BrandStatement />
                    <SectionDivider direction="right" />
                    <Menu />
                    <SectionDivider />
                    <Ingredients />
                    <SectionDivider />
                    <Reviews />
                    <SectionDivider />
                    <Location />

                    <footer className="footer">
                        <div className="footer__content">
                            <span>© 2026 MATCHA MATCHA</span>
                        </div>
                    </footer>
                </div>
            </div>
        </LanguageContext.Provider>
    );
}

export default App;
