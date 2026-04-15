"use client";

import { useCategories } from "@/lib/firebase/category/read";
import Link from "next/link";
import { Layers3, ChevronRight, Hash, Bookmark, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CategoriesPage() {
  const { data: categories, isloading } = useCategories();

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300 pb-32">
      
      {/* Header Section */}
      <section className="border-b border-border bg-card/10 pt-20 pb-16 lg:pt-32 lg:pb-24">
         <div className="container mx-auto px-6 lg:px-10">
            <div className="max-w-3xl space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
                  <Activity className="size-3" /> Taxonomy Discovery
                </div>
                <h1 className="text-4xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
                  Content <span className="text-primary italic">Topography</span>
                </h1>
                <p className="text-muted-foreground text-md lg:text-lg max-w-xl font-medium leading-relaxed">
                  Navigate through our specialized technical domains. Each category is a curated collection of deep architecture reviews and development strategies.
                </p>
            </div>
         </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-6 lg:px-10 py-20 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {!isloading && categories?.length > 0 ? categories.map((category:any) => (
            <CategoryCard key={category.id} category={category} />
          )) : isloading ? (
             Array(6).fill(0).map((_, i) => (
               <div key={i} className="h-64 rounded-[2.5rem] bg-muted/20 border border-border animate-pulse shadow-sm" />
             ))
          ) : (
            <div className="col-span-full py-32 text-center opacity-30 italic font-medium">
               Mapping the topography... No categories detected yet.
            </div>
          )}
        </div>
      </section>


    </main>
  );
}

function CategoryCard({ category }: { category: any }) {
  return (
    <Link href={`/categories/${category?.id}`} className="group relative block h-full">
      <div className="h-full px-8 py-10 rounded-[2.5rem] bg-card/40 border border-border hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 overflow-hidden flex flex-col gap-8">
        
        {/* Subtle Glow Over */}
        <div className="absolute top-0 right-0 size-32 bg-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="flex justify-between items-start relative z-10">
            <div className="size-16 rounded-[1.2rem] bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Layers3 className="size-8 text-primary group-hover:rotate-6 transition-transform" />
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-muted rounded-full text-[10px] font-bold text-muted-foreground/60 tracking-widest">
               <Hash className="size-3" /> 0 {category?.length > 0 ? category.length : "8"}
            </div>
        </div>

        <div className="space-y-4 relative z-10">
          <h3 className="text-3xl font-bold tracking-tight group-hover:text-primary transition-colors">
            {category?.name}
          </h3>
          <p className="text-muted-foreground text-sm font-medium leading-relaxed opacity-80 min-h-[3rem] line-clamp-2">
            Dive into specialized documentation and strategy guides dedicated to {category?.name.toLowerCase()} architecture.
          </p>
        </div>

        <div className="mt-auto pt-6 flex items-center justify-between border-t border-border relative z-10">
            <span className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest group-hover:gap-3 transition-all">
               Explore Domain <ChevronRight className="size-4" />
            </span>
            <Bookmark className="size-5 text-muted-foreground/30 hover:text-primary transition-colors cursor-pointer" />
        </div>
      </div>
    </Link>
  );
}