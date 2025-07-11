"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Choice {
  id: string;
  text: string;
  is_correct: boolean;
}

interface Question {
  id: string;
  quiz_id?: string;
  text: string;
  choices: Choice[];
}

interface QuizBoxProps {
  quizzData: Question[];   // ✅ This is an array
  quiz_no: string;
}

const QuizBox = ({ quizzData, quiz_no }: QuizBoxProps) => {
  const [answers, setAnswers] = useState<{ [questionId: string]: string }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [message, setMessage] = useState("");
  const [scoreResult, setScoreResult] = useState<null | { score: number; total: number }>(null);


  const postPerPage = 5;
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentQuizzes = quizzData.slice(firstPostIndex, lastPostIndex);
  const totalPages = Math.ceil(quizzData.length / postPerPage);

  const router = useRouter();

  const handleSubmit = async () => {
    if (Object.keys(answers).length < quizzData.length) {
      setMessage("❌ Please answer all the questions before submitting.");
      return;
    }

    try {
     const response = await fetch("/api/submit", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ answers,quiz_no }),
});

    
      if (!response.ok) {
        router.push("/auth/login/")
        return;
      }
      const data = await response.json()
      setScoreResult({ score: data.score, total: data.total });
      setMessage("✅ Answers Submitted");
    } catch (error) {
      console.error(error);
      setMessage("An error occurred during submission.");
    }
  };
   if (scoreResult) {
 return (
  <section className="bg-slate-900 text-white min-h-screen relative p-6">
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Quiz Result</h1>
      <p className="text-2xl">
        Your Score: <span className="text-amber-400">{scoreResult.score}</span> / {scoreResult.total}
      </p>
      <p className="text-lg mt-2 text-amber-300">
        You can view the full result later in the results page.
      </p>
    </div>
  </section>
);

}

  return (
    <section>
      {message && (
        <div className="sticky top-0 w-full bg-green-400 text-white text-center py-3 z-50 shadow-md">
          {message}
        </div>
      )}

      <div className="bg-slate-900 flex items-center justify-center min-h-screen p-5">
        <div className="w-full max-w-4xl space-y-8 mt-10">
          <h2 className="text-3xl font-bold text-white">Quiz #{quiz_no}</h2>

          <ul className="space-y-6">
            {currentQuizzes.map((question) => {
              const userSelected = answers[question.id];

              return (
                <li
                  key={question.id}
                  className="bg-slate-700 border p-4 rounded"
                >
                  <h3 className="text-lg font-semibold text-white mb-4">
                    {question.text}
                  </h3>
                  <ul className="space-y-2">
                    {question.choices.map((choice) => (
                      <label
                        key={choice.id}
                        htmlFor={`quiz-${question.id}-choice-${choice.id}`}
                        className="flex items-center gap-3 p-3 rounded border text-white cursor-pointer bg-slate-600"
                      >
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          id={`quiz-${question.id}-choice-${choice.id}`}
                          value={choice.id}
                          checked={userSelected === choice.id}
                          onChange={() =>
                            setAnswers((prev) => ({
                              ...prev,
                              [question.id]: choice.id,
                            }))
                          }
                          className="form-radio text-amber-400 h-5 w-5"
                        />
                        <span>{choice.text}</span>
                      </label>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>

          {/* Pagination */}
          <div className="flex justify-center mt-6 gap-2">
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-3 py-1 rounded cursor-pointer ${
                  currentPage === idx + 1
                    ? "bg-blue-500 text-white"
                    : "bg-slate-800 text-white"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          {/* Submit Button */}
          {currentPage === totalPages && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleSubmit}
                className="border border-amber-100 rounded p-5 cursor-pointer hover:bg-slate-500 transition text-white"
              >
                Submit Answers ⇒
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuizBox;
