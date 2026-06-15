"use client";

import { usePost } from "@/lib/firebase/post/read";
import { Bookmark, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { stripHtml } from "@/lib/utils";
import { motion } from "framer-motion";

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

export default function PostsPage() {
  const { data: posts, isloading } = usePost();

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 max-w-4xl pt-16 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Latest Posts</h1>
          <p className="text-muted-foreground text-lg font-serif">Explore all our recent technical insights and articles.</p>
        </motion.div>

        {/* Dynamic Post Feed (Framer Motion) */}
        <div className="space-y-12">
          {!isloading && posts?.length > 0 ? (
            <motion.div variants={container} initial="hidden" animate="show" className="space-y-12">
              {posts.map((post: any) => (
                <motion.article variants={item} key={post.id} className="group flex flex-col-reverse md:flex-row gap-6 md:gap-12 items-start md:items-center">
                  <div className="flex-1 space-y-2 w-full">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <div className="size-5 rounded-full bg-muted flex items-center justify-center font-bold text-[8px] text-foreground">
                        {post?.authorId?.substring(0, 2)?.toUpperCase() || "A"}
                      </div>
                      <span className="font-semibold text-foreground">{post?.authorId || "Admin"}</span>
                      <span>in</span>
                      <span className="font-semibold text-foreground">{post?.categoryId || "Technology"}</span>
                    </div>
                    <Link href={`/blogs/${post.id}`} className="block space-y-2">
                      <h2 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                        {post.name}
                      </h2>
                      <p className="text-muted-foreground line-clamp-2 leading-relaxed font-serif">
                        {stripHtml(post.shortDescription)}
                      </p>
                    </Link>
                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{post.timestamp?.toDate()?.toLocaleDateString()}</span>
                        <span>·</span>
                        <span>5 min read</span>
                        <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-muted/50 ml-2">Technology</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <button className="hover:text-foreground transition-colors">
                          <Bookmark className="size-5 stroke-[1.5]" />
                        </button>
                        <button className="hover:text-foreground transition-colors">
                          <MoreHorizontal className="size-5 stroke-[1.5]" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Thumbnail Image */}
                  <div className="w-full md:w-[200px] aspect-[16/10] shrink-0 overflow-hidden bg-muted rounded-sm relative mt-4 md:mt-0">
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
            </motion.div>
          ) : isloading ? (
            Array(5).fill(0).map((_, i) => (
              <div key={i} className="flex flex-col-reverse md:flex-row gap-6 md:gap-12 animate-pulse">
                <div className="flex-1 space-y-4">
                  <div className="h-4 w-1/4 bg-muted rounded-sm" />
                  <div className="h-6 w-full bg-muted rounded-sm" />
                  <div className="h-10 w-full bg-muted rounded-sm" />
                </div>
                <div className="w-full md:w-[200px] aspect-[16/10] bg-muted rounded-sm" />
              </div>
            ))
          ) : (
            <div className="py-20 text-center opacity-50 italic">No posts found.</div>
          )}
        </div>
      </div>
    </main>
  );
}
