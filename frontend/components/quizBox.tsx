"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';

interface Choice {
  id: string;
  text: string;
  is_correct: boolean;
}

interface Question {
  id: string; // question ID
  quiz_id: string;  // backend must provide this!
  text: string;
  choices: Choice[];
}

interface QuizBoxProps {
  quizzData: Question[];
}

const QuizBox = ({ quizzData }: QuizBoxProps) => {
  const [answers, setAnswers] = useState<{ [questionId: string]: string }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [message, setMessage] = useState("");

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

    const quiz_id = quizzData[0]?.quiz_id || quizzData[0]?.id;

   const payload = {
  quiz_id: quiz_id,
  answers: answers,
};

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}submitAnswers/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        setMessage("❌ Failed to submit answers.");
        return;
      }

      setMessage("✅ Answers Submitted");
      router.push("/result");
    } catch (error) {
      console.error(error);
      setMessage("An error occurred during submission.");
    }
  };

  return (
    <section>
      {message && (
        <div className="sticky top-0 w-full bg-green-400 text-white text-center py-3 z-50 shadow-md">
          {message}
        </div>
      )}

      <div className="bg-slate-900 flex items-center justify-center min-h-screen p-5">
        <div className="w-full max-w-4xl space-y-8 mt-10">
          <h2 className="text-3xl font-bold text-white">Quiz</h2>

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
