// src/widgets/products/ProjectDetailModal.tsx
import React, { useMemo, useRef } from "react";
import { CommonModal } from "../../shared/ui/CommonModal";
import { useLanguage } from "../../shared/context/LanguageContext";
import type { ProjectRow } from "../../shared/api/projects";
import type { Section } from "../../shared/api/projectDetails";

type ProjectDetailModalProps = {
    open: boolean;
    project: ProjectRow | null;
    onClose: () => void;

    sections?: Section[];
    highlights?: string[];

    loading?: boolean;
    error?: string | null;
};

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
    open,
    project,
    onClose,
    sections = [],
    highlights = [],
    loading = false,
    error = null,
}) => {
    const { language } = useLanguage();
    const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

    const footer = (
        <button type="button" >
        </button>
    );

    const safeSections = useMemo(() => sections ?? [], [sections]);

    if (!project) return null;

    const jumpTo = (key: string) => {
        const el = sectionRefs.current[key];
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <CommonModal
            open={open}
            onClose={onClose}
            title={project.name}
            description={project.period ?? ""}
            size="lg"
            footer={footer}
        >
            {project.role && <p className="detail-role">{project.role}</p>}
            <p className="detail-desc">{project.description}</p>

            {highlights.length > 0 && (
                <div className="detail-highlights">
                    {highlights.map((h) => (
                        <span key={h} className="detail-highlight-pill">
                            {h}
                        </span>
                    ))}
                </div>
            )}

            <div className="detail-layout">
                <aside className="detail-aside">
                    <div className="detail-aside-title">
                        {language === "ko" ? "섹션" : "セクション"}
                    </div>

                    <nav className="detail-nav">
                        {safeSections.map((s) => (
                            <button
                                key={s.key}
                                type="button"
                                className="detail-nav-item"
                                onClick={() => jumpTo(s.key)}
                            >
                                <span className="detail-nav-name">{s.title}</span>
                                <span className="detail-nav-count">{s.items.length}</span>
                            </button>
                        ))}
                    </nav>
                </aside>

                <section className="detail-content">
                    {loading && (
                        <p style={{ fontSize: 13, color: "#6b7280" }}>
                            {language === "ko" ? "불러오는 중..." : "読み込み中..."}
                        </p>
                    )}

                    {error && (
                        <p style={{ fontSize: 13, color: "#ef4444" }}>{error}</p>
                    )}

                    {!loading && !error && safeSections.length === 0 && (
                        <p style={{ fontSize: 13, color: "#6b7280" }}>
                            {language === "ko"
                                ? "상세 데이터가 아직 없습니다."
                                : "詳細データがまだありません。"}
                        </p>
                    )}

                    {safeSections.map((s) => (
                        <div
                            key={s.key}
                            className="detail-section"
                            ref={(el) => {
                                sectionRefs.current[s.key] = el;
                            }}
                        >
                            <h4 className="detail-section-title">{s.title}</h4>

                            <ul className="detail-list">
                                {s.items.map((it, idx) => (
                                    <li key={`${s.key}-${idx}`} className="detail-item">
                                        <div className="detail-item-main">{it.text}</div>

                                        {!!it.tags?.length && (
                                            <div className="detail-item-tags">
                                                {it.tags.map((tag) => (
                                                    <span key={tag} className="detail-tag">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
            </div>
        </CommonModal>
    );
};
