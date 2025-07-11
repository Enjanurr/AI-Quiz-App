"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FaPen, FaTrash } from "react-icons/fa";

interface Result {
  id: string;
  quiz_number: number;
  score: number;
  perfect_score: number;
  created_at: string;
}

interface Quiz {
  id: number;
  title:string;
  quiz_number: number;
  perfect_score: number;
}

const Allquiz = ({
  result,
  myquizzes,
}: {
  result: Result[];
  myquizzes: Quiz[];
}) => {

  const [rename, setRename] = useState<{id: number ; name:string } | null>(null);
  const [remove, setRemove] = useState<number|null>(null);

  const router = useRouter();

const handleRename = async() =>{
  if(!rename)return;

const response = await fetch("api/rename",{
  method: "PATCH",
  headers:{
    "Content-Type":"application/json"
  },
  body: JSON.stringify({id:rename.id, newname:rename.name})
})

if (response.ok) setRename(null); router.refresh();

}

const handleDelete = async() =>{
  if (!remove) return;

  const response =  await fetch("api/delete",{
    method:"DELETE",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({id:remove})
  })
  if(response.ok) setRemove(null) ; router.refresh();
}
  return (
   <section className="bg-slate-900 py-24 px-4">
  <div className="w-full max-w-4xl mx-auto flex flex-col gap-10 text-white font-main">
    {/* Tabs */}
    <Tabs defaultValue="quiz" className="w-full">
      {/* Centered Tab Controls */}
      <div className="flex justify-center">
        <TabsList className="bg-slate-800 border border-slate-700 rounded-xl p-1 shadow-md">
          <TabsTrigger
            value="quiz"
            className="cursor-pointer px-6 py-2 text-base font-semibold text-white data-[state=active]:bg-blue-500 data-[state=active]:text-black rounded-xl transition-all duration-300"
          >
            📚 My Quizzes
          </TabsTrigger>
          <TabsTrigger
            value="results"
            className="cursor-pointer px-6 py-2 text-base font-semibold text-white data-[state=active]:bg-blue-500 data-[state=active]:text-black rounded-xl transition-all duration-300"
          >
            📝 Results
          </TabsTrigger>
        </TabsList>
      </div>

      {/* My Quizzes Content */}
      <TabsContent value="quiz" className="mt-10">
        <Card className="bg-slate-800 border border-slate-700 shadow-xl rounded-2xl overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">
              My Quizzes
            </CardTitle>
           
          </CardHeader>

          <CardContent className="grid gap-4">
            {myquizzes.length === 0 ? (
              <div className="text-center text-gray-400 text-lg py-8">
                You don't have any quizzes yet. Start creating one to get started!
              </div>
            ) : (
              myquizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  onClick={() => router.push(`/myQuizzes/${quiz.id}`)}
                  className="flex justify-between items-center bg-slate-800 hover:bg-slate-700 transition-all duration-200 border border-slate-600 rounded-2xl px-6 py-5 cursor-pointer shadow-md hover:shadow-lg group"
                >
                  {/* Left Side: Quiz Info */}
                  <div>
                    <h3 className="text-base text-gray-400 group-hover:text-gray-300 mb-1">
                     {quiz.title}
                    </h3>
                    <h2 className="text-2xl font-semibold text-violet-400">
                      Quiz #{quiz.quiz_number}
                    </h2>
                    <p className="text-sm text-slate-300 mt-1">
                      Perfect Score:
                      <span className="ml-1 font-medium text-white">
                        {quiz.perfect_score}
                      </span>
                    </p>
                  </div>

                  {/* Right Side: Actions */}
                  <div
                    className="flex items-center gap-4 text-slate-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* ✏️ Edit Button */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          className="hover:text-yellow-400 p-2 rounded transition cursor-pointer"
                          aria-label="Edit Quiz"
                          onClick={() => setRename({ id: quiz.id, name: "" })}
                        >
                          <FaPen />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-slate-800 border border-slate-600 text-white">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-white">
                            Rename Quiz
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            <input
                              type="text"
                              placeholder="Enter new quiz title"
                              value={rename?.name || ""}
                              onChange={(e) =>
                                setRename((prev) =>
                                  prev ? { ...prev, name: e.target.value } : null
                                )
                              }
                              className="w-full mt-3 px-4 py-2 rounded-md bg-slate-900 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-slate-700 text-white hover:bg-slate-600 border border-slate-500">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            disabled={!rename?.name.trim()}
                            className={`cursor-pointer bg-blue-600 hover:bg-blue-700 text-white ${
                              !rename?.name.trim() ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            onClick={handleRename}
                          >
                            Rename
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    {/* 🗑️ Delete Button */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          className="hover:text-red-500 p-2 rounded transition cursor-pointer"
                          aria-label="Delete Quiz"
                          onClick={() => setRemove(quiz.id)}
                        >
                          <FaTrash />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-slate-800 border border-slate-600 text-white">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-white">
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-slate-300">
                            This action cannot be undone. It will permanently delete this quiz
                            and remove it from your account.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-slate-700 text-white hover:bg-slate-600 border border-slate-500">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700 text-white"
                            onClick={handleDelete}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </TabsContent>

      {/* Results Content */}
      <TabsContent value="results" className="mt-10">
        <Card className="bg-slate-800 border border-slate-700 shadow-xl rounded-2xl overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">
              Quiz Results
            </CardTitle>
          
          </CardHeader>
          <CardContent className="grid gap-4">
  {result.length === 0 ? (
    <div className="text-center text-gray-400 text-lg py-8">
      You don't have any quiz results yet.
    </div>
  ) : (
    result.map((r) => (
      <div
        key={r.id}
        onClick={() => router.push(`/reviewQuiz/${r.id}`)}
        className="bg-slate-700 hover:bg-slate-600 transition-all duration-200 border border-slate-600 rounded-xl px-5 py-4 cursor-pointer shadow-sm hover:shadow-lg"
      >
        <div className="text-lg font-semibold text-white">
          Quiz #{r.quiz_number} — {r.score}/{r.perfect_score}
        </div>
        <div className="text-sm text-gray-400 mt-1">
          {new Date(r.created_at).toLocaleString()}
        </div>
      </div>
    ))
  )}
</CardContent>

        </Card>
      </TabsContent>
    </Tabs>
  </div>
</section>

  );
};
export default Allquiz;
