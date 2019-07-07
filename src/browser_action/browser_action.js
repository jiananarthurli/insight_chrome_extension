function load() {

  // Get the event_list container
  var event_list = document.getElementById("event_list");

  // Retrieve data from local memory
  chrome.storage.local.get("events", function(data) {

    // If the data is updated
    if(typeof(data.events) !== "undefined") {

      event_list.innerHTML = "";

      // Generate list for each event entry
    	data.events.forEach(function(event, idx, array) {

        // Check if the element is the last one. Use a different css style if true.
        if (idx === (array.length - 1)) {
          var elmnt = document.createElement("ul")
        } else {
          var elmnt = document.createElement("li")
        }

        // Obtain the event name, venue and link.
  			var event_name = event.name;
        var event_link = event.link;
        var event_venue = event.venue;

        // Container for the event venue.
        var div = document.createElement("div");
        div.innerHTML = event_venue;
        div.setAttribute("class", "venue");

        var a = document.createElement("a");

        a.innerHTML = event_name;
        // Open a blank tab when the link is clicked.
        a.setAttribute("target", "_blank");
        a.setAttribute("href", event_link);

        // Put the event venue and link to the element
        elmnt.appendChild(div);
        elmnt.appendChild(a);

        // Append the new element to the list.
        event_list.appendChild(elmnt);

		  });       

    }
  })
}

// Trigger the function when DOM of the pop-up is loaded.
document.addEventListener('DOMContentLoaded', function() {

  load();

});