'use strict';

// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions
let scores, currentScore, activePlayer, isGameActive;

const initGame = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isGameActive = true;

  // Reset UI to starting values
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  // Enable buttons
  btnRoll.disabled = false;
  btnHold.disabled = false;
};

// Function to switch to the next player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Roll Dice Functionality
btnRoll.addEventListener('click', function () {
  if (isGameActive) {
    // Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // Check if the rolled number is not 1
    if (dice !== 1) {
      // Add dice value to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

// Hold Functionality
btnHold.addEventListener('click', function () {
  if (isGameActive) {
    // Add current score to active player's total score
    scores[activePlayer] += currentScore;

    // Update UI with new total score
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if the active player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game: Declare the winner
      isGameActive = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      // Disable buttons
      btnRoll.disabled = true;
      btnHold.disabled = true;
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

// New Game Functionality
btnNew.addEventListener('click', initGame);

// Initialize the game on page load
initGame();
