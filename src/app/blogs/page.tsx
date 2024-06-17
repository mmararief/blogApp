import FormNewPost from "@/components/form-new-post";

import React from "react";

const BlogsPage = async () => {
  return (
    <div className="max-w-4xl mx-auto py-8 md:max-w-3xl lg:max-w-4xl xl:max-w-6xl my-5 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold pb-4">CREATE NEW BLOG</h1>
      <FormNewPost />
    </div>
  );
};

export default BlogsPage;
