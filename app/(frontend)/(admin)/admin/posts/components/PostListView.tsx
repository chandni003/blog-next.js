"use client";

import Link from "next/link";
import { Edit3, ExternalLink, FileText, BookOpen, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PostListView({ data, error, isloading }: { data: any[], error: any, isloading: boolean }) {

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

          {/* Slug & Status */}
          <div className="flex flex-col gap-1.5 w-fit max-w-full">
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-mono bg-muted/50 px-3 py-1 rounded-lg border border-border/50 truncate">
              <ExternalLink className="size-3 shrink-0" />
              <span className="truncate">{item?.slug || item?.id?.slice(0, 12)}</span>
            </div>
            <span className={cn(
              "text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border w-fit",
              item?.status === "draft" 
                ? "bg-amber-500/10 text-amber-600 border-amber-500/20" 
                : "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
            )}>
              {item?.status === "draft" ? "Draft" : "Published"}
            </span>
          </div>

          {/* Action */}
          <Link
            href={`/dashboard/create-post?id=${item?.slug || item?.id}`}
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