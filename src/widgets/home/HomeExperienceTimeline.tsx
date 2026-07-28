// src/widgets/home/HomeExperienceTimeline.tsx
import React from "react";
import { Language } from "../../shared/config/i18n";
import { useLanguage } from "../../shared/context/LanguageContext";

type TimelineItem = {
    company: string;
    period: string;
    points: string[];
};

const TIMELINE_ITEMS: Record<Language, TimelineItem[]> = {
    ko: [
        {
            company: "Ciel Zero",
            period: "2026.07 ~ 현재",
            points: [
                "Android 엔지니어로 입사해 모바일 앱 개발 프로젝트 참여를 준비",
                "Android 앱 개발 경험을 바탕으로 참여 프로젝트 조율 진행",
            ],
        },
        {
            company: "파인원커뮤니케이션즈",
            period: "2022.11 ~ 2025.07",
            points: [
                "LG U+ 공식 Android 앱 개발에서 요구사항 검토부터 설계·구현·테스트·운영까지 담당",
                "익시오 초기 개발에서 Compose·MVI 기반 기능을 구현하고 Galaxy S25 프리인스톨 일정 대응",
                "기존 Java 기반 스팸 통화 기능을 Kotlin으로 이전·통합해 모바일 매니저 기능 고도화",
                "Flutter·Riverpod 기반 PoC로 상태 관리 구조와 확장 가능한 모듈 설계를 검증해 영업용 데모 앱으로 확장",
                "IPTV 앱 화면 전환 시간을 6,000ms에서 3,000ms로 약 50% 단축",
                "스마트홈 앱 가로 화면·4화면 멀티뷰 구현으로 CCTV 시청·조작 UX 개선",
            ],
        },
    ],
    ja: [
        {
            company: "株式会社Ciel Zero",
            period: "2026年7月〜現在",
            points: [
                "Androidエンジニアとして入社し、モバイルアプリ開発案件への参画を準備",
                "Androidアプリ開発の経験を活かし、参画プロジェクトの調整を進行",
            ],
        },
        {
            company: "株式会社ファインワンコミュニケーションズ",
            period: "2022年11月〜2025年7月",
            points: [
                "LG U+向け公式Androidアプリ開発で、要件レビューから設計・実装・試験・保守まで担当",
                "ixi-O初期開発でCompose・MVI基盤機能を実装し、Galaxy S25プリインストール期限に対応",
                "既存Java製の迷惑電話機能をKotlinへ移植・統合し、モバイルマネージャー機能を高度化",
                "Flutter・RiverpodベースのPoCで、状態管理構造と拡張可能なモジュール設計を検証し、営業用デモアプリへ展開",
                "IPTVアプリの画面遷移時間を6,000msから3,000msへ約50%短縮",
                "スマートホームアプリの横画面対応・4画面マルチビュー実装で、CCTV視聴・操作UXを改善",
            ],
        },
    ],
};

export const HomeExperienceTimeline: React.FC = () => {
    const { language } = useLanguage();
    const items = TIMELINE_ITEMS[language];

    return (
        <section className="section experience-section">
            <div className="container">
                <div className="section-heading">
                    <h2 className="section-title">
                        {language === "ko" ? "경력" : "職務経歴"}
                    </h2>
                    <p className="section-subtitle">
                        {language === "ko"
                            ? "최근 경력과 프로젝트에서 맡았던 역할을 시간 순서로 정리하는 영역입니다."
                            : "これまでの職務経験とプロジェクトでの主な取り組みを時系列でまとめています。"}
                    </p>
                </div>

                <div className="experience-timeline">
                    {items.map((item, index) => (
                        <article key={`${item.company}-${index}`} className="experience-item">
                            <div className="experience-card">
                                <div className="experience-card-head">
                                    <h3>{item.company}</h3>
                                    <span className="experience-period">{item.period}</span>
                                </div>
                                <ul className="experience-points">
                                    {item.points.map((point) => (
                                        <li key={point}>{point}</li>
                                    ))}
                                </ul>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};
