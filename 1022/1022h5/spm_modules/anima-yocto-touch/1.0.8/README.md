# anima-yocto-touch [![spm version](http://spmjs.io/badge/anima-yocto-touch)](http://spmjs.io/package/anima-yocto-touch)

---

anima-yocto 扩展模块

---

## 安装

```
$ spm install anima-yocto-touch --save

```

## 使用

该模块提供自定义事件tap，解决了穿透与300ms延迟的问题，用法同普通事件保持一致。

## 自定义手势模板

````js

var $ = require('anima-yocto-lite');

require('anima-yocto-touch');

var Gesture = $.gestures;

var gestures = {};

Gesture.drag = {
    events: [],
    handler: {
        touchstart: function(event){
            
        },
        touchmove: function(event){
            
        },
        touchend: function(event){
            
        },
        touchcancel: function(event){
            
        }
    }
};

Gesture.init('drag');

module.exports = $;


````