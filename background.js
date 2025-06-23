chrome.action.onClicked.addListener((tab) => {
    const url = tab.url || "";
    
    if (url.startsWith("chrome://") || url.startsWith("chrome-extension://")) {
        console.warn("Can't inject content script into chrome:// or extension pages.");
        return;
    }

    chrome.permissions.request(
        {
            origins: ["https://mail.google.com/*"]
        },
        (granted) => {
            if (granted) {
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ["content.js"]
                });
            } else {
                console.log("Permission not granted for Gmail.");
            }
        }
    );
});
