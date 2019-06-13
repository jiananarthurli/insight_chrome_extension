// function loadItems() {
//  /* First get() the data from the storage */
//  chrome.storage.sync.get(['todo'], function(result) {
//   var todo = []

//   if (result && result.todo && result.todo.trim() !== '') {
//    /* Parse and get the array as it is saved as a string */
//    todo = JSON.parse(result.todo)
//   }

//   console.log('todo.length = ' + todo.length)

//   for (var i = 0; i < todo.length; i++) {
//    item = todo[i]

//    if (item && item.trim() !== '') {
//     /* Append the items in the #list for showing them */
//     var list = document.getElementById('list')
//     var entry = document.createElement('li')
//     var text = document.createTextNode(item)

//     entry.appendChild(text)
//     list.appendChild(entry)
//    }
//   }
//  })
// }

// /* Load the to-do items upon popup load */
// document.addEventListener('DOMContentLoaded', function(){
//  console.log('Inside doc.loaded()')

//  loadItems()
// })

// /* Save the to-do item upon button click */
// document.getElementById('btn').addEventListener('click', function (ev) {
//  console.log('Inside btn.click()')

//  text = document.getElementById('txt').value

//  if (text && text.trim() !== '') {

//   /* First get() old data as calling set() will replace it */
//   chrome.storage.sync.get(['todo'], function(result) {
//    var todo = []

//    if (result && result.todo && result.todo.trim() !== '') {
//     /* Parse and get the array as it is saved as a string */
//     todo = JSON.parse(result.todo)
//    }

//    todo.push(text)

//    chrome.storage.sync.set({'todo': JSON.stringify(todo)}, function() {
//     /* Data is saved now */

//     var list = document.getElementById('list')

//     while (list.firstChild) {
//      list.removeChild(list.firstChild)
//     }

//     loadItems()
//    })
//   })
//  }
// })


// chrome.storage.onChanged.addListener(function (details) {
//   chrome.storage.sync.get(['events'], function(events) {
//     alert(events);
// })

// function refresh() {
//   document.getElementById('events').innerHTML = ""
//   console.log('Refreshed');
// }

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

      	// table_of_events.innerText = data.events[0].name;
    }
  })
}

document.addEventListener('DOMContentLoaded', function() {

  load();

})
