$(document).ready(function() {
	// Profile icon hover function
	$('.profile-image-wrapper').hover(
		function() {
			$('.profile-dropdown').stop().slideDown({ duration: 350, queue: false });
			console.log('Hello');
		},
		function() {
			$('.profile-dropdown').stop().slideUp({
				duration : 200,
				queue    : false
			});
		}
	);

	// Expand comment section input when clicked on
	$('.comment__input').on('click', function(e) {
		classList = $(this).attr('class');

		// Check if it's already opened.
		if (!classList.includes('comment__input--open')) {
			$(this).addClass('comment__input--open');

			// Show submit button.
			$('#comment__submit').show();
			console.log(classList);
		}
	});
});
