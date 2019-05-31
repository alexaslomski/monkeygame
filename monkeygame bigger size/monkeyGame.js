var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// load images
// Level 1

var monkey = new Image();
var bg = new Image();
var fg = new Image();
var obstacleNorth = new Image();
var obstacleSouth = new Image();

monkey.src = "images1/monkey.png";
bg.src = "images1/bg.png";
fg.src = "images1/fg.png";
obstacleNorth.src = "images1/obstacleNorth.png";
obstacleSouth.src = "images1/obstacleSouth.png";


// variables

var gap = 225;
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

// obstacles coordinates

var obstacle = [];

obstacle[0] = {
    x : cvs.width,
    y : 0
};

// draw images

function draw(){
    
    ctx.drawImage(bg,0,0);
    
    
    for(var i = 0; i < obstacle.length; i++) {
        
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

/*monkey.src = "images1/monkey.png";
bg.src = "images1/bgl2.png";
fg.src = "images1/fgl2.png";
obstacleNorth.src = "images1/obstacleNorthl2.png";
obstacleSouth.src = "images1/obstacleSouthl2.png";
  
//function draw()*/

// LEVEL 2 
// just load different background

  if ( score == 2 ) {
    //alert("next level") 
    //window.location.assign("")
    bg.src = "images2/bg.png";
    fg.src = "images2/fg.png";
    obstacleNorth.src = "images2/obstacleNorth.png";
    obstacleSouth.src = "images2/obstacleSouth.png"; 
    //window.location.assign("Level2.js")
    //function goBack() {
    //window.history.back()
    
    }

    // LEVEL 3
    // just load different background 

    if ( score == 5 ) {
        //alert("next level") 
        //window.location.assign("")
        bg.src = "images3/bg.png";
        fg.src = "images3/fg.png";
        obstacleNorth.src = "images3/obstacleNorth.png";
        obstacleSouth.src = "images3/obstacleSouth.png"; 
        //window.location.assign("Level2.js")
        //function goBack() {
        //window.history.back()
          
        }
    
    if ( score == 10 ) {
        alert("CONGRATULATIONS! YOUR SCORE IS: 10. YOU WON!")
        location.reload();
    }

    ctx.drawImage(fg,0,cvs.height - fg.height);
    
    ctx.drawImage(monkey,bX,bY);
    
    bY += gravity;
    
    ctx.fillStyle ="#FFFF00";
    ctx.font = "20px Helvetica";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    ctx.fillText("Level : "+level,10,cvs.height-50);
    
    requestAnimationFrame(draw); 
}

draw();























