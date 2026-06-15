import { getAllPostswithCategory } from "@/lib/firebase/post/read_server";
import { getCategory } from "@/lib/firebase/category/read_server";
import Link from "next/link";
import { Bookmark, MoreHorizontal } from "lucide-react";
import { stripHtml } from "@/lib/utils";

export default async function Page({ params }: { params: any }) {
  const { categoryId } = await params;
  const [posts, category] = await Promise.all([
    getAllPostswithCategory(categoryId),
    getCategory(categoryId),
  ]);

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300 pb-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 max-w-4xl pt-16">
        
        {/* Category Header */}
        <div className="mb-14 border-b border-border pb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-8 rounded-full bg-muted flex items-center justify-center text-foreground font-bold">
              #
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              {category?.name ?? categoryId}
            </h1>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-lg font-serif">
              {category?.description ? stripHtml(category.description) : `Latest stories and insights in ${category?.name ?? categoryId}.`}
            </p>
            <span className="text-sm font-semibold text-muted-foreground border border-border px-3 py-1 rounded-full">
              {posts?.length ?? 0} Stories
            </span>
          </div>
        </div>

        {/* Dynamic Post Feed (Medium Style) */}
        <div className="space-y-12">
          {posts && posts.length > 0 ? (
            posts.map((post: any) => (
              <article key={post.id} className="group flex flex-col-reverse md:flex-row gap-6 md:gap-12 items-start md:items-center">
                <div className="flex-1 space-y-2 w-full">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <div className="size-5 rounded-full bg-muted flex items-center justify-center font-bold text-[8px] text-foreground">
                      {post?.authorId?.substring(0, 2)?.toUpperCase() || "A"}
                    </div>
                    <span className="font-semibold text-foreground">{post?.authorId || "Admin"}</span>
                    <span>in</span>
                    <span className="font-semibold text-foreground">{category?.name ?? "Technology"}</span>
                  </div>
                  <Link href={`/posts/${post.id}`} className="block space-y-2">
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
                  <Link href={`/posts/${post.id}`}>
                    {post.thumbnailUrl ? (
                      <img
                        src={post.thumbnailUrl}
                        alt={post.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted/50" />
                    )}
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <div className="py-20 text-center opacity-50 italic">
              No stories published in this category yet.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
