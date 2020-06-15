import { weapon1 } from "./weapons.js";

class Player {
    constructor(name) {
        this.name = name;
        this.weapon = weapon1;
        this.life = 100;
        this.currentCell;
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

        $(`.${target.name}`).css("opacity", "0.5");
        $(`.${this.name}`).css("opacity", "1");

        $(`.${target.name}-attack-button`).off("click").css({visibility: "hidden", "box-shadow": "none", animation: "none"});
        $(`.${this.name}-attack-button`).css({visibility: "visible", "box-shadow": "1px 3px 4px rgb(80, 114, 135)", color: "#41385d", "background-color": "rgb(161, 226, 237)", animation: "bounceIn 2s 1"});

        $(`.${this.name}-attack-button`).on("click", e => {
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

        $(`.${target.name}-defense-button`).off("click").css({visibility: "hidden", "box-shadow": "none", animation: "none"});
        $(`.${this.name}-defense-button`).css({"box-shadow": "1px 3px 4px rgb(80, 114, 135)", color: "#41385d", "background-color": "rgb(161, 226, 237)", animation: "bounceIn 2s 1"});
        $(`.${this.name}-defense-button`).css("visibility", "visible").on("click", e => {
            this.defense = true;
            target.fight(this);
        });
    }
}

export let player1 = new Player("hero1");
export let player2 = new Player("hero2");
