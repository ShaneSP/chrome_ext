chrome.runtime.onInstalled.addListener(function() {
    if(!chrome.storage.sync.get(['list'], () => {})) {
        chrome.storage.sync.set({'list': []}, () => {
            console.log("Initializing list...");
        });
    }

    if(!chrome.storage.sync.get(['archive'], () => {})) {
        chrome.storage.sync.set({'archive': []}, () => {
            console.log("Initializing archive...");
        });
    }

    if(!chrome.storage.sync.get(['colors'], () => {})) {
        chrome.storage.sync.set({'colors': []}, () => {
            console.log("Initializing colors...");
        });
    }

    if(!chrome.storage.sync.get(['archiveColors'], () => {})) {
        chrome.storage.sync.set({'archiveColors': []}, () => {
            console.log("Initializing archiveColors...");
        });
    }

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log("Message received: " + request.msg);
    });
});
