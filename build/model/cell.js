export var CellType;
(function (CellType) {
    CellType[CellType["CIRCLE"] = 0] = "CIRCLE";
    CellType[CellType["CROSS"] = 1] = "CROSS";
})(CellType || (CellType = {}));
export class Cell {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.clicked = false;
    }
    render(ctx) {
        ctx.save();
        switch (this.type) {
            case CellType.CROSS:
                ctx.strokeStyle = '#000';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x + this.size, this.y + this.size);
                ctx.moveTo(this.x, this.y + this.size);
                ctx.lineTo(this.x + this.size, this.y);
                ctx.closePath();
                ctx.stroke();
                break;
            case CellType.CIRCLE:
                ctx.strokeStyle = '#f00';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(this.x + this.size / 2, this.y + this.size / 2, this.size / 2, 0, Math.PI * 2);
                ctx.closePath();
                ctx.stroke();
                break;
            default:
                ctx.fillStyle = '#fff';
                ctx.fillRect(this.x + 1, this.y + 1, this.size - 2, this.size - 2);
                break;
        }
        ctx.restore();
    }
    isClicked(pos) {
        if (pos.x > this.x && pos.x < this.x + this.size
            && pos.y > this.y && pos.y < this.y + this.size) {
            return true;
        }
        return false;
    }
    change(ctx, isCross) {
        if (this.clicked)
            return isCross;
        this.clicked = true;
        this.type = isCross ? CellType.CROSS : CellType.CIRCLE;
        this.render(ctx);
        return !isCross;
    }
}
//# sourceMappingURL=cell.js.map