"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { IoArrowBack } from "react-icons/io5";

function BackButton() {
  const router = useRouter();

  return (
    <Button variant="outline" onClick={() => router.back()}>
      <IoArrowBack size={28} />
    </Button>
  );
}

export default BackButton;
