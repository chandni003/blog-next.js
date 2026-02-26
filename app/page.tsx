import Image from "next/image";
import Header from "./components/Header/Header";
import PostListView from "./admin/posts/components/PostListView";

export default function Home() {
  return (
    <main className="h-screen bg-white text-black">
      <Header />
      <PostListView />
    </main>
  );
}
