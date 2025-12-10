// src/widgets/footer/Footer.tsx
import React from "react";
import { useLanguage } from "../../shared/context/LanguageContext";

export const Footer: React.FC = () => {
    const { language } = useLanguage();
    const year = new Date().getFullYear();

    const text =
        language === "ko"
            ? `© ${year} MySite. 모든 권리를 보유합니다.`
            : `© ${year} MySite. All rights reserved.`;

    return (
        <footer className="footer">
            <div className="container footer-inner">
                <span>{text}</span>
            </div>
        </footer>
    );
};
