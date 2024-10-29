export default function Answers(prop) {

    function answerSelected(answer, questionId){
        if (prop.endQuiz === false) {
            return prop.setSelectedButton(lastState => {
                lastState[questionId] = answer
                return [...lastState]
            })
        }
    } 

    function styles() { 
        if (prop.endQuiz){
            if (prop.correctAnswer === prop.answer){
                return {backgroundColor: "#94D7A2", color: "#414054", border: "solid 1.5px #94D7A2"}
            } else if (prop.correctAnswer !== prop.answer && prop.selectedButton[prop.questionId] === prop.answer) {
                return {backgroundColor: "#F8BCBC", color: "#6D6D78", border: "solid 1.5px #F8BCBC"}
            } else {
                return {border: "solid 1.5px #b0aee9", color: "#b0aee9"}
            }
        } else {
            return {backgroundColor: prop.selectedButton[prop.questionId] === prop.answer ? "#6D67FF" : "#F5F7FB",
            color: prop.selectedButton[prop.questionId] === prop.answer ? "#F5F7FB" : "#6D67FF"}
        }
    }

    return (
        <button
            onClick={() => answerSelected(prop.answer, prop.questionId)} 
            className="answer-btn"
            style={styles()}>
                {prop.answer}
        </button>
    )
}