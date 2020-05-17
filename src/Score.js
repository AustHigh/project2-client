import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {startSavingScore} from './actions';
import './Board.css';

export function Score(props) {
    const score = props.score;
    const dispatch = useDispatch();
    const [name, setName] = useState(score.name);
    const [moves] = useState(score.moves);

    const onSave = () => {
        dispatch(startSavingScore({
            id: score.id,
            name,
            moves,
        }));
        score.isPosting = false;
    }

    if(score.isPosting){
        return (
            <div className="score">
                <div id="input-fields">
                <input type="text" id="name-input" placeholder="Enter your name..." value={name} onChange={e =>
                setName(e.target.value)}/>
                <input type="text" id="moves-input" value={moves} readOnly/>
                </div>
                <button id="save-button" onClick={onSave}>Save Score</button>
            </div>
        );
    } else {
        return (
            <div className="score">
                <span>Name: {name} </span>
                <span>Moves: {moves}</span>
            </div>
        );
    }
}

export default Score;