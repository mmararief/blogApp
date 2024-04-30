import FormNewPost from "@/components/form-new-post";
import { posts } from "@/data/posts";
import prisma from "@/lib/db";
import Link from "next/link";
import React from "react";

const BlogsPage = async () => {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold pb-4">CREATE NEW BLOG</h1>
      <FormNewPost />
    </div>
  );
};

export default BlogsPage;
