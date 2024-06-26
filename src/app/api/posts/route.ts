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

export async function GET(req: Request) {

    const post = await prisma.post.findMany({
        include: { author: true },
    });
  
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
  
    return NextResponse.json(post, { status: 200 });
  }
  