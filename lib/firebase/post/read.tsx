"use client";
import { db } from "@/lib/firebase";
import { collection, getDoc, onSnapshot, doc, query, where } from "firebase/firestore";
import useSWRSubscription from "swr/subscription";

export function usePost() {
  const { data, error }: any = useSWRSubscription(["post"], ([path], { next }) => {
    const ref = collection(db, path);
    const unsub = onSnapshot(
      ref,
      (snaps) => { next(null, snaps.docs.map((v) => ({ id: v.id, ...v.data() }))); },
      (error) => { next(error?.message); }
    );
    return () => unsub();
  });
  return { data, error, isloading: data === undefined };
}

// Fetches only the posts authored by a specific user email — no client-side filtering needed
export function useUserPosts(authorEmail: string | null | undefined) {
  const { data, error }: any = useSWRSubscription(
    authorEmail ? ["post", "byAuthor", authorEmail] : null,
    ([path, , email], { next }) => {
      const ref = query(collection(db, path), where("authorEmail", "==", email));
      const unsub = onSnapshot(
        ref,
        (snaps) => { next(null, snaps.docs.map((v) => ({ id: v.id, ...v.data() }))); },
        (error) => { next(error?.message); }
      );
      return () => unsub();
    }
  );
  return { data: data ?? [], error, isloading: data === undefined && !!authorEmail };
}

export const getPost = async (id: any) => {
  return await getDoc(doc(db, `post/${id}`));
};

