var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// load images

var monkey = new Image();
var bg = new Image();
var fg = new Image();
var obstacleNorth = new Image();
var obstacleSouth = new Image();

monkey.src = "images/bird.png";
bg.src = "images/bgl2.png";
fg.src = "images/fgl2.png";
obstacleNorth.src = "images/pipeNorthl2.png";
obstacleSouth.src = "images/pipeSouthl2.png";


// some variables

var gap = 185;
var constant;

var bX = 10;
var bY = 150;

var gravity = 1.5;

var score = 0;
var level = 0;

// audio files

var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

// on key down

document.addEventListener("keydown",moveUp);

function moveUp(){
    bY -= 25;
    fly.play();
}

// pipe coordinates

var obstacle = [];

obstacle[0] = {
    x : cvs.width,
    y : 0
};

// draw images

function draw(){
    
    ctx.drawImage(bg,0,0);
    
    
    for(var i = 0; i < obstacle.length; i++){
        
        constant = obstacleNorth.height+gap;
        ctx.drawImage(obstacleNorth,obstacle[i].x,obstacle[i].y);
        ctx.drawImage(obstacleSouth,obstacle[i].x,obstacle[i].y+constant);
             
        obstacle[i].x--;
        
        if( obstacle[i].x == 125 ){
            obstacle.push({
                x : cvs.width,
                y : Math.floor(Math.random()*obstacleNorth.height)-obstacleNorth.height
            }); 
        }

        // detect collision
        
        if( bX + monkey.width >= obstacle[i].x && bX <= obstacle[i].x + obstacleNorth.width && (bY <= obstacle[i].y + obstacleNorth.height || bY+monkey.height >= obstacle[i].y+constant) || bY + monkey.height >=  cvs.height - fg.height){
            location.reload(); // reload the page
        }
        
        if(obstacle[i].x == 5){
            score++;
            scor.play();
        } 
    }

    /*if(score==2) {
    alert("Good job");
    location.continue(); // reload the page
    
    if(score==5){
        alert("Don't give up!");
        location.continue(); // reload the page
    }

/*monkey.src = "images1/bird.png";
bg.src = "images1/bgl2.png";
fg.src = "images1/fgl2.png";
obstacleNorth.src = "images1/pipeNorthl2.png";
obstacleSouth.src = "images1/pipeSouthl2.png";
  
//function draw()*/

  

  if(score==2) {
    monkey.src = "images1/bird.png";
    bg.src = "images1/bgl2.png";
    fg.src = "images1/fgl2.png";
    obstacleNorth.src = "images1/pipeNorthl2.png";
    obstacleSouth.src = "images1/pipeSouthl2.png"; 
    window.location.assign("Level2.js")
    }
    
    ctx.drawImage(fg,0,cvs.height - fg.height);
    
    ctx.drawImage(monkey,bX,bY);
    
    bY += gravity;
    
    ctx.fillStyle = "#C21807";
    ctx.font = "20px Helvetica";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    ctx.fillText("Level : "+level,10,cvs.height-50);
    
    requestAnimationFrame(draw);
}

draw();
