#jQuinny

jQuinny is a lightweight DOM manipulation API inspired by jQuery.

##jQuinny() and $()
jQuinny(selector) -> returns a DOMNodeCollection object.

When passed a string or a javascript object jQuinny() searches through the DOM and returns an array-like DOMNodeCollection object that references those objects (see below).
```
//example

<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>

___________________

jQuinny('li');
// returns [li, li, li] where each li is a DOM element

```

When passed a function jQuinny will immediately call that function if the document has loaded. If the document has not loaded jQuinny will add the function to a queue of functions. All members of the function queue will be called when the document has loaded and the queue will be cleared.

$() is an short-hand alias for jQuinny() and they can be used interchangeably. No methods are directly defined on $() so as to avoid conflict with other libraries. Prefer jQuinny().


##DOMNodeCollection methods

###.first()
returns the first element in a DOMNodeCollection

###.last()
returns the last element in a DOMNodeCollection
