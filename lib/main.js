import DOMNodeCollection from './dom_node_collection';



const $l = (selector) => {
  switch (typeof selector) {
    case "string":
      const selected = document.querySelectorAll(selector);
      return Array.prototype.slice.call(selected);
    case "object":
      if (selector instanceof HTMLElement){
        return new DOMNodeCollection([selector]);
      }
  }
};

window.$l = $l;
