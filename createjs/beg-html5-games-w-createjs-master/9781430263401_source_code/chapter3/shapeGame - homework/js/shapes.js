var stage;
var shapes = [];
var slots = [];
var score = 0;

function init() {
    stage = new createjs.Stage("canvas");

    drawShapes();

    // buildShapes();
    // setShapes();
    
    startGame();
}

function drawShapes()
{
    // create circle
    circle = new createjs.Shape();
    circle.graphics.beginFill('#0000FF').drawCircle(0, 0, 50);
    circle.set({x:stage.canvas.width / 4});
    circle.x = (stage.canvas.width / 3) - 50;
    circle.y = stage.canvas.height / 4;
    stage.addChild(circle);

    //RECTANGLE
    rectangle = new createjs.Shape();
    rectangle.graphics.beginStroke('#000');
    rectangle.graphics.beginFill('#FF0000');
    rectangle.graphics.drawRect(0, 0, 80, 80);
    rectangle.set({x:stage.canvas.width / 4});
    rectangle.x = (stage.canvas.width / 3) + 50;
    rectangle.y = stage.canvas.height/4 - 40;
    stage.addChild(rectangle);

    //TRIANGLE
    tri = new createjs.Shape();
    tri.graphics.beginStroke('#000');
    tri.graphics.beginFill('#e2e532');
    tri.graphics.moveTo(50, 0)
            .lineTo(0, 100)
            .lineTo(100, 100)
            .lineTo(50, 0);
    tri.x = (stage.canvas.width / 3) + 200;
    tri.y = stage.canvas.height/4 - 50;
    stage.addChild(tri);

    // create circle
    circle2 = new createjs.Shape();
    circle2.graphics.beginFill('#0000FF').drawCircle(0, 0, 50);
    circle2.set({x:stage.canvas.width / 4});
    circle2.x = (stage.canvas.width / 3) - 50;
    circle2.y = (stage.canvas.height / 4) + 200;
    stage.addChild(circle2);

    //RECTANGLE
    rectangle2 = new createjs.Shape();
    rectangle2.graphics.beginStroke('#000');
    rectangle2.graphics.beginFill('#FF0000');
    rectangle2.graphics.drawRect(0, 0, 80, 80);
    rectangle2.set({x:stage.canvas.width / 4});
    rectangle2.x = (stage.canvas.width / 3) + 50;
    rectangle2.y = (stage.canvas.height/4 - 40) + 200;
    stage.addChild(rectangle2);

    //TRIANGLE
    tri2 = new createjs.Shape();
    tri2.graphics.beginStroke('#000');
    tri2.graphics.beginFill('#e2e532');
    tri2.graphics.moveTo(50, 0)
            .lineTo(0, 100)
            .lineTo(100, 100)
            .lineTo(50, 0);
    tri2.x = (stage.canvas.width / 3) + 200;
    tri2.y = (stage.canvas.height/4 - 50) + 200;
    stage.addChild(tri2);
}

function buildShapes() {
    var colors = ['blue', 'red', 'green', 'yellow'];
    var i, shape, slot;
    for (i = 0; i < 4; i++) {
        //slots
        slot = new createjs.Shape();
        slot.graphics.beginStroke(colors[i]);
        slot.graphics.beginFill(createjs.Graphics.getRGB(255, 255, 255, 1));
        slot.graphics.drawRect(0, 0, 100, 100);
        slot.regX = slot.regY = 50;
        slot.key = i;
        slot.y = 80;
        slot.x = (i * 130) + 100;
        stage.addChild(slot);
        slots.push(slot);
        //shapes
        shape = new createjs.Shape();
        shape.graphics.beginFill(colors[i]);
        shape.graphics.drawRect(0, 0, 100, 100);
        shape.regX = shape.regY = 50;
        shape.key = i;
        shapes.push(shape);
    }
}
function setShapes() {
    var i, r, shape;
    var l = shapes.length;
    for (i = 0; i < l; i++) {
        r = Math.floor(Math.random() * shapes.length);
        shape = shapes[r];
        shape.homeY = 320;
        shape.homeX = (i * 130) + 100;
        shape.y = shape.homeY;
        shape.x = shape.homeX;
        shape.addEventListener("mousedown", startDrag);
        stage.addChild(shape);
        shapes.splice(r, 1);
    }
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
            createjs.Tween.get(shape).to({x:slot.x, y:slot.y}, 200, createjs.Ease.quadOut).call(checkGame);
            console.log('h');
        }
        else {
            createjs.Tween.get(shape).to({x:shape.homeX, y:shape.homeY}, 200, createjs.Ease.quadOut);
        }
    });
}
function checkGame(){
    if(score == 4){
        alert('You Win!');
    }
}