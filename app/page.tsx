// // import Image from "next/image";
// // import Header from "./components/Header/Header";
// // import PostListView from "./components/PostListView";

// // export default function Home() {
// //   return (
// //     <main className="h-screen bg-white text-black">
// //       {/* <Header /> */}
// //       <PostListView />
// //     </main>
// //   );
// // }



// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { 
//   ArrowRight, 
//   Code2, 
//   Sparkles, 
//   TrendingUp, 
//   Clock, 
//   ChevronRight 
// } from "lucide-react";

// export default function HomePage() {
//   return (
//     <main className="min-h-screen bg-[#0a0a0c] text-slate-200 selection:bg-emerald-500/30">
      
//       {/* 1. HERO SECTION */}
//       <section className="relative overflow-hidden pt-20 pb-16 lg:pt-32 lg:pb-24">
//         {/* Background Glows */}
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
        
//         <div className="container mx-auto px-6 relative z-10">
//           <div className="max-w-3xl">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
//               <Sparkles className="size-3" />
//               <span>Next.js + Firebase Powered</span>
//             </div>
            
//             <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tighter text-white mb-6 leading-[1.1]">
//               Architecting the <span className="text-emerald-500">Future</span> of Web Dev.
//             </h1>
            
//             <p className="text-lg lg:text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl">
//               Exploring the intersection of Full-Stack development, Machine Learning, and clean UI design. Dive into my latest thoughts, tutorials, and technical deep-dives.
//             </p>

//             <div className="flex flex-wrap gap-4">
//               <Button size="lg" className="rounded-full px-8 font-bold">
//                 Start Reading <ArrowRight className="ml-2 size-5" />
//               </Button>
//               <Button variant="outline" size="lg" className="rounded-full px-8 border-slate-800 text-slate-300">
//                 View Projects
//               </Button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* 2. STATS / STRIP */}
//       <section className="border-y border-white/5 bg-white/[0.02] py-8">
//         <div className="container mx-auto px-6">
//           <div className="flex flex-wrap justify-between gap-8 text-slate-500">
//             <div className="flex items-center gap-3">
//               <Code2 className="text-emerald-500 size-5" />
//               <span className="text-sm font-medium tracking-wide">Next.js 15 Framework</span>
//             </div>
//             <div className="flex items-center gap-3">
//               <TrendingUp className="text-emerald-500 size-5" />
//               <span className="text-sm font-medium tracking-wide">Machine Learning Insights</span>
//             </div>
//             <div className="flex items-center gap-3">
//               <Clock className="text-emerald-500 size-5" />
//               <span className="text-sm font-medium tracking-wide">Weekly Updates</span>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* 3. BLOG POSTS SECTION */}
//       <section className="py-20 lg:py-32">
//         <div className="container mx-auto px-6">
          
//           <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
//             <div>
//               <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight mb-4">
//                 Latest <span className="text-emerald-500">Articles</span>
//               </h2>
//               <p className="text-slate-400 max-w-md">
//                 Freshly baked insights from the development world.
//               </p>
//             </div>
//             <Link href="/posts" className="text-emerald-500 font-bold flex items-center gap-1 hover:gap-2 transition-all">
//               View all posts <ChevronRight className="size-5" />
//             </Link>
//           </div>

//           {/* This is the grid where your Map logic will go */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
//             {/* Placeholder for Card Mapping */}
//             {[1, 2, 3, 4, 5, 6].map((i) => (
//               <article 
//                 key={i} 
//                 className="group relative flex flex-col bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 shadow-xl"
//               >
//                 {/* Post Image Container */}
//                 <div className="aspect-[16/9] bg-slate-800 overflow-hidden">
//                   <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
//                     <Code2 className="size-12 text-slate-700 opacity-50" />
//                   </div>
//                 </div>

//                 {/* Content */}
//                 <div className="p-6 flex flex-col flex-1">
//                   <div className="flex items-center gap-3 mb-4">
//                     <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
//                       Development
//                     </span>
//                     <span className="text-xs text-slate-500">5 min read</span>
//                   </div>

//                   <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
//                     Mastering Next.js Server Components with Firebase
//                   </h3>
                  
//                   <p className="text-slate-400 text-sm line-clamp-3 mb-6">
//                     Learn how to optimize your data fetching layer using the latest features in Next.js and Firebase Firestore...
//                   </p>

//                   <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
//                     <div className="flex items-center gap-2">
//                       <div className="size-6 rounded-full bg-emerald-600" />
//                       <span className="text-xs font-medium text-slate-300">Admin</span>
//                     </div>
//                     <Button variant="ghost" size="sm" className="text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-full">
//                       Read More
//                     </Button>
//                   </div>
//                 </div>
//               </article>
//             ))}

//           </div>
//         </div>
//       </section>

