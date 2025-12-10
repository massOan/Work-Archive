// src/widgets/home/HomeFeatures.tsx
import React from "react";
import { messages } from "../../shared/config/i18n";
import { useLanguage } from "../../shared/context/LanguageContext";

const FEATURES = [
  {
    title: "Clean Header",
    description: "로고 + 탭 + 로그인 버튼으로 구성된 심플한 헤더.",
  },
  {
    title: "Hero Section",
    description: "타이틀과 버튼으로 주요 액션을 유도하는 영역.",
  },
  {
    title: "Content Cards",
    description: "서비스/기능을 카드 형태로 보기 좋게 정리.",
  },
];

export const HomeFeatures: React.FC = () => {
  const { language } = useLanguage();
  const t = messages[language].home;

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">{t.featuresTitle}</h2>
        <p className="section-subtitle">{t.featuresSubtitle}</p>
        <div className="card-grid">
          {FEATURES.map((feature) => (
            <article key={feature.title} className="card">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
