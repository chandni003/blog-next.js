"use client";
import { db } from "@/lib/firebase";
import { collection, getDoc, onSnapshot,doc } from "firebase/firestore";
import useSWRSubscription from "swr/subscription";
export function useAuthors() {

  const { data, error}:any = useSWRSubscription( ["authors"], ([path], { next }) => {
      
    const ref = collection(db, path);
    const unsub = onSnapshot( ref,(snaps) => {
          next(null, snaps.docs.map((v) => v.data()))
        },(error) => {
          next(error?.message);
        })
      return () => unsub();
    })
    return{
        data,
        error,
        isloading:data === undefined? true :false,
    }
}
export const getAuthor = async(id:any) =>{
  return  await getDoc(doc(db,`authors/${id}`));
}
