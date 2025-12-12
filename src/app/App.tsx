// src/app/App.tsx
import React, { useState } from "react";
import { Header } from "../widgets/header/Header";
import { Footer } from "../widgets/footer/Footer";
import { TabId, DEFAULT_TAB_ID } from "../shared/config/navigation";
import { HomePage } from "../pages/HomePage";
import { ProductsPage } from "../pages/ProductsPage";
import { PricingPage } from "../pages/PricingPage";
import { BlogPage } from "../pages/BlogPage";
import { ContactPage } from "../pages/ContactPage";
import { LanguageProvider } from "../shared/context/LanguageContext";
import { IntroOverlay } from "../shared/ui/IntroOverlay"; // ✅ 추가

const App: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<TabId>(DEFAULT_TAB_ID);
  const [showIntro, setShowIntro] = useState(true); // ✅ 인트로 표시 여부

  const renderPage = () => {
    switch (activeTabId) {
      case "home":
        return <HomePage />;
      case "products":
        return <ProductsPage />;
      case "pricing":
        return <PricingPage />;
      case "blog":
        return <BlogPage />;
      case "contact":
        return <ContactPage />;
      default:
        return null;
    }
  };

  return (
    <LanguageProvider>
      {/* ✅ 인트로 오버레이: 맨 위에서 페이지 전체를 덮어씀 */}
      {showIntro && (
        <IntroOverlay onFinish={() => setShowIntro(false)} />
      )}

      <div className="page">
        <Header activeTabId={activeTabId} onTabChange={setActiveTabId} />
        <main>{renderPage()}</main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;
