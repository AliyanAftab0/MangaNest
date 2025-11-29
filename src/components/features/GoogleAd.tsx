"use client";

import { useEffect } from "react";

declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

export function GoogleAd({ slotId }: { slotId: string }) {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error("Google Ads error:", err);
        }
    }, []);

    return (
        <div className="my-8 flex justify-center overflow-hidden">
            <ins
                className="adsbygoogle"
                style={{ display: "block", minWidth: "300px", minHeight: "250px" }}
                data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with actual Client ID
                data-ad-slot={slotId}
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
        </div>
    );
}
