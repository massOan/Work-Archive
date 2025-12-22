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
            heroTitle: "Android × Web으로 가치를 만드는 개발자, 장익준입니다.",
            heroDescription:
                "통신 영역의 Android 앱 개발을 약 3년간 담당해 왔으며, 현재는 React + TypeScript로 Web 프론트엔드를 확장하며 일본에서의 커리어를 준비하고 있습니다.",
            primaryCta: "프로젝트 보러가기",
            secondaryCta: "경력 요약 보기",
        },
        products: {
            title: "Products / Services",
            subtitle: "지금까지 참여했던 프로젝트를 정리했습니다. 프로젝트 카드를 누르면 상세하게 보여줍니다.",
            searchPlaceholder: "검색어를 입력하세요 (예: React, Mobile...)",
        },
        now: {
            title: "Skills",
            subtitle: "기술 스택 및 경험을 확인하세요 - 카드를 클릭하여 상세 정보를 확인하세요",
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
        footer: {
            brand: "ikjun.dev",
            tagline: "Android × Web 포트폴리오",
            builtWith: "React + TypeScript · GitHub Pages",
            links: {
                github: "GitHub",
                email: "Email",
            },
            copyright: "일부 콘텐츠의 무단 사용을 금지합니다.",
        },
    },
    ja: {
        home: {
            heroTitle:
                "Android × Web で価値を生み出すエンジニア、張 益準（チャン・イクジュン）です。",
            heroDescription:
                "通信キャリア向けのAndroidアプリ開発を約3年担当してきました。現在はReact + TypeScriptでWebフロントにも取り組み、日本でのキャリアを目指して準備を進めています。",
            primaryCta: "プロジェクト一覧を見る",
            secondaryCta: "職務経歴の概要を見る",
        },
        products: {
            title: "Products / Services",
            subtitle: "これまでに参加したプロジェクトをまとめました。 プロジェクトカードを押すと、詳細に表示されます。",
            searchPlaceholder: "キーワードで検索（例: React, Mobile...）",
        },
        now: {
            title: "スキル",
            subtitle: "技術スタックと経験をご確認ください - カードをクリックして詳細を確認",
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
        footer: {
            brand: "ikjun.dev",
            tagline: "Android × Web ポートフォリオ",
            builtWith: "React + TypeScript · GitHub Pages",
            links: {
                github: "GitHub",
                email: "Email",
            },
            copyright: "内容の無断使用はご遠慮ください。",
        },
    },
} as const;

