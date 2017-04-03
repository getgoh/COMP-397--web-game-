var stage, queue;

var faces = ['ace_c', 'ace_d', 'ace_h', 'ace_s',
             'jack_c', 'jack_d', 'jack_h', 'jack_s',
             'king_c', 'king_d', 'king_h', 'king_s',
             'queen_c', 'queen_d', 'queen_h', 'queen_s',
             'black_joker', 'red_joker'];
var cards = [];
var cardsFlipped = [];
var matches = 0;

function preload() {
    queue = new createjs.LoadQueue();
    queue.addEventListener("complete", init);
    queue.loadManifest([
        {id:"back", src:"img/back.jpg"},
        {id:"ace_c", src:"img/ace_c.jpg"},
        {id:"ace_d", src:"img/ace_d.jpg"},
        {id:"ace_h", src:"img/ace_h.jpg"},
        {id:"ace_s", src:"img/ace_s.jpg"},
        {id:"jack_c", src:"img/jack_c.jpg"},
        {id:"jack_d", src:"img/jack_d.jpg"},
        {id:"jack_h", src:"img/jack_h.jpg"},
        {id:"jack_s", src:"img/jack_s.jpg"},
        {id:"king_c", src:"img/king_c.jpg"},
        {id:"king_d", src:"img/king_d.jpg"},
        {id:"king_h", src:"img/king_h.jpg"},
        {id:"king_s", src:"img/king_s.jpg"},
        {id:"queen_c", src:"img/queen_c.jpg"},
        {id:"queen_d", src:"img/queen_d.jpg"},
        {id:"queen_h", src:"img/queen_h.jpg"},
        {id:"queen_s", src:"img/queen_s.jpg"},
        {id:"black_joker", src:"img/black_joker.jpg"},
        {id:"red_joker", src:"img/red_joker.jpg"}
    ]);
}

var container;
var _stage;
var holder;

function init() {
    _stage = document.getElementById('canvas');
    holder = document.getElementById('holder');
    stage = new createjs.Stage(_stage);

    container = new createjs.Container();
    stage.addChild(container);

    startGame();
    showMenu();
}

function start()
{
    stage.removeChild(container);
    buildCards();
    shuffleCards();
    dealCards();
}

function showMenu()
{
    drawButton();
    drawText();
}

function drawButton()
{
    var btnText = "a";

    var btnX = stage.canvas.width/4;        
    var btnY = (stage.canvas.height/3) + 180;
    var btnWidth = 120;
    var btnHeight = 40;

    for(var xx = 1; xx <= 3; xx ++)
    {

        switch(xx)
        {
            case 1:
                btnText = "Easy";
                btnX = stage.canvas.width/2 - (btnWidth/2) - btnWidth - 20;
                difficulty = xx;
                break;
            case 2:
                btnText = "Medium";
                btnX = stage.canvas.width/2 - (btnWidth/2);
                difficulty = xx;
                break;
            case 3:
                btnText = "Hard";
                btnX = stage.canvas.width/2 - (btnWidth/2) + btnWidth + 20;
                difficulty = xx;
                break;
        }

        var txt = new createjs.Text(btnText);
        var btn = new createjs.Shape();
        btn.graphics.beginStroke("#000");
        btn.graphics.beginFill("#CCC");
        
        btn.graphics.drawRect(btnX , btnY, btnWidth, btnHeight);
        container.addChild(btn);
        txt.textAlign = 'center';
        txt.textBaseline = 'middle';
        txt.x = btnX + btnWidth/2;
        txt.y = btnY + btnHeight/2;
        container.addChild(txt);
        switch(xx)
        {
            case 1: btn.addEventListener("click", easyMode); break;
            case 2: btn.addEventListener("click", mediumMode); break;
            case 3: btn.addEventListener("click", hardMode); break;
        }
    }
}

function easyMode(e)
{
    console.log("easy");
    diffCount = 2;
    cardsPerRow = 2;
    holder.style.width = "320px";
    _stage.width = 320;
    _stage.height = 360;
    start();

}

