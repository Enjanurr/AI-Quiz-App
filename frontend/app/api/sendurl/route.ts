// app/api/sendurl/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { youtubeUrl } = body;

  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;

  if (!access) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}submiturl/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    },
    body: JSON.stringify({ url: youtubeUrl }),
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
