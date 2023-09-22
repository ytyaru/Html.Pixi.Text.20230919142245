window.addEventListener('DOMContentLoaded', async(event) => {
    console.log('DOMContentLoaded!!');
    const app = new PIXI.Application({
        width: 800,
        height: 1600,
        view: document.getElementById('pixi-canvas'),
        resolution: window.devicePixelRatio || 1,
        autoResize: true,
        backgroundColor: 0xafeeee,
    });
    const html = `✖改行コードによる改行
<br>
✖改行コード\\nによる改行\n\n
<br>
○br要素による改行<br>
○br要素/付による改行<br/>
<br>
○ruby <ruby>漢字<rt>かんじ</rt></ruby>のようなルビ振り<br>
○small<small>著作権表示など</small><br>
△address<address>連絡先</address>
○q<q>引用</q><br>
○code<code>ソースコード source-code</code><br>
<br>
○em<em style="font-style: normal;-webkit-text-emphasis: dot;text-emphasis: dot;">強調表示</em>（style属性値でtext-emphasis設定可）<br>
△em<em>強調表示</em>（CSSの<code>text-emphasis</code>設定は反映されず）<br>
○strong<strong>重要表示</strong><br>
○mark<mark>マーク</mark><br>
○<b>太字</b>、<i>イタリック</i>、<u>下線</u>、<del>取り消し線</del>、<font style="color:#FF0000">font要素</font><br>
○time <time datetime="2000-01-01">2000年1月1日</time>
<br>
<h1>見出し１</h1>
<ul><li>リスト要素１</li><li>リスト要素２</li></ul>
<table border="1" style="border-collapse:collapse"><caption>表１</caption>
<tr><th>項目A</th><th>項目B</th></tr>
<tr><td>値A</td><td>値B</td></tr></table>
<br>
✖img画像
<img src="https://placehold.jp/300x200.png"></img>
<img src="https://placekitten.com/300/200"></img><br>
<br>
✖インタラクティブ要素（表示のみ。機能しない）<br>
✖a <a href="https://www.google.co.jp/">Googleリンク</a>（機能しない）<br>
✖details,summary <details><summary>要約</summary>詳細。</details>
✖button,textarea,input
<button></button>
<textarea></textarea>
<input type="text"></input>
<input type="range"></input>
<input type="number"></input><br>
<input type="color"></input>
<input type="file"></input>
<input type="date-time"></input>
`
    const style = {fontFamily:'IPAexゴシック', fontSize:24, letterSpacing:24*0.05, lineHeight:24*1.70, fill:0x000000, align:'left', stroke:'#FFFF00', strokeThickness:0.5}
    app.stage.addChild(new PIXI.HTMLText(html, style))
    /*
    const text = 'Hello pixi.js !!\nこんにちはPixiJS！\n吹き出しです。\nテキストをクリックしてね。\n１字ずつ表示されるよ。'
    const talkBox = new TalkBox(text)
    //const bg = new Background(app.width, app.height, app.backgroundColor)
    app.ticker.add((delta)=>{
        //bg.draw()
        talkBox.draw(delta)
    });
    //app.stage.addChild(bg)
    app.stage.addChild(talkBox)
    */
});
window.addEventListener('beforeunload', async(event) => {
    console.log('beforeunload!!');
});

