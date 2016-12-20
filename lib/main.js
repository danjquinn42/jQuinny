// import DOMNodeCollection from './dom_node_collection';
const DOMNodeCollection = require('./dom_node_collection.js');

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
  const defaultAjaxOptions = ajaxDefaults;
  options = $l.extend(defaultAjaxOptions, options);
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


window.$l = $l;
module.exports = $l;
