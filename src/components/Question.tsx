import React, {Component} from "react";
import StyledButton from "../Question-style";

interface QuestionProps {
    quotes: Quote[]
    allAnime: string[]
    onGameOver(score: number): void
}

interface QuestionState {
    questionNumber: number
    options: string[]
    numCorrect: number
    correctIndex: number
    showAnswer: boolean
    buttonColors: [boolean, boolean][]
}

interface Quote {
    anime: string,
    character: string,
    quote: string
}

//const allWhite: [boolean, boolean][] = [[false, false], [false, false], [false, false], [false, false]]

class Question extends Component<QuestionProps, QuestionState> {
    constructor (props: QuestionProps) {
        super(props)
        this.state = {
            questionNumber: 0,
            options: [],
            numCorrect: 0,
            correctIndex: 0,
            showAnswer: false,
            buttonColors: [[false, false], [false, false], [false, false], [false, false]]
        }
    }

    componentDidMount() {
        this.generateOptions()
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
            showAnswer: false,
            correctIndex: arr.indexOf(ans)
        })
    }

    checkAnswer = (event: any) => {
        let target = event.target
        let clickID: number = +target.id
        
        //if correct answer
        if(this.state.options[clickID] === this.props.quotes[this.state.questionNumber].anime) {
            let newNumCorrect = this.state.numCorrect + 1
            let old = this.state.buttonColors
            old[clickID] = [true, true]
            this.setState({
                numCorrect: newNumCorrect,
                buttonColors: old
            })
        } 
        else {
            let old = this.state.buttonColors
            old[clickID] = [true, false]
            old[this.state.correctIndex] = [true, true]
        }
        this.setState({
            showAnswer: true
        })

    }

    nextQuestion = () => {
        let nextNumber = this.state.questionNumber + 1
        this.setState({
            questionNumber: nextNumber,
            buttonColors: [[false, false], [false, false], [false, false], [false, false]]
        }, () => {
            if(this.state.questionNumber < 10) {
                this.generateOptions()
            } 
            else { //game over
                this.props.onGameOver(this.state.numCorrect)
            }
        })
    }

    render() {
        let buttonColors = this.state.buttonColors
        
        if(this.state.questionNumber < 10) {
            return (
                <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                    <b>Question {this.state.questionNumber+1}/10</b>
                    <br/>
                    <b>Number Correct: {this.state.numCorrect}</b>
                    <br/>
                    <b>Quote:</b>
                    
                    <p>{this.props.quotes[this.state.questionNumber].quote}</p>
                    
                    <div>
                        <StyledButton answered={buttonColors[0][0]} correct={buttonColors[0][1]} id='0' onClick={this.checkAnswer} disabled={this.state.showAnswer}>{this.state.options[0]}</StyledButton>
                        <StyledButton answered={buttonColors[1][0]} correct={buttonColors[1][1]} id='1' onClick={this.checkAnswer} disabled={this.state.showAnswer}>{this.state.options[1]}</StyledButton>
                        <br/>
                        <StyledButton answered={buttonColors[2][0]} correct={buttonColors[2][1]} id='2' onClick={this.checkAnswer} disabled={this.state.showAnswer}>{this.state.options[2]}</StyledButton>
                        <StyledButton answered={buttonColors[3][0]} correct={buttonColors[3][1]} id='3' onClick={this.checkAnswer} disabled={this.state.showAnswer}>{this.state.options[3]}</StyledButton>
                    </div>
                    {this.state.showAnswer ? (
                    <>
                        <StyledButton small onClick={this.nextQuestion}>Next</StyledButton>
                    </>
                    ) : (
                        null
                    )}
                    
                </div>
            )
        } else {
            return(<p>nothing</p>)
        }
    }
}
export default Question