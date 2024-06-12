<script>
  // This function hides modules with the class 'sixTypes' when the page is loaded so that all of the types do not show
  //The document waits for one of the buttons to be clicked and after one is clicked it calls the filterModules function 
  
window.addEventListener('load', function() {
    var modules = document.getElementsByClassName('sixTypes');
    for (var i = 0; i < modules.length; i++) {
        modules[i].style.display = 'none';
    }
});
	$( document ).ready(function() {
		$('.all').click(function() { 
      filterModules(this, 'all')
    });
  	$('.acq').click(function() {
      filterModules(this, 'acquisitionV')
    });
    $('.col').click(function() { 
      filterModules(this, 'collaborationV')
    });
  	$('.dis').click(function() {
      filterModules(this, 'discussionV')
    });
    $('.inq').click(function() { 
      filterModules(this, 'inquiryV')
    });
  	$('.pra').click(function() {
      filterModules(this, 'practiceV')
    });
    $('.pro').click(function() { 
      filterModules(this, 'productionV')
    });
  });
  
 //This function finds everything with the class modules and adds the selected class to the clicked button, it toes the visual fade and then calls the apply filter function to the module

  function filterModules(clickedButton, selectedClass) {
    var modules = document.querySelectorAll('.module'); // Select all modules

    // Remove 'selected' class from all buttons
    var buttons = document.querySelectorAll('.tablink');
    buttons.forEach(button => {
      button.classList.remove('selected');
    });

    // Add 'selected' class to the clicked button
    clickedButton.classList.add('selected');

    $('.module-container').css('opacity', '0'); // fade out all tiles
    $('.module-container').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
      applyFilter(modules, selectedClass); // when the fade transition completes, apply the filter to the tiles
      $('.module-container').css('opacity', '255'); // fade in all tiles
    });
  }

//this function shows and hides the modules respectively 
  function applyFilter(modules, selectedClass){
    for (var i = 0; i < modules.length; i++) {
        if (selectedClass === 'all') {
            if (modules[i].classList.contains('sixTypes')) {
                modules[i].style.display = 'none'; // Hide modules with class 'sixTypes' when 'all' is selected
            } else {
                modules[i].style.display = 'block'; // Show other modules when 'all' is selected
            }
        } else if (modules[i].classList.contains(selectedClass)) {
            modules[i].style.display = 'block'; // Show the module if it matches the selected class
        } else {
            modules[i].style.display = 'none'; // Hide the module if it does not match the selected class
        }
    }
}
  
</script>
