// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/ms/index.js":[function(require,module,exports) {
/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}

},{}],"../node_modules/debug/src/common.js":[function(require,module,exports) {

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = require('ms');

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* Active `debug` instances.
	*/
	createDebug.instances = [];

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return match;
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.enabled = createDebug.enabled(namespace);
		debug.useColors = createDebug.useColors();
		debug.color = selectColor(namespace);
		debug.destroy = destroy;
		debug.extend = extend;
		// Debug.formatArgs = formatArgs;
		// debug.rawLog = rawLog;

		// env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		createDebug.instances.push(debug);

		return debug;
	}

	function destroy() {
		const index = createDebug.instances.indexOf(this);
		if (index !== -1) {
			createDebug.instances.splice(index, 1);
			return true;
		}
		return false;
	}

	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);

		createDebug.names = [];
		createDebug.skips = [];

		let i;
		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
		const len = split.length;

		for (i = 0; i < len; i++) {
			if (!split[i]) {
				// ignore empty strings
				continue;
			}

			namespaces = split[i].replace(/\*/g, '.*?');

			if (namespaces[0] === '-') {
				createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
			} else {
				createDebug.names.push(new RegExp('^' + namespaces + '$'));
			}
		}

		for (i = 0; i < createDebug.instances.length; i++) {
			const instance = createDebug.instances[i];
			instance.enabled = createDebug.enabled(instance.namespace);
		}
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names.map(toNamespace),
			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
	}

	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		if (name[name.length - 1] === '*') {
			return true;
		}

		let i;
		let len;

		for (i = 0, len = createDebug.skips.length; i < len; i++) {
			if (createDebug.skips[i].test(name)) {
				return false;
			}
		}

		for (i = 0, len = createDebug.names.length; i < len; i++) {
			if (createDebug.names[i].test(name)) {
				return true;
			}
		}

		return false;
	}

	/**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/
	function toNamespace(regexp) {
		return regexp.toString()
			.substring(2, regexp.toString().length - 2)
			.replace(/\.\*\?$/, '*');
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

module.exports = setup;

},{"ms":"../node_modules/ms/index.js"}],"../node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"../node_modules/debug/src/browser.js":[function(require,module,exports) {
var process = require("process");
/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
/**
 * Colors.
 */

exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];
/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */
// eslint-disable-next-line complexity

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
    return true;
  } // Internet Explorer and Edge do not support colors.


  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  } // Is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632


  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
  typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}
/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */


function formatArgs(args) {
  args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);

  if (!this.useColors) {
    return;
  }

  const c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit'); // The final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into

  let index = 0;
  let lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, match => {
    if (match === '%%') {
      return;
    }

    index++;

    if (match === '%c') {
      // We only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });
  args.splice(lastC, 0, c);
}
/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */


function log(...args) {
  // This hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return typeof console === 'object' && console.log && console.log(...args);
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */


function save(namespaces) {
  try {
    if (namespaces) {
      exports.storage.setItem('debug', namespaces);
    } else {
      exports.storage.removeItem('debug');
    }
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */


function load() {
  let r;

  try {
    r = exports.storage.getItem('debug');
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  } // If debug isn't set in LS, and we're in Electron, try to load $DEBUG


  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = undefined;
  }

  return r;
}
/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */


function localstorage() {
  try {
    // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
    // The Browser also has localStorage in the global context.
    return localStorage;
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  }
}

module.exports = require('./common')(exports);
const {
  formatters
} = module.exports;
/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
  try {
    return JSON.stringify(v);
  } catch (error) {
    return '[UnexpectedJSONParseError]: ' + error.message;
  }
};
},{"./common":"../node_modules/debug/src/common.js","process":"../node_modules/process/browser.js"}],"utils/dom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onEvent = onEvent;

