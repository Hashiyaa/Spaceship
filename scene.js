// @ts-check

//////////////////// game settings ////////////////////
const MAX_HP = 2000;
const HP_GAIN = 100;
const HP_LOSS = 50;

let isOver = false;
let isPlaying = false;
let playBGM = false;
let score = 0;
let hScore = 0;
let hp = MAX_HP;

//////////////////// spaceship settings ////////////////////
let posX;
let posY;
let dirX = 0;
let dirY = 0;
let speed = 10;

// set up collectors
const COLLECTOR_TYPES = ['household_food_waste', 'residual_waste', 'recyclable_waste', 'hazardous_waste'];
let collectorIndex = 0;

// offset of pan relative to spaceship
let panY = 75;

//////////////////// UI settings ////////////////////
let div = document.getElementById("main");
// set up the canvas
let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas"));
let context = canvas.getContext("2d");

// handle prompt message
let scoreMsg;
let scoreMsgTimer = 0;
let scoreMsgRate = 50;

//////////////////// garbage settings ////////////////////
let householdWaste = ['apple', 'bone', 'cheese', 'fish', 'watermelon'];
let residualWaste = ['cup'];
let recyclableWaste = ['can', 'soda'];
let hazardousWaste = ['battery', 'bulb'];
let garbageTypes = [householdWaste, residualWaste, recyclableWaste, hazardousWaste];

let garbages = [];
let garbageRate = 80;
let garbageTimer = garbageRate;

// handle skull showing up
let skull;
let skullTimer = 0;
let skullRate = 50;

//////////////////// assets ////////////////////
let spaceshipImg = new Image();
spaceshipImg.src = 'images/spaceship.png'; // Set source path
let panImg = new Image();
panImg.src = "images/dustpan.png";
let typeImg = new Image();
typeImg.src = 'images/'.concat(COLLECTOR_TYPES[collectorIndex], '.png');
let skullImg = new Image();
skullImg.src = "images/skull.png";

window.onload = function () {
    let audioButton = document.createElement("button");
    audioButton.id = "audioButton";
    audioButton.className = "button";
    audioButton.style.backgroundImage = "url('images/mute.png')";

    let bgm = /** @type {HTMLAudioElement} */ (document.getElementById("music"));
    audioButton.onclick = function () {
        if (!playBGM) {
            bgm.play();
            bgm.muted = false;
            audioButton.style.backgroundImage = "url('images/audio.png')";
            playBGM = true;
        } else if (bgm.muted) {
            bgm.muted = false;
            audioButton.style.backgroundImage = "url('images/audio.png')";
        } else {
            bgm.muted = true;
            audioButton.style.backgroundImage = "url('images/mute.png')";
        }
    };
    div.appendChild(audioButton);
    loadMenuScene();
};

//////////////////// callback functions ////////////////////
window.onkeydown = function (event) {
    event.preventDefault();
    if (isPlaying) {
        let key = event.keyCode; //Key code of key pressed

        // white space
        if (key === 32) {
            collectorIndex = ((collectorIndex + 1) % COLLECTOR_TYPES.length);
        }
    
        // right arrow or d
        if (key === 39 || key === 68) {
            dirX = 1;
        }
        // left arrow or a
        else if (key === 37 || key === 65) {
            dirX = -1;
        }
        // top arrow or w
        else if (key === 38 || key === 87) {
            dirY = -1;
        }
        // down arrow of s
        else if (key === 40 || key === 83) {
            dirY = 1;
        }
        // delete or backspace, for debug use
        else if (key === 8) {
            hp = 0;
        }
    }
};

window.onkeyup = function (event) {
    // stop moving as soon as any key is up
    dirX = 0;
    dirY = 0;
};

//////////////////// loading/UI functions ////////////////////
function removeUI() {
    // remove UI elements
    let UIs = document.getElementsByClassName('UI');
    while (UIs[0])
        UIs[0].parentNode.removeChild(UIs[0]);
}

