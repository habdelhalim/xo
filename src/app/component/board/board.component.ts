import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Cell, CellType } from 'src/app/model/cell';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, AfterViewInit {
  width = 400;
  height = 400;
  size = 3;
  cross: boolean = true;

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>
  ctx: CanvasRenderingContext2D;
  cells: Cell[];

  constructor() { }

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.createCells();
  }

  createCells() {
    this.cells = [];
    const cellSize = this.width / this.size;
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this.cells.push(new Cell(i * cellSize, j * cellSize, cellSize));
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
    const clickedCell: Cell[] = this.cells
      .filter(cell => cell.isClicked({ x: $event.clientX, y: $event.clientY }));

    clickedCell.forEach(cell => {
      this.cross = cell.change(this.ctx, this.cross);
    });

    this.checkWinner();
  }

  checkWinner() {
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

    if (this.checkLine(circles)) {
      console.log('circles wins!!!!')
    }

    if (this.checkLine(crosses)) {
      console.log('crosses wins!!!!')
    }
    console.log('crosses: ', crosses.length, ' circles: ', circles.length);
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
    }

    return false;
  }
}
