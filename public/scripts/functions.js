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
});
