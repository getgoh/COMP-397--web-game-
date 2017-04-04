
var mygame2 = function(nr_rows, nr_cols)
{
	this.nr_rows = nr_rows;
	this.nr_cols = nr_cols;
}

mygame2.prototype.m1 = function()
{
	console.log("In mygame2.m1(): nr_rows=" + this.nr_rows + ", nr_cols=" + this.nr_cols);
}

mygame2.prototype.m2 = function()
{
	console.log("In mygame2.m2(): nr_rows=" + this.nr_rows + ", nr_cols=" + this.nr_cols);
}