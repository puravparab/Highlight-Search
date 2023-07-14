document.addEventListener("mouseup", () => {
	const selectedText = window.getSelection().toString();
	if (selectedText.length > 0) {
		chrome.runtime.sendMessage({ action: "handleSelectedText", text: selectedText });
	}
});