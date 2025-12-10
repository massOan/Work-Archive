// src/shared/config/i18n.ts
export type Language = "ko" | "ja";

export const LANGUAGE_OPTIONS: { id: Language; label: string }[] = [
    { id: "ko", label: "한국어" },
    { id: "ja", label: "日本語" },
];

// 화면별 텍스트
export const messages = {
    ko: {
        home: {
            heroTitle: "심플한 웹 UI 목업",
            heroDescription:
                "상단에 탭 5개가 있는 기본 웹 페이지 레이아웃입니다. 이 구조를 기반으로 React + TypeScript로 쉽게 확장할 수 있습니다.",
            featuresTitle: "기능 소개",
            featuresSubtitle: "간단한 카드 구성으로 핵심 기능을 소개합니다.",
        },
        products: {
            title: "Products / Services",
            subtitle: "제공하고 싶은 서비스나 포트폴리오 프로젝트를 정리해 둘 수 있습니다.",
            searchPlaceholder: "검색어를 입력하세요 (예: React, Mobile...)",
        },
        pricing: {
            title: "요금제",
            subtitle: "실제 과금이 아니라, 포트폴리오용 예시 요금제 섹션입니다.",
            comingSoonTitle: "준비 중입니다",
            comingSoonDescription:
                "요금 플랜, 서비스 플랜 등을 보여주기 위한 자리입니다. 나중에 실제 플랜 정보를 추가할 수 있습니다.",
        },
        blog: {
            title: "Blog / Notes",
            subtitle: "개발 경험이나 기술 메모를 정리하는 공간으로 사용할 수 있습니다.",
            readMore: "자세히 보기",
        },
        contact: {
            title: "Contact",
            subtitle:
                "문의 폼은 아직 준비 중입니다. 나중에 이메일 전송 기능을 붙이거나, 외부 서비스와 연동할 수 있습니다.",
            nameLabel: "이름 / Name",
            messageLabel: "메시지 / Message",
            namePlaceholder: "이름을 입력해 주세요.",
            messagePlaceholder: "간단히 문의 내용을 적어 주세요.",
            submitLabel: "문의 보내기",
        },
    },
    ja: {
        home: {
            heroTitle: "シンプルな Web UI モック",
            heroDescription:
                "上部に 5 つのタブがある基本的な Web ページレイアウトです。React と TypeScript をベースに簡単に拡張できます。",
            featuresTitle: "機能紹介",
            featuresSubtitle: "シンプルなカード構成で主な機能を紹介します。",
        },
        products: {
            title: "Products / Services",
            subtitle: "提供したいサービスやポートフォリオのプロジェクトを一覧できます。",
            searchPlaceholder: "キーワードで検索（例: React, Mobile...）",
        },
        pricing: {
            title: "料金プラン",
            subtitle: "実際の課金ではなく、ポートフォリオ用の料金セクション例です。",
            comingSoonTitle: "準備中です",
            comingSoonDescription:
                "料金プランやサービスプランを表示するエリアです。後で実際のプラン情報を追加できます。",
        },
        blog: {
            title: "Blog / Notes",
            subtitle: "開発経験や技術メモなどをまとめるスペースとして利用できます。",
            readMore: "続きを読む",
        },
        contact: {
            title: "お問い合わせ",
            subtitle:
                "お問い合わせフォームは準備中です。将来的にメール送信機能や外部サービス連携を追加できます。",
            nameLabel: "お名前 / Name",
            messageLabel: "メッセージ / Message",
            namePlaceholder: "お名前をご入力ください。",
            messagePlaceholder: "お問い合わせ内容をご記入ください。",
            submitLabel: "送信する",
        },
    },
} as const;
