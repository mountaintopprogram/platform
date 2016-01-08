$("#Audience li[data-href]").click(function(e) {
	if (e.target.tagName != "A" && e.target.tagName != "INPUT" && e.target.tagName != "BUTTON") {
		linkTo($(this).data("href"));
		return false;
	}
});

function showVote() {
	$("#Vote").fadeOut(500, null, function() {
		$("#VoteForm").fadeIn();
		$("#school").focus();
	});
}

function onVote(event) {
	var url = $(this).attr("action");
	var data = {
		school: $("#school").val()
	};

	$("#VoteForm").fadeOut(500, null, function() {
		$("#Vote").text("Please wait...").fadeIn();
		$.post(url, data).then(
			function success(response) {
				$("#Vote").text("Thanks!").addClass("RequestSuccess");
			},

			function failure(response) {
				if (console) {
					console.log("Error posting to " + url + ": ", response.responseText);
				}
				$("#Vote").text("An error occurred, please try again").addClass("RequestFailure");
				$("#VoteForm").fadeIn();
			}
		);
	});

	return false;
}
$("#VoteForm form").submit(onVote);
