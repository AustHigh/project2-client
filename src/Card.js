import React from 'react'
import './Card.css'

const Card = props => {
  const {front, back, flipped, onClick} = props
  const img = flipped ? front : back
  return (
    <div className="Card" onClick={onClick}>
      <img src={img} alt=""/>
    </div>
  )
}

export default Card