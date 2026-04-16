"use client";

import { useAuth } from "@/lib/context/AuthContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  LayoutDashboard,
  User,
  ChevronDown,
  LogIn,
  Layers3,
  BookOpen,
  PlusCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function LoginButton() {
  const { user, isLoading, handleSignInwithGoogle, handleLogout } = useAuth();

  // 1. Loading State (NexusUI Minimalist)
  if (isLoading) {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/50">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  // 2. Logged In State (NexusUI Premium Dropdown)
  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-3 cursor-pointer group bg-card/40 hover:bg-card/80 p-1.5 pr-4 rounded-full border border-border transition-all duration-300 shadow-sm hover:border-primary/30 outline-none">
          {/* User Avatar */}
          <div className="relative">
            <img
              className="h-9 w-9 rounded-full border border-border object-cover group-hover:border-primary transition-colors"
              src={user?.photoURL || ""}
              alt="Profile"
            />
            <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background bg-primary" />
          </div>

          {/* User Name & Info */}
          <div className="hidden sm:flex flex-col items-start leading-tight">
            <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
              {user?.displayName?.split(" ")[0]}
            </span>
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
              Operator
            </span>
          </div>

          <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform group-data-[state=open]:rotate-180 duration-300" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" sideOffset={12} className="w-72 bg-background/95 backdrop-blur-xl border-border p-2 shadow-2xl rounded-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          <DropdownMenuGroup>
            <DropdownMenuLabel className="px-4 py-4 font-normal">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-bold text-foreground leading-none">{user?.displayName}</p>
                <p className="text-[11px] text-muted-foreground truncate font-medium">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="bg-border/50 mx-2" />

          <DropdownMenuGroup className="p-1">
            <Link href="/admin">
              <DropdownMenuItem className="cursor-pointer gap-3 py-3 px-4 rounded-2xl focus:bg-primary focus:text-primary-foreground group transition-all">
                <LayoutDashboard className="h-4 w-4 opacity-70 group-hover:opacity-100" />
                <span className="font-bold text-xs uppercase tracking-widest">Admin Dashboard</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="bg-border/50 mx-2" />

          {/* Quick Actions / Functionality Section */}
          <DropdownMenuGroup>
            <DropdownMenuLabel className="px-4 py-2 mt-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Quick Access</span>
            </DropdownMenuLabel>
          </DropdownMenuGroup>

          <DropdownMenuGroup className="p-1">
            <Link href="/admin/posts">
              <DropdownMenuItem className="cursor-pointer gap-3 py-3 px-4 rounded-2xl hover:bg-primary/5 focus:bg-primary/10 text-foreground/80 focus:text-primary transition-all">
                <BookOpen className="h-4 w-4" />
                <span className="font-bold text-xs uppercase tracking-wider text-muted-foreground group-hover:text-primary">Manage Insights</span>
              </DropdownMenuItem>
            </Link>
            
            <Link href="/admin/categories">
              <DropdownMenuItem className="cursor-pointer gap-3 py-3 px-4 rounded-2xl hover:bg-primary/5 focus:bg-primary/10 text-foreground/80 focus:text-primary transition-all">
                <Layers3 className="h-4 w-4" />
                <span className="font-bold text-xs uppercase tracking-wider text-muted-foreground group-hover:text-primary">Taxonomy Root</span>
              </DropdownMenuItem>
            </Link>

            <Link href="/admin/posts/form">
              <DropdownMenuItem className="cursor-pointer gap-3 py-3 px-4 rounded-2xl bg-primary/5 hover:bg-primary/10 text-primary transition-all border border-primary/10 mt-1">
                <PlusCircle className="h-4 w-4" />
                <span className="font-bold text-xs uppercase tracking-wider">New Report</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="bg-border/50 mx-2 my-2" />

          <DropdownMenuGroup className="p-1">
            <DropdownMenuItem
              onClick={() => handleLogout()}
              className="cursor-pointer gap-3 py-3 px-4 rounded-2xl text-destructive hover:bg-destructive/5 focus:bg-destructive/10 transition-all font-bold"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-xs uppercase tracking-widest">Terminate Session</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // 3. Logged Out State (NexusUI Signature Primary Button)
  return (
    <Button
      onClick={handleSignInwithGoogle}
      variant="default"
      size="lg"
      className="rounded-full gap-3 bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/20 px-8 h-12 transition-all hover:scale-105 active:scale-95"
    >
      <div className="bg-white rounded-full p-1 shadow-inner">
        <img className="h-3 w-3" src="/google.png" alt="Google" />
      </div>
      <span className="font-extrabold uppercase tracking-widest text-[11px]">System Login</span>
      <LogIn className="h-4 w-4" />
    </Button>
  );
}