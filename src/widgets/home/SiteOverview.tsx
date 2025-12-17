import React, { useMemo, useState } from "react";
import { useLanguage } from "../../shared/context/LanguageContext";
import type { Language } from "../../shared/config/i18n";

type Badge = { label: string };
type Item = { title: string; desc: string };
type RoadmapItem = { text: string; done?: boolean };
type UpdateItem = { date: string; text: string };

type Block = {
    title: string;
    subtitle: string;
    intro: string;
    badges: Badge[];
    highlights: Item[];
    roadmap: RoadmapItem[];
    updates: UpdateItem[];
    archTitle: string;
    archDesc: string;
    archText: string;
    dataTitle: string;
    dataDesc: string;
    dataText: string;
    deployTitle: string;
    deployDesc: string;
    deployText: string;
};

const CONTENT: Record<Language, Block> = {
    ko: {
        title: "이 웹사이트는 뭐하는 사이트인가?",
        subtitle: "React 연습 겸, 제가 했던 프로젝트를 보기 좋게 정리해두는 사이트입니다.",
        intro: "이력 데이터는 Supabase(PostgreSQL) RDBMS에 저장해두고 필요한 화면에서 조회해서 연동했으며, 로딩/에러/스켈레톤 같은 기본 UX도 같이 실험해봤습니다.",
        badges: [
            { label: "React" },
            { label: "TypeScript" },
            { label: "Context i18n" },
            { label: "Supabase(Postgres)" },
            { label: "GH Pages Deploy" },
            { label: "Skeleton UI" },
            { label: "Modal + Section Nav" },
        ],
        highlights: [
            {
                title: "다국어 구조",
                desc: "language를 props로 주입하지 않고 Context + 커스텀 훅으로 전역 제어.",
            },
            {
                title: "데이터 로딩 UX",
                desc: "언어 전환/재조회 시 UI 들썩임을 줄이기 위해 스켈레톤 + 최소 로딩 시간을 적용.",
            },
            {
                title: "프로젝트 상세 탐색",
                desc: "모달 내부에 섹션 고정 네비 + 스크롤 콘텐츠로 긴 업무 목록을 읽기 쉽게 구성.",
            },
            {
                title: "실전 예외 처리",
                desc: "API 실패/빈 데이터/로딩 상태를 분리해서 사용자에게 예측 가능한 UI 제공.",
            },
        ],
        roadmap: [
            { text: "강점/제공가치 탭을 ‘Case Study’ 형식으로 강화", done: false },
            { text: "연락하기 폼: 실제 전송(메일/웹훅) 연동", done: false },
            { text: "접근성: 키보드 포커스/aria 개선", done: false },
            { text: "이미지 없는 깔끔한 레이아웃 확정", done: true },
        ],
        updates: [
            { date: "2025-12", text: "Supabase로 프로젝트/상세 섹션 데이터 분리 저장 및 연동" },
            { date: "2025-12", text: "프로젝트 상세 모달: 좌측 섹션 네비 + 우측 스크롤 레이아웃 적용" },
            { date: "2025-12", text: "로딩 들썩임 방지: 스켈레톤 카드 + 상태 줄 고정" },
        ],
        archTitle: "아키텍처",
        archDesc: "컴포넌트/데이터/공용 유틸 분리(확장 가능한 구조)",
        archText: `src/
  app/                (App shell)
  pages/              (탭별 페이지)
  widgets/            (화면 구성 단위)
  shared/
    api/              (supabase fetch)
    config/           (navigation, i18n)
    context/          (LanguageContext)
    ui/               (CommonModal, 공용 UI)
    styles/           (global css)`,
        dataTitle: "데이터 흐름",
        dataDesc: "목록/상세를 분리 로드해서 초기 로딩을 가볍게",
        dataText: `ProjectsGrid
  -> fetchProjectsByLanguage(language)
  -> 카드 클릭
  -> fetchProjectDetailSections(projectId)
  -> Modal에서 섹션 네비 + 항목 렌더`,
        deployTitle: "배포",
        deployDesc: "GitHub Pages 기반 정적 배포 + Supabase API 호출",
        deployText: `npm run build
npx gh-pages -d build

※ Supabase 키/URL은 .env로 관리(빌드 시점에 주입)`,
    },

    ja: {
        title: "このサイトは何をするサイト？",
        subtitle: "React の練習として、自分のプロジェクトを整理して見やすくまとめたサイトです。",
        intro:
            "データは Supabase（PostgreSQL）のRDBMSに保存して連携し、ローディング／エラー／スケルトン表示などの基本UXも試しています。",
        badges: [
            { label: "React" },
            { label: "TypeScript" },
            { label: "Context i18n" },
            { label: "Supabase(Postgres)" },
            { label: "GH Pages Deploy" },
            { label: "Skeleton UI" },
            { label: "Modal + Section Nav" },
        ],
        highlights: [
            {
                title: "多言語設計",
                desc: "props で言語を渡さず、Context + カスタムフックで全体制御。",
            },
            {
                title: "ロード UX",
                desc: "言語切替/再取得時のガタつきを抑えるため、スケルトン + 最小ローディング時間を適用。",
            },
            {
                title: "詳細の可読性",
                desc: "モーダル内で左固定ナビ + 右スクロールにして長い業務内容を読みやすく整理。",
            },
            {
                title: "例外処理",
                desc: "API失敗/空データ/ローディングを分離し、予測可能なUIを提供。",
            },
        ],
        roadmap: [
            { text: "強み/提供価値タブを Case Study 形式で強化", done: false },
            { text: "お問い合わせ：実送信（メール/Webhook）連携", done: false },
            { text: "アクセシビリティ：フォーカス/aria 改善", done: false },
            { text: "画像なしのシンプルなレイアウト確定", done: true },
        ],
        updates: [
            { date: "2025-12", text: "Supabase で 프로젝트詳細(セクション/項目)を分離保存し連携" },
            { date: "2025-12", text: "詳細モーダル：左セクションナビ + 右スクロール構成" },
            { date: "2025-12", text: "ガタつき対策：スケルトンカード + ステータス行固定" },
        ],
        archTitle: "アーキテクチャ",
        archDesc: "コンポーネント/データ/共通UIを分離して拡張しやすく",
        archText: `src/
  app/
  pages/
  widgets/
  shared/
    api/
    config/
    context/
    ui/
    styles/`,
        dataTitle: "データフロー",
        dataDesc: "一覧/詳細を分けてロードして初期表示を軽く",
        dataText: `ProjectsGrid
  -> fetchProjectsByLanguage(language)
  -> カードクリック
  -> fetchProjectDetailSections(projectId)
  -> Modal でセクション表示`,
        deployTitle: "デプロイ",
        deployDesc: "GitHub Pages の静的配信 + Supabase API 呼び出し",
        deployText: `npm run build
npx gh-pages -d build

※ Supabase の URL/KEY は .env で管理（ビルド時注入）`,
    },
};

