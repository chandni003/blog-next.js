"use client";

import { usePost } from "@/lib/firebase/post/read";
import { useCategories } from "@/lib/firebase/category/read";
import { useAuthors } from "@/lib/firebase/author/read";
import { useAuth } from "@/lib/context/AuthContext";
import { useUserRole } from "@/lib/firebase/user/read";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { FileText, Layers, Users, Clock, ArrowRight, Mail, ShieldCheck, BookOpen } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const { data: posts, isloading: postsLoading } = usePost();
  const { data: categories } = useCategories();
  const { data: authors } = useAuthors();
  const { user } = useAuth();
  const { role } = useUserRole();
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

  const pendingRequests = writerRequests.filter(r => r.status === "pending");

  const stats = [
    { label: "Total Posts", value: postsLoading ? "—" : (posts?.length || 0), icon: FileText, href: "/admin/posts" },
    { label: "Categories", value: categories?.length || 0, icon: Layers, href: "/admin/categories" },
    { label: "Authors", value: authors?.length || 0, icon: Users, href: "/admin/authors" },
    { label: "Pending Requests", value: requestsLoading ? "—" : pendingRequests.length, icon: Clock, href: "/admin/writers" },
  ];

  return (
    <main className="flex min-h-screen flex-col gap-8 p-6 lg:p-10">

      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-black tracking-tight text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Platform overview and quick actions</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* LEFT: Stats + Recent Posts */}
        <div className="xl:col-span-2 space-y-6">

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s) => (
              <Link key={s.label} href={s.href} className="group block">
                <div className="p-5 bg-card border border-border rounded-xl hover:border-foreground/20 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <s.icon className="size-4 text-muted-foreground" strokeWidth={1.5} />
                    <ArrowRight className="size-3 text-muted-foreground/30 group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="text-3xl font-black text-foreground">{s.value}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">{s.label}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Recent Posts */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <h2 className="text-sm font-bold text-foreground">Recent Publications</h2>
              <Link href="/admin/posts" className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                View all <ArrowRight className="size-3" />
              </Link>
            </div>
            <div className="divide-y divide-border">
              {postsLoading ? (
                Array(5).fill(0).map((_, i) => (
                  <div key={i} className="p-4 flex gap-4 animate-pulse">
                    <div className="size-10 bg-muted rounded-lg shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-2/3" />
                      <div className="h-3 bg-muted rounded w-1/3" />
                    </div>
                  </div>
                ))
              ) : posts?.slice(0, 6).map((post: any) => (
                <div key={post.id} className="px-6 py-4 flex items-center gap-4 hover:bg-muted/30 transition-colors">
                  <div className="size-10 shrink-0 rounded-lg bg-muted overflow-hidden">
                    {post.thumbnailUrl
                      ? <img src={post.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center"><BookOpen className="size-4 text-muted-foreground/30" /></div>
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{post.name}</p>
                    <p className="text-[11px] text-muted-foreground">{post.timestamp?.toDate()?.toLocaleDateString()}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    post.status === "draft"
                      ? "bg-zinc-500/10 text-zinc-500"
                      : "bg-emerald-500/10 text-emerald-600"
                  }`}>
                    {post.status === "draft" ? "Draft" : "Live"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Profile + Writer Requests */}
        <div className="space-y-6">

          {/* Admin Profile Card */}
          <div className="bg-card border border-border rounded-xl p-6 space-y-5">
            <div className="flex flex-col items-center text-center gap-4">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="profile" className="size-16 rounded-full object-cover border-2 border-border shadow-sm" />
              ) : (
                <div className="size-16 rounded-full bg-muted flex items-center justify-center text-xl font-black text-foreground border border-border">
                  {user?.displayName?.charAt(0) || "A"}
                </div>
              )}
              <div>
                <p className="font-bold text-foreground">{user?.displayName || "Admin"}</p>
                <div className="flex items-center justify-center gap-1 mt-1 text-[11px] text-muted-foreground">
                  <Mail className="size-3" />
                  <span className="truncate max-w-[180px]">{user?.email}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between px-4 py-3 bg-muted/40 rounded-lg border border-border">
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                <ShieldCheck className="size-4" />
                <span>Access Level</span>
              </div>
              <span className="text-xs font-black uppercase text-foreground">{role || "—"}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Link href="/dashboard" className="text-center text-xs font-semibold py-2.5 rounded-lg border border-border hover:bg-muted transition-colors">
                Writer View
              </Link>
              <Link href="/admin/profile" className="text-center text-xs font-semibold py-2.5 rounded-lg bg-foreground text-background hover:opacity-85 transition-opacity">
                Edit Profile
              </Link>
            </div>
          </div>

          {/* Pending Writer Requests */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <h2 className="text-sm font-bold text-foreground">Writer Requests</h2>
              <Link href="/admin/writers" className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                Manage <ArrowRight className="size-3" />
              </Link>
            </div>
            <div className="divide-y divide-border">
              {requestsLoading ? (
                Array(3).fill(0).map((_, i) => <div key={i} className="p-4 h-14 animate-pulse bg-muted m-3 rounded-lg" />)
              ) : pendingRequests.length > 0 ? (
                pendingRequests.slice(0, 4).map((req) => (
                  <div key={req.id} className="px-5 py-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-foreground truncate">{req.name}</p>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-500/10 text-amber-600 rounded-full shrink-0">Pending</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{req.email}</p>
                  </div>
                ))
              ) : (
                <div className="py-10 text-center text-sm text-muted-foreground italic">No pending requests</div>
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
