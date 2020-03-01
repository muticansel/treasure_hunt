export const SET_NAME = "SET_NAME";
export const ADD_TURN = "ADD_TURN";
export const GET_TOP_10 = "GET_TOP_10";

export const setName = (name) => {
    return { type: SET_NAME, name }
}

export const addTurn = () => {
    return { type: ADD_TURN }
}

export const get_top_10 = (top10) => {
    return { type: GET_TOP_10, top10: top10 }
}