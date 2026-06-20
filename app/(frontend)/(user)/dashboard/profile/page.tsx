"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { useAuthorProfile } from "@/lib/firebase/author/read";
import { UpdateAuthor } from "@/lib/firebase/author/write";
import { Button } from "@/components/ui/button";
import { User, Mail, PenTool, CheckCircle2 } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  const { data: authorProfile, isLoading: profileLoading } = useAuthorProfile(user?.uid);
  
  const [displayName, setDisplayName] = useState("");
  const [biography, setBiography] = useState("");
  const [socialLinks, setSocialLinks] = useState({ twitter: "", linkedin: "", github: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (authorProfile) {
      if (authorProfile.name) setDisplayName(authorProfile.name);
      if (authorProfile.biography) setBiography(authorProfile.biography);
      if (authorProfile.socialLinks) setSocialLinks(authorProfile.socialLinks);
    }
  }, [authorProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) {
      setError("Display name cannot be empty.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      await UpdateAuthor({
        uid: user.uid,
        data: {
          name: displayName.trim(),
          biography: biography.trim(),
          socialLinks: socialLinks,
        },
      });
      setSuccess("Profile updated successfully!");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to update profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (profileLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="size-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-foreground">Profile Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your public author profile and view your registration details.
        </p>
      </div>

      <div className="grid gap-8">
        {/* Read-only Information */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="text-base font-bold text-foreground mb-4">Official Registration Details</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-1">
                <User className="size-3.5" /> Official Name
              </label>
              <div className="h-10 px-3 bg-muted/50 border border-border rounded-lg flex items-center text-sm font-medium text-muted-foreground">
                {user?.displayName || "N/A"}
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">
                This is the name associated with your Google Account.
              </p>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-1">
                <Mail className="size-3.5" /> Email Address
              </label>
              <div className="h-10 px-3 bg-muted/50 border border-border rounded-lg flex items-center text-sm font-medium text-muted-foreground">
                {user?.email || "N/A"}
              </div>
            </div>
          </div>
        </div>

        {/* Editable Author Profile */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <h2 className="text-base font-bold text-foreground mb-4">Author Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-1">
                <PenTool className="size-3.5" /> Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full h-10 px-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all text-sm font-semibold text-foreground"
                placeholder="Enter your public display name"
              />
              <p className="text-[10px] text-muted-foreground mt-1">
                This name will be displayed on all your published stories.
              </p>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-1">
                Biography
              </label>
              <textarea
                value={biography}
                onChange={(e) => setBiography(e.target.value)}
                rows={4}
                className="w-full px-3 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all text-sm font-semibold text-foreground resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-2">
                Social Links
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  value={socialLinks.twitter}
                  onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
                  className="w-full h-10 px-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all text-sm font-semibold text-foreground"
                  placeholder="Twitter Handle"
                />
                <input
                  type="text"
                  value={socialLinks.linkedin}
                  onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                  className="w-full h-10 px-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all text-sm font-semibold text-foreground"
                  placeholder="LinkedIn URL"
                />
                <input
                  type="text"
                  value={socialLinks.github}
                  onChange={(e) => setSocialLinks({ ...socialLinks, github: e.target.value })}
                  className="w-full h-10 px-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all text-sm font-semibold text-foreground"
                  placeholder="GitHub Username"
                />
              </div>
            </div>

            {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
            {success && <p className="text-xs text-green-500 font-medium flex items-center gap-1"><CheckCircle2 className="size-3" /> {success}</p>}

            <div className="pt-2 flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-9 px-6 rounded-lg text-xs font-bold bg-foreground text-background"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
