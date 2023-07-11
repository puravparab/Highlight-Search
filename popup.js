// Get text selected by user
const promptInput = document.querySelector('textarea[name="selectedText"]')

chrome.storage.local.get("selectedText", (data) => {
	const selectedText = data.selectedText || "No selected text";
	promptInput.value = selectedText;
	promptInput.style.height = `${promptInput.scrollHeight}px`;
});

// Handle settings
const settingsBtn = document.getElementById("settingsBtn")
const mainDiv = document.getElementsByClassName("main")[0]
const settings = document.getElementsByClassName("settings")[0]

settingsBtn.addEventListener("click", () => {
	if (mainDiv.style.display !== "none"){
		mainDiv.style.display = "none";
		settingsBtn.innerHTML = "back";
		settings.style.visibility = "visible";
		settings.style.display = "flex";
	} else {
		mainDiv.style.display = "flex";
		settingsBtn.innerHTML = "settings";
		settings.style.visibility = "hidden";
		settings.style.display = "none";
	}
});

// Save api keys
const saveBtn = document.getElementById("saveBtn")
const oaKey = document.querySelector('input[name="openaikey')

saveBtn.addEventListener("click", () => {
	const openaiKey = oaKey.value.trim()
	chrome.storage.local.set({openaikey: openaiKey})
})

// Get keys from storage and fill the inputs
chrome.storage.local.get("openaikey", (data) => {
	const openaikey = data.openaikey;
	oaKey.value = openaikey || "";
});