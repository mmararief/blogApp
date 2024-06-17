import React from "react";
import UserButton from "./user-button";
import { getCurrentUser } from "@/lib/session";

const NavUser = async () => {
  const user = await getCurrentUser();
  return (
    <div>
      {user?.email ? (
        <UserButton userId={user.name} />
      ) : (
        <a
          className="block lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200"
          href="/api/auth/signin"
        >
          Sign In
        </a>
      )}
    </div>
  );
};

export default NavUser;
