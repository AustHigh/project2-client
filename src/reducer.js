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
        case Action.ResetGame:
            return {
                ...state,
                startGame: false,
            }
        case Action.LoadScores:
            return {
                ...state,
                scoreboard: action.payload,
            }
        default:
            return state;
    }
}

export default reducer;