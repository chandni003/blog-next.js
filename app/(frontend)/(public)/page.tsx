"use client";

import { usePost } from "@/lib/firebase/post/read";
import { useCategories } from "@/lib/firebase/category/read";
import { useAuth } from "@/lib/context/AuthContext";
import { useUserRole } from "@/lib/firebase/user/read";
import Link from "next/link";
import { stripHtml, calculateReadingTime } from "@/lib/utils";
import { Clock, Hash, ArrowRight, BookOpen, LogIn } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

export default function BlogHome() {
  const { data: posts, isloading: postsLoading } = usePost();
  const { data: categories, isloading: categoriesLoading } = useCategories();
  const { user } = useAuth();
  const { role } = useUserRole();

  // Strictly top 10 posts
  const featuredPost = posts?.[0];
  const recentPosts = posts?.slice(1, 10) ?? [];

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl pt-12 pb-24">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-16">

          {/* ── MAIN COLUMN ── */}
          <div className="flex-1 min-w-0">

            {/* FEATURED POST */}
            <section className="mb-14">
              {postsLoading ? (
                <div className="space-y-4 animate-pulse">
                  <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-muted rounded-xl" />
                  <div className="h-7 w-2/3 bg-muted rounded" />
                  <div className="h-4 w-full bg-muted rounded" />
                  <div className="h-4 w-5/6 bg-muted rounded" />
                </div>
              ) : featuredPost ? (
                <motion.article initial="hidden" animate="show" variants={fadeUp}>
                  <Link href={`/blogs/${featuredPost.id}`} className="group block">
                    <div className="w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-xl bg-muted mb-6 relative">
                      {featuredPost.thumbnailUrl ? (
                        <img
                          src={featuredPost.thumbnailUrl}
                          alt={featuredPost.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted/60 flex items-center justify-center">
                          <BookOpen className="size-16 text-muted-foreground/30" />
                        </div>
                      )}
                      {/* Category badge over image */}
                      {featuredPost.categoryId && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                            {featuredPost.categoryId}
                          </span>
                        </div>
                      )}
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors mb-3 leading-snug">
                      {featuredPost.name}
                    </h1>
                    <p className="text-muted-foreground text-base line-clamp-2 leading-relaxed mb-4">
                      {stripHtml(featuredPost.shortDescription) || stripHtml(featuredPost.content)}
                    </p>
                  </Link>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="size-6 rounded-full bg-muted flex items-center justify-center font-bold text-[9px] text-foreground shrink-0">
                      {featuredPost.authorId?.substring(0, 2)?.toUpperCase() || "AD"}
                    </div>
                    <span className="font-semibold text-foreground/80">{featuredPost.authorId}</span>
                    <span className="opacity-40">·</span>
                    <span>{featuredPost.timestamp?.toDate()?.toLocaleDateString()}</span>
                    <span className="opacity-40">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" />
                      {calculateReadingTime(featuredPost.content)} min read
                    </span>
                  </div>
                </motion.article>
              ) : (
                <div className="py-24 text-center text-muted-foreground italic text-sm">
                  No stories published yet.
                </div>
              )}
            </section>

            <hr className="border-border mb-12" />

            {/* RECENT POSTS LIST */}
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-8">
                Latest Stories
              </h2>

              <div className="divide-y divide-border">
                {postsLoading ? (
                  Array(5).fill(0).map((_, i) => (
                    <div key={i} className="py-6 flex gap-6 animate-pulse">
                      <div className="flex-1 space-y-3">
                        <div className="h-3 w-1/4 bg-muted rounded" />
                        <div className="h-5 w-full bg-muted rounded" />
                        <div className="h-3 w-5/6 bg-muted rounded" />
                      </div>
                      <div className="w-24 h-20 bg-muted rounded-lg shrink-0" />
                    </div>
                  ))
                ) : recentPosts.length > 0 ? (
                  recentPosts.map((post: any, idx: number) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.06 }}
                      className="py-6 group flex items-start gap-6"
                    >
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          {post.categoryId && (
                            <>
                              <Hash className="size-3" />
                              <span className="text-foreground/70">{post.categoryId}</span>
                              <span className="opacity-30">·</span>
                            </>
                          )}
                          <span>{post.authorId}</span>
                        </div>
                        <Link href={`/blogs/${post.id}`} className="block">
                          <h3 className="text-base font-bold tracking-tight text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                            {post.name}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mt-1">
                            {stripHtml(post.shortDescription) || stripHtml(post.content)}
                          </p>
                        </Link>
                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-medium">
                          <span>{post.timestamp?.toDate()?.toLocaleDateString()}</span>
                          <span className="opacity-40">·</span>
                          <span className="flex items-center gap-1">
                            <Clock className="size-3" />
                            {calculateReadingTime(post.content)} min read
                          </span>
                        </div>
                      </div>

                      {post.thumbnailUrl && (
                        <Link href={`/blogs/${post.id}`} className="shrink-0">
                          <div className="w-24 h-20 overflow-hidden rounded-lg bg-muted">
                            <img
                              src={post.thumbnailUrl}
                              alt={post.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                        </Link>
                      )}
                    </motion.article>
                  ))
                ) : (
                  !postsLoading && featuredPost && (
                    <p className="py-10 text-sm text-center text-muted-foreground italic">
                      Only one story so far — check back soon!
                    </p>
                  )
                )}
              </div>

              {recentPosts.length > 0 && (
                <div className="mt-10 flex justify-center">
                  <Link
                    href="/blogs"
                    className="flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm font-semibold rounded-full hover:opacity-85 transition-opacity"
                  >
                    View all posts <ArrowRight className="size-4" />
                  </Link>
                </div>
              )}
            </section>
          </div>

          {/* ── SIDEBAR ── */}
          <aside className="w-full lg:w-72 xl:w-80 shrink-0 space-y-8">

            {/* Profile Card */}
            <div className="p-5 rounded-xl border border-border bg-card">
              {user ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="avatar" className="size-12 rounded-full object-cover border border-border shadow-sm" />
                    ) : (
                      <div className="size-12 rounded-full bg-muted flex items-center justify-center font-bold text-foreground text-sm">
                        {user.displayName?.charAt(0) || "U"}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-foreground truncate">{user.displayName}</p>
                      <p className="text-[11px] text-muted-foreground truncate">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary capitalize">{role || "reader"}</span>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <Link href="/dashboard" className="flex-1 text-center text-xs font-semibold py-2 rounded-lg border border-border hover:bg-muted transition-colors">
                      Dashboard
                    </Link>
                    {role === "admin" && (
                      <Link href="/admin/dashboard" className="flex-1 text-center text-xs font-semibold py-2 rounded-lg bg-foreground text-background hover:opacity-85 transition-opacity">
                        Admin
                      </Link>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-3 text-center py-2">
                  <BookOpen className="size-8 text-muted-foreground/40 mx-auto" />
                  <div>
                    <p className="text-sm font-bold text-foreground">Welcome, reader!</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Sign in to access your dashboard and write stories.</p>
                  </div>
                  <Link href="/login" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-foreground text-background text-xs font-semibold hover:opacity-85 transition-opacity">
                    <LogIn className="size-3.5" /> Sign In
                  </Link>
                </div>
              )}
            </div>

            {/* Recommended Topics (real categories) */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                Explore Topics
              </h3>
              {categoriesLoading ? (
                <div className="flex flex-wrap gap-2">
                  {Array(6).fill(0).map((_, i) => (
                    <div key={i} className="h-8 w-20 bg-muted rounded-full animate-pulse" />
                  ))}
                </div>
              ) : categories && categories.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat: any) => (
                    <Link
                      key={cat.id || cat.name}
                      href={`/blogs?category=${cat.id || cat.slug}`}
                      className="px-4 py-1.5 text-xs font-semibold text-foreground bg-muted/60 hover:bg-muted rounded-full border border-border/60 transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground italic">No topics yet.</p>
              )}
            </div>

            {/* Footer Links */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-muted-foreground/60 font-medium">
              <Link href="#" className="hover:text-foreground transition-colors">About</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Contact</Link>
              <p className="w-full mt-1">© {new Date().getFullYear()} blogPost</p>
            </div>

          </aside>

        </div>
      </div>
    </main>
  );
}