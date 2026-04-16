"use client";

import { usePost } from "@/lib/firebase/post/read";
import { Button } from "@/components/ui/button";
import {
   Clock,
   MessageSquare,
   Share2,
   Bookmark,
   ChevronRight,
   Search,
   BookOpen,
   Filter,
   Grid
} from "lucide-react";
import Link from "next/link";
import { stripHtml } from "@/lib/utils";

export default function PostsPage() {
   const { data: posts, isloading } = usePost();

   return (
      <main className="min-h-screen bg-background text-foreground transition-colors duration-300">

         {/* Search & Filter Header */}
         <section className="border-b border-border bg-card/10 pt-12 pb-8">
            <div className="container mx-auto px-6 lg:px-10">
               <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                  <div className="space-y-4">
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
                        <BookOpen className="size-3" /> Technical Archives
                     </div>
                     <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">The <span className="text-primary italic">Library</span></h1>
                     <p className="text-muted-foreground text-md max-w-xl font-medium">Explore our complete collection of architectural deep-dives, development strategies, and technical insights.</p>
                  </div>

               </div>
            </div>
         </section>

         {/* Blog Grid Section */}
         <section className="container mx-auto px-6 lg:px-10 py-20 animate-in fade-in duration-700">

            {/* Dynamic Post Feed */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
               {!isloading && posts?.length > 0 ? posts.map((post: any) => (
                  <article key={post.id} className="group flex flex-col bg-card/30 border border-border rounded-[2.5rem] overflow-hidden hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
                     {/* Thumbnail Image */}
                     <div className="aspect-[16/10] bg-muted overflow-hidden relative">
                        {post.thumbnailUrl ? (
                           <img
                              src={post.thumbnailUrl}
                              alt={post.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                           />
                        ) : (
                           <div className="w-full h-full bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-center">
                              <Grid className="size-12 text-primary/10" />
                           </div>
                        )}
                        <div className="absolute top-4 left-4">
                           <span className="px-3 py-1 bg-background/80 backdrop-blur-sm border border-border text-[10px] font-bold uppercase tracking-[0.2em] rounded-lg">Architecture</span>
                        </div>
                     </div>

                     {/* Content Detail */}
                     <div className="p-8 flex-1 flex flex-col gap-5">
                        <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                           <span className="flex items-center gap-1.5"><Clock className="size-3" /> 12 MIN READ</span>
                        </div>

                        <Link href={`/posts/${post.id}`}>
                           <h3 className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                              {post.name}
                           </h3>
                        </Link>

                        <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed opacity-80 font-medium">
                           {stripHtml(post.shortDescription) || "Delving into the nuances of modern state management and how it impacts large-scale Next.js deployments. We explore both client-side and server-side strategies..."}
                        </p>

                        <div className="mt-auto pt-6 flex items-center justify-between border-t border-border/50">
                           <Link href={`/posts/${post.id}`} className="text-primary font-bold text-sm flex items-center gap-1.5 group/link">
                              Read Full Insight <ChevronRight className="size-4 group-hover/link:translate-x-1 transition-transform" />
                           </Link>
                           <div className="flex items-center gap-4 text-muted-foreground/40">
                              <MessageSquare className="size-4 hover:text-primary transition-colors cursor-pointer" />
                              <Bookmark className="size-4 hover:text-primary transition-colors cursor-pointer" />
                           </div>
                        </div>
                     </div>
                  </article>
               )) : isloading ? (
                  Array(6).fill(0).map((_, i) => (
                     <div key={i} className="flex flex-col bg-muted/20 border border-border rounded-[2.5rem] overflow-hidden animate-pulse min-h-[450px]">
                        <div className="aspect-video bg-muted/50" />
                        <div className="p-8 space-y-4">
                           <div className="h-4 w-1/3 bg-muted rounded-full" />
                           <div className="h-8 w-full bg-muted rounded-xl" />
                           <div className="h-12 w-full bg-muted rounded-xl" />
                        </div>
                     </div>
                  ))
               ) : (
                  <div className="col-span-full py-32 text-center opacity-40 italic">
                     The library is currently being restocked... No insights found.
                  </div>
               )}
            </div>


         </section>

         {/* Footer Strip */}
         <section className="bg-card/20 border-t border-border py-12">
            <div className="container mx-auto px-10 flex flex-col md:flex-row justify-between items-center gap-6">
               <p className="text-sm font-medium text-muted-foreground/60">Copyright © 2026 NexusUI Technical Insights. All rights reserved.</p>
               <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-muted-foreground/40">
                  <span className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</span>
                  <span className="hover:text-primary cursor-pointer transition-colors">Usage Terms</span>
               </div>
            </div>
         </section>

      </main>
   );
}
