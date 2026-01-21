import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../App';
import { translations } from '../i18n/translations';
import './Ingredients.css';

gsap.registerPlugin(ScrollTrigger);

const sliderImages = ['matcha1.png', 'matcha2.png', 'matcha3.png'];

function Ingredients() {
    const { language } = useLanguage();
    const t = translations[language].ingredients;

    // Ingredients data from translation
    const ingredientsItems = t.items;

    const sectionRef = useRef();
    const slideRef = useRef();
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide(prev => (prev + 1) % sliderImages.length);
    };

    const prevSlide = () => {
        setCurrentSlide(prev => (prev - 1 + sliderImages.length) % sliderImages.length);
    };

    // Animation when slide changes
    useEffect(() => {
        if (slideRef.current) {
            gsap.fromTo(slideRef.current,
                { opacity: 0, scale: 0.95, rotation: -2 },
                { opacity: 1, scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(1.7)' }
            );
        }
    }, [currentSlide]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.ingredient-item',
                { x: 40, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                        toggleActions: 'play none none reverse',
                    },
                    x: 0,
                    opacity: 1,
                    stagger: 0.12,
                    duration: 0.7,
                    ease: 'power2.out',
                }
            );

            gsap.from('.ingredient-line', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 60%',
                    toggleActions: 'play none none reverse',
                },
                scaleX: 0,
                stagger: 0.08,
                duration: 0.5,
                ease: 'power2.out',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="section section--ingredients" id="ingredients">
            <h2 className="section-title">{t.title}</h2>

            <div className="ingredients__container">
                {/* Image Slider - Replaces 3D Model */}
                <div className="ingredients__slider">
                    <button className="slider-arrow slider-arrow--left" onClick={prevSlide}>
                        ←
                    </button>

                    <div className="slider-container">
                        <div ref={slideRef} className="slider-track">
                            {/* Images will be rendered here via state */}
                            <img
                                src={`/${sliderImages[currentSlide]}`}
                                alt="Matcha Variation"
                                className="slider-image"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                    </div>

                    <button className="slider-arrow slider-arrow--right" onClick={nextSlide}>
                        →
                    </button>

                    <div className="slider-dots">
                        {sliderImages.map((_, index) => (
                            <span
                                key={index}
                                className={`slider-dot ${currentSlide === index ? 'active' : ''}`}
                                onClick={() => setCurrentSlide(index)}
                            />
                        ))}
                    </div>
                </div>

                {/* Ingredients List */}
                <div className="ingredients__list">
                    <div className="ingredients__items">
                        {ingredientsItems.map((item, index) => (
                            <div key={index} className="ingredient-item">
                                <div className="ingredient-line"></div>
                                <div className="ingredient-content">
                                    <h3 className="ingredient-name">{item.name}</h3>
                                    <p className="ingredient-desc">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Ingredients;
