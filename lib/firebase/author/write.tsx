import { db } from "@/lib/firebase";
import {
    collection,
  deleteDoc,
  doc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

export const createNewAuthor = async ({ data, uid }: { data: any; uid: string }) => {
  if (!uid) {
    throw new Error("uid is required to map the author to the user");
  }
  if (!data?.name) {
    throw new Error("name is undefined");
  }

  const ref = doc(db, `authors/${uid}`);
  await setDoc(ref, {
    ...data,
    id: uid, // Use the UID as the author ID
    timestamp: Timestamp.now(),
  });
};

//update function
export const UpdateAuthor = async ({ data, uid }: { data: any; uid: string }) => {
  if (!uid) {
    throw new Error("uid is required to update the correct author");
  }
  if (!data?.name) {
    throw new Error("name is undefined");
  }

  const ref = doc(db, `authors/${uid}`);
  await updateDoc(ref, {
    ...data,
    timestamp: Timestamp.now(),
  });
};

//delete function
export const deleteAuthor = async (id: any) => {
  if (!id) {
    throw new Error("id is required ");
  }
  await deleteDoc(doc(db, `authors/${id}`));
};
