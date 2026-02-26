import { getAllPosts } from "@/lib/firebase/post/read_server";

export default async function PostListView() {
  const posts = await getAllPosts();
  if (!posts) {
    return <h3>post not available</h3>;
  }
  return (
    <section>
      {posts?.map((post: any) => {
        // return <PostCard />;
      })}
    </section>
  );
}
function PostCard({post}:{ post:any; }) {
  return (
    <div>
      <h1>{post?.name}</h1>
    </div>
  );
}
