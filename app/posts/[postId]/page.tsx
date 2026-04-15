import { getPost } from "@/lib/firebase/post/read_server";
import { Clock, User, Calendar, Share2, ArrowLeft, Bookmark, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Page({ params }: { params: any }) {
  const { postId } = await params;
  const post = await getPost(postId);

  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center p-10 bg-background text-foreground">
        <div className="text-center space-y-6">
           <h1 className="text-4xl font-bold opacity-30 italic font-mono">Insight not found.</h1>
           <Link href="/posts">
             <Button className="rounded-full px-10 h-14 font-bold">Back to Library</Button>
           </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300 pb-32">
      
      {/* Article Header / Hero Section */}
      <section className="relative w-full border-b border-border bg-card/10 overflow-hidden">
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/3 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="container mx-auto px-6 lg:px-10 py-20 lg:py-32 relative z-10 max-w-5xl">
          <Link href="/posts" className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-10 group hover:opacity-80 transition-all">
             <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" /> Back to Archives
          </Link>
          
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3">
               <span className="px-4 py-1.5 bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full">
                 {post?.categoryId || "Engineering"}
               </span>
               <span className="text-muted-foreground/40 text-xs font-bold font-mono">v1.2 // Stable</span>
            </div>

            <h1 className="text-4xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-balance">
              {post?.name}
            </h1>

            <div className="flex flex-wrap items-center gap-10 pt-4 text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
               <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                     <User className="size-4" />
                  </div>
                  <span>By {post?.authorId || "Lead Developer"}</span>
               </div>
               <div className="flex items-center gap-2">
                  <Calendar className="size-4 opacity-50 text-primary" />
                  <span>Published on {post?.timestamp?.toDate()?.toLocaleDateString()}</span>
               </div>
               <div className="flex items-center gap-2">
                  <Clock className="size-4 opacity-50 text-primary" />
                  <span>14 Min Deep Dive</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <article className="container mx-auto px-6 lg:px-10 py-16 flex flex-col lg:flex-row gap-16 max-w-7xl">
        
        {/* Sticky Reading Tools / Sidebar Left */}
        <aside className="hidden lg:flex flex-col gap-8 w-16 h-fit sticky top-32">
           <Button variant="outline" size="icon" className="rounded-2xl size-14 border-border hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-all">
              <Share2 className="size-5" />
           </Button>
           <Button variant="outline" size="icon" className="rounded-2xl size-14 border-border hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-all">
              <Bookmark className="size-5" />
           </Button>
           <div className="h-20 w-px bg-border/50 mx-auto" />
           <Button variant="outline" size="icon" className="rounded-2xl size-14 border-border hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-all text-muted-foreground/40">
              <MessageSquare className="size-5" />
           </Button>
        </aside>

        {/* Narrative Flow */}
        <div className="flex-1 max-w-3xl lg:px-10">
           {/* Featured Image Replacement (Large placeholder logic) */}
           {post?.thumbnailUrl && (
             <div className="w-full aspect-video rounded-[2.5rem] bg-muted overflow-hidden border border-border shadow-2xl mb-16 group">
                <img 
                  src={post.thumbnailUrl} 
                  alt={post.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]" 
                />
             </div>
           )}

           <div className="prose prose-lg dark:prose-invert prose-slate max-w-none">
              <div 
                className="leading-relaxed text-lg text-muted-foreground/90 font-medium space-y-8" 
                dangerouslySetInnerHTML={{__html: post?.content || "Content initialization error. Please refresh the page."}} 
              />
           </div>

           {/* Author Sign-off */}
           <div className="mt-20 pt-10 border-t border-border flex items-center gap-6">
              <div className="size-16 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-2xl">
                 {post?.authorId?.[0]?.toUpperCase() || "N"}
              </div>
              <div className="space-y-1">
                 <h4 className="font-bold text-xl">{post?.authorId || "Nexus Content Lab"}</h4>
                 <p className="text-sm text-muted-foreground font-medium">Full-Stack Architect specializing in high-performance cloud environments and modern design systems.</p>
              </div>
           </div>
        </div>

        {/* Right Sidebar - Meta info / Navigation (Optional desktop only) */}
        <aside className="hidden xl:flex flex-col gap-10 w-80 h-fit sticky top-32">
           <div className="p-8 rounded-[2rem] bg-card/30 border border-border shadow-sm">
              <h5 className="text-[10px] font-bold uppercase tracking-widest text-primary mb-6">Article Overview</h5>
              <ul className="space-y-6 text-sm font-bold text-muted-foreground">
                 <li className="flex items-center gap-3 opacity-100"><div className="size-1.5 rounded-full bg-primary" /> Introduction</li>
                 <li className="flex items-center gap-3 opacity-60 hover:opacity-100 cursor-pointer transition-opacity border-l border-border pl-3 ml-0.5">Architectural Review</li>
                 <li className="flex items-center gap-3 opacity-60 hover:opacity-100 cursor-pointer transition-opacity border-l border-border pl-3 ml-0.5">Pattern Analysis</li>
                 <li className="flex items-center gap-3 opacity-60 hover:opacity-100 cursor-pointer transition-opacity border-l border-border pl-3 ml-0.5">Final Benchmarks</li>
              </ul>
           </div>
           
           <div className="p-10 rounded-[2.5rem] bg-primary/5 border border-primary/20 text-center">
              <h5 className="text-lg font-bold mb-3">Newsletter</h5>
              <p className="text-xs text-muted-foreground mb-8">Join 5k developers receiving technical briefs weekly.</p>
              <Button className="w-full rounded-xl py-6 font-bold">Secure Access</Button>
           </div>
        </aside>

      </article>

    </main>
  );
}
