import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Label, Button, Segment, List, Header } from 'semantic-ui-react';

import '../assets/TicTacToe.css';
import * as gameActions from '../store/actions/gameActions';
import Constants from '../constants';

const GameOver = props => {
    const top10 = useSelector(state => state.gameReducer.top10);
    const userName = useSelector(state => state.gameReducer.userName);
    const dispatch = useDispatch()

    const getTop10 = useCallback(async () => {
        let res = await fetch(`${Constants.backendUrl}${Constants.top10}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*"
            }
        })
        
        const data = await res.json();
        dispatch(gameActions.get_top_10(data.top10))
    }, [dispatch])

    useEffect(() => {
        getTop10()
    }, [dispatch, getTop10])

    if(!userName){
        return <Redirect to="/" />
    }

    return (
        <Segment className="segmentRowStyle">
            <div>
                <Label className="labelStyle">Game is Over!</Label>
            </div>
            <div>
                <Header className="headerStyle" as='h2'>Top 10</Header>
                <Segment className="listSegment">
                    <List divided relaxed>
                        {top10.map((leader) => {
                            return (
                                <List.Item key={leader.name}>
                                    <List.Icon name="github" size="large" verticalAlign="middle"></List.Icon>
                                    <List.Content>
                                        <List.Header as='a'>{leader.name}</List.Header>
                                        <List.Description className="descStyle" as='a'>{leader.turn} turn</List.Description>
                                    </List.Content>
                                </List.Item>
                            )
                        })}
                    </List>
                </Segment>
            </div>
            <div>
                <Link to="/">
                    <Button color="green" className="btnStyle">NEW GAME</Button>
                </Link>
            </div>
        </Segment >
    )
}

export default GameOver;