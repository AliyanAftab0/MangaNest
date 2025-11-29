import { DiscoverFeed } from "@/components/features/DiscoverFeed";

export const metadata = {
    title: "Latest Updates - MangaReader",
    description: "Read the latest manga chapters and updates.",
};

export default function LatestPage() {
    return (
        <div className="container px-4 py-8 mx-auto">
            <h1 className="text-3xl font-bold tracking-tight mb-8">Latest Updates</h1>
            {/* We might want to pass a sort param if API supports it, but for now standard discover is fine or we can add sort prop */}
            <DiscoverFeed />
        </div>
    );
}
