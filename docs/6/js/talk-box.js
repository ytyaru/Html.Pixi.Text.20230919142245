// https://pixijs.download/dev/docs/PIXI.Text.html
// https://pixijs.download/dev/docs/PIXI.ITextStyle.html
// https://pixijs.download/dev/docs/PIXI.HTMLText.html
// https://pixijs.download/dev/docs/PIXI.HTMLTextStyle.html
class TalkBox extends PIXI.Container {
    constructor(text='', style={fontFamily:'IPAexゴシック', fontSize:24, letterSpacing:24*0.05, lineHeight:24*1.70, fill:0xFF0000, align:'left', stroke:'#FFFF00', strokeThickness:4}, frameId=0) {
        // PIXI.Text
        super('', style)
        //this._frame = new TalkFrame(frameId)
        this._frame = new TalkBalloon(frameId)
        this._text = new TalkText(text, style)
        this.#setPos()
        this.#setFrameSize()
        this.addChild(this._frame)
        this.addChild(this._text)
        this._frame.draw(0)
    }
    get Frame() { return this._frame }
    get Text() { return this._text }
    draw(delta) {
//        this._frame.draw(delta)
        this._text.draw(delta)
    }
    #setPos() {
        this._frame.x = this._frame.LineWidth // frameのlineWidth
        this._frame.y = this._frame.LineWidth // frameのlineWidth
        this._text.x = this._frame.LineWidth + (this._frame.Radius / 2) + this._frame.TipWidth // frameのradian/2
        this._text.y = this._frame.LineWidth + (this._frame.Radius / 2) // frameのradian/2
    }
    #setFrameSize() {
        this._frame.Width = this._text.AllTextSize.width
        this._frame.Height = this._text.AllTextSize.height
    }
}
class TalkText extends PIXI.Text {
    constructor(text='', style={fontFamily:'IPAexゴシック', fontSize:24, fill:0xFF0000, align:'center', stroke:'#FFFF00', strokeThickness:4}) {
        // PIXI.Text
        super('', style)
        this.interactive = true
        this.onclick = (e)=>{this.text = ''; this.count = -1; this.delta = 0; console.log('click'); }
        // Fuki
        this._allText = text
        this.delta = 0
        this.fps = 2.5 // 15,30,60(Max 60)
        this.count = -1
        this.text = ''
        console.log(`TalkText ${this.x}, ${this.y}, ${this._width}, ${this._height}, ${this.getLocalBounds()}`)
    }
    draw(delta) { // app.ticker.add((delta)=>{}) 前フレームからの経過時間（60FPS(1/60s)を1としたときの比） https://qiita.com/geregeregere/items/832b263cca7fc1659e6b#%E3%82%B3%E3%83%BC%E3%83%AB%E3%83%90%E3%83%83%E3%82%AF%E9%96%A2%E6%95%B0%E3%81%AB%E6%B8%A1%E3%81%95%E3%82%8C%E3%82%8Bdelta
        //this.ms += delta * (1/60)
        this.delta += delta
        if (this.delta < this.fps) { return }
        this.delta -= this.fps
        if (this.count < this._allText.Graphemes.length-1) {
            this.count += 1
            this.text = this.text + this._allText[this.count]
            console.log(`TalkText ${this.x}, ${this.y}, ${this._width}, ${this._height}, ${this.getLocalBounds()}`)
        }
    }
    get AllTextSize() { return PIXI.TextMetrics.measureText(this._allText, this.style) }
    get TextSize() { return this.getLocalBounds() }
    //get TextSize() { return PIXI.TextMeasure(this.text, this.style) }
}
class TalkFrame extends PIXI.Graphics {
    constructor(frameId) {
        // PIXI.Graphics
        super()
        this._lineWidth = 4
        this._radius = 20
        this._x = 0
        this._y = 0
        this._width = 0
        this._height = 0
    }
    draw(delta=0) { // https://qiita.com/geregeregere/items/bc60ffc22618bb2a711e
        this.lineStyle(this._lineWidth, 0x000000); // width, color, alpha, alignment, native
        this.beginFill(0x22aa22, 0.3); // color, alpha
        //this.drawRoundedRect(this._lineWidth, this._lineWidth, 320+this._lineWidth, 240+this._lineWidth, this._radius);
        //this.drawRoundedRect(0, 0, 320, 240, this._radius);
        this.drawRoundedRect(this._x, this._y, 
            this._width + (this._lineWidth * 2) + (this._radius / 2), 
            this._height + (this._lineWidth * 2) + (this._radius / 2), this._radius);
        this.endFill();
    }
    get LineWidth() { return this._lineWidth }
    get Radius() { return this._radius }
    set Width(v) { this._width = v }
    set Height(v) { this._height = v }
    set X(v) { this._x = v }
    set Y(v) { this._y = v }
}
class TalkBalloon extends PIXI.Graphics {
    constructor(frameId) {
        // PIXI.Graphics
        super()
        this._lineWidth = 4
        this._radius = 20
        this._x = 0
        this._y = 0
        this._width = 0
        this._height = 0
        this._tipWidth = 100 // 口元の長さ
    }
    draw(delta=0) { // https://qiita.com/geregeregere/items/bc60ffc22618bb2a711e
        // 枠
        this.beginFill(0x22aa22, 0.3); // color, alpha
        this.drawRoundedRect(this._x + this._tipWidth, this._y, 
            this._width + (this._lineWidth * 2) + (this._radius / 2), 
            this._height + (this._lineWidth * 2) + (this._radius / 2), this._radius);
        this.endFill();
        // 口元
        this.beginFill(0x22aa22, 0.3);
        this.drawPolygon([this._x,63, this._x + this._tipWidth,50, this._x + this._tipWidth,75]);
        this.endFill();
    }
    get TipWidth() { return this._tipWidth }
    get LineWidth() { return this._lineWidth }
    get Radius() { return this._radius }
    set Width(v) { this._width = v }
    set Height(v) { this._height = v }
    set X(v) { this._x = v }
    set Y(v) { this._y = v }
}
