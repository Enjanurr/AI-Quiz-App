'use client'
import { useState } from "react";
import Nav from "@/components/Nav"

export default function Video() {
const [youtubeUrl , setYoutubeUrl] = useState("");
const [loading,setLoading] = useState(false);
const [error,setError] = useState<String | null>(null);
const [success,setSuccess]  = useState<String | null>(null);    

    const handleSubmit = async()=>{
       setLoading(true)
      setError(null);
      setSuccess(null);

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}extract/`,{
        method: "POST",
    body: new URLSearchParams({ url: youtubeUrl }),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      if(!res.ok){
        const errorData = await res.json()
        throw new Error(errorData.error||"Something went wrong")
      }

        const data = await res.json();  
        setSuccess("Audio extracted successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to extract audio");
    } finally {
      setLoading(false);
    }
      
    }
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
          <div className="min-h-[2.5rem] flex items-center justify-center">{error &&(
            <p className="text-red-400 font-semibold">{error}</p>
          )}
        {success && (
          <p className="text-green-400 font-semibold">{success}</p>
        )}</div>
          <button
          onClick={handleSubmit}
              type="submit"
 className={ `w-full ${
              loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            } text-white py-2 rounded-lg transition duration-300 font-main font-bold cursor-pointer`} >{loading ? "Extracting...": "Start"}
            </button>
        </div>
      </div>
    </section>
  )
}
