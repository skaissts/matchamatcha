import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../App';
import { translations } from '../i18n/translations';
import './Reviews.css';

gsap.registerPlugin(ScrollTrigger);

function Reviews() {
    const { language } = useLanguage();
    const t = translations[language].reviews;
    const sectionRef = useRef();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.review-card', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse',
                },
                y: 100, // More pronounced movement
                opacity: 0,
                stagger: 0.25,
                duration: 1.2,
                ease: 'power3.out',
            });

            gsap.to('.review-card', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                },
                y: (i) => (i % 2 === 0 ? -30 : 30),
                ease: 'none',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="section section--reviews" id="reviews">
            <div className="reviews__content">
                <h2 className="section-title">{t.title}</h2>

                <div className="reviews__grid">
                    {t.items.map((review, index) => (
                        <div
                            key={index}
                            className="review-card"
                            style={{ '--delay': `${index * 0.3}s` }}
                        >
                            <div className="review-card__quote">"</div>
                            <p className="review-card__text">{review.text}</p>
                            <p className="review-card__author">— {review.author}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Reviews;
