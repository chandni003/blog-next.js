"use client";

import { useCategories } from "@/lib/firebase/category/read";
import { usePostForm } from "./contexts/PostFormContext";
import { useEffect } from "react";
import { useAuthors } from "@/lib/firebase/author/read";
import { RTEfield } from "./components/RTEField";

export default function Page() {
  const {
    data,
    // image,
    // setImage,
    isloading,
    error,
    isdone,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleData,
    updatePostId,
    fetchData,
  } = usePostForm();

  useEffect(() => {
    if (updatePostId) {
      fetchData(updatePostId);
    }
  }, [updatePostId]);

  return (
    <main className="w-full p-6">
      <div className="flex gap-5 items-center">
        <h1 className="font-bold">form page</h1>
        {updatePostId && (
          <div className="flex">
            <h1 className="text-white font-bold bg-orange-500 px-4 py-2 rounded-full">
              Update
            </h1>
          </div>
        )}
        {!updatePostId && (
          <div className="flex">
            <h1 className="text-white font-bold bg-green-500 px-4 py-2 rounded-full">
              create
            </h1>
          </div>
        )}
      </div>

      <section className="flex">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (updatePostId) {
              handleUpdate();
            } else {
              handleCreate();
            }
          }}
          className="flex flex-col gap-2 bg-blue-50 p-10 rounded-md"
        >
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-500">
              Post Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              onChange={(e) => {
                e.preventDefault();
                handleData("name", e.target.value);
              }}
              value={data?.name}
              required
              placeholder="Post Name"
              className="rounded-full px-4 py-2 border bg-gray-50"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-500">
              Post slug <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              disabled={updatePostId}
              onChange={(e) => {
                e.preventDefault();
                handleData("slug", e.target.value);
              }}
              value={data?.slug}
              required
              placeholder="Post slug"
              className="rounded-full px-4 py-2 border bg-gray-50"
            />
          </div>

          <SelectCategoryfield />
          <SelectAuthorfield />
          {/* {image && <div>
            <img className="h-80 w-full" src={URL.createObjectURL(image)} alt="" />
        </div>} */}
          {/* <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-500">
            Image <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e)=>{
                setImage(e.target.files?.[0]);
            }}
             required
            placeholder="image"
            className="rounded-full px-4 py-2 border bg-gray-50"
          />
        </div> */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {!isdone && (
            <button
              type="submit"
              className="cursor-pointer text-white bg-blue-500 rounded-full px-4 py-2 font-bold"
              disabled={isloading || isdone}
            >
              {isloading ? "loading.." : updatePostId ? "update" : "create"}
            </button>
          )}

          {updatePostId && !isdone && (
            <button
              onClick={(e) => {
                e.preventDefault();
                handleDelete(updatePostId);
              }}
              className="cursor-pointer text-white bg-red-500 rounded-full px-4 py-2 font-bold"
              disabled={isloading || isdone}
            >
              {isloading ? "loading.." : "Delete"}
            </button>
          )}
          {isdone && (
            <h3 className="text-green-500 text-center font-bold">
              Successfully{updatePostId ? "Updated" : "created"}
            </h3>
          )}
        </form>
        <RTEfield />
      </section>
    </main>
  );
}

function SelectCategoryfield() {
  const { data, handleData } = usePostForm();

  const { data: categories } = useCategories();

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="category" className="text-slate-500">
        Select Category<span className="text-red-500">*</span>
      </label>
      <select
        name="category"
        id="cateory"
        value={data?.categoryId}
        onChange={(e) => {
          handleData("categoryId", e.target.value);
        }}
        required
        className="rounded-full px-4 py-2 border bg-gray-50 w-full"
      >
        <option value="">select category</option>
        {categories &&
          categories?.map((item: any) => {
            return <option value={item?.id}>{item?.name}</option>;
          })}
      </select>
    </div>
  );
}


function SelectAuthorfield() {
  const { data, handleData } = usePostForm();

  const { data: author } = useAuthors();

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="author" className="text-slate-500">
        Select Author<span className="text-red-500">*</span>
      </label>
      <select
        name="author"
        id="author"
        value={data?.authorId}
        onChange={(e) => {
          handleData("authorId", e.target.value);
        }}
        required
        className="rounded-full px-4 py-2 border bg-gray-50 w-full"
      >
        <option value="">select author</option>
        {author &&
          author?.map((item: any) => {
            return <option value={item?.id}>{item?.name}</option>;
          })}
      </select>
    </div>
  );
}
