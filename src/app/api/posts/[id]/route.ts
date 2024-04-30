import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
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