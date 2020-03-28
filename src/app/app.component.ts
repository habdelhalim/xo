import { BoardComponent } from './component/board/board.component.js';

export class AppComponent {
  title = 'xo';

  board: BoardComponent;
  
  constructor() {
      console.log('constructed');
      this.board = new BoardComponent();
  }

}
