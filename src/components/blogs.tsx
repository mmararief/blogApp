import React from "react";
import prisma from "@/lib/db";
import Link from "next/link";
import { CiSquarePlus } from "react-icons/ci";
import { buttonVariants } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/session";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Banner from "./Banner";
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

  return (
    <div>
      <div className="pb-8">
        <Banner posts={posts} />
      </div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold ">Blogs</h1>
        {user?.email ? (
          <Link
            href="/blogs"
            className={buttonVariants({ variant: "outline" })}
          >
            <CiSquarePlus className="mr-2" />
            New Post
          </Link>
        ) : (
          ""
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blogs/${post.id}`}
            className="bg-white p-4 rounded-md shadow-md hover:scale-[1.1] "
          >
            <div className="flex items-center border-b border-gray-300 mb-2 ">
              <Avatar className="mr-2 mb-2">
                {post?.author?.image && (
                  <AvatarImage
                    className="object-cover"
                    src={post?.author?.image}
                  />
                )}

                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-gray-600 text-sm">{post?.author?.name}</p>
            </div>
            <div className="ml-12">
              <h2 className="text-xl font-bold">{post.title.toUpperCase()}</h2>

              <p className="text-2sm">{post.content.substring(0, 100)}...</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
