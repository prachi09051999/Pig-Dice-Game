'use strict';

const dice = document.querySelector('.dice');
const diceIndex = dice.src.indexOf('dice');
const currentScoreBoard = [document.querySelector('#current--0'), document.querySelector('#current--1')];
const totalScoreBoard = [document.querySelector('#score--0'), document.querySelector('#score--1')];
const player = [document.querySelector('.player--0'), document.querySelector('.player--1')];
const roleButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');
const resetButton = document.querySelector('.btn--new');
let currentScore, totalScore, turn;

// Starting new game

const restartGame = () => {
  currentScore = 0;
  totalScore = [0,0];
  turn = 0;
  currentScoreBoard[0].textContent = 0;
  currentScoreBoard[1].textContent = 0;
  totalScoreBoard[0].textContent = 0;
  totalScoreBoard[1].textContent = 0;
  dice.classList.add('hidden');
  if(roleButton.classList.contains('inactive')){
    roleButton.classList.remove('inactive');
  }
  if(holdButton.classList.contains('inactive')){
    holdButton.classList.remove('inactive')
  }
  if(player[0].classList.contains('player--winner')){
    player[0].classList.remove('player--winner');
  }
  if(player[1].classList.contains('player--winner')){
    player[1].classList.remove('player--winner');
  }
    player[0].classList.add('player--active');
  if(player[1].classList.contains('player--active')){
    player[1].classList.remove('player--active');
  }
}
restartGame();
resetButton.addEventListener('click',restartGame);


// Changing the turn

const changeTurn = () => {
  player[turn].classList.remove('player--active');
  currentScoreBoard[turn].textContent = 0;
  turn = ( turn === 0 ) ? 1 : 0;
  player[turn].classList.add('player--active');
}

// Showing current score to ScoreBoard

const showCurrentScore = (randomNumber,currentScore) => {
  if(randomNumber === 1) 
    {
      currentScore = 0;
      changeTurn();
    }
    else currentScore += randomNumber;
    return currentScore;
}

// Role dice method 

const roleDice = () => {
  const randomNumber = Math.trunc(Math.random()*6)+1;
  dice.src = `dice-${randomNumber}.png`;
  if(dice.classList.contains('hidden')){
    dice.classList.remove('hidden');
  }
    currentScore = showCurrentScore(randomNumber,currentScore);
    currentScoreBoard[turn].textContent = currentScore;
}

roleButton.addEventListener('click',roleDice);

// Holding the current score 

const holdScore = () => {
  totalScore[turn] += currentScore;
  currentScore = 0;
  totalScoreBoard[turn].textContent = totalScore[turn];
  currentScoreBoard[turn].textContent = currentScore;
  if(totalScore[turn] >= 50) {
    endGame();
    return;
  }
  changeTurn();
}

holdButton.addEventListener('click',holdScore);

// Winner declaration

const endGame = () => {
  player[turn].classList.add('player--winner');
  roleButton.classList.add('inactive');
  holdButton.classList.add('inactive');
}