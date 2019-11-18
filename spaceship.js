let collector_Types = ['household_food_waste','residual_waste','recyclable_waste','hazardous_waste'];
export class spaceship {
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

    setCollectorType(t) {
        this.type = collector_Types[t];
    }

    getCollectorType() {
        return this.type;
    }
    getDistance(a, b) {
        return Math.sqrt(Math.pow(a.getX() - b.getX(), 2) + 
            Math.pow(a.getY() - b.getY(), 2));
    }

    onCollisionWith(g) {
        return (getDistance(this, g) < 10)
    }

    // collect garbage method, put it in something like update()
    // for all garbage in canvas:
    //   if this.onCollisionWith(garbage):
    //     remove garbage from canvas
    //     increment score
}