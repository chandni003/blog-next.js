"use client";

import WriterSidebar from "./components/WriterSidebar";
import { useAuth } from "@/lib/context/AuthContext";
import { useTheme } from "next-themes";
import { Sun, Moon, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function DashboardTopNav() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setMounted(true); }, []);

  const pageTitle: Record<string, string> = {
    "/dashboard": "Overview",
    "/dashboard/create-post": "Create Post",
    "/dashboard/create-category": "Categories",
    "/dashboard/my-posts": "My Posts",
  };
  const title = pageTitle[pathname] || "Dashboard";

  return (
    <header className="sticky top-0 z-40 w-full h-14 flex items-center justify-between px-6 lg:px-8 bg-background/90 dark:bg-zinc-950/90 backdrop-blur-xl border-b border-border/60 shrink-0">
      {/* Page Title */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground font-medium hidden sm:inline">Dashboard</span>
        <span className="text-xs text-muted-foreground hidden sm:inline">/</span>
        <span className="text-sm font-bold text-foreground">{title}</span>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2">
        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-9 w-9 rounded-full text-muted-foreground hover:text-orange-500 hover:bg-orange-500/10 transition-colors"
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
        )}
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="Avatar"
            className="size-8 rounded-full border-2 border-orange-500/20 object-cover"
          />
        ) : (
          <div className="size-8 rounded-full bg-gradient-to-tr from-orange-500 to-rose-500 flex items-center justify-center text-white font-bold text-xs">
            {user?.displayName?.charAt(0) || "W"}
          </div>
        )}
      </div>
    </header>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-muted/10">
      <WriterSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardTopNav />
        {/* pb-24 gives clearance for the fixed mobile bottom nav bar */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 pb-24 lg:pb-8">
          {children}
        </main>
      </div>
    </div>
  );
}

