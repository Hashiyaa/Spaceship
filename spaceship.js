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

    getDistance(a, b) {
        return Math.sqrt(Math.pow(a.getX() - b.getX(), 2) +
                         Math.pow(a.getY() - b.getY(), 2));
    }

    onCollisionWith(g) {
        return (getDistance(this, g) < 10)
    }

}