class DOMNodeCollection {
  constructor(elements) {
    this.elements = elements;
  }

  first() {
    return this.elements[0];
  }

  last() {
    return this.elements[this.elements.length - 1];
  }

  each(callback) {
    this.element.forEach(callback);
  }

  html(html) {
    if (typeof html === 'string') {
      this.each(element => {
        element.innerHTML = html;
      });
    } else {
      return this.elements.first().innerHTML;
    }
  }

  empty() {
    this.html('');
  }

  

}

export default DOMNodeCollection;
