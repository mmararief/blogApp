"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CiSquarePlus } from "react-icons/ci";
import { buttonVariants } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/session";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Banner from "./Banner";
import { useSession } from "next-auth/react";

type Post = {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  author: {
    name: string;
    image: string;
  };
  createdAt: string;
};

const Blogs = () => {
  const { data } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true); // State to track loading state

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <div className="pb-8">
        {loading ? (
          // Skeleton or loading state for Banner
          <SkeletonBanner />
        ) : (
          // Render Banner with loaded posts
          <Banner posts={posts} />
        )}
      </div>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Blogs</h1>
        {data?.user?.email ? (
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {loading ? (
          // Skeleton or loading state
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        ) : (
          // Render posts if not loading
          posts.map((post) => (
            <Link
              key={post.id}
              href={`/blogs/${post.id}`}
              className="bg-white p-4 rounded-md shadow-md hover:scale-[1.1]"
            >
              <div className="flex items-center border-b border-gray-300 mb-2">
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
                <h2 className="text-xl font-bold">
                  {post.title.toUpperCase()}
                </h2>

                <p className="text-2sm">{post.content.substring(0, 100)}...</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

// Placeholder skeleton component
const Skeleton = () => (
  <div className="bg-gray-200 p-4 rounded-md shadow-md animate-pulse">
    <div className="flex items-center border-b border-gray-300 mb-2">
      <div className="bg-gray-300 rounded-full h-12 w-12"></div>
      <div className="ml-4">
        <div className="bg-gray-300 h-4 w-20 mb-1"></div>
        <div className="bg-gray-300 h-3 w-16"></div>
      </div>
    </div>
    <div className="mt-4">
      <div className="bg-gray-300 h-4 w-48 mb-2"></div>
      <div className="bg-gray-300 h-4 w-64"></div>
    </div>
  </div>
);

const SkeletonBanner = () => (
  <div className="bg-gray-200 p-4 rounded-md shadow-md animate-pulse h-[300px]"></div>
);

export default Blogs;
