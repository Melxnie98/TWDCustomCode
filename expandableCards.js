<script type="application/javascript">
  //For example change one thing recipients https://teachwell.blogs.auckland.ac.nz/awards-and-grants/change-one-thing-challenge/change-one-thing-challenge-recipients/
  //to make this work you just have to change all '#toggle-abhinaw' to replace abinhaw with new persons name and the same with '#firstLineAbhinaw' 
  //- you then have to set module css id to match '#toggle-abhinaw' (or your replacement) within divi editor

  
	// Get the text content only. Ignore embedded videos, images etc.
  var textContentAbhinaw = ($('#toggle-abhinaw').text().trim());

  // prevent any links being keyboard focusable while toggle is collapsed
  $('#toggle-abhinaw div:first-of-type').css({'visibility':'hidden'});

  // Prepend the text content to the start of the toggle
  $('#toggle-abhinaw').prepend( '<p id="firstLineAbhinaw" title="Expand" style="cursor:pointer; overflow:hidden; text-overflow:ellipsis; white-space: nowrap;">' + textContentAbhinaw + '</p>');
  // Get the height of the prepended paragraph. Useful for collapsing the toggle to its original height

  var reducedHeightAbhinaw = $('#toggle-abhinaw p:first-of-type').height();
	// Make the container div keyboard focusable
  $('#toggle-abhinaw').attr({'tabindex':'0', 'title':'Expand'});
  // Expand the toggle on click or ENTER
	$('#toggle-abhinaw').on('keypress click', function(event) {
    if (event.type == 'keypress' && event.which != '13') {
      // Ignore all but ENTER key
      return;
    }
    if (event.type == 'click' && event.target.nodeName != 'P') {
      // Don't collapse when clicking links, videos etc.
      return;
    }
    if (window.getSelection().toString() != "") {
      // Ignore user selecting text
      return;
    }
    if (event.target.getAttribute('title') == 'Expand') {
      $('#firstLineAbhinaw').css({'display':'none'});
      $('#toggle-abhinaw div:first-of-type').css({'visibility':'visible'});
      // Prepended p was clicked so open the accordion
      // Expand the toggle, measure it's full height then collapse it again
      $(this).css({'height':'auto'});
      var fullHeight = $(this).height();
    	$(this).height(reducedHeightAbhinaw);
      // Slide the toggle open
      $(this).animate({height: fullHeight}, 500, function() {
        // Animation complete
        // Set the container height to auto so it adjusts when the viewport size changes
        $(this).css('height', 'auto');
        $(this).attr({'title':''});
      });
    } else {
      // Slide the toggle closed
      $(this).animate({height: reducedHeightAbhinaw}, 500, function() {
        // Animation complete
        $('#firstLineAbhinaw').css({'display':'block'});
        $(this).attr({'title':'Expand'});
        $('#toggle-abhinaw div:first-of-type').css({'visibility':'hidden'});
      });
    }
	});
</script>
