import { DiscoverFeed } from "@/components/features/DiscoverFeed";

interface PageProps {
    searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps) {
    const { q } = await searchParams;
    return {
        title: q ? `Search: ${q} - MangaReader` : "Search Manga - MangaReader",
    };
}

export default async function SearchPage({ searchParams }: PageProps) {
    const { q } = await searchParams;

    return (
        <div className="container px-4 py-8">
            <h1 className="text-3xl font-bold tracking-tight mb-8">
                {q ? `Search Results for "${q}"` : "Search Manga"}
            </h1>
            <DiscoverFeed initialFilters={{ title: q }} />
        </div>
    );
}
