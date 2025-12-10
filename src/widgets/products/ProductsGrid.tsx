// src/widgets/products/ProductsGrid.tsx
import React, { useState } from "react";
import { PRODUCTS, Product } from "./products";
import { messages } from "../../shared/config/i18n";
import { useLanguage } from "../../shared/context/LanguageContext";

export const ProductsGrid: React.FC = () => {
    const { language } = useLanguage();
    const t = messages[language].products;

    const [keyword, setKeyword] = useState("");
    const allProducts = PRODUCTS[language];

    const lower = keyword.toLowerCase();
    const filteredProducts = allProducts.filter((product: Product) => {
        if (!lower) return true;
        return (
            product.name.toLowerCase().includes(lower) ||
            product.description.toLowerCase().includes(lower) ||
            product.tags.some((tag) => tag.toLowerCase().includes(lower))
        );
    });

    return (
        <section className="section">
            <div className="container">
                <h2 className="section-title">{t.title}</h2>
                <p className="section-subtitle">{t.subtitle}</p>

                <div style={{ marginBottom: 16 }}>
                    <input
                        type="text"
                        placeholder={t.searchPlaceholder}
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        style={{
                            padding: "8px 12px",
                            borderRadius: 8,
                            border: "1px solid #d1d5db",
                            fontSize: 14,
                            width: "100%",
                            maxWidth: 320,
                        }}
                    />
                </div>

                <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 8 }}>
                    {language === "ko"
                        ? `검색 결과: ${filteredProducts.length}개`
                        : `検索結果: ${filteredProducts.length}件`}
                </p>

                <div className="card-grid products-grid">
                    {filteredProducts.map((product) => (
                        <article key={product.name} className="card">
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <div className="pill-row">
                                {product.tags.map((tag) => (
                                    <span key={tag} className="pill">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};
