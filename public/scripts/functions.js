$(document).ready(function() {
  $(".heading-wrapper").click(function() {
    blogID = $(this).attr("data-id");
    window.location.href = `db/blog/${blogID}`;
  });

});