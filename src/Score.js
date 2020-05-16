import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

export function Score(props) {
    const score = props.score;
    const dispatch = useDispatch();
    const [name, setName] = useState(score.name);
    const [moves, setMoves] = useState(score.moves);


    return (
        <div className="score">
          <span>{name}</span>
           <span>{moves}</span>
        </div>
    );
}

export default Score;