import React from "react";
import prisma from "@/lib/db";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/session";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const Blogs = async () => {
  const user = await getCurrentUser();
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
    },
  });

  console.log(posts);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-4">Blogs</h1>
        {user?.email ? (
          <Link
            href="/blogs"
            className={buttonVariants({ variant: "outline" })}
          >
            New Post
          </Link>
        ) : (
          ""
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blogs/${post.id}`}
            className="bg-white p-4 rounded-md shadow-md "
          >
            <div className="flex items-center mb-6">
              <Avatar className="mr-2">
                {post?.author?.image && (
                  <AvatarImage src={post?.author?.image} />
                )}

                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-gray-600 text-xs">{post?.author?.name}</p>
            </div>
            <h2 className="text-xl font-bold">{post.title}</h2>

            <p className="text-2sm">{post.content.substring(0, 50)}...</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
