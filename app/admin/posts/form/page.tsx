// "use client";

// import { useCategories } from "@/lib/firebase/category/read";
// import { usePostForm } from "./contexts/PostFormContext";
// import { useEffect } from "react";
// import { useAuthors } from "@/lib/firebase/author/read";
// import { RTEfield } from "./components/RTEField";

// export default function Page() {
//   const {
//     data,
//     // image,
//     // setImage,
//     isloading,
//     error,
//     isdone,
//     handleCreate,
//     handleUpdate,
//     handleDelete,
//     handleData,
//     updatePostId,
//     fetchData,
//   } = usePostForm();

//   useEffect(() => {
//     if (updatePostId) {
//       fetchData(updatePostId);
//     }
//   }, [updatePostId]);

//   return (
//     <main className="w-full p-6">
//       <div className="flex gap-5 items-center">
//         <h1 className="font-bold">form page</h1>
//         {updatePostId && (
//           <div className="flex">
//             <h1 className="text-white font-bold bg-orange-500 px-4 py-2 rounded-full">
//               Update
//             </h1>
//           </div>
//         )}
//         {!updatePostId && (
//           <div className="flex">
//             <h1 className="text-white font-bold bg-green-500 px-4 py-2 rounded-full">
//               create
//             </h1>
//           </div>
//         )}
//       </div>

//       <section className="flex">
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             if (updatePostId) {
//               handleUpdate();
//             } else {
//               handleCreate();
//             }
//           }}
//           className="flex flex-col gap-2 bg-blue-50 p-10 rounded-md"
//         >
//           <div className="flex flex-col gap-2">
//             <label className="text-sm text-gray-500">
//               Post Title <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               onChange={(e) => {
//                 e.preventDefault();
//                 handleData("name", e.target.value);
//               }}
//               value={data?.name}
//               required
//               placeholder="Post Name"
//               className="rounded-full px-4 py-2 border bg-gray-50"
//             />
//           </div>
//           <div className="flex flex-col gap-2">
//             <label className="text-sm text-gray-500">
//               Post slug <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               disabled={updatePostId}
//               onChange={(e) => {
//                 e.preventDefault();
//                 handleData("slug", e.target.value);
//               }}
//               value={data?.slug}
//               required
//               placeholder="Post slug"
//               className="rounded-full px-4 py-2 border bg-gray-50"
//             />
//           </div>

//           <SelectCategoryfield />
//           <SelectAuthorfield />
//           {/* {image && <div>
//             <img className="h-80 w-full" src={URL.createObjectURL(image)} alt="" />
//         </div>} */}
//           {/* <div className="flex flex-col gap-2">
//           <label className="text-sm text-gray-500">
//             Image <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e)=>{
//                 setImage(e.target.files?.[0]);
//             }}
//              required
//             placeholder="image"
//             className="rounded-full px-4 py-2 border bg-gray-50"
//           />
//         </div> */}
//           {error && <p className="text-red-500 text-sm">{error}</p>}

//           {!isdone && (
//             <button
//               type="submit"
//               className="cursor-pointer text-white bg-blue-500 rounded-full px-4 py-2 font-bold"
//               disabled={isloading || isdone}
//             >
//               {isloading ? "loading.." : updatePostId ? "update" : "create"}
//             </button>
//           )}

//           {updatePostId && !isdone && (
//             <button
//               onClick={(e) => {
//                 e.preventDefault();
//                 handleDelete(updatePostId);
//               }}
//               className="cursor-pointer text-white bg-red-500 rounded-full px-4 py-2 font-bold"
//               disabled={isloading || isdone}
//             >
//               {isloading ? "loading.." : "Delete"}
//             </button>
//           )}
//           {isdone && (
//             <h3 className="text-green-500 text-center font-bold">
//               Successfully{updatePostId ? "Updated" : "created"}
//             </h3>
//           )}
//         </form>
//         <RTEfield />
//       </section>
//     </main>
//   );
// }

// function SelectCategoryfield() {
//   const { data, handleData } = usePostForm();

//   const { data: categories } = useCategories();

//   return (
//     <div className="flex flex-col gap-2">
//       <label htmlFor="category" className="text-slate-500">
//         Select Category<span className="text-red-500">*</span>
//       </label>
//       <select
//         name="category"
//         id="cateory"
//         value={data?.categoryId}
//         onChange={(e) => {
//           handleData("categoryId", e.target.value);
//         }}
//         required
//         className="rounded-full px-4 py-2 border bg-gray-50 w-full"
//       >
//         <option value="">select category</option>
//         {categories &&
//           categories?.map((item: any) => {
//             return <option value={item?.id}>{item?.name}</option>;
//           })}
//       </select>
//     </div>
//   );
// }


// function SelectAuthorfield() {
//   const { data, handleData } = usePostForm();

//   const { data: author } = useAuthors();

//   return (
//     <div className="flex flex-col gap-2">
//       <label htmlFor="author" className="text-slate-500">
//         Select Author<span className="text-red-500">*</span>
//       </label>
//       <select
//         name="author"
//         id="author"
//         value={data?.authorId}
//         onChange={(e) => {
//           handleData("authorId", e.target.value);
//         }}
//         required
//         className="rounded-full px-4 py-2 border bg-gray-50 w-full"
//       >
//         <option value="">select author</option>
//         {author &&
//           author?.map((item: any) => {
//             return <option value={item?.id}>{item?.name}</option>;
//           })}
//       </select>
//     </div>
//   );
// }


"use client";

import { useCategories } from "@/lib/firebase/category/read";
import { usePostForm } from "./contexts/PostFormContext";
import { useEffect } from "react";
import { useAuthors } from "@/lib/firebase/author/read";
import { RTEfield } from "./components/RTEField";
import { Button } from "@/components/ui/button"; // Using your custom button
import { 
  PenLine, 
  Trash2, 
  CheckCircle2, 
  Layers, 
  User, 
  Type, 
  Link2,
  Sparkles 
} from "lucide-react";

export default function Page() {
  const {
    data,
    isloading,
    error,
    isdone,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleData,
    updatePostId,
    fetchData,
  } = usePostForm();

  useEffect(() => {
    if (updatePostId) {
      fetchData(updatePostId);
    }
  }, [updatePostId]);

  return (
    <main className="min-h-screen w-full bg-[#0a0a0c] p-6 lg:p-10 text-slate-200">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <PenLine className="text-emerald-500 size-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Editor Console</h1>
            <p className="text-sm text-slate-500">Manage your blog content and metadata</p>
          </div>
        </div>

        {updatePostId ? (
          <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-orange-500/10 text-orange-500 border border-orange-500/20 px-4 py-2 rounded-full">
            <Sparkles className="size-3" /> Update Mode
          </span>
        ) : (
          <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-4 py-2 rounded-full">
            <CheckCircle2 className="size-3" /> Create Mode
          </span>
        )}
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Metadata Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (updatePostId) {
              handleUpdate();
            } else {
              handleCreate();
            }
          }}
          className="lg:col-span-4 flex flex-col gap-6 bg-slate-900/40 border border-white/5 p-8 rounded-[2rem] h-fit sticky top-24"
        >
          {/* Title Input */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <Type className="size-3" /> Post Title <span className="text-emerald-500">*</span>
            </label>
            <input
              type="text"
              onChange={(e) => handleData("name", e.target.value)}
              value={data?.name || ""}
              required
              placeholder="Enter a catchy title..."
              className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-700"
            />
          </div>

          {/* Slug Input */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <Link2 className="size-3" /> Slug <span className="text-emerald-500">*</span>
            </label>
            <input
              type="text"
              disabled={!!updatePostId}
              onChange={(e) => handleData("slug", e.target.value)}
              value={data?.slug || ""}
              required
              placeholder="post-url-slug"
              className="w-full bg-black/20 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-400 focus:outline-none focus:border-emerald-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <SelectCategoryfield />
          <SelectAuthorfield />

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-medium">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-3 pt-4">
            {!isdone && (
              <Button
                type="submit"
                disabled={isloading || isdone}
                className="w-full rounded-xl py-6 font-bold text-md"
              >
                {isloading ? "Processing..." : updatePostId ? "Update Post" : "Publish Post"}
              </Button>
            )}

            {updatePostId && !isdone && (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete(updatePostId);
                }}
                variant="destructive"
                disabled={isloading || isdone}
                className="w-full rounded-xl py-6 font-bold"
              >
                <Trash2 className="mr-2 size-4" /> Delete Permanently
              </Button>
            )}

            {isdone && (
              <div className="flex items-center justify-center gap-2 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-bold">
                <CheckCircle2 className="size-5" />
                Successfully {updatePostId ? "Updated" : "Created"}
              </div>
            )}
          </div>
        </form>

        {/* Right Column: Rich Text Editor */}
        <div className="lg:col-span-8 bg-slate-900/20 border border-white/5 rounded-[2rem] overflow-hidden">
          <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">Content Editor</h2>
            <div className="flex gap-2">
              <div className="size-2 rounded-full bg-red-500/20" />
              <div className="size-2 rounded-full bg-orange-500/20" />
              <div className="size-2 rounded-full bg-emerald-500/20" />
            </div>
          </div>
          <div className="p-2">
            <RTEfield />
          </div>
        </div>
      </section>
    </main>
  );
}

