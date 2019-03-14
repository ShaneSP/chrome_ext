import { TodoItem } from "./todo";

let addButton = document.getElementById('submit');
let submit: HTMLInputElement = document.getElementById("input") as HTMLInputElement;
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
    if(submit.value.length != 0) {
        var item = new TodoItem(submit.value, false);
        list[list.length] = item;
        submit.value = "";
        chrome.storage.sync.set({'list': list}, () => {
            console.log("Updating List...");
        });
    }
}