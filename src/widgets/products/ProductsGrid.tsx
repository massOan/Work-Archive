// src/widgets/products/ProductsGrid.tsx
import React, { useEffect, useMemo, useState } from "react";
import { messages } from "../../shared/config/i18n";
import { useLanguage } from "../../shared/context/LanguageContext";
import { fetchProjectsByLanguage, ProjectRow } from "../../shared/api/projects";
import {
    fetchProjectDetailSections,
    Section,
} from "../../shared/api/projectDetails";

const MIN_LOADING_MS = 300;
const SKELETON_COUNT = 6;
const PROJECTS_PER_ROW = 3;
const IXIO_PLAY_STORE_URL =
    "https://play.google.com/store/apps/details?hl=ko&id=com.lguplus.aicallagent";
const IXIO_ICON_URL =
    "https://play-lh.googleusercontent.com/nlN6kwftC2VzzWn3uWzeRjNAi340U2tNXXZgpEi35oMnwpdr3FBgz8hbA_oXytJ-yiQuKxZE1mh5gscMuBM78yQ=w240-h480-rw";
const MOBILE_MANAGER_PLAY_STORE_URL =
    "https://play.google.com/store/apps/details?id=lgt.call&hl=ko";
const MOBILE_MANAGER_ICON_URL =
    "https://play-lh.googleusercontent.com/O6JoUaG77wVlnbuS7KzViRkupjQbd1s6tQVQwHCr2YyanvWsAlEpycxV23_LiD5V5r_zYazUHxyKVbUp39CWVw=w240-h480-rw";
const SMART_HOME_PLAY_STORE_URL =
    "https://play.google.com/store/apps/details?id=com.lguplus.homeiot&hl=ko";
const getPublicAssetUrl = (path: string) => `${process.env.PUBLIC_URL ?? ""}${path}`;
const SMART_HOME_ICON_URL =
    "https://play-lh.googleusercontent.com/S7i4sPqLcZq3kD6ytc8P4nDWEtIuekCFQooF5LNJRITK6_J0ZRUoICr7XWcfhNgJ0RlisU7n07hQpzhgJONVRQ=s192-rw";
const FLUTTER_ICON_URL = getPublicAssetUrl("/assets/flutter-icon.png");

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

type ProjectAppCover = {
    app: "ixio" | "mobile-manager" | "smart-home" | "flutter" | "iptv" | "android-mentor";
    iconUrl?: string;
    iconAlt?: string;
    symbol?: string;
    platformLabel?: string;
    storeUrl?: string;
};

const IXIO_APP_COVER: ProjectAppCover = {
    app: "ixio",
    iconUrl: IXIO_ICON_URL,
    iconAlt: "ixi-O app icon",
    storeUrl: IXIO_PLAY_STORE_URL,
};

const MOBILE_MANAGER_APP_COVER: ProjectAppCover = {
    app: "mobile-manager",
    iconUrl: MOBILE_MANAGER_ICON_URL,
    iconAlt: "U+ mobile manager app icon",
    storeUrl: MOBILE_MANAGER_PLAY_STORE_URL,
};

const SMART_HOME_APP_COVER: ProjectAppCover = {
    app: "smart-home",
    iconUrl: SMART_HOME_ICON_URL,
    iconAlt: "U+ smart home app icon",
    storeUrl: SMART_HOME_PLAY_STORE_URL,
};

const FLUTTER_APP_COVER: ProjectAppCover = {
    app: "flutter",
    iconUrl: FLUTTER_ICON_URL,
    iconAlt: "Flutter app icon",
};

const IPTV_APP_COVER: ProjectAppCover = {
    app: "iptv",
    symbol: "📺",
    platformLabel: "IPTV",
};

const ANDROID_MENTOR_APP_COVER: ProjectAppCover = {
    app: "android-mentor",
    symbol: "📚",
    platformLabel: "Android",
};

const getProjectAppCover = (name: string): ProjectAppCover | null => {
    if (/flutter|플러터/i.test(name)) {
        return FLUTTER_APP_COVER;
    }

    if (/모바일\s*매니저|モバイルマネージャー|通話便利/i.test(name)) {
        return MOBILE_MANAGER_APP_COVER;
    }

    if (/스마트\s*홈|スマートホーム|smart\s*home|homeiot/i.test(name)) {
        return SMART_HOME_APP_COVER;
    }

    if (/iptv|속도\s*개선|속도개선/i.test(name)) {
        return IPTV_APP_COVER;
    }

    if (/android|インターンシップ|멘터|メンター|mentor/i.test(name)) {
        return ANDROID_MENTOR_APP_COVER;
    }

    if (/익시오|ixi|ixio/i.test(name)) {
        return IXIO_APP_COVER;
    }

    return null;
};

const getProjectTeamSize = (name: string): number | null => {
    if (/flutter|플러터/i.test(name)) {
        return 5;
    }

    if (/모바일\s*매니저|モバイルマネージャー|通話便利/i.test(name)) {
        return 8;
    }

    if (/스마트\s*홈|スマートホーム|smart\s*home|homeiot/i.test(name)) {
        return 6;
    }

    if (/iptv|속도\s*개선|속도개선/i.test(name)) {
        return 4;
    }

    if (/android|インターンシップ|멘터|メンター|mentor/i.test(name)) {
        return 3;
    }

    if (/익시오|ixi|ixio/i.test(name)) {
        return 13;
    }

    return null;
};

