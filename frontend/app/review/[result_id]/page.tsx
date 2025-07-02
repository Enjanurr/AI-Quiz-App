"use client";
import ReviewAnswers from "@/components/Review";

export default async function Review({ params }: { params: { result_id: string } }) {
  let data = null;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}reviewQuiz/${params.result_id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch quiz");
    }

    data = await response.json();

  } catch (error) {
    console.error("Error loading review:", error);
    // Optionally: return an error UI here
    return <p className="text-red-500">Failed to load review data.</p>;
  }

  return (
    <section>
      <ReviewAnswers ReviewData={data} />
    </section>
  );
}
