// src/shared/ui/IntroOverlay.tsx
import React, { useCallback, useEffect, useState } from "react";

type IntroOverlayProps = {
    onFinish: () => void;
};

/** 파란 blob 애니메이션 */
const IntroBlob: React.FC = () => {
    return (
        <div className="intro-blob">
            <div className="intro-blob-layer intro-blob-layer1" />
            <div className="intro-blob-layer intro-blob-layer2" />
            <div className="intro-blob-layer intro-blob-layer3" />
        </div>
    );
};

export const IntroOverlay: React.FC<IntroOverlayProps> = ({ onFinish }) => {
    const [closing, setClosing] = useState(false);

    const handleClose = useCallback(() => {
        setClosing(true);
        setTimeout(() => {
            onFinish();
        }, 600);
    }, [onFinish]);

    useEffect(() => {
        const timer = setTimeout(() => {
            handleClose();
        }, 2500);

        return () => clearTimeout(timer);
    }, [handleClose]);

    return (
        <div
            className={`intro-overlay ${closing ? "intro-overlay--closing" : ""
                }`}
        >
            {/* ✅ 가운데 blob */}
            <IntroBlob />

            {/* ✅ 텍스트 박스는 blob 위 레이어 */}
            <div className="intro-inner">
                <p className="intro-kicker">Portfolio of</p>
                <h1 className="intro-title">JANG IKJUN</h1>
                <p className="intro-subtitle">Android × Web Engineer</p>
                <p className="intro-subtitle-small">
                    From Korea, aiming to work in Japan.
                </p>

                <button
                    type="button"
                    className="intro-button"
                    onClick={handleClose}
                >
                    Enter
                </button>
            </div>
        </div>
    );
};
