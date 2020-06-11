export let weapons = [];

class Weapon {
    constructor(name, damage) {
        this.name = name;
        this.damage = damage;
    }
}

let weapon2 = new Weapon("sword", 15);
let weapon3 = new Weapon("axe", 30);
let weapon4 = new Weapon("hammer", 40);
export let weapon1 = new Weapon("scramasaxe", 10);

weapons.push(weapon2, weapon3, weapon4);