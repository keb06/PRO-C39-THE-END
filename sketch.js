var PLAY = 1;
var END = 0;
var gameState = PLAY;


var julia,julia_run;

var ground, groundImage,invisibleGround;
var backgroundImage;

var obstaclesGroup
var obstacle1,obstacle2, obstacle3;

var score=0;
var gameOver;
var restart;



function preload(){

julia_run=loadAnimation("julia2.png","julia3.png","julia4.png");
julia_collided = loadAnimation("julia1.png");


groundImage = loadImage("ground.png");
backgroundImage = loadImage("day.jpg"); 


obstacle1 = loadImage("pipe.png");
obstacle2 = loadImage("obstacle2.png");
obstacle3 = loadImage("ninja.png");



gameOverImg = loadImage("gameOverText.png");
restartImg = loadImage("restart.png");

}






function setup() {
  
createCanvas(1000,500);

julia = createSprite(400,289,20,50);
julia.addAnimation("running", julia_run);
julia.addAnimation("collided", julia_collided);
julia.scale = 0.55;



ground = createSprite(100,300,1000,20);
ground.addImage("ground",groundImage);
ground.x = ground.width /2;
ground.velocityX = -(6 + 3*score/100);
ground.scale=0.8;



gameOver = createSprite(300,50);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.5;
gameOver.visible = false;

restart = createSprite(300,140);
restart.addImage(restartImg);
restart.scale = 0.5;
restart.visible = false;



textSize(18);
textFont("Georgia");
textStyle(BOLD);
fill("black");
score = 0;



obstaclesGroup = new Group();


}




function draw() {


 background(backgroundImage);


   
 camera.x = julia.x;
 camera.y = julia.y;
  gameOver.position.x = restart.position.x = camera.x



 textAlign(RIGHT, TOP);
 text("Score: "+ score, 600,60);


  if (gameState===PLAY){
 score = score + Math.round(getFrameRate()/60);
  ground.velocityX = -(6 + 3*score/100);
  }


 if(keyDown("space") && julia.y >= 159) {
  julia.velocityY = -12;
}
 
  
 if (ground.x < 0){
  ground.x = ground.width/3;
  }


  julia.collide(ground);
  julia.velocityY = julia.velocityY + 0.8


  if(obstaclesGroup.isTouching(julia)){
   gameState = END;
}
  

  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    
    ground.velocityX = 0;
    julia.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    
    
    
    julia.changeAnimation("collided",julia_collided);
    
    
    obstaclesGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
     reset();
    }


  }
  


spawnObstacles();
  drawSprites();


}




function spawnObstacles() {

  if(frameCount % 60 === 0) {

    var obstacle = createSprite(500,289,10,40);
    obstacle.velocityX = -(6 + 3*score/100);
    
     var rand = Math.round(random(1,3));

    switch(rand) {

      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      default: break;

    }
    
      
    obstacle.scale=0.5;
    obstacle.lifetime = 300;
   
    obstaclesGroup.add(obstacle);

  }

}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  julia.changeAnimation("running",julia_run);
  
score = 0;
  
}