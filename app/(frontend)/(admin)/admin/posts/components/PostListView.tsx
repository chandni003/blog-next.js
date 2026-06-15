"use client";

import { usePost } from "@/lib/firebase/post/read";
import Link from "next/link";
import { Edit3, ExternalLink, FileText, BookOpen, Loader2, AlertCircle } from "lucide-react";

export default function PostListView() {
  const { data, error, isloading } = usePost();

  if (isloading) {
    return (
      <div className="divide-y divide-border">
        {Array(6).fill(0).map((_, i) => (
          <div key={i} className="p-5 flex gap-4 animate-pulse">
            <div className="size-10 bg-muted rounded-lg shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted rounded w-2/3" />
              <div className="h-3 bg-muted rounded w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-3 p-6 m-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
        <AlertCircle className="size-4 shrink-0" />
        <p>{error}</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="py-20 text-center space-y-3">
        <FileText className="size-10 text-muted-foreground/30 mx-auto" strokeWidth={1.5} />
        <p className="font-semibold text-foreground text-sm">No articles yet</p>
        <p className="text-xs text-muted-foreground">Start by creating your first blog post.</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-border">
      {/* Table header */}
      <div className="hidden md:grid grid-cols-[2fr_1fr_auto] gap-4 px-6 py-3 bg-muted/30">
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Article</span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Slug</span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground w-24 text-right">Action</span>
      </div>

      {data.map((item: any, key: number) => (
        <div key={item?.id} className="group px-6 py-4 flex flex-col md:grid md:grid-cols-[2fr_1fr_auto] gap-3 md:gap-4 items-start md:items-center hover:bg-muted/20 transition-colors">
          
          {/* Article info */}
          <div className="flex items-center gap-4 min-w-0">
            <div className="size-10 shrink-0 rounded-lg bg-muted overflow-hidden">
              {item?.thumbnailUrl
                ? <img src={item.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center"><BookOpen className="size-4 text-muted-foreground/30" /></div>
              }
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{item?.name}</p>
              <p className="text-[10px] text-muted-foreground font-mono mt-0.5 truncate">
                {item?.timestamp?.toDate?.()?.toLocaleDateString() || ""}
              </p>
            </div>
          </div>

          {/* Slug */}
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-mono bg-muted/50 px-3 py-1 rounded-lg border border-border/50 w-fit max-w-full truncate">
            <ExternalLink className="size-3 shrink-0" />
            <span className="truncate">{item?.slug || item?.id?.slice(0, 12)}</span>
          </div>

          {/* Action */}
          <Link
            href={`/admin/posts/form?id=${item?.id}`}
            className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground border border-border hover:border-foreground/20 px-3 py-1.5 rounded-lg transition-all w-fit"
          >
            <Edit3 className="size-3" />
            Edit
          </Link>
        </div>
      ))}
    </div>
  );
}