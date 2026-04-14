import { db } from "@/lib/firebase";
import { getDocs,collection, getDoc, doc, query, where } from "firebase/firestore";


export const getAllPosts = async ()=>{
    return await getDocs(collection(db,"post")).then((snaps :any) => snaps.docs.map((d:any)=> d.data()));
}

export const getAllPostswithCategory = async (categoryId:any)=>{
  const q = query(collection(db,'post'),where('categoryId',"==",categoryId)) ;
  return await getDocs(q).then((snaps :any) => snaps.docs.map((d:any)=> d.data()));
}

export const getPost = async(id:any) =>{
  return  await getDoc(doc(db,`post/${id}`)).then((snap)=>snap.data());
}