function loadMenuScene() {
    removeUI();
    context.clearRect(0, 0, canvas.width, canvas.height);

    let startMenu = document.createElement("div");
    startMenu.className = "menu UI";

    let title = document.createElement("p");
    title.className = "title";
    title.innerHTML = "Spaceship";
    startMenu.appendChild(title);

    let subtitle = document.createElement("p");
    subtitle.className = "subtitle";
    subtitle.innerHTML = "The Garbage Collector";
    startMenu.appendChild(subtitle);

    // Create Buttons
    let startButton = document.createElement("button");
    startButton.id = "startButton";
    startButton.className = "rectButton";
    startButton.innerHTML = "START";
    startButton.style.marginTop = "20px";
    startButton.onclick = loadGameScene;
    startMenu.appendChild(startButton);

    let storyButton = document.createElement("button");
    storyButton.id = "storyButton";
    storyButton.className = "rectButton";
    storyButton.innerHTML = "STORY";
    storyButton.style.marginTop = "20px";
    storyButton.onclick = loadStoryScene;
    startMenu.appendChild(storyButton);

    let helpButton = document.createElement("button");
    helpButton.id = "helpButton";
    helpButton.className = "rectButton";
    helpButton.innerHTML = "HELP";
    helpButton.style.marginTop = "20px";
    helpButton.onclick = loadHelpScene;
    startMenu.appendChild(helpButton);

    div.appendChild(startMenu);
}

function loadStoryScene() {
    removeUI();
    let storyMenu = document.createElement("div");
    storyMenu.className = "menu UI";

    let storyText = document.createElement("p");
    storyText.className = "paragraph";
    storyText.innerHTML = "";
    storyMenu.appendChild(storyText);

    // Create Buttons
    let backButton = document.createElement("button");
    backButton.id = "backButton";
    backButton.className = "rectButton";
    backButton.innerHTML = "BACK";
    backButton.style.marginTop = "30px";
    backButton.onclick = loadMenuScene;

    storyMenu.appendChild(backButton);

    div.appendChild(storyMenu);
}

function loadHelpScene() {
    removeUI();
    let helpMenu = document.createElement("div");
    helpMenu.className = "menu UI";

    let movementBox = document.createElement("div");
    movementBox.className = "box";

    let WASDKeyImg = document.createElement("img");
    WASDKeyImg.src = "images/WASD.png";
    movementBox.appendChild(WASDKeyImg);

    let orText = document.createElement("p");
    orText.id = "instructionText";
    orText.innerHTML = "&nbsp OR &nbsp";
    movementBox.appendChild(orText);

    let ArrowKeyImg = document.createElement("img");
    ArrowKeyImg.src = "images/arrow_keys.png";
    movementBox.appendChild(ArrowKeyImg);

    let movementText = document.createElement("p");
    movementText.id = "instructionText";
    movementText.innerHTML = "&nbsp to control the spaceship";
    movementBox.appendChild(movementText);

    helpMenu.appendChild(movementBox);

    let spaceBox = document.createElement("div");
    spaceBox.className = "box";

    let spaceKeyImg = document.createElement("img");
    spaceKeyImg.src = "images/space_key.png";
    spaceBox.appendChild(spaceKeyImg);

    let spaceText = document.createElement("p");
    spaceText.id = "instructionText";
    spaceText.innerHTML = "&nbsp to switch the type of your garbage collector";
    spaceBox.appendChild(spaceText);

    helpMenu.appendChild(spaceBox);

    let promptText = document.createElement("p");
    promptText.id = "instructionText";
    promptText.innerHTML = "Use the correct collector to recycle garbage \nand power your spaceship!";
    promptText.style.lineHeight = "50px";
    promptText.style.whiteSpace = "pre-wrap";
    helpMenu.appendChild(promptText);

    // Create Buttons
    let backButton = document.createElement("button");
    backButton.id = "backButton";
    backButton.className = "rectButton";
    backButton.innerHTML = "BACK";
    backButton.style.marginTop = "30px";
    backButton.onclick = loadMenuScene;

    helpMenu.appendChild(backButton);

    div.appendChild(helpMenu);
}

