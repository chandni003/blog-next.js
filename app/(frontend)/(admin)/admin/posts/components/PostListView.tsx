"use client";

import { usePost } from "@/lib/firebase/post/read";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Edit3, 
  ExternalLink, 
  FileText, 
  Hash, 
  Loader2, 
  AlertCircle 
} from "lucide-react";

export default function PostListView() {
  const { data, error, isloading } = usePost();

  if (isloading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="size-10 text-primary animate-spin" />
        <p className="text-muted-foreground font-medium animate-pulse">Retrieving articles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-3 p-6 m-6 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive">
        <AlertCircle className="size-5" />
        <p className="font-bold">{error}</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-20 bg-muted/20 rounded-[2.5rem] border border-dashed border-border">
        <FileText className="size-12 text-muted-foreground opacity-20 mx-auto mb-4" />
        <h1 className="text-muted-foreground font-bold text-xl">No articles found</h1>
        <p className="text-muted-foreground/60 text-sm mt-2">Start by creating your first blog post.</p>
      </div>
    );
  }

  return (
    <section className="w-full overflow-x-auto custom-scrollbar">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              <div className="flex items-center gap-2"><Hash className="size-3" /> ID</div>
            </th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Content Details
            </th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              URL Slug
            </th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground text-right">
              Management
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data?.map((item: any, key: any) => (
            <tr 
              key={item?.id} 
              className="group hover:bg-primary/[0.02] transition-all duration-200"
            >
              <td className="px-6 py-5 text-sm text-muted-foreground font-mono">
                {String(key + 1).padStart(2, '0')}
              </td>
              <td className="px-6 py-5">
                <div className="flex flex-col">
                  <span className="text-sm font-bold group-hover:text-primary transition-colors">
                    {item?.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground/60 mt-0.5 font-medium italic">Published Index: {item?.id?.slice(0, 8)}</span>
                </div>
              </td>
              <td className="px-6 py-5">
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground/80 bg-muted/40 w-fit px-3 py-1 rounded-lg border border-border group-hover:border-primary/20 font-mono transition-all">
                  <ExternalLink className="size-3 text-muted-foreground/40 group-hover:text-primary/70" />
                  {item?.slug}
                </div>
              </td>
              <td className="px-6 py-5 text-right">
                <Link href={`/admin/posts/form?id=${item?.id}`} passHref>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="rounded-full h-9 px-5 text-xs font-bold gap-2 text-muted-foreground hover:bg-primary/5 hover:text-primary transition-all border border-transparent hover:border-primary/20 shadow-sm hover:shadow-primary/5"
                  >
                    <Edit3 className="size-3" />
                    Configure
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}