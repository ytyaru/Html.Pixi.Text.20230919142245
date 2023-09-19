class Vertex {
    constructor() {
        this.g = new PIXI.Graphics();
    }
    get Graphics() { return this.g }
    draw(points) {
        this.g.clear();
        this.g.lineStyle(2, 0xffc2c2);
        this.#drawArray(points) // 引数は配列でありPIXI.Pointには非対応
        // this.#drawPoints(points) // 引数はPIXI.Point,配列どちらでもいいが毎回ifするので冗長
    }
    // https://stackoverflow.com/questions/38191827/earcut-js-triangulation-with-holes
    drawArrayWithHoles(vertices, indices) {
        this.g.clear();
        this.g.lineStyle(2, 0xffc2c2);
        //for (let i=0; i<vertices.length; i+=3) {
        for (let i=0; i<indices.length; i+=3) {
            this.g.moveTo(vertices[indices[i  ]*2], vertices[indices[i  ]*2+1]);
            this.g.lineTo(vertices[indices[i+1]*2], vertices[indices[i+1]*2+1]);
            this.g.lineTo(vertices[indices[i+2]*2], vertices[indices[i+2]*2+1]);
        }
        for (let i = 0; i < vertices.length / 2; i++) {
            this.g.beginFill(0xff0022);
            this.g.drawCircle(vertices[(i*2)], vertices[(i*2)+1], 6);
            this.g.endFill();
        }
    }
    #drawArray(points) {
        this.g.moveTo(points[0], points[1]);
        for (let i = 0; i < points.length / 2; i++) {
            this.g.lineTo(points[(i*2)], points[(i*2)+1]);
        }
        for (let i = 0; i < points.length / 2; i++) {
            this.g.beginFill(0xff0022);
            this.g.drawCircle(points[(i*2)], points[(i*2)+1], 10);
            this.g.endFill();
        }
    }
    #drawPixiPoints(points) {
        this.g.moveTo(points[0].x, points[0].y);
        for (let i = 0; i < points.length; i++) {
            this.g.lineTo(points[i].x, points[i].y);
        }
        for (let i = 0; i < points.length; i++) {
            this.g.beginFill(0xff0022);
            this.g.drawCircle(points[i].x, points[i].y, 10);
            this.g.endFill();
        }
    }
    #drawPoints(points) {
        this.g.moveTo(...this.#getXY(points, 0));
        for (let i = 0; i < points.length; i++) {
            this.g.lineTo(...this.#getXY(points, i));
        }
        for (let i = 0; i < points.length; i++) {
            this.g.beginFill(0xff0022);
            this.g.drawCircle(...this.#getXY(points, i), 10);
            this.g.endFill();
        }
    }
    #getXY(points, i) {
        if (points[i] instanceof PIXI.Point) { return [points[i].x, points[i].y] }
        else { return [points[(i*2)], points[(i*2)+1]] }
    }
    /*
    draw() {
        this.g.clear();
        this.g.lineStyle(2, 0xffc2c2);
        this.g.moveTo(this.rope.points[0].x, this.rope.points[0].y);
        for (let i = 1; i < this.rope.points.length; i++) {
            this.g.lineTo(this.rope.points[i].x, this.rope.points[i].y);
        }
        for (let i = 1; i < this.rope.points.length; i++) {
            this.g.beginFill(0xff0022);
            this.g.drawCircle(this.rope.points[i].x, this.rope.points[i].y, 10);
            this.g.endFill();
        }
    }
    */
}
