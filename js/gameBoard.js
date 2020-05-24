// To generate the game Board
// Create the class and constructor for Board Object
import Player from "./player.js";
import Case from "./case.js";
import Weapon from "./weapons.js";

class Board {
    constructor() {
        this.arrayCases = []; // tableau de Cases
        this.caseNumber = 100; // nombre de Case
        this.playersList = []; // liste de Joueurs
        this.indexBlocked = []; // indexInterdit
        this.weaponsArcenal = [ // weaponsArcenal
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
        // return this.arrayCases[randomNumber]; // Security Issue : Generic Object Injection Sink
        return this.arrayCases[randomNumber]
        // Return array with random index
    }

    // ajouterCase
    addCase(index) {
        $("#board").append(`<div id="c${index}" class="case"></div>`);
    }

    // generateTableau
    generateGrid() {
        for (let i = 0; i < this.caseNumber; i++) {
            this.addCase(i);
            this.arrayCases.push(new Case(i));
        }
    }

    // generateCase
    generateCase() {
        this.generateGrid();
        for (let i = 0; i < 10; i++) {
            let caseSelect = this.randomCase();
            caseSelect.addObstacle();
            caseSelect.changeColor("obstacle");
        }
    }

    // generateArmes
    generateWeapons() { // arme = weapon
        for (let weapon of this.weaponsArcenal) {
            let caseSelect = this.randomCase();
            let generation = new Weapon(`${weapon.name}`, `${weapon.damage}`, `${weapon.weapon}`, `${weapon.display}`);
            caseSelect.weapon = generation;
            generation.insertWeapon(caseSelect.index);
        }
    }

    // generate player as a new object
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

    checkPosition(index) {
        // ISSUE : loop statement doesn't loop
        for (let player of this.playersList) {
            let pos = this.arrayCases.find((c) => c._player === player).index;

            console.log("tableau de cases dans arrayCases : " , this.arrayCases);
            console.log("details des objets dans arrayCases : " , this.arrayCases[index]);
            console.log("position dans arrayCases : " , pos);
        }
    }

    /*
            // refactoring
            if (pos % 10 === 0 && (pos === index + 1 || pos === index - 10 || pos === index + 10)) {
                // si le J1 est sur le bord de gauche
                return true;
            } else if (pos % 10 === 9 && (pos === index - 1 || pos === index + 10 || pos === index - 10)) {
                // si le J1 est sur le bord de droite
                return true;
            } else return pos === index - 1 || pos === index + 1 || pos === index - 10 || pos === index + 10;
     */

    // Refactoring Test
    /*findPosition(index) {
        let pos;
        for (let player of this.playersList) {
            pos = this.arrayCases.find(c => c._player === player).index;
        }
        return pos;
    }*/

    // check 2 players position
    /*checkPosition(index) {
        let pos_modulo = pos % 10;
        let pos_player = this.findPosition(index);
        if (pos_modulo === 0 && (pos_player + 1 || pos_player - 10 || pos_player + 10)) {
            return true;
        } else if (pos_modulo === 9 && (pos_player - 1 || pos_player - 10 || pos_player + 10)) {
            return true;
        } else return pos_player - 1 || pos_player + 1 || pos_player - 10 || pos_player + 10;
    }*/

    // Game Board generation : case, players and weapons
    generateBoard() {
        this.generateCase();
        this.generatePlayer();
        this.generateWeapons();
    }
}

const board = new Board();
board.generateBoard();
//board.tours();