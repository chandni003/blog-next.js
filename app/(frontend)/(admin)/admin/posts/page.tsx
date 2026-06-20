"use client";

import { useState } from "react";
import Link from "next/link";
import PostListView from "./components/PostListView";
import { CirclePlus, BookOpen, Search } from "lucide-react";
import { usePost } from "@/lib/firebase/post/read";
import { cn } from "@/lib/utils";

export default function AdminPostsPage() {
  const { data: posts, error, isloading } = usePost();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");

  const filtered = (posts || []).filter((p: any) => {
    const matchesSearch = (p.name || p.title || "").toLowerCase().includes(search.toLowerCase());
    const postStatus = p.status || "published"; // older posts default to published
    const matchesStatus = statusFilter === "all" || postStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <main className="flex min-h-screen flex-col gap-8 p-6 lg:p-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-foreground">Content Library</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {posts ? `${posts.length} article${posts.length !== 1 ? "s" : ""}` : "Loading..."} published
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center gap-2 h-10 px-4 bg-card border border-border rounded-lg text-muted-foreground w-full sm:w-auto">
            <Search className="size-4 shrink-0" />
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm focus:outline-none w-full sm:w-40" 
            />
          </div>
          <div className="flex bg-muted/50 p-1 rounded-lg border border-border w-full sm:w-auto">
            {(["all", "published", "draft"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={cn(
                  "flex-1 sm:flex-none px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-md transition-all",
                  statusFilter === tab 
                    ? "bg-background text-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
          <Link
            href="/dashboard/create-post"
            className="flex items-center gap-2 h-10 px-5 bg-foreground text-background text-sm font-semibold rounded-lg hover:opacity-85 transition-opacity"
          >
            <CirclePlus className="size-4" />
            New Post
          </Link>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total", value: posts?.length || 0, icon: BookOpen },
          { label: "Published", value: posts?.filter((p: any) => p.status === "published" || !p.status).length || 0, icon: BookOpen },
          { label: "Drafts", value: posts?.filter((p: any) => p.status === "draft").length || 0, icon: BookOpen },
        ].map((s) => (
          <div key={s.label} className="p-5 bg-card border border-border rounded-xl">
            <p className="text-2xl font-black text-foreground">{s.value}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* List */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex justify-between items-center">
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">All Articles</h2>
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
            Showing {filtered.length} results
          </span>
        </div>
        <PostListView data={filtered} error={error} isloading={isloading} />
      </div>

    </main>
  );
}