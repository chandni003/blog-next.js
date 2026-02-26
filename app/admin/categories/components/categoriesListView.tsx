"use client";

import { useCategories } from "@/lib/firebase/category/read";
import Link from "next/link";

export default function CategoriesListView() {
  const { data, error, isloading } = useCategories();
  if (isloading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }
  if (!data) {
    return <h1>data not found..</h1>;
  }
  return (
    <section className="text-center p-10">
      <table className="w-full">
        <thead>
          <tr>
            <th className="border px-4 py-3 bg-blue-50">sr.</th >
            <th className="border px-4 py-3 bg-blue-50">Name</th >
            <th className="border px-4 py-3 bg-blue-50">Slug</th>
            <th className="border px-4 py-3 bg-blue-50">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: any, key: any) => {
           
            return <tr key={item?.id}>
                <td className="border px-4 py-3">{key + 1}</td>
                <td className="border px-4 py-3">{item?.name}</td>
                <td className="border px-4 py-3">{item?.slug}</td>
                <td className="border px-4 py-3">
                  <Link href={`/admin/categories/form?id=${item?.id}`}>                  <button className=" cursor-pointer text-white bg-blue-400 rounded-full px-3 py-1 text-sm font-bold">Action</button></Link>
</td>
              </tr>
            
          })}
        </tbody>
      </table>
    </section>
  );
}
