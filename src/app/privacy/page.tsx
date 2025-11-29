export const metadata = {
    title: "Privacy Policy - MangaReader",
};

export default function PrivacyPage() {
    return (
        <div className="container px-4 py-8 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <div className="prose dark:prose-invert">
                <p>Last updated: {new Date().toLocaleDateString()}</p>
                <p>
                    At MangaReader, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.
                </p>
                <h3>Information We Collect</h3>
                <p>
                    We do not collect any personal information from our users. We may collect anonymous usage data to improve our service.
                </p>
                <h3>Cookies</h3>
                <p>
                    We use cookies to store your preferences, such as theme settings. We also use third-party cookies for Google Ads.
                </p>
                <h3>Third-Party Services</h3>
                <p>
                    We use Google Analytics and Google AdSense. These services may collect data about your visit to our website.
                </p>
            </div>
        </div>
    );
}
