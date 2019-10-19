class garbage {
    constructor(x, y, type, name){
        this.x = x;
        this.y = y;
        this.type = type;
        this.name = name;
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

    setVelocity(v) {
        this.velocity = v;
    }

    getVelocity() {
        return this.velocity;
    }
}