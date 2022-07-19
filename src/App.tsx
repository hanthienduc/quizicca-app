import React from 'react';
import './App.scss';
import StartComponent from './components/StartComponent';
import QuestionsComponent from './components/QuestionsComponent';
// https://opentdb.com/api.php?amount=5&category=31&type=multiple
// https://docs.google.com/document/d/1vfkePMndAqWhJVeJ291P3xtJR-BtBE6wbOx6lX_iBxQ/edit
// https://www.figma.com/file/Ngad5NqMwZfbGsbLiMluT4/Quizzical-App-(Copy)?node-id=8%3A2
// https://scrimba.com/learn/learnreact/react-section-4-solo-project-co24f49bea8aace7c174082c8

function App() {
  return (
    <div className="app">
        <div className='lemon'></div>
        <div className='baby'></div>
        <StartComponent />
        {/* <QuestionsComponent /> */}
    </div>
  );
}

export default App;
