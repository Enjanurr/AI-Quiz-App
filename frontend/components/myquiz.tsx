
interface Choices{
    id:string;
    text:string;
    is_correct:boolean;
}
interface Question{
    id:string;
    text:string;
    choices:Choices[];
}
interface QuestionProps{
    myquizdata:Question[];
}

const AllMyQuiz = ({myquizdata}: QuestionProps) => {
    return(
        <section>

        </section>
    )
}
export default AllMyQuiz;