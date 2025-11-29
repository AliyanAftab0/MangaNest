"use client";

import { useState } from "react";
import { Chapter } from "@/types";
import { getChapterList } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns"; // Need to install date-fns

interface ChapterListProps {
    mangaId: string;
    initialChapters: Chapter[];
}

export function ChapterList({ mangaId, initialChapters }: ChapterListProps) {
    const [chapters, setChapters] = useState<Chapter[]>(initialChapters);
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(initialChapters.length);
    const [hasMore, setHasMore] = useState(initialChapters.length >= 100);

    const loadMore = async () => {
        setLoading(true);
        const newChapters = await getChapterList(mangaId, 100, offset);
        setChapters((prev) => [...prev, ...newChapters]);
        setOffset((prev) => prev + 100);
        if (newChapters.length < 100) setHasMore(false);
        setLoading(false);
    };

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold">Chapters</h3>
            <div className="grid gap-2">
                {chapters.map((chapter) => (
                    <Link
                        key={chapter.id}
                        href={`/manga/${mangaId}/chapter/${chapter.id}`}
                        className="block"
                    >
                        <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent transition-colors">
                            <div>
                                <span className="font-medium">
                                    {chapter.volume ? `Vol. ${chapter.volume} ` : ""}
                                    Ch. {chapter.chapter}
                                </span>
                                {chapter.title && (
                                    <span className="text-muted-foreground ml-2">
                                        - {chapter.title}
                                    </span>
                                )}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                {chapter.publishAt
                                    ? formatDistanceToNow(new Date(chapter.publishAt), {
                                        addSuffix: true,
                                    })
                                    : "Unknown"}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            {hasMore && (
                <div className="flex justify-center pt-4">
                    {loading ? (
                        <Loader />
                    ) : (
                        <Button onClick={loadMore} variant="outline">
                            Load More Chapters
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}
