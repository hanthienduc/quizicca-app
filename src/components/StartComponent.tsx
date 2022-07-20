import React from "react";

import { Starts } from "../interfaces";
import './StartComponent.styles.scss'
const StartComponent = ({ handleClick }: Starts) => {
    return (
        <div className="start-screen">
            <h1 className="title">Quizzical</h1>
            <p className="description">5 Random Questions related to Anime and Manga!</p>
            <button className="btn start" onClick={handleClick}>Start Quiz</button>
        </div>
    )
}

export default StartComponent