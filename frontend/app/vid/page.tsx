"use client";
import { useState } from "react";
import Nav from "@/components/Nav";
import { useRouter } from "next/navigation";
interface QuizItem {
  question: string;
  choices: string[];
  answer: string;
}
export default async function Video() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<String | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [data, setData] = useState<QuizItem[]>([]);

  const router = useRouter();
  const handleSubmit = async () => {
    setLoading(true);
    setIsError(false);
    setMessage(null);

    try {
      const token = localStorage.getItem("access"); // make sure you're storing token after login

      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}extract/`, {
        method: "POST",
        headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,  // Headers first before the body or else it will get an error
  }, 
 body: JSON.stringify({ url: youtubeUrl }), 
      });

      const result = await res.json(); // only call once

      if (!res.ok) {
        const message = result.detail || result.error || "Something went wrong";

        setIsError(true);
        setMessage(
          message === "Given token not valid for any token type"
            ? "Your session has expired or you're not logged in. Please log in."
            : message
        );
        router.push("auth/login")
        return;
      }

      setIsError(false);
      setData(result.quiz);
      setMessage("Audio extracted successfully!");
      router.push("quiz/")
    } catch (err: any) {
      setIsError(true);
      setMessage(err.message || "Failed to extract audio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-slate-900 min-h-screen">
      <Nav />

      <div className="flex items-center justify-center h-[calc(100vh-3rem)] px-4">
        <div className="text-center space-y-6   ">
          <h1 className="font-main text-6xl font-bold text-blue-400">
            Paste your YouTube video here
          </h1>

          <p className="text-slate-300 text-2xl  font-main font-bold ">
            Wait a few moments while we prepare your quiz.
          </p>

          <div className="mt-12">
            <input
              type="text"
              placeholder="Paste it here..."
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
          {/* for the response messages */}
          <div className="min-h-[2.5rem] flex items-center justify-center">
            {message && (
              <p
                className={`font-semibold ${
                  isError ? "text-red-400" : "text-green-400"
                }`}
              >
                {message}
              </p>
            )}
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className={`w-full ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white py-2 rounded-lg transition duration-300 font-main font-bold cursor-pointer`}
          >
            {loading ? "Extracting..." : "Start"}
          </button>
        </div>
      </div>
    </section>
  );
}
