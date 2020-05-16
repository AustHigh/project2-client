export const Action = Object.freeze({
    LoadBoard: 'LoadBoard',
    RemoveMatch: 'RemoveMatch',
    StartWaiting: 'StartWaiting',
    StartGame: 'StartGame',
    ResetGame: 'ResetGame',
});

export function startWating(){
    return {
        type: Action.StartWaiting,
    };
}

export function loadBoard(cards){
    return{
        type: Action.LoadBoard,
        payload: cards,
    };
}

export function removeMatch(cards){
    return{
        type: Action.RemoveMatch,
        payload: cards,
    }
}

export function startGame(cards) {
    return {
        type: Action.StartGame,
        payload: cards,
    }
}

export function resetGame(cards) {
    return {
        type: Action.ResetGame,
        payload: cards,
    }
}

function checkForErrors(response) {
    if(!response.ok) {
        throw Error(`${response.status}: ${response.statusText}`);
    }
    return response;
}

const host = 'https://scoreboard-server.duckdns.org:8442';



