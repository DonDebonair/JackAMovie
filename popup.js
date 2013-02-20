var bgPage = chrome.extension.getBackgroundPage();


function log(message) {
    bgPage.logIt(message);
}

function clickOpen(e) {
	log('Trying to open movie...');
	chrome.tabs.query({active : true, currentWindow: true}, function (tabs) { 
		var tab = (tabs.length === 0 ? tabs : tabs[0]);
		bgPage.openMovie(tab);
	});
	window.close();
}

function clickDownload(e) {
	log('Trying to download movie...');
	chrome.tabs.query({active : true, currentWindow: true}, function (tabs) { 
		var tab = (tabs.length === 0 ? tabs : tabs[0]);
		bgPage.downloadMovie(tab);
	});
	window.close();
}

document.addEventListener('DOMContentLoaded', function () {
	$('div#open').click(clickOpen);
	$('div#download').click(clickDownload);
});