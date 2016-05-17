# History

---

## 1.1.8
`IMPROVED` spm build后的文件支持umd，支持直接script引用。

## 1.1.7
`IMPROVED` 补全Yocto文档

`IMPROVED` 支持蜻蜓的构建发布

`IMPROVED` ajax：为beforeSend、success、error、complete方法增加前置判断，防止直接调用ajaxJSONP方法报错

`fixed` ajax：修复withCredentials on ajax causes INVALID_STATE_ERR: DOM Exception 11

`fixed` touch：升级依赖包



## 1.1.6
`fixed` touch：修复select元素绑定了tap或click事件后无法触发默认行为的bug

## 1.1.5
`IMPROVED` yocto library整体版本调整，yocto升级为1.1.5，跳过1.1.4。

## 1.1.3
`fixed` 修复一个低级问题

## 1.1.2
`IMPROVED` touch：不再全局代理click事件，改为只有监听了tap或click事件的元素才会触发该逻辑

`fixed` touch：修复兼容一个ios4引起的滚动bug

`fixed` event：事件监听阶段，增加animaClick判断以及touch逻辑

## 1.1.1
`fixed` fix touch module bug

## 1.1.0

`new` 大规模优化和重构，Yocto诞生

## 1.0.0

`new` anima/zepto.core First version.
