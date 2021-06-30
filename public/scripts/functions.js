$(document).ready(function() {
	$('.heading-wrapper').click(function() {
		blogID = $(this).attr('data-id');
		window.location.href = `db/blog/${blogID}`;
	});

	$('.profile-image-wrapper').hover(
		function() {
			$('.profile-dropdown').slideDown();
			console.log('Hello');
		},
		function() {
			$('.profile-dropdown').slideUp();
		}
	);
});
