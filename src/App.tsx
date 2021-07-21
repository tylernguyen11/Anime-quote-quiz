//import React from 'react';

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
      isOver: true
    };
  }


  getAllAnime = async () => {
    try {
      let response = await fetch('https://animechan.vercel.app/api/available/anime')
      if(!response.ok) {
        alert("Bad response from API from trying to fetch anime")
      }
      let anime: string[] = await response.json() as string[]
      console.log(anime)

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
      console.log(quotes)

      this.setState({
        questions: quotes,
        isOver: false
      })
    } catch(e) {
      console.log(e)
      alert("Failed to fetch questions from API")
    }
  }

  setGameOver = () => {
    this.setState({
      isOver: true
    })
  }



  render() {
    return (
      <div className="App">
        <p>Hello.</p>
        {this.state.isOver ? (
          <button onClick={this.startQuiz}>Start</button>
        ) : (
          null
        )}
        {!this.state.isOver ? (
          <Question quotes={this.state.questions} allAnime={this.state.allAnime} onGameOver={this.setGameOver}/>
        ) : (
          null
        )}
      </div>
    );
  }
}

export default App;
