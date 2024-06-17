import prisma from "@/lib/db";
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request : NextRequest,{ params }: { params: { id: string } }) {
    const id =  params.id
    if (!id) {
      return NextResponse.error();
    }
  
   const deletePost = await prisma.post.delete({
      where: {
        id: id,
      },
    }) 
  
    return NextResponse.json({success:1,"message":"Delete success"});
  }

  
  export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
  
    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }
  
    const post = await prisma.post.findFirst({
      where: { id },
      include: { author: true },
    });
  
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
  
    return NextResponse.json(post, { status: 200 });
  }
  



  