import React, {Component} from "react";
import { runInThisContext } from "vm";

interface QuestionProps {
    quotes: Quote[]
    allAnime: string[]
    onGameOver(score: number): void
}

interface QuestionState {
    questionNumber: number
    options: string[]
    numCorrect: number
    showAnswer: boolean
}

interface Quote {
    anime: string,
    character: string,
    quote: string
}

class Question extends Component<QuestionProps, QuestionState> {
    constructor (props: QuestionProps) {
        super(props)
        this.state = {
            questionNumber: 0,
            options: [],
            numCorrect: 0,
            showAnswer: false
        }
    }

    componentDidMount() {
        this.generateOptions()
    }

    checkAnswer = (event: any) => {
        let clickID: number = +event.target.id
        
        //if correct answer
        if(this.state.options[clickID] === this.props.quotes[this.state.questionNumber].anime) {
            let newNumCorrect = this.state.numCorrect + 1
            this.setState({
                numCorrect: newNumCorrect,
            })
        }
        this.setState({
            showAnswer: true
        })
    }

    nextQuestion = () => {

        let nextNumber = this.state.questionNumber + 1
        this.setState({
            questionNumber: nextNumber
        }, () => {
            if(this.state.questionNumber < 10) {
                this.generateOptions()
            } 
            else { 
                //let the parent know the game is over
                this.props.onGameOver(this.state.numCorrect)
            }
        })
    }

    generateOptions = () => {
        let ans = this.props.quotes[this.state.questionNumber].anime
        let arr = this.props.allAnime.sort(() => Math.random() - Math.random()).slice(0, 3)

        //avoid including the answer twice by chance
        //there's also a random "anime" that's just blank
        while(arr.includes(ans) || arr.includes("")) {
            arr = this.props.allAnime.sort(() => Math.random() - Math.random()).slice(0, 3)
        }
        arr.push(ans)

        //Durstenfeld shuffle
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        this.setState({
            options: arr,
            showAnswer: false
        })
    }

    render() {
        if(this.state.questionNumber < 10) {
            return (
                <div id="Question">
                    <p>Quote:</p>
                    <p>{this.props.quotes[this.state.questionNumber].quote}</p>
                    {this.state.showAnswer ? (
                    <>
                        <p>Correct Answer: {this.props.quotes[this.state.questionNumber].anime}</p>
                        <button onClick={this.nextQuestion}>Next</button>
                    </>
                    ) : (
                    <>
                        <button id='0' onClick={this.checkAnswer}>{this.state.options[0]}</button>
                        <button id='1' onClick={this.checkAnswer}>{this.state.options[1]}</button>
                        <button id='2' onClick={this.checkAnswer}>{this.state.options[2]}</button>
                        <button id='3' onClick={this.checkAnswer}>{this.state.options[3]}</button>
                    </>
                    )}
                    <p>Number correct: {this.state.numCorrect}</p>
                </div>
            )
        } else {
            return(<p>nothing</p>)
        }
    }
}
export default Question