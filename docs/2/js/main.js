window.addEventListener('DOMContentLoaded', async(event) => {
    console.log('DOMContentLoaded!!');
    const app = new PIXI.Application({
        width: 800,
        height: 600,
        view: document.getElementById('pixi-canvas'),
        resolution: window.devicePixelRatio || 1,
        autoResize: true,
        backgroundColor: 0xafeeee,
    });
    /*
    const sentence = 'Hello pixi.js !!\nこんにちはPixiJS！\nテキストをクリックしてね。\n１字ずつ表示されるよ。'
    const style = {fontFamily:'IPAexゴシック', fontSize:24, fill:0xFF0000, align:'center', stroke:'#FFFF00', strokeThickness:4}
    // https://pixijs.download/dev/docs/PIXI.Text.html
    // https://pixijs.download/dev/docs/PIXI.ITextStyle.html
    const text = new PIXI.Text('', style)
    //app.stage.addChild(text);

    //app.ticker.maxFPS = 15;
    let count = -1
    app.ticker.add((delta)=>{// delta:前Frameからの経過時間(1/60sを1としたときの比) https://qiita.com/nanohanabuttobasu/items/94de586d06445a03a6bb
        console.log(delta)
        if (count < sentence.Graphemes.length-1) { count += 1 }
        else { return }
        text.text = text.text + sentence[count]
    });
    //text.on('click', (e)=>{count = -1; console.log('click');})
//    text.onclick = (e)=>{count = -1; console.log('click');}
    text.interactive = true
    text.onclick = (e)=>{text.text = ''; count = -1; console.log('click'); }
    app.stage.addChild(text);
    */
    const text = 'Hello pixi.js !!\nこんにちはPixiJS！\n吹き出しです。\nテキストをクリックしてね。\n１字ずつ表示されるよ。'
    const fuki = new Fuki(text)
    app.ticker.add((delta)=>{
        fuki.talk(delta)
    });
    app.stage.addChild(fuki);
//    app.stage.onclick = (e)=>{console.log('click')}
//    app.onclick = (e)=>{console.log('click')}
    //app.ticker.add((delta) => (text.text = text.text + 'a' ));
});
window.addEventListener('beforeunload', async(event) => {
    console.log('beforeunload!!');
});

