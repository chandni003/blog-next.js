"use client";

import { usePost } from "@/lib/firebase/post/read";
import Link from "next/link";
import { stripHtml } from "@/lib/utils";
import { motion } from "framer-motion";
import { Bookmark, MoreHorizontal } from "lucide-react";

const container: any = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item: any = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function BlogHome() {
  const { data: posts, isloading } = usePost();

  const featuredPost = posts?.[0];
  const remainingPosts = posts?.slice(1, 11) || []; // Next 10 posts

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 max-w-7xl pt-10 pb-20">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Main Content Area */}
          <div className="flex-1 space-y-16">
            
            {/* FEATURED POST */}
            {isloading ? (
              <div className="space-y-4 animate-pulse">
                <div className="w-full aspect-[2/1] bg-muted rounded-md" />
                <div className="h-8 w-3/4 bg-muted rounded-sm" />
                <div className="h-4 w-full bg-muted rounded-sm" />
              </div>
            ) : featuredPost ? (
              <motion.article 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="group space-y-5"
              >
                <Link href={`/blogs/${featuredPost.id}`}>
                  <div className="w-full aspect-[2/1] md:aspect-[2.5/1] overflow-hidden bg-muted rounded-md mb-6 relative">
                    {featuredPost.thumbnailUrl ? (
                      <img
                        src={featuredPost.thumbnailUrl}
                        alt={featuredPost.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted/50" />
                    )}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors mb-3">
                    {featuredPost.name}
                  </h1>
                  <p className="text-muted-foreground text-lg line-clamp-3 md:line-clamp-4 leading-relaxed font-serif">
                    {stripHtml(featuredPost.shortDescription) || "A deep dive into our latest insights..."}
                  </p>
                </Link>
                <div className="flex items-center gap-2 pt-2 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Admin</span>
                  <span>·</span>
                  <span>{featuredPost.timestamp?.toDate()?.toLocaleDateString() || "Recent"}</span>
                  <span>·</span>
                  <span>5 min read</span>
                </div>
              </motion.article>
            ) : (
              <div className="py-20 text-center opacity-50 italic">No stories published yet.</div>
            )}

            <hr className="border-border" />

            {/* RECENT POSTS FEED */}
            <motion.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-12"
            >
              {remainingPosts.map((post: any) => (
                <motion.article variants={item} key={post.id} className="group flex flex-col-reverse md:flex-row gap-6 md:gap-8 items-start md:items-center">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <span className="font-semibold text-foreground">Admin</span>
                      <span>in</span>
                      <span className="font-semibold text-foreground">Technology</span>
                    </div>
                    <Link href={`/blogs/${post.id}`} className="block space-y-2">
                      <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                        {post.name}
                      </h2>
                      <p className="text-muted-foreground line-clamp-2 leading-relaxed font-serif">
                        {stripHtml(post.shortDescription)}
                      </p>
                    </Link>
                    <div className="flex items-center gap-2 pt-2 text-xs text-muted-foreground">
                      <span>{post.timestamp?.toDate()?.toLocaleDateString()}</span>
                      <span>·</span>
                      <span>4 min read</span>
                    </div>
                  </div>
                  
                  {/* Thumbnail for list item */}
                  <div className="w-full md:w-48 aspect-[16/10] shrink-0 overflow-hidden bg-muted rounded-md relative">
                    <Link href={`/blogs/${post.id}`}>
                      {post.thumbnailUrl ? (
                        <img
                          src={post.thumbnailUrl}
                          alt={post.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted/50" />
                      )}
                    </Link>
                  </div>
                </motion.article>
              ))}
              
              {remainingPosts.length === 0 && !isloading && featuredPost && (
                <div className="py-10 text-center opacity-50 italic">You've reached the end of the feed.</div>
              )}
            </motion.div>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="w-full lg:w-[320px] shrink-0 border-t lg:border-t-0 lg:border-l border-border pt-10 lg:pt-0 lg:pl-10 space-y-10">
            <div>
              <h3 className="font-bold text-sm uppercase tracking-widest text-foreground mb-6">Discover more of what matters to you</h3>
              <div className="flex flex-wrap gap-2">
                {["Technology", "Programming", "Design", "Productivity", "Machine Learning", "Cloud", "Business"].map((tag) => (
                  <span key={tag} className="px-4 py-2 bg-muted/50 hover:bg-muted text-sm text-foreground rounded-full cursor-pointer transition-colors border border-transparent hover:border-border">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <hr className="border-border" />

            <div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
                <Link href="#" className="hover:text-foreground transition-colors">Help</Link>
                <Link href="#" className="hover:text-foreground transition-colors">Status</Link>
                <Link href="#" className="hover:text-foreground transition-colors">About</Link>
                <Link href="#" className="hover:text-foreground transition-colors">Careers</Link>
                <Link href="#" className="hover:text-foreground transition-colors">Blog</Link>
                <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
                <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
              </div>
            </div>
          </aside>
          
        </div>
      </div>
    </main>
  );
}