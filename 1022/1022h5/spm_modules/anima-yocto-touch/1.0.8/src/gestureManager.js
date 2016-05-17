var $ = Yocto = require('anima-yocto-core');

require('anima-yocto-event');

Gesture = {
    init: function(name){
        var self = this,
            gesture = self[name];

        var bindEvent = function(element){
            var $el = $(element);

            if(!$el.data(name)){ //防止同一重复绑定函数

              $el
                .data(name, 1)
                .forEach(function(el){
                  el.addEventListener("touchstart", function(event){
                      gesture.handler.touchstart(event);

                      document.addEventListener("touchmove", move, false);

                      document.addEventListener("touchend", end, false);

                      document.addEventListener("touchcancel", cancel, false);

                      // event.preventDefault();
                  }, false);
              });

              function move(event){

                  gesture.handler.touchmove(event);

                  // event.preventDefault();
              }

              function end(event){

                  gesture.handler.touchend(event);

                  document.removeEventListener("touchmove", move, false);

                  document.removeEventListener("touchend", end, false);

                  document.removeEventListener("touchcancel", cancel, false);

                  // event.preventDefault();
              }

              function cancel(event){

                  gesture.handler.touchcancel(event);

                  document.removeEventListener("touchmove", move, false);

                  document.removeEventListener("touchend", end, false);

                  document.removeEventListener("touchcancel", cancel, false);

                  // event.preventDefault();
              }
            }
        };

        gesture.events.forEach(function(eventName){
            self.list[eventName] = bindEvent;

            $.fn[eventName] = function(callback) {
                return this.on(eventName, callback);
            };
        });
    },
    list: {}
  };

$.gestures = Gesture;

module.exports = $;
