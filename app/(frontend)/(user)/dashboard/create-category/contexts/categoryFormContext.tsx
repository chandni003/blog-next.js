"use client";
import { createContext, useContext, useState } from "react";
import { createNewCategory,createUpdateCategory, deleteCategory } from "@/lib/firebase/category/write";
import { useRouter, useSearchParams } from "next/navigation";
import { getCategory } from "@/lib/firebase/category/read";
const CategoryFormContext = createContext<any>(null);

export default function CategoryformContextProvider({
    children,
}:{
    children: React.ReactNode;
}){
    const searchParams= useSearchParams();
    const updateCategoryId = searchParams.get("id");
    const router = useRouter();

    const [data,setData] = useState<any>({});
    const [isloading,setIsLoading]= useState<any>(false);
    const [error,setError]=useState<any>(null);
    const [isdone,setIsDone] = useState<any>(false);
    // const [image,setImage] = useState<File | any>(null);

    const handleData = (key :any,value:any)=>{
        setIsDone(false);
        setData({
            ...data,
            [key]:value,
        })
    }

    //create data 
    const handleCreate = async ()=>
    {
        setError(null);
        setIsLoading(true);
        setIsDone(false);
        try{
            await createNewCategory({data:data});
            setIsDone(true);
        }catch(error:any){
            setError(error?.message);
        }
        setIsLoading(false);
    }


    //fetch dta for updation 
    const fetchData = async (id:any)=>{
         setError(null);
        setIsLoading(true);
        setIsDone(false);
        try{
            const res = await getCategory(id);
            if(res.exists()){
                setData(res.data());


            }
            else{
                throw new Error(`no data found for id${id}`);
            }
            
        }catch(error:any){
            setError(error?.message);
        }
        setIsLoading(false);
    }

    //updating the data
        const handleUpdate = async ()=>
    {
        setError(null);
        setIsLoading(true);
        setIsDone(false);
        try{
            await createUpdateCategory({data:data});
            setIsDone(true);
        }catch(error:any){
            setError(error?.message);
        }
        setIsLoading(false);
    }

    //delete function
         const handleDelete = async (id:any)=>
    {
        setError(null);
        setIsLoading(true);
        setIsDone(false);
        try{
            await deleteCategory(id);
            setIsDone(true);
            router.push('/admin/categories');
        }catch(error:any){
            setError(error?.message);
        }
        setIsLoading(false);
    }





    return <CategoryFormContext.Provider
    value={{
          data,
        //   image,
        //   setImage,
          isloading,
          error,
          isdone,
          handleCreate,
          handleData, 
          handleUpdate,
          handleDelete,
          updateCategoryId,
          fetchData,
          
           
    }}>{children}

    </CategoryFormContext.Provider>

}
export const useCategoryForm =()=> useContext(CategoryFormContext);