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
  quizzData: Question[];
  quiz_no: string;
  title: string;
}

const QuizBox = ({ quizzData, quiz_no, title }: QuizBoxProps) => {
  const [answers, setAnswers] = useState<{ [questionId: string]: string }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [scoreResult, setScoreResult] = useState<null | { score: number; total: number }>(null);

  const postsPerPage = 5;
  const totalPages = Math.ceil(quizzData.length / postsPerPage);
  const currentQuizzes = quizzData.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

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
        body: JSON.stringify({ answers, quiz_no }),
      });

      if (!response.ok) {
        router.push("/auth/login/");
        return;
      }

      const data = await response.json();
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
    <section className="bg-slate-900 min-h-screen text-white">
     {message && (
  <div
    className={`sticky top-0 w-full text-white text-center py-3 z-50 shadow-md ${
      messageType === "success"
        ? "bg-green-500"
        : messageType === "warning"
        ? "bg-yellow-500"
        : "bg-red-500"
    }`}
  >
    {message}
  </div>
)}

      <div className="flex flex-col lg:flex-row justify-center p-5 relative gap-6 max-w-6xl mx-auto">
        {/* Left: Quiz Content */}
        <div className="flex-1 mt-10">
          <h2 className="text-3xl font-bold mb-6">{title}</h2>

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

          {/* Mobile Pagination & Submit */}
          <div className="block lg:hidden mt-10">
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`px-4 py-2 rounded text-sm ${
                    currentPage === idx + 1
                      ? "bg-blue-500 text-white"
                      : "bg-slate-600 text-white hover:bg-slate-500"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
            {currentPage === totalPages && (
              <div className="text-center mt-4">
                <button
                  onClick={handleSubmit}
                  className="w-full border border-amber-100 rounded p-3 cursor-pointer hover:bg-slate-500 transition text-white"
                >
                  Submit Answers ⇒
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Pagination Sidebar (Desktop only) */}
        <div className="w-64 mt-10 hidden lg:block">
          <div className="sticky top-24 bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-700">
            <h4 className="text-white font-bold mb-4 text-center">Pages</h4>
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`px-4 py-2 rounded text-sm ${
                    currentPage === idx + 1
                      ? "bg-blue-500 text-white"
                      : "bg-slate-600 text-white hover:bg-slate-500"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
            {currentPage === totalPages && (
              <div className="text-center">
                <button
                  onClick={handleSubmit}
                  className="w-full border border-amber-100 rounded p-3 cursor-pointer hover:bg-slate-500 transition text-white"
                >
                  Submit Answers ⇒
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizBox;
