import { weapon1 } from "./weapons.js";

export default class Player {
    constructor(name) {
        this.name = name;
        this.weapon = weapon1;
        this.life = 100;
        this.currentCell = null;
        this.defense = false;
    }

    // Method to move player and change the previous cell property

    move(newCell) {
        this.currentCell.player = null;

        newCell.player = this;
        this.currentCell = newCell;

        $(".cell").removeClass("accessible");
        $(`.${this.name}`).removeClass(this.name);
        $(newCell.element).addClass(this.name);
    }

    // Method to exchange the player weapon for the cell weapon

    changeWeapon(player) {

        this.player = player;
        let playerWeapon = this.player.weapon;

        if (this.currentCell.weapon !== null) {
            this.currentCell.element.removeClass(this.currentCell.weapon.name);
            this.currentCell.element.addClass(playerWeapon.name);
            this.player.weapon = this.currentCell.weapon;
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

    /*
    * Method to give the choice of the player to attack or defend.
    * No player can escape, so the function remembers itself by reversing attacker
    * and target and those until the life of one of the players is less than or equal to 0
    */

    heroTarget(target) {
        this.target = target;

        $(`.${this.target.name}`).css("opacity", "0.5");
        $(`.${this.target.name}-attack-button, .${this.target.name}-defense-button`).off("click").css({visibility: "hidden"});
    }

    heroDefense() {
        this.defense = false;

        $(`.${this.name}-defense-button`).css("visibility", "visible").on("click", (e) => {
            this.defense = true;
            this.target.fight(this);
        });
    }

    // Game over Message
    //TO DO: $("$endGameModal").toggle();

    gameOver() {
        let player_percentage_life = "." + this.target.name + "-percentage-life";

        if (this.target.life <= 0) {
            $(player_percentage_life).text(`${this.target.name} a perdu le combat`).css({color: "red", fontWeight: "600"});

            $(`.${this.target.name}`).css("visibility", "hidden");
            $(".button-action").hide();
            alert(`${this.name} a gagné !\n\nRafraîchissez la page pour jouer une nouvelle partie !`);

        } else {
            $(player_percentage_life).text(`${this.target.life}%`);
        }
    }

    scoreLife() {

        // defense counts 50% damage less: this.weapon.damage / 2
        let lifeRemaining = (this.target.life -= this.target.defense ? this.weapon.damage / 2 : this.weapon.damage);

        // display barre-life and percentage-life
        $(`.${this.target.name}-barre-life`).css("width", `${lifeRemaining}%`);

        this.gameOver();
        this.target.fight(this);
    }

    fight(target) {
        this.defense = false;

        this.heroTarget(target);

        $(`.${this.name}`).css("opacity", "1");
        // attack-button : counts fight damages on click
        $(`.${this.name}-attack-button`).css({visibility: "visible"}).on("click", (e) => {
            this.scoreLife(target);
        });

        this.heroDefense(target);
    }
}

export let player1 = new Player("hero1");
export let player2 = new Player("hero2");
