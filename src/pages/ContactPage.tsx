// src/pages/ContactPage.tsx
import React from "react";
import { ContactForm } from "../widgets/contact/ContactForm";
import { Language } from "../shared/config/i18n";

type ContactPageProps = {
    language: Language;
};

export const ContactPage: React.FC = () => {
    return <ContactForm />;
};
