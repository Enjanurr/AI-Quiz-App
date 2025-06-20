"use client"

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
    const [answer,setAnswer] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const postPerPage = 5;
    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentQuizzes = quizzData.slice(firstPostIndex, lastPostIndex);
    const totalPages = Math.ceil(quizzData.length/postPerPage);

  return (
    <section className="bg-slate-900 flex items-center justify-center min-h-screen p-5">
      <div className="w-full max-w-4xl space-y-8">
        <h2 className="text-3xl font-bold text-white">Quiz List</h2>
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
                {quiz.choices.map((choice) => (
                  <label
                    key={choice.id}
                    htmlFor={`quiz-${quiz.id}-choice-${choice.id}`}
                    className="flex items-center gap-3 p-3 bg-slate-600 rounded hover:bg-slate-500 border border-amber-100 text-white cursor-pointer transition-all"
                  >
                    <input
                      type="radio"
                      name={`question-${quiz.id}`}
                      id={`quiz-${quiz.id}-choice-${choice.id}`}
                      value={choice.text}
                      className="form-radio text-amber-400 h-5 w-5"
                    />
                    <span>{choice.text}</span>
                    {choice.is_correct && (
                      <span className="ml-auto text-green-400 font-bold">
                        (✔)
                      </span>
                    )}
                  </label>
                ))}
              </ul>
             
            </li>
          ))}
        </ul>
         <div className="flex justify-center mt-6 gap-2">
               {[...Array(totalPages)].map((_,idx)=>(
                <button key={idx}
                onClick={()=>setCurrentPage(idx+1)}
                className={`px-3 py-1 rounded cursor-pointer ${currentPage === idx + 1 ? "bg-blue-500 text-white" : "bg-slate-800"}`}>
   {idx+1}
                </button>
               ))}
              </div>
      </div>
    </section>
  );
};

export default QuizBox;
