import QuizBox from "@/components/quizBox";


export default async function QuizPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}test/`, {
    cache: "no-store",
  });
  const quizzes  = await res.json();

  return <QuizBox quizzData={quizzes} />;
}
