var player,playerImg,bg1,bg2,z1,z2,z3,z4,z5
var z1Img,z2Img,z3Img,z4Img,z5Img,gunShot
var enemyGroup,bullet,bulletImg,bulletGroup,play
var gameState = 0;
function preload()
{
  playerImg = loadImage("player.png");
  bg1 = loadImage("intro bg.png");
  bg2 = loadImage("bgImg.jpg");
  z1Img = loadImage("zombie 1.png");
  z2Img = loadImage("zombie 2.png");
  z3Img = loadImage("zombie 3.png");
  z4Img = loadImage("zombie 4.png");
  z5Img = loadImage("zombie 5.png");
  gunShot = loadSound("gun Shot.mp3");
  bulletImg = loadImage("bullet.png");
}
function setup()
 {
  createCanvas(800,800);
   player = createSprite(400,600, 50, 50);
   player.addImage(playerImg);
   player.scale = 0.5; 
   player.visible = false;
   
   bullet = createSprite(player.x,600,20,20);
   play = createButton("PLAY");
   bullet.visible = false;
  
   enemyGroup = new Group()
   bulletGroup = new Group();

   intro();
}

function draw()
 {
  
 
    if(gameState == "play")
  {
    background(bg2);  
    player.visible = true;
    player.x = mouseX;
    zombies();
      if(keyDown(UP_ARROW))
    {  
      bullets();
      bullet.addImage(bulletImg);
      bullet.scale = 0.09
      bullet.debug = false;
     
      bullet.shapeColor = "red";
      bullet.velocityY = -3;
      console.log("bg");
    }
     
    for(var i = 0;i < enemyGroup.length; i = i+1)
    {
        if(bullet.isTouching(enemyGroup[i]))
      {
        enemyGroup[i].destroy();
        gunShot.play();
        
      }
    }
    
     if(enemyGroup.isTouching(player))
    {
      gameState = "end";
    }  
  }
 
   if(gameState == "end")
   {
    enemyGroup.destroyEach();
    player.destroy();
    bulletGroup.destroyEach();
    textSize(50);
    fill("red");
    text("GAME OVER",300,400);
   }
 
 
  drawSprites();
}
function zombies()

{  
  zombie=createSprite(400,0,30,30);
  zombie.visible = false;
  if(frameCount % 50 == 0)
    {
    zombie.visible = true;
    zombie.velocityY=4;
    zombie.scale=0.4;
    zombie.debug = true;
    zombie.setCollider("rectangle",0,0,200,150);
    zombie.lifetime = 170;
    zombie.x = Math.round (random(0,800));
    
   var rand = Math.round(random(1,5))
   switch(rand)
{
    case 1:zombie.addImage(z1Img);
      break;
    case 2:zombie.addImage(z2Img);
     break;
     case 3:zombie.addImage(z3Img);
     break;
     case 4:zombie.addImage(z4Img);
     break;
     case 5:zombie.addImage(z5Img);
     break;     
     default:break;          
}
    }
   enemyGroup.add(zombie)  
   
  } 

  function bullets()
  {
    bullet = createSprite(player.x,600,20,20);
    bullet.setCollider("rectangle",0,0,300,100);
    bulletGroup.add(bullet);    
  }

  function intro()
  {
    console.log(gameState);
    background(bg1);
    textSize(20);
    fill("orange");
    text("You are stuck in a ZOMBIE APOCALYPSE!!",10,270);
    text("You can ESCAPE the zombies with the help of a gun with INFINITE number of BULLETS",10,330);
    textSize(50);
    fill("red");
    text("SAVE YOURSELF !! ",10,400);    
    play = createButton("yes");
    play.position(700,600,40,40);
    play.mousePressed(function()
    {
      gameState = "play";
      play.hide();
    });
    
  }