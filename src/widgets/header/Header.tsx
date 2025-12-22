// src/widgets/header/Header.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import { TABS } from "../../shared/config/navigation";
import { LANGUAGE_OPTIONS, Language } from "../../shared/config/i18n";
import { useLanguage } from "../../shared/context/LanguageContext";
import type { TabId } from "../../shared/config/navigation";

export const NAV_LABELS: Record<Language, Record<TabId, string>> = {
    ko: {
        home: "홈 / 소개",
        products: "프로젝트",
        now: "사용할 수 있는 스킬",
        blog: "노트 / 블로그",
        contact: "연락처",
    },
    ja: {
        home: "ホーム / プロフィール",
        products: "プロジェクト",
        now: "スキル",
        blog: "ノート / ブログ",
        contact: "お問い合わせ",
    },
};

export const Header: React.FC = () => {
    const { language, setLanguage } = useLanguage();

    return (
        <header className="header">
            <div className="container header-inner">
                <div className="logo">
                    <div className="logo-main">ikjun.dev</div>
                    <div className="logo-sub">Android × Web Engineer</div>
                </div>

                <nav className="nav-tabs">
                    {TABS.map((tab) => {
                        const label = NAV_LABELS[language][tab.id];
                        return (
                            <NavLink
                                key={tab.id}
                                to={tab.path}
                                className={({ isActive }) =>
                                    `tab ${isActive ? "active" : ""}`
                                }
                            >
                                {label}
                            </NavLink>
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
