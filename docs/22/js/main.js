// https://pixijs.io/examples/#/mesh-and-shaders/textured-mesh-basic.js
// https://pixijs.io/examples/#/mesh-and-shaders/textured-mesh-advanced.js
window.addEventListener('DOMContentLoaded', async(event) => {
    // http://www.thothchildren.com/coworker/cource/image/edgecv/webedgeextcv
    async function canny(){
        //const img = await ImageLoader.getImageData(`asset/image/mepachi/mabuta-ue.png`)
        const img = await ImageLoader.getImage(`asset/image/mepachi/mabuta-ue.png`)
        console.log(img)
        let src = cv.imread(img);
        let dst = new cv.Mat();
        cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
        cv.Canny(src, dst, 50, 100, 3, false);
        cv.imshow('canvas-input', dst);
        src.delete();
        dst.delete();
    }
    console.log(cv.getBuildInformation)
    if (cv.getBuildInformation) { await canny() }
    else{
        //cv['onRuntimeInitialized'] = canny;// WASM
        //cv['onRuntimeInitialized'] = async()=>{ await canny() }
        cv.onRuntimeInitialized = async()=>{ await canny() }
    }



    const imgDt = await ImageLoader.getImageData(`asset/image/mepachi/mabuta-ue.png`)
    console.log(imgDt)
    console.log(imgDt.width)
    console.log(imgDt.height)
    const imgMask = await ImageLoader.createMask(`asset/image/mepachi/mabuta-ue.png`)
    console.log(imgMask)
    //document.getElementById('canvas-mask').getContext("2d").drawImage(imgMask, 0, 0)
    document.getElementById('canvas-mask').getContext("2d").putImageData(imgMask, 0, 0)

    const res = await fetch('md/0.md')
    const md = await res.text()
    document.querySelector('#md').innerHTML = marked.parse(md);
    hljs.highlightAll();

    console.log(earcut([10,0, 0,50, 60,60, 70,10]))
    //const coords = [0,0, 0,100, 100,0, 100,100]
    const coords = [0,0, 0,100, 100,100, 100,0]
    const delaunay = new Delaunator(coords);
    console.log(delaunay.triangles);

    const app = new PIXI.Application({
        view: document.getElementById('my-canvas'),
        backgroundColor: 0x1099bb
    });
    const vertex = new Vertex()
    app.stage.addChild(vertex.Graphics);
    document.body.appendChild(app.view);

    // https://pixijs.download/dev/docs/PIXI.SimpleMesh.html
    // https://tkengo.github.io/blog/2015/01/03/opengl-es-2-2d-knowledge-2/
    const texture = PIXI.Texture.from('./asset/image/mepachi/mabuta-ue.png')
    //const vertices = new Float32Array([0,0, 0,100, 100,0, 100,100])
    //const vertices = new Float32Array([0,0, 0,100, 100,100, 100,0]) // 四角形。左上から半時計回りに。
    //const vertices = new Float32Array([0,0, 0,100, 100,100, 100,0, 50,50]) // 四角形。左上から半時計回りに。最後は中点。
    //const vertices = new Float32Array([0,0, 0,100, 100,100, 100,0,   50,50, 50,75, 75,75, 75,50]) // 四角形。左上から半時計回りに。50,50からは中にある矩形。
    const vertices = new Float32Array([0,0, 0,100, 100,100, 100,0,   50,50, 50,75, 75,75, 75,50]) // 四角形。左上から半時計回りに。50,50からは中にある矩形。
    //const vertices = new Float32Array([0,0, 100,0, 100,100, 0,100,  20,20, 80,20, 80,80, 20,80])
    //const uvs = new Float32Array([0,0, 0,1, 1,0, 1,1])
    //const uvs = new Float32Array([0,0, 0,1, 1,1, 1,0])
    //const uvs = new Float32Array([0,0, 0,1, 1,1, 1,0,   0.5,0.5, 0.5,0.75, 0.75,0.75, 0.75,0.5])
    const uvs = new Float32Array([0,0, 0,1, 1,1, 1,0,   0.5,0.5, 0.5,0.75, 0.75,0.75, 0.75,0.5])
    //const uvs = new Float32Array([0,0, 1,0, 1,1, 0,1,   0.2,0.2, 0.8,0.2, 0.8,0.8, 0.2,0.8])
    console.log([10,0, 0,50, 60,60, 70,10]) // 期待値:[0,1,2, 2,3,0]
    console.log(earcut([10,0, 0,50, 60,60, 70,10])); // returns [1,0,3, 3,2,1]
    console.log(earcut([0,0, 0,100, 100,100, 100,0,   50,50, 50,75, 75,75, 75,50], [4])); // (12) [4,0,3, 1,0,4, 4,3,2, 2,1,4]
    console.log(vertices)         // [0,0, 0,100, 100,100, 100,0]
    //console.log(earcut(vertices)) // [1,0,3, 3,2,1]
    console.log(earcut(vertices, [4])) // [1,0,3, 3,2,1]
    console.log(new Delaunator(vertices).triangles)

    //const indices = new Uint16Array([0,1,2, 2,3,0])
    //const indices = new Uint16Array(earcut(vertices))
    //const indices = new Uint16Array(earcut(vertices, [4]))
    const indices = new Uint16Array(new Delaunator(vertices).triangles)
    const rectangle = new PIXI.SimpleMesh(texture, vertices, uvs, indices, PIXI.DRAW_MODES.TRIANGLE_STRIP)
    vertex.Graphics.x = 400
    vertex.Graphics.y = 300
    rectangle.position.set(400, 300);
    app.stage.addChild(rectangle);
    let direct = 1
    app.ticker.add((delta) => {
        //vertex.draw(vertices)
        vertex.drawArrayWithHoles(vertices, indices)
    });
    // https://greensock.com/forums/topic/25391-animate-vertices-in-threejs-with-gsap/
                                 // from  [ 0,0, 0,100, 100,0, 100,100]
    //gsap.to(rectangle.vertices, {endArray:[50,0, 0,100,  50,0, 100,100], duration:2, yoyo:true, repeat:-1})
                                 // from  [ 0,0, 0,100, 100,100, 100,0]
    gsap.to(rectangle.vertices, {endArray:[50,0, 0,100, 100,100, 50,0], duration:2, yoyo:true, repeat:-1})



    /*
    const tl = gsap.timeline();
    tl.to(rectangle, { vertices[0]:50, duration:2, yoyo:true, repeat:-1 })
    tl.to(rectangle, { vertices[6]:50, duration:2, yoyo:true, repeat:-1 })
    */
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

