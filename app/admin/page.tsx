"use client";

import { 
  Users, 
  FileText, 
  Layers, 
  TrendingUp, 
  MoreVertical,
  Activity,
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const stats = [
    {
      label: "Active Users",
      value: "1,284",
      trend: "+12.5%",
      icon: Users,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
    },
    {
      label: "Total Blogs",
      value: "156",
      trend: "+4.2%",
      icon: FileText,
      color: "text-violet-500",
      bg: "bg-violet-500/10",
    },
    {
      label: "Categories",
      value: "12",
      trend: "Stable",
      icon: Layers,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
  ];

  return (
    <main className="min-h-screen w-full bg-background p-6 lg:p-10 text-foreground transition-colors duration-300">
      
      {/* Welcome Header */}
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Console Overview</h1>
          <p className="text-muted-foreground mt-1">Real-time performance and audience analytics.</p>
        </div>
        <Button className="rounded-xl shadow-lg shadow-primary/20">
          <ArrowUpRight className="mr-2 size-4" /> Export Report
        </Button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div key={index} className="bg-card/50 backdrop-blur-sm border border-border p-6 rounded-[2rem] hover:border-primary/20 transition-all group shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-3 rounded-2xl", stat.bg, stat.color)}>
                <stat.icon className="size-6" />
              </div>
              <span className="text-[10px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-lg">
                {stat.trend}
              </span>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</p>
              <h2 className="text-3xl font-bold text-foreground mt-1 group-hover:text-primary transition-colors">
                {stat.value}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Main Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Analytics Chart Placeholder */}
        <div className="lg:col-span-2 bg-card/30 backdrop-blur-sm border border-border rounded-[2.5rem] p-8 relative overflow-hidden group shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <TrendingUp className="size-5 text-primary" />
                Growth Analytics
              </h3>
              <p className="text-xs text-muted-foreground">Post engagement over the last 30 days</p>
            </div>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:bg-muted">
              <MoreVertical className="size-5" />
            </Button>
          </div>

          <div className="h-64 w-full border-b border-l border-border/50 flex items-end justify-around px-4 group-hover:border-primary/20 transition-colors">
            {[40, 70, 45, 90, 65, 80, 50, 95, 60, 75].map((height, i) => (
              <div 
                key={i} 
                className="w-4 bg-primary/20 rounded-t-lg group-hover:bg-primary/40 transition-all duration-500" 
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          
          <div className="mt-6 flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-2">
            <span>Week 01</span>
            <span>Week 02</span>
            <span>Week 03</span>
            <span>Week 04</span>
          </div>
        </div>

        {/* Side Activity Feed */}
        <div className="bg-card/30 backdrop-blur-sm border border-border rounded-[2.5rem] p-8 shadow-sm">
          <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
            <Activity className="size-5 text-primary" />
            Live Feed
          </h3>
          <div className="flex flex-col gap-6">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="flex gap-4 items-start relative pb-6 last:pb-0">
                {i !== 3 && <div className="absolute left-[7px] top-6 bottom-0 w-px bg-border" />}
                <div className="size-4 rounded-full bg-primary/20 border-2 border-primary mt-1 shrink-0 z-10" />
                <div>
                  <p className="text-sm text-foreground">
                    <span className="font-bold">New User</span> registered
                  </p>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold mt-1">2 mins ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>
    </main>
  );
}