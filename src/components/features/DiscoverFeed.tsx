"use client";

import { useState, useEffect } from "react";
import { Manga, SearchFilters } from "@/types";
import { searchMangaAction } from "@/app/actions";
import { MangaCard } from "@/components/features/MangaCard";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function DiscoverFeed({ initialFilters = {} }: { initialFilters?: SearchFilters }) {
    const [mangaList, setMangaList] = useState<Manga[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [filters, setFilters] = useState<SearchFilters>({
        title: "",
        status: "",
        year: undefined,
        ...initialFilters,
    });

    const fetchManga = async (reset = false) => {
        setLoading(true);
        const offset = reset ? 0 : page * 20;
        const newManga = await searchMangaAction(filters.title || "", {
            ...filters,
            offset,
            limit: 20,
        });

        if (reset) {
            setMangaList(newManga);
            setPage(1);
        } else {
            setMangaList((prev) => [...prev, ...newManga]);
            setPage((prev) => prev + 1);
        }

        if (newManga.length < 20) setHasMore(false);
        else setHasMore(true);

        setLoading(false);
    };

    useEffect(() => {
        fetchManga(true);
    }, [filters]);

    const handleFilterChange = (key: keyof SearchFilters, value: any) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <div className="space-y-8">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 bg-card p-4 rounded-lg shadow-sm">
                <div className="flex-1">
                    <Input
                        placeholder="Search by title..."
                        value={filters.title}
                        onChange={(e) => handleFilterChange("title", e.target.value)}
                        className="w-full"
                    />
                </div>
                <div className="w-full md:w-48">
                    <Select
                        value={filters.status}
                        onValueChange={(val) => handleFilterChange("status", val === "all" ? "" : val)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="ongoing">Ongoing</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="hiatus">Hiatus</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {mangaList.map((manga, index) => (
                    <MangaCard key={`${manga.id}-${index}`} manga={manga} index={index} />
                ))}
            </div>

            {/* Load More */}
            {loading && <Loader />}
            {!loading && hasMore && (
                <div className="flex justify-center pt-8 cursor-pointer">
                    <Button onClick={() => fetchManga(false)} variant="outline" size="lg">
                        Load More
                    </Button>
                </div>
            )}
            {!loading && !hasMore && mangaList.length > 0 && (
                <p className="text-center text-muted-foreground pt-8">No more manga to load.</p>
            )}
            {!loading && mangaList.length === 0 && (
                <div className="text-center py-20">
                    <h3 className="text-xl font-semibold">No results found</h3>
                    <p className="text-muted-foreground">Try adjusting your filters</p>
                </div>
            )}
        </div>
    );
}
