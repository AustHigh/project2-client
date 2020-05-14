import React from 'react';
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

function App() {

  const cards = buildCards();

  let len = cards.length
  for (let i = 0; i < len; i++) {
    cards[i].newId = "card" + i;
  }

  return (
    <div className="App">
      <Board cards={cards}/>
    </div>
  );
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
