"use client";
import { createContext, useContext, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createNewPost, createUpdatePost, deletePost } from "@/lib/firebase/post/write";
import { getPost } from "@/lib/firebase/post/read";
import { useAuth } from "@/lib/context/AuthContext";
const PostFormContext = createContext<any>(null);

export default function PostFormContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const searchParams = useSearchParams();
    const updatePostId = searchParams.get("id");
    const router = useRouter();
    const { user } = useAuth();

    const [data, setData] = useState<any>({});
    const [isloading, setIsLoading] = useState<any>(false);
    const [error, setError] = useState<any>(null);
    const [isdone, setIsDone] = useState<any>(false);
    // const [image,setImage] = useState<File | any>(null);

    const handleData = (key: any, value: any) => {
        setIsDone(false);
        if (key === "multiple") {
            setData((prev: any) => ({ ...prev, ...value }));
        } else {
            setData((prev: any) => ({ ...prev, [key]: value }));
        }
    }

    //create data 
    const handleCreate = async () => {
        setError(null);
        setIsLoading(true);
        setIsDone(false);
        try {
            // Stamp author identity onto the post before saving
            // If the admin already set these via SelectAuthorfield, we respect them.
            // Otherwise, we fallback to the currently logged in user's details.
            await createNewPost({
                data: {
                    ...data,
                    authorEmail: data.authorEmail || user?.email || null,
                    authorId: data.authorId || user?.uid || null,
                    authorName: data.authorName || user?.displayName || null,
                }
            });
            setIsDone(true);
        } catch (error: any) {
            setError(error?.message);
        }
        setIsLoading(false);
    }


    //fetch dta for updation 
    const fetchData = async (id: any) => {
        setError(null);
        setIsLoading(true);
        setIsDone(false);
        try {
            const res = await getPost(id);
            if (res.exists()) {
                setData(res.data());


            }
            else {
                throw new Error(`no data found for id${id}`);
            }

        } catch (error: any) {
            setError(error?.message);
        }
        setIsLoading(false);
    }

    //updating the data
    const handleUpdate = async () => {
        setError(null);
        setIsLoading(true);
        setIsDone(false);
        try {
            await createUpdatePost({ data: data });
            setIsDone(true);
        } catch (error: any) {
            setError(error?.message);
        }
        setIsLoading(false);
    }

    //delete function
    const handleDelete = async (id: any) => {
        setError(null);
        setIsLoading(true);
        setIsDone(false);
        try {
            await deletePost(id);
            setIsDone(true);
            router.push('/dashboard/my-posts');
        } catch (error: any) {
            setError(error?.message);
        }
        setIsLoading(false);
    }





    return <PostFormContext.Provider
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
            updatePostId,
            fetchData,


        }}>{children}

    </PostFormContext.Provider>

}
export const usePostForm = () => useContext(PostFormContext);