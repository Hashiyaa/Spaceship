class spaceship extends FlyingObject {
    constructor(x, y){
        super(x, y);
    }

    setType(t) {
        this.type = t;
    }

    getType() {
        return this.type;
    }

    onCollisionWith(g) {
        return (getDistance(this, g) < 10)
    }
}