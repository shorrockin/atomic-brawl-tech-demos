$(document).ready(function(){
  $("#navigation-select").val( '' );
  $("#navigation-select").change(function () {
    $("#main-content").fadeTo('fast', 0.3);
    $("#modal-progress").show();
    location.href = $(this).val();
  });
});