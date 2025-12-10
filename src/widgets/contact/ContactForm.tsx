// src/widgets/contact/ContactForm.tsx
import React, { useState } from "react";
import { messages } from "../../shared/config/i18n";
import { useLanguage } from "../../shared/context/LanguageContext";

export const ContactForm: React.FC = () => {
    // ✅ 전역 언어 상태 가져오기 (Context + 커스텀 훅)
    const { language } = useLanguage();
    const t = messages[language].contact;

    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (language === "ko") {
            alert(
                `문의가 전송된 것처럼 처리합니다 🙂\n\nFrom: ${name}\n\n${message}`
            );
        } else {
            alert(
                `お問い合わせが送信された体で処理します 🙂\n\nFrom: ${name}\n\n${message}`
            );
        }

        setName("");
        setMessage("");
    };

    return (
        <section className="section section-muted">
            <div className="container">
                <h2 className="section-title">{t.title}</h2>
                <p className="section-subtitle">{t.subtitle}</p>

                <form className="contact-form" onSubmit={handleSubmit}>
                    <label className="contact-field">
                        <span>{t.nameLabel}</span>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={t.namePlaceholder}
                            required
                        />
                    </label>

                    <label className="contact-field">
                        <span>{t.messageLabel}</span>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder={t.messagePlaceholder}
                            rows={5}
                            required
                        />
                    </label>

                    <button type="submit" className="btn-primary contact-submit">
                        {t.submitLabel}
                    </button>
                </form>
            </div>
        </section>
    );
};
