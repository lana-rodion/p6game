// Create the class constructor for Board Object and generate board game
import Player from "./player.js";
import Case from "./case.js";
import Weapon from "./weapons.js"

class Board {
    constructor() {
        this.arrayCases = [];
        this.position = 0;
        this.caseNumber = 100;
        this.playersList = [];
        this.indexBlocked = []; // index des cases blockées
        this.weaponsArcenal = [
            {
                weapon: "weapon_sword", // name
                damage: 20, // damage
                display: "Épée" // display
            },
            {
                weapon: "weapon_axe",
                damage: 30,
                display: "Hache"
            },
            {
                weapon: "weapon_hammer",
                damage: 40,
                display: "Marteau"
            }
        ];
    }

    // Generate random index for blocked case, stop it while indexBlocked exists
    randomCase() {
        let randomNumber;
        do {
            randomNumber = Math.floor(Math.random() * this.caseNumber);
        } while (this.indexBlocked.includes(randomNumber));

        this.indexBlocked.push(randomNumber); // Insert randomNumber in array of indexBlocked
        return this.arrayCases[randomNumber]; // Return array with random index
    }

    addCase(index) {
        $("#board").append(`<div id="c${index}" class="case"></div>`);
    }

    generateGrid() {
        for (let i = 0; i < this.caseNumber; i++) {
            this.addCase(i);
            this.arrayCases.push(new Case(i));
        }
    }

    generateCase() {
        this.generateGrid();
        for (let i = 0; i < 10; i++) {
            let caseSelect = this.randomCase();
            caseSelect.addObstacle();
            caseSelect.changeColor("obstacle");
        }
    }

    generateWeapons() { // arme = weapon
        for (let weapon of this.weaponsArcenal) {
            let caseSelect = this.randomCase();
            let generation = new Weapon(`${weapon.name}`, `${weapon.damage}`, `${weapon.weapon}`, `${weapon.display}`);
            caseSelect.weapon = generation;
            generation.insertWeapon(caseSelect.index);
        }
    }

    generatePlayer() {
        for (let i = 1; i < 3; i++) {
            let caseSelect;

            do {
                caseSelect = this.randomCase();
            } while (this.checkPosition(caseSelect.index));

            let player = new Player(`Viking ${i}`, `player${i}`);
            this.playersList.push(player);
            player.insertPlayer(caseSelect.index);
            caseSelect.player = player;
        }
    }

    // check 2 players position
    checkPosition(index) {
        for (let player of this.playersList) {
            this.position = this.arrayCases.find(c => c._player === player).index;

            console.log("liste de cases dans arrayCases : ", this.arrayCases);
            console.log("position dans arrayCases : ", this.position);
            this.findPosition(index);
        }
    }

    findPosition(index) {
        // si Player est sur le bord de gauche
        if (this.position % 10 === 0) {
            if (this.position === index + 1 || this.position === index - 10 || this.position === index + 10) {
                return true;
            }
            // si Player est sur le bord de droite
        } else if (this.position % 10 === 9) {
            if (this.position === index - 1 || this.position === index + 10 || this.position === index - 10) {
                return true;
            }
        } else return this.position === index - 1 || this.position === index + 1 || this.position === index - 10 || this.position === index + 10;
    }

    generateBoard() {
        this.generateCase();
        this.generatePlayer();
        this.generateWeapons();
    }
}

const board = new Board();
board.generateBoard();
//board.tours();