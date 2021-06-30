$(document).ready(function() {
	/** Function for clickable blog posts. That take you to their endpoint. 
	 * via 'data-id' which is a slug.
	 */
	// $('.heading-wrapper').click(function() {
	// 	blogID = $(this).attr('data-id');
	// 	if (blogID) {
	// 		window.location.href = `db/blog/${blogID}`;
	// 	}
	// });

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

	// Profile Hover
	// $('.heading-wrapper').hover(
	// 	function() {
	// 		blogID = $(this).attr('data-id');
	// 		if (blogID) {
	// 			$(this).css({ opacity: '68%' });
	// 		}
	// 	},
	// 	function() {
	// 		blogID = $(this).attr('data-id');
	// 		if (blogID) {
	// 			$(this).css({ opacity: '100%' });
	// 		}
	// 	}
	// );
});
