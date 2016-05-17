var expect = require('expect.js');
var $ = window.$ = require('../index');
require('anima-yocto-plugin');

console.log($.fn.empty)

describe('anima-yocto', function() {

  it('normal usage', function() {
    expect($.isFunction($)).to.equal(true);
    expect($.isPlainObject($.zepto)).to.equal(true);
  });

  it('delected apis', function(){
    expect($.isEmptyObject).to.be(undefined);
    expect($.fn.prop).to.be(undefined);
    expect($.fn.contents).to.be(undefined);
  });

  before(function () {
    var html = '<ul class="UITestContainer">'+
    '<li>' +
        '<ul class="UITest">' +
            '<li class="UITest"><a href="">测试</a></li>' +
            '<li><a href="">测试</a></li>' +
        '</ul>' +
    '</li>' +
    '</ul>';
    $(html).appendTo('body');
  });

  it('closest usage', function() {
    expect($('li.UITest').closest('.UITest')[0]).to.equal($('li.UITest')[0]);
    expect($('li.UITest').closest('li')[0]).to.equal($('li.UITest')[0]);
    expect($('li.UITest').closest('ul')[0]).to.equal($('ul.UITest')[0]);
    expect($('ul.UITestContainer li li').closest('ul')[0]).to.equal($('ul.UITest')[0]);
  });

  after(function () {
    $('.UITestContainer').remove();
  });

  before(function () {
    var html = '<div class="UITestOffset" style="width:100px;height:100px;position:absolute;left:50px;top:50px;">测试</div>';
    $(html).appendTo('body');
  });
  it('offset useage', function(){
    expect($('.UITestOffset').offset().left).to.equal(50);
    expect($('.UITestOffset').offset().top).to.equal(50);
    expect($('.UITestOffset').offset().width).to.equal(100);
    expect($('.UITestOffset').offset().height).to.equal(100);
  });

  after(function () {
    $('.UITestOffset').remove();
  });

  it('isArray api', function(){
    expect($.isArray([])).to.equal(true);
    expect($.isArray([1,2,'3'])).to.equal(true);
    expect($.isArray({'a':1})).to.equal(false);
    expect($.isArray(function(){})).to.equal(false);
    expect($.isArray('foo')).to.equal(false);
    expect($.isArray(true)).to.equal(false);
  });

  it('parseJSON api', function(){
    expect($.parseJSON).to.equal(window.JSON.parse);
    expect($.parseJSON('{"a":1}')).to.eql({"a":1});
    expect($.parseJSON('{}')).to.eql({});
    var json = {"foo":"bar"};
    var str = window.JSON.stringify(json);
    expect($.parseJSON(str)).to.eql(json);
  });

});



