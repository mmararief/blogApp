"use client";
import { useSession } from "next-auth/react";
import React from "react";

const Banner = () => {
  const { data } = useSession();
  const email = data?.user?.email;
  let displayName;

  if (email) {
    const atIndex = email.indexOf("@");
    if (atIndex !== -1) {
      displayName = email.substring(0, atIndex);
    } else {
      displayName = email;
    }
  }

  return (
    <div
      className="relative bg-cover bg-center rounded-xl h-40"
      style={{
        backgroundImage:
          "url('https://wallpapertag.com/wallpaper/full/7/b/6/447627-neon-blue-backgrounds-1920x1080-mobile.jpg')",
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-white font-bold text-4xl">
            Welcome {data?.user?.name || displayName}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Banner;
