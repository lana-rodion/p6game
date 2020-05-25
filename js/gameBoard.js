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
            this.findPosition(index);
        }
    }

    findPosition(index) {

        console.log("viking 1 valeur this.position : ", this.position);

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

    tours() {

        let indexPlayer = this.playersList.indexOf(this.player);

        if (indexPlayer === 0) {
            this.player = this.playersList[1];
        } else {
            this.player = this.playersList[0];
        }
        this.movement();
    }

    // Check if two indexes are on the same line to take into account the board edges
    compareLine(index1, index2) {
        return Math.floor(index1 / 10) !== Math.floor(index2 / 10);
    }

    movement() {
        const orientation = [-10, 1, 10, -1];

        for (let j = 0; j < 4; j++) {
            const positionOrigin = this.arrayCases.find(c => c._player === this.player).index;
            let positionPlayer = positionOrigin;
            let decalage = orientation[j];

            for (let i = 0; i < 3; i++) {
                positionPlayer += decalage;

                let caseSelect = this.arrayCases[positionPlayer];

                // si caseSelect renvoie undefined, s'il y a un obstacle ou un player, alors on ne génère plus de cases de déplacements
                if (!caseSelect || caseSelect._obstacle || caseSelect._player) {
                    break;
                }
                // s'il ne sont pas sur la même ligne donc sur un bord du plateau, ne pas faire la génération à droite et à gauche
                if ((decalage === 1 || decalage === -1) && (this.compareLine(caseSelect.index, positionOrigin))) {
                    break;
                }
                caseSelect.changeColor('movementPossible');
            }
        }
        //this.updateWeapon();
        this.movementClickable();
        //this.stats();
        //this.modalFight();
    }

    movementClickable() {

        let player = this.player;

        $('.movementPossible').on('click', (event) => {
            const caseOrigin = this.arrayCases.find(c => c._player === this.player);
            caseOrigin.player = null;

            let newPositionPlayer = $(event.target).attr('id').substring(1);
            player.movementPlayer(caseOrigin.index, (Number(newPositionPlayer)));

            this.arrayCases[Number(newPositionPlayer)]._player = player;

            const movement = $('.movementPossible');
            movement.off();
            movement.removeClass('movementPossible');
            this.tours();
        });
    }

    /*updateWeapon() {

        const caseOrigin = this.playersList.find(c => c._player === this.player);

        $('.movementPossible').on('click', (event) => {

            let positionPlayer = caseOrigin.index; // position de base du player
            let caseClick = this.arrayCases[$(event.target).attr('id').substring(1)].index; //position cliquée du player

            let nbMovement = Math.abs(caseClick - positionPlayer); // nb de cases entre la position de départ du player et celle d'arrivée

            if (nbMovement > 3) {
                nbMovement /= 10;
            } // si le déplacement est supérieur à 3, / par 10 (pour calculer le déplacement haut et bas)

            let decalage;
            for (let i = 1; i < nbMovement + 1; i++) {
                decalage = Math.floor((caseClick - positionPlayer) / nbMovement); //permet de connaître la direction du player (haut -10, bas +10, gauche -1, droite +1)
                let caseCrossed = this.arrayCases[positionPlayer + (decalage * i)]; // passe sur les cases parcourues et ressort les éléments de mon tableau arrayCases (pour vérifier les weapons)

                if (caseCrossed._weapon !== null) { // s'il y a une arme sur mes cases parcourues
                    const weaponTemp = caseCrossed._weapon;
                    caseCrossed._weapon = this.player.weapon; // je change l'arme de mon player par celle sur ma case
                    $(`#c${caseCrossed.index}`).removeClass(weaponTemp.skin).addClass(this.player.weapon.skin); // changement du skin de l'arme déposée
                    this.player.weapon = weaponTemp; // mon player dépose son arme
                }
            }
        });
    }*/

}

const board = new Board();
board.generateBoard();
board.tours();