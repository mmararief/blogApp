"use client";
import React, { ChangeEvent, FormEvent, useReducer, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { FormData } from "@/types/blogs";
import { useSession } from "next-auth/react";
import error from "next/error";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const inputClass =
  "w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300";
const FormNewPost = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
  });

  const { data } = useSession();
  const router = useRouter();
  console.log(data?.user);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("api/posts", formData);

      if (response.status === 200) {
        router.push(`/blogs/${response.data.newPost.id}`);
      }
    } catch {
      console.error(error);
    }
  };
  return (
    <form className="max-w-4md mx-auto p-4" onSubmit={handleSubmit}>
      <div className="mb-4">
        <input
          type="text"
          className={inputClass}
          placeholder="Enter the title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <ReactTextareaAutosize
          minRows={5}
          name="content"
          className={inputClass}
          placeholder="Enter the content"
          value={formData.content}
          onChange={handleChange}
        />
      </div>
      <Button
        disabled={!data?.user?.email}
        type="submit"
        className=" font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full disabled:bg-gray-400"
      >
        Submit
      </Button>
    </form>
  );
};

export default FormNewPost;
