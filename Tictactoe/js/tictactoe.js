var canvas;
var context;
var width;
var height;

var board = [
				[0, 0, 0],
				[0, 0, 0],
				[0, 0, 0]
			];

function initializeBoard()
{

}

function init(id)
{
	// get the canvas element
	canvas = document.getElementById(id);
	// get the 2d context out of canvas element
	context = canvas.getContext('2d');
	//get width, height of canvas element
	width = canvas.width;
	height = canvas.height;

	canvas.addEventListener('click', clickHandler);

	//alert('width:' + width + '\n' + 'height:' + height);

	drawBoard();
}

var turn = 0; // 0 = x, 1 = y

function clickHandler(event) {
    var rect = canvas.getBoundingClientRect();

     // canvas.offsetLeft;
     // canvas.offsetTop;

    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    console.log('cx = ' + event.clientX);
    console.log('cy = ' + event.clientY);
    
    if(turn == 0)
    {
    	drawX(x, y);
    	markPos(x, y);
    	turn = 1;
    }
    else
    {
    	drawO(x, y);
    	markPos(x, y);
    	turn = 0;
    }

	checkWinner();

}

function markPos(x, y) {
	var w3 = width / 3;
	var h3 = height / 3;

	var ix = Math.floor(x/w3);
	var iy = Math.floor(y/h3);

	if(turn == 0)
	{
		board[iy][ix] = -1;
	}
	else
	{
		board[iy][ix] = 1;	
	}



	console.log(ix + ", " + iy);
	console.log(board);
}

function checkWinner()
{
	// console.log("board[0][0] = " + board[0][0]);
	// console.log("board[0][1] = " + board[0][1]);
	// console.log("board[0][2] = " + board[0][2]);

	for(var xx = 0; xx <= 2; xx++)
	{
		var sum = 0;
		for(var yy = 0; yy <= 2; yy++)
		{
			console.log("board[" + xx + "][" + yy + "] : " + board[xx][yy]);
			sum += board[xx][yy];
			if(sum == 3)
			{
				console.log("O wins!!");
			}
			else if(sum == -3)
			{
				console.log("X wins!!");	
			}
		}
		console.log("sum = " + sum);
	}
	
	console.log(board);
}

function drawBoard() 
{
	console.log(board);

	context.beginPath();
	context.strokeStyle = 'black';
	context.lineWidth = 4;

	var w3 = width / 3;
	var h3 = height / 3;

	for(var i=1; i <= 2; i++)
	{
		context.moveTo(0, w3*i);
		context.lineTo(width, w3*i);

		context.moveTo(h3 * i, 0);
		context.lineTo(h3 * i, height);
	}

	// var vl1 = Math.round(width / 3);
	// var vl2 = Math.round(vl1 * 2);
	// var hl1 = Math.round(height / 3);
	// var hl2 = Math.round(hl1 * 2);

	// context.moveTo(vl1, 0);
	// context.lineTo(vl1, height);

	// context.moveTo(vl2, 0);
	// context.lineTo(vl2, height);

	// context.moveTo(0, hl1);
	// context.lineTo(width, hl1);

	// context.moveTo(0, hl2);
	// context.lineTo(width, hl2);

	context.stroke();
	context.closePath();
}

function drawO(x, y)
{
	context.beginPath();
	context.strokeStyle = '#ff0000';
	context.lineWidth = 4;	

	var w3 = width / 3;
	var h3 = height / 3;

	var ix = Math.floor(x/w3);
	var iy = Math.floor(y/h3);

	var x0 = ix * w3;
	var x1 = x0 + w3;

	var y0 = iy * h3;
	var y1 = y0 + h3;


	context.arc((x0 + x1)/2, (y0+y1)/2, 40, 0, Math.PI * 2, false);

	context.stroke();
	context.closePath();
}

function drawX(x, y)
{
	context.beginPath();
	context.strokeStyle = '#ff0000';
	context.lineWidth = 4;

	var w3 = width / 3;
	var h3 = height / 3;

	var ix = Math.floor(x / w3);
	var iy = Math.floor(y / h3);

	var x0 = ix * w3;
	var x1 = x0 + w3;

	var y0 = iy * h3;
	var y1 = y0 + h3;

	context.moveTo(x0, y0);
	context.lineTo(x1, y1);

	context.moveTo(x0, y1);
	context.lineTo(x1, y0);	

	context.stroke();
	context.closePath();
}


/*
draw function template

function drawX(x, y)
{
	context.beginPath();
	context.strokeStyle = '#ff0000';
	context.lineWidth = 4;


	context.stroke();
	context.closePath();
}


*/