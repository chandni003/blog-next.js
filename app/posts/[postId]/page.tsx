import Header from "@/app/components/Header/Header";
import { getPost } from "@/lib/firebase/post/read_server";

export default async function Page({ params }: { params: any }) {
  const { postId } = await params;
  const post = await getPost(postId);
  return (
    <main className="text-black bg-white h-[86vh] px-15">

      <div className="p-7 space-y-4 max-w-screen">
        <h3 className="border border-slate-200 w-20 text-center rounded-lg p-2 bg-gray-100 text-red-500 font-bold">{post?.categoryId}</h3>
        <h1 className="text-center font-bold text-lg md:text-3xl ">{post?.name}</h1>
        <div className="flex justify-between">
            <h3 className="border border-slate-200 p-1 rounded-lg "> {post?.authorId} ✍️</h3>
             <h3 className="text-slate-400 font-bold">
            Posted on : {post?.timestamp?.toDate()?.toLocaleDateString()}
        </h3>
        </div>
       
        <div className="break-words whitesapce-pre-wrap text-md" dangerouslySetInnerHTML={{__html:post?.content}}></div>
      </div>
    </main>
  );
}
