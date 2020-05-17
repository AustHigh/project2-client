import {Action} from "./actions";

const initialState = {
    isWaiting: false,
    showBoard: false,
    scoreboard: [],
}

function reducer(state = initialState, action) {
    switch(action.type) {
        case Action.ShowBoard:
            return {
                ...state,
                showBoard: true,
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
        case Action.FinishAddingScore:
            return {
                ...state,
                isWaiting: false,
                scoreboard: [{...action.payload, isPosting: true}, ...state.scoreboard],
            }
        case Action.FinishSavingScore:
            return {
                ...state,
                isWaiting: false,
                scoreboard: state.scoreboard.map(score => {
                    if(score.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return score;
                    }
                }),
            }
        default:
            return state;
    }
}

export default reducer;