"use client";
import { createContext, useContext, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createNewAuthor, deleteAuthor, UpdateAuthor } from "@/lib/firebase/author/write";
import { getAuthor } from "@/lib/firebase/author/read";
const Authorformcontext = createContext<any>(null);

export default function  AuthorformcontextProvider({
    children,
}:{
    children: React.ReactNode;
}){
    const searchParams= useSearchParams();
    const updateAuthorId = searchParams.get("id");
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
            await createNewAuthor({data:data});
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
            const res = await getAuthor(id);
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
            await UpdateAuthor({data:data});
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
            await deleteAuthor(id);
            setIsDone(true);
            router.push('/admin/authors');
        }catch(error:any){
            setError(error?.message);
        }
        setIsLoading(false);
    }





    return <Authorformcontext.Provider
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
          updateAuthorId,
          fetchData,
          
           
    }}>{children}

    </Authorformcontext.Provider>

}
export const useAuthorForm =()=> useContext(Authorformcontext);