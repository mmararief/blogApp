"use client";
import ButtonDelete from "@/components/buttonDelete";
import Comments from "@/components/comments";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import BackButton from "@/components/BackButton";
import { useSession } from "next-auth/react";

interface Author {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  author: Author | null;
}

interface BlogDetailProps {
  post: Post;
}

const BlogDetail: FC<BlogDetailProps> = ({ post }) => {
  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl py-4 font-bold">{post.title.toUpperCase()}</h1>
        <div className="flex items-center">
          <Avatar className="mr-2">
            {post.author?.image && (
              <AvatarImage className="object-cover" src={post.author.image} />
            )}
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-gray-600">{post.author?.name}</p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {post.imageUrl && (
          <Image
            className="rounded-xl"
            src={post.imageUrl}
            alt="my image"
            width={1000}
            height={300}
            style={{
              maxHeight: "400px",
              width: "1000px",
              objectFit: "contain",
            }}
          />
        )}
      </div>

      <div className="mt-4">
        <p className="break-normal">{post.content}</p>
      </div>
    </div>
  );
};

export default BlogDetail;
