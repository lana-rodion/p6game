/*
 * Step 2 - Player movements (turns)
    On each turn, a player can move one to three spaces (horizontally or vertically) before complete his turn
    He cannot cross an obstacle
    If a player cross over a space containing a weapon, he leaves his current weapon in place and replaces it with the new one

*/

import Game from "./game.js";

$(document).ready(function() {
    let game = new Game(true);
    game.init();
});
















