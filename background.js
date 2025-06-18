chrome.action.onClicked.addListener((tab) => {
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
