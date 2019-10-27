// draw the board
const ROW = 20;  // y = row
const COL = 10;  // x = col
const VACANT = "white";
const SQ = 20;
let gameOver = false
let dropStart = Date.now()
let piece; //the moving piece

const tetromonies = [
    [Z, "blue"],
    [I, "orange"],
    [J, "red"],
    [L, "green"],
    [S, "yellow"],
    [T, "grey"],
    [O, "purple"], // O is special
]

window.onload = () => {
    createBoard();
    pieceGenerator();
    drop()
    document.addEventListener("keydown",CONTROL);
}

let board = []
const createBoard = () => {
    for(let r = 0; r < ROW; r++){
        board[r] = [];
        for(let c = 0; c < COL; c++){
            board[r][c] = VACANT;
        }
    }
    drawBoard()
}

const drawBoard = () => {
    for( let r = 0; r <ROW; r++){
        for(let c = 0; c < COL; c++){
            drawSquare(board[r][c], c, r);
        }
    }
}

const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
const drawSquare = (color,x,y) => {
    ctx.fillStyle = color;
    ctx.fillRect(x*SQ, y*SQ, SQ, SQ)
    ctx.strokeStyle = "#A9A9A9";
    ctx.strokeRect(x*SQ, y*SQ,SQ,SQ);
}

// create prototype
function Piece(tetSet, color){
    this.tetSet = tetSet;
    this.color = color;
    this.number = 0
    this.activeTet = tetSet[this.number] //default 
    this.x = 3;
    this.y = -3;
}

Piece.prototype.draw = function(){
    for(let r = 0; r<this.activeTet.length; r++){
        for(let c = 0; c<this.activeTet.length; c++){
            if(this.activeTet[r][c]){
                drawSquare(this.color,c+this.x, r+this.y)
            }
        }
    }
}

Piece.prototype.undraw = function(){
    for(let r = 0; r<this.activeTet.length; r++){
        for(let c = 0; c<this.activeTet.length; c++){
            drawSquare(VACANT, c+this.x, r+this.y)
        }
    }
}


Piece.prototype.moveLeft = function(){
    if(!this.collision(-1,0,this.activeTet)){
        this.undraw();
        this.x--;
        this.draw()
    }
}

Piece.prototype.moveRight = function(){
    if(!this.collision(1,0,this.activeTet)){
        this.undraw();
        this.x++;
        this.draw()
    }
}

Piece.prototype.moveDown = function(){
    if(!this.collision(0,1,this.activeTet)){
        this.undraw();
        this.y++;
        this.draw();
    }else{
        this.lock();
        pieceGenerator()
    }
}

Piece.prototype.rotate = function(){
    const nextTet = this.tetSet[(this.number+1)%this.tetSet.length];
    let kick = 0;
    if(this.collision(0,0,nextTet)){
        if(this.x > COL/2){
            if(this.collision(-1, 0, nextTet)){
                kick = -2;
            }else{
                kick = -1;
            }
        }else{
            if(this.collision(1, 0, nextTet)){
                kick = 2;
            }else{
                kick = 1;
            }
        }
    }
    if(!this.collision(kick, 0, nextTet)){
        this.undraw()
        this.x += kick;
        this.number = (this.number+1)%this.tetSet.length;
        this.activeTet = this.tetSet[this.number];
        this.draw()
    }
}


Piece.prototype.lock = function(){
    for(let r = 0; r<this.activeTet.length; r++){
        for(let c = 0; c<this.activeTet.length; c++){
            if(!this.activeTet[r][c]){continue};

            if(this.y+r <0){
                alert("Game Over");
                gameOver = true;
                break;
            }
            board[this.y+r][this.x+c] = this.color;
        }
    }   
    for(let r = 0; r < ROW; r++){
        let isRowFull = true;
        for(let c = 0; c < COL; c++){
            isRowFull = isRowFull && (board[r][c] != VACANT);
        }
        if(isRowFull){
            for(let y = r; y > 1; y--){
                for(let c = 0; c < COL; c++){
                    board[y][c] = board[y-1][c];
                }
            }
            for(let c = 0; c < COL; c++){
                board[0][c] = VACANT;
            }
        }
    }
    drawBoard()
}

Piece.prototype.collision = function(x,y,tet){
    for(let r = 0; r<tet.length; r++){
        for(let c = 0; c<tet.length; c++){
            // white, no need to check
            if(!tet[r][c]){continue}

            const newX = c + this.x + x;
            const newY = r + this.y + y;
            
            if(newX<0||newX>=COL||newY>=ROW){
                return true;
            };

            // skip newY < 0; board[-1] will crush our game
            if(newY < 0){
                continue;
            }

            if(board[newY][newX] !== VACANT){
                return true;
            };

        }
    }
    return false
}


const pieceGenerator = () =>{
    const num = Math.floor(Math.random()*Math.floor(7))
    piece = new Piece(tetromonies[num][0],tetromonies[num][1])
}

const drop = () => {
    const now = Date.now();
    let delta = now - dropStart;
    if(delta>1000){
        piece.moveDown()
        dropStart = Date.now()
    }
    requestAnimationFrame(drop)
}

// event detector
const CONTROL = (e) =>{
    e.preventDefault();
    switch(e.keyCode){
        // arrow up
        case 38:
            piece.rotate()
            break;

        // arrow down
        case 40:
            piece.moveDown()
            break

        //arrow left
        case 37:
            piece.moveLeft()
            break

        // arrow right
        case 39:
            piece.moveRight()
            break
        
        default:
            break
    }
}