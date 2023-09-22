class Background extends PIXI.Graphics {
    constructor(width=800, height=600, color=0xafeeee) {
        super()
        this._width = width 
        this._height = height 
        this._color = color
    }
    draw(delta=0) { // https://qiita.com/geregeregere/items/bc60ffc22618bb2a711e
        this.beginFill(this._color)
        this.drawRect(0, 0, this._width, this._height);
        this.endFill();
    }
    get Width() { return this._width }
    get Height() { return this._height }
    get Color() { return this._color }
    set Width(v) { this._width = v }
    set Height(v) { this._height = v }
    set Color(v) { this._color = v }
}

