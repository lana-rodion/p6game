import Cell from "./cell.js";

export default class Board {
    constructor(player1, player2, weapons) {
        this.weapons = weapons;
        this.player1 = player1;
        this.player2 = player2;
    }

    // Method to create the grid : define cell coordinates, to push its in columns and row with for loop

    createGrid(width, height) {
        this.width = width;
        this.height = height;
        this.cells = [];
        for (let column = 0; column < width; column++) {
            let columnArr = [];
            for (let row = 0; row < height; row++) {
                let cellDiv = $(`<div class='cell' id='cell-c${column}-r${row}' data-x='${column}' data-y='${row}'></div>`);
                let cell = new Cell(column, row, cellDiv);
                columnArr.push(cell);
                $("#board").append(cellDiv);
            }
            this.cells.push(columnArr);
        }

        this.players(); // method called to place players on the Grid
        this.obstacles(); // method called to place obstacle on the Grid
        this.weaponsArr(); // method called to place obstacle on the Grid
    }

    // Method to generate random integer calculated with min, max

    randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    // Method to return random cell with coordinates x and y, called randomNumber(0, this.width)

    randomCell() {
        let x = this.randomNumber(0, this.width);
        let y = this.randomNumber(0, this.height);

        // test security activeObj[parseInt(index)]
        return this.cells[parseInt(x)][parseInt(y)];
    }

    players() {
        this.randomPlayers(this.player1);
        this.randomPlayers(this.player2);
    }

    // Method to place random player in random cell doing recursive call this.randomPlayers(player) after previous verification:
    // call the getAdjacentCells(cell) to verify if adjacent Cells and the cell of player placement are not occupied by other player

    randomPlayers(player) {
        let cell = this.randomCell();
        let adjacentCells = this.getAdjacentCells(cell);
        let adjacentPlayer = adjacentCells.filter((adjacentCell) => adjacentCell.player !== null);
        if (adjacentPlayer.length === 0 && cell.player === null) {
            cell.player = player;
            cell.element.addClass(player.name);
            player.currentCell = cell;
        } else {
            this.randomPlayers(player);
        }
    }

    // Method to calculate average number of obstacles based on the number of cells in the game grid
    // It inserts the obstacle in random Free Cell and add class css "obstacle" to this cell

    obstacles() {
        let averageObstacles = Math.floor(
            (this.width * this.height) / ((this.width + this.height) / 2)
        );
        for (let obstacles = 0; obstacles < averageObstacles; obstacles++) {
            let cell = this.randomFreeCell();
            cell.obstacle = true;
            cell.element.addClass("obstacle");
        }
    }

    // Method executed on each element of the weapons array to place the weapon in the random Free Cell
    //This method gives the weapon property weapon.name of the cells containing them

    weaponsArr() {
        this.weapons.forEach((weapon) => {
            let cell = this.randomFreeCell();
            cell.weapon = weapon;
            cell.element.addClass(`${weapon.name}`);
        });
    }

    // Method to return a free cell (without obstacle, weapon, player)

    randomFreeCell() {
        let cell = this.randomCell();
        if (!cell.obstacle && cell.player === null && cell.weapon === null) {
            return cell;
        } else {
            return this.randomFreeCell();
        }
    }

    // This method returns all the cases adjacent to a cell

    getAdjacentCells(cell) {
        let adjacentCells = [];
        if (cell.x + 1 < this.width) {
            adjacentCells.push(this.cells[cell.x + 1][cell.y]);
        }
        if (cell.x - 1 >= 0) {
            adjacentCells.push(this.cells[cell.x - 1][cell.y]);
        }
        if (cell.y + 1 < this.height) {
            adjacentCells.push(this.cells[cell.x][cell.y + 1]);
        }
        if (cell.y - 1 >= 0) {
            adjacentCells.push(this.cells[cell.x][cell.y - 1]);
        }
        return adjacentCells;
    }

    // Method to verify with parameters (x, y) if this cell exists

    cellExist(x, y) {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }

    // This method returns an array of the accessible cells
    // using the direction indicated in parameter (horizontal / vertical / + 1 / -1)

    getAccessibleCellsInDirection(cell, nbOfAccessCell, horizontal, direction) {
        let accessibleCells = [];

        let self = this;

        for (let i = 1; i <= nbOfAccessCell; i++) {
            // using ternary operator : condition ? expression_1 : expression_2
            let x = cell.x + (horizontal ? direction * i : 0);
            let y = cell.y + (horizontal ? 0 : direction * i);

            if (self.cellExist(x, y) && self.cells[parseInt(x)][parseInt(y)].isFree()) {
                accessibleCells.push(self.cells[parseInt(x)][parseInt(y)]);
            }
            /*if (this.cellExist(x, y) && this.cells[parseInt(x)][parseInt(y)].isFree()) {
                accessibleCells.push(this.cells[parseInt(x)][parseInt(y)]);
            } else {
                break;
            }*/
        }
        return accessibleCells;
    }

    // This method is called in the game object of the Game class
    // Method to concat accessibleCells array in order to return all the cells accessible by the player

    getAccessibleCells(cell, nbOfAccessCell) {
        let accessibleCells = [];

        accessibleCells = accessibleCells.concat(
            this.getAccessibleCellsInDirection(cell, nbOfAccessCell, true, 1)
        );
        accessibleCells = accessibleCells.concat(
            this.getAccessibleCellsInDirection(cell, nbOfAccessCell, true, -1)
        );
        accessibleCells = accessibleCells.concat(
            this.getAccessibleCellsInDirection(cell, nbOfAccessCell, false, 1)
        );
        accessibleCells = accessibleCells.concat(
            this.getAccessibleCellsInDirection(cell, nbOfAccessCell, false, -1)
        );

        accessibleCells.forEach((accessibleCells) => (accessibleCells.element.addClass("accessible"))
        );
    }
}
