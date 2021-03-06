
function make2DArray(cols,rows){
    var arr = new Array(cols);
    for (var i = 0; i < arr.length; i++){
        arr[i] = new Array(rows);
    }
    return arr;
}


var grid;
var cols;
var rows;
var w = 20;

var totalbombs = 10;

function setup (){
    var style = canvas.style;
    style.marginLeft = "auto";
    style.marginRight = "auto";
    style.marginTop = "2%";
    var parentStyle = canvas.parentElement.style;
    parentStyle.width = "100%";
    createCanvas (200, 200);
    cols = floor(width / w);
    rows = floor(height / w);
    grid = make2DArray(cols,rows);
    for(var i = 0; i< cols; i++){
        for(var j = 0; j<rows;j++){
            grid[i][j] = new Cell(i, j, w);
        }
    }

    //Pick totalbombs spots
    var options = [];
    for(var i = 0; i< cols; i++){
        for(var j = 0; j<rows;j++){
            options.push([i,j])
        }
    }
    for (var n = 0; n < totalbombs; n++){
        var index = floor(random(options.length))
        var choice = options[index];

        var i = choice[0];
        var j = choice[1];

        //Delete the spot so it's no longer an option
        options.splice(index,1);
        grid[i][j].bomb = true;
    }




    for(var i = 0; i< cols; i++){
        for(var j = 0; j<rows;j++){
            grid[i][j].countNeighbors();
        }
    }
  }

function gameOver(){
    for(var i = 0; i< cols; i++){
        for(var j = 0; j<rows;j++){
            grid[i][j].revealed = true;
        }
    }
}

function mousePressed(){
    for(var i = 0; i< cols; i++){
        for(var j = 0; j<rows;j++){
            if (grid[i][j].contains(mouseX,mouseY)){
                grid[i][j].reveal();
                if (grid[i][j].bomb){
                    var audio = new Audio('Bomb.mp3');
                    audio.play();
                    gameOver();
                }
            }

            
        }
    }
}
  
function draw(){
    background(255);
    for(var i = 0; i< cols; i++){
        for(var j = 0; j<rows;j++){
            grid[i][j].show()
        }
    }
}