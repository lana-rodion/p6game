import Board from "./board.js";
import { player1, player2 } from "./players.js";
import { weapons } from "./weapons.js";

export default class Game {
    constructor(turnToPlay, board) {
        this.turnToPlay = turnToPlay;
        this.board = board;

        /*this.currentPlayer = null;
        this.boardCell = null;
        this.adjacentCells = null;
        this.nextPlayer = null;
        */
    }

    // Method to initialize the game by creating the game grid and launching the gamePlay method

    init() {
        let height = 10;
        let width = 10;
        let players = [player1, player2];

        players.forEach((player) => this.playersDescription(player));

        this.board = new Board(player1, player2, weapons);
        this.board.createGrid(width, height);

        this.board.getAccessibleCells(player1.currentCell, 3);
        this.gamePlay();
    }

    // Method to manage the game turns and launch other methods relating to the good functioning of the game

    gamePlay() {
        let self = this;

        //The .on() method attaches event handlers to the currently selected set of elements in the jQuery object.
        $("#board").on("click", ".accessible", function() {

            let adjacentCells = self.board.getAdjacentCells(self.board.cells[$(this).data("x")][$(this).data("y")]);

            let boardCell = self.board.cells[$(this).data("x")][$(this).data("y")];
            let currentPlayer = self.turnToPlay ? player1 : player2;
            let nextPlayer = self.turnToPlay ? player2 : player1;

            self.playerActions(currentPlayer, boardCell, adjacentCells);
            self.playersDescription(currentPlayer);
            self.board.getAccessibleCells(nextPlayer.currentCell, 3);
        });

        /*let boardGame = document.getElementById("board");

        boardGame.addEventListener("click", function() {

            this.boardCell = this.board.cells[$(this).data("x")][$(this).data("y")];
            this.currentPlayer = this.turnToPlay ? player1 : player2;
            this.nextPlayer = this.turnToPlay ? player2 : player1;

            this.board.playerActions(this.currentPlayer, this.boardCell, this.adjacentCells);
            this.board.playersDescription(this.currentPlayer);
            this.board.getAccessibleCells(this.nextPlayer.currentCell, 3);
        }).bind(this);*/
    }

    // Method to manage the different players actions

    playerActions(player, boardCell, adjacentCells) {
        player.move(boardCell);
        player.changeWeapon(player);
        if (player.isPlayerAround(adjacentCells)) {
            this.prepareClash();

            // using ternary operator : condition ? expression_1 : expression_2
            player.fight(this.turnToPlay ? player2 : player1);

        } else {
            this.turnToPlay = !this.turnToPlay;
        }
    }

    // Method to change the appearance of the board before the fight

    prepareClash() {

        $("#board div").not(".hero2, .hero1").css("opacity", "0.5");
        $("[class^='cell']").not(".hero2, .hero1", "obstacle").addClass("battle");
        $("#board").off("click");
        $(".cell").addClass("accessible");
        $(".fight-btn").css("display", "block");
    }

    // Method to display players stats

    playersDescription(player) {

        let playerName = "#" + player.name + "-name";
        let playerWeaponImage = "#" + player.name + "-weapon-image";
        let playerWeaponName = "#" + player.name + "-weapon-name";
        let playerWeaponInfos = "#" + player.name + "-weapon-infos";

        $(playerName).empty().append(`${player.name}`);
        $(playerWeaponImage).empty().append(`<div class="standard-size-img ${player.weapon.name}"></div>`);
        $(playerWeaponName).empty().append(`${player.weapon.name}`);
        $(playerWeaponInfos).empty().append(`${player.weapon.damage}`);
    }
}