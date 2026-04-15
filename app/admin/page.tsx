
// export default function Admin(){
   
//     return (
//      <>
//       <section className="bg-white h-screen text-black">
//         <h2>admin panel</h2>
//     </section>
//      </>
    
//     )
// }



"use client";

import { 
  Users, 
  FileText, 
  Layers, 
  TrendingUp, 
  ArrowUpRight, 
  MoreVertical,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  // These would ideally come from your Firebase hooks (e.g., data.length)
  const stats = [
    {
      label: "Active Users",
      value: "1,284",
      trend: "+12.5%",
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Total Blogs",
      value: "156",
      trend: "+4.2%",
      icon: FileText,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Categories",
      value: "12",
      trend: "Stable",
      icon: Layers,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
  ];

  return (
    <main className="min-h-screen w-full bg-[#0a0a0c] p-6 lg:p-10 text-slate-200">
      
      {/* Welcome Header */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-white tracking-tight">Console Overview</h1>
        <p className="text-slate-500 mt-1">Welcome back! Here is what's happening with your platform today.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div key={index} className="bg-slate-900/40 border border-white/5 p-6 rounded-[2rem] hover:border-emerald-500/20 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="size-6" />
              </div>
              <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">
                {stat.trend}
              </span>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">{stat.label}</p>
              <h2 className="text-3xl font-bold text-white mt-1 group-hover:text-emerald-400 transition-colors">
                {stat.value}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics & Future Enhancement Chart Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart Placeholder */}
        <div className="lg:col-span-2 bg-slate-900/20 border border-white/5 rounded-[2.5rem] p-8 relative overflow-hidden group">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <TrendingUp className="size-5 text-emerald-500" />
                Growth Analytics
              </h3>
              <p className="text-xs text-slate-500">Post engagement over the last 30 days</p>
            </div>
            <Button variant="ghost" size="icon" className="text-slate-500">
              <MoreVertical className="size-5" />
            </Button>
          </div>

          {/* This is where your Chart library will render */}
          <div className="h-64 w-full border-b border-l border-white/5 flex items-end justify-around px-4 group-hover:border-emerald-500/20 transition-colors">
            {/* Mock Chart Bars */}
            {[40, 70, 45, 90, 65, 80, 50, 95, 60, 75].map((height, i) => (
              <div 
                key={i} 
                className="w-4 bg-emerald-500/20 rounded-t-sm group-hover:bg-emerald-500/40 transition-all duration-500" 
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          
          <div className="mt-6 flex justify-between text-[10px] font-bold text-slate-600 uppercase tracking-widest px-2">
            <span>Week 01</span>
            <span>Week 02</span>
            <span>Week 03</span>
            <span>Week 04</span>
          </div>
        </div>

        {/* Side Activity Feed */}
        <div className="bg-slate-900/20 border border-white/5 rounded-[2.5rem] p-8">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Activity className="size-5 text-emerald-500" />
            Live Feed
          </h3>
          <div className="flex flex-col gap-6">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="size-2 rounded-full bg-emerald-500 mt-2 shrink-0 animate-pulse" />
                <div>
                  <p className="text-sm text-slate-300">
                    <span className="font-bold text-white">New User</span> registered an account
                  </p>
                  <p className="text-[10px] text-slate-600 uppercase font-bold mt-1">2 mins ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>
    </main>
  );
}