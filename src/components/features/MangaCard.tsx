"use client";

import Link from "next/link";
import Image from "next/image";
import { Manga } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface MangaCardProps {
    manga: Manga;
    index?: number;
}

export function MangaCard({ manga, index = 0 }: MangaCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        // Entrance animation
        gsap.fromTo(card,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, delay: index * 0.05, ease: "power2.out" }
        );

        const hover = gsap.timeline({ paused: true });

        hover.to(card, {
            y: -8,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
        });

        if (glowRef.current) {
            hover.to(glowRef.current, {
                opacity: 1,
                duration: 0.3,
            }, 0);
        }

        const onEnter = () => hover.play();
        const onLeave = () => hover.reverse();

        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);

        return () => {
            card.removeEventListener("mouseenter", onEnter);
            card.removeEventListener("mouseleave", onLeave);
        };
    }, [index]);

    return (
        <Link href={`/manga/${manga.id}`}>
            <div ref={cardRef} className="h-full relative group">
                {/* Glow Effect */}
                <div
                    ref={glowRef}
                    className="absolute -inset-0.5 bg-linear-to-r from-primary to-secondary rounded-xl opacity-0 blur transition duration-500 group-hover:opacity-75"
                />

                <Card className="relative h-full overflow-hidden border-none bg-card shadow-xl rounded-xl">
                    <CardContent className="p-0 relative aspect-[2/3] overflow-hidden">
                        {manga.cover ? (
                            <Image
                                src={manga.cover}
                                alt={manga.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                            />
                        ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                                No Cover
                            </div>
                        )}

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                        {/* Content on Image */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="font-bold text-lg leading-tight text-white line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                                {manga.title}
                            </h3>
                            <p className="text-xs text-gray-300 font-medium line-clamp-1">{manga.author}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Link>
    );
}
