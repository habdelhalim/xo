export enum CellType {
    CIRCLE, CROSS
}

export class Cell {
    color: string;
    type: CellType;
    private clicked: boolean = false;

    constructor(public x: number, public y: number, private size: number) {
        this.color = '#fff';
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.save()
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.restore()
    }

    isClicked(pos: { x: number, y: number }): boolean {
        if (pos.x > this.x && pos.x < this.x + this.size
            && pos.y > this.y && pos.y < this.y + this.size) {
            return true;
        }

        return false;
    }

    change(ctx: CanvasRenderingContext2D, isCross: boolean): boolean {
        if (this.clicked)
            return isCross;

        this.clicked = true;
        this.type = isCross ? CellType.CROSS : CellType.CIRCLE;
        if (isCross)
            this.color = '#000'
        else
            this.color = '#eee'

        this.render(ctx)
        return !isCross;
    }
}
