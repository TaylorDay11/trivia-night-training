import { useState, useEffect } from "react"
import {decode} from 'html-entities'
import { nanoid } from "nanoid"
import { useReward } from "react-rewards"
import Question from "./Question.jsx"

export default function Quiz(prop) {

    const { reward, isAnimating } = useReward('rewardId', 'confetti')

    const [selectedButton, setSelectedButton] = useState([null, null, null, null, null])
    const [endQuiz, setEndQuiz] = useState(false)
    const [questions, setQuestions] = useState([])
    const [correctAnswers, setCorrectAnswers] = useState([])
    const [answers, setAnswers] = useState([[],[],[],[],[]])

    useEffect(() => {
        setQuestions(questionsArray())
        setCorrectAnswers(correctAnswersArray())
        setAnswers(answersArray())
    }, [prop.data.results])

    function questionsArray() {
        const newArray = []
        for(let i = 0; i < 5; i++){
          newArray.push(decode(prop.data.results[i].question, {level: 'html5'}))
        }
        return [...newArray]
      }
    
      function correctAnswersArray() {
        const newArray = []
        for(let i = 0; i < 5; i++){
          newArray.push(decode(prop.data.results[i].correct_answer, {level: 'html5'}))
        }
        return [...newArray]
      }
    
      function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]]; 
        }
        return array;
      }
    
      function answersArray(){
        const newArray = [[],[],[],[],[]]
        for(let i = 0; i < 5; i++){
            const tempArray = []
            tempArray.push(decode(prop.data.results[i].incorrect_answers[0], {level: 'html5'}))
            tempArray.push(decode(prop.data.results[i].incorrect_answers[1], {level: 'html5'}))
            tempArray.push(decode(prop.data.results[i].incorrect_answers[2], {level: 'html5'}))
            tempArray.push(decode(prop.data.results[i].correct_answer, {level: 'html5'}))
            shuffleArray(tempArray)
            newArray[i] = [...tempArray]
        }
        return [...newArray]
      }

    let questionId = 0
    const quizQuestions = questions.map(question => {
        questionId++
        return <Question
                    selectedButton={selectedButton}
                    setSelectedButton={setSelectedButton}
                    answers={answers[questionId - 1]}
                    question={question}
                    correctAnswer={correctAnswers[questionId - 1]}
                    data={prop.data}
                    endQuiz={endQuiz}
                    key={nanoid()} 
                    id={questionId - 1}
                />
    })

    const [correct, setCorrect] = useState(0)
    function checkAnswers() {
        let count = 0
        for (let i = 0; i < 5; i++) {
            if(selectedButton[i]) {
                correctAnswers[i] === selectedButton[i] && count++
            }
        }
        setCorrect(count)
        setEndQuiz(true)
        if (count === 5) {
            reward()
        }
    }

    function restartQuiz() {
        setEndQuiz(false)
        setSelectedButton([null, null, null, null, null])
        setCorrect(0)
        prop.setIntro(true)
        prop.setSelectedDifficulty(null)
        prop.setSelectedCategory(null)
    }

    const quizButton = endQuiz ?
        <p className="correct-answers">Correct Answers: {correct}/5 
            <button className="restart-quiz-btn" onClick={restartQuiz}>Restart Quiz</button>
        </p> :
        <button onClick={checkAnswers} disabled={isAnimating} className="check-answers-btn">Check Answers</button>
        
    return (
        <div className="quiz-container">
            {quizQuestions}
            {quizButton}
            <div id="rewardId"/>
        </div>
    )
}