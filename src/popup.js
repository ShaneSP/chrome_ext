let addButton = document.getElementById('submit');
let submit = document.getElementById("input");
let list = [];
chrome.storage.sync.get('list', (e) => {
    list = e.list;
    console.log("Loaded existing list: " + list);
    chrome.runtime.sendMessage({msg: "popup"});
});

addButton.onclick = (e) => {
    newItem();
}

document.body.onkeyup = function (e) {
    if(e.keyCode == 13) {
        newItem();
    }
}

function newItem() {
    if(submit.value != "") {
        var item = submit.value;
        list[list.length] = item;
        submit.value = "";
        chrome.storage.sync.set({'list': list}, () => {
            console.log("Updating List...");
        });
    }
}