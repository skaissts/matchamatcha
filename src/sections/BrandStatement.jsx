import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../App';
import { translations } from '../i18n/translations';
import './BrandStatement.css';

gsap.registerPlugin(ScrollTrigger);

function BrandStatement() {
    const sectionRef = useRef();
    const textRef = useRef();

    const { language } = useLanguage();
    const t = translations[language].brandStatement;

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(textRef.current.children, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse',
                },
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out'
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="section section--brand-statement">
            <div className="section__glow section__glow--top-left section__glow--green"></div>
            <div className="section__glow section__glow--bottom-right section__glow--pink"></div>
            <div ref={textRef} className="brand-statement__content">
                {/* Use shared section-title class for consistent size/style */}
                <h2 className="section-title">
                    {t.heading}
                </h2>
                <div className="brand-statement__description-container">
                    <p className="brand-statement__description">
                        {t.text}
                    </p>
                </div>
            </div>
        </section>
    );
}

export default BrandStatement;
