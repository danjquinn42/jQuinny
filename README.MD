#jQuinny

jQuinny is a lightweight DOM manipulation API inspired by jQuery.

##jQuinny and $
`$()` is an short-hand alias for `jQuinny()` and they can be used interchangeably. No methods are directly defined on `$()` so as to avoid conflict with other libraries. Prefer `jQuinny()`.

### jQuinny(selector)
returns a DOMNodeCollection object

When passed a string or a javascript object `jQuinny()` searches through the DOM and returns an array-like DOM node collection object that references those objects.

```html
//example

<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>


jQuinny('li');
// returns [li, li, li] where each li is a DOM element

```
### jQuinny(function)
adds a function to a queue until document loads.

When passed a function `jQuinny()` will immediately call that function if the document has loaded. If the document has not loaded `jQuinny()` will add the function to a queue of functions. All members of the function queue will be called when the document has loaded and the queue will be cleared.

```javascript

jQuinny(() => console.log("Print after load"));
jQuinny(() => console.log("Print second after load"));

console.log("Print now");

//in console:
// "Print now"
// "Print after load"
// "Print second after load"
```

###jQuinny.extend(target ,object1, objectN)
merges two or more objects together into the first argument.

When two or more object arguments are supplied to jQuinny.extend(), properties from each of the objects are added to the target object. Arguments that are null or undefined are ignored.

```javascript
let foo = { a: 10, b: 20, c: 40};
let bar = { a: "ten", b: "twenty", d: "eighty"};
let baz = { b: "XX" };

jQuinny.extend(foo, bar, baz);
foo
//Object {a: "ten", b: "XX", c: 40, d: "eighty"}
```

###jQuinny.ajax(options)
performs an HTTP (ajax) request - asynchronous by default.

`jQuinny.ajax()` takes a javascript options hash with keys for a HTTP request.

####options with build-in defaults:
| Option              | default value   | type      |
| -------------------: |:--------------- | :------------|
| async:              | true            | boolean      |
| contentType:        | 'application/x-www-form-urlencoded; charset=UTF-8'                    | string       |
| data:               | {}              | POJO         |
| error:              | () => {}        | callback     |
| global:             | true            | boolean      |
| headers:            | {}              | POJO         |
| method:             | 'GET'           | string       |
| statusCode:         | {}              | POJO         |
| success:            | () => {}        | callback     |
| type:               | 'html'          | string       |
| url:                | document.URL    | string       |


##DOM Node Collection methods

###.nodes
an array of DOM elements

###.first()
returns the first element of a jQuinny DOM node collection


###.last()
returns the last element in a DOM node collection

###.each(callback)
performs the callback on each element in the collection and returns the original object

###.map(callback)
performs the callback on each element of the collection and returns a new collection with updated values

###.html()
takes no arguments – returns the innerHTML of the first element

###.html(htmlString)
replaces the innerHRML of each element in the collection with provided HTML string passed to it

###.empty()
replaces the inner HTML of each element with an empty string

###.length()
returns the number of elements in the collection

###.append(object)
converts an object into a DOM node collection then adds it as a child of each element in the original collection

###.append(string)
appends the string to the inner HTML of each element in the collection

###.attr(attributeName)
returns the value of the specified attribute for the first element in the collection

###.attr(attributeName, value)
sets the specified attribute and value on each element in the collection

###.children()
returns the immediate children of each element in the collection

###.parent()
returns a collection of the parent nodes of each element in the original collection

###.find(selector)
searches through the elements in the collection and creates a new jQuinny object matching the selector. The selector is of the same type passed to jQuinny(selector)

###.remove(selector)
removes all elements matching the selector in the collection from the document including data and events

###.addClass(cssClass)
adds the specified class to the class attribute of each node in the collection

###.removeClass(cssClass)
removes the specified class from the class attribute of each node in the collection

###.on(event, callback)
applies a DOM event listener to each node in the collection and calls the callback when the event occurs

###.off(event)
removes all DOM event listeners matching the specified event from each node in the collection
 
