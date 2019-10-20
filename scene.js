import garbage from "./garbage.js";

let posX = 200;
let posY = 200;
let dirX = 0;
let dirY = 0;
let speed = 10;
let generationCount = 100;
let ship_Width = -1;

let collector_Types = ['household_food_waste','residual_waste','recyclable_waste','hazardous_waste'];
let currIndex = 0;
let currType = collector_Types[0];

let garbageList = [];
let household_food_waste = ['apple','bone','cheese','fish','watermelon'];
let residual_waste = ['cup'];
let recyclable_waste = ['can','soda'];
let hazardous_waste = ['battery','bulb'];
let garbage_types = [];

let main = document.getElementById("main");
let score = 0;
let hp = 3000;
let skull = null;
let skullTimer = 0;

function LoadScene() {
    let x = 200;
    let y = 200;
    let generationRate = 100;
    let scoreText = document.createElement("P");
    scoreText.setAttribute("value", "Score:");
    scoreText.setAttribute("id","scoreText");
    main.appendChild(scoreText);

    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas"));
    let context = canvas.getContext("2d");
    // let i = this.performance.now();

    let img = new Image(); // Create new img element
    img.src = 'images/spaceship.png'; // Set source path


    ButtonDisappear();

    let energy = document.createElement("progress");
    let energypic = document.createElement("img");

    energypic.src = "images/energy.png";

    energypic.setAttribute("id","Energy_Img");
    energy.setAttribute("id","Energy");

    energy.max = 3000;
    energy.value = 0;
    
    main.appendChild(energy);
    main.appendChild(energypic);

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

        if (skull != null) {
            if (skullTimer < 50) {
                let skullImg = new Image();
                skullImg.src = "images/skull.png";
                context.drawImage(skullImg,skull.getX() - 0.5 * skull.getWidth(), 
                    skull.getY() - skull.getHeight());
                skullTimer++;
            } else {
                skull = null;
                skullTimer = 0;
            }
        }
        
        for(let i=0;i<garbageList.length;i++){
            let g = garbageList[i];
            if(g.getY()>600 + g.getHeight()){
                garbageList.splice(i,1);
            }else{
                g.setY(g.getY()+g.getVelocity());
            }
        }
        context.beginPath();
        context.arc(73 + posX, posY + 30, 5, 0, Math.PI * 2, false);
        context.fill();
        context.fillText("Current Type: " + currType, 400, 30);
        context.fillText("Score: " + score, 100, 30);
        context.fillText("Highest Score: " + score, 200, 30);
        context.restore();

        let type_img = new Image();
        type_img.src = 'images/'.concat(currType, '.png');
        context.drawImage(type_img, posX+50, posY+50); 
        //     let img = new Image(); // Create new img element
        // img.src = 'images/spaceship.png'; // Set source path

        detectCollision(); // check for collision between spaceship and garbage constantly
        hp--;
        energy.value = hp;
        console.log(hp);
        window.requestAnimationFrame(draw);
    }
    draw();

    function drawSpaceship(x, y, img) {
        context.save();
        // context.translate(-100, -100); // hard code


        ship_Width = img.width;
        // console.log(img.width);
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
        // console.log(img.width);
        let randomX = Math.floor(Math.random()*451+75);
        
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
            let currGbg = garbageList[i];

            if (distanceToShip(currGbg.getX(), currGbg.getY()) < 20) {
                
                if (currGbg.type === currType) {
                    hp = hp + 100;
                    // delete garbageList[i];
                    // concurrent modification?
                    score++;
                    // console.log(document.getElementById("Score").value);
                } else {
                    hp = hp - 60;
                    skull = currGbg;
                }
                garbageList.splice(i, 1); // remove garbage from canvas
            }
        }
    }

    function distanceToShip(x, y) {
        
        return Math.sqrt(Math.pow(73 + posX - x, 2) + Math.pow(posY + 30 - y, 2));
    }

    window.onkeydown = function(event) {
        var keyPr = event.keyCode; //Key code of key pressed
      
        if (keyPr === 32) {
            event.preventDefault();
            currIndex = ((currIndex + 1) % 4);
            currType = collector_Types[currIndex];
        }

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

    //Create Buttons
    let StartButton = document.createElement("button");
    let SettingButton = document.createElement("button");

    StartButton.innerHTML = "START";
    SettingButton.innerHTML = "SETTINGS";

    StartButton.onclick = LoadScene;
    SettingButton.onclick = Settings;

    StartButton.setAttribute("id","StartButton");
    SettingButton.setAttribute("id","SettingButton");

    main.appendChild(StartButton);
    main.appendChild(SettingButton);

    

}
function ButtonDisappear(){
    document.getElementById("StartButton").remove();
    document.getElementById("SettingButton").remove();
}

function Settings(){
    ButtonDisappear();
    gameover();
}

function gameover(){
    let context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    let gameover_str = document.createElement("pre");
    let scoretext = document.createElement("pre");

    scoretext.innerHTML = "Score:"+score;
    gameover_str.innerHTML = "GAME OVER";

    scoretext.setAttribute("id","ScoreText");
    gameover_str.setAttribute("id","GameOverStr");
    
    let mainframe = document.getElementById("main");

    mainframe.appendChild(gameover_str);
    mainframe.appendChild(scoretext);
    context.restore();
}
