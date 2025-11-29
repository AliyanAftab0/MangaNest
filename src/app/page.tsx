import { HeroSection } from "@/components/features/HeroSection";
import { MangaCard } from "@/components/features/MangaCard";
import { getTrendingManga, searchManga } from "@/lib/api";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function Home() {
  const trendingManga = await getTrendingManga(10);
  const popularManga = await searchManga("", { limit: 10, offset: 0 }); // Just fetching some manga for "Popular" section

  return (
    <div className="pb-20">
      <HeroSection />

      {/* Trending Section */}
      <section className="container px-4 py-16 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Trending Now</h2>
            <p className="text-muted-foreground mt-1">Most popular manga this week</p>
          </div>
          <Link href="/discover?sort=trending">
            <Button variant="ghost" className="group cursor-pointer">
              View All <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {trendingManga.map((manga, index) => (
            <MangaCard key={manga.id} manga={manga} index={index} />
          ))}
        </div>
      </section>

      {/* Popular Updates Section */}
      <section className="bg-secondary/5 py-16 ">
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Popular Updates</h2>
              <p className="text-muted-foreground mt-1">Recently updated popular series</p>
            </div>
            <Link href="/latest">
              <Button variant="ghost" className="group cursor-pointer">
                View All <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {popularManga.map((manga, index) => (
              <MangaCard key={manga.id} manga={manga} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
