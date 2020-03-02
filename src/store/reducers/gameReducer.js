import { SET_NAME, ADD_TURN, RESET_TURN, GET_TOP_10 } from '../actions/gameActions';

const initialState = {
    userName: null,
    turn: 0,
    top10: []
}

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NAME:
            return {
                ...state,
                userName: action.userName
            }
        case ADD_TURN:
            return {
                ...state,
                turn: state.turn + 1
            }
        case RESET_TURN:
            return {
                ...state,
                turn: 0
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