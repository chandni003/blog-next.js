"use client";

import { useAuthorForm } from "./contexts/AuthorFormContext";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Mail, 
  Trash2, 
  CheckCircle2, 
  Sparkles, 
  ArrowLeft,
  UserPlus,
  Loader2
} from "lucide-react";
import Link from "next/link";

export default function Page() {
  const {
    data,
    isloading,
    error,
    isdone,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleData,
    updateAuthorId,
    fetchData,
  } = useAuthorForm();

  useEffect(() => {
    if (updateAuthorId) {
      fetchData(updateAuthorId);
    }
  }, [updateAuthorId]);

  useEffect(() => {
    if (isdone && !updateAuthorId) {
      const timer = setTimeout(() => {
        handleData("name", "");
        handleData("email", "");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isdone, updateAuthorId, handleData]);

  return (
    <main className="min-h-screen w-full p-6 lg:p-10 transition-colors duration-300">
      
      {/* Header Section */}
      <div className="max-w-2xl mx-auto mb-10">
        <Link href="/admin/authors" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest mb-6 group">
           <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" /> Back to Personnel
        </Link>
        
        <div className="flex justify-between items-center bg-card p-8 rounded-[2rem] border border-border shadow-sm">
          <div className="flex items-center gap-5">
            <div className="size-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <User className="text-primary size-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{updateAuthorId ? "Edit Profile" : "New Author"}</h1>
              <p className="text-sm text-muted-foreground font-medium">Configure credentials and writing role</p>
            </div>
          </div>

          <div className="hidden sm:block">
            {updateAuthorId ? (
              <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-full">
                <Sparkles className="size-3" /> System Update
              </span>
            ) : (
              <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-full">
                <UserPlus className="size-3" /> Registration
              </span>
            )}
          </div>
        </div>
      </div>

      <section className="max-w-2xl mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (updateAuthorId) {
              handleUpdate();
            } else {
              handleCreate();
            }
          }}
          className="flex flex-col gap-8 bg-card border border-border p-8 lg:p-12 rounded-[2.5rem] shadow-xl relative overflow-hidden"
        >
          {/* Form Fields */}
          <div className="space-y-8">
            
            {/* Frozen Details (Read-only) */}
            <div className="space-y-5 p-6 bg-muted/20 border border-border rounded-2xl">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Official Registration Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <User className="size-3 text-muted-foreground/60" /> Full Legal Name
                  </label>
                  <div className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-sm text-muted-foreground font-medium cursor-not-allowed">
                    {data?.officialName || "N/A"}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Mail className="size-3 text-muted-foreground/60" /> Corporate Email
                  </label>
                  <div className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-sm text-muted-foreground font-medium cursor-not-allowed">
                    {data?.email || "N/A"}
                  </div>
                </div>
              </div>
            </div>

            {/* Editable Author Profile */}
            <div className="space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-foreground mb-2">Public Profile Configuration</h3>
              
              <div className="flex flex-col gap-3">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 ml-1">
                  <User className="size-3 text-primary" /> Display Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  onChange={(e) => handleData("name", e.target.value)}
                  value={data?.name || ""}
                  required
                  placeholder="e.g. Alex"
                  className="w-full bg-background border border-border rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/30 font-medium"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 ml-1">
                  Biography
                </label>
                <textarea
                  rows={4}
                  onChange={(e) => handleData("biography", e.target.value)}
                  value={data?.biography || ""}
                  placeholder="Tell us about the author..."
                  className="w-full bg-background border border-border rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/30 font-medium resize-none"
                />
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 ml-1">
                  Social Links
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    onChange={(e) => handleData("socialLinks", { ...data?.socialLinks, twitter: e.target.value })}
                    value={data?.socialLinks?.twitter || ""}
                    placeholder="Twitter Handle"
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/30"
                  />
                  <input
                    type="text"
                    onChange={(e) => handleData("socialLinks", { ...data?.socialLinks, linkedin: e.target.value })}
                    value={data?.socialLinks?.linkedin || ""}
                    placeholder="LinkedIn URL"
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/30"
                  />
                  <input
                    type="text"
                    onChange={(e) => handleData("socialLinks", { ...data?.socialLinks, github: e.target.value })}
                    value={data?.socialLinks?.github || ""}
                    placeholder="GitHub Username"
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/30"
                  />
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-bold animate-in fade-in slide-in-from-top-2">
              {error}
            </div>
          )}

          <div className="flex gap-4 pt-4">
            {!isdone && (
              <Button
                type="submit"
                disabled={isloading}
                className="flex-1 rounded-2xl py-8 font-bold text-md shadow-xl shadow-primary/10 gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {isloading ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Synchronizing...
                  </>
                ) : (
                  updateAuthorId ? "Confirm Changes" : "Register Contributor"
                )}
              </Button>
            )}

            {updateAuthorId && !isdone && (
              <Button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete(updateAuthorId);
                }}
                variant="destructive"
                disabled={isloading}
                className="rounded-2xl py-8 px-8 font-bold shadow-xl shadow-destructive/10"
              >
                <Trash2 className="size-5" />
              </Button>
            )}
          </div>

          {isdone && (
            <div className="flex items-center justify-center gap-3 p-8 rounded-[1.5rem] bg-primary/10 border border-primary/20 text-primary font-bold animate-in zoom-in duration-500 shadow-inner">
              <CheckCircle2 className="size-6" />
              Profile {updateAuthorId ? "Updated" : "Created"} Successfully
            </div>
          )}
        </form>
      </section>
    </main>
  );
}