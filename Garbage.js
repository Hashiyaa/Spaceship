export default class garbage {
    constructor(x, y, type, name, velocity){
        this.x = x;
        this.y = y;
        this.type = type;
        this.name = name;
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
}