import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const GENRES = [
    "Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror",
    "Mystery", "Psychological", "Romance", "Sci-Fi", "Slice of Life",
    "Sports", "Supernatural", "Thriller", "Tragedy"
];

export const metadata = {
    title: "Browse Genres - MangaReader",
};

export default function GenrePage() {
    return (
        <div className="container px-4 py-8 mx-auto">
            <h1 className="text-3xl font-bold tracking-tight mb-8">Browse by Genre</h1>
            <div className="flex flex-wrap gap-4">
                {GENRES.map((genre) => (
                    <Link key={genre} href={`/genre/${genre.toLowerCase()}`}>
                        <Badge className="text-lg px-6 py-3 hover:bg-primary cursor-pointer transition-colors">
                            {genre}
                        </Badge>
                    </Link>
                ))}
            </div>
        </div>
    );
}
