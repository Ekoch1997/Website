function Cell(i,j,w){
    this.i = i;
    this.j = j;
    this.x = i * w;
    this.y = j * w;
    this.w = w;
    this.currentState = false;
    this.nextState = false;
}

Cell.prototype.showCurrentState = function(){

    this.currentState = this.nextState
    stroke(0);
    fill(0);
    rect(this.x, this.y, this.w, this.w);
    if(this.currentState){
        fill(255);
        rect(this.x, this.y, this.w, this.w);
    }
}

Cell.prototype.setNextState = function(){

    var neighbors = this.countNeighbors();

    if(this.currentState){ //if currently alive
        if(neighbors < 2 || neighbors > 3){
            this.nextState = false;
        }
        else{
            this.nextState = true;
        }
    }
    else{
        if (neighbors == 3){
            this.nextState = true;
        }
        else{
            this.nextState = false;
        }
    }
}

Cell.prototype.contains = function(x,y){

    return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w)
}

Cell.prototype.countNeighbors = function(){

    var total = 0;
    for(var i = -1; i <= 1; i++){
        for(var j = -1; j <= 1; j++){
            if (this.i + i >= 0 && this.i + i < cols && this.j + j >= 0 && this.j + j < rows){
                if(i != 0 || j != 0){
                    var neighbor = grid[this.i + i][this.j + j];
                    if (neighbor.currentState){
                        total++;
                    }
                }
            }
        }
    }
    return total;
}
