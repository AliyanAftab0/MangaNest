"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import gsap from "gsap";

export function HeroSection() {
    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(
            titleRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, delay: 0.2 }
        )
            .fromTo(
                textRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                "-=0.6"
            )
            .fromTo(
                buttonsRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                "-=0.6"
            );
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden"
        >
            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-[#0a0a0a] to-[#000000] z-0" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1613376023733-0a73315d9b06?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />

            {/* Floating Elements (Decorative) */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />

            <div className="container relative z-20 text-center px-4">
                <h1
                    ref={titleRef}
                    className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent drop-shadow-2xl"
                >
                    Discover Your Next <br />
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Obsession</span>
                </h1>
                <p
                    ref={textRef}
                    className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
                >
                    Read thousands of manga for free. High quality images, fast loading, and daily updates.
                </p>
                <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/discover">
                        <Button size="lg" className="text-lg px-8 rounded-full bg-primary cursor-pointer hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:scale-105">
                            Start Reading
                        </Button>
                    </Link>
                    <Link href="/latest">
                        <Button size="lg" variant="outline" className="text-lg cursor-pointer hover:text-white px-8 rounded-full border-white/10 hover:bg-white/5 backdrop-blur-sm transition-all hover:scale-105">
                            Latest Updates
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
