"use client";

import { motion } from "framer-motion";
import { Share2, Bookmark, MessageCircle, MoreHorizontal } from "lucide-react";

export function ClientArticle({ post, authorName, authorInitials }: { post: any, authorName: string, authorInitials: string }) {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="container mx-auto px-4 sm:px-6 pt-16 max-w-[680px]"
    >
      
      {/* Title & Description */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] text-foreground mb-4">
          {post?.name}
        </h1>
        {post?.shortDescription && (
          <p className="text-xl text-muted-foreground leading-relaxed font-serif">
            {post.shortDescription}
          </p>
        )}
      </div>

      {/* Author Block */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-full bg-muted flex items-center justify-center text-foreground font-bold shrink-0">
            {authorInitials}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{authorName}</span>
              <span className="text-green-600 text-xs font-bold px-1.5 py-0.5 rounded-full bg-green-50">Follow</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
              <span>5 min read</span>
              <span>·</span>
              <span>{post?.timestamp?.toDate()?.toLocaleDateString() || "Recently"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="flex items-center justify-between border-y border-border py-3 mb-10 text-muted-foreground">
        <div className="flex items-center gap-6">
          <button aria-label="Like" className="flex items-center gap-2 hover:text-foreground transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="size-6"><path d="M11.996 22c-2.34-3.13-9.5-10.42-9.5-14.5A4.5 4.5 0 0 1 6.996 3a4.5 4.5 0 0 1 5 3 4.5 4.5 0 0 1 5-3 4.5 4.5 0 0 1 4.5 4.5c0 4.08-7.16 11.37-9.5 14.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            <span className="text-sm">24</span>
          </button>
          <button aria-label="Comment" className="flex items-center gap-2 hover:text-foreground transition-colors">
            <MessageCircle className="size-6 stroke-[1.5]" />
            <span className="text-sm">12</span>
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button aria-label="Save" className="hover:text-foreground transition-colors">
            <Bookmark className="size-6 stroke-[1.5]" />
          </button>
          <button aria-label="Share" className="hover:text-foreground transition-colors">
            <Share2 className="size-6 stroke-[1.5]" />
          </button>
          <button aria-label="More" className="hover:text-foreground transition-colors">
            <MoreHorizontal className="size-6 stroke-[1.5]" />
          </button>
        </div>
      </div>

      {/* Featured Image */}
      {post?.thumbnailUrl && (
        <motion.figure 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-14"
        >
          <img
            src={post.thumbnailUrl}
            alt={post.name}
            loading="lazy"
            className="w-full h-auto max-h-[600px] object-cover rounded-sm"
          />
        </motion.figure>
      )}

      {/* Article Body */}
      <div
        className="prose-content font-serif text-[21px] leading-[1.58] text-[#242424] break-words"
        dangerouslySetInnerHTML={{ __html: post?.content || "" }}
      />

    </motion.article>
  );
}
