// import spaceship from "./spaceship.js";
import garbage from "./garbage.js";

let posX = 220;
let posY = 400;
let dirX = 0;
let dirY = 0;
let speed = 10;
let generationCount = 100;
let isOver = false;

const collectorTypes = ['household_food_waste', 'residual_waste', 'recyclable_waste', 'hazardous_waste'];
let currCollectorIndex = 0;
let currCollector = collectorTypes[0];

let garbages = [];
let householdWaste = ['apple', 'bone', 'cheese', 'fish', 'watermelon'];
let residualWaste = ['cup'];
let recyclableWaste = ['can', 'soda'];
let hazardousWaste = ['battery', 'bulb'];
let garbageTypes = [];

let page = document.getElementById("main");
let score = 0;
let hScore = 0;
let hp = 3000;

let skull = null;
let skullTimer = 0;

window.onkeydown = function (event) {
    var keyPr = event.keyCode; //Key code of key pressed

    if (keyPr === 32) {
        event.preventDefault();
        currCollectorIndex = ((currCollectorIndex + 1) % 4);
        currCollector = collectorTypes[currCollectorIndex];
    }

    if (keyPr === 39 || keyPr === 68) {
        event.preventDefault();
        dirX = 1; //right arrow add 20 from current
    }
    else if (keyPr === 37 || keyPr === 65) {
        event.preventDefault();
        dirX = -1; //left arrow subtract 20 from current
    }
    else if (keyPr === 38 || keyPr === 87) {
        event.preventDefault();
        dirY = -1; //top arrow subtract 20 from current
    }
    else if (keyPr === 40 || keyPr === 83) {
        event.preventDefault();
        dirY = 1; //bottom arrow add 20 from current
    }
    else if (keyPr === 8) {
        event.preventDefault();
        hp = 0;
    }
};

window.onkeyup = function (event) {
    dirX = 0;
    dirY = 0;
};

function load() {
    // play music
    document.getElementById("music").play();

    // remove UI elements
    if (document.getElementById("QuitButton") != null) document.getElementById("QuitButton").remove();
    if (document.getElementById("AgainButton") != null) document.getElementById("AgainButton").remove();
    if (document.getElementById("ScoreText") != null) document.getElementById("ScoreText").remove();
    if (document.getElementById("GameOverStr") != null) document.getElementById("GameOverStr").remove();

    // reset some global variables
    hp = 3000;
    isOver = false;
    score = 0;

    // set up the canvas
    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas"));
    let context = canvas.getContext("2d");

    // set up score text
    let scoreText = document.createElement("P");
    scoreText.setAttribute("value", "Score:");
    scoreText.setAttribute("id", "scoreText");
    page.appendChild(scoreText);

    // create new img element
    let img = new Image(); 
    img.src = 'images/spaceship.png'; // Set source path

    // remove the buttons
    ButtonDisappear();

    let energy = document.createElement("progress");
    let energypic = document.createElement("img");

    // set up the source of the energy
    energypic.src = "images/energy.png";

    energypic.setAttribute("id", "Energy_Img");
    energy.setAttribute("id", "Energy");

    energy.max = 3000;
    energy.value = 0;

    page.appendChild(energy);
    page.appendChild(energypic);

    garbageTypes.push(householdWaste);
    garbageTypes.push(residualWaste);
    garbageTypes.push(recyclableWaste);
    garbageTypes.push(hazardousWaste);

    function drawSpaceship(x, y, img) {
        if (isOver) return;
        context.save();
        // context.translate(-100, -100); // hard code
        let pan = new Image();
        pan.src = "images/dustpan.png";
        context.drawImage(pan, x + 48, y - 30);
        // console.log(img.width);
        context.drawImage(img, x + 20, y + 10);
        // img.onload = function() {
        //     context.drawImage(img, 100, 100);
        // };
        context.restore();
    }

    function draw_garbage() {
        context.save();
        for (let i = 0; i < garbages.length; i++) {
            let g = garbages[i];
            let name = g.getName();
            let img = new Image();
            img.src = "images/" + name + ".png";
            context.drawImage(img, g.getX() - g.getWidth() / 2, g.getY() - img.height * 3 / 2);
        }
        context.restore();
    }

    let generationRate = 100;

    function draw() {
        if (isOver === true) return;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.save();

        generationCount++;
        // update the position
        if ((posX >= 0 && dirX < 0) || (posX <= 600 - img.width && dirX > 0)) {
            posX += dirX * speed;
        }
        if ((posY >= 200 && dirY < 0) || (posY <= 600 - img.height && dirY > 0)) {
            posY += dirY * speed;
        }
        // console.log("x: " + posX + " y: " + posY);

        drawSpaceship(posX, posY, img);
        context.beginPath();
        context.arc(73 + posX, posY - 20, 5, 0, Math.PI * 2, false);
        context.fill();

        if (generationCount >= generationRate) {
            generate_garbage();
            generationCount = 0;
        }
        draw_garbage();

        if (skull != null) {
            if (skullTimer < 50) {
                let skullImg = new Image();
                skullImg.src = "images/skull.png";
                context.drawImage(skullImg, skull.getX() - 0.5 * skull.getWidth(),
                    skull.getY() - skull.getHeight());
                skullTimer++;
            } else {
                skull = null;
                skullTimer = 0;
            }
        }

        for (let i = 0; i < garbages.length; i++) {
            let g = garbages[i];
            if (g.getY() > 600 + g.getHeight()) {
                garbages.splice(i, 1);
            } else {
                g.setY(g.getY() + g.getVelocity());
            }
        }
        context.fillStyle = "white";
        context.fillText("Current Type: " + currCollector, 400, 30);
        context.fillText("Score: " + score, 70, 30);
        context.fillText("Highest Score: " + hScore, 140, 30);
        if (localStorage.getItem("highestScore") != null) {
            context.fillText("History Highest: " + localStorage.getItem("highestScore"), 250, 30);
        } else {
            context.fillText("History Highest: " + 0, 250, 30);
        }
        context.fillText("Energy", 155, 60);
        context.restore();

        let type_img = new Image();
        type_img.src = 'images/'.concat(currCollector, '.png');
        context.drawImage(type_img, posX + 53, posY - 30);

        detectCollision(); // check for collision between spaceship and garbage constantly
        if (hp > 0) {
            hp--;
        }
        energy.value = hp;
        //console.log(hp);

        if (score > hScore) hScore = score;

        if (hp === 0) {
            gameover();
            hp = -1;
        }

        window.requestAnimationFrame(draw);
    }
    draw();
}

