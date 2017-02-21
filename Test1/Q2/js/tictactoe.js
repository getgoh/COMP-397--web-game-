var stage;

var width;
var	height;
var turn;

var col1 = [0, 0, 0, 0, 0, 0];
var col2 = [0, 0, 0, 0, 0, 0];
var col3 = [0, 0, 0, 0, 0, 0];
var col4 = [0, 0, 0, 0, 0, 0];
var col5 = [0, 0, 0, 0, 0, 0];
var col6 = [0, 0, 0, 0, 0, 0];
var col7 = [0, 0, 0, 0, 0, 0];

    function init() {
        stage = new createjs.Stage(document.getElementById('game'));
        createjs.Ticker.addEventListener("tick", handleTick);
        createjs.Ticker.setFPS(60);
        //start();
	
		canvas = document.getElementById('game');
		//canvas.addEventListener('click', clickHandler);

		// clear hack
		clearRec = new createjs.Shape();
        clearRec.graphics.beginStroke('#000');
        clearRec.graphics.beginFill('#FFFFFF');
        clearRec.graphics.drawRect(0, 0, 700, 100);
        clearRec.x = clearRec.y = 0;
        clearRec.addEventListener("click", function(event) { });
        stage.addChild(clearRec);


		// red first (positive)
		turn = 1;

		width = canvas.width;
		height = canvas.height;

        drawBoard();
    }
    function handleTick(e) {
        stage.update();
    }

    function drawBoard()
    {
    	var line = new createjs.Shape();
    	line.graphics.beginStroke('#000');
        line.graphics.beginFill('#FF0000');

        // vertical lines
        for (var i = 100; i <= 600; i += 100) {
    		line.graphics.moveTo(i, 100);
        	line.graphics.lineTo(i, 700);
        }
        // horizontal lines
        for (var i = 100; i <= 700; i += 100) {
    		line.graphics.moveTo(0, i);
        	line.graphics.lineTo(700, i);
        }

    	stage.addChild(line);

    	drawButtons();
    }

    var clearRec;

    function clearButtons()
    {
        stage.setChildIndex( clearRec, stage.getNumChildren()-1);
    }

    var allHasSpace = false;

    function drawButtons()
	{		
		var arrayLength = col1.length;
		var hasSpace = false;
		allHasSpace = false;

		var currCol = col1;
		var cellToPlace = 0;

		console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");

		clearButtons();

		for(var colNum = 1; colNum <= 7; colNum++)
		{
			hasSpace = false;
			switch(colNum)
			{
				case 1:
				currCol = col1;
				break;
				case 2:
				currCol = col2;
				break;
				case 3:
				currCol = col3;
				break;
				case 4:
				currCol = col4;
				break;
				case 5:
				currCol = col5;
				break;
				case 6:
				currCol = col6;
				break;
				case 7:
				currCol = col7;
				break;
				default:
				currCol = col1;
				break;
			}
			console.log("Column #" + colNum + ": " + currCol);
			 for (var i = arrayLength; i >= 0; i--) {
			//for (var i = 1; i <= arrayLength; i++) {
				
			    if(currCol[i] == 0)
			    {
			    	hasSpace = true;
			    	cellToPlace = i + 1;
			    	break;
			    }
			}
			if(hasSpace)
			{
				allHasSpace = true;
				drawButtonOnCol(colNum, cellToPlace);
			}
		}
	}

	function checkForWin(player)
	{
		var num = Math.floor(Math.random() * (10)) + 1;
		if(num > 5)
			return true;
		else
			return false;
	}

	function drawButtonOnCol(col, cellToPlace)
	{
		var w7 = width / 7;
		var h6 = height / 6;

		var ix = Math.floor(((col*100) - 100)/w7);
		var iy = Math.floor(50/h6);

		var x0 = ix * w7;
		var x1 = x0 + w7;

		var y0 = iy * h6;
		var y1 = y0 + h6;

		var color = turn > 0 ? '#c60909' : '#0939c6';

		 ///CIRCLE
        var circle = new createjs.Shape();
        circle.graphics.beginStroke('#000');
        circle.graphics.beginFill(color);
        circle.graphics.drawCircle(0, 0, 50);
        circle.x = (x0 + x1)/2;
        circle.y = 50;
        circle.col = col;
        circle.cellToPlace = cellToPlace * 100;
        circle.addEventListener("click", function(event) { 

        	createjs.Tween.get(circle).to({y: circle.y + circle.cellToPlace}, 300).call(afterClick,[col, cellToPlace],this);
			
			markPos(col, cellToPlace)      
			turn *= -1;  	
			drawButtons();

         });
        stage.addChild(circle);
	}

	function afterClick(col, cellToPlace)
	{
			if(checkForWin())
			{
				alert("You Win!");
			}

			if(allHasSpace == false)
			{
				alert("Game is a Tie!");
			}
	}

	function markPos(col, cellToPlace)
	{
		var currCol = col1;

		switch(col)
			{
				case 1:
				currCol = col1;
				break;
				case 2:
				currCol = col2;
				break;
				case 3:
				currCol = col3;
				break;
				case 4:
				currCol = col4;
				break;
				case 5:
				currCol = col5;
				break;
				case 6:
				currCol = col6;
				break;
				case 7:
				currCol = col7;
				break;
				default:
				currCol = col1;
				break;
			}

		currCol[cellToPlace - 1] = 1;
	}
