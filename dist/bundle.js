(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["api"] = factory();
	else
		root["api"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/axios/dist/browser/axios.cjs":
/*!***************************************************!*\
  !*** ./node_modules/axios/dist/browser/axios.cjs ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/*! Axios v1.9.0 Copyright (c) 2025 Matt Zabriskie and contributors */


function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}

// utils is a library of generic helper functions non-specific to axios

const {toString} = Object.prototype;
const {getPrototypeOf} = Object;
const {iterator, toStringTag} = Symbol;

const kindOf = (cache => thing => {
    const str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(Object.create(null));

const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type
};

const typeOfTest = type => thing => typeof thing === type;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 *
 * @returns {boolean} True if value is an Array, otherwise false
 */
const {isArray} = Array;

/**
 * Determine if a value is undefined
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if the value is undefined, otherwise false
 */
const isUndefined = typeOfTest('undefined');

/**
 * Determine if a value is a Buffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
const isArrayBuffer = kindOfTest('ArrayBuffer');


/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  let result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a String, otherwise false
 */
const isString = typeOfTest('string');

/**
 * Determine if a value is a Function
 *
 * @param {*} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
const isFunction = typeOfTest('function');

/**
 * Determine if a value is a Number
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Number, otherwise false
 */
const isNumber = typeOfTest('number');

/**
 * Determine if a value is an Object
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an Object, otherwise false
 */
const isObject = (thing) => thing !== null && typeof thing === 'object';

/**
 * Determine if a value is a Boolean
 *
 * @param {*} thing The value to test
 * @returns {boolean} True if value is a Boolean, otherwise false
 */
const isBoolean = thing => thing === true || thing === false;

/**
 * Determine if a value is a plain Object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a plain Object, otherwise false
 */
const isPlainObject = (val) => {
  if (kindOf(val) !== 'object') {
    return false;
  }

  const prototype = getPrototypeOf(val);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(toStringTag in val) && !(iterator in val);
};

/**
 * Determine if a value is a Date
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Date, otherwise false
 */
const isDate = kindOfTest('Date');

/**
 * Determine if a value is a File
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFile = kindOfTest('File');

/**
 * Determine if a value is a Blob
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Blob, otherwise false
 */
const isBlob = kindOfTest('Blob');

/**
 * Determine if a value is a FileList
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFileList = kindOfTest('FileList');

/**
 * Determine if a value is a Stream
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Stream, otherwise false
 */
const isStream = (val) => isObject(val) && isFunction(val.pipe);

/**
 * Determine if a value is a FormData
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an FormData, otherwise false
 */
const isFormData = (thing) => {
  let kind;
  return thing && (
    (typeof FormData === 'function' && thing instanceof FormData) || (
      isFunction(thing.append) && (
        (kind = kindOf(thing)) === 'formdata' ||
        // detect form-data instance
        (kind === 'object' && isFunction(thing.toString) && thing.toString() === '[object FormData]')
      )
    )
  )
};

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
const isURLSearchParams = kindOfTest('URLSearchParams');

const [isReadableStream, isRequest, isResponse, isHeaders] = ['ReadableStream', 'Request', 'Response', 'Headers'].map(kindOfTest);

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 *
 * @returns {String} The String freed of excess whitespace
 */
const trim = (str) => str.trim ?
  str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 *
 * @param {Boolean} [allOwnKeys = false]
 * @returns {any}
 */
function forEach(obj, fn, {allOwnKeys = false} = {}) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  let i;
  let l;

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;

    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}

function findKey(obj, key) {
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}

const _global = (() => {
  /*eslint no-undef:0*/
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : (typeof window !== 'undefined' ? window : __webpack_require__.g)
})();

const isContextDefined = (context) => !isUndefined(context) && context !== _global;

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 *
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  const {caseless} = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else {
      result[targetKey] = val;
    }
  };

  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 *
 * @param {Boolean} [allOwnKeys]
 * @returns {Object} The resulting value of object a
 */
const extend = (a, b, thisArg, {allOwnKeys}= {}) => {
  forEach(b, (val, key) => {
    if (thisArg && isFunction(val)) {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  }, {allOwnKeys});
  return a;
};

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 *
 * @returns {string} content value without BOM
 */
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
};

/**
 * Inherit the prototype methods from one constructor into another
 * @param {function} constructor
 * @param {function} superConstructor
 * @param {object} [props]
 * @param {object} [descriptors]
 *
 * @returns {void}
 */
const inherits = (constructor, superConstructor, props, descriptors) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, 'super', {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};

/**
 * Resolve object with deep prototype chain to a flat object
 * @param {Object} sourceObj source object
 * @param {Object} [destObj]
 * @param {Function|Boolean} [filter]
 * @param {Function} [propFilter]
 *
 * @returns {Object}
 */
const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};

  destObj = destObj || {};
  // eslint-disable-next-line no-eq-null,eqeqeq
  if (sourceObj == null) return destObj;

  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

  return destObj;
};

/**
 * Determines whether a string ends with the characters of a specified string
 *
 * @param {String} str
 * @param {String} searchString
 * @param {Number} [position= 0]
 *
 * @returns {boolean}
 */
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === undefined || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};


/**
 * Returns new array from array like object or null if failed
 *
 * @param {*} [thing]
 *
 * @returns {?Array}
 */
const toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i = thing.length;
  if (!isNumber(i)) return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
};

/**
 * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
 * thing passed in is an instance of Uint8Array
 *
 * @param {TypedArray}
 *
 * @returns {Array}
 */
// eslint-disable-next-line func-names
const isTypedArray = (TypedArray => {
  // eslint-disable-next-line func-names
  return thing => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));

/**
 * For each entry in the object, call the function with the key and value.
 *
 * @param {Object<any, any>} obj - The object to iterate over.
 * @param {Function} fn - The function to call for each entry.
 *
 * @returns {void}
 */
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[iterator];

  const _iterator = generator.call(obj);

  let result;

  while ((result = _iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};

/**
 * It takes a regular expression and a string, and returns an array of all the matches
 *
 * @param {string} regExp - The regular expression to match against.
 * @param {string} str - The string to search.
 *
 * @returns {Array<boolean>}
 */
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];

  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }

  return arr;
};

/* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */
const isHTMLForm = kindOfTest('HTMLFormElement');

const toCamelCase = str => {
  return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,
    function replacer(m, p1, p2) {
      return p1.toUpperCase() + p2;
    }
  );
};

/* Creating a function that will check if an object has a property. */
const hasOwnProperty = (({hasOwnProperty}) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);

/**
 * Determine if a value is a RegExp object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a RegExp object, otherwise false
 */
const isRegExp = kindOfTest('RegExp');

const reduceDescriptors = (obj, reducer) => {
  const descriptors = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};

  forEach(descriptors, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });

  Object.defineProperties(obj, reducedDescriptors);
};

/**
 * Makes all methods read-only
 * @param {Object} obj
 */

const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    // skip restricted props in strict mode
    if (isFunction(obj) && ['arguments', 'caller', 'callee'].indexOf(name) !== -1) {
      return false;
    }

    const value = obj[name];

    if (!isFunction(value)) return;

    descriptor.enumerable = false;

    if ('writable' in descriptor) {
      descriptor.writable = false;
      return;
    }

    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error('Can not rewrite read-only method \'' + name + '\'');
      };
    }
  });
};

const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};

  const define = (arr) => {
    arr.forEach(value => {
      obj[value] = true;
    });
  };

  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));

  return obj;
};

const noop = () => {};

const toFiniteNumber = (value, defaultValue) => {
  return value != null && Number.isFinite(value = +value) ? value : defaultValue;
};

/**
 * If the thing is a FormData object, return true, otherwise return false.
 *
 * @param {unknown} thing - The thing to check.
 *
 * @returns {boolean}
 */
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction(thing.append) && thing[toStringTag] === 'FormData' && thing[iterator]);
}

const toJSONObject = (obj) => {
  const stack = new Array(10);

  const visit = (source, i) => {

    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }

      if(!('toJSON' in source)) {
        stack[i] = source;
        const target = isArray(source) ? [] : {};

        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });

        stack[i] = undefined;

        return target;
      }
    }

    return source;
  };

  return visit(obj, 0);
};

const isAsyncFn = kindOfTest('AsyncFunction');

const isThenable = (thing) =>
  thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);

// original code
// https://github.com/DigitalBrainJS/AxiosPromise/blob/16deab13710ec09779922131f3fa5954320f83ab/lib/utils.js#L11-L34

const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
  if (setImmediateSupported) {
    return setImmediate;
  }

  return postMessageSupported ? ((token, callbacks) => {
    _global.addEventListener("message", ({source, data}) => {
      if (source === _global && data === token) {
        callbacks.length && callbacks.shift()();
      }
    }, false);

    return (cb) => {
      callbacks.push(cb);
      _global.postMessage(token, "*");
    }
  })(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
})(
  typeof setImmediate === 'function',
  isFunction(_global.postMessage)
);

const asap = typeof queueMicrotask !== 'undefined' ?
  queueMicrotask.bind(_global) : ( typeof process !== 'undefined' && process.nextTick || _setImmediate);

// *********************


const isIterable = (thing) => thing != null && isFunction(thing[iterator]);


var utils$1 = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isReadableStream,
  isRequest,
  isResponse,
  isHeaders,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty, // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable,
  setImmediate: _setImmediate,
  asap,
  isIterable
};

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [config] The config.
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 *
 * @returns {Error} The created error.
 */
function AxiosError(message, code, config, request, response) {
  Error.call(this);

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = (new Error()).stack;
  }

  this.message = message;
  this.name = 'AxiosError';
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  if (response) {
    this.response = response;
    this.status = response.status ? response.status : null;
  }
}

utils$1.inherits(AxiosError, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils$1.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});

const prototype$1 = AxiosError.prototype;
const descriptors = {};

[
  'ERR_BAD_OPTION_VALUE',
  'ERR_BAD_OPTION',
  'ECONNABORTED',
  'ETIMEDOUT',
  'ERR_NETWORK',
  'ERR_FR_TOO_MANY_REDIRECTS',
  'ERR_DEPRECATED',
  'ERR_BAD_RESPONSE',
  'ERR_BAD_REQUEST',
  'ERR_CANCELED',
  'ERR_NOT_SUPPORT',
  'ERR_INVALID_URL'
// eslint-disable-next-line func-names
].forEach(code => {
  descriptors[code] = {value: code};
});

Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype$1, 'isAxiosError', {value: true});

// eslint-disable-next-line func-names
AxiosError.from = (error, code, config, request, response, customProps) => {
  const axiosError = Object.create(prototype$1);

  utils$1.toFlatObject(error, axiosError, function filter(obj) {
    return obj !== Error.prototype;
  }, prop => {
    return prop !== 'isAxiosError';
  });

  AxiosError.call(axiosError, error.message, code, config, request, response);

  axiosError.cause = error;

  axiosError.name = error.name;

  customProps && Object.assign(axiosError, customProps);

  return axiosError;
};

// eslint-disable-next-line strict
var httpAdapter = null;

/**
 * Determines if the given thing is a array or js object.
 *
 * @param {string} thing - The object or array to be visited.
 *
 * @returns {boolean}
 */
function isVisitable(thing) {
  return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
}

/**
 * It removes the brackets from the end of a string
 *
 * @param {string} key - The key of the parameter.
 *
 * @returns {string} the key without the brackets.
 */
function removeBrackets(key) {
  return utils$1.endsWith(key, '[]') ? key.slice(0, -2) : key;
}

/**
 * It takes a path, a key, and a boolean, and returns a string
 *
 * @param {string} path - The path to the current key.
 * @param {string} key - The key of the current object being iterated over.
 * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
 *
 * @returns {string} The path to the current key.
 */
function renderKey(path, key, dots) {
  if (!path) return key;
  return path.concat(key).map(function each(token, i) {
    // eslint-disable-next-line no-param-reassign
    token = removeBrackets(token);
    return !dots && i ? '[' + token + ']' : token;
  }).join(dots ? '.' : '');
}

/**
 * If the array is an array and none of its elements are visitable, then it's a flat array.
 *
 * @param {Array<any>} arr - The array to check
 *
 * @returns {boolean}
 */
function isFlatArray(arr) {
  return utils$1.isArray(arr) && !arr.some(isVisitable);
}

const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});

/**
 * Convert a data object to FormData
 *
 * @param {Object} obj
 * @param {?Object} [formData]
 * @param {?Object} [options]
 * @param {Function} [options.visitor]
 * @param {Boolean} [options.metaTokens = true]
 * @param {Boolean} [options.dots = false]
 * @param {?Boolean} [options.indexes = false]
 *
 * @returns {Object}
 **/

/**
 * It converts an object into a FormData object
 *
 * @param {Object<any, any>} obj - The object to convert to form data.
 * @param {string} formData - The FormData object to append to.
 * @param {Object<string, any>} options
 *
 * @returns
 */
function toFormData(obj, formData, options) {
  if (!utils$1.isObject(obj)) {
    throw new TypeError('target must be an object');
  }

  // eslint-disable-next-line no-param-reassign
  formData = formData || new (FormData)();

  // eslint-disable-next-line no-param-reassign
  options = utils$1.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    // eslint-disable-next-line no-eq-null,eqeqeq
    return !utils$1.isUndefined(source[option]);
  });

  const metaTokens = options.metaTokens;
  // eslint-disable-next-line no-use-before-define
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== 'undefined' && Blob;
  const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);

  if (!utils$1.isFunction(visitor)) {
    throw new TypeError('visitor must be a function');
  }

  function convertValue(value) {
    if (value === null) return '';

    if (utils$1.isDate(value)) {
      return value.toISOString();
    }

    if (!useBlob && utils$1.isBlob(value)) {
      throw new AxiosError('Blob is not supported. Use a Buffer instead.');
    }

    if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
      return useBlob && typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
    }

    return value;
  }

  /**
   * Default visitor.
   *
   * @param {*} value
   * @param {String|Number} key
   * @param {Array<String|Number>} path
   * @this {FormData}
   *
   * @returns {boolean} return true to visit the each prop of the value recursively
   */
  function defaultVisitor(value, key, path) {
    let arr = value;

    if (value && !path && typeof value === 'object') {
      if (utils$1.endsWith(key, '{}')) {
        // eslint-disable-next-line no-param-reassign
        key = metaTokens ? key : key.slice(0, -2);
        // eslint-disable-next-line no-param-reassign
        value = JSON.stringify(value);
      } else if (
        (utils$1.isArray(value) && isFlatArray(value)) ||
        ((utils$1.isFileList(value) || utils$1.endsWith(key, '[]')) && (arr = utils$1.toArray(value))
        )) {
        // eslint-disable-next-line no-param-reassign
        key = removeBrackets(key);

        arr.forEach(function each(el, index) {
          !(utils$1.isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : (indexes === null ? key : key + '[]'),
            convertValue(el)
          );
        });
        return false;
      }
    }

    if (isVisitable(value)) {
      return true;
    }

    formData.append(renderKey(path, key, dots), convertValue(value));

    return false;
  }

  const stack = [];

  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });

  function build(value, path) {
    if (utils$1.isUndefined(value)) return;

    if (stack.indexOf(value) !== -1) {
      throw Error('Circular reference detected in ' + path.join('.'));
    }

    stack.push(value);

    utils$1.forEach(value, function each(el, key) {
      const result = !(utils$1.isUndefined(el) || el === null) && visitor.call(
        formData, el, utils$1.isString(key) ? key.trim() : key, path, exposedHelpers
      );

      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });

    stack.pop();
  }

  if (!utils$1.isObject(obj)) {
    throw new TypeError('data must be an object');
  }

  build(obj);

  return formData;
}

/**
 * It encodes a string by replacing all characters that are not in the unreserved set with
 * their percent-encoded equivalents
 *
 * @param {string} str - The string to encode.
 *
 * @returns {string} The encoded string.
 */
function encode$1(str) {
  const charMap = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+',
    '%00': '\x00'
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}

/**
 * It takes a params object and converts it to a FormData object
 *
 * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
 * @param {Object<string, any>} options - The options object passed to the Axios constructor.
 *
 * @returns {void}
 */
function AxiosURLSearchParams(params, options) {
  this._pairs = [];

  params && toFormData(params, this, options);
}

const prototype = AxiosURLSearchParams.prototype;

prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};

prototype.toString = function toString(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode$1);
  } : encode$1;

  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + '=' + _encode(pair[1]);
  }, '').join('&');
};

/**
 * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
 * URI encoded counterparts
 *
 * @param {string} val The value to be encoded.
 *
 * @returns {string} The encoded value.
 */
function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @param {?(object|Function)} options
 *
 * @returns {string} The formatted url
 */
function buildURL(url, params, options) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }
  
  const _encode = options && options.encode || encode;

  if (utils$1.isFunction(options)) {
    options = {
      serialize: options
    };
  } 

  const serializeFn = options && options.serialize;

  let serializedParams;

  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = utils$1.isURLSearchParams(params) ?
      params.toString() :
      new AxiosURLSearchParams(params, options).toString(_encode);
  }

  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");

    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}

class InterceptorManager {
  constructor() {
    this.handlers = [];
  }

  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }

  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }

  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }

  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils$1.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  }
}

var InterceptorManager$1 = InterceptorManager;

var transitionalDefaults = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};

var URLSearchParams$1 = typeof URLSearchParams !== 'undefined' ? URLSearchParams : AxiosURLSearchParams;

var FormData$1 = typeof FormData !== 'undefined' ? FormData : null;

var Blob$1 = typeof Blob !== 'undefined' ? Blob : null;

var platform$1 = {
  isBrowser: true,
  classes: {
    URLSearchParams: URLSearchParams$1,
    FormData: FormData$1,
    Blob: Blob$1
  },
  protocols: ['http', 'https', 'file', 'blob', 'url', 'data']
};

const hasBrowserEnv = typeof window !== 'undefined' && typeof document !== 'undefined';

const _navigator = typeof navigator === 'object' && navigator || undefined;

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 *
 * @returns {boolean}
 */
const hasStandardBrowserEnv = hasBrowserEnv &&
  (!_navigator || ['ReactNative', 'NativeScript', 'NS'].indexOf(_navigator.product) < 0);

/**
 * Determine if we're running in a standard browser webWorker environment
 *
 * Although the `isStandardBrowserEnv` method indicates that
 * `allows axios to run in a web worker`, the WebWorker will still be
 * filtered out due to its judgment standard
 * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
 * This leads to a problem when axios post `FormData` in webWorker
 */
const hasStandardBrowserWebWorkerEnv = (() => {
  return (
    typeof WorkerGlobalScope !== 'undefined' &&
    // eslint-disable-next-line no-undef
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts === 'function'
  );
})();

const origin = hasBrowserEnv && window.location.href || 'http://localhost';

var utils = /*#__PURE__*/Object.freeze({
  __proto__: null,
  hasBrowserEnv: hasBrowserEnv,
  hasStandardBrowserWebWorkerEnv: hasStandardBrowserWebWorkerEnv,
  hasStandardBrowserEnv: hasStandardBrowserEnv,
  navigator: _navigator,
  origin: origin
});

var platform = {
  ...utils,
  ...platform$1
};

function toURLEncodedForm(data, options) {
  return toFormData(data, new platform.classes.URLSearchParams(), Object.assign({
    visitor: function(value, key, path, helpers) {
      if (platform.isNode && utils$1.isBuffer(value)) {
        this.append(key, value.toString('base64'));
        return false;
      }

      return helpers.defaultVisitor.apply(this, arguments);
    }
  }, options));
}

/**
 * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
 *
 * @param {string} name - The name of the property to get.
 *
 * @returns An array of strings.
 */
function parsePropPath(name) {
  // foo[x][y][z]
  // foo.x.y.z
  // foo-x-y-z
  // foo x y z
  return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map(match => {
    return match[0] === '[]' ? '' : match[1] || match[0];
  });
}

/**
 * Convert an array to an object.
 *
 * @param {Array<any>} arr - The array to convert to an object.
 *
 * @returns An object with the same keys and values as the array.
 */
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}

/**
 * It takes a FormData object and returns a JavaScript object
 *
 * @param {string} formData The FormData object to convert to JSON.
 *
 * @returns {Object<string, any> | null} The converted object.
 */
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];

    if (name === '__proto__') return true;

    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && utils$1.isArray(target) ? target.length : name;

    if (isLast) {
      if (utils$1.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }

      return !isNumericKey;
    }

    if (!target[name] || !utils$1.isObject(target[name])) {
      target[name] = [];
    }

    const result = buildPath(path, value, target[name], index);

    if (result && utils$1.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }

    return !isNumericKey;
  }

  if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
    const obj = {};

    utils$1.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });

    return obj;
  }

  return null;
}

/**
 * It takes a string, tries to parse it, and if it fails, it returns the stringified version
 * of the input
 *
 * @param {any} rawValue - The value to be stringified.
 * @param {Function} parser - A function that parses a string into a JavaScript object.
 * @param {Function} encoder - A function that takes a value and returns a string.
 *
 * @returns {string} A stringified version of the rawValue.
 */
function stringifySafely(rawValue, parser, encoder) {
  if (utils$1.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$1.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

const defaults = {

  transitional: transitionalDefaults,

  adapter: ['xhr', 'http', 'fetch'],

  transformRequest: [function transformRequest(data, headers) {
    const contentType = headers.getContentType() || '';
    const hasJSONContentType = contentType.indexOf('application/json') > -1;
    const isObjectPayload = utils$1.isObject(data);

    if (isObjectPayload && utils$1.isHTMLForm(data)) {
      data = new FormData(data);
    }

    const isFormData = utils$1.isFormData(data);

    if (isFormData) {
      return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
    }

    if (utils$1.isArrayBuffer(data) ||
      utils$1.isBuffer(data) ||
      utils$1.isStream(data) ||
      utils$1.isFile(data) ||
      utils$1.isBlob(data) ||
      utils$1.isReadableStream(data)
    ) {
      return data;
    }
    if (utils$1.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils$1.isURLSearchParams(data)) {
      headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
      return data.toString();
    }

    let isFileList;

    if (isObjectPayload) {
      if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
        return toURLEncodedForm(data, this.formSerializer).toString();
      }

      if ((isFileList = utils$1.isFileList(data)) || contentType.indexOf('multipart/form-data') > -1) {
        const _FormData = this.env && this.env.FormData;

        return toFormData(
          isFileList ? {'files[]': data} : data,
          _FormData && new _FormData(),
          this.formSerializer
        );
      }
    }

    if (isObjectPayload || hasJSONContentType ) {
      headers.setContentType('application/json', false);
      return stringifySafely(data);
    }

    return data;
  }],

  transformResponse: [function transformResponse(data) {
    const transitional = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    const JSONRequested = this.responseType === 'json';

    if (utils$1.isResponse(data) || utils$1.isReadableStream(data)) {
      return data;
    }

    if (data && utils$1.isString(data) && ((forcedJSONParsing && !this.responseType) || JSONRequested)) {
      const silentJSONParsing = transitional && transitional.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;

      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  env: {
    FormData: platform.classes.FormData,
    Blob: platform.classes.Blob
  },

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': undefined
    }
  }
};

utils$1.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], (method) => {
  defaults.headers[method] = {};
});

var defaults$1 = defaults;

// RawAxiosHeaders whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
const ignoreDuplicateOf = utils$1.toObjectSet([
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
]);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} rawHeaders Headers needing to be parsed
 *
 * @returns {Object} Headers parsed into an object
 */
var parseHeaders = rawHeaders => {
  const parsed = {};
  let key;
  let val;
  let i;

  rawHeaders && rawHeaders.split('\n').forEach(function parser(line) {
    i = line.indexOf(':');
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();

    if (!key || (parsed[key] && ignoreDuplicateOf[key])) {
      return;
    }

    if (key === 'set-cookie') {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};

const $internals = Symbol('internals');

function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}

function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }

  return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
}

function parseTokens(str) {
  const tokens = Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;

  while ((match = tokensRE.exec(str))) {
    tokens[match[1]] = match[2];
  }

  return tokens;
}

const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());

function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
  if (utils$1.isFunction(filter)) {
    return filter.call(this, value, header);
  }

  if (isHeaderNameFilter) {
    value = header;
  }

  if (!utils$1.isString(value)) return;

  if (utils$1.isString(filter)) {
    return value.indexOf(filter) !== -1;
  }

  if (utils$1.isRegExp(filter)) {
    return filter.test(value);
  }
}

function formatHeader(header) {
  return header.trim()
    .toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
      return char.toUpperCase() + str;
    });
}

function buildAccessors(obj, header) {
  const accessorName = utils$1.toCamelCase(' ' + header);

  ['get', 'set', 'has'].forEach(methodName => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}

class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }

  set(header, valueOrRewrite, rewrite) {
    const self = this;

    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);

      if (!lHeader) {
        throw new Error('header name must be a non-empty string');
      }

      const key = utils$1.findKey(self, lHeader);

      if(!key || self[key] === undefined || _rewrite === true || (_rewrite === undefined && self[key] !== false)) {
        self[key || _header] = normalizeValue(_value);
      }
    }

    const setHeaders = (headers, _rewrite) =>
      utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));

    if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if(utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders(header), valueOrRewrite);
    } else if (utils$1.isObject(header) && utils$1.isIterable(header)) {
      let obj = {}, dest, key;
      for (const entry of header) {
        if (!utils$1.isArray(entry)) {
          throw TypeError('Object iterator must return a key-value pair');
        }

        obj[key = entry[0]] = (dest = obj[key]) ?
          (utils$1.isArray(dest) ? [...dest, entry[1]] : [dest, entry[1]]) : entry[1];
      }

      setHeaders(obj, valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }

    return this;
  }

  get(header, parser) {
    header = normalizeHeader(header);

    if (header) {
      const key = utils$1.findKey(this, header);

      if (key) {
        const value = this[key];

        if (!parser) {
          return value;
        }

        if (parser === true) {
          return parseTokens(value);
        }

        if (utils$1.isFunction(parser)) {
          return parser.call(this, value, key);
        }

        if (utils$1.isRegExp(parser)) {
          return parser.exec(value);
        }

        throw new TypeError('parser must be boolean|regexp|function');
      }
    }
  }

  has(header, matcher) {
    header = normalizeHeader(header);

    if (header) {
      const key = utils$1.findKey(this, header);

      return !!(key && this[key] !== undefined && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }

    return false;
  }

  delete(header, matcher) {
    const self = this;
    let deleted = false;

    function deleteHeader(_header) {
      _header = normalizeHeader(_header);

      if (_header) {
        const key = utils$1.findKey(self, _header);

        if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
          delete self[key];

          deleted = true;
        }
      }
    }

    if (utils$1.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }

    return deleted;
  }

  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;

    while (i--) {
      const key = keys[i];
      if(!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }

    return deleted;
  }

  normalize(format) {
    const self = this;
    const headers = {};

    utils$1.forEach(this, (value, header) => {
      const key = utils$1.findKey(headers, header);

      if (key) {
        self[key] = normalizeValue(value);
        delete self[header];
        return;
      }

      const normalized = format ? formatHeader(header) : String(header).trim();

      if (normalized !== header) {
        delete self[header];
      }

      self[normalized] = normalizeValue(value);

      headers[normalized] = true;
    });

    return this;
  }

  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }

  toJSON(asStrings) {
    const obj = Object.create(null);

    utils$1.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(', ') : value);
    });

    return obj;
  }

  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }

  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ': ' + value).join('\n');
  }

  getSetCookie() {
    return this.get("set-cookie") || [];
  }

  get [Symbol.toStringTag]() {
    return 'AxiosHeaders';
  }

  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }

  static concat(first, ...targets) {
    const computed = new this(first);

    targets.forEach((target) => computed.set(target));

    return computed;
  }

  static accessor(header) {
    const internals = this[$internals] = (this[$internals] = {
      accessors: {}
    });

    const accessors = internals.accessors;
    const prototype = this.prototype;

    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);

      if (!accessors[lHeader]) {
        buildAccessors(prototype, _header);
        accessors[lHeader] = true;
      }
    }

    utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);

    return this;
  }
}

AxiosHeaders.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']);

// reserved names hotfix
utils$1.reduceDescriptors(AxiosHeaders.prototype, ({value}, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1); // map `set` => `Set`
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  }
});

utils$1.freezeMethods(AxiosHeaders);

var AxiosHeaders$1 = AxiosHeaders;

/**
 * Transform the data for a request or a response
 *
 * @param {Array|Function} fns A single function or Array of functions
 * @param {?Object} response The response object
 *
 * @returns {*} The resulting transformed data
 */
function transformData(fns, response) {
  const config = this || defaults$1;
  const context = response || config;
  const headers = AxiosHeaders$1.from(context.headers);
  let data = context.data;

  utils$1.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
  });

  headers.normalize();

  return data;
}

function isCancel(value) {
  return !!(value && value.__CANCEL__);
}

/**
 * A `CanceledError` is an object that is thrown when an operation is canceled.
 *
 * @param {string=} message The message.
 * @param {Object=} config The config.
 * @param {Object=} request The request.
 *
 * @returns {CanceledError} The created error.
 */
function CanceledError(message, config, request) {
  // eslint-disable-next-line no-eq-null,eqeqeq
  AxiosError.call(this, message == null ? 'canceled' : message, AxiosError.ERR_CANCELED, config, request);
  this.name = 'CanceledError';
}

utils$1.inherits(CanceledError, AxiosError, {
  __CANCEL__: true
});

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 *
 * @returns {object} The response.
 */
function settle(resolve, reject, response) {
  const validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError(
      'Request failed with status code ' + response.status,
      [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}

function parseProtocol(url) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || '';
}

/**
 * Calculate data maxRate
 * @param {Number} [samplesCount= 10]
 * @param {Number} [min= 1000]
 * @returns {Function}
 */
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;

  min = min !== undefined ? min : 1000;

  return function push(chunkLength) {
    const now = Date.now();

    const startedAt = timestamps[tail];

    if (!firstSampleTS) {
      firstSampleTS = now;
    }

    bytes[head] = chunkLength;
    timestamps[head] = now;

    let i = tail;
    let bytesCount = 0;

    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }

    head = (head + 1) % samplesCount;

    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }

    if (now - firstSampleTS < min) {
      return;
    }

    const passed = startedAt && now - startedAt;

    return passed ? Math.round(bytesCount * 1000 / passed) : undefined;
  };
}

/**
 * Throttle decorator
 * @param {Function} fn
 * @param {Number} freq
 * @return {Function}
 */
function throttle(fn, freq) {
  let timestamp = 0;
  let threshold = 1000 / freq;
  let lastArgs;
  let timer;

  const invoke = (args, now = Date.now()) => {
    timestamp = now;
    lastArgs = null;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    fn.apply(null, args);
  };

  const throttled = (...args) => {
    const now = Date.now();
    const passed = now - timestamp;
    if ( passed >= threshold) {
      invoke(args, now);
    } else {
      lastArgs = args;
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          invoke(lastArgs);
        }, threshold - passed);
      }
    }
  };

  const flush = () => lastArgs && invoke(lastArgs);

  return [throttled, flush];
}

const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
  let bytesNotified = 0;
  const _speedometer = speedometer(50, 250);

  return throttle(e => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : undefined;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;

    bytesNotified = loaded;

    const data = {
      loaded,
      total,
      progress: total ? (loaded / total) : undefined,
      bytes: progressBytes,
      rate: rate ? rate : undefined,
      estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
      event: e,
      lengthComputable: total != null,
      [isDownloadStream ? 'download' : 'upload']: true
    };

    listener(data);
  }, freq);
};

const progressEventDecorator = (total, throttled) => {
  const lengthComputable = total != null;

  return [(loaded) => throttled[0]({
    lengthComputable,
    total,
    loaded
  }), throttled[1]];
};

const asyncDecorator = (fn) => (...args) => utils$1.asap(() => fn(...args));

var isURLSameOrigin = platform.hasStandardBrowserEnv ? ((origin, isMSIE) => (url) => {
  url = new URL(url, platform.origin);

  return (
    origin.protocol === url.protocol &&
    origin.host === url.host &&
    (isMSIE || origin.port === url.port)
  );
})(
  new URL(platform.origin),
  platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent)
) : () => true;

var cookies = platform.hasStandardBrowserEnv ?

  // Standard browser envs support document.cookie
  {
    write(name, value, expires, path, domain, secure) {
      const cookie = [name + '=' + encodeURIComponent(value)];

      utils$1.isNumber(expires) && cookie.push('expires=' + new Date(expires).toGMTString());

      utils$1.isString(path) && cookie.push('path=' + path);

      utils$1.isString(domain) && cookie.push('domain=' + domain);

      secure === true && cookie.push('secure');

      document.cookie = cookie.join('; ');
    },

    read(name) {
      const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
      return (match ? decodeURIComponent(match[3]) : null);
    },

    remove(name) {
      this.write(name, '', Date.now() - 86400000);
    }
  }

  :

  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {},
    read() {
      return null;
    },
    remove() {}
  };

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 *
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 *
 * @returns {string} The combined URL
 */
function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/?\/$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
}

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 *
 * @returns {string} The combined full path
 */
function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls) {
  let isRelativeUrl = !isAbsoluteURL(requestedURL);
  if (baseURL && (isRelativeUrl || allowAbsoluteUrls == false)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}

const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? { ...thing } : thing;

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 *
 * @returns {Object} New object resulting from merging config2 to config1
 */
function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  const config = {};

  function getMergedValue(target, source, prop, caseless) {
    if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
      return utils$1.merge.call({caseless}, target, source);
    } else if (utils$1.isPlainObject(source)) {
      return utils$1.merge({}, source);
    } else if (utils$1.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(a, b, prop , caseless) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(a, b, prop , caseless);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(undefined, a, prop , caseless);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(a, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(undefined, b);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(a, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(undefined, b);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(undefined, a);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(undefined, a);
    }
  }

  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b , prop) => mergeDeepProperties(headersToObject(a), headersToObject(b),prop, true)
  };

  utils$1.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
    const merge = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge(config1[prop], config2[prop], prop);
    (utils$1.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
}

var resolveConfig = (config) => {
  const newConfig = mergeConfig({}, config);

  let {data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth} = newConfig;

  newConfig.headers = headers = AxiosHeaders$1.from(headers);

  newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url, newConfig.allowAbsoluteUrls), config.params, config.paramsSerializer);

  // HTTP basic authentication
  if (auth) {
    headers.set('Authorization', 'Basic ' +
      btoa((auth.username || '') + ':' + (auth.password ? unescape(encodeURIComponent(auth.password)) : ''))
    );
  }

  let contentType;

  if (utils$1.isFormData(data)) {
    if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
      headers.setContentType(undefined); // Let the browser set it
    } else if ((contentType = headers.getContentType()) !== false) {
      // fix semicolon duplication issue for ReactNative FormData implementation
      const [type, ...tokens] = contentType ? contentType.split(';').map(token => token.trim()).filter(Boolean) : [];
      headers.setContentType([type || 'multipart/form-data', ...tokens].join('; '));
    }
  }

  // Add xsrf header
  // This is only done if running in a standard browser environment.
  // Specifically not if we're in a web worker, or react-native.

  if (platform.hasStandardBrowserEnv) {
    withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));

    if (withXSRFToken || (withXSRFToken !== false && isURLSameOrigin(newConfig.url))) {
      // Add xsrf header
      const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);

      if (xsrfValue) {
        headers.set(xsrfHeaderName, xsrfValue);
      }
    }
  }

  return newConfig;
};

const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';

var xhrAdapter = isXHRAdapterSupported && function (config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    const _config = resolveConfig(config);
    let requestData = _config.data;
    const requestHeaders = AxiosHeaders$1.from(_config.headers).normalize();
    let {responseType, onUploadProgress, onDownloadProgress} = _config;
    let onCanceled;
    let uploadThrottled, downloadThrottled;
    let flushUpload, flushDownload;

    function done() {
      flushUpload && flushUpload(); // flush events
      flushDownload && flushDownload(); // flush events

      _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);

      _config.signal && _config.signal.removeEventListener('abort', onCanceled);
    }

    let request = new XMLHttpRequest();

    request.open(_config.method.toUpperCase(), _config.url, true);

    // Set the request timeout in MS
    request.timeout = _config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      const responseHeaders = AxiosHeaders$1.from(
        'getAllResponseHeaders' in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === 'text' || responseType === 'json' ?
        request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };

      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(new AxiosError('Request aborted', AxiosError.ECONNABORTED, config, request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = _config.timeout ? 'timeout of ' + _config.timeout + 'ms exceeded' : 'timeout exceeded';
      const transitional = _config.transitional || transitionalDefaults;
      if (_config.timeoutErrorMessage) {
        timeoutErrorMessage = _config.timeoutErrorMessage;
      }
      reject(new AxiosError(
        timeoutErrorMessage,
        transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
        config,
        request));

      // Clean up request
      request = null;
    };

    // Remove Content-Type if data is undefined
    requestData === undefined && requestHeaders.setContentType(null);

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }

    // Add withCredentials to request if needed
    if (!utils$1.isUndefined(_config.withCredentials)) {
      request.withCredentials = !!_config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = _config.responseType;
    }

    // Handle progress if needed
    if (onDownloadProgress) {
      ([downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true));
      request.addEventListener('progress', downloadThrottled);
    }

    // Not all browsers support upload events
    if (onUploadProgress && request.upload) {
      ([uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress));

      request.upload.addEventListener('progress', uploadThrottled);

      request.upload.addEventListener('loadend', flushUpload);
    }

    if (_config.cancelToken || _config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = cancel => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new CanceledError(null, config, request) : cancel);
        request.abort();
        request = null;
      };

      _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
      if (_config.signal) {
        _config.signal.aborted ? onCanceled() : _config.signal.addEventListener('abort', onCanceled);
      }
    }

    const protocol = parseProtocol(_config.url);

    if (protocol && platform.protocols.indexOf(protocol) === -1) {
      reject(new AxiosError('Unsupported protocol ' + protocol + ':', AxiosError.ERR_BAD_REQUEST, config));
      return;
    }


    // Send the request
    request.send(requestData || null);
  });
};

const composeSignals = (signals, timeout) => {
  const {length} = (signals = signals ? signals.filter(Boolean) : []);

  if (timeout || length) {
    let controller = new AbortController();

    let aborted;

    const onabort = function (reason) {
      if (!aborted) {
        aborted = true;
        unsubscribe();
        const err = reason instanceof Error ? reason : this.reason;
        controller.abort(err instanceof AxiosError ? err : new CanceledError(err instanceof Error ? err.message : err));
      }
    };

    let timer = timeout && setTimeout(() => {
      timer = null;
      onabort(new AxiosError(`timeout ${timeout} of ms exceeded`, AxiosError.ETIMEDOUT));
    }, timeout);

    const unsubscribe = () => {
      if (signals) {
        timer && clearTimeout(timer);
        timer = null;
        signals.forEach(signal => {
          signal.unsubscribe ? signal.unsubscribe(onabort) : signal.removeEventListener('abort', onabort);
        });
        signals = null;
      }
    };

    signals.forEach((signal) => signal.addEventListener('abort', onabort));

    const {signal} = controller;

    signal.unsubscribe = () => utils$1.asap(unsubscribe);

    return signal;
  }
};

var composeSignals$1 = composeSignals;

const streamChunk = function* (chunk, chunkSize) {
  let len = chunk.byteLength;

  if (!chunkSize || len < chunkSize) {
    yield chunk;
    return;
  }

  let pos = 0;
  let end;

  while (pos < len) {
    end = pos + chunkSize;
    yield chunk.slice(pos, end);
    pos = end;
  }
};

const readBytes = async function* (iterable, chunkSize) {
  for await (const chunk of readStream(iterable)) {
    yield* streamChunk(chunk, chunkSize);
  }
};

const readStream = async function* (stream) {
  if (stream[Symbol.asyncIterator]) {
    yield* stream;
    return;
  }

  const reader = stream.getReader();
  try {
    for (;;) {
      const {done, value} = await reader.read();
      if (done) {
        break;
      }
      yield value;
    }
  } finally {
    await reader.cancel();
  }
};

const trackStream = (stream, chunkSize, onProgress, onFinish) => {
  const iterator = readBytes(stream, chunkSize);

  let bytes = 0;
  let done;
  let _onFinish = (e) => {
    if (!done) {
      done = true;
      onFinish && onFinish(e);
    }
  };

  return new ReadableStream({
    async pull(controller) {
      try {
        const {done, value} = await iterator.next();

        if (done) {
         _onFinish();
          controller.close();
          return;
        }

        let len = value.byteLength;
        if (onProgress) {
          let loadedBytes = bytes += len;
          onProgress(loadedBytes);
        }
        controller.enqueue(new Uint8Array(value));
      } catch (err) {
        _onFinish(err);
        throw err;
      }
    },
    cancel(reason) {
      _onFinish(reason);
      return iterator.return();
    }
  }, {
    highWaterMark: 2
  })
};

const isFetchSupported = typeof fetch === 'function' && typeof Request === 'function' && typeof Response === 'function';
const isReadableStreamSupported = isFetchSupported && typeof ReadableStream === 'function';

// used only inside the fetch adapter
const encodeText = isFetchSupported && (typeof TextEncoder === 'function' ?
    ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) :
    async (str) => new Uint8Array(await new Response(str).arrayBuffer())
);

const test = (fn, ...args) => {
  try {
    return !!fn(...args);
  } catch (e) {
    return false
  }
};

const supportsRequestStream = isReadableStreamSupported && test(() => {
  let duplexAccessed = false;

  const hasContentType = new Request(platform.origin, {
    body: new ReadableStream(),
    method: 'POST',
    get duplex() {
      duplexAccessed = true;
      return 'half';
    },
  }).headers.has('Content-Type');

  return duplexAccessed && !hasContentType;
});

const DEFAULT_CHUNK_SIZE = 64 * 1024;

const supportsResponseStream = isReadableStreamSupported &&
  test(() => utils$1.isReadableStream(new Response('').body));


const resolvers = {
  stream: supportsResponseStream && ((res) => res.body)
};

isFetchSupported && (((res) => {
  ['text', 'arrayBuffer', 'blob', 'formData', 'stream'].forEach(type => {
    !resolvers[type] && (resolvers[type] = utils$1.isFunction(res[type]) ? (res) => res[type]() :
      (_, config) => {
        throw new AxiosError(`Response type '${type}' is not supported`, AxiosError.ERR_NOT_SUPPORT, config);
      });
  });
})(new Response));

const getBodyLength = async (body) => {
  if (body == null) {
    return 0;
  }

  if(utils$1.isBlob(body)) {
    return body.size;
  }

  if(utils$1.isSpecCompliantForm(body)) {
    const _request = new Request(platform.origin, {
      method: 'POST',
      body,
    });
    return (await _request.arrayBuffer()).byteLength;
  }

  if(utils$1.isArrayBufferView(body) || utils$1.isArrayBuffer(body)) {
    return body.byteLength;
  }

  if(utils$1.isURLSearchParams(body)) {
    body = body + '';
  }

  if(utils$1.isString(body)) {
    return (await encodeText(body)).byteLength;
  }
};

const resolveBodyLength = async (headers, body) => {
  const length = utils$1.toFiniteNumber(headers.getContentLength());

  return length == null ? getBodyLength(body) : length;
};

var fetchAdapter = isFetchSupported && (async (config) => {
  let {
    url,
    method,
    data,
    signal,
    cancelToken,
    timeout,
    onDownloadProgress,
    onUploadProgress,
    responseType,
    headers,
    withCredentials = 'same-origin',
    fetchOptions
  } = resolveConfig(config);

  responseType = responseType ? (responseType + '').toLowerCase() : 'text';

  let composedSignal = composeSignals$1([signal, cancelToken && cancelToken.toAbortSignal()], timeout);

  let request;

  const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
      composedSignal.unsubscribe();
  });

  let requestContentLength;

  try {
    if (
      onUploadProgress && supportsRequestStream && method !== 'get' && method !== 'head' &&
      (requestContentLength = await resolveBodyLength(headers, data)) !== 0
    ) {
      let _request = new Request(url, {
        method: 'POST',
        body: data,
        duplex: "half"
      });

      let contentTypeHeader;

      if (utils$1.isFormData(data) && (contentTypeHeader = _request.headers.get('content-type'))) {
        headers.setContentType(contentTypeHeader);
      }

      if (_request.body) {
        const [onProgress, flush] = progressEventDecorator(
          requestContentLength,
          progressEventReducer(asyncDecorator(onUploadProgress))
        );

        data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
      }
    }

    if (!utils$1.isString(withCredentials)) {
      withCredentials = withCredentials ? 'include' : 'omit';
    }

    // Cloudflare Workers throws when credentials are defined
    // see https://github.com/cloudflare/workerd/issues/902
    const isCredentialsSupported = "credentials" in Request.prototype;
    request = new Request(url, {
      ...fetchOptions,
      signal: composedSignal,
      method: method.toUpperCase(),
      headers: headers.normalize().toJSON(),
      body: data,
      duplex: "half",
      credentials: isCredentialsSupported ? withCredentials : undefined
    });

    let response = await fetch(request);

    const isStreamResponse = supportsResponseStream && (responseType === 'stream' || responseType === 'response');

    if (supportsResponseStream && (onDownloadProgress || (isStreamResponse && unsubscribe))) {
      const options = {};

      ['status', 'statusText', 'headers'].forEach(prop => {
        options[prop] = response[prop];
      });

      const responseContentLength = utils$1.toFiniteNumber(response.headers.get('content-length'));

      const [onProgress, flush] = onDownloadProgress && progressEventDecorator(
        responseContentLength,
        progressEventReducer(asyncDecorator(onDownloadProgress), true)
      ) || [];

      response = new Response(
        trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
          flush && flush();
          unsubscribe && unsubscribe();
        }),
        options
      );
    }

    responseType = responseType || 'text';

    let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || 'text'](response, config);

    !isStreamResponse && unsubscribe && unsubscribe();

    return await new Promise((resolve, reject) => {
      settle(resolve, reject, {
        data: responseData,
        headers: AxiosHeaders$1.from(response.headers),
        status: response.status,
        statusText: response.statusText,
        config,
        request
      });
    })
  } catch (err) {
    unsubscribe && unsubscribe();

    if (err && err.name === 'TypeError' && /Load failed|fetch/i.test(err.message)) {
      throw Object.assign(
        new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request),
        {
          cause: err.cause || err
        }
      )
    }

    throw AxiosError.from(err, err && err.code, config, request);
  }
});

const knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter,
  fetch: fetchAdapter
};

utils$1.forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, 'name', {value});
    } catch (e) {
      // eslint-disable-next-line no-empty
    }
    Object.defineProperty(fn, 'adapterName', {value});
  }
});

const renderReason = (reason) => `- ${reason}`;

const isResolvedHandle = (adapter) => utils$1.isFunction(adapter) || adapter === null || adapter === false;

var adapters = {
  getAdapter: (adapters) => {
    adapters = utils$1.isArray(adapters) ? adapters : [adapters];

    const {length} = adapters;
    let nameOrAdapter;
    let adapter;

    const rejectedReasons = {};

    for (let i = 0; i < length; i++) {
      nameOrAdapter = adapters[i];
      let id;

      adapter = nameOrAdapter;

      if (!isResolvedHandle(nameOrAdapter)) {
        adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];

        if (adapter === undefined) {
          throw new AxiosError(`Unknown adapter '${id}'`);
        }
      }

      if (adapter) {
        break;
      }

      rejectedReasons[id || '#' + i] = adapter;
    }

    if (!adapter) {

      const reasons = Object.entries(rejectedReasons)
        .map(([id, state]) => `adapter ${id} ` +
          (state === false ? 'is not supported by the environment' : 'is not available in the build')
        );

      let s = length ?
        (reasons.length > 1 ? 'since :\n' + reasons.map(renderReason).join('\n') : ' ' + renderReason(reasons[0])) :
        'as no adapter specified';

      throw new AxiosError(
        `There is no suitable adapter to dispatch the request ` + s,
        'ERR_NOT_SUPPORT'
      );
    }

    return adapter;
  },
  adapters: knownAdapters
};

/**
 * Throws a `CanceledError` if cancellation has been requested.
 *
 * @param {Object} config The config that is to be used for the request
 *
 * @returns {void}
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new CanceledError(null, config);
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 *
 * @returns {Promise} The Promise to be fulfilled
 */
function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  config.headers = AxiosHeaders$1.from(config.headers);

  // Transform request data
  config.data = transformData.call(
    config,
    config.transformRequest
  );

  if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
    config.headers.setContentType('application/x-www-form-urlencoded', false);
  }

  const adapter = adapters.getAdapter(config.adapter || defaults$1.adapter);

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      config.transformResponse,
      response
    );

    response.headers = AxiosHeaders$1.from(response.headers);

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          config.transformResponse,
          reason.response
        );
        reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
      }
    }

    return Promise.reject(reason);
  });
}

const VERSION = "1.9.0";

const validators$1 = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
  validators$1[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

const deprecatedWarnings = {};

/**
 * Transitional option validator
 *
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 *
 * @returns {function}
 */
validators$1.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return (value, opt, opts) => {
    if (validator === false) {
      throw new AxiosError(
        formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
        AxiosError.ERR_DEPRECATED
      );
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

validators$1.spelling = function spelling(correctSpelling) {
  return (value, opt) => {
    // eslint-disable-next-line no-console
    console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
    return true;
  }
};

/**
 * Assert object's properties type
 *
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 *
 * @returns {object}
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new AxiosError('options must be an object', AxiosError.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    const validator = schema[opt];
    if (validator) {
      const value = options[opt];
      const result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new AxiosError('option ' + opt + ' must be ' + result, AxiosError.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError('Unknown option ' + opt, AxiosError.ERR_BAD_OPTION);
    }
  }
}

var validator = {
  assertOptions,
  validators: validators$1
};

const validators = validator.validators;

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 *
 * @return {Axios} A new instance of Axios
 */
class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig || {};
    this.interceptors = {
      request: new InterceptorManager$1(),
      response: new InterceptorManager$1()
    };
  }

  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(configOrUrl, config) {
    try {
      return await this._request(configOrUrl, config);
    } catch (err) {
      if (err instanceof Error) {
        let dummy = {};

        Error.captureStackTrace ? Error.captureStackTrace(dummy) : (dummy = new Error());

        // slice off the Error: ... line
        const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, '') : '';
        try {
          if (!err.stack) {
            err.stack = stack;
            // match without the 2 top stack lines
          } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ''))) {
            err.stack += '\n' + stack;
          }
        } catch (e) {
          // ignore the case where "stack" is an un-writable property
        }
      }

      throw err;
    }
  }

  _request(configOrUrl, config) {
    /*eslint no-param-reassign:0*/
    // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof configOrUrl === 'string') {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }

    config = mergeConfig(this.defaults, config);

    const {transitional, paramsSerializer, headers} = config;

    if (transitional !== undefined) {
      validator.assertOptions(transitional, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }

    if (paramsSerializer != null) {
      if (utils$1.isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        };
      } else {
        validator.assertOptions(paramsSerializer, {
          encode: validators.function,
          serialize: validators.function
        }, true);
      }
    }

    // Set config.allowAbsoluteUrls
    if (config.allowAbsoluteUrls !== undefined) ; else if (this.defaults.allowAbsoluteUrls !== undefined) {
      config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
    } else {
      config.allowAbsoluteUrls = true;
    }

    validator.assertOptions(config, {
      baseUrl: validators.spelling('baseURL'),
      withXsrfToken: validators.spelling('withXSRFToken')
    }, true);

    // Set config.method
    config.method = (config.method || this.defaults.method || 'get').toLowerCase();

    // Flatten headers
    let contextHeaders = headers && utils$1.merge(
      headers.common,
      headers[config.method]
    );

    headers && utils$1.forEach(
      ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
      (method) => {
        delete headers[method];
      }
    );

    config.headers = AxiosHeaders$1.concat(contextHeaders, headers);

    // filter out skipped interceptors
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
        return;
      }

      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });

    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });

    let promise;
    let i = 0;
    let len;

    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), undefined];
      chain.unshift.apply(chain, requestInterceptorChain);
      chain.push.apply(chain, responseInterceptorChain);
      len = chain.length;

      promise = Promise.resolve(config);

      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }

      return promise;
    }

    len = requestInterceptorChain.length;

    let newConfig = config;

    i = 0;

    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }

    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }

    i = 0;
    len = responseInterceptorChain.length;

    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }

    return promise;
  }

  getUri(config) {
    config = mergeConfig(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
}

// Provide aliases for supported request methods
utils$1.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});

utils$1.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/

  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(mergeConfig(config || {}, {
        method,
        headers: isForm ? {
          'Content-Type': 'multipart/form-data'
        } : {},
        url,
        data
      }));
    };
  }

  Axios.prototype[method] = generateHTTPMethod();

  Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
});

var Axios$1 = Axios;

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @param {Function} executor The executor function.
 *
 * @returns {CancelToken}
 */
class CancelToken {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function.');
    }

    let resolvePromise;

    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });

    const token = this;

    // eslint-disable-next-line func-names
    this.promise.then(cancel => {
      if (!token._listeners) return;

      let i = token._listeners.length;

      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });

    // eslint-disable-next-line func-names
    this.promise.then = onfulfilled => {
      let _resolve;
      // eslint-disable-next-line func-names
      const promise = new Promise(resolve => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);

      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };

      return promise;
    };

    executor(function cancel(message, config, request) {
      if (token.reason) {
        // Cancellation has already been requested
        return;
      }

      token.reason = new CanceledError(message, config, request);
      resolvePromise(token.reason);
    });
  }

  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }

  /**
   * Subscribe to the cancel signal
   */

  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }

    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }

  /**
   * Unsubscribe from the cancel signal
   */

  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }

  toAbortSignal() {
    const controller = new AbortController();

    const abort = (err) => {
      controller.abort(err);
    };

    this.subscribe(abort);

    controller.signal.unsubscribe = () => this.unsubscribe(abort);

    return controller.signal;
  }

  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  }
}

var CancelToken$1 = CancelToken;

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 *
 * @returns {Function}
 */
function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 *
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
function isAxiosError(payload) {
  return utils$1.isObject(payload) && (payload.isAxiosError === true);
}

const HttpStatusCode = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};

Object.entries(HttpStatusCode).forEach(([key, value]) => {
  HttpStatusCode[value] = key;
});

var HttpStatusCode$1 = HttpStatusCode;

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 *
 * @returns {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  const context = new Axios$1(defaultConfig);
  const instance = bind(Axios$1.prototype.request, context);

  // Copy axios.prototype to instance
  utils$1.extend(instance, Axios$1.prototype, context, {allOwnKeys: true});

  // Copy context to instance
  utils$1.extend(instance, context, null, {allOwnKeys: true});

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
const axios = createInstance(defaults$1);

// Expose Axios class to allow class inheritance
axios.Axios = Axios$1;

// Expose Cancel & CancelToken
axios.CanceledError = CanceledError;
axios.CancelToken = CancelToken$1;
axios.isCancel = isCancel;
axios.VERSION = VERSION;
axios.toFormData = toFormData;

// Expose AxiosError class
axios.AxiosError = AxiosError;

// alias for CanceledError for backward compatibility
axios.Cancel = axios.CanceledError;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = spread;

// Expose isAxiosError
axios.isAxiosError = isAxiosError;

// Expose mergeConfig
axios.mergeConfig = mergeConfig;

axios.AxiosHeaders = AxiosHeaders$1;

axios.formToJSON = thing => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);

axios.getAdapter = adapters.getAdapter;

axios.HttpStatusCode = HttpStatusCode$1;

axios.default = axios;

module.exports = axios;
//# sourceMappingURL=axios.cjs.map


/***/ }),

/***/ "./node_modules/date-fns/_lib/addLeadingZeros.cjs":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/_lib/addLeadingZeros.cjs ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.addLeadingZeros = addLeadingZeros;
function addLeadingZeros(number, targetLength) {
  const sign = number < 0 ? "-" : "";
  const output = Math.abs(number).toString().padStart(targetLength, "0");
  return sign + output;
}


/***/ }),

/***/ "./node_modules/date-fns/_lib/defaultLocale.cjs":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/_lib/defaultLocale.cjs ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "defaultLocale", ({
  enumerable: true,
  get: function () {
    return _index.enUS;
  },
}));
var _index = __webpack_require__(/*! ../locale/en-US.cjs */ "./node_modules/date-fns/locale/en-US.cjs");


/***/ }),

/***/ "./node_modules/date-fns/_lib/defaultOptions.cjs":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/_lib/defaultOptions.cjs ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.getDefaultOptions = getDefaultOptions;
exports.setDefaultOptions = setDefaultOptions;

let defaultOptions = {};

function getDefaultOptions() {
  return defaultOptions;
}

function setDefaultOptions(newOptions) {
  defaultOptions = newOptions;
}


/***/ }),

/***/ "./node_modules/date-fns/_lib/format/formatters.cjs":
/*!**********************************************************!*\
  !*** ./node_modules/date-fns/_lib/format/formatters.cjs ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.formatters = void 0;
var _index = __webpack_require__(/*! ../../getDayOfYear.cjs */ "./node_modules/date-fns/getDayOfYear.cjs");
var _index2 = __webpack_require__(/*! ../../getISOWeek.cjs */ "./node_modules/date-fns/getISOWeek.cjs");
var _index3 = __webpack_require__(/*! ../../getISOWeekYear.cjs */ "./node_modules/date-fns/getISOWeekYear.cjs");
var _index4 = __webpack_require__(/*! ../../getWeek.cjs */ "./node_modules/date-fns/getWeek.cjs");
var _index5 = __webpack_require__(/*! ../../getWeekYear.cjs */ "./node_modules/date-fns/getWeekYear.cjs");

var _index6 = __webpack_require__(/*! ../addLeadingZeros.cjs */ "./node_modules/date-fns/_lib/addLeadingZeros.cjs");
var _index7 = __webpack_require__(/*! ./lightFormatters.cjs */ "./node_modules/date-fns/_lib/format/lightFormatters.cjs");

const dayPeriodEnum = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night",
};

/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* | Milliseconds in day            |
 * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
 * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
 * |  d  | Day of month                   |  D  | Day of year                    |
 * |  e  | Local day of week              |  E  | Day of week                    |
 * |  f  |                                |  F* | Day of week in month           |
 * |  g* | Modified Julian day            |  G  | Era                            |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  i! | ISO day of week                |  I! | ISO week of year               |
 * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
 * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
 * |  l* | (deprecated)                   |  L  | Stand-alone month              |
 * |  m  | Minute                         |  M  | Month                          |
 * |  n  |                                |  N  |                                |
 * |  o! | Ordinal number modifier        |  O  | Timezone (GMT)                 |
 * |  p! | Long localized time            |  P! | Long localized date            |
 * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
 * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
 * |  u  | Extended year                  |  U* | Cyclic year                    |
 * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
 * |  w  | Local week of year             |  W* | Week of month                  |
 * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
 * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
 * |  z  | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 *
 * Letters marked by ! are non-standard, but implemented by date-fns:
 * - `o` modifies the previous token to turn it into an ordinal (see `format` docs)
 * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
 *   i.e. 7 for Sunday, 1 for Monday, etc.
 * - `I` is ISO week of year, as opposed to `w` which is local week of year.
 * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
 *   `R` is supposed to be used in conjunction with `I` and `i`
 *   for universal ISO week-numbering date, whereas
 *   `Y` is supposed to be used in conjunction with `w` and `e`
 *   for week-numbering date specific to the locale.
 * - `P` is long localized date format
 * - `p` is long localized time format
 */

const formatters = (exports.formatters = {
  // Era
  G: function (date, token, localize) {
    const era = date.getFullYear() > 0 ? 1 : 0;
    switch (token) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return localize.era(era, { width: "abbreviated" });
      // A, B
      case "GGGGG":
        return localize.era(era, { width: "narrow" });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return localize.era(era, { width: "wide" });
    }
  },

  // Year
  y: function (date, token, localize) {
    // Ordinal number
    if (token === "yo") {
      const signedYear = date.getFullYear();
      // Returns 1 for 1 BC (which is year 0 in JavaScript)
      const year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize.ordinalNumber(year, { unit: "year" });
    }

    return _index7.lightFormatters.y(date, token);
  },

  // Local week-numbering year
  Y: function (date, token, localize, options) {
    const signedWeekYear = (0, _index5.getWeekYear)(date, options);
    // Returns 1 for 1 BC (which is year 0 in JavaScript)
    const weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;

    // Two digit year
    if (token === "YY") {
      const twoDigitYear = weekYear % 100;
      return (0, _index6.addLeadingZeros)(twoDigitYear, 2);
    }

    // Ordinal number
    if (token === "Yo") {
      return localize.ordinalNumber(weekYear, { unit: "year" });
    }

    // Padding
    return (0, _index6.addLeadingZeros)(weekYear, token.length);
  },

  // ISO week-numbering year
  R: function (date, token) {
    const isoWeekYear = (0, _index3.getISOWeekYear)(date);

    // Padding
    return (0, _index6.addLeadingZeros)(isoWeekYear, token.length);
  },

  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function (date, token) {
    const year = date.getFullYear();
    return (0, _index6.addLeadingZeros)(year, token.length);
  },

  // Quarter
  Q: function (date, token, localize) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      // 1, 2, 3, 4
      case "Q":
        return String(quarter);
      // 01, 02, 03, 04
      case "QQ":
        return (0, _index6.addLeadingZeros)(quarter, 2);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return localize.ordinalNumber(quarter, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return localize.quarter(quarter, {
          width: "abbreviated",
          context: "formatting",
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return localize.quarter(quarter, {
          width: "narrow",
          context: "formatting",
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return localize.quarter(quarter, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // Stand-alone quarter
  q: function (date, token, localize) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      // 1, 2, 3, 4
      case "q":
        return String(quarter);
      // 01, 02, 03, 04
      case "qq":
        return (0, _index6.addLeadingZeros)(quarter, 2);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return localize.ordinalNumber(quarter, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return localize.quarter(quarter, {
          width: "abbreviated",
          context: "standalone",
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return localize.quarter(quarter, {
          width: "narrow",
          context: "standalone",
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return localize.quarter(quarter, {
          width: "wide",
          context: "standalone",
        });
    }
  },

  // Month
  M: function (date, token, localize) {
    const month = date.getMonth();
    switch (token) {
      case "M":
      case "MM":
        return _index7.lightFormatters.M(date, token);
      // 1st, 2nd, ..., 12th
      case "Mo":
        return localize.ordinalNumber(month + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "MMM":
        return localize.month(month, {
          width: "abbreviated",
          context: "formatting",
        });
      // J, F, ..., D
      case "MMMMM":
        return localize.month(month, {
          width: "narrow",
          context: "formatting",
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return localize.month(month, { width: "wide", context: "formatting" });
    }
  },

  // Stand-alone month
  L: function (date, token, localize) {
    const month = date.getMonth();
    switch (token) {
      // 1, 2, ..., 12
      case "L":
        return String(month + 1);
      // 01, 02, ..., 12
      case "LL":
        return (0, _index6.addLeadingZeros)(month + 1, 2);
      // 1st, 2nd, ..., 12th
      case "Lo":
        return localize.ordinalNumber(month + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "LLL":
        return localize.month(month, {
          width: "abbreviated",
          context: "standalone",
        });
      // J, F, ..., D
      case "LLLLL":
        return localize.month(month, {
          width: "narrow",
          context: "standalone",
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return localize.month(month, { width: "wide", context: "standalone" });
    }
  },

  // Local week of year
  w: function (date, token, localize, options) {
    const week = (0, _index4.getWeek)(date, options);

    if (token === "wo") {
      return localize.ordinalNumber(week, { unit: "week" });
    }

    return (0, _index6.addLeadingZeros)(week, token.length);
  },

  // ISO week of year
  I: function (date, token, localize) {
    const isoWeek = (0, _index2.getISOWeek)(date);

    if (token === "Io") {
      return localize.ordinalNumber(isoWeek, { unit: "week" });
    }

    return (0, _index6.addLeadingZeros)(isoWeek, token.length);
  },

  // Day of the month
  d: function (date, token, localize) {
    if (token === "do") {
      return localize.ordinalNumber(date.getDate(), { unit: "date" });
    }

    return _index7.lightFormatters.d(date, token);
  },

  // Day of year
  D: function (date, token, localize) {
    const dayOfYear = (0, _index.getDayOfYear)(date);

    if (token === "Do") {
      return localize.ordinalNumber(dayOfYear, { unit: "dayOfYear" });
    }

    return (0, _index6.addLeadingZeros)(dayOfYear, token.length);
  },

  // Day of week
  E: function (date, token, localize) {
    const dayOfWeek = date.getDay();
    switch (token) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting",
        });
      // T
      case "EEEEE":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "formatting",
        });
      // Tu
      case "EEEEEE":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "formatting",
        });
      // Tuesday
      case "EEEE":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // Local day of week
  e: function (date, token, localize, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case "e":
        return String(localDayOfWeek);
      // Padded numerical value
      case "ee":
        return (0, _index6.addLeadingZeros)(localDayOfWeek, 2);
      // 1st, 2nd, ..., 7th
      case "eo":
        return localize.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "eee":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting",
        });
      // T
      case "eeeee":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "formatting",
        });
      // Tu
      case "eeeeee":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "formatting",
        });
      // Tuesday
      case "eeee":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // Stand-alone local day of week
  c: function (date, token, localize, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      // Numerical value (same as in `e`)
      case "c":
        return String(localDayOfWeek);
      // Padded numerical value
      case "cc":
        return (0, _index6.addLeadingZeros)(localDayOfWeek, token.length);
      // 1st, 2nd, ..., 7th
      case "co":
        return localize.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "ccc":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "standalone",
        });
      // T
      case "ccccc":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "standalone",
        });
      // Tu
      case "cccccc":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "standalone",
        });
      // Tuesday
      case "cccc":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "standalone",
        });
    }
  },

  // ISO day of week
  i: function (date, token, localize) {
    const dayOfWeek = date.getDay();
    const isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    switch (token) {
      // 2
      case "i":
        return String(isoDayOfWeek);
      // 02
      case "ii":
        return (0, _index6.addLeadingZeros)(isoDayOfWeek, token.length);
      // 2nd
      case "io":
        return localize.ordinalNumber(isoDayOfWeek, { unit: "day" });
      // Tue
      case "iii":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting",
        });
      // T
      case "iiiii":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "formatting",
        });
      // Tu
      case "iiiiii":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "formatting",
        });
      // Tuesday
      case "iiii":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // AM or PM
  a: function (date, token, localize) {
    const hours = date.getHours();
    const dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";

    switch (token) {
      case "a":
      case "aa":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting",
        });
      case "aaa":
        return localize
          .dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting",
          })
          .toLowerCase();
      case "aaaaa":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting",
        });
      case "aaaa":
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // AM, PM, midnight, noon
  b: function (date, token, localize) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon;
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight;
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    }

    switch (token) {
      case "b":
      case "bb":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting",
        });
      case "bbb":
        return localize
          .dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting",
          })
          .toLowerCase();
      case "bbbbb":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting",
        });
      case "bbbb":
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // in the morning, in the afternoon, in the evening, at night
  B: function (date, token, localize) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening;
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon;
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning;
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night;
    }

    switch (token) {
      case "B":
      case "BB":
      case "BBB":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting",
        });
      case "BBBBB":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting",
        });
      case "BBBB":
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // Hour [1-12]
  h: function (date, token, localize) {
    if (token === "ho") {
      let hours = date.getHours() % 12;
      if (hours === 0) hours = 12;
      return localize.ordinalNumber(hours, { unit: "hour" });
    }

    return _index7.lightFormatters.h(date, token);
  },

  // Hour [0-23]
  H: function (date, token, localize) {
    if (token === "Ho") {
      return localize.ordinalNumber(date.getHours(), { unit: "hour" });
    }

    return _index7.lightFormatters.H(date, token);
  },

  // Hour [0-11]
  K: function (date, token, localize) {
    const hours = date.getHours() % 12;

    if (token === "Ko") {
      return localize.ordinalNumber(hours, { unit: "hour" });
    }

    return (0, _index6.addLeadingZeros)(hours, token.length);
  },

  // Hour [1-24]
  k: function (date, token, localize) {
    let hours = date.getHours();
    if (hours === 0) hours = 24;

    if (token === "ko") {
      return localize.ordinalNumber(hours, { unit: "hour" });
    }

    return (0, _index6.addLeadingZeros)(hours, token.length);
  },

  // Minute
  m: function (date, token, localize) {
    if (token === "mo") {
      return localize.ordinalNumber(date.getMinutes(), { unit: "minute" });
    }

    return _index7.lightFormatters.m(date, token);
  },

  // Second
  s: function (date, token, localize) {
    if (token === "so") {
      return localize.ordinalNumber(date.getSeconds(), { unit: "second" });
    }

    return _index7.lightFormatters.s(date, token);
  },

  // Fraction of second
  S: function (date, token) {
    return _index7.lightFormatters.S(date, token);
  },

  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function (date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();

    if (timezoneOffset === 0) {
      return "Z";
    }

    switch (token) {
      // Hours and optional minutes
      case "X":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);

      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX": // Hours and minutes without `:` delimiter
        return formatTimezone(timezoneOffset);

      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX": // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },

  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function (date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();

    switch (token) {
      // Hours and optional minutes
      case "x":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);

      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx": // Hours and minutes without `:` delimiter
        return formatTimezone(timezoneOffset);

      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx": // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },

  // Timezone (GMT)
  O: function (date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();

    switch (token) {
      // Short
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },

  // Timezone (specific non-location)
  z: function (date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();

    switch (token) {
      // Short
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },

  // Seconds timestamp
  t: function (date, token, _localize) {
    const timestamp = Math.trunc(+date / 1000);
    return (0, _index6.addLeadingZeros)(timestamp, token.length);
  },

  // Milliseconds timestamp
  T: function (date, token, _localize) {
    return (0, _index6.addLeadingZeros)(+date, token.length);
  },
});

function formatTimezoneShort(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = Math.trunc(absOffset / 60);
  const minutes = absOffset % 60;
  if (minutes === 0) {
    return sign + String(hours);
  }
  return (
    sign + String(hours) + delimiter + (0, _index6.addLeadingZeros)(minutes, 2)
  );
}

function formatTimezoneWithOptionalMinutes(offset, delimiter) {
  if (offset % 60 === 0) {
    const sign = offset > 0 ? "-" : "+";
    return sign + (0, _index6.addLeadingZeros)(Math.abs(offset) / 60, 2);
  }
  return formatTimezone(offset, delimiter);
}

function formatTimezone(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = (0, _index6.addLeadingZeros)(Math.trunc(absOffset / 60), 2);
  const minutes = (0, _index6.addLeadingZeros)(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}


/***/ }),

/***/ "./node_modules/date-fns/_lib/format/lightFormatters.cjs":
/*!***************************************************************!*\
  !*** ./node_modules/date-fns/_lib/format/lightFormatters.cjs ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.lightFormatters = void 0;
var _index = __webpack_require__(/*! ../addLeadingZeros.cjs */ "./node_modules/date-fns/_lib/addLeadingZeros.cjs");

/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* |                                |
 * |  d  | Day of month                   |  D  |                                |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  m  | Minute                         |  M  | Month                          |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  y  | Year (abs)                     |  Y  |                                |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 */

const lightFormatters = (exports.lightFormatters = {
  // Year
  y(date, token) {
    // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_tokens
    // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
    // |----------|-------|----|-------|-------|-------|
    // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
    // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
    // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
    // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
    // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |

    const signedYear = date.getFullYear();
    // Returns 1 for 1 BC (which is year 0 in JavaScript)
    const year = signedYear > 0 ? signedYear : 1 - signedYear;
    return (0, _index.addLeadingZeros)(
      token === "yy" ? year % 100 : year,
      token.length,
    );
  },

  // Month
  M(date, token) {
    const month = date.getMonth();
    return token === "M"
      ? String(month + 1)
      : (0, _index.addLeadingZeros)(month + 1, 2);
  },

  // Day of the month
  d(date, token) {
    return (0, _index.addLeadingZeros)(date.getDate(), token.length);
  },

  // AM or PM
  a(date, token) {
    const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";

    switch (token) {
      case "a":
      case "aa":
        return dayPeriodEnumValue.toUpperCase();
      case "aaa":
        return dayPeriodEnumValue;
      case "aaaaa":
        return dayPeriodEnumValue[0];
      case "aaaa":
      default:
        return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
    }
  },

  // Hour [1-12]
  h(date, token) {
    return (0, _index.addLeadingZeros)(
      date.getHours() % 12 || 12,
      token.length,
    );
  },

  // Hour [0-23]
  H(date, token) {
    return (0, _index.addLeadingZeros)(date.getHours(), token.length);
  },

  // Minute
  m(date, token) {
    return (0, _index.addLeadingZeros)(date.getMinutes(), token.length);
  },

  // Second
  s(date, token) {
    return (0, _index.addLeadingZeros)(date.getSeconds(), token.length);
  },

  // Fraction of second
  S(date, token) {
    const numberOfDigits = token.length;
    const milliseconds = date.getMilliseconds();
    const fractionalSeconds = Math.trunc(
      milliseconds * Math.pow(10, numberOfDigits - 3),
    );
    return (0, _index.addLeadingZeros)(fractionalSeconds, token.length);
  },
});


/***/ }),

/***/ "./node_modules/date-fns/_lib/format/longFormatters.cjs":
/*!**************************************************************!*\
  !*** ./node_modules/date-fns/_lib/format/longFormatters.cjs ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.longFormatters = void 0;

const dateLongFormatter = (pattern, formatLong) => {
  switch (pattern) {
    case "P":
      return formatLong.date({ width: "short" });
    case "PP":
      return formatLong.date({ width: "medium" });
    case "PPP":
      return formatLong.date({ width: "long" });
    case "PPPP":
    default:
      return formatLong.date({ width: "full" });
  }
};

const timeLongFormatter = (pattern, formatLong) => {
  switch (pattern) {
    case "p":
      return formatLong.time({ width: "short" });
    case "pp":
      return formatLong.time({ width: "medium" });
    case "ppp":
      return formatLong.time({ width: "long" });
    case "pppp":
    default:
      return formatLong.time({ width: "full" });
  }
};

const dateTimeLongFormatter = (pattern, formatLong) => {
  const matchResult = pattern.match(/(P+)(p+)?/) || [];
  const datePattern = matchResult[1];
  const timePattern = matchResult[2];

  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong);
  }

  let dateTimeFormat;

  switch (datePattern) {
    case "P":
      dateTimeFormat = formatLong.dateTime({ width: "short" });
      break;
    case "PP":
      dateTimeFormat = formatLong.dateTime({ width: "medium" });
      break;
    case "PPP":
      dateTimeFormat = formatLong.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      dateTimeFormat = formatLong.dateTime({ width: "full" });
      break;
  }

  return dateTimeFormat
    .replace("{{date}}", dateLongFormatter(datePattern, formatLong))
    .replace("{{time}}", timeLongFormatter(timePattern, formatLong));
};

const longFormatters = (exports.longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter,
});


/***/ }),

/***/ "./node_modules/date-fns/_lib/getRoundingMethod.cjs":
/*!**********************************************************!*\
  !*** ./node_modules/date-fns/_lib/getRoundingMethod.cjs ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.getRoundingMethod = getRoundingMethod;

function getRoundingMethod(method) {
  return (number) => {
    const round = method ? Math[method] : Math.trunc;
    const result = round(number);
    // Prevent negative zero
    return result === 0 ? 0 : result;
  };
}


/***/ }),

/***/ "./node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.cjs":
/*!************************************************************************!*\
  !*** ./node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.cjs ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getTimezoneOffsetInMilliseconds = getTimezoneOffsetInMilliseconds;
var _index = __webpack_require__(/*! ../toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
 * They usually appear for dates that denote time before the timezones were introduced
 * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
 * and GMT+01:00:00 after that date)
 *
 * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
 * which would lead to incorrect calculations.
 *
 * This function returns the timezone offset in milliseconds that takes seconds in account.
 */
function getTimezoneOffsetInMilliseconds(date) {
  const _date = (0, _index.toDate)(date);
  const utcDate = new Date(
    Date.UTC(
      _date.getFullYear(),
      _date.getMonth(),
      _date.getDate(),
      _date.getHours(),
      _date.getMinutes(),
      _date.getSeconds(),
      _date.getMilliseconds(),
    ),
  );
  utcDate.setUTCFullYear(_date.getFullYear());
  return +date - +utcDate;
}


/***/ }),

/***/ "./node_modules/date-fns/_lib/normalizeDates.cjs":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/_lib/normalizeDates.cjs ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.normalizeDates = normalizeDates;
var _index = __webpack_require__(/*! ../constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");

function normalizeDates(context, ...dates) {
  const normalize = _index.constructFrom.bind(
    null,
    context || dates.find((date) => typeof date === "object"),
  );
  return dates.map(normalize);
}


/***/ }),

/***/ "./node_modules/date-fns/_lib/normalizeInterval.cjs":
/*!**********************************************************!*\
  !*** ./node_modules/date-fns/_lib/normalizeInterval.cjs ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.normalizeInterval = normalizeInterval;
var _index = __webpack_require__(/*! ./normalizeDates.cjs */ "./node_modules/date-fns/_lib/normalizeDates.cjs");

function normalizeInterval(context, interval) {
  const [start, end] = (0, _index.normalizeDates)(
    context,
    interval.start,
    interval.end,
  );
  return { start, end };
}


/***/ }),

/***/ "./node_modules/date-fns/_lib/protectedTokens.cjs":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/_lib/protectedTokens.cjs ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.isProtectedDayOfYearToken = isProtectedDayOfYearToken;
exports.isProtectedWeekYearToken = isProtectedWeekYearToken;
exports.warnOrThrowProtectedError = warnOrThrowProtectedError;
const dayOfYearTokenRE = /^D+$/;
const weekYearTokenRE = /^Y+$/;

const throwTokens = ["D", "DD", "YY", "YYYY"];

function isProtectedDayOfYearToken(token) {
  return dayOfYearTokenRE.test(token);
}

function isProtectedWeekYearToken(token) {
  return weekYearTokenRE.test(token);
}

function warnOrThrowProtectedError(token, format, input) {
  const _message = message(token, format, input);
  console.warn(_message);
  if (throwTokens.includes(token)) throw new RangeError(_message);
}

function message(token, format, input) {
  const subject = token[0] === "Y" ? "years" : "days of the month";
  return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${format}\`) for formatting ${subject} to the input \`${input}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}


/***/ }),

/***/ "./node_modules/date-fns/add.cjs":
/*!***************************************!*\
  !*** ./node_modules/date-fns/add.cjs ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.add = add;
var _index = __webpack_require__(/*! ./addDays.cjs */ "./node_modules/date-fns/addDays.cjs");
var _index2 = __webpack_require__(/*! ./addMonths.cjs */ "./node_modules/date-fns/addMonths.cjs");
var _index3 = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
var _index4 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link add} function options.
 */

/**
 * @name add
 * @category Common Helpers
 * @summary Add the specified years, months, weeks, days, hours, minutes, and seconds to the given date.
 *
 * @description
 * Add the specified years, months, weeks, days, hours, minutes, and seconds to the given date.
 *
 * @typeParam DateType - The `Date` type the function operates on. Gets inferred from passed arguments. Allows using extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param duration - The object with years, months, weeks, days, hours, minutes, and seconds to be added.
 * @param options - An object with options
 *
 * @returns The new date with the seconds added
 *
 * @example
 * // Add the following duration to 1 September 2014, 10:19:50
 * const result = add(new Date(2014, 8, 1, 10, 19, 50), {
 *   years: 2,
 *   months: 9,
 *   weeks: 1,
 *   days: 7,
 *   hours: 5,
 *   minutes: 9,
 *   seconds: 30,
 * })
 * //=> Thu Jun 15 2017 15:29:20
 */
function add(date, duration, options) {
  const {
    years = 0,
    months = 0,
    weeks = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
  } = duration;

  // Add years and months
  const _date = (0, _index4.toDate)(date, options?.in);
  const dateWithMonths =
    months || years
      ? (0, _index2.addMonths)(_date, months + years * 12)
      : _date;

  // Add weeks and days
  const dateWithDays =
    days || weeks
      ? (0, _index.addDays)(dateWithMonths, days + weeks * 7)
      : dateWithMonths;

  // Add days, hours, minutes, and seconds
  const minutesToAdd = minutes + hours * 60;
  const secondsToAdd = seconds + minutesToAdd * 60;
  const msToAdd = secondsToAdd * 1000;

  return (0, _index3.constructFrom)(
    options?.in || date,
    +dateWithDays + msToAdd,
  );
}


/***/ }),

/***/ "./node_modules/date-fns/addBusinessDays.cjs":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/addBusinessDays.cjs ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.addBusinessDays = addBusinessDays;
var _index = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
var _index2 = __webpack_require__(/*! ./isSaturday.cjs */ "./node_modules/date-fns/isSaturday.cjs");
var _index3 = __webpack_require__(/*! ./isSunday.cjs */ "./node_modules/date-fns/isSunday.cjs");
var _index4 = __webpack_require__(/*! ./isWeekend.cjs */ "./node_modules/date-fns/isWeekend.cjs");
var _index5 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link addBusinessDays} function options.
 */

/**
 * @name addBusinessDays
 * @category Day Helpers
 * @summary Add the specified number of business days (mon - fri) to the given date.
 *
 * @description
 * Add the specified number of business days (mon - fri) to the given date, ignoring weekends.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of business days to be added.
 * @param options - An object with options
 *
 * @returns The new date with the business days added
 *
 * @example
 * // Add 10 business days to 1 September 2014:
 * const result = addBusinessDays(new Date(2014, 8, 1), 10)
 * //=> Mon Sep 15 2014 00:00:00 (skipped weekend days)
 */
function addBusinessDays(date, amount, options) {
  const _date = (0, _index5.toDate)(date, options?.in);
  const startedOnWeekend = (0, _index4.isWeekend)(_date, options);

  if (isNaN(amount)) return (0, _index.constructFrom)(options?.in, NaN);

  const hours = _date.getHours();
  const sign = amount < 0 ? -1 : 1;
  const fullWeeks = Math.trunc(amount / 5);

  _date.setDate(_date.getDate() + fullWeeks * 7);

  // Get remaining days not part of a full week
  let restDays = Math.abs(amount % 5);

  // Loops over remaining days
  while (restDays > 0) {
    _date.setDate(_date.getDate() + sign);
    if (!(0, _index4.isWeekend)(_date, options)) restDays -= 1;
  }

  // If the date is a weekend day and we reduce a dividable of
  // 5 from it, we land on a weekend date.
  // To counter this, we add days accordingly to land on the next business day
  if (
    startedOnWeekend &&
    (0, _index4.isWeekend)(_date, options) &&
    amount !== 0
  ) {
    // If we're reducing days, we want to add days until we land on a weekday
    // If we're adding days we want to reduce days until we land on a weekday
    if ((0, _index2.isSaturday)(_date, options))
      _date.setDate(_date.getDate() + (sign < 0 ? 2 : -1));
    if ((0, _index3.isSunday)(_date, options))
      _date.setDate(_date.getDate() + (sign < 0 ? 1 : -2));
  }

  // Restore hours to avoid DST lag
  _date.setHours(hours);

  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/addDays.cjs":
/*!*******************************************!*\
  !*** ./node_modules/date-fns/addDays.cjs ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.addDays = addDays;
var _index = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
var _index2 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link addDays} function options.
 */

/**
 * @name addDays
 * @category Day Helpers
 * @summary Add the specified number of days to the given date.
 *
 * @description
 * Add the specified number of days to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of days to be added.
 * @param options - An object with options
 *
 * @returns The new date with the days added
 *
 * @example
 * // Add 10 days to 1 September 2014:
 * const result = addDays(new Date(2014, 8, 1), 10)
 * //=> Thu Sep 11 2014 00:00:00
 */
function addDays(date, amount, options) {
  const _date = (0, _index2.toDate)(date, options?.in);
  if (isNaN(amount)) return (0, _index.constructFrom)(options?.in || date, NaN);

  // If 0 days, no-op to avoid changing times in the hour before end of DST
  if (!amount) return _date;

  _date.setDate(_date.getDate() + amount);
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/addHours.cjs":
/*!********************************************!*\
  !*** ./node_modules/date-fns/addHours.cjs ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.addHours = addHours;
var _index = __webpack_require__(/*! ./addMilliseconds.cjs */ "./node_modules/date-fns/addMilliseconds.cjs");
var _index2 = __webpack_require__(/*! ./constants.cjs */ "./node_modules/date-fns/constants.cjs");

/**
 * The {@link addHours} function options.
 */

/**
 * @name addHours
 * @category Hour Helpers
 * @summary Add the specified number of hours to the given date.
 *
 * @description
 * Add the specified number of hours to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of hours to be added
 * @param options - An object with options
 *
 * @returns The new date with the hours added
 *
 * @example
 * // Add 2 hours to 10 July 2014 23:00:00:
 * const result = addHours(new Date(2014, 6, 10, 23, 0), 2)
 * //=> Fri Jul 11 2014 01:00:00
 */
function addHours(date, amount, options) {
  return (0, _index.addMilliseconds)(
    date,
    amount * _index2.millisecondsInHour,
    options,
  );
}


/***/ }),

/***/ "./node_modules/date-fns/addISOWeekYears.cjs":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/addISOWeekYears.cjs ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.addISOWeekYears = addISOWeekYears;
var _index = __webpack_require__(/*! ./getISOWeekYear.cjs */ "./node_modules/date-fns/getISOWeekYear.cjs");
var _index2 = __webpack_require__(/*! ./setISOWeekYear.cjs */ "./node_modules/date-fns/setISOWeekYear.cjs");

/**
 * The {@link addISOWeekYears} function options.
 */

/**
 * @name addISOWeekYears
 * @category ISO Week-Numbering Year Helpers
 * @summary Add the specified number of ISO week-numbering years to the given date.
 *
 * @description
 * Add the specified number of ISO week-numbering years to the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to be changed
 * @param amount - The amount of ISO week-numbering years to be added.
 * @param options - An object with options
 *
 * @returns The new date with the ISO week-numbering years added
 *
 * @example
 * // Add 5 ISO week-numbering years to 2 July 2010:
 * const result = addISOWeekYears(new Date(2010, 6, 2), 5)
 * //=> Fri Jun 26 2015 00:00:00
 */
function addISOWeekYears(date, amount, options) {
  return (0, _index2.setISOWeekYear)(
    date,
    (0, _index.getISOWeekYear)(date, options) + amount,
    options,
  );
}


/***/ }),

/***/ "./node_modules/date-fns/addMilliseconds.cjs":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/addMilliseconds.cjs ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.addMilliseconds = addMilliseconds;
var _index = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
var _index2 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link addMilliseconds} function options.
 */

/**
 * @name addMilliseconds
 * @category Millisecond Helpers
 * @summary Add the specified number of milliseconds to the given date.
 *
 * @description
 * Add the specified number of milliseconds to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of milliseconds to be added.
 * @param options - The options object
 *
 * @returns The new date with the milliseconds added
 *
 * @example
 * // Add 750 milliseconds to 10 July 2014 12:45:30.000:
 * const result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
 * //=> Thu Jul 10 2014 12:45:30.750
 */
function addMilliseconds(date, amount, options) {
  return (0, _index.constructFrom)(
    options?.in || date,
    +(0, _index2.toDate)(date) + amount,
  );
}


/***/ }),

/***/ "./node_modules/date-fns/addMinutes.cjs":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/addMinutes.cjs ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.addMinutes = addMinutes;
var _index = __webpack_require__(/*! ./constants.cjs */ "./node_modules/date-fns/constants.cjs");
var _index2 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link addMinutes} function options.
 */

/**
 * @name addMinutes
 * @category Minute Helpers
 * @summary Add the specified number of minutes to the given date.
 *
 * @description
 * Add the specified number of minutes to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of minutes to be added.
 * @param options - An object with options
 *
 * @returns The new date with the minutes added
 *
 * @example
 * // Add 30 minutes to 10 July 2014 12:00:00:
 * const result = addMinutes(new Date(2014, 6, 10, 12, 0), 30)
 * //=> Thu Jul 10 2014 12:30:00
 */
function addMinutes(date, amount, options) {
  const _date = (0, _index2.toDate)(date, options?.in);
  _date.setTime(_date.getTime() + amount * _index.millisecondsInMinute);
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/addMonths.cjs":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/addMonths.cjs ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.addMonths = addMonths;
var _index = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
var _index2 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link addMonths} function options.
 */

/**
 * @name addMonths
 * @category Month Helpers
 * @summary Add the specified number of months to the given date.
 *
 * @description
 * Add the specified number of months to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of months to be added.
 * @param options - The options object
 *
 * @returns The new date with the months added
 *
 * @example
 * // Add 5 months to 1 September 2014:
 * const result = addMonths(new Date(2014, 8, 1), 5)
 * //=> Sun Feb 01 2015 00:00:00
 *
 * // Add one month to 30 January 2023:
 * const result = addMonths(new Date(2023, 0, 30), 1)
 * //=> Tue Feb 28 2023 00:00:00
 */
function addMonths(date, amount, options) {
  const _date = (0, _index2.toDate)(date, options?.in);
  if (isNaN(amount)) return (0, _index.constructFrom)(options?.in || date, NaN);
  if (!amount) {
    // If 0 months, no-op to avoid changing times in the hour before end of DST
    return _date;
  }
  const dayOfMonth = _date.getDate();

  // The JS Date object supports date math by accepting out-of-bounds values for
  // month, day, etc. For example, new Date(2020, 0, 0) returns 31 Dec 2019 and
  // new Date(2020, 13, 1) returns 1 Feb 2021.  This is *almost* the behavior we
  // want except that dates will wrap around the end of a month, meaning that
  // new Date(2020, 13, 31) will return 3 Mar 2021 not 28 Feb 2021 as desired. So
  // we'll default to the end of the desired month by adding 1 to the desired
  // month and using a date of 0 to back up one day to the end of the desired
  // month.
  const endOfDesiredMonth = (0, _index.constructFrom)(
    options?.in || date,
    _date.getTime(),
  );
  endOfDesiredMonth.setMonth(_date.getMonth() + amount + 1, 0);
  const daysInMonth = endOfDesiredMonth.getDate();
  if (dayOfMonth >= daysInMonth) {
    // If we're already at the end of the month, then this is the correct date
    // and we're done.
    return endOfDesiredMonth;
  } else {
    // Otherwise, we now know that setting the original day-of-month value won't
    // cause an overflow, so set the desired day-of-month. Note that we can't
    // just set the date of `endOfDesiredMonth` because that object may have had
    // its time changed in the unusual case where where a DST transition was on
    // the last day of the month and its local time was in the hour skipped or
    // repeated next to a DST transition.  So we use `date` instead which is
    // guaranteed to still have the original time.
    _date.setFullYear(
      endOfDesiredMonth.getFullYear(),
      endOfDesiredMonth.getMonth(),
      dayOfMonth,
    );
    return _date;
  }
}


/***/ }),

/***/ "./node_modules/date-fns/addQuarters.cjs":
/*!***********************************************!*\
  !*** ./node_modules/date-fns/addQuarters.cjs ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.addQuarters = addQuarters;
var _index = __webpack_require__(/*! ./addMonths.cjs */ "./node_modules/date-fns/addMonths.cjs");

/**
 * The {@link addQuarters} function options.
 */

/**
 * @name addQuarters
 * @category Quarter Helpers
 * @summary Add the specified number of year quarters to the given date.
 *
 * @description
 * Add the specified number of year quarters to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of quarters to be added.
 * @param options - An object with options
 *
 * @returns The new date with the quarters added
 *
 * @example
 * // Add 1 quarter to 1 September 2014:
 * const result = addQuarters(new Date(2014, 8, 1), 1)
 * //=; Mon Dec 01 2014 00:00:00
 */
function addQuarters(date, amount, options) {
  return (0, _index.addMonths)(date, amount * 3, options);
}


/***/ }),

/***/ "./node_modules/date-fns/addSeconds.cjs":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/addSeconds.cjs ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.addSeconds = addSeconds;
var _index = __webpack_require__(/*! ./addMilliseconds.cjs */ "./node_modules/date-fns/addMilliseconds.cjs");

/**
 * The {@link addSeconds} function options.
 */

/**
 * @name addSeconds
 * @category Second Helpers
 * @summary Add the specified number of seconds to the given date.
 *
 * @description
 * Add the specified number of seconds to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of seconds to be added.
 * @param options - An object with options
 *
 * @returns The new date with the seconds added
 *
 * @example
 * // Add 30 seconds to 10 July 2014 12:45:00:
 * const result = addSeconds(new Date(2014, 6, 10, 12, 45, 0), 30)
 * //=> Thu Jul 10 2014 12:45:30
 */
function addSeconds(date, amount, options) {
  return (0, _index.addMilliseconds)(date, amount * 1000, options);
}


/***/ }),

/***/ "./node_modules/date-fns/addWeeks.cjs":
/*!********************************************!*\
  !*** ./node_modules/date-fns/addWeeks.cjs ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.addWeeks = addWeeks;
var _index = __webpack_require__(/*! ./addDays.cjs */ "./node_modules/date-fns/addDays.cjs");

/**
 * The {@link addWeeks} function options.
 */

/**
 * @name addWeeks
 * @category Week Helpers
 * @summary Add the specified number of weeks to the given date.
 *
 * @description
 * Add the specified number of weeks to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of weeks to be added.
 * @param options - An object with options
 *
 * @returns The new date with the weeks added
 *
 * @example
 * // Add 4 weeks to 1 September 2014:
 * const result = addWeeks(new Date(2014, 8, 1), 4)
 * //=> Mon Sep 29 2014 00:00:00
 */
function addWeeks(date, amount, options) {
  return (0, _index.addDays)(date, amount * 7, options);
}


/***/ }),

/***/ "./node_modules/date-fns/addYears.cjs":
/*!********************************************!*\
  !*** ./node_modules/date-fns/addYears.cjs ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.addYears = addYears;
var _index = __webpack_require__(/*! ./addMonths.cjs */ "./node_modules/date-fns/addMonths.cjs");

/**
 * The {@link addYears} function options.
 */

/**
 * @name addYears
 * @category Year Helpers
 * @summary Add the specified number of years to the given date.
 *
 * @description
 * Add the specified number of years to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type.
 *
 * @param date - The date to be changed
 * @param amount - The amount of years to be added.
 * @param options - The options
 *
 * @returns The new date with the years added
 *
 * @example
 * // Add 5 years to 1 September 2014:
 * const result = addYears(new Date(2014, 8, 1), 5)
 * //=> Sun Sep 01 2019 00:00:00
 */
function addYears(date, amount, options) {
  return (0, _index.addMonths)(date, amount * 12, options);
}


/***/ }),

/***/ "./node_modules/date-fns/areIntervalsOverlapping.cjs":
/*!***********************************************************!*\
  !*** ./node_modules/date-fns/areIntervalsOverlapping.cjs ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.areIntervalsOverlapping = areIntervalsOverlapping;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link areIntervalsOverlapping} function options.
 */

/**
 * @name areIntervalsOverlapping
 * @category Interval Helpers
 * @summary Is the given time interval overlapping with another time interval?
 *
 * @description
 * Is the given time interval overlapping with another time interval? Adjacent intervals do not count as overlapping unless `inclusive` is set to `true`.
 *
 * @param intervalLeft - The first interval to compare.
 * @param intervalRight - The second interval to compare.
 * @param options - The object with options
 *
 * @returns Whether the time intervals are overlapping
 *
 * @example
 * // For overlapping time intervals:
 * areIntervalsOverlapping(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 17), end: new Date(2014, 0, 21) }
 * )
 * //=> true
 *
 * @example
 * // For non-overlapping time intervals:
 * areIntervalsOverlapping(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 21), end: new Date(2014, 0, 22) }
 * )
 * //=> false
 *
 * @example
 * // For adjacent time intervals:
 * areIntervalsOverlapping(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 20), end: new Date(2014, 0, 30) }
 * )
 * //=> false
 *
 * @example
 * // Using the inclusive option:
 * areIntervalsOverlapping(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 20), end: new Date(2014, 0, 24) },
 *   { inclusive: true }
 * )
 * //=> true
 */
function areIntervalsOverlapping(intervalLeft, intervalRight, options) {
  const [leftStartTime, leftEndTime] = [
    +(0, _index.toDate)(intervalLeft.start, options?.in),
    +(0, _index.toDate)(intervalLeft.end, options?.in),
  ].sort((a, b) => a - b);
  const [rightStartTime, rightEndTime] = [
    +(0, _index.toDate)(intervalRight.start, options?.in),
    +(0, _index.toDate)(intervalRight.end, options?.in),
  ].sort((a, b) => a - b);

  if (options?.inclusive)
    return leftStartTime <= rightEndTime && rightStartTime <= leftEndTime;

  return leftStartTime < rightEndTime && rightStartTime < leftEndTime;
}


/***/ }),

/***/ "./node_modules/date-fns/clamp.cjs":
/*!*****************************************!*\
  !*** ./node_modules/date-fns/clamp.cjs ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.clamp = clamp;
var _index = __webpack_require__(/*! ./_lib/normalizeDates.cjs */ "./node_modules/date-fns/_lib/normalizeDates.cjs");
var _index2 = __webpack_require__(/*! ./max.cjs */ "./node_modules/date-fns/max.cjs");
var _index3 = __webpack_require__(/*! ./min.cjs */ "./node_modules/date-fns/min.cjs");

/**
 * The {@link clamp} function options.
 */

/**
 * The {@link clamp} function result type. It resolves the proper data type.
 * It uses the first argument date object type, starting from the date argument,
 * then the start interval date, and finally the end interval date. If
 * a context function is passed, it uses the context function return type.
 */

/**
 * @name clamp
 * @category Interval Helpers
 * @summary Return a date bounded by the start and the end of the given interval.
 *
 * @description
 * Clamps a date to the lower bound with the start of the interval and the upper
 * bound with the end of the interval.
 *
 * - When the date is less than the start of the interval, the start is returned.
 * - When the date is greater than the end of the interval, the end is returned.
 * - Otherwise the date is returned.
 *
 * @typeParam DateType - Date argument type.
 * @typeParam IntervalType - Interval argument type.
 * @typeParam Options - Options type.
 *
 * @param date - The date to be bounded
 * @param interval - The interval to bound to
 * @param options - An object with options
 *
 * @returns The date bounded by the start and the end of the interval
 *
 * @example
 * // What is Mar 21, 2021 bounded to an interval starting at Mar 22, 2021 and ending at Apr 01, 2021
 * const result = clamp(new Date(2021, 2, 21), {
 *   start: new Date(2021, 2, 22),
 *   end: new Date(2021, 3, 1),
 * })
 * //=> Mon Mar 22 2021 00:00:00
 */
function clamp(date, interval, options) {
  const [date_, start, end] = (0, _index.normalizeDates)(
    options?.in,
    date,
    interval.start,
    interval.end,
  );

  return (0, _index3.min)(
    [(0, _index2.max)([date_, start], options), end],
    options,
  );
}


/***/ }),

/***/ "./node_modules/date-fns/closestIndexTo.cjs":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/closestIndexTo.cjs ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.closestIndexTo = closestIndexTo;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * @name closestIndexTo
 * @category Common Helpers
 * @summary Return an index of the closest date from the array comparing to the given date.
 *
 * @description
 * Return an index of the closest date from the array comparing to the given date.
 *
 * @param dateToCompare - The date to compare with
 * @param dates - The array to search
 *
 * @returns An index of the date closest to the given date or undefined if no valid value is given
 *
 * @example
 * // Which date is closer to 6 September 2015?
 * const dateToCompare = new Date(2015, 8, 6)
 * const datesArray = [
 *   new Date(2015, 0, 1),
 *   new Date(2016, 0, 1),
 *   new Date(2017, 0, 1)
 * ]
 * const result = closestIndexTo(dateToCompare, datesArray)
 * //=> 1
 */
function closestIndexTo(dateToCompare, dates) {
  // [TODO] It would be better to return -1 here rather than undefined, as this
  // is how JS behaves, but it would be a breaking change, so we need
  // to consider it for v4.
  const timeToCompare = +(0, _index.toDate)(dateToCompare);

  if (isNaN(timeToCompare)) return NaN;

  let result;
  let minDistance;
  dates.forEach((date, index) => {
    const date_ = (0, _index.toDate)(date);

    if (isNaN(+date_)) {
      result = NaN;
      minDistance = NaN;
      return;
    }

    const distance = Math.abs(timeToCompare - +date_);
    if (result == null || distance < minDistance) {
      result = index;
      minDistance = distance;
    }
  });

  return result;
}


/***/ }),

/***/ "./node_modules/date-fns/closestTo.cjs":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/closestTo.cjs ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.closestTo = closestTo;
var _index = __webpack_require__(/*! ./_lib/normalizeDates.cjs */ "./node_modules/date-fns/_lib/normalizeDates.cjs");
var _index2 = __webpack_require__(/*! ./closestIndexTo.cjs */ "./node_modules/date-fns/closestIndexTo.cjs");
var _index3 = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");

/**
 * The {@link closestTo} function options.
 */

/**
 * The {@link closestTo} function result type. It resolves the proper data type.
 * It uses the first argument date object type, starting from the date argument,
 * then the start interval date, and finally the end interval date. If
 * a context function is passed, it uses the context function return type.
 */

/**
 * @name closestTo
 * @category Common Helpers
 * @summary Return a date from the array closest to the given date.
 *
 * @description
 * Return a date from the array closest to the given date.
 *
 * @typeParam DateToCompare - Date to compare argument type.
 * @typeParam DatesType - Dates array argument type.
 * @typeParam Options - Options type.
 *
 * @param dateToCompare - The date to compare with
 * @param dates - The array to search
 *
 * @returns The date from the array closest to the given date or undefined if no valid value is given
 *
 * @example
 * // Which date is closer to 6 September 2015: 1 January 2000 or 1 January 2030?
 * const dateToCompare = new Date(2015, 8, 6)
 * const result = closestTo(dateToCompare, [
 *   new Date(2000, 0, 1),
 *   new Date(2030, 0, 1)
 * ])
 * //=> Tue Jan 01 2030 00:00:00
 */
function closestTo(dateToCompare, dates, options) {
  const [dateToCompare_, ...dates_] = (0, _index.normalizeDates)(
    options?.in,
    dateToCompare,
    ...dates,
  );

  const index = (0, _index2.closestIndexTo)(dateToCompare_, dates_);

  if (typeof index === "number" && isNaN(index))
    return (0, _index3.constructFrom)(dateToCompare_, NaN);

  if (index !== undefined) return dates_[index];
}


/***/ }),

/***/ "./node_modules/date-fns/compareAsc.cjs":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/compareAsc.cjs ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.compareAsc = compareAsc;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * @name compareAsc
 * @category Common Helpers
 * @summary Compare the two dates and return -1, 0 or 1.
 *
 * @description
 * Compare the two dates and return 1 if the first date is after the second,
 * -1 if the first date is before the second or 0 if dates are equal.
 *
 * @param dateLeft - The first date to compare
 * @param dateRight - The second date to compare
 *
 * @returns The result of the comparison
 *
 * @example
 * // Compare 11 February 1987 and 10 July 1989:
 * const result = compareAsc(new Date(1987, 1, 11), new Date(1989, 6, 10))
 * //=> -1
 *
 * @example
 * // Sort the array of dates:
 * const result = [
 *   new Date(1995, 6, 2),
 *   new Date(1987, 1, 11),
 *   new Date(1989, 6, 10)
 * ].sort(compareAsc)
 * //=> [
 * //   Wed Feb 11 1987 00:00:00,
 * //   Mon Jul 10 1989 00:00:00,
 * //   Sun Jul 02 1995 00:00:00
 * // ]
 */
function compareAsc(dateLeft, dateRight) {
  const diff = +(0, _index.toDate)(dateLeft) - +(0, _index.toDate)(dateRight);

  if (diff < 0) return -1;
  else if (diff > 0) return 1;

  // Return 0 if diff is 0; return NaN if diff is NaN
  return diff;
}


/***/ }),

/***/ "./node_modules/date-fns/compareDesc.cjs":
/*!***********************************************!*\
  !*** ./node_modules/date-fns/compareDesc.cjs ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.compareDesc = compareDesc;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * @name compareDesc
 * @category Common Helpers
 * @summary Compare the two dates reverse chronologically and return -1, 0 or 1.
 *
 * @description
 * Compare the two dates and return -1 if the first date is after the second,
 * 1 if the first date is before the second or 0 if dates are equal.
 *
 * @param dateLeft - The first date to compare
 * @param dateRight - The second date to compare
 *
 * @returns The result of the comparison
 *
 * @example
 * // Compare 11 February 1987 and 10 July 1989 reverse chronologically:
 * const result = compareDesc(new Date(1987, 1, 11), new Date(1989, 6, 10))
 * //=> 1
 *
 * @example
 * // Sort the array of dates in reverse chronological order:
 * const result = [
 *   new Date(1995, 6, 2),
 *   new Date(1987, 1, 11),
 *   new Date(1989, 6, 10)
 * ].sort(compareDesc)
 * //=> [
 * //   Sun Jul 02 1995 00:00:00,
 * //   Mon Jul 10 1989 00:00:00,
 * //   Wed Feb 11 1987 00:00:00
 * // ]
 */
function compareDesc(dateLeft, dateRight) {
  const diff = +(0, _index.toDate)(dateLeft) - +(0, _index.toDate)(dateRight);

  if (diff > 0) return -1;
  else if (diff < 0) return 1;

  // Return 0 if diff is 0; return NaN if diff is NaN
  return diff;
}


/***/ }),

/***/ "./node_modules/date-fns/constants.cjs":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/constants.cjs ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.secondsInYear =
  exports.secondsInWeek =
  exports.secondsInQuarter =
  exports.secondsInMonth =
  exports.secondsInMinute =
  exports.secondsInHour =
  exports.secondsInDay =
  exports.quartersInYear =
  exports.monthsInYear =
  exports.monthsInQuarter =
  exports.minutesInYear =
  exports.minutesInMonth =
  exports.minutesInHour =
  exports.minutesInDay =
  exports.minTime =
  exports.millisecondsInWeek =
  exports.millisecondsInSecond =
  exports.millisecondsInMinute =
  exports.millisecondsInHour =
  exports.millisecondsInDay =
  exports.maxTime =
  exports.daysInYear =
  exports.daysInWeek =
  exports.constructFromSymbol =
    void 0; /**
 * @module constants
 * @summary Useful constants
 * @description
 * Collection of useful date constants.
 *
 * The constants could be imported from `date-fns/constants`:
 *
 * ```ts
 * import { maxTime, minTime } from "date-fns/constants";
 *
 * function isAllowedTime(time) {
 *   return time <= maxTime && time >= minTime;
 * }
 * ```
 */

/**
 * @constant
 * @name daysInWeek
 * @summary Days in 1 week.
 */
const daysInWeek = (exports.daysInWeek = 7);

/**
 * @constant
 * @name daysInYear
 * @summary Days in 1 year.
 *
 * @description
 * How many days in a year.
 *
 * One years equals 365.2425 days according to the formula:
 *
 * > Leap year occurs every 4 years, except for years that are divisible by 100 and not divisible by 400.
 * > 1 mean year = (365+1/4-1/100+1/400) days = 365.2425 days
 */
const daysInYear = (exports.daysInYear = 365.2425);

/**
 * @constant
 * @name maxTime
 * @summary Maximum allowed time.
 *
 * @example
 * import { maxTime } from "date-fns/constants";
 *
 * const isValid = 8640000000000001 <= maxTime;
 * //=> false
 *
 * new Date(8640000000000001);
 * //=> Invalid Date
 */
const maxTime = (exports.maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1000);

/**
 * @constant
 * @name minTime
 * @summary Minimum allowed time.
 *
 * @example
 * import { minTime } from "date-fns/constants";
 *
 * const isValid = -8640000000000001 >= minTime;
 * //=> false
 *
 * new Date(-8640000000000001)
 * //=> Invalid Date
 */
const minTime = (exports.minTime = -maxTime);

/**
 * @constant
 * @name millisecondsInWeek
 * @summary Milliseconds in 1 week.
 */
const millisecondsInWeek = (exports.millisecondsInWeek = 604800000);

/**
 * @constant
 * @name millisecondsInDay
 * @summary Milliseconds in 1 day.
 */
const millisecondsInDay = (exports.millisecondsInDay = 86400000);

/**
 * @constant
 * @name millisecondsInMinute
 * @summary Milliseconds in 1 minute
 */
const millisecondsInMinute = (exports.millisecondsInMinute = 60000);

/**
 * @constant
 * @name millisecondsInHour
 * @summary Milliseconds in 1 hour
 */
const millisecondsInHour = (exports.millisecondsInHour = 3600000);

/**
 * @constant
 * @name millisecondsInSecond
 * @summary Milliseconds in 1 second
 */
const millisecondsInSecond = (exports.millisecondsInSecond = 1000);

/**
 * @constant
 * @name minutesInYear
 * @summary Minutes in 1 year.
 */
const minutesInYear = (exports.minutesInYear = 525600);

/**
 * @constant
 * @name minutesInMonth
 * @summary Minutes in 1 month.
 */
const minutesInMonth = (exports.minutesInMonth = 43200);

/**
 * @constant
 * @name minutesInDay
 * @summary Minutes in 1 day.
 */
const minutesInDay = (exports.minutesInDay = 1440);

/**
 * @constant
 * @name minutesInHour
 * @summary Minutes in 1 hour.
 */
const minutesInHour = (exports.minutesInHour = 60);

/**
 * @constant
 * @name monthsInQuarter
 * @summary Months in 1 quarter.
 */
const monthsInQuarter = (exports.monthsInQuarter = 3);

/**
 * @constant
 * @name monthsInYear
 * @summary Months in 1 year.
 */
const monthsInYear = (exports.monthsInYear = 12);

/**
 * @constant
 * @name quartersInYear
 * @summary Quarters in 1 year
 */
const quartersInYear = (exports.quartersInYear = 4);

/**
 * @constant
 * @name secondsInHour
 * @summary Seconds in 1 hour.
 */
const secondsInHour = (exports.secondsInHour = 3600);

/**
 * @constant
 * @name secondsInMinute
 * @summary Seconds in 1 minute.
 */
const secondsInMinute = (exports.secondsInMinute = 60);

/**
 * @constant
 * @name secondsInDay
 * @summary Seconds in 1 day.
 */
const secondsInDay = (exports.secondsInDay = secondsInHour * 24);

/**
 * @constant
 * @name secondsInWeek
 * @summary Seconds in 1 week.
 */
const secondsInWeek = (exports.secondsInWeek = secondsInDay * 7);

/**
 * @constant
 * @name secondsInYear
 * @summary Seconds in 1 year.
 */
const secondsInYear = (exports.secondsInYear = secondsInDay * daysInYear);

/**
 * @constant
 * @name secondsInMonth
 * @summary Seconds in 1 month
 */
const secondsInMonth = (exports.secondsInMonth = secondsInYear / 12);

/**
 * @constant
 * @name secondsInQuarter
 * @summary Seconds in 1 quarter.
 */
const secondsInQuarter = (exports.secondsInQuarter = secondsInMonth * 3);

/**
 * @constant
 * @name constructFromSymbol
 * @summary Symbol enabling Date extensions to inherit properties from the reference date.
 *
 * The symbol is used to enable the `constructFrom` function to construct a date
 * using a reference date and a value. It allows to transfer extra properties
 * from the reference date to the new date. It's useful for extensions like
 * [`TZDate`](https://github.com/date-fns/tz) that accept a time zone as
 * a constructor argument.
 */
const constructFromSymbol = (exports.constructFromSymbol =
  Symbol.for("constructDateFrom"));


/***/ }),

/***/ "./node_modules/date-fns/constructFrom.cjs":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/constructFrom.cjs ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.constructFrom = constructFrom;
var _index = __webpack_require__(/*! ./constants.cjs */ "./node_modules/date-fns/constants.cjs");

/**
 * @name constructFrom
 * @category Generic Helpers
 * @summary Constructs a date using the reference date and the value
 *
 * @description
 * The function constructs a new date using the constructor from the reference
 * date and the given value. It helps to build generic functions that accept
 * date extensions.
 *
 * It defaults to `Date` if the passed reference date is a number or a string.
 *
 * Starting from v3.7.0, it allows to construct a date using `[Symbol.for("constructDateFrom")]`
 * enabling to transfer extra properties from the reference date to the new date.
 * It's useful for extensions like [`TZDate`](https://github.com/date-fns/tz)
 * that accept a time zone as a constructor argument.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The reference date to take constructor from
 * @param value - The value to create the date
 *
 * @returns Date initialized using the given date and value
 *
 * @example
 * import { constructFrom } from "date-fns";
 *
 * // A function that clones a date preserving the original type
 * function cloneDate<DateType extends Date>(date: DateType): DateType {
 *   return constructFrom(
 *     date, // Use constructor from the given date
 *     date.getTime() // Use the date value to create a new date
 *   );
 * }
 */
function constructFrom(date, value) {
  if (typeof date === "function") return date(value);

  if (date && typeof date === "object" && _index.constructFromSymbol in date)
    return date[_index.constructFromSymbol](value);

  if (date instanceof Date) return new date.constructor(value);

  return new Date(value);
}


/***/ }),

/***/ "./node_modules/date-fns/constructNow.cjs":
/*!************************************************!*\
  !*** ./node_modules/date-fns/constructNow.cjs ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.constructNow = constructNow;
var _index = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");

/**
 * @name constructNow
 * @category Generic Helpers
 * @summary Constructs a new current date using the passed value constructor.
 * @pure false
 *
 * @description
 * The function constructs a new current date using the constructor from
 * the reference date. It helps to build generic functions that accept date
 * extensions and use the current date.
 *
 * It defaults to `Date` if the passed reference date is a number or a string.
 *
 * @param date - The reference date to take constructor from
 *
 * @returns Current date initialized using the given date constructor
 *
 * @example
 * import { constructNow, isSameDay } from 'date-fns'
 *
 * function isToday<DateType extends Date>(
 *   date: DateArg<DateType>,
 * ): boolean {
 *   // If we were to use `new Date()` directly, the function would  behave
 *   // differently in different timezones and return false for the same date.
 *   return isSameDay(date, constructNow(date));
 * }
 */
function constructNow(date) {
  return (0, _index.constructFrom)(date, Date.now());
}


/***/ }),

/***/ "./node_modules/date-fns/daysToWeeks.cjs":
/*!***********************************************!*\
  !*** ./node_modules/date-fns/daysToWeeks.cjs ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.daysToWeeks = daysToWeeks;
var _index = __webpack_require__(/*! ./constants.cjs */ "./node_modules/date-fns/constants.cjs");

/**
 * @name daysToWeeks
 * @category Conversion Helpers
 * @summary Convert days to weeks.
 *
 * @description
 * Convert a number of days to a full number of weeks.
 *
 * @param days - The number of days to be converted
 *
 * @returns The number of days converted in weeks
 *
 * @example
 * // Convert 14 days to weeks:
 * const result = daysToWeeks(14)
 * //=> 2
 *
 * @example
 * // It uses trunc rounding:
 * const result = daysToWeeks(13)
 * //=> 1
 */
function daysToWeeks(days) {
  const result = Math.trunc(days / _index.daysInWeek);
  // Prevent negative zero
  return result === 0 ? 0 : result;
}


/***/ }),

/***/ "./node_modules/date-fns/differenceInBusinessDays.cjs":
/*!************************************************************!*\
  !*** ./node_modules/date-fns/differenceInBusinessDays.cjs ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.differenceInBusinessDays = differenceInBusinessDays;
var _index = __webpack_require__(/*! ./_lib/normalizeDates.cjs */ "./node_modules/date-fns/_lib/normalizeDates.cjs");
var _index2 = __webpack_require__(/*! ./addDays.cjs */ "./node_modules/date-fns/addDays.cjs");
var _index3 = __webpack_require__(/*! ./differenceInCalendarDays.cjs */ "./node_modules/date-fns/differenceInCalendarDays.cjs");
var _index4 = __webpack_require__(/*! ./isSameDay.cjs */ "./node_modules/date-fns/isSameDay.cjs");
var _index5 = __webpack_require__(/*! ./isValid.cjs */ "./node_modules/date-fns/isValid.cjs");
var _index6 = __webpack_require__(/*! ./isWeekend.cjs */ "./node_modules/date-fns/isWeekend.cjs");

/**
 * The {@link differenceInBusinessDays} function options.
 */

/**
 * @name differenceInBusinessDays
 * @category Day Helpers
 * @summary Get the number of business days between the given dates.
 *
 * @description
 * Get the number of business day periods between the given dates.
 * Business days being days that aren't in the weekend.
 * Like `differenceInCalendarDays`, the function removes the times from
 * the dates before calculating the difference.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options
 *
 * @returns The number of business days
 *
 * @example
 * // How many business days are between
 * // 10 January 2014 and 20 July 2014?
 * const result = differenceInBusinessDays(
 *   new Date(2014, 6, 20),
 *   new Date(2014, 0, 10)
 * )
 * //=> 136
 *
 * // How many business days are between
 * // 30 November 2021 and 1 November 2021?
 * const result = differenceInBusinessDays(
 *   new Date(2021, 10, 30),
 *   new Date(2021, 10, 1)
 * )
 * //=> 21
 *
 * // How many business days are between
 * // 1 November 2021 and 1 December 2021?
 * const result = differenceInBusinessDays(
 *   new Date(2021, 10, 1),
 *   new Date(2021, 11, 1)
 * )
 * //=> -22
 *
 * // How many business days are between
 * // 1 November 2021 and 1 November 2021 ?
 * const result = differenceInBusinessDays(
 *   new Date(2021, 10, 1),
 *   new Date(2021, 10, 1)
 * )
 * //=> 0
 */
function differenceInBusinessDays(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = (0, _index.normalizeDates)(
    options?.in,
    laterDate,
    earlierDate,
  );

  if (!(0, _index5.isValid)(laterDate_) || !(0, _index5.isValid)(earlierDate_))
    return NaN;

  const diff = (0, _index3.differenceInCalendarDays)(laterDate_, earlierDate_);
  const sign = diff < 0 ? -1 : 1;
  const weeks = Math.trunc(diff / 7);

  let result = weeks * 5;
  let movingDate = (0, _index2.addDays)(earlierDate_, weeks * 7);

  // the loop below will run at most 6 times to account for the remaining days that don't makeup a full week
  while (!(0, _index4.isSameDay)(laterDate_, movingDate)) {
    // sign is used to account for both negative and positive differences
    result += (0, _index6.isWeekend)(movingDate, options) ? 0 : sign;
    movingDate = (0, _index2.addDays)(movingDate, sign);
  }

  // Prevent negative zero
  return result === 0 ? 0 : result;
}


/***/ }),

/***/ "./node_modules/date-fns/differenceInCalendarDays.cjs":
/*!************************************************************!*\
  !*** ./node_modules/date-fns/differenceInCalendarDays.cjs ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.differenceInCalendarDays = differenceInCalendarDays;
var _index = __webpack_require__(/*! ./_lib/getTimezoneOffsetInMilliseconds.cjs */ "./node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.cjs");
var _index2 = __webpack_require__(/*! ./_lib/normalizeDates.cjs */ "./node_modules/date-fns/_lib/normalizeDates.cjs");
var _index3 = __webpack_require__(/*! ./constants.cjs */ "./node_modules/date-fns/constants.cjs");
var _index4 = __webpack_require__(/*! ./startOfDay.cjs */ "./node_modules/date-fns/startOfDay.cjs");

/**
 * The {@link differenceInCalendarDays} function options.
 */

/**
 * @name differenceInCalendarDays
 * @category Day Helpers
 * @summary Get the number of calendar days between the given dates.
 *
 * @description
 * Get the number of calendar days between the given dates. This means that the times are removed
 * from the dates and then the difference in days is calculated.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - The options object
 *
 * @returns The number of calendar days
 *
 * @example
 * // How many calendar days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * const result = differenceInCalendarDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 366
 * // How many calendar days are between
 * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
 * const result = differenceInCalendarDays(
 *   new Date(2011, 6, 3, 0, 1),
 *   new Date(2011, 6, 2, 23, 59)
 * )
 * //=> 1
 */
function differenceInCalendarDays(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = (0, _index2.normalizeDates)(
    options?.in,
    laterDate,
    earlierDate,
  );

  const laterStartOfDay = (0, _index4.startOfDay)(laterDate_);
  const earlierStartOfDay = (0, _index4.startOfDay)(earlierDate_);

  const laterTimestamp =
    +laterStartOfDay -
    (0, _index.getTimezoneOffsetInMilliseconds)(laterStartOfDay);
  const earlierTimestamp =
    +earlierStartOfDay -
    (0, _index.getTimezoneOffsetInMilliseconds)(earlierStartOfDay);

  // Round the number of days to the nearest integer because the number of
  // milliseconds in a day is not constant (e.g. it's different in the week of
  // the daylight saving time clock shift).
  return Math.round(
    (laterTimestamp - earlierTimestamp) / _index3.millisecondsInDay,
  );
}


/***/ }),

/***/ "./node_modules/date-fns/differenceInCalendarISOWeekYears.cjs":
/*!********************************************************************!*\
  !*** ./node_modules/date-fns/differenceInCalendarISOWeekYears.cjs ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.differenceInCalendarISOWeekYears = differenceInCalendarISOWeekYears;
var _index = __webpack_require__(/*! ./_lib/normalizeDates.cjs */ "./node_modules/date-fns/_lib/normalizeDates.cjs");
var _index2 = __webpack_require__(/*! ./getISOWeekYear.cjs */ "./node_modules/date-fns/getISOWeekYear.cjs");

/**
 * The {@link differenceInCalendarISOWeekYears} function options.
 */

/**
 * @name differenceInCalendarISOWeekYears
 * @category ISO Week-Numbering Year Helpers
 * @summary Get the number of calendar ISO week-numbering years between the given dates.
 *
 * @description
 * Get the number of calendar ISO week-numbering years between the given dates.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options
 *
 * @returns The number of calendar ISO week-numbering years
 *
 * @example
 * // How many calendar ISO week-numbering years are 1 January 2010 and 1 January 2012?
 * const result = differenceInCalendarISOWeekYears(
 *   new Date(2012, 0, 1),
 *   new Date(2010, 0, 1)
 * )
 * //=> 2
 */
function differenceInCalendarISOWeekYears(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = (0, _index.normalizeDates)(
    options?.in,
    laterDate,
    earlierDate,
  );
  return (
    (0, _index2.getISOWeekYear)(laterDate_, options) -
    (0, _index2.getISOWeekYear)(earlierDate_, options)
  );
}


/***/ }),

/***/ "./node_modules/date-fns/differenceInCalendarISOWeeks.cjs":
/*!****************************************************************!*\
  !*** ./node_modules/date-fns/differenceInCalendarISOWeeks.cjs ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.differenceInCalendarISOWeeks = differenceInCalendarISOWeeks;
var _index = __webpack_require__(/*! ./_lib/getTimezoneOffsetInMilliseconds.cjs */ "./node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.cjs");
var _index2 = __webpack_require__(/*! ./_lib/normalizeDates.cjs */ "./node_modules/date-fns/_lib/normalizeDates.cjs");
var _index3 = __webpack_require__(/*! ./constants.cjs */ "./node_modules/date-fns/constants.cjs");
var _index4 = __webpack_require__(/*! ./startOfISOWeek.cjs */ "./node_modules/date-fns/startOfISOWeek.cjs");

/**
 * The {@link differenceInCalendarISOWeeks} function options.
 */

/**
 * @name differenceInCalendarISOWeeks
 * @category ISO Week Helpers
 * @summary Get the number of calendar ISO weeks between the given dates.
 *
 * @description
 * Get the number of calendar ISO weeks between the given dates.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options
 *
 * @returns The number of calendar ISO weeks
 *
 * @example
 * // How many calendar ISO weeks are between 6 July 2014 and 21 July 2014?
 * const result = differenceInCalendarISOWeeks(
 *   new Date(2014, 6, 21),
 *   new Date(2014, 6, 6),
 * );
 * //=> 3
 */
function differenceInCalendarISOWeeks(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = (0, _index2.normalizeDates)(
    options?.in,
    laterDate,
    earlierDate,
  );

  const startOfISOWeekLeft = (0, _index4.startOfISOWeek)(laterDate_);
  const startOfISOWeekRight = (0, _index4.startOfISOWeek)(earlierDate_);

  const timestampLeft =
    +startOfISOWeekLeft -
    (0, _index.getTimezoneOffsetInMilliseconds)(startOfISOWeekLeft);
  const timestampRight =
    +startOfISOWeekRight -
    (0, _index.getTimezoneOffsetInMilliseconds)(startOfISOWeekRight);

  // Round the number of weeks to the nearest integer because the number of
  // milliseconds in a week is not constant (e.g. it's different in the week of
  // the daylight saving time clock shift).
  return Math.round(
    (timestampLeft - timestampRight) / _index3.millisecondsInWeek,
  );
}


/***/ }),

/***/ "./node_modules/date-fns/differenceInCalendarMonths.cjs":
/*!**************************************************************!*\
  !*** ./node_modules/date-fns/differenceInCalendarMonths.cjs ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.differenceInCalendarMonths = differenceInCalendarMonths;
var _index = __webpack_require__(/*! ./_lib/normalizeDates.cjs */ "./node_modules/date-fns/_lib/normalizeDates.cjs");

/**
 * The {@link differenceInCalendarMonths} function options.
 */

/**
 * @name differenceInCalendarMonths
 * @category Month Helpers
 * @summary Get the number of calendar months between the given dates.
 *
 * @description
 * Get the number of calendar months between the given dates.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options
 *
 * @returns The number of calendar months
 *
 * @example
 * // How many calendar months are between 31 January 2014 and 1 September 2014?
 * const result = differenceInCalendarMonths(
 *   new Date(2014, 8, 1),
 *   new Date(2014, 0, 31)
 * )
 * //=> 8
 */
function differenceInCalendarMonths(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = (0, _index.normalizeDates)(
    options?.in,
    laterDate,
    earlierDate,
  );

  const yearsDiff = laterDate_.getFullYear() - earlierDate_.getFullYear();
  const monthsDiff = laterDate_.getMonth() - earlierDate_.getMonth();

  return yearsDiff * 12 + monthsDiff;
}


/***/ }),

/***/ "./node_modules/date-fns/differenceInCalendarQuarters.cjs":
/*!****************************************************************!*\
  !*** ./node_modules/date-fns/differenceInCalendarQuarters.cjs ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.differenceInCalendarQuarters = differenceInCalendarQuarters;
var _index = __webpack_require__(/*! ./_lib/normalizeDates.cjs */ "./node_modules/date-fns/_lib/normalizeDates.cjs");
var _index2 = __webpack_require__(/*! ./getQuarter.cjs */ "./node_modules/date-fns/getQuarter.cjs");

/**
 * The {@link differenceInCalendarQuarters} function options.
 */

/**
 * @name differenceInCalendarQuarters
 * @category Quarter Helpers
 * @summary Get the number of calendar quarters between the given dates.
 *
 * @description
 * Get the number of calendar quarters between the given dates.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options
 *
 * @returns The number of calendar quarters
 *
 * @example
 * // How many calendar quarters are between 31 December 2013 and 2 July 2014?
 * const result = differenceInCalendarQuarters(
 *   new Date(2014, 6, 2),
 *   new Date(2013, 11, 31)
 * )
 * //=> 3
 */
function differenceInCalendarQuarters(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = (0, _index.normalizeDates)(
    options?.in,
    laterDate,
    earlierDate,
  );

  const yearsDiff = laterDate_.getFullYear() - earlierDate_.getFullYear();
  const quartersDiff =
    (0, _index2.getQuarter)(laterDate_) - (0, _index2.getQuarter)(earlierDate_);

  return yearsDiff * 4 + quartersDiff;
}


/***/ }),

/***/ "./node_modules/date-fns/differenceInCalendarWeeks.cjs":
/*!*************************************************************!*\
  !*** ./node_modules/date-fns/differenceInCalendarWeeks.cjs ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.differenceInCalendarWeeks = differenceInCalendarWeeks;
var _index = __webpack_require__(/*! ./_lib/getTimezoneOffsetInMilliseconds.cjs */ "./node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.cjs");
var _index2 = __webpack_require__(/*! ./_lib/normalizeDates.cjs */ "./node_modules/date-fns/_lib/normalizeDates.cjs");
var _index3 = __webpack_require__(/*! ./constants.cjs */ "./node_modules/date-fns/constants.cjs");
var _index4 = __webpack_require__(/*! ./startOfWeek.cjs */ "./node_modules/date-fns/startOfWeek.cjs");

/**
 * The {@link differenceInCalendarWeeks} function options.
 */

/**
 * @name differenceInCalendarWeeks
 * @category Week Helpers
 * @summary Get the number of calendar weeks between the given dates.
 *
 * @description
 * Get the number of calendar weeks between the given dates.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options.
 *
 * @returns The number of calendar weeks
 *
 * @example
 * // How many calendar weeks are between 5 July 2014 and 20 July 2014?
 * const result = differenceInCalendarWeeks(
 *   new Date(2014, 6, 20),
 *   new Date(2014, 6, 5)
 * )
 * //=> 3
 *
 * @example
 * // If the week starts on Monday,
 * // how many calendar weeks are between 5 July 2014 and 20 July 2014?
 * const result = differenceInCalendarWeeks(
 *   new Date(2014, 6, 20),
 *   new Date(2014, 6, 5),
 *   { weekStartsOn: 1 }
 * )
 * //=> 2
 */
function differenceInCalendarWeeks(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = (0, _index2.normalizeDates)(
    options?.in,
    laterDate,
    earlierDate,
  );

  const laterStartOfWeek = (0, _index4.startOfWeek)(laterDate_, options);
  const earlierStartOfWeek = (0, _index4.startOfWeek)(earlierDate_, options);

  const laterTimestamp =
    +laterStartOfWeek -
    (0, _index.getTimezoneOffsetInMilliseconds)(laterStartOfWeek);
  const earlierTimestamp =
    +earlierStartOfWeek -
    (0, _index.getTimezoneOffsetInMilliseconds)(earlierStartOfWeek);

  return Math.round(
    (laterTimestamp - earlierTimestamp) / _index3.millisecondsInWeek,
  );
}


/***/ }),

/***/ "./node_modules/date-fns/differenceInCalendarYears.cjs":
/*!*************************************************************!*\
  !*** ./node_modules/date-fns/differenceInCalendarYears.cjs ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.differenceInCalendarYears = differenceInCalendarYears;
var _index = __webpack_require__(/*! ./_lib/normalizeDates.cjs */ "./node_modules/date-fns/_lib/normalizeDates.cjs");

/**
 * The {@link differenceInCalendarYears} function options.
 */

/**
 * @name differenceInCalendarYears
 * @category Year Helpers
 * @summary Get the number of calendar years between the given dates.
 *
 * @description
 * Get the number of calendar years between the given dates.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options

 * @returns The number of calendar years
 *
 * @example
 * // How many calendar years are between 31 December 2013 and 11 February 2015?
 * const result = differenceInCalendarYears(
 *   new Date(2015, 1, 11),
 *   new Date(2013, 11, 31)
 * );
 * //=> 2
 */
function differenceInCalendarYears(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = (0, _index.normalizeDates)(
    options?.in,
    laterDate,
    earlierDate,
  );
  return laterDate_.getFullYear() - earlierDate_.getFullYear();
}


/***/ }),

/***/ "./node_modules/date-fns/differenceInDays.cjs":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/differenceInDays.cjs ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.differenceInDays = differenceInDays;
var _index = __webpack_require__(/*! ./_lib/normalizeDates.cjs */ "./node_modules/date-fns/_lib/normalizeDates.cjs");
var _index2 = __webpack_require__(/*! ./differenceInCalendarDays.cjs */ "./node_modules/date-fns/differenceInCalendarDays.cjs");

/**
 * The {@link differenceInDays} function options.
 */

/**
 * @name differenceInDays
 * @category Day Helpers
 * @summary Get the number of full days between the given dates.
 *
 * @description
 * Get the number of full day periods between two dates. Fractional days are
 * truncated towards zero.
 *
 * One "full day" is the distance between a local time in one day to the same
 * local time on the next or previous day. A full day can sometimes be less than
 * or more than 24 hours if a daylight savings change happens between two dates.
 *
 * To ignore DST and only measure exact 24-hour periods, use this instead:
 * `Math.trunc(differenceInHours(dateLeft, dateRight)/24)|0`.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options
 *
 * @returns The number of full days according to the local timezone
 *
 * @example
 * // How many full days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * const result = differenceInDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 365
 *
 * @example
 * // How many full days are between
 * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
 * const result = differenceInDays(
 *   new Date(2011, 6, 3, 0, 1),
 *   new Date(2011, 6, 2, 23, 59)
 * )
 * //=> 0
 *
 * @example
 * // How many full days are between
 * // 1 March 2020 0:00 and 1 June 2020 0:00 ?
 * // Note: because local time is used, the
 * // result will always be 92 days, even in
 * // time zones where DST starts and the
 * // period has only 92*24-1 hours.
 * const result = differenceInDays(
 *   new Date(2020, 5, 1),
 *   new Date(2020, 2, 1)
 * )
 * //=> 92
 */
function differenceInDays(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = (0, _index.normalizeDates)(
    options?.in,
    laterDate,
    earlierDate,
  );

  const sign = compareLocalAsc(laterDate_, earlierDate_);
  const difference = Math.abs(
    (0, _index2.differenceInCalendarDays)(laterDate_, earlierDate_),
  );

  laterDate_.setDate(laterDate_.getDate() - sign * difference);

  // Math.abs(diff in full days - diff in calendar days) === 1 if last calendar day is not full
  // If so, result must be decreased by 1 in absolute value
  const isLastDayNotFull = Number(
    compareLocalAsc(laterDate_, earlierDate_) === -sign,
  );

  const result = sign * (difference - isLastDayNotFull);
  // Prevent negative zero
  return result === 0 ? 0 : result;
}

// Like `compareAsc` but uses local time not UTC, which is needed
// for accurate equality comparisons of UTC timestamps that end up
// having the same representation in local time, e.g. one hour before
// DST ends vs. the instant that DST ends.
function compareLocalAsc(laterDate, earlierDate) {
  const diff =
    laterDate.getFullYear() - earlierDate.getFullYear() ||
    laterDate.getMonth() - earlierDate.getMonth() ||
    laterDate.getDate() - earlierDate.getDate() ||
    laterDate.getHours() - earlierDate.getHours() ||
    laterDate.getMinutes() - earlierDate.getMinutes() ||
    laterDate.getSeconds() - earlierDate.getSeconds() ||
    laterDate.getMilliseconds() - earlierDate.getMilliseconds();

  if (diff < 0) return -1;
  if (diff > 0) return 1;

  // Return 0 if diff is 0; return NaN if diff is NaN
  return diff;
}


/***/ }),

/***/ "./node_modules/date-fns/differenceInHours.cjs":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/differenceInHours.cjs ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.differenceInHours = differenceInHours;
var _index = __webpack_require__(/*! ./_lib/getRoundingMethod.cjs */ "./node_modules/date-fns/_lib/getRoundingMethod.cjs");
var _index2 = __webpack_require__(/*! ./_lib/normalizeDates.cjs */ "./node_modules/date-fns/_lib/normalizeDates.cjs");
var _index3 = __webpack_require__(/*! ./constants.cjs */ "./node_modules/date-fns/constants.cjs");

/**
 * The {@link differenceInHours} function options.
 */

/**
 * @name differenceInHours
 * @category Hour Helpers
 * @summary Get the number of hours between the given dates.
 *
 * @description
 * Get the number of hours between the given dates.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options.
 *
 * @returns The number of hours
 *
 * @example
 * // How many hours are between 2 July 2014 06:50:00 and 2 July 2014 19:00:00?
 * const result = differenceInHours(
 *   new Date(2014, 6, 2, 19, 0),
 *   new Date(2014, 6, 2, 6, 50)
 * )
 * //=> 12
 */
function differenceInHours(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = (0, _index2.normalizeDates)(
    options?.in,
    laterDate,
    earlierDate,
  );
  const diff = (+laterDate_ - +earlierDate_) / _index3.millisecondsInHour;
  return (0, _index.getRoundingMethod)(options?.roundingMethod)(diff);
}


/***/ }),

/***/ "./node_modules/date-fns/differenceInISOWeekYears.cjs":
/*!************************************************************!*\
  !*** ./node_modules/date-fns/differenceInISOWeekYears.cjs ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.differenceInISOWeekYears = differenceInISOWeekYears;
var _index = __webpack_require__(/*! ./_lib/normalizeDates.cjs */ "./node_modules/date-fns/_lib/normalizeDates.cjs");
var _index2 = __webpack_require__(/*! ./compareAsc.cjs */ "./node_modules/date-fns/compareAsc.cjs");
var _index3 = __webpack_require__(/*! ./differenceInCalendarISOWeekYears.cjs */ "./node_modules/date-fns/differenceInCalendarISOWeekYears.cjs");
var _index4 = __webpack_require__(/*! ./subISOWeekYears.cjs */ "./node_modules/date-fns/subISOWeekYears.cjs");

/**
 * The {@link differenceInISOWeekYears} function options.
 */

/**
 * @name differenceInISOWeekYears
 * @category ISO Week-Numbering Year Helpers
 * @summary Get the number of full ISO week-numbering years between the given dates.
 *
 * @description
 * Get the number of full ISO week-numbering years between the given dates.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - The options
 *
 * @returns The number of full ISO week-numbering years
 *
 * @example
 * // How many full ISO week-numbering years are between 1 January 2010 and 1 January 2012?
 * const result = differenceInISOWeekYears(
 *   new Date(2012, 0, 1),
 *   new Date(2010, 0, 1)
 * )
 * // => 1
 */
function differenceInISOWeekYears(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = (0, _index.normalizeDates)(
    options?.in,
    laterDate,
    earlierDate,
  );

  const sign = (0, _index2.compareAsc)(laterDate_, earlierDate_);
  const diff = Math.abs(
    (0, _index3.differenceInCalendarISOWeekYears)(
      laterDate_,
      earlierDate_,
      options,
    ),
  );

  const adjustedDate = (0, _index4.subISOWeekYears)(
    laterDate_,
    sign * diff,
    options,
  );

  const isLastISOWeekYearNotFull = Number(
    (0, _index2.compareAsc)(adjustedDate, earlierDate_) === -sign,
  );
  const result = sign * (diff - isLastISOWeekYearNotFull);

  // Prevent negative zero
  return result === 0 ? 0 : result;
}


/***/ }),

/***/ "./node_modules/date-fns/differenceInMilliseconds.cjs":
/*!************************************************************!*\
  !*** ./node_modules/date-fns/differenceInMilliseconds.cjs ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.differenceInMilliseconds = differenceInMilliseconds;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * @name differenceInMilliseconds
 * @category Millisecond Helpers
 * @summary Get the number of milliseconds between the given dates.
 *
 * @description
 * Get the number of milliseconds between the given dates.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 *
 * @returns The number of milliseconds
 *
 * @example
 * // How many milliseconds are between
 * // 2 July 2014 12:30:20.600 and 2 July 2014 12:30:21.700?
 * const result = differenceInMilliseconds(
 *   new Date(2014, 6, 2, 12, 30, 21, 700),
 *   new Date(2014, 6, 2, 12, 30, 20, 600)
 * )
 * //=> 1100
 */
function differenceInMilliseconds(laterDate, earlierDate) {
  return +(0, _index.toDate)(laterDate) - +(0, _index.toDate)(earlierDate);
}


/***/ }),

/***/ "./node_modules/date-fns/differenceInMinutes.cjs":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/differenceInMinutes.cjs ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.differenceInMinutes = differenceInMinutes;
var _index = __webpack_require__(/*! ./_lib/getRoundingMethod.cjs */ "./node_modules/date-fns/_lib/getRoundingMethod.cjs");
var _index2 = __webpack_require__(/*! ./constants.cjs */ "./node_modules/date-fns/constants.cjs");
var _index3 = __webpack_require__(/*! ./differenceInMilliseconds.cjs */ "./node_modules/date-fns/differenceInMilliseconds.cjs");

/**
 * The {@link differenceInMinutes} function options.
 */

/**
 * @name differenceInMinutes
 * @category Minute Helpers
 * @summary Get the number of minutes between the given dates.
 *
 * @description
 * Get the signed number of full (rounded towards 0) minutes between the given dates.
 *
 * @param dateLeft - The later date
 * @param dateRight - The earlier date
 * @param options - An object with options.
 *
 * @returns The number of minutes
 *
 * @example
 * // How many minutes are between 2 July 2014 12:07:59 and 2 July 2014 12:20:00?
 * const result = differenceInMinutes(
 *   new Date(2014, 6, 2, 12, 20, 0),
 *   new Date(2014, 6, 2, 12, 7, 59)
 * )
 * //=> 12
 *
 * @example
 * // How many minutes are between 10:01:59 and 10:00:00
 * const result = differenceInMinutes(
 *   new Date(2000, 0, 1, 10, 0, 0),
 *   new Date(2000, 0, 1, 10, 1, 59)
 * )
 * //=> -1
 */
function differenceInMinutes(dateLeft, dateRight, options) {
  const diff =
    (0, _index3.differenceInMilliseconds)(dateLeft, dateRight) /
    _index2.millisecondsInMinute;
  return (0, _index.getRoundingMethod)(options?.roundingMethod)(diff);
}


/***/ }),

/***/ "./node_modules/date-fns/differenceInMonths.cjs":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/differenceInMonths.cjs ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.differenceInMonths = differenceInMonths;
var _index = __webpack_require__(/*! ./_lib/normalizeDates.cjs */ "./node_modules/date-fns/_lib/normalizeDates.cjs");
var _index2 = __webpack_require__(/*! ./compareAsc.cjs */ "./node_modules/date-fns/compareAsc.cjs");
var _index3 = __webpack_require__(/*! ./differenceInCalendarMonths.cjs */ "./node_modules/date-fns/differenceInCalendarMonths.cjs");
var _index4 = __webpack_require__(/*! ./isLastDayOfMonth.cjs */ "./node_modules/date-fns/isLastDayOfMonth.cjs");

/**
 * The {@link differenceInMonths} function options.
 */

/**
 * @name differenceInMonths
 * @category Month Helpers
 * @summary Get the number of full months between the given dates.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options
 *
 * @returns The number of full months
 *
 * @example
 * // How many full months are between 31 January 2014 and 1 September 2014?
 * const result = differenceInMonths(new Date(2014, 8, 1), new Date(2014, 0, 31))
 * //=> 7
 */
function differenceInMonths(laterDate, earlierDate, options) {
  const [laterDate_, workingLaterDate, earlierDate_] = (0,
  _index.normalizeDates)(options?.in, laterDate, laterDate, earlierDate);

  const sign = (0, _index2.compareAsc)(workingLaterDate, earlierDate_);
  const difference = Math.abs(
    (0, _index3.differenceInCalendarMonths)(workingLaterDate, earlierDate_),
  );

  if (difference < 1) return 0;

  if (workingLaterDate.getMonth() === 1 && workingLaterDate.getDate() > 27)
    workingLaterDate.setDate(30);

  workingLaterDate.setMonth(workingLaterDate.getMonth() - sign * difference);

  let isLastMonthNotFull =
    (0, _index2.compareAsc)(workingLaterDate, earlierDate_) === -sign;

  if (
    (0, _index4.isLastDayOfMonth)(laterDate_) &&
    difference === 1 &&
    (0, _index2.compareAsc)(laterDate_, earlierDate_) === 1
  ) {
    isLastMonthNotFull = false;
  }

  const result = sign * (difference - +isLastMonthNotFull);
  return result === 0 ? 0 : result;
}


/***/ }),

/***/ "./node_modules/date-fns/differenceInQuarters.cjs":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/differenceInQuarters.cjs ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.differenceInQuarters = differenceInQuarters;
var _index = __webpack_require__(/*! ./_lib/getRoundingMethod.cjs */ "./node_modules/date-fns/_lib/getRoundingMethod.cjs");
var _index2 = __webpack_require__(/*! ./differenceInMonths.cjs */ "./node_modules/date-fns/differenceInMonths.cjs");

/**
 * The {@link differenceInQuarters} function options.
 */

/**
 * @name differenceInQuarters
 * @category Quarter Helpers
 * @summary Get the number of quarters between the given dates.
 *
 * @description
 * Get the number of quarters between the given dates.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options.
 *
 * @returns The number of full quarters
 *
 * @example
 * // How many full quarters are between 31 December 2013 and 2 July 2014?
 * const result = differenceInQuarters(new Date(2014, 6, 2), new Date(2013, 11, 31))
 * //=> 2
 */
function differenceInQuarters(laterDate, earlierDate, options) {
  const diff =
    (0, _index2.differenceInMonths)(laterDate, earlierDate, options) / 3;
  return (0, _index.getRoundingMethod)(options?.roundingMethod)(diff);
}


/***/ }),

/***/ "./node_modules/date-fns/differenceInSeconds.cjs":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/differenceInSeconds.cjs ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.differenceInSeconds = differenceInSeconds;
var _index = __webpack_require__(/*! ./_lib/getRoundingMethod.cjs */ "./node_modules/date-fns/_lib/getRoundingMethod.cjs");
var _index2 = __webpack_require__(/*! ./differenceInMilliseconds.cjs */ "./node_modules/date-fns/differenceInMilliseconds.cjs");

/**
 * The {@link differenceInSeconds} function options.
 */

/**
 * @name differenceInSeconds
 * @category Second Helpers
 * @summary Get the number of seconds between the given dates.
 *
 * @description
 * Get the number of seconds between the given dates.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options.
 *
 * @returns The number of seconds
 *
 * @example
 * // How many seconds are between
 * // 2 July 2014 12:30:07.999 and 2 July 2014 12:30:20.000?
 * const result = differenceInSeconds(
 *   new Date(2014, 6, 2, 12, 30, 20, 0),
 *   new Date(2014, 6, 2, 12, 30, 7, 999)
 * )
 * //=> 12
 */
function differenceInSeconds(laterDate, earlierDate, options) {
  const diff =
    (0, _index2.differenceInMilliseconds)(laterDate, earlierDate) / 1000;
  return (0, _index.getRoundingMethod)(options?.roundingMethod)(diff);
}


/***/ }),

/***/ "./node_modules/date-fns/differenceInWeeks.cjs":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/differenceInWeeks.cjs ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.differenceInWeeks = differenceInWeeks;
var _index = __webpack_require__(/*! ./_lib/getRoundingMethod.cjs */ "./node_modules/date-fns/_lib/getRoundingMethod.cjs");
var _index2 = __webpack_require__(/*! ./differenceInDays.cjs */ "./node_modules/date-fns/differenceInDays.cjs");

/**
 * The {@link differenceInWeeks} function options.
 */

/**
 * @name differenceInWeeks
 * @category Week Helpers
 * @summary Get the number of full weeks between the given dates.
 *
 * @description
 * Get the number of full weeks between two dates. Fractional weeks are
 * truncated towards zero by default.
 *
 * One "full week" is the distance between a local time in one day to the same
 * local time 7 days earlier or later. A full week can sometimes be less than
 * or more than 7*24 hours if a daylight savings change happens between two dates.
 *
 * To ignore DST and only measure exact 7*24-hour periods, use this instead:
 * `Math.trunc(differenceInHours(dateLeft, dateRight)/(7*24))|0`.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options
 *
 * @returns The number of full weeks
 *
 * @example
 * // How many full weeks are between 5 July 2014 and 20 July 2014?
 * const result = differenceInWeeks(new Date(2014, 6, 20), new Date(2014, 6, 5))
 * //=> 2
 *
 * @example
 * // How many full weeks are between
 * // 1 March 2020 0:00 and 6 June 2020 0:00 ?
 * // Note: because local time is used, the
 * // result will always be 8 weeks (54 days),
 * // even if DST starts and the period has
 * // only 54*24-1 hours.
 * const result = differenceInWeeks(
 *   new Date(2020, 5, 1),
 *   new Date(2020, 2, 6)
 * )
 * //=> 8
 */
function differenceInWeeks(laterDate, earlierDate, options) {
  const diff =
    (0, _index2.differenceInDays)(laterDate, earlierDate, options) / 7;
  return (0, _index.getRoundingMethod)(options?.roundingMethod)(diff);
}


/***/ }),

/***/ "./node_modules/date-fns/differenceInYears.cjs":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/differenceInYears.cjs ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.differenceInYears = differenceInYears;
var _index = __webpack_require__(/*! ./_lib/normalizeDates.cjs */ "./node_modules/date-fns/_lib/normalizeDates.cjs");
var _index2 = __webpack_require__(/*! ./compareAsc.cjs */ "./node_modules/date-fns/compareAsc.cjs");
var _index3 = __webpack_require__(/*! ./differenceInCalendarYears.cjs */ "./node_modules/date-fns/differenceInCalendarYears.cjs");

/**
 * The {@link differenceInYears} function options.
 */

/**
 * @name differenceInYears
 * @category Year Helpers
 * @summary Get the number of full years between the given dates.
 *
 * @description
 * Get the number of full years between the given dates.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options
 *
 * @returns The number of full years
 *
 * @example
 * // How many full years are between 31 December 2013 and 11 February 2015?
 * const result = differenceInYears(new Date(2015, 1, 11), new Date(2013, 11, 31))
 * //=> 1
 */
function differenceInYears(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = (0, _index.normalizeDates)(
    options?.in,
    laterDate,
    earlierDate,
  );

  // -1 if the left date is earlier than the right date
  // 2023-12-31 - 2024-01-01 = -1
  const sign = (0, _index2.compareAsc)(laterDate_, earlierDate_);

  // First calculate the difference in calendar years
  // 2024-01-01 - 2023-12-31 = 1 year
  const diff = Math.abs(
    (0, _index3.differenceInCalendarYears)(laterDate_, earlierDate_),
  );

  // Now we need to calculate if the difference is full. To do that we set
  // both dates to the same year and check if the both date's month and day
  // form a full year.
  laterDate_.setFullYear(1584);
  earlierDate_.setFullYear(1584);

  // For it to be true, when the later date is indeed later than the earlier date
  // (2026-02-01 - 2023-12-10 = 3 years), the difference is full if
  // the normalized later date is also later than the normalized earlier date.
  // In our example, 1584-02-01 is earlier than 1584-12-10, so the difference
  // is partial, hence we need to subtract 1 from the difference 3 - 1 = 2.
  const partial = (0, _index2.compareAsc)(laterDate_, earlierDate_) === -sign;

  const result = sign * (diff - +partial);

  // Prevent negative zero
  return result === 0 ? 0 : result;
}


/***/ }),

/***/ "./node_modules/date-fns/eachDayOfInterval.cjs":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/eachDayOfInterval.cjs ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.eachDayOfInterval = eachDayOfInterval;
var _index = __webpack_require__(/*! ./_lib/normalizeInterval.cjs */ "./node_modules/date-fns/_lib/normalizeInterval.cjs");
var _index2 = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");

/**
 * The {@link eachDayOfInterval} function options.
 */

/**
 * The {@link eachDayOfInterval} function result type. It resolves the proper data type.
 * It uses the first argument date object type, starting from the date argument,
 * then the start interval date, and finally the end interval date. If
 * a context function is passed, it uses the context function return type.
 */

/**
 * @name eachDayOfInterval
 * @category Interval Helpers
 * @summary Return the array of dates within the specified time interval.
 *
 * @description
 * Return the array of dates within the specified time interval.
 *
 * @typeParam IntervalType - Interval type.
 * @typeParam Options - Options type.
 *
 * @param interval - The interval.
 * @param options - An object with options.
 *
 * @returns The array with starts of days from the day of the interval start to the day of the interval end
 *
 * @example
 * // Each day between 6 October 2014 and 10 October 2014:
 * const result = eachDayOfInterval({
 *   start: new Date(2014, 9, 6),
 *   end: new Date(2014, 9, 10)
 * })
 * //=> [
 * //   Mon Oct 06 2014 00:00:00,
 * //   Tue Oct 07 2014 00:00:00,
 * //   Wed Oct 08 2014 00:00:00,
 * //   Thu Oct 09 2014 00:00:00,
 * //   Fri Oct 10 2014 00:00:00
 * // ]
 */
function eachDayOfInterval(interval, options) {
  const { start, end } = (0, _index.normalizeInterval)(options?.in, interval);

  let reversed = +start > +end;
  const endTime = reversed ? +start : +end;
  const date = reversed ? end : start;
  date.setHours(0, 0, 0, 0);

  let step = options?.step ?? 1;
  if (!step) return [];
  if (step < 0) {
    step = -step;
    reversed = !reversed;
  }

  const dates = [];

  while (+date <= endTime) {
    dates.push((0, _index2.constructFrom)(start, date));
    date.setDate(date.getDate() + step);
    date.setHours(0, 0, 0, 0);
  }

  return reversed ? dates.reverse() : dates;
}


/***/ }),

/***/ "./node_modules/date-fns/eachHourOfInterval.cjs":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/eachHourOfInterval.cjs ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.eachHourOfInterval = eachHourOfInterval;
var _index = __webpack_require__(/*! ./_lib/normalizeInterval.cjs */ "./node_modules/date-fns/_lib/normalizeInterval.cjs");
var _index2 = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");

/**
 * The {@link eachHourOfInterval} function options.
 */

/**
 * The {@link eachHourOfInterval} function result type.
 * Resolves to the appropriate date type based on inputs.
 */

/**
 * @name eachHourOfInterval
 * @category Interval Helpers
 * @summary Return the array of hours within the specified time interval.
 *
 * @description
 * Return the array of hours within the specified time interval.
 *
 * @typeParam IntervalType - Interval type.
 * @typeParam Options - Options type.
 *
 * @param interval - The interval.
 * @param options - An object with options.
 *
 * @returns The array with starts of hours from the hour of the interval start to the hour of the interval end
 *
 * @example
 * // Each hour between 6 October 2014, 12:00 and 6 October 2014, 15:00
 * const result = eachHourOfInterval({
 *   start: new Date(2014, 9, 6, 12),
 *   end: new Date(2014, 9, 6, 15)
 * });
 * //=> [
 * //   Mon Oct 06 2014 12:00:00,
 * //   Mon Oct 06 2014 13:00:00,
 * //   Mon Oct 06 2014 14:00:00,
 * //   Mon Oct 06 2014 15:00:00
 * // ]
 */
function eachHourOfInterval(interval, options) {
  const { start, end } = (0, _index.normalizeInterval)(options?.in, interval);

  let reversed = +start > +end;
  const endTime = reversed ? +start : +end;
  const date = reversed ? end : start;
  date.setMinutes(0, 0, 0);

  let step = options?.step ?? 1;
  if (!step) return [];
  if (step < 0) {
    step = -step;
    reversed = !reversed;
  }

  const dates = [];

  while (+date <= endTime) {
    dates.push((0, _index2.constructFrom)(start, date));
    date.setHours(date.getHours() + step);
  }

  return reversed ? dates.reverse() : dates;
}


/***/ }),

/***/ "./node_modules/date-fns/eachMinuteOfInterval.cjs":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/eachMinuteOfInterval.cjs ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.eachMinuteOfInterval = eachMinuteOfInterval;
var _index = __webpack_require__(/*! ./_lib/normalizeInterval.cjs */ "./node_modules/date-fns/_lib/normalizeInterval.cjs");
var _index2 = __webpack_require__(/*! ./addMinutes.cjs */ "./node_modules/date-fns/addMinutes.cjs");
var _index3 = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");

/**
 * The {@link eachMinuteOfInterval} function options.
 */

/**
 * The {@link eachMinuteOfInterval} function result type. It resolves the proper data type.
 * It uses the first argument date object type, starting from the date argument,
 * then the start interval date, and finally the end interval date. If
 * a context function is passed, it uses the context function return type.
 */

/**
 * @name eachMinuteOfInterval
 * @category Interval Helpers
 * @summary Return the array of minutes within the specified time interval.
 *
 * @description
 * Returns the array of minutes within the specified time interval.
 *
 * @typeParam IntervalType - Interval type.
 * @typeParam Options - Options type.
 *
 * @param interval - The interval.
 * @param options - An object with options.
 *
 * @returns The array with starts of minutes from the minute of the interval start to the minute of the interval end
 *
 * @example
 * // Each minute between 14 October 2020, 13:00 and 14 October 2020, 13:03
 * const result = eachMinuteOfInterval({
 *   start: new Date(2014, 9, 14, 13),
 *   end: new Date(2014, 9, 14, 13, 3)
 * })
 * //=> [
 * //   Wed Oct 14 2014 13:00:00,
 * //   Wed Oct 14 2014 13:01:00,
 * //   Wed Oct 14 2014 13:02:00,
 * //   Wed Oct 14 2014 13:03:00
 * // ]
 */
function eachMinuteOfInterval(interval, options) {
  const { start, end } = (0, _index.normalizeInterval)(options?.in, interval);
  // Set to the start of the minute
  start.setSeconds(0, 0);

  let reversed = +start > +end;
  const endTime = reversed ? +start : +end;
  let date = reversed ? end : start;

  let step = options?.step ?? 1;
  if (!step) return [];
  if (step < 0) {
    step = -step;
    reversed = !reversed;
  }

  const dates = [];

  while (+date <= endTime) {
    dates.push((0, _index3.constructFrom)(start, date));
    date = (0, _index2.addMinutes)(date, step);
  }

  return reversed ? dates.reverse() : dates;
}


/***/ }),

/***/ "./node_modules/date-fns/eachMonthOfInterval.cjs":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/eachMonthOfInterval.cjs ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.eachMonthOfInterval = eachMonthOfInterval;
var _index = __webpack_require__(/*! ./_lib/normalizeInterval.cjs */ "./node_modules/date-fns/_lib/normalizeInterval.cjs");
var _index2 = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");

/**
 * The {@link eachMonthOfInterval} function options.
 */

/**
 * The {@link eachMonthOfInterval} function result type. It resolves the proper data type.
 */

/**
 * @name eachMonthOfInterval
 * @category Interval Helpers
 * @summary Return the array of months within the specified time interval.
 *
 * @description
 * Return the array of months within the specified time interval.
 *
 * @typeParam IntervalType - Interval type.
 * @typeParam Options - Options type.
 *
 * @param interval - The interval.
 * @param options - An object with options.
 *
 * @returns The array with starts of months from the month of the interval start to the month of the interval end
 *
 * @example
 * // Each month between 6 February 2014 and 10 August 2014:
 * const result = eachMonthOfInterval({
 *   start: new Date(2014, 1, 6),
 *   end: new Date(2014, 7, 10)
 * })
 * //=> [
 * //   Sat Feb 01 2014 00:00:00,
 * //   Sat Mar 01 2014 00:00:00,
 * //   Tue Apr 01 2014 00:00:00,
 * //   Thu May 01 2014 00:00:00,
 * //   Sun Jun 01 2014 00:00:00,
 * //   Tue Jul 01 2014 00:00:00,
 * //   Fri Aug 01 2014 00:00:00
 * // ]
 */
function eachMonthOfInterval(interval, options) {
  const { start, end } = (0, _index.normalizeInterval)(options?.in, interval);

  let reversed = +start > +end;
  const endTime = reversed ? +start : +end;
  const date = reversed ? end : start;
  date.setHours(0, 0, 0, 0);
  date.setDate(1);

  let step = options?.step ?? 1;
  if (!step) return [];
  if (step < 0) {
    step = -step;
    reversed = !reversed;
  }

  const dates = [];

  while (+date <= endTime) {
    dates.push((0, _index2.constructFrom)(start, date));
    date.setMonth(date.getMonth() + step);
  }

  return reversed ? dates.reverse() : dates;
}


/***/ }),

/***/ "./node_modules/date-fns/eachQuarterOfInterval.cjs":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/eachQuarterOfInterval.cjs ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.eachQuarterOfInterval = eachQuarterOfInterval;
var _index = __webpack_require__(/*! ./_lib/normalizeInterval.cjs */ "./node_modules/date-fns/_lib/normalizeInterval.cjs");
var _index2 = __webpack_require__(/*! ./addQuarters.cjs */ "./node_modules/date-fns/addQuarters.cjs");
var _index3 = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
var _index4 = __webpack_require__(/*! ./startOfQuarter.cjs */ "./node_modules/date-fns/startOfQuarter.cjs");

/**
 * The {@link eachQuarterOfInterval} function options.
 */

/**
 * The {@link eachQuarterOfInterval} function result type. It resolves the proper data type.
 * It uses the first argument date object type, starting from the date argument,
 * then the start interval date, and finally the end interval date. If
 * a context function is passed, it uses the context function return type.
 */

/**
 * @name eachQuarterOfInterval
 * @category Interval Helpers
 * @summary Return the array of quarters within the specified time interval.
 *
 * @description
 * Return the array of quarters within the specified time interval.
 *
 * @typeParam IntervalType - Interval type.
 * @typeParam Options - Options type.
 *
 * @param interval - The interval
 * @param options - An object with options
 *
 * @returns The array with starts of quarters from the quarter of the interval start to the quarter of the interval end
 *
 * @example
 * // Each quarter within interval 6 February 2014 - 10 August 2014:
 * const result = eachQuarterOfInterval({
 *   start: new Date(2014, 1, 6),
 *   end: new Date(2014, 7, 10),
 * })
 * //=> [
 * //   Wed Jan 01 2014 00:00:00,
 * //   Tue Apr 01 2014 00:00:00,
 * //   Tue Jul 01 2014 00:00:00,
 * // ]
 */
function eachQuarterOfInterval(interval, options) {
  const { start, end } = (0, _index.normalizeInterval)(options?.in, interval);

  let reversed = +start > +end;
  const endTime = reversed
    ? +(0, _index4.startOfQuarter)(start)
    : +(0, _index4.startOfQuarter)(end);
  let date = reversed
    ? (0, _index4.startOfQuarter)(end)
    : (0, _index4.startOfQuarter)(start);

  let step = options?.step ?? 1;
  if (!step) return [];
  if (step < 0) {
    step = -step;
    reversed = !reversed;
  }

  const dates = [];

  while (+date <= endTime) {
    dates.push((0, _index3.constructFrom)(start, date));
    date = (0, _index2.addQuarters)(date, step);
  }

  return reversed ? dates.reverse() : dates;
}


/***/ }),

/***/ "./node_modules/date-fns/eachWeekOfInterval.cjs":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/eachWeekOfInterval.cjs ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.eachWeekOfInterval = eachWeekOfInterval;
var _index = __webpack_require__(/*! ./_lib/normalizeInterval.cjs */ "./node_modules/date-fns/_lib/normalizeInterval.cjs");
var _index2 = __webpack_require__(/*! ./addWeeks.cjs */ "./node_modules/date-fns/addWeeks.cjs");
var _index3 = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
var _index4 = __webpack_require__(/*! ./startOfWeek.cjs */ "./node_modules/date-fns/startOfWeek.cjs");

/**
 * The {@link eachWeekOfInterval} function options.
 */

/**
 * The {@link eachWeekOfInterval} function result type. It resolves the proper data type.
 * It uses the first argument date object type, starting from the interval start date,
 * then the end interval date. If a context function is passed, it uses the context function return type.
 */

/**
 * @name eachWeekOfInterval
 * @category Interval Helpers
 * @summary Return the array of weeks within the specified time interval.
 *
 * @description
 * Return the array of weeks within the specified time interval.
 *
 * @param interval - The interval.
 * @param options - An object with options.
 *
 * @returns The array with starts of weeks from the week of the interval start to the week of the interval end
 *
 * @example
 * // Each week within interval 6 October 2014 - 23 November 2014:
 * const result = eachWeekOfInterval({
 *   start: new Date(2014, 9, 6),
 *   end: new Date(2014, 10, 23)
 * })
 * //=> [
 * //   Sun Oct 05 2014 00:00:00,
 * //   Sun Oct 12 2014 00:00:00,
 * //   Sun Oct 19 2014 00:00:00,
 * //   Sun Oct 26 2014 00:00:00,
 * //   Sun Nov 02 2014 00:00:00,
 * //   Sun Nov 09 2014 00:00:00,
 * //   Sun Nov 16 2014 00:00:00,
 * //   Sun Nov 23 2014 00:00:00
 * // ]
 */
function eachWeekOfInterval(interval, options) {
  const { start, end } = (0, _index.normalizeInterval)(options?.in, interval);

  let reversed = +start > +end;
  const startDateWeek = reversed
    ? (0, _index4.startOfWeek)(end, options)
    : (0, _index4.startOfWeek)(start, options);
  const endDateWeek = reversed
    ? (0, _index4.startOfWeek)(start, options)
    : (0, _index4.startOfWeek)(end, options);

  startDateWeek.setHours(15);
  endDateWeek.setHours(15);

  const endTime = +endDateWeek.getTime();
  let currentDate = startDateWeek;

  let step = options?.step ?? 1;
  if (!step) return [];
  if (step < 0) {
    step = -step;
    reversed = !reversed;
  }

  const dates = [];

  while (+currentDate <= endTime) {
    currentDate.setHours(0);
    dates.push((0, _index3.constructFrom)(start, currentDate));
    currentDate = (0, _index2.addWeeks)(currentDate, step);
    currentDate.setHours(15);
  }

  return reversed ? dates.reverse() : dates;
}


/***/ }),

/***/ "./node_modules/date-fns/eachWeekendOfInterval.cjs":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/eachWeekendOfInterval.cjs ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.eachWeekendOfInterval = eachWeekendOfInterval;
var _index = __webpack_require__(/*! ./_lib/normalizeInterval.cjs */ "./node_modules/date-fns/_lib/normalizeInterval.cjs");
var _index2 = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
var _index3 = __webpack_require__(/*! ./eachDayOfInterval.cjs */ "./node_modules/date-fns/eachDayOfInterval.cjs");
var _index4 = __webpack_require__(/*! ./isWeekend.cjs */ "./node_modules/date-fns/isWeekend.cjs");

/**
 * The {@link eachWeekendOfInterval} function options.
 */

/**
 * The {@link eachWeekendOfInterval} function result type.
 */

/**
 * @name eachWeekendOfInterval
 * @category Interval Helpers
 * @summary List all the Saturdays and Sundays in the given date interval.
 *
 * @description
 * Get all the Saturdays and Sundays in the given date interval.
 *
 * @typeParam IntervalType - Interval type.
 * @typeParam Options - Options type.
 *
 * @param interval - The given interval
 * @param options - An object with options
 *
 * @returns An array containing all the Saturdays and Sundays
 *
 * @example
 * // Lists all Saturdays and Sundays in the given date interval
 * const result = eachWeekendOfInterval({
 *   start: new Date(2018, 8, 17),
 *   end: new Date(2018, 8, 30)
 * })
 * //=> [
 * //   Sat Sep 22 2018 00:00:00,
 * //   Sun Sep 23 2018 00:00:00,
 * //   Sat Sep 29 2018 00:00:00,
 * //   Sun Sep 30 2018 00:00:00
 * // ]
 */
function eachWeekendOfInterval(interval, options) {
  const { start, end } = (0, _index.normalizeInterval)(options?.in, interval);
  const dateInterval = (0, _index3.eachDayOfInterval)({ start, end }, options);
  const weekends = [];
  let index = 0;
  while (index < dateInterval.length) {
    const date = dateInterval[index++];
    if ((0, _index4.isWeekend)(date))
      weekends.push((0, _index2.constructFrom)(start, date));
  }
  return weekends;
}


/***/ }),

/***/ "./node_modules/date-fns/eachWeekendOfMonth.cjs":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/eachWeekendOfMonth.cjs ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.eachWeekendOfMonth = eachWeekendOfMonth;
var _index = __webpack_require__(/*! ./eachWeekendOfInterval.cjs */ "./node_modules/date-fns/eachWeekendOfInterval.cjs");
var _index2 = __webpack_require__(/*! ./endOfMonth.cjs */ "./node_modules/date-fns/endOfMonth.cjs");
var _index3 = __webpack_require__(/*! ./startOfMonth.cjs */ "./node_modules/date-fns/startOfMonth.cjs");

/**
 * The {@link eachWeekendOfMonth} function options.
 */

/**
 * @name eachWeekendOfMonth
 * @category Month Helpers
 * @summary List all the Saturdays and Sundays in the given month.
 *
 * @description
 * Get all the Saturdays and Sundays in the given month.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The given month
 * @param options - An object with options
 *
 * @returns An array containing all the Saturdays and Sundays
 *
 * @example
 * // Lists all Saturdays and Sundays in the given month
 * const result = eachWeekendOfMonth(new Date(2022, 1, 1))
 * //=> [
 * //   Sat Feb 05 2022 00:00:00,
 * //   Sun Feb 06 2022 00:00:00,
 * //   Sat Feb 12 2022 00:00:00,
 * //   Sun Feb 13 2022 00:00:00,
 * //   Sat Feb 19 2022 00:00:00,
 * //   Sun Feb 20 2022 00:00:00,
 * //   Sat Feb 26 2022 00:00:00,
 * //   Sun Feb 27 2022 00:00:00
 * // ]
 */
function eachWeekendOfMonth(date, options) {
  const start = (0, _index3.startOfMonth)(date, options);
  const end = (0, _index2.endOfMonth)(date, options);
  return (0, _index.eachWeekendOfInterval)({ start, end }, options);
}


/***/ }),

/***/ "./node_modules/date-fns/eachWeekendOfYear.cjs":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/eachWeekendOfYear.cjs ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.eachWeekendOfYear = eachWeekendOfYear;
var _index = __webpack_require__(/*! ./eachWeekendOfInterval.cjs */ "./node_modules/date-fns/eachWeekendOfInterval.cjs");
var _index2 = __webpack_require__(/*! ./endOfYear.cjs */ "./node_modules/date-fns/endOfYear.cjs");
var _index3 = __webpack_require__(/*! ./startOfYear.cjs */ "./node_modules/date-fns/startOfYear.cjs");

/**
 * The {@link eachWeekendOfYear} function options.
 */

/**
 * @name eachWeekendOfYear
 * @category Year Helpers
 * @summary List all the Saturdays and Sundays in the year.
 *
 * @description
 * Get all the Saturdays and Sundays in the year.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The given year
 * @param options - An object with options
 *
 * @returns An array containing all the Saturdays and Sundays
 *
 * @example
 * // Lists all Saturdays and Sundays in the year
 * const result = eachWeekendOfYear(new Date(2020, 1, 1))
 * //=> [
 * //   Sat Jan 03 2020 00:00:00,
 * //   Sun Jan 04 2020 00:00:00,
 * //   ...
 * //   Sun Dec 27 2020 00:00:00
 * // ]
 * ]
 */
function eachWeekendOfYear(date, options) {
  const start = (0, _index3.startOfYear)(date, options);
  const end = (0, _index2.endOfYear)(date, options);
  return (0, _index.eachWeekendOfInterval)({ start, end }, options);
}


/***/ }),

/***/ "./node_modules/date-fns/eachYearOfInterval.cjs":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/eachYearOfInterval.cjs ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.eachYearOfInterval = eachYearOfInterval;
var _index = __webpack_require__(/*! ./_lib/normalizeInterval.cjs */ "./node_modules/date-fns/_lib/normalizeInterval.cjs");
var _index2 = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");

/**
 * The {@link eachYearOfInterval} function options.
 */

/**
 * The {@link eachYearOfInterval} function result type. It resolves the proper data type.
 * It uses the first argument date object type, starting from the date argument,
 * then the start interval date, and finally the end interval date. If
 * a context function is passed, it uses the context function return type.
 */

/**
 * @name eachYearOfInterval
 * @category Interval Helpers
 * @summary Return the array of yearly timestamps within the specified time interval.
 *
 * @description
 * Return the array of yearly timestamps within the specified time interval.
 *
 * @typeParam IntervalType - Interval type.
 * @typeParam Options - Options type.
 *
 * @param interval - The interval.
 * @param options - An object with options.
 *
 * @returns The array with starts of yearly timestamps from the month of the interval start to the month of the interval end
 *
 * @example
 * // Each year between 6 February 2014 and 10 August 2017:
 * const result = eachYearOfInterval({
 *   start: new Date(2014, 1, 6),
 *   end: new Date(2017, 7, 10)
 * })
 * //=> [
 * //   Wed Jan 01 2014 00:00:00,
 * //   Thu Jan 01 2015 00:00:00,
 * //   Fri Jan 01 2016 00:00:00,
 * //   Sun Jan 01 2017 00:00:00
 * // ]
 */
function eachYearOfInterval(interval, options) {
  const { start, end } = (0, _index.normalizeInterval)(options?.in, interval);

  let reversed = +start > +end;
  const endTime = reversed ? +start : +end;
  const date = reversed ? end : start;
  date.setHours(0, 0, 0, 0);
  date.setMonth(0, 1);

  let step = options?.step ?? 1;
  if (!step) return [];
  if (step < 0) {
    step = -step;
    reversed = !reversed;
  }

  const dates = [];

  while (+date <= endTime) {
    dates.push((0, _index2.constructFrom)(start, date));
    date.setFullYear(date.getFullYear() + step);
  }

  return reversed ? dates.reverse() : dates;
}


/***/ }),

/***/ "./node_modules/date-fns/endOfDay.cjs":
/*!********************************************!*\
  !*** ./node_modules/date-fns/endOfDay.cjs ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.endOfDay = endOfDay;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link endOfDay} function options.
 */

/**
 * @name endOfDay
 * @category Day Helpers
 * @summary Return the end of a day for the given date.
 *
 * @description
 * Return the end of a day for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The end of a day
 *
 * @example
 * // The end of a day for 2 September 2014 11:55:00:
 * const result = endOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 23:59:59.999
 */
function endOfDay(date, options) {
  const _date = (0, _index.toDate)(date, options?.in);
  _date.setHours(23, 59, 59, 999);
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/endOfDecade.cjs":
/*!***********************************************!*\
  !*** ./node_modules/date-fns/endOfDecade.cjs ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.endOfDecade = endOfDecade;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link endOfDecade} function options.
 */

/**
 * @name endOfDecade
 * @category Decade Helpers
 * @summary Return the end of a decade for the given date.
 *
 * @description
 * Return the end of a decade for the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The end of a decade
 *
 * @example
 * // The end of a decade for 12 May 1984 00:00:00:
 * const result = endOfDecade(new Date(1984, 4, 12, 00, 00, 00))
 * //=> Dec 31 1989 23:59:59.999
 */
function endOfDecade(date, options) {
  // TODO: Switch to more technical definition in of decades that start with 1
  // end with 0. I.e. 2001-2010 instead of current 2000-2009. It's a breaking
  // change, so it can only be done in 4.0.
  const _date = (0, _index.toDate)(date, options?.in);
  const year = _date.getFullYear();
  const decade = 9 + Math.floor(year / 10) * 10;
  _date.setFullYear(decade, 11, 31);
  _date.setHours(23, 59, 59, 999);
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/endOfHour.cjs":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/endOfHour.cjs ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.endOfHour = endOfHour;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link endOfHour} function options.
 */

/**
 * @name endOfHour
 * @category Hour Helpers
 * @summary Return the end of an hour for the given date.
 *
 * @description
 * Return the end of an hour for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The end of an hour
 *
 * @example
 * // The end of an hour for 2 September 2014 11:55:00:
 * const result = endOfHour(new Date(2014, 8, 2, 11, 55))
 * //=> Tue Sep 02 2014 11:59:59.999
 */
function endOfHour(date, options) {
  const _date = (0, _index.toDate)(date, options?.in);
  _date.setMinutes(59, 59, 999);
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/endOfISOWeek.cjs":
/*!************************************************!*\
  !*** ./node_modules/date-fns/endOfISOWeek.cjs ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.endOfISOWeek = endOfISOWeek;
var _index = __webpack_require__(/*! ./endOfWeek.cjs */ "./node_modules/date-fns/endOfWeek.cjs");

/**
 * The {@link endOfISOWeek} function options.
 */

/**
 * @name endOfISOWeek
 * @category ISO Week Helpers
 * @summary Return the end of an ISO week for the given date.
 *
 * @description
 * Return the end of an ISO week for the given date.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The end of an ISO week
 *
 * @example
 * // The end of an ISO week for 2 September 2014 11:55:00:
 * const result = endOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Sep 07 2014 23:59:59.999
 */
function endOfISOWeek(date, options) {
  return (0, _index.endOfWeek)(date, { ...options, weekStartsOn: 1 });
}


/***/ }),

/***/ "./node_modules/date-fns/endOfISOWeekYear.cjs":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/endOfISOWeekYear.cjs ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.endOfISOWeekYear = endOfISOWeekYear;
var _index = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
var _index2 = __webpack_require__(/*! ./getISOWeekYear.cjs */ "./node_modules/date-fns/getISOWeekYear.cjs");
var _index3 = __webpack_require__(/*! ./startOfISOWeek.cjs */ "./node_modules/date-fns/startOfISOWeek.cjs");

/**
 * The {@link endOfISOWeekYear} function options.
 */

/**
 * @name endOfISOWeekYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Return the end of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the end of an ISO week-numbering year,
 * which always starts 3 days before the year's first Thursday.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ContextDate - The `Date` type of the context function.
 *
 * @param date - The original date
 * @param options - The options
 *
 * @returns The end of an ISO week-numbering year
 *
 * @example
 * // The end of an ISO week-numbering year for 2 July 2005:
 * const result = endOfISOWeekYear(new Date(2005, 6, 2))
 * //=> Sun Jan 01 2006 23:59:59.999
 */
function endOfISOWeekYear(date, options) {
  const year = (0, _index2.getISOWeekYear)(date, options);
  const fourthOfJanuaryOfNextYear = (0, _index.constructFrom)(
    options?.in || date,
    0,
  );
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  const _date = (0, _index3.startOfISOWeek)(fourthOfJanuaryOfNextYear, options);
  _date.setMilliseconds(_date.getMilliseconds() - 1);
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/endOfMinute.cjs":
/*!***********************************************!*\
  !*** ./node_modules/date-fns/endOfMinute.cjs ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.endOfMinute = endOfMinute;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link endOfMinute} function options.
 */

/**
 * @name endOfMinute
 * @category Minute Helpers
 * @summary Return the end of a minute for the given date.
 *
 * @description
 * Return the end of a minute for the given date.
 * The result will be in the local timezone or the provided context.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The end of a minute
 *
 * @example
 * // The end of a minute for 1 December 2014 22:15:45.400:
 * const result = endOfMinute(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:59.999
 */
function endOfMinute(date, options) {
  const _date = (0, _index.toDate)(date, options?.in);
  _date.setSeconds(59, 999);
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/endOfMonth.cjs":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/endOfMonth.cjs ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.endOfMonth = endOfMonth;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link endOfMonth} function options.
 */

/**
 * @name endOfMonth
 * @category Month Helpers
 * @summary Return the end of a month for the given date.
 *
 * @description
 * Return the end of a month for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The end of a month
 *
 * @example
 * // The end of a month for 2 September 2014 11:55:00:
 * const result = endOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 23:59:59.999
 */
function endOfMonth(date, options) {
  const _date = (0, _index.toDate)(date, options?.in);
  const month = _date.getMonth();
  _date.setFullYear(_date.getFullYear(), month + 1, 0);
  _date.setHours(23, 59, 59, 999);
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/endOfQuarter.cjs":
/*!************************************************!*\
  !*** ./node_modules/date-fns/endOfQuarter.cjs ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.endOfQuarter = endOfQuarter;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link endOfQuarter} function options.
 */

/**
 * @name endOfQuarter
 * @category Quarter Helpers
 * @summary Return the end of a year quarter for the given date.
 *
 * @description
 * Return the end of a year quarter for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The end of a quarter
 *
 * @example
 * // The end of a quarter for 2 September 2014 11:55:00:
 * const result = endOfQuarter(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 23:59:59.999
 */
function endOfQuarter(date, options) {
  const _date = (0, _index.toDate)(date, options?.in);
  const currentMonth = _date.getMonth();
  const month = currentMonth - (currentMonth % 3) + 3;
  _date.setMonth(month, 0);
  _date.setHours(23, 59, 59, 999);
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/endOfSecond.cjs":
/*!***********************************************!*\
  !*** ./node_modules/date-fns/endOfSecond.cjs ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.endOfSecond = endOfSecond;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link endOfSecond} function options.
 */

/**
 * @name endOfSecond
 * @category Second Helpers
 * @summary Return the end of a second for the given date.
 *
 * @description
 * Return the end of a second for the given date.
 * The result will be in the local timezone if no `in` option is specified.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The end of a second
 *
 * @example
 * // The end of a second for 1 December 2014 22:15:45.400:
 * const result = endOfSecond(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:45.999
 */
function endOfSecond(date, options) {
  const _date = (0, _index.toDate)(date, options?.in);
  _date.setMilliseconds(999);
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/endOfToday.cjs":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/endOfToday.cjs ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.endOfToday = endOfToday;
var _index = __webpack_require__(/*! ./endOfDay.cjs */ "./node_modules/date-fns/endOfDay.cjs");

/**
 * The {@link endOfToday} function options.
 */

/**
 * @name endOfToday
 * @category Day Helpers
 * @summary Return the end of today.
 * @pure false
 *
 * @description
 * Return the end of today.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param options - The options
 *
 * @returns The end of today
 *
 * @example
 * // If today is 6 October 2014:
 * const result = endOfToday()
 * //=> Mon Oct 6 2014 23:59:59.999
 */
function endOfToday(options) {
  return (0, _index.endOfDay)(Date.now(), options);
}


/***/ }),

/***/ "./node_modules/date-fns/endOfTomorrow.cjs":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/endOfTomorrow.cjs ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.endOfTomorrow = endOfTomorrow;
var _index = __webpack_require__(/*! ./constructNow.cjs */ "./node_modules/date-fns/constructNow.cjs");

/**
 * The {@link endOfTomorrow} function options.
 */

/**
 * @name endOfTomorrow
 * @category Day Helpers
 * @summary Return the end of tomorrow.
 * @pure false
 *
 * @description
 * Return the end of tomorrow.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param options - The options
 * @returns The end of tomorrow
 *
 * @example
 * // If today is 6 October 2014:
 * const result = endOfTomorrow()
 * //=> Tue Oct 7 2014 23:59:59.999
 */
function endOfTomorrow(options) {
  const now = (0, _index.constructNow)(options?.in);
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();

  const date = (0, _index.constructNow)(options?.in);
  date.setFullYear(year, month, day + 1);
  date.setHours(23, 59, 59, 999);
  return options?.in ? options.in(date) : date;
}


/***/ }),

/***/ "./node_modules/date-fns/endOfWeek.cjs":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/endOfWeek.cjs ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.endOfWeek = endOfWeek;
var _index = __webpack_require__(/*! ./_lib/defaultOptions.cjs */ "./node_modules/date-fns/_lib/defaultOptions.cjs");
var _index2 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link endOfWeek} function options.
 */

/**
 * @name endOfWeek
 * @category Week Helpers
 * @summary Return the end of a week for the given date.
 *
 * @description
 * Return the end of a week for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The end of a week
 *
 * @example
 * // The end of a week for 2 September 2014 11:55:00:
 * const result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sat Sep 06 2014 23:59:59.999
 *
 * @example
 * // If the week starts on Monday, the end of the week for 2 September 2014 11:55:00:
 * const result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Sun Sep 07 2014 23:59:59.999
 */
function endOfWeek(date, options) {
  const defaultOptions = (0, _index.getDefaultOptions)();
  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  const _date = (0, _index2.toDate)(date, options?.in);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);

  _date.setDate(_date.getDate() + diff);
  _date.setHours(23, 59, 59, 999);
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/endOfYear.cjs":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/endOfYear.cjs ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.endOfYear = endOfYear;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link endOfYear} function options.
 */

/**
 * @name endOfYear
 * @category Year Helpers
 * @summary Return the end of a year for the given date.
 *
 * @description
 * Return the end of a year for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - The options
 *
 * @returns The end of a year
 *
 * @example
 * // The end of a year for 2 September 2014 11:55:00:
 * const result = endOfYear(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Wed Dec 31 2014 23:59:59.999
 */
function endOfYear(date, options) {
  const _date = (0, _index.toDate)(date, options?.in);
  const year = _date.getFullYear();
  _date.setFullYear(year + 1, 0, 0);
  _date.setHours(23, 59, 59, 999);
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/endOfYesterday.cjs":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/endOfYesterday.cjs ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.endOfYesterday = endOfYesterday;
var _index = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
var _index2 = __webpack_require__(/*! ./constructNow.cjs */ "./node_modules/date-fns/constructNow.cjs");

/**
 * The {@link endOfYesterday} function options.
 */

/**
 * @name endOfYesterday
 * @category Day Helpers
 * @summary Return the end of yesterday.
 * @pure false
 *
 * @description
 * Return the end of yesterday.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @returns The end of yesterday
 *
 * @example
 * // If today is 6 October 2014:
 * const result = endOfYesterday()
 * //=> Sun Oct 5 2014 23:59:59.999
 */
function endOfYesterday(options) {
  const now = (0, _index2.constructNow)(options?.in);
  const date = (0, _index.constructFrom)(options?.in, 0);
  date.setFullYear(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  date.setHours(23, 59, 59, 999);
  return date;
}


/***/ }),

/***/ "./node_modules/date-fns/format.cjs":
/*!******************************************!*\
  !*** ./node_modules/date-fns/format.cjs ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.format = exports.formatDate = format;
Object.defineProperty(exports, "formatters", ({
  enumerable: true,
  get: function () {
    return _index3.formatters;
  },
}));
Object.defineProperty(exports, "longFormatters", ({
  enumerable: true,
  get: function () {
    return _index4.longFormatters;
  },
}));
var _index = __webpack_require__(/*! ./_lib/defaultLocale.cjs */ "./node_modules/date-fns/_lib/defaultLocale.cjs");
var _index2 = __webpack_require__(/*! ./_lib/defaultOptions.cjs */ "./node_modules/date-fns/_lib/defaultOptions.cjs");
var _index3 = __webpack_require__(/*! ./_lib/format/formatters.cjs */ "./node_modules/date-fns/_lib/format/formatters.cjs");
var _index4 = __webpack_require__(/*! ./_lib/format/longFormatters.cjs */ "./node_modules/date-fns/_lib/format/longFormatters.cjs");
var _index5 = __webpack_require__(/*! ./_lib/protectedTokens.cjs */ "./node_modules/date-fns/_lib/protectedTokens.cjs");

var _index6 = __webpack_require__(/*! ./isValid.cjs */ "./node_modules/date-fns/isValid.cjs");
var _index7 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

// Rexports of internal for libraries to use.
// See: https://github.com/date-fns/date-fns/issues/3638#issuecomment-1877082874

// This RegExp consists of three parts separated by `|`:
// - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
//   (one of the certain letters followed by `o`)
// - (\w)\1* matches any sequences of the same letter
// - '' matches two quote characters in a row
// - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
//   except a single quote symbol, which ends the sequence.
//   Two quote characters do not end the sequence.
//   If there is no matching single quote
//   then the sequence will continue until the end of the string.
// - . matches any single character unmatched by previous parts of the RegExps
const formattingTokensRegExp =
  /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;

// This RegExp catches symbols escaped by quotes, and also
// sequences of symbols P, p, and the combinations like `PPPPPPPppppp`
const longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;

const escapedStringRegExp = /^'([^]*?)'?$/;
const doubleQuoteRegExp = /''/g;
const unescapedLatinCharacterRegExp = /[a-zA-Z]/;

/**
 * The {@link format} function options.
 */

/**
 * @name format
 * @alias formatDate
 * @category Common Helpers
 * @summary Format the date.
 *
 * @description
 * Return the formatted date string in the given format. The result may vary by locale.
 *
 * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
 * > See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * The characters wrapped between two single quotes characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
 * (see the last example)
 *
 * Format of the string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * with a few additions (see note 7 below the table).
 *
 * Accepted patterns:
 * | Unit                            | Pattern | Result examples                   | Notes |
 * |---------------------------------|---------|-----------------------------------|-------|
 * | Era                             | G..GGG  | AD, BC                            |       |
 * |                                 | GGGG    | Anno Domini, Before Christ        | 2     |
 * |                                 | GGGGG   | A, B                              |       |
 * | Calendar year                   | y       | 44, 1, 1900, 2017                 | 5     |
 * |                                 | yo      | 44th, 1st, 0th, 17th              | 5,7   |
 * |                                 | yy      | 44, 01, 00, 17                    | 5     |
 * |                                 | yyy     | 044, 001, 1900, 2017              | 5     |
 * |                                 | yyyy    | 0044, 0001, 1900, 2017            | 5     |
 * |                                 | yyyyy   | ...                               | 3,5   |
 * | Local week-numbering year       | Y       | 44, 1, 1900, 2017                 | 5     |
 * |                                 | Yo      | 44th, 1st, 1900th, 2017th         | 5,7   |
 * |                                 | YY      | 44, 01, 00, 17                    | 5,8   |
 * |                                 | YYY     | 044, 001, 1900, 2017              | 5     |
 * |                                 | YYYY    | 0044, 0001, 1900, 2017            | 5,8   |
 * |                                 | YYYYY   | ...                               | 3,5   |
 * | ISO week-numbering year         | R       | -43, 0, 1, 1900, 2017             | 5,7   |
 * |                                 | RR      | -43, 00, 01, 1900, 2017           | 5,7   |
 * |                                 | RRR     | -043, 000, 001, 1900, 2017        | 5,7   |
 * |                                 | RRRR    | -0043, 0000, 0001, 1900, 2017     | 5,7   |
 * |                                 | RRRRR   | ...                               | 3,5,7 |
 * | Extended year                   | u       | -43, 0, 1, 1900, 2017             | 5     |
 * |                                 | uu      | -43, 01, 1900, 2017               | 5     |
 * |                                 | uuu     | -043, 001, 1900, 2017             | 5     |
 * |                                 | uuuu    | -0043, 0001, 1900, 2017           | 5     |
 * |                                 | uuuuu   | ...                               | 3,5   |
 * | Quarter (formatting)            | Q       | 1, 2, 3, 4                        |       |
 * |                                 | Qo      | 1st, 2nd, 3rd, 4th                | 7     |
 * |                                 | QQ      | 01, 02, 03, 04                    |       |
 * |                                 | QQQ     | Q1, Q2, Q3, Q4                    |       |
 * |                                 | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 | QQQQQ   | 1, 2, 3, 4                        | 4     |
 * | Quarter (stand-alone)           | q       | 1, 2, 3, 4                        |       |
 * |                                 | qo      | 1st, 2nd, 3rd, 4th                | 7     |
 * |                                 | qq      | 01, 02, 03, 04                    |       |
 * |                                 | qqq     | Q1, Q2, Q3, Q4                    |       |
 * |                                 | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 | qqqqq   | 1, 2, 3, 4                        | 4     |
 * | Month (formatting)              | M       | 1, 2, ..., 12                     |       |
 * |                                 | Mo      | 1st, 2nd, ..., 12th               | 7     |
 * |                                 | MM      | 01, 02, ..., 12                   |       |
 * |                                 | MMM     | Jan, Feb, ..., Dec                |       |
 * |                                 | MMMM    | January, February, ..., December  | 2     |
 * |                                 | MMMMM   | J, F, ..., D                      |       |
 * | Month (stand-alone)             | L       | 1, 2, ..., 12                     |       |
 * |                                 | Lo      | 1st, 2nd, ..., 12th               | 7     |
 * |                                 | LL      | 01, 02, ..., 12                   |       |
 * |                                 | LLL     | Jan, Feb, ..., Dec                |       |
 * |                                 | LLLL    | January, February, ..., December  | 2     |
 * |                                 | LLLLL   | J, F, ..., D                      |       |
 * | Local week of year              | w       | 1, 2, ..., 53                     |       |
 * |                                 | wo      | 1st, 2nd, ..., 53th               | 7     |
 * |                                 | ww      | 01, 02, ..., 53                   |       |
 * | ISO week of year                | I       | 1, 2, ..., 53                     | 7     |
 * |                                 | Io      | 1st, 2nd, ..., 53th               | 7     |
 * |                                 | II      | 01, 02, ..., 53                   | 7     |
 * | Day of month                    | d       | 1, 2, ..., 31                     |       |
 * |                                 | do      | 1st, 2nd, ..., 31st               | 7     |
 * |                                 | dd      | 01, 02, ..., 31                   |       |
 * | Day of year                     | D       | 1, 2, ..., 365, 366               | 9     |
 * |                                 | Do      | 1st, 2nd, ..., 365th, 366th       | 7     |
 * |                                 | DD      | 01, 02, ..., 365, 366             | 9     |
 * |                                 | DDD     | 001, 002, ..., 365, 366           |       |
 * |                                 | DDDD    | ...                               | 3     |
 * | Day of week (formatting)        | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | EEEEE   | M, T, W, T, F, S, S               |       |
 * |                                 | EEEEEE  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | ISO day of week (formatting)    | i       | 1, 2, 3, ..., 7                   | 7     |
 * |                                 | io      | 1st, 2nd, ..., 7th                | 7     |
 * |                                 | ii      | 01, 02, ..., 07                   | 7     |
 * |                                 | iii     | Mon, Tue, Wed, ..., Sun           | 7     |
 * |                                 | iiii    | Monday, Tuesday, ..., Sunday      | 2,7   |
 * |                                 | iiiii   | M, T, W, T, F, S, S               | 7     |
 * |                                 | iiiiii  | Mo, Tu, We, Th, Fr, Sa, Su        | 7     |
 * | Local day of week (formatting)  | e       | 2, 3, 4, ..., 1                   |       |
 * |                                 | eo      | 2nd, 3rd, ..., 1st                | 7     |
 * |                                 | ee      | 02, 03, ..., 01                   |       |
 * |                                 | eee     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | eeeee   | M, T, W, T, F, S, S               |       |
 * |                                 | eeeeee  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | Local day of week (stand-alone) | c       | 2, 3, 4, ..., 1                   |       |
 * |                                 | co      | 2nd, 3rd, ..., 1st                | 7     |
 * |                                 | cc      | 02, 03, ..., 01                   |       |
 * |                                 | ccc     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | ccccc   | M, T, W, T, F, S, S               |       |
 * |                                 | cccccc  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | AM, PM                          | a..aa   | AM, PM                            |       |
 * |                                 | aaa     | am, pm                            |       |
 * |                                 | aaaa    | a.m., p.m.                        | 2     |
 * |                                 | aaaaa   | a, p                              |       |
 * | AM, PM, noon, midnight          | b..bb   | AM, PM, noon, midnight            |       |
 * |                                 | bbb     | am, pm, noon, midnight            |       |
 * |                                 | bbbb    | a.m., p.m., noon, midnight        | 2     |
 * |                                 | bbbbb   | a, p, n, mi                       |       |
 * | Flexible day period             | B..BBB  | at night, in the morning, ...     |       |
 * |                                 | BBBB    | at night, in the morning, ...     | 2     |
 * |                                 | BBBBB   | at night, in the morning, ...     |       |
 * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |       |
 * |                                 | ho      | 1st, 2nd, ..., 11th, 12th         | 7     |
 * |                                 | hh      | 01, 02, ..., 11, 12               |       |
 * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |       |
 * |                                 | Ho      | 0th, 1st, 2nd, ..., 23rd          | 7     |
 * |                                 | HH      | 00, 01, 02, ..., 23               |       |
 * | Hour [0-11]                     | K       | 1, 2, ..., 11, 0                  |       |
 * |                                 | Ko      | 1st, 2nd, ..., 11th, 0th          | 7     |
 * |                                 | KK      | 01, 02, ..., 11, 00               |       |
 * | Hour [1-24]                     | k       | 24, 1, 2, ..., 23                 |       |
 * |                                 | ko      | 24th, 1st, 2nd, ..., 23rd         | 7     |
 * |                                 | kk      | 24, 01, 02, ..., 23               |       |
 * | Minute                          | m       | 0, 1, ..., 59                     |       |
 * |                                 | mo      | 0th, 1st, ..., 59th               | 7     |
 * |                                 | mm      | 00, 01, ..., 59                   |       |
 * | Second                          | s       | 0, 1, ..., 59                     |       |
 * |                                 | so      | 0th, 1st, ..., 59th               | 7     |
 * |                                 | ss      | 00, 01, ..., 59                   |       |
 * | Fraction of second              | S       | 0, 1, ..., 9                      |       |
 * |                                 | SS      | 00, 01, ..., 99                   |       |
 * |                                 | SSS     | 000, 001, ..., 999                |       |
 * |                                 | SSSS    | ...                               | 3     |
 * | Timezone (ISO-8601 w/ Z)        | X       | -08, +0530, Z                     |       |
 * |                                 | XX      | -0800, +0530, Z                   |       |
 * |                                 | XXX     | -08:00, +05:30, Z                 |       |
 * |                                 | XXXX    | -0800, +0530, Z, +123456          | 2     |
 * |                                 | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
 * | Timezone (ISO-8601 w/o Z)       | x       | -08, +0530, +00                   |       |
 * |                                 | xx      | -0800, +0530, +0000               |       |
 * |                                 | xxx     | -08:00, +05:30, +00:00            | 2     |
 * |                                 | xxxx    | -0800, +0530, +0000, +123456      |       |
 * |                                 | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
 * | Timezone (GMT)                  | O...OOO | GMT-8, GMT+5:30, GMT+0            |       |
 * |                                 | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   | 2     |
 * | Timezone (specific non-locat.)  | z...zzz | GMT-8, GMT+5:30, GMT+0            | 6     |
 * |                                 | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   | 2,6   |
 * | Seconds timestamp               | t       | 512969520                         | 7     |
 * |                                 | tt      | ...                               | 3,7   |
 * | Milliseconds timestamp          | T       | 512969520900                      | 7     |
 * |                                 | TT      | ...                               | 3,7   |
 * | Long localized date             | P       | 04/29/1453                        | 7     |
 * |                                 | PP      | Apr 29, 1453                      | 7     |
 * |                                 | PPP     | April 29th, 1453                  | 7     |
 * |                                 | PPPP    | Friday, April 29th, 1453          | 2,7   |
 * | Long localized time             | p       | 12:00 AM                          | 7     |
 * |                                 | pp      | 12:00:00 AM                       | 7     |
 * |                                 | ppp     | 12:00:00 AM GMT+2                 | 7     |
 * |                                 | pppp    | 12:00:00 AM GMT+02:00             | 2,7   |
 * | Combination of date and time    | Pp      | 04/29/1453, 12:00 AM              | 7     |
 * |                                 | PPpp    | Apr 29, 1453, 12:00:00 AM         | 7     |
 * |                                 | PPPppp  | April 29th, 1453 at ...           | 7     |
 * |                                 | PPPPpppp| Friday, April 29th, 1453 at ...   | 2,7   |
 * Notes:
 * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
 *    are the same as "stand-alone" units, but are different in some languages.
 *    "Formatting" units are declined according to the rules of the language
 *    in the context of a date. "Stand-alone" units are always nominative singular:
 *
 *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
 *
 *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
 *
 * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
 *    the single quote characters (see below).
 *    If the sequence is longer than listed in table (e.g. `EEEEEEEEEEE`)
 *    the output will be the same as default pattern for this unit, usually
 *    the longest one (in case of ISO weekdays, `EEEE`). Default patterns for units
 *    are marked with "2" in the last column of the table.
 *
 *    `format(new Date(2017, 10, 6), 'MMM') //=> 'Nov'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMM') //=> 'November'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMM') //=> 'N'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMMM') //=> 'November'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMMMM') //=> 'November'`
 *
 * 3. Some patterns could be unlimited length (such as `yyyyyyyy`).
 *    The output will be padded with zeros to match the length of the pattern.
 *
 *    `format(new Date(2017, 10, 6), 'yyyyyyyy') //=> '00002017'`
 *
 * 4. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
 *    These tokens represent the shortest form of the quarter.
 *
 * 5. The main difference between `y` and `u` patterns are B.C. years:
 *
 *    | Year | `y` | `u` |
 *    |------|-----|-----|
 *    | AC 1 |   1 |   1 |
 *    | BC 1 |   1 |   0 |
 *    | BC 2 |   2 |  -1 |
 *
 *    Also `yy` always returns the last two digits of a year,
 *    while `uu` pads single digit years to 2 characters and returns other years unchanged:
 *
 *    | Year | `yy` | `uu` |
 *    |------|------|------|
 *    | 1    |   01 |   01 |
 *    | 14   |   14 |   14 |
 *    | 376  |   76 |  376 |
 *    | 1453 |   53 | 1453 |
 *
 *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
 *    except local week-numbering years are dependent on `options.weekStartsOn`
 *    and `options.firstWeekContainsDate` (compare [getISOWeekYear](https://date-fns.org/docs/getISOWeekYear)
 *    and [getWeekYear](https://date-fns.org/docs/getWeekYear)).
 *
 * 6. Specific non-location timezones are currently unavailable in `date-fns`,
 *    so right now these tokens fall back to GMT timezones.
 *
 * 7. These patterns are not in the Unicode Technical Standard #35:
 *    - `i`: ISO day of week
 *    - `I`: ISO week of year
 *    - `R`: ISO week-numbering year
 *    - `t`: seconds timestamp
 *    - `T`: milliseconds timestamp
 *    - `o`: ordinal number modifier
 *    - `P`: long localized date
 *    - `p`: long localized time
 *
 * 8. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
 *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * 9. `D` and `DD` tokens represent days of the year but they are often confused with days of the month.
 *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * @param date - The original date
 * @param format - The string of tokens
 * @param options - An object with options
 *
 * @returns The formatted date string
 *
 * @throws `date` must not be Invalid Date
 * @throws `options.locale` must contain `localize` property
 * @throws `options.locale` must contain `formatLong` property
 * @throws use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws format string contains an unescaped latin alphabet character
 *
 * @example
 * // Represent 11 February 2014 in middle-endian format:
 * const result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
 * //=> '02/11/2014'
 *
 * @example
 * // Represent 2 July 2014 in Esperanto:
 * import { eoLocale } from 'date-fns/locale/eo'
 * const result = format(new Date(2014, 6, 2), "do 'de' MMMM yyyy", {
 *   locale: eoLocale
 * })
 * //=> '2-a de julio 2014'
 *
 * @example
 * // Escape string by single quote characters:
 * const result = format(new Date(2014, 6, 2, 15), "h 'o''clock'")
 * //=> "3 o'clock"
 */
function format(date, formatStr, options) {
  const defaultOptions = (0, _index2.getDefaultOptions)();
  const locale =
    options?.locale ?? defaultOptions.locale ?? _index.defaultLocale;

  const firstWeekContainsDate =
    options?.firstWeekContainsDate ??
    options?.locale?.options?.firstWeekContainsDate ??
    defaultOptions.firstWeekContainsDate ??
    defaultOptions.locale?.options?.firstWeekContainsDate ??
    1;

  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  const originalDate = (0, _index7.toDate)(date, options?.in);

  if (!(0, _index6.isValid)(originalDate)) {
    throw new RangeError("Invalid time value");
  }

  let parts = formatStr
    .match(longFormattingTokensRegExp)
    .map((substring) => {
      const firstCharacter = substring[0];
      if (firstCharacter === "p" || firstCharacter === "P") {
        const longFormatter = _index4.longFormatters[firstCharacter];
        return longFormatter(substring, locale.formatLong);
      }
      return substring;
    })
    .join("")
    .match(formattingTokensRegExp)
    .map((substring) => {
      // Replace two single quote characters with one single quote character
      if (substring === "''") {
        return { isToken: false, value: "'" };
      }

      const firstCharacter = substring[0];
      if (firstCharacter === "'") {
        return { isToken: false, value: cleanEscapedString(substring) };
      }

      if (_index3.formatters[firstCharacter]) {
        return { isToken: true, value: substring };
      }

      if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" +
            firstCharacter +
            "`",
        );
      }

      return { isToken: false, value: substring };
    });

  // invoke localize preprocessor (only for french locales at the moment)
  if (locale.localize.preprocessor) {
    parts = locale.localize.preprocessor(originalDate, parts);
  }

  const formatterOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale,
  };

  return parts
    .map((part) => {
      if (!part.isToken) return part.value;

      const token = part.value;

      if (
        (!options?.useAdditionalWeekYearTokens &&
          (0, _index5.isProtectedWeekYearToken)(token)) ||
        (!options?.useAdditionalDayOfYearTokens &&
          (0, _index5.isProtectedDayOfYearToken)(token))
      ) {
        (0, _index5.warnOrThrowProtectedError)(token, formatStr, String(date));
      }

      const formatter = _index3.formatters[token[0]];
      return formatter(originalDate, token, locale.localize, formatterOptions);
    })
    .join("");
}

function cleanEscapedString(input) {
  const matched = input.match(escapedStringRegExp);

  if (!matched) {
    return input;
  }

  return matched[1].replace(doubleQuoteRegExp, "'");
}


/***/ }),

/***/ "./node_modules/date-fns/formatDistance.cjs":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/formatDistance.cjs ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.formatDistance = formatDistance;
var _index = __webpack_require__(/*! ./_lib/defaultLocale.cjs */ "./node_modules/date-fns/_lib/defaultLocale.cjs");
var _index2 = __webpack_require__(/*! ./_lib/defaultOptions.cjs */ "./node_modules/date-fns/_lib/defaultOptions.cjs");
var _index3 = __webpack_require__(/*! ./_lib/getTimezoneOffsetInMilliseconds.cjs */ "./node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.cjs");
var _index4 = __webpack_require__(/*! ./_lib/normalizeDates.cjs */ "./node_modules/date-fns/_lib/normalizeDates.cjs");
var _index5 = __webpack_require__(/*! ./compareAsc.cjs */ "./node_modules/date-fns/compareAsc.cjs");
var _index6 = __webpack_require__(/*! ./constants.cjs */ "./node_modules/date-fns/constants.cjs");
var _index7 = __webpack_require__(/*! ./differenceInMonths.cjs */ "./node_modules/date-fns/differenceInMonths.cjs");
var _index8 = __webpack_require__(/*! ./differenceInSeconds.cjs */ "./node_modules/date-fns/differenceInSeconds.cjs");

/**
 * The {@link formatDistance} function options.
 */

/**
 * @name formatDistance
 * @category Common Helpers
 * @summary Return the distance between the given dates in words.
 *
 * @description
 * Return the distance between the given dates in words.
 *
 * | Distance between dates                                            | Result              |
 * |-------------------------------------------------------------------|---------------------|
 * | 0 ... 30 secs                                                     | less than a minute  |
 * | 30 secs ... 1 min 30 secs                                         | 1 minute            |
 * | 1 min 30 secs ... 44 mins 30 secs                                 | [2..44] minutes     |
 * | 44 mins ... 30 secs ... 89 mins 30 secs                           | about 1 hour        |
 * | 89 mins 30 secs ... 23 hrs 59 mins 30 secs                        | about [2..24] hours |
 * | 23 hrs 59 mins 30 secs ... 41 hrs 59 mins 30 secs                 | 1 day               |
 * | 41 hrs 59 mins 30 secs ... 29 days 23 hrs 59 mins 30 secs         | [2..30] days        |
 * | 29 days 23 hrs 59 mins 30 secs ... 44 days 23 hrs 59 mins 30 secs | about 1 month       |
 * | 44 days 23 hrs 59 mins 30 secs ... 59 days 23 hrs 59 mins 30 secs | about 2 months      |
 * | 59 days 23 hrs 59 mins 30 secs ... 1 yr                           | [2..12] months      |
 * | 1 yr ... 1 yr 3 months                                            | about 1 year        |
 * | 1 yr 3 months ... 1 yr 9 month s                                  | over 1 year         |
 * | 1 yr 9 months ... 2 yrs                                           | almost 2 years      |
 * | N yrs ... N yrs 3 months                                          | about N years       |
 * | N yrs 3 months ... N yrs 9 months                                 | over N years        |
 * | N yrs 9 months ... N+1 yrs                                        | almost N+1 years    |
 *
 * With `options.includeSeconds == true`:
 * | Distance between dates | Result               |
 * |------------------------|----------------------|
 * | 0 secs ... 5 secs      | less than 5 seconds  |
 * | 5 secs ... 10 secs     | less than 10 seconds |
 * | 10 secs ... 20 secs    | less than 20 seconds |
 * | 20 secs ... 40 secs    | half a minute        |
 * | 40 secs ... 60 secs    | less than a minute   |
 * | 60 secs ... 90 secs    | 1 minute             |
 *
 * @param laterDate - The date
 * @param earlierDate - The date to compare with
 * @param options - An object with options
 *
 * @returns The distance in words
 *
 * @throws `date` must not be Invalid Date
 * @throws `baseDate` must not be Invalid Date
 * @throws `options.locale` must contain `formatDistance` property
 *
 * @example
 * // What is the distance between 2 July 2014 and 1 January 2015?
 * const result = formatDistance(new Date(2014, 6, 2), new Date(2015, 0, 1))
 * //=> '6 months'
 *
 * @example
 * // What is the distance between 1 January 2015 00:00:15
 * // and 1 January 2015 00:00:00, including seconds?
 * const result = formatDistance(
 *   new Date(2015, 0, 1, 0, 0, 15),
 *   new Date(2015, 0, 1, 0, 0, 0),
 *   { includeSeconds: true }
 * )
 * //=> 'less than 20 seconds'
 *
 * @example
 * // What is the distance from 1 January 2016
 * // to 1 January 2015, with a suffix?
 * const result = formatDistance(new Date(2015, 0, 1), new Date(2016, 0, 1), {
 *   addSuffix: true
 * })
 * //=> 'about 1 year ago'
 *
 * @example
 * // What is the distance between 1 August 2016 and 1 January 2015 in Esperanto?
 * import { eoLocale } from 'date-fns/locale/eo'
 * const result = formatDistance(new Date(2016, 7, 1), new Date(2015, 0, 1), {
 *   locale: eoLocale
 * })
 * //=> 'pli ol 1 jaro'
 */
function formatDistance(laterDate, earlierDate, options) {
  const defaultOptions = (0, _index2.getDefaultOptions)();
  const locale =
    options?.locale ?? defaultOptions.locale ?? _index.defaultLocale;
  const minutesInAlmostTwoDays = 2520;

  const comparison = (0, _index5.compareAsc)(laterDate, earlierDate);

  if (isNaN(comparison)) throw new RangeError("Invalid time value");

  const localizeOptions = Object.assign({}, options, {
    addSuffix: options?.addSuffix,
    comparison: comparison,
  });

  const [laterDate_, earlierDate_] = (0, _index4.normalizeDates)(
    options?.in,
    ...(comparison > 0 ? [earlierDate, laterDate] : [laterDate, earlierDate]),
  );

  const seconds = (0, _index8.differenceInSeconds)(earlierDate_, laterDate_);
  const offsetInSeconds =
    ((0, _index3.getTimezoneOffsetInMilliseconds)(earlierDate_) -
      (0, _index3.getTimezoneOffsetInMilliseconds)(laterDate_)) /
    1000;
  const minutes = Math.round((seconds - offsetInSeconds) / 60);
  let months;

  // 0 up to 2 mins
  if (minutes < 2) {
    if (options?.includeSeconds) {
      if (seconds < 5) {
        return locale.formatDistance("lessThanXSeconds", 5, localizeOptions);
      } else if (seconds < 10) {
        return locale.formatDistance("lessThanXSeconds", 10, localizeOptions);
      } else if (seconds < 20) {
        return locale.formatDistance("lessThanXSeconds", 20, localizeOptions);
      } else if (seconds < 40) {
        return locale.formatDistance("halfAMinute", 0, localizeOptions);
      } else if (seconds < 60) {
        return locale.formatDistance("lessThanXMinutes", 1, localizeOptions);
      } else {
        return locale.formatDistance("xMinutes", 1, localizeOptions);
      }
    } else {
      if (minutes === 0) {
        return locale.formatDistance("lessThanXMinutes", 1, localizeOptions);
      } else {
        return locale.formatDistance("xMinutes", minutes, localizeOptions);
      }
    }

    // 2 mins up to 0.75 hrs
  } else if (minutes < 45) {
    return locale.formatDistance("xMinutes", minutes, localizeOptions);

    // 0.75 hrs up to 1.5 hrs
  } else if (minutes < 90) {
    return locale.formatDistance("aboutXHours", 1, localizeOptions);

    // 1.5 hrs up to 24 hrs
  } else if (minutes < _index6.minutesInDay) {
    const hours = Math.round(minutes / 60);
    return locale.formatDistance("aboutXHours", hours, localizeOptions);

    // 1 day up to 1.75 days
  } else if (minutes < minutesInAlmostTwoDays) {
    return locale.formatDistance("xDays", 1, localizeOptions);

    // 1.75 days up to 30 days
  } else if (minutes < _index6.minutesInMonth) {
    const days = Math.round(minutes / _index6.minutesInDay);
    return locale.formatDistance("xDays", days, localizeOptions);

    // 1 month up to 2 months
  } else if (minutes < _index6.minutesInMonth * 2) {
    months = Math.round(minutes / _index6.minutesInMonth);
    return locale.formatDistance("aboutXMonths", months, localizeOptions);
  }

  months = (0, _index7.differenceInMonths)(earlierDate_, laterDate_);

  // 2 months up to 12 months
  if (months < 12) {
    const nearestMonth = Math.round(minutes / _index6.minutesInMonth);
    return locale.formatDistance("xMonths", nearestMonth, localizeOptions);

    // 1 year up to max Date
  } else {
    const monthsSinceStartOfYear = months % 12;
    const years = Math.trunc(months / 12);

    // N years up to 1 years 3 months
    if (monthsSinceStartOfYear < 3) {
      return locale.formatDistance("aboutXYears", years, localizeOptions);

      // N years 3 months up to N years 9 months
    } else if (monthsSinceStartOfYear < 9) {
      return locale.formatDistance("overXYears", years, localizeOptions);

      // N years 9 months up to N year 12 months
    } else {
      return locale.formatDistance("almostXYears", years + 1, localizeOptions);
    }
  }
}


/***/ }),

/***/ "./node_modules/date-fns/formatDistanceStrict.cjs":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/formatDistanceStrict.cjs ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.formatDistanceStrict = formatDistanceStrict;
var _index = __webpack_require__(/*! ./_lib/defaultLocale.cjs */ "./node_modules/date-fns/_lib/defaultLocale.cjs");
var _index2 = __webpack_require__(/*! ./_lib/defaultOptions.cjs */ "./node_modules/date-fns/_lib/defaultOptions.cjs");
var _index3 = __webpack_require__(/*! ./_lib/getRoundingMethod.cjs */ "./node_modules/date-fns/_lib/getRoundingMethod.cjs");
var _index4 = __webpack_require__(/*! ./_lib/getTimezoneOffsetInMilliseconds.cjs */ "./node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.cjs");
var _index5 = __webpack_require__(/*! ./_lib/normalizeDates.cjs */ "./node_modules/date-fns/_lib/normalizeDates.cjs");
var _index6 = __webpack_require__(/*! ./compareAsc.cjs */ "./node_modules/date-fns/compareAsc.cjs");
var _index7 = __webpack_require__(/*! ./constants.cjs */ "./node_modules/date-fns/constants.cjs");

/**
 * The {@link formatDistanceStrict} function options.
 */

/**
 * The unit used to format the distance in {@link formatDistanceStrict}.
 */

/**
 * @name formatDistanceStrict
 * @category Common Helpers
 * @summary Return the distance between the given dates in words.
 *
 * @description
 * Return the distance between the given dates in words, using strict units.
 * This is like `formatDistance`, but does not use helpers like 'almost', 'over',
 * 'less than' and the like.
 *
 * | Distance between dates | Result              |
 * |------------------------|---------------------|
 * | 0 ... 59 secs          | [0..59] seconds     |
 * | 1 ... 59 mins          | [1..59] minutes     |
 * | 1 ... 23 hrs           | [1..23] hours       |
 * | 1 ... 29 days          | [1..29] days        |
 * | 1 ... 11 months        | [1..11] months      |
 * | 1 ... N years          | [1..N]  years       |
 *
 * @param laterDate - The date
 * @param earlierDate - The date to compare with
 * @param options - An object with options
 *
 * @returns The distance in words
 *
 * @throws `date` must not be Invalid Date
 * @throws `baseDate` must not be Invalid Date
 * @throws `options.unit` must be 'second', 'minute', 'hour', 'day', 'month' or 'year'
 * @throws `options.locale` must contain `formatDistance` property
 *
 * @example
 * // What is the distance between 2 July 2014 and 1 January 2015?
 * const result = formatDistanceStrict(new Date(2014, 6, 2), new Date(2015, 0, 2))
 * //=> '6 months'
 *
 * @example
 * // What is the distance between 1 January 2015 00:00:15
 * // and 1 January 2015 00:00:00?
 * const result = formatDistanceStrict(
 *   new Date(2015, 0, 1, 0, 0, 15),
 *   new Date(2015, 0, 1, 0, 0, 0)
 * )
 * //=> '15 seconds'
 *
 * @example
 * // What is the distance from 1 January 2016
 * // to 1 January 2015, with a suffix?
 * const result = formatDistanceStrict(new Date(2015, 0, 1), new Date(2016, 0, 1), {
 *   addSuffix: true
 * })
 * //=> '1 year ago'
 *
 * @example
 * // What is the distance from 1 January 2016
 * // to 1 January 2015, in minutes?
 * const result = formatDistanceStrict(new Date(2016, 0, 1), new Date(2015, 0, 1), {
 *   unit: 'minute'
 * })
 * //=> '525600 minutes'
 *
 * @example
 * // What is the distance from 1 January 2015
 * // to 28 January 2015, in months, rounded up?
 * const result = formatDistanceStrict(new Date(2015, 0, 28), new Date(2015, 0, 1), {
 *   unit: 'month',
 *   roundingMethod: 'ceil'
 * })
 * //=> '1 month'
 *
 * @example
 * // What is the distance between 1 August 2016 and 1 January 2015 in Esperanto?
 * import { eoLocale } from 'date-fns/locale/eo'
 * const result = formatDistanceStrict(new Date(2016, 7, 1), new Date(2015, 0, 1), {
 *   locale: eoLocale
 * })
 * //=> '1 jaro'
 */

function formatDistanceStrict(laterDate, earlierDate, options) {
  const defaultOptions = (0, _index2.getDefaultOptions)();
  const locale =
    options?.locale ?? defaultOptions.locale ?? _index.defaultLocale;

  const comparison = (0, _index6.compareAsc)(laterDate, earlierDate);

  if (isNaN(comparison)) {
    throw new RangeError("Invalid time value");
  }

  const localizeOptions = Object.assign({}, options, {
    addSuffix: options?.addSuffix,
    comparison: comparison,
  });

  const [laterDate_, earlierDate_] = (0, _index5.normalizeDates)(
    options?.in,
    ...(comparison > 0 ? [earlierDate, laterDate] : [laterDate, earlierDate]),
  );

  const roundingMethod = (0, _index3.getRoundingMethod)(
    options?.roundingMethod ?? "round",
  );

  const milliseconds = earlierDate_.getTime() - laterDate_.getTime();
  const minutes = milliseconds / _index7.millisecondsInMinute;

  const timezoneOffset =
    (0, _index4.getTimezoneOffsetInMilliseconds)(earlierDate_) -
    (0, _index4.getTimezoneOffsetInMilliseconds)(laterDate_);

  // Use DST-normalized difference in minutes for years, months and days;
  // use regular difference in minutes for hours, minutes and seconds.
  const dstNormalizedMinutes =
    (milliseconds - timezoneOffset) / _index7.millisecondsInMinute;

  const defaultUnit = options?.unit;
  let unit;
  if (!defaultUnit) {
    if (minutes < 1) {
      unit = "second";
    } else if (minutes < 60) {
      unit = "minute";
    } else if (minutes < _index7.minutesInDay) {
      unit = "hour";
    } else if (dstNormalizedMinutes < _index7.minutesInMonth) {
      unit = "day";
    } else if (dstNormalizedMinutes < _index7.minutesInYear) {
      unit = "month";
    } else {
      unit = "year";
    }
  } else {
    unit = defaultUnit;
  }

  // 0 up to 60 seconds
  if (unit === "second") {
    const seconds = roundingMethod(milliseconds / 1000);
    return locale.formatDistance("xSeconds", seconds, localizeOptions);

    // 1 up to 60 mins
  } else if (unit === "minute") {
    const roundedMinutes = roundingMethod(minutes);
    return locale.formatDistance("xMinutes", roundedMinutes, localizeOptions);

    // 1 up to 24 hours
  } else if (unit === "hour") {
    const hours = roundingMethod(minutes / 60);
    return locale.formatDistance("xHours", hours, localizeOptions);

    // 1 up to 30 days
  } else if (unit === "day") {
    const days = roundingMethod(dstNormalizedMinutes / _index7.minutesInDay);
    return locale.formatDistance("xDays", days, localizeOptions);

    // 1 up to 12 months
  } else if (unit === "month") {
    const months = roundingMethod(
      dstNormalizedMinutes / _index7.minutesInMonth,
    );
    return months === 12 && defaultUnit !== "month"
      ? locale.formatDistance("xYears", 1, localizeOptions)
      : locale.formatDistance("xMonths", months, localizeOptions);

    // 1 year up to max Date
  } else {
    const years = roundingMethod(dstNormalizedMinutes / _index7.minutesInYear);
    return locale.formatDistance("xYears", years, localizeOptions);
  }
}


/***/ }),

/***/ "./node_modules/date-fns/formatDistanceToNow.cjs":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/formatDistanceToNow.cjs ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.formatDistanceToNow = formatDistanceToNow;
var _index = __webpack_require__(/*! ./constructNow.cjs */ "./node_modules/date-fns/constructNow.cjs");

var _index2 = __webpack_require__(/*! ./formatDistance.cjs */ "./node_modules/date-fns/formatDistance.cjs");

/**
 * The {@link formatDistanceToNow} function options.
 */

/**
 * @name formatDistanceToNow
 * @category Common Helpers
 * @summary Return the distance between the given date and now in words.
 * @pure false
 *
 * @description
 * Return the distance between the given date and now in words.
 *
 * | Distance to now                                                   | Result              |
 * |-------------------------------------------------------------------|---------------------|
 * | 0 ... 30 secs                                                     | less than a minute  |
 * | 30 secs ... 1 min 30 secs                                         | 1 minute            |
 * | 1 min 30 secs ... 44 mins 30 secs                                 | [2..44] minutes     |
 * | 44 mins ... 30 secs ... 89 mins 30 secs                           | about 1 hour        |
 * | 89 mins 30 secs ... 23 hrs 59 mins 30 secs                        | about [2..24] hours |
 * | 23 hrs 59 mins 30 secs ... 41 hrs 59 mins 30 secs                 | 1 day               |
 * | 41 hrs 59 mins 30 secs ... 29 days 23 hrs 59 mins 30 secs         | [2..30] days        |
 * | 29 days 23 hrs 59 mins 30 secs ... 44 days 23 hrs 59 mins 30 secs | about 1 month       |
 * | 44 days 23 hrs 59 mins 30 secs ... 59 days 23 hrs 59 mins 30 secs | about 2 months      |
 * | 59 days 23 hrs 59 mins 30 secs ... 1 yr                           | [2..12] months      |
 * | 1 yr ... 1 yr 3 months                                            | about 1 year        |
 * | 1 yr 3 months ... 1 yr 9 month s                                  | over 1 year         |
 * | 1 yr 9 months ... 2 yrs                                           | almost 2 years      |
 * | N yrs ... N yrs 3 months                                          | about N years       |
 * | N yrs 3 months ... N yrs 9 months                                 | over N years        |
 * | N yrs 9 months ... N+1 yrs                                        | almost N+1 years    |
 *
 * With `options.includeSeconds == true`:
 * | Distance to now     | Result               |
 * |---------------------|----------------------|
 * | 0 secs ... 5 secs   | less than 5 seconds  |
 * | 5 secs ... 10 secs  | less than 10 seconds |
 * | 10 secs ... 20 secs | less than 20 seconds |
 * | 20 secs ... 40 secs | half a minute        |
 * | 40 secs ... 60 secs | less than a minute   |
 * | 60 secs ... 90 secs | 1 minute             |
 *
 * @param date - The given date
 * @param options - The object with options
 *
 * @returns The distance in words
 *
 * @throws `date` must not be Invalid Date
 * @throws `options.locale` must contain `formatDistance` property
 *
 * @example
 * // If today is 1 January 2015, what is the distance to 2 July 2014?
 * const result = formatDistanceToNow(
 *   new Date(2014, 6, 2)
 * )
 * //=> '6 months'
 *
 * @example
 * // If now is 1 January 2015 00:00:00,
 * // what is the distance to 1 January 2015 00:00:15, including seconds?
 * const result = formatDistanceToNow(
 *   new Date(2015, 0, 1, 0, 0, 15),
 *   {includeSeconds: true}
 * )
 * //=> 'less than 20 seconds'
 *
 * @example
 * // If today is 1 January 2015,
 * // what is the distance to 1 January 2016, with a suffix?
 * const result = formatDistanceToNow(
 *   new Date(2016, 0, 1),
 *   {addSuffix: true}
 * )
 * //=> 'in about 1 year'
 *
 * @example
 * // If today is 1 January 2015,
 * // what is the distance to 1 August 2016 in Esperanto?
 * const eoLocale = require('date-fns/locale/eo')
 * const result = formatDistanceToNow(
 *   new Date(2016, 7, 1),
 *   {locale: eoLocale}
 * )
 * //=> 'pli ol 1 jaro'
 */
function formatDistanceToNow(date, options) {
  return (0, _index2.formatDistance)(
    date,
    (0, _index.constructNow)(date),
    options,
  );
}


/***/ }),

/***/ "./node_modules/date-fns/formatDistanceToNowStrict.cjs":
/*!*************************************************************!*\
  !*** ./node_modules/date-fns/formatDistanceToNowStrict.cjs ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.formatDistanceToNowStrict = formatDistanceToNowStrict;
var _index = __webpack_require__(/*! ./constructNow.cjs */ "./node_modules/date-fns/constructNow.cjs");

var _index2 = __webpack_require__(/*! ./formatDistanceStrict.cjs */ "./node_modules/date-fns/formatDistanceStrict.cjs");

/**
 * The {@link formatDistanceToNowStrict} function options.
 */

/**
 * @name formatDistanceToNowStrict
 * @category Common Helpers
 * @summary Return the distance between the given date and now in words.
 * @pure false
 *
 * @description
 * Return the distance between the given dates in words, using strict units.
 * This is like `formatDistance`, but does not use helpers like 'almost', 'over',
 * 'less than' and the like.
 *
 * | Distance between dates | Result              |
 * |------------------------|---------------------|
 * | 0 ... 59 secs          | [0..59] seconds     |
 * | 1 ... 59 mins          | [1..59] minutes     |
 * | 1 ... 23 hrs           | [1..23] hours       |
 * | 1 ... 29 days          | [1..29] days        |
 * | 1 ... 11 months        | [1..11] months      |
 * | 1 ... N years          | [1..N]  years       |
 *
 * @param date - The given date
 * @param options - An object with options.
 *
 * @returns The distance in words
 *
 * @throws `date` must not be Invalid Date
 * @throws `options.locale` must contain `formatDistance` property
 *
 * @example
 * // If today is 1 January 2015, what is the distance to 2 July 2014?
 * const result = formatDistanceToNowStrict(
 *   new Date(2014, 6, 2)
 * )
 * //=> '6 months'
 *
 * @example
 * // If now is 1 January 2015 00:00:00,
 * // what is the distance to 1 January 2015 00:00:15, including seconds?
 * const result = formatDistanceToNowStrict(
 *   new Date(2015, 0, 1, 0, 0, 15)
 * )
 * //=> '15 seconds'
 *
 * @example
 * // If today is 1 January 2015,
 * // what is the distance to 1 January 2016, with a suffix?
 * const result = formatDistanceToNowStrict(
 *   new Date(2016, 0, 1),
 *   {addSuffix: true}
 * )
 * //=> 'in 1 year'
 *
 * @example
 * // If today is 28 January 2015,
 * // what is the distance to 1 January 2015, in months, rounded up??
 * const result = formatDistanceToNowStrict(new Date(2015, 0, 1), {
 *   unit: 'month',
 *   roundingMethod: 'ceil'
 * })
 * //=> '1 month'
 *
 * @example
 * // If today is 1 January 2015,
 * // what is the distance to 1 January 2016 in Esperanto?
 * const eoLocale = require('date-fns/locale/eo')
 * const result = formatDistanceToNowStrict(
 *   new Date(2016, 0, 1),
 *   {locale: eoLocale}
 * )
 * //=> '1 jaro'
 */
function formatDistanceToNowStrict(date, options) {
  return (0, _index2.formatDistanceStrict)(
    date,
    (0, _index.constructNow)(date),
    options,
  );
}


/***/ }),

/***/ "./node_modules/date-fns/formatDuration.cjs":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/formatDuration.cjs ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.formatDuration = formatDuration;

var _index = __webpack_require__(/*! ./_lib/defaultLocale.cjs */ "./node_modules/date-fns/_lib/defaultLocale.cjs");
var _index2 = __webpack_require__(/*! ./_lib/defaultOptions.cjs */ "./node_modules/date-fns/_lib/defaultOptions.cjs");

/**
 * The {@link formatDuration} function options.
 */

const defaultFormat = [
  "years",
  "months",
  "weeks",
  "days",
  "hours",
  "minutes",
  "seconds",
];

/**
 * @name formatDuration
 * @category Common Helpers
 * @summary Formats a duration in human-readable format
 *
 * @description
 * Return human-readable duration string i.e. "9 months 2 days"
 *
 * @param duration - The duration to format
 * @param options - An object with options.
 *
 * @returns The formatted date string
 *
 * @example
 * // Format full duration
 * formatDuration({
 *   years: 2,
 *   months: 9,
 *   weeks: 1,
 *   days: 7,
 *   hours: 5,
 *   minutes: 9,
 *   seconds: 30
 * })
 * //=> '2 years 9 months 1 week 7 days 5 hours 9 minutes 30 seconds'
 *
 * @example
 * // Format partial duration
 * formatDuration({ months: 9, days: 2 })
 * //=> '9 months 2 days'
 *
 * @example
 * // Customize the format
 * formatDuration(
 *   {
 *     years: 2,
 *     months: 9,
 *     weeks: 1,
 *     days: 7,
 *     hours: 5,
 *     minutes: 9,
 *     seconds: 30
 *   },
 *   { format: ['months', 'weeks'] }
 * ) === '9 months 1 week'
 *
 * @example
 * // Customize the zeros presence
 * formatDuration({ years: 0, months: 9 })
 * //=> '9 months'
 * formatDuration({ years: 0, months: 9 }, { zero: true })
 * //=> '0 years 9 months'
 *
 * @example
 * // Customize the delimiter
 * formatDuration({ years: 2, months: 9, weeks: 3 }, { delimiter: ', ' })
 * //=> '2 years, 9 months, 3 weeks'
 */
function formatDuration(duration, options) {
  const defaultOptions = (0, _index2.getDefaultOptions)();
  const locale =
    options?.locale ?? defaultOptions.locale ?? _index.defaultLocale;
  const format = options?.format ?? defaultFormat;
  const zero = options?.zero ?? false;
  const delimiter = options?.delimiter ?? " ";

  if (!locale.formatDistance) {
    return "";
  }

  const result = format
    .reduce((acc, unit) => {
      const token = `x${unit.replace(/(^.)/, (m) => m.toUpperCase())}`;
      const value = duration[unit];
      if (value !== undefined && (zero || duration[unit])) {
        return acc.concat(locale.formatDistance(token, value));
      }
      return acc;
    }, [])
    .join(delimiter);

  return result;
}


/***/ }),

/***/ "./node_modules/date-fns/formatISO.cjs":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/formatISO.cjs ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.formatISO = formatISO;
var _index = __webpack_require__(/*! ./_lib/addLeadingZeros.cjs */ "./node_modules/date-fns/_lib/addLeadingZeros.cjs");
var _index2 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link formatISO} function options.
 */

/**
 * @name formatISO
 * @category Common Helpers
 * @summary Format the date according to the ISO 8601 standard (https://support.sas.com/documentation/cdl/en/lrdict/64316/HTML/default/viewer.htm#a003169814.htm).
 *
 * @description
 * Return the formatted date string in ISO 8601 format. Options may be passed to control the parts and notations of the date.
 *
 * @param date - The original date
 * @param options - An object with options.
 *
 * @returns The formatted date string (in local time zone)
 *
 * @throws `date` must not be Invalid Date
 *
 * @example
 * // Represent 18 September 2019 in ISO 8601 format (local time zone is UTC):
 * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52))
 * //=> '2019-09-18T19:00:52Z'
 *
 * @example
 * // Represent 18 September 2019 in ISO 8601, short format (local time zone is UTC):
 * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52), { format: 'basic' })
 * //=> '20190918T190052'
 *
 * @example
 * // Represent 18 September 2019 in ISO 8601 format, date only:
 * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52), { representation: 'date' })
 * //=> '2019-09-18'
 *
 * @example
 * // Represent 18 September 2019 in ISO 8601 format, time only (local time zone is UTC):
 * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52), { representation: 'time' })
 * //=> '19:00:52Z'
 */
function formatISO(date, options) {
  const date_ = (0, _index2.toDate)(date, options?.in);

  if (isNaN(+date_)) {
    throw new RangeError("Invalid time value");
  }

  const format = options?.format ?? "extended";
  const representation = options?.representation ?? "complete";

  let result = "";
  let tzOffset = "";

  const dateDelimiter = format === "extended" ? "-" : "";
  const timeDelimiter = format === "extended" ? ":" : "";

  // Representation is either 'date' or 'complete'
  if (representation !== "time") {
    const day = (0, _index.addLeadingZeros)(date_.getDate(), 2);
    const month = (0, _index.addLeadingZeros)(date_.getMonth() + 1, 2);
    const year = (0, _index.addLeadingZeros)(date_.getFullYear(), 4);

    // yyyyMMdd or yyyy-MM-dd.
    result = `${year}${dateDelimiter}${month}${dateDelimiter}${day}`;
  }

  // Representation is either 'time' or 'complete'
  if (representation !== "date") {
    // Add the timezone.
    const offset = date_.getTimezoneOffset();

    if (offset !== 0) {
      const absoluteOffset = Math.abs(offset);
      const hourOffset = (0, _index.addLeadingZeros)(
        Math.trunc(absoluteOffset / 60),
        2,
      );
      const minuteOffset = (0, _index.addLeadingZeros)(absoluteOffset % 60, 2);
      // If less than 0, the sign is +, because it is ahead of time.
      const sign = offset < 0 ? "+" : "-";

      tzOffset = `${sign}${hourOffset}:${minuteOffset}`;
    } else {
      tzOffset = "Z";
    }

    const hour = (0, _index.addLeadingZeros)(date_.getHours(), 2);
    const minute = (0, _index.addLeadingZeros)(date_.getMinutes(), 2);
    const second = (0, _index.addLeadingZeros)(date_.getSeconds(), 2);

    // If there's also date, separate it with time with 'T'
    const separator = result === "" ? "" : "T";

    // Creates a time string consisting of hour, minute, and second, separated by delimiters, if defined.
    const time = [hour, minute, second].join(timeDelimiter);

    // HHmmss or HH:mm:ss.
    result = `${result}${separator}${time}${tzOffset}`;
  }

  return result;
}


/***/ }),

/***/ "./node_modules/date-fns/formatISO9075.cjs":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/formatISO9075.cjs ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.formatISO9075 = formatISO9075;
var _index = __webpack_require__(/*! ./_lib/addLeadingZeros.cjs */ "./node_modules/date-fns/_lib/addLeadingZeros.cjs");
var _index2 = __webpack_require__(/*! ./isValid.cjs */ "./node_modules/date-fns/isValid.cjs");
var _index3 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link formatISO9075} function options.
 */

/**
 * @name formatISO9075
 * @category Common Helpers
 * @summary Format the date according to the ISO 9075 standard (https://dev.mysql.com/doc/refman/5.7/en/date-and-time-functions.html#function_get-format).
 *
 * @description
 * Return the formatted date string in ISO 9075 format. Options may be passed to control the parts and notations of the date.
 *
 * @param date - The original date
 * @param options - An object with options.
 *
 * @returns The formatted date string
 *
 * @throws `date` must not be Invalid Date
 *
 * @example
 * // Represent 18 September 2019 in ISO 9075 format:
 * const result = formatISO9075(new Date(2019, 8, 18, 19, 0, 52))
 * //=> '2019-09-18 19:00:52'
 *
 * @example
 * // Represent 18 September 2019 in ISO 9075, short format:
 * const result = formatISO9075(new Date(2019, 8, 18, 19, 0, 52), { format: 'basic' })
 * //=> '20190918 190052'
 *
 * @example
 * // Represent 18 September 2019 in ISO 9075 format, date only:
 * const result = formatISO9075(new Date(2019, 8, 18, 19, 0, 52), { representation: 'date' })
 * //=> '2019-09-18'
 *
 * @example
 * // Represent 18 September 2019 in ISO 9075 format, time only:
 * const result = formatISO9075(new Date(2019, 8, 18, 19, 0, 52), { representation: 'time' })
 * //=> '19:00:52'
 */
function formatISO9075(date, options) {
  const date_ = (0, _index3.toDate)(date, options?.in);

  if (!(0, _index2.isValid)(date_)) {
    throw new RangeError("Invalid time value");
  }

  const format = options?.format ?? "extended";
  const representation = options?.representation ?? "complete";

  let result = "";

  const dateDelimiter = format === "extended" ? "-" : "";
  const timeDelimiter = format === "extended" ? ":" : "";

  // Representation is either 'date' or 'complete'
  if (representation !== "time") {
    const day = (0, _index.addLeadingZeros)(date_.getDate(), 2);
    const month = (0, _index.addLeadingZeros)(date_.getMonth() + 1, 2);
    const year = (0, _index.addLeadingZeros)(date_.getFullYear(), 4);

    // yyyyMMdd or yyyy-MM-dd.
    result = `${year}${dateDelimiter}${month}${dateDelimiter}${day}`;
  }

  // Representation is either 'time' or 'complete'
  if (representation !== "date") {
    const hour = (0, _index.addLeadingZeros)(date_.getHours(), 2);
    const minute = (0, _index.addLeadingZeros)(date_.getMinutes(), 2);
    const second = (0, _index.addLeadingZeros)(date_.getSeconds(), 2);

    // If there's also date, separate it with time with a space
    const separator = result === "" ? "" : " ";

    // HHmmss or HH:mm:ss.
    result = `${result}${separator}${hour}${timeDelimiter}${minute}${timeDelimiter}${second}`;
  }

  return result;
}


/***/ }),

/***/ "./node_modules/date-fns/formatISODuration.cjs":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/formatISODuration.cjs ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.formatISODuration = formatISODuration;

/**
 * @name formatISODuration
 * @category Common Helpers
 * @summary Format a duration object according as ISO 8601 duration string
 *
 * @description
 * Format a duration object according to the ISO 8601 duration standard (https://www.digi.com/resources/documentation/digidocs//90001488-13/reference/r_iso_8601_duration_format.htm)
 *
 * @param duration - The duration to format
 *
 * @returns The ISO 8601 duration string
 *
 * @example
 * // Format the given duration as ISO 8601 string
 * const result = formatISODuration({
 *   years: 39,
 *   months: 2,
 *   days: 20,
 *   hours: 7,
 *   minutes: 5,
 *   seconds: 0
 * })
 * //=> 'P39Y2M20DT0H0M0S'
 */
function formatISODuration(duration) {
  const {
    years = 0,
    months = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
  } = duration;

  return `P${years}Y${months}M${days}DT${hours}H${minutes}M${seconds}S`;
}


/***/ }),

/***/ "./node_modules/date-fns/formatRFC3339.cjs":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/formatRFC3339.cjs ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.formatRFC3339 = formatRFC3339;
var _index = __webpack_require__(/*! ./_lib/addLeadingZeros.cjs */ "./node_modules/date-fns/_lib/addLeadingZeros.cjs");
var _index2 = __webpack_require__(/*! ./isValid.cjs */ "./node_modules/date-fns/isValid.cjs");
var _index3 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link formatRFC3339} function options.
 */

/**
 * @name formatRFC3339
 * @category Common Helpers
 * @summary Format the date according to the RFC 3339 standard (https://tools.ietf.org/html/rfc3339#section-5.6).
 *
 * @description
 * Return the formatted date string in RFC 3339 format. Options may be passed to control the parts and notations of the date.
 *
 * @param date - The original date
 * @param options - An object with options.
 *
 * @returns The formatted date string
 *
 * @throws `date` must not be Invalid Date
 *
 * @example
 * // Represent 18 September 2019 in RFC 3339 format:
 * formatRFC3339(new Date(2019, 8, 18, 19, 0, 52))
 * //=> '2019-09-18T19:00:52Z'
 *
 * @example
 * // Represent 18 September 2019 in RFC 3339 format, 3 digits of second fraction
 * formatRFC3339(new Date(2019, 8, 18, 19, 0, 52, 234), {
 *   fractionDigits: 3
 * })
 * //=> '2019-09-18T19:00:52.234Z'
 */
function formatRFC3339(date, options) {
  const date_ = (0, _index3.toDate)(date, options?.in);

  if (!(0, _index2.isValid)(date_)) {
    throw new RangeError("Invalid time value");
  }

  const fractionDigits = options?.fractionDigits ?? 0;

  const day = (0, _index.addLeadingZeros)(date_.getDate(), 2);
  const month = (0, _index.addLeadingZeros)(date_.getMonth() + 1, 2);
  const year = date_.getFullYear();

  const hour = (0, _index.addLeadingZeros)(date_.getHours(), 2);
  const minute = (0, _index.addLeadingZeros)(date_.getMinutes(), 2);
  const second = (0, _index.addLeadingZeros)(date_.getSeconds(), 2);

  let fractionalSecond = "";
  if (fractionDigits > 0) {
    const milliseconds = date_.getMilliseconds();
    const fractionalSeconds = Math.trunc(
      milliseconds * Math.pow(10, fractionDigits - 3),
    );
    fractionalSecond =
      "." + (0, _index.addLeadingZeros)(fractionalSeconds, fractionDigits);
  }

  let offset = "";
  const tzOffset = date_.getTimezoneOffset();

  if (tzOffset !== 0) {
    const absoluteOffset = Math.abs(tzOffset);
    const hourOffset = (0, _index.addLeadingZeros)(
      Math.trunc(absoluteOffset / 60),
      2,
    );
    const minuteOffset = (0, _index.addLeadingZeros)(absoluteOffset % 60, 2);
    // If less than 0, the sign is +, because it is ahead of time.
    const sign = tzOffset < 0 ? "+" : "-";

    offset = `${sign}${hourOffset}:${minuteOffset}`;
  } else {
    offset = "Z";
  }

  return `${year}-${month}-${day}T${hour}:${minute}:${second}${fractionalSecond}${offset}`;
}


/***/ }),

/***/ "./node_modules/date-fns/formatRFC7231.cjs":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/formatRFC7231.cjs ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.formatRFC7231 = formatRFC7231;
var _index = __webpack_require__(/*! ./_lib/addLeadingZeros.cjs */ "./node_modules/date-fns/_lib/addLeadingZeros.cjs");
var _index2 = __webpack_require__(/*! ./isValid.cjs */ "./node_modules/date-fns/isValid.cjs");
var _index3 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/**
 * @name formatRFC7231
 * @category Common Helpers
 * @summary Format the date according to the RFC 7231 standard (https://tools.ietf.org/html/rfc7231#section-7.1.1.1).
 *
 * @description
 * Return the formatted date string in RFC 7231 format.
 * The result will always be in UTC timezone.
 *
 * @param date - The original date
 *
 * @returns The formatted date string
 *
 * @throws `date` must not be Invalid Date
 *
 * @example
 * // Represent 18 September 2019 in RFC 7231 format:
 * const result = formatRFC7231(new Date(2019, 8, 18, 19, 0, 52))
 * //=> 'Wed, 18 Sep 2019 19:00:52 GMT'
 */
function formatRFC7231(date) {
  const _date = (0, _index3.toDate)(date);

  if (!(0, _index2.isValid)(_date)) {
    throw new RangeError("Invalid time value");
  }

  const dayName = days[_date.getUTCDay()];
  const dayOfMonth = (0, _index.addLeadingZeros)(_date.getUTCDate(), 2);
  const monthName = months[_date.getUTCMonth()];
  const year = _date.getUTCFullYear();

  const hour = (0, _index.addLeadingZeros)(_date.getUTCHours(), 2);
  const minute = (0, _index.addLeadingZeros)(_date.getUTCMinutes(), 2);
  const second = (0, _index.addLeadingZeros)(_date.getUTCSeconds(), 2);

  // Result variables.
  return `${dayName}, ${dayOfMonth} ${monthName} ${year} ${hour}:${minute}:${second} GMT`;
}


/***/ }),

/***/ "./node_modules/date-fns/formatRelative.cjs":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/formatRelative.cjs ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.formatRelative = formatRelative;
var _index = __webpack_require__(/*! ./_lib/defaultLocale.cjs */ "./node_modules/date-fns/_lib/defaultLocale.cjs");
var _index2 = __webpack_require__(/*! ./_lib/defaultOptions.cjs */ "./node_modules/date-fns/_lib/defaultOptions.cjs");
var _index3 = __webpack_require__(/*! ./_lib/normalizeDates.cjs */ "./node_modules/date-fns/_lib/normalizeDates.cjs");
var _index4 = __webpack_require__(/*! ./differenceInCalendarDays.cjs */ "./node_modules/date-fns/differenceInCalendarDays.cjs");
var _index5 = __webpack_require__(/*! ./format.cjs */ "./node_modules/date-fns/format.cjs");

/**
 * The {@link formatRelative} function options.
 */

/**
 * @name formatRelative
 * @category Common Helpers
 * @summary Represent the date in words relative to the given base date.
 *
 * @description
 * Represent the date in words relative to the given base date.
 *
 * | Distance to the base date | Result                    |
 * |---------------------------|---------------------------|
 * | Previous 6 days           | last Sunday at 04:30 AM   |
 * | Last day                  | yesterday at 04:30 AM     |
 * | Same day                  | today at 04:30 AM         |
 * | Next day                  | tomorrow at 04:30 AM      |
 * | Next 6 days               | Sunday at 04:30 AM        |
 * | Other                     | 12/31/2017                |
 *
 * @param date - The date to format
 * @param baseDate - The date to compare with
 * @param options - An object with options
 *
 * @returns The date in words
 *
 * @throws `date` must not be Invalid Date
 * @throws `baseDate` must not be Invalid Date
 * @throws `options.locale` must contain `localize` property
 * @throws `options.locale` must contain `formatLong` property
 * @throws `options.locale` must contain `formatRelative` property
 *
 * @example
 * // Represent the date of 6 days ago in words relative to the given base date. In this example, today is Wednesday
 * const result = formatRelative(subDays(new Date(), 6), new Date())
 * //=> "last Thursday at 12:45 AM"
 */
function formatRelative(date, baseDate, options) {
  const [date_, baseDate_] = (0, _index3.normalizeDates)(
    options?.in,
    date,
    baseDate,
  );

  const defaultOptions = (0, _index2.getDefaultOptions)();
  const locale =
    options?.locale ?? defaultOptions.locale ?? _index.defaultLocale;
  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  const diff = (0, _index4.differenceInCalendarDays)(date_, baseDate_);

  if (isNaN(diff)) {
    throw new RangeError("Invalid time value");
  }

  let token;
  if (diff < -6) {
    token = "other";
  } else if (diff < -1) {
    token = "lastWeek";
  } else if (diff < 0) {
    token = "yesterday";
  } else if (diff < 1) {
    token = "today";
  } else if (diff < 2) {
    token = "tomorrow";
  } else if (diff < 7) {
    token = "nextWeek";
  } else {
    token = "other";
  }

  const formatStr = locale.formatRelative(token, date_, baseDate_, {
    locale,
    weekStartsOn,
  });
  return (0, _index5.format)(date_, formatStr, { locale, weekStartsOn });
}


/***/ }),

/***/ "./node_modules/date-fns/fromUnixTime.cjs":
/*!************************************************!*\
  !*** ./node_modules/date-fns/fromUnixTime.cjs ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.fromUnixTime = fromUnixTime;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link fromUnixTime} function options.
 */

/**
 * @name fromUnixTime
 * @category Timestamp Helpers
 * @summary Create a date from a Unix timestamp.
 *
 * @description
 * Create a date from a Unix timestamp (in seconds). Decimal values will be discarded.
 *
 * @param unixTime - The given Unix timestamp (in seconds)
 * @param options - An object with options. Allows to pass a context.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @returns The date
 *
 * @example
 * // Create the date 29 February 2012 11:45:05:
 * const result = fromUnixTime(1330515905)
 * //=> Wed Feb 29 2012 11:45:05
 */
function fromUnixTime(unixTime, options) {
  return (0, _index.toDate)(unixTime * 1000, options?.in);
}


/***/ }),

/***/ "./node_modules/date-fns/getDate.cjs":
/*!*******************************************!*\
  !*** ./node_modules/date-fns/getDate.cjs ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getDate = getDate;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link getDate} function options.
 */

/**
 * @name getDate
 * @category Day Helpers
 * @summary Get the day of the month of the given date.
 *
 * @description
 * Get the day of the month of the given date.
 *
 * @param date - The given date
 * @param options - An object with options.
 *
 * @returns The day of month
 *
 * @example
 * // Which day of the month is 29 February 2012?
 * const result = getDate(new Date(2012, 1, 29))
 * //=> 29
 */
function getDate(date, options) {
  return (0, _index.toDate)(date, options?.in).getDate();
}


/***/ }),

/***/ "./node_modules/date-fns/getDay.cjs":
/*!******************************************!*\
  !*** ./node_modules/date-fns/getDay.cjs ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getDay = getDay;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link getDay} function options.
 */

/**
 * @name getDay
 * @category Weekday Helpers
 * @summary Get the day of the week of the given date.
 *
 * @description
 * Get the day of the week of the given date.
 *
 * @param date - The given date
 * @param options - The options
 *
 * @returns The day of week, 0 represents Sunday
 *
 * @example
 * // Which day of the week is 29 February 2012?
 * const result = getDay(new Date(2012, 1, 29))
 * //=> 3
 */
function getDay(date, options) {
  return (0, _index.toDate)(date, options?.in).getDay();
}


/***/ }),

/***/ "./node_modules/date-fns/getDayOfYear.cjs":
/*!************************************************!*\
  !*** ./node_modules/date-fns/getDayOfYear.cjs ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getDayOfYear = getDayOfYear;
var _index = __webpack_require__(/*! ./differenceInCalendarDays.cjs */ "./node_modules/date-fns/differenceInCalendarDays.cjs");
var _index2 = __webpack_require__(/*! ./startOfYear.cjs */ "./node_modules/date-fns/startOfYear.cjs");
var _index3 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link getDayOfYear} function options.
 */

/**
 * @name getDayOfYear
 * @category Day Helpers
 * @summary Get the day of the year of the given date.
 *
 * @description
 * Get the day of the year of the given date.
 *
 * @param date - The given date
 * @param options - The options
 *
 * @returns The day of year
 *
 * @example
 * // Which day of the year is 2 July 2014?
 * const result = getDayOfYear(new Date(2014, 6, 2))
 * //=> 183
 */
function getDayOfYear(date, options) {
  const _date = (0, _index3.toDate)(date, options?.in);
  const diff = (0, _index.differenceInCalendarDays)(
    _date,
    (0, _index2.startOfYear)(_date),
  );
  const dayOfYear = diff + 1;
  return dayOfYear;
}


/***/ }),

/***/ "./node_modules/date-fns/getDaysInMonth.cjs":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/getDaysInMonth.cjs ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getDaysInMonth = getDaysInMonth;
var _index = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
var _index2 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link getDaysInMonth} function options.
 */

/**
 * @name getDaysInMonth
 * @category Month Helpers
 * @summary Get the number of days in a month of the given date.
 *
 * @description
 * Get the number of days in a month of the given date, considering the context if provided.
 *
 * @param date - The given date
 * @param options - An object with options
 *
 * @returns The number of days in a month
 *
 * @example
 * // How many days are in February 2000?
 * const result = getDaysInMonth(new Date(2000, 1))
 * //=> 29
 */
function getDaysInMonth(date, options) {
  const _date = (0, _index2.toDate)(date, options?.in);
  const year = _date.getFullYear();
  const monthIndex = _date.getMonth();
  const lastDayOfMonth = (0, _index.constructFrom)(_date, 0);
  lastDayOfMonth.setFullYear(year, monthIndex + 1, 0);
  lastDayOfMonth.setHours(0, 0, 0, 0);
  return lastDayOfMonth.getDate();
}


/***/ }),

/***/ "./node_modules/date-fns/getDaysInYear.cjs":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/getDaysInYear.cjs ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getDaysInYear = getDaysInYear;
var _index = __webpack_require__(/*! ./isLeapYear.cjs */ "./node_modules/date-fns/isLeapYear.cjs");
var _index2 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link getDaysInYear} function options.
 */

/**
 * @name getDaysInYear
 * @category Year Helpers
 * @summary Get the number of days in a year of the given date.
 *
 * @description
 * Get the number of days in a year of the given date.
 *
 * @param date - The given date
 * @param options - An object with options
 *
 * @returns The number of days in a year
 *
 * @example
 * // How many days are in 2012?
 * const result = getDaysInYear(new Date(2012, 0, 1))
 * //=> 366
 */
function getDaysInYear(date, options) {
  const _date = (0, _index2.toDate)(date, options?.in);
  if (Number.isNaN(+_date)) return NaN;
  return (0, _index.isLeapYear)(_date) ? 366 : 365;
}


/***/ }),

/***/ "./node_modules/date-fns/getDecade.cjs":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/getDecade.cjs ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getDecade = getDecade;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link getDecade} function options.
 */

/**
 * @name getDecade
 * @category Decade Helpers
 * @summary Get the decade of the given date.
 *
 * @description
 * Get the decade of the given date.
 *
 * @param date - The given date
 * @param options - An object with options
 *
 * @returns The year of decade
 *
 * @example
 * // Which decade belongs 27 November 1942?
 * const result = getDecade(new Date(1942, 10, 27))
 * //=> 1940
 */
function getDecade(date, options) {
  // TODO: Switch to more technical definition in of decades that start with 1
  // end with 0. I.e. 2001-2010 instead of current 2000-2009. It's a breaking
  // change, so it can only be done in 4.0.
  const _date = (0, _index.toDate)(date, options?.in);
  const year = _date.getFullYear();
  const decade = Math.floor(year / 10) * 10;
  return decade;
}


/***/ }),

/***/ "./node_modules/date-fns/getDefaultOptions.cjs":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/getDefaultOptions.cjs ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getDefaultOptions = getDefaultOptions;

var _index = __webpack_require__(/*! ./_lib/defaultOptions.cjs */ "./node_modules/date-fns/_lib/defaultOptions.cjs");

/**
 * @name getDefaultOptions
 * @category Common Helpers
 * @summary Get default options.
 * @pure false
 *
 * @description
 * Returns an object that contains defaults for
 * `options.locale`, `options.weekStartsOn` and `options.firstWeekContainsDate`
 * arguments for all functions.
 *
 * You can change these with [setDefaultOptions](https://date-fns.org/docs/setDefaultOptions).
 *
 * @returns The default options
 *
 * @example
 * const result = getDefaultOptions()
 * //=> {}
 *
 * @example
 * setDefaultOptions({ weekStarsOn: 1, firstWeekContainsDate: 4 })
 * const result = getDefaultOptions()
 * //=> { weekStarsOn: 1, firstWeekContainsDate: 4 }
 */
function getDefaultOptions() {
  return Object.assign({}, (0, _index.getDefaultOptions)());
}


/***/ }),

/***/ "./node_modules/date-fns/getHours.cjs":
/*!********************************************!*\
  !*** ./node_modules/date-fns/getHours.cjs ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getHours = getHours;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link getHours} function options.
 */

/**
 * @name getHours
 * @category Hour Helpers
 * @summary Get the hours of the given date.
 *
 * @description
 * Get the hours of the given date.
 *
 * @param date - The given date
 * @param options - An object with options
 *
 * @returns The hours
 *
 * @example
 * // Get the hours of 29 February 2012 11:45:00:
 * const result = getHours(new Date(2012, 1, 29, 11, 45))
 * //=> 11
 */
function getHours(date, options) {
  return (0, _index.toDate)(date, options?.in).getHours();
}


/***/ }),

/***/ "./node_modules/date-fns/getISODay.cjs":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/getISODay.cjs ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getISODay = getISODay;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link getISODay} function options.
 */

/**
 * @name getISODay
 * @category Weekday Helpers
 * @summary Get the day of the ISO week of the given date.
 *
 * @description
 * Get the day of the ISO week of the given date,
 * which is 7 for Sunday, 1 for Monday etc.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The given date
 * @param options - An object with options
 *
 * @returns The day of ISO week
 *
 * @example
 * // Which day of the ISO week is 26 February 2012?
 * const result = getISODay(new Date(2012, 1, 26))
 * //=> 7
 */
function getISODay(date, options) {
  const day = (0, _index.toDate)(date, options?.in).getDay();
  return day === 0 ? 7 : day;
}


/***/ }),

/***/ "./node_modules/date-fns/getISOWeek.cjs":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/getISOWeek.cjs ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getISOWeek = getISOWeek;
var _index = __webpack_require__(/*! ./constants.cjs */ "./node_modules/date-fns/constants.cjs");
var _index2 = __webpack_require__(/*! ./startOfISOWeek.cjs */ "./node_modules/date-fns/startOfISOWeek.cjs");
var _index3 = __webpack_require__(/*! ./startOfISOWeekYear.cjs */ "./node_modules/date-fns/startOfISOWeekYear.cjs");
var _index4 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link getISOWeek} function options.
 */

/**
 * @name getISOWeek
 * @category ISO Week Helpers
 * @summary Get the ISO week of the given date.
 *
 * @description
 * Get the ISO week of the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The given date
 * @param options - The options
 *
 * @returns The ISO week
 *
 * @example
 * // Which week of the ISO-week numbering year is 2 January 2005?
 * const result = getISOWeek(new Date(2005, 0, 2))
 * //=> 53
 */
function getISOWeek(date, options) {
  const _date = (0, _index4.toDate)(date, options?.in);
  const diff =
    +(0, _index2.startOfISOWeek)(_date) -
    +(0, _index3.startOfISOWeekYear)(_date);

  // Round the number of weeks to the nearest integer because the number of
  // milliseconds in a week is not constant (e.g. it's different in the week of
  // the daylight saving time clock shift).
  return Math.round(diff / _index.millisecondsInWeek) + 1;
}


/***/ }),

/***/ "./node_modules/date-fns/getISOWeekYear.cjs":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/getISOWeekYear.cjs ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getISOWeekYear = getISOWeekYear;
var _index = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
var _index2 = __webpack_require__(/*! ./startOfISOWeek.cjs */ "./node_modules/date-fns/startOfISOWeek.cjs");
var _index3 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link getISOWeekYear} function options.
 */

/**
 * @name getISOWeekYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Get the ISO week-numbering year of the given date.
 *
 * @description
 * Get the ISO week-numbering year of the given date,
 * which always starts 3 days before the year's first Thursday.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The given date
 *
 * @returns The ISO week-numbering year
 *
 * @example
 * // Which ISO-week numbering year is 2 January 2005?
 * const result = getISOWeekYear(new Date(2005, 0, 2))
 * //=> 2004
 */
function getISOWeekYear(date, options) {
  const _date = (0, _index3.toDate)(date, options?.in);
  const year = _date.getFullYear();

  const fourthOfJanuaryOfNextYear = (0, _index.constructFrom)(_date, 0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = (0, _index2.startOfISOWeek)(
    fourthOfJanuaryOfNextYear,
  );

  const fourthOfJanuaryOfThisYear = (0, _index.constructFrom)(_date, 0);
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = (0, _index2.startOfISOWeek)(
    fourthOfJanuaryOfThisYear,
  );

  if (_date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (_date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}


/***/ }),

/***/ "./node_modules/date-fns/getISOWeeksInYear.cjs":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/getISOWeeksInYear.cjs ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getISOWeeksInYear = getISOWeeksInYear;
var _index = __webpack_require__(/*! ./addWeeks.cjs */ "./node_modules/date-fns/addWeeks.cjs");
var _index2 = __webpack_require__(/*! ./constants.cjs */ "./node_modules/date-fns/constants.cjs");
var _index3 = __webpack_require__(/*! ./startOfISOWeekYear.cjs */ "./node_modules/date-fns/startOfISOWeekYear.cjs");

/**
 * The {@link getISOWeeksInYear} function options.
 */

/**
 * @name getISOWeeksInYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Get the number of weeks in an ISO week-numbering year of the given date.
 *
 * @description
 * Get the number of weeks in an ISO week-numbering year of the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The given date
 * @param options - An object with options
 *
 * @returns The number of ISO weeks in a year
 *
 * @example
 * // How many weeks are in ISO week-numbering year 2015?
 * const result = getISOWeeksInYear(new Date(2015, 1, 11))
 * //=> 53
 */
function getISOWeeksInYear(date, options) {
  const thisYear = (0, _index3.startOfISOWeekYear)(date, options);
  const nextYear = (0, _index3.startOfISOWeekYear)(
    (0, _index.addWeeks)(thisYear, 60),
  );
  const diff = +nextYear - +thisYear;

  // Round the number of weeks to the nearest integer because the number of
  // milliseconds in a week is not constant (e.g. it's different in the week of
  // the daylight saving time clock shift).
  return Math.round(diff / _index2.millisecondsInWeek);
}


/***/ }),

/***/ "./node_modules/date-fns/getMilliseconds.cjs":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/getMilliseconds.cjs ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getMilliseconds = getMilliseconds;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * @name getMilliseconds
 * @category Millisecond Helpers
 * @summary Get the milliseconds of the given date.
 *
 * @description
 * Get the milliseconds of the given date.
 *
 * @param date - The given date
 *
 * @returns The milliseconds
 *
 * @example
 * // Get the milliseconds of 29 February 2012 11:45:05.123:
 * const result = getMilliseconds(new Date(2012, 1, 29, 11, 45, 5, 123))
 * //=> 123
 */
function getMilliseconds(date) {
  return (0, _index.toDate)(date).getMilliseconds();
}


/***/ }),

/***/ "./node_modules/date-fns/getMinutes.cjs":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/getMinutes.cjs ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getMinutes = getMinutes;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link getMinutes} function options.
 */

/**
 * @name getMinutes
 * @category Minute Helpers
 * @summary Get the minutes of the given date.
 *
 * @description
 * Get the minutes of the given date.
 *
 * @param date - The given date
 * @param options - The options
 *
 * @returns The minutes
 *
 * @example
 * // Get the minutes of 29 February 2012 11:45:05:
 * const result = getMinutes(new Date(2012, 1, 29, 11, 45, 5))
 * //=> 45
 */
function getMinutes(date, options) {
  return (0, _index.toDate)(date, options?.in).getMinutes();
}


/***/ }),

/***/ "./node_modules/date-fns/getMonth.cjs":
/*!********************************************!*\
  !*** ./node_modules/date-fns/getMonth.cjs ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getMonth = getMonth;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link getMonth} function options.
 */

/**
 * @name getMonth
 * @category Month Helpers
 * @summary Get the month of the given date.
 *
 * @description
 * Get the month of the given date.
 *
 * @param date - The given date
 * @param options - An object with options
 *
 * @returns The month index (0-11)
 *
 * @example
 * // Which month is 29 February 2012?
 * const result = getMonth(new Date(2012, 1, 29))
 * //=> 1
 */
function getMonth(date, options) {
  return (0, _index.toDate)(date, options?.in).getMonth();
}


/***/ }),

/***/ "./node_modules/date-fns/getOverlappingDaysInIntervals.cjs":
/*!*****************************************************************!*\
  !*** ./node_modules/date-fns/getOverlappingDaysInIntervals.cjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getOverlappingDaysInIntervals = getOverlappingDaysInIntervals;
var _index = __webpack_require__(/*! ./_lib/getTimezoneOffsetInMilliseconds.cjs */ "./node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.cjs");
var _index2 = __webpack_require__(/*! ./constants.cjs */ "./node_modules/date-fns/constants.cjs");
var _index3 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * @name getOverlappingDaysInIntervals
 * @category Interval Helpers
 * @summary Get the number of days that overlap in two time intervals
 *
 * @description
 * Get the number of days that overlap in two time intervals. It uses the time
 * between dates to calculate the number of days, rounding it up to include
 * partial days.
 *
 * Two equal 0-length intervals will result in 0. Two equal 1ms intervals will
 * result in 1.
 *
 * @param intervalLeft - The first interval to compare.
 * @param intervalRight - The second interval to compare.
 * @param options - An object with options
 *
 * @returns The number of days that overlap in two time intervals
 *
 * @example
 * // For overlapping time intervals adds 1 for each started overlapping day:
 * getOverlappingDaysInIntervals(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 17), end: new Date(2014, 0, 21) }
 * )
 * //=> 3
 *
 * @example
 * // For non-overlapping time intervals returns 0:
 * getOverlappingDaysInIntervals(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 21), end: new Date(2014, 0, 22) }
 * )
 * //=> 0
 */

function getOverlappingDaysInIntervals(intervalLeft, intervalRight) {
  const [leftStart, leftEnd] = [
    +(0, _index3.toDate)(intervalLeft.start),
    +(0, _index3.toDate)(intervalLeft.end),
  ].sort((a, b) => a - b);
  const [rightStart, rightEnd] = [
    +(0, _index3.toDate)(intervalRight.start),
    +(0, _index3.toDate)(intervalRight.end),
  ].sort((a, b) => a - b);

  // Prevent NaN result if intervals don't overlap at all.
  const isOverlapping = leftStart < rightEnd && rightStart < leftEnd;
  if (!isOverlapping) return 0;

  // Remove the timezone offset to negate the DST effect on calculations.
  const overlapLeft = rightStart < leftStart ? leftStart : rightStart;
  const left =
    overlapLeft - (0, _index.getTimezoneOffsetInMilliseconds)(overlapLeft);
  const overlapRight = rightEnd > leftEnd ? leftEnd : rightEnd;
  const right =
    overlapRight - (0, _index.getTimezoneOffsetInMilliseconds)(overlapRight);

  // Ceil the number to include partial days too.
  return Math.ceil((right - left) / _index2.millisecondsInDay);
}


/***/ }),

/***/ "./node_modules/date-fns/getQuarter.cjs":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/getQuarter.cjs ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getQuarter = getQuarter;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link getQuarter} function options.
 */

/**
 * @name getQuarter
 * @category Quarter Helpers
 * @summary Get the year quarter of the given date.
 *
 * @description
 * Get the year quarter of the given date.
 *
 * @param date - The given date
 * @param options - An object with options
 *
 * @returns The quarter
 *
 * @example
 * // Which quarter is 2 July 2014?
 * const result = getQuarter(new Date(2014, 6, 2));
 * //=> 3
 */
function getQuarter(date, options) {
  const _date = (0, _index.toDate)(date, options?.in);
  const quarter = Math.trunc(_date.getMonth() / 3) + 1;
  return quarter;
}


/***/ }),

/***/ "./node_modules/date-fns/getSeconds.cjs":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/getSeconds.cjs ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getSeconds = getSeconds;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * @name getSeconds
 * @category Second Helpers
 * @summary Get the seconds of the given date.
 *
 * @description
 * Get the seconds of the given date.
 *
 * @param date - The given date
 *
 * @returns The seconds
 *
 * @example
 * // Get the seconds of 29 February 2012 11:45:05.123:
 * const result = getSeconds(new Date(2012, 1, 29, 11, 45, 5, 123))
 * //=> 5
 */
function getSeconds(date) {
  return (0, _index.toDate)(date).getSeconds();
}


/***/ }),

/***/ "./node_modules/date-fns/getTime.cjs":
/*!*******************************************!*\
  !*** ./node_modules/date-fns/getTime.cjs ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getTime = getTime;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * @name getTime
 * @category Timestamp Helpers
 * @summary Get the milliseconds timestamp of the given date.
 *
 * @description
 * Get the milliseconds timestamp of the given date.
 *
 * @param date - The given date
 *
 * @returns The timestamp
 *
 * @example
 * // Get the timestamp of 29 February 2012 11:45:05.123:
 * const result = getTime(new Date(2012, 1, 29, 11, 45, 5, 123))
 * //=> 1330515905123
 */
function getTime(date) {
  return +(0, _index.toDate)(date);
}


/***/ }),

/***/ "./node_modules/date-fns/getUnixTime.cjs":
/*!***********************************************!*\
  !*** ./node_modules/date-fns/getUnixTime.cjs ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getUnixTime = getUnixTime;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * @name getUnixTime
 * @category Timestamp Helpers
 * @summary Get the seconds timestamp of the given date.
 *
 * @description
 * Get the seconds timestamp of the given date.
 *
 * @param date - The given date
 *
 * @returns The timestamp
 *
 * @example
 * // Get the timestamp of 29 February 2012 11:45:05 CET:
 * const result = getUnixTime(new Date(2012, 1, 29, 11, 45, 5))
 * //=> 1330512305
 */
function getUnixTime(date) {
  return Math.trunc(+(0, _index.toDate)(date) / 1000);
}


/***/ }),

/***/ "./node_modules/date-fns/getWeek.cjs":
/*!*******************************************!*\
  !*** ./node_modules/date-fns/getWeek.cjs ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getWeek = getWeek;
var _index = __webpack_require__(/*! ./constants.cjs */ "./node_modules/date-fns/constants.cjs");
var _index2 = __webpack_require__(/*! ./startOfWeek.cjs */ "./node_modules/date-fns/startOfWeek.cjs");
var _index3 = __webpack_require__(/*! ./startOfWeekYear.cjs */ "./node_modules/date-fns/startOfWeekYear.cjs");
var _index4 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link getWeek} function options.
 */

/**
 * @name getWeek
 * @category Week Helpers
 * @summary Get the local week index of the given date.
 *
 * @description
 * Get the local week index of the given date.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
 *
 * @param date - The given date
 * @param options - An object with options
 *
 * @returns The week
 *
 * @example
 * // Which week of the local week numbering year is 2 January 2005 with default options?
 * const result = getWeek(new Date(2005, 0, 2))
 * //=> 2
 *
 * @example
 * // Which week of the local week numbering year is 2 January 2005,
 * // if Monday is the first day of the week,
 * // and the first week of the year always contains 4 January?
 * const result = getWeek(new Date(2005, 0, 2), {
 *   weekStartsOn: 1,
 *   firstWeekContainsDate: 4
 * })
 * //=> 53
 */
function getWeek(date, options) {
  const _date = (0, _index4.toDate)(date, options?.in);
  const diff =
    +(0, _index2.startOfWeek)(_date, options) -
    +(0, _index3.startOfWeekYear)(_date, options);

  // Round the number of weeks to the nearest integer because the number of
  // milliseconds in a week is not constant (e.g. it's different in the week of
  // the daylight saving time clock shift).
  return Math.round(diff / _index.millisecondsInWeek) + 1;
}


/***/ }),

/***/ "./node_modules/date-fns/getWeekOfMonth.cjs":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/getWeekOfMonth.cjs ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getWeekOfMonth = getWeekOfMonth;
var _index = __webpack_require__(/*! ./_lib/defaultOptions.cjs */ "./node_modules/date-fns/_lib/defaultOptions.cjs");
var _index2 = __webpack_require__(/*! ./getDate.cjs */ "./node_modules/date-fns/getDate.cjs");
var _index3 = __webpack_require__(/*! ./getDay.cjs */ "./node_modules/date-fns/getDay.cjs");
var _index4 = __webpack_require__(/*! ./startOfMonth.cjs */ "./node_modules/date-fns/startOfMonth.cjs");
var _index5 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link getWeekOfMonth} function options.
 */

/**
 * @name getWeekOfMonth
 * @category Week Helpers
 * @summary Get the week of the month of the given date.
 *
 * @description
 * Get the week of the month of the given date.
 *
 * @param date - The given date
 * @param options - An object with options.
 *
 * @returns The week of month
 *
 * @example
 * // Which week of the month is 9 November 2017?
 * const result = getWeekOfMonth(new Date(2017, 10, 9))
 * //=> 2
 */
function getWeekOfMonth(date, options) {
  const defaultOptions = (0, _index.getDefaultOptions)();
  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  const currentDayOfMonth = (0, _index2.getDate)(
    (0, _index5.toDate)(date, options?.in),
  );
  if (isNaN(currentDayOfMonth)) return NaN;

  const startWeekDay = (0, _index3.getDay)(
    (0, _index4.startOfMonth)(date, options),
  );

  let lastDayOfFirstWeek = weekStartsOn - startWeekDay;
  if (lastDayOfFirstWeek <= 0) lastDayOfFirstWeek += 7;

  const remainingDaysAfterFirstWeek = currentDayOfMonth - lastDayOfFirstWeek;
  return Math.ceil(remainingDaysAfterFirstWeek / 7) + 1;
}


/***/ }),

/***/ "./node_modules/date-fns/getWeekYear.cjs":
/*!***********************************************!*\
  !*** ./node_modules/date-fns/getWeekYear.cjs ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getWeekYear = getWeekYear;
var _index = __webpack_require__(/*! ./_lib/defaultOptions.cjs */ "./node_modules/date-fns/_lib/defaultOptions.cjs");
var _index2 = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
var _index3 = __webpack_require__(/*! ./startOfWeek.cjs */ "./node_modules/date-fns/startOfWeek.cjs");
var _index4 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link getWeekYear} function options.
 */

/**
 * @name getWeekYear
 * @category Week-Numbering Year Helpers
 * @summary Get the local week-numbering year of the given date.
 *
 * @description
 * Get the local week-numbering year of the given date.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
 *
 * @param date - The given date
 * @param options - An object with options.
 *
 * @returns The local week-numbering year
 *
 * @example
 * // Which week numbering year is 26 December 2004 with the default settings?
 * const result = getWeekYear(new Date(2004, 11, 26))
 * //=> 2005
 *
 * @example
 * // Which week numbering year is 26 December 2004 if week starts on Saturday?
 * const result = getWeekYear(new Date(2004, 11, 26), { weekStartsOn: 6 })
 * //=> 2004
 *
 * @example
 * // Which week numbering year is 26 December 2004 if the first week contains 4 January?
 * const result = getWeekYear(new Date(2004, 11, 26), { firstWeekContainsDate: 4 })
 * //=> 2004
 */
function getWeekYear(date, options) {
  const _date = (0, _index4.toDate)(date, options?.in);
  const year = _date.getFullYear();

  const defaultOptions = (0, _index.getDefaultOptions)();
  const firstWeekContainsDate =
    options?.firstWeekContainsDate ??
    options?.locale?.options?.firstWeekContainsDate ??
    defaultOptions.firstWeekContainsDate ??
    defaultOptions.locale?.options?.firstWeekContainsDate ??
    1;

  const firstWeekOfNextYear = (0, _index2.constructFrom)(
    options?.in || date,
    0,
  );
  firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = (0, _index3.startOfWeek)(
    firstWeekOfNextYear,
    options,
  );

  const firstWeekOfThisYear = (0, _index2.constructFrom)(
    options?.in || date,
    0,
  );
  firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = (0, _index3.startOfWeek)(
    firstWeekOfThisYear,
    options,
  );

  if (+_date >= +startOfNextYear) {
    return year + 1;
  } else if (+_date >= +startOfThisYear) {
    return year;
  } else {
    return year - 1;
  }
}


/***/ }),

/***/ "./node_modules/date-fns/getWeeksInMonth.cjs":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/getWeeksInMonth.cjs ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getWeeksInMonth = getWeeksInMonth;
var _index = __webpack_require__(/*! ./differenceInCalendarWeeks.cjs */ "./node_modules/date-fns/differenceInCalendarWeeks.cjs");
var _index2 = __webpack_require__(/*! ./lastDayOfMonth.cjs */ "./node_modules/date-fns/lastDayOfMonth.cjs");
var _index3 = __webpack_require__(/*! ./startOfMonth.cjs */ "./node_modules/date-fns/startOfMonth.cjs");
var _index4 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link getWeeksInMonth} function options.
 */

/**
 * @name getWeeksInMonth
 * @category Week Helpers
 * @summary Get the number of calendar weeks a month spans.
 *
 * @description
 * Get the number of calendar weeks the month in the given date spans.
 *
 * @param date - The given date
 * @param options - An object with options.
 *
 * @returns The number of calendar weeks
 *
 * @example
 * // How many calendar weeks does February 2015 span?
 * const result = getWeeksInMonth(new Date(2015, 1, 8))
 * //=> 4
 *
 * @example
 * // If the week starts on Monday,
 * // how many calendar weeks does July 2017 span?
 * const result = getWeeksInMonth(new Date(2017, 6, 5), { weekStartsOn: 1 })
 * //=> 6
 */
function getWeeksInMonth(date, options) {
  const contextDate = (0, _index4.toDate)(date, options?.in);
  return (
    (0, _index.differenceInCalendarWeeks)(
      (0, _index2.lastDayOfMonth)(contextDate, options),
      (0, _index3.startOfMonth)(contextDate, options),
      options,
    ) + 1
  );
}


/***/ }),

/***/ "./node_modules/date-fns/getYear.cjs":
/*!*******************************************!*\
  !*** ./node_modules/date-fns/getYear.cjs ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.getYear = getYear;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link getYear} function options.
 */

/**
 * @name getYear
 * @category Year Helpers
 * @summary Get the year of the given date.
 *
 * @description
 * Get the year of the given date.
 *
 * @param date - The given date
 * @param options - An object with options
 *
 * @returns The year
 *
 * @example
 * // Which year is 2 July 2014?
 * const result = getYear(new Date(2014, 6, 2))
 * //=> 2014
 */
function getYear(date, options) {
  return (0, _index.toDate)(date, options?.in).getFullYear();
}


/***/ }),

/***/ "./node_modules/date-fns/hoursToMilliseconds.cjs":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/hoursToMilliseconds.cjs ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.hoursToMilliseconds = hoursToMilliseconds;
var _index = __webpack_require__(/*! ./constants.cjs */ "./node_modules/date-fns/constants.cjs");

/**
 * @name hoursToMilliseconds
 * @category  Conversion Helpers
 * @summary Convert hours to milliseconds.
 *
 * @description
 * Convert a number of hours to a full number of milliseconds.
 *
 * @param hours - number of hours to be converted
 *
 * @returns The number of hours converted to milliseconds
 *
 * @example
 * // Convert 2 hours to milliseconds:
 * const result = hoursToMilliseconds(2)
 * //=> 7200000
 */
function hoursToMilliseconds(hours) {
  return Math.trunc(hours * _index.millisecondsInHour);
}


/***/ }),

/***/ "./node_modules/date-fns/hoursToMinutes.cjs":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/hoursToMinutes.cjs ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.hoursToMinutes = hoursToMinutes;
var _index = __webpack_require__(/*! ./constants.cjs */ "./node_modules/date-fns/constants.cjs");

/**
 * @name hoursToMinutes
 * @category Conversion Helpers
 * @summary Convert hours to minutes.
 *
 * @description
 * Convert a number of hours to a full number of minutes.
 *
 * @param hours - number of hours to be converted
 *
 * @returns The number of hours converted in minutes
 *
 * @example
 * // Convert 2 hours to minutes:
 * const result = hoursToMinutes(2)
 * //=> 120
 */
function hoursToMinutes(hours) {
  return Math.trunc(hours * _index.minutesInHour);
}


/***/ }),

/***/ "./node_modules/date-fns/hoursToSeconds.cjs":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/hoursToSeconds.cjs ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.hoursToSeconds = hoursToSeconds;
var _index = __webpack_require__(/*! ./constants.cjs */ "./node_modules/date-fns/constants.cjs");

/**
 * @name hoursToSeconds
 * @category Conversion Helpers
 * @summary Convert hours to seconds.
 *
 * @description
 * Convert a number of hours to a full number of seconds.
 *
 * @param hours - The number of hours to be converted
 *
 * @returns The number of hours converted in seconds
 *
 * @example
 * // Convert 2 hours to seconds:
 * const result = hoursToSeconds(2)
 * //=> 7200
 */
function hoursToSeconds(hours) {
  return Math.trunc(hours * _index.secondsInHour);
}


/***/ }),

/***/ "./node_modules/date-fns/index.cjs":
/*!*****************************************!*\
  !*** ./node_modules/date-fns/index.cjs ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _index = __webpack_require__(/*! ./add.cjs */ "./node_modules/date-fns/add.cjs");
Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index[key];
    },
  });
});
var _index2 = __webpack_require__(/*! ./addBusinessDays.cjs */ "./node_modules/date-fns/addBusinessDays.cjs");
Object.keys(_index2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index2[key];
    },
  });
});
var _index3 = __webpack_require__(/*! ./addDays.cjs */ "./node_modules/date-fns/addDays.cjs");
Object.keys(_index3).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index3[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index3[key];
    },
  });
});
var _index4 = __webpack_require__(/*! ./addHours.cjs */ "./node_modules/date-fns/addHours.cjs");
Object.keys(_index4).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index4[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index4[key];
    },
  });
});
var _index5 = __webpack_require__(/*! ./addISOWeekYears.cjs */ "./node_modules/date-fns/addISOWeekYears.cjs");
Object.keys(_index5).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index5[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index5[key];
    },
  });
});
var _index6 = __webpack_require__(/*! ./addMilliseconds.cjs */ "./node_modules/date-fns/addMilliseconds.cjs");
Object.keys(_index6).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index6[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index6[key];
    },
  });
});
var _index7 = __webpack_require__(/*! ./addMinutes.cjs */ "./node_modules/date-fns/addMinutes.cjs");
Object.keys(_index7).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index7[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index7[key];
    },
  });
});
var _index8 = __webpack_require__(/*! ./addMonths.cjs */ "./node_modules/date-fns/addMonths.cjs");
Object.keys(_index8).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index8[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index8[key];
    },
  });
});
var _index9 = __webpack_require__(/*! ./addQuarters.cjs */ "./node_modules/date-fns/addQuarters.cjs");
Object.keys(_index9).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index9[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index9[key];
    },
  });
});
var _index10 = __webpack_require__(/*! ./addSeconds.cjs */ "./node_modules/date-fns/addSeconds.cjs");
Object.keys(_index10).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index10[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index10[key];
    },
  });
});
var _index11 = __webpack_require__(/*! ./addWeeks.cjs */ "./node_modules/date-fns/addWeeks.cjs");
Object.keys(_index11).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index11[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index11[key];
    },
  });
});
var _index12 = __webpack_require__(/*! ./addYears.cjs */ "./node_modules/date-fns/addYears.cjs");
Object.keys(_index12).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index12[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index12[key];
    },
  });
});
var _index13 = __webpack_require__(/*! ./areIntervalsOverlapping.cjs */ "./node_modules/date-fns/areIntervalsOverlapping.cjs");
Object.keys(_index13).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index13[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index13[key];
    },
  });
});
var _index14 = __webpack_require__(/*! ./clamp.cjs */ "./node_modules/date-fns/clamp.cjs");
Object.keys(_index14).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index14[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index14[key];
    },
  });
});
var _index15 = __webpack_require__(/*! ./closestIndexTo.cjs */ "./node_modules/date-fns/closestIndexTo.cjs");
Object.keys(_index15).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index15[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index15[key];
    },
  });
});
var _index16 = __webpack_require__(/*! ./closestTo.cjs */ "./node_modules/date-fns/closestTo.cjs");
Object.keys(_index16).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index16[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index16[key];
    },
  });
});
var _index17 = __webpack_require__(/*! ./compareAsc.cjs */ "./node_modules/date-fns/compareAsc.cjs");
Object.keys(_index17).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index17[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index17[key];
    },
  });
});
var _index18 = __webpack_require__(/*! ./compareDesc.cjs */ "./node_modules/date-fns/compareDesc.cjs");
Object.keys(_index18).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index18[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index18[key];
    },
  });
});
var _index19 = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
Object.keys(_index19).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index19[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index19[key];
    },
  });
});
var _index20 = __webpack_require__(/*! ./constructNow.cjs */ "./node_modules/date-fns/constructNow.cjs");
Object.keys(_index20).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index20[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index20[key];
    },
  });
});
var _index21 = __webpack_require__(/*! ./daysToWeeks.cjs */ "./node_modules/date-fns/daysToWeeks.cjs");
Object.keys(_index21).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index21[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index21[key];
    },
  });
});
var _index22 = __webpack_require__(/*! ./differenceInBusinessDays.cjs */ "./node_modules/date-fns/differenceInBusinessDays.cjs");
Object.keys(_index22).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index22[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index22[key];
    },
  });
});
var _index23 = __webpack_require__(/*! ./differenceInCalendarDays.cjs */ "./node_modules/date-fns/differenceInCalendarDays.cjs");
Object.keys(_index23).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index23[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index23[key];
    },
  });
});
var _index24 = __webpack_require__(/*! ./differenceInCalendarISOWeekYears.cjs */ "./node_modules/date-fns/differenceInCalendarISOWeekYears.cjs");
Object.keys(_index24).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index24[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index24[key];
    },
  });
});
var _index25 = __webpack_require__(/*! ./differenceInCalendarISOWeeks.cjs */ "./node_modules/date-fns/differenceInCalendarISOWeeks.cjs");
Object.keys(_index25).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index25[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index25[key];
    },
  });
});
var _index26 = __webpack_require__(/*! ./differenceInCalendarMonths.cjs */ "./node_modules/date-fns/differenceInCalendarMonths.cjs");
Object.keys(_index26).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index26[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index26[key];
    },
  });
});
var _index27 = __webpack_require__(/*! ./differenceInCalendarQuarters.cjs */ "./node_modules/date-fns/differenceInCalendarQuarters.cjs");
Object.keys(_index27).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index27[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index27[key];
    },
  });
});
var _index28 = __webpack_require__(/*! ./differenceInCalendarWeeks.cjs */ "./node_modules/date-fns/differenceInCalendarWeeks.cjs");
Object.keys(_index28).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index28[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index28[key];
    },
  });
});
var _index29 = __webpack_require__(/*! ./differenceInCalendarYears.cjs */ "./node_modules/date-fns/differenceInCalendarYears.cjs");
Object.keys(_index29).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index29[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index29[key];
    },
  });
});
var _index30 = __webpack_require__(/*! ./differenceInDays.cjs */ "./node_modules/date-fns/differenceInDays.cjs");
Object.keys(_index30).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index30[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index30[key];
    },
  });
});
var _index31 = __webpack_require__(/*! ./differenceInHours.cjs */ "./node_modules/date-fns/differenceInHours.cjs");
Object.keys(_index31).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index31[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index31[key];
    },
  });
});
var _index32 = __webpack_require__(/*! ./differenceInISOWeekYears.cjs */ "./node_modules/date-fns/differenceInISOWeekYears.cjs");
Object.keys(_index32).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index32[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index32[key];
    },
  });
});
var _index33 = __webpack_require__(/*! ./differenceInMilliseconds.cjs */ "./node_modules/date-fns/differenceInMilliseconds.cjs");
Object.keys(_index33).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index33[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index33[key];
    },
  });
});
var _index34 = __webpack_require__(/*! ./differenceInMinutes.cjs */ "./node_modules/date-fns/differenceInMinutes.cjs");
Object.keys(_index34).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index34[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index34[key];
    },
  });
});
var _index35 = __webpack_require__(/*! ./differenceInMonths.cjs */ "./node_modules/date-fns/differenceInMonths.cjs");
Object.keys(_index35).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index35[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index35[key];
    },
  });
});
var _index36 = __webpack_require__(/*! ./differenceInQuarters.cjs */ "./node_modules/date-fns/differenceInQuarters.cjs");
Object.keys(_index36).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index36[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index36[key];
    },
  });
});
var _index37 = __webpack_require__(/*! ./differenceInSeconds.cjs */ "./node_modules/date-fns/differenceInSeconds.cjs");
Object.keys(_index37).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index37[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index37[key];
    },
  });
});
var _index38 = __webpack_require__(/*! ./differenceInWeeks.cjs */ "./node_modules/date-fns/differenceInWeeks.cjs");
Object.keys(_index38).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index38[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index38[key];
    },
  });
});
var _index39 = __webpack_require__(/*! ./differenceInYears.cjs */ "./node_modules/date-fns/differenceInYears.cjs");
Object.keys(_index39).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index39[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index39[key];
    },
  });
});
var _index40 = __webpack_require__(/*! ./eachDayOfInterval.cjs */ "./node_modules/date-fns/eachDayOfInterval.cjs");
Object.keys(_index40).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index40[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index40[key];
    },
  });
});
var _index41 = __webpack_require__(/*! ./eachHourOfInterval.cjs */ "./node_modules/date-fns/eachHourOfInterval.cjs");
Object.keys(_index41).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index41[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index41[key];
    },
  });
});
var _index42 = __webpack_require__(/*! ./eachMinuteOfInterval.cjs */ "./node_modules/date-fns/eachMinuteOfInterval.cjs");
Object.keys(_index42).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index42[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index42[key];
    },
  });
});
var _index43 = __webpack_require__(/*! ./eachMonthOfInterval.cjs */ "./node_modules/date-fns/eachMonthOfInterval.cjs");
Object.keys(_index43).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index43[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index43[key];
    },
  });
});
var _index44 = __webpack_require__(/*! ./eachQuarterOfInterval.cjs */ "./node_modules/date-fns/eachQuarterOfInterval.cjs");
Object.keys(_index44).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index44[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index44[key];
    },
  });
});
var _index45 = __webpack_require__(/*! ./eachWeekOfInterval.cjs */ "./node_modules/date-fns/eachWeekOfInterval.cjs");
Object.keys(_index45).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index45[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index45[key];
    },
  });
});
var _index46 = __webpack_require__(/*! ./eachWeekendOfInterval.cjs */ "./node_modules/date-fns/eachWeekendOfInterval.cjs");
Object.keys(_index46).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index46[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index46[key];
    },
  });
});
var _index47 = __webpack_require__(/*! ./eachWeekendOfMonth.cjs */ "./node_modules/date-fns/eachWeekendOfMonth.cjs");
Object.keys(_index47).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index47[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index47[key];
    },
  });
});
var _index48 = __webpack_require__(/*! ./eachWeekendOfYear.cjs */ "./node_modules/date-fns/eachWeekendOfYear.cjs");
Object.keys(_index48).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index48[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index48[key];
    },
  });
});
var _index49 = __webpack_require__(/*! ./eachYearOfInterval.cjs */ "./node_modules/date-fns/eachYearOfInterval.cjs");
Object.keys(_index49).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index49[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index49[key];
    },
  });
});
var _index50 = __webpack_require__(/*! ./endOfDay.cjs */ "./node_modules/date-fns/endOfDay.cjs");
Object.keys(_index50).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index50[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index50[key];
    },
  });
});
var _index51 = __webpack_require__(/*! ./endOfDecade.cjs */ "./node_modules/date-fns/endOfDecade.cjs");
Object.keys(_index51).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index51[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index51[key];
    },
  });
});
var _index52 = __webpack_require__(/*! ./endOfHour.cjs */ "./node_modules/date-fns/endOfHour.cjs");
Object.keys(_index52).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index52[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index52[key];
    },
  });
});
var _index53 = __webpack_require__(/*! ./endOfISOWeek.cjs */ "./node_modules/date-fns/endOfISOWeek.cjs");
Object.keys(_index53).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index53[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index53[key];
    },
  });
});
var _index54 = __webpack_require__(/*! ./endOfISOWeekYear.cjs */ "./node_modules/date-fns/endOfISOWeekYear.cjs");
Object.keys(_index54).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index54[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index54[key];
    },
  });
});
var _index55 = __webpack_require__(/*! ./endOfMinute.cjs */ "./node_modules/date-fns/endOfMinute.cjs");
Object.keys(_index55).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index55[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index55[key];
    },
  });
});
var _index56 = __webpack_require__(/*! ./endOfMonth.cjs */ "./node_modules/date-fns/endOfMonth.cjs");
Object.keys(_index56).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index56[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index56[key];
    },
  });
});
var _index57 = __webpack_require__(/*! ./endOfQuarter.cjs */ "./node_modules/date-fns/endOfQuarter.cjs");
Object.keys(_index57).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index57[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index57[key];
    },
  });
});
var _index58 = __webpack_require__(/*! ./endOfSecond.cjs */ "./node_modules/date-fns/endOfSecond.cjs");
Object.keys(_index58).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index58[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index58[key];
    },
  });
});
var _index59 = __webpack_require__(/*! ./endOfToday.cjs */ "./node_modules/date-fns/endOfToday.cjs");
Object.keys(_index59).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index59[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index59[key];
    },
  });
});
var _index60 = __webpack_require__(/*! ./endOfTomorrow.cjs */ "./node_modules/date-fns/endOfTomorrow.cjs");
Object.keys(_index60).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index60[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index60[key];
    },
  });
});
var _index61 = __webpack_require__(/*! ./endOfWeek.cjs */ "./node_modules/date-fns/endOfWeek.cjs");
Object.keys(_index61).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index61[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index61[key];
    },
  });
});
var _index62 = __webpack_require__(/*! ./endOfYear.cjs */ "./node_modules/date-fns/endOfYear.cjs");
Object.keys(_index62).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index62[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index62[key];
    },
  });
});
var _index63 = __webpack_require__(/*! ./endOfYesterday.cjs */ "./node_modules/date-fns/endOfYesterday.cjs");
Object.keys(_index63).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index63[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index63[key];
    },
  });
});
var _index64 = __webpack_require__(/*! ./format.cjs */ "./node_modules/date-fns/format.cjs");
Object.keys(_index64).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index64[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index64[key];
    },
  });
});
var _index65 = __webpack_require__(/*! ./formatDistance.cjs */ "./node_modules/date-fns/formatDistance.cjs");
Object.keys(_index65).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index65[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index65[key];
    },
  });
});
var _index66 = __webpack_require__(/*! ./formatDistanceStrict.cjs */ "./node_modules/date-fns/formatDistanceStrict.cjs");
Object.keys(_index66).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index66[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index66[key];
    },
  });
});
var _index67 = __webpack_require__(/*! ./formatDistanceToNow.cjs */ "./node_modules/date-fns/formatDistanceToNow.cjs");
Object.keys(_index67).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index67[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index67[key];
    },
  });
});
var _index68 = __webpack_require__(/*! ./formatDistanceToNowStrict.cjs */ "./node_modules/date-fns/formatDistanceToNowStrict.cjs");
Object.keys(_index68).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index68[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index68[key];
    },
  });
});
var _index69 = __webpack_require__(/*! ./formatDuration.cjs */ "./node_modules/date-fns/formatDuration.cjs");
Object.keys(_index69).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index69[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index69[key];
    },
  });
});
var _index70 = __webpack_require__(/*! ./formatISO.cjs */ "./node_modules/date-fns/formatISO.cjs");
Object.keys(_index70).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index70[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index70[key];
    },
  });
});
var _index71 = __webpack_require__(/*! ./formatISO9075.cjs */ "./node_modules/date-fns/formatISO9075.cjs");
Object.keys(_index71).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index71[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index71[key];
    },
  });
});
var _index72 = __webpack_require__(/*! ./formatISODuration.cjs */ "./node_modules/date-fns/formatISODuration.cjs");
Object.keys(_index72).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index72[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index72[key];
    },
  });
});
var _index73 = __webpack_require__(/*! ./formatRFC3339.cjs */ "./node_modules/date-fns/formatRFC3339.cjs");
Object.keys(_index73).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index73[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index73[key];
    },
  });
});
var _index74 = __webpack_require__(/*! ./formatRFC7231.cjs */ "./node_modules/date-fns/formatRFC7231.cjs");
Object.keys(_index74).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index74[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index74[key];
    },
  });
});
var _index75 = __webpack_require__(/*! ./formatRelative.cjs */ "./node_modules/date-fns/formatRelative.cjs");
Object.keys(_index75).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index75[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index75[key];
    },
  });
});
var _index76 = __webpack_require__(/*! ./fromUnixTime.cjs */ "./node_modules/date-fns/fromUnixTime.cjs");
Object.keys(_index76).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index76[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index76[key];
    },
  });
});
var _index77 = __webpack_require__(/*! ./getDate.cjs */ "./node_modules/date-fns/getDate.cjs");
Object.keys(_index77).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index77[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index77[key];
    },
  });
});
var _index78 = __webpack_require__(/*! ./getDay.cjs */ "./node_modules/date-fns/getDay.cjs");
Object.keys(_index78).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index78[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index78[key];
    },
  });
});
var _index79 = __webpack_require__(/*! ./getDayOfYear.cjs */ "./node_modules/date-fns/getDayOfYear.cjs");
Object.keys(_index79).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index79[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index79[key];
    },
  });
});
var _index80 = __webpack_require__(/*! ./getDaysInMonth.cjs */ "./node_modules/date-fns/getDaysInMonth.cjs");
Object.keys(_index80).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index80[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index80[key];
    },
  });
});
var _index81 = __webpack_require__(/*! ./getDaysInYear.cjs */ "./node_modules/date-fns/getDaysInYear.cjs");
Object.keys(_index81).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index81[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index81[key];
    },
  });
});
var _index82 = __webpack_require__(/*! ./getDecade.cjs */ "./node_modules/date-fns/getDecade.cjs");
Object.keys(_index82).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index82[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index82[key];
    },
  });
});
var _index83 = __webpack_require__(/*! ./getDefaultOptions.cjs */ "./node_modules/date-fns/getDefaultOptions.cjs");
Object.keys(_index83).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index83[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index83[key];
    },
  });
});
var _index84 = __webpack_require__(/*! ./getHours.cjs */ "./node_modules/date-fns/getHours.cjs");
Object.keys(_index84).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index84[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index84[key];
    },
  });
});
var _index85 = __webpack_require__(/*! ./getISODay.cjs */ "./node_modules/date-fns/getISODay.cjs");
Object.keys(_index85).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index85[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index85[key];
    },
  });
});
var _index86 = __webpack_require__(/*! ./getISOWeek.cjs */ "./node_modules/date-fns/getISOWeek.cjs");
Object.keys(_index86).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index86[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index86[key];
    },
  });
});
var _index87 = __webpack_require__(/*! ./getISOWeekYear.cjs */ "./node_modules/date-fns/getISOWeekYear.cjs");
Object.keys(_index87).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index87[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index87[key];
    },
  });
});
var _index88 = __webpack_require__(/*! ./getISOWeeksInYear.cjs */ "./node_modules/date-fns/getISOWeeksInYear.cjs");
Object.keys(_index88).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index88[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index88[key];
    },
  });
});
var _index89 = __webpack_require__(/*! ./getMilliseconds.cjs */ "./node_modules/date-fns/getMilliseconds.cjs");
Object.keys(_index89).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index89[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index89[key];
    },
  });
});
var _index90 = __webpack_require__(/*! ./getMinutes.cjs */ "./node_modules/date-fns/getMinutes.cjs");
Object.keys(_index90).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index90[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index90[key];
    },
  });
});
var _index91 = __webpack_require__(/*! ./getMonth.cjs */ "./node_modules/date-fns/getMonth.cjs");
Object.keys(_index91).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index91[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index91[key];
    },
  });
});
var _index92 = __webpack_require__(/*! ./getOverlappingDaysInIntervals.cjs */ "./node_modules/date-fns/getOverlappingDaysInIntervals.cjs");
Object.keys(_index92).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index92[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index92[key];
    },
  });
});
var _index93 = __webpack_require__(/*! ./getQuarter.cjs */ "./node_modules/date-fns/getQuarter.cjs");
Object.keys(_index93).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index93[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index93[key];
    },
  });
});
var _index94 = __webpack_require__(/*! ./getSeconds.cjs */ "./node_modules/date-fns/getSeconds.cjs");
Object.keys(_index94).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index94[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index94[key];
    },
  });
});
var _index95 = __webpack_require__(/*! ./getTime.cjs */ "./node_modules/date-fns/getTime.cjs");
Object.keys(_index95).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index95[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index95[key];
    },
  });
});
var _index96 = __webpack_require__(/*! ./getUnixTime.cjs */ "./node_modules/date-fns/getUnixTime.cjs");
Object.keys(_index96).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index96[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index96[key];
    },
  });
});
var _index97 = __webpack_require__(/*! ./getWeek.cjs */ "./node_modules/date-fns/getWeek.cjs");
Object.keys(_index97).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index97[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index97[key];
    },
  });
});
var _index98 = __webpack_require__(/*! ./getWeekOfMonth.cjs */ "./node_modules/date-fns/getWeekOfMonth.cjs");
Object.keys(_index98).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index98[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index98[key];
    },
  });
});
var _index99 = __webpack_require__(/*! ./getWeekYear.cjs */ "./node_modules/date-fns/getWeekYear.cjs");
Object.keys(_index99).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index99[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index99[key];
    },
  });
});
var _index100 = __webpack_require__(/*! ./getWeeksInMonth.cjs */ "./node_modules/date-fns/getWeeksInMonth.cjs");
Object.keys(_index100).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index100[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index100[key];
    },
  });
});
var _index101 = __webpack_require__(/*! ./getYear.cjs */ "./node_modules/date-fns/getYear.cjs");
Object.keys(_index101).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index101[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index101[key];
    },
  });
});
var _index102 = __webpack_require__(/*! ./hoursToMilliseconds.cjs */ "./node_modules/date-fns/hoursToMilliseconds.cjs");
Object.keys(_index102).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index102[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index102[key];
    },
  });
});
var _index103 = __webpack_require__(/*! ./hoursToMinutes.cjs */ "./node_modules/date-fns/hoursToMinutes.cjs");
Object.keys(_index103).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index103[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index103[key];
    },
  });
});
var _index104 = __webpack_require__(/*! ./hoursToSeconds.cjs */ "./node_modules/date-fns/hoursToSeconds.cjs");
Object.keys(_index104).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index104[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index104[key];
    },
  });
});
var _index105 = __webpack_require__(/*! ./interval.cjs */ "./node_modules/date-fns/interval.cjs");
Object.keys(_index105).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index105[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index105[key];
    },
  });
});
var _index106 = __webpack_require__(/*! ./intervalToDuration.cjs */ "./node_modules/date-fns/intervalToDuration.cjs");
Object.keys(_index106).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index106[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index106[key];
    },
  });
});
var _index107 = __webpack_require__(/*! ./intlFormat.cjs */ "./node_modules/date-fns/intlFormat.cjs");
Object.keys(_index107).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index107[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index107[key];
    },
  });
});
var _index108 = __webpack_require__(/*! ./intlFormatDistance.cjs */ "./node_modules/date-fns/intlFormatDistance.cjs");
Object.keys(_index108).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index108[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index108[key];
    },
  });
});
var _index109 = __webpack_require__(/*! ./isAfter.cjs */ "./node_modules/date-fns/isAfter.cjs");
Object.keys(_index109).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index109[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index109[key];
    },
  });
});
var _index110 = __webpack_require__(/*! ./isBefore.cjs */ "./node_modules/date-fns/isBefore.cjs");
Object.keys(_index110).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index110[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index110[key];
    },
  });
});
var _index111 = __webpack_require__(/*! ./isDate.cjs */ "./node_modules/date-fns/isDate.cjs");
Object.keys(_index111).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index111[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index111[key];
    },
  });
});
var _index112 = __webpack_require__(/*! ./isEqual.cjs */ "./node_modules/date-fns/isEqual.cjs");
Object.keys(_index112).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index112[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index112[key];
    },
  });
});
var _index113 = __webpack_require__(/*! ./isExists.cjs */ "./node_modules/date-fns/isExists.cjs");
Object.keys(_index113).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index113[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index113[key];
    },
  });
});
var _index114 = __webpack_require__(/*! ./isFirstDayOfMonth.cjs */ "./node_modules/date-fns/isFirstDayOfMonth.cjs");
Object.keys(_index114).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index114[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index114[key];
    },
  });
});
var _index115 = __webpack_require__(/*! ./isFriday.cjs */ "./node_modules/date-fns/isFriday.cjs");
Object.keys(_index115).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index115[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index115[key];
    },
  });
});
var _index116 = __webpack_require__(/*! ./isFuture.cjs */ "./node_modules/date-fns/isFuture.cjs");
Object.keys(_index116).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index116[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index116[key];
    },
  });
});
var _index117 = __webpack_require__(/*! ./isLastDayOfMonth.cjs */ "./node_modules/date-fns/isLastDayOfMonth.cjs");
Object.keys(_index117).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index117[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index117[key];
    },
  });
});
var _index118 = __webpack_require__(/*! ./isLeapYear.cjs */ "./node_modules/date-fns/isLeapYear.cjs");
Object.keys(_index118).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index118[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index118[key];
    },
  });
});
var _index119 = __webpack_require__(/*! ./isMatch.cjs */ "./node_modules/date-fns/isMatch.cjs");
Object.keys(_index119).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index119[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index119[key];
    },
  });
});
var _index120 = __webpack_require__(/*! ./isMonday.cjs */ "./node_modules/date-fns/isMonday.cjs");
Object.keys(_index120).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index120[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index120[key];
    },
  });
});
var _index121 = __webpack_require__(/*! ./isPast.cjs */ "./node_modules/date-fns/isPast.cjs");
Object.keys(_index121).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index121[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index121[key];
    },
  });
});
var _index122 = __webpack_require__(/*! ./isSameDay.cjs */ "./node_modules/date-fns/isSameDay.cjs");
Object.keys(_index122).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index122[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index122[key];
    },
  });
});
var _index123 = __webpack_require__(/*! ./isSameHour.cjs */ "./node_modules/date-fns/isSameHour.cjs");
Object.keys(_index123).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index123[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index123[key];
    },
  });
});
var _index124 = __webpack_require__(/*! ./isSameISOWeek.cjs */ "./node_modules/date-fns/isSameISOWeek.cjs");
Object.keys(_index124).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index124[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index124[key];
    },
  });
});
var _index125 = __webpack_require__(/*! ./isSameISOWeekYear.cjs */ "./node_modules/date-fns/isSameISOWeekYear.cjs");
Object.keys(_index125).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index125[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index125[key];
    },
  });
});
var _index126 = __webpack_require__(/*! ./isSameMinute.cjs */ "./node_modules/date-fns/isSameMinute.cjs");
Object.keys(_index126).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index126[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index126[key];
    },
  });
});
var _index127 = __webpack_require__(/*! ./isSameMonth.cjs */ "./node_modules/date-fns/isSameMonth.cjs");
Object.keys(_index127).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index127[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index127[key];
    },
  });
});
var _index128 = __webpack_require__(/*! ./isSameQuarter.cjs */ "./node_modules/date-fns/isSameQuarter.cjs");
Object.keys(_index128).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index128[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index128[key];
    },
  });
});
var _index129 = __webpack_require__(/*! ./isSameSecond.cjs */ "./node_modules/date-fns/isSameSecond.cjs");
Object.keys(_index129).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index129[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index129[key];
    },
  });
});
var _index130 = __webpack_require__(/*! ./isSameWeek.cjs */ "./node_modules/date-fns/isSameWeek.cjs");
Object.keys(_index130).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index130[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index130[key];
    },
  });
});
var _index131 = __webpack_require__(/*! ./isSameYear.cjs */ "./node_modules/date-fns/isSameYear.cjs");
Object.keys(_index131).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index131[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index131[key];
    },
  });
});
var _index132 = __webpack_require__(/*! ./isSaturday.cjs */ "./node_modules/date-fns/isSaturday.cjs");
Object.keys(_index132).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index132[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index132[key];
    },
  });
});
var _index133 = __webpack_require__(/*! ./isSunday.cjs */ "./node_modules/date-fns/isSunday.cjs");
Object.keys(_index133).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index133[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index133[key];
    },
  });
});
var _index134 = __webpack_require__(/*! ./isThisHour.cjs */ "./node_modules/date-fns/isThisHour.cjs");
Object.keys(_index134).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index134[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index134[key];
    },
  });
});
var _index135 = __webpack_require__(/*! ./isThisISOWeek.cjs */ "./node_modules/date-fns/isThisISOWeek.cjs");
Object.keys(_index135).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index135[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index135[key];
    },
  });
});
var _index136 = __webpack_require__(/*! ./isThisMinute.cjs */ "./node_modules/date-fns/isThisMinute.cjs");
Object.keys(_index136).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index136[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index136[key];
    },
  });
});
var _index137 = __webpack_require__(/*! ./isThisMonth.cjs */ "./node_modules/date-fns/isThisMonth.cjs");
Object.keys(_index137).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index137[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index137[key];
    },
  });
});
var _index138 = __webpack_require__(/*! ./isThisQuarter.cjs */ "./node_modules/date-fns/isThisQuarter.cjs");
Object.keys(_index138).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index138[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index138[key];
    },
  });
});
var _index139 = __webpack_require__(/*! ./isThisSecond.cjs */ "./node_modules/date-fns/isThisSecond.cjs");
Object.keys(_index139).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index139[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index139[key];
    },
  });
});
var _index140 = __webpack_require__(/*! ./isThisWeek.cjs */ "./node_modules/date-fns/isThisWeek.cjs");
Object.keys(_index140).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index140[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index140[key];
    },
  });
});
var _index141 = __webpack_require__(/*! ./isThisYear.cjs */ "./node_modules/date-fns/isThisYear.cjs");
Object.keys(_index141).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index141[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index141[key];
    },
  });
});
var _index142 = __webpack_require__(/*! ./isThursday.cjs */ "./node_modules/date-fns/isThursday.cjs");
Object.keys(_index142).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index142[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index142[key];
    },
  });
});
var _index143 = __webpack_require__(/*! ./isToday.cjs */ "./node_modules/date-fns/isToday.cjs");
Object.keys(_index143).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index143[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index143[key];
    },
  });
});
var _index144 = __webpack_require__(/*! ./isTomorrow.cjs */ "./node_modules/date-fns/isTomorrow.cjs");
Object.keys(_index144).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index144[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index144[key];
    },
  });
});
var _index145 = __webpack_require__(/*! ./isTuesday.cjs */ "./node_modules/date-fns/isTuesday.cjs");
Object.keys(_index145).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index145[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index145[key];
    },
  });
});
var _index146 = __webpack_require__(/*! ./isValid.cjs */ "./node_modules/date-fns/isValid.cjs");
Object.keys(_index146).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index146[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index146[key];
    },
  });
});
var _index147 = __webpack_require__(/*! ./isWednesday.cjs */ "./node_modules/date-fns/isWednesday.cjs");
Object.keys(_index147).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index147[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index147[key];
    },
  });
});
var _index148 = __webpack_require__(/*! ./isWeekend.cjs */ "./node_modules/date-fns/isWeekend.cjs");
Object.keys(_index148).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index148[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index148[key];
    },
  });
});
var _index149 = __webpack_require__(/*! ./isWithinInterval.cjs */ "./node_modules/date-fns/isWithinInterval.cjs");
Object.keys(_index149).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index149[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index149[key];
    },
  });
});
var _index150 = __webpack_require__(/*! ./isYesterday.cjs */ "./node_modules/date-fns/isYesterday.cjs");
Object.keys(_index150).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index150[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index150[key];
    },
  });
});
var _index151 = __webpack_require__(/*! ./lastDayOfDecade.cjs */ "./node_modules/date-fns/lastDayOfDecade.cjs");
Object.keys(_index151).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index151[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index151[key];
    },
  });
});
var _index152 = __webpack_require__(/*! ./lastDayOfISOWeek.cjs */ "./node_modules/date-fns/lastDayOfISOWeek.cjs");
Object.keys(_index152).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index152[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index152[key];
    },
  });
});
var _index153 = __webpack_require__(/*! ./lastDayOfISOWeekYear.cjs */ "./node_modules/date-fns/lastDayOfISOWeekYear.cjs");
Object.keys(_index153).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index153[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index153[key];
    },
  });
});
var _index154 = __webpack_require__(/*! ./lastDayOfMonth.cjs */ "./node_modules/date-fns/lastDayOfMonth.cjs");
Object.keys(_index154).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index154[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index154[key];
    },
  });
});
var _index155 = __webpack_require__(/*! ./lastDayOfQuarter.cjs */ "./node_modules/date-fns/lastDayOfQuarter.cjs");
Object.keys(_index155).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index155[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index155[key];
    },
  });
});
var _index156 = __webpack_require__(/*! ./lastDayOfWeek.cjs */ "./node_modules/date-fns/lastDayOfWeek.cjs");
Object.keys(_index156).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index156[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index156[key];
    },
  });
});
var _index157 = __webpack_require__(/*! ./lastDayOfYear.cjs */ "./node_modules/date-fns/lastDayOfYear.cjs");
Object.keys(_index157).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index157[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index157[key];
    },
  });
});
var _index158 = __webpack_require__(/*! ./lightFormat.cjs */ "./node_modules/date-fns/lightFormat.cjs");
Object.keys(_index158).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index158[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index158[key];
    },
  });
});
var _index159 = __webpack_require__(/*! ./max.cjs */ "./node_modules/date-fns/max.cjs");
Object.keys(_index159).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index159[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index159[key];
    },
  });
});
var _index160 = __webpack_require__(/*! ./milliseconds.cjs */ "./node_modules/date-fns/milliseconds.cjs");
Object.keys(_index160).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index160[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index160[key];
    },
  });
});
var _index161 = __webpack_require__(/*! ./millisecondsToHours.cjs */ "./node_modules/date-fns/millisecondsToHours.cjs");
Object.keys(_index161).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index161[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index161[key];
    },
  });
});
var _index162 = __webpack_require__(/*! ./millisecondsToMinutes.cjs */ "./node_modules/date-fns/millisecondsToMinutes.cjs");
Object.keys(_index162).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index162[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index162[key];
    },
  });
});
var _index163 = __webpack_require__(/*! ./millisecondsToSeconds.cjs */ "./node_modules/date-fns/millisecondsToSeconds.cjs");
Object.keys(_index163).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index163[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index163[key];
    },
  });
});
var _index164 = __webpack_require__(/*! ./min.cjs */ "./node_modules/date-fns/min.cjs");
Object.keys(_index164).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index164[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index164[key];
    },
  });
});
var _index165 = __webpack_require__(/*! ./minutesToHours.cjs */ "./node_modules/date-fns/minutesToHours.cjs");
Object.keys(_index165).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index165[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index165[key];
    },
  });
});
var _index166 = __webpack_require__(/*! ./minutesToMilliseconds.cjs */ "./node_modules/date-fns/minutesToMilliseconds.cjs");
Object.keys(_index166).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index166[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index166[key];
    },
  });
});
var _index167 = __webpack_require__(/*! ./minutesToSeconds.cjs */ "./node_modules/date-fns/minutesToSeconds.cjs");
Object.keys(_index167).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index167[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index167[key];
    },
  });
});
var _index168 = __webpack_require__(/*! ./monthsToQuarters.cjs */ "./node_modules/date-fns/monthsToQuarters.cjs");
Object.keys(_index168).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index168[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index168[key];
    },
  });
});
var _index169 = __webpack_require__(/*! ./monthsToYears.cjs */ "./node_modules/date-fns/monthsToYears.cjs");
Object.keys(_index169).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index169[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index169[key];
    },
  });
});
var _index170 = __webpack_require__(/*! ./nextDay.cjs */ "./node_modules/date-fns/nextDay.cjs");
Object.keys(_index170).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index170[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index170[key];
    },
  });
});
var _index171 = __webpack_require__(/*! ./nextFriday.cjs */ "./node_modules/date-fns/nextFriday.cjs");
Object.keys(_index171).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index171[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index171[key];
    },
  });
});
var _index172 = __webpack_require__(/*! ./nextMonday.cjs */ "./node_modules/date-fns/nextMonday.cjs");
Object.keys(_index172).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index172[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index172[key];
    },
  });
});
var _index173 = __webpack_require__(/*! ./nextSaturday.cjs */ "./node_modules/date-fns/nextSaturday.cjs");
Object.keys(_index173).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index173[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index173[key];
    },
  });
});
var _index174 = __webpack_require__(/*! ./nextSunday.cjs */ "./node_modules/date-fns/nextSunday.cjs");
Object.keys(_index174).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index174[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index174[key];
    },
  });
});
var _index175 = __webpack_require__(/*! ./nextThursday.cjs */ "./node_modules/date-fns/nextThursday.cjs");
Object.keys(_index175).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index175[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index175[key];
    },
  });
});
var _index176 = __webpack_require__(/*! ./nextTuesday.cjs */ "./node_modules/date-fns/nextTuesday.cjs");
Object.keys(_index176).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index176[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index176[key];
    },
  });
});
var _index177 = __webpack_require__(/*! ./nextWednesday.cjs */ "./node_modules/date-fns/nextWednesday.cjs");
Object.keys(_index177).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index177[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index177[key];
    },
  });
});
var _index178 = __webpack_require__(/*! ./parse.cjs */ "./node_modules/date-fns/parse.cjs");
Object.keys(_index178).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index178[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index178[key];
    },
  });
});
var _index179 = __webpack_require__(/*! ./parseISO.cjs */ "./node_modules/date-fns/parseISO.cjs");
Object.keys(_index179).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index179[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index179[key];
    },
  });
});
var _index180 = __webpack_require__(/*! ./parseJSON.cjs */ "./node_modules/date-fns/parseJSON.cjs");
Object.keys(_index180).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index180[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index180[key];
    },
  });
});
var _index181 = __webpack_require__(/*! ./previousDay.cjs */ "./node_modules/date-fns/previousDay.cjs");
Object.keys(_index181).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index181[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index181[key];
    },
  });
});
var _index182 = __webpack_require__(/*! ./previousFriday.cjs */ "./node_modules/date-fns/previousFriday.cjs");
Object.keys(_index182).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index182[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index182[key];
    },
  });
});
var _index183 = __webpack_require__(/*! ./previousMonday.cjs */ "./node_modules/date-fns/previousMonday.cjs");
Object.keys(_index183).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index183[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index183[key];
    },
  });
});
var _index184 = __webpack_require__(/*! ./previousSaturday.cjs */ "./node_modules/date-fns/previousSaturday.cjs");
Object.keys(_index184).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index184[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index184[key];
    },
  });
});
var _index185 = __webpack_require__(/*! ./previousSunday.cjs */ "./node_modules/date-fns/previousSunday.cjs");
Object.keys(_index185).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index185[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index185[key];
    },
  });
});
var _index186 = __webpack_require__(/*! ./previousThursday.cjs */ "./node_modules/date-fns/previousThursday.cjs");
Object.keys(_index186).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index186[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index186[key];
    },
  });
});
var _index187 = __webpack_require__(/*! ./previousTuesday.cjs */ "./node_modules/date-fns/previousTuesday.cjs");
Object.keys(_index187).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index187[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index187[key];
    },
  });
});
var _index188 = __webpack_require__(/*! ./previousWednesday.cjs */ "./node_modules/date-fns/previousWednesday.cjs");
Object.keys(_index188).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index188[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index188[key];
    },
  });
});
var _index189 = __webpack_require__(/*! ./quartersToMonths.cjs */ "./node_modules/date-fns/quartersToMonths.cjs");
Object.keys(_index189).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index189[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index189[key];
    },
  });
});
var _index190 = __webpack_require__(/*! ./quartersToYears.cjs */ "./node_modules/date-fns/quartersToYears.cjs");
Object.keys(_index190).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index190[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index190[key];
    },
  });
});
var _index191 = __webpack_require__(/*! ./roundToNearestHours.cjs */ "./node_modules/date-fns/roundToNearestHours.cjs");
Object.keys(_index191).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index191[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index191[key];
    },
  });
});
var _index192 = __webpack_require__(/*! ./roundToNearestMinutes.cjs */ "./node_modules/date-fns/roundToNearestMinutes.cjs");
Object.keys(_index192).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index192[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index192[key];
    },
  });
});
var _index193 = __webpack_require__(/*! ./secondsToHours.cjs */ "./node_modules/date-fns/secondsToHours.cjs");
Object.keys(_index193).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index193[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index193[key];
    },
  });
});
var _index194 = __webpack_require__(/*! ./secondsToMilliseconds.cjs */ "./node_modules/date-fns/secondsToMilliseconds.cjs");
Object.keys(_index194).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index194[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index194[key];
    },
  });
});
var _index195 = __webpack_require__(/*! ./secondsToMinutes.cjs */ "./node_modules/date-fns/secondsToMinutes.cjs");
Object.keys(_index195).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index195[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index195[key];
    },
  });
});
var _index196 = __webpack_require__(/*! ./set.cjs */ "./node_modules/date-fns/set.cjs");
Object.keys(_index196).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index196[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index196[key];
    },
  });
});
var _index197 = __webpack_require__(/*! ./setDate.cjs */ "./node_modules/date-fns/setDate.cjs");
Object.keys(_index197).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index197[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index197[key];
    },
  });
});
var _index198 = __webpack_require__(/*! ./setDay.cjs */ "./node_modules/date-fns/setDay.cjs");
Object.keys(_index198).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index198[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index198[key];
    },
  });
});
var _index199 = __webpack_require__(/*! ./setDayOfYear.cjs */ "./node_modules/date-fns/setDayOfYear.cjs");
Object.keys(_index199).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index199[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index199[key];
    },
  });
});
var _index200 = __webpack_require__(/*! ./setDefaultOptions.cjs */ "./node_modules/date-fns/setDefaultOptions.cjs");
Object.keys(_index200).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index200[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index200[key];
    },
  });
});
var _index201 = __webpack_require__(/*! ./setHours.cjs */ "./node_modules/date-fns/setHours.cjs");
Object.keys(_index201).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index201[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index201[key];
    },
  });
});
var _index202 = __webpack_require__(/*! ./setISODay.cjs */ "./node_modules/date-fns/setISODay.cjs");
Object.keys(_index202).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index202[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index202[key];
    },
  });
});
var _index203 = __webpack_require__(/*! ./setISOWeek.cjs */ "./node_modules/date-fns/setISOWeek.cjs");
Object.keys(_index203).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index203[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index203[key];
    },
  });
});
var _index204 = __webpack_require__(/*! ./setISOWeekYear.cjs */ "./node_modules/date-fns/setISOWeekYear.cjs");
Object.keys(_index204).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index204[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index204[key];
    },
  });
});
var _index205 = __webpack_require__(/*! ./setMilliseconds.cjs */ "./node_modules/date-fns/setMilliseconds.cjs");
Object.keys(_index205).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index205[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index205[key];
    },
  });
});
var _index206 = __webpack_require__(/*! ./setMinutes.cjs */ "./node_modules/date-fns/setMinutes.cjs");
Object.keys(_index206).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index206[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index206[key];
    },
  });
});
var _index207 = __webpack_require__(/*! ./setMonth.cjs */ "./node_modules/date-fns/setMonth.cjs");
Object.keys(_index207).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index207[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index207[key];
    },
  });
});
var _index208 = __webpack_require__(/*! ./setQuarter.cjs */ "./node_modules/date-fns/setQuarter.cjs");
Object.keys(_index208).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index208[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index208[key];
    },
  });
});
var _index209 = __webpack_require__(/*! ./setSeconds.cjs */ "./node_modules/date-fns/setSeconds.cjs");
Object.keys(_index209).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index209[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index209[key];
    },
  });
});
var _index210 = __webpack_require__(/*! ./setWeek.cjs */ "./node_modules/date-fns/setWeek.cjs");
Object.keys(_index210).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index210[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index210[key];
    },
  });
});
var _index211 = __webpack_require__(/*! ./setWeekYear.cjs */ "./node_modules/date-fns/setWeekYear.cjs");
Object.keys(_index211).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index211[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index211[key];
    },
  });
});
var _index212 = __webpack_require__(/*! ./setYear.cjs */ "./node_modules/date-fns/setYear.cjs");
Object.keys(_index212).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index212[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index212[key];
    },
  });
});
var _index213 = __webpack_require__(/*! ./startOfDay.cjs */ "./node_modules/date-fns/startOfDay.cjs");
Object.keys(_index213).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index213[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index213[key];
    },
  });
});
var _index214 = __webpack_require__(/*! ./startOfDecade.cjs */ "./node_modules/date-fns/startOfDecade.cjs");
Object.keys(_index214).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index214[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index214[key];
    },
  });
});
var _index215 = __webpack_require__(/*! ./startOfHour.cjs */ "./node_modules/date-fns/startOfHour.cjs");
Object.keys(_index215).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index215[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index215[key];
    },
  });
});
var _index216 = __webpack_require__(/*! ./startOfISOWeek.cjs */ "./node_modules/date-fns/startOfISOWeek.cjs");
Object.keys(_index216).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index216[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index216[key];
    },
  });
});
var _index217 = __webpack_require__(/*! ./startOfISOWeekYear.cjs */ "./node_modules/date-fns/startOfISOWeekYear.cjs");
Object.keys(_index217).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index217[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index217[key];
    },
  });
});
var _index218 = __webpack_require__(/*! ./startOfMinute.cjs */ "./node_modules/date-fns/startOfMinute.cjs");
Object.keys(_index218).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index218[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index218[key];
    },
  });
});
var _index219 = __webpack_require__(/*! ./startOfMonth.cjs */ "./node_modules/date-fns/startOfMonth.cjs");
Object.keys(_index219).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index219[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index219[key];
    },
  });
});
var _index220 = __webpack_require__(/*! ./startOfQuarter.cjs */ "./node_modules/date-fns/startOfQuarter.cjs");
Object.keys(_index220).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index220[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index220[key];
    },
  });
});
var _index221 = __webpack_require__(/*! ./startOfSecond.cjs */ "./node_modules/date-fns/startOfSecond.cjs");
Object.keys(_index221).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index221[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index221[key];
    },
  });
});
var _index222 = __webpack_require__(/*! ./startOfToday.cjs */ "./node_modules/date-fns/startOfToday.cjs");
Object.keys(_index222).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index222[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index222[key];
    },
  });
});
var _index223 = __webpack_require__(/*! ./startOfTomorrow.cjs */ "./node_modules/date-fns/startOfTomorrow.cjs");
Object.keys(_index223).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index223[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index223[key];
    },
  });
});
var _index224 = __webpack_require__(/*! ./startOfWeek.cjs */ "./node_modules/date-fns/startOfWeek.cjs");
Object.keys(_index224).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index224[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index224[key];
    },
  });
});
var _index225 = __webpack_require__(/*! ./startOfWeekYear.cjs */ "./node_modules/date-fns/startOfWeekYear.cjs");
Object.keys(_index225).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index225[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index225[key];
    },
  });
});
var _index226 = __webpack_require__(/*! ./startOfYear.cjs */ "./node_modules/date-fns/startOfYear.cjs");
Object.keys(_index226).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index226[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index226[key];
    },
  });
});
var _index227 = __webpack_require__(/*! ./startOfYesterday.cjs */ "./node_modules/date-fns/startOfYesterday.cjs");
Object.keys(_index227).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index227[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index227[key];
    },
  });
});
var _index228 = __webpack_require__(/*! ./sub.cjs */ "./node_modules/date-fns/sub.cjs");
Object.keys(_index228).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index228[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index228[key];
    },
  });
});
var _index229 = __webpack_require__(/*! ./subBusinessDays.cjs */ "./node_modules/date-fns/subBusinessDays.cjs");
Object.keys(_index229).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index229[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index229[key];
    },
  });
});
var _index230 = __webpack_require__(/*! ./subDays.cjs */ "./node_modules/date-fns/subDays.cjs");
Object.keys(_index230).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index230[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index230[key];
    },
  });
});
var _index231 = __webpack_require__(/*! ./subHours.cjs */ "./node_modules/date-fns/subHours.cjs");
Object.keys(_index231).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index231[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index231[key];
    },
  });
});
var _index232 = __webpack_require__(/*! ./subISOWeekYears.cjs */ "./node_modules/date-fns/subISOWeekYears.cjs");
Object.keys(_index232).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index232[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index232[key];
    },
  });
});
var _index233 = __webpack_require__(/*! ./subMilliseconds.cjs */ "./node_modules/date-fns/subMilliseconds.cjs");
Object.keys(_index233).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index233[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index233[key];
    },
  });
});
var _index234 = __webpack_require__(/*! ./subMinutes.cjs */ "./node_modules/date-fns/subMinutes.cjs");
Object.keys(_index234).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index234[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index234[key];
    },
  });
});
var _index235 = __webpack_require__(/*! ./subMonths.cjs */ "./node_modules/date-fns/subMonths.cjs");
Object.keys(_index235).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index235[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index235[key];
    },
  });
});
var _index236 = __webpack_require__(/*! ./subQuarters.cjs */ "./node_modules/date-fns/subQuarters.cjs");
Object.keys(_index236).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index236[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index236[key];
    },
  });
});
var _index237 = __webpack_require__(/*! ./subSeconds.cjs */ "./node_modules/date-fns/subSeconds.cjs");
Object.keys(_index237).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index237[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index237[key];
    },
  });
});
var _index238 = __webpack_require__(/*! ./subWeeks.cjs */ "./node_modules/date-fns/subWeeks.cjs");
Object.keys(_index238).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index238[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index238[key];
    },
  });
});
var _index239 = __webpack_require__(/*! ./subYears.cjs */ "./node_modules/date-fns/subYears.cjs");
Object.keys(_index239).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index239[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index239[key];
    },
  });
});
var _index240 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");
Object.keys(_index240).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index240[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index240[key];
    },
  });
});
var _index241 = __webpack_require__(/*! ./transpose.cjs */ "./node_modules/date-fns/transpose.cjs");
Object.keys(_index241).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index241[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index241[key];
    },
  });
});
var _index242 = __webpack_require__(/*! ./weeksToDays.cjs */ "./node_modules/date-fns/weeksToDays.cjs");
Object.keys(_index242).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index242[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index242[key];
    },
  });
});
var _index243 = __webpack_require__(/*! ./yearsToDays.cjs */ "./node_modules/date-fns/yearsToDays.cjs");
Object.keys(_index243).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index243[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index243[key];
    },
  });
});
var _index244 = __webpack_require__(/*! ./yearsToMonths.cjs */ "./node_modules/date-fns/yearsToMonths.cjs");
Object.keys(_index244).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index244[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index244[key];
    },
  });
});
var _index245 = __webpack_require__(/*! ./yearsToQuarters.cjs */ "./node_modules/date-fns/yearsToQuarters.cjs");
Object.keys(_index245).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index245[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index245[key];
    },
  });
});


/***/ }),

/***/ "./node_modules/date-fns/interval.cjs":
/*!********************************************!*\
  !*** ./node_modules/date-fns/interval.cjs ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.interval = interval;
var _index = __webpack_require__(/*! ./_lib/normalizeDates.cjs */ "./node_modules/date-fns/_lib/normalizeDates.cjs");

/**
 * The {@link interval} function options.
 */

/**
 * The {@link interval} function result type. It resolves the proper data type.
 * It uses the first argument date object type, starting from the start argument,
 * then the end interval date. If a context function is passed, it uses the context
 * function return type.
 */

/**
 * @name interval
 * @category Interval Helpers
 * @summary Creates an interval object and validates its values.
 *
 * @description
 * Creates a normalized interval object and validates its values. If the interval is invalid, an exception is thrown.
 *
 * @typeParam StartDate - Start date type.
 * @typeParam EndDate - End date type.
 * @typeParam Options - Options type.
 *
 * @param start - The start of the interval.
 * @param end - The end of the interval.
 * @param options - The options object.
 *
 * @throws `Start date is invalid` when `start` is invalid.
 * @throws `End date is invalid` when `end` is invalid.
 * @throws `End date must be after start date` when end is before `start` and `options.assertPositive` is true.
 *
 * @returns The normalized and validated interval object.
 */
function interval(start, end, options) {
  const [_start, _end] = (0, _index.normalizeDates)(options?.in, start, end);

  if (isNaN(+_start)) throw new TypeError("Start date is invalid");
  if (isNaN(+_end)) throw new TypeError("End date is invalid");

  if (options?.assertPositive && +_start > +_end)
    throw new TypeError("End date must be after start date");

  return { start: _start, end: _end };
}


/***/ }),

/***/ "./node_modules/date-fns/intervalToDuration.cjs":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/intervalToDuration.cjs ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.intervalToDuration = intervalToDuration;
var _index = __webpack_require__(/*! ./_lib/normalizeInterval.cjs */ "./node_modules/date-fns/_lib/normalizeInterval.cjs");
var _index2 = __webpack_require__(/*! ./add.cjs */ "./node_modules/date-fns/add.cjs");
var _index3 = __webpack_require__(/*! ./differenceInDays.cjs */ "./node_modules/date-fns/differenceInDays.cjs");
var _index4 = __webpack_require__(/*! ./differenceInHours.cjs */ "./node_modules/date-fns/differenceInHours.cjs");
var _index5 = __webpack_require__(/*! ./differenceInMinutes.cjs */ "./node_modules/date-fns/differenceInMinutes.cjs");
var _index6 = __webpack_require__(/*! ./differenceInMonths.cjs */ "./node_modules/date-fns/differenceInMonths.cjs");
var _index7 = __webpack_require__(/*! ./differenceInSeconds.cjs */ "./node_modules/date-fns/differenceInSeconds.cjs");
var _index8 = __webpack_require__(/*! ./differenceInYears.cjs */ "./node_modules/date-fns/differenceInYears.cjs");

/**
 * The {@link intervalToDuration} function options.
 */

/**
 * @name intervalToDuration
 * @category Common Helpers
 * @summary Convert interval to duration
 *
 * @description
 * Convert an interval object to a duration object.
 *
 * @param interval - The interval to convert to duration
 * @param options - The context options
 *
 * @returns The duration object
 *
 * @example
 * // Get the duration between January 15, 1929 and April 4, 1968.
 * intervalToDuration({
 *   start: new Date(1929, 0, 15, 12, 0, 0),
 *   end: new Date(1968, 3, 4, 19, 5, 0)
 * });
 * //=> { years: 39, months: 2, days: 20, hours: 7, minutes: 5, seconds: 0 }
 */
function intervalToDuration(interval, options) {
  const { start, end } = (0, _index.normalizeInterval)(options?.in, interval);
  const duration = {};

  const years = (0, _index8.differenceInYears)(end, start);
  if (years) duration.years = years;

  const remainingMonths = (0, _index2.add)(start, { years: duration.years });
  const months = (0, _index6.differenceInMonths)(end, remainingMonths);
  if (months) duration.months = months;

  const remainingDays = (0, _index2.add)(remainingMonths, {
    months: duration.months,
  });
  const days = (0, _index3.differenceInDays)(end, remainingDays);
  if (days) duration.days = days;

  const remainingHours = (0, _index2.add)(remainingDays, {
    days: duration.days,
  });
  const hours = (0, _index4.differenceInHours)(end, remainingHours);
  if (hours) duration.hours = hours;

  const remainingMinutes = (0, _index2.add)(remainingHours, {
    hours: duration.hours,
  });
  const minutes = (0, _index5.differenceInMinutes)(end, remainingMinutes);
  if (minutes) duration.minutes = minutes;

  const remainingSeconds = (0, _index2.add)(remainingMinutes, {
    minutes: duration.minutes,
  });
  const seconds = (0, _index7.differenceInSeconds)(end, remainingSeconds);
  if (seconds) duration.seconds = seconds;

  return duration;
}


/***/ }),

/***/ "./node_modules/date-fns/intlFormat.cjs":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/intlFormat.cjs ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.intlFormat = intlFormat;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The locale string (see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument).
 * @deprecated
 *
 * [TODO] Remove in v4
 */

/**
 * The format options (see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options)
 */

/**
 * The locale options.
 */

/**
 * @name intlFormat
 * @category Common Helpers
 * @summary Format the date with Intl.DateTimeFormat (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat).
 *
 * @description
 * Return the formatted date string in the given format.
 * The method uses [`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) inside.
 * formatOptions are the same as [`Intl.DateTimeFormat` options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#using_options)
 *
 * > ⚠️ Please note that before Node version 13.0.0, only the locale data for en-US is available by default.
 *
 * @param date - The date to format
 *
 * @returns The formatted date string
 *
 * @throws `date` must not be Invalid Date
 *
 * @example
 * // Represent 4 October 2019 in middle-endian format:
 * const result = intlFormat(new Date(2019, 9, 4, 12, 30, 13, 456))
 * //=> 10/4/2019
 */

/**
 * @param date - The date to format
 * @param localeOptions - An object with locale
 *
 * @returns The formatted date string
 *
 * @throws `date` must not be Invalid Date
 *
 * @example
 * // Represent 4 October 2019 in Korean.
 * // Convert the date with locale's options.
 * const result = intlFormat(new Date(2019, 9, 4, 12, 30, 13, 456), {
 *   locale: 'ko-KR',
 * })
 * //=> 2019. 10. 4.
 */

/**
 * @param date - The date to format
 * @param formatOptions - The format options
 *
 * @returns The formatted date string
 *
 * @throws `date` must not be Invalid Date
 *
 * @example
 * // Represent 4 October 2019.
 * // Convert the date with format's options.
 * const result = intlFormat.default(new Date(2019, 9, 4, 12, 30, 13, 456), {
 *   year: 'numeric',
 *   month: 'numeric',
 *   day: 'numeric',
 *   hour: 'numeric',
 * })
 * //=> 10/4/2019, 12 PM
 */

/**
 * @param date - The date to format
 * @param formatOptions - The format options
 * @param localeOptions - An object with locale
 *
 * @returns The formatted date string
 *
 * @throws `date` must not be Invalid Date
 *
 * @example
 * // Represent 4 October 2019 in German.
 * // Convert the date with format's options and locale's options.
 * const result = intlFormat(new Date(2019, 9, 4, 12, 30, 13, 456), {
 *   weekday: 'long',
 *   year: 'numeric',
 *   month: 'long',
 *   day: 'numeric',
 * }, {
 *   locale: 'de-DE',
 * })
 * //=> Freitag, 4. Oktober 2019
 */

function intlFormat(date, formatOrLocale, localeOptions) {
  let formatOptions;

  if (isFormatOptions(formatOrLocale)) {
    formatOptions = formatOrLocale;
  } else {
    localeOptions = formatOrLocale;
  }

  return new Intl.DateTimeFormat(localeOptions?.locale, formatOptions).format(
    (0, _index.toDate)(date),
  );
}

function isFormatOptions(opts) {
  return opts !== undefined && !("locale" in opts);
}


/***/ }),

/***/ "./node_modules/date-fns/intlFormatDistance.cjs":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/intlFormatDistance.cjs ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.intlFormatDistance = intlFormatDistance;
var _index = __webpack_require__(/*! ./_lib/normalizeDates.cjs */ "./node_modules/date-fns/_lib/normalizeDates.cjs");
var _index2 = __webpack_require__(/*! ./constants.cjs */ "./node_modules/date-fns/constants.cjs");

var _index3 = __webpack_require__(/*! ./differenceInCalendarDays.cjs */ "./node_modules/date-fns/differenceInCalendarDays.cjs");
var _index4 = __webpack_require__(/*! ./differenceInCalendarMonths.cjs */ "./node_modules/date-fns/differenceInCalendarMonths.cjs");
var _index5 = __webpack_require__(/*! ./differenceInCalendarQuarters.cjs */ "./node_modules/date-fns/differenceInCalendarQuarters.cjs");
var _index6 = __webpack_require__(/*! ./differenceInCalendarWeeks.cjs */ "./node_modules/date-fns/differenceInCalendarWeeks.cjs");
var _index7 = __webpack_require__(/*! ./differenceInCalendarYears.cjs */ "./node_modules/date-fns/differenceInCalendarYears.cjs");
var _index8 = __webpack_require__(/*! ./differenceInHours.cjs */ "./node_modules/date-fns/differenceInHours.cjs");
var _index9 = __webpack_require__(/*! ./differenceInMinutes.cjs */ "./node_modules/date-fns/differenceInMinutes.cjs");
var _index10 = __webpack_require__(/*! ./differenceInSeconds.cjs */ "./node_modules/date-fns/differenceInSeconds.cjs");

/**
 * The {@link intlFormatDistance} function options.
 */

/**
 * The unit used to format the distance in {@link intlFormatDistance}.
 */

/**
 * @name intlFormatDistance
 * @category Common Helpers
 * @summary Formats distance between two dates in a human-readable format
 * @description
 * The function calculates the difference between two dates and formats it as a human-readable string.
 *
 * The function will pick the most appropriate unit depending on the distance between dates. For example, if the distance is a few hours, it might return `x hours`. If the distance is a few months, it might return `x months`.
 *
 * You can also specify a unit to force using it regardless of the distance to get a result like `123456 hours`.
 *
 * See the table below for the unit picking logic:
 *
 * | Distance between dates | Result (past)  | Result (future) |
 * | ---------------------- | -------------- | --------------- |
 * | 0 seconds              | now            | now             |
 * | 1-59 seconds           | X seconds ago  | in X seconds    |
 * | 1-59 minutes           | X minutes ago  | in X minutes    |
 * | 1-23 hours             | X hours ago    | in X hours      |
 * | 1 day                  | yesterday      | tomorrow        |
 * | 2-6 days               | X days ago     | in X days       |
 * | 7 days                 | last week      | next week       |
 * | 8 days-1 month         | X weeks ago    | in X weeks      |
 * | 1 month                | last month     | next month      |
 * | 2-3 months             | X months ago   | in X months     |
 * | 1 quarter              | last quarter   | next quarter    |
 * | 2-3 quarters           | X quarters ago | in X quarters   |
 * | 1 year                 | last year      | next year       |
 * | 2+ years               | X years ago    | in X years      |
 *
 * @param laterDate - The date
 * @param earlierDate - The date to compare with.
 * @param options - An object with options.
 * See MDN for details [Locale identification and negotiation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_identification_and_negotiation)
 * The narrow one could be similar to the short one for some locales.
 *
 * @returns The distance in words according to language-sensitive relative time formatting.
 *
 * @throws `date` must not be Invalid Date
 * @throws `baseDate` must not be Invalid Date
 * @throws `options.unit` must not be invalid Unit
 * @throws `options.locale` must not be invalid locale
 * @throws `options.localeMatcher` must not be invalid localeMatcher
 * @throws `options.numeric` must not be invalid numeric
 * @throws `options.style` must not be invalid style
 *
 * @example
 * // What is the distance between the dates when the fist date is after the second?
 * intlFormatDistance(
 *   new Date(1986, 3, 4, 11, 30, 0),
 *   new Date(1986, 3, 4, 10, 30, 0)
 * )
 * //=> 'in 1 hour'
 *
 * // What is the distance between the dates when the fist date is before the second?
 * intlFormatDistance(
 *   new Date(1986, 3, 4, 10, 30, 0),
 *   new Date(1986, 3, 4, 11, 30, 0)
 * )
 * //=> '1 hour ago'
 *
 * @example
 * // Use the unit option to force the function to output the result in quarters. Without setting it, the example would return "next year"
 * intlFormatDistance(
 *   new Date(1987, 6, 4, 10, 30, 0),
 *   new Date(1986, 3, 4, 10, 30, 0),
 *   { unit: 'quarter' }
 * )
 * //=> 'in 5 quarters'
 *
 * @example
 * // Use the locale option to get the result in Spanish. Without setting it, the example would return "in 1 hour".
 * intlFormatDistance(
 *   new Date(1986, 3, 4, 11, 30, 0),
 *   new Date(1986, 3, 4, 10, 30, 0),
 *   { locale: 'es' }
 * )
 * //=> 'dentro de 1 hora'
 *
 * @example
 * // Use the numeric option to force the function to use numeric values. Without setting it, the example would return "tomorrow".
 * intlFormatDistance(
 *   new Date(1986, 3, 5, 11, 30, 0),
 *   new Date(1986, 3, 4, 11, 30, 0),
 *   { numeric: 'always' }
 * )
 * //=> 'in 1 day'
 *
 * @example
 * // Use the style option to force the function to use short values. Without setting it, the example would return "in 2 years".
 * intlFormatDistance(
 *   new Date(1988, 3, 4, 11, 30, 0),
 *   new Date(1986, 3, 4, 11, 30, 0),
 *   { style: 'short' }
 * )
 * //=> 'in 2 yr'
 */
function intlFormatDistance(laterDate, earlierDate, options) {
  let value = 0;
  let unit;

  const [laterDate_, earlierDate_] = (0, _index.normalizeDates)(
    options?.in,
    laterDate,
    earlierDate,
  );

  if (!options?.unit) {
    // Get the unit based on diffInSeconds calculations if no unit is specified
    const diffInSeconds = (0, _index10.differenceInSeconds)(
      laterDate_,
      earlierDate_,
    ); // The smallest unit

    if (Math.abs(diffInSeconds) < _index2.secondsInMinute) {
      value = (0, _index10.differenceInSeconds)(laterDate_, earlierDate_);
      unit = "second";
    } else if (Math.abs(diffInSeconds) < _index2.secondsInHour) {
      value = (0, _index9.differenceInMinutes)(laterDate_, earlierDate_);
      unit = "minute";
    } else if (
      Math.abs(diffInSeconds) < _index2.secondsInDay &&
      Math.abs(
        (0, _index3.differenceInCalendarDays)(laterDate_, earlierDate_),
      ) < 1
    ) {
      value = (0, _index8.differenceInHours)(laterDate_, earlierDate_);
      unit = "hour";
    } else if (
      Math.abs(diffInSeconds) < _index2.secondsInWeek &&
      (value = (0, _index3.differenceInCalendarDays)(
        laterDate_,
        earlierDate_,
      )) &&
      Math.abs(value) < 7
    ) {
      unit = "day";
    } else if (Math.abs(diffInSeconds) < _index2.secondsInMonth) {
      value = (0, _index6.differenceInCalendarWeeks)(laterDate_, earlierDate_);
      unit = "week";
    } else if (Math.abs(diffInSeconds) < _index2.secondsInQuarter) {
      value = (0, _index4.differenceInCalendarMonths)(laterDate_, earlierDate_);
      unit = "month";
    } else if (Math.abs(diffInSeconds) < _index2.secondsInYear) {
      if (
        (0, _index5.differenceInCalendarQuarters)(laterDate_, earlierDate_) < 4
      ) {
        // To filter out cases that are less than a year but match 4 quarters
        value = (0, _index5.differenceInCalendarQuarters)(
          laterDate_,
          earlierDate_,
        );
        unit = "quarter";
      } else {
        value = (0, _index7.differenceInCalendarYears)(
          laterDate_,
          earlierDate_,
        );
        unit = "year";
      }
    } else {
      value = (0, _index7.differenceInCalendarYears)(laterDate_, earlierDate_);
      unit = "year";
    }
  } else {
    // Get the value if unit is specified
    unit = options?.unit;
    if (unit === "second") {
      value = (0, _index10.differenceInSeconds)(laterDate_, earlierDate_);
    } else if (unit === "minute") {
      value = (0, _index9.differenceInMinutes)(laterDate_, earlierDate_);
    } else if (unit === "hour") {
      value = (0, _index8.differenceInHours)(laterDate_, earlierDate_);
    } else if (unit === "day") {
      value = (0, _index3.differenceInCalendarDays)(laterDate_, earlierDate_);
    } else if (unit === "week") {
      value = (0, _index6.differenceInCalendarWeeks)(laterDate_, earlierDate_);
    } else if (unit === "month") {
      value = (0, _index4.differenceInCalendarMonths)(laterDate_, earlierDate_);
    } else if (unit === "quarter") {
      value = (0, _index5.differenceInCalendarQuarters)(
        laterDate_,
        earlierDate_,
      );
    } else if (unit === "year") {
      value = (0, _index7.differenceInCalendarYears)(laterDate_, earlierDate_);
    }
  }

  const rtf = new Intl.RelativeTimeFormat(options?.locale, {
    numeric: "auto",
    ...options,
  });

  return rtf.format(value, unit);
}


/***/ }),

/***/ "./node_modules/date-fns/isAfter.cjs":
/*!*******************************************!*\
  !*** ./node_modules/date-fns/isAfter.cjs ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isAfter = isAfter;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * @name isAfter
 * @category Common Helpers
 * @summary Is the first date after the second one?
 *
 * @description
 * Is the first date after the second one?
 *
 * @param date - The date that should be after the other one to return true
 * @param dateToCompare - The date to compare with
 *
 * @returns The first date is after the second date
 *
 * @example
 * // Is 10 July 1989 after 11 February 1987?
 * const result = isAfter(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> true
 */
function isAfter(date, dateToCompare) {
  return +(0, _index.toDate)(date) > +(0, _index.toDate)(dateToCompare);
}


/***/ }),

/***/ "./node_modules/date-fns/isBefore.cjs":
/*!********************************************!*\
  !*** ./node_modules/date-fns/isBefore.cjs ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isBefore = isBefore;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * @name isBefore
 * @category Common Helpers
 * @summary Is the first date before the second one?
 *
 * @description
 * Is the first date before the second one?
 *
 * @param date - The date that should be before the other one to return true
 * @param dateToCompare - The date to compare with
 *
 * @returns The first date is before the second date
 *
 * @example
 * // Is 10 July 1989 before 11 February 1987?
 * const result = isBefore(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> false
 */
function isBefore(date, dateToCompare) {
  return +(0, _index.toDate)(date) < +(0, _index.toDate)(dateToCompare);
}


/***/ }),

/***/ "./node_modules/date-fns/isDate.cjs":
/*!******************************************!*\
  !*** ./node_modules/date-fns/isDate.cjs ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.isDate = isDate; /**
 * @name isDate
 * @category Common Helpers
 * @summary Is the given value a date?
 *
 * @description
 * Returns true if the given value is an instance of Date. The function works for dates transferred across iframes.
 *
 * @param value - The value to check
 *
 * @returns True if the given value is a date
 *
 * @example
 * // For a valid date:
 * const result = isDate(new Date())
 * //=> true
 *
 * @example
 * // For an invalid date:
 * const result = isDate(new Date(NaN))
 * //=> true
 *
 * @example
 * // For some value:
 * const result = isDate('2014-02-31')
 * //=> false
 *
 * @example
 * // For an object:
 * const result = isDate({})
 * //=> false
 */
function isDate(value) {
  return (
    value instanceof Date ||
    (typeof value === "object" &&
      Object.prototype.toString.call(value) === "[object Date]")
  );
}


/***/ }),

/***/ "./node_modules/date-fns/isEqual.cjs":
/*!*******************************************!*\
  !*** ./node_modules/date-fns/isEqual.cjs ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isEqual = isEqual;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * @name isEqual
 * @category Common Helpers
 * @summary Are the given dates equal?
 *
 * @description
 * Are the given dates equal?
 *
 * @param dateLeft - The first date to compare
 * @param dateRight - The second date to compare
 *
 * @returns The dates are equal
 *
 * @example
 * // Are 2 July 2014 06:30:45.000 and 2 July 2014 06:30:45.500 equal?
 * const result = isEqual(
 *   new Date(2014, 6, 2, 6, 30, 45, 0),
 *   new Date(2014, 6, 2, 6, 30, 45, 500)
 * )
 * //=> false
 */
function isEqual(leftDate, rightDate) {
  return +(0, _index.toDate)(leftDate) === +(0, _index.toDate)(rightDate);
}


/***/ }),

/***/ "./node_modules/date-fns/isExists.cjs":
/*!********************************************!*\
  !*** ./node_modules/date-fns/isExists.cjs ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.isExists = isExists; /**
 * @name isExists
 * @category Common Helpers
 * @summary Is the given date exists?
 *
 * @description
 * Checks if the given arguments convert to an existing date.
 *
 * @param year - The year of the date to check
 * @param month - The month of the date to check
 * @param day - The day of the date to check
 *
 * @returns `true` if the date exists
 *
 * @example
 * // For the valid date:
 * const result = isExists(2018, 0, 31)
 * //=> true
 *
 * @example
 * // For the invalid date:
 * const result = isExists(2018, 1, 31)
 * //=> false
 */
function isExists(year, month, day) {
  const date = new Date(year, month, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month &&
    date.getDate() === day
  );
}


/***/ }),

/***/ "./node_modules/date-fns/isFirstDayOfMonth.cjs":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/isFirstDayOfMonth.cjs ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isFirstDayOfMonth = isFirstDayOfMonth;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link isFirstDayOfMonth} function options.
 */

/**
 * @name isFirstDayOfMonth
 * @category Month Helpers
 * @summary Is the given date the first day of a month?
 *
 * @description
 * Is the given date the first day of a month?
 *
 * @param date - The date to check
 * @param options - An object with options
 *
 * @returns The date is the first day of a month
 *
 * @example
 * // Is 1 September 2014 the first day of a month?
 * const result = isFirstDayOfMonth(new Date(2014, 8, 1))
 * //=> true
 */
function isFirstDayOfMonth(date, options) {
  return (0, _index.toDate)(date, options?.in).getDate() === 1;
}


/***/ }),

/***/ "./node_modules/date-fns/isFriday.cjs":
/*!********************************************!*\
  !*** ./node_modules/date-fns/isFriday.cjs ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isFriday = isFriday;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link isFriday} function options.
 */

/**
 * @name isFriday
 * @category Weekday Helpers
 * @summary Is the given date Friday?
 *
 * @description
 * Is the given date Friday?
 *
 * @param date - The date to check
 * @param options - An object with options
 *
 * @returns The date is Friday
 *
 * @example
 * // Is 26 September 2014 Friday?
 * const result = isFriday(new Date(2014, 8, 26))
 * //=> true
 */
function isFriday(date, options) {
  return (0, _index.toDate)(date, options?.in).getDay() === 5;
}


/***/ }),

/***/ "./node_modules/date-fns/isFuture.cjs":
/*!********************************************!*\
  !*** ./node_modules/date-fns/isFuture.cjs ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isFuture = isFuture;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * @name isFuture
 * @category Common Helpers
 * @summary Is the given date in the future?
 * @pure false
 *
 * @description
 * Is the given date in the future?
 *
 * @param date - The date to check
 *
 * @returns The date is in the future
 *
 * @example
 * // If today is 6 October 2014, is 31 December 2014 in the future?
 * const result = isFuture(new Date(2014, 11, 31))
 * //=> true
 */
function isFuture(date) {
  return +(0, _index.toDate)(date) > Date.now();
}


/***/ }),

/***/ "./node_modules/date-fns/isLastDayOfMonth.cjs":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/isLastDayOfMonth.cjs ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isLastDayOfMonth = isLastDayOfMonth;
var _index = __webpack_require__(/*! ./endOfDay.cjs */ "./node_modules/date-fns/endOfDay.cjs");
var _index2 = __webpack_require__(/*! ./endOfMonth.cjs */ "./node_modules/date-fns/endOfMonth.cjs");
var _index3 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * @name isLastDayOfMonth
 * @category Month Helpers
 * @summary Is the given date the last day of a month?
 *
 * @description
 * Is the given date the last day of a month?
 *
 * @param date - The date to check
 * @param options - An object with options
 *
 * @returns The date is the last day of a month
 *
 * @example
 * // Is 28 February 2014 the last day of a month?
 * const result = isLastDayOfMonth(new Date(2014, 1, 28))
 * //=> true
 */
function isLastDayOfMonth(date, options) {
  const _date = (0, _index3.toDate)(date, options?.in);
  return (
    +(0, _index.endOfDay)(_date, options) ===
    +(0, _index2.endOfMonth)(_date, options)
  );
}


/***/ }),

/***/ "./node_modules/date-fns/isLeapYear.cjs":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/isLeapYear.cjs ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isLeapYear = isLeapYear;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * @name isLeapYear
 * @category Year Helpers
 * @summary Is the given date in the leap year?
 *
 * @description
 * Is the given date in the leap year?
 *
 * @param date - The date to check
 * @param options - The options object
 *
 * @returns The date is in the leap year
 *
 * @example
 * // Is 1 September 2012 in the leap year?
 * const result = isLeapYear(new Date(2012, 8, 1))
 * //=> true
 */
function isLeapYear(date, options) {
  const _date = (0, _index.toDate)(date, options?.in);
  const year = _date.getFullYear();
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}


/***/ }),

/***/ "./node_modules/date-fns/isMatch.cjs":
/*!*******************************************!*\
  !*** ./node_modules/date-fns/isMatch.cjs ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isMatch = isMatch;
var _index = __webpack_require__(/*! ./isValid.cjs */ "./node_modules/date-fns/isValid.cjs");
var _index2 = __webpack_require__(/*! ./parse.cjs */ "./node_modules/date-fns/parse.cjs");

/**
 * The {@link isMatch} function options.
 */

/**
 * @name isMatch
 * @category Common Helpers
 * @summary validates the date string against given formats
 *
 * @description
 * Return the true if given date is string correct against the given format else
 * will return false.
 *
 * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
 * > See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * The characters in the format string wrapped between two single quotes characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
 *
 * Format of the format string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * with a few additions (see note 5 below the table).
 *
 * Not all tokens are compatible. Combinations that don't make sense or could lead to bugs are prohibited
 * and will throw `RangeError`. For example usage of 24-hour format token with AM/PM token will throw an exception:
 *
 * ```javascript
 * isMatch('23 AM', 'HH a')
 * //=> RangeError: The format string mustn't contain `HH` and `a` at the same time
 * ```
 *
 * See the compatibility table: https://docs.google.com/spreadsheets/d/e/2PACX-1vQOPU3xUhplll6dyoMmVUXHKl_8CRDs6_ueLmex3SoqwhuolkuN3O05l4rqx5h1dKX8eb46Ul-CCSrq/pubhtml?gid=0&single=true
 *
 * Accepted format string patterns:
 * | Unit                            |Prior| Pattern | Result examples                   | Notes |
 * |---------------------------------|-----|---------|-----------------------------------|-------|
 * | Era                             | 140 | G..GGG  | AD, BC                            |       |
 * |                                 |     | GGGG    | Anno Domini, Before Christ        | 2     |
 * |                                 |     | GGGGG   | A, B                              |       |
 * | Calendar year                   | 130 | y       | 44, 1, 1900, 2017, 9999           | 4     |
 * |                                 |     | yo      | 44th, 1st, 1900th, 9999999th      | 4,5   |
 * |                                 |     | yy      | 44, 01, 00, 17                    | 4     |
 * |                                 |     | yyy     | 044, 001, 123, 999                | 4     |
 * |                                 |     | yyyy    | 0044, 0001, 1900, 2017            | 4     |
 * |                                 |     | yyyyy   | ...                               | 2,4   |
 * | Local week-numbering year       | 130 | Y       | 44, 1, 1900, 2017, 9000           | 4     |
 * |                                 |     | Yo      | 44th, 1st, 1900th, 9999999th      | 4,5   |
 * |                                 |     | YY      | 44, 01, 00, 17                    | 4,6   |
 * |                                 |     | YYY     | 044, 001, 123, 999                | 4     |
 * |                                 |     | YYYY    | 0044, 0001, 1900, 2017            | 4,6   |
 * |                                 |     | YYYYY   | ...                               | 2,4   |
 * | ISO week-numbering year         | 130 | R       | -43, 1, 1900, 2017, 9999, -9999   | 4,5   |
 * |                                 |     | RR      | -43, 01, 00, 17                   | 4,5   |
 * |                                 |     | RRR     | -043, 001, 123, 999, -999         | 4,5   |
 * |                                 |     | RRRR    | -0043, 0001, 2017, 9999, -9999    | 4,5   |
 * |                                 |     | RRRRR   | ...                               | 2,4,5 |
 * | Extended year                   | 130 | u       | -43, 1, 1900, 2017, 9999, -999    | 4     |
 * |                                 |     | uu      | -43, 01, 99, -99                  | 4     |
 * |                                 |     | uuu     | -043, 001, 123, 999, -999         | 4     |
 * |                                 |     | uuuu    | -0043, 0001, 2017, 9999, -9999    | 4     |
 * |                                 |     | uuuuu   | ...                               | 2,4   |
 * | Quarter (formatting)            | 120 | Q       | 1, 2, 3, 4                        |       |
 * |                                 |     | Qo      | 1st, 2nd, 3rd, 4th                | 5     |
 * |                                 |     | QQ      | 01, 02, 03, 04                    |       |
 * |                                 |     | QQQ     | Q1, Q2, Q3, Q4                    |       |
 * |                                 |     | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 |     | QQQQQ   | 1, 2, 3, 4                        | 4     |
 * | Quarter (stand-alone)           | 120 | q       | 1, 2, 3, 4                        |       |
 * |                                 |     | qo      | 1st, 2nd, 3rd, 4th                | 5     |
 * |                                 |     | qq      | 01, 02, 03, 04                    |       |
 * |                                 |     | qqq     | Q1, Q2, Q3, Q4                    |       |
 * |                                 |     | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 |     | qqqqq   | 1, 2, 3, 4                        | 3     |
 * | Month (formatting)              | 110 | M       | 1, 2, ..., 12                     |       |
 * |                                 |     | Mo      | 1st, 2nd, ..., 12th               | 5     |
 * |                                 |     | MM      | 01, 02, ..., 12                   |       |
 * |                                 |     | MMM     | Jan, Feb, ..., Dec                |       |
 * |                                 |     | MMMM    | January, February, ..., December  | 2     |
 * |                                 |     | MMMMM   | J, F, ..., D                      |       |
 * | Month (stand-alone)             | 110 | L       | 1, 2, ..., 12                     |       |
 * |                                 |     | Lo      | 1st, 2nd, ..., 12th               | 5     |
 * |                                 |     | LL      | 01, 02, ..., 12                   |       |
 * |                                 |     | LLL     | Jan, Feb, ..., Dec                |       |
 * |                                 |     | LLLL    | January, February, ..., December  | 2     |
 * |                                 |     | LLLLL   | J, F, ..., D                      |       |
 * | Local week of year              | 100 | w       | 1, 2, ..., 53                     |       |
 * |                                 |     | wo      | 1st, 2nd, ..., 53th               | 5     |
 * |                                 |     | ww      | 01, 02, ..., 53                   |       |
 * | ISO week of year                | 100 | I       | 1, 2, ..., 53                     | 5     |
 * |                                 |     | Io      | 1st, 2nd, ..., 53th               | 5     |
 * |                                 |     | II      | 01, 02, ..., 53                   | 5     |
 * | Day of month                    |  90 | d       | 1, 2, ..., 31                     |       |
 * |                                 |     | do      | 1st, 2nd, ..., 31st               | 5     |
 * |                                 |     | dd      | 01, 02, ..., 31                   |       |
 * | Day of year                     |  90 | D       | 1, 2, ..., 365, 366               | 7     |
 * |                                 |     | Do      | 1st, 2nd, ..., 365th, 366th       | 5     |
 * |                                 |     | DD      | 01, 02, ..., 365, 366             | 7     |
 * |                                 |     | DDD     | 001, 002, ..., 365, 366           |       |
 * |                                 |     | DDDD    | ...                               | 2     |
 * | Day of week (formatting)        |  90 | E..EEE  | Mon, Tue, Wed, ..., Su            |       |
 * |                                 |     | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 |     | EEEEE   | M, T, W, T, F, S, S               |       |
 * |                                 |     | EEEEEE  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | ISO day of week (formatting)    |  90 | i       | 1, 2, 3, ..., 7                   | 5     |
 * |                                 |     | io      | 1st, 2nd, ..., 7th                | 5     |
 * |                                 |     | ii      | 01, 02, ..., 07                   | 5     |
 * |                                 |     | iii     | Mon, Tue, Wed, ..., Su            | 5     |
 * |                                 |     | iiii    | Monday, Tuesday, ..., Sunday      | 2,5   |
 * |                                 |     | iiiii   | M, T, W, T, F, S, S               | 5     |
 * |                                 |     | iiiiii  | Mo, Tu, We, Th, Fr, Sa, Su        | 5     |
 * | Local day of week (formatting)  |  90 | e       | 2, 3, 4, ..., 1                   |       |
 * |                                 |     | eo      | 2nd, 3rd, ..., 1st                | 5     |
 * |                                 |     | ee      | 02, 03, ..., 01                   |       |
 * |                                 |     | eee     | Mon, Tue, Wed, ..., Su            |       |
 * |                                 |     | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 |     | eeeee   | M, T, W, T, F, S, S               |       |
 * |                                 |     | eeeeee  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | Local day of week (stand-alone) |  90 | c       | 2, 3, 4, ..., 1                   |       |
 * |                                 |     | co      | 2nd, 3rd, ..., 1st                | 5     |
 * |                                 |     | cc      | 02, 03, ..., 01                   |       |
 * |                                 |     | ccc     | Mon, Tue, Wed, ..., Su            |       |
 * |                                 |     | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 |     | ccccc   | M, T, W, T, F, S, S               |       |
 * |                                 |     | cccccc  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | AM, PM                          |  80 | a..aaa  | AM, PM                            |       |
 * |                                 |     | aaaa    | a.m., p.m.                        | 2     |
 * |                                 |     | aaaaa   | a, p                              |       |
 * | AM, PM, noon, midnight          |  80 | b..bbb  | AM, PM, noon, midnight            |       |
 * |                                 |     | bbbb    | a.m., p.m., noon, midnight        | 2     |
 * |                                 |     | bbbbb   | a, p, n, mi                       |       |
 * | Flexible day period             |  80 | B..BBB  | at night, in the morning, ...     |       |
 * |                                 |     | BBBB    | at night, in the morning, ...     | 2     |
 * |                                 |     | BBBBB   | at night, in the morning, ...     |       |
 * | Hour [1-12]                     |  70 | h       | 1, 2, ..., 11, 12                 |       |
 * |                                 |     | ho      | 1st, 2nd, ..., 11th, 12th         | 5     |
 * |                                 |     | hh      | 01, 02, ..., 11, 12               |       |
 * | Hour [0-23]                     |  70 | H       | 0, 1, 2, ..., 23                  |       |
 * |                                 |     | Ho      | 0th, 1st, 2nd, ..., 23rd          | 5     |
 * |                                 |     | HH      | 00, 01, 02, ..., 23               |       |
 * | Hour [0-11]                     |  70 | K       | 1, 2, ..., 11, 0                  |       |
 * |                                 |     | Ko      | 1st, 2nd, ..., 11th, 0th          | 5     |
 * |                                 |     | KK      | 01, 02, ..., 11, 00               |       |
 * | Hour [1-24]                     |  70 | k       | 24, 1, 2, ..., 23                 |       |
 * |                                 |     | ko      | 24th, 1st, 2nd, ..., 23rd         | 5     |
 * |                                 |     | kk      | 24, 01, 02, ..., 23               |       |
 * | Minute                          |  60 | m       | 0, 1, ..., 59                     |       |
 * |                                 |     | mo      | 0th, 1st, ..., 59th               | 5     |
 * |                                 |     | mm      | 00, 01, ..., 59                   |       |
 * | Second                          |  50 | s       | 0, 1, ..., 59                     |       |
 * |                                 |     | so      | 0th, 1st, ..., 59th               | 5     |
 * |                                 |     | ss      | 00, 01, ..., 59                   |       |
 * | Seconds timestamp               |  40 | t       | 512969520                         |       |
 * |                                 |     | tt      | ...                               | 2     |
 * | Fraction of second              |  30 | S       | 0, 1, ..., 9                      |       |
 * |                                 |     | SS      | 00, 01, ..., 99                   |       |
 * |                                 |     | SSS     | 000, 001, ..., 999                |       |
 * |                                 |     | SSSS    | ...                               | 2     |
 * | Milliseconds timestamp          |  20 | T       | 512969520900                      |       |
 * |                                 |     | TT      | ...                               | 2     |
 * | Timezone (ISO-8601 w/ Z)        |  10 | X       | -08, +0530, Z                     |       |
 * |                                 |     | XX      | -0800, +0530, Z                   |       |
 * |                                 |     | XXX     | -08:00, +05:30, Z                 |       |
 * |                                 |     | XXXX    | -0800, +0530, Z, +123456          | 2     |
 * |                                 |     | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
 * | Timezone (ISO-8601 w/o Z)       |  10 | x       | -08, +0530, +00                   |       |
 * |                                 |     | xx      | -0800, +0530, +0000               |       |
 * |                                 |     | xxx     | -08:00, +05:30, +00:00            | 2     |
 * |                                 |     | xxxx    | -0800, +0530, +0000, +123456      |       |
 * |                                 |     | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
 * | Long localized date             |  NA | P       | 05/29/1453                        | 5,8   |
 * |                                 |     | PP      | May 29, 1453                      |       |
 * |                                 |     | PPP     | May 29th, 1453                    |       |
 * |                                 |     | PPPP    | Sunday, May 29th, 1453            | 2,5,8 |
 * | Long localized time             |  NA | p       | 12:00 AM                          | 5,8   |
 * |                                 |     | pp      | 12:00:00 AM                       |       |
 * | Combination of date and time    |  NA | Pp      | 05/29/1453, 12:00 AM              |       |
 * |                                 |     | PPpp    | May 29, 1453, 12:00:00 AM         |       |
 * |                                 |     | PPPpp   | May 29th, 1453 at ...             |       |
 * |                                 |     | PPPPpp  | Sunday, May 29th, 1453 at ...     | 2,5,8 |
 * Notes:
 * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
 *    are the same as "stand-alone" units, but are different in some languages.
 *    "Formatting" units are declined according to the rules of the language
 *    in the context of a date. "Stand-alone" units are always nominative singular.
 *    In `format` function, they will produce different result:
 *
 *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
 *
 *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
 *
 *    `isMatch` will try to match both formatting and stand-alone units interchangeably.
 *
 * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
 *    the single quote characters (see below).
 *    If the sequence is longer than listed in table:
 *    - for numerical units (`yyyyyyyy`) `isMatch` will try to match a number
 *      as wide as the sequence
 *    - for text units (`MMMMMMMM`) `isMatch` will try to match the widest variation of the unit.
 *      These variations are marked with "2" in the last column of the table.
 *
 * 3. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
 *    These tokens represent the shortest form of the quarter.
 *
 * 4. The main difference between `y` and `u` patterns are B.C. years:
 *
 *    | Year | `y` | `u` |
 *    |------|-----|-----|
 *    | AC 1 |   1 |   1 |
 *    | BC 1 |   1 |   0 |
 *    | BC 2 |   2 |  -1 |
 *
 *    Also `yy` will try to guess the century of two digit year by proximity with `referenceDate`:
 *
 *    `isMatch('50', 'yy') //=> true`
 *
 *    `isMatch('75', 'yy') //=> true`
 *
 *    while `uu` will use the year as is:
 *
 *    `isMatch('50', 'uu') //=> true`
 *
 *    `isMatch('75', 'uu') //=> true`
 *
 *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
 *    except local week-numbering years are dependent on `options.weekStartsOn`
 *    and `options.firstWeekContainsDate` (compare [setISOWeekYear](https://date-fns.org/docs/setISOWeekYear)
 *    and [setWeekYear](https://date-fns.org/docs/setWeekYear)).
 *
 * 5. These patterns are not in the Unicode Technical Standard #35:
 *    - `i`: ISO day of week
 *    - `I`: ISO week of year
 *    - `R`: ISO week-numbering year
 *    - `o`: ordinal number modifier
 *    - `P`: long localized date
 *    - `p`: long localized time
 *
 * 6. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
 *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * 7. `D` and `DD` tokens represent days of the year but they are often confused with days of the month.
 *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * 8. `P+` tokens do not have a defined priority since they are merely aliases to other tokens based
 *    on the given locale.
 *
 *    using `en-US` locale: `P` => `MM/dd/yyyy`
 *    using `en-US` locale: `p` => `hh:mm a`
 *    using `pt-BR` locale: `P` => `dd/MM/yyyy`
 *    using `pt-BR` locale: `p` => `HH:mm`
 *
 * Values will be checked in the descending order of its unit's priority.
 * Units of an equal priority overwrite each other in the order of appearance.
 *
 * If no values of higher priority are matched (e.g. when matching string 'January 1st' without a year),
 * the values will be taken from today's using `new Date()` date which works as a context of parsing.
 *
 * The result may vary by locale.
 *
 * If `formatString` matches with `dateString` but does not provides tokens, `referenceDate` will be returned.
 *
 * @param dateStr - The date string to verify
 * @param format - The string of tokens
 * @param options - An object with options.
 *   see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *   see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * @returns Is format string a match for date string?
 *
 * @throws `options.locale` must contain `match` property
 * @throws use `yyyy` instead of `YYYY` for formatting years; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `yy` instead of `YY` for formatting years; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `d` instead of `D` for formatting days of the month; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `dd` instead of `DD` for formatting days of the month; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws format string contains an unescaped latin alphabet character
 *
 * @example
 * // Match 11 February 2014 from middle-endian format:
 * const result = isMatch('02/11/2014', 'MM/dd/yyyy')
 * //=> true
 *
 * @example
 * // Match 28th of February in Esperanto locale in the context of 2010 year:
 * import eo from 'date-fns/locale/eo'
 * const result = isMatch('28-a de februaro', "do 'de' MMMM", {
 *   locale: eo
 * })
 * //=> true
 */
function isMatch(dateStr, formatStr, options) {
  return (0, _index.isValid)(
    (0, _index2.parse)(dateStr, formatStr, new Date(), options),
  );
}


/***/ }),

/***/ "./node_modules/date-fns/isMonday.cjs":
/*!********************************************!*\
  !*** ./node_modules/date-fns/isMonday.cjs ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isMonday = isMonday;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link isMonday} function options.
 */

/**
 * @name isMonday
 * @category Weekday Helpers
 * @summary Is the given date Monday?
 *
 * @description
 * Is the given date Monday?
 *
 * @param date - The date to check
 * @param options - An object with options
 *
 * @returns The date is Monday
 *
 * @example
 * // Is 22 September 2014 Monday?
 * const result = isMonday(new Date(2014, 8, 22))
 * //=> true
 */
function isMonday(date, options) {
  return (0, _index.toDate)(date, options?.in).getDay() === 1;
}


/***/ }),

/***/ "./node_modules/date-fns/isPast.cjs":
/*!******************************************!*\
  !*** ./node_modules/date-fns/isPast.cjs ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isPast = isPast;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * @name isPast
 * @category Common Helpers
 * @summary Is the given date in the past?
 * @pure false
 *
 * @description
 * Is the given date in the past?
 *
 * @param date - The date to check
 *
 * @returns The date is in the past
 *
 * @example
 * // If today is 6 October 2014, is 2 July 2014 in the past?
 * const result = isPast(new Date(2014, 6, 2))
 * //=> true
 */
function isPast(date) {
  return +(0, _index.toDate)(date) < Date.now();
}


/***/ }),

/***/ "./node_modules/date-fns/isSameDay.cjs":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/isSameDay.cjs ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isSameDay = isSameDay;
var _index = __webpack_require__(/*! ./_lib/normalizeDates.cjs */ "./node_modules/date-fns/_lib/normalizeDates.cjs");
var _index2 = __webpack_require__(/*! ./startOfDay.cjs */ "./node_modules/date-fns/startOfDay.cjs");

/**
 * The {@link isSameDay} function options.
 */

/**
 * @name isSameDay
 * @category Day Helpers
 * @summary Are the given dates in the same day (and year and month)?
 *
 * @description
 * Are the given dates in the same day (and year and month)?
 *
 * @param laterDate - The first date to check
 * @param earlierDate - The second date to check
 * @param options - An object with options
 *
 * @returns The dates are in the same day (and year and month)
 *
 * @example
 * // Are 4 September 06:00:00 and 4 September 18:00:00 in the same day?
 * const result = isSameDay(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 18, 0))
 * //=> true
 *
 * @example
 * // Are 4 September and 4 October in the same day?
 * const result = isSameDay(new Date(2014, 8, 4), new Date(2014, 9, 4))
 * //=> false
 *
 * @example
 * // Are 4 September, 2014 and 4 September, 2015 in the same day?
 * const result = isSameDay(new Date(2014, 8, 4), new Date(2015, 8, 4))
 * //=> false
 */
function isSameDay(laterDate, earlierDate, options) {
  const [dateLeft_, dateRight_] = (0, _index.normalizeDates)(
    options?.in,
    laterDate,
    earlierDate,
  );
  return (
    +(0, _index2.startOfDay)(dateLeft_) === +(0, _index2.startOfDay)(dateRight_)
  );
}


/***/ }),

/***/ "./node_modules/date-fns/isSameHour.cjs":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/isSameHour.cjs ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isSameHour = isSameHour;
var _index = __webpack_require__(/*! ./_lib/normalizeDates.cjs */ "./node_modules/date-fns/_lib/normalizeDates.cjs");
var _index2 = __webpack_require__(/*! ./startOfHour.cjs */ "./node_modules/date-fns/startOfHour.cjs");

/**
 * The {@link isSameHour} function options.
 */

/**
 * @name isSameHour
 * @category Hour Helpers
 * @summary Are the given dates in the same hour (and same day)?
 *
 * @description
 * Are the given dates in the same hour (and same day)?
 *
 * @param dateLeft - The first date to check
 * @param dateRight - The second date to check
 * @param options - An object with options
 *
 * @returns The dates are in the same hour (and same day)
 *
 * @example
 * // Are 4 September 2014 06:00:00 and 4 September 06:30:00 in the same hour?
 * const result = isSameHour(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 6, 30))
 * //=> true
 *
 * @example
 * // Are 4 September 2014 06:00:00 and 5 September 06:00:00 in the same hour?
 * const result = isSameHour(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 5, 6, 0))
 * //=> false
 */
function isSameHour(dateLeft, dateRight, options) {
  const [dateLeft_, dateRight_] = (0, _index.normalizeDates)(
    options?.in,
    dateLeft,
    dateRight,
  );
  return (
    +(0, _index2.startOfHour)(dateLeft_) ===
    +(0, _index2.startOfHour)(dateRight_)
  );
}


/***/ }),

/***/ "./node_modules/date-fns/isSameISOWeek.cjs":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/isSameISOWeek.cjs ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isSameISOWeek = isSameISOWeek;
var _index = __webpack_require__(/*! ./isSameWeek.cjs */ "./node_modules/date-fns/isSameWeek.cjs");

/**
 * The {@link isSameISOWeek} function options.
 */

/**
 * @name isSameISOWeek
 * @category ISO Week Helpers
 * @summary Are the given dates in the same ISO week (and year)?
 *
 * @description
 * Are the given dates in the same ISO week (and year)?
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param laterDate - The first date to check
 * @param earlierDate - The second date to check
 * @param options - An object with options
 *
 * @returns The dates are in the same ISO week (and year)
 *
 * @example
 * // Are 1 September 2014 and 7 September 2014 in the same ISO week?
 * const result = isSameISOWeek(new Date(2014, 8, 1), new Date(2014, 8, 7))
 * //=> true
 *
 * @example
 * // Are 1 September 2014 and 1 September 2015 in the same ISO week?
 * const result = isSameISOWeek(new Date(2014, 8, 1), new Date(2015, 8, 1))
 * //=> false
 */
function isSameISOWeek(laterDate, earlierDate, options) {
  return (0, _index.isSameWeek)(laterDate, earlierDate, {
    ...options,
    weekStartsOn: 1,
  });
}


/***/ }),

/***/ "./node_modules/date-fns/isSameISOWeekYear.cjs":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/isSameISOWeekYear.cjs ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isSameISOWeekYear = isSameISOWeekYear;
var _index = __webpack_require__(/*! ./startOfISOWeekYear.cjs */ "./node_modules/date-fns/startOfISOWeekYear.cjs");

var _index2 = __webpack_require__(/*! ./_lib/normalizeDates.cjs */ "./node_modules/date-fns/_lib/normalizeDates.cjs");

/**
 * The {@link isSameISOWeekYear} function options.
 */

/**
 * @name isSameISOWeekYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Are the given dates in the same ISO week-numbering year?
 *
 * @description
 * Are the given dates in the same ISO week-numbering year?
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param laterDate - The first date to check
 * @param earlierDate - The second date to check
 * @param options - An object with options
 *
 * @returns The dates are in the same ISO week-numbering year
 *
 * @example
 * // Are 29 December 2003 and 2 January 2005 in the same ISO week-numbering year?
 * const result = isSameISOWeekYear(new Date(2003, 11, 29), new Date(2005, 0, 2))
 * //=> true
 */
function isSameISOWeekYear(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = (0, _index2.normalizeDates)(
    options?.in,
    laterDate,
    earlierDate,
  );
  return (
    +(0, _index.startOfISOWeekYear)(laterDate_) ===
    +(0, _index.startOfISOWeekYear)(earlierDate_)
  );
}


/***/ }),

/***/ "./node_modules/date-fns/isSameMinute.cjs":
/*!************************************************!*\
  !*** ./node_modules/date-fns/isSameMinute.cjs ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isSameMinute = isSameMinute;
var _index = __webpack_require__(/*! ./startOfMinute.cjs */ "./node_modules/date-fns/startOfMinute.cjs");

/**
 * @name isSameMinute
 * @category Minute Helpers
 * @summary Are the given dates in the same minute (and hour and day)?
 *
 * @description
 * Are the given dates in the same minute (and hour and day)?
 *
 * @param laterDate - The first date to check
 * @param earlierDate - The second date to check
 *
 * @returns The dates are in the same minute (and hour and day)
 *
 * @example
 * // Are 4 September 2014 06:30:00 and 4 September 2014 06:30:15 in the same minute?
 * const result = isSameMinute(
 *   new Date(2014, 8, 4, 6, 30),
 *   new Date(2014, 8, 4, 6, 30, 15)
 * )
 * //=> true
 *
 * @example
 * // Are 4 September 2014 06:30:00 and 5 September 2014 06:30:00 in the same minute?
 * const result = isSameMinute(
 *   new Date(2014, 8, 4, 6, 30),
 *   new Date(2014, 8, 5, 6, 30)
 * )
 * //=> false
 */
function isSameMinute(laterDate, earlierDate) {
  return (
    +(0, _index.startOfMinute)(laterDate) ===
    +(0, _index.startOfMinute)(earlierDate)
  );
}


/***/ }),

/***/ "./node_modules/date-fns/isSameMonth.cjs":
/*!***********************************************!*\
  !*** ./node_modules/date-fns/isSameMonth.cjs ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isSameMonth = isSameMonth;
var _index = __webpack_require__(/*! ./_lib/normalizeDates.cjs */ "./node_modules/date-fns/_lib/normalizeDates.cjs");

/**
 * The {@link isSameMonth} function options.
 */

/**
 * @name isSameMonth
 * @category Month Helpers
 * @summary Are the given dates in the same month (and year)?
 *
 * @description
 * Are the given dates in the same month (and year)?
 *
 * @param laterDate - The first date to check
 * @param earlierDate - The second date to check
 * @param options - An object with options
 *
 * @returns The dates are in the same month (and year)
 *
 * @example
 * // Are 2 September 2014 and 25 September 2014 in the same month?
 * const result = isSameMonth(new Date(2014, 8, 2), new Date(2014, 8, 25))
 * //=> true
 *
 * @example
 * // Are 2 September 2014 and 25 September 2015 in the same month?
 * const result = isSameMonth(new Date(2014, 8, 2), new Date(2015, 8, 25))
 * //=> false
 */
function isSameMonth(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = (0, _index.normalizeDates)(
    options?.in,
    laterDate,
    earlierDate,
  );
  return (
    laterDate_.getFullYear() === earlierDate_.getFullYear() &&
    laterDate_.getMonth() === earlierDate_.getMonth()
  );
}


/***/ }),

/***/ "./node_modules/date-fns/isSameQuarter.cjs":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/isSameQuarter.cjs ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isSameQuarter = isSameQuarter;
var _index = __webpack_require__(/*! ./_lib/normalizeDates.cjs */ "./node_modules/date-fns/_lib/normalizeDates.cjs");
var _index2 = __webpack_require__(/*! ./startOfQuarter.cjs */ "./node_modules/date-fns/startOfQuarter.cjs");

/**
 * The {@link isSameQuarter} function options.
 */

/**
 * @name isSameQuarter
 * @category Quarter Helpers
 * @summary Are the given dates in the same quarter (and year)?
 *
 * @description
 * Are the given dates in the same quarter (and year)?
 *
 * @param laterDate - The first date to check
 * @param earlierDate - The second date to check
 * @param options - An object with options
 *
 * @returns The dates are in the same quarter (and year)
 *
 * @example
 * // Are 1 January 2014 and 8 March 2014 in the same quarter?
 * const result = isSameQuarter(new Date(2014, 0, 1), new Date(2014, 2, 8))
 * //=> true
 *
 * @example
 * // Are 1 January 2014 and 1 January 2015 in the same quarter?
 * const result = isSameQuarter(new Date(2014, 0, 1), new Date(2015, 0, 1))
 * //=> false
 */
function isSameQuarter(laterDate, earlierDate, options) {
  const [dateLeft_, dateRight_] = (0, _index.normalizeDates)(
    options?.in,
    laterDate,
    earlierDate,
  );
  return (
    +(0, _index2.startOfQuarter)(dateLeft_) ===
    +(0, _index2.startOfQuarter)(dateRight_)
  );
}


/***/ }),

/***/ "./node_modules/date-fns/isSameSecond.cjs":
/*!************************************************!*\
  !*** ./node_modules/date-fns/isSameSecond.cjs ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isSameSecond = isSameSecond;
var _index = __webpack_require__(/*! ./startOfSecond.cjs */ "./node_modules/date-fns/startOfSecond.cjs");

/**
 * @name isSameSecond
 * @category Second Helpers
 * @summary Are the given dates in the same second (and hour and day)?
 *
 * @description
 * Are the given dates in the same second (and hour and day)?
 *
 * @param laterDate - The first date to check
 * @param earlierDate - The second date to check
 *
 * @returns The dates are in the same second (and hour and day)
 *
 * @example
 * // Are 4 September 2014 06:30:15.000 and 4 September 2014 06:30.15.500 in the same second?
 * const result = isSameSecond(
 *   new Date(2014, 8, 4, 6, 30, 15),
 *   new Date(2014, 8, 4, 6, 30, 15, 500)
 * )
 * //=> true
 *
 * @example
 * // Are 4 September 2014 06:00:15.000 and 4 September 2014 06:01.15.000 in the same second?
 * const result = isSameSecond(
 *   new Date(2014, 8, 4, 6, 0, 15),
 *   new Date(2014, 8, 4, 6, 1, 15)
 * )
 * //=> false
 *
 * @example
 * // Are 4 September 2014 06:00:15.000 and 5 September 2014 06:00.15.000 in the same second?
 * const result = isSameSecond(
 *   new Date(2014, 8, 4, 6, 0, 15),
 *   new Date(2014, 8, 5, 6, 0, 15)
 * )
 * //=> false
 */
function isSameSecond(laterDate, earlierDate) {
  return (
    +(0, _index.startOfSecond)(laterDate) ===
    +(0, _index.startOfSecond)(earlierDate)
  );
}


/***/ }),

/***/ "./node_modules/date-fns/isSameWeek.cjs":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/isSameWeek.cjs ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isSameWeek = isSameWeek;
var _index = __webpack_require__(/*! ./_lib/normalizeDates.cjs */ "./node_modules/date-fns/_lib/normalizeDates.cjs");
var _index2 = __webpack_require__(/*! ./startOfWeek.cjs */ "./node_modules/date-fns/startOfWeek.cjs");

/**
 * The {@link isSameWeek} function options.
 */

/**
 * @name isSameWeek
 * @category Week Helpers
 * @summary Are the given dates in the same week (and month and year)?
 *
 * @description
 * Are the given dates in the same week (and month and year)?
 *
 * @param laterDate - The first date to check
 * @param earlierDate - The second date to check
 * @param options - An object with options
 *
 * @returns The dates are in the same week (and month and year)
 *
 * @example
 * // Are 31 August 2014 and 4 September 2014 in the same week?
 * const result = isSameWeek(new Date(2014, 7, 31), new Date(2014, 8, 4))
 * //=> true
 *
 * @example
 * // If week starts with Monday,
 * // are 31 August 2014 and 4 September 2014 in the same week?
 * const result = isSameWeek(new Date(2014, 7, 31), new Date(2014, 8, 4), {
 *   weekStartsOn: 1
 * })
 * //=> false
 *
 * @example
 * // Are 1 January 2014 and 1 January 2015 in the same week?
 * const result = isSameWeek(new Date(2014, 0, 1), new Date(2015, 0, 1))
 * //=> false
 */
function isSameWeek(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = (0, _index.normalizeDates)(
    options?.in,
    laterDate,
    earlierDate,
  );
  return (
    +(0, _index2.startOfWeek)(laterDate_, options) ===
    +(0, _index2.startOfWeek)(earlierDate_, options)
  );
}


/***/ }),

/***/ "./node_modules/date-fns/isSameYear.cjs":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/isSameYear.cjs ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isSameYear = isSameYear;
var _index = __webpack_require__(/*! ./_lib/normalizeDates.cjs */ "./node_modules/date-fns/_lib/normalizeDates.cjs");

/**
 * The {@link isSameYear} function options.
 */

/**
 * @name isSameYear
 * @category Year Helpers
 * @summary Are the given dates in the same year?
 *
 * @description
 * Are the given dates in the same year?
 *
 * @param laterDate - The first date to check
 * @param earlierDate - The second date to check
 * @param options - An object with options
 *
 * @returns The dates are in the same year
 *
 * @example
 * // Are 2 September 2014 and 25 September 2014 in the same year?
 * const result = isSameYear(new Date(2014, 8, 2), new Date(2014, 8, 25))
 * //=> true
 */
function isSameYear(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = (0, _index.normalizeDates)(
    options?.in,
    laterDate,
    earlierDate,
  );
  return laterDate_.getFullYear() === earlierDate_.getFullYear();
}


/***/ }),

/***/ "./node_modules/date-fns/isSaturday.cjs":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/isSaturday.cjs ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isSaturday = isSaturday;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link isSaturday} function options.
 */

/**
 * @name isSaturday
 * @category Weekday Helpers
 * @summary Is the given date Saturday?
 *
 * @description
 * Is the given date Saturday?
 *
 * @param date - The date to check
 * @param options - An object with options
 *
 * @returns The date is Saturday
 *
 * @example
 * // Is 27 September 2014 Saturday?
 * const result = isSaturday(new Date(2014, 8, 27))
 * //=> true
 */
function isSaturday(date, options) {
  return (0, _index.toDate)(date, options?.in).getDay() === 6;
}


/***/ }),

/***/ "./node_modules/date-fns/isSunday.cjs":
/*!********************************************!*\
  !*** ./node_modules/date-fns/isSunday.cjs ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isSunday = isSunday;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link isSunday} function options.
 */

/**
 * @name isSunday
 * @category Weekday Helpers
 * @summary Is the given date Sunday?
 *
 * @description
 * Is the given date Sunday?
 *
 * @param date - The date to check
 * @param options - The options object
 *
 * @returns The date is Sunday
 *
 * @example
 * // Is 21 September 2014 Sunday?
 * const result = isSunday(new Date(2014, 8, 21))
 * //=> true
 */
function isSunday(date, options) {
  return (0, _index.toDate)(date, options?.in).getDay() === 0;
}


/***/ }),

/***/ "./node_modules/date-fns/isThisHour.cjs":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/isThisHour.cjs ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isThisHour = isThisHour;
var _index = __webpack_require__(/*! ./constructNow.cjs */ "./node_modules/date-fns/constructNow.cjs");
var _index2 = __webpack_require__(/*! ./isSameHour.cjs */ "./node_modules/date-fns/isSameHour.cjs");
var _index3 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link isThisHour} function options.
 */

/**
 * @name isThisHour
 * @category Hour Helpers
 * @summary Is the given date in the same hour as the current date?
 * @pure false
 *
 * @description
 * Is the given date in the same hour as the current date?
 *
 * @param date - The date to check
 * @param options - An object with options
 *
 * @returns The date is in this hour
 *
 * @example
 * // If now is 25 September 2014 18:30:15.500,
 * // is 25 September 2014 18:00:00 in this hour?
 * const result = isThisHour(new Date(2014, 8, 25, 18))
 * //=> true
 */
function isThisHour(date, options) {
  return (0, _index2.isSameHour)(
    (0, _index3.toDate)(date, options?.in),
    (0, _index.constructNow)(options?.in || date),
  );
}


/***/ }),

/***/ "./node_modules/date-fns/isThisISOWeek.cjs":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/isThisISOWeek.cjs ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isThisISOWeek = isThisISOWeek;
var _index = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
var _index2 = __webpack_require__(/*! ./constructNow.cjs */ "./node_modules/date-fns/constructNow.cjs");
var _index3 = __webpack_require__(/*! ./isSameISOWeek.cjs */ "./node_modules/date-fns/isSameISOWeek.cjs");

/**
 * The {@link isThisISOWeek} function options.
 */

/**
 * @name isThisISOWeek
 * @category ISO Week Helpers
 * @summary Is the given date in the same ISO week as the current date?
 * @pure false
 *
 * @description
 * Is the given date in the same ISO week as the current date?
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The date to check
 * @param options - An object with options
 *
 * @returns The date is in this ISO week
 *
 * @example
 * // If today is 25 September 2014, is 22 September 2014 in this ISO week?
 * const result = isThisISOWeek(new Date(2014, 8, 22))
 * //=> true
 */
function isThisISOWeek(date, options) {
  return (0, _index3.isSameISOWeek)(
    (0, _index.constructFrom)(options?.in || date, date),
    (0, _index2.constructNow)(options?.in || date),
  );
}


/***/ }),

/***/ "./node_modules/date-fns/isThisMinute.cjs":
/*!************************************************!*\
  !*** ./node_modules/date-fns/isThisMinute.cjs ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isThisMinute = isThisMinute;
var _index = __webpack_require__(/*! ./constructNow.cjs */ "./node_modules/date-fns/constructNow.cjs");
var _index2 = __webpack_require__(/*! ./isSameMinute.cjs */ "./node_modules/date-fns/isSameMinute.cjs");

/**
 * @name isThisMinute
 * @category Minute Helpers
 * @summary Is the given date in the same minute as the current date?
 * @pure false
 *
 * @description
 * Is the given date in the same minute as the current date?
 *
 * @param date - The date to check
 *
 * @returns The date is in this minute
 *
 * @example
 * // If now is 25 September 2014 18:30:15.500,
 * // is 25 September 2014 18:30:00 in this minute?
 * const result = isThisMinute(new Date(2014, 8, 25, 18, 30))
 * //=> true
 */

function isThisMinute(date) {
  return (0, _index2.isSameMinute)(date, (0, _index.constructNow)(date));
}


/***/ }),

/***/ "./node_modules/date-fns/isThisMonth.cjs":
/*!***********************************************!*\
  !*** ./node_modules/date-fns/isThisMonth.cjs ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isThisMonth = isThisMonth;
var _index = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
var _index2 = __webpack_require__(/*! ./constructNow.cjs */ "./node_modules/date-fns/constructNow.cjs");
var _index3 = __webpack_require__(/*! ./isSameMonth.cjs */ "./node_modules/date-fns/isSameMonth.cjs");

/**
 * The {@link isThisMonth} function options.
 */

/**
 * @name isThisMonth
 * @category Month Helpers
 * @summary Is the given date in the same month as the current date?
 * @pure false
 *
 * @description
 * Is the given date in the same month as the current date?
 *
 * @param date - The date to check
 * @param options - An object with options
 *
 * @returns The date is in this month
 *
 * @example
 * // If today is 25 September 2014, is 15 September 2014 in this month?
 * const result = isThisMonth(new Date(2014, 8, 15))
 * //=> true
 */
function isThisMonth(date, options) {
  return (0, _index3.isSameMonth)(
    (0, _index.constructFrom)(options?.in || date, date),
    (0, _index2.constructNow)(options?.in || date),
  );
}


/***/ }),

/***/ "./node_modules/date-fns/isThisQuarter.cjs":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/isThisQuarter.cjs ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isThisQuarter = isThisQuarter;
var _index = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
var _index2 = __webpack_require__(/*! ./constructNow.cjs */ "./node_modules/date-fns/constructNow.cjs");
var _index3 = __webpack_require__(/*! ./isSameQuarter.cjs */ "./node_modules/date-fns/isSameQuarter.cjs");

/**
 * The {@link isThisQuarter} function options.
 */

/**
 * @name isThisQuarter
 * @category Quarter Helpers
 * @summary Is the given date in the same quarter as the current date?
 * @pure false
 *
 * @description
 * Is the given date in the same quarter as the current date?
 *
 * @param date - The date to check
 * @param options - An object with options
 *
 * @returns The date is in this quarter
 *
 * @example
 * // If today is 25 September 2014, is 2 July 2014 in this quarter?
 * const result = isThisQuarter(new Date(2014, 6, 2))
 * //=> true
 */
function isThisQuarter(date, options) {
  return (0, _index3.isSameQuarter)(
    (0, _index.constructFrom)(options?.in || date, date),
    (0, _index2.constructNow)(options?.in || date),
  );
}


/***/ }),

/***/ "./node_modules/date-fns/isThisSecond.cjs":
/*!************************************************!*\
  !*** ./node_modules/date-fns/isThisSecond.cjs ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isThisSecond = isThisSecond;
var _index = __webpack_require__(/*! ./constructNow.cjs */ "./node_modules/date-fns/constructNow.cjs");
var _index2 = __webpack_require__(/*! ./isSameSecond.cjs */ "./node_modules/date-fns/isSameSecond.cjs");

/**
 * @name isThisSecond
 * @category Second Helpers
 * @summary Is the given date in the same second as the current date?
 * @pure false
 *
 * @description
 * Is the given date in the same second as the current date?
 *
 * @param date - The date to check
 *
 * @returns The date is in this second
 *
 * @example
 * // If now is 25 September 2014 18:30:15.500,
 * // is 25 September 2014 18:30:15.000 in this second?
 * const result = isThisSecond(new Date(2014, 8, 25, 18, 30, 15))
 * //=> true
 */
function isThisSecond(date) {
  return (0, _index2.isSameSecond)(date, (0, _index.constructNow)(date));
}


/***/ }),

/***/ "./node_modules/date-fns/isThisWeek.cjs":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/isThisWeek.cjs ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isThisWeek = isThisWeek;
var _index = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
var _index2 = __webpack_require__(/*! ./constructNow.cjs */ "./node_modules/date-fns/constructNow.cjs");
var _index3 = __webpack_require__(/*! ./isSameWeek.cjs */ "./node_modules/date-fns/isSameWeek.cjs");

/**
 * The {@link isThisWeek} function options.
 */

/**
 * @name isThisWeek
 * @category Week Helpers
 * @summary Is the given date in the same week as the current date?
 * @pure false
 *
 * @description
 * Is the given date in the same week as the current date?
 *
 * @param date - The date to check
 * @param options - The object with options
 *
 * @returns The date is in this week
 *
 * @example
 * // If today is 25 September 2014, is 21 September 2014 in this week?
 * const result = isThisWeek(new Date(2014, 8, 21))
 * //=> true
 *
 * @example
 * // If today is 25 September 2014 and week starts with Monday
 * // is 21 September 2014 in this week?
 * const result = isThisWeek(new Date(2014, 8, 21), { weekStartsOn: 1 })
 * //=> false
 */
function isThisWeek(date, options) {
  return (0, _index3.isSameWeek)(
    (0, _index.constructFrom)(options?.in || date, date),
    (0, _index2.constructNow)(options?.in || date),
    options,
  );
}


/***/ }),

/***/ "./node_modules/date-fns/isThisYear.cjs":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/isThisYear.cjs ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isThisYear = isThisYear;
var _index = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
var _index2 = __webpack_require__(/*! ./constructNow.cjs */ "./node_modules/date-fns/constructNow.cjs");
var _index3 = __webpack_require__(/*! ./isSameYear.cjs */ "./node_modules/date-fns/isSameYear.cjs");

/**
 * The {@link isThisYear} function options.
 */

/**
 * @name isThisYear
 * @category Year Helpers
 * @summary Is the given date in the same year as the current date?
 * @pure false
 *
 * @description
 * Is the given date in the same year as the current date?
 *
 * @param date - The date to check
 * @param options - An object with options
 *
 * @returns The date is in this year
 *
 * @example
 * // If today is 25 September 2014, is 2 July 2014 in this year?
 * const result = isThisYear(new Date(2014, 6, 2))
 * //=> true
 */
function isThisYear(date, options) {
  return (0, _index3.isSameYear)(
    (0, _index.constructFrom)(options?.in || date, date),
    (0, _index2.constructNow)(options?.in || date),
  );
}


/***/ }),

/***/ "./node_modules/date-fns/isThursday.cjs":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/isThursday.cjs ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isThursday = isThursday;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link isThursday} function options.
 */

/**
 * @name isThursday
 * @category Weekday Helpers
 * @summary Is the given date Thursday?
 *
 * @description
 * Is the given date Thursday?
 *
 * @param date - The date to check
 * @param options - An object with options
 *
 * @returns The date is Thursday
 *
 * @example
 * // Is 25 September 2014 Thursday?
 * const result = isThursday(new Date(2014, 8, 25))
 * //=> true
 */
function isThursday(date, options) {
  return (0, _index.toDate)(date, options?.in).getDay() === 4;
}


/***/ }),

/***/ "./node_modules/date-fns/isToday.cjs":
/*!*******************************************!*\
  !*** ./node_modules/date-fns/isToday.cjs ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isToday = isToday;
var _index = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
var _index2 = __webpack_require__(/*! ./constructNow.cjs */ "./node_modules/date-fns/constructNow.cjs");
var _index3 = __webpack_require__(/*! ./isSameDay.cjs */ "./node_modules/date-fns/isSameDay.cjs");

/**
 * The {@link isToday} function options.
 */

/**
 * @name isToday
 * @category Day Helpers
 * @summary Is the given date today?
 * @pure false
 *
 * @description
 * Is the given date today?
 *
 * @param date - The date to check
 * @param options - An object with options
 *
 * @returns The date is today
 *
 * @example
 * // If today is 6 October 2014, is 6 October 14:00:00 today?
 * const result = isToday(new Date(2014, 9, 6, 14, 0))
 * //=> true
 */
function isToday(date, options) {
  return (0, _index3.isSameDay)(
    (0, _index.constructFrom)(options?.in || date, date),
    (0, _index2.constructNow)(options?.in || date),
  );
}


/***/ }),

/***/ "./node_modules/date-fns/isTomorrow.cjs":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/isTomorrow.cjs ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isTomorrow = isTomorrow;
var _index = __webpack_require__(/*! ./addDays.cjs */ "./node_modules/date-fns/addDays.cjs");
var _index2 = __webpack_require__(/*! ./constructNow.cjs */ "./node_modules/date-fns/constructNow.cjs");
var _index3 = __webpack_require__(/*! ./isSameDay.cjs */ "./node_modules/date-fns/isSameDay.cjs");

/**
 * The {@link isTomorrow} function options.
 */

/**
 * @name isTomorrow
 * @category Day Helpers
 * @summary Is the given date tomorrow?
 * @pure false
 *
 * @description
 * Is the given date tomorrow?
 *
 * @param date - The date to check
 * @param options - An object with options
 *
 * @returns The date is tomorrow
 *
 * @example
 * // If today is 6 October 2014, is 7 October 14:00:00 tomorrow?
 * const result = isTomorrow(new Date(2014, 9, 7, 14, 0))
 * //=> true
 */
function isTomorrow(date, options) {
  return (0, _index3.isSameDay)(
    date,
    (0, _index.addDays)((0, _index2.constructNow)(options?.in || date), 1),
    options,
  );
}


/***/ }),

/***/ "./node_modules/date-fns/isTuesday.cjs":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/isTuesday.cjs ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isTuesday = isTuesday;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link isTuesday} function options.
 */

/**
 * @name isTuesday
 * @category Weekday Helpers
 * @summary Is the given date Tuesday?
 *
 * @description
 * Is the given date Tuesday?
 *
 * @param date - The date to check
 * @param options - An object with options
 *
 * @returns The date is Tuesday
 *
 * @example
 * // Is 23 September 2014 Tuesday?
 * const result = isTuesday(new Date(2014, 8, 23))
 * //=> true
 */
function isTuesday(date, options) {
  return (0, _index.toDate)(date, options?.in).getDay() === 2;
}


/***/ }),

/***/ "./node_modules/date-fns/isValid.cjs":
/*!*******************************************!*\
  !*** ./node_modules/date-fns/isValid.cjs ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isValid = isValid;
var _index = __webpack_require__(/*! ./isDate.cjs */ "./node_modules/date-fns/isDate.cjs");
var _index2 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * @name isValid
 * @category Common Helpers
 * @summary Is the given date valid?
 *
 * @description
 * Returns false if argument is Invalid Date and true otherwise.
 * Argument is converted to Date using `toDate`. See [toDate](https://date-fns.org/docs/toDate)
 * Invalid Date is a Date, whose time value is NaN.
 *
 * Time value of Date: http://es5.github.io/#x15.9.1.1
 *
 * @param date - The date to check
 *
 * @returns The date is valid
 *
 * @example
 * // For the valid date:
 * const result = isValid(new Date(2014, 1, 31))
 * //=> true
 *
 * @example
 * // For the value, convertible into a date:
 * const result = isValid(1393804800000)
 * //=> true
 *
 * @example
 * // For the invalid date:
 * const result = isValid(new Date(''))
 * //=> false
 */
function isValid(date) {
  return !(
    (!(0, _index.isDate)(date) && typeof date !== "number") ||
    isNaN(+(0, _index2.toDate)(date))
  );
}


/***/ }),

/***/ "./node_modules/date-fns/isWednesday.cjs":
/*!***********************************************!*\
  !*** ./node_modules/date-fns/isWednesday.cjs ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isWednesday = isWednesday;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link isWednesday} function options.
 */

/**
 * @name isWednesday
 * @category Weekday Helpers
 * @summary Is the given date Wednesday?
 *
 * @description
 * Is the given date Wednesday?
 *
 * @param date - The date to check
 * @param options - An object with options
 *
 * @returns The date is Wednesday
 *
 * @example
 * // Is 24 September 2014 Wednesday?
 * const result = isWednesday(new Date(2014, 8, 24))
 * //=> true
 */
function isWednesday(date, options) {
  return (0, _index.toDate)(date, options?.in).getDay() === 3;
}


/***/ }),

/***/ "./node_modules/date-fns/isWeekend.cjs":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/isWeekend.cjs ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isWeekend = isWeekend;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link isWeekend} function options.
 */

/**
 * @name isWeekend
 * @category Weekday Helpers
 * @summary Does the given date fall on a weekend?
 *
 * @description
 * Does the given date fall on a weekend? A weekend is either Saturday (`6`) or Sunday (`0`).
 *
 * @param date - The date to check
 * @param options - An object with options
 *
 * @returns The date falls on a weekend
 *
 * @example
 * // Does 5 October 2014 fall on a weekend?
 * const result = isWeekend(new Date(2014, 9, 5))
 * //=> true
 */
function isWeekend(date, options) {
  const day = (0, _index.toDate)(date, options?.in).getDay();
  return day === 0 || day === 6;
}


/***/ }),

/***/ "./node_modules/date-fns/isWithinInterval.cjs":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/isWithinInterval.cjs ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isWithinInterval = isWithinInterval;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link isWithinInterval} function options.
 */

/**
 * @name isWithinInterval
 * @category Interval Helpers
 * @summary Is the given date within the interval?
 *
 * @description
 * Is the given date within the interval? (Including start and end.)
 *
 * @param date - The date to check
 * @param interval - The interval to check
 * @param options - An object with options
 *
 * @returns The date is within the interval
 *
 * @example
 * // For the date within the interval:
 * isWithinInterval(new Date(2014, 0, 3), {
 *   start: new Date(2014, 0, 1),
 *   end: new Date(2014, 0, 7)
 * })
 * // => true
 *
 * @example
 * // For the date outside of the interval:
 * isWithinInterval(new Date(2014, 0, 10), {
 *   start: new Date(2014, 0, 1),
 *   end: new Date(2014, 0, 7)
 * })
 * // => false
 *
 * @example
 * // For date equal to the interval start:
 * isWithinInterval(date, { start, end: date })
 * // => true
 *
 * @example
 * // For date equal to the interval end:
 * isWithinInterval(date, { start: date, end })
 * // => true
 */
function isWithinInterval(date, interval, options) {
  const time = +(0, _index.toDate)(date, options?.in);
  const [startTime, endTime] = [
    +(0, _index.toDate)(interval.start, options?.in),
    +(0, _index.toDate)(interval.end, options?.in),
  ].sort((a, b) => a - b);

  return time >= startTime && time <= endTime;
}


/***/ }),

/***/ "./node_modules/date-fns/isYesterday.cjs":
/*!***********************************************!*\
  !*** ./node_modules/date-fns/isYesterday.cjs ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.isYesterday = isYesterday;
var _index = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
var _index2 = __webpack_require__(/*! ./constructNow.cjs */ "./node_modules/date-fns/constructNow.cjs");
var _index3 = __webpack_require__(/*! ./isSameDay.cjs */ "./node_modules/date-fns/isSameDay.cjs");
var _index4 = __webpack_require__(/*! ./subDays.cjs */ "./node_modules/date-fns/subDays.cjs");

/**
 * The {@link isYesterday} function options.
 */

/**
 * @name isYesterday
 * @category Day Helpers
 * @summary Is the given date yesterday?
 * @pure false
 *
 * @description
 * Is the given date yesterday?
 *
 * @param date - The date to check
 * @param options - An object with options
 *
 * @returns The date is yesterday
 *
 * @example
 * // If today is 6 October 2014, is 5 October 14:00:00 yesterday?
 * const result = isYesterday(new Date(2014, 9, 5, 14, 0))
 * //=> true
 */
function isYesterday(date, options) {
  return (0, _index3.isSameDay)(
    (0, _index.constructFrom)(options?.in || date, date),
    (0, _index4.subDays)((0, _index2.constructNow)(options?.in || date), 1),
  );
}


/***/ }),

/***/ "./node_modules/date-fns/lastDayOfDecade.cjs":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/lastDayOfDecade.cjs ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.lastDayOfDecade = lastDayOfDecade;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link lastDayOfDecade} function options.
 */

/**
 * @name lastDayOfDecade
 * @category Decade Helpers
 * @summary Return the last day of a decade for the given date.
 *
 * @description
 * Return the last day of a decade for the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows using extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type; inferred from arguments or specified by context.
 *
 * @param date - The original date
 * @param options - The options
 *
 * @returns The last day of a decade
 *
 * @example
 * // The last day of a decade for 21 December 2012 21:12:00:
 * const result = lastDayOfDecade(new Date(2012, 11, 21, 21, 12, 00))
 * //=> Wed Dec 31 2019 00:00:00
 */
function lastDayOfDecade(date, options) {
  const _date = (0, _index.toDate)(date, options?.in);
  const year = _date.getFullYear();
  const decade = 9 + Math.floor(year / 10) * 10;
  _date.setFullYear(decade + 1, 0, 0);
  _date.setHours(0, 0, 0, 0);
  return (0, _index.toDate)(_date, options?.in);
}


/***/ }),

/***/ "./node_modules/date-fns/lastDayOfISOWeek.cjs":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/lastDayOfISOWeek.cjs ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.lastDayOfISOWeek = lastDayOfISOWeek;
var _index = __webpack_require__(/*! ./lastDayOfWeek.cjs */ "./node_modules/date-fns/lastDayOfWeek.cjs");

/**
 * The {@link lastDayOfISOWeek} function options.
 */

/**
 * @name lastDayOfISOWeek
 * @category ISO Week Helpers
 * @summary Return the last day of an ISO week for the given date.
 *
 * @description
 * Return the last day of an ISO week for the given date.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The Date type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [UTCDate](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The last day of an ISO week
 *
 * @example
 * // The last day of an ISO week for 2 September 2014 11:55:00:
 * const result = lastDayOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Sep 07 2014 00:00:00
 */
function lastDayOfISOWeek(date, options) {
  return (0, _index.lastDayOfWeek)(date, { ...options, weekStartsOn: 1 });
}


/***/ }),

/***/ "./node_modules/date-fns/lastDayOfISOWeekYear.cjs":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/lastDayOfISOWeekYear.cjs ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.lastDayOfISOWeekYear = lastDayOfISOWeekYear;
var _index = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
var _index2 = __webpack_require__(/*! ./getISOWeekYear.cjs */ "./node_modules/date-fns/getISOWeekYear.cjs");
var _index3 = __webpack_require__(/*! ./startOfISOWeek.cjs */ "./node_modules/date-fns/startOfISOWeek.cjs");

/**
 * The {@link lastDayOfISOWeekYear} function options.
 */

/**
 * @name lastDayOfISOWeekYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Return the last day of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the last day of an ISO week-numbering year,
 * which always starts 3 days before the year's first Thursday.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The end of an ISO week-numbering year
 *
 * @example
 * // The last day of an ISO week-numbering year for 2 July 2005:
 * const result = lastDayOfISOWeekYear(new Date(2005, 6, 2))
 * //=> Sun Jan 01 2006 00:00:00
 */
function lastDayOfISOWeekYear(date, options) {
  const year = (0, _index2.getISOWeekYear)(date, options);
  const fourthOfJanuary = (0, _index.constructFrom)(options?.in || date, 0);
  fourthOfJanuary.setFullYear(year + 1, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);

  const date_ = (0, _index3.startOfISOWeek)(fourthOfJanuary, options);
  date_.setDate(date_.getDate() - 1);
  return date_;
}


/***/ }),

/***/ "./node_modules/date-fns/lastDayOfMonth.cjs":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/lastDayOfMonth.cjs ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.lastDayOfMonth = lastDayOfMonth;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link lastDayOfMonth} function options.
 */

/**
 * @name lastDayOfMonth
 * @category Month Helpers
 * @summary Return the last day of a month for the given date.
 *
 * @description
 * Return the last day of a month for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The last day of a month
 *
 * @example
 * // The last day of a month for 2 September 2014 11:55:00:
 * const result = lastDayOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 00:00:00
 */
function lastDayOfMonth(date, options) {
  const _date = (0, _index.toDate)(date, options?.in);
  const month = _date.getMonth();
  _date.setFullYear(_date.getFullYear(), month + 1, 0);
  _date.setHours(0, 0, 0, 0);
  return (0, _index.toDate)(_date, options?.in);
}


/***/ }),

/***/ "./node_modules/date-fns/lastDayOfQuarter.cjs":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/lastDayOfQuarter.cjs ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.lastDayOfQuarter = lastDayOfQuarter;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link lastDayOfQuarter} function options.
 */

/**
 * @name lastDayOfQuarter
 * @category Quarter Helpers
 * @summary Return the last day of a year quarter for the given date.
 *
 * @description
 * Return the last day of a year quarter for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - The options
 *
 * @returns The last day of a quarter
 *
 * @example
 * // The last day of a quarter for 2 September 2014 11:55:00:
 * const result = lastDayOfQuarter(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 00:00:00
 */
function lastDayOfQuarter(date, options) {
  const date_ = (0, _index.toDate)(date, options?.in);
  const currentMonth = date_.getMonth();
  const month = currentMonth - (currentMonth % 3) + 3;
  date_.setMonth(month, 0);
  date_.setHours(0, 0, 0, 0);
  return date_;
}


/***/ }),

/***/ "./node_modules/date-fns/lastDayOfWeek.cjs":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/lastDayOfWeek.cjs ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.lastDayOfWeek = lastDayOfWeek;
var _index = __webpack_require__(/*! ./_lib/defaultOptions.cjs */ "./node_modules/date-fns/_lib/defaultOptions.cjs");
var _index2 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link lastDayOfWeek} function options.
 */

/**
 * @name lastDayOfWeek
 * @category Week Helpers
 * @summary Return the last day of a week for the given date.
 *
 * @description
 * Return the last day of a week for the given date.
 * The result will be in the local timezone unless a context is specified.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The last day of a week
 */
function lastDayOfWeek(date, options) {
  const defaultOptions = (0, _index.getDefaultOptions)();
  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  const _date = (0, _index2.toDate)(date, options?.in);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);

  _date.setHours(0, 0, 0, 0);
  _date.setDate(_date.getDate() + diff);

  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/lastDayOfYear.cjs":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/lastDayOfYear.cjs ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.lastDayOfYear = lastDayOfYear;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link lastDayOfYear} function options.
 */

/**
 * @name lastDayOfYear
 * @category Year Helpers
 * @summary Return the last day of a year for the given date.
 *
 * @description
 * Return the last day of a year for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The last day of a year
 *
 * @example
 * // The last day of a year for 2 September 2014 11:55:00:
 * const result = lastDayOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Dec 31 2014 00:00:00
 */
function lastDayOfYear(date, options) {
  const date_ = (0, _index.toDate)(date, options?.in);
  const year = date_.getFullYear();
  date_.setFullYear(year + 1, 0, 0);
  date_.setHours(0, 0, 0, 0);
  return date_;
}


/***/ }),

/***/ "./node_modules/date-fns/lightFormat.cjs":
/*!***********************************************!*\
  !*** ./node_modules/date-fns/lightFormat.cjs ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.lightFormat = lightFormat;
Object.defineProperty(exports, "lightFormatters", ({
  enumerable: true,
  get: function () {
    return _index.lightFormatters;
  },
}));
var _index = __webpack_require__(/*! ./_lib/format/lightFormatters.cjs */ "./node_modules/date-fns/_lib/format/lightFormatters.cjs");
var _index2 = __webpack_require__(/*! ./isValid.cjs */ "./node_modules/date-fns/isValid.cjs");
var _index3 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

// Rexports of internal for libraries to use.
// See: https://github.com/date-fns/date-fns/issues/3638#issuecomment-1877082874

// This RegExp consists of three parts separated by `|`:
// - (\w)\1* matches any sequences of the same letter
// - '' matches two quote characters in a row
// - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
//   except a single quote symbol, which ends the sequence.
//   Two quote characters do not end the sequence.
//   If there is no matching single quote
//   then the sequence will continue until the end of the string.
// - . matches any single character unmatched by previous parts of the RegExps
const formattingTokensRegExp = /(\w)\1*|''|'(''|[^'])+('|$)|./g;

const escapedStringRegExp = /^'([^]*?)'?$/;
const doubleQuoteRegExp = /''/g;
const unescapedLatinCharacterRegExp = /[a-zA-Z]/;

/**
 * @private
 */

/**
 * @name lightFormat
 * @category Common Helpers
 * @summary Format the date.
 *
 * @description
 * Return the formatted date string in the given format. Unlike `format`,
 * `lightFormat` doesn't use locales and outputs date using the most popular tokens.
 *
 * > ⚠️ Please note that the `lightFormat` tokens differ from Moment.js and other libraries.
 * > See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * The characters wrapped between two single quotes characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
 *
 * Format of the string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 *
 * Accepted patterns:
 * | Unit                            | Pattern | Result examples                   |
 * |---------------------------------|---------|-----------------------------------|
 * | AM, PM                          | a..aaa  | AM, PM                            |
 * |                                 | aaaa    | a.m., p.m.                        |
 * |                                 | aaaaa   | a, p                              |
 * | Calendar year                   | y       | 44, 1, 1900, 2017                 |
 * |                                 | yy      | 44, 01, 00, 17                    |
 * |                                 | yyy     | 044, 001, 000, 017                |
 * |                                 | yyyy    | 0044, 0001, 1900, 2017            |
 * | Month (formatting)              | M       | 1, 2, ..., 12                     |
 * |                                 | MM      | 01, 02, ..., 12                   |
 * | Day of month                    | d       | 1, 2, ..., 31                     |
 * |                                 | dd      | 01, 02, ..., 31                   |
 * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |
 * |                                 | hh      | 01, 02, ..., 11, 12               |
 * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |
 * |                                 | HH      | 00, 01, 02, ..., 23               |
 * | Minute                          | m       | 0, 1, ..., 59                     |
 * |                                 | mm      | 00, 01, ..., 59                   |
 * | Second                          | s       | 0, 1, ..., 59                     |
 * |                                 | ss      | 00, 01, ..., 59                   |
 * | Fraction of second              | S       | 0, 1, ..., 9                      |
 * |                                 | SS      | 00, 01, ..., 99                   |
 * |                                 | SSS     | 000, 001, ..., 999                |
 * |                                 | SSSS    | ...                               |
 *
 * @param date - The original date
 * @param format - The string of tokens
 *
 * @returns The formatted date string
 *
 * @throws `Invalid time value` if the date is invalid
 * @throws format string contains an unescaped latin alphabet character
 *
 * @example
 * const result = lightFormat(new Date(2014, 1, 11), 'yyyy-MM-dd')
 * //=> '2014-02-11'
 */
function lightFormat(date, formatStr) {
  const date_ = (0, _index3.toDate)(date);

  if (!(0, _index2.isValid)(date_)) {
    throw new RangeError("Invalid time value");
  }

  const tokens = formatStr.match(formattingTokensRegExp);

  // The only case when formattingTokensRegExp doesn't match the string is when it's empty
  if (!tokens) return "";

  const result = tokens
    .map((substring) => {
      // Replace two single quote characters with one single quote character
      if (substring === "''") {
        return "'";
      }

      const firstCharacter = substring[0];
      if (firstCharacter === "'") {
        return cleanEscapedString(substring);
      }

      const formatter = _index.lightFormatters[firstCharacter];
      if (formatter) {
        return formatter(date_, substring);
      }

      if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" +
            firstCharacter +
            "`",
        );
      }

      return substring;
    })
    .join("");

  return result;
}

function cleanEscapedString(input) {
  const matches = input.match(escapedStringRegExp);
  if (!matches) return input;
  return matches[1].replace(doubleQuoteRegExp, "'");
}


/***/ }),

/***/ "./node_modules/date-fns/locale/_lib/buildFormatLongFn.cjs":
/*!*****************************************************************!*\
  !*** ./node_modules/date-fns/locale/_lib/buildFormatLongFn.cjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.buildFormatLongFn = buildFormatLongFn;

function buildFormatLongFn(args) {
  return (options = {}) => {
    // TODO: Remove String()
    const width = options.width ? String(options.width) : args.defaultWidth;
    const format = args.formats[width] || args.formats[args.defaultWidth];
    return format;
  };
}


/***/ }),

/***/ "./node_modules/date-fns/locale/_lib/buildLocalizeFn.cjs":
/*!***************************************************************!*\
  !*** ./node_modules/date-fns/locale/_lib/buildLocalizeFn.cjs ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.buildLocalizeFn = buildLocalizeFn;

/**
 * The localize function argument callback which allows to convert raw value to
 * the actual type.
 *
 * @param value - The value to convert
 *
 * @returns The converted value
 */

/**
 * The map of localized values for each width.
 */

/**
 * The index type of the locale unit value. It types conversion of units of
 * values that don't start at 0 (i.e. quarters).
 */

/**
 * Converts the unit value to the tuple of values.
 */

/**
 * The tuple of localized era values. The first element represents BC,
 * the second element represents AD.
 */

/**
 * The tuple of localized quarter values. The first element represents Q1.
 */

/**
 * The tuple of localized day values. The first element represents Sunday.
 */

/**
 * The tuple of localized month values. The first element represents January.
 */

function buildLocalizeFn(args) {
  return (value, options) => {
    const context = options?.context ? String(options.context) : "standalone";

    let valuesArray;
    if (context === "formatting" && args.formattingValues) {
      const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      const width = options?.width ? String(options.width) : defaultWidth;

      valuesArray =
        args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      const defaultWidth = args.defaultWidth;
      const width = options?.width ? String(options.width) : args.defaultWidth;

      valuesArray = args.values[width] || args.values[defaultWidth];
    }
    const index = args.argumentCallback ? args.argumentCallback(value) : value;

    // @ts-expect-error - For some reason TypeScript just don't want to match it, no matter how hard we try. I challenge you to try to remove it!
    return valuesArray[index];
  };
}


/***/ }),

/***/ "./node_modules/date-fns/locale/_lib/buildMatchFn.cjs":
/*!************************************************************!*\
  !*** ./node_modules/date-fns/locale/_lib/buildMatchFn.cjs ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.buildMatchFn = buildMatchFn;

function buildMatchFn(args) {
  return (string, options = {}) => {
    const width = options.width;

    const matchPattern =
      (width && args.matchPatterns[width]) ||
      args.matchPatterns[args.defaultMatchWidth];
    const matchResult = string.match(matchPattern);

    if (!matchResult) {
      return null;
    }
    const matchedString = matchResult[0];

    const parsePatterns =
      (width && args.parsePatterns[width]) ||
      args.parsePatterns[args.defaultParseWidth];

    const key = Array.isArray(parsePatterns)
      ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString))
      : // [TODO] -- I challenge you to fix the type
        findKey(parsePatterns, (pattern) => pattern.test(matchedString));

    let value;

    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback
      ? // [TODO] -- I challenge you to fix the type
        options.valueCallback(value)
      : value;

    const rest = string.slice(matchedString.length);

    return { value, rest };
  };
}

function findKey(object, predicate) {
  for (const key in object) {
    if (
      Object.prototype.hasOwnProperty.call(object, key) &&
      predicate(object[key])
    ) {
      return key;
    }
  }
  return undefined;
}

function findIndex(array, predicate) {
  for (let key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return undefined;
}


/***/ }),

/***/ "./node_modules/date-fns/locale/_lib/buildMatchPatternFn.cjs":
/*!*******************************************************************!*\
  !*** ./node_modules/date-fns/locale/_lib/buildMatchPatternFn.cjs ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.buildMatchPatternFn = buildMatchPatternFn;

function buildMatchPatternFn(args) {
  return (string, options = {}) => {
    const matchResult = string.match(args.matchPattern);
    if (!matchResult) return null;
    const matchedString = matchResult[0];

    const parseResult = string.match(args.parsePattern);
    if (!parseResult) return null;
    let value = args.valueCallback
      ? args.valueCallback(parseResult[0])
      : parseResult[0];

    // [TODO] I challenge you to fix the type
    value = options.valueCallback ? options.valueCallback(value) : value;

    const rest = string.slice(matchedString.length);

    return { value, rest };
  };
}


/***/ }),

/***/ "./node_modules/date-fns/locale/en-US.cjs":
/*!************************************************!*\
  !*** ./node_modules/date-fns/locale/en-US.cjs ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.enUS = void 0;
var _index = __webpack_require__(/*! ./en-US/_lib/formatDistance.cjs */ "./node_modules/date-fns/locale/en-US/_lib/formatDistance.cjs");
var _index2 = __webpack_require__(/*! ./en-US/_lib/formatLong.cjs */ "./node_modules/date-fns/locale/en-US/_lib/formatLong.cjs");
var _index3 = __webpack_require__(/*! ./en-US/_lib/formatRelative.cjs */ "./node_modules/date-fns/locale/en-US/_lib/formatRelative.cjs");
var _index4 = __webpack_require__(/*! ./en-US/_lib/localize.cjs */ "./node_modules/date-fns/locale/en-US/_lib/localize.cjs");
var _index5 = __webpack_require__(/*! ./en-US/_lib/match.cjs */ "./node_modules/date-fns/locale/en-US/_lib/match.cjs");

/**
 * @category Locales
 * @summary English locale (United States).
 * @language English
 * @iso-639-2 eng
 * @author Sasha Koss [@kossnocorp](https://github.com/kossnocorp)
 * @author Lesha Koss [@leshakoss](https://github.com/leshakoss)
 */
const enUS = (exports.enUS = {
  code: "en-US",
  formatDistance: _index.formatDistance,
  formatLong: _index2.formatLong,
  formatRelative: _index3.formatRelative,
  localize: _index4.localize,
  match: _index5.match,
  options: {
    weekStartsOn: 0 /* Sunday */,
    firstWeekContainsDate: 1,
  },
});


/***/ }),

/***/ "./node_modules/date-fns/locale/en-US/_lib/formatDistance.cjs":
/*!********************************************************************!*\
  !*** ./node_modules/date-fns/locale/en-US/_lib/formatDistance.cjs ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.formatDistance = void 0;

const formatDistanceLocale = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds",
  },

  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds",
  },

  halfAMinute: "half a minute",

  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes",
  },

  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes",
  },

  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours",
  },

  xHours: {
    one: "1 hour",
    other: "{{count}} hours",
  },

  xDays: {
    one: "1 day",
    other: "{{count}} days",
  },

  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks",
  },

  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks",
  },

  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months",
  },

  xMonths: {
    one: "1 month",
    other: "{{count}} months",
  },

  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years",
  },

  xYears: {
    one: "1 year",
    other: "{{count}} years",
  },

  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years",
  },

  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years",
  },
};

const formatDistance = (token, count, options) => {
  let result;

  const tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }

  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result;
    } else {
      return result + " ago";
    }
  }

  return result;
};
exports.formatDistance = formatDistance;


/***/ }),

/***/ "./node_modules/date-fns/locale/en-US/_lib/formatLong.cjs":
/*!****************************************************************!*\
  !*** ./node_modules/date-fns/locale/en-US/_lib/formatLong.cjs ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.formatLong = void 0;
var _index = __webpack_require__(/*! ../../_lib/buildFormatLongFn.cjs */ "./node_modules/date-fns/locale/_lib/buildFormatLongFn.cjs");

const dateFormats = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy",
};

const timeFormats = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a",
};

const dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}",
};

const formatLong = (exports.formatLong = {
  date: (0, _index.buildFormatLongFn)({
    formats: dateFormats,
    defaultWidth: "full",
  }),

  time: (0, _index.buildFormatLongFn)({
    formats: timeFormats,
    defaultWidth: "full",
  }),

  dateTime: (0, _index.buildFormatLongFn)({
    formats: dateTimeFormats,
    defaultWidth: "full",
  }),
});


/***/ }),

/***/ "./node_modules/date-fns/locale/en-US/_lib/formatRelative.cjs":
/*!********************************************************************!*\
  !*** ./node_modules/date-fns/locale/en-US/_lib/formatRelative.cjs ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.formatRelative = void 0;

const formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P",
};

const formatRelative = (token, _date, _baseDate, _options) =>
  formatRelativeLocale[token];
exports.formatRelative = formatRelative;


/***/ }),

/***/ "./node_modules/date-fns/locale/en-US/_lib/localize.cjs":
/*!**************************************************************!*\
  !*** ./node_modules/date-fns/locale/en-US/_lib/localize.cjs ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.localize = void 0;
var _index = __webpack_require__(/*! ../../_lib/buildLocalizeFn.cjs */ "./node_modules/date-fns/locale/_lib/buildLocalizeFn.cjs");

const eraValues = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"],
};

const quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"],
};

// Note: in English, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.
const monthValues = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],

  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
};

const dayValues = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
};

const dayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night",
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night",
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night",
  },
};

const formattingDayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night",
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night",
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night",
  },
};

const ordinalNumber = (dirtyNumber, _options) => {
  const number = Number(dirtyNumber);

  // If ordinal numbers depend on context, for example,
  // if they are different for different grammatical genders,
  // use `options.unit`.
  //
  // `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
  // 'day', 'hour', 'minute', 'second'.

  const rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
    }
  }
  return number + "th";
};

const localize = (exports.localize = {
  ordinalNumber,

  era: (0, _index.buildLocalizeFn)({
    values: eraValues,
    defaultWidth: "wide",
  }),

  quarter: (0, _index.buildLocalizeFn)({
    values: quarterValues,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1,
  }),

  month: (0, _index.buildLocalizeFn)({
    values: monthValues,
    defaultWidth: "wide",
  }),

  day: (0, _index.buildLocalizeFn)({
    values: dayValues,
    defaultWidth: "wide",
  }),

  dayPeriod: (0, _index.buildLocalizeFn)({
    values: dayPeriodValues,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: "wide",
  }),
});


/***/ }),

/***/ "./node_modules/date-fns/locale/en-US/_lib/match.cjs":
/*!***********************************************************!*\
  !*** ./node_modules/date-fns/locale/en-US/_lib/match.cjs ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.match = void 0;

var _index = __webpack_require__(/*! ../../_lib/buildMatchFn.cjs */ "./node_modules/date-fns/locale/_lib/buildMatchFn.cjs");
var _index2 = __webpack_require__(/*! ../../_lib/buildMatchPatternFn.cjs */ "./node_modules/date-fns/locale/_lib/buildMatchPatternFn.cjs");

const matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
const parseOrdinalNumberPattern = /\d+/i;

const matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i,
};
const parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i],
};

const matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i,
};
const parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i],
};

const matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
};
const parseMonthPatterns = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i,
  ],

  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i,
  ],
};

const matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
};
const parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
};

const matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
};
const parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i,
  },
};

const match = (exports.match = {
  ordinalNumber: (0, _index2.buildMatchPatternFn)({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: (value) => parseInt(value, 10),
  }),

  era: (0, _index.buildMatchFn)({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any",
  }),

  quarter: (0, _index.buildMatchFn)({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1,
  }),

  month: (0, _index.buildMatchFn)({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any",
  }),

  day: (0, _index.buildMatchFn)({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any",
  }),

  dayPeriod: (0, _index.buildMatchFn)({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any",
  }),
});


/***/ }),

/***/ "./node_modules/date-fns/max.cjs":
/*!***************************************!*\
  !*** ./node_modules/date-fns/max.cjs ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.max = max;
var _index = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
var _index2 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link max} function options.
 */

/**
 * @name max
 * @category Common Helpers
 * @summary Return the latest of the given dates.
 *
 * @description
 * Return the latest of the given dates.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param dates - The dates to compare
 *
 * @returns The latest of the dates
 *
 * @example
 * // Which of these dates is the latest?
 * const result = max([
 *   new Date(1989, 6, 10),
 *   new Date(1987, 1, 11),
 *   new Date(1995, 6, 2),
 *   new Date(1990, 0, 1)
 * ])
 * //=> Sun Jul 02 1995 00:00:00
 */
function max(dates, options) {
  let result;
  let context = options?.in;

  dates.forEach((date) => {
    // Use the first date object as the context function
    if (!context && typeof date === "object")
      context = _index.constructFrom.bind(null, date);

    const date_ = (0, _index2.toDate)(date, context);
    if (!result || result < date_ || isNaN(+date_)) result = date_;
  });

  return (0, _index.constructFrom)(context, result || NaN);
}


/***/ }),

/***/ "./node_modules/date-fns/milliseconds.cjs":
/*!************************************************!*\
  !*** ./node_modules/date-fns/milliseconds.cjs ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.milliseconds = milliseconds;
var _index = __webpack_require__(/*! ./constants.cjs */ "./node_modules/date-fns/constants.cjs");

/**
 * @name milliseconds
 * @category Millisecond Helpers
 * @summary
 * Returns the number of milliseconds in the specified, years, months, weeks, days, hours, minutes and seconds.
 *
 * @description
 * Returns the number of milliseconds in the specified, years, months, weeks, days, hours, minutes and seconds.
 *
 * One years equals 365.2425 days according to the formula:
 *
 * > Leap year occurs every 4 years, except for years that are divisible by 100 and not divisible by 400.
 * > 1 mean year = (365+1/4-1/100+1/400) days = 365.2425 days
 *
 * One month is a year divided by 12.
 *
 * @param duration - The object with years, months, weeks, days, hours, minutes and seconds to be added.
 *
 * @returns The milliseconds
 *
 * @example
 * // 1 year in milliseconds
 * milliseconds({ years: 1 })
 * //=> 31556952000
 *
 * // 3 months in milliseconds
 * milliseconds({ months: 3 })
 * //=> 7889238000
 */
function milliseconds({ years, months, weeks, days, hours, minutes, seconds }) {
  let totalDays = 0;

  if (years) totalDays += years * _index.daysInYear;
  if (months) totalDays += months * (_index.daysInYear / 12);
  if (weeks) totalDays += weeks * 7;
  if (days) totalDays += days;

  let totalSeconds = totalDays * 24 * 60 * 60;

  if (hours) totalSeconds += hours * 60 * 60;
  if (minutes) totalSeconds += minutes * 60;
  if (seconds) totalSeconds += seconds;

  return Math.trunc(totalSeconds * 1000);
}


/***/ }),

/***/ "./node_modules/date-fns/millisecondsToHours.cjs":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/millisecondsToHours.cjs ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.millisecondsToHours = millisecondsToHours;
var _index = __webpack_require__(/*! ./constants.cjs */ "./node_modules/date-fns/constants.cjs");

/**
 * @name millisecondsToHours
 * @category Conversion Helpers
 * @summary Convert milliseconds to hours.
 *
 * @description
 * Convert a number of milliseconds to a full number of hours.
 *
 * @param milliseconds - The number of milliseconds to be converted
 *
 * @returns The number of milliseconds converted in hours
 *
 * @example
 * // Convert 7200000 milliseconds to hours:
 * const result = millisecondsToHours(7200000)
 * //=> 2
 *
 * @example
 * // It uses floor rounding:
 * const result = millisecondsToHours(7199999)
 * //=> 1
 */
function millisecondsToHours(milliseconds) {
  const hours = milliseconds / _index.millisecondsInHour;
  return Math.trunc(hours);
}


/***/ }),

/***/ "./node_modules/date-fns/millisecondsToMinutes.cjs":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/millisecondsToMinutes.cjs ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.millisecondsToMinutes = millisecondsToMinutes;
var _index = __webpack_require__(/*! ./constants.cjs */ "./node_modules/date-fns/constants.cjs");

/**
 * @name millisecondsToMinutes
 * @category Conversion Helpers
 * @summary Convert milliseconds to minutes.
 *
 * @description
 * Convert a number of milliseconds to a full number of minutes.
 *
 * @param milliseconds - The number of milliseconds to be converted
 *
 * @returns The number of milliseconds converted in minutes
 *
 * @example
 * // Convert 60000 milliseconds to minutes:
 * const result = millisecondsToMinutes(60000)
 * //=> 1
 *
 * @example
 * // It uses floor rounding:
 * const result = millisecondsToMinutes(119999)
 * //=> 1
 */
function millisecondsToMinutes(milliseconds) {
  const minutes = milliseconds / _index.millisecondsInMinute;
  return Math.trunc(minutes);
}


/***/ }),

/***/ "./node_modules/date-fns/millisecondsToSeconds.cjs":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/millisecondsToSeconds.cjs ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.millisecondsToSeconds = millisecondsToSeconds;
var _index = __webpack_require__(/*! ./constants.cjs */ "./node_modules/date-fns/constants.cjs");

/**
 * @name millisecondsToSeconds
 * @category Conversion Helpers
 * @summary Convert milliseconds to seconds.
 *
 * @description
 * Convert a number of milliseconds to a full number of seconds.
 *
 * @param milliseconds - The number of milliseconds to be converted
 *
 * @returns The number of milliseconds converted in seconds
 *
 * @example
 * // Convert 1000 milliseconds to seconds:
 * const result = millisecondsToSeconds(1000)
 * //=> 1
 *
 * @example
 * // It uses floor rounding:
 * const result = millisecondsToSeconds(1999)
 * //=> 1
 */
function millisecondsToSeconds(milliseconds) {
  const seconds = milliseconds / _index.millisecondsInSecond;
  return Math.trunc(seconds);
}


/***/ }),

/***/ "./node_modules/date-fns/min.cjs":
/*!***************************************!*\
  !*** ./node_modules/date-fns/min.cjs ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.min = min;
var _index = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
var _index2 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link min} function options.
 */

/**
 * @name min
 * @category Common Helpers
 * @summary Returns the earliest of the given dates.
 *
 * @description
 * Returns the earliest of the given dates.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param dates - The dates to compare
 *
 * @returns The earliest of the dates
 *
 * @example
 * // Which of these dates is the earliest?
 * const result = min([
 *   new Date(1989, 6, 10),
 *   new Date(1987, 1, 11),
 *   new Date(1995, 6, 2),
 *   new Date(1990, 0, 1)
 * ])
 * //=> Wed Feb 11 1987 00:00:00
 */
function min(dates, options) {
  let result;
  let context = options?.in;

  dates.forEach((date) => {
    // Use the first date object as the context function
    if (!context && typeof date === "object")
      context = _index.constructFrom.bind(null, date);

    const date_ = (0, _index2.toDate)(date, context);
    if (!result || result > date_ || isNaN(+date_)) result = date_;
  });

  return (0, _index.constructFrom)(context, result || NaN);
}


/***/ }),

/***/ "./node_modules/date-fns/minutesToHours.cjs":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/minutesToHours.cjs ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.minutesToHours = minutesToHours;
var _index = __webpack_require__(/*! ./constants.cjs */ "./node_modules/date-fns/constants.cjs");

/**
 * @name minutesToHours
 * @category Conversion Helpers
 * @summary Convert minutes to hours.
 *
 * @description
 * Convert a number of minutes to a full number of hours.
 *
 * @param minutes - The number of minutes to be converted
 *
 * @returns The number of minutes converted in hours
 *
 * @example
 * // Convert 140 minutes to hours:
 * const result = minutesToHours(120)
 * //=> 2
 *
 * @example
 * // It uses floor rounding:
 * const result = minutesToHours(179)
 * //=> 2
 */
function minutesToHours(minutes) {
  const hours = minutes / _index.minutesInHour;
  return Math.trunc(hours);
}


/***/ }),

/***/ "./node_modules/date-fns/minutesToMilliseconds.cjs":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/minutesToMilliseconds.cjs ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.minutesToMilliseconds = minutesToMilliseconds;
var _index = __webpack_require__(/*! ./constants.cjs */ "./node_modules/date-fns/constants.cjs");

/**
 * @name minutesToMilliseconds
 * @category Conversion Helpers
 * @summary Convert minutes to milliseconds.
 *
 * @description
 * Convert a number of minutes to a full number of milliseconds.
 *
 * @param minutes - The number of minutes to be converted
 *
 * @returns The number of minutes converted in milliseconds
 *
 * @example
 * // Convert 2 minutes to milliseconds
 * const result = minutesToMilliseconds(2)
 * //=> 120000
 */
function minutesToMilliseconds(minutes) {
  return Math.trunc(minutes * _index.millisecondsInMinute);
}


/***/ }),

/***/ "./node_modules/date-fns/minutesToSeconds.cjs":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/minutesToSeconds.cjs ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.minutesToSeconds = minutesToSeconds;
var _index = __webpack_require__(/*! ./constants.cjs */ "./node_modules/date-fns/constants.cjs");

/**
 * @name minutesToSeconds
 * @category Conversion Helpers
 * @summary Convert minutes to seconds.
 *
 * @description
 * Convert a number of minutes to a full number of seconds.
 *
 * @param minutes - The number of minutes to be converted
 *
 * @returns The number of minutes converted in seconds
 *
 * @example
 * // Convert 2 minutes to seconds
 * const result = minutesToSeconds(2)
 * //=> 120
 */
function minutesToSeconds(minutes) {
  return Math.trunc(minutes * _index.secondsInMinute);
}


/***/ }),

/***/ "./node_modules/date-fns/monthsToQuarters.cjs":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/monthsToQuarters.cjs ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.monthsToQuarters = monthsToQuarters;
var _index = __webpack_require__(/*! ./constants.cjs */ "./node_modules/date-fns/constants.cjs");

/**
 * @name monthsToQuarters
 * @category Conversion Helpers
 * @summary Convert number of months to quarters.
 *
 * @description
 * Convert a number of months to a full number of quarters.
 *
 * @param months - The number of months to be converted.
 *
 * @returns The number of months converted in quarters
 *
 * @example
 * // Convert 6 months to quarters:
 * const result = monthsToQuarters(6)
 * //=> 2
 *
 * @example
 * // It uses floor rounding:
 * const result = monthsToQuarters(7)
 * //=> 2
 */
function monthsToQuarters(months) {
  const quarters = months / _index.monthsInQuarter;
  return Math.trunc(quarters);
}


/***/ }),

/***/ "./node_modules/date-fns/monthsToYears.cjs":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/monthsToYears.cjs ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.monthsToYears = monthsToYears;
var _index = __webpack_require__(/*! ./constants.cjs */ "./node_modules/date-fns/constants.cjs");

/**
 * @name monthsToYears
 * @category Conversion Helpers
 * @summary Convert number of months to years.
 *
 * @description
 * Convert a number of months to a full number of years.
 *
 * @param months - The number of months to be converted
 *
 * @returns The number of months converted in years
 *
 * @example
 * // Convert 36 months to years:
 * const result = monthsToYears(36)
 * //=> 3
 *
 * // It uses floor rounding:
 * const result = monthsToYears(40)
 * //=> 3
 */
function monthsToYears(months) {
  const years = months / _index.monthsInYear;
  return Math.trunc(years);
}


/***/ }),

/***/ "./node_modules/date-fns/nextDay.cjs":
/*!*******************************************!*\
  !*** ./node_modules/date-fns/nextDay.cjs ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.nextDay = nextDay;
var _index = __webpack_require__(/*! ./addDays.cjs */ "./node_modules/date-fns/addDays.cjs");
var _index2 = __webpack_require__(/*! ./getDay.cjs */ "./node_modules/date-fns/getDay.cjs");

/**
 * The {@link nextDay} function options.
 */

/**
 * @name nextDay
 * @category Weekday Helpers
 * @summary When is the next day of the week? 0-6 the day of the week, 0 represents Sunday.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to check
 * @param day - Day of the week
 * @param options - An object with options
 *
 * @returns The date is the next day of the week
 *
 * @example
 * // When is the next Monday after Mar, 20, 2020?
 * const result = nextDay(new Date(2020, 2, 20), 1)
 * //=> Mon Mar 23 2020 00:00:00
 *
 * @example
 * // When is the next Tuesday after Mar, 21, 2020?
 * const result = nextDay(new Date(2020, 2, 21), 2)
 * //=> Tue Mar 24 2020 00:00:00
 */
function nextDay(date, day, options) {
  let delta = day - (0, _index2.getDay)(date, options);
  if (delta <= 0) delta += 7;

  return (0, _index.addDays)(date, delta, options);
}


/***/ }),

/***/ "./node_modules/date-fns/nextFriday.cjs":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/nextFriday.cjs ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.nextFriday = nextFriday;
var _index = __webpack_require__(/*! ./nextDay.cjs */ "./node_modules/date-fns/nextDay.cjs");

/**
 * The {@link nextFriday} function options.
 */

/**
 * @name nextFriday
 * @category Weekday Helpers
 * @summary When is the next Friday?
 *
 * @description
 * When is the next Friday?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to start counting from
 * @param options - An object with options
 *
 * @returns The next Friday
 *
 * @example
 * // When is the next Friday after Mar, 22, 2020?
 * const result = nextFriday(new Date(2020, 2, 22))
 * //=> Fri Mar 27 2020 00:00:00
 */
function nextFriday(date, options) {
  return (0, _index.nextDay)(date, 5, options);
}


/***/ }),

/***/ "./node_modules/date-fns/nextMonday.cjs":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/nextMonday.cjs ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.nextMonday = nextMonday;
var _index = __webpack_require__(/*! ./nextDay.cjs */ "./node_modules/date-fns/nextDay.cjs");

/**
 * The {@link nextMonday} function options.
 */

/**
 * @name nextMonday
 * @category Weekday Helpers
 * @summary When is the next Monday?
 *
 * @description
 * When is the next Monday?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, returned from the context function if passed, or inferred from the arguments.
 *
 * @param date - The date to start counting from
 * @param options - An object with options
 *
 * @returns The next Monday
 *
 * @example
 * // When is the next Monday after Mar, 22, 2020?
 * const result = nextMonday(new Date(2020, 2, 22))
 * //=> Mon Mar 23 2020 00:00:00
 */
function nextMonday(date, options) {
  return (0, _index.nextDay)(date, 1, options);
}


/***/ }),

/***/ "./node_modules/date-fns/nextSaturday.cjs":
/*!************************************************!*\
  !*** ./node_modules/date-fns/nextSaturday.cjs ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.nextSaturday = nextSaturday;
var _index = __webpack_require__(/*! ./nextDay.cjs */ "./node_modules/date-fns/nextDay.cjs");

/**
 * The {@link nextSaturday} function options.
 */

/**
 * @name nextSaturday
 * @category Weekday Helpers
 * @summary When is the next Saturday?
 *
 * @description
 * When is the next Saturday?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to start counting from
 * @param options - An object with options
 *
 * @returns The next Saturday
 *
 * @example
 * // When is the next Saturday after Mar, 22, 2020?
 * const result = nextSaturday(new Date(2020, 2, 22))
 * //=> Sat Mar 28 2020 00:00:00
 */
function nextSaturday(date, options) {
  return (0, _index.nextDay)(date, 6, options);
}


/***/ }),

/***/ "./node_modules/date-fns/nextSunday.cjs":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/nextSunday.cjs ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.nextSunday = nextSunday;
var _index = __webpack_require__(/*! ./nextDay.cjs */ "./node_modules/date-fns/nextDay.cjs");

/**
 * The {@link nextSunday} function options.
 */

/**
 * @name nextSunday
 * @category Weekday Helpers
 * @summary When is the next Sunday?
 *
 * @description
 * When is the next Sunday?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned if a context is provided.
 *
 * @param date - The date to start counting from
 * @param options - An object with options
 *
 * @returns The next Sunday
 *
 * @example
 * // When is the next Sunday after March 22, 2020?
 * const result = nextSunday(new Date(2020, 2, 22))
 * //=> Sun Mar 29 2020 00:00:00
 */
function nextSunday(date, options) {
  return (0, _index.nextDay)(date, 0, options);
}


/***/ }),

/***/ "./node_modules/date-fns/nextThursday.cjs":
/*!************************************************!*\
  !*** ./node_modules/date-fns/nextThursday.cjs ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.nextThursday = nextThursday;
var _index = __webpack_require__(/*! ./nextDay.cjs */ "./node_modules/date-fns/nextDay.cjs");

/**
 * The {@link nextThursday} function options.
 */

/**
 * @name nextThursday
 * @category Weekday Helpers
 * @summary When is the next Thursday?
 *
 * @description
 * When is the next Thursday?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to start counting from
 * @param options - An object with options
 *
 * @returns The next Thursday
 *
 * @example
 * // When is the next Thursday after Mar, 22, 2020?
 * const result = nextThursday(new Date(2020, 2, 22))
 * //=> Thur Mar 26 2020 00:00:00
 */
function nextThursday(date, options) {
  return (0, _index.nextDay)(date, 4, options);
}


/***/ }),

/***/ "./node_modules/date-fns/nextTuesday.cjs":
/*!***********************************************!*\
  !*** ./node_modules/date-fns/nextTuesday.cjs ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.nextTuesday = nextTuesday;
var _index = __webpack_require__(/*! ./nextDay.cjs */ "./node_modules/date-fns/nextDay.cjs");

/**
 * The {@link nextTuesday} function options.
 */

/**
 * @name nextTuesday
 * @category Weekday Helpers
 * @summary When is the next Tuesday?
 *
 * @description
 * When is the next Tuesday?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to start counting from
 * @param options - An object with options
 *
 * @returns The next Tuesday
 *
 * @example
 * // When is the next Tuesday after Mar, 22, 2020?
 * const result = nextTuesday(new Date(2020, 2, 22))
 * //=> Tue Mar 24 2020 00:00:00
 */
function nextTuesday(date, options) {
  return (0, _index.nextDay)(date, 2, options);
}


/***/ }),

/***/ "./node_modules/date-fns/nextWednesday.cjs":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/nextWednesday.cjs ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.nextWednesday = nextWednesday;
var _index = __webpack_require__(/*! ./nextDay.cjs */ "./node_modules/date-fns/nextDay.cjs");

/**
 * The {@link nextWednesday} function options.
 */

/**
 * @name nextWednesday
 * @category Weekday Helpers
 * @summary When is the next Wednesday?
 *
 * @description
 * When is the next Wednesday?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to start counting from
 * @param options - An object with options
 *
 * @returns The next Wednesday
 *
 * @example
 * // When is the next Wednesday after Mar, 22, 2020?
 * const result = nextWednesday(new Date(2020, 2, 22))
 * //=> Wed Mar 25 2020 00:00:00
 */
function nextWednesday(date, options) {
  return (0, _index.nextDay)(date, 3, options);
}


/***/ }),

/***/ "./node_modules/date-fns/parse.cjs":
/*!*****************************************!*\
  !*** ./node_modules/date-fns/parse.cjs ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "longFormatters", ({
  enumerable: true,
  get: function () {
    return _index2.longFormatters;
  },
}));
exports.parse = parse;
Object.defineProperty(exports, "parsers", ({
  enumerable: true,
  get: function () {
    return _index7.parsers;
  },
}));
var _index = __webpack_require__(/*! ./_lib/defaultLocale.cjs */ "./node_modules/date-fns/_lib/defaultLocale.cjs");
var _index2 = __webpack_require__(/*! ./_lib/format/longFormatters.cjs */ "./node_modules/date-fns/_lib/format/longFormatters.cjs");
var _index3 = __webpack_require__(/*! ./_lib/protectedTokens.cjs */ "./node_modules/date-fns/_lib/protectedTokens.cjs");

var _index4 = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
var _index5 = __webpack_require__(/*! ./getDefaultOptions.cjs */ "./node_modules/date-fns/getDefaultOptions.cjs");
var _index6 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

var _Setter = __webpack_require__(/*! ./parse/_lib/Setter.cjs */ "./node_modules/date-fns/parse/_lib/Setter.cjs");
var _index7 = __webpack_require__(/*! ./parse/_lib/parsers.cjs */ "./node_modules/date-fns/parse/_lib/parsers.cjs");

// Rexports of internal for libraries to use.
// See: https://github.com/date-fns/date-fns/issues/3638#issuecomment-1877082874

/**
 * The {@link parse} function options.
 */

// This RegExp consists of three parts separated by `|`:
// - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
//   (one of the certain letters followed by `o`)
// - (\w)\1* matches any sequences of the same letter
// - '' matches two quote characters in a row
// - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
//   except a single quote symbol, which ends the sequence.
//   Two quote characters do not end the sequence.
//   If there is no matching single quote
//   then the sequence will continue until the end of the string.
// - . matches any single character unmatched by previous parts of the RegExps
const formattingTokensRegExp =
  /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;

// This RegExp catches symbols escaped by quotes, and also
// sequences of symbols P, p, and the combinations like `PPPPPPPppppp`
const longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;

const escapedStringRegExp = /^'([^]*?)'?$/;
const doubleQuoteRegExp = /''/g;

const notWhitespaceRegExp = /\S/;
const unescapedLatinCharacterRegExp = /[a-zA-Z]/;

/**
 * @name parse
 * @category Common Helpers
 * @summary Parse the date.
 *
 * @description
 * Return the date parsed from string using the given format string.
 *
 * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
 * > See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * The characters in the format string wrapped between two single quotes characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
 *
 * Format of the format string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * with a few additions (see note 5 below the table).
 *
 * Not all tokens are compatible. Combinations that don't make sense or could lead to bugs are prohibited
 * and will throw `RangeError`. For example usage of 24-hour format token with AM/PM token will throw an exception:
 *
 * ```javascript
 * parse('23 AM', 'HH a', new Date())
 * //=> RangeError: The format string mustn't contain `HH` and `a` at the same time
 * ```
 *
 * See the compatibility table: https://docs.google.com/spreadsheets/d/e/2PACX-1vQOPU3xUhplll6dyoMmVUXHKl_8CRDs6_ueLmex3SoqwhuolkuN3O05l4rqx5h1dKX8eb46Ul-CCSrq/pubhtml?gid=0&single=true
 *
 * Accepted format string patterns:
 * | Unit                            |Prior| Pattern | Result examples                   | Notes |
 * |---------------------------------|-----|---------|-----------------------------------|-------|
 * | Era                             | 140 | G..GGG  | AD, BC                            |       |
 * |                                 |     | GGGG    | Anno Domini, Before Christ        | 2     |
 * |                                 |     | GGGGG   | A, B                              |       |
 * | Calendar year                   | 130 | y       | 44, 1, 1900, 2017, 9999           | 4     |
 * |                                 |     | yo      | 44th, 1st, 1900th, 9999999th      | 4,5   |
 * |                                 |     | yy      | 44, 01, 00, 17                    | 4     |
 * |                                 |     | yyy     | 044, 001, 123, 999                | 4     |
 * |                                 |     | yyyy    | 0044, 0001, 1900, 2017            | 4     |
 * |                                 |     | yyyyy   | ...                               | 2,4   |
 * | Local week-numbering year       | 130 | Y       | 44, 1, 1900, 2017, 9000           | 4     |
 * |                                 |     | Yo      | 44th, 1st, 1900th, 9999999th      | 4,5   |
 * |                                 |     | YY      | 44, 01, 00, 17                    | 4,6   |
 * |                                 |     | YYY     | 044, 001, 123, 999                | 4     |
 * |                                 |     | YYYY    | 0044, 0001, 1900, 2017            | 4,6   |
 * |                                 |     | YYYYY   | ...                               | 2,4   |
 * | ISO week-numbering year         | 130 | R       | -43, 1, 1900, 2017, 9999, -9999   | 4,5   |
 * |                                 |     | RR      | -43, 01, 00, 17                   | 4,5   |
 * |                                 |     | RRR     | -043, 001, 123, 999, -999         | 4,5   |
 * |                                 |     | RRRR    | -0043, 0001, 2017, 9999, -9999    | 4,5   |
 * |                                 |     | RRRRR   | ...                               | 2,4,5 |
 * | Extended year                   | 130 | u       | -43, 1, 1900, 2017, 9999, -999    | 4     |
 * |                                 |     | uu      | -43, 01, 99, -99                  | 4     |
 * |                                 |     | uuu     | -043, 001, 123, 999, -999         | 4     |
 * |                                 |     | uuuu    | -0043, 0001, 2017, 9999, -9999    | 4     |
 * |                                 |     | uuuuu   | ...                               | 2,4   |
 * | Quarter (formatting)            | 120 | Q       | 1, 2, 3, 4                        |       |
 * |                                 |     | Qo      | 1st, 2nd, 3rd, 4th                | 5     |
 * |                                 |     | QQ      | 01, 02, 03, 04                    |       |
 * |                                 |     | QQQ     | Q1, Q2, Q3, Q4                    |       |
 * |                                 |     | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 |     | QQQQQ   | 1, 2, 3, 4                        | 4     |
 * | Quarter (stand-alone)           | 120 | q       | 1, 2, 3, 4                        |       |
 * |                                 |     | qo      | 1st, 2nd, 3rd, 4th                | 5     |
 * |                                 |     | qq      | 01, 02, 03, 04                    |       |
 * |                                 |     | qqq     | Q1, Q2, Q3, Q4                    |       |
 * |                                 |     | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 |     | qqqqq   | 1, 2, 3, 4                        | 3     |
 * | Month (formatting)              | 110 | M       | 1, 2, ..., 12                     |       |
 * |                                 |     | Mo      | 1st, 2nd, ..., 12th               | 5     |
 * |                                 |     | MM      | 01, 02, ..., 12                   |       |
 * |                                 |     | MMM     | Jan, Feb, ..., Dec                |       |
 * |                                 |     | MMMM    | January, February, ..., December  | 2     |
 * |                                 |     | MMMMM   | J, F, ..., D                      |       |
 * | Month (stand-alone)             | 110 | L       | 1, 2, ..., 12                     |       |
 * |                                 |     | Lo      | 1st, 2nd, ..., 12th               | 5     |
 * |                                 |     | LL      | 01, 02, ..., 12                   |       |
 * |                                 |     | LLL     | Jan, Feb, ..., Dec                |       |
 * |                                 |     | LLLL    | January, February, ..., December  | 2     |
 * |                                 |     | LLLLL   | J, F, ..., D                      |       |
 * | Local week of year              | 100 | w       | 1, 2, ..., 53                     |       |
 * |                                 |     | wo      | 1st, 2nd, ..., 53th               | 5     |
 * |                                 |     | ww      | 01, 02, ..., 53                   |       |
 * | ISO week of year                | 100 | I       | 1, 2, ..., 53                     | 5     |
 * |                                 |     | Io      | 1st, 2nd, ..., 53th               | 5     |
 * |                                 |     | II      | 01, 02, ..., 53                   | 5     |
 * | Day of month                    |  90 | d       | 1, 2, ..., 31                     |       |
 * |                                 |     | do      | 1st, 2nd, ..., 31st               | 5     |
 * |                                 |     | dd      | 01, 02, ..., 31                   |       |
 * | Day of year                     |  90 | D       | 1, 2, ..., 365, 366               | 7     |
 * |                                 |     | Do      | 1st, 2nd, ..., 365th, 366th       | 5     |
 * |                                 |     | DD      | 01, 02, ..., 365, 366             | 7     |
 * |                                 |     | DDD     | 001, 002, ..., 365, 366           |       |
 * |                                 |     | DDDD    | ...                               | 2     |
 * | Day of week (formatting)        |  90 | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 |     | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 |     | EEEEE   | M, T, W, T, F, S, S               |       |
 * |                                 |     | EEEEEE  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | ISO day of week (formatting)    |  90 | i       | 1, 2, 3, ..., 7                   | 5     |
 * |                                 |     | io      | 1st, 2nd, ..., 7th                | 5     |
 * |                                 |     | ii      | 01, 02, ..., 07                   | 5     |
 * |                                 |     | iii     | Mon, Tue, Wed, ..., Sun           | 5     |
 * |                                 |     | iiii    | Monday, Tuesday, ..., Sunday      | 2,5   |
 * |                                 |     | iiiii   | M, T, W, T, F, S, S               | 5     |
 * |                                 |     | iiiiii  | Mo, Tu, We, Th, Fr, Sa, Su        | 5     |
 * | Local day of week (formatting)  |  90 | e       | 2, 3, 4, ..., 1                   |       |
 * |                                 |     | eo      | 2nd, 3rd, ..., 1st                | 5     |
 * |                                 |     | ee      | 02, 03, ..., 01                   |       |
 * |                                 |     | eee     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 |     | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 |     | eeeee   | M, T, W, T, F, S, S               |       |
 * |                                 |     | eeeeee  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | Local day of week (stand-alone) |  90 | c       | 2, 3, 4, ..., 1                   |       |
 * |                                 |     | co      | 2nd, 3rd, ..., 1st                | 5     |
 * |                                 |     | cc      | 02, 03, ..., 01                   |       |
 * |                                 |     | ccc     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 |     | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 |     | ccccc   | M, T, W, T, F, S, S               |       |
 * |                                 |     | cccccc  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | AM, PM                          |  80 | a..aaa  | AM, PM                            |       |
 * |                                 |     | aaaa    | a.m., p.m.                        | 2     |
 * |                                 |     | aaaaa   | a, p                              |       |
 * | AM, PM, noon, midnight          |  80 | b..bbb  | AM, PM, noon, midnight            |       |
 * |                                 |     | bbbb    | a.m., p.m., noon, midnight        | 2     |
 * |                                 |     | bbbbb   | a, p, n, mi                       |       |
 * | Flexible day period             |  80 | B..BBB  | at night, in the morning, ...     |       |
 * |                                 |     | BBBB    | at night, in the morning, ...     | 2     |
 * |                                 |     | BBBBB   | at night, in the morning, ...     |       |
 * | Hour [1-12]                     |  70 | h       | 1, 2, ..., 11, 12                 |       |
 * |                                 |     | ho      | 1st, 2nd, ..., 11th, 12th         | 5     |
 * |                                 |     | hh      | 01, 02, ..., 11, 12               |       |
 * | Hour [0-23]                     |  70 | H       | 0, 1, 2, ..., 23                  |       |
 * |                                 |     | Ho      | 0th, 1st, 2nd, ..., 23rd          | 5     |
 * |                                 |     | HH      | 00, 01, 02, ..., 23               |       |
 * | Hour [0-11]                     |  70 | K       | 1, 2, ..., 11, 0                  |       |
 * |                                 |     | Ko      | 1st, 2nd, ..., 11th, 0th          | 5     |
 * |                                 |     | KK      | 01, 02, ..., 11, 00               |       |
 * | Hour [1-24]                     |  70 | k       | 24, 1, 2, ..., 23                 |       |
 * |                                 |     | ko      | 24th, 1st, 2nd, ..., 23rd         | 5     |
 * |                                 |     | kk      | 24, 01, 02, ..., 23               |       |
 * | Minute                          |  60 | m       | 0, 1, ..., 59                     |       |
 * |                                 |     | mo      | 0th, 1st, ..., 59th               | 5     |
 * |                                 |     | mm      | 00, 01, ..., 59                   |       |
 * | Second                          |  50 | s       | 0, 1, ..., 59                     |       |
 * |                                 |     | so      | 0th, 1st, ..., 59th               | 5     |
 * |                                 |     | ss      | 00, 01, ..., 59                   |       |
 * | Seconds timestamp               |  40 | t       | 512969520                         |       |
 * |                                 |     | tt      | ...                               | 2     |
 * | Fraction of second              |  30 | S       | 0, 1, ..., 9                      |       |
 * |                                 |     | SS      | 00, 01, ..., 99                   |       |
 * |                                 |     | SSS     | 000, 001, ..., 999                |       |
 * |                                 |     | SSSS    | ...                               | 2     |
 * | Milliseconds timestamp          |  20 | T       | 512969520900                      |       |
 * |                                 |     | TT      | ...                               | 2     |
 * | Timezone (ISO-8601 w/ Z)        |  10 | X       | -08, +0530, Z                     |       |
 * |                                 |     | XX      | -0800, +0530, Z                   |       |
 * |                                 |     | XXX     | -08:00, +05:30, Z                 |       |
 * |                                 |     | XXXX    | -0800, +0530, Z, +123456          | 2     |
 * |                                 |     | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
 * | Timezone (ISO-8601 w/o Z)       |  10 | x       | -08, +0530, +00                   |       |
 * |                                 |     | xx      | -0800, +0530, +0000               |       |
 * |                                 |     | xxx     | -08:00, +05:30, +00:00            | 2     |
 * |                                 |     | xxxx    | -0800, +0530, +0000, +123456      |       |
 * |                                 |     | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
 * | Long localized date             |  NA | P       | 05/29/1453                        | 5,8   |
 * |                                 |     | PP      | May 29, 1453                      |       |
 * |                                 |     | PPP     | May 29th, 1453                    |       |
 * |                                 |     | PPPP    | Sunday, May 29th, 1453            | 2,5,8 |
 * | Long localized time             |  NA | p       | 12:00 AM                          | 5,8   |
 * |                                 |     | pp      | 12:00:00 AM                       |       |
 * | Combination of date and time    |  NA | Pp      | 05/29/1453, 12:00 AM              |       |
 * |                                 |     | PPpp    | May 29, 1453, 12:00:00 AM         |       |
 * |                                 |     | PPPpp   | May 29th, 1453 at ...             |       |
 * |                                 |     | PPPPpp  | Sunday, May 29th, 1453 at ...     | 2,5,8 |
 * Notes:
 * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
 *    are the same as "stand-alone" units, but are different in some languages.
 *    "Formatting" units are declined according to the rules of the language
 *    in the context of a date. "Stand-alone" units are always nominative singular.
 *    In `format` function, they will produce different result:
 *
 *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
 *
 *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
 *
 *    `parse` will try to match both formatting and stand-alone units interchangeably.
 *
 * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
 *    the single quote characters (see below).
 *    If the sequence is longer than listed in table:
 *    - for numerical units (`yyyyyyyy`) `parse` will try to match a number
 *      as wide as the sequence
 *    - for text units (`MMMMMMMM`) `parse` will try to match the widest variation of the unit.
 *      These variations are marked with "2" in the last column of the table.
 *
 * 3. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
 *    These tokens represent the shortest form of the quarter.
 *
 * 4. The main difference between `y` and `u` patterns are B.C. years:
 *
 *    | Year | `y` | `u` |
 *    |------|-----|-----|
 *    | AC 1 |   1 |   1 |
 *    | BC 1 |   1 |   0 |
 *    | BC 2 |   2 |  -1 |
 *
 *    Also `yy` will try to guess the century of two digit year by proximity with `referenceDate`:
 *
 *    `parse('50', 'yy', new Date(2018, 0, 1)) //=> Sat Jan 01 2050 00:00:00`
 *
 *    `parse('75', 'yy', new Date(2018, 0, 1)) //=> Wed Jan 01 1975 00:00:00`
 *
 *    while `uu` will just assign the year as is:
 *
 *    `parse('50', 'uu', new Date(2018, 0, 1)) //=> Sat Jan 01 0050 00:00:00`
 *
 *    `parse('75', 'uu', new Date(2018, 0, 1)) //=> Tue Jan 01 0075 00:00:00`
 *
 *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
 *    except local week-numbering years are dependent on `options.weekStartsOn`
 *    and `options.firstWeekContainsDate` (compare [setISOWeekYear](https://date-fns.org/docs/setISOWeekYear)
 *    and [setWeekYear](https://date-fns.org/docs/setWeekYear)).
 *
 * 5. These patterns are not in the Unicode Technical Standard #35:
 *    - `i`: ISO day of week
 *    - `I`: ISO week of year
 *    - `R`: ISO week-numbering year
 *    - `o`: ordinal number modifier
 *    - `P`: long localized date
 *    - `p`: long localized time
 *
 * 6. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
 *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * 7. `D` and `DD` tokens represent days of the year but they are often confused with days of the month.
 *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * 8. `P+` tokens do not have a defined priority since they are merely aliases to other tokens based
 *    on the given locale.
 *
 *    using `en-US` locale: `P` => `MM/dd/yyyy`
 *    using `en-US` locale: `p` => `hh:mm a`
 *    using `pt-BR` locale: `P` => `dd/MM/yyyy`
 *    using `pt-BR` locale: `p` => `HH:mm`
 *
 * Values will be assigned to the date in the descending order of its unit's priority.
 * Units of an equal priority overwrite each other in the order of appearance.
 *
 * If no values of higher priority are parsed (e.g. when parsing string 'January 1st' without a year),
 * the values will be taken from 3rd argument `referenceDate` which works as a context of parsing.
 *
 * `referenceDate` must be passed for correct work of the function.
 * If you're not sure which `referenceDate` to supply, create a new instance of Date:
 * `parse('02/11/2014', 'MM/dd/yyyy', new Date())`
 * In this case parsing will be done in the context of the current date.
 * If `referenceDate` is `Invalid Date` or a value not convertible to valid `Date`,
 * then `Invalid Date` will be returned.
 *
 * The result may vary by locale.
 *
 * If `formatString` matches with `dateString` but does not provides tokens, `referenceDate` will be returned.
 *
 * If parsing failed, `Invalid Date` will be returned.
 * Invalid Date is a Date, whose time value is NaN.
 * Time value of Date: http://es5.github.io/#x15.9.1.1
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param dateStr - The string to parse
 * @param formatStr - The string of tokens
 * @param referenceDate - defines values missing from the parsed dateString
 * @param options - An object with options.
 *   see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *   see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * @returns The parsed date
 *
 * @throws `options.locale` must contain `match` property
 * @throws use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws format string contains an unescaped latin alphabet character
 *
 * @example
 * // Parse 11 February 2014 from middle-endian format:
 * var result = parse('02/11/2014', 'MM/dd/yyyy', new Date())
 * //=> Tue Feb 11 2014 00:00:00
 *
 * @example
 * // Parse 28th of February in Esperanto locale in the context of 2010 year:
 * import eo from 'date-fns/locale/eo'
 * var result = parse('28-a de februaro', "do 'de' MMMM", new Date(2010, 0, 1), {
 *   locale: eo
 * })
 * //=> Sun Feb 28 2010 00:00:00
 */
function parse(dateStr, formatStr, referenceDate, options) {
  const invalidDate = () =>
    (0, _index4.constructFrom)(options?.in || referenceDate, NaN);
  const defaultOptions = (0, _index5.getDefaultOptions)();
  const locale =
    options?.locale ?? defaultOptions.locale ?? _index.defaultLocale;

  const firstWeekContainsDate =
    options?.firstWeekContainsDate ??
    options?.locale?.options?.firstWeekContainsDate ??
    defaultOptions.firstWeekContainsDate ??
    defaultOptions.locale?.options?.firstWeekContainsDate ??
    1;

  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  if (!formatStr)
    return dateStr
      ? invalidDate()
      : (0, _index6.toDate)(referenceDate, options?.in);

  const subFnOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale,
  };

  // If timezone isn't specified, it will try to use the context or
  // the reference date and fallback to the system time zone.
  const setters = [new _Setter.DateTimezoneSetter(options?.in, referenceDate)];

  const tokens = formatStr
    .match(longFormattingTokensRegExp)
    .map((substring) => {
      const firstCharacter = substring[0];
      if (firstCharacter in _index2.longFormatters) {
        const longFormatter = _index2.longFormatters[firstCharacter];
        return longFormatter(substring, locale.formatLong);
      }
      return substring;
    })
    .join("")
    .match(formattingTokensRegExp);

  const usedTokens = [];

  for (let token of tokens) {
    if (
      !options?.useAdditionalWeekYearTokens &&
      (0, _index3.isProtectedWeekYearToken)(token)
    ) {
      (0, _index3.warnOrThrowProtectedError)(token, formatStr, dateStr);
    }
    if (
      !options?.useAdditionalDayOfYearTokens &&
      (0, _index3.isProtectedDayOfYearToken)(token)
    ) {
      (0, _index3.warnOrThrowProtectedError)(token, formatStr, dateStr);
    }

    const firstCharacter = token[0];
    const parser = _index7.parsers[firstCharacter];
    if (parser) {
      const { incompatibleTokens } = parser;
      if (Array.isArray(incompatibleTokens)) {
        const incompatibleToken = usedTokens.find(
          (usedToken) =>
            incompatibleTokens.includes(usedToken.token) ||
            usedToken.token === firstCharacter,
        );
        if (incompatibleToken) {
          throw new RangeError(
            `The format string mustn't contain \`${incompatibleToken.fullToken}\` and \`${token}\` at the same time`,
          );
        }
      } else if (parser.incompatibleTokens === "*" && usedTokens.length > 0) {
        throw new RangeError(
          `The format string mustn't contain \`${token}\` and any other token at the same time`,
        );
      }

      usedTokens.push({ token: firstCharacter, fullToken: token });

      const parseResult = parser.run(
        dateStr,
        token,
        locale.match,
        subFnOptions,
      );

      if (!parseResult) {
        return invalidDate();
      }

      setters.push(parseResult.setter);

      dateStr = parseResult.rest;
    } else {
      if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" +
            firstCharacter +
            "`",
        );
      }

      // Replace two single quote characters with one single quote character
      if (token === "''") {
        token = "'";
      } else if (firstCharacter === "'") {
        token = cleanEscapedString(token);
      }

      // Cut token from string, or, if string doesn't match the token, return Invalid Date
      if (dateStr.indexOf(token) === 0) {
        dateStr = dateStr.slice(token.length);
      } else {
        return invalidDate();
      }
    }
  }

  // Check if the remaining input contains something other than whitespace
  if (dateStr.length > 0 && notWhitespaceRegExp.test(dateStr)) {
    return invalidDate();
  }

  const uniquePrioritySetters = setters
    .map((setter) => setter.priority)
    .sort((a, b) => b - a)
    .filter((priority, index, array) => array.indexOf(priority) === index)
    .map((priority) =>
      setters
        .filter((setter) => setter.priority === priority)
        .sort((a, b) => b.subPriority - a.subPriority),
    )
    .map((setterArray) => setterArray[0]);

  let date = (0, _index6.toDate)(referenceDate, options?.in);

  if (isNaN(+date)) return invalidDate();

  const flags = {};
  for (const setter of uniquePrioritySetters) {
    if (!setter.validate(date, subFnOptions)) {
      return invalidDate();
    }

    const result = setter.set(date, flags, subFnOptions);
    // Result is tuple (date, flags)
    if (Array.isArray(result)) {
      date = result[0];
      Object.assign(flags, result[1]);
      // Result is date
    } else {
      date = result;
    }
  }

  return date;
}

function cleanEscapedString(input) {
  return input.match(escapedStringRegExp)[1].replace(doubleQuoteRegExp, "'");
}


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/Parser.cjs":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/Parser.cjs ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.Parser = void 0;
var _Setter = __webpack_require__(/*! ./Setter.cjs */ "./node_modules/date-fns/parse/_lib/Setter.cjs");

class Parser {
  run(dateString, token, match, options) {
    const result = this.parse(dateString, token, match, options);
    if (!result) {
      return null;
    }

    return {
      setter: new _Setter.ValueSetter(
        result.value,
        this.validate,
        this.set,
        this.priority,
        this.subPriority,
      ),
      rest: result.rest,
    };
  }

  validate(_utcDate, _value, _options) {
    return true;
  }
}
exports.Parser = Parser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/Setter.cjs":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/Setter.cjs ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.ValueSetter = exports.Setter = exports.DateTimezoneSetter = void 0;
var _index = __webpack_require__(/*! ../../constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
var _index2 = __webpack_require__(/*! ../../transpose.cjs */ "./node_modules/date-fns/transpose.cjs");

const TIMEZONE_UNIT_PRIORITY = 10;

class Setter {
  subPriority = 0;

  validate(_utcDate, _options) {
    return true;
  }
}
exports.Setter = Setter;

class ValueSetter extends Setter {
  constructor(
    value,

    validateValue,

    setValue,

    priority,
    subPriority,
  ) {
    super();
    this.value = value;
    this.validateValue = validateValue;
    this.setValue = setValue;
    this.priority = priority;
    if (subPriority) {
      this.subPriority = subPriority;
    }
  }

  validate(date, options) {
    return this.validateValue(date, this.value, options);
  }

  set(date, flags, options) {
    return this.setValue(date, flags, this.value, options);
  }
}
exports.ValueSetter = ValueSetter;

class DateTimezoneSetter extends Setter {
  priority = TIMEZONE_UNIT_PRIORITY;
  subPriority = -1;

  constructor(context, reference) {
    super();
    this.context =
      context || ((date) => (0, _index.constructFrom)(reference, date));
  }

  set(date, flags) {
    if (flags.timestampIsSet) return date;
    return (0, _index.constructFrom)(
      date,
      (0, _index2.transpose)(date, this.context),
    );
  }
}
exports.DateTimezoneSetter = DateTimezoneSetter;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/constants.cjs":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/constants.cjs ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.timezonePatterns = exports.numericPatterns = void 0;
const numericPatterns = (exports.numericPatterns = {
  month: /^(1[0-2]|0?\d)/, // 0 to 12
  date: /^(3[0-1]|[0-2]?\d)/, // 0 to 31
  dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/, // 0 to 366
  week: /^(5[0-3]|[0-4]?\d)/, // 0 to 53
  hour23h: /^(2[0-3]|[0-1]?\d)/, // 0 to 23
  hour24h: /^(2[0-4]|[0-1]?\d)/, // 0 to 24
  hour11h: /^(1[0-1]|0?\d)/, // 0 to 11
  hour12h: /^(1[0-2]|0?\d)/, // 0 to 12
  minute: /^[0-5]?\d/, // 0 to 59
  second: /^[0-5]?\d/, // 0 to 59

  singleDigit: /^\d/, // 0 to 9
  twoDigits: /^\d{1,2}/, // 0 to 99
  threeDigits: /^\d{1,3}/, // 0 to 999
  fourDigits: /^\d{1,4}/, // 0 to 9999

  anyDigitsSigned: /^-?\d+/,
  singleDigitSigned: /^-?\d/, // 0 to 9, -0 to -9
  twoDigitsSigned: /^-?\d{1,2}/, // 0 to 99, -0 to -99
  threeDigitsSigned: /^-?\d{1,3}/, // 0 to 999, -0 to -999
  fourDigitsSigned: /^-?\d{1,4}/, // 0 to 9999, -0 to -9999
});

const timezonePatterns = (exports.timezonePatterns = {
  basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
  basic: /^([+-])(\d{2})(\d{2})|Z/,
  basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
  extended: /^([+-])(\d{2}):(\d{2})|Z/,
  extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/,
});


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers.cjs":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers.cjs ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.parsers = void 0;
var _EraParser = __webpack_require__(/*! ./parsers/EraParser.cjs */ "./node_modules/date-fns/parse/_lib/parsers/EraParser.cjs");
var _YearParser = __webpack_require__(/*! ./parsers/YearParser.cjs */ "./node_modules/date-fns/parse/_lib/parsers/YearParser.cjs");
var _LocalWeekYearParser = __webpack_require__(/*! ./parsers/LocalWeekYearParser.cjs */ "./node_modules/date-fns/parse/_lib/parsers/LocalWeekYearParser.cjs");
var _ISOWeekYearParser = __webpack_require__(/*! ./parsers/ISOWeekYearParser.cjs */ "./node_modules/date-fns/parse/_lib/parsers/ISOWeekYearParser.cjs");
var _ExtendedYearParser = __webpack_require__(/*! ./parsers/ExtendedYearParser.cjs */ "./node_modules/date-fns/parse/_lib/parsers/ExtendedYearParser.cjs");
var _QuarterParser = __webpack_require__(/*! ./parsers/QuarterParser.cjs */ "./node_modules/date-fns/parse/_lib/parsers/QuarterParser.cjs");
var _StandAloneQuarterParser = __webpack_require__(/*! ./parsers/StandAloneQuarterParser.cjs */ "./node_modules/date-fns/parse/_lib/parsers/StandAloneQuarterParser.cjs");
var _MonthParser = __webpack_require__(/*! ./parsers/MonthParser.cjs */ "./node_modules/date-fns/parse/_lib/parsers/MonthParser.cjs");
var _StandAloneMonthParser = __webpack_require__(/*! ./parsers/StandAloneMonthParser.cjs */ "./node_modules/date-fns/parse/_lib/parsers/StandAloneMonthParser.cjs");
var _LocalWeekParser = __webpack_require__(/*! ./parsers/LocalWeekParser.cjs */ "./node_modules/date-fns/parse/_lib/parsers/LocalWeekParser.cjs");
var _ISOWeekParser = __webpack_require__(/*! ./parsers/ISOWeekParser.cjs */ "./node_modules/date-fns/parse/_lib/parsers/ISOWeekParser.cjs");
var _DateParser = __webpack_require__(/*! ./parsers/DateParser.cjs */ "./node_modules/date-fns/parse/_lib/parsers/DateParser.cjs");
var _DayOfYearParser = __webpack_require__(/*! ./parsers/DayOfYearParser.cjs */ "./node_modules/date-fns/parse/_lib/parsers/DayOfYearParser.cjs");
var _DayParser = __webpack_require__(/*! ./parsers/DayParser.cjs */ "./node_modules/date-fns/parse/_lib/parsers/DayParser.cjs");
var _LocalDayParser = __webpack_require__(/*! ./parsers/LocalDayParser.cjs */ "./node_modules/date-fns/parse/_lib/parsers/LocalDayParser.cjs");
var _StandAloneLocalDayParser = __webpack_require__(/*! ./parsers/StandAloneLocalDayParser.cjs */ "./node_modules/date-fns/parse/_lib/parsers/StandAloneLocalDayParser.cjs");
var _ISODayParser = __webpack_require__(/*! ./parsers/ISODayParser.cjs */ "./node_modules/date-fns/parse/_lib/parsers/ISODayParser.cjs");
var _AMPMParser = __webpack_require__(/*! ./parsers/AMPMParser.cjs */ "./node_modules/date-fns/parse/_lib/parsers/AMPMParser.cjs");
var _AMPMMidnightParser = __webpack_require__(/*! ./parsers/AMPMMidnightParser.cjs */ "./node_modules/date-fns/parse/_lib/parsers/AMPMMidnightParser.cjs");
var _DayPeriodParser = __webpack_require__(/*! ./parsers/DayPeriodParser.cjs */ "./node_modules/date-fns/parse/_lib/parsers/DayPeriodParser.cjs");
var _Hour1to12Parser = __webpack_require__(/*! ./parsers/Hour1to12Parser.cjs */ "./node_modules/date-fns/parse/_lib/parsers/Hour1to12Parser.cjs");
var _Hour0to23Parser = __webpack_require__(/*! ./parsers/Hour0to23Parser.cjs */ "./node_modules/date-fns/parse/_lib/parsers/Hour0to23Parser.cjs");
var _Hour0To11Parser = __webpack_require__(/*! ./parsers/Hour0To11Parser.cjs */ "./node_modules/date-fns/parse/_lib/parsers/Hour0To11Parser.cjs");
var _Hour1To24Parser = __webpack_require__(/*! ./parsers/Hour1To24Parser.cjs */ "./node_modules/date-fns/parse/_lib/parsers/Hour1To24Parser.cjs");
var _MinuteParser = __webpack_require__(/*! ./parsers/MinuteParser.cjs */ "./node_modules/date-fns/parse/_lib/parsers/MinuteParser.cjs");
var _SecondParser = __webpack_require__(/*! ./parsers/SecondParser.cjs */ "./node_modules/date-fns/parse/_lib/parsers/SecondParser.cjs");
var _FractionOfSecondParser = __webpack_require__(/*! ./parsers/FractionOfSecondParser.cjs */ "./node_modules/date-fns/parse/_lib/parsers/FractionOfSecondParser.cjs");
var _ISOTimezoneWithZParser = __webpack_require__(/*! ./parsers/ISOTimezoneWithZParser.cjs */ "./node_modules/date-fns/parse/_lib/parsers/ISOTimezoneWithZParser.cjs");
var _ISOTimezoneParser = __webpack_require__(/*! ./parsers/ISOTimezoneParser.cjs */ "./node_modules/date-fns/parse/_lib/parsers/ISOTimezoneParser.cjs");
var _TimestampSecondsParser = __webpack_require__(/*! ./parsers/TimestampSecondsParser.cjs */ "./node_modules/date-fns/parse/_lib/parsers/TimestampSecondsParser.cjs");
var _TimestampMillisecondsParser = __webpack_require__(/*! ./parsers/TimestampMillisecondsParser.cjs */ "./node_modules/date-fns/parse/_lib/parsers/TimestampMillisecondsParser.cjs");

/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* | Milliseconds in day            |
 * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
 * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
 * |  d  | Day of month                   |  D  | Day of year                    |
 * |  e  | Local day of week              |  E  | Day of week                    |
 * |  f  |                                |  F* | Day of week in month           |
 * |  g* | Modified Julian day            |  G  | Era                            |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  i! | ISO day of week                |  I! | ISO week of year               |
 * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
 * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
 * |  l* | (deprecated)                   |  L  | Stand-alone month              |
 * |  m  | Minute                         |  M  | Month                          |
 * |  n  |                                |  N  |                                |
 * |  o! | Ordinal number modifier        |  O* | Timezone (GMT)                 |
 * |  p  |                                |  P  |                                |
 * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
 * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
 * |  u  | Extended year                  |  U* | Cyclic year                    |
 * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
 * |  w  | Local week of year             |  W* | Week of month                  |
 * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
 * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
 * |  z* | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 *
 * Letters marked by ! are non-standard, but implemented by date-fns:
 * - `o` modifies the previous token to turn it into an ordinal (see `parse` docs)
 * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
 *   i.e. 7 for Sunday, 1 for Monday, etc.
 * - `I` is ISO week of year, as opposed to `w` which is local week of year.
 * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
 *   `R` is supposed to be used in conjunction with `I` and `i`
 *   for universal ISO week-numbering date, whereas
 *   `Y` is supposed to be used in conjunction with `w` and `e`
 *   for week-numbering date specific to the locale.
 */
const parsers = (exports.parsers = {
  G: new _EraParser.EraParser(),
  y: new _YearParser.YearParser(),
  Y: new _LocalWeekYearParser.LocalWeekYearParser(),
  R: new _ISOWeekYearParser.ISOWeekYearParser(),
  u: new _ExtendedYearParser.ExtendedYearParser(),
  Q: new _QuarterParser.QuarterParser(),
  q: new _StandAloneQuarterParser.StandAloneQuarterParser(),
  M: new _MonthParser.MonthParser(),
  L: new _StandAloneMonthParser.StandAloneMonthParser(),
  w: new _LocalWeekParser.LocalWeekParser(),
  I: new _ISOWeekParser.ISOWeekParser(),
  d: new _DateParser.DateParser(),
  D: new _DayOfYearParser.DayOfYearParser(),
  E: new _DayParser.DayParser(),
  e: new _LocalDayParser.LocalDayParser(),
  c: new _StandAloneLocalDayParser.StandAloneLocalDayParser(),
  i: new _ISODayParser.ISODayParser(),
  a: new _AMPMParser.AMPMParser(),
  b: new _AMPMMidnightParser.AMPMMidnightParser(),
  B: new _DayPeriodParser.DayPeriodParser(),
  h: new _Hour1to12Parser.Hour1to12Parser(),
  H: new _Hour0to23Parser.Hour0to23Parser(),
  K: new _Hour0To11Parser.Hour0To11Parser(),
  k: new _Hour1To24Parser.Hour1To24Parser(),
  m: new _MinuteParser.MinuteParser(),
  s: new _SecondParser.SecondParser(),
  S: new _FractionOfSecondParser.FractionOfSecondParser(),
  X: new _ISOTimezoneWithZParser.ISOTimezoneWithZParser(),
  x: new _ISOTimezoneParser.ISOTimezoneParser(),
  t: new _TimestampSecondsParser.TimestampSecondsParser(),
  T: new _TimestampMillisecondsParser.TimestampMillisecondsParser(),
});


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/AMPMMidnightParser.cjs":
/*!*************************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/AMPMMidnightParser.cjs ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.AMPMMidnightParser = void 0;
var _Parser = __webpack_require__(/*! ../Parser.cjs */ "./node_modules/date-fns/parse/_lib/Parser.cjs");

var _utils = __webpack_require__(/*! ../utils.cjs */ "./node_modules/date-fns/parse/_lib/utils.cjs");

class AMPMMidnightParser extends _Parser.Parser {
  priority = 80;

  parse(dateString, token, match) {
    switch (token) {
      case "b":
      case "bb":
      case "bbb":
        return (
          match.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting",
          })
        );

      case "bbbbb":
        return match.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting",
        });
      case "bbbb":
      default:
        return (
          match.dayPeriod(dateString, {
            width: "wide",
            context: "formatting",
          }) ||
          match.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting",
          })
        );
    }
  }

  set(date, _flags, value) {
    date.setHours((0, _utils.dayPeriodEnumToHours)(value), 0, 0, 0);
    return date;
  }

  incompatibleTokens = ["a", "B", "H", "k", "t", "T"];
}
exports.AMPMMidnightParser = AMPMMidnightParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/AMPMParser.cjs":
/*!*****************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/AMPMParser.cjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.AMPMParser = void 0;
var _Parser = __webpack_require__(/*! ../Parser.cjs */ "./node_modules/date-fns/parse/_lib/Parser.cjs");

var _utils = __webpack_require__(/*! ../utils.cjs */ "./node_modules/date-fns/parse/_lib/utils.cjs");

class AMPMParser extends _Parser.Parser {
  priority = 80;

  parse(dateString, token, match) {
    switch (token) {
      case "a":
      case "aa":
      case "aaa":
        return (
          match.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting",
          })
        );

      case "aaaaa":
        return match.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting",
        });
      case "aaaa":
      default:
        return (
          match.dayPeriod(dateString, {
            width: "wide",
            context: "formatting",
          }) ||
          match.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting",
          })
        );
    }
  }

  set(date, _flags, value) {
    date.setHours((0, _utils.dayPeriodEnumToHours)(value), 0, 0, 0);
    return date;
  }

  incompatibleTokens = ["b", "B", "H", "k", "t", "T"];
}
exports.AMPMParser = AMPMParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/DateParser.cjs":
/*!*****************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/DateParser.cjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.DateParser = void 0;
var _constants = __webpack_require__(/*! ../constants.cjs */ "./node_modules/date-fns/parse/_lib/constants.cjs");
var _Parser = __webpack_require__(/*! ../Parser.cjs */ "./node_modules/date-fns/parse/_lib/Parser.cjs");

var _utils = __webpack_require__(/*! ../utils.cjs */ "./node_modules/date-fns/parse/_lib/utils.cjs");

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DAYS_IN_MONTH_LEAP_YEAR = [
  31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
];

// Day of the month
class DateParser extends _Parser.Parser {
  priority = 90;
  subPriority = 1;

  parse(dateString, token, match) {
    switch (token) {
      case "d":
        return (0, _utils.parseNumericPattern)(
          _constants.numericPatterns.date,
          dateString,
        );
      case "do":
        return match.ordinalNumber(dateString, { unit: "date" });
      default:
        return (0, _utils.parseNDigits)(token.length, dateString);
    }
  }

  validate(date, value) {
    const year = date.getFullYear();
    const isLeapYear = (0, _utils.isLeapYearIndex)(year);
    const month = date.getMonth();
    if (isLeapYear) {
      return value >= 1 && value <= DAYS_IN_MONTH_LEAP_YEAR[month];
    } else {
      return value >= 1 && value <= DAYS_IN_MONTH[month];
    }
  }

  set(date, _flags, value) {
    date.setDate(value);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = [
    "Y",
    "R",
    "q",
    "Q",
    "w",
    "I",
    "D",
    "i",
    "e",
    "c",
    "t",
    "T",
  ];
}
exports.DateParser = DateParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/DayOfYearParser.cjs":
/*!**********************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/DayOfYearParser.cjs ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.DayOfYearParser = void 0;
var _constants = __webpack_require__(/*! ../constants.cjs */ "./node_modules/date-fns/parse/_lib/constants.cjs");
var _Parser = __webpack_require__(/*! ../Parser.cjs */ "./node_modules/date-fns/parse/_lib/Parser.cjs");

var _utils = __webpack_require__(/*! ../utils.cjs */ "./node_modules/date-fns/parse/_lib/utils.cjs");

class DayOfYearParser extends _Parser.Parser {
  priority = 90;

  subpriority = 1;

  parse(dateString, token, match) {
    switch (token) {
      case "D":
      case "DD":
        return (0, _utils.parseNumericPattern)(
          _constants.numericPatterns.dayOfYear,
          dateString,
        );
      case "Do":
        return match.ordinalNumber(dateString, { unit: "date" });
      default:
        return (0, _utils.parseNDigits)(token.length, dateString);
    }
  }

  validate(date, value) {
    const year = date.getFullYear();
    const isLeapYear = (0, _utils.isLeapYearIndex)(year);
    if (isLeapYear) {
      return value >= 1 && value <= 366;
    } else {
      return value >= 1 && value <= 365;
    }
  }

  set(date, _flags, value) {
    date.setMonth(0, value);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = [
    "Y",
    "R",
    "q",
    "Q",
    "M",
    "L",
    "w",
    "I",
    "d",
    "E",
    "i",
    "e",
    "c",
    "t",
    "T",
  ];
}
exports.DayOfYearParser = DayOfYearParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/DayParser.cjs":
/*!****************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/DayParser.cjs ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.DayParser = void 0;
var _index = __webpack_require__(/*! ../../../setDay.cjs */ "./node_modules/date-fns/setDay.cjs");
var _Parser = __webpack_require__(/*! ../Parser.cjs */ "./node_modules/date-fns/parse/_lib/Parser.cjs");

// Day of week
class DayParser extends _Parser.Parser {
  priority = 90;

  parse(dateString, token, match) {
    switch (token) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return (
          match.day(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.day(dateString, { width: "short", context: "formatting" }) ||
          match.day(dateString, { width: "narrow", context: "formatting" })
        );

      // T
      case "EEEEE":
        return match.day(dateString, {
          width: "narrow",
          context: "formatting",
        });
      // Tu
      case "EEEEEE":
        return (
          match.day(dateString, { width: "short", context: "formatting" }) ||
          match.day(dateString, { width: "narrow", context: "formatting" })
        );

      // Tuesday
      case "EEEE":
      default:
        return (
          match.day(dateString, { width: "wide", context: "formatting" }) ||
          match.day(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.day(dateString, { width: "short", context: "formatting" }) ||
          match.day(dateString, { width: "narrow", context: "formatting" })
        );
    }
  }

  validate(_date, value) {
    return value >= 0 && value <= 6;
  }

  set(date, _flags, value, options) {
    date = (0, _index.setDay)(date, value, options);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = ["D", "i", "e", "c", "t", "T"];
}
exports.DayParser = DayParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/DayPeriodParser.cjs":
/*!**********************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/DayPeriodParser.cjs ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.DayPeriodParser = void 0;
var _Parser = __webpack_require__(/*! ../Parser.cjs */ "./node_modules/date-fns/parse/_lib/Parser.cjs");

var _utils = __webpack_require__(/*! ../utils.cjs */ "./node_modules/date-fns/parse/_lib/utils.cjs");

// in the morning, in the afternoon, in the evening, at night
class DayPeriodParser extends _Parser.Parser {
  priority = 80;

  parse(dateString, token, match) {
    switch (token) {
      case "B":
      case "BB":
      case "BBB":
        return (
          match.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting",
          })
        );

      case "BBBBB":
        return match.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting",
        });
      case "BBBB":
      default:
        return (
          match.dayPeriod(dateString, {
            width: "wide",
            context: "formatting",
          }) ||
          match.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting",
          })
        );
    }
  }

  set(date, _flags, value) {
    date.setHours((0, _utils.dayPeriodEnumToHours)(value), 0, 0, 0);
    return date;
  }

  incompatibleTokens = ["a", "b", "t", "T"];
}
exports.DayPeriodParser = DayPeriodParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/EraParser.cjs":
/*!****************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/EraParser.cjs ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.EraParser = void 0;

var _Parser = __webpack_require__(/*! ../Parser.cjs */ "./node_modules/date-fns/parse/_lib/Parser.cjs");

class EraParser extends _Parser.Parser {
  priority = 140;

  parse(dateString, token, match) {
    switch (token) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return (
          match.era(dateString, { width: "abbreviated" }) ||
          match.era(dateString, { width: "narrow" })
        );

      // A, B
      case "GGGGG":
        return match.era(dateString, { width: "narrow" });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return (
          match.era(dateString, { width: "wide" }) ||
          match.era(dateString, { width: "abbreviated" }) ||
          match.era(dateString, { width: "narrow" })
        );
    }
  }

  set(date, flags, value) {
    flags.era = value;
    date.setFullYear(value, 0, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = ["R", "u", "t", "T"];
}
exports.EraParser = EraParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/ExtendedYearParser.cjs":
/*!*************************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/ExtendedYearParser.cjs ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.ExtendedYearParser = void 0;
var _Parser = __webpack_require__(/*! ../Parser.cjs */ "./node_modules/date-fns/parse/_lib/Parser.cjs");

var _utils = __webpack_require__(/*! ../utils.cjs */ "./node_modules/date-fns/parse/_lib/utils.cjs");

class ExtendedYearParser extends _Parser.Parser {
  priority = 130;

  parse(dateString, token) {
    if (token === "u") {
      return (0, _utils.parseNDigitsSigned)(4, dateString);
    }

    return (0, _utils.parseNDigitsSigned)(token.length, dateString);
  }

  set(date, _flags, value) {
    date.setFullYear(value, 0, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = ["G", "y", "Y", "R", "w", "I", "i", "e", "c", "t", "T"];
}
exports.ExtendedYearParser = ExtendedYearParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/FractionOfSecondParser.cjs":
/*!*****************************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/FractionOfSecondParser.cjs ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.FractionOfSecondParser = void 0;
var _Parser = __webpack_require__(/*! ../Parser.cjs */ "./node_modules/date-fns/parse/_lib/Parser.cjs");

var _utils = __webpack_require__(/*! ../utils.cjs */ "./node_modules/date-fns/parse/_lib/utils.cjs");

class FractionOfSecondParser extends _Parser.Parser {
  priority = 30;

  parse(dateString, token) {
    const valueCallback = (value) =>
      Math.trunc(value * Math.pow(10, -token.length + 3));
    return (0, _utils.mapValue)(
      (0, _utils.parseNDigits)(token.length, dateString),
      valueCallback,
    );
  }

  set(date, _flags, value) {
    date.setMilliseconds(value);
    return date;
  }

  incompatibleTokens = ["t", "T"];
}
exports.FractionOfSecondParser = FractionOfSecondParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/Hour0To11Parser.cjs":
/*!**********************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/Hour0To11Parser.cjs ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.Hour0To11Parser = void 0;
var _constants = __webpack_require__(/*! ../constants.cjs */ "./node_modules/date-fns/parse/_lib/constants.cjs");
var _Parser = __webpack_require__(/*! ../Parser.cjs */ "./node_modules/date-fns/parse/_lib/Parser.cjs");

var _utils = __webpack_require__(/*! ../utils.cjs */ "./node_modules/date-fns/parse/_lib/utils.cjs");

class Hour0To11Parser extends _Parser.Parser {
  priority = 70;

  parse(dateString, token, match) {
    switch (token) {
      case "K":
        return (0, _utils.parseNumericPattern)(
          _constants.numericPatterns.hour11h,
          dateString,
        );
      case "Ko":
        return match.ordinalNumber(dateString, { unit: "hour" });
      default:
        return (0, _utils.parseNDigits)(token.length, dateString);
    }
  }

  validate(_date, value) {
    return value >= 0 && value <= 11;
  }

  set(date, _flags, value) {
    const isPM = date.getHours() >= 12;
    if (isPM && value < 12) {
      date.setHours(value + 12, 0, 0, 0);
    } else {
      date.setHours(value, 0, 0, 0);
    }
    return date;
  }

  incompatibleTokens = ["h", "H", "k", "t", "T"];
}
exports.Hour0To11Parser = Hour0To11Parser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/Hour0to23Parser.cjs":
/*!**********************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/Hour0to23Parser.cjs ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.Hour0to23Parser = void 0;
var _constants = __webpack_require__(/*! ../constants.cjs */ "./node_modules/date-fns/parse/_lib/constants.cjs");
var _Parser = __webpack_require__(/*! ../Parser.cjs */ "./node_modules/date-fns/parse/_lib/Parser.cjs");

var _utils = __webpack_require__(/*! ../utils.cjs */ "./node_modules/date-fns/parse/_lib/utils.cjs");

class Hour0to23Parser extends _Parser.Parser {
  priority = 70;

  parse(dateString, token, match) {
    switch (token) {
      case "H":
        return (0, _utils.parseNumericPattern)(
          _constants.numericPatterns.hour23h,
          dateString,
        );
      case "Ho":
        return match.ordinalNumber(dateString, { unit: "hour" });
      default:
        return (0, _utils.parseNDigits)(token.length, dateString);
    }
  }

  validate(_date, value) {
    return value >= 0 && value <= 23;
  }

  set(date, _flags, value) {
    date.setHours(value, 0, 0, 0);
    return date;
  }

  incompatibleTokens = ["a", "b", "h", "K", "k", "t", "T"];
}
exports.Hour0to23Parser = Hour0to23Parser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/Hour1To24Parser.cjs":
/*!**********************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/Hour1To24Parser.cjs ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.Hour1To24Parser = void 0;
var _constants = __webpack_require__(/*! ../constants.cjs */ "./node_modules/date-fns/parse/_lib/constants.cjs");
var _Parser = __webpack_require__(/*! ../Parser.cjs */ "./node_modules/date-fns/parse/_lib/Parser.cjs");

var _utils = __webpack_require__(/*! ../utils.cjs */ "./node_modules/date-fns/parse/_lib/utils.cjs");

class Hour1To24Parser extends _Parser.Parser {
  priority = 70;

  parse(dateString, token, match) {
    switch (token) {
      case "k":
        return (0, _utils.parseNumericPattern)(
          _constants.numericPatterns.hour24h,
          dateString,
        );
      case "ko":
        return match.ordinalNumber(dateString, { unit: "hour" });
      default:
        return (0, _utils.parseNDigits)(token.length, dateString);
    }
  }

  validate(_date, value) {
    return value >= 1 && value <= 24;
  }

  set(date, _flags, value) {
    const hours = value <= 24 ? value % 24 : value;
    date.setHours(hours, 0, 0, 0);
    return date;
  }

  incompatibleTokens = ["a", "b", "h", "H", "K", "t", "T"];
}
exports.Hour1To24Parser = Hour1To24Parser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/Hour1to12Parser.cjs":
/*!**********************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/Hour1to12Parser.cjs ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.Hour1to12Parser = void 0;
var _constants = __webpack_require__(/*! ../constants.cjs */ "./node_modules/date-fns/parse/_lib/constants.cjs");
var _Parser = __webpack_require__(/*! ../Parser.cjs */ "./node_modules/date-fns/parse/_lib/Parser.cjs");

var _utils = __webpack_require__(/*! ../utils.cjs */ "./node_modules/date-fns/parse/_lib/utils.cjs");

class Hour1to12Parser extends _Parser.Parser {
  priority = 70;

  parse(dateString, token, match) {
    switch (token) {
      case "h":
        return (0, _utils.parseNumericPattern)(
          _constants.numericPatterns.hour12h,
          dateString,
        );
      case "ho":
        return match.ordinalNumber(dateString, { unit: "hour" });
      default:
        return (0, _utils.parseNDigits)(token.length, dateString);
    }
  }

  validate(_date, value) {
    return value >= 1 && value <= 12;
  }

  set(date, _flags, value) {
    const isPM = date.getHours() >= 12;
    if (isPM && value < 12) {
      date.setHours(value + 12, 0, 0, 0);
    } else if (!isPM && value === 12) {
      date.setHours(0, 0, 0, 0);
    } else {
      date.setHours(value, 0, 0, 0);
    }
    return date;
  }

  incompatibleTokens = ["H", "K", "k", "t", "T"];
}
exports.Hour1to12Parser = Hour1to12Parser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/ISODayParser.cjs":
/*!*******************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/ISODayParser.cjs ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.ISODayParser = void 0;
var _index = __webpack_require__(/*! ../../../setISODay.cjs */ "./node_modules/date-fns/setISODay.cjs");
var _Parser = __webpack_require__(/*! ../Parser.cjs */ "./node_modules/date-fns/parse/_lib/Parser.cjs");

var _utils = __webpack_require__(/*! ../utils.cjs */ "./node_modules/date-fns/parse/_lib/utils.cjs");

// ISO day of week
class ISODayParser extends _Parser.Parser {
  priority = 90;

  parse(dateString, token, match) {
    const valueCallback = (value) => {
      if (value === 0) {
        return 7;
      }
      return value;
    };

    switch (token) {
      // 2
      case "i":
      case "ii": // 02
        return (0, _utils.parseNDigits)(token.length, dateString);
      // 2nd
      case "io":
        return match.ordinalNumber(dateString, { unit: "day" });
      // Tue
      case "iii":
        return (0, _utils.mapValue)(
          match.day(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
            match.day(dateString, {
              width: "short",
              context: "formatting",
            }) ||
            match.day(dateString, {
              width: "narrow",
              context: "formatting",
            }),
          valueCallback,
        );
      // T
      case "iiiii":
        return (0, _utils.mapValue)(
          match.day(dateString, {
            width: "narrow",
            context: "formatting",
          }),
          valueCallback,
        );
      // Tu
      case "iiiiii":
        return (0, _utils.mapValue)(
          match.day(dateString, {
            width: "short",
            context: "formatting",
          }) ||
            match.day(dateString, {
              width: "narrow",
              context: "formatting",
            }),
          valueCallback,
        );
      // Tuesday
      case "iiii":
      default:
        return (0, _utils.mapValue)(
          match.day(dateString, {
            width: "wide",
            context: "formatting",
          }) ||
            match.day(dateString, {
              width: "abbreviated",
              context: "formatting",
            }) ||
            match.day(dateString, {
              width: "short",
              context: "formatting",
            }) ||
            match.day(dateString, {
              width: "narrow",
              context: "formatting",
            }),
          valueCallback,
        );
    }
  }

  validate(_date, value) {
    return value >= 1 && value <= 7;
  }

  set(date, _flags, value) {
    date = (0, _index.setISODay)(date, value);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = [
    "y",
    "Y",
    "u",
    "q",
    "Q",
    "M",
    "L",
    "w",
    "d",
    "D",
    "E",
    "e",
    "c",
    "t",
    "T",
  ];
}
exports.ISODayParser = ISODayParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/ISOTimezoneParser.cjs":
/*!************************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/ISOTimezoneParser.cjs ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.ISOTimezoneParser = void 0;
var _index = __webpack_require__(/*! ../../../constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
var _index2 = __webpack_require__(/*! ../../../_lib/getTimezoneOffsetInMilliseconds.cjs */ "./node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.cjs");
var _constants = __webpack_require__(/*! ../constants.cjs */ "./node_modules/date-fns/parse/_lib/constants.cjs");
var _Parser = __webpack_require__(/*! ../Parser.cjs */ "./node_modules/date-fns/parse/_lib/Parser.cjs");

var _utils = __webpack_require__(/*! ../utils.cjs */ "./node_modules/date-fns/parse/_lib/utils.cjs");

// Timezone (ISO-8601)
class ISOTimezoneParser extends _Parser.Parser {
  priority = 10;

  parse(dateString, token) {
    switch (token) {
      case "x":
        return (0, _utils.parseTimezonePattern)(
          _constants.timezonePatterns.basicOptionalMinutes,
          dateString,
        );
      case "xx":
        return (0, _utils.parseTimezonePattern)(
          _constants.timezonePatterns.basic,
          dateString,
        );
      case "xxxx":
        return (0, _utils.parseTimezonePattern)(
          _constants.timezonePatterns.basicOptionalSeconds,
          dateString,
        );
      case "xxxxx":
        return (0, _utils.parseTimezonePattern)(
          _constants.timezonePatterns.extendedOptionalSeconds,
          dateString,
        );
      case "xxx":
      default:
        return (0, _utils.parseTimezonePattern)(
          _constants.timezonePatterns.extended,
          dateString,
        );
    }
  }

  set(date, flags, value) {
    if (flags.timestampIsSet) return date;
    return (0, _index.constructFrom)(
      date,
      date.getTime() -
        (0, _index2.getTimezoneOffsetInMilliseconds)(date) -
        value,
    );
  }

  incompatibleTokens = ["t", "T", "X"];
}
exports.ISOTimezoneParser = ISOTimezoneParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/ISOTimezoneWithZParser.cjs":
/*!*****************************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/ISOTimezoneWithZParser.cjs ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.ISOTimezoneWithZParser = void 0;
var _index = __webpack_require__(/*! ../../../constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
var _index2 = __webpack_require__(/*! ../../../_lib/getTimezoneOffsetInMilliseconds.cjs */ "./node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.cjs");
var _constants = __webpack_require__(/*! ../constants.cjs */ "./node_modules/date-fns/parse/_lib/constants.cjs");
var _Parser = __webpack_require__(/*! ../Parser.cjs */ "./node_modules/date-fns/parse/_lib/Parser.cjs");

var _utils = __webpack_require__(/*! ../utils.cjs */ "./node_modules/date-fns/parse/_lib/utils.cjs");

// Timezone (ISO-8601. +00:00 is `'Z'`)
class ISOTimezoneWithZParser extends _Parser.Parser {
  priority = 10;

  parse(dateString, token) {
    switch (token) {
      case "X":
        return (0, _utils.parseTimezonePattern)(
          _constants.timezonePatterns.basicOptionalMinutes,
          dateString,
        );
      case "XX":
        return (0, _utils.parseTimezonePattern)(
          _constants.timezonePatterns.basic,
          dateString,
        );
      case "XXXX":
        return (0, _utils.parseTimezonePattern)(
          _constants.timezonePatterns.basicOptionalSeconds,
          dateString,
        );
      case "XXXXX":
        return (0, _utils.parseTimezonePattern)(
          _constants.timezonePatterns.extendedOptionalSeconds,
          dateString,
        );
      case "XXX":
      default:
        return (0, _utils.parseTimezonePattern)(
          _constants.timezonePatterns.extended,
          dateString,
        );
    }
  }

  set(date, flags, value) {
    if (flags.timestampIsSet) return date;
    return (0, _index.constructFrom)(
      date,
      date.getTime() -
        (0, _index2.getTimezoneOffsetInMilliseconds)(date) -
        value,
    );
  }

  incompatibleTokens = ["t", "T", "x"];
}
exports.ISOTimezoneWithZParser = ISOTimezoneWithZParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/ISOWeekParser.cjs":
/*!********************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/ISOWeekParser.cjs ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.ISOWeekParser = void 0;
var _index = __webpack_require__(/*! ../../../setISOWeek.cjs */ "./node_modules/date-fns/setISOWeek.cjs");
var _index2 = __webpack_require__(/*! ../../../startOfISOWeek.cjs */ "./node_modules/date-fns/startOfISOWeek.cjs");
var _constants = __webpack_require__(/*! ../constants.cjs */ "./node_modules/date-fns/parse/_lib/constants.cjs");
var _Parser = __webpack_require__(/*! ../Parser.cjs */ "./node_modules/date-fns/parse/_lib/Parser.cjs");

var _utils = __webpack_require__(/*! ../utils.cjs */ "./node_modules/date-fns/parse/_lib/utils.cjs");

// ISO week of year
class ISOWeekParser extends _Parser.Parser {
  priority = 100;

  parse(dateString, token, match) {
    switch (token) {
      case "I":
        return (0, _utils.parseNumericPattern)(
          _constants.numericPatterns.week,
          dateString,
        );
      case "Io":
        return match.ordinalNumber(dateString, { unit: "week" });
      default:
        return (0, _utils.parseNDigits)(token.length, dateString);
    }
  }

  validate(_date, value) {
    return value >= 1 && value <= 53;
  }

  set(date, _flags, value) {
    return (0, _index2.startOfISOWeek)((0, _index.setISOWeek)(date, value));
  }

  incompatibleTokens = [
    "y",
    "Y",
    "u",
    "q",
    "Q",
    "M",
    "L",
    "w",
    "d",
    "D",
    "e",
    "c",
    "t",
    "T",
  ];
}
exports.ISOWeekParser = ISOWeekParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/ISOWeekYearParser.cjs":
/*!************************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/ISOWeekYearParser.cjs ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.ISOWeekYearParser = void 0;
var _index = __webpack_require__(/*! ../../../startOfISOWeek.cjs */ "./node_modules/date-fns/startOfISOWeek.cjs");
var _index2 = __webpack_require__(/*! ../../../constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
var _Parser = __webpack_require__(/*! ../Parser.cjs */ "./node_modules/date-fns/parse/_lib/Parser.cjs");

var _utils = __webpack_require__(/*! ../utils.cjs */ "./node_modules/date-fns/parse/_lib/utils.cjs");

// ISO week-numbering year
class ISOWeekYearParser extends _Parser.Parser {
  priority = 130;

  parse(dateString, token) {
    if (token === "R") {
      return (0, _utils.parseNDigitsSigned)(4, dateString);
    }

    return (0, _utils.parseNDigitsSigned)(token.length, dateString);
  }

  set(date, _flags, value) {
    const firstWeekOfYear = (0, _index2.constructFrom)(date, 0);
    firstWeekOfYear.setFullYear(value, 0, 4);
    firstWeekOfYear.setHours(0, 0, 0, 0);
    return (0, _index.startOfISOWeek)(firstWeekOfYear);
  }

  incompatibleTokens = [
    "G",
    "y",
    "Y",
    "u",
    "Q",
    "q",
    "M",
    "L",
    "w",
    "d",
    "D",
    "e",
    "c",
    "t",
    "T",
  ];
}
exports.ISOWeekYearParser = ISOWeekYearParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/LocalDayParser.cjs":
/*!*********************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/LocalDayParser.cjs ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.LocalDayParser = void 0;
var _index = __webpack_require__(/*! ../../../setDay.cjs */ "./node_modules/date-fns/setDay.cjs");
var _Parser = __webpack_require__(/*! ../Parser.cjs */ "./node_modules/date-fns/parse/_lib/Parser.cjs");

var _utils = __webpack_require__(/*! ../utils.cjs */ "./node_modules/date-fns/parse/_lib/utils.cjs");

// Local day of week
class LocalDayParser extends _Parser.Parser {
  priority = 90;
  parse(dateString, token, match, options) {
    const valueCallback = (value) => {
      // We want here floor instead of trunc, so we get -7 for value 0 instead of 0
      const wholeWeekDays = Math.floor((value - 1) / 7) * 7;
      return ((value + options.weekStartsOn + 6) % 7) + wholeWeekDays;
    };

    switch (token) {
      // 3
      case "e":
      case "ee": // 03
        return (0, _utils.mapValue)(
          (0, _utils.parseNDigits)(token.length, dateString),
          valueCallback,
        );
      // 3rd
      case "eo":
        return (0, _utils.mapValue)(
          match.ordinalNumber(dateString, {
            unit: "day",
          }),
          valueCallback,
        );
      // Tue
      case "eee":
        return (
          match.day(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.day(dateString, { width: "short", context: "formatting" }) ||
          match.day(dateString, { width: "narrow", context: "formatting" })
        );

      // T
      case "eeeee":
        return match.day(dateString, {
          width: "narrow",
          context: "formatting",
        });
      // Tu
      case "eeeeee":
        return (
          match.day(dateString, { width: "short", context: "formatting" }) ||
          match.day(dateString, { width: "narrow", context: "formatting" })
        );

      // Tuesday
      case "eeee":
      default:
        return (
          match.day(dateString, { width: "wide", context: "formatting" }) ||
          match.day(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.day(dateString, { width: "short", context: "formatting" }) ||
          match.day(dateString, { width: "narrow", context: "formatting" })
        );
    }
  }

  validate(_date, value) {
    return value >= 0 && value <= 6;
  }

  set(date, _flags, value, options) {
    date = (0, _index.setDay)(date, value, options);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = [
    "y",
    "R",
    "u",
    "q",
    "Q",
    "M",
    "L",
    "I",
    "d",
    "D",
    "E",
    "i",
    "c",
    "t",
    "T",
  ];
}
exports.LocalDayParser = LocalDayParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/LocalWeekParser.cjs":
/*!**********************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/LocalWeekParser.cjs ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.LocalWeekParser = void 0;
var _index = __webpack_require__(/*! ../../../setWeek.cjs */ "./node_modules/date-fns/setWeek.cjs");
var _index2 = __webpack_require__(/*! ../../../startOfWeek.cjs */ "./node_modules/date-fns/startOfWeek.cjs");
var _constants = __webpack_require__(/*! ../constants.cjs */ "./node_modules/date-fns/parse/_lib/constants.cjs");
var _Parser = __webpack_require__(/*! ../Parser.cjs */ "./node_modules/date-fns/parse/_lib/Parser.cjs");

var _utils = __webpack_require__(/*! ../utils.cjs */ "./node_modules/date-fns/parse/_lib/utils.cjs");

// Local week of year
class LocalWeekParser extends _Parser.Parser {
  priority = 100;

  parse(dateString, token, match) {
    switch (token) {
      case "w":
        return (0, _utils.parseNumericPattern)(
          _constants.numericPatterns.week,
          dateString,
        );
      case "wo":
        return match.ordinalNumber(dateString, { unit: "week" });
      default:
        return (0, _utils.parseNDigits)(token.length, dateString);
    }
  }

  validate(_date, value) {
    return value >= 1 && value <= 53;
  }

  set(date, _flags, value, options) {
    return (0, _index2.startOfWeek)(
      (0, _index.setWeek)(date, value, options),
      options,
    );
  }

  incompatibleTokens = [
    "y",
    "R",
    "u",
    "q",
    "Q",
    "M",
    "L",
    "I",
    "d",
    "D",
    "i",
    "t",
    "T",
  ];
}
exports.LocalWeekParser = LocalWeekParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/LocalWeekYearParser.cjs":
/*!**************************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/LocalWeekYearParser.cjs ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.LocalWeekYearParser = void 0;
var _index = __webpack_require__(/*! ../../../getWeekYear.cjs */ "./node_modules/date-fns/getWeekYear.cjs");

var _index2 = __webpack_require__(/*! ../../../startOfWeek.cjs */ "./node_modules/date-fns/startOfWeek.cjs");
var _Parser = __webpack_require__(/*! ../Parser.cjs */ "./node_modules/date-fns/parse/_lib/Parser.cjs");

var _utils = __webpack_require__(/*! ../utils.cjs */ "./node_modules/date-fns/parse/_lib/utils.cjs");

// Local week-numbering year
class LocalWeekYearParser extends _Parser.Parser {
  priority = 130;

  parse(dateString, token, match) {
    const valueCallback = (year) => ({
      year,
      isTwoDigitYear: token === "YY",
    });

    switch (token) {
      case "Y":
        return (0, _utils.mapValue)(
          (0, _utils.parseNDigits)(4, dateString),
          valueCallback,
        );
      case "Yo":
        return (0, _utils.mapValue)(
          match.ordinalNumber(dateString, {
            unit: "year",
          }),
          valueCallback,
        );
      default:
        return (0, _utils.mapValue)(
          (0, _utils.parseNDigits)(token.length, dateString),
          valueCallback,
        );
    }
  }

  validate(_date, value) {
    return value.isTwoDigitYear || value.year > 0;
  }

  set(date, flags, value, options) {
    const currentYear = (0, _index.getWeekYear)(date, options);

    if (value.isTwoDigitYear) {
      const normalizedTwoDigitYear = (0, _utils.normalizeTwoDigitYear)(
        value.year,
        currentYear,
      );
      date.setFullYear(
        normalizedTwoDigitYear,
        0,
        options.firstWeekContainsDate,
      );
      date.setHours(0, 0, 0, 0);
      return (0, _index2.startOfWeek)(date, options);
    }

    const year =
      !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
    date.setFullYear(year, 0, options.firstWeekContainsDate);
    date.setHours(0, 0, 0, 0);
    return (0, _index2.startOfWeek)(date, options);
  }

  incompatibleTokens = [
    "y",
    "R",
    "u",
    "Q",
    "q",
    "M",
    "L",
    "I",
    "d",
    "D",
    "i",
    "t",
    "T",
  ];
}
exports.LocalWeekYearParser = LocalWeekYearParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/MinuteParser.cjs":
/*!*******************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/MinuteParser.cjs ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.MinuteParser = void 0;
var _constants = __webpack_require__(/*! ../constants.cjs */ "./node_modules/date-fns/parse/_lib/constants.cjs");
var _Parser = __webpack_require__(/*! ../Parser.cjs */ "./node_modules/date-fns/parse/_lib/Parser.cjs");

var _utils = __webpack_require__(/*! ../utils.cjs */ "./node_modules/date-fns/parse/_lib/utils.cjs");

class MinuteParser extends _Parser.Parser {
  priority = 60;

  parse(dateString, token, match) {
    switch (token) {
      case "m":
        return (0, _utils.parseNumericPattern)(
          _constants.numericPatterns.minute,
          dateString,
        );
      case "mo":
        return match.ordinalNumber(dateString, { unit: "minute" });
      default:
        return (0, _utils.parseNDigits)(token.length, dateString);
    }
  }

  validate(_date, value) {
    return value >= 0 && value <= 59;
  }

  set(date, _flags, value) {
    date.setMinutes(value, 0, 0);
    return date;
  }

  incompatibleTokens = ["t", "T"];
}
exports.MinuteParser = MinuteParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/MonthParser.cjs":
/*!******************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/MonthParser.cjs ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.MonthParser = void 0;
var _constants = __webpack_require__(/*! ../constants.cjs */ "./node_modules/date-fns/parse/_lib/constants.cjs");
var _Parser = __webpack_require__(/*! ../Parser.cjs */ "./node_modules/date-fns/parse/_lib/Parser.cjs");

var _utils = __webpack_require__(/*! ../utils.cjs */ "./node_modules/date-fns/parse/_lib/utils.cjs");

class MonthParser extends _Parser.Parser {
  incompatibleTokens = [
    "Y",
    "R",
    "q",
    "Q",
    "L",
    "w",
    "I",
    "D",
    "i",
    "e",
    "c",
    "t",
    "T",
  ];

  priority = 110;

  parse(dateString, token, match) {
    const valueCallback = (value) => value - 1;

    switch (token) {
      // 1, 2, ..., 12
      case "M":
        return (0, _utils.mapValue)(
          (0, _utils.parseNumericPattern)(
            _constants.numericPatterns.month,
            dateString,
          ),
          valueCallback,
        );
      // 01, 02, ..., 12
      case "MM":
        return (0, _utils.mapValue)(
          (0, _utils.parseNDigits)(2, dateString),
          valueCallback,
        );
      // 1st, 2nd, ..., 12th
      case "Mo":
        return (0, _utils.mapValue)(
          match.ordinalNumber(dateString, {
            unit: "month",
          }),
          valueCallback,
        );
      // Jan, Feb, ..., Dec
      case "MMM":
        return (
          match.month(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.month(dateString, { width: "narrow", context: "formatting" })
        );

      // J, F, ..., D
      case "MMMMM":
        return match.month(dateString, {
          width: "narrow",
          context: "formatting",
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return (
          match.month(dateString, { width: "wide", context: "formatting" }) ||
          match.month(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.month(dateString, { width: "narrow", context: "formatting" })
        );
    }
  }

  validate(_date, value) {
    return value >= 0 && value <= 11;
  }

  set(date, _flags, value) {
    date.setMonth(value, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
}
exports.MonthParser = MonthParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/QuarterParser.cjs":
/*!********************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/QuarterParser.cjs ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.QuarterParser = void 0;
var _Parser = __webpack_require__(/*! ../Parser.cjs */ "./node_modules/date-fns/parse/_lib/Parser.cjs");

var _utils = __webpack_require__(/*! ../utils.cjs */ "./node_modules/date-fns/parse/_lib/utils.cjs");

class QuarterParser extends _Parser.Parser {
  priority = 120;

  parse(dateString, token, match) {
    switch (token) {
      // 1, 2, 3, 4
      case "Q":
      case "QQ": // 01, 02, 03, 04
        return (0, _utils.parseNDigits)(token.length, dateString);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return match.ordinalNumber(dateString, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return (
          match.quarter(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.quarter(dateString, {
            width: "narrow",
            context: "formatting",
          })
        );

      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return match.quarter(dateString, {
          width: "narrow",
          context: "formatting",
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return (
          match.quarter(dateString, {
            width: "wide",
            context: "formatting",
          }) ||
          match.quarter(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.quarter(dateString, {
            width: "narrow",
            context: "formatting",
          })
        );
    }
  }

  validate(_date, value) {
    return value >= 1 && value <= 4;
  }

  set(date, _flags, value) {
    date.setMonth((value - 1) * 3, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = [
    "Y",
    "R",
    "q",
    "M",
    "L",
    "w",
    "I",
    "d",
    "D",
    "i",
    "e",
    "c",
    "t",
    "T",
  ];
}
exports.QuarterParser = QuarterParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/SecondParser.cjs":
/*!*******************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/SecondParser.cjs ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.SecondParser = void 0;
var _constants = __webpack_require__(/*! ../constants.cjs */ "./node_modules/date-fns/parse/_lib/constants.cjs");
var _Parser = __webpack_require__(/*! ../Parser.cjs */ "./node_modules/date-fns/parse/_lib/Parser.cjs");

var _utils = __webpack_require__(/*! ../utils.cjs */ "./node_modules/date-fns/parse/_lib/utils.cjs");

class SecondParser extends _Parser.Parser {
  priority = 50;

  parse(dateString, token, match) {
    switch (token) {
      case "s":
        return (0, _utils.parseNumericPattern)(
          _constants.numericPatterns.second,
          dateString,
        );
      case "so":
        return match.ordinalNumber(dateString, { unit: "second" });
      default:
        return (0, _utils.parseNDigits)(token.length, dateString);
    }
  }

  validate(_date, value) {
    return value >= 0 && value <= 59;
  }

  set(date, _flags, value) {
    date.setSeconds(value, 0);
    return date;
  }

  incompatibleTokens = ["t", "T"];
}
exports.SecondParser = SecondParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/StandAloneLocalDayParser.cjs":
/*!*******************************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/StandAloneLocalDayParser.cjs ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.StandAloneLocalDayParser = void 0;
var _index = __webpack_require__(/*! ../../../setDay.cjs */ "./node_modules/date-fns/setDay.cjs");
var _Parser = __webpack_require__(/*! ../Parser.cjs */ "./node_modules/date-fns/parse/_lib/Parser.cjs");

var _utils = __webpack_require__(/*! ../utils.cjs */ "./node_modules/date-fns/parse/_lib/utils.cjs");

// Stand-alone local day of week
class StandAloneLocalDayParser extends _Parser.Parser {
  priority = 90;

  parse(dateString, token, match, options) {
    const valueCallback = (value) => {
      // We want here floor instead of trunc, so we get -7 for value 0 instead of 0
      const wholeWeekDays = Math.floor((value - 1) / 7) * 7;
      return ((value + options.weekStartsOn + 6) % 7) + wholeWeekDays;
    };

    switch (token) {
      // 3
      case "c":
      case "cc": // 03
        return (0, _utils.mapValue)(
          (0, _utils.parseNDigits)(token.length, dateString),
          valueCallback,
        );
      // 3rd
      case "co":
        return (0, _utils.mapValue)(
          match.ordinalNumber(dateString, {
            unit: "day",
          }),
          valueCallback,
        );
      // Tue
      case "ccc":
        return (
          match.day(dateString, {
            width: "abbreviated",
            context: "standalone",
          }) ||
          match.day(dateString, { width: "short", context: "standalone" }) ||
          match.day(dateString, { width: "narrow", context: "standalone" })
        );

      // T
      case "ccccc":
        return match.day(dateString, {
          width: "narrow",
          context: "standalone",
        });
      // Tu
      case "cccccc":
        return (
          match.day(dateString, { width: "short", context: "standalone" }) ||
          match.day(dateString, { width: "narrow", context: "standalone" })
        );

      // Tuesday
      case "cccc":
      default:
        return (
          match.day(dateString, { width: "wide", context: "standalone" }) ||
          match.day(dateString, {
            width: "abbreviated",
            context: "standalone",
          }) ||
          match.day(dateString, { width: "short", context: "standalone" }) ||
          match.day(dateString, { width: "narrow", context: "standalone" })
        );
    }
  }

  validate(_date, value) {
    return value >= 0 && value <= 6;
  }

  set(date, _flags, value, options) {
    date = (0, _index.setDay)(date, value, options);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = [
    "y",
    "R",
    "u",
    "q",
    "Q",
    "M",
    "L",
    "I",
    "d",
    "D",
    "E",
    "i",
    "e",
    "t",
    "T",
  ];
}
exports.StandAloneLocalDayParser = StandAloneLocalDayParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/StandAloneMonthParser.cjs":
/*!****************************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/StandAloneMonthParser.cjs ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.StandAloneMonthParser = void 0;
var _constants = __webpack_require__(/*! ../constants.cjs */ "./node_modules/date-fns/parse/_lib/constants.cjs");
var _Parser = __webpack_require__(/*! ../Parser.cjs */ "./node_modules/date-fns/parse/_lib/Parser.cjs");

var _utils = __webpack_require__(/*! ../utils.cjs */ "./node_modules/date-fns/parse/_lib/utils.cjs");

class StandAloneMonthParser extends _Parser.Parser {
  priority = 110;

  parse(dateString, token, match) {
    const valueCallback = (value) => value - 1;

    switch (token) {
      // 1, 2, ..., 12
      case "L":
        return (0, _utils.mapValue)(
          (0, _utils.parseNumericPattern)(
            _constants.numericPatterns.month,
            dateString,
          ),
          valueCallback,
        );
      // 01, 02, ..., 12
      case "LL":
        return (0, _utils.mapValue)(
          (0, _utils.parseNDigits)(2, dateString),
          valueCallback,
        );
      // 1st, 2nd, ..., 12th
      case "Lo":
        return (0, _utils.mapValue)(
          match.ordinalNumber(dateString, {
            unit: "month",
          }),
          valueCallback,
        );
      // Jan, Feb, ..., Dec
      case "LLL":
        return (
          match.month(dateString, {
            width: "abbreviated",
            context: "standalone",
          }) ||
          match.month(dateString, { width: "narrow", context: "standalone" })
        );

      // J, F, ..., D
      case "LLLLL":
        return match.month(dateString, {
          width: "narrow",
          context: "standalone",
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return (
          match.month(dateString, { width: "wide", context: "standalone" }) ||
          match.month(dateString, {
            width: "abbreviated",
            context: "standalone",
          }) ||
          match.month(dateString, { width: "narrow", context: "standalone" })
        );
    }
  }

  validate(_date, value) {
    return value >= 0 && value <= 11;
  }

  set(date, _flags, value) {
    date.setMonth(value, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = [
    "Y",
    "R",
    "q",
    "Q",
    "M",
    "w",
    "I",
    "D",
    "i",
    "e",
    "c",
    "t",
    "T",
  ];
}
exports.StandAloneMonthParser = StandAloneMonthParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/StandAloneQuarterParser.cjs":
/*!******************************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/StandAloneQuarterParser.cjs ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.StandAloneQuarterParser = void 0;
var _Parser = __webpack_require__(/*! ../Parser.cjs */ "./node_modules/date-fns/parse/_lib/Parser.cjs");

var _utils = __webpack_require__(/*! ../utils.cjs */ "./node_modules/date-fns/parse/_lib/utils.cjs");

class StandAloneQuarterParser extends _Parser.Parser {
  priority = 120;

  parse(dateString, token, match) {
    switch (token) {
      // 1, 2, 3, 4
      case "q":
      case "qq": // 01, 02, 03, 04
        return (0, _utils.parseNDigits)(token.length, dateString);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return match.ordinalNumber(dateString, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return (
          match.quarter(dateString, {
            width: "abbreviated",
            context: "standalone",
          }) ||
          match.quarter(dateString, {
            width: "narrow",
            context: "standalone",
          })
        );

      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return match.quarter(dateString, {
          width: "narrow",
          context: "standalone",
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return (
          match.quarter(dateString, {
            width: "wide",
            context: "standalone",
          }) ||
          match.quarter(dateString, {
            width: "abbreviated",
            context: "standalone",
          }) ||
          match.quarter(dateString, {
            width: "narrow",
            context: "standalone",
          })
        );
    }
  }

  validate(_date, value) {
    return value >= 1 && value <= 4;
  }

  set(date, _flags, value) {
    date.setMonth((value - 1) * 3, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = [
    "Y",
    "R",
    "Q",
    "M",
    "L",
    "w",
    "I",
    "d",
    "D",
    "i",
    "e",
    "c",
    "t",
    "T",
  ];
}
exports.StandAloneQuarterParser = StandAloneQuarterParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/TimestampMillisecondsParser.cjs":
/*!**********************************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/TimestampMillisecondsParser.cjs ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.TimestampMillisecondsParser = void 0;
var _index = __webpack_require__(/*! ../../../constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
var _Parser = __webpack_require__(/*! ../Parser.cjs */ "./node_modules/date-fns/parse/_lib/Parser.cjs");

var _utils = __webpack_require__(/*! ../utils.cjs */ "./node_modules/date-fns/parse/_lib/utils.cjs");

class TimestampMillisecondsParser extends _Parser.Parser {
  priority = 20;

  parse(dateString) {
    return (0, _utils.parseAnyDigitsSigned)(dateString);
  }

  set(date, _flags, value) {
    return [(0, _index.constructFrom)(date, value), { timestampIsSet: true }];
  }

  incompatibleTokens = "*";
}
exports.TimestampMillisecondsParser = TimestampMillisecondsParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/TimestampSecondsParser.cjs":
/*!*****************************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/TimestampSecondsParser.cjs ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.TimestampSecondsParser = void 0;
var _index = __webpack_require__(/*! ../../../constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
var _Parser = __webpack_require__(/*! ../Parser.cjs */ "./node_modules/date-fns/parse/_lib/Parser.cjs");

var _utils = __webpack_require__(/*! ../utils.cjs */ "./node_modules/date-fns/parse/_lib/utils.cjs");

class TimestampSecondsParser extends _Parser.Parser {
  priority = 40;

  parse(dateString) {
    return (0, _utils.parseAnyDigitsSigned)(dateString);
  }

  set(date, _flags, value) {
    return [
      (0, _index.constructFrom)(date, value * 1000),
      { timestampIsSet: true },
    ];
  }

  incompatibleTokens = "*";
}
exports.TimestampSecondsParser = TimestampSecondsParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/parsers/YearParser.cjs":
/*!*****************************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/parsers/YearParser.cjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.YearParser = void 0;
var _Parser = __webpack_require__(/*! ../Parser.cjs */ "./node_modules/date-fns/parse/_lib/Parser.cjs");

var _utils = __webpack_require__(/*! ../utils.cjs */ "./node_modules/date-fns/parse/_lib/utils.cjs");

// From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_Patterns
// | Year     |     y | yy |   yyy |  yyyy | yyyyy |
// |----------|-------|----|-------|-------|-------|
// | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
// | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
// | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
// | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
// | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |
class YearParser extends _Parser.Parser {
  priority = 130;
  incompatibleTokens = ["Y", "R", "u", "w", "I", "i", "e", "c", "t", "T"];

  parse(dateString, token, match) {
    const valueCallback = (year) => ({
      year,
      isTwoDigitYear: token === "yy",
    });

    switch (token) {
      case "y":
        return (0, _utils.mapValue)(
          (0, _utils.parseNDigits)(4, dateString),
          valueCallback,
        );
      case "yo":
        return (0, _utils.mapValue)(
          match.ordinalNumber(dateString, {
            unit: "year",
          }),
          valueCallback,
        );
      default:
        return (0, _utils.mapValue)(
          (0, _utils.parseNDigits)(token.length, dateString),
          valueCallback,
        );
    }
  }

  validate(_date, value) {
    return value.isTwoDigitYear || value.year > 0;
  }

  set(date, flags, value) {
    const currentYear = date.getFullYear();

    if (value.isTwoDigitYear) {
      const normalizedTwoDigitYear = (0, _utils.normalizeTwoDigitYear)(
        value.year,
        currentYear,
      );
      date.setFullYear(normalizedTwoDigitYear, 0, 1);
      date.setHours(0, 0, 0, 0);
      return date;
    }

    const year =
      !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
    date.setFullYear(year, 0, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
}
exports.YearParser = YearParser;


/***/ }),

/***/ "./node_modules/date-fns/parse/_lib/utils.cjs":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/parse/_lib/utils.cjs ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.dayPeriodEnumToHours = dayPeriodEnumToHours;
exports.isLeapYearIndex = isLeapYearIndex;
exports.mapValue = mapValue;
exports.normalizeTwoDigitYear = normalizeTwoDigitYear;
exports.parseAnyDigitsSigned = parseAnyDigitsSigned;
exports.parseNDigits = parseNDigits;
exports.parseNDigitsSigned = parseNDigitsSigned;
exports.parseNumericPattern = parseNumericPattern;
exports.parseTimezonePattern = parseTimezonePattern;
var _index = __webpack_require__(/*! ../../constants.cjs */ "./node_modules/date-fns/constants.cjs");

var _constants = __webpack_require__(/*! ./constants.cjs */ "./node_modules/date-fns/parse/_lib/constants.cjs");

function mapValue(parseFnResult, mapFn) {
  if (!parseFnResult) {
    return parseFnResult;
  }

  return {
    value: mapFn(parseFnResult.value),
    rest: parseFnResult.rest,
  };
}

function parseNumericPattern(pattern, dateString) {
  const matchResult = dateString.match(pattern);

  if (!matchResult) {
    return null;
  }

  return {
    value: parseInt(matchResult[0], 10),
    rest: dateString.slice(matchResult[0].length),
  };
}

function parseTimezonePattern(pattern, dateString) {
  const matchResult = dateString.match(pattern);

  if (!matchResult) {
    return null;
  }

  // Input is 'Z'
  if (matchResult[0] === "Z") {
    return {
      value: 0,
      rest: dateString.slice(1),
    };
  }

  const sign = matchResult[1] === "+" ? 1 : -1;
  const hours = matchResult[2] ? parseInt(matchResult[2], 10) : 0;
  const minutes = matchResult[3] ? parseInt(matchResult[3], 10) : 0;
  const seconds = matchResult[5] ? parseInt(matchResult[5], 10) : 0;

  return {
    value:
      sign *
      (hours * _index.millisecondsInHour +
        minutes * _index.millisecondsInMinute +
        seconds * _index.millisecondsInSecond),
    rest: dateString.slice(matchResult[0].length),
  };
}

function parseAnyDigitsSigned(dateString) {
  return parseNumericPattern(
    _constants.numericPatterns.anyDigitsSigned,
    dateString,
  );
}

function parseNDigits(n, dateString) {
  switch (n) {
    case 1:
      return parseNumericPattern(
        _constants.numericPatterns.singleDigit,
        dateString,
      );
    case 2:
      return parseNumericPattern(
        _constants.numericPatterns.twoDigits,
        dateString,
      );
    case 3:
      return parseNumericPattern(
        _constants.numericPatterns.threeDigits,
        dateString,
      );
    case 4:
      return parseNumericPattern(
        _constants.numericPatterns.fourDigits,
        dateString,
      );
    default:
      return parseNumericPattern(new RegExp("^\\d{1," + n + "}"), dateString);
  }
}

function parseNDigitsSigned(n, dateString) {
  switch (n) {
    case 1:
      return parseNumericPattern(
        _constants.numericPatterns.singleDigitSigned,
        dateString,
      );
    case 2:
      return parseNumericPattern(
        _constants.numericPatterns.twoDigitsSigned,
        dateString,
      );
    case 3:
      return parseNumericPattern(
        _constants.numericPatterns.threeDigitsSigned,
        dateString,
      );
    case 4:
      return parseNumericPattern(
        _constants.numericPatterns.fourDigitsSigned,
        dateString,
      );
    default:
      return parseNumericPattern(new RegExp("^-?\\d{1," + n + "}"), dateString);
  }
}

function dayPeriodEnumToHours(dayPeriod) {
  switch (dayPeriod) {
    case "morning":
      return 4;
    case "evening":
      return 17;
    case "pm":
    case "noon":
    case "afternoon":
      return 12;
    case "am":
    case "midnight":
    case "night":
    default:
      return 0;
  }
}

function normalizeTwoDigitYear(twoDigitYear, currentYear) {
  const isCommonEra = currentYear > 0;
  // Absolute number of the current year:
  // 1 -> 1 AC
  // 0 -> 1 BC
  // -1 -> 2 BC
  const absCurrentYear = isCommonEra ? currentYear : 1 - currentYear;

  let result;
  if (absCurrentYear <= 50) {
    result = twoDigitYear || 100;
  } else {
    const rangeEnd = absCurrentYear + 50;
    const rangeEndCentury = Math.trunc(rangeEnd / 100) * 100;
    const isPreviousCentury = twoDigitYear >= rangeEnd % 100;
    result = twoDigitYear + rangeEndCentury - (isPreviousCentury ? 100 : 0);
  }

  return isCommonEra ? result : 1 - result;
}

function isLeapYearIndex(year) {
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}


/***/ }),

/***/ "./node_modules/date-fns/parseISO.cjs":
/*!********************************************!*\
  !*** ./node_modules/date-fns/parseISO.cjs ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.parseISO = parseISO;
var _index = __webpack_require__(/*! ./constants.cjs */ "./node_modules/date-fns/constants.cjs");

var _index2 = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
var _index3 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link parseISO} function options.
 */

/**
 * @name parseISO
 * @category Common Helpers
 * @summary Parse ISO string
 *
 * @description
 * Parse the given string in ISO 8601 format and return an instance of Date.
 *
 * Function accepts complete ISO 8601 formats as well as partial implementations.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 *
 * If the argument isn't a string, the function cannot parse the string or
 * the values are invalid, it returns Invalid Date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param argument - The value to convert
 * @param options - An object with options
 *
 * @returns The parsed date in the local time zone
 *
 * @example
 * // Convert string '2014-02-11T11:30:30' to date:
 * const result = parseISO('2014-02-11T11:30:30')
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert string '+02014101' to date,
 * // if the additional number of digits in the extended year format is 1:
 * const result = parseISO('+02014101', { additionalDigits: 1 })
 * //=> Fri Apr 11 2014 00:00:00
 */
function parseISO(argument, options) {
  const invalidDate = () => (0, _index2.constructFrom)(options?.in, NaN);

  const additionalDigits = options?.additionalDigits ?? 2;
  const dateStrings = splitDateString(argument);

  let date;
  if (dateStrings.date) {
    const parseYearResult = parseYear(dateStrings.date, additionalDigits);
    date = parseDate(parseYearResult.restDateString, parseYearResult.year);
  }

  if (!date || isNaN(+date)) return invalidDate();

  const timestamp = +date;
  let time = 0;
  let offset;

  if (dateStrings.time) {
    time = parseTime(dateStrings.time);
    if (isNaN(time)) return invalidDate();
  }

  if (dateStrings.timezone) {
    offset = parseTimezone(dateStrings.timezone);
    if (isNaN(offset)) return invalidDate();
  } else {
    const tmpDate = new Date(timestamp + time);
    const result = (0, _index3.toDate)(0, options?.in);
    result.setFullYear(
      tmpDate.getUTCFullYear(),
      tmpDate.getUTCMonth(),
      tmpDate.getUTCDate(),
    );
    result.setHours(
      tmpDate.getUTCHours(),
      tmpDate.getUTCMinutes(),
      tmpDate.getUTCSeconds(),
      tmpDate.getUTCMilliseconds(),
    );
    return result;
  }

  return (0, _index3.toDate)(timestamp + time + offset, options?.in);
}

const patterns = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/,
};

const dateRegex =
  /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/;
const timeRegex =
  /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/;
const timezoneRegex = /^([+-])(\d{2})(?::?(\d{2}))?$/;

function splitDateString(dateString) {
  const dateStrings = {};
  const array = dateString.split(patterns.dateTimeDelimiter);
  let timeString;

  // The regex match should only return at maximum two array elements.
  // [date], [time], or [date, time].
  if (array.length > 2) {
    return dateStrings;
  }

  if (/:/.test(array[0])) {
    timeString = array[0];
  } else {
    dateStrings.date = array[0];
    timeString = array[1];
    if (patterns.timeZoneDelimiter.test(dateStrings.date)) {
      dateStrings.date = dateString.split(patterns.timeZoneDelimiter)[0];
      timeString = dateString.substr(
        dateStrings.date.length,
        dateString.length,
      );
    }
  }

  if (timeString) {
    const token = patterns.timezone.exec(timeString);
    if (token) {
      dateStrings.time = timeString.replace(token[1], "");
      dateStrings.timezone = token[1];
    } else {
      dateStrings.time = timeString;
    }
  }

  return dateStrings;
}

function parseYear(dateString, additionalDigits) {
  const regex = new RegExp(
    "^(?:(\\d{4}|[+-]\\d{" +
      (4 + additionalDigits) +
      "})|(\\d{2}|[+-]\\d{" +
      (2 + additionalDigits) +
      "})$)",
  );

  const captures = dateString.match(regex);
  // Invalid ISO-formatted year
  if (!captures) return { year: NaN, restDateString: "" };

  const year = captures[1] ? parseInt(captures[1]) : null;
  const century = captures[2] ? parseInt(captures[2]) : null;

  // either year or century is null, not both
  return {
    year: century === null ? year : century * 100,
    restDateString: dateString.slice((captures[1] || captures[2]).length),
  };
}

function parseDate(dateString, year) {
  // Invalid ISO-formatted year
  if (year === null) return new Date(NaN);

  const captures = dateString.match(dateRegex);
  // Invalid ISO-formatted string
  if (!captures) return new Date(NaN);

  const isWeekDate = !!captures[4];
  const dayOfYear = parseDateUnit(captures[1]);
  const month = parseDateUnit(captures[2]) - 1;
  const day = parseDateUnit(captures[3]);
  const week = parseDateUnit(captures[4]);
  const dayOfWeek = parseDateUnit(captures[5]) - 1;

  if (isWeekDate) {
    if (!validateWeekDate(year, week, dayOfWeek)) {
      return new Date(NaN);
    }
    return dayOfISOWeekYear(year, week, dayOfWeek);
  } else {
    const date = new Date(0);
    if (
      !validateDate(year, month, day) ||
      !validateDayOfYearDate(year, dayOfYear)
    ) {
      return new Date(NaN);
    }
    date.setUTCFullYear(year, month, Math.max(dayOfYear, day));
    return date;
  }
}

function parseDateUnit(value) {
  return value ? parseInt(value) : 1;
}

function parseTime(timeString) {
  const captures = timeString.match(timeRegex);
  if (!captures) return NaN; // Invalid ISO-formatted time

  const hours = parseTimeUnit(captures[1]);
  const minutes = parseTimeUnit(captures[2]);
  const seconds = parseTimeUnit(captures[3]);

  if (!validateTime(hours, minutes, seconds)) {
    return NaN;
  }

  return (
    hours * _index.millisecondsInHour +
    minutes * _index.millisecondsInMinute +
    seconds * 1000
  );
}

function parseTimeUnit(value) {
  return (value && parseFloat(value.replace(",", "."))) || 0;
}

function parseTimezone(timezoneString) {
  if (timezoneString === "Z") return 0;

  const captures = timezoneString.match(timezoneRegex);
  if (!captures) return 0;

  const sign = captures[1] === "+" ? -1 : 1;
  const hours = parseInt(captures[2]);
  const minutes = (captures[3] && parseInt(captures[3])) || 0;

  if (!validateTimezone(hours, minutes)) {
    return NaN;
  }

  return (
    sign *
    (hours * _index.millisecondsInHour + minutes * _index.millisecondsInMinute)
  );
}

function dayOfISOWeekYear(isoWeekYear, week, day) {
  const date = new Date(0);
  date.setUTCFullYear(isoWeekYear, 0, 4);
  const fourthOfJanuaryDay = date.getUTCDay() || 7;
  const diff = (week - 1) * 7 + day + 1 - fourthOfJanuaryDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}

// Validation functions

// February is null to handle the leap year (using ||)
const daysInMonths = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isLeapYearIndex(year) {
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}

function validateDate(year, month, date) {
  return (
    month >= 0 &&
    month <= 11 &&
    date >= 1 &&
    date <= (daysInMonths[month] || (isLeapYearIndex(year) ? 29 : 28))
  );
}

function validateDayOfYearDate(year, dayOfYear) {
  return dayOfYear >= 1 && dayOfYear <= (isLeapYearIndex(year) ? 366 : 365);
}

function validateWeekDate(_year, week, day) {
  return week >= 1 && week <= 53 && day >= 0 && day <= 6;
}

function validateTime(hours, minutes, seconds) {
  if (hours === 24) {
    return minutes === 0 && seconds === 0;
  }

  return (
    seconds >= 0 &&
    seconds < 60 &&
    minutes >= 0 &&
    minutes < 60 &&
    hours >= 0 &&
    hours < 25
  );
}

function validateTimezone(_hours, minutes) {
  return minutes >= 0 && minutes <= 59;
}


/***/ }),

/***/ "./node_modules/date-fns/parseJSON.cjs":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/parseJSON.cjs ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.parseJSON = parseJSON;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link parseJSON} function options.
 */

/**
 * Converts a complete ISO date string in UTC time, the typical format for transmitting
 * a date in JSON, to a JavaScript `Date` instance.
 *
 * This is a minimal implementation for converting dates retrieved from a JSON API to
 * a `Date` instance which can be used with other functions in the `date-fns` library.
 * The following formats are supported:
 *
 * - `2000-03-15T05:20:10.123Z`: The output of `.toISOString()` and `JSON.stringify(new Date())`
 * - `2000-03-15T05:20:10Z`: Without milliseconds
 * - `2000-03-15T05:20:10+00:00`: With a zero offset, the default JSON encoded format in some other languages
 * - `2000-03-15T05:20:10+05:45`: With a positive or negative offset, the default JSON encoded format in some other languages
 * - `2000-03-15T05:20:10+0000`: With a zero offset without a colon
 * - `2000-03-15T05:20:10`: Without a trailing 'Z' symbol
 * - `2000-03-15T05:20:10.1234567`: Up to 7 digits in milliseconds field. Only first 3 are taken into account since JS does not allow fractional milliseconds
 * - `2000-03-15 05:20:10`: With a space instead of a 'T' separator for APIs returning a SQL date without reformatting
 *
 * For convenience and ease of use these other input types are also supported
 * via [toDate](https://date-fns.org/docs/toDate):
 *
 * - A `Date` instance will be cloned
 * - A `number` will be treated as a timestamp
 *
 * Any other input type or invalid date strings will return an `Invalid Date`.
 *
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param dateStr - A fully formed ISO8601 date string to convert
 * @param options - An object with options
 *
 * @returns The parsed date in the local time zone
 */
function parseJSON(dateStr, options) {
  const parts = dateStr.match(
    /(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})(?:\.(\d{0,7}))?(?:Z|(.)(\d{2}):?(\d{2})?)?/,
  );

  if (!parts) return (0, _index.toDate)(NaN, options?.in);

  return (0, _index.toDate)(
    Date.UTC(
      +parts[1],
      +parts[2] - 1,
      +parts[3],
      +parts[4] - (+parts[9] || 0) * (parts[8] == "-" ? -1 : 1),
      +parts[5] - (+parts[10] || 0) * (parts[8] == "-" ? -1 : 1),
      +parts[6],
      +((parts[7] || "0") + "00").substring(0, 3),
    ),
    options?.in,
  );
}


/***/ }),

/***/ "./node_modules/date-fns/previousDay.cjs":
/*!***********************************************!*\
  !*** ./node_modules/date-fns/previousDay.cjs ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.previousDay = previousDay;
var _index = __webpack_require__(/*! ./getDay.cjs */ "./node_modules/date-fns/getDay.cjs");
var _index2 = __webpack_require__(/*! ./subDays.cjs */ "./node_modules/date-fns/subDays.cjs");

/**
 * The {@link previousDay} function options.
 */

/**
 * @name previousDay
 * @category Weekday Helpers
 * @summary When is the previous day of the week?
 *
 * @description
 * When is the previous day of the week? 0-6 the day of the week, 0 represents Sunday.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to check
 * @param day - The day of the week
 * @param options - An object with options
 *
 * @returns The date is the previous day of week
 *
 * @example
 * // When is the previous Monday before Mar, 20, 2020?
 * const result = previousDay(new Date(2020, 2, 20), 1)
 * //=> Mon Mar 16 2020 00:00:00
 *
 * @example
 * // When is the previous Tuesday before Mar, 21, 2020?
 * const result = previousDay(new Date(2020, 2, 21), 2)
 * //=> Tue Mar 17 2020 00:00:00
 */
function previousDay(date, day, options) {
  let delta = (0, _index.getDay)(date, options) - day;
  if (delta <= 0) delta += 7;

  return (0, _index2.subDays)(date, delta, options);
}


/***/ }),

/***/ "./node_modules/date-fns/previousFriday.cjs":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/previousFriday.cjs ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.previousFriday = previousFriday;
var _index = __webpack_require__(/*! ./previousDay.cjs */ "./node_modules/date-fns/previousDay.cjs");

/**
 * The {@link previousFriday} function options.
 */

/**
 * @name previousFriday
 * @category Weekday Helpers
 * @summary When is the previous Friday?
 *
 * @description
 * When is the previous Friday?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [UTCDate](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to start counting from
 * @param options - The options
 *
 * @returns The previous Friday
 *
 * @example
 * // When is the previous Friday before Jun, 19, 2021?
 * const result = previousFriday(new Date(2021, 5, 19))
 * //=> Fri June 18 2021 00:00:00
 */
function previousFriday(date, options) {
  return (0, _index.previousDay)(date, 5, options);
}


/***/ }),

/***/ "./node_modules/date-fns/previousMonday.cjs":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/previousMonday.cjs ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.previousMonday = previousMonday;
var _index = __webpack_require__(/*! ./previousDay.cjs */ "./node_modules/date-fns/previousDay.cjs");

/**
 * The {@link previousMonday} function options.
 */

/**
 * @name previousMonday
 * @category Weekday Helpers
 * @summary When is the previous Monday?
 *
 * @description
 * When is the previous Monday?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to start counting from
 * @param options - An object with options
 *
 * @returns The previous Monday
 *
 * @example
 * // When is the previous Monday before Jun, 18, 2021?
 * const result = previousMonday(new Date(2021, 5, 18))
 * //=> Mon June 14 2021 00:00:00
 */
function previousMonday(date, options) {
  return (0, _index.previousDay)(date, 1, options);
}


/***/ }),

/***/ "./node_modules/date-fns/previousSaturday.cjs":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/previousSaturday.cjs ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.previousSaturday = previousSaturday;
var _index = __webpack_require__(/*! ./previousDay.cjs */ "./node_modules/date-fns/previousDay.cjs");

/**
 * The {@link previousSaturday} function options.
 */

/**
 * @name previousSaturday
 * @category Weekday Helpers
 * @summary When is the previous Saturday?
 *
 * @description
 * When is the previous Saturday?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to start counting from
 * @param options - The options
 *
 * @returns The previous Saturday
 *
 * @example
 * // When is the previous Saturday before Jun, 20, 2021?
 * const result = previousSaturday(new Date(2021, 5, 20))
 * //=> Sat June 19 2021 00:00:00
 */
function previousSaturday(date, options) {
  return (0, _index.previousDay)(date, 6, options);
}


/***/ }),

/***/ "./node_modules/date-fns/previousSunday.cjs":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/previousSunday.cjs ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.previousSunday = previousSunday;
var _index = __webpack_require__(/*! ./previousDay.cjs */ "./node_modules/date-fns/previousDay.cjs");

/**
 * The {@link previousSunday} function options.
 */

/**
 * @name previousSunday
 * @category Weekday Helpers
 * @summary When is the previous Sunday?
 *
 * @description
 * When is the previous Sunday?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to start counting from
 * @param options - The options
 *
 * @returns The previous Sunday
 *
 * @example
 * // When is the previous Sunday before Jun, 21, 2021?
 * const result = previousSunday(new Date(2021, 5, 21))
 * //=> Sun June 20 2021 00:00:00
 */
function previousSunday(date, options) {
  return (0, _index.previousDay)(date, 0, options);
}


/***/ }),

/***/ "./node_modules/date-fns/previousThursday.cjs":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/previousThursday.cjs ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.previousThursday = previousThursday;
var _index = __webpack_require__(/*! ./previousDay.cjs */ "./node_modules/date-fns/previousDay.cjs");

/**
 * The {@link previousThursday} function options.
 */

/**
 * @name previousThursday
 * @category Weekday Helpers
 * @summary When is the previous Thursday?
 *
 * @description
 * When is the previous Thursday?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to start counting from
 * @param options - An object with options
 *
 * @returns The previous Thursday
 *
 * @example
 * // When is the previous Thursday before Jun, 18, 2021?
 * const result = previousThursday(new Date(2021, 5, 18))
 * //=> Thu June 17 2021 00:00:00
 */
function previousThursday(date, options) {
  return (0, _index.previousDay)(date, 4, options);
}


/***/ }),

/***/ "./node_modules/date-fns/previousTuesday.cjs":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/previousTuesday.cjs ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.previousTuesday = previousTuesday;
var _index = __webpack_require__(/*! ./previousDay.cjs */ "./node_modules/date-fns/previousDay.cjs");

/**
 * The {@link previousTuesday} function options.
 */

/**
 * @name previousTuesday
 * @category Weekday Helpers
 * @summary When is the previous Tuesday?
 *
 * @description
 * When is the previous Tuesday?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to start counting from
 * @param options - An object with options
 *
 * @returns The previous Tuesday
 *
 * @example
 * // When is the previous Tuesday before Jun, 18, 2021?
 * const result = previousTuesday(new Date(2021, 5, 18))
 * //=> Tue June 15 2021 00:00:00
 */
function previousTuesday(date, options) {
  return (0, _index.previousDay)(date, 2, options);
}


/***/ }),

/***/ "./node_modules/date-fns/previousWednesday.cjs":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/previousWednesday.cjs ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.previousWednesday = previousWednesday;
var _index = __webpack_require__(/*! ./previousDay.cjs */ "./node_modules/date-fns/previousDay.cjs");

/**
 * The {@link previousWednesday} function options.
 */

/**
 * @name previousWednesday
 * @category Weekday Helpers
 * @summary When is the previous Wednesday?
 *
 * @description
 * When is the previous Wednesday?
 *
 * @typeParam DateType - The Date type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [UTCDate](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to start counting from
 * @param options - An object with options
 *
 * @returns The previous Wednesday
 *
 * @example
 * // When is the previous Wednesday before Jun, 18, 2021?
 * const result = previousWednesday(new Date(2021, 5, 18))
 * //=> Wed June 16 2021 00:00:00
 */
function previousWednesday(date, options) {
  return (0, _index.previousDay)(date, 3, options);
}


/***/ }),

/***/ "./node_modules/date-fns/quartersToMonths.cjs":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/quartersToMonths.cjs ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.quartersToMonths = quartersToMonths;
var _index = __webpack_require__(/*! ./constants.cjs */ "./node_modules/date-fns/constants.cjs");

/**
 * @name quartersToMonths
 * @category Conversion Helpers
 * @summary Convert number of quarters to months.
 *
 * @description
 * Convert a number of quarters to a full number of months.
 *
 * @param quarters - The number of quarters to be converted
 *
 * @returns The number of quarters converted in months
 *
 * @example
 * // Convert 2 quarters to months
 * const result = quartersToMonths(2)
 * //=> 6
 */
function quartersToMonths(quarters) {
  return Math.trunc(quarters * _index.monthsInQuarter);
}


/***/ }),

/***/ "./node_modules/date-fns/quartersToYears.cjs":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/quartersToYears.cjs ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.quartersToYears = quartersToYears;
var _index = __webpack_require__(/*! ./constants.cjs */ "./node_modules/date-fns/constants.cjs");

/**
 * @name quartersToYears
 * @category Conversion Helpers
 * @summary Convert number of quarters to years.
 *
 * @description
 * Convert a number of quarters to a full number of years.
 *
 * @param quarters - The number of quarters to be converted
 *
 * @returns The number of quarters converted in years
 *
 * @example
 * // Convert 8 quarters to years
 * const result = quartersToYears(8)
 * //=> 2
 *
 * @example
 * // It uses floor rounding:
 * const result = quartersToYears(11)
 * //=> 2
 */
function quartersToYears(quarters) {
  const years = quarters / _index.quartersInYear;
  return Math.trunc(years);
}


/***/ }),

/***/ "./node_modules/date-fns/roundToNearestHours.cjs":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/roundToNearestHours.cjs ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.roundToNearestHours = roundToNearestHours;
var _index = __webpack_require__(/*! ./_lib/getRoundingMethod.cjs */ "./node_modules/date-fns/_lib/getRoundingMethod.cjs");
var _index2 = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
var _index3 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link roundToNearestHours} function options.
 */

/**
 * @name roundToNearestHours
 * @category Hour Helpers
 * @summary Rounds the given date to the nearest hour
 *
 * @description
 * Rounds the given date to the nearest hour (or number of hours).
 * Rounds up when the given date is exactly between the nearest round hours.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to round
 * @param options - An object with options.
 *
 * @returns The new date rounded to the closest hour
 *
 * @example
 * // Round 10 July 2014 12:34:56 to nearest hour:
 * const result = roundToNearestHours(new Date(2014, 6, 10, 12, 34, 56))
 * //=> Thu Jul 10 2014 13:00:00
 *
 * @example
 * // Round 10 July 2014 12:34:56 to nearest half hour:
 * const result = roundToNearestHours(new Date(2014, 6, 10, 12, 34, 56), { nearestTo: 6 })
 * //=> Thu Jul 10 2014 12:00:00
 *
 * @example
 * // Round 10 July 2014 12:34:56 to nearest half hour:
 * const result = roundToNearestHours(new Date(2014, 6, 10, 12, 34, 56), { nearestTo: 8 })
 * //=> Thu Jul 10 2014 16:00:00
 *
 * @example
 * // Floor (rounds down) 10 July 2014 12:34:56 to nearest hour:
 * const result = roundToNearestHours(new Date(2014, 6, 10, 1, 23, 45), { roundingMethod: 'ceil' })
 * //=> Thu Jul 10 2014 02:00:00
 *
 * @example
 * // Ceil (rounds up) 10 July 2014 12:34:56 to nearest quarter hour:
 * const result = roundToNearestHours(new Date(2014, 6, 10, 12, 34, 56), { roundingMethod: 'floor', nearestTo: 8 })
 * //=> Thu Jul 10 2014 08:00:00
 */
function roundToNearestHours(date, options) {
  const nearestTo = options?.nearestTo ?? 1;

  if (nearestTo < 1 || nearestTo > 12)
    return (0, _index2.constructFrom)(options?.in || date, NaN);

  const date_ = (0, _index3.toDate)(date, options?.in);
  const fractionalMinutes = date_.getMinutes() / 60;
  const fractionalSeconds = date_.getSeconds() / 60 / 60;
  const fractionalMilliseconds = date_.getMilliseconds() / 1000 / 60 / 60;
  const hours =
    date_.getHours() +
    fractionalMinutes +
    fractionalSeconds +
    fractionalMilliseconds;

  const method = options?.roundingMethod ?? "round";
  const roundingMethod = (0, _index.getRoundingMethod)(method);

  const roundedHours = roundingMethod(hours / nearestTo) * nearestTo;

  date_.setHours(roundedHours, 0, 0, 0);
  return date_;
}


/***/ }),

/***/ "./node_modules/date-fns/roundToNearestMinutes.cjs":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/roundToNearestMinutes.cjs ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.roundToNearestMinutes = roundToNearestMinutes;
var _index = __webpack_require__(/*! ./_lib/getRoundingMethod.cjs */ "./node_modules/date-fns/_lib/getRoundingMethod.cjs");
var _index2 = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
var _index3 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link roundToNearestMinutes} function options.
 */

/**
 * @name roundToNearestMinutes
 * @category Minute Helpers
 * @summary Rounds the given date to the nearest minute
 *
 * @description
 * Rounds the given date to the nearest minute (or number of minutes).
 * Rounds up when the given date is exactly between the nearest round minutes.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to round
 * @param options - An object with options.
 *
 * @returns The new date rounded to the closest minute
 *
 * @example
 * // Round 10 July 2014 12:12:34 to nearest minute:
 * const result = roundToNearestMinutes(new Date(2014, 6, 10, 12, 12, 34))
 * //=> Thu Jul 10 2014 12:13:00
 *
 * @example
 * // Round 10 July 2014 12:12:34 to nearest quarter hour:
 * const result = roundToNearestMinutes(new Date(2014, 6, 10, 12, 12, 34), { nearestTo: 15 })
 * //=> Thu Jul 10 2014 12:15:00
 *
 * @example
 * // Floor (rounds down) 10 July 2014 12:12:34 to nearest minute:
 * const result = roundToNearestMinutes(new Date(2014, 6, 10, 12, 12, 34), { roundingMethod: 'floor' })
 * //=> Thu Jul 10 2014 12:12:00
 *
 * @example
 * // Ceil (rounds up) 10 July 2014 12:12:34 to nearest half hour:
 * const result = roundToNearestMinutes(new Date(2014, 6, 10, 12, 12, 34), { roundingMethod: 'ceil', nearestTo: 30 })
 * //=> Thu Jul 10 2014 12:30:00
 */
function roundToNearestMinutes(date, options) {
  const nearestTo = options?.nearestTo ?? 1;

  if (nearestTo < 1 || nearestTo > 30)
    return (0, _index2.constructFrom)(date, NaN);

  const date_ = (0, _index3.toDate)(date, options?.in);
  const fractionalSeconds = date_.getSeconds() / 60;
  const fractionalMilliseconds = date_.getMilliseconds() / 1000 / 60;
  const minutes =
    date_.getMinutes() + fractionalSeconds + fractionalMilliseconds;

  const method = options?.roundingMethod ?? "round";
  const roundingMethod = (0, _index.getRoundingMethod)(method);

  const roundedMinutes = roundingMethod(minutes / nearestTo) * nearestTo;

  date_.setMinutes(roundedMinutes, 0, 0);
  return date_;
}


/***/ }),

/***/ "./node_modules/date-fns/secondsToHours.cjs":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/secondsToHours.cjs ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.secondsToHours = secondsToHours;
var _index = __webpack_require__(/*! ./constants.cjs */ "./node_modules/date-fns/constants.cjs");

/**
 * @name secondsToHours
 * @category Conversion Helpers
 * @summary Convert seconds to hours.
 *
 * @description
 * Convert a number of seconds to a full number of hours.
 *
 * @param seconds - The number of seconds to be converted
 *
 * @returns The number of seconds converted in hours
 *
 * @example
 * // Convert 7200 seconds into hours
 * const result = secondsToHours(7200)
 * //=> 2
 *
 * @example
 * // It uses floor rounding:
 * const result = secondsToHours(7199)
 * //=> 1
 */
function secondsToHours(seconds) {
  const hours = seconds / _index.secondsInHour;
  return Math.trunc(hours);
}


/***/ }),

/***/ "./node_modules/date-fns/secondsToMilliseconds.cjs":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/secondsToMilliseconds.cjs ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.secondsToMilliseconds = secondsToMilliseconds;
var _index = __webpack_require__(/*! ./constants.cjs */ "./node_modules/date-fns/constants.cjs");

/**
 * @name secondsToMilliseconds
 * @category Conversion Helpers
 * @summary Convert seconds to milliseconds.
 *
 * @description
 * Convert a number of seconds to a full number of milliseconds.
 *
 * @param seconds - The number of seconds to be converted
 *
 * @returns The number of seconds converted in milliseconds
 *
 * @example
 * // Convert 2 seconds into milliseconds
 * const result = secondsToMilliseconds(2)
 * //=> 2000
 */
function secondsToMilliseconds(seconds) {
  return seconds * _index.millisecondsInSecond;
}


/***/ }),

/***/ "./node_modules/date-fns/secondsToMinutes.cjs":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/secondsToMinutes.cjs ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.secondsToMinutes = secondsToMinutes;
var _index = __webpack_require__(/*! ./constants.cjs */ "./node_modules/date-fns/constants.cjs");

/**
 * @name secondsToMinutes
 * @category Conversion Helpers
 * @summary Convert seconds to minutes.
 *
 * @description
 * Convert a number of seconds to a full number of minutes.
 *
 * @param seconds - The number of seconds to be converted
 *
 * @returns The number of seconds converted in minutes
 *
 * @example
 * // Convert 120 seconds into minutes
 * const result = secondsToMinutes(120)
 * //=> 2
 *
 * @example
 * // It uses floor rounding:
 * const result = secondsToMinutes(119)
 * //=> 1
 */
function secondsToMinutes(seconds) {
  const minutes = seconds / _index.secondsInMinute;
  return Math.trunc(minutes);
}


/***/ }),

/***/ "./node_modules/date-fns/set.cjs":
/*!***************************************!*\
  !*** ./node_modules/date-fns/set.cjs ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.set = set;
var _index = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
var _index2 = __webpack_require__(/*! ./setMonth.cjs */ "./node_modules/date-fns/setMonth.cjs");
var _index3 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link set} function options.
 */

/**
 * @name set
 * @category Common Helpers
 * @summary Set date values to a given date.
 *
 * @description
 * Set date values to a given date.
 *
 * Sets time values to date from object `values`.
 * A value is not set if it is undefined or null or doesn't exist in `values`.
 *
 * Note about bundle size: `set` does not internally use `setX` functions from date-fns but instead opts
 * to use native `Date#setX` methods. If you use this function, you may not want to include the
 * other `setX` functions that date-fns provides if you are concerned about the bundle size.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param values - The date values to be set
 * @param options - The options
 *
 * @returns The new date with options set
 *
 * @example
 * // Transform 1 September 2014 into 20 October 2015 in a single line:
 * const result = set(new Date(2014, 8, 20), { year: 2015, month: 9, date: 20 })
 * //=> Tue Oct 20 2015 00:00:00
 *
 * @example
 * // Set 12 PM to 1 September 2014 01:23:45 to 1 September 2014 12:00:00:
 * const result = set(new Date(2014, 8, 1, 1, 23, 45), { hours: 12 })
 * //=> Mon Sep 01 2014 12:23:45
 */
function set(date, values, options) {
  let _date = (0, _index3.toDate)(date, options?.in);

  // Check if date is Invalid Date because Date.prototype.setFullYear ignores the value of Invalid Date
  if (isNaN(+_date)) return (0, _index.constructFrom)(options?.in || date, NaN);

  if (values.year != null) _date.setFullYear(values.year);
  if (values.month != null) _date = (0, _index2.setMonth)(_date, values.month);
  if (values.date != null) _date.setDate(values.date);
  if (values.hours != null) _date.setHours(values.hours);
  if (values.minutes != null) _date.setMinutes(values.minutes);
  if (values.seconds != null) _date.setSeconds(values.seconds);
  if (values.milliseconds != null) _date.setMilliseconds(values.milliseconds);

  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/setDate.cjs":
/*!*******************************************!*\
  !*** ./node_modules/date-fns/setDate.cjs ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.setDate = setDate;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link setDate} function options.
 */

/**
 * @name setDate
 * @category Day Helpers
 * @summary Set the day of the month to the given date.
 *
 * @description
 * Set the day of the month to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows using extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param dayOfMonth - The day of the month of the new date
 * @param options - The options
 *
 * @returns The new date with the day of the month set
 *
 * @example
 * // Set the 30th day of the month to 1 September 2014:
 * const result = setDate(new Date(2014, 8, 1), 30)
 * //=> Tue Sep 30 2014 00:00:00
 */
function setDate(date, dayOfMonth, options) {
  const _date = (0, _index.toDate)(date, options?.in);
  _date.setDate(dayOfMonth);
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/setDay.cjs":
/*!******************************************!*\
  !*** ./node_modules/date-fns/setDay.cjs ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.setDay = setDay;
var _index = __webpack_require__(/*! ./_lib/defaultOptions.cjs */ "./node_modules/date-fns/_lib/defaultOptions.cjs");
var _index2 = __webpack_require__(/*! ./addDays.cjs */ "./node_modules/date-fns/addDays.cjs");
var _index3 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link setDay} function options.
 */

/**
 * @name setDay
 * @category Weekday Helpers
 * @summary Set the day of the week to the given date.
 *
 * @description
 * Set the day of the week to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param day - The day of the week of the new date
 * @param options - An object with options.
 *
 * @returns The new date with the day of the week set
 *
 * @example
 * // Set week day to Sunday, with the default weekStartsOn of Sunday:
 * const result = setDay(new Date(2014, 8, 1), 0)
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // Set week day to Sunday, with a weekStartsOn of Monday:
 * const result = setDay(new Date(2014, 8, 1), 0, { weekStartsOn: 1 })
 * //=> Sun Sep 07 2014 00:00:00
 */
function setDay(date, day, options) {
  const defaultOptions = (0, _index.getDefaultOptions)();
  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  const date_ = (0, _index3.toDate)(date, options?.in);
  const currentDay = date_.getDay();

  const remainder = day % 7;
  const dayIndex = (remainder + 7) % 7;

  const delta = 7 - weekStartsOn;
  const diff =
    day < 0 || day > 6
      ? day - ((currentDay + delta) % 7)
      : ((dayIndex + delta) % 7) - ((currentDay + delta) % 7);
  return (0, _index2.addDays)(date_, diff, options);
}


/***/ }),

/***/ "./node_modules/date-fns/setDayOfYear.cjs":
/*!************************************************!*\
  !*** ./node_modules/date-fns/setDayOfYear.cjs ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.setDayOfYear = setDayOfYear;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link setDayOfYear} function options.
 */

/**
 * @name setDayOfYear
 * @category Day Helpers
 * @summary Set the day of the year to the given date.
 *
 * @description
 * Set the day of the year to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param dayOfYear - The day of the year of the new date
 * @param options - An object with options
 *
 * @returns The new date with the day of the year set
 *
 * @example
 * // Set the 2nd day of the year to 2 July 2014:
 * const result = setDayOfYear(new Date(2014, 6, 2), 2)
 * //=> Thu Jan 02 2014 00:00:00
 */
function setDayOfYear(date, dayOfYear, options) {
  const date_ = (0, _index.toDate)(date, options?.in);
  date_.setMonth(0);
  date_.setDate(dayOfYear);
  return date_;
}


/***/ }),

/***/ "./node_modules/date-fns/setDefaultOptions.cjs":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/setDefaultOptions.cjs ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.setDefaultOptions = setDefaultOptions;
var _index = __webpack_require__(/*! ./_lib/defaultOptions.cjs */ "./node_modules/date-fns/_lib/defaultOptions.cjs");

/**
 * @name setDefaultOptions
 * @category Common Helpers
 * @summary Set default options including locale.
 * @pure false
 *
 * @description
 * Sets the defaults for
 * `options.locale`, `options.weekStartsOn` and `options.firstWeekContainsDate`
 * arguments for all functions.
 *
 * @param options - An object with options
 *
 * @example
 * // Set global locale:
 * import { es } from 'date-fns/locale'
 * setDefaultOptions({ locale: es })
 * const result = format(new Date(2014, 8, 2), 'PPPP')
 * //=> 'martes, 2 de septiembre de 2014'
 *
 * @example
 * // Start of the week for 2 September 2014:
 * const result = startOfWeek(new Date(2014, 8, 2))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // Start of the week for 2 September 2014,
 * // when we set that week starts on Monday by default:
 * setDefaultOptions({ weekStartsOn: 1 })
 * const result = startOfWeek(new Date(2014, 8, 2))
 * //=> Mon Sep 01 2014 00:00:00
 *
 * @example
 * // Manually set options take priority over default options:
 * setDefaultOptions({ weekStartsOn: 1 })
 * const result = startOfWeek(new Date(2014, 8, 2), { weekStartsOn: 0 })
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // Remove the option by setting it to `undefined`:
 * setDefaultOptions({ weekStartsOn: 1 })
 * setDefaultOptions({ weekStartsOn: undefined })
 * const result = startOfWeek(new Date(2014, 8, 2))
 * //=> Sun Aug 31 2014 00:00:00
 */
function setDefaultOptions(options) {
  const result = {};
  const defaultOptions = (0, _index.getDefaultOptions)();

  for (const property in defaultOptions) {
    if (Object.prototype.hasOwnProperty.call(defaultOptions, property)) {
      // [TODO] I challenge you to fix the type
      result[property] = defaultOptions[property];
    }
  }

  for (const property in options) {
    if (Object.prototype.hasOwnProperty.call(options, property)) {
      if (options[property] === undefined) {
        // [TODO] I challenge you to fix the type
        delete result[property];
      } else {
        // [TODO] I challenge you to fix the type
        result[property] = options[property];
      }
    }
  }

  (0, _index.setDefaultOptions)(result);
}


/***/ }),

/***/ "./node_modules/date-fns/setHours.cjs":
/*!********************************************!*\
  !*** ./node_modules/date-fns/setHours.cjs ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.setHours = setHours;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link setHours} function options.
 */

/**
 * @name setHours
 * @category Hour Helpers
 * @summary Set the hours to the given date.
 *
 * @description
 * Set the hours to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param hours - The hours of the new date
 * @param options - An object with options
 *
 * @returns The new date with the hours set
 *
 * @example
 * // Set 4 hours to 1 September 2014 11:30:00:
 * const result = setHours(new Date(2014, 8, 1, 11, 30), 4)
 * //=> Mon Sep 01 2014 04:30:00
 */
function setHours(date, hours, options) {
  const _date = (0, _index.toDate)(date, options?.in);
  _date.setHours(hours);
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/setISODay.cjs":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/setISODay.cjs ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.setISODay = setISODay;
var _index = __webpack_require__(/*! ./addDays.cjs */ "./node_modules/date-fns/addDays.cjs");
var _index2 = __webpack_require__(/*! ./getISODay.cjs */ "./node_modules/date-fns/getISODay.cjs");
var _index3 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link setISODay} function options.
 */

/**
 * @name setISODay
 * @category Weekday Helpers
 * @summary Set the day of the ISO week to the given date.
 *
 * @description
 * Set the day of the ISO week to the given date.
 * ISO week starts with Monday.
 * 7 is the index of Sunday, 1 is the index of Monday, etc.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param day - The day of the ISO week of the new date
 * @param options - An object with options
 *
 * @returns The new date with the day of the ISO week set
 *
 * @example
 * // Set Sunday to 1 September 2014:
 * const result = setISODay(new Date(2014, 8, 1), 7)
 * //=> Sun Sep 07 2014 00:00:00
 */
function setISODay(date, day, options) {
  const date_ = (0, _index3.toDate)(date, options?.in);
  const currentDay = (0, _index2.getISODay)(date_, options);
  const diff = day - currentDay;
  return (0, _index.addDays)(date_, diff, options);
}


/***/ }),

/***/ "./node_modules/date-fns/setISOWeek.cjs":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/setISOWeek.cjs ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.setISOWeek = setISOWeek;
var _index = __webpack_require__(/*! ./getISOWeek.cjs */ "./node_modules/date-fns/getISOWeek.cjs");
var _index2 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link setISOWeek} function options.
 */

/**
 * @name setISOWeek
 * @category ISO Week Helpers
 * @summary Set the ISO week to the given date.
 *
 * @description
 * Set the ISO week to the given date, saving the weekday number.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The `Date` type of the context function.
 *
 * @param date - The date to be changed
 * @param week - The ISO week of the new date
 * @param options - An object with options
 *
 * @returns The new date with the ISO week set
 *
 * @example
 * // Set the 53rd ISO week to 7 August 2004:
 * const result = setISOWeek(new Date(2004, 7, 7), 53)
 * //=> Sat Jan 01 2005 00:00:00
 */
function setISOWeek(date, week, options) {
  const _date = (0, _index2.toDate)(date, options?.in);
  const diff = (0, _index.getISOWeek)(_date, options) - week;
  _date.setDate(_date.getDate() - diff * 7);
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/setISOWeekYear.cjs":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/setISOWeekYear.cjs ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.setISOWeekYear = setISOWeekYear;
var _index = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
var _index2 = __webpack_require__(/*! ./differenceInCalendarDays.cjs */ "./node_modules/date-fns/differenceInCalendarDays.cjs");
var _index3 = __webpack_require__(/*! ./startOfISOWeekYear.cjs */ "./node_modules/date-fns/startOfISOWeekYear.cjs");
var _index4 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link setISOWeekYear} function options.
 */

/**
 * @name setISOWeekYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Set the ISO week-numbering year to the given date.
 *
 * @description
 * Set the ISO week-numbering year to the given date,
 * saving the week number and the weekday number.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows using extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param weekYear - The ISO week-numbering year of the new date
 * @param options - An object with options
 *
 * @returns The new date with the ISO week-numbering year set
 *
 * @example
 * // Set ISO week-numbering year 2007 to 29 December 2008:
 * const result = setISOWeekYear(new Date(2008, 11, 29), 2007)
 * //=> Mon Jan 01 2007 00:00:00
 */
function setISOWeekYear(date, weekYear, options) {
  let _date = (0, _index4.toDate)(date, options?.in);
  const diff = (0, _index2.differenceInCalendarDays)(
    _date,
    (0, _index3.startOfISOWeekYear)(_date, options),
  );
  const fourthOfJanuary = (0, _index.constructFrom)(options?.in || date, 0);
  fourthOfJanuary.setFullYear(weekYear, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  _date = (0, _index3.startOfISOWeekYear)(fourthOfJanuary);
  _date.setDate(_date.getDate() + diff);
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/setMilliseconds.cjs":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/setMilliseconds.cjs ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.setMilliseconds = setMilliseconds;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link setMilliseconds} function options.
 */

/**
 * @name setMilliseconds
 * @category Millisecond Helpers
 * @summary Set the milliseconds to the given date.
 *
 * @description
 * Set the milliseconds to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param milliseconds - The milliseconds of the new date
 * @param options - The options
 *
 * @returns The new date with the milliseconds set
 *
 * @example
 * // Set 300 milliseconds to 1 September 2014 11:30:40.500:
 * const result = setMilliseconds(new Date(2014, 8, 1, 11, 30, 40, 500), 300)
 * //=> Mon Sep 01 2014 11:30:40.300
 */
function setMilliseconds(date, milliseconds, options) {
  const _date = (0, _index.toDate)(date, options?.in);
  _date.setMilliseconds(milliseconds);
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/setMinutes.cjs":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/setMinutes.cjs ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.setMinutes = setMinutes;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link setMinutes} function options.
 */

/**
 * @name setMinutes
 * @category Minute Helpers
 * @summary Set the minutes to the given date.
 *
 * @description
 * Set the minutes to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows using extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, returned from the context function, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param minutes - The minutes of the new date
 * @param options - An object with options
 *
 * @returns The new date with the minutes set
 *
 * @example
 * // Set 45 minutes to 1 September 2014 11:30:40:
 * const result = setMinutes(new Date(2014, 8, 1, 11, 30, 40), 45)
 * //=> Mon Sep 01 2014 11:45:40
 */
function setMinutes(date, minutes, options) {
  const date_ = (0, _index.toDate)(date, options?.in);
  date_.setMinutes(minutes);
  return date_;
}


/***/ }),

/***/ "./node_modules/date-fns/setMonth.cjs":
/*!********************************************!*\
  !*** ./node_modules/date-fns/setMonth.cjs ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.setMonth = setMonth;
var _index = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
var _index2 = __webpack_require__(/*! ./getDaysInMonth.cjs */ "./node_modules/date-fns/getDaysInMonth.cjs");
var _index3 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link setMonth} function options.
 */

/**
 * @name setMonth
 * @category Month Helpers
 * @summary Set the month to the given date.
 *
 * @description
 * Set the month to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param month - The month index to set (0-11)
 * @param options - The options
 *
 * @returns The new date with the month set
 *
 * @example
 * // Set February to 1 September 2014:
 * const result = setMonth(new Date(2014, 8, 1), 1)
 * //=> Sat Feb 01 2014 00:00:00
 */
function setMonth(date, month, options) {
  const _date = (0, _index3.toDate)(date, options?.in);
  const year = _date.getFullYear();
  const day = _date.getDate();

  const midMonth = (0, _index.constructFrom)(options?.in || date, 0);
  midMonth.setFullYear(year, month, 15);
  midMonth.setHours(0, 0, 0, 0);
  const daysInMonth = (0, _index2.getDaysInMonth)(midMonth);

  // Set the earlier date, allows to wrap Jan 31 to Feb 28
  _date.setMonth(month, Math.min(day, daysInMonth));
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/setQuarter.cjs":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/setQuarter.cjs ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.setQuarter = setQuarter;
var _index = __webpack_require__(/*! ./setMonth.cjs */ "./node_modules/date-fns/setMonth.cjs");
var _index2 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link setQuarter} function options.
 */

/**
 * @name setQuarter
 * @category Quarter Helpers
 * @summary Set the year quarter to the given date.
 *
 * @description
 * Set the year quarter to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param quarter - The quarter of the new date
 * @param options - The options
 *
 * @returns The new date with the quarter set
 *
 * @example
 * // Set the 2nd quarter to 2 July 2014:
 * const result = setQuarter(new Date(2014, 6, 2), 2)
 * //=> Wed Apr 02 2014 00:00:00
 */
function setQuarter(date, quarter, options) {
  const date_ = (0, _index2.toDate)(date, options?.in);
  const oldQuarter = Math.trunc(date_.getMonth() / 3) + 1;
  const diff = quarter - oldQuarter;
  return (0, _index.setMonth)(date_, date_.getMonth() + diff * 3);
}


/***/ }),

/***/ "./node_modules/date-fns/setSeconds.cjs":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/setSeconds.cjs ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.setSeconds = setSeconds;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link setSeconds} function options.
 */

/**
 * @name setSeconds
 * @category Second Helpers
 * @summary Set the seconds to the given date, with context support.
 *
 * @description
 * Set the seconds to the given date, with an optional context for time zone specification.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param seconds - The seconds of the new date
 * @param options - An object with options
 *
 * @returns The new date with the seconds set
 *
 * @example
 * // Set 45 seconds to 1 September 2014 11:30:40:
 * const result = setSeconds(new Date(2014, 8, 1, 11, 30, 40), 45)
 * //=> Mon Sep 01 2014 11:30:45
 */
function setSeconds(date, seconds, options) {
  const _date = (0, _index.toDate)(date, options?.in);
  _date.setSeconds(seconds);
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/setWeek.cjs":
/*!*******************************************!*\
  !*** ./node_modules/date-fns/setWeek.cjs ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.setWeek = setWeek;
var _index = __webpack_require__(/*! ./getWeek.cjs */ "./node_modules/date-fns/getWeek.cjs");
var _index2 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link setWeek} function options.
 */

/**
 * @name setWeek
 * @category Week Helpers
 * @summary Set the local week to the given date.
 *
 * @description
 * Set the local week to the given date, saving the weekday number.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param week - The week of the new date
 * @param options - An object with options
 *
 * @returns The new date with the local week set
 *
 * @example
 * // Set the 1st week to 2 January 2005 with default options:
 * const result = setWeek(new Date(2005, 0, 2), 1)
 * //=> Sun Dec 26 2004 00:00:00
 *
 * @example
 * // Set the 1st week to 2 January 2005,
 * // if Monday is the first day of the week,
 * // and the first week of the year always contains 4 January:
 * const result = setWeek(new Date(2005, 0, 2), 1, {
 *   weekStartsOn: 1,
 *   firstWeekContainsDate: 4
 * })
 * //=> Sun Jan 4 2004 00:00:00
 */
function setWeek(date, week, options) {
  const date_ = (0, _index2.toDate)(date, options?.in);
  const diff = (0, _index.getWeek)(date_, options) - week;
  date_.setDate(date_.getDate() - diff * 7);
  return (0, _index2.toDate)(date_, options?.in);
}


/***/ }),

/***/ "./node_modules/date-fns/setWeekYear.cjs":
/*!***********************************************!*\
  !*** ./node_modules/date-fns/setWeekYear.cjs ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.setWeekYear = setWeekYear;
var _index = __webpack_require__(/*! ./_lib/defaultOptions.cjs */ "./node_modules/date-fns/_lib/defaultOptions.cjs");
var _index2 = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
var _index3 = __webpack_require__(/*! ./differenceInCalendarDays.cjs */ "./node_modules/date-fns/differenceInCalendarDays.cjs");
var _index4 = __webpack_require__(/*! ./startOfWeekYear.cjs */ "./node_modules/date-fns/startOfWeekYear.cjs");
var _index5 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link setWeekYear} function options.
 */

/**
 * @name setWeekYear
 * @category Week-Numbering Year Helpers
 * @summary Set the local week-numbering year to the given date.
 *
 * @description
 * Set the local week-numbering year to the given date,
 * saving the week number and the weekday number.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param weekYear - The local week-numbering year of the new date
 * @param options - An object with options
 *
 * @returns The new date with the local week-numbering year set
 *
 * @example
 * // Set the local week-numbering year 2004 to 2 January 2010 with default options:
 * const result = setWeekYear(new Date(2010, 0, 2), 2004)
 * //=> Sat Jan 03 2004 00:00:00
 *
 * @example
 * // Set the local week-numbering year 2004 to 2 January 2010,
 * // if Monday is the first day of week
 * // and 4 January is always in the first week of the year:
 * const result = setWeekYear(new Date(2010, 0, 2), 2004, {
 *   weekStartsOn: 1,
 *   firstWeekContainsDate: 4
 * })
 * //=> Sat Jan 01 2005 00:00:00
 */
function setWeekYear(date, weekYear, options) {
  const defaultOptions = (0, _index.getDefaultOptions)();
  const firstWeekContainsDate =
    options?.firstWeekContainsDate ??
    options?.locale?.options?.firstWeekContainsDate ??
    defaultOptions.firstWeekContainsDate ??
    defaultOptions.locale?.options?.firstWeekContainsDate ??
    1;

  const diff = (0, _index3.differenceInCalendarDays)(
    (0, _index5.toDate)(date, options?.in),
    (0, _index4.startOfWeekYear)(date, options),
    options,
  );

  const firstWeek = (0, _index2.constructFrom)(options?.in || date, 0);
  firstWeek.setFullYear(weekYear, 0, firstWeekContainsDate);
  firstWeek.setHours(0, 0, 0, 0);

  const date_ = (0, _index4.startOfWeekYear)(firstWeek, options);
  date_.setDate(date_.getDate() + diff);
  return date_;
}


/***/ }),

/***/ "./node_modules/date-fns/setYear.cjs":
/*!*******************************************!*\
  !*** ./node_modules/date-fns/setYear.cjs ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.setYear = setYear;
var _index = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
var _index2 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link setYear} function options.
 */

/**
 * @name setYear
 * @category Year Helpers
 * @summary Set the year to the given date.
 *
 * @description
 * Set the year to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param year - The year of the new date
 * @param options - An object with options.
 *
 * @returns The new date with the year set
 *
 * @example
 * // Set year 2013 to 1 September 2014:
 * const result = setYear(new Date(2014, 8, 1), 2013)
 * //=> Sun Sep 01 2013 00:00:00
 */
function setYear(date, year, options) {
  const date_ = (0, _index2.toDate)(date, options?.in);

  // Check if date is Invalid Date because Date.prototype.setFullYear ignores the value of Invalid Date
  if (isNaN(+date_)) return (0, _index.constructFrom)(options?.in || date, NaN);

  date_.setFullYear(year);
  return date_;
}


/***/ }),

/***/ "./node_modules/date-fns/startOfDay.cjs":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/startOfDay.cjs ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.startOfDay = startOfDay;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link startOfDay} function options.
 */

/**
 * @name startOfDay
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - The options
 *
 * @returns The start of a day
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */
function startOfDay(date, options) {
  const _date = (0, _index.toDate)(date, options?.in);
  _date.setHours(0, 0, 0, 0);
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/startOfDecade.cjs":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/startOfDecade.cjs ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.startOfDecade = startOfDecade;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link startOfDecade} options.
 */

/**
 * @name startOfDecade
 * @category Decade Helpers
 * @summary Return the start of a decade for the given date.
 *
 * @description
 * Return the start of a decade for the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of a decade
 *
 * @example
 * // The start of a decade for 21 October 2015 00:00:00:
 * const result = startOfDecade(new Date(2015, 9, 21, 00, 00, 00))
 * //=> Jan 01 2010 00:00:00
 */
function startOfDecade(date, options) {
  // TODO: Switch to more technical definition in of decades that start with 1
  // end with 0. I.e. 2001-2010 instead of current 2000-2009. It's a breaking
  // change, so it can only be done in 4.0.
  const _date = (0, _index.toDate)(date, options?.in);
  const year = _date.getFullYear();
  const decade = Math.floor(year / 10) * 10;
  _date.setFullYear(decade, 0, 1);
  _date.setHours(0, 0, 0, 0);
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/startOfHour.cjs":
/*!***********************************************!*\
  !*** ./node_modules/date-fns/startOfHour.cjs ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.startOfHour = startOfHour;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link startOfHour} function options.
 */

/**
 * @name startOfHour
 * @category Hour Helpers
 * @summary Return the start of an hour for the given date.
 *
 * @description
 * Return the start of an hour for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of an hour
 *
 * @example
 * // The start of an hour for 2 September 2014 11:55:00:
 * const result = startOfHour(new Date(2014, 8, 2, 11, 55))
 * //=> Tue Sep 02 2014 11:00:00
 */
function startOfHour(date, options) {
  const _date = (0, _index.toDate)(date, options?.in);
  _date.setMinutes(0, 0, 0);
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/startOfISOWeek.cjs":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/startOfISOWeek.cjs ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.startOfISOWeek = startOfISOWeek;
var _index = __webpack_require__(/*! ./startOfWeek.cjs */ "./node_modules/date-fns/startOfWeek.cjs");

/**
 * The {@link startOfISOWeek} function options.
 */

/**
 * @name startOfISOWeek
 * @category ISO Week Helpers
 * @summary Return the start of an ISO week for the given date.
 *
 * @description
 * Return the start of an ISO week for the given date.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of an ISO week
 *
 * @example
 * // The start of an ISO week for 2 September 2014 11:55:00:
 * const result = startOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfISOWeek(date, options) {
  return (0, _index.startOfWeek)(date, { ...options, weekStartsOn: 1 });
}


/***/ }),

/***/ "./node_modules/date-fns/startOfISOWeekYear.cjs":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/startOfISOWeekYear.cjs ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.startOfISOWeekYear = startOfISOWeekYear;
var _index = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
var _index2 = __webpack_require__(/*! ./getISOWeekYear.cjs */ "./node_modules/date-fns/getISOWeekYear.cjs");
var _index3 = __webpack_require__(/*! ./startOfISOWeek.cjs */ "./node_modules/date-fns/startOfISOWeek.cjs");

/**
 * The {@link startOfISOWeekYear} function options.
 */

/**
 * @name startOfISOWeekYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Return the start of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the start of an ISO week-numbering year,
 * which always starts 3 days before the year's first Thursday.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of an ISO week-numbering year
 *
 * @example
 * // The start of an ISO week-numbering year for 2 July 2005:
 * const result = startOfISOWeekYear(new Date(2005, 6, 2))
 * //=> Mon Jan 03 2005 00:00:00
 */
function startOfISOWeekYear(date, options) {
  const year = (0, _index2.getISOWeekYear)(date, options);
  const fourthOfJanuary = (0, _index.constructFrom)(options?.in || date, 0);
  fourthOfJanuary.setFullYear(year, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  return (0, _index3.startOfISOWeek)(fourthOfJanuary);
}


/***/ }),

/***/ "./node_modules/date-fns/startOfMinute.cjs":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/startOfMinute.cjs ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.startOfMinute = startOfMinute;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link startOfMinute} function options.
 */

/**
 * @name startOfMinute
 * @category Minute Helpers
 * @summary Return the start of a minute for the given date.
 *
 * @description
 * Return the start of a minute for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of a minute
 *
 * @example
 * // The start of a minute for 1 December 2014 22:15:45.400:
 * const result = startOfMinute(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:00
 */
function startOfMinute(date, options) {
  const date_ = (0, _index.toDate)(date, options?.in);
  date_.setSeconds(0, 0);
  return date_;
}


/***/ }),

/***/ "./node_modules/date-fns/startOfMonth.cjs":
/*!************************************************!*\
  !*** ./node_modules/date-fns/startOfMonth.cjs ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.startOfMonth = startOfMonth;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link startOfMonth} function options.
 */

/**
 * @name startOfMonth
 * @category Month Helpers
 * @summary Return the start of a month for the given date.
 *
 * @description
 * Return the start of a month for the given date. The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments.
 * Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed,
 * or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of a month
 *
 * @example
 * // The start of a month for 2 September 2014 11:55:00:
 * const result = startOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfMonth(date, options) {
  const _date = (0, _index.toDate)(date, options?.in);
  _date.setDate(1);
  _date.setHours(0, 0, 0, 0);
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/startOfQuarter.cjs":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/startOfQuarter.cjs ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.startOfQuarter = startOfQuarter;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link startOfQuarter} function options.
 */

/**
 * @name startOfQuarter
 * @category Quarter Helpers
 * @summary Return the start of a year quarter for the given date.
 *
 * @description
 * Return the start of a year quarter for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - The options
 *
 * @returns The start of a quarter
 *
 * @example
 * // The start of a quarter for 2 September 2014 11:55:00:
 * const result = startOfQuarter(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Jul 01 2014 00:00:00
 */
function startOfQuarter(date, options) {
  const _date = (0, _index.toDate)(date, options?.in);
  const currentMonth = _date.getMonth();
  const month = currentMonth - (currentMonth % 3);
  _date.setMonth(month, 1);
  _date.setHours(0, 0, 0, 0);
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/startOfSecond.cjs":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/startOfSecond.cjs ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.startOfSecond = startOfSecond;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link startOfSecond} function options.
 */

/**
 * @name startOfSecond
 * @category Second Helpers
 * @summary Return the start of a second for the given date.
 *
 * @description
 * Return the start of a second for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - The options
 *
 * @returns The start of a second
 *
 * @example
 * // The start of a second for 1 December 2014 22:15:45.400:
 * const result = startOfSecond(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:45.000
 */
function startOfSecond(date, options) {
  const date_ = (0, _index.toDate)(date, options?.in);
  date_.setMilliseconds(0);
  return date_;
}


/***/ }),

/***/ "./node_modules/date-fns/startOfToday.cjs":
/*!************************************************!*\
  !*** ./node_modules/date-fns/startOfToday.cjs ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.startOfToday = startOfToday;
var _index = __webpack_require__(/*! ./startOfDay.cjs */ "./node_modules/date-fns/startOfDay.cjs");

/**
 * The {@link startOfToday} function options.
 */

/**
 * @name startOfToday
 * @category Day Helpers
 * @summary Return the start of today.
 * @pure false
 *
 * @description
 * Return the start of today.
 *
 * @typeParam ContextDate - The `Date` type of the context function.
 *
 * @param options - An object with options
 *
 * @returns The start of today
 *
 * @example
 * // If today is 6 October 2014:
 * const result = startOfToday()
 * //=> Mon Oct 6 2014 00:00:00
 */
function startOfToday(options) {
  return (0, _index.startOfDay)(Date.now(), options);
}


/***/ }),

/***/ "./node_modules/date-fns/startOfTomorrow.cjs":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/startOfTomorrow.cjs ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.startOfTomorrow = startOfTomorrow;
var _index = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
var _index2 = __webpack_require__(/*! ./constructNow.cjs */ "./node_modules/date-fns/constructNow.cjs");

/**
 * The {@link startOfTomorrow} function options.
 */

/**
 * @name startOfTomorrow
 * @category Day Helpers
 * @summary Return the start of tomorrow.
 * @pure false
 *
 * @typeParam ContextDate - The `Date` type of the context function.
 *
 * @param options - An object with options
 *
 * @returns The start of tomorrow
 *
 * @description
 * Return the start of tomorrow.
 *
 * @example
 * // If today is 6 October 2014:
 * const result = startOfTomorrow()
 * //=> Tue Oct 7 2014 00:00:00
 */
function startOfTomorrow(options) {
  const now = (0, _index2.constructNow)(options?.in);
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();

  const date = (0, _index.constructFrom)(options?.in, 0);
  date.setFullYear(year, month, day + 1);
  date.setHours(0, 0, 0, 0);
  return date;
}


/***/ }),

/***/ "./node_modules/date-fns/startOfWeek.cjs":
/*!***********************************************!*\
  !*** ./node_modules/date-fns/startOfWeek.cjs ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.startOfWeek = startOfWeek;
var _index = __webpack_require__(/*! ./_lib/defaultOptions.cjs */ "./node_modules/date-fns/_lib/defaultOptions.cjs");
var _index2 = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link startOfWeek} function options.
 */

/**
 * @name startOfWeek
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of a week
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfWeek(date, options) {
  const defaultOptions = (0, _index.getDefaultOptions)();
  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  const _date = (0, _index2.toDate)(date, options?.in);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;

  _date.setDate(_date.getDate() - diff);
  _date.setHours(0, 0, 0, 0);
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/startOfWeekYear.cjs":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/startOfWeekYear.cjs ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.startOfWeekYear = startOfWeekYear;
var _index = __webpack_require__(/*! ./_lib/defaultOptions.cjs */ "./node_modules/date-fns/_lib/defaultOptions.cjs");
var _index2 = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
var _index3 = __webpack_require__(/*! ./getWeekYear.cjs */ "./node_modules/date-fns/getWeekYear.cjs");
var _index4 = __webpack_require__(/*! ./startOfWeek.cjs */ "./node_modules/date-fns/startOfWeek.cjs");

/**
 * The {@link startOfWeekYear} function options.
 */

/**
 * @name startOfWeekYear
 * @category Week-Numbering Year Helpers
 * @summary Return the start of a local week-numbering year for the given date.
 *
 * @description
 * Return the start of a local week-numbering year.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of a week-numbering year
 *
 * @example
 * // The start of an a week-numbering year for 2 July 2005 with default settings:
 * const result = startOfWeekYear(new Date(2005, 6, 2))
 * //=> Sun Dec 26 2004 00:00:00
 *
 * @example
 * // The start of a week-numbering year for 2 July 2005
 * // if Monday is the first day of week
 * // and 4 January is always in the first week of the year:
 * const result = startOfWeekYear(new Date(2005, 6, 2), {
 *   weekStartsOn: 1,
 *   firstWeekContainsDate: 4
 * })
 * //=> Mon Jan 03 2005 00:00:00
 */
function startOfWeekYear(date, options) {
  const defaultOptions = (0, _index.getDefaultOptions)();
  const firstWeekContainsDate =
    options?.firstWeekContainsDate ??
    options?.locale?.options?.firstWeekContainsDate ??
    defaultOptions.firstWeekContainsDate ??
    defaultOptions.locale?.options?.firstWeekContainsDate ??
    1;

  const year = (0, _index3.getWeekYear)(date, options);
  const firstWeek = (0, _index2.constructFrom)(options?.in || date, 0);
  firstWeek.setFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setHours(0, 0, 0, 0);
  const _date = (0, _index4.startOfWeek)(firstWeek, options);
  return _date;
}


/***/ }),

/***/ "./node_modules/date-fns/startOfYear.cjs":
/*!***********************************************!*\
  !*** ./node_modules/date-fns/startOfYear.cjs ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.startOfYear = startOfYear;
var _index = __webpack_require__(/*! ./toDate.cjs */ "./node_modules/date-fns/toDate.cjs");

/**
 * The {@link startOfYear} function options.
 */

/**
 * @name startOfYear
 * @category Year Helpers
 * @summary Return the start of a year for the given date.
 *
 * @description
 * Return the start of a year for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - The options
 *
 * @returns The start of a year
 *
 * @example
 * // The start of a year for 2 September 2014 11:55:00:
 * const result = startOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Jan 01 2014 00:00:00
 */
function startOfYear(date, options) {
  const date_ = (0, _index.toDate)(date, options?.in);
  date_.setFullYear(date_.getFullYear(), 0, 1);
  date_.setHours(0, 0, 0, 0);
  return date_;
}


/***/ }),

/***/ "./node_modules/date-fns/startOfYesterday.cjs":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/startOfYesterday.cjs ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.startOfYesterday = startOfYesterday;
var _index = __webpack_require__(/*! ./constructNow.cjs */ "./node_modules/date-fns/constructNow.cjs");

/**
 * The {@link startOfYesterday} function options.
 */

/**
 * @name startOfYesterday
 * @category Day Helpers
 * @summary Return the start of yesterday.
 * @pure false
 *
 * @typeParam ContextDate - The `Date` type of the context function.
 *
 * @param options - An object with options
 *
 * @description
 * Return the start of yesterday.
 *
 * @returns The start of yesterday
 *
 * @example
 * // If today is 6 October 2014:
 * const result = startOfYesterday()
 * //=> Sun Oct 5 2014 00:00:00
 */
function startOfYesterday(options) {
  const now = (0, _index.constructNow)(options?.in);
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();

  const date = (0, _index.constructNow)(options?.in);
  date.setFullYear(year, month, day - 1);
  date.setHours(0, 0, 0, 0);
  return date;
}


/***/ }),

/***/ "./node_modules/date-fns/sub.cjs":
/*!***************************************!*\
  !*** ./node_modules/date-fns/sub.cjs ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.sub = sub;
var _index = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");
var _index2 = __webpack_require__(/*! ./subDays.cjs */ "./node_modules/date-fns/subDays.cjs");
var _index3 = __webpack_require__(/*! ./subMonths.cjs */ "./node_modules/date-fns/subMonths.cjs");

/**
 * The {@link sub} function options.
 */

/**
 * @name sub
 * @category Common Helpers
 * @summary Subtract the specified years, months, weeks, days, hours, minutes and seconds from the given date.
 *
 * @description
 * Subtract the specified years, months, weeks, days, hours, minutes and seconds from the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param duration - The object with years, months, weeks, days, hours, minutes and seconds to be subtracted
 * @param options - An object with options
 *
 * | Key     | Description                        |
 * |---------|------------------------------------|
 * | years   | Amount of years to be subtracted   |
 * | months  | Amount of months to be subtracted  |
 * | weeks   | Amount of weeks to be subtracted   |
 * | days    | Amount of days to be subtracted    |
 * | hours   | Amount of hours to be subtracted   |
 * | minutes | Amount of minutes to be subtracted |
 * | seconds | Amount of seconds to be subtracted |
 *
 * All values default to 0
 *
 * @returns The new date with the seconds subtracted
 *
 * @example
 * // Subtract the following duration from 15 June 2017 15:29:20
 * const result = sub(new Date(2017, 5, 15, 15, 29, 20), {
 *   years: 2,
 *   months: 9,
 *   weeks: 1,
 *   days: 7,
 *   hours: 5,
 *   minutes: 9,
 *   seconds: 30
 * })
 * //=> Mon Sep 1 2014 10:19:50
 */
function sub(date, duration, options) {
  const {
    years = 0,
    months = 0,
    weeks = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
  } = duration;

  const withoutMonths = (0, _index3.subMonths)(
    date,
    months + years * 12,
    options,
  );
  const withoutDays = (0, _index2.subDays)(
    withoutMonths,
    days + weeks * 7,
    options,
  );

  const minutesToSub = minutes + hours * 60;
  const secondsToSub = seconds + minutesToSub * 60;
  const msToSub = secondsToSub * 1000;

  return (0, _index.constructFrom)(options?.in || date, +withoutDays - msToSub);
}


/***/ }),

/***/ "./node_modules/date-fns/subBusinessDays.cjs":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/subBusinessDays.cjs ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.subBusinessDays = subBusinessDays;
var _index = __webpack_require__(/*! ./addBusinessDays.cjs */ "./node_modules/date-fns/addBusinessDays.cjs");

/**
 * The {@link subBusinessDays} function options.
 */

/**
 * @name subBusinessDays
 * @category Day Helpers
 * @summary Subtract the specified number of business days (mon - fri) from the given date.
 *
 * @description
 * Subtract the specified number of business days (mon - fri) from the given date, ignoring weekends.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of business days to be subtracted.
 * @param options - An object with options
 *
 * @returns The new date with the business days subtracted
 *
 * @example
 * // Subtract 10 business days from 1 September 2014:
 * const result = subBusinessDays(new Date(2014, 8, 1), 10)
 * //=> Mon Aug 18 2014 00:00:00 (skipped weekend days)
 */
function subBusinessDays(date, amount, options) {
  return (0, _index.addBusinessDays)(date, -amount, options);
}


/***/ }),

/***/ "./node_modules/date-fns/subDays.cjs":
/*!*******************************************!*\
  !*** ./node_modules/date-fns/subDays.cjs ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.subDays = subDays;
var _index = __webpack_require__(/*! ./addDays.cjs */ "./node_modules/date-fns/addDays.cjs");

/**
 * The {@link subDays} function options.
 */

/**
 * @name subDays
 * @category Day Helpers
 * @summary Subtract the specified number of days from the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of days to be subtracted.
 * @param options - An object with options
 *
 * @returns The new date with the days subtracted
 *
 * @example
 * // Subtract 10 days from 1 September 2014:
 * const result = subDays(new Date(2014, 8, 1), 10)
 * //=> Fri Aug 22 2014 00:00:00
 */
function subDays(date, amount, options) {
  return (0, _index.addDays)(date, -amount, options);
}


/***/ }),

/***/ "./node_modules/date-fns/subHours.cjs":
/*!********************************************!*\
  !*** ./node_modules/date-fns/subHours.cjs ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.subHours = subHours;
var _index = __webpack_require__(/*! ./addHours.cjs */ "./node_modules/date-fns/addHours.cjs");

/**
 * The {@link subHours} function options.
 */

/**
 * @name subHours
 * @category Hour Helpers
 * @summary Subtract the specified number of hours from the given date.
 *
 * @description
 * Subtract the specified number of hours from the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of hours to be subtracted.
 * @param options - The options
 *
 * @returns The new date with the hours subtracted
 *
 * @example
 * // Subtract 2 hours from 11 July 2014 01:00:00:
 * const result = subHours(new Date(2014, 6, 11, 1, 0), 2)
 * //=> Thu Jul 10 2014 23:00:00
 */
function subHours(date, amount, options) {
  return (0, _index.addHours)(date, -amount, options);
}


/***/ }),

/***/ "./node_modules/date-fns/subISOWeekYears.cjs":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/subISOWeekYears.cjs ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.subISOWeekYears = subISOWeekYears;
var _index = __webpack_require__(/*! ./addISOWeekYears.cjs */ "./node_modules/date-fns/addISOWeekYears.cjs");

/**
 * The {@link subISOWeekYears} function options.
 */

/**
 * @name subISOWeekYears
 * @category ISO Week-Numbering Year Helpers
 * @summary Subtract the specified number of ISO week-numbering years from the given date.
 *
 * @description
 * Subtract the specified number of ISO week-numbering years from the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of ISO week-numbering years to be subtracted.
 * @param options - The options
 *
 * @returns The new date with the ISO week-numbering years subtracted
 *
 * @example
 * // Subtract 5 ISO week-numbering years from 1 September 2014:
 * const result = subISOWeekYears(new Date(2014, 8, 1), 5)
 * //=> Mon Aug 31 2009 00:00:00
 */
function subISOWeekYears(date, amount, options) {
  return (0, _index.addISOWeekYears)(date, -amount, options);
}


/***/ }),

/***/ "./node_modules/date-fns/subMilliseconds.cjs":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/subMilliseconds.cjs ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.subMilliseconds = subMilliseconds;
var _index = __webpack_require__(/*! ./addMilliseconds.cjs */ "./node_modules/date-fns/addMilliseconds.cjs");

/**
 * The {@link subMilliseconds} function options.
 */

/**
 * Subtract the specified number of milliseconds from the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of milliseconds to be subtracted.
 * @param options - An object with options
 *
 * @returns The new date with the milliseconds subtracted
 */
function subMilliseconds(date, amount, options) {
  return (0, _index.addMilliseconds)(date, -amount, options);
}


/***/ }),

/***/ "./node_modules/date-fns/subMinutes.cjs":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/subMinutes.cjs ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.subMinutes = subMinutes;
var _index = __webpack_require__(/*! ./addMinutes.cjs */ "./node_modules/date-fns/addMinutes.cjs");

/**
 * The {@link subMinutes} function options.
 */

/**
 * @name subMinutes
 * @category Minute Helpers
 * @summary Subtract the specified number of minutes from the given date.
 *
 * @description
 * Subtract the specified number of minutes from the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of minutes to be subtracted.
 * @param options - An object with options
 *
 * @returns The new date with the minutes subtracted
 *
 * @example
 * // Subtract 30 minutes from 10 July 2014 12:00:00:
 * const result = subMinutes(new Date(2014, 6, 10, 12, 0), 30)
 * //=> Thu Jul 10 2014 11:30:00
 */
function subMinutes(date, amount, options) {
  return (0, _index.addMinutes)(date, -amount, options);
}


/***/ }),

/***/ "./node_modules/date-fns/subMonths.cjs":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/subMonths.cjs ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.subMonths = subMonths;
var _index = __webpack_require__(/*! ./addMonths.cjs */ "./node_modules/date-fns/addMonths.cjs");

/**
 * The subMonths function options.
 */

/**
 * @name subMonths
 * @category Month Helpers
 * @summary Subtract the specified number of months from the given date.
 *
 * @description
 * Subtract the specified number of months from the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of months to be subtracted.
 * @param options - An object with options
 *
 * @returns The new date with the months subtracted
 *
 * @example
 * // Subtract 5 months from 1 February 2015:
 * const result = subMonths(new Date(2015, 1, 1), 5)
 * //=> Mon Sep 01 2014 00:00:00
 */
function subMonths(date, amount, options) {
  return (0, _index.addMonths)(date, -amount, options);
}


/***/ }),

/***/ "./node_modules/date-fns/subQuarters.cjs":
/*!***********************************************!*\
  !*** ./node_modules/date-fns/subQuarters.cjs ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.subQuarters = subQuarters;
var _index = __webpack_require__(/*! ./addQuarters.cjs */ "./node_modules/date-fns/addQuarters.cjs");

/**
 * The {@link subQuarters} function options.
 */

/**
 * @name subQuarters
 * @category Quarter Helpers
 * @summary Subtract the specified number of year quarters from the given date.
 *
 * @description
 * Subtract the specified number of year quarters from the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of quarters to be subtracted.
 * @param options - An object with options
 *
 * @returns The new date with the quarters subtracted
 *
 * @example
 * // Subtract 3 quarters from 1 September 2014:
 * const result = subQuarters(new Date(2014, 8, 1), 3)
 * //=> Sun Dec 01 2013 00:00:00
 */
function subQuarters(date, amount, options) {
  return (0, _index.addQuarters)(date, -amount, options);
}


/***/ }),

/***/ "./node_modules/date-fns/subSeconds.cjs":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/subSeconds.cjs ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.subSeconds = subSeconds;
var _index = __webpack_require__(/*! ./addSeconds.cjs */ "./node_modules/date-fns/addSeconds.cjs");

/**
 * The {@link subSeconds} function options.
 */

/**
 * Subtract the specified number of seconds from the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of seconds to be subtracted.
 * @param options - The options
 *
 * @returns The new date with the seconds subtracted
 *
 * @example
 * // Subtract 30 seconds from 10 July 2014 12:45:00:
 * const result = subSeconds(new Date(2014, 6, 10, 12, 45, 0), 30)
 * //=> Thu Jul 10 2014 12:44:30
 */
function subSeconds(date, amount, options) {
  return (0, _index.addSeconds)(date, -amount, options);
}


/***/ }),

/***/ "./node_modules/date-fns/subWeeks.cjs":
/*!********************************************!*\
  !*** ./node_modules/date-fns/subWeeks.cjs ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.subWeeks = subWeeks;
var _index = __webpack_require__(/*! ./addWeeks.cjs */ "./node_modules/date-fns/addWeeks.cjs");

/**
 * The {@link subWeeks} function options.
 */

/**
 * @name subWeeks
 * @category Week Helpers
 * @summary Subtract the specified number of weeks from the given date.
 *
 * @description
 * Subtract the specified number of weeks from the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of weeks to be subtracted.
 * @param options - An object with options
 *
 * @returns The new date with the weeks subtracted
 *
 * @example
 * // Subtract 4 weeks from 1 September 2014:
 * const result = subWeeks(new Date(2014, 8, 1), 4)
 * //=> Mon Aug 04 2014 00:00:00
 */
function subWeeks(date, amount, options) {
  return (0, _index.addWeeks)(date, -amount, options);
}


/***/ }),

/***/ "./node_modules/date-fns/subYears.cjs":
/*!********************************************!*\
  !*** ./node_modules/date-fns/subYears.cjs ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.subYears = subYears;
var _index = __webpack_require__(/*! ./addYears.cjs */ "./node_modules/date-fns/addYears.cjs");

/**
 * The {@link subYears} function options.
 */

/**
 * @name subYears
 * @category Year Helpers
 * @summary Subtract the specified number of years from the given date.
 *
 * @description
 * Subtract the specified number of years from the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of years to be subtracted.
 * @param options - An object with options
 *
 * @returns The new date with the years subtracted
 *
 * @example
 * // Subtract 5 years from 1 September 2014:
 * const result = subYears(new Date(2014, 8, 1), 5)
 * //=> Tue Sep 01 2009 00:00:00
 */
function subYears(date, amount, options) {
  return (0, _index.addYears)(date, -amount, options);
}


/***/ }),

/***/ "./node_modules/date-fns/toDate.cjs":
/*!******************************************!*\
  !*** ./node_modules/date-fns/toDate.cjs ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.toDate = toDate;
var _index = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");

/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * Starting from v3.7.0, it clones a date using `[Symbol.for("constructDateFrom")]`
 * enabling to transfer extra properties from the reference date to the new date.
 * It's useful for extensions like [`TZDate`](https://github.com/date-fns/tz)
 * that accept a time zone as a constructor argument.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param argument - The value to convert
 *
 * @returns The parsed date in the local time zone
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */
function toDate(argument, context) {
  // [TODO] Get rid of `toDate` or `constructFrom`?
  return (0, _index.constructFrom)(context || argument, argument);
}


/***/ }),

/***/ "./node_modules/date-fns/transpose.cjs":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/transpose.cjs ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.transpose = transpose;
var _index = __webpack_require__(/*! ./constructFrom.cjs */ "./node_modules/date-fns/constructFrom.cjs");

/**
 * @name transpose
 * @category Generic Helpers
 * @summary Transpose the date to the given constructor.
 *
 * @description
 * The function transposes the date to the given constructor. It helps you
 * to transpose the date in the system time zone to say `UTCDate` or any other
 * date extension.
 *
 * @typeParam InputDate - The input `Date` type derived from the passed argument.
 * @typeParam ResultDate - The result `Date` type derived from the passed constructor.
 *
 * @param date - The date to use values from
 * @param constructor - The date constructor to use
 *
 * @returns Date transposed to the given constructor
 *
 * @example
 * // Create July 10, 2022 00:00 in locale time zone
 * const date = new Date(2022, 6, 10)
 * //=> 'Sun Jul 10 2022 00:00:00 GMT+0800 (Singapore Standard Time)'
 *
 * @example
 * // Transpose the date to July 10, 2022 00:00 in UTC
 * transpose(date, UTCDate)
 * //=> 'Sun Jul 10 2022 00:00:00 GMT+0000 (Coordinated Universal Time)'
 */
function transpose(date, constructor) {
  const date_ = isConstructor(constructor)
    ? new constructor(0)
    : (0, _index.constructFrom)(constructor, 0);
  date_.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
  date_.setHours(
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds(),
  );
  return date_;
}

function isConstructor(constructor) {
  return (
    typeof constructor === "function" &&
    constructor.prototype?.constructor === constructor
  );
}


/***/ }),

/***/ "./node_modules/date-fns/weeksToDays.cjs":
/*!***********************************************!*\
  !*** ./node_modules/date-fns/weeksToDays.cjs ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.weeksToDays = weeksToDays;
var _index = __webpack_require__(/*! ./constants.cjs */ "./node_modules/date-fns/constants.cjs");

/**
 * @name weeksToDays
 * @category Conversion Helpers
 * @summary Convert weeks to days.
 *
 * @description
 * Convert a number of weeks to a full number of days.
 *
 * @param weeks - The number of weeks to be converted
 *
 * @returns The number of weeks converted in days
 *
 * @example
 * // Convert 2 weeks into days
 * const result = weeksToDays(2)
 * //=> 14
 */
function weeksToDays(weeks) {
  return Math.trunc(weeks * _index.daysInWeek);
}


/***/ }),

/***/ "./node_modules/date-fns/yearsToDays.cjs":
/*!***********************************************!*\
  !*** ./node_modules/date-fns/yearsToDays.cjs ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.yearsToDays = yearsToDays;
var _index = __webpack_require__(/*! ./constants.cjs */ "./node_modules/date-fns/constants.cjs");

/**
 * @name yearsToDays
 * @category Conversion Helpers
 * @summary Convert years to days.
 *
 * @description
 * Convert a number of years to a full number of days.
 *
 * @param years - The number of years to be converted
 *
 * @returns The number of years converted in days
 *
 * @example
 * // Convert 2 years into days
 * const result = yearsToDays(2)
 * //=> 730
 */
function yearsToDays(years) {
  return Math.trunc(years * _index.daysInYear);
}


/***/ }),

/***/ "./node_modules/date-fns/yearsToMonths.cjs":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/yearsToMonths.cjs ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.yearsToMonths = yearsToMonths;
var _index = __webpack_require__(/*! ./constants.cjs */ "./node_modules/date-fns/constants.cjs");

/**
 * @name yearsToMonths
 * @category Conversion Helpers
 * @summary Convert years to months.
 *
 * @description
 * Convert a number of years to a full number of months.
 *
 * @param years - The number of years to be converted
 *
 * @returns The number of years converted in months
 *
 * @example
 * // Convert 2 years into months
 * const result = yearsToMonths(2)
 * //=> 24
 */
function yearsToMonths(years) {
  return Math.trunc(years * _index.monthsInYear);
}


/***/ }),

/***/ "./node_modules/date-fns/yearsToQuarters.cjs":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/yearsToQuarters.cjs ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.yearsToQuarters = yearsToQuarters;
var _index = __webpack_require__(/*! ./constants.cjs */ "./node_modules/date-fns/constants.cjs");

/**
 * @name yearsToQuarters
 * @category Conversion Helpers
 * @summary Convert years to quarters.
 *
 * @description
 * Convert a number of years to a full number of quarters.
 *
 * @param years - The number of years to be converted
 *
 * @returns The number of years converted in quarters
 *
 * @example
 * // Convert 2 years to quarters
 * const result = yearsToQuarters(2)
 * //=> 8
 */
function yearsToQuarters(years) {
  return Math.trunc(years * _index.quartersInYear);
}


/***/ }),

/***/ "./node_modules/phoenix/priv/static/phoenix.cjs.js":
/*!*********************************************************!*\
  !*** ./node_modules/phoenix/priv/static/phoenix.cjs.js ***!
  \*********************************************************/
/***/ ((module) => {

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// js/phoenix/index.js
var phoenix_exports = {};
__export(phoenix_exports, {
  Channel: () => Channel,
  LongPoll: () => LongPoll,
  Presence: () => Presence,
  Serializer: () => serializer_default,
  Socket: () => Socket
});
module.exports = __toCommonJS(phoenix_exports);

// js/phoenix/utils.js
var closure = (value) => {
  if (typeof value === "function") {
    return value;
  } else {
    let closure2 = function() {
      return value;
    };
    return closure2;
  }
};

// js/phoenix/constants.js
var globalSelf = typeof self !== "undefined" ? self : null;
var phxWindow = typeof window !== "undefined" ? window : null;
var global = globalSelf || phxWindow || global;
var DEFAULT_VSN = "2.0.0";
var SOCKET_STATES = { connecting: 0, open: 1, closing: 2, closed: 3 };
var DEFAULT_TIMEOUT = 1e4;
var WS_CLOSE_NORMAL = 1e3;
var CHANNEL_STATES = {
  closed: "closed",
  errored: "errored",
  joined: "joined",
  joining: "joining",
  leaving: "leaving"
};
var CHANNEL_EVENTS = {
  close: "phx_close",
  error: "phx_error",
  join: "phx_join",
  reply: "phx_reply",
  leave: "phx_leave"
};
var TRANSPORTS = {
  longpoll: "longpoll",
  websocket: "websocket"
};
var XHR_STATES = {
  complete: 4
};

// js/phoenix/push.js
var Push = class {
  constructor(channel, event, payload, timeout) {
    this.channel = channel;
    this.event = event;
    this.payload = payload || function() {
      return {};
    };
    this.receivedResp = null;
    this.timeout = timeout;
    this.timeoutTimer = null;
    this.recHooks = [];
    this.sent = false;
  }
  /**
   *
   * @param {number} timeout
   */
  resend(timeout) {
    this.timeout = timeout;
    this.reset();
    this.send();
  }
  /**
   *
   */
  send() {
    if (this.hasReceived("timeout")) {
      return;
    }
    this.startTimeout();
    this.sent = true;
    this.channel.socket.push({
      topic: this.channel.topic,
      event: this.event,
      payload: this.payload(),
      ref: this.ref,
      join_ref: this.channel.joinRef()
    });
  }
  /**
   *
   * @param {*} status
   * @param {*} callback
   */
  receive(status, callback) {
    if (this.hasReceived(status)) {
      callback(this.receivedResp.response);
    }
    this.recHooks.push({ status, callback });
    return this;
  }
  /**
   * @private
   */
  reset() {
    this.cancelRefEvent();
    this.ref = null;
    this.refEvent = null;
    this.receivedResp = null;
    this.sent = false;
  }
  /**
   * @private
   */
  matchReceive({ status, response, _ref }) {
    this.recHooks.filter((h) => h.status === status).forEach((h) => h.callback(response));
  }
  /**
   * @private
   */
  cancelRefEvent() {
    if (!this.refEvent) {
      return;
    }
    this.channel.off(this.refEvent);
  }
  /**
   * @private
   */
  cancelTimeout() {
    clearTimeout(this.timeoutTimer);
    this.timeoutTimer = null;
  }
  /**
   * @private
   */
  startTimeout() {
    if (this.timeoutTimer) {
      this.cancelTimeout();
    }
    this.ref = this.channel.socket.makeRef();
    this.refEvent = this.channel.replyEventName(this.ref);
    this.channel.on(this.refEvent, (payload) => {
      this.cancelRefEvent();
      this.cancelTimeout();
      this.receivedResp = payload;
      this.matchReceive(payload);
    });
    this.timeoutTimer = setTimeout(() => {
      this.trigger("timeout", {});
    }, this.timeout);
  }
  /**
   * @private
   */
  hasReceived(status) {
    return this.receivedResp && this.receivedResp.status === status;
  }
  /**
   * @private
   */
  trigger(status, response) {
    this.channel.trigger(this.refEvent, { status, response });
  }
};

// js/phoenix/timer.js
var Timer = class {
  constructor(callback, timerCalc) {
    this.callback = callback;
    this.timerCalc = timerCalc;
    this.timer = null;
    this.tries = 0;
  }
  reset() {
    this.tries = 0;
    clearTimeout(this.timer);
  }
  /**
   * Cancels any previous scheduleTimeout and schedules callback
   */
  scheduleTimeout() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.tries = this.tries + 1;
      this.callback();
    }, this.timerCalc(this.tries + 1));
  }
};

// js/phoenix/channel.js
var Channel = class {
  constructor(topic, params, socket) {
    this.state = CHANNEL_STATES.closed;
    this.topic = topic;
    this.params = closure(params || {});
    this.socket = socket;
    this.bindings = [];
    this.bindingRef = 0;
    this.timeout = this.socket.timeout;
    this.joinedOnce = false;
    this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout);
    this.pushBuffer = [];
    this.stateChangeRefs = [];
    this.rejoinTimer = new Timer(() => {
      if (this.socket.isConnected()) {
        this.rejoin();
      }
    }, this.socket.rejoinAfterMs);
    this.stateChangeRefs.push(this.socket.onError(() => this.rejoinTimer.reset()));
    this.stateChangeRefs.push(
      this.socket.onOpen(() => {
        this.rejoinTimer.reset();
        if (this.isErrored()) {
          this.rejoin();
        }
      })
    );
    this.joinPush.receive("ok", () => {
      this.state = CHANNEL_STATES.joined;
      this.rejoinTimer.reset();
      this.pushBuffer.forEach((pushEvent) => pushEvent.send());
      this.pushBuffer = [];
    });
    this.joinPush.receive("error", () => {
      this.state = CHANNEL_STATES.errored;
      if (this.socket.isConnected()) {
        this.rejoinTimer.scheduleTimeout();
      }
    });
    this.onClose(() => {
      this.rejoinTimer.reset();
      if (this.socket.hasLogger())
        this.socket.log("channel", `close ${this.topic} ${this.joinRef()}`);
      this.state = CHANNEL_STATES.closed;
      this.socket.remove(this);
    });
    this.onError((reason) => {
      if (this.socket.hasLogger())
        this.socket.log("channel", `error ${this.topic}`, reason);
      if (this.isJoining()) {
        this.joinPush.reset();
      }
      this.state = CHANNEL_STATES.errored;
      if (this.socket.isConnected()) {
        this.rejoinTimer.scheduleTimeout();
      }
    });
    this.joinPush.receive("timeout", () => {
      if (this.socket.hasLogger())
        this.socket.log("channel", `timeout ${this.topic} (${this.joinRef()})`, this.joinPush.timeout);
      let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), this.timeout);
      leavePush.send();
      this.state = CHANNEL_STATES.errored;
      this.joinPush.reset();
      if (this.socket.isConnected()) {
        this.rejoinTimer.scheduleTimeout();
      }
    });
    this.on(CHANNEL_EVENTS.reply, (payload, ref) => {
      this.trigger(this.replyEventName(ref), payload);
    });
  }
  /**
   * Join the channel
   * @param {integer} timeout
   * @returns {Push}
   */
  join(timeout = this.timeout) {
    if (this.joinedOnce) {
      throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");
    } else {
      this.timeout = timeout;
      this.joinedOnce = true;
      this.rejoin();
      return this.joinPush;
    }
  }
  /**
   * Hook into channel close
   * @param {Function} callback
   */
  onClose(callback) {
    this.on(CHANNEL_EVENTS.close, callback);
  }
  /**
   * Hook into channel errors
   * @param {Function} callback
   */
  onError(callback) {
    return this.on(CHANNEL_EVENTS.error, (reason) => callback(reason));
  }
  /**
   * Subscribes on channel events
   *
   * Subscription returns a ref counter, which can be used later to
   * unsubscribe the exact event listener
   *
   * @example
   * const ref1 = channel.on("event", do_stuff)
   * const ref2 = channel.on("event", do_other_stuff)
   * channel.off("event", ref1)
   * // Since unsubscription, do_stuff won't fire,
   * // while do_other_stuff will keep firing on the "event"
   *
   * @param {string} event
   * @param {Function} callback
   * @returns {integer} ref
   */
  on(event, callback) {
    let ref = this.bindingRef++;
    this.bindings.push({ event, ref, callback });
    return ref;
  }
  /**
   * Unsubscribes off of channel events
   *
   * Use the ref returned from a channel.on() to unsubscribe one
   * handler, or pass nothing for the ref to unsubscribe all
   * handlers for the given event.
   *
   * @example
   * // Unsubscribe the do_stuff handler
   * const ref1 = channel.on("event", do_stuff)
   * channel.off("event", ref1)
   *
   * // Unsubscribe all handlers from event
   * channel.off("event")
   *
   * @param {string} event
   * @param {integer} ref
   */
  off(event, ref) {
    this.bindings = this.bindings.filter((bind) => {
      return !(bind.event === event && (typeof ref === "undefined" || ref === bind.ref));
    });
  }
  /**
   * @private
   */
  canPush() {
    return this.socket.isConnected() && this.isJoined();
  }
  /**
   * Sends a message `event` to phoenix with the payload `payload`.
   * Phoenix receives this in the `handle_in(event, payload, socket)`
   * function. if phoenix replies or it times out (default 10000ms),
   * then optionally the reply can be received.
   *
   * @example
   * channel.push("event")
   *   .receive("ok", payload => console.log("phoenix replied:", payload))
   *   .receive("error", err => console.log("phoenix errored", err))
   *   .receive("timeout", () => console.log("timed out pushing"))
   * @param {string} event
   * @param {Object} payload
   * @param {number} [timeout]
   * @returns {Push}
   */
  push(event, payload, timeout = this.timeout) {
    payload = payload || {};
    if (!this.joinedOnce) {
      throw new Error(`tried to push '${event}' to '${this.topic}' before joining. Use channel.join() before pushing events`);
    }
    let pushEvent = new Push(this, event, function() {
      return payload;
    }, timeout);
    if (this.canPush()) {
      pushEvent.send();
    } else {
      pushEvent.startTimeout();
      this.pushBuffer.push(pushEvent);
    }
    return pushEvent;
  }
  /** Leaves the channel
   *
   * Unsubscribes from server events, and
   * instructs channel to terminate on server
   *
   * Triggers onClose() hooks
   *
   * To receive leave acknowledgements, use the `receive`
   * hook to bind to the server ack, ie:
   *
   * @example
   * channel.leave().receive("ok", () => alert("left!") )
   *
   * @param {integer} timeout
   * @returns {Push}
   */
  leave(timeout = this.timeout) {
    this.rejoinTimer.reset();
    this.joinPush.cancelTimeout();
    this.state = CHANNEL_STATES.leaving;
    let onClose = () => {
      if (this.socket.hasLogger())
        this.socket.log("channel", `leave ${this.topic}`);
      this.trigger(CHANNEL_EVENTS.close, "leave");
    };
    let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), timeout);
    leavePush.receive("ok", () => onClose()).receive("timeout", () => onClose());
    leavePush.send();
    if (!this.canPush()) {
      leavePush.trigger("ok", {});
    }
    return leavePush;
  }
  /**
   * Overridable message hook
   *
   * Receives all events for specialized message handling
   * before dispatching to the channel callbacks.
   *
   * Must return the payload, modified or unmodified
   * @param {string} event
   * @param {Object} payload
   * @param {integer} ref
   * @returns {Object}
   */
  onMessage(_event, payload, _ref) {
    return payload;
  }
  /**
   * @private
   */
  isMember(topic, event, payload, joinRef) {
    if (this.topic !== topic) {
      return false;
    }
    if (joinRef && joinRef !== this.joinRef()) {
      if (this.socket.hasLogger())
        this.socket.log("channel", "dropping outdated message", { topic, event, payload, joinRef });
      return false;
    } else {
      return true;
    }
  }
  /**
   * @private
   */
  joinRef() {
    return this.joinPush.ref;
  }
  /**
   * @private
   */
  rejoin(timeout = this.timeout) {
    if (this.isLeaving()) {
      return;
    }
    this.socket.leaveOpenTopic(this.topic);
    this.state = CHANNEL_STATES.joining;
    this.joinPush.resend(timeout);
  }
  /**
   * @private
   */
  trigger(event, payload, ref, joinRef) {
    let handledPayload = this.onMessage(event, payload, ref, joinRef);
    if (payload && !handledPayload) {
      throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");
    }
    let eventBindings = this.bindings.filter((bind) => bind.event === event);
    for (let i = 0; i < eventBindings.length; i++) {
      let bind = eventBindings[i];
      bind.callback(handledPayload, ref, joinRef || this.joinRef());
    }
  }
  /**
   * @private
   */
  replyEventName(ref) {
    return `chan_reply_${ref}`;
  }
  /**
   * @private
   */
  isClosed() {
    return this.state === CHANNEL_STATES.closed;
  }
  /**
   * @private
   */
  isErrored() {
    return this.state === CHANNEL_STATES.errored;
  }
  /**
   * @private
   */
  isJoined() {
    return this.state === CHANNEL_STATES.joined;
  }
  /**
   * @private
   */
  isJoining() {
    return this.state === CHANNEL_STATES.joining;
  }
  /**
   * @private
   */
  isLeaving() {
    return this.state === CHANNEL_STATES.leaving;
  }
};

// js/phoenix/ajax.js
var Ajax = class {
  static request(method, endPoint, accept, body, timeout, ontimeout, callback) {
    if (global.XDomainRequest) {
      let req = new global.XDomainRequest();
      return this.xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback);
    } else {
      let req = new global.XMLHttpRequest();
      return this.xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback);
    }
  }
  static xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback) {
    req.timeout = timeout;
    req.open(method, endPoint);
    req.onload = () => {
      let response = this.parseJSON(req.responseText);
      callback && callback(response);
    };
    if (ontimeout) {
      req.ontimeout = ontimeout;
    }
    req.onprogress = () => {
    };
    req.send(body);
    return req;
  }
  static xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback) {
    req.open(method, endPoint, true);
    req.timeout = timeout;
    req.setRequestHeader("Content-Type", accept);
    req.onerror = () => callback && callback(null);
    req.onreadystatechange = () => {
      if (req.readyState === XHR_STATES.complete && callback) {
        let response = this.parseJSON(req.responseText);
        callback(response);
      }
    };
    if (ontimeout) {
      req.ontimeout = ontimeout;
    }
    req.send(body);
    return req;
  }
  static parseJSON(resp) {
    if (!resp || resp === "") {
      return null;
    }
    try {
      return JSON.parse(resp);
    } catch (e) {
      console && console.log("failed to parse JSON response", resp);
      return null;
    }
  }
  static serialize(obj, parentKey) {
    let queryStr = [];
    for (var key in obj) {
      if (!Object.prototype.hasOwnProperty.call(obj, key)) {
        continue;
      }
      let paramKey = parentKey ? `${parentKey}[${key}]` : key;
      let paramVal = obj[key];
      if (typeof paramVal === "object") {
        queryStr.push(this.serialize(paramVal, paramKey));
      } else {
        queryStr.push(encodeURIComponent(paramKey) + "=" + encodeURIComponent(paramVal));
      }
    }
    return queryStr.join("&");
  }
  static appendParams(url, params) {
    if (Object.keys(params).length === 0) {
      return url;
    }
    let prefix = url.match(/\?/) ? "&" : "?";
    return `${url}${prefix}${this.serialize(params)}`;
  }
};

// js/phoenix/longpoll.js
var arrayBufferToBase64 = (buffer) => {
  let binary = "";
  let bytes = new Uint8Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};
var LongPoll = class {
  constructor(endPoint) {
    this.endPoint = null;
    this.token = null;
    this.skipHeartbeat = true;
    this.reqs = /* @__PURE__ */ new Set();
    this.awaitingBatchAck = false;
    this.currentBatch = null;
    this.currentBatchTimer = null;
    this.batchBuffer = [];
    this.onopen = function() {
    };
    this.onerror = function() {
    };
    this.onmessage = function() {
    };
    this.onclose = function() {
    };
    this.pollEndpoint = this.normalizeEndpoint(endPoint);
    this.readyState = SOCKET_STATES.connecting;
    setTimeout(() => this.poll(), 0);
  }
  normalizeEndpoint(endPoint) {
    return endPoint.replace("ws://", "http://").replace("wss://", "https://").replace(new RegExp("(.*)/" + TRANSPORTS.websocket), "$1/" + TRANSPORTS.longpoll);
  }
  endpointURL() {
    return Ajax.appendParams(this.pollEndpoint, { token: this.token });
  }
  closeAndRetry(code, reason, wasClean) {
    this.close(code, reason, wasClean);
    this.readyState = SOCKET_STATES.connecting;
  }
  ontimeout() {
    this.onerror("timeout");
    this.closeAndRetry(1005, "timeout", false);
  }
  isActive() {
    return this.readyState === SOCKET_STATES.open || this.readyState === SOCKET_STATES.connecting;
  }
  poll() {
    this.ajax("GET", "application/json", null, () => this.ontimeout(), (resp) => {
      if (resp) {
        var { status, token, messages } = resp;
        this.token = token;
      } else {
        status = 0;
      }
      switch (status) {
        case 200:
          messages.forEach((msg) => {
            setTimeout(() => this.onmessage({ data: msg }), 0);
          });
          this.poll();
          break;
        case 204:
          this.poll();
          break;
        case 410:
          this.readyState = SOCKET_STATES.open;
          this.onopen({});
          this.poll();
          break;
        case 403:
          this.onerror(403);
          this.close(1008, "forbidden", false);
          break;
        case 0:
        case 500:
          this.onerror(500);
          this.closeAndRetry(1011, "internal server error", 500);
          break;
        default:
          throw new Error(`unhandled poll status ${status}`);
      }
    });
  }
  // we collect all pushes within the current event loop by
  // setTimeout 0, which optimizes back-to-back procedural
  // pushes against an empty buffer
  send(body) {
    if (typeof body !== "string") {
      body = arrayBufferToBase64(body);
    }
    if (this.currentBatch) {
      this.currentBatch.push(body);
    } else if (this.awaitingBatchAck) {
      this.batchBuffer.push(body);
    } else {
      this.currentBatch = [body];
      this.currentBatchTimer = setTimeout(() => {
        this.batchSend(this.currentBatch);
        this.currentBatch = null;
      }, 0);
    }
  }
  batchSend(messages) {
    this.awaitingBatchAck = true;
    this.ajax("POST", "application/x-ndjson", messages.join("\n"), () => this.onerror("timeout"), (resp) => {
      this.awaitingBatchAck = false;
      if (!resp || resp.status !== 200) {
        this.onerror(resp && resp.status);
        this.closeAndRetry(1011, "internal server error", false);
      } else if (this.batchBuffer.length > 0) {
        this.batchSend(this.batchBuffer);
        this.batchBuffer = [];
      }
    });
  }
  close(code, reason, wasClean) {
    for (let req of this.reqs) {
      req.abort();
    }
    this.readyState = SOCKET_STATES.closed;
    let opts = Object.assign({ code: 1e3, reason: void 0, wasClean: true }, { code, reason, wasClean });
    this.batchBuffer = [];
    clearTimeout(this.currentBatchTimer);
    this.currentBatchTimer = null;
    if (typeof CloseEvent !== "undefined") {
      this.onclose(new CloseEvent("close", opts));
    } else {
      this.onclose(opts);
    }
  }
  ajax(method, contentType, body, onCallerTimeout, callback) {
    let req;
    let ontimeout = () => {
      this.reqs.delete(req);
      onCallerTimeout();
    };
    req = Ajax.request(method, this.endpointURL(), contentType, body, this.timeout, ontimeout, (resp) => {
      this.reqs.delete(req);
      if (this.isActive()) {
        callback(resp);
      }
    });
    this.reqs.add(req);
  }
};

// js/phoenix/presence.js
var Presence = class {
  constructor(channel, opts = {}) {
    let events = opts.events || { state: "presence_state", diff: "presence_diff" };
    this.state = {};
    this.pendingDiffs = [];
    this.channel = channel;
    this.joinRef = null;
    this.caller = {
      onJoin: function() {
      },
      onLeave: function() {
      },
      onSync: function() {
      }
    };
    this.channel.on(events.state, (newState) => {
      let { onJoin, onLeave, onSync } = this.caller;
      this.joinRef = this.channel.joinRef();
      this.state = Presence.syncState(this.state, newState, onJoin, onLeave);
      this.pendingDiffs.forEach((diff) => {
        this.state = Presence.syncDiff(this.state, diff, onJoin, onLeave);
      });
      this.pendingDiffs = [];
      onSync();
    });
    this.channel.on(events.diff, (diff) => {
      let { onJoin, onLeave, onSync } = this.caller;
      if (this.inPendingSyncState()) {
        this.pendingDiffs.push(diff);
      } else {
        this.state = Presence.syncDiff(this.state, diff, onJoin, onLeave);
        onSync();
      }
    });
  }
  onJoin(callback) {
    this.caller.onJoin = callback;
  }
  onLeave(callback) {
    this.caller.onLeave = callback;
  }
  onSync(callback) {
    this.caller.onSync = callback;
  }
  list(by) {
    return Presence.list(this.state, by);
  }
  inPendingSyncState() {
    return !this.joinRef || this.joinRef !== this.channel.joinRef();
  }
  // lower-level public static API
  /**
   * Used to sync the list of presences on the server
   * with the client's state. An optional `onJoin` and `onLeave` callback can
   * be provided to react to changes in the client's local presences across
   * disconnects and reconnects with the server.
   *
   * @returns {Presence}
   */
  static syncState(currentState, newState, onJoin, onLeave) {
    let state = this.clone(currentState);
    let joins = {};
    let leaves = {};
    this.map(state, (key, presence) => {
      if (!newState[key]) {
        leaves[key] = presence;
      }
    });
    this.map(newState, (key, newPresence) => {
      let currentPresence = state[key];
      if (currentPresence) {
        let newRefs = newPresence.metas.map((m) => m.phx_ref);
        let curRefs = currentPresence.metas.map((m) => m.phx_ref);
        let joinedMetas = newPresence.metas.filter((m) => curRefs.indexOf(m.phx_ref) < 0);
        let leftMetas = currentPresence.metas.filter((m) => newRefs.indexOf(m.phx_ref) < 0);
        if (joinedMetas.length > 0) {
          joins[key] = newPresence;
          joins[key].metas = joinedMetas;
        }
        if (leftMetas.length > 0) {
          leaves[key] = this.clone(currentPresence);
          leaves[key].metas = leftMetas;
        }
      } else {
        joins[key] = newPresence;
      }
    });
    return this.syncDiff(state, { joins, leaves }, onJoin, onLeave);
  }
  /**
   *
   * Used to sync a diff of presence join and leave
   * events from the server, as they happen. Like `syncState`, `syncDiff`
   * accepts optional `onJoin` and `onLeave` callbacks to react to a user
   * joining or leaving from a device.
   *
   * @returns {Presence}
   */
  static syncDiff(state, diff, onJoin, onLeave) {
    let { joins, leaves } = this.clone(diff);
    if (!onJoin) {
      onJoin = function() {
      };
    }
    if (!onLeave) {
      onLeave = function() {
      };
    }
    this.map(joins, (key, newPresence) => {
      let currentPresence = state[key];
      state[key] = this.clone(newPresence);
      if (currentPresence) {
        let joinedRefs = state[key].metas.map((m) => m.phx_ref);
        let curMetas = currentPresence.metas.filter((m) => joinedRefs.indexOf(m.phx_ref) < 0);
        state[key].metas.unshift(...curMetas);
      }
      onJoin(key, currentPresence, newPresence);
    });
    this.map(leaves, (key, leftPresence) => {
      let currentPresence = state[key];
      if (!currentPresence) {
        return;
      }
      let refsToRemove = leftPresence.metas.map((m) => m.phx_ref);
      currentPresence.metas = currentPresence.metas.filter((p) => {
        return refsToRemove.indexOf(p.phx_ref) < 0;
      });
      onLeave(key, currentPresence, leftPresence);
      if (currentPresence.metas.length === 0) {
        delete state[key];
      }
    });
    return state;
  }
  /**
   * Returns the array of presences, with selected metadata.
   *
   * @param {Object} presences
   * @param {Function} chooser
   *
   * @returns {Presence}
   */
  static list(presences, chooser) {
    if (!chooser) {
      chooser = function(key, pres) {
        return pres;
      };
    }
    return this.map(presences, (key, presence) => {
      return chooser(key, presence);
    });
  }
  // private
  static map(obj, func) {
    return Object.getOwnPropertyNames(obj).map((key) => func(key, obj[key]));
  }
  static clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
};

// js/phoenix/serializer.js
var serializer_default = {
  HEADER_LENGTH: 1,
  META_LENGTH: 4,
  KINDS: { push: 0, reply: 1, broadcast: 2 },
  encode(msg, callback) {
    if (msg.payload.constructor === ArrayBuffer) {
      return callback(this.binaryEncode(msg));
    } else {
      let payload = [msg.join_ref, msg.ref, msg.topic, msg.event, msg.payload];
      return callback(JSON.stringify(payload));
    }
  },
  decode(rawPayload, callback) {
    if (rawPayload.constructor === ArrayBuffer) {
      return callback(this.binaryDecode(rawPayload));
    } else {
      let [join_ref, ref, topic, event, payload] = JSON.parse(rawPayload);
      return callback({ join_ref, ref, topic, event, payload });
    }
  },
  // private
  binaryEncode(message) {
    let { join_ref, ref, event, topic, payload } = message;
    let metaLength = this.META_LENGTH + join_ref.length + ref.length + topic.length + event.length;
    let header = new ArrayBuffer(this.HEADER_LENGTH + metaLength);
    let view = new DataView(header);
    let offset = 0;
    view.setUint8(offset++, this.KINDS.push);
    view.setUint8(offset++, join_ref.length);
    view.setUint8(offset++, ref.length);
    view.setUint8(offset++, topic.length);
    view.setUint8(offset++, event.length);
    Array.from(join_ref, (char) => view.setUint8(offset++, char.charCodeAt(0)));
    Array.from(ref, (char) => view.setUint8(offset++, char.charCodeAt(0)));
    Array.from(topic, (char) => view.setUint8(offset++, char.charCodeAt(0)));
    Array.from(event, (char) => view.setUint8(offset++, char.charCodeAt(0)));
    var combined = new Uint8Array(header.byteLength + payload.byteLength);
    combined.set(new Uint8Array(header), 0);
    combined.set(new Uint8Array(payload), header.byteLength);
    return combined.buffer;
  },
  binaryDecode(buffer) {
    let view = new DataView(buffer);
    let kind = view.getUint8(0);
    let decoder = new TextDecoder();
    switch (kind) {
      case this.KINDS.push:
        return this.decodePush(buffer, view, decoder);
      case this.KINDS.reply:
        return this.decodeReply(buffer, view, decoder);
      case this.KINDS.broadcast:
        return this.decodeBroadcast(buffer, view, decoder);
    }
  },
  decodePush(buffer, view, decoder) {
    let joinRefSize = view.getUint8(1);
    let topicSize = view.getUint8(2);
    let eventSize = view.getUint8(3);
    let offset = this.HEADER_LENGTH + this.META_LENGTH - 1;
    let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
    offset = offset + joinRefSize;
    let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
    offset = offset + topicSize;
    let event = decoder.decode(buffer.slice(offset, offset + eventSize));
    offset = offset + eventSize;
    let data = buffer.slice(offset, buffer.byteLength);
    return { join_ref: joinRef, ref: null, topic, event, payload: data };
  },
  decodeReply(buffer, view, decoder) {
    let joinRefSize = view.getUint8(1);
    let refSize = view.getUint8(2);
    let topicSize = view.getUint8(3);
    let eventSize = view.getUint8(4);
    let offset = this.HEADER_LENGTH + this.META_LENGTH;
    let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
    offset = offset + joinRefSize;
    let ref = decoder.decode(buffer.slice(offset, offset + refSize));
    offset = offset + refSize;
    let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
    offset = offset + topicSize;
    let event = decoder.decode(buffer.slice(offset, offset + eventSize));
    offset = offset + eventSize;
    let data = buffer.slice(offset, buffer.byteLength);
    let payload = { status: event, response: data };
    return { join_ref: joinRef, ref, topic, event: CHANNEL_EVENTS.reply, payload };
  },
  decodeBroadcast(buffer, view, decoder) {
    let topicSize = view.getUint8(1);
    let eventSize = view.getUint8(2);
    let offset = this.HEADER_LENGTH + 2;
    let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
    offset = offset + topicSize;
    let event = decoder.decode(buffer.slice(offset, offset + eventSize));
    offset = offset + eventSize;
    let data = buffer.slice(offset, buffer.byteLength);
    return { join_ref: null, ref: null, topic, event, payload: data };
  }
};

// js/phoenix/socket.js
var Socket = class {
  constructor(endPoint, opts = {}) {
    this.stateChangeCallbacks = { open: [], close: [], error: [], message: [] };
    this.channels = [];
    this.sendBuffer = [];
    this.ref = 0;
    this.timeout = opts.timeout || DEFAULT_TIMEOUT;
    this.transport = opts.transport || global.WebSocket || LongPoll;
    this.primaryPassedHealthCheck = false;
    this.longPollFallbackMs = opts.longPollFallbackMs;
    this.fallbackTimer = null;
    this.sessionStore = opts.sessionStorage || global && global.sessionStorage;
    this.establishedConnections = 0;
    this.defaultEncoder = serializer_default.encode.bind(serializer_default);
    this.defaultDecoder = serializer_default.decode.bind(serializer_default);
    this.closeWasClean = false;
    this.disconnecting = false;
    this.binaryType = opts.binaryType || "arraybuffer";
    this.connectClock = 1;
    if (this.transport !== LongPoll) {
      this.encode = opts.encode || this.defaultEncoder;
      this.decode = opts.decode || this.defaultDecoder;
    } else {
      this.encode = this.defaultEncoder;
      this.decode = this.defaultDecoder;
    }
    let awaitingConnectionOnPageShow = null;
    if (phxWindow && phxWindow.addEventListener) {
      phxWindow.addEventListener("pagehide", (_e) => {
        if (this.conn) {
          this.disconnect();
          awaitingConnectionOnPageShow = this.connectClock;
        }
      });
      phxWindow.addEventListener("pageshow", (_e) => {
        if (awaitingConnectionOnPageShow === this.connectClock) {
          awaitingConnectionOnPageShow = null;
          this.connect();
        }
      });
    }
    this.heartbeatIntervalMs = opts.heartbeatIntervalMs || 3e4;
    this.rejoinAfterMs = (tries) => {
      if (opts.rejoinAfterMs) {
        return opts.rejoinAfterMs(tries);
      } else {
        return [1e3, 2e3, 5e3][tries - 1] || 1e4;
      }
    };
    this.reconnectAfterMs = (tries) => {
      if (opts.reconnectAfterMs) {
        return opts.reconnectAfterMs(tries);
      } else {
        return [10, 50, 100, 150, 200, 250, 500, 1e3, 2e3][tries - 1] || 5e3;
      }
    };
    this.logger = opts.logger || null;
    if (!this.logger && opts.debug) {
      this.logger = (kind, msg, data) => {
        console.log(`${kind}: ${msg}`, data);
      };
    }
    this.longpollerTimeout = opts.longpollerTimeout || 2e4;
    this.params = closure(opts.params || {});
    this.endPoint = `${endPoint}/${TRANSPORTS.websocket}`;
    this.vsn = opts.vsn || DEFAULT_VSN;
    this.heartbeatTimeoutTimer = null;
    this.heartbeatTimer = null;
    this.pendingHeartbeatRef = null;
    this.reconnectTimer = new Timer(() => {
      this.teardown(() => this.connect());
    }, this.reconnectAfterMs);
  }
  /**
   * Returns the LongPoll transport reference
   */
  getLongPollTransport() {
    return LongPoll;
  }
  /**
   * Disconnects and replaces the active transport
   *
   * @param {Function} newTransport - The new transport class to instantiate
   *
   */
  replaceTransport(newTransport) {
    this.connectClock++;
    this.closeWasClean = true;
    clearTimeout(this.fallbackTimer);
    this.reconnectTimer.reset();
    if (this.conn) {
      this.conn.close();
      this.conn = null;
    }
    this.transport = newTransport;
  }
  /**
   * Returns the socket protocol
   *
   * @returns {string}
   */
  protocol() {
    return location.protocol.match(/^https/) ? "wss" : "ws";
  }
  /**
   * The fully qualified socket url
   *
   * @returns {string}
   */
  endPointURL() {
    let uri = Ajax.appendParams(
      Ajax.appendParams(this.endPoint, this.params()),
      { vsn: this.vsn }
    );
    if (uri.charAt(0) !== "/") {
      return uri;
    }
    if (uri.charAt(1) === "/") {
      return `${this.protocol()}:${uri}`;
    }
    return `${this.protocol()}://${location.host}${uri}`;
  }
  /**
   * Disconnects the socket
   *
   * See https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#Status_codes for valid status codes.
   *
   * @param {Function} callback - Optional callback which is called after socket is disconnected.
   * @param {integer} code - A status code for disconnection (Optional).
   * @param {string} reason - A textual description of the reason to disconnect. (Optional)
   */
  disconnect(callback, code, reason) {
    this.connectClock++;
    this.disconnecting = true;
    this.closeWasClean = true;
    clearTimeout(this.fallbackTimer);
    this.reconnectTimer.reset();
    this.teardown(() => {
      this.disconnecting = false;
      callback && callback();
    }, code, reason);
  }
  /**
   *
   * @param {Object} params - The params to send when connecting, for example `{user_id: userToken}`
   *
   * Passing params to connect is deprecated; pass them in the Socket constructor instead:
   * `new Socket("/socket", {params: {user_id: userToken}})`.
   */
  connect(params) {
    if (params) {
      console && console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor");
      this.params = closure(params);
    }
    if (this.conn && !this.disconnecting) {
      return;
    }
    if (this.longPollFallbackMs && this.transport !== LongPoll) {
      this.connectWithFallback(LongPoll, this.longPollFallbackMs);
    } else {
      this.transportConnect();
    }
  }
  /**
   * Logs the message. Override `this.logger` for specialized logging. noops by default
   * @param {string} kind
   * @param {string} msg
   * @param {Object} data
   */
  log(kind, msg, data) {
    this.logger && this.logger(kind, msg, data);
  }
  /**
   * Returns true if a logger has been set on this socket.
   */
  hasLogger() {
    return this.logger !== null;
  }
  /**
   * Registers callbacks for connection open events
   *
   * @example socket.onOpen(function(){ console.info("the socket was opened") })
   *
   * @param {Function} callback
   */
  onOpen(callback) {
    let ref = this.makeRef();
    this.stateChangeCallbacks.open.push([ref, callback]);
    return ref;
  }
  /**
   * Registers callbacks for connection close events
   * @param {Function} callback
   */
  onClose(callback) {
    let ref = this.makeRef();
    this.stateChangeCallbacks.close.push([ref, callback]);
    return ref;
  }
  /**
   * Registers callbacks for connection error events
   *
   * @example socket.onError(function(error){ alert("An error occurred") })
   *
   * @param {Function} callback
   */
  onError(callback) {
    let ref = this.makeRef();
    this.stateChangeCallbacks.error.push([ref, callback]);
    return ref;
  }
  /**
   * Registers callbacks for connection message events
   * @param {Function} callback
   */
  onMessage(callback) {
    let ref = this.makeRef();
    this.stateChangeCallbacks.message.push([ref, callback]);
    return ref;
  }
  /**
   * Pings the server and invokes the callback with the RTT in milliseconds
   * @param {Function} callback
   *
   * Returns true if the ping was pushed or false if unable to be pushed.
   */
  ping(callback) {
    if (!this.isConnected()) {
      return false;
    }
    let ref = this.makeRef();
    let startTime = Date.now();
    this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref });
    let onMsgRef = this.onMessage((msg) => {
      if (msg.ref === ref) {
        this.off([onMsgRef]);
        callback(Date.now() - startTime);
      }
    });
    return true;
  }
  /**
   * @private
   */
  transportConnect() {
    this.connectClock++;
    this.closeWasClean = false;
    this.conn = new this.transport(this.endPointURL());
    this.conn.binaryType = this.binaryType;
    this.conn.timeout = this.longpollerTimeout;
    this.conn.onopen = () => this.onConnOpen();
    this.conn.onerror = (error) => this.onConnError(error);
    this.conn.onmessage = (event) => this.onConnMessage(event);
    this.conn.onclose = (event) => this.onConnClose(event);
  }
  getSession(key) {
    return this.sessionStore && this.sessionStore.getItem(key);
  }
  storeSession(key, val) {
    this.sessionStore && this.sessionStore.setItem(key, val);
  }
  connectWithFallback(fallbackTransport, fallbackThreshold = 2500) {
    clearTimeout(this.fallbackTimer);
    let established = false;
    let primaryTransport = true;
    let openRef, errorRef;
    let fallback = (reason) => {
      this.log("transport", `falling back to ${fallbackTransport.name}...`, reason);
      this.off([openRef, errorRef]);
      primaryTransport = false;
      this.replaceTransport(fallbackTransport);
      this.transportConnect();
    };
    if (this.getSession(`phx:fallback:${fallbackTransport.name}`)) {
      return fallback("memorized");
    }
    this.fallbackTimer = setTimeout(fallback, fallbackThreshold);
    errorRef = this.onError((reason) => {
      this.log("transport", "error", reason);
      if (primaryTransport && !established) {
        clearTimeout(this.fallbackTimer);
        fallback(reason);
      }
    });
    this.onOpen(() => {
      established = true;
      if (!primaryTransport) {
        if (!this.primaryPassedHealthCheck) {
          this.storeSession(`phx:fallback:${fallbackTransport.name}`, "true");
        }
        return this.log("transport", `established ${fallbackTransport.name} fallback`);
      }
      clearTimeout(this.fallbackTimer);
      this.fallbackTimer = setTimeout(fallback, fallbackThreshold);
      this.ping((rtt) => {
        this.log("transport", "connected to primary after", rtt);
        this.primaryPassedHealthCheck = true;
        clearTimeout(this.fallbackTimer);
      });
    });
    this.transportConnect();
  }
  clearHeartbeats() {
    clearTimeout(this.heartbeatTimer);
    clearTimeout(this.heartbeatTimeoutTimer);
  }
  onConnOpen() {
    if (this.hasLogger())
      this.log("transport", `${this.transport.name} connected to ${this.endPointURL()}`);
    this.closeWasClean = false;
    this.disconnecting = false;
    this.establishedConnections++;
    this.flushSendBuffer();
    this.reconnectTimer.reset();
    this.resetHeartbeat();
    this.stateChangeCallbacks.open.forEach(([, callback]) => callback());
  }
  /**
   * @private
   */
  heartbeatTimeout() {
    if (this.pendingHeartbeatRef) {
      this.pendingHeartbeatRef = null;
      if (this.hasLogger()) {
        this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
      }
      this.triggerChanError();
      this.closeWasClean = false;
      this.teardown(() => this.reconnectTimer.scheduleTimeout(), WS_CLOSE_NORMAL, "heartbeat timeout");
    }
  }
  resetHeartbeat() {
    if (this.conn && this.conn.skipHeartbeat) {
      return;
    }
    this.pendingHeartbeatRef = null;
    this.clearHeartbeats();
    this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
  }
  teardown(callback, code, reason) {
    if (!this.conn) {
      return callback && callback();
    }
    let connectClock = this.connectClock;
    this.waitForBufferDone(() => {
      if (connectClock !== this.connectClock) {
        return;
      }
      if (this.conn) {
        if (code) {
          this.conn.close(code, reason || "");
        } else {
          this.conn.close();
        }
      }
      this.waitForSocketClosed(() => {
        if (connectClock !== this.connectClock) {
          return;
        }
        if (this.conn) {
          this.conn.onopen = function() {
          };
          this.conn.onerror = function() {
          };
          this.conn.onmessage = function() {
          };
          this.conn.onclose = function() {
          };
          this.conn = null;
        }
        callback && callback();
      });
    });
  }
  waitForBufferDone(callback, tries = 1) {
    if (tries === 5 || !this.conn || !this.conn.bufferedAmount) {
      callback();
      return;
    }
    setTimeout(() => {
      this.waitForBufferDone(callback, tries + 1);
    }, 150 * tries);
  }
  waitForSocketClosed(callback, tries = 1) {
    if (tries === 5 || !this.conn || this.conn.readyState === SOCKET_STATES.closed) {
      callback();
      return;
    }
    setTimeout(() => {
      this.waitForSocketClosed(callback, tries + 1);
    }, 150 * tries);
  }
  onConnClose(event) {
    let closeCode = event && event.code;
    if (this.hasLogger())
      this.log("transport", "close", event);
    this.triggerChanError();
    this.clearHeartbeats();
    if (!this.closeWasClean && closeCode !== 1e3) {
      this.reconnectTimer.scheduleTimeout();
    }
    this.stateChangeCallbacks.close.forEach(([, callback]) => callback(event));
  }
  /**
   * @private
   */
  onConnError(error) {
    if (this.hasLogger())
      this.log("transport", error);
    let transportBefore = this.transport;
    let establishedBefore = this.establishedConnections;
    this.stateChangeCallbacks.error.forEach(([, callback]) => {
      callback(error, transportBefore, establishedBefore);
    });
    if (transportBefore === this.transport || establishedBefore > 0) {
      this.triggerChanError();
    }
  }
  /**
   * @private
   */
  triggerChanError() {
    this.channels.forEach((channel) => {
      if (!(channel.isErrored() || channel.isLeaving() || channel.isClosed())) {
        channel.trigger(CHANNEL_EVENTS.error);
      }
    });
  }
  /**
   * @returns {string}
   */
  connectionState() {
    switch (this.conn && this.conn.readyState) {
      case SOCKET_STATES.connecting:
        return "connecting";
      case SOCKET_STATES.open:
        return "open";
      case SOCKET_STATES.closing:
        return "closing";
      default:
        return "closed";
    }
  }
  /**
   * @returns {boolean}
   */
  isConnected() {
    return this.connectionState() === "open";
  }
  /**
   * @private
   *
   * @param {Channel}
   */
  remove(channel) {
    this.off(channel.stateChangeRefs);
    this.channels = this.channels.filter((c) => c !== channel);
  }
  /**
   * Removes `onOpen`, `onClose`, `onError,` and `onMessage` registrations.
   *
   * @param {refs} - list of refs returned by calls to
   *                 `onOpen`, `onClose`, `onError,` and `onMessage`
   */
  off(refs) {
    for (let key in this.stateChangeCallbacks) {
      this.stateChangeCallbacks[key] = this.stateChangeCallbacks[key].filter(([ref]) => {
        return refs.indexOf(ref) === -1;
      });
    }
  }
  /**
   * Initiates a new channel for the given topic
   *
   * @param {string} topic
   * @param {Object} chanParams - Parameters for the channel
   * @returns {Channel}
   */
  channel(topic, chanParams = {}) {
    let chan = new Channel(topic, chanParams, this);
    this.channels.push(chan);
    return chan;
  }
  /**
   * @param {Object} data
   */
  push(data) {
    if (this.hasLogger()) {
      let { topic, event, payload, ref, join_ref } = data;
      this.log("push", `${topic} ${event} (${join_ref}, ${ref})`, payload);
    }
    if (this.isConnected()) {
      this.encode(data, (result) => this.conn.send(result));
    } else {
      this.sendBuffer.push(() => this.encode(data, (result) => this.conn.send(result)));
    }
  }
  /**
   * Return the next message ref, accounting for overflows
   * @returns {string}
   */
  makeRef() {
    let newRef = this.ref + 1;
    if (newRef === this.ref) {
      this.ref = 0;
    } else {
      this.ref = newRef;
    }
    return this.ref.toString();
  }
  sendHeartbeat() {
    if (this.pendingHeartbeatRef && !this.isConnected()) {
      return;
    }
    this.pendingHeartbeatRef = this.makeRef();
    this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: this.pendingHeartbeatRef });
    this.heartbeatTimeoutTimer = setTimeout(() => this.heartbeatTimeout(), this.heartbeatIntervalMs);
  }
  flushSendBuffer() {
    if (this.isConnected() && this.sendBuffer.length > 0) {
      this.sendBuffer.forEach((callback) => callback());
      this.sendBuffer = [];
    }
  }
  onConnMessage(rawMessage) {
    this.decode(rawMessage.data, (msg) => {
      let { topic, event, payload, ref, join_ref } = msg;
      if (ref && ref === this.pendingHeartbeatRef) {
        this.clearHeartbeats();
        this.pendingHeartbeatRef = null;
        this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
      }
      if (this.hasLogger())
        this.log("receive", `${payload.status || ""} ${topic} ${event} ${ref && "(" + ref + ")" || ""}`, payload);
      for (let i = 0; i < this.channels.length; i++) {
        const channel = this.channels[i];
        if (!channel.isMember(topic, event, payload, join_ref)) {
          continue;
        }
        channel.trigger(event, payload, ref, join_ref);
      }
      for (let i = 0; i < this.stateChangeCallbacks.message.length; i++) {
        let [, callback] = this.stateChangeCallbacks.message[i];
        callback(msg);
      }
    });
  }
  leaveOpenTopic(topic) {
    let dupChannel = this.channels.find((c) => c.topic === topic && (c.isJoined() || c.isJoining()));
    if (dupChannel) {
      if (this.hasLogger())
        this.log("transport", `leaving duplicate topic "${topic}"`);
      dupChannel.leave();
    }
  }
};
//# sourceMappingURL=phoenix.cjs.js.map


/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DEFAULTS = void 0;
exports.DEFAULTS = {
    LOCALE: 'zh_TW',
    API_KEY: 'rfront2023',
    APP_VERSION: '2.18',
    INTERVAL_MINUTES: 5,
    BUNDLE_REFERENCE_TYPE: 'Minister and Control Union',
};


/***/ }),

/***/ "./src/errors/auth-error.ts":
/*!**********************************!*\
  !*** ./src/errors/auth-error.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthError = exports.AuthErrorCode = void 0;
exports.isAuthError = isAuthError;
var AuthErrorCode;
(function (AuthErrorCode) {
    AuthErrorCode["INVALID_CREDENTIALS"] = "INVALID_CREDENTIALS";
    AuthErrorCode["NO_CREDENTIALS"] = "NO_CREDENTIALS";
    AuthErrorCode["NETWORK_ERROR"] = "NETWORK_ERROR";
    AuthErrorCode["SERVER_ERROR"] = "SERVER_ERROR";
    AuthErrorCode["MISSING_RESPONSE_DATA"] = "MISSING_RESPONSE_DATA";
})(AuthErrorCode || (exports.AuthErrorCode = AuthErrorCode = {}));
class AuthError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
        this.name = 'AuthError';
    }
}
exports.AuthError = AuthError;
function isAuthError(error) {
    return error instanceof AuthError;
}


/***/ }),

/***/ "./src/services/auth.ts":
/*!******************************!*\
  !*** ./src/services/auth.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const axios_1 = __importDefault(__webpack_require__(/*! axios */ "./node_modules/axios/dist/browser/axios.cjs"));
const constants_1 = __webpack_require__(/*! ../constants */ "./src/constants.ts");
const auth_error_1 = __webpack_require__(/*! ../errors/auth-error */ "./src/errors/auth-error.ts");
const logger_1 = __webpack_require__(/*! ../utils/logger */ "./src/utils/logger.ts");
class AuthService {
    constructor() {
        this.api = axios_1.default.create({
            baseURL: AuthService.BASE_URL,
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-requested-with': 'tw.twhawk.reversedfront',
            },
            withCredentials: false,
        });
    }
    static getSocketUrl(userToken, locale = 'zh_TW') {
        return `wss://api.komisureiya.com/socket/websocket?userToken=${userToken}&locale=${locale}&vsn=2.0.0`;
    }
    async login({ email, password, deviceUid, googleId, appleId, }) {
        // Validate input
        if (!email && !deviceUid && !googleId && !appleId) {
            throw new auth_error_1.AuthError(auth_error_1.AuthErrorCode.NO_CREDENTIALS, 'No login credentials provided');
        }
        if (email && !password) {
            throw new auth_error_1.AuthError(auth_error_1.AuthErrorCode.INVALID_CREDENTIALS, 'Password is required for email login');
        }
        const locale = constants_1.DEFAULTS.LOCALE;
        const key = constants_1.DEFAULTS.API_KEY;
        const version = constants_1.DEFAULTS.APP_VERSION;
        const payload = appleId
            ? {
                'user[user]': appleId,
                locale,
                key,
                app_version: version,
            }
            : googleId
                ? {
                    'user[user][id]': googleId,
                    locale,
                    key,
                    app_version: version,
                }
                : deviceUid
                    ? {
                        'user[device_uid]': deviceUid,
                        locale,
                        key,
                        app_version: version,
                    }
                    : {
                        'user[email]': email,
                        'user[password]': password,
                        locale,
                        key,
                        app_version: version,
                    };
        try {
            logger_1.logger.debug(`Sending login request with payload: ${JSON.stringify(payload, null, 2)}`);
            // Convert payload to form data
            const formData = new URLSearchParams();
            Object.entries(payload).forEach(([key, value]) => {
                formData.append(key, value);
            });
            const response = await this.api.post('/users/log_in', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            logger_1.logger.debug(`Login Response: ${JSON.stringify(response.data, null, 2)}`);
            // Validate response data
            const { data } = response.data;
            if (!data) {
                throw new auth_error_1.AuthError(auth_error_1.AuthErrorCode.MISSING_RESPONSE_DATA, 'No data in response');
            }
            const { user_token, user_id } = data;
            if (!user_token || !user_id) {
                throw new auth_error_1.AuthError(auth_error_1.AuthErrorCode.MISSING_RESPONSE_DATA, 'Missing user token or user ID in response');
            }
            logger_1.logger.info(`🔓 Successfully logged in with user ID: ${user_id}`);
            return {
                userToken: user_token,
                userId: user_id,
            };
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                const status = error.response?.status;
                const message = error.response?.data?.message || error.message;
                logger_1.logger.error(`Axios error occurred: ${message}`);
                logger_1.logger.debug(`Axios error details: ${JSON.stringify(error)}`);
                switch (status) {
                    case 401:
                        throw new auth_error_1.AuthError(auth_error_1.AuthErrorCode.INVALID_CREDENTIALS, message || 'Invalid credentials');
                    case 404:
                        throw new auth_error_1.AuthError(auth_error_1.AuthErrorCode.NO_CREDENTIALS, message || 'No credentials provided');
                    case 500:
                        throw new auth_error_1.AuthError(auth_error_1.AuthErrorCode.SERVER_ERROR, message || 'Server error occurred');
                    default:
                        throw new auth_error_1.AuthError(auth_error_1.AuthErrorCode.NETWORK_ERROR, message || 'Network error occurred');
                }
            }
            if (error instanceof Error) {
                logger_1.logger.error(`Error occurred: ${error}`);
                throw new auth_error_1.AuthError(auth_error_1.AuthErrorCode.NETWORK_ERROR, error.message);
            }
            logger_1.logger.error('Unknown error occurred');
            throw new auth_error_1.AuthError(auth_error_1.AuthErrorCode.NETWORK_ERROR, 'Unknown error occurred');
        }
    }
}
exports.AuthService = AuthService;
AuthService.BASE_URL = 'https://api.komisureiya.com/api';
AuthService.LOGIN_METHODS = {
    EMAIL: 'email',
    GOOGLE: 'google',
    APPLE: 'apple',
    DEVICE: 'device',
};
AuthService.LOGIN_METHODS_MAP = {
    [AuthService.LOGIN_METHODS.EMAIL]: 'user[email]',
    [AuthService.LOGIN_METHODS.GOOGLE]: 'user[user][id]',
    [AuthService.LOGIN_METHODS.APPLE]: 'user[user]',
    [AuthService.LOGIN_METHODS.DEVICE]: 'user[device_uid]',
};


/***/ }),

/***/ "./src/services/channel/send-message.ts":
/*!**********************************************!*\
  !*** ./src/services/channel/send-message.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sendChannelMessage = sendChannelMessage;
const logger_1 = __webpack_require__(/*! ../../utils/logger */ "./src/utils/logger.ts");
async function sendChannelMessage(options) {
    const { channel, event, payload } = options;
    logger_1.logger.debug(`Sending message: ${event}`, payload);
    return new Promise((resolve, reject) => {
        channel
            .push(event, payload, options.timeout || 10000)
            .receive('ok', (resp) => {
            const respStr = JSON.stringify(resp, null, 2);
            const lines = respStr.split('\n').slice(0, 30).join('\n');
            logger_1.logger.debug(`Message replied:`, JSON.stringify(resp, null, 2));
            // logger.debug(
            //   `Message replied: ${lines}${respStr.length > lines.length ? '\n... (truncated)' : ''}`
            // );
            resolve(resp);
        })
            .receive('error', (resp) => {
            logger_1.logger.error(`Message failed:`, resp);
            reject(new Error(`Channel message failed: ${JSON.stringify(resp)}`));
        })
            .receive('timeout', () => {
            logger_1.logger.error('Message timeout');
            reject(new Error('Channel message timeout'));
        });
    });
}


/***/ }),

/***/ "./src/utils/logger.ts":
/*!*****************************!*\
  !*** ./src/utils/logger.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.logger = exports.Logger = exports.LogLevel = void 0;
const date_fns_1 = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/index.cjs");
// import { env } from '../config/env';
var LogLevel;
(function (LogLevel) {
    LogLevel["DEBUG"] = "DEBUG";
    LogLevel["INFO"] = "INFO";
    LogLevel["WARN"] = "WARN";
    LogLevel["ERROR"] = "ERROR";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
class Logger {
    constructor(options = {}) {
        this.options = {
            level: LogLevel.INFO,
            showTimestamp: true,
            showLevel: true,
            ...options,
        };
    }
    formatMessage(level, message) {
        const timestamp = this.options.showTimestamp
            ? `[${(0, date_fns_1.format)(new Date(), 'yyyy-MM-dd HH:mm:ss')}]`
            : '';
        const levelStr = this.options.showLevel ? `[${level}]` : '';
        return `${timestamp} ${levelStr} ${message}`.trim();
    }
    debug(message, data) {
        if (this.options.level === LogLevel.DEBUG) {
            const logData = data !== undefined ? data : '';
            console.log(this.formatMessage(LogLevel.DEBUG, message), logData);
        }
    }
    info(message, data) {
        if (this.options.level === LogLevel.DEBUG || this.options.level === LogLevel.INFO) {
            const logData = data !== undefined ? data : '';
            console.log(this.formatMessage(LogLevel.INFO, message), logData);
        }
    }
    warn(message, data) {
        const logData = data !== undefined ? data : '';
        console.warn(this.formatMessage(LogLevel.WARN, message), logData);
    }
    error(message, data) {
        const errorMessage = message instanceof Error ? `${message.message}\n${message.stack}` : message;
        const logData = data !== undefined ? data : '';
        console.error(this.formatMessage(LogLevel.ERROR, errorMessage), logData);
    }
}
exports.Logger = Logger;
// Create a default logger instance
exports.logger = new Logger({
    // Fix later
    level: LogLevel.INFO,
    showTimestamp: true,
    showLevel: true,
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;
/*!***************************!*\
  !*** ./src/spa-bridge.ts ***!
  \***************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.login = login;
exports.changeProfile = changeProfile;
const auth_1 = __webpack_require__(/*! ./services/auth */ "./src/services/auth.ts");
const send_message_1 = __webpack_require__(/*! ./services/channel/send-message */ "./src/services/channel/send-message.ts");
const phoenix_1 = __webpack_require__(/*! phoenix */ "./node_modules/phoenix/priv/static/phoenix.cjs.js");
/**
 * Logs the user in using the provided credentials.
 * @param email The user's email.
 * @param password The user's password.
 * @returns A promise that resolves with the login credentials (userToken, userId).
 */
async function login(email, password) {
    const authService = new auth_1.AuthService();
    return authService.login({ email, password, deviceUid: '', googleId: '', appleId: '' });
}
/**
 * Changes the user's profile (email and password).
 * @param currentEmail The user's current email.
 * @param currentPassword The user's current password.
 * @param newEmail The new email to set. Can be empty.
 * @param newPassword The new password to set. Can be empty.
 * @returns A promise that resolves when the profile has been updated.
 */
async function changeProfile(currentEmail, currentPassword, newEmail, newPassword) {
    const authService = new auth_1.AuthService();
    const { userToken, userId } = await authService.login({ email: currentEmail, password: currentPassword, deviceUid: '', googleId: '', appleId: '' });
    const socket = new phoenix_1.Socket(auth_1.AuthService.getSocketUrl(userToken));
    socket.connect(); // Connect to the socket
    const playerChannel = socket.channel(`player:${userId}`, {});
    try {
        // Wait for the channel to be joined successfully
        await new Promise((resolve, reject) => {
            playerChannel.join()
                .receive('ok', resolve)
                .receive('error', reject)
                .receive('timeout', () => reject(new Error('Channel join timeout')));
        });
        // Send the profile update message
        await (0, send_message_1.sendChannelMessage)({
            channel: playerChannel,
            event: 'edit_profile',
            payload: {
                user: {
                    email: newEmail || currentEmail,
                    password: newPassword || currentPassword,
                },
            },
        });
    }
    finally {
        // Clean up resources
        playerChannel.leave();
        socket.disconnect();
    }
}

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bundle.js.map