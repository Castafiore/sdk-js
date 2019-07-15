(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("DirectusSDK", [], factory);
	else if(typeof exports === 'object')
		exports["DirectusSDK"] = factory();
	else
		root["DirectusSDK"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
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

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);
  config.method = config.method ? config.method.toLowerCase() : 'get';

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
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
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");
var isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
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
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  utils.forEach(['url', 'method', 'params', 'data'], function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(['headers', 'auth', 'proxy'], function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach([
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'maxContentLength',
    'validateStatus', 'maxRedirects', 'httpAgent', 'httpsAgent', 'cancelToken',
    'socketPath'
  ], function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  // Only Node.JS has a process variable that is of [[Class]] process
  if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
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

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
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
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

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
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var isBuffer = __webpack_require__(/*! is-buffer */ "./node_modules/is-buffer/index.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

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
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

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
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

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
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "./node_modules/base-64/base64.js":
/*!****************************************!*\
  !*** ./node_modules/base-64/base64.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! http://mths.be/base64 v0.1.0 by @mathias | MIT license */
;(function(root) {

	// Detect free variables `exports`.
	var freeExports =  true && exports;

	// Detect free variable `module`.
	var freeModule =  true && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code, and use
	// it as `root`.
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	var InvalidCharacterError = function(message) {
		this.message = message;
	};
	InvalidCharacterError.prototype = new Error;
	InvalidCharacterError.prototype.name = 'InvalidCharacterError';

	var error = function(message) {
		// Note: the error messages used throughout this file match those used by
		// the native `atob`/`btoa` implementation in Chromium.
		throw new InvalidCharacterError(message);
	};

	var TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	// http://whatwg.org/html/common-microsyntaxes.html#space-character
	var REGEX_SPACE_CHARACTERS = /[\t\n\f\r ]/g;

	// `decode` is designed to be fully compatible with `atob` as described in the
	// HTML Standard. http://whatwg.org/html/webappapis.html#dom-windowbase64-atob
	// The optimized base64-decoding algorithm used is based on @atk’s excellent
	// implementation. https://gist.github.com/atk/1020396
	var decode = function(input) {
		input = String(input)
			.replace(REGEX_SPACE_CHARACTERS, '');
		var length = input.length;
		if (length % 4 == 0) {
			input = input.replace(/==?$/, '');
			length = input.length;
		}
		if (
			length % 4 == 1 ||
			// http://whatwg.org/C#alphanumeric-ascii-characters
			/[^+a-zA-Z0-9/]/.test(input)
		) {
			error(
				'Invalid character: the string to be decoded is not correctly encoded.'
			);
		}
		var bitCounter = 0;
		var bitStorage;
		var buffer;
		var output = '';
		var position = -1;
		while (++position < length) {
			buffer = TABLE.indexOf(input.charAt(position));
			bitStorage = bitCounter % 4 ? bitStorage * 64 + buffer : buffer;
			// Unless this is the first of a group of 4 characters…
			if (bitCounter++ % 4) {
				// …convert the first 8 bits to a single ASCII character.
				output += String.fromCharCode(
					0xFF & bitStorage >> (-2 * bitCounter & 6)
				);
			}
		}
		return output;
	};

	// `encode` is designed to be fully compatible with `btoa` as described in the
	// HTML Standard: http://whatwg.org/html/webappapis.html#dom-windowbase64-btoa
	var encode = function(input) {
		input = String(input);
		if (/[^\0-\xFF]/.test(input)) {
			// Note: no need to special-case astral symbols here, as surrogates are
			// matched, and the input is supposed to only contain ASCII anyway.
			error(
				'The string to be encoded contains characters outside of the ' +
				'Latin1 range.'
			);
		}
		var padding = input.length % 3;
		var output = '';
		var position = -1;
		var a;
		var b;
		var c;
		var d;
		var buffer;
		// Make sure any padding is handled outside of the loop.
		var length = input.length - padding;

		while (++position < length) {
			// Read three bytes, i.e. 24 bits.
			a = input.charCodeAt(position) << 16;
			b = input.charCodeAt(++position) << 8;
			c = input.charCodeAt(++position);
			buffer = a + b + c;
			// Turn the 24 bits into four chunks of 6 bits each, and append the
			// matching character for each of them to the output.
			output += (
				TABLE.charAt(buffer >> 18 & 0x3F) +
				TABLE.charAt(buffer >> 12 & 0x3F) +
				TABLE.charAt(buffer >> 6 & 0x3F) +
				TABLE.charAt(buffer & 0x3F)
			);
		}

		if (padding == 2) {
			a = input.charCodeAt(position) << 8;
			b = input.charCodeAt(++position);
			buffer = a + b;
			output += (
				TABLE.charAt(buffer >> 10) +
				TABLE.charAt((buffer >> 4) & 0x3F) +
				TABLE.charAt((buffer << 2) & 0x3F) +
				'='
			);
		} else if (padding == 1) {
			buffer = input.charCodeAt(position);
			output += (
				TABLE.charAt(buffer >> 2) +
				TABLE.charAt((buffer << 4) & 0x3F) +
				'=='
			);
		}

		return output;
	};

	var base64 = {
		'encode': encode,
		'decode': decode,
		'version': '0.1.0'
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return base64;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}	else { var key; }

}(this));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module), __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
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
function defaultClearTimeout () {
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
} ())
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
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
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
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
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
    while(len) {
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

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/qs/lib/formats.js":
/*!****************************************!*\
  !*** ./node_modules/qs/lib/formats.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

module.exports = {
    'default': 'RFC3986',
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return value;
        }
    },
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};


/***/ }),

/***/ "./node_modules/qs/lib/stringify.js":
/*!******************************************!*\
  !*** ./node_modules/qs/lib/stringify.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/qs/lib/utils.js");
var formats = __webpack_require__(/*! ./formats */ "./node_modules/qs/lib/formats.js");
var has = Object.prototype.hasOwnProperty;

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) { // eslint-disable-line func-name-matching
        return prefix + '[]';
    },
    comma: 'comma',
    indices: function indices(prefix, key) { // eslint-disable-line func-name-matching
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) { // eslint-disable-line func-name-matching
        return prefix;
    }
};

var isArray = Array.isArray;
var push = Array.prototype.push;
var pushToArray = function (arr, valueOrArray) {
    push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
};

var toISO = Date.prototype.toISOString;

var defaults = {
    addQueryPrefix: false,
    allowDots: false,
    charset: 'utf-8',
    charsetSentinel: false,
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    formatter: formats.formatters[formats['default']],
    // deprecated
    indices: false,
    serializeDate: function serializeDate(date) { // eslint-disable-line func-name-matching
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var stringify = function stringify( // eslint-disable-line func-name-matching
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    formatter,
    encodeValuesOnly,
    charset
) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (generateArrayPrefix === 'comma' && isArray(obj)) {
        obj = obj.join(',');
    }

    if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset);
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder, charset))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (isArray(obj)) {
            pushToArray(values, stringify(
                obj[key],
                typeof generateArrayPrefix === 'function' ? generateArrayPrefix(prefix, key) : prefix,
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly,
                charset
            ));
        } else {
            pushToArray(values, stringify(
                obj[key],
                prefix + (allowDots ? '.' + key : '[' + key + ']'),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly,
                charset
            ));
        }
    }

    return values;
};

var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (opts.encoder !== null && opts.encoder !== undefined && typeof opts.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var charset = opts.charset || defaults.charset;
    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
    }

    var format = formats['default'];
    if (typeof opts.format !== 'undefined') {
        if (!has.call(formats.formatters, opts.format)) {
            throw new TypeError('Unknown format option provided.');
        }
        format = opts.format;
    }
    var formatter = formats.formatters[format];

    var filter = defaults.filter;
    if (typeof opts.filter === 'function' || isArray(opts.filter)) {
        filter = opts.filter;
    }

    return {
        addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults.addQueryPrefix,
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        delimiter: typeof opts.delimiter === 'undefined' ? defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === 'boolean' ? opts.encode : defaults.encode,
        encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter: filter,
        formatter: formatter,
        serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults.skipNulls,
        sort: typeof opts.sort === 'function' ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

module.exports = function (object, opts) {
    var obj = object;
    var options = normalizeStringifyOptions(opts);

    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (opts && opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
    } else if (opts && 'indices' in opts) {
        arrayFormat = opts.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (options.sort) {
        objKeys.sort(options.sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (options.skipNulls && obj[key] === null) {
            continue;
        }
        pushToArray(keys, stringify(
            obj[key],
            key,
            generateArrayPrefix,
            options.strictNullHandling,
            options.skipNulls,
            options.encode ? options.encoder : null,
            options.filter,
            options.sort,
            options.allowDots,
            options.serializeDate,
            options.formatter,
            options.encodeValuesOnly,
            options.charset
        ));
    }

    var joined = keys.join(options.delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    if (options.charsetSentinel) {
        if (options.charset === 'iso-8859-1') {
            // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
            prefix += 'utf8=%26%2310003%3B&';
        } else {
            // encodeURIComponent('✓')
            prefix += 'utf8=%E2%9C%93&';
        }
    }

    return joined.length > 0 ? prefix + joined : '';
};


/***/ }),

/***/ "./node_modules/qs/lib/utils.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/utils.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

var compactQueue = function compactQueue(queue) {
    while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];

        if (isArray(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }

            item.obj[item.prop] = compacted;
        }
    }
};

var arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

var merge = function merge(target, source, options) {
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (isArray(target)) {
            target.push(source);
        } else if (target && typeof target === 'object') {
            if ((options && (options.plainObjects || options.allowPrototypes)) || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (!target || typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (isArray(target) && !isArray(source)) {
        mergeTarget = arrayToObject(target, options);
    }

    if (isArray(target) && isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                var targetItem = target[i];
                if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
                    target[i] = merge(targetItem, item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has.call(acc, key)) {
            acc[key] = merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

var assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

var decode = function (str, decoder, charset) {
    var strWithoutPlus = str.replace(/\+/g, ' ');
    if (charset === 'iso-8859-1') {
        // unescape never throws, no try...catch needed:
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
    }
    // utf-8
    try {
        return decodeURIComponent(strWithoutPlus);
    } catch (e) {
        return strWithoutPlus;
    }
};

var encode = function encode(str, defaultEncoder, charset) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = typeof str === 'string' ? str : String(str);

    if (charset === 'iso-8859-1') {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
            return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
        });
    }

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

var compact = function compact(value) {
    var queue = [{ obj: { o: value }, prop: 'o' }];
    var refs = [];

    for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];

        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key });
                refs.push(val);
            }
        }
    }

    compactQueue(queue);

    return value;
};

var isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var isBuffer = function isBuffer(obj) {
    if (!obj || typeof obj !== 'object') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

var combine = function combine(a, b) {
    return [].concat(a, b);
};

module.exports = {
    arrayToObject: arrayToObject,
    assign: assign,
    combine: combine,
    compact: compact,
    decode: decode,
    encode: encode,
    isBuffer: isBuffer,
    isRegExp: isRegExp,
    merge: merge
};


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/API.ts":
/*!********************!*\
  !*** ./src/API.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @module API
 */
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
var qsStringify = __webpack_require__(/*! qs/lib/stringify */ "./node_modules/qs/lib/stringify.js");
var Authentication_1 = __webpack_require__(/*! ./Authentication */ "./src/Authentication.ts");
var ConcurrencyManager_1 = __webpack_require__(/*! ./ConcurrencyManager */ "./src/ConcurrencyManager.ts");
// Utilities
var utils_1 = __webpack_require__(/*! ./utils */ "./src/utils/index.ts");
/**
 * API definition for HTTP transactions
 * @uses Authentication
 * @uses axios
 * @author Jan Biasi <biasijan@gmail.com>
 */
var API = /** @class */ (function () {
    function API(config) {
        this.config = config;
        this.xhr = axios_1.default.create({
            paramsSerializer: qsStringify,
            timeout: 10 * 60 * 1000,
        });
        this.concurrent = ConcurrencyManager_1.concurrencyManager(this.xhr, 10);
        this.auth = new Authentication_1.Authentication(config, {
            post: this.post.bind(this),
        });
    }
    /**
     * Resets the client instance by logging out and removing the URL and project
     */
    API.prototype.reset = function () {
        this.auth.logout();
        this.config.deleteHydratedConfig();
    };
    /// REQUEST METHODS ----------------------------------------------------------
    /**
     * GET convenience method. Calls the request method for you
     * @typeparam T   response type
     * @return {Promise<T>}
     */
    API.prototype.get = function (endpoint, params) {
        if (params === void 0) { params = {}; }
        utils_1.invariant(utils_1.isString(endpoint), "endpoint must be a string");
        utils_1.invariant(utils_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.request("get", endpoint, params);
    };
    /**
     * POST convenience method. Calls the request method for you
     * @typeparam T   response type
     * @return {Promise<T>}
     */
    API.prototype.post = function (endpoint, body, params) {
        if (body === void 0) { body = {}; }
        if (params === void 0) { params = {}; }
        utils_1.invariant(utils_1.isString(endpoint), "endpoint must be a string");
        utils_1.invariant(Array.isArray(body) ? utils_1.isArrayOrEmpty(body) : utils_1.isObjectOrEmpty(body), "body must be an array or object");
        return this.request("post", endpoint, params, body);
    };
    /**
     * PATCH convenience method. Calls the request method for you
     * @typeparam T   response type
     * @return {Promise<T>}
     */
    API.prototype.patch = function (endpoint, body, params) {
        if (body === void 0) { body = {}; }
        if (params === void 0) { params = {}; }
        utils_1.invariant(utils_1.isString(endpoint), "endpoint must be a string");
        utils_1.invariant(Array.isArray(body) ? utils_1.isArrayOrEmpty(body) : utils_1.isObjectOrEmpty(body), "body must be an array or object");
        return this.request("patch", endpoint, params, body);
    };
    /**
     * PUT convenience method. Calls the request method for you
     * @typeparam T   response type
     * @return {Promise<T>}
     */
    API.prototype.put = function (endpoint, body, params) {
        if (body === void 0) { body = {}; }
        if (params === void 0) { params = {}; }
        utils_1.invariant(utils_1.isString(endpoint), "endpoint must be a string");
        utils_1.invariant(Array.isArray(body) ? utils_1.isArrayOrEmpty(body) : utils_1.isObjectOrEmpty(body), "body must be an array or object");
        return this.request("put", endpoint, params, body);
    };
    /**
     * DELETE convenience method. Calls the request method for you
     * @typeparam T   response type
     * @return {Promise<T>}
     */
    API.prototype.delete = function (endpoint) {
        utils_1.invariant(utils_1.isString(endpoint), "endpoint must be a string");
        return this.request("delete", endpoint);
    };
    /**
     * Gets the payload of the current token, return type can be generic
     * @typeparam T   extends object, payload type
     * @return {Promise<T>}
     */
    API.prototype.getPayload = function () {
        if (!utils_1.isString(this.config.token)) {
            return null;
        }
        return utils_1.getPayload(this.config.token);
    };
    /**
     * Perform an API request to the Directus API
     * @param {RequestMethod} method    Selected HTTP method
     * @param {string} endpoint         Endpoint definition as path
     * @param {object={}} params        Query parameters
     * @param {object={}} data          Data passed to directus
     * @param {boolean=false} noEnv     Do not include the `env` in the url (for system calls)
     * @param {object={}} headers       Optional headers to include
     * @param {boolean=false} skipParseToJSON  Whether to skip `JSON.parse` or not
     * @typeparam T                     Response type definition, defaults to `any`
     * @return {Promise<T>}
     */
    API.prototype.request = function (method, endpoint, params, data, noEnv, headers, skipParseToJSON) {
        if (params === void 0) { params = {}; }
        if (data === void 0) { data = {}; }
        if (noEnv === void 0) { noEnv = false; }
        if (headers === void 0) { headers = {}; }
        if (skipParseToJSON === void 0) { skipParseToJSON = false; }
        utils_1.invariant(utils_1.isString(method), "method must be a string");
        utils_1.invariant(utils_1.isString(endpoint), "endpoint must be a string");
        utils_1.invariant(utils_1.isObjectOrEmpty(params), "params must be an object or empty");
        utils_1.invariant(utils_1.isString(this.config.url), "main url must be defined (see constructor)");
        utils_1.invariant(Array.isArray(data) ? utils_1.isArrayOrEmpty(data) : utils_1.isObjectOrEmpty(data), "data must be an array or object");
        var baseURL = this.config.url + "/";
        if (noEnv === false) {
            baseURL += this.config.project + "/";
        }
        var requestOptions = {
            baseURL: baseURL,
            data: data,
            headers: headers,
            method: method,
            params: params,
            url: endpoint,
        };
        if (this.config.token && utils_1.isString(this.config.token) && this.config.token.length > 0) {
            requestOptions.headers = headers;
            requestOptions.headers.Authorization = "Bearer " + this.config.token;
        }
        return this.xhr
            .request(requestOptions)
            .then(function (res) { return res.data; })
            .then(function (responseData) {
            if (!responseData || responseData.length === 0) {
                return responseData;
            }
            if (typeof responseData !== "object") {
                try {
                    return skipParseToJSON ? responseData : JSON.parse(responseData);
                }
                catch (error) {
                    throw {
                        data: responseData,
                        error: error,
                        json: true,
                    };
                }
            }
            return responseData;
        })
            .catch(function (error) {
            if (error.response) {
                throw error.response.data.error;
            }
            else if (error.json === true) {
                throw {
                    code: -2,
                    data: error.data,
                    error: error.error,
                    message: "API returned invalid JSON",
                };
            }
            else {
                throw {
                    code: -1,
                    error: error,
                    message: "Network Error",
                };
            }
        });
    };
    return API;
}());
exports.API = API;


/***/ }),

/***/ "./src/Authentication.ts":
/*!*******************************!*\
  !*** ./src/Authentication.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @module Authentication
 */
Object.defineProperty(exports, "__esModule", { value: true });
// Utilities
var utils_1 = __webpack_require__(/*! ./utils */ "./src/utils/index.ts");
/**
 * Handles all authentication related logic, decoupled from the core
 * @internal
 * @author Jan Biasi <biasijan@gmail.com>
 */
var Authentication = /** @class */ (function () {
    /**
     * Creates a new authentication instance
     * @constructor
     * @param {IConfiguration} config
     * @param {IAuthenticationInjectableProps} inject
     */
    function Authentication(config, inject) {
        this.config = config;
        this.inject = inject;
        // Only start the auto refresh interval if the token exists and it's a JWT
        if (config.token && config.token.includes(".")) {
            this.startInterval(true);
        }
    }
    /**
     * If the current auth status is logged in
     * @return {boolean}
     */
    Authentication.prototype.isLoggedIn = function () {
        if (utils_1.isString(this.config.token) &&
            utils_1.isString(this.config.url) &&
            utils_1.isString(this.config.project) &&
            utils_1.isObject(this.getPayload())) {
            if (this.config.localExp > Date.now()) {
                // Not expired, succeed
                return true;
            }
        }
        return false;
    };
    /**
     * Login to the API; Gets a new token from the API and stores it in this.token.
     * @param {ILoginCredentials} credentials   User login credentials
     * @param {ILoginOptions?} options          Additional options regarding persistance and co.
     * @return {Promise<ILoginResponse>}
     */
    Authentication.prototype.login = function (credentials, options) {
        var _this = this;
        utils_1.invariant(utils_1.isObject(credentials), "malformed credentials");
        utils_1.invariant(utils_1.isString(credentials.email) && utils_1.isString(credentials.password), "email & password are required in credentials");
        this.config.token = null;
        if (utils_1.isString(credentials.url)) {
            this.config.url = credentials.url;
        }
        if (utils_1.isString(credentials.project)) {
            this.config.project = credentials.project;
        }
        if (credentials.persist || (options && options.persist) || this.config.persist) {
            // use interval for login refresh when option persist enabled
            this.startInterval();
        }
        return new Promise(function (resolve, reject) {
            _this.inject
                .post("/auth/authenticate", {
                email: credentials.email,
                password: credentials.password,
            })
                .then(function (res) {
                // save new token in configuration
                return (_this.config.token = res.data.token);
            })
                .then(function (token) {
                // expiry date is the moment we got the token + 5 minutes
                _this.config.localExp = new Date(Date.now() + _this.config.tokenExpirationTime).getTime();
                resolve({
                    localExp: _this.config.localExp,
                    project: _this.config.project,
                    token: token,
                    url: _this.config.url,
                });
            })
                .catch(reject);
        });
    };
    /**
     * Logs the user out by "forgetting" the token, and clearing the refresh interval
     */
    Authentication.prototype.logout = function () {
        this.config.reset();
        if (this.refreshInterval) {
            this.stopInterval();
        }
    };
    /// REFRESH METHODS ----------------------------------------------------------
    /**
     * Refresh the token if it is about to expire (within 30 seconds of expiry date).
     * - Calls onAutoRefreshSuccess with the new token if the refreshing is successful.
     * - Calls onAutoRefreshError if refreshing the token fails for some reason.
     * @return {RefreshIfNeededResponse}
     */
    Authentication.prototype.refreshIfNeeded = function () {
        var _this = this;
        var payload = this.getPayload();
        var _a = this.config, token = _a.token, url = _a.url, project = _a.project, localExp = _a.localExp;
        if (!utils_1.isString(token) || !utils_1.isString(url) || !utils_1.isString(project)) {
            return;
        }
        if (!payload || !payload.exp) {
            return;
        }
        var timeDiff = (localExp || 0) - Date.now();
        if (timeDiff <= 0) {
            // token has expired, skipping auto refresh
            if (utils_1.isFunction(this.onAutoRefreshError)) {
                this.onAutoRefreshError({
                    code: 102,
                    message: "auth_expired_token",
                });
            }
            return;
        }
        if (timeDiff < 30000) {
            return new Promise(function (resolve) {
                _this.refresh(token)
                    .then(function (res) {
                    _this.config.localExp = new Date(Date.now() + _this.config.tokenExpirationTime).getTime();
                    _this.config.token = res.data.token || token;
                    // if autorefresh succeeded
                    if (utils_1.isFunction(_this.onAutoRefreshSuccess)) {
                        _this.onAutoRefreshSuccess(_this.config);
                    }
                    resolve([true]);
                })
                    .catch(function (error) {
                    if (utils_1.isFunction(_this.onAutoRefreshError)) {
                        _this.onAutoRefreshError(error);
                    }
                    resolve([true, error]);
                });
            });
        }
        else {
            Promise.resolve([false]);
        }
    };
    /**
     * Use the passed token to request a new one.
     * @param {string} token
     */
    Authentication.prototype.refresh = function (token) {
        utils_1.invariant(utils_1.isString(token), "token must be a string");
        return this.inject.post("/auth/refresh", { token: token });
    };
    /**
     * Starts an interval of 10 seconds that will check if the token needs refreshing
     * @param {boolean?} fireImmediately    If it should immediately call [refreshIfNeeded]
     */
    Authentication.prototype.startInterval = function (fireImmediately) {
        if (fireImmediately) {
            this.refreshIfNeeded();
        }
        this.refreshInterval = setInterval(this.refreshIfNeeded.bind(this), 10000);
    };
    /**
     * Clears and nullifies the token refreshing interval
     */
    Authentication.prototype.stopInterval = function () {
        clearInterval(this.refreshInterval);
        this.refreshInterval = null;
    };
    /**
     * Gets the payload of the current token, return type can be generic
     * @typeparam T     The payload response type, arbitrary object
     * @return {T}
     */
    Authentication.prototype.getPayload = function () {
        if (!utils_1.isString(this.config.token)) {
            return null;
        }
        return utils_1.getPayload(this.config.token);
    };
    return Authentication;
}());
exports.Authentication = Authentication;


/***/ }),

/***/ "./src/ConcurrencyManager.ts":
/*!***********************************!*\
  !*** ./src/ConcurrencyManager.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @module ConcurrencyManager
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Handling and limiting concurrent requests for the API.
 * @param {AxiosInstance} axios   Reference to the caller instance
 * @param {number=10} limit       When to reate-limit outgoing requests
 * @author Jan Biasi <biasijan@gmail.com>
 */
exports.concurrencyManager = function (axios, limit) {
    if (limit === void 0) { limit = 10; }
    if (limit < 1) {
        throw new Error("ConcurrencyManager Error: minimun concurrent requests is 1");
    }
    var instance = {
        limit: limit,
        queue: [],
        running: [],
        interceptors: {
            request: null,
            response: null,
        },
        push: function (reqHandler) {
            instance.queue.push(reqHandler);
            instance.shiftInitial();
        },
        shiftInitial: function () {
            setTimeout(function () {
                if (instance.running.length < instance.limit) {
                    instance.shift();
                }
            }, 0);
        },
        shift: function () {
            if (instance.queue.length) {
                var queued = instance.queue.shift();
                queued.resolver(queued.request);
                instance.running.push(queued);
            }
        },
        // use as interceptor. Queue outgoing requests
        requestHandler: function (req) {
            return new Promise(function (resolve) {
                instance.push({
                    request: req,
                    resolver: resolve,
                });
            });
        },
        // use as interceptor. Execute queued request upon receiving a response
        responseHandler: function (res) {
            instance.running.shift();
            instance.shift();
            return res;
        },
        detach: function () {
            axios.interceptors.request.eject(instance.interceptors.request);
            axios.interceptors.response.eject(instance.interceptors.response);
        },
        attach: function (limitConcurrentRequestsTo) {
            if (limitConcurrentRequestsTo) {
                instance.limit = limitConcurrentRequestsTo;
            }
            // queue concurrent requests
            instance.interceptors.request = axios.interceptors.request.use(instance.requestHandler);
            instance.interceptors.response = axios.interceptors.response.use(instance.responseHandler, instance.responseHandler);
        },
    };
    return instance;
};


/***/ }),

/***/ "./src/Configuration.ts":
/*!******************************!*\
  !*** ./src/Configuration.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @module Configuration
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(/*! ./utils */ "./src/utils/index.ts");
var STORAGE_KEY = "directus-sdk-js";
/**
 * Configuration holder for directus implementations
 * @author Jan Biasi <biasijan@gmail.com>
 */
var Configuration = /** @class */ (function () {
    /**
     * Creates a new configuration instance, will be used once for each directus instance (passing refs).
     * @constructor
     * @param {IConfigurationOptions} initialConfig   Initial configuration values
     * @param {IStorageAPI?} storage                  Storage adapter for persistence
     */
    function Configuration(initialConfig, storage) {
        if (initialConfig === void 0) { initialConfig = {}; }
        this.storage = storage;
        var dehydratedConfig = {};
        if (storage && Boolean(initialConfig && initialConfig.persist)) {
            // dehydrate if storage was provided and persist flag is set
            dehydratedConfig = this.dehydratedInitialConfiguration(storage);
        }
        var persist = Boolean(dehydratedConfig.persist || initialConfig.persist);
        var project = dehydratedConfig.project || initialConfig.project || Configuration.defaults.project;
        var tokenExpirationTime = dehydratedConfig.tokenExpirationTime ||
            initialConfig.tokenExpirationTime ||
            Configuration.defaults.tokenExpirationTime;
        this.internalConfiguration = __assign({}, initialConfig, dehydratedConfig, { persist: persist,
            project: project,
            tokenExpirationTime: tokenExpirationTime });
    }
    Object.defineProperty(Configuration.prototype, "token", {
        // ACCESSORS =================================================================
        get: function () {
            return this.internalConfiguration.token;
        },
        set: function (token) {
            this.partialUpdate({ token: token });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "tokenExpirationTime", {
        get: function () {
            return this.internalConfiguration.tokenExpirationTime;
        },
        set: function (tokenExpirationTime) {
            // TODO: Optionally re-compute the localExp property for the auto-refresh
            this.partialUpdate({
                tokenExpirationTime: tokenExpirationTime * 60000,
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "url", {
        get: function () {
            return this.internalConfiguration.url;
        },
        set: function (url) {
            this.partialUpdate({ url: url });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "project", {
        get: function () {
            return this.internalConfiguration.project;
        },
        set: function (project) {
            this.partialUpdate({
                project: project || "_",
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "localExp", {
        get: function () {
            return this.internalConfiguration.localExp;
        },
        set: function (localExp) {
            this.partialUpdate({ localExp: localExp });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "persist", {
        get: function () {
            return this.internalConfiguration.persist;
        },
        set: function (persist) {
            this.internalConfiguration.persist = persist;
        },
        enumerable: true,
        configurable: true
    });
    // HELPER METHODS ============================================================
    /**
     * Validates if the configuration is valid
     * @throws {Error}
     */
    Configuration.prototype.validate = function () {
        utils_1.invariant(utils_1.isString(this.url), "configuration - url must be defined");
        utils_1.invariant(utils_1.isString(this.project), "configuration - project must be defined");
        utils_1.invariant(utils_1.isString(this.token), "configuration - project must be defined");
    };
    /**
     * Update the configuration values, will also hydrate them if persistance activated
     * @param {IConfigurationValues} config
     */
    Configuration.prototype.update = function (config) {
        this.internalConfiguration = config;
        this.hydrate(config);
    };
    /**
     * Update partials of the configuration, behaves like the [update] method
     * @param {Partial<IConfigurationValues>} config
     */
    Configuration.prototype.partialUpdate = function (config) {
        this.internalConfiguration = __assign({}, this.internalConfiguration, config);
        this.hydrate(this.internalConfiguration);
    };
    /**
     * Reset the whole confiugration and remove hydrated values from storage as well
     */
    Configuration.prototype.reset = function () {
        delete this.internalConfiguration.token;
        delete this.internalConfiguration.url;
        delete this.internalConfiguration.localExp;
        this.internalConfiguration.project = "_";
        this.deleteHydratedConfig();
    };
    // STORAGE METHODS ===========================================================
    Configuration.prototype.dehydrate = function () {
        if (!this.storage || !this.persist) {
            return;
        }
        var nativeValue = this.storage.getItem(STORAGE_KEY);
        if (!nativeValue) {
            return;
        }
        var parsedConfig = JSON.parse(nativeValue);
        this.internalConfiguration = parsedConfig;
        return parsedConfig;
    };
    Configuration.prototype.hydrate = function (props) {
        if (!this.storage || !this.persist) {
            return;
        }
        this.storage.setItem(STORAGE_KEY, JSON.stringify(props));
    };
    Configuration.prototype.deleteHydratedConfig = function () {
        if (!this.storage || !this.persist) {
            return;
        }
        this.storage.removeItem(STORAGE_KEY);
    };
    Configuration.prototype.dehydratedInitialConfiguration = function (storage) {
        if (!storage) {
            return {};
        }
        var nativeValue = storage.getItem(STORAGE_KEY);
        if (!nativeValue) {
            return;
        }
        try {
            return JSON.parse(nativeValue);
        }
        catch (err) {
            return {};
        }
    };
    /**
     * Defaults for all directus sdk instances, can be modified if preferred
     * @type {IConfigurationDefaults}
     */
    Configuration.defaults = {
        project: "_",
        tokenExpirationTime: 5 * 6 * 1000,
    };
    return Configuration;
}());
exports.Configuration = Configuration;


/***/ }),

/***/ "./src/SDK.ts":
/*!********************!*\
  !*** ./src/SDK.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @module SDK
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// Utilities
var collection_1 = __webpack_require__(/*! ./utils/collection */ "./src/utils/collection.ts");
var payload_1 = __webpack_require__(/*! ./utils/payload */ "./src/utils/payload.ts");
// Manager classes
var API_1 = __webpack_require__(/*! ./API */ "./src/API.ts");
var Configuration_1 = __webpack_require__(/*! ./Configuration */ "./src/Configuration.ts");
// Utilities
var utils_1 = __webpack_require__(/*! ./utils */ "./src/utils/index.ts");
/**
 * Main SDK implementation provides the public API to interact with a
 * remote directus instance.
 * @uses API
 * @uses Configuration
 */
var SDK = /** @class */ (function () {
    // create a new instance with an API
    function SDK(options) {
        this.config = new Configuration_1.Configuration(options);
        this.api = new API_1.API(this.config);
    }
    Object.defineProperty(SDK.prototype, "loggedIn", {
        get: function () {
            return this.api.auth.isLoggedIn();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SDK.prototype, "payload", {
        get: function () {
            if (!this.config.token) {
                return null;
            }
            return this.api.getPayload();
        },
        enumerable: true,
        configurable: true
    });
    // #region authentication
    /**
     * Login to the API; Gets a new token from the API and stores it in this.api.token.
     */
    SDK.prototype.login = function (credentials, options) {
        return this.api.auth.login(credentials, options);
    };
    /**
     * Logs the user out by "forgetting" the token, and clearing the refresh interval
     */
    SDK.prototype.logout = function () {
        this.api.auth.logout();
    };
    /**
     * Resets the client instance by logging out and removing the URL and project
     */
    SDK.prototype.reset = function () {
        this.api.reset();
    };
    /**
     * Refresh the token if it is about to expire (within 30 seconds of expiry date).
     * - Calls onAutoRefreshSuccess with the new token if the refreshing is successful.
     * - Calls onAutoRefreshError if refreshing the token fails for some reason.
     * @returns {[boolean, Error?]}
     */
    SDK.prototype.refreshIfNeeded = function () {
        return this.api.auth.refreshIfNeeded();
    };
    /**
     * Use the passed token to request a new one
     */
    SDK.prototype.refresh = function (token) {
        return this.api.auth.refresh(token);
    };
    /**
     * Request to reset the password of the user with the given email address.
     * The API will send an email to the given email address with a link to generate a new
     * temporary password.
     */
    SDK.prototype.requestPasswordReset = function (email) {
        utils_1.invariant(utils_1.isString(email), "email must be a string");
        return this.api.post("/auth/password/request", {
            email: email,
        });
    };
    // #endregion authentication
    // #endregion collection presets
    // #region activity
    /**
     * Get activity
     */
    SDK.prototype.getActivity = function (params) {
        if (params === void 0) { params = {}; }
        utils_1.invariant(utils_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.api.get("/activity", params);
    };
    // #endregion activity
    // #region bookmarks
    /**
     * Get the bookmarks of the current user
     * @deprecated Will be removed in the next major version, please use {@link SDK.getCollectionPresets} instead
     * @see https://docs.directus.io/advanced/legacy-upgrades.html#directus-bookmarks
     */
    SDK.prototype.getMyBookmarks = function (params) {
        if (params === void 0) { params = {}; }
        // prettier-ignore
        // eslint-disable-next-line max-len
        console.log("Warning: getMyBookmarks has been deprecated, please use getCollectionPresets instead (see https://docs.directus.io/advanced/legacy-upgrades.html#directus-bookmarks)");
        return this.getCollectionPresets(params);
    };
    // #endregion bookmarks
    // #region collections
    /**
     * Get all available collections
     */
    SDK.prototype.getCollections = function (params) {
        if (params === void 0) { params = {}; }
        utils_1.invariant(utils_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.api.get("/collections", params);
    };
    /**
     * Get collection info by name
     */
    SDK.prototype.getCollection = function (collection, params) {
        if (params === void 0) { params = {}; }
        utils_1.invariant(utils_1.isString(collection), "collection must be a string");
        utils_1.invariant(utils_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.api.get("/collections/" + collection, params);
    };
    /**
     * Create a collection
     */
    SDK.prototype.createCollection = function (data) {
        utils_1.invariant(utils_1.isObject(data), "data must be an object");
        return this.api.post("/collections", data);
    };
    /**
     * Updates a certain collection
     */
    SDK.prototype.updateCollection = function (collection, data) {
        utils_1.invariant(utils_1.isString(collection), "collection must be a string");
        utils_1.invariant(utils_1.isObject(data), "data must be an object");
        return this.api.patch("/collections/" + collection, data);
    };
    /**
     * Deletes a certain collection
     */
    SDK.prototype.deleteCollection = function (collection) {
        utils_1.invariant(utils_1.isString(collection), "collection must be a string");
        return this.api.delete("/collections/" + collection);
    };
    // #endregion collections
    // #region collection presets
    /**
     * Get the collection presets of the current user
     * @see https://docs.directus.io/api/reference.html#collection-presets
     */
    SDK.prototype.getCollectionPresets = function (params) {
        if (params === void 0) { params = {}; }
        utils_1.invariant(utils_1.isString(this.config.token), "defined token is not a string");
        utils_1.invariant(utils_1.isObjectOrEmpty(params), "params must be an object or empty");
        var payload = this.api.getPayload();
        return Promise.all([
            this.api.get("/collection_presets", {
                "filter[title][nnull]": 1,
                "filter[user][eq]": payload.id,
            }),
            this.api.get("/collection_presets", {
                "filter[role][eq]": payload.role,
                "filter[title][nnull]": 1,
                "filter[user][null]": 1,
            }),
        ]).then(function (values) {
            var user = values[0], role = values[1];
            return (user.data || []).concat((role.data || []));
        });
    };
    /**
     * Create a new collection preset (bookmark / listing preferences)
     * @see https://docs.directus.io/api/reference.html#collection-presets
     */
    SDK.prototype.createCollectionPreset = function (data) {
        utils_1.invariant(utils_1.isObject(data), "data must be an object");
        return this.api.post("/collection_presets", data);
    };
    /**
     * Update collection preset (bookmark / listing preference)
     * @see https://docs.directus.io/api/reference.html#collection-presets
     */
    SDK.prototype.updateCollectionPreset = function (primaryKey, data) {
        utils_1.invariant(utils_1.isNotNull(primaryKey), "primaryKey must be defined");
        utils_1.invariant(utils_1.isObject(data), "data must be an object");
        return this.api.patch("/collection_presets/" + primaryKey, data);
    };
    /**
     * Delete collection preset by primarykey
     * @see https://docs.directus.io/api/reference.html#collection-presets
     */
    SDK.prototype.deleteCollectionPreset = function (primaryKey) {
        utils_1.invariant(utils_1.isNotNull(primaryKey), "primaryKey must be defined");
        return this.api.delete("/collection_presets/" + primaryKey);
    };
    // #endregion collection presets
    // #region extensions
    /**
     * Get the information of all installed interfaces
     * @see https://docs.directus.io/api/reference.html#get-extensions
     */
    SDK.prototype.getInterfaces = function () {
        return this.api.request("get", "/interfaces", {}, {}, true);
    };
    /**
     * Get the information of all installed layouts
     * @see https://docs.directus.io/api/reference.html#get-extensions
     */
    SDK.prototype.getLayouts = function () {
        return this.api.request("get", "/layouts", {}, {}, true);
    };
    /**
     * Get the information of all installed pages
     * @see https://docs.directus.io/api/reference.html#get-extensions
     */
    SDK.prototype.getPages = function () {
        return this.api.request("get", "/pages", {}, {}, true);
    };
    // #endregion extensions
    // #region fields
    /**
     * Get all fields that are in Directus
     * @see https://docs.directus.io/api/reference.html#fields-2
     */
    SDK.prototype.getAllFields = function (params) {
        if (params === void 0) { params = {}; }
        utils_1.invariant(utils_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.api.get("/fields", params);
    };
    /**
     * Get the fields that have been setup for a given collection
     * @see https://docs.directus.io/api/reference.html#fields-2
     */
    SDK.prototype.getFields = function (collection, params) {
        if (params === void 0) { params = {}; }
        utils_1.invariant(utils_1.isString(collection), "collection must be a string");
        utils_1.invariant(utils_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.api.get("/fields/" + collection, params);
    };
    /**
     * Get the field information for a single given field
     * @see https://docs.directus.io/api/reference.html#fields-2
     */
    SDK.prototype.getField = function (collection, fieldName, params) {
        if (params === void 0) { params = {}; }
        utils_1.invariant(utils_1.isString(collection), "collection must be a string");
        utils_1.invariant(utils_1.isString(fieldName), "fieldName must be a string");
        utils_1.invariant(utils_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.api.get("/fields/" + collection + "/" + fieldName, params);
    };
    /**
     * Create a field in the given collection
     * @see https://docs.directus.io/api/reference.html#fields-2
     */
    SDK.prototype.createField = function (collection, fieldInfo) {
        utils_1.invariant(utils_1.isString(collection), "collection must be a string");
        utils_1.invariant(utils_1.isObject(fieldInfo), "fieldInfo must be an object");
        return this.api.post("/fields/" + collection, fieldInfo);
    };
    /**
     * Update a given field in a given collection
     * @see https://docs.directus.io/api/reference.html#fields-2
     */
    SDK.prototype.updateField = function (collection, fieldName, fieldInfo) {
        utils_1.invariant(utils_1.isString(collection), "collection must be a string");
        utils_1.invariant(utils_1.isString(fieldName), "fieldName must be a string");
        utils_1.invariant(utils_1.isObject(fieldInfo), "fieldInfo must be an object");
        return this.api.patch("/fields/" + collection + "/" + fieldName, fieldInfo);
    };
    SDK.prototype.updateFields = function (collection, fieldsInfoOrFieldNames, fieldInfo) {
        if (fieldInfo === void 0) { fieldInfo = null; }
        utils_1.invariant(utils_1.isString(collection), "collection must be a string");
        utils_1.invariant(utils_1.isArray(fieldsInfoOrFieldNames), "fieldsInfoOrFieldNames must be an array");
        if (fieldInfo) {
            utils_1.invariant(utils_1.isObject(fieldInfo), "fieldInfo must be an object");
        }
        if (fieldInfo) {
            return this.api.patch("/fields/" + collection + "/" + fieldsInfoOrFieldNames.join(","), fieldInfo);
        }
        return this.api.patch("/fields/" + collection, fieldsInfoOrFieldNames);
    };
    /**
     * Delete a field from a collection
     * @see @see https://docs.directus.io/api/reference.html#fields-2
     */
    SDK.prototype.deleteField = function (collection, fieldName) {
        utils_1.invariant(utils_1.isString(collection), "collection must be a string");
        utils_1.invariant(utils_1.isString(fieldName), "fieldName must be a string");
        return this.api.delete("/fields/" + collection + "/" + fieldName);
    };
    // #endregion fields
    // #region files
    /**
     * Get a list of available files from Directus
     * @see https://docs.directus.io/api/reference.html#files
     */
    SDK.prototype.getFiles = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                utils_1.invariant(utils_1.isObjectOrEmpty(params), "Params must be an object");
                return [2 /*return*/, this.api.get("/files", params)];
            });
        });
    };
    /**
     * Get a certain file or certain file list from Directus
     * @see https://docs.directus.io/api/reference.html#files
     */
    SDK.prototype.getFile = function (fileName, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, Promise, function () {
            var files;
            return __generator(this, function (_a) {
                utils_1.invariant(utils_1.isString(fileName), "FileName must be string");
                utils_1.invariant(utils_1.isObjectOrEmpty(params), "Params must be an object");
                files = typeof fileName === "string" ? fileName : fileName.join(",");
                return [2 /*return*/, this.api.get("/files/" + files, params)];
            });
        });
    };
    /**
     * Upload multipart files in multipart/form-data.
     * Important: if you're using the `form-data` module, make sure that you pass
     * the generated headers as overrideHeaders option!
     * @see https://docs.directus.io/api/reference.html#files
     * @example
     * // with browser
     * const formData = new FormData();
     * client.uploadFiles(formData);
     *
     * // with Node.js
     * const FormData = require('form-data')
     * const formData = new FormData();
     * client.uploadFiles(formData, () => {}, formData.getHeaders());
     */
    SDK.prototype.uploadFiles = function (data, // TODO: fix type definition
    onUploadProgress, overrideHeaders) {
        var _this = this;
        if (onUploadProgress === void 0) { onUploadProgress = function () { return ({}); }; }
        if (overrideHeaders === void 0) { overrideHeaders = {}; }
        var headers = __assign({ Authorization: "Bearer " + this.config.token, "Content-Type": "multipart/form-data" }, overrideHeaders);
        // limit concurrent requests to 5
        this.api.concurrent.attach(5);
        return this.api.xhr
            .post(this.config.url + "/" + this.config.project + "/files", data, {
            headers: headers,
            onUploadProgress: onUploadProgress,
        })
            .then(function (res) {
            // detach concurrency manager
            _this.api.concurrent.detach();
            return res.data;
        })
            .catch(function (error) {
            // detach concurrency manager
            _this.api.concurrent.detach();
            if (error.response) {
                throw error.response.data.error;
            }
            else {
                throw {
                    code: -1,
                    error: error,
                    message: "Network Error",
                };
            }
        });
    };
    // #endregion files
    // #region items
    /**
     * Update an existing item
     * @see https://docs.directus.io/api/reference.html#update-item
     * @typeparam TTPartialItem Defining the item type in object schema
     * @typeparam TTResult Extension of [TPartialItem] as expected result
     */
    SDK.prototype.updateItem = function (collection, primaryKey, body, params) {
        if (params === void 0) { params = {}; }
        utils_1.invariant(utils_1.isString(collection), "collection must be a string");
        utils_1.invariant(utils_1.isNotNull(primaryKey), "primaryKey must be defined");
        utils_1.invariant(utils_1.isObject(body), "body must be an object");
        var collectionBasePath = collection_1.getCollectionItemPath(collection);
        return this.api.patch(collectionBasePath + "/" + primaryKey, body, params);
    };
    /**
     * Update multiple items
     * @see https://docs.directus.io/api/reference.html#update-items
     * @typeparam TPartialItem Defining an array of items, each in object schema
     * @typeparam TResult Extension of [TPartialItem] as expected result
     * @return {Promise<IItemsResponse<TPartialItem & TResult>>}
     */
    SDK.prototype.updateItems = function (collection, body, params) {
        if (params === void 0) { params = {}; }
        utils_1.invariant(utils_1.isString(collection), "collection must be a string");
        utils_1.invariant(utils_1.isArray(body), "body must be an array");
        var collectionBasePath = collection_1.getCollectionItemPath(collection);
        return this.api.patch(collectionBasePath, body, params);
    };
    /**
     * Create a new item
     * @typeparam TItemType Defining an item and its fields in object schema
     * @return {Promise<IItemsResponse<TItemType>>}
     */
    SDK.prototype.createItem = function (collection, body) {
        utils_1.invariant(utils_1.isString(collection), "collection must be a string");
        utils_1.invariant(utils_1.isObject(body), "body must be an object");
        var collectionBasePath = collection_1.getCollectionItemPath(collection);
        return this.api.post(collectionBasePath, body);
    };
    /**
     * Create multiple items
     * @see https://docs.directus.io/api/reference.html#create-items
     * @typeparam TItemsType Defining an array of items, each in object schema
     */
    SDK.prototype.createItems = function (collection, body) {
        utils_1.invariant(utils_1.isString(collection), "collection must be a string");
        utils_1.invariant(utils_1.isArray(body), "body must be an array");
        var collectionBasePath = collection_1.getCollectionItemPath(collection);
        return this.api.post(collectionBasePath, body);
    };
    /**
     * Get items from a given collection
     * @see https://docs.directus.io/api/reference.html#get-multiple-items
     * @typeparam TItemsType Defining an array of items, each in object schema
     */
    SDK.prototype.getItems = function (collection, params) {
        if (params === void 0) { params = {}; }
        utils_1.invariant(utils_1.isString(collection), "collection must be a string");
        utils_1.invariant(utils_1.isObjectOrEmpty(params), "params must be an object or empty");
        var collectionBasePath = collection_1.getCollectionItemPath(collection);
        return this.api.get(collectionBasePath, params);
    };
    /**
     * Get a single item by primary key
     * @see https://docs.directus.io/api/reference.html#get-item
     * @typeparam TItemType Defining fields of an item in object schema
     */
    SDK.prototype.getItem = function (collection, primaryKey, params) {
        if (params === void 0) { params = {}; }
        utils_1.invariant(utils_1.isString(collection), "collection must be a string");
        utils_1.invariant(utils_1.isNotNull(primaryKey), "primaryKey must be defined");
        utils_1.invariant(utils_1.isObjectOrEmpty(params), "params must be an object or empty");
        var collectionBasePath = collection_1.getCollectionItemPath(collection);
        return this.api.get(collectionBasePath + "/" + primaryKey, params);
    };
    /**
     * Delete a single item by primary key
     * @see https://docs.directus.io/api/reference.html#delete-items
     */
    SDK.prototype.deleteItem = function (collection, primaryKey) {
        utils_1.invariant(utils_1.isString(collection), "collection must be a string");
        utils_1.invariant(utils_1.isNotNull(primaryKey), "primaryKey must be defined");
        var collectionBasePath = collection_1.getCollectionItemPath(collection);
        return this.api.delete(collectionBasePath + "/" + primaryKey);
    };
    /**
     * Delete multiple items by primary key
     * @see https://docs.directus.io/api/reference.html#delete-items
     */
    SDK.prototype.deleteItems = function (collection, primaryKeys) {
        utils_1.invariant(utils_1.isString(collection), "collection must be a string");
        utils_1.invariant(utils_1.isArray(primaryKeys), "primaryKeys must be an array");
        var collectionBasePath = collection_1.getCollectionItemPath(collection);
        return this.api.delete(collectionBasePath + "/" + primaryKeys.join());
    };
    // #endregion items
    // #region listing preferences
    /**
     * Get the collection presets of the current user for a single collection
     */
    SDK.prototype.getMyListingPreferences = function (collection, params) {
        if (params === void 0) { params = {}; }
        utils_1.invariant(utils_1.isString(this.config.token), "token must be defined");
        utils_1.invariant(utils_1.isObjectOrEmpty(params), "params must be an object or empty");
        var payload = this.api.getPayload();
        return Promise.all([
            this.api.get("/collection_presets", {
                "filter[collection][eq]": collection,
                "filter[role][null]": 1,
                "filter[title][null]": 1,
                "filter[user][null]": 1,
                limit: 1,
                sort: "-id",
            }),
            this.api.get("/collection_presets", {
                "filter[collection][eq]": collection,
                "filter[role][eq]": payload.role,
                "filter[title][null]": 1,
                "filter[user][null]": 1,
                limit: 1,
                sort: "-id",
            }),
            this.api.get("/collection_presets", {
                "filter[collection][eq]": collection,
                "filter[role][eq]": payload.role,
                "filter[title][null]": 1,
                "filter[user][eq]": payload.id,
                limit: 1,
                sort: "-id",
            }),
        ]).then(function (values) {
            var col = values[0], role = values[1], user = values[2];
            if (user.data && user.data.length > 0) {
                return user.data[0];
            }
            if (role.data && role.data.length > 0) {
                return role.data[0];
            }
            if (col.data && col.data.length > 0) {
                return col.data[0];
            }
            return {};
        });
    };
    // #endregion listing preferences
    // #region permissions
    /**
     * Get permissions
     * @param {QueryParamsType?} params
     * @return {Promise<IPermission>}
     */
    SDK.prototype.getPermissions = function (params) {
        if (params === void 0) { params = {}; }
        utils_1.invariant(utils_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.getItems("directus_permissions", params);
    };
    /**
     * TODO: Fix type-def for return
     * Get the currently logged in user's permissions
     * @typeparam TResponse Permissions type as array extending any[]
     */
    SDK.prototype.getMyPermissions = function (params) {
        if (params === void 0) { params = {}; }
        utils_1.invariant(utils_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.api.get("/permissions/me", params);
    };
    /**
     * TODO: Fix type-def for param and return
     * Create multiple new permissions
     * @typeparam TResponse Permissions type as array extending any[]
     */
    SDK.prototype.createPermissions = function (data) {
        utils_1.invariant(utils_1.isArray(data), "data must be anarry");
        return this.api.post("/permissions", data);
    };
    /**
     * TODO: Fix type-def for param and return
     * Update multiple permission records
     * @typeparam TResponse Permissions type as array extending any[]
     */
    SDK.prototype.updatePermissions = function (data) {
        utils_1.invariant(utils_1.isArray(data), "data must be anarry");
        return this.api.patch("/permissions", data);
    };
    // #endregion permissions
    // #region relations
    /**
     * Get all relationships
     * @param {QueryParamsType?} params
     * @return {Promise<IRelationsResponse>}
     */
    SDK.prototype.getRelations = function (params) {
        if (params === void 0) { params = {}; }
        utils_1.invariant(utils_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.api.get("/relations", params);
    };
    /**
     * Creates new relation
     * @param {IRelation} data
     * @return {Promise<IRelationResponse>}
     */
    SDK.prototype.createRelation = function (data) {
        return this.api.post("/relations", data);
    };
    /**
     * Updates existing relation
     */
    SDK.prototype.updateRelation = function (primaryKey, data) {
        return this.api.patch("/relations/" + primaryKey, data);
    };
    /**
     * TODO: Add type-def for return value(s)
     * Get the relationship information for the given collection
     */
    SDK.prototype.getCollectionRelations = function (collection, params) {
        if (params === void 0) { params = {}; }
        utils_1.invariant(utils_1.isString(collection), "collection must be a string");
        utils_1.invariant(utils_1.isObjectOrEmpty(params), "params must be an object or empty");
        return Promise.all([
            this.api.get("/relations", {
                "filter[collection_a][eq]": collection,
            }),
            this.api.get("/relations", {
                "filter[collection_b][eq]": collection,
            }),
        ]);
    };
    // #endregion relations
    // #region revisions
    /**
     * Get a single item's revisions by primary key
     * @typeparam DataAndDelta  The data including delta type for the revision
     * @param {string} collection
     * @param {PrimaryKeyType} primaryKey
     * @param {QueryParamsType?} params
     */
    SDK.prototype.getItemRevisions = function (collection, primaryKey, params) {
        if (params === void 0) { params = {}; }
        utils_1.invariant(utils_1.isString(collection), "collection must be a string");
        utils_1.invariant(utils_1.isNotNull(primaryKey), "primaryKey must be defined");
        utils_1.invariant(utils_1.isObjectOrEmpty(params), "params must be an object or empty");
        var collectionBasePath = collection_1.getCollectionItemPath(collection);
        return this.api.get(collectionBasePath + "/" + primaryKey + "/revisions", params);
    };
    /**
     * Revert an item to a previous state
     * @param {string} collection
     * @param {PrimaryKeyType} primaryKey
     * @param {number} revisionID
     */
    SDK.prototype.revert = function (collection, primaryKey, revisionID) {
        utils_1.invariant(utils_1.isString(collection), "collection must be a string");
        utils_1.invariant(utils_1.isNotNull(primaryKey), "primaryKey must be defined");
        utils_1.invariant(utils_1.isNumber(revisionID), "revisionID must be a number");
        var collectionBasePath = collection_1.getCollectionItemPath(collection);
        return this.api.patch(collectionBasePath + "/" + primaryKey + "/revert/" + revisionID);
    };
    // #endregion revisions
    // #region roles
    /**
     * Get a single user role
     * @param {PrimaryKeyType} primaryKey
     * @param {QueryParamsType?} params
     */
    SDK.prototype.getRole = function (primaryKey, params) {
        if (params === void 0) { params = {}; }
        utils_1.invariant(utils_1.isNumber(primaryKey), "primaryKey must be a number");
        utils_1.invariant(utils_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.api.get("/roles/" + primaryKey, params);
    };
    /**
     * Get the user roles
     * @param {QueryParamsType?} params
     */
    SDK.prototype.getRoles = function (params) {
        if (params === void 0) { params = {}; }
        utils_1.invariant(utils_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.api.get("/roles", params);
    };
    /**
     * Update a user role
     * @param {PrimaryKeyType} primaryKey
     * @param {Role} body
     */
    SDK.prototype.updateRole = function (primaryKey, body) {
        utils_1.invariant(utils_1.isNotNull(primaryKey), "primaryKey must be defined");
        utils_1.invariant(utils_1.isObject(body), "body must be an object");
        return this.updateItem("directus_roles", primaryKey, body);
    };
    /**
     * Create a new user role
     * @param {Role} body
     */
    SDK.prototype.createRole = function (body) {
        utils_1.invariant(utils_1.isObject(body), "body must be an object");
        return this.createItem("directus_roles", body);
    };
    /**
     * Delete a user rol by primary key
     * @param {PrimaryKeyType} primaryKey
     */
    SDK.prototype.deleteRole = function (primaryKey) {
        utils_1.invariant(utils_1.isNotNull(primaryKey), "primaryKey must be defined");
        return this.deleteItem("directus_roles", primaryKey);
    };
    // #endregion roles
    // #region settings
    /**
     * Get Directus' global settings
     * @param {QueryParamsType?} params
     */
    SDK.prototype.getSettings = function (params) {
        if (params === void 0) { params = {}; }
        utils_1.invariant(utils_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.api.get("/settings", params);
    };
    /**
     * Get the "fields" for directus_settings
     * @param {QueryParamsType?} params
     */
    SDK.prototype.getSettingsFields = function (params) {
        if (params === void 0) { params = {}; }
        utils_1.invariant(utils_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.api.get("/settings/fields", params);
    };
    // #endregion settings
    // #region users
    /**
     * Get a list of available users in Directus
     * @param {QueryParamsType?} params
     */
    SDK.prototype.getUsers = function (params) {
        if (params === void 0) { params = {}; }
        utils_1.invariant(utils_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.api.get("/users", params);
    };
    /**
     * Get a single Directus user
     * @param {PrimaryKeyType} primaryKey
     * @param {QueryParamsType?} params
     */
    SDK.prototype.getUser = function (primaryKey, params) {
        if (params === void 0) { params = {}; }
        utils_1.invariant(utils_1.isNotNull(primaryKey), "primaryKey must be defined");
        utils_1.invariant(utils_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.api.get("/users/" + primaryKey, params);
    };
    /**
     * Get the user info of the currently logged in user
     * @param {QueryParamsType?} params
     */
    SDK.prototype.getMe = function (params) {
        if (params === void 0) { params = {}; }
        utils_1.invariant(utils_1.isObjectOrEmpty(params), "params must be an object or empty");
        return this.api.get("/users/me", params);
    };
    /**
     * Update a single user based on primaryKey
     * @param {PrimaryKeyType} primaryKey
     * @param {QueryParamsType?} params
     */
    SDK.prototype.updateUser = function (primaryKey, body) {
        utils_1.invariant(utils_1.isNotNull(primaryKey), "primaryKey must be defined");
        utils_1.invariant(utils_1.isObject(body), "body must be an object");
        return this.updateItem("directus_users", primaryKey, body);
    };
    // #endregion users
    // #region server admin
    /**
     * This will update the database of the API instance to the latest version
     * using the migrations in the API
     * @return {Promise<void>}
     */
    SDK.prototype.updateDatabase = function () {
        return this.api.post("/update");
    };
    /**
     * Ping the API to check if it exists / is up and running, returns "pong"
     * @return {Promise<string>}
     */
    SDK.prototype.ping = function () {
        return this.api.request("get", "/server/ping", {}, {}, true, {}, true);
    };
    /**
     * Get the server info from the API
     * @return {Promise<IServerInformationResponse>}
     */
    SDK.prototype.serverInfo = function () {
        return this.api.request("get", "/", {}, {}, true);
    };
    /**
     * TODO: Add response type-def
     * Get the server info from the project
     * @return {Promise<any>}
     */
    SDK.prototype.projectInfo = function () {
        return this.api.request("get", "/");
    };
    /**
     * TODO: Add response type-def
     * Get all the setup third party auth providers
     * @return {Promise<any>}
     */
    SDK.prototype.getThirdPartyAuthProviders = function () {
        return this.api.get("/auth/sso");
    };
    // convenience method
    SDK.getPayload = payload_1.getPayload;
    return SDK;
}());
exports.SDK = SDK;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @module exports
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Configuration_1 = __webpack_require__(/*! ./Configuration */ "./src/Configuration.ts");
exports.Configuration = Configuration_1.Configuration;
var SDK_1 = __webpack_require__(/*! ./SDK */ "./src/SDK.ts");
exports.SDK = SDK_1.SDK;
var ConcurrencyManager_1 = __webpack_require__(/*! ./ConcurrencyManager */ "./src/ConcurrencyManager.ts");
exports.concurrencyManager = ConcurrencyManager_1.concurrencyManager;
var collection_1 = __webpack_require__(/*! ./utils/collection */ "./src/utils/collection.ts");
exports.getCollectionItemPath = collection_1.getCollectionItemPath;
var payload_1 = __webpack_require__(/*! ./utils/payload */ "./src/utils/payload.ts");
exports.getPayload = payload_1.getPayload;
/**
 * @deprecated please use named imports instead of defaults
 * @preferred {@link exports.SDK}
 */
exports.default = SDK_1.SDK;


/***/ }),

/***/ "./src/utils/collection.ts":
/*!*********************************!*\
  !*** ./src/utils/collection.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @module utils
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DIRECTUS_COLLECTION_PREFIX = "directus_";
/**
 * Returns the correct API path for the collection. It will
 * strip the prefix {@link DIRECTUS_COLLECTION_PREFIX | collection-prefix} or will add the
 * '/items/' path as prefix if not provided. The 'substr(9)' defines
 * the length of the defined {@link DIRECTUS_COLLECTION_PREFIX | collection-prefix}.
 * @param {string} collection     The name of the collection
 * @returns {string}
 * @internal
 *
 * @example
 * getCollectionItemPath('directus_users');
 * // => '/users'
 * getCollectionItemPath('users');
 * // => '/items/users'
 */
function getCollectionItemPath(collection) {
    if (collection.startsWith(exports.DIRECTUS_COLLECTION_PREFIX)) {
        return "/" + collection.substr(9);
    }
    return "/items/" + collection;
}
exports.getCollectionItemPath = getCollectionItemPath;


/***/ }),

/***/ "./src/utils/index.ts":
/*!****************************!*\
  !*** ./src/utils/index.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./collection */ "./src/utils/collection.ts"));
__export(__webpack_require__(/*! ./invariant */ "./src/utils/invariant.ts"));
__export(__webpack_require__(/*! ./is */ "./src/utils/is.ts"));
__export(__webpack_require__(/*! ./payload */ "./src/utils/payload.ts"));


/***/ }),

/***/ "./src/utils/invariant.ts":
/*!********************************!*\
  !*** ./src/utils/invariant.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @module utils
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Checks invariant violation against a condition, will throw an error if not fulfilled
 * @internal
 * @param {boolean} condition
 * @param {string} message
 */
exports.invariant = function (condition, message) {
    if (!!condition === true) {
        return;
    }
    throw new Error("Invariant violation: " + message);
};


/***/ }),

/***/ "./src/utils/is.ts":
/*!*************************!*\
  !*** ./src/utils/is.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @module utils
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @internal
 */
var isType = function (t, v) { return Object.prototype.toString.call(v) === "[object " + t + "]"; };
/**
 * @internal
 */
exports.isNotNull = function (v) { return v !== null && v !== undefined; };
/**
 * @internal
 */
exports.isString = function (v) { return v && typeof v === "string" && /\S/.test(v); };
/**
 * @internal
 */
exports.isNumber = function (v) { return isType("Number", v) && isFinite(v) && !isNaN(parseFloat(v)); };
/**
 * @internal
 */
exports.isFunction = function (v) { return v instanceof Function; };
/**
 * @internal
 */
exports.isObjectOrEmpty = function (v) { return isType("Object", v); };
/**
 * @internal
 */
exports.isArrayOrEmpty = function (v) { return isType("Array", v); };
/**
 * @internal
 */
exports.isArray = function (v) { return (!exports.isArrayOrEmpty(v) ? false : v.length > 0); };
/**
 * @internal
 */
exports.isObject = function (v) {
    if (!exports.isObjectOrEmpty(v)) {
        return false;
    }
    for (var key in v) {
        if (Object.prototype.hasOwnProperty.call(v, key)) {
            return true;
        }
    }
    return false;
};


/***/ }),

/***/ "./src/utils/payload.ts":
/*!******************************!*\
  !*** ./src/utils/payload.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @module utils
 */
Object.defineProperty(exports, "__esModule", { value: true });
var base64 = __webpack_require__(/*! base-64 */ "./node_modules/base-64/base64.js");
var is_1 = __webpack_require__(/*! ./is */ "./src/utils/is.ts");
/**
 * Retrieves the payload from a JWT
 * @internal
 * @param  {String} token The JWT to retrieve the payload from
 * @return {Object}       The JWT payload
 */
function getPayload(token) {
    if (!token || token.length < 0 || token.split(".").length <= 0) {
        // no token or invalid token equals no payload
        return {};
    }
    try {
        var payloadBase64 = token
            .split(".")[1]
            .replace("-", "+")
            .replace("_", "/");
        var payloadDecoded = base64.decode(payloadBase64);
        var payloadObject = JSON.parse(payloadDecoded);
        if (is_1.isNumber(payloadObject.exp)) {
            payloadObject.exp = new Date(payloadObject.exp * 1000);
        }
        return payloadObject;
    }
    catch (err) {
        // return empty payload in case of an error
        return {};
    }
}
exports.getPayload = getPayload;


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9EaXJlY3R1c1NESy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL3hoci5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWwuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0ludGVyY2VwdG9yTWFuYWdlci5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZW5oYW5jZUVycm9yLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL21lcmdlQ29uZmlnLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3NldHRsZS5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9iaW5kLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J1aWxkVVJMLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2Nvb2tpZXMuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZS5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi91dGlscy5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9iYXNlLTY0L2Jhc2U2NC5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL25vZGVfbW9kdWxlcy9pcy1idWZmZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL3FzL2xpYi9mb3JtYXRzLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vbm9kZV9tb2R1bGVzL3FzL2xpYi9zdHJpbmdpZnkuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9ub2RlX21vZHVsZXMvcXMvbGliL3V0aWxzLmpzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8od2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vRGlyZWN0dXNTREsvLi9zcmMvQVBJLnRzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vc3JjL0F1dGhlbnRpY2F0aW9uLnRzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vc3JjL0NvbmN1cnJlbmN5TWFuYWdlci50cyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL3NyYy9Db25maWd1cmF0aW9uLnRzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vc3JjL1NESy50cyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL3NyYy91dGlscy9jb2xsZWN0aW9uLnRzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vc3JjL3V0aWxzL2luZGV4LnRzIiwid2VicGFjazovL0RpcmVjdHVzU0RLLy4vc3JjL3V0aWxzL2ludmFyaWFudC50cyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL3NyYy91dGlscy9pcy50cyIsIndlYnBhY2s6Ly9EaXJlY3R1c1NESy8uL3NyYy91dGlscy9wYXlsb2FkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkEsaUJBQWlCLG1CQUFPLENBQUMsc0RBQWEsRTs7Ozs7Ozs7Ozs7O0FDQXpCOztBQUViLFlBQVksbUJBQU8sQ0FBQyxxREFBWTtBQUNoQyxhQUFhLG1CQUFPLENBQUMsaUVBQWtCO0FBQ3ZDLGVBQWUsbUJBQU8sQ0FBQywyRUFBdUI7QUFDOUMsbUJBQW1CLG1CQUFPLENBQUMsbUZBQTJCO0FBQ3RELHNCQUFzQixtQkFBTyxDQUFDLHlGQUE4QjtBQUM1RCxrQkFBa0IsbUJBQU8sQ0FBQyx5RUFBcUI7O0FBRS9DO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Es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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDN1VBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBLG1CQUFtQixLQUEwQjs7QUFFN0M7QUFDQSxrQkFBa0IsS0FBeUI7QUFDM0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRSxJQUVVO0FBQ1o7QUFDQSxFQUFFLG1DQUFPO0FBQ1Q7QUFDQSxHQUFHO0FBQUEsb0dBQUM7QUFDSixFQUFFLE1BQU0sWUFVTjs7QUFFRixDQUFDOzs7Ozs7Ozs7Ozs7O0FDcEtEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDcEJBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFVBQVU7Ozs7Ozs7Ozs7Ozs7QUN2THpCOztBQUViO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDakJhOztBQUViLFlBQVksbUJBQU8sQ0FBQywrQ0FBUztBQUM3QixjQUFjLG1CQUFPLENBQUMsbURBQVc7QUFDakM7O0FBRUE7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQSxLQUFLO0FBQ0w7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQSxLQUFLO0FBQ0wscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsb0JBQW9CO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixvQkFBb0I7QUFDdkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM1UWE7O0FBRWI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwyQkFBMkIsZ0JBQWdCO0FBQzND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Q0FBQztRQUNyQixJQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3BELElBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFakQsSUFBSSxhQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQy9CLGFBQWEsQ0FBQyxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQztTQUN4RDtRQUVELE9BQU8sYUFBYSxDQUFDO0tBQ3RCO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWiwyQ0FBMkM7UUFDM0MsT0FBTyxFQUFPLENBQUM7S0FDaEI7QUFDSCxDQUFDO0FBdkJELGdDQXVCQyIsImZpbGUiOiJkaXJlY3R1cy1zZGsudW1kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJEaXJlY3R1c1NES1wiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJEaXJlY3R1c1NES1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJEaXJlY3R1c1NES1wiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvYXhpb3MnKTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBzZXR0bGUgPSByZXF1aXJlKCcuLy4uL2NvcmUvc2V0dGxlJyk7XG52YXIgYnVpbGRVUkwgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcbnZhciBwYXJzZUhlYWRlcnMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvcGFyc2VIZWFkZXJzJyk7XG52YXIgaXNVUkxTYW1lT3JpZ2luID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbicpO1xudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi4vY29yZS9jcmVhdGVFcnJvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHhockFkYXB0ZXIoY29uZmlnKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIHJlcXVlc3REYXRhID0gY29uZmlnLmRhdGE7XG4gICAgdmFyIHJlcXVlc3RIZWFkZXJzID0gY29uZmlnLmhlYWRlcnM7XG5cbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShyZXF1ZXN0RGF0YSkpIHtcbiAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1snQ29udGVudC1UeXBlJ107IC8vIExldCB0aGUgYnJvd3NlciBzZXQgaXRcbiAgICB9XG5cbiAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICAgIGlmIChjb25maWcuYXV0aCkge1xuICAgICAgdmFyIHVzZXJuYW1lID0gY29uZmlnLmF1dGgudXNlcm5hbWUgfHwgJyc7XG4gICAgICB2YXIgcGFzc3dvcmQgPSBjb25maWcuYXV0aC5wYXNzd29yZCB8fCAnJztcbiAgICAgIHJlcXVlc3RIZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmFzaWMgJyArIGJ0b2EodXNlcm5hbWUgKyAnOicgKyBwYXNzd29yZCk7XG4gICAgfVxuXG4gICAgcmVxdWVzdC5vcGVuKGNvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgYnVpbGRVUkwoY29uZmlnLnVybCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLCB0cnVlKTtcblxuICAgIC8vIFNldCB0aGUgcmVxdWVzdCB0aW1lb3V0IGluIE1TXG4gICAgcmVxdWVzdC50aW1lb3V0ID0gY29uZmlnLnRpbWVvdXQ7XG5cbiAgICAvLyBMaXN0ZW4gZm9yIHJlYWR5IHN0YXRlXG4gICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiBoYW5kbGVMb2FkKCkge1xuICAgICAgaWYgKCFyZXF1ZXN0IHx8IHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxuICAgICAgLy8gaGFuZGxlZCBieSBvbmVycm9yIGluc3RlYWRcbiAgICAgIC8vIFdpdGggb25lIGV4Y2VwdGlvbjogcmVxdWVzdCB0aGF0IHVzaW5nIGZpbGU6IHByb3RvY29sLCBtb3N0IGJyb3dzZXJzXG4gICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XG4gICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDAgJiYgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuaW5kZXhPZignZmlsZTonKSA9PT0gMCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBQcmVwYXJlIHRoZSByZXNwb25zZVxuICAgICAgdmFyIHJlc3BvbnNlSGVhZGVycyA9ICdnZXRBbGxSZXNwb25zZUhlYWRlcnMnIGluIHJlcXVlc3QgPyBwYXJzZUhlYWRlcnMocmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSkgOiBudWxsO1xuICAgICAgdmFyIHJlc3BvbnNlRGF0YSA9ICFjb25maWcucmVzcG9uc2VUeXBlIHx8IGNvbmZpZy5yZXNwb25zZVR5cGUgPT09ICd0ZXh0JyA/IHJlcXVlc3QucmVzcG9uc2VUZXh0IDogcmVxdWVzdC5yZXNwb25zZTtcbiAgICAgIHZhciByZXNwb25zZSA9IHtcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICBzdGF0dXM6IHJlcXVlc3Quc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiByZXF1ZXN0LnN0YXR1c1RleHQsXG4gICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyxcbiAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgIHJlcXVlc3Q6IHJlcXVlc3RcbiAgICAgIH07XG5cbiAgICAgIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBicm93c2VyIHJlcXVlc3QgY2FuY2VsbGF0aW9uIChhcyBvcHBvc2VkIHRvIGEgbWFudWFsIGNhbmNlbGxhdGlvbilcbiAgICByZXF1ZXN0Lm9uYWJvcnQgPSBmdW5jdGlvbiBoYW5kbGVBYm9ydCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcignUmVxdWVzdCBhYm9ydGVkJywgY29uZmlnLCAnRUNPTk5BQk9SVEVEJywgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIGxvdyBsZXZlbCBuZXR3b3JrIGVycm9yc1xuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIGhhbmRsZUVycm9yKCkge1xuICAgICAgLy8gUmVhbCBlcnJvcnMgYXJlIGhpZGRlbiBmcm9tIHVzIGJ5IHRoZSBicm93c2VyXG4gICAgICAvLyBvbmVycm9yIHNob3VsZCBvbmx5IGZpcmUgaWYgaXQncyBhIG5ldHdvcmsgZXJyb3JcbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcignTmV0d29yayBFcnJvcicsIGNvbmZpZywgbnVsbCwgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIHRpbWVvdXRcbiAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7XG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ3RpbWVvdXQgb2YgJyArIGNvbmZpZy50aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJywgY29uZmlnLCAnRUNPTk5BQk9SVEVEJyxcbiAgICAgICAgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gICAgLy8gU3BlY2lmaWNhbGx5IG5vdCBpZiB3ZSdyZSBpbiBhIHdlYiB3b3JrZXIsIG9yIHJlYWN0LW5hdGl2ZS5cbiAgICBpZiAodXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSkge1xuICAgICAgdmFyIGNvb2tpZXMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29va2llcycpO1xuXG4gICAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAgIHZhciB4c3JmVmFsdWUgPSAoY29uZmlnLndpdGhDcmVkZW50aWFscyB8fCBpc1VSTFNhbWVPcmlnaW4oY29uZmlnLnVybCkpICYmIGNvbmZpZy54c3JmQ29va2llTmFtZSA/XG4gICAgICAgIGNvb2tpZXMucmVhZChjb25maWcueHNyZkNvb2tpZU5hbWUpIDpcbiAgICAgICAgdW5kZWZpbmVkO1xuXG4gICAgICBpZiAoeHNyZlZhbHVlKSB7XG4gICAgICAgIHJlcXVlc3RIZWFkZXJzW2NvbmZpZy54c3JmSGVhZGVyTmFtZV0gPSB4c3JmVmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQWRkIGhlYWRlcnMgdG8gdGhlIHJlcXVlc3RcbiAgICBpZiAoJ3NldFJlcXVlc3RIZWFkZXInIGluIHJlcXVlc3QpIHtcbiAgICAgIHV0aWxzLmZvckVhY2gocmVxdWVzdEhlYWRlcnMsIGZ1bmN0aW9uIHNldFJlcXVlc3RIZWFkZXIodmFsLCBrZXkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXF1ZXN0RGF0YSA9PT0gJ3VuZGVmaW5lZCcgJiYga2V5LnRvTG93ZXJDYXNlKCkgPT09ICdjb250ZW50LXR5cGUnKSB7XG4gICAgICAgICAgLy8gUmVtb3ZlIENvbnRlbnQtVHlwZSBpZiBkYXRhIGlzIHVuZGVmaW5lZFxuICAgICAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1trZXldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIE90aGVyd2lzZSBhZGQgaGVhZGVyIHRvIHRoZSByZXF1ZXN0XG4gICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgdmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIHdpdGhDcmVkZW50aWFscyB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChjb25maWcud2l0aENyZWRlbnRpYWxzKSB7XG4gICAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gQWRkIHJlc3BvbnNlVHlwZSB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IGNvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIEV4cGVjdGVkIERPTUV4Y2VwdGlvbiB0aHJvd24gYnkgYnJvd3NlcnMgbm90IGNvbXBhdGlibGUgWE1MSHR0cFJlcXVlc3QgTGV2ZWwgMi5cbiAgICAgICAgLy8gQnV0LCB0aGlzIGNhbiBiZSBzdXBwcmVzc2VkIGZvciAnanNvbicgdHlwZSBhcyBpdCBjYW4gYmUgcGFyc2VkIGJ5IGRlZmF1bHQgJ3RyYW5zZm9ybVJlc3BvbnNlJyBmdW5jdGlvbi5cbiAgICAgICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgcHJvZ3Jlc3MgaWYgbmVlZGVkXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25Eb3dubG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nICYmIHJlcXVlc3QudXBsb2FkKSB7XG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgICAvLyBIYW5kbGUgY2FuY2VsbGF0aW9uXG4gICAgICBjb25maWcuY2FuY2VsVG9rZW4ucHJvbWlzZS50aGVuKGZ1bmN0aW9uIG9uQ2FuY2VsZWQoY2FuY2VsKSB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgcmVqZWN0KGNhbmNlbCk7XG4gICAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocmVxdWVzdERhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVxdWVzdERhdGEgPSBudWxsO1xuICAgIH1cblxuICAgIC8vIFNlbmQgdGhlIHJlcXVlc3RcbiAgICByZXF1ZXN0LnNlbmQocmVxdWVzdERhdGEpO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbnZhciBBeGlvcyA9IHJlcXVpcmUoJy4vY29yZS9BeGlvcycpO1xudmFyIG1lcmdlQ29uZmlnID0gcmVxdWlyZSgnLi9jb3JlL21lcmdlQ29uZmlnJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqIEByZXR1cm4ge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZShkZWZhdWx0Q29uZmlnKSB7XG4gIHZhciBjb250ZXh0ID0gbmV3IEF4aW9zKGRlZmF1bHRDb25maWcpO1xuICB2YXIgaW5zdGFuY2UgPSBiaW5kKEF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIEF4aW9zLnByb3RvdHlwZSwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBjb250ZXh0IHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgY29udGV4dCk7XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG4vLyBDcmVhdGUgdGhlIGRlZmF1bHQgaW5zdGFuY2UgdG8gYmUgZXhwb3J0ZWRcbnZhciBheGlvcyA9IGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRzKTtcblxuLy8gRXhwb3NlIEF4aW9zIGNsYXNzIHRvIGFsbG93IGNsYXNzIGluaGVyaXRhbmNlXG5heGlvcy5BeGlvcyA9IEF4aW9zO1xuXG4vLyBGYWN0b3J5IGZvciBjcmVhdGluZyBuZXcgaW5zdGFuY2VzXG5heGlvcy5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaW5zdGFuY2VDb25maWcpIHtcbiAgcmV0dXJuIGNyZWF0ZUluc3RhbmNlKG1lcmdlQ29uZmlnKGF4aW9zLmRlZmF1bHRzLCBpbnN0YW5jZUNvbmZpZykpO1xufTtcblxuLy8gRXhwb3NlIENhbmNlbCAmIENhbmNlbFRva2VuXG5heGlvcy5DYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWwnKTtcbmF4aW9zLkNhbmNlbFRva2VuID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsVG9rZW4nKTtcbmF4aW9zLmlzQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvaXNDYW5jZWwnKTtcblxuLy8gRXhwb3NlIGFsbC9zcHJlYWRcbmF4aW9zLmFsbCA9IGZ1bmN0aW9uIGFsbChwcm9taXNlcykge1xuICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufTtcbmF4aW9zLnNwcmVhZCA9IHJlcXVpcmUoJy4vaGVscGVycy9zcHJlYWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBheGlvcztcblxuLy8gQWxsb3cgdXNlIG9mIGRlZmF1bHQgaW1wb3J0IHN5bnRheCBpbiBUeXBlU2NyaXB0XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gYXhpb3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQSBgQ2FuY2VsYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIG1lc3NhZ2UuXG4gKi9cbmZ1bmN0aW9uIENhbmNlbChtZXNzYWdlKSB7XG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG59XG5cbkNhbmNlbC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuICdDYW5jZWwnICsgKHRoaXMubWVzc2FnZSA/ICc6ICcgKyB0aGlzLm1lc3NhZ2UgOiAnJyk7XG59O1xuXG5DYW5jZWwucHJvdG90eXBlLl9fQ0FOQ0VMX18gPSB0cnVlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIENhbmNlbCA9IHJlcXVpcmUoJy4vQ2FuY2VsJyk7XG5cbi8qKlxuICogQSBgQ2FuY2VsVG9rZW5gIGlzIGFuIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlcXVlc3QgY2FuY2VsbGF0aW9uIG9mIGFuIG9wZXJhdGlvbi5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV4ZWN1dG9yIFRoZSBleGVjdXRvciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsVG9rZW4oZXhlY3V0b3IpIHtcbiAgaWYgKHR5cGVvZiBleGVjdXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgfVxuXG4gIHZhciByZXNvbHZlUHJvbWlzZTtcbiAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gcHJvbWlzZUV4ZWN1dG9yKHJlc29sdmUpIHtcbiAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gIH0pO1xuXG4gIHZhciB0b2tlbiA9IHRoaXM7XG4gIGV4ZWN1dG9yKGZ1bmN0aW9uIGNhbmNlbChtZXNzYWdlKSB7XG4gICAgaWYgKHRva2VuLnJlYXNvbikge1xuICAgICAgLy8gQ2FuY2VsbGF0aW9uIGhhcyBhbHJlYWR5IGJlZW4gcmVxdWVzdGVkXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdG9rZW4ucmVhc29uID0gbmV3IENhbmNlbChtZXNzYWdlKTtcbiAgICByZXNvbHZlUHJvbWlzZSh0b2tlbi5yZWFzb24pO1xuICB9KTtcbn1cblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5DYW5jZWxUb2tlbi5wcm90b3R5cGUudGhyb3dJZlJlcXVlc3RlZCA9IGZ1bmN0aW9uIHRocm93SWZSZXF1ZXN0ZWQoKSB7XG4gIGlmICh0aGlzLnJlYXNvbikge1xuICAgIHRocm93IHRoaXMucmVhc29uO1xuICB9XG59O1xuXG4vKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBuZXcgYENhbmNlbFRva2VuYCBhbmQgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCxcbiAqIGNhbmNlbHMgdGhlIGBDYW5jZWxUb2tlbmAuXG4gKi9cbkNhbmNlbFRva2VuLnNvdXJjZSA9IGZ1bmN0aW9uIHNvdXJjZSgpIHtcbiAgdmFyIGNhbmNlbDtcbiAgdmFyIHRva2VuID0gbmV3IENhbmNlbFRva2VuKGZ1bmN0aW9uIGV4ZWN1dG9yKGMpIHtcbiAgICBjYW5jZWwgPSBjO1xuICB9KTtcbiAgcmV0dXJuIHtcbiAgICB0b2tlbjogdG9rZW4sXG4gICAgY2FuY2VsOiBjYW5jZWxcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsVG9rZW47XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi4vaGVscGVycy9idWlsZFVSTCcpO1xudmFyIEludGVyY2VwdG9yTWFuYWdlciA9IHJlcXVpcmUoJy4vSW50ZXJjZXB0b3JNYW5hZ2VyJyk7XG52YXIgZGlzcGF0Y2hSZXF1ZXN0ID0gcmVxdWlyZSgnLi9kaXNwYXRjaFJlcXVlc3QnKTtcbnZhciBtZXJnZUNvbmZpZyA9IHJlcXVpcmUoJy4vbWVyZ2VDb25maWcnKTtcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gQXhpb3MoaW5zdGFuY2VDb25maWcpIHtcbiAgdGhpcy5kZWZhdWx0cyA9IGluc3RhbmNlQ29uZmlnO1xuICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICByZXF1ZXN0OiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKCksXG4gICAgcmVzcG9uc2U6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKVxuICB9O1xufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyBzcGVjaWZpYyBmb3IgdGhpcyByZXF1ZXN0IChtZXJnZWQgd2l0aCB0aGlzLmRlZmF1bHRzKVxuICovXG5BeGlvcy5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uIHJlcXVlc3QoY29uZmlnKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAvLyBBbGxvdyBmb3IgYXhpb3MoJ2V4YW1wbGUvdXJsJ1ssIGNvbmZpZ10pIGEgbGEgZmV0Y2ggQVBJXG4gIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgIGNvbmZpZyA9IGFyZ3VtZW50c1sxXSB8fCB7fTtcbiAgICBjb25maWcudXJsID0gYXJndW1lbnRzWzBdO1xuICB9IGVsc2Uge1xuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgfVxuXG4gIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG4gIGNvbmZpZy5tZXRob2QgPSBjb25maWcubWV0aG9kID8gY29uZmlnLm1ldGhvZC50b0xvd2VyQ2FzZSgpIDogJ2dldCc7XG5cbiAgLy8gSG9vayB1cCBpbnRlcmNlcHRvcnMgbWlkZGxld2FyZVxuICB2YXIgY2hhaW4gPSBbZGlzcGF0Y2hSZXF1ZXN0LCB1bmRlZmluZWRdO1xuICB2YXIgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShjb25maWcpO1xuXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnVuc2hpZnQoaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gcHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4ucHVzaChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgd2hpbGUgKGNoYWluLmxlbmd0aCkge1xuICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oY2hhaW4uc2hpZnQoKSwgY2hhaW4uc2hpZnQoKSk7XG4gIH1cblxuICByZXR1cm4gcHJvbWlzZTtcbn07XG5cbkF4aW9zLnByb3RvdHlwZS5nZXRVcmkgPSBmdW5jdGlvbiBnZXRVcmkoY29uZmlnKSB7XG4gIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG4gIHJldHVybiBidWlsZFVSTChjb25maWcudXJsLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcikucmVwbGFjZSgvXlxcPy8sICcnKTtcbn07XG5cbi8vIFByb3ZpZGUgYWxpYXNlcyBmb3Igc3VwcG9ydGVkIHJlcXVlc3QgbWV0aG9kc1xudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdvcHRpb25zJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybFxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1dGlscy5tZXJnZShjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmwsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQXhpb3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gSW50ZXJjZXB0b3JNYW5hZ2VyKCkge1xuICB0aGlzLmhhbmRsZXJzID0gW107XG59XG5cbi8qKlxuICogQWRkIGEgbmV3IGludGVyY2VwdG9yIHRvIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bGZpbGxlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGB0aGVuYCBmb3IgYSBgUHJvbWlzZWBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHJlamVjdGAgZm9yIGEgYFByb21pc2VgXG4gKlxuICogQHJldHVybiB7TnVtYmVyfSBBbiBJRCB1c2VkIHRvIHJlbW92ZSBpbnRlcmNlcHRvciBsYXRlclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uIHVzZShmdWxmaWxsZWQsIHJlamVjdGVkKSB7XG4gIHRoaXMuaGFuZGxlcnMucHVzaCh7XG4gICAgZnVsZmlsbGVkOiBmdWxmaWxsZWQsXG4gICAgcmVqZWN0ZWQ6IHJlamVjdGVkXG4gIH0pO1xuICByZXR1cm4gdGhpcy5oYW5kbGVycy5sZW5ndGggLSAxO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYW4gaW50ZXJjZXB0b3IgZnJvbSB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gaWQgVGhlIElEIHRoYXQgd2FzIHJldHVybmVkIGJ5IGB1c2VgXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZWplY3QgPSBmdW5jdGlvbiBlamVjdChpZCkge1xuICBpZiAodGhpcy5oYW5kbGVyc1tpZF0pIHtcbiAgICB0aGlzLmhhbmRsZXJzW2lkXSA9IG51bGw7XG4gIH1cbn07XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFsbCB0aGUgcmVnaXN0ZXJlZCBpbnRlcmNlcHRvcnNcbiAqXG4gKiBUaGlzIG1ldGhvZCBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBza2lwcGluZyBvdmVyIGFueVxuICogaW50ZXJjZXB0b3JzIHRoYXQgbWF5IGhhdmUgYmVjb21lIGBudWxsYCBjYWxsaW5nIGBlamVjdGAuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggaW50ZXJjZXB0b3JcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gZm9yRWFjaChmbikge1xuICB1dGlscy5mb3JFYWNoKHRoaXMuaGFuZGxlcnMsIGZ1bmN0aW9uIGZvckVhY2hIYW5kbGVyKGgpIHtcbiAgICBpZiAoaCAhPT0gbnVsbCkge1xuICAgICAgZm4oaCk7XG4gICAgfVxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSW50ZXJjZXB0b3JNYW5hZ2VyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW5oYW5jZUVycm9yID0gcmVxdWlyZSgnLi9lbmhhbmNlRXJyb3InKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlRXJyb3IobWVzc2FnZSwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHRyYW5zZm9ybURhdGEgPSByZXF1aXJlKCcuL3RyYW5zZm9ybURhdGEnKTtcbnZhciBpc0NhbmNlbCA9IHJlcXVpcmUoJy4uL2NhbmNlbC9pc0NhbmNlbCcpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi4vZGVmYXVsdHMnKTtcbnZhciBpc0Fic29sdXRlVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwnKTtcbnZhciBjb21iaW5lVVJMcyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9jb21iaW5lVVJMcycpO1xuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbmZ1bmN0aW9uIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKSB7XG4gIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICBjb25maWcuY2FuY2VsVG9rZW4udGhyb3dJZlJlcXVlc3RlZCgpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGNvbmZpZ3VyZWQgYWRhcHRlci5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRpc3BhdGNoUmVxdWVzdChjb25maWcpIHtcbiAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gIC8vIFN1cHBvcnQgYmFzZVVSTCBjb25maWdcbiAgaWYgKGNvbmZpZy5iYXNlVVJMICYmICFpc0Fic29sdXRlVVJMKGNvbmZpZy51cmwpKSB7XG4gICAgY29uZmlnLnVybCA9IGNvbWJpbmVVUkxzKGNvbmZpZy5iYXNlVVJMLCBjb25maWcudXJsKTtcbiAgfVxuXG4gIC8vIEVuc3VyZSBoZWFkZXJzIGV4aXN0XG4gIGNvbmZpZy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMgfHwge307XG5cbiAgLy8gVHJhbnNmb3JtIHJlcXVlc3QgZGF0YVxuICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgY29uZmlnLmRhdGEsXG4gICAgY29uZmlnLmhlYWRlcnMsXG4gICAgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3RcbiAgKTtcblxuICAvLyBGbGF0dGVuIGhlYWRlcnNcbiAgY29uZmlnLmhlYWRlcnMgPSB1dGlscy5tZXJnZShcbiAgICBjb25maWcuaGVhZGVycy5jb21tb24gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnNbY29uZmlnLm1ldGhvZF0gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnMgfHwge31cbiAgKTtcblxuICB1dGlscy5mb3JFYWNoKFxuICAgIFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJywgJ2NvbW1vbiddLFxuICAgIGZ1bmN0aW9uIGNsZWFuSGVhZGVyQ29uZmlnKG1ldGhvZCkge1xuICAgICAgZGVsZXRlIGNvbmZpZy5oZWFkZXJzW21ldGhvZF07XG4gICAgfVxuICApO1xuXG4gIHZhciBhZGFwdGVyID0gY29uZmlnLmFkYXB0ZXIgfHwgZGVmYXVsdHMuYWRhcHRlcjtcblxuICByZXR1cm4gYWRhcHRlcihjb25maWcpLnRoZW4oZnVuY3Rpb24gb25BZGFwdGVyUmVzb2x1dGlvbihyZXNwb25zZSkge1xuICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgcmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICByZXNwb25zZS5kYXRhLFxuICAgICAgcmVzcG9uc2UuaGVhZGVycyxcbiAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICk7XG5cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH0sIGZ1bmN0aW9uIG9uQWRhcHRlclJlamVjdGlvbihyZWFzb24pIHtcbiAgICBpZiAoIWlzQ2FuY2VsKHJlYXNvbikpIHtcbiAgICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICAgIGlmIChyZWFzb24gJiYgcmVhc29uLnJlc3BvbnNlKSB7XG4gICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSxcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuaGVhZGVycyxcbiAgICAgICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVwZGF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgY29uZmlnLCBlcnJvciBjb2RlLCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyb3IgVGhlIGVycm9yIHRvIHVwZGF0ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIGVycm9yLmNvbmZpZyA9IGNvbmZpZztcbiAgaWYgKGNvZGUpIHtcbiAgICBlcnJvci5jb2RlID0gY29kZTtcbiAgfVxuXG4gIGVycm9yLnJlcXVlc3QgPSByZXF1ZXN0O1xuICBlcnJvci5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICBlcnJvci5pc0F4aW9zRXJyb3IgPSB0cnVlO1xuXG4gIGVycm9yLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICAvLyBTdGFuZGFyZFxuICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLFxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgLy8gTWljcm9zb2Z0XG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbixcbiAgICAgIG51bWJlcjogdGhpcy5udW1iZXIsXG4gICAgICAvLyBNb3ppbGxhXG4gICAgICBmaWxlTmFtZTogdGhpcy5maWxlTmFtZSxcbiAgICAgIGxpbmVOdW1iZXI6IHRoaXMubGluZU51bWJlcixcbiAgICAgIGNvbHVtbk51bWJlcjogdGhpcy5jb2x1bW5OdW1iZXIsXG4gICAgICBzdGFjazogdGhpcy5zdGFjayxcbiAgICAgIC8vIEF4aW9zXG4gICAgICBjb25maWc6IHRoaXMuY29uZmlnLFxuICAgICAgY29kZTogdGhpcy5jb2RlXG4gICAgfTtcbiAgfTtcbiAgcmV0dXJuIGVycm9yO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBDb25maWctc3BlY2lmaWMgbWVyZ2UtZnVuY3Rpb24gd2hpY2ggY3JlYXRlcyBhIG5ldyBjb25maWctb2JqZWN0XG4gKiBieSBtZXJnaW5nIHR3byBjb25maWd1cmF0aW9uIG9iamVjdHMgdG9nZXRoZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzFcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBOZXcgb2JqZWN0IHJlc3VsdGluZyBmcm9tIG1lcmdpbmcgY29uZmlnMiB0byBjb25maWcxXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWVyZ2VDb25maWcoY29uZmlnMSwgY29uZmlnMikge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgY29uZmlnMiA9IGNvbmZpZzIgfHwge307XG4gIHZhciBjb25maWcgPSB7fTtcblxuICB1dGlscy5mb3JFYWNoKFsndXJsJywgJ21ldGhvZCcsICdwYXJhbXMnLCAnZGF0YSddLCBmdW5jdGlvbiB2YWx1ZUZyb21Db25maWcyKHByb3ApIHtcbiAgICBpZiAodHlwZW9mIGNvbmZpZzJbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcyW3Byb3BdO1xuICAgIH1cbiAgfSk7XG5cbiAgdXRpbHMuZm9yRWFjaChbJ2hlYWRlcnMnLCAnYXV0aCcsICdwcm94eSddLCBmdW5jdGlvbiBtZXJnZURlZXBQcm9wZXJ0aWVzKHByb3ApIHtcbiAgICBpZiAodXRpbHMuaXNPYmplY3QoY29uZmlnMltwcm9wXSkpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IHV0aWxzLmRlZXBNZXJnZShjb25maWcxW3Byb3BdLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcyW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMltwcm9wXTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KGNvbmZpZzFbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSB1dGlscy5kZWVwTWVyZ2UoY29uZmlnMVtwcm9wXSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY29uZmlnMVtwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzFbcHJvcF07XG4gICAgfVxuICB9KTtcblxuICB1dGlscy5mb3JFYWNoKFtcbiAgICAnYmFzZVVSTCcsICd0cmFuc2Zvcm1SZXF1ZXN0JywgJ3RyYW5zZm9ybVJlc3BvbnNlJywgJ3BhcmFtc1NlcmlhbGl6ZXInLFxuICAgICd0aW1lb3V0JywgJ3dpdGhDcmVkZW50aWFscycsICdhZGFwdGVyJywgJ3Jlc3BvbnNlVHlwZScsICd4c3JmQ29va2llTmFtZScsXG4gICAgJ3hzcmZIZWFkZXJOYW1lJywgJ29uVXBsb2FkUHJvZ3Jlc3MnLCAnb25Eb3dubG9hZFByb2dyZXNzJywgJ21heENvbnRlbnRMZW5ndGgnLFxuICAgICd2YWxpZGF0ZVN0YXR1cycsICdtYXhSZWRpcmVjdHMnLCAnaHR0cEFnZW50JywgJ2h0dHBzQWdlbnQnLCAnY2FuY2VsVG9rZW4nLFxuICAgICdzb2NrZXRQYXRoJ1xuICBdLCBmdW5jdGlvbiBkZWZhdWx0VG9Db25maWcyKHByb3ApIHtcbiAgICBpZiAodHlwZW9mIGNvbmZpZzJbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcyW3Byb3BdO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbmZpZzFbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcxW3Byb3BdO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGNvbmZpZztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4vY3JlYXRlRXJyb3InKTtcblxuLyoqXG4gKiBSZXNvbHZlIG9yIHJlamVjdCBhIFByb21pc2UgYmFzZWQgb24gcmVzcG9uc2Ugc3RhdHVzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmUgQSBmdW5jdGlvbiB0aGF0IHJlc29sdmVzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0IEEgZnVuY3Rpb24gdGhhdCByZWplY3RzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtvYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xuICB2YXIgdmFsaWRhdGVTdGF0dXMgPSByZXNwb25zZS5jb25maWcudmFsaWRhdGVTdGF0dXM7XG4gIGlmICghdmFsaWRhdGVTdGF0dXMgfHwgdmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICB9IGVsc2Uge1xuICAgIHJlamVjdChjcmVhdGVFcnJvcihcbiAgICAgICdSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICcgKyByZXNwb25zZS5zdGF0dXMsXG4gICAgICByZXNwb25zZS5jb25maWcsXG4gICAgICBudWxsLFxuICAgICAgcmVzcG9uc2UucmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKSk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGJlIHRyYW5zZm9ybWVkXG4gKiBAcGFyYW0ge0FycmF5fSBoZWFkZXJzIFRoZSBoZWFkZXJzIGZvciB0aGUgcmVxdWVzdCBvciByZXNwb25zZVxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZGF0YSwgaGVhZGVycywgZm5zKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICB1dGlscy5mb3JFYWNoKGZucywgZnVuY3Rpb24gdHJhbnNmb3JtKGZuKSB7XG4gICAgZGF0YSA9IGZuKGRhdGEsIGhlYWRlcnMpO1xuICB9KTtcblxuICByZXR1cm4gZGF0YTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBub3JtYWxpemVIZWFkZXJOYW1lID0gcmVxdWlyZSgnLi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUnKTtcblxudmFyIERFRkFVTFRfQ09OVEVOVF9UWVBFID0ge1xuICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbn07XG5cbmZ1bmN0aW9uIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCB2YWx1ZSkge1xuICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnMpICYmIHV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddKSkge1xuICAgIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gdmFsdWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdEFkYXB0ZXIoKSB7XG4gIHZhciBhZGFwdGVyO1xuICAvLyBPbmx5IE5vZGUuSlMgaGFzIGEgcHJvY2VzcyB2YXJpYWJsZSB0aGF0IGlzIG9mIFtbQ2xhc3NdXSBwcm9jZXNzXG4gIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHByb2Nlc3MpID09PSAnW29iamVjdCBwcm9jZXNzXScpIHtcbiAgICAvLyBGb3Igbm9kZSB1c2UgSFRUUCBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMvaHR0cCcpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBGb3IgYnJvd3NlcnMgdXNlIFhIUiBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMveGhyJyk7XG4gIH1cbiAgcmV0dXJuIGFkYXB0ZXI7XG59XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgYWRhcHRlcjogZ2V0RGVmYXVsdEFkYXB0ZXIoKSxcblxuICB0cmFuc2Zvcm1SZXF1ZXN0OiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVxdWVzdChkYXRhLCBoZWFkZXJzKSB7XG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQWNjZXB0Jyk7XG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQ29udGVudC1UeXBlJyk7XG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQXJyYXlCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc1N0cmVhbShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNGaWxlKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0Jsb2IoZGF0YSlcbiAgICApIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhLmJ1ZmZlcjtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICByZXR1cm4gZGF0YS50b1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNPYmplY3QoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICB0cmFuc2Zvcm1SZXNwb25zZTogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlc3BvbnNlKGRhdGEpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0cnkge1xuICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgLyogSWdub3JlICovIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIC8qKlxuICAgKiBBIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIHRvIGFib3J0IGEgcmVxdWVzdC4gSWYgc2V0IHRvIDAgKGRlZmF1bHQpIGFcbiAgICogdGltZW91dCBpcyBub3QgY3JlYXRlZC5cbiAgICovXG4gIHRpbWVvdXQ6IDAsXG5cbiAgeHNyZkNvb2tpZU5hbWU6ICdYU1JGLVRPS0VOJyxcbiAgeHNyZkhlYWRlck5hbWU6ICdYLVhTUkYtVE9LRU4nLFxuXG4gIG1heENvbnRlbnRMZW5ndGg6IC0xLFxuXG4gIHZhbGlkYXRlU3RhdHVzOiBmdW5jdGlvbiB2YWxpZGF0ZVN0YXR1cyhzdGF0dXMpIHtcbiAgICByZXR1cm4gc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDA7XG4gIH1cbn07XG5cbmRlZmF1bHRzLmhlYWRlcnMgPSB7XG4gIGNvbW1vbjoge1xuICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJ1xuICB9XG59O1xuXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHt9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHV0aWxzLm1lcmdlKERFRkFVTFRfQ09OVEVOVF9UWVBFKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmF1bHRzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgIH1cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpc0FyZywgYXJncyk7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIGVuY29kZSh2YWwpIHtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpLlxuICAgIHJlcGxhY2UoLyU0MC9naSwgJ0AnKS5cbiAgICByZXBsYWNlKC8lM0EvZ2ksICc6JykuXG4gICAgcmVwbGFjZSgvJTI0L2csICckJykuXG4gICAgcmVwbGFjZSgvJTJDL2dpLCAnLCcpLlxuICAgIHJlcGxhY2UoLyUyMC9nLCAnKycpLlxuICAgIHJlcGxhY2UoLyU1Qi9naSwgJ1snKS5cbiAgICByZXBsYWNlKC8lNUQvZ2ksICddJyk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB1cmxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZFVSTCh1cmwsIHBhcmFtcywgcGFyYW1zU2VyaWFsaXplcikge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgaWYgKCFwYXJhbXMpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgdmFyIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIGlmIChwYXJhbXNTZXJpYWxpemVyKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtc1NlcmlhbGl6ZXIocGFyYW1zKTtcbiAgfSBlbHNlIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMpKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtcy50b1N0cmluZygpO1xuICB9IGVsc2Uge1xuICAgIHZhciBwYXJ0cyA9IFtdO1xuXG4gICAgdXRpbHMuZm9yRWFjaChwYXJhbXMsIGZ1bmN0aW9uIHNlcmlhbGl6ZSh2YWwsIGtleSkge1xuICAgICAgaWYgKHZhbCA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh1dGlscy5pc0FycmF5KHZhbCkpIHtcbiAgICAgICAga2V5ID0ga2V5ICsgJ1tdJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbCA9IFt2YWxdO1xuICAgICAgfVxuXG4gICAgICB1dGlscy5mb3JFYWNoKHZhbCwgZnVuY3Rpb24gcGFyc2VWYWx1ZSh2KSB7XG4gICAgICAgIGlmICh1dGlscy5pc0RhdGUodikpIHtcbiAgICAgICAgICB2ID0gdi50b0lTT1N0cmluZygpO1xuICAgICAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KHYpKSB7XG4gICAgICAgICAgdiA9IEpTT04uc3RyaW5naWZ5KHYpO1xuICAgICAgICB9XG4gICAgICAgIHBhcnRzLnB1c2goZW5jb2RlKGtleSkgKyAnPScgKyBlbmNvZGUodikpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFydHMuam9pbignJicpO1xuICB9XG5cbiAgaWYgKHNlcmlhbGl6ZWRQYXJhbXMpIHtcbiAgICB2YXIgaGFzaG1hcmtJbmRleCA9IHVybC5pbmRleE9mKCcjJyk7XG4gICAgaWYgKGhhc2htYXJrSW5kZXggIT09IC0xKSB7XG4gICAgICB1cmwgPSB1cmwuc2xpY2UoMCwgaGFzaG1hcmtJbmRleCk7XG4gICAgfVxuXG4gICAgdXJsICs9ICh1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyBzZXJpYWxpemVkUGFyYW1zO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBzcGVjaWZpZWQgVVJMc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aXZlVVJMIFRoZSByZWxhdGl2ZSBVUkxcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBVUkxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZWxhdGl2ZVVSTCkge1xuICByZXR1cm4gcmVsYXRpdmVVUkxcbiAgICA/IGJhc2VVUkwucmVwbGFjZSgvXFwvKyQvLCAnJykgKyAnLycgKyByZWxhdGl2ZVVSTC5yZXBsYWNlKC9eXFwvKy8sICcnKVxuICAgIDogYmFzZVVSTDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuICAgIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlKSB7XG4gICAgICAgICAgdmFyIGNvb2tpZSA9IFtdO1xuICAgICAgICAgIGNvb2tpZS5wdXNoKG5hbWUgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcblxuICAgICAgICAgIGlmICh1dGlscy5pc051bWJlcihleHBpcmVzKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ2V4cGlyZXM9JyArIG5ldyBEYXRlKGV4cGlyZXMpLnRvR01UU3RyaW5nKCkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhwYXRoKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhkb21haW4pKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgnZG9tYWluPScgKyBkb21haW4pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzZWN1cmUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdzZWN1cmUnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUuam9pbignOyAnKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG5hbWUpIHtcbiAgICAgICAgICB2YXIgbWF0Y2ggPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cCgnKF58O1xcXFxzKikoJyArIG5hbWUgKyAnKT0oW147XSopJykpO1xuICAgICAgICAgIHJldHVybiAobWF0Y2ggPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbM10pIDogbnVsbCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUobmFtZSkge1xuICAgICAgICAgIHRoaXMud3JpdGUobmFtZSwgJycsIERhdGUubm93KCkgLSA4NjQwMDAwMCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52ICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAgIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7fSxcbiAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHsgcmV0dXJuIG51bGw7IH0sXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICAgIH07XG4gICAgfSkoKVxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQWJzb2x1dGVVUkwodXJsKSB7XG4gIC8vIEEgVVJMIGlzIGNvbnNpZGVyZWQgYWJzb2x1dGUgaWYgaXQgYmVnaW5zIHdpdGggXCI8c2NoZW1lPjovL1wiIG9yIFwiLy9cIiAocHJvdG9jb2wtcmVsYXRpdmUgVVJMKS5cbiAgLy8gUkZDIDM5ODYgZGVmaW5lcyBzY2hlbWUgbmFtZSBhcyBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgYmVnaW5uaW5nIHdpdGggYSBsZXR0ZXIgYW5kIGZvbGxvd2VkXG4gIC8vIGJ5IGFueSBjb21iaW5hdGlvbiBvZiBsZXR0ZXJzLCBkaWdpdHMsIHBsdXMsIHBlcmlvZCwgb3IgaHlwaGVuLlxuICByZXR1cm4gL14oW2Etel1bYS16XFxkXFwrXFwtXFwuXSo6KT9cXC9cXC8vaS50ZXN0KHVybCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3RcbiAgLy8gd2hldGhlciB0aGUgcmVxdWVzdCBVUkwgaXMgb2YgdGhlIHNhbWUgb3JpZ2luIGFzIGN1cnJlbnQgbG9jYXRpb24uXG4gICAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHZhciBtc2llID0gLyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICAgIHZhciB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgIHZhciBvcmlnaW5VUkw7XG5cbiAgICAgIC8qKlxuICAgICogUGFyc2UgYSBVUkwgdG8gZGlzY292ZXIgaXQncyBjb21wb25lbnRzXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgVVJMIHRvIGJlIHBhcnNlZFxuICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAqL1xuICAgICAgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmwpIHtcbiAgICAgICAgdmFyIGhyZWYgPSB1cmw7XG5cbiAgICAgICAgaWYgKG1zaWUpIHtcbiAgICAgICAgLy8gSUUgbmVlZHMgYXR0cmlidXRlIHNldCB0d2ljZSB0byBub3JtYWxpemUgcHJvcGVydGllc1xuICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgICAgICAgIGhyZWYgPSB1cmxQYXJzaW5nTm9kZS5ocmVmO1xuICAgICAgICB9XG5cbiAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG5cbiAgICAgICAgLy8gdXJsUGFyc2luZ05vZGUgcHJvdmlkZXMgdGhlIFVybFV0aWxzIGludGVyZmFjZSAtIGh0dHA6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmx1dGlsc1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXG4gICAgICAgICAgcHJvdG9jb2w6IHVybFBhcnNpbmdOb2RlLnByb3RvY29sID8gdXJsUGFyc2luZ05vZGUucHJvdG9jb2wucmVwbGFjZSgvOiQvLCAnJykgOiAnJyxcbiAgICAgICAgICBob3N0OiB1cmxQYXJzaW5nTm9kZS5ob3N0LFxuICAgICAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcbiAgICAgICAgICBoYXNoOiB1cmxQYXJzaW5nTm9kZS5oYXNoID8gdXJsUGFyc2luZ05vZGUuaGFzaC5yZXBsYWNlKC9eIy8sICcnKSA6ICcnLFxuICAgICAgICAgIGhvc3RuYW1lOiB1cmxQYXJzaW5nTm9kZS5ob3N0bmFtZSxcbiAgICAgICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxuICAgICAgICAgIHBhdGhuYW1lOiAodXJsUGFyc2luZ05vZGUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpID9cbiAgICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lIDpcbiAgICAgICAgICAgICcvJyArIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIG9yaWdpblVSTCA9IHJlc29sdmVVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuXG4gICAgICAvKipcbiAgICAqIERldGVybWluZSBpZiBhIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luIGFzIHRoZSBjdXJyZW50IGxvY2F0aW9uXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHJlcXVlc3RVUkwgVGhlIFVSTCB0byB0ZXN0XG4gICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiwgb3RoZXJ3aXNlIGZhbHNlXG4gICAgKi9cbiAgICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4ocmVxdWVzdFVSTCkge1xuICAgICAgICB2YXIgcGFyc2VkID0gKHV0aWxzLmlzU3RyaW5nKHJlcXVlc3RVUkwpKSA/IHJlc29sdmVVUkwocmVxdWVzdFVSTCkgOiByZXF1ZXN0VVJMO1xuICAgICAgICByZXR1cm4gKHBhcnNlZC5wcm90b2NvbCA9PT0gb3JpZ2luVVJMLnByb3RvY29sICYmXG4gICAgICAgICAgICBwYXJzZWQuaG9zdCA9PT0gb3JpZ2luVVJMLmhvc3QpO1xuICAgICAgfTtcbiAgICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnZzICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAgIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH07XG4gICAgfSkoKVxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsIG5vcm1hbGl6ZWROYW1lKSB7XG4gIHV0aWxzLmZvckVhY2goaGVhZGVycywgZnVuY3Rpb24gcHJvY2Vzc0hlYWRlcih2YWx1ZSwgbmFtZSkge1xuICAgIGlmIChuYW1lICE9PSBub3JtYWxpemVkTmFtZSAmJiBuYW1lLnRvVXBwZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWROYW1lLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZE5hbWVdID0gdmFsdWU7XG4gICAgICBkZWxldGUgaGVhZGVyc1tuYW1lXTtcbiAgICB9XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vLyBIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xudmFyIGlnbm9yZUR1cGxpY2F0ZU9mID0gW1xuICAnYWdlJywgJ2F1dGhvcml6YXRpb24nLCAnY29udGVudC1sZW5ndGgnLCAnY29udGVudC10eXBlJywgJ2V0YWcnLFxuICAnZXhwaXJlcycsICdmcm9tJywgJ2hvc3QnLCAnaWYtbW9kaWZpZWQtc2luY2UnLCAnaWYtdW5tb2RpZmllZC1zaW5jZScsXG4gICdsYXN0LW1vZGlmaWVkJywgJ2xvY2F0aW9uJywgJ21heC1mb3J3YXJkcycsICdwcm94eS1hdXRob3JpemF0aW9uJyxcbiAgJ3JlZmVyZXInLCAncmV0cnktYWZ0ZXInLCAndXNlci1hZ2VudCdcbl07XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqIEByZXR1cm5zIHtPYmplY3R9IEhlYWRlcnMgcGFyc2VkIGludG8gYW4gb2JqZWN0XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VIZWFkZXJzKGhlYWRlcnMpIHtcbiAgdmFyIHBhcnNlZCA9IHt9O1xuICB2YXIga2V5O1xuICB2YXIgdmFsO1xuICB2YXIgaTtcblxuICBpZiAoIWhlYWRlcnMpIHsgcmV0dXJuIHBhcnNlZDsgfVxuXG4gIHV0aWxzLmZvckVhY2goaGVhZGVycy5zcGxpdCgnXFxuJyksIGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoMCwgaSkpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cihpICsgMSkpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgaWYgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mLmluZGV4T2Yoa2V5KSA+PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChrZXkgPT09ICdzZXQtY29va2llJykge1xuICAgICAgICBwYXJzZWRba2V5XSA9IChwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldIDogW10pLmNvbmNhdChbdmFsXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU3ludGFjdGljIHN1Z2FyIGZvciBpbnZva2luZyBhIGZ1bmN0aW9uIGFuZCBleHBhbmRpbmcgYW4gYXJyYXkgZm9yIGFyZ3VtZW50cy5cbiAqXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxuICpcbiAqICBgYGBqc1xuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cbiAqICB2YXIgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNwcmVhZChjYWxsYmFjaykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcChhcnIpIHtcbiAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkobnVsbCwgYXJyKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbnZhciBpc0J1ZmZlciA9IHJlcXVpcmUoJ2lzLWJ1ZmZlcicpO1xuXG4vKmdsb2JhbCB0b1N0cmluZzp0cnVlKi9cblxuLy8gdXRpbHMgaXMgYSBsaWJyYXJ5IG9mIGdlbmVyaWMgaGVscGVyIGZ1bmN0aW9ucyBub24tc3BlY2lmaWMgdG8gYXhpb3NcblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gRm9ybURhdGEsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Zvcm1EYXRhKHZhbCkge1xuICByZXR1cm4gKHR5cGVvZiBGb3JtRGF0YSAhPT0gJ3VuZGVmaW5lZCcpICYmICh2YWwgaW5zdGFuY2VvZiBGb3JtRGF0YSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlclZpZXcodmFsKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmICgodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJykgJiYgKEFycmF5QnVmZmVyLmlzVmlldykpIHtcbiAgICByZXN1bHQgPSBBcnJheUJ1ZmZlci5pc1ZpZXcodmFsKTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSAodmFsKSAmJiAodmFsLmJ1ZmZlcikgJiYgKHZhbC5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcik7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmluZ1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyaW5nLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIE51bWJlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgTnVtYmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOdW1iZXIodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnbnVtYmVyJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyB1bmRlZmluZWRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdW5kZWZpbmVkLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0RhdGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0ZpbGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZpbGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJsb2JcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Jsb2IodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEJsb2JdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJlYW1cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmVhbSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyZWFtKHZhbCkge1xuICByZXR1cm4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC5waXBlKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VSTFNlYXJjaFBhcmFtcyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiBVUkxTZWFyY2hQYXJhbXMgIT09ICd1bmRlZmluZWQnICYmIHZhbCBpbnN0YW5jZW9mIFVSTFNlYXJjaFBhcmFtcztcbn1cblxuLyoqXG4gKiBUcmltIGV4Y2VzcyB3aGl0ZXNwYWNlIG9mZiB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBTdHJpbmcgdG8gdHJpbVxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5mdW5jdGlvbiB0cmltKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMqLywgJycpLnJlcGxhY2UoL1xccyokLywgJycpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudFxuICpcbiAqIFRoaXMgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXIsIGFuZCByZWFjdC1uYXRpdmUuXG4gKiBCb3RoIGVudmlyb25tZW50cyBzdXBwb3J0IFhNTEh0dHBSZXF1ZXN0LCBidXQgbm90IGZ1bGx5IHN0YW5kYXJkIGdsb2JhbHMuXG4gKlxuICogd2ViIHdvcmtlcnM6XG4gKiAgdHlwZW9mIHdpbmRvdyAtPiB1bmRlZmluZWRcbiAqICB0eXBlb2YgZG9jdW1lbnQgLT4gdW5kZWZpbmVkXG4gKlxuICogcmVhY3QtbmF0aXZlOlxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdSZWFjdE5hdGl2ZSdcbiAqIG5hdGl2ZXNjcmlwdFxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdOYXRpdmVTY3JpcHQnIG9yICdOUydcbiAqL1xuZnVuY3Rpb24gaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAobmF2aWdhdG9yLnByb2R1Y3QgPT09ICdSZWFjdE5hdGl2ZScgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ05hdGl2ZVNjcmlwdCcgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ05TJykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIChcbiAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcbiAgKTtcbn1cblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYW4gQXJyYXkgb3IgYW4gT2JqZWN0IGludm9raW5nIGEgZnVuY3Rpb24gZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiBgb2JqYCBpcyBhbiBBcnJheSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGluZGV4LCBhbmQgY29tcGxldGUgYXJyYXkgZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiAnb2JqJyBpcyBhbiBPYmplY3QgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBrZXksIGFuZCBjb21wbGV0ZSBvYmplY3QgZm9yIGVhY2ggcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IG9iaiBUaGUgb2JqZWN0IHRvIGl0ZXJhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayB0byBpbnZva2UgZm9yIGVhY2ggaXRlbVxuICovXG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgZm4pIHtcbiAgLy8gRG9uJ3QgYm90aGVyIGlmIG5vIHZhbHVlIHByb3ZpZGVkXG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBGb3JjZSBhbiBhcnJheSBpZiBub3QgYWxyZWFkeSBzb21ldGhpbmcgaXRlcmFibGVcbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgb2JqID0gW29ial07XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFycmF5IHZhbHVlc1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBY2NlcHRzIHZhcmFyZ3MgZXhwZWN0aW5nIGVhY2ggYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0LCB0aGVuXG4gKiBpbW11dGFibHkgbWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIGVhY2ggb2JqZWN0IGFuZCByZXR1cm5zIHJlc3VsdC5cbiAqXG4gKiBXaGVuIG11bHRpcGxlIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBrZXkgdGhlIGxhdGVyIG9iamVjdCBpblxuICogdGhlIGFyZ3VtZW50cyBsaXN0IHdpbGwgdGFrZSBwcmVjZWRlbmNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciByZXN1bHQgPSBtZXJnZSh7Zm9vOiAxMjN9LCB7Zm9vOiA0NTZ9KTtcbiAqIGNvbnNvbGUubG9nKHJlc3VsdC5mb28pOyAvLyBvdXRwdXRzIDQ1NlxuICogYGBgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodHlwZW9mIHJlc3VsdFtrZXldID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgcmVzdWx0W2tleV0gPSBtZXJnZShyZXN1bHRba2V5XSwgdmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEZ1bmN0aW9uIGVxdWFsIHRvIG1lcmdlIHdpdGggdGhlIGRpZmZlcmVuY2UgYmVpbmcgdGhhdCBubyByZWZlcmVuY2VcbiAqIHRvIG9yaWdpbmFsIG9iamVjdHMgaXMga2VwdC5cbiAqXG4gKiBAc2VlIG1lcmdlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBkZWVwTWVyZ2UoLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodHlwZW9mIHJlc3VsdFtrZXldID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgcmVzdWx0W2tleV0gPSBkZWVwTWVyZ2UocmVzdWx0W2tleV0sIHZhbCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgcmVzdWx0W2tleV0gPSBkZWVwTWVyZ2Uoe30sIHZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBFeHRlbmRzIG9iamVjdCBhIGJ5IG11dGFibHkgYWRkaW5nIHRvIGl0IHRoZSBwcm9wZXJ0aWVzIG9mIG9iamVjdCBiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzQXJnIFRoZSBvYmplY3QgdG8gYmluZCBmdW5jdGlvbiB0b1xuICogQHJldHVybiB7T2JqZWN0fSBUaGUgcmVzdWx0aW5nIHZhbHVlIG9mIG9iamVjdCBhXG4gKi9cbmZ1bmN0aW9uIGV4dGVuZChhLCBiLCB0aGlzQXJnKSB7XG4gIGZvckVhY2goYiwgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodGhpc0FyZyAmJiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBhW2tleV0gPSBiaW5kKHZhbCwgdGhpc0FyZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFba2V5XSA9IHZhbDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gYTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzQXJyYXk6IGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXI6IGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyOiBpc0J1ZmZlcixcbiAgaXNGb3JtRGF0YTogaXNGb3JtRGF0YSxcbiAgaXNBcnJheUJ1ZmZlclZpZXc6IGlzQXJyYXlCdWZmZXJWaWV3LFxuICBpc1N0cmluZzogaXNTdHJpbmcsXG4gIGlzTnVtYmVyOiBpc051bWJlcixcbiAgaXNPYmplY3Q6IGlzT2JqZWN0LFxuICBpc1VuZGVmaW5lZDogaXNVbmRlZmluZWQsXG4gIGlzRGF0ZTogaXNEYXRlLFxuICBpc0ZpbGU6IGlzRmlsZSxcbiAgaXNCbG9iOiBpc0Jsb2IsXG4gIGlzRnVuY3Rpb246IGlzRnVuY3Rpb24sXG4gIGlzU3RyZWFtOiBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXM6IGlzVVJMU2VhcmNoUGFyYW1zLFxuICBpc1N0YW5kYXJkQnJvd3NlckVudjogaXNTdGFuZGFyZEJyb3dzZXJFbnYsXG4gIGZvckVhY2g6IGZvckVhY2gsXG4gIG1lcmdlOiBtZXJnZSxcbiAgZGVlcE1lcmdlOiBkZWVwTWVyZ2UsXG4gIGV4dGVuZDogZXh0ZW5kLFxuICB0cmltOiB0cmltXG59O1xuIiwiLyohIGh0dHA6Ly9tdGhzLmJlL2Jhc2U2NCB2MC4xLjAgYnkgQG1hdGhpYXMgfCBNSVQgbGljZW5zZSAqL1xuOyhmdW5jdGlvbihyb290KSB7XG5cblx0Ly8gRGV0ZWN0IGZyZWUgdmFyaWFibGVzIGBleHBvcnRzYC5cblx0dmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cztcblxuXHQvLyBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC5cblx0dmFyIGZyZWVNb2R1bGUgPSB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJlxuXHRcdG1vZHVsZS5leHBvcnRzID09IGZyZWVFeHBvcnRzICYmIG1vZHVsZTtcblxuXHQvLyBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCwgZnJvbSBOb2RlLmpzIG9yIEJyb3dzZXJpZmllZCBjb2RlLCBhbmQgdXNlXG5cdC8vIGl0IGFzIGByb290YC5cblx0dmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbDtcblx0aWYgKGZyZWVHbG9iYWwuZ2xvYmFsID09PSBmcmVlR2xvYmFsIHx8IGZyZWVHbG9iYWwud2luZG93ID09PSBmcmVlR2xvYmFsKSB7XG5cdFx0cm9vdCA9IGZyZWVHbG9iYWw7XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR2YXIgSW52YWxpZENoYXJhY3RlckVycm9yID0gZnVuY3Rpb24obWVzc2FnZSkge1xuXHRcdHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG5cdH07XG5cdEludmFsaWRDaGFyYWN0ZXJFcnJvci5wcm90b3R5cGUgPSBuZXcgRXJyb3I7XG5cdEludmFsaWRDaGFyYWN0ZXJFcnJvci5wcm90b3R5cGUubmFtZSA9ICdJbnZhbGlkQ2hhcmFjdGVyRXJyb3InO1xuXG5cdHZhciBlcnJvciA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcblx0XHQvLyBOb3RlOiB0aGUgZXJyb3IgbWVzc2FnZXMgdXNlZCB0aHJvdWdob3V0IHRoaXMgZmlsZSBtYXRjaCB0aG9zZSB1c2VkIGJ5XG5cdFx0Ly8gdGhlIG5hdGl2ZSBgYXRvYmAvYGJ0b2FgIGltcGxlbWVudGF0aW9uIGluIENocm9taXVtLlxuXHRcdHRocm93IG5ldyBJbnZhbGlkQ2hhcmFjdGVyRXJyb3IobWVzc2FnZSk7XG5cdH07XG5cblx0dmFyIFRBQkxFID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nO1xuXHQvLyBodHRwOi8vd2hhdHdnLm9yZy9odG1sL2NvbW1vbi1taWNyb3N5bnRheGVzLmh0bWwjc3BhY2UtY2hhcmFjdGVyXG5cdHZhciBSRUdFWF9TUEFDRV9DSEFSQUNURVJTID0gL1tcXHRcXG5cXGZcXHIgXS9nO1xuXG5cdC8vIGBkZWNvZGVgIGlzIGRlc2lnbmVkIHRvIGJlIGZ1bGx5IGNvbXBhdGlibGUgd2l0aCBgYXRvYmAgYXMgZGVzY3JpYmVkIGluIHRoZVxuXHQvLyBIVE1MIFN0YW5kYXJkLiBodHRwOi8vd2hhdHdnLm9yZy9odG1sL3dlYmFwcGFwaXMuaHRtbCNkb20td2luZG93YmFzZTY0LWF0b2Jcblx0Ly8gVGhlIG9wdGltaXplZCBiYXNlNjQtZGVjb2RpbmcgYWxnb3JpdGhtIHVzZWQgaXMgYmFzZWQgb24gQGF0a+KAmXMgZXhjZWxsZW50XG5cdC8vIGltcGxlbWVudGF0aW9uLiBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9hdGsvMTAyMDM5NlxuXHR2YXIgZGVjb2RlID0gZnVuY3Rpb24oaW5wdXQpIHtcblx0XHRpbnB1dCA9IFN0cmluZyhpbnB1dClcblx0XHRcdC5yZXBsYWNlKFJFR0VYX1NQQUNFX0NIQVJBQ1RFUlMsICcnKTtcblx0XHR2YXIgbGVuZ3RoID0gaW5wdXQubGVuZ3RoO1xuXHRcdGlmIChsZW5ndGggJSA0ID09IDApIHtcblx0XHRcdGlucHV0ID0gaW5wdXQucmVwbGFjZSgvPT0/JC8sICcnKTtcblx0XHRcdGxlbmd0aCA9IGlucHV0Lmxlbmd0aDtcblx0XHR9XG5cdFx0aWYgKFxuXHRcdFx0bGVuZ3RoICUgNCA9PSAxIHx8XG5cdFx0XHQvLyBodHRwOi8vd2hhdHdnLm9yZy9DI2FscGhhbnVtZXJpYy1hc2NpaS1jaGFyYWN0ZXJzXG5cdFx0XHQvW14rYS16QS1aMC05L10vLnRlc3QoaW5wdXQpXG5cdFx0KSB7XG5cdFx0XHRlcnJvcihcblx0XHRcdFx0J0ludmFsaWQgY2hhcmFjdGVyOiB0aGUgc3RyaW5nIHRvIGJlIGRlY29kZWQgaXMgbm90IGNvcnJlY3RseSBlbmNvZGVkLidcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHZhciBiaXRDb3VudGVyID0gMDtcblx0XHR2YXIgYml0U3RvcmFnZTtcblx0XHR2YXIgYnVmZmVyO1xuXHRcdHZhciBvdXRwdXQgPSAnJztcblx0XHR2YXIgcG9zaXRpb24gPSAtMTtcblx0XHR3aGlsZSAoKytwb3NpdGlvbiA8IGxlbmd0aCkge1xuXHRcdFx0YnVmZmVyID0gVEFCTEUuaW5kZXhPZihpbnB1dC5jaGFyQXQocG9zaXRpb24pKTtcblx0XHRcdGJpdFN0b3JhZ2UgPSBiaXRDb3VudGVyICUgNCA/IGJpdFN0b3JhZ2UgKiA2NCArIGJ1ZmZlciA6IGJ1ZmZlcjtcblx0XHRcdC8vIFVubGVzcyB0aGlzIGlzIHRoZSBmaXJzdCBvZiBhIGdyb3VwIG9mIDQgY2hhcmFjdGVyc+KAplxuXHRcdFx0aWYgKGJpdENvdW50ZXIrKyAlIDQpIHtcblx0XHRcdFx0Ly8g4oCmY29udmVydCB0aGUgZmlyc3QgOCBiaXRzIHRvIGEgc2luZ2xlIEFTQ0lJIGNoYXJhY3Rlci5cblx0XHRcdFx0b3V0cHV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoXG5cdFx0XHRcdFx0MHhGRiAmIGJpdFN0b3JhZ2UgPj4gKC0yICogYml0Q291bnRlciAmIDYpXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBvdXRwdXQ7XG5cdH07XG5cblx0Ly8gYGVuY29kZWAgaXMgZGVzaWduZWQgdG8gYmUgZnVsbHkgY29tcGF0aWJsZSB3aXRoIGBidG9hYCBhcyBkZXNjcmliZWQgaW4gdGhlXG5cdC8vIEhUTUwgU3RhbmRhcmQ6IGh0dHA6Ly93aGF0d2cub3JnL2h0bWwvd2ViYXBwYXBpcy5odG1sI2RvbS13aW5kb3diYXNlNjQtYnRvYVxuXHR2YXIgZW5jb2RlID0gZnVuY3Rpb24oaW5wdXQpIHtcblx0XHRpbnB1dCA9IFN0cmluZyhpbnB1dCk7XG5cdFx0aWYgKC9bXlxcMC1cXHhGRl0vLnRlc3QoaW5wdXQpKSB7XG5cdFx0XHQvLyBOb3RlOiBubyBuZWVkIHRvIHNwZWNpYWwtY2FzZSBhc3RyYWwgc3ltYm9scyBoZXJlLCBhcyBzdXJyb2dhdGVzIGFyZVxuXHRcdFx0Ly8gbWF0Y2hlZCwgYW5kIHRoZSBpbnB1dCBpcyBzdXBwb3NlZCB0byBvbmx5IGNvbnRhaW4gQVNDSUkgYW55d2F5LlxuXHRcdFx0ZXJyb3IoXG5cdFx0XHRcdCdUaGUgc3RyaW5nIHRvIGJlIGVuY29kZWQgY29udGFpbnMgY2hhcmFjdGVycyBvdXRzaWRlIG9mIHRoZSAnICtcblx0XHRcdFx0J0xhdGluMSByYW5nZS4nXG5cdFx0XHQpO1xuXHRcdH1cblx0XHR2YXIgcGFkZGluZyA9IGlucHV0Lmxlbmd0aCAlIDM7XG5cdFx0dmFyIG91dHB1dCA9ICcnO1xuXHRcdHZhciBwb3NpdGlvbiA9IC0xO1xuXHRcdHZhciBhO1xuXHRcdHZhciBiO1xuXHRcdHZhciBjO1xuXHRcdHZhciBkO1xuXHRcdHZhciBidWZmZXI7XG5cdFx0Ly8gTWFrZSBzdXJlIGFueSBwYWRkaW5nIGlzIGhhbmRsZWQgb3V0c2lkZSBvZiB0aGUgbG9vcC5cblx0XHR2YXIgbGVuZ3RoID0gaW5wdXQubGVuZ3RoIC0gcGFkZGluZztcblxuXHRcdHdoaWxlICgrK3Bvc2l0aW9uIDwgbGVuZ3RoKSB7XG5cdFx0XHQvLyBSZWFkIHRocmVlIGJ5dGVzLCBpLmUuIDI0IGJpdHMuXG5cdFx0XHRhID0gaW5wdXQuY2hhckNvZGVBdChwb3NpdGlvbikgPDwgMTY7XG5cdFx0XHRiID0gaW5wdXQuY2hhckNvZGVBdCgrK3Bvc2l0aW9uKSA8PCA4O1xuXHRcdFx0YyA9IGlucHV0LmNoYXJDb2RlQXQoKytwb3NpdGlvbik7XG5cdFx0XHRidWZmZXIgPSBhICsgYiArIGM7XG5cdFx0XHQvLyBUdXJuIHRoZSAyNCBiaXRzIGludG8gZm91ciBjaHVua3Mgb2YgNiBiaXRzIGVhY2gsIGFuZCBhcHBlbmQgdGhlXG5cdFx0XHQvLyBtYXRjaGluZyBjaGFyYWN0ZXIgZm9yIGVhY2ggb2YgdGhlbSB0byB0aGUgb3V0cHV0LlxuXHRcdFx0b3V0cHV0ICs9IChcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiAxOCAmIDB4M0YpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiAxMiAmIDB4M0YpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiA2ICYgMHgzRikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyICYgMHgzRilcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKHBhZGRpbmcgPT0gMikge1xuXHRcdFx0YSA9IGlucHV0LmNoYXJDb2RlQXQocG9zaXRpb24pIDw8IDg7XG5cdFx0XHRiID0gaW5wdXQuY2hhckNvZGVBdCgrK3Bvc2l0aW9uKTtcblx0XHRcdGJ1ZmZlciA9IGEgKyBiO1xuXHRcdFx0b3V0cHV0ICs9IChcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiAxMCkgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoKGJ1ZmZlciA+PiA0KSAmIDB4M0YpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KChidWZmZXIgPDwgMikgJiAweDNGKSArXG5cdFx0XHRcdCc9J1xuXHRcdFx0KTtcblx0XHR9IGVsc2UgaWYgKHBhZGRpbmcgPT0gMSkge1xuXHRcdFx0YnVmZmVyID0gaW5wdXQuY2hhckNvZGVBdChwb3NpdGlvbik7XG5cdFx0XHRvdXRwdXQgKz0gKFxuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDIpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KChidWZmZXIgPDwgNCkgJiAweDNGKSArXG5cdFx0XHRcdCc9PSdcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG91dHB1dDtcblx0fTtcblxuXHR2YXIgYmFzZTY0ID0ge1xuXHRcdCdlbmNvZGUnOiBlbmNvZGUsXG5cdFx0J2RlY29kZSc6IGRlY29kZSxcblx0XHQndmVyc2lvbic6ICcwLjEuMCdcblx0fTtcblxuXHQvLyBTb21lIEFNRCBidWlsZCBvcHRpbWl6ZXJzLCBsaWtlIHIuanMsIGNoZWNrIGZvciBzcGVjaWZpYyBjb25kaXRpb24gcGF0dGVybnNcblx0Ly8gbGlrZSB0aGUgZm9sbG93aW5nOlxuXHRpZiAoXG5cdFx0dHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmXG5cdFx0dHlwZW9mIGRlZmluZS5hbWQgPT0gJ29iamVjdCcgJiZcblx0XHRkZWZpbmUuYW1kXG5cdCkge1xuXHRcdGRlZmluZShmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBiYXNlNjQ7XG5cdFx0fSk7XG5cdH1cdGVsc2UgaWYgKGZyZWVFeHBvcnRzICYmICFmcmVlRXhwb3J0cy5ub2RlVHlwZSkge1xuXHRcdGlmIChmcmVlTW9kdWxlKSB7IC8vIGluIE5vZGUuanMgb3IgUmluZ29KUyB2MC44LjArXG5cdFx0XHRmcmVlTW9kdWxlLmV4cG9ydHMgPSBiYXNlNjQ7XG5cdFx0fSBlbHNlIHsgLy8gaW4gTmFyd2hhbCBvciBSaW5nb0pTIHYwLjcuMC1cblx0XHRcdGZvciAodmFyIGtleSBpbiBiYXNlNjQpIHtcblx0XHRcdFx0YmFzZTY0Lmhhc093blByb3BlcnR5KGtleSkgJiYgKGZyZWVFeHBvcnRzW2tleV0gPSBiYXNlNjRba2V5XSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2UgeyAvLyBpbiBSaGlubyBvciBhIHdlYiBicm93c2VyXG5cdFx0cm9vdC5iYXNlNjQgPSBiYXNlNjQ7XG5cdH1cblxufSh0aGlzKSk7XG4iLCIvKiFcbiAqIERldGVybWluZSBpZiBhbiBvYmplY3QgaXMgYSBCdWZmZXJcbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8aHR0cHM6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG5cbi8vIFRoZSBfaXNCdWZmZXIgY2hlY2sgaXMgZm9yIFNhZmFyaSA1LTcgc3VwcG9ydCwgYmVjYXVzZSBpdCdzIG1pc3Npbmdcbi8vIE9iamVjdC5wcm90b3R5cGUuY29uc3RydWN0b3IuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHlcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICE9IG51bGwgJiYgKGlzQnVmZmVyKG9iaikgfHwgaXNTbG93QnVmZmVyKG9iaikgfHwgISFvYmouX2lzQnVmZmVyKVxufVxuXG5mdW5jdGlvbiBpc0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiAhIW9iai5jb25zdHJ1Y3RvciAmJiB0eXBlb2Ygb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopXG59XG5cbi8vIEZvciBOb2RlIHYwLjEwIHN1cHBvcnQuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHkuXG5mdW5jdGlvbiBpc1Nsb3dCdWZmZXIgKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iai5yZWFkRmxvYXRMRSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqLnNsaWNlID09PSAnZnVuY3Rpb24nICYmIGlzQnVmZmVyKG9iai5zbGljZSgwLCAwKSlcbn1cbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciByZXBsYWNlID0gU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlO1xudmFyIHBlcmNlbnRUd2VudGllcyA9IC8lMjAvZztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgJ2RlZmF1bHQnOiAnUkZDMzk4NicsXG4gICAgZm9ybWF0dGVyczoge1xuICAgICAgICBSRkMxNzM4OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiByZXBsYWNlLmNhbGwodmFsdWUsIHBlcmNlbnRUd2VudGllcywgJysnKTtcbiAgICAgICAgfSxcbiAgICAgICAgUkZDMzk4NjogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFJGQzE3Mzg6ICdSRkMxNzM4JyxcbiAgICBSRkMzOTg2OiAnUkZDMzk4Nidcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBmb3JtYXRzID0gcmVxdWlyZSgnLi9mb3JtYXRzJyk7XG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxudmFyIGFycmF5UHJlZml4R2VuZXJhdG9ycyA9IHtcbiAgICBicmFja2V0czogZnVuY3Rpb24gYnJhY2tldHMocHJlZml4KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuYy1uYW1lLW1hdGNoaW5nXG4gICAgICAgIHJldHVybiBwcmVmaXggKyAnW10nO1xuICAgIH0sXG4gICAgY29tbWE6ICdjb21tYScsXG4gICAgaW5kaWNlczogZnVuY3Rpb24gaW5kaWNlcyhwcmVmaXgsIGtleSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmMtbmFtZS1tYXRjaGluZ1xuICAgICAgICByZXR1cm4gcHJlZml4ICsgJ1snICsga2V5ICsgJ10nO1xuICAgIH0sXG4gICAgcmVwZWF0OiBmdW5jdGlvbiByZXBlYXQocHJlZml4KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuYy1uYW1lLW1hdGNoaW5nXG4gICAgICAgIHJldHVybiBwcmVmaXg7XG4gICAgfVxufTtcblxudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xudmFyIHB1c2ggPSBBcnJheS5wcm90b3R5cGUucHVzaDtcbnZhciBwdXNoVG9BcnJheSA9IGZ1bmN0aW9uIChhcnIsIHZhbHVlT3JBcnJheSkge1xuICAgIHB1c2guYXBwbHkoYXJyLCBpc0FycmF5KHZhbHVlT3JBcnJheSkgPyB2YWx1ZU9yQXJyYXkgOiBbdmFsdWVPckFycmF5XSk7XG59O1xuXG52YXIgdG9JU08gPSBEYXRlLnByb3RvdHlwZS50b0lTT1N0cmluZztcblxudmFyIGRlZmF1bHRzID0ge1xuICAgIGFkZFF1ZXJ5UHJlZml4OiBmYWxzZSxcbiAgICBhbGxvd0RvdHM6IGZhbHNlLFxuICAgIGNoYXJzZXQ6ICd1dGYtOCcsXG4gICAgY2hhcnNldFNlbnRpbmVsOiBmYWxzZSxcbiAgICBkZWxpbWl0ZXI6ICcmJyxcbiAgICBlbmNvZGU6IHRydWUsXG4gICAgZW5jb2RlcjogdXRpbHMuZW5jb2RlLFxuICAgIGVuY29kZVZhbHVlc09ubHk6IGZhbHNlLFxuICAgIGZvcm1hdHRlcjogZm9ybWF0cy5mb3JtYXR0ZXJzW2Zvcm1hdHNbJ2RlZmF1bHQnXV0sXG4gICAgLy8gZGVwcmVjYXRlZFxuICAgIGluZGljZXM6IGZhbHNlLFxuICAgIHNlcmlhbGl6ZURhdGU6IGZ1bmN0aW9uIHNlcmlhbGl6ZURhdGUoZGF0ZSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmMtbmFtZS1tYXRjaGluZ1xuICAgICAgICByZXR1cm4gdG9JU08uY2FsbChkYXRlKTtcbiAgICB9LFxuICAgIHNraXBOdWxsczogZmFsc2UsXG4gICAgc3RyaWN0TnVsbEhhbmRsaW5nOiBmYWxzZVxufTtcblxudmFyIHN0cmluZ2lmeSA9IGZ1bmN0aW9uIHN0cmluZ2lmeSggLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLW5hbWUtbWF0Y2hpbmdcbiAgICBvYmplY3QsXG4gICAgcHJlZml4LFxuICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgsXG4gICAgc3RyaWN0TnVsbEhhbmRsaW5nLFxuICAgIHNraXBOdWxscyxcbiAgICBlbmNvZGVyLFxuICAgIGZpbHRlcixcbiAgICBzb3J0LFxuICAgIGFsbG93RG90cyxcbiAgICBzZXJpYWxpemVEYXRlLFxuICAgIGZvcm1hdHRlcixcbiAgICBlbmNvZGVWYWx1ZXNPbmx5LFxuICAgIGNoYXJzZXRcbikge1xuICAgIHZhciBvYmogPSBvYmplY3Q7XG4gICAgaWYgKHR5cGVvZiBmaWx0ZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgb2JqID0gZmlsdGVyKHByZWZpeCwgb2JqKTtcbiAgICB9IGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgb2JqID0gc2VyaWFsaXplRGF0ZShvYmopO1xuICAgIH0gZWxzZSBpZiAoZ2VuZXJhdGVBcnJheVByZWZpeCA9PT0gJ2NvbW1hJyAmJiBpc0FycmF5KG9iaikpIHtcbiAgICAgICAgb2JqID0gb2JqLmpvaW4oJywnKTtcbiAgICB9XG5cbiAgICBpZiAob2JqID09PSBudWxsKSB7XG4gICAgICAgIGlmIChzdHJpY3ROdWxsSGFuZGxpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBlbmNvZGVyICYmICFlbmNvZGVWYWx1ZXNPbmx5ID8gZW5jb2RlcihwcmVmaXgsIGRlZmF1bHRzLmVuY29kZXIsIGNoYXJzZXQpIDogcHJlZml4O1xuICAgICAgICB9XG5cbiAgICAgICAgb2JqID0gJyc7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBvYmogPT09ICdudW1iZXInIHx8IHR5cGVvZiBvYmogPT09ICdib29sZWFuJyB8fCB1dGlscy5pc0J1ZmZlcihvYmopKSB7XG4gICAgICAgIGlmIChlbmNvZGVyKSB7XG4gICAgICAgICAgICB2YXIga2V5VmFsdWUgPSBlbmNvZGVWYWx1ZXNPbmx5ID8gcHJlZml4IDogZW5jb2RlcihwcmVmaXgsIGRlZmF1bHRzLmVuY29kZXIsIGNoYXJzZXQpO1xuICAgICAgICAgICAgcmV0dXJuIFtmb3JtYXR0ZXIoa2V5VmFsdWUpICsgJz0nICsgZm9ybWF0dGVyKGVuY29kZXIob2JqLCBkZWZhdWx0cy5lbmNvZGVyLCBjaGFyc2V0KSldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbZm9ybWF0dGVyKHByZWZpeCkgKyAnPScgKyBmb3JtYXR0ZXIoU3RyaW5nKG9iaikpXTtcbiAgICB9XG5cbiAgICB2YXIgdmFsdWVzID0gW107XG5cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICB9XG5cbiAgICB2YXIgb2JqS2V5cztcbiAgICBpZiAoaXNBcnJheShmaWx0ZXIpKSB7XG4gICAgICAgIG9iaktleXMgPSBmaWx0ZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgICAgICBvYmpLZXlzID0gc29ydCA/IGtleXMuc29ydChzb3J0KSA6IGtleXM7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmpLZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBrZXkgPSBvYmpLZXlzW2ldO1xuXG4gICAgICAgIGlmIChza2lwTnVsbHMgJiYgb2JqW2tleV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgICAgICAgICAgcHVzaFRvQXJyYXkodmFsdWVzLCBzdHJpbmdpZnkoXG4gICAgICAgICAgICAgICAgb2JqW2tleV0sXG4gICAgICAgICAgICAgICAgdHlwZW9mIGdlbmVyYXRlQXJyYXlQcmVmaXggPT09ICdmdW5jdGlvbicgPyBnZW5lcmF0ZUFycmF5UHJlZml4KHByZWZpeCwga2V5KSA6IHByZWZpeCxcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZUFycmF5UHJlZml4LFxuICAgICAgICAgICAgICAgIHN0cmljdE51bGxIYW5kbGluZyxcbiAgICAgICAgICAgICAgICBza2lwTnVsbHMsXG4gICAgICAgICAgICAgICAgZW5jb2RlcixcbiAgICAgICAgICAgICAgICBmaWx0ZXIsXG4gICAgICAgICAgICAgICAgc29ydCxcbiAgICAgICAgICAgICAgICBhbGxvd0RvdHMsXG4gICAgICAgICAgICAgICAgc2VyaWFsaXplRGF0ZSxcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgZW5jb2RlVmFsdWVzT25seSxcbiAgICAgICAgICAgICAgICBjaGFyc2V0XG4gICAgICAgICAgICApKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHB1c2hUb0FycmF5KHZhbHVlcywgc3RyaW5naWZ5KFxuICAgICAgICAgICAgICAgIG9ialtrZXldLFxuICAgICAgICAgICAgICAgIHByZWZpeCArIChhbGxvd0RvdHMgPyAnLicgKyBrZXkgOiAnWycgKyBrZXkgKyAnXScpLFxuICAgICAgICAgICAgICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgsXG4gICAgICAgICAgICAgICAgc3RyaWN0TnVsbEhhbmRsaW5nLFxuICAgICAgICAgICAgICAgIHNraXBOdWxscyxcbiAgICAgICAgICAgICAgICBlbmNvZGVyLFxuICAgICAgICAgICAgICAgIGZpbHRlcixcbiAgICAgICAgICAgICAgICBzb3J0LFxuICAgICAgICAgICAgICAgIGFsbG93RG90cyxcbiAgICAgICAgICAgICAgICBzZXJpYWxpemVEYXRlLFxuICAgICAgICAgICAgICAgIGZvcm1hdHRlcixcbiAgICAgICAgICAgICAgICBlbmNvZGVWYWx1ZXNPbmx5LFxuICAgICAgICAgICAgICAgIGNoYXJzZXRcbiAgICAgICAgICAgICkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlcztcbn07XG5cbnZhciBub3JtYWxpemVTdHJpbmdpZnlPcHRpb25zID0gZnVuY3Rpb24gbm9ybWFsaXplU3RyaW5naWZ5T3B0aW9ucyhvcHRzKSB7XG4gICAgaWYgKCFvcHRzKSB7XG4gICAgICAgIHJldHVybiBkZWZhdWx0cztcbiAgICB9XG5cbiAgICBpZiAob3B0cy5lbmNvZGVyICE9PSBudWxsICYmIG9wdHMuZW5jb2RlciAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBvcHRzLmVuY29kZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRW5jb2RlciBoYXMgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICB2YXIgY2hhcnNldCA9IG9wdHMuY2hhcnNldCB8fCBkZWZhdWx0cy5jaGFyc2V0O1xuICAgIGlmICh0eXBlb2Ygb3B0cy5jaGFyc2V0ICE9PSAndW5kZWZpbmVkJyAmJiBvcHRzLmNoYXJzZXQgIT09ICd1dGYtOCcgJiYgb3B0cy5jaGFyc2V0ICE9PSAnaXNvLTg4NTktMScpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIGNoYXJzZXQgb3B0aW9uIG11c3QgYmUgZWl0aGVyIHV0Zi04LCBpc28tODg1OS0xLCBvciB1bmRlZmluZWQnKTtcbiAgICB9XG5cbiAgICB2YXIgZm9ybWF0ID0gZm9ybWF0c1snZGVmYXVsdCddO1xuICAgIGlmICh0eXBlb2Ygb3B0cy5mb3JtYXQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmICghaGFzLmNhbGwoZm9ybWF0cy5mb3JtYXR0ZXJzLCBvcHRzLmZvcm1hdCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZm9ybWF0IG9wdGlvbiBwcm92aWRlZC4nKTtcbiAgICAgICAgfVxuICAgICAgICBmb3JtYXQgPSBvcHRzLmZvcm1hdDtcbiAgICB9XG4gICAgdmFyIGZvcm1hdHRlciA9IGZvcm1hdHMuZm9ybWF0dGVyc1tmb3JtYXRdO1xuXG4gICAgdmFyIGZpbHRlciA9IGRlZmF1bHRzLmZpbHRlcjtcbiAgICBpZiAodHlwZW9mIG9wdHMuZmlsdGVyID09PSAnZnVuY3Rpb24nIHx8IGlzQXJyYXkob3B0cy5maWx0ZXIpKSB7XG4gICAgICAgIGZpbHRlciA9IG9wdHMuZmlsdGVyO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGFkZFF1ZXJ5UHJlZml4OiB0eXBlb2Ygb3B0cy5hZGRRdWVyeVByZWZpeCA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5hZGRRdWVyeVByZWZpeCA6IGRlZmF1bHRzLmFkZFF1ZXJ5UHJlZml4LFxuICAgICAgICBhbGxvd0RvdHM6IHR5cGVvZiBvcHRzLmFsbG93RG90cyA9PT0gJ3VuZGVmaW5lZCcgPyBkZWZhdWx0cy5hbGxvd0RvdHMgOiAhIW9wdHMuYWxsb3dEb3RzLFxuICAgICAgICBjaGFyc2V0OiBjaGFyc2V0LFxuICAgICAgICBjaGFyc2V0U2VudGluZWw6IHR5cGVvZiBvcHRzLmNoYXJzZXRTZW50aW5lbCA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5jaGFyc2V0U2VudGluZWwgOiBkZWZhdWx0cy5jaGFyc2V0U2VudGluZWwsXG4gICAgICAgIGRlbGltaXRlcjogdHlwZW9mIG9wdHMuZGVsaW1pdGVyID09PSAndW5kZWZpbmVkJyA/IGRlZmF1bHRzLmRlbGltaXRlciA6IG9wdHMuZGVsaW1pdGVyLFxuICAgICAgICBlbmNvZGU6IHR5cGVvZiBvcHRzLmVuY29kZSA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5lbmNvZGUgOiBkZWZhdWx0cy5lbmNvZGUsXG4gICAgICAgIGVuY29kZXI6IHR5cGVvZiBvcHRzLmVuY29kZXIgPT09ICdmdW5jdGlvbicgPyBvcHRzLmVuY29kZXIgOiBkZWZhdWx0cy5lbmNvZGVyLFxuICAgICAgICBlbmNvZGVWYWx1ZXNPbmx5OiB0eXBlb2Ygb3B0cy5lbmNvZGVWYWx1ZXNPbmx5ID09PSAnYm9vbGVhbicgPyBvcHRzLmVuY29kZVZhbHVlc09ubHkgOiBkZWZhdWx0cy5lbmNvZGVWYWx1ZXNPbmx5LFxuICAgICAgICBmaWx0ZXI6IGZpbHRlcixcbiAgICAgICAgZm9ybWF0dGVyOiBmb3JtYXR0ZXIsXG4gICAgICAgIHNlcmlhbGl6ZURhdGU6IHR5cGVvZiBvcHRzLnNlcmlhbGl6ZURhdGUgPT09ICdmdW5jdGlvbicgPyBvcHRzLnNlcmlhbGl6ZURhdGUgOiBkZWZhdWx0cy5zZXJpYWxpemVEYXRlLFxuICAgICAgICBza2lwTnVsbHM6IHR5cGVvZiBvcHRzLnNraXBOdWxscyA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5za2lwTnVsbHMgOiBkZWZhdWx0cy5za2lwTnVsbHMsXG4gICAgICAgIHNvcnQ6IHR5cGVvZiBvcHRzLnNvcnQgPT09ICdmdW5jdGlvbicgPyBvcHRzLnNvcnQgOiBudWxsLFxuICAgICAgICBzdHJpY3ROdWxsSGFuZGxpbmc6IHR5cGVvZiBvcHRzLnN0cmljdE51bGxIYW5kbGluZyA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5zdHJpY3ROdWxsSGFuZGxpbmcgOiBkZWZhdWx0cy5zdHJpY3ROdWxsSGFuZGxpbmdcbiAgICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBvcHRzKSB7XG4gICAgdmFyIG9iaiA9IG9iamVjdDtcbiAgICB2YXIgb3B0aW9ucyA9IG5vcm1hbGl6ZVN0cmluZ2lmeU9wdGlvbnMob3B0cyk7XG5cbiAgICB2YXIgb2JqS2V5cztcbiAgICB2YXIgZmlsdGVyO1xuXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLmZpbHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBmaWx0ZXIgPSBvcHRpb25zLmZpbHRlcjtcbiAgICAgICAgb2JqID0gZmlsdGVyKCcnLCBvYmopO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheShvcHRpb25zLmZpbHRlcikpIHtcbiAgICAgICAgZmlsdGVyID0gb3B0aW9ucy5maWx0ZXI7XG4gICAgICAgIG9iaktleXMgPSBmaWx0ZXI7XG4gICAgfVxuXG4gICAgdmFyIGtleXMgPSBbXTtcblxuICAgIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JyB8fCBvYmogPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHZhciBhcnJheUZvcm1hdDtcbiAgICBpZiAob3B0cyAmJiBvcHRzLmFycmF5Rm9ybWF0IGluIGFycmF5UHJlZml4R2VuZXJhdG9ycykge1xuICAgICAgICBhcnJheUZvcm1hdCA9IG9wdHMuYXJyYXlGb3JtYXQ7XG4gICAgfSBlbHNlIGlmIChvcHRzICYmICdpbmRpY2VzJyBpbiBvcHRzKSB7XG4gICAgICAgIGFycmF5Rm9ybWF0ID0gb3B0cy5pbmRpY2VzID8gJ2luZGljZXMnIDogJ3JlcGVhdCc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYXJyYXlGb3JtYXQgPSAnaW5kaWNlcyc7XG4gICAgfVxuXG4gICAgdmFyIGdlbmVyYXRlQXJyYXlQcmVmaXggPSBhcnJheVByZWZpeEdlbmVyYXRvcnNbYXJyYXlGb3JtYXRdO1xuXG4gICAgaWYgKCFvYmpLZXlzKSB7XG4gICAgICAgIG9iaktleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnNvcnQpIHtcbiAgICAgICAgb2JqS2V5cy5zb3J0KG9wdGlvbnMuc29ydCk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmpLZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBrZXkgPSBvYmpLZXlzW2ldO1xuXG4gICAgICAgIGlmIChvcHRpb25zLnNraXBOdWxscyAmJiBvYmpba2V5XSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgcHVzaFRvQXJyYXkoa2V5cywgc3RyaW5naWZ5KFxuICAgICAgICAgICAgb2JqW2tleV0sXG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICBnZW5lcmF0ZUFycmF5UHJlZml4LFxuICAgICAgICAgICAgb3B0aW9ucy5zdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgICAgICAgICBvcHRpb25zLnNraXBOdWxscyxcbiAgICAgICAgICAgIG9wdGlvbnMuZW5jb2RlID8gb3B0aW9ucy5lbmNvZGVyIDogbnVsbCxcbiAgICAgICAgICAgIG9wdGlvbnMuZmlsdGVyLFxuICAgICAgICAgICAgb3B0aW9ucy5zb3J0LFxuICAgICAgICAgICAgb3B0aW9ucy5hbGxvd0RvdHMsXG4gICAgICAgICAgICBvcHRpb25zLnNlcmlhbGl6ZURhdGUsXG4gICAgICAgICAgICBvcHRpb25zLmZvcm1hdHRlcixcbiAgICAgICAgICAgIG9wdGlvbnMuZW5jb2RlVmFsdWVzT25seSxcbiAgICAgICAgICAgIG9wdGlvbnMuY2hhcnNldFxuICAgICAgICApKTtcbiAgICB9XG5cbiAgICB2YXIgam9pbmVkID0ga2V5cy5qb2luKG9wdGlvbnMuZGVsaW1pdGVyKTtcbiAgICB2YXIgcHJlZml4ID0gb3B0aW9ucy5hZGRRdWVyeVByZWZpeCA9PT0gdHJ1ZSA/ICc/JyA6ICcnO1xuXG4gICAgaWYgKG9wdGlvbnMuY2hhcnNldFNlbnRpbmVsKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmNoYXJzZXQgPT09ICdpc28tODg1OS0xJykge1xuICAgICAgICAgICAgLy8gZW5jb2RlVVJJQ29tcG9uZW50KCcmIzEwMDAzOycpLCB0aGUgXCJudW1lcmljIGVudGl0eVwiIHJlcHJlc2VudGF0aW9uIG9mIGEgY2hlY2ttYXJrXG4gICAgICAgICAgICBwcmVmaXggKz0gJ3V0Zjg9JTI2JTIzMTAwMDMlM0ImJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGVuY29kZVVSSUNvbXBvbmVudCgn4pyTJylcbiAgICAgICAgICAgIHByZWZpeCArPSAndXRmOD0lRTIlOUMlOTMmJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBqb2luZWQubGVuZ3RoID4gMCA/IHByZWZpeCArIGpvaW5lZCA6ICcnO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbnZhciBoZXhUYWJsZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFycmF5ID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICAgICAgICBhcnJheS5wdXNoKCclJyArICgoaSA8IDE2ID8gJzAnIDogJycpICsgaS50b1N0cmluZygxNikpLnRvVXBwZXJDYXNlKCkpO1xuICAgIH1cblxuICAgIHJldHVybiBhcnJheTtcbn0oKSk7XG5cbnZhciBjb21wYWN0UXVldWUgPSBmdW5jdGlvbiBjb21wYWN0UXVldWUocXVldWUpIHtcbiAgICB3aGlsZSAocXVldWUubGVuZ3RoID4gMSkge1xuICAgICAgICB2YXIgaXRlbSA9IHF1ZXVlLnBvcCgpO1xuICAgICAgICB2YXIgb2JqID0gaXRlbS5vYmpbaXRlbS5wcm9wXTtcblxuICAgICAgICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgICB2YXIgY29tcGFjdGVkID0gW107XG5cbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgb2JqLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmpbal0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBhY3RlZC5wdXNoKG9ialtqXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpdGVtLm9ialtpdGVtLnByb3BdID0gY29tcGFjdGVkO1xuICAgICAgICB9XG4gICAgfVxufTtcblxudmFyIGFycmF5VG9PYmplY3QgPSBmdW5jdGlvbiBhcnJheVRvT2JqZWN0KHNvdXJjZSwgb3B0aW9ucykge1xuICAgIHZhciBvYmogPSBvcHRpb25zICYmIG9wdGlvbnMucGxhaW5PYmplY3RzID8gT2JqZWN0LmNyZWF0ZShudWxsKSA6IHt9O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc291cmNlW2ldICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgb2JqW2ldID0gc291cmNlW2ldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbn07XG5cbnZhciBtZXJnZSA9IGZ1bmN0aW9uIG1lcmdlKHRhcmdldCwgc291cmNlLCBvcHRpb25zKSB7XG4gICAgaWYgKCFzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHNvdXJjZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKGlzQXJyYXkodGFyZ2V0KSkge1xuICAgICAgICAgICAgdGFyZ2V0LnB1c2goc291cmNlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQgJiYgdHlwZW9mIHRhcmdldCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGlmICgob3B0aW9ucyAmJiAob3B0aW9ucy5wbGFpbk9iamVjdHMgfHwgb3B0aW9ucy5hbGxvd1Byb3RvdHlwZXMpKSB8fCAhaGFzLmNhbGwoT2JqZWN0LnByb3RvdHlwZSwgc291cmNlKSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFtzb3VyY2VdID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBbdGFyZ2V0LCBzb3VyY2VdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICBpZiAoIXRhcmdldCB8fCB0eXBlb2YgdGFyZ2V0ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gW3RhcmdldF0uY29uY2F0KHNvdXJjZSk7XG4gICAgfVxuXG4gICAgdmFyIG1lcmdlVGFyZ2V0ID0gdGFyZ2V0O1xuICAgIGlmIChpc0FycmF5KHRhcmdldCkgJiYgIWlzQXJyYXkoc291cmNlKSkge1xuICAgICAgICBtZXJnZVRhcmdldCA9IGFycmF5VG9PYmplY3QodGFyZ2V0LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBpZiAoaXNBcnJheSh0YXJnZXQpICYmIGlzQXJyYXkoc291cmNlKSkge1xuICAgICAgICBzb3VyY2UuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaSkge1xuICAgICAgICAgICAgaWYgKGhhcy5jYWxsKHRhcmdldCwgaSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0SXRlbSA9IHRhcmdldFtpXTtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0SXRlbSAmJiB0eXBlb2YgdGFyZ2V0SXRlbSA9PT0gJ29iamVjdCcgJiYgaXRlbSAmJiB0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W2ldID0gbWVyZ2UodGFyZ2V0SXRlbSwgaXRlbSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRbaV0gPSBpdGVtO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICByZXR1cm4gT2JqZWN0LmtleXMoc291cmNlKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywga2V5KSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHNvdXJjZVtrZXldO1xuXG4gICAgICAgIGlmIChoYXMuY2FsbChhY2MsIGtleSkpIHtcbiAgICAgICAgICAgIGFjY1trZXldID0gbWVyZ2UoYWNjW2tleV0sIHZhbHVlLCBvcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFjY1trZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCBtZXJnZVRhcmdldCk7XG59O1xuXG52YXIgYXNzaWduID0gZnVuY3Rpb24gYXNzaWduU2luZ2xlU291cmNlKHRhcmdldCwgc291cmNlKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHNvdXJjZSkucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGtleSkge1xuICAgICAgICBhY2Nba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHRhcmdldCk7XG59O1xuXG52YXIgZGVjb2RlID0gZnVuY3Rpb24gKHN0ciwgZGVjb2RlciwgY2hhcnNldCkge1xuICAgIHZhciBzdHJXaXRob3V0UGx1cyA9IHN0ci5yZXBsYWNlKC9cXCsvZywgJyAnKTtcbiAgICBpZiAoY2hhcnNldCA9PT0gJ2lzby04ODU5LTEnKSB7XG4gICAgICAgIC8vIHVuZXNjYXBlIG5ldmVyIHRocm93cywgbm8gdHJ5Li4uY2F0Y2ggbmVlZGVkOlxuICAgICAgICByZXR1cm4gc3RyV2l0aG91dFBsdXMucmVwbGFjZSgvJVswLTlhLWZdezJ9L2dpLCB1bmVzY2FwZSk7XG4gICAgfVxuICAgIC8vIHV0Zi04XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChzdHJXaXRob3V0UGx1cyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gc3RyV2l0aG91dFBsdXM7XG4gICAgfVxufTtcblxudmFyIGVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShzdHIsIGRlZmF1bHRFbmNvZGVyLCBjaGFyc2V0KSB7XG4gICAgLy8gVGhpcyBjb2RlIHdhcyBvcmlnaW5hbGx5IHdyaXR0ZW4gYnkgQnJpYW4gV2hpdGUgKG1zY2RleCkgZm9yIHRoZSBpby5qcyBjb3JlIHF1ZXJ5c3RyaW5nIGxpYnJhcnkuXG4gICAgLy8gSXQgaGFzIGJlZW4gYWRhcHRlZCBoZXJlIGZvciBzdHJpY3RlciBhZGhlcmVuY2UgdG8gUkZDIDM5ODZcbiAgICBpZiAoc3RyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cblxuICAgIHZhciBzdHJpbmcgPSB0eXBlb2Ygc3RyID09PSAnc3RyaW5nJyA/IHN0ciA6IFN0cmluZyhzdHIpO1xuXG4gICAgaWYgKGNoYXJzZXQgPT09ICdpc28tODg1OS0xJykge1xuICAgICAgICByZXR1cm4gZXNjYXBlKHN0cmluZykucmVwbGFjZSgvJXVbMC05YS1mXXs0fS9naSwgZnVuY3Rpb24gKCQwKSB7XG4gICAgICAgICAgICByZXR1cm4gJyUyNiUyMycgKyBwYXJzZUludCgkMC5zbGljZSgyKSwgMTYpICsgJyUzQic7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhciBvdXQgPSAnJztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0cmluZy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgYyA9IHN0cmluZy5jaGFyQ29kZUF0KGkpO1xuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIGMgPT09IDB4MkQgLy8gLVxuICAgICAgICAgICAgfHwgYyA9PT0gMHgyRSAvLyAuXG4gICAgICAgICAgICB8fCBjID09PSAweDVGIC8vIF9cbiAgICAgICAgICAgIHx8IGMgPT09IDB4N0UgLy8gflxuICAgICAgICAgICAgfHwgKGMgPj0gMHgzMCAmJiBjIDw9IDB4MzkpIC8vIDAtOVxuICAgICAgICAgICAgfHwgKGMgPj0gMHg0MSAmJiBjIDw9IDB4NUEpIC8vIGEtelxuICAgICAgICAgICAgfHwgKGMgPj0gMHg2MSAmJiBjIDw9IDB4N0EpIC8vIEEtWlxuICAgICAgICApIHtcbiAgICAgICAgICAgIG91dCArPSBzdHJpbmcuY2hhckF0KGkpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYyA8IDB4ODApIHtcbiAgICAgICAgICAgIG91dCA9IG91dCArIGhleFRhYmxlW2NdO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYyA8IDB4ODAwKSB7XG4gICAgICAgICAgICBvdXQgPSBvdXQgKyAoaGV4VGFibGVbMHhDMCB8IChjID4+IDYpXSArIGhleFRhYmxlWzB4ODAgfCAoYyAmIDB4M0YpXSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjIDwgMHhEODAwIHx8IGMgPj0gMHhFMDAwKSB7XG4gICAgICAgICAgICBvdXQgPSBvdXQgKyAoaGV4VGFibGVbMHhFMCB8IChjID4+IDEyKV0gKyBoZXhUYWJsZVsweDgwIHwgKChjID4+IDYpICYgMHgzRildICsgaGV4VGFibGVbMHg4MCB8IChjICYgMHgzRildKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaSArPSAxO1xuICAgICAgICBjID0gMHgxMDAwMCArICgoKGMgJiAweDNGRikgPDwgMTApIHwgKHN0cmluZy5jaGFyQ29kZUF0KGkpICYgMHgzRkYpKTtcbiAgICAgICAgb3V0ICs9IGhleFRhYmxlWzB4RjAgfCAoYyA+PiAxOCldXG4gICAgICAgICAgICArIGhleFRhYmxlWzB4ODAgfCAoKGMgPj4gMTIpICYgMHgzRildXG4gICAgICAgICAgICArIGhleFRhYmxlWzB4ODAgfCAoKGMgPj4gNikgJiAweDNGKV1cbiAgICAgICAgICAgICsgaGV4VGFibGVbMHg4MCB8IChjICYgMHgzRildO1xuICAgIH1cblxuICAgIHJldHVybiBvdXQ7XG59O1xuXG52YXIgY29tcGFjdCA9IGZ1bmN0aW9uIGNvbXBhY3QodmFsdWUpIHtcbiAgICB2YXIgcXVldWUgPSBbeyBvYmo6IHsgbzogdmFsdWUgfSwgcHJvcDogJ28nIH1dO1xuICAgIHZhciByZWZzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHF1ZXVlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBpdGVtID0gcXVldWVbaV07XG4gICAgICAgIHZhciBvYmogPSBpdGVtLm9ialtpdGVtLnByb3BdO1xuXG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBrZXlzLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0ga2V5c1tqXTtcbiAgICAgICAgICAgIHZhciB2YWwgPSBvYmpba2V5XTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwgIT09IG51bGwgJiYgcmVmcy5pbmRleE9mKHZhbCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcXVldWUucHVzaCh7IG9iajogb2JqLCBwcm9wOiBrZXkgfSk7XG4gICAgICAgICAgICAgICAgcmVmcy5wdXNoKHZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wYWN0UXVldWUocXVldWUpO1xuXG4gICAgcmV0dXJuIHZhbHVlO1xufTtcblxudmFyIGlzUmVnRXhwID0gZnVuY3Rpb24gaXNSZWdFeHAob2JqKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBSZWdFeHBdJztcbn07XG5cbnZhciBpc0J1ZmZlciA9IGZ1bmN0aW9uIGlzQnVmZmVyKG9iaikge1xuICAgIGlmICghb2JqIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gISEob2JqLmNvbnN0cnVjdG9yICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlciAmJiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIob2JqKSk7XG59O1xuXG52YXIgY29tYmluZSA9IGZ1bmN0aW9uIGNvbWJpbmUoYSwgYikge1xuICAgIHJldHVybiBbXS5jb25jYXQoYSwgYik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBhcnJheVRvT2JqZWN0OiBhcnJheVRvT2JqZWN0LFxuICAgIGFzc2lnbjogYXNzaWduLFxuICAgIGNvbWJpbmU6IGNvbWJpbmUsXG4gICAgY29tcGFjdDogY29tcGFjdCxcbiAgICBkZWNvZGU6IGRlY29kZSxcbiAgICBlbmNvZGU6IGVuY29kZSxcbiAgICBpc0J1ZmZlcjogaXNCdWZmZXIsXG4gICAgaXNSZWdFeHA6IGlzUmVnRXhwLFxuICAgIG1lcmdlOiBtZXJnZVxufTtcbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdGlmICghbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxuXHRcdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcblx0fVxuXHRyZXR1cm4gbW9kdWxlO1xufTtcbiIsIi8qKlxuICogQG1vZHVsZSBBUElcbiAqL1xuXG5pbXBvcnQgYXhpb3MsIHsgQXhpb3NJbnN0YW5jZSB9IGZyb20gXCJheGlvc1wiO1xuaW1wb3J0ICogYXMgcXNTdHJpbmdpZnkgZnJvbSBcInFzL2xpYi9zdHJpbmdpZnlcIjtcblxuaW1wb3J0IHsgQXV0aGVudGljYXRpb24sIElBdXRoZW50aWNhdGlvbiB9IGZyb20gXCIuL0F1dGhlbnRpY2F0aW9uXCI7XG5pbXBvcnQgeyBjb25jdXJyZW5jeU1hbmFnZXIgfSBmcm9tIFwiLi9Db25jdXJyZW5jeU1hbmFnZXJcIjtcbmltcG9ydCB7IElDb25maWd1cmF0aW9uIH0gZnJvbSBcIi4vQ29uZmlndXJhdGlvblwiO1xuXG4vLyBTY2hlbWUgdHlwZXNcbmltcG9ydCB7IEJvZHlUeXBlIH0gZnJvbSBcIi4vc2NoZW1lcy9odHRwL0JvZHlcIjtcbmltcG9ydCB7IFJlcXVlc3RNZXRob2QgfSBmcm9tIFwiLi9zY2hlbWVzL2h0dHAvUmVxdWVzdFwiO1xuaW1wb3J0IHsgSUVycm9yUmVzcG9uc2UgfSBmcm9tIFwiLi9zY2hlbWVzL3Jlc3BvbnNlL0Vycm9yXCI7XG5cbi8vIFV0aWxpdGllc1xuaW1wb3J0IHsgaW52YXJpYW50LCBpc0FycmF5T3JFbXB0eSwgaXNPYmplY3RPckVtcHR5LCBpc1N0cmluZywgZ2V0UGF5bG9hZCB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUFQSSB7XG4gIGF1dGg6IElBdXRoZW50aWNhdGlvbjtcbiAgeGhyOiBBeGlvc0luc3RhbmNlO1xuICBjb25jdXJyZW50OiBSZXR1cm5UeXBlPHR5cGVvZiBjb25jdXJyZW5jeU1hbmFnZXI+O1xuICByZXNldCgpOiB2b2lkO1xuICBnZXQ8VCBleHRlbmRzIGFueSA9IGFueT4oZW5kcG9pbnQ6IHN0cmluZywgcGFyYW1zPzogb2JqZWN0KTogUHJvbWlzZTxUPjtcbiAgcG9zdDxUIGV4dGVuZHMgYW55ID0gYW55PihlbmRwb2ludDogc3RyaW5nLCBib2R5PzogQm9keVR5cGUsIHBhcmFtcz86IG9iamVjdCk6IFByb21pc2U8VD47XG4gIHBhdGNoPFQgZXh0ZW5kcyBhbnkgPSBhbnk+KGVuZHBvaW50OiBzdHJpbmcsIGJvZHk/OiBCb2R5VHlwZSwgcGFyYW1zPzogb2JqZWN0KTogUHJvbWlzZTxUPjtcbiAgcHV0PFQgZXh0ZW5kcyBhbnkgPSBhbnk+KGVuZHBvaW50OiBzdHJpbmcsIGJvZHk/OiBCb2R5VHlwZSwgcGFyYW1zPzogb2JqZWN0KTogUHJvbWlzZTxUPjtcbiAgZGVsZXRlPFQgZXh0ZW5kcyBhbnkgPSBhbnk+KGVuZHBvaW50OiBzdHJpbmcpOiBQcm9taXNlPFQ+O1xuICBnZXRQYXlsb2FkPFQgZXh0ZW5kcyBvYmplY3QgPSBvYmplY3Q+KCk6IFQ7XG4gIHJlcXVlc3Q8VCBleHRlbmRzIGFueSA9IGFueT4oXG4gICAgbWV0aG9kOiBSZXF1ZXN0TWV0aG9kLFxuICAgIGVuZHBvaW50OiBzdHJpbmcsXG4gICAgcGFyYW1zPzogb2JqZWN0LFxuICAgIGRhdGE/OiBvYmplY3QsXG4gICAgbm9FbnY/OiBib29sZWFuLFxuICAgIGhlYWRlcnM/OiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9LFxuICAgIHNraXBQYXJzZVRvSlNPTj86IGJvb2xlYW5cbiAgKTogUHJvbWlzZTxUPjtcbn1cblxuLyoqXG4gKiBBUEkgZGVmaW5pdGlvbiBmb3IgSFRUUCB0cmFuc2FjdGlvbnNcbiAqIEB1c2VzIEF1dGhlbnRpY2F0aW9uXG4gKiBAdXNlcyBheGlvc1xuICogQGF1dGhvciBKYW4gQmlhc2kgPGJpYXNpamFuQGdtYWlsLmNvbT5cbiAqL1xuZXhwb3J0IGNsYXNzIEFQSSBpbXBsZW1lbnRzIElBUEkge1xuICBwdWJsaWMgYXV0aDogSUF1dGhlbnRpY2F0aW9uO1xuICBwdWJsaWMgeGhyID0gYXhpb3MuY3JlYXRlKHtcbiAgICBwYXJhbXNTZXJpYWxpemVyOiBxc1N0cmluZ2lmeSxcbiAgICB0aW1lb3V0OiAxMCAqIDYwICogMTAwMCwgLy8gMTAgbWluXG4gIH0pO1xuICBwdWJsaWMgY29uY3VycmVudCA9IGNvbmN1cnJlbmN5TWFuYWdlcih0aGlzLnhociwgMTApO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlnOiBJQ29uZmlndXJhdGlvbikge1xuICAgIHRoaXMuYXV0aCA9IG5ldyBBdXRoZW50aWNhdGlvbihjb25maWcsIHtcbiAgICAgIHBvc3Q6IHRoaXMucG9zdC5iaW5kKHRoaXMpLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGUgY2xpZW50IGluc3RhbmNlIGJ5IGxvZ2dpbmcgb3V0IGFuZCByZW1vdmluZyB0aGUgVVJMIGFuZCBwcm9qZWN0XG4gICAqL1xuICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5hdXRoLmxvZ291dCgpO1xuICAgIHRoaXMuY29uZmlnLmRlbGV0ZUh5ZHJhdGVkQ29uZmlnKCk7XG4gIH1cblxuICAvLy8gUkVRVUVTVCBNRVRIT0RTIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvKipcbiAgICogR0VUIGNvbnZlbmllbmNlIG1ldGhvZC4gQ2FsbHMgdGhlIHJlcXVlc3QgbWV0aG9kIGZvciB5b3VcbiAgICogQHR5cGVwYXJhbSBUICAgcmVzcG9uc2UgdHlwZVxuICAgKiBAcmV0dXJuIHtQcm9taXNlPFQ+fVxuICAgKi9cbiAgcHVibGljIGdldDxUIGV4dGVuZHMgYW55ID0gYW55PihlbmRwb2ludDogc3RyaW5nLCBwYXJhbXM6IG9iamVjdCA9IHt9KTogUHJvbWlzZTxUPiB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGVuZHBvaW50KSwgXCJlbmRwb2ludCBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIGludmFyaWFudChpc09iamVjdE9yRW1wdHkocGFyYW1zKSwgXCJwYXJhbXMgbXVzdCBiZSBhbiBvYmplY3Qgb3IgZW1wdHlcIik7XG5cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZ2V0XCIsIGVuZHBvaW50LCBwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBPU1QgY29udmVuaWVuY2UgbWV0aG9kLiBDYWxscyB0aGUgcmVxdWVzdCBtZXRob2QgZm9yIHlvdVxuICAgKiBAdHlwZXBhcmFtIFQgICByZXNwb25zZSB0eXBlXG4gICAqIEByZXR1cm4ge1Byb21pc2U8VD59XG4gICAqL1xuICBwdWJsaWMgcG9zdDxUIGV4dGVuZHMgYW55ID0gYW55PihlbmRwb2ludDogc3RyaW5nLCBib2R5OiBCb2R5VHlwZSA9IHt9LCBwYXJhbXM6IG9iamVjdCA9IHt9KTogUHJvbWlzZTxUPiB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGVuZHBvaW50KSwgXCJlbmRwb2ludCBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIGludmFyaWFudChBcnJheS5pc0FycmF5KGJvZHkpID8gaXNBcnJheU9yRW1wdHkoYm9keSkgOiBpc09iamVjdE9yRW1wdHkoYm9keSksIFwiYm9keSBtdXN0IGJlIGFuIGFycmF5IG9yIG9iamVjdFwiKTtcblxuICAgIHJldHVybiB0aGlzLnJlcXVlc3Q8VD4oXCJwb3N0XCIsIGVuZHBvaW50LCBwYXJhbXMsIGJvZHkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBBVENIIGNvbnZlbmllbmNlIG1ldGhvZC4gQ2FsbHMgdGhlIHJlcXVlc3QgbWV0aG9kIGZvciB5b3VcbiAgICogQHR5cGVwYXJhbSBUICAgcmVzcG9uc2UgdHlwZVxuICAgKiBAcmV0dXJuIHtQcm9taXNlPFQ+fVxuICAgKi9cbiAgcHVibGljIHBhdGNoPFQgZXh0ZW5kcyBhbnkgPSBhbnk+KGVuZHBvaW50OiBzdHJpbmcsIGJvZHk6IEJvZHlUeXBlID0ge30sIHBhcmFtczogb2JqZWN0ID0ge30pOiBQcm9taXNlPFQ+IHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcoZW5kcG9pbnQpLCBcImVuZHBvaW50IG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgaW52YXJpYW50KEFycmF5LmlzQXJyYXkoYm9keSkgPyBpc0FycmF5T3JFbXB0eShib2R5KSA6IGlzT2JqZWN0T3JFbXB0eShib2R5KSwgXCJib2R5IG11c3QgYmUgYW4gYXJyYXkgb3Igb2JqZWN0XCIpO1xuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdDxUPihcInBhdGNoXCIsIGVuZHBvaW50LCBwYXJhbXMsIGJvZHkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBVVCBjb252ZW5pZW5jZSBtZXRob2QuIENhbGxzIHRoZSByZXF1ZXN0IG1ldGhvZCBmb3IgeW91XG4gICAqIEB0eXBlcGFyYW0gVCAgIHJlc3BvbnNlIHR5cGVcbiAgICogQHJldHVybiB7UHJvbWlzZTxUPn1cbiAgICovXG4gIHB1YmxpYyBwdXQ8VCBleHRlbmRzIGFueSA9IGFueT4oZW5kcG9pbnQ6IHN0cmluZywgYm9keTogQm9keVR5cGUgPSB7fSwgcGFyYW1zOiBvYmplY3QgPSB7fSk6IFByb21pc2U8VD4ge1xuICAgIGludmFyaWFudChpc1N0cmluZyhlbmRwb2ludCksIFwiZW5kcG9pbnQgbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICBpbnZhcmlhbnQoQXJyYXkuaXNBcnJheShib2R5KSA/IGlzQXJyYXlPckVtcHR5KGJvZHkpIDogaXNPYmplY3RPckVtcHR5KGJvZHkpLCBcImJvZHkgbXVzdCBiZSBhbiBhcnJheSBvciBvYmplY3RcIik7XG5cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0PFQ+KFwicHV0XCIsIGVuZHBvaW50LCBwYXJhbXMsIGJvZHkpO1xuICB9XG5cbiAgLyoqXG4gICAqIERFTEVURSBjb252ZW5pZW5jZSBtZXRob2QuIENhbGxzIHRoZSByZXF1ZXN0IG1ldGhvZCBmb3IgeW91XG4gICAqIEB0eXBlcGFyYW0gVCAgIHJlc3BvbnNlIHR5cGVcbiAgICogQHJldHVybiB7UHJvbWlzZTxUPn1cbiAgICovXG4gIHB1YmxpYyBkZWxldGU8VCBleHRlbmRzIGFueSA9IGFueT4oZW5kcG9pbnQ6IHN0cmluZyk6IFByb21pc2U8VD4ge1xuICAgIGludmFyaWFudChpc1N0cmluZyhlbmRwb2ludCksIFwiZW5kcG9pbnQgbXVzdCBiZSBhIHN0cmluZ1wiKTtcblxuICAgIHJldHVybiB0aGlzLnJlcXVlc3Q8VD4oXCJkZWxldGVcIiwgZW5kcG9pbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHBheWxvYWQgb2YgdGhlIGN1cnJlbnQgdG9rZW4sIHJldHVybiB0eXBlIGNhbiBiZSBnZW5lcmljXG4gICAqIEB0eXBlcGFyYW0gVCAgIGV4dGVuZHMgb2JqZWN0LCBwYXlsb2FkIHR5cGVcbiAgICogQHJldHVybiB7UHJvbWlzZTxUPn1cbiAgICovXG4gIHB1YmxpYyBnZXRQYXlsb2FkPFQgZXh0ZW5kcyBvYmplY3QgPSBvYmplY3Q+KCk6IFQge1xuICAgIGlmICghaXNTdHJpbmcodGhpcy5jb25maWcudG9rZW4pKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gZ2V0UGF5bG9hZDxUPih0aGlzLmNvbmZpZy50b2tlbik7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybSBhbiBBUEkgcmVxdWVzdCB0byB0aGUgRGlyZWN0dXMgQVBJXG4gICAqIEBwYXJhbSB7UmVxdWVzdE1ldGhvZH0gbWV0aG9kICAgIFNlbGVjdGVkIEhUVFAgbWV0aG9kXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBlbmRwb2ludCAgICAgICAgIEVuZHBvaW50IGRlZmluaXRpb24gYXMgcGF0aFxuICAgKiBAcGFyYW0ge29iamVjdD17fX0gcGFyYW1zICAgICAgICBRdWVyeSBwYXJhbWV0ZXJzXG4gICAqIEBwYXJhbSB7b2JqZWN0PXt9fSBkYXRhICAgICAgICAgIERhdGEgcGFzc2VkIHRvIGRpcmVjdHVzXG4gICAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gbm9FbnYgICAgIERvIG5vdCBpbmNsdWRlIHRoZSBgZW52YCBpbiB0aGUgdXJsIChmb3Igc3lzdGVtIGNhbGxzKVxuICAgKiBAcGFyYW0ge29iamVjdD17fX0gaGVhZGVycyAgICAgICBPcHRpb25hbCBoZWFkZXJzIHRvIGluY2x1ZGVcbiAgICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSBza2lwUGFyc2VUb0pTT04gIFdoZXRoZXIgdG8gc2tpcCBgSlNPTi5wYXJzZWAgb3Igbm90XG4gICAqIEB0eXBlcGFyYW0gVCAgICAgICAgICAgICAgICAgICAgIFJlc3BvbnNlIHR5cGUgZGVmaW5pdGlvbiwgZGVmYXVsdHMgdG8gYGFueWBcbiAgICogQHJldHVybiB7UHJvbWlzZTxUPn1cbiAgICovXG4gIHB1YmxpYyByZXF1ZXN0PFQgZXh0ZW5kcyBhbnkgPSBhbnk+KFxuICAgIG1ldGhvZDogUmVxdWVzdE1ldGhvZCxcbiAgICBlbmRwb2ludDogc3RyaW5nLFxuICAgIHBhcmFtczogb2JqZWN0ID0ge30sXG4gICAgZGF0YTogb2JqZWN0ID0ge30sXG4gICAgbm9FbnY6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICBoZWFkZXJzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge30sXG4gICAgc2tpcFBhcnNlVG9KU09OOiBib29sZWFuID0gZmFsc2VcbiAgKTogUHJvbWlzZTxUPiB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKG1ldGhvZCksIFwibWV0aG9kIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGVuZHBvaW50KSwgXCJlbmRwb2ludCBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIGludmFyaWFudChpc09iamVjdE9yRW1wdHkocGFyYW1zKSwgXCJwYXJhbXMgbXVzdCBiZSBhbiBvYmplY3Qgb3IgZW1wdHlcIik7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKHRoaXMuY29uZmlnLnVybCksIFwibWFpbiB1cmwgbXVzdCBiZSBkZWZpbmVkIChzZWUgY29uc3RydWN0b3IpXCIpO1xuICAgIGludmFyaWFudChBcnJheS5pc0FycmF5KGRhdGEpID8gaXNBcnJheU9yRW1wdHkoZGF0YSkgOiBpc09iamVjdE9yRW1wdHkoZGF0YSksIFwiZGF0YSBtdXN0IGJlIGFuIGFycmF5IG9yIG9iamVjdFwiKTtcblxuICAgIGxldCBiYXNlVVJMID0gYCR7dGhpcy5jb25maWcudXJsfS9gO1xuXG4gICAgaWYgKG5vRW52ID09PSBmYWxzZSkge1xuICAgICAgYmFzZVVSTCArPSBgJHt0aGlzLmNvbmZpZy5wcm9qZWN0fS9gO1xuICAgIH1cblxuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0ge1xuICAgICAgYmFzZVVSTCxcbiAgICAgIGRhdGEsXG4gICAgICBoZWFkZXJzLFxuICAgICAgbWV0aG9kLFxuICAgICAgcGFyYW1zLFxuICAgICAgdXJsOiBlbmRwb2ludCxcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuY29uZmlnLnRva2VuICYmIGlzU3RyaW5nKHRoaXMuY29uZmlnLnRva2VuKSAmJiB0aGlzLmNvbmZpZy50b2tlbi5sZW5ndGggPiAwKSB7XG4gICAgICByZXF1ZXN0T3B0aW9ucy5oZWFkZXJzID0gaGVhZGVycztcbiAgICAgIHJlcXVlc3RPcHRpb25zLmhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHt0aGlzLmNvbmZpZy50b2tlbn1gO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnhoclxuICAgICAgLnJlcXVlc3QocmVxdWVzdE9wdGlvbnMpXG4gICAgICAudGhlbigocmVzOiB7IGRhdGE6IGFueSB9KSA9PiByZXMuZGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZURhdGE6IGFueSkgPT4ge1xuICAgICAgICBpZiAoIXJlc3BvbnNlRGF0YSB8fCByZXNwb25zZURhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlRGF0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2VEYXRhICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBza2lwUGFyc2VUb0pTT04gPyByZXNwb25zZURhdGEgOiBKU09OLnBhcnNlKHJlc3BvbnNlRGF0YSk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IHtcbiAgICAgICAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICAgICAgICBlcnJvcixcbiAgICAgICAgICAgICAganNvbjogdHJ1ZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlRGF0YSBhcyBUO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3I6IElFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGlmIChlcnJvci5yZXNwb25zZSkge1xuICAgICAgICAgIHRocm93IGVycm9yLnJlc3BvbnNlLmRhdGEuZXJyb3I7XG4gICAgICAgIH0gZWxzZSBpZiAoZXJyb3IuanNvbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHRocm93IHtcbiAgICAgICAgICAgIGNvZGU6IC0yLFxuICAgICAgICAgICAgZGF0YTogZXJyb3IuZGF0YSxcbiAgICAgICAgICAgIGVycm9yOiBlcnJvci5lcnJvcixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiQVBJIHJldHVybmVkIGludmFsaWQgSlNPTlwiLFxuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cge1xuICAgICAgICAgICAgY29kZTogLTEsXG4gICAgICAgICAgICBlcnJvcixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiTmV0d29yayBFcnJvclwiLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG59XG4iLCIvKipcbiAqIEBtb2R1bGUgQXV0aGVudGljYXRpb25cbiAqL1xuXG5pbXBvcnQgeyBJQ29uZmlndXJhdGlvbiwgSUNvbmZpZ3VyYXRpb25WYWx1ZXMgfSBmcm9tIFwiLi9Db25maWd1cmF0aW9uXCI7XG5cbi8vIE90aGVyIGNsYXNzZXNcbmltcG9ydCB7IElBUEkgfSBmcm9tIFwiLi9BUElcIjtcblxuLy8gU2NoZW1lIHR5cGVzXG5pbXBvcnQgeyBJQXV0aGVudGljYXRlUmVzcG9uc2UgfSBmcm9tIFwiLi9zY2hlbWVzL2F1dGgvQXV0aGVudGljYXRlXCI7XG5pbXBvcnQgeyBJTG9naW5DcmVkZW50aWFscywgSUxvZ2luT3B0aW9ucyB9IGZyb20gXCIuL3NjaGVtZXMvYXV0aC9Mb2dpblwiO1xuaW1wb3J0IHsgSUxvZ2luUmVzcG9uc2UsIFJlZnJlc2hJZk5lZWRlZFJlc3BvbnNlIH0gZnJvbSBcIi4vc2NoZW1lcy9yZXNwb25zZS9Mb2dpblwiO1xuaW1wb3J0IHsgSVJlZnJlc2hUb2tlblJlc3BvbnNlIH0gZnJvbSBcIi4vc2NoZW1lcy9yZXNwb25zZS9Ub2tlblwiO1xuXG4vLyBVdGlsaXRpZXNcbmltcG9ydCB7IGludmFyaWFudCwgaXNGdW5jdGlvbiwgaXNPYmplY3QsIGlzU3RyaW5nLCBnZXRQYXlsb2FkIH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuaW50ZXJmYWNlIElBdXRoZW50aWNhdGlvblJlZnJlc2hFcnJvciB7XG4gIGNvZGU/OiBudW1iZXI7XG4gIG1lc3NhZ2U6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIElBdXRoZW50aWNhdGlvbkluamVjdGFibGVQcm9wcyB7XG4gIHBvc3Q6IElBUElbXCJwb3N0XCJdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElBdXRoZW50aWNhdGlvbiB7XG4gIHJlZnJlc2hJbnRlcnZhbD86IG51bWJlcjtcbiAgaXNMb2dnZWRJbigpOiBib29sZWFuO1xuICBsb2dpbihjcmVkZW50aWFsczogSUxvZ2luQ3JlZGVudGlhbHMsIG9wdGlvbnM/OiBJTG9naW5PcHRpb25zKTogUHJvbWlzZTxJTG9naW5SZXNwb25zZT47XG4gIGxvZ291dCgpOiB2b2lkO1xuICByZWZyZXNoSWZOZWVkZWQoKTogUHJvbWlzZTxbYm9vbGVhbiwgRXJyb3I/XT47XG4gIHJlZnJlc2godG9rZW46IHN0cmluZyk6IFByb21pc2U8SVJlZnJlc2hUb2tlblJlc3BvbnNlPjtcbn1cblxuLyoqXG4gKiBIYW5kbGVzIGFsbCBhdXRoZW50aWNhdGlvbiByZWxhdGVkIGxvZ2ljLCBkZWNvdXBsZWQgZnJvbSB0aGUgY29yZVxuICogQGludGVybmFsXG4gKiBAYXV0aG9yIEphbiBCaWFzaSA8Ymlhc2lqYW5AZ21haWwuY29tPlxuICovXG5leHBvcnQgY2xhc3MgQXV0aGVudGljYXRpb24gaW1wbGVtZW50cyBJQXV0aGVudGljYXRpb24ge1xuICAvKipcbiAgICogQ3VycmVudCBzZXQgYXV0by1yZWZyZXNoIGludGVydmFsIG9yIHVuZGVmaW5lZFxuICAgKiBAdHlwZSB7bnVtYmVyfHVuZGVmaW5lZH1cbiAgICovXG4gIHB1YmxpYyByZWZyZXNoSW50ZXJ2YWw/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIE9wdGlvbmFsIGN1c3RvbWl6ZWQgZXJyb3IgaGFuZGxlclxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHByaXZhdGUgb25BdXRvUmVmcmVzaEVycm9yPzogKG1zZzogSUF1dGhlbnRpY2F0aW9uUmVmcmVzaEVycm9yKSA9PiB2b2lkO1xuXG4gIC8qKlxuICAgKiBPcHRpb25hbCBjdXN0b21pemVkIHN1Y2Nlc3MgaGFuZGxlclxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHByaXZhdGUgb25BdXRvUmVmcmVzaFN1Y2Nlc3M/OiAoY29uZmlnOiBJQ29uZmlndXJhdGlvblZhbHVlcykgPT4gdm9pZDtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBhdXRoZW50aWNhdGlvbiBpbnN0YW5jZVxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtJQ29uZmlndXJhdGlvbn0gY29uZmlnXG4gICAqIEBwYXJhbSB7SUF1dGhlbnRpY2F0aW9uSW5qZWN0YWJsZVByb3BzfSBpbmplY3RcbiAgICovXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlnOiBJQ29uZmlndXJhdGlvbiwgcHJpdmF0ZSBpbmplY3Q6IElBdXRoZW50aWNhdGlvbkluamVjdGFibGVQcm9wcykge1xuICAgIC8vIE9ubHkgc3RhcnQgdGhlIGF1dG8gcmVmcmVzaCBpbnRlcnZhbCBpZiB0aGUgdG9rZW4gZXhpc3RzIGFuZCBpdCdzIGEgSldUXG4gICAgaWYgKGNvbmZpZy50b2tlbiAmJiBjb25maWcudG9rZW4uaW5jbHVkZXMoXCIuXCIpKSB7XG4gICAgICB0aGlzLnN0YXJ0SW50ZXJ2YWwodHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIElmIHRoZSBjdXJyZW50IGF1dGggc3RhdHVzIGlzIGxvZ2dlZCBpblxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgcHVibGljIGlzTG9nZ2VkSW4oKTogYm9vbGVhbiB7XG4gICAgaWYgKFxuICAgICAgaXNTdHJpbmcodGhpcy5jb25maWcudG9rZW4pICYmXG4gICAgICBpc1N0cmluZyh0aGlzLmNvbmZpZy51cmwpICYmXG4gICAgICBpc1N0cmluZyh0aGlzLmNvbmZpZy5wcm9qZWN0KSAmJlxuICAgICAgaXNPYmplY3QodGhpcy5nZXRQYXlsb2FkKCkpXG4gICAgKSB7XG4gICAgICBpZiAodGhpcy5jb25maWcubG9jYWxFeHAgPiBEYXRlLm5vdygpKSB7XG4gICAgICAgIC8vIE5vdCBleHBpcmVkLCBzdWNjZWVkXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogTG9naW4gdG8gdGhlIEFQSTsgR2V0cyBhIG5ldyB0b2tlbiBmcm9tIHRoZSBBUEkgYW5kIHN0b3JlcyBpdCBpbiB0aGlzLnRva2VuLlxuICAgKiBAcGFyYW0ge0lMb2dpbkNyZWRlbnRpYWxzfSBjcmVkZW50aWFscyAgIFVzZXIgbG9naW4gY3JlZGVudGlhbHNcbiAgICogQHBhcmFtIHtJTG9naW5PcHRpb25zP30gb3B0aW9ucyAgICAgICAgICBBZGRpdGlvbmFsIG9wdGlvbnMgcmVnYXJkaW5nIHBlcnNpc3RhbmNlIGFuZCBjby5cbiAgICogQHJldHVybiB7UHJvbWlzZTxJTG9naW5SZXNwb25zZT59XG4gICAqL1xuICBwdWJsaWMgbG9naW4oY3JlZGVudGlhbHM6IElMb2dpbkNyZWRlbnRpYWxzLCBvcHRpb25zPzogSUxvZ2luT3B0aW9ucyk6IFByb21pc2U8SUxvZ2luUmVzcG9uc2U+IHtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3QoY3JlZGVudGlhbHMpLCBcIm1hbGZvcm1lZCBjcmVkZW50aWFsc1wiKTtcbiAgICBpbnZhcmlhbnQoXG4gICAgICBpc1N0cmluZyhjcmVkZW50aWFscy5lbWFpbCkgJiYgaXNTdHJpbmcoY3JlZGVudGlhbHMucGFzc3dvcmQpLFxuICAgICAgXCJlbWFpbCAmIHBhc3N3b3JkIGFyZSByZXF1aXJlZCBpbiBjcmVkZW50aWFsc1wiXG4gICAgKTtcblxuICAgIHRoaXMuY29uZmlnLnRva2VuID0gbnVsbDtcblxuICAgIGlmIChpc1N0cmluZyhjcmVkZW50aWFscy51cmwpKSB7XG4gICAgICB0aGlzLmNvbmZpZy51cmwgPSBjcmVkZW50aWFscy51cmw7XG4gICAgfVxuXG4gICAgaWYgKGlzU3RyaW5nKGNyZWRlbnRpYWxzLnByb2plY3QpKSB7XG4gICAgICB0aGlzLmNvbmZpZy5wcm9qZWN0ID0gY3JlZGVudGlhbHMucHJvamVjdDtcbiAgICB9XG5cbiAgICBpZiAoY3JlZGVudGlhbHMucGVyc2lzdCB8fCAob3B0aW9ucyAmJiBvcHRpb25zLnBlcnNpc3QpIHx8IHRoaXMuY29uZmlnLnBlcnNpc3QpIHtcbiAgICAgIC8vIHVzZSBpbnRlcnZhbCBmb3IgbG9naW4gcmVmcmVzaCB3aGVuIG9wdGlvbiBwZXJzaXN0IGVuYWJsZWRcbiAgICAgIHRoaXMuc3RhcnRJbnRlcnZhbCgpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmluamVjdFxuICAgICAgICAucG9zdChcIi9hdXRoL2F1dGhlbnRpY2F0ZVwiLCB7XG4gICAgICAgICAgZW1haWw6IGNyZWRlbnRpYWxzLmVtYWlsLFxuICAgICAgICAgIHBhc3N3b3JkOiBjcmVkZW50aWFscy5wYXNzd29yZCxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHJlczogSUF1dGhlbnRpY2F0ZVJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgLy8gc2F2ZSBuZXcgdG9rZW4gaW4gY29uZmlndXJhdGlvblxuICAgICAgICAgIHJldHVybiAodGhpcy5jb25maWcudG9rZW4gPSByZXMuZGF0YS50b2tlbik7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCh0b2tlbjogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgLy8gZXhwaXJ5IGRhdGUgaXMgdGhlIG1vbWVudCB3ZSBnb3QgdGhlIHRva2VuICsgNSBtaW51dGVzXG4gICAgICAgICAgdGhpcy5jb25maWcubG9jYWxFeHAgPSBuZXcgRGF0ZShEYXRlLm5vdygpICsgdGhpcy5jb25maWcudG9rZW5FeHBpcmF0aW9uVGltZSkuZ2V0VGltZSgpO1xuXG4gICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICBsb2NhbEV4cDogdGhpcy5jb25maWcubG9jYWxFeHAsXG4gICAgICAgICAgICBwcm9qZWN0OiB0aGlzLmNvbmZpZy5wcm9qZWN0LFxuICAgICAgICAgICAgdG9rZW4sXG4gICAgICAgICAgICB1cmw6IHRoaXMuY29uZmlnLnVybCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogTG9ncyB0aGUgdXNlciBvdXQgYnkgXCJmb3JnZXR0aW5nXCIgdGhlIHRva2VuLCBhbmQgY2xlYXJpbmcgdGhlIHJlZnJlc2ggaW50ZXJ2YWxcbiAgICovXG4gIHB1YmxpYyBsb2dvdXQoKTogdm9pZCB7XG4gICAgdGhpcy5jb25maWcucmVzZXQoKTtcblxuICAgIGlmICh0aGlzLnJlZnJlc2hJbnRlcnZhbCkge1xuICAgICAgdGhpcy5zdG9wSW50ZXJ2YWwoKTtcbiAgICB9XG4gIH1cblxuICAvLy8gUkVGUkVTSCBNRVRIT0RTIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvKipcbiAgICogUmVmcmVzaCB0aGUgdG9rZW4gaWYgaXQgaXMgYWJvdXQgdG8gZXhwaXJlICh3aXRoaW4gMzAgc2Vjb25kcyBvZiBleHBpcnkgZGF0ZSkuXG4gICAqIC0gQ2FsbHMgb25BdXRvUmVmcmVzaFN1Y2Nlc3Mgd2l0aCB0aGUgbmV3IHRva2VuIGlmIHRoZSByZWZyZXNoaW5nIGlzIHN1Y2Nlc3NmdWwuXG4gICAqIC0gQ2FsbHMgb25BdXRvUmVmcmVzaEVycm9yIGlmIHJlZnJlc2hpbmcgdGhlIHRva2VuIGZhaWxzIGZvciBzb21lIHJlYXNvbi5cbiAgICogQHJldHVybiB7UmVmcmVzaElmTmVlZGVkUmVzcG9uc2V9XG4gICAqL1xuICBwdWJsaWMgcmVmcmVzaElmTmVlZGVkKCk6IFByb21pc2U8UmVmcmVzaElmTmVlZGVkUmVzcG9uc2U+IHtcbiAgICBjb25zdCBwYXlsb2FkID0gdGhpcy5nZXRQYXlsb2FkPHsgZXhwOiBhbnkgfT4oKTtcbiAgICBjb25zdCB7IHRva2VuLCB1cmwsIHByb2plY3QsIGxvY2FsRXhwIH0gPSB0aGlzLmNvbmZpZztcblxuICAgIGlmICghaXNTdHJpbmcodG9rZW4pIHx8ICFpc1N0cmluZyh1cmwpIHx8ICFpc1N0cmluZyhwcm9qZWN0KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghcGF5bG9hZCB8fCAhcGF5bG9hZC5leHApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB0aW1lRGlmZiA9IChsb2NhbEV4cCB8fCAwKSAtIERhdGUubm93KCk7XG5cbiAgICBpZiAodGltZURpZmYgPD0gMCkge1xuICAgICAgLy8gdG9rZW4gaGFzIGV4cGlyZWQsIHNraXBwaW5nIGF1dG8gcmVmcmVzaFxuICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5vbkF1dG9SZWZyZXNoRXJyb3IpKSB7XG4gICAgICAgIHRoaXMub25BdXRvUmVmcmVzaEVycm9yKHtcbiAgICAgICAgICBjb2RlOiAxMDIsXG4gICAgICAgICAgbWVzc2FnZTogXCJhdXRoX2V4cGlyZWRfdG9rZW5cIixcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRpbWVEaWZmIDwgMzAwMDApIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxSZWZyZXNoSWZOZWVkZWRSZXNwb25zZT4oKHJlc29sdmU6IChyZXM6IFJlZnJlc2hJZk5lZWRlZFJlc3BvbnNlKSA9PiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5yZWZyZXNoKHRva2VuKVxuICAgICAgICAgIC50aGVuKChyZXM6IElSZWZyZXNoVG9rZW5SZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb25maWcubG9jYWxFeHAgPSBuZXcgRGF0ZShEYXRlLm5vdygpICsgdGhpcy5jb25maWcudG9rZW5FeHBpcmF0aW9uVGltZSkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgdGhpcy5jb25maWcudG9rZW4gPSByZXMuZGF0YS50b2tlbiB8fCB0b2tlbjtcblxuICAgICAgICAgICAgLy8gaWYgYXV0b3JlZnJlc2ggc3VjY2VlZGVkXG4gICAgICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzLm9uQXV0b1JlZnJlc2hTdWNjZXNzKSkge1xuICAgICAgICAgICAgICB0aGlzLm9uQXV0b1JlZnJlc2hTdWNjZXNzKHRoaXMuY29uZmlnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzb2x2ZShbdHJ1ZV0pO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnJvcjogRXJyb3IpID0+IHtcbiAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMub25BdXRvUmVmcmVzaEVycm9yKSkge1xuICAgICAgICAgICAgICB0aGlzLm9uQXV0b1JlZnJlc2hFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc29sdmUoW3RydWUsIGVycm9yXSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgUHJvbWlzZS5yZXNvbHZlKFtmYWxzZV0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdGhlIHBhc3NlZCB0b2tlbiB0byByZXF1ZXN0IGEgbmV3IG9uZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHRva2VuXG4gICAqL1xuICBwdWJsaWMgcmVmcmVzaCh0b2tlbjogc3RyaW5nKTogUHJvbWlzZTxJUmVmcmVzaFRva2VuUmVzcG9uc2U+IHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcodG9rZW4pLCBcInRva2VuIG11c3QgYmUgYSBzdHJpbmdcIik7XG5cbiAgICByZXR1cm4gdGhpcy5pbmplY3QucG9zdDxJUmVmcmVzaFRva2VuUmVzcG9uc2U+KFwiL2F1dGgvcmVmcmVzaFwiLCB7IHRva2VuIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyBhbiBpbnRlcnZhbCBvZiAxMCBzZWNvbmRzIHRoYXQgd2lsbCBjaGVjayBpZiB0aGUgdG9rZW4gbmVlZHMgcmVmcmVzaGluZ1xuICAgKiBAcGFyYW0ge2Jvb2xlYW4/fSBmaXJlSW1tZWRpYXRlbHkgICAgSWYgaXQgc2hvdWxkIGltbWVkaWF0ZWx5IGNhbGwgW3JlZnJlc2hJZk5lZWRlZF1cbiAgICovXG4gIHByaXZhdGUgc3RhcnRJbnRlcnZhbChmaXJlSW1tZWRpYXRlbHk/OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKGZpcmVJbW1lZGlhdGVseSkge1xuICAgICAgdGhpcy5yZWZyZXNoSWZOZWVkZWQoKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlZnJlc2hJbnRlcnZhbCA9IHNldEludGVydmFsKHRoaXMucmVmcmVzaElmTmVlZGVkLmJpbmQodGhpcyksIDEwMDAwKSBhcyBhbnk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIGFuZCBudWxsaWZpZXMgdGhlIHRva2VuIHJlZnJlc2hpbmcgaW50ZXJ2YWxcbiAgICovXG4gIHByaXZhdGUgc3RvcEludGVydmFsKCk6IHZvaWQge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5yZWZyZXNoSW50ZXJ2YWwpO1xuICAgIHRoaXMucmVmcmVzaEludGVydmFsID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBwYXlsb2FkIG9mIHRoZSBjdXJyZW50IHRva2VuLCByZXR1cm4gdHlwZSBjYW4gYmUgZ2VuZXJpY1xuICAgKiBAdHlwZXBhcmFtIFQgICAgIFRoZSBwYXlsb2FkIHJlc3BvbnNlIHR5cGUsIGFyYml0cmFyeSBvYmplY3RcbiAgICogQHJldHVybiB7VH1cbiAgICovXG4gIHByaXZhdGUgZ2V0UGF5bG9hZDxUIGV4dGVuZHMgb2JqZWN0ID0gb2JqZWN0PigpOiBUIHtcbiAgICBpZiAoIWlzU3RyaW5nKHRoaXMuY29uZmlnLnRva2VuKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdldFBheWxvYWQ8VD4odGhpcy5jb25maWcudG9rZW4pO1xuICB9XG59XG4iLCIvKipcbiAqIEBtb2R1bGUgQ29uY3VycmVuY3lNYW5hZ2VyXG4gKi9cblxuaW1wb3J0IHsgQXhpb3NJbnN0YW5jZSwgQXhpb3NSZXF1ZXN0Q29uZmlnLCBBeGlvc1Jlc3BvbnNlIH0gZnJvbSBcImF4aW9zXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbmN1cnJlbmN5UXVldWVJdGVtIHtcbiAgcmVxdWVzdDogQXhpb3NSZXF1ZXN0Q29uZmlnO1xuICByZXNvbHZlcjogKHF1ZXVlZFJlcXVlc3Q6IEF4aW9zUmVxdWVzdENvbmZpZykgPT4gYW55O1xufVxuXG4vKipcbiAqIEhhbmRsaW5nIGFuZCBsaW1pdGluZyBjb25jdXJyZW50IHJlcXVlc3RzIGZvciB0aGUgQVBJLlxuICogQHBhcmFtIHtBeGlvc0luc3RhbmNlfSBheGlvcyAgIFJlZmVyZW5jZSB0byB0aGUgY2FsbGVyIGluc3RhbmNlXG4gKiBAcGFyYW0ge251bWJlcj0xMH0gbGltaXQgICAgICAgV2hlbiB0byByZWF0ZS1saW1pdCBvdXRnb2luZyByZXF1ZXN0c1xuICogQGF1dGhvciBKYW4gQmlhc2kgPGJpYXNpamFuQGdtYWlsLmNvbT5cbiAqL1xuZXhwb3J0IGNvbnN0IGNvbmN1cnJlbmN5TWFuYWdlciA9IChheGlvczogQXhpb3NJbnN0YW5jZSwgbGltaXQ6IG51bWJlciA9IDEwKSA9PiB7XG4gIGlmIChsaW1pdCA8IDEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb25jdXJyZW5jeU1hbmFnZXIgRXJyb3I6IG1pbmltdW4gY29uY3VycmVudCByZXF1ZXN0cyBpcyAxXCIpO1xuICB9XG5cbiAgY29uc3QgaW5zdGFuY2UgPSB7XG4gICAgbGltaXQsXG4gICAgcXVldWU6IFtdIGFzIElDb25jdXJyZW5jeVF1ZXVlSXRlbVtdLFxuICAgIHJ1bm5pbmc6IFtdIGFzIElDb25jdXJyZW5jeVF1ZXVlSXRlbVtdLFxuICAgIGludGVyY2VwdG9yczoge1xuICAgICAgcmVxdWVzdDogbnVsbCxcbiAgICAgIHJlc3BvbnNlOiBudWxsLFxuICAgIH0sXG4gICAgcHVzaChyZXFIYW5kbGVyOiBJQ29uY3VycmVuY3lRdWV1ZUl0ZW0pIHtcbiAgICAgIGluc3RhbmNlLnF1ZXVlLnB1c2gocmVxSGFuZGxlcik7XG4gICAgICBpbnN0YW5jZS5zaGlmdEluaXRpYWwoKTtcbiAgICB9LFxuICAgIHNoaWZ0SW5pdGlhbCgpOiB2b2lkIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAoaW5zdGFuY2UucnVubmluZy5sZW5ndGggPCBpbnN0YW5jZS5saW1pdCkge1xuICAgICAgICAgIGluc3RhbmNlLnNoaWZ0KCk7XG4gICAgICAgIH1cbiAgICAgIH0sIDApO1xuICAgIH0sXG4gICAgc2hpZnQoKTogdm9pZCB7XG4gICAgICBpZiAoaW5zdGFuY2UucXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IHF1ZXVlZCA9IGluc3RhbmNlLnF1ZXVlLnNoaWZ0KCk7XG5cbiAgICAgICAgcXVldWVkLnJlc29sdmVyKHF1ZXVlZC5yZXF1ZXN0KTtcbiAgICAgICAgaW5zdGFuY2UucnVubmluZy5wdXNoKHF1ZXVlZCk7XG4gICAgICB9XG4gICAgfSxcbiAgICAvLyB1c2UgYXMgaW50ZXJjZXB0b3IuIFF1ZXVlIG91dGdvaW5nIHJlcXVlc3RzXG4gICAgcmVxdWVzdEhhbmRsZXIocmVxOiBBeGlvc1JlcXVlc3RDb25maWcpOiBQcm9taXNlPEF4aW9zUmVxdWVzdENvbmZpZz4ge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICBpbnN0YW5jZS5wdXNoKHtcbiAgICAgICAgICByZXF1ZXN0OiByZXEsXG4gICAgICAgICAgcmVzb2x2ZXI6IHJlc29sdmUsXG4gICAgICAgIH0gYXMgSUNvbmN1cnJlbmN5UXVldWVJdGVtKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgLy8gdXNlIGFzIGludGVyY2VwdG9yLiBFeGVjdXRlIHF1ZXVlZCByZXF1ZXN0IHVwb24gcmVjZWl2aW5nIGEgcmVzcG9uc2VcbiAgICByZXNwb25zZUhhbmRsZXIocmVzOiBBeGlvc1Jlc3BvbnNlPGFueT4pOiBBeGlvc1Jlc3BvbnNlPGFueT4ge1xuICAgICAgaW5zdGFuY2UucnVubmluZy5zaGlmdCgpO1xuICAgICAgaW5zdGFuY2Uuc2hpZnQoKTtcblxuICAgICAgcmV0dXJuIHJlcztcbiAgICB9LFxuICAgIGRldGFjaCgpOiB2b2lkIHtcbiAgICAgIGF4aW9zLmludGVyY2VwdG9ycy5yZXF1ZXN0LmVqZWN0KGluc3RhbmNlLmludGVyY2VwdG9ycy5yZXF1ZXN0KTtcbiAgICAgIGF4aW9zLmludGVyY2VwdG9ycy5yZXNwb25zZS5lamVjdChpbnN0YW5jZS5pbnRlcmNlcHRvcnMucmVzcG9uc2UpO1xuICAgIH0sXG4gICAgYXR0YWNoKGxpbWl0Q29uY3VycmVudFJlcXVlc3RzVG8/OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgIGlmIChsaW1pdENvbmN1cnJlbnRSZXF1ZXN0c1RvKSB7XG4gICAgICAgIGluc3RhbmNlLmxpbWl0ID0gbGltaXRDb25jdXJyZW50UmVxdWVzdHNUbztcbiAgICAgIH1cblxuICAgICAgLy8gcXVldWUgY29uY3VycmVudCByZXF1ZXN0c1xuICAgICAgaW5zdGFuY2UuaW50ZXJjZXB0b3JzLnJlcXVlc3QgPSBheGlvcy5pbnRlcmNlcHRvcnMucmVxdWVzdC51c2UoaW5zdGFuY2UucmVxdWVzdEhhbmRsZXIpO1xuICAgICAgaW5zdGFuY2UuaW50ZXJjZXB0b3JzLnJlc3BvbnNlID0gYXhpb3MuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLnVzZShcbiAgICAgICAgaW5zdGFuY2UucmVzcG9uc2VIYW5kbGVyLFxuICAgICAgICBpbnN0YW5jZS5yZXNwb25zZUhhbmRsZXJcbiAgICAgICk7XG4gICAgfSxcbiAgfTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59O1xuIiwiLyoqXG4gKiBAbW9kdWxlIENvbmZpZ3VyYXRpb25cbiAqL1xuXG5pbXBvcnQgeyBpbnZhcmlhbnQsIGlzU3RyaW5nIH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuY29uc3QgU1RPUkFHRV9LRVkgPSBcImRpcmVjdHVzLXNkay1qc1wiO1xuXG4vLyBkZWZpbmluZyBuZWVkZWQgbWV0aG9kcyBmb3IgdGhlIGFic3RyYWN0IHN0b3JhZ2UgYWRhcHRlclxuZXhwb3J0IGludGVyZmFjZSBJU3RvcmFnZUFQSSB7XG4gIGdldEl0ZW08VCBleHRlbmRzIGFueSA9IGFueT4oa2V5OiBzdHJpbmcpOiBUO1xuICBzZXRJdGVtKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZDtcbiAgcmVtb3ZlSXRlbShrZXk6IHN0cmluZyk6IHZvaWQ7XG59XG5cbi8vIGNvbmZpZ3VyYXRpb24gbWVyZ2VkIHdpdGggZGVmYXVsdHNcbmV4cG9ydCBpbnRlcmZhY2UgSUNvbmZpZ3VyYXRpb25WYWx1ZXMge1xuICB1cmw6IHN0cmluZztcbiAgcHJvamVjdDogc3RyaW5nO1xuICB0b2tlbj86IHN0cmluZztcbiAgbG9jYWxFeHA/OiBudW1iZXI7XG4gIHRva2VuRXhwaXJhdGlvblRpbWU/OiBudW1iZXI7XG4gIHBlcnNpc3Q6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbmZpZ3VyYXRpb24ge1xuICB0b2tlbjogc3RyaW5nO1xuICB1cmw6IHN0cmluZztcbiAgcHJvamVjdDogc3RyaW5nO1xuICBsb2NhbEV4cD86IG51bWJlcjtcbiAgdG9rZW5FeHBpcmF0aW9uVGltZTogbnVtYmVyO1xuICBwZXJzaXN0OiBib29sZWFuO1xuICBkZWh5ZHJhdGUoKTogSUNvbmZpZ3VyYXRpb25WYWx1ZXM7XG4gIGRlbGV0ZUh5ZHJhdGVkQ29uZmlnKCk7XG4gIGh5ZHJhdGUoY29uZmlnOiBJQ29uZmlndXJhdGlvblZhbHVlcyk7XG4gIHBhcnRpYWxVcGRhdGUoY29uZmlnOiBQYXJ0aWFsPElDb25maWd1cmF0aW9uVmFsdWVzPik6IHZvaWQ7XG4gIHJlc2V0KCk6IHZvaWQ7XG4gIHVwZGF0ZShjb25maWc6IElDb25maWd1cmF0aW9uVmFsdWVzKTtcbn1cblxuLy8gZGVmYXVsdCBzZXR0aW5nc1xuZXhwb3J0IGludGVyZmFjZSBJQ29uZmlndXJhdGlvbkRlZmF1bHRzIHtcbiAgdG9rZW5FeHBpcmF0aW9uVGltZTogbnVtYmVyO1xuICBwcm9qZWN0OiBzdHJpbmc7XG59XG5cbi8vIGNvbnN0cnVjdG9yIG9wdGlvbnNcbmV4cG9ydCBpbnRlcmZhY2UgSUNvbmZpZ3VyYXRpb25PcHRpb25zIHtcbiAgLyoqXG4gICAqIFRoZSBVUkwgb2YgdGhlIGRpcmVjdXRzIENNU1xuICAgKi9cbiAgdXJsOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgdG9rZW4gdG8gYXV0aGVudGljYXRlIGlmIHByZWZlcnJlZFxuICAgKi9cbiAgdG9rZW4/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBQcm9qZWN0IG5hbWVzcGFjZVxuICAgKi9cbiAgcHJvamVjdD86IHN0cmluZztcbiAgLyoqXG4gICAqIERlZmF1bHQgbG9naW4gZXhwaXJhdGlvbiBhcyBudW1iZXIgaW4gbXNcbiAgICovXG4gIGxvY2FsRXhwPzogbnVtYmVyO1xuICAvKipcbiAgICogSWYgdGhlIHRva2VuIHNob3VsZCBiZSBwZXJzaXRhdGVkIG9yIHJlaHlkcmF0ZWRcbiAgICovXG4gIHBlcnNpc3Q/OiBib29sZWFuO1xuICAvKipcbiAgICogQXV0byB0b2tlbiBleHBpcmF0aW9uIHRpbWVcbiAgICovXG4gIHRva2VuRXhwaXJhdGlvblRpbWU/OiBudW1iZXI7XG59XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBob2xkZXIgZm9yIGRpcmVjdHVzIGltcGxlbWVudGF0aW9uc1xuICogQGF1dGhvciBKYW4gQmlhc2kgPGJpYXNpamFuQGdtYWlsLmNvbT5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRpb24gaW1wbGVtZW50cyBJQ29uZmlndXJhdGlvbiB7XG4gIC8qKlxuICAgKiBEZWZhdWx0cyBmb3IgYWxsIGRpcmVjdHVzIHNkayBpbnN0YW5jZXMsIGNhbiBiZSBtb2RpZmllZCBpZiBwcmVmZXJyZWRcbiAgICogQHR5cGUge0lDb25maWd1cmF0aW9uRGVmYXVsdHN9XG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGRlZmF1bHRzOiBJQ29uZmlndXJhdGlvbkRlZmF1bHRzID0ge1xuICAgIHByb2plY3Q6IFwiX1wiLFxuICAgIHRva2VuRXhwaXJhdGlvblRpbWU6IDUgKiA2ICogMTAwMCxcbiAgfTtcblxuICAvKipcbiAgICogU2F2ZXMgdGhlIGludGVybmFsIGNvbmZpZ3VyYXRpb24gdmFsdWVzLCAqKkRPIE5PVCBtb2RpZnkqKiBmcm9tIHRoZSBvdXRzaWRlXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgcHJpdmF0ZSBpbnRlcm5hbENvbmZpZ3VyYXRpb246IElDb25maWd1cmF0aW9uVmFsdWVzO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGNvbmZpZ3VyYXRpb24gaW5zdGFuY2UsIHdpbGwgYmUgdXNlZCBvbmNlIGZvciBlYWNoIGRpcmVjdHVzIGluc3RhbmNlIChwYXNzaW5nIHJlZnMpLlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtJQ29uZmlndXJhdGlvbk9wdGlvbnN9IGluaXRpYWxDb25maWcgICBJbml0aWFsIGNvbmZpZ3VyYXRpb24gdmFsdWVzXG4gICAqIEBwYXJhbSB7SVN0b3JhZ2VBUEk/fSBzdG9yYWdlICAgICAgICAgICAgICAgICAgU3RvcmFnZSBhZGFwdGVyIGZvciBwZXJzaXN0ZW5jZVxuICAgKi9cbiAgY29uc3RydWN0b3IoaW5pdGlhbENvbmZpZzogSUNvbmZpZ3VyYXRpb25PcHRpb25zID0ge30gYXMgYW55LCBwcml2YXRlIHN0b3JhZ2U/OiBJU3RvcmFnZUFQSSkge1xuICAgIGxldCBkZWh5ZHJhdGVkQ29uZmlnOiBJQ29uZmlndXJhdGlvblZhbHVlcyA9IHt9IGFzIElDb25maWd1cmF0aW9uVmFsdWVzO1xuXG4gICAgaWYgKHN0b3JhZ2UgJiYgQm9vbGVhbihpbml0aWFsQ29uZmlnICYmIGluaXRpYWxDb25maWcucGVyc2lzdCkpIHtcbiAgICAgIC8vIGRlaHlkcmF0ZSBpZiBzdG9yYWdlIHdhcyBwcm92aWRlZCBhbmQgcGVyc2lzdCBmbGFnIGlzIHNldFxuICAgICAgZGVoeWRyYXRlZENvbmZpZyA9IHRoaXMuZGVoeWRyYXRlZEluaXRpYWxDb25maWd1cmF0aW9uKHN0b3JhZ2UpO1xuICAgIH1cblxuICAgIGNvbnN0IHBlcnNpc3QgPSBCb29sZWFuKGRlaHlkcmF0ZWRDb25maWcucGVyc2lzdCB8fCBpbml0aWFsQ29uZmlnLnBlcnNpc3QpO1xuICAgIGNvbnN0IHByb2plY3QgPSBkZWh5ZHJhdGVkQ29uZmlnLnByb2plY3QgfHwgaW5pdGlhbENvbmZpZy5wcm9qZWN0IHx8IENvbmZpZ3VyYXRpb24uZGVmYXVsdHMucHJvamVjdDtcbiAgICBjb25zdCB0b2tlbkV4cGlyYXRpb25UaW1lID1cbiAgICAgIGRlaHlkcmF0ZWRDb25maWcudG9rZW5FeHBpcmF0aW9uVGltZSB8fFxuICAgICAgaW5pdGlhbENvbmZpZy50b2tlbkV4cGlyYXRpb25UaW1lIHx8XG4gICAgICBDb25maWd1cmF0aW9uLmRlZmF1bHRzLnRva2VuRXhwaXJhdGlvblRpbWU7XG5cbiAgICB0aGlzLmludGVybmFsQ29uZmlndXJhdGlvbiA9IHtcbiAgICAgIC4uLmluaXRpYWxDb25maWcsXG4gICAgICAuLi5kZWh5ZHJhdGVkQ29uZmlnLFxuICAgICAgcGVyc2lzdCxcbiAgICAgIHByb2plY3QsXG4gICAgICB0b2tlbkV4cGlyYXRpb25UaW1lLFxuICAgIH07XG4gIH1cblxuICAvLyBBQ0NFU1NPUlMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICBwdWJsaWMgZ2V0IHRva2VuKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuaW50ZXJuYWxDb25maWd1cmF0aW9uLnRva2VuO1xuICB9XG5cbiAgcHVibGljIHNldCB0b2tlbih0b2tlbjogc3RyaW5nKSB7XG4gICAgdGhpcy5wYXJ0aWFsVXBkYXRlKHsgdG9rZW4gfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHRva2VuRXhwaXJhdGlvblRpbWUoKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5pbnRlcm5hbENvbmZpZ3VyYXRpb24udG9rZW5FeHBpcmF0aW9uVGltZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgdG9rZW5FeHBpcmF0aW9uVGltZSh0b2tlbkV4cGlyYXRpb25UaW1lOiBudW1iZXIpIHtcbiAgICAvLyBUT0RPOiBPcHRpb25hbGx5IHJlLWNvbXB1dGUgdGhlIGxvY2FsRXhwIHByb3BlcnR5IGZvciB0aGUgYXV0by1yZWZyZXNoXG4gICAgdGhpcy5wYXJ0aWFsVXBkYXRlKHtcbiAgICAgIHRva2VuRXhwaXJhdGlvblRpbWU6IHRva2VuRXhwaXJhdGlvblRpbWUgKiA2MDAwMCxcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdXJsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuaW50ZXJuYWxDb25maWd1cmF0aW9uLnVybDtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgdXJsKHVybDogc3RyaW5nKSB7XG4gICAgdGhpcy5wYXJ0aWFsVXBkYXRlKHsgdXJsIH0pO1xuICB9XG5cbiAgcHVibGljIGdldCBwcm9qZWN0KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuaW50ZXJuYWxDb25maWd1cmF0aW9uLnByb2plY3Q7XG4gIH1cblxuICBwdWJsaWMgc2V0IHByb2plY3QocHJvamVjdDogc3RyaW5nKSB7XG4gICAgdGhpcy5wYXJ0aWFsVXBkYXRlKHtcbiAgICAgIHByb2plY3Q6IHByb2plY3QgfHwgXCJfXCIsXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGxvY2FsRXhwKCk6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuaW50ZXJuYWxDb25maWd1cmF0aW9uLmxvY2FsRXhwO1xuICB9XG5cbiAgcHVibGljIHNldCBsb2NhbEV4cChsb2NhbEV4cDogbnVtYmVyIHwgdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5wYXJ0aWFsVXBkYXRlKHsgbG9jYWxFeHAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHBlcnNpc3QoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaW50ZXJuYWxDb25maWd1cmF0aW9uLnBlcnNpc3Q7XG4gIH1cblxuICBwdWJsaWMgc2V0IHBlcnNpc3QocGVyc2lzdDogYm9vbGVhbikge1xuICAgIHRoaXMuaW50ZXJuYWxDb25maWd1cmF0aW9uLnBlcnNpc3QgPSBwZXJzaXN0O1xuICB9XG5cbiAgLy8gSEVMUEVSIE1FVEhPRFMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlcyBpZiB0aGUgY29uZmlndXJhdGlvbiBpcyB2YWxpZFxuICAgKiBAdGhyb3dzIHtFcnJvcn1cbiAgICovXG4gIHB1YmxpYyB2YWxpZGF0ZSgpIHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcodGhpcy51cmwpLCBcImNvbmZpZ3VyYXRpb24gLSB1cmwgbXVzdCBiZSBkZWZpbmVkXCIpO1xuICAgIGludmFyaWFudChpc1N0cmluZyh0aGlzLnByb2plY3QpLCBcImNvbmZpZ3VyYXRpb24gLSBwcm9qZWN0IG11c3QgYmUgZGVmaW5lZFwiKTtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcodGhpcy50b2tlbiksIFwiY29uZmlndXJhdGlvbiAtIHByb2plY3QgbXVzdCBiZSBkZWZpbmVkXCIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgY29uZmlndXJhdGlvbiB2YWx1ZXMsIHdpbGwgYWxzbyBoeWRyYXRlIHRoZW0gaWYgcGVyc2lzdGFuY2UgYWN0aXZhdGVkXG4gICAqIEBwYXJhbSB7SUNvbmZpZ3VyYXRpb25WYWx1ZXN9IGNvbmZpZ1xuICAgKi9cbiAgcHVibGljIHVwZGF0ZShjb25maWc6IElDb25maWd1cmF0aW9uVmFsdWVzKTogdm9pZCB7XG4gICAgdGhpcy5pbnRlcm5hbENvbmZpZ3VyYXRpb24gPSBjb25maWc7XG5cbiAgICB0aGlzLmh5ZHJhdGUoY29uZmlnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgcGFydGlhbHMgb2YgdGhlIGNvbmZpZ3VyYXRpb24sIGJlaGF2ZXMgbGlrZSB0aGUgW3VwZGF0ZV0gbWV0aG9kXG4gICAqIEBwYXJhbSB7UGFydGlhbDxJQ29uZmlndXJhdGlvblZhbHVlcz59IGNvbmZpZ1xuICAgKi9cbiAgcHVibGljIHBhcnRpYWxVcGRhdGUoY29uZmlnOiBQYXJ0aWFsPElDb25maWd1cmF0aW9uVmFsdWVzPik6IHZvaWQge1xuICAgIHRoaXMuaW50ZXJuYWxDb25maWd1cmF0aW9uID0ge1xuICAgICAgLi4udGhpcy5pbnRlcm5hbENvbmZpZ3VyYXRpb24sXG4gICAgICAuLi5jb25maWcsXG4gICAgfTtcblxuICAgIHRoaXMuaHlkcmF0ZSh0aGlzLmludGVybmFsQ29uZmlndXJhdGlvbik7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhlIHdob2xlIGNvbmZpdWdyYXRpb24gYW5kIHJlbW92ZSBoeWRyYXRlZCB2YWx1ZXMgZnJvbSBzdG9yYWdlIGFzIHdlbGxcbiAgICovXG4gIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcbiAgICBkZWxldGUgdGhpcy5pbnRlcm5hbENvbmZpZ3VyYXRpb24udG9rZW47XG4gICAgZGVsZXRlIHRoaXMuaW50ZXJuYWxDb25maWd1cmF0aW9uLnVybDtcbiAgICBkZWxldGUgdGhpcy5pbnRlcm5hbENvbmZpZ3VyYXRpb24ubG9jYWxFeHA7XG5cbiAgICB0aGlzLmludGVybmFsQ29uZmlndXJhdGlvbi5wcm9qZWN0ID0gXCJfXCI7XG5cbiAgICB0aGlzLmRlbGV0ZUh5ZHJhdGVkQ29uZmlnKCk7XG4gIH1cblxuICAvLyBTVE9SQUdFIE1FVEhPRFMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICBwdWJsaWMgZGVoeWRyYXRlKCk6IElDb25maWd1cmF0aW9uVmFsdWVzIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoIXRoaXMuc3RvcmFnZSB8fCAhdGhpcy5wZXJzaXN0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbmF0aXZlVmFsdWUgPSB0aGlzLnN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWSk7XG5cbiAgICBpZiAoIW5hdGl2ZVZhbHVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcGFyc2VkQ29uZmlnID0gSlNPTi5wYXJzZShuYXRpdmVWYWx1ZSk7XG4gICAgdGhpcy5pbnRlcm5hbENvbmZpZ3VyYXRpb24gPSBwYXJzZWRDb25maWc7XG5cbiAgICByZXR1cm4gcGFyc2VkQ29uZmlnO1xuICB9XG5cbiAgcHVibGljIGh5ZHJhdGUocHJvcHM6IElDb25maWd1cmF0aW9uVmFsdWVzKSB7XG4gICAgaWYgKCF0aGlzLnN0b3JhZ2UgfHwgIXRoaXMucGVyc2lzdCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfS0VZLCBKU09OLnN0cmluZ2lmeShwcm9wcykpO1xuICB9XG5cbiAgcHVibGljIGRlbGV0ZUh5ZHJhdGVkQ29uZmlnKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5zdG9yYWdlIHx8ICF0aGlzLnBlcnNpc3QpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnN0b3JhZ2UucmVtb3ZlSXRlbShTVE9SQUdFX0tFWSk7XG4gIH1cblxuICBwcml2YXRlIGRlaHlkcmF0ZWRJbml0aWFsQ29uZmlndXJhdGlvbihzdG9yYWdlOiBJU3RvcmFnZUFQSSk6IElDb25maWd1cmF0aW9uVmFsdWVzIHtcbiAgICBpZiAoIXN0b3JhZ2UpIHtcbiAgICAgIHJldHVybiB7fSBhcyBJQ29uZmlndXJhdGlvblZhbHVlcztcbiAgICB9XG5cbiAgICBjb25zdCBuYXRpdmVWYWx1ZSA9IHN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWSk7XG5cbiAgICBpZiAoIW5hdGl2ZVZhbHVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKG5hdGl2ZVZhbHVlKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7fSBhcyBJQ29uZmlndXJhdGlvblZhbHVlcztcbiAgICB9XG4gIH1cbn1cbiIsIi8qKlxuICogQG1vZHVsZSBTREtcbiAqL1xuXG4vLyBHZW5lcmFsIHNjaGVtZSB0eXBlcyB0eXBlc1xuaW1wb3J0IHsgSUxvZ2luQ3JlZGVudGlhbHMsIElMb2dpbk9wdGlvbnMgfSBmcm9tIFwiLi9zY2hlbWVzL2F1dGgvTG9naW5cIjtcbmltcG9ydCB7IEJvZHlUeXBlIH0gZnJvbSBcIi4vc2NoZW1lcy9odHRwL0JvZHlcIjtcbmltcG9ydCB7IFF1ZXJ5UGFyYW1zIGFzIFF1ZXJ5UGFyYW1zVHlwZSB9IGZyb20gXCIuL3NjaGVtZXMvaHR0cC9RdWVyeVwiO1xuXG4vLyBEaXJlY3R1cyBzY2hlbWUgdHlwZXNcbmltcG9ydCB7IElGaWVsZCB9IGZyb20gXCIuL3NjaGVtZXMvZGlyZWN0dXMvRmllbGRcIjtcbmltcG9ydCB7IElSZWxhdGlvbiB9IGZyb20gXCIuL3NjaGVtZXMvZGlyZWN0dXMvUmVsYXRpb25cIjtcbmltcG9ydCB7IElSb2xlIH0gZnJvbSBcIi4vc2NoZW1lcy9kaXJlY3R1cy9Sb2xlXCI7XG5pbXBvcnQgeyBJQ29sbGVjdGlvbiB9IGZyb20gXCIuL3NjaGVtZXMvZGlyZWN0dXMvQ29sbGVjdGlvblwiO1xuaW1wb3J0IHsgSUNvbGxlY3Rpb25QcmVzZXQgfSBmcm9tIFwiLi9zY2hlbWVzL2RpcmVjdHVzL0NvbGxlY3Rpb25QcmVzZXRcIjtcbmltcG9ydCB7IElQZXJtaXNzaW9uIH0gZnJvbSBcIi4vc2NoZW1lcy9kaXJlY3R1cy9QZXJtaXNzaW9uXCI7XG5pbXBvcnQgeyBJVXNlciB9IGZyb20gXCIuL3NjaGVtZXMvZGlyZWN0dXMvVXNlclwiO1xuXG4vLyBSZXF1ZXN0IHNjaGVtZXNcbmltcG9ydCB7IElVcGRhdGVDb2xsZWN0aW9uUHJlc2V0Qm9keSB9IGZyb20gXCIuL3NjaGVtZXMvcmVxdWVzdC9Db2xsZWN0aW9uXCI7XG5cbi8vIFJlc3BvbnNlIHNjaGVtZXNcbmltcG9ydCB7IElSZWxhdGlvbnNSZXNwb25zZSB9IGZyb20gXCIuL3NjaGVtZXMvcmVzcG9uc2UvUmVsYXRpb25cIjtcbmltcG9ydCB7IElBY3Rpdml0eVJlc3BvbnNlIH0gZnJvbSBcIi4vc2NoZW1lcy9yZXNwb25zZS9BY3Rpdml0eVwiO1xuaW1wb3J0IHsgSUNvbGxlY3Rpb25SZXNwb25zZSwgSUNvbGxlY3Rpb25zUmVzcG9uc2UgfSBmcm9tIFwiLi9zY2hlbWVzL3Jlc3BvbnNlL0NvbGxlY3Rpb25cIjtcbmltcG9ydCB7IElDb2xsZWN0aW9uUHJlc2V0UmVzcG9uc2UgfSBmcm9tIFwiLi9zY2hlbWVzL3Jlc3BvbnNlL0NvbGxlY3Rpb25QcmVzZXRcIjtcbmltcG9ydCB7IElFcnJvclJlc3BvbnNlIH0gZnJvbSBcIi4vc2NoZW1lcy9yZXNwb25zZS9FcnJvclwiO1xuaW1wb3J0IHsgSUZpZWxkUmVzcG9uc2UsIElGaWVsZHNSZXNwb25zZSB9IGZyb20gXCIuL3NjaGVtZXMvcmVzcG9uc2UvRmllbGRcIjtcbmltcG9ydCB7IElGaWxlUmVzcG9uc2UsIElGaWxlc1Jlc3BvbnNlIH0gZnJvbSBcIi4vc2NoZW1lcy9yZXNwb25zZS9GaWxlXCI7XG5pbXBvcnQgeyBJSXRlbVJlc3BvbnNlLCBJSXRlbXNSZXNwb25zZSB9IGZyb20gXCIuL3NjaGVtZXMvcmVzcG9uc2UvSXRlbVwiO1xuaW1wb3J0IHsgSUxvZ2luUmVzcG9uc2UgfSBmcm9tIFwiLi9zY2hlbWVzL3Jlc3BvbnNlL0xvZ2luXCI7XG5pbXBvcnQgeyBJUmVsYXRpb25SZXNwb25zZSB9IGZyb20gXCIuL3NjaGVtZXMvcmVzcG9uc2UvUmVsYXRpb25cIjtcbmltcG9ydCB7IElSZXZpc2lvblJlc3BvbnNlIH0gZnJvbSBcIi4vc2NoZW1lcy9yZXNwb25zZS9SZXZpc2lvblwiO1xuaW1wb3J0IHsgSVJvbGVSZXNwb25zZSB9IGZyb20gXCIuL3NjaGVtZXMvcmVzcG9uc2UvUm9sZVwiO1xuaW1wb3J0IHsgSVJlZnJlc2hUb2tlblJlc3BvbnNlIH0gZnJvbSBcIi4vc2NoZW1lcy9yZXNwb25zZS9Ub2tlblwiO1xuaW1wb3J0IHsgSVVzZXJSZXNwb25zZSwgSVVzZXJzUmVzcG9uc2UgfSBmcm9tIFwiLi9zY2hlbWVzL3Jlc3BvbnNlL1VzZXJcIjtcblxuLy8gVXRpbGl0aWVzXG5pbXBvcnQgeyBnZXRDb2xsZWN0aW9uSXRlbVBhdGggfSBmcm9tIFwiLi91dGlscy9jb2xsZWN0aW9uXCI7XG5pbXBvcnQgeyBnZXRQYXlsb2FkIH0gZnJvbSBcIi4vdXRpbHMvcGF5bG9hZFwiO1xuXG4vLyBNYW5hZ2VyIGNsYXNzZXNcbmltcG9ydCB7IEFQSSwgSUFQSSB9IGZyb20gXCIuL0FQSVwiO1xuaW1wb3J0IHsgQ29uZmlndXJhdGlvbiwgSUNvbmZpZ3VyYXRpb24sIElDb25maWd1cmF0aW9uT3B0aW9ucyB9IGZyb20gXCIuL0NvbmZpZ3VyYXRpb25cIjtcblxuaW1wb3J0IHsgSVNlcnZlckluZm9ybWF0aW9uUmVzcG9uc2UgfSBmcm9tIFwiLi9zY2hlbWVzL3Jlc3BvbnNlL1NlcnZlckluZm9ybWF0aW9uXCI7XG5pbXBvcnQgeyBJU2V0dGluZ3NSZXNwb25zZSB9IGZyb20gXCIuL3NjaGVtZXMvcmVzcG9uc2UvU2V0dGluZ1wiO1xuXG4vLyBVdGlsaXRpZXNcbmltcG9ydCB7IGludmFyaWFudCwgaXNBcnJheSwgaXNOb3ROdWxsLCBpc051bWJlciwgaXNPYmplY3QsIGlzT2JqZWN0T3JFbXB0eSwgaXNTdHJpbmcgfSBmcm9tIFwiLi91dGlsc1wiO1xuXG50eXBlIFByaW1hcnlLZXlUeXBlID0gc3RyaW5nIHwgbnVtYmVyO1xuXG4vKipcbiAqIE1haW4gU0RLIGltcGxlbWVudGF0aW9uIHByb3ZpZGVzIHRoZSBwdWJsaWMgQVBJIHRvIGludGVyYWN0IHdpdGggYVxuICogcmVtb3RlIGRpcmVjdHVzIGluc3RhbmNlLlxuICogQHVzZXMgQVBJXG4gKiBAdXNlcyBDb25maWd1cmF0aW9uXG4gKi9cbmV4cG9ydCBjbGFzcyBTREsge1xuICBwdWJsaWMgZ2V0IGxvZ2dlZEluKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmFwaS5hdXRoLmlzTG9nZ2VkSW4oKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcGF5bG9hZCgpOiBhbnkge1xuICAgIGlmICghdGhpcy5jb25maWcudG9rZW4pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmFwaS5nZXRQYXlsb2FkKCk7XG4gIH1cblxuICAvLyBjb252ZW5pZW5jZSBtZXRob2RcbiAgcHVibGljIHN0YXRpYyBnZXRQYXlsb2FkID0gZ2V0UGF5bG9hZDtcblxuICAvLyBhcGkgY29ubmVjdGlvbiBhbmQgc2V0dGluZ3NcbiAgcHVibGljIGNvbmZpZzogSUNvbmZpZ3VyYXRpb247XG4gIHB1YmxpYyBhcGk6IElBUEk7XG5cbiAgLy8gY3JlYXRlIGEgbmV3IGluc3RhbmNlIHdpdGggYW4gQVBJXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IElDb25maWd1cmF0aW9uT3B0aW9ucykge1xuICAgIHRoaXMuY29uZmlnID0gbmV3IENvbmZpZ3VyYXRpb24ob3B0aW9ucyk7XG4gICAgdGhpcy5hcGkgPSBuZXcgQVBJKHRoaXMuY29uZmlnKTtcbiAgfVxuXG4gIC8vICNyZWdpb24gYXV0aGVudGljYXRpb25cblxuICAvKipcbiAgICogTG9naW4gdG8gdGhlIEFQSTsgR2V0cyBhIG5ldyB0b2tlbiBmcm9tIHRoZSBBUEkgYW5kIHN0b3JlcyBpdCBpbiB0aGlzLmFwaS50b2tlbi5cbiAgICovXG4gIHB1YmxpYyBsb2dpbihjcmVkZW50aWFsczogSUxvZ2luQ3JlZGVudGlhbHMsIG9wdGlvbnM/OiBJTG9naW5PcHRpb25zKTogUHJvbWlzZTxJTG9naW5SZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLmFwaS5hdXRoLmxvZ2luKGNyZWRlbnRpYWxzLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2dzIHRoZSB1c2VyIG91dCBieSBcImZvcmdldHRpbmdcIiB0aGUgdG9rZW4sIGFuZCBjbGVhcmluZyB0aGUgcmVmcmVzaCBpbnRlcnZhbFxuICAgKi9cbiAgcHVibGljIGxvZ291dCgpOiB2b2lkIHtcbiAgICB0aGlzLmFwaS5hdXRoLmxvZ291dCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGUgY2xpZW50IGluc3RhbmNlIGJ5IGxvZ2dpbmcgb3V0IGFuZCByZW1vdmluZyB0aGUgVVJMIGFuZCBwcm9qZWN0XG4gICAqL1xuICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5hcGkucmVzZXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWZyZXNoIHRoZSB0b2tlbiBpZiBpdCBpcyBhYm91dCB0byBleHBpcmUgKHdpdGhpbiAzMCBzZWNvbmRzIG9mIGV4cGlyeSBkYXRlKS5cbiAgICogLSBDYWxscyBvbkF1dG9SZWZyZXNoU3VjY2VzcyB3aXRoIHRoZSBuZXcgdG9rZW4gaWYgdGhlIHJlZnJlc2hpbmcgaXMgc3VjY2Vzc2Z1bC5cbiAgICogLSBDYWxscyBvbkF1dG9SZWZyZXNoRXJyb3IgaWYgcmVmcmVzaGluZyB0aGUgdG9rZW4gZmFpbHMgZm9yIHNvbWUgcmVhc29uLlxuICAgKiBAcmV0dXJucyB7W2Jvb2xlYW4sIEVycm9yP119XG4gICAqL1xuICBwdWJsaWMgcmVmcmVzaElmTmVlZGVkKCk6IFByb21pc2U8W2Jvb2xlYW4sIEVycm9yP10+IHtcbiAgICByZXR1cm4gdGhpcy5hcGkuYXV0aC5yZWZyZXNoSWZOZWVkZWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdGhlIHBhc3NlZCB0b2tlbiB0byByZXF1ZXN0IGEgbmV3IG9uZVxuICAgKi9cbiAgcHVibGljIHJlZnJlc2godG9rZW46IHN0cmluZyk6IFByb21pc2U8SVJlZnJlc2hUb2tlblJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuYXBpLmF1dGgucmVmcmVzaCh0b2tlbik7XG4gIH1cblxuICAvKipcbiAgICogUmVxdWVzdCB0byByZXNldCB0aGUgcGFzc3dvcmQgb2YgdGhlIHVzZXIgd2l0aCB0aGUgZ2l2ZW4gZW1haWwgYWRkcmVzcy5cbiAgICogVGhlIEFQSSB3aWxsIHNlbmQgYW4gZW1haWwgdG8gdGhlIGdpdmVuIGVtYWlsIGFkZHJlc3Mgd2l0aCBhIGxpbmsgdG8gZ2VuZXJhdGUgYSBuZXdcbiAgICogdGVtcG9yYXJ5IHBhc3N3b3JkLlxuICAgKi9cbiAgcHVibGljIHJlcXVlc3RQYXNzd29yZFJlc2V0PFRSZXNwb25zZSBleHRlbmRzIGFueSA9IGFueT4oZW1haWw6IHN0cmluZyk6IFByb21pc2U8VFJlc3BvbnNlPiB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGVtYWlsKSwgXCJlbWFpbCBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLnBvc3Q8VFJlc3BvbnNlPihcIi9hdXRoL3Bhc3N3b3JkL3JlcXVlc3RcIiwge1xuICAgICAgZW1haWwsXG4gICAgfSk7XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uIGF1dGhlbnRpY2F0aW9uXG5cbiAgLy8gI2VuZHJlZ2lvbiBjb2xsZWN0aW9uIHByZXNldHNcblxuICAvLyAjcmVnaW9uIGFjdGl2aXR5XG5cbiAgLyoqXG4gICAqIEdldCBhY3Rpdml0eVxuICAgKi9cbiAgcHVibGljIGdldEFjdGl2aXR5KHBhcmFtczogUXVlcnlQYXJhbXNUeXBlID0ge30pOiBQcm9taXNlPElBY3Rpdml0eVJlc3BvbnNlPiB7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0T3JFbXB0eShwYXJhbXMpLCBcInBhcmFtcyBtdXN0IGJlIGFuIG9iamVjdCBvciBlbXB0eVwiKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5nZXQ8SUFjdGl2aXR5UmVzcG9uc2U+KFwiL2FjdGl2aXR5XCIsIHBhcmFtcyk7XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uIGFjdGl2aXR5XG5cbiAgLy8gI3JlZ2lvbiBib29rbWFya3NcblxuICAvKipcbiAgICogR2V0IHRoZSBib29rbWFya3Mgb2YgdGhlIGN1cnJlbnQgdXNlclxuICAgKiBAZGVwcmVjYXRlZCBXaWxsIGJlIHJlbW92ZWQgaW4gdGhlIG5leHQgbWFqb3IgdmVyc2lvbiwgcGxlYXNlIHVzZSB7QGxpbmsgU0RLLmdldENvbGxlY3Rpb25QcmVzZXRzfSBpbnN0ZWFkXG4gICAqIEBzZWUgaHR0cHM6Ly9kb2NzLmRpcmVjdHVzLmlvL2FkdmFuY2VkL2xlZ2FjeS11cGdyYWRlcy5odG1sI2RpcmVjdHVzLWJvb2ttYXJrc1xuICAgKi9cbiAgcHVibGljIGdldE15Qm9va21hcmtzPFRSZXNwb25zZSBleHRlbmRzIGFueVtdID0gYW55W10+KHBhcmFtczogUXVlcnlQYXJhbXNUeXBlID0ge30pOiBQcm9taXNlPFRSZXNwb25zZT4ge1xuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgY29uc29sZS5sb2coYFdhcm5pbmc6IGdldE15Qm9va21hcmtzIGhhcyBiZWVuIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgZ2V0Q29sbGVjdGlvblByZXNldHMgaW5zdGVhZCAoc2VlIGh0dHBzOi8vZG9jcy5kaXJlY3R1cy5pby9hZHZhbmNlZC9sZWdhY3ktdXBncmFkZXMuaHRtbCNkaXJlY3R1cy1ib29rbWFya3MpYCk7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q29sbGVjdGlvblByZXNldHM8VFJlc3BvbnNlPihwYXJhbXMpO1xuICB9XG5cbiAgLy8gI2VuZHJlZ2lvbiBib29rbWFya3NcblxuICAvLyAjcmVnaW9uIGNvbGxlY3Rpb25zXG5cbiAgLyoqXG4gICAqIEdldCBhbGwgYXZhaWxhYmxlIGNvbGxlY3Rpb25zXG4gICAqL1xuICBwdWJsaWMgZ2V0Q29sbGVjdGlvbnMocGFyYW1zOiBRdWVyeVBhcmFtc1R5cGUgPSB7fSk6IFByb21pc2U8SUNvbGxlY3Rpb25zUmVzcG9uc2VbXT4ge1xuICAgIGludmFyaWFudChpc09iamVjdE9yRW1wdHkocGFyYW1zKSwgXCJwYXJhbXMgbXVzdCBiZSBhbiBvYmplY3Qgb3IgZW1wdHlcIik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkuZ2V0PElDb2xsZWN0aW9uc1Jlc3BvbnNlW10+KFwiL2NvbGxlY3Rpb25zXCIsIHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGNvbGxlY3Rpb24gaW5mbyBieSBuYW1lXG4gICAqL1xuICBwdWJsaWMgZ2V0Q29sbGVjdGlvbihjb2xsZWN0aW9uOiBzdHJpbmcsIHBhcmFtczogUXVlcnlQYXJhbXNUeXBlID0ge30pOiBQcm9taXNlPElDb2xsZWN0aW9uUmVzcG9uc2U+IHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcoY29sbGVjdGlvbiksIFwiY29sbGVjdGlvbiBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIGludmFyaWFudChpc09iamVjdE9yRW1wdHkocGFyYW1zKSwgXCJwYXJhbXMgbXVzdCBiZSBhbiBvYmplY3Qgb3IgZW1wdHlcIik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkuZ2V0PElDb2xsZWN0aW9uUmVzcG9uc2U+KGAvY29sbGVjdGlvbnMvJHtjb2xsZWN0aW9ufWAsIHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgY29sbGVjdGlvblxuICAgKi9cbiAgcHVibGljIGNyZWF0ZUNvbGxlY3Rpb24oZGF0YTogSUNvbGxlY3Rpb24pOiBQcm9taXNlPElDb2xsZWN0aW9uUmVzcG9uc2U+IHtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3QoZGF0YSksIFwiZGF0YSBtdXN0IGJlIGFuIG9iamVjdFwiKTtcbiAgICByZXR1cm4gdGhpcy5hcGkucG9zdDxJQ29sbGVjdGlvblJlc3BvbnNlPihcIi9jb2xsZWN0aW9uc1wiLCBkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIGEgY2VydGFpbiBjb2xsZWN0aW9uXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlQ29sbGVjdGlvbihjb2xsZWN0aW9uOiBzdHJpbmcsIGRhdGE6IFBhcnRpYWw8SUNvbGxlY3Rpb24+KTogUHJvbWlzZTxJQ29sbGVjdGlvblJlc3BvbnNlPiB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGNvbGxlY3Rpb24pLCBcImNvbGxlY3Rpb24gbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3QoZGF0YSksIFwiZGF0YSBtdXN0IGJlIGFuIG9iamVjdFwiKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5wYXRjaDxJQ29sbGVjdGlvblJlc3BvbnNlPihgL2NvbGxlY3Rpb25zLyR7Y29sbGVjdGlvbn1gLCBkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGVzIGEgY2VydGFpbiBjb2xsZWN0aW9uXG4gICAqL1xuICBwdWJsaWMgZGVsZXRlQ29sbGVjdGlvbihjb2xsZWN0aW9uOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcoY29sbGVjdGlvbiksIFwiY29sbGVjdGlvbiBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLmRlbGV0ZTx2b2lkPihgL2NvbGxlY3Rpb25zLyR7Y29sbGVjdGlvbn1gKTtcbiAgfVxuXG4gIC8vICNlbmRyZWdpb24gY29sbGVjdGlvbnNcblxuICAvLyAjcmVnaW9uIGNvbGxlY3Rpb24gcHJlc2V0c1xuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGNvbGxlY3Rpb24gcHJlc2V0cyBvZiB0aGUgY3VycmVudCB1c2VyXG4gICAqIEBzZWUgaHR0cHM6Ly9kb2NzLmRpcmVjdHVzLmlvL2FwaS9yZWZlcmVuY2UuaHRtbCNjb2xsZWN0aW9uLXByZXNldHNcbiAgICovXG4gIHB1YmxpYyBnZXRDb2xsZWN0aW9uUHJlc2V0czxUUmVzcG9uc2UgZXh0ZW5kcyBhbnlbXSA9IGFueVtdPihwYXJhbXM6IFF1ZXJ5UGFyYW1zVHlwZSA9IHt9KTogUHJvbWlzZTxUUmVzcG9uc2U+IHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcodGhpcy5jb25maWcudG9rZW4pLCBcImRlZmluZWQgdG9rZW4gaXMgbm90IGEgc3RyaW5nXCIpO1xuICAgIGludmFyaWFudChpc09iamVjdE9yRW1wdHkocGFyYW1zKSwgXCJwYXJhbXMgbXVzdCBiZSBhbiBvYmplY3Qgb3IgZW1wdHlcIik7XG5cbiAgICBjb25zdCBwYXlsb2FkID0gdGhpcy5hcGkuZ2V0UGF5bG9hZDx7IGlkOiBzdHJpbmc7IHJvbGU6IHN0cmluZyB9PigpO1xuXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgIHRoaXMuYXBpLmdldChcIi9jb2xsZWN0aW9uX3ByZXNldHNcIiwge1xuICAgICAgICBcImZpbHRlclt0aXRsZV1bbm51bGxdXCI6IDEsXG4gICAgICAgIFwiZmlsdGVyW3VzZXJdW2VxXVwiOiBwYXlsb2FkLmlkLFxuICAgICAgfSksXG4gICAgICB0aGlzLmFwaS5nZXQoXCIvY29sbGVjdGlvbl9wcmVzZXRzXCIsIHtcbiAgICAgICAgXCJmaWx0ZXJbcm9sZV1bZXFdXCI6IHBheWxvYWQucm9sZSxcbiAgICAgICAgXCJmaWx0ZXJbdGl0bGVdW25udWxsXVwiOiAxLFxuICAgICAgICBcImZpbHRlclt1c2VyXVtudWxsXVwiOiAxLFxuICAgICAgfSksXG4gICAgXSkudGhlbigodmFsdWVzOiBBcnJheTx7IGRhdGE6IGFueSB9PikgPT4ge1xuICAgICAgY29uc3QgW3VzZXIsIHJvbGVdID0gdmFsdWVzO1xuXG4gICAgICByZXR1cm4gWy4uLih1c2VyLmRhdGEgfHwgW10pLCAuLi4ocm9sZS5kYXRhIHx8IFtdKV0gYXMgVFJlc3BvbnNlO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBjb2xsZWN0aW9uIHByZXNldCAoYm9va21hcmsgLyBsaXN0aW5nIHByZWZlcmVuY2VzKVxuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5kaXJlY3R1cy5pby9hcGkvcmVmZXJlbmNlLmh0bWwjY29sbGVjdGlvbi1wcmVzZXRzXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlQ29sbGVjdGlvblByZXNldDxDb2xsZWN0aW9uUHJlc2V0IGV4dGVuZHMgSUNvbGxlY3Rpb25QcmVzZXQ+KFxuICAgIGRhdGE6IENvbGxlY3Rpb25QcmVzZXRcbiAgKTogUHJvbWlzZTxJQ29sbGVjdGlvblByZXNldFJlc3BvbnNlPENvbGxlY3Rpb25QcmVzZXQ+PiB7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0KGRhdGEpLCBcImRhdGEgbXVzdCBiZSBhbiBvYmplY3RcIik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkucG9zdDxJQ29sbGVjdGlvblByZXNldFJlc3BvbnNlPENvbGxlY3Rpb25QcmVzZXQ+PihcIi9jb2xsZWN0aW9uX3ByZXNldHNcIiwgZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGNvbGxlY3Rpb24gcHJlc2V0IChib29rbWFyayAvIGxpc3RpbmcgcHJlZmVyZW5jZSlcbiAgICogQHNlZSBodHRwczovL2RvY3MuZGlyZWN0dXMuaW8vYXBpL3JlZmVyZW5jZS5odG1sI2NvbGxlY3Rpb24tcHJlc2V0c1xuICAgKi9cbiAgcHVibGljIHVwZGF0ZUNvbGxlY3Rpb25QcmVzZXQ8XG4gICAgUGFydGlhbENvbGxlY3Rpb25QcmVzZXQgZXh0ZW5kcyBQYXJ0aWFsPElDb2xsZWN0aW9uUHJlc2V0PixcbiAgICBUUmVzdWx0Q29sbGVjdGlvblByZXNldCBleHRlbmRzIElDb2xsZWN0aW9uUHJlc2V0ID0gSUNvbGxlY3Rpb25QcmVzZXRcbiAgPihcbiAgICBwcmltYXJ5S2V5OiBQcmltYXJ5S2V5VHlwZSxcbiAgICBkYXRhOiBJVXBkYXRlQ29sbGVjdGlvblByZXNldEJvZHlcbiAgKTogUHJvbWlzZTxJQ29sbGVjdGlvblByZXNldFJlc3BvbnNlPFBhcnRpYWxDb2xsZWN0aW9uUHJlc2V0ICYgVFJlc3VsdENvbGxlY3Rpb25QcmVzZXQ+PiB7XG4gICAgaW52YXJpYW50KGlzTm90TnVsbChwcmltYXJ5S2V5KSwgXCJwcmltYXJ5S2V5IG11c3QgYmUgZGVmaW5lZFwiKTtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3QoZGF0YSksIFwiZGF0YSBtdXN0IGJlIGFuIG9iamVjdFwiKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5wYXRjaDxJQ29sbGVjdGlvblByZXNldFJlc3BvbnNlPFBhcnRpYWxDb2xsZWN0aW9uUHJlc2V0ICYgVFJlc3VsdENvbGxlY3Rpb25QcmVzZXQ+PihcbiAgICAgIGAvY29sbGVjdGlvbl9wcmVzZXRzLyR7cHJpbWFyeUtleX1gLFxuICAgICAgZGF0YVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlIGNvbGxlY3Rpb24gcHJlc2V0IGJ5IHByaW1hcnlrZXlcbiAgICogQHNlZSBodHRwczovL2RvY3MuZGlyZWN0dXMuaW8vYXBpL3JlZmVyZW5jZS5odG1sI2NvbGxlY3Rpb24tcHJlc2V0c1xuICAgKi9cbiAgcHVibGljIGRlbGV0ZUNvbGxlY3Rpb25QcmVzZXQocHJpbWFyeUtleTogUHJpbWFyeUtleVR5cGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpbnZhcmlhbnQoaXNOb3ROdWxsKHByaW1hcnlLZXkpLCBcInByaW1hcnlLZXkgbXVzdCBiZSBkZWZpbmVkXCIpO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLmRlbGV0ZTx2b2lkPihgL2NvbGxlY3Rpb25fcHJlc2V0cy8ke3ByaW1hcnlLZXl9YCk7XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uIGNvbGxlY3Rpb24gcHJlc2V0c1xuXG4gIC8vICNyZWdpb24gZXh0ZW5zaW9uc1xuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGluZm9ybWF0aW9uIG9mIGFsbCBpbnN0YWxsZWQgaW50ZXJmYWNlc1xuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5kaXJlY3R1cy5pby9hcGkvcmVmZXJlbmNlLmh0bWwjZ2V0LWV4dGVuc2lvbnNcbiAgICovXG4gIHB1YmxpYyBnZXRJbnRlcmZhY2VzPFRSZXNwb25zZSBleHRlbmRzIGFueVtdID0gYW55W10+KCk6IFByb21pc2U8VFJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuYXBpLnJlcXVlc3Q8VFJlc3BvbnNlPihcImdldFwiLCBcIi9pbnRlcmZhY2VzXCIsIHt9LCB7fSwgdHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBpbmZvcm1hdGlvbiBvZiBhbGwgaW5zdGFsbGVkIGxheW91dHNcbiAgICogQHNlZSBodHRwczovL2RvY3MuZGlyZWN0dXMuaW8vYXBpL3JlZmVyZW5jZS5odG1sI2dldC1leHRlbnNpb25zXG4gICAqL1xuICBwdWJsaWMgZ2V0TGF5b3V0czxUUmVzcG9uc2UgZXh0ZW5kcyBhbnlbXSA9IGFueVtdPigpOiBQcm9taXNlPFRSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLmFwaS5yZXF1ZXN0PFRSZXNwb25zZT4oXCJnZXRcIiwgXCIvbGF5b3V0c1wiLCB7fSwge30sIHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgaW5mb3JtYXRpb24gb2YgYWxsIGluc3RhbGxlZCBwYWdlc1xuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5kaXJlY3R1cy5pby9hcGkvcmVmZXJlbmNlLmh0bWwjZ2V0LWV4dGVuc2lvbnNcbiAgICovXG4gIHB1YmxpYyBnZXRQYWdlczxUUmVzcG9uc2UgZXh0ZW5kcyBhbnlbXSA9IGFueVtdPigpOiBQcm9taXNlPFRSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLmFwaS5yZXF1ZXN0PFRSZXNwb25zZT4oXCJnZXRcIiwgXCIvcGFnZXNcIiwge30sIHt9LCB0cnVlKTtcbiAgfVxuXG4gIC8vICNlbmRyZWdpb24gZXh0ZW5zaW9uc1xuXG4gIC8vICNyZWdpb24gZmllbGRzXG5cbiAgLyoqXG4gICAqIEdldCBhbGwgZmllbGRzIHRoYXQgYXJlIGluIERpcmVjdHVzXG4gICAqIEBzZWUgaHR0cHM6Ly9kb2NzLmRpcmVjdHVzLmlvL2FwaS9yZWZlcmVuY2UuaHRtbCNmaWVsZHMtMlxuICAgKi9cbiAgcHVibGljIGdldEFsbEZpZWxkczxURmllbGRzVHlwZSBleHRlbmRzIElGaWVsZFtdPihcbiAgICBwYXJhbXM6IFF1ZXJ5UGFyYW1zVHlwZSA9IHt9XG4gICk6IFByb21pc2U8SUZpZWxkc1Jlc3BvbnNlPFRGaWVsZHNUeXBlPj4ge1xuICAgIGludmFyaWFudChpc09iamVjdE9yRW1wdHkocGFyYW1zKSwgXCJwYXJhbXMgbXVzdCBiZSBhbiBvYmplY3Qgb3IgZW1wdHlcIik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkuZ2V0PElGaWVsZHNSZXNwb25zZTxURmllbGRzVHlwZT4+KFwiL2ZpZWxkc1wiLCBwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZmllbGRzIHRoYXQgaGF2ZSBiZWVuIHNldHVwIGZvciBhIGdpdmVuIGNvbGxlY3Rpb25cbiAgICogQHNlZSBodHRwczovL2RvY3MuZGlyZWN0dXMuaW8vYXBpL3JlZmVyZW5jZS5odG1sI2ZpZWxkcy0yXG4gICAqL1xuICBwdWJsaWMgZ2V0RmllbGRzPFRGaWVsZHNUeXBlIGV4dGVuZHMgSUZpZWxkW10+KFxuICAgIGNvbGxlY3Rpb246IHN0cmluZyxcbiAgICBwYXJhbXM6IFF1ZXJ5UGFyYW1zVHlwZSA9IHt9XG4gICk6IFByb21pc2U8SUZpZWxkc1Jlc3BvbnNlPFRGaWVsZHNUeXBlPj4ge1xuICAgIGludmFyaWFudChpc1N0cmluZyhjb2xsZWN0aW9uKSwgXCJjb2xsZWN0aW9uIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0T3JFbXB0eShwYXJhbXMpLCBcInBhcmFtcyBtdXN0IGJlIGFuIG9iamVjdCBvciBlbXB0eVwiKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5nZXQ8SUZpZWxkc1Jlc3BvbnNlPFRGaWVsZHNUeXBlPj4oYC9maWVsZHMvJHtjb2xsZWN0aW9ufWAsIHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBmaWVsZCBpbmZvcm1hdGlvbiBmb3IgYSBzaW5nbGUgZ2l2ZW4gZmllbGRcbiAgICogQHNlZSBodHRwczovL2RvY3MuZGlyZWN0dXMuaW8vYXBpL3JlZmVyZW5jZS5odG1sI2ZpZWxkcy0yXG4gICAqL1xuICBwdWJsaWMgZ2V0RmllbGQ8VEZpZWxkVHlwZSBleHRlbmRzIElGaWVsZD4oXG4gICAgY29sbGVjdGlvbjogc3RyaW5nLFxuICAgIGZpZWxkTmFtZTogc3RyaW5nLFxuICAgIHBhcmFtczogUXVlcnlQYXJhbXNUeXBlID0ge31cbiAgKTogUHJvbWlzZTxJRmllbGRSZXNwb25zZTxURmllbGRUeXBlPj4ge1xuICAgIGludmFyaWFudChpc1N0cmluZyhjb2xsZWN0aW9uKSwgXCJjb2xsZWN0aW9uIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGZpZWxkTmFtZSksIFwiZmllbGROYW1lIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0T3JFbXB0eShwYXJhbXMpLCBcInBhcmFtcyBtdXN0IGJlIGFuIG9iamVjdCBvciBlbXB0eVwiKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5nZXQ8SUZpZWxkUmVzcG9uc2U8VEZpZWxkVHlwZT4+KGAvZmllbGRzLyR7Y29sbGVjdGlvbn0vJHtmaWVsZE5hbWV9YCwgcGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBmaWVsZCBpbiB0aGUgZ2l2ZW4gY29sbGVjdGlvblxuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5kaXJlY3R1cy5pby9hcGkvcmVmZXJlbmNlLmh0bWwjZmllbGRzLTJcbiAgICovXG4gIHB1YmxpYyBjcmVhdGVGaWVsZDxURmllbGRUeXBlIGV4dGVuZHMgSUZpZWxkPihcbiAgICBjb2xsZWN0aW9uOiBzdHJpbmcsXG4gICAgZmllbGRJbmZvOiBURmllbGRUeXBlXG4gICk6IFByb21pc2U8SUZpZWxkUmVzcG9uc2U8VEZpZWxkVHlwZT4+IHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcoY29sbGVjdGlvbiksIFwiY29sbGVjdGlvbiBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIGludmFyaWFudChpc09iamVjdChmaWVsZEluZm8pLCBcImZpZWxkSW5mbyBtdXN0IGJlIGFuIG9iamVjdFwiKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5wb3N0PElGaWVsZFJlc3BvbnNlPFRGaWVsZFR5cGU+PihgL2ZpZWxkcy8ke2NvbGxlY3Rpb259YCwgZmllbGRJbmZvKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYSBnaXZlbiBmaWVsZCBpbiBhIGdpdmVuIGNvbGxlY3Rpb25cbiAgICogQHNlZSBodHRwczovL2RvY3MuZGlyZWN0dXMuaW8vYXBpL3JlZmVyZW5jZS5odG1sI2ZpZWxkcy0yXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlRmllbGQ8VEZpZWxkVHlwZSBleHRlbmRzIFBhcnRpYWw8SUZpZWxkPj4oXG4gICAgY29sbGVjdGlvbjogc3RyaW5nLFxuICAgIGZpZWxkTmFtZTogc3RyaW5nLFxuICAgIGZpZWxkSW5mbzogVEZpZWxkVHlwZVxuICApOiBQcm9taXNlPElGaWVsZFJlc3BvbnNlPElGaWVsZCAmIFRGaWVsZFR5cGU+IHwgdW5kZWZpbmVkPiB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGNvbGxlY3Rpb24pLCBcImNvbGxlY3Rpb24gbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcoZmllbGROYW1lKSwgXCJmaWVsZE5hbWUgbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3QoZmllbGRJbmZvKSwgXCJmaWVsZEluZm8gbXVzdCBiZSBhbiBvYmplY3RcIik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkucGF0Y2g8SUZpZWxkUmVzcG9uc2U8SUZpZWxkICYgVEZpZWxkVHlwZT4+KGAvZmllbGRzLyR7Y29sbGVjdGlvbn0vJHtmaWVsZE5hbWV9YCwgZmllbGRJbmZvKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgbXVsdGlwbGUgZmllbGRzIGF0IG9uY2VcbiAgICogQHNlZSBodHRwczovL2RvY3MuZGlyZWN0dXMuaW8vYXBpL3JlZmVyZW5jZS5odG1sI2ZpZWxkcy0yXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIC8vIFNldCBtdWx0aXBsZSBmaWVsZHMgdG8gdGhlIHNhbWUgdmFsdWVcbiAgICogdXBkYXRlRmllbGRzKFwicHJvamVjdHNcIiwgW1wiZmlyc3RfbmFtZVwiLCBcImxhc3RfbmFtZVwiLCBcImVtYWlsXCJdLCB7XG4gICAqICAgZGVmYXVsdF92YWx1ZTogXCJcIlxuICAgKiB9KVxuICAgKlxuICAgKiAvLyBTZXQgbXVsdGlwbGUgZmllbGRzIHRvIGRpZmZlcmVudCB2YWx1ZXNcbiAgICogdXBkYXRlRmllbGRzKFwicHJvamVjdHNcIiwgW1xuICAgKiAgIHtcbiAgICogICAgIGlkOiAxNCxcbiAgICogICAgIHNvcnQ6IDFcbiAgICogICB9LFxuICAgKiAgIHtcbiAgICogICAgIGlkOiAxNyxcbiAgICogICAgIHNvcnQ6IDJcbiAgICogICB9LFxuICAgKiAgIHtcbiAgICogICAgIGlkOiA5MTIsXG4gICAqICAgICBzb3J0OiAzXG4gICAqICAgfVxuICAgKiBdKVxuICAgKi9cbiAgcHVibGljIHVwZGF0ZUZpZWxkczxURmllbGRzVHlwZSBleHRlbmRzIElGaWVsZFtdPihcbiAgICBjb2xsZWN0aW9uOiBzdHJpbmcsXG4gICAgZmllbGRzOiBBcnJheTxQYXJ0aWFsPElGaWVsZD4+XG4gICk6IFByb21pc2U8SUZpZWxkc1Jlc3BvbnNlPFRGaWVsZHNUeXBlICYgSUZpZWxkW10+IHwgdW5kZWZpbmVkPjtcbiAgcHVibGljIHVwZGF0ZUZpZWxkczxURmllbGRzVHlwZSBleHRlbmRzIElGaWVsZFtdPihcbiAgICBjb2xsZWN0aW9uOiBzdHJpbmcsXG4gICAgZmllbGRzOiBzdHJpbmdbXSxcbiAgICBmaWVsZEluZm86IFBhcnRpYWw8SUZpZWxkPlxuICApOiBQcm9taXNlPElGaWVsZHNSZXNwb25zZTxURmllbGRzVHlwZSAmIElGaWVsZFtdPiB8IHVuZGVmaW5lZD47XG4gIHB1YmxpYyB1cGRhdGVGaWVsZHM8VEZpZWxkc1R5cGUgZXh0ZW5kcyBJRmllbGRbXT4oXG4gICAgY29sbGVjdGlvbjogc3RyaW5nLFxuICAgIGZpZWxkc0luZm9PckZpZWxkTmFtZXM6IHN0cmluZ1tdIHwgQXJyYXk8UGFydGlhbDxJRmllbGQ+PixcbiAgICBmaWVsZEluZm86IFBhcnRpYWw8SUZpZWxkPiB8IG51bGwgPSBudWxsXG4gICk6IFByb21pc2U8SUZpZWxkc1Jlc3BvbnNlPFRGaWVsZHNUeXBlICYgSUZpZWxkW10+IHwgdW5kZWZpbmVkPiB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGNvbGxlY3Rpb24pLCBcImNvbGxlY3Rpb24gbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICBpbnZhcmlhbnQoaXNBcnJheShmaWVsZHNJbmZvT3JGaWVsZE5hbWVzKSwgXCJmaWVsZHNJbmZvT3JGaWVsZE5hbWVzIG11c3QgYmUgYW4gYXJyYXlcIik7XG5cbiAgICBpZiAoZmllbGRJbmZvKSB7XG4gICAgICBpbnZhcmlhbnQoaXNPYmplY3QoZmllbGRJbmZvKSwgXCJmaWVsZEluZm8gbXVzdCBiZSBhbiBvYmplY3RcIik7XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkSW5mbykge1xuICAgICAgcmV0dXJuIHRoaXMuYXBpLnBhdGNoKGAvZmllbGRzLyR7Y29sbGVjdGlvbn0vJHtmaWVsZHNJbmZvT3JGaWVsZE5hbWVzLmpvaW4oXCIsXCIpfWAsIGZpZWxkSW5mbyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuYXBpLnBhdGNoKGAvZmllbGRzLyR7Y29sbGVjdGlvbn1gLCBmaWVsZHNJbmZvT3JGaWVsZE5hbWVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgYSBmaWVsZCBmcm9tIGEgY29sbGVjdGlvblxuICAgKiBAc2VlIEBzZWUgaHR0cHM6Ly9kb2NzLmRpcmVjdHVzLmlvL2FwaS9yZWZlcmVuY2UuaHRtbCNmaWVsZHMtMlxuICAgKi9cbiAgcHVibGljIGRlbGV0ZUZpZWxkKGNvbGxlY3Rpb246IHN0cmluZywgZmllbGROYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcoY29sbGVjdGlvbiksIFwiY29sbGVjdGlvbiBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIGludmFyaWFudChpc1N0cmluZyhmaWVsZE5hbWUpLCBcImZpZWxkTmFtZSBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLmRlbGV0ZShgL2ZpZWxkcy8ke2NvbGxlY3Rpb259LyR7ZmllbGROYW1lfWApO1xuICB9XG5cbiAgLy8gI2VuZHJlZ2lvbiBmaWVsZHNcblxuICAvLyAjcmVnaW9uIGZpbGVzXG5cbiAgLyoqXG4gICAqIEdldCBhIGxpc3Qgb2YgYXZhaWxhYmxlIGZpbGVzIGZyb20gRGlyZWN0dXNcbiAgICogQHNlZSBodHRwczovL2RvY3MuZGlyZWN0dXMuaW8vYXBpL3JlZmVyZW5jZS5odG1sI2ZpbGVzXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2V0RmlsZXMocGFyYW1zOiBRdWVyeVBhcmFtc1R5cGUgPSB7fSk6IFByb21pc2U8SUZpbGVzUmVzcG9uc2U+IHtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3RPckVtcHR5KHBhcmFtcyksIFwiUGFyYW1zIG11c3QgYmUgYW4gb2JqZWN0XCIpO1xuICAgIHJldHVybiB0aGlzLmFwaS5nZXQoXCIvZmlsZXNcIiwgcGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBjZXJ0YWluIGZpbGUgb3IgY2VydGFpbiBmaWxlIGxpc3QgZnJvbSBEaXJlY3R1c1xuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5kaXJlY3R1cy5pby9hcGkvcmVmZXJlbmNlLmh0bWwjZmlsZXNcbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZXRGaWxlPFRGaWxlIGV4dGVuZHMgc3RyaW5nIHwgc3RyaW5nW10+KFxuICAgIGZpbGVOYW1lOiBURmlsZSxcbiAgICBwYXJhbXM6IFF1ZXJ5UGFyYW1zVHlwZSA9IHt9XG4gICk6IFByb21pc2U8VEZpbGUgZXh0ZW5kcyBzdHJpbmcgPyBJRmlsZVJlc3BvbnNlIDogSUZpbGVzUmVzcG9uc2U+IHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcoZmlsZU5hbWUpLCBcIkZpbGVOYW1lIG11c3QgYmUgc3RyaW5nXCIpO1xuICAgIGludmFyaWFudChpc09iamVjdE9yRW1wdHkocGFyYW1zKSwgXCJQYXJhbXMgbXVzdCBiZSBhbiBvYmplY3RcIik7XG4gICAgY29uc3QgZmlsZXMgPSB0eXBlb2YgZmlsZU5hbWUgPT09IFwic3RyaW5nXCIgPyBmaWxlTmFtZSA6IChmaWxlTmFtZSBhcyBzdHJpbmdbXSkuam9pbihcIixcIik7XG4gICAgcmV0dXJuIHRoaXMuYXBpLmdldChgL2ZpbGVzLyR7ZmlsZXN9YCwgcGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGxvYWQgbXVsdGlwYXJ0IGZpbGVzIGluIG11bHRpcGFydC9mb3JtLWRhdGEuXG4gICAqIEltcG9ydGFudDogaWYgeW91J3JlIHVzaW5nIHRoZSBgZm9ybS1kYXRhYCBtb2R1bGUsIG1ha2Ugc3VyZSB0aGF0IHlvdSBwYXNzXG4gICAqIHRoZSBnZW5lcmF0ZWQgaGVhZGVycyBhcyBvdmVycmlkZUhlYWRlcnMgb3B0aW9uIVxuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5kaXJlY3R1cy5pby9hcGkvcmVmZXJlbmNlLmh0bWwjZmlsZXNcbiAgICogQGV4YW1wbGVcbiAgICogLy8gd2l0aCBicm93c2VyXG4gICAqIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAqIGNsaWVudC51cGxvYWRGaWxlcyhmb3JtRGF0YSk7XG4gICAqXG4gICAqIC8vIHdpdGggTm9kZS5qc1xuICAgKiBjb25zdCBGb3JtRGF0YSA9IHJlcXVpcmUoJ2Zvcm0tZGF0YScpXG4gICAqIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAqIGNsaWVudC51cGxvYWRGaWxlcyhmb3JtRGF0YSwgKCkgPT4ge30sIGZvcm1EYXRhLmdldEhlYWRlcnMoKSk7XG4gICAqL1xuICBwdWJsaWMgdXBsb2FkRmlsZXM8VFJlc3BvbnNlIGV4dGVuZHMgYW55ID0gYW55W10+KFxuICAgIGRhdGE6IG9iamVjdCwgLy8gVE9ETzogZml4IHR5cGUgZGVmaW5pdGlvblxuICAgIG9uVXBsb2FkUHJvZ3Jlc3M6ICgpID0+IG9iamVjdCA9ICgpID0+ICh7fSksXG4gICAgb3ZlcnJpZGVIZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmcgfCBudW1iZXI+ID0ge31cbiAgKTogUHJvbWlzZTxUUmVzcG9uc2U+IHtcbiAgICBjb25zdCBoZWFkZXJzID0ge1xuICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3RoaXMuY29uZmlnLnRva2VufWAsXG4gICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcIm11bHRpcGFydC9mb3JtLWRhdGFcIixcbiAgICAgIC4uLm92ZXJyaWRlSGVhZGVyc1xuICAgIH07XG5cbiAgICAvLyBsaW1pdCBjb25jdXJyZW50IHJlcXVlc3RzIHRvIDVcbiAgICB0aGlzLmFwaS5jb25jdXJyZW50LmF0dGFjaCg1KTtcblxuICAgIHJldHVybiB0aGlzLmFwaS54aHJcbiAgICAgIC5wb3N0KGAke3RoaXMuY29uZmlnLnVybH0vJHt0aGlzLmNvbmZpZy5wcm9qZWN0fS9maWxlc2AsIGRhdGEsIHtcbiAgICAgICAgaGVhZGVycyxcbiAgICAgICAgb25VcGxvYWRQcm9ncmVzcyxcbiAgICAgIH0pXG4gICAgICAudGhlbigocmVzOiB7IGRhdGE6IGFueSB9KSA9PiB7XG4gICAgICAgIC8vIGRldGFjaCBjb25jdXJyZW5jeSBtYW5hZ2VyXG4gICAgICAgIHRoaXMuYXBpLmNvbmN1cnJlbnQuZGV0YWNoKCk7XG5cbiAgICAgICAgcmV0dXJuIHJlcy5kYXRhO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3I6IElFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgIC8vIGRldGFjaCBjb25jdXJyZW5jeSBtYW5hZ2VyXG4gICAgICAgIHRoaXMuYXBpLmNvbmN1cnJlbnQuZGV0YWNoKCk7XG5cbiAgICAgICAgaWYgKGVycm9yLnJlc3BvbnNlKSB7XG4gICAgICAgICAgdGhyb3cgZXJyb3IucmVzcG9uc2UuZGF0YS5lcnJvcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyB7XG4gICAgICAgICAgICBjb2RlOiAtMSxcbiAgICAgICAgICAgIGVycm9yLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJOZXR3b3JrIEVycm9yXCIsXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uIGZpbGVzXG5cbiAgLy8gI3JlZ2lvbiBpdGVtc1xuXG4gIC8qKlxuICAgKiBVcGRhdGUgYW4gZXhpc3RpbmcgaXRlbVxuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5kaXJlY3R1cy5pby9hcGkvcmVmZXJlbmNlLmh0bWwjdXBkYXRlLWl0ZW1cbiAgICogQHR5cGVwYXJhbSBUVFBhcnRpYWxJdGVtIERlZmluaW5nIHRoZSBpdGVtIHR5cGUgaW4gb2JqZWN0IHNjaGVtYVxuICAgKiBAdHlwZXBhcmFtIFRUUmVzdWx0IEV4dGVuc2lvbiBvZiBbVFBhcnRpYWxJdGVtXSBhcyBleHBlY3RlZCByZXN1bHRcbiAgICovXG4gIHB1YmxpYyB1cGRhdGVJdGVtPFRUUGFydGlhbEl0ZW0gZXh0ZW5kcyBvYmplY3QsIFRUUmVzdWx0IGV4dGVuZHMgb2JqZWN0ID0gVFRQYXJ0aWFsSXRlbT4oXG4gICAgY29sbGVjdGlvbjogc3RyaW5nLFxuICAgIHByaW1hcnlLZXk6IFByaW1hcnlLZXlUeXBlLFxuICAgIGJvZHk6IFRUUGFydGlhbEl0ZW0sXG4gICAgcGFyYW1zOiBRdWVyeVBhcmFtc1R5cGUgPSB7fVxuICApOiBQcm9taXNlPElJdGVtUmVzcG9uc2U8VFRQYXJ0aWFsSXRlbSAmIFRUUmVzdWx0Pj4ge1xuICAgIGludmFyaWFudChpc1N0cmluZyhjb2xsZWN0aW9uKSwgXCJjb2xsZWN0aW9uIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgaW52YXJpYW50KGlzTm90TnVsbChwcmltYXJ5S2V5KSwgXCJwcmltYXJ5S2V5IG11c3QgYmUgZGVmaW5lZFwiKTtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3QoYm9keSksIFwiYm9keSBtdXN0IGJlIGFuIG9iamVjdFwiKTtcblxuICAgIGNvbnN0IGNvbGxlY3Rpb25CYXNlUGF0aCA9IGdldENvbGxlY3Rpb25JdGVtUGF0aChjb2xsZWN0aW9uKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5wYXRjaDxJSXRlbVJlc3BvbnNlPFRUUGFydGlhbEl0ZW0gJiBUVFJlc3VsdD4+KGAke2NvbGxlY3Rpb25CYXNlUGF0aH0vJHtwcmltYXJ5S2V5fWAsIGJvZHksIHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIG11bHRpcGxlIGl0ZW1zXG4gICAqIEBzZWUgaHR0cHM6Ly9kb2NzLmRpcmVjdHVzLmlvL2FwaS9yZWZlcmVuY2UuaHRtbCN1cGRhdGUtaXRlbXNcbiAgICogQHR5cGVwYXJhbSBUUGFydGlhbEl0ZW0gRGVmaW5pbmcgYW4gYXJyYXkgb2YgaXRlbXMsIGVhY2ggaW4gb2JqZWN0IHNjaGVtYVxuICAgKiBAdHlwZXBhcmFtIFRSZXN1bHQgRXh0ZW5zaW9uIG9mIFtUUGFydGlhbEl0ZW1dIGFzIGV4cGVjdGVkIHJlc3VsdFxuICAgKiBAcmV0dXJuIHtQcm9taXNlPElJdGVtc1Jlc3BvbnNlPFRQYXJ0aWFsSXRlbSAmIFRSZXN1bHQ+Pn1cbiAgICovXG4gIHB1YmxpYyB1cGRhdGVJdGVtczxUUGFydGlhbEl0ZW0gZXh0ZW5kcyBvYmplY3RbXSwgVFJlc3VsdCBleHRlbmRzIFRQYXJ0aWFsSXRlbSA9IFRQYXJ0aWFsSXRlbT4oXG4gICAgY29sbGVjdGlvbjogc3RyaW5nLFxuICAgIGJvZHk6IFRQYXJ0aWFsSXRlbSxcbiAgICBwYXJhbXM6IFF1ZXJ5UGFyYW1zVHlwZSA9IHt9XG4gICkge1xuICAgIGludmFyaWFudChpc1N0cmluZyhjb2xsZWN0aW9uKSwgXCJjb2xsZWN0aW9uIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgaW52YXJpYW50KGlzQXJyYXkoYm9keSksIFwiYm9keSBtdXN0IGJlIGFuIGFycmF5XCIpO1xuXG4gICAgY29uc3QgY29sbGVjdGlvbkJhc2VQYXRoID0gZ2V0Q29sbGVjdGlvbkl0ZW1QYXRoKGNvbGxlY3Rpb24pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLnBhdGNoPElJdGVtc1Jlc3BvbnNlPFRQYXJ0aWFsSXRlbSAmIFRSZXN1bHQ+Pihjb2xsZWN0aW9uQmFzZVBhdGgsIGJvZHksIHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGl0ZW1cbiAgICogQHR5cGVwYXJhbSBUSXRlbVR5cGUgRGVmaW5pbmcgYW4gaXRlbSBhbmQgaXRzIGZpZWxkcyBpbiBvYmplY3Qgc2NoZW1hXG4gICAqIEByZXR1cm4ge1Byb21pc2U8SUl0ZW1zUmVzcG9uc2U8VEl0ZW1UeXBlPj59XG4gICAqL1xuICBwdWJsaWMgY3JlYXRlSXRlbTxUSXRlbVR5cGUgZXh0ZW5kcyBvYmplY3Q+KGNvbGxlY3Rpb246IHN0cmluZywgYm9keTogVEl0ZW1UeXBlKTogUHJvbWlzZTxJSXRlbVJlc3BvbnNlPFRJdGVtVHlwZT4+IHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcoY29sbGVjdGlvbiksIFwiY29sbGVjdGlvbiBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIGludmFyaWFudChpc09iamVjdChib2R5KSwgXCJib2R5IG11c3QgYmUgYW4gb2JqZWN0XCIpO1xuXG4gICAgY29uc3QgY29sbGVjdGlvbkJhc2VQYXRoID0gZ2V0Q29sbGVjdGlvbkl0ZW1QYXRoKGNvbGxlY3Rpb24pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLnBvc3Q8SUl0ZW1SZXNwb25zZTxUSXRlbVR5cGU+Pihjb2xsZWN0aW9uQmFzZVBhdGgsIGJvZHkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBtdWx0aXBsZSBpdGVtc1xuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5kaXJlY3R1cy5pby9hcGkvcmVmZXJlbmNlLmh0bWwjY3JlYXRlLWl0ZW1zXG4gICAqIEB0eXBlcGFyYW0gVEl0ZW1zVHlwZSBEZWZpbmluZyBhbiBhcnJheSBvZiBpdGVtcywgZWFjaCBpbiBvYmplY3Qgc2NoZW1hXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlSXRlbXM8VEl0ZW1zVHlwZSBleHRlbmRzIEFycmF5PGFueT4+KFxuICAgIGNvbGxlY3Rpb246IHN0cmluZyxcbiAgICBib2R5OiBCb2R5VHlwZVxuICApOiBQcm9taXNlPElJdGVtc1Jlc3BvbnNlPFRJdGVtc1R5cGU+PiB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGNvbGxlY3Rpb24pLCBcImNvbGxlY3Rpb24gbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICBpbnZhcmlhbnQoaXNBcnJheShib2R5KSwgXCJib2R5IG11c3QgYmUgYW4gYXJyYXlcIik7XG5cbiAgICBjb25zdCBjb2xsZWN0aW9uQmFzZVBhdGggPSBnZXRDb2xsZWN0aW9uSXRlbVBhdGgoY29sbGVjdGlvbik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkucG9zdDxJSXRlbXNSZXNwb25zZTxUSXRlbXNUeXBlPj4oY29sbGVjdGlvbkJhc2VQYXRoLCBib2R5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgaXRlbXMgZnJvbSBhIGdpdmVuIGNvbGxlY3Rpb25cbiAgICogQHNlZSBodHRwczovL2RvY3MuZGlyZWN0dXMuaW8vYXBpL3JlZmVyZW5jZS5odG1sI2dldC1tdWx0aXBsZS1pdGVtc1xuICAgKiBAdHlwZXBhcmFtIFRJdGVtc1R5cGUgRGVmaW5pbmcgYW4gYXJyYXkgb2YgaXRlbXMsIGVhY2ggaW4gb2JqZWN0IHNjaGVtYVxuICAgKi9cbiAgcHVibGljIGdldEl0ZW1zPFRUSXRlbXNUeXBlIGV4dGVuZHMgQXJyYXk8YW55Pj4oXG4gICAgY29sbGVjdGlvbjogc3RyaW5nLFxuICAgIHBhcmFtczogUXVlcnlQYXJhbXNUeXBlID0ge31cbiAgKTogUHJvbWlzZTxJSXRlbXNSZXNwb25zZTxUVEl0ZW1zVHlwZT4+IHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcoY29sbGVjdGlvbiksIFwiY29sbGVjdGlvbiBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIGludmFyaWFudChpc09iamVjdE9yRW1wdHkocGFyYW1zKSwgXCJwYXJhbXMgbXVzdCBiZSBhbiBvYmplY3Qgb3IgZW1wdHlcIik7XG5cbiAgICBjb25zdCBjb2xsZWN0aW9uQmFzZVBhdGggPSBnZXRDb2xsZWN0aW9uSXRlbVBhdGgoY29sbGVjdGlvbik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkuZ2V0PElJdGVtc1Jlc3BvbnNlPFRUSXRlbXNUeXBlPj4oY29sbGVjdGlvbkJhc2VQYXRoLCBwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIHNpbmdsZSBpdGVtIGJ5IHByaW1hcnkga2V5XG4gICAqIEBzZWUgaHR0cHM6Ly9kb2NzLmRpcmVjdHVzLmlvL2FwaS9yZWZlcmVuY2UuaHRtbCNnZXQtaXRlbVxuICAgKiBAdHlwZXBhcmFtIFRJdGVtVHlwZSBEZWZpbmluZyBmaWVsZHMgb2YgYW4gaXRlbSBpbiBvYmplY3Qgc2NoZW1hXG4gICAqL1xuICBwdWJsaWMgZ2V0SXRlbTxUSXRlbVR5cGUgZXh0ZW5kcyBvYmplY3QgPSB7fT4oXG4gICAgY29sbGVjdGlvbjogc3RyaW5nLFxuICAgIHByaW1hcnlLZXk6IFByaW1hcnlLZXlUeXBlLFxuICAgIHBhcmFtczogUXVlcnlQYXJhbXNUeXBlID0ge31cbiAgKTogUHJvbWlzZTxJSXRlbVJlc3BvbnNlPFRJdGVtVHlwZT4+IHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcoY29sbGVjdGlvbiksIFwiY29sbGVjdGlvbiBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIGludmFyaWFudChpc05vdE51bGwocHJpbWFyeUtleSksIFwicHJpbWFyeUtleSBtdXN0IGJlIGRlZmluZWRcIik7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0T3JFbXB0eShwYXJhbXMpLCBcInBhcmFtcyBtdXN0IGJlIGFuIG9iamVjdCBvciBlbXB0eVwiKTtcblxuICAgIGNvbnN0IGNvbGxlY3Rpb25CYXNlUGF0aCA9IGdldENvbGxlY3Rpb25JdGVtUGF0aChjb2xsZWN0aW9uKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5nZXQ8SUl0ZW1SZXNwb25zZTxUSXRlbVR5cGU+PihgJHtjb2xsZWN0aW9uQmFzZVBhdGh9LyR7cHJpbWFyeUtleX1gLCBwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhIHNpbmdsZSBpdGVtIGJ5IHByaW1hcnkga2V5XG4gICAqIEBzZWUgaHR0cHM6Ly9kb2NzLmRpcmVjdHVzLmlvL2FwaS9yZWZlcmVuY2UuaHRtbCNkZWxldGUtaXRlbXNcbiAgICovXG4gIHB1YmxpYyBkZWxldGVJdGVtKGNvbGxlY3Rpb246IHN0cmluZywgcHJpbWFyeUtleTogUHJpbWFyeUtleVR5cGUpIHtcbiAgICBpbnZhcmlhbnQoaXNTdHJpbmcoY29sbGVjdGlvbiksIFwiY29sbGVjdGlvbiBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIGludmFyaWFudChpc05vdE51bGwocHJpbWFyeUtleSksIFwicHJpbWFyeUtleSBtdXN0IGJlIGRlZmluZWRcIik7XG5cbiAgICBjb25zdCBjb2xsZWN0aW9uQmFzZVBhdGggPSBnZXRDb2xsZWN0aW9uSXRlbVBhdGgoY29sbGVjdGlvbik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkuZGVsZXRlPHZvaWQ+KGAke2NvbGxlY3Rpb25CYXNlUGF0aH0vJHtwcmltYXJ5S2V5fWApO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBtdWx0aXBsZSBpdGVtcyBieSBwcmltYXJ5IGtleVxuICAgKiBAc2VlIGh0dHBzOi8vZG9jcy5kaXJlY3R1cy5pby9hcGkvcmVmZXJlbmNlLmh0bWwjZGVsZXRlLWl0ZW1zXG4gICAqL1xuICBwdWJsaWMgZGVsZXRlSXRlbXMoY29sbGVjdGlvbjogc3RyaW5nLCBwcmltYXJ5S2V5czogUHJpbWFyeUtleVR5cGVbXSkge1xuICAgIGludmFyaWFudChpc1N0cmluZyhjb2xsZWN0aW9uKSwgXCJjb2xsZWN0aW9uIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgaW52YXJpYW50KGlzQXJyYXkocHJpbWFyeUtleXMpLCBcInByaW1hcnlLZXlzIG11c3QgYmUgYW4gYXJyYXlcIik7XG5cbiAgICBjb25zdCBjb2xsZWN0aW9uQmFzZVBhdGggPSBnZXRDb2xsZWN0aW9uSXRlbVBhdGgoY29sbGVjdGlvbik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkuZGVsZXRlPHZvaWQ+KGAke2NvbGxlY3Rpb25CYXNlUGF0aH0vJHtwcmltYXJ5S2V5cy5qb2luKCl9YCk7XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uIGl0ZW1zXG5cbiAgLy8gI3JlZ2lvbiBsaXN0aW5nIHByZWZlcmVuY2VzXG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY29sbGVjdGlvbiBwcmVzZXRzIG9mIHRoZSBjdXJyZW50IHVzZXIgZm9yIGEgc2luZ2xlIGNvbGxlY3Rpb25cbiAgICovXG4gIHB1YmxpYyBnZXRNeUxpc3RpbmdQcmVmZXJlbmNlczxUUmVzcG9uc2UgZXh0ZW5kcyBhbnlbXSA9IGFueVtdPihcbiAgICBjb2xsZWN0aW9uOiBzdHJpbmcsXG4gICAgcGFyYW1zOiBRdWVyeVBhcmFtc1R5cGUgPSB7fVxuICApOiBQcm9taXNlPFRSZXNwb25zZT4ge1xuICAgIGludmFyaWFudChpc1N0cmluZyh0aGlzLmNvbmZpZy50b2tlbiksIFwidG9rZW4gbXVzdCBiZSBkZWZpbmVkXCIpO1xuICAgIGludmFyaWFudChpc09iamVjdE9yRW1wdHkocGFyYW1zKSwgXCJwYXJhbXMgbXVzdCBiZSBhbiBvYmplY3Qgb3IgZW1wdHlcIik7XG5cbiAgICBjb25zdCBwYXlsb2FkID0gdGhpcy5hcGkuZ2V0UGF5bG9hZDx7IHJvbGU6IHN0cmluZzsgaWQ6IHN0cmluZyB9PigpO1xuXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgIHRoaXMuYXBpLmdldDxJRmllbGRSZXNwb25zZTxhbnk+PihcIi9jb2xsZWN0aW9uX3ByZXNldHNcIiwge1xuICAgICAgICBcImZpbHRlcltjb2xsZWN0aW9uXVtlcV1cIjogY29sbGVjdGlvbixcbiAgICAgICAgXCJmaWx0ZXJbcm9sZV1bbnVsbF1cIjogMSxcbiAgICAgICAgXCJmaWx0ZXJbdGl0bGVdW251bGxdXCI6IDEsXG4gICAgICAgIFwiZmlsdGVyW3VzZXJdW251bGxdXCI6IDEsXG4gICAgICAgIGxpbWl0OiAxLFxuICAgICAgICBzb3J0OiBcIi1pZFwiLFxuICAgICAgfSksXG4gICAgICB0aGlzLmFwaS5nZXQ8SUZpZWxkUmVzcG9uc2U8YW55Pj4oXCIvY29sbGVjdGlvbl9wcmVzZXRzXCIsIHtcbiAgICAgICAgXCJmaWx0ZXJbY29sbGVjdGlvbl1bZXFdXCI6IGNvbGxlY3Rpb24sXG4gICAgICAgIFwiZmlsdGVyW3JvbGVdW2VxXVwiOiBwYXlsb2FkLnJvbGUsXG4gICAgICAgIFwiZmlsdGVyW3RpdGxlXVtudWxsXVwiOiAxLFxuICAgICAgICBcImZpbHRlclt1c2VyXVtudWxsXVwiOiAxLFxuICAgICAgICBsaW1pdDogMSxcbiAgICAgICAgc29ydDogXCItaWRcIixcbiAgICAgIH0pLFxuICAgICAgdGhpcy5hcGkuZ2V0PElGaWVsZFJlc3BvbnNlPGFueT4+KFwiL2NvbGxlY3Rpb25fcHJlc2V0c1wiLCB7XG4gICAgICAgIFwiZmlsdGVyW2NvbGxlY3Rpb25dW2VxXVwiOiBjb2xsZWN0aW9uLFxuICAgICAgICBcImZpbHRlcltyb2xlXVtlcV1cIjogcGF5bG9hZC5yb2xlLFxuICAgICAgICBcImZpbHRlclt0aXRsZV1bbnVsbF1cIjogMSxcbiAgICAgICAgXCJmaWx0ZXJbdXNlcl1bZXFdXCI6IHBheWxvYWQuaWQsXG4gICAgICAgIGxpbWl0OiAxLFxuICAgICAgICBzb3J0OiBcIi1pZFwiLFxuICAgICAgfSksXG4gICAgXSkudGhlbigodmFsdWVzOiBBcnJheTxJRmllbGRSZXNwb25zZTxhbnk+PikgPT4ge1xuICAgICAgY29uc3QgW2NvbCwgcm9sZSwgdXNlcl0gPSB2YWx1ZXM7XG5cbiAgICAgIGlmICh1c2VyLmRhdGEgJiYgdXNlci5kYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIHVzZXIuZGF0YVswXSBhcyBUUmVzcG9uc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChyb2xlLmRhdGEgJiYgcm9sZS5kYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIHJvbGUuZGF0YVswXSBhcyBUUmVzcG9uc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb2wuZGF0YSAmJiBjb2wuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiBjb2wuZGF0YVswXSBhcyBUUmVzcG9uc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7fSBhcyBUUmVzcG9uc2U7XG4gICAgfSk7XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uIGxpc3RpbmcgcHJlZmVyZW5jZXNcblxuICAvLyAjcmVnaW9uIHBlcm1pc3Npb25zXG5cbiAgLyoqXG4gICAqIEdldCBwZXJtaXNzaW9uc1xuICAgKiBAcGFyYW0ge1F1ZXJ5UGFyYW1zVHlwZT99IHBhcmFtc1xuICAgKiBAcmV0dXJuIHtQcm9taXNlPElQZXJtaXNzaW9uPn1cbiAgICovXG4gIHB1YmxpYyBnZXRQZXJtaXNzaW9ucyhwYXJhbXM6IFF1ZXJ5UGFyYW1zVHlwZSA9IHt9KTogUHJvbWlzZTxJSXRlbXNSZXNwb25zZTxJUGVybWlzc2lvbltdPj4ge1xuICAgIGludmFyaWFudChpc09iamVjdE9yRW1wdHkocGFyYW1zKSwgXCJwYXJhbXMgbXVzdCBiZSBhbiBvYmplY3Qgb3IgZW1wdHlcIik7XG5cbiAgICByZXR1cm4gdGhpcy5nZXRJdGVtczxJUGVybWlzc2lvbltdPihcImRpcmVjdHVzX3Blcm1pc3Npb25zXCIsIHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogVE9ETzogRml4IHR5cGUtZGVmIGZvciByZXR1cm5cbiAgICogR2V0IHRoZSBjdXJyZW50bHkgbG9nZ2VkIGluIHVzZXIncyBwZXJtaXNzaW9uc1xuICAgKiBAdHlwZXBhcmFtIFRSZXNwb25zZSBQZXJtaXNzaW9ucyB0eXBlIGFzIGFycmF5IGV4dGVuZGluZyBhbnlbXVxuICAgKi9cbiAgcHVibGljIGdldE15UGVybWlzc2lvbnM8VFJlc3BvbnNlIGV4dGVuZHMgYW55W10gPSBhbnlbXT4ocGFyYW1zOiBRdWVyeVBhcmFtc1R5cGUgPSB7fSk6IFByb21pc2U8VFJlc3BvbnNlPiB7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0T3JFbXB0eShwYXJhbXMpLCBcInBhcmFtcyBtdXN0IGJlIGFuIG9iamVjdCBvciBlbXB0eVwiKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5nZXQoXCIvcGVybWlzc2lvbnMvbWVcIiwgcGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUT0RPOiBGaXggdHlwZS1kZWYgZm9yIHBhcmFtIGFuZCByZXR1cm5cbiAgICogQ3JlYXRlIG11bHRpcGxlIG5ldyBwZXJtaXNzaW9uc1xuICAgKiBAdHlwZXBhcmFtIFRSZXNwb25zZSBQZXJtaXNzaW9ucyB0eXBlIGFzIGFycmF5IGV4dGVuZGluZyBhbnlbXVxuICAgKi9cbiAgcHVibGljIGNyZWF0ZVBlcm1pc3Npb25zPFRSZXNwb25zZSBleHRlbmRzIGFueVtdID0gYW55W10+KGRhdGE6IGFueVtdKTogUHJvbWlzZTxUUmVzcG9uc2U+IHtcbiAgICBpbnZhcmlhbnQoaXNBcnJheShkYXRhKSwgXCJkYXRhIG11c3QgYmUgYW5hcnJ5XCIpO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLnBvc3QoXCIvcGVybWlzc2lvbnNcIiwgZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogVE9ETzogRml4IHR5cGUtZGVmIGZvciBwYXJhbSBhbmQgcmV0dXJuXG4gICAqIFVwZGF0ZSBtdWx0aXBsZSBwZXJtaXNzaW9uIHJlY29yZHNcbiAgICogQHR5cGVwYXJhbSBUUmVzcG9uc2UgUGVybWlzc2lvbnMgdHlwZSBhcyBhcnJheSBleHRlbmRpbmcgYW55W11cbiAgICovXG4gIHB1YmxpYyB1cGRhdGVQZXJtaXNzaW9uczxUUmVzcG9uc2UgZXh0ZW5kcyBhbnlbXSA9IGFueVtdPihkYXRhOiBhbnlbXSk6IFByb21pc2U8VFJlc3BvbnNlPiB7XG4gICAgaW52YXJpYW50KGlzQXJyYXkoZGF0YSksIFwiZGF0YSBtdXN0IGJlIGFuYXJyeVwiKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5wYXRjaDxUUmVzcG9uc2U+KFwiL3Blcm1pc3Npb25zXCIsIGRhdGEpO1xuICB9XG5cbiAgLy8gI2VuZHJlZ2lvbiBwZXJtaXNzaW9uc1xuXG4gIC8vICNyZWdpb24gcmVsYXRpb25zXG5cbiAgLyoqXG4gICAqIEdldCBhbGwgcmVsYXRpb25zaGlwc1xuICAgKiBAcGFyYW0ge1F1ZXJ5UGFyYW1zVHlwZT99IHBhcmFtc1xuICAgKiBAcmV0dXJuIHtQcm9taXNlPElSZWxhdGlvbnNSZXNwb25zZT59XG4gICAqL1xuICBwdWJsaWMgZ2V0UmVsYXRpb25zKHBhcmFtczogUXVlcnlQYXJhbXNUeXBlID0ge30pIHtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3RPckVtcHR5KHBhcmFtcyksIFwicGFyYW1zIG11c3QgYmUgYW4gb2JqZWN0IG9yIGVtcHR5XCIpO1xuICAgIHJldHVybiB0aGlzLmFwaS5nZXQ8SVJlbGF0aW9uc1Jlc3BvbnNlPihcIi9yZWxhdGlvbnNcIiwgcGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIG5ldyByZWxhdGlvblxuICAgKiBAcGFyYW0ge0lSZWxhdGlvbn0gZGF0YVxuICAgKiBAcmV0dXJuIHtQcm9taXNlPElSZWxhdGlvblJlc3BvbnNlPn1cbiAgICovXG4gIHB1YmxpYyBjcmVhdGVSZWxhdGlvbihkYXRhOiBJUmVsYXRpb24pIHtcbiAgICByZXR1cm4gdGhpcy5hcGkucG9zdDxJUmVsYXRpb25SZXNwb25zZT4oXCIvcmVsYXRpb25zXCIsIGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgZXhpc3RpbmcgcmVsYXRpb25cbiAgICovXG4gIHB1YmxpYyB1cGRhdGVSZWxhdGlvbihwcmltYXJ5S2V5OiBQcmltYXJ5S2V5VHlwZSwgZGF0YTogUGFydGlhbDxJUmVsYXRpb24+KSB7XG4gICAgcmV0dXJuIHRoaXMuYXBpLnBhdGNoPElSZWxhdGlvblJlc3BvbnNlPihgL3JlbGF0aW9ucy8ke3ByaW1hcnlLZXl9YCwgZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogVE9ETzogQWRkIHR5cGUtZGVmIGZvciByZXR1cm4gdmFsdWUocylcbiAgICogR2V0IHRoZSByZWxhdGlvbnNoaXAgaW5mb3JtYXRpb24gZm9yIHRoZSBnaXZlbiBjb2xsZWN0aW9uXG4gICAqL1xuICBwdWJsaWMgZ2V0Q29sbGVjdGlvblJlbGF0aW9ucyhjb2xsZWN0aW9uOiBzdHJpbmcsIHBhcmFtczogUXVlcnlQYXJhbXNUeXBlID0ge30pOiBQcm9taXNlPGFueVtdPiB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGNvbGxlY3Rpb24pLCBcImNvbGxlY3Rpb24gbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3RPckVtcHR5KHBhcmFtcyksIFwicGFyYW1zIG11c3QgYmUgYW4gb2JqZWN0IG9yIGVtcHR5XCIpO1xuXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgIHRoaXMuYXBpLmdldDxhbnk+KFwiL3JlbGF0aW9uc1wiLCB7XG4gICAgICAgIFwiZmlsdGVyW2NvbGxlY3Rpb25fYV1bZXFdXCI6IGNvbGxlY3Rpb24sXG4gICAgICB9KSxcbiAgICAgIHRoaXMuYXBpLmdldDxhbnk+KFwiL3JlbGF0aW9uc1wiLCB7XG4gICAgICAgIFwiZmlsdGVyW2NvbGxlY3Rpb25fYl1bZXFdXCI6IGNvbGxlY3Rpb24sXG4gICAgICB9KSxcbiAgICBdKTtcbiAgfVxuXG4gIC8vICNlbmRyZWdpb24gcmVsYXRpb25zXG5cbiAgLy8gI3JlZ2lvbiByZXZpc2lvbnNcblxuICAvKipcbiAgICogR2V0IGEgc2luZ2xlIGl0ZW0ncyByZXZpc2lvbnMgYnkgcHJpbWFyeSBrZXlcbiAgICogQHR5cGVwYXJhbSBEYXRhQW5kRGVsdGEgIFRoZSBkYXRhIGluY2x1ZGluZyBkZWx0YSB0eXBlIGZvciB0aGUgcmV2aXNpb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNvbGxlY3Rpb25cbiAgICogQHBhcmFtIHtQcmltYXJ5S2V5VHlwZX0gcHJpbWFyeUtleVxuICAgKiBAcGFyYW0ge1F1ZXJ5UGFyYW1zVHlwZT99IHBhcmFtc1xuICAgKi9cbiAgcHVibGljIGdldEl0ZW1SZXZpc2lvbnM8VERhdGFBbmREZWx0YSBleHRlbmRzIG9iamVjdCA9IHt9PihcbiAgICBjb2xsZWN0aW9uOiBzdHJpbmcsXG4gICAgcHJpbWFyeUtleTogUHJpbWFyeUtleVR5cGUsXG4gICAgcGFyYW1zOiBRdWVyeVBhcmFtc1R5cGUgPSB7fVxuICApOiBQcm9taXNlPElSZXZpc2lvblJlc3BvbnNlPFREYXRhQW5kRGVsdGE+PiB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGNvbGxlY3Rpb24pLCBcImNvbGxlY3Rpb24gbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICBpbnZhcmlhbnQoaXNOb3ROdWxsKHByaW1hcnlLZXkpLCBcInByaW1hcnlLZXkgbXVzdCBiZSBkZWZpbmVkXCIpO1xuICAgIGludmFyaWFudChpc09iamVjdE9yRW1wdHkocGFyYW1zKSwgXCJwYXJhbXMgbXVzdCBiZSBhbiBvYmplY3Qgb3IgZW1wdHlcIik7XG5cbiAgICBjb25zdCBjb2xsZWN0aW9uQmFzZVBhdGggPSBnZXRDb2xsZWN0aW9uSXRlbVBhdGgoY29sbGVjdGlvbik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkuZ2V0PElSZXZpc2lvblJlc3BvbnNlPFREYXRhQW5kRGVsdGE+PihgJHtjb2xsZWN0aW9uQmFzZVBhdGh9LyR7cHJpbWFyeUtleX0vcmV2aXNpb25zYCwgcGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXZlcnQgYW4gaXRlbSB0byBhIHByZXZpb3VzIHN0YXRlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb2xsZWN0aW9uXG4gICAqIEBwYXJhbSB7UHJpbWFyeUtleVR5cGV9IHByaW1hcnlLZXlcbiAgICogQHBhcmFtIHtudW1iZXJ9IHJldmlzaW9uSURcbiAgICovXG4gIHB1YmxpYyByZXZlcnQoY29sbGVjdGlvbjogc3RyaW5nLCBwcmltYXJ5S2V5OiBQcmltYXJ5S2V5VHlwZSwgcmV2aXNpb25JRDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaW52YXJpYW50KGlzU3RyaW5nKGNvbGxlY3Rpb24pLCBcImNvbGxlY3Rpb24gbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICBpbnZhcmlhbnQoaXNOb3ROdWxsKHByaW1hcnlLZXkpLCBcInByaW1hcnlLZXkgbXVzdCBiZSBkZWZpbmVkXCIpO1xuICAgIGludmFyaWFudChpc051bWJlcihyZXZpc2lvbklEKSwgXCJyZXZpc2lvbklEIG11c3QgYmUgYSBudW1iZXJcIik7XG5cbiAgICBjb25zdCBjb2xsZWN0aW9uQmFzZVBhdGggPSBnZXRDb2xsZWN0aW9uSXRlbVBhdGgoY29sbGVjdGlvbik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkucGF0Y2goYCR7Y29sbGVjdGlvbkJhc2VQYXRofS8ke3ByaW1hcnlLZXl9L3JldmVydC8ke3JldmlzaW9uSUR9YCk7XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uIHJldmlzaW9uc1xuXG4gIC8vICNyZWdpb24gcm9sZXNcblxuICAvKipcbiAgICogR2V0IGEgc2luZ2xlIHVzZXIgcm9sZVxuICAgKiBAcGFyYW0ge1ByaW1hcnlLZXlUeXBlfcKgcHJpbWFyeUtleVxuICAgKiBAcGFyYW0ge1F1ZXJ5UGFyYW1zVHlwZT99IHBhcmFtc1xuICAgKi9cbiAgcHVibGljIGdldFJvbGUocHJpbWFyeUtleTogUHJpbWFyeUtleVR5cGUsIHBhcmFtczogUXVlcnlQYXJhbXNUeXBlID0ge30pOiBQcm9taXNlPElSb2xlUmVzcG9uc2U+IHtcbiAgICBpbnZhcmlhbnQoaXNOdW1iZXIocHJpbWFyeUtleSksIFwicHJpbWFyeUtleSBtdXN0IGJlIGEgbnVtYmVyXCIpO1xuICAgIGludmFyaWFudChpc09iamVjdE9yRW1wdHkocGFyYW1zKSwgXCJwYXJhbXMgbXVzdCBiZSBhbiBvYmplY3Qgb3IgZW1wdHlcIik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkuZ2V0PElSb2xlUmVzcG9uc2U+KGAvcm9sZXMvJHtwcmltYXJ5S2V5fWAsIHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB1c2VyIHJvbGVzXG4gICAqIEBwYXJhbSB7UXVlcnlQYXJhbXNUeXBlP30gcGFyYW1zXG4gICAqL1xuICBwdWJsaWMgZ2V0Um9sZXMocGFyYW1zOiBRdWVyeVBhcmFtc1R5cGUgPSB7fSk6IFByb21pc2U8SVJvbGVSZXNwb25zZVtdPiB7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0T3JFbXB0eShwYXJhbXMpLCBcInBhcmFtcyBtdXN0IGJlIGFuIG9iamVjdCBvciBlbXB0eVwiKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5nZXQ8SVJvbGVSZXNwb25zZVtdPihcIi9yb2xlc1wiLCBwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBhIHVzZXIgcm9sZVxuICAgKiBAcGFyYW0ge1ByaW1hcnlLZXlUeXBlfcKgcHJpbWFyeUtleVxuICAgKiBAcGFyYW0ge1JvbGV9IGJvZHlcbiAgICovXG4gIHB1YmxpYyB1cGRhdGVSb2xlPFJvbGUgZXh0ZW5kcyBQYXJ0aWFsPElSb2xlPj4ocHJpbWFyeUtleTogUHJpbWFyeUtleVR5cGUsIGJvZHk6IFJvbGUpIHtcbiAgICBpbnZhcmlhbnQoaXNOb3ROdWxsKHByaW1hcnlLZXkpLCBcInByaW1hcnlLZXkgbXVzdCBiZSBkZWZpbmVkXCIpO1xuICAgIGludmFyaWFudChpc09iamVjdChib2R5KSwgXCJib2R5IG11c3QgYmUgYW4gb2JqZWN0XCIpO1xuXG4gICAgcmV0dXJuIHRoaXMudXBkYXRlSXRlbTxSb2xlLCBJUm9sZT4oXCJkaXJlY3R1c19yb2xlc1wiLCBwcmltYXJ5S2V5LCBib2R5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgdXNlciByb2xlXG4gICAqIEBwYXJhbSB7Um9sZX0gYm9keVxuICAgKi9cbiAgcHVibGljIGNyZWF0ZVJvbGU8VFJvbGUgZXh0ZW5kcyBJUm9sZT4oYm9keTogVFJvbGUpIHtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3QoYm9keSksIFwiYm9keSBtdXN0IGJlIGFuIG9iamVjdFwiKTtcblxuICAgIHJldHVybiB0aGlzLmNyZWF0ZUl0ZW0oXCJkaXJlY3R1c19yb2xlc1wiLCBib2R5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgYSB1c2VyIHJvbCBieSBwcmltYXJ5IGtleVxuICAgKiBAcGFyYW0ge1ByaW1hcnlLZXlUeXBlfcKgcHJpbWFyeUtleVxuICAgKi9cbiAgcHVibGljIGRlbGV0ZVJvbGUocHJpbWFyeUtleTogUHJpbWFyeUtleVR5cGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpbnZhcmlhbnQoaXNOb3ROdWxsKHByaW1hcnlLZXkpLCBcInByaW1hcnlLZXkgbXVzdCBiZSBkZWZpbmVkXCIpO1xuXG4gICAgcmV0dXJuIHRoaXMuZGVsZXRlSXRlbShcImRpcmVjdHVzX3JvbGVzXCIsIHByaW1hcnlLZXkpO1xuICB9XG5cbiAgLy8gI2VuZHJlZ2lvbiByb2xlc1xuXG4gIC8vICNyZWdpb24gc2V0dGluZ3NcblxuICAvKipcbiAgICogR2V0IERpcmVjdHVzJyBnbG9iYWwgc2V0dGluZ3NcbiAgICogQHBhcmFtIHtRdWVyeVBhcmFtc1R5cGU/fSBwYXJhbXNcbiAgICovXG4gIHB1YmxpYyBnZXRTZXR0aW5ncyhwYXJhbXM6IFF1ZXJ5UGFyYW1zVHlwZSA9IHt9KSB7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0T3JFbXB0eShwYXJhbXMpLCBcInBhcmFtcyBtdXN0IGJlIGFuIG9iamVjdCBvciBlbXB0eVwiKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5nZXQ8SVNldHRpbmdzUmVzcG9uc2U+KFwiL3NldHRpbmdzXCIsIHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBcImZpZWxkc1wiIGZvciBkaXJlY3R1c19zZXR0aW5nc1xuICAgKiBAcGFyYW0ge1F1ZXJ5UGFyYW1zVHlwZT99IHBhcmFtc1xuICAgKi9cbiAgcHVibGljIGdldFNldHRpbmdzRmllbGRzKHBhcmFtczogUXVlcnlQYXJhbXNUeXBlID0ge30pIHtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3RPckVtcHR5KHBhcmFtcyksIFwicGFyYW1zIG11c3QgYmUgYW4gb2JqZWN0IG9yIGVtcHR5XCIpO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLmdldDxJRmllbGRzUmVzcG9uc2U+KFwiL3NldHRpbmdzL2ZpZWxkc1wiLCBwYXJhbXMpO1xuICB9XG5cbiAgLy8gI2VuZHJlZ2lvbiBzZXR0aW5nc1xuXG4gIC8vICNyZWdpb24gdXNlcnNcblxuICAvKipcbiAgICogR2V0IGEgbGlzdCBvZiBhdmFpbGFibGUgdXNlcnMgaW4gRGlyZWN0dXNcbiAgICogQHBhcmFtIHtRdWVyeVBhcmFtc1R5cGU/fSBwYXJhbXNcbiAgICovXG4gIHB1YmxpYyBnZXRVc2VycyhwYXJhbXM6IFF1ZXJ5UGFyYW1zVHlwZSA9IHt9KSB7XG4gICAgaW52YXJpYW50KGlzT2JqZWN0T3JFbXB0eShwYXJhbXMpLCBcInBhcmFtcyBtdXN0IGJlIGFuIG9iamVjdCBvciBlbXB0eVwiKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5nZXQ8SVVzZXJzUmVzcG9uc2U+KFwiL3VzZXJzXCIsIHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgc2luZ2xlIERpcmVjdHVzIHVzZXJcbiAgICogQHBhcmFtIHtQcmltYXJ5S2V5VHlwZX0gcHJpbWFyeUtleVxuICAgKiBAcGFyYW0ge1F1ZXJ5UGFyYW1zVHlwZT99IHBhcmFtc1xuICAgKi9cbiAgcHVibGljIGdldFVzZXI8VXNlciBleHRlbmRzIElVc2VyID0gSVVzZXI+KHByaW1hcnlLZXk6IFByaW1hcnlLZXlUeXBlLCBwYXJhbXM6IFF1ZXJ5UGFyYW1zVHlwZSA9IHt9KSB7XG4gICAgaW52YXJpYW50KGlzTm90TnVsbChwcmltYXJ5S2V5KSwgXCJwcmltYXJ5S2V5IG11c3QgYmUgZGVmaW5lZFwiKTtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3RPckVtcHR5KHBhcmFtcyksIFwicGFyYW1zIG11c3QgYmUgYW4gb2JqZWN0IG9yIGVtcHR5XCIpO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpLmdldDxJVXNlclJlc3BvbnNlPFVzZXI+PihgL3VzZXJzLyR7cHJpbWFyeUtleX1gLCBwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgdXNlciBpbmZvIG9mIHRoZSBjdXJyZW50bHkgbG9nZ2VkIGluIHVzZXJcbiAgICogQHBhcmFtIHtRdWVyeVBhcmFtc1R5cGU/fSBwYXJhbXNcbiAgICovXG4gIHB1YmxpYyBnZXRNZTxVc2VyIGV4dGVuZHMgSVVzZXIgPSBJVXNlcj4ocGFyYW1zOiBRdWVyeVBhcmFtc1R5cGUgPSB7fSkge1xuICAgIGludmFyaWFudChpc09iamVjdE9yRW1wdHkocGFyYW1zKSwgXCJwYXJhbXMgbXVzdCBiZSBhbiBvYmplY3Qgb3IgZW1wdHlcIik7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkuZ2V0PElVc2VyUmVzcG9uc2U8VXNlcj4+KFwiL3VzZXJzL21lXCIsIHBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGEgc2luZ2xlIHVzZXIgYmFzZWQgb24gcHJpbWFyeUtleVxuICAgKiBAcGFyYW0ge1ByaW1hcnlLZXlUeXBlfSBwcmltYXJ5S2V5XG4gICAqIEBwYXJhbSB7UXVlcnlQYXJhbXNUeXBlP30gcGFyYW1zXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlVXNlcjxVc2VyIGV4dGVuZHMgUGFydGlhbDxJVXNlcj4+KHByaW1hcnlLZXk6IFByaW1hcnlLZXlUeXBlLCBib2R5OiBVc2VyKSB7XG4gICAgaW52YXJpYW50KGlzTm90TnVsbChwcmltYXJ5S2V5KSwgXCJwcmltYXJ5S2V5IG11c3QgYmUgZGVmaW5lZFwiKTtcbiAgICBpbnZhcmlhbnQoaXNPYmplY3QoYm9keSksIFwiYm9keSBtdXN0IGJlIGFuIG9iamVjdFwiKTtcblxuICAgIHJldHVybiB0aGlzLnVwZGF0ZUl0ZW08VXNlciwgSVVzZXI+KFwiZGlyZWN0dXNfdXNlcnNcIiwgcHJpbWFyeUtleSwgYm9keSk7XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uIHVzZXJzXG5cbiAgLy8gI3JlZ2lvbiBzZXJ2ZXIgYWRtaW5cblxuICAvKipcbiAgICogVGhpcyB3aWxsIHVwZGF0ZSB0aGUgZGF0YWJhc2Ugb2YgdGhlIEFQSSBpbnN0YW5jZSB0byB0aGUgbGF0ZXN0IHZlcnNpb25cbiAgICogdXNpbmcgdGhlIG1pZ3JhdGlvbnMgaW4gdGhlIEFQSVxuICAgKiBAcmV0dXJuIHtQcm9taXNlPHZvaWQ+fVxuICAgKi9cbiAgcHVibGljIHVwZGF0ZURhdGFiYXNlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLmFwaS5wb3N0KFwiL3VwZGF0ZVwiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQaW5nIHRoZSBBUEkgdG8gY2hlY2sgaWYgaXQgZXhpc3RzIC8gaXMgdXAgYW5kIHJ1bm5pbmcsIHJldHVybnMgXCJwb25nXCJcbiAgICogQHJldHVybiB7UHJvbWlzZTxzdHJpbmc+fVxuICAgKi9cbiAgcHVibGljIHBpbmcoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5hcGkucmVxdWVzdChcImdldFwiLCBcIi9zZXJ2ZXIvcGluZ1wiLCB7fSwge30sIHRydWUsIHt9LCB0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHNlcnZlciBpbmZvIGZyb20gdGhlIEFQSVxuICAgKiBAcmV0dXJuIHtQcm9taXNlPElTZXJ2ZXJJbmZvcm1hdGlvblJlc3BvbnNlPn1cbiAgICovXG4gIHB1YmxpYyBzZXJ2ZXJJbmZvKCk6IFByb21pc2U8SVNlcnZlckluZm9ybWF0aW9uUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5hcGkucmVxdWVzdChcImdldFwiLCBcIi9cIiwge30sIHt9LCB0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUT0RPOiBBZGQgcmVzcG9uc2UgdHlwZS1kZWZcbiAgICogR2V0IHRoZSBzZXJ2ZXIgaW5mbyBmcm9tIHRoZSBwcm9qZWN0XG4gICAqIEByZXR1cm4ge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIHB1YmxpYyBwcm9qZWN0SW5mbygpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmFwaS5yZXF1ZXN0KFwiZ2V0XCIsIFwiL1wiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUT0RPOiBBZGQgcmVzcG9uc2UgdHlwZS1kZWZcbiAgICogR2V0IGFsbCB0aGUgc2V0dXAgdGhpcmQgcGFydHkgYXV0aCBwcm92aWRlcnNcbiAgICogQHJldHVybiB7UHJvbWlzZTxhbnk+fVxuICAgKi9cbiAgcHVibGljIGdldFRoaXJkUGFydHlBdXRoUHJvdmlkZXJzKCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuYXBpLmdldChcIi9hdXRoL3Nzb1wiKTtcbiAgfVxuXG4gIC8vICNlbmRyZWdpb24gc2VydmVyIGFkbWluXG59XG4iLCIvKipcbiAqIEBtb2R1bGUgZXhwb3J0c1xuICovXG5cbmltcG9ydCB7IENvbmZpZ3VyYXRpb24gfSBmcm9tIFwiLi9Db25maWd1cmF0aW9uXCI7XG5pbXBvcnQgeyBTREsgfSBmcm9tIFwiLi9TREtcIjtcbmltcG9ydCB7IGNvbmN1cnJlbmN5TWFuYWdlciB9IGZyb20gXCIuL0NvbmN1cnJlbmN5TWFuYWdlclwiO1xuaW1wb3J0IHsgZ2V0Q29sbGVjdGlvbkl0ZW1QYXRoIH0gZnJvbSBcIi4vdXRpbHMvY29sbGVjdGlvblwiO1xuaW1wb3J0IHsgZ2V0UGF5bG9hZCB9IGZyb20gXCIuL3V0aWxzL3BheWxvYWRcIjtcblxuZXhwb3J0IHtcbiAgLy8gZXhwb3J0IGNvbmZpZyBmb3IgcmUtc2V0dGluZyBkZWZhdWx0cyBhY3Jvc3MgYWxsIFNESyBpbnN0YW5jZXNcbiAgQ29uZmlndXJhdGlvbixcbiAgLy8gbmFtZWQgZXhwb3J0cyBpcyBwcmVmZXJyZWQsIGtlZXAgZGVmYXVsdCBmb3IgdHJhbnNpdGlvbiBwaGFzZVxuICBTREssXG4gIC8vIGNvbmN1cnJlbmN5IHV0aWxpdHkgZm9yIGF4aW9zXG4gIGNvbmN1cnJlbmN5TWFuYWdlcixcbiAgLy8gaGVscGVyIGZ1bmN0aW9ucyB3aGljaCBjYW4gYmUgdXNlZCBzdGFuZGFsb25lXG4gIGdldENvbGxlY3Rpb25JdGVtUGF0aCxcbiAgZ2V0UGF5bG9hZFxuXG59O1xuXG4vKipcbiAqIEBkZXByZWNhdGVkIHBsZWFzZSB1c2UgbmFtZWQgaW1wb3J0cyBpbnN0ZWFkIG9mIGRlZmF1bHRzXG4gKiBAcHJlZmVycmVkIHtAbGluayBleHBvcnRzLlNES31cbiAqL1xuZXhwb3J0IGRlZmF1bHQgU0RLO1xuIiwiLyoqXG4gKiBAbW9kdWxlIHV0aWxzXG4gKi9cblxuZXhwb3J0IGNvbnN0IERJUkVDVFVTX0NPTExFQ1RJT05fUFJFRklYID0gXCJkaXJlY3R1c19cIjtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBjb3JyZWN0IEFQSSBwYXRoIGZvciB0aGUgY29sbGVjdGlvbi4gSXQgd2lsbFxuICogc3RyaXAgdGhlIHByZWZpeCB7QGxpbmsgRElSRUNUVVNfQ09MTEVDVElPTl9QUkVGSVggfCBjb2xsZWN0aW9uLXByZWZpeH0gb3Igd2lsbCBhZGQgdGhlXG4gKiAnL2l0ZW1zLycgcGF0aCBhcyBwcmVmaXggaWYgbm90IHByb3ZpZGVkLiBUaGUgJ3N1YnN0cig5KScgZGVmaW5lc1xuICogdGhlIGxlbmd0aCBvZiB0aGUgZGVmaW5lZCB7QGxpbmsgRElSRUNUVVNfQ09MTEVDVElPTl9QUkVGSVggfCBjb2xsZWN0aW9uLXByZWZpeH0uXG4gKiBAcGFyYW0ge3N0cmluZ30gY29sbGVjdGlvbiAgICAgVGhlIG5hbWUgb2YgdGhlIGNvbGxlY3Rpb25cbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKiBAaW50ZXJuYWxcbiAqXG4gKiBAZXhhbXBsZVxuICogZ2V0Q29sbGVjdGlvbkl0ZW1QYXRoKCdkaXJlY3R1c191c2VycycpO1xuICogLy8gPT4gJy91c2VycydcbiAqIGdldENvbGxlY3Rpb25JdGVtUGF0aCgndXNlcnMnKTtcbiAqIC8vID0+ICcvaXRlbXMvdXNlcnMnXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb2xsZWN0aW9uSXRlbVBhdGgoY29sbGVjdGlvbjogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKGNvbGxlY3Rpb24uc3RhcnRzV2l0aChESVJFQ1RVU19DT0xMRUNUSU9OX1BSRUZJWCkpIHtcbiAgICByZXR1cm4gYC8ke2NvbGxlY3Rpb24uc3Vic3RyKDkpfWA7XG4gIH1cblxuICByZXR1cm4gYC9pdGVtcy8ke2NvbGxlY3Rpb259YDtcbn1cbiIsImV4cG9ydCAqIGZyb20gXCIuL2NvbGxlY3Rpb25cIjtcbmV4cG9ydCAqIGZyb20gXCIuL2ludmFyaWFudFwiO1xuZXhwb3J0ICogZnJvbSBcIi4vaXNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL3BheWxvYWRcIjtcbiIsIi8qKlxuICogQG1vZHVsZSB1dGlsc1xuICovXG5cbi8qKlxuICogQ2hlY2tzIGludmFyaWFudCB2aW9sYXRpb24gYWdhaW5zdCBhIGNvbmRpdGlvbiwgd2lsbCB0aHJvdyBhbiBlcnJvciBpZiBub3QgZnVsZmlsbGVkXG4gKiBAaW50ZXJuYWxcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gY29uZGl0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ33CoG1lc3NhZ2VcbiAqL1xuZXhwb3J0IGNvbnN0IGludmFyaWFudCA9IChjb25kaXRpb246IGJvb2xlYW4gfCBudWxsIHwgdW5kZWZpbmVkLCBtZXNzYWdlOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgaWYgKCEhY29uZGl0aW9uID09PSB0cnVlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhyb3cgbmV3IEVycm9yKGBJbnZhcmlhbnQgdmlvbGF0aW9uOiAke21lc3NhZ2V9YCk7XG59O1xuIiwiLyoqXG4gKiBAbW9kdWxlIHV0aWxzXG4gKi9cblxuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuY29uc3QgaXNUeXBlID0gKHQ6IHN0cmluZywgdjogYW55KSA9PiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodikgPT09IGBbb2JqZWN0ICR7dH1dYDtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBpc05vdE51bGwgPSAodjogYW55KSA9PiB2ICE9PSBudWxsICYmIHYgIT09IHVuZGVmaW5lZDtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBpc1N0cmluZyA9ICh2OiBhbnkpID0+IHYgJiYgdHlwZW9mIHYgPT09IFwic3RyaW5nXCIgJiYgL1xcUy8udGVzdCh2KTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBpc051bWJlciA9ICh2OiBhbnkpID0+IGlzVHlwZShcIk51bWJlclwiLCB2KSAmJiBpc0Zpbml0ZSh2KSAmJiAhaXNOYU4ocGFyc2VGbG9hdCh2KSk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgaXNGdW5jdGlvbiA9ICh2OiBhbnkpID0+IHYgaW5zdGFuY2VvZiBGdW5jdGlvbjtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBpc09iamVjdE9yRW1wdHkgPSAodjogYW55KSA9PiBpc1R5cGUoXCJPYmplY3RcIiwgdik7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgaXNBcnJheU9yRW1wdHkgPSAodjogYW55KSA9PiBpc1R5cGUoXCJBcnJheVwiLCB2KTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBpc0FycmF5ID0gKHY6IGFueSkgPT4gKCFpc0FycmF5T3JFbXB0eSh2KSA/IGZhbHNlIDogdi5sZW5ndGggPiAwKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBpc09iamVjdCA9ICh2OiBhbnkpID0+IHtcbiAgaWYgKCFpc09iamVjdE9yRW1wdHkodikpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmb3IgKGNvbnN0IGtleSBpbiB2KSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh2LCBrZXkpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59O1xuIiwiLyoqXG4gKiBAbW9kdWxlIHV0aWxzXG4gKi9cblxuaW1wb3J0ICogYXMgYmFzZTY0IGZyb20gXCJiYXNlLTY0XCI7XG5pbXBvcnQgeyBpc051bWJlciB9IGZyb20gXCIuL2lzXCI7XG5cbi8qKlxuICogUmV0cmlldmVzIHRoZSBwYXlsb2FkIGZyb20gYSBKV1RcbiAqIEBpbnRlcm5hbFxuICogQHBhcmFtICB7U3RyaW5nfSB0b2tlbiBUaGUgSldUIHRvIHJldHJpZXZlIHRoZSBwYXlsb2FkIGZyb21cbiAqIEByZXR1cm4ge09iamVjdH0gICAgICAgVGhlIEpXVCBwYXlsb2FkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRQYXlsb2FkPFQgZXh0ZW5kcyBvYmplY3QgPSBvYmplY3Q+KHRva2VuOiBzdHJpbmcpOiBUIHtcbiAgaWYgKCF0b2tlbiB8fCB0b2tlbi5sZW5ndGggPCAwIHx8IHRva2VuLnNwbGl0KFwiLlwiKS5sZW5ndGggPD0gMCkge1xuICAgIC8vIG5vIHRva2VuIG9yIGludmFsaWQgdG9rZW4gZXF1YWxzIG5vIHBheWxvYWRcbiAgICByZXR1cm4ge30gYXMgVDtcbiAgfVxuXG4gIHRyeSB7XG4gICAgY29uc3QgcGF5bG9hZEJhc2U2NCA9IHRva2VuXG4gICAgICAuc3BsaXQoXCIuXCIpWzFdXG4gICAgICAucmVwbGFjZShcIi1cIiwgXCIrXCIpXG4gICAgICAucmVwbGFjZShcIl9cIiwgXCIvXCIpO1xuICAgIGNvbnN0IHBheWxvYWREZWNvZGVkID0gYmFzZTY0LmRlY29kZShwYXlsb2FkQmFzZTY0KTtcbiAgICBjb25zdCBwYXlsb2FkT2JqZWN0ID0gSlNPTi5wYXJzZShwYXlsb2FkRGVjb2RlZCk7XG5cbiAgICBpZiAoaXNOdW1iZXIocGF5bG9hZE9iamVjdC5leHApKSB7XG4gICAgICBwYXlsb2FkT2JqZWN0LmV4cCA9IG5ldyBEYXRlKHBheWxvYWRPYmplY3QuZXhwICogMTAwMCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBheWxvYWRPYmplY3Q7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIC8vIHJldHVybiBlbXB0eSBwYXlsb2FkIGluIGNhc2Ugb2YgYW4gZXJyb3JcbiAgICByZXR1cm4ge30gYXMgVDtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==