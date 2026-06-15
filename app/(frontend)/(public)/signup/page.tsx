"use client";

import { useAuth } from "@/lib/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function SignupPage() {
  const { handleSignInwithGoogle, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
      <div className="max-w-md w-full space-y-8 p-8 border border-border rounded-2xl bg-card shadow-lg">
        <div className="text-center">
          <div className="mx-auto size-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
            <Sparkles className="size-6" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Create an Account</h2>
          <p className="text-muted-foreground mt-2">Join us to start reading and writing.</p>
        </div>

        <Button 
          onClick={handleSignInwithGoogle}
          disabled={isLoading}
          className="w-full h-12 text-md font-semibold flex items-center gap-2"
        >
          {isLoading ? "Authenticating..." : "Continue with Google"}
          {!isLoading && <ArrowRight className="size-4" />}
        </Button>
        
        <p className="text-center text-sm text-muted-foreground mt-6">
          Are you a writer? <Link href="/register-writer" className="text-primary hover:underline font-semibold">Apply here</Link>
        </p>
      </div>
    </div>
  );
}
