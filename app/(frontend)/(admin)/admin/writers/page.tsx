"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { CheckCircle2, XCircle, Clock, ExternalLink, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <main className="min-h-screen w-full bg-background p-6 lg:p-10 text-foreground transition-colors duration-300">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div className="flex items-center gap-4">
          <div className="size-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Users className="text-primary size-7" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Manage Writers</h1>
            <p className="text-sm text-muted-foreground mt-1">Review and approve writer access requests.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-2.5 bg-card border border-border rounded-full shadow-sm">
          <Search className="size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent border-none text-sm focus:outline-none placeholder:text-muted-foreground/50 w-48"
          />
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {(["all", "pending", "approved", "rejected"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all border",
              filter === f
                ? "bg-primary text-primary-foreground border-primary shadow-md"
                : "bg-card text-muted-foreground border-border hover:border-primary/30"
            )}
          >
            {f} <span className="ml-1 opacity-60">({counts[f]})</span>
          </button>
        ))}
      </div>

      {/* Requests Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-border bg-muted/30 flex items-center gap-2">
          <div className="size-2 rounded-full bg-primary animate-pulse" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Writer Applications — {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </h2>
        </div>

        {isLoading ? (
          <div className="p-6 space-y-3">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="h-20 bg-muted animate-pulse rounded-xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-24 text-center opacity-40 italic">No applications found.</div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map(req => (
              <div key={req.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 hover:bg-muted/20 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0 text-sm">
                    {req.name?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-foreground">{req.name}</p>
                    <p className="text-sm text-muted-foreground">{req.email}</p>
                    {req.bio && <p className="text-xs text-muted-foreground mt-1 line-clamp-1 max-w-sm">{req.bio}</p>}
                    {req.portfolio && (
                      <a href={req.portfolio} target="_blank" rel="noopener noreferrer" className="text-xs text-primary flex items-center gap-1 mt-1 hover:underline">
                        <ExternalLink className="size-3" /> Portfolio
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={cn(
                    "text-[10px] font-bold px-3 py-1 rounded-full border",
                    req.status === "pending" ? "bg-amber-100 text-amber-700 border-amber-200" :
                    req.status === "approved" ? "bg-green-100 text-green-700 border-green-200" :
                    "bg-red-100 text-red-700 border-red-200"
                  )}>
                    {req.status === "pending" && <Clock className="inline size-3 mr-1" />}
                    {req.status === "approved" && <CheckCircle2 className="inline size-3 mr-1" />}
                    {req.status === "rejected" && <XCircle className="inline size-3 mr-1" />}
                    {req.status}
                  </span>
                  {req.status === "pending" && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="rounded-full h-8 px-4 text-xs font-bold bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => updateStatus(req.id, "approved")}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="rounded-full h-8 px-4 text-xs font-bold"
                        onClick={() => updateStatus(req.id, "rejected")}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
