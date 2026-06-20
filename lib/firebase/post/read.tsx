"use client";
import { db } from "@/lib/firebase";
import { collection, getDoc, onSnapshot, doc, query, where } from "firebase/firestore";
import useSWRSubscription from "swr/subscription";

export function usePost(statusFilter?: string) {
  const { data, error }: any = useSWRSubscription(
    statusFilter ? ["post", statusFilter] : ["post"], 
    ([path, filterStatus]: [string, string | undefined], { next }: any) => {
      let ref: any = collection(db, path);
      if (filterStatus) {
        ref = query(ref, where("status", "==", filterStatus));
      }
      const unsub = onSnapshot(
        ref,
        (snaps: any) => { next(null, snaps.docs.map((v: any) => ({ id: v.id, ...v.data() }))); },
        (error: any) => { 
          console.error("usePost subscription error:", error);
          next(error?.message); 
        }
      );
      return () => unsub();
    }
  );
  if (error) {
    console.error("usePost hook error:", error);
  }
  return { data, error, isloading: data === undefined && !error };
}

// Fetches only the posts authored by a specific user email — no client-side filtering needed
export function useUserPosts(authorEmail: string | null | undefined) {
  const { data, error }: any = useSWRSubscription(
    authorEmail ? ["post", "byAuthor", authorEmail] : null,
    ([path, , email], { next }) => {
      const ref = query(collection(db, path), where("authorEmail", "==", email));
      const unsub = onSnapshot(
        ref,
        (snaps: any) => { next(null, snaps.docs.map((v: any) => ({ id: v.id, ...v.data() }))); },
        (error: any) => { next(error?.message); }
      );
      return () => unsub();
    }
  );
  return { data: data ?? [], error, isloading: data === undefined && !!authorEmail };
}

export const getPost = async (id: any) => {
  return await getDoc(doc(db, `post/${id}`));
};

