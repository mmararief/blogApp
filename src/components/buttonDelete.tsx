"use client";
import React from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface BlogDetailProps {
  postId: string;
}

const ButtonDelete: React.FC<BlogDetailProps> = ({ postId }) => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      await fetch("/api/posts/" + postId, {
        method: "DELETE",
      });
      console.log(postId);
      router.push("/");
    } catch (error) {
      console.error("Error deleting post:", error);
      // Handle error appropriately, e.g., display a message to the user
    }
  };

  return (
    <div>
      <Button onClick={handleDelete} variant="destructive">
        Delete Post
      </Button>
    </div>
  );
};

export default ButtonDelete;
