class garbage {
    constructor(x, y, type, name, filename){
        this.x = x;
        this.y = y;
        this.type = type;
        this.name = name;
        this.image = new Image();
        this.image.src = filename;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getType() {
        return this.type;
    }

    getName() {
        return this.name;
    }

    getImage(){
        return this.image;
    }

    setVelocity(v) {
        this.velocity = v;
    }

    getVelocity() {
        return this.velocity;
    }
}