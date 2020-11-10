// Inject extension script to access page's JS execution context
const script = document.createElement("script");
script.src = chrome.runtime.getURL("extension.js");
script.onload = function () {
  this.remove();
};
document.head.appendChild(script);