function onEvent(element, eventName) {
  return new Promise(resolve => {
    element.addEventListener(eventName, resolve);
  });
}
},{}],"../node_modules/mitt/dist/mitt.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(n) {
  return {
    all: n = n || new Map(),
    on: function (t, e) {
      var i = n.get(t);
      i && i.push(e) || n.set(t, [e]);
    },
    off: function (t, e) {
      var i = n.get(t);
      i && i.splice(i.indexOf(e) >>> 0, 1);
    },
    emit: function (t, e) {
      (n.get(t) || []).slice().map(function (n) {
        n(e);
      }), (n.get("*") || []).slice().map(function (n) {
        n(t, e);
      });
    }
  };
}
},{}],"element-observer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mitt = _interopRequireDefault(require("mitt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ElementObserver({
  selector
}) {
  const {
    on,
    emit
  } = (0, _mitt.default)();
  const intersectionObserver = new IntersectionObserver(entries => {
    for (const {
      intersectionRatio,
      target: element
    } of entries) {
      if (intersectionRatio > 0) {
        emit("elementVisible", element);
      } else {
        emit("elementInvisible", element);
      }
    }
  });
  const mutationObserver = new MutationObserver(mutations => {
    for (const {
      addedNodes,
      removedNodes
    } of mutations) {
      for (const element of Array.from(addedNodes)) {
        if (element.matches && element.matches(selector)) {
          emit("elementAdded", element);
          intersectionObserver.observe(element);
        }
      }

      for (const element of Array.from(removedNodes)) {
        if (element.matches && element.matches(selector)) {
          emit("elementRemoved", element);
          intersectionObserver.unobserve(element);
        }
      }
    }
  });
  mutationObserver.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
  return {
    on,
    observe: intersectionObserver.observe
  };
}

var _default = ElementObserver;
exports.default = _default;
},{"mitt":"../node_modules/mitt/dist/mitt.es.js"}],"utils/throttle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = throttle;

function throttle(task, delay) {
  let timeoutId = null;
  return (...parameters) => {
    if (timeoutId) {
      return;
    }

    task.apply(this, parameters);
    timeoutId = setTimeout(() => {
      timeoutId = null;
    }, delay);
  };
}
},{}],"utils/key-codes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = Object.freeze(Object.fromEntries(["Space", "MediaPlayPause", "Enter", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "KeyM", "KeyF", "Escape"].map(k => [k, k])));

exports.default = _default;
},{}],"utils/pretty-print.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prettifyKeyboardEvent = prettifyKeyboardEvent;
exports.glyphifyKeyCode = glyphifyKeyCode;
exports.humanizeKeyEventType = humanizeKeyEventType;
exports.keyify = keyify;
exports.isModifierKey = isModifierKey;
exports.isModifierPressed = isModifierPressed;
exports.stringifyModifiers = stringifyModifiers;

function prettifyKeyboardEvent(event, message = "") {
  const {
    type,
    code
  } = event;
  const prefixedMessage = message ? `: ${message}` : message;
  const glyph = isModifierKey(code) && isModifierPressed(event, code) ? "" : glyphifyKeyCode(code);
  const modifiers = stringifyModifiers(event);
  const prefixedModifiers = glyph && modifiers ? `${modifiers} + ` : modifiers;
  return `${prefixedModifiers}${glyph} ${humanizeKeyEventType(type)}${prefixedMessage}`;
}

function isModifierKey(keyCode) {
  return ["control", "alt", "shift", "meta"].some(m => keyCode.toLowerCase().startsWith(m));
}

function isModifierPressed(event, keyCode) {
  const modifier = convertModifierKeyCodeToPressedProperty(keyCode);
  return event[modifier] === true;
}

function stringifyModifiers({
  ctrlKey: ControlLeft,
  altKey: AltLeft,
  shiftKey: ShiftLeft,
  metaKey: MetaLeft
}) {
  return Object.entries({
    ControlLeft,
    AltLeft,
    ShiftLeft,
    MetaLeft
  }).filter(([k, v]) => v).map(([k, v]) => glyphifyKeyCode(k)).join(" + ");
}

function keyify(key) {
  return `❲ ${key} ❳`;
}

function glyphifyKeyCode(code) {
  return keyify({
    Space: "␣",
    ArrowLeft: "◀️",
    ArrowRight: "▶️",
    ArrowUp: "🔼",
    ArrowDown: "🔽",
    ControlLeft: "ctrl",
    ShiftLeft: "⇧",
    MetaLeft: "⌘",
    AltLeft: "⌥",
    Escape: "⎋"
  }[code] || code.replace("Key", ""));
}

