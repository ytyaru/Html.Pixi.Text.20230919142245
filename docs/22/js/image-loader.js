class ImageLoader { // Image→ImageBitmap→Canvas.getContext('2d').drawImage().getImageData()→ImageData
    static async getImage(src) { // src:画像URL
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = (e) => reject(e);
            img.src = src;
        });
    }
    static async getImageBitmap(src) { return createImageBitmap(await this.getImage(src)) }
    static async getImageData(src) {
        const imgBm = await this.getImageBitmap(src)
        const canvas = document.createElement('canvas')
        canvas.width = imgBm.width
        canvas.height = imgBm.height
        const ctx = canvas.getContext("2d")
        ctx.drawImage(imgBm, 0, 0)
        return ctx.getImageData(0, 0, imgBm.width, imgBm.height)
    }
    static async createMask(src) {
        const imgDt = await this.getImageData(src)
        const data = imgDt.data
        for (let i=0; i<data.length; i+=4) {
            const [r,g,b,a] = [data[i],data[i+1],data[i+2],data[i+3]]
            if (255===a) { data[i] = 255; data[i+1] = 0; data[i+2] = 0; }
        }
        return imgDt
    }
    static async createMask(src) {
        const imgDt = await this.getImageData(src)
        const data = imgDt.data
        for (let i=0; i<data.length; i+=4) {
            const [r,g,b,a] = [data[i],data[i+1],data[i+2],data[i+3]]
            if (255===a) { data[i] = 255; data[i+1] = 0; data[i+2] = 0; }
        }
        return imgDt
    }
    static #rgba(imgDt, i) { const d = imgDt.data; return [d[i], d[i+1], d[i+2], d[i+3]]; }
    static #isTransparent(imgDt, i) { const [r,g,b,a] = this.#rgba(imgDt, i); return (255===a); }
    static async getIndicesNotTransparent(src, px=0) { // px:intervalPixcel
        const imgDt = await this.getImageData(src)
        const idxs = []
        const data = imgDt.data
        for (let i=0; i<data.length; i+=4) {
            const [r,g,b,a] = [data[i], data[i+1], data[i+2], data[i+3]]
            if (255!==a) { idxs.push(i); }
        }
        return idxs
    }
    static async getOutline(src, px=0) { // px:intervalPixcel
        //const imgDt = await this.getImageData(src)
        const imgDt = await this.createMask(src)
        const idxs = []
        const data = imgDt.data
        for (let i=0; i<data.length; i+=4) {
            const [r,g,b,a] = [data[i], data[i+1], data[i+2], data[i+3]]
            if (255!==a) { idxs.push(i); }
        }
        return idxs
    }
    static async getVertices (src, px=0) { // px:intervalPixcel
        const imgDt = await this.getImageData(src)
        const idxs = []
        const data = imgDt.data
        for (let i=0; i<data.length; i+=4) {
            const [r,g,b,a] = [data[i], data[i+1], data[i+2], data[i+3]]
            if (255!==a) { idxs.push(i); }
        }
        return imgDt
    }
}
