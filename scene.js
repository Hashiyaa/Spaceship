let posX = 200;
let posY = 200;
let dirX = 0;
let dirY = 0;
let speed = 10;

let garbageList = [];
let household_food_waste = ['apple','bone','cheese','fish','watermelon'];
let residual_waste = ['cup'];
let recyclable_waste = ['can','soda'];
let hazardous_waste = ['battery','bulb'];
let garbage_types = [];

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
        generate_garbage();
        draw_garbage();
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

    function initialize_types(){
        garbage_types.push(household_food_waste);
        garbage_types.push(residual_waste);
        garbage_types.push(recyclable_waste);
        garbage_types.push(hazardous_waste);
    }

    function generate_garbage(){
        let index = Math.floor(Math.random()*4);
        let type = '';
        if(index===0){
            type = 'household_food_waste';
        }
        else if(index===1){
            type = 'residual_waste';
        }
        else if(index===2){
            type = 'recyclable_waste';
        }
        else{
            type = 'hazardous_waste';
        }
        let temp = garbage_types[index].length;
        let subindex = Math.floor(Math.random() * temp);
        let name = (garbage_types[index])[subindex];
        
        let filename = name + ".png";
        let randomX = Math.floor(Math.random()*601);
        let gbg = new garbage(x,0,type,name,filename);
        garbageList.push(gbg);
    }

    function draw_garbage(){
        context.save();
        for(i=0;i<garbageList.length;i--){
            let g = garbageList[i];
            context.drawImage(g.getImage(),g.getX(),g.getY());
        }
        context.restore();
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