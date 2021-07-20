import React, {Component} from "react";

interface QuestionProps {
    quotes: Quote[];
}

interface Quote {
    anime: string,
    character: string,
    quote: string
}


class Question extends Component<QuestionProps> {
    constructor (props: QuestionProps) {
        super(props);
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
                    <p>Quote:</p>
                    <p>{this.props.quotes[0].anime}</p>
                    <p>{this.props.quotes[0].character}</p>
                    <p>{this.props.quotes[0].quote}</p>
                </div>
            )
        }
    }
}
export default Question