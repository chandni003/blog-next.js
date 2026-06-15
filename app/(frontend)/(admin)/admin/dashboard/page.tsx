"use client";

import { usePost } from "@/lib/firebase/post/read";
import { useCategories } from "@/lib/firebase/category/read";
import { useAuthors } from "@/lib/firebase/author/read";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { Users, FileText, Layers, TrendingUp, Clock, CheckCircle2, Eye, UserCheck } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const { data: posts, isloading: postsLoading } = usePost();
  const { data: categories, isloading: categoriesLoading } = useCategories();
  const { data: authors } = useAuthors();
  const [writerRequests, setWriterRequests] = useState<any[]>([]);
  const [requestsLoading, setRequestsLoading] = useState(true);

  useEffect(() => {
    async function fetchWriterRequests() {
      try {
        const snap = await getDocs(collection(db, "writerRequests"));
        setWriterRequests(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) { console.error(e); }
      finally { setRequestsLoading(false); }
    }
    fetchWriterRequests();
  }, []);

  const publishedCount = posts?.length || 0;
  const pendingRequests = writerRequests.filter(r => r.status === "pending").length;

  const stats = [
    { label: "Total Posts", value: postsLoading ? "—" : publishedCount, icon: FileText, color: "text-violet-500", bg: "bg-violet-500/10", href: "/admin/posts" },
    { label: "Categories", value: categoriesLoading ? "—" : (categories?.length || 0), icon: Layers, color: "text-blue-500", bg: "bg-blue-500/10", href: "/admin/categories" },
    { label: "Authors", value: authors?.length || 0, icon: Users, color: "text-indigo-500", bg: "bg-indigo-500/10", href: "/admin/authors" },
    { label: "Pending Writers", value: requestsLoading ? "—" : pendingRequests, icon: UserCheck, color: "text-amber-500", bg: "bg-amber-500/10", href: "/admin/writers" },
  ];

  return (
    <main className="min-h-screen w-full bg-background p-6 lg:p-10 text-foreground transition-colors duration-300">

      {/* Welcome Header */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Platform overview — manage posts, categories, and writers.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <Link href={stat.href} key={index}>
            <div className="bg-card border border-border p-6 rounded-2xl hover:border-primary/30 hover:shadow-md transition-all group cursor-pointer shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className={cn("p-3 rounded-xl", stat.bg, stat.color)}>
                  <stat.icon className="size-5" />
                </div>
                <TrendingUp className="size-4 text-muted-foreground/30 group-hover:text-primary transition-colors" />
              </div>
              <h2 className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors">{stat.value}</h2>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-1">{stat.label}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Posts */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-bold flex items-center gap-2">
              <Eye className="size-4 text-primary" /> Recent Publications
            </h3>
            <Link href="/admin/posts" className="text-xs text-primary font-bold hover:underline">View all →</Link>
          </div>
          <div className="space-y-4">
            {postsLoading ? (
              Array(4).fill(0).map((_, i) => <div key={i} className="h-14 bg-muted rounded-xl animate-pulse" />)
            ) : posts?.slice(0, 5).map((post: any) => (
              <div key={post.id} className="flex items-center gap-4 p-3 border border-border rounded-xl hover:border-primary/30 transition-colors">
                <div className="size-10 bg-muted rounded-lg overflow-hidden shrink-0">
                  {post.thumbnailUrl && <img src={post.thumbnailUrl} alt="" className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{post.name}</p>
                  <p className="text-xs text-muted-foreground">{post.timestamp?.toDate()?.toLocaleDateString()}</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-green-100 text-green-700 rounded-full shrink-0">Live</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Writer Requests */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-bold flex items-center gap-2">
              <Clock className="size-4 text-amber-500" /> Writer Requests
            </h3>
            <Link href="/admin/writers" className="text-xs text-primary font-bold hover:underline">Manage →</Link>
          </div>
          <div className="space-y-4">
            {requestsLoading ? (
              Array(3).fill(0).map((_, i) => <div key={i} className="h-14 bg-muted rounded-xl animate-pulse" />)
            ) : writerRequests.length > 0 ? writerRequests.slice(0, 4).map((req) => (
              <div key={req.id} className="p-3 border border-border rounded-xl">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm">{req.name}</p>
                  <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", 
                    req.status === "pending" ? "bg-amber-100 text-amber-700" : 
                    req.status === "approved" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  )}>
                    {req.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground truncate mt-0.5">{req.email}</p>
              </div>
            )) : (
              <div className="py-8 text-center opacity-50 text-sm italic">No pending requests</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
