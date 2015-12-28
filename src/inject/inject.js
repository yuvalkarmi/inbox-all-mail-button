/**
 * Adds an 'All Mail' button to Inbox by Gmail
 * @author Yuval Karmi (@yuvalkarmi, github.com/yuvalkarmi)
 * This content is released under the MIT License. 
 */

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

    function openAllMail(){
      // create a new mouse event
      var mEvent = document.createEvent("MouseEvent");
      // find the search box
      var searchBox = document.querySelector("input[placeholder='Search']");

      // change the value of the search box to in:all
      searchBox.value = "in:all";
      
      // initialize the mouse event
      mEvent.initMouseEvent("input", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

      // dispatch the event and let Inbox take care of the rest
      searchBox.dispatchEvent(mEvent);

      // wait a second, then choose the last search result (the filter) and deselect the text
      setTimeout(function(){
        // click on the result
        document.querySelector("div[role='listbox']").querySelector("ul:last-child li:last-child").click();

        // deselect the text
        searchBox.selectionEnd = searchBox.selectionStart;

        searchBox.blur();
      }, 1000);
    }

    // find the reminders button
    var reminders = document.querySelectorAll("li span[title='Reminders']")[0].parentNode;
    // grab its classlist
    var classes = reminders.className;
    // create the html for an open all mail button
    var openAllMailButton = "<li id='openAllMailButton' class='"+classes+"'><img class='io' src='"+ chrome.extension.getURL("/images/icon.png")+"'><span class='sM' title='All Mail'>All Mail</span></li>";
    // add the open all mail button after the reminders button
    reminders.insertAdjacentHTML('afterend', openAllMailButton);
    // bind a click event to it so that it triggers the openAllMail function
    document.getElementById('openAllMailButton').addEventListener('click', openAllMail);
	}
	}, 10);
});