const Accordion: React.FC<{
    title: string;
    desc?: string;
    children: React.ReactNode;
}> = ({ title, desc, children }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="acc">
            <button type="button" className="acc-head" onClick={() => setOpen((p) => !p)}>
                <div className="acc-head-left">
                    <div className="acc-title">{title}</div>
                    {desc && <div className="acc-desc">{desc}</div>}
                </div>
                <span className={`acc-icon ${open ? "open" : ""}`}>▾</span>
            </button>

            {open && <div className="acc-body">{children}</div>}
        </div>
    );
};

export const SiteOverview: React.FC = () => {
    const { language } = useLanguage();
    const c = useMemo(() => CONTENT[language], [language]);

    return (
        <section className="section">
            <div className="container">
                <div className="site-overview-head">
                    <h2 className="section-title">{c.title}</h2>
                    <p className="section-subtitle">{c.subtitle}</p>
                    <p className="site-overview-intro">{c.intro}</p>

                    <div className="badge-row">
                        {c.badges.map((b) => (
                            <span key={b.label} className="badge">
                                {b.label}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="site-overview-grid">
                    {/* 왼쪽: 하이라이트 + 로드맵 */}
                    <div className="site-col">
                        <div className="panel">
                            <div className="panel-title">{language === "ko" ? "핵심 구현" : "Key Implementations"}</div>
                            <div className="panel-list">
                                {c.highlights.map((it) => (
                                    <div key={it.title} className="panel-item">
                                        <div className="panel-item-title">{it.title}</div>
                                        <div className="panel-item-desc">{it.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="panel">
                            <div className="panel-title">{language === "ko" ? "로드맵" : "Roadmap"}</div>
                            <ul className="roadmap">
                                {c.roadmap.map((r, idx) => (
                                    <li key={idx} className={`roadmap-item ${r.done ? "done" : ""}`}>
                                        <span className="roadmap-check">{r.done ? "✓" : "•"}</span>
                                        <span>{r.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* 오른쪽: 아코디언 + 업데이트 */}
                    <div className="site-col">
                        <Accordion title={c.archTitle} desc={c.archDesc}>
                            <pre className="mono">{c.archText}</pre>
                        </Accordion>

                        <Accordion title={c.dataTitle} desc={c.dataDesc}>
                            <pre className="mono">{c.dataText}</pre>
                        </Accordion>

                        <Accordion title={c.deployTitle} desc={c.deployDesc}>
                            <pre className="mono">{c.deployText}</pre>
                        </Accordion>

                        <div className="panel">
                            <div className="panel-title">{language === "ko" ? "최근 업데이트" : "Recent Updates"}</div>
                            <div className="updates">
                                {c.updates.map((u, idx) => (
                                    <div key={idx} className="update-item">
                                        <div className="update-date">{u.date}</div>
                                        <div className="update-text">{u.text}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="site-cta">
                    <div className="site-cta-text">
                        {language === "ko"
                            ? "프로젝트 결과는 Products 탭에서 상세 모달로 확인할 수 있어요."
                            : "プロジェクト詳細は Products タブのモーダルで確認できます。"}
                    </div>
                    <div className="site-cta-sub">
                        {language === "ko"
                            ? "홈은 ‘이 사이트를 어떻게 만들었는지’를 보여주는 공간으로 유지하는 걸 추천."
                            : "Home は「このサイトをどう作ったか」を見せる場所として維持するのがおすすめ。"}
                    </div>
                </div>
            </div>
        </section>
    );
};
