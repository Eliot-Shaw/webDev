function onLoad() {
}

function textProcessingButton() {
  var res = 0;
  var temp = 0;
  textProcessingData = document.getElementById("textProcessingTextAreaId").value;

  for (var i = 0; i < textProcessingData.length; i++) {
    if (textProcessingData[i] == " ") {
      temp++;
    }
    if (i>=3 && textProcessingData[i-2] == "u" && textProcessingData[i-1] == "w" && textProcessingData[i] == "s") {
      res+= temp;
      temp = 0;
      
    }
  }

  document.getElementById("textProcessingReponse").innerHTML = "The number of spaces before the last occurence of UWS is "+res+"!";
}





$(document).ready(function() {
  $("#datepicker").datepicker();

  $("#slider").slider({
      min: 0,
      max: 100,
      value: 50,
      slide: function(event, ui) {
          $("#sliderValue").text(ui.value);
      }
  });

  $("#dialog").dialog({
      autoOpen: false,
      modal: true
  });
  $("#openDialogButton").click(function() {
      $("#dialog").dialog("open");
  });
});
