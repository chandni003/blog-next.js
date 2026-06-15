"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Clock, Search, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminWritersPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [search, setSearch] = useState("");

  async function fetchRequests() {
    setIsLoading(true);
    try {
      const snap = await getDocs(collection(db, "writerRequests"));
      setRequests(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) { console.error(e); }
    finally { setIsLoading(false); }
  }

  useEffect(() => { fetchRequests(); }, []);

  async function updateStatus(id: string, status: "approved" | "rejected") {
    try {
      await updateDoc(doc(db, "writerRequests", id), { status });
      setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    } catch (e) { console.error(e); }
  }

  const filtered = requests.filter(r => {
    const matchesFilter = filter === "all" || r.status === filter;
    const matchesSearch = !search || r.name?.toLowerCase().includes(search.toLowerCase()) || r.email?.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const counts = {
    all: requests.length,
    pending: requests.filter(r => r.status === "pending").length,
    approved: requests.filter(r => r.status === "approved").length,
    rejected: requests.filter(r => r.status === "rejected").length,
  };

  return (
    <main className="flex min-h-screen flex-col gap-8 p-6 lg:p-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-foreground">Writer Requests</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review and manage writer applications
          </p>
        </div>
        <div className="flex items-center gap-2 h-10 px-4 bg-card border border-border rounded-lg text-muted-foreground">
          <Search className="size-4 shrink-0" />
          <input
            type="text"
            placeholder="Search applications..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-sm focus:outline-none w-44 placeholder:text-muted-foreground/60"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {(["all", "pending", "approved", "rejected"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-lg border transition-all",
              filter === f
                ? "bg-foreground text-background border-foreground"
                : "bg-card text-muted-foreground border-border hover:bg-muted"
            )}
          >
            {f} <span className="opacity-50 ml-1">({counts[f]})</span>
          </button>
        ))}
      </div>

      {/* List */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Applications — {filtered.length} {filtered.length === 1 ? "record" : "records"}
          </h2>
        </div>

        {isLoading ? (
          <div className="divide-y divide-border">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="p-6 flex gap-4 animate-pulse">
                <div className="size-10 bg-muted rounded-full shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-1/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center">
            <ShieldCheck className="size-10 text-muted-foreground/30 mx-auto mb-3" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground">No applications found</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map(req => (
              <div key={req.id} className="px-6 py-5 flex flex-col md:flex-row md:items-center gap-4 hover:bg-muted/20 transition-colors">
                
                {/* Info */}
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="size-10 rounded-full bg-muted flex items-center justify-center text-sm font-bold text-foreground shrink-0 border border-border">
                    {req.name?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-foreground truncate">{req.name}</p>
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border",
                        req.status === "pending" ? "bg-amber-500/10 text-amber-600 border-amber-500/20" :
                        req.status === "approved" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" :
                        "bg-red-500/10 text-red-600 border-red-500/20"
                      )}>
                        {req.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{req.email}</p>
                    {req.bio && <p className="text-sm text-foreground/80 mt-2 line-clamp-2">{req.bio}</p>}
                    {req.portfolio && (
                      <a href={req.portfolio} target="_blank" rel="noopener noreferrer" className="inline-block text-xs font-semibold text-muted-foreground hover:text-foreground mt-2 border border-border px-3 py-1 rounded-lg">
                        View Portfolio
                      </a>
                    )}
                  </div>
                </div>

                {/* Actions */}
                {req.status === "pending" && (
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => updateStatus(req.id, "approved")}
                      className="px-4 py-2 bg-foreground text-background text-xs font-semibold rounded-lg hover:opacity-85 transition-opacity"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(req.id, "rejected")}
                      className="px-4 py-2 bg-muted text-foreground text-xs font-semibold rounded-lg hover:bg-muted/80 transition-colors border border-border"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

    </main>
  );
}
