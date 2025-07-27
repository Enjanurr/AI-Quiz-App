// app/api/delete/route.ts
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;
  const refresh = cookieStore.get("refresh")?.value;

  if (!access || !refresh) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  

  const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}logout/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    },
    body: JSON.stringify({ refresh }),
  });

  const data = await response.json();
  const res = NextResponse.json(data, { status: response.status });
  res.cookies.delete("access");
  res.cookies.delete("refresh");

  return res;
}
