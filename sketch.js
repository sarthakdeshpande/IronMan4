
var bg, backgroundImg,ironman,ironmanImg,stoneImg,StoneGroup,diamondGroup,diamondImg,spikeGroup,spikeImg;;
var score=0;
function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  ironmanImg = loadImage("images/iron.png");
  stoneImg = loadImage("images/stone.png");
  diamondImg = loadImage("images/diamond.png");
  spikeImg = loadImage("images/spikes.png");
}

function setup() {
  createCanvas(1000, 600);
  bg = createSprite(580,300);
  bg.addImage(backgroundImg)

  ironman = createSprite(100,400,50,100);
  ironman.addImage(ironmanImg)
  ironman.scale=0.3;
  //ironman.debug=true;
  ironman.setCollider("rectangle",100,0,200,400)

  StoneGroup = new Group();
  diamondGroup = new Group();
  spikeGroup = new Group();
}

function draw() {
  
if(keyDown("up")){
  ironman.velocityY = -10;
}
if(keyDown("left")){
  ironman.x = ironman.x -5;
}  
if(keyDown("right")){
  ironman.x = ironman.x +5;
} 
ironman.velocityY = ironman.velocityY + 0.5;


GenerateStone();
for(var i = 0; i < StoneGroup.length; i++){
  var temp = StoneGroup.get(i)
      ironman.collide(temp);
}

GenerateDiamonds();
for(var i = 0; i < diamondGroup.length; i++){
  var temp = diamondGroup.get(i)

  if(temp.isTouching(ironman)){
    score++
    temp.destroy();
    temp = null;
  }
}
GenerateSpikes();
for(var i = 0; i < spikeGroup.length; i++){
  var temp = spikeGroup.get(i)

  if(temp.isTouching(ironman)){
    score= score-5;
    temp.destroy();
    temp = null;
  }
}
    drawSprites();
   fill("white")
   textSize(25);
   text("Score : "+score,100,100);
}
function GenerateDiamonds(){
  if(frameCount%110==0){
    var diamonds = createSprite(random(10,900),30,100,50);
    diamonds.addImage(diamondImg);
    diamonds.scale=0.5;
    diamonds.velocityY=2;
    diamonds.lifetime=500;
    //diamonds.debug=true
    diamonds.setCollider("rectangle",0,0,80,80)
    diamondGroup.add(diamonds);
  }
}

function GenerateStone(){
  if(frameCount%120==0){
    var stone = createSprite(random(10,900),30,100,50);
    stone.addImage(stoneImg);
    stone.velocityY=2;
    stone.lifetime=500;
    //stone.debug=true;
    stone.setCollider("rectangle",0,0,200,40)
    StoneGroup.add(stone);
  }
}

function GenerateSpikes(){
  if(frameCount%120==0){
    var spikes = createSprite(random(10,900),30,100,50);
    spikes.addImage(spikeImg);
    spikes.velocityY=2;
    spikes.lifetime=500;
    //spikes.debug=true;
    spikes.setCollider("rectangle",0,0,50,50)
    spikeGroup.add(spikes);
  }
}