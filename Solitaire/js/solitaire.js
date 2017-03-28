
var stage;
var currX, currY;

function init()
{
	stage = new createjs.Stage(document.getElementById('canvas'));
	

	deck = new Deck();

	//shuffledDeck = shuffleArray(deck);


	displayTable(deck);
	//displayCards(deck);
}

function displayTable(_deck)
{
	var startX = 300;
	var currX = startX;
	var currY = 10;	
	var ctr = 0;
	var cardsPerRow = 7;

	// get 28 cards from shuffled deck
	for(var x = 0; x < 28; x++)
	{
		var path = "images/" + (_deck[x].num + 1) + _deck[x].suit + ".jpg";
		console.log(path);
		bitmap = new createjs.Bitmap(path);
		bitmap.x = currX;
		bitmap.y = currY;
		//setTimeout(function() {stage.addChild(bitmap);}, 10);
		stage.addChild(bitmap);
		stage.update();
		console.log("ctr = " + ctr + "; cardsPerRow = " + cardsPerRow);

		currX += 111;
		ctr++;

		if((ctr+1) == cardsPerRow)
		{
			currX = startX + 111;
			currY += 40;
			ctr = 0;
			cardsPerRow--;
		}

	}
	//setTimeout(function() {stage.update();}, 500);
	//stage.update();
	
}

function displayCards(_deck)
{
	currX = 10;
	currY = 10;
	var bitmap;
	for(var x = 0; x < 52; x++)
	{
			
		console.log("X = " + x + ", currX = " + currX + ", currY = " + currY);
		var path = "images/" + (_deck[x].num + 1) + _deck[x].suit + ".jpg";
		//console.log(path);
		bitmap = new createjs.Bitmap(path);
		bitmap.x = currX;
		bitmap.y = currY;
		stage.addChild(bitmap);
		
		currX += 111;
		if(x > 0)
		{
			if(x%13 == 0)
			{
				currX = 10;
				currY += 155;
			}
		}

	}

	stage.update();
}

var Card = function(num, suit)
{
	this.num = num;
	this.suit = suit;
}

function Deck()
{
	var cards = [];
	for(var x = 0; x < 13; x++)
	{
		cards[x] = 		new Card(x, "h");
		cards[x + 13] = new Card(x, "d");
		cards[x + 26] = new Card(x, "c");
		cards[x + 39] = new Card(x, "s");
	}

	 return shuffleDeck(cards);
	//return cards;

}

function shuffleArray(array) {
    for (var i = array.length; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function shuffleDeck(deck)
{
    var o = deck;
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};