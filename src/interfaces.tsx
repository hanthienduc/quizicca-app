export interface Starts {
    handleClick: (param?: any) => void
}

export interface QuestionsData {
    response_code: number,
    results: QuestionDataItem[]
}

export interface QuestionDataItem {
    question: string,
    correct_answer: string,
    incorrect_answers: string[]
}

export interface Questions {
    question_list: QuestionItem[] | undefined
}

export interface QuestionItem {
    id: string,
    question: string,
    correct_answer: string,
    choices: Answer[]
}



export interface Answer {
    id: string,
    content: string,
    isSelect: boolean
}

export interface QuestionProps {
    question_id: string,
    question: string,
    choices: Answer[],

    correctAnswer: {
        isShownCorrect: boolean,
        correct: string
    }
    handleClick: (event: React.MouseEvent<HTMLLIElement>, question_id: string, choice_id: string) => void
}


export interface Score {
    isShow: boolean,
    score: number
}

