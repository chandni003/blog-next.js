"use client";

import { useAuth } from "@/lib/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
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
          <h2 className="text-3xl font-bold tracking-tight">Welcome Back</h2>
          <p className="text-muted-foreground mt-2">Sign in to access your dashboard.</p>
        </div>

        <Button 
          onClick={handleSignInwithGoogle}
          disabled={isLoading}
          className="w-full h-12 text-md font-semibold flex items-center gap-2"
        >
          {isLoading ? "Authenticating..." : "Continue with Google"}
          {!isLoading && <ArrowRight className="size-4" />}
        </Button>
      </div>
    </div>
  );
}
