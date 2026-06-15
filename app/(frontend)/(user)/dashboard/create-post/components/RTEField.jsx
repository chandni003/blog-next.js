"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import "react-quill-new/dist/quill.snow.css";
import { usePostForm } from "../contexts/PostFormContext";

const ReactQuill = dynamic(()=> import ('react-quill-new'),{ssr:false});


const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "strike", "blockquote"],
      [{ size: ["extra-small", "small", "medium", "large"] }],
      ["link", "image", "video"],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
  },
};
export function RTEfield() {
  const {data,handleData} = usePostForm();

  const handleChange = (value) => {
    handleData("content",value);
  };
  return (
    <div>
      <ReactQuill
        value={data?.content}
        onChange={handleChange}
        modules={modules}
        placeholder="Enter your content here...."
      />
    </div>
  );
}
