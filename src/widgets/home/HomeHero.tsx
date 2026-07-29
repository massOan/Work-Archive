// src/widgets/home/HomeHero.tsx
import React from "react";
import { Link } from "react-router-dom";
import { messages } from "../../shared/config/i18n";
import { useLanguage } from "../../shared/context/LanguageContext";

const DEVELOPER_ILLUSTRATION_URL = `${process.env.PUBLIC_URL ?? ""}/assets/developer-illustration.png`;

export const HomeHero: React.FC = () => {
    const { language } = useLanguage();
    const t = messages[language].home;
    const role =
        language === "ja"
            ? "Android / React Frontend Engineer"
            : "Android / React Frontend Engineer";
    const location =
        language === "ja"
            ? "Japan based · Working in Japan"
            : "Japan based · 일본에서 근무 중";

    return (
        <section className="hero portfolio-hero">
            <div className="container hero-inner portfolio-hero-inner">
                <div className="profile-avatar">
                    <img src={DEVELOPER_ILLUSTRATION_URL} alt="Developer illustration" />
                </div>

                <div className="hero-kicker">{location}</div>
                <h1>{t.heroTitle}</h1>
                <p className="hero-role">{role}</p>
                <p className="hero-description">{t.heroDescription}</p>

                <div className="hero-actions">
                    <Link className="btn-primary" to="/products">
                        {t.primaryCta}
                    </Link>
                </div>
            </div>
        </section>
    );
};
