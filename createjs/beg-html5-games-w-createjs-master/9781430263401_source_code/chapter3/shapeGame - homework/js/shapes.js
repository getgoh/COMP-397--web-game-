var stage;
var shapes = [];
var slots = [];
var score = 0;

function init() {
    stage = new createjs.Stage("canvas");

    drawShapes();
    
    startGame();
}

function drawShapes()
{
    // create target CIRCLE
    circle = new createjs.Shape();
    circle.graphics.beginStroke('#0000FF');
    circle.graphics.beginFill('#FFF').drawCircle(0, 0, 50);
    circle.set({x:stage.canvas.width / 4});
    circle.x = (stage.canvas.width / 3) - 50;
    circle.y = stage.canvas.height / 4;
    circle.targetX = circle.x + 25;
    circle.targetY = circle.y + 25;
    stage.addChild(circle);
    slots.push(circle);

    // create target RECTANGLE
    rectangle = new createjs.Shape();
    rectangle.graphics.beginStroke('#FF0000');
    rectangle.graphics.beginFill('#FFF');
    rectangle.graphics.drawRect(0, 0, 80, 80);
    rectangle.set({x:stage.canvas.width / 4});
    rectangle.x = (stage.canvas.width / 3) + 50;
    rectangle.y = stage.canvas.height/4 - 40;
    rectangle.targetX = rectangle.x + 40;
    rectangle.targetY = rectangle.y + 40;
    stage.addChild(rectangle);
    slots.push(rectangle);

    // create target TRIANGLE
    tri = new createjs.Shape();
    tri.graphics.beginStroke('#e2e532');
    tri.graphics.beginFill('#FFF');
    tri.graphics.moveTo(50, 0)
            .lineTo(0, 100)
            .lineTo(100, 100)
            .lineTo(50, 0);
    tri.x = (stage.canvas.width / 3) + 200;
    tri.y = stage.canvas.height/4 - 50;
    tri.targetX = tri.x + 50;
    tri.targetY = tri.y + 50;
    stage.addChild(tri);
    slots.push(tri);

    // create draggable CIRCLE
    circle2 = new createjs.Shape();
    circle2.graphics.beginFill('#0000FF').drawCircle(0, 0, 50);
    circle2.regX = circle2.regY = 25;
    circle2.set({x:stage.canvas.width / 4});
    circle2.x = circle2.homeX = (stage.canvas.width / 3) - 25;
    circle2.y = circle2.homeY = (stage.canvas.height / 4) + 225;
    circle2.addEventListener("mousedown", startDrag);
    circle2.key = 0;
    stage.addChild(circle2);

    // create draggable RECTANGLE
    rectangle2 = new createjs.Shape();
    rectangle2.graphics.beginStroke('#000');
    rectangle2.graphics.beginFill('#FF0000');
    rectangle2.regX = rectangle2.regY = 40;
    rectangle2.graphics.drawRect(0, 0, 80, 80);
    rectangle2.set({x:stage.canvas.width / 4});
    rectangle2.x = rectangle2.homeX = (stage.canvas.width / 3) + 90;
    rectangle2.y = rectangle2.homeY = (stage.canvas.height/4) + 200;
    rectangle2.addEventListener("mousedown", startDrag);
    rectangle2.key = 1;
    stage.addChild(rectangle2);

    // create draggable TRIANGLE
    tri2 = new createjs.Shape();
    tri2.graphics.beginStroke('#000');
    tri2.graphics.beginFill('#e2e532');
    tri2.regX = tri2.regY = 50;
    tri2.graphics.moveTo(50, 0)
            .lineTo(0, 100)
            .lineTo(100, 100)
            .lineTo(50, 0);
    tri2.x = tri2.homeX = (stage.canvas.width / 3) + 250;
    tri2.y = tri2.homeY = (stage.canvas.height/4) + 200;
    tri2.addEventListener("mousedown", startDrag);
    tri2.key = 2;
    stage.addChild(tri2);
}

function startGame() {
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", function (e) {
        stage.update();
    });
}

function startDrag(e) {
    var shape = e.target;
    var slot = slots[shape.key];
    stage.setChildIndex(shape, stage.getNumChildren() - 1);
    stage.addEventListener('stagemousemove', function (e) {
        shape.x = e.stageX;
        shape.y = e.stageY;
    });
    stage.addEventListener('stagemouseup', function (e) {
        stage.removeAllEventListeners();
        var pt = slot.globalToLocal(stage.mouseX, stage.mouseY);
        if (slot.hitTest(pt.x, pt.y)) {
            shape.removeEventListener("mousedown",startDrag);
            score++;
            createjs.Tween.get(shape).to({x:slot.targetX, y:slot.targetY}, 200, createjs.Ease.quadOut).call(checkGame);
            console.log('h');
        }
        else {
            createjs.Tween.get(shape).to({x:shape.homeX, y:shape.homeY}, 200, createjs.Ease.quadOut);
        }
    });
}
function checkGame(){
    if(score == 3){
        gameOver();
    }
}
function gameOver() {
    //stage.removeAllChildren();
    var msg = "You Win!";
    gameOverTxt = new createjs.Text(msg, "36px Arial");
    gameOverTxt.color = 'blue';
    gameOverTxt.textAlign = 'center';
    gameOverTxt.textBaseline = 'middle';
    gameOverTxt.x = stage.canvas.width / 2;
    gameOverTxt.y = stage.canvas.height / 2;
    stage.addChild(gameOverTxt);
}