var caveground, caveImg;
var cactusImg;
var ninja,ninjajumping, ninjadead;
var invisibleline, invisiblelineGroup;
var endingline;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score, rube, diamonds;
var hororSound;
var scoringline, scorelineGroup;
var enemy1Img, enemy2Img;
var gameover, gameoverImg, leftarrow, leftarrowImg, right_arrow, right_arrowImg, restart, restartImg;
var rubiImg, woodImg,diamondImg;
var gamesound;

function preload(){
  caveImg = loadImage("background_cave.png");
  cactusImg = loadImage("cactus_01.png");
  ninjajumping = loadAnimation("Jump__000.png",
                               "Jump__001.png",
                               "Jump__002.png",
                               "Jump__003.png",
                               "Jump__004.png",
                               "Jump__005.png",
                               "Jump__006.png",
                               "Jump__007.png",
                               "Jump__008.png",
                               "Jump__009.png");

  gameoverImg = loadImage("gameover.png"); 
  rubiImg = loadImage("rubi.png");
  woodImg = loadImage("wood.png");
  diamondImg = loadImage("diamond.png");
  leftarrowImg = loadImage("leftarrow.png");
  right_arrowImg = loadImage("rightarrow.png");
  enemy1Img = loadImage("enemy1.png");
  enemy2Img = loadImage("enemy2.png");
  restartImg = loadImage("reset.png");
  ninjadead = loadAnimation("Idle__008.png");
  gamesound = loadSound("game.mp3");




 
}

function setup(){
  createCanvas(600,600);
  
  caveground = createSprite(300,300);
  caveground.addImage(caveImg);
  caveground.scale = 1.5;
  ninja = createSprite(100,300,20,20);
  ninja.addAnimation("jumping",ninjajumping);
  ninja.addAnimation("dying",ninjadead);
  ninja.scale = 0.15;
  ninja.setCollider("rectangle",10,5,160,160);
  endingline = createSprite(300,590,600,10);
  //endingline.visible = false;

  leftarrow = createSprite(550,550,10,10);
  leftarrow.addImage(leftarrowImg);
  leftarrow.scale = 0.1;

  right_arrow = createSprite(500,550,10,10);
  right_arrow.addImage(right_arrowImg);
  right_arrow.scale = 0.1;

  gameover = createSprite(280,300,10,10);
  gameover.addImage(gameoverImg);
  gameover.scale = 0.5;

  score = 0;
  rube = 0;
  diamonds = 0;

  restart = createSprite(550,90,10,10);
  restart.addImage(restartImg);
  restart.scale = 0.1;
  

 
  invisiblelineGroup = createGroup();
  scorelineGroup = createGroup();
  cactusGroup = createGroup();
  rubiGroup = createGroup();
  woodGroup = createGroup();
  diamondGroup = createGroup();
  lineGroup = createGroup();
  enemyGroup = createGroup();
  
}

function draw(){
  if(gameState===PLAY){

   // gamesound.play();
   
   

    gameover.visible = false;
    restart.visible = false;
    leftarrow.visible = true;
    right_arrow.visible = true;
    
    caveground.velocityY = 6;
    spawnLine();
    spawnCactus();
    spawnWood();
    spawndiamond();
    spawnObstacles();

    score = score+Math.round(getFrameRate()/60);
    
    if(keyDown("space")){
    ninja.velocityY = -6;       
  }
  ninja.velocityY = ninja.velocityY+0.5;
  
  if(mousePressedOver(leftarrow)){
    ninja.x = ninja.x-5;
  }
  
  if(mousePressedOver(right_arrow)){
    ninja.x = ninja.x+5;
  }
  
  if(ninja.isTouching(lineGroup)){

    lineGroup.destroyEach();
    score = score+1;
    
  }

  if(ninja.isTouching(woodGroup)){

    ninja.velocityY = 0;

  }
    
    if(ninja.isTouching(scorelineGroup)){
    scorelineGroup.destroyEach();
    rubiGroup.setLifetimeEach(0);
    rube = rube+1;
    score = score+5;
    
    
  }

  if(ninja.isTouching(diamondGroup)){

    diamondGroup.destroyEach();
    diamonds = diamonds+1;
    score = score+50;

  }
    
   if(ninja.isTouching(invisiblelineGroup)|| ninja.isTouching(endingline)|| ninja.isTouching(enemyGroup) || ninja.isTouching(cactusGroup)){

       gameState = END;

  }
    
    
  }else if(gameState===END){
     
     caveground.velocityY = 0;
     ninja.velocityY = 0;

     ninja.x = 120;
     ninja.y = 300;

     ninja.changeAnimation("dying",ninjadead);
     invisiblelineGroup.setVelocityXEach(0);
     invisiblelineGroup.setVelocityYEach(0);
     invisiblelineGroup.setLifetimeEach(-1);
     scorelineGroup.setVelocityYEach(0);
     scorelineGroup.setVelocityXEach(0);
     scorelineGroup.setLifetimeEach(-1);
     cactusGroup.setVelocityXEach(0);
     cactusGroup.setVelocityYEach(0);
     cactusGroup.setLifetimeEach(-1);
     rubiGroup.setVelocityXEach(0);
     rubiGroup.setVelocityYEach(0);
     rubiGroup.setLifetimeEach(-1);
     lineGroup.setVelocityXEach(0);
     lineGroup.setVelocityYEach(0);
     lineGroup.setLifetimeEach(-1);
     diamondGroup.setLifetimeEach(-1);
     diamondGroup.setVelocityXEach(0);
     diamondGroup.setVelocityYEach(0);
     woodGroup.setVelocityXEach(0);
     woodGroup.setVelocityYEach(0);
     woodGroup.setLifetimeEach(-1);
     enemyGroup.setLifetimeEach(-1);
     enemyGroup.setVelocityXEach(0);
     enemyGroup.setVelocityYEach(0);

     gameover.visible = true;
     restart.visible = true;
     leftarrow.visible = false;
     right_arrow.visible = false;

     if(mousePressedOver(restart)){

      reset();

     }



    
  }
  
  
  if(caveground.y>600){
    caveground.y = 300;
  }
      

  
  drawSprites();
  fill("white");
  textSize(20);
  text("Score: "+score,500,50);

  if(gameState===END){

    fill("yellow");
    textSize(20);
    text("Rubi: "+rube,25,50);
    
    fill("lightgreen");
    textSize(20);
    text("Diamond: "+diamonds,25,30);

    }


}

