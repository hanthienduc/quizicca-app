import { nanoid } from "nanoid";
import React, { useState } from "react";
import { Answer } from "../interfaces";
import "./Question.scss"
interface QuestionProps {
    question_id: string,
    question: string,
    choices: Answer[],

    correctAnswer: {
        isShownCorrect: boolean,
        correct: string
    }
    handleClick: (event: React.MouseEvent<HTMLLIElement>, question_id: string, choice_id: string) => void
}

const Question = ({ question_id, question, choices, handleClick, correctAnswer }: QuestionProps) => {

    const answerElements = choices.map(choice => {
        // check if each answer haven been selected
        return <li onClick={(e) => handleClick(e, question_id, choice.id)}
            key={choice.id}
            className={`${choice.isSelect ? 'select' : ''}
             ${correctAnswer.isShownCorrect && correctAnswer.correct === choice.content ? 'show-correct' : ''}
             ${correctAnswer.isShownCorrect && choice.isSelect ? 'show-error' : ''}
            `}>
            {choice.content}</li>
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