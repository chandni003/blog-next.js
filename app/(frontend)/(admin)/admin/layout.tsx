"use client";

import Sidebar from "@/app/components/Header/Sidebar";
import AuthContextProvider, { useAuth } from "@/lib/context/AuthContext";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon, ShieldCheck, ChevronDown, LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function AdminTopNav({ isMobileMenuOpen, setIsMobileMenuOpen }: { isMobileMenuOpen: boolean, setIsMobileMenuOpen: (v: boolean) => void }) {
  const { user, handleLogout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setMounted(true); }, []);

  const pageTitle: Record<string, string> = {
    "/admin/dashboard": "Dashboard",
    "/admin/posts": "Posts",
    "/admin/categories": "Categories",
    "/admin/authors": "Authors",
    "/admin/users": "Users",
    "/admin/writers": "Requests",
  };
  const title = pageTitle[pathname] || "Admin Console";

  return (
    <header className="sticky top-0 z-40 w-full h-14 flex items-center justify-between px-6 lg:px-8 bg-background/90 dark:bg-zinc-950/90 backdrop-blur-xl border-b border-border/60 shrink-0">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-foreground -ml-2"
        >
          {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium hidden sm:inline">Admin</span>
          <span className="text-xs text-muted-foreground hidden sm:inline">/</span>
          <span className="text-sm font-bold text-foreground">{title}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-9 w-9 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 h-9 pl-1 pr-3 rounded-full bg-muted/50 hover:bg-muted border border-border transition-all outline-none group">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="Avatar"
                className="size-7 rounded-full object-cover shadow-sm border border-primary/20"
              />
            ) : (
              <div className="size-7 rounded-full bg-gradient-to-tr from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold text-[10px]">
                {user?.displayName?.charAt(0) || "A"}
              </div>
            )}
            <span className="text-xs font-semibold max-w-[90px] truncate hidden sm:block text-foreground">
              {user?.displayName?.split(" ")[0] || "Admin"}
            </span>
            <ChevronDown className="h-3 w-3 text-muted-foreground group-hover:text-foreground transition-colors" />
          </DropdownMenuTrigger>
          
          <DropdownMenuContent align="end" className="w-56 rounded-2xl shadow-xl border-border bg-background p-2 mt-3 animate-in fade-in slide-in-from-top-1 duration-150">
            <div className="flex flex-col px-3 py-3 mb-1.5 bg-muted/30 rounded-xl border border-border">
              <span className="text-xs font-bold text-foreground truncate">{user?.displayName || "Admin"}</span>
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

            <DropdownMenuItem className="rounded-xl p-0 focus:bg-muted mt-1">
              <Link 
                href="/admin/dashboard" 
                className="flex items-center gap-3 w-full p-2.5 cursor-pointer outline-none"
              >
                <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-semibold">Admin Console</span>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator className="bg-border my-1" />
            
            <DropdownMenuItem 
              onClick={handleLogout} 
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

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <AuthContextProvider>
      <div className="flex bg-slate-50/50 dark:bg-zinc-950/50 text-foreground min-h-screen transition-colors duration-300">
        <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
        <div className="flex-1 flex flex-col min-w-0">
          <AdminTopNav isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
          <section className="flex-1 overflow-y-auto">
            {children}
          </section>
        </div>
      </div>
    </AuthContextProvider>
  );
}
