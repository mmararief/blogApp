import type { Metadata } from "next";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { Toaster } from "@/components/ui/toaster";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import Header from "@/components/header";
import Provider from "@/components/provider";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Blog App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <Provider>
          <Header />
          <main>{children}</main>
          <Toaster />
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
