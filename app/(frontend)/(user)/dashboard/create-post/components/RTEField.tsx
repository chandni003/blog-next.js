"use client";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { usePostForm } from "../contexts/PostFormContext";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ size: ["small", false, "large", "huge"] }],
      ["link", "image", "video"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["clean"],
    ],
  },
};

export function RTEfield() {
  const { data, handleData } = usePostForm();

  const handleChange = (value: string) => {
    handleData("content", value);
  };

  return (
    <div className="flex-1 flex flex-col [&_.ql-toolbar]:rounded-none [&_.ql-toolbar]:border-x-0 [&_.ql-toolbar]:border-t-0 [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-border [&_.ql-toolbar]:bg-muted/10 [&_.ql-container]:border-none [&_.ql-container]:flex-1 [&_.ql-container]:text-sm [&_.ql-editor]:min-h-[500px] [&_.ql-editor]:p-6 [&_.ql-editor]:text-foreground [&_.ql-editor]:leading-relaxed">
      <ReactQuill
        value={data?.content || ""}
        onChange={handleChange}
        modules={modules}
        placeholder="Start writing your story..."
        theme="snow"
      />
    </div>
  );
}
