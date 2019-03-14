let primary: HTMLInputElement = document.getElementById('primary') as HTMLInputElement;
let segundo: HTMLInputElement = document.getElementById('secondary') as HTMLInputElement;
let accent: HTMLInputElement = document.getElementById('accent') as HTMLInputElement;
let saveButton: HTMLButtonElement = document.getElementById('save') as HTMLButtonElement;

let colorMap = [primary, segundo, accent];
let colors = ["#7acfd6","#6BB5BB","#e0474c"];
let archiveColors = [];

// export class ColorScheme {
//   name: string;
//   colors: string[];

//   constructor(colors: string[]) {
//     colors.map((e) => {
//       this.colors[this.colors.length] = e;
//     });
//   }
// }

let init = () => {
  chrome.storage.sync.get('colors', (e) => {
    colors = e.colors;
    console.log("Loaded existing colors: " + colors);
    chrome.runtime.sendMessage({msg: "get colors"});
    update();
  });
  
  chrome.storage.sync.get('archiveColors', (e) => {
    archiveColors = e.archiveColors;
    console.log("Loaded existing list: " + archiveColors);
    chrome.runtime.sendMessage({msg: "get archiveColors"});
  });

  colorMap.map((item) => {
    item.addEventListener('input', update, false);
  });
  saveButton.onclick = saveScheme;
  update();
}

// Updates respective chrome.storage
export let update = () => {
  colors[0] = colorMap[0].value;
  colors[1] = colorMap[1].value;
  colors[2] = colorMap[2].value;

  chrome.storage.sync.set({'colors': colors}, () => {
    console.log("Updating Colors...");
  });
}
  
export let saveScheme = () => {
  let scheme = [];
  scheme[0] = colors[0];
  scheme[1] = colors[1];
  scheme[2] = colors[2];

  archiveColors[0] = scheme;
  chrome.storage.sync.set({'archiveColors': archiveColors}, () => {
    console.log("Updating archiveColors...");
  });
}
  
init();