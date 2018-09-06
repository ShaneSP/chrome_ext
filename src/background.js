chrome.runtime.onInstalled.addListener(function() {
    if(!chrome.storage.sync.get(['list'], () => {})) {
        chrome.storage.sync.set({'list': []}, () => {
            console.log("Initializing list...");
        });
    }
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log("Message received: " + request.msg);
        
    });
});
