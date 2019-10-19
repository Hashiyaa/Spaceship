import garbage from "./garbage.js";

let posX = 200;
let posY = 200;
let dirX = 0;
let dirY = 0;
let speed = 10;
let generationCount = 100;
let ship_Width = -1;

let garbageList = [];
let household_food_waste = ['apple','bone','cheese','fish','watermelon'];
let residual_waste = ['cup'];
let recyclable_waste = ['can','soda'];
let hazardous_waste = ['battery','bulb'];
let garbage_types = [];

function LoadScene() {
    let x = 200;
    let y = 200;
    let generationRate = 100;

    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas"));
    let context = canvas.getContext("2d");
    // let i = this.performance.now();

    let img = new Image(); // Create new img element
    img.src = 'images/spaceship.png'; // Set source path

    function ButtonDisappear(){
        document.getElementById("StartButton").remove();
        document.getElementById("SettingButton").remove();
    }
    ButtonDisappear();

    garbage_types.push(household_food_waste);
    garbage_types.push(residual_waste);
    garbage_types.push(recyclable_waste);
    garbage_types.push(hazardous_waste);

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.save();

        generationCount++;
        // update the position
        if ((posX >= 0 && dirX < 0) || (posX <= 600 - img.width && dirX > 0)) {
            posX += dirX * speed;
        }
        if ((posY >= 0 && dirY < 0) || (posY <= 600 - img.height && dirY > 0)) {
            posY += dirY * speed;
        }
        // console.log("x: " + posX + " y: " + posY);
        
        drawSpaceship(posX, posY, img);
        if(generationCount>=generationRate){
            generate_garbage();
            generationCount = 0;
        }
        draw_garbage();
        for(let i=0;i<garbageList.length;i++){
            let g = garbageList[i];
            if(g.getY()>600 + g.getHeight()){
                garbageList.splice(i,1);
            }else{
                g.setY(g.getY()+g.getVelocity());
            }
        }
        context.restore();
        window.requestAnimationFrame(draw);
        window.requestAnimationFrame(detectCollision); // check for collision between spaceship and garbage constantly
    }
    draw();

    function drawSpaceship(x, y, img) {
        context.save();
        // context.translate(-100, -100); // hard code


        ship_Width = img.width;
        console.log(img.width);
        context.drawImage(img, x, y);        
        // img.onload = function() {
        //     context.drawImage(img, 100, 100);
        // };
        context.restore();
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
        let img = new Image();
        img.src = "images/" + name + ".png";
        let randomX = Math.floor(Math.random()*(601-img.width)+img.width/2);
        let randomVelocity = Math.random()*1.5+0.5;
        let gbg = new garbage(randomX,0,type,name,randomVelocity); // hard code
        garbageList.push(gbg);
    }

    function draw_garbage(){
        context.save();
        for(let i = 0; i < garbageList.length; i++) {
            let g = garbageList[i];
            let name = g.getName();
            let img = new Image();
            img.src = "images/" + name + ".png";
            context.drawImage(img,g.getX()-g.getWidth()/2,g.getY()-img.height*3/2);
        }
        context.restore();
    }

    function detectCollision() {
        var i;
        for (i = 0; i < garbageList.length; i++) {
            // let gbgX = garbageList[i].getX() + garbageList[i].
            if (distanceToShip(garbageList[i].getX(), garbageList[i].getY()) < 30) {
                garbageList.splice(i, 1); // remove garbage from canvas
                // delete garbageList[i];
                // concurrent modification?
                // TODO: increment score
            }
        }
    }

    function distanceToShip(x, y) {
        return Math.sqrt(Math.pow(57 + posX - x, 2) + Math.pow(posY - y, 2));
    }

    window.onkeydown = function(event) {
        var keyPr = event.keyCode; //Key code of key pressed
      
        if(keyPr === 39 || keyPr === 68) {  
            dirX = 1; //right arrow add 20 from current
        }
        else if(keyPr === 37 || keyPr === 65) {
            dirX = -1; //left arrow subtract 20 from current
        }
        else if(keyPr === 38  || keyPr === 87) {
            event.preventDefault();
            dirY = -1; //top arrow subtract 20 from current
        }
        else if(keyPr === 40 || keyPr === 83) {
            event.preventDefault();
            dirY = 1; //bottom arrow add 20 from current
        }
    };

    window.onkeyup = function(event) {
        dirX = 0;
        dirY = 0;
    }
}

window.onload = function(){
    // Get canvas element and its context
    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas"));
    let ctx = canvas.getContext('2d');

    let MainFrame = document.getElementById("MainFrame");
    //Create Buttons
    let StartButton = document.createElement("button");
    let SettingButton = document.createElement("button");

    StartButton.innerHTML = "START";
    SettingButton.innerHTML = "SETTINGS";

    StartButton.onclick = LoadScene;
    SettingButton.onclick = Settings;

    StartButton.setAttribute("id","StartButton");
    SettingButton.setAttribute("id","SettingButton");

    MainFrame.appendChild(StartButton);
    MainFrame.appendChild(SettingButton);
}

function Settings(){

}