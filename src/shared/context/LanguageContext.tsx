// src/shared/context/LanguageContext.tsx
import React, { createContext, useContext, useState } from "react";
import { Language } from "../config/i18n";

type LanguageContextValue = {
    language: Language;
    setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
    undefined
);

type LanguageProviderProps = {
    children: React.ReactNode;
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
    children,
}) => {
    const [language, setLanguage] = useState<Language>("ja"); // 기본값: 일본어

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextValue => {
    const ctx = useContext(LanguageContext);
    if (!ctx) {
        throw new Error("useLanguage는 LanguageProvider 안에서만 사용해야 합니다.");
    }
    return ctx;
};
