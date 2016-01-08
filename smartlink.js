if (history && history.pushState) {
	// Load pages with AJAX and use HTML5 to manipulate the history.
	$(window).load(function() { $("a").click(linkClicked); });
	$(window).on("popstate", function(state) {
		linkTo(location.pathname);
	});
}

function linkClicked() {
	var baseUrl = $(this).attr("href");
	if (baseUrl.indexOf(":") >= 0 || $(this).attr("target") != null) {
		// Absolute link or target attribute.
		return true;
	}

	return linkTo(baseUrl);
}

function linkTo(baseUrl) {
	var container = $("#Container");
	var url = completeUrl(baseUrl);

	container.fadeOut();

	$.get(url)
		.then(
			function ready(content) {
				if (history && history.pushState) {
					history.pushState(null, null, baseUrl);
				}
				container.queue(function () {
					container.html(content);
					container.fadeIn();
					$(this).dequeue();
				});
			},
			
			function failed(message) {
				location.href = baseUrl;
			}
		);

	return false;
}

function completeUrl(url) {
	return "sections" + url;
}
