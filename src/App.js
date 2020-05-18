import React, {useState} from 'react';
import Board from './Board';
import Score from './Score';
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

  const scoreboard = useSelector(state => state.scoreboard);
  const isWaiting = useSelector(state => state.isWaiting);

  //a flag use to toggle the scoreboard, so the user can choose to have it visible or not
  const [boardFlag, setBoardFlag] = useState(false);

  //builds an array of Card components using the buildCards method
  const cards = buildCards();
  const dispatch = useDispatch();

  //toggles the scoreboard, and retrieves the current data in the database
  function toggleBoard() {
    setBoardFlag(!boardFlag);
    dispatch(loadScoreboard()); 
  }
  
  if(boardFlag){
  return (
    <div className="App">
      <div id="left-side">
        <h2>Flip and match the cards to win!</h2>
        <p id="move-counter">Moves: 0</p>
        {isWaiting && <div className="loading-icon">&#8635;</div>}
        <div id="gameBoard" className="Board">
          <Board cards={cards}/>
        </div>
      </div>
      <div id="right-side">
        <button id="score-board" onClick={toggleBoard}>Scoreboard</button>
        <div id="scores">
           {scoreboard.map(score => <Score key={score.id} score={score}/>)}
        </div>
      </div>
    </div>
  );
  } else {
    return (
      <div className="App">
        <div id="left-side">
        <h2>Flip and match the cards to win!</h2>
          <p id="move-counter">Moves: 0</p>
          {isWaiting && <div className="loading-icon">&#8635;</div>}
          <div id="gameBoard" className="Board">
            <Board cards={cards}/>
          </div>
        </div>
        <div id="right-side">
          <button id="score-board" onClick={toggleBoard}>Scoreboard</button>
        </div>
      </div>
    );
  }
}

export default App;

//builds an array of cards, generating 8 unique cards, then using the getCard method twice in order to make pairs of those cards
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
  //after the array is generated, shuffle up those bad boys
  return shuffle(cards)
}

//shuffles the card array so that the cards are in a random order. the player deserves a slight challenge
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
