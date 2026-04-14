import { getAllCategories } from "@/lib/firebase/category/read_server"
import Link from "next/link";

export default async function page(){
    const categories = await  getAllCategories();
    return <main className="text-black bg-white h-[88vh] p-5 flex gap-5">
        {categories.map((category,key)=>{
            return <CategoryCard  category={category} key={key}/>

        })}
    </main>
}
export function CategoryCard({category}:{category:any}){
    return <Link href={`/categories/${category?.id}`}>
                 <div>
                <h3 className="border border-slate-200 p-2 fonst-bold items-center rounded-lg">{category?.name}</h3>
            </div>
            </Link>

}