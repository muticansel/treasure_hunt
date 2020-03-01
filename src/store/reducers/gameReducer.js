import { SET_NAME, ADD_TURN, GET_TOP_10 } from '../actions/gameActions';

const initialState = {
    name: null,
    turn: 0,
    top10: [
        
    ]
}

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NAME:
            return {
                ...state,
                name: action.name
            }
        case ADD_TURN:
            return {
                ...state,
                turn: state.turn + 1
            }
        case GET_TOP_10:
            return {
                ...state,
                top10: action.top10
            }
        default:
            return state;
    }
}

export default gameReducer;