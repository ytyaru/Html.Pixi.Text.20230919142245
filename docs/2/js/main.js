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
    const sentence = 'Hello pixi.js !!\nこんにちはPixiJS！\nテキストをクリックしてね。\n１字ずつ表示されるよ。'
    const style = {fontFamily:'IPAexゴシック', fontSize:24, fill:0xFF0000, align:'center', stroke:'#FFFF00'}
    // https://pixijs.download/dev/docs/PIXI.Text.html
    // https://pixijs.download/dev/docs/PIXI.ITextStyle.html
    const text = new PIXI.Text('', style)
    //app.stage.addChild(text);

    let count = -1
    app.ticker.add((delta)=>{
        if (count < sentence.Graphemes.length-1) { count += 1 }
        else { return }
        text.text = text.text + sentence[count]
    });
    //text.on('click', (e)=>{count = -1; console.log('click');})
//    text.onclick = (e)=>{count = -1; console.log('click');}
    text.interactive = true
    text.onclick = (e)=>{text.text = ''; count = -1; console.log('click'); }
    app.stage.addChild(text);
//    app.stage.onclick = (e)=>{console.log('click')}
//    app.onclick = (e)=>{console.log('click')}
    //app.ticker.add((delta) => (text.text = text.text + 'a' ));
});
window.addEventListener('beforeunload', async(event) => {
    console.log('beforeunload!!');
});

