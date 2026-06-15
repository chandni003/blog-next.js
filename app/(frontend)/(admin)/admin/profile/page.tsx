"use client";

import { useAuth } from "@/lib/context/AuthContext";
import { useUserPosts } from "@/lib/firebase/post/read";
import { useUserRole } from "@/lib/firebase/user/read";
import { useState } from "react";
import { Mail, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AdminProfile() {
  const { user } = useAuth();
  const { role } = useUserRole();
  const { data: posts, isloading: postsLoading } = useUserPosts(user?.email);
  
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    bio: "",
    twitter: "",
  });

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    // Simulate update
    setTimeout(() => {
      setIsUpdating(false);
      alert("Author profile updated successfully!");
    }, 800);
  };

  return (
    <main className="flex min-h-screen flex-col gap-8 p-6 lg:p-10">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-black tracking-tight text-foreground">Identity Management</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your personal profile and account credentials
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card border border-border rounded-xl p-8 flex flex-col items-center text-center">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="size-24 rounded-full object-cover border border-border shadow-sm mb-4" />
            ) : (
              <div className="size-24 rounded-full bg-muted flex items-center justify-center text-foreground font-black text-3xl shadow-sm mb-4 border border-border">
                {user?.displayName?.charAt(0) || "U"}
              </div>
            )}
            <h2 className="text-xl font-bold text-foreground">{user?.displayName || "Admin User"}</h2>
            <div className="flex items-center gap-1.5 mt-1 text-sm text-muted-foreground">
              <Mail className="size-3.5" />
              <span>{user?.email || "No email provided"}</span>
            </div>

            <div className="w-full h-px bg-border my-6" />
            
            <div className="w-full flex justify-between items-center bg-muted/40 px-4 py-3 rounded-lg border border-border">
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                <ShieldCheck className="size-4" />
                Access Level
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-foreground">{role || "Loading..."}</span>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Account Stats</h3>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-black text-foreground">{postsLoading ? "—" : (posts?.length || 0)}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">Authored Posts</p>
              </div>
              <Link href="/admin/posts" className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                View <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Edit Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleUpdate} className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-6 border-b border-border bg-muted/30">
              <h2 className="text-sm font-bold text-foreground">Edit Profile Information</h2>
            </div>
            
            <div className="p-6 space-y-6">
              
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Display Name</label>
                <input 
                  type="text" 
                  value={formData.displayName}
                  onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                  className="w-full h-11 px-4 bg-transparent border border-border rounded-lg text-sm focus:outline-none focus:border-foreground/30 transition-all"
                  placeholder="How readers will see your name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  Biography <span className="text-muted-foreground/50 lowercase tracking-normal font-medium">(Optional)</span>
                </label>
                <textarea 
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  className="w-full p-4 bg-transparent border border-border rounded-lg text-sm focus:outline-none focus:border-foreground/30 transition-all min-h-[120px] resize-y"
                  placeholder="Tell your readers about your technical background..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  Social Links <span className="text-muted-foreground/50 lowercase tracking-normal font-medium">(Optional)</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">
                    twitter.com/
                  </div>
                  <input 
                    type="text" 
                    value={formData.twitter}
                    onChange={(e) => setFormData({...formData, twitter: e.target.value})}
                    className="w-full h-11 pl-[96px] pr-4 bg-transparent border border-border rounded-lg text-sm focus:outline-none focus:border-foreground/30 transition-all"
                    placeholder="username"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={isUpdating}
                  className="flex items-center justify-center gap-2 h-11 px-6 bg-foreground text-background text-sm font-semibold rounded-lg hover:opacity-85 transition-opacity disabled:opacity-50"
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                  {!isUpdating && <CheckCircle2 className="size-4" />}
                </button>
              </div>

            </div>
          </form>
        </div>

      </div>
    </main>
  );
}
