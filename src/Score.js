import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {startSavingScore} from './actions';

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
    }

    if(score.isPosting){
        return (
            <div className="score">
                <input type="text" value={name} onChange={e =>
                setName(e.target.value)}/>
                <input type="text" value={moves} readOnly/>
                <button onClick={onSave}>Save Score</button>
            </div>
        );
    } else {
        return (
            <div className="score">
                <span>{name}</span>
                <span> {moves}</span>
            </div>
        );
    }
}

export default Score;