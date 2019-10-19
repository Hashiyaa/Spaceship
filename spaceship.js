
window.onload = function() {
    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas"));
    let context = canvas.getContext("2d");

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        let i = performance.now();
        context.save();
        context.translate(275, (0.2 * i) % canvas.height);
        context.fillRect(0, 0, 50, 50);
        context.restore();
        window.requestAnimationFrame(draw);
    }
    draw();
}