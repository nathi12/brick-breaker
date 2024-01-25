const grid = document.querySelector('.grid');
const scoreDisplay= document.querySelector('#score');
const blockWidth =100;
const blockHeight=20;
const boardWith =560;
const boardHeight = 300;
const ballDiameter=20;


let TimeId ;
let xDirections =-2;
let yDirections =2 ;
let score =0;

const userStart = [230,10];
let BlockCurrentPosition = userStart;

const ballStart =[270,40];
let   ballCurrentPosition =ballStart ;


//create block
class Block {
    constructor(xAxis,yAxis){
        this.bottomLeft=[xAxis,yAxis];
        this.topLeft=[xAxis,blockHeight+yAxis]
        this.bottomRight=[xAxis+blockWidth,yAxis];
        this.topRight=[xAxis+blockWidth,yAxis+blockHeight];
    }
}

const blocks= [
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),//---------
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),//---------
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210)
]

function addBlock(){
    for(let i =0;i<blocks.length;i++){
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left=blocks[i].bottomLeft[0]+'px';
        block.style.bottom=blocks[i].bottomLeft[1]+'px';
        grid.appendChild(block);
    }
}
addBlock();


/**
 * creating a user
 */
const user = document.createElement('div');
user.classList.add('user');
drawUser();
grid.appendChild(user);  

function drawUser(){
    user.style.left= `${BlockCurrentPosition[0]}px`;
    user.style.bottom=`${BlockCurrentPosition[1]}px`;
}

function drawBall(){
    ball.style.left=ballCurrentPosition[0]+'px';
    ball.style.bottom=ballCurrentPosition[1]+'px';
}

/**
 * Move user function
 */
function moveUser(e){
    switch(e.key){
        case 'ArrowLeft':
            if(BlockCurrentPosition[0]>0){
                BlockCurrentPosition[0]-=20;
                drawUser();
            }
            break;
        case 'ArrowRight':
            if(BlockCurrentPosition[0]<boardWith-blockWidth){
                BlockCurrentPosition[0]+=20;
                drawUser();  
            }         
        break;        
    }
}
document.addEventListener('keydown',moveUser);

/**
 * create ball
 */
const ball = document.createElement('div');
ball.classList.add('ball');
drawBall();
grid.appendChild(ball);


function moveBall(){
    ballCurrentPosition[0]+=xDirections;
    ballCurrentPosition[1]+=yDirections;
    drawBall();
    checkForCollutions();
}
TimeId = setInterval(moveBall,20); 


//check for collutions  
function checkForCollutions(){

  


    //check  for block collution
   for(let i=0;i<blocks.length;i++){
      if(ballCurrentPosition[0]> blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
        (ballCurrentPosition[1]+ballDiameter)> blocks[i].bottomLeft[1] && ballCurrentPosition[1]< blocks[i].topLeft[1]) {
            const allBlock= Array.from(document.querySelectorAll('.block'));
            allBlock[i].classList.remove('block');
            blocks.splice(i,1);
            changeDirection();
            //score
            score++ ;
            scoreDisplay.innerHTML=score;
      }
   }

   //boards collutions
    if(ballCurrentPosition[0]> (boardWith-ballDiameter) ||
       ballCurrentPosition[1]> (boardHeight-ballDiameter) || 
       ballCurrentPosition[0]<=0){
        changeDirection();
    }

    //check for game over
    if(ballCurrentPosition[1]<=0){
        clearInterval(TimeId);
        scoreDisplay.textContent='game over !!';
        document.removeEventListener('keydown',moveUser);
    }
    //check for user collutions
    if(ballCurrentPosition[0] > BlockCurrentPosition[0] && ballCurrentPosition[0] < BlockCurrentPosition[0]+ blockWidth && 
       ballCurrentPosition[1] > BlockCurrentPosition[1] && ballCurrentPosition[1] < BlockCurrentPosition[1]+ blockHeight){
        changeDirection();
    }




}

function changeDirection(){
    if(xDirections===2 && yDirections===2){
        yDirections = -2;
        console.log("first if :(x,y)",xDirections,",",yDirections)
        return ;    
    }

    if(xDirections===2 && yDirections===-2){
        xDirections = -2;
        console.log("2nd if :(x,y)",xDirections,",",yDirections)
        return ;
    }

    if(xDirections===-2 && yDirections===2){
        xDirections = 2;
        console.log("3rd if :(x,y)",xDirections,",",yDirections)
        return ;
    }

    if(xDirections=== -2 && yDirections===-2){
        yDirections = 2;
        console.log("4th if :(x,y)",xDirections,",",yDirections)
        return ;
    }
}
