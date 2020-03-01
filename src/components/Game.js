import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Label, Segment } from 'semantic-ui-react';

import Board from '../UI/Board';
import '../assets/TicTacToe.css';
import * as gameActions from '../store/actions/gameActions';

const Game = props => {
    const dispatch = useDispatch()
    const userName = useSelector(state => state.gameReducer.name);
    const turn = useSelector(state => state.gameReducer.turn);

    const [squares, setSquares] = useState(Array(25).fill(""))
    const [foundTreasure, setFoundTreasure] = useState(0)
    const [guesses, setGuesses] = useState([])

    if (foundTreasure >= 3) {
        return <Redirect to="/gameOver" />
    }

    const handleClick = (i) => {
        const updatedSquares = [...squares];
        updatedSquares[i] = "X"
        setSquares(updatedSquares);
        setGuesses(currGuesses => [...currGuesses, i])
    }

    const turnHandler = async () => {
        let res = await fetch('http://localhost:5000/api/guess', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*"
            },
            body: JSON.stringify({
                playerName: userName,
                guesses: guesses
            })
        })

        let data = await res.json();

        const updatedSquares = [...squares];

        guesses.forEach((item, index) => {
            updatedSquares[item] = data.answers[index]
        })

        setFoundTreasure(foundTreasure + data.answers.filter(ans => ans === 'T').length)

        dispatch(gameActions.addTurn())
        setSquares(updatedSquares);
        setGuesses([])
    }

    return (
        <Segment className="segmentStyle">
            <div className="game-board">
                <Board disabled={guesses.length === 3} squares={squares} onClick={(i) => handleClick(i)} />
            </div>
            <div className="game-info">
                <div>
                    <Label className="labelStyle">Welcome, {userName}</Label>
                </div>
                <div>
                    <Label className="labelStyle">Turn: {turn}</Label>
                </div>
                <div>
                    <Button className="btnStyle" primary disabled={guesses.length !== 3} onClick={turnHandler}>GUESS</Button>
                </div>
            </div>
        </Segment>
    );
}
export default Game;