function SelectCategoryfield() {
  const { data, handleData } = usePostForm();
  const { data: categories } = useCategories();

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="category" className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
        <Layers className="size-3" /> Category <span className="text-emerald-500">*</span>
      </label>
      <select
        name="category"
        id="category"
        value={data?.categoryId || ""}
        onChange={(e) => handleData("categoryId", e.target.value)}
        required
        className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors appearance-none cursor-pointer"
      >
        <option value="" className="bg-slate-900">Select Category</option>
        {categories?.map((item: any) => (
          <option key={item?.id} value={item?.id} className="bg-slate-900">
            {item?.name}
          </option>
        ))}
      </select>
    </div>
  );
}

function SelectAuthorfield() {
  const { data, handleData } = usePostForm();
  const { data: author } = useAuthors();

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="author" className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
        <User className="size-3" /> Author <span className="text-emerald-500">*</span>
      </label>
      <select
        name="author"
        id="author"
        value={data?.authorId || ""}
        onChange={(e) => handleData("authorId", e.target.value)}
        required
        className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors appearance-none cursor-pointer"
      >
        <option value="" className="bg-slate-900">Select Author</option>
        {author?.map((item: any) => (
          <option key={item?.id} value={item?.id} className="bg-slate-900">
            {item?.name}
          </option>
        ))}
      </select>
    </div>
  );
}