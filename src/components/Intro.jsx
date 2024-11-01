import brain from "../img/brain.webp"

export default function Intro(prop) {

    function startGame() {
        prop.setIntro(false)
    }

    function chooseCategory(category){
        return prop.setSelectedCategory(category)
    } 

    function chooseDifficulty(difficulty){
        return prop.setSelectedDifficulty(difficulty)
    } 

    function difficultyStyles(difficulty){
        if(difficulty === prop.selectedDifficulty) {
            return {backgroundColor: "#6D67FF", color: "#FFF"} 
        } else {
            return {backgroundColor: "#F5F7FB", color: "#544fd4"} 
        }
    }

    function categoryStyles(category){
        if(category === prop.selectedCategory) {
            return {backgroundColor: "#6D67FF", color: "#FFF"} 
        } else {
            return {backgroundColor: "#F5F7FB", color: "#544fd4"} 
        }
    }

  return (
    <div className="intro-container">
        <img src={brain} alt="brain" width="200px" height="155px" className="brain-img"/>
        <h1>Trivia Night Training</h1>
        <p>Ready to become the ultimate trivia master?<br />
        Sharpen your skills with this quiz so that you 
        can rule the night.<br /><br />
        Select a category and difficulty level or let it be random.</p>
        <div className="category-btns">
            <button 
                style={categoryStyles("general")} 
                onClick={() => chooseCategory("general")}>
                    General
            </button>
            <button 
                style={categoryStyles("science")}  
                onClick={() =>  chooseCategory("science")}>
                    Science
            </button>
            <button 
                style={categoryStyles("history")} 
                onClick={() => chooseCategory("history")}>
                    History
            </button>
            <button 
                style={categoryStyles("sports")} 
                onClick={() => chooseCategory("sports")}>
                    Sports
            </button>
            <button 
                style={categoryStyles("geography")} 
                onClick={() => chooseCategory("geography")}>
                    Geography
            </button>
        </div>
        <div className="difficulty-btns">
            <button 
                style={difficultyStyles("easy")} 
                onClick={() => chooseDifficulty("easy")}>
                    Easy
            </button>
            <button 
                style={difficultyStyles("medium")}  
                onClick={() =>  chooseDifficulty("medium")}>
                    Medium
            </button>
            <button 
                style={difficultyStyles("hard")} 
                onClick={() => chooseDifficulty("hard")}>
                    Hard
            </button>
        </div>
        <button 
            className="start-btn" 
            onClick={startGame}>
                Start
        </button>
    </div>
  )
}