// src/shared/api/projectDetails.ts
import { supabase } from "./supabaseClient";

export type Section = {
    key: string;
    title: string;
    items: Array<{ text: string; tags?: string[] }>;
};

type ProjectDetailSectionRow = {
    id: string; // uuid
    section_key: string;
    title: string;
    order_index: number;
    published: boolean;
    project_detail_items?: Array<{
        id: string; // uuid
        body: string;
        tags: string[] | null;
        order_index: number;
    }>;
};

export async function fetchProjectDetailSections(args: {
    projectId: number | string;
}): Promise<Section[]> {
    const projectId =
        typeof args.projectId === "string" ? Number(args.projectId) : args.projectId;

    const { data, error } = await supabase
        .from("project_detail_sections")
        .select(
            `
      id,
      section_key,
      title,
      order_index,
      published,
      project_detail_items (
        id,
        body,
        tags,
        order_index
      )
    `
        )
        .eq("project_id", projectId)
        .eq("published", true)
        .order("order_index", { ascending: true })
        .order("order_index", {
            ascending: true,
            foreignTable: "project_detail_items",
        });

    if (error) throw error;

    const rows = (data ?? []) as ProjectDetailSectionRow[];

    return rows.map((s) => ({
        key: s.section_key,
        title: s.title,
        items: (s.project_detail_items ?? []).map((it) => ({
            text: it.body,
            tags: it.tags ?? undefined,
        })),
    }));
}
