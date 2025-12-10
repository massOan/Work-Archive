// src/widgets/header/Header.tsx
import React from "react";
import { TabId, TABS } from "../../shared/config/navigation";
import { LANGUAGE_OPTIONS, Language } from "../../shared/config/i18n";
import { useLanguage } from "../../shared/context/LanguageContext";

type HeaderProps = {
    activeTabId: TabId;
    onTabChange: (id: TabId) => void;
};

const NAV_LABELS: Record<Language, Record<TabId, string>> = {
    ko: {
        home: "홈",
        products: "제품",
        pricing: "요금제",
        blog: "블로그",
        contact: "문의",
    },
    ja: {
        home: "ホーム",
        products: "プロダクト",
        pricing: "料金",
        blog: "ブログ",
        contact: "お問い合わせ",
    },
};

export const Header: React.FC<HeaderProps> = ({
    activeTabId,
    onTabChange,
}) => {
    const { language, setLanguage } = useLanguage(); // ✅ 여기서 꺼내씀

    return (
        <header className="header">
            <div className="container header-inner">
                <div className="logo">MySite</div>

                <nav className="nav-tabs">
                    {TABS.map((tab) => {
                        const label = NAV_LABELS[language][tab.id];
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                className={`tab ${activeTabId === tab.id ? "active" : ""}`}
                                onClick={() => onTabChange(tab.id)}
                            >
                                {label}
                            </button>
                        );
                    })}
                </nav>

                <div className="lang-switch">
                    {LANGUAGE_OPTIONS.map((opt) => (
                        <button
                            key={opt.id}
                            type="button"
                            className={
                                "lang-btn" + (language === opt.id ? " lang-btn-active" : "")
                            }
                            onClick={() => setLanguage(opt.id)}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>
        </header>
    );
};
