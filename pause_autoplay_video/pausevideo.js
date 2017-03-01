console.log('pausevideo loaded');

// pageLoaded();

// window.onpopstate = function() {
// 	console.log('popstate');
// 	pageLoaded();
// }

// function pageLoaded() {
// 	window.addEventListener("load", function(){
// 		console.log('all loaded');
// 		pauseVideo();
// 	}, false);	
// }

// window.addEventListener("DOMContentLoaded", function() {
// 	var metas = document.getElementsByTagName('meta');
// 	var links = document.getElementsByTagName('link');

// 	gannett-cdn
// });


// via http://ryanmorr.com/using-mutation-observers-to-watch-for-element-availability/
(function(win) {
    'use strict';
    
    var listeners = [], 
    doc = win.document, 
    MutationObserver = win.MutationObserver || win.WebKitMutationObserver,
    observer;
    
    function ready(selector, fn) {
        // Store the selector and callback to be monitored
        listeners.push({
            selector: selector,
            fn: fn
        });
        if (!observer) {
            // Watch for changes in the document
            observer = new MutationObserver(check);
            observer.observe(doc.documentElement, {
                childList: true,
                subtree: true
            });
        }
        // Check if the element is currently in the DOM
        check();
    }
        
    function check() {
        // Check the DOM for elements matching a stored selector
        for (var i = 0, len = listeners.length, listener, elements; i < len; i++) {
            listener = listeners[i];
            // Query for elements matching the specified selector
            elements = doc.querySelectorAll(listener.selector);
            for (var j = 0, jLen = elements.length, element; j < jLen; j++) {
                element = elements[j];
                // Make sure the callback isn't invoked with the 
                // same element more than once
                if (!element.ready) {
                    element.ready = true;
                    // Invoke the callback with the element
                    listener.fn.call(element, element);
                }
            }
        }
    }

    // Expose `ready`
    win.ready = ready;
            
})(this);

ready('video', function(element) {
	console.log('video ready');
	pauseVideo(element);
});

function pauseVideo(videoEl) {
	// var videoEl = document.getElementsByTagName('video')[0];
	var playedOnce = false;
	var firstPlayTime = 0;
	var okInterval = 2 * 1000; // 2 sec

	videoEl.addEventListener("play", function() {
		if (!playedOnce) {
			firstPlayTime = Date.now();
			playedOnce = true;
		}

		var diff = Date.now() - firstPlayTime;
		if (diff < okInterval) {
			// it might try to play several times within that interval
			// but we don't want to make it impossible to manually play later
			videoEl.pause();
			console.log('pausing');
		}
	}, false);
}