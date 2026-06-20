"use client";

import { usePost } from "@/lib/firebase/post/read";
import { useCategories } from "@/lib/firebase/category/read";
import Link from "next/link";
import { stripHtml, calculateReadingTime } from "@/lib/utils";
import { Clock, Hash, Search, X, ChevronLeft, ChevronRight, BookOpen, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";

const POSTS_PER_PAGE = 20;

export default function BlogsPage() {
  const { data: allFetchedPosts, isloading } = usePost();
  const { data: categories, isloading: categoriesLoading } = useCategories();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Filter posts client-side to avoid Firebase query indexing issues
  const allPosts = useMemo(() => {
    if (!allFetchedPosts) return [];
    return allFetchedPosts.filter((p: any) => p.status === "published");
  }, [allFetchedPosts]);

  const filteredPosts = useMemo(() => {
    if (!allPosts) return [];
    let results = [...allPosts];

    if (selectedCategory) {
      results = results.filter((p: any) =>
        (p.categoryId ?? "").toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter((p: any) =>
        (p.name ?? "").toLowerCase().includes(q) ||
        stripHtml(p.shortDescription).toLowerCase().includes(q) ||
        stripHtml(p.content).toLowerCase().includes(q)
      );
    }

    return results;
  }, [allPosts, searchQuery, selectedCategory]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleCategorySelect = (id: string | null) => {
    setSelectedCategory(prev => (prev === id ? null : id));
    setCurrentPage(1);
  };

  const handleSearch = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setCurrentPage(1);
  };

  const activeFilterCount = (searchQuery.trim() ? 1 : 0) + (selectedCategory ? 1 : 0);

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl pt-6 pb-24">

        {/* ── PAGE HEADER ── */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-1">All Posts</h1>
          <p className="text-sm text-muted-foreground">
            {isloading ? "Loading..." : `${filteredPosts.length} article${filteredPosts.length !== 1 ? "s" : ""} found`}
          </p>
        </div>

        {/* ── SEARCH + FILTER BAR ── */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-3">
            {/* Search input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full h-10 pl-10 pr-10 text-sm bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 h-10 px-4 rounded-lg border text-sm font-semibold transition-all ${
                showFilters || activeFilterCount > 0
                  ? "bg-foreground text-background border-foreground"
                  : "bg-card border-border text-foreground hover:bg-muted"
              }`}
            >
              <SlidersHorizontal className="size-4" />
              <span className="hidden sm:inline">Filter</span>
              {activeFilterCount > 0 && (
                <span className="size-5 flex items-center justify-center text-[10px] font-bold rounded-full bg-background text-foreground">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Category filter chips */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pt-2 pb-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                    Filter by Topic
                  </p>
                  {categoriesLoading ? (
                    <div className="flex flex-wrap gap-2">
                      {Array(5).fill(0).map((_, i) => (
                        <div key={i} className="h-8 w-20 bg-muted rounded-full animate-pulse" />
                      ))}
                    </div>
                  ) : categories && categories.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat: any) => {
                        const id = cat.id || cat.slug;
                        const isActive = selectedCategory === id;
                        return (
                          <button
                            key={id}
                            onClick={() => handleCategorySelect(id)}
                            className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-full border transition-all ${
                              isActive
                                ? "bg-foreground text-background border-foreground"
                                : "bg-card border-border text-foreground hover:bg-muted"
                            }`}
                          >
                            <Hash className="size-3" />
                            {cat.name}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground italic">No topics available.</p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active filter tags */}
          {activeFilterCount > 0 && (
            <div className="flex items-center gap-2 flex-wrap text-xs">
              {selectedCategory && (
                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-muted border border-border font-medium">
                  #{selectedCategory}
                  <button onClick={() => handleCategorySelect(null)} className="ml-1 text-muted-foreground hover:text-foreground">
                    <X className="size-3" />
                  </button>
                </span>
              )}
              {searchQuery.trim() && (
                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-muted border border-border font-medium">
                  "{searchQuery}"
                  <button onClick={() => handleSearch("")} className="ml-1 text-muted-foreground hover:text-foreground">
                    <X className="size-3" />
                  </button>
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* ── POST LIST ── */}
        {isloading ? (
          <div className="divide-y divide-border">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="py-6 flex gap-6 animate-pulse">
                <div className="flex-1 space-y-3">
                  <div className="h-3 w-1/5 bg-muted rounded" />
                  <div className="h-5 w-4/5 bg-muted rounded" />
                  <div className="h-3 w-3/4 bg-muted rounded" />
                  <div className="h-3 w-1/4 bg-muted rounded" />
                </div>
                <div className="w-24 h-20 bg-muted rounded-lg shrink-0" />
              </div>
            ))}
          </div>
        ) : paginatedPosts.length > 0 ? (
          <div className="divide-y divide-border">
            {paginatedPosts.map((post: any, idx: number) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className="py-6 group flex items-start gap-6"
              >
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {post.categoryId && (
                      <>
                        <Hash className="size-3" />
                        <button
                          onClick={() => handleCategorySelect(post.categoryId)}
                          className="hover:text-foreground transition-colors"
                        >
                          {post.categoryId}
                        </button>
                        <span className="opacity-30">·</span>
                      </>
                    )}
                    <span>{post.authorName || post.authorId}</span>
                  </div>
                  <Link href={`/blogs/${post.id}`} className="block">
                    <h2 className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                      {post.name}
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mt-1">
                      {stripHtml(post.shortDescription) || stripHtml(post.content)}
                    </p>
                  </Link>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-medium">
                    <span>{post.timestamp?.toDate()?.toLocaleDateString()}</span>
                    <span className="opacity-40">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" />
                      {calculateReadingTime(post.content)} min read
                    </span>
                  </div>
                </div>

                {post.thumbnailUrl ? (
                  <Link href={`/blogs/${post.id}`} className="shrink-0">
                    <div className="w-24 h-20 overflow-hidden rounded-lg bg-muted">
                      <img
                        src={post.thumbnailUrl}
                        alt={post.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                ) : (
                  <div className="w-24 h-20 shrink-0 overflow-hidden rounded-lg bg-muted/50 flex items-center justify-center">
                    <BookOpen className="size-6 text-muted-foreground/30" />
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center space-y-3">
            <Search className="size-10 text-muted-foreground/30 mx-auto" />
            <p className="text-base font-semibold text-foreground">No results found</p>
            <p className="text-sm text-muted-foreground">
              Try a different search term or clear the filters.
            </p>
            <button
              onClick={clearFilters}
              className="mt-2 text-sm font-semibold text-primary underline underline-offset-2"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* ── PAGINATION ── */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-lg border border-border bg-card hover:bg-muted disabled:opacity-40 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft className="size-4" /> Prev
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`size-9 text-sm font-semibold rounded-lg transition-all ${
                        page === currentPage
                          ? "bg-foreground text-background"
                          : "border border-border bg-card hover:bg-muted text-foreground"
                      }`}
                    >
                      {page}
                    </button>
                  );
                }
                if (page === currentPage - 2 || page === currentPage + 2) {
                  return <span key={page} className="text-muted-foreground px-1">…</span>;
                }
                return null;
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-lg border border-border bg-card hover:bg-muted disabled:opacity-40 disabled:pointer-events-none transition-colors"
            >
              Next <ChevronRight className="size-4" />
            </button>
          </div>
        )}

        {/* Pagination info */}
        {filteredPosts.length > 0 && (
          <p className="text-center text-[11px] text-muted-foreground mt-4">
            Showing {(currentPage - 1) * POSTS_PER_PAGE + 1}–
            {Math.min(currentPage * POSTS_PER_PAGE, filteredPosts.length)} of {filteredPosts.length} posts
          </p>
        )}

      </div>
    </main>
  );
}
