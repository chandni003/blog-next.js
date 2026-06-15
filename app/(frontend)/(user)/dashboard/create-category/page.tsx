"use client";

import { useCategoryForm } from "./contexts/categoryFormContext";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Layers, 
  Trash2, 
  CheckCircle2, 
  Type, 
  Link2, 
  Sparkles,
  ArrowLeft,
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
    updateCategoryId,
    fetchData,
  } = useCategoryForm();

  useEffect(() => {
    if (updateCategoryId) {
      fetchData(updateCategoryId);
    }
  }, [updateCategoryId]);

  return (
    <div className="w-full">
      
      {/* Top Navigation / Header */}
      <div className="max-w-3xl mx-auto mb-10">
        <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest mb-6 group">
           <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
        </Link>
        
        <div className="flex justify-between items-center bg-card p-8 rounded-[2rem] border border-border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="size-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Layers className="text-primary size-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{updateCategoryId ? "Edit Category" : "New Category"}</h1>
              <p className="text-sm text-muted-foreground font-medium">Control content grouping and taxonomy</p>
            </div>
          </div>

          <div className="hidden sm:block">
            {updateCategoryId ? (
              <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-full">
                <Sparkles className="size-3" /> Update Mode
              </span>
            ) : (
              <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-full">
                <CheckCircle2 className="size-3" /> Creation Mode
              </span>
            )}
          </div>
        </div>
      </div>

      <section className="max-w-3xl mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (updateCategoryId) {
              handleUpdate();
            } else {
              handleCreate();
            }
          }}
          className="flex flex-col gap-8 bg-card border border-border p-8 lg:p-12 rounded-[2.5rem] shadow-xl relative overflow-hidden"
        >
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Category Name */}
            <div className="flex flex-col gap-3">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 ml-1">
                <Type className="size-3 text-primary" /> Display Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                onChange={(e) => {
                  e.preventDefault();
                  handleData("name", e.target.value);
                }}
                value={data?.name || ""}
                required
                placeholder="e.g. Artificial Intelligence"
                className="w-full bg-background border border-border rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/30 font-medium"
              />
            </div>

            {/* Category Slug */}
            <div className="flex flex-col gap-3">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 ml-1">
                <Link2 className="size-3 text-primary" /> URL Slug <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                onChange={(e) => {
                  e.preventDefault();
                  handleData("slug", e.target.value);
                }}
                value={data?.slug || ""}
                required
                placeholder="ai-and-future"
                className="w-full bg-background border border-border rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/30 font-medium font-mono"
              />
            </div>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-bold animate-in fade-in slide-in-from-top-2">
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            {!isdone && (
              <Button
                type="submit"
                disabled={isloading}
                className="flex-1 rounded-2xl py-8 font-bold text-md shadow-xl shadow-primary/10 transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                {isloading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="size-5 animate-spin" />
                    Processing...
                  </div>
                ) : updateCategoryId ? "Apply Configuration" : "Deploy new category"}
              </Button>
            )}

            {updateCategoryId && !isdone && (
              <Button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete(updateCategoryId);
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
              Category {updateCategoryId ? "Updated" : "Generated"} Successfully
            </div>
          )}
        </form>
      </section>
    </div>
  );
}