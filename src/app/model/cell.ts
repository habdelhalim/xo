export enum CellType {
    CIRCLE, CROSS
}

export class Cell {
    type: CellType;
    private clicked: boolean = false;

    constructor(public x: number, public y: number, private size: number) {
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.save();
        
        switch (this.type) {
            case CellType.CROSS:
                ctx.strokeStyle = '#000';
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x + this.size, this.y + this.size);
                ctx.moveTo(this.x, this.y + this.size);
                ctx.lineTo(this.x + this.size, this.y);
                ctx.closePath();
                ctx.stroke()
                break;

            case CellType.CIRCLE:
                ctx.strokeStyle = '#f00';
                ctx.beginPath();
                ctx.arc(this.x + this.size / 2, this.y + this.size / 2, this.size / 2, 0, Math.PI * 2);
                ctx.closePath();
                ctx.stroke();
                break;

            default:
                ctx.fillStyle = '#fff';
                ctx.fillRect(this.x, this.y, this.size, this.size);
                break;
        }

        ctx.restore();
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
        this.render(ctx)

        return !isCross;
    }
}
