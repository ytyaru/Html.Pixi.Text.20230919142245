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
    // https://pixijs.download/dev/docs/PIXI.Text.html
    const text = new PIXI.Text(
        'Hello world !!\nこんにちは世界！\nMy name is An.', 
        {fontFamily:'IPAexゴシック', fontSize:24, fill:0x101010, align:'center'});
//    text.anchor.set(0.5);
//    text.x = 140 + 160 * i;
//    text.y = 300;
    app.stage.addChild(text);
});
window.addEventListener('beforeunload', async(event) => {
    console.log('beforeunload!!');
});

