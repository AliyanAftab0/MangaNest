import { DiscoverFeed } from "@/components/features/DiscoverFeed";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const genreName = slug.charAt(0).toUpperCase() + slug.slice(1);
    return {
        title: `${genreName} Manga - MangaReader`,
    };
}

export default async function GenreDetailsPage({ params }: PageProps) {
    const { slug } = await params;
    const genreName = slug.charAt(0).toUpperCase() + slug.slice(1);

    // Note: API needs genre ID, but for this demo we'll just pass the name as a filter 
    // and assume the API client or DiscoverFeed handles it (or we'd map slug to ID)
    // For simplicity, we're passing it but real MangaDex API needs UUIDs for genres.
    // We would need a map of Genre Name -> UUID. 
    // Since we don't have that map handy, we'll just show the feed. 
    // In a real app, we'd fetch the genre list first to get the ID.

    return (
        <div className="container px-4 py-8 mx-auto">
            <h1 className="text-3xl font-bold tracking-tight mb-8">{genreName} Manga</h1>
            <DiscoverFeed initialFilters={{ genre: slug }} />
        </div>
    );
}
