const mainDiv = document.getElementsByClassName("main")[0]
const responseDiv = document.getElementsByClassName("responseBody")[0]

// HIGHLIGHT
// Get text selected by user
const promptInput = document.querySelector('textarea[name="selectedText"]')

chrome.storage.local.get("selectedText", (data) => {
	const selectedText = data.selectedText || "No selected text";
	promptInput.value = selectedText;
	promptInput.style.height = `${promptInput.scrollHeight}px`;
});

// SETTINGS
// Handle when user clicks settings
const settingsBtn = document.getElementById("settingsBtn")
const settings = document.getElementsByClassName("settings")[0]

settingsBtn.addEventListener("click", () => {
	if (mainDiv.style.display !== "none"){
		mainDiv.style.display = "none"
		responseDiv.style.visibility = "hidden"
		responseDiv.style.display = "none"
		settingsBtn.innerHTML = "back"
		settings.style.visibility = "visible"
		settings.style.display = "flex"
	} else {
		mainDiv.style.display = "flex"
		responseDiv.style.visibility = "visible"
		responseDiv.style.display = "flex"
		settingsBtn.innerHTML = "settings"
		settings.style.visibility = "hidden"
		settings.style.display = "none"
	}
});

// Save settings
const saveBtn = document.getElementById("saveBtn")
const oaKey = document.querySelector('input[name="openaikey')
const sysPrompt = document.querySelector('textarea[name="systemprompt"]')

saveBtn.addEventListener("click", () => {
	const openaiKey = oaKey.value.trim()
	const systemprompt = sysPrompt.value.trim()
	chrome.storage.local.set({openaikey: openaiKey})
	chrome.storage.local.set({systemprompt: systemprompt})
})

// Get keys from storage and fill the input
chrome.storage.local.get("openaikey", (data) => {
	const openaikey = data.openaikey;
	oaKey.value = openaikey || "";
});
// Get system prompt from storage and fill the input
chrome.storage.local.get("systemprompt", (data) => {
	const systemprompt = data.systemprompt;
	sysPrompt.value = systemprompt || "You are a helpful assistant.";
});


// OPENAI
// Handle event when user clicks "AI Search"
const aisearchBtn = document.getElementById("ai-search")
const responseTag = document.getElementById("response")

aisearchBtn.addEventListener("click", async () => {
	chrome.storage.local.get("openaikey", async (data) => {
		const openaikey = data.openaikey;

		responseTag.innerHTML = "Fetching response ..."
		responseDiv.style.visibility = "visible"
		responseDiv.style.display = "flex"

		if (openaikey === ""){
			responseTag.innerHTML = "Error: No API Key"
		} else {
			const prompt = promptInput.value
			const systemprompt = sysPrompt.value
			const data = await fetchChatCompletion(prompt, systemprompt, "gpt-3.5-turbo", openaikey)
			if (data){
				const formattedText = data["choices"][0]["message"]["content"].replace(/\n/g, "<br>");
				responseTag.innerHTML = formattedText
			}
		}
	});
})

// Request chat completion from openai api
const fetchChatCompletion = async (prompt, systemprompt, model, openaikey) => {
	const url = "https://api.openai.com/v1/chat/completions"

	const requestBody = {
		"model": model,
		"messages": [
			{"role": "system", "content": systemprompt},
			{"role": "user", "content": prompt}
		]
	}

	const res = await fetch(url, {
		"method": "POST",
		"headers": {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${openaikey}`,
		},
		body: JSON.stringify(requestBody)
	})
	const data = await res.json()
	return data
}

// Google Search
// Handle event when user clicks "Search"
const searchBtn = document.getElementById("google-search")

searchBtn.addEventListener("click", () => {
	chrome.tabs.create({url: `https://www.google.com/search?q=${promptInput.value}`});
})
