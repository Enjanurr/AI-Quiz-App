import MyQuiz from "@/components/myquiz";
export default async function MyQuizzes({params}:{params : {quiz_id :string}}){
    let data = null;
    try {
        const response =  await fetch(`${process.env.NEXT_PUBLIC_HOST}reviewQuiz/${params.quiz_id}`,{
            cache : "no-store",
        });
        if(!response.ok) throw new Error("Failed to fetch quiz");

        data = await response.json();

    } catch (error) {
        console.error("Error loading quizzes",error);
        return <p className="text-red-500">Failed to load quiz data</p>
    }
    return(
        <section>
            <MyQuiz myquizdata={data}/>
        </section>
    )
}