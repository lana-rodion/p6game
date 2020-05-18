export default class Weapon {
    constructor(name, damage, skin, display) {
        this.name = name;
        this.damage = damage;
        this.skin = skin;
        this.display = display;
    }

    set skin(skin) {
        this._skin = skin;
    }
    get skin() {
        return this._skin;
    }

    /*set damage(damage) {
        this._damage = damage;
    }}*/

    insertWeapon(index) {
        $(`#c${index}`).addClass(this.skin);
    }
}