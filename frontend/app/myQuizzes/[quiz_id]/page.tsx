// app/quiz/[quiz_id]/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import QuizBox from "@/components/QuizBox";
import Nav from "@/components/Nav";

export default async function MyQuizzes({ params }: { params: { quiz_id: string } }) {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;

  if (!access) {
    redirect("/auth/login"); // ✅ Server-side redirect
  }

  const headers = {
    Authorization: `Bearer ${access}`,
    "Content-Type": "application/json",
  };

  let data = null;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}quizNumber/${params.quiz_id}/`, {
      headers,
      cache: "no-store",
    });

    if (!response.ok) {
      redirect("/auth/login");
  
    }

    data = await response.json();
  } catch (error) {
    console.error("Error loading quizzes", error);
    return <p className="text-red-500">Failed to load quiz data</p>;
  }

  return (
    <section>
      <Nav />
      <QuizBox quizzData={data.questions} quiz_no={params.quiz_id} />
    </section>
  );
}
