chrome.storage.local.get("selectedText", (data) => {
	const selectedText = data.selectedText || "No selected text";
	document.getElementById("selectedText").textContent = selectedText;
});