var stage, livesTxt, gameOverTxt, win;
var answer = "CREATEJS IS&AWESOME"
var abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var lives = 5;
var lettersNeeded = 0;


function init() {
    stage = new createjs.Stage("canvas");
    drawBoard();
    drawLetters();
    drawMessages();
    startGame();

    drawHangman();
}


function drawHangman()
{
    hangStage = new createjs.Shape();
    hangStage.graphics.beginStroke("#000");
    hangStage.x = stage.canvas.width - 20;
    hangStage.y = stage.canvas.height - 20;
    hangStage.graphics.moveTo(0, 0)
        .lineTo(0, -30)
        .lineTo(-120, -30)
        .lineTo(-120, 0)
        .moveTo(-90, -30)
        .lineTo(-90, -200)
        .lineTo(-40, -200)

    stage.addChild(hangStage);
}

function drawRope()
{
    hangStage.graphics.lineTo(-40, -170);
}

function drawHead()
{
    // create circle
    circle = new createjs.Shape();
    circle.graphics.beginStroke('#000').drawCircle(0, 0, 8);
    circle.x = stage.canvas.width - 60;
    circle.y = stage.canvas.height - 182;
    stage.addChild(circle);
}

function drawBody()
{
    bod = new createjs.Shape();
    bod.graphics.beginStroke("#000");
    bod.x = stage.canvas.width - 60;
    bod.y = stage.canvas.height - 174;
    bod.graphics.moveTo(0, 0)
        .lineTo(0, 40);

    stage.addChild(bod);
}

function drawHands()
{
    hands = new createjs.Shape();
    hands.graphics.beginStroke("#000");
    hands.x = stage.canvas.width - 60;
    hands.y = stage.canvas.height - 162;
    hands.graphics.moveTo(0,0)
        .lineTo(-15, 8)
        .moveTo(0,0)
        .lineTo(15,8);

    stage.addChild(hands);
}

function drawFeet()
{
    feet = new createjs.Shape();
    feet.graphics.beginStroke("#000");
    feet.x = stage.canvas.width - 60;
    feet.y = stage.canvas.height - 134;
    feet.graphics.moveTo(0,0)
        .lineTo(-15, 10)
        .moveTo(0,0)
        .lineTo(15,10);

    stage.addChild(feet);
}

function drawBoard() {
    var i, char, box;
    var xPos = 20;
    var yPos = 90;
    for (i = 0; i < answer.length; i++) {
        char = answer[i];
        if (char != ' ' && char != '&') {
            lettersNeeded++;
            box = new createjs.Shape();
            box.graphics.beginStroke("#000");
            box.graphics.drawRect(0, 0, 20, 24);
            box.regX = 10;
            box.regY = 12;
            box.x = xPos;
            box.y = yPos;
            box.name = 'box_' + i;
            box.key = char;
            stage.addChild(box);
        }
        xPos += 26;
        if (char == '&') {
            yPos += 40;
            xPos = 20;
        }

    }
}
function drawLetters() {
    var i, char, txt, btn;
    var cnt = 0;
    var xPos = 20;
    var yPos = 200;
    for (i = 0; i < abc.length; i++) {
        char = abc[i];
        btn = new createjs.Shape();
        btn.graphics.beginFill("#000");
        btn.graphics.beginStroke("#000");
        btn.graphics.drawRect(0, 0, 20, 24);
        btn.regX = 10;
        btn.regY = 12;
        btn.x = xPos;
        btn.y = yPos;
        stage.addChild(btn);
        //create text
        txt = new createjs.Text(char);
        txt.color = "#FFF";
        txt.textAlign = 'center';
        txt.textBaseline = 'middle';
        txt.x = xPos;
        txt.y = yPos;
        stage.addChild(txt);
        btn.txt = txt;
        btn.addEventListener('click', onLetterClick);
        //adjust positions
        xPos += 24;
        cnt++;
        if (cnt == 13) {
            yPos += 30;
            xPos = 20;
        }
    }
}
function drawMessages() {
    var txt = new createjs.Text("WORD GAME", "26px Arial");
    txt.color = "#99000";
    txt.x = txt.y = 10;
    stage.addChild(txt);
    livesTxt = new createjs.Text("LIVES: " + lives, "16px Arial");
    livesTxt.textAlign = 'right';
    livesTxt.y = 16;
    livesTxt.x = stage.canvas.width - 10;
    stage.addChild(livesTxt);
}
function onLetterClick(e) {
    var btn = e.target;
    var txt = btn.txt;
    btn.removeEventListener('click', onLetterClick);
    checkForMatches(txt);
    checkGame();
}
function checkForMatches(txt) {
    var letter = txt.text
    var i, char, box, newTxt;
    var match = false;
    for (i = 0; i < answer.length; i++) {
        char = answer[i];
        if (char == ' ' || char == '&') {
            continue;
        }
        box = stage.getChildByName('box_' + i);
        if (box.key == letter) {
            lettersNeeded--;
            match = true;
            newTxt = txt.clone();
            newTxt.color = "#000";
            newTxt.x = box.x;
            newTxt.y = box.y;
            stage.addChild(newTxt);
        }
    }
    stage.removeChild(txt);
    if (!match) {
        lives--;
        drawPart(lives);
        livesTxt.text = "LIVES: " + lives;
    }
}
function checkGame() {
    if (lettersNeeded == 0) {
        win = true;
        gameOver();
    }
    else if (lives == 0) {
        win = false;
        gameOver();
    }
}


function drawPart(lives)
{
    switch(lives)
    {
        case 4: drawRope(); break;
        case 3: drawHead(); break;
        case 2: drawBody(); break;
        case 1: drawHands(); break;
        case 0: 
            drawFeet();
            gameOver();
    
        break;
    }
}

function gameOver() {
    var msg = win ? "YOU WIN!" : "YOU LOSE";
    var txt = new createjs.Text(msg, "bold 36px Arial");
    txt.alpha = 0.01;
    txt.color = win ? 'blue' : 'red';
    txt.textAlign = 'center';
    txt.textBaseline = 'middle';
    txt.x = stage.canvas.width / 2;
    txt.y = stage.canvas.height / 2;
    stage.addChild(txt);
    createjs.Tween.get(txt)
        .to({alpha:1}, 2500);
}

function startGame() {
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", function (e) {
        stage.update();
    });
}
