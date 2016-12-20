
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
        collection = window.$q(collection);
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
