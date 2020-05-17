export default class Case {
    constructor(index) {
        this.index = index;
        this._obstacle = false;
        this._weapon = null;
        this._player = null;
    }

    changeColor(color) {
        $(`#c${this.index}`).addClass(color);
    }

    addObstacle() {
        this._obstacle = true;
    }

    set weapon(weapon) {
        this._weapon = weapon;
    }

    get weapon(){
        return this._weapon;
    }

    set player(player) {
        this._player = player;
    }

    get player() {
        return this._player;
    }
}