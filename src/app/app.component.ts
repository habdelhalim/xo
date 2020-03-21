import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BoardComponent } from './component/board/board.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'xo';

  @ViewChild(BoardComponent, { static: true })
  board: BoardComponent;
  
  constructor() {

  }

  ngOnInit(): void {
  }



}
