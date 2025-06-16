jQuery(document).ready(function($) {

	var my_nav = $('.navbar-sticky'); 
	// grab the initial top offset of the navigation 
	var sticky_navigation_offset_top = my_nav.offset().top;
	
	// our function that decides weather the navigation bar should have "fixed" css position or not.
	var sticky_navigation = function(){
		var scroll_top = $(window).scrollTop(); // our current vertical position from the top
		
		// if we've scrolled more than the navigation, change its position to fixed to stick to top, otherwise change it back to relative
		if (scroll_top > sticky_navigation_offset_top) { 
			my_nav.addClass( 'stick' );
		} else {
			my_nav.removeClass( 'stick' );
		}   
	};

	var initio_parallax_animation = function() { 
		$('.parallax').each( function(i, obj) {
			var speed = $(this).attr('parallax-speed');
			if( speed ) {
				var background_pos = '-' + (window.pageYOffset / speed) + "px";
				$(this).css( 'background-position', 'center ' + background_pos );
			}
		});
	}
	
	// run our function on load
	sticky_navigation();
	
	// and run it again every time you scroll
	$(window).scroll(function() {
		 sticky_navigation();
		 initio_parallax_animation();
	});

});

// JavaScript for study plan checkbox functionality
document.addEventListener('DOMContentLoaded', function() {
    const studyPlanTable = document.querySelector('table'); // Assuming there's only one table on study_plan.html or it's the main one

    // Only run this script if we are on the study plan page and the table exists
    // A more specific selector for the table might be needed if there are other tables.
    // For now, we can check if the page title is "Study Plan" as a heuristic.
    if (document.title === "Study Plan" && studyPlanTable) {
        const checkboxes = document.querySelectorAll('.task-checkbox');

        // Load saved states from localStorage
        checkboxes.forEach(function(checkbox) {
            const row = checkbox.closest('tr.task-row');
            if (!row) return; // Should not happen with current HTML structure

            // Create a unique key for each checkbox based on its position or some unique data if available
            // For simplicity, using week number if available, otherwise index
            const weekCell = row.querySelector('td:nth-child(2)'); // Assuming week is the second cell
            let key = 'taskState_';
            if (weekCell) {
                key += 'week' + weekCell.textContent.trim();
            } else {
                // Fallback to index if week number isn't easily found (should be improved for robustness)
                key += Array.from(checkboxes).indexOf(checkbox);
            }

            if (localStorage.getItem(key) === 'true') {
                checkbox.checked = true;
                row.classList.add('completed');
            }

            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    row.classList.add('completed');
                    localStorage.setItem(key, 'true');
                } else {
                    row.classList.remove('completed');
                    localStorage.setItem(key, 'false');
                }
            });
        });
    }
});