const ProjectBrandCover: React.FC<{ appCover: ProjectAppCover }> = ({ appCover }) => (
    <div
        className={`project-brand-cover project-brand-cover-${appCover.app}`}
        data-testid="project-brand-cover"
        data-app={appCover.app}
    >
        <div className="project-brand-glow" />
        <div className="project-brand-icon">
            {appCover.iconUrl && appCover.iconAlt ? (
                <img src={appCover.iconUrl} alt={appCover.iconAlt} />
            ) : (
                <span className="project-brand-symbol">{appCover.symbol}</span>
            )}
        </div>
        <span className="project-platform-badge">{appCover.platformLabel ?? "Mobile App"}</span>
        {appCover.storeUrl && (
            <a
                className="project-store-link"
                href={appCover.storeUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => event.stopPropagation()}
                onKeyDown={(event) => event.stopPropagation()}
            >
                <span className="project-play-icon" aria-hidden="true" />
                Play Store
            </a>
        )}
    </div>
);

const ProjectPreviewMock: React.FC = () => (
    <div className="project-cover-mock" aria-hidden="true">
        <div className="project-cover-window">
            <span />
            <span />
            <span />
        </div>
    </div>
);

export const ProductsGrid: React.FC = () => {
    const { language } = useLanguage();
    const t = messages[language].products;

    const [projects, setProjects] = useState<ProjectRow[]>([]);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [expandedProjectIds, setExpandedProjectIds] = useState<number[]>([]);
    const [detailLoadingById, setDetailLoadingById] = useState<Record<number, boolean>>({});
    const [detailErrorById, setDetailErrorById] = useState<Record<number, string | null>>({});
    const [detailSectionsById, setDetailSectionsById] = useState<Record<number, Section[]>>({});

    // 언어 바뀔 때마다 Supabase에서 프로젝트 로드
    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            const startedAt = Date.now();
            setLoading(true);
            setError(null);

            try {
                const data = await fetchProjectsByLanguage({ language });
                if (!cancelled) setProjects(data);
            } catch (e) {
                if (!cancelled) {
                    console.error(e);
                    setError(
                        language === "ko"
                            ? "프로젝트를 불러오는 중 오류가 발생했습니다."
                            : "プロジェクトの取得中にエラーが発生しました。"
                    );
                }
            } finally {
                const elapsed = Date.now() - startedAt;
                if (elapsed < MIN_LOADING_MS) await sleep(MIN_LOADING_MS - elapsed);
                if (!cancelled) setLoading(false);
            }
        };

        load();
        return () => {
            cancelled = true;
        };
    }, [language]);

    const filteredProjects = useMemo(() => {
        const lower = keyword.toLowerCase();
        if (!lower) return projects;

        return projects.filter((p) => {
            const target = `${p.name} ${p.period ?? ""} ${p.role ?? ""} ${p.description} ${(p.tags ?? []).join(" ")}`;
            return target.toLowerCase().includes(lower);
        });
    }, [projects, keyword]);

    const loadProjectDetails = async (project: ProjectRow) => {
        if (detailSectionsById[project.id] || detailLoadingById[project.id]) return;

        const startedAt = Date.now();
        setDetailLoadingById((prev) => ({ ...prev, [project.id]: true }));
        setDetailErrorById((prev) => ({ ...prev, [project.id]: null }));

        try {
            const sections = await fetchProjectDetailSections({
                projectId: project.id,
            });

            setDetailSectionsById((prev) => ({ ...prev, [project.id]: sections }));
        } catch (e) {
            console.error(e);
            setDetailErrorById((prev) => ({
                ...prev,
                [project.id]:
                    language === "ko"
                        ? "상세 정보를 불러오는 중 오류가 발생했습니다."
                        : "詳細情報の取得中にエラーが発生しました。",
            }));
        } finally {
            const elapsed = Date.now() - startedAt;
            if (elapsed < MIN_LOADING_MS) await sleep(MIN_LOADING_MS - elapsed);
            setDetailLoadingById((prev) => ({ ...prev, [project.id]: false }));
        }
    };

    const toggleProject = (project: ProjectRow) => {
        const projectIndex = filteredProjects.findIndex((item) => item.id === project.id);
        const rowStartIndex = Math.floor(projectIndex / PROJECTS_PER_ROW) * PROJECTS_PER_ROW;
        const rowProjects = filteredProjects.slice(
            rowStartIndex,
            rowStartIndex + PROJECTS_PER_ROW
        );
        const rowProjectIds = rowProjects.map((item) => item.id);
        const rowExpanded = rowProjectIds.every((projectId) => expandedProjectIds.includes(projectId));

        if (rowExpanded) {
            setExpandedProjectIds([]);
            return;
        }

        setExpandedProjectIds(rowProjectIds);
        void Promise.all(rowProjects.map((item) => loadProjectDetails(item)));
    };

    const showSkeleton = loading; // ✅ 언어 전환 시에도 스켈레톤으로 높이 고정

    return (
        <section className="section">
            <div className="container">
                <h2 className="section-title">{t.title}</h2>
                <p className="section-subtitle">{t.subtitle}</p>

                <div style={{ marginBottom: 16 }}>
                    <input
                        type="text"
                        placeholder={t.searchPlaceholder}
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        style={{
                            padding: "8px 12px",
                            borderRadius: 8,
                            border: "1px solid #d1d5db",
                            fontSize: 14,
                            width: "100%",
                            maxWidth: 320,
                        }}
                    />
                </div>

                {/* ✅ 상태 줄: 항상 자리 차지해서 들썩임 방지 */}
                <div className="status-row">
                    {error ? (
                        <p style={{ fontSize: 13, color: "#ef4444", margin: 0 }}>
                            {error}
                        </p>
                    ) : showSkeleton ? (
                        <div className="skeleton-line" style={{ width: 160 }} />
                    ) : (
                        <p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>
                            {language === "ko"
                                ? `검색 결과: ${filteredProjects.length}개`
                                : `検索結果: ${filteredProjects.length}件`}
                        </p>
                    )}
                </div>

                <div className="card-grid products-grid" aria-busy={showSkeleton}>
                    {showSkeleton
                        ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                            <article
                                key={`sk-${i}`}
                                className="card skeleton-card"
                                aria-hidden="true"
                            >
                                <div className="skeleton-line skeleton-title" />
                                <div className="skeleton-line skeleton-meta" />
                                <div className="skeleton-line skeleton-meta" style={{ width: "55%" }} />
                                <div className="skeleton-line skeleton-text" />
                                <div className="skeleton-line skeleton-text short" />
                                <div className="skeleton-pill-row">
                                    <span className="skeleton-pill" />
                                    <span className="skeleton-pill" />
                                    <span className="skeleton-pill" />
                                </div>
                            </article>
                        ))
                        : filteredProjects.map((p) => {
                            const isExpanded = expandedProjectIds.includes(p.id);
                            const detailSections = detailSectionsById[p.id] ?? [];
                            const detailLoading = detailLoadingById[p.id] ?? false;
                            const detailError = detailErrorById[p.id] ?? null;
                            const appCover = getProjectAppCover(p.name);
                            const teamSize = getProjectTeamSize(p.name);

                            return (
                            <article
                                key={p.id}
                                className={`card project-expand-card ${isExpanded ? "project-expand-card-open" : ""}`}
                                role="button"
                                tabIndex={0}
                                aria-expanded={isExpanded}
                                aria-label={p.name}
                                onClick={() => toggleProject(p)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        toggleProject(p);
                                    }
                                }}
                            >
                                {appCover ? (
                                    <ProjectBrandCover appCover={appCover} />
                                ) : (
                                    <ProjectPreviewMock />
                                )}
                                <div className="project-card-top">
                                    <h3>{p.name}</h3>
                                    <span
                                        className={`project-card-toggle ${isExpanded ? "open" : ""}`}
                                        aria-label={
                                            language === "ko"
                                                ? isExpanded ? "상세 닫기" : "상세 열기"
                                                : isExpanded ? "詳細を閉じる" : "詳細を開く"
                                        }
                                    >
                                        <span className="project-card-toggle-icon" aria-hidden="true" />
                                    </span>
                                </div>
                                <p className="project-card-desc">{p.description}</p>

                                <div className="pill-row">
                                    {(p.tags ?? []).map((tag) => (
                                        <span key={tag} className="pill">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {isExpanded && (
                                    <div className="project-inline-detail">
                                        <div className="project-inline-meta">
                                            {p.period && (
                                                <div className="project-inline-meta-item">
                                                    <span>{language === "ko" ? "기간" : "期間"}</span>
                                                    <strong>{p.period}</strong>
                                                </div>
                                            )}
                                            {teamSize && (
                                                <div className="project-inline-meta-item">
                                                    <span>{language === "ko" ? "팀 규모" : "チーム規模"}</span>
                                                    <strong>
                                                        {language === "ko"
                                                            ? `Android 개발자 ${teamSize}명`
                                                            : `Android開発者 ${teamSize}名`}
                                                    </strong>
                                                </div>
                                            )}
                                        </div>

                                        {detailLoading ? (
                                            <div className="project-inline-loading">
                                                <div className="skeleton-line skeleton-text" />
                                                <div className="skeleton-line skeleton-text short" />
                                            </div>
                                        ) : detailError ? (
                                            <p className="project-inline-error">{detailError}</p>
                                        ) : (
                                            <div className="project-inline-sections">
                                                {detailSections.map((section) => (
                                                    <section key={section.key} className="project-inline-section">
                                                        <h4>{section.title}</h4>
                                                        <ul>
                                                            {section.items.map((item, idx) => (
                                                                <li key={`${section.key}-${idx}`}>
                                                                    <span>{item.text}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </section>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </article>
                            );
                        })}
                </div>
            </div>
        </section>
    );
};
