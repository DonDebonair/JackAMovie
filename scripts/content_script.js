function stripHtml(str) {
    return $('<div />', { html: str }).text();
}

chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.log(request.selector);
		var movietitle = $(request.selector).html();
		console.log(stripHtml(movietitle));
		sendResponse({title: stripHtml(movietitle)});
	});