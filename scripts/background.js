var movie_sites = 	[
						{
							movie_name: 'Moviefone', 
							url: 'moviefone.com', 
							segment: 'movie', 
							title_selector: '.movie-title h1'
						},
						{
							movie_name: 'IMDB', 
							url: 'imdb.com', 
							segment: 'title', 
							title_selector: '#title-overview-widget h1.header span[itemprop="name"]'
						}
					];

function getProxy() {
	var proxy = localStorage["proxy"];
	if(!proxy) {
		return 'piratereverse.info';
	} else {
		return proxy;
	}
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function logIt(message) {
	console.log(message);
}


function openMovie(tab) {
	var uri = new URI(tab.url);
	var found_site = false;
	logIt('URL: ' + uri);

	for ( var i = 0 ; i < movie_sites.length; i++) {
		if(endsWith(uri.hostname(), movie_sites[i].url) && uri.segment(0) == movie_sites[i].segment) {
			chrome.tabs.sendMessage(tab.id, {selector: movie_sites[i].title_selector}, function(response) {
				var pirate_uri = new URITemplate(getProxy() + 'search/{title}/0/7/0');
				chrome.tabs.create({
					url: pirate_uri.expand({title: response.title})
				});
			});
			found_site = true;
			logIt("Found site: " + movie_sites[i].movie_name + " | " + movie_sites[i].url + " | " + movie_sites[i].segment + " | " + movie_sites[i].title_selector);
			break;
		}
	}
	if(found_site == false) {
		alert('Sorry, no movie detected...');
	}
}

function downloadMovie(tab) {
	var uri = new URI(tab.url);
	var found_site = false;
	logIt('URL: ' + uri);

	for ( var i = 0 ; i < movie_sites.length; i++) {
		if(endsWith(uri.hostname(), movie_sites[i].url) && uri.segment(0) == movie_sites[i].segment) {
			chrome.tabs.sendMessage(tab.id, {selector: movie_sites[i].title_selector}, function(response) {
				var pirate_api_uri = new URITemplate('http://apify.ifc0nfig.com/tpb/search?id={title}&$orderby=seeders%20desc&$top=1');
				var prepare_api_url = pirate_api_uri.expand({title: response.title});
				var xhr = new XMLHttpRequest();
				xhr.open("GET", prepare_api_url, true);
				xhr.onreadystatechange = function() {
					if (xhr.readyState == 4) {
					    // JSON.parse does not evaluate the attacker's scripts.
					    var resp = JSON.parse(xhr.responseText);
					    logIt("Downloading: " + resp[0].name);
					    chrome.tabs.create({
							url: resp[0].magnet
						});
					}
				}
				xhr.send();
			});
			found_site = true;
			logIt("Found site: " + movie_sites[i].movie_name + " | " + movie_sites[i].url + " | " + movie_sites[i].segment + " | " + movie_sites[i].title_selector);
			break;
		}
	}
	if(found_site == false) {
		alert('Sorry, no movie detected...');
	}
}