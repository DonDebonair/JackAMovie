function stripHtml(str) {
    return $('<div />', { html: str }).text();
}

chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		var movietitle = $('.movie-title h1').html();
		console.log(stripHtml(movietitle));
		sendResponse({title: stripHtml(movietitle)});
	});