bindActions
===========

About
-----

This is a jQuery plugin very useful to attach events to DOM elements.
This plugin allows you to save time and make your javascript code cleaner. 
A simple look at the HTML code and you will know which function will execute when the user clicks this button or select as its value changes.
If a button is an Ajax call, you can simply disable it at the beginning of the function and also reactivate just when it is complete to prevent abuse.
You can not accidentally bind several times the same function on a button because the plugin detects if this is the case.

it also detects if a component is added to the document and determines whether it should be linked to an event, if this is the case it activates the event on the element. Very convenient to use templates.

It uses your namespace functions to prevent duplication of functions, for example, if the data-action value in the HTML code is "myNamespace.myFunction" when the event is triggered, the element call "myFunction" defined in "actions.myNamespace".
So simply extend action object with jQuery on each Javascript files where functions are defined.


To use it, simply include actions.js in the HEAD markup, and call $('.action').bindActions('on') function when the document is ready, and then all elements whose class "action" will be ready to be triggered, and future.

HOW TO USE
==========
In your HTML document, or in html templates (for backbones, Mustache ...), prepare your DOM element to be set like this Example:

```html

<div class="action" data-event="click" data-action="myNamescapce.mySubnamespace.myFunction">A Button</div>
<select id="mySelectElement" class="action" data-event="change" data-action="myNamescapce.myFunction">
	<option value="1">1</option>
	<option value="2">2</option>
	<option value="3">3</option>
</select>
<a href="javascript:void(0);" class="action" data-foo="bar" data-event="click" data-action="myFunction">My Super Button</a>
<input type="text" class="action" data-event="keyup" data-action="anotherNamespace.myOtherFunction">
```

In your Javascript file, define functions as:
```javascript
actions = $.extend(actions, {
    myFunction: function(el, e){
        // el is a jQuery element, here it's the <a> DOM element
        // e is the event object
        console.log(el.attr('data-foo')); // display 'bar'
    },
    myNamespace: {
        myFunction: function(el, e){
            // el is a jQuery element, here it's the <select> DOM element
            // e is the event object
            console.log('New value', el.val());
        },
        mySubnamespace: {
            myFunction: function(el, e){
                // el is a jQuery element, here it's the <div> DOM element
                // e is the event object
                el.fadeOut(200, function(){
                    $(this).remove();
                });
            }
        }
    },
    anotherNamespace: {
        myOtherFunction: function(el, e){
            // el is a jQuery element, here it's the <input> DOM element
            // e is the event object
            var code = (e.keyCode ? e.keyCode : e.which);
            if(code == 13){
                console.log('Pressed Enter !');
            }
            console.log('value of input', el.val());
        }
    }
});
```
To bind events on elements, just call this function below anywhere in your code:
```javascript
$('.action').bindActions('on');
```

To turn off events on elements just use
```javascript
$('.action').bindActions('off');
```

if(you){just want to bind an event on a specific element use jQuery selector;}

```javascript
$('#mySelectElement').bindActions('on');
$('#mySelectElement').bindActions('off');
```
There is two parameters on functions called on events:
```javascript
myFunction: function(el, e){
	//code here	
}
```
When a function is call after fireing event, your can get the target element called by 'el', and retrieve all informations you need or set options:
```javascript
el.css({ height: '100px' });
el.attr('data-foo');
el.attr('href');
```

the 'e' parameter is the original event object.

IMPORTANT
=========

All the functions that you define must be in actions original namespace. So use $.extend jquery function to define yours in actions js object
```javascript
actions = $.extend(actions, {
    myFunction: function(el, e){
        //code here
    },
    myNamespace: {}
});
```

in the use of templates, add class "action" to target elements that are detected as potential triggers by the plugin.

Mustache template sample:
```html
<script type="text/html" id="button_template">
	<div class="action btn red" data-action="myFunction" data-event="click">{{label}}</div>
</script>
```
return 'Enjoy';
