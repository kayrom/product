(function(window, undefined) {

    var SCROLL_EVENT = 'scroll',
        RESIZE_EVENT = 'resize',
        LAZY_ATTR = 'data-lazy-src',
        LOAD_EVENT = 'load',
        counter = 0;

    function offset (el) {

        var box = el.getBoundingClientRect(),
            x = box.left,
            y = box.top;

        var doc = document,
            body = doc.body,
            docElem = doc.documentElement;

        x -= docElem.clientLeft || body.clientLeft || 0;
        y -= docElem.clientTop || body.clientTop || 0;

       return {
            left: x,
            top: y
       };
    }

    var lazyload = {

        _imgNodes: [],

        _bind: function() {
            window.addEventListener(SCROLL_EVENT, lazyload.fetchVisibleImgs, false);
            window.addEventListener(RESIZE_EVENT, lazyload.fetchVisibleImgs, false);
        },

        _release: function() {
            window.removeEventListener(SCROLL_EVENT, lazyload.fetchVisibleImgs, false);
            window.removeEventListener(RESIZE_EVENT, lazyload.fetchVisibleImgs, false);
        },

        fetchVisibleImgs: function() {

            var nodes = lazyload._imgNodes,
                max = nodes.length,
                i = 0,
                viewportHeight, scrollY, threshold, img, imgPosY, imgHeight;

            if(counter < max) {

                viewportHeight = window.innerHeight;
                scrollY = window.scrollY;

                // visible area
                threshold = {
                    y1: scrollY,
                    y2: scrollY + viewportHeight
                };

                while(i < max) {
                    img = nodes[i];
                    imgPosY = offset(img).top;
                    imgHeight = img.height || 0;

                    if (!img.getAttribute('data-loaded')) {
                        if((imgPosY + imgHeight < threshold.y1 + viewportHeight) || (imgPosY < threshold.y2)) {
                            img.src = img.getAttribute(LAZY_ATTR);
                            img.setAttribute('data-loaded', 1);
                            counter++;                        
                        }
                    }
                    // if((imgPosY > threshold.y1 - imgHeight) && (imgPosY < threshold.y2)) {
                    //     img.src = img.getAttribute(LAZY_ATTR);
                    //     nodes.splice(i, 1);
                    //     counter++;
                    //     // we modified the nodes so we have to loop it again
                    //     // from the begining
                    //     continue;
                    // }
                    i++;
                }

            } else {
                // all img loaded
                lazyload._release();
            }

        },

        init: function(selector) {

                var isSimple = /^[\w-]*$/.test(selector),
                    isClass = selector[0] === '.',
                    plainName = isClass ? selector.slice(1) : selector;
                
                // get all img via selector or all img tag
                // use simple but more efficient dom method when possible
                lazyload._imgNodes = [].slice.apply(isSimple ? 
                                    isClass ? document.getElementsByClassName(plainName) : 
                                    document.getElementsByTagName(plainName) : 
                                    document.querySelectorAll(selector));

                if(lazyload._imgNodes.length !== 0) {
                    lazyload._bind();
                    lazyload.fetchVisibleImgs();
                }

        }

    };

    // export as a amd module if we find a amd environment
    if ( typeof define === 'function' && define.amd) {
        define('lazyload', [], function() {
            return lazyload;
        });
    } else {
        window.lazyload = lazyload;
    }

}(window));