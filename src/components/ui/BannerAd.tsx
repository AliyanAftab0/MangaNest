"use client";

import { useEffect, useRef } from "react";

interface BannerAdProps {
    className?: string;
    slot?: string;
    format?: "auto" | "fluid" | "rectangle";
}

export function BannerAd({ className, slot = "1234567890", format = "auto" }: BannerAdProps) {
    const adInitialized = useRef(false);

    useEffect(() => {
        if (adInitialized.current) return;

        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            adInitialized.current = true;
        } catch (err) {
            console.error("Google Ads error:", err);
        }
    }, []);

    return (
        <div className={`my-8 flex justify-center overflow-hidden ${className}`}>
            <ins
                className="adsbygoogle"
                style={{ display: "block", minWidth: "300px", minHeight: "250px" }}
                data-ad-client="ca-pub-8798626683959313"
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive="true"
            />
        </div>
    );
}
