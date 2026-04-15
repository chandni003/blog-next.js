// import { Home, MessageCircle, List } from "lucide-react";
// import LoginButton from "./LoginButton";
// import AuthContextProvider from "@/lib/context/AuthContext";
// import Link from "next/link";

// export default function Header() {
//   return (
//     <nav className="flex items-center justify-between px-7 py-3 border-b">
//       <img className="h-10" src="/logo.png" alt="" />
//       <ul className="flex items-center gap-6">
//         <Link href={`/`}>
//           <li className="flex gap-2">
//             {" "}
//             <Home />
//             Home
//           </li>
//         </Link>
//         <Link href={`/categories`}>
//           <li className="flex gap-2">
//             {" "}
//             <List />
//             Categories
//           </li>
//         </Link>

//         {/* <Link href={`/cantact-us`}>
//         <li className="flex gap-2">
//           {" "}
//           <MessageCircle />
//           Contact us
//         </li>
//         </Link> */}
//       </ul>
//       <AuthContextProvider>
//         <LoginButton />
//       </AuthContextProvider>
//     </nav>
//   );
// }



// import { Home, MessageCircle, List, LayoutGrid } from "lucide-react";
// import LoginButton from "./LoginButton";
// import AuthContextProvider from "@/lib/context/AuthContext";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";

// export default function Header() {
//   const navItems = [
//     { name: "Home", href: "/", icon: <Home className="h-4 w-4" /> },
//     { name: "Categories", href: "/categories", icon: <List className="h-4 w-4" /> },
//   ];

//   return (
//     <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="flex h-16 items-center justify-between px-8">
//         {/* Left Side: Logo */}
//         <div className="flex items-center gap-2">
//           <Link href="/" className="transition-opacity hover:opacity-80">
//             <img className="h-9 w-auto object-contain" src="/logo.png" alt="Logo" />
//           </Link>
//         </div>

//         {/* Center: Navigation Links */}
//         <div className="hidden md:flex items-center gap-2">
//           {navItems.map((item) => (
//             <Link key={item.href} href={item.href} passHref>
//               <Button
//                 variant="ghost"
//                 className="flex items-center gap-2 text-md font-medium px-4 py-2 hover:bg-accent hover:text-accent-foreground transition-colors"
//               >
//                 {item.icon}
//                 <span>{item.name}</span>
//               </Button>
//             </Link>
//           ))}
          
//           {/* Optional Contact Us (kept commented as per your logic) */}
//           {/* <Link href="/contact-us" passHref>
//             <Button variant="ghost" className="gap-2 text-md font-medium">
//               <MessageCircle className="h-4 w-4" />
//               Contact us
//             </Button>
//           </Link> 
//           */}
//         </div>

//         {/* Right Side: Auth Action */}
//         <div className="flex items-center gap-4">
//           <div className="h-8 w-[1px] bg-border mx-2 hidden sm:block" /> {/* Vertical Divider */}
//           <AuthContextProvider>
//             <LoginButton />
//           </AuthContextProvider>
//         </div>
//       </div>
//     </nav>
//   );
// }







// import { Home, MessageCircle, List, Layers3, Activity } from "lucide-react";
// import LoginButton from "./LoginButton";
// import AuthContextProvider from "@/lib/context/AuthContext";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";

// export default function Header() {
//   const navItems = [
//     // Highlight Home with the new emerald accent color
//     { name: "Home", href: "/", icon: <Home className="h-5 w-5 text-emerald-500" />, active: true },
//     { name: "Categories", href: "/categories", icon: <List className="h-5 w-5" /> },
//   ];

//   return (
//     <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="flex h-16 items-center justify-between px-8">
        
//         {/* Left Side: NEW Logo (Icon-based, no image) */}
//         <div className="flex items-center gap-3">
//           <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
//             {/* Logo Icon with Emerald Accent */}
//             <div className="bg-emerald-600 p-2.5 rounded-xl text-white shadow-inner">
//               <Layers3 className="h-6 w-6" />
//             </div>
//             <span className="text-2xl font-bold tracking-tighter text-foreground">
//               Core<span className="text-emerald-600">Flow</span>
//             </span>
//           </Link>
//         </div>

//         {/* Center: Navigation Links */}
//         <div className="hidden md:flex items-center gap-1.5">
//           {navItems.map((item) => (
//             <Link key={item.href} href={item.href} passHref>
//               <Button
//                 variant="ghost"
//                 className={cn(
//                   "flex items-center gap-2.5 text-md font-medium px-4 py-2 transition-colors rounded-lg",
//                   item.active 
//                     ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100/80" 
//                     : "hover:bg-accent hover:text-accent-foreground text-muted-foreground"
//                 )}
//               >
//                 {item.icon}
//                 <span>{item.name}</span>
//               </Button>
//             </Link>
//           ))}
          
//           {/* Optional Contact Us (kept commented) */}
//           <Link href="/contact-us" passHref>
//             <Button variant="ghost" className="gap-2 text-md font-medium hover:bg-emerald-50 hover:text-emerald-700">
//               <MessageCircle className="h-5 w-5" />
//               Contact us
//             </Button>
//           </Link> 
         
//         </div>

//         {/* Right Side: Auth Action */}
//         <div className="flex items-center gap-3">
//           <AuthContextProvider>
//             {/* Assuming LoginButton is stylized as a shadcn Button */}
//             <LoginButton />
//           </AuthContextProvider>
//         </div>
//       </div>
//     </nav>
//   );
// }


"use client";

import { Home, List, Zap, BookOpen, User, Mail, Sparkles } from "lucide-react";
import LoginButton from "./LoginButton";
import AuthContextProvider from "@/lib/context/AuthContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Header() {
  const navItems = [
    { name: "Home", href: "/", icon: <Home className="size-4" /> },
    { name: "Blogs", href: "/posts", icon: <BookOpen className="size-4" /> },
    { name: "Categories", href: "/categories", icon: <List className="size-4" /> },
    { name: "About", href: "/about", icon: <User className="size-4" /> },
    { name: "Contact", href: "/contact", icon: <Mail className="size-4" /> },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0a0a0c]/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-6 lg:px-10">
        
        {/* New Logo Branding - Matching Emerald Tech Theme */}
        <div className="flex items-center gap-3">
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="relative flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20 transition-all group-hover:scale-105 group-hover:shadow-emerald-500/40">
              <Zap className="size-6 fill-white text-white" />
              {/* Subtle sparkle effect for tech feel */}
              <Sparkles className="absolute -top-1 -right-1 size-3 text-emerald-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-white">
              Nexus<span className="text-emerald-500">UI</span>
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
                className="text-sm gap-2 font-medium text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all rounded-full px-4"
              >
                {item.icon}
                {item.name}
              </Button>
            </Link>
          ))}
        </div>

        {/* Right Section: Auth & Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:block h-6 w-px bg-white/10 mx-2" />
          <AuthContextProvider>
            <LoginButton />
          </AuthContextProvider>
        </div>
      </div>
    </nav>
  );
}