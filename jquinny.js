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
/***/ function(module, exports, __webpack_require__) {

	// import DOMNodeCollection from './dom_node_collection';
	const DOMNodeCollection = __webpack_require__(1);
	
	let functionQueue = [];
	
	const $l = (selector) => {
	  switch (typeof selector) {
	    case "function":
	      return addToFunctionQueue(selector);
	    case "string":
	      const selected = document.querySelectorAll(selector);
	      return Array.prototype.slice.call(selected);
	    case "object":
	      if (selector instanceof HTMLElement){
	        return new DOMNodeCollection([selector]);
	      }
	  }
	};
	
	const addToFunctionQueue = (functionForQueue) => {
	  functionQueue.push(functionForQueue);
	  if (document.readyState === "complete") {
	    functionQueue.each((queuedFunction) => queuedFunction());
	    functionQueue = [];
	  }
	};
	
	$l.extend = ( firstPojo, ...otherPojos) => {
	  otherPojos.forEach( pojo => {
	    for(let prop of pojo){
	      firstPojo[prop] = pojo[prop];
	    }
	  });
	  return firstPojo;
	};
	
	
	$l.ajax = (options) => {
	  const defaultAjaxOptions ={
	    type: 'html',
	    global: true,
	    statusCode: {},
	    headers: {},
	    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	    method: 'GET',
	    url: document.URL,
	    async: true,
	    converters: {"* text": window.String, "text html": true, "text json": jQuery.parseJSON, "text xml": jQuery.parseXML},
	    success: () => {},
	    error: () => {},
	    data: {},
	  };
	
	};
	
	
	window.$l = $l;
	module.exports = $l;


/***/ },
/* 1 */
/***/ function(module, exports) {

	
	class DOMNodeCollection {
	  constructor(nodes) {
	    this.nodes = nodes;
	  }
	
	  first() {
	    return this.nodes[0];
	  }
	
	  last() {
	    return this.nodes[this.nodes.length - 1];
	  }
	
	  each(callback) {
	    this.node.forEach(callback);
	  }
	
	  map(callback) {
	    this.node.map(callback);
	  }
	
	  html(html) {
	    if (typeof html === 'string') {
	      this.each(node => {
	        node.innerHTML = html;
	      });
	    } else {
	      return this.nodes.first().innerHTML;
	    }
	  }
	
	  empty() {
	    this.html('');
	  }
	
	  isEmpty() {
	    return (this.nodes.length === 0);
	  }
	
	
	  append(collection) {
	    if (this.isEmpty()) return;
	
	    if (typeof collection === 'object' &&
	      !(collection instanceof DOMNodeCollection)) {
	        collection = window.$l(collection);
	    }
	
	    if (typeof collection === 'string') {
	      this.each( node => { node.innerHTML += collection;});
	    } else if (collection instanceof DOMNodeCollection) {
	      this.each(node => {
	        collection.each(collectionNode => {
	          node.appendChild(collectionNode.cloneNode(true));
	        });
	      });
	    }
	  }
	
	  attr(attributeName, value) {
	    if (arguments.length === 1) {
	      return this.first().getAttribute(attributeName);
	    } else if (arguments.length === 2) {
	      this.each( node => node.setAttribute(attributeName, value));
	    }
	  }
	
	  children() {
	    let children = [];
	    this.each(node => {
	      children = children.concat(Array.from(node.children));
	    });
	    return new DOMNodeCollection(children);
	  }
	
	  parent() {
	    const parents = [];
	    this.each(node => parents.push(node.parentNode));
	    return new DOMNodeCollection(parents);
	  }
	
	  find(selector) {
	    let found = [];
	    this.each(node => {
	      const nodeList = node.querySelectorAll(selector);
	      found = found.concat(Array.from(nodeList));
	    });
	    return new DOMNodeCollection(found);
	  }
	
	  remove(){
	    this.each(node => node.remove());
	  }
	
	  addClass(cssClass) {
	    this.each(node => node.classList.add(cssClass));
	  }
	
	  removeClass(cssClass) {
	    this.each(node => node.classList.remove(cssClass));
	  }
	
	  on(event, callback) {
	    this.each(node =>{
	      node.addEventListener(event, callback);
	      node[event].push(callback);
	    });
	  }
	
	  off(eventName) {
	    this.each(node =>{
	      if (node[event]) {
	        node[event].forEach((callback) => {
	          node.removeEventListener(eventName, callback);
	        });
	      }
	      node[event] = [];
	    });
	  }
	}
	
	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);
//# sourceMappingURL=jquinny.js.map