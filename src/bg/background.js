
function reset () {

	// set the icon to greyscale 
	chrome.browserAction.setIcon({path : "../../icons/Logo_greyscale.png"});

	// clean the local storage
	chrome.storage.local.clear(function () {
		console.log("Events reset");
	});
}

reset();

// API server IP
var api_server = "http://67.205.138.102:8000/";

// Add a listenser when DOM is loaded.
chrome.webNavigation.onDOMContentLoaded.addListener(function (details) {

	var url = details.url;
	reset();

	// If en.wikipedia.org is nativaged.
	if (url.includes("https://en.wikipedia.org/wiki/")) {

		var topic = url.replace("https://en.wikipedia.org/wiki/", "");

		// URL for http requests
		var req_url = api_server + "submission/?wiki_topic=" + topic;

		// Send http requests
		fetch(req_url)
		.then(r => r.text())
		.then(function(result) {
			result_json = JSON.parse(result);
			if (result_json.found) {
				// Store the fetched data into local memory for display
				chrome.storage.local.set({events: result_json.events}, function() {
					console.log("Found events");
					// Change to colored icon
					chrome.browserAction.setIcon({path : "../../icons/Logo.png"});
        		});
			}
		});
	}
});
