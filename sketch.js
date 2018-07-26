var rows, cols;
var w = 40; 
var grid = [];
var current;
var stack = [];
function setup(){
	createCanvas(windowWidth, windowHeight);
	rows = 600 / w;
	cols = 600 / w;
	frameRate(5);
	for(var j = 0; j < rows; j++){
		for(var i = 0; i < cols; i++){
			var cell = new Cells(i, j);
			grid.push(cell);
		}
	}

	current = grid[0];
}

function draw(){
	background(51);
	for(var i = 0; i < grid.length; i++){
		grid[i].show();
		
	}
	current.visited = true;
	var next = current.checkneighbor();
	current.highlight();

	if(next){
		next.visited = true;
		stack.push(current);
		removeWalls(current, next);
		current = next;
	}else if(stack.length > 0){
		current = stack.pop();
	}


}

function BoxNumber(i, j){
	if(i < 0 || j < 0 || i > cols-1 || j > rows-1){
		return -1;
	}else{
		return i + j * cols;
	}
}

function Cells(i, j){
	this.i = i;
	this.j = j;
	this.walls = [true, true, true, true];
	this.visited = false;

	this.highlight = function(){
		var x = i * w;
		var y = j * w;
		fill(0, 255, 0);
		rect(x+400, y+30, w, w);
	}

	this.show = function(){
		var x = i * w;
		var y = j * w;
		noFill();
		stroke(255);
		if(this.walls[0]){
			line(x+400    , y+30    , x + w+400, y+30    );
		}

		if(this.walls[1]){
			line(x + w+400, y+30    , x + w+400, y + w+30);
		}

		if(this.walls[2]){
			line(x + w+400, y + w+30, x+400    , y + w+30);
		}

		if(this.walls[3]){
			line(x+400    , y+30    , x+400    , y + w+30);
		}

		if(this.visited){
			noStroke();
			fill(255, 0, 255, 51);
			rect(x + 400, y + 30, w, w);
		}
	}

	this.checkneighbor = function(){
		var neighbor = [];
		var top = grid[BoxNumber(i, j-1)];

		var right = grid[BoxNumber(i+1, j)];

		var bottom = grid[BoxNumber(i, j+1)];

		var left = grid[BoxNumber(i-1, j)];

		if(top && !top.visited){
			neighbor.push(top);
		}
		if(right && !right.visited){
			neighbor.push(right);
		}
		if(bottom && !bottom.visited){
			neighbor.push(bottom);
		}
		if(left && !left.visited){
			neighbor.push(left);
		}
		if(neighbor.length > 0){
			var temp = floor(random(0, neighbor.length));
			return neighbor[temp];

		}else{
			return undefined;
		}

	}
}


function removeWalls(a , b){

	var x = a.i - b.i;
	
	if(x === 1){
		a.walls[3] = false;
		b.walls[1] = false;
	}else if (x === -1){
		a.walls[1] = false;
		b.walls[3] = false;
	}

	var y = a.j - b.j;
	if(y === 1){
		a.walls[0] = false;
		b.walls[2] = false;
	}else if (y === -1){
		a.walls[2] = false;
		b.walls[0] = false;
	}
}