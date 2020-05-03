import Weapon from './weapons.js';

export default class Player {
    constructor(name, skin) {
        this.namePalyer = name;
        this.lifePoints = 100;
        this.weapon = new Weapon('weapons_scramasaxe', 10, 'weapons_scramasaxe', 'Scramasaxe');
        this.skin = skin;
        //this.bouclier = false;
        //this.victory = false;
    }

    insertPlayer(index) {
        $(`#c${index}`).addClass(this.skin);
    }
}