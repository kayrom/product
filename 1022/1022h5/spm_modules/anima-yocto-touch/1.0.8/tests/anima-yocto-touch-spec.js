var expect = require('expect.js');
var $ = require('anima-yocto-core');

require('anima-yocto-event');

require('../index')

$(
    '<p>点透测试</p>'+
    '<div style="position: relative;">'+
        '<div id="J_top" style="width:50px; height:50px; background-color: red; position: absolute; z-index: 1;"></div>'+
        '<div id="J_bottom" style="width:100px; height:100px; background-color: blue; position: absolute;"></div>'+
    '</div>'+
    '<br>'+
    '<br>'+
    '<br>'+
    '<br>'
).appendTo('body');

var i = 0;

$('#J_top').on('tap', function(){
    $(this).hide();
})

$('#J_bottom').on('tap', function(){
    $(this).html(i++);
})

$(
    '<p>A标签测试</p>'+
    '<div style="position: relative;">'+
        '<p><a href="http://www.taobao.com">未监听click或tap事件</a></p>'+
        '<p><a id="J_href_first" href="http://www.taobao.com">监听了tap事件</a></p>'+
        '<p><a id="J_href_second" href="http://www.taobao.com">监听了click且preventDefault</a></p>'+
        '<p><a id="J_href_third" href="http://www.taobao.com">监听了click未preventDefault</a></p>'+
    '</div>'+
    '<br>'+
    '<br>'+
    '<br>'+
    '<br>'
).appendTo('body');

$('#J_href_first').on('tap', function(event){
    alert('Tap: 模拟事件没有preventDefault');
})

$('#J_href_second').on('click', function(event){
    alert('Click: 执行了preventDefault');
    event.preventDefault();
})

$('#J_href_third').on('click', function(event){
    alert('Click: 期望正常跳转');
})

describe('anima-yocto-touch', function() {

    it('normal usage', function() {

    });

});

