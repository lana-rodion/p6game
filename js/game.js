import Board from "./board.js";
import { player1, player2 } from "./players.js";
import { weapons } from "./weapons.js";

export default class Game {
    constructor(turnToPlay) {
        this.turnToPlay = turnToPlay;
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
        $("#board").on("click", ".accessible", function() {
            let adjacentCells = self.board.getAdjacentCells(
                self.board.cells[$(this).data("x")][$(this).data("y")]
            );
            let boardCell = self.board.cells[$(this).data("x")][$(this).data("y")];
            let currentPlayer = self.turnToPlay ? player1 : player2;
            let nextPlayer = self.turnToPlay ? player2 : player1;
            self.playerActions(currentPlayer, boardCell, adjacentCells);
            self.playersDescription(currentPlayer);
            self.board.getAccessibleCells(nextPlayer.currentCell, 3);
        });
    }

    playerActions(player, boardCell, adjacentCells) {
        player.move(boardCell);
        player.changeWeapon(player);
        if (player.isPlayerAround(adjacentCells)) {
            this.prepareFight();
            player.fight(this.turnToPlay ? player2 : player1);
        } else {
            this.turnToPlay = !this.turnToPlay;
        }
    }

    // Method to display players stats

    playersDescription(player) {
        $(`#${player.name}-name`).empty().append(`${player.name}`);
        $(`#${player.name}-weapon-image`).empty().append(`<div class='standard-size-img ${player.weapon.name}'></div>`);
        $(`#${player.name}-weapon-name`).empty().append(`${player.weapon.name}`);
        $(`#${player.name}-weapon-infos`).empty().append(`${player.weapon.damage}`);
    }
}