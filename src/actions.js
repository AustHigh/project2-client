
export const Action = Object.freeze({
    StartWaiting: 'StartWaiting',
    LoadScores: 'LoadScores',
    ShowBoard: 'ShowBoard',
    FinishAddingScore: 'FinishAddingScore',
    FinishSavingScore: 'FinishSavingScore',
});

export function startWaiting(){
    return {
        type: Action.StartWaiting,
    };
}

export function showBoard() {
    return {
        type: Action.ShowBoard,
    };
}

export function loadScores(scoreboard){
    return {
        type: Action.LoadScores,
        payload: scoreboard,
    };
}

export function finishAddingScore(score){
    return {
        type: Action.FinishAddingScore,
        payload: score,
    }
}

function finishSavingScore(score){
    return {
        type: Action.FinishSavingScore,
        payload: score,
    }
}

function checkForErrors(response) {
    if(!response.ok) {
        throw Error(`${response.status}: ${response.statusText}`);
    }
    return response;
}

const host = 'https://scoreboard-server.duckdns.org:8442';

export function loadScoreboard() {
    return dispatch => {
        dispatch(startWaiting());
        fetch(`${host}/scoreboard`)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if(data.ok) {
                    dispatch(loadScores(data.scoreboard));
                }
            })
            .catch(e => console.error(e));
    };
}

export function startAddingScore(name, moves) {
    const score = {
        name, moves
    };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(score),
    }
    return dispatch => {
        dispatch(startWaiting());
        fetch(`${host}/scoreboard`, options)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if(data.ok){
                    score.id = data.id;
                    dispatch(finishAddingScore(score));
                }
            })
            .catch(e => console.error(e));
    }
}

export function startSavingScore(score){
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(score),
    };

    return dispatch => {
        dispatch(startWaiting());
        fetch(`${host}/scoreboard/${score.id}`, options)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if(data.ok) {
                    dispatch(finishSavingScore(score));
                }
            })
            .catch(e => console.error(e))
    }
}



