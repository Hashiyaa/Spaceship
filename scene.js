
function LoadScene() {
    let x = 200;
    let y = 200;

    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas"));
    let context = canvas.getContext("2d");
    let i = this.performance.now();

    function ButtonDisappear(){

        document.getElementById("StartButton").remove();

    }
    ButtonDisappear();

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.save();
        context.fillRect(0, 0, 50, 50);
        drawSpaceship(x, y);
        context.restore();
        window.requestAnimationFrame(draw);
    }
    draw();

    function drawSpaceship(x, y) {
        context.save();
        //context.translate(275, (0.2 * i) % canvas.height);
        let img = new Image(); // Create new img element
        img.src = 'images/spaceship.png'; // Set source path
        context.drawImage(img, x, y);
        // img.onload = function() {
        //     context.drawImage(img, 100, 100);
        // };
        context.restore();
    }

    window.onkeydown = function(event) {
        var keyPr = event.keyCode; //Key code of key pressed
      
        if((keyPr === 39 || keyPr === 68) && x<=460){  
            x = x+20; //right arrow add 20 from current
        }
        else if((keyPr === 37 || keyPr === 65) && x>10){
            x = x-20; //left arrow subtract 20 from current
        }
        else if((keyPr === 38  || keyPr === 87) && y>10) {
            y = y-20; //top arrow subtract 20 from current
        }
        else if((keyPr === 40 || keyPr === 83) && y<=460){
            y = y+20; //bottom arrow add 20 from current
        }
            
          /*clearing anything drawn on canvas
         *comment this below do draw path */
        console.log("x: " + x + " y: " + y);
        // drawSpaceship(x, y);
        // Drawing rectangle at new position
    };
}