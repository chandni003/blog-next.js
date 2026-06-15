"use client";

import { 
  User, 
  Zap, 
  ShieldCheck,
  Cpu,
  Globe
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 lg:pt-40 lg:pb-32 border-b border-border bg-card/10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--primary)_0%,_transparent_100%)] opacity-[0.03] pointer-events-none" />
        
        <div className="container mx-auto px-6 lg:px-10 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.2em]">
               <Zap className="size-3" /> The Architectural Vision
            </div>
            <h1 className="text-5xl lg:text-8xl font-extrabold tracking-tight leading-[1.05]">
              Shaping the <span className="text-primary italic">Digital</span> Frontier.
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed opacity-80">
              NexusUI is more than a technical blog. It's an experimental laboratory where modern frontend architecture meets high-performance system design.
            </p>
          </div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="container mx-auto px-6 lg:px-10 py-24 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center max-w-6xl mx-auto">
          
          <div className="relative group">
            <div className="aspect-square rounded-[3rem] bg-card border border-border shadow-2xl relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <User className="size-40 text-primary/5 group-hover:scale-110 transition-transform duration-700" />
               </div>
            </div>
            <div className="absolute -bottom-8 -right-8 p-8 rounded-[2rem] bg-primary border border-primary/20 shadow-2xl shadow-primary/20 text-primary-foreground hidden md:block">
               <h4 className="font-extrabold text-2xl">08+</h4>
               <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Years Expertise</p>
            </div>
          </div>

          <div className="space-y-10">
            <h2 className="text-4xl font-bold tracking-tight">Our <span className="text-primary">Continuum</span></h2>
            <div className="space-y-6 text-muted-foreground font-medium leading-relaxed text-lg opacity-90">
               <p>
                 Founded at the intersection of aesthetic precision and raw technical performance, NexusUI was born from a need for deeper architectural discourse in the development community.
               </p>
               <p>
                 We don't just write tutorials; we dissect patterns, benchmark strategies, and provide a cinematic perspective on the technologies that power modern internet infrastructure.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Philosophies (Grid) - Functional Static Content */}
      <section className="bg-card/30 border-y border-border py-24 lg:py-40">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="text-center mb-20 space-y-4">
             <h3 className="text-4xl font-bold tracking-tight">Technical Execution</h3>
             <p className="text-muted-foreground font-medium">The pillars of our documentation strategy.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: <ShieldCheck className="size-8" />, 
                title: "Proven Reliability", 
                desc: "We verify every architectural pattern against high-traffic workloads and enterprise environments." 
              },
              { 
                icon: <Cpu className="size-8" />, 
                title: "Deep Engineering", 
                desc: "Moving beyond surface-level syntax to explore the performance implications of modern frameworks." 
              },
              { 
                icon: <Globe className="size-8" />, 
                title: "Global Standards", 
                desc: "Aligning our development strategies with industry best practices and accessibility protocols." 
              }
            ].map((feature, i) => (
              <div key={i} className="p-10 rounded-[2.5rem] bg-card border border-border hover:border-primary/20 transition-all shadow-sm group">
                 <div className="size-16 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    {feature.icon}
                 </div>
                 <h4 className="text-2xl font-bold mb-4">{feature.title}</h4>
                 <p className="text-muted-foreground text-sm leading-relaxed font-medium opacity-80">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
