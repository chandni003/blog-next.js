"use client";

import Link from "next/link";
import { CirclePlus, Search } from "lucide-react";
import { useCategories } from "@/lib/firebase/category/read";
import CategoriesListView from "./components/categoriesListView";

export default function AdminCategoriesPage() {
  const { data: categories } = useCategories();

  return (
    <main className="flex min-h-screen flex-col gap-8 p-6 lg:p-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-foreground">Categories</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {categories ? `${categories.length} categor${categories.length !== 1 ? "ies" : "y"}` : "Loading..."} active
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 h-10 px-4 bg-card border border-border rounded-lg text-muted-foreground">
            <Search className="size-4 shrink-0" />
            <input type="text" placeholder="Filter categories..." className="bg-transparent text-sm focus:outline-none w-36" />
          </div>
          <Link
            href="/dashboard/create-category"
            className="flex items-center gap-2 h-10 px-5 bg-foreground text-background text-sm font-semibold rounded-lg hover:opacity-85 transition-opacity"
          >
            <CirclePlus className="size-4" />
            New Category
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 max-w-xs">
        <div className="p-5 bg-card border border-border rounded-xl">
          <p className="text-2xl font-black text-foreground">{categories?.length || 0}</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">Total</p>
        </div>
        <div className="p-5 bg-card border border-border rounded-xl">
          <p className="text-2xl font-black text-foreground">{categories?.length || 0}</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">Active</p>
        </div>
      </div>

      {/* List */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">All Categories</h2>
        </div>
        <CategoriesListView />
      </div>

    </main>
  );
}