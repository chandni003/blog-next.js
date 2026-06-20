"use client";

import WriterSidebar from "./components/WriterSidebar";
import { useAuth } from "@/lib/context/AuthContext";
import { useTheme } from "next-themes";
import { Sun, Moon, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useUserRole } from "@/lib/firebase/user/read";
import { useAuthorProfile } from "@/lib/firebase/author/read";
import ProfileSetup from "./components/ProfileSetup";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LayoutDashboard, LogOut, ShieldCheck, User as UserIcon } from "lucide-react";
import Link from "next/link";

function DashboardTopNav() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { role } = useUserRole();

  useEffect(() => { setMounted(true); }, []);

  const pageTitle: Record<string, string> = {
    "/dashboard": "Overview",
    "/dashboard/create-post": "Create Post",
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
        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 h-9 pl-1 pr-3 rounded-full bg-muted/50 hover:bg-muted border border-border transition-all outline-none group">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="Avatar"
                className="size-7 rounded-full object-cover shadow-sm"
              />
            ) : (
              <div className="size-7 rounded-full bg-gradient-to-tr from-orange-500 to-rose-500 flex items-center justify-center text-white font-bold text-[10px]">
                {user?.displayName?.charAt(0) || "W"}
              </div>
            )}
            <span className="text-xs font-semibold max-w-[90px] truncate hidden sm:block text-foreground">
              {user?.displayName?.split(" ")[0] || "Writer"}
            </span>
            <ChevronDown className="h-3 w-3 text-muted-foreground group-hover:text-foreground transition-colors" />
          </DropdownMenuTrigger>
          
          <DropdownMenuContent align="end" className="w-56 rounded-2xl shadow-xl border-border bg-background p-2 mt-3 animate-in fade-in slide-in-from-top-1 duration-150">
            <div className="flex flex-col px-3 py-3 mb-1.5 bg-muted/30 rounded-xl border border-border">
              <span className="text-xs font-bold text-foreground truncate">{user?.displayName || "Writer"}</span>
              <span className="text-[11px] text-muted-foreground truncate mt-0.5">{user?.email}</span>
            </div>
            
            <DropdownMenuItem className="rounded-xl p-0 focus:bg-muted">
              <Link 
                href="/dashboard" 
                className="flex items-center gap-3 w-full p-2.5 cursor-pointer outline-none"
              >
                <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-semibold">Writer Dashboard</span>
              </Link>
            </DropdownMenuItem>

            {role === "admin" && (
              <DropdownMenuItem className="rounded-xl p-0 focus:bg-muted mt-1">
                <Link 
                  href="/admin/dashboard" 
                  className="flex items-center gap-3 w-full p-2.5 cursor-pointer outline-none"
                >
                  <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-semibold">Admin Console</span>
                </Link>
              </DropdownMenuItem>
            )}
            
            <DropdownMenuSeparator className="bg-border my-1" />
            
            <DropdownMenuItem 
              onClick={() => { /* Logout is handled in sidebar, but can be added here if needed */ }} 
              className="rounded-xl p-2.5 cursor-pointer text-red-500 focus:bg-red-500/10 focus:text-red-600 transition-colors"
            >
              <div className="flex items-center gap-3 w-full">
                <LogOut className="h-4 w-4" />
                <span className="text-xs font-semibold">Sign Out</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading: authLoading } = useAuth();
  const { data: authorProfile, isLoading: authorLoading } = useAuthorProfile(user?.uid);

  // Still loading authentication or checking profile
  if (authLoading || authorLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/10">
        <div className="size-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // User is logged in but has no author profile -> FORCE PROFILE SETUP
  if (user && !authorProfile) {
    return <ProfileSetup />;
  }

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

