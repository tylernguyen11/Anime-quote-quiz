//import React from 'react';

import React, {Component} from "react";
import Question from "./components/Question";
import background from "./images/demonSlayer.jpg";

/*
function App() {
  return (
    <div className="App">
      AYAYA
    </div>
  );
}
*/

//anime
//character
//quote

interface AppState {
  questions: Quote[]
}

interface Quote {
  anime: string,
  character: string,
  quote: string
}


class App extends Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    let q: Quote = {anime: "A", character:"B", quote:"C"};
    let arr: Quote[] = [q]
    this.state = {
      questions: arr
    };
  }


 getQuestions = async () => {
    try {
      let response = await fetch('https://animechan.vercel.app/api/quotes')
      if(!response.ok) {
        alert("Bad response from API from trying to fetch questions");
        return;
      }
      console.log("SSSS")
      let quotes: Quote[] = await response.json() as Quote[];
      
      console.log(quotes)
      console.log(typeof quotes)

      this.setState({
        questions: quotes
      });
      console.log("set state")
      
      /*
      let response = await fetch('https://api.jikan.moe/v3/anime/14813/characters_staff')
      if(!response.ok) {
        alert("AAA");
        return;
      }

      let a = await response.json();
      console.log(a);
      */
    } catch(e) {
      console.log(e)
      alert("Failed to fetch questions from API");
    }
  }

  render() {
    return (
      <div className="App">
        <p>Hello.</p>
        <button onClick={this.getQuestions}>Start</button>
        <Question quotes={this.state.questions}/>
      </div>
    );
  }
}

export default App;
