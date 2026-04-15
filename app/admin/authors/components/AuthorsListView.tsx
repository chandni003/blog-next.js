// "use client";

// import { useAuthors } from "@/lib/firebase/author/read";
// import Link from "next/link";

// export default function AuthorsListView() {
//   const { data, error, isloading } = useAuthors();
//   if (isloading) {
//     return <h1>Loading...</h1>;
//   }
//   if (error) {
//     return <h1>{error}</h1>;
//   }
//   if (!data) {
//     return <h1>data not found..</h1>;
//   }
//   return (
//     <section className="text-center p-10">
//       <table className="w-full">
//         <thead>
//           <tr>
//             <th className="border px-4 py-3 bg-blue-50">sr.</th>
//             <th className="border px-4 py-3 bg-blue-50">Name</th>
//             <th className="border px-4 py-3 bg-blue-50">Email</th>
//             <th className="border px-4 py-3 bg-blue-50">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data?.map((item: any, key: any) => {
//             return (
//               <tr key={item?.id}>
//                 <td className="border px-4 py-3">{key + 1}</td>
//                 <td className="border px-4 py-3">{item?.name}</td>
//                 <td className="border px-4 py-3">{item?.email}</td>
//                 <td className="border px-4 py-3">
//                   <Link href={`/admin/authors/form?id=${item?.id}`}>
//                     {" "}
//                     <button className=" cursor-pointer text-white bg-blue-400 rounded-full px-3 py-1 text-sm font-bold">
//                       Action
//                     </button>
//                   </Link>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </section>
//   );
// }


"use client";

import { useAuthors } from "@/lib/firebase/author/read";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Mail, 
  Edit3, 
  Hash, 
  Loader2, 
  AlertCircle,
  UserCircle 
} from "lucide-react";

export default function AuthorsListView() {
  const { data, error, isloading } = useAuthors();

  if (isloading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Loader2 className="size-10 text-emerald-500 animate-spin" />
        <p className="text-slate-500 font-medium animate-pulse">Fetching contributors...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-3 p-6 m-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500">
        <AlertCircle className="size-5" />
        <p className="font-bold">{error}</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-24">
        <UserCircle className="size-12 text-slate-800 mx-auto mb-4" />
        <h1 className="text-slate-400 font-bold text-xl">No authors found</h1>
        <p className="text-slate-600 text-sm mt-2">Add your first contributor to get started.</p>
      </div>
    );
  }

  return (
    <section className="w-full overflow-x-auto custom-scrollbar">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/5">
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              <div className="flex items-center gap-2"><Hash className="size-3" /> Index</div>
            </th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              Contributor
            </th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              Email Address
            </th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 text-right">
              Management
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {data?.map((item: any, key: any) => (
            <tr 
              key={item?.id} 
              className="group hover:bg-emerald-500/[0.03] transition-colors duration-200"
            >
              <td className="px-6 py-5 text-sm text-slate-600 font-mono">
                {String(key + 1).padStart(2, '0')}
              </td>
              <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 group-hover:border-emerald-500/50 group-hover:text-emerald-400 transition-all overflow-hidden">
                    <User className="size-5" />
                  </div>
                  <span className="text-sm font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                    {item?.name}
                  </span>
                </div>
              </td>
              <td className="px-6 py-5">
                <div className="flex items-center gap-2 text-xs text-slate-400 bg-black/30 w-fit px-3 py-1.5 rounded-lg border border-slate-800 transition-colors group-hover:border-slate-700">
                  <Mail className="size-3 text-slate-600 group-hover:text-emerald-500/70" />
                  {item?.email}
                </div>
              </td>
              <td className="px-6 py-5 text-right">
                <Link href={`/admin/authors/form?id=${item?.id}`} passHref>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="rounded-full h-8 px-5 text-xs font-bold gap-2 bg-slate-900 border border-transparent hover:border-emerald-500/40 hover:text-emerald-400"
                  >
                    <Edit3 className="size-3" />
                    Configure
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}