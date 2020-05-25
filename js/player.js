import Weapon from "./weapons.js";

export default class Player {
    constructor(name, skin) {
        this.name = name;
        this.vie = 100;
        this._weapon = new Weapon("weapon_scramasaxe", 10, "weapon_scramasaxe", "Scramasaxe");
        this._skin = skin;
    }

    insertPlayer(index) {
        $(`#c${index}`).addClass(this._skin);
    }

    movementPlayer(oldIndex, newIndex) {
        $(`#c${oldIndex}`).removeClass(this.skin);
        $(`#c${newIndex}`).addClass(this.skin);
    }
}
