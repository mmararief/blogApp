import prisma from "@/lib/db";
import { format } from "date-fns";
import React, { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FormComment from "./form-comment";
import { getCurrentUser } from "@/lib/session";
import Link from "next/link";
import { Button } from "./ui/button";
interface CommentsProps {
  postId: string;
  userId: string;
}
const Comments: FC<CommentsProps> = async ({ postId }) => {
  const comments = await prisma.comment.findMany({
    where: {
      postId: postId,
    },
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc", // Assuming there's a createdAt field in your comment schema
    },
  });
  const user = await getCurrentUser();

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold pb-4">{comments.length} Comments </h2>
      {user?.email ? (
        <FormComment postId={postId} userId={user.image || ""} />
      ) : (
        <Link href="/api/auth/signin">
          <Button>Login For Comment</Button>
        </Link>
      )}
      <ul>
        {comments.map((comment) => (
          <li key={comment.id} className="mb-4 p-2">
            <div className="flex justify-between items-center mb-2">
              <div className=" flex items-center mr-2">
                <Avatar className="mr-2">
                  {comment?.author?.image && (
                    <AvatarImage src={comment?.author?.image} />
                  )}

                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center">
                    <p className="text-black font-semibold">
                      {comment.author?.name || comment.author?.email}
                    </p>
                    <div className="text-grey-500 text-xs pl-3">
                      {format(comment.createdAt, "MMMM d, yyyy")}
                    </div>
                  </div>
                  <p className="text-sm">{comment.text}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
