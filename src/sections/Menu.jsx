import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Menu.css';

gsap.registerPlugin(ScrollTrigger);

// Menu data
const menuData = {
    basicIcedMatcha: {
        title: 'BASIC ICED MATCHA',
        items: [
            { name: 'classic', price: '6,2' },
            { name: 'strawberry', price: '6,9' },
            { name: 'mango', price: '6,9' },
            { name: 'blueberry', price: '6,9' },
        ]
    },
    matchaMatcha: {
        title: 'MATCHA MATCHA',
        items: [
            { name: 'banana pudding matcha', price: '7,5' },
            { name: 'lotus crumble matcha', price: '7,5' },
        ]
    },
    icedHochija: {
        title: 'ICED HOCHIJA',
        items: [
            { name: 'bourbon vanilla hochija', price: '6,9' },
            { name: 'banana hazel hochija', price: '7,5' },
            { name: 'chocolaty hochija', price: '6,9' },
        ]
    },
    signatureMatchas: {
        title: 'SIGNATURE MATCHAS',
        items: [
            { name: 'white choc raspberry', price: '6,9' },
            { name: 'raspberry / vanilla pistachio', price: '7,5' },
            { name: 'nutty banana', price: '7,5' },
            { name: 'pink strawberry glow', price: '6,9' },
            { name: 'mango / blueberry coco', price: '6,9' },
            { name: 'geh ins gymi werde skinny!', price: '6,9' },
        ]
    },
    sweetTreats: {
        title: 'SWEET TREATS',
        items: [
            { name: 'banana pudding cup', price: '4,9' },
            { name: 'pistachio banana pudding', price: '5,9' },
            { name: 'lotus banana pudding', price: '5,9' },
        ]
    }
};

const milkOptions = 'kuhmilch / hafermilch / mandelmilch / sojamilch';
const milkExtra = 'kokos- und vanillemilch zzgl. 0,5€';
const extras = [
    'vanilla / caramel / sugarfree vanilla sirup zzgl. 0,5€',
    'white choc / coco / hazel / pistachio / chocolate / puree zzgl. 1,0€'
];

function MenuCategory({ category }) {
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
                            <MenuCategory category={menuData.basicIcedMatcha} />
                            <MenuCategory category={menuData.matchaMatcha} />
                            <MenuCategory category={menuData.icedHochija} />
                        </div>
                        <div className="menu__column">
                            <MenuCategory category={menuData.signatureMatchas} />
                            <MenuCategory category={menuData.sweetTreats} />
                        </div>
                    </div>

                    <div className="menu__extras">
                        <div className="menu__milk">
                            <h4>choose your milk:</h4>
                            <p>{milkOptions}</p>
                            <p className="menu__milk-extra">{milkExtra}</p>
                        </div>
                        <div className="menu__add-ons">
                            <h4>extras:</h4>
                            {extras.map((extra, i) => (
                                <p key={i}>{extra}</p>
                            ))}
                        </div>
                    </div>

                    <p className="menu__note">p.s all our drinks are 550ml</p>
                </div>
            </div>
        </section>
    );
}

export default Menu;
