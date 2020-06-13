import { weapon1 } from "./weapons.js";

class Player {
    constructor(name) {
        this.name = name;
        this.weapon = weapon1;
        this.life = 100;
        this.currentCell;
        this.defense = false;
    }

    /* Cette méthode change la propriété player de l'ancienne et de la nouvelle case et modifie aussi le DOM pour la partie visuelle */
    move(newCell) {
        this.currentCell.player = null;
        newCell.player = this;
        this.currentCell = newCell;
        $(".cell").removeClass("accessible");
        $(`.${this.name}`).removeClass(this.name);
        $(newCell.element).addClass(this.name);
    }

    /* Cette méthode interverti l'arme d'une case avec celle du joueur. Les propriétés weapon de la case et du joueur sont ainsi modifié ainsi que le DOM */
    changeWeapon(player) {
        let playerWeapon = player.weapon;
        if (this.currentCell.weapon !== null) {
            this.currentCell.element
                .removeClass(this.currentCell.weapon.name)
                .removeClass("weapon-effect");
            this.currentCell.element.addClass(playerWeapon.name);
            player.weapon = this.currentCell.weapon;
            this.currentCell.weapon = playerWeapon;
        }
    }

    isPlayerAround(cellsAround) {
        for (let cell of cellsAround) {
            if (cell.player !== null) {
                return true;
            }
        }
        return false;
    }
}

export let player1 = new Player("hero1");
export let player2 = new Player("hero2");
