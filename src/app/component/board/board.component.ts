import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Cell, CellType } from 'src/app/model/cell';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, AfterViewInit {
  width = 500;
  height = 500;
  size = 3;
  cross: boolean = true;
  finished: boolean = false;

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>
  ctx: CanvasRenderingContext2D;
  cells: Cell[];
  cellSize: number;

  constructor() { }

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.createCells();
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

  ngAfterViewInit(): void {
    this.render()
  }

  render() {
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.width, this.height)
    this.cells
      .forEach(cell => cell.render(this.ctx));
  }

  clicked($event) {
    if (this.finished)
      return;

    const clickedCell: Cell[] = this.cells
      .filter(cell => cell.isClicked({ x: $event.clientX, y: $event.clientY }));

    clickedCell.forEach(cell => {
      this.cross = cell.change(this.ctx, this.cross);
    });

    this.checkWinner();
  }

  checkWinner(): void {
    const crosses = []
    const circles = []

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

  private checkLine(items: any[]): boolean {
    const rows = {}
    const cols = {}
    for (let i = 0; i < items.length; i++) {
      const element = items[i];
      if (cols[element.x]) {
        cols[element.x]++;
      } else {
        cols[element.x] = 1;
      }

      if (cols[element.x] >= 3)
        return true;

      if (rows[element.y]) {
        rows[element.y]++;
      } else {
        rows[element.y] = 1;
      }

      if (rows[element.y] >= 3)
        return true;

      if (cols[element.x] >= 1 && cols[element.x - this.cellSize] >= 1 && cols[element.x - 2 * this.cellSize] >= 1
        && rows[element.y] >= 1 && rows[element.y - this.cellSize] >= 1 && rows[element.y - 2 * this.cellSize] >= 1) {
        return true;
      }

      if (cols[element.x] >= 1 && cols[element.x - this.cellSize] >= 1 && cols[element.x - 2 * this.cellSize] >= 1
        && rows[element.y] >= 1 && rows[element.y + this.cellSize] >= 1 && rows[element.y + 2 * this.cellSize] >= 1) {
        return true;
      }
    }

    return false;
  }
}
