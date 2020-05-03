 export default class Weapon {
    constructor(name, damage, skin, display) {
        this.name = name;
        this.damage = damage;
        this.skin = skin;
        this.display = display;
    }

    insertWeapon(index) {
        $(`#c${index}`).addClass(this.skin);
    }
}