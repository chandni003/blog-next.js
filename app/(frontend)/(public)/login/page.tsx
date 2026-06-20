"use client"
import { useAuth } from "@/lib/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function LoginPage() {
  const { handleSignInwithGoogle, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-orange-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-rose-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-amber-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />

      <div className="relative z-10 max-w-md w-full space-y-8 p-10 border border-white/20 dark:border-zinc-800/50 rounded-3xl bg-white/60 dark:bg-zinc-900/60 backdrop-blur-2xl shadow-2xl">
        
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-orange-500/10 group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="h-5 w-5 text-orange-500" />
            </div>
            <span className="text-xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
              blogPost
            </span>
          </Link>
        </div>

        <div className="text-center space-y-3">
          <h2 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">Welcome Back</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">Sign in to publish your stories and access the writer dashboard.</p>
        </div>

        <div className="pt-4">
          <Button 
            onClick={handleSignInwithGoogle}
            disabled={isLoading}
            className="w-full h-14 rounded-xl text-base font-bold flex items-center justify-center gap-3 bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            {isLoading ? "Authenticating..." : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
                <ArrowRight className="size-4 ml-1 opacity-70" />
              </>
            )}
          </Button>
        </div>
        
        <p className="text-center text-xs text-zinc-400 dark:text-zinc-500 pt-4">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
