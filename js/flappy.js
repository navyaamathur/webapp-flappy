var stateActions = { preload: preload, create: create, update: update };
var width = 800;
var height = 400;
var gameGravity = 250;
var gameSpeed = 175;
var jumpPower = 200;
var game = new Phaser.Game(width, height, Phaser.AUTO, 'game', stateActions);
var player;
var pipes = [];
var coins = [];
var balloons = [];
var weight = [];
var score = -3;
var scorer = 0;
var labelScore;
var gapSize = 180;
var gapMargin = 50;
var blockHeight = 50;
var splashDisplay;

function preload() {
    game.load.image("coin", "../assets/coin.png");
    game.load.image("playerImage", "../assets/flappy.png");
    game.load.audio("score", "../assets/point.ogg");
    game.load.image("pipeBlock", "../assets/pipe.png");
    game.load.image("pipeEnd", "../assets/pipe-end.png");
    game.load.image("balloons", "../assets/balloons.png");
    game.load.image("weight", "../assets/weight.png");
  }

function start(){
  splashDisplay.destroy();
  game.input
      .keyboard.addKey(Phaser.Keyboard.ENTER)
      .onDown.remove(start);
  game.input
      .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
      .onDown.add(function()
    {
      player.body.velocity.y = -jumpPower;
    });
  labelScore = game.add.text(750, 360, "0");
  player.body.gravity.y = gameGravity;
  var pipeInterval = 1.75 * Phaser.Timer.SECOND;
  game.time.events.loop(pipeInterval, generate);
}

function create() {
  game.stage.setBackgroundColor("#00FFFF");
  player = game.add.sprite(30, 200, "playerImage");
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.enable(player);
  player.anchor.setTo(0.5, 0.5);
  player.scale.setTo(0.8, 0.8);
  splashDisplay = game.add.text(100, 200, "Press ENTER to start.");
  game.input
      .keyboard.addKey(Phaser.Keyboard.ENTER)
      .onDown.add(start);
}

function update() {
player.rotation = Math.atan(player.body.velocity.y / (gameSpeed*3));
game.physics.arcade.overlap(player, pipes, gameOver);
effect(-50, balloons);
effect(50, weight);
scoreUp();
if(player.y>360){gameOver();}
if(player.y<0){gameOver();}
}

function addPipeBlock(x, y){
  var block = game.add.sprite(x, y, "pipeBlock");
  pipes.push(block);
  game.physics.arcade.enable(block);
  block.body.velocity.x = -gameSpeed;
}

function addPipeEnd(x, y){
  var end = game.add.sprite(x, y, "pipeEnd");
  pipes.push(end);
  game.physics.arcade.enable(end);
  end.body.velocity.x = -gameSpeed;
}

function addCoin(x, y){
  var coin = game.add.sprite(x, y, "coin");
  coin.scale.setTo(0.25, 0.25);
  coins.push(coin);
  game.physics.arcade.enable(coin);
  coin.body.velocity.x = -gameSpeed;
}

function scoreUp(){
  for(var i in coins){
    game.physics.arcade.overlap(player, coins[i], function(){
      changeScore();
      coins[i].destroy();
      //coins.splice(i, 1);
    });
  }
}

function effect(effectNumber, effectArray){
  for(var n = effectArray.length; n>0; n--){
    game.physics.arcade.overlap(player, effectArray[n], function(){
      gameGravity+=effectNumber;
      player.body.gravity.y = gameGravity;
      effectArray[n].destroy();
      effectArray.splice(n, 1);
    });
  }
}

function changeScore(){
    scorer++;
    //if(score<0){scorer=0;}
    //else{scorer=score;}
    labelScore.setText(scorer.toString());
  }

function gameOver(){
  player.kill();
  registerScore(scorer);
  score=-3;
  scorer=0;
  gameGravity = 250;
  coins = [];
  game.state.restart();
}

function generateBalloons(){
  var bonus = game.add.sprite(width, height, "balloons");
  balloons.push(bonus);
  game.physics.arcade.enable(bonus);
  bonus.body.velocity.x = -gameSpeed;
  bonus.body.velocity.y = -game.rnd.integerInRange(50, 80);
}

function generateWeight(){
  var bonus = game.add.sprite(width, 50, "weight");
  balloons.push(bonus);
  game.physics.arcade.enable(bonus);
  bonus.body.velocity.x = -gameSpeed;
  bonus.body.velocity.y = game.rnd.integerInRange(50, 80);
}

function generatePipe(){
  var gapStart = game.rnd.integerInRange(gapMargin, height-gapSize-gapMargin);
  for(var y = gapStart; y>0; y-=blockHeight){
    addPipeBlock(width, y-blockHeight);
  }
  for(var z = gapStart + gapSize; z<height; z+=blockHeight){
    addPipeBlock(width, z);
  }
  addPipeEnd(width-5, gapStart);
  addPipeEnd(width-5, gapStart+gapSize-25);
  addCoin(width+30, gapStart+10);
}

function generate(){
  var type = game.rnd.integerInRange(1, 8);
  if(type == 1){
    generateWeight();
  }
  else if(type==2){
    generateBalloons();
  }
  else{
    generatePipe();
  }
}
