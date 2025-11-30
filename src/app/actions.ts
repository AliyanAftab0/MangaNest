"use server";

import { searchManga, getTrendingManga } from "@/lib/api";
import { SearchFilters } from "@/types";

export async function searchMangaAction(query: string, filters: SearchFilters) {
    return await searchManga(query, filters);
}

export async function getTrendingMangaAction(limit: number) {
    return await getTrendingManga(limit);
}
