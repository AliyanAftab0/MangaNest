export const metadata = {
    title: "Terms & Conditions - MangaReader",
};

export default function TermsPage() {
    return (
        <div className="container px-4 py-8 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
            <div className="prose dark:prose-invert">
                <p>Last updated: {new Date().toLocaleDateString()}</p>
                <h3>1. Acceptance of Terms</h3>
                <p>
                    By accessing and using MangaReader, you accept and agree to be bound by the terms and provision of this agreement.
                </p>
                <h3>2. Content</h3>
                <p>
                    MangaReader does not host any content on its servers. All content is provided by third-party APIs (MangaDex).
                    We are not responsible for the content provided by these third parties.
                </p>
                <h3>3. Use License</h3>
                <p>
                    Permission is granted to temporarily download one copy of the materials (information or software) on MangaReader's website for personal, non-commercial transitory viewing only.
                </p>
            </div>
        </div>
    );
}
