export const metadata = {
    title: "About Us - MangaReader",
};

export default function AboutPage() {
    return (
        <div className="container px-4 py-8 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">About MangaReader</h1>
            <div className="prose dark:prose-invert">
                <p>
                    MangaReader is a free online manga reading website built for manga fans.
                    We provide a high-quality reading experience with a vast library of manga titles.
                </p>
                <p>
                    Our mission is to make manga accessible to everyone, everywhere.
                    We use the MangaDex API to bring you the latest chapters and updates.
                </p>
                <h3>Credits</h3>
                <p>
                    All manga data and images are provided by <a href="https://mangadex.org" target="_blank" rel="noreferrer" className="text-primary hover:underline">MangaDex</a>.
                    We do not host any files on our servers.
                </p>
            </div>
        </div>
    );
}
