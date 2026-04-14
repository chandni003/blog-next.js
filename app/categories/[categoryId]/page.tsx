import { getAllPostswithCategory } from "@/lib/firebase/post/read_server";
import { PostCard } from "@/app/components/PostListView";

export default async function Page({ params }: { params: any }) {
  const { categoryId } = await params;
  const posts = await getAllPostswithCategory(categoryId);
  return (
    <main className="text-black bg-white h-[88vh] p-10">
      <div className="grid grid-cols-4 gap-5 ">
        {posts?.map((post: any, key: any) => {
          return <PostCard post={post} key={key} />;
        })}
      </div>
    </main>
  );
}