function generate_garbage() {
    if (isOver) return;
    let index = Math.floor(Math.random() * 4);
    let type = '';
    if (index === 0) {
        type = 'household_food_waste';
    }
    else if (index === 1) {
        type = 'residual_waste';
    }
    else if (index === 2) {
        type = 'recyclable_waste';
    }
    else {
        type = 'hazardous_waste';
    }
    let temp = garbageTypes[index].length;
    let subindex = Math.floor(Math.random() * temp);
    let name = (garbageTypes[index])[subindex];

    let randomX = Math.floor(Math.random() * 451 + 75);

    let randomVelocity = Math.random() * 1.5 + 0.5;
    let gbg = new garbage(randomX, 0, type, name, randomVelocity); // hard code
    garbages.push(gbg);
}

function detectCollision() {
    var i;
    for (i = 0; i < garbages.length; i++) {
        // let gbgX = garbageList[i].getX() + garbageList[i].
        let currGbg = garbages[i];

        // if (distanceToShip(currGbg.getX(), currGbg.getY()) < 25) {
        var polygon = [[posX + 46, posY - 15], [posX + 46, posY + 65], [posX + 98, posY + 65], [posX + 98, posY - 15]];
        if (inside([currGbg.getX(), currGbg.getY()], polygon)) {

            if (currGbg.type === currCollector) {
                let correct = new Audio("sound/correct.wav");
                correct.load();
                correct.play();
                hp = hp + 100;
                // delete garbageList[i];
                // concurrent modification?
                score++;
                // console.log(document.getElementById("Score").value);
            } else {
                let hitting = new Audio("sound/hitting.wav");
                hitting.load();
                hitting.play();
                if (hp > 60) hp = hp - 60;
                else hp = 0;
                skull = currGbg;
            }
            garbages.splice(i, 1); // remove garbage from canvas
        }
    }
}

function inside(point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

    var x = point[0], y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
}

function start() {
    // Get canvas element and its context
    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas"));
    let ctx = canvas.getContext('2d');

    //Create Buttons
    let StartButton = document.createElement("button");

    StartButton.innerHTML = "START";

    StartButton.onclick = load;

    StartButton.setAttribute("id", "StartButton");

    page.appendChild(StartButton);
}

function ButtonDisappear() {
    if (document.getElementById("StartButton") != null) document.getElementById("StartButton").remove();
    if (document.getElementById("SettingButton") != null) document.getElementById("SettingButton").remove();
}

function quitGame() {
    if (document.getElementById("QuitButton") != null) document.getElementById("QuitButton").remove();
    if (document.getElementById("AgainButton") != null) document.getElementById("AgainButton").remove();
    if (document.getElementById("ScoreText") != null) document.getElementById("ScoreText").remove();
    if (document.getElementById("GameOverStr") != null) document.getElementById("GameOverStr").remove();
    start();
}

function gameover() {
    isOver = true;
    garbages = [];

    localStorage.setItem("highestScore", hScore);
    if (document.getElementById("Energy_Img") != null) document.getElementById("Energy_Img").remove();
    if (document.getElementById("Energy") != null) document.getElementById("Energy").remove();

    let context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    let gameover_str = document.createElement("pre");
    let scoretext = document.createElement("pre");
    let tryagain = document.createElement("button");
    let quit = document.createElement("button");

    scoretext.innerHTML = "Score: " + score;
    tryagain.innerHTML = "TRY AGAIN";
    quit.innerHTML = "QUIT";
    gameover_str.innerHTML = "GAME OVER";

    quit.setAttribute("id", "QuitButton");
    tryagain.setAttribute("id", "AgainButton");
    scoretext.setAttribute("id", "ScoreText");
    gameover_str.setAttribute("id", "GameOverStr");
    tryagain.onclick = load;
    quit.onclick = quitGame;

    let mainframe = document.getElementById("main");

    mainframe.appendChild(quit);
    mainframe.appendChild(tryagain);
    mainframe.appendChild(gameover_str);
    mainframe.appendChild(scoretext);
    context.restore();
}

window.onload = start;
