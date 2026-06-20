"use client";

import { usePost } from "@/lib/firebase/post/read";
import { useCategories } from "@/lib/firebase/category/read";
import { useAuth } from "@/lib/context/AuthContext";
import { deletePost } from "@/lib/firebase/post/write";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  FileText,
  PenLine,
  Trash2,
  ExternalLink,
  Clock,
  AlertTriangle,
  PenTool,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function MyPostsPage() {
  const { user } = useAuth();
  // Fetch all posts then filter by this user's email OR uid
  // (covers old posts without authorEmail + new posts with it)
  const { data: allPosts, isloading } = usePost();
  const myPosts = (allPosts || []).filter(
    (p: any) => p.authorEmail === user?.email || p.authorId === user?.uid
  );
  const { data: categories } = useCategories();
  const router = useRouter();

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");

  const filtered = (myPosts || []).filter((p: any) => {
    const matchesSearch = (p.name || p.title || "").toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deletePost(id);
      setConfirmDeleteId(null);
    } catch (e: any) {
      alert("Failed to delete: " + e.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight">My Posts</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {myPosts.length} post{myPosts.length !== 1 ? "s" : ""} published
          </p>
        </div>
        <Link href="/dashboard/create-post">
          <Button className="rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 border-none gap-2">
            <PenTool className="size-4" /> Write New Post
          </Button>
        </Link>
      </div>

      {/* Search and Tabs */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search your posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-background border border-border rounded-2xl pl-11 pr-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-muted-foreground/50"
          />
        </div>
        <div className="flex bg-muted/50 p-1.5 rounded-2xl border border-border w-full sm:w-auto overflow-x-auto custom-scrollbar">
          {(["all", "published", "draft"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={cn(
                "flex-1 sm:flex-none px-6 py-2.5 text-xs font-bold uppercase tracking-widest rounded-xl transition-all whitespace-nowrap",
                statusFilter === tab 
                  ? "bg-background text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Posts List */}
      <div className="bg-background border border-border rounded-2xl overflow-hidden shadow-sm">
        {isloading ? (
          <div className="p-4 space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 bg-muted animate-pulse rounded-xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 flex flex-col items-center justify-center gap-3 text-center px-6">
            <div className="size-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
              <PenTool className="size-6 text-orange-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">
                {search ? "No matching posts" : "No posts yet"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {search
                  ? "Try a different search term."
                  : "Start writing to see your posts here."}
              </p>
            </div>
            {!search && (
              <Link href="/dashboard/create-post">
                <Button
                  size="sm"
                  className="mt-1 rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 border-none px-6"
                >
                  Write your first post
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="divide-y divide-border">
            {/* Table Header */}
            <div className="hidden sm:grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-5 py-3 bg-muted/30">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground w-12">Cover</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Title</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground w-24 text-center">Category</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground w-24 text-center">Date</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground w-24 text-center">Actions</span>
            </div>

            {filtered.map((post: any) => {
              const cat = categories?.find((c: any) => c.id === post.categoryId);
              const isDeleting = deletingId === post.id;
              const isConfirming = confirmDeleteId === post.id;

              return (
                <div key={post.id}>
                  {/* Confirm Delete Banner */}
                  {isConfirming && (
                    <div className="flex items-center justify-between gap-4 px-5 py-3 bg-red-50 dark:bg-red-950/20 border-b border-red-200 dark:border-red-900">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="size-4 text-red-500 shrink-0" />
                        <p className="text-xs font-semibold text-red-600 dark:text-red-400">
                          Delete <span className="font-black">"{post.name || post.title}"</span>? This cannot be undone.
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setConfirmDeleteId(null)}
                          className="h-7 text-xs rounded-full"
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleDelete(post.id)}
                          disabled={isDeleting}
                          className="h-7 text-xs rounded-full bg-red-500 hover:bg-red-600 text-white border-none"
                        >
                          {isDeleting ? "Deleting..." : "Yes, Delete"}
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Row */}
                  <div
                    className={cn(
                      "grid grid-cols-1 sm:grid-cols-[auto_1fr_auto_auto_auto] gap-4 items-center px-5 py-4 hover:bg-muted/30 transition-colors",
                      isDeleting && "opacity-50 pointer-events-none"
                    )}
                  >
                    {/* Thumbnail */}
                    <div className="size-12 bg-muted rounded-xl overflow-hidden shrink-0">
                      {post.thumbnailUrl ? (
                        <img src={post.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-orange-500/10 flex items-center justify-center">
                          <FileText className="size-4 text-orange-400" />
                        </div>
                      )}
                    </div>

                    {/* Title + slug */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-semibold text-sm text-foreground line-clamp-1">
                          {post.name || post.title}
                        </p>
                        {post.status === "draft" && (
                          <span className="px-2 py-0.5 bg-zinc-500/10 text-zinc-500 border border-zinc-500/20 text-[9px] font-black uppercase tracking-widest rounded-md shrink-0">
                            Draft
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground font-mono truncate">
                        /{post.slug || post.id}
                      </p>
                    </div>

                    {/* Category */}
                    <div className="w-24 text-center">
                      {cat ? (
                        <span className="text-[10px] font-bold px-2.5 py-1 bg-violet-500/10 text-violet-600 dark:text-violet-400 rounded-full">
                          {cat.name}
                        </span>
                      ) : (
                        <span className="text-[10px] text-muted-foreground">—</span>
                      )}
                    </div>

                    {/* Date */}
                    <div className="w-24 flex items-center justify-center gap-1 text-[11px] text-muted-foreground">
                      <Clock className="size-3 shrink-0" />
                      {post.timestamp?.toDate?.()?.toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                      }) || "—"}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-center gap-1.5 w-24">
                      {/* View */}
                      <Link href={`/blogs/${post.slug || post.id}`} target="_blank">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 rounded-full text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10"
                          title="View post"
                        >
                          <ExternalLink className="size-4" />
                        </Button>
                      </Link>

                      {/* Edit → goes to create-post with ?id= */}
                      <Link href={`/dashboard/create-post?id=${post.slug || post.id}`}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 rounded-full text-muted-foreground hover:text-orange-500 hover:bg-orange-500/10"
                          title="Edit post"
                        >
                          <PenLine className="size-4" />
                        </Button>
                      </Link>

                      {/* Delete */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setConfirmDeleteId(post.id)}
                        disabled={isDeleting}
                        className="size-8 rounded-full text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
                        title="Delete post"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Summary footer */}
      {filtered.length > 0 && (
        <p className="text-xs text-muted-foreground text-center">
          Showing {filtered.length} of {myPosts.length} post{myPosts.length !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}
