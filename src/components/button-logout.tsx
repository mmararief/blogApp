"use client";
import { signOut } from "next-auth/react";
import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";

const ButtonLogout = () => {
  return <Button onClick={() => signOut()}>Logout</Button>;
};

export default ButtonLogout;
