// https://pixijs.download/dev/docs/PIXI.Text.html
// https://pixijs.download/dev/docs/PIXI.ITextStyle.html
// https://pixijs.download/dev/docs/PIXI.HTMLText.html
// https://pixijs.download/dev/docs/PIXI.HTMLTextStyle.html
class Fuki extends PIXI.Text {
    constructor(text='', style={fontFamily:'IPAexゴシック', fontSize:24, fill:0xFF0000, align:'center', stroke:'#FFFF00'}) {
        // PIXI.Text
        super('', style)
        this.interactive = true
        this.onclick = (e)=>{this.text = ''; this.count = -1; this.delta = 0; this.count = 0; console.log('click'); }
        // Fuki
        this._text = text
        this.delta = 0
        this.fps = 15 // 15,30,60(Max 60)
        this.count = -1
        this.text = ''
        console.log(this.text)
    }
    talk(delta) { // app.ticker.add((delta)=>{}) 前フレームからの経過時間（60FPS(1/60s)を1としたときの比） https://qiita.com/geregeregere/items/832b263cca7fc1659e6b#%E3%82%B3%E3%83%BC%E3%83%AB%E3%83%90%E3%83%83%E3%82%AF%E9%96%A2%E6%95%B0%E3%81%AB%E6%B8%A1%E3%81%95%E3%82%8C%E3%82%8Bdelta
        //this.ms += delta * (1/60)
        this.delta += delta
        console.log(this.delta, delta)
        if (this.fps < this.delta) { return }
        this.delta -= this.fps
        if (this.count < this.text.Graphemes.length-1) {
            this.count += 1
            this.text = this.text + this._text[this.count]
        }
    }
}
