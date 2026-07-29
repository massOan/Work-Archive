// src/widgets/home/HomeFeatures.tsx
import React from "react";
import { Language } from "../../shared/config/i18n";
import { useLanguage } from "../../shared/context/LanguageContext";

type Feature = {
  title: string;
  description: string;
  meta: string;
};

const FEATURES: Record<Language, Feature[]> = {
  ko: [
    {
      title: "통신 영역 Android 실무 경험",
      meta: "Android · Kotlin · Java",
      description:
        "LG U+ 프로젝트를 중심으로 Android 앱 개발을 약 3년간 담당하며, 부가서비스 플로우 설계와 화면 구현을 경험했습니다.",
    },
    {
      title: "UI/UX 및 성능 개선",
      meta: "UX Flow · Performance",
      description:
        "화면 전환 시간 단축, 리스트 스크롤 성능 개선 등 수치 기반으로 문제를 정의하고 개선한 경험이 있습니다.",
    },
    {
      title: "Web 프론트엔드로의 확장",
      meta: "React · TypeScript",
      description:
        "React + TypeScript로 포트폴리오 사이트를 직접 설계·구현하며, Android에서 Web으로 스킬을 확장하고 있습니다.",
    },
  ],
  ja: [
    {
      title: "通信領域でのAndroid実務経験",
      meta: "Android · Kotlin · Java",
      description:
        "LG U+ 向けプロジェクトを中心に、約3年間Androidアプリ開発を担当し、付加サービスフローの設計・画面実装を行ってきました。",
    },
    {
      title: "UI/UX とパフォーマンス改善",
      meta: "UX Flow · Performance",
      description:
        "画面遷移時間の短縮やリスト表示のスクロール性能改善など、数値にもとづいて課題を定義し改善した経験があります。",
    },
    {
      title: "Webフロントエンドへの拡張",
      meta: "React · TypeScript",
      description:
        "React + TypeScript で本ポートフォリオサイトを設計・実装し、Androidで培った知見をWebフロロントにも広げています。",
    },
  ],
};

export const HomeFeatures: React.FC = () => {
  const { language } = useLanguage();
  const features = FEATURES[language];

  return (
    <section className="section portfolio-section">
      <div className="container">
        <div className="section-heading centered-section-heading">
          <h2 className="section-title">
            {language === "ko" ? "핵심 역량" : "Core Strengths"}
          </h2>
          <p className="section-subtitle">
            {language === "ko"
              ? "현장에서 반복적으로 다뤄온 개발 영역을 포트폴리오 카드 형태로 정리했습니다."
              : "A portfolio-style summary of the areas I have repeatedly handled in production."}
          </p>
        </div>

        <div className="portfolio-card-grid">
          {features.map((feature, index) => (
            <article key={feature.title} className="card portfolio-skill-card">
              <div className="skill-mark" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3>{feature.title}</h3>
              <div className="skill-meta">{feature.meta}</div>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