function loadGameScene() {
    // remove UI elements
    removeUI();
    
    let pauseMenu = document.createElement("div");
    pauseMenu.className = "menu UI";
    pauseMenu.style.display = "none";

    let pausetext = document.createElement("p");
    pausetext.id = "pauseText";
    pausetext.innerHTML = "PAUSING...";

    pauseMenu.appendChild(pausetext);

    let resumeButton = document.createElement("button");
    resumeButton.id = "resumeButton";
    resumeButton.className = "rectButton";
    resumeButton.innerHTML = "RESUME";
    resumeButton.style.marginTop = "50px";
    resumeButton.onclick = function () {
        isPlaying = true;
        pauseMenu.style.display = "none";
    };
    pauseMenu.appendChild(resumeButton);

    let quitButton = document.createElement("button");
    quitButton.id = "quitButton";
    quitButton.className = "rectButton";
    quitButton.innerHTML = "QUIT";
    quitButton.style.marginTop = "50px";
    quitButton.onclick = function () {
        isOver = true;
        loadMenuScene();
    };
    pauseMenu.appendChild(quitButton);

    div.appendChild(pauseMenu);

    let pauseButton = document.createElement("button");
    pauseButton.id = "pauseButton";
    pauseButton.className = "button UI";
    pauseButton.style.left = "790px";
    pauseButton.style.backgroundImage = "url(images/pause.png)";
    pauseButton.onclick = function () {
        if (isPlaying) {
            pauseMenu.style.display = "flex";
        } else {
            pauseMenu.style.display = "none";
        }
        isPlaying = !isPlaying;
    };
    div.appendChild(pauseButton);

    // reset some global variables
    hp = MAX_HP;
    isOver = false;
    isPlaying = true;
    score = 0;

    posX = canvas.width / 2;
    posY = canvas.height - 150;
    collectorIndex = 0;

    garbages = [];

    let energyBar = document.createElement("progress");
    energyBar.id = "energyBar";
    energyBar.className = "UI";
    energyBar.max = MAX_HP;
    energyBar.value = 0;
    div.appendChild(energyBar);

    let energyIcon = document.createElement("img");
    energyIcon.id = "energyIcon";
    energyIcon.className = "UI";
    energyIcon.src = "images/energy.png";
    div.appendChild(energyIcon);

    let clock = 0;
    let offset = Date.now();

    function draw() {
        if (isOver) return;

        if (isPlaying) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.save();

            ////////// spaceship section //////////
            drawSpaceship(posX, posY, spaceshipImg);
            // set bounds
            let leftBound = 20;
            let rightBound = canvas.width - 20;
            let upperBound = 200;
            let lowerBound = canvas.height - 50;
            // update the position
            if ((posX >= leftBound && dirX < 0) || (posX <= rightBound && dirX > 0)) {
                posX += dirX * speed;
            }
            if ((posY >= upperBound && dirY < 0) || (posY <= lowerBound && dirY > 0)) {
                posY += dirY * speed;
            }
            // console.log("x: " + posX + " y: " + posY);
            // check for collision between spaceship and garbage constantly
            detectCollision();
            // draw the skull if hit
            if (skull) {
                if (skullTimer < skullRate) {

                    context.drawImage(skullImg, skull.posX - 0.5 * skullImg.width,
                        skull.posY - 0.5 * skullImg.height);
                    skullTimer++;
                } else {
                    skull = null;
                    skullTimer = 0;
                }
            }

            ////////// garbage section //////////
            garbageTimer++;
            if (garbageTimer >= garbageRate) {
                generateGarbage();
                garbageTimer = 0;
            }
            // update the position of garbages
            for (let i = 0; i < garbages.length; i++) {
                let g = garbages[i];
                context.drawImage(g.Img, g.posX - g.Img.width * 0.5, g.posY - g.Img.height * 0.5);
                if (g.posY > canvas.height) {
                    garbages.splice(i, 1);
                    i--;
                } else {
                    g.posY += g.v;
                }
            }

            ////////// UI section //////////
            // draw texts
            context.save();
            context.fillStyle = "white";
            let collectorWords = COLLECTOR_TYPES[collectorIndex].split("_");
            let collectorInfo = collectorWords.join(" ");
            context.font = "16px Georgia";
            context.fillText("Collector type now: " + collectorInfo, canvas.width - 300, 580);
            context.fillText("Score: " + score, 80, 25);
            context.fillText("Highest score: " + hScore, 180, 25);
            context.fillText("Energy remaining: " + hp, 110, 70);

            if (scoreMsg) {
                if (scoreMsgTimer < scoreMsgRate) {
                    context.fillText(scoreMsg, 300, 70);
                    scoreMsgTimer++;
                } else {
                    scoreMsg = null;
                    scoreMsgTimer = 0;
                }
            }

            clock += (Date.now() - offset) / 1000;
            let second = Math.floor(clock % 60).toString();
            if ((Number(second) < 10)) second = '0' + second;
            let minute = Math.floor(clock / 60).toString();
            if ((Number(minute) < 10)) minute = '0' + minute;
            // console.log(second);
            context.fillText("Time: " + minute + " : " + second, canvas.width - 220, 43);
            
            context.restore();
            // update hp and energy bar
            if (hp > 0) {
                hp--;
            } else {
                loadGameoverScene(minute, second);
            }
            energyBar.value = hp;

            context.restore();
        }

        offset = Date.now();
        window.requestAnimationFrame(draw);
    }
    draw();
}