function mediumMode(e)
{   
    console.log("medium");
    diffCount = 8;
    cardsPerRow = 4;
    holder.style.width = "620px";
    _stage.width = 620;
    _stage.height = 680;
    start();
}

function hardMode(e)
{
    console.log("hard");
    diffCount = 18;
    cardsPerRow = 6;
    holder.style.width = "920px";
    _stage.width = 920;
    _stage.height = 1000;
    start();
}


function drawText()
{
    var title = new createjs.Text("Concentration Game", "50px Arial", "#ff7700");
    title.textBaseline = "middle";
    title.textAlign = "center";
    title.x = stage.canvas.width / 2;
    title.y = stage.canvas.height / 3;
    container.addChild(title);

    var text = new createjs.Text("Choose a difficulty", "16px Arial", "#ff7700");
    text.textBaseline = "middle";
    text.textAlign = "center";
    text.x = stage.canvas.width / 2;
    text.y = (stage.canvas.height / 3) + 80;
    container.addChild(text);
}

var cardsPerRow = 2; // 2, 4, 6
var diffCount = 2; // 2, 8, 18

function buildCards() {
    var i, card, card2, bmp, label, face;
    for (i = 0; i < diffCount; i++) {
        card = new createjs.Container();
        bmp = new createjs.Bitmap(queue.getResult('back'));
        bmp.shadow = new createjs.Shadow("#666", 3, 3, 5);
        card.regX = bmp.image.width / 2;
        card.regY = bmp.image.height / 2;
        card.addChild(bmp);
        face = faces[i]
        bmp = new createjs.Bitmap(queue.getResult(face));
        bmp.regX = bmp.image.width / 2;
        bmp.regY = bmp.image.height / 2;
        bmp.x = card.regX;
        bmp.y = 70;
        card.addChild(bmp);
        bmp = new createjs.Bitmap(queue.getResult('back'));
        bmp.name = 'back';
        card.addChild(bmp);
        card2 = card.clone(true);
        card.key = card2.key = faces[i];
        cards.push(card, card2);
    }
}
function shuffleCards() {
    var i, card, randomIndex;
    var l = cards.length;
    var shuffledCards = [];
    for (i = 0; i < l; i++) {
        randomIndex = Math.floor(Math.random() * cards.length);
        shuffledCards.push(cards[randomIndex]);
        cards.splice(randomIndex, 1);
    }
    cards = cards.concat(shuffledCards);
}
function dealCards() {
    var i, card;
    var xPos = 80;
    var yPos = 100;
    var count = 0;
    for (i = 0; i < cards.length; i++) {
        card = cards[i];
        card.x = -200;
        card.y = 400;
        card.rotation = Math.random() * 600;
        card.addEventListener('click', flipCard);
        stage.addChild(card);
        createjs.Tween.get(card)
            .wait(i * 100)
            .to({x:xPos, y:yPos, rotation:0}, 300);
        xPos += 150;
        count++;
        if (count === cardsPerRow) {
            count = 0;
            xPos = 80;
            yPos += 160;
        }
    }
}
function flipCard(e) {
    if (cardsFlipped.length === 2) {
        return;
    }
    var card = e.currentTarget;
    card.mouseEnabled = false;
    card.getChildByName('back').visible = false;
    cardsFlipped.push(card);
    if (cardsFlipped.length === 2) {
        evalCardsFlipped();
    }
}
function evalCardsFlipped() {
    if (cardsFlipped[0].key === cardsFlipped[1].key) {
        matches++;
        evalGame();
    }
    else {
        setTimeout(resetFlippedCards, 1000);
    }
}
function resetFlippedCards() {
    cardsFlipped[0].mouseEnabled = cardsFlipped[1].mouseEnabled = true;
    cardsFlipped[0].getChildByName('back').visible = true;
    cardsFlipped[1].getChildByName('back').visible = true;
    cardsFlipped = [];
}
function evalGame() {
    if (matches === cards.length/2) {
        setTimeout(function () {
            alert('YOU WIN!')
        }, 300)
    }
    else {
        cardsFlipped = [];
    }
}
function startGame() {
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", function (e) {
        stage.update();
    });
}