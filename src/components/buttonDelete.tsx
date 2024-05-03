"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { FaRegTrashAlt } from "react-icons/fa";
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
      router.refresh();
      router.push("/");
    } catch (error) {
      console.error("Error deleting post:", error);
      // Handle error appropriately, e.g., display a message to the user
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">
            <FaRegTrashAlt className="mr-2" /> Delete Post
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              Blog.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ButtonDelete;
