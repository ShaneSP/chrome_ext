// Called when the user clicks on the browser action.
chrome.runtime.onInstalled.addListener(function() {
    if(!chrome.storage.local.get(['list'], () => {})) {
        chrome.storage.local.set({'list': []}, () => {
            console.log("Initializing list...");
        });
    }
    console.log("Test");
});
