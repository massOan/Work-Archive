// src/pages/HomePage.tsx
import React from "react";
import { HomeHero, HomeFeatures } from "../widgets/home";
import { SiteOverview } from "../widgets/home/SiteOverview";

// import { Language } from "../shared/config/i18n";


export const HomePage: React.FC = () => {
    return (
        <>
            <HomeHero />
            <HomeFeatures />
            <SiteOverview />

        </>
    );
};
