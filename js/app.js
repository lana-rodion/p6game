/*
 * Step 3 - Step 3 - The fight
 *   If the players cross on adjacent squares (horizontally or vertically), a fight begins
 *   During a fight, the game works as follows:
    *   Each in turn attacks
    *   damage depends on the weapon owned by the player
    *   Player can choose to attack or defend against the next hit
    *   When the player defends, he takes 50% less damage than normal
    *   As soon as a player's life points (initially 100) drop to 0, the player loses
    *   A message appears that the game is over
*/

import Game from "./game.js";

$(document).ready(function() {
    let game = new Game(true);

    game.init();
});
















