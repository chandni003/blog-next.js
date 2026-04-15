// "use client";

// import { useAuthorForm } from "./contexts/AuthorFormContext";
// import { useEffect } from "react";

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
//     updateAuthorId,
//     fetchData,
//   } = useAuthorForm();

//   useEffect(() => {
//     if (updateAuthorId) {
//       fetchData(updateAuthorId);
//     }
//   }, [updateAuthorId]);

//   return (
//     <main className="w-full p-6">
//       <div className="flex gap-5 items-center">
//         <h1 className="font-bold">form page</h1>
//         {updateAuthorId && (
//           <div className="flex">
//             <h1 className="text-white font-bold bg-orange-500 px-4 py-2 rounded-full">
//               Update
//             </h1>
//           </div>
//         )}
//         {!updateAuthorId && (
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
//             if (updateAuthorId) {
//               handleUpdate();
//             } else {
//               handleCreate();
//             }
//           }}
//           className="flex flex-col gap-2 bg-blue-50 p-10 rounded-md"
//         >
//           <div className="flex flex-col gap-2">
//             <label className="text-sm text-gray-500">
//               Author Name <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               onChange={(e) => {
//                 e.preventDefault();
//                 handleData("name", e.target.value);
//               }}
//               value={data?.name}
//               required
//               placeholder="Author Name"
//               className="rounded-full px-4 py-2 border bg-gray-50"
//             />
//           </div>
//           <div className="flex flex-col gap-2">
//             <label className="text-sm text-gray-500">
//               Author email <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               onChange={(e) => {
//                 e.preventDefault();
//                 handleData("email", e.target.value);
//               }}
//               value={data?.slug}
//               required
//               placeholder="Author email"
//               className="rounded-full px-4 py-2 border bg-gray-50"
//             />
//           </div>
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
//               {isloading ? "loading.." : updateAuthorId ? "update" : "create"}
//             </button>
//           )}

//           {updateAuthorId && !isdone &&  (
//             <button
//               onClick={(e) => {
//                 e.preventDefault();
//                handleDelete(updateAuthorId);
//               }}
//               className="cursor-pointer text-white bg-red-500 rounded-full px-4 py-2 font-bold"
//               disabled={isloading || isdone}
//             >
//               {isloading ? "loading.." : "Delete"}
//             </button>
//           )}
//           {isdone && (
//             <h3 className="text-green-500 text-center font-bold">
//               Successfully{updateAuthorId ? "Updated" : "created"}
//             </h3>
//           )}
//         </form>
//       </section>
//     </main>
//   );
// }



"use client";

import { useAuthorForm } from "./contexts/AuthorFormContext";
import { useEffect } from "react";
import { Button } from "@/components/ui/button"; // Using your custom button
import { 
  User, 
  Mail, 
  Trash2, 
  CheckCircle2, 
  Sparkles, 
  ArrowLeft,
  UserPlus
} from "lucide-react";
import Link from "next/link";

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
    updateAuthorId,
    fetchData,
  } = useAuthorForm();

  useEffect(() => {
    if (updateAuthorId) {
      fetchData(updateAuthorId);
    }
  }, [updateAuthorId]);

  // Logic to clear form after success
  useEffect(() => {
    if (isdone && !updateAuthorId) {
      const timer = setTimeout(() => {
        handleData("name", "");
        handleData("email", "");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isdone, updateAuthorId, handleData]);

  return (
    <main className="min-h-screen w-full bg-[#0a0a0c] p-6 lg:p-10 text-slate-200">
      
      {/* Header Section */}
      <div className="max-w-2xl mx-auto mb-10">
        <Link href="/admin/authors" className="flex items-center gap-2 text-slate-500 hover:text-emerald-500 transition-colors text-xs font-bold uppercase tracking-widest mb-6">
           <ArrowLeft className="size-4" /> Back to Authors
        </Link>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <User className="text-emerald-500 size-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Author Profile</h1>
              <p className="text-sm text-slate-500">Manage writer credentials and info</p>
            </div>
          </div>

          {updateAuthorId ? (
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] bg-orange-500/10 text-orange-500 border border-orange-500/20 px-4 py-2 rounded-full">
              <Sparkles className="size-3" /> Update
            </span>
          ) : (
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-4 py-2 rounded-full">
              <UserPlus className="size-3" /> Create
            </span>
          )}
        </div>
      </div>

      <section className="max-w-2xl mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (updateAuthorId) {
              handleUpdate();
            } else {
              handleCreate();
            }
          }}
          className="flex flex-col gap-6 bg-slate-900/40 border border-white/5 p-8 lg:p-10 rounded-[2rem] shadow-2xl"
        >
          {/* Author Name */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <User className="size-3" /> Full Name <span className="text-emerald-500">*</span>
            </label>
            <input
              type="text"
              onChange={(e) => handleData("name", e.target.value)}
              value={data?.name || ""}
              required
              placeholder="e.g. Jane Doe"
              className="w-full bg-black/40 border border-slate-800 rounded-xl px-5 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-all placeholder:text-slate-700"
            />
          </div>

          {/* Author Email */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <Mail className="size-3" /> Email Address <span className="text-emerald-500">*</span>
            </label>
            <input
              type="email"
              onChange={(e) => handleData("email", e.target.value)}
              value={data?.email || ""}
              required
              placeholder="jane@example.com"
              className="w-full bg-black/40 border border-slate-800 rounded-xl px-5 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-all placeholder:text-slate-700"
            />
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-medium">
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            {!isdone && (
              <Button
                type="submit"
                disabled={isloading || isdone}
                className="flex-1 rounded-xl py-6 font-bold text-md shadow-lg shadow-emerald-500/10"
              >
                {isloading ? "Processing..." : updateAuthorId ? "Update Author" : "Register Author"}
              </Button>
            )}

            {updateAuthorId && !isdone && (
              <Button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete(updateAuthorId);
                }}
                variant="destructive"
                disabled={isloading || isdone}
                className="rounded-xl py-6 px-8 font-bold"
              >
                <Trash2 className="size-5" />
              </Button>
            )}
          </div>

          {isdone && (
            <div className="flex items-center justify-center gap-3 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold animate-in fade-in zoom-in duration-300">
              <CheckCircle2 className="size-6" />
              Successfully {updateAuthorId ? "Updated" : "Created"}
            </div>
          )}
        </form>
      </section>
    </main>
  );
}