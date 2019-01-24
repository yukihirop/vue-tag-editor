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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5), __webpack_require__(2), __webpack_require__(16).setImmediate))

/***/ }),
/* 2 */
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
/* 3 */
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
/* 4 */
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

var listToStyles = __webpack_require__(26)

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
/* 5 */
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
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Tags_vue__ = __webpack_require__(7);
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
  name: 'VueTagEditor',
  components: {
    Tags: __WEBPACK_IMPORTED_MODULE_1__Tags_vue__["a" /* default */]
  },
  props: {
    tags: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    type: {
      type: String,
      default: 'label'
    }
  },
  data: function data() {
    return {
      tag: '',
      isAddTag: false,
      eventHub: new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(),
      tagAreaClass: "",
      tagContentClass: "",
      deleteAreaClass: "",
      deleteContentClass: ""
    };
  },
  mounted: function mounted() {
    this.eventHub.$on('click-tag', this._emitClickTag);
    this.eventHub.$on('delete-tag', this._emitDeleteTag);
  },

  methods: {
    inputTagWithEmit: function inputTagWithEmit() {
      var _this = this;

      var tag = this.tag;
      if (this._enableAdd(this.tag)) {
        this.tags.push(this.tag);
        this.isAddTag = true;
      }
      this.tag = null;

      this.$nextTick(function () {
        _this.$emit('handler-after-input-tag', tag, _this.isAddTag);
        _this.isAddTag = false;
      });
    },
    _enableAdd: function _enableAdd(tag) {
      return this.tags.indexOf(tag) == -1 && tag != undefined || '';
    },
    _emitClickTag: function _emitClickTag(tag) {
      this.$emit('handler-after-click-tag', tag);
    },
    _emitDeleteTag: function _emitDeleteTag(tag) {
      this.$emit('handler-after-delete-tag', tag);
    }
  }
});

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Tags_vue__ = __webpack_require__(8);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_acc9a86e_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Tags_vue__ = __webpack_require__(28);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Tags_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_acc9a86e_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Tags_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/Tags.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-acc9a86e", Component.options)
  } else {
    hotAPI.reload("data-v-acc9a86e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tags_TagLabel_vue__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tags_TagLink_vue__ = __webpack_require__(23);
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
  name: "Tags",
  components: {
    TagLabel: __WEBPACK_IMPORTED_MODULE_0__tags_TagLabel_vue__["a" /* default */],
    TagLink: __WEBPACK_IMPORTED_MODULE_1__tags_TagLink_vue__["a" /* default */]
  },
  props: {
    tags: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    type: {
      type: String,
      default: ''
    },
    eventHub: {
      type: Object,
      default: function _default() {
        return null;
      }
    },
    tagAreaClass: {
      type: String,
      default: ""
    },
    tagContentClass: {
      type: String,
      default: ""
    },
    deleteAreaClass: {
      type: String,
      default: ""
    },
    deleteContentClass: {
      type: String,
      default: ""
    }
  },
  computed: {
    isLabel: function isLabel() {
      return this.type === 'label';
    },
    isLink: function isLink() {
      return this.type === 'link';
    }
  },
  methods: {
    deleteTag: function deleteTag(index) {
      this.tags.splice(index, 1);
    }
  }
});

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TagDeleteButton__ = __webpack_require__(10);
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
  name: "TagLabel",
  components: {
    TagDeleteButton: __WEBPACK_IMPORTED_MODULE_0__TagDeleteButton__["a" /* default */]
  },
  props: {
    tagname: {
      type: String,
      default: ''
    },
    eventHub: {
      type: Object,
      default: function _default() {
        return null;
      }
    },
    tagAreaClass: {
      type: String,
      default: ""
    },
    tagContentClass: {
      type: String,
      default: ""
    },
    deleteAreaClass: {
      type: String,
      default: ""
    },
    deleteContentClass: {
      type: String,
      default: ""
    }
  },
  methods: {
    emitDeleteTag: function emitDeleteTag() {
      this.$emit('delete-tag');
    }
  }
});

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TagDeleteButton_vue__ = __webpack_require__(11);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_525e021e_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_TagDeleteButton_vue__ = __webpack_require__(21);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TagDeleteButton_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_525e021e_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_TagDeleteButton_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/tags/TagDeleteButton.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-525e021e", Component.options)
  } else {
    hotAPI.reload("data-v-525e021e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 11 */
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

/* harmony default export */ __webpack_exports__["a"] = ({
  name: "TagDeleteButton",
  props: {
    tagname: {
      type: String,
      default: ''
    },
    eventHub: {
      type: Object,
      default: function _default() {
        return null;
      }
    },
    deleteAreaClass: {
      type: String,
      default: ""
    },
    deleteContentClass: {
      type: String,
      default: ""
    }
  },
  methods: {
    emitDeleteTag: function emitDeleteTag() {
      this.$emit('delete-tag');
      this.eventHub.$emit('delete-tag', this.tagname);
    }
  }
});

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TagDeleteButton__ = __webpack_require__(10);
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
  name: "TagLink",
  components: {
    TagDeleteButton: __WEBPACK_IMPORTED_MODULE_0__TagDeleteButton__["a" /* default */]
  },
  props: {
    tagname: {
      type: String,
      default: ''
    },
    eventHub: {
      type: Object,
      default: function _default() {
        return null;
      }
    },
    tagAreaClass: {
      type: String,
      default: ""
    },
    tagContentClass: {
      type: String,
      default: ""
    },
    deleteAreaClass: {
      type: String,
      default: ""
    },
    deleteContentClass: {
      type: String,
      default: ""
    }
  },
  methods: {
    emitDeleteTag: function emitDeleteTag() {
      this.$emit('delete-tag');
    },
    emitClickTag: function emitClickTag() {
      this.eventHub.$emit('click-tag', this.$refs.tagname.textContent);
    }
  }
});

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Tags_vue__ = __webpack_require__(7);
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
  name: 'VueTagEditorBulma',
  components: {
    Tags: __WEBPACK_IMPORTED_MODULE_1__Tags_vue__["a" /* default */]
  },
  props: {
    tags: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    type: {
      type: String,
      default: 'label'
    }
  },
  data: function data() {
    return {
      tag: '',
      isAddTag: false,
      eventHub: new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(),
      tagAreaClass: "tagAreaClass",
      tagContentClass: "",
      deleteAreaClass: "deleteAreaClass",
      deleteContentClass: "deleteContentClass"
    };
  },
  mounted: function mounted() {
    this.eventHub.$on('click-tag', this._emitClickTag);
    this.eventHub.$on('delete-tag', this._emitDeleteTag);
  },

  methods: {
    inputTagWithEmit: function inputTagWithEmit() {
      var _this = this;

      var tag = this.tag;
      if (this._enableAdd(this.tag)) {
        this.tags.push(this.tag);
        this.isAddTag = true;
      }
      this.tag = null;

      this.$nextTick(function () {
        _this.$emit('handler-after-input-tag', tag, _this.isAddTag);
        _this.isAddTag = false;
      });
    },
    _enableAdd: function _enableAdd(tag) {
      return this.tags.indexOf(tag) == -1 && tag != undefined || '';
    },
    _emitClickTag: function _emitClickTag(tag) {
      this.$emit('handler-after-click-tag', tag);
    },
    _emitDeleteTag: function _emitDeleteTag(tag) {
      this.$emit('handler-after-delete-tag', tag);
    }
  }
});

/***/ }),
/* 14 */
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
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      tagLabels: ['javascript', 'ruby'],
      tagLinks: ['javascript', 'ruby'],
      tagLabelsBulma: ['javascript', 'ruby'],
      tagLinksBulma: ['javascript', 'ruby']
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
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_tag_editor__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__App__ = __webpack_require__(34);




__WEBPACK_IMPORTED_MODULE_0_vue___default.a.component('tag-editor', __WEBPACK_IMPORTED_MODULE_1_vue_tag_editor__["a" /* VueTagEditor */]);
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.component('tag-editor-bulma', __WEBPACK_IMPORTED_MODULE_1_vue_tag_editor__["b" /* VueTagEditorBulma */]);

new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
  el: '#app',
  template: '<App/>',
  components: { App: __WEBPACK_IMPORTED_MODULE_2__App__["a" /* default */] }
});

/***/ }),
/* 16 */
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
__webpack_require__(17);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = typeof self !== "undefined" && self.setImmediate || typeof global !== "undefined" && global.setImmediate || this && this.setImmediate;
exports.clearImmediate = typeof self !== "undefined" && self.clearImmediate || typeof global !== "undefined" && global.clearImmediate || this && this.clearImmediate;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 17 */
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(5)))

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_VueTagEditor__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_tag_editors_VueTagEditorBulma__ = __webpack_require__(30);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__components_VueTagEditor__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__components_tag_editors_VueTagEditorBulma__["a"]; });





/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VueTagEditor_vue__ = __webpack_require__(6);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a3d9ab1e_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_VueTagEditor_vue__ = __webpack_require__(29);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VueTagEditor_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a3d9ab1e_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_VueTagEditor_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/VueTagEditor.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a3d9ab1e", Component.options)
  } else {
    hotAPI.reload("data-v-a3d9ab1e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TagLabel_vue__ = __webpack_require__(9);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_9f1b0e20_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_TagLabel_vue__ = __webpack_require__(22);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TagLabel_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_9f1b0e20_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_TagLabel_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/tags/TagLabel.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9f1b0e20", Component.options)
  } else {
    hotAPI.reload("data-v-9f1b0e20", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("span", [
    _c(
      "button",
      { class: _vm.deleteAreaClass, on: { click: _vm.emitDeleteTag } },
      [_c("span", { class: _vm.deleteContentClass }, [_vm._v("x")])]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-525e021e", esExports)
  }
}

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "span",
    { class: _vm.tagAreaClass },
    [
      _c("span", { ref: "tagname" }, [
        _c("label", { class: _vm.tagContentClass }, [
          _vm._v(_vm._s(_vm.tagname))
        ])
      ]),
      _vm._v(" "),
      _c("tag-delete-button", {
        attrs: {
          tagname: _vm.tagname,
          "event-hub": _vm.eventHub,
          deleteAreaClass: _vm.deleteAreaClass,
          deleteContentClass: _vm.deleteContentClass
        },
        on: { "delete-tag": _vm.emitDeleteTag }
      })
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
    require("vue-hot-reload-api")      .rerender("data-v-9f1b0e20", esExports)
  }
}

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TagLink_vue__ = __webpack_require__(12);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_cf6790a4_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_TagLink_vue__ = __webpack_require__(27);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(24)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-cf6790a4"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TagLink_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_cf6790a4_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_TagLink_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/tags/TagLink.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-cf6790a4", Component.options)
  } else {
    hotAPI.reload("data-v-cf6790a4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(25);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("4afa783f", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-cf6790a4\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./TagLink.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-cf6790a4\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./TagLink.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(true);
// imports


// module
exports.push([module.i, "\na[data-v-cf6790a4] {\n  text-decoration: none;\n}\na[data-v-cf6790a4]:hover {\n  text-decoration: underline;\n  cursor: pointer;\n}\n", "", {"version":3,"sources":["/Users/fukudayukihiro/JavaScriptProjects/vue-tag-editor/src/components/src/components/tags/TagLink.vue"],"names":[],"mappings":";AAoEA;EACA,sBAAA;CACA;AACA;EACA,2BAAA;EACA,gBAAA;CACA","file":"TagLink.vue","sourcesContent":["<template>\n  <span :class=\"tagAreaClass\">\n    <span\n      ref=\"tagname\"\n      @click=\"emitClickTag\"\n    >\n      <a :class=\"tagContentClass\">\n        <span>{{ tagname }}</span>\n      </a>\n    </span>\n    <tag-delete-button\n      :tagname=\"tagname\"\n      :event-hub=\"eventHub\"\n      :deleteAreaClass=\"deleteAreaClass\"\n      :deleteContentClass=\"deleteContentClass\"\n      @delete-tag=\"emitDeleteTag\"\n    />\n  </span>\n</template>\n\n<script>\nimport TagDeleteButton from './TagDeleteButton'\n\nexport default {\n  name: \"TagLink\",\n  components: {\n    TagDeleteButton: TagDeleteButton\n  },\n  props:{\n    tagname:{\n      type: String,\n      default: ''\n    },\n    eventHub: {\n      type: Object,\n      default(){\n        return null\n      }\n    },\n    tagAreaClass: {\n      type: String,\n      default: \"\"\n    },\n    tagContentClass: {\n      type: String,\n      default: \"\"\n    },\n    deleteAreaClass: {\n      type: String,\n      default: \"\"\n    },\n    deleteContentClass: {\n      type: String,\n      default: \"\"\n    }\n  },\n  methods: {\n    emitDeleteTag(){\n      this.$emit('delete-tag')\n    },\n    emitClickTag(){\n      this.eventHub.$emit('click-tag', this.$refs.tagname.textContent)\n    }\n  }\n}\n</script>\n\n<style scoped=\"true\">\na {\n  text-decoration: none;\n}\na:hover {\n  text-decoration: underline;\n  cursor: pointer;\n}\n</style>"],"sourceRoot":""}]);

// exports


/***/ }),
/* 26 */
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
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "span",
    { class: _vm.tagAreaClass },
    [
      _c("span", { ref: "tagname", on: { click: _vm.emitClickTag } }, [
        _c("a", { class: _vm.tagContentClass }, [
          _c("span", [_vm._v(_vm._s(_vm.tagname))])
        ])
      ]),
      _vm._v(" "),
      _c("tag-delete-button", {
        attrs: {
          tagname: _vm.tagname,
          "event-hub": _vm.eventHub,
          deleteAreaClass: _vm.deleteAreaClass,
          deleteContentClass: _vm.deleteContentClass
        },
        on: { "delete-tag": _vm.emitDeleteTag }
      })
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
    require("vue-hot-reload-api")      .rerender("data-v-cf6790a4", esExports)
  }
}

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "span",
    _vm._l(_vm.tags, function(tag, index) {
      return _c(
        "span",
        { key: tag.id },
        [
          _vm.isLabel
            ? _c("tag-label", {
                attrs: {
                  tagname: tag,
                  "event-hub": _vm.eventHub,
                  tagAreaClass: _vm.tagAreaClass,
                  tagContentClass: _vm.tagContentClass,
                  deleteAreaClass: _vm.deleteAreaClass,
                  deleteContentClass: _vm.deleteContentClass
                },
                on: {
                  "delete-tag": function($event) {
                    _vm.deleteTag(index)
                  }
                }
              })
            : _vm._e(),
          _vm._v(" "),
          _vm.isLink
            ? _c("tag-link", {
                attrs: {
                  tagname: tag,
                  "event-hub": _vm.eventHub,
                  tagAreaClass: _vm.tagAreaClass,
                  tagContentClass: _vm.tagContentClass,
                  deleteAreaClass: _vm.deleteAreaClass,
                  deleteContentClass: _vm.deleteContentClass
                },
                on: {
                  "delete-tag": function($event) {
                    _vm.deleteTag(index)
                  }
                }
              })
            : _vm._e()
        ],
        1
      )
    }),
    0
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-acc9a86e", esExports)
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
      _c("tags", {
        attrs: {
          tags: _vm.tags,
          type: _vm.type,
          "event-hub": _vm.eventHub,
          tagAreaClass: _vm.tagAreaClass,
          tagContentClass: _vm.tagContentClass,
          deleteAreaClass: _vm.deleteAreaClass,
          deleteContentClass: _vm.deleteContentClass
        }
      }),
      _vm._v(" "),
      _c("input", {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.tag,
            expression: "tag"
          }
        ],
        attrs: { placeholder: "Add tags..." },
        domProps: { value: _vm.tag },
        on: {
          keyup: function($event) {
            if (
              !("button" in $event) &&
              _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
            ) {
              return null
            }
            return _vm.inputTagWithEmit($event)
          },
          input: function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.tag = $event.target.value
          }
        }
      })
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
    require("vue-hot-reload-api")      .rerender("data-v-a3d9ab1e", esExports)
  }
}

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VueTagEditorBulma_vue__ = __webpack_require__(13);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4831c6fe_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_VueTagEditorBulma_vue__ = __webpack_require__(33);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(31)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-4831c6fe"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VueTagEditorBulma_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4831c6fe_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_VueTagEditorBulma_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/tag_editors/VueTagEditorBulma.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4831c6fe", Component.options)
  } else {
    hotAPI.reload("data-v-4831c6fe", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(32);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("de91df56", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4831c6fe\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./VueTagEditorBulma.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4831c6fe\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./VueTagEditorBulma.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(true);
// imports


// module
exports.push([module.i, "/*! bulma.io v0.7.2 | MIT License | github.com/jgthms/bulma */\n@keyframes spinAround-data-v-4831c6fe {\nfrom {\n    transform: rotate(0deg);\n}\nto {\n    transform: rotate(359deg);\n}\n}\n.delete[data-v-4831c6fe], .modal-close[data-v-4831c6fe], .is-unselectable[data-v-4831c6fe], .button[data-v-4831c6fe], .file[data-v-4831c6fe], .breadcrumb[data-v-4831c6fe], .pagination-previous[data-v-4831c6fe],\n.pagination-next[data-v-4831c6fe],\n.pagination-link[data-v-4831c6fe],\n.pagination-ellipsis[data-v-4831c6fe], .tabs[data-v-4831c6fe] {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n.select[data-v-4831c6fe]:not(.is-multiple):not(.is-loading)::after, .navbar-link[data-v-4831c6fe]:not(.is-arrowless)::after {\n  border: 3px solid transparent;\n  border-radius: 2px;\n  border-right: 0;\n  border-top: 0;\n  content: \" \";\n  display: block;\n  height: 0.625em;\n  margin-top: -0.4375em;\n  pointer-events: none;\n  position: absolute;\n  top: 50%;\n  transform: rotate(-45deg);\n  transform-origin: center;\n  width: 0.625em;\n}\n.box[data-v-4831c6fe]:not(:last-child), .content[data-v-4831c6fe]:not(:last-child), .notification[data-v-4831c6fe]:not(:last-child), .progress[data-v-4831c6fe]:not(:last-child), .table[data-v-4831c6fe]:not(:last-child), .table-container[data-v-4831c6fe]:not(:last-child), .title[data-v-4831c6fe]:not(:last-child),\n.subtitle[data-v-4831c6fe]:not(:last-child), .block[data-v-4831c6fe]:not(:last-child), .highlight[data-v-4831c6fe]:not(:last-child), .breadcrumb[data-v-4831c6fe]:not(:last-child), .level[data-v-4831c6fe]:not(:last-child), .list[data-v-4831c6fe]:not(:last-child), .message[data-v-4831c6fe]:not(:last-child), .tabs[data-v-4831c6fe]:not(:last-child) {\n  margin-bottom: 1.5rem;\n}\n.delete[data-v-4831c6fe], .modal-close[data-v-4831c6fe] {\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  background-color: rgba(10, 10, 10, 0.2);\n  border: none;\n  border-radius: 290486px;\n  cursor: pointer;\n  pointer-events: auto;\n  display: inline-block;\n  flex-grow: 0;\n  flex-shrink: 0;\n  font-size: 0;\n  height: 20px;\n  max-height: 20px;\n  max-width: 20px;\n  min-height: 20px;\n  min-width: 20px;\n  outline: none;\n  position: relative;\n  vertical-align: top;\n  width: 20px;\n}\n.delete[data-v-4831c6fe]::before, .modal-close[data-v-4831c6fe]::before, .delete[data-v-4831c6fe]::after, .modal-close[data-v-4831c6fe]::after {\n    background-color: white;\n    content: \"\";\n    display: block;\n    left: 50%;\n    position: absolute;\n    top: 50%;\n    transform: translateX(-50%) translateY(-50%) rotate(45deg);\n    transform-origin: center center;\n}\n.delete[data-v-4831c6fe]::before, .modal-close[data-v-4831c6fe]::before {\n    height: 2px;\n    width: 50%;\n}\n.delete[data-v-4831c6fe]::after, .modal-close[data-v-4831c6fe]::after {\n    height: 50%;\n    width: 2px;\n}\n.delete[data-v-4831c6fe]:hover, .modal-close[data-v-4831c6fe]:hover, .delete[data-v-4831c6fe]:focus, .modal-close[data-v-4831c6fe]:focus {\n    background-color: rgba(10, 10, 10, 0.3);\n}\n.delete[data-v-4831c6fe]:active, .modal-close[data-v-4831c6fe]:active {\n    background-color: rgba(10, 10, 10, 0.4);\n}\n.is-small.delete[data-v-4831c6fe], .is-small.modal-close[data-v-4831c6fe] {\n    height: 16px;\n    max-height: 16px;\n    max-width: 16px;\n    min-height: 16px;\n    min-width: 16px;\n    width: 16px;\n}\n.is-medium.delete[data-v-4831c6fe], .is-medium.modal-close[data-v-4831c6fe] {\n    height: 24px;\n    max-height: 24px;\n    max-width: 24px;\n    min-height: 24px;\n    min-width: 24px;\n    width: 24px;\n}\n.is-large.delete[data-v-4831c6fe], .is-large.modal-close[data-v-4831c6fe] {\n    height: 32px;\n    max-height: 32px;\n    max-width: 32px;\n    min-height: 32px;\n    min-width: 32px;\n    width: 32px;\n}\n.button.is-loading[data-v-4831c6fe]::after, .select.is-loading[data-v-4831c6fe]::after, .control.is-loading[data-v-4831c6fe]::after, .loader[data-v-4831c6fe] {\n  animation: spinAround-data-v-4831c6fe 500ms infinite linear;\n  border: 2px solid #dbdbdb;\n  border-radius: 290486px;\n  border-right-color: transparent;\n  border-top-color: transparent;\n  content: \"\";\n  display: block;\n  height: 1em;\n  position: relative;\n  width: 1em;\n}\n.is-overlay[data-v-4831c6fe], .image.is-square img[data-v-4831c6fe], .image.is-1by1 img[data-v-4831c6fe], .image.is-5by4 img[data-v-4831c6fe], .image.is-4by3 img[data-v-4831c6fe], .image.is-3by2 img[data-v-4831c6fe], .image.is-5by3 img[data-v-4831c6fe], .image.is-16by9 img[data-v-4831c6fe], .image.is-2by1 img[data-v-4831c6fe], .image.is-3by1 img[data-v-4831c6fe], .image.is-4by5 img[data-v-4831c6fe], .image.is-3by4 img[data-v-4831c6fe], .image.is-2by3 img[data-v-4831c6fe], .image.is-3by5 img[data-v-4831c6fe], .image.is-9by16 img[data-v-4831c6fe], .image.is-1by2 img[data-v-4831c6fe], .image.is-1by3 img[data-v-4831c6fe], .modal[data-v-4831c6fe], .modal-background[data-v-4831c6fe], .hero-video[data-v-4831c6fe] {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n.button[data-v-4831c6fe], .input[data-v-4831c6fe],\n.textarea[data-v-4831c6fe], .select select[data-v-4831c6fe], .file-cta[data-v-4831c6fe],\n.file-name[data-v-4831c6fe], .pagination-previous[data-v-4831c6fe],\n.pagination-next[data-v-4831c6fe],\n.pagination-link[data-v-4831c6fe],\n.pagination-ellipsis[data-v-4831c6fe] {\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  align-items: center;\n  border: 1px solid transparent;\n  border-radius: 4px;\n  box-shadow: none;\n  display: inline-flex;\n  font-size: 1rem;\n  height: 2.25em;\n  justify-content: flex-start;\n  line-height: 1.5;\n  padding-bottom: calc(0.375em - 1px);\n  padding-left: calc(0.625em - 1px);\n  padding-right: calc(0.625em - 1px);\n  padding-top: calc(0.375em - 1px);\n  position: relative;\n  vertical-align: top;\n}\n.button[data-v-4831c6fe]:focus, .input[data-v-4831c6fe]:focus,\n  .textarea[data-v-4831c6fe]:focus, .select select[data-v-4831c6fe]:focus, .file-cta[data-v-4831c6fe]:focus,\n  .file-name[data-v-4831c6fe]:focus, .pagination-previous[data-v-4831c6fe]:focus,\n  .pagination-next[data-v-4831c6fe]:focus,\n  .pagination-link[data-v-4831c6fe]:focus,\n  .pagination-ellipsis[data-v-4831c6fe]:focus, .is-focused.button[data-v-4831c6fe], .is-focused.input[data-v-4831c6fe],\n  .is-focused.textarea[data-v-4831c6fe], .select select.is-focused[data-v-4831c6fe], .is-focused.file-cta[data-v-4831c6fe],\n  .is-focused.file-name[data-v-4831c6fe], .is-focused.pagination-previous[data-v-4831c6fe],\n  .is-focused.pagination-next[data-v-4831c6fe],\n  .is-focused.pagination-link[data-v-4831c6fe],\n  .is-focused.pagination-ellipsis[data-v-4831c6fe], .button[data-v-4831c6fe]:active, .input[data-v-4831c6fe]:active,\n  .textarea[data-v-4831c6fe]:active, .select select[data-v-4831c6fe]:active, .file-cta[data-v-4831c6fe]:active,\n  .file-name[data-v-4831c6fe]:active, .pagination-previous[data-v-4831c6fe]:active,\n  .pagination-next[data-v-4831c6fe]:active,\n  .pagination-link[data-v-4831c6fe]:active,\n  .pagination-ellipsis[data-v-4831c6fe]:active, .is-active.button[data-v-4831c6fe], .is-active.input[data-v-4831c6fe],\n  .is-active.textarea[data-v-4831c6fe], .select select.is-active[data-v-4831c6fe], .is-active.file-cta[data-v-4831c6fe],\n  .is-active.file-name[data-v-4831c6fe], .is-active.pagination-previous[data-v-4831c6fe],\n  .is-active.pagination-next[data-v-4831c6fe],\n  .is-active.pagination-link[data-v-4831c6fe],\n  .is-active.pagination-ellipsis[data-v-4831c6fe] {\n    outline: none;\n}\n.button[disabled][data-v-4831c6fe], .input[disabled][data-v-4831c6fe],\n  .textarea[disabled][data-v-4831c6fe], .select select[disabled][data-v-4831c6fe], .file-cta[disabled][data-v-4831c6fe],\n  .file-name[disabled][data-v-4831c6fe], .pagination-previous[disabled][data-v-4831c6fe],\n  .pagination-next[disabled][data-v-4831c6fe],\n  .pagination-link[disabled][data-v-4831c6fe],\n  .pagination-ellipsis[disabled][data-v-4831c6fe] {\n    cursor: not-allowed;\n}\n\n/*! minireset.css v0.0.3 | MIT License | github.com/jgthms/minireset.css */\nhtml[data-v-4831c6fe],\nbody[data-v-4831c6fe],\np[data-v-4831c6fe],\nol[data-v-4831c6fe],\nul[data-v-4831c6fe],\nli[data-v-4831c6fe],\ndl[data-v-4831c6fe],\ndt[data-v-4831c6fe],\ndd[data-v-4831c6fe],\nblockquote[data-v-4831c6fe],\nfigure[data-v-4831c6fe],\nfieldset[data-v-4831c6fe],\nlegend[data-v-4831c6fe],\ntextarea[data-v-4831c6fe],\npre[data-v-4831c6fe],\niframe[data-v-4831c6fe],\nhr[data-v-4831c6fe],\nh1[data-v-4831c6fe],\nh2[data-v-4831c6fe],\nh3[data-v-4831c6fe],\nh4[data-v-4831c6fe],\nh5[data-v-4831c6fe],\nh6[data-v-4831c6fe] {\n  margin: 0;\n  padding: 0;\n}\nh1[data-v-4831c6fe],\nh2[data-v-4831c6fe],\nh3[data-v-4831c6fe],\nh4[data-v-4831c6fe],\nh5[data-v-4831c6fe],\nh6[data-v-4831c6fe] {\n  font-size: 100%;\n  font-weight: normal;\n}\nul[data-v-4831c6fe] {\n  list-style: none;\n}\nbutton[data-v-4831c6fe],\ninput[data-v-4831c6fe],\nselect[data-v-4831c6fe],\ntextarea[data-v-4831c6fe] {\n  margin: 0;\n}\nhtml[data-v-4831c6fe] {\n  box-sizing: border-box;\n}\n*[data-v-4831c6fe], *[data-v-4831c6fe]::before, *[data-v-4831c6fe]::after {\n  box-sizing: inherit;\n}\nimg[data-v-4831c6fe],\naudio[data-v-4831c6fe],\nvideo[data-v-4831c6fe] {\n  height: auto;\n  max-width: 100%;\n}\niframe[data-v-4831c6fe] {\n  border: 0;\n}\ntable[data-v-4831c6fe] {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\ntd[data-v-4831c6fe],\nth[data-v-4831c6fe] {\n  padding: 0;\n  text-align: left;\n}\nhtml[data-v-4831c6fe] {\n  background-color: white;\n  font-size: 16px;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  min-width: 300px;\n  overflow-x: hidden;\n  overflow-y: scroll;\n  text-rendering: optimizeLegibility;\n  text-size-adjust: 100%;\n}\narticle[data-v-4831c6fe],\naside[data-v-4831c6fe],\nfigure[data-v-4831c6fe],\nfooter[data-v-4831c6fe],\nheader[data-v-4831c6fe],\nhgroup[data-v-4831c6fe],\nsection[data-v-4831c6fe] {\n  display: block;\n}\nbody[data-v-4831c6fe],\nbutton[data-v-4831c6fe],\ninput[data-v-4831c6fe],\nselect[data-v-4831c6fe],\ntextarea[data-v-4831c6fe] {\n  font-family: BlinkMacSystemFont, -apple-system, \"Segoe UI\", \"Roboto\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", sans-serif;\n}\ncode[data-v-4831c6fe],\npre[data-v-4831c6fe] {\n  -moz-osx-font-smoothing: auto;\n  -webkit-font-smoothing: auto;\n  font-family: monospace;\n}\nbody[data-v-4831c6fe] {\n  color: #4a4a4a;\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5;\n}\na[data-v-4831c6fe] {\n  color: #3273dc;\n  cursor: pointer;\n  text-decoration: none;\n}\na strong[data-v-4831c6fe] {\n    color: currentColor;\n}\na[data-v-4831c6fe]:hover {\n    color: #363636;\n}\ncode[data-v-4831c6fe] {\n  background-color: whitesmoke;\n  color: #ff3860;\n  font-size: 0.875em;\n  font-weight: normal;\n  padding: 0.25em 0.5em 0.25em;\n}\nhr[data-v-4831c6fe] {\n  background-color: whitesmoke;\n  border: none;\n  display: block;\n  height: 2px;\n  margin: 1.5rem 0;\n}\nimg[data-v-4831c6fe] {\n  height: auto;\n  max-width: 100%;\n}\ninput[type=\"checkbox\"][data-v-4831c6fe],\ninput[type=\"radio\"][data-v-4831c6fe] {\n  vertical-align: baseline;\n}\nsmall[data-v-4831c6fe] {\n  font-size: 0.875em;\n}\nspan[data-v-4831c6fe] {\n  font-style: inherit;\n  font-weight: inherit;\n}\nstrong[data-v-4831c6fe] {\n  color: #363636;\n  font-weight: 700;\n}\npre[data-v-4831c6fe] {\n  -webkit-overflow-scrolling: touch;\n  background-color: whitesmoke;\n  color: #4a4a4a;\n  font-size: 0.875em;\n  overflow-x: auto;\n  padding: 1.25rem 1.5rem;\n  white-space: pre;\n  word-wrap: normal;\n}\npre code[data-v-4831c6fe] {\n    background-color: transparent;\n    color: currentColor;\n    font-size: 1em;\n    padding: 0;\n}\ntable td[data-v-4831c6fe],\ntable th[data-v-4831c6fe] {\n  text-align: left;\n  vertical-align: top;\n}\ntable th[data-v-4831c6fe] {\n  color: #363636;\n}\n.is-clearfix[data-v-4831c6fe]::after {\n  clear: both;\n  content: \" \";\n  display: table;\n}\n.is-pulled-left[data-v-4831c6fe] {\n  float: left !important;\n}\n.is-pulled-right[data-v-4831c6fe] {\n  float: right !important;\n}\n.is-clipped[data-v-4831c6fe] {\n  overflow: hidden !important;\n}\n.is-size-1[data-v-4831c6fe] {\n  font-size: 3rem !important;\n}\n.is-size-2[data-v-4831c6fe] {\n  font-size: 2.5rem !important;\n}\n.is-size-3[data-v-4831c6fe] {\n  font-size: 2rem !important;\n}\n.is-size-4[data-v-4831c6fe] {\n  font-size: 1.5rem !important;\n}\n.is-size-5[data-v-4831c6fe] {\n  font-size: 1.25rem !important;\n}\n.is-size-6[data-v-4831c6fe] {\n  font-size: 1rem !important;\n}\n.is-size-7[data-v-4831c6fe] {\n  font-size: 0.75rem !important;\n}\n@media screen and (max-width: 768px) {\n.is-size-1-mobile[data-v-4831c6fe] {\n    font-size: 3rem !important;\n}\n.is-size-2-mobile[data-v-4831c6fe] {\n    font-size: 2.5rem !important;\n}\n.is-size-3-mobile[data-v-4831c6fe] {\n    font-size: 2rem !important;\n}\n.is-size-4-mobile[data-v-4831c6fe] {\n    font-size: 1.5rem !important;\n}\n.is-size-5-mobile[data-v-4831c6fe] {\n    font-size: 1.25rem !important;\n}\n.is-size-6-mobile[data-v-4831c6fe] {\n    font-size: 1rem !important;\n}\n.is-size-7-mobile[data-v-4831c6fe] {\n    font-size: 0.75rem !important;\n}\n}\n@media screen and (min-width: 769px), print {\n.is-size-1-tablet[data-v-4831c6fe] {\n    font-size: 3rem !important;\n}\n.is-size-2-tablet[data-v-4831c6fe] {\n    font-size: 2.5rem !important;\n}\n.is-size-3-tablet[data-v-4831c6fe] {\n    font-size: 2rem !important;\n}\n.is-size-4-tablet[data-v-4831c6fe] {\n    font-size: 1.5rem !important;\n}\n.is-size-5-tablet[data-v-4831c6fe] {\n    font-size: 1.25rem !important;\n}\n.is-size-6-tablet[data-v-4831c6fe] {\n    font-size: 1rem !important;\n}\n.is-size-7-tablet[data-v-4831c6fe] {\n    font-size: 0.75rem !important;\n}\n}\n@media screen and (max-width: 1087px) {\n.is-size-1-touch[data-v-4831c6fe] {\n    font-size: 3rem !important;\n}\n.is-size-2-touch[data-v-4831c6fe] {\n    font-size: 2.5rem !important;\n}\n.is-size-3-touch[data-v-4831c6fe] {\n    font-size: 2rem !important;\n}\n.is-size-4-touch[data-v-4831c6fe] {\n    font-size: 1.5rem !important;\n}\n.is-size-5-touch[data-v-4831c6fe] {\n    font-size: 1.25rem !important;\n}\n.is-size-6-touch[data-v-4831c6fe] {\n    font-size: 1rem !important;\n}\n.is-size-7-touch[data-v-4831c6fe] {\n    font-size: 0.75rem !important;\n}\n}\n@media screen and (min-width: 1088px) {\n.is-size-1-desktop[data-v-4831c6fe] {\n    font-size: 3rem !important;\n}\n.is-size-2-desktop[data-v-4831c6fe] {\n    font-size: 2.5rem !important;\n}\n.is-size-3-desktop[data-v-4831c6fe] {\n    font-size: 2rem !important;\n}\n.is-size-4-desktop[data-v-4831c6fe] {\n    font-size: 1.5rem !important;\n}\n.is-size-5-desktop[data-v-4831c6fe] {\n    font-size: 1.25rem !important;\n}\n.is-size-6-desktop[data-v-4831c6fe] {\n    font-size: 1rem !important;\n}\n.is-size-7-desktop[data-v-4831c6fe] {\n    font-size: 0.75rem !important;\n}\n}\n@media screen and (min-width: 1280px) {\n.is-size-1-widescreen[data-v-4831c6fe] {\n    font-size: 3rem !important;\n}\n.is-size-2-widescreen[data-v-4831c6fe] {\n    font-size: 2.5rem !important;\n}\n.is-size-3-widescreen[data-v-4831c6fe] {\n    font-size: 2rem !important;\n}\n.is-size-4-widescreen[data-v-4831c6fe] {\n    font-size: 1.5rem !important;\n}\n.is-size-5-widescreen[data-v-4831c6fe] {\n    font-size: 1.25rem !important;\n}\n.is-size-6-widescreen[data-v-4831c6fe] {\n    font-size: 1rem !important;\n}\n.is-size-7-widescreen[data-v-4831c6fe] {\n    font-size: 0.75rem !important;\n}\n}\n@media screen and (min-width: 1472px) {\n.is-size-1-fullhd[data-v-4831c6fe] {\n    font-size: 3rem !important;\n}\n.is-size-2-fullhd[data-v-4831c6fe] {\n    font-size: 2.5rem !important;\n}\n.is-size-3-fullhd[data-v-4831c6fe] {\n    font-size: 2rem !important;\n}\n.is-size-4-fullhd[data-v-4831c6fe] {\n    font-size: 1.5rem !important;\n}\n.is-size-5-fullhd[data-v-4831c6fe] {\n    font-size: 1.25rem !important;\n}\n.is-size-6-fullhd[data-v-4831c6fe] {\n    font-size: 1rem !important;\n}\n.is-size-7-fullhd[data-v-4831c6fe] {\n    font-size: 0.75rem !important;\n}\n}\n.has-text-centered[data-v-4831c6fe] {\n  text-align: center !important;\n}\n.has-text-justified[data-v-4831c6fe] {\n  text-align: justify !important;\n}\n.has-text-left[data-v-4831c6fe] {\n  text-align: left !important;\n}\n.has-text-right[data-v-4831c6fe] {\n  text-align: right !important;\n}\n@media screen and (max-width: 768px) {\n.has-text-centered-mobile[data-v-4831c6fe] {\n    text-align: center !important;\n}\n}\n@media screen and (min-width: 769px), print {\n.has-text-centered-tablet[data-v-4831c6fe] {\n    text-align: center !important;\n}\n}\n@media screen and (min-width: 769px) and (max-width: 1087px) {\n.has-text-centered-tablet-only[data-v-4831c6fe] {\n    text-align: center !important;\n}\n}\n@media screen and (max-width: 1087px) {\n.has-text-centered-touch[data-v-4831c6fe] {\n    text-align: center !important;\n}\n}\n@media screen and (min-width: 1088px) {\n.has-text-centered-desktop[data-v-4831c6fe] {\n    text-align: center !important;\n}\n}\n@media screen and (min-width: 1088px) and (max-width: 1279px) {\n.has-text-centered-desktop-only[data-v-4831c6fe] {\n    text-align: center !important;\n}\n}\n@media screen and (min-width: 1280px) {\n.has-text-centered-widescreen[data-v-4831c6fe] {\n    text-align: center !important;\n}\n}\n@media screen and (min-width: 1280px) and (max-width: 1471px) {\n.has-text-centered-widescreen-only[data-v-4831c6fe] {\n    text-align: center !important;\n}\n}\n@media screen and (min-width: 1472px) {\n.has-text-centered-fullhd[data-v-4831c6fe] {\n    text-align: center !important;\n}\n}\n@media screen and (max-width: 768px) {\n.has-text-justified-mobile[data-v-4831c6fe] {\n    text-align: justify !important;\n}\n}\n@media screen and (min-width: 769px), print {\n.has-text-justified-tablet[data-v-4831c6fe] {\n    text-align: justify !important;\n}\n}\n@media screen and (min-width: 769px) and (max-width: 1087px) {\n.has-text-justified-tablet-only[data-v-4831c6fe] {\n    text-align: justify !important;\n}\n}\n@media screen and (max-width: 1087px) {\n.has-text-justified-touch[data-v-4831c6fe] {\n    text-align: justify !important;\n}\n}\n@media screen and (min-width: 1088px) {\n.has-text-justified-desktop[data-v-4831c6fe] {\n    text-align: justify !important;\n}\n}\n@media screen and (min-width: 1088px) and (max-width: 1279px) {\n.has-text-justified-desktop-only[data-v-4831c6fe] {\n    text-align: justify !important;\n}\n}\n@media screen and (min-width: 1280px) {\n.has-text-justified-widescreen[data-v-4831c6fe] {\n    text-align: justify !important;\n}\n}\n@media screen and (min-width: 1280px) and (max-width: 1471px) {\n.has-text-justified-widescreen-only[data-v-4831c6fe] {\n    text-align: justify !important;\n}\n}\n@media screen and (min-width: 1472px) {\n.has-text-justified-fullhd[data-v-4831c6fe] {\n    text-align: justify !important;\n}\n}\n@media screen and (max-width: 768px) {\n.has-text-left-mobile[data-v-4831c6fe] {\n    text-align: left !important;\n}\n}\n@media screen and (min-width: 769px), print {\n.has-text-left-tablet[data-v-4831c6fe] {\n    text-align: left !important;\n}\n}\n@media screen and (min-width: 769px) and (max-width: 1087px) {\n.has-text-left-tablet-only[data-v-4831c6fe] {\n    text-align: left !important;\n}\n}\n@media screen and (max-width: 1087px) {\n.has-text-left-touch[data-v-4831c6fe] {\n    text-align: left !important;\n}\n}\n@media screen and (min-width: 1088px) {\n.has-text-left-desktop[data-v-4831c6fe] {\n    text-align: left !important;\n}\n}\n@media screen and (min-width: 1088px) and (max-width: 1279px) {\n.has-text-left-desktop-only[data-v-4831c6fe] {\n    text-align: left !important;\n}\n}\n@media screen and (min-width: 1280px) {\n.has-text-left-widescreen[data-v-4831c6fe] {\n    text-align: left !important;\n}\n}\n@media screen and (min-width: 1280px) and (max-width: 1471px) {\n.has-text-left-widescreen-only[data-v-4831c6fe] {\n    text-align: left !important;\n}\n}\n@media screen and (min-width: 1472px) {\n.has-text-left-fullhd[data-v-4831c6fe] {\n    text-align: left !important;\n}\n}\n@media screen and (max-width: 768px) {\n.has-text-right-mobile[data-v-4831c6fe] {\n    text-align: right !important;\n}\n}\n@media screen and (min-width: 769px), print {\n.has-text-right-tablet[data-v-4831c6fe] {\n    text-align: right !important;\n}\n}\n@media screen and (min-width: 769px) and (max-width: 1087px) {\n.has-text-right-tablet-only[data-v-4831c6fe] {\n    text-align: right !important;\n}\n}\n@media screen and (max-width: 1087px) {\n.has-text-right-touch[data-v-4831c6fe] {\n    text-align: right !important;\n}\n}\n@media screen and (min-width: 1088px) {\n.has-text-right-desktop[data-v-4831c6fe] {\n    text-align: right !important;\n}\n}\n@media screen and (min-width: 1088px) and (max-width: 1279px) {\n.has-text-right-desktop-only[data-v-4831c6fe] {\n    text-align: right !important;\n}\n}\n@media screen and (min-width: 1280px) {\n.has-text-right-widescreen[data-v-4831c6fe] {\n    text-align: right !important;\n}\n}\n@media screen and (min-width: 1280px) and (max-width: 1471px) {\n.has-text-right-widescreen-only[data-v-4831c6fe] {\n    text-align: right !important;\n}\n}\n@media screen and (min-width: 1472px) {\n.has-text-right-fullhd[data-v-4831c6fe] {\n    text-align: right !important;\n}\n}\n.is-capitalized[data-v-4831c6fe] {\n  text-transform: capitalize !important;\n}\n.is-lowercase[data-v-4831c6fe] {\n  text-transform: lowercase !important;\n}\n.is-uppercase[data-v-4831c6fe] {\n  text-transform: uppercase !important;\n}\n.is-italic[data-v-4831c6fe] {\n  font-style: italic !important;\n}\n.has-text-white[data-v-4831c6fe] {\n  color: white !important;\n}\na.has-text-white[data-v-4831c6fe]:hover, a.has-text-white[data-v-4831c6fe]:focus {\n  color: #e6e6e6 !important;\n}\n.has-background-white[data-v-4831c6fe] {\n  background-color: white !important;\n}\n.has-text-black[data-v-4831c6fe] {\n  color: #0a0a0a !important;\n}\na.has-text-black[data-v-4831c6fe]:hover, a.has-text-black[data-v-4831c6fe]:focus {\n  color: black !important;\n}\n.has-background-black[data-v-4831c6fe] {\n  background-color: #0a0a0a !important;\n}\n.has-text-light[data-v-4831c6fe] {\n  color: whitesmoke !important;\n}\na.has-text-light[data-v-4831c6fe]:hover, a.has-text-light[data-v-4831c6fe]:focus {\n  color: #dbdbdb !important;\n}\n.has-background-light[data-v-4831c6fe] {\n  background-color: whitesmoke !important;\n}\n.has-text-dark[data-v-4831c6fe] {\n  color: #363636 !important;\n}\na.has-text-dark[data-v-4831c6fe]:hover, a.has-text-dark[data-v-4831c6fe]:focus {\n  color: #1c1c1c !important;\n}\n.has-background-dark[data-v-4831c6fe] {\n  background-color: #363636 !important;\n}\n.has-text-primary[data-v-4831c6fe] {\n  color: #00d1b2 !important;\n}\na.has-text-primary[data-v-4831c6fe]:hover, a.has-text-primary[data-v-4831c6fe]:focus {\n  color: #009e86 !important;\n}\n.has-background-primary[data-v-4831c6fe] {\n  background-color: #00d1b2 !important;\n}\n.has-text-link[data-v-4831c6fe] {\n  color: #3273dc !important;\n}\na.has-text-link[data-v-4831c6fe]:hover, a.has-text-link[data-v-4831c6fe]:focus {\n  color: #205bbc !important;\n}\n.has-background-link[data-v-4831c6fe] {\n  background-color: #3273dc !important;\n}\n.has-text-info[data-v-4831c6fe] {\n  color: #209cee !important;\n}\na.has-text-info[data-v-4831c6fe]:hover, a.has-text-info[data-v-4831c6fe]:focus {\n  color: #0f81cc !important;\n}\n.has-background-info[data-v-4831c6fe] {\n  background-color: #209cee !important;\n}\n.has-text-success[data-v-4831c6fe] {\n  color: #23d160 !important;\n}\na.has-text-success[data-v-4831c6fe]:hover, a.has-text-success[data-v-4831c6fe]:focus {\n  color: #1ca64c !important;\n}\n.has-background-success[data-v-4831c6fe] {\n  background-color: #23d160 !important;\n}\n.has-text-warning[data-v-4831c6fe] {\n  color: #ffdd57 !important;\n}\na.has-text-warning[data-v-4831c6fe]:hover, a.has-text-warning[data-v-4831c6fe]:focus {\n  color: #ffd324 !important;\n}\n.has-background-warning[data-v-4831c6fe] {\n  background-color: #ffdd57 !important;\n}\n.has-text-danger[data-v-4831c6fe] {\n  color: #ff3860 !important;\n}\na.has-text-danger[data-v-4831c6fe]:hover, a.has-text-danger[data-v-4831c6fe]:focus {\n  color: #ff0537 !important;\n}\n.has-background-danger[data-v-4831c6fe] {\n  background-color: #ff3860 !important;\n}\n.has-text-black-bis[data-v-4831c6fe] {\n  color: #121212 !important;\n}\n.has-background-black-bis[data-v-4831c6fe] {\n  background-color: #121212 !important;\n}\n.has-text-black-ter[data-v-4831c6fe] {\n  color: #242424 !important;\n}\n.has-background-black-ter[data-v-4831c6fe] {\n  background-color: #242424 !important;\n}\n.has-text-grey-darker[data-v-4831c6fe] {\n  color: #363636 !important;\n}\n.has-background-grey-darker[data-v-4831c6fe] {\n  background-color: #363636 !important;\n}\n.has-text-grey-dark[data-v-4831c6fe] {\n  color: #4a4a4a !important;\n}\n.has-background-grey-dark[data-v-4831c6fe] {\n  background-color: #4a4a4a !important;\n}\n.has-text-grey[data-v-4831c6fe] {\n  color: #7a7a7a !important;\n}\n.has-background-grey[data-v-4831c6fe] {\n  background-color: #7a7a7a !important;\n}\n.has-text-grey-light[data-v-4831c6fe] {\n  color: #b5b5b5 !important;\n}\n.has-background-grey-light[data-v-4831c6fe] {\n  background-color: #b5b5b5 !important;\n}\n.has-text-grey-lighter[data-v-4831c6fe] {\n  color: #dbdbdb !important;\n}\n.has-background-grey-lighter[data-v-4831c6fe] {\n  background-color: #dbdbdb !important;\n}\n.has-text-white-ter[data-v-4831c6fe] {\n  color: whitesmoke !important;\n}\n.has-background-white-ter[data-v-4831c6fe] {\n  background-color: whitesmoke !important;\n}\n.has-text-white-bis[data-v-4831c6fe] {\n  color: #fafafa !important;\n}\n.has-background-white-bis[data-v-4831c6fe] {\n  background-color: #fafafa !important;\n}\n.has-text-weight-light[data-v-4831c6fe] {\n  font-weight: 300 !important;\n}\n.has-text-weight-normal[data-v-4831c6fe] {\n  font-weight: 400 !important;\n}\n.has-text-weight-semibold[data-v-4831c6fe] {\n  font-weight: 600 !important;\n}\n.has-text-weight-bold[data-v-4831c6fe] {\n  font-weight: 700 !important;\n}\n.is-block[data-v-4831c6fe] {\n  display: block !important;\n}\n@media screen and (max-width: 768px) {\n.is-block-mobile[data-v-4831c6fe] {\n    display: block !important;\n}\n}\n@media screen and (min-width: 769px), print {\n.is-block-tablet[data-v-4831c6fe] {\n    display: block !important;\n}\n}\n@media screen and (min-width: 769px) and (max-width: 1087px) {\n.is-block-tablet-only[data-v-4831c6fe] {\n    display: block !important;\n}\n}\n@media screen and (max-width: 1087px) {\n.is-block-touch[data-v-4831c6fe] {\n    display: block !important;\n}\n}\n@media screen and (min-width: 1088px) {\n.is-block-desktop[data-v-4831c6fe] {\n    display: block !important;\n}\n}\n@media screen and (min-width: 1088px) and (max-width: 1279px) {\n.is-block-desktop-only[data-v-4831c6fe] {\n    display: block !important;\n}\n}\n@media screen and (min-width: 1280px) {\n.is-block-widescreen[data-v-4831c6fe] {\n    display: block !important;\n}\n}\n@media screen and (min-width: 1280px) and (max-width: 1471px) {\n.is-block-widescreen-only[data-v-4831c6fe] {\n    display: block !important;\n}\n}\n@media screen and (min-width: 1472px) {\n.is-block-fullhd[data-v-4831c6fe] {\n    display: block !important;\n}\n}\n.is-flex[data-v-4831c6fe] {\n  display: flex !important;\n}\n@media screen and (max-width: 768px) {\n.is-flex-mobile[data-v-4831c6fe] {\n    display: flex !important;\n}\n}\n@media screen and (min-width: 769px), print {\n.is-flex-tablet[data-v-4831c6fe] {\n    display: flex !important;\n}\n}\n@media screen and (min-width: 769px) and (max-width: 1087px) {\n.is-flex-tablet-only[data-v-4831c6fe] {\n    display: flex !important;\n}\n}\n@media screen and (max-width: 1087px) {\n.is-flex-touch[data-v-4831c6fe] {\n    display: flex !important;\n}\n}\n@media screen and (min-width: 1088px) {\n.is-flex-desktop[data-v-4831c6fe] {\n    display: flex !important;\n}\n}\n@media screen and (min-width: 1088px) and (max-width: 1279px) {\n.is-flex-desktop-only[data-v-4831c6fe] {\n    display: flex !important;\n}\n}\n@media screen and (min-width: 1280px) {\n.is-flex-widescreen[data-v-4831c6fe] {\n    display: flex !important;\n}\n}\n@media screen and (min-width: 1280px) and (max-width: 1471px) {\n.is-flex-widescreen-only[data-v-4831c6fe] {\n    display: flex !important;\n}\n}\n@media screen and (min-width: 1472px) {\n.is-flex-fullhd[data-v-4831c6fe] {\n    display: flex !important;\n}\n}\n.is-inline[data-v-4831c6fe] {\n  display: inline !important;\n}\n@media screen and (max-width: 768px) {\n.is-inline-mobile[data-v-4831c6fe] {\n    display: inline !important;\n}\n}\n@media screen and (min-width: 769px), print {\n.is-inline-tablet[data-v-4831c6fe] {\n    display: inline !important;\n}\n}\n@media screen and (min-width: 769px) and (max-width: 1087px) {\n.is-inline-tablet-only[data-v-4831c6fe] {\n    display: inline !important;\n}\n}\n@media screen and (max-width: 1087px) {\n.is-inline-touch[data-v-4831c6fe] {\n    display: inline !important;\n}\n}\n@media screen and (min-width: 1088px) {\n.is-inline-desktop[data-v-4831c6fe] {\n    display: inline !important;\n}\n}\n@media screen and (min-width: 1088px) and (max-width: 1279px) {\n.is-inline-desktop-only[data-v-4831c6fe] {\n    display: inline !important;\n}\n}\n@media screen and (min-width: 1280px) {\n.is-inline-widescreen[data-v-4831c6fe] {\n    display: inline !important;\n}\n}\n@media screen and (min-width: 1280px) and (max-width: 1471px) {\n.is-inline-widescreen-only[data-v-4831c6fe] {\n    display: inline !important;\n}\n}\n@media screen and (min-width: 1472px) {\n.is-inline-fullhd[data-v-4831c6fe] {\n    display: inline !important;\n}\n}\n.is-inline-block[data-v-4831c6fe] {\n  display: inline-block !important;\n}\n@media screen and (max-width: 768px) {\n.is-inline-block-mobile[data-v-4831c6fe] {\n    display: inline-block !important;\n}\n}\n@media screen and (min-width: 769px), print {\n.is-inline-block-tablet[data-v-4831c6fe] {\n    display: inline-block !important;\n}\n}\n@media screen and (min-width: 769px) and (max-width: 1087px) {\n.is-inline-block-tablet-only[data-v-4831c6fe] {\n    display: inline-block !important;\n}\n}\n@media screen and (max-width: 1087px) {\n.is-inline-block-touch[data-v-4831c6fe] {\n    display: inline-block !important;\n}\n}\n@media screen and (min-width: 1088px) {\n.is-inline-block-desktop[data-v-4831c6fe] {\n    display: inline-block !important;\n}\n}\n@media screen and (min-width: 1088px) and (max-width: 1279px) {\n.is-inline-block-desktop-only[data-v-4831c6fe] {\n    display: inline-block !important;\n}\n}\n@media screen and (min-width: 1280px) {\n.is-inline-block-widescreen[data-v-4831c6fe] {\n    display: inline-block !important;\n}\n}\n@media screen and (min-width: 1280px) and (max-width: 1471px) {\n.is-inline-block-widescreen-only[data-v-4831c6fe] {\n    display: inline-block !important;\n}\n}\n@media screen and (min-width: 1472px) {\n.is-inline-block-fullhd[data-v-4831c6fe] {\n    display: inline-block !important;\n}\n}\n.is-inline-flex[data-v-4831c6fe] {\n  display: inline-flex !important;\n}\n@media screen and (max-width: 768px) {\n.is-inline-flex-mobile[data-v-4831c6fe] {\n    display: inline-flex !important;\n}\n}\n@media screen and (min-width: 769px), print {\n.is-inline-flex-tablet[data-v-4831c6fe] {\n    display: inline-flex !important;\n}\n}\n@media screen and (min-width: 769px) and (max-width: 1087px) {\n.is-inline-flex-tablet-only[data-v-4831c6fe] {\n    display: inline-flex !important;\n}\n}\n@media screen and (max-width: 1087px) {\n.is-inline-flex-touch[data-v-4831c6fe] {\n    display: inline-flex !important;\n}\n}\n@media screen and (min-width: 1088px) {\n.is-inline-flex-desktop[data-v-4831c6fe] {\n    display: inline-flex !important;\n}\n}\n@media screen and (min-width: 1088px) and (max-width: 1279px) {\n.is-inline-flex-desktop-only[data-v-4831c6fe] {\n    display: inline-flex !important;\n}\n}\n@media screen and (min-width: 1280px) {\n.is-inline-flex-widescreen[data-v-4831c6fe] {\n    display: inline-flex !important;\n}\n}\n@media screen and (min-width: 1280px) and (max-width: 1471px) {\n.is-inline-flex-widescreen-only[data-v-4831c6fe] {\n    display: inline-flex !important;\n}\n}\n@media screen and (min-width: 1472px) {\n.is-inline-flex-fullhd[data-v-4831c6fe] {\n    display: inline-flex !important;\n}\n}\n.is-hidden[data-v-4831c6fe] {\n  display: none !important;\n}\n.is-sr-only[data-v-4831c6fe] {\n  border: none !important;\n  clip: rect(0, 0, 0, 0) !important;\n  height: 0.01em !important;\n  overflow: hidden !important;\n  padding: 0 !important;\n  position: absolute !important;\n  white-space: nowrap !important;\n  width: 0.01em !important;\n}\n@media screen and (max-width: 768px) {\n.is-hidden-mobile[data-v-4831c6fe] {\n    display: none !important;\n}\n}\n@media screen and (min-width: 769px), print {\n.is-hidden-tablet[data-v-4831c6fe] {\n    display: none !important;\n}\n}\n@media screen and (min-width: 769px) and (max-width: 1087px) {\n.is-hidden-tablet-only[data-v-4831c6fe] {\n    display: none !important;\n}\n}\n@media screen and (max-width: 1087px) {\n.is-hidden-touch[data-v-4831c6fe] {\n    display: none !important;\n}\n}\n@media screen and (min-width: 1088px) {\n.is-hidden-desktop[data-v-4831c6fe] {\n    display: none !important;\n}\n}\n@media screen and (min-width: 1088px) and (max-width: 1279px) {\n.is-hidden-desktop-only[data-v-4831c6fe] {\n    display: none !important;\n}\n}\n@media screen and (min-width: 1280px) {\n.is-hidden-widescreen[data-v-4831c6fe] {\n    display: none !important;\n}\n}\n@media screen and (min-width: 1280px) and (max-width: 1471px) {\n.is-hidden-widescreen-only[data-v-4831c6fe] {\n    display: none !important;\n}\n}\n@media screen and (min-width: 1472px) {\n.is-hidden-fullhd[data-v-4831c6fe] {\n    display: none !important;\n}\n}\n.is-invisible[data-v-4831c6fe] {\n  visibility: hidden !important;\n}\n@media screen and (max-width: 768px) {\n.is-invisible-mobile[data-v-4831c6fe] {\n    visibility: hidden !important;\n}\n}\n@media screen and (min-width: 769px), print {\n.is-invisible-tablet[data-v-4831c6fe] {\n    visibility: hidden !important;\n}\n}\n@media screen and (min-width: 769px) and (max-width: 1087px) {\n.is-invisible-tablet-only[data-v-4831c6fe] {\n    visibility: hidden !important;\n}\n}\n@media screen and (max-width: 1087px) {\n.is-invisible-touch[data-v-4831c6fe] {\n    visibility: hidden !important;\n}\n}\n@media screen and (min-width: 1088px) {\n.is-invisible-desktop[data-v-4831c6fe] {\n    visibility: hidden !important;\n}\n}\n@media screen and (min-width: 1088px) and (max-width: 1279px) {\n.is-invisible-desktop-only[data-v-4831c6fe] {\n    visibility: hidden !important;\n}\n}\n@media screen and (min-width: 1280px) {\n.is-invisible-widescreen[data-v-4831c6fe] {\n    visibility: hidden !important;\n}\n}\n@media screen and (min-width: 1280px) and (max-width: 1471px) {\n.is-invisible-widescreen-only[data-v-4831c6fe] {\n    visibility: hidden !important;\n}\n}\n@media screen and (min-width: 1472px) {\n.is-invisible-fullhd[data-v-4831c6fe] {\n    visibility: hidden !important;\n}\n}\n.is-marginless[data-v-4831c6fe] {\n  margin: 0 !important;\n}\n.is-paddingless[data-v-4831c6fe] {\n  padding: 0 !important;\n}\n.is-radiusless[data-v-4831c6fe] {\n  border-radius: 0 !important;\n}\n.is-shadowless[data-v-4831c6fe] {\n  box-shadow: none !important;\n}\n.box[data-v-4831c6fe] {\n  background-color: white;\n  border-radius: 6px;\n  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);\n  color: #4a4a4a;\n  display: block;\n  padding: 1.25rem;\n}\na.box[data-v-4831c6fe]:hover, a.box[data-v-4831c6fe]:focus {\n  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px #3273dc;\n}\na.box[data-v-4831c6fe]:active {\n  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2), 0 0 0 1px #3273dc;\n}\n.button[data-v-4831c6fe] {\n  background-color: white;\n  border-color: #dbdbdb;\n  border-width: 1px;\n  color: #363636;\n  cursor: pointer;\n  justify-content: center;\n  padding-bottom: calc(0.375em - 1px);\n  padding-left: 0.75em;\n  padding-right: 0.75em;\n  padding-top: calc(0.375em - 1px);\n  text-align: center;\n  white-space: nowrap;\n}\n.button strong[data-v-4831c6fe] {\n    color: inherit;\n}\n.button .icon[data-v-4831c6fe], .button .icon.is-small[data-v-4831c6fe], .button .icon.is-medium[data-v-4831c6fe], .button .icon.is-large[data-v-4831c6fe] {\n    height: 1.5em;\n    width: 1.5em;\n}\n.button .icon[data-v-4831c6fe]:first-child:not(:last-child) {\n    margin-left: calc(-0.375em - 1px);\n    margin-right: 0.1875em;\n}\n.button .icon[data-v-4831c6fe]:last-child:not(:first-child) {\n    margin-left: 0.1875em;\n    margin-right: calc(-0.375em - 1px);\n}\n.button .icon[data-v-4831c6fe]:first-child:last-child {\n    margin-left: calc(-0.375em - 1px);\n    margin-right: calc(-0.375em - 1px);\n}\n.button[data-v-4831c6fe]:hover, .button.is-hovered[data-v-4831c6fe] {\n    border-color: #b5b5b5;\n    color: #363636;\n}\n.button[data-v-4831c6fe]:focus, .button.is-focused[data-v-4831c6fe] {\n    border-color: #3273dc;\n    color: #363636;\n}\n.button[data-v-4831c6fe]:focus:not(:active), .button.is-focused[data-v-4831c6fe]:not(:active) {\n      box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25);\n}\n.button[data-v-4831c6fe]:active, .button.is-active[data-v-4831c6fe] {\n    border-color: #4a4a4a;\n    color: #363636;\n}\n.button.is-text[data-v-4831c6fe] {\n    background-color: transparent;\n    border-color: transparent;\n    color: #4a4a4a;\n    text-decoration: underline;\n}\n.button.is-text[data-v-4831c6fe]:hover, .button.is-text.is-hovered[data-v-4831c6fe], .button.is-text[data-v-4831c6fe]:focus, .button.is-text.is-focused[data-v-4831c6fe] {\n      background-color: whitesmoke;\n      color: #363636;\n}\n.button.is-text[data-v-4831c6fe]:active, .button.is-text.is-active[data-v-4831c6fe] {\n      background-color: #e8e8e8;\n      color: #363636;\n}\n.button.is-text[disabled][data-v-4831c6fe] {\n      background-color: transparent;\n      border-color: transparent;\n      box-shadow: none;\n}\n.button.is-white[data-v-4831c6fe] {\n    background-color: white;\n    border-color: transparent;\n    color: #0a0a0a;\n}\n.button.is-white[data-v-4831c6fe]:hover, .button.is-white.is-hovered[data-v-4831c6fe] {\n      background-color: #f9f9f9;\n      border-color: transparent;\n      color: #0a0a0a;\n}\n.button.is-white[data-v-4831c6fe]:focus, .button.is-white.is-focused[data-v-4831c6fe] {\n      border-color: transparent;\n      color: #0a0a0a;\n}\n.button.is-white[data-v-4831c6fe]:focus:not(:active), .button.is-white.is-focused[data-v-4831c6fe]:not(:active) {\n        box-shadow: 0 0 0 0.125em rgba(255, 255, 255, 0.25);\n}\n.button.is-white[data-v-4831c6fe]:active, .button.is-white.is-active[data-v-4831c6fe] {\n      background-color: #f2f2f2;\n      border-color: transparent;\n      color: #0a0a0a;\n}\n.button.is-white[disabled][data-v-4831c6fe] {\n      background-color: white;\n      border-color: transparent;\n      box-shadow: none;\n}\n.button.is-white.is-inverted[data-v-4831c6fe] {\n      background-color: #0a0a0a;\n      color: white;\n}\n.button.is-white.is-inverted[data-v-4831c6fe]:hover {\n        background-color: black;\n}\n.button.is-white.is-inverted[disabled][data-v-4831c6fe] {\n        background-color: #0a0a0a;\n        border-color: transparent;\n        box-shadow: none;\n        color: white;\n}\n.button.is-white.is-loading[data-v-4831c6fe]::after {\n      border-color: transparent transparent #0a0a0a #0a0a0a !important;\n}\n.button.is-white.is-outlined[data-v-4831c6fe] {\n      background-color: transparent;\n      border-color: white;\n      color: white;\n}\n.button.is-white.is-outlined[data-v-4831c6fe]:hover, .button.is-white.is-outlined[data-v-4831c6fe]:focus {\n        background-color: white;\n        border-color: white;\n        color: #0a0a0a;\n}\n.button.is-white.is-outlined.is-loading[data-v-4831c6fe]::after {\n        border-color: transparent transparent white white !important;\n}\n.button.is-white.is-outlined[disabled][data-v-4831c6fe] {\n        background-color: transparent;\n        border-color: white;\n        box-shadow: none;\n        color: white;\n}\n.button.is-white.is-inverted.is-outlined[data-v-4831c6fe] {\n      background-color: transparent;\n      border-color: #0a0a0a;\n      color: #0a0a0a;\n}\n.button.is-white.is-inverted.is-outlined[data-v-4831c6fe]:hover, .button.is-white.is-inverted.is-outlined[data-v-4831c6fe]:focus {\n        background-color: #0a0a0a;\n        color: white;\n}\n.button.is-white.is-inverted.is-outlined[disabled][data-v-4831c6fe] {\n        background-color: transparent;\n        border-color: #0a0a0a;\n        box-shadow: none;\n        color: #0a0a0a;\n}\n.button.is-black[data-v-4831c6fe] {\n    background-color: #0a0a0a;\n    border-color: transparent;\n    color: white;\n}\n.button.is-black[data-v-4831c6fe]:hover, .button.is-black.is-hovered[data-v-4831c6fe] {\n      background-color: #040404;\n      border-color: transparent;\n      color: white;\n}\n.button.is-black[data-v-4831c6fe]:focus, .button.is-black.is-focused[data-v-4831c6fe] {\n      border-color: transparent;\n      color: white;\n}\n.button.is-black[data-v-4831c6fe]:focus:not(:active), .button.is-black.is-focused[data-v-4831c6fe]:not(:active) {\n        box-shadow: 0 0 0 0.125em rgba(10, 10, 10, 0.25);\n}\n.button.is-black[data-v-4831c6fe]:active, .button.is-black.is-active[data-v-4831c6fe] {\n      background-color: black;\n      border-color: transparent;\n      color: white;\n}\n.button.is-black[disabled][data-v-4831c6fe] {\n      background-color: #0a0a0a;\n      border-color: transparent;\n      box-shadow: none;\n}\n.button.is-black.is-inverted[data-v-4831c6fe] {\n      background-color: white;\n      color: #0a0a0a;\n}\n.button.is-black.is-inverted[data-v-4831c6fe]:hover {\n        background-color: #f2f2f2;\n}\n.button.is-black.is-inverted[disabled][data-v-4831c6fe] {\n        background-color: white;\n        border-color: transparent;\n        box-shadow: none;\n        color: #0a0a0a;\n}\n.button.is-black.is-loading[data-v-4831c6fe]::after {\n      border-color: transparent transparent white white !important;\n}\n.button.is-black.is-outlined[data-v-4831c6fe] {\n      background-color: transparent;\n      border-color: #0a0a0a;\n      color: #0a0a0a;\n}\n.button.is-black.is-outlined[data-v-4831c6fe]:hover, .button.is-black.is-outlined[data-v-4831c6fe]:focus {\n        background-color: #0a0a0a;\n        border-color: #0a0a0a;\n        color: white;\n}\n.button.is-black.is-outlined.is-loading[data-v-4831c6fe]::after {\n        border-color: transparent transparent #0a0a0a #0a0a0a !important;\n}\n.button.is-black.is-outlined[disabled][data-v-4831c6fe] {\n        background-color: transparent;\n        border-color: #0a0a0a;\n        box-shadow: none;\n        color: #0a0a0a;\n}\n.button.is-black.is-inverted.is-outlined[data-v-4831c6fe] {\n      background-color: transparent;\n      border-color: white;\n      color: white;\n}\n.button.is-black.is-inverted.is-outlined[data-v-4831c6fe]:hover, .button.is-black.is-inverted.is-outlined[data-v-4831c6fe]:focus {\n        background-color: white;\n        color: #0a0a0a;\n}\n.button.is-black.is-inverted.is-outlined[disabled][data-v-4831c6fe] {\n        background-color: transparent;\n        border-color: white;\n        box-shadow: none;\n        color: white;\n}\n.button.is-light[data-v-4831c6fe] {\n    background-color: whitesmoke;\n    border-color: transparent;\n    color: #363636;\n}\n.button.is-light[data-v-4831c6fe]:hover, .button.is-light.is-hovered[data-v-4831c6fe] {\n      background-color: #eeeeee;\n      border-color: transparent;\n      color: #363636;\n}\n.button.is-light[data-v-4831c6fe]:focus, .button.is-light.is-focused[data-v-4831c6fe] {\n      border-color: transparent;\n      color: #363636;\n}\n.button.is-light[data-v-4831c6fe]:focus:not(:active), .button.is-light.is-focused[data-v-4831c6fe]:not(:active) {\n        box-shadow: 0 0 0 0.125em rgba(245, 245, 245, 0.25);\n}\n.button.is-light[data-v-4831c6fe]:active, .button.is-light.is-active[data-v-4831c6fe] {\n      background-color: #e8e8e8;\n      border-color: transparent;\n      color: #363636;\n}\n.button.is-light[disabled][data-v-4831c6fe] {\n      background-color: whitesmoke;\n      border-color: transparent;\n      box-shadow: none;\n}\n.button.is-light.is-inverted[data-v-4831c6fe] {\n      background-color: #363636;\n      color: whitesmoke;\n}\n.button.is-light.is-inverted[data-v-4831c6fe]:hover {\n        background-color: #292929;\n}\n.button.is-light.is-inverted[disabled][data-v-4831c6fe] {\n        background-color: #363636;\n        border-color: transparent;\n        box-shadow: none;\n        color: whitesmoke;\n}\n.button.is-light.is-loading[data-v-4831c6fe]::after {\n      border-color: transparent transparent #363636 #363636 !important;\n}\n.button.is-light.is-outlined[data-v-4831c6fe] {\n      background-color: transparent;\n      border-color: whitesmoke;\n      color: whitesmoke;\n}\n.button.is-light.is-outlined[data-v-4831c6fe]:hover, .button.is-light.is-outlined[data-v-4831c6fe]:focus {\n        background-color: whitesmoke;\n        border-color: whitesmoke;\n        color: #363636;\n}\n.button.is-light.is-outlined.is-loading[data-v-4831c6fe]::after {\n        border-color: transparent transparent whitesmoke whitesmoke !important;\n}\n.button.is-light.is-outlined[disabled][data-v-4831c6fe] {\n        background-color: transparent;\n        border-color: whitesmoke;\n        box-shadow: none;\n        color: whitesmoke;\n}\n.button.is-light.is-inverted.is-outlined[data-v-4831c6fe] {\n      background-color: transparent;\n      border-color: #363636;\n      color: #363636;\n}\n.button.is-light.is-inverted.is-outlined[data-v-4831c6fe]:hover, .button.is-light.is-inverted.is-outlined[data-v-4831c6fe]:focus {\n        background-color: #363636;\n        color: whitesmoke;\n}\n.button.is-light.is-inverted.is-outlined[disabled][data-v-4831c6fe] {\n        background-color: transparent;\n        border-color: #363636;\n        box-shadow: none;\n        color: #363636;\n}\n.button.is-dark[data-v-4831c6fe] {\n    background-color: #363636;\n    border-color: transparent;\n    color: whitesmoke;\n}\n.button.is-dark[data-v-4831c6fe]:hover, .button.is-dark.is-hovered[data-v-4831c6fe] {\n      background-color: #2f2f2f;\n      border-color: transparent;\n      color: whitesmoke;\n}\n.button.is-dark[data-v-4831c6fe]:focus, .button.is-dark.is-focused[data-v-4831c6fe] {\n      border-color: transparent;\n      color: whitesmoke;\n}\n.button.is-dark[data-v-4831c6fe]:focus:not(:active), .button.is-dark.is-focused[data-v-4831c6fe]:not(:active) {\n        box-shadow: 0 0 0 0.125em rgba(54, 54, 54, 0.25);\n}\n.button.is-dark[data-v-4831c6fe]:active, .button.is-dark.is-active[data-v-4831c6fe] {\n      background-color: #292929;\n      border-color: transparent;\n      color: whitesmoke;\n}\n.button.is-dark[disabled][data-v-4831c6fe] {\n      background-color: #363636;\n      border-color: transparent;\n      box-shadow: none;\n}\n.button.is-dark.is-inverted[data-v-4831c6fe] {\n      background-color: whitesmoke;\n      color: #363636;\n}\n.button.is-dark.is-inverted[data-v-4831c6fe]:hover {\n        background-color: #e8e8e8;\n}\n.button.is-dark.is-inverted[disabled][data-v-4831c6fe] {\n        background-color: whitesmoke;\n        border-color: transparent;\n        box-shadow: none;\n        color: #363636;\n}\n.button.is-dark.is-loading[data-v-4831c6fe]::after {\n      border-color: transparent transparent whitesmoke whitesmoke !important;\n}\n.button.is-dark.is-outlined[data-v-4831c6fe] {\n      background-color: transparent;\n      border-color: #363636;\n      color: #363636;\n}\n.button.is-dark.is-outlined[data-v-4831c6fe]:hover, .button.is-dark.is-outlined[data-v-4831c6fe]:focus {\n        background-color: #363636;\n        border-color: #363636;\n        color: whitesmoke;\n}\n.button.is-dark.is-outlined.is-loading[data-v-4831c6fe]::after {\n        border-color: transparent transparent #363636 #363636 !important;\n}\n.button.is-dark.is-outlined[disabled][data-v-4831c6fe] {\n        background-color: transparent;\n        border-color: #363636;\n        box-shadow: none;\n        color: #363636;\n}\n.button.is-dark.is-inverted.is-outlined[data-v-4831c6fe] {\n      background-color: transparent;\n      border-color: whitesmoke;\n      color: whitesmoke;\n}\n.button.is-dark.is-inverted.is-outlined[data-v-4831c6fe]:hover, .button.is-dark.is-inverted.is-outlined[data-v-4831c6fe]:focus {\n        background-color: whitesmoke;\n        color: #363636;\n}\n.button.is-dark.is-inverted.is-outlined[disabled][data-v-4831c6fe] {\n        background-color: transparent;\n        border-color: whitesmoke;\n        box-shadow: none;\n        color: whitesmoke;\n}\n.button.is-primary[data-v-4831c6fe],[data-v-4831c6fe] .button.tagAreaClass,[data-v-4831c6fe] .button.deleteAreaClass,[data-v-4831c6fe] .button.deleteContentClass {\n    background-color: #00d1b2;\n    border-color: transparent;\n    color: #fff;\n}\n.button.is-primary[data-v-4831c6fe]:hover,[data-v-4831c6fe] .button.tagAreaClass:hover,[data-v-4831c6fe] .button.deleteAreaClass:hover,[data-v-4831c6fe] .button.deleteContentClass:hover, .button.is-primary.is-hovered[data-v-4831c6fe],[data-v-4831c6fe] .button.is-hovered.tagAreaClass,[data-v-4831c6fe] .button.is-hovered.deleteAreaClass,[data-v-4831c6fe] .button.is-hovered.deleteContentClass {\n      background-color: #00c4a7;\n      border-color: transparent;\n      color: #fff;\n}\n.button.is-primary[data-v-4831c6fe]:focus,[data-v-4831c6fe] .button.tagAreaClass:focus,[data-v-4831c6fe] .button.deleteAreaClass:focus,[data-v-4831c6fe] .button.deleteContentClass:focus, .button.is-primary.is-focused[data-v-4831c6fe],[data-v-4831c6fe] .button.is-focused.tagAreaClass,[data-v-4831c6fe] .button.is-focused.deleteAreaClass,[data-v-4831c6fe] .button.is-focused.deleteContentClass {\n      border-color: transparent;\n      color: #fff;\n}\n.button.is-primary[data-v-4831c6fe]:focus:not(:active),[data-v-4831c6fe] .button.tagAreaClass:focus:not(:active),[data-v-4831c6fe] .button.deleteAreaClass:focus:not(:active),[data-v-4831c6fe] .button.deleteContentClass:focus:not(:active), .button.is-primary.is-focused[data-v-4831c6fe]:not(:active),[data-v-4831c6fe] .button.is-focused.tagAreaClass:not(:active),[data-v-4831c6fe] .button.is-focused.deleteAreaClass:not(:active),[data-v-4831c6fe] .button.is-focused.deleteContentClass:not(:active) {\n        box-shadow: 0 0 0 0.125em rgba(0, 209, 178, 0.25);\n}\n.button.is-primary[data-v-4831c6fe]:active,[data-v-4831c6fe] .button.tagAreaClass:active,[data-v-4831c6fe] .button.deleteAreaClass:active,[data-v-4831c6fe] .button.deleteContentClass:active, .button.is-primary.is-active[data-v-4831c6fe],[data-v-4831c6fe] .button.is-active.tagAreaClass,[data-v-4831c6fe] .button.is-active.deleteAreaClass,[data-v-4831c6fe] .button.is-active.deleteContentClass {\n      background-color: #00b89c;\n      border-color: transparent;\n      color: #fff;\n}\n.button.is-primary[disabled][data-v-4831c6fe],[data-v-4831c6fe] .button.tagAreaClass[disabled],[data-v-4831c6fe] .button.deleteAreaClass[disabled],[data-v-4831c6fe] .button.deleteContentClass[disabled] {\n      background-color: #00d1b2;\n      border-color: transparent;\n      box-shadow: none;\n}\n.button.is-primary.is-inverted[data-v-4831c6fe],[data-v-4831c6fe] .button.is-inverted.tagAreaClass,[data-v-4831c6fe] .button.is-inverted.deleteAreaClass,[data-v-4831c6fe] .button.is-inverted.deleteContentClass {\n      background-color: #fff;\n      color: #00d1b2;\n}\n.button.is-primary.is-inverted[data-v-4831c6fe]:hover,[data-v-4831c6fe] .button.is-inverted.tagAreaClass:hover,[data-v-4831c6fe] .button.is-inverted.deleteAreaClass:hover,[data-v-4831c6fe] .button.is-inverted.deleteContentClass:hover {\n        background-color: #f2f2f2;\n}\n.button.is-primary.is-inverted[disabled][data-v-4831c6fe],[data-v-4831c6fe] .button.is-inverted.tagAreaClass[disabled],[data-v-4831c6fe] .button.is-inverted.deleteAreaClass[disabled],[data-v-4831c6fe] .button.is-inverted.deleteContentClass[disabled] {\n        background-color: #fff;\n        border-color: transparent;\n        box-shadow: none;\n        color: #00d1b2;\n}\n.button.is-primary.is-loading[data-v-4831c6fe]::after,[data-v-4831c6fe] .button.is-loading.tagAreaClass::after,[data-v-4831c6fe] .button.is-loading.deleteAreaClass::after,[data-v-4831c6fe] .button.is-loading.deleteContentClass::after {\n      border-color: transparent transparent #fff #fff !important;\n}\n.button.is-primary.is-outlined[data-v-4831c6fe],[data-v-4831c6fe] .button.is-outlined.tagAreaClass,[data-v-4831c6fe] .button.is-outlined.deleteAreaClass,[data-v-4831c6fe] .button.is-outlined.deleteContentClass {\n      background-color: transparent;\n      border-color: #00d1b2;\n      color: #00d1b2;\n}\n.button.is-primary.is-outlined[data-v-4831c6fe]:hover,[data-v-4831c6fe] .button.is-outlined.tagAreaClass:hover,[data-v-4831c6fe] .button.is-outlined.deleteAreaClass:hover,[data-v-4831c6fe] .button.is-outlined.deleteContentClass:hover, .button.is-primary.is-outlined[data-v-4831c6fe]:focus,[data-v-4831c6fe] .button.is-outlined.tagAreaClass:focus,[data-v-4831c6fe] .button.is-outlined.deleteAreaClass:focus,[data-v-4831c6fe] .button.is-outlined.deleteContentClass:focus {\n        background-color: #00d1b2;\n        border-color: #00d1b2;\n        color: #fff;\n}\n.button.is-primary.is-outlined.is-loading[data-v-4831c6fe]::after,[data-v-4831c6fe] .button.is-outlined.is-loading.tagAreaClass::after,[data-v-4831c6fe] .button.is-outlined.is-loading.deleteAreaClass::after,[data-v-4831c6fe] .button.is-outlined.is-loading.deleteContentClass::after {\n        border-color: transparent transparent #00d1b2 #00d1b2 !important;\n}\n.button.is-primary.is-outlined[disabled][data-v-4831c6fe],[data-v-4831c6fe] .button.is-outlined.tagAreaClass[disabled],[data-v-4831c6fe] .button.is-outlined.deleteAreaClass[disabled],[data-v-4831c6fe] .button.is-outlined.deleteContentClass[disabled] {\n        background-color: transparent;\n        border-color: #00d1b2;\n        box-shadow: none;\n        color: #00d1b2;\n}\n.button.is-primary.is-inverted.is-outlined[data-v-4831c6fe],[data-v-4831c6fe] .button.is-inverted.is-outlined.tagAreaClass,[data-v-4831c6fe] .button.is-inverted.is-outlined.deleteAreaClass,[data-v-4831c6fe] .button.is-inverted.is-outlined.deleteContentClass {\n      background-color: transparent;\n      border-color: #fff;\n      color: #fff;\n}\n.button.is-primary.is-inverted.is-outlined[data-v-4831c6fe]:hover,[data-v-4831c6fe] .button.is-inverted.is-outlined.tagAreaClass:hover,[data-v-4831c6fe] .button.is-inverted.is-outlined.deleteAreaClass:hover,[data-v-4831c6fe] .button.is-inverted.is-outlined.deleteContentClass:hover, .button.is-primary.is-inverted.is-outlined[data-v-4831c6fe]:focus,[data-v-4831c6fe] .button.is-inverted.is-outlined.tagAreaClass:focus,[data-v-4831c6fe] .button.is-inverted.is-outlined.deleteAreaClass:focus,[data-v-4831c6fe] .button.is-inverted.is-outlined.deleteContentClass:focus {\n        background-color: #fff;\n        color: #00d1b2;\n}\n.button.is-primary.is-inverted.is-outlined[disabled][data-v-4831c6fe],[data-v-4831c6fe] .button.is-inverted.is-outlined.tagAreaClass[disabled],[data-v-4831c6fe] .button.is-inverted.is-outlined.deleteAreaClass[disabled],[data-v-4831c6fe] .button.is-inverted.is-outlined.deleteContentClass[disabled] {\n        background-color: transparent;\n        border-color: #fff;\n        box-shadow: none;\n        color: #fff;\n}\n.button.is-link[data-v-4831c6fe] {\n    background-color: #3273dc;\n    border-color: transparent;\n    color: #fff;\n}\n.button.is-link[data-v-4831c6fe]:hover, .button.is-link.is-hovered[data-v-4831c6fe] {\n      background-color: #276cda;\n      border-color: transparent;\n      color: #fff;\n}\n.button.is-link[data-v-4831c6fe]:focus, .button.is-link.is-focused[data-v-4831c6fe] {\n      border-color: transparent;\n      color: #fff;\n}\n.button.is-link[data-v-4831c6fe]:focus:not(:active), .button.is-link.is-focused[data-v-4831c6fe]:not(:active) {\n        box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25);\n}\n.button.is-link[data-v-4831c6fe]:active, .button.is-link.is-active[data-v-4831c6fe] {\n      background-color: #2366d1;\n      border-color: transparent;\n      color: #fff;\n}\n.button.is-link[disabled][data-v-4831c6fe] {\n      background-color: #3273dc;\n      border-color: transparent;\n      box-shadow: none;\n}\n.button.is-link.is-inverted[data-v-4831c6fe] {\n      background-color: #fff;\n      color: #3273dc;\n}\n.button.is-link.is-inverted[data-v-4831c6fe]:hover {\n        background-color: #f2f2f2;\n}\n.button.is-link.is-inverted[disabled][data-v-4831c6fe] {\n        background-color: #fff;\n        border-color: transparent;\n        box-shadow: none;\n        color: #3273dc;\n}\n.button.is-link.is-loading[data-v-4831c6fe]::after {\n      border-color: transparent transparent #fff #fff !important;\n}\n.button.is-link.is-outlined[data-v-4831c6fe] {\n      background-color: transparent;\n      border-color: #3273dc;\n      color: #3273dc;\n}\n.button.is-link.is-outlined[data-v-4831c6fe]:hover, .button.is-link.is-outlined[data-v-4831c6fe]:focus {\n        background-color: #3273dc;\n        border-color: #3273dc;\n        color: #fff;\n}\n.button.is-link.is-outlined.is-loading[data-v-4831c6fe]::after {\n        border-color: transparent transparent #3273dc #3273dc !important;\n}\n.button.is-link.is-outlined[disabled][data-v-4831c6fe] {\n        background-color: transparent;\n        border-color: #3273dc;\n        box-shadow: none;\n        color: #3273dc;\n}\n.button.is-link.is-inverted.is-outlined[data-v-4831c6fe] {\n      background-color: transparent;\n      border-color: #fff;\n      color: #fff;\n}\n.button.is-link.is-inverted.is-outlined[data-v-4831c6fe]:hover, .button.is-link.is-inverted.is-outlined[data-v-4831c6fe]:focus {\n        background-color: #fff;\n        color: #3273dc;\n}\n.button.is-link.is-inverted.is-outlined[disabled][data-v-4831c6fe] {\n        background-color: transparent;\n        border-color: #fff;\n        box-shadow: none;\n        color: #fff;\n}\n.button.is-info[data-v-4831c6fe] {\n    background-color: #209cee;\n    border-color: transparent;\n    color: #fff;\n}\n.button.is-info[data-v-4831c6fe]:hover, .button.is-info.is-hovered[data-v-4831c6fe] {\n      background-color: #1496ed;\n      border-color: transparent;\n      color: #fff;\n}\n.button.is-info[data-v-4831c6fe]:focus, .button.is-info.is-focused[data-v-4831c6fe] {\n      border-color: transparent;\n      color: #fff;\n}\n.button.is-info[data-v-4831c6fe]:focus:not(:active), .button.is-info.is-focused[data-v-4831c6fe]:not(:active) {\n        box-shadow: 0 0 0 0.125em rgba(32, 156, 238, 0.25);\n}\n.button.is-info[data-v-4831c6fe]:active, .button.is-info.is-active[data-v-4831c6fe] {\n      background-color: #118fe4;\n      border-color: transparent;\n      color: #fff;\n}\n.button.is-info[disabled][data-v-4831c6fe] {\n      background-color: #209cee;\n      border-color: transparent;\n      box-shadow: none;\n}\n.button.is-info.is-inverted[data-v-4831c6fe] {\n      background-color: #fff;\n      color: #209cee;\n}\n.button.is-info.is-inverted[data-v-4831c6fe]:hover {\n        background-color: #f2f2f2;\n}\n.button.is-info.is-inverted[disabled][data-v-4831c6fe] {\n        background-color: #fff;\n        border-color: transparent;\n        box-shadow: none;\n        color: #209cee;\n}\n.button.is-info.is-loading[data-v-4831c6fe]::after {\n      border-color: transparent transparent #fff #fff !important;\n}\n.button.is-info.is-outlined[data-v-4831c6fe] {\n      background-color: transparent;\n      border-color: #209cee;\n      color: #209cee;\n}\n.button.is-info.is-outlined[data-v-4831c6fe]:hover, .button.is-info.is-outlined[data-v-4831c6fe]:focus {\n        background-color: #209cee;\n        border-color: #209cee;\n        color: #fff;\n}\n.button.is-info.is-outlined.is-loading[data-v-4831c6fe]::after {\n        border-color: transparent transparent #209cee #209cee !important;\n}\n.button.is-info.is-outlined[disabled][data-v-4831c6fe] {\n        background-color: transparent;\n        border-color: #209cee;\n        box-shadow: none;\n        color: #209cee;\n}\n.button.is-info.is-inverted.is-outlined[data-v-4831c6fe] {\n      background-color: transparent;\n      border-color: #fff;\n      color: #fff;\n}\n.button.is-info.is-inverted.is-outlined[data-v-4831c6fe]:hover, .button.is-info.is-inverted.is-outlined[data-v-4831c6fe]:focus {\n        background-color: #fff;\n        color: #209cee;\n}\n.button.is-info.is-inverted.is-outlined[disabled][data-v-4831c6fe] {\n        background-color: transparent;\n        border-color: #fff;\n        box-shadow: none;\n        color: #fff;\n}\n.button.is-success[data-v-4831c6fe] {\n    background-color: #23d160;\n    border-color: transparent;\n    color: #fff;\n}\n.button.is-success[data-v-4831c6fe]:hover, .button.is-success.is-hovered[data-v-4831c6fe] {\n      background-color: #22c65b;\n      border-color: transparent;\n      color: #fff;\n}\n.button.is-success[data-v-4831c6fe]:focus, .button.is-success.is-focused[data-v-4831c6fe] {\n      border-color: transparent;\n      color: #fff;\n}\n.button.is-success[data-v-4831c6fe]:focus:not(:active), .button.is-success.is-focused[data-v-4831c6fe]:not(:active) {\n        box-shadow: 0 0 0 0.125em rgba(35, 209, 96, 0.25);\n}\n.button.is-success[data-v-4831c6fe]:active, .button.is-success.is-active[data-v-4831c6fe] {\n      background-color: #20bc56;\n      border-color: transparent;\n      color: #fff;\n}\n.button.is-success[disabled][data-v-4831c6fe] {\n      background-color: #23d160;\n      border-color: transparent;\n      box-shadow: none;\n}\n.button.is-success.is-inverted[data-v-4831c6fe] {\n      background-color: #fff;\n      color: #23d160;\n}\n.button.is-success.is-inverted[data-v-4831c6fe]:hover {\n        background-color: #f2f2f2;\n}\n.button.is-success.is-inverted[disabled][data-v-4831c6fe] {\n        background-color: #fff;\n        border-color: transparent;\n        box-shadow: none;\n        color: #23d160;\n}\n.button.is-success.is-loading[data-v-4831c6fe]::after {\n      border-color: transparent transparent #fff #fff !important;\n}\n.button.is-success.is-outlined[data-v-4831c6fe] {\n      background-color: transparent;\n      border-color: #23d160;\n      color: #23d160;\n}\n.button.is-success.is-outlined[data-v-4831c6fe]:hover, .button.is-success.is-outlined[data-v-4831c6fe]:focus {\n        background-color: #23d160;\n        border-color: #23d160;\n        color: #fff;\n}\n.button.is-success.is-outlined.is-loading[data-v-4831c6fe]::after {\n        border-color: transparent transparent #23d160 #23d160 !important;\n}\n.button.is-success.is-outlined[disabled][data-v-4831c6fe] {\n        background-color: transparent;\n        border-color: #23d160;\n        box-shadow: none;\n        color: #23d160;\n}\n.button.is-success.is-inverted.is-outlined[data-v-4831c6fe] {\n      background-color: transparent;\n      border-color: #fff;\n      color: #fff;\n}\n.button.is-success.is-inverted.is-outlined[data-v-4831c6fe]:hover, .button.is-success.is-inverted.is-outlined[data-v-4831c6fe]:focus {\n        background-color: #fff;\n        color: #23d160;\n}\n.button.is-success.is-inverted.is-outlined[disabled][data-v-4831c6fe] {\n        background-color: transparent;\n        border-color: #fff;\n        box-shadow: none;\n        color: #fff;\n}\n.button.is-warning[data-v-4831c6fe] {\n    background-color: #ffdd57;\n    border-color: transparent;\n    color: rgba(0, 0, 0, 0.7);\n}\n.button.is-warning[data-v-4831c6fe]:hover, .button.is-warning.is-hovered[data-v-4831c6fe] {\n      background-color: #ffdb4a;\n      border-color: transparent;\n      color: rgba(0, 0, 0, 0.7);\n}\n.button.is-warning[data-v-4831c6fe]:focus, .button.is-warning.is-focused[data-v-4831c6fe] {\n      border-color: transparent;\n      color: rgba(0, 0, 0, 0.7);\n}\n.button.is-warning[data-v-4831c6fe]:focus:not(:active), .button.is-warning.is-focused[data-v-4831c6fe]:not(:active) {\n        box-shadow: 0 0 0 0.125em rgba(255, 221, 87, 0.25);\n}\n.button.is-warning[data-v-4831c6fe]:active, .button.is-warning.is-active[data-v-4831c6fe] {\n      background-color: #ffd83d;\n      border-color: transparent;\n      color: rgba(0, 0, 0, 0.7);\n}\n.button.is-warning[disabled][data-v-4831c6fe] {\n      background-color: #ffdd57;\n      border-color: transparent;\n      box-shadow: none;\n}\n.button.is-warning.is-inverted[data-v-4831c6fe] {\n      background-color: rgba(0, 0, 0, 0.7);\n      color: #ffdd57;\n}\n.button.is-warning.is-inverted[data-v-4831c6fe]:hover {\n        background-color: rgba(0, 0, 0, 0.7);\n}\n.button.is-warning.is-inverted[disabled][data-v-4831c6fe] {\n        background-color: rgba(0, 0, 0, 0.7);\n        border-color: transparent;\n        box-shadow: none;\n        color: #ffdd57;\n}\n.button.is-warning.is-loading[data-v-4831c6fe]::after {\n      border-color: transparent transparent rgba(0, 0, 0, 0.7) rgba(0, 0, 0, 0.7) !important;\n}\n.button.is-warning.is-outlined[data-v-4831c6fe] {\n      background-color: transparent;\n      border-color: #ffdd57;\n      color: #ffdd57;\n}\n.button.is-warning.is-outlined[data-v-4831c6fe]:hover, .button.is-warning.is-outlined[data-v-4831c6fe]:focus {\n        background-color: #ffdd57;\n        border-color: #ffdd57;\n        color: rgba(0, 0, 0, 0.7);\n}\n.button.is-warning.is-outlined.is-loading[data-v-4831c6fe]::after {\n        border-color: transparent transparent #ffdd57 #ffdd57 !important;\n}\n.button.is-warning.is-outlined[disabled][data-v-4831c6fe] {\n        background-color: transparent;\n        border-color: #ffdd57;\n        box-shadow: none;\n        color: #ffdd57;\n}\n.button.is-warning.is-inverted.is-outlined[data-v-4831c6fe] {\n      background-color: transparent;\n      border-color: rgba(0, 0, 0, 0.7);\n      color: rgba(0, 0, 0, 0.7);\n}\n.button.is-warning.is-inverted.is-outlined[data-v-4831c6fe]:hover, .button.is-warning.is-inverted.is-outlined[data-v-4831c6fe]:focus {\n        background-color: rgba(0, 0, 0, 0.7);\n        color: #ffdd57;\n}\n.button.is-warning.is-inverted.is-outlined[disabled][data-v-4831c6fe] {\n        background-color: transparent;\n        border-color: rgba(0, 0, 0, 0.7);\n        box-shadow: none;\n        color: rgba(0, 0, 0, 0.7);\n}\n.button.is-danger[data-v-4831c6fe] {\n    background-color: #ff3860;\n    border-color: transparent;\n    color: #fff;\n}\n.button.is-danger[data-v-4831c6fe]:hover, .button.is-danger.is-hovered[data-v-4831c6fe] {\n      background-color: #ff2b56;\n      border-color: transparent;\n      color: #fff;\n}\n.button.is-danger[data-v-4831c6fe]:focus, .button.is-danger.is-focused[data-v-4831c6fe] {\n      border-color: transparent;\n      color: #fff;\n}\n.button.is-danger[data-v-4831c6fe]:focus:not(:active), .button.is-danger.is-focused[data-v-4831c6fe]:not(:active) {\n        box-shadow: 0 0 0 0.125em rgba(255, 56, 96, 0.25);\n}\n.button.is-danger[data-v-4831c6fe]:active, .button.is-danger.is-active[data-v-4831c6fe] {\n      background-color: #ff1f4b;\n      border-color: transparent;\n      color: #fff;\n}\n.button.is-danger[disabled][data-v-4831c6fe] {\n      background-color: #ff3860;\n      border-color: transparent;\n      box-shadow: none;\n}\n.button.is-danger.is-inverted[data-v-4831c6fe] {\n      background-color: #fff;\n      color: #ff3860;\n}\n.button.is-danger.is-inverted[data-v-4831c6fe]:hover {\n        background-color: #f2f2f2;\n}\n.button.is-danger.is-inverted[disabled][data-v-4831c6fe] {\n        background-color: #fff;\n        border-color: transparent;\n        box-shadow: none;\n        color: #ff3860;\n}\n.button.is-danger.is-loading[data-v-4831c6fe]::after {\n      border-color: transparent transparent #fff #fff !important;\n}\n.button.is-danger.is-outlined[data-v-4831c6fe] {\n      background-color: transparent;\n      border-color: #ff3860;\n      color: #ff3860;\n}\n.button.is-danger.is-outlined[data-v-4831c6fe]:hover, .button.is-danger.is-outlined[data-v-4831c6fe]:focus {\n        background-color: #ff3860;\n        border-color: #ff3860;\n        color: #fff;\n}\n.button.is-danger.is-outlined.is-loading[data-v-4831c6fe]::after {\n        border-color: transparent transparent #ff3860 #ff3860 !important;\n}\n.button.is-danger.is-outlined[disabled][data-v-4831c6fe] {\n        background-color: transparent;\n        border-color: #ff3860;\n        box-shadow: none;\n        color: #ff3860;\n}\n.button.is-danger.is-inverted.is-outlined[data-v-4831c6fe] {\n      background-color: transparent;\n      border-color: #fff;\n      color: #fff;\n}\n.button.is-danger.is-inverted.is-outlined[data-v-4831c6fe]:hover, .button.is-danger.is-inverted.is-outlined[data-v-4831c6fe]:focus {\n        background-color: #fff;\n        color: #ff3860;\n}\n.button.is-danger.is-inverted.is-outlined[disabled][data-v-4831c6fe] {\n        background-color: transparent;\n        border-color: #fff;\n        box-shadow: none;\n        color: #fff;\n}\n.button.is-small[data-v-4831c6fe] {\n    border-radius: 2px;\n    font-size: 0.75rem;\n}\n.button.is-medium[data-v-4831c6fe] {\n    font-size: 1.25rem;\n}\n.button.is-large[data-v-4831c6fe] {\n    font-size: 1.5rem;\n}\n.button[disabled][data-v-4831c6fe] {\n    background-color: white;\n    border-color: #dbdbdb;\n    box-shadow: none;\n    opacity: 0.5;\n}\n.button.is-fullwidth[data-v-4831c6fe] {\n    display: flex;\n    width: 100%;\n}\n.button.is-loading[data-v-4831c6fe] {\n    color: transparent !important;\n    pointer-events: none;\n}\n.button.is-loading[data-v-4831c6fe]::after {\n      position: absolute;\n      left: calc(50% - (1em / 2));\n      top: calc(50% - (1em / 2));\n      position: absolute !important;\n}\n.button.is-static[data-v-4831c6fe] {\n    background-color: whitesmoke;\n    border-color: #dbdbdb;\n    color: #7a7a7a;\n    box-shadow: none;\n    pointer-events: none;\n}\n.button.is-rounded[data-v-4831c6fe] {\n    border-radius: 290486px;\n    padding-left: 1em;\n    padding-right: 1em;\n}\n.buttons[data-v-4831c6fe] {\n  align-items: center;\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-start;\n}\n.buttons .button[data-v-4831c6fe] {\n    margin-bottom: 0.5rem;\n}\n.buttons .button[data-v-4831c6fe]:not(:last-child):not(.is-fullwidth) {\n      margin-right: 0.5rem;\n}\n.buttons[data-v-4831c6fe]:last-child {\n    margin-bottom: -0.5rem;\n}\n.buttons[data-v-4831c6fe]:not(:last-child) {\n    margin-bottom: 1rem;\n}\n.buttons.has-addons .button[data-v-4831c6fe]:not(:first-child) {\n    border-bottom-left-radius: 0;\n    border-top-left-radius: 0;\n}\n.buttons.has-addons .button[data-v-4831c6fe]:not(:last-child) {\n    border-bottom-right-radius: 0;\n    border-top-right-radius: 0;\n    margin-right: -1px;\n}\n.buttons.has-addons .button[data-v-4831c6fe]:last-child {\n    margin-right: 0;\n}\n.buttons.has-addons .button[data-v-4831c6fe]:hover, .buttons.has-addons .button.is-hovered[data-v-4831c6fe] {\n    z-index: 2;\n}\n.buttons.has-addons .button[data-v-4831c6fe]:focus, .buttons.has-addons .button.is-focused[data-v-4831c6fe], .buttons.has-addons .button[data-v-4831c6fe]:active, .buttons.has-addons .button.is-active[data-v-4831c6fe], .buttons.has-addons .button.is-selected[data-v-4831c6fe] {\n    z-index: 3;\n}\n.buttons.has-addons .button[data-v-4831c6fe]:focus:hover, .buttons.has-addons .button.is-focused[data-v-4831c6fe]:hover, .buttons.has-addons .button[data-v-4831c6fe]:active:hover, .buttons.has-addons .button.is-active[data-v-4831c6fe]:hover, .buttons.has-addons .button.is-selected[data-v-4831c6fe]:hover {\n      z-index: 4;\n}\n.buttons.has-addons .button.is-expanded[data-v-4831c6fe] {\n    flex-grow: 1;\n}\n.buttons.is-centered[data-v-4831c6fe] {\n    justify-content: center;\n}\n.buttons.is-right[data-v-4831c6fe] {\n    justify-content: flex-end;\n}\n.container[data-v-4831c6fe] {\n  margin: 0 auto;\n  position: relative;\n}\n@media screen and (min-width: 1088px) {\n.container[data-v-4831c6fe] {\n      max-width: 960px;\n      width: 960px;\n}\n.container.is-fluid[data-v-4831c6fe] {\n        margin-left: 64px;\n        margin-right: 64px;\n        max-width: none;\n        width: auto;\n}\n}\n@media screen and (max-width: 1279px) {\n.container.is-widescreen[data-v-4831c6fe] {\n      max-width: 1152px;\n      width: auto;\n}\n}\n@media screen and (max-width: 1471px) {\n.container.is-fullhd[data-v-4831c6fe] {\n      max-width: 1344px;\n      width: auto;\n}\n}\n@media screen and (min-width: 1280px) {\n.container[data-v-4831c6fe] {\n      max-width: 1152px;\n      width: 1152px;\n}\n}\n@media screen and (min-width: 1472px) {\n.container[data-v-4831c6fe] {\n      max-width: 1344px;\n      width: 1344px;\n}\n}\n.content li + li[data-v-4831c6fe] {\n  margin-top: 0.25em;\n}\n.content p[data-v-4831c6fe]:not(:last-child),\n.content dl[data-v-4831c6fe]:not(:last-child),\n.content ol[data-v-4831c6fe]:not(:last-child),\n.content ul[data-v-4831c6fe]:not(:last-child),\n.content blockquote[data-v-4831c6fe]:not(:last-child),\n.content pre[data-v-4831c6fe]:not(:last-child),\n.content table[data-v-4831c6fe]:not(:last-child) {\n  margin-bottom: 1em;\n}\n.content h1[data-v-4831c6fe],\n.content h2[data-v-4831c6fe],\n.content h3[data-v-4831c6fe],\n.content h4[data-v-4831c6fe],\n.content h5[data-v-4831c6fe],\n.content h6[data-v-4831c6fe] {\n  color: #363636;\n  font-weight: 600;\n  line-height: 1.125;\n}\n.content h1[data-v-4831c6fe] {\n  font-size: 2em;\n  margin-bottom: 0.5em;\n}\n.content h1[data-v-4831c6fe]:not(:first-child) {\n    margin-top: 1em;\n}\n.content h2[data-v-4831c6fe] {\n  font-size: 1.75em;\n  margin-bottom: 0.5714em;\n}\n.content h2[data-v-4831c6fe]:not(:first-child) {\n    margin-top: 1.1428em;\n}\n.content h3[data-v-4831c6fe] {\n  font-size: 1.5em;\n  margin-bottom: 0.6666em;\n}\n.content h3[data-v-4831c6fe]:not(:first-child) {\n    margin-top: 1.3333em;\n}\n.content h4[data-v-4831c6fe] {\n  font-size: 1.25em;\n  margin-bottom: 0.8em;\n}\n.content h5[data-v-4831c6fe] {\n  font-size: 1.125em;\n  margin-bottom: 0.8888em;\n}\n.content h6[data-v-4831c6fe] {\n  font-size: 1em;\n  margin-bottom: 1em;\n}\n.content blockquote[data-v-4831c6fe] {\n  background-color: whitesmoke;\n  border-left: 5px solid #dbdbdb;\n  padding: 1.25em 1.5em;\n}\n.content ol[data-v-4831c6fe] {\n  list-style-position: outside;\n  margin-left: 2em;\n  margin-top: 1em;\n}\n.content ol[data-v-4831c6fe]:not([type]) {\n    list-style-type: decimal;\n}\n.content ol:not([type]).is-lower-alpha[data-v-4831c6fe] {\n      list-style-type: lower-alpha;\n}\n.content ol:not([type]).is-lower-roman[data-v-4831c6fe] {\n      list-style-type: lower-roman;\n}\n.content ol:not([type]).is-upper-alpha[data-v-4831c6fe] {\n      list-style-type: upper-alpha;\n}\n.content ol:not([type]).is-upper-roman[data-v-4831c6fe] {\n      list-style-type: upper-roman;\n}\n.content ul[data-v-4831c6fe] {\n  list-style: disc outside;\n  margin-left: 2em;\n  margin-top: 1em;\n}\n.content ul ul[data-v-4831c6fe] {\n    list-style-type: circle;\n    margin-top: 0.5em;\n}\n.content ul ul ul[data-v-4831c6fe] {\n      list-style-type: square;\n}\n.content dd[data-v-4831c6fe] {\n  margin-left: 2em;\n}\n.content figure[data-v-4831c6fe] {\n  margin-left: 2em;\n  margin-right: 2em;\n  text-align: center;\n}\n.content figure[data-v-4831c6fe]:not(:first-child) {\n    margin-top: 2em;\n}\n.content figure[data-v-4831c6fe]:not(:last-child) {\n    margin-bottom: 2em;\n}\n.content figure img[data-v-4831c6fe] {\n    display: inline-block;\n}\n.content figure figcaption[data-v-4831c6fe] {\n    font-style: italic;\n}\n.content pre[data-v-4831c6fe] {\n  -webkit-overflow-scrolling: touch;\n  overflow-x: auto;\n  padding: 1.25em 1.5em;\n  white-space: pre;\n  word-wrap: normal;\n}\n.content sup[data-v-4831c6fe],\n.content sub[data-v-4831c6fe] {\n  font-size: 75%;\n}\n.content table[data-v-4831c6fe] {\n  width: 100%;\n}\n.content table td[data-v-4831c6fe],\n  .content table th[data-v-4831c6fe] {\n    border: 1px solid #dbdbdb;\n    border-width: 0 0 1px;\n    padding: 0.5em 0.75em;\n    vertical-align: top;\n}\n.content table th[data-v-4831c6fe] {\n    color: #363636;\n    text-align: left;\n}\n.content table thead td[data-v-4831c6fe],\n  .content table thead th[data-v-4831c6fe] {\n    border-width: 0 0 2px;\n    color: #363636;\n}\n.content table tfoot td[data-v-4831c6fe],\n  .content table tfoot th[data-v-4831c6fe] {\n    border-width: 2px 0 0;\n    color: #363636;\n}\n.content table tbody tr:last-child td[data-v-4831c6fe],\n  .content table tbody tr:last-child th[data-v-4831c6fe] {\n    border-bottom-width: 0;\n}\n.content.is-small[data-v-4831c6fe] {\n  font-size: 0.75rem;\n}\n.content.is-medium[data-v-4831c6fe] {\n  font-size: 1.25rem;\n}\n.content.is-large[data-v-4831c6fe] {\n  font-size: 1.5rem;\n}\n.input[data-v-4831c6fe],\n.textarea[data-v-4831c6fe] {\n  background-color: white;\n  border-color: #dbdbdb;\n  color: #363636;\n  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);\n  max-width: 100%;\n  width: 100%;\n}\n.input[data-v-4831c6fe]::-moz-placeholder,\n  .textarea[data-v-4831c6fe]::-moz-placeholder {\n    color: rgba(54, 54, 54, 0.3);\n}\n.input[data-v-4831c6fe]::-webkit-input-placeholder,\n  .textarea[data-v-4831c6fe]::-webkit-input-placeholder {\n    color: rgba(54, 54, 54, 0.3);\n}\n.input[data-v-4831c6fe]:-moz-placeholder,\n  .textarea[data-v-4831c6fe]:-moz-placeholder {\n    color: rgba(54, 54, 54, 0.3);\n}\n.input[data-v-4831c6fe]:-ms-input-placeholder,\n  .textarea[data-v-4831c6fe]:-ms-input-placeholder {\n    color: rgba(54, 54, 54, 0.3);\n}\n.input[data-v-4831c6fe]:hover, .input.is-hovered[data-v-4831c6fe],\n  .textarea[data-v-4831c6fe]:hover,\n  .textarea.is-hovered[data-v-4831c6fe] {\n    border-color: #b5b5b5;\n}\n.input[data-v-4831c6fe]:focus, .input.is-focused[data-v-4831c6fe], .input[data-v-4831c6fe]:active, .input.is-active[data-v-4831c6fe],\n  .textarea[data-v-4831c6fe]:focus,\n  .textarea.is-focused[data-v-4831c6fe],\n  .textarea[data-v-4831c6fe]:active,\n  .textarea.is-active[data-v-4831c6fe] {\n    border-color: #3273dc;\n    box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25);\n}\n.input[disabled][data-v-4831c6fe],\n  .textarea[disabled][data-v-4831c6fe] {\n    background-color: whitesmoke;\n    border-color: whitesmoke;\n    box-shadow: none;\n    color: #7a7a7a;\n}\n.input[disabled][data-v-4831c6fe]::-moz-placeholder,\n    .textarea[disabled][data-v-4831c6fe]::-moz-placeholder {\n      color: rgba(122, 122, 122, 0.3);\n}\n.input[disabled][data-v-4831c6fe]::-webkit-input-placeholder,\n    .textarea[disabled][data-v-4831c6fe]::-webkit-input-placeholder {\n      color: rgba(122, 122, 122, 0.3);\n}\n.input[disabled][data-v-4831c6fe]:-moz-placeholder,\n    .textarea[disabled][data-v-4831c6fe]:-moz-placeholder {\n      color: rgba(122, 122, 122, 0.3);\n}\n.input[disabled][data-v-4831c6fe]:-ms-input-placeholder,\n    .textarea[disabled][data-v-4831c6fe]:-ms-input-placeholder {\n      color: rgba(122, 122, 122, 0.3);\n}\n.input[readonly][data-v-4831c6fe],\n  .textarea[readonly][data-v-4831c6fe] {\n    box-shadow: none;\n}\n.input.is-white[data-v-4831c6fe],\n  .textarea.is-white[data-v-4831c6fe] {\n    border-color: white;\n}\n.input.is-white[data-v-4831c6fe]:focus, .input.is-white.is-focused[data-v-4831c6fe], .input.is-white[data-v-4831c6fe]:active, .input.is-white.is-active[data-v-4831c6fe],\n    .textarea.is-white[data-v-4831c6fe]:focus,\n    .textarea.is-white.is-focused[data-v-4831c6fe],\n    .textarea.is-white[data-v-4831c6fe]:active,\n    .textarea.is-white.is-active[data-v-4831c6fe] {\n      box-shadow: 0 0 0 0.125em rgba(255, 255, 255, 0.25);\n}\n.input.is-black[data-v-4831c6fe],\n  .textarea.is-black[data-v-4831c6fe] {\n    border-color: #0a0a0a;\n}\n.input.is-black[data-v-4831c6fe]:focus, .input.is-black.is-focused[data-v-4831c6fe], .input.is-black[data-v-4831c6fe]:active, .input.is-black.is-active[data-v-4831c6fe],\n    .textarea.is-black[data-v-4831c6fe]:focus,\n    .textarea.is-black.is-focused[data-v-4831c6fe],\n    .textarea.is-black[data-v-4831c6fe]:active,\n    .textarea.is-black.is-active[data-v-4831c6fe] {\n      box-shadow: 0 0 0 0.125em rgba(10, 10, 10, 0.25);\n}\n.input.is-light[data-v-4831c6fe],\n  .textarea.is-light[data-v-4831c6fe] {\n    border-color: whitesmoke;\n}\n.input.is-light[data-v-4831c6fe]:focus, .input.is-light.is-focused[data-v-4831c6fe], .input.is-light[data-v-4831c6fe]:active, .input.is-light.is-active[data-v-4831c6fe],\n    .textarea.is-light[data-v-4831c6fe]:focus,\n    .textarea.is-light.is-focused[data-v-4831c6fe],\n    .textarea.is-light[data-v-4831c6fe]:active,\n    .textarea.is-light.is-active[data-v-4831c6fe] {\n      box-shadow: 0 0 0 0.125em rgba(245, 245, 245, 0.25);\n}\n.input.is-dark[data-v-4831c6fe],\n  .textarea.is-dark[data-v-4831c6fe] {\n    border-color: #363636;\n}\n.input.is-dark[data-v-4831c6fe]:focus, .input.is-dark.is-focused[data-v-4831c6fe], .input.is-dark[data-v-4831c6fe]:active, .input.is-dark.is-active[data-v-4831c6fe],\n    .textarea.is-dark[data-v-4831c6fe]:focus,\n    .textarea.is-dark.is-focused[data-v-4831c6fe],\n    .textarea.is-dark[data-v-4831c6fe]:active,\n    .textarea.is-dark.is-active[data-v-4831c6fe] {\n      box-shadow: 0 0 0 0.125em rgba(54, 54, 54, 0.25);\n}\n.input.is-primary[data-v-4831c6fe],[data-v-4831c6fe] .input.tagAreaClass,[data-v-4831c6fe] .input.deleteAreaClass,[data-v-4831c6fe] .input.deleteContentClass,\n  .textarea.is-primary[data-v-4831c6fe],[data-v-4831c6fe] .textarea.tagAreaClass,[data-v-4831c6fe] .textarea.deleteAreaClass,[data-v-4831c6fe] .textarea.deleteContentClass {\n    border-color: #00d1b2;\n}\n.input.is-primary[data-v-4831c6fe]:focus,[data-v-4831c6fe] .input.tagAreaClass:focus,[data-v-4831c6fe] .input.deleteAreaClass:focus,[data-v-4831c6fe] .input.deleteContentClass:focus, .input.is-primary.is-focused[data-v-4831c6fe],[data-v-4831c6fe] .input.is-focused.tagAreaClass,[data-v-4831c6fe] .input.is-focused.deleteAreaClass,[data-v-4831c6fe] .input.is-focused.deleteContentClass, .input.is-primary[data-v-4831c6fe]:active,[data-v-4831c6fe] .input.tagAreaClass:active,[data-v-4831c6fe] .input.deleteAreaClass:active,[data-v-4831c6fe] .input.deleteContentClass:active, .input.is-primary.is-active[data-v-4831c6fe],[data-v-4831c6fe] .input.is-active.tagAreaClass,[data-v-4831c6fe] .input.is-active.deleteAreaClass,[data-v-4831c6fe] .input.is-active.deleteContentClass,\n    .textarea.is-primary[data-v-4831c6fe]:focus,[data-v-4831c6fe] .textarea.tagAreaClass:focus,[data-v-4831c6fe] .textarea.deleteAreaClass:focus,[data-v-4831c6fe] .textarea.deleteContentClass:focus,\n    .textarea.is-primary.is-focused[data-v-4831c6fe],[data-v-4831c6fe] .textarea.is-focused.tagAreaClass,[data-v-4831c6fe] .textarea.is-focused.deleteAreaClass,[data-v-4831c6fe] .textarea.is-focused.deleteContentClass,\n    .textarea.is-primary[data-v-4831c6fe]:active,[data-v-4831c6fe] .textarea.tagAreaClass:active,[data-v-4831c6fe] .textarea.deleteAreaClass:active,[data-v-4831c6fe] .textarea.deleteContentClass:active,\n    .textarea.is-primary.is-active[data-v-4831c6fe],[data-v-4831c6fe] .textarea.is-active.tagAreaClass,[data-v-4831c6fe] .textarea.is-active.deleteAreaClass,[data-v-4831c6fe] .textarea.is-active.deleteContentClass {\n      box-shadow: 0 0 0 0.125em rgba(0, 209, 178, 0.25);\n}\n.input.is-link[data-v-4831c6fe],\n  .textarea.is-link[data-v-4831c6fe] {\n    border-color: #3273dc;\n}\n.input.is-link[data-v-4831c6fe]:focus, .input.is-link.is-focused[data-v-4831c6fe], .input.is-link[data-v-4831c6fe]:active, .input.is-link.is-active[data-v-4831c6fe],\n    .textarea.is-link[data-v-4831c6fe]:focus,\n    .textarea.is-link.is-focused[data-v-4831c6fe],\n    .textarea.is-link[data-v-4831c6fe]:active,\n    .textarea.is-link.is-active[data-v-4831c6fe] {\n      box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25);\n}\n.input.is-info[data-v-4831c6fe],\n  .textarea.is-info[data-v-4831c6fe] {\n    border-color: #209cee;\n}\n.input.is-info[data-v-4831c6fe]:focus, .input.is-info.is-focused[data-v-4831c6fe], .input.is-info[data-v-4831c6fe]:active, .input.is-info.is-active[data-v-4831c6fe],\n    .textarea.is-info[data-v-4831c6fe]:focus,\n    .textarea.is-info.is-focused[data-v-4831c6fe],\n    .textarea.is-info[data-v-4831c6fe]:active,\n    .textarea.is-info.is-active[data-v-4831c6fe] {\n      box-shadow: 0 0 0 0.125em rgba(32, 156, 238, 0.25);\n}\n.input.is-success[data-v-4831c6fe],\n  .textarea.is-success[data-v-4831c6fe] {\n    border-color: #23d160;\n}\n.input.is-success[data-v-4831c6fe]:focus, .input.is-success.is-focused[data-v-4831c6fe], .input.is-success[data-v-4831c6fe]:active, .input.is-success.is-active[data-v-4831c6fe],\n    .textarea.is-success[data-v-4831c6fe]:focus,\n    .textarea.is-success.is-focused[data-v-4831c6fe],\n    .textarea.is-success[data-v-4831c6fe]:active,\n    .textarea.is-success.is-active[data-v-4831c6fe] {\n      box-shadow: 0 0 0 0.125em rgba(35, 209, 96, 0.25);\n}\n.input.is-warning[data-v-4831c6fe],\n  .textarea.is-warning[data-v-4831c6fe] {\n    border-color: #ffdd57;\n}\n.input.is-warning[data-v-4831c6fe]:focus, .input.is-warning.is-focused[data-v-4831c6fe], .input.is-warning[data-v-4831c6fe]:active, .input.is-warning.is-active[data-v-4831c6fe],\n    .textarea.is-warning[data-v-4831c6fe]:focus,\n    .textarea.is-warning.is-focused[data-v-4831c6fe],\n    .textarea.is-warning[data-v-4831c6fe]:active,\n    .textarea.is-warning.is-active[data-v-4831c6fe] {\n      box-shadow: 0 0 0 0.125em rgba(255, 221, 87, 0.25);\n}\n.input.is-danger[data-v-4831c6fe],\n  .textarea.is-danger[data-v-4831c6fe] {\n    border-color: #ff3860;\n}\n.input.is-danger[data-v-4831c6fe]:focus, .input.is-danger.is-focused[data-v-4831c6fe], .input.is-danger[data-v-4831c6fe]:active, .input.is-danger.is-active[data-v-4831c6fe],\n    .textarea.is-danger[data-v-4831c6fe]:focus,\n    .textarea.is-danger.is-focused[data-v-4831c6fe],\n    .textarea.is-danger[data-v-4831c6fe]:active,\n    .textarea.is-danger.is-active[data-v-4831c6fe] {\n      box-shadow: 0 0 0 0.125em rgba(255, 56, 96, 0.25);\n}\n.input.is-small[data-v-4831c6fe],\n  .textarea.is-small[data-v-4831c6fe] {\n    border-radius: 2px;\n    font-size: 0.75rem;\n}\n.input.is-medium[data-v-4831c6fe],\n  .textarea.is-medium[data-v-4831c6fe] {\n    font-size: 1.25rem;\n}\n.input.is-large[data-v-4831c6fe],\n  .textarea.is-large[data-v-4831c6fe] {\n    font-size: 1.5rem;\n}\n.input.is-fullwidth[data-v-4831c6fe],\n  .textarea.is-fullwidth[data-v-4831c6fe] {\n    display: block;\n    width: 100%;\n}\n.input.is-inline[data-v-4831c6fe],\n  .textarea.is-inline[data-v-4831c6fe] {\n    display: inline;\n    width: auto;\n}\n.input.is-rounded[data-v-4831c6fe] {\n  border-radius: 290486px;\n  padding-left: 1em;\n  padding-right: 1em;\n}\n.input.is-static[data-v-4831c6fe] {\n  background-color: transparent;\n  border-color: transparent;\n  box-shadow: none;\n  padding-left: 0;\n  padding-right: 0;\n}\n.textarea[data-v-4831c6fe] {\n  display: block;\n  max-width: 100%;\n  min-width: 100%;\n  padding: 0.625em;\n  resize: vertical;\n}\n.textarea[data-v-4831c6fe]:not([rows]) {\n    max-height: 600px;\n    min-height: 120px;\n}\n.textarea[rows][data-v-4831c6fe] {\n    height: initial;\n}\n.textarea.has-fixed-size[data-v-4831c6fe] {\n    resize: none;\n}\n.checkbox[data-v-4831c6fe],\n.radio[data-v-4831c6fe] {\n  cursor: pointer;\n  display: inline-block;\n  line-height: 1.25;\n  position: relative;\n}\n.checkbox input[data-v-4831c6fe],\n  .radio input[data-v-4831c6fe] {\n    cursor: pointer;\n}\n.checkbox[data-v-4831c6fe]:hover,\n  .radio[data-v-4831c6fe]:hover {\n    color: #363636;\n}\n.checkbox[disabled][data-v-4831c6fe],\n  .radio[disabled][data-v-4831c6fe] {\n    color: #7a7a7a;\n    cursor: not-allowed;\n}\n.radio + .radio[data-v-4831c6fe] {\n  margin-left: 0.5em;\n}\n.select[data-v-4831c6fe] {\n  display: inline-block;\n  max-width: 100%;\n  position: relative;\n  vertical-align: top;\n}\n.select[data-v-4831c6fe]:not(.is-multiple) {\n    height: 2.25em;\n}\n.select[data-v-4831c6fe]:not(.is-multiple):not(.is-loading)::after {\n    border-color: #3273dc;\n    right: 1.125em;\n    z-index: 4;\n}\n.select.is-rounded select[data-v-4831c6fe] {\n    border-radius: 290486px;\n    padding-left: 1em;\n}\n.select select[data-v-4831c6fe] {\n    background-color: white;\n    border-color: #dbdbdb;\n    color: #363636;\n    cursor: pointer;\n    display: block;\n    font-size: 1em;\n    max-width: 100%;\n    outline: none;\n}\n.select select[data-v-4831c6fe]::-moz-placeholder {\n      color: rgba(54, 54, 54, 0.3);\n}\n.select select[data-v-4831c6fe]::-webkit-input-placeholder {\n      color: rgba(54, 54, 54, 0.3);\n}\n.select select[data-v-4831c6fe]:-moz-placeholder {\n      color: rgba(54, 54, 54, 0.3);\n}\n.select select[data-v-4831c6fe]:-ms-input-placeholder {\n      color: rgba(54, 54, 54, 0.3);\n}\n.select select[data-v-4831c6fe]:hover, .select select.is-hovered[data-v-4831c6fe] {\n      border-color: #b5b5b5;\n}\n.select select[data-v-4831c6fe]:focus, .select select.is-focused[data-v-4831c6fe], .select select[data-v-4831c6fe]:active, .select select.is-active[data-v-4831c6fe] {\n      border-color: #3273dc;\n      box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25);\n}\n.select select[disabled][data-v-4831c6fe] {\n      background-color: whitesmoke;\n      border-color: whitesmoke;\n      box-shadow: none;\n      color: #7a7a7a;\n}\n.select select[disabled][data-v-4831c6fe]::-moz-placeholder {\n        color: rgba(122, 122, 122, 0.3);\n}\n.select select[disabled][data-v-4831c6fe]::-webkit-input-placeholder {\n        color: rgba(122, 122, 122, 0.3);\n}\n.select select[disabled][data-v-4831c6fe]:-moz-placeholder {\n        color: rgba(122, 122, 122, 0.3);\n}\n.select select[disabled][data-v-4831c6fe]:-ms-input-placeholder {\n        color: rgba(122, 122, 122, 0.3);\n}\n.select select[data-v-4831c6fe]::-ms-expand {\n      display: none;\n}\n.select select[disabled][data-v-4831c6fe]:hover {\n      border-color: whitesmoke;\n}\n.select select[data-v-4831c6fe]:not([multiple]) {\n      padding-right: 2.5em;\n}\n.select select[multiple][data-v-4831c6fe] {\n      height: auto;\n      padding: 0;\n}\n.select select[multiple] option[data-v-4831c6fe] {\n        padding: 0.5em 1em;\n}\n.select[data-v-4831c6fe]:not(.is-multiple):not(.is-loading):hover::after {\n    border-color: #363636;\n}\n.select.is-white[data-v-4831c6fe]:not(:hover)::after {\n    border-color: white;\n}\n.select.is-white select[data-v-4831c6fe] {\n    border-color: white;\n}\n.select.is-white select[data-v-4831c6fe]:hover, .select.is-white select.is-hovered[data-v-4831c6fe] {\n      border-color: #f2f2f2;\n}\n.select.is-white select[data-v-4831c6fe]:focus, .select.is-white select.is-focused[data-v-4831c6fe], .select.is-white select[data-v-4831c6fe]:active, .select.is-white select.is-active[data-v-4831c6fe] {\n      box-shadow: 0 0 0 0.125em rgba(255, 255, 255, 0.25);\n}\n.select.is-black[data-v-4831c6fe]:not(:hover)::after {\n    border-color: #0a0a0a;\n}\n.select.is-black select[data-v-4831c6fe] {\n    border-color: #0a0a0a;\n}\n.select.is-black select[data-v-4831c6fe]:hover, .select.is-black select.is-hovered[data-v-4831c6fe] {\n      border-color: black;\n}\n.select.is-black select[data-v-4831c6fe]:focus, .select.is-black select.is-focused[data-v-4831c6fe], .select.is-black select[data-v-4831c6fe]:active, .select.is-black select.is-active[data-v-4831c6fe] {\n      box-shadow: 0 0 0 0.125em rgba(10, 10, 10, 0.25);\n}\n.select.is-light[data-v-4831c6fe]:not(:hover)::after {\n    border-color: whitesmoke;\n}\n.select.is-light select[data-v-4831c6fe] {\n    border-color: whitesmoke;\n}\n.select.is-light select[data-v-4831c6fe]:hover, .select.is-light select.is-hovered[data-v-4831c6fe] {\n      border-color: #e8e8e8;\n}\n.select.is-light select[data-v-4831c6fe]:focus, .select.is-light select.is-focused[data-v-4831c6fe], .select.is-light select[data-v-4831c6fe]:active, .select.is-light select.is-active[data-v-4831c6fe] {\n      box-shadow: 0 0 0 0.125em rgba(245, 245, 245, 0.25);\n}\n.select.is-dark[data-v-4831c6fe]:not(:hover)::after {\n    border-color: #363636;\n}\n.select.is-dark select[data-v-4831c6fe] {\n    border-color: #363636;\n}\n.select.is-dark select[data-v-4831c6fe]:hover, .select.is-dark select.is-hovered[data-v-4831c6fe] {\n      border-color: #292929;\n}\n.select.is-dark select[data-v-4831c6fe]:focus, .select.is-dark select.is-focused[data-v-4831c6fe], .select.is-dark select[data-v-4831c6fe]:active, .select.is-dark select.is-active[data-v-4831c6fe] {\n      box-shadow: 0 0 0 0.125em rgba(54, 54, 54, 0.25);\n}\n.select.is-primary[data-v-4831c6fe]:not(:hover)::after,[data-v-4831c6fe] .select.tagAreaClass:not(:hover)::after,[data-v-4831c6fe] .select.deleteAreaClass:not(:hover)::after,[data-v-4831c6fe] .select.deleteContentClass:not(:hover)::after {\n    border-color: #00d1b2;\n}\n.select.is-primary select[data-v-4831c6fe],[data-v-4831c6fe] .select.tagAreaClass select,[data-v-4831c6fe] .select.deleteAreaClass select,[data-v-4831c6fe] .select.deleteContentClass select {\n    border-color: #00d1b2;\n}\n.select.is-primary select[data-v-4831c6fe]:hover,[data-v-4831c6fe] .select.tagAreaClass select:hover,[data-v-4831c6fe] .select.deleteAreaClass select:hover,[data-v-4831c6fe] .select.deleteContentClass select:hover, .select.is-primary select.is-hovered[data-v-4831c6fe],[data-v-4831c6fe] .select.tagAreaClass select.is-hovered,[data-v-4831c6fe] .select.deleteAreaClass select.is-hovered,[data-v-4831c6fe] .select.deleteContentClass select.is-hovered {\n      border-color: #00b89c;\n}\n.select.is-primary select[data-v-4831c6fe]:focus,[data-v-4831c6fe] .select.tagAreaClass select:focus,[data-v-4831c6fe] .select.deleteAreaClass select:focus,[data-v-4831c6fe] .select.deleteContentClass select:focus, .select.is-primary select.is-focused[data-v-4831c6fe],[data-v-4831c6fe] .select.tagAreaClass select.is-focused,[data-v-4831c6fe] .select.deleteAreaClass select.is-focused,[data-v-4831c6fe] .select.deleteContentClass select.is-focused, .select.is-primary select[data-v-4831c6fe]:active,[data-v-4831c6fe] .select.tagAreaClass select:active,[data-v-4831c6fe] .select.deleteAreaClass select:active,[data-v-4831c6fe] .select.deleteContentClass select:active, .select.is-primary select.is-active[data-v-4831c6fe],[data-v-4831c6fe] .select.tagAreaClass select.is-active,[data-v-4831c6fe] .select.deleteAreaClass select.is-active,[data-v-4831c6fe] .select.deleteContentClass select.is-active {\n      box-shadow: 0 0 0 0.125em rgba(0, 209, 178, 0.25);\n}\n.select.is-link[data-v-4831c6fe]:not(:hover)::after {\n    border-color: #3273dc;\n}\n.select.is-link select[data-v-4831c6fe] {\n    border-color: #3273dc;\n}\n.select.is-link select[data-v-4831c6fe]:hover, .select.is-link select.is-hovered[data-v-4831c6fe] {\n      border-color: #2366d1;\n}\n.select.is-link select[data-v-4831c6fe]:focus, .select.is-link select.is-focused[data-v-4831c6fe], .select.is-link select[data-v-4831c6fe]:active, .select.is-link select.is-active[data-v-4831c6fe] {\n      box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25);\n}\n.select.is-info[data-v-4831c6fe]:not(:hover)::after {\n    border-color: #209cee;\n}\n.select.is-info select[data-v-4831c6fe] {\n    border-color: #209cee;\n}\n.select.is-info select[data-v-4831c6fe]:hover, .select.is-info select.is-hovered[data-v-4831c6fe] {\n      border-color: #118fe4;\n}\n.select.is-info select[data-v-4831c6fe]:focus, .select.is-info select.is-focused[data-v-4831c6fe], .select.is-info select[data-v-4831c6fe]:active, .select.is-info select.is-active[data-v-4831c6fe] {\n      box-shadow: 0 0 0 0.125em rgba(32, 156, 238, 0.25);\n}\n.select.is-success[data-v-4831c6fe]:not(:hover)::after {\n    border-color: #23d160;\n}\n.select.is-success select[data-v-4831c6fe] {\n    border-color: #23d160;\n}\n.select.is-success select[data-v-4831c6fe]:hover, .select.is-success select.is-hovered[data-v-4831c6fe] {\n      border-color: #20bc56;\n}\n.select.is-success select[data-v-4831c6fe]:focus, .select.is-success select.is-focused[data-v-4831c6fe], .select.is-success select[data-v-4831c6fe]:active, .select.is-success select.is-active[data-v-4831c6fe] {\n      box-shadow: 0 0 0 0.125em rgba(35, 209, 96, 0.25);\n}\n.select.is-warning[data-v-4831c6fe]:not(:hover)::after {\n    border-color: #ffdd57;\n}\n.select.is-warning select[data-v-4831c6fe] {\n    border-color: #ffdd57;\n}\n.select.is-warning select[data-v-4831c6fe]:hover, .select.is-warning select.is-hovered[data-v-4831c6fe] {\n      border-color: #ffd83d;\n}\n.select.is-warning select[data-v-4831c6fe]:focus, .select.is-warning select.is-focused[data-v-4831c6fe], .select.is-warning select[data-v-4831c6fe]:active, .select.is-warning select.is-active[data-v-4831c6fe] {\n      box-shadow: 0 0 0 0.125em rgba(255, 221, 87, 0.25);\n}\n.select.is-danger[data-v-4831c6fe]:not(:hover)::after {\n    border-color: #ff3860;\n}\n.select.is-danger select[data-v-4831c6fe] {\n    border-color: #ff3860;\n}\n.select.is-danger select[data-v-4831c6fe]:hover, .select.is-danger select.is-hovered[data-v-4831c6fe] {\n      border-color: #ff1f4b;\n}\n.select.is-danger select[data-v-4831c6fe]:focus, .select.is-danger select.is-focused[data-v-4831c6fe], .select.is-danger select[data-v-4831c6fe]:active, .select.is-danger select.is-active[data-v-4831c6fe] {\n      box-shadow: 0 0 0 0.125em rgba(255, 56, 96, 0.25);\n}\n.select.is-small[data-v-4831c6fe] {\n    border-radius: 2px;\n    font-size: 0.75rem;\n}\n.select.is-medium[data-v-4831c6fe] {\n    font-size: 1.25rem;\n}\n.select.is-large[data-v-4831c6fe] {\n    font-size: 1.5rem;\n}\n.select.is-disabled[data-v-4831c6fe]::after {\n    border-color: #7a7a7a;\n}\n.select.is-fullwidth[data-v-4831c6fe] {\n    width: 100%;\n}\n.select.is-fullwidth select[data-v-4831c6fe] {\n      width: 100%;\n}\n.select.is-loading[data-v-4831c6fe]::after {\n    margin-top: 0;\n    position: absolute;\n    right: 0.625em;\n    top: 0.625em;\n    transform: none;\n}\n.select.is-loading.is-small[data-v-4831c6fe]:after {\n    font-size: 0.75rem;\n}\n.select.is-loading.is-medium[data-v-4831c6fe]:after {\n    font-size: 1.25rem;\n}\n.select.is-loading.is-large[data-v-4831c6fe]:after {\n    font-size: 1.5rem;\n}\n.file[data-v-4831c6fe] {\n  align-items: stretch;\n  display: flex;\n  justify-content: flex-start;\n  position: relative;\n}\n.file.is-white .file-cta[data-v-4831c6fe] {\n    background-color: white;\n    border-color: transparent;\n    color: #0a0a0a;\n}\n.file.is-white:hover .file-cta[data-v-4831c6fe], .file.is-white.is-hovered .file-cta[data-v-4831c6fe] {\n    background-color: #f9f9f9;\n    border-color: transparent;\n    color: #0a0a0a;\n}\n.file.is-white:focus .file-cta[data-v-4831c6fe], .file.is-white.is-focused .file-cta[data-v-4831c6fe] {\n    border-color: transparent;\n    box-shadow: 0 0 0.5em rgba(255, 255, 255, 0.25);\n    color: #0a0a0a;\n}\n.file.is-white:active .file-cta[data-v-4831c6fe], .file.is-white.is-active .file-cta[data-v-4831c6fe] {\n    background-color: #f2f2f2;\n    border-color: transparent;\n    color: #0a0a0a;\n}\n.file.is-black .file-cta[data-v-4831c6fe] {\n    background-color: #0a0a0a;\n    border-color: transparent;\n    color: white;\n}\n.file.is-black:hover .file-cta[data-v-4831c6fe], .file.is-black.is-hovered .file-cta[data-v-4831c6fe] {\n    background-color: #040404;\n    border-color: transparent;\n    color: white;\n}\n.file.is-black:focus .file-cta[data-v-4831c6fe], .file.is-black.is-focused .file-cta[data-v-4831c6fe] {\n    border-color: transparent;\n    box-shadow: 0 0 0.5em rgba(10, 10, 10, 0.25);\n    color: white;\n}\n.file.is-black:active .file-cta[data-v-4831c6fe], .file.is-black.is-active .file-cta[data-v-4831c6fe] {\n    background-color: black;\n    border-color: transparent;\n    color: white;\n}\n.file.is-light .file-cta[data-v-4831c6fe] {\n    background-color: whitesmoke;\n    border-color: transparent;\n    color: #363636;\n}\n.file.is-light:hover .file-cta[data-v-4831c6fe], .file.is-light.is-hovered .file-cta[data-v-4831c6fe] {\n    background-color: #eeeeee;\n    border-color: transparent;\n    color: #363636;\n}\n.file.is-light:focus .file-cta[data-v-4831c6fe], .file.is-light.is-focused .file-cta[data-v-4831c6fe] {\n    border-color: transparent;\n    box-shadow: 0 0 0.5em rgba(245, 245, 245, 0.25);\n    color: #363636;\n}\n.file.is-light:active .file-cta[data-v-4831c6fe], .file.is-light.is-active .file-cta[data-v-4831c6fe] {\n    background-color: #e8e8e8;\n    border-color: transparent;\n    color: #363636;\n}\n.file.is-dark .file-cta[data-v-4831c6fe] {\n    background-color: #363636;\n    border-color: transparent;\n    color: whitesmoke;\n}\n.file.is-dark:hover .file-cta[data-v-4831c6fe], .file.is-dark.is-hovered .file-cta[data-v-4831c6fe] {\n    background-color: #2f2f2f;\n    border-color: transparent;\n    color: whitesmoke;\n}\n.file.is-dark:focus .file-cta[data-v-4831c6fe], .file.is-dark.is-focused .file-cta[data-v-4831c6fe] {\n    border-color: transparent;\n    box-shadow: 0 0 0.5em rgba(54, 54, 54, 0.25);\n    color: whitesmoke;\n}\n.file.is-dark:active .file-cta[data-v-4831c6fe], .file.is-dark.is-active .file-cta[data-v-4831c6fe] {\n    background-color: #292929;\n    border-color: transparent;\n    color: whitesmoke;\n}\n.file.is-primary .file-cta[data-v-4831c6fe],[data-v-4831c6fe] .file.tagAreaClass .file-cta,[data-v-4831c6fe] .file.deleteAreaClass .file-cta,[data-v-4831c6fe] .file.deleteContentClass .file-cta {\n    background-color: #00d1b2;\n    border-color: transparent;\n    color: #fff;\n}\n.file.is-primary:hover .file-cta[data-v-4831c6fe],[data-v-4831c6fe] .file.tagAreaClass:hover .file-cta,[data-v-4831c6fe] .file.deleteAreaClass:hover .file-cta,[data-v-4831c6fe] .file.deleteContentClass:hover .file-cta, .file.is-primary.is-hovered .file-cta[data-v-4831c6fe],[data-v-4831c6fe] .file.is-hovered.tagAreaClass .file-cta,[data-v-4831c6fe] .file.is-hovered.deleteAreaClass .file-cta,[data-v-4831c6fe] .file.is-hovered.deleteContentClass .file-cta {\n    background-color: #00c4a7;\n    border-color: transparent;\n    color: #fff;\n}\n.file.is-primary:focus .file-cta[data-v-4831c6fe],[data-v-4831c6fe] .file.tagAreaClass:focus .file-cta,[data-v-4831c6fe] .file.deleteAreaClass:focus .file-cta,[data-v-4831c6fe] .file.deleteContentClass:focus .file-cta, .file.is-primary.is-focused .file-cta[data-v-4831c6fe],[data-v-4831c6fe] .file.is-focused.tagAreaClass .file-cta,[data-v-4831c6fe] .file.is-focused.deleteAreaClass .file-cta,[data-v-4831c6fe] .file.is-focused.deleteContentClass .file-cta {\n    border-color: transparent;\n    box-shadow: 0 0 0.5em rgba(0, 209, 178, 0.25);\n    color: #fff;\n}\n.file.is-primary:active .file-cta[data-v-4831c6fe],[data-v-4831c6fe] .file.tagAreaClass:active .file-cta,[data-v-4831c6fe] .file.deleteAreaClass:active .file-cta,[data-v-4831c6fe] .file.deleteContentClass:active .file-cta, .file.is-primary.is-active .file-cta[data-v-4831c6fe],[data-v-4831c6fe] .file.is-active.tagAreaClass .file-cta,[data-v-4831c6fe] .file.is-active.deleteAreaClass .file-cta,[data-v-4831c6fe] .file.is-active.deleteContentClass .file-cta {\n    background-color: #00b89c;\n    border-color: transparent;\n    color: #fff;\n}\n.file.is-link .file-cta[data-v-4831c6fe] {\n    background-color: #3273dc;\n    border-color: transparent;\n    color: #fff;\n}\n.file.is-link:hover .file-cta[data-v-4831c6fe], .file.is-link.is-hovered .file-cta[data-v-4831c6fe] {\n    background-color: #276cda;\n    border-color: transparent;\n    color: #fff;\n}\n.file.is-link:focus .file-cta[data-v-4831c6fe], .file.is-link.is-focused .file-cta[data-v-4831c6fe] {\n    border-color: transparent;\n    box-shadow: 0 0 0.5em rgba(50, 115, 220, 0.25);\n    color: #fff;\n}\n.file.is-link:active .file-cta[data-v-4831c6fe], .file.is-link.is-active .file-cta[data-v-4831c6fe] {\n    background-color: #2366d1;\n    border-color: transparent;\n    color: #fff;\n}\n.file.is-info .file-cta[data-v-4831c6fe] {\n    background-color: #209cee;\n    border-color: transparent;\n    color: #fff;\n}\n.file.is-info:hover .file-cta[data-v-4831c6fe], .file.is-info.is-hovered .file-cta[data-v-4831c6fe] {\n    background-color: #1496ed;\n    border-color: transparent;\n    color: #fff;\n}\n.file.is-info:focus .file-cta[data-v-4831c6fe], .file.is-info.is-focused .file-cta[data-v-4831c6fe] {\n    border-color: transparent;\n    box-shadow: 0 0 0.5em rgba(32, 156, 238, 0.25);\n    color: #fff;\n}\n.file.is-info:active .file-cta[data-v-4831c6fe], .file.is-info.is-active .file-cta[data-v-4831c6fe] {\n    background-color: #118fe4;\n    border-color: transparent;\n    color: #fff;\n}\n.file.is-success .file-cta[data-v-4831c6fe] {\n    background-color: #23d160;\n    border-color: transparent;\n    color: #fff;\n}\n.file.is-success:hover .file-cta[data-v-4831c6fe], .file.is-success.is-hovered .file-cta[data-v-4831c6fe] {\n    background-color: #22c65b;\n    border-color: transparent;\n    color: #fff;\n}\n.file.is-success:focus .file-cta[data-v-4831c6fe], .file.is-success.is-focused .file-cta[data-v-4831c6fe] {\n    border-color: transparent;\n    box-shadow: 0 0 0.5em rgba(35, 209, 96, 0.25);\n    color: #fff;\n}\n.file.is-success:active .file-cta[data-v-4831c6fe], .file.is-success.is-active .file-cta[data-v-4831c6fe] {\n    background-color: #20bc56;\n    border-color: transparent;\n    color: #fff;\n}\n.file.is-warning .file-cta[data-v-4831c6fe] {\n    background-color: #ffdd57;\n    border-color: transparent;\n    color: rgba(0, 0, 0, 0.7);\n}\n.file.is-warning:hover .file-cta[data-v-4831c6fe], .file.is-warning.is-hovered .file-cta[data-v-4831c6fe] {\n    background-color: #ffdb4a;\n    border-color: transparent;\n    color: rgba(0, 0, 0, 0.7);\n}\n.file.is-warning:focus .file-cta[data-v-4831c6fe], .file.is-warning.is-focused .file-cta[data-v-4831c6fe] {\n    border-color: transparent;\n    box-shadow: 0 0 0.5em rgba(255, 221, 87, 0.25);\n    color: rgba(0, 0, 0, 0.7);\n}\n.file.is-warning:active .file-cta[data-v-4831c6fe], .file.is-warning.is-active .file-cta[data-v-4831c6fe] {\n    background-color: #ffd83d;\n    border-color: transparent;\n    color: rgba(0, 0, 0, 0.7);\n}\n.file.is-danger .file-cta[data-v-4831c6fe] {\n    background-color: #ff3860;\n    border-color: transparent;\n    color: #fff;\n}\n.file.is-danger:hover .file-cta[data-v-4831c6fe], .file.is-danger.is-hovered .file-cta[data-v-4831c6fe] {\n    background-color: #ff2b56;\n    border-color: transparent;\n    color: #fff;\n}\n.file.is-danger:focus .file-cta[data-v-4831c6fe], .file.is-danger.is-focused .file-cta[data-v-4831c6fe] {\n    border-color: transparent;\n    box-shadow: 0 0 0.5em rgba(255, 56, 96, 0.25);\n    color: #fff;\n}\n.file.is-danger:active .file-cta[data-v-4831c6fe], .file.is-danger.is-active .file-cta[data-v-4831c6fe] {\n    background-color: #ff1f4b;\n    border-color: transparent;\n    color: #fff;\n}\n.file.is-small[data-v-4831c6fe] {\n    font-size: 0.75rem;\n}\n.file.is-medium[data-v-4831c6fe] {\n    font-size: 1.25rem;\n}\n.file.is-medium .file-icon .fa[data-v-4831c6fe] {\n      font-size: 21px;\n}\n.file.is-large[data-v-4831c6fe] {\n    font-size: 1.5rem;\n}\n.file.is-large .file-icon .fa[data-v-4831c6fe] {\n      font-size: 28px;\n}\n.file.has-name .file-cta[data-v-4831c6fe] {\n    border-bottom-right-radius: 0;\n    border-top-right-radius: 0;\n}\n.file.has-name .file-name[data-v-4831c6fe] {\n    border-bottom-left-radius: 0;\n    border-top-left-radius: 0;\n}\n.file.has-name.is-empty .file-cta[data-v-4831c6fe] {\n    border-radius: 4px;\n}\n.file.has-name.is-empty .file-name[data-v-4831c6fe] {\n    display: none;\n}\n.file.is-boxed .file-label[data-v-4831c6fe] {\n    flex-direction: column;\n}\n.file.is-boxed .file-cta[data-v-4831c6fe] {\n    flex-direction: column;\n    height: auto;\n    padding: 1em 3em;\n}\n.file.is-boxed .file-name[data-v-4831c6fe] {\n    border-width: 0 1px 1px;\n}\n.file.is-boxed .file-icon[data-v-4831c6fe] {\n    height: 1.5em;\n    width: 1.5em;\n}\n.file.is-boxed .file-icon .fa[data-v-4831c6fe] {\n      font-size: 21px;\n}\n.file.is-boxed.is-small .file-icon .fa[data-v-4831c6fe] {\n    font-size: 14px;\n}\n.file.is-boxed.is-medium .file-icon .fa[data-v-4831c6fe] {\n    font-size: 28px;\n}\n.file.is-boxed.is-large .file-icon .fa[data-v-4831c6fe] {\n    font-size: 35px;\n}\n.file.is-boxed.has-name .file-cta[data-v-4831c6fe] {\n    border-radius: 4px 4px 0 0;\n}\n.file.is-boxed.has-name .file-name[data-v-4831c6fe] {\n    border-radius: 0 0 4px 4px;\n    border-width: 0 1px 1px;\n}\n.file.is-centered[data-v-4831c6fe] {\n    justify-content: center;\n}\n.file.is-fullwidth .file-label[data-v-4831c6fe] {\n    width: 100%;\n}\n.file.is-fullwidth .file-name[data-v-4831c6fe] {\n    flex-grow: 1;\n    max-width: none;\n}\n.file.is-right[data-v-4831c6fe] {\n    justify-content: flex-end;\n}\n.file.is-right .file-cta[data-v-4831c6fe] {\n      border-radius: 0 4px 4px 0;\n}\n.file.is-right .file-name[data-v-4831c6fe] {\n      border-radius: 4px 0 0 4px;\n      border-width: 1px 0 1px 1px;\n      order: -1;\n}\n.file-label[data-v-4831c6fe] {\n  align-items: stretch;\n  display: flex;\n  cursor: pointer;\n  justify-content: flex-start;\n  overflow: hidden;\n  position: relative;\n}\n.file-label:hover .file-cta[data-v-4831c6fe] {\n    background-color: #eeeeee;\n    color: #363636;\n}\n.file-label:hover .file-name[data-v-4831c6fe] {\n    border-color: #d5d5d5;\n}\n.file-label:active .file-cta[data-v-4831c6fe] {\n    background-color: #e8e8e8;\n    color: #363636;\n}\n.file-label:active .file-name[data-v-4831c6fe] {\n    border-color: #cfcfcf;\n}\n.file-input[data-v-4831c6fe] {\n  height: 100%;\n  left: 0;\n  opacity: 0;\n  outline: none;\n  position: absolute;\n  top: 0;\n  width: 100%;\n}\n.file-cta[data-v-4831c6fe],\n.file-name[data-v-4831c6fe] {\n  border-color: #dbdbdb;\n  border-radius: 4px;\n  font-size: 1em;\n  padding-left: 1em;\n  padding-right: 1em;\n  white-space: nowrap;\n}\n.file-cta[data-v-4831c6fe] {\n  background-color: whitesmoke;\n  color: #4a4a4a;\n}\n.file-name[data-v-4831c6fe] {\n  border-color: #dbdbdb;\n  border-style: solid;\n  border-width: 1px 1px 1px 0;\n  display: block;\n  max-width: 16em;\n  overflow: hidden;\n  text-align: left;\n  text-overflow: ellipsis;\n}\n.file-icon[data-v-4831c6fe] {\n  align-items: center;\n  display: flex;\n  height: 1em;\n  justify-content: center;\n  margin-right: 0.5em;\n  width: 1em;\n}\n.file-icon .fa[data-v-4831c6fe] {\n    font-size: 14px;\n}\n.label[data-v-4831c6fe] {\n  color: #363636;\n  display: block;\n  font-size: 1rem;\n  font-weight: 700;\n}\n.label[data-v-4831c6fe]:not(:last-child) {\n    margin-bottom: 0.5em;\n}\n.label.is-small[data-v-4831c6fe] {\n    font-size: 0.75rem;\n}\n.label.is-medium[data-v-4831c6fe] {\n    font-size: 1.25rem;\n}\n.label.is-large[data-v-4831c6fe] {\n    font-size: 1.5rem;\n}\n.help[data-v-4831c6fe] {\n  display: block;\n  font-size: 0.75rem;\n  margin-top: 0.25rem;\n}\n.help.is-white[data-v-4831c6fe] {\n    color: white;\n}\n.help.is-black[data-v-4831c6fe] {\n    color: #0a0a0a;\n}\n.help.is-light[data-v-4831c6fe] {\n    color: whitesmoke;\n}\n.help.is-dark[data-v-4831c6fe] {\n    color: #363636;\n}\n.help.is-primary[data-v-4831c6fe],[data-v-4831c6fe] .help.tagAreaClass,[data-v-4831c6fe] .help.deleteAreaClass,[data-v-4831c6fe] .help.deleteContentClass {\n    color: #00d1b2;\n}\n.help.is-link[data-v-4831c6fe] {\n    color: #3273dc;\n}\n.help.is-info[data-v-4831c6fe] {\n    color: #209cee;\n}\n.help.is-success[data-v-4831c6fe] {\n    color: #23d160;\n}\n.help.is-warning[data-v-4831c6fe] {\n    color: #ffdd57;\n}\n.help.is-danger[data-v-4831c6fe] {\n    color: #ff3860;\n}\n.field[data-v-4831c6fe]:not(:last-child) {\n  margin-bottom: 0.75rem;\n}\n.field.has-addons[data-v-4831c6fe] {\n  display: flex;\n  justify-content: flex-start;\n}\n.field.has-addons .control[data-v-4831c6fe]:not(:last-child) {\n    margin-right: -1px;\n}\n.field.has-addons .control:not(:first-child):not(:last-child) .button[data-v-4831c6fe],\n  .field.has-addons .control:not(:first-child):not(:last-child) .input[data-v-4831c6fe],\n  .field.has-addons .control:not(:first-child):not(:last-child) .select select[data-v-4831c6fe] {\n    border-radius: 0;\n}\n.field.has-addons .control:first-child .button[data-v-4831c6fe],\n  .field.has-addons .control:first-child .input[data-v-4831c6fe],\n  .field.has-addons .control:first-child .select select[data-v-4831c6fe] {\n    border-bottom-right-radius: 0;\n    border-top-right-radius: 0;\n}\n.field.has-addons .control:last-child .button[data-v-4831c6fe],\n  .field.has-addons .control:last-child .input[data-v-4831c6fe],\n  .field.has-addons .control:last-child .select select[data-v-4831c6fe] {\n    border-bottom-left-radius: 0;\n    border-top-left-radius: 0;\n}\n.field.has-addons .control .button[data-v-4831c6fe]:not([disabled]):hover, .field.has-addons .control .button:not([disabled]).is-hovered[data-v-4831c6fe],\n  .field.has-addons .control .input[data-v-4831c6fe]:not([disabled]):hover,\n  .field.has-addons .control .input:not([disabled]).is-hovered[data-v-4831c6fe],\n  .field.has-addons .control .select select[data-v-4831c6fe]:not([disabled]):hover,\n  .field.has-addons .control .select select:not([disabled]).is-hovered[data-v-4831c6fe] {\n    z-index: 2;\n}\n.field.has-addons .control .button[data-v-4831c6fe]:not([disabled]):focus, .field.has-addons .control .button:not([disabled]).is-focused[data-v-4831c6fe], .field.has-addons .control .button[data-v-4831c6fe]:not([disabled]):active, .field.has-addons .control .button:not([disabled]).is-active[data-v-4831c6fe],\n  .field.has-addons .control .input[data-v-4831c6fe]:not([disabled]):focus,\n  .field.has-addons .control .input:not([disabled]).is-focused[data-v-4831c6fe],\n  .field.has-addons .control .input[data-v-4831c6fe]:not([disabled]):active,\n  .field.has-addons .control .input:not([disabled]).is-active[data-v-4831c6fe],\n  .field.has-addons .control .select select[data-v-4831c6fe]:not([disabled]):focus,\n  .field.has-addons .control .select select:not([disabled]).is-focused[data-v-4831c6fe],\n  .field.has-addons .control .select select[data-v-4831c6fe]:not([disabled]):active,\n  .field.has-addons .control .select select:not([disabled]).is-active[data-v-4831c6fe] {\n    z-index: 3;\n}\n.field.has-addons .control .button[data-v-4831c6fe]:not([disabled]):focus:hover, .field.has-addons .control .button:not([disabled]).is-focused[data-v-4831c6fe]:hover, .field.has-addons .control .button[data-v-4831c6fe]:not([disabled]):active:hover, .field.has-addons .control .button:not([disabled]).is-active[data-v-4831c6fe]:hover,\n    .field.has-addons .control .input[data-v-4831c6fe]:not([disabled]):focus:hover,\n    .field.has-addons .control .input:not([disabled]).is-focused[data-v-4831c6fe]:hover,\n    .field.has-addons .control .input[data-v-4831c6fe]:not([disabled]):active:hover,\n    .field.has-addons .control .input:not([disabled]).is-active[data-v-4831c6fe]:hover,\n    .field.has-addons .control .select select[data-v-4831c6fe]:not([disabled]):focus:hover,\n    .field.has-addons .control .select select:not([disabled]).is-focused[data-v-4831c6fe]:hover,\n    .field.has-addons .control .select select[data-v-4831c6fe]:not([disabled]):active:hover,\n    .field.has-addons .control .select select:not([disabled]).is-active[data-v-4831c6fe]:hover {\n      z-index: 4;\n}\n.field.has-addons .control.is-expanded[data-v-4831c6fe] {\n    flex-grow: 1;\n}\n.field.has-addons.has-addons-centered[data-v-4831c6fe] {\n    justify-content: center;\n}\n.field.has-addons.has-addons-right[data-v-4831c6fe] {\n    justify-content: flex-end;\n}\n.field.has-addons.has-addons-fullwidth .control[data-v-4831c6fe] {\n    flex-grow: 1;\n    flex-shrink: 0;\n}\n.field.is-grouped[data-v-4831c6fe] {\n  display: flex;\n  justify-content: flex-start;\n}\n.field.is-grouped > .control[data-v-4831c6fe] {\n    flex-shrink: 0;\n}\n.field.is-grouped > .control[data-v-4831c6fe]:not(:last-child) {\n      margin-bottom: 0;\n      margin-right: 0.75rem;\n}\n.field.is-grouped > .control.is-expanded[data-v-4831c6fe] {\n      flex-grow: 1;\n      flex-shrink: 1;\n}\n.field.is-grouped.is-grouped-centered[data-v-4831c6fe] {\n    justify-content: center;\n}\n.field.is-grouped.is-grouped-right[data-v-4831c6fe] {\n    justify-content: flex-end;\n}\n.field.is-grouped.is-grouped-multiline[data-v-4831c6fe] {\n    flex-wrap: wrap;\n}\n.field.is-grouped.is-grouped-multiline > .control[data-v-4831c6fe]:last-child, .field.is-grouped.is-grouped-multiline > .control[data-v-4831c6fe]:not(:last-child) {\n      margin-bottom: 0.75rem;\n}\n.field.is-grouped.is-grouped-multiline[data-v-4831c6fe]:last-child {\n      margin-bottom: -0.75rem;\n}\n.field.is-grouped.is-grouped-multiline[data-v-4831c6fe]:not(:last-child) {\n      margin-bottom: 0;\n}\n@media screen and (min-width: 769px), print {\n.field.is-horizontal[data-v-4831c6fe] {\n    display: flex;\n}\n}\n.field-label .label[data-v-4831c6fe] {\n  font-size: inherit;\n}\n@media screen and (max-width: 768px) {\n.field-label[data-v-4831c6fe] {\n    margin-bottom: 0.5rem;\n}\n}\n@media screen and (min-width: 769px), print {\n.field-label[data-v-4831c6fe] {\n    flex-basis: 0;\n    flex-grow: 1;\n    flex-shrink: 0;\n    margin-right: 1.5rem;\n    text-align: right;\n}\n.field-label.is-small[data-v-4831c6fe] {\n      font-size: 0.75rem;\n      padding-top: 0.375em;\n}\n.field-label.is-normal[data-v-4831c6fe] {\n      padding-top: 0.375em;\n}\n.field-label.is-medium[data-v-4831c6fe] {\n      font-size: 1.25rem;\n      padding-top: 0.375em;\n}\n.field-label.is-large[data-v-4831c6fe] {\n      font-size: 1.5rem;\n      padding-top: 0.375em;\n}\n}\n.field-body .field .field[data-v-4831c6fe] {\n  margin-bottom: 0;\n}\n@media screen and (min-width: 769px), print {\n.field-body[data-v-4831c6fe] {\n    display: flex;\n    flex-basis: 0;\n    flex-grow: 5;\n    flex-shrink: 1;\n}\n.field-body .field[data-v-4831c6fe] {\n      margin-bottom: 0;\n}\n.field-body > .field[data-v-4831c6fe] {\n      flex-shrink: 1;\n}\n.field-body > .field[data-v-4831c6fe]:not(.is-narrow) {\n        flex-grow: 1;\n}\n.field-body > .field[data-v-4831c6fe]:not(:last-child) {\n        margin-right: 0.75rem;\n}\n}\n.control[data-v-4831c6fe] {\n  clear: both;\n  font-size: 1rem;\n  position: relative;\n  text-align: left;\n}\n.control.has-icon .icon[data-v-4831c6fe] {\n    color: #dbdbdb;\n    height: 2.25em;\n    pointer-events: none;\n    position: absolute;\n    top: 0;\n    width: 2.25em;\n    z-index: 4;\n}\n.control.has-icon .input:focus + .icon[data-v-4831c6fe] {\n    color: #7a7a7a;\n}\n.control.has-icon .input.is-small + .icon[data-v-4831c6fe] {\n    font-size: 0.75rem;\n}\n.control.has-icon .input.is-medium + .icon[data-v-4831c6fe] {\n    font-size: 1.25rem;\n}\n.control.has-icon .input.is-large + .icon[data-v-4831c6fe] {\n    font-size: 1.5rem;\n}\n.control.has-icon:not(.has-icon-right) .icon[data-v-4831c6fe] {\n    left: 0;\n}\n.control.has-icon:not(.has-icon-right) .input[data-v-4831c6fe] {\n    padding-left: 2.25em;\n}\n.control.has-icon.has-icon-right .icon[data-v-4831c6fe] {\n    right: 0;\n}\n.control.has-icon.has-icon-right .input[data-v-4831c6fe] {\n    padding-right: 2.25em;\n}\n.control.has-icons-left .input:focus ~ .icon[data-v-4831c6fe],\n  .control.has-icons-left .select:focus ~ .icon[data-v-4831c6fe], .control.has-icons-right .input:focus ~ .icon[data-v-4831c6fe],\n  .control.has-icons-right .select:focus ~ .icon[data-v-4831c6fe] {\n    color: #7a7a7a;\n}\n.control.has-icons-left .input.is-small ~ .icon[data-v-4831c6fe],\n  .control.has-icons-left .select.is-small ~ .icon[data-v-4831c6fe], .control.has-icons-right .input.is-small ~ .icon[data-v-4831c6fe],\n  .control.has-icons-right .select.is-small ~ .icon[data-v-4831c6fe] {\n    font-size: 0.75rem;\n}\n.control.has-icons-left .input.is-medium ~ .icon[data-v-4831c6fe],\n  .control.has-icons-left .select.is-medium ~ .icon[data-v-4831c6fe], .control.has-icons-right .input.is-medium ~ .icon[data-v-4831c6fe],\n  .control.has-icons-right .select.is-medium ~ .icon[data-v-4831c6fe] {\n    font-size: 1.25rem;\n}\n.control.has-icons-left .input.is-large ~ .icon[data-v-4831c6fe],\n  .control.has-icons-left .select.is-large ~ .icon[data-v-4831c6fe], .control.has-icons-right .input.is-large ~ .icon[data-v-4831c6fe],\n  .control.has-icons-right .select.is-large ~ .icon[data-v-4831c6fe] {\n    font-size: 1.5rem;\n}\n.control.has-icons-left .icon[data-v-4831c6fe], .control.has-icons-right .icon[data-v-4831c6fe] {\n    color: #dbdbdb;\n    height: 2.25em;\n    pointer-events: none;\n    position: absolute;\n    top: 0;\n    width: 2.25em;\n    z-index: 4;\n}\n.control.has-icons-left .input[data-v-4831c6fe],\n  .control.has-icons-left .select select[data-v-4831c6fe] {\n    padding-left: 2.25em;\n}\n.control.has-icons-left .icon.is-left[data-v-4831c6fe] {\n    left: 0;\n}\n.control.has-icons-right .input[data-v-4831c6fe],\n  .control.has-icons-right .select select[data-v-4831c6fe] {\n    padding-right: 2.25em;\n}\n.control.has-icons-right .icon.is-right[data-v-4831c6fe] {\n    right: 0;\n}\n.control.is-loading[data-v-4831c6fe]::after {\n    position: absolute !important;\n    right: 0.625em;\n    top: 0.625em;\n    z-index: 4;\n}\n.control.is-loading.is-small[data-v-4831c6fe]:after {\n    font-size: 0.75rem;\n}\n.control.is-loading.is-medium[data-v-4831c6fe]:after {\n    font-size: 1.25rem;\n}\n.control.is-loading.is-large[data-v-4831c6fe]:after {\n    font-size: 1.5rem;\n}\n.icon[data-v-4831c6fe] {\n  align-items: center;\n  display: inline-flex;\n  justify-content: center;\n  height: 1.5rem;\n  width: 1.5rem;\n}\n.icon.is-small[data-v-4831c6fe] {\n    height: 1rem;\n    width: 1rem;\n}\n.icon.is-medium[data-v-4831c6fe] {\n    height: 2rem;\n    width: 2rem;\n}\n.icon.is-large[data-v-4831c6fe] {\n    height: 3rem;\n    width: 3rem;\n}\n.image[data-v-4831c6fe] {\n  display: block;\n  position: relative;\n}\n.image img[data-v-4831c6fe] {\n    display: block;\n    height: auto;\n    width: 100%;\n}\n.image img.is-rounded[data-v-4831c6fe] {\n      border-radius: 290486px;\n}\n.image.is-square img[data-v-4831c6fe], .image.is-1by1 img[data-v-4831c6fe], .image.is-5by4 img[data-v-4831c6fe], .image.is-4by3 img[data-v-4831c6fe], .image.is-3by2 img[data-v-4831c6fe], .image.is-5by3 img[data-v-4831c6fe], .image.is-16by9 img[data-v-4831c6fe], .image.is-2by1 img[data-v-4831c6fe], .image.is-3by1 img[data-v-4831c6fe], .image.is-4by5 img[data-v-4831c6fe], .image.is-3by4 img[data-v-4831c6fe], .image.is-2by3 img[data-v-4831c6fe], .image.is-3by5 img[data-v-4831c6fe], .image.is-9by16 img[data-v-4831c6fe], .image.is-1by2 img[data-v-4831c6fe], .image.is-1by3 img[data-v-4831c6fe] {\n    height: 100%;\n    width: 100%;\n}\n.image.is-square[data-v-4831c6fe], .image.is-1by1[data-v-4831c6fe] {\n    padding-top: 100%;\n}\n.image.is-5by4[data-v-4831c6fe] {\n    padding-top: 80%;\n}\n.image.is-4by3[data-v-4831c6fe] {\n    padding-top: 75%;\n}\n.image.is-3by2[data-v-4831c6fe] {\n    padding-top: 66.6666%;\n}\n.image.is-5by3[data-v-4831c6fe] {\n    padding-top: 60%;\n}\n.image.is-16by9[data-v-4831c6fe] {\n    padding-top: 56.25%;\n}\n.image.is-2by1[data-v-4831c6fe] {\n    padding-top: 50%;\n}\n.image.is-3by1[data-v-4831c6fe] {\n    padding-top: 33.3333%;\n}\n.image.is-4by5[data-v-4831c6fe] {\n    padding-top: 125%;\n}\n.image.is-3by4[data-v-4831c6fe] {\n    padding-top: 133.3333%;\n}\n.image.is-2by3[data-v-4831c6fe] {\n    padding-top: 150%;\n}\n.image.is-3by5[data-v-4831c6fe] {\n    padding-top: 166.6666%;\n}\n.image.is-9by16[data-v-4831c6fe] {\n    padding-top: 177.7777%;\n}\n.image.is-1by2[data-v-4831c6fe] {\n    padding-top: 200%;\n}\n.image.is-1by3[data-v-4831c6fe] {\n    padding-top: 300%;\n}\n.image.is-16x16[data-v-4831c6fe] {\n    height: 16px;\n    width: 16px;\n}\n.image.is-24x24[data-v-4831c6fe] {\n    height: 24px;\n    width: 24px;\n}\n.image.is-32x32[data-v-4831c6fe] {\n    height: 32px;\n    width: 32px;\n}\n.image.is-48x48[data-v-4831c6fe] {\n    height: 48px;\n    width: 48px;\n}\n.image.is-64x64[data-v-4831c6fe] {\n    height: 64px;\n    width: 64px;\n}\n.image.is-96x96[data-v-4831c6fe] {\n    height: 96px;\n    width: 96px;\n}\n.image.is-128x128[data-v-4831c6fe] {\n    height: 128px;\n    width: 128px;\n}\n.notification[data-v-4831c6fe] {\n  background-color: whitesmoke;\n  border-radius: 4px;\n  padding: 1.25rem 2.5rem 1.25rem 1.5rem;\n  position: relative;\n}\n.notification a[data-v-4831c6fe]:not(.button):not(.dropdown-item) {\n    color: currentColor;\n    text-decoration: underline;\n}\n.notification strong[data-v-4831c6fe] {\n    color: currentColor;\n}\n.notification code[data-v-4831c6fe],\n  .notification pre[data-v-4831c6fe] {\n    background: white;\n}\n.notification pre code[data-v-4831c6fe] {\n    background: transparent;\n}\n.notification > .delete[data-v-4831c6fe] {\n    position: absolute;\n    right: 0.5rem;\n    top: 0.5rem;\n}\n.notification .title[data-v-4831c6fe],\n  .notification .subtitle[data-v-4831c6fe],\n  .notification .content[data-v-4831c6fe] {\n    color: currentColor;\n}\n.notification.is-white[data-v-4831c6fe] {\n    background-color: white;\n    color: #0a0a0a;\n}\n.notification.is-black[data-v-4831c6fe] {\n    background-color: #0a0a0a;\n    color: white;\n}\n.notification.is-light[data-v-4831c6fe] {\n    background-color: whitesmoke;\n    color: #363636;\n}\n.notification.is-dark[data-v-4831c6fe] {\n    background-color: #363636;\n    color: whitesmoke;\n}\n.notification.is-primary[data-v-4831c6fe],[data-v-4831c6fe] .notification.tagAreaClass,[data-v-4831c6fe] .notification.deleteAreaClass,[data-v-4831c6fe] .notification.deleteContentClass {\n    background-color: #00d1b2;\n    color: #fff;\n}\n.notification.is-link[data-v-4831c6fe] {\n    background-color: #3273dc;\n    color: #fff;\n}\n.notification.is-info[data-v-4831c6fe] {\n    background-color: #209cee;\n    color: #fff;\n}\n.notification.is-success[data-v-4831c6fe] {\n    background-color: #23d160;\n    color: #fff;\n}\n.notification.is-warning[data-v-4831c6fe] {\n    background-color: #ffdd57;\n    color: rgba(0, 0, 0, 0.7);\n}\n.notification.is-danger[data-v-4831c6fe] {\n    background-color: #ff3860;\n    color: #fff;\n}\n.progress[data-v-4831c6fe] {\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  border: none;\n  border-radius: 290486px;\n  display: block;\n  height: 1rem;\n  overflow: hidden;\n  padding: 0;\n  width: 100%;\n}\n.progress[data-v-4831c6fe]::-webkit-progress-bar {\n    background-color: #dbdbdb;\n}\n.progress[data-v-4831c6fe]::-webkit-progress-value {\n    background-color: #4a4a4a;\n}\n.progress[data-v-4831c6fe]::-moz-progress-bar {\n    background-color: #4a4a4a;\n}\n.progress[data-v-4831c6fe]::-ms-fill {\n    background-color: #4a4a4a;\n    border: none;\n}\n.progress.is-white[data-v-4831c6fe]::-webkit-progress-value {\n    background-color: white;\n}\n.progress.is-white[data-v-4831c6fe]::-moz-progress-bar {\n    background-color: white;\n}\n.progress.is-white[data-v-4831c6fe]::-ms-fill {\n    background-color: white;\n}\n.progress.is-black[data-v-4831c6fe]::-webkit-progress-value {\n    background-color: #0a0a0a;\n}\n.progress.is-black[data-v-4831c6fe]::-moz-progress-bar {\n    background-color: #0a0a0a;\n}\n.progress.is-black[data-v-4831c6fe]::-ms-fill {\n    background-color: #0a0a0a;\n}\n.progress.is-light[data-v-4831c6fe]::-webkit-progress-value {\n    background-color: whitesmoke;\n}\n.progress.is-light[data-v-4831c6fe]::-moz-progress-bar {\n    background-color: whitesmoke;\n}\n.progress.is-light[data-v-4831c6fe]::-ms-fill {\n    background-color: whitesmoke;\n}\n.progress.is-dark[data-v-4831c6fe]::-webkit-progress-value {\n    background-color: #363636;\n}\n.progress.is-dark[data-v-4831c6fe]::-moz-progress-bar {\n    background-color: #363636;\n}\n.progress.is-dark[data-v-4831c6fe]::-ms-fill {\n    background-color: #363636;\n}\n.progress.is-primary[data-v-4831c6fe]::-webkit-progress-value,[data-v-4831c6fe] .progress.tagAreaClass::-webkit-progress-value,[data-v-4831c6fe] .progress.deleteAreaClass::-webkit-progress-value,[data-v-4831c6fe] .progress.deleteContentClass::-webkit-progress-value {\n    background-color: #00d1b2;\n}\n.progress.is-primary[data-v-4831c6fe]::-moz-progress-bar,[data-v-4831c6fe] .progress.tagAreaClass::-moz-progress-bar,[data-v-4831c6fe] .progress.deleteAreaClass::-moz-progress-bar,[data-v-4831c6fe] .progress.deleteContentClass::-moz-progress-bar {\n    background-color: #00d1b2;\n}\n.progress.is-primary[data-v-4831c6fe]::-ms-fill,[data-v-4831c6fe] .progress.tagAreaClass::-ms-fill,[data-v-4831c6fe] .progress.deleteAreaClass::-ms-fill,[data-v-4831c6fe] .progress.deleteContentClass::-ms-fill {\n    background-color: #00d1b2;\n}\n.progress.is-link[data-v-4831c6fe]::-webkit-progress-value {\n    background-color: #3273dc;\n}\n.progress.is-link[data-v-4831c6fe]::-moz-progress-bar {\n    background-color: #3273dc;\n}\n.progress.is-link[data-v-4831c6fe]::-ms-fill {\n    background-color: #3273dc;\n}\n.progress.is-info[data-v-4831c6fe]::-webkit-progress-value {\n    background-color: #209cee;\n}\n.progress.is-info[data-v-4831c6fe]::-moz-progress-bar {\n    background-color: #209cee;\n}\n.progress.is-info[data-v-4831c6fe]::-ms-fill {\n    background-color: #209cee;\n}\n.progress.is-success[data-v-4831c6fe]::-webkit-progress-value {\n    background-color: #23d160;\n}\n.progress.is-success[data-v-4831c6fe]::-moz-progress-bar {\n    background-color: #23d160;\n}\n.progress.is-success[data-v-4831c6fe]::-ms-fill {\n    background-color: #23d160;\n}\n.progress.is-warning[data-v-4831c6fe]::-webkit-progress-value {\n    background-color: #ffdd57;\n}\n.progress.is-warning[data-v-4831c6fe]::-moz-progress-bar {\n    background-color: #ffdd57;\n}\n.progress.is-warning[data-v-4831c6fe]::-ms-fill {\n    background-color: #ffdd57;\n}\n.progress.is-danger[data-v-4831c6fe]::-webkit-progress-value {\n    background-color: #ff3860;\n}\n.progress.is-danger[data-v-4831c6fe]::-moz-progress-bar {\n    background-color: #ff3860;\n}\n.progress.is-danger[data-v-4831c6fe]::-ms-fill {\n    background-color: #ff3860;\n}\n.progress.is-small[data-v-4831c6fe] {\n    height: 0.75rem;\n}\n.progress.is-medium[data-v-4831c6fe] {\n    height: 1.25rem;\n}\n.progress.is-large[data-v-4831c6fe] {\n    height: 1.5rem;\n}\n.table[data-v-4831c6fe] {\n  background-color: white;\n  color: #363636;\n}\n.table td[data-v-4831c6fe],\n  .table th[data-v-4831c6fe] {\n    border: 1px solid #dbdbdb;\n    border-width: 0 0 1px;\n    padding: 0.5em 0.75em;\n    vertical-align: top;\n}\n.table td.is-white[data-v-4831c6fe],\n    .table th.is-white[data-v-4831c6fe] {\n      background-color: white;\n      border-color: white;\n      color: #0a0a0a;\n}\n.table td.is-black[data-v-4831c6fe],\n    .table th.is-black[data-v-4831c6fe] {\n      background-color: #0a0a0a;\n      border-color: #0a0a0a;\n      color: white;\n}\n.table td.is-light[data-v-4831c6fe],\n    .table th.is-light[data-v-4831c6fe] {\n      background-color: whitesmoke;\n      border-color: whitesmoke;\n      color: #363636;\n}\n.table td.is-dark[data-v-4831c6fe],\n    .table th.is-dark[data-v-4831c6fe] {\n      background-color: #363636;\n      border-color: #363636;\n      color: whitesmoke;\n}\n.table td.is-primary[data-v-4831c6fe], .table[data-v-4831c6fe] td.tagAreaClass,[data-v-4831c6fe] .table td.tagAreaClass, .table[data-v-4831c6fe] td.deleteAreaClass,[data-v-4831c6fe] .table td.deleteAreaClass, .table[data-v-4831c6fe] td.deleteContentClass,[data-v-4831c6fe] .table td.deleteContentClass,\n    .table th.is-primary[data-v-4831c6fe],\n    .table[data-v-4831c6fe] th.tagAreaClass,[data-v-4831c6fe] .table th.tagAreaClass,\n    .table[data-v-4831c6fe] th.deleteAreaClass,[data-v-4831c6fe] .table th.deleteAreaClass,\n    .table[data-v-4831c6fe] th.deleteContentClass,[data-v-4831c6fe] .table th.deleteContentClass {\n      background-color: #00d1b2;\n      border-color: #00d1b2;\n      color: #fff;\n}\n.table td.is-link[data-v-4831c6fe],\n    .table th.is-link[data-v-4831c6fe] {\n      background-color: #3273dc;\n      border-color: #3273dc;\n      color: #fff;\n}\n.table td.is-info[data-v-4831c6fe],\n    .table th.is-info[data-v-4831c6fe] {\n      background-color: #209cee;\n      border-color: #209cee;\n      color: #fff;\n}\n.table td.is-success[data-v-4831c6fe],\n    .table th.is-success[data-v-4831c6fe] {\n      background-color: #23d160;\n      border-color: #23d160;\n      color: #fff;\n}\n.table td.is-warning[data-v-4831c6fe],\n    .table th.is-warning[data-v-4831c6fe] {\n      background-color: #ffdd57;\n      border-color: #ffdd57;\n      color: rgba(0, 0, 0, 0.7);\n}\n.table td.is-danger[data-v-4831c6fe],\n    .table th.is-danger[data-v-4831c6fe] {\n      background-color: #ff3860;\n      border-color: #ff3860;\n      color: #fff;\n}\n.table td.is-narrow[data-v-4831c6fe],\n    .table th.is-narrow[data-v-4831c6fe] {\n      white-space: nowrap;\n      width: 1%;\n}\n.table td.is-selected[data-v-4831c6fe],\n    .table th.is-selected[data-v-4831c6fe] {\n      background-color: #00d1b2;\n      color: #fff;\n}\n.table td.is-selected a[data-v-4831c6fe],\n      .table td.is-selected strong[data-v-4831c6fe],\n      .table th.is-selected a[data-v-4831c6fe],\n      .table th.is-selected strong[data-v-4831c6fe] {\n        color: currentColor;\n}\n.table th[data-v-4831c6fe] {\n    color: #363636;\n    text-align: left;\n}\n.table tr.is-selected[data-v-4831c6fe] {\n    background-color: #00d1b2;\n    color: #fff;\n}\n.table tr.is-selected a[data-v-4831c6fe],\n    .table tr.is-selected strong[data-v-4831c6fe] {\n      color: currentColor;\n}\n.table tr.is-selected td[data-v-4831c6fe],\n    .table tr.is-selected th[data-v-4831c6fe] {\n      border-color: #fff;\n      color: currentColor;\n}\n.table thead td[data-v-4831c6fe],\n  .table thead th[data-v-4831c6fe] {\n    border-width: 0 0 2px;\n    color: #363636;\n}\n.table tfoot td[data-v-4831c6fe],\n  .table tfoot th[data-v-4831c6fe] {\n    border-width: 2px 0 0;\n    color: #363636;\n}\n.table tbody tr:last-child td[data-v-4831c6fe],\n  .table tbody tr:last-child th[data-v-4831c6fe] {\n    border-bottom-width: 0;\n}\n.table.is-bordered td[data-v-4831c6fe],\n  .table.is-bordered th[data-v-4831c6fe] {\n    border-width: 1px;\n}\n.table.is-bordered tr:last-child td[data-v-4831c6fe],\n  .table.is-bordered tr:last-child th[data-v-4831c6fe] {\n    border-bottom-width: 1px;\n}\n.table.is-fullwidth[data-v-4831c6fe] {\n    width: 100%;\n}\n.table.is-hoverable tbody tr[data-v-4831c6fe]:not(.is-selected):hover {\n    background-color: #fafafa;\n}\n.table.is-hoverable.is-striped tbody tr[data-v-4831c6fe]:not(.is-selected):hover {\n    background-color: #fafafa;\n}\n.table.is-hoverable.is-striped tbody tr[data-v-4831c6fe]:not(.is-selected):hover:nth-child(even) {\n      background-color: whitesmoke;\n}\n.table.is-narrow td[data-v-4831c6fe],\n  .table.is-narrow th[data-v-4831c6fe] {\n    padding: 0.25em 0.5em;\n}\n.table.is-striped tbody tr[data-v-4831c6fe]:not(.is-selected):nth-child(even) {\n    background-color: #fafafa;\n}\n.table-container[data-v-4831c6fe] {\n  -webkit-overflow-scrolling: touch;\n  overflow: auto;\n  overflow-y: hidden;\n  max-width: 100%;\n}\n.tags[data-v-4831c6fe] {\n  align-items: center;\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-start;\n}\n.tags .tag[data-v-4831c6fe] {\n    margin-bottom: 0.5rem;\n}\n.tags .tag[data-v-4831c6fe]:not(:last-child) {\n      margin-right: 0.5rem;\n}\n.tags[data-v-4831c6fe]:last-child {\n    margin-bottom: -0.5rem;\n}\n.tags[data-v-4831c6fe]:not(:last-child) {\n    margin-bottom: 1rem;\n}\n.tags.has-addons .tag[data-v-4831c6fe] {\n    margin-right: 0;\n}\n.tags.has-addons .tag[data-v-4831c6fe]:not(:first-child) {\n      border-bottom-left-radius: 0;\n      border-top-left-radius: 0;\n}\n.tags.has-addons .tag[data-v-4831c6fe]:not(:last-child) {\n      border-bottom-right-radius: 0;\n      border-top-right-radius: 0;\n}\n.tags.is-centered[data-v-4831c6fe] {\n    justify-content: center;\n}\n.tags.is-centered .tag[data-v-4831c6fe] {\n      margin-right: 0.25rem;\n      margin-left: 0.25rem;\n}\n.tags.is-right[data-v-4831c6fe] {\n    justify-content: flex-end;\n}\n.tags.is-right .tag[data-v-4831c6fe]:not(:first-child) {\n      margin-left: 0.5rem;\n}\n.tags.is-right .tag[data-v-4831c6fe]:not(:last-child) {\n      margin-right: 0;\n}\n.tag[data-v-4831c6fe]:not(body),[data-v-4831c6fe] .tagAreaClass {\n  align-items: center;\n  background-color: whitesmoke;\n  border-radius: 4px;\n  color: #4a4a4a;\n  display: inline-flex;\n  font-size: 0.75rem;\n  height: 2em;\n  justify-content: center;\n  line-height: 1.5;\n  padding-left: 0.75em;\n  padding-right: 0.75em;\n  white-space: nowrap;\n}\n.tag:not(body) .delete[data-v-4831c6fe],[data-v-4831c6fe] .tagAreaClass .delete {\n    margin-left: 0.25rem;\n    margin-right: -0.375rem;\n}\n.tag:not(body).is-white[data-v-4831c6fe],[data-v-4831c6fe] .is-white.tagAreaClass {\n    background-color: white;\n    color: #0a0a0a;\n}\n.tag:not(body).is-black[data-v-4831c6fe],[data-v-4831c6fe] .is-black.tagAreaClass {\n    background-color: #0a0a0a;\n    color: white;\n}\n.tag:not(body).is-light[data-v-4831c6fe],[data-v-4831c6fe] .is-light.tagAreaClass {\n    background-color: whitesmoke;\n    color: #363636;\n}\n.tag:not(body).is-dark[data-v-4831c6fe],[data-v-4831c6fe] .is-dark.tagAreaClass {\n    background-color: #363636;\n    color: whitesmoke;\n}\n.tag:not(body).is-primary[data-v-4831c6fe],[data-v-4831c6fe] .tagAreaClass,[data-v-4831c6fe] .tag.deleteAreaClass:not(body),[data-v-4831c6fe] .tag.deleteContentClass:not(body) {\n    background-color: #00d1b2;\n    color: #fff;\n}\n.tag:not(body).is-link[data-v-4831c6fe],[data-v-4831c6fe] .is-link.tagAreaClass {\n    background-color: #3273dc;\n    color: #fff;\n}\n.tag:not(body).is-info[data-v-4831c6fe],[data-v-4831c6fe] .is-info.tagAreaClass {\n    background-color: #209cee;\n    color: #fff;\n}\n.tag:not(body).is-success[data-v-4831c6fe],[data-v-4831c6fe] .is-success.tagAreaClass {\n    background-color: #23d160;\n    color: #fff;\n}\n.tag:not(body).is-warning[data-v-4831c6fe],[data-v-4831c6fe] .is-warning.tagAreaClass {\n    background-color: #ffdd57;\n    color: rgba(0, 0, 0, 0.7);\n}\n.tag:not(body).is-danger[data-v-4831c6fe],[data-v-4831c6fe] .is-danger.tagAreaClass {\n    background-color: #ff3860;\n    color: #fff;\n}\n.tag:not(body).is-medium[data-v-4831c6fe],[data-v-4831c6fe] .is-medium.tagAreaClass {\n    font-size: 1rem;\n}\n.tag:not(body).is-large[data-v-4831c6fe],[data-v-4831c6fe] .is-large.tagAreaClass {\n    font-size: 1.25rem;\n}\n.tag:not(body) .icon[data-v-4831c6fe]:first-child:not(:last-child),[data-v-4831c6fe] .tagAreaClass .icon:first-child:not(:last-child) {\n    margin-left: -0.375em;\n    margin-right: 0.1875em;\n}\n.tag:not(body) .icon[data-v-4831c6fe]:last-child:not(:first-child),[data-v-4831c6fe] .tagAreaClass .icon:last-child:not(:first-child) {\n    margin-left: 0.1875em;\n    margin-right: -0.375em;\n}\n.tag:not(body) .icon[data-v-4831c6fe]:first-child:last-child,[data-v-4831c6fe] .tagAreaClass .icon:first-child:last-child {\n    margin-left: -0.375em;\n    margin-right: -0.375em;\n}\n.tag:not(body).is-delete[data-v-4831c6fe],[data-v-4831c6fe] .is-delete.tagAreaClass {\n    margin-left: 1px;\n    padding: 0;\n    position: relative;\n    width: 2em;\n}\n.tag:not(body).is-delete[data-v-4831c6fe]::before,[data-v-4831c6fe] .is-delete.tagAreaClass::before, .tag:not(body).is-delete[data-v-4831c6fe]::after,[data-v-4831c6fe] .is-delete.tagAreaClass::after {\n      background-color: currentColor;\n      content: \"\";\n      display: block;\n      left: 50%;\n      position: absolute;\n      top: 50%;\n      transform: translateX(-50%) translateY(-50%) rotate(45deg);\n      transform-origin: center center;\n}\n.tag:not(body).is-delete[data-v-4831c6fe]::before,[data-v-4831c6fe] .is-delete.tagAreaClass::before {\n      height: 1px;\n      width: 50%;\n}\n.tag:not(body).is-delete[data-v-4831c6fe]::after,[data-v-4831c6fe] .is-delete.tagAreaClass::after {\n      height: 50%;\n      width: 1px;\n}\n.tag:not(body).is-delete[data-v-4831c6fe]:hover,[data-v-4831c6fe] .is-delete.tagAreaClass:hover, .tag:not(body).is-delete[data-v-4831c6fe]:focus,[data-v-4831c6fe] .is-delete.tagAreaClass:focus {\n      background-color: #e8e8e8;\n}\n.tag:not(body).is-delete[data-v-4831c6fe]:active,[data-v-4831c6fe] .is-delete.tagAreaClass:active {\n      background-color: #dbdbdb;\n}\n.tag:not(body).is-rounded[data-v-4831c6fe],[data-v-4831c6fe] .is-rounded.tagAreaClass {\n    border-radius: 290486px;\n}\na.tag[data-v-4831c6fe]:hover {\n  text-decoration: underline;\n}\n.title[data-v-4831c6fe],\n.subtitle[data-v-4831c6fe] {\n  word-break: break-word;\n}\n.title em[data-v-4831c6fe],\n  .title span[data-v-4831c6fe],\n  .subtitle em[data-v-4831c6fe],\n  .subtitle span[data-v-4831c6fe] {\n    font-weight: inherit;\n}\n.title sub[data-v-4831c6fe],\n  .subtitle sub[data-v-4831c6fe] {\n    font-size: 0.75em;\n}\n.title sup[data-v-4831c6fe],\n  .subtitle sup[data-v-4831c6fe] {\n    font-size: 0.75em;\n}\n.title .tag[data-v-4831c6fe],\n  .subtitle .tag[data-v-4831c6fe] {\n    vertical-align: middle;\n}\n.title[data-v-4831c6fe] {\n  color: #363636;\n  font-size: 2rem;\n  font-weight: 600;\n  line-height: 1.125;\n}\n.title strong[data-v-4831c6fe] {\n    color: inherit;\n    font-weight: inherit;\n}\n.title + .highlight[data-v-4831c6fe] {\n    margin-top: -0.75rem;\n}\n.title:not(.is-spaced) + .subtitle[data-v-4831c6fe] {\n    margin-top: -1.25rem;\n}\n.title.is-1[data-v-4831c6fe] {\n    font-size: 3rem;\n}\n.title.is-2[data-v-4831c6fe] {\n    font-size: 2.5rem;\n}\n.title.is-3[data-v-4831c6fe] {\n    font-size: 2rem;\n}\n.title.is-4[data-v-4831c6fe] {\n    font-size: 1.5rem;\n}\n.title.is-5[data-v-4831c6fe] {\n    font-size: 1.25rem;\n}\n.title.is-6[data-v-4831c6fe] {\n    font-size: 1rem;\n}\n.title.is-7[data-v-4831c6fe] {\n    font-size: 0.75rem;\n}\n.subtitle[data-v-4831c6fe] {\n  color: #4a4a4a;\n  font-size: 1.25rem;\n  font-weight: 400;\n  line-height: 1.25;\n}\n.subtitle strong[data-v-4831c6fe] {\n    color: #363636;\n    font-weight: 600;\n}\n.subtitle:not(.is-spaced) + .title[data-v-4831c6fe] {\n    margin-top: -1.25rem;\n}\n.subtitle.is-1[data-v-4831c6fe] {\n    font-size: 3rem;\n}\n.subtitle.is-2[data-v-4831c6fe] {\n    font-size: 2.5rem;\n}\n.subtitle.is-3[data-v-4831c6fe] {\n    font-size: 2rem;\n}\n.subtitle.is-4[data-v-4831c6fe] {\n    font-size: 1.5rem;\n}\n.subtitle.is-5[data-v-4831c6fe] {\n    font-size: 1.25rem;\n}\n.subtitle.is-6[data-v-4831c6fe] {\n    font-size: 1rem;\n}\n.subtitle.is-7[data-v-4831c6fe] {\n    font-size: 0.75rem;\n}\n.heading[data-v-4831c6fe] {\n  display: block;\n  font-size: 11px;\n  letter-spacing: 1px;\n  margin-bottom: 5px;\n  text-transform: uppercase;\n}\n.highlight[data-v-4831c6fe] {\n  font-weight: 400;\n  max-width: 100%;\n  overflow: hidden;\n  padding: 0;\n}\n.highlight pre[data-v-4831c6fe] {\n    overflow: auto;\n    max-width: 100%;\n}\n.number[data-v-4831c6fe] {\n  align-items: center;\n  background-color: whitesmoke;\n  border-radius: 290486px;\n  display: inline-flex;\n  font-size: 1.25rem;\n  height: 2em;\n  justify-content: center;\n  margin-right: 1.5rem;\n  min-width: 2.5em;\n  padding: 0.25rem 0.5rem;\n  text-align: center;\n  vertical-align: top;\n}\n.breadcrumb[data-v-4831c6fe] {\n  font-size: 1rem;\n  white-space: nowrap;\n}\n.breadcrumb a[data-v-4831c6fe] {\n    align-items: center;\n    color: #3273dc;\n    display: flex;\n    justify-content: center;\n    padding: 0 0.75em;\n}\n.breadcrumb a[data-v-4831c6fe]:hover {\n      color: #363636;\n}\n.breadcrumb li[data-v-4831c6fe] {\n    align-items: center;\n    display: flex;\n}\n.breadcrumb li:first-child a[data-v-4831c6fe] {\n      padding-left: 0;\n}\n.breadcrumb li.is-active a[data-v-4831c6fe] {\n      color: #363636;\n      cursor: default;\n      pointer-events: none;\n}\n.breadcrumb li + li[data-v-4831c6fe]::before {\n      color: #b5b5b5;\n      content: \"/\";\n}\n.breadcrumb ul[data-v-4831c6fe],\n  .breadcrumb ol[data-v-4831c6fe] {\n    align-items: flex-start;\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: flex-start;\n}\n.breadcrumb .icon[data-v-4831c6fe]:first-child {\n    margin-right: 0.5em;\n}\n.breadcrumb .icon[data-v-4831c6fe]:last-child {\n    margin-left: 0.5em;\n}\n.breadcrumb.is-centered ol[data-v-4831c6fe],\n  .breadcrumb.is-centered ul[data-v-4831c6fe] {\n    justify-content: center;\n}\n.breadcrumb.is-right ol[data-v-4831c6fe],\n  .breadcrumb.is-right ul[data-v-4831c6fe] {\n    justify-content: flex-end;\n}\n.breadcrumb.is-small[data-v-4831c6fe] {\n    font-size: 0.75rem;\n}\n.breadcrumb.is-medium[data-v-4831c6fe] {\n    font-size: 1.25rem;\n}\n.breadcrumb.is-large[data-v-4831c6fe] {\n    font-size: 1.5rem;\n}\n.breadcrumb.has-arrow-separator li + li[data-v-4831c6fe]::before {\n    content: \"\\2192\";\n}\n.breadcrumb.has-bullet-separator li + li[data-v-4831c6fe]::before {\n    content: \"\\2022\";\n}\n.breadcrumb.has-dot-separator li + li[data-v-4831c6fe]::before {\n    content: \"\\B7\";\n}\n.breadcrumb.has-succeeds-separator li + li[data-v-4831c6fe]::before {\n    content: \"\\227B\";\n}\n.card[data-v-4831c6fe] {\n  background-color: white;\n  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);\n  color: #4a4a4a;\n  max-width: 100%;\n  position: relative;\n}\n.card-header[data-v-4831c6fe] {\n  background-color: transparent;\n  align-items: stretch;\n  box-shadow: 0 1px 2px rgba(10, 10, 10, 0.1);\n  display: flex;\n}\n.card-header-title[data-v-4831c6fe] {\n  align-items: center;\n  color: #363636;\n  display: flex;\n  flex-grow: 1;\n  font-weight: 700;\n  padding: 0.75rem;\n}\n.card-header-title.is-centered[data-v-4831c6fe] {\n    justify-content: center;\n}\n.card-header-icon[data-v-4831c6fe] {\n  align-items: center;\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  padding: 0.75rem;\n}\n.card-image[data-v-4831c6fe] {\n  display: block;\n  position: relative;\n}\n.card-content[data-v-4831c6fe] {\n  background-color: transparent;\n  padding: 1.5rem;\n}\n.card-footer[data-v-4831c6fe] {\n  background-color: transparent;\n  border-top: 1px solid #dbdbdb;\n  align-items: stretch;\n  display: flex;\n}\n.card-footer-item[data-v-4831c6fe] {\n  align-items: center;\n  display: flex;\n  flex-basis: 0;\n  flex-grow: 1;\n  flex-shrink: 0;\n  justify-content: center;\n  padding: 0.75rem;\n}\n.card-footer-item[data-v-4831c6fe]:not(:last-child) {\n    border-right: 1px solid #dbdbdb;\n}\n.card .media[data-v-4831c6fe]:not(:last-child) {\n  margin-bottom: 0.75rem;\n}\n.dropdown[data-v-4831c6fe] {\n  display: inline-flex;\n  position: relative;\n  vertical-align: top;\n}\n.dropdown.is-active .dropdown-menu[data-v-4831c6fe], .dropdown.is-hoverable:hover .dropdown-menu[data-v-4831c6fe] {\n    display: block;\n}\n.dropdown.is-right .dropdown-menu[data-v-4831c6fe] {\n    left: auto;\n    right: 0;\n}\n.dropdown.is-up .dropdown-menu[data-v-4831c6fe] {\n    bottom: 100%;\n    padding-bottom: 4px;\n    padding-top: initial;\n    top: auto;\n}\n.dropdown-menu[data-v-4831c6fe] {\n  display: none;\n  left: 0;\n  min-width: 12rem;\n  padding-top: 4px;\n  position: absolute;\n  top: 100%;\n  z-index: 20;\n}\n.dropdown-content[data-v-4831c6fe] {\n  background-color: white;\n  border-radius: 4px;\n  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);\n  padding-bottom: 0.5rem;\n  padding-top: 0.5rem;\n}\n.dropdown-item[data-v-4831c6fe] {\n  color: #4a4a4a;\n  display: block;\n  font-size: 0.875rem;\n  line-height: 1.5;\n  padding: 0.375rem 1rem;\n  position: relative;\n}\na.dropdown-item[data-v-4831c6fe],\nbutton.dropdown-item[data-v-4831c6fe] {\n  padding-right: 3rem;\n  text-align: left;\n  white-space: nowrap;\n  width: 100%;\n}\na.dropdown-item[data-v-4831c6fe]:hover,\n  button.dropdown-item[data-v-4831c6fe]:hover {\n    background-color: whitesmoke;\n    color: #0a0a0a;\n}\na.dropdown-item.is-active[data-v-4831c6fe],\n  button.dropdown-item.is-active[data-v-4831c6fe] {\n    background-color: #3273dc;\n    color: #fff;\n}\n.dropdown-divider[data-v-4831c6fe] {\n  background-color: #dbdbdb;\n  border: none;\n  display: block;\n  height: 1px;\n  margin: 0.5rem 0;\n}\n.level[data-v-4831c6fe] {\n  align-items: center;\n  justify-content: space-between;\n}\n.level code[data-v-4831c6fe] {\n    border-radius: 4px;\n}\n.level img[data-v-4831c6fe] {\n    display: inline-block;\n    vertical-align: top;\n}\n.level.is-mobile[data-v-4831c6fe] {\n    display: flex;\n}\n.level.is-mobile .level-left[data-v-4831c6fe],\n    .level.is-mobile .level-right[data-v-4831c6fe] {\n      display: flex;\n}\n.level.is-mobile .level-left + .level-right[data-v-4831c6fe] {\n      margin-top: 0;\n}\n.level.is-mobile .level-item[data-v-4831c6fe]:not(:last-child) {\n      margin-bottom: 0;\n      margin-right: 0.75rem;\n}\n.level.is-mobile .level-item[data-v-4831c6fe]:not(.is-narrow) {\n      flex-grow: 1;\n}\n@media screen and (min-width: 769px), print {\n.level[data-v-4831c6fe] {\n      display: flex;\n}\n.level > .level-item[data-v-4831c6fe]:not(.is-narrow) {\n        flex-grow: 1;\n}\n}\n.level-item[data-v-4831c6fe] {\n  align-items: center;\n  display: flex;\n  flex-basis: auto;\n  flex-grow: 0;\n  flex-shrink: 0;\n  justify-content: center;\n}\n.level-item .title[data-v-4831c6fe],\n  .level-item .subtitle[data-v-4831c6fe] {\n    margin-bottom: 0;\n}\n@media screen and (max-width: 768px) {\n.level-item[data-v-4831c6fe]:not(:last-child) {\n      margin-bottom: 0.75rem;\n}\n}\n.level-left[data-v-4831c6fe],\n.level-right[data-v-4831c6fe] {\n  flex-basis: auto;\n  flex-grow: 0;\n  flex-shrink: 0;\n}\n.level-left .level-item.is-flexible[data-v-4831c6fe],\n  .level-right .level-item.is-flexible[data-v-4831c6fe] {\n    flex-grow: 1;\n}\n@media screen and (min-width: 769px), print {\n.level-left .level-item[data-v-4831c6fe]:not(:last-child),\n    .level-right .level-item[data-v-4831c6fe]:not(:last-child) {\n      margin-right: 0.75rem;\n}\n}\n.level-left[data-v-4831c6fe] {\n  align-items: center;\n  justify-content: flex-start;\n}\n@media screen and (max-width: 768px) {\n.level-left + .level-right[data-v-4831c6fe] {\n      margin-top: 1.5rem;\n}\n}\n@media screen and (min-width: 769px), print {\n.level-left[data-v-4831c6fe] {\n      display: flex;\n}\n}\n.level-right[data-v-4831c6fe] {\n  align-items: center;\n  justify-content: flex-end;\n}\n@media screen and (min-width: 769px), print {\n.level-right[data-v-4831c6fe] {\n      display: flex;\n}\n}\n.list[data-v-4831c6fe] {\n  background-color: white;\n  border-radius: 4px;\n  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);\n}\n.list-item[data-v-4831c6fe] {\n  display: block;\n  padding: 0.5em 1em;\n}\n.list-item[data-v-4831c6fe]:not(a) {\n    color: #4a4a4a;\n}\n.list-item[data-v-4831c6fe]:first-child {\n    border-top-left-radius: 4px;\n    border-top-right-radius: 4px;\n}\n.list-item[data-v-4831c6fe]:last-child {\n    border-top-left-radius: 4px;\n    border-top-right-radius: 4px;\n}\n.list-item[data-v-4831c6fe]:not(:last-child) {\n    border-bottom: 1px solid #dbdbdb;\n}\n.list-item.is-active[data-v-4831c6fe] {\n    background-color: #3273dc;\n    color: #fff;\n}\na.list-item[data-v-4831c6fe] {\n  background-color: whitesmoke;\n  cursor: pointer;\n}\n.media[data-v-4831c6fe] {\n  align-items: flex-start;\n  display: flex;\n  text-align: left;\n}\n.media .content[data-v-4831c6fe]:not(:last-child) {\n    margin-bottom: 0.75rem;\n}\n.media .media[data-v-4831c6fe] {\n    border-top: 1px solid rgba(219, 219, 219, 0.5);\n    display: flex;\n    padding-top: 0.75rem;\n}\n.media .media .content[data-v-4831c6fe]:not(:last-child),\n    .media .media .control[data-v-4831c6fe]:not(:last-child) {\n      margin-bottom: 0.5rem;\n}\n.media .media .media[data-v-4831c6fe] {\n      padding-top: 0.5rem;\n}\n.media .media .media + .media[data-v-4831c6fe] {\n        margin-top: 0.5rem;\n}\n.media + .media[data-v-4831c6fe] {\n    border-top: 1px solid rgba(219, 219, 219, 0.5);\n    margin-top: 1rem;\n    padding-top: 1rem;\n}\n.media.is-large + .media[data-v-4831c6fe] {\n    margin-top: 1.5rem;\n    padding-top: 1.5rem;\n}\n.media-left[data-v-4831c6fe],\n.media-right[data-v-4831c6fe] {\n  flex-basis: auto;\n  flex-grow: 0;\n  flex-shrink: 0;\n}\n.media-left[data-v-4831c6fe] {\n  margin-right: 1rem;\n}\n.media-right[data-v-4831c6fe] {\n  margin-left: 1rem;\n}\n.media-content[data-v-4831c6fe] {\n  flex-basis: auto;\n  flex-grow: 1;\n  flex-shrink: 1;\n  text-align: left;\n}\n@media screen and (max-width: 768px) {\n.media-content[data-v-4831c6fe] {\n    overflow-x: auto;\n}\n}\n.menu[data-v-4831c6fe] {\n  font-size: 1rem;\n}\n.menu.is-small[data-v-4831c6fe] {\n    font-size: 0.75rem;\n}\n.menu.is-medium[data-v-4831c6fe] {\n    font-size: 1.25rem;\n}\n.menu.is-large[data-v-4831c6fe] {\n    font-size: 1.5rem;\n}\n.menu-list[data-v-4831c6fe] {\n  line-height: 1.25;\n}\n.menu-list a[data-v-4831c6fe] {\n    border-radius: 2px;\n    color: #4a4a4a;\n    display: block;\n    padding: 0.5em 0.75em;\n}\n.menu-list a[data-v-4831c6fe]:hover {\n      background-color: whitesmoke;\n      color: #363636;\n}\n.menu-list a.is-active[data-v-4831c6fe] {\n      background-color: #3273dc;\n      color: #fff;\n}\n.menu-list li ul[data-v-4831c6fe] {\n    border-left: 1px solid #dbdbdb;\n    margin: 0.75em;\n    padding-left: 0.75em;\n}\n.menu-label[data-v-4831c6fe] {\n  color: #7a7a7a;\n  font-size: 0.75em;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.menu-label[data-v-4831c6fe]:not(:first-child) {\n    margin-top: 1em;\n}\n.menu-label[data-v-4831c6fe]:not(:last-child) {\n    margin-bottom: 1em;\n}\n.message[data-v-4831c6fe] {\n  background-color: whitesmoke;\n  border-radius: 4px;\n  font-size: 1rem;\n}\n.message strong[data-v-4831c6fe] {\n    color: currentColor;\n}\n.message a[data-v-4831c6fe]:not(.button):not(.tag) {\n    color: currentColor;\n    text-decoration: underline;\n}\n.message.is-small[data-v-4831c6fe] {\n    font-size: 0.75rem;\n}\n.message.is-medium[data-v-4831c6fe] {\n    font-size: 1.25rem;\n}\n.message.is-large[data-v-4831c6fe] {\n    font-size: 1.5rem;\n}\n.message.is-white[data-v-4831c6fe] {\n    background-color: white;\n}\n.message.is-white .message-header[data-v-4831c6fe] {\n      background-color: white;\n      color: #0a0a0a;\n}\n.message.is-white .message-body[data-v-4831c6fe] {\n      border-color: white;\n      color: #4d4d4d;\n}\n.message.is-black[data-v-4831c6fe] {\n    background-color: #fafafa;\n}\n.message.is-black .message-header[data-v-4831c6fe] {\n      background-color: #0a0a0a;\n      color: white;\n}\n.message.is-black .message-body[data-v-4831c6fe] {\n      border-color: #0a0a0a;\n      color: #090909;\n}\n.message.is-light[data-v-4831c6fe] {\n    background-color: #fafafa;\n}\n.message.is-light .message-header[data-v-4831c6fe] {\n      background-color: whitesmoke;\n      color: #363636;\n}\n.message.is-light .message-body[data-v-4831c6fe] {\n      border-color: whitesmoke;\n      color: #505050;\n}\n.message.is-dark[data-v-4831c6fe] {\n    background-color: #fafafa;\n}\n.message.is-dark .message-header[data-v-4831c6fe] {\n      background-color: #363636;\n      color: whitesmoke;\n}\n.message.is-dark .message-body[data-v-4831c6fe] {\n      border-color: #363636;\n      color: #2a2a2a;\n}\n.message.is-primary[data-v-4831c6fe],[data-v-4831c6fe] .message.tagAreaClass,[data-v-4831c6fe] .message.deleteAreaClass,[data-v-4831c6fe] .message.deleteContentClass {\n    background-color: #f5fffd;\n}\n.message.is-primary .message-header[data-v-4831c6fe],[data-v-4831c6fe] .message.tagAreaClass .message-header,[data-v-4831c6fe] .message.deleteAreaClass .message-header,[data-v-4831c6fe] .message.deleteContentClass .message-header {\n      background-color: #00d1b2;\n      color: #fff;\n}\n.message.is-primary .message-body[data-v-4831c6fe],[data-v-4831c6fe] .message.tagAreaClass .message-body,[data-v-4831c6fe] .message.deleteAreaClass .message-body,[data-v-4831c6fe] .message.deleteContentClass .message-body {\n      border-color: #00d1b2;\n      color: #021310;\n}\n.message.is-link[data-v-4831c6fe] {\n    background-color: #f6f9fe;\n}\n.message.is-link .message-header[data-v-4831c6fe] {\n      background-color: #3273dc;\n      color: #fff;\n}\n.message.is-link .message-body[data-v-4831c6fe] {\n      border-color: #3273dc;\n      color: #22509a;\n}\n.message.is-info[data-v-4831c6fe] {\n    background-color: #f6fbfe;\n}\n.message.is-info .message-header[data-v-4831c6fe] {\n      background-color: #209cee;\n      color: #fff;\n}\n.message.is-info .message-body[data-v-4831c6fe] {\n      border-color: #209cee;\n      color: #12537e;\n}\n.message.is-success[data-v-4831c6fe] {\n    background-color: #f6fef9;\n}\n.message.is-success .message-header[data-v-4831c6fe] {\n      background-color: #23d160;\n      color: #fff;\n}\n.message.is-success .message-body[data-v-4831c6fe] {\n      border-color: #23d160;\n      color: #0e301a;\n}\n.message.is-warning[data-v-4831c6fe] {\n    background-color: #fffdf5;\n}\n.message.is-warning .message-header[data-v-4831c6fe] {\n      background-color: #ffdd57;\n      color: rgba(0, 0, 0, 0.7);\n}\n.message.is-warning .message-body[data-v-4831c6fe] {\n      border-color: #ffdd57;\n      color: #3b3108;\n}\n.message.is-danger[data-v-4831c6fe] {\n    background-color: #fff5f7;\n}\n.message.is-danger .message-header[data-v-4831c6fe] {\n      background-color: #ff3860;\n      color: #fff;\n}\n.message.is-danger .message-body[data-v-4831c6fe] {\n      border-color: #ff3860;\n      color: #cd0930;\n}\n.message-header[data-v-4831c6fe] {\n  align-items: center;\n  background-color: #4a4a4a;\n  border-radius: 4px 4px 0 0;\n  color: #fff;\n  display: flex;\n  font-weight: 700;\n  justify-content: space-between;\n  line-height: 1.25;\n  padding: 0.75em 1em;\n  position: relative;\n}\n.message-header .delete[data-v-4831c6fe] {\n    flex-grow: 0;\n    flex-shrink: 0;\n    margin-left: 0.75em;\n}\n.message-header + .message-body[data-v-4831c6fe] {\n    border-width: 0;\n    border-top-left-radius: 0;\n    border-top-right-radius: 0;\n}\n.message-body[data-v-4831c6fe] {\n  border-color: #dbdbdb;\n  border-radius: 4px;\n  border-style: solid;\n  border-width: 0 0 0 4px;\n  color: #4a4a4a;\n  padding: 1.25em 1.5em;\n}\n.message-body code[data-v-4831c6fe],\n  .message-body pre[data-v-4831c6fe] {\n    background-color: white;\n}\n.message-body pre code[data-v-4831c6fe] {\n    background-color: transparent;\n}\n.modal[data-v-4831c6fe] {\n  align-items: center;\n  display: none;\n  flex-direction: column;\n  justify-content: center;\n  overflow: hidden;\n  position: fixed;\n  z-index: 40;\n}\n.modal.is-active[data-v-4831c6fe] {\n    display: flex;\n}\n.modal-background[data-v-4831c6fe] {\n  background-color: rgba(10, 10, 10, 0.86);\n}\n.modal-content[data-v-4831c6fe],\n.modal-card[data-v-4831c6fe] {\n  margin: 0 20px;\n  max-height: calc(100vh - 160px);\n  overflow: auto;\n  position: relative;\n  width: 100%;\n}\n@media screen and (min-width: 769px), print {\n.modal-content[data-v-4831c6fe],\n    .modal-card[data-v-4831c6fe] {\n      margin: 0 auto;\n      max-height: calc(100vh - 40px);\n      width: 640px;\n}\n}\n.modal-close[data-v-4831c6fe] {\n  background: none;\n  height: 40px;\n  position: fixed;\n  right: 20px;\n  top: 20px;\n  width: 40px;\n}\n.modal-card[data-v-4831c6fe] {\n  display: flex;\n  flex-direction: column;\n  max-height: calc(100vh - 40px);\n  overflow: hidden;\n  -ms-overflow-y: visible;\n}\n.modal-card-head[data-v-4831c6fe],\n.modal-card-foot[data-v-4831c6fe] {\n  align-items: center;\n  background-color: whitesmoke;\n  display: flex;\n  flex-shrink: 0;\n  justify-content: flex-start;\n  padding: 20px;\n  position: relative;\n}\n.modal-card-head[data-v-4831c6fe] {\n  border-bottom: 1px solid #dbdbdb;\n  border-top-left-radius: 6px;\n  border-top-right-radius: 6px;\n}\n.modal-card-title[data-v-4831c6fe] {\n  color: #363636;\n  flex-grow: 1;\n  flex-shrink: 0;\n  font-size: 1.5rem;\n  line-height: 1;\n}\n.modal-card-foot[data-v-4831c6fe] {\n  border-bottom-left-radius: 6px;\n  border-bottom-right-radius: 6px;\n  border-top: 1px solid #dbdbdb;\n}\n.modal-card-foot .button[data-v-4831c6fe]:not(:last-child) {\n    margin-right: 10px;\n}\n.modal-card-body[data-v-4831c6fe] {\n  -webkit-overflow-scrolling: touch;\n  background-color: white;\n  flex-grow: 1;\n  flex-shrink: 1;\n  overflow: auto;\n  padding: 20px;\n}\n.navbar[data-v-4831c6fe] {\n  background-color: white;\n  min-height: 3.25rem;\n  position: relative;\n  z-index: 30;\n}\n.navbar.is-white[data-v-4831c6fe] {\n    background-color: white;\n    color: #0a0a0a;\n}\n.navbar.is-white .navbar-brand > .navbar-item[data-v-4831c6fe],\n    .navbar.is-white .navbar-brand .navbar-link[data-v-4831c6fe] {\n      color: #0a0a0a;\n}\n.navbar.is-white .navbar-brand > a.navbar-item[data-v-4831c6fe]:hover, .navbar.is-white .navbar-brand > a.navbar-item.is-active[data-v-4831c6fe],\n    .navbar.is-white .navbar-brand .navbar-link[data-v-4831c6fe]:hover,\n    .navbar.is-white .navbar-brand .navbar-link.is-active[data-v-4831c6fe] {\n      background-color: #f2f2f2;\n      color: #0a0a0a;\n}\n.navbar.is-white .navbar-brand .navbar-link[data-v-4831c6fe]::after {\n      border-color: #0a0a0a;\n}\n.navbar.is-white .navbar-burger[data-v-4831c6fe] {\n      color: #0a0a0a;\n}\n@media screen and (min-width: 1088px) {\n.navbar.is-white .navbar-start > .navbar-item[data-v-4831c6fe],\n      .navbar.is-white .navbar-start .navbar-link[data-v-4831c6fe],\n      .navbar.is-white .navbar-end > .navbar-item[data-v-4831c6fe],\n      .navbar.is-white .navbar-end .navbar-link[data-v-4831c6fe] {\n        color: #0a0a0a;\n}\n.navbar.is-white .navbar-start > a.navbar-item[data-v-4831c6fe]:hover, .navbar.is-white .navbar-start > a.navbar-item.is-active[data-v-4831c6fe],\n      .navbar.is-white .navbar-start .navbar-link[data-v-4831c6fe]:hover,\n      .navbar.is-white .navbar-start .navbar-link.is-active[data-v-4831c6fe],\n      .navbar.is-white .navbar-end > a.navbar-item[data-v-4831c6fe]:hover,\n      .navbar.is-white .navbar-end > a.navbar-item.is-active[data-v-4831c6fe],\n      .navbar.is-white .navbar-end .navbar-link[data-v-4831c6fe]:hover,\n      .navbar.is-white .navbar-end .navbar-link.is-active[data-v-4831c6fe] {\n        background-color: #f2f2f2;\n        color: #0a0a0a;\n}\n.navbar.is-white .navbar-start .navbar-link[data-v-4831c6fe]::after,\n      .navbar.is-white .navbar-end .navbar-link[data-v-4831c6fe]::after {\n        border-color: #0a0a0a;\n}\n.navbar.is-white .navbar-item.has-dropdown:hover .navbar-link[data-v-4831c6fe],\n      .navbar.is-white .navbar-item.has-dropdown.is-active .navbar-link[data-v-4831c6fe] {\n        background-color: #f2f2f2;\n        color: #0a0a0a;\n}\n.navbar.is-white .navbar-dropdown a.navbar-item.is-active[data-v-4831c6fe] {\n        background-color: white;\n        color: #0a0a0a;\n}\n}\n.navbar.is-black[data-v-4831c6fe] {\n    background-color: #0a0a0a;\n    color: white;\n}\n.navbar.is-black .navbar-brand > .navbar-item[data-v-4831c6fe],\n    .navbar.is-black .navbar-brand .navbar-link[data-v-4831c6fe] {\n      color: white;\n}\n.navbar.is-black .navbar-brand > a.navbar-item[data-v-4831c6fe]:hover, .navbar.is-black .navbar-brand > a.navbar-item.is-active[data-v-4831c6fe],\n    .navbar.is-black .navbar-brand .navbar-link[data-v-4831c6fe]:hover,\n    .navbar.is-black .navbar-brand .navbar-link.is-active[data-v-4831c6fe] {\n      background-color: black;\n      color: white;\n}\n.navbar.is-black .navbar-brand .navbar-link[data-v-4831c6fe]::after {\n      border-color: white;\n}\n.navbar.is-black .navbar-burger[data-v-4831c6fe] {\n      color: white;\n}\n@media screen and (min-width: 1088px) {\n.navbar.is-black .navbar-start > .navbar-item[data-v-4831c6fe],\n      .navbar.is-black .navbar-start .navbar-link[data-v-4831c6fe],\n      .navbar.is-black .navbar-end > .navbar-item[data-v-4831c6fe],\n      .navbar.is-black .navbar-end .navbar-link[data-v-4831c6fe] {\n        color: white;\n}\n.navbar.is-black .navbar-start > a.navbar-item[data-v-4831c6fe]:hover, .navbar.is-black .navbar-start > a.navbar-item.is-active[data-v-4831c6fe],\n      .navbar.is-black .navbar-start .navbar-link[data-v-4831c6fe]:hover,\n      .navbar.is-black .navbar-start .navbar-link.is-active[data-v-4831c6fe],\n      .navbar.is-black .navbar-end > a.navbar-item[data-v-4831c6fe]:hover,\n      .navbar.is-black .navbar-end > a.navbar-item.is-active[data-v-4831c6fe],\n      .navbar.is-black .navbar-end .navbar-link[data-v-4831c6fe]:hover,\n      .navbar.is-black .navbar-end .navbar-link.is-active[data-v-4831c6fe] {\n        background-color: black;\n        color: white;\n}\n.navbar.is-black .navbar-start .navbar-link[data-v-4831c6fe]::after,\n      .navbar.is-black .navbar-end .navbar-link[data-v-4831c6fe]::after {\n        border-color: white;\n}\n.navbar.is-black .navbar-item.has-dropdown:hover .navbar-link[data-v-4831c6fe],\n      .navbar.is-black .navbar-item.has-dropdown.is-active .navbar-link[data-v-4831c6fe] {\n        background-color: black;\n        color: white;\n}\n.navbar.is-black .navbar-dropdown a.navbar-item.is-active[data-v-4831c6fe] {\n        background-color: #0a0a0a;\n        color: white;\n}\n}\n.navbar.is-light[data-v-4831c6fe] {\n    background-color: whitesmoke;\n    color: #363636;\n}\n.navbar.is-light .navbar-brand > .navbar-item[data-v-4831c6fe],\n    .navbar.is-light .navbar-brand .navbar-link[data-v-4831c6fe] {\n      color: #363636;\n}\n.navbar.is-light .navbar-brand > a.navbar-item[data-v-4831c6fe]:hover, .navbar.is-light .navbar-brand > a.navbar-item.is-active[data-v-4831c6fe],\n    .navbar.is-light .navbar-brand .navbar-link[data-v-4831c6fe]:hover,\n    .navbar.is-light .navbar-brand .navbar-link.is-active[data-v-4831c6fe] {\n      background-color: #e8e8e8;\n      color: #363636;\n}\n.navbar.is-light .navbar-brand .navbar-link[data-v-4831c6fe]::after {\n      border-color: #363636;\n}\n.navbar.is-light .navbar-burger[data-v-4831c6fe] {\n      color: #363636;\n}\n@media screen and (min-width: 1088px) {\n.navbar.is-light .navbar-start > .navbar-item[data-v-4831c6fe],\n      .navbar.is-light .navbar-start .navbar-link[data-v-4831c6fe],\n      .navbar.is-light .navbar-end > .navbar-item[data-v-4831c6fe],\n      .navbar.is-light .navbar-end .navbar-link[data-v-4831c6fe] {\n        color: #363636;\n}\n.navbar.is-light .navbar-start > a.navbar-item[data-v-4831c6fe]:hover, .navbar.is-light .navbar-start > a.navbar-item.is-active[data-v-4831c6fe],\n      .navbar.is-light .navbar-start .navbar-link[data-v-4831c6fe]:hover,\n      .navbar.is-light .navbar-start .navbar-link.is-active[data-v-4831c6fe],\n      .navbar.is-light .navbar-end > a.navbar-item[data-v-4831c6fe]:hover,\n      .navbar.is-light .navbar-end > a.navbar-item.is-active[data-v-4831c6fe],\n      .navbar.is-light .navbar-end .navbar-link[data-v-4831c6fe]:hover,\n      .navbar.is-light .navbar-end .navbar-link.is-active[data-v-4831c6fe] {\n        background-color: #e8e8e8;\n        color: #363636;\n}\n.navbar.is-light .navbar-start .navbar-link[data-v-4831c6fe]::after,\n      .navbar.is-light .navbar-end .navbar-link[data-v-4831c6fe]::after {\n        border-color: #363636;\n}\n.navbar.is-light .navbar-item.has-dropdown:hover .navbar-link[data-v-4831c6fe],\n      .navbar.is-light .navbar-item.has-dropdown.is-active .navbar-link[data-v-4831c6fe] {\n        background-color: #e8e8e8;\n        color: #363636;\n}\n.navbar.is-light .navbar-dropdown a.navbar-item.is-active[data-v-4831c6fe] {\n        background-color: whitesmoke;\n        color: #363636;\n}\n}\n.navbar.is-dark[data-v-4831c6fe] {\n    background-color: #363636;\n    color: whitesmoke;\n}\n.navbar.is-dark .navbar-brand > .navbar-item[data-v-4831c6fe],\n    .navbar.is-dark .navbar-brand .navbar-link[data-v-4831c6fe] {\n      color: whitesmoke;\n}\n.navbar.is-dark .navbar-brand > a.navbar-item[data-v-4831c6fe]:hover, .navbar.is-dark .navbar-brand > a.navbar-item.is-active[data-v-4831c6fe],\n    .navbar.is-dark .navbar-brand .navbar-link[data-v-4831c6fe]:hover,\n    .navbar.is-dark .navbar-brand .navbar-link.is-active[data-v-4831c6fe] {\n      background-color: #292929;\n      color: whitesmoke;\n}\n.navbar.is-dark .navbar-brand .navbar-link[data-v-4831c6fe]::after {\n      border-color: whitesmoke;\n}\n.navbar.is-dark .navbar-burger[data-v-4831c6fe] {\n      color: whitesmoke;\n}\n@media screen and (min-width: 1088px) {\n.navbar.is-dark .navbar-start > .navbar-item[data-v-4831c6fe],\n      .navbar.is-dark .navbar-start .navbar-link[data-v-4831c6fe],\n      .navbar.is-dark .navbar-end > .navbar-item[data-v-4831c6fe],\n      .navbar.is-dark .navbar-end .navbar-link[data-v-4831c6fe] {\n        color: whitesmoke;\n}\n.navbar.is-dark .navbar-start > a.navbar-item[data-v-4831c6fe]:hover, .navbar.is-dark .navbar-start > a.navbar-item.is-active[data-v-4831c6fe],\n      .navbar.is-dark .navbar-start .navbar-link[data-v-4831c6fe]:hover,\n      .navbar.is-dark .navbar-start .navbar-link.is-active[data-v-4831c6fe],\n      .navbar.is-dark .navbar-end > a.navbar-item[data-v-4831c6fe]:hover,\n      .navbar.is-dark .navbar-end > a.navbar-item.is-active[data-v-4831c6fe],\n      .navbar.is-dark .navbar-end .navbar-link[data-v-4831c6fe]:hover,\n      .navbar.is-dark .navbar-end .navbar-link.is-active[data-v-4831c6fe] {\n        background-color: #292929;\n        color: whitesmoke;\n}\n.navbar.is-dark .navbar-start .navbar-link[data-v-4831c6fe]::after,\n      .navbar.is-dark .navbar-end .navbar-link[data-v-4831c6fe]::after {\n        border-color: whitesmoke;\n}\n.navbar.is-dark .navbar-item.has-dropdown:hover .navbar-link[data-v-4831c6fe],\n      .navbar.is-dark .navbar-item.has-dropdown.is-active .navbar-link[data-v-4831c6fe] {\n        background-color: #292929;\n        color: whitesmoke;\n}\n.navbar.is-dark .navbar-dropdown a.navbar-item.is-active[data-v-4831c6fe] {\n        background-color: #363636;\n        color: whitesmoke;\n}\n}\n.navbar.is-primary[data-v-4831c6fe],[data-v-4831c6fe] .navbar.tagAreaClass,[data-v-4831c6fe] .navbar.deleteAreaClass,[data-v-4831c6fe] .navbar.deleteContentClass {\n    background-color: #00d1b2;\n    color: #fff;\n}\n.navbar.is-primary .navbar-brand > .navbar-item[data-v-4831c6fe],[data-v-4831c6fe] .navbar.tagAreaClass .navbar-brand > .navbar-item,[data-v-4831c6fe] .navbar.deleteAreaClass .navbar-brand > .navbar-item,[data-v-4831c6fe] .navbar.deleteContentClass .navbar-brand > .navbar-item,\n    .navbar.is-primary .navbar-brand .navbar-link[data-v-4831c6fe],[data-v-4831c6fe] .navbar.tagAreaClass .navbar-brand .navbar-link,[data-v-4831c6fe] .navbar.deleteAreaClass .navbar-brand .navbar-link,[data-v-4831c6fe] .navbar.deleteContentClass .navbar-brand .navbar-link {\n      color: #fff;\n}\n.navbar.is-primary .navbar-brand > a.navbar-item[data-v-4831c6fe]:hover,[data-v-4831c6fe] .navbar.tagAreaClass .navbar-brand > a.navbar-item:hover,[data-v-4831c6fe] .navbar.deleteAreaClass .navbar-brand > a.navbar-item:hover,[data-v-4831c6fe] .navbar.deleteContentClass .navbar-brand > a.navbar-item:hover, .navbar.is-primary .navbar-brand > a.navbar-item.is-active[data-v-4831c6fe],[data-v-4831c6fe] .navbar.tagAreaClass .navbar-brand > a.navbar-item.is-active,[data-v-4831c6fe] .navbar.deleteAreaClass .navbar-brand > a.navbar-item.is-active,[data-v-4831c6fe] .navbar.deleteContentClass .navbar-brand > a.navbar-item.is-active,\n    .navbar.is-primary .navbar-brand .navbar-link[data-v-4831c6fe]:hover,[data-v-4831c6fe] .navbar.tagAreaClass .navbar-brand .navbar-link:hover,[data-v-4831c6fe] .navbar.deleteAreaClass .navbar-brand .navbar-link:hover,[data-v-4831c6fe] .navbar.deleteContentClass .navbar-brand .navbar-link:hover,\n    .navbar.is-primary .navbar-brand .navbar-link.is-active[data-v-4831c6fe],[data-v-4831c6fe] .navbar.tagAreaClass .navbar-brand .navbar-link.is-active,[data-v-4831c6fe] .navbar.deleteAreaClass .navbar-brand .navbar-link.is-active,[data-v-4831c6fe] .navbar.deleteContentClass .navbar-brand .navbar-link.is-active {\n      background-color: #00b89c;\n      color: #fff;\n}\n.navbar.is-primary .navbar-brand .navbar-link[data-v-4831c6fe]::after,[data-v-4831c6fe] .navbar.tagAreaClass .navbar-brand .navbar-link::after,[data-v-4831c6fe] .navbar.deleteAreaClass .navbar-brand .navbar-link::after,[data-v-4831c6fe] .navbar.deleteContentClass .navbar-brand .navbar-link::after {\n      border-color: #fff;\n}\n.navbar.is-primary .navbar-burger[data-v-4831c6fe],[data-v-4831c6fe] .navbar.tagAreaClass .navbar-burger,[data-v-4831c6fe] .navbar.deleteAreaClass .navbar-burger,[data-v-4831c6fe] .navbar.deleteContentClass .navbar-burger {\n      color: #fff;\n}\n@media screen and (min-width: 1088px) {\n.navbar.is-primary .navbar-start > .navbar-item[data-v-4831c6fe],[data-v-4831c6fe] .navbar.tagAreaClass .navbar-start > .navbar-item,[data-v-4831c6fe] .navbar.deleteAreaClass .navbar-start > .navbar-item,[data-v-4831c6fe] .navbar.deleteContentClass .navbar-start > .navbar-item,\n      .navbar.is-primary .navbar-start .navbar-link[data-v-4831c6fe],[data-v-4831c6fe] .navbar.tagAreaClass .navbar-start .navbar-link,[data-v-4831c6fe] .navbar.deleteAreaClass .navbar-start .navbar-link,[data-v-4831c6fe] .navbar.deleteContentClass .navbar-start .navbar-link,\n      .navbar.is-primary .navbar-end > .navbar-item[data-v-4831c6fe],[data-v-4831c6fe] .navbar.tagAreaClass .navbar-end > .navbar-item,[data-v-4831c6fe] .navbar.deleteAreaClass .navbar-end > .navbar-item,[data-v-4831c6fe] .navbar.deleteContentClass .navbar-end > .navbar-item,\n      .navbar.is-primary .navbar-end .navbar-link[data-v-4831c6fe],[data-v-4831c6fe] .navbar.tagAreaClass .navbar-end .navbar-link,[data-v-4831c6fe] .navbar.deleteAreaClass .navbar-end .navbar-link,[data-v-4831c6fe] .navbar.deleteContentClass .navbar-end .navbar-link {\n        color: #fff;\n}\n.navbar.is-primary .navbar-start > a.navbar-item[data-v-4831c6fe]:hover,[data-v-4831c6fe] .navbar.tagAreaClass .navbar-start > a.navbar-item:hover,[data-v-4831c6fe] .navbar.deleteAreaClass .navbar-start > a.navbar-item:hover,[data-v-4831c6fe] .navbar.deleteContentClass .navbar-start > a.navbar-item:hover, .navbar.is-primary .navbar-start > a.navbar-item.is-active[data-v-4831c6fe],[data-v-4831c6fe] .navbar.tagAreaClass .navbar-start > a.navbar-item.is-active,[data-v-4831c6fe] .navbar.deleteAreaClass .navbar-start > a.navbar-item.is-active,[data-v-4831c6fe] .navbar.deleteContentClass .navbar-start > a.navbar-item.is-active,\n      .navbar.is-primary .navbar-start .navbar-link[data-v-4831c6fe]:hover,[data-v-4831c6fe] .navbar.tagAreaClass .navbar-start .navbar-link:hover,[data-v-4831c6fe] .navbar.deleteAreaClass .navbar-start .navbar-link:hover,[data-v-4831c6fe] .navbar.deleteContentClass .navbar-start .navbar-link:hover,\n      .navbar.is-primary .navbar-start .navbar-link.is-active[data-v-4831c6fe],[data-v-4831c6fe] .navbar.tagAreaClass .navbar-start .navbar-link.is-active,[data-v-4831c6fe] .navbar.deleteAreaClass .navbar-start .navbar-link.is-active,[data-v-4831c6fe] .navbar.deleteContentClass .navbar-start .navbar-link.is-active,\n      .navbar.is-primary .navbar-end > a.navbar-item[data-v-4831c6fe]:hover,[data-v-4831c6fe] .navbar.tagAreaClass .navbar-end > a.navbar-item:hover,[data-v-4831c6fe] .navbar.deleteAreaClass .navbar-end > a.navbar-item:hover,[data-v-4831c6fe] .navbar.deleteContentClass .navbar-end > a.navbar-item:hover,\n      .navbar.is-primary .navbar-end > a.navbar-item.is-active[data-v-4831c6fe],[data-v-4831c6fe] .navbar.tagAreaClass .navbar-end > a.navbar-item.is-active,[data-v-4831c6fe] .navbar.deleteAreaClass .navbar-end > a.navbar-item.is-active,[data-v-4831c6fe] .navbar.deleteContentClass .navbar-end > a.navbar-item.is-active,\n      .navbar.is-primary .navbar-end .navbar-link[data-v-4831c6fe]:hover,[data-v-4831c6fe] .navbar.tagAreaClass .navbar-end .navbar-link:hover,[data-v-4831c6fe] .navbar.deleteAreaClass .navbar-end .navbar-link:hover,[data-v-4831c6fe] .navbar.deleteContentClass .navbar-end .navbar-link:hover,\n      .navbar.is-primary .navbar-end .navbar-link.is-active[data-v-4831c6fe],[data-v-4831c6fe] .navbar.tagAreaClass .navbar-end .navbar-link.is-active,[data-v-4831c6fe] .navbar.deleteAreaClass .navbar-end .navbar-link.is-active,[data-v-4831c6fe] .navbar.deleteContentClass .navbar-end .navbar-link.is-active {\n        background-color: #00b89c;\n        color: #fff;\n}\n.navbar.is-primary .navbar-start .navbar-link[data-v-4831c6fe]::after,[data-v-4831c6fe] .navbar.tagAreaClass .navbar-start .navbar-link::after,[data-v-4831c6fe] .navbar.deleteAreaClass .navbar-start .navbar-link::after,[data-v-4831c6fe] .navbar.deleteContentClass .navbar-start .navbar-link::after,\n      .navbar.is-primary .navbar-end .navbar-link[data-v-4831c6fe]::after,[data-v-4831c6fe] .navbar.tagAreaClass .navbar-end .navbar-link::after,[data-v-4831c6fe] .navbar.deleteAreaClass .navbar-end .navbar-link::after,[data-v-4831c6fe] .navbar.deleteContentClass .navbar-end .navbar-link::after {\n        border-color: #fff;\n}\n.navbar.is-primary .navbar-item.has-dropdown:hover .navbar-link[data-v-4831c6fe],[data-v-4831c6fe] .navbar.tagAreaClass .navbar-item.has-dropdown:hover .navbar-link,[data-v-4831c6fe] .navbar.deleteAreaClass .navbar-item.has-dropdown:hover .navbar-link,[data-v-4831c6fe] .navbar.deleteContentClass .navbar-item.has-dropdown:hover .navbar-link,\n      .navbar.is-primary .navbar-item.has-dropdown.is-active .navbar-link[data-v-4831c6fe],[data-v-4831c6fe] .navbar.tagAreaClass .navbar-item.has-dropdown.is-active .navbar-link,[data-v-4831c6fe] .navbar.deleteAreaClass .navbar-item.has-dropdown.is-active .navbar-link,[data-v-4831c6fe] .navbar.deleteContentClass .navbar-item.has-dropdown.is-active .navbar-link {\n        background-color: #00b89c;\n        color: #fff;\n}\n.navbar.is-primary .navbar-dropdown a.navbar-item.is-active[data-v-4831c6fe],[data-v-4831c6fe] .navbar.tagAreaClass .navbar-dropdown a.navbar-item.is-active,[data-v-4831c6fe] .navbar.deleteAreaClass .navbar-dropdown a.navbar-item.is-active,[data-v-4831c6fe] .navbar.deleteContentClass .navbar-dropdown a.navbar-item.is-active {\n        background-color: #00d1b2;\n        color: #fff;\n}\n}\n.navbar.is-link[data-v-4831c6fe] {\n    background-color: #3273dc;\n    color: #fff;\n}\n.navbar.is-link .navbar-brand > .navbar-item[data-v-4831c6fe],\n    .navbar.is-link .navbar-brand .navbar-link[data-v-4831c6fe] {\n      color: #fff;\n}\n.navbar.is-link .navbar-brand > a.navbar-item[data-v-4831c6fe]:hover, .navbar.is-link .navbar-brand > a.navbar-item.is-active[data-v-4831c6fe],\n    .navbar.is-link .navbar-brand .navbar-link[data-v-4831c6fe]:hover,\n    .navbar.is-link .navbar-brand .navbar-link.is-active[data-v-4831c6fe] {\n      background-color: #2366d1;\n      color: #fff;\n}\n.navbar.is-link .navbar-brand .navbar-link[data-v-4831c6fe]::after {\n      border-color: #fff;\n}\n.navbar.is-link .navbar-burger[data-v-4831c6fe] {\n      color: #fff;\n}\n@media screen and (min-width: 1088px) {\n.navbar.is-link .navbar-start > .navbar-item[data-v-4831c6fe],\n      .navbar.is-link .navbar-start .navbar-link[data-v-4831c6fe],\n      .navbar.is-link .navbar-end > .navbar-item[data-v-4831c6fe],\n      .navbar.is-link .navbar-end .navbar-link[data-v-4831c6fe] {\n        color: #fff;\n}\n.navbar.is-link .navbar-start > a.navbar-item[data-v-4831c6fe]:hover, .navbar.is-link .navbar-start > a.navbar-item.is-active[data-v-4831c6fe],\n      .navbar.is-link .navbar-start .navbar-link[data-v-4831c6fe]:hover,\n      .navbar.is-link .navbar-start .navbar-link.is-active[data-v-4831c6fe],\n      .navbar.is-link .navbar-end > a.navbar-item[data-v-4831c6fe]:hover,\n      .navbar.is-link .navbar-end > a.navbar-item.is-active[data-v-4831c6fe],\n      .navbar.is-link .navbar-end .navbar-link[data-v-4831c6fe]:hover,\n      .navbar.is-link .navbar-end .navbar-link.is-active[data-v-4831c6fe] {\n        background-color: #2366d1;\n        color: #fff;\n}\n.navbar.is-link .navbar-start .navbar-link[data-v-4831c6fe]::after,\n      .navbar.is-link .navbar-end .navbar-link[data-v-4831c6fe]::after {\n        border-color: #fff;\n}\n.navbar.is-link .navbar-item.has-dropdown:hover .navbar-link[data-v-4831c6fe],\n      .navbar.is-link .navbar-item.has-dropdown.is-active .navbar-link[data-v-4831c6fe] {\n        background-color: #2366d1;\n        color: #fff;\n}\n.navbar.is-link .navbar-dropdown a.navbar-item.is-active[data-v-4831c6fe] {\n        background-color: #3273dc;\n        color: #fff;\n}\n}\n.navbar.is-info[data-v-4831c6fe] {\n    background-color: #209cee;\n    color: #fff;\n}\n.navbar.is-info .navbar-brand > .navbar-item[data-v-4831c6fe],\n    .navbar.is-info .navbar-brand .navbar-link[data-v-4831c6fe] {\n      color: #fff;\n}\n.navbar.is-info .navbar-brand > a.navbar-item[data-v-4831c6fe]:hover, .navbar.is-info .navbar-brand > a.navbar-item.is-active[data-v-4831c6fe],\n    .navbar.is-info .navbar-brand .navbar-link[data-v-4831c6fe]:hover,\n    .navbar.is-info .navbar-brand .navbar-link.is-active[data-v-4831c6fe] {\n      background-color: #118fe4;\n      color: #fff;\n}\n.navbar.is-info .navbar-brand .navbar-link[data-v-4831c6fe]::after {\n      border-color: #fff;\n}\n.navbar.is-info .navbar-burger[data-v-4831c6fe] {\n      color: #fff;\n}\n@media screen and (min-width: 1088px) {\n.navbar.is-info .navbar-start > .navbar-item[data-v-4831c6fe],\n      .navbar.is-info .navbar-start .navbar-link[data-v-4831c6fe],\n      .navbar.is-info .navbar-end > .navbar-item[data-v-4831c6fe],\n      .navbar.is-info .navbar-end .navbar-link[data-v-4831c6fe] {\n        color: #fff;\n}\n.navbar.is-info .navbar-start > a.navbar-item[data-v-4831c6fe]:hover, .navbar.is-info .navbar-start > a.navbar-item.is-active[data-v-4831c6fe],\n      .navbar.is-info .navbar-start .navbar-link[data-v-4831c6fe]:hover,\n      .navbar.is-info .navbar-start .navbar-link.is-active[data-v-4831c6fe],\n      .navbar.is-info .navbar-end > a.navbar-item[data-v-4831c6fe]:hover,\n      .navbar.is-info .navbar-end > a.navbar-item.is-active[data-v-4831c6fe],\n      .navbar.is-info .navbar-end .navbar-link[data-v-4831c6fe]:hover,\n      .navbar.is-info .navbar-end .navbar-link.is-active[data-v-4831c6fe] {\n        background-color: #118fe4;\n        color: #fff;\n}\n.navbar.is-info .navbar-start .navbar-link[data-v-4831c6fe]::after,\n      .navbar.is-info .navbar-end .navbar-link[data-v-4831c6fe]::after {\n        border-color: #fff;\n}\n.navbar.is-info .navbar-item.has-dropdown:hover .navbar-link[data-v-4831c6fe],\n      .navbar.is-info .navbar-item.has-dropdown.is-active .navbar-link[data-v-4831c6fe] {\n        background-color: #118fe4;\n        color: #fff;\n}\n.navbar.is-info .navbar-dropdown a.navbar-item.is-active[data-v-4831c6fe] {\n        background-color: #209cee;\n        color: #fff;\n}\n}\n.navbar.is-success[data-v-4831c6fe] {\n    background-color: #23d160;\n    color: #fff;\n}\n.navbar.is-success .navbar-brand > .navbar-item[data-v-4831c6fe],\n    .navbar.is-success .navbar-brand .navbar-link[data-v-4831c6fe] {\n      color: #fff;\n}\n.navbar.is-success .navbar-brand > a.navbar-item[data-v-4831c6fe]:hover, .navbar.is-success .navbar-brand > a.navbar-item.is-active[data-v-4831c6fe],\n    .navbar.is-success .navbar-brand .navbar-link[data-v-4831c6fe]:hover,\n    .navbar.is-success .navbar-brand .navbar-link.is-active[data-v-4831c6fe] {\n      background-color: #20bc56;\n      color: #fff;\n}\n.navbar.is-success .navbar-brand .navbar-link[data-v-4831c6fe]::after {\n      border-color: #fff;\n}\n.navbar.is-success .navbar-burger[data-v-4831c6fe] {\n      color: #fff;\n}\n@media screen and (min-width: 1088px) {\n.navbar.is-success .navbar-start > .navbar-item[data-v-4831c6fe],\n      .navbar.is-success .navbar-start .navbar-link[data-v-4831c6fe],\n      .navbar.is-success .navbar-end > .navbar-item[data-v-4831c6fe],\n      .navbar.is-success .navbar-end .navbar-link[data-v-4831c6fe] {\n        color: #fff;\n}\n.navbar.is-success .navbar-start > a.navbar-item[data-v-4831c6fe]:hover, .navbar.is-success .navbar-start > a.navbar-item.is-active[data-v-4831c6fe],\n      .navbar.is-success .navbar-start .navbar-link[data-v-4831c6fe]:hover,\n      .navbar.is-success .navbar-start .navbar-link.is-active[data-v-4831c6fe],\n      .navbar.is-success .navbar-end > a.navbar-item[data-v-4831c6fe]:hover,\n      .navbar.is-success .navbar-end > a.navbar-item.is-active[data-v-4831c6fe],\n      .navbar.is-success .navbar-end .navbar-link[data-v-4831c6fe]:hover,\n      .navbar.is-success .navbar-end .navbar-link.is-active[data-v-4831c6fe] {\n        background-color: #20bc56;\n        color: #fff;\n}\n.navbar.is-success .navbar-start .navbar-link[data-v-4831c6fe]::after,\n      .navbar.is-success .navbar-end .navbar-link[data-v-4831c6fe]::after {\n        border-color: #fff;\n}\n.navbar.is-success .navbar-item.has-dropdown:hover .navbar-link[data-v-4831c6fe],\n      .navbar.is-success .navbar-item.has-dropdown.is-active .navbar-link[data-v-4831c6fe] {\n        background-color: #20bc56;\n        color: #fff;\n}\n.navbar.is-success .navbar-dropdown a.navbar-item.is-active[data-v-4831c6fe] {\n        background-color: #23d160;\n        color: #fff;\n}\n}\n.navbar.is-warning[data-v-4831c6fe] {\n    background-color: #ffdd57;\n    color: rgba(0, 0, 0, 0.7);\n}\n.navbar.is-warning .navbar-brand > .navbar-item[data-v-4831c6fe],\n    .navbar.is-warning .navbar-brand .navbar-link[data-v-4831c6fe] {\n      color: rgba(0, 0, 0, 0.7);\n}\n.navbar.is-warning .navbar-brand > a.navbar-item[data-v-4831c6fe]:hover, .navbar.is-warning .navbar-brand > a.navbar-item.is-active[data-v-4831c6fe],\n    .navbar.is-warning .navbar-brand .navbar-link[data-v-4831c6fe]:hover,\n    .navbar.is-warning .navbar-brand .navbar-link.is-active[data-v-4831c6fe] {\n      background-color: #ffd83d;\n      color: rgba(0, 0, 0, 0.7);\n}\n.navbar.is-warning .navbar-brand .navbar-link[data-v-4831c6fe]::after {\n      border-color: rgba(0, 0, 0, 0.7);\n}\n.navbar.is-warning .navbar-burger[data-v-4831c6fe] {\n      color: rgba(0, 0, 0, 0.7);\n}\n@media screen and (min-width: 1088px) {\n.navbar.is-warning .navbar-start > .navbar-item[data-v-4831c6fe],\n      .navbar.is-warning .navbar-start .navbar-link[data-v-4831c6fe],\n      .navbar.is-warning .navbar-end > .navbar-item[data-v-4831c6fe],\n      .navbar.is-warning .navbar-end .navbar-link[data-v-4831c6fe] {\n        color: rgba(0, 0, 0, 0.7);\n}\n.navbar.is-warning .navbar-start > a.navbar-item[data-v-4831c6fe]:hover, .navbar.is-warning .navbar-start > a.navbar-item.is-active[data-v-4831c6fe],\n      .navbar.is-warning .navbar-start .navbar-link[data-v-4831c6fe]:hover,\n      .navbar.is-warning .navbar-start .navbar-link.is-active[data-v-4831c6fe],\n      .navbar.is-warning .navbar-end > a.navbar-item[data-v-4831c6fe]:hover,\n      .navbar.is-warning .navbar-end > a.navbar-item.is-active[data-v-4831c6fe],\n      .navbar.is-warning .navbar-end .navbar-link[data-v-4831c6fe]:hover,\n      .navbar.is-warning .navbar-end .navbar-link.is-active[data-v-4831c6fe] {\n        background-color: #ffd83d;\n        color: rgba(0, 0, 0, 0.7);\n}\n.navbar.is-warning .navbar-start .navbar-link[data-v-4831c6fe]::after,\n      .navbar.is-warning .navbar-end .navbar-link[data-v-4831c6fe]::after {\n        border-color: rgba(0, 0, 0, 0.7);\n}\n.navbar.is-warning .navbar-item.has-dropdown:hover .navbar-link[data-v-4831c6fe],\n      .navbar.is-warning .navbar-item.has-dropdown.is-active .navbar-link[data-v-4831c6fe] {\n        background-color: #ffd83d;\n        color: rgba(0, 0, 0, 0.7);\n}\n.navbar.is-warning .navbar-dropdown a.navbar-item.is-active[data-v-4831c6fe] {\n        background-color: #ffdd57;\n        color: rgba(0, 0, 0, 0.7);\n}\n}\n.navbar.is-danger[data-v-4831c6fe] {\n    background-color: #ff3860;\n    color: #fff;\n}\n.navbar.is-danger .navbar-brand > .navbar-item[data-v-4831c6fe],\n    .navbar.is-danger .navbar-brand .navbar-link[data-v-4831c6fe] {\n      color: #fff;\n}\n.navbar.is-danger .navbar-brand > a.navbar-item[data-v-4831c6fe]:hover, .navbar.is-danger .navbar-brand > a.navbar-item.is-active[data-v-4831c6fe],\n    .navbar.is-danger .navbar-brand .navbar-link[data-v-4831c6fe]:hover,\n    .navbar.is-danger .navbar-brand .navbar-link.is-active[data-v-4831c6fe] {\n      background-color: #ff1f4b;\n      color: #fff;\n}\n.navbar.is-danger .navbar-brand .navbar-link[data-v-4831c6fe]::after {\n      border-color: #fff;\n}\n.navbar.is-danger .navbar-burger[data-v-4831c6fe] {\n      color: #fff;\n}\n@media screen and (min-width: 1088px) {\n.navbar.is-danger .navbar-start > .navbar-item[data-v-4831c6fe],\n      .navbar.is-danger .navbar-start .navbar-link[data-v-4831c6fe],\n      .navbar.is-danger .navbar-end > .navbar-item[data-v-4831c6fe],\n      .navbar.is-danger .navbar-end .navbar-link[data-v-4831c6fe] {\n        color: #fff;\n}\n.navbar.is-danger .navbar-start > a.navbar-item[data-v-4831c6fe]:hover, .navbar.is-danger .navbar-start > a.navbar-item.is-active[data-v-4831c6fe],\n      .navbar.is-danger .navbar-start .navbar-link[data-v-4831c6fe]:hover,\n      .navbar.is-danger .navbar-start .navbar-link.is-active[data-v-4831c6fe],\n      .navbar.is-danger .navbar-end > a.navbar-item[data-v-4831c6fe]:hover,\n      .navbar.is-danger .navbar-end > a.navbar-item.is-active[data-v-4831c6fe],\n      .navbar.is-danger .navbar-end .navbar-link[data-v-4831c6fe]:hover,\n      .navbar.is-danger .navbar-end .navbar-link.is-active[data-v-4831c6fe] {\n        background-color: #ff1f4b;\n        color: #fff;\n}\n.navbar.is-danger .navbar-start .navbar-link[data-v-4831c6fe]::after,\n      .navbar.is-danger .navbar-end .navbar-link[data-v-4831c6fe]::after {\n        border-color: #fff;\n}\n.navbar.is-danger .navbar-item.has-dropdown:hover .navbar-link[data-v-4831c6fe],\n      .navbar.is-danger .navbar-item.has-dropdown.is-active .navbar-link[data-v-4831c6fe] {\n        background-color: #ff1f4b;\n        color: #fff;\n}\n.navbar.is-danger .navbar-dropdown a.navbar-item.is-active[data-v-4831c6fe] {\n        background-color: #ff3860;\n        color: #fff;\n}\n}\n.navbar > .container[data-v-4831c6fe] {\n    align-items: stretch;\n    display: flex;\n    min-height: 3.25rem;\n    width: 100%;\n}\n.navbar.has-shadow[data-v-4831c6fe] {\n    box-shadow: 0 2px 0 0 whitesmoke;\n}\n.navbar.is-fixed-bottom[data-v-4831c6fe], .navbar.is-fixed-top[data-v-4831c6fe] {\n    left: 0;\n    position: fixed;\n    right: 0;\n    z-index: 30;\n}\n.navbar.is-fixed-bottom[data-v-4831c6fe] {\n    bottom: 0;\n}\n.navbar.is-fixed-bottom.has-shadow[data-v-4831c6fe] {\n      box-shadow: 0 -2px 0 0 whitesmoke;\n}\n.navbar.is-fixed-top[data-v-4831c6fe] {\n    top: 0;\n}\nhtml.has-navbar-fixed-top[data-v-4831c6fe],\nbody.has-navbar-fixed-top[data-v-4831c6fe] {\n  padding-top: 3.25rem;\n}\nhtml.has-navbar-fixed-bottom[data-v-4831c6fe],\nbody.has-navbar-fixed-bottom[data-v-4831c6fe] {\n  padding-bottom: 3.25rem;\n}\n.navbar-brand[data-v-4831c6fe],\n.navbar-tabs[data-v-4831c6fe] {\n  align-items: stretch;\n  display: flex;\n  flex-shrink: 0;\n  min-height: 3.25rem;\n}\n.navbar-brand a.navbar-item[data-v-4831c6fe]:hover {\n  background-color: transparent;\n}\n.navbar-tabs[data-v-4831c6fe] {\n  -webkit-overflow-scrolling: touch;\n  max-width: 100vw;\n  overflow-x: auto;\n  overflow-y: hidden;\n}\n.navbar-burger[data-v-4831c6fe] {\n  color: #4a4a4a;\n  cursor: pointer;\n  display: block;\n  height: 3.25rem;\n  position: relative;\n  width: 3.25rem;\n  margin-left: auto;\n}\n.navbar-burger span[data-v-4831c6fe] {\n    background-color: currentColor;\n    display: block;\n    height: 1px;\n    left: calc(50% - 8px);\n    position: absolute;\n    transform-origin: center;\n    transition-duration: 86ms;\n    transition-property: background-color, opacity, transform;\n    transition-timing-function: ease-out;\n    width: 16px;\n}\n.navbar-burger span[data-v-4831c6fe]:nth-child(1) {\n      top: calc(50% - 6px);\n}\n.navbar-burger span[data-v-4831c6fe]:nth-child(2) {\n      top: calc(50% - 1px);\n}\n.navbar-burger span[data-v-4831c6fe]:nth-child(3) {\n      top: calc(50% + 4px);\n}\n.navbar-burger[data-v-4831c6fe]:hover {\n    background-color: rgba(0, 0, 0, 0.05);\n}\n.navbar-burger.is-active span[data-v-4831c6fe]:nth-child(1) {\n    transform: translateY(5px) rotate(45deg);\n}\n.navbar-burger.is-active span[data-v-4831c6fe]:nth-child(2) {\n    opacity: 0;\n}\n.navbar-burger.is-active span[data-v-4831c6fe]:nth-child(3) {\n    transform: translateY(-5px) rotate(-45deg);\n}\n.navbar-menu[data-v-4831c6fe] {\n  display: none;\n}\n.navbar-item[data-v-4831c6fe],\n.navbar-link[data-v-4831c6fe] {\n  color: #4a4a4a;\n  display: block;\n  line-height: 1.5;\n  padding: 0.5rem 0.75rem;\n  position: relative;\n}\n.navbar-item .icon[data-v-4831c6fe]:only-child,\n  .navbar-link .icon[data-v-4831c6fe]:only-child {\n    margin-left: -0.25rem;\n    margin-right: -0.25rem;\n}\na.navbar-item[data-v-4831c6fe],\n.navbar-link[data-v-4831c6fe] {\n  cursor: pointer;\n}\na.navbar-item[data-v-4831c6fe]:hover, a.navbar-item.is-active[data-v-4831c6fe],\n  .navbar-link[data-v-4831c6fe]:hover,\n  .navbar-link.is-active[data-v-4831c6fe] {\n    background-color: #fafafa;\n    color: #3273dc;\n}\n.navbar-item[data-v-4831c6fe] {\n  display: block;\n  flex-grow: 0;\n  flex-shrink: 0;\n}\n.navbar-item img[data-v-4831c6fe] {\n    max-height: 1.75rem;\n}\n.navbar-item.has-dropdown[data-v-4831c6fe] {\n    padding: 0;\n}\n.navbar-item.is-expanded[data-v-4831c6fe] {\n    flex-grow: 1;\n    flex-shrink: 1;\n}\n.navbar-item.is-tab[data-v-4831c6fe] {\n    border-bottom: 1px solid transparent;\n    min-height: 3.25rem;\n    padding-bottom: calc(0.5rem - 1px);\n}\n.navbar-item.is-tab[data-v-4831c6fe]:hover {\n      background-color: transparent;\n      border-bottom-color: #3273dc;\n}\n.navbar-item.is-tab.is-active[data-v-4831c6fe] {\n      background-color: transparent;\n      border-bottom-color: #3273dc;\n      border-bottom-style: solid;\n      border-bottom-width: 3px;\n      color: #3273dc;\n      padding-bottom: calc(0.5rem - 3px);\n}\n.navbar-content[data-v-4831c6fe] {\n  flex-grow: 1;\n  flex-shrink: 1;\n}\n.navbar-link[data-v-4831c6fe]:not(.is-arrowless) {\n  padding-right: 2.5em;\n}\n.navbar-link[data-v-4831c6fe]:not(.is-arrowless)::after {\n    border-color: #3273dc;\n    margin-top: -0.375em;\n    right: 1.125em;\n}\n.navbar-dropdown[data-v-4831c6fe] {\n  font-size: 0.875rem;\n  padding-bottom: 0.5rem;\n  padding-top: 0.5rem;\n}\n.navbar-dropdown .navbar-item[data-v-4831c6fe] {\n    padding-left: 1.5rem;\n    padding-right: 1.5rem;\n}\n.navbar-divider[data-v-4831c6fe] {\n  background-color: whitesmoke;\n  border: none;\n  display: none;\n  height: 2px;\n  margin: 0.5rem 0;\n}\n@media screen and (max-width: 1087px) {\n.navbar > .container[data-v-4831c6fe] {\n    display: block;\n}\n.navbar-brand .navbar-item[data-v-4831c6fe],\n  .navbar-tabs .navbar-item[data-v-4831c6fe] {\n    align-items: center;\n    display: flex;\n}\n.navbar-link[data-v-4831c6fe]::after {\n    display: none;\n}\n.navbar-menu[data-v-4831c6fe] {\n    background-color: white;\n    box-shadow: 0 8px 16px rgba(10, 10, 10, 0.1);\n    padding: 0.5rem 0;\n}\n.navbar-menu.is-active[data-v-4831c6fe] {\n      display: block;\n}\n.navbar.is-fixed-bottom-touch[data-v-4831c6fe], .navbar.is-fixed-top-touch[data-v-4831c6fe] {\n    left: 0;\n    position: fixed;\n    right: 0;\n    z-index: 30;\n}\n.navbar.is-fixed-bottom-touch[data-v-4831c6fe] {\n    bottom: 0;\n}\n.navbar.is-fixed-bottom-touch.has-shadow[data-v-4831c6fe] {\n      box-shadow: 0 -2px 3px rgba(10, 10, 10, 0.1);\n}\n.navbar.is-fixed-top-touch[data-v-4831c6fe] {\n    top: 0;\n}\n.navbar.is-fixed-top .navbar-menu[data-v-4831c6fe], .navbar.is-fixed-top-touch .navbar-menu[data-v-4831c6fe] {\n    -webkit-overflow-scrolling: touch;\n    max-height: calc(100vh - 3.25rem);\n    overflow: auto;\n}\nhtml.has-navbar-fixed-top-touch[data-v-4831c6fe],\n  body.has-navbar-fixed-top-touch[data-v-4831c6fe] {\n    padding-top: 3.25rem;\n}\nhtml.has-navbar-fixed-bottom-touch[data-v-4831c6fe],\n  body.has-navbar-fixed-bottom-touch[data-v-4831c6fe] {\n    padding-bottom: 3.25rem;\n}\n}\n@media screen and (min-width: 1088px) {\n.navbar[data-v-4831c6fe],\n  .navbar-menu[data-v-4831c6fe],\n  .navbar-start[data-v-4831c6fe],\n  .navbar-end[data-v-4831c6fe] {\n    align-items: stretch;\n    display: flex;\n}\n.navbar[data-v-4831c6fe] {\n    min-height: 3.25rem;\n}\n.navbar.is-spaced[data-v-4831c6fe] {\n      padding: 1rem 2rem;\n}\n.navbar.is-spaced .navbar-start[data-v-4831c6fe],\n      .navbar.is-spaced .navbar-end[data-v-4831c6fe] {\n        align-items: center;\n}\n.navbar.is-spaced a.navbar-item[data-v-4831c6fe],\n      .navbar.is-spaced .navbar-link[data-v-4831c6fe] {\n        border-radius: 4px;\n}\n.navbar.is-transparent a.navbar-item[data-v-4831c6fe]:hover, .navbar.is-transparent a.navbar-item.is-active[data-v-4831c6fe],\n    .navbar.is-transparent .navbar-link[data-v-4831c6fe]:hover,\n    .navbar.is-transparent .navbar-link.is-active[data-v-4831c6fe] {\n      background-color: transparent !important;\n}\n.navbar.is-transparent .navbar-item.has-dropdown.is-active .navbar-link[data-v-4831c6fe], .navbar.is-transparent .navbar-item.has-dropdown.is-hoverable:hover .navbar-link[data-v-4831c6fe] {\n      background-color: transparent !important;\n}\n.navbar.is-transparent .navbar-dropdown a.navbar-item[data-v-4831c6fe]:hover {\n      background-color: whitesmoke;\n      color: #0a0a0a;\n}\n.navbar.is-transparent .navbar-dropdown a.navbar-item.is-active[data-v-4831c6fe] {\n      background-color: whitesmoke;\n      color: #3273dc;\n}\n.navbar-burger[data-v-4831c6fe] {\n    display: none;\n}\n.navbar-item[data-v-4831c6fe],\n  .navbar-link[data-v-4831c6fe] {\n    align-items: center;\n    display: flex;\n}\n.navbar-item[data-v-4831c6fe] {\n    display: flex;\n}\n.navbar-item.has-dropdown[data-v-4831c6fe] {\n      align-items: stretch;\n}\n.navbar-item.has-dropdown-up .navbar-link[data-v-4831c6fe]::after {\n      transform: rotate(135deg) translate(0.25em, -0.25em);\n}\n.navbar-item.has-dropdown-up .navbar-dropdown[data-v-4831c6fe] {\n      border-bottom: 2px solid #dbdbdb;\n      border-radius: 6px 6px 0 0;\n      border-top: none;\n      bottom: 100%;\n      box-shadow: 0 -8px 8px rgba(10, 10, 10, 0.1);\n      top: auto;\n}\n.navbar-item.is-active .navbar-dropdown[data-v-4831c6fe], .navbar-item.is-hoverable:hover .navbar-dropdown[data-v-4831c6fe] {\n      display: block;\n}\n.navbar.is-spaced .navbar-item.is-active .navbar-dropdown[data-v-4831c6fe], .navbar-item.is-active .navbar-dropdown.is-boxed[data-v-4831c6fe], .navbar.is-spaced .navbar-item.is-hoverable:hover .navbar-dropdown[data-v-4831c6fe], .navbar-item.is-hoverable:hover .navbar-dropdown.is-boxed[data-v-4831c6fe] {\n        opacity: 1;\n        pointer-events: auto;\n        transform: translateY(0);\n}\n.navbar-menu[data-v-4831c6fe] {\n    flex-grow: 1;\n    flex-shrink: 0;\n}\n.navbar-start[data-v-4831c6fe] {\n    justify-content: flex-start;\n    margin-right: auto;\n}\n.navbar-end[data-v-4831c6fe] {\n    justify-content: flex-end;\n    margin-left: auto;\n}\n.navbar-dropdown[data-v-4831c6fe] {\n    background-color: white;\n    border-bottom-left-radius: 6px;\n    border-bottom-right-radius: 6px;\n    border-top: 2px solid #dbdbdb;\n    box-shadow: 0 8px 8px rgba(10, 10, 10, 0.1);\n    display: none;\n    font-size: 0.875rem;\n    left: 0;\n    min-width: 100%;\n    position: absolute;\n    top: 100%;\n    z-index: 20;\n}\n.navbar-dropdown .navbar-item[data-v-4831c6fe] {\n      padding: 0.375rem 1rem;\n      white-space: nowrap;\n}\n.navbar-dropdown a.navbar-item[data-v-4831c6fe] {\n      padding-right: 3rem;\n}\n.navbar-dropdown a.navbar-item[data-v-4831c6fe]:hover {\n        background-color: whitesmoke;\n        color: #0a0a0a;\n}\n.navbar-dropdown a.navbar-item.is-active[data-v-4831c6fe] {\n        background-color: whitesmoke;\n        color: #3273dc;\n}\n.navbar.is-spaced .navbar-dropdown[data-v-4831c6fe], .navbar-dropdown.is-boxed[data-v-4831c6fe] {\n      border-radius: 6px;\n      border-top: none;\n      box-shadow: 0 8px 8px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);\n      display: block;\n      opacity: 0;\n      pointer-events: none;\n      top: calc(100% + (-4px));\n      transform: translateY(-5px);\n      transition-duration: 86ms;\n      transition-property: opacity, transform;\n}\n.navbar-dropdown.is-right[data-v-4831c6fe] {\n      left: auto;\n      right: 0;\n}\n.navbar-divider[data-v-4831c6fe] {\n    display: block;\n}\n.navbar > .container .navbar-brand[data-v-4831c6fe],\n  .container > .navbar .navbar-brand[data-v-4831c6fe] {\n    margin-left: -.75rem;\n}\n.navbar > .container .navbar-menu[data-v-4831c6fe],\n  .container > .navbar .navbar-menu[data-v-4831c6fe] {\n    margin-right: -.75rem;\n}\n.navbar.is-fixed-bottom-desktop[data-v-4831c6fe], .navbar.is-fixed-top-desktop[data-v-4831c6fe] {\n    left: 0;\n    position: fixed;\n    right: 0;\n    z-index: 30;\n}\n.navbar.is-fixed-bottom-desktop[data-v-4831c6fe] {\n    bottom: 0;\n}\n.navbar.is-fixed-bottom-desktop.has-shadow[data-v-4831c6fe] {\n      box-shadow: 0 -2px 3px rgba(10, 10, 10, 0.1);\n}\n.navbar.is-fixed-top-desktop[data-v-4831c6fe] {\n    top: 0;\n}\nhtml.has-navbar-fixed-top-desktop[data-v-4831c6fe],\n  body.has-navbar-fixed-top-desktop[data-v-4831c6fe] {\n    padding-top: 3.25rem;\n}\nhtml.has-navbar-fixed-bottom-desktop[data-v-4831c6fe],\n  body.has-navbar-fixed-bottom-desktop[data-v-4831c6fe] {\n    padding-bottom: 3.25rem;\n}\nhtml.has-spaced-navbar-fixed-top[data-v-4831c6fe],\n  body.has-spaced-navbar-fixed-top[data-v-4831c6fe] {\n    padding-top: 5.25rem;\n}\nhtml.has-spaced-navbar-fixed-bottom[data-v-4831c6fe],\n  body.has-spaced-navbar-fixed-bottom[data-v-4831c6fe] {\n    padding-bottom: 5.25rem;\n}\na.navbar-item.is-active[data-v-4831c6fe],\n  .navbar-link.is-active[data-v-4831c6fe] {\n    color: #0a0a0a;\n}\na.navbar-item.is-active[data-v-4831c6fe]:not(:hover),\n  .navbar-link.is-active[data-v-4831c6fe]:not(:hover) {\n    background-color: transparent;\n}\n.navbar-item.has-dropdown:hover .navbar-link[data-v-4831c6fe], .navbar-item.has-dropdown.is-active .navbar-link[data-v-4831c6fe] {\n    background-color: #fafafa;\n}\n}\n.pagination[data-v-4831c6fe] {\n  font-size: 1rem;\n  margin: -0.25rem;\n}\n.pagination.is-small[data-v-4831c6fe] {\n    font-size: 0.75rem;\n}\n.pagination.is-medium[data-v-4831c6fe] {\n    font-size: 1.25rem;\n}\n.pagination.is-large[data-v-4831c6fe] {\n    font-size: 1.5rem;\n}\n.pagination.is-rounded .pagination-previous[data-v-4831c6fe],\n  .pagination.is-rounded .pagination-next[data-v-4831c6fe] {\n    padding-left: 1em;\n    padding-right: 1em;\n    border-radius: 290486px;\n}\n.pagination.is-rounded .pagination-link[data-v-4831c6fe] {\n    border-radius: 290486px;\n}\n.pagination[data-v-4831c6fe],\n.pagination-list[data-v-4831c6fe] {\n  align-items: center;\n  display: flex;\n  justify-content: center;\n  text-align: center;\n}\n.pagination-previous[data-v-4831c6fe],\n.pagination-next[data-v-4831c6fe],\n.pagination-link[data-v-4831c6fe],\n.pagination-ellipsis[data-v-4831c6fe] {\n  font-size: 1em;\n  padding-left: 0.5em;\n  padding-right: 0.5em;\n  justify-content: center;\n  margin: 0.25rem;\n  text-align: center;\n}\n.pagination-previous[data-v-4831c6fe],\n.pagination-next[data-v-4831c6fe],\n.pagination-link[data-v-4831c6fe] {\n  border-color: #dbdbdb;\n  color: #363636;\n  min-width: 2.25em;\n}\n.pagination-previous[data-v-4831c6fe]:hover,\n  .pagination-next[data-v-4831c6fe]:hover,\n  .pagination-link[data-v-4831c6fe]:hover {\n    border-color: #b5b5b5;\n    color: #363636;\n}\n.pagination-previous[data-v-4831c6fe]:focus,\n  .pagination-next[data-v-4831c6fe]:focus,\n  .pagination-link[data-v-4831c6fe]:focus {\n    border-color: #3273dc;\n}\n.pagination-previous[data-v-4831c6fe]:active,\n  .pagination-next[data-v-4831c6fe]:active,\n  .pagination-link[data-v-4831c6fe]:active {\n    box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2);\n}\n.pagination-previous[disabled][data-v-4831c6fe],\n  .pagination-next[disabled][data-v-4831c6fe],\n  .pagination-link[disabled][data-v-4831c6fe] {\n    background-color: #dbdbdb;\n    border-color: #dbdbdb;\n    box-shadow: none;\n    color: #7a7a7a;\n    opacity: 0.5;\n}\n.pagination-previous[data-v-4831c6fe],\n.pagination-next[data-v-4831c6fe] {\n  padding-left: 0.75em;\n  padding-right: 0.75em;\n  white-space: nowrap;\n}\n.pagination-link.is-current[data-v-4831c6fe] {\n  background-color: #3273dc;\n  border-color: #3273dc;\n  color: #fff;\n}\n.pagination-ellipsis[data-v-4831c6fe] {\n  color: #b5b5b5;\n  pointer-events: none;\n}\n.pagination-list[data-v-4831c6fe] {\n  flex-wrap: wrap;\n}\n@media screen and (max-width: 768px) {\n.pagination[data-v-4831c6fe] {\n    flex-wrap: wrap;\n}\n.pagination-previous[data-v-4831c6fe],\n  .pagination-next[data-v-4831c6fe] {\n    flex-grow: 1;\n    flex-shrink: 1;\n}\n.pagination-list li[data-v-4831c6fe] {\n    flex-grow: 1;\n    flex-shrink: 1;\n}\n}\n@media screen and (min-width: 769px), print {\n.pagination-list[data-v-4831c6fe] {\n    flex-grow: 1;\n    flex-shrink: 1;\n    justify-content: flex-start;\n    order: 1;\n}\n.pagination-previous[data-v-4831c6fe] {\n    order: 2;\n}\n.pagination-next[data-v-4831c6fe] {\n    order: 3;\n}\n.pagination[data-v-4831c6fe] {\n    justify-content: space-between;\n}\n.pagination.is-centered .pagination-previous[data-v-4831c6fe] {\n      order: 1;\n}\n.pagination.is-centered .pagination-list[data-v-4831c6fe] {\n      justify-content: center;\n      order: 2;\n}\n.pagination.is-centered .pagination-next[data-v-4831c6fe] {\n      order: 3;\n}\n.pagination.is-right .pagination-previous[data-v-4831c6fe] {\n      order: 1;\n}\n.pagination.is-right .pagination-next[data-v-4831c6fe] {\n      order: 2;\n}\n.pagination.is-right .pagination-list[data-v-4831c6fe] {\n      justify-content: flex-end;\n      order: 3;\n}\n}\n.panel[data-v-4831c6fe] {\n  font-size: 1rem;\n}\n.panel[data-v-4831c6fe]:not(:last-child) {\n    margin-bottom: 1.5rem;\n}\n.panel-heading[data-v-4831c6fe],\n.panel-tabs[data-v-4831c6fe],\n.panel-block[data-v-4831c6fe] {\n  border-bottom: 1px solid #dbdbdb;\n  border-left: 1px solid #dbdbdb;\n  border-right: 1px solid #dbdbdb;\n}\n.panel-heading[data-v-4831c6fe]:first-child,\n  .panel-tabs[data-v-4831c6fe]:first-child,\n  .panel-block[data-v-4831c6fe]:first-child {\n    border-top: 1px solid #dbdbdb;\n}\n.panel-heading[data-v-4831c6fe] {\n  background-color: whitesmoke;\n  border-radius: 4px 4px 0 0;\n  color: #363636;\n  font-size: 1.25em;\n  font-weight: 300;\n  line-height: 1.25;\n  padding: 0.5em 0.75em;\n}\n.panel-tabs[data-v-4831c6fe] {\n  align-items: flex-end;\n  display: flex;\n  font-size: 0.875em;\n  justify-content: center;\n}\n.panel-tabs a[data-v-4831c6fe] {\n    border-bottom: 1px solid #dbdbdb;\n    margin-bottom: -1px;\n    padding: 0.5em;\n}\n.panel-tabs a.is-active[data-v-4831c6fe] {\n      border-bottom-color: #4a4a4a;\n      color: #363636;\n}\n.panel-list a[data-v-4831c6fe] {\n  color: #4a4a4a;\n}\n.panel-list a[data-v-4831c6fe]:hover {\n    color: #3273dc;\n}\n.panel-block[data-v-4831c6fe] {\n  align-items: center;\n  color: #363636;\n  display: flex;\n  justify-content: flex-start;\n  padding: 0.5em 0.75em;\n}\n.panel-block input[type=\"checkbox\"][data-v-4831c6fe] {\n    margin-right: 0.75em;\n}\n.panel-block > .control[data-v-4831c6fe] {\n    flex-grow: 1;\n    flex-shrink: 1;\n    width: 100%;\n}\n.panel-block.is-wrapped[data-v-4831c6fe] {\n    flex-wrap: wrap;\n}\n.panel-block.is-active[data-v-4831c6fe] {\n    border-left-color: #3273dc;\n    color: #363636;\n}\n.panel-block.is-active .panel-icon[data-v-4831c6fe] {\n      color: #3273dc;\n}\na.panel-block[data-v-4831c6fe],\nlabel.panel-block[data-v-4831c6fe] {\n  cursor: pointer;\n}\na.panel-block[data-v-4831c6fe]:hover,\n  label.panel-block[data-v-4831c6fe]:hover {\n    background-color: whitesmoke;\n}\n.panel-icon[data-v-4831c6fe] {\n  display: inline-block;\n  font-size: 14px;\n  height: 1em;\n  line-height: 1em;\n  text-align: center;\n  vertical-align: top;\n  width: 1em;\n  color: #7a7a7a;\n  margin-right: 0.75em;\n}\n.panel-icon .fa[data-v-4831c6fe] {\n    font-size: inherit;\n    line-height: inherit;\n}\n.tabs[data-v-4831c6fe] {\n  -webkit-overflow-scrolling: touch;\n  align-items: stretch;\n  display: flex;\n  font-size: 1rem;\n  justify-content: space-between;\n  overflow: hidden;\n  overflow-x: auto;\n  white-space: nowrap;\n}\n.tabs a[data-v-4831c6fe] {\n    align-items: center;\n    border-bottom-color: #dbdbdb;\n    border-bottom-style: solid;\n    border-bottom-width: 1px;\n    color: #4a4a4a;\n    display: flex;\n    justify-content: center;\n    margin-bottom: -1px;\n    padding: 0.5em 1em;\n    vertical-align: top;\n}\n.tabs a[data-v-4831c6fe]:hover {\n      border-bottom-color: #363636;\n      color: #363636;\n}\n.tabs li[data-v-4831c6fe] {\n    display: block;\n}\n.tabs li.is-active a[data-v-4831c6fe] {\n      border-bottom-color: #3273dc;\n      color: #3273dc;\n}\n.tabs ul[data-v-4831c6fe] {\n    align-items: center;\n    border-bottom-color: #dbdbdb;\n    border-bottom-style: solid;\n    border-bottom-width: 1px;\n    display: flex;\n    flex-grow: 1;\n    flex-shrink: 0;\n    justify-content: flex-start;\n}\n.tabs ul.is-left[data-v-4831c6fe] {\n      padding-right: 0.75em;\n}\n.tabs ul.is-center[data-v-4831c6fe] {\n      flex: none;\n      justify-content: center;\n      padding-left: 0.75em;\n      padding-right: 0.75em;\n}\n.tabs ul.is-right[data-v-4831c6fe] {\n      justify-content: flex-end;\n      padding-left: 0.75em;\n}\n.tabs .icon[data-v-4831c6fe]:first-child {\n    margin-right: 0.5em;\n}\n.tabs .icon[data-v-4831c6fe]:last-child {\n    margin-left: 0.5em;\n}\n.tabs.is-centered ul[data-v-4831c6fe] {\n    justify-content: center;\n}\n.tabs.is-right ul[data-v-4831c6fe] {\n    justify-content: flex-end;\n}\n.tabs.is-boxed a[data-v-4831c6fe] {\n    border: 1px solid transparent;\n    border-radius: 4px 4px 0 0;\n}\n.tabs.is-boxed a[data-v-4831c6fe]:hover {\n      background-color: whitesmoke;\n      border-bottom-color: #dbdbdb;\n}\n.tabs.is-boxed li.is-active a[data-v-4831c6fe] {\n    background-color: white;\n    border-color: #dbdbdb;\n    border-bottom-color: transparent !important;\n}\n.tabs.is-fullwidth li[data-v-4831c6fe] {\n    flex-grow: 1;\n    flex-shrink: 0;\n}\n.tabs.is-toggle a[data-v-4831c6fe] {\n    border-color: #dbdbdb;\n    border-style: solid;\n    border-width: 1px;\n    margin-bottom: 0;\n    position: relative;\n}\n.tabs.is-toggle a[data-v-4831c6fe]:hover {\n      background-color: whitesmoke;\n      border-color: #b5b5b5;\n      z-index: 2;\n}\n.tabs.is-toggle li + li[data-v-4831c6fe] {\n    margin-left: -1px;\n}\n.tabs.is-toggle li:first-child a[data-v-4831c6fe] {\n    border-radius: 4px 0 0 4px;\n}\n.tabs.is-toggle li:last-child a[data-v-4831c6fe] {\n    border-radius: 0 4px 4px 0;\n}\n.tabs.is-toggle li.is-active a[data-v-4831c6fe] {\n    background-color: #3273dc;\n    border-color: #3273dc;\n    color: #fff;\n    z-index: 1;\n}\n.tabs.is-toggle ul[data-v-4831c6fe] {\n    border-bottom: none;\n}\n.tabs.is-toggle.is-toggle-rounded li:first-child a[data-v-4831c6fe] {\n    border-bottom-left-radius: 290486px;\n    border-top-left-radius: 290486px;\n    padding-left: 1.25em;\n}\n.tabs.is-toggle.is-toggle-rounded li:last-child a[data-v-4831c6fe] {\n    border-bottom-right-radius: 290486px;\n    border-top-right-radius: 290486px;\n    padding-right: 1.25em;\n}\n.tabs.is-small[data-v-4831c6fe] {\n    font-size: 0.75rem;\n}\n.tabs.is-medium[data-v-4831c6fe] {\n    font-size: 1.25rem;\n}\n.tabs.is-large[data-v-4831c6fe] {\n    font-size: 1.5rem;\n}\n.column[data-v-4831c6fe] {\n  display: block;\n  flex-basis: 0;\n  flex-grow: 1;\n  flex-shrink: 1;\n  padding: 0.75rem;\n}\n.columns.is-mobile > .column.is-narrow[data-v-4831c6fe] {\n    flex: none;\n}\n.columns.is-mobile > .column.is-full[data-v-4831c6fe] {\n    flex: none;\n    width: 100%;\n}\n.columns.is-mobile > .column.is-three-quarters[data-v-4831c6fe] {\n    flex: none;\n    width: 75%;\n}\n.columns.is-mobile > .column.is-two-thirds[data-v-4831c6fe] {\n    flex: none;\n    width: 66.6666%;\n}\n.columns.is-mobile > .column.is-half[data-v-4831c6fe] {\n    flex: none;\n    width: 50%;\n}\n.columns.is-mobile > .column.is-one-third[data-v-4831c6fe] {\n    flex: none;\n    width: 33.3333%;\n}\n.columns.is-mobile > .column.is-one-quarter[data-v-4831c6fe] {\n    flex: none;\n    width: 25%;\n}\n.columns.is-mobile > .column.is-one-fifth[data-v-4831c6fe] {\n    flex: none;\n    width: 20%;\n}\n.columns.is-mobile > .column.is-two-fifths[data-v-4831c6fe] {\n    flex: none;\n    width: 40%;\n}\n.columns.is-mobile > .column.is-three-fifths[data-v-4831c6fe] {\n    flex: none;\n    width: 60%;\n}\n.columns.is-mobile > .column.is-four-fifths[data-v-4831c6fe] {\n    flex: none;\n    width: 80%;\n}\n.columns.is-mobile > .column.is-offset-three-quarters[data-v-4831c6fe] {\n    margin-left: 75%;\n}\n.columns.is-mobile > .column.is-offset-two-thirds[data-v-4831c6fe] {\n    margin-left: 66.6666%;\n}\n.columns.is-mobile > .column.is-offset-half[data-v-4831c6fe] {\n    margin-left: 50%;\n}\n.columns.is-mobile > .column.is-offset-one-third[data-v-4831c6fe] {\n    margin-left: 33.3333%;\n}\n.columns.is-mobile > .column.is-offset-one-quarter[data-v-4831c6fe] {\n    margin-left: 25%;\n}\n.columns.is-mobile > .column.is-offset-one-fifth[data-v-4831c6fe] {\n    margin-left: 20%;\n}\n.columns.is-mobile > .column.is-offset-two-fifths[data-v-4831c6fe] {\n    margin-left: 40%;\n}\n.columns.is-mobile > .column.is-offset-three-fifths[data-v-4831c6fe] {\n    margin-left: 60%;\n}\n.columns.is-mobile > .column.is-offset-four-fifths[data-v-4831c6fe] {\n    margin-left: 80%;\n}\n.columns.is-mobile > .column.is-1[data-v-4831c6fe] {\n    flex: none;\n    width: 8.33333%;\n}\n.columns.is-mobile > .column.is-offset-1[data-v-4831c6fe] {\n    margin-left: 8.33333%;\n}\n.columns.is-mobile > .column.is-2[data-v-4831c6fe] {\n    flex: none;\n    width: 16.66667%;\n}\n.columns.is-mobile > .column.is-offset-2[data-v-4831c6fe] {\n    margin-left: 16.66667%;\n}\n.columns.is-mobile > .column.is-3[data-v-4831c6fe] {\n    flex: none;\n    width: 25%;\n}\n.columns.is-mobile > .column.is-offset-3[data-v-4831c6fe] {\n    margin-left: 25%;\n}\n.columns.is-mobile > .column.is-4[data-v-4831c6fe] {\n    flex: none;\n    width: 33.33333%;\n}\n.columns.is-mobile > .column.is-offset-4[data-v-4831c6fe] {\n    margin-left: 33.33333%;\n}\n.columns.is-mobile > .column.is-5[data-v-4831c6fe] {\n    flex: none;\n    width: 41.66667%;\n}\n.columns.is-mobile > .column.is-offset-5[data-v-4831c6fe] {\n    margin-left: 41.66667%;\n}\n.columns.is-mobile > .column.is-6[data-v-4831c6fe] {\n    flex: none;\n    width: 50%;\n}\n.columns.is-mobile > .column.is-offset-6[data-v-4831c6fe] {\n    margin-left: 50%;\n}\n.columns.is-mobile > .column.is-7[data-v-4831c6fe] {\n    flex: none;\n    width: 58.33333%;\n}\n.columns.is-mobile > .column.is-offset-7[data-v-4831c6fe] {\n    margin-left: 58.33333%;\n}\n.columns.is-mobile > .column.is-8[data-v-4831c6fe] {\n    flex: none;\n    width: 66.66667%;\n}\n.columns.is-mobile > .column.is-offset-8[data-v-4831c6fe] {\n    margin-left: 66.66667%;\n}\n.columns.is-mobile > .column.is-9[data-v-4831c6fe] {\n    flex: none;\n    width: 75%;\n}\n.columns.is-mobile > .column.is-offset-9[data-v-4831c6fe] {\n    margin-left: 75%;\n}\n.columns.is-mobile > .column.is-10[data-v-4831c6fe] {\n    flex: none;\n    width: 83.33333%;\n}\n.columns.is-mobile > .column.is-offset-10[data-v-4831c6fe] {\n    margin-left: 83.33333%;\n}\n.columns.is-mobile > .column.is-11[data-v-4831c6fe] {\n    flex: none;\n    width: 91.66667%;\n}\n.columns.is-mobile > .column.is-offset-11[data-v-4831c6fe] {\n    margin-left: 91.66667%;\n}\n.columns.is-mobile > .column.is-12[data-v-4831c6fe] {\n    flex: none;\n    width: 100%;\n}\n.columns.is-mobile > .column.is-offset-12[data-v-4831c6fe] {\n    margin-left: 100%;\n}\n@media screen and (max-width: 768px) {\n.column.is-narrow-mobile[data-v-4831c6fe] {\n      flex: none;\n}\n.column.is-full-mobile[data-v-4831c6fe] {\n      flex: none;\n      width: 100%;\n}\n.column.is-three-quarters-mobile[data-v-4831c6fe] {\n      flex: none;\n      width: 75%;\n}\n.column.is-two-thirds-mobile[data-v-4831c6fe] {\n      flex: none;\n      width: 66.6666%;\n}\n.column.is-half-mobile[data-v-4831c6fe] {\n      flex: none;\n      width: 50%;\n}\n.column.is-one-third-mobile[data-v-4831c6fe] {\n      flex: none;\n      width: 33.3333%;\n}\n.column.is-one-quarter-mobile[data-v-4831c6fe] {\n      flex: none;\n      width: 25%;\n}\n.column.is-one-fifth-mobile[data-v-4831c6fe] {\n      flex: none;\n      width: 20%;\n}\n.column.is-two-fifths-mobile[data-v-4831c6fe] {\n      flex: none;\n      width: 40%;\n}\n.column.is-three-fifths-mobile[data-v-4831c6fe] {\n      flex: none;\n      width: 60%;\n}\n.column.is-four-fifths-mobile[data-v-4831c6fe] {\n      flex: none;\n      width: 80%;\n}\n.column.is-offset-three-quarters-mobile[data-v-4831c6fe] {\n      margin-left: 75%;\n}\n.column.is-offset-two-thirds-mobile[data-v-4831c6fe] {\n      margin-left: 66.6666%;\n}\n.column.is-offset-half-mobile[data-v-4831c6fe] {\n      margin-left: 50%;\n}\n.column.is-offset-one-third-mobile[data-v-4831c6fe] {\n      margin-left: 33.3333%;\n}\n.column.is-offset-one-quarter-mobile[data-v-4831c6fe] {\n      margin-left: 25%;\n}\n.column.is-offset-one-fifth-mobile[data-v-4831c6fe] {\n      margin-left: 20%;\n}\n.column.is-offset-two-fifths-mobile[data-v-4831c6fe] {\n      margin-left: 40%;\n}\n.column.is-offset-three-fifths-mobile[data-v-4831c6fe] {\n      margin-left: 60%;\n}\n.column.is-offset-four-fifths-mobile[data-v-4831c6fe] {\n      margin-left: 80%;\n}\n.column.is-1-mobile[data-v-4831c6fe] {\n      flex: none;\n      width: 8.33333%;\n}\n.column.is-offset-1-mobile[data-v-4831c6fe] {\n      margin-left: 8.33333%;\n}\n.column.is-2-mobile[data-v-4831c6fe] {\n      flex: none;\n      width: 16.66667%;\n}\n.column.is-offset-2-mobile[data-v-4831c6fe] {\n      margin-left: 16.66667%;\n}\n.column.is-3-mobile[data-v-4831c6fe] {\n      flex: none;\n      width: 25%;\n}\n.column.is-offset-3-mobile[data-v-4831c6fe] {\n      margin-left: 25%;\n}\n.column.is-4-mobile[data-v-4831c6fe] {\n      flex: none;\n      width: 33.33333%;\n}\n.column.is-offset-4-mobile[data-v-4831c6fe] {\n      margin-left: 33.33333%;\n}\n.column.is-5-mobile[data-v-4831c6fe] {\n      flex: none;\n      width: 41.66667%;\n}\n.column.is-offset-5-mobile[data-v-4831c6fe] {\n      margin-left: 41.66667%;\n}\n.column.is-6-mobile[data-v-4831c6fe] {\n      flex: none;\n      width: 50%;\n}\n.column.is-offset-6-mobile[data-v-4831c6fe] {\n      margin-left: 50%;\n}\n.column.is-7-mobile[data-v-4831c6fe] {\n      flex: none;\n      width: 58.33333%;\n}\n.column.is-offset-7-mobile[data-v-4831c6fe] {\n      margin-left: 58.33333%;\n}\n.column.is-8-mobile[data-v-4831c6fe] {\n      flex: none;\n      width: 66.66667%;\n}\n.column.is-offset-8-mobile[data-v-4831c6fe] {\n      margin-left: 66.66667%;\n}\n.column.is-9-mobile[data-v-4831c6fe] {\n      flex: none;\n      width: 75%;\n}\n.column.is-offset-9-mobile[data-v-4831c6fe] {\n      margin-left: 75%;\n}\n.column.is-10-mobile[data-v-4831c6fe] {\n      flex: none;\n      width: 83.33333%;\n}\n.column.is-offset-10-mobile[data-v-4831c6fe] {\n      margin-left: 83.33333%;\n}\n.column.is-11-mobile[data-v-4831c6fe] {\n      flex: none;\n      width: 91.66667%;\n}\n.column.is-offset-11-mobile[data-v-4831c6fe] {\n      margin-left: 91.66667%;\n}\n.column.is-12-mobile[data-v-4831c6fe] {\n      flex: none;\n      width: 100%;\n}\n.column.is-offset-12-mobile[data-v-4831c6fe] {\n      margin-left: 100%;\n}\n}\n@media screen and (min-width: 769px), print {\n.column.is-narrow[data-v-4831c6fe], .column.is-narrow-tablet[data-v-4831c6fe] {\n      flex: none;\n}\n.column.is-full[data-v-4831c6fe], .column.is-full-tablet[data-v-4831c6fe] {\n      flex: none;\n      width: 100%;\n}\n.column.is-three-quarters[data-v-4831c6fe], .column.is-three-quarters-tablet[data-v-4831c6fe] {\n      flex: none;\n      width: 75%;\n}\n.column.is-two-thirds[data-v-4831c6fe], .column.is-two-thirds-tablet[data-v-4831c6fe] {\n      flex: none;\n      width: 66.6666%;\n}\n.column.is-half[data-v-4831c6fe], .column.is-half-tablet[data-v-4831c6fe] {\n      flex: none;\n      width: 50%;\n}\n.column.is-one-third[data-v-4831c6fe], .column.is-one-third-tablet[data-v-4831c6fe] {\n      flex: none;\n      width: 33.3333%;\n}\n.column.is-one-quarter[data-v-4831c6fe], .column.is-one-quarter-tablet[data-v-4831c6fe] {\n      flex: none;\n      width: 25%;\n}\n.column.is-one-fifth[data-v-4831c6fe], .column.is-one-fifth-tablet[data-v-4831c6fe] {\n      flex: none;\n      width: 20%;\n}\n.column.is-two-fifths[data-v-4831c6fe], .column.is-two-fifths-tablet[data-v-4831c6fe] {\n      flex: none;\n      width: 40%;\n}\n.column.is-three-fifths[data-v-4831c6fe], .column.is-three-fifths-tablet[data-v-4831c6fe] {\n      flex: none;\n      width: 60%;\n}\n.column.is-four-fifths[data-v-4831c6fe], .column.is-four-fifths-tablet[data-v-4831c6fe] {\n      flex: none;\n      width: 80%;\n}\n.column.is-offset-three-quarters[data-v-4831c6fe], .column.is-offset-three-quarters-tablet[data-v-4831c6fe] {\n      margin-left: 75%;\n}\n.column.is-offset-two-thirds[data-v-4831c6fe], .column.is-offset-two-thirds-tablet[data-v-4831c6fe] {\n      margin-left: 66.6666%;\n}\n.column.is-offset-half[data-v-4831c6fe], .column.is-offset-half-tablet[data-v-4831c6fe] {\n      margin-left: 50%;\n}\n.column.is-offset-one-third[data-v-4831c6fe], .column.is-offset-one-third-tablet[data-v-4831c6fe] {\n      margin-left: 33.3333%;\n}\n.column.is-offset-one-quarter[data-v-4831c6fe], .column.is-offset-one-quarter-tablet[data-v-4831c6fe] {\n      margin-left: 25%;\n}\n.column.is-offset-one-fifth[data-v-4831c6fe], .column.is-offset-one-fifth-tablet[data-v-4831c6fe] {\n      margin-left: 20%;\n}\n.column.is-offset-two-fifths[data-v-4831c6fe], .column.is-offset-two-fifths-tablet[data-v-4831c6fe] {\n      margin-left: 40%;\n}\n.column.is-offset-three-fifths[data-v-4831c6fe], .column.is-offset-three-fifths-tablet[data-v-4831c6fe] {\n      margin-left: 60%;\n}\n.column.is-offset-four-fifths[data-v-4831c6fe], .column.is-offset-four-fifths-tablet[data-v-4831c6fe] {\n      margin-left: 80%;\n}\n.column.is-1[data-v-4831c6fe], .column.is-1-tablet[data-v-4831c6fe] {\n      flex: none;\n      width: 8.33333%;\n}\n.column.is-offset-1[data-v-4831c6fe], .column.is-offset-1-tablet[data-v-4831c6fe] {\n      margin-left: 8.33333%;\n}\n.column.is-2[data-v-4831c6fe], .column.is-2-tablet[data-v-4831c6fe] {\n      flex: none;\n      width: 16.66667%;\n}\n.column.is-offset-2[data-v-4831c6fe], .column.is-offset-2-tablet[data-v-4831c6fe] {\n      margin-left: 16.66667%;\n}\n.column.is-3[data-v-4831c6fe], .column.is-3-tablet[data-v-4831c6fe] {\n      flex: none;\n      width: 25%;\n}\n.column.is-offset-3[data-v-4831c6fe], .column.is-offset-3-tablet[data-v-4831c6fe] {\n      margin-left: 25%;\n}\n.column.is-4[data-v-4831c6fe], .column.is-4-tablet[data-v-4831c6fe] {\n      flex: none;\n      width: 33.33333%;\n}\n.column.is-offset-4[data-v-4831c6fe], .column.is-offset-4-tablet[data-v-4831c6fe] {\n      margin-left: 33.33333%;\n}\n.column.is-5[data-v-4831c6fe], .column.is-5-tablet[data-v-4831c6fe] {\n      flex: none;\n      width: 41.66667%;\n}\n.column.is-offset-5[data-v-4831c6fe], .column.is-offset-5-tablet[data-v-4831c6fe] {\n      margin-left: 41.66667%;\n}\n.column.is-6[data-v-4831c6fe], .column.is-6-tablet[data-v-4831c6fe] {\n      flex: none;\n      width: 50%;\n}\n.column.is-offset-6[data-v-4831c6fe], .column.is-offset-6-tablet[data-v-4831c6fe] {\n      margin-left: 50%;\n}\n.column.is-7[data-v-4831c6fe], .column.is-7-tablet[data-v-4831c6fe] {\n      flex: none;\n      width: 58.33333%;\n}\n.column.is-offset-7[data-v-4831c6fe], .column.is-offset-7-tablet[data-v-4831c6fe] {\n      margin-left: 58.33333%;\n}\n.column.is-8[data-v-4831c6fe], .column.is-8-tablet[data-v-4831c6fe] {\n      flex: none;\n      width: 66.66667%;\n}\n.column.is-offset-8[data-v-4831c6fe], .column.is-offset-8-tablet[data-v-4831c6fe] {\n      margin-left: 66.66667%;\n}\n.column.is-9[data-v-4831c6fe], .column.is-9-tablet[data-v-4831c6fe] {\n      flex: none;\n      width: 75%;\n}\n.column.is-offset-9[data-v-4831c6fe], .column.is-offset-9-tablet[data-v-4831c6fe] {\n      margin-left: 75%;\n}\n.column.is-10[data-v-4831c6fe], .column.is-10-tablet[data-v-4831c6fe] {\n      flex: none;\n      width: 83.33333%;\n}\n.column.is-offset-10[data-v-4831c6fe], .column.is-offset-10-tablet[data-v-4831c6fe] {\n      margin-left: 83.33333%;\n}\n.column.is-11[data-v-4831c6fe], .column.is-11-tablet[data-v-4831c6fe] {\n      flex: none;\n      width: 91.66667%;\n}\n.column.is-offset-11[data-v-4831c6fe], .column.is-offset-11-tablet[data-v-4831c6fe] {\n      margin-left: 91.66667%;\n}\n.column.is-12[data-v-4831c6fe], .column.is-12-tablet[data-v-4831c6fe] {\n      flex: none;\n      width: 100%;\n}\n.column.is-offset-12[data-v-4831c6fe], .column.is-offset-12-tablet[data-v-4831c6fe] {\n      margin-left: 100%;\n}\n}\n@media screen and (max-width: 1087px) {\n.column.is-narrow-touch[data-v-4831c6fe] {\n      flex: none;\n}\n.column.is-full-touch[data-v-4831c6fe] {\n      flex: none;\n      width: 100%;\n}\n.column.is-three-quarters-touch[data-v-4831c6fe] {\n      flex: none;\n      width: 75%;\n}\n.column.is-two-thirds-touch[data-v-4831c6fe] {\n      flex: none;\n      width: 66.6666%;\n}\n.column.is-half-touch[data-v-4831c6fe] {\n      flex: none;\n      width: 50%;\n}\n.column.is-one-third-touch[data-v-4831c6fe] {\n      flex: none;\n      width: 33.3333%;\n}\n.column.is-one-quarter-touch[data-v-4831c6fe] {\n      flex: none;\n      width: 25%;\n}\n.column.is-one-fifth-touch[data-v-4831c6fe] {\n      flex: none;\n      width: 20%;\n}\n.column.is-two-fifths-touch[data-v-4831c6fe] {\n      flex: none;\n      width: 40%;\n}\n.column.is-three-fifths-touch[data-v-4831c6fe] {\n      flex: none;\n      width: 60%;\n}\n.column.is-four-fifths-touch[data-v-4831c6fe] {\n      flex: none;\n      width: 80%;\n}\n.column.is-offset-three-quarters-touch[data-v-4831c6fe] {\n      margin-left: 75%;\n}\n.column.is-offset-two-thirds-touch[data-v-4831c6fe] {\n      margin-left: 66.6666%;\n}\n.column.is-offset-half-touch[data-v-4831c6fe] {\n      margin-left: 50%;\n}\n.column.is-offset-one-third-touch[data-v-4831c6fe] {\n      margin-left: 33.3333%;\n}\n.column.is-offset-one-quarter-touch[data-v-4831c6fe] {\n      margin-left: 25%;\n}\n.column.is-offset-one-fifth-touch[data-v-4831c6fe] {\n      margin-left: 20%;\n}\n.column.is-offset-two-fifths-touch[data-v-4831c6fe] {\n      margin-left: 40%;\n}\n.column.is-offset-three-fifths-touch[data-v-4831c6fe] {\n      margin-left: 60%;\n}\n.column.is-offset-four-fifths-touch[data-v-4831c6fe] {\n      margin-left: 80%;\n}\n.column.is-1-touch[data-v-4831c6fe] {\n      flex: none;\n      width: 8.33333%;\n}\n.column.is-offset-1-touch[data-v-4831c6fe] {\n      margin-left: 8.33333%;\n}\n.column.is-2-touch[data-v-4831c6fe] {\n      flex: none;\n      width: 16.66667%;\n}\n.column.is-offset-2-touch[data-v-4831c6fe] {\n      margin-left: 16.66667%;\n}\n.column.is-3-touch[data-v-4831c6fe] {\n      flex: none;\n      width: 25%;\n}\n.column.is-offset-3-touch[data-v-4831c6fe] {\n      margin-left: 25%;\n}\n.column.is-4-touch[data-v-4831c6fe] {\n      flex: none;\n      width: 33.33333%;\n}\n.column.is-offset-4-touch[data-v-4831c6fe] {\n      margin-left: 33.33333%;\n}\n.column.is-5-touch[data-v-4831c6fe] {\n      flex: none;\n      width: 41.66667%;\n}\n.column.is-offset-5-touch[data-v-4831c6fe] {\n      margin-left: 41.66667%;\n}\n.column.is-6-touch[data-v-4831c6fe] {\n      flex: none;\n      width: 50%;\n}\n.column.is-offset-6-touch[data-v-4831c6fe] {\n      margin-left: 50%;\n}\n.column.is-7-touch[data-v-4831c6fe] {\n      flex: none;\n      width: 58.33333%;\n}\n.column.is-offset-7-touch[data-v-4831c6fe] {\n      margin-left: 58.33333%;\n}\n.column.is-8-touch[data-v-4831c6fe] {\n      flex: none;\n      width: 66.66667%;\n}\n.column.is-offset-8-touch[data-v-4831c6fe] {\n      margin-left: 66.66667%;\n}\n.column.is-9-touch[data-v-4831c6fe] {\n      flex: none;\n      width: 75%;\n}\n.column.is-offset-9-touch[data-v-4831c6fe] {\n      margin-left: 75%;\n}\n.column.is-10-touch[data-v-4831c6fe] {\n      flex: none;\n      width: 83.33333%;\n}\n.column.is-offset-10-touch[data-v-4831c6fe] {\n      margin-left: 83.33333%;\n}\n.column.is-11-touch[data-v-4831c6fe] {\n      flex: none;\n      width: 91.66667%;\n}\n.column.is-offset-11-touch[data-v-4831c6fe] {\n      margin-left: 91.66667%;\n}\n.column.is-12-touch[data-v-4831c6fe] {\n      flex: none;\n      width: 100%;\n}\n.column.is-offset-12-touch[data-v-4831c6fe] {\n      margin-left: 100%;\n}\n}\n@media screen and (min-width: 1088px) {\n.column.is-narrow-desktop[data-v-4831c6fe] {\n      flex: none;\n}\n.column.is-full-desktop[data-v-4831c6fe] {\n      flex: none;\n      width: 100%;\n}\n.column.is-three-quarters-desktop[data-v-4831c6fe] {\n      flex: none;\n      width: 75%;\n}\n.column.is-two-thirds-desktop[data-v-4831c6fe] {\n      flex: none;\n      width: 66.6666%;\n}\n.column.is-half-desktop[data-v-4831c6fe] {\n      flex: none;\n      width: 50%;\n}\n.column.is-one-third-desktop[data-v-4831c6fe] {\n      flex: none;\n      width: 33.3333%;\n}\n.column.is-one-quarter-desktop[data-v-4831c6fe] {\n      flex: none;\n      width: 25%;\n}\n.column.is-one-fifth-desktop[data-v-4831c6fe] {\n      flex: none;\n      width: 20%;\n}\n.column.is-two-fifths-desktop[data-v-4831c6fe] {\n      flex: none;\n      width: 40%;\n}\n.column.is-three-fifths-desktop[data-v-4831c6fe] {\n      flex: none;\n      width: 60%;\n}\n.column.is-four-fifths-desktop[data-v-4831c6fe] {\n      flex: none;\n      width: 80%;\n}\n.column.is-offset-three-quarters-desktop[data-v-4831c6fe] {\n      margin-left: 75%;\n}\n.column.is-offset-two-thirds-desktop[data-v-4831c6fe] {\n      margin-left: 66.6666%;\n}\n.column.is-offset-half-desktop[data-v-4831c6fe] {\n      margin-left: 50%;\n}\n.column.is-offset-one-third-desktop[data-v-4831c6fe] {\n      margin-left: 33.3333%;\n}\n.column.is-offset-one-quarter-desktop[data-v-4831c6fe] {\n      margin-left: 25%;\n}\n.column.is-offset-one-fifth-desktop[data-v-4831c6fe] {\n      margin-left: 20%;\n}\n.column.is-offset-two-fifths-desktop[data-v-4831c6fe] {\n      margin-left: 40%;\n}\n.column.is-offset-three-fifths-desktop[data-v-4831c6fe] {\n      margin-left: 60%;\n}\n.column.is-offset-four-fifths-desktop[data-v-4831c6fe] {\n      margin-left: 80%;\n}\n.column.is-1-desktop[data-v-4831c6fe] {\n      flex: none;\n      width: 8.33333%;\n}\n.column.is-offset-1-desktop[data-v-4831c6fe] {\n      margin-left: 8.33333%;\n}\n.column.is-2-desktop[data-v-4831c6fe] {\n      flex: none;\n      width: 16.66667%;\n}\n.column.is-offset-2-desktop[data-v-4831c6fe] {\n      margin-left: 16.66667%;\n}\n.column.is-3-desktop[data-v-4831c6fe] {\n      flex: none;\n      width: 25%;\n}\n.column.is-offset-3-desktop[data-v-4831c6fe] {\n      margin-left: 25%;\n}\n.column.is-4-desktop[data-v-4831c6fe] {\n      flex: none;\n      width: 33.33333%;\n}\n.column.is-offset-4-desktop[data-v-4831c6fe] {\n      margin-left: 33.33333%;\n}\n.column.is-5-desktop[data-v-4831c6fe] {\n      flex: none;\n      width: 41.66667%;\n}\n.column.is-offset-5-desktop[data-v-4831c6fe] {\n      margin-left: 41.66667%;\n}\n.column.is-6-desktop[data-v-4831c6fe] {\n      flex: none;\n      width: 50%;\n}\n.column.is-offset-6-desktop[data-v-4831c6fe] {\n      margin-left: 50%;\n}\n.column.is-7-desktop[data-v-4831c6fe] {\n      flex: none;\n      width: 58.33333%;\n}\n.column.is-offset-7-desktop[data-v-4831c6fe] {\n      margin-left: 58.33333%;\n}\n.column.is-8-desktop[data-v-4831c6fe] {\n      flex: none;\n      width: 66.66667%;\n}\n.column.is-offset-8-desktop[data-v-4831c6fe] {\n      margin-left: 66.66667%;\n}\n.column.is-9-desktop[data-v-4831c6fe] {\n      flex: none;\n      width: 75%;\n}\n.column.is-offset-9-desktop[data-v-4831c6fe] {\n      margin-left: 75%;\n}\n.column.is-10-desktop[data-v-4831c6fe] {\n      flex: none;\n      width: 83.33333%;\n}\n.column.is-offset-10-desktop[data-v-4831c6fe] {\n      margin-left: 83.33333%;\n}\n.column.is-11-desktop[data-v-4831c6fe] {\n      flex: none;\n      width: 91.66667%;\n}\n.column.is-offset-11-desktop[data-v-4831c6fe] {\n      margin-left: 91.66667%;\n}\n.column.is-12-desktop[data-v-4831c6fe] {\n      flex: none;\n      width: 100%;\n}\n.column.is-offset-12-desktop[data-v-4831c6fe] {\n      margin-left: 100%;\n}\n}\n@media screen and (min-width: 1280px) {\n.column.is-narrow-widescreen[data-v-4831c6fe] {\n      flex: none;\n}\n.column.is-full-widescreen[data-v-4831c6fe] {\n      flex: none;\n      width: 100%;\n}\n.column.is-three-quarters-widescreen[data-v-4831c6fe] {\n      flex: none;\n      width: 75%;\n}\n.column.is-two-thirds-widescreen[data-v-4831c6fe] {\n      flex: none;\n      width: 66.6666%;\n}\n.column.is-half-widescreen[data-v-4831c6fe] {\n      flex: none;\n      width: 50%;\n}\n.column.is-one-third-widescreen[data-v-4831c6fe] {\n      flex: none;\n      width: 33.3333%;\n}\n.column.is-one-quarter-widescreen[data-v-4831c6fe] {\n      flex: none;\n      width: 25%;\n}\n.column.is-one-fifth-widescreen[data-v-4831c6fe] {\n      flex: none;\n      width: 20%;\n}\n.column.is-two-fifths-widescreen[data-v-4831c6fe] {\n      flex: none;\n      width: 40%;\n}\n.column.is-three-fifths-widescreen[data-v-4831c6fe] {\n      flex: none;\n      width: 60%;\n}\n.column.is-four-fifths-widescreen[data-v-4831c6fe] {\n      flex: none;\n      width: 80%;\n}\n.column.is-offset-three-quarters-widescreen[data-v-4831c6fe] {\n      margin-left: 75%;\n}\n.column.is-offset-two-thirds-widescreen[data-v-4831c6fe] {\n      margin-left: 66.6666%;\n}\n.column.is-offset-half-widescreen[data-v-4831c6fe] {\n      margin-left: 50%;\n}\n.column.is-offset-one-third-widescreen[data-v-4831c6fe] {\n      margin-left: 33.3333%;\n}\n.column.is-offset-one-quarter-widescreen[data-v-4831c6fe] {\n      margin-left: 25%;\n}\n.column.is-offset-one-fifth-widescreen[data-v-4831c6fe] {\n      margin-left: 20%;\n}\n.column.is-offset-two-fifths-widescreen[data-v-4831c6fe] {\n      margin-left: 40%;\n}\n.column.is-offset-three-fifths-widescreen[data-v-4831c6fe] {\n      margin-left: 60%;\n}\n.column.is-offset-four-fifths-widescreen[data-v-4831c6fe] {\n      margin-left: 80%;\n}\n.column.is-1-widescreen[data-v-4831c6fe] {\n      flex: none;\n      width: 8.33333%;\n}\n.column.is-offset-1-widescreen[data-v-4831c6fe] {\n      margin-left: 8.33333%;\n}\n.column.is-2-widescreen[data-v-4831c6fe] {\n      flex: none;\n      width: 16.66667%;\n}\n.column.is-offset-2-widescreen[data-v-4831c6fe] {\n      margin-left: 16.66667%;\n}\n.column.is-3-widescreen[data-v-4831c6fe] {\n      flex: none;\n      width: 25%;\n}\n.column.is-offset-3-widescreen[data-v-4831c6fe] {\n      margin-left: 25%;\n}\n.column.is-4-widescreen[data-v-4831c6fe] {\n      flex: none;\n      width: 33.33333%;\n}\n.column.is-offset-4-widescreen[data-v-4831c6fe] {\n      margin-left: 33.33333%;\n}\n.column.is-5-widescreen[data-v-4831c6fe] {\n      flex: none;\n      width: 41.66667%;\n}\n.column.is-offset-5-widescreen[data-v-4831c6fe] {\n      margin-left: 41.66667%;\n}\n.column.is-6-widescreen[data-v-4831c6fe] {\n      flex: none;\n      width: 50%;\n}\n.column.is-offset-6-widescreen[data-v-4831c6fe] {\n      margin-left: 50%;\n}\n.column.is-7-widescreen[data-v-4831c6fe] {\n      flex: none;\n      width: 58.33333%;\n}\n.column.is-offset-7-widescreen[data-v-4831c6fe] {\n      margin-left: 58.33333%;\n}\n.column.is-8-widescreen[data-v-4831c6fe] {\n      flex: none;\n      width: 66.66667%;\n}\n.column.is-offset-8-widescreen[data-v-4831c6fe] {\n      margin-left: 66.66667%;\n}\n.column.is-9-widescreen[data-v-4831c6fe] {\n      flex: none;\n      width: 75%;\n}\n.column.is-offset-9-widescreen[data-v-4831c6fe] {\n      margin-left: 75%;\n}\n.column.is-10-widescreen[data-v-4831c6fe] {\n      flex: none;\n      width: 83.33333%;\n}\n.column.is-offset-10-widescreen[data-v-4831c6fe] {\n      margin-left: 83.33333%;\n}\n.column.is-11-widescreen[data-v-4831c6fe] {\n      flex: none;\n      width: 91.66667%;\n}\n.column.is-offset-11-widescreen[data-v-4831c6fe] {\n      margin-left: 91.66667%;\n}\n.column.is-12-widescreen[data-v-4831c6fe] {\n      flex: none;\n      width: 100%;\n}\n.column.is-offset-12-widescreen[data-v-4831c6fe] {\n      margin-left: 100%;\n}\n}\n@media screen and (min-width: 1472px) {\n.column.is-narrow-fullhd[data-v-4831c6fe] {\n      flex: none;\n}\n.column.is-full-fullhd[data-v-4831c6fe] {\n      flex: none;\n      width: 100%;\n}\n.column.is-three-quarters-fullhd[data-v-4831c6fe] {\n      flex: none;\n      width: 75%;\n}\n.column.is-two-thirds-fullhd[data-v-4831c6fe] {\n      flex: none;\n      width: 66.6666%;\n}\n.column.is-half-fullhd[data-v-4831c6fe] {\n      flex: none;\n      width: 50%;\n}\n.column.is-one-third-fullhd[data-v-4831c6fe] {\n      flex: none;\n      width: 33.3333%;\n}\n.column.is-one-quarter-fullhd[data-v-4831c6fe] {\n      flex: none;\n      width: 25%;\n}\n.column.is-one-fifth-fullhd[data-v-4831c6fe] {\n      flex: none;\n      width: 20%;\n}\n.column.is-two-fifths-fullhd[data-v-4831c6fe] {\n      flex: none;\n      width: 40%;\n}\n.column.is-three-fifths-fullhd[data-v-4831c6fe] {\n      flex: none;\n      width: 60%;\n}\n.column.is-four-fifths-fullhd[data-v-4831c6fe] {\n      flex: none;\n      width: 80%;\n}\n.column.is-offset-three-quarters-fullhd[data-v-4831c6fe] {\n      margin-left: 75%;\n}\n.column.is-offset-two-thirds-fullhd[data-v-4831c6fe] {\n      margin-left: 66.6666%;\n}\n.column.is-offset-half-fullhd[data-v-4831c6fe] {\n      margin-left: 50%;\n}\n.column.is-offset-one-third-fullhd[data-v-4831c6fe] {\n      margin-left: 33.3333%;\n}\n.column.is-offset-one-quarter-fullhd[data-v-4831c6fe] {\n      margin-left: 25%;\n}\n.column.is-offset-one-fifth-fullhd[data-v-4831c6fe] {\n      margin-left: 20%;\n}\n.column.is-offset-two-fifths-fullhd[data-v-4831c6fe] {\n      margin-left: 40%;\n}\n.column.is-offset-three-fifths-fullhd[data-v-4831c6fe] {\n      margin-left: 60%;\n}\n.column.is-offset-four-fifths-fullhd[data-v-4831c6fe] {\n      margin-left: 80%;\n}\n.column.is-1-fullhd[data-v-4831c6fe] {\n      flex: none;\n      width: 8.33333%;\n}\n.column.is-offset-1-fullhd[data-v-4831c6fe] {\n      margin-left: 8.33333%;\n}\n.column.is-2-fullhd[data-v-4831c6fe] {\n      flex: none;\n      width: 16.66667%;\n}\n.column.is-offset-2-fullhd[data-v-4831c6fe] {\n      margin-left: 16.66667%;\n}\n.column.is-3-fullhd[data-v-4831c6fe] {\n      flex: none;\n      width: 25%;\n}\n.column.is-offset-3-fullhd[data-v-4831c6fe] {\n      margin-left: 25%;\n}\n.column.is-4-fullhd[data-v-4831c6fe] {\n      flex: none;\n      width: 33.33333%;\n}\n.column.is-offset-4-fullhd[data-v-4831c6fe] {\n      margin-left: 33.33333%;\n}\n.column.is-5-fullhd[data-v-4831c6fe] {\n      flex: none;\n      width: 41.66667%;\n}\n.column.is-offset-5-fullhd[data-v-4831c6fe] {\n      margin-left: 41.66667%;\n}\n.column.is-6-fullhd[data-v-4831c6fe] {\n      flex: none;\n      width: 50%;\n}\n.column.is-offset-6-fullhd[data-v-4831c6fe] {\n      margin-left: 50%;\n}\n.column.is-7-fullhd[data-v-4831c6fe] {\n      flex: none;\n      width: 58.33333%;\n}\n.column.is-offset-7-fullhd[data-v-4831c6fe] {\n      margin-left: 58.33333%;\n}\n.column.is-8-fullhd[data-v-4831c6fe] {\n      flex: none;\n      width: 66.66667%;\n}\n.column.is-offset-8-fullhd[data-v-4831c6fe] {\n      margin-left: 66.66667%;\n}\n.column.is-9-fullhd[data-v-4831c6fe] {\n      flex: none;\n      width: 75%;\n}\n.column.is-offset-9-fullhd[data-v-4831c6fe] {\n      margin-left: 75%;\n}\n.column.is-10-fullhd[data-v-4831c6fe] {\n      flex: none;\n      width: 83.33333%;\n}\n.column.is-offset-10-fullhd[data-v-4831c6fe] {\n      margin-left: 83.33333%;\n}\n.column.is-11-fullhd[data-v-4831c6fe] {\n      flex: none;\n      width: 91.66667%;\n}\n.column.is-offset-11-fullhd[data-v-4831c6fe] {\n      margin-left: 91.66667%;\n}\n.column.is-12-fullhd[data-v-4831c6fe] {\n      flex: none;\n      width: 100%;\n}\n.column.is-offset-12-fullhd[data-v-4831c6fe] {\n      margin-left: 100%;\n}\n}\n.columns[data-v-4831c6fe] {\n  margin-left: -0.75rem;\n  margin-right: -0.75rem;\n  margin-top: -0.75rem;\n}\n.columns[data-v-4831c6fe]:last-child {\n    margin-bottom: -0.75rem;\n}\n.columns[data-v-4831c6fe]:not(:last-child) {\n    margin-bottom: calc(1.5rem - 0.75rem);\n}\n.columns.is-centered[data-v-4831c6fe] {\n    justify-content: center;\n}\n.columns.is-gapless[data-v-4831c6fe] {\n    margin-left: 0;\n    margin-right: 0;\n    margin-top: 0;\n}\n.columns.is-gapless > .column[data-v-4831c6fe] {\n      margin: 0;\n      padding: 0 !important;\n}\n.columns.is-gapless[data-v-4831c6fe]:not(:last-child) {\n      margin-bottom: 1.5rem;\n}\n.columns.is-gapless[data-v-4831c6fe]:last-child {\n      margin-bottom: 0;\n}\n.columns.is-mobile[data-v-4831c6fe] {\n    display: flex;\n}\n.columns.is-multiline[data-v-4831c6fe] {\n    flex-wrap: wrap;\n}\n.columns.is-vcentered[data-v-4831c6fe] {\n    align-items: center;\n}\n@media screen and (min-width: 769px), print {\n.columns[data-v-4831c6fe]:not(.is-desktop) {\n      display: flex;\n}\n}\n@media screen and (min-width: 1088px) {\n.columns.is-desktop[data-v-4831c6fe] {\n      display: flex;\n}\n}\n.columns.is-variable[data-v-4831c6fe] {\n  --columnGap: 0.75rem;\n  margin-left: calc(-1 * var(--columnGap));\n  margin-right: calc(-1 * var(--columnGap));\n}\n.columns.is-variable .column[data-v-4831c6fe] {\n    padding-left: var(--columnGap);\n    padding-right: var(--columnGap);\n}\n.columns.is-variable.is-0[data-v-4831c6fe] {\n    --columnGap: 0rem;\n}\n@media screen and (max-width: 768px) {\n.columns.is-variable.is-0-mobile[data-v-4831c6fe] {\n      --columnGap: 0rem;\n}\n}\n@media screen and (min-width: 769px), print {\n.columns.is-variable.is-0-tablet[data-v-4831c6fe] {\n      --columnGap: 0rem;\n}\n}\n@media screen and (min-width: 769px) and (max-width: 1087px) {\n.columns.is-variable.is-0-tablet-only[data-v-4831c6fe] {\n      --columnGap: 0rem;\n}\n}\n@media screen and (max-width: 1087px) {\n.columns.is-variable.is-0-touch[data-v-4831c6fe] {\n      --columnGap: 0rem;\n}\n}\n@media screen and (min-width: 1088px) {\n.columns.is-variable.is-0-desktop[data-v-4831c6fe] {\n      --columnGap: 0rem;\n}\n}\n@media screen and (min-width: 1088px) and (max-width: 1279px) {\n.columns.is-variable.is-0-desktop-only[data-v-4831c6fe] {\n      --columnGap: 0rem;\n}\n}\n@media screen and (min-width: 1280px) {\n.columns.is-variable.is-0-widescreen[data-v-4831c6fe] {\n      --columnGap: 0rem;\n}\n}\n@media screen and (min-width: 1280px) and (max-width: 1471px) {\n.columns.is-variable.is-0-widescreen-only[data-v-4831c6fe] {\n      --columnGap: 0rem;\n}\n}\n@media screen and (min-width: 1472px) {\n.columns.is-variable.is-0-fullhd[data-v-4831c6fe] {\n      --columnGap: 0rem;\n}\n}\n.columns.is-variable.is-1[data-v-4831c6fe] {\n    --columnGap: 0.25rem;\n}\n@media screen and (max-width: 768px) {\n.columns.is-variable.is-1-mobile[data-v-4831c6fe] {\n      --columnGap: 0.25rem;\n}\n}\n@media screen and (min-width: 769px), print {\n.columns.is-variable.is-1-tablet[data-v-4831c6fe] {\n      --columnGap: 0.25rem;\n}\n}\n@media screen and (min-width: 769px) and (max-width: 1087px) {\n.columns.is-variable.is-1-tablet-only[data-v-4831c6fe] {\n      --columnGap: 0.25rem;\n}\n}\n@media screen and (max-width: 1087px) {\n.columns.is-variable.is-1-touch[data-v-4831c6fe] {\n      --columnGap: 0.25rem;\n}\n}\n@media screen and (min-width: 1088px) {\n.columns.is-variable.is-1-desktop[data-v-4831c6fe] {\n      --columnGap: 0.25rem;\n}\n}\n@media screen and (min-width: 1088px) and (max-width: 1279px) {\n.columns.is-variable.is-1-desktop-only[data-v-4831c6fe] {\n      --columnGap: 0.25rem;\n}\n}\n@media screen and (min-width: 1280px) {\n.columns.is-variable.is-1-widescreen[data-v-4831c6fe] {\n      --columnGap: 0.25rem;\n}\n}\n@media screen and (min-width: 1280px) and (max-width: 1471px) {\n.columns.is-variable.is-1-widescreen-only[data-v-4831c6fe] {\n      --columnGap: 0.25rem;\n}\n}\n@media screen and (min-width: 1472px) {\n.columns.is-variable.is-1-fullhd[data-v-4831c6fe] {\n      --columnGap: 0.25rem;\n}\n}\n.columns.is-variable.is-2[data-v-4831c6fe] {\n    --columnGap: 0.5rem;\n}\n@media screen and (max-width: 768px) {\n.columns.is-variable.is-2-mobile[data-v-4831c6fe] {\n      --columnGap: 0.5rem;\n}\n}\n@media screen and (min-width: 769px), print {\n.columns.is-variable.is-2-tablet[data-v-4831c6fe] {\n      --columnGap: 0.5rem;\n}\n}\n@media screen and (min-width: 769px) and (max-width: 1087px) {\n.columns.is-variable.is-2-tablet-only[data-v-4831c6fe] {\n      --columnGap: 0.5rem;\n}\n}\n@media screen and (max-width: 1087px) {\n.columns.is-variable.is-2-touch[data-v-4831c6fe] {\n      --columnGap: 0.5rem;\n}\n}\n@media screen and (min-width: 1088px) {\n.columns.is-variable.is-2-desktop[data-v-4831c6fe] {\n      --columnGap: 0.5rem;\n}\n}\n@media screen and (min-width: 1088px) and (max-width: 1279px) {\n.columns.is-variable.is-2-desktop-only[data-v-4831c6fe] {\n      --columnGap: 0.5rem;\n}\n}\n@media screen and (min-width: 1280px) {\n.columns.is-variable.is-2-widescreen[data-v-4831c6fe] {\n      --columnGap: 0.5rem;\n}\n}\n@media screen and (min-width: 1280px) and (max-width: 1471px) {\n.columns.is-variable.is-2-widescreen-only[data-v-4831c6fe] {\n      --columnGap: 0.5rem;\n}\n}\n@media screen and (min-width: 1472px) {\n.columns.is-variable.is-2-fullhd[data-v-4831c6fe] {\n      --columnGap: 0.5rem;\n}\n}\n.columns.is-variable.is-3[data-v-4831c6fe] {\n    --columnGap: 0.75rem;\n}\n@media screen and (max-width: 768px) {\n.columns.is-variable.is-3-mobile[data-v-4831c6fe] {\n      --columnGap: 0.75rem;\n}\n}\n@media screen and (min-width: 769px), print {\n.columns.is-variable.is-3-tablet[data-v-4831c6fe] {\n      --columnGap: 0.75rem;\n}\n}\n@media screen and (min-width: 769px) and (max-width: 1087px) {\n.columns.is-variable.is-3-tablet-only[data-v-4831c6fe] {\n      --columnGap: 0.75rem;\n}\n}\n@media screen and (max-width: 1087px) {\n.columns.is-variable.is-3-touch[data-v-4831c6fe] {\n      --columnGap: 0.75rem;\n}\n}\n@media screen and (min-width: 1088px) {\n.columns.is-variable.is-3-desktop[data-v-4831c6fe] {\n      --columnGap: 0.75rem;\n}\n}\n@media screen and (min-width: 1088px) and (max-width: 1279px) {\n.columns.is-variable.is-3-desktop-only[data-v-4831c6fe] {\n      --columnGap: 0.75rem;\n}\n}\n@media screen and (min-width: 1280px) {\n.columns.is-variable.is-3-widescreen[data-v-4831c6fe] {\n      --columnGap: 0.75rem;\n}\n}\n@media screen and (min-width: 1280px) and (max-width: 1471px) {\n.columns.is-variable.is-3-widescreen-only[data-v-4831c6fe] {\n      --columnGap: 0.75rem;\n}\n}\n@media screen and (min-width: 1472px) {\n.columns.is-variable.is-3-fullhd[data-v-4831c6fe] {\n      --columnGap: 0.75rem;\n}\n}\n.columns.is-variable.is-4[data-v-4831c6fe] {\n    --columnGap: 1rem;\n}\n@media screen and (max-width: 768px) {\n.columns.is-variable.is-4-mobile[data-v-4831c6fe] {\n      --columnGap: 1rem;\n}\n}\n@media screen and (min-width: 769px), print {\n.columns.is-variable.is-4-tablet[data-v-4831c6fe] {\n      --columnGap: 1rem;\n}\n}\n@media screen and (min-width: 769px) and (max-width: 1087px) {\n.columns.is-variable.is-4-tablet-only[data-v-4831c6fe] {\n      --columnGap: 1rem;\n}\n}\n@media screen and (max-width: 1087px) {\n.columns.is-variable.is-4-touch[data-v-4831c6fe] {\n      --columnGap: 1rem;\n}\n}\n@media screen and (min-width: 1088px) {\n.columns.is-variable.is-4-desktop[data-v-4831c6fe] {\n      --columnGap: 1rem;\n}\n}\n@media screen and (min-width: 1088px) and (max-width: 1279px) {\n.columns.is-variable.is-4-desktop-only[data-v-4831c6fe] {\n      --columnGap: 1rem;\n}\n}\n@media screen and (min-width: 1280px) {\n.columns.is-variable.is-4-widescreen[data-v-4831c6fe] {\n      --columnGap: 1rem;\n}\n}\n@media screen and (min-width: 1280px) and (max-width: 1471px) {\n.columns.is-variable.is-4-widescreen-only[data-v-4831c6fe] {\n      --columnGap: 1rem;\n}\n}\n@media screen and (min-width: 1472px) {\n.columns.is-variable.is-4-fullhd[data-v-4831c6fe] {\n      --columnGap: 1rem;\n}\n}\n.columns.is-variable.is-5[data-v-4831c6fe] {\n    --columnGap: 1.25rem;\n}\n@media screen and (max-width: 768px) {\n.columns.is-variable.is-5-mobile[data-v-4831c6fe] {\n      --columnGap: 1.25rem;\n}\n}\n@media screen and (min-width: 769px), print {\n.columns.is-variable.is-5-tablet[data-v-4831c6fe] {\n      --columnGap: 1.25rem;\n}\n}\n@media screen and (min-width: 769px) and (max-width: 1087px) {\n.columns.is-variable.is-5-tablet-only[data-v-4831c6fe] {\n      --columnGap: 1.25rem;\n}\n}\n@media screen and (max-width: 1087px) {\n.columns.is-variable.is-5-touch[data-v-4831c6fe] {\n      --columnGap: 1.25rem;\n}\n}\n@media screen and (min-width: 1088px) {\n.columns.is-variable.is-5-desktop[data-v-4831c6fe] {\n      --columnGap: 1.25rem;\n}\n}\n@media screen and (min-width: 1088px) and (max-width: 1279px) {\n.columns.is-variable.is-5-desktop-only[data-v-4831c6fe] {\n      --columnGap: 1.25rem;\n}\n}\n@media screen and (min-width: 1280px) {\n.columns.is-variable.is-5-widescreen[data-v-4831c6fe] {\n      --columnGap: 1.25rem;\n}\n}\n@media screen and (min-width: 1280px) and (max-width: 1471px) {\n.columns.is-variable.is-5-widescreen-only[data-v-4831c6fe] {\n      --columnGap: 1.25rem;\n}\n}\n@media screen and (min-width: 1472px) {\n.columns.is-variable.is-5-fullhd[data-v-4831c6fe] {\n      --columnGap: 1.25rem;\n}\n}\n.columns.is-variable.is-6[data-v-4831c6fe] {\n    --columnGap: 1.5rem;\n}\n@media screen and (max-width: 768px) {\n.columns.is-variable.is-6-mobile[data-v-4831c6fe] {\n      --columnGap: 1.5rem;\n}\n}\n@media screen and (min-width: 769px), print {\n.columns.is-variable.is-6-tablet[data-v-4831c6fe] {\n      --columnGap: 1.5rem;\n}\n}\n@media screen and (min-width: 769px) and (max-width: 1087px) {\n.columns.is-variable.is-6-tablet-only[data-v-4831c6fe] {\n      --columnGap: 1.5rem;\n}\n}\n@media screen and (max-width: 1087px) {\n.columns.is-variable.is-6-touch[data-v-4831c6fe] {\n      --columnGap: 1.5rem;\n}\n}\n@media screen and (min-width: 1088px) {\n.columns.is-variable.is-6-desktop[data-v-4831c6fe] {\n      --columnGap: 1.5rem;\n}\n}\n@media screen and (min-width: 1088px) and (max-width: 1279px) {\n.columns.is-variable.is-6-desktop-only[data-v-4831c6fe] {\n      --columnGap: 1.5rem;\n}\n}\n@media screen and (min-width: 1280px) {\n.columns.is-variable.is-6-widescreen[data-v-4831c6fe] {\n      --columnGap: 1.5rem;\n}\n}\n@media screen and (min-width: 1280px) and (max-width: 1471px) {\n.columns.is-variable.is-6-widescreen-only[data-v-4831c6fe] {\n      --columnGap: 1.5rem;\n}\n}\n@media screen and (min-width: 1472px) {\n.columns.is-variable.is-6-fullhd[data-v-4831c6fe] {\n      --columnGap: 1.5rem;\n}\n}\n.columns.is-variable.is-7[data-v-4831c6fe] {\n    --columnGap: 1.75rem;\n}\n@media screen and (max-width: 768px) {\n.columns.is-variable.is-7-mobile[data-v-4831c6fe] {\n      --columnGap: 1.75rem;\n}\n}\n@media screen and (min-width: 769px), print {\n.columns.is-variable.is-7-tablet[data-v-4831c6fe] {\n      --columnGap: 1.75rem;\n}\n}\n@media screen and (min-width: 769px) and (max-width: 1087px) {\n.columns.is-variable.is-7-tablet-only[data-v-4831c6fe] {\n      --columnGap: 1.75rem;\n}\n}\n@media screen and (max-width: 1087px) {\n.columns.is-variable.is-7-touch[data-v-4831c6fe] {\n      --columnGap: 1.75rem;\n}\n}\n@media screen and (min-width: 1088px) {\n.columns.is-variable.is-7-desktop[data-v-4831c6fe] {\n      --columnGap: 1.75rem;\n}\n}\n@media screen and (min-width: 1088px) and (max-width: 1279px) {\n.columns.is-variable.is-7-desktop-only[data-v-4831c6fe] {\n      --columnGap: 1.75rem;\n}\n}\n@media screen and (min-width: 1280px) {\n.columns.is-variable.is-7-widescreen[data-v-4831c6fe] {\n      --columnGap: 1.75rem;\n}\n}\n@media screen and (min-width: 1280px) and (max-width: 1471px) {\n.columns.is-variable.is-7-widescreen-only[data-v-4831c6fe] {\n      --columnGap: 1.75rem;\n}\n}\n@media screen and (min-width: 1472px) {\n.columns.is-variable.is-7-fullhd[data-v-4831c6fe] {\n      --columnGap: 1.75rem;\n}\n}\n.columns.is-variable.is-8[data-v-4831c6fe] {\n    --columnGap: 2rem;\n}\n@media screen and (max-width: 768px) {\n.columns.is-variable.is-8-mobile[data-v-4831c6fe] {\n      --columnGap: 2rem;\n}\n}\n@media screen and (min-width: 769px), print {\n.columns.is-variable.is-8-tablet[data-v-4831c6fe] {\n      --columnGap: 2rem;\n}\n}\n@media screen and (min-width: 769px) and (max-width: 1087px) {\n.columns.is-variable.is-8-tablet-only[data-v-4831c6fe] {\n      --columnGap: 2rem;\n}\n}\n@media screen and (max-width: 1087px) {\n.columns.is-variable.is-8-touch[data-v-4831c6fe] {\n      --columnGap: 2rem;\n}\n}\n@media screen and (min-width: 1088px) {\n.columns.is-variable.is-8-desktop[data-v-4831c6fe] {\n      --columnGap: 2rem;\n}\n}\n@media screen and (min-width: 1088px) and (max-width: 1279px) {\n.columns.is-variable.is-8-desktop-only[data-v-4831c6fe] {\n      --columnGap: 2rem;\n}\n}\n@media screen and (min-width: 1280px) {\n.columns.is-variable.is-8-widescreen[data-v-4831c6fe] {\n      --columnGap: 2rem;\n}\n}\n@media screen and (min-width: 1280px) and (max-width: 1471px) {\n.columns.is-variable.is-8-widescreen-only[data-v-4831c6fe] {\n      --columnGap: 2rem;\n}\n}\n@media screen and (min-width: 1472px) {\n.columns.is-variable.is-8-fullhd[data-v-4831c6fe] {\n      --columnGap: 2rem;\n}\n}\n.tile[data-v-4831c6fe] {\n  align-items: stretch;\n  display: block;\n  flex-basis: 0;\n  flex-grow: 1;\n  flex-shrink: 1;\n  min-height: min-content;\n}\n.tile.is-ancestor[data-v-4831c6fe] {\n    margin-left: -0.75rem;\n    margin-right: -0.75rem;\n    margin-top: -0.75rem;\n}\n.tile.is-ancestor[data-v-4831c6fe]:last-child {\n      margin-bottom: -0.75rem;\n}\n.tile.is-ancestor[data-v-4831c6fe]:not(:last-child) {\n      margin-bottom: 0.75rem;\n}\n.tile.is-child[data-v-4831c6fe] {\n    margin: 0 !important;\n}\n.tile.is-parent[data-v-4831c6fe] {\n    padding: 0.75rem;\n}\n.tile.is-vertical[data-v-4831c6fe] {\n    flex-direction: column;\n}\n.tile.is-vertical > .tile.is-child[data-v-4831c6fe]:not(:last-child) {\n      margin-bottom: 1.5rem !important;\n}\n@media screen and (min-width: 769px), print {\n.tile[data-v-4831c6fe]:not(.is-child) {\n      display: flex;\n}\n.tile.is-1[data-v-4831c6fe] {\n      flex: none;\n      width: 8.33333%;\n}\n.tile.is-2[data-v-4831c6fe] {\n      flex: none;\n      width: 16.66667%;\n}\n.tile.is-3[data-v-4831c6fe] {\n      flex: none;\n      width: 25%;\n}\n.tile.is-4[data-v-4831c6fe] {\n      flex: none;\n      width: 33.33333%;\n}\n.tile.is-5[data-v-4831c6fe] {\n      flex: none;\n      width: 41.66667%;\n}\n.tile.is-6[data-v-4831c6fe] {\n      flex: none;\n      width: 50%;\n}\n.tile.is-7[data-v-4831c6fe] {\n      flex: none;\n      width: 58.33333%;\n}\n.tile.is-8[data-v-4831c6fe] {\n      flex: none;\n      width: 66.66667%;\n}\n.tile.is-9[data-v-4831c6fe] {\n      flex: none;\n      width: 75%;\n}\n.tile.is-10[data-v-4831c6fe] {\n      flex: none;\n      width: 83.33333%;\n}\n.tile.is-11[data-v-4831c6fe] {\n      flex: none;\n      width: 91.66667%;\n}\n.tile.is-12[data-v-4831c6fe] {\n      flex: none;\n      width: 100%;\n}\n}\n.hero[data-v-4831c6fe] {\n  align-items: stretch;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n.hero .navbar[data-v-4831c6fe] {\n    background: none;\n}\n.hero .tabs ul[data-v-4831c6fe] {\n    border-bottom: none;\n}\n.hero.is-white[data-v-4831c6fe] {\n    background-color: white;\n    color: #0a0a0a;\n}\n.hero.is-white a[data-v-4831c6fe]:not(.button):not(.dropdown-item):not(.tag),\n    .hero.is-white strong[data-v-4831c6fe] {\n      color: inherit;\n}\n.hero.is-white .title[data-v-4831c6fe] {\n      color: #0a0a0a;\n}\n.hero.is-white .subtitle[data-v-4831c6fe] {\n      color: rgba(10, 10, 10, 0.9);\n}\n.hero.is-white .subtitle a[data-v-4831c6fe]:not(.button),\n      .hero.is-white .subtitle strong[data-v-4831c6fe] {\n        color: #0a0a0a;\n}\n@media screen and (max-width: 1087px) {\n.hero.is-white .navbar-menu[data-v-4831c6fe] {\n        background-color: white;\n}\n}\n.hero.is-white .navbar-item[data-v-4831c6fe],\n    .hero.is-white .navbar-link[data-v-4831c6fe] {\n      color: rgba(10, 10, 10, 0.7);\n}\n.hero.is-white a.navbar-item[data-v-4831c6fe]:hover, .hero.is-white a.navbar-item.is-active[data-v-4831c6fe],\n    .hero.is-white .navbar-link[data-v-4831c6fe]:hover,\n    .hero.is-white .navbar-link.is-active[data-v-4831c6fe] {\n      background-color: #f2f2f2;\n      color: #0a0a0a;\n}\n.hero.is-white .tabs a[data-v-4831c6fe] {\n      color: #0a0a0a;\n      opacity: 0.9;\n}\n.hero.is-white .tabs a[data-v-4831c6fe]:hover {\n        opacity: 1;\n}\n.hero.is-white .tabs li.is-active a[data-v-4831c6fe] {\n      opacity: 1;\n}\n.hero.is-white .tabs.is-boxed a[data-v-4831c6fe], .hero.is-white .tabs.is-toggle a[data-v-4831c6fe] {\n      color: #0a0a0a;\n}\n.hero.is-white .tabs.is-boxed a[data-v-4831c6fe]:hover, .hero.is-white .tabs.is-toggle a[data-v-4831c6fe]:hover {\n        background-color: rgba(10, 10, 10, 0.1);\n}\n.hero.is-white .tabs.is-boxed li.is-active a[data-v-4831c6fe], .hero.is-white .tabs.is-boxed li.is-active a[data-v-4831c6fe]:hover, .hero.is-white .tabs.is-toggle li.is-active a[data-v-4831c6fe], .hero.is-white .tabs.is-toggle li.is-active a[data-v-4831c6fe]:hover {\n      background-color: #0a0a0a;\n      border-color: #0a0a0a;\n      color: white;\n}\n.hero.is-white.is-bold[data-v-4831c6fe] {\n      background-image: linear-gradient(141deg, #e6e6e6 0%, white 71%, white 100%);\n}\n@media screen and (max-width: 768px) {\n.hero.is-white.is-bold .navbar-menu[data-v-4831c6fe] {\n          background-image: linear-gradient(141deg, #e6e6e6 0%, white 71%, white 100%);\n}\n}\n.hero.is-black[data-v-4831c6fe] {\n    background-color: #0a0a0a;\n    color: white;\n}\n.hero.is-black a[data-v-4831c6fe]:not(.button):not(.dropdown-item):not(.tag),\n    .hero.is-black strong[data-v-4831c6fe] {\n      color: inherit;\n}\n.hero.is-black .title[data-v-4831c6fe] {\n      color: white;\n}\n.hero.is-black .subtitle[data-v-4831c6fe] {\n      color: rgba(255, 255, 255, 0.9);\n}\n.hero.is-black .subtitle a[data-v-4831c6fe]:not(.button),\n      .hero.is-black .subtitle strong[data-v-4831c6fe] {\n        color: white;\n}\n@media screen and (max-width: 1087px) {\n.hero.is-black .navbar-menu[data-v-4831c6fe] {\n        background-color: #0a0a0a;\n}\n}\n.hero.is-black .navbar-item[data-v-4831c6fe],\n    .hero.is-black .navbar-link[data-v-4831c6fe] {\n      color: rgba(255, 255, 255, 0.7);\n}\n.hero.is-black a.navbar-item[data-v-4831c6fe]:hover, .hero.is-black a.navbar-item.is-active[data-v-4831c6fe],\n    .hero.is-black .navbar-link[data-v-4831c6fe]:hover,\n    .hero.is-black .navbar-link.is-active[data-v-4831c6fe] {\n      background-color: black;\n      color: white;\n}\n.hero.is-black .tabs a[data-v-4831c6fe] {\n      color: white;\n      opacity: 0.9;\n}\n.hero.is-black .tabs a[data-v-4831c6fe]:hover {\n        opacity: 1;\n}\n.hero.is-black .tabs li.is-active a[data-v-4831c6fe] {\n      opacity: 1;\n}\n.hero.is-black .tabs.is-boxed a[data-v-4831c6fe], .hero.is-black .tabs.is-toggle a[data-v-4831c6fe] {\n      color: white;\n}\n.hero.is-black .tabs.is-boxed a[data-v-4831c6fe]:hover, .hero.is-black .tabs.is-toggle a[data-v-4831c6fe]:hover {\n        background-color: rgba(10, 10, 10, 0.1);\n}\n.hero.is-black .tabs.is-boxed li.is-active a[data-v-4831c6fe], .hero.is-black .tabs.is-boxed li.is-active a[data-v-4831c6fe]:hover, .hero.is-black .tabs.is-toggle li.is-active a[data-v-4831c6fe], .hero.is-black .tabs.is-toggle li.is-active a[data-v-4831c6fe]:hover {\n      background-color: white;\n      border-color: white;\n      color: #0a0a0a;\n}\n.hero.is-black.is-bold[data-v-4831c6fe] {\n      background-image: linear-gradient(141deg, black 0%, #0a0a0a 71%, #181616 100%);\n}\n@media screen and (max-width: 768px) {\n.hero.is-black.is-bold .navbar-menu[data-v-4831c6fe] {\n          background-image: linear-gradient(141deg, black 0%, #0a0a0a 71%, #181616 100%);\n}\n}\n.hero.is-light[data-v-4831c6fe] {\n    background-color: whitesmoke;\n    color: #363636;\n}\n.hero.is-light a[data-v-4831c6fe]:not(.button):not(.dropdown-item):not(.tag),\n    .hero.is-light strong[data-v-4831c6fe] {\n      color: inherit;\n}\n.hero.is-light .title[data-v-4831c6fe] {\n      color: #363636;\n}\n.hero.is-light .subtitle[data-v-4831c6fe] {\n      color: rgba(54, 54, 54, 0.9);\n}\n.hero.is-light .subtitle a[data-v-4831c6fe]:not(.button),\n      .hero.is-light .subtitle strong[data-v-4831c6fe] {\n        color: #363636;\n}\n@media screen and (max-width: 1087px) {\n.hero.is-light .navbar-menu[data-v-4831c6fe] {\n        background-color: whitesmoke;\n}\n}\n.hero.is-light .navbar-item[data-v-4831c6fe],\n    .hero.is-light .navbar-link[data-v-4831c6fe] {\n      color: rgba(54, 54, 54, 0.7);\n}\n.hero.is-light a.navbar-item[data-v-4831c6fe]:hover, .hero.is-light a.navbar-item.is-active[data-v-4831c6fe],\n    .hero.is-light .navbar-link[data-v-4831c6fe]:hover,\n    .hero.is-light .navbar-link.is-active[data-v-4831c6fe] {\n      background-color: #e8e8e8;\n      color: #363636;\n}\n.hero.is-light .tabs a[data-v-4831c6fe] {\n      color: #363636;\n      opacity: 0.9;\n}\n.hero.is-light .tabs a[data-v-4831c6fe]:hover {\n        opacity: 1;\n}\n.hero.is-light .tabs li.is-active a[data-v-4831c6fe] {\n      opacity: 1;\n}\n.hero.is-light .tabs.is-boxed a[data-v-4831c6fe], .hero.is-light .tabs.is-toggle a[data-v-4831c6fe] {\n      color: #363636;\n}\n.hero.is-light .tabs.is-boxed a[data-v-4831c6fe]:hover, .hero.is-light .tabs.is-toggle a[data-v-4831c6fe]:hover {\n        background-color: rgba(10, 10, 10, 0.1);\n}\n.hero.is-light .tabs.is-boxed li.is-active a[data-v-4831c6fe], .hero.is-light .tabs.is-boxed li.is-active a[data-v-4831c6fe]:hover, .hero.is-light .tabs.is-toggle li.is-active a[data-v-4831c6fe], .hero.is-light .tabs.is-toggle li.is-active a[data-v-4831c6fe]:hover {\n      background-color: #363636;\n      border-color: #363636;\n      color: whitesmoke;\n}\n.hero.is-light.is-bold[data-v-4831c6fe] {\n      background-image: linear-gradient(141deg, #dfd8d9 0%, whitesmoke 71%, white 100%);\n}\n@media screen and (max-width: 768px) {\n.hero.is-light.is-bold .navbar-menu[data-v-4831c6fe] {\n          background-image: linear-gradient(141deg, #dfd8d9 0%, whitesmoke 71%, white 100%);\n}\n}\n.hero.is-dark[data-v-4831c6fe] {\n    background-color: #363636;\n    color: whitesmoke;\n}\n.hero.is-dark a[data-v-4831c6fe]:not(.button):not(.dropdown-item):not(.tag),\n    .hero.is-dark strong[data-v-4831c6fe] {\n      color: inherit;\n}\n.hero.is-dark .title[data-v-4831c6fe] {\n      color: whitesmoke;\n}\n.hero.is-dark .subtitle[data-v-4831c6fe] {\n      color: rgba(245, 245, 245, 0.9);\n}\n.hero.is-dark .subtitle a[data-v-4831c6fe]:not(.button),\n      .hero.is-dark .subtitle strong[data-v-4831c6fe] {\n        color: whitesmoke;\n}\n@media screen and (max-width: 1087px) {\n.hero.is-dark .navbar-menu[data-v-4831c6fe] {\n        background-color: #363636;\n}\n}\n.hero.is-dark .navbar-item[data-v-4831c6fe],\n    .hero.is-dark .navbar-link[data-v-4831c6fe] {\n      color: rgba(245, 245, 245, 0.7);\n}\n.hero.is-dark a.navbar-item[data-v-4831c6fe]:hover, .hero.is-dark a.navbar-item.is-active[data-v-4831c6fe],\n    .hero.is-dark .navbar-link[data-v-4831c6fe]:hover,\n    .hero.is-dark .navbar-link.is-active[data-v-4831c6fe] {\n      background-color: #292929;\n      color: whitesmoke;\n}\n.hero.is-dark .tabs a[data-v-4831c6fe] {\n      color: whitesmoke;\n      opacity: 0.9;\n}\n.hero.is-dark .tabs a[data-v-4831c6fe]:hover {\n        opacity: 1;\n}\n.hero.is-dark .tabs li.is-active a[data-v-4831c6fe] {\n      opacity: 1;\n}\n.hero.is-dark .tabs.is-boxed a[data-v-4831c6fe], .hero.is-dark .tabs.is-toggle a[data-v-4831c6fe] {\n      color: whitesmoke;\n}\n.hero.is-dark .tabs.is-boxed a[data-v-4831c6fe]:hover, .hero.is-dark .tabs.is-toggle a[data-v-4831c6fe]:hover {\n        background-color: rgba(10, 10, 10, 0.1);\n}\n.hero.is-dark .tabs.is-boxed li.is-active a[data-v-4831c6fe], .hero.is-dark .tabs.is-boxed li.is-active a[data-v-4831c6fe]:hover, .hero.is-dark .tabs.is-toggle li.is-active a[data-v-4831c6fe], .hero.is-dark .tabs.is-toggle li.is-active a[data-v-4831c6fe]:hover {\n      background-color: whitesmoke;\n      border-color: whitesmoke;\n      color: #363636;\n}\n.hero.is-dark.is-bold[data-v-4831c6fe] {\n      background-image: linear-gradient(141deg, #1f191a 0%, #363636 71%, #46403f 100%);\n}\n@media screen and (max-width: 768px) {\n.hero.is-dark.is-bold .navbar-menu[data-v-4831c6fe] {\n          background-image: linear-gradient(141deg, #1f191a 0%, #363636 71%, #46403f 100%);\n}\n}\n.hero.is-primary[data-v-4831c6fe],[data-v-4831c6fe] .hero.tagAreaClass,[data-v-4831c6fe] .hero.deleteAreaClass,[data-v-4831c6fe] .hero.deleteContentClass {\n    background-color: #00d1b2;\n    color: #fff;\n}\n.hero.is-primary a[data-v-4831c6fe]:not(.button):not(.dropdown-item):not(.tag),[data-v-4831c6fe] .hero.tagAreaClass a:not(.button):not(.dropdown-item):not(.tag),[data-v-4831c6fe] .hero.deleteAreaClass a:not(.button):not(.dropdown-item):not(.tag),[data-v-4831c6fe] .hero.deleteContentClass a:not(.button):not(.dropdown-item):not(.tag),\n    .hero.is-primary strong[data-v-4831c6fe],[data-v-4831c6fe] .hero.tagAreaClass strong,[data-v-4831c6fe] .hero.deleteAreaClass strong,[data-v-4831c6fe] .hero.deleteContentClass strong {\n      color: inherit;\n}\n.hero.is-primary .title[data-v-4831c6fe],[data-v-4831c6fe] .hero.tagAreaClass .title,[data-v-4831c6fe] .hero.deleteAreaClass .title,[data-v-4831c6fe] .hero.deleteContentClass .title {\n      color: #fff;\n}\n.hero.is-primary .subtitle[data-v-4831c6fe],[data-v-4831c6fe] .hero.tagAreaClass .subtitle,[data-v-4831c6fe] .hero.deleteAreaClass .subtitle,[data-v-4831c6fe] .hero.deleteContentClass .subtitle {\n      color: rgba(255, 255, 255, 0.9);\n}\n.hero.is-primary .subtitle a[data-v-4831c6fe]:not(.button),[data-v-4831c6fe] .hero.tagAreaClass .subtitle a:not(.button),[data-v-4831c6fe] .hero.deleteAreaClass .subtitle a:not(.button),[data-v-4831c6fe] .hero.deleteContentClass .subtitle a:not(.button),\n      .hero.is-primary .subtitle strong[data-v-4831c6fe],[data-v-4831c6fe] .hero.tagAreaClass .subtitle strong,[data-v-4831c6fe] .hero.deleteAreaClass .subtitle strong,[data-v-4831c6fe] .hero.deleteContentClass .subtitle strong {\n        color: #fff;\n}\n@media screen and (max-width: 1087px) {\n.hero.is-primary .navbar-menu[data-v-4831c6fe],[data-v-4831c6fe] .hero.tagAreaClass .navbar-menu,[data-v-4831c6fe] .hero.deleteAreaClass .navbar-menu,[data-v-4831c6fe] .hero.deleteContentClass .navbar-menu {\n        background-color: #00d1b2;\n}\n}\n.hero.is-primary .navbar-item[data-v-4831c6fe],[data-v-4831c6fe] .hero.tagAreaClass .navbar-item,[data-v-4831c6fe] .hero.deleteAreaClass .navbar-item,[data-v-4831c6fe] .hero.deleteContentClass .navbar-item,\n    .hero.is-primary .navbar-link[data-v-4831c6fe],[data-v-4831c6fe] .hero.tagAreaClass .navbar-link,[data-v-4831c6fe] .hero.deleteAreaClass .navbar-link,[data-v-4831c6fe] .hero.deleteContentClass .navbar-link {\n      color: rgba(255, 255, 255, 0.7);\n}\n.hero.is-primary a.navbar-item[data-v-4831c6fe]:hover,[data-v-4831c6fe] .hero.tagAreaClass a.navbar-item:hover,[data-v-4831c6fe] .hero.deleteAreaClass a.navbar-item:hover,[data-v-4831c6fe] .hero.deleteContentClass a.navbar-item:hover, .hero.is-primary a.navbar-item.is-active[data-v-4831c6fe],[data-v-4831c6fe] .hero.tagAreaClass a.navbar-item.is-active,[data-v-4831c6fe] .hero.deleteAreaClass a.navbar-item.is-active,[data-v-4831c6fe] .hero.deleteContentClass a.navbar-item.is-active,\n    .hero.is-primary .navbar-link[data-v-4831c6fe]:hover,[data-v-4831c6fe] .hero.tagAreaClass .navbar-link:hover,[data-v-4831c6fe] .hero.deleteAreaClass .navbar-link:hover,[data-v-4831c6fe] .hero.deleteContentClass .navbar-link:hover,\n    .hero.is-primary .navbar-link.is-active[data-v-4831c6fe],[data-v-4831c6fe] .hero.tagAreaClass .navbar-link.is-active,[data-v-4831c6fe] .hero.deleteAreaClass .navbar-link.is-active,[data-v-4831c6fe] .hero.deleteContentClass .navbar-link.is-active {\n      background-color: #00b89c;\n      color: #fff;\n}\n.hero.is-primary .tabs a[data-v-4831c6fe],[data-v-4831c6fe] .hero.tagAreaClass .tabs a,[data-v-4831c6fe] .hero.deleteAreaClass .tabs a,[data-v-4831c6fe] .hero.deleteContentClass .tabs a {\n      color: #fff;\n      opacity: 0.9;\n}\n.hero.is-primary .tabs a[data-v-4831c6fe]:hover,[data-v-4831c6fe] .hero.tagAreaClass .tabs a:hover,[data-v-4831c6fe] .hero.deleteAreaClass .tabs a:hover,[data-v-4831c6fe] .hero.deleteContentClass .tabs a:hover {\n        opacity: 1;\n}\n.hero.is-primary .tabs li.is-active a[data-v-4831c6fe],[data-v-4831c6fe] .hero.tagAreaClass .tabs li.is-active a,[data-v-4831c6fe] .hero.deleteAreaClass .tabs li.is-active a,[data-v-4831c6fe] .hero.deleteContentClass .tabs li.is-active a {\n      opacity: 1;\n}\n.hero.is-primary .tabs.is-boxed a[data-v-4831c6fe],[data-v-4831c6fe] .hero.tagAreaClass .tabs.is-boxed a,[data-v-4831c6fe] .hero.deleteAreaClass .tabs.is-boxed a,[data-v-4831c6fe] .hero.deleteContentClass .tabs.is-boxed a, .hero.is-primary .tabs.is-toggle a[data-v-4831c6fe],[data-v-4831c6fe] .hero.tagAreaClass .tabs.is-toggle a,[data-v-4831c6fe] .hero.deleteAreaClass .tabs.is-toggle a,[data-v-4831c6fe] .hero.deleteContentClass .tabs.is-toggle a {\n      color: #fff;\n}\n.hero.is-primary .tabs.is-boxed a[data-v-4831c6fe]:hover,[data-v-4831c6fe] .hero.tagAreaClass .tabs.is-boxed a:hover,[data-v-4831c6fe] .hero.deleteAreaClass .tabs.is-boxed a:hover,[data-v-4831c6fe] .hero.deleteContentClass .tabs.is-boxed a:hover, .hero.is-primary .tabs.is-toggle a[data-v-4831c6fe]:hover,[data-v-4831c6fe] .hero.tagAreaClass .tabs.is-toggle a:hover,[data-v-4831c6fe] .hero.deleteAreaClass .tabs.is-toggle a:hover,[data-v-4831c6fe] .hero.deleteContentClass .tabs.is-toggle a:hover {\n        background-color: rgba(10, 10, 10, 0.1);\n}\n.hero.is-primary .tabs.is-boxed li.is-active a[data-v-4831c6fe],[data-v-4831c6fe] .hero.tagAreaClass .tabs.is-boxed li.is-active a,[data-v-4831c6fe] .hero.deleteAreaClass .tabs.is-boxed li.is-active a,[data-v-4831c6fe] .hero.deleteContentClass .tabs.is-boxed li.is-active a, .hero.is-primary .tabs.is-boxed li.is-active a[data-v-4831c6fe]:hover,[data-v-4831c6fe] .hero.tagAreaClass .tabs.is-boxed li.is-active a:hover,[data-v-4831c6fe] .hero.deleteAreaClass .tabs.is-boxed li.is-active a:hover,[data-v-4831c6fe] .hero.deleteContentClass .tabs.is-boxed li.is-active a:hover, .hero.is-primary .tabs.is-toggle li.is-active a[data-v-4831c6fe],[data-v-4831c6fe] .hero.tagAreaClass .tabs.is-toggle li.is-active a,[data-v-4831c6fe] .hero.deleteAreaClass .tabs.is-toggle li.is-active a,[data-v-4831c6fe] .hero.deleteContentClass .tabs.is-toggle li.is-active a, .hero.is-primary .tabs.is-toggle li.is-active a[data-v-4831c6fe]:hover,[data-v-4831c6fe] .hero.tagAreaClass .tabs.is-toggle li.is-active a:hover,[data-v-4831c6fe] .hero.deleteAreaClass .tabs.is-toggle li.is-active a:hover,[data-v-4831c6fe] .hero.deleteContentClass .tabs.is-toggle li.is-active a:hover {\n      background-color: #fff;\n      border-color: #fff;\n      color: #00d1b2;\n}\n.hero.is-primary.is-bold[data-v-4831c6fe],[data-v-4831c6fe] .hero.is-bold.tagAreaClass,[data-v-4831c6fe] .hero.is-bold.deleteAreaClass,[data-v-4831c6fe] .hero.is-bold.deleteContentClass {\n      background-image: linear-gradient(141deg, #009e6c 0%, #00d1b2 71%, #00e7eb 100%);\n}\n@media screen and (max-width: 768px) {\n.hero.is-primary.is-bold .navbar-menu[data-v-4831c6fe],[data-v-4831c6fe] .hero.is-bold.tagAreaClass .navbar-menu,[data-v-4831c6fe] .hero.is-bold.deleteAreaClass .navbar-menu,[data-v-4831c6fe] .hero.is-bold.deleteContentClass .navbar-menu {\n          background-image: linear-gradient(141deg, #009e6c 0%, #00d1b2 71%, #00e7eb 100%);\n}\n}\n.hero.is-link[data-v-4831c6fe] {\n    background-color: #3273dc;\n    color: #fff;\n}\n.hero.is-link a[data-v-4831c6fe]:not(.button):not(.dropdown-item):not(.tag),\n    .hero.is-link strong[data-v-4831c6fe] {\n      color: inherit;\n}\n.hero.is-link .title[data-v-4831c6fe] {\n      color: #fff;\n}\n.hero.is-link .subtitle[data-v-4831c6fe] {\n      color: rgba(255, 255, 255, 0.9);\n}\n.hero.is-link .subtitle a[data-v-4831c6fe]:not(.button),\n      .hero.is-link .subtitle strong[data-v-4831c6fe] {\n        color: #fff;\n}\n@media screen and (max-width: 1087px) {\n.hero.is-link .navbar-menu[data-v-4831c6fe] {\n        background-color: #3273dc;\n}\n}\n.hero.is-link .navbar-item[data-v-4831c6fe],\n    .hero.is-link .navbar-link[data-v-4831c6fe] {\n      color: rgba(255, 255, 255, 0.7);\n}\n.hero.is-link a.navbar-item[data-v-4831c6fe]:hover, .hero.is-link a.navbar-item.is-active[data-v-4831c6fe],\n    .hero.is-link .navbar-link[data-v-4831c6fe]:hover,\n    .hero.is-link .navbar-link.is-active[data-v-4831c6fe] {\n      background-color: #2366d1;\n      color: #fff;\n}\n.hero.is-link .tabs a[data-v-4831c6fe] {\n      color: #fff;\n      opacity: 0.9;\n}\n.hero.is-link .tabs a[data-v-4831c6fe]:hover {\n        opacity: 1;\n}\n.hero.is-link .tabs li.is-active a[data-v-4831c6fe] {\n      opacity: 1;\n}\n.hero.is-link .tabs.is-boxed a[data-v-4831c6fe], .hero.is-link .tabs.is-toggle a[data-v-4831c6fe] {\n      color: #fff;\n}\n.hero.is-link .tabs.is-boxed a[data-v-4831c6fe]:hover, .hero.is-link .tabs.is-toggle a[data-v-4831c6fe]:hover {\n        background-color: rgba(10, 10, 10, 0.1);\n}\n.hero.is-link .tabs.is-boxed li.is-active a[data-v-4831c6fe], .hero.is-link .tabs.is-boxed li.is-active a[data-v-4831c6fe]:hover, .hero.is-link .tabs.is-toggle li.is-active a[data-v-4831c6fe], .hero.is-link .tabs.is-toggle li.is-active a[data-v-4831c6fe]:hover {\n      background-color: #fff;\n      border-color: #fff;\n      color: #3273dc;\n}\n.hero.is-link.is-bold[data-v-4831c6fe] {\n      background-image: linear-gradient(141deg, #1577c6 0%, #3273dc 71%, #4366e5 100%);\n}\n@media screen and (max-width: 768px) {\n.hero.is-link.is-bold .navbar-menu[data-v-4831c6fe] {\n          background-image: linear-gradient(141deg, #1577c6 0%, #3273dc 71%, #4366e5 100%);\n}\n}\n.hero.is-info[data-v-4831c6fe] {\n    background-color: #209cee;\n    color: #fff;\n}\n.hero.is-info a[data-v-4831c6fe]:not(.button):not(.dropdown-item):not(.tag),\n    .hero.is-info strong[data-v-4831c6fe] {\n      color: inherit;\n}\n.hero.is-info .title[data-v-4831c6fe] {\n      color: #fff;\n}\n.hero.is-info .subtitle[data-v-4831c6fe] {\n      color: rgba(255, 255, 255, 0.9);\n}\n.hero.is-info .subtitle a[data-v-4831c6fe]:not(.button),\n      .hero.is-info .subtitle strong[data-v-4831c6fe] {\n        color: #fff;\n}\n@media screen and (max-width: 1087px) {\n.hero.is-info .navbar-menu[data-v-4831c6fe] {\n        background-color: #209cee;\n}\n}\n.hero.is-info .navbar-item[data-v-4831c6fe],\n    .hero.is-info .navbar-link[data-v-4831c6fe] {\n      color: rgba(255, 255, 255, 0.7);\n}\n.hero.is-info a.navbar-item[data-v-4831c6fe]:hover, .hero.is-info a.navbar-item.is-active[data-v-4831c6fe],\n    .hero.is-info .navbar-link[data-v-4831c6fe]:hover,\n    .hero.is-info .navbar-link.is-active[data-v-4831c6fe] {\n      background-color: #118fe4;\n      color: #fff;\n}\n.hero.is-info .tabs a[data-v-4831c6fe] {\n      color: #fff;\n      opacity: 0.9;\n}\n.hero.is-info .tabs a[data-v-4831c6fe]:hover {\n        opacity: 1;\n}\n.hero.is-info .tabs li.is-active a[data-v-4831c6fe] {\n      opacity: 1;\n}\n.hero.is-info .tabs.is-boxed a[data-v-4831c6fe], .hero.is-info .tabs.is-toggle a[data-v-4831c6fe] {\n      color: #fff;\n}\n.hero.is-info .tabs.is-boxed a[data-v-4831c6fe]:hover, .hero.is-info .tabs.is-toggle a[data-v-4831c6fe]:hover {\n        background-color: rgba(10, 10, 10, 0.1);\n}\n.hero.is-info .tabs.is-boxed li.is-active a[data-v-4831c6fe], .hero.is-info .tabs.is-boxed li.is-active a[data-v-4831c6fe]:hover, .hero.is-info .tabs.is-toggle li.is-active a[data-v-4831c6fe], .hero.is-info .tabs.is-toggle li.is-active a[data-v-4831c6fe]:hover {\n      background-color: #fff;\n      border-color: #fff;\n      color: #209cee;\n}\n.hero.is-info.is-bold[data-v-4831c6fe] {\n      background-image: linear-gradient(141deg, #04a6d7 0%, #209cee 71%, #3287f5 100%);\n}\n@media screen and (max-width: 768px) {\n.hero.is-info.is-bold .navbar-menu[data-v-4831c6fe] {\n          background-image: linear-gradient(141deg, #04a6d7 0%, #209cee 71%, #3287f5 100%);\n}\n}\n.hero.is-success[data-v-4831c6fe] {\n    background-color: #23d160;\n    color: #fff;\n}\n.hero.is-success a[data-v-4831c6fe]:not(.button):not(.dropdown-item):not(.tag),\n    .hero.is-success strong[data-v-4831c6fe] {\n      color: inherit;\n}\n.hero.is-success .title[data-v-4831c6fe] {\n      color: #fff;\n}\n.hero.is-success .subtitle[data-v-4831c6fe] {\n      color: rgba(255, 255, 255, 0.9);\n}\n.hero.is-success .subtitle a[data-v-4831c6fe]:not(.button),\n      .hero.is-success .subtitle strong[data-v-4831c6fe] {\n        color: #fff;\n}\n@media screen and (max-width: 1087px) {\n.hero.is-success .navbar-menu[data-v-4831c6fe] {\n        background-color: #23d160;\n}\n}\n.hero.is-success .navbar-item[data-v-4831c6fe],\n    .hero.is-success .navbar-link[data-v-4831c6fe] {\n      color: rgba(255, 255, 255, 0.7);\n}\n.hero.is-success a.navbar-item[data-v-4831c6fe]:hover, .hero.is-success a.navbar-item.is-active[data-v-4831c6fe],\n    .hero.is-success .navbar-link[data-v-4831c6fe]:hover,\n    .hero.is-success .navbar-link.is-active[data-v-4831c6fe] {\n      background-color: #20bc56;\n      color: #fff;\n}\n.hero.is-success .tabs a[data-v-4831c6fe] {\n      color: #fff;\n      opacity: 0.9;\n}\n.hero.is-success .tabs a[data-v-4831c6fe]:hover {\n        opacity: 1;\n}\n.hero.is-success .tabs li.is-active a[data-v-4831c6fe] {\n      opacity: 1;\n}\n.hero.is-success .tabs.is-boxed a[data-v-4831c6fe], .hero.is-success .tabs.is-toggle a[data-v-4831c6fe] {\n      color: #fff;\n}\n.hero.is-success .tabs.is-boxed a[data-v-4831c6fe]:hover, .hero.is-success .tabs.is-toggle a[data-v-4831c6fe]:hover {\n        background-color: rgba(10, 10, 10, 0.1);\n}\n.hero.is-success .tabs.is-boxed li.is-active a[data-v-4831c6fe], .hero.is-success .tabs.is-boxed li.is-active a[data-v-4831c6fe]:hover, .hero.is-success .tabs.is-toggle li.is-active a[data-v-4831c6fe], .hero.is-success .tabs.is-toggle li.is-active a[data-v-4831c6fe]:hover {\n      background-color: #fff;\n      border-color: #fff;\n      color: #23d160;\n}\n.hero.is-success.is-bold[data-v-4831c6fe] {\n      background-image: linear-gradient(141deg, #12af2f 0%, #23d160 71%, #2ce28a 100%);\n}\n@media screen and (max-width: 768px) {\n.hero.is-success.is-bold .navbar-menu[data-v-4831c6fe] {\n          background-image: linear-gradient(141deg, #12af2f 0%, #23d160 71%, #2ce28a 100%);\n}\n}\n.hero.is-warning[data-v-4831c6fe] {\n    background-color: #ffdd57;\n    color: rgba(0, 0, 0, 0.7);\n}\n.hero.is-warning a[data-v-4831c6fe]:not(.button):not(.dropdown-item):not(.tag),\n    .hero.is-warning strong[data-v-4831c6fe] {\n      color: inherit;\n}\n.hero.is-warning .title[data-v-4831c6fe] {\n      color: rgba(0, 0, 0, 0.7);\n}\n.hero.is-warning .subtitle[data-v-4831c6fe] {\n      color: rgba(0, 0, 0, 0.9);\n}\n.hero.is-warning .subtitle a[data-v-4831c6fe]:not(.button),\n      .hero.is-warning .subtitle strong[data-v-4831c6fe] {\n        color: rgba(0, 0, 0, 0.7);\n}\n@media screen and (max-width: 1087px) {\n.hero.is-warning .navbar-menu[data-v-4831c6fe] {\n        background-color: #ffdd57;\n}\n}\n.hero.is-warning .navbar-item[data-v-4831c6fe],\n    .hero.is-warning .navbar-link[data-v-4831c6fe] {\n      color: rgba(0, 0, 0, 0.7);\n}\n.hero.is-warning a.navbar-item[data-v-4831c6fe]:hover, .hero.is-warning a.navbar-item.is-active[data-v-4831c6fe],\n    .hero.is-warning .navbar-link[data-v-4831c6fe]:hover,\n    .hero.is-warning .navbar-link.is-active[data-v-4831c6fe] {\n      background-color: #ffd83d;\n      color: rgba(0, 0, 0, 0.7);\n}\n.hero.is-warning .tabs a[data-v-4831c6fe] {\n      color: rgba(0, 0, 0, 0.7);\n      opacity: 0.9;\n}\n.hero.is-warning .tabs a[data-v-4831c6fe]:hover {\n        opacity: 1;\n}\n.hero.is-warning .tabs li.is-active a[data-v-4831c6fe] {\n      opacity: 1;\n}\n.hero.is-warning .tabs.is-boxed a[data-v-4831c6fe], .hero.is-warning .tabs.is-toggle a[data-v-4831c6fe] {\n      color: rgba(0, 0, 0, 0.7);\n}\n.hero.is-warning .tabs.is-boxed a[data-v-4831c6fe]:hover, .hero.is-warning .tabs.is-toggle a[data-v-4831c6fe]:hover {\n        background-color: rgba(10, 10, 10, 0.1);\n}\n.hero.is-warning .tabs.is-boxed li.is-active a[data-v-4831c6fe], .hero.is-warning .tabs.is-boxed li.is-active a[data-v-4831c6fe]:hover, .hero.is-warning .tabs.is-toggle li.is-active a[data-v-4831c6fe], .hero.is-warning .tabs.is-toggle li.is-active a[data-v-4831c6fe]:hover {\n      background-color: rgba(0, 0, 0, 0.7);\n      border-color: rgba(0, 0, 0, 0.7);\n      color: #ffdd57;\n}\n.hero.is-warning.is-bold[data-v-4831c6fe] {\n      background-image: linear-gradient(141deg, #ffaf24 0%, #ffdd57 71%, #fffa70 100%);\n}\n@media screen and (max-width: 768px) {\n.hero.is-warning.is-bold .navbar-menu[data-v-4831c6fe] {\n          background-image: linear-gradient(141deg, #ffaf24 0%, #ffdd57 71%, #fffa70 100%);\n}\n}\n.hero.is-danger[data-v-4831c6fe] {\n    background-color: #ff3860;\n    color: #fff;\n}\n.hero.is-danger a[data-v-4831c6fe]:not(.button):not(.dropdown-item):not(.tag),\n    .hero.is-danger strong[data-v-4831c6fe] {\n      color: inherit;\n}\n.hero.is-danger .title[data-v-4831c6fe] {\n      color: #fff;\n}\n.hero.is-danger .subtitle[data-v-4831c6fe] {\n      color: rgba(255, 255, 255, 0.9);\n}\n.hero.is-danger .subtitle a[data-v-4831c6fe]:not(.button),\n      .hero.is-danger .subtitle strong[data-v-4831c6fe] {\n        color: #fff;\n}\n@media screen and (max-width: 1087px) {\n.hero.is-danger .navbar-menu[data-v-4831c6fe] {\n        background-color: #ff3860;\n}\n}\n.hero.is-danger .navbar-item[data-v-4831c6fe],\n    .hero.is-danger .navbar-link[data-v-4831c6fe] {\n      color: rgba(255, 255, 255, 0.7);\n}\n.hero.is-danger a.navbar-item[data-v-4831c6fe]:hover, .hero.is-danger a.navbar-item.is-active[data-v-4831c6fe],\n    .hero.is-danger .navbar-link[data-v-4831c6fe]:hover,\n    .hero.is-danger .navbar-link.is-active[data-v-4831c6fe] {\n      background-color: #ff1f4b;\n      color: #fff;\n}\n.hero.is-danger .tabs a[data-v-4831c6fe] {\n      color: #fff;\n      opacity: 0.9;\n}\n.hero.is-danger .tabs a[data-v-4831c6fe]:hover {\n        opacity: 1;\n}\n.hero.is-danger .tabs li.is-active a[data-v-4831c6fe] {\n      opacity: 1;\n}\n.hero.is-danger .tabs.is-boxed a[data-v-4831c6fe], .hero.is-danger .tabs.is-toggle a[data-v-4831c6fe] {\n      color: #fff;\n}\n.hero.is-danger .tabs.is-boxed a[data-v-4831c6fe]:hover, .hero.is-danger .tabs.is-toggle a[data-v-4831c6fe]:hover {\n        background-color: rgba(10, 10, 10, 0.1);\n}\n.hero.is-danger .tabs.is-boxed li.is-active a[data-v-4831c6fe], .hero.is-danger .tabs.is-boxed li.is-active a[data-v-4831c6fe]:hover, .hero.is-danger .tabs.is-toggle li.is-active a[data-v-4831c6fe], .hero.is-danger .tabs.is-toggle li.is-active a[data-v-4831c6fe]:hover {\n      background-color: #fff;\n      border-color: #fff;\n      color: #ff3860;\n}\n.hero.is-danger.is-bold[data-v-4831c6fe] {\n      background-image: linear-gradient(141deg, #ff0561 0%, #ff3860 71%, #ff5257 100%);\n}\n@media screen and (max-width: 768px) {\n.hero.is-danger.is-bold .navbar-menu[data-v-4831c6fe] {\n          background-image: linear-gradient(141deg, #ff0561 0%, #ff3860 71%, #ff5257 100%);\n}\n}\n.hero.is-small .hero-body[data-v-4831c6fe] {\n    padding-bottom: 1.5rem;\n    padding-top: 1.5rem;\n}\n@media screen and (min-width: 769px), print {\n.hero.is-medium .hero-body[data-v-4831c6fe] {\n      padding-bottom: 9rem;\n      padding-top: 9rem;\n}\n}\n@media screen and (min-width: 769px), print {\n.hero.is-large .hero-body[data-v-4831c6fe] {\n      padding-bottom: 18rem;\n      padding-top: 18rem;\n}\n}\n.hero.is-halfheight .hero-body[data-v-4831c6fe], .hero.is-fullheight .hero-body[data-v-4831c6fe], .hero.is-fullheight-with-navbar .hero-body[data-v-4831c6fe] {\n    align-items: center;\n    display: flex;\n}\n.hero.is-halfheight .hero-body > .container[data-v-4831c6fe], .hero.is-fullheight .hero-body > .container[data-v-4831c6fe], .hero.is-fullheight-with-navbar .hero-body > .container[data-v-4831c6fe] {\n      flex-grow: 1;\n      flex-shrink: 1;\n}\n.hero.is-halfheight[data-v-4831c6fe] {\n    min-height: 50vh;\n}\n.hero.is-fullheight[data-v-4831c6fe] {\n    min-height: 100vh;\n}\n.hero.is-fullheight-with-navbar[data-v-4831c6fe] {\n    min-height: calc(100vh - 3.25rem);\n}\n.hero-video[data-v-4831c6fe] {\n  overflow: hidden;\n}\n.hero-video video[data-v-4831c6fe] {\n    left: 50%;\n    min-height: 100%;\n    min-width: 100%;\n    position: absolute;\n    top: 50%;\n    transform: translate3d(-50%, -50%, 0);\n}\n.hero-video.is-transparent[data-v-4831c6fe] {\n    opacity: 0.3;\n}\n@media screen and (max-width: 768px) {\n.hero-video[data-v-4831c6fe] {\n      display: none;\n}\n}\n.hero-buttons[data-v-4831c6fe] {\n  margin-top: 1.5rem;\n}\n@media screen and (max-width: 768px) {\n.hero-buttons .button[data-v-4831c6fe] {\n      display: flex;\n}\n.hero-buttons .button[data-v-4831c6fe]:not(:last-child) {\n        margin-bottom: 0.75rem;\n}\n}\n@media screen and (min-width: 769px), print {\n.hero-buttons[data-v-4831c6fe] {\n      display: flex;\n      justify-content: center;\n}\n.hero-buttons .button[data-v-4831c6fe]:not(:last-child) {\n        margin-right: 1.5rem;\n}\n}\n.hero-head[data-v-4831c6fe],\n.hero-foot[data-v-4831c6fe] {\n  flex-grow: 0;\n  flex-shrink: 0;\n}\n.hero-body[data-v-4831c6fe] {\n  flex-grow: 1;\n  flex-shrink: 0;\n  padding: 3rem 1.5rem;\n}\n.section[data-v-4831c6fe] {\n  padding: 3rem 1.5rem;\n}\n@media screen and (min-width: 1088px) {\n.section.is-medium[data-v-4831c6fe] {\n      padding: 9rem 1.5rem;\n}\n.section.is-large[data-v-4831c6fe] {\n      padding: 18rem 1.5rem;\n}\n}\n.footer[data-v-4831c6fe] {\n  background-color: #fafafa;\n  padding: 3rem 1.5rem 6rem;\n}\n[data-v-4831c6fe] .tagAreaClass {\n  padding: 2px 4px 2px 4px;\n  margin: 2px 4px 2px 0px;\n}\n[data-v-4831c6fe] .deleteAreaClass {\n  background-color: transparent;\n  border: none;\n}\n[data-v-4831c6fe] .deleteContentClass {\n  color: white;\n}\n", "", {"version":3,"sources":["/Users/fukudayukihiro/JavaScriptProjects/vue-tag-editor/src/components/tag_editors/VueTagEditorBulma.vue"],"names":[],"mappings":"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","file":"VueTagEditorBulma.vue","sourcesContent":["/*! bulma.io v0.7.2 | MIT License | github.com/jgthms/bulma */\n@keyframes spinAround {\n  from {\n    transform: rotate(0deg); }\n  to {\n    transform: rotate(359deg); } }\n\n.delete, .modal-close, .is-unselectable, .button, .file, .breadcrumb, .pagination-previous,\n.pagination-next,\n.pagination-link,\n.pagination-ellipsis, .tabs {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none; }\n\n.select:not(.is-multiple):not(.is-loading)::after, .navbar-link:not(.is-arrowless)::after {\n  border: 3px solid transparent;\n  border-radius: 2px;\n  border-right: 0;\n  border-top: 0;\n  content: \" \";\n  display: block;\n  height: 0.625em;\n  margin-top: -0.4375em;\n  pointer-events: none;\n  position: absolute;\n  top: 50%;\n  transform: rotate(-45deg);\n  transform-origin: center;\n  width: 0.625em; }\n\n.box:not(:last-child), .content:not(:last-child), .notification:not(:last-child), .progress:not(:last-child), .table:not(:last-child), .table-container:not(:last-child), .title:not(:last-child),\n.subtitle:not(:last-child), .block:not(:last-child), .highlight:not(:last-child), .breadcrumb:not(:last-child), .level:not(:last-child), .list:not(:last-child), .message:not(:last-child), .tabs:not(:last-child) {\n  margin-bottom: 1.5rem; }\n\n.delete, .modal-close {\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  background-color: rgba(10, 10, 10, 0.2);\n  border: none;\n  border-radius: 290486px;\n  cursor: pointer;\n  pointer-events: auto;\n  display: inline-block;\n  flex-grow: 0;\n  flex-shrink: 0;\n  font-size: 0;\n  height: 20px;\n  max-height: 20px;\n  max-width: 20px;\n  min-height: 20px;\n  min-width: 20px;\n  outline: none;\n  position: relative;\n  vertical-align: top;\n  width: 20px; }\n  .delete::before, .modal-close::before, .delete::after, .modal-close::after {\n    background-color: white;\n    content: \"\";\n    display: block;\n    left: 50%;\n    position: absolute;\n    top: 50%;\n    transform: translateX(-50%) translateY(-50%) rotate(45deg);\n    transform-origin: center center; }\n  .delete::before, .modal-close::before {\n    height: 2px;\n    width: 50%; }\n  .delete::after, .modal-close::after {\n    height: 50%;\n    width: 2px; }\n  .delete:hover, .modal-close:hover, .delete:focus, .modal-close:focus {\n    background-color: rgba(10, 10, 10, 0.3); }\n  .delete:active, .modal-close:active {\n    background-color: rgba(10, 10, 10, 0.4); }\n  .is-small.delete, .is-small.modal-close {\n    height: 16px;\n    max-height: 16px;\n    max-width: 16px;\n    min-height: 16px;\n    min-width: 16px;\n    width: 16px; }\n  .is-medium.delete, .is-medium.modal-close {\n    height: 24px;\n    max-height: 24px;\n    max-width: 24px;\n    min-height: 24px;\n    min-width: 24px;\n    width: 24px; }\n  .is-large.delete, .is-large.modal-close {\n    height: 32px;\n    max-height: 32px;\n    max-width: 32px;\n    min-height: 32px;\n    min-width: 32px;\n    width: 32px; }\n\n.button.is-loading::after, .select.is-loading::after, .control.is-loading::after, .loader {\n  animation: spinAround 500ms infinite linear;\n  border: 2px solid #dbdbdb;\n  border-radius: 290486px;\n  border-right-color: transparent;\n  border-top-color: transparent;\n  content: \"\";\n  display: block;\n  height: 1em;\n  position: relative;\n  width: 1em; }\n\n.is-overlay, .image.is-square img, .image.is-1by1 img, .image.is-5by4 img, .image.is-4by3 img, .image.is-3by2 img, .image.is-5by3 img, .image.is-16by9 img, .image.is-2by1 img, .image.is-3by1 img, .image.is-4by5 img, .image.is-3by4 img, .image.is-2by3 img, .image.is-3by5 img, .image.is-9by16 img, .image.is-1by2 img, .image.is-1by3 img, .modal, .modal-background, .hero-video {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0; }\n\n.button, .input,\n.textarea, .select select, .file-cta,\n.file-name, .pagination-previous,\n.pagination-next,\n.pagination-link,\n.pagination-ellipsis {\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  align-items: center;\n  border: 1px solid transparent;\n  border-radius: 4px;\n  box-shadow: none;\n  display: inline-flex;\n  font-size: 1rem;\n  height: 2.25em;\n  justify-content: flex-start;\n  line-height: 1.5;\n  padding-bottom: calc(0.375em - 1px);\n  padding-left: calc(0.625em - 1px);\n  padding-right: calc(0.625em - 1px);\n  padding-top: calc(0.375em - 1px);\n  position: relative;\n  vertical-align: top; }\n  .button:focus, .input:focus,\n  .textarea:focus, .select select:focus, .file-cta:focus,\n  .file-name:focus, .pagination-previous:focus,\n  .pagination-next:focus,\n  .pagination-link:focus,\n  .pagination-ellipsis:focus, .is-focused.button, .is-focused.input,\n  .is-focused.textarea, .select select.is-focused, .is-focused.file-cta,\n  .is-focused.file-name, .is-focused.pagination-previous,\n  .is-focused.pagination-next,\n  .is-focused.pagination-link,\n  .is-focused.pagination-ellipsis, .button:active, .input:active,\n  .textarea:active, .select select:active, .file-cta:active,\n  .file-name:active, .pagination-previous:active,\n  .pagination-next:active,\n  .pagination-link:active,\n  .pagination-ellipsis:active, .is-active.button, .is-active.input,\n  .is-active.textarea, .select select.is-active, .is-active.file-cta,\n  .is-active.file-name, .is-active.pagination-previous,\n  .is-active.pagination-next,\n  .is-active.pagination-link,\n  .is-active.pagination-ellipsis {\n    outline: none; }\n  .button[disabled], .input[disabled],\n  .textarea[disabled], .select select[disabled], .file-cta[disabled],\n  .file-name[disabled], .pagination-previous[disabled],\n  .pagination-next[disabled],\n  .pagination-link[disabled],\n  .pagination-ellipsis[disabled] {\n    cursor: not-allowed; }\n\n/*! minireset.css v0.0.3 | MIT License | github.com/jgthms/minireset.css */\nhtml,\nbody,\np,\nol,\nul,\nli,\ndl,\ndt,\ndd,\nblockquote,\nfigure,\nfieldset,\nlegend,\ntextarea,\npre,\niframe,\nhr,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  margin: 0;\n  padding: 0; }\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: 100%;\n  font-weight: normal; }\n\nul {\n  list-style: none; }\n\nbutton,\ninput,\nselect,\ntextarea {\n  margin: 0; }\n\nhtml {\n  box-sizing: border-box; }\n\n*, *::before, *::after {\n  box-sizing: inherit; }\n\nimg,\naudio,\nvideo {\n  height: auto;\n  max-width: 100%; }\n\niframe {\n  border: 0; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\ntd,\nth {\n  padding: 0;\n  text-align: left; }\n\nhtml {\n  background-color: white;\n  font-size: 16px;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  min-width: 300px;\n  overflow-x: hidden;\n  overflow-y: scroll;\n  text-rendering: optimizeLegibility;\n  text-size-adjust: 100%; }\n\narticle,\naside,\nfigure,\nfooter,\nheader,\nhgroup,\nsection {\n  display: block; }\n\nbody,\nbutton,\ninput,\nselect,\ntextarea {\n  font-family: BlinkMacSystemFont, -apple-system, \"Segoe UI\", \"Roboto\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", sans-serif; }\n\ncode,\npre {\n  -moz-osx-font-smoothing: auto;\n  -webkit-font-smoothing: auto;\n  font-family: monospace; }\n\nbody {\n  color: #4a4a4a;\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5; }\n\na {\n  color: #3273dc;\n  cursor: pointer;\n  text-decoration: none; }\n  a strong {\n    color: currentColor; }\n  a:hover {\n    color: #363636; }\n\ncode {\n  background-color: whitesmoke;\n  color: #ff3860;\n  font-size: 0.875em;\n  font-weight: normal;\n  padding: 0.25em 0.5em 0.25em; }\n\nhr {\n  background-color: whitesmoke;\n  border: none;\n  display: block;\n  height: 2px;\n  margin: 1.5rem 0; }\n\nimg {\n  height: auto;\n  max-width: 100%; }\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  vertical-align: baseline; }\n\nsmall {\n  font-size: 0.875em; }\n\nspan {\n  font-style: inherit;\n  font-weight: inherit; }\n\nstrong {\n  color: #363636;\n  font-weight: 700; }\n\npre {\n  -webkit-overflow-scrolling: touch;\n  background-color: whitesmoke;\n  color: #4a4a4a;\n  font-size: 0.875em;\n  overflow-x: auto;\n  padding: 1.25rem 1.5rem;\n  white-space: pre;\n  word-wrap: normal; }\n  pre code {\n    background-color: transparent;\n    color: currentColor;\n    font-size: 1em;\n    padding: 0; }\n\ntable td,\ntable th {\n  text-align: left;\n  vertical-align: top; }\n\ntable th {\n  color: #363636; }\n\n.is-clearfix::after {\n  clear: both;\n  content: \" \";\n  display: table; }\n\n.is-pulled-left {\n  float: left !important; }\n\n.is-pulled-right {\n  float: right !important; }\n\n.is-clipped {\n  overflow: hidden !important; }\n\n.is-size-1 {\n  font-size: 3rem !important; }\n\n.is-size-2 {\n  font-size: 2.5rem !important; }\n\n.is-size-3 {\n  font-size: 2rem !important; }\n\n.is-size-4 {\n  font-size: 1.5rem !important; }\n\n.is-size-5 {\n  font-size: 1.25rem !important; }\n\n.is-size-6 {\n  font-size: 1rem !important; }\n\n.is-size-7 {\n  font-size: 0.75rem !important; }\n\n@media screen and (max-width: 768px) {\n  .is-size-1-mobile {\n    font-size: 3rem !important; }\n  .is-size-2-mobile {\n    font-size: 2.5rem !important; }\n  .is-size-3-mobile {\n    font-size: 2rem !important; }\n  .is-size-4-mobile {\n    font-size: 1.5rem !important; }\n  .is-size-5-mobile {\n    font-size: 1.25rem !important; }\n  .is-size-6-mobile {\n    font-size: 1rem !important; }\n  .is-size-7-mobile {\n    font-size: 0.75rem !important; } }\n\n@media screen and (min-width: 769px), print {\n  .is-size-1-tablet {\n    font-size: 3rem !important; }\n  .is-size-2-tablet {\n    font-size: 2.5rem !important; }\n  .is-size-3-tablet {\n    font-size: 2rem !important; }\n  .is-size-4-tablet {\n    font-size: 1.5rem !important; }\n  .is-size-5-tablet {\n    font-size: 1.25rem !important; }\n  .is-size-6-tablet {\n    font-size: 1rem !important; }\n  .is-size-7-tablet {\n    font-size: 0.75rem !important; } }\n\n@media screen and (max-width: 1087px) {\n  .is-size-1-touch {\n    font-size: 3rem !important; }\n  .is-size-2-touch {\n    font-size: 2.5rem !important; }\n  .is-size-3-touch {\n    font-size: 2rem !important; }\n  .is-size-4-touch {\n    font-size: 1.5rem !important; }\n  .is-size-5-touch {\n    font-size: 1.25rem !important; }\n  .is-size-6-touch {\n    font-size: 1rem !important; }\n  .is-size-7-touch {\n    font-size: 0.75rem !important; } }\n\n@media screen and (min-width: 1088px) {\n  .is-size-1-desktop {\n    font-size: 3rem !important; }\n  .is-size-2-desktop {\n    font-size: 2.5rem !important; }\n  .is-size-3-desktop {\n    font-size: 2rem !important; }\n  .is-size-4-desktop {\n    font-size: 1.5rem !important; }\n  .is-size-5-desktop {\n    font-size: 1.25rem !important; }\n  .is-size-6-desktop {\n    font-size: 1rem !important; }\n  .is-size-7-desktop {\n    font-size: 0.75rem !important; } }\n\n@media screen and (min-width: 1280px) {\n  .is-size-1-widescreen {\n    font-size: 3rem !important; }\n  .is-size-2-widescreen {\n    font-size: 2.5rem !important; }\n  .is-size-3-widescreen {\n    font-size: 2rem !important; }\n  .is-size-4-widescreen {\n    font-size: 1.5rem !important; }\n  .is-size-5-widescreen {\n    font-size: 1.25rem !important; }\n  .is-size-6-widescreen {\n    font-size: 1rem !important; }\n  .is-size-7-widescreen {\n    font-size: 0.75rem !important; } }\n\n@media screen and (min-width: 1472px) {\n  .is-size-1-fullhd {\n    font-size: 3rem !important; }\n  .is-size-2-fullhd {\n    font-size: 2.5rem !important; }\n  .is-size-3-fullhd {\n    font-size: 2rem !important; }\n  .is-size-4-fullhd {\n    font-size: 1.5rem !important; }\n  .is-size-5-fullhd {\n    font-size: 1.25rem !important; }\n  .is-size-6-fullhd {\n    font-size: 1rem !important; }\n  .is-size-7-fullhd {\n    font-size: 0.75rem !important; } }\n\n.has-text-centered {\n  text-align: center !important; }\n\n.has-text-justified {\n  text-align: justify !important; }\n\n.has-text-left {\n  text-align: left !important; }\n\n.has-text-right {\n  text-align: right !important; }\n\n@media screen and (max-width: 768px) {\n  .has-text-centered-mobile {\n    text-align: center !important; } }\n\n@media screen and (min-width: 769px), print {\n  .has-text-centered-tablet {\n    text-align: center !important; } }\n\n@media screen and (min-width: 769px) and (max-width: 1087px) {\n  .has-text-centered-tablet-only {\n    text-align: center !important; } }\n\n@media screen and (max-width: 1087px) {\n  .has-text-centered-touch {\n    text-align: center !important; } }\n\n@media screen and (min-width: 1088px) {\n  .has-text-centered-desktop {\n    text-align: center !important; } }\n\n@media screen and (min-width: 1088px) and (max-width: 1279px) {\n  .has-text-centered-desktop-only {\n    text-align: center !important; } }\n\n@media screen and (min-width: 1280px) {\n  .has-text-centered-widescreen {\n    text-align: center !important; } }\n\n@media screen and (min-width: 1280px) and (max-width: 1471px) {\n  .has-text-centered-widescreen-only {\n    text-align: center !important; } }\n\n@media screen and (min-width: 1472px) {\n  .has-text-centered-fullhd {\n    text-align: center !important; } }\n\n@media screen and (max-width: 768px) {\n  .has-text-justified-mobile {\n    text-align: justify !important; } }\n\n@media screen and (min-width: 769px), print {\n  .has-text-justified-tablet {\n    text-align: justify !important; } }\n\n@media screen and (min-width: 769px) and (max-width: 1087px) {\n  .has-text-justified-tablet-only {\n    text-align: justify !important; } }\n\n@media screen and (max-width: 1087px) {\n  .has-text-justified-touch {\n    text-align: justify !important; } }\n\n@media screen and (min-width: 1088px) {\n  .has-text-justified-desktop {\n    text-align: justify !important; } }\n\n@media screen and (min-width: 1088px) and (max-width: 1279px) {\n  .has-text-justified-desktop-only {\n    text-align: justify !important; } }\n\n@media screen and (min-width: 1280px) {\n  .has-text-justified-widescreen {\n    text-align: justify !important; } }\n\n@media screen and (min-width: 1280px) and (max-width: 1471px) {\n  .has-text-justified-widescreen-only {\n    text-align: justify !important; } }\n\n@media screen and (min-width: 1472px) {\n  .has-text-justified-fullhd {\n    text-align: justify !important; } }\n\n@media screen and (max-width: 768px) {\n  .has-text-left-mobile {\n    text-align: left !important; } }\n\n@media screen and (min-width: 769px), print {\n  .has-text-left-tablet {\n    text-align: left !important; } }\n\n@media screen and (min-width: 769px) and (max-width: 1087px) {\n  .has-text-left-tablet-only {\n    text-align: left !important; } }\n\n@media screen and (max-width: 1087px) {\n  .has-text-left-touch {\n    text-align: left !important; } }\n\n@media screen and (min-width: 1088px) {\n  .has-text-left-desktop {\n    text-align: left !important; } }\n\n@media screen and (min-width: 1088px) and (max-width: 1279px) {\n  .has-text-left-desktop-only {\n    text-align: left !important; } }\n\n@media screen and (min-width: 1280px) {\n  .has-text-left-widescreen {\n    text-align: left !important; } }\n\n@media screen and (min-width: 1280px) and (max-width: 1471px) {\n  .has-text-left-widescreen-only {\n    text-align: left !important; } }\n\n@media screen and (min-width: 1472px) {\n  .has-text-left-fullhd {\n    text-align: left !important; } }\n\n@media screen and (max-width: 768px) {\n  .has-text-right-mobile {\n    text-align: right !important; } }\n\n@media screen and (min-width: 769px), print {\n  .has-text-right-tablet {\n    text-align: right !important; } }\n\n@media screen and (min-width: 769px) and (max-width: 1087px) {\n  .has-text-right-tablet-only {\n    text-align: right !important; } }\n\n@media screen and (max-width: 1087px) {\n  .has-text-right-touch {\n    text-align: right !important; } }\n\n@media screen and (min-width: 1088px) {\n  .has-text-right-desktop {\n    text-align: right !important; } }\n\n@media screen and (min-width: 1088px) and (max-width: 1279px) {\n  .has-text-right-desktop-only {\n    text-align: right !important; } }\n\n@media screen and (min-width: 1280px) {\n  .has-text-right-widescreen {\n    text-align: right !important; } }\n\n@media screen and (min-width: 1280px) and (max-width: 1471px) {\n  .has-text-right-widescreen-only {\n    text-align: right !important; } }\n\n@media screen and (min-width: 1472px) {\n  .has-text-right-fullhd {\n    text-align: right !important; } }\n\n.is-capitalized {\n  text-transform: capitalize !important; }\n\n.is-lowercase {\n  text-transform: lowercase !important; }\n\n.is-uppercase {\n  text-transform: uppercase !important; }\n\n.is-italic {\n  font-style: italic !important; }\n\n.has-text-white {\n  color: white !important; }\n\na.has-text-white:hover, a.has-text-white:focus {\n  color: #e6e6e6 !important; }\n\n.has-background-white {\n  background-color: white !important; }\n\n.has-text-black {\n  color: #0a0a0a !important; }\n\na.has-text-black:hover, a.has-text-black:focus {\n  color: black !important; }\n\n.has-background-black {\n  background-color: #0a0a0a !important; }\n\n.has-text-light {\n  color: whitesmoke !important; }\n\na.has-text-light:hover, a.has-text-light:focus {\n  color: #dbdbdb !important; }\n\n.has-background-light {\n  background-color: whitesmoke !important; }\n\n.has-text-dark {\n  color: #363636 !important; }\n\na.has-text-dark:hover, a.has-text-dark:focus {\n  color: #1c1c1c !important; }\n\n.has-background-dark {\n  background-color: #363636 !important; }\n\n.has-text-primary {\n  color: #00d1b2 !important; }\n\na.has-text-primary:hover, a.has-text-primary:focus {\n  color: #009e86 !important; }\n\n.has-background-primary {\n  background-color: #00d1b2 !important; }\n\n.has-text-link {\n  color: #3273dc !important; }\n\na.has-text-link:hover, a.has-text-link:focus {\n  color: #205bbc !important; }\n\n.has-background-link {\n  background-color: #3273dc !important; }\n\n.has-text-info {\n  color: #209cee !important; }\n\na.has-text-info:hover, a.has-text-info:focus {\n  color: #0f81cc !important; }\n\n.has-background-info {\n  background-color: #209cee !important; }\n\n.has-text-success {\n  color: #23d160 !important; }\n\na.has-text-success:hover, a.has-text-success:focus {\n  color: #1ca64c !important; }\n\n.has-background-success {\n  background-color: #23d160 !important; }\n\n.has-text-warning {\n  color: #ffdd57 !important; }\n\na.has-text-warning:hover, a.has-text-warning:focus {\n  color: #ffd324 !important; }\n\n.has-background-warning {\n  background-color: #ffdd57 !important; }\n\n.has-text-danger {\n  color: #ff3860 !important; }\n\na.has-text-danger:hover, a.has-text-danger:focus {\n  color: #ff0537 !important; }\n\n.has-background-danger {\n  background-color: #ff3860 !important; }\n\n.has-text-black-bis {\n  color: #121212 !important; }\n\n.has-background-black-bis {\n  background-color: #121212 !important; }\n\n.has-text-black-ter {\n  color: #242424 !important; }\n\n.has-background-black-ter {\n  background-color: #242424 !important; }\n\n.has-text-grey-darker {\n  color: #363636 !important; }\n\n.has-background-grey-darker {\n  background-color: #363636 !important; }\n\n.has-text-grey-dark {\n  color: #4a4a4a !important; }\n\n.has-background-grey-dark {\n  background-color: #4a4a4a !important; }\n\n.has-text-grey {\n  color: #7a7a7a !important; }\n\n.has-background-grey {\n  background-color: #7a7a7a !important; }\n\n.has-text-grey-light {\n  color: #b5b5b5 !important; }\n\n.has-background-grey-light {\n  background-color: #b5b5b5 !important; }\n\n.has-text-grey-lighter {\n  color: #dbdbdb !important; }\n\n.has-background-grey-lighter {\n  background-color: #dbdbdb !important; }\n\n.has-text-white-ter {\n  color: whitesmoke !important; }\n\n.has-background-white-ter {\n  background-color: whitesmoke !important; }\n\n.has-text-white-bis {\n  color: #fafafa !important; }\n\n.has-background-white-bis {\n  background-color: #fafafa !important; }\n\n.has-text-weight-light {\n  font-weight: 300 !important; }\n\n.has-text-weight-normal {\n  font-weight: 400 !important; }\n\n.has-text-weight-semibold {\n  font-weight: 600 !important; }\n\n.has-text-weight-bold {\n  font-weight: 700 !important; }\n\n.is-block {\n  display: block !important; }\n\n@media screen and (max-width: 768px) {\n  .is-block-mobile {\n    display: block !important; } }\n\n@media screen and (min-width: 769px), print {\n  .is-block-tablet {\n    display: block !important; } }\n\n@media screen and (min-width: 769px) and (max-width: 1087px) {\n  .is-block-tablet-only {\n    display: block !important; } }\n\n@media screen and (max-width: 1087px) {\n  .is-block-touch {\n    display: block !important; } }\n\n@media screen and (min-width: 1088px) {\n  .is-block-desktop {\n    display: block !important; } }\n\n@media screen and (min-width: 1088px) and (max-width: 1279px) {\n  .is-block-desktop-only {\n    display: block !important; } }\n\n@media screen and (min-width: 1280px) {\n  .is-block-widescreen {\n    display: block !important; } }\n\n@media screen and (min-width: 1280px) and (max-width: 1471px) {\n  .is-block-widescreen-only {\n    display: block !important; } }\n\n@media screen and (min-width: 1472px) {\n  .is-block-fullhd {\n    display: block !important; } }\n\n.is-flex {\n  display: flex !important; }\n\n@media screen and (max-width: 768px) {\n  .is-flex-mobile {\n    display: flex !important; } }\n\n@media screen and (min-width: 769px), print {\n  .is-flex-tablet {\n    display: flex !important; } }\n\n@media screen and (min-width: 769px) and (max-width: 1087px) {\n  .is-flex-tablet-only {\n    display: flex !important; } }\n\n@media screen and (max-width: 1087px) {\n  .is-flex-touch {\n    display: flex !important; } }\n\n@media screen and (min-width: 1088px) {\n  .is-flex-desktop {\n    display: flex !important; } }\n\n@media screen and (min-width: 1088px) and (max-width: 1279px) {\n  .is-flex-desktop-only {\n    display: flex !important; } }\n\n@media screen and (min-width: 1280px) {\n  .is-flex-widescreen {\n    display: flex !important; } }\n\n@media screen and (min-width: 1280px) and (max-width: 1471px) {\n  .is-flex-widescreen-only {\n    display: flex !important; } }\n\n@media screen and (min-width: 1472px) {\n  .is-flex-fullhd {\n    display: flex !important; } }\n\n.is-inline {\n  display: inline !important; }\n\n@media screen and (max-width: 768px) {\n  .is-inline-mobile {\n    display: inline !important; } }\n\n@media screen and (min-width: 769px), print {\n  .is-inline-tablet {\n    display: inline !important; } }\n\n@media screen and (min-width: 769px) and (max-width: 1087px) {\n  .is-inline-tablet-only {\n    display: inline !important; } }\n\n@media screen and (max-width: 1087px) {\n  .is-inline-touch {\n    display: inline !important; } }\n\n@media screen and (min-width: 1088px) {\n  .is-inline-desktop {\n    display: inline !important; } }\n\n@media screen and (min-width: 1088px) and (max-width: 1279px) {\n  .is-inline-desktop-only {\n    display: inline !important; } }\n\n@media screen and (min-width: 1280px) {\n  .is-inline-widescreen {\n    display: inline !important; } }\n\n@media screen and (min-width: 1280px) and (max-width: 1471px) {\n  .is-inline-widescreen-only {\n    display: inline !important; } }\n\n@media screen and (min-width: 1472px) {\n  .is-inline-fullhd {\n    display: inline !important; } }\n\n.is-inline-block {\n  display: inline-block !important; }\n\n@media screen and (max-width: 768px) {\n  .is-inline-block-mobile {\n    display: inline-block !important; } }\n\n@media screen and (min-width: 769px), print {\n  .is-inline-block-tablet {\n    display: inline-block !important; } }\n\n@media screen and (min-width: 769px) and (max-width: 1087px) {\n  .is-inline-block-tablet-only {\n    display: inline-block !important; } }\n\n@media screen and (max-width: 1087px) {\n  .is-inline-block-touch {\n    display: inline-block !important; } }\n\n@media screen and (min-width: 1088px) {\n  .is-inline-block-desktop {\n    display: inline-block !important; } }\n\n@media screen and (min-width: 1088px) and (max-width: 1279px) {\n  .is-inline-block-desktop-only {\n    display: inline-block !important; } }\n\n@media screen and (min-width: 1280px) {\n  .is-inline-block-widescreen {\n    display: inline-block !important; } }\n\n@media screen and (min-width: 1280px) and (max-width: 1471px) {\n  .is-inline-block-widescreen-only {\n    display: inline-block !important; } }\n\n@media screen and (min-width: 1472px) {\n  .is-inline-block-fullhd {\n    display: inline-block !important; } }\n\n.is-inline-flex {\n  display: inline-flex !important; }\n\n@media screen and (max-width: 768px) {\n  .is-inline-flex-mobile {\n    display: inline-flex !important; } }\n\n@media screen and (min-width: 769px), print {\n  .is-inline-flex-tablet {\n    display: inline-flex !important; } }\n\n@media screen and (min-width: 769px) and (max-width: 1087px) {\n  .is-inline-flex-tablet-only {\n    display: inline-flex !important; } }\n\n@media screen and (max-width: 1087px) {\n  .is-inline-flex-touch {\n    display: inline-flex !important; } }\n\n@media screen and (min-width: 1088px) {\n  .is-inline-flex-desktop {\n    display: inline-flex !important; } }\n\n@media screen and (min-width: 1088px) and (max-width: 1279px) {\n  .is-inline-flex-desktop-only {\n    display: inline-flex !important; } }\n\n@media screen and (min-width: 1280px) {\n  .is-inline-flex-widescreen {\n    display: inline-flex !important; } }\n\n@media screen and (min-width: 1280px) and (max-width: 1471px) {\n  .is-inline-flex-widescreen-only {\n    display: inline-flex !important; } }\n\n@media screen and (min-width: 1472px) {\n  .is-inline-flex-fullhd {\n    display: inline-flex !important; } }\n\n.is-hidden {\n  display: none !important; }\n\n.is-sr-only {\n  border: none !important;\n  clip: rect(0, 0, 0, 0) !important;\n  height: 0.01em !important;\n  overflow: hidden !important;\n  padding: 0 !important;\n  position: absolute !important;\n  white-space: nowrap !important;\n  width: 0.01em !important; }\n\n@media screen and (max-width: 768px) {\n  .is-hidden-mobile {\n    display: none !important; } }\n\n@media screen and (min-width: 769px), print {\n  .is-hidden-tablet {\n    display: none !important; } }\n\n@media screen and (min-width: 769px) and (max-width: 1087px) {\n  .is-hidden-tablet-only {\n    display: none !important; } }\n\n@media screen and (max-width: 1087px) {\n  .is-hidden-touch {\n    display: none !important; } }\n\n@media screen and (min-width: 1088px) {\n  .is-hidden-desktop {\n    display: none !important; } }\n\n@media screen and (min-width: 1088px) and (max-width: 1279px) {\n  .is-hidden-desktop-only {\n    display: none !important; } }\n\n@media screen and (min-width: 1280px) {\n  .is-hidden-widescreen {\n    display: none !important; } }\n\n@media screen and (min-width: 1280px) and (max-width: 1471px) {\n  .is-hidden-widescreen-only {\n    display: none !important; } }\n\n@media screen and (min-width: 1472px) {\n  .is-hidden-fullhd {\n    display: none !important; } }\n\n.is-invisible {\n  visibility: hidden !important; }\n\n@media screen and (max-width: 768px) {\n  .is-invisible-mobile {\n    visibility: hidden !important; } }\n\n@media screen and (min-width: 769px), print {\n  .is-invisible-tablet {\n    visibility: hidden !important; } }\n\n@media screen and (min-width: 769px) and (max-width: 1087px) {\n  .is-invisible-tablet-only {\n    visibility: hidden !important; } }\n\n@media screen and (max-width: 1087px) {\n  .is-invisible-touch {\n    visibility: hidden !important; } }\n\n@media screen and (min-width: 1088px) {\n  .is-invisible-desktop {\n    visibility: hidden !important; } }\n\n@media screen and (min-width: 1088px) and (max-width: 1279px) {\n  .is-invisible-desktop-only {\n    visibility: hidden !important; } }\n\n@media screen and (min-width: 1280px) {\n  .is-invisible-widescreen {\n    visibility: hidden !important; } }\n\n@media screen and (min-width: 1280px) and (max-width: 1471px) {\n  .is-invisible-widescreen-only {\n    visibility: hidden !important; } }\n\n@media screen and (min-width: 1472px) {\n  .is-invisible-fullhd {\n    visibility: hidden !important; } }\n\n.is-marginless {\n  margin: 0 !important; }\n\n.is-paddingless {\n  padding: 0 !important; }\n\n.is-radiusless {\n  border-radius: 0 !important; }\n\n.is-shadowless {\n  box-shadow: none !important; }\n\n.box {\n  background-color: white;\n  border-radius: 6px;\n  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);\n  color: #4a4a4a;\n  display: block;\n  padding: 1.25rem; }\n\na.box:hover, a.box:focus {\n  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px #3273dc; }\n\na.box:active {\n  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2), 0 0 0 1px #3273dc; }\n\n.button {\n  background-color: white;\n  border-color: #dbdbdb;\n  border-width: 1px;\n  color: #363636;\n  cursor: pointer;\n  justify-content: center;\n  padding-bottom: calc(0.375em - 1px);\n  padding-left: 0.75em;\n  padding-right: 0.75em;\n  padding-top: calc(0.375em - 1px);\n  text-align: center;\n  white-space: nowrap; }\n  .button strong {\n    color: inherit; }\n  .button .icon, .button .icon.is-small, .button .icon.is-medium, .button .icon.is-large {\n    height: 1.5em;\n    width: 1.5em; }\n  .button .icon:first-child:not(:last-child) {\n    margin-left: calc(-0.375em - 1px);\n    margin-right: 0.1875em; }\n  .button .icon:last-child:not(:first-child) {\n    margin-left: 0.1875em;\n    margin-right: calc(-0.375em - 1px); }\n  .button .icon:first-child:last-child {\n    margin-left: calc(-0.375em - 1px);\n    margin-right: calc(-0.375em - 1px); }\n  .button:hover, .button.is-hovered {\n    border-color: #b5b5b5;\n    color: #363636; }\n  .button:focus, .button.is-focused {\n    border-color: #3273dc;\n    color: #363636; }\n    .button:focus:not(:active), .button.is-focused:not(:active) {\n      box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25); }\n  .button:active, .button.is-active {\n    border-color: #4a4a4a;\n    color: #363636; }\n  .button.is-text {\n    background-color: transparent;\n    border-color: transparent;\n    color: #4a4a4a;\n    text-decoration: underline; }\n    .button.is-text:hover, .button.is-text.is-hovered, .button.is-text:focus, .button.is-text.is-focused {\n      background-color: whitesmoke;\n      color: #363636; }\n    .button.is-text:active, .button.is-text.is-active {\n      background-color: #e8e8e8;\n      color: #363636; }\n    .button.is-text[disabled] {\n      background-color: transparent;\n      border-color: transparent;\n      box-shadow: none; }\n  .button.is-white {\n    background-color: white;\n    border-color: transparent;\n    color: #0a0a0a; }\n    .button.is-white:hover, .button.is-white.is-hovered {\n      background-color: #f9f9f9;\n      border-color: transparent;\n      color: #0a0a0a; }\n    .button.is-white:focus, .button.is-white.is-focused {\n      border-color: transparent;\n      color: #0a0a0a; }\n      .button.is-white:focus:not(:active), .button.is-white.is-focused:not(:active) {\n        box-shadow: 0 0 0 0.125em rgba(255, 255, 255, 0.25); }\n    .button.is-white:active, .button.is-white.is-active {\n      background-color: #f2f2f2;\n      border-color: transparent;\n      color: #0a0a0a; }\n    .button.is-white[disabled] {\n      background-color: white;\n      border-color: transparent;\n      box-shadow: none; }\n    .button.is-white.is-inverted {\n      background-color: #0a0a0a;\n      color: white; }\n      .button.is-white.is-inverted:hover {\n        background-color: black; }\n      .button.is-white.is-inverted[disabled] {\n        background-color: #0a0a0a;\n        border-color: transparent;\n        box-shadow: none;\n        color: white; }\n    .button.is-white.is-loading::after {\n      border-color: transparent transparent #0a0a0a #0a0a0a !important; }\n    .button.is-white.is-outlined {\n      background-color: transparent;\n      border-color: white;\n      color: white; }\n      .button.is-white.is-outlined:hover, .button.is-white.is-outlined:focus {\n        background-color: white;\n        border-color: white;\n        color: #0a0a0a; }\n      .button.is-white.is-outlined.is-loading::after {\n        border-color: transparent transparent white white !important; }\n      .button.is-white.is-outlined[disabled] {\n        background-color: transparent;\n        border-color: white;\n        box-shadow: none;\n        color: white; }\n    .button.is-white.is-inverted.is-outlined {\n      background-color: transparent;\n      border-color: #0a0a0a;\n      color: #0a0a0a; }\n      .button.is-white.is-inverted.is-outlined:hover, .button.is-white.is-inverted.is-outlined:focus {\n        background-color: #0a0a0a;\n        color: white; }\n      .button.is-white.is-inverted.is-outlined[disabled] {\n        background-color: transparent;\n        border-color: #0a0a0a;\n        box-shadow: none;\n        color: #0a0a0a; }\n  .button.is-black {\n    background-color: #0a0a0a;\n    border-color: transparent;\n    color: white; }\n    .button.is-black:hover, .button.is-black.is-hovered {\n      background-color: #040404;\n      border-color: transparent;\n      color: white; }\n    .button.is-black:focus, .button.is-black.is-focused {\n      border-color: transparent;\n      color: white; }\n      .button.is-black:focus:not(:active), .button.is-black.is-focused:not(:active) {\n        box-shadow: 0 0 0 0.125em rgba(10, 10, 10, 0.25); }\n    .button.is-black:active, .button.is-black.is-active {\n      background-color: black;\n      border-color: transparent;\n      color: white; }\n    .button.is-black[disabled] {\n      background-color: #0a0a0a;\n      border-color: transparent;\n      box-shadow: none; }\n    .button.is-black.is-inverted {\n      background-color: white;\n      color: #0a0a0a; }\n      .button.is-black.is-inverted:hover {\n        background-color: #f2f2f2; }\n      .button.is-black.is-inverted[disabled] {\n        background-color: white;\n        border-color: transparent;\n        box-shadow: none;\n        color: #0a0a0a; }\n    .button.is-black.is-loading::after {\n      border-color: transparent transparent white white !important; }\n    .button.is-black.is-outlined {\n      background-color: transparent;\n      border-color: #0a0a0a;\n      color: #0a0a0a; }\n      .button.is-black.is-outlined:hover, .button.is-black.is-outlined:focus {\n        background-color: #0a0a0a;\n        border-color: #0a0a0a;\n        color: white; }\n      .button.is-black.is-outlined.is-loading::after {\n        border-color: transparent transparent #0a0a0a #0a0a0a !important; }\n      .button.is-black.is-outlined[disabled] {\n        background-color: transparent;\n        border-color: #0a0a0a;\n        box-shadow: none;\n        color: #0a0a0a; }\n    .button.is-black.is-inverted.is-outlined {\n      background-color: transparent;\n      border-color: white;\n      color: white; }\n      .button.is-black.is-inverted.is-outlined:hover, .button.is-black.is-inverted.is-outlined:focus {\n        background-color: white;\n        color: #0a0a0a; }\n      .button.is-black.is-inverted.is-outlined[disabled] {\n        background-color: transparent;\n        border-color: white;\n        box-shadow: none;\n        color: white; }\n  .button.is-light {\n    background-color: whitesmoke;\n    border-color: transparent;\n    color: #363636; }\n    .button.is-light:hover, .button.is-light.is-hovered {\n      background-color: #eeeeee;\n      border-color: transparent;\n      color: #363636; }\n    .button.is-light:focus, .button.is-light.is-focused {\n      border-color: transparent;\n      color: #363636; }\n      .button.is-light:focus:not(:active), .button.is-light.is-focused:not(:active) {\n        box-shadow: 0 0 0 0.125em rgba(245, 245, 245, 0.25); }\n    .button.is-light:active, .button.is-light.is-active {\n      background-color: #e8e8e8;\n      border-color: transparent;\n      color: #363636; }\n    .button.is-light[disabled] {\n      background-color: whitesmoke;\n      border-color: transparent;\n      box-shadow: none; }\n    .button.is-light.is-inverted {\n      background-color: #363636;\n      color: whitesmoke; }\n      .button.is-light.is-inverted:hover {\n        background-color: #292929; }\n      .button.is-light.is-inverted[disabled] {\n        background-color: #363636;\n        border-color: transparent;\n        box-shadow: none;\n        color: whitesmoke; }\n    .button.is-light.is-loading::after {\n      border-color: transparent transparent #363636 #363636 !important; }\n    .button.is-light.is-outlined {\n      background-color: transparent;\n      border-color: whitesmoke;\n      color: whitesmoke; }\n      .button.is-light.is-outlined:hover, .button.is-light.is-outlined:focus {\n        background-color: whitesmoke;\n        border-color: whitesmoke;\n        color: #363636; }\n      .button.is-light.is-outlined.is-loading::after {\n        border-color: transparent transparent whitesmoke whitesmoke !important; }\n      .button.is-light.is-outlined[disabled] {\n        background-color: transparent;\n        border-color: whitesmoke;\n        box-shadow: none;\n        color: whitesmoke; }\n    .button.is-light.is-inverted.is-outlined {\n      background-color: transparent;\n      border-color: #363636;\n      color: #363636; }\n      .button.is-light.is-inverted.is-outlined:hover, .button.is-light.is-inverted.is-outlined:focus {\n        background-color: #363636;\n        color: whitesmoke; }\n      .button.is-light.is-inverted.is-outlined[disabled] {\n        background-color: transparent;\n        border-color: #363636;\n        box-shadow: none;\n        color: #363636; }\n  .button.is-dark {\n    background-color: #363636;\n    border-color: transparent;\n    color: whitesmoke; }\n    .button.is-dark:hover, .button.is-dark.is-hovered {\n      background-color: #2f2f2f;\n      border-color: transparent;\n      color: whitesmoke; }\n    .button.is-dark:focus, .button.is-dark.is-focused {\n      border-color: transparent;\n      color: whitesmoke; }\n      .button.is-dark:focus:not(:active), .button.is-dark.is-focused:not(:active) {\n        box-shadow: 0 0 0 0.125em rgba(54, 54, 54, 0.25); }\n    .button.is-dark:active, .button.is-dark.is-active {\n      background-color: #292929;\n      border-color: transparent;\n      color: whitesmoke; }\n    .button.is-dark[disabled] {\n      background-color: #363636;\n      border-color: transparent;\n      box-shadow: none; }\n    .button.is-dark.is-inverted {\n      background-color: whitesmoke;\n      color: #363636; }\n      .button.is-dark.is-inverted:hover {\n        background-color: #e8e8e8; }\n      .button.is-dark.is-inverted[disabled] {\n        background-color: whitesmoke;\n        border-color: transparent;\n        box-shadow: none;\n        color: #363636; }\n    .button.is-dark.is-loading::after {\n      border-color: transparent transparent whitesmoke whitesmoke !important; }\n    .button.is-dark.is-outlined {\n      background-color: transparent;\n      border-color: #363636;\n      color: #363636; }\n      .button.is-dark.is-outlined:hover, .button.is-dark.is-outlined:focus {\n        background-color: #363636;\n        border-color: #363636;\n        color: whitesmoke; }\n      .button.is-dark.is-outlined.is-loading::after {\n        border-color: transparent transparent #363636 #363636 !important; }\n      .button.is-dark.is-outlined[disabled] {\n        background-color: transparent;\n        border-color: #363636;\n        box-shadow: none;\n        color: #363636; }\n    .button.is-dark.is-inverted.is-outlined {\n      background-color: transparent;\n      border-color: whitesmoke;\n      color: whitesmoke; }\n      .button.is-dark.is-inverted.is-outlined:hover, .button.is-dark.is-inverted.is-outlined:focus {\n        background-color: whitesmoke;\n        color: #363636; }\n      .button.is-dark.is-inverted.is-outlined[disabled] {\n        background-color: transparent;\n        border-color: whitesmoke;\n        box-shadow: none;\n        color: whitesmoke; }\n  .button.is-primary, /deep/ .button.tagAreaClass, /deep/ .button.deleteAreaClass, /deep/ .button.deleteContentClass {\n    background-color: #00d1b2;\n    border-color: transparent;\n    color: #fff; }\n    .button.is-primary:hover, /deep/ .button.tagAreaClass:hover, /deep/ .button.deleteAreaClass:hover, /deep/ .button.deleteContentClass:hover, .button.is-primary.is-hovered, /deep/ .button.is-hovered.tagAreaClass, /deep/ .button.is-hovered.deleteAreaClass, /deep/ .button.is-hovered.deleteContentClass {\n      background-color: #00c4a7;\n      border-color: transparent;\n      color: #fff; }\n    .button.is-primary:focus, /deep/ .button.tagAreaClass:focus, /deep/ .button.deleteAreaClass:focus, /deep/ .button.deleteContentClass:focus, .button.is-primary.is-focused, /deep/ .button.is-focused.tagAreaClass, /deep/ .button.is-focused.deleteAreaClass, /deep/ .button.is-focused.deleteContentClass {\n      border-color: transparent;\n      color: #fff; }\n      .button.is-primary:focus:not(:active), /deep/ .button.tagAreaClass:focus:not(:active), /deep/ .button.deleteAreaClass:focus:not(:active), /deep/ .button.deleteContentClass:focus:not(:active), .button.is-primary.is-focused:not(:active), /deep/ .button.is-focused.tagAreaClass:not(:active), /deep/ .button.is-focused.deleteAreaClass:not(:active), /deep/ .button.is-focused.deleteContentClass:not(:active) {\n        box-shadow: 0 0 0 0.125em rgba(0, 209, 178, 0.25); }\n    .button.is-primary:active, /deep/ .button.tagAreaClass:active, /deep/ .button.deleteAreaClass:active, /deep/ .button.deleteContentClass:active, .button.is-primary.is-active, /deep/ .button.is-active.tagAreaClass, /deep/ .button.is-active.deleteAreaClass, /deep/ .button.is-active.deleteContentClass {\n      background-color: #00b89c;\n      border-color: transparent;\n      color: #fff; }\n    .button.is-primary[disabled], /deep/ .button.tagAreaClass[disabled], /deep/ .button.deleteAreaClass[disabled], /deep/ .button.deleteContentClass[disabled] {\n      background-color: #00d1b2;\n      border-color: transparent;\n      box-shadow: none; }\n    .button.is-primary.is-inverted, /deep/ .button.is-inverted.tagAreaClass, /deep/ .button.is-inverted.deleteAreaClass, /deep/ .button.is-inverted.deleteContentClass {\n      background-color: #fff;\n      color: #00d1b2; }\n      .button.is-primary.is-inverted:hover, /deep/ .button.is-inverted.tagAreaClass:hover, /deep/ .button.is-inverted.deleteAreaClass:hover, /deep/ .button.is-inverted.deleteContentClass:hover {\n        background-color: #f2f2f2; }\n      .button.is-primary.is-inverted[disabled], /deep/ .button.is-inverted.tagAreaClass[disabled], /deep/ .button.is-inverted.deleteAreaClass[disabled], /deep/ .button.is-inverted.deleteContentClass[disabled] {\n        background-color: #fff;\n        border-color: transparent;\n        box-shadow: none;\n        color: #00d1b2; }\n    .button.is-primary.is-loading::after, /deep/ .button.is-loading.tagAreaClass::after, /deep/ .button.is-loading.deleteAreaClass::after, /deep/ .button.is-loading.deleteContentClass::after {\n      border-color: transparent transparent #fff #fff !important; }\n    .button.is-primary.is-outlined, /deep/ .button.is-outlined.tagAreaClass, /deep/ .button.is-outlined.deleteAreaClass, /deep/ .button.is-outlined.deleteContentClass {\n      background-color: transparent;\n      border-color: #00d1b2;\n      color: #00d1b2; }\n      .button.is-primary.is-outlined:hover, /deep/ .button.is-outlined.tagAreaClass:hover, /deep/ .button.is-outlined.deleteAreaClass:hover, /deep/ .button.is-outlined.deleteContentClass:hover, .button.is-primary.is-outlined:focus, /deep/ .button.is-outlined.tagAreaClass:focus, /deep/ .button.is-outlined.deleteAreaClass:focus, /deep/ .button.is-outlined.deleteContentClass:focus {\n        background-color: #00d1b2;\n        border-color: #00d1b2;\n        color: #fff; }\n      .button.is-primary.is-outlined.is-loading::after, /deep/ .button.is-outlined.is-loading.tagAreaClass::after, /deep/ .button.is-outlined.is-loading.deleteAreaClass::after, /deep/ .button.is-outlined.is-loading.deleteContentClass::after {\n        border-color: transparent transparent #00d1b2 #00d1b2 !important; }\n      .button.is-primary.is-outlined[disabled], /deep/ .button.is-outlined.tagAreaClass[disabled], /deep/ .button.is-outlined.deleteAreaClass[disabled], /deep/ .button.is-outlined.deleteContentClass[disabled] {\n        background-color: transparent;\n        border-color: #00d1b2;\n        box-shadow: none;\n        color: #00d1b2; }\n    .button.is-primary.is-inverted.is-outlined, /deep/ .button.is-inverted.is-outlined.tagAreaClass, /deep/ .button.is-inverted.is-outlined.deleteAreaClass, /deep/ .button.is-inverted.is-outlined.deleteContentClass {\n      background-color: transparent;\n      border-color: #fff;\n      color: #fff; }\n      .button.is-primary.is-inverted.is-outlined:hover, /deep/ .button.is-inverted.is-outlined.tagAreaClass:hover, /deep/ .button.is-inverted.is-outlined.deleteAreaClass:hover, /deep/ .button.is-inverted.is-outlined.deleteContentClass:hover, .button.is-primary.is-inverted.is-outlined:focus, /deep/ .button.is-inverted.is-outlined.tagAreaClass:focus, /deep/ .button.is-inverted.is-outlined.deleteAreaClass:focus, /deep/ .button.is-inverted.is-outlined.deleteContentClass:focus {\n        background-color: #fff;\n        color: #00d1b2; }\n      .button.is-primary.is-inverted.is-outlined[disabled], /deep/ .button.is-inverted.is-outlined.tagAreaClass[disabled], /deep/ .button.is-inverted.is-outlined.deleteAreaClass[disabled], /deep/ .button.is-inverted.is-outlined.deleteContentClass[disabled] {\n        background-color: transparent;\n        border-color: #fff;\n        box-shadow: none;\n        color: #fff; }\n  .button.is-link {\n    background-color: #3273dc;\n    border-color: transparent;\n    color: #fff; }\n    .button.is-link:hover, .button.is-link.is-hovered {\n      background-color: #276cda;\n      border-color: transparent;\n      color: #fff; }\n    .button.is-link:focus, .button.is-link.is-focused {\n      border-color: transparent;\n      color: #fff; }\n      .button.is-link:focus:not(:active), .button.is-link.is-focused:not(:active) {\n        box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25); }\n    .button.is-link:active, .button.is-link.is-active {\n      background-color: #2366d1;\n      border-color: transparent;\n      color: #fff; }\n    .button.is-link[disabled] {\n      background-color: #3273dc;\n      border-color: transparent;\n      box-shadow: none; }\n    .button.is-link.is-inverted {\n      background-color: #fff;\n      color: #3273dc; }\n      .button.is-link.is-inverted:hover {\n        background-color: #f2f2f2; }\n      .button.is-link.is-inverted[disabled] {\n        background-color: #fff;\n        border-color: transparent;\n        box-shadow: none;\n        color: #3273dc; }\n    .button.is-link.is-loading::after {\n      border-color: transparent transparent #fff #fff !important; }\n    .button.is-link.is-outlined {\n      background-color: transparent;\n      border-color: #3273dc;\n      color: #3273dc; }\n      .button.is-link.is-outlined:hover, .button.is-link.is-outlined:focus {\n        background-color: #3273dc;\n        border-color: #3273dc;\n        color: #fff; }\n      .button.is-link.is-outlined.is-loading::after {\n        border-color: transparent transparent #3273dc #3273dc !important; }\n      .button.is-link.is-outlined[disabled] {\n        background-color: transparent;\n        border-color: #3273dc;\n        box-shadow: none;\n        color: #3273dc; }\n    .button.is-link.is-inverted.is-outlined {\n      background-color: transparent;\n      border-color: #fff;\n      color: #fff; }\n      .button.is-link.is-inverted.is-outlined:hover, .button.is-link.is-inverted.is-outlined:focus {\n        background-color: #fff;\n        color: #3273dc; }\n      .button.is-link.is-inverted.is-outlined[disabled] {\n        background-color: transparent;\n        border-color: #fff;\n        box-shadow: none;\n        color: #fff; }\n  .button.is-info {\n    background-color: #209cee;\n    border-color: transparent;\n    color: #fff; }\n    .button.is-info:hover, .button.is-info.is-hovered {\n      background-color: #1496ed;\n      border-color: transparent;\n      color: #fff; }\n    .button.is-info:focus, .button.is-info.is-focused {\n      border-color: transparent;\n      color: #fff; }\n      .button.is-info:focus:not(:active), .button.is-info.is-focused:not(:active) {\n        box-shadow: 0 0 0 0.125em rgba(32, 156, 238, 0.25); }\n    .button.is-info:active, .button.is-info.is-active {\n      background-color: #118fe4;\n      border-color: transparent;\n      color: #fff; }\n    .button.is-info[disabled] {\n      background-color: #209cee;\n      border-color: transparent;\n      box-shadow: none; }\n    .button.is-info.is-inverted {\n      background-color: #fff;\n      color: #209cee; }\n      .button.is-info.is-inverted:hover {\n        background-color: #f2f2f2; }\n      .button.is-info.is-inverted[disabled] {\n        background-color: #fff;\n        border-color: transparent;\n        box-shadow: none;\n        color: #209cee; }\n    .button.is-info.is-loading::after {\n      border-color: transparent transparent #fff #fff !important; }\n    .button.is-info.is-outlined {\n      background-color: transparent;\n      border-color: #209cee;\n      color: #209cee; }\n      .button.is-info.is-outlined:hover, .button.is-info.is-outlined:focus {\n        background-color: #209cee;\n        border-color: #209cee;\n        color: #fff; }\n      .button.is-info.is-outlined.is-loading::after {\n        border-color: transparent transparent #209cee #209cee !important; }\n      .button.is-info.is-outlined[disabled] {\n        background-color: transparent;\n        border-color: #209cee;\n        box-shadow: none;\n        color: #209cee; }\n    .button.is-info.is-inverted.is-outlined {\n      background-color: transparent;\n      border-color: #fff;\n      color: #fff; }\n      .button.is-info.is-inverted.is-outlined:hover, .button.is-info.is-inverted.is-outlined:focus {\n        background-color: #fff;\n        color: #209cee; }\n      .button.is-info.is-inverted.is-outlined[disabled] {\n        background-color: transparent;\n        border-color: #fff;\n        box-shadow: none;\n        color: #fff; }\n  .button.is-success {\n    background-color: #23d160;\n    border-color: transparent;\n    color: #fff; }\n    .button.is-success:hover, .button.is-success.is-hovered {\n      background-color: #22c65b;\n      border-color: transparent;\n      color: #fff; }\n    .button.is-success:focus, .button.is-success.is-focused {\n      border-color: transparent;\n      color: #fff; }\n      .button.is-success:focus:not(:active), .button.is-success.is-focused:not(:active) {\n        box-shadow: 0 0 0 0.125em rgba(35, 209, 96, 0.25); }\n    .button.is-success:active, .button.is-success.is-active {\n      background-color: #20bc56;\n      border-color: transparent;\n      color: #fff; }\n    .button.is-success[disabled] {\n      background-color: #23d160;\n      border-color: transparent;\n      box-shadow: none; }\n    .button.is-success.is-inverted {\n      background-color: #fff;\n      color: #23d160; }\n      .button.is-success.is-inverted:hover {\n        background-color: #f2f2f2; }\n      .button.is-success.is-inverted[disabled] {\n        background-color: #fff;\n        border-color: transparent;\n        box-shadow: none;\n        color: #23d160; }\n    .button.is-success.is-loading::after {\n      border-color: transparent transparent #fff #fff !important; }\n    .button.is-success.is-outlined {\n      background-color: transparent;\n      border-color: #23d160;\n      color: #23d160; }\n      .button.is-success.is-outlined:hover, .button.is-success.is-outlined:focus {\n        background-color: #23d160;\n        border-color: #23d160;\n        color: #fff; }\n      .button.is-success.is-outlined.is-loading::after {\n        border-color: transparent transparent #23d160 #23d160 !important; }\n      .button.is-success.is-outlined[disabled] {\n        background-color: transparent;\n        border-color: #23d160;\n        box-shadow: none;\n        color: #23d160; }\n    .button.is-success.is-inverted.is-outlined {\n      background-color: transparent;\n      border-color: #fff;\n      color: #fff; }\n      .button.is-success.is-inverted.is-outlined:hover, .button.is-success.is-inverted.is-outlined:focus {\n        background-color: #fff;\n        color: #23d160; }\n      .button.is-success.is-inverted.is-outlined[disabled] {\n        background-color: transparent;\n        border-color: #fff;\n        box-shadow: none;\n        color: #fff; }\n  .button.is-warning {\n    background-color: #ffdd57;\n    border-color: transparent;\n    color: rgba(0, 0, 0, 0.7); }\n    .button.is-warning:hover, .button.is-warning.is-hovered {\n      background-color: #ffdb4a;\n      border-color: transparent;\n      color: rgba(0, 0, 0, 0.7); }\n    .button.is-warning:focus, .button.is-warning.is-focused {\n      border-color: transparent;\n      color: rgba(0, 0, 0, 0.7); }\n      .button.is-warning:focus:not(:active), .button.is-warning.is-focused:not(:active) {\n        box-shadow: 0 0 0 0.125em rgba(255, 221, 87, 0.25); }\n    .button.is-warning:active, .button.is-warning.is-active {\n      background-color: #ffd83d;\n      border-color: transparent;\n      color: rgba(0, 0, 0, 0.7); }\n    .button.is-warning[disabled] {\n      background-color: #ffdd57;\n      border-color: transparent;\n      box-shadow: none; }\n    .button.is-warning.is-inverted {\n      background-color: rgba(0, 0, 0, 0.7);\n      color: #ffdd57; }\n      .button.is-warning.is-inverted:hover {\n        background-color: rgba(0, 0, 0, 0.7); }\n      .button.is-warning.is-inverted[disabled] {\n        background-color: rgba(0, 0, 0, 0.7);\n        border-color: transparent;\n        box-shadow: none;\n        color: #ffdd57; }\n    .button.is-warning.is-loading::after {\n      border-color: transparent transparent rgba(0, 0, 0, 0.7) rgba(0, 0, 0, 0.7) !important; }\n    .button.is-warning.is-outlined {\n      background-color: transparent;\n      border-color: #ffdd57;\n      color: #ffdd57; }\n      .button.is-warning.is-outlined:hover, .button.is-warning.is-outlined:focus {\n        background-color: #ffdd57;\n        border-color: #ffdd57;\n        color: rgba(0, 0, 0, 0.7); }\n      .button.is-warning.is-outlined.is-loading::after {\n        border-color: transparent transparent #ffdd57 #ffdd57 !important; }\n      .button.is-warning.is-outlined[disabled] {\n        background-color: transparent;\n        border-color: #ffdd57;\n        box-shadow: none;\n        color: #ffdd57; }\n    .button.is-warning.is-inverted.is-outlined {\n      background-color: transparent;\n      border-color: rgba(0, 0, 0, 0.7);\n      color: rgba(0, 0, 0, 0.7); }\n      .button.is-warning.is-inverted.is-outlined:hover, .button.is-warning.is-inverted.is-outlined:focus {\n        background-color: rgba(0, 0, 0, 0.7);\n        color: #ffdd57; }\n      .button.is-warning.is-inverted.is-outlined[disabled] {\n        background-color: transparent;\n        border-color: rgba(0, 0, 0, 0.7);\n        box-shadow: none;\n        color: rgba(0, 0, 0, 0.7); }\n  .button.is-danger {\n    background-color: #ff3860;\n    border-color: transparent;\n    color: #fff; }\n    .button.is-danger:hover, .button.is-danger.is-hovered {\n      background-color: #ff2b56;\n      border-color: transparent;\n      color: #fff; }\n    .button.is-danger:focus, .button.is-danger.is-focused {\n      border-color: transparent;\n      color: #fff; }\n      .button.is-danger:focus:not(:active), .button.is-danger.is-focused:not(:active) {\n        box-shadow: 0 0 0 0.125em rgba(255, 56, 96, 0.25); }\n    .button.is-danger:active, .button.is-danger.is-active {\n      background-color: #ff1f4b;\n      border-color: transparent;\n      color: #fff; }\n    .button.is-danger[disabled] {\n      background-color: #ff3860;\n      border-color: transparent;\n      box-shadow: none; }\n    .button.is-danger.is-inverted {\n      background-color: #fff;\n      color: #ff3860; }\n      .button.is-danger.is-inverted:hover {\n        background-color: #f2f2f2; }\n      .button.is-danger.is-inverted[disabled] {\n        background-color: #fff;\n        border-color: transparent;\n        box-shadow: none;\n        color: #ff3860; }\n    .button.is-danger.is-loading::after {\n      border-color: transparent transparent #fff #fff !important; }\n    .button.is-danger.is-outlined {\n      background-color: transparent;\n      border-color: #ff3860;\n      color: #ff3860; }\n      .button.is-danger.is-outlined:hover, .button.is-danger.is-outlined:focus {\n        background-color: #ff3860;\n        border-color: #ff3860;\n        color: #fff; }\n      .button.is-danger.is-outlined.is-loading::after {\n        border-color: transparent transparent #ff3860 #ff3860 !important; }\n      .button.is-danger.is-outlined[disabled] {\n        background-color: transparent;\n        border-color: #ff3860;\n        box-shadow: none;\n        color: #ff3860; }\n    .button.is-danger.is-inverted.is-outlined {\n      background-color: transparent;\n      border-color: #fff;\n      color: #fff; }\n      .button.is-danger.is-inverted.is-outlined:hover, .button.is-danger.is-inverted.is-outlined:focus {\n        background-color: #fff;\n        color: #ff3860; }\n      .button.is-danger.is-inverted.is-outlined[disabled] {\n        background-color: transparent;\n        border-color: #fff;\n        box-shadow: none;\n        color: #fff; }\n  .button.is-small {\n    border-radius: 2px;\n    font-size: 0.75rem; }\n  .button.is-medium {\n    font-size: 1.25rem; }\n  .button.is-large {\n    font-size: 1.5rem; }\n  .button[disabled] {\n    background-color: white;\n    border-color: #dbdbdb;\n    box-shadow: none;\n    opacity: 0.5; }\n  .button.is-fullwidth {\n    display: flex;\n    width: 100%; }\n  .button.is-loading {\n    color: transparent !important;\n    pointer-events: none; }\n    .button.is-loading::after {\n      position: absolute;\n      left: calc(50% - (1em / 2));\n      top: calc(50% - (1em / 2));\n      position: absolute !important; }\n  .button.is-static {\n    background-color: whitesmoke;\n    border-color: #dbdbdb;\n    color: #7a7a7a;\n    box-shadow: none;\n    pointer-events: none; }\n  .button.is-rounded {\n    border-radius: 290486px;\n    padding-left: 1em;\n    padding-right: 1em; }\n\n.buttons {\n  align-items: center;\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-start; }\n  .buttons .button {\n    margin-bottom: 0.5rem; }\n    .buttons .button:not(:last-child):not(.is-fullwidth) {\n      margin-right: 0.5rem; }\n  .buttons:last-child {\n    margin-bottom: -0.5rem; }\n  .buttons:not(:last-child) {\n    margin-bottom: 1rem; }\n  .buttons.has-addons .button:not(:first-child) {\n    border-bottom-left-radius: 0;\n    border-top-left-radius: 0; }\n  .buttons.has-addons .button:not(:last-child) {\n    border-bottom-right-radius: 0;\n    border-top-right-radius: 0;\n    margin-right: -1px; }\n  .buttons.has-addons .button:last-child {\n    margin-right: 0; }\n  .buttons.has-addons .button:hover, .buttons.has-addons .button.is-hovered {\n    z-index: 2; }\n  .buttons.has-addons .button:focus, .buttons.has-addons .button.is-focused, .buttons.has-addons .button:active, .buttons.has-addons .button.is-active, .buttons.has-addons .button.is-selected {\n    z-index: 3; }\n    .buttons.has-addons .button:focus:hover, .buttons.has-addons .button.is-focused:hover, .buttons.has-addons .button:active:hover, .buttons.has-addons .button.is-active:hover, .buttons.has-addons .button.is-selected:hover {\n      z-index: 4; }\n  .buttons.has-addons .button.is-expanded {\n    flex-grow: 1; }\n  .buttons.is-centered {\n    justify-content: center; }\n  .buttons.is-right {\n    justify-content: flex-end; }\n\n.container {\n  margin: 0 auto;\n  position: relative; }\n  @media screen and (min-width: 1088px) {\n    .container {\n      max-width: 960px;\n      width: 960px; }\n      .container.is-fluid {\n        margin-left: 64px;\n        margin-right: 64px;\n        max-width: none;\n        width: auto; } }\n  @media screen and (max-width: 1279px) {\n    .container.is-widescreen {\n      max-width: 1152px;\n      width: auto; } }\n  @media screen and (max-width: 1471px) {\n    .container.is-fullhd {\n      max-width: 1344px;\n      width: auto; } }\n  @media screen and (min-width: 1280px) {\n    .container {\n      max-width: 1152px;\n      width: 1152px; } }\n  @media screen and (min-width: 1472px) {\n    .container {\n      max-width: 1344px;\n      width: 1344px; } }\n\n.content li + li {\n  margin-top: 0.25em; }\n\n.content p:not(:last-child),\n.content dl:not(:last-child),\n.content ol:not(:last-child),\n.content ul:not(:last-child),\n.content blockquote:not(:last-child),\n.content pre:not(:last-child),\n.content table:not(:last-child) {\n  margin-bottom: 1em; }\n\n.content h1,\n.content h2,\n.content h3,\n.content h4,\n.content h5,\n.content h6 {\n  color: #363636;\n  font-weight: 600;\n  line-height: 1.125; }\n\n.content h1 {\n  font-size: 2em;\n  margin-bottom: 0.5em; }\n  .content h1:not(:first-child) {\n    margin-top: 1em; }\n\n.content h2 {\n  font-size: 1.75em;\n  margin-bottom: 0.5714em; }\n  .content h2:not(:first-child) {\n    margin-top: 1.1428em; }\n\n.content h3 {\n  font-size: 1.5em;\n  margin-bottom: 0.6666em; }\n  .content h3:not(:first-child) {\n    margin-top: 1.3333em; }\n\n.content h4 {\n  font-size: 1.25em;\n  margin-bottom: 0.8em; }\n\n.content h5 {\n  font-size: 1.125em;\n  margin-bottom: 0.8888em; }\n\n.content h6 {\n  font-size: 1em;\n  margin-bottom: 1em; }\n\n.content blockquote {\n  background-color: whitesmoke;\n  border-left: 5px solid #dbdbdb;\n  padding: 1.25em 1.5em; }\n\n.content ol {\n  list-style-position: outside;\n  margin-left: 2em;\n  margin-top: 1em; }\n  .content ol:not([type]) {\n    list-style-type: decimal; }\n    .content ol:not([type]).is-lower-alpha {\n      list-style-type: lower-alpha; }\n    .content ol:not([type]).is-lower-roman {\n      list-style-type: lower-roman; }\n    .content ol:not([type]).is-upper-alpha {\n      list-style-type: upper-alpha; }\n    .content ol:not([type]).is-upper-roman {\n      list-style-type: upper-roman; }\n\n.content ul {\n  list-style: disc outside;\n  margin-left: 2em;\n  margin-top: 1em; }\n  .content ul ul {\n    list-style-type: circle;\n    margin-top: 0.5em; }\n    .content ul ul ul {\n      list-style-type: square; }\n\n.content dd {\n  margin-left: 2em; }\n\n.content figure {\n  margin-left: 2em;\n  margin-right: 2em;\n  text-align: center; }\n  .content figure:not(:first-child) {\n    margin-top: 2em; }\n  .content figure:not(:last-child) {\n    margin-bottom: 2em; }\n  .content figure img {\n    display: inline-block; }\n  .content figure figcaption {\n    font-style: italic; }\n\n.content pre {\n  -webkit-overflow-scrolling: touch;\n  overflow-x: auto;\n  padding: 1.25em 1.5em;\n  white-space: pre;\n  word-wrap: normal; }\n\n.content sup,\n.content sub {\n  font-size: 75%; }\n\n.content table {\n  width: 100%; }\n  .content table td,\n  .content table th {\n    border: 1px solid #dbdbdb;\n    border-width: 0 0 1px;\n    padding: 0.5em 0.75em;\n    vertical-align: top; }\n  .content table th {\n    color: #363636;\n    text-align: left; }\n  .content table thead td,\n  .content table thead th {\n    border-width: 0 0 2px;\n    color: #363636; }\n  .content table tfoot td,\n  .content table tfoot th {\n    border-width: 2px 0 0;\n    color: #363636; }\n  .content table tbody tr:last-child td,\n  .content table tbody tr:last-child th {\n    border-bottom-width: 0; }\n\n.content.is-small {\n  font-size: 0.75rem; }\n\n.content.is-medium {\n  font-size: 1.25rem; }\n\n.content.is-large {\n  font-size: 1.5rem; }\n\n.input,\n.textarea {\n  background-color: white;\n  border-color: #dbdbdb;\n  color: #363636;\n  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);\n  max-width: 100%;\n  width: 100%; }\n  .input::-moz-placeholder,\n  .textarea::-moz-placeholder {\n    color: rgba(54, 54, 54, 0.3); }\n  .input::-webkit-input-placeholder,\n  .textarea::-webkit-input-placeholder {\n    color: rgba(54, 54, 54, 0.3); }\n  .input:-moz-placeholder,\n  .textarea:-moz-placeholder {\n    color: rgba(54, 54, 54, 0.3); }\n  .input:-ms-input-placeholder,\n  .textarea:-ms-input-placeholder {\n    color: rgba(54, 54, 54, 0.3); }\n  .input:hover, .input.is-hovered,\n  .textarea:hover,\n  .textarea.is-hovered {\n    border-color: #b5b5b5; }\n  .input:focus, .input.is-focused, .input:active, .input.is-active,\n  .textarea:focus,\n  .textarea.is-focused,\n  .textarea:active,\n  .textarea.is-active {\n    border-color: #3273dc;\n    box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25); }\n  .input[disabled],\n  .textarea[disabled] {\n    background-color: whitesmoke;\n    border-color: whitesmoke;\n    box-shadow: none;\n    color: #7a7a7a; }\n    .input[disabled]::-moz-placeholder,\n    .textarea[disabled]::-moz-placeholder {\n      color: rgba(122, 122, 122, 0.3); }\n    .input[disabled]::-webkit-input-placeholder,\n    .textarea[disabled]::-webkit-input-placeholder {\n      color: rgba(122, 122, 122, 0.3); }\n    .input[disabled]:-moz-placeholder,\n    .textarea[disabled]:-moz-placeholder {\n      color: rgba(122, 122, 122, 0.3); }\n    .input[disabled]:-ms-input-placeholder,\n    .textarea[disabled]:-ms-input-placeholder {\n      color: rgba(122, 122, 122, 0.3); }\n  .input[readonly],\n  .textarea[readonly] {\n    box-shadow: none; }\n  .input.is-white,\n  .textarea.is-white {\n    border-color: white; }\n    .input.is-white:focus, .input.is-white.is-focused, .input.is-white:active, .input.is-white.is-active,\n    .textarea.is-white:focus,\n    .textarea.is-white.is-focused,\n    .textarea.is-white:active,\n    .textarea.is-white.is-active {\n      box-shadow: 0 0 0 0.125em rgba(255, 255, 255, 0.25); }\n  .input.is-black,\n  .textarea.is-black {\n    border-color: #0a0a0a; }\n    .input.is-black:focus, .input.is-black.is-focused, .input.is-black:active, .input.is-black.is-active,\n    .textarea.is-black:focus,\n    .textarea.is-black.is-focused,\n    .textarea.is-black:active,\n    .textarea.is-black.is-active {\n      box-shadow: 0 0 0 0.125em rgba(10, 10, 10, 0.25); }\n  .input.is-light,\n  .textarea.is-light {\n    border-color: whitesmoke; }\n    .input.is-light:focus, .input.is-light.is-focused, .input.is-light:active, .input.is-light.is-active,\n    .textarea.is-light:focus,\n    .textarea.is-light.is-focused,\n    .textarea.is-light:active,\n    .textarea.is-light.is-active {\n      box-shadow: 0 0 0 0.125em rgba(245, 245, 245, 0.25); }\n  .input.is-dark,\n  .textarea.is-dark {\n    border-color: #363636; }\n    .input.is-dark:focus, .input.is-dark.is-focused, .input.is-dark:active, .input.is-dark.is-active,\n    .textarea.is-dark:focus,\n    .textarea.is-dark.is-focused,\n    .textarea.is-dark:active,\n    .textarea.is-dark.is-active {\n      box-shadow: 0 0 0 0.125em rgba(54, 54, 54, 0.25); }\n  .input.is-primary, /deep/ .input.tagAreaClass, /deep/ .input.deleteAreaClass, /deep/ .input.deleteContentClass,\n  .textarea.is-primary,\n  /deep/ .textarea.tagAreaClass,\n  /deep/ .textarea.deleteAreaClass,\n  /deep/ .textarea.deleteContentClass {\n    border-color: #00d1b2; }\n    .input.is-primary:focus, /deep/ .input.tagAreaClass:focus, /deep/ .input.deleteAreaClass:focus, /deep/ .input.deleteContentClass:focus, .input.is-primary.is-focused, /deep/ .input.is-focused.tagAreaClass, /deep/ .input.is-focused.deleteAreaClass, /deep/ .input.is-focused.deleteContentClass, .input.is-primary:active, /deep/ .input.tagAreaClass:active, /deep/ .input.deleteAreaClass:active, /deep/ .input.deleteContentClass:active, .input.is-primary.is-active, /deep/ .input.is-active.tagAreaClass, /deep/ .input.is-active.deleteAreaClass, /deep/ .input.is-active.deleteContentClass,\n    .textarea.is-primary:focus,\n    /deep/ .textarea.tagAreaClass:focus,\n    /deep/ .textarea.deleteAreaClass:focus,\n    /deep/ .textarea.deleteContentClass:focus,\n    .textarea.is-primary.is-focused,\n    /deep/ .textarea.is-focused.tagAreaClass,\n    /deep/ .textarea.is-focused.deleteAreaClass,\n    /deep/ .textarea.is-focused.deleteContentClass,\n    .textarea.is-primary:active,\n    /deep/ .textarea.tagAreaClass:active,\n    /deep/ .textarea.deleteAreaClass:active,\n    /deep/ .textarea.deleteContentClass:active,\n    .textarea.is-primary.is-active,\n    /deep/ .textarea.is-active.tagAreaClass,\n    /deep/ .textarea.is-active.deleteAreaClass,\n    /deep/ .textarea.is-active.deleteContentClass {\n      box-shadow: 0 0 0 0.125em rgba(0, 209, 178, 0.25); }\n  .input.is-link,\n  .textarea.is-link {\n    border-color: #3273dc; }\n    .input.is-link:focus, .input.is-link.is-focused, .input.is-link:active, .input.is-link.is-active,\n    .textarea.is-link:focus,\n    .textarea.is-link.is-focused,\n    .textarea.is-link:active,\n    .textarea.is-link.is-active {\n      box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25); }\n  .input.is-info,\n  .textarea.is-info {\n    border-color: #209cee; }\n    .input.is-info:focus, .input.is-info.is-focused, .input.is-info:active, .input.is-info.is-active,\n    .textarea.is-info:focus,\n    .textarea.is-info.is-focused,\n    .textarea.is-info:active,\n    .textarea.is-info.is-active {\n      box-shadow: 0 0 0 0.125em rgba(32, 156, 238, 0.25); }\n  .input.is-success,\n  .textarea.is-success {\n    border-color: #23d160; }\n    .input.is-success:focus, .input.is-success.is-focused, .input.is-success:active, .input.is-success.is-active,\n    .textarea.is-success:focus,\n    .textarea.is-success.is-focused,\n    .textarea.is-success:active,\n    .textarea.is-success.is-active {\n      box-shadow: 0 0 0 0.125em rgba(35, 209, 96, 0.25); }\n  .input.is-warning,\n  .textarea.is-warning {\n    border-color: #ffdd57; }\n    .input.is-warning:focus, .input.is-warning.is-focused, .input.is-warning:active, .input.is-warning.is-active,\n    .textarea.is-warning:focus,\n    .textarea.is-warning.is-focused,\n    .textarea.is-warning:active,\n    .textarea.is-warning.is-active {\n      box-shadow: 0 0 0 0.125em rgba(255, 221, 87, 0.25); }\n  .input.is-danger,\n  .textarea.is-danger {\n    border-color: #ff3860; }\n    .input.is-danger:focus, .input.is-danger.is-focused, .input.is-danger:active, .input.is-danger.is-active,\n    .textarea.is-danger:focus,\n    .textarea.is-danger.is-focused,\n    .textarea.is-danger:active,\n    .textarea.is-danger.is-active {\n      box-shadow: 0 0 0 0.125em rgba(255, 56, 96, 0.25); }\n  .input.is-small,\n  .textarea.is-small {\n    border-radius: 2px;\n    font-size: 0.75rem; }\n  .input.is-medium,\n  .textarea.is-medium {\n    font-size: 1.25rem; }\n  .input.is-large,\n  .textarea.is-large {\n    font-size: 1.5rem; }\n  .input.is-fullwidth,\n  .textarea.is-fullwidth {\n    display: block;\n    width: 100%; }\n  .input.is-inline,\n  .textarea.is-inline {\n    display: inline;\n    width: auto; }\n\n.input.is-rounded {\n  border-radius: 290486px;\n  padding-left: 1em;\n  padding-right: 1em; }\n\n.input.is-static {\n  background-color: transparent;\n  border-color: transparent;\n  box-shadow: none;\n  padding-left: 0;\n  padding-right: 0; }\n\n.textarea {\n  display: block;\n  max-width: 100%;\n  min-width: 100%;\n  padding: 0.625em;\n  resize: vertical; }\n  .textarea:not([rows]) {\n    max-height: 600px;\n    min-height: 120px; }\n  .textarea[rows] {\n    height: initial; }\n  .textarea.has-fixed-size {\n    resize: none; }\n\n.checkbox,\n.radio {\n  cursor: pointer;\n  display: inline-block;\n  line-height: 1.25;\n  position: relative; }\n  .checkbox input,\n  .radio input {\n    cursor: pointer; }\n  .checkbox:hover,\n  .radio:hover {\n    color: #363636; }\n  .checkbox[disabled],\n  .radio[disabled] {\n    color: #7a7a7a;\n    cursor: not-allowed; }\n\n.radio + .radio {\n  margin-left: 0.5em; }\n\n.select {\n  display: inline-block;\n  max-width: 100%;\n  position: relative;\n  vertical-align: top; }\n  .select:not(.is-multiple) {\n    height: 2.25em; }\n  .select:not(.is-multiple):not(.is-loading)::after {\n    border-color: #3273dc;\n    right: 1.125em;\n    z-index: 4; }\n  .select.is-rounded select {\n    border-radius: 290486px;\n    padding-left: 1em; }\n  .select select {\n    background-color: white;\n    border-color: #dbdbdb;\n    color: #363636;\n    cursor: pointer;\n    display: block;\n    font-size: 1em;\n    max-width: 100%;\n    outline: none; }\n    .select select::-moz-placeholder {\n      color: rgba(54, 54, 54, 0.3); }\n    .select select::-webkit-input-placeholder {\n      color: rgba(54, 54, 54, 0.3); }\n    .select select:-moz-placeholder {\n      color: rgba(54, 54, 54, 0.3); }\n    .select select:-ms-input-placeholder {\n      color: rgba(54, 54, 54, 0.3); }\n    .select select:hover, .select select.is-hovered {\n      border-color: #b5b5b5; }\n    .select select:focus, .select select.is-focused, .select select:active, .select select.is-active {\n      border-color: #3273dc;\n      box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25); }\n    .select select[disabled] {\n      background-color: whitesmoke;\n      border-color: whitesmoke;\n      box-shadow: none;\n      color: #7a7a7a; }\n      .select select[disabled]::-moz-placeholder {\n        color: rgba(122, 122, 122, 0.3); }\n      .select select[disabled]::-webkit-input-placeholder {\n        color: rgba(122, 122, 122, 0.3); }\n      .select select[disabled]:-moz-placeholder {\n        color: rgba(122, 122, 122, 0.3); }\n      .select select[disabled]:-ms-input-placeholder {\n        color: rgba(122, 122, 122, 0.3); }\n    .select select::-ms-expand {\n      display: none; }\n    .select select[disabled]:hover {\n      border-color: whitesmoke; }\n    .select select:not([multiple]) {\n      padding-right: 2.5em; }\n    .select select[multiple] {\n      height: auto;\n      padding: 0; }\n      .select select[multiple] option {\n        padding: 0.5em 1em; }\n  .select:not(.is-multiple):not(.is-loading):hover::after {\n    border-color: #363636; }\n  .select.is-white:not(:hover)::after {\n    border-color: white; }\n  .select.is-white select {\n    border-color: white; }\n    .select.is-white select:hover, .select.is-white select.is-hovered {\n      border-color: #f2f2f2; }\n    .select.is-white select:focus, .select.is-white select.is-focused, .select.is-white select:active, .select.is-white select.is-active {\n      box-shadow: 0 0 0 0.125em rgba(255, 255, 255, 0.25); }\n  .select.is-black:not(:hover)::after {\n    border-color: #0a0a0a; }\n  .select.is-black select {\n    border-color: #0a0a0a; }\n    .select.is-black select:hover, .select.is-black select.is-hovered {\n      border-color: black; }\n    .select.is-black select:focus, .select.is-black select.is-focused, .select.is-black select:active, .select.is-black select.is-active {\n      box-shadow: 0 0 0 0.125em rgba(10, 10, 10, 0.25); }\n  .select.is-light:not(:hover)::after {\n    border-color: whitesmoke; }\n  .select.is-light select {\n    border-color: whitesmoke; }\n    .select.is-light select:hover, .select.is-light select.is-hovered {\n      border-color: #e8e8e8; }\n    .select.is-light select:focus, .select.is-light select.is-focused, .select.is-light select:active, .select.is-light select.is-active {\n      box-shadow: 0 0 0 0.125em rgba(245, 245, 245, 0.25); }\n  .select.is-dark:not(:hover)::after {\n    border-color: #363636; }\n  .select.is-dark select {\n    border-color: #363636; }\n    .select.is-dark select:hover, .select.is-dark select.is-hovered {\n      border-color: #292929; }\n    .select.is-dark select:focus, .select.is-dark select.is-focused, .select.is-dark select:active, .select.is-dark select.is-active {\n      box-shadow: 0 0 0 0.125em rgba(54, 54, 54, 0.25); }\n  .select.is-primary:not(:hover)::after, /deep/ .select.tagAreaClass:not(:hover)::after, /deep/ .select.deleteAreaClass:not(:hover)::after, /deep/ .select.deleteContentClass:not(:hover)::after {\n    border-color: #00d1b2; }\n  .select.is-primary select, /deep/ .select.tagAreaClass select, /deep/ .select.deleteAreaClass select, /deep/ .select.deleteContentClass select {\n    border-color: #00d1b2; }\n    .select.is-primary select:hover, /deep/ .select.tagAreaClass select:hover, /deep/ .select.deleteAreaClass select:hover, /deep/ .select.deleteContentClass select:hover, .select.is-primary select.is-hovered, /deep/ .select.tagAreaClass select.is-hovered, /deep/ .select.deleteAreaClass select.is-hovered, /deep/ .select.deleteContentClass select.is-hovered {\n      border-color: #00b89c; }\n    .select.is-primary select:focus, /deep/ .select.tagAreaClass select:focus, /deep/ .select.deleteAreaClass select:focus, /deep/ .select.deleteContentClass select:focus, .select.is-primary select.is-focused, /deep/ .select.tagAreaClass select.is-focused, /deep/ .select.deleteAreaClass select.is-focused, /deep/ .select.deleteContentClass select.is-focused, .select.is-primary select:active, /deep/ .select.tagAreaClass select:active, /deep/ .select.deleteAreaClass select:active, /deep/ .select.deleteContentClass select:active, .select.is-primary select.is-active, /deep/ .select.tagAreaClass select.is-active, /deep/ .select.deleteAreaClass select.is-active, /deep/ .select.deleteContentClass select.is-active {\n      box-shadow: 0 0 0 0.125em rgba(0, 209, 178, 0.25); }\n  .select.is-link:not(:hover)::after {\n    border-color: #3273dc; }\n  .select.is-link select {\n    border-color: #3273dc; }\n    .select.is-link select:hover, .select.is-link select.is-hovered {\n      border-color: #2366d1; }\n    .select.is-link select:focus, .select.is-link select.is-focused, .select.is-link select:active, .select.is-link select.is-active {\n      box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25); }\n  .select.is-info:not(:hover)::after {\n    border-color: #209cee; }\n  .select.is-info select {\n    border-color: #209cee; }\n    .select.is-info select:hover, .select.is-info select.is-hovered {\n      border-color: #118fe4; }\n    .select.is-info select:focus, .select.is-info select.is-focused, .select.is-info select:active, .select.is-info select.is-active {\n      box-shadow: 0 0 0 0.125em rgba(32, 156, 238, 0.25); }\n  .select.is-success:not(:hover)::after {\n    border-color: #23d160; }\n  .select.is-success select {\n    border-color: #23d160; }\n    .select.is-success select:hover, .select.is-success select.is-hovered {\n      border-color: #20bc56; }\n    .select.is-success select:focus, .select.is-success select.is-focused, .select.is-success select:active, .select.is-success select.is-active {\n      box-shadow: 0 0 0 0.125em rgba(35, 209, 96, 0.25); }\n  .select.is-warning:not(:hover)::after {\n    border-color: #ffdd57; }\n  .select.is-warning select {\n    border-color: #ffdd57; }\n    .select.is-warning select:hover, .select.is-warning select.is-hovered {\n      border-color: #ffd83d; }\n    .select.is-warning select:focus, .select.is-warning select.is-focused, .select.is-warning select:active, .select.is-warning select.is-active {\n      box-shadow: 0 0 0 0.125em rgba(255, 221, 87, 0.25); }\n  .select.is-danger:not(:hover)::after {\n    border-color: #ff3860; }\n  .select.is-danger select {\n    border-color: #ff3860; }\n    .select.is-danger select:hover, .select.is-danger select.is-hovered {\n      border-color: #ff1f4b; }\n    .select.is-danger select:focus, .select.is-danger select.is-focused, .select.is-danger select:active, .select.is-danger select.is-active {\n      box-shadow: 0 0 0 0.125em rgba(255, 56, 96, 0.25); }\n  .select.is-small {\n    border-radius: 2px;\n    font-size: 0.75rem; }\n  .select.is-medium {\n    font-size: 1.25rem; }\n  .select.is-large {\n    font-size: 1.5rem; }\n  .select.is-disabled::after {\n    border-color: #7a7a7a; }\n  .select.is-fullwidth {\n    width: 100%; }\n    .select.is-fullwidth select {\n      width: 100%; }\n  .select.is-loading::after {\n    margin-top: 0;\n    position: absolute;\n    right: 0.625em;\n    top: 0.625em;\n    transform: none; }\n  .select.is-loading.is-small:after {\n    font-size: 0.75rem; }\n  .select.is-loading.is-medium:after {\n    font-size: 1.25rem; }\n  .select.is-loading.is-large:after {\n    font-size: 1.5rem; }\n\n.file {\n  align-items: stretch;\n  display: flex;\n  justify-content: flex-start;\n  position: relative; }\n  .file.is-white .file-cta {\n    background-color: white;\n    border-color: transparent;\n    color: #0a0a0a; }\n  .file.is-white:hover .file-cta, .file.is-white.is-hovered .file-cta {\n    background-color: #f9f9f9;\n    border-color: transparent;\n    color: #0a0a0a; }\n  .file.is-white:focus .file-cta, .file.is-white.is-focused .file-cta {\n    border-color: transparent;\n    box-shadow: 0 0 0.5em rgba(255, 255, 255, 0.25);\n    color: #0a0a0a; }\n  .file.is-white:active .file-cta, .file.is-white.is-active .file-cta {\n    background-color: #f2f2f2;\n    border-color: transparent;\n    color: #0a0a0a; }\n  .file.is-black .file-cta {\n    background-color: #0a0a0a;\n    border-color: transparent;\n    color: white; }\n  .file.is-black:hover .file-cta, .file.is-black.is-hovered .file-cta {\n    background-color: #040404;\n    border-color: transparent;\n    color: white; }\n  .file.is-black:focus .file-cta, .file.is-black.is-focused .file-cta {\n    border-color: transparent;\n    box-shadow: 0 0 0.5em rgba(10, 10, 10, 0.25);\n    color: white; }\n  .file.is-black:active .file-cta, .file.is-black.is-active .file-cta {\n    background-color: black;\n    border-color: transparent;\n    color: white; }\n  .file.is-light .file-cta {\n    background-color: whitesmoke;\n    border-color: transparent;\n    color: #363636; }\n  .file.is-light:hover .file-cta, .file.is-light.is-hovered .file-cta {\n    background-color: #eeeeee;\n    border-color: transparent;\n    color: #363636; }\n  .file.is-light:focus .file-cta, .file.is-light.is-focused .file-cta {\n    border-color: transparent;\n    box-shadow: 0 0 0.5em rgba(245, 245, 245, 0.25);\n    color: #363636; }\n  .file.is-light:active .file-cta, .file.is-light.is-active .file-cta {\n    background-color: #e8e8e8;\n    border-color: transparent;\n    color: #363636; }\n  .file.is-dark .file-cta {\n    background-color: #363636;\n    border-color: transparent;\n    color: whitesmoke; }\n  .file.is-dark:hover .file-cta, .file.is-dark.is-hovered .file-cta {\n    background-color: #2f2f2f;\n    border-color: transparent;\n    color: whitesmoke; }\n  .file.is-dark:focus .file-cta, .file.is-dark.is-focused .file-cta {\n    border-color: transparent;\n    box-shadow: 0 0 0.5em rgba(54, 54, 54, 0.25);\n    color: whitesmoke; }\n  .file.is-dark:active .file-cta, .file.is-dark.is-active .file-cta {\n    background-color: #292929;\n    border-color: transparent;\n    color: whitesmoke; }\n  .file.is-primary .file-cta, /deep/ .file.tagAreaClass .file-cta, /deep/ .file.deleteAreaClass .file-cta, /deep/ .file.deleteContentClass .file-cta {\n    background-color: #00d1b2;\n    border-color: transparent;\n    color: #fff; }\n  .file.is-primary:hover .file-cta, /deep/ .file.tagAreaClass:hover .file-cta, /deep/ .file.deleteAreaClass:hover .file-cta, /deep/ .file.deleteContentClass:hover .file-cta, .file.is-primary.is-hovered .file-cta, /deep/ .file.is-hovered.tagAreaClass .file-cta, /deep/ .file.is-hovered.deleteAreaClass .file-cta, /deep/ .file.is-hovered.deleteContentClass .file-cta {\n    background-color: #00c4a7;\n    border-color: transparent;\n    color: #fff; }\n  .file.is-primary:focus .file-cta, /deep/ .file.tagAreaClass:focus .file-cta, /deep/ .file.deleteAreaClass:focus .file-cta, /deep/ .file.deleteContentClass:focus .file-cta, .file.is-primary.is-focused .file-cta, /deep/ .file.is-focused.tagAreaClass .file-cta, /deep/ .file.is-focused.deleteAreaClass .file-cta, /deep/ .file.is-focused.deleteContentClass .file-cta {\n    border-color: transparent;\n    box-shadow: 0 0 0.5em rgba(0, 209, 178, 0.25);\n    color: #fff; }\n  .file.is-primary:active .file-cta, /deep/ .file.tagAreaClass:active .file-cta, /deep/ .file.deleteAreaClass:active .file-cta, /deep/ .file.deleteContentClass:active .file-cta, .file.is-primary.is-active .file-cta, /deep/ .file.is-active.tagAreaClass .file-cta, /deep/ .file.is-active.deleteAreaClass .file-cta, /deep/ .file.is-active.deleteContentClass .file-cta {\n    background-color: #00b89c;\n    border-color: transparent;\n    color: #fff; }\n  .file.is-link .file-cta {\n    background-color: #3273dc;\n    border-color: transparent;\n    color: #fff; }\n  .file.is-link:hover .file-cta, .file.is-link.is-hovered .file-cta {\n    background-color: #276cda;\n    border-color: transparent;\n    color: #fff; }\n  .file.is-link:focus .file-cta, .file.is-link.is-focused .file-cta {\n    border-color: transparent;\n    box-shadow: 0 0 0.5em rgba(50, 115, 220, 0.25);\n    color: #fff; }\n  .file.is-link:active .file-cta, .file.is-link.is-active .file-cta {\n    background-color: #2366d1;\n    border-color: transparent;\n    color: #fff; }\n  .file.is-info .file-cta {\n    background-color: #209cee;\n    border-color: transparent;\n    color: #fff; }\n  .file.is-info:hover .file-cta, .file.is-info.is-hovered .file-cta {\n    background-color: #1496ed;\n    border-color: transparent;\n    color: #fff; }\n  .file.is-info:focus .file-cta, .file.is-info.is-focused .file-cta {\n    border-color: transparent;\n    box-shadow: 0 0 0.5em rgba(32, 156, 238, 0.25);\n    color: #fff; }\n  .file.is-info:active .file-cta, .file.is-info.is-active .file-cta {\n    background-color: #118fe4;\n    border-color: transparent;\n    color: #fff; }\n  .file.is-success .file-cta {\n    background-color: #23d160;\n    border-color: transparent;\n    color: #fff; }\n  .file.is-success:hover .file-cta, .file.is-success.is-hovered .file-cta {\n    background-color: #22c65b;\n    border-color: transparent;\n    color: #fff; }\n  .file.is-success:focus .file-cta, .file.is-success.is-focused .file-cta {\n    border-color: transparent;\n    box-shadow: 0 0 0.5em rgba(35, 209, 96, 0.25);\n    color: #fff; }\n  .file.is-success:active .file-cta, .file.is-success.is-active .file-cta {\n    background-color: #20bc56;\n    border-color: transparent;\n    color: #fff; }\n  .file.is-warning .file-cta {\n    background-color: #ffdd57;\n    border-color: transparent;\n    color: rgba(0, 0, 0, 0.7); }\n  .file.is-warning:hover .file-cta, .file.is-warning.is-hovered .file-cta {\n    background-color: #ffdb4a;\n    border-color: transparent;\n    color: rgba(0, 0, 0, 0.7); }\n  .file.is-warning:focus .file-cta, .file.is-warning.is-focused .file-cta {\n    border-color: transparent;\n    box-shadow: 0 0 0.5em rgba(255, 221, 87, 0.25);\n    color: rgba(0, 0, 0, 0.7); }\n  .file.is-warning:active .file-cta, .file.is-warning.is-active .file-cta {\n    background-color: #ffd83d;\n    border-color: transparent;\n    color: rgba(0, 0, 0, 0.7); }\n  .file.is-danger .file-cta {\n    background-color: #ff3860;\n    border-color: transparent;\n    color: #fff; }\n  .file.is-danger:hover .file-cta, .file.is-danger.is-hovered .file-cta {\n    background-color: #ff2b56;\n    border-color: transparent;\n    color: #fff; }\n  .file.is-danger:focus .file-cta, .file.is-danger.is-focused .file-cta {\n    border-color: transparent;\n    box-shadow: 0 0 0.5em rgba(255, 56, 96, 0.25);\n    color: #fff; }\n  .file.is-danger:active .file-cta, .file.is-danger.is-active .file-cta {\n    background-color: #ff1f4b;\n    border-color: transparent;\n    color: #fff; }\n  .file.is-small {\n    font-size: 0.75rem; }\n  .file.is-medium {\n    font-size: 1.25rem; }\n    .file.is-medium .file-icon .fa {\n      font-size: 21px; }\n  .file.is-large {\n    font-size: 1.5rem; }\n    .file.is-large .file-icon .fa {\n      font-size: 28px; }\n  .file.has-name .file-cta {\n    border-bottom-right-radius: 0;\n    border-top-right-radius: 0; }\n  .file.has-name .file-name {\n    border-bottom-left-radius: 0;\n    border-top-left-radius: 0; }\n  .file.has-name.is-empty .file-cta {\n    border-radius: 4px; }\n  .file.has-name.is-empty .file-name {\n    display: none; }\n  .file.is-boxed .file-label {\n    flex-direction: column; }\n  .file.is-boxed .file-cta {\n    flex-direction: column;\n    height: auto;\n    padding: 1em 3em; }\n  .file.is-boxed .file-name {\n    border-width: 0 1px 1px; }\n  .file.is-boxed .file-icon {\n    height: 1.5em;\n    width: 1.5em; }\n    .file.is-boxed .file-icon .fa {\n      font-size: 21px; }\n  .file.is-boxed.is-small .file-icon .fa {\n    font-size: 14px; }\n  .file.is-boxed.is-medium .file-icon .fa {\n    font-size: 28px; }\n  .file.is-boxed.is-large .file-icon .fa {\n    font-size: 35px; }\n  .file.is-boxed.has-name .file-cta {\n    border-radius: 4px 4px 0 0; }\n  .file.is-boxed.has-name .file-name {\n    border-radius: 0 0 4px 4px;\n    border-width: 0 1px 1px; }\n  .file.is-centered {\n    justify-content: center; }\n  .file.is-fullwidth .file-label {\n    width: 100%; }\n  .file.is-fullwidth .file-name {\n    flex-grow: 1;\n    max-width: none; }\n  .file.is-right {\n    justify-content: flex-end; }\n    .file.is-right .file-cta {\n      border-radius: 0 4px 4px 0; }\n    .file.is-right .file-name {\n      border-radius: 4px 0 0 4px;\n      border-width: 1px 0 1px 1px;\n      order: -1; }\n\n.file-label {\n  align-items: stretch;\n  display: flex;\n  cursor: pointer;\n  justify-content: flex-start;\n  overflow: hidden;\n  position: relative; }\n  .file-label:hover .file-cta {\n    background-color: #eeeeee;\n    color: #363636; }\n  .file-label:hover .file-name {\n    border-color: #d5d5d5; }\n  .file-label:active .file-cta {\n    background-color: #e8e8e8;\n    color: #363636; }\n  .file-label:active .file-name {\n    border-color: #cfcfcf; }\n\n.file-input {\n  height: 100%;\n  left: 0;\n  opacity: 0;\n  outline: none;\n  position: absolute;\n  top: 0;\n  width: 100%; }\n\n.file-cta,\n.file-name {\n  border-color: #dbdbdb;\n  border-radius: 4px;\n  font-size: 1em;\n  padding-left: 1em;\n  padding-right: 1em;\n  white-space: nowrap; }\n\n.file-cta {\n  background-color: whitesmoke;\n  color: #4a4a4a; }\n\n.file-name {\n  border-color: #dbdbdb;\n  border-style: solid;\n  border-width: 1px 1px 1px 0;\n  display: block;\n  max-width: 16em;\n  overflow: hidden;\n  text-align: left;\n  text-overflow: ellipsis; }\n\n.file-icon {\n  align-items: center;\n  display: flex;\n  height: 1em;\n  justify-content: center;\n  margin-right: 0.5em;\n  width: 1em; }\n  .file-icon .fa {\n    font-size: 14px; }\n\n.label {\n  color: #363636;\n  display: block;\n  font-size: 1rem;\n  font-weight: 700; }\n  .label:not(:last-child) {\n    margin-bottom: 0.5em; }\n  .label.is-small {\n    font-size: 0.75rem; }\n  .label.is-medium {\n    font-size: 1.25rem; }\n  .label.is-large {\n    font-size: 1.5rem; }\n\n.help {\n  display: block;\n  font-size: 0.75rem;\n  margin-top: 0.25rem; }\n  .help.is-white {\n    color: white; }\n  .help.is-black {\n    color: #0a0a0a; }\n  .help.is-light {\n    color: whitesmoke; }\n  .help.is-dark {\n    color: #363636; }\n  .help.is-primary, /deep/ .help.tagAreaClass, /deep/ .help.deleteAreaClass, /deep/ .help.deleteContentClass {\n    color: #00d1b2; }\n  .help.is-link {\n    color: #3273dc; }\n  .help.is-info {\n    color: #209cee; }\n  .help.is-success {\n    color: #23d160; }\n  .help.is-warning {\n    color: #ffdd57; }\n  .help.is-danger {\n    color: #ff3860; }\n\n.field:not(:last-child) {\n  margin-bottom: 0.75rem; }\n\n.field.has-addons {\n  display: flex;\n  justify-content: flex-start; }\n  .field.has-addons .control:not(:last-child) {\n    margin-right: -1px; }\n  .field.has-addons .control:not(:first-child):not(:last-child) .button,\n  .field.has-addons .control:not(:first-child):not(:last-child) .input,\n  .field.has-addons .control:not(:first-child):not(:last-child) .select select {\n    border-radius: 0; }\n  .field.has-addons .control:first-child .button,\n  .field.has-addons .control:first-child .input,\n  .field.has-addons .control:first-child .select select {\n    border-bottom-right-radius: 0;\n    border-top-right-radius: 0; }\n  .field.has-addons .control:last-child .button,\n  .field.has-addons .control:last-child .input,\n  .field.has-addons .control:last-child .select select {\n    border-bottom-left-radius: 0;\n    border-top-left-radius: 0; }\n  .field.has-addons .control .button:not([disabled]):hover, .field.has-addons .control .button:not([disabled]).is-hovered,\n  .field.has-addons .control .input:not([disabled]):hover,\n  .field.has-addons .control .input:not([disabled]).is-hovered,\n  .field.has-addons .control .select select:not([disabled]):hover,\n  .field.has-addons .control .select select:not([disabled]).is-hovered {\n    z-index: 2; }\n  .field.has-addons .control .button:not([disabled]):focus, .field.has-addons .control .button:not([disabled]).is-focused, .field.has-addons .control .button:not([disabled]):active, .field.has-addons .control .button:not([disabled]).is-active,\n  .field.has-addons .control .input:not([disabled]):focus,\n  .field.has-addons .control .input:not([disabled]).is-focused,\n  .field.has-addons .control .input:not([disabled]):active,\n  .field.has-addons .control .input:not([disabled]).is-active,\n  .field.has-addons .control .select select:not([disabled]):focus,\n  .field.has-addons .control .select select:not([disabled]).is-focused,\n  .field.has-addons .control .select select:not([disabled]):active,\n  .field.has-addons .control .select select:not([disabled]).is-active {\n    z-index: 3; }\n    .field.has-addons .control .button:not([disabled]):focus:hover, .field.has-addons .control .button:not([disabled]).is-focused:hover, .field.has-addons .control .button:not([disabled]):active:hover, .field.has-addons .control .button:not([disabled]).is-active:hover,\n    .field.has-addons .control .input:not([disabled]):focus:hover,\n    .field.has-addons .control .input:not([disabled]).is-focused:hover,\n    .field.has-addons .control .input:not([disabled]):active:hover,\n    .field.has-addons .control .input:not([disabled]).is-active:hover,\n    .field.has-addons .control .select select:not([disabled]):focus:hover,\n    .field.has-addons .control .select select:not([disabled]).is-focused:hover,\n    .field.has-addons .control .select select:not([disabled]):active:hover,\n    .field.has-addons .control .select select:not([disabled]).is-active:hover {\n      z-index: 4; }\n  .field.has-addons .control.is-expanded {\n    flex-grow: 1; }\n  .field.has-addons.has-addons-centered {\n    justify-content: center; }\n  .field.has-addons.has-addons-right {\n    justify-content: flex-end; }\n  .field.has-addons.has-addons-fullwidth .control {\n    flex-grow: 1;\n    flex-shrink: 0; }\n\n.field.is-grouped {\n  display: flex;\n  justify-content: flex-start; }\n  .field.is-grouped > .control {\n    flex-shrink: 0; }\n    .field.is-grouped > .control:not(:last-child) {\n      margin-bottom: 0;\n      margin-right: 0.75rem; }\n    .field.is-grouped > .control.is-expanded {\n      flex-grow: 1;\n      flex-shrink: 1; }\n  .field.is-grouped.is-grouped-centered {\n    justify-content: center; }\n  .field.is-grouped.is-grouped-right {\n    justify-content: flex-end; }\n  .field.is-grouped.is-grouped-multiline {\n    flex-wrap: wrap; }\n    .field.is-grouped.is-grouped-multiline > .control:last-child, .field.is-grouped.is-grouped-multiline > .control:not(:last-child) {\n      margin-bottom: 0.75rem; }\n    .field.is-grouped.is-grouped-multiline:last-child {\n      margin-bottom: -0.75rem; }\n    .field.is-grouped.is-grouped-multiline:not(:last-child) {\n      margin-bottom: 0; }\n\n@media screen and (min-width: 769px), print {\n  .field.is-horizontal {\n    display: flex; } }\n\n.field-label .label {\n  font-size: inherit; }\n\n@media screen and (max-width: 768px) {\n  .field-label {\n    margin-bottom: 0.5rem; } }\n\n@media screen and (min-width: 769px), print {\n  .field-label {\n    flex-basis: 0;\n    flex-grow: 1;\n    flex-shrink: 0;\n    margin-right: 1.5rem;\n    text-align: right; }\n    .field-label.is-small {\n      font-size: 0.75rem;\n      padding-top: 0.375em; }\n    .field-label.is-normal {\n      padding-top: 0.375em; }\n    .field-label.is-medium {\n      font-size: 1.25rem;\n      padding-top: 0.375em; }\n    .field-label.is-large {\n      font-size: 1.5rem;\n      padding-top: 0.375em; } }\n\n.field-body .field .field {\n  margin-bottom: 0; }\n\n@media screen and (min-width: 769px), print {\n  .field-body {\n    display: flex;\n    flex-basis: 0;\n    flex-grow: 5;\n    flex-shrink: 1; }\n    .field-body .field {\n      margin-bottom: 0; }\n    .field-body > .field {\n      flex-shrink: 1; }\n      .field-body > .field:not(.is-narrow) {\n        flex-grow: 1; }\n      .field-body > .field:not(:last-child) {\n        margin-right: 0.75rem; } }\n\n.control {\n  clear: both;\n  font-size: 1rem;\n  position: relative;\n  text-align: left; }\n  .control.has-icon .icon {\n    color: #dbdbdb;\n    height: 2.25em;\n    pointer-events: none;\n    position: absolute;\n    top: 0;\n    width: 2.25em;\n    z-index: 4; }\n  .control.has-icon .input:focus + .icon {\n    color: #7a7a7a; }\n  .control.has-icon .input.is-small + .icon {\n    font-size: 0.75rem; }\n  .control.has-icon .input.is-medium + .icon {\n    font-size: 1.25rem; }\n  .control.has-icon .input.is-large + .icon {\n    font-size: 1.5rem; }\n  .control.has-icon:not(.has-icon-right) .icon {\n    left: 0; }\n  .control.has-icon:not(.has-icon-right) .input {\n    padding-left: 2.25em; }\n  .control.has-icon.has-icon-right .icon {\n    right: 0; }\n  .control.has-icon.has-icon-right .input {\n    padding-right: 2.25em; }\n  .control.has-icons-left .input:focus ~ .icon,\n  .control.has-icons-left .select:focus ~ .icon, .control.has-icons-right .input:focus ~ .icon,\n  .control.has-icons-right .select:focus ~ .icon {\n    color: #7a7a7a; }\n  .control.has-icons-left .input.is-small ~ .icon,\n  .control.has-icons-left .select.is-small ~ .icon, .control.has-icons-right .input.is-small ~ .icon,\n  .control.has-icons-right .select.is-small ~ .icon {\n    font-size: 0.75rem; }\n  .control.has-icons-left .input.is-medium ~ .icon,\n  .control.has-icons-left .select.is-medium ~ .icon, .control.has-icons-right .input.is-medium ~ .icon,\n  .control.has-icons-right .select.is-medium ~ .icon {\n    font-size: 1.25rem; }\n  .control.has-icons-left .input.is-large ~ .icon,\n  .control.has-icons-left .select.is-large ~ .icon, .control.has-icons-right .input.is-large ~ .icon,\n  .control.has-icons-right .select.is-large ~ .icon {\n    font-size: 1.5rem; }\n  .control.has-icons-left .icon, .control.has-icons-right .icon {\n    color: #dbdbdb;\n    height: 2.25em;\n    pointer-events: none;\n    position: absolute;\n    top: 0;\n    width: 2.25em;\n    z-index: 4; }\n  .control.has-icons-left .input,\n  .control.has-icons-left .select select {\n    padding-left: 2.25em; }\n  .control.has-icons-left .icon.is-left {\n    left: 0; }\n  .control.has-icons-right .input,\n  .control.has-icons-right .select select {\n    padding-right: 2.25em; }\n  .control.has-icons-right .icon.is-right {\n    right: 0; }\n  .control.is-loading::after {\n    position: absolute !important;\n    right: 0.625em;\n    top: 0.625em;\n    z-index: 4; }\n  .control.is-loading.is-small:after {\n    font-size: 0.75rem; }\n  .control.is-loading.is-medium:after {\n    font-size: 1.25rem; }\n  .control.is-loading.is-large:after {\n    font-size: 1.5rem; }\n\n.icon {\n  align-items: center;\n  display: inline-flex;\n  justify-content: center;\n  height: 1.5rem;\n  width: 1.5rem; }\n  .icon.is-small {\n    height: 1rem;\n    width: 1rem; }\n  .icon.is-medium {\n    height: 2rem;\n    width: 2rem; }\n  .icon.is-large {\n    height: 3rem;\n    width: 3rem; }\n\n.image {\n  display: block;\n  position: relative; }\n  .image img {\n    display: block;\n    height: auto;\n    width: 100%; }\n    .image img.is-rounded {\n      border-radius: 290486px; }\n  .image.is-square img, .image.is-1by1 img, .image.is-5by4 img, .image.is-4by3 img, .image.is-3by2 img, .image.is-5by3 img, .image.is-16by9 img, .image.is-2by1 img, .image.is-3by1 img, .image.is-4by5 img, .image.is-3by4 img, .image.is-2by3 img, .image.is-3by5 img, .image.is-9by16 img, .image.is-1by2 img, .image.is-1by3 img {\n    height: 100%;\n    width: 100%; }\n  .image.is-square, .image.is-1by1 {\n    padding-top: 100%; }\n  .image.is-5by4 {\n    padding-top: 80%; }\n  .image.is-4by3 {\n    padding-top: 75%; }\n  .image.is-3by2 {\n    padding-top: 66.6666%; }\n  .image.is-5by3 {\n    padding-top: 60%; }\n  .image.is-16by9 {\n    padding-top: 56.25%; }\n  .image.is-2by1 {\n    padding-top: 50%; }\n  .image.is-3by1 {\n    padding-top: 33.3333%; }\n  .image.is-4by5 {\n    padding-top: 125%; }\n  .image.is-3by4 {\n    padding-top: 133.3333%; }\n  .image.is-2by3 {\n    padding-top: 150%; }\n  .image.is-3by5 {\n    padding-top: 166.6666%; }\n  .image.is-9by16 {\n    padding-top: 177.7777%; }\n  .image.is-1by2 {\n    padding-top: 200%; }\n  .image.is-1by3 {\n    padding-top: 300%; }\n  .image.is-16x16 {\n    height: 16px;\n    width: 16px; }\n  .image.is-24x24 {\n    height: 24px;\n    width: 24px; }\n  .image.is-32x32 {\n    height: 32px;\n    width: 32px; }\n  .image.is-48x48 {\n    height: 48px;\n    width: 48px; }\n  .image.is-64x64 {\n    height: 64px;\n    width: 64px; }\n  .image.is-96x96 {\n    height: 96px;\n    width: 96px; }\n  .image.is-128x128 {\n    height: 128px;\n    width: 128px; }\n\n.notification {\n  background-color: whitesmoke;\n  border-radius: 4px;\n  padding: 1.25rem 2.5rem 1.25rem 1.5rem;\n  position: relative; }\n  .notification a:not(.button):not(.dropdown-item) {\n    color: currentColor;\n    text-decoration: underline; }\n  .notification strong {\n    color: currentColor; }\n  .notification code,\n  .notification pre {\n    background: white; }\n  .notification pre code {\n    background: transparent; }\n  .notification > .delete {\n    position: absolute;\n    right: 0.5rem;\n    top: 0.5rem; }\n  .notification .title,\n  .notification .subtitle,\n  .notification .content {\n    color: currentColor; }\n  .notification.is-white {\n    background-color: white;\n    color: #0a0a0a; }\n  .notification.is-black {\n    background-color: #0a0a0a;\n    color: white; }\n  .notification.is-light {\n    background-color: whitesmoke;\n    color: #363636; }\n  .notification.is-dark {\n    background-color: #363636;\n    color: whitesmoke; }\n  .notification.is-primary, /deep/ .notification.tagAreaClass, /deep/ .notification.deleteAreaClass, /deep/ .notification.deleteContentClass {\n    background-color: #00d1b2;\n    color: #fff; }\n  .notification.is-link {\n    background-color: #3273dc;\n    color: #fff; }\n  .notification.is-info {\n    background-color: #209cee;\n    color: #fff; }\n  .notification.is-success {\n    background-color: #23d160;\n    color: #fff; }\n  .notification.is-warning {\n    background-color: #ffdd57;\n    color: rgba(0, 0, 0, 0.7); }\n  .notification.is-danger {\n    background-color: #ff3860;\n    color: #fff; }\n\n.progress {\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  border: none;\n  border-radius: 290486px;\n  display: block;\n  height: 1rem;\n  overflow: hidden;\n  padding: 0;\n  width: 100%; }\n  .progress::-webkit-progress-bar {\n    background-color: #dbdbdb; }\n  .progress::-webkit-progress-value {\n    background-color: #4a4a4a; }\n  .progress::-moz-progress-bar {\n    background-color: #4a4a4a; }\n  .progress::-ms-fill {\n    background-color: #4a4a4a;\n    border: none; }\n  .progress.is-white::-webkit-progress-value {\n    background-color: white; }\n  .progress.is-white::-moz-progress-bar {\n    background-color: white; }\n  .progress.is-white::-ms-fill {\n    background-color: white; }\n  .progress.is-black::-webkit-progress-value {\n    background-color: #0a0a0a; }\n  .progress.is-black::-moz-progress-bar {\n    background-color: #0a0a0a; }\n  .progress.is-black::-ms-fill {\n    background-color: #0a0a0a; }\n  .progress.is-light::-webkit-progress-value {\n    background-color: whitesmoke; }\n  .progress.is-light::-moz-progress-bar {\n    background-color: whitesmoke; }\n  .progress.is-light::-ms-fill {\n    background-color: whitesmoke; }\n  .progress.is-dark::-webkit-progress-value {\n    background-color: #363636; }\n  .progress.is-dark::-moz-progress-bar {\n    background-color: #363636; }\n  .progress.is-dark::-ms-fill {\n    background-color: #363636; }\n  .progress.is-primary::-webkit-progress-value, /deep/ .progress.tagAreaClass::-webkit-progress-value, /deep/ .progress.deleteAreaClass::-webkit-progress-value, /deep/ .progress.deleteContentClass::-webkit-progress-value {\n    background-color: #00d1b2; }\n  .progress.is-primary::-moz-progress-bar, /deep/ .progress.tagAreaClass::-moz-progress-bar, /deep/ .progress.deleteAreaClass::-moz-progress-bar, /deep/ .progress.deleteContentClass::-moz-progress-bar {\n    background-color: #00d1b2; }\n  .progress.is-primary::-ms-fill, /deep/ .progress.tagAreaClass::-ms-fill, /deep/ .progress.deleteAreaClass::-ms-fill, /deep/ .progress.deleteContentClass::-ms-fill {\n    background-color: #00d1b2; }\n  .progress.is-link::-webkit-progress-value {\n    background-color: #3273dc; }\n  .progress.is-link::-moz-progress-bar {\n    background-color: #3273dc; }\n  .progress.is-link::-ms-fill {\n    background-color: #3273dc; }\n  .progress.is-info::-webkit-progress-value {\n    background-color: #209cee; }\n  .progress.is-info::-moz-progress-bar {\n    background-color: #209cee; }\n  .progress.is-info::-ms-fill {\n    background-color: #209cee; }\n  .progress.is-success::-webkit-progress-value {\n    background-color: #23d160; }\n  .progress.is-success::-moz-progress-bar {\n    background-color: #23d160; }\n  .progress.is-success::-ms-fill {\n    background-color: #23d160; }\n  .progress.is-warning::-webkit-progress-value {\n    background-color: #ffdd57; }\n  .progress.is-warning::-moz-progress-bar {\n    background-color: #ffdd57; }\n  .progress.is-warning::-ms-fill {\n    background-color: #ffdd57; }\n  .progress.is-danger::-webkit-progress-value {\n    background-color: #ff3860; }\n  .progress.is-danger::-moz-progress-bar {\n    background-color: #ff3860; }\n  .progress.is-danger::-ms-fill {\n    background-color: #ff3860; }\n  .progress.is-small {\n    height: 0.75rem; }\n  .progress.is-medium {\n    height: 1.25rem; }\n  .progress.is-large {\n    height: 1.5rem; }\n\n.table {\n  background-color: white;\n  color: #363636; }\n  .table td,\n  .table th {\n    border: 1px solid #dbdbdb;\n    border-width: 0 0 1px;\n    padding: 0.5em 0.75em;\n    vertical-align: top; }\n    .table td.is-white,\n    .table th.is-white {\n      background-color: white;\n      border-color: white;\n      color: #0a0a0a; }\n    .table td.is-black,\n    .table th.is-black {\n      background-color: #0a0a0a;\n      border-color: #0a0a0a;\n      color: white; }\n    .table td.is-light,\n    .table th.is-light {\n      background-color: whitesmoke;\n      border-color: whitesmoke;\n      color: #363636; }\n    .table td.is-dark,\n    .table th.is-dark {\n      background-color: #363636;\n      border-color: #363636;\n      color: whitesmoke; }\n    .table td.is-primary, .table /deep/ td.tagAreaClass, /deep/ .table td.tagAreaClass, .table /deep/ td.deleteAreaClass, /deep/ .table td.deleteAreaClass, .table /deep/ td.deleteContentClass, /deep/ .table td.deleteContentClass,\n    .table th.is-primary,\n    .table /deep/ th.tagAreaClass,\n    /deep/ .table th.tagAreaClass,\n    .table /deep/ th.deleteAreaClass,\n    /deep/ .table th.deleteAreaClass,\n    .table /deep/ th.deleteContentClass,\n    /deep/ .table th.deleteContentClass {\n      background-color: #00d1b2;\n      border-color: #00d1b2;\n      color: #fff; }\n    .table td.is-link,\n    .table th.is-link {\n      background-color: #3273dc;\n      border-color: #3273dc;\n      color: #fff; }\n    .table td.is-info,\n    .table th.is-info {\n      background-color: #209cee;\n      border-color: #209cee;\n      color: #fff; }\n    .table td.is-success,\n    .table th.is-success {\n      background-color: #23d160;\n      border-color: #23d160;\n      color: #fff; }\n    .table td.is-warning,\n    .table th.is-warning {\n      background-color: #ffdd57;\n      border-color: #ffdd57;\n      color: rgba(0, 0, 0, 0.7); }\n    .table td.is-danger,\n    .table th.is-danger {\n      background-color: #ff3860;\n      border-color: #ff3860;\n      color: #fff; }\n    .table td.is-narrow,\n    .table th.is-narrow {\n      white-space: nowrap;\n      width: 1%; }\n    .table td.is-selected,\n    .table th.is-selected {\n      background-color: #00d1b2;\n      color: #fff; }\n      .table td.is-selected a,\n      .table td.is-selected strong,\n      .table th.is-selected a,\n      .table th.is-selected strong {\n        color: currentColor; }\n  .table th {\n    color: #363636;\n    text-align: left; }\n  .table tr.is-selected {\n    background-color: #00d1b2;\n    color: #fff; }\n    .table tr.is-selected a,\n    .table tr.is-selected strong {\n      color: currentColor; }\n    .table tr.is-selected td,\n    .table tr.is-selected th {\n      border-color: #fff;\n      color: currentColor; }\n  .table thead td,\n  .table thead th {\n    border-width: 0 0 2px;\n    color: #363636; }\n  .table tfoot td,\n  .table tfoot th {\n    border-width: 2px 0 0;\n    color: #363636; }\n  .table tbody tr:last-child td,\n  .table tbody tr:last-child th {\n    border-bottom-width: 0; }\n  .table.is-bordered td,\n  .table.is-bordered th {\n    border-width: 1px; }\n  .table.is-bordered tr:last-child td,\n  .table.is-bordered tr:last-child th {\n    border-bottom-width: 1px; }\n  .table.is-fullwidth {\n    width: 100%; }\n  .table.is-hoverable tbody tr:not(.is-selected):hover {\n    background-color: #fafafa; }\n  .table.is-hoverable.is-striped tbody tr:not(.is-selected):hover {\n    background-color: #fafafa; }\n    .table.is-hoverable.is-striped tbody tr:not(.is-selected):hover:nth-child(even) {\n      background-color: whitesmoke; }\n  .table.is-narrow td,\n  .table.is-narrow th {\n    padding: 0.25em 0.5em; }\n  .table.is-striped tbody tr:not(.is-selected):nth-child(even) {\n    background-color: #fafafa; }\n\n.table-container {\n  -webkit-overflow-scrolling: touch;\n  overflow: auto;\n  overflow-y: hidden;\n  max-width: 100%; }\n\n.tags {\n  align-items: center;\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-start; }\n  .tags .tag {\n    margin-bottom: 0.5rem; }\n    .tags .tag:not(:last-child) {\n      margin-right: 0.5rem; }\n  .tags:last-child {\n    margin-bottom: -0.5rem; }\n  .tags:not(:last-child) {\n    margin-bottom: 1rem; }\n  .tags.has-addons .tag {\n    margin-right: 0; }\n    .tags.has-addons .tag:not(:first-child) {\n      border-bottom-left-radius: 0;\n      border-top-left-radius: 0; }\n    .tags.has-addons .tag:not(:last-child) {\n      border-bottom-right-radius: 0;\n      border-top-right-radius: 0; }\n  .tags.is-centered {\n    justify-content: center; }\n    .tags.is-centered .tag {\n      margin-right: 0.25rem;\n      margin-left: 0.25rem; }\n  .tags.is-right {\n    justify-content: flex-end; }\n    .tags.is-right .tag:not(:first-child) {\n      margin-left: 0.5rem; }\n    .tags.is-right .tag:not(:last-child) {\n      margin-right: 0; }\n\n.tag:not(body), /deep/ .tagAreaClass {\n  align-items: center;\n  background-color: whitesmoke;\n  border-radius: 4px;\n  color: #4a4a4a;\n  display: inline-flex;\n  font-size: 0.75rem;\n  height: 2em;\n  justify-content: center;\n  line-height: 1.5;\n  padding-left: 0.75em;\n  padding-right: 0.75em;\n  white-space: nowrap; }\n  .tag:not(body) .delete, /deep/ .tagAreaClass .delete {\n    margin-left: 0.25rem;\n    margin-right: -0.375rem; }\n  .tag:not(body).is-white, /deep/ .is-white.tagAreaClass {\n    background-color: white;\n    color: #0a0a0a; }\n  .tag:not(body).is-black, /deep/ .is-black.tagAreaClass {\n    background-color: #0a0a0a;\n    color: white; }\n  .tag:not(body).is-light, /deep/ .is-light.tagAreaClass {\n    background-color: whitesmoke;\n    color: #363636; }\n  .tag:not(body).is-dark, /deep/ .is-dark.tagAreaClass {\n    background-color: #363636;\n    color: whitesmoke; }\n  .tag:not(body).is-primary, /deep/ .tagAreaClass, /deep/ .tag.deleteAreaClass:not(body), /deep/ .tag.deleteContentClass:not(body) {\n    background-color: #00d1b2;\n    color: #fff; }\n  .tag:not(body).is-link, /deep/ .is-link.tagAreaClass {\n    background-color: #3273dc;\n    color: #fff; }\n  .tag:not(body).is-info, /deep/ .is-info.tagAreaClass {\n    background-color: #209cee;\n    color: #fff; }\n  .tag:not(body).is-success, /deep/ .is-success.tagAreaClass {\n    background-color: #23d160;\n    color: #fff; }\n  .tag:not(body).is-warning, /deep/ .is-warning.tagAreaClass {\n    background-color: #ffdd57;\n    color: rgba(0, 0, 0, 0.7); }\n  .tag:not(body).is-danger, /deep/ .is-danger.tagAreaClass {\n    background-color: #ff3860;\n    color: #fff; }\n  .tag:not(body).is-medium, /deep/ .is-medium.tagAreaClass {\n    font-size: 1rem; }\n  .tag:not(body).is-large, /deep/ .is-large.tagAreaClass {\n    font-size: 1.25rem; }\n  .tag:not(body) .icon:first-child:not(:last-child), /deep/ .tagAreaClass .icon:first-child:not(:last-child) {\n    margin-left: -0.375em;\n    margin-right: 0.1875em; }\n  .tag:not(body) .icon:last-child:not(:first-child), /deep/ .tagAreaClass .icon:last-child:not(:first-child) {\n    margin-left: 0.1875em;\n    margin-right: -0.375em; }\n  .tag:not(body) .icon:first-child:last-child, /deep/ .tagAreaClass .icon:first-child:last-child {\n    margin-left: -0.375em;\n    margin-right: -0.375em; }\n  .tag:not(body).is-delete, /deep/ .is-delete.tagAreaClass {\n    margin-left: 1px;\n    padding: 0;\n    position: relative;\n    width: 2em; }\n    .tag:not(body).is-delete::before, /deep/ .is-delete.tagAreaClass::before, .tag:not(body).is-delete::after, /deep/ .is-delete.tagAreaClass::after {\n      background-color: currentColor;\n      content: \"\";\n      display: block;\n      left: 50%;\n      position: absolute;\n      top: 50%;\n      transform: translateX(-50%) translateY(-50%) rotate(45deg);\n      transform-origin: center center; }\n    .tag:not(body).is-delete::before, /deep/ .is-delete.tagAreaClass::before {\n      height: 1px;\n      width: 50%; }\n    .tag:not(body).is-delete::after, /deep/ .is-delete.tagAreaClass::after {\n      height: 50%;\n      width: 1px; }\n    .tag:not(body).is-delete:hover, /deep/ .is-delete.tagAreaClass:hover, .tag:not(body).is-delete:focus, /deep/ .is-delete.tagAreaClass:focus {\n      background-color: #e8e8e8; }\n    .tag:not(body).is-delete:active, /deep/ .is-delete.tagAreaClass:active {\n      background-color: #dbdbdb; }\n  .tag:not(body).is-rounded, /deep/ .is-rounded.tagAreaClass {\n    border-radius: 290486px; }\n\na.tag:hover {\n  text-decoration: underline; }\n\n.title,\n.subtitle {\n  word-break: break-word; }\n  .title em,\n  .title span,\n  .subtitle em,\n  .subtitle span {\n    font-weight: inherit; }\n  .title sub,\n  .subtitle sub {\n    font-size: 0.75em; }\n  .title sup,\n  .subtitle sup {\n    font-size: 0.75em; }\n  .title .tag,\n  .subtitle .tag {\n    vertical-align: middle; }\n\n.title {\n  color: #363636;\n  font-size: 2rem;\n  font-weight: 600;\n  line-height: 1.125; }\n  .title strong {\n    color: inherit;\n    font-weight: inherit; }\n  .title + .highlight {\n    margin-top: -0.75rem; }\n  .title:not(.is-spaced) + .subtitle {\n    margin-top: -1.25rem; }\n  .title.is-1 {\n    font-size: 3rem; }\n  .title.is-2 {\n    font-size: 2.5rem; }\n  .title.is-3 {\n    font-size: 2rem; }\n  .title.is-4 {\n    font-size: 1.5rem; }\n  .title.is-5 {\n    font-size: 1.25rem; }\n  .title.is-6 {\n    font-size: 1rem; }\n  .title.is-7 {\n    font-size: 0.75rem; }\n\n.subtitle {\n  color: #4a4a4a;\n  font-size: 1.25rem;\n  font-weight: 400;\n  line-height: 1.25; }\n  .subtitle strong {\n    color: #363636;\n    font-weight: 600; }\n  .subtitle:not(.is-spaced) + .title {\n    margin-top: -1.25rem; }\n  .subtitle.is-1 {\n    font-size: 3rem; }\n  .subtitle.is-2 {\n    font-size: 2.5rem; }\n  .subtitle.is-3 {\n    font-size: 2rem; }\n  .subtitle.is-4 {\n    font-size: 1.5rem; }\n  .subtitle.is-5 {\n    font-size: 1.25rem; }\n  .subtitle.is-6 {\n    font-size: 1rem; }\n  .subtitle.is-7 {\n    font-size: 0.75rem; }\n\n.heading {\n  display: block;\n  font-size: 11px;\n  letter-spacing: 1px;\n  margin-bottom: 5px;\n  text-transform: uppercase; }\n\n.highlight {\n  font-weight: 400;\n  max-width: 100%;\n  overflow: hidden;\n  padding: 0; }\n  .highlight pre {\n    overflow: auto;\n    max-width: 100%; }\n\n.number {\n  align-items: center;\n  background-color: whitesmoke;\n  border-radius: 290486px;\n  display: inline-flex;\n  font-size: 1.25rem;\n  height: 2em;\n  justify-content: center;\n  margin-right: 1.5rem;\n  min-width: 2.5em;\n  padding: 0.25rem 0.5rem;\n  text-align: center;\n  vertical-align: top; }\n\n.breadcrumb {\n  font-size: 1rem;\n  white-space: nowrap; }\n  .breadcrumb a {\n    align-items: center;\n    color: #3273dc;\n    display: flex;\n    justify-content: center;\n    padding: 0 0.75em; }\n    .breadcrumb a:hover {\n      color: #363636; }\n  .breadcrumb li {\n    align-items: center;\n    display: flex; }\n    .breadcrumb li:first-child a {\n      padding-left: 0; }\n    .breadcrumb li.is-active a {\n      color: #363636;\n      cursor: default;\n      pointer-events: none; }\n    .breadcrumb li + li::before {\n      color: #b5b5b5;\n      content: \"\\0002f\"; }\n  .breadcrumb ul,\n  .breadcrumb ol {\n    align-items: flex-start;\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: flex-start; }\n  .breadcrumb .icon:first-child {\n    margin-right: 0.5em; }\n  .breadcrumb .icon:last-child {\n    margin-left: 0.5em; }\n  .breadcrumb.is-centered ol,\n  .breadcrumb.is-centered ul {\n    justify-content: center; }\n  .breadcrumb.is-right ol,\n  .breadcrumb.is-right ul {\n    justify-content: flex-end; }\n  .breadcrumb.is-small {\n    font-size: 0.75rem; }\n  .breadcrumb.is-medium {\n    font-size: 1.25rem; }\n  .breadcrumb.is-large {\n    font-size: 1.5rem; }\n  .breadcrumb.has-arrow-separator li + li::before {\n    content: \"\\02192\"; }\n  .breadcrumb.has-bullet-separator li + li::before {\n    content: \"\\02022\"; }\n  .breadcrumb.has-dot-separator li + li::before {\n    content: \"\\000b7\"; }\n  .breadcrumb.has-succeeds-separator li + li::before {\n    content: \"\\0227B\"; }\n\n.card {\n  background-color: white;\n  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);\n  color: #4a4a4a;\n  max-width: 100%;\n  position: relative; }\n\n.card-header {\n  background-color: transparent;\n  align-items: stretch;\n  box-shadow: 0 1px 2px rgba(10, 10, 10, 0.1);\n  display: flex; }\n\n.card-header-title {\n  align-items: center;\n  color: #363636;\n  display: flex;\n  flex-grow: 1;\n  font-weight: 700;\n  padding: 0.75rem; }\n  .card-header-title.is-centered {\n    justify-content: center; }\n\n.card-header-icon {\n  align-items: center;\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  padding: 0.75rem; }\n\n.card-image {\n  display: block;\n  position: relative; }\n\n.card-content {\n  background-color: transparent;\n  padding: 1.5rem; }\n\n.card-footer {\n  background-color: transparent;\n  border-top: 1px solid #dbdbdb;\n  align-items: stretch;\n  display: flex; }\n\n.card-footer-item {\n  align-items: center;\n  display: flex;\n  flex-basis: 0;\n  flex-grow: 1;\n  flex-shrink: 0;\n  justify-content: center;\n  padding: 0.75rem; }\n  .card-footer-item:not(:last-child) {\n    border-right: 1px solid #dbdbdb; }\n\n.card .media:not(:last-child) {\n  margin-bottom: 0.75rem; }\n\n.dropdown {\n  display: inline-flex;\n  position: relative;\n  vertical-align: top; }\n  .dropdown.is-active .dropdown-menu, .dropdown.is-hoverable:hover .dropdown-menu {\n    display: block; }\n  .dropdown.is-right .dropdown-menu {\n    left: auto;\n    right: 0; }\n  .dropdown.is-up .dropdown-menu {\n    bottom: 100%;\n    padding-bottom: 4px;\n    padding-top: initial;\n    top: auto; }\n\n.dropdown-menu {\n  display: none;\n  left: 0;\n  min-width: 12rem;\n  padding-top: 4px;\n  position: absolute;\n  top: 100%;\n  z-index: 20; }\n\n.dropdown-content {\n  background-color: white;\n  border-radius: 4px;\n  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);\n  padding-bottom: 0.5rem;\n  padding-top: 0.5rem; }\n\n.dropdown-item {\n  color: #4a4a4a;\n  display: block;\n  font-size: 0.875rem;\n  line-height: 1.5;\n  padding: 0.375rem 1rem;\n  position: relative; }\n\na.dropdown-item,\nbutton.dropdown-item {\n  padding-right: 3rem;\n  text-align: left;\n  white-space: nowrap;\n  width: 100%; }\n  a.dropdown-item:hover,\n  button.dropdown-item:hover {\n    background-color: whitesmoke;\n    color: #0a0a0a; }\n  a.dropdown-item.is-active,\n  button.dropdown-item.is-active {\n    background-color: #3273dc;\n    color: #fff; }\n\n.dropdown-divider {\n  background-color: #dbdbdb;\n  border: none;\n  display: block;\n  height: 1px;\n  margin: 0.5rem 0; }\n\n.level {\n  align-items: center;\n  justify-content: space-between; }\n  .level code {\n    border-radius: 4px; }\n  .level img {\n    display: inline-block;\n    vertical-align: top; }\n  .level.is-mobile {\n    display: flex; }\n    .level.is-mobile .level-left,\n    .level.is-mobile .level-right {\n      display: flex; }\n    .level.is-mobile .level-left + .level-right {\n      margin-top: 0; }\n    .level.is-mobile .level-item:not(:last-child) {\n      margin-bottom: 0;\n      margin-right: 0.75rem; }\n    .level.is-mobile .level-item:not(.is-narrow) {\n      flex-grow: 1; }\n  @media screen and (min-width: 769px), print {\n    .level {\n      display: flex; }\n      .level > .level-item:not(.is-narrow) {\n        flex-grow: 1; } }\n\n.level-item {\n  align-items: center;\n  display: flex;\n  flex-basis: auto;\n  flex-grow: 0;\n  flex-shrink: 0;\n  justify-content: center; }\n  .level-item .title,\n  .level-item .subtitle {\n    margin-bottom: 0; }\n  @media screen and (max-width: 768px) {\n    .level-item:not(:last-child) {\n      margin-bottom: 0.75rem; } }\n\n.level-left,\n.level-right {\n  flex-basis: auto;\n  flex-grow: 0;\n  flex-shrink: 0; }\n  .level-left .level-item.is-flexible,\n  .level-right .level-item.is-flexible {\n    flex-grow: 1; }\n  @media screen and (min-width: 769px), print {\n    .level-left .level-item:not(:last-child),\n    .level-right .level-item:not(:last-child) {\n      margin-right: 0.75rem; } }\n\n.level-left {\n  align-items: center;\n  justify-content: flex-start; }\n  @media screen and (max-width: 768px) {\n    .level-left + .level-right {\n      margin-top: 1.5rem; } }\n  @media screen and (min-width: 769px), print {\n    .level-left {\n      display: flex; } }\n\n.level-right {\n  align-items: center;\n  justify-content: flex-end; }\n  @media screen and (min-width: 769px), print {\n    .level-right {\n      display: flex; } }\n\n.list {\n  background-color: white;\n  border-radius: 4px;\n  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1); }\n\n.list-item {\n  display: block;\n  padding: 0.5em 1em; }\n  .list-item:not(a) {\n    color: #4a4a4a; }\n  .list-item:first-child {\n    border-top-left-radius: 4px;\n    border-top-right-radius: 4px; }\n  .list-item:last-child {\n    border-top-left-radius: 4px;\n    border-top-right-radius: 4px; }\n  .list-item:not(:last-child) {\n    border-bottom: 1px solid #dbdbdb; }\n  .list-item.is-active {\n    background-color: #3273dc;\n    color: #fff; }\n\na.list-item {\n  background-color: whitesmoke;\n  cursor: pointer; }\n\n.media {\n  align-items: flex-start;\n  display: flex;\n  text-align: left; }\n  .media .content:not(:last-child) {\n    margin-bottom: 0.75rem; }\n  .media .media {\n    border-top: 1px solid rgba(219, 219, 219, 0.5);\n    display: flex;\n    padding-top: 0.75rem; }\n    .media .media .content:not(:last-child),\n    .media .media .control:not(:last-child) {\n      margin-bottom: 0.5rem; }\n    .media .media .media {\n      padding-top: 0.5rem; }\n      .media .media .media + .media {\n        margin-top: 0.5rem; }\n  .media + .media {\n    border-top: 1px solid rgba(219, 219, 219, 0.5);\n    margin-top: 1rem;\n    padding-top: 1rem; }\n  .media.is-large + .media {\n    margin-top: 1.5rem;\n    padding-top: 1.5rem; }\n\n.media-left,\n.media-right {\n  flex-basis: auto;\n  flex-grow: 0;\n  flex-shrink: 0; }\n\n.media-left {\n  margin-right: 1rem; }\n\n.media-right {\n  margin-left: 1rem; }\n\n.media-content {\n  flex-basis: auto;\n  flex-grow: 1;\n  flex-shrink: 1;\n  text-align: left; }\n\n@media screen and (max-width: 768px) {\n  .media-content {\n    overflow-x: auto; } }\n\n.menu {\n  font-size: 1rem; }\n  .menu.is-small {\n    font-size: 0.75rem; }\n  .menu.is-medium {\n    font-size: 1.25rem; }\n  .menu.is-large {\n    font-size: 1.5rem; }\n\n.menu-list {\n  line-height: 1.25; }\n  .menu-list a {\n    border-radius: 2px;\n    color: #4a4a4a;\n    display: block;\n    padding: 0.5em 0.75em; }\n    .menu-list a:hover {\n      background-color: whitesmoke;\n      color: #363636; }\n    .menu-list a.is-active {\n      background-color: #3273dc;\n      color: #fff; }\n  .menu-list li ul {\n    border-left: 1px solid #dbdbdb;\n    margin: 0.75em;\n    padding-left: 0.75em; }\n\n.menu-label {\n  color: #7a7a7a;\n  font-size: 0.75em;\n  letter-spacing: 0.1em;\n  text-transform: uppercase; }\n  .menu-label:not(:first-child) {\n    margin-top: 1em; }\n  .menu-label:not(:last-child) {\n    margin-bottom: 1em; }\n\n.message {\n  background-color: whitesmoke;\n  border-radius: 4px;\n  font-size: 1rem; }\n  .message strong {\n    color: currentColor; }\n  .message a:not(.button):not(.tag) {\n    color: currentColor;\n    text-decoration: underline; }\n  .message.is-small {\n    font-size: 0.75rem; }\n  .message.is-medium {\n    font-size: 1.25rem; }\n  .message.is-large {\n    font-size: 1.5rem; }\n  .message.is-white {\n    background-color: white; }\n    .message.is-white .message-header {\n      background-color: white;\n      color: #0a0a0a; }\n    .message.is-white .message-body {\n      border-color: white;\n      color: #4d4d4d; }\n  .message.is-black {\n    background-color: #fafafa; }\n    .message.is-black .message-header {\n      background-color: #0a0a0a;\n      color: white; }\n    .message.is-black .message-body {\n      border-color: #0a0a0a;\n      color: #090909; }\n  .message.is-light {\n    background-color: #fafafa; }\n    .message.is-light .message-header {\n      background-color: whitesmoke;\n      color: #363636; }\n    .message.is-light .message-body {\n      border-color: whitesmoke;\n      color: #505050; }\n  .message.is-dark {\n    background-color: #fafafa; }\n    .message.is-dark .message-header {\n      background-color: #363636;\n      color: whitesmoke; }\n    .message.is-dark .message-body {\n      border-color: #363636;\n      color: #2a2a2a; }\n  .message.is-primary, /deep/ .message.tagAreaClass, /deep/ .message.deleteAreaClass, /deep/ .message.deleteContentClass {\n    background-color: #f5fffd; }\n    .message.is-primary .message-header, /deep/ .message.tagAreaClass .message-header, /deep/ .message.deleteAreaClass .message-header, /deep/ .message.deleteContentClass .message-header {\n      background-color: #00d1b2;\n      color: #fff; }\n    .message.is-primary .message-body, /deep/ .message.tagAreaClass .message-body, /deep/ .message.deleteAreaClass .message-body, /deep/ .message.deleteContentClass .message-body {\n      border-color: #00d1b2;\n      color: #021310; }\n  .message.is-link {\n    background-color: #f6f9fe; }\n    .message.is-link .message-header {\n      background-color: #3273dc;\n      color: #fff; }\n    .message.is-link .message-body {\n      border-color: #3273dc;\n      color: #22509a; }\n  .message.is-info {\n    background-color: #f6fbfe; }\n    .message.is-info .message-header {\n      background-color: #209cee;\n      color: #fff; }\n    .message.is-info .message-body {\n      border-color: #209cee;\n      color: #12537e; }\n  .message.is-success {\n    background-color: #f6fef9; }\n    .message.is-success .message-header {\n      background-color: #23d160;\n      color: #fff; }\n    .message.is-success .message-body {\n      border-color: #23d160;\n      color: #0e301a; }\n  .message.is-warning {\n    background-color: #fffdf5; }\n    .message.is-warning .message-header {\n      background-color: #ffdd57;\n      color: rgba(0, 0, 0, 0.7); }\n    .message.is-warning .message-body {\n      border-color: #ffdd57;\n      color: #3b3108; }\n  .message.is-danger {\n    background-color: #fff5f7; }\n    .message.is-danger .message-header {\n      background-color: #ff3860;\n      color: #fff; }\n    .message.is-danger .message-body {\n      border-color: #ff3860;\n      color: #cd0930; }\n\n.message-header {\n  align-items: center;\n  background-color: #4a4a4a;\n  border-radius: 4px 4px 0 0;\n  color: #fff;\n  display: flex;\n  font-weight: 700;\n  justify-content: space-between;\n  line-height: 1.25;\n  padding: 0.75em 1em;\n  position: relative; }\n  .message-header .delete {\n    flex-grow: 0;\n    flex-shrink: 0;\n    margin-left: 0.75em; }\n  .message-header + .message-body {\n    border-width: 0;\n    border-top-left-radius: 0;\n    border-top-right-radius: 0; }\n\n.message-body {\n  border-color: #dbdbdb;\n  border-radius: 4px;\n  border-style: solid;\n  border-width: 0 0 0 4px;\n  color: #4a4a4a;\n  padding: 1.25em 1.5em; }\n  .message-body code,\n  .message-body pre {\n    background-color: white; }\n  .message-body pre code {\n    background-color: transparent; }\n\n.modal {\n  align-items: center;\n  display: none;\n  flex-direction: column;\n  justify-content: center;\n  overflow: hidden;\n  position: fixed;\n  z-index: 40; }\n  .modal.is-active {\n    display: flex; }\n\n.modal-background {\n  background-color: rgba(10, 10, 10, 0.86); }\n\n.modal-content,\n.modal-card {\n  margin: 0 20px;\n  max-height: calc(100vh - 160px);\n  overflow: auto;\n  position: relative;\n  width: 100%; }\n  @media screen and (min-width: 769px), print {\n    .modal-content,\n    .modal-card {\n      margin: 0 auto;\n      max-height: calc(100vh - 40px);\n      width: 640px; } }\n\n.modal-close {\n  background: none;\n  height: 40px;\n  position: fixed;\n  right: 20px;\n  top: 20px;\n  width: 40px; }\n\n.modal-card {\n  display: flex;\n  flex-direction: column;\n  max-height: calc(100vh - 40px);\n  overflow: hidden;\n  -ms-overflow-y: visible; }\n\n.modal-card-head,\n.modal-card-foot {\n  align-items: center;\n  background-color: whitesmoke;\n  display: flex;\n  flex-shrink: 0;\n  justify-content: flex-start;\n  padding: 20px;\n  position: relative; }\n\n.modal-card-head {\n  border-bottom: 1px solid #dbdbdb;\n  border-top-left-radius: 6px;\n  border-top-right-radius: 6px; }\n\n.modal-card-title {\n  color: #363636;\n  flex-grow: 1;\n  flex-shrink: 0;\n  font-size: 1.5rem;\n  line-height: 1; }\n\n.modal-card-foot {\n  border-bottom-left-radius: 6px;\n  border-bottom-right-radius: 6px;\n  border-top: 1px solid #dbdbdb; }\n  .modal-card-foot .button:not(:last-child) {\n    margin-right: 10px; }\n\n.modal-card-body {\n  -webkit-overflow-scrolling: touch;\n  background-color: white;\n  flex-grow: 1;\n  flex-shrink: 1;\n  overflow: auto;\n  padding: 20px; }\n\n.navbar {\n  background-color: white;\n  min-height: 3.25rem;\n  position: relative;\n  z-index: 30; }\n  .navbar.is-white {\n    background-color: white;\n    color: #0a0a0a; }\n    .navbar.is-white .navbar-brand > .navbar-item,\n    .navbar.is-white .navbar-brand .navbar-link {\n      color: #0a0a0a; }\n    .navbar.is-white .navbar-brand > a.navbar-item:hover, .navbar.is-white .navbar-brand > a.navbar-item.is-active,\n    .navbar.is-white .navbar-brand .navbar-link:hover,\n    .navbar.is-white .navbar-brand .navbar-link.is-active {\n      background-color: #f2f2f2;\n      color: #0a0a0a; }\n    .navbar.is-white .navbar-brand .navbar-link::after {\n      border-color: #0a0a0a; }\n    .navbar.is-white .navbar-burger {\n      color: #0a0a0a; }\n    @media screen and (min-width: 1088px) {\n      .navbar.is-white .navbar-start > .navbar-item,\n      .navbar.is-white .navbar-start .navbar-link,\n      .navbar.is-white .navbar-end > .navbar-item,\n      .navbar.is-white .navbar-end .navbar-link {\n        color: #0a0a0a; }\n      .navbar.is-white .navbar-start > a.navbar-item:hover, .navbar.is-white .navbar-start > a.navbar-item.is-active,\n      .navbar.is-white .navbar-start .navbar-link:hover,\n      .navbar.is-white .navbar-start .navbar-link.is-active,\n      .navbar.is-white .navbar-end > a.navbar-item:hover,\n      .navbar.is-white .navbar-end > a.navbar-item.is-active,\n      .navbar.is-white .navbar-end .navbar-link:hover,\n      .navbar.is-white .navbar-end .navbar-link.is-active {\n        background-color: #f2f2f2;\n        color: #0a0a0a; }\n      .navbar.is-white .navbar-start .navbar-link::after,\n      .navbar.is-white .navbar-end .navbar-link::after {\n        border-color: #0a0a0a; }\n      .navbar.is-white .navbar-item.has-dropdown:hover .navbar-link,\n      .navbar.is-white .navbar-item.has-dropdown.is-active .navbar-link {\n        background-color: #f2f2f2;\n        color: #0a0a0a; }\n      .navbar.is-white .navbar-dropdown a.navbar-item.is-active {\n        background-color: white;\n        color: #0a0a0a; } }\n  .navbar.is-black {\n    background-color: #0a0a0a;\n    color: white; }\n    .navbar.is-black .navbar-brand > .navbar-item,\n    .navbar.is-black .navbar-brand .navbar-link {\n      color: white; }\n    .navbar.is-black .navbar-brand > a.navbar-item:hover, .navbar.is-black .navbar-brand > a.navbar-item.is-active,\n    .navbar.is-black .navbar-brand .navbar-link:hover,\n    .navbar.is-black .navbar-brand .navbar-link.is-active {\n      background-color: black;\n      color: white; }\n    .navbar.is-black .navbar-brand .navbar-link::after {\n      border-color: white; }\n    .navbar.is-black .navbar-burger {\n      color: white; }\n    @media screen and (min-width: 1088px) {\n      .navbar.is-black .navbar-start > .navbar-item,\n      .navbar.is-black .navbar-start .navbar-link,\n      .navbar.is-black .navbar-end > .navbar-item,\n      .navbar.is-black .navbar-end .navbar-link {\n        color: white; }\n      .navbar.is-black .navbar-start > a.navbar-item:hover, .navbar.is-black .navbar-start > a.navbar-item.is-active,\n      .navbar.is-black .navbar-start .navbar-link:hover,\n      .navbar.is-black .navbar-start .navbar-link.is-active,\n      .navbar.is-black .navbar-end > a.navbar-item:hover,\n      .navbar.is-black .navbar-end > a.navbar-item.is-active,\n      .navbar.is-black .navbar-end .navbar-link:hover,\n      .navbar.is-black .navbar-end .navbar-link.is-active {\n        background-color: black;\n        color: white; }\n      .navbar.is-black .navbar-start .navbar-link::after,\n      .navbar.is-black .navbar-end .navbar-link::after {\n        border-color: white; }\n      .navbar.is-black .navbar-item.has-dropdown:hover .navbar-link,\n      .navbar.is-black .navbar-item.has-dropdown.is-active .navbar-link {\n        background-color: black;\n        color: white; }\n      .navbar.is-black .navbar-dropdown a.navbar-item.is-active {\n        background-color: #0a0a0a;\n        color: white; } }\n  .navbar.is-light {\n    background-color: whitesmoke;\n    color: #363636; }\n    .navbar.is-light .navbar-brand > .navbar-item,\n    .navbar.is-light .navbar-brand .navbar-link {\n      color: #363636; }\n    .navbar.is-light .navbar-brand > a.navbar-item:hover, .navbar.is-light .navbar-brand > a.navbar-item.is-active,\n    .navbar.is-light .navbar-brand .navbar-link:hover,\n    .navbar.is-light .navbar-brand .navbar-link.is-active {\n      background-color: #e8e8e8;\n      color: #363636; }\n    .navbar.is-light .navbar-brand .navbar-link::after {\n      border-color: #363636; }\n    .navbar.is-light .navbar-burger {\n      color: #363636; }\n    @media screen and (min-width: 1088px) {\n      .navbar.is-light .navbar-start > .navbar-item,\n      .navbar.is-light .navbar-start .navbar-link,\n      .navbar.is-light .navbar-end > .navbar-item,\n      .navbar.is-light .navbar-end .navbar-link {\n        color: #363636; }\n      .navbar.is-light .navbar-start > a.navbar-item:hover, .navbar.is-light .navbar-start > a.navbar-item.is-active,\n      .navbar.is-light .navbar-start .navbar-link:hover,\n      .navbar.is-light .navbar-start .navbar-link.is-active,\n      .navbar.is-light .navbar-end > a.navbar-item:hover,\n      .navbar.is-light .navbar-end > a.navbar-item.is-active,\n      .navbar.is-light .navbar-end .navbar-link:hover,\n      .navbar.is-light .navbar-end .navbar-link.is-active {\n        background-color: #e8e8e8;\n        color: #363636; }\n      .navbar.is-light .navbar-start .navbar-link::after,\n      .navbar.is-light .navbar-end .navbar-link::after {\n        border-color: #363636; }\n      .navbar.is-light .navbar-item.has-dropdown:hover .navbar-link,\n      .navbar.is-light .navbar-item.has-dropdown.is-active .navbar-link {\n        background-color: #e8e8e8;\n        color: #363636; }\n      .navbar.is-light .navbar-dropdown a.navbar-item.is-active {\n        background-color: whitesmoke;\n        color: #363636; } }\n  .navbar.is-dark {\n    background-color: #363636;\n    color: whitesmoke; }\n    .navbar.is-dark .navbar-brand > .navbar-item,\n    .navbar.is-dark .navbar-brand .navbar-link {\n      color: whitesmoke; }\n    .navbar.is-dark .navbar-brand > a.navbar-item:hover, .navbar.is-dark .navbar-brand > a.navbar-item.is-active,\n    .navbar.is-dark .navbar-brand .navbar-link:hover,\n    .navbar.is-dark .navbar-brand .navbar-link.is-active {\n      background-color: #292929;\n      color: whitesmoke; }\n    .navbar.is-dark .navbar-brand .navbar-link::after {\n      border-color: whitesmoke; }\n    .navbar.is-dark .navbar-burger {\n      color: whitesmoke; }\n    @media screen and (min-width: 1088px) {\n      .navbar.is-dark .navbar-start > .navbar-item,\n      .navbar.is-dark .navbar-start .navbar-link,\n      .navbar.is-dark .navbar-end > .navbar-item,\n      .navbar.is-dark .navbar-end .navbar-link {\n        color: whitesmoke; }\n      .navbar.is-dark .navbar-start > a.navbar-item:hover, .navbar.is-dark .navbar-start > a.navbar-item.is-active,\n      .navbar.is-dark .navbar-start .navbar-link:hover,\n      .navbar.is-dark .navbar-start .navbar-link.is-active,\n      .navbar.is-dark .navbar-end > a.navbar-item:hover,\n      .navbar.is-dark .navbar-end > a.navbar-item.is-active,\n      .navbar.is-dark .navbar-end .navbar-link:hover,\n      .navbar.is-dark .navbar-end .navbar-link.is-active {\n        background-color: #292929;\n        color: whitesmoke; }\n      .navbar.is-dark .navbar-start .navbar-link::after,\n      .navbar.is-dark .navbar-end .navbar-link::after {\n        border-color: whitesmoke; }\n      .navbar.is-dark .navbar-item.has-dropdown:hover .navbar-link,\n      .navbar.is-dark .navbar-item.has-dropdown.is-active .navbar-link {\n        background-color: #292929;\n        color: whitesmoke; }\n      .navbar.is-dark .navbar-dropdown a.navbar-item.is-active {\n        background-color: #363636;\n        color: whitesmoke; } }\n  .navbar.is-primary, /deep/ .navbar.tagAreaClass, /deep/ .navbar.deleteAreaClass, /deep/ .navbar.deleteContentClass {\n    background-color: #00d1b2;\n    color: #fff; }\n    .navbar.is-primary .navbar-brand > .navbar-item, /deep/ .navbar.tagAreaClass .navbar-brand > .navbar-item, /deep/ .navbar.deleteAreaClass .navbar-brand > .navbar-item, /deep/ .navbar.deleteContentClass .navbar-brand > .navbar-item,\n    .navbar.is-primary .navbar-brand .navbar-link,\n    /deep/ .navbar.tagAreaClass .navbar-brand .navbar-link,\n    /deep/ .navbar.deleteAreaClass .navbar-brand .navbar-link,\n    /deep/ .navbar.deleteContentClass .navbar-brand .navbar-link {\n      color: #fff; }\n    .navbar.is-primary .navbar-brand > a.navbar-item:hover, /deep/ .navbar.tagAreaClass .navbar-brand > a.navbar-item:hover, /deep/ .navbar.deleteAreaClass .navbar-brand > a.navbar-item:hover, /deep/ .navbar.deleteContentClass .navbar-brand > a.navbar-item:hover, .navbar.is-primary .navbar-brand > a.navbar-item.is-active, /deep/ .navbar.tagAreaClass .navbar-brand > a.navbar-item.is-active, /deep/ .navbar.deleteAreaClass .navbar-brand > a.navbar-item.is-active, /deep/ .navbar.deleteContentClass .navbar-brand > a.navbar-item.is-active,\n    .navbar.is-primary .navbar-brand .navbar-link:hover,\n    /deep/ .navbar.tagAreaClass .navbar-brand .navbar-link:hover,\n    /deep/ .navbar.deleteAreaClass .navbar-brand .navbar-link:hover,\n    /deep/ .navbar.deleteContentClass .navbar-brand .navbar-link:hover,\n    .navbar.is-primary .navbar-brand .navbar-link.is-active,\n    /deep/ .navbar.tagAreaClass .navbar-brand .navbar-link.is-active,\n    /deep/ .navbar.deleteAreaClass .navbar-brand .navbar-link.is-active,\n    /deep/ .navbar.deleteContentClass .navbar-brand .navbar-link.is-active {\n      background-color: #00b89c;\n      color: #fff; }\n    .navbar.is-primary .navbar-brand .navbar-link::after, /deep/ .navbar.tagAreaClass .navbar-brand .navbar-link::after, /deep/ .navbar.deleteAreaClass .navbar-brand .navbar-link::after, /deep/ .navbar.deleteContentClass .navbar-brand .navbar-link::after {\n      border-color: #fff; }\n    .navbar.is-primary .navbar-burger, /deep/ .navbar.tagAreaClass .navbar-burger, /deep/ .navbar.deleteAreaClass .navbar-burger, /deep/ .navbar.deleteContentClass .navbar-burger {\n      color: #fff; }\n    @media screen and (min-width: 1088px) {\n      .navbar.is-primary .navbar-start > .navbar-item, /deep/ .navbar.tagAreaClass .navbar-start > .navbar-item, /deep/ .navbar.deleteAreaClass .navbar-start > .navbar-item, /deep/ .navbar.deleteContentClass .navbar-start > .navbar-item,\n      .navbar.is-primary .navbar-start .navbar-link,\n      /deep/ .navbar.tagAreaClass .navbar-start .navbar-link,\n      /deep/ .navbar.deleteAreaClass .navbar-start .navbar-link,\n      /deep/ .navbar.deleteContentClass .navbar-start .navbar-link,\n      .navbar.is-primary .navbar-end > .navbar-item,\n      /deep/ .navbar.tagAreaClass .navbar-end > .navbar-item,\n      /deep/ .navbar.deleteAreaClass .navbar-end > .navbar-item,\n      /deep/ .navbar.deleteContentClass .navbar-end > .navbar-item,\n      .navbar.is-primary .navbar-end .navbar-link,\n      /deep/ .navbar.tagAreaClass .navbar-end .navbar-link,\n      /deep/ .navbar.deleteAreaClass .navbar-end .navbar-link,\n      /deep/ .navbar.deleteContentClass .navbar-end .navbar-link {\n        color: #fff; }\n      .navbar.is-primary .navbar-start > a.navbar-item:hover, /deep/ .navbar.tagAreaClass .navbar-start > a.navbar-item:hover, /deep/ .navbar.deleteAreaClass .navbar-start > a.navbar-item:hover, /deep/ .navbar.deleteContentClass .navbar-start > a.navbar-item:hover, .navbar.is-primary .navbar-start > a.navbar-item.is-active, /deep/ .navbar.tagAreaClass .navbar-start > a.navbar-item.is-active, /deep/ .navbar.deleteAreaClass .navbar-start > a.navbar-item.is-active, /deep/ .navbar.deleteContentClass .navbar-start > a.navbar-item.is-active,\n      .navbar.is-primary .navbar-start .navbar-link:hover,\n      /deep/ .navbar.tagAreaClass .navbar-start .navbar-link:hover,\n      /deep/ .navbar.deleteAreaClass .navbar-start .navbar-link:hover,\n      /deep/ .navbar.deleteContentClass .navbar-start .navbar-link:hover,\n      .navbar.is-primary .navbar-start .navbar-link.is-active,\n      /deep/ .navbar.tagAreaClass .navbar-start .navbar-link.is-active,\n      /deep/ .navbar.deleteAreaClass .navbar-start .navbar-link.is-active,\n      /deep/ .navbar.deleteContentClass .navbar-start .navbar-link.is-active,\n      .navbar.is-primary .navbar-end > a.navbar-item:hover,\n      /deep/ .navbar.tagAreaClass .navbar-end > a.navbar-item:hover,\n      /deep/ .navbar.deleteAreaClass .navbar-end > a.navbar-item:hover,\n      /deep/ .navbar.deleteContentClass .navbar-end > a.navbar-item:hover,\n      .navbar.is-primary .navbar-end > a.navbar-item.is-active,\n      /deep/ .navbar.tagAreaClass .navbar-end > a.navbar-item.is-active,\n      /deep/ .navbar.deleteAreaClass .navbar-end > a.navbar-item.is-active,\n      /deep/ .navbar.deleteContentClass .navbar-end > a.navbar-item.is-active,\n      .navbar.is-primary .navbar-end .navbar-link:hover,\n      /deep/ .navbar.tagAreaClass .navbar-end .navbar-link:hover,\n      /deep/ .navbar.deleteAreaClass .navbar-end .navbar-link:hover,\n      /deep/ .navbar.deleteContentClass .navbar-end .navbar-link:hover,\n      .navbar.is-primary .navbar-end .navbar-link.is-active,\n      /deep/ .navbar.tagAreaClass .navbar-end .navbar-link.is-active,\n      /deep/ .navbar.deleteAreaClass .navbar-end .navbar-link.is-active,\n      /deep/ .navbar.deleteContentClass .navbar-end .navbar-link.is-active {\n        background-color: #00b89c;\n        color: #fff; }\n      .navbar.is-primary .navbar-start .navbar-link::after, /deep/ .navbar.tagAreaClass .navbar-start .navbar-link::after, /deep/ .navbar.deleteAreaClass .navbar-start .navbar-link::after, /deep/ .navbar.deleteContentClass .navbar-start .navbar-link::after,\n      .navbar.is-primary .navbar-end .navbar-link::after,\n      /deep/ .navbar.tagAreaClass .navbar-end .navbar-link::after,\n      /deep/ .navbar.deleteAreaClass .navbar-end .navbar-link::after,\n      /deep/ .navbar.deleteContentClass .navbar-end .navbar-link::after {\n        border-color: #fff; }\n      .navbar.is-primary .navbar-item.has-dropdown:hover .navbar-link, /deep/ .navbar.tagAreaClass .navbar-item.has-dropdown:hover .navbar-link, /deep/ .navbar.deleteAreaClass .navbar-item.has-dropdown:hover .navbar-link, /deep/ .navbar.deleteContentClass .navbar-item.has-dropdown:hover .navbar-link,\n      .navbar.is-primary .navbar-item.has-dropdown.is-active .navbar-link,\n      /deep/ .navbar.tagAreaClass .navbar-item.has-dropdown.is-active .navbar-link,\n      /deep/ .navbar.deleteAreaClass .navbar-item.has-dropdown.is-active .navbar-link,\n      /deep/ .navbar.deleteContentClass .navbar-item.has-dropdown.is-active .navbar-link {\n        background-color: #00b89c;\n        color: #fff; }\n      .navbar.is-primary .navbar-dropdown a.navbar-item.is-active, /deep/ .navbar.tagAreaClass .navbar-dropdown a.navbar-item.is-active, /deep/ .navbar.deleteAreaClass .navbar-dropdown a.navbar-item.is-active, /deep/ .navbar.deleteContentClass .navbar-dropdown a.navbar-item.is-active {\n        background-color: #00d1b2;\n        color: #fff; } }\n  .navbar.is-link {\n    background-color: #3273dc;\n    color: #fff; }\n    .navbar.is-link .navbar-brand > .navbar-item,\n    .navbar.is-link .navbar-brand .navbar-link {\n      color: #fff; }\n    .navbar.is-link .navbar-brand > a.navbar-item:hover, .navbar.is-link .navbar-brand > a.navbar-item.is-active,\n    .navbar.is-link .navbar-brand .navbar-link:hover,\n    .navbar.is-link .navbar-brand .navbar-link.is-active {\n      background-color: #2366d1;\n      color: #fff; }\n    .navbar.is-link .navbar-brand .navbar-link::after {\n      border-color: #fff; }\n    .navbar.is-link .navbar-burger {\n      color: #fff; }\n    @media screen and (min-width: 1088px) {\n      .navbar.is-link .navbar-start > .navbar-item,\n      .navbar.is-link .navbar-start .navbar-link,\n      .navbar.is-link .navbar-end > .navbar-item,\n      .navbar.is-link .navbar-end .navbar-link {\n        color: #fff; }\n      .navbar.is-link .navbar-start > a.navbar-item:hover, .navbar.is-link .navbar-start > a.navbar-item.is-active,\n      .navbar.is-link .navbar-start .navbar-link:hover,\n      .navbar.is-link .navbar-start .navbar-link.is-active,\n      .navbar.is-link .navbar-end > a.navbar-item:hover,\n      .navbar.is-link .navbar-end > a.navbar-item.is-active,\n      .navbar.is-link .navbar-end .navbar-link:hover,\n      .navbar.is-link .navbar-end .navbar-link.is-active {\n        background-color: #2366d1;\n        color: #fff; }\n      .navbar.is-link .navbar-start .navbar-link::after,\n      .navbar.is-link .navbar-end .navbar-link::after {\n        border-color: #fff; }\n      .navbar.is-link .navbar-item.has-dropdown:hover .navbar-link,\n      .navbar.is-link .navbar-item.has-dropdown.is-active .navbar-link {\n        background-color: #2366d1;\n        color: #fff; }\n      .navbar.is-link .navbar-dropdown a.navbar-item.is-active {\n        background-color: #3273dc;\n        color: #fff; } }\n  .navbar.is-info {\n    background-color: #209cee;\n    color: #fff; }\n    .navbar.is-info .navbar-brand > .navbar-item,\n    .navbar.is-info .navbar-brand .navbar-link {\n      color: #fff; }\n    .navbar.is-info .navbar-brand > a.navbar-item:hover, .navbar.is-info .navbar-brand > a.navbar-item.is-active,\n    .navbar.is-info .navbar-brand .navbar-link:hover,\n    .navbar.is-info .navbar-brand .navbar-link.is-active {\n      background-color: #118fe4;\n      color: #fff; }\n    .navbar.is-info .navbar-brand .navbar-link::after {\n      border-color: #fff; }\n    .navbar.is-info .navbar-burger {\n      color: #fff; }\n    @media screen and (min-width: 1088px) {\n      .navbar.is-info .navbar-start > .navbar-item,\n      .navbar.is-info .navbar-start .navbar-link,\n      .navbar.is-info .navbar-end > .navbar-item,\n      .navbar.is-info .navbar-end .navbar-link {\n        color: #fff; }\n      .navbar.is-info .navbar-start > a.navbar-item:hover, .navbar.is-info .navbar-start > a.navbar-item.is-active,\n      .navbar.is-info .navbar-start .navbar-link:hover,\n      .navbar.is-info .navbar-start .navbar-link.is-active,\n      .navbar.is-info .navbar-end > a.navbar-item:hover,\n      .navbar.is-info .navbar-end > a.navbar-item.is-active,\n      .navbar.is-info .navbar-end .navbar-link:hover,\n      .navbar.is-info .navbar-end .navbar-link.is-active {\n        background-color: #118fe4;\n        color: #fff; }\n      .navbar.is-info .navbar-start .navbar-link::after,\n      .navbar.is-info .navbar-end .navbar-link::after {\n        border-color: #fff; }\n      .navbar.is-info .navbar-item.has-dropdown:hover .navbar-link,\n      .navbar.is-info .navbar-item.has-dropdown.is-active .navbar-link {\n        background-color: #118fe4;\n        color: #fff; }\n      .navbar.is-info .navbar-dropdown a.navbar-item.is-active {\n        background-color: #209cee;\n        color: #fff; } }\n  .navbar.is-success {\n    background-color: #23d160;\n    color: #fff; }\n    .navbar.is-success .navbar-brand > .navbar-item,\n    .navbar.is-success .navbar-brand .navbar-link {\n      color: #fff; }\n    .navbar.is-success .navbar-brand > a.navbar-item:hover, .navbar.is-success .navbar-brand > a.navbar-item.is-active,\n    .navbar.is-success .navbar-brand .navbar-link:hover,\n    .navbar.is-success .navbar-brand .navbar-link.is-active {\n      background-color: #20bc56;\n      color: #fff; }\n    .navbar.is-success .navbar-brand .navbar-link::after {\n      border-color: #fff; }\n    .navbar.is-success .navbar-burger {\n      color: #fff; }\n    @media screen and (min-width: 1088px) {\n      .navbar.is-success .navbar-start > .navbar-item,\n      .navbar.is-success .navbar-start .navbar-link,\n      .navbar.is-success .navbar-end > .navbar-item,\n      .navbar.is-success .navbar-end .navbar-link {\n        color: #fff; }\n      .navbar.is-success .navbar-start > a.navbar-item:hover, .navbar.is-success .navbar-start > a.navbar-item.is-active,\n      .navbar.is-success .navbar-start .navbar-link:hover,\n      .navbar.is-success .navbar-start .navbar-link.is-active,\n      .navbar.is-success .navbar-end > a.navbar-item:hover,\n      .navbar.is-success .navbar-end > a.navbar-item.is-active,\n      .navbar.is-success .navbar-end .navbar-link:hover,\n      .navbar.is-success .navbar-end .navbar-link.is-active {\n        background-color: #20bc56;\n        color: #fff; }\n      .navbar.is-success .navbar-start .navbar-link::after,\n      .navbar.is-success .navbar-end .navbar-link::after {\n        border-color: #fff; }\n      .navbar.is-success .navbar-item.has-dropdown:hover .navbar-link,\n      .navbar.is-success .navbar-item.has-dropdown.is-active .navbar-link {\n        background-color: #20bc56;\n        color: #fff; }\n      .navbar.is-success .navbar-dropdown a.navbar-item.is-active {\n        background-color: #23d160;\n        color: #fff; } }\n  .navbar.is-warning {\n    background-color: #ffdd57;\n    color: rgba(0, 0, 0, 0.7); }\n    .navbar.is-warning .navbar-brand > .navbar-item,\n    .navbar.is-warning .navbar-brand .navbar-link {\n      color: rgba(0, 0, 0, 0.7); }\n    .navbar.is-warning .navbar-brand > a.navbar-item:hover, .navbar.is-warning .navbar-brand > a.navbar-item.is-active,\n    .navbar.is-warning .navbar-brand .navbar-link:hover,\n    .navbar.is-warning .navbar-brand .navbar-link.is-active {\n      background-color: #ffd83d;\n      color: rgba(0, 0, 0, 0.7); }\n    .navbar.is-warning .navbar-brand .navbar-link::after {\n      border-color: rgba(0, 0, 0, 0.7); }\n    .navbar.is-warning .navbar-burger {\n      color: rgba(0, 0, 0, 0.7); }\n    @media screen and (min-width: 1088px) {\n      .navbar.is-warning .navbar-start > .navbar-item,\n      .navbar.is-warning .navbar-start .navbar-link,\n      .navbar.is-warning .navbar-end > .navbar-item,\n      .navbar.is-warning .navbar-end .navbar-link {\n        color: rgba(0, 0, 0, 0.7); }\n      .navbar.is-warning .navbar-start > a.navbar-item:hover, .navbar.is-warning .navbar-start > a.navbar-item.is-active,\n      .navbar.is-warning .navbar-start .navbar-link:hover,\n      .navbar.is-warning .navbar-start .navbar-link.is-active,\n      .navbar.is-warning .navbar-end > a.navbar-item:hover,\n      .navbar.is-warning .navbar-end > a.navbar-item.is-active,\n      .navbar.is-warning .navbar-end .navbar-link:hover,\n      .navbar.is-warning .navbar-end .navbar-link.is-active {\n        background-color: #ffd83d;\n        color: rgba(0, 0, 0, 0.7); }\n      .navbar.is-warning .navbar-start .navbar-link::after,\n      .navbar.is-warning .navbar-end .navbar-link::after {\n        border-color: rgba(0, 0, 0, 0.7); }\n      .navbar.is-warning .navbar-item.has-dropdown:hover .navbar-link,\n      .navbar.is-warning .navbar-item.has-dropdown.is-active .navbar-link {\n        background-color: #ffd83d;\n        color: rgba(0, 0, 0, 0.7); }\n      .navbar.is-warning .navbar-dropdown a.navbar-item.is-active {\n        background-color: #ffdd57;\n        color: rgba(0, 0, 0, 0.7); } }\n  .navbar.is-danger {\n    background-color: #ff3860;\n    color: #fff; }\n    .navbar.is-danger .navbar-brand > .navbar-item,\n    .navbar.is-danger .navbar-brand .navbar-link {\n      color: #fff; }\n    .navbar.is-danger .navbar-brand > a.navbar-item:hover, .navbar.is-danger .navbar-brand > a.navbar-item.is-active,\n    .navbar.is-danger .navbar-brand .navbar-link:hover,\n    .navbar.is-danger .navbar-brand .navbar-link.is-active {\n      background-color: #ff1f4b;\n      color: #fff; }\n    .navbar.is-danger .navbar-brand .navbar-link::after {\n      border-color: #fff; }\n    .navbar.is-danger .navbar-burger {\n      color: #fff; }\n    @media screen and (min-width: 1088px) {\n      .navbar.is-danger .navbar-start > .navbar-item,\n      .navbar.is-danger .navbar-start .navbar-link,\n      .navbar.is-danger .navbar-end > .navbar-item,\n      .navbar.is-danger .navbar-end .navbar-link {\n        color: #fff; }\n      .navbar.is-danger .navbar-start > a.navbar-item:hover, .navbar.is-danger .navbar-start > a.navbar-item.is-active,\n      .navbar.is-danger .navbar-start .navbar-link:hover,\n      .navbar.is-danger .navbar-start .navbar-link.is-active,\n      .navbar.is-danger .navbar-end > a.navbar-item:hover,\n      .navbar.is-danger .navbar-end > a.navbar-item.is-active,\n      .navbar.is-danger .navbar-end .navbar-link:hover,\n      .navbar.is-danger .navbar-end .navbar-link.is-active {\n        background-color: #ff1f4b;\n        color: #fff; }\n      .navbar.is-danger .navbar-start .navbar-link::after,\n      .navbar.is-danger .navbar-end .navbar-link::after {\n        border-color: #fff; }\n      .navbar.is-danger .navbar-item.has-dropdown:hover .navbar-link,\n      .navbar.is-danger .navbar-item.has-dropdown.is-active .navbar-link {\n        background-color: #ff1f4b;\n        color: #fff; }\n      .navbar.is-danger .navbar-dropdown a.navbar-item.is-active {\n        background-color: #ff3860;\n        color: #fff; } }\n  .navbar > .container {\n    align-items: stretch;\n    display: flex;\n    min-height: 3.25rem;\n    width: 100%; }\n  .navbar.has-shadow {\n    box-shadow: 0 2px 0 0 whitesmoke; }\n  .navbar.is-fixed-bottom, .navbar.is-fixed-top {\n    left: 0;\n    position: fixed;\n    right: 0;\n    z-index: 30; }\n  .navbar.is-fixed-bottom {\n    bottom: 0; }\n    .navbar.is-fixed-bottom.has-shadow {\n      box-shadow: 0 -2px 0 0 whitesmoke; }\n  .navbar.is-fixed-top {\n    top: 0; }\n\nhtml.has-navbar-fixed-top,\nbody.has-navbar-fixed-top {\n  padding-top: 3.25rem; }\n\nhtml.has-navbar-fixed-bottom,\nbody.has-navbar-fixed-bottom {\n  padding-bottom: 3.25rem; }\n\n.navbar-brand,\n.navbar-tabs {\n  align-items: stretch;\n  display: flex;\n  flex-shrink: 0;\n  min-height: 3.25rem; }\n\n.navbar-brand a.navbar-item:hover {\n  background-color: transparent; }\n\n.navbar-tabs {\n  -webkit-overflow-scrolling: touch;\n  max-width: 100vw;\n  overflow-x: auto;\n  overflow-y: hidden; }\n\n.navbar-burger {\n  color: #4a4a4a;\n  cursor: pointer;\n  display: block;\n  height: 3.25rem;\n  position: relative;\n  width: 3.25rem;\n  margin-left: auto; }\n  .navbar-burger span {\n    background-color: currentColor;\n    display: block;\n    height: 1px;\n    left: calc(50% - 8px);\n    position: absolute;\n    transform-origin: center;\n    transition-duration: 86ms;\n    transition-property: background-color, opacity, transform;\n    transition-timing-function: ease-out;\n    width: 16px; }\n    .navbar-burger span:nth-child(1) {\n      top: calc(50% - 6px); }\n    .navbar-burger span:nth-child(2) {\n      top: calc(50% - 1px); }\n    .navbar-burger span:nth-child(3) {\n      top: calc(50% + 4px); }\n  .navbar-burger:hover {\n    background-color: rgba(0, 0, 0, 0.05); }\n  .navbar-burger.is-active span:nth-child(1) {\n    transform: translateY(5px) rotate(45deg); }\n  .navbar-burger.is-active span:nth-child(2) {\n    opacity: 0; }\n  .navbar-burger.is-active span:nth-child(3) {\n    transform: translateY(-5px) rotate(-45deg); }\n\n.navbar-menu {\n  display: none; }\n\n.navbar-item,\n.navbar-link {\n  color: #4a4a4a;\n  display: block;\n  line-height: 1.5;\n  padding: 0.5rem 0.75rem;\n  position: relative; }\n  .navbar-item .icon:only-child,\n  .navbar-link .icon:only-child {\n    margin-left: -0.25rem;\n    margin-right: -0.25rem; }\n\na.navbar-item,\n.navbar-link {\n  cursor: pointer; }\n  a.navbar-item:hover, a.navbar-item.is-active,\n  .navbar-link:hover,\n  .navbar-link.is-active {\n    background-color: #fafafa;\n    color: #3273dc; }\n\n.navbar-item {\n  display: block;\n  flex-grow: 0;\n  flex-shrink: 0; }\n  .navbar-item img {\n    max-height: 1.75rem; }\n  .navbar-item.has-dropdown {\n    padding: 0; }\n  .navbar-item.is-expanded {\n    flex-grow: 1;\n    flex-shrink: 1; }\n  .navbar-item.is-tab {\n    border-bottom: 1px solid transparent;\n    min-height: 3.25rem;\n    padding-bottom: calc(0.5rem - 1px); }\n    .navbar-item.is-tab:hover {\n      background-color: transparent;\n      border-bottom-color: #3273dc; }\n    .navbar-item.is-tab.is-active {\n      background-color: transparent;\n      border-bottom-color: #3273dc;\n      border-bottom-style: solid;\n      border-bottom-width: 3px;\n      color: #3273dc;\n      padding-bottom: calc(0.5rem - 3px); }\n\n.navbar-content {\n  flex-grow: 1;\n  flex-shrink: 1; }\n\n.navbar-link:not(.is-arrowless) {\n  padding-right: 2.5em; }\n  .navbar-link:not(.is-arrowless)::after {\n    border-color: #3273dc;\n    margin-top: -0.375em;\n    right: 1.125em; }\n\n.navbar-dropdown {\n  font-size: 0.875rem;\n  padding-bottom: 0.5rem;\n  padding-top: 0.5rem; }\n  .navbar-dropdown .navbar-item {\n    padding-left: 1.5rem;\n    padding-right: 1.5rem; }\n\n.navbar-divider {\n  background-color: whitesmoke;\n  border: none;\n  display: none;\n  height: 2px;\n  margin: 0.5rem 0; }\n\n@media screen and (max-width: 1087px) {\n  .navbar > .container {\n    display: block; }\n  .navbar-brand .navbar-item,\n  .navbar-tabs .navbar-item {\n    align-items: center;\n    display: flex; }\n  .navbar-link::after {\n    display: none; }\n  .navbar-menu {\n    background-color: white;\n    box-shadow: 0 8px 16px rgba(10, 10, 10, 0.1);\n    padding: 0.5rem 0; }\n    .navbar-menu.is-active {\n      display: block; }\n  .navbar.is-fixed-bottom-touch, .navbar.is-fixed-top-touch {\n    left: 0;\n    position: fixed;\n    right: 0;\n    z-index: 30; }\n  .navbar.is-fixed-bottom-touch {\n    bottom: 0; }\n    .navbar.is-fixed-bottom-touch.has-shadow {\n      box-shadow: 0 -2px 3px rgba(10, 10, 10, 0.1); }\n  .navbar.is-fixed-top-touch {\n    top: 0; }\n  .navbar.is-fixed-top .navbar-menu, .navbar.is-fixed-top-touch .navbar-menu {\n    -webkit-overflow-scrolling: touch;\n    max-height: calc(100vh - 3.25rem);\n    overflow: auto; }\n  html.has-navbar-fixed-top-touch,\n  body.has-navbar-fixed-top-touch {\n    padding-top: 3.25rem; }\n  html.has-navbar-fixed-bottom-touch,\n  body.has-navbar-fixed-bottom-touch {\n    padding-bottom: 3.25rem; } }\n\n@media screen and (min-width: 1088px) {\n  .navbar,\n  .navbar-menu,\n  .navbar-start,\n  .navbar-end {\n    align-items: stretch;\n    display: flex; }\n  .navbar {\n    min-height: 3.25rem; }\n    .navbar.is-spaced {\n      padding: 1rem 2rem; }\n      .navbar.is-spaced .navbar-start,\n      .navbar.is-spaced .navbar-end {\n        align-items: center; }\n      .navbar.is-spaced a.navbar-item,\n      .navbar.is-spaced .navbar-link {\n        border-radius: 4px; }\n    .navbar.is-transparent a.navbar-item:hover, .navbar.is-transparent a.navbar-item.is-active,\n    .navbar.is-transparent .navbar-link:hover,\n    .navbar.is-transparent .navbar-link.is-active {\n      background-color: transparent !important; }\n    .navbar.is-transparent .navbar-item.has-dropdown.is-active .navbar-link, .navbar.is-transparent .navbar-item.has-dropdown.is-hoverable:hover .navbar-link {\n      background-color: transparent !important; }\n    .navbar.is-transparent .navbar-dropdown a.navbar-item:hover {\n      background-color: whitesmoke;\n      color: #0a0a0a; }\n    .navbar.is-transparent .navbar-dropdown a.navbar-item.is-active {\n      background-color: whitesmoke;\n      color: #3273dc; }\n  .navbar-burger {\n    display: none; }\n  .navbar-item,\n  .navbar-link {\n    align-items: center;\n    display: flex; }\n  .navbar-item {\n    display: flex; }\n    .navbar-item.has-dropdown {\n      align-items: stretch; }\n    .navbar-item.has-dropdown-up .navbar-link::after {\n      transform: rotate(135deg) translate(0.25em, -0.25em); }\n    .navbar-item.has-dropdown-up .navbar-dropdown {\n      border-bottom: 2px solid #dbdbdb;\n      border-radius: 6px 6px 0 0;\n      border-top: none;\n      bottom: 100%;\n      box-shadow: 0 -8px 8px rgba(10, 10, 10, 0.1);\n      top: auto; }\n    .navbar-item.is-active .navbar-dropdown, .navbar-item.is-hoverable:hover .navbar-dropdown {\n      display: block; }\n      .navbar.is-spaced .navbar-item.is-active .navbar-dropdown, .navbar-item.is-active .navbar-dropdown.is-boxed, .navbar.is-spaced .navbar-item.is-hoverable:hover .navbar-dropdown, .navbar-item.is-hoverable:hover .navbar-dropdown.is-boxed {\n        opacity: 1;\n        pointer-events: auto;\n        transform: translateY(0); }\n  .navbar-menu {\n    flex-grow: 1;\n    flex-shrink: 0; }\n  .navbar-start {\n    justify-content: flex-start;\n    margin-right: auto; }\n  .navbar-end {\n    justify-content: flex-end;\n    margin-left: auto; }\n  .navbar-dropdown {\n    background-color: white;\n    border-bottom-left-radius: 6px;\n    border-bottom-right-radius: 6px;\n    border-top: 2px solid #dbdbdb;\n    box-shadow: 0 8px 8px rgba(10, 10, 10, 0.1);\n    display: none;\n    font-size: 0.875rem;\n    left: 0;\n    min-width: 100%;\n    position: absolute;\n    top: 100%;\n    z-index: 20; }\n    .navbar-dropdown .navbar-item {\n      padding: 0.375rem 1rem;\n      white-space: nowrap; }\n    .navbar-dropdown a.navbar-item {\n      padding-right: 3rem; }\n      .navbar-dropdown a.navbar-item:hover {\n        background-color: whitesmoke;\n        color: #0a0a0a; }\n      .navbar-dropdown a.navbar-item.is-active {\n        background-color: whitesmoke;\n        color: #3273dc; }\n    .navbar.is-spaced .navbar-dropdown, .navbar-dropdown.is-boxed {\n      border-radius: 6px;\n      border-top: none;\n      box-shadow: 0 8px 8px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);\n      display: block;\n      opacity: 0;\n      pointer-events: none;\n      top: calc(100% + (-4px));\n      transform: translateY(-5px);\n      transition-duration: 86ms;\n      transition-property: opacity, transform; }\n    .navbar-dropdown.is-right {\n      left: auto;\n      right: 0; }\n  .navbar-divider {\n    display: block; }\n  .navbar > .container .navbar-brand,\n  .container > .navbar .navbar-brand {\n    margin-left: -.75rem; }\n  .navbar > .container .navbar-menu,\n  .container > .navbar .navbar-menu {\n    margin-right: -.75rem; }\n  .navbar.is-fixed-bottom-desktop, .navbar.is-fixed-top-desktop {\n    left: 0;\n    position: fixed;\n    right: 0;\n    z-index: 30; }\n  .navbar.is-fixed-bottom-desktop {\n    bottom: 0; }\n    .navbar.is-fixed-bottom-desktop.has-shadow {\n      box-shadow: 0 -2px 3px rgba(10, 10, 10, 0.1); }\n  .navbar.is-fixed-top-desktop {\n    top: 0; }\n  html.has-navbar-fixed-top-desktop,\n  body.has-navbar-fixed-top-desktop {\n    padding-top: 3.25rem; }\n  html.has-navbar-fixed-bottom-desktop,\n  body.has-navbar-fixed-bottom-desktop {\n    padding-bottom: 3.25rem; }\n  html.has-spaced-navbar-fixed-top,\n  body.has-spaced-navbar-fixed-top {\n    padding-top: 5.25rem; }\n  html.has-spaced-navbar-fixed-bottom,\n  body.has-spaced-navbar-fixed-bottom {\n    padding-bottom: 5.25rem; }\n  a.navbar-item.is-active,\n  .navbar-link.is-active {\n    color: #0a0a0a; }\n  a.navbar-item.is-active:not(:hover),\n  .navbar-link.is-active:not(:hover) {\n    background-color: transparent; }\n  .navbar-item.has-dropdown:hover .navbar-link, .navbar-item.has-dropdown.is-active .navbar-link {\n    background-color: #fafafa; } }\n\n.pagination {\n  font-size: 1rem;\n  margin: -0.25rem; }\n  .pagination.is-small {\n    font-size: 0.75rem; }\n  .pagination.is-medium {\n    font-size: 1.25rem; }\n  .pagination.is-large {\n    font-size: 1.5rem; }\n  .pagination.is-rounded .pagination-previous,\n  .pagination.is-rounded .pagination-next {\n    padding-left: 1em;\n    padding-right: 1em;\n    border-radius: 290486px; }\n  .pagination.is-rounded .pagination-link {\n    border-radius: 290486px; }\n\n.pagination,\n.pagination-list {\n  align-items: center;\n  display: flex;\n  justify-content: center;\n  text-align: center; }\n\n.pagination-previous,\n.pagination-next,\n.pagination-link,\n.pagination-ellipsis {\n  font-size: 1em;\n  padding-left: 0.5em;\n  padding-right: 0.5em;\n  justify-content: center;\n  margin: 0.25rem;\n  text-align: center; }\n\n.pagination-previous,\n.pagination-next,\n.pagination-link {\n  border-color: #dbdbdb;\n  color: #363636;\n  min-width: 2.25em; }\n  .pagination-previous:hover,\n  .pagination-next:hover,\n  .pagination-link:hover {\n    border-color: #b5b5b5;\n    color: #363636; }\n  .pagination-previous:focus,\n  .pagination-next:focus,\n  .pagination-link:focus {\n    border-color: #3273dc; }\n  .pagination-previous:active,\n  .pagination-next:active,\n  .pagination-link:active {\n    box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2); }\n  .pagination-previous[disabled],\n  .pagination-next[disabled],\n  .pagination-link[disabled] {\n    background-color: #dbdbdb;\n    border-color: #dbdbdb;\n    box-shadow: none;\n    color: #7a7a7a;\n    opacity: 0.5; }\n\n.pagination-previous,\n.pagination-next {\n  padding-left: 0.75em;\n  padding-right: 0.75em;\n  white-space: nowrap; }\n\n.pagination-link.is-current {\n  background-color: #3273dc;\n  border-color: #3273dc;\n  color: #fff; }\n\n.pagination-ellipsis {\n  color: #b5b5b5;\n  pointer-events: none; }\n\n.pagination-list {\n  flex-wrap: wrap; }\n\n@media screen and (max-width: 768px) {\n  .pagination {\n    flex-wrap: wrap; }\n  .pagination-previous,\n  .pagination-next {\n    flex-grow: 1;\n    flex-shrink: 1; }\n  .pagination-list li {\n    flex-grow: 1;\n    flex-shrink: 1; } }\n\n@media screen and (min-width: 769px), print {\n  .pagination-list {\n    flex-grow: 1;\n    flex-shrink: 1;\n    justify-content: flex-start;\n    order: 1; }\n  .pagination-previous {\n    order: 2; }\n  .pagination-next {\n    order: 3; }\n  .pagination {\n    justify-content: space-between; }\n    .pagination.is-centered .pagination-previous {\n      order: 1; }\n    .pagination.is-centered .pagination-list {\n      justify-content: center;\n      order: 2; }\n    .pagination.is-centered .pagination-next {\n      order: 3; }\n    .pagination.is-right .pagination-previous {\n      order: 1; }\n    .pagination.is-right .pagination-next {\n      order: 2; }\n    .pagination.is-right .pagination-list {\n      justify-content: flex-end;\n      order: 3; } }\n\n.panel {\n  font-size: 1rem; }\n  .panel:not(:last-child) {\n    margin-bottom: 1.5rem; }\n\n.panel-heading,\n.panel-tabs,\n.panel-block {\n  border-bottom: 1px solid #dbdbdb;\n  border-left: 1px solid #dbdbdb;\n  border-right: 1px solid #dbdbdb; }\n  .panel-heading:first-child,\n  .panel-tabs:first-child,\n  .panel-block:first-child {\n    border-top: 1px solid #dbdbdb; }\n\n.panel-heading {\n  background-color: whitesmoke;\n  border-radius: 4px 4px 0 0;\n  color: #363636;\n  font-size: 1.25em;\n  font-weight: 300;\n  line-height: 1.25;\n  padding: 0.5em 0.75em; }\n\n.panel-tabs {\n  align-items: flex-end;\n  display: flex;\n  font-size: 0.875em;\n  justify-content: center; }\n  .panel-tabs a {\n    border-bottom: 1px solid #dbdbdb;\n    margin-bottom: -1px;\n    padding: 0.5em; }\n    .panel-tabs a.is-active {\n      border-bottom-color: #4a4a4a;\n      color: #363636; }\n\n.panel-list a {\n  color: #4a4a4a; }\n  .panel-list a:hover {\n    color: #3273dc; }\n\n.panel-block {\n  align-items: center;\n  color: #363636;\n  display: flex;\n  justify-content: flex-start;\n  padding: 0.5em 0.75em; }\n  .panel-block input[type=\"checkbox\"] {\n    margin-right: 0.75em; }\n  .panel-block > .control {\n    flex-grow: 1;\n    flex-shrink: 1;\n    width: 100%; }\n  .panel-block.is-wrapped {\n    flex-wrap: wrap; }\n  .panel-block.is-active {\n    border-left-color: #3273dc;\n    color: #363636; }\n    .panel-block.is-active .panel-icon {\n      color: #3273dc; }\n\na.panel-block,\nlabel.panel-block {\n  cursor: pointer; }\n  a.panel-block:hover,\n  label.panel-block:hover {\n    background-color: whitesmoke; }\n\n.panel-icon {\n  display: inline-block;\n  font-size: 14px;\n  height: 1em;\n  line-height: 1em;\n  text-align: center;\n  vertical-align: top;\n  width: 1em;\n  color: #7a7a7a;\n  margin-right: 0.75em; }\n  .panel-icon .fa {\n    font-size: inherit;\n    line-height: inherit; }\n\n.tabs {\n  -webkit-overflow-scrolling: touch;\n  align-items: stretch;\n  display: flex;\n  font-size: 1rem;\n  justify-content: space-between;\n  overflow: hidden;\n  overflow-x: auto;\n  white-space: nowrap; }\n  .tabs a {\n    align-items: center;\n    border-bottom-color: #dbdbdb;\n    border-bottom-style: solid;\n    border-bottom-width: 1px;\n    color: #4a4a4a;\n    display: flex;\n    justify-content: center;\n    margin-bottom: -1px;\n    padding: 0.5em 1em;\n    vertical-align: top; }\n    .tabs a:hover {\n      border-bottom-color: #363636;\n      color: #363636; }\n  .tabs li {\n    display: block; }\n    .tabs li.is-active a {\n      border-bottom-color: #3273dc;\n      color: #3273dc; }\n  .tabs ul {\n    align-items: center;\n    border-bottom-color: #dbdbdb;\n    border-bottom-style: solid;\n    border-bottom-width: 1px;\n    display: flex;\n    flex-grow: 1;\n    flex-shrink: 0;\n    justify-content: flex-start; }\n    .tabs ul.is-left {\n      padding-right: 0.75em; }\n    .tabs ul.is-center {\n      flex: none;\n      justify-content: center;\n      padding-left: 0.75em;\n      padding-right: 0.75em; }\n    .tabs ul.is-right {\n      justify-content: flex-end;\n      padding-left: 0.75em; }\n  .tabs .icon:first-child {\n    margin-right: 0.5em; }\n  .tabs .icon:last-child {\n    margin-left: 0.5em; }\n  .tabs.is-centered ul {\n    justify-content: center; }\n  .tabs.is-right ul {\n    justify-content: flex-end; }\n  .tabs.is-boxed a {\n    border: 1px solid transparent;\n    border-radius: 4px 4px 0 0; }\n    .tabs.is-boxed a:hover {\n      background-color: whitesmoke;\n      border-bottom-color: #dbdbdb; }\n  .tabs.is-boxed li.is-active a {\n    background-color: white;\n    border-color: #dbdbdb;\n    border-bottom-color: transparent !important; }\n  .tabs.is-fullwidth li {\n    flex-grow: 1;\n    flex-shrink: 0; }\n  .tabs.is-toggle a {\n    border-color: #dbdbdb;\n    border-style: solid;\n    border-width: 1px;\n    margin-bottom: 0;\n    position: relative; }\n    .tabs.is-toggle a:hover {\n      background-color: whitesmoke;\n      border-color: #b5b5b5;\n      z-index: 2; }\n  .tabs.is-toggle li + li {\n    margin-left: -1px; }\n  .tabs.is-toggle li:first-child a {\n    border-radius: 4px 0 0 4px; }\n  .tabs.is-toggle li:last-child a {\n    border-radius: 0 4px 4px 0; }\n  .tabs.is-toggle li.is-active a {\n    background-color: #3273dc;\n    border-color: #3273dc;\n    color: #fff;\n    z-index: 1; }\n  .tabs.is-toggle ul {\n    border-bottom: none; }\n  .tabs.is-toggle.is-toggle-rounded li:first-child a {\n    border-bottom-left-radius: 290486px;\n    border-top-left-radius: 290486px;\n    padding-left: 1.25em; }\n  .tabs.is-toggle.is-toggle-rounded li:last-child a {\n    border-bottom-right-radius: 290486px;\n    border-top-right-radius: 290486px;\n    padding-right: 1.25em; }\n  .tabs.is-small {\n    font-size: 0.75rem; }\n  .tabs.is-medium {\n    font-size: 1.25rem; }\n  .tabs.is-large {\n    font-size: 1.5rem; }\n\n.column {\n  display: block;\n  flex-basis: 0;\n  flex-grow: 1;\n  flex-shrink: 1;\n  padding: 0.75rem; }\n  .columns.is-mobile > .column.is-narrow {\n    flex: none; }\n  .columns.is-mobile > .column.is-full {\n    flex: none;\n    width: 100%; }\n  .columns.is-mobile > .column.is-three-quarters {\n    flex: none;\n    width: 75%; }\n  .columns.is-mobile > .column.is-two-thirds {\n    flex: none;\n    width: 66.6666%; }\n  .columns.is-mobile > .column.is-half {\n    flex: none;\n    width: 50%; }\n  .columns.is-mobile > .column.is-one-third {\n    flex: none;\n    width: 33.3333%; }\n  .columns.is-mobile > .column.is-one-quarter {\n    flex: none;\n    width: 25%; }\n  .columns.is-mobile > .column.is-one-fifth {\n    flex: none;\n    width: 20%; }\n  .columns.is-mobile > .column.is-two-fifths {\n    flex: none;\n    width: 40%; }\n  .columns.is-mobile > .column.is-three-fifths {\n    flex: none;\n    width: 60%; }\n  .columns.is-mobile > .column.is-four-fifths {\n    flex: none;\n    width: 80%; }\n  .columns.is-mobile > .column.is-offset-three-quarters {\n    margin-left: 75%; }\n  .columns.is-mobile > .column.is-offset-two-thirds {\n    margin-left: 66.6666%; }\n  .columns.is-mobile > .column.is-offset-half {\n    margin-left: 50%; }\n  .columns.is-mobile > .column.is-offset-one-third {\n    margin-left: 33.3333%; }\n  .columns.is-mobile > .column.is-offset-one-quarter {\n    margin-left: 25%; }\n  .columns.is-mobile > .column.is-offset-one-fifth {\n    margin-left: 20%; }\n  .columns.is-mobile > .column.is-offset-two-fifths {\n    margin-left: 40%; }\n  .columns.is-mobile > .column.is-offset-three-fifths {\n    margin-left: 60%; }\n  .columns.is-mobile > .column.is-offset-four-fifths {\n    margin-left: 80%; }\n  .columns.is-mobile > .column.is-1 {\n    flex: none;\n    width: 8.33333%; }\n  .columns.is-mobile > .column.is-offset-1 {\n    margin-left: 8.33333%; }\n  .columns.is-mobile > .column.is-2 {\n    flex: none;\n    width: 16.66667%; }\n  .columns.is-mobile > .column.is-offset-2 {\n    margin-left: 16.66667%; }\n  .columns.is-mobile > .column.is-3 {\n    flex: none;\n    width: 25%; }\n  .columns.is-mobile > .column.is-offset-3 {\n    margin-left: 25%; }\n  .columns.is-mobile > .column.is-4 {\n    flex: none;\n    width: 33.33333%; }\n  .columns.is-mobile > .column.is-offset-4 {\n    margin-left: 33.33333%; }\n  .columns.is-mobile > .column.is-5 {\n    flex: none;\n    width: 41.66667%; }\n  .columns.is-mobile > .column.is-offset-5 {\n    margin-left: 41.66667%; }\n  .columns.is-mobile > .column.is-6 {\n    flex: none;\n    width: 50%; }\n  .columns.is-mobile > .column.is-offset-6 {\n    margin-left: 50%; }\n  .columns.is-mobile > .column.is-7 {\n    flex: none;\n    width: 58.33333%; }\n  .columns.is-mobile > .column.is-offset-7 {\n    margin-left: 58.33333%; }\n  .columns.is-mobile > .column.is-8 {\n    flex: none;\n    width: 66.66667%; }\n  .columns.is-mobile > .column.is-offset-8 {\n    margin-left: 66.66667%; }\n  .columns.is-mobile > .column.is-9 {\n    flex: none;\n    width: 75%; }\n  .columns.is-mobile > .column.is-offset-9 {\n    margin-left: 75%; }\n  .columns.is-mobile > .column.is-10 {\n    flex: none;\n    width: 83.33333%; }\n  .columns.is-mobile > .column.is-offset-10 {\n    margin-left: 83.33333%; }\n  .columns.is-mobile > .column.is-11 {\n    flex: none;\n    width: 91.66667%; }\n  .columns.is-mobile > .column.is-offset-11 {\n    margin-left: 91.66667%; }\n  .columns.is-mobile > .column.is-12 {\n    flex: none;\n    width: 100%; }\n  .columns.is-mobile > .column.is-offset-12 {\n    margin-left: 100%; }\n  @media screen and (max-width: 768px) {\n    .column.is-narrow-mobile {\n      flex: none; }\n    .column.is-full-mobile {\n      flex: none;\n      width: 100%; }\n    .column.is-three-quarters-mobile {\n      flex: none;\n      width: 75%; }\n    .column.is-two-thirds-mobile {\n      flex: none;\n      width: 66.6666%; }\n    .column.is-half-mobile {\n      flex: none;\n      width: 50%; }\n    .column.is-one-third-mobile {\n      flex: none;\n      width: 33.3333%; }\n    .column.is-one-quarter-mobile {\n      flex: none;\n      width: 25%; }\n    .column.is-one-fifth-mobile {\n      flex: none;\n      width: 20%; }\n    .column.is-two-fifths-mobile {\n      flex: none;\n      width: 40%; }\n    .column.is-three-fifths-mobile {\n      flex: none;\n      width: 60%; }\n    .column.is-four-fifths-mobile {\n      flex: none;\n      width: 80%; }\n    .column.is-offset-three-quarters-mobile {\n      margin-left: 75%; }\n    .column.is-offset-two-thirds-mobile {\n      margin-left: 66.6666%; }\n    .column.is-offset-half-mobile {\n      margin-left: 50%; }\n    .column.is-offset-one-third-mobile {\n      margin-left: 33.3333%; }\n    .column.is-offset-one-quarter-mobile {\n      margin-left: 25%; }\n    .column.is-offset-one-fifth-mobile {\n      margin-left: 20%; }\n    .column.is-offset-two-fifths-mobile {\n      margin-left: 40%; }\n    .column.is-offset-three-fifths-mobile {\n      margin-left: 60%; }\n    .column.is-offset-four-fifths-mobile {\n      margin-left: 80%; }\n    .column.is-1-mobile {\n      flex: none;\n      width: 8.33333%; }\n    .column.is-offset-1-mobile {\n      margin-left: 8.33333%; }\n    .column.is-2-mobile {\n      flex: none;\n      width: 16.66667%; }\n    .column.is-offset-2-mobile {\n      margin-left: 16.66667%; }\n    .column.is-3-mobile {\n      flex: none;\n      width: 25%; }\n    .column.is-offset-3-mobile {\n      margin-left: 25%; }\n    .column.is-4-mobile {\n      flex: none;\n      width: 33.33333%; }\n    .column.is-offset-4-mobile {\n      margin-left: 33.33333%; }\n    .column.is-5-mobile {\n      flex: none;\n      width: 41.66667%; }\n    .column.is-offset-5-mobile {\n      margin-left: 41.66667%; }\n    .column.is-6-mobile {\n      flex: none;\n      width: 50%; }\n    .column.is-offset-6-mobile {\n      margin-left: 50%; }\n    .column.is-7-mobile {\n      flex: none;\n      width: 58.33333%; }\n    .column.is-offset-7-mobile {\n      margin-left: 58.33333%; }\n    .column.is-8-mobile {\n      flex: none;\n      width: 66.66667%; }\n    .column.is-offset-8-mobile {\n      margin-left: 66.66667%; }\n    .column.is-9-mobile {\n      flex: none;\n      width: 75%; }\n    .column.is-offset-9-mobile {\n      margin-left: 75%; }\n    .column.is-10-mobile {\n      flex: none;\n      width: 83.33333%; }\n    .column.is-offset-10-mobile {\n      margin-left: 83.33333%; }\n    .column.is-11-mobile {\n      flex: none;\n      width: 91.66667%; }\n    .column.is-offset-11-mobile {\n      margin-left: 91.66667%; }\n    .column.is-12-mobile {\n      flex: none;\n      width: 100%; }\n    .column.is-offset-12-mobile {\n      margin-left: 100%; } }\n  @media screen and (min-width: 769px), print {\n    .column.is-narrow, .column.is-narrow-tablet {\n      flex: none; }\n    .column.is-full, .column.is-full-tablet {\n      flex: none;\n      width: 100%; }\n    .column.is-three-quarters, .column.is-three-quarters-tablet {\n      flex: none;\n      width: 75%; }\n    .column.is-two-thirds, .column.is-two-thirds-tablet {\n      flex: none;\n      width: 66.6666%; }\n    .column.is-half, .column.is-half-tablet {\n      flex: none;\n      width: 50%; }\n    .column.is-one-third, .column.is-one-third-tablet {\n      flex: none;\n      width: 33.3333%; }\n    .column.is-one-quarter, .column.is-one-quarter-tablet {\n      flex: none;\n      width: 25%; }\n    .column.is-one-fifth, .column.is-one-fifth-tablet {\n      flex: none;\n      width: 20%; }\n    .column.is-two-fifths, .column.is-two-fifths-tablet {\n      flex: none;\n      width: 40%; }\n    .column.is-three-fifths, .column.is-three-fifths-tablet {\n      flex: none;\n      width: 60%; }\n    .column.is-four-fifths, .column.is-four-fifths-tablet {\n      flex: none;\n      width: 80%; }\n    .column.is-offset-three-quarters, .column.is-offset-three-quarters-tablet {\n      margin-left: 75%; }\n    .column.is-offset-two-thirds, .column.is-offset-two-thirds-tablet {\n      margin-left: 66.6666%; }\n    .column.is-offset-half, .column.is-offset-half-tablet {\n      margin-left: 50%; }\n    .column.is-offset-one-third, .column.is-offset-one-third-tablet {\n      margin-left: 33.3333%; }\n    .column.is-offset-one-quarter, .column.is-offset-one-quarter-tablet {\n      margin-left: 25%; }\n    .column.is-offset-one-fifth, .column.is-offset-one-fifth-tablet {\n      margin-left: 20%; }\n    .column.is-offset-two-fifths, .column.is-offset-two-fifths-tablet {\n      margin-left: 40%; }\n    .column.is-offset-three-fifths, .column.is-offset-three-fifths-tablet {\n      margin-left: 60%; }\n    .column.is-offset-four-fifths, .column.is-offset-four-fifths-tablet {\n      margin-left: 80%; }\n    .column.is-1, .column.is-1-tablet {\n      flex: none;\n      width: 8.33333%; }\n    .column.is-offset-1, .column.is-offset-1-tablet {\n      margin-left: 8.33333%; }\n    .column.is-2, .column.is-2-tablet {\n      flex: none;\n      width: 16.66667%; }\n    .column.is-offset-2, .column.is-offset-2-tablet {\n      margin-left: 16.66667%; }\n    .column.is-3, .column.is-3-tablet {\n      flex: none;\n      width: 25%; }\n    .column.is-offset-3, .column.is-offset-3-tablet {\n      margin-left: 25%; }\n    .column.is-4, .column.is-4-tablet {\n      flex: none;\n      width: 33.33333%; }\n    .column.is-offset-4, .column.is-offset-4-tablet {\n      margin-left: 33.33333%; }\n    .column.is-5, .column.is-5-tablet {\n      flex: none;\n      width: 41.66667%; }\n    .column.is-offset-5, .column.is-offset-5-tablet {\n      margin-left: 41.66667%; }\n    .column.is-6, .column.is-6-tablet {\n      flex: none;\n      width: 50%; }\n    .column.is-offset-6, .column.is-offset-6-tablet {\n      margin-left: 50%; }\n    .column.is-7, .column.is-7-tablet {\n      flex: none;\n      width: 58.33333%; }\n    .column.is-offset-7, .column.is-offset-7-tablet {\n      margin-left: 58.33333%; }\n    .column.is-8, .column.is-8-tablet {\n      flex: none;\n      width: 66.66667%; }\n    .column.is-offset-8, .column.is-offset-8-tablet {\n      margin-left: 66.66667%; }\n    .column.is-9, .column.is-9-tablet {\n      flex: none;\n      width: 75%; }\n    .column.is-offset-9, .column.is-offset-9-tablet {\n      margin-left: 75%; }\n    .column.is-10, .column.is-10-tablet {\n      flex: none;\n      width: 83.33333%; }\n    .column.is-offset-10, .column.is-offset-10-tablet {\n      margin-left: 83.33333%; }\n    .column.is-11, .column.is-11-tablet {\n      flex: none;\n      width: 91.66667%; }\n    .column.is-offset-11, .column.is-offset-11-tablet {\n      margin-left: 91.66667%; }\n    .column.is-12, .column.is-12-tablet {\n      flex: none;\n      width: 100%; }\n    .column.is-offset-12, .column.is-offset-12-tablet {\n      margin-left: 100%; } }\n  @media screen and (max-width: 1087px) {\n    .column.is-narrow-touch {\n      flex: none; }\n    .column.is-full-touch {\n      flex: none;\n      width: 100%; }\n    .column.is-three-quarters-touch {\n      flex: none;\n      width: 75%; }\n    .column.is-two-thirds-touch {\n      flex: none;\n      width: 66.6666%; }\n    .column.is-half-touch {\n      flex: none;\n      width: 50%; }\n    .column.is-one-third-touch {\n      flex: none;\n      width: 33.3333%; }\n    .column.is-one-quarter-touch {\n      flex: none;\n      width: 25%; }\n    .column.is-one-fifth-touch {\n      flex: none;\n      width: 20%; }\n    .column.is-two-fifths-touch {\n      flex: none;\n      width: 40%; }\n    .column.is-three-fifths-touch {\n      flex: none;\n      width: 60%; }\n    .column.is-four-fifths-touch {\n      flex: none;\n      width: 80%; }\n    .column.is-offset-three-quarters-touch {\n      margin-left: 75%; }\n    .column.is-offset-two-thirds-touch {\n      margin-left: 66.6666%; }\n    .column.is-offset-half-touch {\n      margin-left: 50%; }\n    .column.is-offset-one-third-touch {\n      margin-left: 33.3333%; }\n    .column.is-offset-one-quarter-touch {\n      margin-left: 25%; }\n    .column.is-offset-one-fifth-touch {\n      margin-left: 20%; }\n    .column.is-offset-two-fifths-touch {\n      margin-left: 40%; }\n    .column.is-offset-three-fifths-touch {\n      margin-left: 60%; }\n    .column.is-offset-four-fifths-touch {\n      margin-left: 80%; }\n    .column.is-1-touch {\n      flex: none;\n      width: 8.33333%; }\n    .column.is-offset-1-touch {\n      margin-left: 8.33333%; }\n    .column.is-2-touch {\n      flex: none;\n      width: 16.66667%; }\n    .column.is-offset-2-touch {\n      margin-left: 16.66667%; }\n    .column.is-3-touch {\n      flex: none;\n      width: 25%; }\n    .column.is-offset-3-touch {\n      margin-left: 25%; }\n    .column.is-4-touch {\n      flex: none;\n      width: 33.33333%; }\n    .column.is-offset-4-touch {\n      margin-left: 33.33333%; }\n    .column.is-5-touch {\n      flex: none;\n      width: 41.66667%; }\n    .column.is-offset-5-touch {\n      margin-left: 41.66667%; }\n    .column.is-6-touch {\n      flex: none;\n      width: 50%; }\n    .column.is-offset-6-touch {\n      margin-left: 50%; }\n    .column.is-7-touch {\n      flex: none;\n      width: 58.33333%; }\n    .column.is-offset-7-touch {\n      margin-left: 58.33333%; }\n    .column.is-8-touch {\n      flex: none;\n      width: 66.66667%; }\n    .column.is-offset-8-touch {\n      margin-left: 66.66667%; }\n    .column.is-9-touch {\n      flex: none;\n      width: 75%; }\n    .column.is-offset-9-touch {\n      margin-left: 75%; }\n    .column.is-10-touch {\n      flex: none;\n      width: 83.33333%; }\n    .column.is-offset-10-touch {\n      margin-left: 83.33333%; }\n    .column.is-11-touch {\n      flex: none;\n      width: 91.66667%; }\n    .column.is-offset-11-touch {\n      margin-left: 91.66667%; }\n    .column.is-12-touch {\n      flex: none;\n      width: 100%; }\n    .column.is-offset-12-touch {\n      margin-left: 100%; } }\n  @media screen and (min-width: 1088px) {\n    .column.is-narrow-desktop {\n      flex: none; }\n    .column.is-full-desktop {\n      flex: none;\n      width: 100%; }\n    .column.is-three-quarters-desktop {\n      flex: none;\n      width: 75%; }\n    .column.is-two-thirds-desktop {\n      flex: none;\n      width: 66.6666%; }\n    .column.is-half-desktop {\n      flex: none;\n      width: 50%; }\n    .column.is-one-third-desktop {\n      flex: none;\n      width: 33.3333%; }\n    .column.is-one-quarter-desktop {\n      flex: none;\n      width: 25%; }\n    .column.is-one-fifth-desktop {\n      flex: none;\n      width: 20%; }\n    .column.is-two-fifths-desktop {\n      flex: none;\n      width: 40%; }\n    .column.is-three-fifths-desktop {\n      flex: none;\n      width: 60%; }\n    .column.is-four-fifths-desktop {\n      flex: none;\n      width: 80%; }\n    .column.is-offset-three-quarters-desktop {\n      margin-left: 75%; }\n    .column.is-offset-two-thirds-desktop {\n      margin-left: 66.6666%; }\n    .column.is-offset-half-desktop {\n      margin-left: 50%; }\n    .column.is-offset-one-third-desktop {\n      margin-left: 33.3333%; }\n    .column.is-offset-one-quarter-desktop {\n      margin-left: 25%; }\n    .column.is-offset-one-fifth-desktop {\n      margin-left: 20%; }\n    .column.is-offset-two-fifths-desktop {\n      margin-left: 40%; }\n    .column.is-offset-three-fifths-desktop {\n      margin-left: 60%; }\n    .column.is-offset-four-fifths-desktop {\n      margin-left: 80%; }\n    .column.is-1-desktop {\n      flex: none;\n      width: 8.33333%; }\n    .column.is-offset-1-desktop {\n      margin-left: 8.33333%; }\n    .column.is-2-desktop {\n      flex: none;\n      width: 16.66667%; }\n    .column.is-offset-2-desktop {\n      margin-left: 16.66667%; }\n    .column.is-3-desktop {\n      flex: none;\n      width: 25%; }\n    .column.is-offset-3-desktop {\n      margin-left: 25%; }\n    .column.is-4-desktop {\n      flex: none;\n      width: 33.33333%; }\n    .column.is-offset-4-desktop {\n      margin-left: 33.33333%; }\n    .column.is-5-desktop {\n      flex: none;\n      width: 41.66667%; }\n    .column.is-offset-5-desktop {\n      margin-left: 41.66667%; }\n    .column.is-6-desktop {\n      flex: none;\n      width: 50%; }\n    .column.is-offset-6-desktop {\n      margin-left: 50%; }\n    .column.is-7-desktop {\n      flex: none;\n      width: 58.33333%; }\n    .column.is-offset-7-desktop {\n      margin-left: 58.33333%; }\n    .column.is-8-desktop {\n      flex: none;\n      width: 66.66667%; }\n    .column.is-offset-8-desktop {\n      margin-left: 66.66667%; }\n    .column.is-9-desktop {\n      flex: none;\n      width: 75%; }\n    .column.is-offset-9-desktop {\n      margin-left: 75%; }\n    .column.is-10-desktop {\n      flex: none;\n      width: 83.33333%; }\n    .column.is-offset-10-desktop {\n      margin-left: 83.33333%; }\n    .column.is-11-desktop {\n      flex: none;\n      width: 91.66667%; }\n    .column.is-offset-11-desktop {\n      margin-left: 91.66667%; }\n    .column.is-12-desktop {\n      flex: none;\n      width: 100%; }\n    .column.is-offset-12-desktop {\n      margin-left: 100%; } }\n  @media screen and (min-width: 1280px) {\n    .column.is-narrow-widescreen {\n      flex: none; }\n    .column.is-full-widescreen {\n      flex: none;\n      width: 100%; }\n    .column.is-three-quarters-widescreen {\n      flex: none;\n      width: 75%; }\n    .column.is-two-thirds-widescreen {\n      flex: none;\n      width: 66.6666%; }\n    .column.is-half-widescreen {\n      flex: none;\n      width: 50%; }\n    .column.is-one-third-widescreen {\n      flex: none;\n      width: 33.3333%; }\n    .column.is-one-quarter-widescreen {\n      flex: none;\n      width: 25%; }\n    .column.is-one-fifth-widescreen {\n      flex: none;\n      width: 20%; }\n    .column.is-two-fifths-widescreen {\n      flex: none;\n      width: 40%; }\n    .column.is-three-fifths-widescreen {\n      flex: none;\n      width: 60%; }\n    .column.is-four-fifths-widescreen {\n      flex: none;\n      width: 80%; }\n    .column.is-offset-three-quarters-widescreen {\n      margin-left: 75%; }\n    .column.is-offset-two-thirds-widescreen {\n      margin-left: 66.6666%; }\n    .column.is-offset-half-widescreen {\n      margin-left: 50%; }\n    .column.is-offset-one-third-widescreen {\n      margin-left: 33.3333%; }\n    .column.is-offset-one-quarter-widescreen {\n      margin-left: 25%; }\n    .column.is-offset-one-fifth-widescreen {\n      margin-left: 20%; }\n    .column.is-offset-two-fifths-widescreen {\n      margin-left: 40%; }\n    .column.is-offset-three-fifths-widescreen {\n      margin-left: 60%; }\n    .column.is-offset-four-fifths-widescreen {\n      margin-left: 80%; }\n    .column.is-1-widescreen {\n      flex: none;\n      width: 8.33333%; }\n    .column.is-offset-1-widescreen {\n      margin-left: 8.33333%; }\n    .column.is-2-widescreen {\n      flex: none;\n      width: 16.66667%; }\n    .column.is-offset-2-widescreen {\n      margin-left: 16.66667%; }\n    .column.is-3-widescreen {\n      flex: none;\n      width: 25%; }\n    .column.is-offset-3-widescreen {\n      margin-left: 25%; }\n    .column.is-4-widescreen {\n      flex: none;\n      width: 33.33333%; }\n    .column.is-offset-4-widescreen {\n      margin-left: 33.33333%; }\n    .column.is-5-widescreen {\n      flex: none;\n      width: 41.66667%; }\n    .column.is-offset-5-widescreen {\n      margin-left: 41.66667%; }\n    .column.is-6-widescreen {\n      flex: none;\n      width: 50%; }\n    .column.is-offset-6-widescreen {\n      margin-left: 50%; }\n    .column.is-7-widescreen {\n      flex: none;\n      width: 58.33333%; }\n    .column.is-offset-7-widescreen {\n      margin-left: 58.33333%; }\n    .column.is-8-widescreen {\n      flex: none;\n      width: 66.66667%; }\n    .column.is-offset-8-widescreen {\n      margin-left: 66.66667%; }\n    .column.is-9-widescreen {\n      flex: none;\n      width: 75%; }\n    .column.is-offset-9-widescreen {\n      margin-left: 75%; }\n    .column.is-10-widescreen {\n      flex: none;\n      width: 83.33333%; }\n    .column.is-offset-10-widescreen {\n      margin-left: 83.33333%; }\n    .column.is-11-widescreen {\n      flex: none;\n      width: 91.66667%; }\n    .column.is-offset-11-widescreen {\n      margin-left: 91.66667%; }\n    .column.is-12-widescreen {\n      flex: none;\n      width: 100%; }\n    .column.is-offset-12-widescreen {\n      margin-left: 100%; } }\n  @media screen and (min-width: 1472px) {\n    .column.is-narrow-fullhd {\n      flex: none; }\n    .column.is-full-fullhd {\n      flex: none;\n      width: 100%; }\n    .column.is-three-quarters-fullhd {\n      flex: none;\n      width: 75%; }\n    .column.is-two-thirds-fullhd {\n      flex: none;\n      width: 66.6666%; }\n    .column.is-half-fullhd {\n      flex: none;\n      width: 50%; }\n    .column.is-one-third-fullhd {\n      flex: none;\n      width: 33.3333%; }\n    .column.is-one-quarter-fullhd {\n      flex: none;\n      width: 25%; }\n    .column.is-one-fifth-fullhd {\n      flex: none;\n      width: 20%; }\n    .column.is-two-fifths-fullhd {\n      flex: none;\n      width: 40%; }\n    .column.is-three-fifths-fullhd {\n      flex: none;\n      width: 60%; }\n    .column.is-four-fifths-fullhd {\n      flex: none;\n      width: 80%; }\n    .column.is-offset-three-quarters-fullhd {\n      margin-left: 75%; }\n    .column.is-offset-two-thirds-fullhd {\n      margin-left: 66.6666%; }\n    .column.is-offset-half-fullhd {\n      margin-left: 50%; }\n    .column.is-offset-one-third-fullhd {\n      margin-left: 33.3333%; }\n    .column.is-offset-one-quarter-fullhd {\n      margin-left: 25%; }\n    .column.is-offset-one-fifth-fullhd {\n      margin-left: 20%; }\n    .column.is-offset-two-fifths-fullhd {\n      margin-left: 40%; }\n    .column.is-offset-three-fifths-fullhd {\n      margin-left: 60%; }\n    .column.is-offset-four-fifths-fullhd {\n      margin-left: 80%; }\n    .column.is-1-fullhd {\n      flex: none;\n      width: 8.33333%; }\n    .column.is-offset-1-fullhd {\n      margin-left: 8.33333%; }\n    .column.is-2-fullhd {\n      flex: none;\n      width: 16.66667%; }\n    .column.is-offset-2-fullhd {\n      margin-left: 16.66667%; }\n    .column.is-3-fullhd {\n      flex: none;\n      width: 25%; }\n    .column.is-offset-3-fullhd {\n      margin-left: 25%; }\n    .column.is-4-fullhd {\n      flex: none;\n      width: 33.33333%; }\n    .column.is-offset-4-fullhd {\n      margin-left: 33.33333%; }\n    .column.is-5-fullhd {\n      flex: none;\n      width: 41.66667%; }\n    .column.is-offset-5-fullhd {\n      margin-left: 41.66667%; }\n    .column.is-6-fullhd {\n      flex: none;\n      width: 50%; }\n    .column.is-offset-6-fullhd {\n      margin-left: 50%; }\n    .column.is-7-fullhd {\n      flex: none;\n      width: 58.33333%; }\n    .column.is-offset-7-fullhd {\n      margin-left: 58.33333%; }\n    .column.is-8-fullhd {\n      flex: none;\n      width: 66.66667%; }\n    .column.is-offset-8-fullhd {\n      margin-left: 66.66667%; }\n    .column.is-9-fullhd {\n      flex: none;\n      width: 75%; }\n    .column.is-offset-9-fullhd {\n      margin-left: 75%; }\n    .column.is-10-fullhd {\n      flex: none;\n      width: 83.33333%; }\n    .column.is-offset-10-fullhd {\n      margin-left: 83.33333%; }\n    .column.is-11-fullhd {\n      flex: none;\n      width: 91.66667%; }\n    .column.is-offset-11-fullhd {\n      margin-left: 91.66667%; }\n    .column.is-12-fullhd {\n      flex: none;\n      width: 100%; }\n    .column.is-offset-12-fullhd {\n      margin-left: 100%; } }\n\n.columns {\n  margin-left: -0.75rem;\n  margin-right: -0.75rem;\n  margin-top: -0.75rem; }\n  .columns:last-child {\n    margin-bottom: -0.75rem; }\n  .columns:not(:last-child) {\n    margin-bottom: calc(1.5rem - 0.75rem); }\n  .columns.is-centered {\n    justify-content: center; }\n  .columns.is-gapless {\n    margin-left: 0;\n    margin-right: 0;\n    margin-top: 0; }\n    .columns.is-gapless > .column {\n      margin: 0;\n      padding: 0 !important; }\n    .columns.is-gapless:not(:last-child) {\n      margin-bottom: 1.5rem; }\n    .columns.is-gapless:last-child {\n      margin-bottom: 0; }\n  .columns.is-mobile {\n    display: flex; }\n  .columns.is-multiline {\n    flex-wrap: wrap; }\n  .columns.is-vcentered {\n    align-items: center; }\n  @media screen and (min-width: 769px), print {\n    .columns:not(.is-desktop) {\n      display: flex; } }\n  @media screen and (min-width: 1088px) {\n    .columns.is-desktop {\n      display: flex; } }\n\n.columns.is-variable {\n  --columnGap: 0.75rem;\n  margin-left: calc(-1 * var(--columnGap));\n  margin-right: calc(-1 * var(--columnGap)); }\n  .columns.is-variable .column {\n    padding-left: var(--columnGap);\n    padding-right: var(--columnGap); }\n  .columns.is-variable.is-0 {\n    --columnGap: 0rem; }\n  @media screen and (max-width: 768px) {\n    .columns.is-variable.is-0-mobile {\n      --columnGap: 0rem; } }\n  @media screen and (min-width: 769px), print {\n    .columns.is-variable.is-0-tablet {\n      --columnGap: 0rem; } }\n  @media screen and (min-width: 769px) and (max-width: 1087px) {\n    .columns.is-variable.is-0-tablet-only {\n      --columnGap: 0rem; } }\n  @media screen and (max-width: 1087px) {\n    .columns.is-variable.is-0-touch {\n      --columnGap: 0rem; } }\n  @media screen and (min-width: 1088px) {\n    .columns.is-variable.is-0-desktop {\n      --columnGap: 0rem; } }\n  @media screen and (min-width: 1088px) and (max-width: 1279px) {\n    .columns.is-variable.is-0-desktop-only {\n      --columnGap: 0rem; } }\n  @media screen and (min-width: 1280px) {\n    .columns.is-variable.is-0-widescreen {\n      --columnGap: 0rem; } }\n  @media screen and (min-width: 1280px) and (max-width: 1471px) {\n    .columns.is-variable.is-0-widescreen-only {\n      --columnGap: 0rem; } }\n  @media screen and (min-width: 1472px) {\n    .columns.is-variable.is-0-fullhd {\n      --columnGap: 0rem; } }\n  .columns.is-variable.is-1 {\n    --columnGap: 0.25rem; }\n  @media screen and (max-width: 768px) {\n    .columns.is-variable.is-1-mobile {\n      --columnGap: 0.25rem; } }\n  @media screen and (min-width: 769px), print {\n    .columns.is-variable.is-1-tablet {\n      --columnGap: 0.25rem; } }\n  @media screen and (min-width: 769px) and (max-width: 1087px) {\n    .columns.is-variable.is-1-tablet-only {\n      --columnGap: 0.25rem; } }\n  @media screen and (max-width: 1087px) {\n    .columns.is-variable.is-1-touch {\n      --columnGap: 0.25rem; } }\n  @media screen and (min-width: 1088px) {\n    .columns.is-variable.is-1-desktop {\n      --columnGap: 0.25rem; } }\n  @media screen and (min-width: 1088px) and (max-width: 1279px) {\n    .columns.is-variable.is-1-desktop-only {\n      --columnGap: 0.25rem; } }\n  @media screen and (min-width: 1280px) {\n    .columns.is-variable.is-1-widescreen {\n      --columnGap: 0.25rem; } }\n  @media screen and (min-width: 1280px) and (max-width: 1471px) {\n    .columns.is-variable.is-1-widescreen-only {\n      --columnGap: 0.25rem; } }\n  @media screen and (min-width: 1472px) {\n    .columns.is-variable.is-1-fullhd {\n      --columnGap: 0.25rem; } }\n  .columns.is-variable.is-2 {\n    --columnGap: 0.5rem; }\n  @media screen and (max-width: 768px) {\n    .columns.is-variable.is-2-mobile {\n      --columnGap: 0.5rem; } }\n  @media screen and (min-width: 769px), print {\n    .columns.is-variable.is-2-tablet {\n      --columnGap: 0.5rem; } }\n  @media screen and (min-width: 769px) and (max-width: 1087px) {\n    .columns.is-variable.is-2-tablet-only {\n      --columnGap: 0.5rem; } }\n  @media screen and (max-width: 1087px) {\n    .columns.is-variable.is-2-touch {\n      --columnGap: 0.5rem; } }\n  @media screen and (min-width: 1088px) {\n    .columns.is-variable.is-2-desktop {\n      --columnGap: 0.5rem; } }\n  @media screen and (min-width: 1088px) and (max-width: 1279px) {\n    .columns.is-variable.is-2-desktop-only {\n      --columnGap: 0.5rem; } }\n  @media screen and (min-width: 1280px) {\n    .columns.is-variable.is-2-widescreen {\n      --columnGap: 0.5rem; } }\n  @media screen and (min-width: 1280px) and (max-width: 1471px) {\n    .columns.is-variable.is-2-widescreen-only {\n      --columnGap: 0.5rem; } }\n  @media screen and (min-width: 1472px) {\n    .columns.is-variable.is-2-fullhd {\n      --columnGap: 0.5rem; } }\n  .columns.is-variable.is-3 {\n    --columnGap: 0.75rem; }\n  @media screen and (max-width: 768px) {\n    .columns.is-variable.is-3-mobile {\n      --columnGap: 0.75rem; } }\n  @media screen and (min-width: 769px), print {\n    .columns.is-variable.is-3-tablet {\n      --columnGap: 0.75rem; } }\n  @media screen and (min-width: 769px) and (max-width: 1087px) {\n    .columns.is-variable.is-3-tablet-only {\n      --columnGap: 0.75rem; } }\n  @media screen and (max-width: 1087px) {\n    .columns.is-variable.is-3-touch {\n      --columnGap: 0.75rem; } }\n  @media screen and (min-width: 1088px) {\n    .columns.is-variable.is-3-desktop {\n      --columnGap: 0.75rem; } }\n  @media screen and (min-width: 1088px) and (max-width: 1279px) {\n    .columns.is-variable.is-3-desktop-only {\n      --columnGap: 0.75rem; } }\n  @media screen and (min-width: 1280px) {\n    .columns.is-variable.is-3-widescreen {\n      --columnGap: 0.75rem; } }\n  @media screen and (min-width: 1280px) and (max-width: 1471px) {\n    .columns.is-variable.is-3-widescreen-only {\n      --columnGap: 0.75rem; } }\n  @media screen and (min-width: 1472px) {\n    .columns.is-variable.is-3-fullhd {\n      --columnGap: 0.75rem; } }\n  .columns.is-variable.is-4 {\n    --columnGap: 1rem; }\n  @media screen and (max-width: 768px) {\n    .columns.is-variable.is-4-mobile {\n      --columnGap: 1rem; } }\n  @media screen and (min-width: 769px), print {\n    .columns.is-variable.is-4-tablet {\n      --columnGap: 1rem; } }\n  @media screen and (min-width: 769px) and (max-width: 1087px) {\n    .columns.is-variable.is-4-tablet-only {\n      --columnGap: 1rem; } }\n  @media screen and (max-width: 1087px) {\n    .columns.is-variable.is-4-touch {\n      --columnGap: 1rem; } }\n  @media screen and (min-width: 1088px) {\n    .columns.is-variable.is-4-desktop {\n      --columnGap: 1rem; } }\n  @media screen and (min-width: 1088px) and (max-width: 1279px) {\n    .columns.is-variable.is-4-desktop-only {\n      --columnGap: 1rem; } }\n  @media screen and (min-width: 1280px) {\n    .columns.is-variable.is-4-widescreen {\n      --columnGap: 1rem; } }\n  @media screen and (min-width: 1280px) and (max-width: 1471px) {\n    .columns.is-variable.is-4-widescreen-only {\n      --columnGap: 1rem; } }\n  @media screen and (min-width: 1472px) {\n    .columns.is-variable.is-4-fullhd {\n      --columnGap: 1rem; } }\n  .columns.is-variable.is-5 {\n    --columnGap: 1.25rem; }\n  @media screen and (max-width: 768px) {\n    .columns.is-variable.is-5-mobile {\n      --columnGap: 1.25rem; } }\n  @media screen and (min-width: 769px), print {\n    .columns.is-variable.is-5-tablet {\n      --columnGap: 1.25rem; } }\n  @media screen and (min-width: 769px) and (max-width: 1087px) {\n    .columns.is-variable.is-5-tablet-only {\n      --columnGap: 1.25rem; } }\n  @media screen and (max-width: 1087px) {\n    .columns.is-variable.is-5-touch {\n      --columnGap: 1.25rem; } }\n  @media screen and (min-width: 1088px) {\n    .columns.is-variable.is-5-desktop {\n      --columnGap: 1.25rem; } }\n  @media screen and (min-width: 1088px) and (max-width: 1279px) {\n    .columns.is-variable.is-5-desktop-only {\n      --columnGap: 1.25rem; } }\n  @media screen and (min-width: 1280px) {\n    .columns.is-variable.is-5-widescreen {\n      --columnGap: 1.25rem; } }\n  @media screen and (min-width: 1280px) and (max-width: 1471px) {\n    .columns.is-variable.is-5-widescreen-only {\n      --columnGap: 1.25rem; } }\n  @media screen and (min-width: 1472px) {\n    .columns.is-variable.is-5-fullhd {\n      --columnGap: 1.25rem; } }\n  .columns.is-variable.is-6 {\n    --columnGap: 1.5rem; }\n  @media screen and (max-width: 768px) {\n    .columns.is-variable.is-6-mobile {\n      --columnGap: 1.5rem; } }\n  @media screen and (min-width: 769px), print {\n    .columns.is-variable.is-6-tablet {\n      --columnGap: 1.5rem; } }\n  @media screen and (min-width: 769px) and (max-width: 1087px) {\n    .columns.is-variable.is-6-tablet-only {\n      --columnGap: 1.5rem; } }\n  @media screen and (max-width: 1087px) {\n    .columns.is-variable.is-6-touch {\n      --columnGap: 1.5rem; } }\n  @media screen and (min-width: 1088px) {\n    .columns.is-variable.is-6-desktop {\n      --columnGap: 1.5rem; } }\n  @media screen and (min-width: 1088px) and (max-width: 1279px) {\n    .columns.is-variable.is-6-desktop-only {\n      --columnGap: 1.5rem; } }\n  @media screen and (min-width: 1280px) {\n    .columns.is-variable.is-6-widescreen {\n      --columnGap: 1.5rem; } }\n  @media screen and (min-width: 1280px) and (max-width: 1471px) {\n    .columns.is-variable.is-6-widescreen-only {\n      --columnGap: 1.5rem; } }\n  @media screen and (min-width: 1472px) {\n    .columns.is-variable.is-6-fullhd {\n      --columnGap: 1.5rem; } }\n  .columns.is-variable.is-7 {\n    --columnGap: 1.75rem; }\n  @media screen and (max-width: 768px) {\n    .columns.is-variable.is-7-mobile {\n      --columnGap: 1.75rem; } }\n  @media screen and (min-width: 769px), print {\n    .columns.is-variable.is-7-tablet {\n      --columnGap: 1.75rem; } }\n  @media screen and (min-width: 769px) and (max-width: 1087px) {\n    .columns.is-variable.is-7-tablet-only {\n      --columnGap: 1.75rem; } }\n  @media screen and (max-width: 1087px) {\n    .columns.is-variable.is-7-touch {\n      --columnGap: 1.75rem; } }\n  @media screen and (min-width: 1088px) {\n    .columns.is-variable.is-7-desktop {\n      --columnGap: 1.75rem; } }\n  @media screen and (min-width: 1088px) and (max-width: 1279px) {\n    .columns.is-variable.is-7-desktop-only {\n      --columnGap: 1.75rem; } }\n  @media screen and (min-width: 1280px) {\n    .columns.is-variable.is-7-widescreen {\n      --columnGap: 1.75rem; } }\n  @media screen and (min-width: 1280px) and (max-width: 1471px) {\n    .columns.is-variable.is-7-widescreen-only {\n      --columnGap: 1.75rem; } }\n  @media screen and (min-width: 1472px) {\n    .columns.is-variable.is-7-fullhd {\n      --columnGap: 1.75rem; } }\n  .columns.is-variable.is-8 {\n    --columnGap: 2rem; }\n  @media screen and (max-width: 768px) {\n    .columns.is-variable.is-8-mobile {\n      --columnGap: 2rem; } }\n  @media screen and (min-width: 769px), print {\n    .columns.is-variable.is-8-tablet {\n      --columnGap: 2rem; } }\n  @media screen and (min-width: 769px) and (max-width: 1087px) {\n    .columns.is-variable.is-8-tablet-only {\n      --columnGap: 2rem; } }\n  @media screen and (max-width: 1087px) {\n    .columns.is-variable.is-8-touch {\n      --columnGap: 2rem; } }\n  @media screen and (min-width: 1088px) {\n    .columns.is-variable.is-8-desktop {\n      --columnGap: 2rem; } }\n  @media screen and (min-width: 1088px) and (max-width: 1279px) {\n    .columns.is-variable.is-8-desktop-only {\n      --columnGap: 2rem; } }\n  @media screen and (min-width: 1280px) {\n    .columns.is-variable.is-8-widescreen {\n      --columnGap: 2rem; } }\n  @media screen and (min-width: 1280px) and (max-width: 1471px) {\n    .columns.is-variable.is-8-widescreen-only {\n      --columnGap: 2rem; } }\n  @media screen and (min-width: 1472px) {\n    .columns.is-variable.is-8-fullhd {\n      --columnGap: 2rem; } }\n\n.tile {\n  align-items: stretch;\n  display: block;\n  flex-basis: 0;\n  flex-grow: 1;\n  flex-shrink: 1;\n  min-height: min-content; }\n  .tile.is-ancestor {\n    margin-left: -0.75rem;\n    margin-right: -0.75rem;\n    margin-top: -0.75rem; }\n    .tile.is-ancestor:last-child {\n      margin-bottom: -0.75rem; }\n    .tile.is-ancestor:not(:last-child) {\n      margin-bottom: 0.75rem; }\n  .tile.is-child {\n    margin: 0 !important; }\n  .tile.is-parent {\n    padding: 0.75rem; }\n  .tile.is-vertical {\n    flex-direction: column; }\n    .tile.is-vertical > .tile.is-child:not(:last-child) {\n      margin-bottom: 1.5rem !important; }\n  @media screen and (min-width: 769px), print {\n    .tile:not(.is-child) {\n      display: flex; }\n    .tile.is-1 {\n      flex: none;\n      width: 8.33333%; }\n    .tile.is-2 {\n      flex: none;\n      width: 16.66667%; }\n    .tile.is-3 {\n      flex: none;\n      width: 25%; }\n    .tile.is-4 {\n      flex: none;\n      width: 33.33333%; }\n    .tile.is-5 {\n      flex: none;\n      width: 41.66667%; }\n    .tile.is-6 {\n      flex: none;\n      width: 50%; }\n    .tile.is-7 {\n      flex: none;\n      width: 58.33333%; }\n    .tile.is-8 {\n      flex: none;\n      width: 66.66667%; }\n    .tile.is-9 {\n      flex: none;\n      width: 75%; }\n    .tile.is-10 {\n      flex: none;\n      width: 83.33333%; }\n    .tile.is-11 {\n      flex: none;\n      width: 91.66667%; }\n    .tile.is-12 {\n      flex: none;\n      width: 100%; } }\n\n.hero {\n  align-items: stretch;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between; }\n  .hero .navbar {\n    background: none; }\n  .hero .tabs ul {\n    border-bottom: none; }\n  .hero.is-white {\n    background-color: white;\n    color: #0a0a0a; }\n    .hero.is-white a:not(.button):not(.dropdown-item):not(.tag),\n    .hero.is-white strong {\n      color: inherit; }\n    .hero.is-white .title {\n      color: #0a0a0a; }\n    .hero.is-white .subtitle {\n      color: rgba(10, 10, 10, 0.9); }\n      .hero.is-white .subtitle a:not(.button),\n      .hero.is-white .subtitle strong {\n        color: #0a0a0a; }\n    @media screen and (max-width: 1087px) {\n      .hero.is-white .navbar-menu {\n        background-color: white; } }\n    .hero.is-white .navbar-item,\n    .hero.is-white .navbar-link {\n      color: rgba(10, 10, 10, 0.7); }\n    .hero.is-white a.navbar-item:hover, .hero.is-white a.navbar-item.is-active,\n    .hero.is-white .navbar-link:hover,\n    .hero.is-white .navbar-link.is-active {\n      background-color: #f2f2f2;\n      color: #0a0a0a; }\n    .hero.is-white .tabs a {\n      color: #0a0a0a;\n      opacity: 0.9; }\n      .hero.is-white .tabs a:hover {\n        opacity: 1; }\n    .hero.is-white .tabs li.is-active a {\n      opacity: 1; }\n    .hero.is-white .tabs.is-boxed a, .hero.is-white .tabs.is-toggle a {\n      color: #0a0a0a; }\n      .hero.is-white .tabs.is-boxed a:hover, .hero.is-white .tabs.is-toggle a:hover {\n        background-color: rgba(10, 10, 10, 0.1); }\n    .hero.is-white .tabs.is-boxed li.is-active a, .hero.is-white .tabs.is-boxed li.is-active a:hover, .hero.is-white .tabs.is-toggle li.is-active a, .hero.is-white .tabs.is-toggle li.is-active a:hover {\n      background-color: #0a0a0a;\n      border-color: #0a0a0a;\n      color: white; }\n    .hero.is-white.is-bold {\n      background-image: linear-gradient(141deg, #e6e6e6 0%, white 71%, white 100%); }\n      @media screen and (max-width: 768px) {\n        .hero.is-white.is-bold .navbar-menu {\n          background-image: linear-gradient(141deg, #e6e6e6 0%, white 71%, white 100%); } }\n  .hero.is-black {\n    background-color: #0a0a0a;\n    color: white; }\n    .hero.is-black a:not(.button):not(.dropdown-item):not(.tag),\n    .hero.is-black strong {\n      color: inherit; }\n    .hero.is-black .title {\n      color: white; }\n    .hero.is-black .subtitle {\n      color: rgba(255, 255, 255, 0.9); }\n      .hero.is-black .subtitle a:not(.button),\n      .hero.is-black .subtitle strong {\n        color: white; }\n    @media screen and (max-width: 1087px) {\n      .hero.is-black .navbar-menu {\n        background-color: #0a0a0a; } }\n    .hero.is-black .navbar-item,\n    .hero.is-black .navbar-link {\n      color: rgba(255, 255, 255, 0.7); }\n    .hero.is-black a.navbar-item:hover, .hero.is-black a.navbar-item.is-active,\n    .hero.is-black .navbar-link:hover,\n    .hero.is-black .navbar-link.is-active {\n      background-color: black;\n      color: white; }\n    .hero.is-black .tabs a {\n      color: white;\n      opacity: 0.9; }\n      .hero.is-black .tabs a:hover {\n        opacity: 1; }\n    .hero.is-black .tabs li.is-active a {\n      opacity: 1; }\n    .hero.is-black .tabs.is-boxed a, .hero.is-black .tabs.is-toggle a {\n      color: white; }\n      .hero.is-black .tabs.is-boxed a:hover, .hero.is-black .tabs.is-toggle a:hover {\n        background-color: rgba(10, 10, 10, 0.1); }\n    .hero.is-black .tabs.is-boxed li.is-active a, .hero.is-black .tabs.is-boxed li.is-active a:hover, .hero.is-black .tabs.is-toggle li.is-active a, .hero.is-black .tabs.is-toggle li.is-active a:hover {\n      background-color: white;\n      border-color: white;\n      color: #0a0a0a; }\n    .hero.is-black.is-bold {\n      background-image: linear-gradient(141deg, black 0%, #0a0a0a 71%, #181616 100%); }\n      @media screen and (max-width: 768px) {\n        .hero.is-black.is-bold .navbar-menu {\n          background-image: linear-gradient(141deg, black 0%, #0a0a0a 71%, #181616 100%); } }\n  .hero.is-light {\n    background-color: whitesmoke;\n    color: #363636; }\n    .hero.is-light a:not(.button):not(.dropdown-item):not(.tag),\n    .hero.is-light strong {\n      color: inherit; }\n    .hero.is-light .title {\n      color: #363636; }\n    .hero.is-light .subtitle {\n      color: rgba(54, 54, 54, 0.9); }\n      .hero.is-light .subtitle a:not(.button),\n      .hero.is-light .subtitle strong {\n        color: #363636; }\n    @media screen and (max-width: 1087px) {\n      .hero.is-light .navbar-menu {\n        background-color: whitesmoke; } }\n    .hero.is-light .navbar-item,\n    .hero.is-light .navbar-link {\n      color: rgba(54, 54, 54, 0.7); }\n    .hero.is-light a.navbar-item:hover, .hero.is-light a.navbar-item.is-active,\n    .hero.is-light .navbar-link:hover,\n    .hero.is-light .navbar-link.is-active {\n      background-color: #e8e8e8;\n      color: #363636; }\n    .hero.is-light .tabs a {\n      color: #363636;\n      opacity: 0.9; }\n      .hero.is-light .tabs a:hover {\n        opacity: 1; }\n    .hero.is-light .tabs li.is-active a {\n      opacity: 1; }\n    .hero.is-light .tabs.is-boxed a, .hero.is-light .tabs.is-toggle a {\n      color: #363636; }\n      .hero.is-light .tabs.is-boxed a:hover, .hero.is-light .tabs.is-toggle a:hover {\n        background-color: rgba(10, 10, 10, 0.1); }\n    .hero.is-light .tabs.is-boxed li.is-active a, .hero.is-light .tabs.is-boxed li.is-active a:hover, .hero.is-light .tabs.is-toggle li.is-active a, .hero.is-light .tabs.is-toggle li.is-active a:hover {\n      background-color: #363636;\n      border-color: #363636;\n      color: whitesmoke; }\n    .hero.is-light.is-bold {\n      background-image: linear-gradient(141deg, #dfd8d9 0%, whitesmoke 71%, white 100%); }\n      @media screen and (max-width: 768px) {\n        .hero.is-light.is-bold .navbar-menu {\n          background-image: linear-gradient(141deg, #dfd8d9 0%, whitesmoke 71%, white 100%); } }\n  .hero.is-dark {\n    background-color: #363636;\n    color: whitesmoke; }\n    .hero.is-dark a:not(.button):not(.dropdown-item):not(.tag),\n    .hero.is-dark strong {\n      color: inherit; }\n    .hero.is-dark .title {\n      color: whitesmoke; }\n    .hero.is-dark .subtitle {\n      color: rgba(245, 245, 245, 0.9); }\n      .hero.is-dark .subtitle a:not(.button),\n      .hero.is-dark .subtitle strong {\n        color: whitesmoke; }\n    @media screen and (max-width: 1087px) {\n      .hero.is-dark .navbar-menu {\n        background-color: #363636; } }\n    .hero.is-dark .navbar-item,\n    .hero.is-dark .navbar-link {\n      color: rgba(245, 245, 245, 0.7); }\n    .hero.is-dark a.navbar-item:hover, .hero.is-dark a.navbar-item.is-active,\n    .hero.is-dark .navbar-link:hover,\n    .hero.is-dark .navbar-link.is-active {\n      background-color: #292929;\n      color: whitesmoke; }\n    .hero.is-dark .tabs a {\n      color: whitesmoke;\n      opacity: 0.9; }\n      .hero.is-dark .tabs a:hover {\n        opacity: 1; }\n    .hero.is-dark .tabs li.is-active a {\n      opacity: 1; }\n    .hero.is-dark .tabs.is-boxed a, .hero.is-dark .tabs.is-toggle a {\n      color: whitesmoke; }\n      .hero.is-dark .tabs.is-boxed a:hover, .hero.is-dark .tabs.is-toggle a:hover {\n        background-color: rgba(10, 10, 10, 0.1); }\n    .hero.is-dark .tabs.is-boxed li.is-active a, .hero.is-dark .tabs.is-boxed li.is-active a:hover, .hero.is-dark .tabs.is-toggle li.is-active a, .hero.is-dark .tabs.is-toggle li.is-active a:hover {\n      background-color: whitesmoke;\n      border-color: whitesmoke;\n      color: #363636; }\n    .hero.is-dark.is-bold {\n      background-image: linear-gradient(141deg, #1f191a 0%, #363636 71%, #46403f 100%); }\n      @media screen and (max-width: 768px) {\n        .hero.is-dark.is-bold .navbar-menu {\n          background-image: linear-gradient(141deg, #1f191a 0%, #363636 71%, #46403f 100%); } }\n  .hero.is-primary, /deep/ .hero.tagAreaClass, /deep/ .hero.deleteAreaClass, /deep/ .hero.deleteContentClass {\n    background-color: #00d1b2;\n    color: #fff; }\n    .hero.is-primary a:not(.button):not(.dropdown-item):not(.tag), /deep/ .hero.tagAreaClass a:not(.button):not(.dropdown-item):not(.tag), /deep/ .hero.deleteAreaClass a:not(.button):not(.dropdown-item):not(.tag), /deep/ .hero.deleteContentClass a:not(.button):not(.dropdown-item):not(.tag),\n    .hero.is-primary strong,\n    /deep/ .hero.tagAreaClass strong,\n    /deep/ .hero.deleteAreaClass strong,\n    /deep/ .hero.deleteContentClass strong {\n      color: inherit; }\n    .hero.is-primary .title, /deep/ .hero.tagAreaClass .title, /deep/ .hero.deleteAreaClass .title, /deep/ .hero.deleteContentClass .title {\n      color: #fff; }\n    .hero.is-primary .subtitle, /deep/ .hero.tagAreaClass .subtitle, /deep/ .hero.deleteAreaClass .subtitle, /deep/ .hero.deleteContentClass .subtitle {\n      color: rgba(255, 255, 255, 0.9); }\n      .hero.is-primary .subtitle a:not(.button), /deep/ .hero.tagAreaClass .subtitle a:not(.button), /deep/ .hero.deleteAreaClass .subtitle a:not(.button), /deep/ .hero.deleteContentClass .subtitle a:not(.button),\n      .hero.is-primary .subtitle strong,\n      /deep/ .hero.tagAreaClass .subtitle strong,\n      /deep/ .hero.deleteAreaClass .subtitle strong,\n      /deep/ .hero.deleteContentClass .subtitle strong {\n        color: #fff; }\n    @media screen and (max-width: 1087px) {\n      .hero.is-primary .navbar-menu, /deep/ .hero.tagAreaClass .navbar-menu, /deep/ .hero.deleteAreaClass .navbar-menu, /deep/ .hero.deleteContentClass .navbar-menu {\n        background-color: #00d1b2; } }\n    .hero.is-primary .navbar-item, /deep/ .hero.tagAreaClass .navbar-item, /deep/ .hero.deleteAreaClass .navbar-item, /deep/ .hero.deleteContentClass .navbar-item,\n    .hero.is-primary .navbar-link,\n    /deep/ .hero.tagAreaClass .navbar-link,\n    /deep/ .hero.deleteAreaClass .navbar-link,\n    /deep/ .hero.deleteContentClass .navbar-link {\n      color: rgba(255, 255, 255, 0.7); }\n    .hero.is-primary a.navbar-item:hover, /deep/ .hero.tagAreaClass a.navbar-item:hover, /deep/ .hero.deleteAreaClass a.navbar-item:hover, /deep/ .hero.deleteContentClass a.navbar-item:hover, .hero.is-primary a.navbar-item.is-active, /deep/ .hero.tagAreaClass a.navbar-item.is-active, /deep/ .hero.deleteAreaClass a.navbar-item.is-active, /deep/ .hero.deleteContentClass a.navbar-item.is-active,\n    .hero.is-primary .navbar-link:hover,\n    /deep/ .hero.tagAreaClass .navbar-link:hover,\n    /deep/ .hero.deleteAreaClass .navbar-link:hover,\n    /deep/ .hero.deleteContentClass .navbar-link:hover,\n    .hero.is-primary .navbar-link.is-active,\n    /deep/ .hero.tagAreaClass .navbar-link.is-active,\n    /deep/ .hero.deleteAreaClass .navbar-link.is-active,\n    /deep/ .hero.deleteContentClass .navbar-link.is-active {\n      background-color: #00b89c;\n      color: #fff; }\n    .hero.is-primary .tabs a, /deep/ .hero.tagAreaClass .tabs a, /deep/ .hero.deleteAreaClass .tabs a, /deep/ .hero.deleteContentClass .tabs a {\n      color: #fff;\n      opacity: 0.9; }\n      .hero.is-primary .tabs a:hover, /deep/ .hero.tagAreaClass .tabs a:hover, /deep/ .hero.deleteAreaClass .tabs a:hover, /deep/ .hero.deleteContentClass .tabs a:hover {\n        opacity: 1; }\n    .hero.is-primary .tabs li.is-active a, /deep/ .hero.tagAreaClass .tabs li.is-active a, /deep/ .hero.deleteAreaClass .tabs li.is-active a, /deep/ .hero.deleteContentClass .tabs li.is-active a {\n      opacity: 1; }\n    .hero.is-primary .tabs.is-boxed a, /deep/ .hero.tagAreaClass .tabs.is-boxed a, /deep/ .hero.deleteAreaClass .tabs.is-boxed a, /deep/ .hero.deleteContentClass .tabs.is-boxed a, .hero.is-primary .tabs.is-toggle a, /deep/ .hero.tagAreaClass .tabs.is-toggle a, /deep/ .hero.deleteAreaClass .tabs.is-toggle a, /deep/ .hero.deleteContentClass .tabs.is-toggle a {\n      color: #fff; }\n      .hero.is-primary .tabs.is-boxed a:hover, /deep/ .hero.tagAreaClass .tabs.is-boxed a:hover, /deep/ .hero.deleteAreaClass .tabs.is-boxed a:hover, /deep/ .hero.deleteContentClass .tabs.is-boxed a:hover, .hero.is-primary .tabs.is-toggle a:hover, /deep/ .hero.tagAreaClass .tabs.is-toggle a:hover, /deep/ .hero.deleteAreaClass .tabs.is-toggle a:hover, /deep/ .hero.deleteContentClass .tabs.is-toggle a:hover {\n        background-color: rgba(10, 10, 10, 0.1); }\n    .hero.is-primary .tabs.is-boxed li.is-active a, /deep/ .hero.tagAreaClass .tabs.is-boxed li.is-active a, /deep/ .hero.deleteAreaClass .tabs.is-boxed li.is-active a, /deep/ .hero.deleteContentClass .tabs.is-boxed li.is-active a, .hero.is-primary .tabs.is-boxed li.is-active a:hover, /deep/ .hero.tagAreaClass .tabs.is-boxed li.is-active a:hover, /deep/ .hero.deleteAreaClass .tabs.is-boxed li.is-active a:hover, /deep/ .hero.deleteContentClass .tabs.is-boxed li.is-active a:hover, .hero.is-primary .tabs.is-toggle li.is-active a, /deep/ .hero.tagAreaClass .tabs.is-toggle li.is-active a, /deep/ .hero.deleteAreaClass .tabs.is-toggle li.is-active a, /deep/ .hero.deleteContentClass .tabs.is-toggle li.is-active a, .hero.is-primary .tabs.is-toggle li.is-active a:hover, /deep/ .hero.tagAreaClass .tabs.is-toggle li.is-active a:hover, /deep/ .hero.deleteAreaClass .tabs.is-toggle li.is-active a:hover, /deep/ .hero.deleteContentClass .tabs.is-toggle li.is-active a:hover {\n      background-color: #fff;\n      border-color: #fff;\n      color: #00d1b2; }\n    .hero.is-primary.is-bold, /deep/ .hero.is-bold.tagAreaClass, /deep/ .hero.is-bold.deleteAreaClass, /deep/ .hero.is-bold.deleteContentClass {\n      background-image: linear-gradient(141deg, #009e6c 0%, #00d1b2 71%, #00e7eb 100%); }\n      @media screen and (max-width: 768px) {\n        .hero.is-primary.is-bold .navbar-menu, /deep/ .hero.is-bold.tagAreaClass .navbar-menu, /deep/ .hero.is-bold.deleteAreaClass .navbar-menu, /deep/ .hero.is-bold.deleteContentClass .navbar-menu {\n          background-image: linear-gradient(141deg, #009e6c 0%, #00d1b2 71%, #00e7eb 100%); } }\n  .hero.is-link {\n    background-color: #3273dc;\n    color: #fff; }\n    .hero.is-link a:not(.button):not(.dropdown-item):not(.tag),\n    .hero.is-link strong {\n      color: inherit; }\n    .hero.is-link .title {\n      color: #fff; }\n    .hero.is-link .subtitle {\n      color: rgba(255, 255, 255, 0.9); }\n      .hero.is-link .subtitle a:not(.button),\n      .hero.is-link .subtitle strong {\n        color: #fff; }\n    @media screen and (max-width: 1087px) {\n      .hero.is-link .navbar-menu {\n        background-color: #3273dc; } }\n    .hero.is-link .navbar-item,\n    .hero.is-link .navbar-link {\n      color: rgba(255, 255, 255, 0.7); }\n    .hero.is-link a.navbar-item:hover, .hero.is-link a.navbar-item.is-active,\n    .hero.is-link .navbar-link:hover,\n    .hero.is-link .navbar-link.is-active {\n      background-color: #2366d1;\n      color: #fff; }\n    .hero.is-link .tabs a {\n      color: #fff;\n      opacity: 0.9; }\n      .hero.is-link .tabs a:hover {\n        opacity: 1; }\n    .hero.is-link .tabs li.is-active a {\n      opacity: 1; }\n    .hero.is-link .tabs.is-boxed a, .hero.is-link .tabs.is-toggle a {\n      color: #fff; }\n      .hero.is-link .tabs.is-boxed a:hover, .hero.is-link .tabs.is-toggle a:hover {\n        background-color: rgba(10, 10, 10, 0.1); }\n    .hero.is-link .tabs.is-boxed li.is-active a, .hero.is-link .tabs.is-boxed li.is-active a:hover, .hero.is-link .tabs.is-toggle li.is-active a, .hero.is-link .tabs.is-toggle li.is-active a:hover {\n      background-color: #fff;\n      border-color: #fff;\n      color: #3273dc; }\n    .hero.is-link.is-bold {\n      background-image: linear-gradient(141deg, #1577c6 0%, #3273dc 71%, #4366e5 100%); }\n      @media screen and (max-width: 768px) {\n        .hero.is-link.is-bold .navbar-menu {\n          background-image: linear-gradient(141deg, #1577c6 0%, #3273dc 71%, #4366e5 100%); } }\n  .hero.is-info {\n    background-color: #209cee;\n    color: #fff; }\n    .hero.is-info a:not(.button):not(.dropdown-item):not(.tag),\n    .hero.is-info strong {\n      color: inherit; }\n    .hero.is-info .title {\n      color: #fff; }\n    .hero.is-info .subtitle {\n      color: rgba(255, 255, 255, 0.9); }\n      .hero.is-info .subtitle a:not(.button),\n      .hero.is-info .subtitle strong {\n        color: #fff; }\n    @media screen and (max-width: 1087px) {\n      .hero.is-info .navbar-menu {\n        background-color: #209cee; } }\n    .hero.is-info .navbar-item,\n    .hero.is-info .navbar-link {\n      color: rgba(255, 255, 255, 0.7); }\n    .hero.is-info a.navbar-item:hover, .hero.is-info a.navbar-item.is-active,\n    .hero.is-info .navbar-link:hover,\n    .hero.is-info .navbar-link.is-active {\n      background-color: #118fe4;\n      color: #fff; }\n    .hero.is-info .tabs a {\n      color: #fff;\n      opacity: 0.9; }\n      .hero.is-info .tabs a:hover {\n        opacity: 1; }\n    .hero.is-info .tabs li.is-active a {\n      opacity: 1; }\n    .hero.is-info .tabs.is-boxed a, .hero.is-info .tabs.is-toggle a {\n      color: #fff; }\n      .hero.is-info .tabs.is-boxed a:hover, .hero.is-info .tabs.is-toggle a:hover {\n        background-color: rgba(10, 10, 10, 0.1); }\n    .hero.is-info .tabs.is-boxed li.is-active a, .hero.is-info .tabs.is-boxed li.is-active a:hover, .hero.is-info .tabs.is-toggle li.is-active a, .hero.is-info .tabs.is-toggle li.is-active a:hover {\n      background-color: #fff;\n      border-color: #fff;\n      color: #209cee; }\n    .hero.is-info.is-bold {\n      background-image: linear-gradient(141deg, #04a6d7 0%, #209cee 71%, #3287f5 100%); }\n      @media screen and (max-width: 768px) {\n        .hero.is-info.is-bold .navbar-menu {\n          background-image: linear-gradient(141deg, #04a6d7 0%, #209cee 71%, #3287f5 100%); } }\n  .hero.is-success {\n    background-color: #23d160;\n    color: #fff; }\n    .hero.is-success a:not(.button):not(.dropdown-item):not(.tag),\n    .hero.is-success strong {\n      color: inherit; }\n    .hero.is-success .title {\n      color: #fff; }\n    .hero.is-success .subtitle {\n      color: rgba(255, 255, 255, 0.9); }\n      .hero.is-success .subtitle a:not(.button),\n      .hero.is-success .subtitle strong {\n        color: #fff; }\n    @media screen and (max-width: 1087px) {\n      .hero.is-success .navbar-menu {\n        background-color: #23d160; } }\n    .hero.is-success .navbar-item,\n    .hero.is-success .navbar-link {\n      color: rgba(255, 255, 255, 0.7); }\n    .hero.is-success a.navbar-item:hover, .hero.is-success a.navbar-item.is-active,\n    .hero.is-success .navbar-link:hover,\n    .hero.is-success .navbar-link.is-active {\n      background-color: #20bc56;\n      color: #fff; }\n    .hero.is-success .tabs a {\n      color: #fff;\n      opacity: 0.9; }\n      .hero.is-success .tabs a:hover {\n        opacity: 1; }\n    .hero.is-success .tabs li.is-active a {\n      opacity: 1; }\n    .hero.is-success .tabs.is-boxed a, .hero.is-success .tabs.is-toggle a {\n      color: #fff; }\n      .hero.is-success .tabs.is-boxed a:hover, .hero.is-success .tabs.is-toggle a:hover {\n        background-color: rgba(10, 10, 10, 0.1); }\n    .hero.is-success .tabs.is-boxed li.is-active a, .hero.is-success .tabs.is-boxed li.is-active a:hover, .hero.is-success .tabs.is-toggle li.is-active a, .hero.is-success .tabs.is-toggle li.is-active a:hover {\n      background-color: #fff;\n      border-color: #fff;\n      color: #23d160; }\n    .hero.is-success.is-bold {\n      background-image: linear-gradient(141deg, #12af2f 0%, #23d160 71%, #2ce28a 100%); }\n      @media screen and (max-width: 768px) {\n        .hero.is-success.is-bold .navbar-menu {\n          background-image: linear-gradient(141deg, #12af2f 0%, #23d160 71%, #2ce28a 100%); } }\n  .hero.is-warning {\n    background-color: #ffdd57;\n    color: rgba(0, 0, 0, 0.7); }\n    .hero.is-warning a:not(.button):not(.dropdown-item):not(.tag),\n    .hero.is-warning strong {\n      color: inherit; }\n    .hero.is-warning .title {\n      color: rgba(0, 0, 0, 0.7); }\n    .hero.is-warning .subtitle {\n      color: rgba(0, 0, 0, 0.9); }\n      .hero.is-warning .subtitle a:not(.button),\n      .hero.is-warning .subtitle strong {\n        color: rgba(0, 0, 0, 0.7); }\n    @media screen and (max-width: 1087px) {\n      .hero.is-warning .navbar-menu {\n        background-color: #ffdd57; } }\n    .hero.is-warning .navbar-item,\n    .hero.is-warning .navbar-link {\n      color: rgba(0, 0, 0, 0.7); }\n    .hero.is-warning a.navbar-item:hover, .hero.is-warning a.navbar-item.is-active,\n    .hero.is-warning .navbar-link:hover,\n    .hero.is-warning .navbar-link.is-active {\n      background-color: #ffd83d;\n      color: rgba(0, 0, 0, 0.7); }\n    .hero.is-warning .tabs a {\n      color: rgba(0, 0, 0, 0.7);\n      opacity: 0.9; }\n      .hero.is-warning .tabs a:hover {\n        opacity: 1; }\n    .hero.is-warning .tabs li.is-active a {\n      opacity: 1; }\n    .hero.is-warning .tabs.is-boxed a, .hero.is-warning .tabs.is-toggle a {\n      color: rgba(0, 0, 0, 0.7); }\n      .hero.is-warning .tabs.is-boxed a:hover, .hero.is-warning .tabs.is-toggle a:hover {\n        background-color: rgba(10, 10, 10, 0.1); }\n    .hero.is-warning .tabs.is-boxed li.is-active a, .hero.is-warning .tabs.is-boxed li.is-active a:hover, .hero.is-warning .tabs.is-toggle li.is-active a, .hero.is-warning .tabs.is-toggle li.is-active a:hover {\n      background-color: rgba(0, 0, 0, 0.7);\n      border-color: rgba(0, 0, 0, 0.7);\n      color: #ffdd57; }\n    .hero.is-warning.is-bold {\n      background-image: linear-gradient(141deg, #ffaf24 0%, #ffdd57 71%, #fffa70 100%); }\n      @media screen and (max-width: 768px) {\n        .hero.is-warning.is-bold .navbar-menu {\n          background-image: linear-gradient(141deg, #ffaf24 0%, #ffdd57 71%, #fffa70 100%); } }\n  .hero.is-danger {\n    background-color: #ff3860;\n    color: #fff; }\n    .hero.is-danger a:not(.button):not(.dropdown-item):not(.tag),\n    .hero.is-danger strong {\n      color: inherit; }\n    .hero.is-danger .title {\n      color: #fff; }\n    .hero.is-danger .subtitle {\n      color: rgba(255, 255, 255, 0.9); }\n      .hero.is-danger .subtitle a:not(.button),\n      .hero.is-danger .subtitle strong {\n        color: #fff; }\n    @media screen and (max-width: 1087px) {\n      .hero.is-danger .navbar-menu {\n        background-color: #ff3860; } }\n    .hero.is-danger .navbar-item,\n    .hero.is-danger .navbar-link {\n      color: rgba(255, 255, 255, 0.7); }\n    .hero.is-danger a.navbar-item:hover, .hero.is-danger a.navbar-item.is-active,\n    .hero.is-danger .navbar-link:hover,\n    .hero.is-danger .navbar-link.is-active {\n      background-color: #ff1f4b;\n      color: #fff; }\n    .hero.is-danger .tabs a {\n      color: #fff;\n      opacity: 0.9; }\n      .hero.is-danger .tabs a:hover {\n        opacity: 1; }\n    .hero.is-danger .tabs li.is-active a {\n      opacity: 1; }\n    .hero.is-danger .tabs.is-boxed a, .hero.is-danger .tabs.is-toggle a {\n      color: #fff; }\n      .hero.is-danger .tabs.is-boxed a:hover, .hero.is-danger .tabs.is-toggle a:hover {\n        background-color: rgba(10, 10, 10, 0.1); }\n    .hero.is-danger .tabs.is-boxed li.is-active a, .hero.is-danger .tabs.is-boxed li.is-active a:hover, .hero.is-danger .tabs.is-toggle li.is-active a, .hero.is-danger .tabs.is-toggle li.is-active a:hover {\n      background-color: #fff;\n      border-color: #fff;\n      color: #ff3860; }\n    .hero.is-danger.is-bold {\n      background-image: linear-gradient(141deg, #ff0561 0%, #ff3860 71%, #ff5257 100%); }\n      @media screen and (max-width: 768px) {\n        .hero.is-danger.is-bold .navbar-menu {\n          background-image: linear-gradient(141deg, #ff0561 0%, #ff3860 71%, #ff5257 100%); } }\n  .hero.is-small .hero-body {\n    padding-bottom: 1.5rem;\n    padding-top: 1.5rem; }\n  @media screen and (min-width: 769px), print {\n    .hero.is-medium .hero-body {\n      padding-bottom: 9rem;\n      padding-top: 9rem; } }\n  @media screen and (min-width: 769px), print {\n    .hero.is-large .hero-body {\n      padding-bottom: 18rem;\n      padding-top: 18rem; } }\n  .hero.is-halfheight .hero-body, .hero.is-fullheight .hero-body, .hero.is-fullheight-with-navbar .hero-body {\n    align-items: center;\n    display: flex; }\n    .hero.is-halfheight .hero-body > .container, .hero.is-fullheight .hero-body > .container, .hero.is-fullheight-with-navbar .hero-body > .container {\n      flex-grow: 1;\n      flex-shrink: 1; }\n  .hero.is-halfheight {\n    min-height: 50vh; }\n  .hero.is-fullheight {\n    min-height: 100vh; }\n  .hero.is-fullheight-with-navbar {\n    min-height: calc(100vh - 3.25rem); }\n\n.hero-video {\n  overflow: hidden; }\n  .hero-video video {\n    left: 50%;\n    min-height: 100%;\n    min-width: 100%;\n    position: absolute;\n    top: 50%;\n    transform: translate3d(-50%, -50%, 0); }\n  .hero-video.is-transparent {\n    opacity: 0.3; }\n  @media screen and (max-width: 768px) {\n    .hero-video {\n      display: none; } }\n\n.hero-buttons {\n  margin-top: 1.5rem; }\n  @media screen and (max-width: 768px) {\n    .hero-buttons .button {\n      display: flex; }\n      .hero-buttons .button:not(:last-child) {\n        margin-bottom: 0.75rem; } }\n  @media screen and (min-width: 769px), print {\n    .hero-buttons {\n      display: flex;\n      justify-content: center; }\n      .hero-buttons .button:not(:last-child) {\n        margin-right: 1.5rem; } }\n\n.hero-head,\n.hero-foot {\n  flex-grow: 0;\n  flex-shrink: 0; }\n\n.hero-body {\n  flex-grow: 1;\n  flex-shrink: 0;\n  padding: 3rem 1.5rem; }\n\n.section {\n  padding: 3rem 1.5rem; }\n  @media screen and (min-width: 1088px) {\n    .section.is-medium {\n      padding: 9rem 1.5rem; }\n    .section.is-large {\n      padding: 18rem 1.5rem; } }\n\n.footer {\n  background-color: #fafafa;\n  padding: 3rem 1.5rem 6rem; }\n\n/deep/ .tagAreaClass {\n  padding: 2px 4px 2px 4px;\n  margin: 2px 4px 2px 0px; }\n\n/deep/ .deleteAreaClass {\n  background-color: transparent;\n  border: none; }\n\n/deep/ .deleteContentClass {\n  color: white; }\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "span",
    [
      _c("tags", {
        attrs: {
          tags: _vm.tags,
          type: _vm.type,
          "event-hub": _vm.eventHub,
          tagAreaClass: _vm.tagAreaClass,
          tagContentClass: _vm.tagContentClass,
          deleteAreaClass: _vm.deleteAreaClass,
          deleteContentClass: _vm.deleteContentClass
        }
      }),
      _vm._v(" "),
      _c("input", {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.tag,
            expression: "tag"
          }
        ],
        attrs: { placeholder: "Add tags..." },
        domProps: { value: _vm.tag },
        on: {
          keyup: function($event) {
            if (
              !("button" in $event) &&
              _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
            ) {
              return null
            }
            return _vm.inputTagWithEmit($event)
          },
          input: function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.tag = $event.target.value
          }
        }
      })
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
    require("vue-hot-reload-api")      .rerender("data-v-4831c6fe", esExports)
  }
}

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__(14);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_472cff63_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__ = __webpack_require__(37);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(35)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-472cff63"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_472cff63_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__["a" /* default */],
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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(36);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("5e22eb3c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/css-loader/index.js?sourceMap!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-472cff63\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./App.vue", function() {
     var newContent = require("!!../node_modules/css-loader/index.js?sourceMap!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-472cff63\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./App.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(true);
// imports


// module
exports.push([module.i, "\n.tagEditorBulma[data-v-472cff63] {\n  border: gray;\n}\n", "", {"version":3,"sources":["/Users/fukudayukihiro/JavaScriptProjects/vue-tag-editor/demo/App.vue"],"names":[],"mappings":";AAiFA;EACA,aAAA;CACA","file":"App.vue","sourcesContent":["<template>\n  <span>\n    <div>\n      <h2>None Style</h2>\n      <span>\n        <span>\n          <tag-editor\n            :tags='tagLabels'\n            :type=\"'label'\"\n            @handler-after-input-tag='handlerAfterInputTag'\n            @handler-after-delete-tag='handlerAfterDeleteTag'\n          ></tag-editor>\n          <br/>\n          <!-- handler-after-click-tag is effective only when type === 'link' -->\n          <tag-editor\n            :tags='tagLinks'\n            :type=\"'link'\"\n            @handler-after-click-tag='handlerAfterClickTag'\n            @handler-after-input-tag='handlerAfterInputTag'\n            @handler-after-delete-tag='handlerAfterDeleteTag'\n          ></tag-editor>\n        </span>\n      </span>\n    </div>\n    <div>\n      <h2>Bulma</h2>\n      <span>\n        <span class=\"tagEditorBulma\">\n          <tag-editor-bulma\n            :tags='tagLabelsBulma'\n            :type=\"'label'\"\n            @handler-after-input-tag='handlerAfterInputTag'\n            @handler-after-delete-tag='handlerAfterDeleteTag'\n          ></tag-editor-bulma>\n          <br/>\n          <!-- handler-after-click-tag is effective only when type === 'link' -->\n          <tag-editor-bulma\n            :tags='tagLinksBulma'\n            :type=\"'link'\"\n            @handler-after-click-tag='handlerAfterClickTag'\n            @handler-after-input-tag='handlerAfterInputTag'\n            @handler-after-delete-tag='handlerAfterDeleteTag'\n          ></tag-editor-bulma>\n        </span>\n      </span>\n    </div>\n  </span>\n</template>\n\n<script>\nexport default {\n  data(){\n    return {\n      tagLabels: ['javascript', 'ruby'],\n      tagLinks:  ['javascript', 'ruby'],\n      tagLabelsBulma: ['javascript', 'ruby'],\n      tagLinksBulma:  ['javascript', 'ruby']\n    }\n  },\n  methods: {\n    // Only one argument\n    handlerAfterClickTag(tag){\n      alert(tag + ' is click!')\n    },\n    // Only two argument\n    handlerAfterInputTag(tag, isAddTag){\n      if (isAddTag === true) {\n        console.log(tag + ' is added!')\n      } else {\n        console.log(tag + ' isn\\'t added')\n      }\n    },\n    // Only one argument\n    handlerAfterDeleteTag(tag){\n      console.log(tag + ' is deleted!')\n    }\n  }\n}\n</script>\n\n<style scoped=\"true\">\n.tagEditorBulma {\n  border: gray;\n}\n</style>"],"sourceRoot":""}]);

// exports


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("span", [
    _c("div", [
      _c("h2", [_vm._v("None Style")]),
      _vm._v(" "),
      _c("span", [
        _c(
          "span",
          [
            _c("tag-editor", {
              attrs: { tags: _vm.tagLabels, type: "label" },
              on: {
                "handler-after-input-tag": _vm.handlerAfterInputTag,
                "handler-after-delete-tag": _vm.handlerAfterDeleteTag
              }
            }),
            _vm._v(" "),
            _c("br"),
            _vm._v(" "),
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
    ]),
    _vm._v(" "),
    _c("div", [
      _c("h2", [_vm._v("Bulma")]),
      _vm._v(" "),
      _c("span", [
        _c(
          "span",
          { staticClass: "tagEditorBulma" },
          [
            _c("tag-editor-bulma", {
              attrs: { tags: _vm.tagLabelsBulma, type: "label" },
              on: {
                "handler-after-input-tag": _vm.handlerAfterInputTag,
                "handler-after-delete-tag": _vm.handlerAfterDeleteTag
              }
            }),
            _vm._v(" "),
            _c("br"),
            _vm._v(" "),
            _c("tag-editor-bulma", {
              attrs: { tags: _vm.tagLinksBulma, type: "link" },
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
  ])
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