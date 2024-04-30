import ButtonDelete from "@/components/buttonDelete";
import Comments from "@/components/comments";
import FormComment from "@/components/form-comment";
import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import React, { FC } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex items-center mb-6">
        <Avatar className="mr-2">
          {post?.author?.image && <AvatarImage src={post?.author?.image} />}

          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-gray-600">{post?.author?.name}</p>
      </div>
      <h1 className="text-3xl font-bold">{post?.title}</h1>

      <div className="mt-4">
        <p className="break-normal">{post?.content}</p>
      </div>
      <div className="pt-10">
        {user?.email == post?.author?.email ? (
          <ButtonDelete postId={params.id} />
        ) : null}
        <Comments postId={params.id} />
        {user?.email ? (
          <FormComment postId={params.id} />
        ) : (
          <Link href="/api/auth/signin">
            <Button>Login For Comment</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default BlogDetailPage;