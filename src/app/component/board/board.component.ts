import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, AfterViewInit {
  width = 600;
  height = 600;

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>
  ctx: CanvasRenderingContext2D;

  constructor() { }

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  ngAfterViewInit(): void {
    this.ctx.fillRect(0, 0, 50, 50)
  }
}
