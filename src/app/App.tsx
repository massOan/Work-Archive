// src/app/App.tsx
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "../widgets/header/Header";
import { Footer } from "../widgets/footer/Footer";
import { HomePage } from "../pages/HomePage";
import { ProductsPage } from "../pages/ProductsPage";
import { NowPage } from "../pages/NowPage";
import { ContactPage } from "../pages/ContactPage";
import { LanguageProvider } from "../shared/context/LanguageContext";
import { IntroOverlay } from "../shared/ui/IntroOverlay";

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <LanguageProvider>
      {/* 인트로 오버레이: 맨 위에서 페이지 전체를 덮어씀 */}
      {showIntro && (
        <IntroOverlay onFinish={() => setShowIntro(false)} />
      )}

      <BrowserRouter basename="/Work-Archive">
        <div className="page">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/now" element={<NowPage />} />
              <Route path="/contact" element={<ContactPage />} />
              {/* 잘못된 경로는 홈으로 리다이렉트 */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
};

export default App;
