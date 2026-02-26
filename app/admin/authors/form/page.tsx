"use client";

import { useAuthorForm } from "./contexts/AuthorFormContext";
import { useEffect } from "react";

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
    updateAuthorId,
    fetchData,
  } = useAuthorForm();

  useEffect(() => {
    if (updateAuthorId) {
      fetchData(updateAuthorId);
    }
  }, [updateAuthorId]);

  return (
    <main className="w-full p-6">
      <div className="flex gap-5 items-center">
        <h1 className="font-bold">form page</h1>
        {updateAuthorId && (
          <div className="flex">
            <h1 className="text-white font-bold bg-orange-500 px-4 py-2 rounded-full">
              Update
            </h1>
          </div>
        )}
        {!updateAuthorId && (
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
            if (updateAuthorId) {
              handleUpdate();
            } else {
              handleCreate();
            }
          }}
          className="flex flex-col gap-2 bg-blue-50 p-10 rounded-md"
        >
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-500">
              Author Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              onChange={(e) => {
                e.preventDefault();
                handleData("name", e.target.value);
              }}
              value={data?.name}
              required
              placeholder="Author Name"
              className="rounded-full px-4 py-2 border bg-gray-50"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-500">
              Author slug <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              onChange={(e) => {
                e.preventDefault();
                handleData("slug", e.target.value);
              }}
              value={data?.slug}
              required
              placeholder="Author slug"
              className="rounded-full px-4 py-2 border bg-gray-50"
            />
          </div>
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
              {isloading ? "loading.." : updateAuthorId ? "update" : "create"}
            </button>
          )}

          {updateAuthorId && !isdone &&  (
            <button
              onClick={(e) => {
                e.preventDefault();
               handleDelete(updateAuthorId);
              }}
              className="cursor-pointer text-white bg-red-500 rounded-full px-4 py-2 font-bold"
              disabled={isloading || isdone}
            >
              {isloading ? "loading.." : "Delete"}
            </button>
          )}
          {isdone && (
            <h3 className="text-green-500 text-center font-bold">
              Successfully{updateAuthorId ? "Updated" : "created"}
            </h3>
          )}
        </form>
      </section>
    </main>
  );
}
