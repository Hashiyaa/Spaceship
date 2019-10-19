let posX = 200;
let posY = 200;
let dirX = 0;
let dirY = 0;
let speed = 10;

let garbageList = [];

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

        // update the position
        if ((posX >= 100 && dirX < 0) || (posX <= 500 && dirX > 0)) {
            posX += dirX * speed;
        }
        if ((posY >= 100 && dirY < 0) || (posY <= 500 && dirY > 0)) {
            posY += dirY * speed;
        }
        // console.log("x: " + posX + " y: " + posY);
        drawSpaceship(posX, posY);
        context.restore();
        window.requestAnimationFrame(draw);
    }
    draw();

    function drawSpaceship(x, y) {
        let img = new Image(); // Create new img element
        img.src = 'images/spaceship.png'; // Set source path
        context.save();
        context.translate(-100, -100); // hard code
        context.drawImage(img, x, y);
        // img.onload = function() {
        //     context.drawImage(img, 100, 100);
        // };
        context.restore();
    }

    function createGarbage(){
        // garbageList.push(new garbage());
    }

    window.onkeydown = function(event) {
        var keyPr = event.keyCode; //Key code of key pressed
      
        if(keyPr === 39 || keyPr === 68){  
            dirX = 1; //right arrow add 20 from current
        }
        else if(keyPr === 37 || keyPr === 65){
            dirX = -1; //left arrow subtract 20 from current
        }
        else if(keyPr === 38  || keyPr === 87) {
            dirY = -1; //top arrow subtract 20 from current
        }
        else if(keyPr === 40 || keyPr === 83){
            dirY = 1; //bottom arrow add 20 from current
        }
    };

    window.onkeyup = function(event) {
        dirX = 0;
        dirY = 0;
    }
}