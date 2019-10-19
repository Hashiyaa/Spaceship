import garbage from "./garbage.js";

let posX = 200;
let posY = 200;
let dirX = 0;
let dirY = 0;
let speed = 10;
let generationCount = 100;

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

    function ButtonDisappear(){
        document.getElementById("StartButton").remove();
        document.getElementById("SettingButton").remove();
    }
    ButtonDisappear();

    function LoadEnergy(){
        context.save();
        let energy = document.createElement("progress");
        let energypic = document.createElement("img");

        energypic.src = "images/energy.png";

        energypic.setAttribute("id","Energy_Img");
        energy.setAttribute("id","Energy");

        energy.max = 100;
        energy.value = 50;

        MainFrame.appendChild(energypic);
        MainFrame.appendChild(energy);
        
        context.restore();
    }
    LoadEnergy();
    garbage_types.push(household_food_waste);
    garbage_types.push(residual_waste);
    garbage_types.push(recyclable_waste);
    garbage_types.push(hazardous_waste);

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.save();
        context.fillRect(0, 0, 50, 50);

        generationCount++;

        // update the position
        if ((posX >= 100 && dirX < 0) || (posX <= 500 && dirX > 0)) {
            posX += dirX * speed;
        }
        if ((posY >= 100 && dirY < 0) || (posY <= 500 && dirY > 0)) {
            posY += dirY * speed;
        }
        // console.log("x: " + posX + " y: " + posY);
        drawSpaceship(posX, posY);
        if(generationCount>=generationRate){
            generate_garbage();
            generationCount = 0;
        }
        draw_garbage();
        for(let i=0;i<garbageList.length;i++){
            let g = garbageList[i];
            if(g.getY()>600+g.getY()){
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

    function drawSpaceship(x, y) {
        let img = new Image(); // Create new img element
        img.src = 'images/spaceship.png'; // Set source path
        context.save();
        // context.translate(-100, -100); // hard code
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
        console.log(img.width);
        let randomX = Math.floor(Math.random()*526+37.5);
        
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
            context.drawImage(img,g.getX(),g.getY()-img.height);
        }
        context.restore();
    }

    function detectCollision() {
        var i;
        for (i = 0; i < garbageList.length; i++) {
            if (distanceToShip(garbageList[i].getX(), garbageList[i].getY()) < 100) {
                garbageList.splice(i, 1); // remove garbage from canvas
                // delete garbageList[i];
                // concurrent modification?
                // TODO: increment score
            }
        }
    }

    function distanceToShip(x, y) {
        return Math.sqrt(Math.pow(posX - x, 2)+ Math.pow(posY - y, 2));
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

function gameover(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
}

