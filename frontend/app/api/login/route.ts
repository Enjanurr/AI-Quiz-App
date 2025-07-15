// app/api/login/route.ts
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}token/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    return new Response(JSON.stringify({ detail: "Login failed" }), { status: 401 });
  }

  // ✅ Synchronous — DO NOT await
  const cookieStore = await cookies();

  cookieStore.set("access", data.access, {
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
  });
   cookieStore.set("refresh", data.refresh,{
      httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
   })

  return new Response(JSON.stringify({ message: "Login successful" }), { status: 200 });
}
