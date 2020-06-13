/*
* Step 1 - Map generation
    Start by randomly generating the game map
    Each box can be either: empty or inaccessible (grayed background)
    On the map, a limited number of weapons (4 maximum) will be randomly placed and can be collected by players who pass over them
    Create at least 4 types of weapons in the game, with different damage
    Each weapon has a name and an associated visual
    The default players weapon must deal 10 points of damage
    The placement of the two players on the map is random when the game is starting
    Players cannot touch each other (they cannot be side by side) when the game is loading
*/

import Game from "./game.js";

$(document).ready(function() {
    let game = new Game(true);
    game.init();
});
















