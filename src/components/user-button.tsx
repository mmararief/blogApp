"use client";
import React from "react";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
interface UserButtonProps {
  userId: string | null | undefined;
}
const UserButton: React.FC<UserButtonProps> = ({ userId }) => {
  return (
    <div className="py-2 px-6">
      <DropdownMenu>
        <DropdownMenuTrigger className="text-sm">
          {userId ? `Hi, ${userId}` : "Welcome, Guest"}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <a href="/profile">
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </a>

          <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserButton;
