import prisma from "@/lib/db";
import { format } from "date-fns";
import React, { FC } from "react";
interface CommentsProps {
  postId: string;
}
const Comments: FC<CommentsProps> = async ({ postId }) => {
  const comments = await prisma.comment.findMany({
    where: {
      postId: postId,
    },
    include: {
      author: true,
    },
  });

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold pb-2">Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id} className="mb-4 bg-gray-100 p-2">
            <div className="flex justify-between items-center mb-2">
              <div className="text-slate-600 font-bold mr-2">
                {comment.author?.name || comment.author?.email}
              </div>
              <div className="text-grey-500 text-sm">
                {format(comment.createdAt, "MMMM d, yyyy")}
              </div>
            </div>
            <p>{comment.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