//       {/* 4. NEWSLETTER / FOOTER PREVIEW */}
//       <section className="container mx-auto px-6 pb-20">
//         <div className="bg-gradient-to-br from-indigo-900/20 to-emerald-900/20 border border-emerald-500/10 rounded-[2.5rem] p-12 text-center relative overflow-hidden">
//           <div className="absolute top-0 right-0 p-8 opacity-10">
//              <Sparkles className="size-32 text-emerald-500" />
//           </div>
//           <h2 className="text-3xl font-bold text-white mb-4">Stay in the loop</h2>
//           <p className="text-slate-400 mb-8 max-w-lg mx-auto">
//             Get the latest technical articles and project updates delivered straight to your inbox.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
//              <input 
//                className="flex-1 bg-black/40 border border-slate-800 rounded-full px-6 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
//                placeholder="Enter your email" 
//              />
//              <Button className="rounded-full px-8">Subscribe</Button>
//           </div>
//         </div>
//       </section>

//     </main>
//   );
// }


import { Button } from "@/components/ui/button";
import { Clock, MessageSquare, Share2, Bookmark, ChevronRight } from "lucide-react";

export default function BlogHome() {
  return (
    <main className="min-h-screen bg-[#0a0a0c] text-slate-300">
      
      {/* SECTION: FEATURED POST (The New Hero) */}
      <section className="container mx-auto px-6 pt-12">
        <div className="relative group cursor-pointer overflow-hidden rounded-[2rem] border border-white/5 bg-slate-900/20 p-8 lg:p-12 flex flex-col lg:flex-row gap-12 items-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-transparent pointer-events-none" />
          
          <div className="flex-1 space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              Featured Article
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] group-hover:text-emerald-400 transition-colors">
              Scaling Real-time Apps with Firebase and Next.js 15
            </h1>
            <p className="text-lg text-slate-400 line-clamp-3">
              A comprehensive guide on optimizing Firestore listeners and leveraging Next.js streaming to build highly reactive web applications without breaking the bank...
            </p>
            <div className="flex items-center gap-6 pt-4 text-sm font-medium text-slate-500">
              <span className="flex items-center gap-2 italic"><div className="size-6 rounded-full bg-emerald-600" /> By Admin</span>
              <span className="flex items-center gap-2"><Clock className="size-4" /> 12 min read</span>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 aspect-video rounded-2xl bg-slate-800 overflow-hidden border border-white/10 shadow-2xl">
             <div className="w-full h-full bg-gradient-to-br from-emerald-900/40 to-slate-900 flex items-center justify-center">
                <code className="text-emerald-500/20 text-4xl font-bold">{"{ coding_insights }"}</code>
             </div>
          </div>
        </div>
      </section>

      {/* SECTION: THE FEED */}
      <section className="container mx-auto px-6 py-20 flex flex-col lg:flex-row gap-16">
        
        {/* Main Feed: 2/3 width */}
        <div className="flex-[2] space-y-16">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h2 className="text-2xl font-bold text-white">Latest <span className="text-emerald-500">Stories</span></h2>
            <div className="flex gap-4 text-sm font-bold text-slate-500">
               <span className="text-emerald-500 cursor-pointer">Recent</span>
               <span className="hover:text-white cursor-pointer transition-colors">Popular</span>
            </div>
          </div>

          {/* Blog Item Logic */}
          {[1, 2, 3, 4].map((i) => (
            <article key={i} className="group flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-64 aspect-video rounded-xl bg-slate-900 border border-white/5 shrink-0 group-hover:border-emerald-500/30 transition-colors overflow-hidden">
                 <div className="w-full h-full bg-slate-800/50 group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Web Architecture</span>
                <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug">
                  Why I shifted from traditional Web Development to Machine Learning
                </h3>
                <p className="text-slate-400 text-sm line-clamp-2">
                  Transitioning from the DOM to Tensors wasn't easy, but the rewards are massive. Here is my strategy for the next 12 months...
                </p>
                <div className="flex items-center gap-6 pt-2">
                   <Button variant="link" className="p-0 h-auto text-emerald-500 font-bold flex items-center gap-2">
                     Read Full Story <ChevronRight className="size-4" />
                   </Button>
                   <div className="flex items-center gap-4 text-slate-600">
                      <MessageSquare className="size-4" />
                      <Bookmark className="size-4" />
                      <Share2 className="size-4" />
                   </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Sidebar: 1/3 width */}
        <div className="flex-1 space-y-12">
           <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5">
              <h3 className="text-lg font-bold text-white mb-6">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                 {['Nextjs', 'Python', 'Firebase', 'DataScience', 'Tailwind'].map(tag => (
                   <span key={tag} className="px-3 py-1.5 rounded-lg bg-slate-900 border border-white/5 text-xs font-medium hover:border-emerald-500/50 cursor-pointer transition-all">
                     #{tag}
                   </span>
                 ))}
              </div>
           </div>

           <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/10">
              <h3 className="text-lg font-bold text-white mb-2">Weekly Newsletter</h3>
              <p className="text-sm text-slate-400 mb-6">Join 2,000+ developers receiving my weekly tech digest.</p>
              <input className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs mb-3 focus:outline-none focus:border-emerald-500" placeholder="your@email.com" />
              <Button className="w-full font-bold">Subscribe</Button>
           </div>
        </div>

      </section>
    </main>
  );
}