import React, {useState, useEffect} from 'react'
import Card from './Card.js'
import './Board.css'

const Board = props => {
  const [cards, setCards] = useState(props.cards)
  const [grid, setGrid] = useState([])
  const [completed, setCompleted] = useState([])
  const onCardClick = card => () => {
      console.log(card.id)
      console.log(card.newId)
    if (gridFull(grid) || cardAlreadyInGrid(grid, card)) return
    const newGrid = [...grid, card]
    setGrid(newGrid)
    const cardsInGridMatched = validateGrid(newGrid)
    if (cardsInGridMatched) {
      setCompleted([...completed, newGrid[0].type])
      console.log(card.type, newGrid[0].type)
      setCards(cards => cards.filter(card => card.type !== newGrid[0].type))
      
    }
    //allow player 1 second to view images
    if (gridFull(newGrid)) {
      resetGridAfter(1000)
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

  return (
    <div className="Board">
      {cards.map(card => (
        <Card {...card} onClick={onCardClick(card)} key={card.id} newId={""}/>
      ))}
    </div>
  )
}

export default Board