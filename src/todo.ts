let list = [];
let archive = [];

let init = () => {
    chrome.storage.sync.get('list', (e) => {
        list = e.list;
        console.log("Loaded existing list: " + list);
        chrome.runtime.sendMessage({msg: "newtab"});
        update();
    });
    
    chrome.storage.sync.get('archive', (e) => {
        archive = e.archive;
        console.log("Loaded existing archive: " + archive);
        chrome.runtime.sendMessage({msg: "newtab"});
    });

    chrome.storage.sync.get('archiveColors', (e) => {
        let archiveColors = e.archiveColors;
        console.log("Loaded existing archiveColors: " + archiveColors);
        chrome.runtime.sendMessage({msg: "newtab"});

        if(archiveColors.length > 0) {
            let primary = <HTMLElement>document.getElementById("input-div");
            let secondary = <HTMLElement>document.getElementById("advanced-btn");
            let accent = <HTMLElement>document.getElementById("undo-btn");
            primary.style.backgroundColor = archiveColors[0][0];
            secondary.style.backgroundColor = archiveColors[0][1];
            accent.style.backgroundColor = archiveColors[0][2];
        }
    });
}

export class TodoItem {
    text;
    dated;
    date;
    constructor(text, dated) {
        this.text = text;
        this.dated = dated;
    }
}

let newItem = () => {
    let item = (<HTMLInputElement>document.getElementById("input")).value;
    if(item.length != 0) {
        let newItem = new TodoItem(item, false);
        if(!(<HTMLInputElement>document.getElementById("date")).value) {
            newItem.dated = false;
        } else {
            newItem.dated = true;
            newItem.date = (<HTMLInputElement>document.getElementById("date")).value;
        }
        list[list.length] = newItem;
        update();
    }
}

document.body.onkeyup = function (e) {
    if(e.keyCode == 13) {
        // if enter key released adds content of input to todo-list
        newItem();
    }
}

// TODO: add to archived items list so you can undo 
let removeItem = (e) => {
    // chrome.runtime.sendMessage({message: "remove", item: e.target.value});
    // mapping to array of text properties from TodoItem array
    if(e.target.className === "li") {
        let target = e.target.childNodes[0];
        const index = list.map((elem) => elem.text).indexOf(target.innerHTML);
        console.log("Removed: { " + list[index].text + " }");
        archive[archive.length] = list[index];
        list.splice(index, 1);
        e.target.parentElement.removeChild(e.target);
        update();
    } else if(e.target.id === "text") {
        let target = e.target;
        const index = list.map((elem) => elem.text).indexOf(target.innerHTML);
        console.log("Removed: { " + list[index].text + " }");
        archive[archive.length] = list[index];
        list.splice(index, 1);
        e.target.parentElement.parentElement.removeChild(e.target.parentElement);
        update();
    } else if(e.target.className === "date") {
        let target = e.target.parentElement.childNodes[0];
        const index = list.map((elem) => elem.text).indexOf(target.innerHTML);
        console.log("Removed: { " + list[index].text + " }");
        archive[archive.length] = list[index];
        list.splice(index, 1);
        e.target.parentElement.parentElement.removeChild(e.target.parentElement);
        update();
    }
    chrome.storage.sync.set({'archive': archive}, () => {
        console.log("Updating Archive...");
    });
}

let undoRemove = () => {
    if(archive.length > 0) {
        let undo = archive.pop();
        chrome.storage.sync.set({'archive': archive}, () => {
            console.log("Updating Archive...");
        });
        list[list.length] = undo;
        update();
    }
}

let update = () => {
    chrome.storage.sync.set({'list': list}, () => {
        console.log("Updating List...");
    });

    // add undo onclick
    document.getElementById("undo-btn").onclick = undoRemove;

    // grabs ul element from DOM
    let ul = document.getElementById("list");
    ul.innerHTML = "";
    // loops over each index of the todo-list
    list.map((e) => {
        // creates li for each item
        let item = e.text;
        let li = document.createElement("li");

        let text = document.createElement("short");
        text.innerHTML = item;
        text.id = "text";
        li.appendChild(text);
        if(e.dated) {
            let date = document.createElement("short");
            date.innerHTML = e.date;
            date.className = "date";
            li.appendChild(date);
        }
        ul.appendChild(li);
        li.className = "li";
        // clears user input
        (<HTMLInputElement>document.getElementById("input")).value = "";
        // adds onclick property for removal
        li.onclick = removeItem;
        return e;
    });

}

init();