var player, playerRun, playerRunFlip;

var backgroundIMG, bg;

var enemy, enemyIMG, enemyGroup;

var cooldown = 0;

var injectionIMG, injectionGroup;

var heart, heartIMG, heartGroup;

var heartsLeft = 15;


function preload() {

  backgroundIMG = loadImage("images/background.png");

  heartIMG = loadImage("images/Heart.png")

  playerRun = loadAnimation("Animations/Run/tile000.png", "Animations/Run/tile001.png",
    "Animations/Run/tile002.png", "Animations/Run/tile003.png", "Animations/Run/tile004.png", "Animations/Run/tile005.png",
    "Animations/Run/tile006.png", "Animations/Run/tile007.png", "Animations/Run/tile008.png", "Animations/Run/tile009.png", "Animations/Run/tile010.png", "Animations/Run/tile011.png")

  enemyIMG = loadImage("images/Virus.png")

  playerRunFlip = loadAnimation("Animations/Run2/tile000.png", "Animations/Run2/tile001.png",
    "Animations/Run2/tile002.png", "Animations/Run2/tile003.png", "Animations/Run2/tile004.png", "Animations/Run2/tile005.png",
    "Animations/Run2/tile006.png", "Animations/Run2/tile007.png", "Animations/Run2/tile008.png", "Animations/Run2/tile009.png", "Animations/Run2/tile010.png", "Animations/Run2/tile011.png")

  injectionIMG = loadImage("images/Injection.jpg")

}


function setup() {

  createCanvas(1510, 730);

  bg = createSprite(200, 400, 20, 20);
  bg.addImage(backgroundIMG);
  bg.scale = 80

  player = createSprite(200, 600, 32, 32);
  player.addAnimation("runRight", playerRun);
  player.addAnimation("runLeft", playerRunFlip);
  player.scale = 1.5

  injectionGroup = new Group()
  enemyGroup = new Group()
  heartGroup = new Group()


  for (var i = 50; i < 1500; i = i + 100) {

    heart = createSprite(i, 700, 18, 14);
    heart.addAnimation("hearts", heartIMG);
    heart.scale = 0.1;

    heartGroup.add(heart);

  }

}


function draw() {

  background(0);

  if (keyDown("RIGHT_ARROW")) {

    player.x = player.x + 10;
    player.changeAnimation("runRight", playerRun);

  }

  if (keyDown("LEFT_ARROW")) {

    player.x = player.x - 10;
    player.changeAnimation("runLeft", playerRunFlip);

  }

  if (keyDown("Space") && cooldown < 0) {

    //shoot the injection
    createInjections();

    cooldown = 15;

  }

  for (var i = 0; i < enemyGroup.length; i++) {

    if (enemyGroup.get(i).isTouching(injectionGroup)) {

      enemyGroup.get(i).destroy();
      injectionGroup.destroyEach();

    }

  }

  for (var i = 0; i < heartGroup.length; i++) {

    if (heartGroup.get(i).isTouching(enemyGroup)) {

      heartGroup.get(i).destroy();
      heartsLeft--

    }

  }

  cooldown = cooldown - 1;

  createEnemies();

  drawSprites();

  if (heartsLeft === 0) {

    player.destroy();
    enemyGroup.destroyEach();
    injectionGroup.destroyEach();

    strokeWeight(5)
    stroke("Yellow")

    fill("Magenta")

    textSize(100);

    text("YOU LOSE", 500, 400);

  }

}


function createEnemies() {

  if (frameCount % 60 === 0) {

    var enemy = createSprite(200, 0, 1, 1);

    enemy.x = Math.round(random(0, 1500));

    enemy.addImage(enemyIMG);

    enemy.velocityY = 4
    enemy.lifetime = 200;
    enemy.scale = 0.04;

    enemy.debug = false;
    enemy.setCollider("circle", 0, 100, 1000)

    enemyGroup.add(enemy);

    enemy.depth = player.depth
    player.depth = player.depth + 1;

  }

}


function createInjections() {

  var injection = createSprite(player.x, 600, 32, 32);

  injection.scale = 0.1
  injection.velocityY = -8

  injection.addImage(injectionIMG);

  injection.depth = player.depth
  player.depth = player.depth + 1;

  injectionGroup.add(injection);

}