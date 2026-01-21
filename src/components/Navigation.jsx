import { useState } from 'react';
import { useLanguage } from '../App';
import './Navigation.css';

function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const { language, toggleLanguage } = useLanguage();

    const menuItems = language === 'de'
        ? [
            { key: 'menu', label: 'Menü', href: '#menu' },
            { key: 'ingredients', label: 'Zutaten', href: '#ingredients' },
            { key: 'reviews', label: 'Bewertungen', href: '#reviews' },
            { key: 'location', label: 'Besuch uns', href: '#location' },
        ]
        : [
            { key: 'menu', label: 'Menu', href: '#menu' },
            { key: 'ingredients', label: 'Ingredients', href: '#ingredients' },
            { key: 'reviews', label: 'Reviews', href: '#reviews' },
            { key: 'location', label: 'Visit Us', href: '#location' },
        ];

    const handleNavClick = (href) => {
        setIsOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <nav className="nav">
                <button
                    className={`burger ${isOpen ? 'open' : ''}`}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    <div className="burger__inner">
                        <span className="burger__line"></span>
                        <span className="burger__line"></span>
                        <span className="burger__line"></span>
                    </div>
                </button>

                <button
                    className="lang-toggle"
                    onClick={toggleLanguage}
                    aria-label="Toggle language"
                >
                    {language === 'de' ? 'EN' : 'DE'}
                </button>
            </nav>

            <div className={`menu-overlay ${isOpen ? 'open' : ''}`}>
                <div className="menu-overlay__content">
                    {menuItems.map((item, index) => (
                        <a
                            key={item.key}
                            href={item.href}
                            className="menu-overlay__link"
                            style={{ '--index': index }}
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick(item.href);
                            }}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Navigation;
