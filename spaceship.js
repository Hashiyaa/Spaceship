class spaceship extends FlyingObject {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
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