// import { CirclePlus } from "lucide-react";
// import Link from "next/link";
// import PostListView from "./components/PostListView";

// export default function Page() {
//   return (
//     <main className="w-full flex flex-col gap-3">
//       <div className="flex justify-between items-center">
//         <h1 className="font-bold p-6">Posts</h1>
//         <Link href={`/admin/posts/form`}>
//           <button className=" cursor-pointer flex gap-2 items-center bg-blue-500 px-4 py-2 text-white rounded-full font-bold">
//             <CirclePlus />
//             Add
//           </button>
//         </Link>
//       </div>
//     <PostListView />
//     </main>
//   );
// }



"use client";

import { CirclePlus, LayoutGrid, ListFilter, Search } from "lucide-react";
import Link from "next/link";
import PostListView from "./components/PostListView";
import { Button } from "@/components/ui/button"; // Using your custom button

export default function Page() {
  return (
    <main className="min-h-screen w-full flex flex-col gap-8 bg-[#0a0a0c] p-6 lg:p-10 text-slate-200">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <LayoutGrid className="text-emerald-500 size-7" />
            Content Library
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage, edit, and organize your published articles
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Search / Filter Placeholder (Optional but looks great for UI) */}
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-full text-slate-500">
            <Search className="size-4" />
            <span className="text-xs font-medium">Search posts...</span>
          </div>

          <Link href={`/admin/posts/form`} passHref>
            <Button 
              size="lg" 
              className="rounded-full gap-2 font-bold shadow-lg shadow-emerald-500/20"
            >
              <CirclePlus className="size-5" />
              Create New Post
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Overview (Optional: Adds that "Tech Admin" feel) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/40 border border-white/5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Total Posts</p>
          <p className="text-2xl font-bold text-white">24</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/40 border border-white/5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Published</p>
          <p className="text-2xl font-bold text-emerald-500">18</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/40 border border-white/5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Drafts</p>
          <p className="text-2xl font-bold text-orange-500">6</p>
        </div>
      </div>

      {/* Post List Section */}
      <section className="bg-slate-900/20 border border-white/5 rounded-[2rem] overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">Article Feed</h2>
          <Button variant="ghost" size="sm" className="text-xs text-slate-500 gap-2">
            <ListFilter className="size-3" /> Filter
          </Button>
        </div>
        
        <div className="p-2">
          <PostListView />
        </div>
      </section>

    </main>
  );
}