import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Input, Segment } from 'semantic-ui-react'

import * as gameActions from '../store/actions/gameActions';
import '../assets/TicTacToe.css';

const StartGame = props => {
    const [name, setName] = useState("");
    const dispatch = useDispatch()

    const nameHandler = (event) => {
        setName(event.target.value)
    }

    const startGame = () => {
        dispatch(gameActions.setName(name))
        fetch("http://localhost:5000/api/startGame", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*"
            },
            body: JSON.stringify({
                playerName: name
            })
        }).then(res => {
            dispatch(gameActions.reset_turn())
            if(res.status === 200)
                props.history.push("/game")
        })
    }

    return (
        <Segment className="segmentStyle">
            <Input icon="user" placeholder="Enter Your Name" value={name} onChange={nameHandler} />
            <Button className="btnStyle" primary onClick={startGame}>START</Button>
        </Segment>
    )
}

export default withRouter(StartGame);