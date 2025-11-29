import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t bg-background mx-auto">
            <div className="container py-8 px-4 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">MangaReader</h3>
                        <p className="text-sm text-muted-foreground">
                            Read your favorite manga online for free. High quality images and fast loading speed.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-medium mb-4">Links</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/discover" className="hover:text-primary">Discover</Link></li>
                            <li><Link href="/latest" className="hover:text-primary">Latest Updates</Link></li>
                            <li><Link href="/genre" className="hover:text-primary">Genres</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
                            <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium mb-4">Connect</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
                            <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-primary">Twitter</a></li>
                            <li><a href="https://discord.com" target="_blank" rel="noreferrer" className="hover:text-primary">Discord</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} MangaNest. All rights reserved.</p>
                    <p className="mt-2 text-xs">This site does not store any files on its server. All contents are provided by non-affiliated third parties.</p>
                </div>
            </div>
        </footer>
    );
}
