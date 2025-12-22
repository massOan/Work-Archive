export type TabId = "home" | "products" | "now" | "blog" | "contact";

export type Tab = {
    id: TabId;
    label: string;
    path: string; // ✅ 라우팅 경로 추가
};

export const TABS: Tab[] = [
    { id: "home", label: "Home", path: "/" },
    { id: "products", label: "Products", path: "/products" },
    { id: "now", label: "Now", path: "/now" },
    { id: "blog", label: "Blog", path: "/blog" },
    { id: "contact", label: "Contact", path: "/contact" },
];

export const DEFAULT_TAB_ID: TabId = "home";