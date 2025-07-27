// app/api/sendpdf/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const cookieStore =await  cookies();
  const access = cookieStore.get("access")?.value;

  if (!access) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }
const formData = await req.formData();
const proxyFormData = new FormData();

for (const [key,value] of formData.entries()){
  proxyFormData.append(key,value)
}
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}submitpdf/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access}`,
      },
      body: proxyFormData,
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    console.error("Proxy upload failed:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}