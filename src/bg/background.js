// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
// chrome.extension.onMessage.addListener(
//   function(request, sender, sendResponse) {
//   	chrome.pageAction.show(sender.tab.id);
//     sendResponse();
//   });

function isLocalKeyEmpty (key) {
	chrome.storage.local.getBytesInUse(key, function (bytes) {
		return bytes == 0;
	});
}

function reset (){
	chrome.storage.local.clear(function () {
		console.log("Events reset");
	});
}

reset();
var api_server = "http://127.0.0.1:8000/";

chrome.webNavigation.onDOMContentLoaded.addListener(function (details) {

	var url = details.url;
	reset();

	if (url.includes("https://en.wikipedia.org/wiki/")) {

		// reset the events variable
		chrome.storage.local.set({events: []}, function() {
        	console.log("Events reset");
        });

		var topic = url.replace("https://en.wikipedia.org/wiki/", "");
		if (topic.includes('#')) {
			topic = topic.split('#')[0];
		}
		var req_url = api_server + "submission/?wiki_topic=" + topic;

		fetch(req_url)
		.then(r => r.text())
		.then(function(result) { 
			chrome.storage.local.set({events: result}, function() {
				console.log("Events updated");
        	});
		});
	}
});
