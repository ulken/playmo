parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"IAgR":[function(require,module,exports) {
var s=1e3,e=60*s,r=60*e,a=24*r,n=7*a,c=365.25*a;function t(t){if(!((t=String(t)).length>100)){var u=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(u){var i=parseFloat(u[1]);switch((u[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return i*c;case"weeks":case"week":case"w":return i*n;case"days":case"day":case"d":return i*a;case"hours":case"hour":case"hrs":case"hr":case"h":return i*r;case"minutes":case"minute":case"mins":case"min":case"m":return i*e;case"seconds":case"second":case"secs":case"sec":case"s":return i*s;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return i;default:return}}}}function u(n){var c=Math.abs(n);return c>=a?Math.round(n/a)+"d":c>=r?Math.round(n/r)+"h":c>=e?Math.round(n/e)+"m":c>=s?Math.round(n/s)+"s":n+"ms"}function i(n){var c=Math.abs(n);return c>=a?o(n,c,a,"day"):c>=r?o(n,c,r,"hour"):c>=e?o(n,c,e,"minute"):c>=s?o(n,c,s,"second"):n+" ms"}function o(s,e,r,a){var n=e>=1.5*r;return Math.round(s/r)+" "+a+(n?"s":"")}module.exports=function(s,e){e=e||{};var r=typeof s;if("string"===r&&s.length>0)return t(s);if("number"===r&&isFinite(s))return e.long?i(s):u(s);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(s))};
},{}],"Kest":[function(require,module,exports) {
function e(e){function n(e){let n=0;for(let t=0;t<e.length;t++)n=(n<<5)-n+e.charCodeAt(t),n|=0;return t.colors[Math.abs(n)%t.colors.length]}function t(e){let o;function i(...e){if(!i.enabled)return;const n=i,s=Number(new Date),r=s-(o||s);n.diff=r,n.prev=o,n.curr=s,o=s,e[0]=t.coerce(e[0]),"string"!=typeof e[0]&&e.unshift("%O");let a=0;e[0]=e[0].replace(/%([a-zA-Z%])/g,(s,r)=>{if("%%"===s)return s;a++;const o=t.formatters[r];if("function"==typeof o){const t=e[a];s=o.call(n,t),e.splice(a,1),a--}return s}),t.formatArgs.call(n,e),(n.log||t.log).apply(n,e)}return i.namespace=e,i.enabled=t.enabled(e),i.useColors=t.useColors(),i.color=n(e),i.destroy=s,i.extend=r,"function"==typeof t.init&&t.init(i),t.instances.push(i),i}function s(){const e=t.instances.indexOf(this);return-1!==e&&(t.instances.splice(e,1),!0)}function r(e,n){const s=t(this.namespace+(void 0===n?":":n)+e);return s.log=this.log,s}function o(e){return e.toString().substring(2,e.toString().length-2).replace(/\.\*\?$/,"*")}return t.debug=t,t.default=t,t.coerce=function(e){if(e instanceof Error)return e.stack||e.message;return e},t.disable=function(){const e=[...t.names.map(o),...t.skips.map(o).map(e=>"-"+e)].join(",");return t.enable(""),e},t.enable=function(e){let n;t.save(e),t.names=[],t.skips=[];const s=("string"==typeof e?e:"").split(/[\s,]+/),r=s.length;for(n=0;n<r;n++)s[n]&&("-"===(e=s[n].replace(/\*/g,".*?"))[0]?t.skips.push(new RegExp("^"+e.substr(1)+"$")):t.names.push(new RegExp("^"+e+"$")));for(n=0;n<t.instances.length;n++){const e=t.instances[n];e.enabled=t.enabled(e.namespace)}},t.enabled=function(e){if("*"===e[e.length-1])return!0;let n,s;for(n=0,s=t.skips.length;n<s;n++)if(t.skips[n].test(e))return!1;for(n=0,s=t.names.length;n<s;n++)if(t.names[n].test(e))return!0;return!1},t.humanize=require("ms"),Object.keys(e).forEach(n=>{t[n]=e[n]}),t.instances=[],t.names=[],t.skips=[],t.formatters={},t.selectColor=n,t.enable(t.load()),t}module.exports=e;
},{"ms":"IAgR"}],"pBGv":[function(require,module,exports) {

var t,e,n=module.exports={};function r(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function i(e){if(t===setTimeout)return setTimeout(e,0);if((t===r||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(n){try{return t.call(null,e,0)}catch(n){return t.call(this,e,0)}}}function u(t){if(e===clearTimeout)return clearTimeout(t);if((e===o||!e)&&clearTimeout)return e=clearTimeout,clearTimeout(t);try{return e(t)}catch(n){try{return e.call(null,t)}catch(n){return e.call(this,t)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:r}catch(n){t=r}try{e="function"==typeof clearTimeout?clearTimeout:o}catch(n){e=o}}();var c,s=[],l=!1,a=-1;function f(){l&&c&&(l=!1,c.length?s=c.concat(s):a=-1,s.length&&h())}function h(){if(!l){var t=i(f);l=!0;for(var e=s.length;e;){for(c=s,s=[];++a<e;)c&&c[a].run();a=-1,e=s.length}c=null,l=!1,u(t)}}function m(t,e){this.fun=t,this.array=e}function p(){}n.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];s.push(new m(t,e)),1!==s.length||l||i(h)},m.prototype.run=function(){this.fun.apply(null,this.array)},n.title="browser",n.env={},n.argv=[],n.version="",n.versions={},n.on=p,n.addListener=p,n.once=p,n.off=p,n.removeListener=p,n.removeAllListeners=p,n.emit=p,n.prependListener=p,n.prependOnceListener=p,n.listeners=function(t){return[]},n.binding=function(t){throw new Error("process.binding is not supported")},n.cwd=function(){return"/"},n.chdir=function(t){throw new Error("process.chdir is not supported")},n.umask=function(){return 0};
},{}],"jcLW":[function(require,module,exports) {
var process = require("process");
var e=require("process");function o(){return!("undefined"==typeof window||!window.process||"renderer"!==window.process.type&&!window.process.__nwjs)||("undefined"==typeof navigator||!navigator.userAgent||!navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))&&("undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))}function C(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+module.exports.humanize(this.diff),!this.useColors)return;const o="color: "+this.color;e.splice(1,0,o,"color: inherit");let C=0,t=0;e[0].replace(/%[a-zA-Z%]/g,e=>{"%%"!==e&&(C++,"%c"===e&&(t=C))}),e.splice(t,0,o)}function t(...e){return"object"==typeof console&&console.log&&console.log(...e)}function r(e){try{e?exports.storage.setItem("debug",e):exports.storage.removeItem("debug")}catch(o){}}function n(){let o;try{o=exports.storage.getItem("debug")}catch(C){}return!o&&void 0!==e&&"env"in e&&(o=void 0),o}function s(){try{return localStorage}catch(e){}}exports.log=t,exports.formatArgs=C,exports.save=r,exports.load=n,exports.useColors=o,exports.storage=s(),exports.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],module.exports=require("./common")(exports);const{formatters:F}=module.exports;F.j=function(e){try{return JSON.stringify(e)}catch(o){return"[UnexpectedJSONParseError]: "+o.message}};
},{"./common":"Kest","process":"pBGv"}],"Sn5z":[function(require,module,exports) {
"use strict";function e(e){return{all:e=e||new Map,on:function(t,n){var i=e.get(t);i&&i.push(n)||e.set(t,[n])},off:function(t,n){var i=e.get(t);i&&i.splice(i.indexOf(n)>>>0,1)},emit:function(t,n){(e.get(t)||[]).slice().map(function(e){e(n)}),(e.get("*")||[]).slice().map(function(e){e(t,n)})}}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],"tCYT":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=t(require("mitt"));function t(e){return e&&e.__esModule?e:{default:e}}function o({selector:t}){const{on:o,emit:r}=(0,e.default)(),n=new IntersectionObserver(e=>{for(const{intersectionRatio:t,target:o}of e)r(t>0?"elementVisible":"elementInvisible",o)});return new MutationObserver(e=>{for(const{addedNodes:o,removedNodes:s}of e){for(const e of Array.from(o))e.matches&&e.matches(t)&&(r("elementAdded",e),n.observe(e));for(const e of Array.from(s))e.matches&&e.matches(t)&&(r("elementRemoved",e),n.unobserve(e))}}).observe(document.documentElement,{childList:!0,subtree:!0}),{on:o,observe:function(e){n.observe(e)}}}var r=o;exports.default=r;
},{"mitt":"Sn5z"}],"lVhV":[function(require,module,exports) {
"use strict";function e(e,t){let l=null;return(...u)=>{l||(e.apply(this,u),l=setTimeout(()=>{l=null},t))}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],"SW0n":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=Object.freeze(Object.fromEntries(["Space","MediaPlayPause","Enter","ArrowLeft","ArrowRight","ArrowUp","ArrowDown","KeyM","KeyF","Escape"].map(e=>[e,e])));exports.default=e;
},{}],"dbNv":[function(require,module,exports) {
"use strict";function e(e,n=""){const{type:f,code:p}=e,u=n?`: ${n}`:n,c=t(p)&&r(e,p)?"":i(p),y=o(e);return`${c&&y?`${y} + `:y}${c} ${s(f)}${u}`}function t(e){return["control","alt","shift","meta"].some(t=>e.toLowerCase().startsWith(t))}function r(e,t){return!0===e[f(t)]}function o({ctrlKey:e,altKey:t,shiftKey:r,metaKey:o}){return Object.entries({ControlLeft:e,AltLeft:t,ShiftLeft:r,MetaLeft:o}).filter(([e,t])=>t).map(([e,t])=>i(e)).join(" + ")}function n(e){return`❲ ${e} ❳`}function i(e){return n({Space:"␣",ArrowLeft:"◀️",ArrowRight:"▶️",ArrowUp:"🔼",ArrowDown:"🔽",ControlLeft:"ctrl",ShiftLeft:"⇧",MetaLeft:"⌘",AltLeft:"⌥",Escape:"⎋"}[e]||e.replace("Key",""))}function s(e){return{keyup:"released",keydown:"pressed down"}[e]||e}function f(e){return(e=>`${e[0].toLowerCase()}${e.substring(1)}`)(e.replace("Left","Key").replace("Control","Ctrl"))}Object.defineProperty(exports,"__esModule",{value:!0}),exports.prettifyKeyboardEvent=e,exports.glyphifyKeyCode=i,exports.humanizeKeyEventType=s,exports.keyify=n,exports.isModifierKey=t,exports.isModifierPressed=r,exports.stringifyModifiers=o;
},{}],"q0X0":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=i;var e=a(require("debug")),t=a(require("./utils/throttle")),n=a(require("./utils/key-codes")),r=require("./utils/pretty-print");function a(e){return e&&e.__esModule?e:{default:e}}const o=(0,e.default)("playmo:kbd"),u=100;function i({video:e}){const a={keydown:{[n.default.ArrowLeft]:(0,t.default)(function({altKey:t,shiftKey:n}){t?(o("decreasing playback rate"),e.decreasePlaybackRate()):(o(`rewinding [fast=${n}]`),e.rewind({fast:n}))},u),[n.default.ArrowRight]:(0,t.default)(function({altKey:t,shiftKey:n}){t?(o("increasing playback rate"),e.increasePlaybackRate()):(o(`fast forwarding [fast=${n}]`),e.fastForward({fast:n}))},u),[n.default.ArrowUp]:(0,t.default)(function(){o("volume up"),e.volumeUp()},u),[n.default.ArrowDown]:(0,t.default)(function(){o("volume down"),e.volumeDown()},u)},keyup:{[n.default.Space]:function(){f()},[n.default.MediaPlayPause]:function(){f()},[n.default.Enter]:function({altKey:t}){t&&(o("resetting playback rate"),e.resetPlaybackRate())},[n.default.KeyM]:function(){const t=e.isMuted();o(`toggling muted state: ${t} -> ${!t}`),e.toggleMute()},[n.default.KeyF]:function(){const t=e.isFullscreen()?"fullscreen -> windowed":"windowed -> fullscreen";o(`toggling fullscreen state: ${t}`),e.toggleFullscreen()},[n.default.Escape]:function(){e.isFullscreen()&&(o("exiting fullscreen mode"),e.exitFullscreen())}}},i=Object.freeze({eventHandled:!1}),d={...i};return{registerListeners:function(){for(const e of Object.keys(a))document.addEventListener(e,c);document.addEventListener("keydown",s),document.addEventListener("keyup",l),e.registerListeners()},unregisterListeners:function(){for(const e of Object.keys(a))document.removeEventListener(e,c);document.removeEventListener("keydown",s),document.removeEventListener("keyup",l),e.unregisterListeners()}};function s(e){e.target.isSameNode(document.body)&&e.code===n.default.Space&&(o((0,r.prettifyKeyboardEvent)(e,"preventing spacebar from scrolling page")),e.preventDefault())}function l(){for(const[e,t]of Object.entries(i))d[e]=t}function c(t){const{type:n,code:u}=t;if(o((0,r.prettifyKeyboardEvent)(t)),e.hasStateChanged()&&(d.eventHandled=!0),d.eventHandled)return void o((0,r.prettifyKeyboardEvent)(t,"event already handled"));const i=a[n][u];i&&(o((0,r.prettifyKeyboardEvent)(t,"handling event")),t.preventDefault(),i(t))}function f(){const t=e.isPlaying();o(`toggling play state: ${t} -> ${!t}`),e.togglePlayState()}}
},{"debug":"jcLW","./utils/throttle":"lVhV","./utils/key-codes":"SW0n","./utils/pretty-print":"dbNv"}],"kyoZ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=n;var e=t(require("./utils/throttle"));function t(e){return e&&e.__esModule?e:{default:e}}function n({element:t}){if(!t||"VIDEO"===!t.tagName)throw new Error("video element required");const n={Default:10,Fast:60},u={Min:0,Max:1,Step:.1},r={Min:.0625,Max:16,Step:.1,Default:1},a=["paused","currentTime","volume","muted","playbackRate","fullscreen"],o=["play","pause","playing","ended","volumechange","ratechange"],i=function(e,{properties:t}){return Object.fromEntries(t.map(t=>[t,p(e,t)]))}(t,{properties:a});const c=(0,e.default)(d,100);return{isPlaying:l,isMuted:function(){return t.muted},isFullscreen:f,togglePlayState:s(function(){l()?t.pause():t.play()}),fastForward:s(function({fast:e}){M(v()+g({fast:e}))}),rewind:s(function({fast:e}){M(v()-g({fast:e}))}),volumeUp:s(function(){y(Math.min(h()+u.Step,u.Max))}),volumeDown:s(function(){y(Math.max(h()-u.Step,u.Min))}),toggleMute:s(function(){t.muted=!t.muted}),increasePlaybackRate:s(function(){b(Math.min(E()+r.Step,r.Max))}),decreasePlaybackRate:s(function(){b(Math.max(E()-r.Step,r.Min))}),resetPlaybackRate:s(function(){b(r.Default)}),toggleFullscreen:s(function(){f()?m():t.requestFullscreen()}),exitFullscreen:s(m),hasStateChanged:function(){return Object.entries(i).some(([e,n])=>{const u=p(t,e);return"currentTime"===e?Math.abs(u-n)>1:u!==n})},registerListeners:function(){document.addEventListener("fullscreenchange",d);for(const e of o)t.addEventListener(e,d);t.addEventListener("timeupdate",c)},unregisterListeners:function(){document.removeEventListener("fullscreenchange",d);for(const e of o)t.removeEventListener(e,d);t.removeEventListener("timeupdate",c)}};function s(e){return(...t)=>{e(...t),d()}}function l(){return!t.paused}function f(){return null!==document.fullscreenElement&&document.fullscreenElement.isSameNode(t)}function m(){document.exitFullscreen()}function d(){for(const e of a)i[e]=p(t,e)}function p(e,t){return"fullscreen"===t?f():e[t]}function v(){return t.currentTime}function M(e){t.currentTime=e}function g({fast:e}){return e?n.Fast:n.Default}function h(){return t.volume}function y(e){t.volume=e}function E(){return t.playbackRate}function b(e){t.playbackRate=e}}
},{"./utils/throttle":"lVhV"}],"nDAa":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=t(require("debug"));function t(e){return e&&e.__esModule?e:{default:e}}const o=(0,e.default)("playmo:auto-player");function n({observer:e}){const t=new WeakMap;return e.on("elementVisible",function(e){const n=t.get(e),{autoPaused:a,controller:u}=n;a&&!u.isPlaying()&&(o("auto-resuming video",e),u.togglePlayState(),t.set(e,{...n,autoPaused:!1}))}),e.on("elementInvisible",function(e){const n=t.get(e),{controller:a}=n;a.isPlaying()&&(o("auto-pausing video",e),a.togglePlayState(),t.set(e,{...n,autoPaused:!0}))}),{track:function(e,{controller:n}){o("tracking element",e),t.set(e,{autoPaused:!1,controller:n})},untrack:function(e){o("untracking element",e),t.delete(e)}}}var a=n;exports.default=a;
},{"debug":"jcLW"}],"hZBy":[function(require,module,exports) {
"use strict";function e(e,t){return new Promise(n=>{e.addEventListener(t,n)})}Object.defineProperty(exports,"__esModule",{value:!0}),exports.onEvent=e;
},{}],"Focm":[function(require,module,exports) {
"use strict";var e=i(require("debug")),t=i(require("./element-observer")),n=i(require("./keyboard-shortcuts")),r=i(require("./video-controller")),o=i(require("./auto-player")),l=require("./utils/dom");function i(e){return e&&e.__esModule?e:{default:e}}const d=(0,e.default)("playmo:main");async function s(e){if(e.readyState===HTMLVideoElement.HAVE_METADATA)return Promise.resolve();await(0,l.onEvent)(e,"loadedmetadata")}!async function(){d("extension loaded");const e=new WeakMap,l=(0,t.default)({selector:"video"}),i=(0,o.default)({observer:l}),a=t=>{const o=(0,r.default)({element:t});e.set(t,(0,n.default)({video:o})),i.track(t,{controller:o})};l.on("elementAdded",e=>{d("element added",e),a(e)}),l.on("elementVisible",async t=>{d("element visible",t),await s(t),d("video loaded",t),e.get(t).registerListeners()}),l.on("elementInvisible",t=>{d("element invisible",t),e.get(t).unregisterListeners()}),l.on("elementRemoved",t=>{var n;d("element removed",t),i.untrack(t),null===(n=e.get(t))||void 0===n||n.unregisterListeners(),e.delete(t)});for(const t of document.querySelectorAll("video"))d("element found",t),a(t),l.observe(t)}();
},{"debug":"jcLW","./element-observer":"tCYT","./keyboard-shortcuts":"q0X0","./video-controller":"kyoZ","./auto-player":"nDAa","./utils/dom":"hZBy"}]},{},["Focm"], null)
//# sourceMappingURL=/index.js.map