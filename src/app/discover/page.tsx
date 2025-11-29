import { DiscoverFeed } from "@/components/features/DiscoverFeed";

export const metadata = {
    title: "Discover Manga - MangaReader",
    description: "Browse thousands of manga titles filtered by genre, status, and more.",
};

export default function DiscoverPage() {
    return (
        <div className="container px-4 py-20 mx-auto">
            <h1 className="text-3xl font-bold tracking-tight mb-8">Discover Manga</h1>
            <DiscoverFeed />
        </div>
    );
}
