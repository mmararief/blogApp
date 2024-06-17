import Banner from "@/components/Banner";
import Blogs from "@/components/blogs";

export default async function Home() {
  return (
    <main className="max-w-full md:max-w-3xl lg:max-w-4xl xl:max-w-6xl mx-auto my-5 px-4 sm:px-6 lg:px-8">
      <Blogs />
    </main>
  );
}