function humanizeKeyEventType(type) {
  return {
    keyup: "released",
    keydown: "pressed down"
  }[type] || type;
}

function convertModifierKeyCodeToPressedProperty(keyCode) {
  const toCamelCase = text => `${text[0].toLowerCase()}${text.substring(1)}`;

  const modifier = keyCode.replace("Left", "Key").replace("Control", "Ctrl");
  return toCamelCase(modifier);
}
},{}],"keyboard-shortcuts.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = KeyboardShortcuts;

var _debug = _interopRequireDefault(require("debug"));

var _throttle = _interopRequireDefault(require("./utils/throttle"));

var _keyCodes = _interopRequireDefault(require("./utils/key-codes"));

var _prettyPrint = require("./utils/pretty-print");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = (0, _debug.default)("playmo:kbd"); // prevent flooding (UI can't keep up anyway)

const SCRUB_THROTTLE_MS = 100;

function KeyboardShortcuts({
  controller
}) {
  const keyEventCodeToCommandHandler = {
    // continuous, repetitive actions ("press and hold")
    keydown: {
      [_keyCodes.default.ArrowLeft]: (0, _throttle.default)(onArrowLeftKeyDown, SCRUB_THROTTLE_MS),
      [_keyCodes.default.ArrowRight]: (0, _throttle.default)(onArrowRightKeyDown, SCRUB_THROTTLE_MS),
      [_keyCodes.default.ArrowUp]: (0, _throttle.default)(onArrowUpKeyDown, SCRUB_THROTTLE_MS),
      [_keyCodes.default.ArrowDown]: (0, _throttle.default)(onArrowDownKeyDown, SCRUB_THROTTLE_MS)
    },
    // toggles
    keyup: {
      [_keyCodes.default.Space]: onSpaceKeyUp,
      [_keyCodes.default.MediaPlayPause]: onMediaPlayPauseKeyUp,
      [_keyCodes.default.Enter]: onEnterKeyUp,
      [_keyCodes.default.KeyM]: onMKeyUp,
      [_keyCodes.default.KeyF]: onFKeyUp,
      [_keyCodes.default.Escape]: onEscapeKeyUp
    }
  };
  const defaultState = Object.freeze({
    // needed to track whether event/command is already handled natively
    eventHandled: false
  });
  const state = { ...defaultState
  };
  return {
    registerListeners,
    unregisterListeners
  };

  function registerListeners() {
    for (const eventName of Object.keys(keyEventCodeToCommandHandler)) {
      document.addEventListener(eventName, onKeyEvent);
    }

    document.addEventListener("keydown", preventSpacebarFromSrollingPage);
    document.addEventListener("keyup", resetState);
    controller.registerListeners();
  }

  function unregisterListeners() {
    for (const eventName of Object.keys(keyEventCodeToCommandHandler)) {
      document.removeEventListener(eventName, onKeyEvent);
    }

    document.removeEventListener("keydown", preventSpacebarFromSrollingPage);
    document.removeEventListener("keyup", resetState);
    controller.unregisterListeners();
  }

  function preventSpacebarFromSrollingPage(event) {
    if (event.target.isSameNode(document.body) && event.code === _keyCodes.default.Space) {
      debug((0, _prettyPrint.prettifyKeyboardEvent)(event, "preventing spacebar from scrolling page"));
      event.preventDefault();
    }
  }

  function resetState() {
    for (const [k, v] of Object.entries(defaultState)) {
      state[k] = v;
    }
  }

  function onKeyEvent(event) {
    const {
      type,
      code
    } = event;
    debug((0, _prettyPrint.prettifyKeyboardEvent)(event));

    if (controller.hasStateChanged()) {
      // note: handled `keydown` event propagates to `keyup`
      state.eventHandled = true;
    }

    if (state.eventHandled) {
      debug((0, _prettyPrint.prettifyKeyboardEvent)(event, "event already handled"));
      return;
    }

    const handleCommand = keyEventCodeToCommandHandler[type][code];

    if (handleCommand) {
      debug((0, _prettyPrint.prettifyKeyboardEvent)(event, "handling event"));
      event.preventDefault();
      handleCommand(event);
    }
  }

  function togglePlayState() {
    const playing = controller.isPlaying();
    debug(`toggling play state: ${playing} -> ${!playing}`);
    controller.togglePlayState();
  }

  function onSpaceKeyUp() {
    togglePlayState();
  }

  function onMediaPlayPauseKeyUp() {
    togglePlayState();
  }

  function onEnterKeyUp({
    altKey: shouldResetPlaybackRate
  }) {
    if (shouldResetPlaybackRate) {
      debug("resetting playback rate");
      controller.resetPlaybackRate();
    }
  }

  function onMKeyUp() {
    const muted = controller.isMuted();
    debug(`toggling muted state: ${muted} -> ${!muted}`);
    controller.toggleMute();
  }

  function onFKeyUp() {
    const transition = controller.isFullscreen() ? "fullscreen -> windowed" : "windowed -> fullscreen";
    debug(`toggling fullscreen state: ${transition}`);
    controller.toggleFullscreen();
  }

  function onEscapeKeyUp() {
    if (controller.isFullscreen()) {
      debug("exiting fullscreen mode");
      controller.exitFullscreen();
    }
  }

  function onArrowLeftKeyDown({
    altKey: decreasePlaybackRate,
    shiftKey: fast
  }) {
    if (decreasePlaybackRate) {
      debug("decreasing playback rate");
      controller.decreasePlaybackRate();
    } else {
      debug(`rewinding [fast=${fast}]`);
      controller.rewind({
        fast
      });
    }
  }

  function onArrowRightKeyDown({
    altKey: increasePlaybackRate,
    shiftKey: fast
  }) {
    if (increasePlaybackRate) {
      debug("increasing playback rate");
      controller.increasePlaybackRate();
    } else {
      debug(`fast forwarding [fast=${fast}]`);
      controller.fastForward({
        fast
      });
    }
  }

  function onArrowUpKeyDown() {
    debug("volume up");
    controller.volumeUp();
  }

  function onArrowDownKeyDown() {
    debug("volume down");
    controller.volumeDown();
  }
}
},{"debug":"../node_modules/debug/src/browser.js","./utils/throttle":"utils/throttle.js","./utils/key-codes":"utils/key-codes.js","./utils/pretty-print":"utils/pretty-print.js"}],"video-controller.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = VideoController;

