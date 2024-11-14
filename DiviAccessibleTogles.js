<script type="text/javascript" async>
  //https://www.intelliwolf.com/divi-toggle-module-web-accessible/
jQuery(document).ready(function($) {
  $(".et_pb_toggle").each(function(i) {
    var toggleID = "et_pb_toggle_" + i;
    $(this).attr("tabindex","0");
    $(this).children(".et_pb_toggle_content").attr({
      "id": toggleID,
      "aria-labelledby": toggleID + "-title",
      "role": "region"
    });
    var toggleText = $(this).children(".et_pb_toggle_title").text();
    $(this).children(".et_pb_toggle_title").html(
      "<span role='button' id='" + toggleID + "-title' aria-controls='" + toggleID + "'>" + toggleText + "</span>"
    );
  });

  update_toggle_aria();
  $(".et_pb_toggle").on("click", ".et_pb_toggle_title", function() {
    setTimeout(update_toggle_aria, 1500);
  });

  function update_toggle_aria() {
    $(".et_pb_toggle_open .et_pb_toggle_title span").attr("aria-expanded", "true");
    $(".et_pb_toggle_close .et_pb_toggle_title span").attr("aria-expanded", "false");
  }

  $(document).on('keyup', function(e) {
    if (e.which === 13 || e.which === 32) {
      $('.et_pb_toggle:focus .et_pb_toggle_title').trigger('click');
    }
  });
});
</script>
