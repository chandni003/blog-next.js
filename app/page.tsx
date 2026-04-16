"use client";

import { usePost } from "@/lib/firebase/post/read";
import { Button } from "@/components/ui/button";
import {
  Clock,
  MessageSquare,
  Bookmark,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Zap
} from "lucide-react";
import Link from "next/link";
import { stripHtml } from "@/lib/utils";

export default function BlogHome() {
  const { data: posts, isloading } = usePost();

  const featuredPost = posts?.[0];
  const remainingPosts = posts?.slice(1) || [];

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">

      {/* HERO / FEATURED SECTION */}
      <section className="container mx-auto px-6 pt-12 pb-16 lg:pb-24">
        {!isloading && featuredPost ? (
          <div className="relative group overflow-hidden rounded-[2.5rem] border border-border bg-card/30 backdrop-blur-md p-8 lg:p-14 flex flex-col lg:flex-row gap-12 items-center transition-all hover:border-primary/20 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent pointer-events-none" />

            <div className="flex-1 space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
                <Sparkles className="size-3" /> Featured Insight
              </div>
              <h1 className="text-4xl lg:text-7xl font-bold tracking-tight leading-[1.05] group-hover:text-primary transition-colors duration-500">
                {featuredPost.name}
              </h1>
              <p className="text-lg text-muted-foreground line-clamp-3 max-w-2xl font-medium">
                {stripHtml(featuredPost.shortDescription) || "Dive into our latest technical deep-dive and explore the cutting edge of modern web architecture..."}
              </p>
              <div className="flex items-center gap-8 pt-4">
                <Link href={`/posts/${featuredPost.id}`}>
                  <Button size="lg" className="rounded-full px-10 h-14 font-bold shadow-lg shadow-primary/20 gap-2">
                    Read Story <ArrowRight className="size-5" />
                  </Button>
                </Link>
                <div className="hidden sm:flex items-center gap-6 text-sm font-bold text-muted-foreground/60 uppercase tracking-widest">
                  <span className="flex items-center gap-2">
                    <Clock className="size-4" /> 12 MIN DEEP DIVE
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 aspect-video rounded-3xl bg-muted overflow-hidden border border-border shadow-2xl relative">
              {featuredPost.thumbnailUrl ? (
                <img
                  src={featuredPost.thumbnailUrl}
                  alt={featuredPost.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center">
                  <Zap className="size-20 text-primary/20" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            </div>
          </div>
        ) : isloading ? (
          <div className="h-[500px] w-full bg-muted animate-pulse rounded-[2.5rem]" />
        ) : (
          <div className="text-center py-20 px-8 rounded-[2.5rem] border border-dashed border-border">
            <h2 className="text-2xl font-bold opacity-30 italic">No reports found in the library.</h2>
          </div>
        )}
      </section>

      {/* THE FEED SECTION - Simplified Full Width */}
      <section className="container mx-auto px-6 pb-32 max-w-5xl">

        <div className="space-y-16">
          <div className="flex items-center justify-between border-b border-border pb-6">
            <h2 className="text-3xl font-bold tracking-tight">Latest <span className="text-primary italic">Intelligence</span></h2>
            <div className="text-xs font-bold uppercase tracking-widest text-primary border-b-2 border-primary pb-6">
              New Reports
            </div>
          </div>

          <div className="grid gap-16">
            {remainingPosts?.length > 0 ? remainingPosts.map((post: any) => (
              <article key={post.id} className="group flex flex-col md:flex-row gap-10 items-start">
                <div className="w-full md:w-80 aspect-[16/10] rounded-3xl bg-muted border border-border shrink-0 group-hover:border-primary/30 transition-all overflow-hidden shadow-sm">
                  {post.thumbnailUrl ? (
                    <img
                      src={post.thumbnailUrl}
                      alt={post.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted/50" />
                  )}
                </div>
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] px-2 py-0.5 bg-primary/10 rounded-md">Research</span>
                    <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">{post.timestamp?.toDate()?.toLocaleDateString()}</span>
                  </div>
                  <Link href={`/posts/${post.id}`}>
                    <h3 className="text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors leading-tight tracking-tight">
                      {post.name}
                    </h3>
                  </Link>
                  <p className="text-muted-foreground text-md line-clamp-2 leading-relaxed opacity-80 font-medium">
                    {stripHtml(post.shortDescription) || "Transitioning to a more performant architecture isn't easy, but the rewards are massive."}
                  </p>
                  <div className="flex items-center gap-10 pt-4">
                    <Link href={`/posts/${post.id}`} className="text-primary font-bold text-sm flex items-center gap-2 group/btn uppercase tracking-widest">
                      Deep Dive <ChevronRight className="size-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                    <div className="flex items-center gap-6 text-muted-foreground/40">
                      <MessageSquare className="size-4 hover:text-primary transition-colors cursor-pointer" />
                      <Bookmark className="size-4 hover:text-primary transition-colors cursor-pointer" />
                    </div>
                  </div>
                </div>
              </article>
            )) : isloading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-10">
                  <div className="w-full md:w-80 aspect-video bg-muted animate-pulse rounded-3xl" />
                  <div className="flex-1 space-y-4 py-2">
                    <div className="h-4 w-32 bg-muted animate-pulse rounded-full" />
                    <div className="h-8 w-full bg-muted animate-pulse rounded-xl" />
                    <div className="h-12 w-full bg-muted animate-pulse rounded-xl" />
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center opacity-30 italic font-medium">The archives are currently silent... No reports found.</div>
            )}
          </div>
        </div>

      </section>
    </main>
  );
}