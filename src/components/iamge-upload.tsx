"use client";
import { UploadButton, UploadDropzone } from "@/utils/uploadthing";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

const ImageUpload = () => {
  const { data } = useSession();
  const [imageUrl, setImageUrl] = useState<string>(data?.user?.image || "");
  return (
    <div>
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          setImageUrl(res[0].url);
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      {imageUrl.length ? (
        <div>
          <Image src={imageUrl} alt="my image" width={500} height={300} />
        </div>
      ) : null}
    </div>
  );
};

export default ImageUpload;
