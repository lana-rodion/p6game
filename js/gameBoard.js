// To generate the game Board
// Create the class and constructor for Board Object
import Player from './player.js';
import Case from './case.js';
import Weapon from './weapons.js';

class Board {
    constructor() {
        this.arrayCases = []; // listeCases
        this.caseNumber = 100; // nbCase
        this.playersList = []; // listeJoueurs
        this.indexBlocked = []; // indexInterdit
        this.weaponsArcenal = [
            {
                name: "weapon_sword",
                damage: 20,
                skin: "weapon_sword",
                display: "Épée"
            },
            {
                name: "weapon_axe",
                damage: 30,
                skin: "weapon_axe",
                display: "Hache"
            },
            {
                name: "weapon_hammer",
                skin: "weapon_hammer",
                damage: 40,
                display: "Marteau"
            }
        ]; // listeArmes
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
    generateWeapons() {
        for (let weapon of this.weaponsArcenal) {
            let caseSelect = this.randomCase(),
                generation = new Weapon(`${weapon.name}`, `${weapon.damage}`, `${weapon.skin}`, `${weapon.display}`);
            caseSelect.arme = generation;
            generation.insertWeapon(caseSelect.index);
        }
    }

    // generateJoueur
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

    // check if 2 players are in front
    checkPosition(index) {
        for (let player of this.playersList) {
            console.log(this.arrayCases);
            const pos = this.arrayCases.find(c => c._player === player).index;

            if (pos % 10 === 0) { // si le J1 est sur le bord de gauche
                if (pos === index + 1 || pos === index - 10 || pos === index + 10) {
                    return true;
                }
            } else if (pos % 10 === 9) { // si le J1 est sur le bord de droite
                if (pos === index - 1 || pos === index + 10 || pos === index - 10) {
                    return true;
                }
            } else return pos === index - 1 || pos === index + 1 || pos === index - 10 || pos === index + 10;
        }
    }

    // generationPlateau
    generateBoard() {
        this.generateCase();
        this.generatePlayer();
        this.generateWeapons();
    }
}

const board = new Board();
board.generateBoard();
//board.tours();