import { weapon1 } from "./weapons.js";

export default class Player {
    constructor(name) {
        this.name = name;
        this.weapon = weapon1;
        this.life = 100;
        this.currentCell = null;
        this.defense = false;
    }

    // Getter
    /*getLife() {
        return this._life;
    }*/

    // Setter
    /*setLife(newLifePoints) {
        if (newLifePoints < 0) {
            newLifePoints = 0;
        }
        this._life = newLifePoints;
    }*/

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
    fight(target) {
        this.defense = false;
        $(`.belt-${this.name}`).css("visibility", "hidden");
        $(`.${target.name}`).css("opacity", "0.5");
        $(`.${target.name}-attack-button`)
            .off("click")
            .css({
                visibility: "hidden",
                "box-shadow": "none",
                animation: "none"
            });
        $(`.${this.name}`).css("opacity", "1");
        $(`.${this.name}-attack-button`)
            .css({
                visibility: "visible",
                "box-shadow": "0px 5px 5px #764462",
                color: "#2c2137",
                "background-color": "#edb4a1",
                animation: "bounceIn 2s 1"
            })
            .on("click", e => {
                let lifeRemaining = (target.life -= target.defense
                    ? this.weapon.damage / 2
                    : this.weapon.damage);
                $(`.${target.name}-barre-life`).css("width", `${lifeRemaining}%`);
                $(`.${target.name}-percentage-life`).text(`${target.life}%`);
                if (target.life <= 0) {
                    $(`.${target.name}`).css("visibility", "hidden");
                    $("#endGameModal").modal({
                        backdrop: "static",
                        keyboard: false
                    });
                    $(".modal-body").text(
                        `${this.name} and his ${
                            this.weapon.name
                        } weapon win the battle of heroes!`
                    );
                    $(".modal-body").prepend(
                        `<div class='${this.name} standard-size-img'></div>`
                    );
                    $(".modal-body").append(
                        `<div class='battle standard-size-img'></div>`
                    );
                    $(".reload, .close").click(function() {
                        location.reload();
                    });
                }
                target.fight(this);
            });

        $(`.${target.name}-defense-button`)
            .off("click")
            .css({
                visibility: "hidden",
                "box-shadow": "none",
                animation: "none"
            });
        $(`.${this.name}-defense-button`)
            .css({
                "box-shadow": "0px 5px 5px #764462",
                color: "#2c2137",
                "background-color": "#edb4a1",
                animation: "bounceIn 2s 1"
            })

            .css("visibility", "visible")
            .on("click", e => {
                this.defense = true;
                $(`.belt-${this.name}`).css("visibility", "visible");
                target.fight(this);

                console.log("target.fight(this) : " + target.fight(this));
            });
    }
}

export let player1 = new Player("hero1");
export let player2 = new Player("hero2");
