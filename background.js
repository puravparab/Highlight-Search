chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === "handleSelectedText") {
		const selectedText = message.text;
		chrome.storage.local.set({ selectedText: selectedText });
	}
});