var bg,bgImg;
var player, shooterImg, shooter_shooting;
var bullets = 70
var gameState = "fight"
var score = 0;
var life = 3;



function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")
  bloodImg = loadImage("assets/blood-splatter-png-44476.png")
  zombieImg = loadImage("assets/zombie-48812.png")
  zombie2Img = loadImage("assets/zombie.png")
  zombie3Img = loadImage("assets/zombie-48831.png")
  bulletImg = loadImage("assets/bullett.png")


  bgImg = loadImage("assets/bg.jpeg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
  
   player.setCollider("rectangle",0,0,300,300)

   

   heart1 = createSprite(displayWidth - 250,40,20,20)
   heart1.visible = false
   heart1.addImage("heart1",heart1Img)
   heart1.scale = 0.4

   heart2 = createSprite(displayWidth - 200,40,20,20)
   heart2.visible = false
   heart2.addImage("heart2",heart2Img)
   heart2.scale = 0.4

   heart3 = createSprite(displayWidth - 150,40,20,20)
   heart3.visible = false
   heart3.addImage("heart3",heart3Img)
   heart3.scale = 0.4


   zombieGroup = new Group();
   bulletGroup = new Group()





}

function draw() {
  background(0); 
  if (gameState == "fight") {
  //displaying the lives
  if (life == 3) {
    heart3.visible = true;
    heart1.visible = false;
    heart2.visible = false;
  }
  
  if (life == 2) {
    heart2.visible = true;
    heart1.visible = false;
    heart3.visible = false;
  }
  
  if (life == 1) {
    heart1.visible = true;
    heart3.visible = false;
    heart2.visible = false;
  }

  if (life == 0) {
    heart1.visible = false;heart2.visible = false;heart3.visible = false
    gameState = "lost"
  }
  if (score == 100) {
    gameState = "won"
  }
  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}
//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  bullet = createSprite(displayWidth - 1150,player.y - 30,20,10)
  bullet.addImage(bulletImg)
  bullet.scale = 0.1
  bullet.velocityX = 20
  bulletGroup.add(bullet)
  player.depth = bullet.depth
  player.depth = player.depth + 2
 player.addImage(shooter_shooting)
 bullets = bullets - 1
 
  
 }
 
 //player goes back to original standing image once we stop pressing the space bar
 else if(keyWentUp("space")){
   player.addImage(shooterImg)
 }
 if (bullets === 0) {
  gameState = "bullet"
}
//destroy the zombie when the bullet touches it
if (zombieGroup.isTouching(bulletGroup)) {
  for (var i = 0; i < zombieGroup.length; i++) {
   if (zombieGroup[i].isTouching(bulletGroup)) {
    zombieGroup[i].destroy()
    bulletGroup.destroyEach();
    score = score + 2

   } 
  }
 }
 // reduse life and destroy the zomie when the player is touching it
 if (zombieGroup.isTouching(player)) {
  for (var i = 0; i < zombieGroup.length; i++) {
   if (zombieGroup[i].isTouching(player)) {
    zombieGroup[i].destroy()
    life = life - 1

   } 
  }
  }
  enemy();
}


drawSprites();
textSize(20)
fill("white")
text ("Bullets ="+bullets,displayWidth - 210, displayHeight / 2 - 250)
text ("Score ="+score,displayWidth - 200, displayHeight / 2 - 220)
text ("Life ="+life,displayWidth - 200, displayHeight / 2 - 280)



if (gameState === "lost") {
  textSize(100)
  fill("red")
  text("You LOST The GAME.",400,400)
  zombieGroup.destroyEach();
  player.destroy();

}

if (gameState === "won") {
  textSize(100)
  fill("green")
  text("You WON The GAME.",400,400)
  zombieGroup.destroyEach();
  player.destroy();

}

else if (gameState === "bullet") {
  textSize(50)
  fill("yellow")
  text("You RAN OUT OF BULLETS.",400,400)
  zombieGroup.destroyEach();
  bulletGroup.destroyEach();
  player.destroy();

}






}

function enemy(){
   if(frameCount%50===0){ //giving random x and y positions for zombie to appear 
    zombie = createSprite(random(500,1100),random(100,500),40,40) 
    zImage = Math.round(random(1,3))
    if (zImage === 1) {
      zombie.addImage(zombieImg)
      zombie.scale = 0.1
    }
    
    else if (zImage === 2) {
      zombie.addImage(zombie2Img)
      zombie.scale = 0.20
    }

    else if (zImage === 3) {
      zombie.addImage(zombie3Img)
      zombie.scale = 0.20 
    }
     
    
    zombie.velocityX = -3 
    
    zombie.setCollider("rectangle",0,0,450,450) 
    zombie.lifetime = 400 
    zombieGroup.add(zombie) } }


