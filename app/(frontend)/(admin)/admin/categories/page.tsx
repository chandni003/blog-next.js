"use client";

import { CirclePlus, Layers, Search, ListFilter, Tag } from "lucide-react";
import Link from "next/link";
import CategoriesListView from "./components/categoriesListView";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col gap-8 p-6 lg:p-10 transition-colors duration-300">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 shadow-sm">
            <Layers className="text-primary size-7" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Taxonomy Editor</h1>
            <p className="text-sm text-muted-foreground mt-1 font-medium">
              Organize and classify your blog content categories
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Search Bar - Visual Consistency */}
          <div className="hidden sm:flex items-center gap-3 px-5 py-2.5 bg-card border border-border rounded-full text-muted-foreground focus-within:border-primary/50 transition-all shadow-sm">
            <Search className="size-4" />
            <input 
              type="text" 
              placeholder="Filter categories..." 
              className="bg-transparent border-none text-xs focus:outline-none placeholder:text-muted-foreground/50 w-36 font-medium"
            />
          </div>

          <Link href={`/dashboard/create-category`} passHref>
            <Button 
              size="lg" 
              className="rounded-full gap-2 font-bold shadow-lg shadow-primary/20 h-12 px-6"
            >
              <CirclePlus className="size-5" />
              Add Category
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-3xl bg-card border border-border flex flex-col gap-2 shadow-sm hover:border-primary/20 transition-all">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <Tag className="size-3 text-primary" /> Active Categories
          </span>
          <span className="text-3xl font-bold text-foreground">12</span>
        </div>
      </div>

      {/* Table Container */}
      <section className="bg-card/50 backdrop-blur-sm border border-border rounded-[2.5rem] overflow-hidden shadow-xl transition-all">
        <div className="p-6 border-b border-border bg-muted/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="size-2 rounded-full bg-primary animate-pulse" />
             <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Classification Database</h2>
          </div>
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground gap-2 hover:text-primary rounded-full px-4">
            <ListFilter className="size-3" /> Sort View
          </Button>
        </div>
        
        <div className="p-4">
          <CategoriesListView />
        </div>
      </section>

    </main>
  );
}