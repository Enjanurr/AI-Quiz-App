"use client";

import { useState } from "react";

interface Choice {
  id: string;
  text: string;
  is_correct: boolean;
}

interface Quiz {
  id: string;
  text: string;
  choices: Choice[];
}

interface QuizBoxProps {
  quizzData: Quiz[];
}

const QuizBox = ({ quizzData }: QuizBoxProps) => {
  const [answers, setAnswers] = useState<{ [quizId: string]: string }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<any[]>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const postPerPage = 5;
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentQuizzes = quizzData.slice(firstPostIndex, lastPostIndex);
  const totalPages = Math.ceil(quizzData.length / postPerPage);

  const handleSubmit = async () => {
    try {
      if (Object.keys(answers).length < quizzData.length) {
        setMessage("❌ Please answer all the questions before submitting.");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}submitAnswers/`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(answers),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage("Failed to Submit answers");
      } else {
        setScore(data.score);
        setResults(data.results);
        setHasSubmitted(true);
        setMessage("✅ Answers Submitted");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred");
    }
  };

  return (
    <section>
      {message && (
        <div className="sticky top-0 left-0 right-0 w-full bg-green-400 text-white text-center py-3 z-50 shadow-md">
          {message}
        </div>
      )}

      <div className="bg-slate-900 flex items-center justify-center min-h-screen p-5 relative">
        <div className="w-full max-w-4xl space-y-8 mt-10">
          <h2 className="text-3xl font-bold text-white">Quiz List</h2>

          <ul className="space-y-6">
            {currentQuizzes.map((quiz) => {
              const userSelected = answers[quiz.id];
              const resultData = results.find(
                (res) => res.question_id === quiz.id
              );

              return (
                <li
                  key={quiz.id}
                  className="bg-slate-700 border border-amber-50 p-4 rounded"
                >
                  <h3 className="text-lg font-semibold text-white mb-4">
                    {quiz.text}
                  </h3>
                  <ul className="space-y-2">
                    {quiz.choices.map((choice) => {
                      const isUserAnswer = userSelected === choice.id;
                      const isCorrect = choice.is_correct;
                      const isSubmittedCorrect = hasSubmitted && isCorrect;
                      const isSubmittedWrong =
                        hasSubmitted && isUserAnswer && !isCorrect;

                      const getColorClass = () => {
                        if (!hasSubmitted) return "bg-slate-600";
                        if (isSubmittedCorrect)
                          return "bg-green-700 border-green-400";
                        if (isSubmittedWrong)
                          return "bg-red-700 border-red-400";
                        return "bg-slate-600";
                      };

                      return (
                        <label
                          key={choice.id}
                          htmlFor={`quiz-${quiz.id}-choice-${choice.id}`}
                          className={`flex items-center gap-3 p-3 rounded border text-white cursor-pointer transition-all ${getColorClass()}`}
                        >
                          <input
                            type="radio"
                            name={`question-${quiz.id}`}
                            id={`quiz-${quiz.id}-choice-${choice.id}`}
                            value={choice.id}
                            checked={isUserAnswer}
                            disabled={hasSubmitted}
                            onChange={() =>
                              setAnswers((prev) => ({
                                ...prev,
                                [quiz.id]: choice.id,
                              }))
                            }
                            className="form-radio text-amber-400 h-5 w-5"
                          />
                          <span>{choice.text}</span>

                          {hasSubmitted && isUserAnswer && !isCorrect && (
                            <span className="ml-auto text-red-200 text-sm">
                              (Your Answer)
                            </span>
                          )}
                          {hasSubmitted && isCorrect && (
                            <span className="ml-auto text-green-300 text-sm">
                              (Correct Answer)
                            </span>
                          )}
                        </label>
                      );
                    })}
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
          {!hasSubmitted && currentPage === totalPages && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleSubmit}
                className="border border-amber-100 rounded p-5 cursor-pointer hover:bg-slate-500 transition text-white"
              >
                Submit Answers ⇒
              </button>
            </div>
          )}

          {/* Score Display */}
          {hasSubmitted && (
            <div className="bg-slate-800 p-4 mt-10 rounded text-white">
              <h3 className="text-xl font-bold mb-3">
                🏆 Your Score: {score} / {quizzData.length}
              </h3>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuizBox;
