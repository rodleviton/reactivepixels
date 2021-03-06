Reactive Pixels
===============

An intelligent jQuery pixel plugin

Reactive Pixels is a jQuery plugin that enables elements on a page to interact with surrounding elements. The plugin can be used across many various implementations.

This package contains the plugin and working demo to get you started.

View an example of this project live at [http://rodleviton.com/workshop/reactivepixels](http://rodleviton.com/workshop/reactivepixels).

## Usage

Firstly, make sure you include jQuery 1.7 or higher

Then include `jquery.reactivepixels.js`.

Now you are ready to get everything working. You will need to create a html page with any number of elements. To make them work together they will need to all share the same class e.g. `.block`. 

To initialise the plugin all you need to do is choose the appropriate selector and call the **Reactive Pixels** plugin like so:

    $(function() {
        $('.block').reactivePixels();
    });

###Important
**Reactive Pixels** is in its early stages of development. If you come across any issues or would like to request any features please contact me through my blog feedback form [http://rodleviton.com/blog/reactive-pixels](http://rodleviton.com/blog/reactive-pixels).

* * *

Copyright &copy; 2013 Rod Leviton