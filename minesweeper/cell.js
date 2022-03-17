function Cell(i,j,w){
    this.i = i;
    this.j = j;
    this.x = i * w;
    this.y = j * w;
    this.w = w;
    this.neighborCount = 0;

    if(random() <0.5){
        this.bomb = true;
    }else{
        this.bomb = false;
    }
    
    this.revealed = false;
}

Cell.prototype.show = function(){


    stroke(0);
    noFill();
    rect(this.x, this.y, this.w, this.w);
    if(this.revealed){
        if(this.bomb){
            ellipse(this.x+this.w*0.5,this.y+this.w*0.5,this.w * 0.5);
        }
        else{
            fill(200);
            rect(this.x, this.y, this.w, this.w);
            textAlign(CENTER);
            fill(0);
            text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w * 0.7);
        }
    }
}

Cell.prototype.contains = function(x,y){

    return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w)
}


Cell.prototype.reveal = function(){
    this.revealed = true;
}

Cell.prototype.countNeighbors = function(){
    if(this.bomb){
        this.neighborCount = -1;
    }
    var total = 0;
    for(var i = -1; i <= 1; i++){
        for(var j = -1; j <= 1; j++){
            if (this.i + i >= 0 && this.i + i < cols && this.j + j >= 0 && this.j + j < rows){
                var neighbor = grid[this.i + i][this.j + j];
                if (neighbor.bomb){
                    total++;
                }
            }
        }
    }
    this.neighborCount = total;
}