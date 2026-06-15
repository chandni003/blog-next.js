"use client";

import { Button } from "@/components/ui/button";
import { PenTool } from "lucide-react";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function RegisterWriterPage() {
  const [formData, setFormData] = useState({ name: "", email: "", bio: "", portfolio: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "writerRequests"), {
        ...formData,
        status: "pending",
        timestamp: serverTimestamp(),
      });
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Failed to submit application.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background">
        <div className="max-w-md text-center space-y-4">
          <h2 className="text-3xl font-bold text-primary">Application Received!</h2>
          <p className="text-muted-foreground">Our team will review your portfolio and get back to you shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6 py-20">
      <div className="max-w-lg w-full space-y-8 p-10 border border-border rounded-3xl bg-card shadow-xl">
        <div className="text-center">
          <div className="mx-auto size-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
            <PenTool className="size-8" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Become a Writer</h2>
          <p className="text-muted-foreground mt-2">Share your expertise with our global audience.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
          <div className="space-y-2">
            <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Full Name</label>
            <input 
              required
              type="text" 
              className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Email Address</label>
            <input 
              required
              type="email" 
              className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Portfolio / LinkedIn URL</label>
            <input 
              required
              type="url" 
              className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={formData.portfolio}
              onChange={e => setFormData({...formData, portfolio: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Short Bio</label>
            <textarea 
              required
              rows={4}
              className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              value={formData.bio}
              onChange={e => setFormData({...formData, bio: e.target.value})}
            />
          </div>

          <Button 
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary/20"
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </div>
    </div>
  );
}
