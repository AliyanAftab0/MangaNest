"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface BannerAdProps {
    className?: string;
    slot?: string;
    format?: "auto" | "fluid" | "rectangle";
}

export function BannerAd({ className, slot = "1234567890", format = "auto" }: BannerAdProps) {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className={cn("relative w-full flex justify-center my-8", className)}>
            <div className="relative overflow-hidden rounded-lg bg-muted/30 border border-white/5 min-h-[100px] w-full max-w-[728px] flex items-center justify-center">
                {/* Placeholder for AdSense/Ad Network */}
                <div className="text-center p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Advertisement</p>
                    <div className="w-full h-[90px] bg-black/20 rounded flex items-center justify-center border border-dashed border-white/10">
                        <span className="text-sm text-muted-foreground">Ad Space ({format})</span>
                    </div>
                </div>

                {/* "Remove Ads" Button - Premium Upsell */}
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-black/50 hover:bg-red-500/80 transition-colors group"
                    title="Remove Ad"
                >
                    <X className="w-3 h-3 text-white/50 group-hover:text-white" />
                </button>
            </div>
        </div>
    );
}
