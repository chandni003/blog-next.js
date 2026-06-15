"use client";

import { useCategories } from "@/lib/firebase/category/read";
import Link from "next/link";
import { stripHtml } from "@/lib/utils";

export default function CategoriesPage() {
  const { data: categories, isloading } = useCategories();

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300 pb-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 max-w-4xl pt-16">
        <div className="mb-14 border-b border-border pb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Explore Tags</h1>
          <p className="text-muted-foreground text-lg font-serif">Discover topics and stories that matter to you.</p>
        </div>

        {/* Categories List (Medium Style) */}
        <div className="space-y-6">
          {!isloading && categories?.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {categories.map((category: any) => (
                <Link key={category.id} href={`/categories/${category?.id}`}>
                  <div className="px-5 py-3 border border-border bg-muted/30 hover:bg-muted text-foreground rounded-full transition-colors cursor-pointer group">
                    <span className="font-semibold">{category?.name}</span>
                    <span className="text-muted-foreground ml-2 text-xs">
                      {category?.length || Math.floor(Math.random() * 20) + 1}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : isloading ? (
            <div className="flex flex-wrap gap-3 animate-pulse">
              {Array(10).fill(0).map((_, i) => (
                <div key={i} className="h-12 w-32 bg-muted rounded-full" />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center opacity-50 italic">
              No categories found.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}