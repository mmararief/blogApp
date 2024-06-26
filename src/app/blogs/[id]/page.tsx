import ButtonDelete from "@/components/buttonDelete";
import Comments from "@/components/comments";
import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import React, { FC } from "react";
import BackButton from "@/components/BackButton";

interface BlogDetailProps {
  params: {
    id: string;
  };
}

const BlogDetailPage: FC<BlogDetailProps> = async ({ params }) => {
  const user = await getCurrentUser();
  const post = await prisma.post.findFirst({
    where: {
      id: params.id,
    },
    include: {
      author: true,
    },
  });

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-full md:max-w-3xl lg:max-w-4xl xl:max-w-6xl mx-auto my-5 px-4 sm:px-6 lg:px-8">
      <div className="mb-4">
        <BackButton />
      </div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl py-4 font-bold">
          {post?.title.toUpperCase()}
        </h1>
        <div className="flex items-center">
          <Avatar className="mr-2">
            {post?.author?.image && (
              <AvatarImage className="object-cover" src={post?.author?.image} />
            )}
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600">
            {post?.author?.name}
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center">
        {post?.imageUrl && (
          <Image
            className="rounded-xl object-cover"
            src={post?.imageUrl}
            alt="Blog Image"
            width={1000}
            height={400}
            layout="responsive"
          />
        )}
      </div>
      <div className="mt-4">
        <p className="text-sm sm:text-base md:text-lg lg:text-xl break-words">
          {post?.content}
        </p>
      </div>
      <div className="pt-10">
        {user?.email === post?.author?.email && (
          <ButtonDelete postId={params.id} />
        )}
        <Comments postId={params.id} />
        <svg data-testid="DeleteIcon"></svg>
      </div>
    </div>
  );
};

export default BlogDetailPage;
