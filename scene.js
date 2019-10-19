window.onload = function() {
    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas"));
    let context = canvas.getContext("2d");
    let i = this.performance.now();
    
    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.save();
        //context.translate(275, (0.2 * i) % canvas.height);
        context.fillRect(0, 0, 50, 50);
        let img = new Image(); // Create new img element
        img.src = 'images/spaceship.png'; // Set source path
        context.drawImage(img, 200, 200);
        // img.onload = function() {
        //     context.drawImage(img, 100, 100);
        // };
        context.restore();
        window.requestAnimationFrame(draw);
    }
    draw();
}