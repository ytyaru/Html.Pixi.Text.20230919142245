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
    console.log('aaaaaaaaaaaaaaa')
    const text = 'Hello pixi.js !!\nこんにちはPixiJS！\n吹き出しです。\nテキストをクリックしてね。\n１字ずつ表示されるよ。'
    const talkBox = new TalkBox(text)
    const bg = new Background(app.width, app.height, app.backgroundColor)
    app.ticker.add((delta)=>{
        bg.draw()
        talkBox.draw(delta)
    });
    app.stage.addChild(bg)
    app.stage.addChild(talkBox)
});
window.addEventListener('beforeunload', async(event) => {
    console.log('beforeunload!!');
});