var _throttle = _interopRequireDefault(require("./utils/throttle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function VideoController({
  element
}) {
  if (!element || !element.tagName === "VIDEO") {
    throw new Error("video element required");
  }

  const TIME_THROTTLE_MS = 100;
  const ScrubSpeed = {
    Default: 10,
    Fast: 60
  };
  const Volume = {
    Min: 0,
    Max: 1,
    Step: 0.1
  };
  const PlaybackRate = {
    // rationale: https://stackoverflow.com/a/32320020
    Min: 0.0625,
    Max: 16,
    Step: 0.1,
    Default: 1
  };
  const ELEMENT_STATE_PROPERTIES = ["paused", "currentTime", "volume", "muted", "playbackRate", "fullscreen"]; // note: `volumehange` includes changes to both the `volume` and `muted` properties

  const ELEMENT_STATE_EVENTS = ["play", "pause", "playing", "ended", "volumechange", "ratechange"];
  const previousState = createSnapshot(ELEMENT_STATE_PROPERTIES);
  const updateStateThrottled = (0, _throttle.default)(updateState, TIME_THROTTLE_MS);
  return {
    isPlaying,
    isMuted,
    isFullscreen,
    togglePlayState: withStateUpdate(togglePlayState),
    fastForward: withStateUpdate(fastForward),
    rewind: withStateUpdate(rewind),
    volumeUp: withStateUpdate(volumeUp),
    volumeDown: withStateUpdate(volumeDown),
    toggleMute: withStateUpdate(toggleMute),
    increasePlaybackRate: withStateUpdate(increasePlaybackRate),
    decreasePlaybackRate: withStateUpdate(decreasePlaybackRate),
    resetPlaybackRate: withStateUpdate(resetPlaybackRate),
    toggleFullscreen: withStateUpdate(toggleFullscreen),
    exitFullscreen: withStateUpdate(exitFullscreen),
    hasStateChanged,
    registerListeners,
    unregisterListeners
  };

  function withStateUpdate(action) {
    return (...parameters) => {
      action(...parameters);
      updateState();
    };
  }

  function registerListeners() {
    document.addEventListener("fullscreenchange", updateState);

    for (const eventName of ELEMENT_STATE_EVENTS) {
      element.addEventListener(eventName, updateState);
    } // no need for more frequent updates


    element.addEventListener("timeupdate", updateStateThrottled);
  }

  function unregisterListeners() {
    document.removeEventListener("fullscreenchange", updateState);

    for (const eventName of ELEMENT_STATE_EVENTS) {
      element.removeEventListener(eventName, updateState);
    }

    element.removeEventListener("timeupdate", updateStateThrottled);
  }

  function isPlaying() {
    return !element.paused;
  }

  function isMuted() {
    return element.muted;
  }

  function isFullscreen() {
    return document.fullscreenElement !== null && document.fullscreenElement.isSameNode(element);
  }

  function togglePlayState() {
    if (isPlaying()) {
      element.pause();
    } else {
      element.play();
    }
  }

  function fastForward({
    fast
  }) {
    const newTime = getCurrentTime() + getDurationToScrub({
      fast
    });
    setCurrentTime(newTime);
  }

  function rewind({
    fast
  }) {
    const newTime = getCurrentTime() - getDurationToScrub({
      fast
    });
    setCurrentTime(newTime);
  }

  function volumeUp() {
    const newVolume = Math.min(getVolume() + Volume.Step, Volume.Max);
    setVolume(newVolume);
  }

  function volumeDown() {
    const newVolume = Math.max(getVolume() - Volume.Step, Volume.Min);
    setVolume(newVolume);
  }

  function toggleMute() {
    element.muted = !element.muted;
  }

  function increasePlaybackRate() {
    const newPlaybackRate = Math.min(getPlaybackRate() + PlaybackRate.Step, PlaybackRate.Max);
    setPlaybackRate(newPlaybackRate);
  }

  function decreasePlaybackRate() {
    const newPlaybackRate = Math.max(getPlaybackRate() - PlaybackRate.Step, PlaybackRate.Min);
    setPlaybackRate(newPlaybackRate);
  }

  function resetPlaybackRate() {
    setPlaybackRate(PlaybackRate.Default);
  }

  function toggleFullscreen() {
    if (isFullscreen()) {
      exitFullscreen();
    } else {
      element.requestFullscreen();
    }
  }

  function exitFullscreen() {
    document.exitFullscreen();
  }

  function hasStateChanged() {
    return Object.entries(previousState).some(([property, oldValue]) => {
      const currentValue = getPropertyValue(element, property);

      if (property === "currentTime") {
        // any change less than a second is not practically relevant
        return Math.abs(currentValue - oldValue) > 1;
      }

      return currentValue !== oldValue;
    });
  }

  function cloneState(element, {
    properties
  }) {
    return Object.fromEntries(properties.map(p => [p, getPropertyValue(element, p)]));
  }

  function updateState() {
    for (const property of ELEMENT_STATE_PROPERTIES) {
      previousState[property] = getPropertyValue(element, property);
    }
  }

  function getPropertyValue(element, property) {
    return property === "fullscreen" ? isFullscreen() : element[property];
  }

  function createSnapshot(properties) {
    return cloneState(element, {
      properties
    });
  }

  function getCurrentTime() {
    return element.currentTime;
  }

  function setCurrentTime(time) {
    element.currentTime = time;
  }

  function getDurationToScrub({
    fast
  }) {
    return fast ? ScrubSpeed.Fast : ScrubSpeed.Default;
  }

  function getVolume() {
    return element.volume;
  }

  function setVolume(volume) {
    element.volume = volume;
  }

  function getPlaybackRate() {
    return element.playbackRate;
  }

  function setPlaybackRate(playbackRate) {
    element.playbackRate = playbackRate;
  }
}
},{"./utils/throttle":"utils/throttle.js"}],"auto-player.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _debug = _interopRequireDefault(require("debug"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = (0, _debug.default)("playmo:auto-player");

