import { weapon1 } from "./weapons.js";

class Player {
    constructor(name) {
        this.name = name;
        this.weapon = weapon1;
        this.life = 100;
        this.currentCell = null;
        this.defense = false;
    }

    // Getter

    // Setter

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
        let playerWeapon = player.weapon;

        if (this.currentCell.weapon !== null) {
            this.currentCell.element.removeClass(this.currentCell.weapon.name);
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

    /*
    * Method to give the choice of the player to attack or defend.
    * No player can escape, so the function remembers itself by reversing attacker
    * and target and those until the life of one of the players is less than or equal to 0
    */

    heroTarget(target) {

        $(`.${target.name}`).css("opacity", "0.5");
        $(`.${target.name}-attack-button`).off("click").css({visibility: "hidden"});
    }

    heroDefense(target) {
        this.defense = false;

        $(`.${target.name}-defense-button`).off("click").css({visibility: "hidden"});

        $(`.${this.name}-defense-button`).css("visibility", "visible").on("click", (e) => {
            this.defense = true;
            target.fight(this);
        });
    }

    //$(`.fight-btn, .fight-btn_attack, .fight-btn_defence`).css("visibility", "hidden");
    // hero1-button-action hero2-button-action

    // TO DO: Game over Modal

    scoreLife(target) {

        // defense counts 50% damage less: this.weapon.damage / 2
        let lifeRemaining = (target.life -= target.defense ? this.weapon.damage / 2 : this.weapon.damage);

        // display barre-life and percentage-life
        $(`.${target.name}-barre-life`).css("width", `${lifeRemaining}%`);

        if (target.life <= 0) {
            $(`.${target.name}-percentage-life`).text(`${target.name} a perdu le combat`).css({color: "red", fontWeight: "600"});
            $(`.${target.name}`).css("visibility", "hidden");
            $(`.button-action`).hide();

            // TO PLACE HERE: Game over Modal
        } else {
            $(`.${target.name}-percentage-life`).text(`${target.life}%`);
        }
        target.fight(this);
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
