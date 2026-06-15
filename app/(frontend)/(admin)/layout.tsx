"use client";

import { useAuth } from "@/lib/context/AuthContext";
import { useUserRole } from "@/lib/firebase/user/read";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2, ShieldX } from "lucide-react";

export default function AdminGuardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading: authLoading } = useAuth();
  const { role, isLoading: roleLoading } = useUserRole();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    } else if (!roleLoading && user && role !== "admin") {
      router.push("/");
    }
  }, [user, authLoading, role, roleLoading, router]);

  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4 text-muted-foreground">
          <Loader2 className="size-10 animate-spin text-primary" />
          <p className="text-sm font-medium">Verifying credentials...</p>
        </div>
      </div>
    );
  }

  if (!user || role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center space-y-4">
          <ShieldX className="size-16 text-destructive mx-auto opacity-50" />
          <h2 className="text-2xl font-bold">Access Denied</h2>
          <p className="text-muted-foreground">You do not have admin privileges.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
