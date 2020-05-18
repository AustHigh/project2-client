import React, {useState, useEffect} from 'react'
import {useDispatch,  useSelector} from 'react-redux';
import Card from './Card.js'
import {startAddingScore} from './actions';
import Score from './Score.js'
import './Board.css'

let name = "";
let moves = 0;

const Board = props => {

  //this flag signifies whether or not the game is over (false = not over, true = over)
  const [endFlag, setEndFlag] = useState(false);

  //this flag disables the post button after the score is posted, to prevent needless INSERT dupes
  const [postButtonFlag, setPostButtonFlag] = useState(true);

  const scoreboard = useSelector(state => state.scoreboard);

  const dispatch = useDispatch();
  //cards contains... well... the cards
  const [cards, setCards] = useState(props.cards)
  //grid contains the cards currently flipped
  const [grid, setGrid] = useState([])
  //completed holds all of the matched cards
  const [completed, setCompleted] = useState([])

  const onCardClick = card => () => {
    if (gridFull(grid) || cardAlreadyInGrid(grid, card)) return
    const newGrid = [...grid, card]
    setGrid(newGrid)
    const cardsInGridMatched = validateGrid(newGrid)
    //this if statement essentially checks for two cards being flipped up
    if(gridFull(newGrid)){
        moves++;
        document.getElementById("move-counter").innerText = "Moves: " + moves
    }
    //checks for matched cards
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

    //makes sure only two cards are flipped up at a time
    function validateGrid(grid){
      return grid.length === 2 &&
      grid[0].type === grid[1].type
    }

    //makes sure you cannot 'flip' the same card twice
    function cardAlreadyInGrid(grid, card){
      return grid.length === 1 && grid[0].id === card.id
    }

    //checks if two cards are flipped
    function gridFull(grid){
      return grid.length === 2
    }

    //empties the grid and unflips the cards after a set amount of time
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
    //next comment disables useless dependency warning
    // eslint-disable-next-line
  }, [grid, completed])

  //inserts an empty entry into the database, and prompts the user to edit that entry
  const onPost = () => {
    dispatch(startAddingScore(name, moves));
    setPostButtonFlag(false);
  }

//if game is over and the player has yet to post their score
if(endFlag && postButtonFlag){
  return (
    <div className="score-form">
      <h2>Refresh to play again!</h2>
      <button id="post-score-button" onClick={onPost}>Post Score</button>
      {scoreboard.map(score => <Score key={score.id} score={score}/>)}
    </div>
  );
  //if the game is over (and the user has already posted their score)
} else if(endFlag) {
  return (
    <div className="score-form">
      <h2>Refresh to play again!</h2>
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