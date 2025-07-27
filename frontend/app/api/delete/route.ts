import {cookies} from "next/headers"
import { NextRequest, NextResponse } from "next/server"
export async function DELETE(req: NextRequest){
    const body = await req.json();
    const {id} = body;
    const cookieStore = await cookies();
    const access = cookieStore.get("access")?.value;

    if(!access){
        return NextResponse.json({detail:"Unauthorized"}, {status: 401});
    }
    const response =  await fetch(`${process.env.NEXT_PUBLIC_HOST}update/${id}/`,{
        method:"DELETE",
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
        }
        
    })
    const data = await response.json()
    return NextResponse.json(data,{status: response.status});
}