"use client";

import { useState } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { createNewAuthor } from "@/lib/firebase/author/write";
import { Button } from "@/components/ui/button";
import { Sparkles, PenTool, CheckCircle2 } from "lucide-react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ProfileSetup() {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) {
      setError("Display name is required.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // 1. Create the Author Profile mapped to user's UID
      await createNewAuthor({
        uid: user.uid,
        data: {
          name: displayName.trim(),
          email: user.email,
          officialName: user.displayName,
          biography: "",
          socialLinks: { twitter: "", linkedin: "", github: "" },
        },
      });

      // 2. Ensure they have the 'writer' role (or 'admin' if already set)
      // This merges with existing user profile to not overwrite 'admin' if they have it
      await setDoc(
        doc(db, "users", user.uid),
        { 
          email: user.email,
          name: user.displayName, 
          // We don't overwrite role if it exists, read.tsx handles that, 
          // but let's ensure it's at least 'writer'
        },
        { merge: true }
      );

      // The layout will automatically re-render and hide this component
      // once `useAuthorProfile` detects the newly created profile.
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-950 text-foreground relative overflow-hidden w-full">
      {/* Decorative Blur */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-orange-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-rose-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />

      <div className="max-w-md w-full relative z-10">
        <div className="bg-card border border-border shadow-2xl rounded-3xl p-8 sm:p-10">
          <div className="flex justify-center mb-6">
            <div className="size-14 rounded-2xl bg-orange-500/10 flex items-center justify-center">
              <Sparkles className="size-7 text-orange-500" />
            </div>
          </div>
          
          <h1 className="text-2xl font-black text-center mb-2 tracking-tight">Complete Your Profile</h1>
          <p className="text-sm text-center text-muted-foreground mb-8">
            Before you can access the dashboard, please choose the name you want to display on your published stories.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                Author Display Name
              </label>
              <div className="relative">
                <PenTool className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full h-12 pl-10 pr-4 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all text-sm font-semibold"
                  placeholder="e.g. John Doe"
                />
              </div>
              <p className="text-[11px] text-muted-foreground ml-1 mt-1.5 flex items-center gap-1.5">
                <CheckCircle2 className="size-3 text-green-500" /> This will be visible to the public.
              </p>
            </div>

            {error && <p className="text-xs text-red-500 text-center font-medium">{error}</p>}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 rounded-xl bg-foreground text-background font-bold hover:scale-[1.02] transition-transform shadow-lg"
            >
              {isSubmitting ? "Setting up..." : "Save & Continue to Dashboard"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
