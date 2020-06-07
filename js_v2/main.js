var caseSelec = [];
var weapons = [];
var players = [];
var dispNodeList = [];
var nbWall = 10;

$('#game').ready(function(){
  // On initialise le board
  const board = new Board('#game',12,12);
  // On initialise les murs
  drawWall();
  // On initialise les joueurs
  drawPlayer();
  // On initialise les armes
  drawWeapon();
  // On initialise les cards
  drawCards();
  // On cache les boutons combat des cards au demarrage
  player1.card.hideBtn();
  player2.card.hideBtn();
  // On selectionnne aléatoirement le joueur qui débutera
  let random = getRandomInt(0, 2) + 1;
  if (random === 1) {
    player1.active = true;
  }
  else {
    player2.active = true;
  }
  // On attribue les deplacements du joueur tiré au sort
  dispDeplMouvement();
});