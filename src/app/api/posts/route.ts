import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request){
    const user = await getCurrentUser();
    try {
        if(!user?.email){
            return NextResponse.json({ message: 'Not Authenticated!'}, {status: 401})
        }

        const {title, content, imageUrl} = await req.json();
        
        const newPost = await prisma.post.create({
            data: {
                title, content, imageUrl, authorEmail : user.email
            }
        })

        return NextResponse.json({
            newPost
        }, { status: 200})

    } catch {
        return NextResponse.json({ message: 'Something went wrong!'}, { status: 500})
    }
}

// Action to delete
export const DELETE = async (req: NextRequest) => {
    const url = new URL(req.url).searchParams;
    const id = String(url.get("id")) ;
    console.log(id)
  
    const post = await prisma.post.delete({
      where: {
        id: id,
      },
    });
  
    if (!post) {
      return NextResponse.json(
        {
          message: "Error",
        },
        {
          status: 500,
        }
      );
    }
  
    return NextResponse.json({});
  };