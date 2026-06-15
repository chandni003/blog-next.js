import { getPost } from "@/lib/firebase/post/read_server";
import { Share2, Bookmark, MessageCircle, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ClientArticle } from "./ClientArticle";

export default async function Page({ params }: { params: any }) {
  const { postId } = await params;
  const post = await getPost(postId);

  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center p-10 bg-background text-foreground">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold opacity-30 italic font-mono">Insight not found.</h1>
          <Link href="/blogs">
            <Button className="rounded-full px-10 h-14 font-bold">Back to Library</Button>
          </Link>
        </div>
      </main>
    );
  }

  // Fallback data for author if not present
  const authorName = post?.authorName || post?.authorId || "Anonymous";
  const authorInitials = authorName.substring(0, 2).toUpperCase();

  // Convert non-serializable Firestore Timestamp to an ISO string for the Client Component
  const serializedPost = {
    ...post,
    timestamp: post?.timestamp?.toDate ? post.timestamp.toDate().toISOString() : null,
  };

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300 pb-32">
      <ClientArticle post={serializedPost} authorName={authorName} authorInitials={authorInitials} />
    </main>
  );
}