function AutoPlayer({
  observer
}) {
  const stateByElement = new WeakMap();
  observer.on("elementVisible", onElementVisible);
  observer.on("elementInvisible", onElementInvisible);
  return {
    track,
    untrack
  };

  function track(element, {
    controller
  }) {
    debug("tracking element", element);
    stateByElement.set(element, {
      autoPaused: false,
      controller
    });
  }

  function untrack(element) {
    debug("untracking element", element);
    stateByElement.delete(element);
  }

  function onElementVisible(element) {
    const state = stateByElement.get(element);
    const {
      autoPaused,
      controller
    } = state;

    if (autoPaused && !controller.isPlaying()) {
      debug("auto-resuming video", element);
      controller.togglePlayState();
      stateByElement.set(element, { ...state,
        autoPaused: false
      });
    }
  }

  function onElementInvisible(element) {
    const state = stateByElement.get(element);
    const {
      controller
    } = state;

    if (controller.isPlaying()) {
      debug("auto-pausing video", element);
      controller.togglePlayState();
      stateByElement.set(element, { ...state,
        autoPaused: true
      });
    }
  }
}

var _default = AutoPlayer;
exports.default = _default;
},{"debug":"../node_modules/debug/src/browser.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _debug = _interopRequireDefault(require("debug"));

var _dom = require("./utils/dom");

var _elementObserver = _interopRequireDefault(require("./element-observer"));

var _keyboardShortcuts = _interopRequireDefault(require("./keyboard-shortcuts"));

var _videoController = _interopRequireDefault(require("./video-controller"));

var _autoPlayer = _interopRequireDefault(require("./auto-player"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = (0, _debug.default)("playmo:main");

(async function main() {
  debug("extension loaded");
  const keyboardShortcutsByElement = new WeakMap();
  const elementObserver = (0, _elementObserver.default)({
    selector: "video"
  });
  const autoPlayer = (0, _autoPlayer.default)({
    observer: elementObserver
  });

  const initializeElement = element => {
    const video = (0, _videoController.default)({
      element
    });
    keyboardShortcutsByElement.set(element, (0, _keyboardShortcuts.default)({
      video
    }));
    autoPlayer.track(element, {
      controller: video
    });
  };

  elementObserver.on("elementAdded", element => {
    debug("element added", element);
    initializeElement(element);
  });
  elementObserver.on("elementVisible", async element => {
    debug("element visible", element);
    await videoLoaded(element);
    debug("video loaded", element);
    keyboardShortcutsByElement.get(element).registerListeners();
  });
  elementObserver.on("elementInvisible", element => {
    debug("element invisible", element);
    keyboardShortcutsByElement.get(element).unregisterListeners();
  });
  elementObserver.on("elementRemoved", element => {
    var _keyboardShortcutsByE;

    debug("element removed", element);
    autoPlayer.untrack(element);
    (_keyboardShortcutsByE = keyboardShortcutsByElement.get(element)) === null || _keyboardShortcutsByE === void 0 ? void 0 : _keyboardShortcutsByE.unregisterListeners();
    keyboardShortcutsByElement.delete(element);
  });

  for (const element of document.querySelectorAll("video")) {
    debug("element found", element);
    initializeElement(element);
    elementObserver.observe(element);
  }
})();

async function videoLoaded(video) {
  if (video.readyState === HTMLVideoElement.HAVE_METADATA) {
    return Promise.resolve();
  }

  await (0, _dom.onEvent)(video, "loadedmetadata");
}
},{"debug":"../node_modules/debug/src/browser.js","./utils/dom":"utils/dom.js","./element-observer":"element-observer.js","./keyboard-shortcuts":"keyboard-shortcuts.js","./video-controller":"video-controller.js","./auto-player":"auto-player.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51077" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/index.js.map