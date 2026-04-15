// import { CirclePlus } from "lucide-react";
// import Link from "next/link";
// import CategoriesListView from "./components/categoriesListView";
// export default function Page() {
//   return (
//     <main className="w-full flex flex-col gap-3">
//       <div className="flex justify-between items-center">
//         <h1 className="font-bold p-6">categories</h1>
//         <Link href={`/admin/categories/form`}>
//           <button className=" cursor-pointer flex gap-2 items-center bg-blue-500 px-4 py-2 text-white rounded-full font-bold">
//             <CirclePlus />
//             Add
//           </button>
//         </Link>
//       </div>
//      <CategoriesListView />
//     </main>
//   );
// }



"use client";

import { CirclePlus, Layers, Search, ListFilter, Tag } from "lucide-react";
import Link from "next/link";
import CategoriesListView from "./components/categoriesListView";
import { Button } from "@/components/ui/button"; // Using your custom button

export default function Page() {
  return (
    <main className="min-h-screen w-full flex flex-col gap-8 bg-[#0a0a0c] p-6 lg:p-10 text-slate-200">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <Layers className="text-emerald-500 size-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Taxonomy Editor</h1>
            <p className="text-sm text-slate-500 mt-1">
              Organize and classify your blog content categories
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Search Bar - Visual Consistency */}
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-full text-slate-500">
            <Search className="size-4" />
            <input 
              type="text" 
              placeholder="Filter categories..." 
              className="bg-transparent border-none text-xs focus:outline-none placeholder:text-slate-700 w-32"
            />
          </div>

          <Link href={`/admin/categories/form`} passHref>
            <Button 
              size="lg" 
              className="rounded-full gap-2 font-bold shadow-lg shadow-emerald-500/20"
            >
              <CirclePlus className="size-5" />
              Add Category
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-[1.5rem] bg-slate-900/40 border border-white/5 flex flex-col gap-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
            <Tag className="size-3 text-emerald-500" /> Active Categories
          </span>
          <span className="text-2xl font-bold text-white">12</span>
        </div>
        {/* You can add more metric cards here as your logic expands */}
      </div>

      {/* Table Container */}
      <section className="bg-slate-900/20 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-xl">
        <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">Classification List</h2>
          <Button variant="ghost" size="sm" className="text-xs text-slate-500 gap-2 hover:bg-emerald-500/10">
            <ListFilter className="size-3" /> Sort View
          </Button>
        </div>
        
        <div className="p-2">
          <CategoriesListView />
        </div>
      </section>

    </main>
  );
}