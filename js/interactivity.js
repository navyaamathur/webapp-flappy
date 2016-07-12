var truthi = true;
var truthc = true;
var truths = true;
var scoreRecord = "";
var instructing = "<p>Instructions:</p><ul><li>Tap the spacebar to jump.</li>Pipes kill.<li>Scores NOT recorded.</li><li>Will restart after you die.</li></ul>";

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

function registerScore(){
  var playerName = prompt("What's your name?");
  var scoreEntry = "<li>" + playerName + ":" + score.toString() + "</li>";
  scoreRecord = scoreRecord + scoreEntry;
}

jQuery("#score").on("click", function()
{
  if(truths){
    jQuery("#content").empty();
    jQuery("#content").append(scoreRecord);
    truths=false;truthi=true;truthc=true;
  }
  else{jQuery("#content").empty();truths=true;}
}
);
