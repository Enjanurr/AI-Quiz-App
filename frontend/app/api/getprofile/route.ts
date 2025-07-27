import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const cookieStore =  await cookies();
  const access = cookieStore.get("access")?.value;

  if (!access) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}profile/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}
