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

    set name(name) {
        this._name = name;
    }
    get name() {
        return this._name;
    }

    set damage(damage) {
        this._damage = damage;
    }
    get damage() {
        return this._damage;
    }

    insertWeapon(index) {
        $(`#c${index}`).addClass(this.skin);
    }
}