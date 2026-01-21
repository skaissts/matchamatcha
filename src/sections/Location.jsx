import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Location.css';

gsap.registerPlugin(ScrollTrigger);

function Location() {
    const sectionRef = useRef();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.location__card', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse',
                },
                y: 40,
                opacity: 0,
                stagger: 0.2,
                duration: 0.8,
                ease: 'power2.out',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="section section--location" id="location">
            <h2 className="section-title">Besuchen Sie uns</h2>

            <div className="location__grid">
                {/* Opening Hours Card */}
                <div className="location__card">
                    <h3 className="card-title">Öffnungszeiten</h3>
                    <div className="hours-list">
                        <div className="hours-row">
                            <span className="day">MO</span>
                            <span className="time closed">geschlossen</span>
                        </div>
                        <div className="hours-row">
                            <span className="day">DI–FR</span>
                            <span className="time">11:00 – 19:30</span>
                        </div>
                        <div className="hours-row">
                            <span className="day">SA</span>
                            <span className="time">12:00 – 20:00</span>
                        </div>
                        <div className="hours-row">
                            <span className="day">SO</span>
                            <span className="time">13:00 – 19:00</span>
                        </div>
                    </div>
                </div>

                {/* Address Card */}
                <div className="location__card">
                    <h3 className="card-title">Adresse</h3>
                    <address className="address-text">
                        Kassel, Königs-Galerie<br />
                        Obere Königsstraße 39<br />
                        34117 Kassel
                    </address>

                    <a href="https://instagram.com/matchamatcha.kassel" target="_blank" rel="noreferrer" className="social-link">
                        <span className="social-icon">Instagram</span>
                        @matchamatcha.kassel
                    </a>
                </div>
            </div>
        </section>
    );
}

export default Location;
