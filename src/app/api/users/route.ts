import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: Request){
    const user = await getCurrentUser();
    try {
        if(!user?.email){
            return NextResponse.json({ message: 'Not Authenticated!'}, {status: 401})
        }

        const {name, image} = await req.json();
        
        const putUser = await prisma.user.update({
            where : {
                email : user.email
            },
            data : {
                name : name,
                image: image
            }
        })
        console.log(putUser)

        return NextResponse.json({
            putUser
        }, { status: 200})

        console.log(putUser)

    } catch {
        return NextResponse.json({ message: 'Something went wrong!'}, { status: 500})
    }
}