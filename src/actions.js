export const Action = Object.freeze({
    LoadBoard: 'LoadBoard',
    RemoveMatch: 'RemoveMatch',
    StartWaiting: 'StartWaiting',
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

function checkForErrors(response) {
    if(!response.ok) {
        throw Error(`${response.status}: ${response.statusText}`);
    }
    return response;
}

const host;



