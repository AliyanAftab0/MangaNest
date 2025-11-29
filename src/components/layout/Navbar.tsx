"use client";

import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import gsap from "gsap";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/discover?title=${encodeURIComponent(searchQuery)}`);
            setIsOpen(false);
        }
    };

    // GSAP Animation for Mobile Menu
    useEffect(() => {
        if (isOpen) {
            gsap.fromTo(menuRef.current,
                { y: -20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
            );
        }
    }, [isOpen]);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b-0 transition-all duration-300">
            <div className="container flex h-16 items-center justify-between mx-auto px-4">
                <Link href="/" className="flex items-center space-x-2 group">
                    <span className="text-2xl font-extrabold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                        MangaNest
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link href="/discover" className="text-sm font-medium hover:text-primary transition-colors">
                        Discover
                    </Link>
                    <Link href="/latest" className="text-sm font-medium hover:text-primary transition-colors">
                        Latest
                    </Link>
                    <Link href="/genre" className="text-sm font-medium hover:text-primary transition-colors">
                        Genres
                    </Link>
                </div>

                <div className="hidden md:flex items-center space-x-4">
                    <form onSubmit={handleSearch} className="relative group">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <input
                            type="search"
                            placeholder="Search manga..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-9 w-64 rounded-full border border-input bg-background/50 pl-9 pr-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all focus:w-72 focus:bg-background"
                        />
                    </form>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary">
                        <span className="sr-only">Toggle theme</span>
                        {/* Theme toggle icon will go here */}
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
            </div>

            {/* Mobile Menu with GSAP Animation */}
            {isOpen && (
                <div
                    ref={menuRef}
                    className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-white/10 shadow-2xl p-6 space-y-6"
                >
                    <form onSubmit={handleSearch} className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <input
                            type="search"
                            placeholder="Search manga..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-10 w-full rounded-full border border-input bg-background pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/50 outline-none"
                        />
                    </form>

                    <div className="flex flex-col space-y-4">
                        <Link
                            href="/discover"
                            className="text-lg font-medium hover:text-primary transition-colors flex items-center gap-2"
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="w-1 h-1 rounded-full bg-primary"></span> Discover
                        </Link>
                        <Link
                            href="/latest"
                            className="text-lg font-medium hover:text-primary transition-colors flex items-center gap-2"
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="w-1 h-1 rounded-full bg-secondary"></span> Latest
                        </Link>
                        <Link
                            href="/genre"
                            className="text-lg font-medium hover:text-primary transition-colors flex items-center gap-2"
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="w-1 h-1 rounded-full bg-accent"></span> Genres
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
