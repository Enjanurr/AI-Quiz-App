import { cookies } from "next/headers";
import Nav from "@/components/Nav";
import AllMyQuiz from "@/components/AllQuiz";
import { redirect } from "next/navigation";

export default async function AllQuizes() {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;

  // 🚫 Redirect to login if there's no access token
  if (!access) {
    redirect("/auth/login");
  }

  const headers = {
    Authorization: `Bearer ${access}`,
    "Content-Type": "application/json",
  };

  const [myquizResponse, resultResponse] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_HOST}Allquiznumber/`, {
      headers,
      cache: "no-store",
    }),
    fetch(`${process.env.NEXT_PUBLIC_HOST}allResult/`, {
      headers,
      cache: "no-store",
    }),
  ]);

  // 🚫 If either response is 401 or not ok, redirect to login
  if (!myquizResponse.ok || !resultResponse.ok) {
    redirect("/auth/login");
  }

  const myquizzes = await myquizResponse.json();
  const results = await resultResponse.json();

  return (
    <section className="min-h-screen bg-slate-900">
      <Nav />
      <AllMyQuiz result={results} myquizzes={myquizzes} />
    </section>
  );
}
