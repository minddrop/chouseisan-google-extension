(function () {
	chrome.runtime.onMessage.addListener(function (msg, sender) {
		document.getElementById("kouho").value = msg.text;
	})
})();
