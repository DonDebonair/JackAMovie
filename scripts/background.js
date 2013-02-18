function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

chrome.browserAction.onClicked.addListener(
	function(tab) {
		var uri = new URI(tab.url);
		if(endsWith(uri.hostname(), 'moviefone.com') && uri.segment(0) == 'movie') {
			chrome.tabs.sendMessage(tab.id, {message: "lookup_movie"}, function(response) {
				var pirate_uri = new URITemplate('https://piratereverse.info/search/{title}/0/7/0');
				chrome.tabs.create({
					url: pirate_uri.expand({title: response.title})
				});
			});
		} else {
			alert('Sorry, no movie detected...');
		}
	});
