import Nav from "@/components/Nav";
import QuizBox from "@/components/quizBox";
export default async function QuizPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}quizNumber/`);
  const data = await res.json();

  //const quizzes = data.questions; // ❓ Is this the correct path?
  // OR
  const quizzes = data; // If data is already a list of questions

  return (
    <section>
      <Nav />
      <QuizBox quizzData={quizzes} />
    </section>
  );
}
