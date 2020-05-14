import React from 'react'
import './Board.css'

const Card = props => {
  const {front, back, flipped, onClick, newId} = props
  const img = flipped ? front : back
  return (
    <div id={`card${newId}`} className="Card" onClick={onClick}>
      <img src={img} alt=""/>
    </div>
  )
}

export default Card