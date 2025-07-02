"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Result {
  id: string;
  quiz_number: number;
  score: number;
  perfect:number;
  created_at: string;
}

const AllReviewQuiz = () => {
  const [results, setResults] = useState<Result[]>([]);
  const router = useRouter();
  return (
    <section className="flex justify-center items-start min-h-screen bg-slate-800 py-10 px-4">
      <div className="bg-slate-700 w-full max-w-4xl rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-white mb-6">My Quiz Results</h1>

        <div className="space-y-4">
          {results.map((result) => (
            <div
              key={result.id}
              onClick={() => router.push(`reviewQuiz/${result.id}`)} 
              className=" cursor-pointer flex items-center justify-between bg-slate-600 text-white px-6 py-4 rounded-lg shadow-sm hover:bg-slate-500 transition"
            >
              <p className="text-sm font-medium">Quiz #{result.quiz_number}</p>
              <p className="text-sm">Score: <span className="font-semibold">{result.score} / {result.perfect}</span></p>
              <p className="text-sm text-right">
                {new Date(result.created_at).toLocaleString(undefined, {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllReviewQuiz;
