
# Yocto [![spm version](http://spmjs.io/badge/anima-yocto)](http://spmjs.io/package/anima-yocto)

---

![yocto-logo](http://aligitlab.oss-cn-hangzhou-zmf.aliyuncs.com/uploads/animajs/yocto/2b452a5762/yocto-logo.png)

谢天谢地，文档终于来了，让你们久等了：）

点击查看[版本记录](history.html)

## What's Yocto

Yocto is a javascript dom library for mobile from Anima, rebuild and simplify some modules from Zepto.

Yocto是Anima官方提供的dom操作基础库，它的根基来源于Zepto，同时在Zepto的基础上做了很多的优化和重构。

> Zepto = 10^-21;
> 
> Yocto = 10^-24;

---

## Yocto概览

> Yocto解决了哪些问题？跟Zepto有什么区别呢？

1. Yocto基于Zepto核心，绝大多数API与Zepto保持一致，不一致的部分Yocto也提供shim机制抹平差异。
2. Yocto的core精简了不常用的API，去除不必要的逻辑，深度优化了性能。
2. Yocto采用spm模块化方案，可以灵活组装和拆解，从而保证体积最小和性能最佳。
3. Yocto提供touch的完整解决方案，解决click的300ms延迟，解决了Zepto一直没有解决的tap事件的穿透问题。

## Yocto的使用

### 安装

```js
$ spm install anima-yocto --save
```

### 使用

```js
var $ = require('anima-yocto');
$.html('hello yocto');
```

___

## Yocto的整体模块结构
![屏幕快照 2015-08-03 下午2.17.19](http://aligitlab.oss-cn-hangzhou-zmf.aliyuncs.com/uploads/animajs/yocto/c54b31cea1/_____2015-08-03___2.17.19.png)

### Yocto Library
- 最常用的`Yocto`，主要由下面这4大部分组成（zipped 10.3kb）：
  - [core](http://spmjs.io/package/anima-yocto-core)
  - [event](http://spmjs.io/package/anima-yocto-event)
  - [ajax](http://spmjs.io/package/anima-yocto-ajax)
  - [touch](http://spmjs.io/package/anima-yocto-touch)
- 而更小更纯粹的`Yocto lite`，则只由下面这2部分组成（zipped 6.5kb）：
  - [core](http://spmjs.io/package/anima-yocto-core)
  - [event](http://spmjs.io/package/anima-yocto-event)

其中，yocto-plugin模块，是负责补齐yocto与zepto的差异API的shim模块，是可选的，默认并没有包含在yocto内部，需要手动引入。推荐你阅读下面的API章节，了解Yocto与Zepto的差异，再决定是否需要引入yocto-plugin模块。

图片最上方的yocto modules部分，是yocto的外围扩展模块们，他们往往是依赖于yocto的fn机制扩展出来的模块，或者与基础库联系非常紧密的模块。相关模块有 [fx](http://spmjs.io/package/anima-fx)、[gesture](http://spmjs.io/package/anima-gesture)、[data](http://spmjs.io/package/anima-data)、[deferred](http://spmjs.io/package/anima-yocto-deferred)等…


## Yocto的API

因为Yocto是源自Zepto(1.0)的，因此绝大部分的API`与Zepto保持一致`。如果你不了解Zepto，那么可以先到[Zepto官网](http://zeptojs.com)进行相关了解。

注意，`这里只列出与Zepto不一致的部分`：

### yocto-core：

#### 移除和精简的API如下：
| API | 修改动作 | 影响版本 | 备注 |
| --- |  --- | --- | --- |
| $.isEmptyObject | 移除$.isEmptyObject方法 | All | 官网无公开，core内无引用 |
| $.fn.closest | 移除，转移至plugin | All | 使用率低 |
| $.fn.empty | 移除，转移至plugin | All | 使用率低 |
| $.fn.pluck | 移除，转移至plugin | All | 使用率低 |
| $.fn.wrap | 移除，转移至plugin | All | 使用率低 |
| $.fn.wrapAll | 移除，转移至plugin | All | 使用率低 |
| $.fn.wrapInner | 移除，转移至plugin | All | 使用率低 |
| $.fn.unwrap | 移除，转移至plugin | All | 使用率低 |
| $.fn.scrollLeft | 移除，转移至plugin | All | 使用率低 |
| $.fn.position | 移除，转移至plugin | All | 使用率低 |
| $.fn.offsetParent | 移除，转移至plugin | All | 使用率低 |
| $(htmlString, attributes) | 移除 $(htmlString, attributes) 的api方法支持 | All | 该方法为zepto的1.0+方法，使用很少 |
| $.fn.contents | 移除，contents已经转移至plugin | All | 该方法为zepto的1.0+方法，使用率较低 |
| $.fn.offset | 移除，去除offset的coordinates参数 | All | 该方法为zepto的1.0+方法，使用率较低 |

除此之外，还有一些不影响使用的优化/改动点，详细信息，请访问[yocto-core优化方案](http://gitlab.alibaba-inc.com/animajs/yocto-core/issues/2)查看。

-----

### yocto-event：

#### 精简的API如下：
| API | 修改动作 | 影响版本 | 备注 |
| --- |  --- | --- | --- |
| $.fn.bind | 移除| All | 官方建议废除 |
| $.fn.unbind | 移除| All | 官方建议废除 |
| $.fn.delegate | 移除| All | 官方建议废除 |
| $.fn.undelegate | 移除| All | 官方建议废除 |
| $.fn.live | 移除| All | 官方建议废除 |
| $.fn.die | 移除| All | 官方建议废除 |

#### 优化的部分：
1. 移除鼠标事件逻辑
2. 移除IE支持逻辑

如需详细了解，请访问[yocto-event文档](http://docs.spmjs.io/anima-yocto-event/latest/)查看详情。

-------

### yocto-ajax：

#### 精简的API如下：
| API | 修改动作 | 影响版本 | 备注 |
| --- |  --- | --- | --- |
| ajaxStart 全局事件触发 | 移除| All | 未公开 |
| ajaxStop 全局事件触发 | 移除| All | 未公开 |

#### 优化的部分：
+ 拆分ajax模块——miniAjax(ajax方法)和jsonP(ajaxJSONP方法)，可按需引用，如`require(‘anima-yocto-ajax/miniAjax’)`或`require(‘anima-yocto-ajax/jsonP’)`


如需详细了解，请访问[yocto-ajax文档](http://docs.spmjs.io/anima-yocto-ajax/latest/)查看详情。

-------

### yocto-touch：

新增模块，提供`tap`事件，用于解决移动端`click`事件300ms延迟以及点透等问题。

相比`Zepto`的`tap`事件，`Yocto`里面的`tap`事件会阻止原生的`click`事件防止点透的发生，同时会根据点击的元素去触发对应的默认事件，比如label，input等元素。

用法和原生事件一样：

````js

var $ = require(‘anima-yocto-touch’);

$(‘body’).on(‘tap’, function(){});

$(‘body’).tap(function(){});

````

如需详细了解，请访问[yocto-touch文档](http://docs.spmjs.io/anima-yocto-touch/latest/)查看详情。

----

## Yocto的使用技巧&最佳实践

其实没有什么技巧，如果你spm玩得足够熟练，那么这部分内容对你而言就没什么价值：）

### 保持最佳引用大小
当你的业务中并没有依赖太多的Yocto功能 —— 例如做一个活动页，只需要用到一个点击事件和操作一些dom，那么你只需要引用`yocto-lite`即可。

```js
var $ = require('anima-yocto-lite');
```

这样可以避免引用ajax和touch模块，减少了很多体积。

### 基于模块的灵活拆解拼装

如果你的业务连event事件模块都用不到，那么你完全可以单独只引用yocto的4大模块之中的`yocto-core`模块：

```js
var $ = require('anima-yocto-core');
```

如果你的业务是基于`rpc`的，根本用不到ajax，其他的都用到了，怎么办？你可以如下面方式拼装：

```js
var $ = require('anima-yocto-lite'); //yocto的lite版中包含了core和event模块
require('anima-yocto-touch');
```

或：

```js
var $ = require('anima-yocto-core');
require('anima-yocto-event');
require('anima-yocto-touch');
```

甚至：

```js
var $ = require('anima-yocto-touch'); //所需的依赖（core和event）会自动安装
```

注：因为anima-yocto-touch的依赖项已经在该模块内配置好了，所以引用了yocto的touch模块会自动引入core和event模块。
在spm中，重复引用相同版本的同一模块是会自动去重的，不会重复打包，请放心。



### 避免重复多版本引入，善用semver
在看这部分内容之前，推荐你了解下[semver](http://semver.org/lang/zh-CN/)，目前spm已经全部支持semver格式，可以按照[语义化的格式](https://github.com/npm/node-semver#ranges)书写依赖版本号。例如在package.json中配置：

```js
"anima-yocto":"~1.1.0"
```

意为，在每次spm install的时候，自动安装yocto的 `>1.1.0` 且 `<1.2.0` 的版本。

有很多组件（如[carousel](http://spmjs.io/package/anima-carousel)）都已经升级为semver格式，在install时会自动获取yocto的最新小版本。

那么问题来了，而当你的业务代码中同时引用了carousel和yocto，在一段时间后，可能就会造成如下情况：虽然carousel里引用了最新的yocto，而项目内直接引用的yocto依然是老版本，结果就是出现了多个yocto版本的共存冗余。

要解决这个问题，最方便的做法是，如果项目内引用yocto，也配置成semver的格式。这样就可以永远保持当前引用的yocto的小版本号永远是最新的，同时也是向下兼容的。直到yocto的版本升到1.2.0。


## 已知问题

Yocto目前并不是最完美的dom库，依然有很多不完善的地方。目前已知的问题如下：

- event的on的实现不够完美，有一些小问题，需要借鉴jquery的事件实现
- tap事件对于有默认行为的元素支持不够完善

当然，问题不止这一点，如果你也有兴趣，欢迎一起加入Yocto的更新维护团队！


## 致谢

没有下面这些人和组织，就没有现在的Yocto。

- [zepto](http://zeptojs.com)
- [kimi](http://kimi.taobao.net)
- [fastclick](https://github.com/ftlabs/fastclick)
- Yocto的维护和共建者：完颜、圆非、轩与、子宽、青缨
- 感谢Yocto的命名者：许诺

----

form your dear Yocto.
