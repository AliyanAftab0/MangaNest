"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { getChapterImages } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { ChevronLeft, ChevronRight, Settings, Image as ImageIcon, ScrollText } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { BannerAd } from "@/components/ui/BannerAd";

interface ReaderProps {
    chapterId: string;
    mangaId: string;
    prevChapterId?: string;
    nextChapterId?: string;
}

export function Reader({ chapterId, mangaId, prevChapterId, nextChapterId }: ReaderProps) {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [readingMode, setReadingMode] = useState<"single" | "webtoon">("single");
    const [fitMode, setFitMode] = useState<"width" | "height">("width");
    const [showToolbar, setShowToolbar] = useState(true);
    const router = useRouter();

    const imageRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchImages = async () => {
            setLoading(true);
            try {
                const imgs = await getChapterImages(chapterId);
                setImages(imgs);
            } catch (error) {
                console.error("Failed to load images", error);
            } finally {
                setLoading(false);
            }
        };
        fetchImages();
    }, [chapterId]);

    // GSAP Animation for Page Transition (Single Mode)
    useEffect(() => {
        if (readingMode === "single" && imageRef.current) {
            gsap.fromTo(imageRef.current,
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
            );
        }
    }, [currentPage, readingMode]);

    const handleNext = useCallback(() => {
        if (readingMode === "webtoon") return;

        if (currentPage < images.length - 1) {
            setCurrentPage((prev) => prev + 1);
            window.scrollTo(0, 0);
        } else if (nextChapterId) {
            router.push(`/manga/${mangaId}/chapter/${nextChapterId}`);
        }
    }, [currentPage, images.length, nextChapterId, mangaId, router, readingMode]);

    const handlePrev = useCallback(() => {
        if (readingMode === "webtoon") return;

        if (currentPage > 0) {
            setCurrentPage((prev) => prev - 1);
            window.scrollTo(0, 0);
        } else if (prevChapterId) {
            router.push(`/manga/${mangaId}/chapter/${prevChapterId}`);
        }
    }, [currentPage, prevChapterId, mangaId, router, readingMode]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (readingMode === "webtoon") return;

            if (e.key === "ArrowRight" || e.key === " ") {
                e.preventDefault();
                handleNext();
            } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                handlePrev();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleNext, handlePrev, readingMode]);

    // Toggle Toolbar on Click
    const toggleToolbar = () => {
        setShowToolbar(prev => !prev);
    };

    if (loading) return (
        <div className="h-screen w-full flex items-center justify-center bg-black">
            <div className="flex flex-col items-center gap-4">
                <Loader className="w-10 h-10 text-primary animate-spin" />
                <p className="text-muted-foreground animate-pulse">Loading Chapter...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#050505] text-white relative" onClick={toggleToolbar}>

            {/* Top Toolbar */}
            <div className={cn(
                "fixed left-0 right-0 z-50 p-4 transition-all duration-300 transform",
                showToolbar ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
            )}>
                <div className="glass rounded-full px-6 py-3 flex justify-between items-center max-w-4xl mx-auto">
                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); router.push(`/manga/${mangaId}`); }} className="hover:bg-white/10 rounded-full">
                        <ChevronLeft className="w-4 h-4 mr-1" /> Back
                    </Button>

                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-white/80">
                            {readingMode === 'single' ? `Page ${currentPage + 1} / ${images.length}` : 'Webtoon Mode'}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => { e.stopPropagation(); setReadingMode(readingMode === "single" ? "webtoon" : "single"); }}
                            title={readingMode === "single" ? "Switch to Webtoon Mode" : "Switch to Single Page"}
                            className="hover:bg-white/10 rounded-full"
                        >
                            {readingMode === "single" ? <ScrollText className="h-4 w-4" /> : <ImageIcon className="h-4 w-4" />}
                        </Button>

                        {readingMode === "single" && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => { e.stopPropagation(); setFitMode(fitMode === "width" ? "height" : "width"); }}
                                className="hover:bg-white/10 rounded-full"
                            >
                                <Settings className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Reader Content */}
            <div
                ref={containerRef}
                className={cn(
                    "flex flex-col items-center min-h-screen pb-20 transition-all duration-300",
                    showToolbar ? "pt-24" : "pt-4"
                )}
            >
                {readingMode === "single" ? (
                    // Single Page Mode
                    <div className={cn(
                        "relative transition-all duration-300",
                        fitMode === "width" ? "w-full max-w-5xl px-2" : "h-[calc(100vh-100px)] w-auto flex justify-center"
                    )}>
                        {images[currentPage] && (
                            <img
                                ref={imageRef}
                                src={images[currentPage]}
                                alt={`Page ${currentPage + 1}`}
                                className={cn(
                                    "shadow-2xl rounded-sm select-none",
                                    fitMode === "height" ? "h-full w-auto object-contain" : "w-full h-auto"
                                )}
                                loading="eager"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // Click left/right side to nav
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const x = e.clientX - rect.left;
                                    if (x < rect.width / 3) handlePrev();
                                    else if (x > rect.width * 2 / 3) handleNext();
                                    else toggleToolbar();
                                }}
                            />
                        )}
                    </div>
                ) : (
                    // Webtoon Mode
                    <div className="w-full max-w-3xl flex flex-col gap-0">
                        {images.map((img, idx) => (
                            <div key={idx} className="w-full relative">
                                <img
                                    src={img}
                                    alt={`Page ${idx + 1}`}
                                    className="w-full h-auto block"
                                    loading="lazy"
                                />
                                {/* Insert Ad every 5 pages */}
                                {(idx + 1) % 5 === 0 && idx !== images.length - 1 && (
                                    <div className="py-4 bg-[#050505]">
                                        <BannerAd className="my-0" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                <div className="w-full max-w-4xl mt-8 px-4">
                    <BannerAd />
                </div>
            </div>

            {/* Bottom Navigation (Single Mode Only) */}
            {readingMode === "single" && (
                <div className={cn(
                    "fixed bottom-0 left-0 right-0 z-50 p-6 transition-all duration-300 transform",
                    showToolbar ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                )}>
                    <div className="glass rounded-full p-2 flex justify-center gap-4 max-w-md mx-auto">
                        <Button
                            variant="ghost"
                            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                            disabled={!prevChapterId && currentPage === 0}
                            className="flex-1 rounded-full hover:bg-white/10"
                        >
                            <ChevronLeft className="mr-2 h-4 w-4" /> Prev
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={(e) => { e.stopPropagation(); handleNext(); }}
                            disabled={!nextChapterId && currentPage === images.length - 1}
                            className="flex-1 rounded-full hover:bg-white/10"
                        >
                            Next <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}

            {/* Webtoon Mode Navigation Footer */}
            {readingMode === "webtoon" && (
                <div className="w-full max-w-3xl mx-auto p-4 flex justify-between gap-4 pb-12">
                    <Button
                        variant="secondary"
                        onClick={(e) => { e.stopPropagation(); if (prevChapterId) router.push(`/manga/${mangaId}/chapter/${prevChapterId}`); }}
                        disabled={!prevChapterId}
                        className="flex-1"
                    >
                        <ChevronLeft className="mr-2 h-4 w-4" /> Previous Chapter
                    </Button>
                    <Button
                        variant="default"
                        onClick={(e) => { e.stopPropagation(); if (nextChapterId) router.push(`/manga/${mangaId}/chapter/${nextChapterId}`); }}
                        disabled={!nextChapterId}
                        className="flex-1"
                    >
                        Next Chapter <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )}
        </div>
    );
}
