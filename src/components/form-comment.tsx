"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
interface FormCommentProps {
  postId: string;
}

const FormComment: FC<FormCommentProps> = ({ postId }) => {
  const [comment, setComment] = useState<string>("");
  const router = useRouter();
  const { data: session } = useSession();

  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmitComment();
    }
  };

  const handleSubmitComment = async () => {
    if (comment.trim() !== "") {
      try {
        const newComment = await axios.post("/api/comments", {
          postId,
          text: comment,
        });
        if (newComment.status === 200) {
          setComment("");
          router.refresh();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div className="flex items-center border-b border-gray-300 p-2">
        <Avatar className="mr-2">
          {session?.user && <AvatarImage src={session.user.image || ""} />}

          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <input
          value={comment}
          onChange={handleCommentChange}
          onKeyPress={handleKeyPress}
          type="text"
          placeholder="Tambahkan komentar..."
          className="w-full border-none focus:outline-none"
          name="comment"
        />
      </div>
      <div className="flex flex-row-reverse items-center py-2 px-4">
        <Button
          variant="outline"
          onClick={handleSubmitComment}
          className=" disabled:bg-gray-400"
          disabled={!session} // Disable if not logged in
        >
          {session ? "Comment" : "Login to Comment"}
        </Button>
      </div>
    </div>
  );
};

export default FormComment;
