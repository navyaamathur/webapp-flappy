jQuery("#credits").on("click", function(){
  var message = "Game created by Navyaa.";
  //alert(message);
  jQuery("#credits").append(
    "<p>" + message + "</p>"
  );
});
