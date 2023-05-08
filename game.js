"use strict";
const player0 = document.querySelector(".player-0");
const player1 = document.querySelector(".player-1");
const score0 = document.getElementById("score-0");
const score1 = document.getElementById("score-1");
const current0 = document.getElementById("current-0");
const current1 = document.getElementById("current-1");

const diceEl = document.querySelector(".dice");
const btnroll = document.querySelector(".btn-roll");
const btnHold = document.querySelector(".btn-hold");
const btnNew = document.querySelector(".newgame");

// Starting Candition
let game, score, activePlayer, currentScore;
const init = function () {
  game = true;
  score = [0, 0];
  activePlayer = 0;
  currentScore = 0;

  current0.textContent = 0;
  current1.textContent = 0;
  score0.textContent = 0;
  score1.textContent = 0;

  diceEl.classList.add("hidden");
  player0.classList.remove("player-winner");
  player1.classList.remove("player-winner");
};
init();

// Rolling a dice
btnroll.addEventListener("click", function () {
  if (game) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    // Dispaly a dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    //   Check the dice value, if 1 switched to another player
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current-${activePlayer}`).textContent =
        currentScore;
    } else {
      //    Switch to next player
      document.getElementById(`current-${activePlayer}`).textContent = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      currentScore = 0;
    }
  }
});

// hold button
btnHold.addEventListener("click", function () {
  if (game) {
    // Add current score to active score
    score[activePlayer] += currentScore;

    // Add active score to total score

    document.getElementById(`score-${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 100) {
      game = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add("player-winner");
    } else {
      document.getElementById(`current-${activePlayer}`).textContent = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      currentScore = 0;
    }
  }
});

btnNew.addEventListener("click", init);
