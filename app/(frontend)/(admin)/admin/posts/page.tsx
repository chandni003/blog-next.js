"use client";

import Link from "next/link";
import PostListView from "./components/PostListView";
import { CirclePlus, BookOpen, Search } from "lucide-react";
import { usePost } from "@/lib/firebase/post/read";

export default function AdminPostsPage() {
  const { data: posts } = usePost();

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
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 h-10 px-4 bg-card border border-border rounded-lg text-muted-foreground">
            <Search className="size-4 shrink-0" />
            <input type="text" placeholder="Search articles..." className="bg-transparent text-sm focus:outline-none w-40" />
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
          { label: "Published", value: posts?.length || 0, icon: BookOpen },
          { label: "Drafts", value: 0, icon: BookOpen },
        ].map((s) => (
          <div key={s.label} className="p-5 bg-card border border-border rounded-xl">
            <p className="text-2xl font-black text-foreground">{s.value}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* List */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">All Articles</h2>
        </div>
        <PostListView />
      </div>

    </main>
  );
}