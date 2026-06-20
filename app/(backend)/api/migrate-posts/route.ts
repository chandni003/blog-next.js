import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { db } from "@/lib/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export async function GET() {
  try {
    const postsSnapshot = await getDocs(collection(db, "post"));
    let updatedCount = 0;
    const posts: any[] = [];

    for (const postDoc of postsSnapshot.docs) {
      const data = postDoc.data();
      posts.push({ id: postDoc.id, status: data.status, name: data.name });
      
      if (!data.status) {
        await updateDoc(doc(db, "post", postDoc.id), {
          status: "published",
        });
        updatedCount++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Migrated ${updatedCount} posts to have status: 'published'.`,
      totalPosts: postsSnapshot.size,
      posts,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
