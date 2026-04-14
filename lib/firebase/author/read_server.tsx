import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";


export const getAuthor = async (id:any)=>{
    return await getDoc(doc(db,`authors/${id}`)).then((snap)=>snap.data());
}