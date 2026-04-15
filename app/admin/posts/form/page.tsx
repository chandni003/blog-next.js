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
import { Button } from "@/components/ui/button";
import { 
  PenLine, 
  Trash2, 
  CheckCircle2, 
  Layers, 
  User, 
  Type, 
  Link2,
  Sparkles,
  Image as ImageIcon,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

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
    <main className="min-h-screen w-full bg-background p-6 lg:p-10 text-foreground transition-colors duration-300">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <PenLine className="text-primary size-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Editor Console</h1>
            <p className="text-sm text-muted-foreground">Draft and publish your latest technical insights.</p>
          </div>
        </div>

        {updatePostId ? (
          <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-amber-500/10 text-amber-500 border border-amber-500/20 px-4 py-2 rounded-full">
            <Sparkles className="size-3" /> Update Mode
          </span>
        ) : (
          <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-full">
            <CheckCircle2 className="size-3" /> Archive Ready
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
          className="lg:col-span-4 flex flex-col gap-6 bg-card/50 backdrop-blur-sm border border-border p-8 rounded-[2rem] h-fit sticky top-24 shadow-sm"
        >
          {/* Title Input */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 px-1">
              <Type className="size-3" /> Post Title <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              onChange={(e) => handleData("name", e.target.value)}
              value={data?.name || ""}
              required
              placeholder="A captivating title..."
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/50"
            />
          </div>

          {/* Slug Input */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 px-1">
              <Link2 className="size-3" /> Slug <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              disabled={!!updatePostId}
              onChange={(e) => handleData("slug", e.target.value)}
              value={data?.slug || ""}
              required
              placeholder="post-url-slug"
              className="w-full bg-muted/30 border border-border rounded-xl px-4 py-3 text-sm text-muted-foreground focus:outline-none focus:border-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <SelectCategoryfield />
          <SelectAuthorfield />

          {/* Image URL Input */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 px-1">
              <ImageIcon className="size-3" /> Thumbnail URL
            </label>
            <div className="relative">
              <input
                type="url"
                onChange={(e) => handleData("thumbnailUrl", e.target.value)}
                value={data?.thumbnailUrl || ""}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/50 pr-10"
              />
              <ExternalLink className="absolute right-3 top-3.5 size-4 text-muted-foreground/50" />
            </div>
          </div>

          {/* Image Preview */}
          {data?.thumbnailUrl && (
             <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">Live Preview</p>
                <div className="aspect-video rounded-2xl overflow-hidden border border-border bg-muted relative group">
                   <img 
                     src={data.thumbnailUrl} 
                     alt="Preview" 
                     className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                     onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x225?text=Invalid+URL';
                     }}
                   />
                </div>
             </div>
          )}

          {error && (
            <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium animate-in fade-in slide-in-from-top-1">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-3 pt-2">
            {!isdone && (
              <Button
                type="submit"
                disabled={isloading || isdone}
                className="w-full rounded-xl py-6 font-bold text-md shadow-lg shadow-primary/20"
              >
                {isloading ? "Processing..." : updatePostId ? "Update Metadata" : "Broadcast Post"}
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
              <div className="flex items-center justify-center gap-2 p-4 rounded-xl bg-primary/10 border border-primary/20 text-primary font-bold animate-in zoom-in-95">
                <CheckCircle2 className="size-5" />
                Successfully Synchronized
              </div>
            )}
          </div>
        </form>

        {/* Right Column: Content Editor */}
        <div className="lg:col-span-8 bg-card/30 backdrop-blur-sm border border-border rounded-[2.5rem] overflow-hidden shadow-sm flex flex-col h-fit">
          <div className="p-6 border-b border-border bg-muted/20 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Pro Manuscript Editor</h2>
            <div className="flex gap-2">
              <div className="size-2 rounded-full bg-destructive/40" />
              <div className="size-2 rounded-full bg-amber-500/40" />
              <div className="size-2 rounded-full bg-primary/40" />
            </div>
          </div>
          <div className="p-4 bg-background/50">
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
      <label htmlFor="category" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 px-1">
        <Layers className="size-3" /> Category <span className="text-primary">*</span>
      </label>
      <div className="relative">
        <select
          name="category"
          id="category"
          value={data?.categoryId || ""}
          onChange={(e) => handleData("categoryId", e.target.value)}
          required
          className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
        >
          <option value="">Select Target Category</option>
          {categories?.map((item: any) => (
            <option key={item?.id} value={item?.id}>
              {item?.name}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-4 pointer-events-none">
           <Layers className="size-4 text-muted-foreground/40" />
        </div>
      </div>
    </div>
  );
}

function SelectAuthorfield() {
  const { data, handleData } = usePostForm();
  const { data: author } = useAuthors();

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="author" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 px-1">
        <User className="size-3" /> Contributor <span className="text-primary">*</span>
      </label>
      <div className="relative">
        <select
          name="author"
          id="author"
          value={data?.authorId || ""}
          onChange={(e) => handleData("authorId", e.target.value)}
          required
          className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
        >
          <option value="">Select Lead Author</option>
          {author?.map((item: any) => (
            <option key={item?.id} value={item?.id}>
              {item?.name}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-4 pointer-events-none">
           <User className="size-4 text-muted-foreground/40" />
        </div>
      </div>
    </div>
  );
}