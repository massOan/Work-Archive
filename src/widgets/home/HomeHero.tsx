// src/widgets/home/HomeHero.tsx
import React from "react";
import { messages } from "../../shared/config/i18n";
import { useLanguage } from "../../shared/context/LanguageContext";

export const HomeHero: React.FC = () => {
    const { language } = useLanguage();
    const t = messages[language].home;

    return (
        <section className="hero">
            <div className="container hero-inner">
                <div>
                    <h1>{t.heroTitle}</h1>
                    <p>{t.heroDescription}</p>
                    <div className="hero-actions">
                        <button className="btn-primary">Get Started</button>
                        <button className="btn-ghost">Learn More</button>
                    </div>
                </div>
            </div>
        </section>
    );
};
