var list = [];
chrome.storage.sync.get('list', (e) => {
    list = e.list;
    console.log("Loaded existing list: " + list);
    chrome.runtime.sendMessage({msg: "newtab"});
    update();
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
    list.splice(index, 1);
    e.target.parentElement.removeChild(e.target);
    update();
}

function update() {
    chrome.storage.sync.set({'list': list}, () => {
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

