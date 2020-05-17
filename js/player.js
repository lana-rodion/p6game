import Weapon from './weapons.js';

export default class Player {
    constructor(name, skin) {
        this.name = name;
        this.lifePoints = 100;
        this.weapon = new Weapon('weapon_scramasaxe', 10, 'weapon_scramasaxe', 'Scramasaxe');
        this.skin = skin;
    }

    insertPlayer(index) {
        $(`#c${index}`).addClass(this.skin);
    }
}