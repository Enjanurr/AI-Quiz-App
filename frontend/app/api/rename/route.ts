import {cookies} from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(req: NextRequest){
    const body = await req.json();
    const {id,newname} = body;
    const cookieStore = await cookies();
    const access = cookieStore.get("access")?.value;

    if(!access){
        return NextResponse.json({detail:"Unauthorized"}, {status: 401});
    }
    const response =  await fetch(`${process.env.NEXT_PUBLIC_HOST}update/${id}/`,{
        method:"PATCH",
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify({ newname })
    })
    const data = await response.json()
    return NextResponse.json(data,{status: response.status});
}