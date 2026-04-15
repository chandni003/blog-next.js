// "use client";

// import { useAuth } from "@/lib/context/AuthContext";
// import Link from "next/link";

// export default function LoginButton() {
//   const { user, isLoading, error, handleSignInwithGoogle, handleLogout } =
//     useAuth();

//   if (isLoading) {
//     return <h1>Loading...</h1>;
//   }
//   if (user) {
//     return (
//       <div className="flex gap-4">
//         <button
//           onClick={() => handleLogout()}
//           className="flex items-center gap-3 bg-black text-white rounded-full px-6"
//         >
//           Logout
//         </button>
//        <Link href="/admin"> <div className="flex gap-4 rounded-xl px-3 py-1 bg-blue-100">
//           <img className="object-cover h-12 w-12 rounded-full" src={user?.photoURL} alt="User profile pic" />

//           <div>
//             <h1 className="font-bold">{user?.displayName}</h1>
//             <h1>{user?.email}</h1>
//           </div>
//         </div></Link>
//       </div>
//     );
//   }
//   return (
//     <section>
//       <button
//         onClick={() => {
//           handleSignInwithGoogle();
//         }}
//         className="cursor-pointer bg-black flex items-center gap-3 text-white px-4 py-2 rounded-full"
//       >
//         <img className="h-7" src="/google.png" alt="" />
//         Login With Google
//       </button>
//     </section>
//   );
// }



"use client";

import { useAuth } from "@/lib/context/AuthContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  LayoutDashboard,
  Settings,
  User,
  ChevronDown,
  LogIn,
  ExternalLink
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

  // 1. Loading State (Matching the tech aesthetic)
  if (isLoading) {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 bg-slate-900/50">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  // 2. Logged In State (The Profile with Dropdown)
  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center gap-3 cursor-pointer group bg-slate-950 hover:bg-slate-900 p-1.5 pr-4 rounded-full border border-slate-800 transition-all duration-200 shadow-lg hover:border-emerald-500/50">
            {/* User Avatar */}
            <div className="relative">
              <img
                className="h-9 w-9 rounded-full border border-slate-700 object-cover group-hover:border-emerald-500 transition-colors"
                src={user?.photoURL || ""}
                alt="Profile"
              />
              <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-slate-950 bg-emerald-500" />
            </div>

            {/* User Name & Info */}
            <div className="hidden sm:flex flex-col items-start leading-tight">
              <span className="text-sm font-bold text-slate-100 group-hover:text-white transition-colors">
                {user?.displayName?.split(" ")[0]} {/* Shows only first name for a cleaner look */}
              </span>
              <span className="text-[10px] text-emerald-500/80 font-bold uppercase tracking-widest">
                Online
              </span>
            </div>

            <ChevronDown className="h-4 w-4 text-slate-500 group-hover:text-emerald-500 transition-transform group-data-[state=open]:rotate-180 duration-200" />
          </div>
        </DropdownMenuTrigger>


        {/* ... inside your user logged-in block ... */}

        <DropdownMenuContent align="end" sideOffset={8} className="w-64 bg-slate-950 border-slate-800 text-slate-200 p-2 shadow-2xl">

          {/* Wrap the label in a Group to fix the Base UI context error */}
          <DropdownMenuGroup>
            <DropdownMenuLabel className="px-3 py-3 font-normal">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-bold text-white leading-none">{user?.displayName}</p>
                <p className="text-xs text-slate-500 truncate">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="bg-slate-800 my-1" />

          <DropdownMenuGroup>
            <Link href="/admin">
              <DropdownMenuItem className="cursor-pointer gap-3 py-2.5 px-3 rounded-lg focus:bg-emerald-500/10 focus:text-emerald-400">
                <LayoutDashboard className="h-4 w-4" />
                <span className="font-medium">Admin Dashboard</span>
              </DropdownMenuItem>
            </Link>

            <DropdownMenuItem className="cursor-pointer gap-3 py-2.5 px-3 rounded-lg focus:bg-emerald-500/10 focus:text-emerald-400">
              <User className="h-4 w-4" />
              <span className="font-medium">View Profile</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="bg-slate-800 my-1" />

          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => handleLogout()}
              className="cursor-pointer gap-3 py-2.5 px-3 rounded-lg text-red-400 focus:bg-red-500/10 focus:text-red-400"
            >
              <LogOut className="h-4 w-4" />
              <span className="font-bold">Logout Session</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // 3. Logged Out State (Matches your Sidebar colors)
  return (
    <Button
      onClick={handleSignInwithGoogle}
      variant="default"
      size="lg"
      className="rounded-full gap-3 shadow-emerald-500/20"
    >
      <img className="h-5 w-5 bg-white rounded-full p-0.5" src="/google.png" alt="Google" />
      <span className="font-bold">Login</span>
      <LogIn className="h-4 w-4" />
    </Button>
  );
}