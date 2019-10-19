class Garbage extends FlyingObject{
    constructor(x, y, type, name){
        super(x, y);
        this.type = type;
        this.name = name;
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