import { CirclePlus } from "lucide-react";
import Link from "next/link";
import CategoriesListView from "./components/categoriesListView";
export default function Page() {
  return (
    <main className="w-full flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <h1 className="font-bold p-6">categories</h1>
        <Link href={`/admin/categories/form`}>
          <button className=" cursor-pointer flex gap-2 items-center bg-blue-500 px-4 py-2 text-white rounded-full font-bold">
            <CirclePlus />
            Add
          </button>
        </Link>
      </div>
     <CategoriesListView />
    </main>
  );
}
