// "use client";
import { getAuthor } from "@/lib/firebase/author/read_server";
import { getCategory } from "@/lib/firebase/category/read_server";
import { getAllPosts } from "@/lib/firebase/post/read_server";
import Link from "next/link";

export default async function PostListView() {
  const posts = await getAllPosts();
  if (!posts) {
    return <h3>Posts not Available</h3>;
  }
  return (
    <section className="p-10 ">
      <div className="grid grid-cols-4 gap-5">
        {posts?.map((post: any, key: any) => {
          return <PostCard key={key} post={post} />;
        })}
      </div>
    </section>
  );
}

export function PostCard({ post }: { post: any }) {
  return (
    <Link href={`/blogs/${post?.slug || post?.id}`}>
      <div className="p-5 rounded border border-slate-600">
      {/* <div className="relative"> */}
        {/* <div className="absolute flex justify-end w-full p-3"> */}
          <CategoryCard categoryId={post?.categoryId} />
        {/* </div> */}
      {/* </div> */}
      <h1 className="font-bold">{post?.name}</h1>
      {/* <div className="flex justify-between"> */}
        <AuthorCard authorId={post?.authorId} />
        <h5 className="text-slate-400 text-xs">
          {post?.timestamp?.toDate()?.toLocaleDateString()}
        </h5>
      {/* </div> */}
    </div>
    </Link>
  );
}

async function AuthorCard({ authorId }: { authorId: any }) {
  const authors = await getAuthor(authorId);
  return (
    <div className="flex gap-2 items-center">
      <h4 className="text-sm text-gray-500">{authors?.name}</h4>
    </div>
  );
}

async function CategoryCard({ categoryId }: { categoryId: any }) {
  const category = await getCategory(categoryId); 
  return (
    <div className="flex gap-2 items-center">
      <h4 className="text-sm text-gray-500">{category?.name}</h4>
    </div>
  );
}
