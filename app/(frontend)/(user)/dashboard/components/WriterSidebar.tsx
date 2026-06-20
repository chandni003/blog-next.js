"use client";

import { LayoutDashboard, PenTool, BookOpen, LogOut, Home, Newspaper, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { useUserRole } from "@/lib/firebase/user/read";
import { ShieldCheck } from "lucide-react";

const links = [
  { name: "Overview", link: "/dashboard", icon: LayoutDashboard },
  { name: "Create Post", link: "/dashboard/create-post", icon: PenTool },
  { name: "My Posts", link: "/dashboard/my-posts", icon: Newspaper },
  { name: "Profile", link: "/dashboard/profile", icon: UserIcon },
  { name: "Home", link: "/", icon: Home },
];

export default function WriterSidebar() {
  const pathname = usePathname();
  const { user, handleLogout } = useAuth();
  const { role } = useUserRole();

  return (
    <>
      {/* ─── Desktop Sidebar ─────────────────────────────────────── */}
      <aside className="hidden border-r border-border bg-card/30 backdrop-blur-md text-foreground lg:flex flex-col w-[260px] sticky top-0 h-screen transition-all duration-300 shrink-0">
        <div className="flex h-full flex-col">

          {/* Brand Header */}
          <div className="flex h-16 items-center px-8 border-b border-border shrink-0">
            <Link href="/" className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                <BookOpen className="size-4 text-orange-500" />
              </div>
              <span className="font-bold tracking-tight text-foreground">
                Writer <span className="text-orange-500">Dash</span>
              </span>
            </Link>
          </div>

          {/* Nav Links */}
          <div className="flex-1 overflow-y-auto p-4">
            <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3 mt-2">
              Main Menu
            </p>
            <nav className="space-y-1">
              {links.slice(0, 4).map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.link ||
                  (item.link !== "/dashboard" && pathname.startsWith(item.link + "/"));
                return (
                  <Link key={item.link} href={item.link} passHref>
                    <Button
                      variant="ghost"
                      size="lg"
                      className={cn(
                        "w-full justify-start gap-4 px-4 py-6 text-sm font-medium transition-all duration-200 rounded-xl",
                        isActive
                          ? "bg-orange-500/10 text-orange-600 dark:text-orange-400 shadow-sm"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <Icon className={cn("size-5 shrink-0", isActive ? "text-orange-500" : "text-muted-foreground")} />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
            </nav>

            {role === "admin" && (
              <div className="mt-8 px-4">
                <Link href="/admin/dashboard" passHref>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3 px-4 py-5 text-sm font-bold text-muted-foreground hover:text-primary border-border hover:border-primary/30 transition-all rounded-xl shadow-sm"
                  >
                    <ShieldCheck className="size-4" />
                    Admin Console
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* User Account Footer */}
          <div className="p-4 border-t border-border bg-muted/30 shrink-0">
            <div className="flex items-center gap-3 rounded-2xl p-3 bg-background/50 border border-border shadow-sm">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="Writer" className="size-9 rounded-full object-cover border border-border" />
              ) : (
                <div className="size-9 rounded-full bg-gradient-to-tr from-orange-500 to-rose-500 flex items-center justify-center text-white font-bold text-sm">
                  {user?.displayName?.charAt(0) || "W"}
                </div>
              )}
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-foreground truncate">{user?.displayName || "Writer"}</span>
                <span className="text-[10px] uppercase tracking-widest text-orange-500 font-bold">Writer</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="ml-auto size-8 text-muted-foreground hover:text-destructive transition-colors"
                title="Sign Out"
              >
                <LogOut className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* ─── Mobile Bottom Navigation Bar ───────────────────────── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 dark:bg-zinc-950/95 backdrop-blur-xl border-t border-border/60 flex items-center justify-around h-16 px-2 shadow-[0_-8px_30px_rgba(0,0,0,0.06)]">
        {links.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.link ||
            (item.link !== "/" && item.link !== "/dashboard" && pathname.startsWith(item.link + "/")) ||
            (item.link === "/dashboard" && pathname === "/dashboard");
          return (
            <Link
              key={item.link}
              href={item.link}
              className={cn(
                "flex flex-col items-center justify-center gap-1 flex-1 h-full rounded-xl transition-all duration-200",
                isActive ? "text-orange-500" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className={cn(
                "p-2 rounded-xl transition-all duration-200",
                isActive ? "bg-orange-500/15" : "bg-transparent"
              )}>
                <Icon className="size-5" />
              </div>
              <span className={cn("text-[10px] font-bold", isActive ? "text-orange-500" : "text-muted-foreground")}>
                {item.name}
              </span>
            </Link>
          );
        })}
        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center justify-center gap-1 flex-1 h-full rounded-xl text-muted-foreground hover:text-destructive transition-colors"
        >
          <div className="p-2 rounded-xl">
            <LogOut className="size-5" />
          </div>
          <span className="text-[10px] font-bold">Logout</span>
        </button>
      </nav>
    </>
  );
}

