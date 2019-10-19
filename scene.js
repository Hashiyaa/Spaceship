let x = 200;
let y = 200;

let garbageList = [];
let household_food_waste = ['apple','bone','cheese','fish','watermelon'];
let residual_waste = ['cup'];
let recyclable_waste = ['can','soda'];
let hazardous_waste = ['battery','bulb'];
let garbage_types = [];

window.onload = function() {
    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas"));
    let context = canvas.getContext("2d");
    let i = this.performance.now();
    
    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.save();
        context.fillRect(0, 0, 50, 50);
        drawSpaceship(x, y);
        //generate_garbage();
        draw_garbage();
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