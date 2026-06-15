import Link from "next/link";
import { Zap, Globe, ExternalLink, Rss, Mail } from "lucide-react";

const footerNav = [
  {
    title: "Explore",
    links: [
      { name: "Home", href: "/" },
      { name: "All Posts", href: "/posts" },
      { name: "Categories", href: "/categories" },
    ],
  },
  {
    title: "Platform",
    links: [
      { name: "About", href: "/about" },
      { name: "Admin Console", href: "/admin" },
    ],
  },
];

const socialLinks = [
  { name: "Website", href: "#", icon: <Globe className="size-4" /> },
  { name: "External Link", href: "#", icon: <ExternalLink className="size-4" /> },
  { name: "RSS Feed", href: "#", icon: <Rss className="size-4" /> },
  { name: "Newsletter", href: "#", icon: <Mail className="size-4" /> },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer aria-label="Site footer" className="border-t border-border mt-auto bg-background">
      <div className="container mx-auto px-6 lg:px-10 max-w-7xl py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex size-6 items-center justify-center rounded-md bg-primary">
            <Zap className="size-3 fill-primary-foreground text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tighter text-foreground">
            blog<span className="text-primary">Post</span>
          </span>
        </Link>
        <p className="text-sm text-muted-foreground font-medium">
          © {year} blogPost. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
