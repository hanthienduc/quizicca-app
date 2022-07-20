import { nanoid } from "nanoid";
import React, { useState } from "react";
import { Answer } from "../interfaces";
import "./Question.scss"
interface QuestionProps {
    question: string,
    answers: Answer[],
    handleClick: (event:React.MouseEvent<HTMLLIElement>, id?: string) => void
}

const Question = ({ question, answers, handleClick }: QuestionProps) => {
    const [selected, setSelected] = useState(false) 
    const answerElements = answers.map(answer => {
        // check if each answer haven been selected
        const id = nanoid()
        return <li onClick={(e)=> handleClick(e, id)} key={id} className={selected ? 'select': ''}>{answer.content}</li>
    })
    return (
        <div className="question-content">
            <h3 className="question-title">{question}</h3>
            <ul className="answers">
                {answerElements}
            </ul>
        </div>
    )
}

export default Question