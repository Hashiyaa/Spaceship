export default class garbage {
    constructor(x, y, type, name, velocity){
        this.type = type;
        this.name = name;
        this.x = x + this.getWidth()/2;
        this.y = y + this.getHeight();
        this.velocity = velocity;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    setY(y){
        this.y = y;
    }

    getType() {
        return this.type;
    }

    getName() {
        return this.name;
    }

    setVelocity(v) {
        this.velocity = v;
    }

    getVelocity() {
        return this.velocity;
    }

    getWidth() {
        let img = new Image();
        img.src = "images/" + this.name + ".png";
        return img.width;
    }

    getHeight() {
        let img = new Image();
        img.src = "images/" + this.name + ".png";
        return img.height;
    }
}