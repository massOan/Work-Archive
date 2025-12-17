// src/pages/ContactPage.tsx
import React, { useMemo, useState } from "react";
import { useLanguage } from "../shared/context/LanguageContext";
import { messages } from "../shared/config/i18n";

type ContactLink = {
    key: string;
    titleKo: string;
    titleJa: string;
    value: string; // 표시용
    href: string;  // 이동용
    hintKo?: string;
    hintJa?: string;
    icon: "mail" | "github" | "link" | "file";
};

const CONTACTS: ContactLink[] = [
    {
        key: "email",
        titleKo: "이메일",
        titleJa: "メール",
        value: "jang.ikjun1998@gmail.com",
        href: "mailto:jang.ikjun1998@gmail.com",
        hintKo: "가장 빠르게 확인해요",
        hintJa: "最も早く確認します",
        icon: "mail",
    },
    {
        key: "github",
        titleKo: "GitHub",
        titleJa: "GitHub",
        value: "github.com/massOan",
        href: "https://github.com/massOan",
        hintKo: "프로젝트/커밋 확인",
        hintJa: "プロジェクト/コミット確認",
        icon: "github",
    },
    {
        key: "portfolio",
        titleKo: "포트폴리오",
        titleJa: "ポートフォリオ",
        value: "ikjun.dev",
        href: "https://ikjun.dev",
        hintKo: "프로젝트 상세 보기",
        hintJa: "プロジェクト詳細を見る",
        icon: "link",
    },
    {
        key: "resume",
        titleKo: "이력서/경력기술서",
        titleJa: "履歴書/職務経歴書",
        value: "요청 시 공유",
        href: "mailto:jang.ikjun1998@gmail.com?subject=Resume%20Request",
        hintKo: "메일로 요청해 주세요",
        hintJa: "メールでご依頼ください",
        icon: "file",
    },
];

function Icon({ name }: { name: ContactLink["icon"] }) {
    // SVG는 취향이지만 “아이콘 컴포넌트”로 분리하면 페이지 퀄리티가 올라감
    switch (name) {
        case "mail":
            return (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M4 6h16v12H4V6Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                    />
                    <path
                        d="m4 7 8 6 8-6"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                    />
                </svg>
            );
        case "github":
            return (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M12 2C6.48 2 2 6.6 2 12.27c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.48v-1.7c-2.78.62-3.37-1.1-3.37-1.1-.46-1.2-1.12-1.52-1.12-1.52-.92-.65.07-.64.07-.64 1.02.07 1.56 1.08 1.56 1.08.9 1.6 2.36 1.14 2.94.87.1-.67.36-1.14.65-1.4-2.22-.26-4.56-1.16-4.56-5.14 0-1.14.39-2.08 1.03-2.81-.1-.26-.45-1.32.1-2.75 0 0 .84-.28 2.75 1.07A9.2 9.2 0 0 1 12 6.6c.83 0 1.67.12 2.45.36 1.91-1.35 2.75-1.07 2.75-1.07.55 1.43.2 2.5.1 2.75.64.73 1.03 1.67 1.03 2.81 0 3.99-2.34 4.87-4.57 5.13.37.32.7.95.7 1.92v2.84c0 .26.18.59.69.49A10.1 10.1 0 0 0 22 12.27C22 6.6 17.52 2 12 2Z"
                        fill="currentColor"
                    />
                </svg>
            );
        case "file":
            return (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M7 3h7l3 3v15H7V3Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M14 3v4h4"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                    />
                </svg>
            );
        default:
            return (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M10 13a5 5 0 0 1 0-7l1-1a5 5 0 0 1 7 7l-1 1"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                    />
                    <path
                        d="M14 11a5 5 0 0 1 0 7l-1 1a5 5 0 0 1-7-7l1-1"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                    />
                </svg>
            );
    }
}

