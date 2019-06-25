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


function reset (){

	chrome.browserAction.setIcon({path : "../../icons/Logo_greyscale.png"});

	chrome.storage.local.clear(function () {
		console.log("Events reset");
	});
}

reset();
var api_server = "http://67.205.138.102:8000/";

chrome.webNavigation.onDOMContentLoaded.addListener(function (details) {

	var url = details.url;
	reset();

	if (url.includes("https://en.wikipedia.org/wiki/")) {

		var topic = url.replace("https://en.wikipedia.org/wiki/", "");

		// try to remove the #... anchoring labels but not sure this is working
		if (topic.includes('#')) {
			topic = topic.split('#')[0];
		}
		var req_url = api_server + "submission/?wiki_topic=" + topic;

		fetch(req_url)
		.then(r => r.text())
		.then(function(result) {
			result_json = JSON.parse(result);
			if (result_json.found) {
				chrome.storage.local.set({events: result_json.events}, function() {
					console.log("Found events");
					chrome.browserAction.setIcon({path : "../../icons/Logo.png"});
        		});
			}
		});
	}
});
