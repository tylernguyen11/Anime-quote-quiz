import React, {Component} from "react";

interface QuestionProps {
    quotes: Quote[]
    allAnime: string[]
    onGameOver(): void
}

interface QuestionState {
    questionNumber: number
    options: string[]
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
            options: []
        }
    }

    componentDidMount() {
        this.generateOptions()
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
                this.props.onGameOver()
            }
        })
    }

    generateOptions = () => {
        let ans = this.props.quotes[this.state.questionNumber].anime
        let arr = this.props.allAnime.sort(() => Math.random() - Math.random()).slice(0, 3)

        //avoid including the answer twice by chance
        while(arr.includes(ans)) {
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
            options: arr
        })
    }

    gameOver = () => {

    }

    render() {
        if(!this.props.quotes) {
            return (
                <div id="Question">
                    <p>Nothing</p>
                </div>
            )
        } else {
            return (
                <div id="Question">
                    {this.state.questionNumber < 10 ? (
                    <>
                        <p>Quote:</p>
                        <p>{this.props.quotes[this.state.questionNumber].anime}</p>
                        <p>{this.props.quotes[this.state.questionNumber].character}</p>
                        <p>{this.props.quotes[this.state.questionNumber].quote}</p>
                        <button onClick={this.nextQuestion}>Next</button>
                        <button>{this.state.options[0]}</button>
                        <button>{this.state.options[1]}</button>
                        <button>{this.state.options[2]}</button>
                        <button>{this.state.options[3]}</button>
                    </>
                    ) : (
                        null
                    )}
                </div>
            )
        }
    }
}
export default Question