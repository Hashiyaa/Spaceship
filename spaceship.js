<<<<<<< HEAD
<<<<<<< HEAD
window.onload = function () {
	let canvas = /** @type {HTMLCanvasElement} */ ( document.getElementById( "canvas" ) );
	let context = canvas.getContext( "2d" );

	function draw() {
		context.clearRect( 0, 0, canvas.width, canvas.height );
		let i = performance.now();
		context.save();
		context.translate( 275, ( 0.2 * i ) % canvas.height );
		context.fillRect( 0, 0, 50, 50 );
		context.restore();
		window.requestAnimationFrame( draw );
	}
	draw();
=======
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

=======
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

>>>>>>> edbc6c1ef4e72c3d323edf63ad38fb5edb221272
    getDistance(a, b) {
        return Math.sqrt(Math.pow(a.getX() - b.getX(), 2) +
                         Math.pow(a.getY() - b.getY(), 2));
    }

    onCollisionWith(g) {
        return (getDistance(this, g) < 10)
    }

<<<<<<< HEAD
>>>>>>> edbc6c1ef4e72c3d323edf63ad38fb5edb221272
=======
>>>>>>> edbc6c1ef4e72c3d323edf63ad38fb5edb221272
}