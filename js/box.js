class Case {
    constructor(index) {
        this.index = index;
        this.obstacle = false;
        this.weapon = null;
        this.player = null;
    }

    changeColor(color) {
        $(`#c${this.index}`).addClass(color);
    }

    addObstacle() {
        this.obstacle = true;
    }

    set weapon(weapon) {
        this.weapon = weapon;
    }

    set player(player) {
        this.player = player;
    }
}