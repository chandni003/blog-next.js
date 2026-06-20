"use client";

import { usePost } from "@/lib/firebase/post/read";
import { useCategories } from "@/lib/firebase/category/read";
import { useAuth } from "@/lib/context/AuthContext";
import { FileText, PenTool, Layers2, ArrowRight, Clock, BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardOverview() {
  const { data: posts, isloading: postsLoading } = usePost();
  const { data: categories, isloading: categoriesLoading } = useCategories();
  const { user } = useAuth();

  const isLoading = postsLoading || categoriesLoading;

  // Real: filter posts belonging to the logged-in user by uid or email
  const myPosts =
    posts?.filter(
      (p: any) => p.authorEmail === user?.email || p.authorId === user?.uid
    ) || [];

  const stats = [
    {
      label: "My Posts",
      value: myPosts.length,
      icon: <FileText className="size-5 text-orange-500" />,
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
    },
    {
      label: "Total Posts",
      value: posts?.length || 0,
      icon: <BookOpen className="size-5 text-blue-500" />,
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    {
      label: "Categories",
      value: categories?.length || 0,
      icon: <Layers2 className="size-5 text-violet-500" />,
      bg: "bg-violet-500/10",
      border: "border-violet-500/20",
    },
  ];

  const quickActions = [
    {
      label: "Write a New Post",
      description: "Draft and publish your next article",
      href: "/dashboard/create-post",
      icon: <PenTool className="size-6 text-orange-500" />,
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
    },
    {
      label: "Browse All Posts",
      description: `${posts?.length || 0} posts published on the platform`,
      href: "/blogs",
      icon: <BookOpen className="size-6 text-blue-500" />,
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl">
      {/* Welcome Header */}
      <div className="flex items-center gap-4">
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="Avatar"
            className="size-12 rounded-full border-2 border-orange-500/30 shadow-sm"
          />
        ) : (
          <div className="size-12 rounded-full bg-gradient-to-tr from-orange-500 to-rose-500 flex items-center justify-center text-white font-black text-lg shadow-sm">
            {user?.displayName?.charAt(0) || "W"}
          </div>
        )}
        <div>
          <h1 className="text-2xl font-black tracking-tight">
            Hey, {user?.displayName?.split(" ")[0] || "Writer"} 👋
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {myPosts.length > 0
              ? `You have ${myPosts.length} post${myPosts.length > 1 ? "s" : ""} published.`
              : "Start writing your first post today."}
          </p>
        </div>
      </div>

      {/* Stats Grid — real data */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`p-5 bg-background border ${stat.border} rounded-2xl shadow-sm flex flex-col gap-3`}
          >
            <div
              className={`size-10 rounded-xl ${stat.bg} border ${stat.border} flex items-center justify-center`}
            >
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </p>
              <h3 className="text-2xl font-extrabold mt-0.5">
                {isLoading ? (
                  <span className="inline-block h-7 w-10 bg-muted animate-pulse rounded-md" />
                ) : (
                  stat.value
                )}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href}>
              <div
                className={`group p-5 bg-background border ${action.border} rounded-2xl hover:shadow-md transition-all duration-300 flex items-center gap-4 cursor-pointer`}
              >
                <div
                  className={`size-12 rounded-xl ${action.bg} border ${action.border} flex items-center justify-center shrink-0`}
                >
                  {action.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-foreground">{action.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">
                    {action.description}
                  </p>
                </div>
                <ArrowRight className="size-4 text-muted-foreground group-hover:translate-x-1 transition-transform shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* My Recent Posts */}
      <div className="bg-background border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="font-bold text-sm">My Recent Posts</h2>
          <Link href="/dashboard/create-post">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs gap-2 text-orange-500 hover:text-orange-600 hover:bg-orange-500/10 rounded-full"
            >
              <PenTool className="size-3" /> New Post
            </Button>
          </Link>
        </div>

        <div className="p-4">
          {postsLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-muted animate-pulse rounded-xl" />
              ))}
            </div>
          ) : myPosts.length > 0 ? (
            <div className="space-y-2">
              {myPosts.slice(0, 7).map((post: any) => {
                const cat = categories?.find((c: any) => c.id === post.categoryId);
                return (
                  <div
                    key={post.id}
                    className="flex items-center justify-between p-3 border border-border rounded-xl hover:border-orange-500/30 hover:bg-orange-500/5 transition-all group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="size-11 bg-muted rounded-lg overflow-hidden shrink-0">
                        {post.thumbnailUrl ? (
                          <img
                            src={post.thumbnailUrl}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-orange-500/10 flex items-center justify-center">
                            <FileText className="size-4 text-orange-400" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-sm line-clamp-1 group-hover:text-orange-600 transition-colors">
                          {post.name || post.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                          {cat && (
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-violet-500/10 text-violet-600 dark:text-violet-400 rounded-full">
                              {cat.name}
                            </span>
                          )}
                          <div className="flex items-center gap-1">
                            <Clock className="size-3 text-muted-foreground" />
                            <p className="text-[11px] text-muted-foreground">
                              {post.timestamp?.toDate?.()?.toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }) || "—"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full shrink-0 ml-2 ${
                      post.status === "draft"
                        ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400"
                        : "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400"
                    }`}>
                      {post.status === "draft" ? "Draft" : "Published"}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-14 flex flex-col items-center justify-center gap-3 text-center">
              <div className="size-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                <PenTool className="size-6 text-orange-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">No posts yet</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Your published stories will appear here.
                </p>
              </div>
              <Link href="/dashboard/create-post">
                <Button
                  size="sm"
                  className="mt-1 rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 border-none px-6"
                >
                  Write your first post
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
