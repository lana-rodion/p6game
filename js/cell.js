export default class Cell {
    constructor(x, y, element) {
        this.x = x;
        this.y = y;
        this.element = element;
        this.obstacle = false;
        this.player = null;
        this.weapon = null;
    }

    /* On verifie que la case en question n'est pas occupé par un obstacle / joueur */
    isFree() {
        return this.player == null && !this.obstacle;
    }
}