import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
    title: "Contact Us - MangaReader",
};

export default function ContactPage() {
    return (
        <div className="container px-4 py-8 max-w-xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Contact Us</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                            <Input id="name" placeholder="Your name" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                            <Input id="email" type="email" placeholder="your@email.com" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                            <textarea
                                id="message"
                                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="How can we help?"
                            />
                        </div>
                        <Button type="submit" className="w-full">Send Message</Button>
                    </form>
                    <p className="text-xs text-muted-foreground mt-4 text-center">
                        Note: This is a demo form. In a real app, this would connect to a backend service.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
