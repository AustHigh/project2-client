import React, {useState, useEffect} from 'react'
import {useDispatch,  useSelector} from 'react-redux';
import Card from './Card.js'
import {startAddingScore} from './actions';
import Score from './Score.js'
import './Board.css'

let name = "";
let moves = 0;

const Board = props => {

  const [endFlag, setEndFlag] = useState(false);
  const [postButtonFlag, setPostButtonFlag] = useState(true);
  const scoreboard = useSelector(state => state.scoreboard);

  const dispatch = useDispatch();
  const [cards, setCards] = useState(props.cards)
  const [grid, setGrid] = useState([])
  const [completed, setCompleted] = useState([])

  const onCardClick = card => () => {
    if (gridFull(grid) || cardAlreadyInGrid(grid, card)) return
    const newGrid = [...grid, card]
    setGrid(newGrid)
    const cardsInGridMatched = validateGrid(newGrid)
    if(gridFull(newGrid)){
        moves++;
        document.getElementById("move-counter").innerText = "Moves: " + moves
    }
    if (cardsInGridMatched) {
      setCompleted([...completed, newGrid[0].type])
      setTimeout(() => {
        setCards(cards => cards.filter(card => card.type !== newGrid[0].type))
      }, 1000)
    }
    //allow player 1 second to view images
    if (gridFull(newGrid)) {
      resetGridAfter(1000)
    }
    //signifies game completion
    if(completed.length === 7 && newGrid.length === 2){
        console.log("end")
        setEndFlag(true);
    }
    function validateGrid(grid){
      return grid.length === 2 &&
      grid[0].type === grid[1].type
    }
    function cardAlreadyInGrid(grid, card){
      return grid.length === 1 && grid[0].id === card.id
    }
    function gridFull(grid){
      return grid.length === 2
    }
    function resetGridAfter(time) {
      setTimeout(() => {
        setGrid([])
      }, time)
    }
  }

  useEffect(() => {
    const newCards = cards.map(card => ({
      ...card,
      flipped:
        grid.find(c => c.id === card.id) ||
        completed.includes(card.type),
    }))
    setCards(newCards)
  }, [grid, completed])

  const onPost = () => {
    dispatch(startAddingScore(name, moves));
    setPostButtonFlag(false);
  }

if(endFlag && postButtonFlag){
  return (
    <div className="score-form">
      <button id="post-score-button" onClick={onPost}>Post Score</button>
      {scoreboard.map(score => <Score key={score.id} score={score}/>)}
    </div>
  );
} else if(endFlag) {
  return (
    <div className="score-form">
      {scoreboard.map(score => <Score key={score.id} score={score}/>)}
    </div>
  );
} else {
  return (
    <div className="Board">
      {cards.map(card => (
        <Card {...card} onClick={onCardClick(card)} key={card.id} newId={""}/>
      ))}
    </div>
  )
  }
}

export default Board