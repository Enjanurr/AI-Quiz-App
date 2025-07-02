import Nav from "@/components/Nav";
import Allquiz from "@/components/allreviewquiz";

export default async function AllQuizes() {
  // fetch for the myquizzes
  const myquizResponse = await fetch(`${process.env.NEXT_PUBLIC_HOST}Allquiznumber/`, {
    cache: "no-store",
  });
  const myquizzes = await myquizResponse.json();

  // fetch for the results
  const resultResponse = await fetch(`${process.env.NEXT_PUBLIC_HOST}allResult/`, {
    cache: "no-store",
  });
  const results = await resultResponse.json();

  return (
    <section>
      <div className="h-screen bg-slate-900">
        <Nav />
        <Allquiz result={results} myquizzes={myquizzes} />
      </div>
    </section>
  );
}
