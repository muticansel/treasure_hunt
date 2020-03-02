import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Input, Segment } from 'semantic-ui-react'

import * as gameActions from '../store/actions/gameActions';
import Constants from '../constants';
import '../assets/TicTacToe.css';

const StartGame = props => {
    const [userName, setUserName] = useState("");
    const dispatch = useDispatch()

    const nameHandler = (event) => {
        setUserName(event.target.value)
    }

    const startGame = () => {
        dispatch(gameActions.setUserName(userName))

        fetch(`${Constants.backendUrl}${Constants.startGame}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*"
            },
            body: JSON.stringify({
                playerName: userName
            })
        }).then(res => {
            dispatch(gameActions.reset_turn())
            if(res.status === 200)
                props.history.push("/game")
        })
    }

    return (
        <Segment className="segmentStyle">
            <Input icon="user" placeholder="Enter Your Name" value={userName} onChange={nameHandler} />
            <Button className="btnStyle" primary onClick={startGame}>START</Button>
        </Segment>
    )
}

export default withRouter(StartGame);