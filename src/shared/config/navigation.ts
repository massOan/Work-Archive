export type TabId = "home" | "products" | "now" | "contact";

export type Tab = {
    id: TabId;
    label: string;
    path: string; // ✅ 라우팅 경로 추가
};

export const TABS: Tab[] = [
    { id: "home", label: "Home", path: "/" },
    { id: "products", label: "Products", path: "/products" },
    { id: "now", label: "Now", path: "/now" },
];

export const DEFAULT_TAB_ID: TabId = "home";
