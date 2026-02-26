import { db } from "@/lib/firebase";
import { getDocs,collection } from "firebase/firestore";


export const getAllPosts = async ()=>{
    return await getDocs(collection(db,"post")).then((snaps :any) => snaps.docs.map((d:any)=> d.data()))
}