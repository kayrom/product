# History

---

## 1.0.8

+ 修复SVG元素的target指向错误的问题，详见：http://stackoverflow.com/questions/25404694/svg-relatedtarget-correspondinguseelement-is-undefined-in-ie/25522875#25522875

## 1.0.7

+ 修复select元素绑定了tap或click事件后无法触发默认行为的bug

## 1.0.6

+ 升级依赖包

## 1.0.5

+ 修复兼容一个ios4引起的滚动bug

## 1.0.3 && 1.0.4

+ 不再全局代理click事件，改为只有监听了tap或click事件的元素才会触发该逻辑
+ fix bug && optimize

## 1.0.2

+ 提取手势管理模块（gestureManager.js）,解决多版本重复绑定的问题
+ fix bug && optimize

## 1.0.1

+ 基于`fastclick.js`进行重构，去除一些不必要的兼容性代码
+ 事件触发顺序为touchstart,touchmove,touchend,tap,click
+ 重构新增手势API

## 1.0.0

`new` It is the first version of anima-yocto-touch.
