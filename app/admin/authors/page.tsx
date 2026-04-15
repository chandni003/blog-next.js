"use client";

import { CirclePlus, User, Search, ListFilter, Users } from "lucide-react";
import Link from "next/link";
import AuthorsListView from "./components/AuthorsListView";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col gap-8 p-6 lg:p-10 transition-colors duration-300">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 shadow-sm">
            <User className="text-primary size-7" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Author Registry</h1>
            <p className="text-sm text-muted-foreground mt-1 font-medium">
              Manage your technical writing team and contributors
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Filter Search */}
          <div className="hidden sm:flex items-center gap-3 px-5 py-2.5 bg-card border border-border rounded-full text-muted-foreground focus-within:border-primary/50 transition-all shadow-sm">
            <Search className="size-4" />
            <input 
              type="text" 
              placeholder="Search authors..." 
              className="bg-transparent border-none text-xs focus:outline-none placeholder:text-muted-foreground/50 w-36 font-medium"
            />
          </div>

          <Link href={`/admin/authors/form`} passHref>
            <Button 
              size="lg" 
              className="rounded-full gap-2 font-bold shadow-lg shadow-primary/20 h-12 px-6"
            >
              <CirclePlus className="size-5" />
              Add Contributor
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-card border border-border flex flex-col gap-2 shadow-sm hover:border-primary/20 transition-all">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Users className="size-3 text-primary" /> Active Writers
            </span>
          </div>
          <span className="text-3xl font-bold">12</span>
        </div>
      </div>

      {/* List Container */}
      <section className="bg-card/50 backdrop-blur-sm border border-border rounded-[2.5rem] overflow-hidden shadow-xl transition-all">
        <div className="p-6 border-b border-border bg-muted/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="size-2 rounded-full bg-primary animate-pulse" />
             <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Personnel Database</h2>
          </div>
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground gap-2 hover:text-primary rounded-full px-4">
            <ListFilter className="size-3" /> Filter List
          </Button>
        </div>
        
        <div className="p-4">
          <AuthorsListView />
        </div>
      </section>

    </main>
  );
}