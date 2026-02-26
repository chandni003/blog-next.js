import { db } from "@/lib/firebase";
import { deleteDoc, doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";


export const createNewAuthor = async ({data}:{data:any})=>{
        if(!data?.name){
            throw new Error("name is undefined");
        }
        if (!data?.slug){
            throw new Error("slug is undefined");
        }
        // if(!image){
        //     throw new Error("image is not defined");
        // }
        const ref = doc(db,`authors/${data?.slug}`);
        await setDoc(ref,{
            ...data,
            id: data?.slug,
            // image:image,
            timestamp : Timestamp.now(),
        });
        
}

//update function
export const UpdateAuthor = async ({data}:{data:any})=>{
        if(!data?.name){
            throw new Error("name is undefined");
        }
        if (!data?.slug){
            throw new Error("slug is undefined");
        }
        // if(!image){
        //     throw new Error("image is not defined");
        // }
        const ref = doc(db,`authors/${data?.id}`);
        await updateDoc(ref,{
            ...data,
            // image:image,
            timestamp : Timestamp.now(),
        });
        
}

//delete function
export const deleteAuthor =async (id:any)=>{
    if (!id){
        throw new Error("id is required ");
    }
    await deleteDoc(doc(db,`authors/${id}`));
}