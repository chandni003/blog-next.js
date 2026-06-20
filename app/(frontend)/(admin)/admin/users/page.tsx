"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Users, Search, ShieldCheck, PenTool, User as UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function fetchUsers() {
    setIsLoading(true);
    try {
      const snap = await getDocs(collection(db, "users"));
      setUsers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) { console.error(e); }
    finally { setIsLoading(false); }
  }

  useEffect(() => { fetchUsers(); }, []);

  async function updateUserRole(id: string, newRole: "user" | "writer" | "admin") {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/update-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUserId: id, newRole }),
      });
      if (!res.ok) throw new Error("Failed to update role");
      setUsers(prev => prev.map(u => u.id === id ? { ...u, role: newRole } : u));
    } catch (e) {
      console.error(e);
      alert("Failed to update role");
    } finally { setUpdatingId(null); }
  }

  const filtered = users.filter(u =>
    !search ||
    (u.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (u.email || "").toLowerCase().includes(search.toLowerCase())
  );

  const roleConfig = {
    admin: { label: "Admin", icon: ShieldCheck, badge: "bg-red-500/10 text-red-600 border-red-500/20" },
    writer: { label: "Writer", icon: PenTool, badge: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
    user: { label: "User", icon: UserIcon, badge: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  };

  return (
    <main className="flex min-h-screen flex-col gap-8 p-6 lg:p-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-foreground">User Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage platform users and access levels
          </p>
        </div>
        <div className="flex items-center gap-2 h-10 px-4 bg-card border border-border rounded-lg text-muted-foreground">
          <Search className="size-4 shrink-0" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-sm focus:outline-none w-44 placeholder:text-muted-foreground/60"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 max-w-sm">
        {[
          { label: "Total", value: users.length },
          { label: "Writers", value: users.filter(u => u.role === "writer").length },
          { label: "Admins", value: users.filter(u => u.role === "admin").length },
        ].map(s => (
          <div key={s.label} className="p-4 bg-card border border-border rounded-xl text-center">
            <p className="text-2xl font-black text-foreground">{s.value}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Users table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            User Directory — {filtered.length} {filtered.length === 1 ? "record" : "records"}
          </h2>
        </div>

        {isLoading ? (
          <div className="divide-y divide-border">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="p-5 flex gap-4 animate-pulse">
                <div className="size-10 bg-muted rounded-full shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-1/3" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center">
            <Users className="size-10 text-muted-foreground/30 mx-auto mb-3" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground">No users found</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map(user => {
              const role = (user.role || "user") as keyof typeof roleConfig;
              const config = roleConfig[role] || roleConfig.user;
              const isUpdating = updatingId === user.id;

              return (
                <div
                  key={user.id}
                  className={cn(
                    "px-6 py-4 flex flex-col md:flex-row md:items-center gap-4 hover:bg-muted/20 transition-colors",
                    isUpdating && "opacity-50 pointer-events-none"
                  )}
                >
                  {/* Avatar + Info */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="size-10 rounded-full bg-muted flex items-center justify-center text-sm font-bold text-foreground shrink-0 border border-border">
                      {user.name?.charAt(0)?.toUpperCase() || "?"}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{user.name || "Unknown"}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                  </div>

                  {/* Role badge */}
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border",
                      config.badge
                    )}>
                      <config.icon className="size-3" />
                      {config.label}
                    </span>

                    {/* Role switcher */}
                    <div className="flex items-center gap-1">
                      {(["user", "writer", "admin"] as const).map((r) => (
                        <button
                          key={r}
                          onClick={() => updateUserRole(user.id, r)}
                          disabled={user.role === r}
                          className={cn(
                            "px-3 py-1.5 text-[10px] font-bold uppercase rounded-lg border transition-all",
                            user.role === r
                              ? "bg-foreground text-background border-foreground cursor-default"
                              : "bg-card border-border text-muted-foreground hover:bg-muted"
                          )}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </main>
  );
}
