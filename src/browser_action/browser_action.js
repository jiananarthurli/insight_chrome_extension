function load() {

  var table_of_events = document.getElementById('table_of_events');

  chrome.storage.local.get('events', function(data) {

    if(typeof(data.events) !== "undefined") {

    	var event_table = document.createElement("TABLE");

    	data.events.forEach(function(event) {
  			var row = event_table.insertRow(-1);
  			var event_name = event.name;
  			var event_link = event_name.link(event.link);
  			event_link.target = '_blank'; // should open a new tap when clicked
  			row.innerHTML =  event_link;
		})
    	
    	table_of_events.appendChild(event_table);

    }
  })
}

document.addEventListener('DOMContentLoaded', function() {

  load();

})
