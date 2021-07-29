import styled from "styled-components";

// Styled button component
const StyledButton = styled.button<{ answered?:boolean, correct?: boolean, small?: boolean}>`
    color: lightsalmon;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
    width:${props => props.small ? '' : '500px'};
    background-color ${props => props.answered ? props.correct ? 'lightgreen' : '#FF4747' : 'white'}; 
`;

export default StyledButton