"use client";
import React, { ChangeEvent, FormEvent, useReducer, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { FormData } from "@/types/blogs";
import { useSession } from "next-auth/react";
import error from "next/error";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

import Image from "next/image";

import { UploadDropzone } from "@/utils/uploadthing";

const inputClass =
  "w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300";
const FormNewPost = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    imageUrl: "", // Initialize imageUrl as empty string
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post("api/posts", formData);
      console.log(response);

      if (response.status === 200) {
        router.push(`/blogs/${response.data.newPost.id}`);
      }
    } catch {
      console.error(error);
    }
  };
  return (
    <form className="max-w-4md mx-auto p-4" onSubmit={handleSubmit}>
      {formData.imageUrl.length ? (
        <div className="pb-8 rounded-md">
          <Image
            src={formData.imageUrl}
            alt="my image"
            width="1000"
            height={300}
          />
        </div>
      ) : null}
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
      <div>
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            console.log("Files: ", res);

            setFormData({
              ...formData,
              imageUrl: res[0].url,
            });
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>
      <div className="mb-4"></div>
      <Button
        disabled={!data?.user?.email || isLoading}
        type="submit"
        className=" font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full disabled:bg-gray-400"
      >
        {isLoading ? "Posting..." : "Submit"}
      </Button>
    </form>
  );
};

export default FormNewPost;
