import React, {Component} from "react";
import Question from "./components/Question";
import background from "./images/demonSlayer.jpg";

//anime
//character
//quote

interface AppState {
  questions: Quote[]
  allAnime: string[]
  isOver: boolean
  lastScore: number
}

interface Quote {
  anime: string,
  character: string,
  quote: string
}


class App extends Component<{}, AppState> {
  constructor(props: any) {
    super(props)
    let q: Quote = {anime: "A", character:"B", quote:"C"};
    let arr: Quote[] = [q]

    this.state = {
      questions: arr,
      allAnime: [],
      isOver: true,
      lastScore: -1
    }
  }


  getAllAnime = async () => {
    try {
      let response = await fetch('https://animechan.vercel.app/api/available/anime')
      if(!response.ok) {
        alert("Bad response from API from trying to fetch anime")
      }
      let anime: string[] = await response.json() as string[]

      this.setState({
        allAnime: anime
      })
    } catch(e) {
      console.log(e)
      alert("Failed to fetch anime from API")
    }
  }

  componentDidMount() {
    this.getAllAnime()
  }

  startQuiz = async () => {
    try {
      let response = await fetch('https://animechan.vercel.app/api/quotes')
      if(!response.ok) {
        alert("Bad response from API from trying to fetch questions")
        return
      }
      let quotes: Quote[] = await response.json() as Quote[]

      this.setState({
        questions: quotes,
        isOver: false
      })
    } catch(e) {
      console.log(e)
      alert("Failed to fetch questions from API")
    }
  }

  setGameOver = (score: number) => {
    this.setState({
      isOver: true,
      lastScore: score
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.lastScore !== -1 && this.state.isOver ? (
          <p>Final Score: {this.state.lastScore}</p>
        ) : (
          null
        )}
        {this.state.isOver ? (
          <button onClick={this.startQuiz}>Start</button>
        ) : (
          <Question quotes={this.state.questions} allAnime={this.state.allAnime} onGameOver={this.setGameOver}/>
        )}
      </div>
    )
  }
}

export default App;
