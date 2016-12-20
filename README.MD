#jQuinny

jQuinny is a lightweight DOM manipulation API inspired by jQuery.

##jQuinny and $
`$()` is an short-hand alias for `jQuinny()` and they can be used interchangeably. No methods are directly defined on $() so as to avoid conflict with other libraries. Prefer `jQuinny()`.

### jQuinny(selector)
returns a DOMNodeCollection object

When passed a string or a javascript object `jQuinny()` searches through the DOM and returns an array-like DOMNodeCollection object that references those objects.

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
sends a request to specified url

`jQuinny.ajax()` takes a javascript options hash with keys for a HTTP request.

####options with build-in defaults:
| Option              | default value   | object type  |
| ------------------- |:---------------:| ------------:|
| async:              | true            | boolean      |
| contentType:        | 'application/x-www-form-urlencoded; charset=UTF-8'                          | string       |
| converters:         | {"* text": window.String,
  "text html": true,
  "text json": jQuery.parseJSON,
  "text xml": jQuery.parseXML
}                                       | options hash |
| data:               | {}              | POJO         |
| error:              | () => {}        | callback     |
| global:             | true            | boolean      |
| headers:            | {}              | POJO         |
| method:             | 'GET'           | string       |
| statusCode:         | {}              | POJO         |
| success:            | () => {}        | callback     |
| type:               | 'html'          | string       |
| url:                | document.URL    | string       |


##DOMNodeCollection methods

###.first()
returns the first element in a DOMNodeCollection

###.last()
returns the last element in a DOMNodeCollection
