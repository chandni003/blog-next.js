"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Users, Search, Shield, ShieldCheck, User as UserIcon, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function updateUserRole(id: string, newRole: "user" | "writer" | "admin") {
    setUpdatingId(id);
    try {
      await updateDoc(doc(db, "users", id), { role: newRole });
      setUsers(prev => prev.map(u => u.id === id ? { ...u, role: newRole } : u));
    } catch (e) {
      console.error("Error updating user role:", e);
      alert("Failed to update role");
    } finally {
      setUpdatingId(null);
    }
  }

  const filtered = users.filter(u => {
    const matchesSearch = !search || 
      (u.name || "").toLowerCase().includes(search.toLowerCase()) || 
      (u.email || "").toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <main className="min-h-screen w-full bg-background p-6 lg:p-10 text-foreground transition-colors duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div className="flex items-center gap-4">
          <div className="size-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Users className="text-primary size-7" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Access Control</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage platform users and their permission levels.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-2.5 bg-card border border-border rounded-full shadow-sm">
          <Search className="size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent border-none text-sm focus:outline-none placeholder:text-muted-foreground/50 w-56"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-border bg-muted/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-primary animate-pulse" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              User Directory — {filtered.length} Record{filtered.length !== 1 ? "s" : ""}
            </h2>
          </div>
        </div>

        {isLoading ? (
          <div className="p-6 space-y-3">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="h-16 bg-muted animate-pulse rounded-xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-24 text-center opacity-40 italic">No users found.</div>
        ) : (
          <div className="divide-y divide-border">
            <div className="hidden sm:grid grid-cols-[auto_1fr_auto_auto] gap-4 px-6 py-3 bg-muted/30">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground w-12 text-center">User</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Details</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground w-32 text-center">Current Role</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground w-64 text-center">Manage Access</span>
            </div>

            {filtered.map(user => {
              const isUpdating = updatingId === user.id;
              
              return (
                <div key={user.id} className={cn(
                  "grid grid-cols-1 sm:grid-cols-[auto_1fr_auto_auto] gap-4 items-center p-5 hover:bg-muted/20 transition-colors",
                  isUpdating && "opacity-50 pointer-events-none"
                )}>
                  
                  {/* Avatar */}
                  <div className="size-12 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0 text-sm">
                    {user.name?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                  
                  {/* Details */}
                  <div className="min-w-0">
                    <p className="font-bold text-foreground truncate">{user.name || "Unknown"}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    {user.createdAt && (
                      <p className="text-[10px] text-muted-foreground/60 mt-1">
                        Joined {user.createdAt.toDate ? user.createdAt.toDate().toLocaleDateString() : new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  
                  {/* Current Role Badge */}
                  <div className="w-32 flex justify-center">
                    <span className={cn(
                      "flex items-center gap-1.5 text-[10px] font-bold px-3 py-1.5 rounded-full border",
                      user.role === "admin" ? "bg-red-500/10 text-red-600 border-red-500/20" :
                      user.role === "writer" ? "bg-orange-500/10 text-orange-600 border-orange-500/20" :
                      "bg-blue-500/10 text-blue-600 border-blue-500/20"
                    )}>
                      {user.role === "admin" && <ShieldCheck className="size-3" />}
                      {user.role === "writer" && <PenTool className="size-3" />}
                      {(!user.role || user.role === "user") && <UserIcon className="size-3" />}
                      {user.role || "user"}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="w-64 flex items-center justify-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className={cn("h-8 text-xs font-bold rounded-full w-20", user.role === "user" && "bg-muted")}
                      onClick={() => updateUserRole(user.id, "user")}
                      disabled={user.role === "user"}
                    >
                      User
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className={cn("h-8 text-xs font-bold rounded-full w-20 border-orange-500/30 text-orange-600 hover:bg-orange-500/10", user.role === "writer" && "bg-orange-500/10 border-orange-500")}
                      onClick={() => updateUserRole(user.id, "writer")}
                      disabled={user.role === "writer"}
                    >
                      Writer
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className={cn("h-8 text-xs font-bold rounded-full w-20 border-red-500/30 text-red-600 hover:bg-red-500/10", user.role === "admin" && "bg-red-500/10 border-red-500")}
                      onClick={() => updateUserRole(user.id, "admin")}
                      disabled={user.role === "admin"}
                    >
                      Admin
                    </Button>
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
