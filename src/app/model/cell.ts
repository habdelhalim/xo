export class Cell {
    color: string;

    constructor(private x: number, private y: number, private size: number) {
        this.color = 'rgba(' + this.x + ', ' + this.y + ', 20, 1)';
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.save()
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size - 1, this.size - 1);
        ctx.restore()
    }

    isClicked(pos: { x: number, y: number }): boolean {
        if (pos.x > this.x && pos.x < this.x + this.size
            && pos.y > this.y && pos.y < this.y + this.size) {
            return true;
        }

        return false;
    }

    change(ctx: CanvasRenderingContext2D): void {
        this.color = '#fff'
        this.render(ctx)
    }
}
