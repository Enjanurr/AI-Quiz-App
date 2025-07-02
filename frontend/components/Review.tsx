"use client";
import { useState } from "react";

interface Choice {
  id: string;
  text: string;
  is_correct: boolean;
}

interface Question {
  id: string;
  text: string;
  choices: Choice[];
  selected_choice_id: string; // ← user’s selected answer
}

interface ReviewProps {
  ReviewData: Question[];
}

const ReviewAnswers = ({ ReviewData }: ReviewProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const totalPages = Math.ceil(ReviewData.length / postsPerPage);
  const currentQuizzes = ReviewData.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <section>
      <div className="bg-slate-900 flex items-center justify-center min-h-screen p-5 relative">
        <div className="w-full max-w-4xl space-y-8 mt-10">
          <h2 className="text-3xl font-bold text-white">Review Quiz</h2>

          <ul className="space-y-6">
            {currentQuizzes.map((quiz) => (
              <li
                key={quiz.id}
                className="bg-slate-700 border border-amber-50 p-4 rounded"
              >
                <h3 className="text-lg font-semibold text-white mb-4">
                  {quiz.text}
                </h3>
                <ul className="space-y-2">
                  {quiz.choices.map((choice) => {
                    const isSelected =
                      choice.id === quiz.selected_choice_id;
                    const isCorrect = choice.is_correct;

                    const getColorClass = () => {
                      if (isCorrect) return "bg-green-700 border-green-400";
                      if (isSelected && !isCorrect)
                        return "bg-red-700 border-red-400";
                      return "bg-slate-600 border-slate-500";
                    };

                    return (
                      <div
                        key={choice.id}
                        className={`flex items-center gap-3 p-3 rounded border text-white ${getColorClass()}`}
                      >
                        <span>{choice.text}</span>
                        {isSelected && !isCorrect && (
                          <span className="ml-auto text-red-300 text-sm">
                            (Your Answer)
                          </span>
                        )}
                        {isCorrect && (
                          <span className="ml-auto text-green-300 text-sm">
                            (Correct Answer)
                          </span>
                        )}
                      </div>
                    );
                  })}
                </ul>
              </li>
            ))}
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
        </div>
      </div>
    </section>
  );
};

export default ReviewAnswers;
