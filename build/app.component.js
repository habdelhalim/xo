import { BoardComponent } from './component/board/board.component.js';
export class AppComponent {
    constructor() {
        this.title = 'xo';
        console.log('constructed');
        this.board = new BoardComponent();
    }
}
//# sourceMappingURL=app.component.js.map