describe('anima-yocto-touch', function() {

    before(function(){
      $('<style>.container{position:relative;}.tap{width:100px;height:100px;position:absolute;left:1;top:1;}.click{width:200px;height:200px;text-align:right;}.red{background:red;}.blue{background:blue;}.normaltap{width:100px;height:100px;}</style>').appendTo('head')

      $(  '<h1>点透测试</h1>'+
          '<div class="container">' +
          '<div class="tap red" id="J_tap">tap red</div>' +
          '<div class="click blue" id="J_click">click blue</div>' +
          '</div>' +
          '<h1>tap测试</h1>'+
          '<div class="container" style="width:200px;height:200px">' +
          '<div id="JS_Normaltap" class="normaltap red" style="margin-top:20px;">normal tap</div>' +
          '</div>'+
          '<h1>checkbox测试</h1>'+
          '<div class="container" style="width:200px;height:200px">' +
          '<input id="JS_checkbox" type="checkbox" name="checkboxTest" value="1" />' +
          '<input type="checkbox" name="checkboxTest" value="2" />' +
          '<input type="checkbox" name="checkboxTest" value="3">' +
          '</div>'+
          '<h1>冒泡测试</h1>'+
          '<div id="J_parent" class="container" style="width:200px;height:200px">' +
          '<div id="J_child" class="normaltap red" style="margin-top:20px;">child</div>' +
          '</div>'
      ).appendTo('body');

      $('' +
          '<input type="tel" pattern="[0-9]*" id="applyAmt" placeholder="最高1,555,000.00的金额" value="" maxlength="10">' +
          '<br/>' +
          '<br/>' +
          '<br/>' +
          '<select onclick="alert(\'select 1\')" name="">' +
          '<option value="1">等额本息6月</option>' +
          '<option value="2">等额本金12个月</option>' +
          '</select>' +
          '<br/>' +
          '<br/>' +
          '<br/>' +
          '<select onclick="alert(\'select 2\')">' +
          '<option value="">不使用任何优惠</option>' +
          '<option value="1">首贷有礼(仅限首次使用)</option>' +
          '<option value="2">9.7折</option>' +
          '<option value="3">8.8折</option>' +
          '</select>' +
          '<br/>' +
          '<br/>' +
          '<br/>' +
          '<textarea>textarea</textarea>' +
          '<br/>' +
          '<br/>' +
          '<br/>' +
          '<input id="JS_TestText" type="text" value="text" />' +
          '<br/>' +
          '<br/>' +
          '<br/>' +
          '<input type="number" value="123" />' +
          '<br/>' +
          '<br/>' +
          '<br/>' +
          '<input type="date" value="" />' +
          '<br/>' +
          '<br/>' +
          '<br/>' +
          '<input type="time" value="" />' +
          '<br/>' +
          '<br/>' +
          '<br/>' +
          '<input id="JS_TestSubmit" type="submit" value="submit" />' +
          '<input id="JS_TestButton" type="button" value="button" />' +
          '<input type="button" disabled value="button disabled" onclick="alert(1)" />' +
          '<br/>' +
          '<br/>' +
          '<br/>' +
          '<label for="JS_test">labellabel:<br/><br/> <input id="JS_test" type="text" value="input" /></label>' +
          '<br/>' +
          '<br/>' +
          '<br/>' +
          '<label><input type="radio" name="radio1" value="xx" /> radio1</label>' +
          '<label><input type="radio" name="radio1" value="xx" /> radio2</label>' +
          '<br/>' +
          '<br/>' +
          '<br/>' +
          '<div id="JS_Log">log区域</div>' +
          '<br/>' +
          '<br/>' +
          '<br/>' +
          '<br/>' +
          '<br/>' +
          '<br/>'
      ).appendTo('body')

      $('<a id="J_href" href="http://www.taobao.com">淘宝</a><br/><br/>').appendTo('body')

    });

    it('normal usage', function() {
        $('#J_tap').tap(function(e) {
            //alert('tap');
            $(this).hide();
            console.log(e.type)
        })
        var i = 0;
        $('#J_click').click(function(e) {
            //alert('点透了');
            i++;
            $(this).html('点击次数：' + i);
        })

        // $('#JS_Normaltap').tap(function(e) {
        $('#JS_Normaltap').on('tap', function(e) {
            console.log('tap')
            if ($(this).css('background-color') == 'green') {
                $(this).css('background-color', 'red');
            } else {
                $(this).css('background-color', 'green');
            }
        });

        $('#J_child').tap(function(){
            console.log('tap冒泡测试')
        });

        $('#J_parent').tap(function(){
            console.log('正确冒泡')
        });

        var n = 0;
        $('#JS_TestSubmit').click(function(ev) {
            n++;
            $('#JS_Log').text(ev + n);
            console.log(ev)
        });
        $('#JS_TestText').click(function(ev) {
            n++;
            $('#JS_Log').text(ev + n);
            console.log(ev)
        });
        $('#JS_TestButton').click(function(ev) {
            n++;
            $('#JS_Log').text(ev + n);
            console.log(ev)
        });

        $('#JS_test').focus(function(){
            console.log('focus')
        })

        var l = 0;
        $('#JS_checkbox').click(function(){
            l ++;
            $('#JS_Log').text(l);
        })

        // $('#JS_doubleTap').doubleTap(function(){
        //     $(this).html('doubleTap');
        // }).tap(function(){
        //     console.log('doubleTap触发的tap事件')
        // })

        $('#J_href').tap(function(e){
            console.log(e)
            alert('淘宝！！！')
            e.preventDefault()
        });

        // $('body').on('click',function(e){
        //     console.log(e);
        //     alert('淘宝！！！');
        //     e.preventDefault();
        // });
    });

});
