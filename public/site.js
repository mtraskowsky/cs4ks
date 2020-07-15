// Expanding the more info buttons
var buttons = document.querySelectorAll(".open-the-dialog-button");
buttons.forEach(function (button) {
  var id = button.dataset.infoId;
  var extraInfo = document.querySelectorAll(`.${id}`);
    extraInfo.forEach(function(dialog){
      button.addEventListener('click', function() {
        dialog.classList.toggle('active');
      });
    });
});