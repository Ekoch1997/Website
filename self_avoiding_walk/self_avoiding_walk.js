
let grid;
let spacing = 5;
let cols,rows;
let path = [];
let spot;

function make2DArray(cols,rows){
    let arr = new Array(cols);
    for(var i =0; i < arr.length;i++){
        arr[i] = new Array(rows);
    }
    return arr;
}

function isValid(i,j){
    if(i <0 || i >= cols || j < 0 || j>= rows){
        return false;
    }
    return !grid[i][j].visited;
}
function setup(){

    
    createCanvas(800,800);
    cols = floor(width / spacing);
    rows = floor(height / spacing);
    background(51);
    grid = make2DArray(cols, rows);

    
    for(let i = 0; i<cols;i++){
        for(let j = 0; j< rows; j++){
            let r = Math.floor(Math.random() * 256);
            let g = Math.floor(Math.random() * 256);
            let b = Math.floor(Math.random() * 256);
            grid[i][j] = new Spot(i,j, r,b,g);
        }
    }
    spot = grid[cols / 2][rows / 2];
    path.push(spot);
    spot.visited = true;
    
}

function draw(){
    spot.visited = true;
    background(0);
    translate(spacing*0.5, spacing*0.5)
   
    for (let i = 0; i < 1; i++){
        spot = spot.nextSpot();
        if(!spot){
            let stuck = path.pop();
            stuck.clear();
            spot = path[path.length-1];
        }else{
            path.push(spot);
            spot.visited = true;
        }

        if (path.length === cols*rows){
            console.log("Solved!");
            noLoop();
            break;
        }
    }
    
    
    strokeWeight(spacing * 0.25);
    noFill();
    for(let i = 1; i < path.length;i++){
        stroke(path[i].r, path[i].g, path[i].b)
        line(path[i-1].x, path[i-1].y, path[i].x, path[i].y)
    }
    // beginShape();
    // for(let spot of path){
    //     vertex(spot.x, spot.y);
    // }

    // endShape();
    
    stroke(255);
    strokeWeight(spacing * 0.5);
    point(spot.x,spot.y);

    
    
}