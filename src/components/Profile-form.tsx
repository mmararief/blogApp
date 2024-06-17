"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UploadButton } from "@/utils/uploadthing";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().optional(),
  image: z.string().optional(),
});

const Skeleton = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
    <div className="h-8 bg-gray-300 rounded w-1/2 mb-4"></div>
    <div className="h-32 bg-gray-300 rounded w-full mb-4"></div>
    <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
  </div>
);

export function ProfileForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { data, status } = useSession();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.user?.name || "",
      email: email || "",
      image: image || "",
    },
    mode: "onChange",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.put(`api/users`, {
        name: values.name,
        image: image,
      });
      toast({
        description: "Your name has been set.",
      });

      if (response.status === 200) {
        router.refresh();
      }
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  }

  if (status === "loading") {
    return <Skeleton />;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 shadow-xl p-5 mt-4 rounded-xl"
      >
        <div>
          <h3 className="text-xl font-medium">Profile</h3>
          <p className="text-sm text-muted-foreground mb-2">
            This is how others will see you on the site.
          </p>
        </div>
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <div className="flex">
                <Avatar className="w-[100px] h-[100px] ">
                  <AvatarImage
                    className="object-cover"
                    src={image || data?.user?.image || ""}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <UploadButton
                  endpoint="imageUploader"
                  className="ml-6 ut-button:bg-gray-950 ut-button:ut-readying:bg-red-500/50"
                  onClientUploadComplete={(res) => {
                    console.log("Files: ", res);

                    setImage(res[0].url);
                  }}
                  onUploadError={(error) => {
                    alert(`ERROR! ${error.message}`);
                  }}
                />
              </div>

              <FormDescription>Manage your image profile.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder={data?.user?.name || ""} {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Input
                {...field}
                placeholder={data?.user?.email || ""}
                disabled
              />
              <FormDescription>
                You can manage verified email addresses in your{" "}
                <Link href="/examples/forms">email settings</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
}
