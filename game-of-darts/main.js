var menuscreen = document.querySelector('.menuscreen');
var gamescreen = document.querySelector('.gamescreen');

var startButton = document.querySelector('#start');
var nextButton = document.querySelector('#next');
var throwInput = document.querySelector('#throwInput');

var players = null;
var scorelimit = null;

var player = [];
var activePlayerNum = 0;

startButton.addEventListener('click', switchToGame);
nextButton.addEventListener('click', nextPlayer);
throwInput.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
      nextPlayer();
    }
});

function switchToGame(){
  getGameParameters();
  setGameParameters(players);
  menuscreen.classList.add('hidden');k
  gamescreen.classList.remove('hidden');
  gamescreen.classList.add('active');
  createGameGUI(players, scorelimit);
}

function getGameParameters(){
  var playerRadios = document.getElementsByName('players');
  var scorelimitRadios = document.getElementsByName('scorelimit');

  for (var i = 0; i < playerRadios.length; i++){
    if (playerRadios[i].checked){
      players = parseInt(playerRadios[i].value);
    break;
    }
  }

  for (var i = 0; i < scorelimitRadios.length; i++){
    if (scorelimitRadios[i].checked){
      scorelimit = parseInt(scorelimitRadios[i].value);
    break;
    }
  }
}

function setGameParameters(playerNumber){
  for (i = 0; i < playerNumber; i++){
    player.push(scorelimit);
  }
}

function createGameGUI(playerNumber, scoreNumber){
  for (i = 0; i < playerNumber; i++){
    var newPlayer = document.createElement('p');
    var newPlayerName = document.createTextNode('Player ' + (i+1));
    var newScore = document.createElement('p');
    var newScoreNumber = document.createTextNode(scoreNumber);

    newPlayer.appendChild(newPlayerName);
    document.querySelector('.players').appendChild(newPlayer);

    newScore.appendChild(newScoreNumber);
    document.querySelector('.scores').appendChild(newScore);
  }
  document.querySelector('.players').firstElementChild.classList.toggle('activePlayer');
  throwInput.focus();
}

function nextPlayer(){
  var throwValue = parseInt(throwInput.value);
  player[activePlayerNum] = player[activePlayerNum] - throwValue;
  var playersP = document.querySelectorAll('.players p');
  var scoresP = document.querySelectorAll('.scores p');
  scoresP[activePlayerNum].innerHTML = player[activePlayerNum];
  playersP[activePlayerNum].classList.toggle('activePlayer');
  checkWinner();
  if (activePlayerNum < players-1){
    activePlayerNum++;
  }else{
    activePlayerNum = 0;
  }
  playersP[activePlayerNum].classList.toggle('activePlayer');
  throwInput.value = "";
  throwInput.focus();
}

function checkWinner() {
  for (i=0; i< players; i++){
    if (player[i] <= 0){
      alert('Player ' + (i+1) + ' won!');
      location.reload();
      break;
    }
  }
}
