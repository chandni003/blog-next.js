"use client";

import Link from "next/link";
import { Share2, ArrowLeft, Clock, Hash, PenTool } from "lucide-react";
import { calculateReadingTime } from "@/lib/utils";

export function ClientArticle({ post, authorName, authorInitials }: { post: any; authorName: string; authorInitials: string }) {
  const readingTime = calculateReadingTime(post?.content);
  const publishDate = post?.timestamp ? new Date(post.timestamp).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post?.name, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-[720px] pt-8 pb-24 overflow-x-hidden">

      {/* Back nav */}
      <div className="mb-8">
        <Link href="/blogs" className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="size-3.5" />
          All Posts
        </Link>
      </div>

      {/* Category + Meta */}
      {(post?.categoryId || post?.timestamp) && (
        <div className="flex items-center gap-3 mb-6">
          {post.categoryId && (
            <Link href={`/blogs?category=${post.categoryId}`} className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
              <Hash className="size-3" />
              {post.categoryId}
            </Link>
          )}
          {post.categoryId && publishDate && <span className="opacity-30 text-xs">·</span>}
          {publishDate && <span className="text-[10px] font-medium text-muted-foreground">{publishDate}</span>}
          <span className="opacity-30 text-xs">·</span>
          <span className="flex items-center gap-1 text-[10px] font-medium text-muted-foreground">
            <Clock className="size-3" />{readingTime} min read
          </span>
        </div>
      )}

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground leading-tight mb-4">
        {post?.name}
      </h1>

      {/* Short description */}
      {post?.shortDescription && (
        <p className="text-xl text-muted-foreground leading-relaxed mb-8 font-serif border-b border-border pb-8">
          {post.shortDescription}
        </p>
      )}

      {/* Author + Share row */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-muted flex items-center justify-center text-foreground border border-border shrink-0">
            <PenTool className="size-4" strokeWidth={2} />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">{authorName}</p>
          </div>
        </div>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg border border-border hover:bg-muted"
          aria-label="Share article"
        >
          <Share2 className="size-3.5" />
          Share
        </button>
      </div>

      {/* Featured Image */}
      {post?.thumbnailUrl && (
        <figure className="mb-10 -mx-4 sm:mx-0">
          <img
            src={post.thumbnailUrl}
            alt={post?.name || "Article image"}
            loading="lazy"
            className="w-full h-auto max-h-[520px] object-cover sm:rounded-xl"
          />
        </figure>
      )}

      {/* Article Body */}
      <div
        className="prose prose-base max-w-none text-foreground
          prose-headings:font-bold prose-headings:tracking-tight
          prose-p:leading-relaxed prose-p:text-foreground/90
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-lg prose-blockquote:border-l-2 prose-blockquote:border-border
          prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
          dark:prose-invert
          [&>*]:break-words [&>p]:overflow-hidden"
        style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
        dangerouslySetInnerHTML={{ __html: post?.content || "" }}
      />

      {/* Bottom nav */}
      <div className="mt-16 pt-8 border-t border-border flex items-center justify-between">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to all posts
        </Link>
      </div>

    </div>
  );
}
