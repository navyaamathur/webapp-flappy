// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var player;
var pipes = [];
var score = -3;
var scorer = 0;
var labelScore;

//Loads all resources for the game and gives them names.
function preload() {
    game.load.image("playerImage", "../assets/star.png");
    game.load.audio("score", "../assets/point.ogg");
    game.load.image("pipeBlock", "../assets/pipe.png");
}


//Initialises the game. This function is only called once.
function create() {
    // set the background colour of the scene
    game.stage.setBackgroundColor("#00FFFF");
    //game.add.text(20, 20, "Welcome", {font: "25px Courier", fill: "#FF3385"});
    //game.input.onDown.add(clickHandler);
    game.input
        .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(playerJump);
    //alert(score);
    player = game.add.sprite(10, 200, "playerImage");
    labelScore = game.add.text(750, 360, "0");
    player.scale.setTo(0.5, 0.5);
    generatePipe();
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(player);
    //player.body.velocity.x = 100;
    player.body.gravity.y = 250;
    var pipeInterval = 1.75 * Phaser.Timer.SECOND;
    game.time.events.loop(pipeInterval, generatePipe);
}

function generatePipe(){
var gapStart = game.rnd.integerInRange(1, 5);
for (var count = 0; count < 8; count++){
if(count != gapStart && count != gapStart+1){
addPipeBlock(750, count*50);}}
changeScore();
}

function addPipeBlock(x, y){
  var block = game.add.sprite(x, y, "pipeBlock");
  pipes.push(block);
  game.physics.arcade.enable(block);
  block.body.velocity.x = -175;
}

function playerJump(){
  player.body.velocity.y = -200;
}


//This function updates the scene. It is called for every new frame.
function update() {
game.physics.arcade.overlap(player, pipes, gameOver);
if(player.y>360){gameOver();}
if(player.y<0){gameOver();}
}

function changeScore(){
    score++;
    if(score<0){scorer=0;}
    else{scorer=score;}
    labelScore.setText(scorer.toString());
  }

function gameOver(){
  player.kill();
  registerScore(score);
  game.state.restart();
}
