"use client";

import { Home, List, Zap, BookOpen, User, Sparkles, Sun, Moon, Menu } from "lucide-react";
import LoginButton from "./LoginButton";
import AuthContextProvider from "@/lib/context/AuthContext";
import Link from "next/link";
import { stripHtml } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: "Home", href: "/", icon: <Home className="size-4" /> },
    { name: "Blogs", href: "/posts", icon: <BookOpen className="size-4" /> },
    { name: "Categories", href: "/categories", icon: <List className="size-4" /> },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl transition-all duration-300">
      <div className="flex h-16 items-center justify-between px-6 lg:px-10">
        
        {/* Mobile Navigation Trigger */}
        <div className="flex md:hidden items-center gap-2">
          <Sheet>
            <SheetTrigger className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors outline-none cursor-pointer">
              <Menu className="size-5" />
              <span className="sr-only">Toggle menu</span>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] border-r border-border bg-background/95 backdrop-blur-2xl p-0">
              <SheetHeader className="p-6 border-b border-border text-left">
                <SheetTitle className="flex items-center gap-2.5">
                  <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
                    <Zap className="size-4 text-primary-foreground fill-primary-foreground" />
                  </div>
                  <span className="text-xl font-bold tracking-tighter">Nexus<span className="text-primary">UI</span></span>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 p-4 mt-2">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all group">
                    <span className="size-8 rounded-xl bg-muted group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                      {item.icon}
                    </span>
                    {item.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Branding (Centered on Mobile, Left on Desktop) */}
        <div className="flex items-center gap-3">
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="relative flex size-9 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20 transition-all group-hover:scale-105 group-hover:shadow-primary/40">
              <Zap className="size-5 fill-primary-foreground text-primary-foreground" />
              <Sparkles className="absolute -top-1 -right-1 size-3 text-primary/40 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-foreground">
              Nexus<span className="text-primary">UI</span>
            </span>
          </Link>
        </div>

        {/* Center Navigation - Desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} passHref>
              <Button
                variant="ghost"
                size="sm"
                className="text-sm gap-2 font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all rounded-full px-4"
              >
                {item.icon}
                {item.name}
              </Button>
            </Link>
          ))}
        </div>

        {/* Right Section: Auth & Theme Toggle */}
        <div className="flex items-center gap-3">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
            >
              {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </Button>
          )}
          
          <div className="hidden lg:block h-5 w-px bg-border mx-1" />
          
          <AuthContextProvider>
            <LoginButton />
          </AuthContextProvider>
        </div>
      </div>
    </nav>
  );
}