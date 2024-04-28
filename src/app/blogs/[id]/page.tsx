import Comments from "@/components/comments";
import FormComment from "@/components/form-comment";
import React from "react";

const BlogDetailPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold">Post one</h1>
      <p>Writen by: john doe</p>
      <div className="mt-4">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia
        tempore quidem ut, voluptatum aperiam veniam animi facere eveniet
        dignissimos inventore quaerat et suscipit adipisci deserunt. Soluta
        perferendis culpa quis quisquam!
      </div>

      <Comments />
      <FormComment />
    </div>
  );
};

export default BlogDetailPage;
