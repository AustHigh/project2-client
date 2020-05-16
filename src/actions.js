export const Action = Object.freeze({
    StartWaiting: 'StartWaiting',
    StartGame: 'StartGame',
    LoadScores: 'LoadScores',
});

export function startWaiting(){
    return {
        type: Action.StartWaiting,
    };
}

export function startGame() {
    return {
        type: Action.StartGame,
    };
}

export function loadScores(scoreboard){
    return {
        type: Action.LoadScores,
        payload: scoreboard,
    };
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



