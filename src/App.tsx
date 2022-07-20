import React, { useEffect, useState } from 'react';
import './App.scss';
import StartComponent from './components/StartComponent';
import Question from './components/Question';
import { QuestionItem, Questions, QuestionsData, UserAnswers, Answer } from './interfaces';
import { nanoid } from 'nanoid';
// https://opentdb.com/api.php?amount=5&category=31&type=multiple
// https://docs.google.com/document/d/1vfkePMndAqWhJVeJ291P3xtJR-BtBE6wbOx6lX_iBxQ/edit
// https://www.figma.com/file/Ngad5NqMwZfbGsbLiMluT4/Quizzical-App-(Copy)?node-id=8%3A2
// https://scrimba.com/learn/learnreact/react-section-4-solo-project-co24f49bea8aace7c174082c8


function App(): JSX.Element {
  const [start, setStart] = useState(false)
  const [questionsData, setQuestionsData] = useState<QuestionsData | null>(null)
  const [questions, setQuestions] = useState<Questions | null>(null)
  const [userAnswers, setUserAnswers] = useState<UserAnswers | null>(null)

  let getQuestionsData = async () => {
    await fetch('https://opentdb.com/api.php?amount=5&category=31&type=multiple')
      .then(response => response.json())
      .then((json) => setQuestionsData(json))
  }

  useEffect(() => {
    const questions: QuestionItem[] | undefined = questionsData?.results.map(question_item => {
      const answers = [question_item.correct_answer, ...question_item.incorrect_answers]
      const item: QuestionItem = {
        question: question_item.question,
        correct_answer: question_item.correct_answer,
        choice: answers.map(answer => {
          const choice_item: Answer = {
            id: nanoid(),
            content: answer,
            isSelect: false
          }
          return choice_item
        })
      }
      return item
    })
    setQuestions({ question_list: questions })

  }, [questionsData])


  const startQuizHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setStart(prevState => !prevState)
    getQuestionsData()
  }

  const answerSelectedHandler = (event: React.MouseEvent<HTMLLIElement>, id?: string) => {
    console.log(id)
  }

  const CheckAnswerHandler = (event: React.MouseEvent<HTMLButtonElement>) => {

  }

  const lemonStyle: React.CSSProperties = {
    top: start ? '-179px' : '-75px',
    borderRadius: start ? '0' : '28%'
  }

  const babyStyle: React.CSSProperties = {
    borderRadius: start ? '65%' : '44%',
    left: start ? "-139px" : '-99px',
    bottom: start ? "-183px" : "-134px",
  }
  let QuestionElements = questions?.question_list?.map(question_item => {
    return <Question handleClick={answerSelectedHandler} key={nanoid()} question={question_item.question} answers={question_item.choice} />
  })

  return (
    <div className="app">
      <div className='lemon' style={lemonStyle}></div>
      <div className='baby' style={babyStyle}></div>
      {!start ? <StartComponent handleClick={startQuizHandler} /> : (
        <div className='quiz-container'>
          {QuestionElements}
          <button className="btn check" onClick={CheckAnswerHandler}>{'Check Answers'}</button>
        </div>
      )}

    </div>
  );
}

export default App;
