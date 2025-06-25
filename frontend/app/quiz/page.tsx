import QuizBox from "@/components/quizBox";
import Nav from "@/components/Nav";


export default async function QuizPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}test/`, {
    cache: "no-store",
  });
  const quizzes  = await res.json();

  return (
    <section>
      <Nav />
      <QuizBox quizzData={quizzes} />
    </section>
  )
}
