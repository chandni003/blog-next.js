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
  ArrowLeft,
  Loader2,
  AlertCircle,
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
    <main className="flex min-h-screen flex-col gap-8 p-6 lg:p-10">

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/categories"
            className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="size-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Back
          </Link>
          <div className="w-px h-4 bg-border" />
          <div>
            <h1 className="text-2xl font-black tracking-tight text-foreground">
              {updateCategoryId ? "Edit Category" : "New Category"}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {updateCategoryId
                ? "Update category name and URL slug"
                : "Create a new content category"}
            </p>
          </div>
        </div>

        <span
          className={`hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg border ${
            updateCategoryId
              ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
              : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
          }`}
        >
          <Layers className="size-3" />
          {updateCategoryId ? "Update Mode" : "Create Mode"}
        </span>
      </div>

      {/* Form Card */}
      <div className="bg-card border border-border rounded-xl overflow-hidden max-w-2xl">

        {/* Card header strip */}
        <div className="px-6 py-4 border-b border-border flex items-center gap-3 bg-muted/20">
          <div className="size-7 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Layers className="size-3.5 text-primary" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Category Details
          </span>
        </div>

        {/* Form body */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (updateCategoryId) {
              handleUpdate();
            } else {
              handleCreate();
            }
          }}
          className="p-6 flex flex-col gap-5"
        >
          {/* Display Name */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
              <Type className="size-3 text-primary" />
              Display Name <span className="text-destructive">*</span>
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
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/40 font-medium"
            />
          </div>

          {/* URL Slug */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
              <Link2 className="size-3 text-primary" />
              URL Slug <span className="text-destructive">*</span>
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
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/40"
            />
            <p className="text-[11px] text-muted-foreground">
              Used in URLs, e.g.{" "}
              <span className="font-mono text-foreground/60">/blogs?category=ai-and-future</span>
            </p>
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
              Category {updateCategoryId ? "updated" : "created"} successfully
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-border pt-4">
            {/* Action buttons */}
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
                      {updateCategoryId ? "Updating..." : "Creating..."}
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="size-3.5" />
                      {updateCategoryId ? "Update Category" : "Create Category"}
                    </>
                  )}
                </Button>

                {updateCategoryId && (
                  <Button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(updateCategoryId);
                    }}
                    variant="ghost"
                    disabled={isloading}
                    className="flex items-center gap-2 h-9 px-4 text-sm font-semibold text-destructive hover:bg-destructive/10 hover:text-destructive rounded-lg transition-colors"
                  >
                    <Trash2 className="size-3.5" />
                    Delete
                  </Button>
                )}

                <Link href="/admin/categories">
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
          </div>
        </form>
      </div>
    </main>
  );
}