function load() {

  var event_list = document.getElementById("event_list");

  chrome.storage.local.get("events", function(data) {

    if(typeof(data.events) !== "undefined") {

      event_list.innerHTML = "";

    	data.events.forEach(function(event) {

        var elmnt = document.createElement("li")

  			var event_name = event.name;
        var event_link = event.link;
        var event_venue = event.venue;

        var div = document.createElement("div");
        div.innerHTML = event_venue;
        div.setAttribute("class", "venue");

        var a = document.createElement("a");
        // a.innerHTML = '<div class="venue">' + JSON.stringify(event_venue) + '</div>' + event_name;
        a.innerHTML = event_name;
        a.setAttribute("target", "_blank");
        a.setAttribute("href", event_link)

        elmnt.appendChild(div);
        elmnt.appendChild(a);

        console.log(elmnt);

  			// var a = event_name.link(event_link);
  			// a.target = '_blank'; // should open a new tap when clicked

        event_list.appendChild(elmnt);

		  })        


    }
  })
}

document.addEventListener('DOMContentLoaded', function() {

  load();

})