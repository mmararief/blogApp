/// detail page
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

  return (
    <>
      <div className="max-w-4xl mx-auto py-8">
        <div className="mb-4">
          <BackButton />
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl py-4 font-bold">
            {post?.title.toUpperCase()}
          </h1>
          <div className="flex items-center ">
            <Avatar className="mr-2">
              {post?.author?.image && <AvatarImage src={post?.author?.image} />}

              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-gray-600">{post?.author?.name}</p>
          </div>
        </div>

        <div>
          {post?.imageUrl && (
            <Image
              className="rounded-xl"
              src={post?.imageUrl}
              alt="my image"
              width="1000"
              height={300}
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          )}
        </div>

        <div className="mt-4">
          <p className="break-normal">{post?.content}</p>
        </div>
        <div className="pt-10">
          {user?.email == post?.author?.email ? (
            <ButtonDelete postId={params.id} />
          ) : null}
          <Comments postId={params.id} userId={""} />
          <svg data-testid="DeleteIcon"></svg>
        </div>
      </div>
    </>
  );
};

export default BlogDetailPage;
