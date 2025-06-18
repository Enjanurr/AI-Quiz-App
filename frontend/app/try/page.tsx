'use client'
import { useEffect,useState } from "react"

interface QuizItem {
  question: string;
  choices: string[];
  answer: string;
}

export default function Test(){
const [data, setData] = useState<QuizItem[]>([]);
const [notes, setNotes] = useState('')

useEffect(()=>{
    const testing = async()=>{
        try {
const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}test/`);
        const json = await response.json(); // 👈 await JSON parsing
        setData(json.quiz);        } catch (error) {
            console.log(error)
        }
    };
    testing()
},[])

const handleSubmit = async()=>{
  try {
     const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}test/`,{
    method:"POST",
    headers: {
        "Content-type":"application/json"
    },
    body: JSON.stringify({ notes })
   });

   const json = await response.json();
    if (json.quiz) {
        setData(json.quiz);
      } else {
        console.log("Unexpected format:", json);
      }
  } catch (error) {
    console.log(error);
  }
}
    return(
        <section className="bg-green-500">
            <div>   
                <h1>just a test</h1>
                  <pre>{JSON.stringify(data, null, 2)}</pre> {/* 👈 pretty print the quiz */}
            </div>
            <textarea rows={6} value={notes}   
            className="w-full p-2 border"
            onChange={(e) => setNotes(e.target.value)} />
              <button onClick={handleSubmit} className="mt-2 px-4 py-1 bg-blue-500 text-white rounded cursor-pointer">
          Generate Quiz
        </button>
        <p></p>
         </section>
    )
}