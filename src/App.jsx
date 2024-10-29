import { useState, useEffect } from "react"
import Intro from "./components/Intro.jsx"
import Quiz from "./components/Quiz.jsx"

export default function App() {

  const [intro, setIntro] = useState(true)
  const [selectedDifficulty, setSelectedDifficulty] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    let category = ""
    if (selectedCategory === "general"){
      category = "&category=9"
    } else if(selectedCategory === "science") {
      category = "&category=17"
    } else if (selectedCategory === "history") {
      category = "&category=23"
    } else if (selectedCategory === "sports") {
      category = "&category=21"
    } else if (selectedCategory === "geography") {
      category = "&category=22"
    }

    let difficulty = ""
    if (selectedDifficulty === "easy"){
      difficulty = "&difficulty=easy"
    } else if(selectedDifficulty === "medium") {
      difficulty = "&difficulty=medium"
    } else if (selectedDifficulty === "hard") {
      difficulty = "&difficulty=hard"
    }

    const url = `https://opentdb.com/api.php?amount=5${category}${difficulty}&type=multiple`

    const fetchData = async (URL) => {
      try {
        const response = await fetch(URL)
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        const data = await response.json()
        setData(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
      fetchData(url)

  }, [intro])

  if (loading) return <p className="apiStatus">Loading...</p>
  if (error) return <p className="apiStatus">Error: {error}. Please try refreshing the page.</p>

  return (
    <main>
      {intro ? 
        <Intro 
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setIntro={setIntro}/> : 
        <Quiz 
          setSelectedDifficulty={setSelectedDifficulty}
          setSelectedCategory={setSelectedCategory}
          setIntro={setIntro}
          intro={intro}
          data={data}
          />
        }
    </main>
  )
}