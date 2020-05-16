import React, { useEffect } from 'react';
import Board from './Board';
import back from './assets/gray-square.jpg';
import crow from './assets/crow.jpg';
import cursedSmile from './assets/cursed-smile.jpg';
import facetimeCat from './assets/facetime-cat.png';
import noLikeBanana from './assets/no-like-banana.jpg';
import rat from './assets/rat.png';
import sadCatJuul from './assets/sad-cat-juul.png';
import scream from './assets/scream.jpg';
import seagull from './assets/seagull.jpg';
import './App.css';
import './Board.css';
import {useSelector, useDispatch} from 'react-redux';
import {loadScoreboard} from './actions';

function App() {

  let startGame = false;

  const cards = buildCards();
  const dispatch = useDispatch();

  function onStart() {
    startGame = true;
    console.log("beep")
  }

  useEffect(() => {
    dispatch(loadScoreboard()); 
  }, [dispatch]);
  
//console.log(startGame)
//if(startGame){
  return (
    <div className="App">
      <div>
        <button id="start-button">Start Game</button>
        <button id="score-board">Scoreboard</button>
      </div>
      <p id="move-counter">Moves: 0</p>
      <div id="gameBoard" className="Board">
      <Board cards={cards}/>
      </div>
    </div>
  );
 /* } else {
  return (
    <div className="App">
      <button id="start-button" onClick={onStart}>Start Game</button>
    </div>
  );
}
*/
}

export default App;



function buildCards() {
  let id = 0
  const images = {crow, cursedSmile, facetimeCat, noLikeBanana, rat, sadCatJuul, scream, seagull}
  const cards = Object.keys(images).reduce((result, item) => {
    const getCard = () => ({
      id: id++,
      type: item,
      back,
      front: images[item],
      flipped: false,
    })
    return [...result, getCard(), getCard()]
  }, [])
  return shuffle(cards)
}

function shuffle(arr) {
  let len = arr.length
  for (let i = 0; i < len; i++) {
    let randomIndex = Math.floor(Math.random() * len)
    let copyCurrent = {...arr[i]}
    let copyRandom = {...arr[randomIndex]}
    arr[i] = copyRandom
    arr[randomIndex] = copyCurrent
  }
  return arr
}
