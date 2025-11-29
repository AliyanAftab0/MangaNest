import { getMangaDetails, getChapterList } from "@/lib/api";
import { ChapterList } from "@/components/features/ChapterList";
import { Badge } from "@/components/ui/badge";
import { BannerAd } from "@/components/ui/BannerAd";
import Image from "next/image";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { id } = await params;
    const manga = await getMangaDetails(id);
    if (!manga) return { title: "Manga Not Found" };

    return {
        title: `${manga.title} - Read Online`,
        description: manga.description.slice(0, 160),
        openGraph: {
            images: [manga.cover],
        },
    };
}

export default async function MangaPage({ params }: PageProps) {
    const { id } = await params;
    const manga = await getMangaDetails(id);

    if (!manga) {
        notFound();
    }

    const chapters = await getChapterList(id, 100, 0);

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Hero Section with Blurred Background */}
            <div className="relative w-full h-[50vh] overflow-hidden">
                <div className="absolute inset-0">
                    {manga.cover && (
                        <Image
                            src={manga.cover}
                            alt="Background"
                            fill
                            className="object-cover opacity-30 blur-3xl scale-110"
                            priority
                        />
                    )}
                    <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/80 to-background" />
                </div>
            </div>

            <div className="container px-4 mx-auto -mt-64 relative z-10">
                <div className="grid md:grid-cols-[300px_1fr] gap-8 mb-12">
                    {/* Cover Image */}
                    <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 group">
                        {manga.cover ? (
                            <Image
                                src={manga.cover}
                                alt={manga.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                priority
                            />
                        ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                                No Cover
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="space-y-6 pt-10 md:pt-32">
                        <div>
                            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white tracking-tight leading-tight drop-shadow-lg">
                                {manga.title}
                            </h1>
                            <p className="text-2xl text-primary font-medium">{manga.author}</p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-primary/20 text-lg py-1 px-4">
                                {manga.status}
                            </Badge>
                            <Badge variant="outline" className="text-lg py-1 px-4 border-white/20 bg-black/20 backdrop-blur-md">
                                {manga.year}
                            </Badge>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {manga.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="bg-secondary/10 text-secondary hover:bg-secondary/20 border-secondary/20">
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        <div className="glass p-6 rounded-xl">
                            <h3 className="text-lg font-semibold mb-2 text-white/90">Synopsis</h3>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                                {manga.description}
                            </p>
                        </div>
                    </div>
                </div>

                <BannerAd className="mb-12" />

                {/* Chapters */}
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold flex items-center gap-2">
                        <span className="w-1 h-8 bg-primary rounded-full" />
                        Chapters
                    </h2>
                    <ChapterList mangaId={id} initialChapters={chapters} />
                </div>
            </div>
        </div>
    );
}
