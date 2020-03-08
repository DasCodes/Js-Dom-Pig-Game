/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)

*/

let scores, previousRoundScoreDice1, previousRoundScoreDice2, roundScore, activePlayer, winningScore, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    // hide notification
    document.querySelector('.game-notification').style.display = 'none';

    // Random number
    let dice = Math.floor(Math.random() * 6 + 1);
    let dice2 = Math.floor(Math.random() * 6 + 1);

    // Display results
    let diceDOM = document.querySelector('.dice');
    let dice2DOM = document.querySelector('.dice2');
    diceDOM.style.display = 'block';
    dice2DOM.style.display = 'block';
    diceDOM.src = 'img/dice-' + dice + '.png';
    dice2DOM.src = 'img/dice-' + dice2 + '.png';

    // Update the round score IF the rolled number was not 1
    if (dice !== 1 && dice2 !== 1) {
      if (((previousRoundScore === 6 || previousRoundScoreDice2 === 6) && (dice === 6 || dice2 === 6)) || (dice === 6 && dice2 === 6)) {
        scores[activePlayer] = 0;
        document.getElementById('score-' + activePlayer).textContent = '0';
        nextPlayer();
        document.querySelector('.game-notification').style.display = 'block';
        document.querySelector('.game-notification').textContent = 'Rolled two SIXES in a row! Score reset & changing player!';
      } else {
        // add score
        roundScore += dice + dice2;
        previousRoundScoreDice1 = dice;
        previousRoundScoreDice2 = dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
      }
    } else {
      // next player
      nextPlayer();
      document.querySelector('.game-notification').style.display = 'block';
      document.querySelector('.game-notification').textContent = 'Rolled ONE, changing player!';
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    // add current score to global score
    scores[activePlayer] += roundScore;

    // update the html
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // check if the player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      // next player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  previousRoundScore = 0;
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('#setScore').addEventListener('click', gotoSetScore);

document.querySelector('.setScoreBtn').addEventListener('click', setScore);

function init() {
  scores = [0, 0];
  roundScore = 0;
  previousRoundScore = 0;
  activePlayer = 0;
  winningScore = 100;
  gamePlaying = true;

  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.game-notification').style.display = 'none';
  document.querySelector('.overlay').style.display = 'none';
}

function gotoSetScore() {
  if (gamePlaying) {
    document.querySelector('.wrapper').style.display = 'none';
    document.querySelector('.overlay').style.display = 'block';
  }
}

function setScore() {
  if (gamePlaying) {
    let scoreInputValue = document.getElementById('scoreInput').value;
    if (Number(scoreInputValue) && Number(scoreInputValue) >= 20 && Number(scoreInputValue) <= 1000) {
      winningScore = Math.floor(scoreInputValue);
      document.querySelector('.overlay').style.display = 'none';
      document.querySelector('.wrapper').style.display = 'block';
      document.querySelector('#winningScore').textContent = winningScore;
    } else {
      alert('Enter a number between 20 and 1000');
    }
  }
}
