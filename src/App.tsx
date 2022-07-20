import React, { useEffect, useState } from 'react';
import './App.scss';
import StartComponent from './components/StartComponent';
import Question from './components/Question';
import { QuestionItem, Questions, QuestionsData, Answer, Score } from './interfaces';
import { nanoid } from 'nanoid';
import { fetchData, shuffleArray } from './utils';
const QUESTION_API_URL = "https://opentdb.com/api.php?amount=5&category=31&type=multiple"
// https://www.figma.com/file/Ngad5NqMwZfbGsbLiMluT4/Quizzical-App-(Copy)?node-id=8%3A2

function App(): JSX.Element {
  const [start, setStart] = useState(false)
  const [questionsData, setQuestionsData] = useState<QuestionsData | null>(null)
  const [questions, setQuestions] = useState<Questions | null>(null)
  const [showScore, setShowScore] = useState<Score>({
    isShow: false,
    score: 0
  })
  const [isShownCorrect, setIsShownCorrect] = useState(false)
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    const questions = questionsData?.results.map(question_item => {
      const answers = shuffleArray([question_item.correct_answer, ...question_item.incorrect_answers])
      const item: QuestionItem = {
        id: nanoid(),
        question: question_item.question,
        correct_answer: question_item.correct_answer,
        choices: answers.map(answer => {
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
    setIsLoading(true)
    setStart(prevState => !prevState)
    setTimeout(() => {
      fetchData(QUESTION_API_URL)
        .then(data => {
          setQuestionsData(data)
          setIsLoading(false)
        })
        .catch(err => {
          console.log(err)
        })
    }, 2000)
  }

  const answerSelectedHandler = (event: React.MouseEvent<HTMLLIElement>, question_id: string, choice_id: string) => {
    setQuestions(prevQuestions => {
      return {
        question_list: prevQuestions?.question_list?.map(question_item => {
          return question_item.id === question_id ? {
            ...question_item,
            choices: question_item.choices.map(choice => {
              return {
                ...choice,
                isSelect: choice.id === choice_id ? true : false
              }
            })
          } : question_item

        })
      }
    })
  }

  const CheckAnswerHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const userSelectedAnswer = questions?.question_list?.map(question_item => {
      return question_item.choices.filter(choice =>
        choice.isSelect === true && choice.content === question_item.correct_answer
      ).map(item => item.content).join()

    })
    userSelectedAnswer?.map(selectedAnswer => {
      setShowScore(prevScore => {
        return {
          isShow: !prevScore.isShow,
          score: selectedAnswer !== '' ? prevScore.score + 1 : prevScore.score
        }
      })
    })
    setIsShownCorrect(true)

    // compare usersAnswer with correct answer list 
    if (showScore.isShow) {
      setShowScore({
        isShow: false,
        score: 0
      })
      setStart(false)
      setIsShownCorrect(false)
    }
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
    return <Question handleClick={answerSelectedHandler}
      question_id={question_item.id}
      key={question_item.id} question={question_item.question}
      correctAnswer={{ correct: question_item.correct_answer, isShownCorrect: isShownCorrect }}
      choices={question_item.choices} />
  })

  return (
    <div className="app">
      <div className='lemon' style={lemonStyle}></div>
      <div className='baby' style={babyStyle}></div>
      {!start ? <StartComponent handleClick={startQuizHandler} /> : isLoading ?
        <img src={require('./assets/loading.gif')} alt='wait for data' />
        : (
          <div className='quiz-container'>
            {QuestionElements}
            <div className='result-area'>
              {showScore.isShow && <h3>You scored {showScore.score}/5</h3>}
              <button className="btn check" onClick={CheckAnswerHandler}>{!showScore.isShow ? 'Check Answers' : 'Start New Quiz?'}</button>
            </div>
          </div>
        )
      }

    </div>
  );
}

export default App;
