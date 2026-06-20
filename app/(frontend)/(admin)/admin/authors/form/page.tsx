"use client";

import { useAuthorForm } from "./contexts/AuthorFormContext";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  User,
  Mail,
  Trash2,
  CheckCircle2,
  ArrowLeft,
  Loader2,
  AlertCircle,
  AtSign,
  Link2,
  Code2,
  FileText,
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
    <main className="flex min-h-screen flex-col gap-8 p-6 lg:p-10">

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/authors"
            className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="size-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Back
          </Link>
          <div className="w-px h-4 bg-border" />
          <div>
            <h1 className="text-2xl font-black tracking-tight text-foreground">
              {updateAuthorId ? "Edit Author" : "New Author"}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {updateAuthorId
                ? "Update author profile and public details"
                : "Register a new content contributor"}
            </p>
          </div>
        </div>

        <span
          className={`hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg border ${
            updateAuthorId
              ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
              : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
          }`}
        >
          <User className="size-3" />
          {updateAuthorId ? "Edit Mode" : "Create Mode"}
        </span>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (updateAuthorId) {
            handleUpdate();
          } else {
            handleCreate();
          }
        }}
        className="flex flex-col gap-6 max-w-2xl"
      >
        {/* Read-only Registration Details */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center gap-3 bg-muted/20">
            <div className="size-7 rounded-md bg-muted border border-border flex items-center justify-center">
              <FileText className="size-3.5 text-muted-foreground" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Official Registration Details
            </span>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                <User className="size-3" />
                Full Legal Name
              </label>
              <div className="w-full bg-muted/40 border border-border rounded-lg px-4 py-2.5 text-sm text-muted-foreground font-medium cursor-not-allowed select-none">
                {data?.officialName || "—"}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                <Mail className="size-3" />
                Corporate Email
              </label>
              <div className="w-full bg-muted/40 border border-border rounded-lg px-4 py-2.5 text-sm text-muted-foreground font-medium cursor-not-allowed select-none truncate">
                {data?.email || "—"}
              </div>
            </div>
          </div>
        </div>

        {/* Editable Profile Section */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center gap-3 bg-muted/20">
            <div className="size-7 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center">
              <User className="size-3.5 text-primary" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Public Profile Configuration
            </span>
          </div>

          <div className="p-6 flex flex-col gap-5">
            {/* Display Name */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                <User className="size-3 text-primary" />
                Display Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                onChange={(e) => handleData("name", e.target.value)}
                value={data?.name || ""}
                required
                placeholder="e.g. Alex Chen"
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/40 font-medium"
              />
            </div>

            {/* Biography */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                Biography
              </label>
              <textarea
                rows={3}
                onChange={(e) => handleData("biography", e.target.value)}
                value={data?.biography || ""}
                placeholder="Tell us about the author..."
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/40 font-medium resize-none"
              />
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-3">
              <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                Social Links
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    onChange={(e) => handleData("socialLinks", { ...data?.socialLinks, twitter: e.target.value })}
                    value={data?.socialLinks?.twitter || ""}
                    placeholder="Twitter"
                    className="w-full bg-background border border-border rounded-lg pl-8 pr-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/40"
                  />
                </div>
                <div className="relative">
                  <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    onChange={(e) => handleData("socialLinks", { ...data?.socialLinks, linkedin: e.target.value })}
                    value={data?.socialLinks?.linkedin || ""}
                    placeholder="LinkedIn"
                    className="w-full bg-background border border-border rounded-lg pl-8 pr-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/40"
                  />
                </div>
                <div className="relative">
                  <Code2 className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    onChange={(e) => handleData("socialLinks", { ...data?.socialLinks, github: e.target.value })}
                    value={data?.socialLinks?.github || ""}
                    placeholder="GitHub"
                    className="w-full bg-background border border-border rounded-lg pl-8 pr-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/40"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2.5 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs font-semibold animate-in fade-in slide-in-from-top-1">
            <AlertCircle className="size-4 shrink-0" />
            {error}
          </div>
        )}

        {/* Success */}
        {isdone && (
          <div className="flex items-center gap-2.5 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold animate-in zoom-in duration-300">
            <CheckCircle2 className="size-4 shrink-0" />
            Author profile {updateAuthorId ? "updated" : "created"} successfully
          </div>
        )}

        {/* Action Buttons */}
        {!isdone && (
          <div className="flex items-center gap-3">
            <Button
              type="submit"
              disabled={isloading}
              className="flex items-center gap-2 h-9 px-5 bg-foreground text-background text-sm font-semibold rounded-lg hover:opacity-85 transition-opacity"
            >
              {isloading ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  {updateAuthorId ? "Saving..." : "Creating..."}
                </>
              ) : (
                <>
                  <CheckCircle2 className="size-3.5" />
                  {updateAuthorId ? "Save Changes" : "Create Author"}
                </>
              )}
            </Button>

            {updateAuthorId && (
              <Button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete(updateAuthorId);
                }}
                variant="ghost"
                disabled={isloading}
                className="flex items-center gap-2 h-9 px-4 text-sm font-semibold text-destructive hover:bg-destructive/10 hover:text-destructive rounded-lg transition-colors"
              >
                <Trash2 className="size-3.5" />
                Delete Author
              </Button>
            )}

            <Link href="/admin/authors">
              <Button
                type="button"
                variant="ghost"
                className="h-9 px-4 text-sm font-semibold text-muted-foreground hover:text-foreground rounded-lg"
              >
                Cancel
              </Button>
            </Link>
          </div>
        )}
      </form>
    </main>
  );
}