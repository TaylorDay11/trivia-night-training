import { nanoid } from "nanoid"
import Answers from "./Answers.jsx"

export default function Question(prop) {

    const quizAnswers = prop.answers.map(answer => {
        return <Answers 
                    selectedButton={prop.selectedButton}
                    setSelectedButton={prop.setSelectedButton}
                    endQuiz={prop.endQuiz}
                    correctAnswer={prop.correctAnswer}
                    questionId={prop.id}
                    data={prop.data}
                    answer={answer} 
                    key={nanoid()} />
    })

    return (
        <div className="question-container">
            <h2>{prop.question}</h2>
            {quizAnswers}
            <hr />
        </div>
    )
}