function loadGameoverScene(minute, second) {
    removeUI();

    isOver = true;
    isPlaying = false;
    skullTimer = skullRate;

    // update highest score
    if (score > hScore) hScore = score;

    context.clearRect(0, 0, canvas.width, canvas.height);

    let gameoverMenu = document.createElement("div");
    gameoverMenu.className = "menu UI";

    let gameoverText = document.createElement("p");
    gameoverText.className = "title";
    gameoverText.innerHTML = "GAME OVER";
    gameoverMenu.appendChild(gameoverText);

    let scoreText = document.createElement("p");
    scoreText.id = "scoreText";
    scoreText.innerHTML = "Time: " + minute + " : " + second + "&nbsp &nbsp &nbsp Score: " + score;
    gameoverMenu.appendChild(scoreText);

    let tryAgainButton = document.createElement("button");
    tryAgainButton.id = "tryAgainButton";
    tryAgainButton.className = "rectButton";
    tryAgainButton.innerHTML = "TRY AGAIN";
    tryAgainButton.style.marginBottom = "50px";
    tryAgainButton.onclick = loadGameScene;
    gameoverMenu.appendChild(tryAgainButton);

    let quitButton = document.createElement("button");
    quitButton.id = "quitButton";
    quitButton.className = "rectButton";
    quitButton.innerHTML = "QUIT";
    quitButton.style.marginBottom = "50px";
    quitButton.onclick = loadMenuScene;
    gameoverMenu.appendChild(quitButton);

    div.appendChild(gameoverMenu);
}

//////////////////// drawing functions ////////////////////
function drawSpaceship(posX, posY, spaceshipImg) {
    context.save();
    typeImg.src = 'images/'.concat(COLLECTOR_TYPES[collectorIndex], '.png');
    let typeY = panY + 12; // offset of pan relative to spaceship
    context.drawImage(panImg, posX - panImg.width * 0.5, posY - panY - panImg.height * 0.5);
    context.drawImage(spaceshipImg, posX - spaceshipImg.width * 0.5, posY - spaceshipImg.height * 0.5);
    context.drawImage(typeImg, posX - typeImg.width * 0.5, posY - typeY - typeImg.height * 0.5);
    // drawRefDot(context, posX, posY);
    context.restore();
}

function drawRefDot(posX, posY) {
    context.save();
    context.beginPath();
    context.arc(posX, posY, 10, 0, Math.PI * 2);
    context.fill();
    context.restore();
}

//////////////////// algorithm functions ////////////////////
function inside(x, y, vs) {
    // based on http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
    let inside = false;
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        let xi = vs[i][0],
            yi = vs[i][1];
        let xj = vs[j][0],
            yj = vs[j][1];

        let intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
}

function detectCollision() {
    for (let i = 0; i < garbages.length; i++) {
        // let gbgX = garbageList[i].getX() + garbageList[i].
        let g = garbages[i];
        // zone of detection
        let polygon = [
            [posX - panImg.width * 0.5, posY - panY - panImg.height * 0.5],
            [posX + panImg.width * 0.5, posY - panY - panImg.height * 0.5],
            [posX + panImg.width * 0.5, posY - panY + panImg.height * 0.5],
            [posX - panImg.width * 0.5, posY - panY + panImg.height * 0.5]
        ];
        if (inside(g.posX, g.posY, polygon)) {
            if (g.type === COLLECTOR_TYPES[collectorIndex]) {
                let hit = new Audio("sound/correct.wav");
                hit.load();
                hit.play();
                scoreMsg = "+" + HP_GAIN;
                hp = hp + HP_GAIN; // hp reward for collecting the correct garbage
                score++;
            } else {
                let miss = new Audio("sound/hitting.wav");
                miss.load();
                miss.play();
                scoreMsg = "-" + HP_LOSS;
                if (hp > HP_LOSS) {
                    hp -= HP_LOSS; // hp penalty for hitting the wrong garbage
                } else {
                    hp = 0;
                }
                skull = g; // make skull at the same position of that garbage
            }
            // remove garbage from the array
            garbages.splice(i, 1);
            i--;
        }
    }
}

function generateGarbage() {
    // randomly generate a type of garbage
    let typeIndex = Math.floor(Math.random() * garbageTypes.length);
    let type = COLLECTOR_TYPES[typeIndex];
    let nameIndex = Math.floor(Math.random() * garbageTypes[typeIndex].length);
    let name = (garbageTypes[typeIndex])[nameIndex];
    let Img = new Image();
    Img.src = "images/" + name + ".png";
    // range from 75, 525
    let randomX = Math.floor(Math.random() * (canvas.width - 150) + 75);
    // range from 0.5 to 2
    let randomVelocity = Math.random() * 1.5 + 0.5;
    // create a new garbage
    let g = {
        posX: randomX,
        posY: 0,
        type: type,
        name: name,
        Img: Img,
        v: randomVelocity
    };
    garbages.push(g);
}