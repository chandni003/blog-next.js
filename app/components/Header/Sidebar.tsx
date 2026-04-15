// import { Gauge, LayoutList, User, Layers2 } from "lucide-react";
// import Link from "next/link";

// export default function Sidebar() {
//   const link = [
//     {
//       name: "Dashboard",
//       link: "/admin",
//       icon: <Gauge />,
//     },
//     {
//       name: "Posts",
//       link: "/admin/posts",
//       icon: <LayoutList />,
//     },
//     {
//       name: "Categories",
//       link: "/admin/categories",
//       icon: <Layers2 />,
//     },
//     {
//       name: "Authors",
//       link: "/admin/authors",
//       icon: <User />,
//     },
//   ];
//   return (
//     <section className="w-[200px] border-r h-screen p-6">
//       <ul className="w-full flex flex-col gap-6">
//         {link.map((item) => {
//           return (
//             <Link href={item.link} key={item.link}>
//               <li className="flex gap-3 font-bold items-cener bg-blue-50 rounded-full px-5 py-2">
//                 {item.icon}
//                 <span>{item.name}</span>
//               </li>
//             </Link>
//           );
//         })}
//       </ul>
//     </section>
//   );
// }


// import { Gauge, LayoutList, User, Layers2 } from "lucide-react";
// import Link from "next/link";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";

// export default function Sidebar() {
//   const link = [
//     {
//       name: "Dashboard",
//       link: "/admin",
//       icon: <Gauge className="h-5 w-5" />, // Increased icon size
//     },
//     {
//       name: "Posts",
//       link: "/admin/posts",
//       icon: <LayoutList className="h-5 w-5" />,
//     },
//     {
//       name: "Categories",
//       link: "/admin/categories",
//       icon: <Layers2 className="h-5 w-5" />,
//     },
//     {
//       name: "Authors",
//       link: "/admin/authors",
//       icon: <User className="h-5 w-5" />,
//     },
//   ];

//   return (
//     // subtle dark background using zinc-950
//     <aside className="hidden border-r bg-zinc-950 text-zinc-100 lg:block w-[260px] h-screen">
//       <div className="flex h-full flex-col gap-4">
//         {/* Header */}
//         <div className="flex h-[70px] items-center border-b border-zinc-800 px-6">
//           <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
//             <span className="bg-blue-600 p-1.5 rounded-lg">
//               <Layers2 className="h-6 w-6 text-white" />
//             </span>
//             <span>Admin</span>
//           </Link>
//         </div>
        
//         {/* Navigation Area */}
//         <ScrollArea className="flex-1 px-4">
//           <nav className="flex flex-col gap-2">
//             {link.map((item) => (
//               <Link key={item.link} href={item.link} passHref>
//                 <Button
//                   variant="ghost"
//                   className={cn(
//                     "w-full justify-start gap-4 px-4 py-6 text-md font-medium transition-all",
//                     "hover:bg-zinc-800 hover:text-white text-zinc-400" // Subtle hover matching dark theme
//                   )}
//                 >
//                   {item.icon}
//                   <span>{item.name}</span>
//                 </Button>
//               </Link>
//             ))}
//           </nav>
//         </ScrollArea>

//         {/* Footer info */}
//         <div className="p-4 mt-auto border-t border-zinc-800">
//           <div className="flex items-center gap-3 px-2 py-3 rounded-xl bg-zinc-900/50">
//             <div className="h-9 w-9 rounded-full bg-zinc-800 flex items-center justify-center">
//               <User className="h-5 w-5 text-zinc-400" />
//             </div>
//             <div className="flex flex-col">
//               <span className="text-sm font-semibold">User Profile</span>
//               <span className="text-xs text-zinc-500">Developer</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </aside>
//   );
// }




import { Gauge, LayoutList, User, Layers2, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button"; // Your provided button
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Sidebar() {
  const links = [
    { name: "Dashboard", link: "/admin", icon: <Gauge /> },
    { name: "Posts", link: "/admin/posts", icon: <LayoutList /> },
    { name: "Categories", link: "/admin/categories", icon: <Layers2 /> },
    { name: "Authors", link: "/admin/authors", icon: <User /> },
  ];

  return (
    <aside className="hidden border-r bg-[#0a0a0c] text-slate-200 lg:block w-[280px] h-screen">
      <div className="flex h-full flex-col">
        
        {/* Sidebar Brand Header */}
        <div className="flex h-16 items-center px-8 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
              <ShieldCheck className="size-5 text-indigo-400" />
            </div>
            <span className="font-bold tracking-wide text-white">Admin Console</span>
          </div>
        </div>

        {/* Navigation Area */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <div className="space-y-2">
            {links.map((item) => (
              <Link key={item.link} href={item.link} passHref>
                <Button
                  variant="ghost"
                  size="lg"
                  className={cn(
                    "w-full justify-start gap-4 px-4 py-7 text-[16px] transition-all duration-200",
                    "text-slate-400 hover:bg-white/5 hover:text-indigo-400"
                  )}
                >
                  <span className="shrink-0 [&_svg]:size-5">
                    {item.icon}
                  </span>
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        {/* User Account Section */}
        <div className="p-4 border-t border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-3 rounded-2xl p-3 bg-black/40 border border-white/5">
            <div className="size-10 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600" />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white">Admin User</span>
              <span className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold">Premium</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}