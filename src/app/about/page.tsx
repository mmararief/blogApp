import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const About = () => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 pb-6 pt-16">
      <h1 className="text-3xl font-bold border-b border-grey-300">
        Tentang Website Saints
      </h1>

      <div className="grid gap-x-8 gap-y-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 hover:gap-6">
        <Card>
          <a href="https://nextjs.org/">
            <CardHeader>
              <CardTitle>NextJS</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                NextJS adalah framework JavaScript yang dibuat khusus untuk
                React.js. Next.js framework adalah semacam penyempurna React JS
                karena berhasil memperbaiki kekurangan React.js, terutama dalam
                hal rendering. Next.js adalah framework yang siap untuk
                membangun sebuah project dengan mudah (production ready).
              </CardDescription>
            </CardContent>
          </a>
        </Card>
        <Card>
          <a href="https://www.prisma.io/">
            <CardHeader>
              <CardTitle>Prisma</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Prisma is a next-generation ORM untuk Node.js & TypeScript. Ini
                adalah cara termudah untuk menghubungkan aplikasi React ke
                database MySQL, PostgreSQL, SQL Server, CockroachDB, dan
                MongoDB.
              </CardDescription>
            </CardContent>
          </a>
        </Card>
        <Card>
          <a href="https://next-auth.js.org/">
            <CardHeader>
              <CardTitle>NextAuth</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                NextAuth.js adalah pustaka autentikasi yang dibangun di atas
                framework Next.js. Ini menyediakan solusi lengkap untuk
                autentikasi pengguna dengan dukungan untuk berbagai penyedia
                seperti GitHub, Google, Facebook, dan banyak lagi.
              </CardDescription>
            </CardContent>
          </a>
        </Card>
        <Card>
          <a href="https://tailwindui.com/">
            <CardHeader>
              <CardTitle>Tailwind</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Tailwind CSS merupakan framework CSS yang berbasis utility untuk
                membuat UI atau tampilan dari aplikasi web.
              </CardDescription>
            </CardContent>
          </a>
        </Card>
        <Card>
          <a href="https://ui.shadcn.com/">
            <CardHeader>
              <CardTitle>Shadcn UI</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Shadcn UI adalah koleksi komponen yang didesain untuk memudahkan
                pengembangan UI.
              </CardDescription>
            </CardContent>
          </a>
        </Card>
      </div>
    </div>
  );
};

export default About;
