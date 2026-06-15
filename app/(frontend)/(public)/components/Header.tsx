"use client";

import Link from "next/link";
import { useAuth } from "@/lib/context/AuthContext";
import { useUserRole } from "@/lib/firebase/user/read";
import { LogOut, LayoutDashboard, ChevronDown, Sun, Moon, Sparkles, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const { user, isLoading: authLoading, handleSignInwithGoogle, handleLogout } = useAuth();
  const { role } = useUserRole();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="sticky top-5 z-50 w-full px-6 flex flex-col items-center mb-8">
      {/* Increased height to a spacious h-16 with enhanced padding and generous layout tracking */}
      <nav className="flex items-center justify-between w-full max-w-6xl h-16 px-6 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800/50 rounded-full shadow-md transition-all duration-300">
        
        {/* Left: Brand Identity */}
        <Link href="/" className="flex items-center gap-2.5 group outline-none shrink-0">
          <div className="flex items-center justify-center h-9 w-9 rounded-full bg-orange-500/10 group-hover:scale-105 transition-transform duration-200">
            <Sparkles className="h-4 w-4 text-orange-500" />
          </div>
          {/* Kept text-sm font-bold for crisp and minimal appearance */}
          <span className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            blogPost
          </span>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1.5 bg-zinc-100/50 dark:bg-zinc-900/40 p-1 rounded-full border border-zinc-200/30 dark:border-zinc-800/30">
          <Link href="/">
            {/* Kept height tight at h-9 inside a tall bar with text-xs formatting */}
            <Button variant="ghost" className="rounded-full text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-white dark:hover:bg-zinc-900 h-9 px-5 shadow-none transition-all">
              Home
            </Button>
          </Link>
          <Link href="/blogs">
            <Button variant="ghost" className="rounded-full text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-white dark:hover:bg-zinc-900 h-9 px-5 shadow-none transition-all">
              Blogs
            </Button>
          </Link>
        </div>

        {/* Right: Actions & Theme */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Theme Toggle */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-9 w-9 rounded-full text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          )}

          <div className="w-px h-5 bg-zinc-200 dark:bg-zinc-800 hidden sm:block" />

          {/* Authentication */}
          {authLoading ? (
            <div className="h-9 w-24 animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-900" />
          ) : !user ? (
            <Button
              onClick={handleSignInwithGoogle}
              className="rounded-full h-9 px-5 text-xs font-semibold text-white bg-zinc-900 dark:bg-zinc-50 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-sm"
            >
              Join as Writer
            </Button>
          ) : (
            <DropdownMenu>
              {/* Elegant wide-yet-low-profile trigger for profile identity */}
              <DropdownMenuTrigger className="flex items-center gap-2 h-9 pl-1 pr-3 rounded-full bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 border border-zinc-200/60 dark:border-zinc-800/60 transition-all outline-none group">
                <img
                  src={user?.photoURL || ""}
                  alt="Avatar"
                  className="h-7 w-7 rounded-full object-cover shadow-sm"
                />
                <span className="text-xs font-semibold max-w-[90px] truncate hidden sm:block text-zinc-700 dark:text-zinc-300">
                  {user?.displayName?.split(" ")[0]}
                </span>
                <ChevronDown className="h-3 w-3 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" />
              </DropdownMenuTrigger>
              
              {/* Redefined Dropdown Menu: Highly Spacious yet Clean */}
              <DropdownMenuContent align="end" className="w-56 rounded-2xl shadow-xl border-zinc-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-2 mt-3 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="flex flex-col px-3 py-3 mb-1.5 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100 dark:border-zinc-900">
                  <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate">{user?.displayName}</span>
                  <span className="text-[11px] text-zinc-400 dark:text-zinc-500 truncate mt-0.5">{user?.email}</span>
                </div>
                
                <DropdownMenuItem className="rounded-xl p-0 focus:bg-zinc-50 dark:focus:bg-zinc-900">
                  <Link 
                    href="/dashboard" 
                    className="flex items-center gap-3 w-full p-2.5 cursor-pointer outline-none"
                  >
                    <LayoutDashboard className="h-4 w-4 text-zinc-400" />
                    <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Writer Dashboard</span>
                  </Link>
                </DropdownMenuItem>

                {role === "admin" && (
                  <DropdownMenuItem className="rounded-xl p-0 focus:bg-zinc-50 dark:focus:bg-zinc-900 mt-1">
                    <Link 
                      href="/admin/dashboard" 
                      className="flex items-center gap-3 w-full p-2.5 cursor-pointer outline-none"
                    >
                      <Sparkles className="h-4 w-4 text-zinc-400" />
                      <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Admin Console</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                
                <DropdownMenuSeparator className="bg-zinc-100 dark:bg-zinc-900 my-1" />
                
                <DropdownMenuItem onClick={handleLogout} className="rounded-xl p-2.5 cursor-pointer text-red-500 focus:bg-red-50/50 dark:focus:bg-red-950/20 focus:text-red-600 transition-colors">
                  <div className="flex items-center gap-3 w-full">
                    <LogOut className="h-4 w-4" />
                    <span className="text-xs font-semibold">Sign Out</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Hamburger Mobile Trigger */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="h-9 w-9 rounded-full md:hidden text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-900"
          >
            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Responsive Navigation Tray */}
      {isMobileMenuOpen && (
        <div className="w-full max-w-6xl mt-2.5 p-1.5 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl shadow-md flex flex-col gap-1 md:hidden animate-in slide-in-from-top-2 duration-200">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
            <Button variant="ghost" className="w-full justify-start rounded-xl text-xs font-semibold text-zinc-600 dark:text-zinc-400 h-10 px-4">
              Home
            </Button>
          </Link>
          <Link href="/blogs" onClick={() => setIsMobileMenuOpen(false)}>
            <Button variant="ghost" className="w-full justify-start rounded-xl text-xs font-semibold text-zinc-600 dark:text-zinc-400 h-10 px-4">
              Blogs
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}