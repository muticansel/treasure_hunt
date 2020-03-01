import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import StartGame from './components/StartGame';
import Game from './components/Game';
import GameOver from './components/GameOver';
import gameReducer from './store/reducers/gameReducer';
import './App.css';
import './assets/TicTacToe.css';

const rootReducer = combineReducers({
  gameReducer: gameReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/">
          <StartGame />
        </Route>
        <Switch>
          <Route path="/game">
            <Game />
          </Route>
          <Route path="/gameOver">
            <GameOver />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
