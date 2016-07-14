var truthi = true;
var truthc = true;
var truths = true;
var highScoresNumber = [0, 0, 0, 0, 0];
var highScores = [" "," "," "," "," "];
var scoreRecord = "";
var instructing = "<p>Instructions:</p><ul><li>Tap the spacebar to jump.</li>Pipes kill.<li>Scores NOT recorded.</li><li>Will restart after you die.</li></ul>";

function registerScore(scorer){
  var highscoreFlag = false;
  for(var i in highScoresNumber){
    if(scorer>highScoresNumber[i]){
      highscoreFlag = true;
      highScoresNumber.splice(i, 0, scorer);
      highScoresNumber.pop();
      var playerName = prompt("What's your name?");
      var scoreEntry = "<li>" + playerName + ":" + scorer.toString() + "</li>";
      highScores.splice(i, 0, scoreEntry);
      highScores.pop();
      break;
    }
    //if(scorer<=highScoresNumber[i]){
      //alert("Sorry, you didn't make the scoreboard!");
    //}
    /*else if (scorer==i) {
      highScoresNumber.splice(highScoresNumber[i], 0, scorer);
      var playername = prompt("What's your name?");
      var scoreentry = "<li>" + playername + ":" + scorer.toString() + "</li>";
      highScores.splice(highScores[i], 0, scoreentry);}*/
  }

  if (!highscoreFlag) {
    alert("Sorry, you didn't make the scoreboard!");
  }

  scoreRecord = "";
  for(var r in highScores){
    if(highScores[r] != " "){
      scoreRecord = scoreRecord + highScores[r];
    }
  }

  if(!truths) {
    jQuery("#content").empty();
    jQuery("#content").append("<ol>"+scoreRecord+"</ol>");
  }
}

jQuery("#credits").on("click", function()
{if(truthc){
  jQuery("#content").empty();
  jQuery("#content").append(
    "<p>Created by Navyaa</p>"
  ); truthc = false; truthi=true; truths = true;}
else{jQuery("#content").empty();
truthc = true;}});


jQuery("#instructions").on("click", function(){if(truthi){
  jQuery("#content").empty();
  jQuery("#content").append(
    instructing
  ); truthi=false;truthc=true;truths=true;}
else{jQuery("#content").empty(); truthi=true;}});

jQuery("#score").on("click", function()
{
  if(truths){
    jQuery("#content").empty();
    jQuery("#content").append("<ol>"+scoreRecord+"</ol>");
    truths=false;truthi=true;truthc=true;
  }
  else{jQuery("#content").empty();truths=true;}
}
);
