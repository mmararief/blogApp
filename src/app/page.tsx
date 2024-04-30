import Banner from "@/components/Banner";
import Blogs from "@/components/blogs";
import FormNewPost from "@/components/form-new-post";
import { getCurrentUser } from "@/lib/session";
import Image from "next/image";

export default async function Home() {
  return (
    <main className="max-w-6xl mx-auto my-5">
      {/* <FormNewPost /> */}
      <div className="pb-8">
        <Banner />
      </div>

      <Blogs />
    </main>
  );
}
