"use client";

import { useCategories } from "@/lib/firebase/category/read";
import { usePostForm } from "./contexts/PostFormContext";
import { useEffect, useState } from "react";
import { useUserRole } from "@/lib/firebase/user/read";
import { useAuth } from "@/lib/context/AuthContext";
import { useAuthorProfile } from "@/lib/firebase/author/read";
import { RTEfield } from "./components/RTEField";
import { Button } from "@/components/ui/button";
import {
  PenLine,
  Trash2,
  CheckCircle2,
  Layers,
  User,
  Type,
  Link2,
  Sparkles,
  ImageIcon,
  Upload,
  X,
  ArrowLeft,
  Clock,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Page() {
  const {
    data,
    isloading,
    error,
    isdone,
    lastAction,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleData,
    updatePostId,
    fetchData,
  } = usePostForm();

  const { user } = useAuth();
  const { data: authorProfile, isLoading: profileLoading } = useAuthorProfile(user?.uid);
  const hasDisplayName = !profileLoading && !!authorProfile?.name?.trim();

  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFileUpload = async (file: File) => {
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      const responseData = await res.json();
      handleData("thumbnailUrl", responseData.url);
    } catch (err) {
      console.error(err);
      alert("Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await handleFileUpload(file);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) await handleFileUpload(file);
  };

  useEffect(() => {
    if (updatePostId) fetchData(updatePostId);
  }, [updatePostId]);

  const isEditMode = !!updatePostId;
  const isProcessing = isloading || isUploading;

  // ── Display Name Gate ──────────────────────────────────────
  if (profileLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="size-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!hasDisplayName) {
    return (
      <div className="w-full max-w-lg mx-auto">
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          {/* Header */}
          <div className="px-6 py-5 border-b border-border bg-amber-500/5 flex items-start gap-4">
            <div className="size-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="size-5 text-amber-500" />
            </div>
            <div>
              <h2 className="text-base font-black tracking-tight text-foreground">Display Name Required</h2>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                You need to set a public display name before you can publish posts. This name will appear on all your stories.
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/40 border border-border">
              <div className="size-9 rounded-full bg-muted border border-border flex items-center justify-center shrink-0">
                <User className="size-4 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Signed in as</p>
                <p className="text-sm font-semibold text-foreground truncate">{user?.email}</p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              Go to <strong>Profile Settings</strong> → set your <strong>Display Name</strong> → come back and start writing.
            </p>

            <Link href="/dashboard/profile">
              <Button className="w-full h-10 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm border-none shadow-lg shadow-orange-500/20 gap-2">
                <User className="size-4" />
                Set Up My Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  // ── End Gate ────────────────────────────────────────────────

  return (
    <div className="w-full max-w-7xl">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/my-posts">
            <Button variant="ghost" size="icon" className="rounded-full size-9 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-black tracking-tight">
              {isEditMode ? "Edit Post" : "Create New Post"}
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              {isEditMode ? "Update your published article" : "Draft and publish your next story"}
            </p>
          </div>
        </div>
        <span className={cn(
          "hidden sm:flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border",
          isEditMode
            ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
            : "bg-orange-500/10 text-orange-500 border-orange-500/20"
        )}>
          {isEditMode ? <><Sparkles className="size-3" /> Edit Mode</> : <><PenLine className="size-3" /> New Post</>}
        </span>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* ─── Left Panel: Metadata ──────────────────────── */}
        <div className="xl:col-span-4 space-y-4">

          {/* Thumbnail Upload */}
          <div className="bg-background border border-border rounded-2xl overflow-hidden shadow-sm">
            <div className="px-5 py-3 border-b border-border bg-muted/20 flex items-center gap-2">
              <ImageIcon className="size-3.5 text-muted-foreground" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Cover Image</span>
            </div>
            <div className="p-4">
              {data?.thumbnailUrl ? (
                <div className="relative group rounded-xl overflow-hidden aspect-video border border-border">
                  <img src={data.thumbnailUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <label className="cursor-pointer">
                      <input type="file" accept="image/*" className="hidden" onChange={handleInputChange} disabled={isUploading} />
                      <span className="flex items-center gap-1.5 text-xs font-bold text-white bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full transition-colors">
                        <Upload className="size-3" /> Replace
                      </span>
                    </label>
                    <button
                      onClick={() => handleData("thumbnailUrl", null)}
                      className="flex items-center gap-1.5 text-xs font-bold text-white bg-red-500/80 hover:bg-red-500 px-3 py-1.5 rounded-full transition-colors"
                    >
                      <X className="size-3" /> Remove
                    </button>
                  </div>
                </div>
              ) : (
                <label
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  className={cn(
                    "flex flex-col items-center justify-center aspect-video rounded-xl border-2 border-dashed transition-all cursor-pointer",
                    dragOver
                      ? "border-orange-500 bg-orange-500/5"
                      : "border-border hover:border-orange-500/50 hover:bg-orange-500/5",
                    isUploading && "pointer-events-none opacity-60"
                  )}
                >
                  <input type="file" accept="image/*" className="hidden" onChange={handleInputChange} disabled={isUploading} />
                  <div className="flex flex-col items-center gap-2 p-6 text-center">
                    {isUploading ? (
                      <>
                        <div className="size-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                          <Upload className="size-5 text-orange-500 animate-bounce" />
                        </div>
                        <p className="text-xs font-bold text-orange-500">Uploading...</p>
                      </>
                    ) : (
                      <>
                        <div className="size-10 rounded-full bg-muted flex items-center justify-center">
                          <ImageIcon className="size-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-foreground">Drop image here</p>
                          <p className="text-[11px] text-muted-foreground mt-0.5">or click to browse</p>
                        </div>
                      </>
                    )}
                  </div>
                </label>
              )}
            </div>
          </div>

          {/* Metadata Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              isEditMode ? handleUpdate() : handleCreate();
            }}
            className="bg-background border border-border rounded-2xl shadow-sm overflow-hidden"
          >
            <div className="px-5 py-3 border-b border-border bg-muted/20 flex items-center gap-2">
              <Type className="size-3.5 text-muted-foreground" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Post Details</span>
            </div>

            <div className="p-5 space-y-4">
              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                  <Type className="size-3" /> Title <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  onChange={(e) => handleData("name", e.target.value)}
                  value={data?.name || ""}
                  required
                  placeholder="A captivating title..."
                  className="w-full bg-muted/30 border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-muted-foreground/40"
                />
              </div>

              {/* Slug */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                  <Link2 className="size-3" /> URL Slug <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground font-mono">/</span>
                  <input
                    type="text"
                    disabled={isEditMode}
                    onChange={(e) => handleData("slug", e.target.value)}
                    value={data?.slug || ""}
                    required
                    placeholder="my-post-slug"
                    className="w-full pl-6 bg-muted/30 border border-border rounded-xl px-4 py-3 text-sm font-mono text-muted-foreground focus:outline-none focus:border-orange-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Read Time */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                  <Clock className="size-3" /> Read Time (Minutes)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    onChange={(e) => handleData("readTime", parseInt(e.target.value) || "")}
                    value={data?.readTime || ""}
                    placeholder="e.g. 5"
                    className="w-full bg-muted/30 border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-muted-foreground/40"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground pointer-events-none">
                    min
                  </span>
                </div>
              </div>

              {/* Category */}
              <SelectCategoryfield />

              {/* Error */}
              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold">
                  {error}
                </div>
              )}

              {/* Actions */}
              <div className="space-y-2 pt-1">
                {!isdone && (
                  <div className="flex flex-col gap-2">
                    <Button
                      type="button"
                      onClick={() => isEditMode ? handleUpdate("published") : handleCreate("published")}
                      disabled={isProcessing}
                      className={cn(
                        "w-full rounded-xl py-6 font-bold text-sm border-none shadow-lg transition-all",
                        isEditMode
                          ? "bg-amber-500 hover:bg-amber-600 shadow-amber-500/20"
                          : "bg-orange-500 hover:bg-orange-600 shadow-orange-500/20"
                      )}
                    >
                      {isProcessing ? (
                        <span className="flex items-center gap-2">
                          <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing...
                        </span>
                      ) : isEditMode ? "Update & Publish Post" : "Publish Post"}
                    </Button>
                    <Button
                      type="button"
                      onClick={() => isEditMode ? handleUpdate("draft") : handleCreate("draft")}
                      variant="outline"
                      disabled={isProcessing}
                      className="w-full rounded-xl py-6 font-bold text-sm text-foreground bg-transparent border border-border hover:bg-muted"
                    >
                      {isProcessing ? "Processing..." : "Save as Draft"}
                    </Button>
                  </div>
                )}

                {isEditMode && !isdone && (
                  <Button
                    type="button"
                    onClick={() => handleDelete(updatePostId)}
                    variant="ghost"
                    disabled={isProcessing}
                    className="w-full rounded-xl py-6 font-bold text-sm text-red-500 hover:bg-red-500/10 hover:text-red-600 border border-red-500/20"
                  >
                    <Trash2 className="size-4 mr-2" /> Delete Post
                  </Button>
                )}

                {isdone && (
                  <div className={`flex items-center justify-center gap-2 p-4 rounded-xl font-bold text-sm animate-in zoom-in-95 ${
                    lastAction === "draft"
                      ? "bg-zinc-500/10 border border-zinc-500/20 text-zinc-600 dark:text-zinc-400"
                      : "bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400"
                  }`}>
                    <CheckCircle2 className="size-5" />
                    {lastAction === "draft" 
                      ? "Draft saved! Redirecting..."
                      : isEditMode ? "Post published! Redirecting..." : "Post published! Redirecting..."
                    }
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* ─── Right Panel: Rich Text Editor ─────────────── */}
        <div className="xl:col-span-8 bg-background border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col min-h-[600px]">
          <div className="px-5 py-3 border-b border-border bg-muted/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PenLine className="size-3.5 text-muted-foreground" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Content Editor</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="size-2.5 rounded-full bg-red-400/60" />
              <div className="size-2.5 rounded-full bg-amber-400/60" />
              <div className="size-2.5 rounded-full bg-green-400/60" />
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            <RTEfield />
          </div>
        </div>
      </div>
    </div>
  );
}

function SelectCategoryfield() {
  const { data, handleData } = usePostForm();
  const { data: categories } = useCategories();

  return (
    <div className="space-y-1.5">
      <label htmlFor="category" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
        <Layers className="size-3" /> Category <span className="text-orange-500">*</span>
      </label>
      <select
        name="category"
        id="category"
        value={data?.categoryId || ""}
        onChange={(e) => handleData("categoryId", e.target.value)}
        required
        className="w-full bg-muted/30 border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all appearance-none cursor-pointer"
      >
        <option value="">Select a Category</option>
        {categories?.map((item: any) => (
          <option key={item?.id} value={item?.id}>{item?.name}</option>
        ))}
      </select>
    </div>
  );
}