export const ContactPage: React.FC = () => {
    const { language } = useLanguage();
    const t = (messages as any)[language]?.contact ?? null; // 기존 i18n 구조에 없을 수도 있으니 fallback
    const isKo = language === "ko";

    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [toast, setToast] = useState<string | null>(null);

    const title = t?.title ?? (isKo ? "연락처" : "連絡先");
    const subtitle =
        t?.subtitle ??
        (isKo
            ? "간단히 남겨주시면 메일로 빠르게 답변드릴게요."
            : "簡単にご連絡いただければ、メールで早めに返信します。");

    const mailtoHref = useMemo(() => {
        const to = "jang.ikjun1998@gmail.com";
        const s = subject?.trim() || (isKo ? "연락드립니다" : "ご連絡");
        const lines = [
            isKo ? `이름: ${name}` : `お名前: ${name}`,
            isKo ? `회사/팀: ${company}` : `会社/チーム: ${company}`,
            "",
            body,
        ]
            .filter(Boolean)
            .join("\n");

        const params = new URLSearchParams({
            subject: s,
            body: lines,
        });

        return `mailto:${to}?${params.toString()}`;
    }, [name, company, subject, body, isKo]);

    const copy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setToast(isKo ? "복사됨 ✅" : "コピーしました ✅");
            window.setTimeout(() => setToast(null), 1200);
        } catch {
            setToast(isKo ? "복사 실패 🥲" : "コピー失敗 🥲");
            window.setTimeout(() => setToast(null), 1200);
        }
    };

    return (
        <section className="section">
            <div className="container">
                <div className="contact-hero">
                    <div>
                        <h2 className="section-title">{title}</h2>
                        <p className="section-subtitle">{subtitle}</p>
                    </div>

                    {toast && <div className="contact-toast">{toast}</div>}
                </div>

                <div className="contact-layout">
                    {/* LEFT: 연락 수단 */}
                    <aside className="contact-left">
                        <div className="contact-card">
                            <div className="contact-card-header">
                                <div className="contact-card-title">
                                    {isKo ? "빠른 연락" : "クイック連絡"}
                                </div>
                                <div className="contact-card-sub">
                                    {isKo ? "원하는 채널로 편하게" : "お好きな方法でどうぞ"}
                                </div>
                            </div>

                            <div className="contact-links">
                                {CONTACTS.map((c) => (
                                    <div key={c.key} className="contact-link-row">
                                        <a
                                            className="contact-link"
                                            href={c.href}
                                            target={c.href.startsWith("http") ? "_blank" : undefined}
                                            rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                                        >
                                            <span className="contact-icon">
                                                <Icon name={c.icon} />
                                            </span>
                                            <span className="contact-link-main">
                                                <span className="contact-link-title">
                                                    {isKo ? c.titleKo : c.titleJa}
                                                </span>
                                                <span className="contact-link-value">{c.value}</span>
                                                <span className="contact-link-hint">
                                                    {isKo ? c.hintKo : c.hintJa}
                                                </span>
                                            </span>
                                        </a>

                                        <button
                                            type="button"
                                            className="contact-copy"
                                            onClick={() =>
                                                copy(c.key === "email" ? "jang.ikjun1998@gmail.com" : c.value)
                                            }
                                            aria-label="copy"
                                        >
                                            {isKo ? "복사" : "コピー"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </aside>

                    {/* RIGHT: 간단 폼 */}
                    <div className="contact-right">
                        <div className="card contact-form-card">
                            <div className="contact-form-header">
                                <h3 style={{ margin: 0 }}>
                                    {isKo ? "메시지 남기기" : "メッセージ"}
                                </h3>
                                <p className="contact-form-desc">
                                    {isKo
                                        ? "폼을 채우면 메일 앱으로 연결됩니다."
                                        : "入力後、メールアプリが開きます。"}
                                </p>
                            </div>

                            <div className="contact-form-grid">
                                <label className="contact-field">
                                    <span className="contact-label">{isKo ? "이름" : "お名前"}</span>
                                    <input
                                        className="contact-input"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder={isKo ? "홍길동" : "山田 太郎"}
                                    />
                                </label>

                                <label className="contact-field">
                                    <span className="contact-label">
                                        {isKo ? "회사/팀" : "会社/チーム"}
                                    </span>
                                    <input
                                        className="contact-input"
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                        placeholder={isKo ? "OO회사 / 채용팀" : "〇〇社 / 採用"}
                                    />
                                </label>

                                <label className="contact-field contact-field-full">
                                    <span className="contact-label">
                                        {isKo ? "제목" : "件名"}
                                    </span>
                                    <input
                                        className="contact-input"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        placeholder={
                                            isKo ? "면접/협업 관련 문의" : "面接/協業に関する問い合わせ"
                                        }
                                    />
                                </label>

                                <label className="contact-field contact-field-full">
                                    <span className="contact-label">
                                        {isKo ? "내용" : "本文"}
                                    </span>
                                    <textarea
                                        className="contact-textarea"
                                        value={body}
                                        onChange={(e) => setBody(e.target.value)}
                                        placeholder={
                                            isKo
                                                ? "문의 내용을 간단히 적어주세요."
                                                : "お問い合わせ内容を簡単にご記入ください。"
                                        }
                                    />
                                </label>
                            </div>

                            <div className="contact-actions">
                                <a className="btn-primary" href={mailtoHref}>
                                    {isKo ? "메일로 보내기" : "メールで送る"}
                                </a>
                                <button
                                    type="button"
                                    className="btn-ghost"
                                    onClick={() => {
                                        setName("");
                                        setCompany("");
                                        setSubject("");
                                        setBody("");
                                        setToast(isKo ? "초기화 ✅" : "リセット ✅");
                                        window.setTimeout(() => setToast(null), 1200);
                                    }}
                                >
                                    {isKo ? "초기화" : "リセット"}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};