function spawnLine(){
  if(frameCount % 200 === 0){

  var scoringline = createSprite(100,5,50,5);
  var rubi = createSprite(100,100,5,5);
  rubi.addImage(rubiImg);
  rubi.scale = 0.01;
 
  //scoringline.visible = false;
  //invisibleline.visible = false;

  scoringline.velocityY = (1+2*score/500);
  rubi.velocityY = (1+2*score/500);
  scoringline.x = Math.round(random(150,400));
 
 
  rubi.x = scoringline.x;
  rubi.y = scoringline.y;
  
  scoringline.lifetime = 700;
  rubi.lifetime = 700;

  scorelineGroup.add(scoringline);
  rubiGroup.add(rubi);
    
    
  }
}

  function spawnCactus(){

    if(frameCount % 500 === 0){

      var cactus = createSprite(100,5,50,5);
      cactus.addImage(cactusImg);
      cactus.scale = 0.1;
      cactus.velocityY = (1+2*score/100);
      cactus.x = Math.round(random(150,400));
      cactus.lifetime = 700;
      cactusGroup.add(cactus);


    }
  }


    function spawnWood(){

      if(frameCount % 100 === 0){

        var wood = createSprite(250,20,25,5);
        var invisibleline = createSprite(100,25,100,5);
        var line = createSprite(100,10,100,5);
        wood.addImage(woodImg);
        wood.scale = 0.1;
        wood.velocityY = (1+2*score/500);
        invisibleline.velocityY = (1+2*score/500);
        line.velocityY = (1+2*score/500);
        wood.x = Math.round(random(100,400));
        invisibleline.x =  wood.x ;
        line.x = wood.x;
        wood.lifetime = 700;
        invisibleline.lifetime = 700;
        line.lifetime = 700;
        woodGroup.add(wood);
        invisiblelineGroup.add(invisibleline);
        lineGroup.add(line);



      }
    
  
}

function spawndiamond(){

  if(frameCount % 2500 === 0){

    var diamond = createSprite(103,20,5,4);
    diamond.addImage(diamondImg);
    diamond.scale = 0.1;
    diamond.velocityY = (1+2*score/50);
    diamond.x = Math.round(random(20,600));
    diamond.lifetime = 700;
    diamondGroup.add(diamond);

  }
}

function spawnObstacles(){
  
  if(frameCount % 200 === 0){
    var enemy = createSprite(300,50,10,10);
    enemy.lifetime = 180;
    enemy.y = Math.round(random(250,370));
  
   var rand;
  
   rand = Math.round(random(1,2));
   
  switch(rand){
      case 1: enemy.addImage(enemy1Img);
              enemy.scale = 0.2;
              enemy.velocityX = -(6+2*score/500);
      break;
      case 2: enemy.addImage(enemy2Img);
              enemy.scale = 0.2;
              enemy.velocityX = (10+2*score/500);
      break;
  }
    enemyGroup.add(enemy);
    
  }
}

function reset(){

  gameState = PLAY;
  ninja.changeAnimation("jumping",ninjajumping);
  ninja.x = 100;
  ninja.y = 300;
  score = 0;
  rube = 0;
  diamonds = 0;
  cactusGroup.destroyEach();
  rubiGroup.destroyEach();
  woodGroup.destroyEach();
  enemyGroup.destroyEach();
  diamondGroup.destroyEach();
  invisiblelineGroup.destroyEach();
  scoringlineGroup.destroyEach();
  lineGroup.destroyEach();
  gameover.visible = false;
  restart.visible = false;
  leftarrow.visible = true;
  right_arrow.visible = true;
 
  
}
