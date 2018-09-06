var list = [];
chrome.storage.local.get('list', (e) => {
    list = e.list;
    console.log("Loaded existing list: " + list);
});

function newItem() {
    var item = document.getElementById("input").value;
    list[list.length] = item;
    update();
}

document.body.onkeyup = function (e) {
    if(e.keyCode == 13) {
        newItem();
    }
}

function removeItem(e) {
    //chrome.runtime.sendMessage({message: "remove", item: e.target.value});
    const index = list.indexOf(e.target.innerHTML);
    console.log("Removed: " + list[index]);
    list.splice(list, index);
    e.target.parentElement.removeChild(e.target);
    update();
}

function update() {
    chrome.storage.local.set({'list': list}, () => {
        console.log("Updating List...");
    });
    var ul = document.getElementById("list");
    ul.innerHTML = "";
    list.forEach((e) => {
        var item = e;
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(item));
        ul.appendChild(li);
        document.getElementById("input").value = "";
        li.onclick = removeItem;
    });

}

