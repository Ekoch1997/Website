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
var aliveStart = 500;

function setup (){
    var style = canvas.style;
    style.marginLeft = "auto";
    style.marginRight = "auto";
    style.marginTop = "2%";
    var parentStyle = canvas.parentElement.style;
    parentStyle.width = "100%";
    createCanvas (600, 600);
    cols = floor(width / w);
    rows = floor(height / w);
    grid = make2DArray(cols,rows);
    for(var i = 0; i< cols; i++){
        for(var j = 0; j<rows;j++){
            grid[i][j] = new Cell(i, j, w);
        }
    }

    //Pick alive spots
    var options = [];
    for(var i = 0; i< cols; i++){
        for(var j = 0; j<rows;j++){
            options.push([i,j])
        }
    }
    for (var n = 0; n < aliveStart; n++){
        var index = floor(random(options.length))
        var choice = options[index];

        var i = choice[0];
        var j = choice[1];

        //Delete the spot so it's no longer an option
        options.splice(index,1);
        grid[i][j].nextState = true;
    }
  }

function mousePressed(){
    for(var i = 0; i< cols; i++){
        for(var j = 0; j<rows;j++){
            if (grid[i][j].contains(mouseX,mouseY)){
                grid[i][j].nextState = true;
            }

            
        }
    }
}
  
function draw(){
    frameRate(1);
    background(255);
    for(var i = 0; i< cols; i++){
        for(var j = 0; j<rows;j++){
            grid[i][j].showCurrentState()
        }
    }
    for(var i = 0; i< cols; i++){
        for(var j = 0; j<rows;j++){
            grid[i][j].setNextState()
        }
    }
}