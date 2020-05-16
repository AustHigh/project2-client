import {Action} from "./actions";

const initialState = {
    isWaiting: false,
    startGame: false,
    scoreboard: [],
}

function reducer(state = initialState, action) {
    switch(action.type) {
        case Action.StartGame:
            return {
                ...state,
                startGame: true,
            }
        case Action.LoadScores:
            return {
                ...state,
                scoreboard: action.payload,
            }
        case Action.StartWaiting:
            return {
                ...state,
                isWaiting: true,
            }
        default:
            return state;
    }
}

export default reducer;