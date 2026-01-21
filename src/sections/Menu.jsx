import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../App';
import { translations } from '../i18n/translations';
import './Menu.css';

gsap.registerPlugin(ScrollTrigger);

function MenuCategory({ category }) {
    if (!category) return null;
    return (
        <div className="menu-category">
            <h3 className="menu-category__title">{category.title}</h3>
            <div className="menu-category__items">
                {category.items.map((item, index) => (
                    <div key={index} className="menu-item">
                        <span className="menu-item__name">{item.name}</span>
                        <span className="menu-item__dots"></span>
                        <span className="menu-item__price">{item.price}€</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Menu() {
    const { language } = useLanguage();
    const t = translations[language].menuSection;
    const sectionRef = useRef();
    const logoRef = useRef();

    useEffect(() => {
        // Breathing animation for menu logo
        gsap.to(logoRef.current, {
            scale: 1.015,
            duration: 2.5,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
        });

        const ctx = gsap.context(() => {
            gsap.from('.menu-category', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                    end: 'center center',
                    toggleActions: 'play none none reverse',
                },
                y: 30,
                opacity: 0,
                stagger: 0.08,
                duration: 0.6,
                ease: 'power2.out',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="section section--menu" id="menu">
            <div className="section__glow section__glow--top-right section__glow--pink"></div>
            <div className="section__glow section__glow--bottom-left section__glow--green"></div>
            {/* PNG Menu Logo in Glossy Container */}
            <div className="menu__logo-container">
                <img
                    ref={logoRef}
                    src="/menu.png"
                    alt="MENU"
                    className="menu__logo"
                />
            </div>

            {/* Menu Content */}
            <div className="menu__content">
                <div className="menu__paper">
                    <div className="menu__grid">
                        <div className="menu__column">
                            <MenuCategory category={t.items.basicIcedMatcha} />
                            <MenuCategory category={t.items.matchaMatcha} />
                            <MenuCategory category={t.items.icedHochija} />
                        </div>
                        <div className="menu__column">
                            <MenuCategory category={t.items.signatureMatchas} />
                            <MenuCategory category={t.items.sweetTreats} />
                        </div>
                    </div>

                    <div className="menu__extras">
                        <div className="menu__milk">
                            <h4>{t.extras.milkTitle}</h4>
                            <p>{t.extras.milkOptions}</p>
                            <p className="menu__milk-extra">{t.extras.milkExtra}</p>
                        </div>
                        <div className="menu__add-ons">
                            <h4>{t.extras.extrasTitle}</h4>
                            {t.extras.extrasList.map((extra, i) => (
                                <p key={i}>{extra}</p>
                            ))}
                        </div>
                    </div>

                    <p className="menu__note">{t.extras.note}</p>
                </div>
            </div>
        </section>
    );
}

export default Menu;
