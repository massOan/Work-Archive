// src/widgets/blog/BlogList.tsx
import React from "react";
import { POSTS, Post } from "./posts";
import { messages } from "../../shared/config/i18n";
import { useLanguage } from "../../shared/context/LanguageContext";

export const BlogList: React.FC = () => {
    const { language } = useLanguage();
    const t = messages[language].blog;

    const postsForCurrentLang = POSTS[language];

    return (
        <section className="section">
            <div className="container">
                {/* 타이틀/서브타이틀 다국어 */}
                <h2 className="section-title">{t.title}</h2>
                <p className="section-subtitle">{t.subtitle}</p>

                <div className="blog-list">
                    {postsForCurrentLang.map((post: Post) => (
                        <article key={post.id} className="blog-item">
                            <h3>{post.title}</h3>
                            <p className="blog-date">{post.date}</p>
                            <p className="blog-summary">{post.summary}</p>
                            <button className="btn-ghost blog-read-more">{t.readMore}</button>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};
