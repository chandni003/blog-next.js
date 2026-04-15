"use client";

import { useAuthors } from "@/lib/firebase/author/read";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Mail, 
  Edit3, 
  Hash, 
  Loader2, 
  AlertCircle,
  UserCircle 
} from "lucide-react";

export default function AuthorsListView() {
  const { data, error, isloading } = useAuthors();

  if (isloading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Loader2 className="size-10 text-primary animate-spin" />
        <p className="text-muted-foreground font-medium animate-pulse">Fetching contributors...</p>
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
      <div className="text-center py-24 bg-muted/20 rounded-[2rem] border border-dashed border-border">
        <UserCircle className="size-12 text-muted-foreground opacity-20 mx-auto mb-4" />
        <h1 className="text-muted-foreground font-bold text-xl">No authors found</h1>
        <p className="text-muted-foreground/60 text-sm mt-2">Add your first contributor to get started.</p>
      </div>
    );
  }

  return (
    <section className="w-full overflow-x-auto custom-scrollbar">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              <div className="flex items-center gap-2"><Hash className="size-3" /> Index</div>
            </th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Contributor
            </th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Email Address
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
              className="group hover:bg-primary/[0.03] transition-colors duration-200"
            >
              <td className="px-6 py-5 text-sm text-muted-foreground font-mono">
                {String(key + 1).padStart(2, '0')}
              </td>
              <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground group-hover:border-primary/50 group-hover:text-primary transition-all overflow-hidden shadow-sm">
                    <User className="size-5" />
                  </div>
                  <span className="text-sm font-bold group-hover:text-primary transition-colors">
                    {item?.name}
                  </span>
                </div>
              </td>
              <td className="px-6 py-5">
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground/80 bg-muted/50 w-fit px-3 py-1.5 rounded-lg border border-border transition-colors group-hover:border-primary/20 font-medium">
                  <Mail className="size-3 text-muted-foreground/40 group-hover:text-primary/70" />
                  {item?.email}
                </div>
              </td>
              <td className="px-6 py-5 text-right">
                <Link href={`/admin/authors/form?id=${item?.id}`} passHref>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="rounded-full h-9 px-5 text-xs font-bold gap-2 text-muted-foreground hover:bg-primary/5 hover:text-primary transition-all border border-transparent hover:border-primary/20"
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