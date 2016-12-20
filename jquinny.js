/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	import DOMNodeCollection from './dom_node_collection.js';
	
	let functionQueue = [];
	
	const jQuinny = (selector) => {
	  switch (typeof selector) {
	    case "function":
	      return addToFunctionQueue(selector);
	    case "string":
	      const selected = document.querySelectorAll(selector);
	      return new DOMNodeCollection(selected);
	    case "object":
	      if (selector instanceof HTMLElement){
	        return new DOMNodeCollection([selector]);
	      }
	  }
	};
	
	const $ = jQuinny;
	
	const addToFunctionQueue = (functionForQueue) => {
	  if (document.readyState === "complete") {
	    functionQueue();
	  } else {
	    functionQueue.push(functionForQueue);
	  }
	};
	
	document.addEventListener('DOMContentLoaded', () => {
	  functionQueue.each((queuedFunction) => queuedFunction());
	  functionQueue = [];
	});
	
	jQuinny.extend = ( firstPojo, ...otherPojos) => {
	  otherPojos.forEach( pojo => {
	    for(let prop of pojo){
	      firstPojo[prop] = pojo[prop];
	    }
	  });
	  return firstPojo;
	};
	
	
	jQuinny.ajax = (options) => {
	  const defaultAjaxOptions = ajaxDefaults;
	  options = jQuinny.extend(defaultAjaxOptions, options);
	  options.method = options.method.toUpperCase();
	
	  if (options.method === 'GET') {
	    options.url += "?" + toQueryString(options.data);
	  }
	
	  const request = new XMLHttpRequest();
	
	  request.open(options.method, options.url, true);
	
	  request.onload = () => {
	    if (request.status === 200) {
	      options.success(request.response);
	    } else {
	      options.error(request.response);
	    }
	  };
	
	  request.send(JSON.stringify(options.data));
	};
	
	const toQueryString = object => {
	  let result = "";
	  for(let property in object){
	    if (object.hasOwnProperty(property)){
	      result += property + "=" + object[property] + "&";
	    }
	  }
	  return result.substring(0, result.length - 1);
	};
	
	const ajaxDefaults = () => {
	  return {
	    type: 'html',
	    global: true,
	    statusCode: {},
	    headers: {},
	    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	    method: 'GET',
	    url: document.URL,
	    async: true,
	    converters: {"* text": window.String,
	      "text html": true,
	      "text json": jQuery.parseJSON,
	      "text xml": jQuery.parseXML
	    },
	    success: () => {},
	    error: () => {},
	    data: {},
	  };
	};
	
	
	window.jQuinny = jQuinny;
	export default jQuinny;


/***/ }
/******/ ]);
//# sourceMappingURL=jquinny.js.map