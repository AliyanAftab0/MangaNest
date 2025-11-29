import { getChapterList } from "@/lib/api";
import { Reader } from "@/components/features/Reader";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string; chapterId: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { id, chapterId } = await params;
    return {
        title: `Read Chapter - MangaReader`,
    };
}

export default async function ChapterPage({ params }: PageProps) {
    const { id, chapterId } = await params;

    // Fetch chapter list to determine prev/next
    const chapters = await getChapterList(id, 500, 0); // Fetch enough to find current
    const currentIndex = chapters.findIndex((c) => c.id === chapterId);

    if (currentIndex === -1) {
        // If not found in first 1000, might need to handle pagination or it doesn't exist
        // For MVP we assume it's within 1000 or basic error
    }

    const prevChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : undefined;
    const nextChapter = currentIndex > 0 ? chapters[currentIndex - 1] : undefined;

    return (
        <Reader
            chapterId={chapterId}
            mangaId={id}
            prevChapterId={prevChapter?.id}
            nextChapterId={nextChapter?.id}
        />
    );
}
