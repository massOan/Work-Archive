// src/shared/api/projects.ts
import { supabase } from "./supabaseClient";
import type { Language } from "../config/i18n";

export type ProjectRow = {
    id: number;            // PK (bigserial)
    language: Language;    // 'ko' | 'ja'
    name: string;
    period: string | null;
    role: string | null;
    description: string;
    tags: string[] | null;
    sort_order: number | null;
};

export async function fetchProjectsByLanguage(
    language: Language
): Promise<ProjectRow[]> {
    const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("language", language)
        .order("sort_order", { ascending: true });

    if (error) {
        console.error("fetchProjectsByLanguage error", error);
        throw error;
    }

    return data ?? [];
}
