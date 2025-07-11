"use client";
import { useState } from "react";
import Nav from "./Nav";

interface Choice {
  id: number;
  text: string;
  is_correct: boolean;
}

interface Answer {
  question: string;
  selected_choice_id: number;
  choices: Choice[];
}

interface ReviewData {
  id: number;
  score: number;
  created_at: string;
  answers: Answer[];
}

interface ReviewProps {
  ReviewData: ReviewData;
}

const ReviewAnswers = ({ ReviewData }: ReviewProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const totalPages = Math.ceil(ReviewData.answers.length / postsPerPage);
  const currentAnswers = ReviewData.answers.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
<section className="bg-slate-900 min-h-screen">
  {/* Sticky Navbar */}
  <div className="sticky top-0 z-50 bg-slate-900">
    <Nav />
  </div>

  <div className="flex justify-center p-5 relative">
    <div className="w-full max-w-7xl flex gap-6">
      
      {/* Left: Sticky Quiz Info Sidebar */}
      <div className="w-64 mt-10 hidden lg:block">
        <div className="sticky top-24 bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-700 text-white">
          <h4 className="text-xl font-bold mb-4 text-center">Quiz Details</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-semibold">Score:</span>
              <span>{ReviewData.score}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Total Questions:</span>
              <span>{ReviewData.answers.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Date:</span>
              <span>{new Date(ReviewData.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Center: Scrollable Quiz Content */}
      <div className="flex-1 mt-10 overflow-y-auto max-h-[calc(100vh-5rem)] pr-2">
        <h2 className="text-3xl font-bold text-white mb-6">
          Review Quiz
        </h2>

        <ul className="space-y-6">
          {currentAnswers.map((answer, index) => (
            <li
              key={index}
              className="bg-slate-700 border border-amber-50 p-4 rounded"
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                {answer.question}
              </h3>
              <ul className="space-y-2">
                {answer.choices.map((choice) => {
                  const isSelected = choice.id === answer.selected_choice_id;
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
      </div>

      {/* Right: Sticky Pagination Sidebar */}
      <div className="w-64 mt-10 hidden lg:block">
        <div className="sticky top-24 bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-700">
          <h4 className="text-white font-bold mb-4 text-center">Pages</h4>
          <div className="flex flex-wrap gap-2 justify-center">
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
        </div>
      </div>

    </div>
  </div>
</section>

  );
};

export default ReviewAnswers;
