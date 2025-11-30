import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "MangaNest - Read Manga Online Free",
    template: "%s | MangaNest",
  },
  description: "Read your favorite manga online for free. High quality images, fast loading speed, and daily updates.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://manga-reader.vercel.app",
    siteName: "MangaReader",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MangaReader",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mangareader",
    creator: "@mangareader",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-8798626683959313" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8798626683959313"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={outfit.className} suppressHydrationWarning>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
