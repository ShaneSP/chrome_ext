!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});let o=[],r=[];class l{constructor(e,t){this.text=e,this.dated=t}}t.TodoItem=l;document.body.onkeyup=function(e){13==e.keyCode&&(()=>{let e=document.getElementById("input").value;if(0!=e.length){let t=new l(e,!1);document.getElementById("date").value?(t.dated=!0,t.date=document.getElementById("date").value):t.dated=!1,o[o.length]=t,d()}})()};let a=e=>{if("li"===e.target.className){let t=e.target.childNodes[0];const n=o.map(e=>e.text).indexOf(t.innerHTML);console.log("Removed: { "+o[n].text+" }"),r[r.length]=o[n],o.splice(n,1),e.target.parentElement.removeChild(e.target),d()}else if("text"===e.target.id){let t=e.target;const n=o.map(e=>e.text).indexOf(t.innerHTML);console.log("Removed: { "+o[n].text+" }"),r[r.length]=o[n],o.splice(n,1),e.target.parentElement.parentElement.removeChild(e.target.parentElement),d()}else if("date"===e.target.className){let t=e.target.parentElement.childNodes[0];const n=o.map(e=>e.text).indexOf(t.innerHTML);console.log("Removed: { "+o[n].text+" }"),r[r.length]=o[n],o.splice(n,1),e.target.parentElement.parentElement.removeChild(e.target.parentElement),d()}chrome.storage.sync.set({archive:r},()=>{console.log("Updating Archive...")})},c=()=>{if(r.length>0){let e=r.pop();chrome.storage.sync.set({archive:r},()=>{console.log("Updating Archive...")}),o[o.length]=e,d()}},d=()=>{chrome.storage.sync.set({list:o},()=>{console.log("Updating List...")}),document.getElementById("undo-btn").onclick=c;let e=document.getElementById("list");e.innerHTML="",o.map(t=>{let n=t.text,o=document.createElement("li"),r=document.createElement("short");if(r.innerHTML=n,r.id="text",o.appendChild(r),t.dated){let e=document.createElement("short");e.innerHTML=t.date,e.className="date",o.appendChild(e)}return e.appendChild(o),o.className="li",document.getElementById("input").value="",o.onclick=a,t})};chrome.storage.sync.get("list",e=>{o=e.list,console.log("Loaded existing list: "+o),chrome.runtime.sendMessage({msg:"newtab"}),d()}),chrome.storage.sync.get("archive",e=>{r=e.archive,console.log("Loaded existing archive: "+r),chrome.runtime.sendMessage({msg:"newtab"})}),chrome.storage.sync.get("archiveColors",e=>{let t=e.archiveColors;if(console.log("Loaded existing archiveColors: "+t),chrome.runtime.sendMessage({msg:"newtab"}),t.length>0){let e=document.getElementById("input-div"),n=document.getElementById("advanced-btn"),o=document.getElementById("undo-btn");e.style.backgroundColor=t[0][0],n.style.backgroundColor=t[0][1],o.style.backgroundColor=t[0][2]}})}]);