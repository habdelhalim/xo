import { Cell, CellType } from '../../model/cell.js';
export class BoardComponent {
    constructor() {
        this.width = 400;
        this.height = 400;
        this.size = 3;
        this.cross = true;
        this.finished = false;
        this.canvas = document.getElementById('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.addEventListener('click', (event) => this.clicked(event));
        this.ctx = this.canvas.getContext('2d');
        this.createCells();
        this.render();
    }
    createCells() {
        this.cells = [];
        this.cellSize = this.width / this.size;
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                this.cells.push(new Cell(i * this.cellSize, j * this.cellSize, this.cellSize));
            }
        }
    }
    render() {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.cells
            .forEach(cell => cell.render(this.ctx));
    }
    clicked($event) {
        if (this.finished)
            return;
        const clickedCell = this.cells
            .filter(cell => cell.isClicked({ x: $event.clientX, y: $event.clientY }));
        clickedCell.forEach(cell => {
            this.cross = cell.change(this.ctx, this.cross);
        });
        this.checkWinner();
    }
    checkWinner() {
        const crosses = [];
        const circles = [];
        this.cells.forEach(cell => {
            switch (cell.type) {
                case CellType.CROSS:
                    crosses.push(cell);
                    break;
                case CellType.CIRCLE:
                    circles.push(cell);
                    break;
            }
        });
        let winner;
        if (this.checkLine(circles)) {
            winner = 'Circle';
        }
        if (this.checkLine(crosses)) {
            winner = 'Cross';
        }
        if (winner) {
            this.ctx.font = '30pt Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(winner + ' is the winner !!!', this.width / 2, this.height / 2);
            this.finished = true;
        }
        return;
    }
    checkLine(items) {
        const rows = {};
        const cols = {};
        for (let i = 0; i < items.length; i++) {
            const element = items[i];
            if (cols[element.x]) {
                cols[element.x].push(element);
            }
            else {
                cols[element.x] = [element];
            }
            if (cols[element.x].length >= 3)
                return true;
            if (rows[element.y]) {
                rows[element.y].push(element);
            }
            else {
                rows[element.y] = [element];
            }
            if (rows[element.y].length >= 3)
                return true;
            const cell1 = cols[element.x];
            const cell2 = cols[element.x - this.cellSize];
            const cell3 = cols[element.x - 2 * this.cellSize];
            if (cell1 && cell2 && cell3) {
                for (let i = 0; i < cell1.length; i++) {
                    for (let j = 0; j < cell2.length; j++) {
                        for (let k = 0; k < cell3.length; k++) {
                            if (cell2[j].y === cell1[i].y + this.cellSize && cell3[k].y === cell2[j].y + this.cellSize
                                || cell2[j].y === cell1[i].y - this.cellSize && cell3[k].y === cell2[j].y - this.cellSize)
                                return true;
                        }
                    }
                }
                return false;
            }
        }
        return false;
    }
}
//# sourceMappingURL=board.component.js.map