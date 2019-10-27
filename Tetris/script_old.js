const sqSize = 20;
const vacant = "white";
const col= 10; //sqaure
const row = 20; //square
let board = []
let piece //the current piece
let dropStart = Date.now()
const c = document.getElementById("myCanvas")
const ctx = c.getContext("2d")
let gameOver = false

const tetromonies = [
    [Z, "blue"],
    [I, "orange"],
    [J, "red"],
    [L, "green"],
    [S, "yellow"],
    [T, "grey"],
    [O, "purple"], // O is special
]

//extend: draw the upper part showing the next tetromony

// size of the game board: 10 x 20
const drawSquare = (color, x, y) => {
    ctx.fillStyle = color
    ctx.fillRect(x*sqSize, y*sqSize,sqSize,sqSize)
    ctx.strokeStyle = "	#A9A9A9";
    ctx.strokeRect(x*sqSize, y*sqSize,sqSize,sqSize);
}

const createBoard = () => {
    for(let r = 0; r<row; r++){
        board[r] = [];
        for(let c = 0; c<col; c++){
            board[r][c] = vacant;
           drawSquare(vacant, c, r)
        }
    }
}

//create Piece and Prototype
// function prototype
function Piece(type, color){
    this.color = color;
    this.type = type
    this.number = 0
    this.activeType = this.type[this.number]

    this.x = 3;
    this.y = -3;
}

Piece.prototype.draw = function (inputColor){
    const color = inputColor? inputColor: this.color
    for (let r = 0; r<this.activeType.length; r++){
        for(let c = 0; c<this.activeType.length; c++){
            if(this.activeType[r][c]){
                drawSquare(color, c+this.x, r+this.y)
            }
        }
    }
}


Piece.prototype.rotate = function(){
    const nextTet = this.type[(this.number+1)%this.type.length]
    let kick = 0;
    if(this.collision(0,0,nextTet)){
        if(this.x > col/2){
            if(this.collision(1, 0, nextTet)){
                kick = -2;
                
            } else{
                kick = -1;
            }
        }else{
            if(this.collision(1, 0, nextTet)){
                console.log("this.collision")
                kick = 2;
            }else{
                kick = 1;
            }
        }
    }
    
    if(!this.collision(kick, 0, nextTet)){
        this.undraw()
        this.x += kick;
        this.number = (this.number+1)%this.type.length;
        this.activeType = this.type[this.number];
        this.draw()
    }
}

Piece.prototype.collision = function(x,y,piece){
    for( r = 0; r < piece.length; r++){
        for(c = 0; c < piece.length; c++){
            // if the square is empty, we skip it
            if(!piece[r][c]){
                continue;
            }
            // coordinates of the piece after movement
            let newX = this.x + c + x;
            let newY = this.y + r + y;
            
            // conditions
            if(newX < 0 || newX >= row || newY >= col){
                return true;
            }
            // skip newY < 0; board[-1] will crush our game
            if(newY < 0){
                continue;
            }
            // check if there is a locked piece alrady in place
            if( board[newY][newX] != VACANT){
                return true;
            }
        }
    }
    return false;
}


Piece.prototype.lock = function(){
    // if white and === 1, then lock
    for(let r = 0; r < this.activeType.length; r++){
        for(let c = 0; c < this.activeType.length; c++){
            if(!this.activeType[r][c]){
                continue;
            }
            if(this.y + col < 0){
                alert("Game Over");
                // stop request animation frame
                gameOver = true;
                break;
            }

            board[this.y+r][this.x+c] = this.color
        }
    }
}

const rollFull = function(){
    for(let r = 0; r<row; r++){
        let rollFull = true;
        for(let c = 0; c<col; c++){
            console.log(r,c)
            rollFull = rollFull && (board[r][c] !== vacant)
        }
        
        if(rollFull){
            for(let y = r; y > 1; y--){
                console.log(r)
                for(let c=0; c<col; c++){
                    board[y][c] = board[y-1][c]
                }
            }
            
            for( c = 0; c < COL; c++){
                board[0][c] = VACANT;
            }
        }
    }
    
    createBoard()
}

Piece.prototype.undraw = function(){
    this.draw("white")
}

Piece.prototype.move = function(Xincrement, Yincrement){
    piece.undraw()
    this.x += Xincrement;
    this.y += Yincrement;
    this.draw();
}

Piece.prototype.moveLeft = function(){
    if(!this.collision(-1,0,piece.activeType)){
        this.move(-1,0)
    }
}
Piece.prototype.moveRight = function(){
    if(!this.collision(1,0,this.activeType)){
        this.move(1,0)
    }
}
Piece.prototype.moveDown = function(){
    if(!this.collision(0,1,this.activeType)){
        this.move(0,1)

    }else{
        this.lock()
        piece = puzzleGenerator();
    }
}

const control = (event) => {
    event.preventDefault();
    switch(event.keyCode){
        // arrow up
        case 38:
            piece.rotate();
            break

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
document.addEventListener("keydown", control)


const puzzleGenerator = () => {
    const randTetSet = Math.floor(Math.random()*Math.floor(7))
    const piece = new Piece(tetromonies[randTetSet][0], tetromonies[randTetSet][1])
    return piece
}

const drop = () => {
    let now = Date.now()
    let delta = now - dropStart
    if(delta>1000){
        piece.moveDown()
        dropStart = Date.now()
    }
    if(!gameOver){
        requestAnimationFrame(drop)
    }
}

window.onload = function(){
    createBoard()
    piece = puzzleGenerator();
    drop()
    console.log(board)
}

