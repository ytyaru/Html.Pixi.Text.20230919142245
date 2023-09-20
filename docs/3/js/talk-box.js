// https://pixijs.download/dev/docs/PIXI.Text.html
// https://pixijs.download/dev/docs/PIXI.ITextStyle.html
// https://pixijs.download/dev/docs/PIXI.HTMLText.html
// https://pixijs.download/dev/docs/PIXI.HTMLTextStyle.html
class TalkBox extends PIXI.Container {
    constructor(text='', style={fontFamily:'IPAexゴシック', fontSize:24, fill:0xFF0000, align:'center', stroke:'#FFFF00', strokeThickness:4}, frameId=0) {
        // PIXI.Text
        super('', style)
        this._frame = new TalkFrame(frameId)
        this._text = new TalkText(text, style)
        this.addChild(this._frame)
        this.addChild(this._text)
    }
    get Frame() { return this._frame }
    get Text() { return this._text }
    draw(delta) {
        this._frame.draw(delta)
        this._text.draw(delta)
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
        this.fps = 7.5 // 15,30,60(Max 60)
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
}
class TalkFrame extends PIXI.Graphics {
    constructor(frameId) {
        // PIXI.Graphics
        super()
    }
    draw(delta) { // https://qiita.com/geregeregere/items/bc60ffc22618bb2a711e
        this.moveTo(0, 0);
//        this.lineStyle(3, 0x000000);
//        this.lineTo(100, 360);
//        this.lineStyle();

        this.lineStyle(3, 0x000000); // width, color, alpha, alignment, native
        this.beginFill(0x22aa22);
//        this.drawRect(10, 10, 180, 100);
        this.drawRoundedRect(10, 10, 320, 240, 20);
        this.endFill();
    }
}
