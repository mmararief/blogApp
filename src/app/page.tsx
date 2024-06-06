import Banner from "@/components/Banner";
import Blogs from "@/components/blogs";

export default async function Home() {
  return (
    <main className="max-w-6xl mx-auto my-5">
      <Blogs />
    </main>
  );
}
