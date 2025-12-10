// src/widgets/products/products.ts
import { Language } from "../../shared/config/i18n";

export type Product = {
    name: string;
    description: string;
    tags: string[];
};

export const PRODUCTS: Record<Language, Product[]> = {
    ko: [
        {
            name: "Mobile App",
            description: "iOS / Android용 네이티브 앱 개발.",
            tags: ["Kotlin", "Swift", "React Native"],
        },
        {
            name: "Web Frontend",
            description: "React + TypeScript 기반 SPA 개발.",
            tags: ["React", "TypeScript", "SPA"],
        },
        {
            name: "Design System",
            description: "재사용 가능한 UI 컴포넌트 라이브러리 구축.",
            tags: ["Storybook", "UI Library"],
        },
    ],
    ja: [
        {
            name: "Mobile App",
            description: "iOS / Android 向けネイティブアプリ開発。",
            tags: ["Kotlin", "Swift", "React Native"],
        },
        {
            name: "Web Frontend",
            description: "React + TypeScript ベースの SPA 開発。",
            tags: ["React", "TypeScript", "SPA"],
        },
        {
            name: "Design System",
            description: "再利用可能な UI コンポーネントライブラリの構築。",
            tags: ["Storybook", "UI ライブラリ"],
        },
    ],
};
