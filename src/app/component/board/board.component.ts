import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Cell } from 'src/app/model/cell';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, AfterViewInit {
  width = 600;
  height = 600;
  size = 10;
  cellSize = 50;

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
    this.cells
      .forEach(cell => cell.render(this.ctx));
  }

  clicked($event) {
    const clickedCell: Cell[] = this.cells
      .filter(cell => cell.isClicked({ x: $event.clientX, y: $event.clientY }));

    clickedCell.forEach(cell => cell.change(this.ctx));
  }
}
