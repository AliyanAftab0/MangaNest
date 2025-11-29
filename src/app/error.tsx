"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <h1 className="text-4xl font-bold mb-4">Something went wrong!</h1>
            <p className="text-muted-foreground mb-8">
                We apologize for the inconvenience. Please try again.
            </p>
            <Button onClick={() => reset()} size="lg">
                Try Again
            </Button>
        </div>
    );
}
