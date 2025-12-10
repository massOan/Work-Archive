// src/widgets/pricing/PricingPlans.tsx
import React from "react";
import { messages } from "../../shared/config/i18n";
import { useLanguage } from "../../shared/context/LanguageContext";

export const PricingPlans: React.FC = () => {
    const { language } = useLanguage();

    const t = messages[language].pricing;

    return (
        <section className="section section-muted">
            <div className="container">
                {/* 다국어 적용된 타이틀/서브타이틀 */}
                <h2 className="section-title">{t.title}</h2>
                <p className="section-subtitle">{t.subtitle}</p>

                <div className="pricing-grid">
                    <article className="card pricing-card">
                        <h3>{t.comingSoonTitle}</h3>
                        <p className="pricing-description">{t.comingSoonDescription}</p>
                    </article>
                </div>
            </div>
        </section>
    );
};
