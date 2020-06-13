import { weapon1 } from "./weapons.js";

class Player {
    constructor(name) {
        this.name = name;
        this.weapon = weapon1;
        this.life = 100;
        this.currentCell;
        this.defense = false;
    }
}

export let player1 = new Player("hero1");
export let player2 = new Player("hero2");
