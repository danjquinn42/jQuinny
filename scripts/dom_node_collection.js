
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
    this.nodes.forEach(callback);
    return this.nodes;
  }

  map(callback) {
    let newNodes = window.jQuinny({}, this.nodes);
    newNodes = this.newNodes.map(callback);
    return new DOMNodeCollection(newNodes);
  }

  html(htmlString) {
    if (typeof htmlString === 'string') {
      this.each(node => {
        node.innerHTML = htmlString;
      });
    } else {
      return this.nodes.first().innerHTML;
    }
  }

  empty() {
    this.html('');
  }

  length() {
    return this.nodes.length;
  }

  append(object) {
    if (typeof object === 'object' &&
      !(object instanceof DOMNodeCollection)) {
        object = window.jQuinny(object);
    }

    if (typeof object === 'string') {
      this.each( node => { node.innerHTML += object;});
    } else if (object instanceof DOMNodeCollection) {
      this.appendCollectionToNodes(object);
    }
  }

  appendCollection(collection) {
    this.each((node) => {
      collection.each(collectionNode => {
        node.appendChild(collectionNode.cloneNode(true));
      });
    });
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

  remove(selector){
    this.find(selector).each(node => node.remove());
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
