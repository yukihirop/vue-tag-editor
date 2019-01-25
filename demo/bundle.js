/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(19)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 4 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
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
    }
    // if setTimeout wasn't available but was latter defined
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
    }
    // if clearTimeout wasn't available but was latter defined
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
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
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

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__contents_NoneStyleContent__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__contents_CustomStyleContent__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contents_BulmaContent__ = __webpack_require__(25);
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    NoneStyleContent: __WEBPACK_IMPORTED_MODULE_0__contents_NoneStyleContent__["a" /* default */],
    CustomStyleContent: __WEBPACK_IMPORTED_MODULE_1__contents_CustomStyleContent__["a" /* default */],
    BulmaContent: __WEBPACK_IMPORTED_MODULE_2__contents_BulmaContent__["a" /* default */]
  }
});

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      tagLabels: ['javascript', 'ruby'],
      tagLinks: ['javascript', 'ruby']
    };
  },

  methods: {
    // Only one argument
    handlerAfterClickTag: function handlerAfterClickTag(tag) {
      alert(tag + ' is click!');
    },

    // Only two argument
    handlerAfterInputTag: function handlerAfterInputTag(tag, isAddTag) {
      if (isAddTag === true) {
        console.log(tag + ' is added!');
      } else {
        console.log(tag + ' isn\'t added');
      }
    },

    // Only one argument
    handlerAfterDeleteTag: function handlerAfterDeleteTag(tag) {
      console.log(tag + ' is deleted!');
    }
  }
});

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      tagLabels: ['javascript', 'ruby'],
      tagLinks: ['javascript', 'ruby']
    };
  },

  methods: {
    // Only one argument
    handlerAfterClickTag: function handlerAfterClickTag(tag) {
      alert(tag + ' is click!');
    },

    // Only two argument
    handlerAfterInputTag: function handlerAfterInputTag(tag, isAddTag) {
      if (isAddTag === true) {
        console.log(tag + ' is added!');
      } else {
        console.log(tag + ' isn\'t added');
      }
    },

    // Only one argument
    handlerAfterDeleteTag: function handlerAfterDeleteTag(tag) {
      console.log(tag + ' is deleted!');
    }
  }
});

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      tagLabels: ['javascript', 'ruby'],
      tagLinks: ['javascript', 'ruby']
    };
  },

  methods: {
    // Only one argument
    handlerAfterClickTag: function handlerAfterClickTag(tag) {
      alert(tag + ' is click!');
    },

    // Only two argument
    handlerAfterInputTag: function handlerAfterInputTag(tag, isAddTag) {
      if (isAddTag === true) {
        console.log(tag + ' is added!');
      } else {
        console.log(tag + ' isn\'t added');
      }
    },

    // Only one argument
    handlerAfterDeleteTag: function handlerAfterDeleteTag(tag) {
      console.log(tag + ' is deleted!');
    }
  }
});

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_tag_editor_set__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_tag_editor_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_tag_editor_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__App__ = __webpack_require__(15);




__WEBPACK_IMPORTED_MODULE_0_vue___default.a.component('tag-editor', __WEBPACK_IMPORTED_MODULE_1_vue_tag_editor_set__["VueTagEditor"]);
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.component('tag-editor-bulma', __WEBPACK_IMPORTED_MODULE_1_vue_tag_editor_set__["VueTagEditorBulma"]);

new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
  el: '#app',
  template: '<App/>',
  components: { App: __WEBPACK_IMPORTED_MODULE_2__App__["a" /* default */] }
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global, setImmediate) {/*!
 * Vue.js v2.5.22
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */


/*  */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef(v) {
  return v === undefined || v === null;
}

function isDef(v) {
  return v !== undefined && v !== null;
}

function isTrue(v) {
  return v === true;
}

function isFalse(v) {
  return v === false;
}

/**
 * Check if value is primitive.
 */
function isPrimitive(value) {
  return typeof value === 'string' || typeof value === 'number' ||
  // $flow-disable-line
  (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'symbol' || typeof value === 'boolean';
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject(obj) {
  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType(value) {
  return _toString.call(value).slice(8, -1);
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function isRegExp(v) {
  return _toString.call(v) === '[object RegExp]';
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex(val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString(val) {
  return val == null ? '' : (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' ? JSON.stringify(val, null, 2) : String(val);
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber(val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n;
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap(str, expectsLowerCase) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? function (val) {
    return map[val.toLowerCase()];
  } : function (val) {
    return map[val];
  };
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove(arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind(fn, ctx) {
  function boundFn(a) {
    var l = arguments.length;
    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
  }

  boundFn._length = fn.length;
  return boundFn;
}

function nativeBind(fn, ctx) {
  return fn.bind(ctx);
}

var bind = Function.prototype.bind ? nativeBind : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret;
}

/**
 * Mix properties into target object.
 */
function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to;
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject(arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop(a, b, c) {}

/**
 * Always return false.
 */
var no = function no(a, b, c) {
  return false;
};

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function identity(_) {
  return _;
};

/**
 * Generate a string containing static keys from compiler modules.
 */
function genStaticKeys(modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || []);
  }, []).join(',');
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual(a, b) {
  if (a === b) {
    return true;
  }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i]);
        });
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key]);
        });
      } else {
        /* istanbul ignore next */
        return false;
      }
    } catch (e) {
      /* istanbul ignore next */
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) {
      return i;
    }
  }
  return -1;
}

/**
 * Ensure a function is called only once.
 */
function once(fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  };
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = ['component', 'directive', 'filter'];

var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed', 'activated', 'deactivated', 'errorCaptured'];

/*  */

var config = {
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: process.env.NODE_ENV !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
};

/*  */

/**
 * Check if a string starts with $ or _
 */
function isReserved(str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F;
}

/**
 * Define a property.
 */
function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath(path) {
  if (bailRE.test(path)) {
    return;
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) {
        return;
      }
      obj = obj[segments[i]];
    }
    return obj;
  };
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0 || weexPlatform === 'android';
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA) || weexPlatform === 'ios';
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = {}.watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', {
      get: function get() {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    }); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function isServerRendering() {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer;
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative(Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}

var hasSymbol = typeof Symbol !== 'undefined' && isNative(Symbol) && typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/function () {
    function Set() {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has(key) {
      return this.set[key] === true;
    };
    Set.prototype.add = function add(key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear() {
      this.set = Object.create(null);
    };

    return Set;
  }();
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = noop; // work around flow check
var formatComponentName = noop;

if (process.env.NODE_ENV !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function classify(str) {
    return str.replace(classifyRE, function (c) {
      return c.toUpperCase();
    }).replace(/[-_]/g, '');
  };

  warn = function warn(msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && !config.silent) {
      console.error("[Vue warn]: " + msg + trace);
    }
  };

  tip = function tip(msg, vm) {
    if (hasConsole && !config.silent) {
      console.warn("[Vue tip]: " + msg + (vm ? generateComponentTrace(vm) : ''));
    }
  };

  formatComponentName = function formatComponentName(vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>';
    }
    var options = typeof vm === 'function' && vm.cid != null ? vm.options : vm._isVue ? vm.$options || vm.constructor.options : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (name ? "<" + classify(name) + ">" : "<Anonymous>") + (file && includeFile !== false ? " at " + file : '');
  };

  var repeat = function repeat(str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) {
        res += str;
      }
      if (n > 1) {
        str += str;
      }
      n >>= 1;
    }
    return res;
  };

  generateComponentTrace = function generateComponentTrace(vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue;
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree.map(function (vm, i) {
        return "" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm) ? formatComponentName(vm[0]) + "... (" + vm[1] + " recursive calls)" : formatComponentName(vm));
      }).join('\n');
    } else {
      return "\n\n(found in " + formatComponentName(vm) + ")";
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep() {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub(sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub(sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend() {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify() {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if (process.env.NODE_ENV !== 'production' && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) {
      return a.id - b.id;
    });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;
var targetStack = [];

function pushTarget(target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

/*  */

var VNode = function VNode(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance;
};

Object.defineProperties(VNode.prototype, prototypeAccessors);

var createEmptyVNode = function createEmptyVNode(text) {
  if (text === void 0) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node;
};

function createTextVNode(val) {
  return new VNode(undefined, undefined, undefined, String(val));
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode(vnode) {
  var cloned = new VNode(vnode.tag, vnode.data,
  // #7975
  // clone children array to avoid mutating original in case of cloning
  // a child.
  vnode.children && vnode.children.slice(), vnode.text, vnode.elm, vnode.context, vnode.componentOptions, vnode.asyncFactory);
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned;
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator() {
    var args = [],
        len = arguments.length;
    while (len--) {
      args[len] = arguments[len];
    }var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2);
        break;
    }
    if (inserted) {
      ob.observeArray(inserted);
    }
    // notify change
    ob.dep.notify();
    return result;
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving(value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer(value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk(obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray(items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment(target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment(target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe(value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return;
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (shouldObserve && !isServerRendering() && (Array.isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob;
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1(obj, key, val, customSetter, shallow) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return;
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value;
    },
    set: function reactiveSetter(newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || newVal !== newVal && value !== value) {
        return;
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) {
        return;
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set(target, key, val) {
  if (process.env.NODE_ENV !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn("Cannot set reactive property on undefined, null, or primitive value: " + target);
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val;
  }
  var ob = target.__ob__;
  if (target._isVue || ob && ob.vmCount) {
    process.env.NODE_ENV !== 'production' && warn('Avoid adding reactive properties to a Vue instance or its root $data ' + 'at runtime - declare it upfront in the data option.');
    return val;
  }
  if (!ob) {
    target[key] = val;
    return val;
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val;
}

/**
 * Delete a property and trigger change if necessary.
 */
function del(target, key) {
  if (process.env.NODE_ENV !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn("Cannot delete reactive property on undefined, null, or primitive value: " + target);
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return;
  }
  var ob = target.__ob__;
  if (target._isVue || ob && ob.vmCount) {
    process.env.NODE_ENV !== 'production' && warn('Avoid deleting properties on a Vue instance or its root $data ' + '- just set it to null.');
    return;
  }
  if (!hasOwn(target, key)) {
    return;
  }
  delete target[key];
  if (!ob) {
    return;
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray(value) {
  for (var e = void 0, i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (process.env.NODE_ENV !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn("option \"" + key + "\" can only be used during instance " + 'creation with the `new` keyword.');
    }
    return defaultStrat(parent, child);
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData(to, from) {
  if (!from) {
    return to;
  }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (toVal !== fromVal && isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to;
}

/**
 * Data
 */
function mergeDataOrFn(parentVal, childVal, vm) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal;
    }
    if (!parentVal) {
      return childVal;
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn() {
      return mergeData(typeof childVal === 'function' ? childVal.call(this, this) : childVal, typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal);
    };
  } else {
    return function mergedInstanceDataFn() {
      // instance merge
      var instanceData = typeof childVal === 'function' ? childVal.call(vm, vm) : childVal;
      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm, vm) : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData);
      } else {
        return defaultData;
      }
    };
  }
}

strats.data = function (parentVal, childVal, vm) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);

      return parentVal;
    }
    return mergeDataOrFn(parentVal, childVal);
  }

  return mergeDataOrFn(parentVal, childVal, vm);
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets(parentVal, childVal, vm, key) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    process.env.NODE_ENV !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal);
  } else {
    return res;
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (parentVal, childVal, vm, key) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) {
    parentVal = undefined;
  }
  if (childVal === nativeWatch) {
    childVal = undefined;
  }
  /* istanbul ignore if */
  if (!childVal) {
    return Object.create(parentVal || null);
  }
  if (process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) {
    return childVal;
  }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent ? parent.concat(child) : Array.isArray(child) ? child : [child];
  }
  return ret;
};

/**
 * Other object hashes.
 */
strats.props = strats.methods = strats.inject = strats.computed = function (parentVal, childVal, vm, key) {
  if (childVal && process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) {
    return childVal;
  }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) {
    extend(ret, childVal);
  }
  return ret;
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function defaultStrat(parentVal, childVal) {
  return childVal === undefined ? parentVal : childVal;
};

/**
 * Validate component names
 */
function checkComponents(options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName(name) {
  if (!/^[a-zA-Z][\w-]*$/.test(name)) {
    warn('Invalid component name: "' + name + '". Component names ' + 'can only contain alphanumeric characters and the hyphen, ' + 'and must start with a letter.');
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + name);
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps(options, vm) {
  var props = options.props;
  if (!props) {
    return;
  }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (process.env.NODE_ENV !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val) ? val : { type: val };
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn("Invalid value for option \"props\": expected an Array or an Object, " + "but got " + toRawType(props) + ".", vm);
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject(options, vm) {
  var inject = options.inject;
  if (!inject) {
    return;
  }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val) ? extend({ from: key }, val) : { from: val };
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn("Invalid value for option \"inject\": expected an Array or an Object, " + "but got " + toRawType(inject) + ".", vm);
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives(options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

function assertObjectType(name, value, vm) {
  if (!isPlainObject(value)) {
    warn("Invalid value for option \"" + name + "\": expected an Object, " + "but got " + toRawType(value) + ".", vm);
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions(parent, child, vm) {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField(key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options;
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset(options, type, id, warnMissing) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return;
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) {
    return assets[id];
  }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) {
    return assets[camelizedId];
  }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) {
    return assets[PascalCaseId];
  }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
  }
  return res;
}

/*  */

function validateProp(key, propOptions, propsData, vm) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (process.env.NODE_ENV !== 'production' &&
  // skip validation for weex recycle-list child component props
  !false) {
    assertProp(prop, key, value, vm, absent);
  }
  return value;
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue(vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined;
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (process.env.NODE_ENV !== 'production' && isObject(def)) {
    warn('Invalid default value for prop "' + key + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData && vm.$options.propsData[key] === undefined && vm._props[key] !== undefined) {
    return vm._props[key];
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function' ? def.call(vm) : def;
}

/**
 * Assert whether a prop is valid.
 */
function assertProp(prop, name, value, vm, absent) {
  if (prop.required && absent) {
    warn('Missing required prop: "' + name + '"', vm);
    return;
  }
  if (value == null && !prop.required) {
    return;
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(getInvalidTypeMessage(name, value, expectedTypes), vm);
    return;
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn('Invalid prop: custom validator check failed for prop "' + name + '".', vm);
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType(value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value === 'undefined' ? 'undefined' : _typeof(value);
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  };
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType(fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : '';
}

function isSameType(a, b) {
  return getType(a) === getType(b);
}

function getTypeIndex(type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i;
    }
  }
  return -1;
}

function getInvalidTypeMessage(name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." + " Expected " + expectedTypes.map(capitalize).join(', ');
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message;
}

function styleValue(value, type) {
  if (type === 'String') {
    return "\"" + value + "\"";
  } else if (type === 'Number') {
    return "" + Number(value);
  } else {
    return "" + value;
  }
}

function isExplicable(value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) {
    return value.toLowerCase() === elem;
  });
}

function isBoolean() {
  var args = [],
      len = arguments.length;
  while (len--) {
    args[len] = arguments[len];
  }return args.some(function (elem) {
    return elem.toLowerCase() === 'boolean';
  });
}

/*  */

function handleError(err, vm, info) {
  if (vm) {
    var cur = vm;
    while (cur = cur.$parent) {
      var hooks = cur.$options.errorCaptured;
      if (hooks) {
        for (var i = 0; i < hooks.length; i++) {
          try {
            var capture = hooks[i].call(cur, err, vm, info) === false;
            if (capture) {
              return;
            }
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info);
}

function globalHandleError(err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info);
    } catch (e) {
      logError(e, null, 'config.errorHandler');
    }
  }
  logError(err, vm, info);
}

function logError(err, vm, info) {
  if (process.env.NODE_ENV !== 'production') {
    warn("Error in " + info + ": \"" + err.toString() + "\"", vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err;
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks() {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using both microtasks and (macro) tasks.
// In < 2.4 we used microtasks everywhere, but there are some scenarios where
// microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using (macro) tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use microtask by default, but expose a way to force (macro) task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc;
var macroTimerFunc;
var useMacroTask = false;

// Determine (macro) task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = function macroTimerFunc() {
    setImmediate(flushCallbacks);
  };
} else if (typeof MessageChannel !== 'undefined' && (isNative(MessageChannel) ||
// PhantomJS
MessageChannel.toString() === '[object MessageChannelConstructor]')) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = function macroTimerFunc() {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function macroTimerFunc() {
    setTimeout(flushCallbacks, 0);
  };
}

// Determine microtask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  microTimerFunc = function microTimerFunc() {
    p.then(flushCallbacks);
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) {
      setTimeout(noop);
    }
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a (macro) task instead of a microtask.
 */
function withMacroTask(fn) {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true;
    try {
      return fn.apply(null, arguments);
    } finally {
      useMacroTask = false;
    }
  });
}

function nextTick(cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    });
  }
}

/*  */

var mark;
var measure;

if (process.env.NODE_ENV !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (perf && perf.mark && perf.measure && perf.clearMarks && perf.clearMeasures) {
    mark = function mark(tag) {
      return perf.mark(tag);
    };
    measure = function measure(name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (process.env.NODE_ENV !== 'production') {
  var allowedGlobals = makeMap('Infinity,undefined,NaN,isFinite,isNaN,' + 'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' + 'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' + 'require' // for Webpack/Browserify
  );

  var warnNonPresent = function warnNonPresent(target, key) {
    warn("Property or method \"" + key + "\" is not defined on the instance but " + 'referenced during render. Make sure that this property is reactive, ' + 'either in the data option, or for class-based components, by ' + 'initializing the property. ' + 'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.', target);
  };

  var warnReservedPrefix = function warnReservedPrefix(target, key) {
    warn("Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " + 'properties starting with "$" or "_" are not proxied in the Vue instance to ' + 'prevent conflicts with Vue internals' + 'See: https://vuejs.org/v2/api/#data', target);
  };

  var hasProxy = typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set(target, key, value) {
        if (isBuiltInModifier(key)) {
          warn("Avoid overwriting built-in modifier in config.keyCodes: ." + key);
          return false;
        } else {
          target[key] = value;
          return true;
        }
      }
    });
  }

  var hasHandler = {
    has: function has(target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data);
      if (!has && !isAllowed) {
        if (key in target.$data) {
          warnReservedPrefix(target, key);
        } else {
          warnNonPresent(target, key);
        }
      }
      return has || !isAllowed;
    }
  };

  var getHandler = {
    get: function get(target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) {
          warnReservedPrefix(target, key);
        } else {
          warnNonPresent(target, key);
        }
      }
      return target[key];
    }
  };

  initProxy = function initProxy(vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped ? getHandler : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse(val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse(val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if (!isA && !isObject(val) || Object.isFrozen(val) || val instanceof VNode) {
    return;
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return;
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) {
      _traverse(val[i], seen);
    }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) {
      _traverse(val[keys[i]], seen);
    }
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  };
});

function createFnInvoker(fns) {
  function invoker() {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments);
    }
  }
  invoker.fns = fns;
  return invoker;
}

function updateListeners(on, oldOn, add, remove$$1, createOnceHandler, vm) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
      process.env.NODE_ENV !== 'production' && warn("Invalid handler for event \"" + event.name + "\": got " + String(cur), vm);
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook(def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook() {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData(data, Ctor, tag) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return;
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (process.env.NODE_ENV !== 'production') {
        var keyInLowerCase = key.toLowerCase();
        if (key !== keyInLowerCase && attrs && hasOwn(attrs, keyInLowerCase)) {
          tip("Prop \"" + keyInLowerCase + "\" is passed to component " + formatComponentName(tag || Ctor) + ", but the declared prop name is" + " \"" + key + "\". " + "Note that HTML attributes are case-insensitive and camelCased " + "props need to use their kebab-case equivalents when using in-DOM " + "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\".");
        }
      }
      checkProp(res, props, key, altKey, true) || checkProp(res, attrs, key, altKey, false);
    }
  }
  return res;
}

function checkProp(res, hash, key, altKey, preserve) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true;
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true;
    }
  }
  return false;
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren(children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children);
    }
  }
  return children;
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren(children) {
  return isPrimitive(children) ? [createTextVNode(children)] : Array.isArray(children) ? normalizeArrayChildren(children) : undefined;
}

function isTextNode(node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment);
}

function normalizeArrayChildren(children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') {
      continue;
    }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, (nestedIndex || '') + "_" + i);
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + c[0].text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res;
}

/*  */

function ensureCtor(comp, base) {
  if (comp.__esModule || hasSymbol && comp[Symbol.toStringTag] === 'Module') {
    comp = comp.default;
  }
  return isObject(comp) ? base.extend(comp) : comp;
}

function createAsyncPlaceholder(factory, data, context, children, tag) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node;
}

function resolveAsyncComponent(factory, baseCtor, context) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp;
  }

  if (isDef(factory.resolved)) {
    return factory.resolved;
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp;
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function forceRender(renderCompleted) {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }

      if (renderCompleted) {
        contexts.length = 0;
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        contexts.length = 0;
      }
    });

    var reject = once(function (reason) {
      process.env.NODE_ENV !== 'production' && warn("Failed to resolve async component: " + String(factory) + (reason ? "\nReason: " + reason : ''));
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(process.env.NODE_ENV !== 'production' ? "timeout (" + res.timeout + "ms)" : null);
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading ? factory.loadingComp : factory.resolved;
  }
}

/*  */

function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory;
}

/*  */

function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c;
      }
    }
  }
}

/*  */

/*  */

function initEvents(vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add(event, fn) {
  target.$on(event, fn);
}

function remove$1(event, fn) {
  target.$off(event, fn);
}

function createOnceHandler(event, fn) {
  var _target = target;
  return function onceHandler() {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  };
}

function updateComponentListeners(vm, listeners, oldListeners) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin(Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm;
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on() {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm;
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm;
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm;
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm;
    }
    if (!fn) {
      vm._events[event] = null;
      return vm;
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break;
      }
    }
    return vm;
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (process.env.NODE_ENV !== 'production') {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip("Event \"" + lowerCaseEvent + "\" is emitted in component " + formatComponentName(vm) + " but the handler is registered for \"" + event + "\". " + "Note that HTML attributes are case-insensitive and you cannot use " + "v-on to listen to camelCase events when using in-DOM templates. " + "You should probably use \"" + hyphenate(event) + "\" instead of \"" + event + "\".");
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, "event handler for \"" + event + "\"");
        }
      }
    }
    return vm;
  };
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots(children, context) {
  var slots = {};
  if (!children) {
    return slots;
  }
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) && data && data.slot != null) {
      var name = data.slot;
      var slot = slots[name] || (slots[name] = []);
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots;
}

function isWhitespace(node) {
  return node.isComment && !node.asyncFactory || node.text === ' ';
}

function resolveScopedSlots(fns, // see flow/vnode
res) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res;
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  };
}

function initLifecycle(vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return;
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent(vm, el, hydrating) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if (vm.$options.template && vm.$options.template.charAt(0) !== '#' || vm.$options.el || el) {
        warn('You are using the runtime-only build of Vue where the template ' + 'compiler is not available. Either pre-compile the templates into ' + 'render functions, or use the compiler-included build.', vm);
      } else {
        warn('Failed to mount component: template or render function not defined.', vm);
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = function updateComponent() {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure("vue " + name + " render", startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure("vue " + name + " patch", startTag, endTag);
    };
  } else {
    updateComponent = function updateComponent() {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm;
}

function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(renderChildren || // has new static slots
  vm.$options._renderChildren || // has old static slots
  parentVnode.data.scopedSlots || // has new scoped slots
  vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) {
    // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree(vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) {
      return true;
    }
  }
  return false;
}

function activateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return;
    }
  } else if (vm._directInactive) {
    return;
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return;
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook(vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, hook + " hook");
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState() {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (process.env.NODE_ENV !== 'production') {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue() {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) {
    return a.id - b.id;
  });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn('You may have an infinite update loop ' + (watcher.user ? "in watcher with expression \"" + watcher.expression + "\"" : "in a component render function."), watcher.vm);
        break;
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks(queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent(vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks(queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher(watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if (process.env.NODE_ENV !== 'production' && !config.async) {
        flushSchedulerQueue();
        return;
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$1 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher(vm, expOrFn, cb, options, isRenderWatcher) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$1; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = process.env.NODE_ENV !== 'production' ? expOrFn.toString() : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
      process.env.NODE_ENV !== 'production' && warn("Failed watching path: \"" + expOrFn + "\" " + 'Watcher only accepts simple dot-delimited paths. ' + 'For full control, use a function instead.', vm);
    }
  }
  this.value = this.lazy ? undefined : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get() {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, "getter for watcher \"" + this.expression + "\"");
    } else {
      throw e;
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value;
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep(dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps() {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update() {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run() {
  if (this.active) {
    var value = this.get();
    if (value !== this.value ||
    // Deep watchers and watchers on Object/Arrays should fire even
    // when the value is the same, because the value may
    // have mutated.
    isObject(value) || this.deep) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, "callback for watcher \"" + this.expression + "\"");
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate() {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend() {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown() {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy(target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key];
  };
  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState(vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) {
    initProps(vm, opts.props);
  }
  if (opts.methods) {
    initMethods(vm, opts.methods);
  }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) {
    initComputed(vm, opts.computed);
  }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps(vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function loop(key) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) || config.isReservedAttr(hyphenatedKey)) {
        warn("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop.", vm);
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          warn("Avoid mutating a prop directly since the value will be " + "overwritten whenever the parent component re-renders. " + "Instead, use a data or computed property based on the prop's " + "value. Prop being mutated: \"" + key + "\"", vm);
        }
      });
    } else {
      defineReactive$$1(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) {
    loop(key);
  }toggleObserving(true);
}

function initData(vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {};
  if (!isPlainObject(data)) {
    data = {};
    process.env.NODE_ENV !== 'production' && warn('data functions should return an object:\n' + 'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function', vm);
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn("Method \"" + key + "\" has already been defined as a data property.", vm);
      }
    }
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn("The data property \"" + key + "\" is already declared as a prop. " + "Use prop default value instead.", vm);
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData(data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm);
  } catch (e) {
    handleError(e, vm, "data()");
    return {};
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed(vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (process.env.NODE_ENV !== 'production' && getter == null) {
      warn("Getter is missing for computed property \"" + key + "\".", vm);
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn("The computed property \"" + key + "\" is already defined in data.", vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn("The computed property \"" + key + "\" is already defined as a prop.", vm);
      }
    }
  }
}

function defineComputed(target, key, userDef) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache ? createComputedGetter(key) : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get ? shouldCache && userDef.cache !== false ? createComputedGetter(key) : createGetterInvoker(userDef.get) : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if (process.env.NODE_ENV !== 'production' && sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn("Computed property \"" + key + "\" was assigned to but it has no setter.", this);
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter(key) {
  return function computedGetter() {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value;
    }
  };
}

function createGetterInvoker(fn) {
  return function computedGetter() {
    return fn.call(this, this);
  };
}

function initMethods(vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (process.env.NODE_ENV !== 'production') {
      if (typeof methods[key] !== 'function') {
        warn("Method \"" + key + "\" has type \"" + _typeof(methods[key]) + "\" in the component definition. " + "Did you reference the function correctly?", vm);
      }
      if (props && hasOwn(props, key)) {
        warn("Method \"" + key + "\" has already been defined as a prop.", vm);
      }
      if (key in vm && isReserved(key)) {
        warn("Method \"" + key + "\" conflicts with an existing Vue instance method. " + "Avoid defining component methods that start with _ or $.");
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch(vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher(vm, expOrFn, handler, options) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options);
}

function stateMixin(Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () {
    return this._data;
  };
  var propsDef = {};
  propsDef.get = function () {
    return this._props;
  };
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function () {
      warn('Avoid replacing instance root $data. ' + 'Use nested data properties instead.', this);
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (expOrFn, cb, options) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options);
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, "callback for immediate watcher \"" + watcher.expression + "\"");
      }
    }
    return function unwatchFn() {
      watcher.teardown();
    };
  };
}

/*  */

function initProvide(vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function' ? provide.call(vm) : provide;
  }
}

function initInjections(vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        defineReactive$$1(vm, key, result[key], function () {
          warn("Avoid mutating an injected value directly since the changes will be " + "overwritten whenever the provided component re-renders. " + "injection being mutated: \"" + key + "\"", vm);
        });
      } else {
        defineReactive$$1(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}

function resolveInject(inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol ? Reflect.ownKeys(inject).filter(function (key) {
      /* istanbul ignore next */
      return Object.getOwnPropertyDescriptor(inject, key).enumerable;
    }) : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break;
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function' ? provideDefault.call(vm) : provideDefault;
        } else if (process.env.NODE_ENV !== 'production') {
          warn("Injection \"" + key + "\" not found", vm);
        }
      }
    }
    return result;
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList(val, render) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  ret._isVList = true;
  return ret;
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot(name, fallback, props, bindObject) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) {
    // scoped slot
    props = props || {};
    if (bindObject) {
      if (process.env.NODE_ENV !== 'production' && !isObject(bindObject)) {
        warn('slot v-bind without argument expects an Object', this);
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes);
  } else {
    return nodes;
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter(id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity;
}

/*  */

function isKeyNotMatch(expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1;
  } else {
    return expect !== actual;
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName);
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode);
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key;
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps(data, tag, value, asProp, isSync) {
  if (value) {
    if (!isObject(value)) {
      process.env.NODE_ENV !== 'production' && warn('v-bind without argument expects an Object or Array value', this);
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function loop(key) {
        if (key === 'class' || key === 'style' || isReservedAttribute(key)) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key) ? data.domProps || (data.domProps = {}) : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        if (!(key in hash) && !(camelizedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on["update:" + camelizedKey] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) {
        loop(key);
      }
    }
  }
  return data;
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic(index, isInFor) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree;
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(this._renderProxy, null, this // for render fns generated for functional component templates
  );
  markStatic(tree, "__static__" + index, false);
  return tree;
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce(tree, index, key) {
  markStatic(tree, "__once__" + index + (key ? "_" + key : ""), true);
  return tree;
}

function markStatic(tree, key, isOnce) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], key + "_" + i, isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode(node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners(data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      process.env.NODE_ENV !== 'production' && warn('v-on without argument expects an Object value', this);
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data;
}

/*  */

function installRenderHelpers(target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}

/*  */

function FunctionalRenderContext(data, props, children, parent, Ctor) {
  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    return resolveSlots(children, parent);
  };

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode;
    };
  } else {
    this._c = function (a, b, c, d) {
      return createElement(contextVm, a, b, c, d, needNormalization);
    };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent(Ctor, propsData, data, contextVm, children) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) {
      mergeProps(props, data.attrs);
    }
    if (isDef(data.props)) {
      mergeProps(props, data.props);
    }
  }

  var renderContext = new FunctionalRenderContext(data, props, children, contextVm, Ctor);

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext);
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res;
  }
}

function cloneAndMarkFunctionalResult(vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (process.env.NODE_ENV !== 'production') {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone;
}

function mergeProps(to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init(vnode, hydrating) {
    if (vnode.componentInstance && !vnode.componentInstance._isDestroyed && vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance);
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch(oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(child, options.propsData, // updated props
    options.listeners, // updated listeners
    vnode, // new parent vnode
    options.children // new children
    );
  },

  insert: function insert(vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy(vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent(Ctor, data, context, children, tag) {
  if (isUndef(Ctor)) {
    return;
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn("Invalid Component definition: " + String(Ctor), context);
    }
    return;
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children);
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode("vue-component-" + Ctor.cid + (name ? "-" + name : ''), data, undefined, undefined, undefined, context, { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }, asyncFactory);

  return vnode;
}

function createComponentInstanceForVnode(vnode, // we know it's MountedComponentVNode but flow doesn't
parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options);
}

function installComponentHooks(data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1(f1, f2) {
  var merged = function merged(a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged;
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel(options, data) {
  var prop = options.model && options.model.prop || 'value';
  var event = options.model && options.model.event || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (Array.isArray(existing) ? existing.indexOf(callback) === -1 : existing !== callback) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType);
}

function _createElement(context, tag, data, children, normalizationType) {
  if (isDef(data) && isDef(data.__ob__)) {
    process.env.NODE_ENV !== 'production' && warn("Avoid using observed data object as vnode data: " + JSON.stringify(data) + "\n" + 'Always create fresh vnode data objects in each render!', context);
    return createEmptyVNode();
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode();
  }
  // warn against non-primitive key
  if (process.env.NODE_ENV !== 'production' && isDef(data) && isDef(data.key) && !isPrimitive(data.key)) {
    {
      warn('Avoid using non-primitive value as key, ' + 'use string/number value instead.', context);
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) && typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = context.$vnode && context.$vnode.ns || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context);
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(tag, data, children, undefined, undefined, context);
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode;
  } else if (isDef(vnode)) {
    if (isDef(ns)) {
      applyNS(vnode, ns);
    }
    if (isDef(data)) {
      registerDeepBindings(data);
    }
    return vnode;
  } else {
    return createEmptyVNode();
  }
}

function applyNS(vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force) && child.tag !== 'svg')) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings(data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender(vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, false);
  };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, true);
  };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

function renderMixin(Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this);
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = _parentVnode.data.scopedSlots || emptyObject;
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production' && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
        warn('Multiple root nodes returned from render function. Render function ' + 'should return a single root node.', vm);
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode;
  };
}

/*  */

var uid$3 = 0;

function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + vm._uid;
      endTag = "vue-perf-end:" + vm._uid;
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure("vue " + vm._name + " init", startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent(vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions(Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options;
}

function resolveModifiedOptions(Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) {
        modified = {};
      }
      modified[key] = latest[key];
    }
  }
  return modified;
}

function Vue(options) {
  if (process.env.NODE_ENV !== 'production' && !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse(Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = this._installedPlugins || (this._installedPlugins = []);
    if (installedPlugins.indexOf(plugin) > -1) {
      return this;
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this;
  };
}

/*  */

function initMixin$1(Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this;
  };
}

/*  */

function initExtend(Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId];
    }

    var name = extendOptions.name || Super.options.name;
    if (process.env.NODE_ENV !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent(options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(Super.options, extendOptions);
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub;
  };
}

function initProps$1(Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1(Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters(Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (id, definition) {
      if (!definition) {
        return this.options[type + 's'][id];
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition;
      }
    };
  });
}

/*  */

function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag);
}

function matches(pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1;
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1;
  } else if (isRegExp(pattern)) {
    return pattern.test(name);
  }
  /* istanbul ignore next */
  return false;
}

function pruneCache(keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry(cache, key, keys, current) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created() {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed() {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted() {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) {
        return matches(val, name);
      });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) {
        return !matches(val, name);
      });
    });
  },

  render: function render() {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
      // not included
      include && (!name || !matches(include, name)) ||
      // excluded
      exclude && name && matches(exclude, name)) {
        return vnode;
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
      // same constructor may get registered as different local components
      // so cid alone is not enough (#3269)
      ? componentOptions.Ctor.cid + (componentOptions.tag ? "::" + componentOptions.tag : '') : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || slot && slot[0];
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI(Vue) {
  // config
  var configDef = {};
  configDef.get = function () {
    return config;
  };
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = function () {
      warn('Do not replace the Vue.config object, set individual fields instead.');
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get() {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext;
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.5.22';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function mustUseProp(tag, type, attr) {
  return attr === 'value' && acceptValue(tag) && type !== 'button' || attr === 'selected' && tag === 'option' || attr === 'checked' && tag === 'input' || attr === 'muted' && tag === 'video';
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' + 'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' + 'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' + 'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' + 'required,reversed,scoped,seamless,selected,sortable,translate,' + 'truespeed,typemustmatch,visible');

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function isXlink(name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink';
};

var getXlinkProp = function getXlinkProp(name) {
  return isXlink(name) ? name.slice(6, name.length) : '';
};

var isFalsyAttrValue = function isFalsyAttrValue(val) {
  return val == null || val === false;
};

/*  */

function genClassForVnode(vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class);
}

function mergeClassData(child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class) ? [child.class, parent.class] : parent.class
  };
}

function renderClass(staticClass, dynamicClass) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass));
  }
  /* istanbul ignore next */
  return '';
}

function concat(a, b) {
  return a ? b ? a + ' ' + b : a : b || '';
}

function stringifyClass(value) {
  if (Array.isArray(value)) {
    return stringifyArray(value);
  }
  if (isObject(value)) {
    return stringifyObject(value);
  }
  if (typeof value === 'string') {
    return value;
  }
  /* istanbul ignore next */
  return '';
}

function stringifyArray(value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) {
        res += ' ';
      }
      res += stringified;
    }
  }
  return res;
}

function stringifyObject(value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) {
        res += ' ';
      }
      res += key;
    }
  }
  return res;
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap('html,body,base,head,link,meta,style,title,' + 'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' + 'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' + 'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' + 's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' + 'embed,object,param,source,canvas,script,noscript,del,ins,' + 'caption,col,colgroup,table,thead,tbody,td,th,tr,' + 'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' + 'output,progress,select,textarea,' + 'details,dialog,menu,menuitem,summary,' + 'content,element,shadow,template,blockquote,iframe,tfoot');

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' + 'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' + 'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view', true);

var isPreTag = function isPreTag(tag) {
  return tag === 'pre';
};

var isReservedTag = function isReservedTag(tag) {
  return isHTMLTag(tag) || isSVG(tag);
};

function getTagNamespace(tag) {
  if (isSVG(tag)) {
    return 'svg';
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math';
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement(tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true;
  }
  if (isReservedTag(tag)) {
    return false;
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag];
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return unknownElementCache[tag] = el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
  } else {
    return unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString());
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query(el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      process.env.NODE_ENV !== 'production' && warn('Cannot find element: ' + el);
      return document.createElement('div');
    }
    return selected;
  } else {
    return el;
  }
}

/*  */

function createElement$1(tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm;
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm;
}

function createElementNS(namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName);
}

function createTextNode(text) {
  return document.createTextNode(text);
}

function createComment(text) {
  return document.createComment(text);
}

function insertBefore(parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild(node, child) {
  node.removeChild(child);
}

function appendChild(node, child) {
  node.appendChild(child);
}

function parentNode(node) {
  return node.parentNode;
}

function nextSibling(node) {
  return node.nextSibling;
}

function tagName(node) {
  return node.tagName;
}

function setTextContent(node, text) {
  node.textContent = text;
}

function setStyleScope(node, scopeId) {
  node.setAttribute(scopeId, '');
}

var nodeOps = /*#__PURE__*/Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setStyleScope: setStyleScope
});

/*  */

var ref = {
  create: function create(_, vnode) {
    registerRef(vnode);
  },
  update: function update(oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy(vnode) {
    registerRef(vnode, true);
  }
};

function registerRef(vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!isDef(key)) {
    return;
  }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode(a, b) {
  return a.key === b.key && (a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b) || isTrue(a.isAsyncPlaceholder) && a.asyncFactory === b.asyncFactory && isUndef(b.asyncFactory.error));
}

function sameInputType(a, b) {
  if (a.tag !== 'input') {
    return true;
  }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB);
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) {
      map[key] = i;
    }
  }
  return map;
}

function createPatchFunction(backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt(elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm);
  }

  function createRmCb(childElm, listeners) {
    function remove$$1() {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1;
  }

  function removeNode(el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1(vnode, inVPre) {
    return !inVPre && !vnode.ns && !(config.ignoredElements.length && config.ignoredElements.some(function (ignore) {
      return isRegExp(ignore) ? ignore.test(vnode.tag) : ignore === vnode.tag;
    })) && config.isUnknownElement(vnode.tag);
  }

  var creatingElmInVPre = 0;

  function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested, ownerArray, index) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return;
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (process.env.NODE_ENV !== 'production') {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.', vnode.context);
        }
      }

      vnode.elm = vnode.ns ? nodeOps.createElementNS(vnode.ns, tag) : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert(parentElm, vnode.elm, refElm);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true;
      }
    }
  }

  function initComponent(vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break;
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert(parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (nodeOps.parentNode(ref$$1) === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren(vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if (process.env.NODE_ENV !== 'production') {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable(vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag);
  }

  function invokeCreateHooks(vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) {
        i.create(emptyNode, vnode);
      }
      if (isDef(i.insert)) {
        insertedVnodeQueue.push(vnode);
      }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope(vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) && i !== vnode.context && i !== vnode.fnContext && isDef(i = i.$options._scopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook(vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) {
        i(vnode);
      }
      for (i = 0; i < cbs.destroy.length; ++i) {
        cbs.destroy[i](vnode);
      }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else {
          // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook(vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    if (process.env.NODE_ENV !== 'production') {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) {
          // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys(children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn("Duplicate keys detected: '" + key + "'. This may cause an update error.", vnode.context);
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld(node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) {
        return i;
      }
    }
  }

  function patchVnode(oldVnode, vnode, insertedVnodeQueue, ownerArray, index, removeOnly) {
    if (oldVnode === vnode) {
      return;
    }

    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // clone reused vnode
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return;
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
      vnode.componentInstance = oldVnode.componentInstance;
      return;
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) {
        cbs.update[i](oldVnode, vnode);
      }
      if (isDef(i = data.hook) && isDef(i = i.update)) {
        i(oldVnode, vnode);
      }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) {
          updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
        }
      } else if (isDef(ch)) {
        if (process.env.NODE_ENV !== 'production') {
          checkDuplicateKeys(ch);
        }
        if (isDef(oldVnode.text)) {
          nodeOps.setTextContent(elm, '');
        }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) {
        i(oldVnode, vnode);
      }
    }
  }

  function invokeInsertHook(vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || data && data.pre;
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true;
    }
    // assert node match
    if (process.env.NODE_ENV !== 'production') {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false;
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) {
        i(vnode, true /* hydrating */);
      }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true;
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false;
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break;
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false;
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break;
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true;
  }

  function assertNodeMatch(node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || !isUnknownElement$$1(vnode, inVPre) && vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase());
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3);
    }
  }

  return function patch(oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) {
        invokeDestroyHook(oldVnode);
      }
      return;
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode;
            } else if (process.env.NODE_ENV !== 'production') {
              warn('The client-side rendered virtual DOM tree is not matching ' + 'server-rendered content. This is likely caused by incorrect ' + 'HTML markup, for example nesting block-level elements inside ' + '<p>, or missing <tbody>. Bailing hydration and performing ' + 'full client-side render.');
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm = nodeOps.parentNode(oldElm);

        // create new node
        createElm(vnode, insertedVnodeQueue,
        // extremely rare edge case: do not insert if old element is in a
        // leaving transition. Only happens when combining transition +
        // keep-alive + HOCs. (#4590)
        oldElm._leaveCb ? null : parentElm, nodeOps.nextSibling(oldElm));

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm)) {
          removeVnodes(parentElm, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm;
  };
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives(vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives(oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update(oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function callInsert() {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1(dirs, vm) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res;
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res;
}

function getRawDirName(dir) {
  return dir.rawName || dir.name + "." + Object.keys(dir.modifiers || {}).join('.');
}

function callHook$1(dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, "directive " + dir.name + " " + hook + " hook");
    }
  }
}

var baseModules = [ref, directives];

/*  */

function updateAttrs(oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return;
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return;
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr(el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED' ? 'true' : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr(el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.
    /* istanbul ignore if */
    if (isIE && !isIE9 && (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') && key === 'placeholder' && !el.__ieph) {
      var blocker = function blocker(e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };
      el.addEventListener('input', blocker);
      // $flow-disable-line
      el.__ieph = true; /* IE placeholder patched */
    }
    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass(oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (isUndef(data.staticClass) && isUndef(data.class) && (isUndef(oldData) || isUndef(oldData.staticClass) && isUndef(oldData.class))) {
    return;
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters(exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) {
        inSingle = false;
      }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) {
        inDouble = false;
      }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) {
        inTemplateString = false;
      }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) {
        inRegex = false;
      }
    } else if (c === 0x7C && // pipe
    exp.charCodeAt(i + 1) !== 0x7C && exp.charCodeAt(i - 1) !== 0x7C && !curly && !square && !paren) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22:
          inDouble = true;break; // "
        case 0x27:
          inSingle = true;break; // '
        case 0x60:
          inTemplateString = true;break; // `
        case 0x28:
          paren++;break; // (
        case 0x29:
          paren--;break; // )
        case 0x5B:
          square++;break; // [
        case 0x5D:
          square--;break; // ]
        case 0x7B:
          curly++;break; // {
        case 0x7D:
          curly--;break; // }
      }
      if (c === 0x2f) {
        // /
        var j = i - 1;
        var p = void 0;
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') {
            break;
          }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter() {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression;
}

function wrapFilter(exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return "_f(\"" + filter + "\")(" + exp + ")";
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return "_f(\"" + name + "\")(" + exp + (args !== ')' ? ',' + args : args);
  }
}

/*  */

function baseWarn(msg) {
  console.error("[Vue compiler]: " + msg);
}

function pluckModuleFunction(modules, key) {
  return modules ? modules.map(function (m) {
    return m[key];
  }).filter(function (_) {
    return _;
  }) : [];
}

function addProp(el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
  el.plain = false;
}

function addAttr(el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
  el.plain = false;
}

// add a raw attr (use this in preTransforms)
function addRawAttr(el, name, value) {
  el.attrsMap[name] = value;
  el.attrsList.push({ name: name, value: value });
}

function addDirective(el, name, rawName, value, arg, modifiers) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
  el.plain = false;
}

function addHandler(el, name, value, modifiers, important, warn) {
  modifiers = modifiers || emptyObject;
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && warn && modifiers.prevent && modifiers.passive) {
    warn('passive and prevent can\'t be used together. ' + 'Passive handler can\'t prevent default event.');
  }

  // normalize click.right and click.middle since they don't actually fire
  // this is technically browser-specific, but at least for now browsers are
  // the only target envs that have right/middle clicks.
  if (name === 'click') {
    if (modifiers.right) {
      name = 'contextmenu';
      delete modifiers.right;
    } else if (modifiers.middle) {
      name = 'mouseup';
    }
  }

  // check capture modifier
  if (modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  /* istanbul ignore if */
  if (modifiers.passive) {
    delete modifiers.passive;
    name = '&' + name; // mark the event as passive
  }

  var events;
  if (modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }

  var newHandler = {
    value: value.trim()
  };
  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers;
  }

  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }

  el.plain = false;
}

function getBindingAttr(el, name, getStatic) {
  var dynamicValue = getAndRemoveAttr(el, ':' + name) || getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue);
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue);
    }
  }
}

// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.
function getAndRemoveAttr(el, name, removeFromMap) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break;
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name];
  }
  return val;
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel(el, value, modifiers) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression = "(typeof " + baseValueExpression + " === 'string'" + "? " + baseValueExpression + ".trim()" + ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: "(" + value + ")",
    expression: JSON.stringify(value),
    callback: "function (" + baseValueExpression + ") {" + assignment + "}"
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode(value, assignment) {
  var res = parseModel(value);
  if (res.key === null) {
    return value + "=" + assignment;
  } else {
    return "$set(" + res.exp + ", " + res.key + ", " + assignment + ")";
  }
}

/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */

var len, str, chr, index$1, expressionPos, expressionEndPos;

function parseModel(val) {
  // Fix https://github.com/vuejs/vue/pull/7730
  // allow v-model="obj.val " (trailing whitespace)
  val = val.trim();
  len = val.length;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index$1 = val.lastIndexOf('.');
    if (index$1 > -1) {
      return {
        exp: val.slice(0, index$1),
        key: '"' + val.slice(index$1 + 1) + '"'
      };
    } else {
      return {
        exp: val,
        key: null
      };
    }
  }

  str = val;
  index$1 = expressionPos = expressionEndPos = 0;

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  };
}

function next() {
  return str.charCodeAt(++index$1);
}

function eof() {
  return index$1 >= len;
}

function isStringStart(chr) {
  return chr === 0x22 || chr === 0x27;
}

function parseBracket(chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue;
    }
    if (chr === 0x5B) {
      inBracket++;
    }
    if (chr === 0x5D) {
      inBracket--;
    }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break;
    }
  }
}

function parseString(chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break;
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model(el, dir, _warn) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  if (process.env.NODE_ENV !== 'production') {
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1("<" + el.tag + " v-model=\"" + value + "\" type=\"file\">:\n" + "File inputs are read only. Use a v-on:change listener instead.");
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false;
  } else if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false;
  } else if (process.env.NODE_ENV !== 'production') {
    warn$1("<" + el.tag + " v-model=\"" + value + "\">: " + "v-model is not supported on this element type. " + 'If you are working with contenteditable, it\'s recommended to ' + 'wrap a library dedicated for that purpose inside a custom component.');
  }

  // ensure runtime directive metadata
  return true;
}

function genCheckboxModel(el, value, modifiers) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked', "Array.isArray(" + value + ")" + "?_i(" + value + "," + valueBinding + ")>-1" + (trueValueBinding === 'true' ? ":(" + value + ")" : ":_q(" + value + "," + trueValueBinding + ")"));
  addHandler(el, 'change', "var $$a=" + value + "," + '$$el=$event.target,' + "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" + 'if(Array.isArray($$a)){' + "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," + '$$i=_i($$a,$$v);' + "if($$el.checked){$$i<0&&(" + genAssignmentCode(value, '$$a.concat([$$v])') + ")}" + "else{$$i>-1&&(" + genAssignmentCode(value, '$$a.slice(0,$$i).concat($$a.slice($$i+1))') + ")}" + "}else{" + genAssignmentCode(value, '$$c') + "}", null, true);
}

function genRadioModel(el, value, modifiers) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? "_n(" + valueBinding + ")" : valueBinding;
  addProp(el, 'checked', "_q(" + value + "," + valueBinding + ")");
  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
}

function genSelect(el, value, modifiers) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" + ".call($event.target.options,function(o){return o.selected})" + ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" + "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + genAssignmentCode(value, assignment);
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel(el, value, modifiers) {
  var type = el.attrsMap.type;

  // warn if v-bind:value conflicts with v-model
  // except for inputs with v-bind:type
  if (process.env.NODE_ENV !== 'production') {
    var value$1 = el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
    var typeBinding = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (value$1 && !typeBinding) {
      var binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value';
      warn$1(binding + "=\"" + value$1 + "\" conflicts with v-model on the same element " + 'because the latter already expands to a value binding internally');
    }
  }

  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy ? 'change' : type === 'range' ? RANGE_TOKEN : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', "(" + value + ")");
  addHandler(el, event, code, null, true);
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents(on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler$1(event, handler, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler() {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  };
}

function add$1(event, handler, capture, passive) {
  handler = withMacroTask(handler);
  target$1.addEventListener(event, handler, supportsPassive ? { capture: capture, passive: passive } : capture);
}

function remove$2(event, handler, capture, _target) {
  (_target || target$1).removeEventListener(event, handler._withTask || handler, capture);
}

function updateDOMListeners(oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return;
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps(oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return;
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) {
        vnode.children.length = 0;
      }
      if (cur === oldProps[key]) {
        continue;
      }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue(elm, checkVal) {
  return !elm.composing && (elm.tagName === 'OPTION' || isNotInFocusAndDirty(elm, checkVal) || isDirtyWithModifiers(elm, checkVal));
}

function isNotInFocusAndDirty(elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try {
    notInFocus = document.activeElement !== elm;
  } catch (e) {}
  return notInFocus && elm.value !== checkVal;
}

function isDirtyWithModifiers(elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.lazy) {
      // inputs with lazy should only be updated when not in focus
      return false;
    }
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal);
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim();
    }
  }
  return value !== newVal;
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res;
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData(data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle ? extend(data.staticStyle, style) : style;
}

// normalize possible array / string values into Object
function normalizeStyleBinding(bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle);
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle);
  }
  return bindingStyle;
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle(vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode && childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if (styleData = normalizeStyleData(vnode.data)) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while (parentNode = parentNode.parent) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res;
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function setProp(el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && prop in emptyStyle) {
    return prop;
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name;
    }
  }
});

function updateStyle(oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) && isUndef(oldData.staticStyle) && isUndef(oldData.style)) {
    return;
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__) ? extend({}, style) : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

var whitespaceRE = /\s+/;

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) {
        return el.classList.add(c);
      });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) {
        return el.classList.remove(c);
      });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition(def$$1) {
  if (!def$$1) {
    return;
  }
  /* istanbul ignore else */
  if ((typeof def$$1 === 'undefined' ? 'undefined' : _typeof(def$$1)) === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res;
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1);
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: name + "-enter",
    enterToClass: name + "-enter-to",
    enterActiveClass: name + "-enter-active",
    leaveClass: name + "-leave",
    leaveToClass: name + "-leave-to",
    leaveActiveClass: name + "-leave-active"
  };
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout : /* istanbul ignore next */function (fn) {
  return fn();
};

function nextFrame(fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass(el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass(el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds(el, expectedType, cb) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) {
    return cb();
  }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function end() {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function onEnd(e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo(el, expectedType) {
  var styles = window.getComputedStyle(el);
  // JSDOM may return undefined for transition properties
  var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
  var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
  var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  var hasTransform = type === TRANSITION && transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  };
}

function getTimeout(delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i]);
  }));
}

// Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
// in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down (i.e. acting
// as a floor function) causing unexpected behaviors
function toMs(s) {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000;
}

/*  */

function enter(vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return;
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return;
  }

  var startClass = isAppear && appearClass ? appearClass : enterClass;
  var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
  var toClass = isAppear && appearToClass ? appearToClass : enterToClass;

  var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
  var enterHook = isAppear ? typeof appear === 'function' ? appear : enter : enter;
  var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
  var enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;

  var explicitEnterDuration = toNumber(isObject(duration) ? duration.enter : duration);

  if (process.env.NODE_ENV !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave(vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm();
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(isObject(duration) ? duration.leave : duration);

  if (process.env.NODE_ENV !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave() {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return;
    }
    // record leaving element
    if (!vnode.data.show && el.parentNode) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration(val, name, vnode) {
  if (typeof val !== 'number') {
    warn("<transition> explicit " + name + " duration is not a valid number - " + "got " + JSON.stringify(val) + ".", vnode.context);
  } else if (isNaN(val)) {
    warn("<transition> explicit " + name + " duration is NaN - " + 'the duration expression might be incorrect.', vnode.context);
  }
}

function isValidDuration(val) {
  return typeof val === 'number' && !isNaN(val);
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength(fn) {
  if (isUndef(fn)) {
    return false;
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
  } else {
    return (fn._length || fn.length) > 1;
  }
}

function _enter(_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1(vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [attrs, klass, events, domProps, style, transition];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted(el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd);
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated(el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) {
        return !looseEqual(o, prevOptions[i]);
      })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple ? binding.value.some(function (v) {
          return hasNoMatchingOption(v, curOptions);
        }) : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected(el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected(el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    process.env.NODE_ENV !== 'production' && warn("<select multiple v-model=\"" + binding.expression + "\"> " + "expects an Array value for its binding, but got " + Object.prototype.toString.call(value).slice(8, -1), vm);
    return;
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return;
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption(value, options) {
  return options.every(function (o) {
    return !looseEqual(o, value);
  });
}

function getValue(option) {
  return '_value' in option ? option._value : option.value;
}

function onCompositionStart(e) {
  e.target.composing = true;
}

function onCompositionEnd(e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) {
    return;
  }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger(el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode(vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode(vnode.componentInstance._vnode) : vnode;
}

var show = {
  bind: function bind(el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay = el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update(el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (!value === !oldValue) {
      return;
    }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind(el, binding, vnode, oldVnode, isDestroy) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show
};

/*  */

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild(vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children));
  } else {
    return vnode;
  }
}

function extractTransitionData(comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data;
}

function placeholder(h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    });
  }
}

function hasParentTransition(vnode) {
  while (vnode = vnode.parent) {
    if (vnode.data.transition) {
      return true;
    }
  }
}

function isSameChild(child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag;
}

var isNotTextNode = function isNotTextNode(c) {
  return c.tag || isAsyncPlaceholder(c);
};

var isVShowDirective = function isVShowDirective(d) {
  return d.name === 'show';
};

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render(h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return;
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(isNotTextNode);
    /* istanbul ignore if */
    if (!children.length) {
      return;
    }

    // warn multiple elements
    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
      warn('<transition> can only be used on a single element. Use ' + '<transition-group> for lists.', this.$parent);
    }

    var mode = this.mode;

    // warn invalid mode
    if (process.env.NODE_ENV !== 'production' && mode && mode !== 'in-out' && mode !== 'out-in') {
      warn('invalid <transition> mode: ' + mode, this.$parent);
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild;
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild;
    }

    if (this._leaving) {
      return placeholder(h, rawChild);
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + this._uid + "-";
    child.key = child.key == null ? child.isComment ? id + 'comment' : id + child.tag : isPrimitive(child.key) ? String(child.key).indexOf(id) === 0 ? child.key : id + child.key : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild) && !isAsyncPlaceholder(oldChild) &&
    // #6687 component root is a comment node
    !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild);
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild;
        }
        var delayedLeave;
        var performLeave = function performLeave() {
          delayedLeave();
        };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
          delayedLeave = leave;
        });
      }
    }

    return rawChild;
  }
};

/*  */

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  beforeMount: function beforeMount() {
    var this$1 = this;

    var update = this._update;
    this._update = function (vnode, hydrating) {
      var restoreActiveInstance = setActiveInstance(this$1);
      // force removing pass
      this$1.__patch__(this$1._vnode, this$1.kept, false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
      );
      this$1._vnode = this$1.kept;
      restoreActiveInstance();
      update.call(this$1, vnode, hydrating);
    };
  },

  render: function render(h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c;(c.data || (c.data = {})).transition = transitionData;
        } else if (process.env.NODE_ENV !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? opts.Ctor.options.name || opts.tag || '' : c.tag;
          warn("<transition-group> children must be keyed: <" + name + ">");
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children);
  },

  updated: function updated() {
    var children = this.prevChildren;
    var moveClass = this.moveClass || (this.name || 'v') + '-move';
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return;
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb(e) {
          if (e && e.target !== el) {
            return;
          }
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove(el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false;
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove;
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) {
          removeClass(clone, cls);
        });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return this._hasMove = info.hasTransform;
    }
  }
};

function callPendingCbs(c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition(c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation(c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue.prototype.$mount = function (el, hydrating) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating);
};

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test' && isChrome) {
        console[console.info ? 'info' : 'log']('Download the Vue Devtools extension for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
      }
    }
    if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test' && config.productionTip !== false && typeof console !== 'undefined') {
      console[console.info ? 'info' : 'log']("You are running Vue in development mode.\n" + "Make sure to turn on production mode when deploying for production.\n" + "See more tips at https://vuejs.org/guide/deployment.html");
    }
  }, 0);
}

/*  */

var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g');
});

function parseText(text, delimiters) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return;
  }
  var tokens = [];
  var rawTokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index, tokenValue;
  while (match = tagRE.exec(text)) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      rawTokens.push(tokenValue = text.slice(lastIndex, index));
      tokens.push(JSON.stringify(tokenValue));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push("_s(" + exp + ")");
    rawTokens.push({ '@binding': exp });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex));
    tokens.push(JSON.stringify(tokenValue));
  }
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  };
}

/*  */

function transformNode(el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if (process.env.NODE_ENV !== 'production' && staticClass) {
    var res = parseText(staticClass, options.delimiters);
    if (res) {
      warn("class=\"" + staticClass + "\": " + 'Interpolation inside attributes has been removed. ' + 'Use v-bind or the colon shorthand instead. For example, ' + 'instead of <div class="{{ val }}">, use <div :class="val">.');
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData(el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + el.staticClass + ",";
  }
  if (el.classBinding) {
    data += "class:" + el.classBinding + ",";
  }
  return data;
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData
};

/*  */

function transformNode$1(el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      var res = parseText(staticStyle, options.delimiters);
      if (res) {
        warn("style=\"" + staticStyle + "\": " + 'Interpolation inside attributes has been removed. ' + 'Use v-bind or the colon shorthand instead. For example, ' + 'instead of <div style="{{ val }}">, use <div :style="val">.');
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1(el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + el.staticStyle + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + el.styleBinding + "),";
  }
  return data;
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
};

/*  */

var decoder;

var he = {
  decode: function decode(html) {
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent;
  }
};

/*  */

var isUnaryTag = makeMap('area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' + 'link,meta,param,source,track,wbr');

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source');

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap('address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' + 'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' + 'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' + 'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' + 'title,tr,track');

/**
 * Not type-checking this file because it's mostly vendor code.
 */

// Regular Expressions for parsing tags and attributes
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp("^<" + qnameCapture);
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp("^<\\/" + qnameCapture + "[^>]*>");
var doctype = /^<!DOCTYPE [^>]+>/i;
// #7298: escape - to avoid being pased as HTML comment when inlined in page
var comment = /^<!\--/;
var conditionalComment = /^<!\[/;

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10|#9);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function shouldIgnoreFirstNewline(tag, html) {
  return tag && isIgnoreNewlineTag(tag) && html[0] === '\n';
};

function decodeAttr(value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) {
    return decodingMap[match];
  });
}

function parseHTML(html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd));
            }
            advance(commentEnd + 3);
            continue;
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue;
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue;
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue;
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
            advance(1);
          }
          continue;
        }
      }

      var text = void 0,
          rest = void 0,
          next = void 0;
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (!endTag.test(rest) && !startTagOpen.test(rest) && !comment.test(rest) && !conditionalComment.test(rest)) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) {
            break;
          }
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text.replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
          .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }
        if (options.chars) {
          options.chars(text);
        }
        return '';
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if (process.env.NODE_ENV !== 'production' && !stack.length && options.warn) {
        options.warn("Mal-formatted tag at end of template: \"" + html + "\"");
      }
      break;
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance(n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag() {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match;
      }
    }
  }

  function handleStartTag(match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      var value = args[3] || args[4] || args[5] || '';
      var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href' ? options.shouldDecodeNewlinesForHref : options.shouldDecodeNewlines;
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag(tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) {
      start = index;
    }
    if (end == null) {
      end = index;
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break;
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (process.env.NODE_ENV !== 'production' && (i > pos || !tagName) && options.warn) {
          options.warn("tag <" + stack[i].tag + "> has no matching end tag.");
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var stripParensRE = /^\(|\)$/g;

var argRE = /:(.*)$/;
var bindRE = /^:|^v-bind:/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(he.decode);

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;

function createASTElement(tag, attrs, parent) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    parent: parent,
    children: []
  };
}

/**
 * Convert HTML string to AST.
 */
function parse(template, options) {
  warn$2 = options.warn || baseWarn;

  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce(msg) {
    if (!warned) {
      warned = true;
      warn$2(msg);
    }
  }

  function closeElement(element) {
    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
    // apply post-transforms
    for (var i = 0; i < postTransforms.length; i++) {
      postTransforms[i](element, options);
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    start: function start(tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = currentParent && currentParent.ns || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = createASTElement(tag, attrs, currentParent);
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        process.env.NODE_ENV !== 'production' && warn$2('Templates should only be responsible for mapping the state to the ' + 'UI. Avoid placing tags with side-effects in your templates, such as ' + "<" + tag + ">" + ', as they will not be parsed.');
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        // structural directives
        processFor(element);
        processIf(element);
        processOnce(element);
        // element-scope stuff
        processElement(element, options);
      }

      function checkRootConstraints(el) {
        if (process.env.NODE_ENV !== 'production') {
          if (el.tag === 'slot' || el.tag === 'template') {
            warnOnce("Cannot use <" + el.tag + "> as component root element because it may " + 'contain multiple nodes.');
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warnOnce('Cannot use v-for on stateful component root element because ' + 'it renders multiple elements.');
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else if (process.env.NODE_ENV !== 'production') {
          warnOnce("Component template should contain exactly one root element. " + "If you are using v-if on multiple elements, " + "use v-else-if to chain them instead.");
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) {
          // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        closeElement(element);
      }
    },

    end: function end() {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      closeElement(element);
    },

    chars: function chars(text) {
      if (!currentParent) {
        if (process.env.NODE_ENV !== 'production') {
          if (text === template) {
            warnOnce('Component template requires a root element, rather than just text.');
          } else if (text = text.trim()) {
            warnOnce("text \"" + text + "\" outside root element will be ignored.");
          }
        }
        return;
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE && currentParent.tag === 'textarea' && currentParent.attrsMap.placeholder === text) {
        return;
      }
      var children = currentParent.children;
      text = inPre || text.trim() ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
      // only preserve whitespace if its not right after a starting tag
      : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var res;
        if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: res.expression,
            tokens: res.tokens,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    },
    comment: function comment(text) {
      currentParent.children.push({
        type: 3,
        text: text,
        isComment: true
      });
    }
  });
  return root;
}

function processPre(el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs(el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processElement(element, options) {
  processKey(element);

  // determine whether this is a plain element after
  // removing structural attributes
  element.plain = !element.key && !element.attrsList.length;

  processRef(element);
  processSlot(element);
  processComponent(element);
  for (var i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element;
  }
  processAttrs(element);
}

function processKey(el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if (process.env.NODE_ENV !== 'production') {
      if (el.tag === 'template') {
        warn$2("<template> cannot be keyed. Place the key on real elements instead.");
      }
      if (el.for) {
        var iterator = el.iterator2 || el.iterator1;
        var parent = el.parent;
        if (iterator && iterator === exp && parent && parent.tag === 'transition-group') {
          warn$2("Do not use v-for index as key on <transition-group> children, " + "this is the same as not using keys.");
        }
      }
    }
    el.key = exp;
  }
}

function processRef(el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor(el) {
  var exp;
  if (exp = getAndRemoveAttr(el, 'v-for')) {
    var res = parseFor(exp);
    if (res) {
      extend(el, res);
    } else if (process.env.NODE_ENV !== 'production') {
      warn$2("Invalid v-for expression: " + exp);
    }
  }
}

function parseFor(exp) {
  var inMatch = exp.match(forAliasRE);
  if (!inMatch) {
    return;
  }
  var res = {};
  res.for = inMatch[2].trim();
  var alias = inMatch[1].trim().replace(stripParensRE, '');
  var iteratorMatch = alias.match(forIteratorRE);
  if (iteratorMatch) {
    res.alias = alias.replace(forIteratorRE, '').trim();
    res.iterator1 = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim();
    }
  } else {
    res.alias = alias;
  }
  return res;
}

function processIf(el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions(el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else if (process.env.NODE_ENV !== 'production') {
    warn$2("v-" + (el.elseif ? 'else-if="' + el.elseif + '"' : 'else') + " " + "used on element <" + el.tag + "> without corresponding v-if.");
  }
}

function findPrevElement(children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i];
    } else {
      if (process.env.NODE_ENV !== 'production' && children[i].text !== ' ') {
        warn$2("text \"" + children[i].text.trim() + "\" between v-if and v-else(-if) " + "will be ignored.");
      }
      children.pop();
    }
  }
}

function addIfCondition(el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce(el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

function processSlot(el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if (process.env.NODE_ENV !== 'production' && el.key) {
      warn$2("`key` does not work on <slot> because slots are abstract outlets " + "and can possibly expand into multiple elements. " + "Use the key on a wrapping element instead.");
    }
  } else {
    var slotScope;
    if (el.tag === 'template') {
      slotScope = getAndRemoveAttr(el, 'scope');
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && slotScope) {
        warn$2("the \"scope\" attribute for scoped slots have been deprecated and " + "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " + "can also be used on plain elements in addition to <template> to " + "denote scoped slots.", true);
      }
      el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
    } else if (slotScope = getAndRemoveAttr(el, 'slot-scope')) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && el.attrsMap['v-for']) {
        warn$2("Ambiguous combined usage of slot-scope and v-for on <" + el.tag + "> " + "(v-for takes higher priority). Use a wrapper <template> for the " + "scoped slot to make it clearer.", true);
      }
      el.slotScope = slotScope;
    }
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
      // preserve slot as an attribute for native shadow DOM compat
      // only for non-scoped slots.
      if (el.tag !== 'template' && !el.slotScope) {
        addAttr(el, 'slot', slotTarget);
      }
    }
  }
}

function processComponent(el) {
  var binding;
  if (binding = getBindingAttr(el, 'is')) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs(el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) {
        // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (process.env.NODE_ENV !== 'production' && value.trim().length === 0) {
          warn$2("The value for a v-bind expression cannot be empty. Found in \"v-bind:" + name + "\"");
        }
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') {
              name = 'innerHTML';
            }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            addHandler(el, "update:" + camelize(name), genAssignmentCode(value, "$event"));
          }
        }
        if (isProp || !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) {
        // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers, false, warn$2);
      } else {
        // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if (process.env.NODE_ENV !== 'production' && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      if (process.env.NODE_ENV !== 'production') {
        var res = parseText(value, delimiters);
        if (res) {
          warn$2(name + "=\"" + value + "\": " + 'Interpolation inside attributes has been removed. ' + 'Use v-bind or the colon shorthand instead. For example, ' + 'instead of <div id="{{ val }}">, use <div :id="val">.');
        }
      }
      addAttr(el, name, JSON.stringify(value));
      // #6887 firefox doesn't update muted state if set via attribute
      // even immediately after element creation
      if (!el.component && name === 'muted' && platformMustUseProp(el.tag, el.attrsMap.type, name)) {
        addProp(el, name, 'true');
      }
    }
  }
}

function checkInFor(el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true;
    }
    parent = parent.parent;
  }
  return false;
}

function parseModifiers(name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) {
      ret[m.slice(1)] = true;
    });
    return ret;
  }
}

function makeAttrsMap(attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (process.env.NODE_ENV !== 'production' && map[attrs[i].name] && !isIE && !isEdge) {
      warn$2('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map;
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag(el) {
  return el.tag === 'script' || el.tag === 'style';
}

function isForbiddenTag(el) {
  return el.tag === 'style' || el.tag === 'script' && (!el.attrsMap.type || el.attrsMap.type === 'text/javascript');
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug(attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res;
}

function checkForAliasModel(el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2("<" + el.tag + " v-model=\"" + value + "\">: " + "You are binding v-model directly to a v-for iteration alias. " + "This will not be able to modify the v-for source array because " + "writing to the alias is like modifying a function local variable. " + "Consider using an array of objects and use v-model on an object property instead.");
    }
    _el = _el.parent;
  }
}

/*  */

function preTransformNode(el, options) {
  if (el.tag === 'input') {
    var map = el.attrsMap;
    if (!map['v-model']) {
      return;
    }

    var typeBinding;
    if (map[':type'] || map['v-bind:type']) {
      typeBinding = getBindingAttr(el, 'type');
    }
    if (!map.type && !typeBinding && map['v-bind']) {
      typeBinding = "(" + map['v-bind'] + ").type";
    }

    if (typeBinding) {
      var ifCondition = getAndRemoveAttr(el, 'v-if', true);
      var ifConditionExtra = ifCondition ? "&&(" + ifCondition + ")" : "";
      var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
      var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
      // 1. checkbox
      var branch0 = cloneASTElement(el);
      // process for on the main node
      processFor(branch0);
      addRawAttr(branch0, 'type', 'checkbox');
      processElement(branch0, options);
      branch0.processed = true; // prevent it from double-processed
      branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
      addIfCondition(branch0, {
        exp: branch0.if,
        block: branch0
      });
      // 2. add radio else-if condition
      var branch1 = cloneASTElement(el);
      getAndRemoveAttr(branch1, 'v-for', true);
      addRawAttr(branch1, 'type', 'radio');
      processElement(branch1, options);
      addIfCondition(branch0, {
        exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
        block: branch1
      });
      // 3. other
      var branch2 = cloneASTElement(el);
      getAndRemoveAttr(branch2, 'v-for', true);
      addRawAttr(branch2, ':type', typeBinding);
      processElement(branch2, options);
      addIfCondition(branch0, {
        exp: ifCondition,
        block: branch2
      });

      if (hasElse) {
        branch0.else = true;
      } else if (elseIfCondition) {
        branch0.elseif = elseIfCondition;
      }

      return branch0;
    }
  }
}

function cloneASTElement(el) {
  return createASTElement(el.tag, el.attrsList.slice(), el.parent);
}

var model$1 = {
  preTransformNode: preTransformNode
};

var modules$1 = [klass$1, style$1, model$1];

/*  */

function text(el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', "_s(" + dir.value + ")");
  }
}

/*  */

function html(el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', "_s(" + dir.value + ")");
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize(root, options) {
  if (!root) {
    return;
  }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1(keys) {
  return makeMap('type,tag,attrsList,attrsMap,plain,parent,children,attrs' + (keys ? ',' + keys : ''));
}

function markStatic$1(node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (!isPlatformReservedTag(node.tag) && node.tag !== 'slot' && node.attrsMap['inline-template'] == null) {
      return;
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots(node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(node.children.length === 1 && node.children[0].type === 3)) {
      node.staticRoot = true;
      return;
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic(node) {
  if (node.type === 2) {
    // expression
    return false;
  }
  if (node.type === 3) {
    // text
    return true;
  }
  return !!(node.pre || !node.hasBindings && // no dynamic bindings
  !node.if && !node.for && // not v-if or v-for or v-else
  !isBuiltInTag(node.tag) && // not a built-in
  isPlatformReservedTag(node.tag) && // not a component
  !isDirectChildOfTemplateFor(node) && Object.keys(node).every(isStaticKey));
}

function isDirectChildOfTemplateFor(node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false;
    }
    if (node.for) {
      return true;
    }
  }
  return false;
}

/*  */

var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;

// KeyboardEvent.keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// KeyboardEvent.key aliases
var keyNames = {
  // #7880: IE11 and Edge use `Esc` for Escape key name.
  esc: ['Esc', 'Escape'],
  tab: 'Tab',
  enter: 'Enter',
  // #9112: IE11 uses `Spacebar` for Space key name.
  space: [' ', 'Spacebar'],
  // #7806: IE11 uses key names without `Arrow` prefix for arrow keys.
  up: ['Up', 'ArrowUp'],
  left: ['Left', 'ArrowLeft'],
  right: ['Right', 'ArrowRight'],
  down: ['Down', 'ArrowDown'],
  // #9112: IE11 uses `Del` for Delete key name.
  'delete': ['Backspace', 'Delete', 'Del']
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function genGuard(condition) {
  return "if(" + condition + ")return null;";
};

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers(events, isNative) {
  var res = isNative ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    res += "\"" + name + "\":" + genHandler(name, events[name]) + ",";
  }
  return res.slice(0, -1) + '}';
}

function genHandler(name, handler) {
  if (!handler) {
    return 'function(){}';
  }

  if (Array.isArray(handler)) {
    return "[" + handler.map(function (handler) {
      return genHandler(name, handler);
    }).join(',') + "]";
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    if (isMethodPath || isFunctionExpression) {
      return handler.value;
    }
    return "function($event){" + handler.value + "}"; // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else if (key === 'exact') {
        var modifiers = handler.modifiers;
        genModifierCode += genGuard(['ctrl', 'shift', 'alt', 'meta'].filter(function (keyModifier) {
          return !modifiers[keyModifier];
        }).map(function (keyModifier) {
          return "$event." + keyModifier + "Key";
        }).join('||'));
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath ? "return " + handler.value + "($event)" : isFunctionExpression ? "return (" + handler.value + ")($event)" : handler.value;
    return "function($event){" + code + handlerCode + "}";
  }
}

function genKeyFilter(keys) {
  return "if(!('button' in $event)&&" + keys.map(genFilterCode).join('&&') + ")return null;";
}

function genFilterCode(key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return "$event.keyCode!==" + keyVal;
  }
  var keyCode = keyCodes[key];
  var keyName = keyNames[key];
  return "_k($event.keyCode," + JSON.stringify(key) + "," + JSON.stringify(keyCode) + "," + "$event.key," + "" + JSON.stringify(keyName) + ")";
}

/*  */

function on(el, dir) {
  if (process.env.NODE_ENV !== 'production' && dir.modifiers) {
    warn("v-on without argument does not support modifiers.");
  }
  el.wrapListeners = function (code) {
    return "_g(" + code + "," + dir.value + ")";
  };
}

/*  */

function bind$1(el, dir) {
  el.wrapData = function (code) {
    return "_b(" + code + ",'" + el.tag + "'," + dir.value + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")";
  };
}

/*  */

var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
};

/*  */

var CodegenState = function CodegenState(options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) {
    return !(isReservedTag(el.tag) && !el.component);
  };
  this.onceId = 0;
  this.staticRenderFns = [];
  this.pre = false;
};

function generate(ast, options) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: "with(this){return " + code + "}",
    staticRenderFns: state.staticRenderFns
  };
}

function genElement(el, state) {
  if (el.parent) {
    el.pre = el.pre || el.parent.pre;
  }

  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state);
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state);
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state);
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state);
  } else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
    return genChildren(el, state) || 'void 0';
  } else if (el.tag === 'slot') {
    return genSlot(el, state);
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data;
      if (!el.plain || el.pre && state.maybeComponent(el)) {
        data = genData$2(el, state);
      }

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + el.tag + "'" + (data ? "," + data : '') + (children ? "," + children : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code;
  }
}

// hoist static sub-trees out
function genStatic(el, state) {
  el.staticProcessed = true;
  // Some elements (templates) need to behave differently inside of a v-pre
  // node.  All pre nodes are static roots, so we can use this as a location to
  // wrap a state change and reset it upon exiting the pre node.
  var originalPreState = state.pre;
  if (el.pre) {
    state.pre = el.pre;
  }
  state.staticRenderFns.push("with(this){return " + genElement(el, state) + "}");
  state.pre = originalPreState;
  return "_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")";
}

// v-once
function genOnce(el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state);
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break;
      }
      parent = parent.parent;
    }
    if (!key) {
      process.env.NODE_ENV !== 'production' && state.warn("v-once can only be used inside v-for that is keyed. ");
      return genElement(el, state);
    }
    return "_o(" + genElement(el, state) + "," + state.onceId++ + "," + key + ")";
  } else {
    return genStatic(el, state);
  }
}

function genIf(el, state, altGen, altEmpty) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty);
}

function genIfConditions(conditions, state, altGen, altEmpty) {
  if (!conditions.length) {
    return altEmpty || '_e()';
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return "(" + condition.exp + ")?" + genTernaryExp(condition.block) + ":" + genIfConditions(conditions, state, altGen, altEmpty);
  } else {
    return "" + genTernaryExp(condition.block);
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp(el) {
    return altGen ? altGen(el, state) : el.once ? genOnce(el, state) : genElement(el, state);
  }
}

function genFor(el, state, altGen, altHelper) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? "," + el.iterator1 : '';
  var iterator2 = el.iterator2 ? "," + el.iterator2 : '';

  if (process.env.NODE_ENV !== 'production' && state.maybeComponent(el) && el.tag !== 'slot' && el.tag !== 'template' && !el.key) {
    state.warn("<" + el.tag + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " + "v-for should have explicit keys. " + "See https://vuejs.org/guide/list.html#key for more info.", true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," + "function(" + alias + iterator1 + iterator2 + "){" + "return " + (altGen || genElement)(el, state) + '})';
}

function genData$2(el, state) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) {
    data += dirs + ',';
  }

  // key
  if (el.key) {
    data += "key:" + el.key + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + el.ref + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + el.tag + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + genProps(el.attrs) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + genProps(el.props) + "},";
  }
  // event handlers
  if (el.events) {
    data += genHandlers(el.events, false) + ",";
  }
  if (el.nativeEvents) {
    data += genHandlers(el.nativeEvents, true) + ",";
  }
  // slot target
  // only for non-scoped slots
  if (el.slotTarget && !el.slotScope) {
    data += "slot:" + el.slotTarget + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += genScopedSlots(el.scopedSlots, state) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + el.model.value + ",callback:" + el.model.callback + ",expression:" + el.model.expression + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data;
}

function genDirectives(el, state) {
  var dirs = el.directives;
  if (!dirs) {
    return;
  }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + dir.name + "\",rawName:\"" + dir.rawName + "\"" + (dir.value ? ",value:(" + dir.value + "),expression:" + JSON.stringify(dir.value) : '') + (dir.arg ? ",arg:\"" + dir.arg + "\"" : '') + (dir.modifiers ? ",modifiers:" + JSON.stringify(dir.modifiers) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']';
  }
}

function genInlineTemplate(el, state) {
  var ast = el.children[0];
  if (process.env.NODE_ENV !== 'production' && (el.children.length !== 1 || ast.type !== 1)) {
    state.warn('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return "inlineTemplate:{render:function(){" + inlineRenderFns.render + "},staticRenderFns:[" + inlineRenderFns.staticRenderFns.map(function (code) {
      return "function(){" + code + "}";
    }).join(',') + "]}";
  }
}

function genScopedSlots(slots, state) {
  return "scopedSlots:_u([" + Object.keys(slots).map(function (key) {
    return genScopedSlot(key, slots[key], state);
  }).join(',') + "])";
}

function genScopedSlot(key, el, state) {
  if (el.for && !el.forProcessed) {
    return genForScopedSlot(key, el, state);
  }
  var fn = "function(" + String(el.slotScope) + "){" + "return " + (el.tag === 'template' ? el.if ? "(" + el.if + ")?" + (genChildren(el, state) || 'undefined') + ":undefined" : genChildren(el, state) || 'undefined' : genElement(el, state)) + "}";
  return "{key:" + key + ",fn:" + fn + "}";
}

function genForScopedSlot(key, el, state) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? "," + el.iterator1 : '';
  var iterator2 = el.iterator2 ? "," + el.iterator2 : '';
  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," + "function(" + alias + iterator1 + iterator2 + "){" + "return " + genScopedSlot(key, el, state) + '})';
}

function genChildren(el, state, checkSkip, altGenElement, altGenNode) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 && el$1.for && el$1.tag !== 'template' && el$1.tag !== 'slot') {
      var normalizationType = checkSkip ? state.maybeComponent(el$1) ? ",1" : ",0" : "";
      return "" + (altGenElement || genElement)(el$1, state) + normalizationType;
    }
    var normalizationType$1 = checkSkip ? getNormalizationType(children, state.maybeComponent) : 0;
    var gen = altGenNode || genNode;
    return "[" + children.map(function (c) {
      return gen(c, state);
    }).join(',') + "]" + (normalizationType$1 ? "," + normalizationType$1 : '');
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType(children, maybeComponent) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue;
    }
    if (needsNormalization(el) || el.ifConditions && el.ifConditions.some(function (c) {
      return needsNormalization(c.block);
    })) {
      res = 2;
      break;
    }
    if (maybeComponent(el) || el.ifConditions && el.ifConditions.some(function (c) {
      return maybeComponent(c.block);
    })) {
      res = 1;
    }
  }
  return res;
}

function needsNormalization(el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot';
}

function genNode(node, state) {
  if (node.type === 1) {
    return genElement(node, state);
  } else if (node.type === 3 && node.isComment) {
    return genComment(node);
  } else {
    return genText(node);
  }
}

function genText(text) {
  return "_v(" + (text.type === 2 ? text.expression // no need for () because already wrapped in _s()
  : transformSpecialNewlines(JSON.stringify(text.text))) + ")";
}

function genComment(comment) {
  return "_e(" + JSON.stringify(comment.text) + ")";
}

function genSlot(el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? "," + children : '');
  var attrs = el.attrs && "{" + el.attrs.map(function (a) {
    return camelize(a.name) + ":" + a.value;
  }).join(',') + "}";
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')';
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent(componentName, el, state) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return "_c(" + componentName + "," + genData$2(el, state) + (children ? "," + children : '') + ")";
}

function genProps(props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    /* istanbul ignore if */
    {
      res += "\"" + prop.name + "\":" + transformSpecialNewlines(prop.value) + ",";
    }
  }
  return res.slice(0, -1);
}

// #3895, #4268
function transformSpecialNewlines(text) {
  return text.replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
}

/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + ('do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' + 'super,throw,while,yield,delete,export,import,return,switch,default,' + 'extends,finally,continue,debugger,function,arguments').split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + 'delete,typeof,void'.split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors(ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors;
}

function checkNode(node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, "v-for=\"" + value + "\"", errors);
          } else if (onRE.test(name)) {
            checkEvent(value, name + "=\"" + value + "\"", errors);
          } else {
            checkExpression(value, name + "=\"" + value + "\"", errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkEvent(exp, text, errors) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);
  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    errors.push("avoid using JavaScript unary operator as property name: " + "\"" + keywordMatch[0] + "\" in expression " + text.trim());
  }
  checkExpression(exp, text, errors);
}

function checkFor(node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier(ident, type, text, errors) {
  if (typeof ident === 'string') {
    try {
      new Function("var " + ident + "=_");
    } catch (e) {
      errors.push("invalid " + type + " \"" + ident + "\" in expression: " + text.trim());
    }
  }
}

function checkExpression(exp, text, errors) {
  try {
    new Function("return " + exp);
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push("avoid using JavaScript keyword as property name: " + "\"" + keywordMatch[0] + "\"\n  Raw expression: " + text.trim());
    } else {
      errors.push("invalid expression: " + e.message + " in\n\n" + "    " + exp + "\n\n" + "  Raw expression: " + text.trim() + "\n");
    }
  }
}

/*  */

function createFunction(code, errors) {
  try {
    return new Function(code);
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop;
  }
}

function createCompileToFunctionFn(compile) {
  var cache = Object.create(null);

  return function compileToFunctions(template, options, vm) {
    options = extend({}, options);
    var warn$$1 = options.warn || warn;
    delete options.warn;

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn$$1('It seems you are using the standalone build of Vue.js in an ' + 'environment with Content Security Policy that prohibits unsafe-eval. ' + 'The template compiler cannot work in this environment. Consider ' + 'relaxing the policy to allow unsafe-eval or pre-compiling your ' + 'templates into render functions.');
        }
      }
    }

    // check cache
    var key = options.delimiters ? String(options.delimiters) + template : template;
    if (cache[key]) {
      return cache[key];
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    if (process.env.NODE_ENV !== 'production') {
      if (compiled.errors && compiled.errors.length) {
        warn$$1("Error compiling template:\n\n" + template + "\n\n" + compiled.errors.map(function (e) {
          return "- " + e;
        }).join('\n') + '\n', vm);
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) {
          return tip(msg, vm);
        });
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors);
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn$$1("Failed to generate render function:\n\n" + fnGenErrors.map(function (ref) {
          var err = ref.err;
          var code = ref.code;

          return err.toString() + " in\n\n" + code + "\n";
        }).join('\n'), vm);
      }
    }

    return cache[key] = res;
  };
}

/*  */

function createCompilerCreator(baseCompile) {
  return function createCompiler(baseOptions) {
    function compile(template, options) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];
      finalOptions.warn = function (msg, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        // merge custom modules
        if (options.modules) {
          finalOptions.modules = (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(Object.create(baseOptions.directives || null), options.directives);
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      var compiled = baseCompile(template, finalOptions);
      if (process.env.NODE_ENV !== 'production') {
        errors.push.apply(errors, detectErrors(compiled.ast));
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled;
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    };
  };
}

/*  */

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler = createCompilerCreator(function baseCompile(template, options) {
  var ast = parse(template.trim(), options);
  if (options.optimize !== false) {
    optimize(ast, options);
  }
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  };
});

/*  */

var ref$1 = createCompiler(baseOptions);
var compile = ref$1.compile;
var compileToFunctions = ref$1.compileToFunctions;

/*  */

// check whether current browser encodes a char inside attribute values
var div;
function getShouldDecode(href) {
  div = div || document.createElement('div');
  div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
  return div.innerHTML.indexOf('&#10;') > 0;
}

// #3663: IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
// #6828: chrome encodes content in a[href]
var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML;
});

var mount = Vue.prototype.$mount;
Vue.prototype.$mount = function (el, hydrating) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn("Do not mount Vue to <html> or <body> - mount to normal elements instead.");
    return this;
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn("Template element not found or is empty: " + options.template, this);
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this);
        }
        return this;
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile end');
        measure("vue " + this._name + " compile", 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating);
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML(el) {
  if (el.outerHTML) {
    return el.outerHTML;
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML;
  }
}

Vue.compile = compileToFunctions;

module.exports = Vue;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(1), __webpack_require__(11).setImmediate))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = typeof global !== "undefined" && global || typeof self !== "undefined" && self || window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function () {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function () {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout = exports.clearInterval = function (timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function () {};
Timeout.prototype.close = function () {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function (item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function (item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function (item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout) item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(12);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = typeof self !== "undefined" && self.setImmediate || typeof global !== "undefined" && global.setImmediate || this && this.setImmediate;
exports.clearImmediate = typeof self !== "undefined" && self.clearImmediate || typeof global !== "undefined" && global.clearImmediate || this && this.clearImmediate;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
        // Callback can either be a function or a string
        if (typeof callback !== "function") {
            callback = new Function("" + callback);
        }
        // Copy function arguments
        var args = new Array(arguments.length - 1);
        for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i + 1];
        }
        // Store and register the task
        var task = { callback: callback, args: args };
        tasksByHandle[nextHandle] = task;
        registerImmediate(nextHandle);
        return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
            case 0:
                callback();
                break;
            case 1:
                callback(args[0]);
                break;
            case 2:
                callback(args[0], args[1]);
                break;
            case 3:
                callback(args[0], args[1], args[2]);
                break;
            default:
                callback.apply(undefined, args);
                break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function registerImmediate(handle) {
            process.nextTick(function () {
                runIfPresent(handle);
            });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function () {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function onGlobalMessage(event) {
            if (event.source === global && typeof event.data === "string" && event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function registerImmediate(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function (event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function registerImmediate(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function registerImmediate(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function registerImmediate(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();
    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();
    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();
    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();
    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
})(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (a, t) {
  "object" == ( false ? "undefined" : _typeof(exports)) && "object" == ( false ? "undefined" : _typeof(module)) ? module.exports = t() :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.VueTagEditorSet = t() : a.VueTagEditorSet = t();
}("undefined" != typeof self ? self : this, function () {
  return function (a) {
    function t(n) {
      if (e[n]) return e[n].exports;var i = e[n] = { i: n, l: !1, exports: {} };return a[n].call(i.exports, i, i.exports, t), i.l = !0, i.exports;
    }var e = {};return t.m = a, t.c = e, t.d = function (a, e, n) {
      t.o(a, e) || Object.defineProperty(a, e, { configurable: !1, enumerable: !0, get: n });
    }, t.n = function (a) {
      var e = a && a.__esModule ? function () {
        return a.default;
      } : function () {
        return a;
      };return t.d(e, "a", e), e;
    }, t.o = function (a, t) {
      return Object.prototype.hasOwnProperty.call(a, t);
    }, t.p = "./dist/", t(t.s = 13);
  }([function (a, t) {
    a.exports = function (a, t, e, n, i, r) {
      var o,
          d = a = a || {},
          s = _typeof(a.default);"object" !== s && "function" !== s || (o = a, d = a.default);var l = "function" == typeof d ? d.options : d;t && (l.render = t.render, l.staticRenderFns = t.staticRenderFns, l._compiled = !0), e && (l.functional = !0), i && (l._scopeId = i);var b;if (r ? (b = function b(a) {
        a = a || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, a || "undefined" == typeof __VUE_SSR_CONTEXT__ || (a = __VUE_SSR_CONTEXT__), n && n.call(this, a), a && a._registeredComponents && a._registeredComponents.add(r);
      }, l._ssrRegister = b) : n && (b = n), b) {
        var c = l.functional,
            v = c ? l.render : l.beforeCreate;c ? (l._injectStyles = b, l.render = function (a, t) {
          return b.call(t), v(a, t);
        }) : l.beforeCreate = v ? [].concat(v, b) : [b];
      }return { esModule: o, exports: d, options: l };
    };
  }, function (a, t) {
    var e;e = function () {
      return this;
    }();try {
      e = e || Function("return this")() || (0, eval)("this");
    } catch (a) {
      "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && (e = window);
    }a.exports = e;
  }, function (a, t, e) {
    "use strict";
    var n = e(3),
        i = e(4);t.a = { name: "VueTagEditor", components: { Tags: i.a }, props: { tags: { type: Array, default: function _default() {
            return [];
          }, required: !1 }, type: { type: String, default: "label", required: !1 }, tagAreaClass: { type: String, default: "", required: !1 }, tagContentClass: { type: String, default: "", required: !1 }, deleteAreaClass: { type: String, default: "", required: !1 }, deleteContentClass: { type: String, default: "", required: !1 }, inputContentClass: { type: String, default: "", required: !1 }, tagCustomClass: { type: String, default: "", required: !1 }, placeholder: { type: String, default: " Add tags...", required: !1 } }, data: function data() {
        return { tag: "", isAddTag: !1, eventHub: new n.a() };
      }, mounted: function mounted() {
        this.eventHub.$on("click-tag", this._emitClickTag), this.eventHub.$on("delete-tag", this._emitDeleteTag);
      }, methods: { inputTagWithEmit: function inputTagWithEmit() {
          var a = this,
              t = this.tag;this._enableAdd(this.tag) && (this.tags.push(this.tag), this.isAddTag = !0), this.tag = null, this.$nextTick(function () {
            a.$emit("handler-after-input-tag", t, a.isAddTag), a.isAddTag = !1;
          });
        }, _enableAdd: function _enableAdd(a) {
          return -1 == this.tags.indexOf(a) && void 0 != a || "";
        }, _emitClickTag: function _emitClickTag(a) {
          this.$emit("handler-after-click-tag", a);
        }, _emitDeleteTag: function _emitDeleteTag(a) {
          this.$emit("handler-after-delete-tag", a);
        } } };
  }, function (a, t, e) {
    "use strict";
    (function (a, e) {
      function n(a) {
        return void 0 === a || null === a;
      }function i(a) {
        return void 0 !== a && null !== a;
      }function r(a) {
        return !0 === a;
      }function o(a) {
        return !1 === a;
      }function d(a) {
        return "string" == typeof a || "number" == typeof a || "symbol" == (typeof a === "undefined" ? "undefined" : _typeof(a)) || "boolean" == typeof a;
      }function s(a) {
        return null !== a && "object" == (typeof a === "undefined" ? "undefined" : _typeof(a));
      }function l(a) {
        return "[object Object]" === cr.call(a);
      }function b(a) {
        return "[object RegExp]" === cr.call(a);
      }function c(a) {
        var t = parseFloat(String(a));return t >= 0 && Math.floor(t) === t && isFinite(a);
      }function v(a) {
        return null == a ? "" : "object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) ? JSON.stringify(a, null, 2) : String(a);
      }function f(a) {
        var t = parseFloat(a);return isNaN(t) ? a : t;
      }function u(a, t) {
        for (var e = Object.create(null), n = a.split(","), i = 0; i < n.length; i++) {
          e[n[i]] = !0;
        }return t ? function (a) {
          return e[a.toLowerCase()];
        } : function (a) {
          return e[a];
        };
      }function m(a, t) {
        if (a.length) {
          var e = a.indexOf(t);if (e > -1) return a.splice(e, 1);
        }
      }function h(a, t) {
        return ur.call(a, t);
      }function p(a) {
        var t = Object.create(null);return function (e) {
          return t[e] || (t[e] = a(e));
        };
      }function g(a, t) {
        function e(e) {
          var n = arguments.length;return n ? n > 1 ? a.apply(t, arguments) : a.call(t, e) : a.call(t);
        }return e._length = a.length, e;
      }function x(a, t) {
        return a.bind(t);
      }function w(a, t) {
        t = t || 0;for (var e = a.length - t, n = new Array(e); e--;) {
          n[e] = a[e + t];
        }return n;
      }function k(a, t) {
        for (var e in t) {
          a[e] = t[e];
        }return a;
      }function y(a) {
        for (var t = {}, e = 0; e < a.length; e++) {
          a[e] && k(t, a[e]);
        }return t;
      }function _(a, t, e) {}function A(a, t) {
        if (a === t) return !0;var e = s(a),
            n = s(t);if (!e || !n) return !e && !n && String(a) === String(t);try {
          var i = Array.isArray(a),
              r = Array.isArray(t);if (i && r) return a.length === t.length && a.every(function (a, e) {
            return A(a, t[e]);
          });if (a instanceof Date && t instanceof Date) return a.getTime() === t.getTime();if (i || r) return !1;var o = Object.keys(a),
              d = Object.keys(t);return o.length === d.length && o.every(function (e) {
            return A(a[e], t[e]);
          });
        } catch (a) {
          return !1;
        }
      }function C(a, t) {
        for (var e = 0; e < a.length; e++) {
          if (A(a[e], t)) return e;
        }return -1;
      }function B(a) {
        var t = !1;return function () {
          t || (t = !0, a.apply(this, arguments));
        };
      }function z(a) {
        var t = (a + "").charCodeAt(0);return 36 === t || 95 === t;
      }function $(a, t, e, n) {
        Object.defineProperty(a, t, { value: e, enumerable: !!n, writable: !0, configurable: !0 });
      }function T(a) {
        if (!zr.test(a)) {
          var t = a.split(".");return function (a) {
            for (var e = 0; e < t.length; e++) {
              if (!a) return;a = a[t[e]];
            }return a;
          };
        }
      }function S(a) {
        return "function" == typeof a && /native code/.test(a.toString());
      }function j(a) {
        Kr.push(a), Jr.target = a;
      }function O() {
        Kr.pop(), Jr.target = Kr[Kr.length - 1];
      }function E(a) {
        return new Wr(void 0, void 0, void 0, String(a));
      }function I(a) {
        var t = new Wr(a.tag, a.data, a.children && a.children.slice(), a.text, a.elm, a.context, a.componentOptions, a.asyncFactory);return t.ns = a.ns, t.isStatic = a.isStatic, t.key = a.key, t.isComment = a.isComment, t.fnContext = a.fnContext, t.fnOptions = a.fnOptions, t.fnScopeId = a.fnScopeId, t.asyncMeta = a.asyncMeta, t.isCloned = !0, t;
      }function L(a) {
        to = a;
      }function N(a, t) {
        a.__proto__ = t;
      }function G(a, t, e) {
        for (var n = 0, i = e.length; n < i; n++) {
          var r = e[n];$(a, r, t[r]);
        }
      }function M(a, t) {
        if (s(a) && !(a instanceof Wr)) {
          var e;return h(a, "__ob__") && a.__ob__ instanceof eo ? e = a.__ob__ : to && !Rr() && (Array.isArray(a) || l(a)) && Object.isExtensible(a) && !a._isVue && (e = new eo(a)), t && e && e.vmCount++, e;
        }
      }function q(a, t, e, n, i) {
        var r = new Jr(),
            o = Object.getOwnPropertyDescriptor(a, t);if (!o || !1 !== o.configurable) {
          var d = o && o.get,
              s = o && o.set;d && !s || 2 !== arguments.length || (e = a[t]);var l = !i && M(e);Object.defineProperty(a, t, { enumerable: !0, configurable: !0, get: function get() {
              var t = d ? d.call(a) : e;return Jr.target && (r.depend(), l && (l.dep.depend(), Array.isArray(t) && R(t))), t;
            }, set: function set(t) {
              var n = d ? d.call(a) : e;t === n || t !== t && n !== n || d && !s || (s ? s.call(a, t) : e = t, l = !i && M(t), r.notify());
            } });
        }
      }function D(a, t, e) {
        if (Array.isArray(a) && c(t)) return a.length = Math.max(a.length, t), a.splice(t, 1, e), e;if (t in a && !(t in Object.prototype)) return a[t] = e, e;var n = a.__ob__;return a._isVue || n && n.vmCount ? e : n ? (q(n.value, t, e), n.dep.notify(), e) : (a[t] = e, e);
      }function P(a, t) {
        if (Array.isArray(a) && c(t)) return void a.splice(t, 1);var e = a.__ob__;a._isVue || e && e.vmCount || h(a, t) && (delete a[t], e && e.dep.notify());
      }function R(a) {
        for (var t = void 0, e = 0, n = a.length; e < n; e++) {
          t = a[e], t && t.__ob__ && t.__ob__.dep.depend(), Array.isArray(t) && R(t);
        }
      }function F(a, t) {
        if (!t) return a;for (var e, n, i, r = Object.keys(t), o = 0; o < r.length; o++) {
          e = r[o], n = a[e], i = t[e], h(a, e) ? n !== i && l(n) && l(i) && F(n, i) : D(a, e, i);
        }return a;
      }function H(a, t, e) {
        return e ? function () {
          var n = "function" == typeof t ? t.call(e, e) : t,
              i = "function" == typeof a ? a.call(e, e) : a;return n ? F(n, i) : i;
        } : t ? a ? function () {
          return F("function" == typeof t ? t.call(this, this) : t, "function" == typeof a ? a.call(this, this) : a);
        } : t : a;
      }function U(a, t) {
        var e = t ? a ? a.concat(t) : Array.isArray(t) ? t : [t] : a;return e ? V(e) : e;
      }function V(a) {
        for (var t = [], e = 0; e < a.length; e++) {
          -1 === t.indexOf(a[e]) && t.push(a[e]);
        }return t;
      }function J(a, t, e, n) {
        var i = Object.create(a || null);return t ? k(i, t) : i;
      }function K(a, t) {
        var e = a.props;if (e) {
          var n,
              i,
              r,
              o = {};if (Array.isArray(e)) for (n = e.length; n--;) {
            "string" == typeof (i = e[n]) && (r = hr(i), o[r] = { type: null });
          } else if (l(e)) for (var d in e) {
            i = e[d], r = hr(d), o[r] = l(i) ? i : { type: i };
          }a.props = o;
        }
      }function W(a, t) {
        var e = a.inject;if (e) {
          var n = a.inject = {};if (Array.isArray(e)) for (var i = 0; i < e.length; i++) {
            n[e[i]] = { from: e[i] };
          } else if (l(e)) for (var r in e) {
            var o = e[r];n[r] = l(o) ? k({ from: r }, o) : { from: o };
          }
        }
      }function X(a) {
        var t = a.directives;if (t) for (var e in t) {
          var n = t[e];"function" == typeof n && (t[e] = { bind: n, update: n });
        }
      }function Y(a, t, e) {
        function n(n) {
          var i = no[n] || oo;d[n] = i(a[n], t[n], e, n);
        }if ("function" == typeof t && (t = t.options), K(t, e), W(t, e), X(t), !t._base && (t.extends && (a = Y(a, t.extends, e)), t.mixins)) for (var i = 0, r = t.mixins.length; i < r; i++) {
          a = Y(a, t.mixins[i], e);
        }var o,
            d = {};for (o in a) {
          n(o);
        }for (o in t) {
          h(a, o) || n(o);
        }return d;
      }function Z(a, t, e, n) {
        if ("string" == typeof e) {
          var i = a[t];if (h(i, e)) return i[e];var r = hr(e);if (h(i, r)) return i[r];var o = pr(r);if (h(i, o)) return i[o];return i[e] || i[r] || i[o];
        }
      }function Q(a, t, e, n) {
        var i = t[a],
            r = !h(e, a),
            o = e[a],
            d = na(Boolean, i.type);if (d > -1) if (r && !h(i, "default")) o = !1;else if ("" === o || o === xr(a)) {
          var s = na(String, i.type);(s < 0 || d < s) && (o = !0);
        }if (void 0 === o) {
          o = aa(n, i, a);var l = to;L(!0), M(o), L(l);
        }return o;
      }function aa(a, t, e) {
        if (h(t, "default")) {
          var n = t.default;return a && a.$options.propsData && void 0 === a.$options.propsData[e] && void 0 !== a._props[e] ? a._props[e] : "function" == typeof n && "Function" !== ta(t.type) ? n.call(a) : n;
        }
      }function ta(a) {
        var t = a && a.toString().match(/^\s*function (\w+)/);return t ? t[1] : "";
      }function ea(a, t) {
        return ta(a) === ta(t);
      }function na(a, t) {
        if (!Array.isArray(t)) return ea(t, a) ? 0 : -1;for (var e = 0, n = t.length; e < n; e++) {
          if (ea(t[e], a)) return e;
        }return -1;
      }function ia(a, t, e) {
        if (t) for (var n = t; n = n.$parent;) {
          var i = n.$options.errorCaptured;if (i) for (var r = 0; r < i.length; r++) {
            try {
              var o = !1 === i[r].call(n, a, t, e);if (o) return;
            } catch (a) {
              ra(a, n, "errorCaptured hook");
            }
          }
        }ra(a, t, e);
      }function ra(a, t, e) {
        if (Br.errorHandler) try {
          return Br.errorHandler.call(null, a, t, e);
        } catch (a) {
          oa(a, null, "config.errorHandler");
        }oa(a, t, e);
      }function oa(a, t, e) {
        if (!Tr && !Sr || "undefined" == typeof console) throw a;console.error(a);
      }function da() {
        lo = !1;var a = so.slice(0);so.length = 0;for (var t = 0; t < a.length; t++) {
          a[t]();
        }
      }function sa(a) {
        return a._withTask || (a._withTask = function () {
          bo = !0;try {
            return a.apply(null, arguments);
          } finally {
            bo = !1;
          }
        });
      }function la(a, t) {
        var e;if (so.push(function () {
          if (a) try {
            a.call(t);
          } catch (a) {
            ia(a, t, "nextTick");
          } else e && e(t);
        }), lo || (lo = !0, bo ? ro() : io()), !a && "undefined" != typeof Promise) return new Promise(function (a) {
          e = a;
        });
      }function ba(a) {
        ca(a, mo), mo.clear();
      }function ca(a, t) {
        var e,
            n,
            i = Array.isArray(a);if (!(!i && !s(a) || Object.isFrozen(a) || a instanceof Wr)) {
          if (a.__ob__) {
            var r = a.__ob__.dep.id;if (t.has(r)) return;t.add(r);
          }if (i) for (e = a.length; e--;) {
            ca(a[e], t);
          } else for (n = Object.keys(a), e = n.length; e--;) {
            ca(a[n[e]], t);
          }
        }
      }function va(a) {
        function t() {
          var a = arguments,
              e = t.fns;if (!Array.isArray(e)) return e.apply(null, arguments);for (var n = e.slice(), i = 0; i < n.length; i++) {
            n[i].apply(null, a);
          }
        }return t.fns = a, t;
      }function fa(a, t, e, i, o, d) {
        var s, l, b, c;for (s in a) {
          l = a[s], b = t[s], c = ho(s), n(l) || (n(b) ? (n(l.fns) && (l = a[s] = va(l)), r(c.once) && (l = a[s] = o(c.name, l, c.capture)), e(c.name, l, c.capture, c.passive, c.params)) : l !== b && (b.fns = l, a[s] = b));
        }for (s in t) {
          n(a[s]) && (c = ho(s), i(c.name, t[s], c.capture));
        }
      }function ua(a, t, e) {
        function o() {
          e.apply(this, arguments), m(d.fns, o);
        }a instanceof Wr && (a = a.data.hook || (a.data.hook = {}));var d,
            s = a[t];n(s) ? d = va([o]) : i(s.fns) && r(s.merged) ? (d = s, d.fns.push(o)) : d = va([s, o]), d.merged = !0, a[t] = d;
      }function ma(a, t, e) {
        var r = t.options.props;if (!n(r)) {
          var o = {},
              d = a.attrs,
              s = a.props;if (i(d) || i(s)) for (var l in r) {
            var b = xr(l);ha(o, s, l, b, !0) || ha(o, d, l, b, !1);
          }return o;
        }
      }function ha(a, t, e, n, r) {
        if (i(t)) {
          if (h(t, e)) return a[e] = t[e], r || delete t[e], !0;if (h(t, n)) return a[e] = t[n], r || delete t[n], !0;
        }return !1;
      }function pa(a) {
        for (var t = 0; t < a.length; t++) {
          if (Array.isArray(a[t])) return Array.prototype.concat.apply([], a);
        }return a;
      }function ga(a) {
        return d(a) ? [E(a)] : Array.isArray(a) ? wa(a) : void 0;
      }function xa(a) {
        return i(a) && i(a.text) && o(a.isComment);
      }function wa(a, t) {
        var e,
            o,
            s,
            l,
            b = [];for (e = 0; e < a.length; e++) {
          o = a[e], n(o) || "boolean" == typeof o || (s = b.length - 1, l = b[s], Array.isArray(o) ? o.length > 0 && (o = wa(o, (t || "") + "_" + e), xa(o[0]) && xa(l) && (b[s] = E(l.text + o[0].text), o.shift()), b.push.apply(b, o)) : d(o) ? xa(l) ? b[s] = E(l.text + o) : "" !== o && b.push(E(o)) : xa(o) && xa(l) ? b[s] = E(l.text + o.text) : (r(a._isVList) && i(o.tag) && n(o.key) && i(t) && (o.key = "__vlist" + t + "_" + e + "__"), b.push(o)));
        }return b;
      }function ka(a, t) {
        return (a.__esModule || Hr && "Module" === a[Symbol.toStringTag]) && (a = a.default), s(a) ? t.extend(a) : a;
      }function ya(a, t, e, n, i) {
        var r = Yr();return r.asyncFactory = a, r.asyncMeta = { data: t, context: e, children: n, tag: i }, r;
      }function _a(a, t, e) {
        if (r(a.error) && i(a.errorComp)) return a.errorComp;if (i(a.resolved)) return a.resolved;if (r(a.loading) && i(a.loadingComp)) return a.loadingComp;if (!i(a.contexts)) {
          var o = a.contexts = [e],
              d = !0,
              l = function l(a) {
            for (var t = 0, e = o.length; t < e; t++) {
              o[t].$forceUpdate();
            }a && (o.length = 0);
          },
              b = B(function (e) {
            a.resolved = ka(e, t), d ? o.length = 0 : l(!0);
          }),
              c = B(function (t) {
            i(a.errorComp) && (a.error = !0, l(!0));
          }),
              v = a(b, c);return s(v) && ("function" == typeof v.then ? n(a.resolved) && v.then(b, c) : i(v.component) && "function" == typeof v.component.then && (v.component.then(b, c), i(v.error) && (a.errorComp = ka(v.error, t)), i(v.loading) && (a.loadingComp = ka(v.loading, t), 0 === v.delay ? a.loading = !0 : setTimeout(function () {
            n(a.resolved) && n(a.error) && (a.loading = !0, l(!1));
          }, v.delay || 200)), i(v.timeout) && setTimeout(function () {
            n(a.resolved) && c(null);
          }, v.timeout))), d = !1, a.loading ? a.loadingComp : a.resolved;
        }a.contexts.push(e);
      }function Aa(a) {
        return a.isComment && a.asyncFactory;
      }function Ca(a) {
        if (Array.isArray(a)) for (var t = 0; t < a.length; t++) {
          var e = a[t];if (i(e) && (i(e.componentOptions) || Aa(e))) return e;
        }
      }function Ba(a) {
        a._events = Object.create(null), a._hasHookEvent = !1;var t = a.$options._parentListeners;t && Sa(a, t);
      }function za(a, t) {
        uo.$on(a, t);
      }function $a(a, t) {
        uo.$off(a, t);
      }function Ta(a, t) {
        var e = uo;return function n() {
          null !== t.apply(null, arguments) && e.$off(a, n);
        };
      }function Sa(a, t, e) {
        uo = a, fa(t, e || {}, za, $a, Ta, a), uo = void 0;
      }function ja(a, t) {
        var e = {};if (!a) return e;for (var n = 0, i = a.length; n < i; n++) {
          var r = a[n],
              o = r.data;if (o && o.attrs && o.attrs.slot && delete o.attrs.slot, r.context !== t && r.fnContext !== t || !o || null == o.slot) (e.default || (e.default = [])).push(r);else {
            var d = o.slot,
                s = e[d] || (e[d] = []);"template" === r.tag ? s.push.apply(s, r.children || []) : s.push(r);
          }
        }for (var l in e) {
          e[l].every(Oa) && delete e[l];
        }return e;
      }function Oa(a) {
        return a.isComment && !a.asyncFactory || " " === a.text;
      }function Ea(a, t) {
        t = t || {};for (var e = 0; e < a.length; e++) {
          Array.isArray(a[e]) ? Ea(a[e], t) : t[a[e].key] = a[e].fn;
        }return t;
      }function Ia(a) {
        var t = po;return po = a, function () {
          po = t;
        };
      }function La(a) {
        var t = a.$options,
            e = t.parent;if (e && !t.abstract) {
          for (; e.$options.abstract && e.$parent;) {
            e = e.$parent;
          }e.$children.push(a);
        }a.$parent = e, a.$root = e ? e.$root : a, a.$children = [], a.$refs = {}, a._watcher = null, a._inactive = null, a._directInactive = !1, a._isMounted = !1, a._isDestroyed = !1, a._isBeingDestroyed = !1;
      }function Na(a, t, e) {
        a.$el = t, a.$options.render || (a.$options.render = Yr), Pa(a, "beforeMount");var n;return n = function n() {
          a._update(a._render(), e);
        }, new Co(a, n, _, { before: function before() {
            a._isMounted && !a._isDestroyed && Pa(a, "beforeUpdate");
          } }, !0), e = !1, null == a.$vnode && (a._isMounted = !0, Pa(a, "mounted")), a;
      }function Ga(a, t, e, n, i) {
        var r = !!(i || a.$options._renderChildren || n.data.scopedSlots || a.$scopedSlots !== br);if (a.$options._parentVnode = n, a.$vnode = n, a._vnode && (a._vnode.parent = n), a.$options._renderChildren = i, a.$attrs = n.data.attrs || br, a.$listeners = e || br, t && a.$options.props) {
          L(!1);for (var o = a._props, d = a.$options._propKeys || [], s = 0; s < d.length; s++) {
            var l = d[s],
                b = a.$options.props;o[l] = Q(l, b, t, a);
          }L(!0), a.$options.propsData = t;
        }e = e || br;var c = a.$options._parentListeners;a.$options._parentListeners = e, Sa(a, e, c), r && (a.$slots = ja(i, n.context), a.$forceUpdate());
      }function Ma(a) {
        for (; a && (a = a.$parent);) {
          if (a._inactive) return !0;
        }return !1;
      }function qa(a, t) {
        if (t) {
          if (a._directInactive = !1, Ma(a)) return;
        } else if (a._directInactive) return;if (a._inactive || null === a._inactive) {
          a._inactive = !1;for (var e = 0; e < a.$children.length; e++) {
            qa(a.$children[e]);
          }Pa(a, "activated");
        }
      }function Da(a, t) {
        if (!(t && (a._directInactive = !0, Ma(a)) || a._inactive)) {
          a._inactive = !0;for (var e = 0; e < a.$children.length; e++) {
            Da(a.$children[e]);
          }Pa(a, "deactivated");
        }
      }function Pa(a, t) {
        j();var e = a.$options[t];if (e) for (var n = 0, i = e.length; n < i; n++) {
          try {
            e[n].call(a);
          } catch (e) {
            ia(e, a, t + " hook");
          }
        }a._hasHookEvent && a.$emit("hook:" + t), O();
      }function Ra() {
        _o = go.length = xo.length = 0, wo = {}, ko = yo = !1;
      }function Fa() {
        yo = !0;var a, t;for (go.sort(function (a, t) {
          return a.id - t.id;
        }), _o = 0; _o < go.length; _o++) {
          a = go[_o], a.before && a.before(), t = a.id, wo[t] = null, a.run();
        }var e = xo.slice(),
            n = go.slice();Ra(), Va(e), Ha(n), Fr && Br.devtools && Fr.emit("flush");
      }function Ha(a) {
        for (var t = a.length; t--;) {
          var e = a[t],
              n = e.vm;n._watcher === e && n._isMounted && !n._isDestroyed && Pa(n, "updated");
        }
      }function Ua(a) {
        a._inactive = !1, xo.push(a);
      }function Va(a) {
        for (var t = 0; t < a.length; t++) {
          a[t]._inactive = !0, qa(a[t], !0);
        }
      }function Ja(a) {
        var t = a.id;if (null == wo[t]) {
          if (wo[t] = !0, yo) {
            for (var e = go.length - 1; e > _o && go[e].id > a.id;) {
              e--;
            }go.splice(e + 1, 0, a);
          } else go.push(a);ko || (ko = !0, la(Fa));
        }
      }function Ka(a, t, e) {
        Bo.get = function () {
          return this[t][e];
        }, Bo.set = function (a) {
          this[t][e] = a;
        }, Object.defineProperty(a, e, Bo);
      }function Wa(a) {
        a._watchers = [];var t = a.$options;t.props && Xa(a, t.props), t.methods && nt(a, t.methods), t.data ? Ya(a) : M(a._data = {}, !0), t.computed && Qa(a, t.computed), t.watch && t.watch !== Gr && it(a, t.watch);
      }function Xa(a, t) {
        var e = a.$options.propsData || {},
            n = a._props = {},
            i = a.$options._propKeys = [],
            r = !a.$parent;r || L(!1);for (var o in t) {
          !function (r) {
            i.push(r);var o = Q(r, t, e, a);q(n, r, o), r in a || Ka(a, "_props", r);
          }(o);
        }L(!0);
      }function Ya(a) {
        var t = a.$options.data;t = a._data = "function" == typeof t ? Za(t, a) : t || {}, l(t) || (t = {});for (var e = Object.keys(t), n = a.$options.props, i = (a.$options.methods, e.length); i--;) {
          var r = e[i];n && h(n, r) || z(r) || Ka(a, "_data", r);
        }M(t, !0);
      }function Za(a, t) {
        j();try {
          return a.call(t, t);
        } catch (a) {
          return ia(a, t, "data()"), {};
        } finally {
          O();
        }
      }function Qa(a, t) {
        var e = a._computedWatchers = Object.create(null),
            n = Rr();for (var i in t) {
          var r = t[i],
              o = "function" == typeof r ? r : r.get;n || (e[i] = new Co(a, o || _, _, zo)), i in a || at(a, i, r);
        }
      }function at(a, t, e) {
        var n = !Rr();"function" == typeof e ? (Bo.get = n ? tt(t) : et(e), Bo.set = _) : (Bo.get = e.get ? n && !1 !== e.cache ? tt(t) : et(e.get) : _, Bo.set = e.set || _), Object.defineProperty(a, t, Bo);
      }function tt(a) {
        return function () {
          var t = this._computedWatchers && this._computedWatchers[a];if (t) return t.dirty && t.evaluate(), Jr.target && t.depend(), t.value;
        };
      }function et(a) {
        return function () {
          return a.call(this, this);
        };
      }function nt(a, t) {
        a.$options.props;for (var e in t) {
          a[e] = "function" != typeof t[e] ? _ : wr(t[e], a);
        }
      }function it(a, t) {
        for (var e in t) {
          var n = t[e];if (Array.isArray(n)) for (var i = 0; i < n.length; i++) {
            rt(a, e, n[i]);
          } else rt(a, e, n);
        }
      }function rt(a, t, e, n) {
        return l(e) && (n = e, e = e.handler), "string" == typeof e && (e = a[e]), a.$watch(t, e, n);
      }function ot(a) {
        var t = a.$options.provide;t && (a._provided = "function" == typeof t ? t.call(a) : t);
      }function dt(a) {
        var t = st(a.$options.inject, a);t && (L(!1), Object.keys(t).forEach(function (e) {
          q(a, e, t[e]);
        }), L(!0));
      }function st(a, t) {
        if (a) {
          for (var e = Object.create(null), n = Hr ? Reflect.ownKeys(a).filter(function (t) {
            return Object.getOwnPropertyDescriptor(a, t).enumerable;
          }) : Object.keys(a), i = 0; i < n.length; i++) {
            for (var r = n[i], o = a[r].from, d = t; d;) {
              if (d._provided && h(d._provided, o)) {
                e[r] = d._provided[o];break;
              }d = d.$parent;
            }if (!d && "default" in a[r]) {
              var s = a[r].default;e[r] = "function" == typeof s ? s.call(t) : s;
            }
          }return e;
        }
      }function lt(a, t) {
        var e, n, r, o, d;if (Array.isArray(a) || "string" == typeof a) for (e = new Array(a.length), n = 0, r = a.length; n < r; n++) {
          e[n] = t(a[n], n);
        } else if ("number" == typeof a) for (e = new Array(a), n = 0; n < a; n++) {
          e[n] = t(n + 1, n);
        } else if (s(a)) for (o = Object.keys(a), e = new Array(o.length), n = 0, r = o.length; n < r; n++) {
          d = o[n], e[n] = t(a[d], d, n);
        }return i(e) || (e = []), e._isVList = !0, e;
      }function bt(a, t, e, n) {
        var i,
            r = this.$scopedSlots[a];r ? (e = e || {}, n && (e = k(k({}, n), e)), i = r(e) || t) : i = this.$slots[a] || t;var o = e && e.slot;return o ? this.$createElement("template", { slot: o }, i) : i;
      }function ct(a) {
        return Z(this.$options, "filters", a, !0) || yr;
      }function vt(a, t) {
        return Array.isArray(a) ? -1 === a.indexOf(t) : a !== t;
      }function ft(a, t, e, n, i) {
        var r = Br.keyCodes[t] || e;return i && n && !Br.keyCodes[t] ? vt(i, n) : r ? vt(r, a) : n ? xr(n) !== t : void 0;
      }function ut(a, t, e, n, i) {
        if (e) if (s(e)) {
          Array.isArray(e) && (e = y(e));var r;for (var o in e) {
            !function (o) {
              if ("class" === o || "style" === o || fr(o)) r = a;else {
                var d = a.attrs && a.attrs.type;r = n || Br.mustUseProp(t, d, o) ? a.domProps || (a.domProps = {}) : a.attrs || (a.attrs = {});
              }var s = hr(o);if (!(o in r || s in r) && (r[o] = e[o], i)) {
                (a.on || (a.on = {}))["update:" + s] = function (a) {
                  e[o] = a;
                };
              }
            }(o);
          }
        } else ;return a;
      }function mt(a, t) {
        var e = this._staticTrees || (this._staticTrees = []),
            n = e[a];return n && !t ? n : (n = e[a] = this.$options.staticRenderFns[a].call(this._renderProxy, null, this), pt(n, "__static__" + a, !1), n);
      }function ht(a, t, e) {
        return pt(a, "__once__" + t + (e ? "_" + e : ""), !0), a;
      }function pt(a, t, e) {
        if (Array.isArray(a)) for (var n = 0; n < a.length; n++) {
          a[n] && "string" != typeof a[n] && gt(a[n], t + "_" + n, e);
        } else gt(a, t, e);
      }function gt(a, t, e) {
        a.isStatic = !0, a.key = t, a.isOnce = e;
      }function xt(a, t) {
        if (t) if (l(t)) {
          var e = a.on = a.on ? k({}, a.on) : {};for (var n in t) {
            var i = e[n],
                r = t[n];e[n] = i ? [].concat(i, r) : r;
          }
        } else ;return a;
      }function wt(a) {
        a._o = ht, a._n = f, a._s = v, a._l = lt, a._t = bt, a._q = A, a._i = C, a._m = mt, a._f = ct, a._k = ft, a._b = ut, a._v = E, a._e = Yr, a._u = Ea, a._g = xt;
      }function kt(a, t, e, n, i) {
        var o,
            d = i.options;h(n, "_uid") ? (o = Object.create(n), o._original = n) : (o = n, n = n._original);var s = r(d._compiled),
            l = !s;this.data = a, this.props = t, this.children = e, this.parent = n, this.listeners = a.on || br, this.injections = st(d.inject, n), this.slots = function () {
          return ja(e, n);
        }, s && (this.$options = d, this.$slots = this.slots(), this.$scopedSlots = a.scopedSlots || br), d._scopeId ? this._c = function (a, t, e, i) {
          var r = St(o, a, t, e, i, l);return r && !Array.isArray(r) && (r.fnScopeId = d._scopeId, r.fnContext = n), r;
        } : this._c = function (a, t, e, n) {
          return St(o, a, t, e, n, l);
        };
      }function yt(a, t, e, n, r) {
        var o = a.options,
            d = {},
            s = o.props;if (i(s)) for (var l in s) {
          d[l] = Q(l, s, t || br);
        } else i(e.attrs) && At(d, e.attrs), i(e.props) && At(d, e.props);var b = new kt(e, d, r, n, a),
            c = o.render.call(null, b._c, b);if (c instanceof Wr) return _t(c, e, b.parent, o, b);if (Array.isArray(c)) {
          for (var v = ga(c) || [], f = new Array(v.length), u = 0; u < v.length; u++) {
            f[u] = _t(v[u], e, b.parent, o, b);
          }return f;
        }
      }function _t(a, t, e, n, i) {
        var r = I(a);return r.fnContext = e, r.fnOptions = n, t.slot && ((r.data || (r.data = {})).slot = t.slot), r;
      }function At(a, t) {
        for (var e in t) {
          a[hr(e)] = t[e];
        }
      }function Ct(a, t, e, o, d) {
        if (!n(a)) {
          var l = e.$options._base;if (s(a) && (a = l.extend(a)), "function" == typeof a) {
            var b;if (n(a.cid) && (b = a, void 0 === (a = _a(b, l, e)))) return ya(b, t, e, o, d);t = t || {}, Nt(a), i(t.model) && Tt(a.options, t);var c = ma(t, a, d);if (r(a.options.functional)) return yt(a, c, t, e, o);var v = t.on;if (t.on = t.nativeOn, r(a.options.abstract)) {
              var f = t.slot;t = {}, f && (t.slot = f);
            }zt(t);var u = a.options.name || d;return new Wr("vue-component-" + a.cid + (u ? "-" + u : ""), t, void 0, void 0, void 0, e, { Ctor: a, propsData: c, listeners: v, tag: d, children: o }, b);
          }
        }
      }function Bt(a, t) {
        var e = { _isComponent: !0, _parentVnode: a, parent: t },
            n = a.data.inlineTemplate;return i(n) && (e.render = n.render, e.staticRenderFns = n.staticRenderFns), new a.componentOptions.Ctor(e);
      }function zt(a) {
        for (var t = a.hook || (a.hook = {}), e = 0; e < To.length; e++) {
          var n = To[e],
              i = t[n],
              r = $o[n];i === r || i && i._merged || (t[n] = i ? $t(r, i) : r);
        }
      }function $t(a, t) {
        var e = function e(_e2, n) {
          a(_e2, n), t(_e2, n);
        };return e._merged = !0, e;
      }function Tt(a, t) {
        var e = a.model && a.model.prop || "value",
            n = a.model && a.model.event || "input";(t.props || (t.props = {}))[e] = t.model.value;var r = t.on || (t.on = {}),
            o = r[n],
            d = t.model.callback;i(o) ? (Array.isArray(o) ? -1 === o.indexOf(d) : o !== d) && (r[n] = [d].concat(o)) : r[n] = d;
      }function St(a, t, e, n, i, o) {
        return (Array.isArray(e) || d(e)) && (i = n, n = e, e = void 0), r(o) && (i = jo), jt(a, t, e, n, i);
      }function jt(a, t, e, n, r) {
        if (i(e) && i(e.__ob__)) return Yr();if (i(e) && i(e.is) && (t = e.is), !t) return Yr();Array.isArray(n) && "function" == typeof n[0] && (e = e || {}, e.scopedSlots = { default: n[0] }, n.length = 0), r === jo ? n = ga(n) : r === So && (n = pa(n));var o, d;if ("string" == typeof t) {
          var s;d = a.$vnode && a.$vnode.ns || Br.getTagNamespace(t), o = Br.isReservedTag(t) ? new Wr(Br.parsePlatformTagName(t), e, n, void 0, void 0, a) : e && e.pre || !i(s = Z(a.$options, "components", t)) ? new Wr(t, e, n, void 0, void 0, a) : Ct(s, e, a, n, t);
        } else o = Ct(t, e, a, n);return Array.isArray(o) ? o : i(o) ? (i(d) && Ot(o, d), i(e) && Et(e), o) : Yr();
      }function Ot(a, t, e) {
        if (a.ns = t, "foreignObject" === a.tag && (t = void 0, e = !0), i(a.children)) for (var o = 0, d = a.children.length; o < d; o++) {
          var s = a.children[o];i(s.tag) && (n(s.ns) || r(e) && "svg" !== s.tag) && Ot(s, t, e);
        }
      }function Et(a) {
        s(a.style) && ba(a.style), s(a.class) && ba(a.class);
      }function It(a) {
        a._vnode = null, a._staticTrees = null;var t = a.$options,
            e = a.$vnode = t._parentVnode,
            n = e && e.context;a.$slots = ja(t._renderChildren, n), a.$scopedSlots = br, a._c = function (t, e, n, i) {
          return St(a, t, e, n, i, !1);
        }, a.$createElement = function (t, e, n, i) {
          return St(a, t, e, n, i, !0);
        };var i = e && e.data;q(a, "$attrs", i && i.attrs || br, null, !0), q(a, "$listeners", t._parentListeners || br, null, !0);
      }function Lt(a, t) {
        var e = a.$options = Object.create(a.constructor.options),
            n = t._parentVnode;e.parent = t.parent, e._parentVnode = n;var i = n.componentOptions;e.propsData = i.propsData, e._parentListeners = i.listeners, e._renderChildren = i.children, e._componentTag = i.tag, t.render && (e.render = t.render, e.staticRenderFns = t.staticRenderFns);
      }function Nt(a) {
        var t = a.options;if (a.super) {
          var e = Nt(a.super);if (e !== a.superOptions) {
            a.superOptions = e;var n = Gt(a);n && k(a.extendOptions, n), t = a.options = Y(e, a.extendOptions), t.name && (t.components[t.name] = a);
          }
        }return t;
      }function Gt(a) {
        var t,
            e = a.options,
            n = a.sealedOptions;for (var i in e) {
          e[i] !== n[i] && (t || (t = {}), t[i] = e[i]);
        }return t;
      }function Mt(a) {
        this._init(a);
      }function qt(a) {
        a.use = function (a) {
          var t = this._installedPlugins || (this._installedPlugins = []);if (t.indexOf(a) > -1) return this;var e = w(arguments, 1);return e.unshift(this), "function" == typeof a.install ? a.install.apply(a, e) : "function" == typeof a && a.apply(null, e), t.push(a), this;
        };
      }function Dt(a) {
        a.mixin = function (a) {
          return this.options = Y(this.options, a), this;
        };
      }function Pt(a) {
        a.cid = 0;var t = 1;a.extend = function (a) {
          a = a || {};var e = this,
              n = e.cid,
              i = a._Ctor || (a._Ctor = {});if (i[n]) return i[n];var r = a.name || e.options.name,
              o = function o(a) {
            this._init(a);
          };return o.prototype = Object.create(e.prototype), o.prototype.constructor = o, o.cid = t++, o.options = Y(e.options, a), o.super = e, o.options.props && Rt(o), o.options.computed && Ft(o), o.extend = e.extend, o.mixin = e.mixin, o.use = e.use, Ar.forEach(function (a) {
            o[a] = e[a];
          }), r && (o.options.components[r] = o), o.superOptions = e.options, o.extendOptions = a, o.sealedOptions = k({}, o.options), i[n] = o, o;
        };
      }function Rt(a) {
        var t = a.options.props;for (var e in t) {
          Ka(a.prototype, "_props", e);
        }
      }function Ft(a) {
        var t = a.options.computed;for (var e in t) {
          at(a.prototype, e, t[e]);
        }
      }function Ht(a) {
        Ar.forEach(function (t) {
          a[t] = function (a, e) {
            return e ? ("component" === t && l(e) && (e.name = e.name || a, e = this.options._base.extend(e)), "directive" === t && "function" == typeof e && (e = { bind: e, update: e }), this.options[t + "s"][a] = e, e) : this.options[t + "s"][a];
          };
        });
      }function Ut(a) {
        return a && (a.Ctor.options.name || a.tag);
      }function Vt(a, t) {
        return Array.isArray(a) ? a.indexOf(t) > -1 : "string" == typeof a ? a.split(",").indexOf(t) > -1 : !!b(a) && a.test(t);
      }function Jt(a, t) {
        var e = a.cache,
            n = a.keys,
            i = a._vnode;for (var r in e) {
          var o = e[r];if (o) {
            var d = Ut(o.componentOptions);d && !t(d) && Kt(e, r, n, i);
          }
        }
      }function Kt(a, t, e, n) {
        var i = a[t];!i || n && i.tag === n.tag || i.componentInstance.$destroy(), a[t] = null, m(e, t);
      }function Wt(a) {
        for (var t = a.data, e = a, n = a; i(n.componentInstance);) {
          (n = n.componentInstance._vnode) && n.data && (t = Xt(n.data, t));
        }for (; i(e = e.parent);) {
          e && e.data && (t = Xt(t, e.data));
        }return Yt(t.staticClass, t.class);
      }function Xt(a, t) {
        return { staticClass: Zt(a.staticClass, t.staticClass), class: i(a.class) ? [a.class, t.class] : t.class };
      }function Yt(a, t) {
        return i(a) || i(t) ? Zt(a, Qt(t)) : "";
      }function Zt(a, t) {
        return a ? t ? a + " " + t : a : t || "";
      }function Qt(a) {
        return Array.isArray(a) ? ae(a) : s(a) ? te(a) : "string" == typeof a ? a : "";
      }function ae(a) {
        for (var t, e = "", n = 0, r = a.length; n < r; n++) {
          i(t = Qt(a[n])) && "" !== t && (e && (e += " "), e += t);
        }return e;
      }function te(a) {
        var t = "";for (var e in a) {
          a[e] && (t && (t += " "), t += e);
        }return t;
      }function ee(a) {
        return ed(a) ? "svg" : "math" === a ? "math" : void 0;
      }function ne(a) {
        if (!Tr) return !0;if (id(a)) return !1;if (a = a.toLowerCase(), null != rd[a]) return rd[a];var t = document.createElement(a);return a.indexOf("-") > -1 ? rd[a] = t.constructor === window.HTMLUnknownElement || t.constructor === window.HTMLElement : rd[a] = /HTMLUnknownElement/.test(t.toString());
      }function ie(a) {
        if ("string" == typeof a) {
          var t = document.querySelector(a);return t || document.createElement("div");
        }return a;
      }function re(a, t) {
        var e = document.createElement(a);return "select" !== a ? e : (t.data && t.data.attrs && void 0 !== t.data.attrs.multiple && e.setAttribute("multiple", "multiple"), e);
      }function oe(a, t) {
        return document.createElementNS(ad[a], t);
      }function de(a) {
        return document.createTextNode(a);
      }function se(a) {
        return document.createComment(a);
      }function le(a, t, e) {
        a.insertBefore(t, e);
      }function be(a, t) {
        a.removeChild(t);
      }function ce(a, t) {
        a.appendChild(t);
      }function ve(a) {
        return a.parentNode;
      }function fe(a) {
        return a.nextSibling;
      }function ue(a) {
        return a.tagName;
      }function me(a, t) {
        a.textContent = t;
      }function he(a, t) {
        a.setAttribute(t, "");
      }function pe(a, t) {
        var e = a.data.ref;if (i(e)) {
          var n = a.context,
              r = a.componentInstance || a.elm,
              o = n.$refs;t ? Array.isArray(o[e]) ? m(o[e], r) : o[e] === r && (o[e] = void 0) : a.data.refInFor ? Array.isArray(o[e]) ? o[e].indexOf(r) < 0 && o[e].push(r) : o[e] = [r] : o[e] = r;
        }
      }function ge(a, t) {
        return a.key === t.key && (a.tag === t.tag && a.isComment === t.isComment && i(a.data) === i(t.data) && xe(a, t) || r(a.isAsyncPlaceholder) && a.asyncFactory === t.asyncFactory && n(t.asyncFactory.error));
      }function xe(a, t) {
        if ("input" !== a.tag) return !0;var e,
            n = i(e = a.data) && i(e = e.attrs) && e.type,
            r = i(e = t.data) && i(e = e.attrs) && e.type;return n === r || od(n) && od(r);
      }function we(a, t, e) {
        var n,
            r,
            o = {};for (n = t; n <= e; ++n) {
          r = a[n].key, i(r) && (o[r] = n);
        }return o;
      }function ke(a, t) {
        (a.data.directives || t.data.directives) && ye(a, t);
      }function ye(a, t) {
        var e,
            n,
            i,
            r = a === ld,
            o = t === ld,
            d = _e(a.data.directives, a.context),
            s = _e(t.data.directives, t.context),
            l = [],
            b = [];for (e in s) {
          n = d[e], i = s[e], n ? (i.oldValue = n.value, Ce(i, "update", t, a), i.def && i.def.componentUpdated && b.push(i)) : (Ce(i, "bind", t, a), i.def && i.def.inserted && l.push(i));
        }if (l.length) {
          var c = function c() {
            for (var e = 0; e < l.length; e++) {
              Ce(l[e], "inserted", t, a);
            }
          };r ? ua(t, "insert", c) : c();
        }if (b.length && ua(t, "postpatch", function () {
          for (var e = 0; e < b.length; e++) {
            Ce(b[e], "componentUpdated", t, a);
          }
        }), !r) for (e in d) {
          s[e] || Ce(d[e], "unbind", a, a, o);
        }
      }function _e(a, t) {
        var e = Object.create(null);if (!a) return e;var n, i;for (n = 0; n < a.length; n++) {
          i = a[n], i.modifiers || (i.modifiers = vd), e[Ae(i)] = i, i.def = Z(t.$options, "directives", i.name, !0);
        }return e;
      }function Ae(a) {
        return a.rawName || a.name + "." + Object.keys(a.modifiers || {}).join(".");
      }function Ce(a, t, e, n, i) {
        var r = a.def && a.def[t];if (r) try {
          r(e.elm, a, e, n, i);
        } catch (n) {
          ia(n, e.context, "directive " + a.name + " " + t + " hook");
        }
      }function Be(a, t) {
        var e = t.componentOptions;if (!(i(e) && !1 === e.Ctor.options.inheritAttrs || n(a.data.attrs) && n(t.data.attrs))) {
          var r,
              o,
              d = t.elm,
              s = a.data.attrs || {},
              l = t.data.attrs || {};i(l.__ob__) && (l = t.data.attrs = k({}, l));for (r in l) {
            o = l[r], s[r] !== o && ze(d, r, o);
          }(Er || Lr) && l.value !== s.value && ze(d, "value", l.value);for (r in s) {
            n(l[r]) && (Yo(r) ? d.removeAttributeNS(Xo, Zo(r)) : Ko(r) || d.removeAttribute(r));
          }
        }
      }function ze(a, t, e) {
        a.tagName.indexOf("-") > -1 ? $e(a, t, e) : Wo(t) ? Qo(e) ? a.removeAttribute(t) : (e = "allowfullscreen" === t && "EMBED" === a.tagName ? "true" : t, a.setAttribute(t, e)) : Ko(t) ? a.setAttribute(t, Qo(e) || "false" === e ? "false" : "true") : Yo(t) ? Qo(e) ? a.removeAttributeNS(Xo, Zo(t)) : a.setAttributeNS(Xo, t, e) : $e(a, t, e);
      }function $e(a, t, e) {
        if (Qo(e)) a.removeAttribute(t);else {
          if (Er && !Ir && ("TEXTAREA" === a.tagName || "INPUT" === a.tagName) && "placeholder" === t && !a.__ieph) {
            var n = function n(t) {
              t.stopImmediatePropagation(), a.removeEventListener("input", n);
            };a.addEventListener("input", n), a.__ieph = !0;
          }a.setAttribute(t, e);
        }
      }function Te(a, t) {
        var e = t.elm,
            r = t.data,
            o = a.data;if (!(n(r.staticClass) && n(r.class) && (n(o) || n(o.staticClass) && n(o.class)))) {
          var d = Wt(t),
              s = e._transitionClasses;i(s) && (d = Zt(d, Qt(s))), d !== e._prevClass && (e.setAttribute("class", d), e._prevClass = d);
        }
      }function Se(a) {
        function t() {
          (o || (o = [])).push(a.slice(u, i).trim()), u = i + 1;
        }var e,
            n,
            i,
            r,
            o,
            d = !1,
            s = !1,
            l = !1,
            b = !1,
            c = 0,
            v = 0,
            f = 0,
            u = 0;for (i = 0; i < a.length; i++) {
          if (n = e, e = a.charCodeAt(i), d) 39 === e && 92 !== n && (d = !1);else if (s) 34 === e && 92 !== n && (s = !1);else if (l) 96 === e && 92 !== n && (l = !1);else if (b) 47 === e && 92 !== n && (b = !1);else if (124 !== e || 124 === a.charCodeAt(i + 1) || 124 === a.charCodeAt(i - 1) || c || v || f) {
            switch (e) {case 34:
                s = !0;break;case 39:
                d = !0;break;case 96:
                l = !0;break;case 40:
                f++;break;case 41:
                f--;break;case 91:
                v++;break;case 93:
                v--;break;case 123:
                c++;break;case 125:
                c--;}if (47 === e) {
              for (var m = i - 1, h = void 0; m >= 0 && " " === (h = a.charAt(m)); m--) {}h && hd.test(h) || (b = !0);
            }
          } else void 0 === r ? (u = i + 1, r = a.slice(0, i).trim()) : t();
        }if (void 0 === r ? r = a.slice(0, i).trim() : 0 !== u && t(), o) for (i = 0; i < o.length; i++) {
          r = je(r, o[i]);
        }return r;
      }function je(a, t) {
        var e = t.indexOf("(");if (e < 0) return '_f("' + t + '")(' + a + ")";var n = t.slice(0, e),
            i = t.slice(e + 1);return '_f("' + n + '")(' + a + (")" !== i ? "," + i : i);
      }function Oe(a) {
        console.error("[Vue compiler]: " + a);
      }function Ee(a, t) {
        return a ? a.map(function (a) {
          return a[t];
        }).filter(function (a) {
          return a;
        }) : [];
      }function Ie(a, t, e) {
        (a.props || (a.props = [])).push({ name: t, value: e }), a.plain = !1;
      }function Le(a, t, e) {
        (a.attrs || (a.attrs = [])).push({ name: t, value: e }), a.plain = !1;
      }function Ne(a, t, e) {
        a.attrsMap[t] = e, a.attrsList.push({ name: t, value: e });
      }function Ge(a, t, e, n, i, r) {
        (a.directives || (a.directives = [])).push({ name: t, rawName: e, value: n, arg: i, modifiers: r }), a.plain = !1;
      }function Me(a, t, e, n, i, r) {
        n = n || br, "click" === t && (n.right ? (t = "contextmenu", delete n.right) : n.middle && (t = "mouseup")), n.capture && (delete n.capture, t = "!" + t), n.once && (delete n.once, t = "~" + t), n.passive && (delete n.passive, t = "&" + t);var o;n.native ? (delete n.native, o = a.nativeEvents || (a.nativeEvents = {})) : o = a.events || (a.events = {});var d = { value: e.trim() };n !== br && (d.modifiers = n);var s = o[t];Array.isArray(s) ? i ? s.unshift(d) : s.push(d) : o[t] = s ? i ? [d, s] : [s, d] : d, a.plain = !1;
      }function qe(a, t, e) {
        var n = De(a, ":" + t) || De(a, "v-bind:" + t);if (null != n) return Se(n);if (!1 !== e) {
          var i = De(a, t);if (null != i) return JSON.stringify(i);
        }
      }function De(a, t, e) {
        var n;if (null != (n = a.attrsMap[t])) for (var i = a.attrsList, r = 0, o = i.length; r < o; r++) {
          if (i[r].name === t) {
            i.splice(r, 1);break;
          }
        }return e && delete a.attrsMap[t], n;
      }function Pe(a, t, e) {
        var n = e || {},
            i = n.number,
            r = n.trim,
            o = "$$v";r && (o = "(typeof $$v === 'string'? $$v.trim(): $$v)"), i && (o = "_n(" + o + ")");var d = Re(t, o);a.model = { value: "(" + t + ")", expression: JSON.stringify(t), callback: "function ($$v) {" + d + "}" };
      }function Re(a, t) {
        var e = Fe(a);return null === e.key ? a + "=" + t : "$set(" + e.exp + ", " + e.key + ", " + t + ")";
      }function Fe(a) {
        if (a = a.trim(), No = a.length, a.indexOf("[") < 0 || a.lastIndexOf("]") < No - 1) return qo = a.lastIndexOf("."), qo > -1 ? { exp: a.slice(0, qo), key: '"' + a.slice(qo + 1) + '"' } : { exp: a, key: null };for (Go = a, qo = Do = Po = 0; !Ue();) {
          Mo = He(), Ve(Mo) ? Ke(Mo) : 91 === Mo && Je(Mo);
        }return { exp: a.slice(0, Do), key: a.slice(Do + 1, Po) };
      }function He() {
        return Go.charCodeAt(++qo);
      }function Ue() {
        return qo >= No;
      }function Ve(a) {
        return 34 === a || 39 === a;
      }function Je(a) {
        var t = 1;for (Do = qo; !Ue();) {
          if (a = He(), Ve(a)) Ke(a);else if (91 === a && t++, 93 === a && t--, 0 === t) {
            Po = qo;break;
          }
        }
      }function Ke(a) {
        for (var t = a; !Ue() && (a = He()) !== t;) {}
      }function We(a, t, e) {
        Ro = e;var n = t.value,
            i = t.modifiers,
            r = a.tag,
            o = a.attrsMap.type;if (a.component) return Pe(a, n, i), !1;if ("select" === r) Ze(a, n, i);else if ("input" === r && "checkbox" === o) Xe(a, n, i);else if ("input" === r && "radio" === o) Ye(a, n, i);else if ("input" === r || "textarea" === r) Qe(a, n, i);else if (!Br.isReservedTag(r)) return Pe(a, n, i), !1;return !0;
      }function Xe(a, t, e) {
        var n = e && e.number,
            i = qe(a, "value") || "null",
            r = qe(a, "true-value") || "true",
            o = qe(a, "false-value") || "false";Ie(a, "checked", "Array.isArray(" + t + ")?_i(" + t + "," + i + ")>-1" + ("true" === r ? ":(" + t + ")" : ":_q(" + t + "," + r + ")")), Me(a, "change", "var $$a=" + t + ",$$el=$event.target,$$c=$$el.checked?(" + r + "):(" + o + ");if(Array.isArray($$a)){var $$v=" + (n ? "_n(" + i + ")" : i) + ",$$i=_i($$a,$$v);if($$el.checked){$$i<0&&(" + Re(t, "$$a.concat([$$v])") + ")}else{$$i>-1&&(" + Re(t, "$$a.slice(0,$$i).concat($$a.slice($$i+1))") + ")}}else{" + Re(t, "$$c") + "}", null, !0);
      }function Ye(a, t, e) {
        var n = e && e.number,
            i = qe(a, "value") || "null";i = n ? "_n(" + i + ")" : i, Ie(a, "checked", "_q(" + t + "," + i + ")"), Me(a, "change", Re(t, i), null, !0);
      }function Ze(a, t, e) {
        var n = e && e.number,
            i = 'Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return ' + (n ? "_n(val)" : "val") + "})",
            r = "var $$selectedVal = " + i + ";";r = r + " " + Re(t, "$event.target.multiple ? $$selectedVal : $$selectedVal[0]"), Me(a, "change", r, null, !0);
      }function Qe(a, t, e) {
        var n = a.attrsMap.type,
            i = e || {},
            r = i.lazy,
            o = i.number,
            d = i.trim,
            s = !r && "range" !== n,
            l = r ? "change" : "range" === n ? pd : "input",
            b = "$event.target.value";d && (b = "$event.target.value.trim()"), o && (b = "_n(" + b + ")");var c = Re(t, b);s && (c = "if($event.target.composing)return;" + c), Ie(a, "value", "(" + t + ")"), Me(a, l, c, null, !0), (d || o) && Me(a, "blur", "$forceUpdate()");
      }function an(a) {
        if (i(a[pd])) {
          var t = Er ? "change" : "input";a[t] = [].concat(a[pd], a[t] || []), delete a[pd];
        }i(a[gd]) && (a.change = [].concat(a[gd], a.change || []), delete a[gd]);
      }function tn(a, t, e) {
        var n = Fo;return function i() {
          null !== t.apply(null, arguments) && nn(a, i, e, n);
        };
      }function en(a, t, e, n) {
        t = sa(t), Fo.addEventListener(a, t, Mr ? { capture: e, passive: n } : e);
      }function nn(a, t, e, n) {
        (n || Fo).removeEventListener(a, t._withTask || t, e);
      }function rn(a, t) {
        if (!n(a.data.on) || !n(t.data.on)) {
          var e = t.data.on || {},
              i = a.data.on || {};Fo = t.elm, an(e), fa(e, i, en, nn, tn, t.context), Fo = void 0;
        }
      }function on(a, t) {
        if (!n(a.data.domProps) || !n(t.data.domProps)) {
          var e,
              r,
              o = t.elm,
              d = a.data.domProps || {},
              s = t.data.domProps || {};i(s.__ob__) && (s = t.data.domProps = k({}, s));for (e in d) {
            n(s[e]) && (o[e] = "");
          }for (e in s) {
            if (r = s[e], "textContent" === e || "innerHTML" === e) {
              if (t.children && (t.children.length = 0), r === d[e]) continue;1 === o.childNodes.length && o.removeChild(o.childNodes[0]);
            }if ("value" === e) {
              o._value = r;var l = n(r) ? "" : String(r);dn(o, l) && (o.value = l);
            } else o[e] = r;
          }
        }
      }function dn(a, t) {
        return !a.composing && ("OPTION" === a.tagName || sn(a, t) || ln(a, t));
      }function sn(a, t) {
        var e = !0;try {
          e = document.activeElement !== a;
        } catch (a) {}return e && a.value !== t;
      }function ln(a, t) {
        var e = a.value,
            n = a._vModifiers;if (i(n)) {
          if (n.lazy) return !1;if (n.number) return f(e) !== f(t);if (n.trim) return e.trim() !== t.trim();
        }return e !== t;
      }function bn(a) {
        var t = cn(a.style);return a.staticStyle ? k(a.staticStyle, t) : t;
      }function cn(a) {
        return Array.isArray(a) ? y(a) : "string" == typeof a ? kd(a) : a;
      }function vn(a, t) {
        var e,
            n = {};if (t) for (var i = a; i.componentInstance;) {
          (i = i.componentInstance._vnode) && i.data && (e = bn(i.data)) && k(n, e);
        }(e = bn(a.data)) && k(n, e);for (var r = a; r = r.parent;) {
          r.data && (e = bn(r.data)) && k(n, e);
        }return n;
      }function fn(a, t) {
        var e = t.data,
            r = a.data;if (!(n(e.staticStyle) && n(e.style) && n(r.staticStyle) && n(r.style))) {
          var o,
              d,
              s = t.elm,
              l = r.staticStyle,
              b = r.normalizedStyle || r.style || {},
              c = l || b,
              v = cn(t.data.style) || {};t.data.normalizedStyle = i(v.__ob__) ? k({}, v) : v;var f = vn(t, !0);for (d in c) {
            n(f[d]) && Ad(s, d, "");
          }for (d in f) {
            (o = f[d]) !== c[d] && Ad(s, d, null == o ? "" : o);
          }
        }
      }function un(a, t) {
        if (t && (t = t.trim())) if (a.classList) t.indexOf(" ") > -1 ? t.split($d).forEach(function (t) {
          return a.classList.add(t);
        }) : a.classList.add(t);else {
          var e = " " + (a.getAttribute("class") || "") + " ";e.indexOf(" " + t + " ") < 0 && a.setAttribute("class", (e + t).trim());
        }
      }function mn(a, t) {
        if (t && (t = t.trim())) if (a.classList) t.indexOf(" ") > -1 ? t.split($d).forEach(function (t) {
          return a.classList.remove(t);
        }) : a.classList.remove(t), a.classList.length || a.removeAttribute("class");else {
          for (var e = " " + (a.getAttribute("class") || "") + " ", n = " " + t + " "; e.indexOf(n) >= 0;) {
            e = e.replace(n, " ");
          }e = e.trim(), e ? a.setAttribute("class", e) : a.removeAttribute("class");
        }
      }function hn(a) {
        if (a) {
          if ("object" == (typeof a === "undefined" ? "undefined" : _typeof(a))) {
            var t = {};return !1 !== a.css && k(t, Td(a.name || "v")), k(t, a), t;
          }return "string" == typeof a ? Td(a) : void 0;
        }
      }function pn(a) {
        Gd(function () {
          Gd(a);
        });
      }function gn(a, t) {
        var e = a._transitionClasses || (a._transitionClasses = []);e.indexOf(t) < 0 && (e.push(t), un(a, t));
      }function xn(a, t) {
        a._transitionClasses && m(a._transitionClasses, t), mn(a, t);
      }function wn(a, t, e) {
        var n = kn(a, t),
            i = n.type,
            r = n.timeout,
            o = n.propCount;if (!i) return e();var d = i === jd ? Id : Nd,
            s = 0,
            l = function l() {
          a.removeEventListener(d, b), e();
        },
            b = function b(t) {
          t.target === a && ++s >= o && l();
        };setTimeout(function () {
          s < o && l();
        }, r + 1), a.addEventListener(d, b);
      }function kn(a, t) {
        var e,
            n = window.getComputedStyle(a),
            i = (n[Ed + "Delay"] || "").split(", "),
            r = (n[Ed + "Duration"] || "").split(", "),
            o = yn(i, r),
            d = (n[Ld + "Delay"] || "").split(", "),
            s = (n[Ld + "Duration"] || "").split(", "),
            l = yn(d, s),
            b = 0,
            c = 0;return t === jd ? o > 0 && (e = jd, b = o, c = r.length) : t === Od ? l > 0 && (e = Od, b = l, c = s.length) : (b = Math.max(o, l), e = b > 0 ? o > l ? jd : Od : null, c = e ? e === jd ? r.length : s.length : 0), { type: e, timeout: b, propCount: c, hasTransform: e === jd && Md.test(n[Ed + "Property"]) };
      }function yn(a, t) {
        for (; a.length < t.length;) {
          a = a.concat(a);
        }return Math.max.apply(null, t.map(function (t, e) {
          return _n(t) + _n(a[e]);
        }));
      }function _n(a) {
        return 1e3 * Number(a.slice(0, -1).replace(",", "."));
      }function An(a, t) {
        var e = a.elm;i(e._leaveCb) && (e._leaveCb.cancelled = !0, e._leaveCb());var r = hn(a.data.transition);if (!n(r) && !i(e._enterCb) && 1 === e.nodeType) {
          for (var o = r.css, d = r.type, l = r.enterClass, b = r.enterToClass, c = r.enterActiveClass, v = r.appearClass, u = r.appearToClass, m = r.appearActiveClass, h = r.beforeEnter, p = r.enter, g = r.afterEnter, x = r.enterCancelled, w = r.beforeAppear, k = r.appear, y = r.afterAppear, _ = r.appearCancelled, A = r.duration, C = po, z = po.$vnode; z && z.parent;) {
            z = z.parent, C = z.context;
          }var $ = !C._isMounted || !a.isRootInsert;if (!$ || k || "" === k) {
            var T = $ && v ? v : l,
                S = $ && m ? m : c,
                j = $ && u ? u : b,
                O = $ ? w || h : h,
                E = $ && "function" == typeof k ? k : p,
                I = $ ? y || g : g,
                L = $ ? _ || x : x,
                N = f(s(A) ? A.enter : A),
                G = !1 !== o && !Ir,
                M = zn(E),
                q = e._enterCb = B(function () {
              G && (xn(e, j), xn(e, S)), q.cancelled ? (G && xn(e, T), L && L(e)) : I && I(e), e._enterCb = null;
            });a.data.show || ua(a, "insert", function () {
              var t = e.parentNode,
                  n = t && t._pending && t._pending[a.key];n && n.tag === a.tag && n.elm._leaveCb && n.elm._leaveCb(), E && E(e, q);
            }), O && O(e), G && (gn(e, T), gn(e, S), pn(function () {
              xn(e, T), q.cancelled || (gn(e, j), M || (Bn(N) ? setTimeout(q, N) : wn(e, d, q)));
            })), a.data.show && (t && t(), E && E(e, q)), G || M || q();
          }
        }
      }function Cn(a, t) {
        function e() {
          _.cancelled || (!a.data.show && r.parentNode && ((r.parentNode._pending || (r.parentNode._pending = {}))[a.key] = a), u && u(r), w && (gn(r, b), gn(r, v), pn(function () {
            xn(r, b), _.cancelled || (gn(r, c), k || (Bn(y) ? setTimeout(_, y) : wn(r, l, _)));
          })), m && m(r, _), w || k || _());
        }var r = a.elm;i(r._enterCb) && (r._enterCb.cancelled = !0, r._enterCb());var o = hn(a.data.transition);if (n(o) || 1 !== r.nodeType) return t();if (!i(r._leaveCb)) {
          var d = o.css,
              l = o.type,
              b = o.leaveClass,
              c = o.leaveToClass,
              v = o.leaveActiveClass,
              u = o.beforeLeave,
              m = o.leave,
              h = o.afterLeave,
              p = o.leaveCancelled,
              g = o.delayLeave,
              x = o.duration,
              w = !1 !== d && !Ir,
              k = zn(m),
              y = f(s(x) ? x.leave : x),
              _ = r._leaveCb = B(function () {
            r.parentNode && r.parentNode._pending && (r.parentNode._pending[a.key] = null), w && (xn(r, c), xn(r, v)), _.cancelled ? (w && xn(r, b), p && p(r)) : (t(), h && h(r)), r._leaveCb = null;
          });g ? g(e) : e();
        }
      }function Bn(a) {
        return "number" == typeof a && !isNaN(a);
      }function zn(a) {
        if (n(a)) return !1;var t = a.fns;return i(t) ? zn(Array.isArray(t) ? t[0] : t) : (a._length || a.length) > 1;
      }function $n(a, t) {
        !0 !== t.data.show && An(t);
      }function Tn(a, t, e) {
        Sn(a, t, e), (Er || Lr) && setTimeout(function () {
          Sn(a, t, e);
        }, 0);
      }function Sn(a, t, e) {
        var n = t.value,
            i = a.multiple;if (!i || Array.isArray(n)) {
          for (var r, o, d = 0, s = a.options.length; d < s; d++) {
            if (o = a.options[d], i) r = C(n, On(o)) > -1, o.selected !== r && (o.selected = r);else if (A(On(o), n)) return void (a.selectedIndex !== d && (a.selectedIndex = d));
          }i || (a.selectedIndex = -1);
        }
      }function jn(a, t) {
        return t.every(function (t) {
          return !A(t, a);
        });
      }function On(a) {
        return "_value" in a ? a._value : a.value;
      }function En(a) {
        a.target.composing = !0;
      }function In(a) {
        a.target.composing && (a.target.composing = !1, Ln(a.target, "input"));
      }function Ln(a, t) {
        var e = document.createEvent("HTMLEvents");e.initEvent(t, !0, !0), a.dispatchEvent(e);
      }function Nn(a) {
        return !a.componentInstance || a.data && a.data.transition ? a : Nn(a.componentInstance._vnode);
      }function Gn(a) {
        var t = a && a.componentOptions;return t && t.Ctor.options.abstract ? Gn(Ca(t.children)) : a;
      }function Mn(a) {
        var t = {},
            e = a.$options;for (var n in e.propsData) {
          t[n] = a[n];
        }var i = e._parentListeners;for (var r in i) {
          t[hr(r)] = i[r];
        }return t;
      }function qn(a, t) {
        if (/\d-keep-alive$/.test(t.tag)) return a("keep-alive", { props: t.componentOptions.propsData });
      }function Dn(a) {
        for (; a = a.parent;) {
          if (a.data.transition) return !0;
        }
      }function Pn(a, t) {
        return t.key === a.key && t.tag === a.tag;
      }function Rn(a) {
        a.elm._moveCb && a.elm._moveCb(), a.elm._enterCb && a.elm._enterCb();
      }function Fn(a) {
        a.data.newPos = a.elm.getBoundingClientRect();
      }function Hn(a) {
        var t = a.data.pos,
            e = a.data.newPos,
            n = t.left - e.left,
            i = t.top - e.top;if (n || i) {
          a.data.moved = !0;var r = a.elm.style;r.transform = r.WebkitTransform = "translate(" + n + "px," + i + "px)", r.transitionDuration = "0s";
        }
      }function Un(a, t) {
        var e = t ? fs(t) : cs;if (e.test(a)) {
          for (var n, i, r, o = [], d = [], s = e.lastIndex = 0; n = e.exec(a);) {
            i = n.index, i > s && (d.push(r = a.slice(s, i)), o.push(JSON.stringify(r)));var l = Se(n[1].trim());o.push("_s(" + l + ")"), d.push({ "@binding": l }), s = i + n[0].length;
          }return s < a.length && (d.push(r = a.slice(s)), o.push(JSON.stringify(r))), { expression: o.join("+"), tokens: d };
        }
      }function Vn(a, t) {
        var e = (t.warn, De(a, "class"));e && (a.staticClass = JSON.stringify(e));var n = qe(a, "class", !1);n && (a.classBinding = n);
      }function Jn(a) {
        var t = "";return a.staticClass && (t += "staticClass:" + a.staticClass + ","), a.classBinding && (t += "class:" + a.classBinding + ","), t;
      }function Kn(a, t) {
        var e = (t.warn, De(a, "style"));if (e) {
          a.staticStyle = JSON.stringify(kd(e));
        }var n = qe(a, "style", !1);n && (a.styleBinding = n);
      }function Wn(a) {
        var t = "";return a.staticStyle && (t += "staticStyle:" + a.staticStyle + ","), a.styleBinding && (t += "style:(" + a.styleBinding + "),"), t;
      }function Xn(a, t) {
        var e = t ? Es : Os;return a.replace(e, function (a) {
          return js[a];
        });
      }function Yn(a, t) {
        function e(t) {
          b += t, a = a.substring(t);
        }function n(a, e, n) {
          var i, d;if (null == e && (e = b), null == n && (n = b), a) for (d = a.toLowerCase(), i = o.length - 1; i >= 0 && o[i].lowerCasedTag !== d; i--) {} else i = 0;if (i >= 0) {
            for (var s = o.length - 1; s >= i; s--) {
              t.end && t.end(o[s].tag, e, n);
            }o.length = i, r = i && o[i - 1].tag;
          } else "br" === d ? t.start && t.start(a, [], !0, e, n) : "p" === d && (t.start && t.start(a, [], !1, e, n), t.end && t.end(a, e, n));
        }for (var i, r, o = [], d = t.expectHTML, s = t.isUnaryTag || kr, l = t.canBeLeftOpenTag || kr, b = 0; a;) {
          if (i = a, r && Ts(r)) {
            var c = 0,
                v = r.toLowerCase(),
                f = Ss[v] || (Ss[v] = new RegExp("([\\s\\S]*?)(</" + v + "[^>]*>)", "i")),
                u = a.replace(f, function (a, e, n) {
              return c = n.length, Ts(v) || "noscript" === v || (e = e.replace(/<!\--([\s\S]*?)-->/g, "$1").replace(/<!\[CDATA\[([\s\S]*?)]]>/g, "$1")), Ls(v, e) && (e = e.slice(1)), t.chars && t.chars(e), "";
            });b += a.length - u.length, a = u, n(v, b - c, b);
          } else {
            var m = a.indexOf("<");if (0 === m) {
              if (zs.test(a)) {
                var h = a.indexOf("--\x3e");if (h >= 0) {
                  t.shouldKeepComment && t.comment(a.substring(4, h)), e(h + 3);continue;
                }
              }if ($s.test(a)) {
                var p = a.indexOf("]>");if (p >= 0) {
                  e(p + 2);continue;
                }
              }var g = a.match(Bs);if (g) {
                e(g[0].length);continue;
              }var x = a.match(Cs);if (x) {
                var w = b;e(x[0].length), n(x[1], w, b);continue;
              }var k = function () {
                var t = a.match(_s);if (t) {
                  var n = { tagName: t[1], attrs: [], start: b };e(t[0].length);for (var i, r; !(i = a.match(As)) && (r = a.match(ws));) {
                    e(r[0].length), n.attrs.push(r);
                  }if (i) return n.unarySlash = i[1], e(i[0].length), n.end = b, n;
                }
              }();if (k) {
                !function (a) {
                  var e = a.tagName,
                      i = a.unarySlash;d && ("p" === r && xs(e) && n(r), l(e) && r === e && n(e));for (var b = s(e) || !!i, c = a.attrs.length, v = new Array(c), f = 0; f < c; f++) {
                    var u = a.attrs[f],
                        m = u[3] || u[4] || u[5] || "",
                        h = "a" === e && "href" === u[1] ? t.shouldDecodeNewlinesForHref : t.shouldDecodeNewlines;v[f] = { name: u[1], value: Xn(m, h) };
                  }b || (o.push({ tag: e, lowerCasedTag: e.toLowerCase(), attrs: v }), r = e), t.start && t.start(e, v, b, a.start, a.end);
                }(k), Ls(k.tagName, a) && e(1);continue;
              }
            }var y = void 0,
                _ = void 0,
                A = void 0;if (m >= 0) {
              for (_ = a.slice(m); !(Cs.test(_) || _s.test(_) || zs.test(_) || $s.test(_) || (A = _.indexOf("<", 1)) < 0);) {
                m += A, _ = a.slice(m);
              }y = a.substring(0, m), e(m);
            }m < 0 && (y = a, a = ""), t.chars && y && t.chars(y);
          }if (a === i) {
            t.chars && t.chars(a);break;
          }
        }n();
      }function Zn(a, t, e) {
        return { type: 1, tag: a, attrsList: t, attrsMap: pi(t), parent: e, children: [] };
      }function Qn(a, t) {
        function e(a) {
          a.pre && (d = !1), rs(a.tag) && (s = !1);for (var e = 0; e < is.length; e++) {
            is[e](a, t);
          }
        }as = t.warn || Oe, rs = t.isPreTag || kr, os = t.mustUseProp || kr, ds = t.getTagNamespace || kr, es = Ee(t.modules, "transformNode"), ns = Ee(t.modules, "preTransformNode"), is = Ee(t.modules, "postTransformNode"), ts = t.delimiters;var n,
            i,
            r = [],
            o = !1 !== t.preserveWhitespace,
            d = !1,
            s = !1;return Yn(a, { warn: as, expectHTML: t.expectHTML, isUnaryTag: t.isUnaryTag, canBeLeftOpenTag: t.canBeLeftOpenTag, shouldDecodeNewlines: t.shouldDecodeNewlines, shouldDecodeNewlinesForHref: t.shouldDecodeNewlinesForHref, shouldKeepComment: t.comments, start: function start(a, o, l) {
            var b = i && i.ns || ds(a);Er && "svg" === b && (o = wi(o));var c = Zn(a, o, i);b && (c.ns = b), xi(c) && !Rr() && (c.forbidden = !0);for (var v = 0; v < ns.length; v++) {
              c = ns[v](c, t) || c;
            }if (d || (ai(c), c.pre && (d = !0)), rs(c.tag) && (s = !0), d ? ti(c) : c.processed || (ri(c), di(c), ci(c), ei(c, t)), n ? r.length || n.if && (c.elseif || c.else) && bi(n, { exp: c.elseif, block: c }) : n = c, i && !c.forbidden) if (c.elseif || c.else) si(c, i);else if (c.slotScope) {
              i.plain = !1;var f = c.slotTarget || '"default"';(i.scopedSlots || (i.scopedSlots = {}))[f] = c;
            } else i.children.push(c), c.parent = i;l ? e(c) : (i = c, r.push(c));
          }, end: function end() {
            var a = r[r.length - 1],
                t = a.children[a.children.length - 1];t && 3 === t.type && " " === t.text && !s && a.children.pop(), r.length -= 1, i = r[r.length - 1], e(a);
          }, chars: function chars(a) {
            if (i && (!Er || "textarea" !== i.tag || i.attrsMap.placeholder !== a)) {
              var t = i.children;if (a = s || a.trim() ? gi(i) ? a : Hs(a) : o && t.length ? " " : "") {
                var e;!d && " " !== a && (e = Un(a, ts)) ? t.push({ type: 2, expression: e.expression, tokens: e.tokens, text: a }) : " " === a && t.length && " " === t[t.length - 1].text || t.push({ type: 3, text: a });
              }
            }
          }, comment: function comment(a) {
            i.children.push({ type: 3, text: a, isComment: !0 });
          } }), n;
      }function ai(a) {
        null != De(a, "v-pre") && (a.pre = !0);
      }function ti(a) {
        var t = a.attrsList.length;if (t) for (var e = a.attrs = new Array(t), n = 0; n < t; n++) {
          e[n] = { name: a.attrsList[n].name, value: JSON.stringify(a.attrsList[n].value) };
        } else a.pre || (a.plain = !0);
      }function ei(a, t) {
        ni(a), a.plain = !a.key && !a.attrsList.length, ii(a), vi(a), fi(a);for (var e = 0; e < es.length; e++) {
          a = es[e](a, t) || a;
        }ui(a);
      }function ni(a) {
        var t = qe(a, "key");if (t) {
          a.key = t;
        }
      }function ii(a) {
        var t = qe(a, "ref");t && (a.ref = t, a.refInFor = mi(a));
      }function ri(a) {
        var t;if (t = De(a, "v-for")) {
          var e = oi(t);e && k(a, e);
        }
      }function oi(a) {
        var t = a.match(Ms);if (t) {
          var e = {};e.for = t[2].trim();var n = t[1].trim().replace(Ds, ""),
              i = n.match(qs);return i ? (e.alias = n.replace(qs, "").trim(), e.iterator1 = i[1].trim(), i[2] && (e.iterator2 = i[2].trim())) : e.alias = n, e;
        }
      }function di(a) {
        var t = De(a, "v-if");if (t) a.if = t, bi(a, { exp: t, block: a });else {
          null != De(a, "v-else") && (a.else = !0);var e = De(a, "v-else-if");e && (a.elseif = e);
        }
      }function si(a, t) {
        var e = li(t.children);e && e.if && bi(e, { exp: a.elseif, block: a });
      }function li(a) {
        for (var t = a.length; t--;) {
          if (1 === a[t].type) return a[t];a.pop();
        }
      }function bi(a, t) {
        a.ifConditions || (a.ifConditions = []), a.ifConditions.push(t);
      }function ci(a) {
        null != De(a, "v-once") && (a.once = !0);
      }function vi(a) {
        if ("slot" === a.tag) a.slotName = qe(a, "name");else {
          var t;"template" === a.tag ? (t = De(a, "scope"), a.slotScope = t || De(a, "slot-scope")) : (t = De(a, "slot-scope")) && (a.slotScope = t);var e = qe(a, "slot");e && (a.slotTarget = '""' === e ? '"default"' : e, "template" === a.tag || a.slotScope || Le(a, "slot", e));
        }
      }function fi(a) {
        var t;(t = qe(a, "is")) && (a.component = t), null != De(a, "inline-template") && (a.inlineTemplate = !0);
      }function ui(a) {
        var t,
            e,
            n,
            i,
            r,
            o,
            d,
            s = a.attrsList;for (t = 0, e = s.length; t < e; t++) {
          if (n = i = s[t].name, r = s[t].value, Gs.test(n)) {
            if (a.hasBindings = !0, o = hi(n), o && (n = n.replace(Fs, "")), Rs.test(n)) n = n.replace(Rs, ""), r = Se(r), d = !1, o && (o.prop && (d = !0, "innerHtml" === (n = hr(n)) && (n = "innerHTML")), o.camel && (n = hr(n)), o.sync && Me(a, "update:" + hr(n), Re(r, "$event"))), d || !a.component && os(a.tag, a.attrsMap.type, n) ? Ie(a, n, r) : Le(a, n, r);else if (Ns.test(n)) n = n.replace(Ns, ""), Me(a, n, r, o, !1, as);else {
              n = n.replace(Gs, "");var l = n.match(Ps),
                  b = l && l[1];b && (n = n.slice(0, -(b.length + 1))), Ge(a, n, i, r, b, o);
            }
          } else {
            Le(a, n, JSON.stringify(r)), !a.component && "muted" === n && os(a.tag, a.attrsMap.type, n) && Ie(a, n, "true");
          }
        }
      }function mi(a) {
        for (var t = a; t;) {
          if (void 0 !== t.for) return !0;t = t.parent;
        }return !1;
      }function hi(a) {
        var t = a.match(Fs);if (t) {
          var e = {};return t.forEach(function (a) {
            e[a.slice(1)] = !0;
          }), e;
        }
      }function pi(a) {
        for (var t = {}, e = 0, n = a.length; e < n; e++) {
          t[a[e].name] = a[e].value;
        }return t;
      }function gi(a) {
        return "script" === a.tag || "style" === a.tag;
      }function xi(a) {
        return "style" === a.tag || "script" === a.tag && (!a.attrsMap.type || "text/javascript" === a.attrsMap.type);
      }function wi(a) {
        for (var t = [], e = 0; e < a.length; e++) {
          var n = a[e];Us.test(n.name) || (n.name = n.name.replace(Vs, ""), t.push(n));
        }return t;
      }function ki(a, t) {
        if ("input" === a.tag) {
          var e = a.attrsMap;if (!e["v-model"]) return;var n;if ((e[":type"] || e["v-bind:type"]) && (n = qe(a, "type")), e.type || n || !e["v-bind"] || (n = "(" + e["v-bind"] + ").type"), n) {
            var i = De(a, "v-if", !0),
                r = i ? "&&(" + i + ")" : "",
                o = null != De(a, "v-else", !0),
                d = De(a, "v-else-if", !0),
                s = yi(a);ri(s), Ne(s, "type", "checkbox"), ei(s, t), s.processed = !0, s.if = "(" + n + ")==='checkbox'" + r, bi(s, { exp: s.if, block: s });var l = yi(a);De(l, "v-for", !0), Ne(l, "type", "radio"), ei(l, t), bi(s, { exp: "(" + n + ")==='radio'" + r, block: l });var b = yi(a);return De(b, "v-for", !0), Ne(b, ":type", n), ei(b, t), bi(s, { exp: i, block: b }), o ? s.else = !0 : d && (s.elseif = d), s;
          }
        }
      }function yi(a) {
        return Zn(a.tag, a.attrsList.slice(), a.parent);
      }function _i(a, t) {
        t.value && Ie(a, "textContent", "_s(" + t.value + ")");
      }function Ai(a, t) {
        t.value && Ie(a, "innerHTML", "_s(" + t.value + ")");
      }function Ci(a, t) {
        a && (ss = Ys(t.staticKeys || ""), ls = t.isReservedTag || kr, zi(a), $i(a, !1));
      }function Bi(a) {
        return u("type,tag,attrsList,attrsMap,plain,parent,children,attrs" + (a ? "," + a : ""));
      }function zi(a) {
        if (a.static = Ti(a), 1 === a.type) {
          if (!ls(a.tag) && "slot" !== a.tag && null == a.attrsMap["inline-template"]) return;for (var t = 0, e = a.children.length; t < e; t++) {
            var n = a.children[t];zi(n), n.static || (a.static = !1);
          }if (a.ifConditions) for (var i = 1, r = a.ifConditions.length; i < r; i++) {
            var o = a.ifConditions[i].block;zi(o), o.static || (a.static = !1);
          }
        }
      }function $i(a, t) {
        if (1 === a.type) {
          if ((a.static || a.once) && (a.staticInFor = t), a.static && a.children.length && (1 !== a.children.length || 3 !== a.children[0].type)) return void (a.staticRoot = !0);if (a.staticRoot = !1, a.children) for (var e = 0, n = a.children.length; e < n; e++) {
            $i(a.children[e], t || !!a.for);
          }if (a.ifConditions) for (var i = 1, r = a.ifConditions.length; i < r; i++) {
            $i(a.ifConditions[i].block, t);
          }
        }
      }function Ti(a) {
        return 2 !== a.type && (3 === a.type || !(!a.pre && (a.hasBindings || a.if || a.for || vr(a.tag) || !ls(a.tag) || Si(a) || !Object.keys(a).every(ss))));
      }function Si(a) {
        for (; a.parent;) {
          if (a = a.parent, "template" !== a.tag) return !1;if (a.for) return !0;
        }return !1;
      }function ji(a, t) {
        var e = t ? "nativeOn:{" : "on:{";for (var n in a) {
          e += '"' + n + '":' + Oi(n, a[n]) + ",";
        }return e.slice(0, -1) + "}";
      }function Oi(a, t) {
        if (!t) return "function(){}";if (Array.isArray(t)) return "[" + t.map(function (t) {
          return Oi(a, t);
        }).join(",") + "]";var e = Qs.test(t.value),
            n = Zs.test(t.value);if (t.modifiers) {
          var i = "",
              r = "",
              o = [];for (var d in t.modifiers) {
            if (nl[d]) r += nl[d], al[d] && o.push(d);else if ("exact" === d) {
              var s = t.modifiers;r += el(["ctrl", "shift", "alt", "meta"].filter(function (a) {
                return !s[a];
              }).map(function (a) {
                return "$event." + a + "Key";
              }).join("||"));
            } else o.push(d);
          }o.length && (i += Ei(o)), r && (i += r);return "function($event){" + i + (e ? "return " + t.value + "($event)" : n ? "return (" + t.value + ")($event)" : t.value) + "}";
        }return e || n ? t.value : "function($event){" + t.value + "}";
      }function Ei(a) {
        return "if(!('button' in $event)&&" + a.map(Ii).join("&&") + ")return null;";
      }function Ii(a) {
        var t = parseInt(a, 10);if (t) return "$event.keyCode!==" + t;var e = al[a],
            n = tl[a];return "_k($event.keyCode," + JSON.stringify(a) + "," + JSON.stringify(e) + ",$event.key," + JSON.stringify(n) + ")";
      }function Li(a, t) {
        a.wrapListeners = function (a) {
          return "_g(" + a + "," + t.value + ")";
        };
      }function Ni(a, t) {
        a.wrapData = function (e) {
          return "_b(" + e + ",'" + a.tag + "'," + t.value + "," + (t.modifiers && t.modifiers.prop ? "true" : "false") + (t.modifiers && t.modifiers.sync ? ",true" : "") + ")";
        };
      }function Gi(a, t) {
        var e = new rl(t);return { render: "with(this){return " + (a ? Mi(a, e) : '_c("div")') + "}", staticRenderFns: e.staticRenderFns };
      }function Mi(a, t) {
        if (a.parent && (a.pre = a.pre || a.parent.pre), a.staticRoot && !a.staticProcessed) return qi(a, t);if (a.once && !a.onceProcessed) return Di(a, t);if (a.for && !a.forProcessed) return Fi(a, t);if (a.if && !a.ifProcessed) return Pi(a, t);if ("template" !== a.tag || a.slotTarget || t.pre) {
          if ("slot" === a.tag) return er(a, t);var e;if (a.component) e = nr(a.component, a, t);else {
            var n;(!a.plain || a.pre && t.maybeComponent(a)) && (n = Hi(a, t));var i = a.inlineTemplate ? null : Xi(a, t, !0);e = "_c('" + a.tag + "'" + (n ? "," + n : "") + (i ? "," + i : "") + ")";
          }for (var r = 0; r < t.transforms.length; r++) {
            e = t.transforms[r](a, e);
          }return e;
        }return Xi(a, t) || "void 0";
      }function qi(a, t) {
        a.staticProcessed = !0;var e = t.pre;return a.pre && (t.pre = a.pre), t.staticRenderFns.push("with(this){return " + Mi(a, t) + "}"), t.pre = e, "_m(" + (t.staticRenderFns.length - 1) + (a.staticInFor ? ",true" : "") + ")";
      }function Di(a, t) {
        if (a.onceProcessed = !0, a.if && !a.ifProcessed) return Pi(a, t);if (a.staticInFor) {
          for (var e = "", n = a.parent; n;) {
            if (n.for) {
              e = n.key;break;
            }n = n.parent;
          }return e ? "_o(" + Mi(a, t) + "," + t.onceId++ + "," + e + ")" : Mi(a, t);
        }return qi(a, t);
      }function Pi(a, t, e, n) {
        return a.ifProcessed = !0, Ri(a.ifConditions.slice(), t, e, n);
      }function Ri(a, t, e, n) {
        function i(a) {
          return e ? e(a, t) : a.once ? Di(a, t) : Mi(a, t);
        }if (!a.length) return n || "_e()";var r = a.shift();return r.exp ? "(" + r.exp + ")?" + i(r.block) + ":" + Ri(a, t, e, n) : "" + i(r.block);
      }function Fi(a, t, e, n) {
        var i = a.for,
            r = a.alias,
            o = a.iterator1 ? "," + a.iterator1 : "",
            d = a.iterator2 ? "," + a.iterator2 : "";return a.forProcessed = !0, (n || "_l") + "((" + i + "),function(" + r + o + d + "){return " + (e || Mi)(a, t) + "})";
      }function Hi(a, t) {
        var e = "{",
            n = Ui(a, t);n && (e += n + ","), a.key && (e += "key:" + a.key + ","), a.ref && (e += "ref:" + a.ref + ","), a.refInFor && (e += "refInFor:true,"), a.pre && (e += "pre:true,"), a.component && (e += 'tag:"' + a.tag + '",');for (var i = 0; i < t.dataGenFns.length; i++) {
          e += t.dataGenFns[i](a);
        }if (a.attrs && (e += "attrs:{" + ir(a.attrs) + "},"), a.props && (e += "domProps:{" + ir(a.props) + "},"), a.events && (e += ji(a.events, !1) + ","), a.nativeEvents && (e += ji(a.nativeEvents, !0) + ","), a.slotTarget && !a.slotScope && (e += "slot:" + a.slotTarget + ","), a.scopedSlots && (e += Ji(a.scopedSlots, t) + ","), a.model && (e += "model:{value:" + a.model.value + ",callback:" + a.model.callback + ",expression:" + a.model.expression + "},"), a.inlineTemplate) {
          var r = Vi(a, t);r && (e += r + ",");
        }return e = e.replace(/,$/, "") + "}", a.wrapData && (e = a.wrapData(e)), a.wrapListeners && (e = a.wrapListeners(e)), e;
      }function Ui(a, t) {
        var e = a.directives;if (e) {
          var n,
              i,
              r,
              o,
              d = "directives:[",
              s = !1;for (n = 0, i = e.length; n < i; n++) {
            r = e[n], o = !0;var l = t.directives[r.name];l && (o = !!l(a, r, t.warn)), o && (s = !0, d += '{name:"' + r.name + '",rawName:"' + r.rawName + '"' + (r.value ? ",value:(" + r.value + "),expression:" + JSON.stringify(r.value) : "") + (r.arg ? ',arg:"' + r.arg + '"' : "") + (r.modifiers ? ",modifiers:" + JSON.stringify(r.modifiers) : "") + "},");
          }return s ? d.slice(0, -1) + "]" : void 0;
        }
      }function Vi(a, t) {
        var e = a.children[0];if (1 === e.type) {
          var n = Gi(e, t.options);return "inlineTemplate:{render:function(){" + n.render + "},staticRenderFns:[" + n.staticRenderFns.map(function (a) {
            return "function(){" + a + "}";
          }).join(",") + "]}";
        }
      }function Ji(a, t) {
        return "scopedSlots:_u([" + Object.keys(a).map(function (e) {
          return Ki(e, a[e], t);
        }).join(",") + "])";
      }function Ki(a, t, e) {
        return t.for && !t.forProcessed ? Wi(a, t, e) : "{key:" + a + ",fn:function(" + String(t.slotScope) + "){return " + ("template" === t.tag ? t.if ? "(" + t.if + ")?" + (Xi(t, e) || "undefined") + ":undefined" : Xi(t, e) || "undefined" : Mi(t, e)) + "}}";
      }function Wi(a, t, e) {
        var n = t.for,
            i = t.alias,
            r = t.iterator1 ? "," + t.iterator1 : "",
            o = t.iterator2 ? "," + t.iterator2 : "";return t.forProcessed = !0, "_l((" + n + "),function(" + i + r + o + "){return " + Ki(a, t, e) + "})";
      }function Xi(a, t, e, n, i) {
        var r = a.children;if (r.length) {
          var o = r[0];if (1 === r.length && o.for && "template" !== o.tag && "slot" !== o.tag) {
            var d = e ? t.maybeComponent(o) ? ",1" : ",0" : "";return "" + (n || Mi)(o, t) + d;
          }var s = e ? Yi(r, t.maybeComponent) : 0,
              l = i || Qi;return "[" + r.map(function (a) {
            return l(a, t);
          }).join(",") + "]" + (s ? "," + s : "");
        }
      }function Yi(a, t) {
        for (var e = 0, n = 0; n < a.length; n++) {
          var i = a[n];if (1 === i.type) {
            if (Zi(i) || i.ifConditions && i.ifConditions.some(function (a) {
              return Zi(a.block);
            })) {
              e = 2;break;
            }(t(i) || i.ifConditions && i.ifConditions.some(function (a) {
              return t(a.block);
            })) && (e = 1);
          }
        }return e;
      }function Zi(a) {
        return void 0 !== a.for || "template" === a.tag || "slot" === a.tag;
      }function Qi(a, t) {
        return 1 === a.type ? Mi(a, t) : 3 === a.type && a.isComment ? tr(a) : ar(a);
      }function ar(a) {
        return "_v(" + (2 === a.type ? a.expression : rr(JSON.stringify(a.text))) + ")";
      }function tr(a) {
        return "_e(" + JSON.stringify(a.text) + ")";
      }function er(a, t) {
        var e = a.slotName || '"default"',
            n = Xi(a, t),
            i = "_t(" + e + (n ? "," + n : ""),
            r = a.attrs && "{" + a.attrs.map(function (a) {
          return hr(a.name) + ":" + a.value;
        }).join(",") + "}",
            o = a.attrsMap["v-bind"];return !r && !o || n || (i += ",null"), r && (i += "," + r), o && (i += (r ? "" : ",null") + "," + o), i + ")";
      }function nr(a, t, e) {
        var n = t.inlineTemplate ? null : Xi(t, e, !0);return "_c(" + a + "," + Hi(t, e) + (n ? "," + n : "") + ")";
      }function ir(a) {
        for (var t = "", e = 0; e < a.length; e++) {
          var n = a[e];t += '"' + n.name + '":' + rr(n.value) + ",";
        }return t.slice(0, -1);
      }function rr(a) {
        return a.replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
      }function or(a, t) {
        try {
          return new Function(a);
        } catch (e) {
          return t.push({ err: e, code: a }), _;
        }
      }function dr(a) {
        var t = Object.create(null);return function (e, n, i) {
          n = k({}, n);n.warn;delete n.warn;var r = n.delimiters ? String(n.delimiters) + e : e;if (t[r]) return t[r];var o = a(e, n),
              d = {},
              s = [];return d.render = or(o.render, s), d.staticRenderFns = o.staticRenderFns.map(function (a) {
            return or(a, s);
          }), t[r] = d;
        };
      }function sr(a) {
        return bs = bs || document.createElement("div"), bs.innerHTML = a ? '<a href="\n"/>' : '<div a="\n"/>', bs.innerHTML.indexOf("&#10;") > 0;
      }function lr(a) {
        if (a.outerHTML) return a.outerHTML;var t = document.createElement("div");return t.appendChild(a.cloneNode(!0)), t.innerHTML;
      } /*!
        * Vue.js v2.5.22
        * (c) 2014-2019 Evan You
        * Released under the MIT License.
        */
      var br = Object.freeze({}),
          cr = Object.prototype.toString,
          vr = u("slot,component", !0),
          fr = u("key,ref,slot,slot-scope,is"),
          ur = Object.prototype.hasOwnProperty,
          mr = /-(\w)/g,
          hr = p(function (a) {
        return a.replace(mr, function (a, t) {
          return t ? t.toUpperCase() : "";
        });
      }),
          pr = p(function (a) {
        return a.charAt(0).toUpperCase() + a.slice(1);
      }),
          gr = /\B([A-Z])/g,
          xr = p(function (a) {
        return a.replace(gr, "-$1").toLowerCase();
      }),
          wr = Function.prototype.bind ? x : g,
          kr = function kr(a, t, e) {
        return !1;
      },
          yr = function yr(a) {
        return a;
      },
          _r = "data-server-rendered",
          Ar = ["component", "directive", "filter"],
          Cr = ["beforeCreate", "created", "beforeMount", "mounted", "beforeUpdate", "updated", "beforeDestroy", "destroyed", "activated", "deactivated", "errorCaptured"],
          Br = { optionMergeStrategies: Object.create(null), silent: !1, productionTip: !1, devtools: !1, performance: !1, errorHandler: null, warnHandler: null, ignoredElements: [], keyCodes: Object.create(null), isReservedTag: kr, isReservedAttr: kr, isUnknownElement: kr, getTagNamespace: _, parsePlatformTagName: yr, mustUseProp: kr, async: !0, _lifecycleHooks: Cr },
          zr = /[^\w.$]/,
          $r = "__proto__" in {},
          Tr = "undefined" != typeof window,
          Sr = "undefined" != typeof WXEnvironment && !!WXEnvironment.platform,
          jr = Sr && WXEnvironment.platform.toLowerCase(),
          Or = Tr && window.navigator.userAgent.toLowerCase(),
          Er = Or && /msie|trident/.test(Or),
          Ir = Or && Or.indexOf("msie 9.0") > 0,
          Lr = Or && Or.indexOf("edge/") > 0,
          Nr = (Or && Or.indexOf("android"), Or && /iphone|ipad|ipod|ios/.test(Or) || "ios" === jr),
          Gr = (Or && /chrome\/\d+/.test(Or), {}.watch),
          Mr = !1;if (Tr) try {
        var qr = {};Object.defineProperty(qr, "passive", { get: function get() {
            Mr = !0;
          } }), window.addEventListener("test-passive", null, qr);
      } catch (a) {}var Dr,
          Pr,
          Rr = function Rr() {
        return void 0 === Dr && (Dr = !Tr && !Sr && void 0 !== a && a.process && "server" === a.process.env.VUE_ENV), Dr;
      },
          Fr = Tr && window.__VUE_DEVTOOLS_GLOBAL_HOOK__,
          Hr = "undefined" != typeof Symbol && S(Symbol) && "undefined" != typeof Reflect && S(Reflect.ownKeys);Pr = "undefined" != typeof Set && S(Set) ? Set : function () {
        function a() {
          this.set = Object.create(null);
        }return a.prototype.has = function (a) {
          return !0 === this.set[a];
        }, a.prototype.add = function (a) {
          this.set[a] = !0;
        }, a.prototype.clear = function () {
          this.set = Object.create(null);
        }, a;
      }();var Ur = _,
          Vr = 0,
          Jr = function Jr() {
        this.id = Vr++, this.subs = [];
      };Jr.prototype.addSub = function (a) {
        this.subs.push(a);
      }, Jr.prototype.removeSub = function (a) {
        m(this.subs, a);
      }, Jr.prototype.depend = function () {
        Jr.target && Jr.target.addDep(this);
      }, Jr.prototype.notify = function () {
        for (var a = this.subs.slice(), t = 0, e = a.length; t < e; t++) {
          a[t].update();
        }
      }, Jr.target = null;var Kr = [],
          Wr = function Wr(a, t, e, n, i, r, o, d) {
        this.tag = a, this.data = t, this.children = e, this.text = n, this.elm = i, this.ns = void 0, this.context = r, this.fnContext = void 0, this.fnOptions = void 0, this.fnScopeId = void 0, this.key = t && t.key, this.componentOptions = o, this.componentInstance = void 0, this.parent = void 0, this.raw = !1, this.isStatic = !1, this.isRootInsert = !0, this.isComment = !1, this.isCloned = !1, this.isOnce = !1, this.asyncFactory = d, this.asyncMeta = void 0, this.isAsyncPlaceholder = !1;
      },
          Xr = { child: { configurable: !0 } };Xr.child.get = function () {
        return this.componentInstance;
      }, Object.defineProperties(Wr.prototype, Xr);var Yr = function Yr(a) {
        void 0 === a && (a = "");var t = new Wr();return t.text = a, t.isComment = !0, t;
      },
          Zr = Array.prototype,
          Qr = Object.create(Zr);["push", "pop", "shift", "unshift", "splice", "sort", "reverse"].forEach(function (a) {
        var t = Zr[a];$(Qr, a, function () {
          for (var e = [], n = arguments.length; n--;) {
            e[n] = arguments[n];
          }var i,
              r = t.apply(this, e),
              o = this.__ob__;switch (a) {case "push":case "unshift":
              i = e;break;case "splice":
              i = e.slice(2);}return i && o.observeArray(i), o.dep.notify(), r;
        });
      });var ao = Object.getOwnPropertyNames(Qr),
          to = !0,
          eo = function eo(a) {
        this.value = a, this.dep = new Jr(), this.vmCount = 0, $(a, "__ob__", this), Array.isArray(a) ? ($r ? N(a, Qr) : G(a, Qr, ao), this.observeArray(a)) : this.walk(a);
      };eo.prototype.walk = function (a) {
        for (var t = Object.keys(a), e = 0; e < t.length; e++) {
          q(a, t[e]);
        }
      }, eo.prototype.observeArray = function (a) {
        for (var t = 0, e = a.length; t < e; t++) {
          M(a[t]);
        }
      };var no = Br.optionMergeStrategies;no.data = function (a, t, e) {
        return e ? H(a, t, e) : t && "function" != typeof t ? a : H(a, t);
      }, Cr.forEach(function (a) {
        no[a] = U;
      }), Ar.forEach(function (a) {
        no[a + "s"] = J;
      }), no.watch = function (a, t, e, n) {
        if (a === Gr && (a = void 0), t === Gr && (t = void 0), !t) return Object.create(a || null);if (!a) return t;var i = {};k(i, a);for (var r in t) {
          var o = i[r],
              d = t[r];o && !Array.isArray(o) && (o = [o]), i[r] = o ? o.concat(d) : Array.isArray(d) ? d : [d];
        }return i;
      }, no.props = no.methods = no.inject = no.computed = function (a, t, e, n) {
        if (!a) return t;var i = Object.create(null);return k(i, a), t && k(i, t), i;
      }, no.provide = H;var io,
          ro,
          oo = function oo(a, t) {
        return void 0 === t ? a : t;
      },
          so = [],
          lo = !1,
          bo = !1;if (void 0 !== e && S(e)) ro = function ro() {
        e(da);
      };else if ("undefined" == typeof MessageChannel || !S(MessageChannel) && "[object MessageChannelConstructor]" !== MessageChannel.toString()) ro = function ro() {
        setTimeout(da, 0);
      };else {
        var co = new MessageChannel(),
            vo = co.port2;co.port1.onmessage = da, ro = function ro() {
          vo.postMessage(1);
        };
      }if ("undefined" != typeof Promise && S(Promise)) {
        var fo = Promise.resolve();io = function io() {
          fo.then(da), Nr && setTimeout(_);
        };
      } else io = ro;var uo,
          mo = new Pr(),
          ho = p(function (a) {
        var t = "&" === a.charAt(0);a = t ? a.slice(1) : a;var e = "~" === a.charAt(0);a = e ? a.slice(1) : a;var n = "!" === a.charAt(0);return a = n ? a.slice(1) : a, { name: a, once: e, capture: n, passive: t };
      }),
          po = null,
          go = [],
          xo = [],
          wo = {},
          ko = !1,
          yo = !1,
          _o = 0,
          Ao = 0,
          Co = function Co(a, t, e, n, i) {
        this.vm = a, i && (a._watcher = this), a._watchers.push(this), n ? (this.deep = !!n.deep, this.user = !!n.user, this.lazy = !!n.lazy, this.sync = !!n.sync, this.before = n.before) : this.deep = this.user = this.lazy = this.sync = !1, this.cb = e, this.id = ++Ao, this.active = !0, this.dirty = this.lazy, this.deps = [], this.newDeps = [], this.depIds = new Pr(), this.newDepIds = new Pr(), this.expression = "", "function" == typeof t ? this.getter = t : (this.getter = T(t), this.getter || (this.getter = _)), this.value = this.lazy ? void 0 : this.get();
      };Co.prototype.get = function () {
        j(this);var a,
            t = this.vm;try {
          a = this.getter.call(t, t);
        } catch (a) {
          if (!this.user) throw a;ia(a, t, 'getter for watcher "' + this.expression + '"');
        } finally {
          this.deep && ba(a), O(), this.cleanupDeps();
        }return a;
      }, Co.prototype.addDep = function (a) {
        var t = a.id;this.newDepIds.has(t) || (this.newDepIds.add(t), this.newDeps.push(a), this.depIds.has(t) || a.addSub(this));
      }, Co.prototype.cleanupDeps = function () {
        for (var a = this.deps.length; a--;) {
          var t = this.deps[a];this.newDepIds.has(t.id) || t.removeSub(this);
        }var e = this.depIds;this.depIds = this.newDepIds, this.newDepIds = e, this.newDepIds.clear(), e = this.deps, this.deps = this.newDeps, this.newDeps = e, this.newDeps.length = 0;
      }, Co.prototype.update = function () {
        this.lazy ? this.dirty = !0 : this.sync ? this.run() : Ja(this);
      }, Co.prototype.run = function () {
        if (this.active) {
          var a = this.get();if (a !== this.value || s(a) || this.deep) {
            var t = this.value;if (this.value = a, this.user) try {
              this.cb.call(this.vm, a, t);
            } catch (a) {
              ia(a, this.vm, 'callback for watcher "' + this.expression + '"');
            } else this.cb.call(this.vm, a, t);
          }
        }
      }, Co.prototype.evaluate = function () {
        this.value = this.get(), this.dirty = !1;
      }, Co.prototype.depend = function () {
        for (var a = this.deps.length; a--;) {
          this.deps[a].depend();
        }
      }, Co.prototype.teardown = function () {
        if (this.active) {
          this.vm._isBeingDestroyed || m(this.vm._watchers, this);for (var a = this.deps.length; a--;) {
            this.deps[a].removeSub(this);
          }this.active = !1;
        }
      };var Bo = { enumerable: !0, configurable: !0, get: _, set: _ },
          zo = { lazy: !0 };wt(kt.prototype);var $o = { init: function init(a, t) {
          if (a.componentInstance && !a.componentInstance._isDestroyed && a.data.keepAlive) {
            var e = a;$o.prepatch(e, e);
          } else {
            (a.componentInstance = Bt(a, po)).$mount(t ? a.elm : void 0, t);
          }
        }, prepatch: function prepatch(a, t) {
          var e = t.componentOptions;Ga(t.componentInstance = a.componentInstance, e.propsData, e.listeners, t, e.children);
        }, insert: function insert(a) {
          var t = a.context,
              e = a.componentInstance;e._isMounted || (e._isMounted = !0, Pa(e, "mounted")), a.data.keepAlive && (t._isMounted ? Ua(e) : qa(e, !0));
        }, destroy: function destroy(a) {
          var t = a.componentInstance;t._isDestroyed || (a.data.keepAlive ? Da(t, !0) : t.$destroy());
        } },
          To = Object.keys($o),
          So = 1,
          jo = 2,
          Oo = 0;!function (a) {
        a.prototype._init = function (a) {
          var t = this;t._uid = Oo++, t._isVue = !0, a && a._isComponent ? Lt(t, a) : t.$options = Y(Nt(t.constructor), a || {}, t), t._renderProxy = t, t._self = t, La(t), Ba(t), It(t), Pa(t, "beforeCreate"), dt(t), Wa(t), ot(t), Pa(t, "created"), t.$options.el && t.$mount(t.$options.el);
        };
      }(Mt), function (a) {
        var t = {};t.get = function () {
          return this._data;
        };var e = {};e.get = function () {
          return this._props;
        }, Object.defineProperty(a.prototype, "$data", t), Object.defineProperty(a.prototype, "$props", e), a.prototype.$set = D, a.prototype.$delete = P, a.prototype.$watch = function (a, t, e) {
          var n = this;if (l(t)) return rt(n, a, t, e);e = e || {}, e.user = !0;var i = new Co(n, a, t, e);if (e.immediate) try {
            t.call(n, i.value);
          } catch (a) {
            ia(a, n, 'callback for immediate watcher "' + i.expression + '"');
          }return function () {
            i.teardown();
          };
        };
      }(Mt), function (a) {
        var t = /^hook:/;a.prototype.$on = function (a, e) {
          var n = this;if (Array.isArray(a)) for (var i = 0, r = a.length; i < r; i++) {
            n.$on(a[i], e);
          } else (n._events[a] || (n._events[a] = [])).push(e), t.test(a) && (n._hasHookEvent = !0);return n;
        }, a.prototype.$once = function (a, t) {
          function e() {
            n.$off(a, e), t.apply(n, arguments);
          }var n = this;return e.fn = t, n.$on(a, e), n;
        }, a.prototype.$off = function (a, t) {
          var e = this;if (!arguments.length) return e._events = Object.create(null), e;if (Array.isArray(a)) {
            for (var n = 0, i = a.length; n < i; n++) {
              e.$off(a[n], t);
            }return e;
          }var r = e._events[a];if (!r) return e;if (!t) return e._events[a] = null, e;for (var o, d = r.length; d--;) {
            if ((o = r[d]) === t || o.fn === t) {
              r.splice(d, 1);break;
            }
          }return e;
        }, a.prototype.$emit = function (a) {
          var t = this,
              e = t._events[a];if (e) {
            e = e.length > 1 ? w(e) : e;for (var n = w(arguments, 1), i = 0, r = e.length; i < r; i++) {
              try {
                e[i].apply(t, n);
              } catch (e) {
                ia(e, t, 'event handler for "' + a + '"');
              }
            }
          }return t;
        };
      }(Mt), function (a) {
        a.prototype._update = function (a, t) {
          var e = this,
              n = e.$el,
              i = e._vnode,
              r = Ia(e);e._vnode = a, e.$el = i ? e.__patch__(i, a) : e.__patch__(e.$el, a, t, !1), r(), n && (n.__vue__ = null), e.$el && (e.$el.__vue__ = e), e.$vnode && e.$parent && e.$vnode === e.$parent._vnode && (e.$parent.$el = e.$el);
        }, a.prototype.$forceUpdate = function () {
          var a = this;a._watcher && a._watcher.update();
        }, a.prototype.$destroy = function () {
          var a = this;if (!a._isBeingDestroyed) {
            Pa(a, "beforeDestroy"), a._isBeingDestroyed = !0;var t = a.$parent;!t || t._isBeingDestroyed || a.$options.abstract || m(t.$children, a), a._watcher && a._watcher.teardown();for (var e = a._watchers.length; e--;) {
              a._watchers[e].teardown();
            }a._data.__ob__ && a._data.__ob__.vmCount--, a._isDestroyed = !0, a.__patch__(a._vnode, null), Pa(a, "destroyed"), a.$off(), a.$el && (a.$el.__vue__ = null), a.$vnode && (a.$vnode.parent = null);
          }
        };
      }(Mt), function (a) {
        wt(a.prototype), a.prototype.$nextTick = function (a) {
          return la(a, this);
        }, a.prototype._render = function () {
          var a = this,
              t = a.$options,
              e = t.render,
              n = t._parentVnode;n && (a.$scopedSlots = n.data.scopedSlots || br), a.$vnode = n;var i;try {
            i = e.call(a._renderProxy, a.$createElement);
          } catch (t) {
            ia(t, a, "render"), i = a._vnode;
          }return i instanceof Wr || (i = Yr()), i.parent = n, i;
        };
      }(Mt);var Eo = [String, RegExp, Array],
          Io = { name: "keep-alive", abstract: !0, props: { include: Eo, exclude: Eo, max: [String, Number] }, created: function created() {
          this.cache = Object.create(null), this.keys = [];
        }, destroyed: function destroyed() {
          for (var a in this.cache) {
            Kt(this.cache, a, this.keys);
          }
        }, mounted: function mounted() {
          var a = this;this.$watch("include", function (t) {
            Jt(a, function (a) {
              return Vt(t, a);
            });
          }), this.$watch("exclude", function (t) {
            Jt(a, function (a) {
              return !Vt(t, a);
            });
          });
        }, render: function render() {
          var a = this.$slots.default,
              t = Ca(a),
              e = t && t.componentOptions;if (e) {
            var n = Ut(e),
                i = this,
                r = i.include,
                o = i.exclude;if (r && (!n || !Vt(r, n)) || o && n && Vt(o, n)) return t;var d = this,
                s = d.cache,
                l = d.keys,
                b = null == t.key ? e.Ctor.cid + (e.tag ? "::" + e.tag : "") : t.key;s[b] ? (t.componentInstance = s[b].componentInstance, m(l, b), l.push(b)) : (s[b] = t, l.push(b), this.max && l.length > parseInt(this.max) && Kt(s, l[0], l, this._vnode)), t.data.keepAlive = !0;
          }return t || a && a[0];
        } },
          Lo = { KeepAlive: Io };!function (a) {
        var t = {};t.get = function () {
          return Br;
        }, Object.defineProperty(a, "config", t), a.util = { warn: Ur, extend: k, mergeOptions: Y, defineReactive: q }, a.set = D, a.delete = P, a.nextTick = la, a.options = Object.create(null), Ar.forEach(function (t) {
          a.options[t + "s"] = Object.create(null);
        }), a.options._base = a, k(a.options.components, Lo), qt(a), Dt(a), Pt(a), Ht(a);
      }(Mt), Object.defineProperty(Mt.prototype, "$isServer", { get: Rr }), Object.defineProperty(Mt.prototype, "$ssrContext", { get: function get() {
          return this.$vnode && this.$vnode.ssrContext;
        } }), Object.defineProperty(Mt, "FunctionalRenderContext", { value: kt }), Mt.version = "2.5.22";var No,
          Go,
          Mo,
          qo,
          Do,
          Po,
          Ro,
          Fo,
          Ho,
          Uo = u("style,class"),
          Vo = u("input,textarea,option,select,progress"),
          Jo = function Jo(a, t, e) {
        return "value" === e && Vo(a) && "button" !== t || "selected" === e && "option" === a || "checked" === e && "input" === a || "muted" === e && "video" === a;
      },
          Ko = u("contenteditable,draggable,spellcheck"),
          Wo = u("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,translate,truespeed,typemustmatch,visible"),
          Xo = "http://www.w3.org/1999/xlink",
          Yo = function Yo(a) {
        return ":" === a.charAt(5) && "xlink" === a.slice(0, 5);
      },
          Zo = function Zo(a) {
        return Yo(a) ? a.slice(6, a.length) : "";
      },
          Qo = function Qo(a) {
        return null == a || !1 === a;
      },
          ad = { svg: "http://www.w3.org/2000/svg", math: "http://www.w3.org/1998/Math/MathML" },
          td = u("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot"),
          ed = u("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view", !0),
          nd = function nd(a) {
        return "pre" === a;
      },
          id = function id(a) {
        return td(a) || ed(a);
      },
          rd = Object.create(null),
          od = u("text,number,password,search,email,tel,url"),
          dd = Object.freeze({ createElement: re, createElementNS: oe, createTextNode: de, createComment: se, insertBefore: le, removeChild: be, appendChild: ce, parentNode: ve, nextSibling: fe, tagName: ue, setTextContent: me, setStyleScope: he }),
          sd = { create: function create(a, t) {
          pe(t);
        }, update: function update(a, t) {
          a.data.ref !== t.data.ref && (pe(a, !0), pe(t));
        }, destroy: function destroy(a) {
          pe(a, !0);
        } },
          ld = new Wr("", {}, []),
          bd = ["create", "activate", "update", "remove", "destroy"],
          cd = { create: ke, update: ke, destroy: function destroy(a) {
          ke(a, ld);
        } },
          vd = Object.create(null),
          fd = [sd, cd],
          ud = { create: Be, update: Be },
          md = { create: Te, update: Te },
          hd = /[\w).+\-_$\]]/,
          pd = "__r",
          gd = "__c",
          xd = { create: rn, update: rn },
          wd = { create: on, update: on },
          kd = p(function (a) {
        var t = {},
            e = /;(?![^(]*\))/g,
            n = /:(.+)/;return a.split(e).forEach(function (a) {
          if (a) {
            var e = a.split(n);e.length > 1 && (t[e[0].trim()] = e[1].trim());
          }
        }), t;
      }),
          yd = /^--/,
          _d = /\s*!important$/,
          Ad = function Ad(a, t, e) {
        if (yd.test(t)) a.style.setProperty(t, e);else if (_d.test(e)) a.style.setProperty(t, e.replace(_d, ""), "important");else {
          var n = Bd(t);if (Array.isArray(e)) for (var i = 0, r = e.length; i < r; i++) {
            a.style[n] = e[i];
          } else a.style[n] = e;
        }
      },
          Cd = ["Webkit", "Moz", "ms"],
          Bd = p(function (a) {
        if (Ho = Ho || document.createElement("div").style, "filter" !== (a = hr(a)) && a in Ho) return a;for (var t = a.charAt(0).toUpperCase() + a.slice(1), e = 0; e < Cd.length; e++) {
          var n = Cd[e] + t;if (n in Ho) return n;
        }
      }),
          zd = { create: fn, update: fn },
          $d = /\s+/,
          Td = p(function (a) {
        return { enterClass: a + "-enter", enterToClass: a + "-enter-to", enterActiveClass: a + "-enter-active", leaveClass: a + "-leave", leaveToClass: a + "-leave-to", leaveActiveClass: a + "-leave-active" };
      }),
          Sd = Tr && !Ir,
          jd = "transition",
          Od = "animation",
          Ed = "transition",
          Id = "transitionend",
          Ld = "animation",
          Nd = "animationend";Sd && (void 0 === window.ontransitionend && void 0 !== window.onwebkittransitionend && (Ed = "WebkitTransition", Id = "webkitTransitionEnd"), void 0 === window.onanimationend && void 0 !== window.onwebkitanimationend && (Ld = "WebkitAnimation", Nd = "webkitAnimationEnd"));var Gd = Tr ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout : function (a) {
        return a();
      },
          Md = /\b(transform|all)(,|$)/,
          qd = Tr ? { create: $n, activate: $n, remove: function remove(a, t) {
          !0 !== a.data.show ? Cn(a, t) : t();
        } } : {},
          Dd = [ud, md, xd, wd, zd, qd],
          Pd = Dd.concat(fd),
          Rd = function (a) {
        function t(a) {
          return new Wr(j.tagName(a).toLowerCase(), {}, [], void 0, a);
        }function e(a, t) {
          function e() {
            0 == --e.listeners && o(a);
          }return e.listeners = t, e;
        }function o(a) {
          var t = j.parentNode(a);i(t) && j.removeChild(t, a);
        }function s(a, t, e, n, o, d, s) {
          if (i(a.elm) && i(d) && (a = d[s] = I(a)), a.isRootInsert = !o, !l(a, t, e, n)) {
            var b = a.data,
                c = a.children,
                u = a.tag;i(u) ? (a.elm = a.ns ? j.createElementNS(a.ns, u) : j.createElement(u, a), p(a), f(a, c, t), i(b) && h(a, t), v(e, a.elm, n)) : r(a.isComment) ? (a.elm = j.createComment(a.text), v(e, a.elm, n)) : (a.elm = j.createTextNode(a.text), v(e, a.elm, n));
          }
        }function l(a, t, e, n) {
          var o = a.data;if (i(o)) {
            var d = i(a.componentInstance) && o.keepAlive;if (i(o = o.hook) && i(o = o.init) && o(a, !1), i(a.componentInstance)) return b(a, t), v(e, a.elm, n), r(d) && c(a, t, e, n), !0;
          }
        }function b(a, t) {
          i(a.data.pendingInsert) && (t.push.apply(t, a.data.pendingInsert), a.data.pendingInsert = null), a.elm = a.componentInstance.$el, m(a) ? (h(a, t), p(a)) : (pe(a), t.push(a));
        }function c(a, t, e, n) {
          for (var r, o = a; o.componentInstance;) {
            if (o = o.componentInstance._vnode, i(r = o.data) && i(r = r.transition)) {
              for (r = 0; r < T.activate.length; ++r) {
                T.activate[r](ld, o);
              }t.push(o);break;
            }
          }v(e, a.elm, n);
        }function v(a, t, e) {
          i(a) && (i(e) ? j.parentNode(e) === a && j.insertBefore(a, t, e) : j.appendChild(a, t));
        }function f(a, t, e) {
          if (Array.isArray(t)) for (var n = 0; n < t.length; ++n) {
            s(t[n], e, a.elm, null, !0, t, n);
          } else d(a.text) && j.appendChild(a.elm, j.createTextNode(String(a.text)));
        }function m(a) {
          for (; a.componentInstance;) {
            a = a.componentInstance._vnode;
          }return i(a.tag);
        }function h(a, t) {
          for (var e = 0; e < T.create.length; ++e) {
            T.create[e](ld, a);
          }z = a.data.hook, i(z) && (i(z.create) && z.create(ld, a), i(z.insert) && t.push(a));
        }function p(a) {
          var t;if (i(t = a.fnScopeId)) j.setStyleScope(a.elm, t);else for (var e = a; e;) {
            i(t = e.context) && i(t = t.$options._scopeId) && j.setStyleScope(a.elm, t), e = e.parent;
          }i(t = po) && t !== a.context && t !== a.fnContext && i(t = t.$options._scopeId) && j.setStyleScope(a.elm, t);
        }function g(a, t, e, n, i, r) {
          for (; n <= i; ++n) {
            s(e[n], r, a, t, !1, e, n);
          }
        }function x(a) {
          var t,
              e,
              n = a.data;if (i(n)) for (i(t = n.hook) && i(t = t.destroy) && t(a), t = 0; t < T.destroy.length; ++t) {
            T.destroy[t](a);
          }if (i(t = a.children)) for (e = 0; e < a.children.length; ++e) {
            x(a.children[e]);
          }
        }function w(a, t, e, n) {
          for (; e <= n; ++e) {
            var r = t[e];i(r) && (i(r.tag) ? (k(r), x(r)) : o(r.elm));
          }
        }function k(a, t) {
          if (i(t) || i(a.data)) {
            var n,
                r = T.remove.length + 1;for (i(t) ? t.listeners += r : t = e(a.elm, r), i(n = a.componentInstance) && i(n = n._vnode) && i(n.data) && k(n, t), n = 0; n < T.remove.length; ++n) {
              T.remove[n](a, t);
            }i(n = a.data.hook) && i(n = n.remove) ? n(a, t) : t();
          } else o(a.elm);
        }function y(a, t, e, r, o) {
          for (var d, l, b, c, v = 0, f = 0, u = t.length - 1, m = t[0], h = t[u], p = e.length - 1, x = e[0], k = e[p], y = !o; v <= u && f <= p;) {
            n(m) ? m = t[++v] : n(h) ? h = t[--u] : ge(m, x) ? (A(m, x, r, e, f), m = t[++v], x = e[++f]) : ge(h, k) ? (A(h, k, r, e, p), h = t[--u], k = e[--p]) : ge(m, k) ? (A(m, k, r, e, p), y && j.insertBefore(a, m.elm, j.nextSibling(h.elm)), m = t[++v], k = e[--p]) : ge(h, x) ? (A(h, x, r, e, f), y && j.insertBefore(a, h.elm, m.elm), h = t[--u], x = e[++f]) : (n(d) && (d = we(t, v, u)), l = i(x.key) ? d[x.key] : _(x, t, v, u), n(l) ? s(x, r, a, m.elm, !1, e, f) : (b = t[l], ge(b, x) ? (A(b, x, r, e, f), t[l] = void 0, y && j.insertBefore(a, b.elm, m.elm)) : s(x, r, a, m.elm, !1, e, f)), x = e[++f]);
          }v > u ? (c = n(e[p + 1]) ? null : e[p + 1].elm, g(a, c, e, f, p, r)) : f > p && w(a, t, v, u);
        }function _(a, t, e, n) {
          for (var r = e; r < n; r++) {
            var o = t[r];if (i(o) && ge(a, o)) return r;
          }
        }function A(a, t, e, o, d, s) {
          if (a !== t) {
            i(t.elm) && i(o) && (t = o[d] = I(t));var l = t.elm = a.elm;if (r(a.isAsyncPlaceholder)) return void (i(t.asyncFactory.resolved) ? B(a.elm, t, e) : t.isAsyncPlaceholder = !0);if (r(t.isStatic) && r(a.isStatic) && t.key === a.key && (r(t.isCloned) || r(t.isOnce))) return void (t.componentInstance = a.componentInstance);var b,
                c = t.data;i(c) && i(b = c.hook) && i(b = b.prepatch) && b(a, t);var v = a.children,
                f = t.children;if (i(c) && m(t)) {
              for (b = 0; b < T.update.length; ++b) {
                T.update[b](a, t);
              }i(b = c.hook) && i(b = b.update) && b(a, t);
            }n(t.text) ? i(v) && i(f) ? v !== f && y(l, v, f, e, s) : i(f) ? (i(a.text) && j.setTextContent(l, ""), g(l, null, f, 0, f.length - 1, e)) : i(v) ? w(l, v, 0, v.length - 1) : i(a.text) && j.setTextContent(l, "") : a.text !== t.text && j.setTextContent(l, t.text), i(c) && i(b = c.hook) && i(b = b.postpatch) && b(a, t);
          }
        }function C(a, t, e) {
          if (r(e) && i(a.parent)) a.parent.data.pendingInsert = t;else for (var n = 0; n < t.length; ++n) {
            t[n].data.hook.insert(t[n]);
          }
        }function B(a, t, e, n) {
          var o,
              d = t.tag,
              s = t.data,
              l = t.children;if (n = n || s && s.pre, t.elm = a, r(t.isComment) && i(t.asyncFactory)) return t.isAsyncPlaceholder = !0, !0;if (i(s) && (i(o = s.hook) && i(o = o.init) && o(t, !0), i(o = t.componentInstance))) return b(t, e), !0;if (i(d)) {
            if (i(l)) if (a.hasChildNodes()) {
              if (i(o = s) && i(o = o.domProps) && i(o = o.innerHTML)) {
                if (o !== a.innerHTML) return !1;
              } else {
                for (var c = !0, v = a.firstChild, u = 0; u < l.length; u++) {
                  if (!v || !B(v, l[u], e, n)) {
                    c = !1;break;
                  }v = v.nextSibling;
                }if (!c || v) return !1;
              }
            } else f(t, l, e);if (i(s)) {
              var m = !1;for (var p in s) {
                if (!O(p)) {
                  m = !0, h(t, e);break;
                }
              }!m && s.class && ba(s.class);
            }
          } else a.data !== t.text && (a.data = t.text);return !0;
        }var z,
            $,
            T = {},
            S = a.modules,
            j = a.nodeOps;for (z = 0; z < bd.length; ++z) {
          for (T[bd[z]] = [], $ = 0; $ < S.length; ++$) {
            i(S[$][bd[z]]) && T[bd[z]].push(S[$][bd[z]]);
          }
        }var O = u("attrs,class,staticClass,staticStyle,key");return function (a, e, o, d) {
          if (n(e)) return void (i(a) && x(a));var l = !1,
              b = [];if (n(a)) l = !0, s(e, b);else {
            var c = i(a.nodeType);if (!c && ge(a, e)) A(a, e, b, null, null, d);else {
              if (c) {
                if (1 === a.nodeType && a.hasAttribute(_r) && (a.removeAttribute(_r), o = !0), r(o) && B(a, e, b)) return C(e, b, !0), a;a = t(a);
              }var v = a.elm,
                  f = j.parentNode(v);if (s(e, b, v._leaveCb ? null : f, j.nextSibling(v)), i(e.parent)) for (var u = e.parent, h = m(e); u;) {
                for (var p = 0; p < T.destroy.length; ++p) {
                  T.destroy[p](u);
                }if (u.elm = e.elm, h) {
                  for (var g = 0; g < T.create.length; ++g) {
                    T.create[g](ld, u);
                  }var k = u.data.hook.insert;if (k.merged) for (var y = 1; y < k.fns.length; y++) {
                    k.fns[y]();
                  }
                } else pe(u);u = u.parent;
              }i(f) ? w(f, [a], 0, 0) : i(a.tag) && x(a);
            }
          }return C(e, b, l), e.elm;
        };
      }({ nodeOps: dd, modules: Pd });Ir && document.addEventListener("selectionchange", function () {
        var a = document.activeElement;a && a.vmodel && Ln(a, "input");
      });var Fd = { inserted: function inserted(a, t, e, n) {
          "select" === e.tag ? (n.elm && !n.elm._vOptions ? ua(e, "postpatch", function () {
            Fd.componentUpdated(a, t, e);
          }) : Tn(a, t, e.context), a._vOptions = [].map.call(a.options, On)) : ("textarea" === e.tag || od(a.type)) && (a._vModifiers = t.modifiers, t.modifiers.lazy || (a.addEventListener("compositionstart", En), a.addEventListener("compositionend", In), a.addEventListener("change", In), Ir && (a.vmodel = !0)));
        }, componentUpdated: function componentUpdated(a, t, e) {
          if ("select" === e.tag) {
            Tn(a, t, e.context);var n = a._vOptions,
                i = a._vOptions = [].map.call(a.options, On);if (i.some(function (a, t) {
              return !A(a, n[t]);
            })) {
              (a.multiple ? t.value.some(function (a) {
                return jn(a, i);
              }) : t.value !== t.oldValue && jn(t.value, i)) && Ln(a, "change");
            }
          }
        } },
          Hd = { bind: function bind(a, t, e) {
          var n = t.value;e = Nn(e);var i = e.data && e.data.transition,
              r = a.__vOriginalDisplay = "none" === a.style.display ? "" : a.style.display;n && i ? (e.data.show = !0, An(e, function () {
            a.style.display = r;
          })) : a.style.display = n ? r : "none";
        }, update: function update(a, t, e) {
          var n = t.value;!n != !t.oldValue && (e = Nn(e), e.data && e.data.transition ? (e.data.show = !0, n ? An(e, function () {
            a.style.display = a.__vOriginalDisplay;
          }) : Cn(e, function () {
            a.style.display = "none";
          })) : a.style.display = n ? a.__vOriginalDisplay : "none");
        }, unbind: function unbind(a, t, e, n, i) {
          i || (a.style.display = a.__vOriginalDisplay);
        } },
          Ud = { model: Fd, show: Hd },
          Vd = { name: String, appear: Boolean, css: Boolean, mode: String, type: String, enterClass: String, leaveClass: String, enterToClass: String, leaveToClass: String, enterActiveClass: String, leaveActiveClass: String, appearClass: String, appearActiveClass: String, appearToClass: String, duration: [Number, String, Object] },
          Jd = function Jd(a) {
        return a.tag || Aa(a);
      },
          Kd = function Kd(a) {
        return "show" === a.name;
      },
          Wd = { name: "transition", props: Vd, abstract: !0, render: function render(a) {
          var t = this,
              e = this.$slots.default;if (e && (e = e.filter(Jd), e.length)) {
            var n = this.mode,
                i = e[0];if (Dn(this.$vnode)) return i;var r = Gn(i);if (!r) return i;if (this._leaving) return qn(a, i);var o = "__transition-" + this._uid + "-";r.key = null == r.key ? r.isComment ? o + "comment" : o + r.tag : d(r.key) ? 0 === String(r.key).indexOf(o) ? r.key : o + r.key : r.key;var s = (r.data || (r.data = {})).transition = Mn(this),
                l = this._vnode,
                b = Gn(l);if (r.data.directives && r.data.directives.some(Kd) && (r.data.show = !0), b && b.data && !Pn(r, b) && !Aa(b) && (!b.componentInstance || !b.componentInstance._vnode.isComment)) {
              var c = b.data.transition = k({}, s);if ("out-in" === n) return this._leaving = !0, ua(c, "afterLeave", function () {
                t._leaving = !1, t.$forceUpdate();
              }), qn(a, i);if ("in-out" === n) {
                if (Aa(r)) return l;var v,
                    f = function f() {
                  v();
                };ua(s, "afterEnter", f), ua(s, "enterCancelled", f), ua(c, "delayLeave", function (a) {
                  v = a;
                });
              }
            }return i;
          }
        } },
          Xd = k({ tag: String, moveClass: String }, Vd);delete Xd.mode;var Yd = { props: Xd, beforeMount: function beforeMount() {
          var a = this,
              t = this._update;this._update = function (e, n) {
            var i = Ia(a);a.__patch__(a._vnode, a.kept, !1, !0), a._vnode = a.kept, i(), t.call(a, e, n);
          };
        }, render: function render(a) {
          for (var t = this.tag || this.$vnode.data.tag || "span", e = Object.create(null), n = this.prevChildren = this.children, i = this.$slots.default || [], r = this.children = [], o = Mn(this), d = 0; d < i.length; d++) {
            var s = i[d];if (s.tag) if (null != s.key && 0 !== String(s.key).indexOf("__vlist")) r.push(s), e[s.key] = s, (s.data || (s.data = {})).transition = o;else ;
          }if (n) {
            for (var l = [], b = [], c = 0; c < n.length; c++) {
              var v = n[c];v.data.transition = o, v.data.pos = v.elm.getBoundingClientRect(), e[v.key] ? l.push(v) : b.push(v);
            }this.kept = a(t, null, l), this.removed = b;
          }return a(t, null, r);
        }, updated: function updated() {
          var a = this.prevChildren,
              t = this.moveClass || (this.name || "v") + "-move";a.length && this.hasMove(a[0].elm, t) && (a.forEach(Rn), a.forEach(Fn), a.forEach(Hn), this._reflow = document.body.offsetHeight, a.forEach(function (a) {
            if (a.data.moved) {
              var e = a.elm,
                  n = e.style;gn(e, t), n.transform = n.WebkitTransform = n.transitionDuration = "", e.addEventListener(Id, e._moveCb = function a(n) {
                n && n.target !== e || n && !/transform$/.test(n.propertyName) || (e.removeEventListener(Id, a), e._moveCb = null, xn(e, t));
              });
            }
          }));
        }, methods: { hasMove: function hasMove(a, t) {
            if (!Sd) return !1;if (this._hasMove) return this._hasMove;var e = a.cloneNode();a._transitionClasses && a._transitionClasses.forEach(function (a) {
              mn(e, a);
            }), un(e, t), e.style.display = "none", this.$el.appendChild(e);var n = kn(e);return this.$el.removeChild(e), this._hasMove = n.hasTransform;
          } } },
          Zd = { Transition: Wd, TransitionGroup: Yd };Mt.config.mustUseProp = Jo, Mt.config.isReservedTag = id, Mt.config.isReservedAttr = Uo, Mt.config.getTagNamespace = ee, Mt.config.isUnknownElement = ne, k(Mt.options.directives, Ud), k(Mt.options.components, Zd), Mt.prototype.__patch__ = Tr ? Rd : _, Mt.prototype.$mount = function (a, t) {
        return a = a && Tr ? ie(a) : void 0, Na(this, a, t);
      }, Tr && setTimeout(function () {
        Br.devtools && Fr && Fr.emit("init", Mt);
      }, 0);var Qd,
          as,
          ts,
          es,
          ns,
          is,
          rs,
          os,
          ds,
          ss,
          ls,
          bs,
          cs = /\{\{((?:.|\r?\n)+?)\}\}/g,
          vs = /[-.*+?^${}()|[\]\/\\]/g,
          fs = p(function (a) {
        var t = a[0].replace(vs, "\\$&"),
            e = a[1].replace(vs, "\\$&");return new RegExp(t + "((?:.|\\n)+?)" + e, "g");
      }),
          us = { staticKeys: ["staticClass"], transformNode: Vn, genData: Jn },
          ms = { staticKeys: ["staticStyle"], transformNode: Kn, genData: Wn },
          hs = { decode: function decode(a) {
          return Qd = Qd || document.createElement("div"), Qd.innerHTML = a, Qd.textContent;
        } },
          ps = u("area,base,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr"),
          gs = u("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source"),
          xs = u("address,article,aside,base,blockquote,body,caption,col,colgroup,dd,details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,title,tr,track"),
          ws = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/,
          ks = "[a-zA-Z_][\\w\\-\\.]*",
          ys = "((?:" + ks + "\\:)?" + ks + ")",
          _s = new RegExp("^<" + ys),
          As = /^\s*(\/?)>/,
          Cs = new RegExp("^<\\/" + ys + "[^>]*>"),
          Bs = /^<!DOCTYPE [^>]+>/i,
          zs = /^<!\--/,
          $s = /^<!\[/,
          Ts = u("script,style,textarea", !0),
          Ss = {},
          js = { "&lt;": "<", "&gt;": ">", "&quot;": '"', "&amp;": "&", "&#10;": "\n", "&#9;": "\t" },
          Os = /&(?:lt|gt|quot|amp);/g,
          Es = /&(?:lt|gt|quot|amp|#10|#9);/g,
          Is = u("pre,textarea", !0),
          Ls = function Ls(a, t) {
        return a && Is(a) && "\n" === t[0];
      },
          Ns = /^@|^v-on:/,
          Gs = /^v-|^@|^:/,
          Ms = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,
          qs = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/,
          Ds = /^\(|\)$/g,
          Ps = /:(.*)$/,
          Rs = /^:|^v-bind:/,
          Fs = /\.[^.]+/g,
          Hs = p(hs.decode),
          Us = /^xmlns:NS\d+/,
          Vs = /^NS\d+:/,
          Js = { preTransformNode: ki },
          Ks = [us, ms, Js],
          Ws = { model: We, text: _i, html: Ai },
          Xs = { expectHTML: !0, modules: Ks, directives: Ws, isPreTag: nd, isUnaryTag: ps, mustUseProp: Jo, canBeLeftOpenTag: gs, isReservedTag: id, getTagNamespace: ee, staticKeys: function (a) {
          return a.reduce(function (a, t) {
            return a.concat(t.staticKeys || []);
          }, []).join(",");
        }(Ks) },
          Ys = p(Bi),
          Zs = /^([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/,
          Qs = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/,
          al = { esc: 27, tab: 9, enter: 13, space: 32, up: 38, left: 37, right: 39, down: 40, delete: [8, 46] },
          tl = { esc: ["Esc", "Escape"], tab: "Tab", enter: "Enter", space: [" ", "Spacebar"], up: ["Up", "ArrowUp"], left: ["Left", "ArrowLeft"], right: ["Right", "ArrowRight"], down: ["Down", "ArrowDown"], delete: ["Backspace", "Delete", "Del"] },
          el = function el(a) {
        return "if(" + a + ")return null;";
      },
          nl = { stop: "$event.stopPropagation();", prevent: "$event.preventDefault();", self: el("$event.target !== $event.currentTarget"), ctrl: el("!$event.ctrlKey"), shift: el("!$event.shiftKey"), alt: el("!$event.altKey"), meta: el("!$event.metaKey"), left: el("'button' in $event && $event.button !== 0"), middle: el("'button' in $event && $event.button !== 1"), right: el("'button' in $event && $event.button !== 2") },
          il = { on: Li, bind: Ni, cloak: _ },
          rl = function rl(a) {
        this.options = a, this.warn = a.warn || Oe, this.transforms = Ee(a.modules, "transformCode"), this.dataGenFns = Ee(a.modules, "genData"), this.directives = k(k({}, il), a.directives);var t = a.isReservedTag || kr;this.maybeComponent = function (a) {
          return !(t(a.tag) && !a.component);
        }, this.onceId = 0, this.staticRenderFns = [], this.pre = !1;
      },
          ol = (new RegExp("\\b" + "do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,super,throw,while,yield,delete,export,import,return,switch,default,extends,finally,continue,debugger,function,arguments".split(",").join("\\b|\\b") + "\\b"), new RegExp("\\b" + "delete,typeof,void".split(",").join("\\s*\\([^\\)]*\\)|\\b") + "\\s*\\([^\\)]*\\)"), function (a) {
        return function (t) {
          function e(e, n) {
            var i = Object.create(t),
                r = [],
                o = [];if (i.warn = function (a, t) {
              (t ? o : r).push(a);
            }, n) {
              n.modules && (i.modules = (t.modules || []).concat(n.modules)), n.directives && (i.directives = k(Object.create(t.directives || null), n.directives));for (var d in n) {
                "modules" !== d && "directives" !== d && (i[d] = n[d]);
              }
            }var s = a(e, i);return s.errors = r, s.tips = o, s;
          }return { compile: e, compileToFunctions: dr(e) };
        };
      }(function (a, t) {
        var e = Qn(a.trim(), t);!1 !== t.optimize && Ci(e, t);var n = Gi(e, t);return { ast: e, render: n.render, staticRenderFns: n.staticRenderFns };
      })),
          dl = ol(Xs),
          sl = (dl.compile, dl.compileToFunctions),
          ll = !!Tr && sr(!1),
          bl = !!Tr && sr(!0),
          cl = p(function (a) {
        var t = ie(a);return t && t.innerHTML;
      }),
          vl = Mt.prototype.$mount;Mt.prototype.$mount = function (a, t) {
        if ((a = a && ie(a)) === document.body || a === document.documentElement) return this;var e = this.$options;if (!e.render) {
          var n = e.template;if (n) {
            if ("string" == typeof n) "#" === n.charAt(0) && (n = cl(n));else {
              if (!n.nodeType) return this;n = n.innerHTML;
            }
          } else a && (n = lr(a));if (n) {
            var i = sl(n, { shouldDecodeNewlines: ll, shouldDecodeNewlinesForHref: bl, delimiters: e.delimiters, comments: e.comments }, this),
                r = i.render,
                o = i.staticRenderFns;e.render = r, e.staticRenderFns = o;
          }
        }return vl.call(this, a, t);
      }, Mt.compile = sl, t.a = Mt;
    }).call(t, e(1), e(15).setImmediate);
  }, function (a, t, e) {
    "use strict";
    var n = e(5),
        i = e(26),
        r = e(0),
        o = r(n.a, i.a, !1, null, null, null);t.a = o.exports;
  }, function (a, t, e) {
    "use strict";
    var n = e(18),
        i = e(21);t.a = { name: "Tags", components: { TagLabel: n.a, TagLink: i.a }, props: { tags: { type: Array, default: function _default() {
            return [];
          }, required: !1 }, type: { type: String, default: "", required: !0 }, eventHub: { type: Object, default: function _default() {
            return null;
          }, required: !0 }, tagAreaClass: { type: String, default: "", required: !0 }, tagContentClass: { type: String, default: "", required: !0 }, deleteAreaClass: { type: String, default: "", required: !0 }, deleteContentClass: { type: String, default: "", required: !0 }, tagCustomClass: { type: String, default: "", required: !0 } }, computed: { isLabel: function isLabel() {
          return "label" === this.type;
        }, isLink: function isLink() {
          return "link" === this.type;
        } }, methods: { deleteTag: function deleteTag(a) {
          this.tags.splice(a, 1);
        } } };
  }, function (a, t, e) {
    "use strict";
    var n = e(7);t.a = { name: "TagLabel", components: { TagDeleteButton: n.a }, props: { tagname: { type: String, default: "", required: !0 }, eventHub: { type: Object, default: function _default() {
            return null;
          }, required: !0 }, tagAreaClass: { type: String, default: "", required: !0 }, tagContentClass: { type: String, default: "", required: !0 }, deleteAreaClass: { type: String, default: "", required: !0 }, deleteContentClass: { type: String, default: "", required: !0 }, tagCustomClass: { type: String, default: "", required: !0 } }, methods: { emitDeleteTag: function emitDeleteTag() {
          this.$emit("delete-tag");
        } } };
  }, function (a, t, e) {
    "use strict";
    var n = e(8),
        i = e(19),
        r = e(0),
        o = r(n.a, i.a, !1, null, null, null);t.a = o.exports;
  }, function (a, t, e) {
    "use strict";
    t.a = { name: "TagDeleteButton", props: { tagname: { type: String, default: "", required: !0 }, eventHub: { type: Object, default: function _default() {
            return null;
          }, required: !0 }, deleteAreaClass: { type: String, default: "", required: !0 }, deleteContentClass: { type: String, default: "", required: !0 } }, methods: { emitDeleteTag: function emitDeleteTag() {
          this.$emit("delete-tag"), this.eventHub.$emit("delete-tag", this.tagname);
        } } };
  }, function (a, t) {
    function e(a, t) {
      var e = a[1] || "",
          i = a[3];if (!i) return e;if (t && "function" == typeof btoa) {
        var r = n(i);return [e].concat(i.sources.map(function (a) {
          return "/*# sourceURL=" + i.sourceRoot + a + " */";
        })).concat([r]).join("\n");
      }return [e].join("\n");
    }function n(a) {
      return "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(a)))) + " */";
    }a.exports = function (a) {
      var t = [];return t.toString = function () {
        return this.map(function (t) {
          var n = e(t, a);return t[2] ? "@media " + t[2] + "{" + n + "}" : n;
        }).join("");
      }, t.i = function (a, e) {
        "string" == typeof a && (a = [[null, a, ""]]);for (var n = {}, i = 0; i < this.length; i++) {
          var r = this[i][0];"number" == typeof r && (n[r] = !0);
        }for (i = 0; i < a.length; i++) {
          var o = a[i];"number" == typeof o[0] && n[o[0]] || (e && !o[2] ? o[2] = e : e && (o[2] = "(" + o[2] + ") and (" + e + ")"), t.push(o));
        }
      }, t;
    };
  }, function (a, t, e) {
    function n(a) {
      for (var t = 0; t < a.length; t++) {
        var e = a[t],
            n = b[e.id];if (n) {
          n.refs++;for (var i = 0; i < n.parts.length; i++) {
            n.parts[i](e.parts[i]);
          }for (; i < e.parts.length; i++) {
            n.parts.push(r(e.parts[i]));
          }n.parts.length > e.parts.length && (n.parts.length = e.parts.length);
        } else {
          for (var o = [], i = 0; i < e.parts.length; i++) {
            o.push(r(e.parts[i]));
          }b[e.id] = { id: e.id, refs: 1, parts: o };
        }
      }
    }function i() {
      var a = document.createElement("style");return a.type = "text/css", c.appendChild(a), a;
    }function r(a) {
      var t,
          e,
          n = document.querySelector("style[" + p + '~="' + a.id + '"]');if (n) {
        if (u) return m;n.parentNode.removeChild(n);
      }if (g) {
        var r = f++;n = v || (v = i()), t = o.bind(null, n, r, !1), e = o.bind(null, n, r, !0);
      } else n = i(), t = d.bind(null, n), e = function e() {
        n.parentNode.removeChild(n);
      };return t(a), function (n) {
        if (n) {
          if (n.css === a.css && n.media === a.media && n.sourceMap === a.sourceMap) return;t(a = n);
        } else e();
      };
    }function o(a, t, e, n) {
      var i = e ? "" : n.css;if (a.styleSheet) a.styleSheet.cssText = x(t, i);else {
        var r = document.createTextNode(i),
            o = a.childNodes;o[t] && a.removeChild(o[t]), o.length ? a.insertBefore(r, o[t]) : a.appendChild(r);
      }
    }function d(a, t) {
      var e = t.css,
          n = t.media,
          i = t.sourceMap;if (n && a.setAttribute("media", n), h.ssrId && a.setAttribute(p, t.id), i && (e += "\n/*# sourceURL=" + i.sources[0] + " */", e += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(i)))) + " */"), a.styleSheet) a.styleSheet.cssText = e;else {
        for (; a.firstChild;) {
          a.removeChild(a.firstChild);
        }a.appendChild(document.createTextNode(e));
      }
    }var s = "undefined" != typeof document;if ("undefined" != typeof DEBUG && DEBUG && !s) throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var l = e(24),
        b = {},
        c = s && (document.head || document.getElementsByTagName("head")[0]),
        v = null,
        f = 0,
        u = !1,
        m = function m() {},
        h = null,
        p = "data-vue-ssr-id",
        g = "undefined" != typeof navigator && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase());a.exports = function (a, t, e, i) {
      u = e, h = i || {};var r = l(a, t);return n(r), function (t) {
        for (var e = [], i = 0; i < r.length; i++) {
          var o = r[i],
              d = b[o.id];d.refs--, e.push(d);
        }t ? (r = l(a, t), n(r)) : r = [];for (var i = 0; i < e.length; i++) {
          var d = e[i];if (0 === d.refs) {
            for (var s = 0; s < d.parts.length; s++) {
              d.parts[s]();
            }delete b[d.id];
          }
        }
      };
    };var x = function () {
      var a = [];return function (t, e) {
        return a[t] = e, a.filter(Boolean).join("\n");
      };
    }();
  }, function (a, t, e) {
    "use strict";
    var n = e(7);t.a = { name: "TagLink", components: { TagDeleteButton: n.a }, props: { tagname: { type: String, default: "", required: !0 }, eventHub: { type: Object, default: function _default() {
            return null;
          }, required: !0 }, tagAreaClass: { type: String, default: "", required: !0 }, tagContentClass: { type: String, default: "", required: !0 }, deleteAreaClass: { type: String, default: "", required: !0 }, deleteContentClass: { type: String, default: "", required: !0 }, tagCustomClass: { type: String, default: "", required: !0 } }, methods: { emitDeleteTag: function emitDeleteTag() {
          this.$emit("delete-tag");
        }, emitClickTag: function emitClickTag() {
          this.eventHub.$emit("click-tag", this.$refs.tagname.textContent);
        } } };
  }, function (a, t, e) {
    "use strict";
    var n = e(3),
        i = e(4);t.a = { name: "VueTagEditorBulma", components: { Tags: i.a }, props: { tags: { type: Array, default: function _default() {
            return [];
          }, required: !1 }, type: { type: String, default: "label", required: !1 }, tagCustomClass: { type: String, default: "", required: !1 }, inputContentClass: { type: String, default: "", required: !1 }, placeholder: { type: String, default: " Add tags...", required: !1 } }, data: function data() {
        return { tag: "", isAddTag: !1, eventHub: new n.a() };
      }, mounted: function mounted() {
        this.eventHub.$on("click-tag", this._emitClickTag), this.eventHub.$on("delete-tag", this._emitDeleteTag);
      }, methods: { inputTagWithEmit: function inputTagWithEmit() {
          var a = this,
              t = this.tag;this._enableAdd(this.tag) && (this.tags.push(this.tag), this.isAddTag = !0), this.tag = null, this.$nextTick(function () {
            a.$emit("handler-after-input-tag", t, a.isAddTag), a.isAddTag = !1;
          });
        }, _enableAdd: function _enableAdd(a) {
          return -1 == this.tags.indexOf(a) && void 0 != a || "";
        }, _emitClickTag: function _emitClickTag(a) {
          this.$emit("handler-after-click-tag", a);
        }, _emitDeleteTag: function _emitDeleteTag(a) {
          this.$emit("handler-after-delete-tag", a);
        } } };
  }, function (a, t, e) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n = e(14),
        i = e(28);e.d(t, "VueTagEditor", function () {
      return n.a;
    }), e.d(t, "VueTagEditorBulma", function () {
      return i.a;
    });
  }, function (a, t, e) {
    "use strict";
    var n = e(2),
        i = e(27),
        r = e(0),
        o = r(n.a, i.a, !1, null, null, null);t.a = o.exports;
  }, function (a, t, e) {
    (function (a) {
      function n(a, t) {
        this._id = a, this._clearFn = t;
      }var i = void 0 !== a && a || "undefined" != typeof self && self || window,
          r = Function.prototype.apply;t.setTimeout = function () {
        return new n(r.call(setTimeout, i, arguments), clearTimeout);
      }, t.setInterval = function () {
        return new n(r.call(setInterval, i, arguments), clearInterval);
      }, t.clearTimeout = t.clearInterval = function (a) {
        a && a.close();
      }, n.prototype.unref = n.prototype.ref = function () {}, n.prototype.close = function () {
        this._clearFn.call(i, this._id);
      }, t.enroll = function (a, t) {
        clearTimeout(a._idleTimeoutId), a._idleTimeout = t;
      }, t.unenroll = function (a) {
        clearTimeout(a._idleTimeoutId), a._idleTimeout = -1;
      }, t._unrefActive = t.active = function (a) {
        clearTimeout(a._idleTimeoutId);var t = a._idleTimeout;t >= 0 && (a._idleTimeoutId = setTimeout(function () {
          a._onTimeout && a._onTimeout();
        }, t));
      }, e(16), t.setImmediate = "undefined" != typeof self && self.setImmediate || void 0 !== a && a.setImmediate || this && this.setImmediate, t.clearImmediate = "undefined" != typeof self && self.clearImmediate || void 0 !== a && a.clearImmediate || this && this.clearImmediate;
    }).call(t, e(1));
  }, function (a, t, e) {
    (function (a, t) {
      !function (a, e) {
        "use strict";
        function n(a) {
          "function" != typeof a && (a = new Function("" + a));for (var t = new Array(arguments.length - 1), e = 0; e < t.length; e++) {
            t[e] = arguments[e + 1];
          }var n = { callback: a, args: t };return l[s] = n, d(s), s++;
        }function i(a) {
          delete l[a];
        }function r(a) {
          var t = a.callback,
              n = a.args;switch (n.length) {case 0:
              t();break;case 1:
              t(n[0]);break;case 2:
              t(n[0], n[1]);break;case 3:
              t(n[0], n[1], n[2]);break;default:
              t.apply(e, n);}
        }function o(a) {
          if (b) setTimeout(o, 0, a);else {
            var t = l[a];if (t) {
              b = !0;try {
                r(t);
              } finally {
                i(a), b = !1;
              }
            }
          }
        }if (!a.setImmediate) {
          var d,
              s = 1,
              l = {},
              b = !1,
              c = a.document,
              v = Object.getPrototypeOf && Object.getPrototypeOf(a);v = v && v.setTimeout ? v : a, "[object process]" === {}.toString.call(a.process) ? function () {
            d = function d(a) {
              t.nextTick(function () {
                o(a);
              });
            };
          }() : function () {
            if (a.postMessage && !a.importScripts) {
              var t = !0,
                  e = a.onmessage;return a.onmessage = function () {
                t = !1;
              }, a.postMessage("", "*"), a.onmessage = e, t;
            }
          }() ? function () {
            var t = "setImmediate$" + Math.random() + "$",
                e = function e(_e3) {
              _e3.source === a && "string" == typeof _e3.data && 0 === _e3.data.indexOf(t) && o(+_e3.data.slice(t.length));
            };a.addEventListener ? a.addEventListener("message", e, !1) : a.attachEvent("onmessage", e), d = function d(e) {
              a.postMessage(t + e, "*");
            };
          }() : a.MessageChannel ? function () {
            var a = new MessageChannel();a.port1.onmessage = function (a) {
              o(a.data);
            }, d = function d(t) {
              a.port2.postMessage(t);
            };
          }() : c && "onreadystatechange" in c.createElement("script") ? function () {
            var a = c.documentElement;d = function d(t) {
              var e = c.createElement("script");e.onreadystatechange = function () {
                o(t), e.onreadystatechange = null, a.removeChild(e), e = null;
              }, a.appendChild(e);
            };
          }() : function () {
            d = function d(a) {
              setTimeout(o, 0, a);
            };
          }(), v.setImmediate = n, v.clearImmediate = i;
        }
      }("undefined" == typeof self ? void 0 === a ? this : a : self);
    }).call(t, e(1), e(17));
  }, function (a, t) {
    function e() {
      throw new Error("setTimeout has not been defined");
    }function n() {
      throw new Error("clearTimeout has not been defined");
    }function i(a) {
      if (b === setTimeout) return setTimeout(a, 0);if ((b === e || !b) && setTimeout) return b = setTimeout, setTimeout(a, 0);try {
        return b(a, 0);
      } catch (t) {
        try {
          return b.call(null, a, 0);
        } catch (t) {
          return b.call(this, a, 0);
        }
      }
    }function r(a) {
      if (c === clearTimeout) return clearTimeout(a);if ((c === n || !c) && clearTimeout) return c = clearTimeout, clearTimeout(a);try {
        return c(a);
      } catch (t) {
        try {
          return c.call(null, a);
        } catch (t) {
          return c.call(this, a);
        }
      }
    }function o() {
      m && f && (m = !1, f.length ? u = f.concat(u) : h = -1, u.length && d());
    }function d() {
      if (!m) {
        var a = i(o);m = !0;for (var t = u.length; t;) {
          for (f = u, u = []; ++h < t;) {
            f && f[h].run();
          }h = -1, t = u.length;
        }f = null, m = !1, r(a);
      }
    }function s(a, t) {
      this.fun = a, this.array = t;
    }function l() {}var b,
        c,
        v = a.exports = {};!function () {
      try {
        b = "function" == typeof setTimeout ? setTimeout : e;
      } catch (a) {
        b = e;
      }try {
        c = "function" == typeof clearTimeout ? clearTimeout : n;
      } catch (a) {
        c = n;
      }
    }();var f,
        u = [],
        m = !1,
        h = -1;v.nextTick = function (a) {
      var t = new Array(arguments.length - 1);if (arguments.length > 1) for (var e = 1; e < arguments.length; e++) {
        t[e - 1] = arguments[e];
      }u.push(new s(a, t)), 1 !== u.length || m || i(d);
    }, s.prototype.run = function () {
      this.fun.apply(null, this.array);
    }, v.title = "browser", v.browser = !0, v.env = {}, v.argv = [], v.version = "", v.versions = {}, v.on = l, v.addListener = l, v.once = l, v.off = l, v.removeListener = l, v.removeAllListeners = l, v.emit = l, v.prependListener = l, v.prependOnceListener = l, v.listeners = function (a) {
      return [];
    }, v.binding = function (a) {
      throw new Error("process.binding is not supported");
    }, v.cwd = function () {
      return "/";
    }, v.chdir = function (a) {
      throw new Error("process.chdir is not supported");
    }, v.umask = function () {
      return 0;
    };
  }, function (a, t, e) {
    "use strict";
    var n = e(6),
        i = e(20),
        r = e(0),
        o = r(n.a, i.a, !1, null, null, null);t.a = o.exports;
  }, function (a, t, e) {
    "use strict";
    var n = function n() {
      var a = this,
          t = a.$createElement,
          e = a._self._c || t;return e("span", [e("button", { class: a.deleteAreaClass, on: { click: a.emitDeleteTag } }, [e("span", { class: a.deleteContentClass }, [a._v("\n      x\n    ")])])]);
    },
        i = [],
        r = { render: n, staticRenderFns: i };t.a = r;
  }, function (a, t, e) {
    "use strict";
    var n = function n() {
      var a = this,
          t = a.$createElement,
          e = a._self._c || t;return e("span", { class: [a.tagAreaClass, a.tagCustomClass] }, [e("span", { ref: "tagname" }, [e("label", { class: a.tagContentClass }, [a._v("\n      " + a._s(a.tagname) + "\n    ")])]), a._v(" "), e("tag-delete-button", { attrs: { tagname: a.tagname, "event-hub": a.eventHub, "delete-area-class": a.deleteAreaClass, "delete-content-class": a.deleteContentClass }, on: { "delete-tag": a.emitDeleteTag } })], 1);
    },
        i = [],
        r = { render: n, staticRenderFns: i };t.a = r;
  }, function (a, t, e) {
    "use strict";
    function n(a) {
      e(22);
    }var i = e(11),
        r = e(25),
        o = e(0),
        d = n,
        s = o(i.a, r.a, !1, d, "data-v-7adf2ba9", null);t.a = s.exports;
  }, function (a, t, e) {
    var n = e(23);"string" == typeof n && (n = [[a.i, n, ""]]), n.locals && (a.exports = n.locals);e(10)("4392aef6", n, !0, {});
  }, function (a, t, e) {
    t = a.exports = e(9)(!1), t.push([a.i, "a[data-v-7adf2ba9]{text-decoration:none}a[data-v-7adf2ba9]:hover{text-decoration:underline;cursor:pointer}", ""]);
  }, function (a, t) {
    a.exports = function (a, t) {
      for (var e = [], n = {}, i = 0; i < t.length; i++) {
        var r = t[i],
            o = r[0],
            d = r[1],
            s = r[2],
            l = r[3],
            b = { id: a + ":" + i, css: d, media: s, sourceMap: l };n[o] ? n[o].parts.push(b) : e.push(n[o] = { id: o, parts: [b] });
      }return e;
    };
  }, function (a, t, e) {
    "use strict";
    var n = function n() {
      var a = this,
          t = a.$createElement,
          e = a._self._c || t;return e("span", { class: [a.tagAreaClass, a.tagCustomClass] }, [e("span", { ref: "tagname", on: { click: a.emitClickTag } }, [e("a", { class: a.tagContentClass }, [e("span", [a._v(a._s(a.tagname))])])]), a._v(" "), e("tag-delete-button", { attrs: { tagname: a.tagname, "event-hub": a.eventHub, "delete-area-class": a.deleteAreaClass, "delete-content-class": a.deleteContentClass }, on: { "delete-tag": a.emitDeleteTag } })], 1);
    },
        i = [],
        r = { render: n, staticRenderFns: i };t.a = r;
  }, function (a, t, e) {
    "use strict";
    var n = function n() {
      var a = this,
          t = a.$createElement,
          e = a._self._c || t;return e("span", a._l(a.tags, function (t, n) {
        return e("span", { key: t.id }, [a.isLabel ? e("tag-label", { attrs: { tagname: t, "event-hub": a.eventHub, "tag-area-class": a.tagAreaClass, "tag-content-class": a.tagContentClass, "delete-area-class": a.deleteAreaClass, "delete-content-class": a.deleteContentClass, "tag-custom-class": a.tagCustomClass }, on: { "delete-tag": function deleteTag(t) {
              a.deleteTag(n);
            } } }) : a._e(), a._v(" "), a.isLink ? e("tag-link", { attrs: { tagname: t, "event-hub": a.eventHub, "tag-area-class": a.tagAreaClass, "tag-content-class": a.tagContentClass, "delete-area-class": a.deleteAreaClass, "delete-content-class": a.deleteContentClass, "tag-custom-class": a.tagCustomClass }, on: { "delete-tag": function deleteTag(t) {
              a.deleteTag(n);
            } } }) : a._e()], 1);
      }), 0);
    },
        i = [],
        r = { render: n, staticRenderFns: i };t.a = r;
  }, function (a, t, e) {
    "use strict";
    var n = function n() {
      var a = this,
          t = a.$createElement,
          e = a._self._c || t;return e("span", [e("tags", { attrs: { tags: a.tags, type: a.type, "event-hub": a.eventHub, "tag-area-class": a.tagAreaClass, "tag-content-class": a.tagContentClass, "delete-area-class": a.deleteAreaClass, "delete-content-class": a.deleteContentClass, "tag-custom-class": a.tagCustomClass } }), a._v(" "), e("input", { directives: [{ name: "model", rawName: "v-model", value: a.tag, expression: "tag" }], class: a.inputContentClass, attrs: { placeholder: a.placeholder }, domProps: { value: a.tag }, on: { keyup: function keyup(t) {
            return "button" in t || !a._k(t.keyCode, "enter", 13, t.key, "Enter") ? a.inputTagWithEmit(t) : null;
          }, input: function input(t) {
            t.target.composing || (a.tag = t.target.value);
          } } })], 1);
    },
        i = [],
        r = { render: n, staticRenderFns: i };t.a = r;
  }, function (a, t, e) {
    "use strict";
    function n(a) {
      e(29);
    }var i = e(12),
        r = e(31),
        o = e(0),
        d = n,
        s = o(i.a, r.a, !1, d, "data-v-534131b3", null);t.a = s.exports;
  }, function (a, t, e) {
    var n = e(30);"string" == typeof n && (n = [[a.i, n, ""]]), n.locals && (a.exports = n.locals);e(10)("f39be4fe", n, !0, {});
  }, function (a, t, e) {
    t = a.exports = e(9)(!1), t.push([a.i, '/*! bulma.io v0.7.2 | MIT License | github.com/jgthms/bulma */@keyframes spinAround-data-v-534131b3{0%{transform:rotate(0deg)}to{transform:rotate(359deg)}}.breadcrumb[data-v-534131b3],.button[data-v-534131b3],.delete[data-v-534131b3],.file[data-v-534131b3],.is-unselectable[data-v-534131b3],.modal-close[data-v-534131b3],.pagination-ellipsis[data-v-534131b3],.pagination-link[data-v-534131b3],.pagination-next[data-v-534131b3],.pagination-previous[data-v-534131b3],.tabs[data-v-534131b3]{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.navbar-link[data-v-534131b3]:not(.is-arrowless):after,.select[data-v-534131b3]:not(.is-multiple):not(.is-loading):after{border:3px solid transparent;border-radius:2px;border-right:0;border-top:0;content:" ";display:block;height:.625em;margin-top:-.4375em;pointer-events:none;position:absolute;top:50%;transform:rotate(-45deg);transform-origin:center;width:.625em}.block[data-v-534131b3]:not(:last-child),.box[data-v-534131b3]:not(:last-child),.breadcrumb[data-v-534131b3]:not(:last-child),.content[data-v-534131b3]:not(:last-child),.highlight[data-v-534131b3]:not(:last-child),.level[data-v-534131b3]:not(:last-child),.list[data-v-534131b3]:not(:last-child),.message[data-v-534131b3]:not(:last-child),.notification[data-v-534131b3]:not(:last-child),.progress[data-v-534131b3]:not(:last-child),.subtitle[data-v-534131b3]:not(:last-child),.table-container[data-v-534131b3]:not(:last-child),.table[data-v-534131b3]:not(:last-child),.tabs[data-v-534131b3]:not(:last-child),.title[data-v-534131b3]:not(:last-child){margin-bottom:1.5rem}.delete[data-v-534131b3],.modal-close[data-v-534131b3]{-moz-appearance:none;-webkit-appearance:none;background-color:hsla(0,0%,4%,.2);border:none;border-radius:290486px;cursor:pointer;pointer-events:auto;display:inline-block;flex-grow:0;flex-shrink:0;font-size:0;height:20px;max-height:20px;max-width:20px;min-height:20px;min-width:20px;outline:none;position:relative;vertical-align:top;width:20px}.delete[data-v-534131b3]:after,.delete[data-v-534131b3]:before,.modal-close[data-v-534131b3]:after,.modal-close[data-v-534131b3]:before{background-color:#fff;content:"";display:block;left:50%;position:absolute;top:50%;transform:translateX(-50%) translateY(-50%) rotate(45deg);transform-origin:center center}.delete[data-v-534131b3]:before,.modal-close[data-v-534131b3]:before{height:2px;width:50%}.delete[data-v-534131b3]:after,.modal-close[data-v-534131b3]:after{height:50%;width:2px}.delete[data-v-534131b3]:focus,.delete[data-v-534131b3]:hover,.modal-close[data-v-534131b3]:focus,.modal-close[data-v-534131b3]:hover{background-color:hsla(0,0%,4%,.3)}.delete[data-v-534131b3]:active,.modal-close[data-v-534131b3]:active{background-color:hsla(0,0%,4%,.4)}.is-small.delete[data-v-534131b3],.is-small.modal-close[data-v-534131b3]{height:16px;max-height:16px;max-width:16px;min-height:16px;min-width:16px;width:16px}.is-medium.delete[data-v-534131b3],.is-medium.modal-close[data-v-534131b3]{height:24px;max-height:24px;max-width:24px;min-height:24px;min-width:24px;width:24px}.is-large.delete[data-v-534131b3],.is-large.modal-close[data-v-534131b3]{height:32px;max-height:32px;max-width:32px;min-height:32px;min-width:32px;width:32px}.button.is-loading[data-v-534131b3]:after,.control.is-loading[data-v-534131b3]:after,.loader[data-v-534131b3],.select.is-loading[data-v-534131b3]:after{animation:spinAround-data-v-534131b3 .5s infinite linear;border:2px solid #dbdbdb;border-radius:290486px;border-right-color:transparent;border-top-color:transparent;content:"";display:block;height:1em;position:relative;width:1em}.hero-video[data-v-534131b3],.image.is-1by1 img[data-v-534131b3],.image.is-1by2 img[data-v-534131b3],.image.is-1by3 img[data-v-534131b3],.image.is-2by1 img[data-v-534131b3],.image.is-2by3 img[data-v-534131b3],.image.is-3by1 img[data-v-534131b3],.image.is-3by2 img[data-v-534131b3],.image.is-3by4 img[data-v-534131b3],.image.is-3by5 img[data-v-534131b3],.image.is-4by3 img[data-v-534131b3],.image.is-4by5 img[data-v-534131b3],.image.is-5by3 img[data-v-534131b3],.image.is-5by4 img[data-v-534131b3],.image.is-9by16 img[data-v-534131b3],.image.is-16by9 img[data-v-534131b3],.image.is-square img[data-v-534131b3],.is-overlay[data-v-534131b3],.modal-background[data-v-534131b3],.modal[data-v-534131b3]{bottom:0;left:0;position:absolute;right:0;top:0}.button[data-v-534131b3],.file-cta[data-v-534131b3],.file-name[data-v-534131b3],.input[data-v-534131b3],.pagination-ellipsis[data-v-534131b3],.pagination-link[data-v-534131b3],.pagination-next[data-v-534131b3],.pagination-previous[data-v-534131b3],.select select[data-v-534131b3],.textarea[data-v-534131b3]{-moz-appearance:none;-webkit-appearance:none;align-items:center;border:1px solid transparent;border-radius:4px;box-shadow:none;display:inline-flex;font-size:1rem;height:2.25em;justify-content:flex-start;line-height:1.5;padding:calc(.375em - 1px) calc(.625em - 1px);position:relative;vertical-align:top}.button[data-v-534131b3]:active,.button[data-v-534131b3]:focus,.file-cta[data-v-534131b3]:active,.file-cta[data-v-534131b3]:focus,.file-name[data-v-534131b3]:active,.file-name[data-v-534131b3]:focus,.input[data-v-534131b3]:active,.input[data-v-534131b3]:focus,.is-active.button[data-v-534131b3],.is-active.file-cta[data-v-534131b3],.is-active.file-name[data-v-534131b3],.is-active.input[data-v-534131b3],.is-active.pagination-ellipsis[data-v-534131b3],.is-active.pagination-link[data-v-534131b3],.is-active.pagination-next[data-v-534131b3],.is-active.pagination-previous[data-v-534131b3],.is-active.textarea[data-v-534131b3],.is-focused.button[data-v-534131b3],.is-focused.file-cta[data-v-534131b3],.is-focused.file-name[data-v-534131b3],.is-focused.input[data-v-534131b3],.is-focused.pagination-ellipsis[data-v-534131b3],.is-focused.pagination-link[data-v-534131b3],.is-focused.pagination-next[data-v-534131b3],.is-focused.pagination-previous[data-v-534131b3],.is-focused.textarea[data-v-534131b3],.pagination-ellipsis[data-v-534131b3]:active,.pagination-ellipsis[data-v-534131b3]:focus,.pagination-link[data-v-534131b3]:active,.pagination-link[data-v-534131b3]:focus,.pagination-next[data-v-534131b3]:active,.pagination-next[data-v-534131b3]:focus,.pagination-previous[data-v-534131b3]:active,.pagination-previous[data-v-534131b3]:focus,.select select.is-active[data-v-534131b3],.select select.is-focused[data-v-534131b3],.select select[data-v-534131b3]:active,.select select[data-v-534131b3]:focus,.textarea[data-v-534131b3]:active,.textarea[data-v-534131b3]:focus{outline:none}.button[disabled][data-v-534131b3],.file-cta[disabled][data-v-534131b3],.file-name[disabled][data-v-534131b3],.input[disabled][data-v-534131b3],.pagination-ellipsis[disabled][data-v-534131b3],.pagination-link[disabled][data-v-534131b3],.pagination-next[disabled][data-v-534131b3],.pagination-previous[disabled][data-v-534131b3],.select select[disabled][data-v-534131b3],.textarea[disabled][data-v-534131b3]{cursor:not-allowed}/*! minireset.css v0.0.3 | MIT License | github.com/jgthms/minireset.css */blockquote[data-v-534131b3],body[data-v-534131b3],dd[data-v-534131b3],dl[data-v-534131b3],dt[data-v-534131b3],fieldset[data-v-534131b3],figure[data-v-534131b3],h1[data-v-534131b3],h2[data-v-534131b3],h3[data-v-534131b3],h4[data-v-534131b3],h5[data-v-534131b3],h6[data-v-534131b3],hr[data-v-534131b3],html[data-v-534131b3],iframe[data-v-534131b3],legend[data-v-534131b3],li[data-v-534131b3],ol[data-v-534131b3],p[data-v-534131b3],pre[data-v-534131b3],textarea[data-v-534131b3],ul[data-v-534131b3]{margin:0;padding:0}h1[data-v-534131b3],h2[data-v-534131b3],h3[data-v-534131b3],h4[data-v-534131b3],h5[data-v-534131b3],h6[data-v-534131b3]{font-size:100%;font-weight:400}ul[data-v-534131b3]{list-style:none}button[data-v-534131b3],input[data-v-534131b3],select[data-v-534131b3],textarea[data-v-534131b3]{margin:0}html[data-v-534131b3]{box-sizing:border-box}[data-v-534131b3],[data-v-534131b3]:after,[data-v-534131b3]:before{box-sizing:inherit}audio[data-v-534131b3],img[data-v-534131b3],video[data-v-534131b3]{height:auto;max-width:100%}iframe[data-v-534131b3]{border:0}table[data-v-534131b3]{border-collapse:collapse;border-spacing:0}td[data-v-534131b3],th[data-v-534131b3]{padding:0;text-align:left}html[data-v-534131b3]{background-color:#fff;font-size:16px;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;min-width:300px;overflow-x:hidden;overflow-y:scroll;text-rendering:optimizeLegibility;text-size-adjust:100%}article[data-v-534131b3],aside[data-v-534131b3],figure[data-v-534131b3],footer[data-v-534131b3],header[data-v-534131b3],hgroup[data-v-534131b3],section[data-v-534131b3]{display:block}body[data-v-534131b3],button[data-v-534131b3],input[data-v-534131b3],select[data-v-534131b3],textarea[data-v-534131b3]{font-family:BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,Helvetica,Arial,sans-serif}code[data-v-534131b3],pre[data-v-534131b3]{-moz-osx-font-smoothing:auto;-webkit-font-smoothing:auto;font-family:monospace}body[data-v-534131b3]{color:#4a4a4a;font-size:1rem;font-weight:400;line-height:1.5}a[data-v-534131b3]{color:#3273dc;cursor:pointer;text-decoration:none}a strong[data-v-534131b3]{color:currentColor}a[data-v-534131b3]:hover{color:#363636}code[data-v-534131b3]{background-color:#f5f5f5;color:#ff3860;font-size:.875em;font-weight:400;padding:.25em .5em}hr[data-v-534131b3]{background-color:#f5f5f5;border:none;display:block;height:2px;margin:1.5rem 0}img[data-v-534131b3]{height:auto;max-width:100%}input[type=checkbox][data-v-534131b3],input[type=radio][data-v-534131b3]{vertical-align:baseline}small[data-v-534131b3]{font-size:.875em}span[data-v-534131b3]{font-style:inherit;font-weight:inherit}strong[data-v-534131b3]{color:#363636;font-weight:700}pre[data-v-534131b3]{-webkit-overflow-scrolling:touch;background-color:#f5f5f5;color:#4a4a4a;font-size:.875em;overflow-x:auto;padding:1.25rem 1.5rem;white-space:pre;word-wrap:normal}pre code[data-v-534131b3]{background-color:transparent;color:currentColor;font-size:1em;padding:0}table td[data-v-534131b3],table th[data-v-534131b3]{text-align:left;vertical-align:top}table th[data-v-534131b3]{color:#363636}.is-clearfix[data-v-534131b3]:after{clear:both;content:" ";display:table}.is-pulled-left[data-v-534131b3]{float:left!important}.is-pulled-right[data-v-534131b3]{float:right!important}.is-clipped[data-v-534131b3]{overflow:hidden!important}.is-size-1[data-v-534131b3]{font-size:3rem!important}.is-size-2[data-v-534131b3]{font-size:2.5rem!important}.is-size-3[data-v-534131b3]{font-size:2rem!important}.is-size-4[data-v-534131b3]{font-size:1.5rem!important}.is-size-5[data-v-534131b3]{font-size:1.25rem!important}.is-size-6[data-v-534131b3]{font-size:1rem!important}.is-size-7[data-v-534131b3]{font-size:.75rem!important}@media screen and (max-width:768px){.is-size-1-mobile[data-v-534131b3]{font-size:3rem!important}.is-size-2-mobile[data-v-534131b3]{font-size:2.5rem!important}.is-size-3-mobile[data-v-534131b3]{font-size:2rem!important}.is-size-4-mobile[data-v-534131b3]{font-size:1.5rem!important}.is-size-5-mobile[data-v-534131b3]{font-size:1.25rem!important}.is-size-6-mobile[data-v-534131b3]{font-size:1rem!important}.is-size-7-mobile[data-v-534131b3]{font-size:.75rem!important}}@media print,screen and (min-width:769px){.is-size-1-tablet[data-v-534131b3]{font-size:3rem!important}.is-size-2-tablet[data-v-534131b3]{font-size:2.5rem!important}.is-size-3-tablet[data-v-534131b3]{font-size:2rem!important}.is-size-4-tablet[data-v-534131b3]{font-size:1.5rem!important}.is-size-5-tablet[data-v-534131b3]{font-size:1.25rem!important}.is-size-6-tablet[data-v-534131b3]{font-size:1rem!important}.is-size-7-tablet[data-v-534131b3]{font-size:.75rem!important}}@media screen and (max-width:1087px){.is-size-1-touch[data-v-534131b3]{font-size:3rem!important}.is-size-2-touch[data-v-534131b3]{font-size:2.5rem!important}.is-size-3-touch[data-v-534131b3]{font-size:2rem!important}.is-size-4-touch[data-v-534131b3]{font-size:1.5rem!important}.is-size-5-touch[data-v-534131b3]{font-size:1.25rem!important}.is-size-6-touch[data-v-534131b3]{font-size:1rem!important}.is-size-7-touch[data-v-534131b3]{font-size:.75rem!important}}@media screen and (min-width:1088px){.is-size-1-desktop[data-v-534131b3]{font-size:3rem!important}.is-size-2-desktop[data-v-534131b3]{font-size:2.5rem!important}.is-size-3-desktop[data-v-534131b3]{font-size:2rem!important}.is-size-4-desktop[data-v-534131b3]{font-size:1.5rem!important}.is-size-5-desktop[data-v-534131b3]{font-size:1.25rem!important}.is-size-6-desktop[data-v-534131b3]{font-size:1rem!important}.is-size-7-desktop[data-v-534131b3]{font-size:.75rem!important}}@media screen and (min-width:1280px){.is-size-1-widescreen[data-v-534131b3]{font-size:3rem!important}.is-size-2-widescreen[data-v-534131b3]{font-size:2.5rem!important}.is-size-3-widescreen[data-v-534131b3]{font-size:2rem!important}.is-size-4-widescreen[data-v-534131b3]{font-size:1.5rem!important}.is-size-5-widescreen[data-v-534131b3]{font-size:1.25rem!important}.is-size-6-widescreen[data-v-534131b3]{font-size:1rem!important}.is-size-7-widescreen[data-v-534131b3]{font-size:.75rem!important}}@media screen and (min-width:1472px){.is-size-1-fullhd[data-v-534131b3]{font-size:3rem!important}.is-size-2-fullhd[data-v-534131b3]{font-size:2.5rem!important}.is-size-3-fullhd[data-v-534131b3]{font-size:2rem!important}.is-size-4-fullhd[data-v-534131b3]{font-size:1.5rem!important}.is-size-5-fullhd[data-v-534131b3]{font-size:1.25rem!important}.is-size-6-fullhd[data-v-534131b3]{font-size:1rem!important}.is-size-7-fullhd[data-v-534131b3]{font-size:.75rem!important}}.has-text-centered[data-v-534131b3]{text-align:center!important}.has-text-justified[data-v-534131b3]{text-align:justify!important}.has-text-left[data-v-534131b3]{text-align:left!important}.has-text-right[data-v-534131b3]{text-align:right!important}@media screen and (max-width:768px){.has-text-centered-mobile[data-v-534131b3]{text-align:center!important}}@media print,screen and (min-width:769px){.has-text-centered-tablet[data-v-534131b3]{text-align:center!important}}@media screen and (min-width:769px) and (max-width:1087px){.has-text-centered-tablet-only[data-v-534131b3]{text-align:center!important}}@media screen and (max-width:1087px){.has-text-centered-touch[data-v-534131b3]{text-align:center!important}}@media screen and (min-width:1088px){.has-text-centered-desktop[data-v-534131b3]{text-align:center!important}}@media screen and (min-width:1088px) and (max-width:1279px){.has-text-centered-desktop-only[data-v-534131b3]{text-align:center!important}}@media screen and (min-width:1280px){.has-text-centered-widescreen[data-v-534131b3]{text-align:center!important}}@media screen and (min-width:1280px) and (max-width:1471px){.has-text-centered-widescreen-only[data-v-534131b3]{text-align:center!important}}@media screen and (min-width:1472px){.has-text-centered-fullhd[data-v-534131b3]{text-align:center!important}}@media screen and (max-width:768px){.has-text-justified-mobile[data-v-534131b3]{text-align:justify!important}}@media print,screen and (min-width:769px){.has-text-justified-tablet[data-v-534131b3]{text-align:justify!important}}@media screen and (min-width:769px) and (max-width:1087px){.has-text-justified-tablet-only[data-v-534131b3]{text-align:justify!important}}@media screen and (max-width:1087px){.has-text-justified-touch[data-v-534131b3]{text-align:justify!important}}@media screen and (min-width:1088px){.has-text-justified-desktop[data-v-534131b3]{text-align:justify!important}}@media screen and (min-width:1088px) and (max-width:1279px){.has-text-justified-desktop-only[data-v-534131b3]{text-align:justify!important}}@media screen and (min-width:1280px){.has-text-justified-widescreen[data-v-534131b3]{text-align:justify!important}}@media screen and (min-width:1280px) and (max-width:1471px){.has-text-justified-widescreen-only[data-v-534131b3]{text-align:justify!important}}@media screen and (min-width:1472px){.has-text-justified-fullhd[data-v-534131b3]{text-align:justify!important}}@media screen and (max-width:768px){.has-text-left-mobile[data-v-534131b3]{text-align:left!important}}@media print,screen and (min-width:769px){.has-text-left-tablet[data-v-534131b3]{text-align:left!important}}@media screen and (min-width:769px) and (max-width:1087px){.has-text-left-tablet-only[data-v-534131b3]{text-align:left!important}}@media screen and (max-width:1087px){.has-text-left-touch[data-v-534131b3]{text-align:left!important}}@media screen and (min-width:1088px){.has-text-left-desktop[data-v-534131b3]{text-align:left!important}}@media screen and (min-width:1088px) and (max-width:1279px){.has-text-left-desktop-only[data-v-534131b3]{text-align:left!important}}@media screen and (min-width:1280px){.has-text-left-widescreen[data-v-534131b3]{text-align:left!important}}@media screen and (min-width:1280px) and (max-width:1471px){.has-text-left-widescreen-only[data-v-534131b3]{text-align:left!important}}@media screen and (min-width:1472px){.has-text-left-fullhd[data-v-534131b3]{text-align:left!important}}@media screen and (max-width:768px){.has-text-right-mobile[data-v-534131b3]{text-align:right!important}}@media print,screen and (min-width:769px){.has-text-right-tablet[data-v-534131b3]{text-align:right!important}}@media screen and (min-width:769px) and (max-width:1087px){.has-text-right-tablet-only[data-v-534131b3]{text-align:right!important}}@media screen and (max-width:1087px){.has-text-right-touch[data-v-534131b3]{text-align:right!important}}@media screen and (min-width:1088px){.has-text-right-desktop[data-v-534131b3]{text-align:right!important}}@media screen and (min-width:1088px) and (max-width:1279px){.has-text-right-desktop-only[data-v-534131b3]{text-align:right!important}}@media screen and (min-width:1280px){.has-text-right-widescreen[data-v-534131b3]{text-align:right!important}}@media screen and (min-width:1280px) and (max-width:1471px){.has-text-right-widescreen-only[data-v-534131b3]{text-align:right!important}}@media screen and (min-width:1472px){.has-text-right-fullhd[data-v-534131b3]{text-align:right!important}}.is-capitalized[data-v-534131b3]{text-transform:capitalize!important}.is-lowercase[data-v-534131b3]{text-transform:lowercase!important}.is-uppercase[data-v-534131b3]{text-transform:uppercase!important}.is-italic[data-v-534131b3]{font-style:italic!important}.has-text-white[data-v-534131b3]{color:#fff!important}a.has-text-white[data-v-534131b3]:focus,a.has-text-white[data-v-534131b3]:hover{color:#e6e6e6!important}.has-background-white[data-v-534131b3]{background-color:#fff!important}.has-text-black[data-v-534131b3]{color:#0a0a0a!important}a.has-text-black[data-v-534131b3]:focus,a.has-text-black[data-v-534131b3]:hover{color:#000!important}.has-background-black[data-v-534131b3]{background-color:#0a0a0a!important}.has-text-light[data-v-534131b3]{color:#f5f5f5!important}a.has-text-light[data-v-534131b3]:focus,a.has-text-light[data-v-534131b3]:hover{color:#dbdbdb!important}.has-background-light[data-v-534131b3]{background-color:#f5f5f5!important}.has-text-dark[data-v-534131b3]{color:#363636!important}a.has-text-dark[data-v-534131b3]:focus,a.has-text-dark[data-v-534131b3]:hover{color:#1c1c1c!important}.has-background-dark[data-v-534131b3]{background-color:#363636!important}.has-text-primary[data-v-534131b3]{color:#00d1b2!important}a.has-text-primary[data-v-534131b3]:focus,a.has-text-primary[data-v-534131b3]:hover{color:#009e86!important}.has-background-primary[data-v-534131b3]{background-color:#00d1b2!important}.has-text-link[data-v-534131b3]{color:#3273dc!important}a.has-text-link[data-v-534131b3]:focus,a.has-text-link[data-v-534131b3]:hover{color:#205bbc!important}.has-background-link[data-v-534131b3]{background-color:#3273dc!important}.has-text-info[data-v-534131b3]{color:#209cee!important}a.has-text-info[data-v-534131b3]:focus,a.has-text-info[data-v-534131b3]:hover{color:#0f81cc!important}.has-background-info[data-v-534131b3]{background-color:#209cee!important}.has-text-success[data-v-534131b3]{color:#23d160!important}a.has-text-success[data-v-534131b3]:focus,a.has-text-success[data-v-534131b3]:hover{color:#1ca64c!important}.has-background-success[data-v-534131b3]{background-color:#23d160!important}.has-text-warning[data-v-534131b3]{color:#ffdd57!important}a.has-text-warning[data-v-534131b3]:focus,a.has-text-warning[data-v-534131b3]:hover{color:#ffd324!important}.has-background-warning[data-v-534131b3]{background-color:#ffdd57!important}.has-text-danger[data-v-534131b3]{color:#ff3860!important}a.has-text-danger[data-v-534131b3]:focus,a.has-text-danger[data-v-534131b3]:hover{color:#ff0537!important}.has-background-danger[data-v-534131b3]{background-color:#ff3860!important}.has-text-black-bis[data-v-534131b3]{color:#121212!important}.has-background-black-bis[data-v-534131b3]{background-color:#121212!important}.has-text-black-ter[data-v-534131b3]{color:#242424!important}.has-background-black-ter[data-v-534131b3]{background-color:#242424!important}.has-text-grey-darker[data-v-534131b3]{color:#363636!important}.has-background-grey-darker[data-v-534131b3]{background-color:#363636!important}.has-text-grey-dark[data-v-534131b3]{color:#4a4a4a!important}.has-background-grey-dark[data-v-534131b3]{background-color:#4a4a4a!important}.has-text-grey[data-v-534131b3]{color:#7a7a7a!important}.has-background-grey[data-v-534131b3]{background-color:#7a7a7a!important}.has-text-grey-light[data-v-534131b3]{color:#b5b5b5!important}.has-background-grey-light[data-v-534131b3]{background-color:#b5b5b5!important}.has-text-grey-lighter[data-v-534131b3]{color:#dbdbdb!important}.has-background-grey-lighter[data-v-534131b3]{background-color:#dbdbdb!important}.has-text-white-ter[data-v-534131b3]{color:#f5f5f5!important}.has-background-white-ter[data-v-534131b3]{background-color:#f5f5f5!important}.has-text-white-bis[data-v-534131b3]{color:#fafafa!important}.has-background-white-bis[data-v-534131b3]{background-color:#fafafa!important}.has-text-weight-light[data-v-534131b3]{font-weight:300!important}.has-text-weight-normal[data-v-534131b3]{font-weight:400!important}.has-text-weight-semibold[data-v-534131b3]{font-weight:600!important}.has-text-weight-bold[data-v-534131b3]{font-weight:700!important}.is-block[data-v-534131b3]{display:block!important}@media screen and (max-width:768px){.is-block-mobile[data-v-534131b3]{display:block!important}}@media print,screen and (min-width:769px){.is-block-tablet[data-v-534131b3]{display:block!important}}@media screen and (min-width:769px) and (max-width:1087px){.is-block-tablet-only[data-v-534131b3]{display:block!important}}@media screen and (max-width:1087px){.is-block-touch[data-v-534131b3]{display:block!important}}@media screen and (min-width:1088px){.is-block-desktop[data-v-534131b3]{display:block!important}}@media screen and (min-width:1088px) and (max-width:1279px){.is-block-desktop-only[data-v-534131b3]{display:block!important}}@media screen and (min-width:1280px){.is-block-widescreen[data-v-534131b3]{display:block!important}}@media screen and (min-width:1280px) and (max-width:1471px){.is-block-widescreen-only[data-v-534131b3]{display:block!important}}@media screen and (min-width:1472px){.is-block-fullhd[data-v-534131b3]{display:block!important}}.is-flex[data-v-534131b3]{display:flex!important}@media screen and (max-width:768px){.is-flex-mobile[data-v-534131b3]{display:flex!important}}@media print,screen and (min-width:769px){.is-flex-tablet[data-v-534131b3]{display:flex!important}}@media screen and (min-width:769px) and (max-width:1087px){.is-flex-tablet-only[data-v-534131b3]{display:flex!important}}@media screen and (max-width:1087px){.is-flex-touch[data-v-534131b3]{display:flex!important}}@media screen and (min-width:1088px){.is-flex-desktop[data-v-534131b3]{display:flex!important}}@media screen and (min-width:1088px) and (max-width:1279px){.is-flex-desktop-only[data-v-534131b3]{display:flex!important}}@media screen and (min-width:1280px){.is-flex-widescreen[data-v-534131b3]{display:flex!important}}@media screen and (min-width:1280px) and (max-width:1471px){.is-flex-widescreen-only[data-v-534131b3]{display:flex!important}}@media screen and (min-width:1472px){.is-flex-fullhd[data-v-534131b3]{display:flex!important}}.is-inline[data-v-534131b3]{display:inline!important}@media screen and (max-width:768px){.is-inline-mobile[data-v-534131b3]{display:inline!important}}@media print,screen and (min-width:769px){.is-inline-tablet[data-v-534131b3]{display:inline!important}}@media screen and (min-width:769px) and (max-width:1087px){.is-inline-tablet-only[data-v-534131b3]{display:inline!important}}@media screen and (max-width:1087px){.is-inline-touch[data-v-534131b3]{display:inline!important}}@media screen and (min-width:1088px){.is-inline-desktop[data-v-534131b3]{display:inline!important}}@media screen and (min-width:1088px) and (max-width:1279px){.is-inline-desktop-only[data-v-534131b3]{display:inline!important}}@media screen and (min-width:1280px){.is-inline-widescreen[data-v-534131b3]{display:inline!important}}@media screen and (min-width:1280px) and (max-width:1471px){.is-inline-widescreen-only[data-v-534131b3]{display:inline!important}}@media screen and (min-width:1472px){.is-inline-fullhd[data-v-534131b3]{display:inline!important}}.is-inline-block[data-v-534131b3]{display:inline-block!important}@media screen and (max-width:768px){.is-inline-block-mobile[data-v-534131b3]{display:inline-block!important}}@media print,screen and (min-width:769px){.is-inline-block-tablet[data-v-534131b3]{display:inline-block!important}}@media screen and (min-width:769px) and (max-width:1087px){.is-inline-block-tablet-only[data-v-534131b3]{display:inline-block!important}}@media screen and (max-width:1087px){.is-inline-block-touch[data-v-534131b3]{display:inline-block!important}}@media screen and (min-width:1088px){.is-inline-block-desktop[data-v-534131b3]{display:inline-block!important}}@media screen and (min-width:1088px) and (max-width:1279px){.is-inline-block-desktop-only[data-v-534131b3]{display:inline-block!important}}@media screen and (min-width:1280px){.is-inline-block-widescreen[data-v-534131b3]{display:inline-block!important}}@media screen and (min-width:1280px) and (max-width:1471px){.is-inline-block-widescreen-only[data-v-534131b3]{display:inline-block!important}}@media screen and (min-width:1472px){.is-inline-block-fullhd[data-v-534131b3]{display:inline-block!important}}.is-inline-flex[data-v-534131b3]{display:inline-flex!important}@media screen and (max-width:768px){.is-inline-flex-mobile[data-v-534131b3]{display:inline-flex!important}}@media print,screen and (min-width:769px){.is-inline-flex-tablet[data-v-534131b3]{display:inline-flex!important}}@media screen and (min-width:769px) and (max-width:1087px){.is-inline-flex-tablet-only[data-v-534131b3]{display:inline-flex!important}}@media screen and (max-width:1087px){.is-inline-flex-touch[data-v-534131b3]{display:inline-flex!important}}@media screen and (min-width:1088px){.is-inline-flex-desktop[data-v-534131b3]{display:inline-flex!important}}@media screen and (min-width:1088px) and (max-width:1279px){.is-inline-flex-desktop-only[data-v-534131b3]{display:inline-flex!important}}@media screen and (min-width:1280px){.is-inline-flex-widescreen[data-v-534131b3]{display:inline-flex!important}}@media screen and (min-width:1280px) and (max-width:1471px){.is-inline-flex-widescreen-only[data-v-534131b3]{display:inline-flex!important}}@media screen and (min-width:1472px){.is-inline-flex-fullhd[data-v-534131b3]{display:inline-flex!important}}.is-hidden[data-v-534131b3]{display:none!important}.is-sr-only[data-v-534131b3]{border:none!important;clip:rect(0,0,0,0)!important;height:.01em!important;overflow:hidden!important;padding:0!important;position:absolute!important;white-space:nowrap!important;width:.01em!important}@media screen and (max-width:768px){.is-hidden-mobile[data-v-534131b3]{display:none!important}}@media print,screen and (min-width:769px){.is-hidden-tablet[data-v-534131b3]{display:none!important}}@media screen and (min-width:769px) and (max-width:1087px){.is-hidden-tablet-only[data-v-534131b3]{display:none!important}}@media screen and (max-width:1087px){.is-hidden-touch[data-v-534131b3]{display:none!important}}@media screen and (min-width:1088px){.is-hidden-desktop[data-v-534131b3]{display:none!important}}@media screen and (min-width:1088px) and (max-width:1279px){.is-hidden-desktop-only[data-v-534131b3]{display:none!important}}@media screen and (min-width:1280px){.is-hidden-widescreen[data-v-534131b3]{display:none!important}}@media screen and (min-width:1280px) and (max-width:1471px){.is-hidden-widescreen-only[data-v-534131b3]{display:none!important}}@media screen and (min-width:1472px){.is-hidden-fullhd[data-v-534131b3]{display:none!important}}.is-invisible[data-v-534131b3]{visibility:hidden!important}@media screen and (max-width:768px){.is-invisible-mobile[data-v-534131b3]{visibility:hidden!important}}@media print,screen and (min-width:769px){.is-invisible-tablet[data-v-534131b3]{visibility:hidden!important}}@media screen and (min-width:769px) and (max-width:1087px){.is-invisible-tablet-only[data-v-534131b3]{visibility:hidden!important}}@media screen and (max-width:1087px){.is-invisible-touch[data-v-534131b3]{visibility:hidden!important}}@media screen and (min-width:1088px){.is-invisible-desktop[data-v-534131b3]{visibility:hidden!important}}@media screen and (min-width:1088px) and (max-width:1279px){.is-invisible-desktop-only[data-v-534131b3]{visibility:hidden!important}}@media screen and (min-width:1280px){.is-invisible-widescreen[data-v-534131b3]{visibility:hidden!important}}@media screen and (min-width:1280px) and (max-width:1471px){.is-invisible-widescreen-only[data-v-534131b3]{visibility:hidden!important}}@media screen and (min-width:1472px){.is-invisible-fullhd[data-v-534131b3]{visibility:hidden!important}}.is-marginless[data-v-534131b3]{margin:0!important}.is-paddingless[data-v-534131b3]{padding:0!important}.is-radiusless[data-v-534131b3]{border-radius:0!important}.is-shadowless[data-v-534131b3]{box-shadow:none!important}.box[data-v-534131b3]{background-color:#fff;border-radius:6px;box-shadow:0 2px 3px hsla(0,0%,4%,.1),0 0 0 1px hsla(0,0%,4%,.1);color:#4a4a4a;display:block;padding:1.25rem}a.box[data-v-534131b3]:focus,a.box[data-v-534131b3]:hover{box-shadow:0 2px 3px hsla(0,0%,4%,.1),0 0 0 1px #3273dc}a.box[data-v-534131b3]:active{box-shadow:inset 0 1px 2px hsla(0,0%,4%,.2),0 0 0 1px #3273dc}.button[data-v-534131b3]{background-color:#fff;border-color:#dbdbdb;border-width:1px;color:#363636;cursor:pointer;justify-content:center;padding:calc(.375em - 1px) .75em;text-align:center;white-space:nowrap}.button strong[data-v-534131b3]{color:inherit}.button .icon.is-large[data-v-534131b3],.button .icon.is-medium[data-v-534131b3],.button .icon.is-small[data-v-534131b3],.button .icon[data-v-534131b3]{height:1.5em;width:1.5em}.button .icon[data-v-534131b3]:first-child:not(:last-child){margin-left:calc(-.375em - 1px);margin-right:.1875em}.button .icon[data-v-534131b3]:last-child:not(:first-child){margin-left:.1875em;margin-right:calc(-.375em - 1px)}.button .icon[data-v-534131b3]:first-child:last-child{margin-left:calc(-.375em - 1px);margin-right:calc(-.375em - 1px)}.button.is-hovered[data-v-534131b3],.button[data-v-534131b3]:hover{border-color:#b5b5b5;color:#363636}.button.is-focused[data-v-534131b3],.button[data-v-534131b3]:focus{border-color:#3273dc;color:#363636}.button.is-focused[data-v-534131b3]:not(:active),.button[data-v-534131b3]:focus:not(:active){box-shadow:0 0 0 .125em rgba(50,115,220,.25)}.button.is-active[data-v-534131b3],.button[data-v-534131b3]:active{border-color:#4a4a4a;color:#363636}.button.is-text[data-v-534131b3]{background-color:transparent;border-color:transparent;color:#4a4a4a;text-decoration:underline}.button.is-text.is-focused[data-v-534131b3],.button.is-text.is-hovered[data-v-534131b3],.button.is-text[data-v-534131b3]:focus,.button.is-text[data-v-534131b3]:hover{background-color:#f5f5f5;color:#363636}.button.is-text.is-active[data-v-534131b3],.button.is-text[data-v-534131b3]:active{background-color:#e8e8e8;color:#363636}.button.is-text[disabled][data-v-534131b3]{background-color:transparent;border-color:transparent;box-shadow:none}.button.is-white[data-v-534131b3]{background-color:#fff;border-color:transparent;color:#0a0a0a}.button.is-white.is-hovered[data-v-534131b3],.button.is-white[data-v-534131b3]:hover{background-color:#f9f9f9;border-color:transparent;color:#0a0a0a}.button.is-white.is-focused[data-v-534131b3],.button.is-white[data-v-534131b3]:focus{border-color:transparent;color:#0a0a0a}.button.is-white.is-focused[data-v-534131b3]:not(:active),.button.is-white[data-v-534131b3]:focus:not(:active){box-shadow:0 0 0 .125em hsla(0,0%,100%,.25)}.button.is-white.is-active[data-v-534131b3],.button.is-white[data-v-534131b3]:active{background-color:#f2f2f2;border-color:transparent;color:#0a0a0a}.button.is-white[disabled][data-v-534131b3]{background-color:#fff;border-color:transparent;box-shadow:none}.button.is-white.is-inverted[data-v-534131b3]{background-color:#0a0a0a;color:#fff}.button.is-white.is-inverted[data-v-534131b3]:hover{background-color:#000}.button.is-white.is-inverted[disabled][data-v-534131b3]{background-color:#0a0a0a;border-color:transparent;box-shadow:none;color:#fff}.button.is-white.is-loading[data-v-534131b3]:after{border-color:transparent transparent #0a0a0a #0a0a0a!important}.button.is-white.is-outlined[data-v-534131b3]{background-color:transparent;border-color:#fff;color:#fff}.button.is-white.is-outlined[data-v-534131b3]:focus,.button.is-white.is-outlined[data-v-534131b3]:hover{background-color:#fff;border-color:#fff;color:#0a0a0a}.button.is-white.is-outlined.is-loading[data-v-534131b3]:after{border-color:transparent transparent #fff #fff!important}.button.is-white.is-outlined[disabled][data-v-534131b3]{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-white.is-inverted.is-outlined[data-v-534131b3]{background-color:transparent;border-color:#0a0a0a;color:#0a0a0a}.button.is-white.is-inverted.is-outlined[data-v-534131b3]:focus,.button.is-white.is-inverted.is-outlined[data-v-534131b3]:hover{background-color:#0a0a0a;color:#fff}.button.is-white.is-inverted.is-outlined[disabled][data-v-534131b3]{background-color:transparent;border-color:#0a0a0a;box-shadow:none;color:#0a0a0a}.button.is-black[data-v-534131b3]{background-color:#0a0a0a;border-color:transparent;color:#fff}.button.is-black.is-hovered[data-v-534131b3],.button.is-black[data-v-534131b3]:hover{background-color:#040404;border-color:transparent;color:#fff}.button.is-black.is-focused[data-v-534131b3],.button.is-black[data-v-534131b3]:focus{border-color:transparent;color:#fff}.button.is-black.is-focused[data-v-534131b3]:not(:active),.button.is-black[data-v-534131b3]:focus:not(:active){box-shadow:0 0 0 .125em hsla(0,0%,4%,.25)}.button.is-black.is-active[data-v-534131b3],.button.is-black[data-v-534131b3]:active{background-color:#000;border-color:transparent;color:#fff}.button.is-black[disabled][data-v-534131b3]{background-color:#0a0a0a;border-color:transparent;box-shadow:none}.button.is-black.is-inverted[data-v-534131b3]{background-color:#fff;color:#0a0a0a}.button.is-black.is-inverted[data-v-534131b3]:hover{background-color:#f2f2f2}.button.is-black.is-inverted[disabled][data-v-534131b3]{background-color:#fff;border-color:transparent;box-shadow:none;color:#0a0a0a}.button.is-black.is-loading[data-v-534131b3]:after{border-color:transparent transparent #fff #fff!important}.button.is-black.is-outlined[data-v-534131b3]{background-color:transparent;border-color:#0a0a0a;color:#0a0a0a}.button.is-black.is-outlined[data-v-534131b3]:focus,.button.is-black.is-outlined[data-v-534131b3]:hover{background-color:#0a0a0a;border-color:#0a0a0a;color:#fff}.button.is-black.is-outlined.is-loading[data-v-534131b3]:after{border-color:transparent transparent #0a0a0a #0a0a0a!important}.button.is-black.is-outlined[disabled][data-v-534131b3]{background-color:transparent;border-color:#0a0a0a;box-shadow:none;color:#0a0a0a}.button.is-black.is-inverted.is-outlined[data-v-534131b3]{background-color:transparent;border-color:#fff;color:#fff}.button.is-black.is-inverted.is-outlined[data-v-534131b3]:focus,.button.is-black.is-inverted.is-outlined[data-v-534131b3]:hover{background-color:#fff;color:#0a0a0a}.button.is-black.is-inverted.is-outlined[disabled][data-v-534131b3]{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-light[data-v-534131b3]{background-color:#f5f5f5;border-color:transparent;color:#363636}.button.is-light.is-hovered[data-v-534131b3],.button.is-light[data-v-534131b3]:hover{background-color:#eee;border-color:transparent;color:#363636}.button.is-light.is-focused[data-v-534131b3],.button.is-light[data-v-534131b3]:focus{border-color:transparent;color:#363636}.button.is-light.is-focused[data-v-534131b3]:not(:active),.button.is-light[data-v-534131b3]:focus:not(:active){box-shadow:0 0 0 .125em hsla(0,0%,96%,.25)}.button.is-light.is-active[data-v-534131b3],.button.is-light[data-v-534131b3]:active{background-color:#e8e8e8;border-color:transparent;color:#363636}.button.is-light[disabled][data-v-534131b3]{background-color:#f5f5f5;border-color:transparent;box-shadow:none}.button.is-light.is-inverted[data-v-534131b3]{background-color:#363636;color:#f5f5f5}.button.is-light.is-inverted[data-v-534131b3]:hover{background-color:#292929}.button.is-light.is-inverted[disabled][data-v-534131b3]{background-color:#363636;border-color:transparent;box-shadow:none;color:#f5f5f5}.button.is-light.is-loading[data-v-534131b3]:after{border-color:transparent transparent #363636 #363636!important}.button.is-light.is-outlined[data-v-534131b3]{background-color:transparent;border-color:#f5f5f5;color:#f5f5f5}.button.is-light.is-outlined[data-v-534131b3]:focus,.button.is-light.is-outlined[data-v-534131b3]:hover{background-color:#f5f5f5;border-color:#f5f5f5;color:#363636}.button.is-light.is-outlined.is-loading[data-v-534131b3]:after{border-color:transparent transparent #f5f5f5 #f5f5f5!important}.button.is-light.is-outlined[disabled][data-v-534131b3]{background-color:transparent;border-color:#f5f5f5;box-shadow:none;color:#f5f5f5}.button.is-light.is-inverted.is-outlined[data-v-534131b3]{background-color:transparent;border-color:#363636;color:#363636}.button.is-light.is-inverted.is-outlined[data-v-534131b3]:focus,.button.is-light.is-inverted.is-outlined[data-v-534131b3]:hover{background-color:#363636;color:#f5f5f5}.button.is-light.is-inverted.is-outlined[disabled][data-v-534131b3]{background-color:transparent;border-color:#363636;box-shadow:none;color:#363636}.button.is-dark[data-v-534131b3]{background-color:#363636;border-color:transparent;color:#f5f5f5}.button.is-dark.is-hovered[data-v-534131b3],.button.is-dark[data-v-534131b3]:hover{background-color:#2f2f2f;border-color:transparent;color:#f5f5f5}.button.is-dark.is-focused[data-v-534131b3],.button.is-dark[data-v-534131b3]:focus{border-color:transparent;color:#f5f5f5}.button.is-dark.is-focused[data-v-534131b3]:not(:active),.button.is-dark[data-v-534131b3]:focus:not(:active){box-shadow:0 0 0 .125em rgba(54,54,54,.25)}.button.is-dark.is-active[data-v-534131b3],.button.is-dark[data-v-534131b3]:active{background-color:#292929;border-color:transparent;color:#f5f5f5}.button.is-dark[disabled][data-v-534131b3]{background-color:#363636;border-color:transparent;box-shadow:none}.button.is-dark.is-inverted[data-v-534131b3]{background-color:#f5f5f5;color:#363636}.button.is-dark.is-inverted[data-v-534131b3]:hover{background-color:#e8e8e8}.button.is-dark.is-inverted[disabled][data-v-534131b3]{background-color:#f5f5f5;border-color:transparent;box-shadow:none;color:#363636}.button.is-dark.is-loading[data-v-534131b3]:after{border-color:transparent transparent #f5f5f5 #f5f5f5!important}.button.is-dark.is-outlined[data-v-534131b3]{background-color:transparent;border-color:#363636;color:#363636}.button.is-dark.is-outlined[data-v-534131b3]:focus,.button.is-dark.is-outlined[data-v-534131b3]:hover{background-color:#363636;border-color:#363636;color:#f5f5f5}.button.is-dark.is-outlined.is-loading[data-v-534131b3]:after{border-color:transparent transparent #363636 #363636!important}.button.is-dark.is-outlined[disabled][data-v-534131b3]{background-color:transparent;border-color:#363636;box-shadow:none;color:#363636}.button.is-dark.is-inverted.is-outlined[data-v-534131b3]{background-color:transparent;border-color:#f5f5f5;color:#f5f5f5}.button.is-dark.is-inverted.is-outlined[data-v-534131b3]:focus,.button.is-dark.is-inverted.is-outlined[data-v-534131b3]:hover{background-color:#f5f5f5;color:#363636}.button.is-dark.is-inverted.is-outlined[disabled][data-v-534131b3]{background-color:transparent;border-color:#f5f5f5;box-shadow:none;color:#f5f5f5}.button.is-primary[data-v-534131b3],[data-v-534131b3] .button.deleteAreaBulma,[data-v-534131b3] .button.deleteContentBulma,[data-v-534131b3] .button.tagAreaBulma{background-color:#00d1b2;border-color:transparent;color:#fff}.button.is-primary.is-hovered[data-v-534131b3],.button.is-primary[data-v-534131b3]:hover,[data-v-534131b3] .button.deleteAreaBulma:hover,[data-v-534131b3] .button.deleteContentBulma:hover,[data-v-534131b3] .button.is-hovered.deleteAreaBulma,[data-v-534131b3] .button.is-hovered.deleteContentBulma,[data-v-534131b3] .button.is-hovered.tagAreaBulma,[data-v-534131b3] .button.tagAreaBulma:hover{background-color:#00c4a7;border-color:transparent;color:#fff}.button.is-primary.is-focused[data-v-534131b3],.button.is-primary[data-v-534131b3]:focus,[data-v-534131b3] .button.deleteAreaBulma:focus,[data-v-534131b3] .button.deleteContentBulma:focus,[data-v-534131b3] .button.is-focused.deleteAreaBulma,[data-v-534131b3] .button.is-focused.deleteContentBulma,[data-v-534131b3] .button.is-focused.tagAreaBulma,[data-v-534131b3] .button.tagAreaBulma:focus{border-color:transparent;color:#fff}.button.is-primary.is-focused[data-v-534131b3]:not(:active),.button.is-primary[data-v-534131b3]:focus:not(:active),[data-v-534131b3] .button.deleteAreaBulma:focus:not(:active),[data-v-534131b3] .button.deleteContentBulma:focus:not(:active),[data-v-534131b3] .button.is-focused.deleteAreaBulma:not(:active),[data-v-534131b3] .button.is-focused.deleteContentBulma:not(:active),[data-v-534131b3] .button.is-focused.tagAreaBulma:not(:active),[data-v-534131b3] .button.tagAreaBulma:focus:not(:active){box-shadow:0 0 0 .125em rgba(0,209,178,.25)}.button.is-primary.is-active[data-v-534131b3],.button.is-primary[data-v-534131b3]:active,[data-v-534131b3] .button.deleteAreaBulma:active,[data-v-534131b3] .button.deleteContentBulma:active,[data-v-534131b3] .button.is-active.deleteAreaBulma,[data-v-534131b3] .button.is-active.deleteContentBulma,[data-v-534131b3] .button.is-active.tagAreaBulma,[data-v-534131b3] .button.tagAreaBulma:active{background-color:#00b89c;border-color:transparent;color:#fff}.button.is-primary[disabled][data-v-534131b3],[data-v-534131b3] .button.deleteAreaBulma[disabled],[data-v-534131b3] .button.deleteContentBulma[disabled],[data-v-534131b3] .button.tagAreaBulma[disabled]{background-color:#00d1b2;border-color:transparent;box-shadow:none}.button.is-primary.is-inverted[data-v-534131b3],[data-v-534131b3] .button.is-inverted.deleteAreaBulma,[data-v-534131b3] .button.is-inverted.deleteContentBulma,[data-v-534131b3] .button.is-inverted.tagAreaBulma{background-color:#fff;color:#00d1b2}.button.is-primary.is-inverted[data-v-534131b3]:hover,[data-v-534131b3] .button.is-inverted.deleteAreaBulma:hover,[data-v-534131b3] .button.is-inverted.deleteContentBulma:hover,[data-v-534131b3] .button.is-inverted.tagAreaBulma:hover{background-color:#f2f2f2}.button.is-primary.is-inverted[disabled][data-v-534131b3],[data-v-534131b3] .button.is-inverted.deleteAreaBulma[disabled],[data-v-534131b3] .button.is-inverted.deleteContentBulma[disabled],[data-v-534131b3] .button.is-inverted.tagAreaBulma[disabled]{background-color:#fff;border-color:transparent;box-shadow:none;color:#00d1b2}.button.is-primary.is-loading[data-v-534131b3]:after,[data-v-534131b3] .button.is-loading.deleteAreaBulma:after,[data-v-534131b3] .button.is-loading.deleteContentBulma:after,[data-v-534131b3] .button.is-loading.tagAreaBulma:after{border-color:transparent transparent #fff #fff!important}.button.is-primary.is-outlined[data-v-534131b3],[data-v-534131b3] .button.is-outlined.deleteAreaBulma,[data-v-534131b3] .button.is-outlined.deleteContentBulma,[data-v-534131b3] .button.is-outlined.tagAreaBulma{background-color:transparent;border-color:#00d1b2;color:#00d1b2}.button.is-primary.is-outlined[data-v-534131b3]:focus,.button.is-primary.is-outlined[data-v-534131b3]:hover,[data-v-534131b3] .button.is-outlined.deleteAreaBulma:focus,[data-v-534131b3] .button.is-outlined.deleteAreaBulma:hover,[data-v-534131b3] .button.is-outlined.deleteContentBulma:focus,[data-v-534131b3] .button.is-outlined.deleteContentBulma:hover,[data-v-534131b3] .button.is-outlined.tagAreaBulma:focus,[data-v-534131b3] .button.is-outlined.tagAreaBulma:hover{background-color:#00d1b2;border-color:#00d1b2;color:#fff}.button.is-primary.is-outlined.is-loading[data-v-534131b3]:after,[data-v-534131b3] .button.is-outlined.is-loading.deleteAreaBulma:after,[data-v-534131b3] .button.is-outlined.is-loading.deleteContentBulma:after,[data-v-534131b3] .button.is-outlined.is-loading.tagAreaBulma:after{border-color:transparent transparent #00d1b2 #00d1b2!important}.button.is-primary.is-outlined[disabled][data-v-534131b3],[data-v-534131b3] .button.is-outlined.deleteAreaBulma[disabled],[data-v-534131b3] .button.is-outlined.deleteContentBulma[disabled],[data-v-534131b3] .button.is-outlined.tagAreaBulma[disabled]{background-color:transparent;border-color:#00d1b2;box-shadow:none;color:#00d1b2}.button.is-primary.is-inverted.is-outlined[data-v-534131b3],[data-v-534131b3] .button.is-inverted.is-outlined.deleteAreaBulma,[data-v-534131b3] .button.is-inverted.is-outlined.deleteContentBulma,[data-v-534131b3] .button.is-inverted.is-outlined.tagAreaBulma{background-color:transparent;border-color:#fff;color:#fff}.button.is-primary.is-inverted.is-outlined[data-v-534131b3]:focus,.button.is-primary.is-inverted.is-outlined[data-v-534131b3]:hover,[data-v-534131b3] .button.is-inverted.is-outlined.deleteAreaBulma:focus,[data-v-534131b3] .button.is-inverted.is-outlined.deleteAreaBulma:hover,[data-v-534131b3] .button.is-inverted.is-outlined.deleteContentBulma:focus,[data-v-534131b3] .button.is-inverted.is-outlined.deleteContentBulma:hover,[data-v-534131b3] .button.is-inverted.is-outlined.tagAreaBulma:focus,[data-v-534131b3] .button.is-inverted.is-outlined.tagAreaBulma:hover{background-color:#fff;color:#00d1b2}.button.is-primary.is-inverted.is-outlined[disabled][data-v-534131b3],[data-v-534131b3] .button.is-inverted.is-outlined.deleteAreaBulma[disabled],[data-v-534131b3] .button.is-inverted.is-outlined.deleteContentBulma[disabled],[data-v-534131b3] .button.is-inverted.is-outlined.tagAreaBulma[disabled]{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-link[data-v-534131b3]{background-color:#3273dc;border-color:transparent;color:#fff}.button.is-link.is-hovered[data-v-534131b3],.button.is-link[data-v-534131b3]:hover{background-color:#276cda;border-color:transparent;color:#fff}.button.is-link.is-focused[data-v-534131b3],.button.is-link[data-v-534131b3]:focus{border-color:transparent;color:#fff}.button.is-link.is-focused[data-v-534131b3]:not(:active),.button.is-link[data-v-534131b3]:focus:not(:active){box-shadow:0 0 0 .125em rgba(50,115,220,.25)}.button.is-link.is-active[data-v-534131b3],.button.is-link[data-v-534131b3]:active{background-color:#2366d1;border-color:transparent;color:#fff}.button.is-link[disabled][data-v-534131b3]{background-color:#3273dc;border-color:transparent;box-shadow:none}.button.is-link.is-inverted[data-v-534131b3]{background-color:#fff;color:#3273dc}.button.is-link.is-inverted[data-v-534131b3]:hover{background-color:#f2f2f2}.button.is-link.is-inverted[disabled][data-v-534131b3]{background-color:#fff;border-color:transparent;box-shadow:none;color:#3273dc}.button.is-link.is-loading[data-v-534131b3]:after{border-color:transparent transparent #fff #fff!important}.button.is-link.is-outlined[data-v-534131b3]{background-color:transparent;border-color:#3273dc;color:#3273dc}.button.is-link.is-outlined[data-v-534131b3]:focus,.button.is-link.is-outlined[data-v-534131b3]:hover{background-color:#3273dc;border-color:#3273dc;color:#fff}.button.is-link.is-outlined.is-loading[data-v-534131b3]:after{border-color:transparent transparent #3273dc #3273dc!important}.button.is-link.is-outlined[disabled][data-v-534131b3]{background-color:transparent;border-color:#3273dc;box-shadow:none;color:#3273dc}.button.is-link.is-inverted.is-outlined[data-v-534131b3]{background-color:transparent;border-color:#fff;color:#fff}.button.is-link.is-inverted.is-outlined[data-v-534131b3]:focus,.button.is-link.is-inverted.is-outlined[data-v-534131b3]:hover{background-color:#fff;color:#3273dc}.button.is-link.is-inverted.is-outlined[disabled][data-v-534131b3]{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-info[data-v-534131b3]{background-color:#209cee;border-color:transparent;color:#fff}.button.is-info.is-hovered[data-v-534131b3],.button.is-info[data-v-534131b3]:hover{background-color:#1496ed;border-color:transparent;color:#fff}.button.is-info.is-focused[data-v-534131b3],.button.is-info[data-v-534131b3]:focus{border-color:transparent;color:#fff}.button.is-info.is-focused[data-v-534131b3]:not(:active),.button.is-info[data-v-534131b3]:focus:not(:active){box-shadow:0 0 0 .125em rgba(32,156,238,.25)}.button.is-info.is-active[data-v-534131b3],.button.is-info[data-v-534131b3]:active{background-color:#118fe4;border-color:transparent;color:#fff}.button.is-info[disabled][data-v-534131b3]{background-color:#209cee;border-color:transparent;box-shadow:none}.button.is-info.is-inverted[data-v-534131b3]{background-color:#fff;color:#209cee}.button.is-info.is-inverted[data-v-534131b3]:hover{background-color:#f2f2f2}.button.is-info.is-inverted[disabled][data-v-534131b3]{background-color:#fff;border-color:transparent;box-shadow:none;color:#209cee}.button.is-info.is-loading[data-v-534131b3]:after{border-color:transparent transparent #fff #fff!important}.button.is-info.is-outlined[data-v-534131b3]{background-color:transparent;border-color:#209cee;color:#209cee}.button.is-info.is-outlined[data-v-534131b3]:focus,.button.is-info.is-outlined[data-v-534131b3]:hover{background-color:#209cee;border-color:#209cee;color:#fff}.button.is-info.is-outlined.is-loading[data-v-534131b3]:after{border-color:transparent transparent #209cee #209cee!important}.button.is-info.is-outlined[disabled][data-v-534131b3]{background-color:transparent;border-color:#209cee;box-shadow:none;color:#209cee}.button.is-info.is-inverted.is-outlined[data-v-534131b3]{background-color:transparent;border-color:#fff;color:#fff}.button.is-info.is-inverted.is-outlined[data-v-534131b3]:focus,.button.is-info.is-inverted.is-outlined[data-v-534131b3]:hover{background-color:#fff;color:#209cee}.button.is-info.is-inverted.is-outlined[disabled][data-v-534131b3]{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-success[data-v-534131b3]{background-color:#23d160;border-color:transparent;color:#fff}.button.is-success.is-hovered[data-v-534131b3],.button.is-success[data-v-534131b3]:hover{background-color:#22c65b;border-color:transparent;color:#fff}.button.is-success.is-focused[data-v-534131b3],.button.is-success[data-v-534131b3]:focus{border-color:transparent;color:#fff}.button.is-success.is-focused[data-v-534131b3]:not(:active),.button.is-success[data-v-534131b3]:focus:not(:active){box-shadow:0 0 0 .125em rgba(35,209,96,.25)}.button.is-success.is-active[data-v-534131b3],.button.is-success[data-v-534131b3]:active{background-color:#20bc56;border-color:transparent;color:#fff}.button.is-success[disabled][data-v-534131b3]{background-color:#23d160;border-color:transparent;box-shadow:none}.button.is-success.is-inverted[data-v-534131b3]{background-color:#fff;color:#23d160}.button.is-success.is-inverted[data-v-534131b3]:hover{background-color:#f2f2f2}.button.is-success.is-inverted[disabled][data-v-534131b3]{background-color:#fff;border-color:transparent;box-shadow:none;color:#23d160}.button.is-success.is-loading[data-v-534131b3]:after{border-color:transparent transparent #fff #fff!important}.button.is-success.is-outlined[data-v-534131b3]{background-color:transparent;border-color:#23d160;color:#23d160}.button.is-success.is-outlined[data-v-534131b3]:focus,.button.is-success.is-outlined[data-v-534131b3]:hover{background-color:#23d160;border-color:#23d160;color:#fff}.button.is-success.is-outlined.is-loading[data-v-534131b3]:after{border-color:transparent transparent #23d160 #23d160!important}.button.is-success.is-outlined[disabled][data-v-534131b3]{background-color:transparent;border-color:#23d160;box-shadow:none;color:#23d160}.button.is-success.is-inverted.is-outlined[data-v-534131b3]{background-color:transparent;border-color:#fff;color:#fff}.button.is-success.is-inverted.is-outlined[data-v-534131b3]:focus,.button.is-success.is-inverted.is-outlined[data-v-534131b3]:hover{background-color:#fff;color:#23d160}.button.is-success.is-inverted.is-outlined[disabled][data-v-534131b3]{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-warning[data-v-534131b3]{background-color:#ffdd57;border-color:transparent;color:rgba(0,0,0,.7)}.button.is-warning.is-hovered[data-v-534131b3],.button.is-warning[data-v-534131b3]:hover{background-color:#ffdb4a;border-color:transparent;color:rgba(0,0,0,.7)}.button.is-warning.is-focused[data-v-534131b3],.button.is-warning[data-v-534131b3]:focus{border-color:transparent;color:rgba(0,0,0,.7)}.button.is-warning.is-focused[data-v-534131b3]:not(:active),.button.is-warning[data-v-534131b3]:focus:not(:active){box-shadow:0 0 0 .125em rgba(255,221,87,.25)}.button.is-warning.is-active[data-v-534131b3],.button.is-warning[data-v-534131b3]:active{background-color:#ffd83d;border-color:transparent;color:rgba(0,0,0,.7)}.button.is-warning[disabled][data-v-534131b3]{background-color:#ffdd57;border-color:transparent;box-shadow:none}.button.is-warning.is-inverted[data-v-534131b3]{background-color:rgba(0,0,0,.7);color:#ffdd57}.button.is-warning.is-inverted[data-v-534131b3]:hover{background-color:rgba(0,0,0,.7)}.button.is-warning.is-inverted[disabled][data-v-534131b3]{background-color:rgba(0,0,0,.7);border-color:transparent;box-shadow:none;color:#ffdd57}.button.is-warning.is-loading[data-v-534131b3]:after{border-color:transparent transparent rgba(0,0,0,.7) rgba(0,0,0,.7)!important}.button.is-warning.is-outlined[data-v-534131b3]{background-color:transparent;border-color:#ffdd57;color:#ffdd57}.button.is-warning.is-outlined[data-v-534131b3]:focus,.button.is-warning.is-outlined[data-v-534131b3]:hover{background-color:#ffdd57;border-color:#ffdd57;color:rgba(0,0,0,.7)}.button.is-warning.is-outlined.is-loading[data-v-534131b3]:after{border-color:transparent transparent #ffdd57 #ffdd57!important}.button.is-warning.is-outlined[disabled][data-v-534131b3]{background-color:transparent;border-color:#ffdd57;box-shadow:none;color:#ffdd57}.button.is-warning.is-inverted.is-outlined[data-v-534131b3]{background-color:transparent;border-color:rgba(0,0,0,.7);color:rgba(0,0,0,.7)}.button.is-warning.is-inverted.is-outlined[data-v-534131b3]:focus,.button.is-warning.is-inverted.is-outlined[data-v-534131b3]:hover{background-color:rgba(0,0,0,.7);color:#ffdd57}.button.is-warning.is-inverted.is-outlined[disabled][data-v-534131b3]{background-color:transparent;border-color:rgba(0,0,0,.7);box-shadow:none;color:rgba(0,0,0,.7)}.button.is-danger[data-v-534131b3]{background-color:#ff3860;border-color:transparent;color:#fff}.button.is-danger.is-hovered[data-v-534131b3],.button.is-danger[data-v-534131b3]:hover{background-color:#ff2b56;border-color:transparent;color:#fff}.button.is-danger.is-focused[data-v-534131b3],.button.is-danger[data-v-534131b3]:focus{border-color:transparent;color:#fff}.button.is-danger.is-focused[data-v-534131b3]:not(:active),.button.is-danger[data-v-534131b3]:focus:not(:active){box-shadow:0 0 0 .125em rgba(255,56,96,.25)}.button.is-danger.is-active[data-v-534131b3],.button.is-danger[data-v-534131b3]:active{background-color:#ff1f4b;border-color:transparent;color:#fff}.button.is-danger[disabled][data-v-534131b3]{background-color:#ff3860;border-color:transparent;box-shadow:none}.button.is-danger.is-inverted[data-v-534131b3]{background-color:#fff;color:#ff3860}.button.is-danger.is-inverted[data-v-534131b3]:hover{background-color:#f2f2f2}.button.is-danger.is-inverted[disabled][data-v-534131b3]{background-color:#fff;border-color:transparent;box-shadow:none;color:#ff3860}.button.is-danger.is-loading[data-v-534131b3]:after{border-color:transparent transparent #fff #fff!important}.button.is-danger.is-outlined[data-v-534131b3]{background-color:transparent;border-color:#ff3860;color:#ff3860}.button.is-danger.is-outlined[data-v-534131b3]:focus,.button.is-danger.is-outlined[data-v-534131b3]:hover{background-color:#ff3860;border-color:#ff3860;color:#fff}.button.is-danger.is-outlined.is-loading[data-v-534131b3]:after{border-color:transparent transparent #ff3860 #ff3860!important}.button.is-danger.is-outlined[disabled][data-v-534131b3]{background-color:transparent;border-color:#ff3860;box-shadow:none;color:#ff3860}.button.is-danger.is-inverted.is-outlined[data-v-534131b3]{background-color:transparent;border-color:#fff;color:#fff}.button.is-danger.is-inverted.is-outlined[data-v-534131b3]:focus,.button.is-danger.is-inverted.is-outlined[data-v-534131b3]:hover{background-color:#fff;color:#ff3860}.button.is-danger.is-inverted.is-outlined[disabled][data-v-534131b3]{background-color:transparent;border-color:#fff;box-shadow:none;color:#fff}.button.is-small[data-v-534131b3]{border-radius:2px;font-size:.75rem}.button.is-medium[data-v-534131b3]{font-size:1.25rem}.button.is-large[data-v-534131b3]{font-size:1.5rem}.button[disabled][data-v-534131b3]{background-color:#fff;border-color:#dbdbdb;box-shadow:none;opacity:.5}.button.is-fullwidth[data-v-534131b3]{display:flex;width:100%}.button.is-loading[data-v-534131b3]{color:transparent!important;pointer-events:none}.button.is-loading[data-v-534131b3]:after{position:absolute;left:calc(50% - 0.5em);top:calc(50% - 0.5em);position:absolute!important}.button.is-static[data-v-534131b3]{background-color:#f5f5f5;border-color:#dbdbdb;color:#7a7a7a;box-shadow:none;pointer-events:none}.button.is-rounded[data-v-534131b3]{border-radius:290486px;padding-left:1em;padding-right:1em}.buttons[data-v-534131b3]{align-items:center;display:flex;flex-wrap:wrap;justify-content:flex-start}.buttons .button[data-v-534131b3]{margin-bottom:.5rem}.buttons .button[data-v-534131b3]:not(:last-child):not(.is-fullwidth){margin-right:.5rem}.buttons[data-v-534131b3]:last-child{margin-bottom:-.5rem}.buttons[data-v-534131b3]:not(:last-child){margin-bottom:1rem}.buttons.has-addons .button[data-v-534131b3]:not(:first-child){border-bottom-left-radius:0;border-top-left-radius:0}.buttons.has-addons .button[data-v-534131b3]:not(:last-child){border-bottom-right-radius:0;border-top-right-radius:0;margin-right:-1px}.buttons.has-addons .button[data-v-534131b3]:last-child{margin-right:0}.buttons.has-addons .button.is-hovered[data-v-534131b3],.buttons.has-addons .button[data-v-534131b3]:hover{z-index:2}.buttons.has-addons .button.is-active[data-v-534131b3],.buttons.has-addons .button.is-focused[data-v-534131b3],.buttons.has-addons .button.is-selected[data-v-534131b3],.buttons.has-addons .button[data-v-534131b3]:active,.buttons.has-addons .button[data-v-534131b3]:focus{z-index:3}.buttons.has-addons .button.is-active[data-v-534131b3]:hover,.buttons.has-addons .button.is-focused[data-v-534131b3]:hover,.buttons.has-addons .button.is-selected[data-v-534131b3]:hover,.buttons.has-addons .button[data-v-534131b3]:active:hover,.buttons.has-addons .button[data-v-534131b3]:focus:hover{z-index:4}.buttons.has-addons .button.is-expanded[data-v-534131b3]{flex-grow:1}.buttons.is-centered[data-v-534131b3]{justify-content:center}.buttons.is-right[data-v-534131b3]{justify-content:flex-end}.container[data-v-534131b3]{margin:0 auto;position:relative}@media screen and (min-width:1088px){.container[data-v-534131b3]{max-width:960px;width:960px}.container.is-fluid[data-v-534131b3]{margin-left:64px;margin-right:64px;max-width:none;width:auto}}@media screen and (max-width:1279px){.container.is-widescreen[data-v-534131b3]{max-width:1152px;width:auto}}@media screen and (max-width:1471px){.container.is-fullhd[data-v-534131b3]{max-width:1344px;width:auto}}@media screen and (min-width:1280px){.container[data-v-534131b3]{max-width:1152px;width:1152px}}@media screen and (min-width:1472px){.container[data-v-534131b3]{max-width:1344px;width:1344px}}.content li+li[data-v-534131b3]{margin-top:.25em}.content blockquote[data-v-534131b3]:not(:last-child),.content dl[data-v-534131b3]:not(:last-child),.content ol[data-v-534131b3]:not(:last-child),.content p[data-v-534131b3]:not(:last-child),.content pre[data-v-534131b3]:not(:last-child),.content table[data-v-534131b3]:not(:last-child),.content ul[data-v-534131b3]:not(:last-child){margin-bottom:1em}.content h1[data-v-534131b3],.content h2[data-v-534131b3],.content h3[data-v-534131b3],.content h4[data-v-534131b3],.content h5[data-v-534131b3],.content h6[data-v-534131b3]{color:#363636;font-weight:600;line-height:1.125}.content h1[data-v-534131b3]{font-size:2em;margin-bottom:.5em}.content h1[data-v-534131b3]:not(:first-child){margin-top:1em}.content h2[data-v-534131b3]{font-size:1.75em;margin-bottom:.5714em}.content h2[data-v-534131b3]:not(:first-child){margin-top:1.1428em}.content h3[data-v-534131b3]{font-size:1.5em;margin-bottom:.6666em}.content h3[data-v-534131b3]:not(:first-child){margin-top:1.3333em}.content h4[data-v-534131b3]{font-size:1.25em;margin-bottom:.8em}.content h5[data-v-534131b3]{font-size:1.125em;margin-bottom:.8888em}.content h6[data-v-534131b3]{font-size:1em;margin-bottom:1em}.content blockquote[data-v-534131b3]{background-color:#f5f5f5;border-left:5px solid #dbdbdb;padding:1.25em 1.5em}.content ol[data-v-534131b3]{list-style-position:outside;margin-left:2em;margin-top:1em}.content ol[data-v-534131b3]:not([type]){list-style-type:decimal}.content ol:not([type]).is-lower-alpha[data-v-534131b3]{list-style-type:lower-alpha}.content ol:not([type]).is-lower-roman[data-v-534131b3]{list-style-type:lower-roman}.content ol:not([type]).is-upper-alpha[data-v-534131b3]{list-style-type:upper-alpha}.content ol:not([type]).is-upper-roman[data-v-534131b3]{list-style-type:upper-roman}.content ul[data-v-534131b3]{list-style:disc outside;margin-left:2em;margin-top:1em}.content ul ul[data-v-534131b3]{list-style-type:circle;margin-top:.5em}.content ul ul ul[data-v-534131b3]{list-style-type:square}.content dd[data-v-534131b3]{margin-left:2em}.content figure[data-v-534131b3]{margin-left:2em;margin-right:2em;text-align:center}.content figure[data-v-534131b3]:not(:first-child){margin-top:2em}.content figure[data-v-534131b3]:not(:last-child){margin-bottom:2em}.content figure img[data-v-534131b3]{display:inline-block}.content figure figcaption[data-v-534131b3]{font-style:italic}.content pre[data-v-534131b3]{-webkit-overflow-scrolling:touch;overflow-x:auto;padding:1.25em 1.5em;white-space:pre;word-wrap:normal}.content sub[data-v-534131b3],.content sup[data-v-534131b3]{font-size:75%}.content table[data-v-534131b3]{width:100%}.content table td[data-v-534131b3],.content table th[data-v-534131b3]{border:1px solid #dbdbdb;border-width:0 0 1px;padding:.5em .75em;vertical-align:top}.content table th[data-v-534131b3]{color:#363636;text-align:left}.content table thead td[data-v-534131b3],.content table thead th[data-v-534131b3]{border-width:0 0 2px;color:#363636}.content table tfoot td[data-v-534131b3],.content table tfoot th[data-v-534131b3]{border-width:2px 0 0;color:#363636}.content table tbody tr:last-child td[data-v-534131b3],.content table tbody tr:last-child th[data-v-534131b3]{border-bottom-width:0}.content.is-small[data-v-534131b3]{font-size:.75rem}.content.is-medium[data-v-534131b3]{font-size:1.25rem}.content.is-large[data-v-534131b3]{font-size:1.5rem}.input[data-v-534131b3],.textarea[data-v-534131b3]{background-color:#fff;border-color:#dbdbdb;color:#363636;box-shadow:inset 0 1px 2px hsla(0,0%,4%,.1);max-width:100%;width:100%}.input[data-v-534131b3]::-moz-placeholder,.textarea[data-v-534131b3]::-moz-placeholder{color:rgba(54,54,54,.3)}.input[data-v-534131b3]::-webkit-input-placeholder,.textarea[data-v-534131b3]::-webkit-input-placeholder{color:rgba(54,54,54,.3)}.input[data-v-534131b3]:-moz-placeholder,.textarea[data-v-534131b3]:-moz-placeholder{color:rgba(54,54,54,.3)}.input[data-v-534131b3]:-ms-input-placeholder,.textarea[data-v-534131b3]:-ms-input-placeholder{color:rgba(54,54,54,.3)}.input.is-hovered[data-v-534131b3],.input[data-v-534131b3]:hover,.textarea.is-hovered[data-v-534131b3],.textarea[data-v-534131b3]:hover{border-color:#b5b5b5}.input.is-active[data-v-534131b3],.input.is-focused[data-v-534131b3],.input[data-v-534131b3]:active,.input[data-v-534131b3]:focus,.textarea.is-active[data-v-534131b3],.textarea.is-focused[data-v-534131b3],.textarea[data-v-534131b3]:active,.textarea[data-v-534131b3]:focus{border-color:#3273dc;box-shadow:0 0 0 .125em rgba(50,115,220,.25)}.input[disabled][data-v-534131b3],.textarea[disabled][data-v-534131b3]{background-color:#f5f5f5;border-color:#f5f5f5;box-shadow:none;color:#7a7a7a}.input[disabled][data-v-534131b3]::-moz-placeholder,.textarea[disabled][data-v-534131b3]::-moz-placeholder{color:hsla(0,0%,48%,.3)}.input[disabled][data-v-534131b3]::-webkit-input-placeholder,.textarea[disabled][data-v-534131b3]::-webkit-input-placeholder{color:hsla(0,0%,48%,.3)}.input[disabled][data-v-534131b3]:-moz-placeholder,.textarea[disabled][data-v-534131b3]:-moz-placeholder{color:hsla(0,0%,48%,.3)}.input[disabled][data-v-534131b3]:-ms-input-placeholder,.textarea[disabled][data-v-534131b3]:-ms-input-placeholder{color:hsla(0,0%,48%,.3)}.input[readonly][data-v-534131b3],.textarea[readonly][data-v-534131b3]{box-shadow:none}.input.is-white[data-v-534131b3],.textarea.is-white[data-v-534131b3]{border-color:#fff}.input.is-white.is-active[data-v-534131b3],.input.is-white.is-focused[data-v-534131b3],.input.is-white[data-v-534131b3]:active,.input.is-white[data-v-534131b3]:focus,.textarea.is-white.is-active[data-v-534131b3],.textarea.is-white.is-focused[data-v-534131b3],.textarea.is-white[data-v-534131b3]:active,.textarea.is-white[data-v-534131b3]:focus{box-shadow:0 0 0 .125em hsla(0,0%,100%,.25)}.input.is-black[data-v-534131b3],.textarea.is-black[data-v-534131b3]{border-color:#0a0a0a}.input.is-black.is-active[data-v-534131b3],.input.is-black.is-focused[data-v-534131b3],.input.is-black[data-v-534131b3]:active,.input.is-black[data-v-534131b3]:focus,.textarea.is-black.is-active[data-v-534131b3],.textarea.is-black.is-focused[data-v-534131b3],.textarea.is-black[data-v-534131b3]:active,.textarea.is-black[data-v-534131b3]:focus{box-shadow:0 0 0 .125em hsla(0,0%,4%,.25)}.input.is-light[data-v-534131b3],.textarea.is-light[data-v-534131b3]{border-color:#f5f5f5}.input.is-light.is-active[data-v-534131b3],.input.is-light.is-focused[data-v-534131b3],.input.is-light[data-v-534131b3]:active,.input.is-light[data-v-534131b3]:focus,.textarea.is-light.is-active[data-v-534131b3],.textarea.is-light.is-focused[data-v-534131b3],.textarea.is-light[data-v-534131b3]:active,.textarea.is-light[data-v-534131b3]:focus{box-shadow:0 0 0 .125em hsla(0,0%,96%,.25)}.input.is-dark[data-v-534131b3],.textarea.is-dark[data-v-534131b3]{border-color:#363636}.input.is-dark.is-active[data-v-534131b3],.input.is-dark.is-focused[data-v-534131b3],.input.is-dark[data-v-534131b3]:active,.input.is-dark[data-v-534131b3]:focus,.textarea.is-dark.is-active[data-v-534131b3],.textarea.is-dark.is-focused[data-v-534131b3],.textarea.is-dark[data-v-534131b3]:active,.textarea.is-dark[data-v-534131b3]:focus{box-shadow:0 0 0 .125em rgba(54,54,54,.25)}.input.is-primary[data-v-534131b3],.textarea.is-primary[data-v-534131b3],[data-v-534131b3] .input.deleteAreaBulma,[data-v-534131b3] .input.deleteContentBulma,[data-v-534131b3] .input.tagAreaBulma,[data-v-534131b3] .textarea.deleteAreaBulma,[data-v-534131b3] .textarea.deleteContentBulma,[data-v-534131b3] .textarea.tagAreaBulma{border-color:#00d1b2}.input.is-primary.is-active[data-v-534131b3],.input.is-primary.is-focused[data-v-534131b3],.input.is-primary[data-v-534131b3]:active,.input.is-primary[data-v-534131b3]:focus,.textarea.is-primary.is-active[data-v-534131b3],.textarea.is-primary.is-focused[data-v-534131b3],.textarea.is-primary[data-v-534131b3]:active,.textarea.is-primary[data-v-534131b3]:focus,[data-v-534131b3] .input.deleteAreaBulma:active,[data-v-534131b3] .input.deleteAreaBulma:focus,[data-v-534131b3] .input.deleteContentBulma:active,[data-v-534131b3] .input.deleteContentBulma:focus,[data-v-534131b3] .input.is-active.deleteAreaBulma,[data-v-534131b3] .input.is-active.deleteContentBulma,[data-v-534131b3] .input.is-active.tagAreaBulma,[data-v-534131b3] .input.is-focused.deleteAreaBulma,[data-v-534131b3] .input.is-focused.deleteContentBulma,[data-v-534131b3] .input.is-focused.tagAreaBulma,[data-v-534131b3] .input.tagAreaBulma:active,[data-v-534131b3] .input.tagAreaBulma:focus,[data-v-534131b3] .textarea.deleteAreaBulma:active,[data-v-534131b3] .textarea.deleteAreaBulma:focus,[data-v-534131b3] .textarea.deleteContentBulma:active,[data-v-534131b3] .textarea.deleteContentBulma:focus,[data-v-534131b3] .textarea.is-active.deleteAreaBulma,[data-v-534131b3] .textarea.is-active.deleteContentBulma,[data-v-534131b3] .textarea.is-active.tagAreaBulma,[data-v-534131b3] .textarea.is-focused.deleteAreaBulma,[data-v-534131b3] .textarea.is-focused.deleteContentBulma,[data-v-534131b3] .textarea.is-focused.tagAreaBulma,[data-v-534131b3] .textarea.tagAreaBulma:active,[data-v-534131b3] .textarea.tagAreaBulma:focus{box-shadow:0 0 0 .125em rgba(0,209,178,.25)}.input.is-link[data-v-534131b3],.textarea.is-link[data-v-534131b3]{border-color:#3273dc}.input.is-link.is-active[data-v-534131b3],.input.is-link.is-focused[data-v-534131b3],.input.is-link[data-v-534131b3]:active,.input.is-link[data-v-534131b3]:focus,.textarea.is-link.is-active[data-v-534131b3],.textarea.is-link.is-focused[data-v-534131b3],.textarea.is-link[data-v-534131b3]:active,.textarea.is-link[data-v-534131b3]:focus{box-shadow:0 0 0 .125em rgba(50,115,220,.25)}.input.is-info[data-v-534131b3],.textarea.is-info[data-v-534131b3]{border-color:#209cee}.input.is-info.is-active[data-v-534131b3],.input.is-info.is-focused[data-v-534131b3],.input.is-info[data-v-534131b3]:active,.input.is-info[data-v-534131b3]:focus,.textarea.is-info.is-active[data-v-534131b3],.textarea.is-info.is-focused[data-v-534131b3],.textarea.is-info[data-v-534131b3]:active,.textarea.is-info[data-v-534131b3]:focus{box-shadow:0 0 0 .125em rgba(32,156,238,.25)}.input.is-success[data-v-534131b3],.textarea.is-success[data-v-534131b3]{border-color:#23d160}.input.is-success.is-active[data-v-534131b3],.input.is-success.is-focused[data-v-534131b3],.input.is-success[data-v-534131b3]:active,.input.is-success[data-v-534131b3]:focus,.textarea.is-success.is-active[data-v-534131b3],.textarea.is-success.is-focused[data-v-534131b3],.textarea.is-success[data-v-534131b3]:active,.textarea.is-success[data-v-534131b3]:focus{box-shadow:0 0 0 .125em rgba(35,209,96,.25)}.input.is-warning[data-v-534131b3],.textarea.is-warning[data-v-534131b3]{border-color:#ffdd57}.input.is-warning.is-active[data-v-534131b3],.input.is-warning.is-focused[data-v-534131b3],.input.is-warning[data-v-534131b3]:active,.input.is-warning[data-v-534131b3]:focus,.textarea.is-warning.is-active[data-v-534131b3],.textarea.is-warning.is-focused[data-v-534131b3],.textarea.is-warning[data-v-534131b3]:active,.textarea.is-warning[data-v-534131b3]:focus{box-shadow:0 0 0 .125em rgba(255,221,87,.25)}.input.is-danger[data-v-534131b3],.textarea.is-danger[data-v-534131b3]{border-color:#ff3860}.input.is-danger.is-active[data-v-534131b3],.input.is-danger.is-focused[data-v-534131b3],.input.is-danger[data-v-534131b3]:active,.input.is-danger[data-v-534131b3]:focus,.textarea.is-danger.is-active[data-v-534131b3],.textarea.is-danger.is-focused[data-v-534131b3],.textarea.is-danger[data-v-534131b3]:active,.textarea.is-danger[data-v-534131b3]:focus{box-shadow:0 0 0 .125em rgba(255,56,96,.25)}.input.is-small[data-v-534131b3],.textarea.is-small[data-v-534131b3]{border-radius:2px;font-size:.75rem}.input.is-medium[data-v-534131b3],.textarea.is-medium[data-v-534131b3]{font-size:1.25rem}.input.is-large[data-v-534131b3],.textarea.is-large[data-v-534131b3]{font-size:1.5rem}.input.is-fullwidth[data-v-534131b3],.textarea.is-fullwidth[data-v-534131b3]{display:block;width:100%}.input.is-inline[data-v-534131b3],.textarea.is-inline[data-v-534131b3]{display:inline;width:auto}.input.is-rounded[data-v-534131b3]{border-radius:290486px;padding-left:1em;padding-right:1em}.input.is-static[data-v-534131b3]{background-color:transparent;border-color:transparent;box-shadow:none;padding-left:0;padding-right:0}.textarea[data-v-534131b3]{display:block;max-width:100%;min-width:100%;padding:.625em;resize:vertical}.textarea[data-v-534131b3]:not([rows]){max-height:600px;min-height:120px}.textarea[rows][data-v-534131b3]{height:auto}.textarea.has-fixed-size[data-v-534131b3]{resize:none}.checkbox[data-v-534131b3],.radio[data-v-534131b3]{cursor:pointer;display:inline-block;line-height:1.25;position:relative}.checkbox input[data-v-534131b3],.radio input[data-v-534131b3]{cursor:pointer}.checkbox[data-v-534131b3]:hover,.radio[data-v-534131b3]:hover{color:#363636}.checkbox[disabled][data-v-534131b3],.radio[disabled][data-v-534131b3]{color:#7a7a7a;cursor:not-allowed}.radio+.radio[data-v-534131b3]{margin-left:.5em}.select[data-v-534131b3]{display:inline-block;max-width:100%;position:relative;vertical-align:top}.select[data-v-534131b3]:not(.is-multiple){height:2.25em}.select[data-v-534131b3]:not(.is-multiple):not(.is-loading):after{border-color:#3273dc;right:1.125em;z-index:4}.select.is-rounded select[data-v-534131b3]{border-radius:290486px;padding-left:1em}.select select[data-v-534131b3]{background-color:#fff;border-color:#dbdbdb;color:#363636;cursor:pointer;display:block;font-size:1em;max-width:100%;outline:none}.select select[data-v-534131b3]::-moz-placeholder{color:rgba(54,54,54,.3)}.select select[data-v-534131b3]::-webkit-input-placeholder{color:rgba(54,54,54,.3)}.select select[data-v-534131b3]:-moz-placeholder{color:rgba(54,54,54,.3)}.select select[data-v-534131b3]:-ms-input-placeholder{color:rgba(54,54,54,.3)}.select select.is-hovered[data-v-534131b3],.select select[data-v-534131b3]:hover{border-color:#b5b5b5}.select select.is-active[data-v-534131b3],.select select.is-focused[data-v-534131b3],.select select[data-v-534131b3]:active,.select select[data-v-534131b3]:focus{border-color:#3273dc;box-shadow:0 0 0 .125em rgba(50,115,220,.25)}.select select[disabled][data-v-534131b3]{background-color:#f5f5f5;border-color:#f5f5f5;box-shadow:none;color:#7a7a7a}.select select[disabled][data-v-534131b3]::-moz-placeholder{color:hsla(0,0%,48%,.3)}.select select[disabled][data-v-534131b3]::-webkit-input-placeholder{color:hsla(0,0%,48%,.3)}.select select[disabled][data-v-534131b3]:-moz-placeholder{color:hsla(0,0%,48%,.3)}.select select[disabled][data-v-534131b3]:-ms-input-placeholder{color:hsla(0,0%,48%,.3)}.select select[data-v-534131b3]::-ms-expand{display:none}.select select[disabled][data-v-534131b3]:hover{border-color:#f5f5f5}.select select[data-v-534131b3]:not([multiple]){padding-right:2.5em}.select select[multiple][data-v-534131b3]{height:auto;padding:0}.select select[multiple] option[data-v-534131b3]{padding:.5em 1em}.select[data-v-534131b3]:not(.is-multiple):not(.is-loading):hover:after{border-color:#363636}.select.is-white[data-v-534131b3]:not(:hover):after,.select.is-white select[data-v-534131b3]{border-color:#fff}.select.is-white select.is-hovered[data-v-534131b3],.select.is-white select[data-v-534131b3]:hover{border-color:#f2f2f2}.select.is-white select.is-active[data-v-534131b3],.select.is-white select.is-focused[data-v-534131b3],.select.is-white select[data-v-534131b3]:active,.select.is-white select[data-v-534131b3]:focus{box-shadow:0 0 0 .125em hsla(0,0%,100%,.25)}.select.is-black[data-v-534131b3]:not(:hover):after,.select.is-black select[data-v-534131b3]{border-color:#0a0a0a}.select.is-black select.is-hovered[data-v-534131b3],.select.is-black select[data-v-534131b3]:hover{border-color:#000}.select.is-black select.is-active[data-v-534131b3],.select.is-black select.is-focused[data-v-534131b3],.select.is-black select[data-v-534131b3]:active,.select.is-black select[data-v-534131b3]:focus{box-shadow:0 0 0 .125em hsla(0,0%,4%,.25)}.select.is-light[data-v-534131b3]:not(:hover):after,.select.is-light select[data-v-534131b3]{border-color:#f5f5f5}.select.is-light select.is-hovered[data-v-534131b3],.select.is-light select[data-v-534131b3]:hover{border-color:#e8e8e8}.select.is-light select.is-active[data-v-534131b3],.select.is-light select.is-focused[data-v-534131b3],.select.is-light select[data-v-534131b3]:active,.select.is-light select[data-v-534131b3]:focus{box-shadow:0 0 0 .125em hsla(0,0%,96%,.25)}.select.is-dark[data-v-534131b3]:not(:hover):after,.select.is-dark select[data-v-534131b3]{border-color:#363636}.select.is-dark select.is-hovered[data-v-534131b3],.select.is-dark select[data-v-534131b3]:hover{border-color:#292929}.select.is-dark select.is-active[data-v-534131b3],.select.is-dark select.is-focused[data-v-534131b3],.select.is-dark select[data-v-534131b3]:active,.select.is-dark select[data-v-534131b3]:focus{box-shadow:0 0 0 .125em rgba(54,54,54,.25)}.select.is-primary[data-v-534131b3]:not(:hover):after,.select.is-primary select[data-v-534131b3],[data-v-534131b3] .select.deleteAreaBulma:not(:hover):after,[data-v-534131b3] .select.deleteAreaBulma select,[data-v-534131b3] .select.deleteContentBulma:not(:hover):after,[data-v-534131b3] .select.deleteContentBulma select,[data-v-534131b3] .select.tagAreaBulma:not(:hover):after,[data-v-534131b3] .select.tagAreaBulma select{border-color:#00d1b2}.select.is-primary select.is-hovered[data-v-534131b3],.select.is-primary select[data-v-534131b3]:hover,[data-v-534131b3] .select.deleteAreaBulma select.is-hovered,[data-v-534131b3] .select.deleteAreaBulma select:hover,[data-v-534131b3] .select.deleteContentBulma select.is-hovered,[data-v-534131b3] .select.deleteContentBulma select:hover,[data-v-534131b3] .select.tagAreaBulma select.is-hovered,[data-v-534131b3] .select.tagAreaBulma select:hover{border-color:#00b89c}.select.is-primary select.is-active[data-v-534131b3],.select.is-primary select.is-focused[data-v-534131b3],.select.is-primary select[data-v-534131b3]:active,.select.is-primary select[data-v-534131b3]:focus,[data-v-534131b3] .select.deleteAreaBulma select.is-active,[data-v-534131b3] .select.deleteAreaBulma select.is-focused,[data-v-534131b3] .select.deleteAreaBulma select:active,[data-v-534131b3] .select.deleteAreaBulma select:focus,[data-v-534131b3] .select.deleteContentBulma select.is-active,[data-v-534131b3] .select.deleteContentBulma select.is-focused,[data-v-534131b3] .select.deleteContentBulma select:active,[data-v-534131b3] .select.deleteContentBulma select:focus,[data-v-534131b3] .select.tagAreaBulma select.is-active,[data-v-534131b3] .select.tagAreaBulma select.is-focused,[data-v-534131b3] .select.tagAreaBulma select:active,[data-v-534131b3] .select.tagAreaBulma select:focus{box-shadow:0 0 0 .125em rgba(0,209,178,.25)}.select.is-link[data-v-534131b3]:not(:hover):after,.select.is-link select[data-v-534131b3]{border-color:#3273dc}.select.is-link select.is-hovered[data-v-534131b3],.select.is-link select[data-v-534131b3]:hover{border-color:#2366d1}.select.is-link select.is-active[data-v-534131b3],.select.is-link select.is-focused[data-v-534131b3],.select.is-link select[data-v-534131b3]:active,.select.is-link select[data-v-534131b3]:focus{box-shadow:0 0 0 .125em rgba(50,115,220,.25)}.select.is-info[data-v-534131b3]:not(:hover):after,.select.is-info select[data-v-534131b3]{border-color:#209cee}.select.is-info select.is-hovered[data-v-534131b3],.select.is-info select[data-v-534131b3]:hover{border-color:#118fe4}.select.is-info select.is-active[data-v-534131b3],.select.is-info select.is-focused[data-v-534131b3],.select.is-info select[data-v-534131b3]:active,.select.is-info select[data-v-534131b3]:focus{box-shadow:0 0 0 .125em rgba(32,156,238,.25)}.select.is-success[data-v-534131b3]:not(:hover):after,.select.is-success select[data-v-534131b3]{border-color:#23d160}.select.is-success select.is-hovered[data-v-534131b3],.select.is-success select[data-v-534131b3]:hover{border-color:#20bc56}.select.is-success select.is-active[data-v-534131b3],.select.is-success select.is-focused[data-v-534131b3],.select.is-success select[data-v-534131b3]:active,.select.is-success select[data-v-534131b3]:focus{box-shadow:0 0 0 .125em rgba(35,209,96,.25)}.select.is-warning[data-v-534131b3]:not(:hover):after,.select.is-warning select[data-v-534131b3]{border-color:#ffdd57}.select.is-warning select.is-hovered[data-v-534131b3],.select.is-warning select[data-v-534131b3]:hover{border-color:#ffd83d}.select.is-warning select.is-active[data-v-534131b3],.select.is-warning select.is-focused[data-v-534131b3],.select.is-warning select[data-v-534131b3]:active,.select.is-warning select[data-v-534131b3]:focus{box-shadow:0 0 0 .125em rgba(255,221,87,.25)}.select.is-danger[data-v-534131b3]:not(:hover):after,.select.is-danger select[data-v-534131b3]{border-color:#ff3860}.select.is-danger select.is-hovered[data-v-534131b3],.select.is-danger select[data-v-534131b3]:hover{border-color:#ff1f4b}.select.is-danger select.is-active[data-v-534131b3],.select.is-danger select.is-focused[data-v-534131b3],.select.is-danger select[data-v-534131b3]:active,.select.is-danger select[data-v-534131b3]:focus{box-shadow:0 0 0 .125em rgba(255,56,96,.25)}.select.is-small[data-v-534131b3]{border-radius:2px;font-size:.75rem}.select.is-medium[data-v-534131b3]{font-size:1.25rem}.select.is-large[data-v-534131b3]{font-size:1.5rem}.select.is-disabled[data-v-534131b3]:after{border-color:#7a7a7a}.select.is-fullwidth[data-v-534131b3],.select.is-fullwidth select[data-v-534131b3]{width:100%}.select.is-loading[data-v-534131b3]:after{margin-top:0;position:absolute;right:.625em;top:.625em;transform:none}.select.is-loading.is-small[data-v-534131b3]:after{font-size:.75rem}.select.is-loading.is-medium[data-v-534131b3]:after{font-size:1.25rem}.select.is-loading.is-large[data-v-534131b3]:after{font-size:1.5rem}.file[data-v-534131b3]{align-items:stretch;display:flex;justify-content:flex-start;position:relative}.file.is-white .file-cta[data-v-534131b3]{background-color:#fff;border-color:transparent;color:#0a0a0a}.file.is-white.is-hovered .file-cta[data-v-534131b3],.file.is-white:hover .file-cta[data-v-534131b3]{background-color:#f9f9f9;border-color:transparent;color:#0a0a0a}.file.is-white.is-focused .file-cta[data-v-534131b3],.file.is-white:focus .file-cta[data-v-534131b3]{border-color:transparent;box-shadow:0 0 .5em hsla(0,0%,100%,.25);color:#0a0a0a}.file.is-white.is-active .file-cta[data-v-534131b3],.file.is-white:active .file-cta[data-v-534131b3]{background-color:#f2f2f2;border-color:transparent;color:#0a0a0a}.file.is-black .file-cta[data-v-534131b3]{background-color:#0a0a0a;border-color:transparent;color:#fff}.file.is-black.is-hovered .file-cta[data-v-534131b3],.file.is-black:hover .file-cta[data-v-534131b3]{background-color:#040404;border-color:transparent;color:#fff}.file.is-black.is-focused .file-cta[data-v-534131b3],.file.is-black:focus .file-cta[data-v-534131b3]{border-color:transparent;box-shadow:0 0 .5em hsla(0,0%,4%,.25);color:#fff}.file.is-black.is-active .file-cta[data-v-534131b3],.file.is-black:active .file-cta[data-v-534131b3]{background-color:#000;border-color:transparent;color:#fff}.file.is-light .file-cta[data-v-534131b3]{background-color:#f5f5f5;border-color:transparent;color:#363636}.file.is-light.is-hovered .file-cta[data-v-534131b3],.file.is-light:hover .file-cta[data-v-534131b3]{background-color:#eee;border-color:transparent;color:#363636}.file.is-light.is-focused .file-cta[data-v-534131b3],.file.is-light:focus .file-cta[data-v-534131b3]{border-color:transparent;box-shadow:0 0 .5em hsla(0,0%,96%,.25);color:#363636}.file.is-light.is-active .file-cta[data-v-534131b3],.file.is-light:active .file-cta[data-v-534131b3]{background-color:#e8e8e8;border-color:transparent;color:#363636}.file.is-dark .file-cta[data-v-534131b3]{background-color:#363636;border-color:transparent;color:#f5f5f5}.file.is-dark.is-hovered .file-cta[data-v-534131b3],.file.is-dark:hover .file-cta[data-v-534131b3]{background-color:#2f2f2f;border-color:transparent;color:#f5f5f5}.file.is-dark.is-focused .file-cta[data-v-534131b3],.file.is-dark:focus .file-cta[data-v-534131b3]{border-color:transparent;box-shadow:0 0 .5em rgba(54,54,54,.25);color:#f5f5f5}.file.is-dark.is-active .file-cta[data-v-534131b3],.file.is-dark:active .file-cta[data-v-534131b3]{background-color:#292929;border-color:transparent;color:#f5f5f5}.file.is-primary .file-cta[data-v-534131b3],[data-v-534131b3] .file.deleteAreaBulma .file-cta,[data-v-534131b3] .file.deleteContentBulma .file-cta,[data-v-534131b3] .file.tagAreaBulma .file-cta{background-color:#00d1b2;border-color:transparent;color:#fff}.file.is-primary.is-hovered .file-cta[data-v-534131b3],.file.is-primary:hover .file-cta[data-v-534131b3],[data-v-534131b3] .file.deleteAreaBulma:hover .file-cta,[data-v-534131b3] .file.deleteContentBulma:hover .file-cta,[data-v-534131b3] .file.is-hovered.deleteAreaBulma .file-cta,[data-v-534131b3] .file.is-hovered.deleteContentBulma .file-cta,[data-v-534131b3] .file.is-hovered.tagAreaBulma .file-cta,[data-v-534131b3] .file.tagAreaBulma:hover .file-cta{background-color:#00c4a7;border-color:transparent;color:#fff}.file.is-primary.is-focused .file-cta[data-v-534131b3],.file.is-primary:focus .file-cta[data-v-534131b3],[data-v-534131b3] .file.deleteAreaBulma:focus .file-cta,[data-v-534131b3] .file.deleteContentBulma:focus .file-cta,[data-v-534131b3] .file.is-focused.deleteAreaBulma .file-cta,[data-v-534131b3] .file.is-focused.deleteContentBulma .file-cta,[data-v-534131b3] .file.is-focused.tagAreaBulma .file-cta,[data-v-534131b3] .file.tagAreaBulma:focus .file-cta{border-color:transparent;box-shadow:0 0 .5em rgba(0,209,178,.25);color:#fff}.file.is-primary.is-active .file-cta[data-v-534131b3],.file.is-primary:active .file-cta[data-v-534131b3],[data-v-534131b3] .file.deleteAreaBulma:active .file-cta,[data-v-534131b3] .file.deleteContentBulma:active .file-cta,[data-v-534131b3] .file.is-active.deleteAreaBulma .file-cta,[data-v-534131b3] .file.is-active.deleteContentBulma .file-cta,[data-v-534131b3] .file.is-active.tagAreaBulma .file-cta,[data-v-534131b3] .file.tagAreaBulma:active .file-cta{background-color:#00b89c;border-color:transparent;color:#fff}.file.is-link .file-cta[data-v-534131b3]{background-color:#3273dc;border-color:transparent;color:#fff}.file.is-link.is-hovered .file-cta[data-v-534131b3],.file.is-link:hover .file-cta[data-v-534131b3]{background-color:#276cda;border-color:transparent;color:#fff}.file.is-link.is-focused .file-cta[data-v-534131b3],.file.is-link:focus .file-cta[data-v-534131b3]{border-color:transparent;box-shadow:0 0 .5em rgba(50,115,220,.25);color:#fff}.file.is-link.is-active .file-cta[data-v-534131b3],.file.is-link:active .file-cta[data-v-534131b3]{background-color:#2366d1;border-color:transparent;color:#fff}.file.is-info .file-cta[data-v-534131b3]{background-color:#209cee;border-color:transparent;color:#fff}.file.is-info.is-hovered .file-cta[data-v-534131b3],.file.is-info:hover .file-cta[data-v-534131b3]{background-color:#1496ed;border-color:transparent;color:#fff}.file.is-info.is-focused .file-cta[data-v-534131b3],.file.is-info:focus .file-cta[data-v-534131b3]{border-color:transparent;box-shadow:0 0 .5em rgba(32,156,238,.25);color:#fff}.file.is-info.is-active .file-cta[data-v-534131b3],.file.is-info:active .file-cta[data-v-534131b3]{background-color:#118fe4;border-color:transparent;color:#fff}.file.is-success .file-cta[data-v-534131b3]{background-color:#23d160;border-color:transparent;color:#fff}.file.is-success.is-hovered .file-cta[data-v-534131b3],.file.is-success:hover .file-cta[data-v-534131b3]{background-color:#22c65b;border-color:transparent;color:#fff}.file.is-success.is-focused .file-cta[data-v-534131b3],.file.is-success:focus .file-cta[data-v-534131b3]{border-color:transparent;box-shadow:0 0 .5em rgba(35,209,96,.25);color:#fff}.file.is-success.is-active .file-cta[data-v-534131b3],.file.is-success:active .file-cta[data-v-534131b3]{background-color:#20bc56;border-color:transparent;color:#fff}.file.is-warning .file-cta[data-v-534131b3]{background-color:#ffdd57;border-color:transparent;color:rgba(0,0,0,.7)}.file.is-warning.is-hovered .file-cta[data-v-534131b3],.file.is-warning:hover .file-cta[data-v-534131b3]{background-color:#ffdb4a;border-color:transparent;color:rgba(0,0,0,.7)}.file.is-warning.is-focused .file-cta[data-v-534131b3],.file.is-warning:focus .file-cta[data-v-534131b3]{border-color:transparent;box-shadow:0 0 .5em rgba(255,221,87,.25);color:rgba(0,0,0,.7)}.file.is-warning.is-active .file-cta[data-v-534131b3],.file.is-warning:active .file-cta[data-v-534131b3]{background-color:#ffd83d;border-color:transparent;color:rgba(0,0,0,.7)}.file.is-danger .file-cta[data-v-534131b3]{background-color:#ff3860;border-color:transparent;color:#fff}.file.is-danger.is-hovered .file-cta[data-v-534131b3],.file.is-danger:hover .file-cta[data-v-534131b3]{background-color:#ff2b56;border-color:transparent;color:#fff}.file.is-danger.is-focused .file-cta[data-v-534131b3],.file.is-danger:focus .file-cta[data-v-534131b3]{border-color:transparent;box-shadow:0 0 .5em rgba(255,56,96,.25);color:#fff}.file.is-danger.is-active .file-cta[data-v-534131b3],.file.is-danger:active .file-cta[data-v-534131b3]{background-color:#ff1f4b;border-color:transparent;color:#fff}.file.is-small[data-v-534131b3]{font-size:.75rem}.file.is-medium[data-v-534131b3]{font-size:1.25rem}.file.is-medium .file-icon .fa[data-v-534131b3]{font-size:21px}.file.is-large[data-v-534131b3]{font-size:1.5rem}.file.is-large .file-icon .fa[data-v-534131b3]{font-size:28px}.file.has-name .file-cta[data-v-534131b3]{border-bottom-right-radius:0;border-top-right-radius:0}.file.has-name .file-name[data-v-534131b3]{border-bottom-left-radius:0;border-top-left-radius:0}.file.has-name.is-empty .file-cta[data-v-534131b3]{border-radius:4px}.file.has-name.is-empty .file-name[data-v-534131b3]{display:none}.file.is-boxed .file-label[data-v-534131b3]{flex-direction:column}.file.is-boxed .file-cta[data-v-534131b3]{flex-direction:column;height:auto;padding:1em 3em}.file.is-boxed .file-name[data-v-534131b3]{border-width:0 1px 1px}.file.is-boxed .file-icon[data-v-534131b3]{height:1.5em;width:1.5em}.file.is-boxed .file-icon .fa[data-v-534131b3]{font-size:21px}.file.is-boxed.is-small .file-icon .fa[data-v-534131b3]{font-size:14px}.file.is-boxed.is-medium .file-icon .fa[data-v-534131b3]{font-size:28px}.file.is-boxed.is-large .file-icon .fa[data-v-534131b3]{font-size:35px}.file.is-boxed.has-name .file-cta[data-v-534131b3]{border-radius:4px 4px 0 0}.file.is-boxed.has-name .file-name[data-v-534131b3]{border-radius:0 0 4px 4px;border-width:0 1px 1px}.file.is-centered[data-v-534131b3]{justify-content:center}.file.is-fullwidth .file-label[data-v-534131b3]{width:100%}.file.is-fullwidth .file-name[data-v-534131b3]{flex-grow:1;max-width:none}.file.is-right[data-v-534131b3]{justify-content:flex-end}.file.is-right .file-cta[data-v-534131b3]{border-radius:0 4px 4px 0}.file.is-right .file-name[data-v-534131b3]{border-radius:4px 0 0 4px;border-width:1px 0 1px 1px;order:-1}.file-label[data-v-534131b3]{align-items:stretch;display:flex;cursor:pointer;justify-content:flex-start;overflow:hidden;position:relative}.file-label:hover .file-cta[data-v-534131b3]{background-color:#eee;color:#363636}.file-label:hover .file-name[data-v-534131b3]{border-color:#d5d5d5}.file-label:active .file-cta[data-v-534131b3]{background-color:#e8e8e8;color:#363636}.file-label:active .file-name[data-v-534131b3]{border-color:#cfcfcf}.file-input[data-v-534131b3]{height:100%;left:0;opacity:0;outline:none;position:absolute;top:0;width:100%}.file-cta[data-v-534131b3],.file-name[data-v-534131b3]{border-color:#dbdbdb;border-radius:4px;font-size:1em;padding-left:1em;padding-right:1em;white-space:nowrap}.file-cta[data-v-534131b3]{background-color:#f5f5f5;color:#4a4a4a}.file-name[data-v-534131b3]{border-color:#dbdbdb;border-style:solid;border-width:1px 1px 1px 0;display:block;max-width:16em;overflow:hidden;text-align:left;text-overflow:ellipsis}.file-icon[data-v-534131b3]{align-items:center;display:flex;height:1em;justify-content:center;margin-right:.5em;width:1em}.file-icon .fa[data-v-534131b3]{font-size:14px}.label[data-v-534131b3]{color:#363636;display:block;font-size:1rem;font-weight:700}.label[data-v-534131b3]:not(:last-child){margin-bottom:.5em}.label.is-small[data-v-534131b3]{font-size:.75rem}.label.is-medium[data-v-534131b3]{font-size:1.25rem}.label.is-large[data-v-534131b3]{font-size:1.5rem}.help[data-v-534131b3]{display:block;font-size:.75rem;margin-top:.25rem}.help.is-white[data-v-534131b3]{color:#fff}.help.is-black[data-v-534131b3]{color:#0a0a0a}.help.is-light[data-v-534131b3]{color:#f5f5f5}.help.is-dark[data-v-534131b3]{color:#363636}.help.is-primary[data-v-534131b3],[data-v-534131b3] .help.deleteAreaBulma,[data-v-534131b3] .help.deleteContentBulma,[data-v-534131b3] .help.tagAreaBulma{color:#00d1b2}.help.is-link[data-v-534131b3]{color:#3273dc}.help.is-info[data-v-534131b3]{color:#209cee}.help.is-success[data-v-534131b3]{color:#23d160}.help.is-warning[data-v-534131b3]{color:#ffdd57}.help.is-danger[data-v-534131b3]{color:#ff3860}.field[data-v-534131b3]:not(:last-child){margin-bottom:.75rem}.field.has-addons[data-v-534131b3]{display:flex;justify-content:flex-start}.field.has-addons .control[data-v-534131b3]:not(:last-child){margin-right:-1px}.field.has-addons .control:not(:first-child):not(:last-child) .button[data-v-534131b3],.field.has-addons .control:not(:first-child):not(:last-child) .input[data-v-534131b3],.field.has-addons .control:not(:first-child):not(:last-child) .select select[data-v-534131b3]{border-radius:0}.field.has-addons .control:first-child .button[data-v-534131b3],.field.has-addons .control:first-child .input[data-v-534131b3],.field.has-addons .control:first-child .select select[data-v-534131b3]{border-bottom-right-radius:0;border-top-right-radius:0}.field.has-addons .control:last-child .button[data-v-534131b3],.field.has-addons .control:last-child .input[data-v-534131b3],.field.has-addons .control:last-child .select select[data-v-534131b3]{border-bottom-left-radius:0;border-top-left-radius:0}.field.has-addons .control .button:not([disabled]).is-hovered[data-v-534131b3],.field.has-addons .control .button[data-v-534131b3]:not([disabled]):hover,.field.has-addons .control .input:not([disabled]).is-hovered[data-v-534131b3],.field.has-addons .control .input[data-v-534131b3]:not([disabled]):hover,.field.has-addons .control .select select:not([disabled]).is-hovered[data-v-534131b3],.field.has-addons .control .select select[data-v-534131b3]:not([disabled]):hover{z-index:2}.field.has-addons .control .button:not([disabled]).is-active[data-v-534131b3],.field.has-addons .control .button:not([disabled]).is-focused[data-v-534131b3],.field.has-addons .control .button[data-v-534131b3]:not([disabled]):active,.field.has-addons .control .button[data-v-534131b3]:not([disabled]):focus,.field.has-addons .control .input:not([disabled]).is-active[data-v-534131b3],.field.has-addons .control .input:not([disabled]).is-focused[data-v-534131b3],.field.has-addons .control .input[data-v-534131b3]:not([disabled]):active,.field.has-addons .control .input[data-v-534131b3]:not([disabled]):focus,.field.has-addons .control .select select:not([disabled]).is-active[data-v-534131b3],.field.has-addons .control .select select:not([disabled]).is-focused[data-v-534131b3],.field.has-addons .control .select select[data-v-534131b3]:not([disabled]):active,.field.has-addons .control .select select[data-v-534131b3]:not([disabled]):focus{z-index:3}.field.has-addons .control .button:not([disabled]).is-active[data-v-534131b3]:hover,.field.has-addons .control .button:not([disabled]).is-focused[data-v-534131b3]:hover,.field.has-addons .control .button[data-v-534131b3]:not([disabled]):active:hover,.field.has-addons .control .button[data-v-534131b3]:not([disabled]):focus:hover,.field.has-addons .control .input:not([disabled]).is-active[data-v-534131b3]:hover,.field.has-addons .control .input:not([disabled]).is-focused[data-v-534131b3]:hover,.field.has-addons .control .input[data-v-534131b3]:not([disabled]):active:hover,.field.has-addons .control .input[data-v-534131b3]:not([disabled]):focus:hover,.field.has-addons .control .select select:not([disabled]).is-active[data-v-534131b3]:hover,.field.has-addons .control .select select:not([disabled]).is-focused[data-v-534131b3]:hover,.field.has-addons .control .select select[data-v-534131b3]:not([disabled]):active:hover,.field.has-addons .control .select select[data-v-534131b3]:not([disabled]):focus:hover{z-index:4}.field.has-addons .control.is-expanded[data-v-534131b3]{flex-grow:1}.field.has-addons.has-addons-centered[data-v-534131b3]{justify-content:center}.field.has-addons.has-addons-right[data-v-534131b3]{justify-content:flex-end}.field.has-addons.has-addons-fullwidth .control[data-v-534131b3]{flex-grow:1;flex-shrink:0}.field.is-grouped[data-v-534131b3]{display:flex;justify-content:flex-start}.field.is-grouped>.control[data-v-534131b3]{flex-shrink:0}.field.is-grouped>.control[data-v-534131b3]:not(:last-child){margin-bottom:0;margin-right:.75rem}.field.is-grouped>.control.is-expanded[data-v-534131b3]{flex-grow:1;flex-shrink:1}.field.is-grouped.is-grouped-centered[data-v-534131b3]{justify-content:center}.field.is-grouped.is-grouped-right[data-v-534131b3]{justify-content:flex-end}.field.is-grouped.is-grouped-multiline[data-v-534131b3]{flex-wrap:wrap}.field.is-grouped.is-grouped-multiline>.control[data-v-534131b3]:last-child,.field.is-grouped.is-grouped-multiline>.control[data-v-534131b3]:not(:last-child){margin-bottom:.75rem}.field.is-grouped.is-grouped-multiline[data-v-534131b3]:last-child{margin-bottom:-.75rem}.field.is-grouped.is-grouped-multiline[data-v-534131b3]:not(:last-child){margin-bottom:0}@media print,screen and (min-width:769px){.field.is-horizontal[data-v-534131b3]{display:flex}}.field-label .label[data-v-534131b3]{font-size:inherit}@media screen and (max-width:768px){.field-label[data-v-534131b3]{margin-bottom:.5rem}}@media print,screen and (min-width:769px){.field-label[data-v-534131b3]{flex-basis:0;flex-grow:1;flex-shrink:0;margin-right:1.5rem;text-align:right}.field-label.is-small[data-v-534131b3]{font-size:.75rem;padding-top:.375em}.field-label.is-normal[data-v-534131b3]{padding-top:.375em}.field-label.is-medium[data-v-534131b3]{font-size:1.25rem;padding-top:.375em}.field-label.is-large[data-v-534131b3]{font-size:1.5rem;padding-top:.375em}}.field-body .field .field[data-v-534131b3]{margin-bottom:0}@media print,screen and (min-width:769px){.field-body[data-v-534131b3]{display:flex;flex-basis:0;flex-grow:5;flex-shrink:1}.field-body .field[data-v-534131b3]{margin-bottom:0}.field-body>.field[data-v-534131b3]{flex-shrink:1}.field-body>.field[data-v-534131b3]:not(.is-narrow){flex-grow:1}.field-body>.field[data-v-534131b3]:not(:last-child){margin-right:.75rem}}.control[data-v-534131b3]{clear:both;font-size:1rem;position:relative;text-align:left}.control.has-icon .icon[data-v-534131b3]{color:#dbdbdb;height:2.25em;pointer-events:none;position:absolute;top:0;width:2.25em;z-index:4}.control.has-icon .input:focus+.icon[data-v-534131b3]{color:#7a7a7a}.control.has-icon .input.is-small+.icon[data-v-534131b3]{font-size:.75rem}.control.has-icon .input.is-medium+.icon[data-v-534131b3]{font-size:1.25rem}.control.has-icon .input.is-large+.icon[data-v-534131b3]{font-size:1.5rem}.control.has-icon:not(.has-icon-right) .icon[data-v-534131b3]{left:0}.control.has-icon:not(.has-icon-right) .input[data-v-534131b3]{padding-left:2.25em}.control.has-icon.has-icon-right .icon[data-v-534131b3]{right:0}.control.has-icon.has-icon-right .input[data-v-534131b3]{padding-right:2.25em}.control.has-icons-left .input:focus~.icon[data-v-534131b3],.control.has-icons-left .select:focus~.icon[data-v-534131b3],.control.has-icons-right .input:focus~.icon[data-v-534131b3],.control.has-icons-right .select:focus~.icon[data-v-534131b3]{color:#7a7a7a}.control.has-icons-left .input.is-small~.icon[data-v-534131b3],.control.has-icons-left .select.is-small~.icon[data-v-534131b3],.control.has-icons-right .input.is-small~.icon[data-v-534131b3],.control.has-icons-right .select.is-small~.icon[data-v-534131b3]{font-size:.75rem}.control.has-icons-left .input.is-medium~.icon[data-v-534131b3],.control.has-icons-left .select.is-medium~.icon[data-v-534131b3],.control.has-icons-right .input.is-medium~.icon[data-v-534131b3],.control.has-icons-right .select.is-medium~.icon[data-v-534131b3]{font-size:1.25rem}.control.has-icons-left .input.is-large~.icon[data-v-534131b3],.control.has-icons-left .select.is-large~.icon[data-v-534131b3],.control.has-icons-right .input.is-large~.icon[data-v-534131b3],.control.has-icons-right .select.is-large~.icon[data-v-534131b3]{font-size:1.5rem}.control.has-icons-left .icon[data-v-534131b3],.control.has-icons-right .icon[data-v-534131b3]{color:#dbdbdb;height:2.25em;pointer-events:none;position:absolute;top:0;width:2.25em;z-index:4}.control.has-icons-left .input[data-v-534131b3],.control.has-icons-left .select select[data-v-534131b3]{padding-left:2.25em}.control.has-icons-left .icon.is-left[data-v-534131b3]{left:0}.control.has-icons-right .input[data-v-534131b3],.control.has-icons-right .select select[data-v-534131b3]{padding-right:2.25em}.control.has-icons-right .icon.is-right[data-v-534131b3]{right:0}.control.is-loading[data-v-534131b3]:after{position:absolute!important;right:.625em;top:.625em;z-index:4}.control.is-loading.is-small[data-v-534131b3]:after{font-size:.75rem}.control.is-loading.is-medium[data-v-534131b3]:after{font-size:1.25rem}.control.is-loading.is-large[data-v-534131b3]:after{font-size:1.5rem}.icon[data-v-534131b3]{align-items:center;display:inline-flex;justify-content:center;height:1.5rem;width:1.5rem}.icon.is-small[data-v-534131b3]{height:1rem;width:1rem}.icon.is-medium[data-v-534131b3]{height:2rem;width:2rem}.icon.is-large[data-v-534131b3]{height:3rem;width:3rem}.image[data-v-534131b3]{display:block;position:relative}.image img[data-v-534131b3]{display:block;height:auto;width:100%}.image img.is-rounded[data-v-534131b3]{border-radius:290486px}.image.is-1by1 img[data-v-534131b3],.image.is-1by2 img[data-v-534131b3],.image.is-1by3 img[data-v-534131b3],.image.is-2by1 img[data-v-534131b3],.image.is-2by3 img[data-v-534131b3],.image.is-3by1 img[data-v-534131b3],.image.is-3by2 img[data-v-534131b3],.image.is-3by4 img[data-v-534131b3],.image.is-3by5 img[data-v-534131b3],.image.is-4by3 img[data-v-534131b3],.image.is-4by5 img[data-v-534131b3],.image.is-5by3 img[data-v-534131b3],.image.is-5by4 img[data-v-534131b3],.image.is-9by16 img[data-v-534131b3],.image.is-16by9 img[data-v-534131b3],.image.is-square img[data-v-534131b3]{height:100%;width:100%}.image.is-1by1[data-v-534131b3],.image.is-square[data-v-534131b3]{padding-top:100%}.image.is-5by4[data-v-534131b3]{padding-top:80%}.image.is-4by3[data-v-534131b3]{padding-top:75%}.image.is-3by2[data-v-534131b3]{padding-top:66.6666%}.image.is-5by3[data-v-534131b3]{padding-top:60%}.image.is-16by9[data-v-534131b3]{padding-top:56.25%}.image.is-2by1[data-v-534131b3]{padding-top:50%}.image.is-3by1[data-v-534131b3]{padding-top:33.3333%}.image.is-4by5[data-v-534131b3]{padding-top:125%}.image.is-3by4[data-v-534131b3]{padding-top:133.3333%}.image.is-2by3[data-v-534131b3]{padding-top:150%}.image.is-3by5[data-v-534131b3]{padding-top:166.6666%}.image.is-9by16[data-v-534131b3]{padding-top:177.7777%}.image.is-1by2[data-v-534131b3]{padding-top:200%}.image.is-1by3[data-v-534131b3]{padding-top:300%}.image.is-16x16[data-v-534131b3]{height:16px;width:16px}.image.is-24x24[data-v-534131b3]{height:24px;width:24px}.image.is-32x32[data-v-534131b3]{height:32px;width:32px}.image.is-48x48[data-v-534131b3]{height:48px;width:48px}.image.is-64x64[data-v-534131b3]{height:64px;width:64px}.image.is-96x96[data-v-534131b3]{height:96px;width:96px}.image.is-128x128[data-v-534131b3]{height:128px;width:128px}.notification[data-v-534131b3]{background-color:#f5f5f5;border-radius:4px;padding:1.25rem 2.5rem 1.25rem 1.5rem;position:relative}.notification a[data-v-534131b3]:not(.button):not(.dropdown-item){color:currentColor;text-decoration:underline}.notification strong[data-v-534131b3]{color:currentColor}.notification code[data-v-534131b3],.notification pre[data-v-534131b3]{background:#fff}.notification pre code[data-v-534131b3]{background:transparent}.notification>.delete[data-v-534131b3]{position:absolute;right:.5rem;top:.5rem}.notification .content[data-v-534131b3],.notification .subtitle[data-v-534131b3],.notification .title[data-v-534131b3]{color:currentColor}.notification.is-white[data-v-534131b3]{background-color:#fff;color:#0a0a0a}.notification.is-black[data-v-534131b3]{background-color:#0a0a0a;color:#fff}.notification.is-light[data-v-534131b3]{background-color:#f5f5f5;color:#363636}.notification.is-dark[data-v-534131b3]{background-color:#363636;color:#f5f5f5}.notification.is-primary[data-v-534131b3],[data-v-534131b3] .notification.deleteAreaBulma,[data-v-534131b3] .notification.deleteContentBulma,[data-v-534131b3] .notification.tagAreaBulma{background-color:#00d1b2;color:#fff}.notification.is-link[data-v-534131b3]{background-color:#3273dc;color:#fff}.notification.is-info[data-v-534131b3]{background-color:#209cee;color:#fff}.notification.is-success[data-v-534131b3]{background-color:#23d160;color:#fff}.notification.is-warning[data-v-534131b3]{background-color:#ffdd57;color:rgba(0,0,0,.7)}.notification.is-danger[data-v-534131b3]{background-color:#ff3860;color:#fff}.progress[data-v-534131b3]{-moz-appearance:none;-webkit-appearance:none;border:none;border-radius:290486px;display:block;height:1rem;overflow:hidden;padding:0;width:100%}.progress[data-v-534131b3]::-webkit-progress-bar{background-color:#dbdbdb}.progress[data-v-534131b3]::-webkit-progress-value{background-color:#4a4a4a}.progress[data-v-534131b3]::-moz-progress-bar{background-color:#4a4a4a}.progress[data-v-534131b3]::-ms-fill{background-color:#4a4a4a;border:none}.progress.is-white[data-v-534131b3]::-webkit-progress-value{background-color:#fff}.progress.is-white[data-v-534131b3]::-moz-progress-bar{background-color:#fff}.progress.is-white[data-v-534131b3]::-ms-fill{background-color:#fff}.progress.is-black[data-v-534131b3]::-webkit-progress-value{background-color:#0a0a0a}.progress.is-black[data-v-534131b3]::-moz-progress-bar{background-color:#0a0a0a}.progress.is-black[data-v-534131b3]::-ms-fill{background-color:#0a0a0a}.progress.is-light[data-v-534131b3]::-webkit-progress-value{background-color:#f5f5f5}.progress.is-light[data-v-534131b3]::-moz-progress-bar{background-color:#f5f5f5}.progress.is-light[data-v-534131b3]::-ms-fill{background-color:#f5f5f5}.progress.is-dark[data-v-534131b3]::-webkit-progress-value{background-color:#363636}.progress.is-dark[data-v-534131b3]::-moz-progress-bar{background-color:#363636}.progress.is-dark[data-v-534131b3]::-ms-fill{background-color:#363636}.progress.is-primary[data-v-534131b3]::-webkit-progress-value,[data-v-534131b3] .progress.deleteAreaBulma::-webkit-progress-value,[data-v-534131b3] .progress.deleteContentBulma::-webkit-progress-value,[data-v-534131b3] .progress.tagAreaBulma::-webkit-progress-value{background-color:#00d1b2}.progress.is-primary[data-v-534131b3]::-moz-progress-bar,[data-v-534131b3] .progress.deleteAreaBulma::-moz-progress-bar,[data-v-534131b3] .progress.deleteContentBulma::-moz-progress-bar,[data-v-534131b3] .progress.tagAreaBulma::-moz-progress-bar{background-color:#00d1b2}.progress.is-primary[data-v-534131b3]::-ms-fill,[data-v-534131b3] .progress.deleteAreaBulma::-ms-fill,[data-v-534131b3] .progress.deleteContentBulma::-ms-fill,[data-v-534131b3] .progress.tagAreaBulma::-ms-fill{background-color:#00d1b2}.progress.is-link[data-v-534131b3]::-webkit-progress-value{background-color:#3273dc}.progress.is-link[data-v-534131b3]::-moz-progress-bar{background-color:#3273dc}.progress.is-link[data-v-534131b3]::-ms-fill{background-color:#3273dc}.progress.is-info[data-v-534131b3]::-webkit-progress-value{background-color:#209cee}.progress.is-info[data-v-534131b3]::-moz-progress-bar{background-color:#209cee}.progress.is-info[data-v-534131b3]::-ms-fill{background-color:#209cee}.progress.is-success[data-v-534131b3]::-webkit-progress-value{background-color:#23d160}.progress.is-success[data-v-534131b3]::-moz-progress-bar{background-color:#23d160}.progress.is-success[data-v-534131b3]::-ms-fill{background-color:#23d160}.progress.is-warning[data-v-534131b3]::-webkit-progress-value{background-color:#ffdd57}.progress.is-warning[data-v-534131b3]::-moz-progress-bar{background-color:#ffdd57}.progress.is-warning[data-v-534131b3]::-ms-fill{background-color:#ffdd57}.progress.is-danger[data-v-534131b3]::-webkit-progress-value{background-color:#ff3860}.progress.is-danger[data-v-534131b3]::-moz-progress-bar{background-color:#ff3860}.progress.is-danger[data-v-534131b3]::-ms-fill{background-color:#ff3860}.progress.is-small[data-v-534131b3]{height:.75rem}.progress.is-medium[data-v-534131b3]{height:1.25rem}.progress.is-large[data-v-534131b3]{height:1.5rem}.table[data-v-534131b3]{background-color:#fff;color:#363636}.table td[data-v-534131b3],.table th[data-v-534131b3]{border:1px solid #dbdbdb;border-width:0 0 1px;padding:.5em .75em;vertical-align:top}.table td.is-white[data-v-534131b3],.table th.is-white[data-v-534131b3]{background-color:#fff;border-color:#fff;color:#0a0a0a}.table td.is-black[data-v-534131b3],.table th.is-black[data-v-534131b3]{background-color:#0a0a0a;border-color:#0a0a0a;color:#fff}.table td.is-light[data-v-534131b3],.table th.is-light[data-v-534131b3]{background-color:#f5f5f5;border-color:#f5f5f5;color:#363636}.table td.is-dark[data-v-534131b3],.table th.is-dark[data-v-534131b3]{background-color:#363636;border-color:#363636;color:#f5f5f5}.table[data-v-534131b3] td.deleteAreaBulma,.table[data-v-534131b3] td.deleteContentBulma,.table[data-v-534131b3] td.tagAreaBulma,.table[data-v-534131b3] th.deleteAreaBulma,.table[data-v-534131b3] th.deleteContentBulma,.table[data-v-534131b3] th.tagAreaBulma,.table td.is-primary[data-v-534131b3],.table th.is-primary[data-v-534131b3],[data-v-534131b3] .table td.deleteAreaBulma,[data-v-534131b3] .table td.deleteContentBulma,[data-v-534131b3] .table td.tagAreaBulma,[data-v-534131b3] .table th.deleteAreaBulma,[data-v-534131b3] .table th.deleteContentBulma,[data-v-534131b3] .table th.tagAreaBulma{background-color:#00d1b2;border-color:#00d1b2;color:#fff}.table td.is-link[data-v-534131b3],.table th.is-link[data-v-534131b3]{background-color:#3273dc;border-color:#3273dc;color:#fff}.table td.is-info[data-v-534131b3],.table th.is-info[data-v-534131b3]{background-color:#209cee;border-color:#209cee;color:#fff}.table td.is-success[data-v-534131b3],.table th.is-success[data-v-534131b3]{background-color:#23d160;border-color:#23d160;color:#fff}.table td.is-warning[data-v-534131b3],.table th.is-warning[data-v-534131b3]{background-color:#ffdd57;border-color:#ffdd57;color:rgba(0,0,0,.7)}.table td.is-danger[data-v-534131b3],.table th.is-danger[data-v-534131b3]{background-color:#ff3860;border-color:#ff3860;color:#fff}.table td.is-narrow[data-v-534131b3],.table th.is-narrow[data-v-534131b3]{white-space:nowrap;width:1%}.table td.is-selected[data-v-534131b3],.table th.is-selected[data-v-534131b3]{background-color:#00d1b2;color:#fff}.table td.is-selected a[data-v-534131b3],.table td.is-selected strong[data-v-534131b3],.table th.is-selected a[data-v-534131b3],.table th.is-selected strong[data-v-534131b3]{color:currentColor}.table th[data-v-534131b3]{color:#363636;text-align:left}.table tr.is-selected[data-v-534131b3]{background-color:#00d1b2;color:#fff}.table tr.is-selected a[data-v-534131b3],.table tr.is-selected strong[data-v-534131b3]{color:currentColor}.table tr.is-selected td[data-v-534131b3],.table tr.is-selected th[data-v-534131b3]{border-color:#fff;color:currentColor}.table thead td[data-v-534131b3],.table thead th[data-v-534131b3]{border-width:0 0 2px;color:#363636}.table tfoot td[data-v-534131b3],.table tfoot th[data-v-534131b3]{border-width:2px 0 0;color:#363636}.table tbody tr:last-child td[data-v-534131b3],.table tbody tr:last-child th[data-v-534131b3]{border-bottom-width:0}.table.is-bordered td[data-v-534131b3],.table.is-bordered th[data-v-534131b3]{border-width:1px}.table.is-bordered tr:last-child td[data-v-534131b3],.table.is-bordered tr:last-child th[data-v-534131b3]{border-bottom-width:1px}.table.is-fullwidth[data-v-534131b3]{width:100%}.table.is-hoverable.is-striped tbody tr[data-v-534131b3]:not(.is-selected):hover,.table.is-hoverable tbody tr[data-v-534131b3]:not(.is-selected):hover{background-color:#fafafa}.table.is-hoverable.is-striped tbody tr[data-v-534131b3]:not(.is-selected):hover:nth-child(2n){background-color:#f5f5f5}.table.is-narrow td[data-v-534131b3],.table.is-narrow th[data-v-534131b3]{padding:.25em .5em}.table.is-striped tbody tr[data-v-534131b3]:not(.is-selected):nth-child(2n){background-color:#fafafa}.table-container[data-v-534131b3]{-webkit-overflow-scrolling:touch;overflow:auto;overflow-y:hidden;max-width:100%}.tags[data-v-534131b3]{align-items:center;display:flex;flex-wrap:wrap;justify-content:flex-start}.tags .tag[data-v-534131b3]{margin-bottom:.5rem}.tags .tag[data-v-534131b3]:not(:last-child){margin-right:.5rem}.tags[data-v-534131b3]:last-child{margin-bottom:-.5rem}.tags[data-v-534131b3]:not(:last-child){margin-bottom:1rem}.tags.has-addons .tag[data-v-534131b3]{margin-right:0}.tags.has-addons .tag[data-v-534131b3]:not(:first-child){border-bottom-left-radius:0;border-top-left-radius:0}.tags.has-addons .tag[data-v-534131b3]:not(:last-child){border-bottom-right-radius:0;border-top-right-radius:0}.tags.is-centered[data-v-534131b3]{justify-content:center}.tags.is-centered .tag[data-v-534131b3]{margin-right:.25rem;margin-left:.25rem}.tags.is-right[data-v-534131b3]{justify-content:flex-end}.tags.is-right .tag[data-v-534131b3]:not(:first-child){margin-left:.5rem}.tags.is-right .tag[data-v-534131b3]:not(:last-child){margin-right:0}.tag[data-v-534131b3]:not(body),[data-v-534131b3] .tagAreaBulma{align-items:center;background-color:#f5f5f5;border-radius:4px;color:#4a4a4a;display:inline-flex;font-size:.75rem;height:2em;justify-content:center;line-height:1.5;padding-left:.75em;padding-right:.75em;white-space:nowrap}.tag:not(body) .delete[data-v-534131b3],[data-v-534131b3] .tagAreaBulma .delete{margin-left:.25rem;margin-right:-.375rem}.tag:not(body).is-white[data-v-534131b3],[data-v-534131b3] .is-white.tagAreaBulma{background-color:#fff;color:#0a0a0a}.tag:not(body).is-black[data-v-534131b3],[data-v-534131b3] .is-black.tagAreaBulma{background-color:#0a0a0a;color:#fff}.tag:not(body).is-light[data-v-534131b3],[data-v-534131b3] .is-light.tagAreaBulma{background-color:#f5f5f5;color:#363636}.tag:not(body).is-dark[data-v-534131b3],[data-v-534131b3] .is-dark.tagAreaBulma{background-color:#363636;color:#f5f5f5}.tag:not(body).is-primary[data-v-534131b3],[data-v-534131b3] .tag.deleteAreaBulma:not(body),[data-v-534131b3] .tag.deleteContentBulma:not(body),[data-v-534131b3] .tagAreaBulma{background-color:#00d1b2;color:#fff}.tag:not(body).is-link[data-v-534131b3],[data-v-534131b3] .is-link.tagAreaBulma{background-color:#3273dc;color:#fff}.tag:not(body).is-info[data-v-534131b3],[data-v-534131b3] .is-info.tagAreaBulma{background-color:#209cee;color:#fff}.tag:not(body).is-success[data-v-534131b3],[data-v-534131b3] .is-success.tagAreaBulma{background-color:#23d160;color:#fff}.tag:not(body).is-warning[data-v-534131b3],[data-v-534131b3] .is-warning.tagAreaBulma{background-color:#ffdd57;color:rgba(0,0,0,.7)}.tag:not(body).is-danger[data-v-534131b3],[data-v-534131b3] .is-danger.tagAreaBulma{background-color:#ff3860;color:#fff}.tag:not(body).is-medium[data-v-534131b3],[data-v-534131b3] .is-medium.tagAreaBulma{font-size:1rem}.tag:not(body).is-large[data-v-534131b3],[data-v-534131b3] .is-large.tagAreaBulma{font-size:1.25rem}.tag:not(body) .icon[data-v-534131b3]:first-child:not(:last-child),[data-v-534131b3] .tagAreaBulma .icon:first-child:not(:last-child){margin-left:-.375em;margin-right:.1875em}.tag:not(body) .icon[data-v-534131b3]:last-child:not(:first-child),[data-v-534131b3] .tagAreaBulma .icon:last-child:not(:first-child){margin-left:.1875em;margin-right:-.375em}.tag:not(body) .icon[data-v-534131b3]:first-child:last-child,[data-v-534131b3] .tagAreaBulma .icon:first-child:last-child{margin-left:-.375em;margin-right:-.375em}.tag:not(body).is-delete[data-v-534131b3],[data-v-534131b3] .is-delete.tagAreaBulma{margin-left:1px;padding:0;position:relative;width:2em}.tag:not(body).is-delete[data-v-534131b3]:after,.tag:not(body).is-delete[data-v-534131b3]:before,[data-v-534131b3] .is-delete.tagAreaBulma:after,[data-v-534131b3] .is-delete.tagAreaBulma:before{background-color:currentColor;content:"";display:block;left:50%;position:absolute;top:50%;transform:translateX(-50%) translateY(-50%) rotate(45deg);transform-origin:center center}.tag:not(body).is-delete[data-v-534131b3]:before,[data-v-534131b3] .is-delete.tagAreaBulma:before{height:1px;width:50%}.tag:not(body).is-delete[data-v-534131b3]:after,[data-v-534131b3] .is-delete.tagAreaBulma:after{height:50%;width:1px}.tag:not(body).is-delete[data-v-534131b3]:focus,.tag:not(body).is-delete[data-v-534131b3]:hover,[data-v-534131b3] .is-delete.tagAreaBulma:focus,[data-v-534131b3] .is-delete.tagAreaBulma:hover{background-color:#e8e8e8}.tag:not(body).is-delete[data-v-534131b3]:active,[data-v-534131b3] .is-delete.tagAreaBulma:active{background-color:#dbdbdb}.tag:not(body).is-rounded[data-v-534131b3],[data-v-534131b3] .is-rounded.tagAreaBulma{border-radius:290486px}a.tag[data-v-534131b3]:hover{text-decoration:underline}.subtitle[data-v-534131b3],.title[data-v-534131b3]{word-break:break-word}.subtitle em[data-v-534131b3],.subtitle span[data-v-534131b3],.title em[data-v-534131b3],.title span[data-v-534131b3]{font-weight:inherit}.subtitle sub[data-v-534131b3],.subtitle sup[data-v-534131b3],.title sub[data-v-534131b3],.title sup[data-v-534131b3]{font-size:.75em}.subtitle .tag[data-v-534131b3],.title .tag[data-v-534131b3]{vertical-align:middle}.title[data-v-534131b3]{color:#363636;font-size:2rem;font-weight:600;line-height:1.125}.title strong[data-v-534131b3]{color:inherit;font-weight:inherit}.title+.highlight[data-v-534131b3]{margin-top:-.75rem}.title:not(.is-spaced)+.subtitle[data-v-534131b3]{margin-top:-1.25rem}.title.is-1[data-v-534131b3]{font-size:3rem}.title.is-2[data-v-534131b3]{font-size:2.5rem}.title.is-3[data-v-534131b3]{font-size:2rem}.title.is-4[data-v-534131b3]{font-size:1.5rem}.title.is-5[data-v-534131b3]{font-size:1.25rem}.title.is-6[data-v-534131b3]{font-size:1rem}.title.is-7[data-v-534131b3]{font-size:.75rem}.subtitle[data-v-534131b3]{color:#4a4a4a;font-size:1.25rem;font-weight:400;line-height:1.25}.subtitle strong[data-v-534131b3]{color:#363636;font-weight:600}.subtitle:not(.is-spaced)+.title[data-v-534131b3]{margin-top:-1.25rem}.subtitle.is-1[data-v-534131b3]{font-size:3rem}.subtitle.is-2[data-v-534131b3]{font-size:2.5rem}.subtitle.is-3[data-v-534131b3]{font-size:2rem}.subtitle.is-4[data-v-534131b3]{font-size:1.5rem}.subtitle.is-5[data-v-534131b3]{font-size:1.25rem}.subtitle.is-6[data-v-534131b3]{font-size:1rem}.subtitle.is-7[data-v-534131b3]{font-size:.75rem}.heading[data-v-534131b3]{display:block;font-size:11px;letter-spacing:1px;margin-bottom:5px;text-transform:uppercase}.highlight[data-v-534131b3]{font-weight:400;max-width:100%;overflow:hidden;padding:0}.highlight pre[data-v-534131b3]{overflow:auto;max-width:100%}.number[data-v-534131b3]{align-items:center;background-color:#f5f5f5;border-radius:290486px;display:inline-flex;font-size:1.25rem;height:2em;justify-content:center;margin-right:1.5rem;min-width:2.5em;padding:.25rem .5rem;text-align:center;vertical-align:top}.breadcrumb[data-v-534131b3]{font-size:1rem;white-space:nowrap}.breadcrumb a[data-v-534131b3]{align-items:center;color:#3273dc;display:flex;justify-content:center;padding:0 .75em}.breadcrumb a[data-v-534131b3]:hover{color:#363636}.breadcrumb li[data-v-534131b3]{align-items:center;display:flex}.breadcrumb li:first-child a[data-v-534131b3]{padding-left:0}.breadcrumb li.is-active a[data-v-534131b3]{color:#363636;cursor:default;pointer-events:none}.breadcrumb li+li[data-v-534131b3]:before{color:#b5b5b5;content:"/"}.breadcrumb ol[data-v-534131b3],.breadcrumb ul[data-v-534131b3]{align-items:flex-start;display:flex;flex-wrap:wrap;justify-content:flex-start}.breadcrumb .icon[data-v-534131b3]:first-child{margin-right:.5em}.breadcrumb .icon[data-v-534131b3]:last-child{margin-left:.5em}.breadcrumb.is-centered ol[data-v-534131b3],.breadcrumb.is-centered ul[data-v-534131b3]{justify-content:center}.breadcrumb.is-right ol[data-v-534131b3],.breadcrumb.is-right ul[data-v-534131b3]{justify-content:flex-end}.breadcrumb.is-small[data-v-534131b3]{font-size:.75rem}.breadcrumb.is-medium[data-v-534131b3]{font-size:1.25rem}.breadcrumb.is-large[data-v-534131b3]{font-size:1.5rem}.breadcrumb.has-arrow-separator li+li[data-v-534131b3]:before{content:"\\2192"}.breadcrumb.has-bullet-separator li+li[data-v-534131b3]:before{content:"\\2022"}.breadcrumb.has-dot-separator li+li[data-v-534131b3]:before{content:"\\B7"}.breadcrumb.has-succeeds-separator li+li[data-v-534131b3]:before{content:"\\227B"}.card[data-v-534131b3]{background-color:#fff;box-shadow:0 2px 3px hsla(0,0%,4%,.1),0 0 0 1px hsla(0,0%,4%,.1);color:#4a4a4a;max-width:100%;position:relative}.card-header[data-v-534131b3]{background-color:transparent;align-items:stretch;box-shadow:0 1px 2px hsla(0,0%,4%,.1);display:flex}.card-header-title[data-v-534131b3]{align-items:center;color:#363636;display:flex;flex-grow:1;font-weight:700;padding:.75rem}.card-header-title.is-centered[data-v-534131b3]{justify-content:center}.card-header-icon[data-v-534131b3]{align-items:center;cursor:pointer;display:flex;justify-content:center;padding:.75rem}.card-image[data-v-534131b3]{display:block;position:relative}.card-content[data-v-534131b3]{background-color:transparent;padding:1.5rem}.card-footer[data-v-534131b3]{background-color:transparent;border-top:1px solid #dbdbdb;align-items:stretch;display:flex}.card-footer-item[data-v-534131b3]{align-items:center;display:flex;flex-basis:0;flex-grow:1;flex-shrink:0;justify-content:center;padding:.75rem}.card-footer-item[data-v-534131b3]:not(:last-child){border-right:1px solid #dbdbdb}.card .media[data-v-534131b3]:not(:last-child){margin-bottom:.75rem}.dropdown[data-v-534131b3]{display:inline-flex;position:relative;vertical-align:top}.dropdown.is-active .dropdown-menu[data-v-534131b3],.dropdown.is-hoverable:hover .dropdown-menu[data-v-534131b3]{display:block}.dropdown.is-right .dropdown-menu[data-v-534131b3]{left:auto;right:0}.dropdown.is-up .dropdown-menu[data-v-534131b3]{bottom:100%;padding-bottom:4px;padding-top:0;top:auto}.dropdown-menu[data-v-534131b3]{display:none;left:0;min-width:12rem;padding-top:4px;position:absolute;top:100%;z-index:20}.dropdown-content[data-v-534131b3]{background-color:#fff;border-radius:4px;box-shadow:0 2px 3px hsla(0,0%,4%,.1),0 0 0 1px hsla(0,0%,4%,.1);padding-bottom:.5rem;padding-top:.5rem}.dropdown-item[data-v-534131b3]{color:#4a4a4a;display:block;font-size:.875rem;line-height:1.5;padding:.375rem 1rem;position:relative}a.dropdown-item[data-v-534131b3],button.dropdown-item[data-v-534131b3]{padding-right:3rem;text-align:left;white-space:nowrap;width:100%}a.dropdown-item[data-v-534131b3]:hover,button.dropdown-item[data-v-534131b3]:hover{background-color:#f5f5f5;color:#0a0a0a}a.dropdown-item.is-active[data-v-534131b3],button.dropdown-item.is-active[data-v-534131b3]{background-color:#3273dc;color:#fff}.dropdown-divider[data-v-534131b3]{background-color:#dbdbdb;border:none;display:block;height:1px;margin:.5rem 0}.level[data-v-534131b3]{align-items:center;justify-content:space-between}.level code[data-v-534131b3]{border-radius:4px}.level img[data-v-534131b3]{display:inline-block;vertical-align:top}.level.is-mobile .level-left[data-v-534131b3],.level.is-mobile .level-right[data-v-534131b3],.level.is-mobile[data-v-534131b3]{display:flex}.level.is-mobile .level-left+.level-right[data-v-534131b3]{margin-top:0}.level.is-mobile .level-item[data-v-534131b3]:not(:last-child){margin-bottom:0;margin-right:.75rem}.level.is-mobile .level-item[data-v-534131b3]:not(.is-narrow){flex-grow:1}@media print,screen and (min-width:769px){.level[data-v-534131b3]{display:flex}.level>.level-item[data-v-534131b3]:not(.is-narrow){flex-grow:1}}.level-item[data-v-534131b3]{align-items:center;display:flex;flex-basis:auto;flex-grow:0;flex-shrink:0;justify-content:center}.level-item .subtitle[data-v-534131b3],.level-item .title[data-v-534131b3]{margin-bottom:0}@media screen and (max-width:768px){.level-item[data-v-534131b3]:not(:last-child){margin-bottom:.75rem}}.level-left[data-v-534131b3],.level-right[data-v-534131b3]{flex-basis:auto;flex-grow:0;flex-shrink:0}.level-left .level-item.is-flexible[data-v-534131b3],.level-right .level-item.is-flexible[data-v-534131b3]{flex-grow:1}@media print,screen and (min-width:769px){.level-left .level-item[data-v-534131b3]:not(:last-child),.level-right .level-item[data-v-534131b3]:not(:last-child){margin-right:.75rem}}.level-left[data-v-534131b3]{align-items:center;justify-content:flex-start}@media screen and (max-width:768px){.level-left+.level-right[data-v-534131b3]{margin-top:1.5rem}}@media print,screen and (min-width:769px){.level-left[data-v-534131b3]{display:flex}}.level-right[data-v-534131b3]{align-items:center;justify-content:flex-end}@media print,screen and (min-width:769px){.level-right[data-v-534131b3]{display:flex}}.list[data-v-534131b3]{background-color:#fff;border-radius:4px;box-shadow:0 2px 3px hsla(0,0%,4%,.1),0 0 0 1px hsla(0,0%,4%,.1)}.list-item[data-v-534131b3]{display:block;padding:.5em 1em}.list-item[data-v-534131b3]:not(a){color:#4a4a4a}.list-item[data-v-534131b3]:first-child,.list-item[data-v-534131b3]:last-child{border-top-left-radius:4px;border-top-right-radius:4px}.list-item[data-v-534131b3]:not(:last-child){border-bottom:1px solid #dbdbdb}.list-item.is-active[data-v-534131b3]{background-color:#3273dc;color:#fff}a.list-item[data-v-534131b3]{background-color:#f5f5f5;cursor:pointer}.media[data-v-534131b3]{align-items:flex-start;display:flex;text-align:left}.media .content[data-v-534131b3]:not(:last-child){margin-bottom:.75rem}.media .media[data-v-534131b3]{border-top:1px solid hsla(0,0%,86%,.5);display:flex;padding-top:.75rem}.media .media .content[data-v-534131b3]:not(:last-child),.media .media .control[data-v-534131b3]:not(:last-child){margin-bottom:.5rem}.media .media .media[data-v-534131b3]{padding-top:.5rem}.media .media .media+.media[data-v-534131b3]{margin-top:.5rem}.media+.media[data-v-534131b3]{border-top:1px solid hsla(0,0%,86%,.5);margin-top:1rem;padding-top:1rem}.media.is-large+.media[data-v-534131b3]{margin-top:1.5rem;padding-top:1.5rem}.media-left[data-v-534131b3],.media-right[data-v-534131b3]{flex-basis:auto;flex-grow:0;flex-shrink:0}.media-left[data-v-534131b3]{margin-right:1rem}.media-right[data-v-534131b3]{margin-left:1rem}.media-content[data-v-534131b3]{flex-basis:auto;flex-grow:1;flex-shrink:1;text-align:left}@media screen and (max-width:768px){.media-content[data-v-534131b3]{overflow-x:auto}}.menu[data-v-534131b3]{font-size:1rem}.menu.is-small[data-v-534131b3]{font-size:.75rem}.menu.is-medium[data-v-534131b3]{font-size:1.25rem}.menu.is-large[data-v-534131b3]{font-size:1.5rem}.menu-list[data-v-534131b3]{line-height:1.25}.menu-list a[data-v-534131b3]{border-radius:2px;color:#4a4a4a;display:block;padding:.5em .75em}.menu-list a[data-v-534131b3]:hover{background-color:#f5f5f5;color:#363636}.menu-list a.is-active[data-v-534131b3]{background-color:#3273dc;color:#fff}.menu-list li ul[data-v-534131b3]{border-left:1px solid #dbdbdb;margin:.75em;padding-left:.75em}.menu-label[data-v-534131b3]{color:#7a7a7a;font-size:.75em;letter-spacing:.1em;text-transform:uppercase}.menu-label[data-v-534131b3]:not(:first-child){margin-top:1em}.menu-label[data-v-534131b3]:not(:last-child){margin-bottom:1em}.message[data-v-534131b3]{background-color:#f5f5f5;border-radius:4px;font-size:1rem}.message strong[data-v-534131b3]{color:currentColor}.message a[data-v-534131b3]:not(.button):not(.tag){color:currentColor;text-decoration:underline}.message.is-small[data-v-534131b3]{font-size:.75rem}.message.is-medium[data-v-534131b3]{font-size:1.25rem}.message.is-large[data-v-534131b3]{font-size:1.5rem}.message.is-white[data-v-534131b3]{background-color:#fff}.message.is-white .message-header[data-v-534131b3]{background-color:#fff;color:#0a0a0a}.message.is-white .message-body[data-v-534131b3]{border-color:#fff;color:#4d4d4d}.message.is-black[data-v-534131b3]{background-color:#fafafa}.message.is-black .message-header[data-v-534131b3]{background-color:#0a0a0a;color:#fff}.message.is-black .message-body[data-v-534131b3]{border-color:#0a0a0a;color:#090909}.message.is-light[data-v-534131b3]{background-color:#fafafa}.message.is-light .message-header[data-v-534131b3]{background-color:#f5f5f5;color:#363636}.message.is-light .message-body[data-v-534131b3]{border-color:#f5f5f5;color:#505050}.message.is-dark[data-v-534131b3]{background-color:#fafafa}.message.is-dark .message-header[data-v-534131b3]{background-color:#363636;color:#f5f5f5}.message.is-dark .message-body[data-v-534131b3]{border-color:#363636;color:#2a2a2a}.message.is-primary[data-v-534131b3],[data-v-534131b3] .message.deleteAreaBulma,[data-v-534131b3] .message.deleteContentBulma,[data-v-534131b3] .message.tagAreaBulma{background-color:#f5fffd}.message.is-primary .message-header[data-v-534131b3],[data-v-534131b3] .message.deleteAreaBulma .message-header,[data-v-534131b3] .message.deleteContentBulma .message-header,[data-v-534131b3] .message.tagAreaBulma .message-header{background-color:#00d1b2;color:#fff}.message.is-primary .message-body[data-v-534131b3],[data-v-534131b3] .message.deleteAreaBulma .message-body,[data-v-534131b3] .message.deleteContentBulma .message-body,[data-v-534131b3] .message.tagAreaBulma .message-body{border-color:#00d1b2;color:#021310}.message.is-link[data-v-534131b3]{background-color:#f6f9fe}.message.is-link .message-header[data-v-534131b3]{background-color:#3273dc;color:#fff}.message.is-link .message-body[data-v-534131b3]{border-color:#3273dc;color:#22509a}.message.is-info[data-v-534131b3]{background-color:#f6fbfe}.message.is-info .message-header[data-v-534131b3]{background-color:#209cee;color:#fff}.message.is-info .message-body[data-v-534131b3]{border-color:#209cee;color:#12537e}.message.is-success[data-v-534131b3]{background-color:#f6fef9}.message.is-success .message-header[data-v-534131b3]{background-color:#23d160;color:#fff}.message.is-success .message-body[data-v-534131b3]{border-color:#23d160;color:#0e301a}.message.is-warning[data-v-534131b3]{background-color:#fffdf5}.message.is-warning .message-header[data-v-534131b3]{background-color:#ffdd57;color:rgba(0,0,0,.7)}.message.is-warning .message-body[data-v-534131b3]{border-color:#ffdd57;color:#3b3108}.message.is-danger[data-v-534131b3]{background-color:#fff5f7}.message.is-danger .message-header[data-v-534131b3]{background-color:#ff3860;color:#fff}.message.is-danger .message-body[data-v-534131b3]{border-color:#ff3860;color:#cd0930}.message-header[data-v-534131b3]{align-items:center;background-color:#4a4a4a;border-radius:4px 4px 0 0;color:#fff;display:flex;font-weight:700;justify-content:space-between;line-height:1.25;padding:.75em 1em;position:relative}.message-header .delete[data-v-534131b3]{flex-grow:0;flex-shrink:0;margin-left:.75em}.message-header+.message-body[data-v-534131b3]{border-width:0;border-top-left-radius:0;border-top-right-radius:0}.message-body[data-v-534131b3]{border-color:#dbdbdb;border-radius:4px;border-style:solid;border-width:0 0 0 4px;color:#4a4a4a;padding:1.25em 1.5em}.message-body code[data-v-534131b3],.message-body pre[data-v-534131b3]{background-color:#fff}.message-body pre code[data-v-534131b3]{background-color:transparent}.modal[data-v-534131b3]{align-items:center;display:none;flex-direction:column;justify-content:center;overflow:hidden;position:fixed;z-index:40}.modal.is-active[data-v-534131b3]{display:flex}.modal-background[data-v-534131b3]{background-color:hsla(0,0%,4%,.86)}.modal-card[data-v-534131b3],.modal-content[data-v-534131b3]{margin:0 20px;max-height:calc(100vh - 160px);overflow:auto;position:relative;width:100%}@media print,screen and (min-width:769px){.modal-card[data-v-534131b3],.modal-content[data-v-534131b3]{margin:0 auto;max-height:calc(100vh - 40px);width:640px}}.modal-close[data-v-534131b3]{background:none;height:40px;position:fixed;right:20px;top:20px;width:40px}.modal-card[data-v-534131b3]{display:flex;flex-direction:column;max-height:calc(100vh - 40px);overflow:hidden;-ms-overflow-y:visible}.modal-card-foot[data-v-534131b3],.modal-card-head[data-v-534131b3]{align-items:center;background-color:#f5f5f5;display:flex;flex-shrink:0;justify-content:flex-start;padding:20px;position:relative}.modal-card-head[data-v-534131b3]{border-bottom:1px solid #dbdbdb;border-top-left-radius:6px;border-top-right-radius:6px}.modal-card-title[data-v-534131b3]{color:#363636;flex-grow:1;flex-shrink:0;font-size:1.5rem;line-height:1}.modal-card-foot[data-v-534131b3]{border-bottom-left-radius:6px;border-bottom-right-radius:6px;border-top:1px solid #dbdbdb}.modal-card-foot .button[data-v-534131b3]:not(:last-child){margin-right:10px}.modal-card-body[data-v-534131b3]{-webkit-overflow-scrolling:touch;background-color:#fff;flex-grow:1;flex-shrink:1;overflow:auto;padding:20px}.navbar[data-v-534131b3]{background-color:#fff;min-height:3.25rem;position:relative;z-index:30}.navbar.is-white[data-v-534131b3]{background-color:#fff;color:#0a0a0a}.navbar.is-white .navbar-brand .navbar-link[data-v-534131b3],.navbar.is-white .navbar-brand>.navbar-item[data-v-534131b3]{color:#0a0a0a}.navbar.is-white .navbar-brand .navbar-link.is-active[data-v-534131b3],.navbar.is-white .navbar-brand .navbar-link[data-v-534131b3]:hover,.navbar.is-white .navbar-brand>a.navbar-item.is-active[data-v-534131b3],.navbar.is-white .navbar-brand>a.navbar-item[data-v-534131b3]:hover{background-color:#f2f2f2;color:#0a0a0a}.navbar.is-white .navbar-brand .navbar-link[data-v-534131b3]:after{border-color:#0a0a0a}.navbar.is-white .navbar-burger[data-v-534131b3]{color:#0a0a0a}@media screen and (min-width:1088px){.navbar.is-white .navbar-end .navbar-link[data-v-534131b3],.navbar.is-white .navbar-end>.navbar-item[data-v-534131b3],.navbar.is-white .navbar-start .navbar-link[data-v-534131b3],.navbar.is-white .navbar-start>.navbar-item[data-v-534131b3]{color:#0a0a0a}.navbar.is-white .navbar-end .navbar-link.is-active[data-v-534131b3],.navbar.is-white .navbar-end .navbar-link[data-v-534131b3]:hover,.navbar.is-white .navbar-end>a.navbar-item.is-active[data-v-534131b3],.navbar.is-white .navbar-end>a.navbar-item[data-v-534131b3]:hover,.navbar.is-white .navbar-start .navbar-link.is-active[data-v-534131b3],.navbar.is-white .navbar-start .navbar-link[data-v-534131b3]:hover,.navbar.is-white .navbar-start>a.navbar-item.is-active[data-v-534131b3],.navbar.is-white .navbar-start>a.navbar-item[data-v-534131b3]:hover{background-color:#f2f2f2;color:#0a0a0a}.navbar.is-white .navbar-end .navbar-link[data-v-534131b3]:after,.navbar.is-white .navbar-start .navbar-link[data-v-534131b3]:after{border-color:#0a0a0a}.navbar.is-white .navbar-item.has-dropdown.is-active .navbar-link[data-v-534131b3],.navbar.is-white .navbar-item.has-dropdown:hover .navbar-link[data-v-534131b3]{background-color:#f2f2f2;color:#0a0a0a}.navbar.is-white .navbar-dropdown a.navbar-item.is-active[data-v-534131b3]{background-color:#fff;color:#0a0a0a}}.navbar.is-black[data-v-534131b3]{background-color:#0a0a0a;color:#fff}.navbar.is-black .navbar-brand .navbar-link[data-v-534131b3],.navbar.is-black .navbar-brand>.navbar-item[data-v-534131b3]{color:#fff}.navbar.is-black .navbar-brand .navbar-link.is-active[data-v-534131b3],.navbar.is-black .navbar-brand .navbar-link[data-v-534131b3]:hover,.navbar.is-black .navbar-brand>a.navbar-item.is-active[data-v-534131b3],.navbar.is-black .navbar-brand>a.navbar-item[data-v-534131b3]:hover{background-color:#000;color:#fff}.navbar.is-black .navbar-brand .navbar-link[data-v-534131b3]:after{border-color:#fff}.navbar.is-black .navbar-burger[data-v-534131b3]{color:#fff}@media screen and (min-width:1088px){.navbar.is-black .navbar-end .navbar-link[data-v-534131b3],.navbar.is-black .navbar-end>.navbar-item[data-v-534131b3],.navbar.is-black .navbar-start .navbar-link[data-v-534131b3],.navbar.is-black .navbar-start>.navbar-item[data-v-534131b3]{color:#fff}.navbar.is-black .navbar-end .navbar-link.is-active[data-v-534131b3],.navbar.is-black .navbar-end .navbar-link[data-v-534131b3]:hover,.navbar.is-black .navbar-end>a.navbar-item.is-active[data-v-534131b3],.navbar.is-black .navbar-end>a.navbar-item[data-v-534131b3]:hover,.navbar.is-black .navbar-start .navbar-link.is-active[data-v-534131b3],.navbar.is-black .navbar-start .navbar-link[data-v-534131b3]:hover,.navbar.is-black .navbar-start>a.navbar-item.is-active[data-v-534131b3],.navbar.is-black .navbar-start>a.navbar-item[data-v-534131b3]:hover{background-color:#000;color:#fff}.navbar.is-black .navbar-end .navbar-link[data-v-534131b3]:after,.navbar.is-black .navbar-start .navbar-link[data-v-534131b3]:after{border-color:#fff}.navbar.is-black .navbar-item.has-dropdown.is-active .navbar-link[data-v-534131b3],.navbar.is-black .navbar-item.has-dropdown:hover .navbar-link[data-v-534131b3]{background-color:#000;color:#fff}.navbar.is-black .navbar-dropdown a.navbar-item.is-active[data-v-534131b3]{background-color:#0a0a0a;color:#fff}}.navbar.is-light[data-v-534131b3]{background-color:#f5f5f5;color:#363636}.navbar.is-light .navbar-brand .navbar-link[data-v-534131b3],.navbar.is-light .navbar-brand>.navbar-item[data-v-534131b3]{color:#363636}.navbar.is-light .navbar-brand .navbar-link.is-active[data-v-534131b3],.navbar.is-light .navbar-brand .navbar-link[data-v-534131b3]:hover,.navbar.is-light .navbar-brand>a.navbar-item.is-active[data-v-534131b3],.navbar.is-light .navbar-brand>a.navbar-item[data-v-534131b3]:hover{background-color:#e8e8e8;color:#363636}.navbar.is-light .navbar-brand .navbar-link[data-v-534131b3]:after{border-color:#363636}.navbar.is-light .navbar-burger[data-v-534131b3]{color:#363636}@media screen and (min-width:1088px){.navbar.is-light .navbar-end .navbar-link[data-v-534131b3],.navbar.is-light .navbar-end>.navbar-item[data-v-534131b3],.navbar.is-light .navbar-start .navbar-link[data-v-534131b3],.navbar.is-light .navbar-start>.navbar-item[data-v-534131b3]{color:#363636}.navbar.is-light .navbar-end .navbar-link.is-active[data-v-534131b3],.navbar.is-light .navbar-end .navbar-link[data-v-534131b3]:hover,.navbar.is-light .navbar-end>a.navbar-item.is-active[data-v-534131b3],.navbar.is-light .navbar-end>a.navbar-item[data-v-534131b3]:hover,.navbar.is-light .navbar-start .navbar-link.is-active[data-v-534131b3],.navbar.is-light .navbar-start .navbar-link[data-v-534131b3]:hover,.navbar.is-light .navbar-start>a.navbar-item.is-active[data-v-534131b3],.navbar.is-light .navbar-start>a.navbar-item[data-v-534131b3]:hover{background-color:#e8e8e8;color:#363636}.navbar.is-light .navbar-end .navbar-link[data-v-534131b3]:after,.navbar.is-light .navbar-start .navbar-link[data-v-534131b3]:after{border-color:#363636}.navbar.is-light .navbar-item.has-dropdown.is-active .navbar-link[data-v-534131b3],.navbar.is-light .navbar-item.has-dropdown:hover .navbar-link[data-v-534131b3]{background-color:#e8e8e8;color:#363636}.navbar.is-light .navbar-dropdown a.navbar-item.is-active[data-v-534131b3]{background-color:#f5f5f5;color:#363636}}.navbar.is-dark[data-v-534131b3]{background-color:#363636;color:#f5f5f5}.navbar.is-dark .navbar-brand .navbar-link[data-v-534131b3],.navbar.is-dark .navbar-brand>.navbar-item[data-v-534131b3]{color:#f5f5f5}.navbar.is-dark .navbar-brand .navbar-link.is-active[data-v-534131b3],.navbar.is-dark .navbar-brand .navbar-link[data-v-534131b3]:hover,.navbar.is-dark .navbar-brand>a.navbar-item.is-active[data-v-534131b3],.navbar.is-dark .navbar-brand>a.navbar-item[data-v-534131b3]:hover{background-color:#292929;color:#f5f5f5}.navbar.is-dark .navbar-brand .navbar-link[data-v-534131b3]:after{border-color:#f5f5f5}.navbar.is-dark .navbar-burger[data-v-534131b3]{color:#f5f5f5}@media screen and (min-width:1088px){.navbar.is-dark .navbar-end .navbar-link[data-v-534131b3],.navbar.is-dark .navbar-end>.navbar-item[data-v-534131b3],.navbar.is-dark .navbar-start .navbar-link[data-v-534131b3],.navbar.is-dark .navbar-start>.navbar-item[data-v-534131b3]{color:#f5f5f5}.navbar.is-dark .navbar-end .navbar-link.is-active[data-v-534131b3],.navbar.is-dark .navbar-end .navbar-link[data-v-534131b3]:hover,.navbar.is-dark .navbar-end>a.navbar-item.is-active[data-v-534131b3],.navbar.is-dark .navbar-end>a.navbar-item[data-v-534131b3]:hover,.navbar.is-dark .navbar-start .navbar-link.is-active[data-v-534131b3],.navbar.is-dark .navbar-start .navbar-link[data-v-534131b3]:hover,.navbar.is-dark .navbar-start>a.navbar-item.is-active[data-v-534131b3],.navbar.is-dark .navbar-start>a.navbar-item[data-v-534131b3]:hover{background-color:#292929;color:#f5f5f5}.navbar.is-dark .navbar-end .navbar-link[data-v-534131b3]:after,.navbar.is-dark .navbar-start .navbar-link[data-v-534131b3]:after{border-color:#f5f5f5}.navbar.is-dark .navbar-item.has-dropdown.is-active .navbar-link[data-v-534131b3],.navbar.is-dark .navbar-item.has-dropdown:hover .navbar-link[data-v-534131b3]{background-color:#292929;color:#f5f5f5}.navbar.is-dark .navbar-dropdown a.navbar-item.is-active[data-v-534131b3]{background-color:#363636;color:#f5f5f5}}.navbar.is-primary[data-v-534131b3],[data-v-534131b3] .navbar.deleteAreaBulma,[data-v-534131b3] .navbar.deleteContentBulma,[data-v-534131b3] .navbar.tagAreaBulma{background-color:#00d1b2;color:#fff}.navbar.is-primary .navbar-brand .navbar-link[data-v-534131b3],.navbar.is-primary .navbar-brand>.navbar-item[data-v-534131b3],[data-v-534131b3] .navbar.deleteAreaBulma .navbar-brand .navbar-link,[data-v-534131b3] .navbar.deleteAreaBulma .navbar-brand>.navbar-item,[data-v-534131b3] .navbar.deleteContentBulma .navbar-brand .navbar-link,[data-v-534131b3] .navbar.deleteContentBulma .navbar-brand>.navbar-item,[data-v-534131b3] .navbar.tagAreaBulma .navbar-brand .navbar-link,[data-v-534131b3] .navbar.tagAreaBulma .navbar-brand>.navbar-item{color:#fff}.navbar.is-primary .navbar-brand .navbar-link.is-active[data-v-534131b3],.navbar.is-primary .navbar-brand .navbar-link[data-v-534131b3]:hover,.navbar.is-primary .navbar-brand>a.navbar-item.is-active[data-v-534131b3],.navbar.is-primary .navbar-brand>a.navbar-item[data-v-534131b3]:hover,[data-v-534131b3] .navbar.deleteAreaBulma .navbar-brand .navbar-link.is-active,[data-v-534131b3] .navbar.deleteAreaBulma .navbar-brand .navbar-link:hover,[data-v-534131b3] .navbar.deleteAreaBulma .navbar-brand>a.navbar-item.is-active,[data-v-534131b3] .navbar.deleteAreaBulma .navbar-brand>a.navbar-item:hover,[data-v-534131b3] .navbar.deleteContentBulma .navbar-brand .navbar-link.is-active,[data-v-534131b3] .navbar.deleteContentBulma .navbar-brand .navbar-link:hover,[data-v-534131b3] .navbar.deleteContentBulma .navbar-brand>a.navbar-item.is-active,[data-v-534131b3] .navbar.deleteContentBulma .navbar-brand>a.navbar-item:hover,[data-v-534131b3] .navbar.tagAreaBulma .navbar-brand .navbar-link.is-active,[data-v-534131b3] .navbar.tagAreaBulma .navbar-brand .navbar-link:hover,[data-v-534131b3] .navbar.tagAreaBulma .navbar-brand>a.navbar-item.is-active,[data-v-534131b3] .navbar.tagAreaBulma .navbar-brand>a.navbar-item:hover{background-color:#00b89c;color:#fff}.navbar.is-primary .navbar-brand .navbar-link[data-v-534131b3]:after,[data-v-534131b3] .navbar.deleteAreaBulma .navbar-brand .navbar-link:after,[data-v-534131b3] .navbar.deleteContentBulma .navbar-brand .navbar-link:after,[data-v-534131b3] .navbar.tagAreaBulma .navbar-brand .navbar-link:after{border-color:#fff}.navbar.is-primary .navbar-burger[data-v-534131b3],[data-v-534131b3] .navbar.deleteAreaBulma .navbar-burger,[data-v-534131b3] .navbar.deleteContentBulma .navbar-burger,[data-v-534131b3] .navbar.tagAreaBulma .navbar-burger{color:#fff}@media screen and (min-width:1088px){.navbar.is-primary .navbar-end .navbar-link[data-v-534131b3],.navbar.is-primary .navbar-end>.navbar-item[data-v-534131b3],.navbar.is-primary .navbar-start .navbar-link[data-v-534131b3],.navbar.is-primary .navbar-start>.navbar-item[data-v-534131b3],[data-v-534131b3] .navbar.deleteAreaBulma .navbar-end .navbar-link,[data-v-534131b3] .navbar.deleteAreaBulma .navbar-end>.navbar-item,[data-v-534131b3] .navbar.deleteAreaBulma .navbar-start .navbar-link,[data-v-534131b3] .navbar.deleteAreaBulma .navbar-start>.navbar-item,[data-v-534131b3] .navbar.deleteContentBulma .navbar-end .navbar-link,[data-v-534131b3] .navbar.deleteContentBulma .navbar-end>.navbar-item,[data-v-534131b3] .navbar.deleteContentBulma .navbar-start .navbar-link,[data-v-534131b3] .navbar.deleteContentBulma .navbar-start>.navbar-item,[data-v-534131b3] .navbar.tagAreaBulma .navbar-end .navbar-link,[data-v-534131b3] .navbar.tagAreaBulma .navbar-end>.navbar-item,[data-v-534131b3] .navbar.tagAreaBulma .navbar-start .navbar-link,[data-v-534131b3] .navbar.tagAreaBulma .navbar-start>.navbar-item{color:#fff}.navbar.is-primary .navbar-end .navbar-link.is-active[data-v-534131b3],.navbar.is-primary .navbar-end .navbar-link[data-v-534131b3]:hover,.navbar.is-primary .navbar-end>a.navbar-item.is-active[data-v-534131b3],.navbar.is-primary .navbar-end>a.navbar-item[data-v-534131b3]:hover,.navbar.is-primary .navbar-start .navbar-link.is-active[data-v-534131b3],.navbar.is-primary .navbar-start .navbar-link[data-v-534131b3]:hover,.navbar.is-primary .navbar-start>a.navbar-item.is-active[data-v-534131b3],.navbar.is-primary .navbar-start>a.navbar-item[data-v-534131b3]:hover,[data-v-534131b3] .navbar.deleteAreaBulma .navbar-end .navbar-link.is-active,[data-v-534131b3] .navbar.deleteAreaBulma .navbar-end .navbar-link:hover,[data-v-534131b3] .navbar.deleteAreaBulma .navbar-end>a.navbar-item.is-active,[data-v-534131b3] .navbar.deleteAreaBulma .navbar-end>a.navbar-item:hover,[data-v-534131b3] .navbar.deleteAreaBulma .navbar-start .navbar-link.is-active,[data-v-534131b3] .navbar.deleteAreaBulma .navbar-start .navbar-link:hover,[data-v-534131b3] .navbar.deleteAreaBulma .navbar-start>a.navbar-item.is-active,[data-v-534131b3] .navbar.deleteAreaBulma .navbar-start>a.navbar-item:hover,[data-v-534131b3] .navbar.deleteContentBulma .navbar-end .navbar-link.is-active,[data-v-534131b3] .navbar.deleteContentBulma .navbar-end .navbar-link:hover,[data-v-534131b3] .navbar.deleteContentBulma .navbar-end>a.navbar-item.is-active,[data-v-534131b3] .navbar.deleteContentBulma .navbar-end>a.navbar-item:hover,[data-v-534131b3] .navbar.deleteContentBulma .navbar-start .navbar-link.is-active,[data-v-534131b3] .navbar.deleteContentBulma .navbar-start .navbar-link:hover,[data-v-534131b3] .navbar.deleteContentBulma .navbar-start>a.navbar-item.is-active,[data-v-534131b3] .navbar.deleteContentBulma .navbar-start>a.navbar-item:hover,[data-v-534131b3] .navbar.tagAreaBulma .navbar-end .navbar-link.is-active,[data-v-534131b3] .navbar.tagAreaBulma .navbar-end .navbar-link:hover,[data-v-534131b3] .navbar.tagAreaBulma .navbar-end>a.navbar-item.is-active,[data-v-534131b3] .navbar.tagAreaBulma .navbar-end>a.navbar-item:hover,[data-v-534131b3] .navbar.tagAreaBulma .navbar-start .navbar-link.is-active,[data-v-534131b3] .navbar.tagAreaBulma .navbar-start .navbar-link:hover,[data-v-534131b3] .navbar.tagAreaBulma .navbar-start>a.navbar-item.is-active,[data-v-534131b3] .navbar.tagAreaBulma .navbar-start>a.navbar-item:hover{background-color:#00b89c;color:#fff}.navbar.is-primary .navbar-end .navbar-link[data-v-534131b3]:after,.navbar.is-primary .navbar-start .navbar-link[data-v-534131b3]:after,[data-v-534131b3] .navbar.deleteAreaBulma .navbar-end .navbar-link:after,[data-v-534131b3] .navbar.deleteAreaBulma .navbar-start .navbar-link:after,[data-v-534131b3] .navbar.deleteContentBulma .navbar-end .navbar-link:after,[data-v-534131b3] .navbar.deleteContentBulma .navbar-start .navbar-link:after,[data-v-534131b3] .navbar.tagAreaBulma .navbar-end .navbar-link:after,[data-v-534131b3] .navbar.tagAreaBulma .navbar-start .navbar-link:after{border-color:#fff}.navbar.is-primary .navbar-item.has-dropdown.is-active .navbar-link[data-v-534131b3],.navbar.is-primary .navbar-item.has-dropdown:hover .navbar-link[data-v-534131b3],[data-v-534131b3] .navbar.deleteAreaBulma .navbar-item.has-dropdown.is-active .navbar-link,[data-v-534131b3] .navbar.deleteAreaBulma .navbar-item.has-dropdown:hover .navbar-link,[data-v-534131b3] .navbar.deleteContentBulma .navbar-item.has-dropdown.is-active .navbar-link,[data-v-534131b3] .navbar.deleteContentBulma .navbar-item.has-dropdown:hover .navbar-link,[data-v-534131b3] .navbar.tagAreaBulma .navbar-item.has-dropdown.is-active .navbar-link,[data-v-534131b3] .navbar.tagAreaBulma .navbar-item.has-dropdown:hover .navbar-link{background-color:#00b89c;color:#fff}.navbar.is-primary .navbar-dropdown a.navbar-item.is-active[data-v-534131b3],[data-v-534131b3] .navbar.deleteAreaBulma .navbar-dropdown a.navbar-item.is-active,[data-v-534131b3] .navbar.deleteContentBulma .navbar-dropdown a.navbar-item.is-active,[data-v-534131b3] .navbar.tagAreaBulma .navbar-dropdown a.navbar-item.is-active{background-color:#00d1b2;color:#fff}}.navbar.is-link[data-v-534131b3]{background-color:#3273dc;color:#fff}.navbar.is-link .navbar-brand .navbar-link[data-v-534131b3],.navbar.is-link .navbar-brand>.navbar-item[data-v-534131b3]{color:#fff}.navbar.is-link .navbar-brand .navbar-link.is-active[data-v-534131b3],.navbar.is-link .navbar-brand .navbar-link[data-v-534131b3]:hover,.navbar.is-link .navbar-brand>a.navbar-item.is-active[data-v-534131b3],.navbar.is-link .navbar-brand>a.navbar-item[data-v-534131b3]:hover{background-color:#2366d1;color:#fff}.navbar.is-link .navbar-brand .navbar-link[data-v-534131b3]:after{border-color:#fff}.navbar.is-link .navbar-burger[data-v-534131b3]{color:#fff}@media screen and (min-width:1088px){.navbar.is-link .navbar-end .navbar-link[data-v-534131b3],.navbar.is-link .navbar-end>.navbar-item[data-v-534131b3],.navbar.is-link .navbar-start .navbar-link[data-v-534131b3],.navbar.is-link .navbar-start>.navbar-item[data-v-534131b3]{color:#fff}.navbar.is-link .navbar-end .navbar-link.is-active[data-v-534131b3],.navbar.is-link .navbar-end .navbar-link[data-v-534131b3]:hover,.navbar.is-link .navbar-end>a.navbar-item.is-active[data-v-534131b3],.navbar.is-link .navbar-end>a.navbar-item[data-v-534131b3]:hover,.navbar.is-link .navbar-start .navbar-link.is-active[data-v-534131b3],.navbar.is-link .navbar-start .navbar-link[data-v-534131b3]:hover,.navbar.is-link .navbar-start>a.navbar-item.is-active[data-v-534131b3],.navbar.is-link .navbar-start>a.navbar-item[data-v-534131b3]:hover{background-color:#2366d1;color:#fff}.navbar.is-link .navbar-end .navbar-link[data-v-534131b3]:after,.navbar.is-link .navbar-start .navbar-link[data-v-534131b3]:after{border-color:#fff}.navbar.is-link .navbar-item.has-dropdown.is-active .navbar-link[data-v-534131b3],.navbar.is-link .navbar-item.has-dropdown:hover .navbar-link[data-v-534131b3]{background-color:#2366d1;color:#fff}.navbar.is-link .navbar-dropdown a.navbar-item.is-active[data-v-534131b3]{background-color:#3273dc;color:#fff}}.navbar.is-info[data-v-534131b3]{background-color:#209cee;color:#fff}.navbar.is-info .navbar-brand .navbar-link[data-v-534131b3],.navbar.is-info .navbar-brand>.navbar-item[data-v-534131b3]{color:#fff}.navbar.is-info .navbar-brand .navbar-link.is-active[data-v-534131b3],.navbar.is-info .navbar-brand .navbar-link[data-v-534131b3]:hover,.navbar.is-info .navbar-brand>a.navbar-item.is-active[data-v-534131b3],.navbar.is-info .navbar-brand>a.navbar-item[data-v-534131b3]:hover{background-color:#118fe4;color:#fff}.navbar.is-info .navbar-brand .navbar-link[data-v-534131b3]:after{border-color:#fff}.navbar.is-info .navbar-burger[data-v-534131b3]{color:#fff}@media screen and (min-width:1088px){.navbar.is-info .navbar-end .navbar-link[data-v-534131b3],.navbar.is-info .navbar-end>.navbar-item[data-v-534131b3],.navbar.is-info .navbar-start .navbar-link[data-v-534131b3],.navbar.is-info .navbar-start>.navbar-item[data-v-534131b3]{color:#fff}.navbar.is-info .navbar-end .navbar-link.is-active[data-v-534131b3],.navbar.is-info .navbar-end .navbar-link[data-v-534131b3]:hover,.navbar.is-info .navbar-end>a.navbar-item.is-active[data-v-534131b3],.navbar.is-info .navbar-end>a.navbar-item[data-v-534131b3]:hover,.navbar.is-info .navbar-start .navbar-link.is-active[data-v-534131b3],.navbar.is-info .navbar-start .navbar-link[data-v-534131b3]:hover,.navbar.is-info .navbar-start>a.navbar-item.is-active[data-v-534131b3],.navbar.is-info .navbar-start>a.navbar-item[data-v-534131b3]:hover{background-color:#118fe4;color:#fff}.navbar.is-info .navbar-end .navbar-link[data-v-534131b3]:after,.navbar.is-info .navbar-start .navbar-link[data-v-534131b3]:after{border-color:#fff}.navbar.is-info .navbar-item.has-dropdown.is-active .navbar-link[data-v-534131b3],.navbar.is-info .navbar-item.has-dropdown:hover .navbar-link[data-v-534131b3]{background-color:#118fe4;color:#fff}.navbar.is-info .navbar-dropdown a.navbar-item.is-active[data-v-534131b3]{background-color:#209cee;color:#fff}}.navbar.is-success[data-v-534131b3]{background-color:#23d160;color:#fff}.navbar.is-success .navbar-brand .navbar-link[data-v-534131b3],.navbar.is-success .navbar-brand>.navbar-item[data-v-534131b3]{color:#fff}.navbar.is-success .navbar-brand .navbar-link.is-active[data-v-534131b3],.navbar.is-success .navbar-brand .navbar-link[data-v-534131b3]:hover,.navbar.is-success .navbar-brand>a.navbar-item.is-active[data-v-534131b3],.navbar.is-success .navbar-brand>a.navbar-item[data-v-534131b3]:hover{background-color:#20bc56;color:#fff}.navbar.is-success .navbar-brand .navbar-link[data-v-534131b3]:after{border-color:#fff}.navbar.is-success .navbar-burger[data-v-534131b3]{color:#fff}@media screen and (min-width:1088px){.navbar.is-success .navbar-end .navbar-link[data-v-534131b3],.navbar.is-success .navbar-end>.navbar-item[data-v-534131b3],.navbar.is-success .navbar-start .navbar-link[data-v-534131b3],.navbar.is-success .navbar-start>.navbar-item[data-v-534131b3]{color:#fff}.navbar.is-success .navbar-end .navbar-link.is-active[data-v-534131b3],.navbar.is-success .navbar-end .navbar-link[data-v-534131b3]:hover,.navbar.is-success .navbar-end>a.navbar-item.is-active[data-v-534131b3],.navbar.is-success .navbar-end>a.navbar-item[data-v-534131b3]:hover,.navbar.is-success .navbar-start .navbar-link.is-active[data-v-534131b3],.navbar.is-success .navbar-start .navbar-link[data-v-534131b3]:hover,.navbar.is-success .navbar-start>a.navbar-item.is-active[data-v-534131b3],.navbar.is-success .navbar-start>a.navbar-item[data-v-534131b3]:hover{background-color:#20bc56;color:#fff}.navbar.is-success .navbar-end .navbar-link[data-v-534131b3]:after,.navbar.is-success .navbar-start .navbar-link[data-v-534131b3]:after{border-color:#fff}.navbar.is-success .navbar-item.has-dropdown.is-active .navbar-link[data-v-534131b3],.navbar.is-success .navbar-item.has-dropdown:hover .navbar-link[data-v-534131b3]{background-color:#20bc56;color:#fff}.navbar.is-success .navbar-dropdown a.navbar-item.is-active[data-v-534131b3]{background-color:#23d160;color:#fff}}.navbar.is-warning[data-v-534131b3]{background-color:#ffdd57;color:rgba(0,0,0,.7)}.navbar.is-warning .navbar-brand .navbar-link[data-v-534131b3],.navbar.is-warning .navbar-brand>.navbar-item[data-v-534131b3]{color:rgba(0,0,0,.7)}.navbar.is-warning .navbar-brand .navbar-link.is-active[data-v-534131b3],.navbar.is-warning .navbar-brand .navbar-link[data-v-534131b3]:hover,.navbar.is-warning .navbar-brand>a.navbar-item.is-active[data-v-534131b3],.navbar.is-warning .navbar-brand>a.navbar-item[data-v-534131b3]:hover{background-color:#ffd83d;color:rgba(0,0,0,.7)}.navbar.is-warning .navbar-brand .navbar-link[data-v-534131b3]:after{border-color:rgba(0,0,0,.7)}.navbar.is-warning .navbar-burger[data-v-534131b3]{color:rgba(0,0,0,.7)}@media screen and (min-width:1088px){.navbar.is-warning .navbar-end .navbar-link[data-v-534131b3],.navbar.is-warning .navbar-end>.navbar-item[data-v-534131b3],.navbar.is-warning .navbar-start .navbar-link[data-v-534131b3],.navbar.is-warning .navbar-start>.navbar-item[data-v-534131b3]{color:rgba(0,0,0,.7)}.navbar.is-warning .navbar-end .navbar-link.is-active[data-v-534131b3],.navbar.is-warning .navbar-end .navbar-link[data-v-534131b3]:hover,.navbar.is-warning .navbar-end>a.navbar-item.is-active[data-v-534131b3],.navbar.is-warning .navbar-end>a.navbar-item[data-v-534131b3]:hover,.navbar.is-warning .navbar-start .navbar-link.is-active[data-v-534131b3],.navbar.is-warning .navbar-start .navbar-link[data-v-534131b3]:hover,.navbar.is-warning .navbar-start>a.navbar-item.is-active[data-v-534131b3],.navbar.is-warning .navbar-start>a.navbar-item[data-v-534131b3]:hover{background-color:#ffd83d;color:rgba(0,0,0,.7)}.navbar.is-warning .navbar-end .navbar-link[data-v-534131b3]:after,.navbar.is-warning .navbar-start .navbar-link[data-v-534131b3]:after{border-color:rgba(0,0,0,.7)}.navbar.is-warning .navbar-item.has-dropdown.is-active .navbar-link[data-v-534131b3],.navbar.is-warning .navbar-item.has-dropdown:hover .navbar-link[data-v-534131b3]{background-color:#ffd83d;color:rgba(0,0,0,.7)}.navbar.is-warning .navbar-dropdown a.navbar-item.is-active[data-v-534131b3]{background-color:#ffdd57;color:rgba(0,0,0,.7)}}.navbar.is-danger[data-v-534131b3]{background-color:#ff3860;color:#fff}.navbar.is-danger .navbar-brand .navbar-link[data-v-534131b3],.navbar.is-danger .navbar-brand>.navbar-item[data-v-534131b3]{color:#fff}.navbar.is-danger .navbar-brand .navbar-link.is-active[data-v-534131b3],.navbar.is-danger .navbar-brand .navbar-link[data-v-534131b3]:hover,.navbar.is-danger .navbar-brand>a.navbar-item.is-active[data-v-534131b3],.navbar.is-danger .navbar-brand>a.navbar-item[data-v-534131b3]:hover{background-color:#ff1f4b;color:#fff}.navbar.is-danger .navbar-brand .navbar-link[data-v-534131b3]:after{border-color:#fff}.navbar.is-danger .navbar-burger[data-v-534131b3]{color:#fff}@media screen and (min-width:1088px){.navbar.is-danger .navbar-end .navbar-link[data-v-534131b3],.navbar.is-danger .navbar-end>.navbar-item[data-v-534131b3],.navbar.is-danger .navbar-start .navbar-link[data-v-534131b3],.navbar.is-danger .navbar-start>.navbar-item[data-v-534131b3]{color:#fff}.navbar.is-danger .navbar-end .navbar-link.is-active[data-v-534131b3],.navbar.is-danger .navbar-end .navbar-link[data-v-534131b3]:hover,.navbar.is-danger .navbar-end>a.navbar-item.is-active[data-v-534131b3],.navbar.is-danger .navbar-end>a.navbar-item[data-v-534131b3]:hover,.navbar.is-danger .navbar-start .navbar-link.is-active[data-v-534131b3],.navbar.is-danger .navbar-start .navbar-link[data-v-534131b3]:hover,.navbar.is-danger .navbar-start>a.navbar-item.is-active[data-v-534131b3],.navbar.is-danger .navbar-start>a.navbar-item[data-v-534131b3]:hover{background-color:#ff1f4b;color:#fff}.navbar.is-danger .navbar-end .navbar-link[data-v-534131b3]:after,.navbar.is-danger .navbar-start .navbar-link[data-v-534131b3]:after{border-color:#fff}.navbar.is-danger .navbar-item.has-dropdown.is-active .navbar-link[data-v-534131b3],.navbar.is-danger .navbar-item.has-dropdown:hover .navbar-link[data-v-534131b3]{background-color:#ff1f4b;color:#fff}.navbar.is-danger .navbar-dropdown a.navbar-item.is-active[data-v-534131b3]{background-color:#ff3860;color:#fff}}.navbar>.container[data-v-534131b3]{align-items:stretch;display:flex;min-height:3.25rem;width:100%}.navbar.has-shadow[data-v-534131b3]{box-shadow:0 2px 0 0 #f5f5f5}.navbar.is-fixed-bottom[data-v-534131b3],.navbar.is-fixed-top[data-v-534131b3]{left:0;position:fixed;right:0;z-index:30}.navbar.is-fixed-bottom[data-v-534131b3]{bottom:0}.navbar.is-fixed-bottom.has-shadow[data-v-534131b3]{box-shadow:0 -2px 0 0 #f5f5f5}.navbar.is-fixed-top[data-v-534131b3]{top:0}body.has-navbar-fixed-top[data-v-534131b3],html.has-navbar-fixed-top[data-v-534131b3]{padding-top:3.25rem}body.has-navbar-fixed-bottom[data-v-534131b3],html.has-navbar-fixed-bottom[data-v-534131b3]{padding-bottom:3.25rem}.navbar-brand[data-v-534131b3],.navbar-tabs[data-v-534131b3]{align-items:stretch;display:flex;flex-shrink:0;min-height:3.25rem}.navbar-brand a.navbar-item[data-v-534131b3]:hover{background-color:transparent}.navbar-tabs[data-v-534131b3]{-webkit-overflow-scrolling:touch;max-width:100vw;overflow-x:auto;overflow-y:hidden}.navbar-burger[data-v-534131b3]{color:#4a4a4a;cursor:pointer;display:block;height:3.25rem;position:relative;width:3.25rem;margin-left:auto}.navbar-burger span[data-v-534131b3]{background-color:currentColor;display:block;height:1px;left:calc(50% - 8px);position:absolute;transform-origin:center;transition-duration:86ms;transition-property:background-color,opacity,transform;transition-timing-function:ease-out;width:16px}.navbar-burger span[data-v-534131b3]:first-child{top:calc(50% - 6px)}.navbar-burger span[data-v-534131b3]:nth-child(2){top:calc(50% - 1px)}.navbar-burger span[data-v-534131b3]:nth-child(3){top:calc(50% + 4px)}.navbar-burger[data-v-534131b3]:hover{background-color:rgba(0,0,0,.05)}.navbar-burger.is-active span[data-v-534131b3]:first-child{transform:translateY(5px) rotate(45deg)}.navbar-burger.is-active span[data-v-534131b3]:nth-child(2){opacity:0}.navbar-burger.is-active span[data-v-534131b3]:nth-child(3){transform:translateY(-5px) rotate(-45deg)}.navbar-menu[data-v-534131b3]{display:none}.navbar-item[data-v-534131b3],.navbar-link[data-v-534131b3]{color:#4a4a4a;display:block;line-height:1.5;padding:.5rem .75rem;position:relative}.navbar-item .icon[data-v-534131b3]:only-child,.navbar-link .icon[data-v-534131b3]:only-child{margin-left:-.25rem;margin-right:-.25rem}.navbar-link[data-v-534131b3],a.navbar-item[data-v-534131b3]{cursor:pointer}.navbar-link.is-active[data-v-534131b3],.navbar-link[data-v-534131b3]:hover,a.navbar-item.is-active[data-v-534131b3],a.navbar-item[data-v-534131b3]:hover{background-color:#fafafa;color:#3273dc}.navbar-item[data-v-534131b3]{display:block;flex-grow:0;flex-shrink:0}.navbar-item img[data-v-534131b3]{max-height:1.75rem}.navbar-item.has-dropdown[data-v-534131b3]{padding:0}.navbar-item.is-expanded[data-v-534131b3]{flex-grow:1;flex-shrink:1}.navbar-item.is-tab[data-v-534131b3]{border-bottom:1px solid transparent;min-height:3.25rem;padding-bottom:calc(.5rem - 1px)}.navbar-item.is-tab.is-active[data-v-534131b3],.navbar-item.is-tab[data-v-534131b3]:hover{background-color:transparent;border-bottom-color:#3273dc}.navbar-item.is-tab.is-active[data-v-534131b3]{border-bottom-style:solid;border-bottom-width:3px;color:#3273dc;padding-bottom:calc(.5rem - 3px)}.navbar-content[data-v-534131b3]{flex-grow:1;flex-shrink:1}.navbar-link[data-v-534131b3]:not(.is-arrowless){padding-right:2.5em}.navbar-link[data-v-534131b3]:not(.is-arrowless):after{border-color:#3273dc;margin-top:-.375em;right:1.125em}.navbar-dropdown[data-v-534131b3]{font-size:.875rem;padding-bottom:.5rem;padding-top:.5rem}.navbar-dropdown .navbar-item[data-v-534131b3]{padding-left:1.5rem;padding-right:1.5rem}.navbar-divider[data-v-534131b3]{background-color:#f5f5f5;border:none;display:none;height:2px;margin:.5rem 0}@media screen and (max-width:1087px){.navbar>.container[data-v-534131b3]{display:block}.navbar-brand .navbar-item[data-v-534131b3],.navbar-tabs .navbar-item[data-v-534131b3]{align-items:center;display:flex}.navbar-link[data-v-534131b3]:after{display:none}.navbar-menu[data-v-534131b3]{background-color:#fff;box-shadow:0 8px 16px hsla(0,0%,4%,.1);padding:.5rem 0}.navbar-menu.is-active[data-v-534131b3]{display:block}.navbar.is-fixed-bottom-touch[data-v-534131b3],.navbar.is-fixed-top-touch[data-v-534131b3]{left:0;position:fixed;right:0;z-index:30}.navbar.is-fixed-bottom-touch[data-v-534131b3]{bottom:0}.navbar.is-fixed-bottom-touch.has-shadow[data-v-534131b3]{box-shadow:0 -2px 3px hsla(0,0%,4%,.1)}.navbar.is-fixed-top-touch[data-v-534131b3]{top:0}.navbar.is-fixed-top-touch .navbar-menu[data-v-534131b3],.navbar.is-fixed-top .navbar-menu[data-v-534131b3]{-webkit-overflow-scrolling:touch;max-height:calc(100vh - 3.25rem);overflow:auto}body.has-navbar-fixed-top-touch[data-v-534131b3],html.has-navbar-fixed-top-touch[data-v-534131b3]{padding-top:3.25rem}body.has-navbar-fixed-bottom-touch[data-v-534131b3],html.has-navbar-fixed-bottom-touch[data-v-534131b3]{padding-bottom:3.25rem}}@media screen and (min-width:1088px){.navbar-end[data-v-534131b3],.navbar-menu[data-v-534131b3],.navbar-start[data-v-534131b3],.navbar[data-v-534131b3]{align-items:stretch;display:flex}.navbar[data-v-534131b3]{min-height:3.25rem}.navbar.is-spaced[data-v-534131b3]{padding:1rem 2rem}.navbar.is-spaced .navbar-end[data-v-534131b3],.navbar.is-spaced .navbar-start[data-v-534131b3]{align-items:center}.navbar.is-spaced .navbar-link[data-v-534131b3],.navbar.is-spaced a.navbar-item[data-v-534131b3]{border-radius:4px}.navbar.is-transparent .navbar-item.has-dropdown.is-active .navbar-link[data-v-534131b3],.navbar.is-transparent .navbar-item.has-dropdown.is-hoverable:hover .navbar-link[data-v-534131b3],.navbar.is-transparent .navbar-link.is-active[data-v-534131b3],.navbar.is-transparent .navbar-link[data-v-534131b3]:hover,.navbar.is-transparent a.navbar-item.is-active[data-v-534131b3],.navbar.is-transparent a.navbar-item[data-v-534131b3]:hover{background-color:transparent!important}.navbar.is-transparent .navbar-dropdown a.navbar-item[data-v-534131b3]:hover{background-color:#f5f5f5;color:#0a0a0a}.navbar.is-transparent .navbar-dropdown a.navbar-item.is-active[data-v-534131b3]{background-color:#f5f5f5;color:#3273dc}.navbar-burger[data-v-534131b3]{display:none}.navbar-item[data-v-534131b3],.navbar-link[data-v-534131b3]{align-items:center;display:flex}.navbar-item[data-v-534131b3]{display:flex}.navbar-item.has-dropdown[data-v-534131b3]{align-items:stretch}.navbar-item.has-dropdown-up .navbar-link[data-v-534131b3]:after{transform:rotate(135deg) translate(.25em,-.25em)}.navbar-item.has-dropdown-up .navbar-dropdown[data-v-534131b3]{border-bottom:2px solid #dbdbdb;border-radius:6px 6px 0 0;border-top:none;bottom:100%;box-shadow:0 -8px 8px hsla(0,0%,4%,.1);top:auto}.navbar-item.is-active .navbar-dropdown[data-v-534131b3],.navbar-item.is-hoverable:hover .navbar-dropdown[data-v-534131b3]{display:block}.navbar-item.is-active .navbar-dropdown.is-boxed[data-v-534131b3],.navbar-item.is-hoverable:hover .navbar-dropdown.is-boxed[data-v-534131b3],.navbar.is-spaced .navbar-item.is-active .navbar-dropdown[data-v-534131b3],.navbar.is-spaced .navbar-item.is-hoverable:hover .navbar-dropdown[data-v-534131b3]{opacity:1;pointer-events:auto;transform:translateY(0)}.navbar-menu[data-v-534131b3]{flex-grow:1;flex-shrink:0}.navbar-start[data-v-534131b3]{justify-content:flex-start;margin-right:auto}.navbar-end[data-v-534131b3]{justify-content:flex-end;margin-left:auto}.navbar-dropdown[data-v-534131b3]{background-color:#fff;border-bottom-left-radius:6px;border-bottom-right-radius:6px;border-top:2px solid #dbdbdb;box-shadow:0 8px 8px hsla(0,0%,4%,.1);display:none;font-size:.875rem;left:0;min-width:100%;position:absolute;top:100%;z-index:20}.navbar-dropdown .navbar-item[data-v-534131b3]{padding:.375rem 1rem;white-space:nowrap}.navbar-dropdown a.navbar-item[data-v-534131b3]{padding-right:3rem}.navbar-dropdown a.navbar-item[data-v-534131b3]:hover{background-color:#f5f5f5;color:#0a0a0a}.navbar-dropdown a.navbar-item.is-active[data-v-534131b3]{background-color:#f5f5f5;color:#3273dc}.navbar-dropdown.is-boxed[data-v-534131b3],.navbar.is-spaced .navbar-dropdown[data-v-534131b3]{border-radius:6px;border-top:none;box-shadow:0 8px 8px hsla(0,0%,4%,.1),0 0 0 1px hsla(0,0%,4%,.1);display:block;opacity:0;pointer-events:none;top:calc(100% + -4px);transform:translateY(-5px);transition-duration:86ms;transition-property:opacity,transform}.navbar-dropdown.is-right[data-v-534131b3]{left:auto;right:0}.navbar-divider[data-v-534131b3]{display:block}.container>.navbar .navbar-brand[data-v-534131b3],.navbar>.container .navbar-brand[data-v-534131b3]{margin-left:-.75rem}.container>.navbar .navbar-menu[data-v-534131b3],.navbar>.container .navbar-menu[data-v-534131b3]{margin-right:-.75rem}.navbar.is-fixed-bottom-desktop[data-v-534131b3],.navbar.is-fixed-top-desktop[data-v-534131b3]{left:0;position:fixed;right:0;z-index:30}.navbar.is-fixed-bottom-desktop[data-v-534131b3]{bottom:0}.navbar.is-fixed-bottom-desktop.has-shadow[data-v-534131b3]{box-shadow:0 -2px 3px hsla(0,0%,4%,.1)}.navbar.is-fixed-top-desktop[data-v-534131b3]{top:0}body.has-navbar-fixed-top-desktop[data-v-534131b3],html.has-navbar-fixed-top-desktop[data-v-534131b3]{padding-top:3.25rem}body.has-navbar-fixed-bottom-desktop[data-v-534131b3],html.has-navbar-fixed-bottom-desktop[data-v-534131b3]{padding-bottom:3.25rem}body.has-spaced-navbar-fixed-top[data-v-534131b3],html.has-spaced-navbar-fixed-top[data-v-534131b3]{padding-top:5.25rem}body.has-spaced-navbar-fixed-bottom[data-v-534131b3],html.has-spaced-navbar-fixed-bottom[data-v-534131b3]{padding-bottom:5.25rem}.navbar-link.is-active[data-v-534131b3],a.navbar-item.is-active[data-v-534131b3]{color:#0a0a0a}.navbar-link.is-active[data-v-534131b3]:not(:hover),a.navbar-item.is-active[data-v-534131b3]:not(:hover){background-color:transparent}.navbar-item.has-dropdown.is-active .navbar-link[data-v-534131b3],.navbar-item.has-dropdown:hover .navbar-link[data-v-534131b3]{background-color:#fafafa}}.pagination[data-v-534131b3]{font-size:1rem;margin:-.25rem}.pagination.is-small[data-v-534131b3]{font-size:.75rem}.pagination.is-medium[data-v-534131b3]{font-size:1.25rem}.pagination.is-large[data-v-534131b3]{font-size:1.5rem}.pagination.is-rounded .pagination-next[data-v-534131b3],.pagination.is-rounded .pagination-previous[data-v-534131b3]{padding-left:1em;padding-right:1em;border-radius:290486px}.pagination.is-rounded .pagination-link[data-v-534131b3]{border-radius:290486px}.pagination-list[data-v-534131b3],.pagination[data-v-534131b3]{align-items:center;display:flex;justify-content:center;text-align:center}.pagination-ellipsis[data-v-534131b3],.pagination-link[data-v-534131b3],.pagination-next[data-v-534131b3],.pagination-previous[data-v-534131b3]{font-size:1em;padding-left:.5em;padding-right:.5em;justify-content:center;margin:.25rem;text-align:center}.pagination-link[data-v-534131b3],.pagination-next[data-v-534131b3],.pagination-previous[data-v-534131b3]{border-color:#dbdbdb;color:#363636;min-width:2.25em}.pagination-link[data-v-534131b3]:hover,.pagination-next[data-v-534131b3]:hover,.pagination-previous[data-v-534131b3]:hover{border-color:#b5b5b5;color:#363636}.pagination-link[data-v-534131b3]:focus,.pagination-next[data-v-534131b3]:focus,.pagination-previous[data-v-534131b3]:focus{border-color:#3273dc}.pagination-link[data-v-534131b3]:active,.pagination-next[data-v-534131b3]:active,.pagination-previous[data-v-534131b3]:active{box-shadow:inset 0 1px 2px hsla(0,0%,4%,.2)}.pagination-link[disabled][data-v-534131b3],.pagination-next[disabled][data-v-534131b3],.pagination-previous[disabled][data-v-534131b3]{background-color:#dbdbdb;border-color:#dbdbdb;box-shadow:none;color:#7a7a7a;opacity:.5}.pagination-next[data-v-534131b3],.pagination-previous[data-v-534131b3]{padding-left:.75em;padding-right:.75em;white-space:nowrap}.pagination-link.is-current[data-v-534131b3]{background-color:#3273dc;border-color:#3273dc;color:#fff}.pagination-ellipsis[data-v-534131b3]{color:#b5b5b5;pointer-events:none}.pagination-list[data-v-534131b3]{flex-wrap:wrap}@media screen and (max-width:768px){.pagination[data-v-534131b3]{flex-wrap:wrap}.pagination-list li[data-v-534131b3],.pagination-next[data-v-534131b3],.pagination-previous[data-v-534131b3]{flex-grow:1;flex-shrink:1}}@media print,screen and (min-width:769px){.pagination-list[data-v-534131b3]{flex-grow:1;flex-shrink:1;justify-content:flex-start;order:1}.pagination-previous[data-v-534131b3]{order:2}.pagination-next[data-v-534131b3]{order:3}.pagination[data-v-534131b3]{justify-content:space-between}.pagination.is-centered .pagination-previous[data-v-534131b3]{order:1}.pagination.is-centered .pagination-list[data-v-534131b3]{justify-content:center;order:2}.pagination.is-centered .pagination-next[data-v-534131b3]{order:3}.pagination.is-right .pagination-previous[data-v-534131b3]{order:1}.pagination.is-right .pagination-next[data-v-534131b3]{order:2}.pagination.is-right .pagination-list[data-v-534131b3]{justify-content:flex-end;order:3}}.panel[data-v-534131b3]{font-size:1rem}.panel[data-v-534131b3]:not(:last-child){margin-bottom:1.5rem}.panel-block[data-v-534131b3],.panel-heading[data-v-534131b3],.panel-tabs[data-v-534131b3]{border-bottom:1px solid #dbdbdb;border-left:1px solid #dbdbdb;border-right:1px solid #dbdbdb}.panel-block[data-v-534131b3]:first-child,.panel-heading[data-v-534131b3]:first-child,.panel-tabs[data-v-534131b3]:first-child{border-top:1px solid #dbdbdb}.panel-heading[data-v-534131b3]{background-color:#f5f5f5;border-radius:4px 4px 0 0;color:#363636;font-size:1.25em;font-weight:300;line-height:1.25;padding:.5em .75em}.panel-tabs[data-v-534131b3]{align-items:flex-end;display:flex;font-size:.875em;justify-content:center}.panel-tabs a[data-v-534131b3]{border-bottom:1px solid #dbdbdb;margin-bottom:-1px;padding:.5em}.panel-tabs a.is-active[data-v-534131b3]{border-bottom-color:#4a4a4a;color:#363636}.panel-list a[data-v-534131b3]{color:#4a4a4a}.panel-list a[data-v-534131b3]:hover{color:#3273dc}.panel-block[data-v-534131b3]{align-items:center;color:#363636;display:flex;justify-content:flex-start;padding:.5em .75em}.panel-block input[type=checkbox][data-v-534131b3]{margin-right:.75em}.panel-block>.control[data-v-534131b3]{flex-grow:1;flex-shrink:1;width:100%}.panel-block.is-wrapped[data-v-534131b3]{flex-wrap:wrap}.panel-block.is-active[data-v-534131b3]{border-left-color:#3273dc;color:#363636}.panel-block.is-active .panel-icon[data-v-534131b3]{color:#3273dc}a.panel-block[data-v-534131b3],label.panel-block[data-v-534131b3]{cursor:pointer}a.panel-block[data-v-534131b3]:hover,label.panel-block[data-v-534131b3]:hover{background-color:#f5f5f5}.panel-icon[data-v-534131b3]{display:inline-block;font-size:14px;height:1em;line-height:1em;text-align:center;vertical-align:top;width:1em;color:#7a7a7a;margin-right:.75em}.panel-icon .fa[data-v-534131b3]{font-size:inherit;line-height:inherit}.tabs[data-v-534131b3]{-webkit-overflow-scrolling:touch;align-items:stretch;display:flex;font-size:1rem;justify-content:space-between;overflow:hidden;overflow-x:auto;white-space:nowrap}.tabs a[data-v-534131b3]{align-items:center;border-bottom-color:#dbdbdb;border-bottom-style:solid;border-bottom-width:1px;color:#4a4a4a;display:flex;justify-content:center;margin-bottom:-1px;padding:.5em 1em;vertical-align:top}.tabs a[data-v-534131b3]:hover{border-bottom-color:#363636;color:#363636}.tabs li[data-v-534131b3]{display:block}.tabs li.is-active a[data-v-534131b3]{border-bottom-color:#3273dc;color:#3273dc}.tabs ul[data-v-534131b3]{align-items:center;border-bottom-color:#dbdbdb;border-bottom-style:solid;border-bottom-width:1px;display:flex;flex-grow:1;flex-shrink:0;justify-content:flex-start}.tabs ul.is-left[data-v-534131b3]{padding-right:.75em}.tabs ul.is-center[data-v-534131b3]{flex:none;justify-content:center;padding-left:.75em;padding-right:.75em}.tabs ul.is-right[data-v-534131b3]{justify-content:flex-end;padding-left:.75em}.tabs .icon[data-v-534131b3]:first-child{margin-right:.5em}.tabs .icon[data-v-534131b3]:last-child{margin-left:.5em}.tabs.is-centered ul[data-v-534131b3]{justify-content:center}.tabs.is-right ul[data-v-534131b3]{justify-content:flex-end}.tabs.is-boxed a[data-v-534131b3]{border:1px solid transparent;border-radius:4px 4px 0 0}.tabs.is-boxed a[data-v-534131b3]:hover{background-color:#f5f5f5;border-bottom-color:#dbdbdb}.tabs.is-boxed li.is-active a[data-v-534131b3]{background-color:#fff;border-color:#dbdbdb;border-bottom-color:transparent!important}.tabs.is-fullwidth li[data-v-534131b3]{flex-grow:1;flex-shrink:0}.tabs.is-toggle a[data-v-534131b3]{border:1px solid #dbdbdb;margin-bottom:0;position:relative}.tabs.is-toggle a[data-v-534131b3]:hover{background-color:#f5f5f5;border-color:#b5b5b5;z-index:2}.tabs.is-toggle li+li[data-v-534131b3]{margin-left:-1px}.tabs.is-toggle li:first-child a[data-v-534131b3]{border-radius:4px 0 0 4px}.tabs.is-toggle li:last-child a[data-v-534131b3]{border-radius:0 4px 4px 0}.tabs.is-toggle li.is-active a[data-v-534131b3]{background-color:#3273dc;border-color:#3273dc;color:#fff;z-index:1}.tabs.is-toggle ul[data-v-534131b3]{border-bottom:none}.tabs.is-toggle.is-toggle-rounded li:first-child a[data-v-534131b3]{border-bottom-left-radius:290486px;border-top-left-radius:290486px;padding-left:1.25em}.tabs.is-toggle.is-toggle-rounded li:last-child a[data-v-534131b3]{border-bottom-right-radius:290486px;border-top-right-radius:290486px;padding-right:1.25em}.tabs.is-small[data-v-534131b3]{font-size:.75rem}.tabs.is-medium[data-v-534131b3]{font-size:1.25rem}.tabs.is-large[data-v-534131b3]{font-size:1.5rem}.column[data-v-534131b3]{display:block;flex-basis:0;flex-grow:1;flex-shrink:1;padding:.75rem}.columns.is-mobile>.column.is-narrow[data-v-534131b3]{flex:none}.columns.is-mobile>.column.is-full[data-v-534131b3]{flex:none;width:100%}.columns.is-mobile>.column.is-three-quarters[data-v-534131b3]{flex:none;width:75%}.columns.is-mobile>.column.is-two-thirds[data-v-534131b3]{flex:none;width:66.6666%}.columns.is-mobile>.column.is-half[data-v-534131b3]{flex:none;width:50%}.columns.is-mobile>.column.is-one-third[data-v-534131b3]{flex:none;width:33.3333%}.columns.is-mobile>.column.is-one-quarter[data-v-534131b3]{flex:none;width:25%}.columns.is-mobile>.column.is-one-fifth[data-v-534131b3]{flex:none;width:20%}.columns.is-mobile>.column.is-two-fifths[data-v-534131b3]{flex:none;width:40%}.columns.is-mobile>.column.is-three-fifths[data-v-534131b3]{flex:none;width:60%}.columns.is-mobile>.column.is-four-fifths[data-v-534131b3]{flex:none;width:80%}.columns.is-mobile>.column.is-offset-three-quarters[data-v-534131b3]{margin-left:75%}.columns.is-mobile>.column.is-offset-two-thirds[data-v-534131b3]{margin-left:66.6666%}.columns.is-mobile>.column.is-offset-half[data-v-534131b3]{margin-left:50%}.columns.is-mobile>.column.is-offset-one-third[data-v-534131b3]{margin-left:33.3333%}.columns.is-mobile>.column.is-offset-one-quarter[data-v-534131b3]{margin-left:25%}.columns.is-mobile>.column.is-offset-one-fifth[data-v-534131b3]{margin-left:20%}.columns.is-mobile>.column.is-offset-two-fifths[data-v-534131b3]{margin-left:40%}.columns.is-mobile>.column.is-offset-three-fifths[data-v-534131b3]{margin-left:60%}.columns.is-mobile>.column.is-offset-four-fifths[data-v-534131b3]{margin-left:80%}.columns.is-mobile>.column.is-1[data-v-534131b3]{flex:none;width:8.33333%}.columns.is-mobile>.column.is-offset-1[data-v-534131b3]{margin-left:8.33333%}.columns.is-mobile>.column.is-2[data-v-534131b3]{flex:none;width:16.66667%}.columns.is-mobile>.column.is-offset-2[data-v-534131b3]{margin-left:16.66667%}.columns.is-mobile>.column.is-3[data-v-534131b3]{flex:none;width:25%}.columns.is-mobile>.column.is-offset-3[data-v-534131b3]{margin-left:25%}.columns.is-mobile>.column.is-4[data-v-534131b3]{flex:none;width:33.33333%}.columns.is-mobile>.column.is-offset-4[data-v-534131b3]{margin-left:33.33333%}.columns.is-mobile>.column.is-5[data-v-534131b3]{flex:none;width:41.66667%}.columns.is-mobile>.column.is-offset-5[data-v-534131b3]{margin-left:41.66667%}.columns.is-mobile>.column.is-6[data-v-534131b3]{flex:none;width:50%}.columns.is-mobile>.column.is-offset-6[data-v-534131b3]{margin-left:50%}.columns.is-mobile>.column.is-7[data-v-534131b3]{flex:none;width:58.33333%}.columns.is-mobile>.column.is-offset-7[data-v-534131b3]{margin-left:58.33333%}.columns.is-mobile>.column.is-8[data-v-534131b3]{flex:none;width:66.66667%}.columns.is-mobile>.column.is-offset-8[data-v-534131b3]{margin-left:66.66667%}.columns.is-mobile>.column.is-9[data-v-534131b3]{flex:none;width:75%}.columns.is-mobile>.column.is-offset-9[data-v-534131b3]{margin-left:75%}.columns.is-mobile>.column.is-10[data-v-534131b3]{flex:none;width:83.33333%}.columns.is-mobile>.column.is-offset-10[data-v-534131b3]{margin-left:83.33333%}.columns.is-mobile>.column.is-11[data-v-534131b3]{flex:none;width:91.66667%}.columns.is-mobile>.column.is-offset-11[data-v-534131b3]{margin-left:91.66667%}.columns.is-mobile>.column.is-12[data-v-534131b3]{flex:none;width:100%}.columns.is-mobile>.column.is-offset-12[data-v-534131b3]{margin-left:100%}@media screen and (max-width:768px){.column.is-narrow-mobile[data-v-534131b3]{flex:none}.column.is-full-mobile[data-v-534131b3]{flex:none;width:100%}.column.is-three-quarters-mobile[data-v-534131b3]{flex:none;width:75%}.column.is-two-thirds-mobile[data-v-534131b3]{flex:none;width:66.6666%}.column.is-half-mobile[data-v-534131b3]{flex:none;width:50%}.column.is-one-third-mobile[data-v-534131b3]{flex:none;width:33.3333%}.column.is-one-quarter-mobile[data-v-534131b3]{flex:none;width:25%}.column.is-one-fifth-mobile[data-v-534131b3]{flex:none;width:20%}.column.is-two-fifths-mobile[data-v-534131b3]{flex:none;width:40%}.column.is-three-fifths-mobile[data-v-534131b3]{flex:none;width:60%}.column.is-four-fifths-mobile[data-v-534131b3]{flex:none;width:80%}.column.is-offset-three-quarters-mobile[data-v-534131b3]{margin-left:75%}.column.is-offset-two-thirds-mobile[data-v-534131b3]{margin-left:66.6666%}.column.is-offset-half-mobile[data-v-534131b3]{margin-left:50%}.column.is-offset-one-third-mobile[data-v-534131b3]{margin-left:33.3333%}.column.is-offset-one-quarter-mobile[data-v-534131b3]{margin-left:25%}.column.is-offset-one-fifth-mobile[data-v-534131b3]{margin-left:20%}.column.is-offset-two-fifths-mobile[data-v-534131b3]{margin-left:40%}.column.is-offset-three-fifths-mobile[data-v-534131b3]{margin-left:60%}.column.is-offset-four-fifths-mobile[data-v-534131b3]{margin-left:80%}.column.is-1-mobile[data-v-534131b3]{flex:none;width:8.33333%}.column.is-offset-1-mobile[data-v-534131b3]{margin-left:8.33333%}.column.is-2-mobile[data-v-534131b3]{flex:none;width:16.66667%}.column.is-offset-2-mobile[data-v-534131b3]{margin-left:16.66667%}.column.is-3-mobile[data-v-534131b3]{flex:none;width:25%}.column.is-offset-3-mobile[data-v-534131b3]{margin-left:25%}.column.is-4-mobile[data-v-534131b3]{flex:none;width:33.33333%}.column.is-offset-4-mobile[data-v-534131b3]{margin-left:33.33333%}.column.is-5-mobile[data-v-534131b3]{flex:none;width:41.66667%}.column.is-offset-5-mobile[data-v-534131b3]{margin-left:41.66667%}.column.is-6-mobile[data-v-534131b3]{flex:none;width:50%}.column.is-offset-6-mobile[data-v-534131b3]{margin-left:50%}.column.is-7-mobile[data-v-534131b3]{flex:none;width:58.33333%}.column.is-offset-7-mobile[data-v-534131b3]{margin-left:58.33333%}.column.is-8-mobile[data-v-534131b3]{flex:none;width:66.66667%}.column.is-offset-8-mobile[data-v-534131b3]{margin-left:66.66667%}.column.is-9-mobile[data-v-534131b3]{flex:none;width:75%}.column.is-offset-9-mobile[data-v-534131b3]{margin-left:75%}.column.is-10-mobile[data-v-534131b3]{flex:none;width:83.33333%}.column.is-offset-10-mobile[data-v-534131b3]{margin-left:83.33333%}.column.is-11-mobile[data-v-534131b3]{flex:none;width:91.66667%}.column.is-offset-11-mobile[data-v-534131b3]{margin-left:91.66667%}.column.is-12-mobile[data-v-534131b3]{flex:none;width:100%}.column.is-offset-12-mobile[data-v-534131b3]{margin-left:100%}}@media print,screen and (min-width:769px){.column.is-narrow-tablet[data-v-534131b3],.column.is-narrow[data-v-534131b3]{flex:none}.column.is-full-tablet[data-v-534131b3],.column.is-full[data-v-534131b3]{flex:none;width:100%}.column.is-three-quarters-tablet[data-v-534131b3],.column.is-three-quarters[data-v-534131b3]{flex:none;width:75%}.column.is-two-thirds-tablet[data-v-534131b3],.column.is-two-thirds[data-v-534131b3]{flex:none;width:66.6666%}.column.is-half-tablet[data-v-534131b3],.column.is-half[data-v-534131b3]{flex:none;width:50%}.column.is-one-third-tablet[data-v-534131b3],.column.is-one-third[data-v-534131b3]{flex:none;width:33.3333%}.column.is-one-quarter-tablet[data-v-534131b3],.column.is-one-quarter[data-v-534131b3]{flex:none;width:25%}.column.is-one-fifth-tablet[data-v-534131b3],.column.is-one-fifth[data-v-534131b3]{flex:none;width:20%}.column.is-two-fifths-tablet[data-v-534131b3],.column.is-two-fifths[data-v-534131b3]{flex:none;width:40%}.column.is-three-fifths-tablet[data-v-534131b3],.column.is-three-fifths[data-v-534131b3]{flex:none;width:60%}.column.is-four-fifths-tablet[data-v-534131b3],.column.is-four-fifths[data-v-534131b3]{flex:none;width:80%}.column.is-offset-three-quarters-tablet[data-v-534131b3],.column.is-offset-three-quarters[data-v-534131b3]{margin-left:75%}.column.is-offset-two-thirds-tablet[data-v-534131b3],.column.is-offset-two-thirds[data-v-534131b3]{margin-left:66.6666%}.column.is-offset-half-tablet[data-v-534131b3],.column.is-offset-half[data-v-534131b3]{margin-left:50%}.column.is-offset-one-third-tablet[data-v-534131b3],.column.is-offset-one-third[data-v-534131b3]{margin-left:33.3333%}.column.is-offset-one-quarter-tablet[data-v-534131b3],.column.is-offset-one-quarter[data-v-534131b3]{margin-left:25%}.column.is-offset-one-fifth-tablet[data-v-534131b3],.column.is-offset-one-fifth[data-v-534131b3]{margin-left:20%}.column.is-offset-two-fifths-tablet[data-v-534131b3],.column.is-offset-two-fifths[data-v-534131b3]{margin-left:40%}.column.is-offset-three-fifths-tablet[data-v-534131b3],.column.is-offset-three-fifths[data-v-534131b3]{margin-left:60%}.column.is-offset-four-fifths-tablet[data-v-534131b3],.column.is-offset-four-fifths[data-v-534131b3]{margin-left:80%}.column.is-1-tablet[data-v-534131b3],.column.is-1[data-v-534131b3]{flex:none;width:8.33333%}.column.is-offset-1-tablet[data-v-534131b3],.column.is-offset-1[data-v-534131b3]{margin-left:8.33333%}.column.is-2-tablet[data-v-534131b3],.column.is-2[data-v-534131b3]{flex:none;width:16.66667%}.column.is-offset-2-tablet[data-v-534131b3],.column.is-offset-2[data-v-534131b3]{margin-left:16.66667%}.column.is-3-tablet[data-v-534131b3],.column.is-3[data-v-534131b3]{flex:none;width:25%}.column.is-offset-3-tablet[data-v-534131b3],.column.is-offset-3[data-v-534131b3]{margin-left:25%}.column.is-4-tablet[data-v-534131b3],.column.is-4[data-v-534131b3]{flex:none;width:33.33333%}.column.is-offset-4-tablet[data-v-534131b3],.column.is-offset-4[data-v-534131b3]{margin-left:33.33333%}.column.is-5-tablet[data-v-534131b3],.column.is-5[data-v-534131b3]{flex:none;width:41.66667%}.column.is-offset-5-tablet[data-v-534131b3],.column.is-offset-5[data-v-534131b3]{margin-left:41.66667%}.column.is-6-tablet[data-v-534131b3],.column.is-6[data-v-534131b3]{flex:none;width:50%}.column.is-offset-6-tablet[data-v-534131b3],.column.is-offset-6[data-v-534131b3]{margin-left:50%}.column.is-7-tablet[data-v-534131b3],.column.is-7[data-v-534131b3]{flex:none;width:58.33333%}.column.is-offset-7-tablet[data-v-534131b3],.column.is-offset-7[data-v-534131b3]{margin-left:58.33333%}.column.is-8-tablet[data-v-534131b3],.column.is-8[data-v-534131b3]{flex:none;width:66.66667%}.column.is-offset-8-tablet[data-v-534131b3],.column.is-offset-8[data-v-534131b3]{margin-left:66.66667%}.column.is-9-tablet[data-v-534131b3],.column.is-9[data-v-534131b3]{flex:none;width:75%}.column.is-offset-9-tablet[data-v-534131b3],.column.is-offset-9[data-v-534131b3]{margin-left:75%}.column.is-10-tablet[data-v-534131b3],.column.is-10[data-v-534131b3]{flex:none;width:83.33333%}.column.is-offset-10-tablet[data-v-534131b3],.column.is-offset-10[data-v-534131b3]{margin-left:83.33333%}.column.is-11-tablet[data-v-534131b3],.column.is-11[data-v-534131b3]{flex:none;width:91.66667%}.column.is-offset-11-tablet[data-v-534131b3],.column.is-offset-11[data-v-534131b3]{margin-left:91.66667%}.column.is-12-tablet[data-v-534131b3],.column.is-12[data-v-534131b3]{flex:none;width:100%}.column.is-offset-12-tablet[data-v-534131b3],.column.is-offset-12[data-v-534131b3]{margin-left:100%}}@media screen and (max-width:1087px){.column.is-narrow-touch[data-v-534131b3]{flex:none}.column.is-full-touch[data-v-534131b3]{flex:none;width:100%}.column.is-three-quarters-touch[data-v-534131b3]{flex:none;width:75%}.column.is-two-thirds-touch[data-v-534131b3]{flex:none;width:66.6666%}.column.is-half-touch[data-v-534131b3]{flex:none;width:50%}.column.is-one-third-touch[data-v-534131b3]{flex:none;width:33.3333%}.column.is-one-quarter-touch[data-v-534131b3]{flex:none;width:25%}.column.is-one-fifth-touch[data-v-534131b3]{flex:none;width:20%}.column.is-two-fifths-touch[data-v-534131b3]{flex:none;width:40%}.column.is-three-fifths-touch[data-v-534131b3]{flex:none;width:60%}.column.is-four-fifths-touch[data-v-534131b3]{flex:none;width:80%}.column.is-offset-three-quarters-touch[data-v-534131b3]{margin-left:75%}.column.is-offset-two-thirds-touch[data-v-534131b3]{margin-left:66.6666%}.column.is-offset-half-touch[data-v-534131b3]{margin-left:50%}.column.is-offset-one-third-touch[data-v-534131b3]{margin-left:33.3333%}.column.is-offset-one-quarter-touch[data-v-534131b3]{margin-left:25%}.column.is-offset-one-fifth-touch[data-v-534131b3]{margin-left:20%}.column.is-offset-two-fifths-touch[data-v-534131b3]{margin-left:40%}.column.is-offset-three-fifths-touch[data-v-534131b3]{margin-left:60%}.column.is-offset-four-fifths-touch[data-v-534131b3]{margin-left:80%}.column.is-1-touch[data-v-534131b3]{flex:none;width:8.33333%}.column.is-offset-1-touch[data-v-534131b3]{margin-left:8.33333%}.column.is-2-touch[data-v-534131b3]{flex:none;width:16.66667%}.column.is-offset-2-touch[data-v-534131b3]{margin-left:16.66667%}.column.is-3-touch[data-v-534131b3]{flex:none;width:25%}.column.is-offset-3-touch[data-v-534131b3]{margin-left:25%}.column.is-4-touch[data-v-534131b3]{flex:none;width:33.33333%}.column.is-offset-4-touch[data-v-534131b3]{margin-left:33.33333%}.column.is-5-touch[data-v-534131b3]{flex:none;width:41.66667%}.column.is-offset-5-touch[data-v-534131b3]{margin-left:41.66667%}.column.is-6-touch[data-v-534131b3]{flex:none;width:50%}.column.is-offset-6-touch[data-v-534131b3]{margin-left:50%}.column.is-7-touch[data-v-534131b3]{flex:none;width:58.33333%}.column.is-offset-7-touch[data-v-534131b3]{margin-left:58.33333%}.column.is-8-touch[data-v-534131b3]{flex:none;width:66.66667%}.column.is-offset-8-touch[data-v-534131b3]{margin-left:66.66667%}.column.is-9-touch[data-v-534131b3]{flex:none;width:75%}.column.is-offset-9-touch[data-v-534131b3]{margin-left:75%}.column.is-10-touch[data-v-534131b3]{flex:none;width:83.33333%}.column.is-offset-10-touch[data-v-534131b3]{margin-left:83.33333%}.column.is-11-touch[data-v-534131b3]{flex:none;width:91.66667%}.column.is-offset-11-touch[data-v-534131b3]{margin-left:91.66667%}.column.is-12-touch[data-v-534131b3]{flex:none;width:100%}.column.is-offset-12-touch[data-v-534131b3]{margin-left:100%}}@media screen and (min-width:1088px){.column.is-narrow-desktop[data-v-534131b3]{flex:none}.column.is-full-desktop[data-v-534131b3]{flex:none;width:100%}.column.is-three-quarters-desktop[data-v-534131b3]{flex:none;width:75%}.column.is-two-thirds-desktop[data-v-534131b3]{flex:none;width:66.6666%}.column.is-half-desktop[data-v-534131b3]{flex:none;width:50%}.column.is-one-third-desktop[data-v-534131b3]{flex:none;width:33.3333%}.column.is-one-quarter-desktop[data-v-534131b3]{flex:none;width:25%}.column.is-one-fifth-desktop[data-v-534131b3]{flex:none;width:20%}.column.is-two-fifths-desktop[data-v-534131b3]{flex:none;width:40%}.column.is-three-fifths-desktop[data-v-534131b3]{flex:none;width:60%}.column.is-four-fifths-desktop[data-v-534131b3]{flex:none;width:80%}.column.is-offset-three-quarters-desktop[data-v-534131b3]{margin-left:75%}.column.is-offset-two-thirds-desktop[data-v-534131b3]{margin-left:66.6666%}.column.is-offset-half-desktop[data-v-534131b3]{margin-left:50%}.column.is-offset-one-third-desktop[data-v-534131b3]{margin-left:33.3333%}.column.is-offset-one-quarter-desktop[data-v-534131b3]{margin-left:25%}.column.is-offset-one-fifth-desktop[data-v-534131b3]{margin-left:20%}.column.is-offset-two-fifths-desktop[data-v-534131b3]{margin-left:40%}.column.is-offset-three-fifths-desktop[data-v-534131b3]{margin-left:60%}.column.is-offset-four-fifths-desktop[data-v-534131b3]{margin-left:80%}.column.is-1-desktop[data-v-534131b3]{flex:none;width:8.33333%}.column.is-offset-1-desktop[data-v-534131b3]{margin-left:8.33333%}.column.is-2-desktop[data-v-534131b3]{flex:none;width:16.66667%}.column.is-offset-2-desktop[data-v-534131b3]{margin-left:16.66667%}.column.is-3-desktop[data-v-534131b3]{flex:none;width:25%}.column.is-offset-3-desktop[data-v-534131b3]{margin-left:25%}.column.is-4-desktop[data-v-534131b3]{flex:none;width:33.33333%}.column.is-offset-4-desktop[data-v-534131b3]{margin-left:33.33333%}.column.is-5-desktop[data-v-534131b3]{flex:none;width:41.66667%}.column.is-offset-5-desktop[data-v-534131b3]{margin-left:41.66667%}.column.is-6-desktop[data-v-534131b3]{flex:none;width:50%}.column.is-offset-6-desktop[data-v-534131b3]{margin-left:50%}.column.is-7-desktop[data-v-534131b3]{flex:none;width:58.33333%}.column.is-offset-7-desktop[data-v-534131b3]{margin-left:58.33333%}.column.is-8-desktop[data-v-534131b3]{flex:none;width:66.66667%}.column.is-offset-8-desktop[data-v-534131b3]{margin-left:66.66667%}.column.is-9-desktop[data-v-534131b3]{flex:none;width:75%}.column.is-offset-9-desktop[data-v-534131b3]{margin-left:75%}.column.is-10-desktop[data-v-534131b3]{flex:none;width:83.33333%}.column.is-offset-10-desktop[data-v-534131b3]{margin-left:83.33333%}.column.is-11-desktop[data-v-534131b3]{flex:none;width:91.66667%}.column.is-offset-11-desktop[data-v-534131b3]{margin-left:91.66667%}.column.is-12-desktop[data-v-534131b3]{flex:none;width:100%}.column.is-offset-12-desktop[data-v-534131b3]{margin-left:100%}}@media screen and (min-width:1280px){.column.is-narrow-widescreen[data-v-534131b3]{flex:none}.column.is-full-widescreen[data-v-534131b3]{flex:none;width:100%}.column.is-three-quarters-widescreen[data-v-534131b3]{flex:none;width:75%}.column.is-two-thirds-widescreen[data-v-534131b3]{flex:none;width:66.6666%}.column.is-half-widescreen[data-v-534131b3]{flex:none;width:50%}.column.is-one-third-widescreen[data-v-534131b3]{flex:none;width:33.3333%}.column.is-one-quarter-widescreen[data-v-534131b3]{flex:none;width:25%}.column.is-one-fifth-widescreen[data-v-534131b3]{flex:none;width:20%}.column.is-two-fifths-widescreen[data-v-534131b3]{flex:none;width:40%}.column.is-three-fifths-widescreen[data-v-534131b3]{flex:none;width:60%}.column.is-four-fifths-widescreen[data-v-534131b3]{flex:none;width:80%}.column.is-offset-three-quarters-widescreen[data-v-534131b3]{margin-left:75%}.column.is-offset-two-thirds-widescreen[data-v-534131b3]{margin-left:66.6666%}.column.is-offset-half-widescreen[data-v-534131b3]{margin-left:50%}.column.is-offset-one-third-widescreen[data-v-534131b3]{margin-left:33.3333%}.column.is-offset-one-quarter-widescreen[data-v-534131b3]{margin-left:25%}.column.is-offset-one-fifth-widescreen[data-v-534131b3]{margin-left:20%}.column.is-offset-two-fifths-widescreen[data-v-534131b3]{margin-left:40%}.column.is-offset-three-fifths-widescreen[data-v-534131b3]{margin-left:60%}.column.is-offset-four-fifths-widescreen[data-v-534131b3]{margin-left:80%}.column.is-1-widescreen[data-v-534131b3]{flex:none;width:8.33333%}.column.is-offset-1-widescreen[data-v-534131b3]{margin-left:8.33333%}.column.is-2-widescreen[data-v-534131b3]{flex:none;width:16.66667%}.column.is-offset-2-widescreen[data-v-534131b3]{margin-left:16.66667%}.column.is-3-widescreen[data-v-534131b3]{flex:none;width:25%}.column.is-offset-3-widescreen[data-v-534131b3]{margin-left:25%}.column.is-4-widescreen[data-v-534131b3]{flex:none;width:33.33333%}.column.is-offset-4-widescreen[data-v-534131b3]{margin-left:33.33333%}.column.is-5-widescreen[data-v-534131b3]{flex:none;width:41.66667%}.column.is-offset-5-widescreen[data-v-534131b3]{margin-left:41.66667%}.column.is-6-widescreen[data-v-534131b3]{flex:none;width:50%}.column.is-offset-6-widescreen[data-v-534131b3]{margin-left:50%}.column.is-7-widescreen[data-v-534131b3]{flex:none;width:58.33333%}.column.is-offset-7-widescreen[data-v-534131b3]{margin-left:58.33333%}.column.is-8-widescreen[data-v-534131b3]{flex:none;width:66.66667%}.column.is-offset-8-widescreen[data-v-534131b3]{margin-left:66.66667%}.column.is-9-widescreen[data-v-534131b3]{flex:none;width:75%}.column.is-offset-9-widescreen[data-v-534131b3]{margin-left:75%}.column.is-10-widescreen[data-v-534131b3]{flex:none;width:83.33333%}.column.is-offset-10-widescreen[data-v-534131b3]{margin-left:83.33333%}.column.is-11-widescreen[data-v-534131b3]{flex:none;width:91.66667%}.column.is-offset-11-widescreen[data-v-534131b3]{margin-left:91.66667%}.column.is-12-widescreen[data-v-534131b3]{flex:none;width:100%}.column.is-offset-12-widescreen[data-v-534131b3]{margin-left:100%}}@media screen and (min-width:1472px){.column.is-narrow-fullhd[data-v-534131b3]{flex:none}.column.is-full-fullhd[data-v-534131b3]{flex:none;width:100%}.column.is-three-quarters-fullhd[data-v-534131b3]{flex:none;width:75%}.column.is-two-thirds-fullhd[data-v-534131b3]{flex:none;width:66.6666%}.column.is-half-fullhd[data-v-534131b3]{flex:none;width:50%}.column.is-one-third-fullhd[data-v-534131b3]{flex:none;width:33.3333%}.column.is-one-quarter-fullhd[data-v-534131b3]{flex:none;width:25%}.column.is-one-fifth-fullhd[data-v-534131b3]{flex:none;width:20%}.column.is-two-fifths-fullhd[data-v-534131b3]{flex:none;width:40%}.column.is-three-fifths-fullhd[data-v-534131b3]{flex:none;width:60%}.column.is-four-fifths-fullhd[data-v-534131b3]{flex:none;width:80%}.column.is-offset-three-quarters-fullhd[data-v-534131b3]{margin-left:75%}.column.is-offset-two-thirds-fullhd[data-v-534131b3]{margin-left:66.6666%}.column.is-offset-half-fullhd[data-v-534131b3]{margin-left:50%}.column.is-offset-one-third-fullhd[data-v-534131b3]{margin-left:33.3333%}.column.is-offset-one-quarter-fullhd[data-v-534131b3]{margin-left:25%}.column.is-offset-one-fifth-fullhd[data-v-534131b3]{margin-left:20%}.column.is-offset-two-fifths-fullhd[data-v-534131b3]{margin-left:40%}.column.is-offset-three-fifths-fullhd[data-v-534131b3]{margin-left:60%}.column.is-offset-four-fifths-fullhd[data-v-534131b3]{margin-left:80%}.column.is-1-fullhd[data-v-534131b3]{flex:none;width:8.33333%}.column.is-offset-1-fullhd[data-v-534131b3]{margin-left:8.33333%}.column.is-2-fullhd[data-v-534131b3]{flex:none;width:16.66667%}.column.is-offset-2-fullhd[data-v-534131b3]{margin-left:16.66667%}.column.is-3-fullhd[data-v-534131b3]{flex:none;width:25%}.column.is-offset-3-fullhd[data-v-534131b3]{margin-left:25%}.column.is-4-fullhd[data-v-534131b3]{flex:none;width:33.33333%}.column.is-offset-4-fullhd[data-v-534131b3]{margin-left:33.33333%}.column.is-5-fullhd[data-v-534131b3]{flex:none;width:41.66667%}.column.is-offset-5-fullhd[data-v-534131b3]{margin-left:41.66667%}.column.is-6-fullhd[data-v-534131b3]{flex:none;width:50%}.column.is-offset-6-fullhd[data-v-534131b3]{margin-left:50%}.column.is-7-fullhd[data-v-534131b3]{flex:none;width:58.33333%}.column.is-offset-7-fullhd[data-v-534131b3]{margin-left:58.33333%}.column.is-8-fullhd[data-v-534131b3]{flex:none;width:66.66667%}.column.is-offset-8-fullhd[data-v-534131b3]{margin-left:66.66667%}.column.is-9-fullhd[data-v-534131b3]{flex:none;width:75%}.column.is-offset-9-fullhd[data-v-534131b3]{margin-left:75%}.column.is-10-fullhd[data-v-534131b3]{flex:none;width:83.33333%}.column.is-offset-10-fullhd[data-v-534131b3]{margin-left:83.33333%}.column.is-11-fullhd[data-v-534131b3]{flex:none;width:91.66667%}.column.is-offset-11-fullhd[data-v-534131b3]{margin-left:91.66667%}.column.is-12-fullhd[data-v-534131b3]{flex:none;width:100%}.column.is-offset-12-fullhd[data-v-534131b3]{margin-left:100%}}.columns[data-v-534131b3]{margin-left:-.75rem;margin-right:-.75rem;margin-top:-.75rem}.columns[data-v-534131b3]:last-child{margin-bottom:-.75rem}.columns[data-v-534131b3]:not(:last-child){margin-bottom:0.75rem}.columns.is-centered[data-v-534131b3]{justify-content:center}.columns.is-gapless[data-v-534131b3]{margin-left:0;margin-right:0;margin-top:0}.columns.is-gapless>.column[data-v-534131b3]{margin:0;padding:0!important}.columns.is-gapless[data-v-534131b3]:not(:last-child){margin-bottom:1.5rem}.columns.is-gapless[data-v-534131b3]:last-child{margin-bottom:0}.columns.is-mobile[data-v-534131b3]{display:flex}.columns.is-multiline[data-v-534131b3]{flex-wrap:wrap}.columns.is-vcentered[data-v-534131b3]{align-items:center}@media print,screen and (min-width:769px){.columns[data-v-534131b3]:not(.is-desktop){display:flex}}@media screen and (min-width:1088px){.columns.is-desktop[data-v-534131b3]{display:flex}}.columns.is-variable[data-v-534131b3]{--columnGap:0.75rem;margin-left:calc(-1 * var(--columnGap));margin-right:calc(-1 * var(--columnGap))}.columns.is-variable .column[data-v-534131b3]{padding-left:var(--columnGap);padding-right:var(--columnGap)}.columns.is-variable.is-0[data-v-534131b3]{--columnGap:0rem}@media screen and (max-width:768px){.columns.is-variable.is-0-mobile[data-v-534131b3]{--columnGap:0rem}}@media print,screen and (min-width:769px){.columns.is-variable.is-0-tablet[data-v-534131b3]{--columnGap:0rem}}@media screen and (min-width:769px) and (max-width:1087px){.columns.is-variable.is-0-tablet-only[data-v-534131b3]{--columnGap:0rem}}@media screen and (max-width:1087px){.columns.is-variable.is-0-touch[data-v-534131b3]{--columnGap:0rem}}@media screen and (min-width:1088px){.columns.is-variable.is-0-desktop[data-v-534131b3]{--columnGap:0rem}}@media screen and (min-width:1088px) and (max-width:1279px){.columns.is-variable.is-0-desktop-only[data-v-534131b3]{--columnGap:0rem}}@media screen and (min-width:1280px){.columns.is-variable.is-0-widescreen[data-v-534131b3]{--columnGap:0rem}}@media screen and (min-width:1280px) and (max-width:1471px){.columns.is-variable.is-0-widescreen-only[data-v-534131b3]{--columnGap:0rem}}@media screen and (min-width:1472px){.columns.is-variable.is-0-fullhd[data-v-534131b3]{--columnGap:0rem}}.columns.is-variable.is-1[data-v-534131b3]{--columnGap:.25rem}@media screen and (max-width:768px){.columns.is-variable.is-1-mobile[data-v-534131b3]{--columnGap:.25rem}}@media print,screen and (min-width:769px){.columns.is-variable.is-1-tablet[data-v-534131b3]{--columnGap:.25rem}}@media screen and (min-width:769px) and (max-width:1087px){.columns.is-variable.is-1-tablet-only[data-v-534131b3]{--columnGap:.25rem}}@media screen and (max-width:1087px){.columns.is-variable.is-1-touch[data-v-534131b3]{--columnGap:.25rem}}@media screen and (min-width:1088px){.columns.is-variable.is-1-desktop[data-v-534131b3]{--columnGap:.25rem}}@media screen and (min-width:1088px) and (max-width:1279px){.columns.is-variable.is-1-desktop-only[data-v-534131b3]{--columnGap:.25rem}}@media screen and (min-width:1280px){.columns.is-variable.is-1-widescreen[data-v-534131b3]{--columnGap:.25rem}}@media screen and (min-width:1280px) and (max-width:1471px){.columns.is-variable.is-1-widescreen-only[data-v-534131b3]{--columnGap:.25rem}}@media screen and (min-width:1472px){.columns.is-variable.is-1-fullhd[data-v-534131b3]{--columnGap:.25rem}}.columns.is-variable.is-2[data-v-534131b3]{--columnGap:.5rem}@media screen and (max-width:768px){.columns.is-variable.is-2-mobile[data-v-534131b3]{--columnGap:.5rem}}@media print,screen and (min-width:769px){.columns.is-variable.is-2-tablet[data-v-534131b3]{--columnGap:.5rem}}@media screen and (min-width:769px) and (max-width:1087px){.columns.is-variable.is-2-tablet-only[data-v-534131b3]{--columnGap:.5rem}}@media screen and (max-width:1087px){.columns.is-variable.is-2-touch[data-v-534131b3]{--columnGap:.5rem}}@media screen and (min-width:1088px){.columns.is-variable.is-2-desktop[data-v-534131b3]{--columnGap:.5rem}}@media screen and (min-width:1088px) and (max-width:1279px){.columns.is-variable.is-2-desktop-only[data-v-534131b3]{--columnGap:.5rem}}@media screen and (min-width:1280px){.columns.is-variable.is-2-widescreen[data-v-534131b3]{--columnGap:.5rem}}@media screen and (min-width:1280px) and (max-width:1471px){.columns.is-variable.is-2-widescreen-only[data-v-534131b3]{--columnGap:.5rem}}@media screen and (min-width:1472px){.columns.is-variable.is-2-fullhd[data-v-534131b3]{--columnGap:.5rem}}.columns.is-variable.is-3[data-v-534131b3]{--columnGap:.75rem}@media screen and (max-width:768px){.columns.is-variable.is-3-mobile[data-v-534131b3]{--columnGap:.75rem}}@media print,screen and (min-width:769px){.columns.is-variable.is-3-tablet[data-v-534131b3]{--columnGap:.75rem}}@media screen and (min-width:769px) and (max-width:1087px){.columns.is-variable.is-3-tablet-only[data-v-534131b3]{--columnGap:.75rem}}@media screen and (max-width:1087px){.columns.is-variable.is-3-touch[data-v-534131b3]{--columnGap:.75rem}}@media screen and (min-width:1088px){.columns.is-variable.is-3-desktop[data-v-534131b3]{--columnGap:.75rem}}@media screen and (min-width:1088px) and (max-width:1279px){.columns.is-variable.is-3-desktop-only[data-v-534131b3]{--columnGap:.75rem}}@media screen and (min-width:1280px){.columns.is-variable.is-3-widescreen[data-v-534131b3]{--columnGap:.75rem}}@media screen and (min-width:1280px) and (max-width:1471px){.columns.is-variable.is-3-widescreen-only[data-v-534131b3]{--columnGap:.75rem}}@media screen and (min-width:1472px){.columns.is-variable.is-3-fullhd[data-v-534131b3]{--columnGap:.75rem}}.columns.is-variable.is-4[data-v-534131b3]{--columnGap:1rem}@media screen and (max-width:768px){.columns.is-variable.is-4-mobile[data-v-534131b3]{--columnGap:1rem}}@media print,screen and (min-width:769px){.columns.is-variable.is-4-tablet[data-v-534131b3]{--columnGap:1rem}}@media screen and (min-width:769px) and (max-width:1087px){.columns.is-variable.is-4-tablet-only[data-v-534131b3]{--columnGap:1rem}}@media screen and (max-width:1087px){.columns.is-variable.is-4-touch[data-v-534131b3]{--columnGap:1rem}}@media screen and (min-width:1088px){.columns.is-variable.is-4-desktop[data-v-534131b3]{--columnGap:1rem}}@media screen and (min-width:1088px) and (max-width:1279px){.columns.is-variable.is-4-desktop-only[data-v-534131b3]{--columnGap:1rem}}@media screen and (min-width:1280px){.columns.is-variable.is-4-widescreen[data-v-534131b3]{--columnGap:1rem}}@media screen and (min-width:1280px) and (max-width:1471px){.columns.is-variable.is-4-widescreen-only[data-v-534131b3]{--columnGap:1rem}}@media screen and (min-width:1472px){.columns.is-variable.is-4-fullhd[data-v-534131b3]{--columnGap:1rem}}.columns.is-variable.is-5[data-v-534131b3]{--columnGap:1.25rem}@media screen and (max-width:768px){.columns.is-variable.is-5-mobile[data-v-534131b3]{--columnGap:1.25rem}}@media print,screen and (min-width:769px){.columns.is-variable.is-5-tablet[data-v-534131b3]{--columnGap:1.25rem}}@media screen and (min-width:769px) and (max-width:1087px){.columns.is-variable.is-5-tablet-only[data-v-534131b3]{--columnGap:1.25rem}}@media screen and (max-width:1087px){.columns.is-variable.is-5-touch[data-v-534131b3]{--columnGap:1.25rem}}@media screen and (min-width:1088px){.columns.is-variable.is-5-desktop[data-v-534131b3]{--columnGap:1.25rem}}@media screen and (min-width:1088px) and (max-width:1279px){.columns.is-variable.is-5-desktop-only[data-v-534131b3]{--columnGap:1.25rem}}@media screen and (min-width:1280px){.columns.is-variable.is-5-widescreen[data-v-534131b3]{--columnGap:1.25rem}}@media screen and (min-width:1280px) and (max-width:1471px){.columns.is-variable.is-5-widescreen-only[data-v-534131b3]{--columnGap:1.25rem}}@media screen and (min-width:1472px){.columns.is-variable.is-5-fullhd[data-v-534131b3]{--columnGap:1.25rem}}.columns.is-variable.is-6[data-v-534131b3]{--columnGap:1.5rem}@media screen and (max-width:768px){.columns.is-variable.is-6-mobile[data-v-534131b3]{--columnGap:1.5rem}}@media print,screen and (min-width:769px){.columns.is-variable.is-6-tablet[data-v-534131b3]{--columnGap:1.5rem}}@media screen and (min-width:769px) and (max-width:1087px){.columns.is-variable.is-6-tablet-only[data-v-534131b3]{--columnGap:1.5rem}}@media screen and (max-width:1087px){.columns.is-variable.is-6-touch[data-v-534131b3]{--columnGap:1.5rem}}@media screen and (min-width:1088px){.columns.is-variable.is-6-desktop[data-v-534131b3]{--columnGap:1.5rem}}@media screen and (min-width:1088px) and (max-width:1279px){.columns.is-variable.is-6-desktop-only[data-v-534131b3]{--columnGap:1.5rem}}@media screen and (min-width:1280px){.columns.is-variable.is-6-widescreen[data-v-534131b3]{--columnGap:1.5rem}}@media screen and (min-width:1280px) and (max-width:1471px){.columns.is-variable.is-6-widescreen-only[data-v-534131b3]{--columnGap:1.5rem}}@media screen and (min-width:1472px){.columns.is-variable.is-6-fullhd[data-v-534131b3]{--columnGap:1.5rem}}.columns.is-variable.is-7[data-v-534131b3]{--columnGap:1.75rem}@media screen and (max-width:768px){.columns.is-variable.is-7-mobile[data-v-534131b3]{--columnGap:1.75rem}}@media print,screen and (min-width:769px){.columns.is-variable.is-7-tablet[data-v-534131b3]{--columnGap:1.75rem}}@media screen and (min-width:769px) and (max-width:1087px){.columns.is-variable.is-7-tablet-only[data-v-534131b3]{--columnGap:1.75rem}}@media screen and (max-width:1087px){.columns.is-variable.is-7-touch[data-v-534131b3]{--columnGap:1.75rem}}@media screen and (min-width:1088px){.columns.is-variable.is-7-desktop[data-v-534131b3]{--columnGap:1.75rem}}@media screen and (min-width:1088px) and (max-width:1279px){.columns.is-variable.is-7-desktop-only[data-v-534131b3]{--columnGap:1.75rem}}@media screen and (min-width:1280px){.columns.is-variable.is-7-widescreen[data-v-534131b3]{--columnGap:1.75rem}}@media screen and (min-width:1280px) and (max-width:1471px){.columns.is-variable.is-7-widescreen-only[data-v-534131b3]{--columnGap:1.75rem}}@media screen and (min-width:1472px){.columns.is-variable.is-7-fullhd[data-v-534131b3]{--columnGap:1.75rem}}.columns.is-variable.is-8[data-v-534131b3]{--columnGap:2rem}@media screen and (max-width:768px){.columns.is-variable.is-8-mobile[data-v-534131b3]{--columnGap:2rem}}@media print,screen and (min-width:769px){.columns.is-variable.is-8-tablet[data-v-534131b3]{--columnGap:2rem}}@media screen and (min-width:769px) and (max-width:1087px){.columns.is-variable.is-8-tablet-only[data-v-534131b3]{--columnGap:2rem}}@media screen and (max-width:1087px){.columns.is-variable.is-8-touch[data-v-534131b3]{--columnGap:2rem}}@media screen and (min-width:1088px){.columns.is-variable.is-8-desktop[data-v-534131b3]{--columnGap:2rem}}@media screen and (min-width:1088px) and (max-width:1279px){.columns.is-variable.is-8-desktop-only[data-v-534131b3]{--columnGap:2rem}}@media screen and (min-width:1280px){.columns.is-variable.is-8-widescreen[data-v-534131b3]{--columnGap:2rem}}@media screen and (min-width:1280px) and (max-width:1471px){.columns.is-variable.is-8-widescreen-only[data-v-534131b3]{--columnGap:2rem}}@media screen and (min-width:1472px){.columns.is-variable.is-8-fullhd[data-v-534131b3]{--columnGap:2rem}}.tile[data-v-534131b3]{align-items:stretch;display:block;flex-basis:0;flex-grow:1;flex-shrink:1;min-height:min-content}.tile.is-ancestor[data-v-534131b3]{margin-left:-.75rem;margin-right:-.75rem;margin-top:-.75rem}.tile.is-ancestor[data-v-534131b3]:last-child{margin-bottom:-.75rem}.tile.is-ancestor[data-v-534131b3]:not(:last-child){margin-bottom:.75rem}.tile.is-child[data-v-534131b3]{margin:0!important}.tile.is-parent[data-v-534131b3]{padding:.75rem}.tile.is-vertical[data-v-534131b3]{flex-direction:column}.tile.is-vertical>.tile.is-child[data-v-534131b3]:not(:last-child){margin-bottom:1.5rem!important}@media print,screen and (min-width:769px){.tile[data-v-534131b3]:not(.is-child){display:flex}.tile.is-1[data-v-534131b3]{flex:none;width:8.33333%}.tile.is-2[data-v-534131b3]{flex:none;width:16.66667%}.tile.is-3[data-v-534131b3]{flex:none;width:25%}.tile.is-4[data-v-534131b3]{flex:none;width:33.33333%}.tile.is-5[data-v-534131b3]{flex:none;width:41.66667%}.tile.is-6[data-v-534131b3]{flex:none;width:50%}.tile.is-7[data-v-534131b3]{flex:none;width:58.33333%}.tile.is-8[data-v-534131b3]{flex:none;width:66.66667%}.tile.is-9[data-v-534131b3]{flex:none;width:75%}.tile.is-10[data-v-534131b3]{flex:none;width:83.33333%}.tile.is-11[data-v-534131b3]{flex:none;width:91.66667%}.tile.is-12[data-v-534131b3]{flex:none;width:100%}}.hero[data-v-534131b3]{align-items:stretch;display:flex;flex-direction:column;justify-content:space-between}.hero .navbar[data-v-534131b3]{background:none}.hero .tabs ul[data-v-534131b3]{border-bottom:none}.hero.is-white[data-v-534131b3]{background-color:#fff;color:#0a0a0a}.hero.is-white a[data-v-534131b3]:not(.button):not(.dropdown-item):not(.tag),.hero.is-white strong[data-v-534131b3]{color:inherit}.hero.is-white .title[data-v-534131b3]{color:#0a0a0a}.hero.is-white .subtitle[data-v-534131b3]{color:hsla(0,0%,4%,.9)}.hero.is-white .subtitle a[data-v-534131b3]:not(.button),.hero.is-white .subtitle strong[data-v-534131b3]{color:#0a0a0a}@media screen and (max-width:1087px){.hero.is-white .navbar-menu[data-v-534131b3]{background-color:#fff}}.hero.is-white .navbar-item[data-v-534131b3],.hero.is-white .navbar-link[data-v-534131b3]{color:hsla(0,0%,4%,.7)}.hero.is-white .navbar-link.is-active[data-v-534131b3],.hero.is-white .navbar-link[data-v-534131b3]:hover,.hero.is-white a.navbar-item.is-active[data-v-534131b3],.hero.is-white a.navbar-item[data-v-534131b3]:hover{background-color:#f2f2f2;color:#0a0a0a}.hero.is-white .tabs a[data-v-534131b3]{color:#0a0a0a;opacity:.9}.hero.is-white .tabs a[data-v-534131b3]:hover,.hero.is-white .tabs li.is-active a[data-v-534131b3]{opacity:1}.hero.is-white .tabs.is-boxed a[data-v-534131b3],.hero.is-white .tabs.is-toggle a[data-v-534131b3]{color:#0a0a0a}.hero.is-white .tabs.is-boxed a[data-v-534131b3]:hover,.hero.is-white .tabs.is-toggle a[data-v-534131b3]:hover{background-color:hsla(0,0%,4%,.1)}.hero.is-white .tabs.is-boxed li.is-active a[data-v-534131b3],.hero.is-white .tabs.is-boxed li.is-active a[data-v-534131b3]:hover,.hero.is-white .tabs.is-toggle li.is-active a[data-v-534131b3],.hero.is-white .tabs.is-toggle li.is-active a[data-v-534131b3]:hover{background-color:#0a0a0a;border-color:#0a0a0a;color:#fff}.hero.is-white.is-bold[data-v-534131b3]{background-image:linear-gradient(141deg,#e6e6e6,#fff 71%,#fff)}@media screen and (max-width:768px){.hero.is-white.is-bold .navbar-menu[data-v-534131b3]{background-image:linear-gradient(141deg,#e6e6e6,#fff 71%,#fff)}}.hero.is-black[data-v-534131b3]{background-color:#0a0a0a;color:#fff}.hero.is-black a[data-v-534131b3]:not(.button):not(.dropdown-item):not(.tag),.hero.is-black strong[data-v-534131b3]{color:inherit}.hero.is-black .title[data-v-534131b3]{color:#fff}.hero.is-black .subtitle[data-v-534131b3]{color:hsla(0,0%,100%,.9)}.hero.is-black .subtitle a[data-v-534131b3]:not(.button),.hero.is-black .subtitle strong[data-v-534131b3]{color:#fff}@media screen and (max-width:1087px){.hero.is-black .navbar-menu[data-v-534131b3]{background-color:#0a0a0a}}.hero.is-black .navbar-item[data-v-534131b3],.hero.is-black .navbar-link[data-v-534131b3]{color:hsla(0,0%,100%,.7)}.hero.is-black .navbar-link.is-active[data-v-534131b3],.hero.is-black .navbar-link[data-v-534131b3]:hover,.hero.is-black a.navbar-item.is-active[data-v-534131b3],.hero.is-black a.navbar-item[data-v-534131b3]:hover{background-color:#000;color:#fff}.hero.is-black .tabs a[data-v-534131b3]{color:#fff;opacity:.9}.hero.is-black .tabs a[data-v-534131b3]:hover,.hero.is-black .tabs li.is-active a[data-v-534131b3]{opacity:1}.hero.is-black .tabs.is-boxed a[data-v-534131b3],.hero.is-black .tabs.is-toggle a[data-v-534131b3]{color:#fff}.hero.is-black .tabs.is-boxed a[data-v-534131b3]:hover,.hero.is-black .tabs.is-toggle a[data-v-534131b3]:hover{background-color:hsla(0,0%,4%,.1)}.hero.is-black .tabs.is-boxed li.is-active a[data-v-534131b3],.hero.is-black .tabs.is-boxed li.is-active a[data-v-534131b3]:hover,.hero.is-black .tabs.is-toggle li.is-active a[data-v-534131b3],.hero.is-black .tabs.is-toggle li.is-active a[data-v-534131b3]:hover{background-color:#fff;border-color:#fff;color:#0a0a0a}.hero.is-black.is-bold[data-v-534131b3]{background-image:linear-gradient(141deg,#000,#0a0a0a 71%,#181616)}@media screen and (max-width:768px){.hero.is-black.is-bold .navbar-menu[data-v-534131b3]{background-image:linear-gradient(141deg,#000,#0a0a0a 71%,#181616)}}.hero.is-light[data-v-534131b3]{background-color:#f5f5f5;color:#363636}.hero.is-light a[data-v-534131b3]:not(.button):not(.dropdown-item):not(.tag),.hero.is-light strong[data-v-534131b3]{color:inherit}.hero.is-light .title[data-v-534131b3]{color:#363636}.hero.is-light .subtitle[data-v-534131b3]{color:rgba(54,54,54,.9)}.hero.is-light .subtitle a[data-v-534131b3]:not(.button),.hero.is-light .subtitle strong[data-v-534131b3]{color:#363636}@media screen and (max-width:1087px){.hero.is-light .navbar-menu[data-v-534131b3]{background-color:#f5f5f5}}.hero.is-light .navbar-item[data-v-534131b3],.hero.is-light .navbar-link[data-v-534131b3]{color:rgba(54,54,54,.7)}.hero.is-light .navbar-link.is-active[data-v-534131b3],.hero.is-light .navbar-link[data-v-534131b3]:hover,.hero.is-light a.navbar-item.is-active[data-v-534131b3],.hero.is-light a.navbar-item[data-v-534131b3]:hover{background-color:#e8e8e8;color:#363636}.hero.is-light .tabs a[data-v-534131b3]{color:#363636;opacity:.9}.hero.is-light .tabs a[data-v-534131b3]:hover,.hero.is-light .tabs li.is-active a[data-v-534131b3]{opacity:1}.hero.is-light .tabs.is-boxed a[data-v-534131b3],.hero.is-light .tabs.is-toggle a[data-v-534131b3]{color:#363636}.hero.is-light .tabs.is-boxed a[data-v-534131b3]:hover,.hero.is-light .tabs.is-toggle a[data-v-534131b3]:hover{background-color:hsla(0,0%,4%,.1)}.hero.is-light .tabs.is-boxed li.is-active a[data-v-534131b3],.hero.is-light .tabs.is-boxed li.is-active a[data-v-534131b3]:hover,.hero.is-light .tabs.is-toggle li.is-active a[data-v-534131b3],.hero.is-light .tabs.is-toggle li.is-active a[data-v-534131b3]:hover{background-color:#363636;border-color:#363636;color:#f5f5f5}.hero.is-light.is-bold[data-v-534131b3]{background-image:linear-gradient(141deg,#dfd8d9,#f5f5f5 71%,#fff)}@media screen and (max-width:768px){.hero.is-light.is-bold .navbar-menu[data-v-534131b3]{background-image:linear-gradient(141deg,#dfd8d9,#f5f5f5 71%,#fff)}}.hero.is-dark[data-v-534131b3]{background-color:#363636;color:#f5f5f5}.hero.is-dark a[data-v-534131b3]:not(.button):not(.dropdown-item):not(.tag),.hero.is-dark strong[data-v-534131b3]{color:inherit}.hero.is-dark .title[data-v-534131b3]{color:#f5f5f5}.hero.is-dark .subtitle[data-v-534131b3]{color:hsla(0,0%,96%,.9)}.hero.is-dark .subtitle a[data-v-534131b3]:not(.button),.hero.is-dark .subtitle strong[data-v-534131b3]{color:#f5f5f5}@media screen and (max-width:1087px){.hero.is-dark .navbar-menu[data-v-534131b3]{background-color:#363636}}.hero.is-dark .navbar-item[data-v-534131b3],.hero.is-dark .navbar-link[data-v-534131b3]{color:hsla(0,0%,96%,.7)}.hero.is-dark .navbar-link.is-active[data-v-534131b3],.hero.is-dark .navbar-link[data-v-534131b3]:hover,.hero.is-dark a.navbar-item.is-active[data-v-534131b3],.hero.is-dark a.navbar-item[data-v-534131b3]:hover{background-color:#292929;color:#f5f5f5}.hero.is-dark .tabs a[data-v-534131b3]{color:#f5f5f5;opacity:.9}.hero.is-dark .tabs a[data-v-534131b3]:hover,.hero.is-dark .tabs li.is-active a[data-v-534131b3]{opacity:1}.hero.is-dark .tabs.is-boxed a[data-v-534131b3],.hero.is-dark .tabs.is-toggle a[data-v-534131b3]{color:#f5f5f5}.hero.is-dark .tabs.is-boxed a[data-v-534131b3]:hover,.hero.is-dark .tabs.is-toggle a[data-v-534131b3]:hover{background-color:hsla(0,0%,4%,.1)}.hero.is-dark .tabs.is-boxed li.is-active a[data-v-534131b3],.hero.is-dark .tabs.is-boxed li.is-active a[data-v-534131b3]:hover,.hero.is-dark .tabs.is-toggle li.is-active a[data-v-534131b3],.hero.is-dark .tabs.is-toggle li.is-active a[data-v-534131b3]:hover{background-color:#f5f5f5;border-color:#f5f5f5;color:#363636}.hero.is-dark.is-bold[data-v-534131b3]{background-image:linear-gradient(141deg,#1f191a,#363636 71%,#46403f)}@media screen and (max-width:768px){.hero.is-dark.is-bold .navbar-menu[data-v-534131b3]{background-image:linear-gradient(141deg,#1f191a,#363636 71%,#46403f)}}.hero.is-primary[data-v-534131b3],[data-v-534131b3] .hero.deleteAreaBulma,[data-v-534131b3] .hero.deleteContentBulma,[data-v-534131b3] .hero.tagAreaBulma{background-color:#00d1b2;color:#fff}.hero.is-primary a[data-v-534131b3]:not(.button):not(.dropdown-item):not(.tag),.hero.is-primary strong[data-v-534131b3],[data-v-534131b3] .hero.deleteAreaBulma a:not(.button):not(.dropdown-item):not(.tag),[data-v-534131b3] .hero.deleteAreaBulma strong,[data-v-534131b3] .hero.deleteContentBulma a:not(.button):not(.dropdown-item):not(.tag),[data-v-534131b3] .hero.deleteContentBulma strong,[data-v-534131b3] .hero.tagAreaBulma a:not(.button):not(.dropdown-item):not(.tag),[data-v-534131b3] .hero.tagAreaBulma strong{color:inherit}.hero.is-primary .title[data-v-534131b3],[data-v-534131b3] .hero.deleteAreaBulma .title,[data-v-534131b3] .hero.deleteContentBulma .title,[data-v-534131b3] .hero.tagAreaBulma .title{color:#fff}.hero.is-primary .subtitle[data-v-534131b3],[data-v-534131b3] .hero.deleteAreaBulma .subtitle,[data-v-534131b3] .hero.deleteContentBulma .subtitle,[data-v-534131b3] .hero.tagAreaBulma .subtitle{color:hsla(0,0%,100%,.9)}.hero.is-primary .subtitle a[data-v-534131b3]:not(.button),.hero.is-primary .subtitle strong[data-v-534131b3],[data-v-534131b3] .hero.deleteAreaBulma .subtitle a:not(.button),[data-v-534131b3] .hero.deleteAreaBulma .subtitle strong,[data-v-534131b3] .hero.deleteContentBulma .subtitle a:not(.button),[data-v-534131b3] .hero.deleteContentBulma .subtitle strong,[data-v-534131b3] .hero.tagAreaBulma .subtitle a:not(.button),[data-v-534131b3] .hero.tagAreaBulma .subtitle strong{color:#fff}@media screen and (max-width:1087px){.hero.is-primary .navbar-menu[data-v-534131b3],[data-v-534131b3] .hero.deleteAreaBulma .navbar-menu,[data-v-534131b3] .hero.deleteContentBulma .navbar-menu,[data-v-534131b3] .hero.tagAreaBulma .navbar-menu{background-color:#00d1b2}}.hero.is-primary .navbar-item[data-v-534131b3],.hero.is-primary .navbar-link[data-v-534131b3],[data-v-534131b3] .hero.deleteAreaBulma .navbar-item,[data-v-534131b3] .hero.deleteAreaBulma .navbar-link,[data-v-534131b3] .hero.deleteContentBulma .navbar-item,[data-v-534131b3] .hero.deleteContentBulma .navbar-link,[data-v-534131b3] .hero.tagAreaBulma .navbar-item,[data-v-534131b3] .hero.tagAreaBulma .navbar-link{color:hsla(0,0%,100%,.7)}.hero.is-primary .navbar-link.is-active[data-v-534131b3],.hero.is-primary .navbar-link[data-v-534131b3]:hover,.hero.is-primary a.navbar-item.is-active[data-v-534131b3],.hero.is-primary a.navbar-item[data-v-534131b3]:hover,[data-v-534131b3] .hero.deleteAreaBulma .navbar-link.is-active,[data-v-534131b3] .hero.deleteAreaBulma .navbar-link:hover,[data-v-534131b3] .hero.deleteAreaBulma a.navbar-item.is-active,[data-v-534131b3] .hero.deleteAreaBulma a.navbar-item:hover,[data-v-534131b3] .hero.deleteContentBulma .navbar-link.is-active,[data-v-534131b3] .hero.deleteContentBulma .navbar-link:hover,[data-v-534131b3] .hero.deleteContentBulma a.navbar-item.is-active,[data-v-534131b3] .hero.deleteContentBulma a.navbar-item:hover,[data-v-534131b3] .hero.tagAreaBulma .navbar-link.is-active,[data-v-534131b3] .hero.tagAreaBulma .navbar-link:hover,[data-v-534131b3] .hero.tagAreaBulma a.navbar-item.is-active,[data-v-534131b3] .hero.tagAreaBulma a.navbar-item:hover{background-color:#00b89c;color:#fff}.hero.is-primary .tabs a[data-v-534131b3],[data-v-534131b3] .hero.deleteAreaBulma .tabs a,[data-v-534131b3] .hero.deleteContentBulma .tabs a,[data-v-534131b3] .hero.tagAreaBulma .tabs a{color:#fff;opacity:.9}.hero.is-primary .tabs a[data-v-534131b3]:hover,.hero.is-primary .tabs li.is-active a[data-v-534131b3],[data-v-534131b3] .hero.deleteAreaBulma .tabs a:hover,[data-v-534131b3] .hero.deleteAreaBulma .tabs li.is-active a,[data-v-534131b3] .hero.deleteContentBulma .tabs a:hover,[data-v-534131b3] .hero.deleteContentBulma .tabs li.is-active a,[data-v-534131b3] .hero.tagAreaBulma .tabs a:hover,[data-v-534131b3] .hero.tagAreaBulma .tabs li.is-active a{opacity:1}.hero.is-primary .tabs.is-boxed a[data-v-534131b3],.hero.is-primary .tabs.is-toggle a[data-v-534131b3],[data-v-534131b3] .hero.deleteAreaBulma .tabs.is-boxed a,[data-v-534131b3] .hero.deleteAreaBulma .tabs.is-toggle a,[data-v-534131b3] .hero.deleteContentBulma .tabs.is-boxed a,[data-v-534131b3] .hero.deleteContentBulma .tabs.is-toggle a,[data-v-534131b3] .hero.tagAreaBulma .tabs.is-boxed a,[data-v-534131b3] .hero.tagAreaBulma .tabs.is-toggle a{color:#fff}.hero.is-primary .tabs.is-boxed a[data-v-534131b3]:hover,.hero.is-primary .tabs.is-toggle a[data-v-534131b3]:hover,[data-v-534131b3] .hero.deleteAreaBulma .tabs.is-boxed a:hover,[data-v-534131b3] .hero.deleteAreaBulma .tabs.is-toggle a:hover,[data-v-534131b3] .hero.deleteContentBulma .tabs.is-boxed a:hover,[data-v-534131b3] .hero.deleteContentBulma .tabs.is-toggle a:hover,[data-v-534131b3] .hero.tagAreaBulma .tabs.is-boxed a:hover,[data-v-534131b3] .hero.tagAreaBulma .tabs.is-toggle a:hover{background-color:hsla(0,0%,4%,.1)}.hero.is-primary .tabs.is-boxed li.is-active a[data-v-534131b3],.hero.is-primary .tabs.is-boxed li.is-active a[data-v-534131b3]:hover,.hero.is-primary .tabs.is-toggle li.is-active a[data-v-534131b3],.hero.is-primary .tabs.is-toggle li.is-active a[data-v-534131b3]:hover,[data-v-534131b3] .hero.deleteAreaBulma .tabs.is-boxed li.is-active a,[data-v-534131b3] .hero.deleteAreaBulma .tabs.is-boxed li.is-active a:hover,[data-v-534131b3] .hero.deleteAreaBulma .tabs.is-toggle li.is-active a,[data-v-534131b3] .hero.deleteAreaBulma .tabs.is-toggle li.is-active a:hover,[data-v-534131b3] .hero.deleteContentBulma .tabs.is-boxed li.is-active a,[data-v-534131b3] .hero.deleteContentBulma .tabs.is-boxed li.is-active a:hover,[data-v-534131b3] .hero.deleteContentBulma .tabs.is-toggle li.is-active a,[data-v-534131b3] .hero.deleteContentBulma .tabs.is-toggle li.is-active a:hover,[data-v-534131b3] .hero.tagAreaBulma .tabs.is-boxed li.is-active a,[data-v-534131b3] .hero.tagAreaBulma .tabs.is-boxed li.is-active a:hover,[data-v-534131b3] .hero.tagAreaBulma .tabs.is-toggle li.is-active a,[data-v-534131b3] .hero.tagAreaBulma .tabs.is-toggle li.is-active a:hover{background-color:#fff;border-color:#fff;color:#00d1b2}.hero.is-primary.is-bold[data-v-534131b3],[data-v-534131b3] .hero.is-bold.deleteAreaBulma,[data-v-534131b3] .hero.is-bold.deleteContentBulma,[data-v-534131b3] .hero.is-bold.tagAreaBulma{background-image:linear-gradient(141deg,#009e6c,#00d1b2 71%,#00e7eb)}@media screen and (max-width:768px){.hero.is-primary.is-bold .navbar-menu[data-v-534131b3],[data-v-534131b3] .hero.is-bold.deleteAreaBulma .navbar-menu,[data-v-534131b3] .hero.is-bold.deleteContentBulma .navbar-menu,[data-v-534131b3] .hero.is-bold.tagAreaBulma .navbar-menu{background-image:linear-gradient(141deg,#009e6c,#00d1b2 71%,#00e7eb)}}.hero.is-link[data-v-534131b3]{background-color:#3273dc;color:#fff}.hero.is-link a[data-v-534131b3]:not(.button):not(.dropdown-item):not(.tag),.hero.is-link strong[data-v-534131b3]{color:inherit}.hero.is-link .title[data-v-534131b3]{color:#fff}.hero.is-link .subtitle[data-v-534131b3]{color:hsla(0,0%,100%,.9)}.hero.is-link .subtitle a[data-v-534131b3]:not(.button),.hero.is-link .subtitle strong[data-v-534131b3]{color:#fff}@media screen and (max-width:1087px){.hero.is-link .navbar-menu[data-v-534131b3]{background-color:#3273dc}}.hero.is-link .navbar-item[data-v-534131b3],.hero.is-link .navbar-link[data-v-534131b3]{color:hsla(0,0%,100%,.7)}.hero.is-link .navbar-link.is-active[data-v-534131b3],.hero.is-link .navbar-link[data-v-534131b3]:hover,.hero.is-link a.navbar-item.is-active[data-v-534131b3],.hero.is-link a.navbar-item[data-v-534131b3]:hover{background-color:#2366d1;color:#fff}.hero.is-link .tabs a[data-v-534131b3]{color:#fff;opacity:.9}.hero.is-link .tabs a[data-v-534131b3]:hover,.hero.is-link .tabs li.is-active a[data-v-534131b3]{opacity:1}.hero.is-link .tabs.is-boxed a[data-v-534131b3],.hero.is-link .tabs.is-toggle a[data-v-534131b3]{color:#fff}.hero.is-link .tabs.is-boxed a[data-v-534131b3]:hover,.hero.is-link .tabs.is-toggle a[data-v-534131b3]:hover{background-color:hsla(0,0%,4%,.1)}.hero.is-link .tabs.is-boxed li.is-active a[data-v-534131b3],.hero.is-link .tabs.is-boxed li.is-active a[data-v-534131b3]:hover,.hero.is-link .tabs.is-toggle li.is-active a[data-v-534131b3],.hero.is-link .tabs.is-toggle li.is-active a[data-v-534131b3]:hover{background-color:#fff;border-color:#fff;color:#3273dc}.hero.is-link.is-bold[data-v-534131b3]{background-image:linear-gradient(141deg,#1577c6,#3273dc 71%,#4366e5)}@media screen and (max-width:768px){.hero.is-link.is-bold .navbar-menu[data-v-534131b3]{background-image:linear-gradient(141deg,#1577c6,#3273dc 71%,#4366e5)}}.hero.is-info[data-v-534131b3]{background-color:#209cee;color:#fff}.hero.is-info a[data-v-534131b3]:not(.button):not(.dropdown-item):not(.tag),.hero.is-info strong[data-v-534131b3]{color:inherit}.hero.is-info .title[data-v-534131b3]{color:#fff}.hero.is-info .subtitle[data-v-534131b3]{color:hsla(0,0%,100%,.9)}.hero.is-info .subtitle a[data-v-534131b3]:not(.button),.hero.is-info .subtitle strong[data-v-534131b3]{color:#fff}@media screen and (max-width:1087px){.hero.is-info .navbar-menu[data-v-534131b3]{background-color:#209cee}}.hero.is-info .navbar-item[data-v-534131b3],.hero.is-info .navbar-link[data-v-534131b3]{color:hsla(0,0%,100%,.7)}.hero.is-info .navbar-link.is-active[data-v-534131b3],.hero.is-info .navbar-link[data-v-534131b3]:hover,.hero.is-info a.navbar-item.is-active[data-v-534131b3],.hero.is-info a.navbar-item[data-v-534131b3]:hover{background-color:#118fe4;color:#fff}.hero.is-info .tabs a[data-v-534131b3]{color:#fff;opacity:.9}.hero.is-info .tabs a[data-v-534131b3]:hover,.hero.is-info .tabs li.is-active a[data-v-534131b3]{opacity:1}.hero.is-info .tabs.is-boxed a[data-v-534131b3],.hero.is-info .tabs.is-toggle a[data-v-534131b3]{color:#fff}.hero.is-info .tabs.is-boxed a[data-v-534131b3]:hover,.hero.is-info .tabs.is-toggle a[data-v-534131b3]:hover{background-color:hsla(0,0%,4%,.1)}.hero.is-info .tabs.is-boxed li.is-active a[data-v-534131b3],.hero.is-info .tabs.is-boxed li.is-active a[data-v-534131b3]:hover,.hero.is-info .tabs.is-toggle li.is-active a[data-v-534131b3],.hero.is-info .tabs.is-toggle li.is-active a[data-v-534131b3]:hover{background-color:#fff;border-color:#fff;color:#209cee}.hero.is-info.is-bold[data-v-534131b3]{background-image:linear-gradient(141deg,#04a6d7,#209cee 71%,#3287f5)}@media screen and (max-width:768px){.hero.is-info.is-bold .navbar-menu[data-v-534131b3]{background-image:linear-gradient(141deg,#04a6d7,#209cee 71%,#3287f5)}}.hero.is-success[data-v-534131b3]{background-color:#23d160;color:#fff}.hero.is-success a[data-v-534131b3]:not(.button):not(.dropdown-item):not(.tag),.hero.is-success strong[data-v-534131b3]{color:inherit}.hero.is-success .title[data-v-534131b3]{color:#fff}.hero.is-success .subtitle[data-v-534131b3]{color:hsla(0,0%,100%,.9)}.hero.is-success .subtitle a[data-v-534131b3]:not(.button),.hero.is-success .subtitle strong[data-v-534131b3]{color:#fff}@media screen and (max-width:1087px){.hero.is-success .navbar-menu[data-v-534131b3]{background-color:#23d160}}.hero.is-success .navbar-item[data-v-534131b3],.hero.is-success .navbar-link[data-v-534131b3]{color:hsla(0,0%,100%,.7)}.hero.is-success .navbar-link.is-active[data-v-534131b3],.hero.is-success .navbar-link[data-v-534131b3]:hover,.hero.is-success a.navbar-item.is-active[data-v-534131b3],.hero.is-success a.navbar-item[data-v-534131b3]:hover{background-color:#20bc56;color:#fff}.hero.is-success .tabs a[data-v-534131b3]{color:#fff;opacity:.9}.hero.is-success .tabs a[data-v-534131b3]:hover,.hero.is-success .tabs li.is-active a[data-v-534131b3]{opacity:1}.hero.is-success .tabs.is-boxed a[data-v-534131b3],.hero.is-success .tabs.is-toggle a[data-v-534131b3]{color:#fff}.hero.is-success .tabs.is-boxed a[data-v-534131b3]:hover,.hero.is-success .tabs.is-toggle a[data-v-534131b3]:hover{background-color:hsla(0,0%,4%,.1)}.hero.is-success .tabs.is-boxed li.is-active a[data-v-534131b3],.hero.is-success .tabs.is-boxed li.is-active a[data-v-534131b3]:hover,.hero.is-success .tabs.is-toggle li.is-active a[data-v-534131b3],.hero.is-success .tabs.is-toggle li.is-active a[data-v-534131b3]:hover{background-color:#fff;border-color:#fff;color:#23d160}.hero.is-success.is-bold[data-v-534131b3]{background-image:linear-gradient(141deg,#12af2f,#23d160 71%,#2ce28a)}@media screen and (max-width:768px){.hero.is-success.is-bold .navbar-menu[data-v-534131b3]{background-image:linear-gradient(141deg,#12af2f,#23d160 71%,#2ce28a)}}.hero.is-warning[data-v-534131b3]{background-color:#ffdd57;color:rgba(0,0,0,.7)}.hero.is-warning a[data-v-534131b3]:not(.button):not(.dropdown-item):not(.tag),.hero.is-warning strong[data-v-534131b3]{color:inherit}.hero.is-warning .title[data-v-534131b3]{color:rgba(0,0,0,.7)}.hero.is-warning .subtitle[data-v-534131b3]{color:rgba(0,0,0,.9)}.hero.is-warning .subtitle a[data-v-534131b3]:not(.button),.hero.is-warning .subtitle strong[data-v-534131b3]{color:rgba(0,0,0,.7)}@media screen and (max-width:1087px){.hero.is-warning .navbar-menu[data-v-534131b3]{background-color:#ffdd57}}.hero.is-warning .navbar-item[data-v-534131b3],.hero.is-warning .navbar-link[data-v-534131b3]{color:rgba(0,0,0,.7)}.hero.is-warning .navbar-link.is-active[data-v-534131b3],.hero.is-warning .navbar-link[data-v-534131b3]:hover,.hero.is-warning a.navbar-item.is-active[data-v-534131b3],.hero.is-warning a.navbar-item[data-v-534131b3]:hover{background-color:#ffd83d;color:rgba(0,0,0,.7)}.hero.is-warning .tabs a[data-v-534131b3]{color:rgba(0,0,0,.7);opacity:.9}.hero.is-warning .tabs a[data-v-534131b3]:hover,.hero.is-warning .tabs li.is-active a[data-v-534131b3]{opacity:1}.hero.is-warning .tabs.is-boxed a[data-v-534131b3],.hero.is-warning .tabs.is-toggle a[data-v-534131b3]{color:rgba(0,0,0,.7)}.hero.is-warning .tabs.is-boxed a[data-v-534131b3]:hover,.hero.is-warning .tabs.is-toggle a[data-v-534131b3]:hover{background-color:hsla(0,0%,4%,.1)}.hero.is-warning .tabs.is-boxed li.is-active a[data-v-534131b3],.hero.is-warning .tabs.is-boxed li.is-active a[data-v-534131b3]:hover,.hero.is-warning .tabs.is-toggle li.is-active a[data-v-534131b3],.hero.is-warning .tabs.is-toggle li.is-active a[data-v-534131b3]:hover{background-color:rgba(0,0,0,.7);border-color:rgba(0,0,0,.7);color:#ffdd57}.hero.is-warning.is-bold[data-v-534131b3]{background-image:linear-gradient(141deg,#ffaf24,#ffdd57 71%,#fffa70)}@media screen and (max-width:768px){.hero.is-warning.is-bold .navbar-menu[data-v-534131b3]{background-image:linear-gradient(141deg,#ffaf24,#ffdd57 71%,#fffa70)}}.hero.is-danger[data-v-534131b3]{background-color:#ff3860;color:#fff}.hero.is-danger a[data-v-534131b3]:not(.button):not(.dropdown-item):not(.tag),.hero.is-danger strong[data-v-534131b3]{color:inherit}.hero.is-danger .title[data-v-534131b3]{color:#fff}.hero.is-danger .subtitle[data-v-534131b3]{color:hsla(0,0%,100%,.9)}.hero.is-danger .subtitle a[data-v-534131b3]:not(.button),.hero.is-danger .subtitle strong[data-v-534131b3]{color:#fff}@media screen and (max-width:1087px){.hero.is-danger .navbar-menu[data-v-534131b3]{background-color:#ff3860}}.hero.is-danger .navbar-item[data-v-534131b3],.hero.is-danger .navbar-link[data-v-534131b3]{color:hsla(0,0%,100%,.7)}.hero.is-danger .navbar-link.is-active[data-v-534131b3],.hero.is-danger .navbar-link[data-v-534131b3]:hover,.hero.is-danger a.navbar-item.is-active[data-v-534131b3],.hero.is-danger a.navbar-item[data-v-534131b3]:hover{background-color:#ff1f4b;color:#fff}.hero.is-danger .tabs a[data-v-534131b3]{color:#fff;opacity:.9}.hero.is-danger .tabs a[data-v-534131b3]:hover,.hero.is-danger .tabs li.is-active a[data-v-534131b3]{opacity:1}.hero.is-danger .tabs.is-boxed a[data-v-534131b3],.hero.is-danger .tabs.is-toggle a[data-v-534131b3]{color:#fff}.hero.is-danger .tabs.is-boxed a[data-v-534131b3]:hover,.hero.is-danger .tabs.is-toggle a[data-v-534131b3]:hover{background-color:hsla(0,0%,4%,.1)}.hero.is-danger .tabs.is-boxed li.is-active a[data-v-534131b3],.hero.is-danger .tabs.is-boxed li.is-active a[data-v-534131b3]:hover,.hero.is-danger .tabs.is-toggle li.is-active a[data-v-534131b3],.hero.is-danger .tabs.is-toggle li.is-active a[data-v-534131b3]:hover{background-color:#fff;border-color:#fff;color:#ff3860}.hero.is-danger.is-bold[data-v-534131b3]{background-image:linear-gradient(141deg,#ff0561,#ff3860 71%,#ff5257)}@media screen and (max-width:768px){.hero.is-danger.is-bold .navbar-menu[data-v-534131b3]{background-image:linear-gradient(141deg,#ff0561,#ff3860 71%,#ff5257)}}.hero.is-small .hero-body[data-v-534131b3]{padding-bottom:1.5rem;padding-top:1.5rem}@media print,screen and (min-width:769px){.hero.is-medium .hero-body[data-v-534131b3]{padding-bottom:9rem;padding-top:9rem}}@media print,screen and (min-width:769px){.hero.is-large .hero-body[data-v-534131b3]{padding-bottom:18rem;padding-top:18rem}}.hero.is-fullheight-with-navbar .hero-body[data-v-534131b3],.hero.is-fullheight .hero-body[data-v-534131b3],.hero.is-halfheight .hero-body[data-v-534131b3]{align-items:center;display:flex}.hero.is-fullheight-with-navbar .hero-body>.container[data-v-534131b3],.hero.is-fullheight .hero-body>.container[data-v-534131b3],.hero.is-halfheight .hero-body>.container[data-v-534131b3]{flex-grow:1;flex-shrink:1}.hero.is-halfheight[data-v-534131b3]{min-height:50vh}.hero.is-fullheight[data-v-534131b3]{min-height:100vh}.hero.is-fullheight-with-navbar[data-v-534131b3]{min-height:calc(100vh - 3.25rem)}.hero-video[data-v-534131b3]{overflow:hidden}.hero-video video[data-v-534131b3]{left:50%;min-height:100%;min-width:100%;position:absolute;top:50%;transform:translate3d(-50%,-50%,0)}.hero-video.is-transparent[data-v-534131b3]{opacity:.3}@media screen and (max-width:768px){.hero-video[data-v-534131b3]{display:none}}.hero-buttons[data-v-534131b3]{margin-top:1.5rem}@media screen and (max-width:768px){.hero-buttons .button[data-v-534131b3]{display:flex}.hero-buttons .button[data-v-534131b3]:not(:last-child){margin-bottom:.75rem}}@media print,screen and (min-width:769px){.hero-buttons[data-v-534131b3]{display:flex;justify-content:center}.hero-buttons .button[data-v-534131b3]:not(:last-child){margin-right:1.5rem}}.hero-foot[data-v-534131b3],.hero-head[data-v-534131b3]{flex-grow:0;flex-shrink:0}.hero-body[data-v-534131b3]{flex-grow:1;flex-shrink:0;padding:3rem 1.5rem}.section[data-v-534131b3]{padding:3rem 1.5rem}@media screen and (min-width:1088px){.section.is-medium[data-v-534131b3]{padding:9rem 1.5rem}.section.is-large[data-v-534131b3]{padding:18rem 1.5rem}}.footer[data-v-534131b3]{background-color:#fafafa;padding:3rem 1.5rem 6rem}[data-v-534131b3] .tagAreaBulma{padding:2px 4px 2px 10px;margin:2px 4px 2px 0}[data-v-534131b3] .deleteAreaBulma{background-color:transparent;border:none}[data-v-534131b3] .deleteContentBulma{color:#fff}', ""]);
  }, function (a, t, e) {
    "use strict";
    var n = function n() {
      var a = this,
          t = a.$createElement,
          e = a._self._c || t;return e("span", [e("tags", { attrs: { tags: a.tags, type: a.type, "event-hub": a.eventHub, "tag-area-class": "tagAreaBulma", "tag-content-class": "tagContentBulma", "delete-area-class": "deleteAreaBulma", "delete-content-class": "deleteContentBulma", "tag-custom-class": a.tagCustomClass } }), a._v(" "), e("input", { directives: [{ name: "model", rawName: "v-model", value: a.tag, expression: "tag" }], class: a.inputContentClass, attrs: { placeholder: a.placeholder }, domProps: { value: a.tag }, on: { keyup: function keyup(t) {
            return "button" in t || !a._k(t.keyCode, "enter", 13, t.key, "Enter") ? a.inputTagWithEmit(t) : null;
          }, input: function input(t) {
            t.target.composing || (a.tag = t.target.value);
          } } })], 1);
    },
        i = [],
        r = { render: n, staticRenderFns: i };t.a = r;
  }]);
});
//# sourceMappingURL=build.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)(module)))

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__(5);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_472cff63_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__ = __webpack_require__(29);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_472cff63_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "App.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-472cff63", Component.options)
  } else {
    hotAPI.reload("data-v-472cff63", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_NoneStyleContent_vue__ = __webpack_require__(6);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_175a4737_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_NoneStyleContent_vue__ = __webpack_require__(20);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(17)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-175a4737"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_NoneStyleContent_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_175a4737_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_NoneStyleContent_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "contents/NoneStyleContent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-175a4737", Component.options)
  } else {
    hotAPI.reload("data-v-175a4737", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(18);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("fc539734", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-175a4737\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./NoneStyleContent.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-175a4737\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./NoneStyleContent.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, "\n.tagEditor[data-v-175a4737] {\n  border: 1px solid gray;\n  margin: 12px;\n  padding: 6px;\n}\n", "", {"version":3,"sources":["/Users/fukudayukihiro/JavaScriptProjects/vue-tag-editor/demo/contents/contents/NoneStyleContent.vue"],"names":[],"mappings":";AA+DA;EACA,uBAAA;EACA,aAAA;EACA,aAAA;CACA","file":"NoneStyleContent.vue","sourcesContent":["<template>\n  <div>\n    <h2>None Style</h2>\n    <ul>\n      <li>use (Vue)TagEditor component</li>\n    </ul>\n    <span>\n      <h4>type: label</h4>\n      <!-- do not set css -->\n      <div class=\"tagEditor\">\n        <tag-editor\n          :tags=\"tagLabels\"\n          :type=\"'label'\"\n          @handler-after-input-tag=\"handlerAfterInputTag\"\n          @handler-after-delete-tag=\"handlerAfterDeleteTag\"\n        />\n      </div>\n      <!-- handler-after-click-tag is effective only when type === 'link' -->\n      <!-- if set css, set :tagAreaClass, :tagContentClass, :deleteAreaClass, :deleteContentClass, :inputContentClass -->\n      <h4>type: link</h4>\n      <div class=\"tagEditor\">\n        <tag-editor\n          :tags=\"tagLinks\"\n          :type=\"'link'\"\n          @handler-after-click-tag=\"handlerAfterClickTag\"\n          @handler-after-input-tag=\"handlerAfterInputTag\"\n          @handler-after-delete-tag=\"handlerAfterDeleteTag\"\n        />\n      </div>\n    </span>\n  </div>\n</template>\n\n<script>\nexport default {\n  data(){\n    return {\n      tagLabels: ['javascript', 'ruby'],\n      tagLinks:  ['javascript', 'ruby']\n    }\n  },\n  methods: {\n    // Only one argument\n    handlerAfterClickTag(tag){\n      alert(tag + ' is click!')\n    },\n    // Only two argument\n    handlerAfterInputTag(tag, isAddTag){\n      if (isAddTag === true) {\n        console.log(tag + ' is added!')\n      } else {\n        console.log(tag + ' isn\\'t added')\n      }\n    },\n    // Only one argument\n    handlerAfterDeleteTag(tag){\n      console.log(tag + ' is deleted!')\n    }\n  }\n}\n</script>\n\n<style scoped=\"true\">\n.tagEditor {\n  border: 1px solid gray;\n  margin: 12px;\n  padding: 6px;\n}\n</style>"],"sourceRoot":""}]);

// exports


/***/ }),
/* 19 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles(parentId, list) {
  var styles = [];
  var newStyles = {};
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = item[0];
    var css = item[1];
    var media = item[2];
    var sourceMap = item[3];
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    };
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] });
    } else {
      newStyles[id].parts.push(part);
    }
  }
  return styles;
};

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("h2", [_vm._v("None Style")]),
    _vm._v(" "),
    _vm._m(0),
    _vm._v(" "),
    _c("span", [
      _c("h4", [_vm._v("type: label")]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "tagEditor" },
        [
          _c("tag-editor", {
            attrs: { tags: _vm.tagLabels, type: "label" },
            on: {
              "handler-after-input-tag": _vm.handlerAfterInputTag,
              "handler-after-delete-tag": _vm.handlerAfterDeleteTag
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("h4", [_vm._v("type: link")]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "tagEditor" },
        [
          _c("tag-editor", {
            attrs: { tags: _vm.tagLinks, type: "link" },
            on: {
              "handler-after-click-tag": _vm.handlerAfterClickTag,
              "handler-after-input-tag": _vm.handlerAfterInputTag,
              "handler-after-delete-tag": _vm.handlerAfterDeleteTag
            }
          })
        ],
        1
      )
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("ul", [_c("li", [_vm._v("use (Vue)TagEditor component")])])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-175a4737", esExports)
  }
}

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_CustomStyleContent_vue__ = __webpack_require__(7);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1c169db0_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_CustomStyleContent_vue__ = __webpack_require__(24);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(22)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-1c169db0"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_CustomStyleContent_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1c169db0_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_CustomStyleContent_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "contents/CustomStyleContent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1c169db0", Component.options)
  } else {
    hotAPI.reload("data-v-1c169db0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(23);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("28931ea2", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1c169db0\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./CustomStyleContent.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1c169db0\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./CustomStyleContent.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, "\n.tagEditor[data-v-1c169db0] {\n  border: 1px solid gray;\n  margin: 12px;\n  padding: 6px;\n}\n[data-v-1c169db0] .tagArea {\n  align-items: center;\n  border-radius: 4px;\n  white-space: nowrap;\n  padding-left: 0.75em;\n  padding-right: 0.75em;\n  height: 2em;\n  line-height: 1.5;\n  font-size: 0.75rem;\n  display: inline-flex;\n  background-color: #99cc00;\n}\n[data-v-1c169db0] .tagContent {\n  color: white;\n}\n[data-v-1c169db0] .tagCustom {\n}\n[data-v-1c169db0] .deleteArea {\n  background-color: #99cc00;\n  border: none;\n}\n[data-v-1c169db0] .deleteContent {\n  margin: 2px 0;\n  padding: 2px 0;\n  color: white;\n}\n[data-v-1c169db0] .inputContent {\n  padding: 2px 2px;\n  border: 0.5px solid gray;\n  width: 200px;\n  height: 16px;\n}\n", "", {"version":3,"sources":["/Users/fukudayukihiro/JavaScriptProjects/vue-tag-editor/demo/contents/contents/CustomStyleContent.vue"],"names":[],"mappings":";AA2EA;EACA,uBAAA;EACA,aAAA;EACA,aAAA;CACA;AACA;EACA,oBAAA;EACA,mBAAA;EACA,oBAAA;EACA,qBAAA;EACA,sBAAA;EACA,YAAA;EACA,iBAAA;EACA,mBAAA;EACA,qBAAA;EACA,0BAAA;CACA;AACA;EACA,aAAA;CACA;AACA;CACA;AACA;EACA,0BAAA;EACA,aAAA;CACA;AACA;EACA,cAAA;EACA,eAAA;EACA,aAAA;CACA;AACA;EACA,iBAAA;EACA,yBAAA;EACA,aAAA;EACA,aAAA;CACA","file":"CustomStyleContent.vue","sourcesContent":["<template>\n  <div>\n    <h2>Custom Style</h2>\n    <ul>\n      <li>use (Vue)TagEditor component</li>\n    </ul>\n    <span>\n      <h4>type: label</h4>\n      <div class=\"tagEditor\">\n        <tag-editor\n          :tags=\"tagLabels\"\n          :type=\"'label'\"\n          :tag-area-class=\"'tagArea'\"\n          :tag-content-class=\"'tagContent'\"\n          :delete-area-class=\"'deleteArea'\"\n          :delete-content-class=\"'deleteContent'\"\n          :input-content-class=\"'inputContent'\"\n          :tag-custom-class=\"'tagCustom'\"\n          @handler-after-input-tag=\"handlerAfterInputTag\"\n          @handler-after-delete-tag=\"handlerAfterDeleteTag\"\n        />\n      </div>\n      <!-- handler-after-click-tag is effective only when type === 'link' -->\n      <!-- if set css, set :tagAreaClass, :tagContentClass, :deleteAreaClass, :deleteContentClass, :inputContentClass -->\n      <h4>type: link</h4>\n      <div class=\"tagEditor\">\n        <tag-editor\n          :tags=\"tagLinks\"\n          :type=\"'link'\"\n          :tag-area-class=\"'tagArea'\"\n          :tag-content-class=\"'tagContent'\"\n          :delete-area-class=\"'deleteArea'\"\n          :delete-content-class=\"'deleteContent'\"\n          :input-content-class=\"'inputContent'\"\n          :tag-custom-class=\"'tagCustom'\"\n          :placeholder=\"' you can set custom message'\"\n          @handler-after-click-tag=\"handlerAfterClickTag\"\n          @handler-after-input-tag=\"handlerAfterInputTag\"\n          @handler-after-delete-tag=\"handlerAfterDeleteTag\"\n        />\n      </div>\n    </span>\n  </div>\n</template>\n\n<script>\nexport default {\n  data(){\n    return {\n      tagLabels: ['javascript', 'ruby'],\n      tagLinks:  ['javascript', 'ruby']\n    }\n  },\n  methods: {\n    // Only one argument\n    handlerAfterClickTag(tag){\n      alert(tag + ' is click!')\n    },\n    // Only two argument\n    handlerAfterInputTag(tag, isAddTag){\n      if (isAddTag === true) {\n        console.log(tag + ' is added!')\n      } else {\n        console.log(tag + ' isn\\'t added')\n      }\n    },\n    // Only one argument\n    handlerAfterDeleteTag(tag){\n      console.log(tag + ' is deleted!')\n    }\n  }\n}\n</script>\n\n<style scoped=\"true\">\n.tagEditor {\n  border: 1px solid gray;\n  margin: 12px;\n  padding: 6px;\n}\n/deep/ .tagArea {\n  align-items: center;\n  border-radius: 4px;\n  white-space: nowrap;\n  padding-left: 0.75em;\n  padding-right: 0.75em;\n  height: 2em;\n  line-height: 1.5;\n  font-size: 0.75rem;\n  display: inline-flex;\n  background-color: #99cc00;\n}\n/deep/ .tagContent {\n  color: white;\n}\n/deep/ .tagCustom {\n}\n/deep/ .deleteArea {\n  background-color: #99cc00;\n  border: none;\n}\n/deep/ .deleteContent {\n  margin: 2px 0;\n  padding: 2px 0;\n  color: white;\n}\n/deep/ .inputContent {\n  padding: 2px 2px;\n  border: 0.5px solid gray;\n  width: 200px;\n  height: 16px;\n}\n</style>"],"sourceRoot":""}]);

// exports


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("h2", [_vm._v("Custom Style")]),
    _vm._v(" "),
    _vm._m(0),
    _vm._v(" "),
    _c("span", [
      _c("h4", [_vm._v("type: label")]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "tagEditor" },
        [
          _c("tag-editor", {
            attrs: {
              tags: _vm.tagLabels,
              type: "label",
              "tag-area-class": "tagArea",
              "tag-content-class": "tagContent",
              "delete-area-class": "deleteArea",
              "delete-content-class": "deleteContent",
              "input-content-class": "inputContent",
              "tag-custom-class": "tagCustom"
            },
            on: {
              "handler-after-input-tag": _vm.handlerAfterInputTag,
              "handler-after-delete-tag": _vm.handlerAfterDeleteTag
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("h4", [_vm._v("type: link")]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "tagEditor" },
        [
          _c("tag-editor", {
            attrs: {
              tags: _vm.tagLinks,
              type: "link",
              "tag-area-class": "tagArea",
              "tag-content-class": "tagContent",
              "delete-area-class": "deleteArea",
              "delete-content-class": "deleteContent",
              "input-content-class": "inputContent",
              "tag-custom-class": "tagCustom",
              placeholder: " you can set custom message"
            },
            on: {
              "handler-after-click-tag": _vm.handlerAfterClickTag,
              "handler-after-input-tag": _vm.handlerAfterInputTag,
              "handler-after-delete-tag": _vm.handlerAfterDeleteTag
            }
          })
        ],
        1
      )
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("ul", [_c("li", [_vm._v("use (Vue)TagEditor component")])])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1c169db0", esExports)
  }
}

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BulmaContent_vue__ = __webpack_require__(8);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c04f447a_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BulmaContent_vue__ = __webpack_require__(28);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(26)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-c04f447a"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BulmaContent_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c04f447a_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_BulmaContent_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "contents/BulmaContent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c04f447a", Component.options)
  } else {
    hotAPI.reload("data-v-c04f447a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(27);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("4ef12154", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-c04f447a\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./BulmaContent.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-c04f447a\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./BulmaContent.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, "\n.tagEditor[data-v-c04f447a] {\n  border: 1px solid gray;\n  margin: 12px;\n  padding: 6px;\n}\n[data-v-c04f447a] .inputContent {\n  border: none;\n  height: 16px;\n}\n[data-v-c04f447a] .tagLabelCustom {\n}\n[data-v-c04f447a] .tagLinkCustom {\n  background-color: gray !important;\n  color: white !important;\n}\n", "", {"version":3,"sources":["/Users/fukudayukihiro/JavaScriptProjects/vue-tag-editor/demo/contents/contents/BulmaContent.vue"],"names":[],"mappings":";AAqEA;EACA,uBAAA;EACA,aAAA;EACA,aAAA;CACA;AACA;EACA,aAAA;EACA,aAAA;CACA;AACA;CACA;AACA;EACA,kCAAA;EACA,wBAAA;CACA","file":"BulmaContent.vue","sourcesContent":["<template>\n  <div>\n    <h2>Bulma Style</h2>\n    <ul>\n      <li>use (Vue)TagEditorBulma component</li>\n      <li>set tag background-color gray when type is link</li>\n      <li>Set tag color white when type is link</li>\n      <li>Set input border none when type is link</li>\n    </ul>\n    <span>\n      <h4>type: label</h4>\n      <!-- do not set css -->\n      <div class=\"tagEditor\">\n        <tag-editor-bulma\n          :tags=\"tagLabels\"\n          :type=\"'label'\"\n          :tag-custom-class=\"'tagLabelCustom'\"\n          @handler-after-input-tag=\"handlerAfterInputTag\"\n          @handler-after-delete-tag=\"handlerAfterDeleteTag\"\n        />\n      </div>\n      <!-- handler-after-click-tag is effective only when type === 'link' -->\n      <!-- if set css, set :inputContentClass -->\n      <h4>type: link</h4>\n      <div class=\"tagEditor\">\n        <tag-editor-bulma\n          :tags=\"tagLinks\"\n          :type=\"'link'\"\n          :tag-custom-class=\"'tagLinkCustom'\"\n          :input-content-class=\"'inputContent'\"\n          @handler-after-click-tag=\"handlerAfterClickTag\"\n          @handler-after-input-tag=\"handlerAfterInputTag\"\n          @handler-after-delete-tag=\"handlerAfterDeleteTag\"\n        />\n      </div>\n    </span>\n  </div>\n</template>\n\n<script>\nexport default {\n  data(){\n    return {\n      tagLabels: ['javascript', 'ruby'],\n      tagLinks:  ['javascript', 'ruby']\n    }\n  },\n  methods: {\n    // Only one argument\n    handlerAfterClickTag(tag){\n      alert(tag + ' is click!')\n    },\n    // Only two argument\n    handlerAfterInputTag(tag, isAddTag){\n      if (isAddTag === true) {\n        console.log(tag + ' is added!')\n      } else {\n        console.log(tag + ' isn\\'t added')\n      }\n    },\n    // Only one argument\n    handlerAfterDeleteTag(tag){\n      console.log(tag + ' is deleted!')\n    }\n  }\n}\n</script>\n\n<style scoped=\"true\">\n.tagEditor {\n  border: 1px solid gray;\n  margin: 12px;\n  padding: 6px;\n}\n/deep/ .inputContent {\n  border: none;\n  height: 16px;\n}\n/deep/ .tagLabelCustom {\n}\n/deep/ .tagLinkCustom {\n  background-color: gray !important;\n  color: white !important;\n}\n</style>"],"sourceRoot":""}]);

// exports


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("h2", [_vm._v("Bulma Style")]),
    _vm._v(" "),
    _vm._m(0),
    _vm._v(" "),
    _c("span", [
      _c("h4", [_vm._v("type: label")]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "tagEditor" },
        [
          _c("tag-editor-bulma", {
            attrs: {
              tags: _vm.tagLabels,
              type: "label",
              "tag-custom-class": "tagLabelCustom"
            },
            on: {
              "handler-after-input-tag": _vm.handlerAfterInputTag,
              "handler-after-delete-tag": _vm.handlerAfterDeleteTag
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("h4", [_vm._v("type: link")]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "tagEditor" },
        [
          _c("tag-editor-bulma", {
            attrs: {
              tags: _vm.tagLinks,
              type: "link",
              "tag-custom-class": "tagLinkCustom",
              "input-content-class": "inputContent"
            },
            on: {
              "handler-after-click-tag": _vm.handlerAfterClickTag,
              "handler-after-input-tag": _vm.handlerAfterInputTag,
              "handler-after-delete-tag": _vm.handlerAfterDeleteTag
            }
          })
        ],
        1
      )
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("ul", [
      _c("li", [_vm._v("use (Vue)TagEditorBulma component")]),
      _vm._v(" "),
      _c("li", [_vm._v("set tag background-color gray when type is link")]),
      _vm._v(" "),
      _c("li", [_vm._v("Set tag color white when type is link")]),
      _vm._v(" "),
      _c("li", [_vm._v("Set input border none when type is link")])
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-c04f447a", esExports)
  }
}

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "span",
    [
      _c("none-style-content"),
      _vm._v(" "),
      _c("br"),
      _vm._v(" "),
      _c("custom-style-content"),
      _vm._v(" "),
      _c("br"),
      _vm._v(" "),
      _c("bulma-content")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-472cff63", esExports)
  }
}

/***/ })
/******/ ]);
//# sourceMappingURL=sourcemaps/bundle.js.map